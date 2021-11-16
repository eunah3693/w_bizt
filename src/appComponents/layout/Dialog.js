import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const UseStyle = makeStyles((theme) => ({
  wrapper: {},
  modalTitle: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  modalContents: {
    textAlign: "center",
    fontSize: "14px",
    wordBreak: "keep-all",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  next: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "white",
    borderRadius: "1px",
    width: "40%",
  },
  cancel: {
    borderRadius: "1px",
    color: `${theme.palette.primary.main}`,
    width: "40%",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  confirm: {
    borderRadius: "1px",
    color: "white",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
}));

function AlertDialogExample(props) {
  const classes = UseStyle();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let nextButtonAttribute = {
    color: "primary",
    className: classes.next,
    autoFocus: true,
  };

  if (typeof props.nextClick === "function") {
    nextButtonAttribute = {
      ...nextButtonAttribute,
      onClick: () => {
        props.nextClick();
        handleClose();
      },
    };
  } else if (typeof props.nextClick === "string") {
    nextButtonAttribute = {
      ...nextButtonAttribute,
      onClick: handleClose,
      component: Link,
      to: props.nextClick,
    };
  }

  return (
    <div className={classes.wrapper} style={{ width: "100%" }}>
      <Button className="wideBtnWrapper" onClick={handleClickOpen}>
        <span className="wideBtn">{props.buttonName}</span>
      </Button>
      <Dialog
        disableScrollLock
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
          {props.modalTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.modalContents}
          >
            {props.modalContents}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.buttonGroup}>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.cancel}
          >
            {props.cancel || "취소"}
          </Button>
          <Button {...nextButtonAttribute}> {props.next || "확인"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogExample;
