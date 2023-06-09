import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Card,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../index.css";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, {rating, comment}))
  }

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
        <div>
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                className="display-img"
                fluid
                rounded
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

                  {product.count_in_servings > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col xs="auto" sm={6} className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.count_in_servings).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button
                        onClick={addToCartHandler}
                        variant="secondary"
                        size="lg"
                        disabled={product.count_in_servings === 0}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="py-5">
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && <Message variant='warning'>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#f8e825' />
                    <p>{review.created_date.slice(0,10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                )) }

                <ListGroup.Item>
                  <h4>Write a review</h4>
                  {loadingProductReview && <Loader />}
                  {successProductReview && <Message variant='success'>Review submitted</Message>}
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Select rating here...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Satisfactory</option>
                          <option value='4'>4 - Very Satisfactory</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as='textarea' rows={5} value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                      </Form.Group>
                      <div className="d-grid gap-2 mt-2">
                        <Button disabled={loadingProductReview} type="submit" variant="secondary">Submit Review</Button>
                      </div>
                    </Form>
                  ):(
                    <Message variant='warning'>Please <Link to='/login' style={{color: '#4A2F28'}}><strong>login</strong></Link> to write a review for this food.</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
