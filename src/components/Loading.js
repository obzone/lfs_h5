import React from "react";

import { Spinner } from "@themesberg/react-bootstrap";

export default () => {
  const style = {
    display: "flex",
    height: "100px",
    alignItems: "center",
    flexDirection: "column-reverse",
  };
  return (
    <div style={style}>
      <div>
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
      </div>
    </div>
  );
};
