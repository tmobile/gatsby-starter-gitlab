import React from "react";
import { Row, Col, ListGroup, ListGroupItem, Card } from "react-bootstrap";
import DefaultTemplate from "../templates/default";
import Head from "../components/head";

export default () => (
  <DefaultTemplate>
    <Head title="Job Posts" />
    <Row>
      <Col>
        <h1>Job Posts</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Img src="https://via.placeholder.com/500x350?text=Software+Engineer" />
          <Card.Body>
            <Card.Title>Software Engineer</Card.Title>
            <Card.Text>TODO: Brief description of SWE.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img src="https://via.placeholder.com/500x350?text=Software+Development+Engineer+Test" />
          <Card.Body>
            <Card.Title>Evaluate</Card.Title>
            <Card.Text>
              Get to know the candidate through screening, interviews, and
              hands-on challenges.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Screening</ListGroupItem>
            <ListGroupItem>Behavioral Interview</ListGroupItem>
            <ListGroupItem>Pairing Interview</ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>&nbsp;</Col>
    </Row>
    <Row className="text-center">
      <Col>
        <h2>Resources</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>For Hiring Managers</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>For NTWs</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>For Interviewers</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </DefaultTemplate>
);
