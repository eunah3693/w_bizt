import React, { useState } from "react";
import {
  createTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";

export const BootstrapButton = withStyles((theme) => ({
  root: {
    minWidth: "12px",
    padding: "9px 13px",
    boxShadow: "none",
    textTransform: "none",
    borderRadius: "50%",
    fontSize: 14,
    border: "1px solid",
    lineHeight: 1.5,
    fontWeight: "600",
    backgroundColor: theme.typography.light,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      boxShadow: "none",
      color: theme.typography.light,
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.typography.light,
    },

    "& MuiButton-root": {
      minWidth: "12px",
      padding: "10px 11px",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  colorchange: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    boxShadow: "none",
    color: theme.typography.light,
  },
}));

export default function CircleButton(props) {
  const classes = useStyles();

  return (
    <div>
      <BootstrapButton
        variant="contained"
        disableRipple
        className={props.value ? classes.colorchange : null}
        onClick={props.onClick}
      >
        {props.text}
      </BootstrapButton>
    </div>
  );
}
