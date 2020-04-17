import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export default () => (
  <footer className="text-light bg-dark mt-3">
    {/* <Row noGutters>
      <Col className="mt-3 text-center">
        <h2>Sitemap</h2>
      </Col>
    </Row> */}
    <Container>
      {/* <Row className="mt-3">
        <Col>
          <h3>Section One</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
        <Col>
          <h3>Section Two</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
        <Col>
          <h3>Section Three</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
        <Col>
          <h3>Section Four</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3>Section Five</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
        <Col>
          <h3>Section Six</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
        <Col>
          <h3>Section Seven</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
        <Col>
          <h3>Section Eight</h3>
          <ul>
            <li>Item One</li>
          </ul>
        </Col>
      </Row> */}
      <Row>
        <Col className="text-center">
          Copyright © {new Date().getFullYear()} T-Mobile
        </Col>
      </Row>
    </Container>
  </footer>
);
