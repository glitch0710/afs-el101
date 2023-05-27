import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

  const dispatch = useDispatch();
  const history = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    history("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={12}>
        <h1>Shopping Cart</h1>
      </Col>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty!{" "}
            <Link to="/">
              <strong className="text-secondary">Go back</strong>
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`product/${item.product}`}>
                      <strong className="text-secondary">{item.name}</strong>
                    </Link>
                  </Col>
                  <Col md={2}>₱ {item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.count_in_servings).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card bg="primary" key="secondary" text="light">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items{" "}
              </h2>
              ₱{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <div className="d-grid gap-2">
              <Button
                type="button"
                variant="secondary"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
