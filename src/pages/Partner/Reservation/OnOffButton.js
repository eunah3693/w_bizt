import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ReviewWrite from "pages/Partner/ReviewWrite";
import DenyWrite from "pages/Partner/Reservation/DenyWrite";

const useStyles = makeStyles((theme) => ({
  wrap: {
    width: "100%",
    "& .MuiButton-root.Mui-disabled": {
      color: theme.typography.light,
    },
  },
  box: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    height: "47px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: "none",
    borderRadius: "0px",
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.typography.light,
    color: theme.palette.primary.navy,
    "&:hover": {
      backgroundColor: theme.palette.primary.navy,
      color: theme.typography.light,
    },
  },

  colorchange: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.typography.light,
  },
  disabled: {
    border: `1px solid ${theme.typography.sub}`,
    backgroundColor: theme.typography.sub,
    color: theme.typography.light,
  },
  popup_title: {
    fontSize: "15px",
    fontWeight: "500",
  },
}));

function OnOffButton(props) {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState(false);
  const [reviewOpen, setReviewOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
  const [children, setChildren] = React.useState(props.children);
  const [error, setError] = React.useState();
  const type = props.type;

  const ClickOpen = () => {
    if (children === "리뷰 작성" || children === "리뷰 확인") {
      setReviewOpen(true);
    } else {
      setDenyOpen(true);
    }
  };

  const reviewClose = () => {
    setReviewOpen(false);
    setError("");
  };
  const denyClose = () => {
    setDenyOpen(false);
    setError("");
  };

  const reviewSubmit = (txt, star) => {
    if (!txt) {
      setError("* 사용자리뷰를 입력해주세요");
    } else if (!star) {
      setError("* 사용자별점을 입력해주세요");
    } else {
      setReviewOpen(false);
      setError("");
      setChildren("리뷰 확인");
      setColor(true);
      setDisabled(true);
    }
  };
  const denySubmit = (txt) => {
    if (!txt) {
      setError("* 취소사유를 입력해주세요");
    } else {
      setDenyOpen(false);
      setError("");
      setChildren("예약취소 완료");
      setColor(true);
      setDisabled(true);
    }
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.box}>
        <Button
          className={clsx(classes.button, color ? classes.colorchange : null)}
          disableRipple
          onClick={() => {
            ClickOpen();
          }}
        >
          {children}
        </Button>
      </div>
      {/* 사용자리뷰 팝업 */}
      <Dialog
        open={reviewOpen}
        fullWidth={true}
        onClose={reviewClose}
        className={classes.popup}
        aria-labelledby="form-dialog-title"
      >
        <ReviewWrite
          error={error}
          close={reviewClose}
          submit={(txt, star) => {
            reviewSubmit(txt, star);
          }}
          disabled={disabled}
        ></ReviewWrite>
      </Dialog>
      {/* 예약취소 팝업 */}
      <Dialog
        open={denyOpen}
        fullWidth={true}
        onClose={denyClose}
        className={classes.popup}
        aria-labelledby="form-dialog-title"
      >
        <DenyWrite
          error={error}
          close={denyClose}
          submit={(txt) => {
            denySubmit(txt);
          }}
          disabled={disabled}
        ></DenyWrite>
      </Dialog>
    </div>
  );
}

export default OnOffButton;
