import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useHistory,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import AccountSetting from "pages/MyPage/AccountSetting";

import Profile from "pages/MyPage/Profile";
import { AccountContext } from "utility/contexts";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.typography.color,
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
}));

export default function MyPageMenu({ menuItems }) {
  const { path } = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    return history.listen((location, action) => {});
  }, [history]);

  return (
    <Switch>
      <Route path={`${path}/setting`} component={AccountSetting} />
      <Route path={path}>
        <Box style={{ padding: "0 10px" }}>
          <Profile />
        </Box>
        <Divider />
        <Box style={{ padding: "0 10px" }}>
          <AccountContext.Consumer>
            {([account]) => (
              <List component="nav" aria-label="secondary mailbox folders">
                {Object.values(menuItems)?.map((menuItem, idx) => {
                  if (menuItem.login && !account) return false;
                  return (
                    <div key={idx}>
                      <ListItem
                        component={Link}
                        to={menuItem.path}
                        className={classes.link}
                      >
                        <ListItemText
                          primary={
                            <span style={{ fontSize: "13px" }}>
                              {menuItem.text}
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider className={classes.Divider} />
                    </div>
                  );
                })}
              </List>
            )}
          </AccountContext.Consumer>
        </Box>
      </Route>
    </Switch>
  );
}
