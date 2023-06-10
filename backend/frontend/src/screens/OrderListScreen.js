import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
      dispatch(listOrders());
    } else {
      history("/");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table className="table-sm" hover bordered responsive striped>
          <thead style={{ backgroundColor: "#4A2F28" }} className="text-white">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.created_date.slice(0,10)}</td>
                <td>₱{order.total_price}</td>
                <td align="center">
                    {order.is_paid ? (
                      <Badge bg="success"><i className="fas fa-check" style={{color: 'white'}}></i> Paid on {order.payment_date.slice(0,10)}</Badge>
                    ) : (
                      <Badge bg="danger"><i className="fas fa-times" style={{color: 'white'}}></i> Not Paid</Badge>
                    )}
                </td>
                <td align="center">
                    {order.is_delivered ? (
                      <Badge bg="success"><i className="fas fa-check" style={{color: 'white'}}></i> Delivered on {order.delivery_date.slice(0,10)}</Badge>
                    ) : (
                      <Badge bg="danger"><i className="fas fa-times" style={{color: 'white'}}></i> Not Delivered</Badge>
                    )}
                </td>
                <td align="center">
                  <LinkContainer to={`/order/${order.id}`}>
                    <Button variant="secondary" className="btn-sm">
                      <i className="fas fa-eye"></i> View Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
