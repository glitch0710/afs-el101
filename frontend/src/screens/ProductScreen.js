import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, Button, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import "../index.css";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/product/${id}`);
      setProduct(data)
    }

    fetchProduct();
  }, []);


  // const { id } = useParams();
  // const product = products.find((p) => String(p.id) === id);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={product.image}
            alt={product.name}
            className="display-img"
            fluid
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
    </div>
  );
};

export default ProductScreen;
