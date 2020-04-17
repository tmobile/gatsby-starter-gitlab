/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

// TODO: Get ts-node to ignore plugins/ directory
// require("ts-node").register({
//   files: true,
//   preferTsExts: true
// });

module.exports = {
  pathPrefix: "/tmobile/gatsby-starter-gitlab",
  siteMetadata: {
    title: `Sample Gitlab Site`,
    description: `A Sample Description For A Sample Gitlab Site`,
    author: `Sample Human`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {},
    },
    {
      resolve: "gatsby-plugin-codegen",
      options: {},
    },
    {
      resolve: `gatsby-plugin-typegen`,
      options: {},
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-source-gitlab`,
      options: {
        groups: [
          {
            idOrPath: "<insert-your-gitlab-group-path-here>",
            cloneDepth: 1,
            meta: {
              weight: 1
            }
          }
        ],
      },
    },
    { // Must come AFTER gatsby-source-gitlab to process markdown files
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-graph',
            options: {
              // this is the language in your code-block that triggers mermaid parsing
              language: 'mermaid', // default
              theme: 'default' // could also be dark, forest, or neutral
            }
          },
          'gatsby-remark-relative-links'
        ]
      }
    }
  ],
};
