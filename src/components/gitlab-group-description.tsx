import React from "react";
import { graphql, useStaticQuery } from "gatsby";

export interface GitlabGroupDescriptionProps {
  groupIdOrPath: string;
}

const GitlabGroupDescription = ({
  groupIdOrPath,
}: GitlabGroupDescriptionProps) => {
  const data = useStaticQuery<GatsbyTypes.AllGitlabGroupsQuery>(graphql`
    query AllGitlabGroups {
      allGitlabGroup {
        nodes {
          id
          description
          full_name
          full_path
          web_url
          path
          name
        }
      }
    }
  `);
  const group: any =
    data.allGitlabGroup.nodes.find(
      (node) =>
        node.full_path === groupIdOrPath ||
        node.id === groupIdOrPath ||
        node.id === `GitlabGroup-${groupIdOrPath}`
    ) || data.allGitlabGroup.nodes.find((node) => node.path === groupIdOrPath);
  return (
    <>
      <h1>{group.name}!</h1>
      <p>{group.description}</p>
    </>
  );
};

export default GitlabGroupDescription;
