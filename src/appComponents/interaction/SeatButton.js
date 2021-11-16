import React, { useState } from "react";
import clsx from "clsx";
import "swiper/swiper.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
export const BootstrapButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    border: "1px solid",
    lineHeight: 1.5,
    fontWeight: "600",
    backgroundColor: "none",
    borderColor: "none",

    "& .MuiButton-root": {
      minWidth: "12px",
      padding: "6px 11px",
    },
  },
}))(Button);
const ButtonStyle = makeStyles((theme) => ({
  box_inner: {
    width: "70px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  click1: {
    border: `1px solid ${theme.typography.dark}`,
    backgroundColor: theme.typography.light,
    color: theme.typography.main,
    "&:hover": {
      border: `1px solid ${theme.typography.dark}`,
      backgroundColor: theme.typography.light,
      color: theme.typography.main,
      boxShadow: "none",
    },
  },
  click2: {
    border: `1px solid ${theme.palette.primary.sub}`,
    backgroundColor: theme.palette.primary.sub,
    color: theme.typography.light,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.sub}`,
      backgroundColor: theme.palette.primary.sub,
      color: theme.typography.light,
      boxShadow: "none",
    },
  },
  click3: {
    border: `1px solid ${theme.typography.dark}`,
    backgroundColor: theme.typography.dark,
    color: theme.typography.light,
    "&:hover": {
      border: `1px solid ${theme.typography.dark}`,
      backgroundColor: theme.typography.dark,
      color: theme.typography.light,
      boxShadow: "none",
    },
  },
}));

const ThirdClickButton = (props) => {
  const classes = ButtonStyle();
  const [isClick, setClick] = useState(1);
  const ClickButton = () => {
    console.log(isClick);
    if (isClick == 1) {
      setClick(2);
    } else if (isClick == 2) {
      setClick(3);
    } else if (isClick == 3) {
      setClick(1);
    }
  };

  return (
    <BootstrapButton
      variant="contained"
      color="primary"
      disableRipple
      className={clsx(
        classes.box_inner,
        isClick == 1
          ? classes.click1
          : isClick == 2
          ? classes.click2
          : classes.click3
      )}
      onClick={ClickButton}
    >
      {props.num}
    </BootstrapButton>
  );
};

const SeatButtonStyle = makeStyles((theme) => ({
  box_wrap: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: "22px",
  },
  box: {
    width: "80px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box_inner: {
    width: "70px",
    height: "40px",
    border: `1px solid ${theme.palette.primary.lightdark}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SeatButton = (props) => {
  const classes = SeatButtonStyle();
  var array = [];
  function makingSeat(num) {
    for (var i = 1; i < num + 1; i++) {
      array.push(i);
    }
  }
  makingSeat(props.num);


  return (
    <div className={classes.box_wrap}>
      {array.map((val, idx) => (
        <div className={classes.box} key={idx}>
          <ThirdClickButton num={val}></ThirdClickButton>
        </div>
      ))}
    </div>
  );
};
export default SeatButton;
