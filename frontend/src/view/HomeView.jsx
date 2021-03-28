import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'; // use dispatch and bring part of state via useSelector
import { Row, Col } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/product.action';

import '../styles/utilities.css';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';

const HomeView = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <div className="main-header">
        <div className="u-center-text u-margin-bottom-1">
          <h1>Welcome to MERNShop</h1>
        </div>
        {!keyword && <ProductCarousel />}
      </div>

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
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        </div>
      )}
    </>
  );
};

export default HomeView;
