import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  // bootstrap py-3 : padding y-axis
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center py-3">Made with Love 💗</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
