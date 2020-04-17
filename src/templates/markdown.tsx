import React from "react";
import { graphql, PageProps } from "gatsby";
import { Row, Col } from "react-bootstrap";
import Head from "../components/head";
import DefaultTemplate from "./default";
import {
  useGreatestCousinMenuItemsOf,
  findGreatestAncestor,
} from "../hooks/useMenuItems";
import NavigationTree from "../components/navigation-tree";

interface MarkdownTemplateProps extends PageProps {
  location: WindowLocation;
  data: {
    markdownRemark: {
      frontmatter: { [key: string]: any };
      html: string;
    };
  };
}

const MarkdownTemplate: React.FC<MarkdownTemplateProps> = ({
  location,
  data: {
    markdownRemark: { frontmatter, html },
  },
}) => {
  const ancestor = findGreatestAncestor(location.pathname);
  return (
    <DefaultTemplate
      subnav={
        <NavigationTree
          parentMenuItem={ancestor}
          currentHref={location.pathname}
        />
      }
    >
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.keywords}
        lang={frontmatter.lang}
      />
      <Row>
        <Col dangerouslySetInnerHTML={{ __html: html }}></Col>
      </Row>
    </DefaultTemplate>
  );
};

export const query = graphql`
  query Markdown($sourceId: String!) {
    markdownRemark(id: { eq: $sourceId }) {
      html
      frontmatter {
        title
        description
        keywords
        lang
      }
      excerpt(pruneLength: 300)
    }
  }
`;

export default MarkdownTemplate;
