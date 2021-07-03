import * as React from "react";
import OverlayProvider from "./provider";
import { popupTypes } from "./popup";

const OverlayContext = React.createContext({
  popupTypes,
  toggleLoading: (isShow) => {
    return;
  },
  togglePopup: (type, settings) => {
    return;
  },
});

const withOverlay = (Component) => (props) => (
  <OverlayContext.Consumer>
    {(overlay) => <Component overlay={overlay} {...props} />}
  </OverlayContext.Consumer>
);

const useOverlay = () => React.useContext(OverlayContext);

export { OverlayContext, OverlayProvider, withOverlay, useOverlay };
