import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ResDeny from "pages/Messages/ResDeny";
const useStyles = makeStyles((theme) => ({
  buttonWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    height: "47px",
    display: "flex",
    flexGrow: "1",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: "none",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.typography.light,
    color: theme.palette.primary.main,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.typography.light,
      color: theme.palette.primary.main,
      boxShadow: "none",
    },
    "&:nth-child(2)": {
      marginLeft: "10px",
    },
  },
  popup: {
    width: "100%",
    "& .MuiDialog-container": {
      width: "100%",
    },
  },
}));

function MessButton(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState();

  const [btnState, setBtnState] = useState("notSelected");

  const denyBtn = () => {
    setOpen(true);
  };
  const approveBtn = () => {
    setBtnState("approveSelected");
  };
  const denyCancelBtn = () => {
    setBtnState("notSelected");
  };
  const handleSubmit = (txt) => {
    console.log(txt);
    if (!txt) {
      setError("* 거부사유를 입력해주세요");
    } else {
      setOpen(false);
      setError("");
      setBtnState("denySelected");
    }
  };
  const handleClose = (txt) => {
    setOpen(false);
    setError("");
  };
  function renderSwitch(btnState) {
    switch (btnState) {
      case "notSelected":
        return (
          <>
            <Button
              color="primary"
              className={classes.button}
              onClick={approveBtn}
            >
              승인
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={denyBtn}
            >
              거부
            </Button>
          </>
        );
      case "approveSelected":
        return (
          <Button color="primary" className={classes.button} onClick={denyBtn}>
            승인취소/거부
          </Button>
        );
      case "denySelected":
        return (
          <Button
            color="primary"
            className={classes.button}
            onClick={denyCancelBtn}
          >
            거부취소
          </Button>
        );
      default:
        return "";
    }
  }

  return (
    <div>
      <div className={classes.buttonWrap}>{renderSwitch(btnState)}</div>
      {/* 거부사유 팝업 */}
      <Dialog
        disableScrollLock
        open={open}
        fullWidth={true}
        onClose={handleClose}
        className={classes.popup}
        aria-labelledby="form-dialog-title"
      >
        <ResDeny
          error={error}
          close={handleClose}
          submit={(txt) => {
            handleSubmit(txt);
          }}
        ></ResDeny>
      </Dialog>
    </div>
  );
}
export default MessButton;
