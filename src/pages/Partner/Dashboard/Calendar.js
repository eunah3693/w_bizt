import React from "react";

import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Calendar from "appComponents/graph/Calendar";

const useStyles = makeStyles((theme) => ({
  cal_wrap: {
    padding: "40px 0 20px 0",
  },
  title: {
    padding: "0px 0 30px 26px",
    fontSize: "18px",
    letterSpacing: "-1px",
  },
  calendar: {
    padding: "0 16px",
  },
}));

function DashboardCalendar(props) {
  const classes = useStyles();

  return (
    <Box className={classes.Dashboard}>
      {/*  이용 및 예약 현황 달력*/}
      <Box className={classes.cal_wrap}>
        <h5 className={classes.title}>날짜별 이용현황</h5>
        <div className={classes.calendar}>
          <Calendar data={props.data} />
        </div>
      </Box>
      {/*  이용 및 예약 현황 달력*/}
      <Divider />
    </Box>
  );
}

export default DashboardCalendar;
