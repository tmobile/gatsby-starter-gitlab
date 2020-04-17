/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface HeadProps {
  description?: string;
  lang?: string;
  meta?:
    | {
        name: string;
        content: string | undefined;
        property?: undefined;
      }
    | {
        property: string;
        content: string | undefined;
        name?: undefined;
      };
  keywords?: string[];
  title?: string;
}

const Head: React.FC<HeadProps> = ({
  description,
  lang,
  meta,
  keywords,
  title,
}: HeadProps) => {
  const { site } = useStaticQuery<GatsbyTypes.SiteMetaDataQuery>(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site?.siteMetadata?.description;
  const pageTitle = (title && title + " |") || " ";
  const pageKeywords = keywords || [];
  const metadata = meta || [];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s ${site?.siteMetadata?.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          pageKeywords.length > 0
            ? {
                name: `keywords`,
                content: pageKeywords.join(`, `),
              }
            : []
        )
        .concat(metadata)}
    >
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default Head;
