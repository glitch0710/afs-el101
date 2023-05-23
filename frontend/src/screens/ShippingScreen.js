import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const history = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address);
  const [building, setBuilding] = useState(shippingAddress.building);
  const [office, setOffice] = useState(shippingAddress.office);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, building, office }));
    history('../payment', {replace: true})
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Delivery</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="building">
          <Form.Label>Building</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter building"
            value={building ? building : ""}
            onChange={(e) => setBuilding(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="office">
          <Form.Label>Office</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter office"
            value={office ? office : ""}
            onChange={(e) => setOffice(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="secondary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
