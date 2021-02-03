import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap';

import Message from '../components/Message';
import { addToCart } from '../actions/cart.action';

const CartView = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId]);

  const removeFromCartHandler = (id) => {
    console.log('remove');
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
    console.log('checkout');
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #777',
                  }}
                >
                  <Container>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>

                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col md={1}>£{item.price}</Col>

                      <Col md={1}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                          style={{
                            background: 'transparent',
                            border: 'none',
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          size="sm"
                          onClick={() => removeFromCartHandler(item.product)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={3}>
          <Card
            style={{
              background: 'transparent',
              border: 'none',
              color: 'black',
            }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item style={{ background: 'transparent' }}>
                <h2>
                  Subtotal
                  {cartItems.reduce(
                    (acc, currentItem) => acc + currentItem.qty,
                    0
                  )}
                </h2>
                £
                {cartItems
                  .reduce(
                    (acc, currentItem) =>
                      acc + currentItem.qty * currentItem.price,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn"
                  style={{ width: '80%', color: '#fff' }}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Check out
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartView;
