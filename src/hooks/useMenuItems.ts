import { graphql, useStaticQuery } from "gatsby";
import { join } from "path";
import { TaxonomicMenuItem, MenuItem } from "../menu";

export default function useMenuItems(): MenuItem[] {
  return useStaticQuery<GatsbyTypes.MenuQuery>(
    graphql`
      query Menu {
        allSitePage(
          filter: { context: { menu: { href: { ne: null } } } }
          sort: { fields: context___menu___weight, order: ASC }
        ) {
          nodes {
            context {
              menu {
                href
                text
                hint
                weight
              }
            }
            path
          }
        }
      }
    `
  ).allSitePage.nodes.map(({ context: { menu } }) => menu);
}

export function useMenuItemsTree(items?: MenuItem[]): TaxonomicMenuItem[] {
  const all: TaxonomicMenuItem[] = (items || useMenuItems()).map((m) => ({
    ...m,
    children: [],
  }));
  const result: TaxonomicMenuItem[] = [];
  const memo: TaxonomicMenuItem[] = [];

  const buildTree = (current: TaxonomicMenuItem): TaxonomicMenuItem => {
    memo.push(current);

    // Normalize sometimes-inconsistent URL paths for menu
    let parentHref = current.href.startsWith("/")
      ? current.href
      : "/" + current.href;

    while (!current.parent && parentHref !== "/") {
      parentHref = join(parentHref || "/", "../").replace(/\\/g, "/");

      const pathMatch = (menuItem: TaxonomicMenuItem) =>
        menuItem.href === parentHref.replace(/\/$|$/, `/`) || // with trailing slash
        menuItem.href === parentHref.replace(/\/$/, ""); // without trailing slash

      current.parent = memo.find(pathMatch);
      if (!current.parent) {
        const parentIndex = all.findIndex(pathMatch);
        if (parentIndex !== -1) {
          current.parent = buildTree(all.splice(parentIndex, 1)[0]);
        }
      }
    }
    if (current.parent) {
      current.parent.children.push(current);
      current.parent.children.sort((a, b) => a.weight - b.weight);
    } else {
      result.push(current); // Root-level item
    }

    return current;
  };

  while (all.length > 0) {
    const current = all.pop();
    current && buildTree(current);
  }

  result.sort((a, b) => a.weight - b.weight);
  return result;
}

export function findGreatestAncestor(href: string, items?: MenuItem[]) {
  const tree = useMenuItemsTree(items);
  console.log("findGreatestCousinOf tree", tree);
  const result = tree.find((item) =>
    href.startsWith(item.href.replace(/\/$|$/, `/`))
  );
  return result;
}

export function useGreatestCousinMenuItemsOf(href: string, items?: MenuItem[]) {
  const result = findGreatestAncestor(href, items) || { children: null };
  console.log("useGreatestCousinMenuItemsOf", [...(result.children || [])]);
  return result.children;
}

export function useMenuItemTree(href: string, items?: MenuItem[]) {
  const all = items || useMenuItems();
  const result = useMenuItemsTree(
    all.filter((item) => item.href.startsWith(href))
  ).find((item) => item.href === href);

  return result;
}

export function useChildMenuItemsOf(href: string, items?: MenuItem[]) {
  const itemTree = useMenuItemTree(href, items);
  return itemTree ? itemTree.children : null;
}

export function useSiblingMenuItemsOf(href: string, items?: MenuItem[]) {
  const parentHref = join(href, "../").replace(/\\/, "/");
  const candidates = (items || useMenuItems()).filter(
    (menu) => menu.href.startsWith(parentHref) && menu.href !== parentHref
  );
  const result = useMenuItemsTree(candidates);
  return result;
}
