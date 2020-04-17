import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import DefaultTemplate from "../templates/default";
import Head from "../components/head";
import { GitlabProjectNode } from "gatsby-source-gitlab/gatsby-node";
import { graphql } from "gatsby";
import { useChildMenuItemsOf, useMenuItemTree } from "../hooks/useMenuItems";
import NavigationTree from "../components/navigation-tree";

export interface GitlabProjectTemplateProps {
  location: any;
  data: {
    gitlabProject: GitlabProjectNode;
    file: { childMarkdownRemark: { html: string } };
  };
}

const GitlabProjectTemplate: React.FC<GitlabProjectTemplateProps> = ({
  location,
  data: { gitlabProject, file },
}) => {
  console.log("location", location);
  const menu = useMenuItemTree(location.pathname);
  console.log("menu", menu);
  return (
    <DefaultTemplate
      subnav={
        <NavigationTree parentMenuItem={menu} currentHref={location.pathname} />
      }
    >
      <Head
        title={gitlabProject.name}
        description={gitlabProject.description}
        keywords={gitlabProject.tag_list}
      />
      <Row>
        <Col>
          {(file && file.childMarkdownRemark.html && (
            <article
              dangerouslySetInnerHTML={{
                __html: file.childMarkdownRemark.html,
              }}
            />
          )) || (
            <>
              <h1>{gitlabProject.name}</h1> {gitlabProject.description}
            </>
          )}
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{gitlabProject.name} is Innersource!</h2>
          <p>
            <a href={gitlabProject.web_url} target="_blank">
              {gitlabProject.name_with_namespace}
            </a>
          </p>
          <p>
            <a
              href={`${gitlabProject.web_url}/-/commits/${gitlabProject.default_branch}`}
            >
              <Badge className="badge-secondary mr-1">
                Last updated:{" "}
                {new Date(gitlabProject.last_activity_at).toLocaleDateString()}
              </Badge>
            </a>
            <a href={`${gitlabProject.web_url}/-/issues`}>
              <Badge className="badge-secondary mr-1">
                Open issues: {gitlabProject.open_issues_count}
              </Badge>
            </a>
          </p>
        </Col>
        <Col>
          <img src={gitlabProject.avatar_url} />
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export const query = graphql`
  query GitlabProject($sourceId: String!, $readmeRegex: String!) {
    gitlabProject(id: { eq: $sourceId }) {
      avatar_url
      default_branch
      description
      last_activity_at
      name
      name_with_namespace
      open_issues_count
      path
      star_count
      tag_list
      web_url
      childrenFile {
        childMarkdownRemark {
          excerpt(format: PLAIN, pruneLength: 35)
          frontmatter {
            title
            description
          }
        }
      }
    }
    file(relativePath: { regex: $readmeRegex }) {
      childMarkdownRemark {
        html
      }
    }
  }
`;

export default GitlabProjectTemplate;
