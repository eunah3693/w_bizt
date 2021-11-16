import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";
import Home from "pages/User/Home";
import Search from "pages/User/Search";
import Favorite from "pages/User/Favorite";
import Message from "pages/User/Message";
import MyPage from "pages/User/MyPage";
import Billing from "pages/User/Billing";
import "css/UserCommon.css";

export default function UserApp() {
  let { path } = useRouteMatch();
  let userPath = path;
  if (path === "/") {
    userPath = "";
  }

  return (
    <Box className="UserPageStyle">
      <Route exact path={path}>
        <Redirect to={`${userPath}/home`} />
      </Route>
      <Switch>
        <Route path={`${userPath}/search`} component={Search} />
        <Route path={`${userPath}/favorite`} component={Favorite} />
        <Route path={`${userPath}/message`} component={Message} />
        <Route path={`${userPath}/mypage`} component={MyPage} />
        <Route path={`${userPath}/billing`} component={Billing} />
        <Route path={`${userPath}/home`} component={Home} />
      </Switch>
    </Box>
  );
}
