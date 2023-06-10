import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate()
  const location = useLocation()

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword){
        history(`/?keyword=${keyword}`)
    }else{
        history(history(location.pathname))
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
          placeholder="Search food here..."
        ></Form.Control>
        <Button type="submit" variant="outline-primary" className="p-2">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
