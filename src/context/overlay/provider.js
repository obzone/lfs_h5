import * as React from "react";
import { OverlayContext } from "./";
import { Popup } from "../../components/Popup";
import { popupTypes, getPopupProps } from "./popup";
import { auth } from "../auth";

class OverlayProvider extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { popups } = prevState;
    const { history, error } = nextProps;
    let popupsList = [];

    if (popups) {
      popupsList = [...popups];
    }

    // add network errors
    if (error) {
      if (error.response.status === 401) {
        auth.logout();
        history.push("/sign-in");
      }
    }

    return {
      showPopup: popupsList.length > 0,
      popups: popupsList,
    };
  }

  constructor(props) {
    super(props);

    this.togglePopup = this.togglePopup.bind(this);

    this.state = {
      showPopup: false,
      popups: [],
      value: {
        popupTypes,
        togglePopup: this.togglePopup,
      },
    };
  }

  /**
   * Display a popup, it will use component "Popup" by default,
   * but you can also insert your custom dialog into setting.dialog
   *
   *   custom example:
   *       togglePopup(popupTypes.DATERANGE, {
   *        getDialog: (key) => customdialog
   *     });
   *
   */
  togglePopup = function (type, settings) {
    if (typeof type === "string") {
      this.addPopup(type, settings);
    } else if (type === false) {
      this.clearPopup();
    } else {
      this.setState({
        showPopup: type,
      });
    }
  };

  addPopup = function (type, settings) {
    if (type) {
      this.setState((prevState) => {
        const list = [...prevState.popups, { type, settings }];
        return {
          popups: list,
          showPopup: list.length > 0,
        };
      });
    } else {
      console.log("Empty Popup");
    }
  };

  removePopupType = function (index) {
    this.setState((state) => {
      const list = state.popups.filter((_, key) => Number(index) !== key);
      return {
        popups: list,
        showPopup: list.length > 0,
      };
    });
  };

  clearPopup = function () {
    this.setState({
      popups: [],
      showPopup: false,
    });
  };

  drawPopup = function (popups) {
    const popupList = [];
    let settings;
    let popupProps;

    popups.forEach((item, index) => {
      if (item && item.type) {
        settings = item.settings || {};
        // allow custom type of dialog component as input, remember to add "key" in props
        if (settings && settings.getDialog) {
          popupList.push(settings.getDialog(index));
        } else {
          popupProps = getPopupProps(item.type, settings, () =>
            this.removePopupType(index)
          );
          popupList.push(<Popup key={index} {...popupProps} />);
        }
      }
    });
    return popupList;
  };

  render = function () {
    const { children } = this.props;
    const { showPopup, popups, value } = this.state;
    return (
      <OverlayContext.Provider value={value}>
        {children}
        {showPopup && this.drawPopup(popups)}
      </OverlayContext.Provider>
    );
  };
}

export default OverlayProvider;
