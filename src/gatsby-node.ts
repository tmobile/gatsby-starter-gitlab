import { resolve, join } from "path";
import {
  CreateNodeArgs,
  Node,
  CreatePagesArgs,
  PluginOptions,
  Actions,
  CreateSchemaCustomizationArgs,
} from "gatsby";
import { GitlabGroup, GitlabProject } from "gatsby-source-gitlab/gitlab";
import fs from "fs-extra";

const GL_GROUP_BASE_PATH = "<sample path>";
const GL_GROUP_BASE_TITLE = "Sample Title";

function normalizeFilePath(path: string) {
  return path
    .replace(GL_GROUP_BASE_PATH, "") // chop off excess path
    .toLowerCase(); // lower case
}

function normalizePagePath(path: string) {
  return path
    .replace(GL_GROUP_BASE_PATH, "") // chop off excess from gitlab
    .replace(/\/readme.md$/i, "") // chop off readme
    .replace(/\.[^/.]+$/, "") // chop off file extension
    .replace(/\/$|$/, `/`) // include trailing slash
    .toLowerCase(); // lower case
}

function doCreatePage(
  actions: Actions,
  componentPath: string,
  sourceId: string,
  path: string,
  title: string,
  hint: string,
  weight: number,
  context: any = null
) {
  const href = normalizePagePath(path);
  actions.createPage({
    path: href,
    component: resolve(componentPath),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      ...context,
      sourceId,
      menu: {
        text: title.replace(GL_GROUP_BASE_TITLE, ""),
        href,
        hint,
        weight,
      },
    },
  });
}

export async function createSchemaCustomization(
  args: CreateSchemaCustomizationArgs
) {
  const { createTypes } = args.actions;
  // Make frontmatter optional so it can be queried even when it doesn't exist
  const typeDefs = `
    type MarkdownRemarkFrontmatter implements Node {
      title: String
      description: String
      keywords: [String]
      lang: String
    }
  `;
  createTypes(typeDefs);
}

export async function onCreatePage(args: CreatePagesArgs) {}

export async function onCreateNode(args: CreateNodeArgs<Node>) {
  const { node, actions, store, createNodeId } = args;
  const { createParentChildLink, createNode } = actions;

  switch (node.internal.type) {
    case "File":
      node.relativePath = normalizeFilePath(`${node.relativePath}`);
      node.relativeDirectory = normalizeFilePath(`${node.relativeDirectory}`);
      const publicPath = join(process.cwd(), `public`, `${node.relativePath}`);

      return fs.copy(`${node.absolutePath}`, publicPath, {
        errorOnExist: false,
        overwrite: false,
      });
    case "MarkdownRemark":
      // if(node.)
      break;
    default:
      break;
  }
}

async function createPagesForGitlabGroups(args: CreatePagesArgs) {
  const { graphql, actions } = args;
  const groups: GitlabGroup[] = await graphql(`
    query GitlabGroups {
      allGitlabGroup(filter: { parent: { id: { ne: null } } }) {
        nodes {
          id
          path
          name
          full_path
          description
          config {
            meta {
              weight
            }
          }
        }
      }
    }
  `).then(({ data }: any) => data.allGitlabGroup.nodes);
  console.log("createPages Gitlab Groups", groups.length);
  for (const group of groups) {
    doCreatePage(
      actions,
      "./src/templates/gitlab-group.tsx",
      `${group.id}`,
      group.full_path,
      group.name,
      group.description,
      (group.config.meta || { weight: 1 }).weight
    );
  }
}

async function createPagesForGitlabProjects(args: CreatePagesArgs) {
  const { graphql, actions } = args;
  const projects: GitlabProject[] = await graphql(`
    query GitlabProjects {
      allGitlabProject {
        nodes {
          description
          id
          name
          path_with_namespace
          config {
            meta {
              weight
            }
          }
        }
      }
    }
  `).then(({ data }: any) => data.allGitlabProject.nodes);
  console.log("createPages Gitlab Projects", projects.length);
  for (const project of projects) {
    doCreatePage(
      actions,
      "./src/templates/gitlab-project.tsx",
      `${project.id}`,
      project.path_with_namespace,
      project.name,
      project.description,
      (project.config.meta || { weight: 2 }).weight,
      {
        readmeRegex: normalizeFilePath(
          `/${project.path_with_namespace}/readme.md/i`
        ),
      }
    );
  }
}

async function createPagesForMarkdownFiles(args: CreatePagesArgs) {
  const { graphql, actions } = args;
  const markdowns: any = await graphql(`
    query MarkdownFiles {
      allMarkdownRemark {
        nodes {
          excerpt(pruneLength: 20, format: PLAIN)
          id
          frontmatter {
            description
            title
            weight
          }
          parent {
            ... on File {
              id
              name
              relativePath
              absolutePath
            }
          }
        }
      }
    }
  `).then(({ data }: any) => data.allMarkdownRemark.nodes);

  for (const markdown of markdowns) {
    doCreatePage(
      actions,
      "./src/templates/markdown.tsx",
      `${markdown.id}`,
      `${markdown.parent.relativePath}`,
      `${markdown.frontmatter.title || markdown.excerpt}`,
      `${markdown.frontmatter.description || markdown.excerpt}`,
      parseInt(
        markdown.frontmatter.weight ||
          markdown.frontmatter.title.length.toString()
      )
    );
  }
}

export async function createPages(
  args: CreatePagesArgs,
  options?: PluginOptions
) {
  console.log("createPages", options);
  // createPagesForMarkdownFiles first because it will will use `readme` as the
  // index, which may need to be overwritten by the Gitlab-* pages
  await createPagesForMarkdownFiles(args);
  return Promise.all([
    createPagesForGitlabGroups(args),
    createPagesForGitlabProjects(args),
  ]);
}
