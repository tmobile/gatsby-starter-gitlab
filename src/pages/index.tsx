import React from "react";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import DefaultTemplate from "../templates/default";
import GitlabGroupDescription from "../components/gitlab-group-description";
import { Link } from "gatsby";

const IndexPage = () => (
  <DefaultTemplate
    banner={
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <GitlabGroupDescription groupIdOrPath="hiring" />
              <Row>
                <Col>
                  <Button variant="primary">Learn the Process</Button>
                </Col>
                <Col>
                  <Button variant="outline-light">Get Involved</Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <Image src="/banner.jpg" fluid />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    }
  >
    <Container>
      <Row className="text-center">
        <Col>
          <h2>How it Works</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            {/* <Card.Img src="https://via.placeholder.com/268x180?text=Attract" /> */}
            <Card.Body>
              <Card.Title>
                <Link to="/standards-documentation/1-attract/">Attract</Link>
              </Card.Title>
              <Card.Text>
                The first step in hiring great candidates is to attract them!
                Learn more about how T-Mobile recruits top talent.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Link to="/job-posts/">Job Posts</Link>
              </ListGroupItem>
              <ListGroupItem>Recruitment Events</ListGroupItem>
              <ListGroupItem>Community Involvement</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img src="https://via.placeholder.com/268x180?text=Evaluate" /> */}
            <Card.Body>
              <Card.Title>
                <Link to="/standards-documentation/1-evaluate/">Evaluate</Link>
              </Card.Title>
              <Card.Text>
                Get to know the candidate through screening, interviews, and
                hands-on challenges.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Screening</ListGroupItem>
              <ListGroupItem>Behavioral Interview</ListGroupItem>
              <ListGroupItem>
                <Link to="/pair-challenges">Pairing Interview</Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img src="https://via.placeholder.com/268x180?text=Decide" /> */}
            <Card.Body>
              <Card.Title>
                <Link to="/standards-documentation/1-decide/">Decide</Link>
              </Card.Title>
              <Card.Text>
                The first step in hiring great candidates is to attract them!
                Learn more about how T-Mobile recruits top talent.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Rubrics</ListGroupItem>
              <ListGroupItem>Evaluation Sheets</ListGroupItem>
              <ListGroupItem>Placement</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="text-center mt-3">
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </DefaultTemplate>
);

export default IndexPage;
