import { useStaticQuery, graphql } from "gatsby";

export default function useLogoMaxHeight50(): {
  src: string;
  height: number;
  width: number;
} {
  const data: any = useStaticQuery<GatsbyTypes.LogoMaxHeight50Query>(graphql`
    query LogoMaxHeight50 {
      file(relativePath: { eq: "tmo-logo.png" }) {
        relativePath
        childImageSharp {
          resize(height: 50) {
            src
            width
            height
          }
        }
      }
    }
  `);

  const result = data.file.childImageSharp.resize;
  return {
    src: result.src,
    height: result.height,
    width: result.width,
  };
}
