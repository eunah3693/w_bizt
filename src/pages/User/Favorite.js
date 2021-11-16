import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import SearchDetail from "pages/User/Search/searchDetailComponents/SearchDetail";
import RegisterReview from "pages/User/RegisterReview";
import MyReservation from "pages/User/Reservation/MyReservation";
import FavoriteIndex from "./Favorite/FavoriteIndex";

export default function Favorite() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/([0-9]+)`} component={SearchDetail} />
      <Route path={`${path}/review/([0-9]+)`} component={RegisterReview} />
      <Route
        path={`${path}/myreservation/([0-9]+)`}
        component={MyReservation}
      />
      <Route path={path} component={FavoriteIndex} />
    </Switch>
  );
}
