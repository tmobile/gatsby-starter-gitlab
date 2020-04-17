/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { StaticQuery, graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import Head from "../components/head";

export interface DefaultTemplateProps {
  subnav?: React.ReactNode;
  banner?: React.ReactNode;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  banner,
  subnav,
  children,
}) => (
  <>
    <Head />
    <Navigation />
    {banner}
    <Row noGutters>
      {subnav && (
        <Col xs={2} className="bg-secondary">
          {subnav}
        </Col>
      )}
      <Col>
        <Container>
          <main>{children}</main>
        </Container>
      </Col>
    </Row>
    <Footer />
  </>
);

export default DefaultTemplate;
