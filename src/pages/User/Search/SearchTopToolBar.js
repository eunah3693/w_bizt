import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import AddressInputBox from "pages/User/Search/AddressInputBox";
import Drawer from "pages/User/Search/Drawer";

import { Box, Divider, IconButton, Paper } from "@material-ui/core";
const useStyle = makeStyles(() => ({
  root: {
    height: "56px",
    width: "100%",
    top: 0,
    zIndex: 10001,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  container: {
    width: "100%",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
export default function SearchTopToolBar() {
  const classes = useStyle();

  return (
    <Paper component="form" className={classes.root}>
      <Box
        className={classes.container}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <AddressInputBox />
        <Divider className={classes.divider} orientation="vertical" />
        <Drawer />
      </Box>
    </Paper>
  );
}
