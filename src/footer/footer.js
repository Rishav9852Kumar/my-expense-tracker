import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} className="footer-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/user/admin">Admin</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScO1BJ0s1WANbfDOCJVkNbea5fO86sOomKJMVSeeRpwT8jPCQ/viewform?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="issue-feedback-link"
                >
                  Issue/Feedback
                </a>
              </li>
            </ul>
          </Col>
          <Col sm={6} className="footer-text">
            &copy; 2024 Expense and Task Tracker (RETT). All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
