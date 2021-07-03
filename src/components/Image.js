import React from "react";
import { Image } from "@themesberg/react-bootstrap";

export default (props) => {
  const {
    description = "",
    style = {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "200px",
      width: "200px",
      marginTop: "10px",
    },
  } = props;
  return props.src ? (
    <Image alt={description} style={style} src={props.src} rounded />
  ) : null;
};
