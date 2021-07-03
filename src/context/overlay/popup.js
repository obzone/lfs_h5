const popupTypes = {
  IMPORT: "POPUP_IMPORT",
  DATERANGE: "POPUP_DATERANGE",
  SUMMARY: "POPUP_SUMMARY",
  INFO: "POPUP_INFO",
  SUCCESS: "POPUP_SUCCESS",
  ERROR: "POPUP_ERROR",
  CONFIRM: "POPUP_CONFIRM",
};

const popupTypeConfigs = {
  [popupTypes.INFO]: {
    title: "信息",
    popupStyle: "info",
    rightText: "确定",
  },
  [popupTypes.SUCCESS]: {
    title: "成功",
    popupStyle: "success",
    rightText: "确定",
  },
  [popupTypes.ERROR]: {
    title: "错误",
    popupStyle: "error",
    rightText: "确定",
  },
  [popupTypes.CONFIRM]: {
    title: "您确定要执行这个操作吗",
    popupStyle: "confirm",
    leftText: "取消",
    rightText: "确定",
  },
};

const getPopupProps = (type, settings, closePopup) => {
  const popupProps = popupTypeConfigs[type]
    ? {
        open: !!type,
        ...popupTypeConfigs[type],
        leftHandler: closePopup,
        rightHandler: closePopup,
        onClose: () => closePopup,
        ...settings,
      }
    : {};

  switch (type) {
    case popupTypes.ERROR:
      const onDismiss = () => {
        if (settings.onDismiss) {
          settings.onDismiss();
        }
        closePopup();
      };
      popupProps.rightHandler = onDismiss;
      popupProps.onClose = onDismiss;
      break;
    case popupTypes.CONFIRM:
      popupProps.rightHandler = () => {
        if (settings.confirmCallback) {
          settings.confirmCallback();
        }
        closePopup();
      };
      break;
  }

  return popupProps;
};

export { popupTypes, getPopupProps };
