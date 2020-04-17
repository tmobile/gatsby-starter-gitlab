export interface MenuItem {
  href: string;
  text: string;
  hint: string;
  weight: number;
}

export interface TaxonomicMenuItem extends MenuItem {
  parent?: TaxonomicMenuItem;
  children: TaxonomicMenuItem[];
}
