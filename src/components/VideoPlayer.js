import * as React from "react";

export default (props) => {
  const { src, width = "200px", height = "200px" } = props;

  return !!src ? (
    <video controls width={width} height={height} {...props}>
      <source src={src} type={"video/mp4"} />
      <source src={src} type={"video/webm"} />
      <source src={src} type={"video/ogg"} />
    </video>
  ) : null;
};
