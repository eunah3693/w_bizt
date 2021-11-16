import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedCheckbox from "appComponents/interaction/CircleCheckbox";

import Logo from "Img/mainlogo.svg";
import { requestBiztApi } from "utility/connectivity";
import { AccountContext, LoginContext } from "utility/contexts";
import { deviceType } from "utility/ApplicationInterface";

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    border: "1px solid #e7e7e7",
  },
  Input: {
    border: "1px solid #e7e7e7",
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
    color: "#515151",
  },
  btnWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  loginBtn: {
    width: "50%",
    border: "1px solid #e7e7e7",
    padding: "5px 5px",
    marginTop: "10px",
    marginBottom: "5px",
    borderRadius: "10px",
    background: theme.palette.primary.blueGradient,
    color: "white",
  },
}));

export default function LoginIndex() {
  const classes = useStyles();
  const history = useHistory();

  const [_, setAccount] = useContext(AccountContext);
  const [callback] = useContext(LoginContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // 로그인 실패 시 UI
  const [fail, setFail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = new FormData();
    body.append("member_email", email);
    body.append("member_password", password);

    requestBiztApi(
      "/api/login",
      {
        method: "POST",
        body: body,
      },
      (res) => {
        if (res.result.match(/0./)?.length) {
          requestBiztApi("/api/account", null, (res) => {
            if (res.result === "00") {
              setAccount(res.data);
              callback?.();
              history.push({
                search: "",
              });
            }
          });
        } else {
          setFail(true);
        }
      }
    );
  };

  return (
    <div className="login-wrapper Padding20px">
      <div className="FlexCenter imgWrapper" style={{ margin: "40px" }}>
        <img className={classes.spotIcon} src={Logo} alt="BIZT" />
      </div>
      <Box className="FlexCenter">
        <form onSubmit={handleSubmit}>
          {fail && (
            <p className={classes.InvalidHelper}>
              아이디 또는 비밀번호가 일치하지 않습니다.{" "}
            </p>
          )}
          <input
            style={{ width: "100%" }}
            className={fail ? classes.InvalidInput : classes.Input}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디"
          />
          <input
            style={{ width: "100%" }}
            className={fail ? classes.InvalidInput : classes.Input}
            placeholder="비밀번호"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={classes.btnWrapper}>
            <button className={classes.loginBtn} type="submit">
              로그인
            </button>
            <button
              className={classes.loginBtn}
              onClick={() => {
                history.push({
                  search: "?request-login=register",
                });
              }}
            >
              회원가입
            </button>
            {deviceType !== "etc" && (
              <div className="FlexEnd">
                <CustomizedCheckbox
                  style={{ marginRight: "4px" }}
                  label="자동로그인"
                />
              </div>
            )}
          </div>
        </form>
      </Box>
    </div>
  );
}
