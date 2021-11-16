import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import Office from "pages/Partner/Office";
import Reservation from "pages/Partner/Reservation";
import Message from "pages/Partner/Message";
import Dashboard from "pages/Partner/Dashboard";
import Mypage from "pages/Partner/MyPage";
import Terms from "pages/Policy/Terms";

export default function PartnerApp() {
  let { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <Redirect to={`${path}/dashboard`} />
      </Route>
      <Switch>
        <Route path={`${path}/office`} component={Office} />
        <Route path={`${path}/reservation`} component={Reservation} />
        <Route path={`${path}/message`} component={Message} />
        <Route path={`${path}/mypage`} component={Mypage} />
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/policy`} component={Terms} />
      </Switch>
    </>
  );
}
