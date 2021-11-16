import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import TopToolBar from "appComponents/menu/TopToolBar";
import BotNav from "appComponents/menu/BottomNavigationBar";

import UserApp from "pages/User/UserApp";
import PartnerApp from "pages/Partner/PartnerApp";
import Login from "pages/Login/LoginIndex";

import { AccountContext, LoginContext, TTBContext } from "utility/contexts";

import "css/common.css";
import "css/SpringBottomSheet.css";
import {
  onResponseSuccess,
  pingBiztApi,
  requestBiztApi,
} from "utility/connectivity";
import { app_getValue } from "utility/ApplicationInterface";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexFlow: "column",
    height: "100%",
    maxWidth: "450px",
    margin: "auto",
  },
  head: {
    zIndex: 100, // zIndex TopToolBar : 1100, SwipableSheet: 1101
    flex: "0 0 48px",
    height: "48px",
    maxWidth: "inherit",
  },
  body: {
    overflowY: "auto",
    flex: "1 1 auto",
    maxWidth: "inherit",
  },
  footOffset: {
    zIndex: 102,
    flex: "0 0 56px",
    height: "56px",
    maxWidth: "inherit",
  },
  footContent: {
    width: "100vw",
    maxWidth: "inherit",
    backgroundColor: "white",
    position: "fixed",
    height: "56px",
    bottom: "0px",
  },
}));

function autoLogin(callback) {
  app_getValue("account", (value) => {
    if (!value) return;
    requestBiztApi(
      "/api/login",
      { member_email: value.id, member_password: value.pass },
      (res) => {
        if (res.result === "01") {
          // do something about password change suggestion
        }
        requestBiztApi("/api/account", null, onResponseSuccess(callback));
      }
    );
  });
}

function App() {
  //ttbOptional 은 {path: "", button: "react object"} 형태로 구성
  const [ttbOptional, setTtbOptional] = useState();
  const [loginCallback, setLoginCallback] = useState(() => {});
  const [account, setAccount] = useState(null);

  useEffect(() => {
    pingBiztApi((res) => {
      if (!res?.logged_in) autoLogin(setAccount);
      else requestBiztApi("/api/account", null, onResponseSuccess(setAccount));
    });
    setInterval(pingBiztApi, 300000);
  }, []);

  // TopToolBar가 제외될 url의 목록.
  // 목록이 커질 시 별도의 방법을 관리해야함.
  // 가급적이면 해당 페이지 Component에서 설정 관리를 할 수 있는 방법을 모색
  const pathToExcludeTTB = ["/search", "/home"];

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Switch>
        <Route path={pathToExcludeTTB} />
        <Route path="/">
          <Box className={classes.head}>
            <TopToolBar optional={ttbOptional} />
          </Box>
        </Route>
      </Switch>
      {/* loginContext는 아직 사용되고있지 않음. */}
      <AccountContext.Provider value={[account?.[0], setAccount]}>
        <LoginContext.Provider value={[loginCallback, setLoginCallback]}>
          <TTBContext.Provider value={setTtbOptional}>
            <Box className={classes.body}>
              <Switch>
                <Route path="/partner" component={PartnerApp} />
                <Route path="/" component={UserApp} />
              </Switch>
            </Box>
          </TTBContext.Provider>
          <Login />
        </LoginContext.Provider>
      </AccountContext.Provider>
      <Box className={classes.footOffset}>
        <Box className={classes.footContent}>
          <BotNav />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
export const testing = true;
