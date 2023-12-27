import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import "./AboutPage.css";
import techImage1 from "../gallery/tech-stack-logo.png";
import techImage2 from "../gallery/tech-stack-logo.png";
import yourImage from "../gallery/my-image.png";

const AboutPage = () => {
  return (
    <Container className="about-container">
      <Row>
        <Col className="about-content">
          <Card>
            <CardBody>
              <h1 className="display-4  ">
                About Expense and Task Tracker App
              </h1>
              <p className="lead ">
                Welcome to our Expense and Task Tracker App! Our App is designed
                to help you keep track of your expenses and tasks in a simple
                and effective way.
              </p>
            </CardBody>
          </Card>
          <h2 className="about-subheading">How to Use</h2>
          <p className="about-description">
            Using this app is easy. Just follow these steps:
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>
              Add your expenses and tasks as needed.
            </ListGroupItem>
            <ListGroupItem>
              View, update, or delete your entries any time.
            </ListGroupItem>
            <ListGroupItem>
              Easily keep track of your expenses and tasks.
            </ListGroupItem>
          </ListGroup>
          <h2 className="about-subheading">Tools and Technologies</h2>
          <p className="about-description">
            Our app is built using the following tools and technologies:
          </p>
          <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
              <img src={techImage1} alt="Tech 1" className="tech-image" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <img src={techImage2} alt="Tech 2" className="tech-image" />
            </Col>
          </Row>
        </Col>
        <Col className="about-content">
          <img src={yourImage} alt="Your" className="your-image" />
          <h2 className="about-subheading">About the Developer</h2>
          <p className="about-description">
            Hi, I'm Rishav Kumar, the developer of this app. If you have any
            questions or <b>feedback / feature-suggestions</b>, please feel free
            to contact me:
          </p>
          <Card>
            <CardBody>
              <CardText>
                <IoMdMail size={30} /> : rishavkumaraug20005212@gmail.com
              </CardText>
              <ListGroupItem>
                <a
                  href="https://www.linkedin.com/in/rishav-kumar-iiit-ranchi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoLinkedin size={30} />
                </a>
                ..
                <a
                  href="https://github.com/Rishav9852Kumar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={30} color="white" />
                </a>
              </ListGroupItem>
            </CardBody>
          </Card>
          <h2 className="about-subheading">GitHub Repositories</h2>
          <p className="about-description">
            You can find the source code for our app on GitHub:
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>
              <a
                href="https://github.com/Rishav9852Kumar/my-expense-tracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Front-End Repository
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a
                href="https://github.com/Rishav9852Kumar/my-expense-tracker-backend"
                target="_blank"
                rel="noopener noreferrer"
              >
                Back-End Repository
              </a>
            </ListGroupItem>
          </ListGroup>
          <h2 className="about-subheading">Other Apps</h2>
          <p className="about-description">
            You can find few more helpfull Apps made by me
          </p>
          <ListGroup className="about-list">
            <ListGroupItem>
              <a
                href="https://language-learning-game.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Language Lerning App
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a
                href="https://github-profile-generator-007.netlify.app/signin"
                target="_blank"
                rel="noopener noreferrer"
              >
                App Gallery
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a
                href="https://team-indus-tic-tac-toe-game.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tic Tac Toe
              </a>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
