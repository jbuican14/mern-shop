import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/order.action';

const OrderView = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log('order', order);
  if (!loading) {
    //   Calculate prices
    order.itemsPrice = order.totalPrice - order.shippingPrice;
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2> Shipping </h2>
              <p>
                Name:<strong>{order.user.name}</strong>
              </p>
              <p>
                Email :{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.Country}
              </p>
              {order.isDeliverd ? (
                <Message variant="success">
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
              {order.paymentMethod ? order.paymentMethod : 'Paypal'}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message> Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((product, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${product.product}`}>
                            {product.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {product.qty} X £{product.price} = £
                          {product.qty * product.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2> Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items (incl. tax)</Col>
                  <Col>£{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderView;