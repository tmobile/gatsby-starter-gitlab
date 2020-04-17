import React from "react";
import { graphql, Link } from "gatsby";
import {
  Row,
  Col,
  Badge,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { GitlabGroup, GitlabProject } from "gatsby-source-gitlab/gitlab";
import DefaultTemplate from "./default";
import { groupsOf } from "../util";

interface GitlabGroupTemplateProps {
  data: { gitlabGroup: GitlabGroup };
}

const GitlabGroupTemplate: React.FC<GitlabGroupTemplateProps> = ({
  data: { gitlabGroup },
}) => {
  const groups: GitlabProject[][] = groupsOf(
    3,
    (gitlabGroup as any).childrenGitlabProject
  );
  return (
    <DefaultTemplate>
      <h1>{gitlabGroup.name}</h1>
      <small>
        Gitlab:{" "}
        <a href={gitlabGroup.web_url} target="_blank">
          {gitlabGroup.full_name}
        </a>
      </small>
      {groups.map((projects) => (
        <Row>
          {projects.map((project) => (
            <Col>
              <Card>
                {project.avatar_url && (
                  <Card.Img variant="top" src={project.avatar_url} />
                )}
                <Card.Body>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Text>
                    <p>{project.description}</p>
                    <p>
                      <Link to={`${gitlabGroup.path}/${project.path}`}>
                        <Button>Learn More</Button>
                      </Link>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </DefaultTemplate>
  );
};

export const query = graphql`
  query GitlabGroup($sourceId: String!) {
    gitlabGroup(id: { eq: $sourceId }) {
      description
      full_path
      full_name
      name
      path
      web_url
      childrenGitlabProject {
        avatar_url
        default_branch
        description
        http_url_to_repo
        last_activity_at
        name
        name_with_namespace
        open_issues_count
        path
        star_count
        tag_list
        web_url
      }
    }
  }
`;

export default GitlabGroupTemplate;
