import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { PinDropSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  sales_info_wrap: {
    width: "100%",
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  sales_info_left: {
    width: "50%",
    borderRight: `1px solid ${theme.palette.primary.lightdark}`,
    paddingTop: "30px",
    paddingBottom: "10px",
  },
  sales_info_right: {
    width: "50%",
    paddingTop: "30px",
    paddingBottom: "10px",
  },
  sales_info_box: {
    height: "85px",
    paddingLeft: "26px",
    letterSpacing: "-1px",
    fontWeight: "500",
  },
  sales_info_title: {
    fontSize: "15px",
    paddingBottom: "5px",
    letterSpacing: "-1px",
    fontWeight: "500",
  },
  sales_info_txt: {
    fontSize: "22px",
  },
  sales_info_won: {
    fontSize: "15px",
  },
  sales_info_won_last: {
    color: theme.palette.primary.blue,
  },
  sales_info_txt_last: {
    color: theme.palette.primary.blue,
  },
}));

function Title(props) {
  const classes = useStyles();

  return (
    <Box className={classes.Dashboard}>
      {/* 매출정보 */}
      <Box className={classes.sales_info_wrap} display="flex">
        <Box className={classes.sales_info_left}>
          <Box
            className={classes.sales_info_box}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <h4 className={classes.sales_info_title}>전 월 매출</h4>
            <span className={classes.sales_info_txt}>
              {props.prev}
              <span className={classes.sales_info_won}>원</span>
            </span>
          </Box>
          <Box
            className={classes.sales_info_box}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <h4 className={classes.sales_info_title}>당 월 예상 매출</h4>
            <span className={classes.sales_info_txt}>
              {props.next}
              <span className={classes.sales_info_won}>원</span>
            </span>
          </Box>
        </Box>
        <Box className={classes.sales_info_right}>
          <Box className={classes.sales_info_box}></Box>
          <Box
            className={classes.sales_info_box}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <h4 className={classes.sales_info_title}>당 월</h4>
            <span
              className={clsx(
                classes.sales_info_txt,
                classes.sales_info_txt_last
              )}
            >
              {props.this}
              <span
                className={clsx(
                  classes.sales_info_won,
                  classes.sales_info_won_last
                )}
              >
                원
              </span>
            </span>
          </Box>
        </Box>
      </Box>
      {/* 매출정보 */}
    </Box>
  );
}

export default Title;
