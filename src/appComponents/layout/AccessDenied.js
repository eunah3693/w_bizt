import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "Img/mainlogo.svg";

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    border: `1px solid ${theme.palette.primary.lightdark}`,
  },
  Input: {
    border: `1px solid ${theme.palette.primary.lightdark}`,
    padding: "5px 20px 5px 10px",
    borderRadius: "10px",
    marginBottom: "5px",
    width: "100%",
  },
  InvalidInput: {
    border: `1px solid ${theme.palette.primary.red}`,
    padding: "5px 20px 5px 10px",
    borderRadius: "10px",
    marginBottom: "5px",
    width: "100%",
  },
  InvalidHelper: {
    width: "100%",
    color: "red",
    fontSize: "9px",
    paddingLeft: " 5px",
    paddingBottom: "5px",
  },
  label: {
    paddingLeft: "5px",
    color: `${theme.palette.primary.darkGray}`,
  },
  loginBtn: {
    border: `1px solid ${theme.palette.primary.lightdark}`,
    width: "50%",
    padding: "5px 5px",
    marginTop: "3px",
    marginBottom: "5px",
    borderRadius: "10px",
    background: theme.palette.primary.blueGradient,
    color: "white",
  },
}));

export default function AccessDenied(props) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="login-wrapper Padding20px">
      <div className="FlexCenter imgWrapper" style={{ margin: "40px" }}>
        <img className={classes.spotIcon} src={Logo} alt="" />
      </div>
      <Box className="FlexCenter">
        <div style={{ width: "100%" }}>
          <div style={{ textAlign: "center", padding: " 20px 0" }}>
            로그인이 필요한 페이지 입니다!
          </div>

          <div className="" style={{ width: "100%" }}>
            <button
              style={{ width: "100%" }}
              className={classes.loginBtn}
              type="submit"
              onClick={() => {
                history.push({
                  search: "?request-login=user",
                });
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
}
