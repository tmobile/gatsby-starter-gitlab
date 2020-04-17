// Allow import of ts files:
require("ts-node").register({ files: true });

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const gatsbyNode = require("./src/gatsby-node");
exports.createPages = gatsbyNode.createPages;
exports.createSchemaCustomization = gatsbyNode.createSchemaCustomization;
exports.onCreateNode = gatsbyNode.onCreateNode;
exports.onCreatePage = gatsbyNode.onCreatePage;

