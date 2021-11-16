import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import Calendar from "react-calendar";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& .MuiAccordionSummary-content": {
      margin: "0",
      flexDirection: "column",
    },
    "& .MuiAccordion-root.Mui-expanded": {
      borderBottom: "1px solid lightgray",
      margin: 0,
    },
    "& .MuiAccordion-root.Mui-expanded:before": {
      opacity: "1",
    },
    "& .react-calendar": {
      width: "auto",
    },
    "& .react-calendar__tile--active::after": {
      content: "none",
    },
  },
}));

export default function CalendarUser() {
  const classes = useStyles();

  return (
    <Box m={1} className={classes.wrapper}>
      <Calendar />
    </Box>
  );
}
