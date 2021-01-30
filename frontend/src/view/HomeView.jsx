import React from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

import products from '../products';
import '../styles/utilities.css';

const HomeView = () => {
  return (
    <>
      <div className="u-center-text u-margin-bottom-8">
        <h1>Lastest Products</h1>
      </div>
      <>
        <Row className="u-center-flex">
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    </>
  );
};

export default HomeView;
