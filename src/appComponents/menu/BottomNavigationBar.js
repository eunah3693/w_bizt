import React, { useState, useEffect } from "react";

import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@material-ui/core/";

import {
  Search,
  Favorite,
  Home,
  ChatBubbleOutline,
  Person,
  HelpOutline,
  Dashboard,
  Business,
  HowToReg,
} from "@material-ui/icons";

import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  root: {
    background: "white",
    maxWidth: "inherit",
  },
  container: {
    "& .MuiBottomNavigationAction-root": {
      minWidth: "0",
      "@media (max-width: 768px)": {
        minWidth: "auto",
        paddingInline: "0",
      },
    },
  },
  menuItem: {},
  divider: {
    width: "100%",
    maxWidth: "inherit",
    position: "fixed",
    zIndex: 1,
  },
}));

const userMenuItems = {
  home: { value: "home", label: "Home", icon: Home },
  search: { value: "search", label: "Search", icon: Search },
  favorites: { value: "favorite", label: "Favorite", icon: Favorite },
  message: { value: "message", label: "Message", icon: ChatBubbleOutline },
  mypage: { value: "mypage", label: "MyPage", icon: Person },
};

const partnerMenuItems = {
  dashboard: { value: "dashboard", label: "Dashboard", icon: Dashboard },
  office: { value: "office", label: "Office", icon: Business },
  reservation: { value: "reservation", label: "Reservation", icon: HowToReg },
  message: { value: "message", label: "Message", icon: ChatBubbleOutline },
  mypage: { value: "mypage", label: "MyPage", icon: Person },
};

const MenuButton = (props) => {
  let { path } = useRouteMatch();
  if (path === "/") {
    path = "";
  }

  const { icon, ...other } = props;
  const Icon = icon;

  const classes = styles();
  return (
    <BottomNavigationAction
      component={Link}
      to={path + "/" + props.value}
      icon={<Icon />}
      className={classes.menuItem}
      {...other}
    />
  );
};

function getMenuName(pathname) {
  let pathArr = pathname.split("/");
  let selectedMenu = pathArr[1];

  if (!selectedMenu) {
    selectedMenu = "home";
  } else if (selectedMenu === "partner") {
    if (!pathArr[2]) {
      selectedMenu = "dashboard";
    } else {
      selectedMenu = pathArr[2];
    }
  }

  return selectedMenu;
}

export default function LabelBottomNavigation() {
  let history = useHistory();
  const [selected, setSelected] = useState(
    getMenuName(history.location.pathname)
  );

  useEffect(() => {
    return history.listen((location) => {
      setSelected(getMenuName(location.pathname));
    });
  }, [history]);

  const classes = styles();

  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <Switch>
        <Route path="/partner">
          <BottomNavigation value={selected} className={classes.container}>
            <MenuButton {...partnerMenuItems.office} />
            <MenuButton {...partnerMenuItems.reservation} />
            <MenuButton {...partnerMenuItems.dashboard} />
            <MenuButton {...partnerMenuItems.message} />
            <MenuButton {...partnerMenuItems.mypage} />
          </BottomNavigation>
        </Route>

        <Route path="/">
          <BottomNavigation value={selected} className={classes.container}>
            <MenuButton {...userMenuItems.search} />
            <MenuButton {...userMenuItems.favorites} />
            <MenuButton {...userMenuItems.home} />
            <MenuButton {...userMenuItems.message} />
            <MenuButton {...userMenuItems.mypage} />
          </BottomNavigation>
        </Route>
      </Switch>
    </div>
  );
}
