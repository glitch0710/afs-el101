import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, Button, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../index.css";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={product.image}
              alt={product.name}
              className="display-img"
              fluid rounded
            />
          </Col>

          <Col md={6}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.num_reviews} reviews`}
                    color={"#fcc203"}
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>₱{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Servings Available: </Col>
                    <Col>
                      <strong>
                        {product.count_in_servings > 0
                          ? `${product.count_in_servings} servings`
                          : "Sold Out"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button
                      variant="secondary"
                      size="lg"
                      disabled={product.count_in_servings === 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                  {/* <Button className="btn-block" type="button">Add to Cart</Button> */}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
