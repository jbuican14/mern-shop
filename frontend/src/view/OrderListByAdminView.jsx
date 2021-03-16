import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { allOrder } from '../actions/order.action';

const OrderListByAdminView = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  // const productDelete = useSelector((state) => state.productDelete);
  // const {
  //   loading: loadingProductDelete,
  //   error: errorProductDelete,
  //   success: successProductDelete,
  // } = productDelete;

  // const productCreate = useSelector((state) => state.productCreate);
  // const {
  //   loading: loadingProductCreate,
  //   error: errorProductCreate,
  //   success: successProductCreate,
  //   product: createdProduct,
  // } = productCreate;

  // Check if user is log in && check admin
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(allOrder());
    } else {
      history.push('./login');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {};
  const createProductHandler = () => {};

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Orders</h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td> {order.createdAt.substring(0, 10)}</td>
                <td> £ {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: 'yellowgreen' }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: 'yellowgreen' }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: 'yellowgreen' }}
                    ></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}/`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListByAdminView;
