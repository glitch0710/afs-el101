import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
      dispatch(listUsers());
    } else {
      history("/");
    }
  }, [dispatch, history]);

  const deleteHandler = (id) => {
    console.log("Delete", id);
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table className="table-sm" hover bordered responsive striped>
          <thead style={{ backgroundColor: "#4A2F28" }} className="text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td align="center">
                  {user.is_admin ? (
                    <Badge bg="success">
                      <i
                        className="fas fa-check"
                        style={{ color: "white" }}
                      ></i>{" "}
                      Admin
                    </Badge>
                  ) : (
                    <Badge bg="info">
                      <i className="fas fa-user" style={{ color: "white" }}></i>{" "}
                      Customer
                    </Badge>
                  )}
                </td>
                <td align="center">
                  <LinkContainer to={`admin/user/${user.id}`}>
                    <Button variant="secondary" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  &nbsp;
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
