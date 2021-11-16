import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  wrapper: {
    boxShadow: "none",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    "&.Mui-expanded": {
      minHeight: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: "0",
      flexDirection: "column",
      display: "block",
      fontWeight: "bold",
    },
    "& .MuiIconButton-edgeEnd": {
      padding: 0,
      margin: 0,
    },
  },
  detail: {
    padding: 0,
  },
}));
export default function SearchDetailAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.wrapper}>
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box>{props.title}</Box>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className={classes.detail}>
          <Box p={2} width="100%">
            {props.children}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
