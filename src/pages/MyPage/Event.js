import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  wrap: {
    paddingTop: "20px"
  },
  event: {
    width: "90%",
    height: "150px",
    margin: "10px auto",
    border: `1px solid ${theme.palette.primary.main}`,
    display: "block",
  }

}));



export default function Event() {
  const classes = useStyles();

  return (
    <Box className={classes.wrap}>
      <Box className={classes.event} component={Link} ></Box>
      <Box className={classes.event} component={Link} ></Box>
      <Box className={classes.event} component={Link} ></Box>
      <Box className={classes.event} component={Link} ></Box>
    </Box>
  );
}
