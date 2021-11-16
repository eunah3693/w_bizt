import React from "react";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";

// width:100%인 버튼

export const BootstrapButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: theme.palette.primary.navy,
    borderColor: theme.palette.primary.navy,
    "&:hover": {
      backgroundColor: theme.palette.primary.navy,
      borderColor: theme.palette.primary.navy,
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.navy,
      borderColor: theme.palette.primary.navy,
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    width: "100%",
    height: "45px",
    color: theme.typography.light,
    backgroundColor: theme.palette.primary.navy,
    border: "0",
    borderRadius: "0",

    fontSize: "15px",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default function Button100({ children, ...props }) {
  const classes = useStyles();

  // 텍스트가 아니라 child로 받기
  return (
    <div>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
        {...props}
      >
        {children}
      </BootstrapButton>
    </div>
  );
}
