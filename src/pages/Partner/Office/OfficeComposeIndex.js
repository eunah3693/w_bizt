import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import RoomAdd from "./RoomAdd";
import OfficeCompose from "./OfficeCompose";

export default function OfficeComposeIndex() {
  const { path } = useRouteMatch(); // /partner/office/compose

  return (
    <Switch>
      <Route path={`${path}/([0-9]+)/room`} component={RoomAdd} />
      <Route path={path} component={OfficeCompose} />
    </Switch>
  );
}
