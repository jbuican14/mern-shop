import React from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

import products from '../products';

const HomeView = () => {
  return (
    <>
      <h1>Lastest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeView;
