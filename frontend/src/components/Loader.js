import React from "react";
import { Spinner } from "react-bootstrap";
import "../index.css";

const Loader = () => {
  return (
    <Spinner
      animation="grow"
      role="status"
      variant="secondary"
      style={{
        height: "100px",
        width: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading Menu..</span>
    </Spinner>
  );
};

export default Loader;
