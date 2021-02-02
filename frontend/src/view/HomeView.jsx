import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // use dispatch and bring part of state via useSelector
import { Row, Col } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { listProducts } from '../actions/product.action';

import '../styles/utilities.css';

const HomeView = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
};

export default HomeView;
