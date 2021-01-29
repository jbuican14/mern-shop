import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  // bootstrap py-3 : padding y-axis
  return (
    <>
      <Container>
        <Row className="footer-container">
          <Col className="text-center py-3">Made with Love 💗</Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
