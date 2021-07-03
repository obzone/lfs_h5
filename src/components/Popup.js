import * as React from "react";

import {
  faCheckCircle as SuccessIcon,
  faQuestionCircle as ConfirmIcon,
  faInfoCircle as InfoIcon,
  faExclamationCircle as ErrorIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Modal, Button } from "@themesberg/react-bootstrap";

export const Popup = ({
  open,
  title,
  titleIcon,
  popupStyle = "info",
  message,
  rightText = "确定",
  leftText = "",
  leftHandler = () => {},
  rightHandler = () => {},
  onClose = () => {},
}) => {
  const renderIcon = React.useMemo(() => {
    let faIcon;
    let color;
    if (titleIcon) {
      faIcon = titleIcon;
      color = "";
    } else {
      switch (popupStyle) {
        case "confirm":
          faIcon = ConfirmIcon;
          color = "Tomato";
          break;
        case "success":
          faIcon = SuccessIcon;
          color = "#05a677";
          break;
        case "error":
          faIcon = ErrorIcon;
          color = "Tomato";
          break;
        default:
          faIcon = InfoIcon;
          color = "Dodgerblue";
          break;
      }
    }
    return (
      <FontAwesomeIcon
        icon={faIcon}
        style={{ fontSize: "1.5rem", color: color, marginRight: "10px" }}
      />
    );
  }, [titleIcon, popupStyle]);

  return (
    <div>
      <Modal show={open} onHide={onClose} centered>
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title>
            {renderIcon}
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          {leftText && <Button onClick={leftHandler}>{leftText}</Button>}
          <Button onClick={rightHandler}>{rightText}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
