import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";

////////////////////////////////////
//라이브러리: https://material-ui.com/components/rating/
const StyledRating = withStyles((theme) => ({
  root: {
    fontSize: "1.4rem",
  },
  iconFilled: {
    color: theme.palette.primary.sub,
  },
  iconHover: {
    color: theme.palette.primary.sub,
  },
}))(Rating);
const ReplyRating = withStyles((theme) => ({
  root: {
    fontSize: "1.1rem",
  },
  iconFilled: {
    color: theme.palette.primary.sub,
  },
  iconHover: {
    color: theme.palette.primary.sub,
  },
}))(Rating);

const ListExampleStyle = makeStyles((theme) => ({
  list_wrap: {
    width: "100%",
  },
  list_box: {
    width: "100%",
    display: "flex",
  },
  list_left: {
    width: "25%",
    padding: "10px 0 0 7px",
  },
  list_left_img: {
    width: "100px",
    height: "100px",
  },
  list_right: {
    width: "75%",
    paddingLeft: "20px",
    position: "relative",
    paddingRight: 0,
  },
  list_top: {
    width: "100%",
  },
  list_rate_wrap: {
    paddingBottom: "10px",
  },
  list_date: {
    fontSize: "14px",
    color: theme.typography.sub,
    textAlign: "right",
    fontWeight: "normal",
    position: "absolute",
    top: "7px",
    right: 0,
  },
  list_room: {
    fontSize: "14px",
  },
  list_txt: {
    fontSize: "14px",
    letterSpacing: "-1px",
    paddingLeft: "4px",
    wordBreak: "break-all",
  },
  list_id: {
    fontSize: "13px",
    color: theme.typography.sub,
    paddingLeft: "5px",
    fontWeight: "normal",
  },
  replyBox: {
    padding: "0 3px 0px 7px",
  },
  list_reply: {
    border: `1px solid ${theme.palette.primary.lightdark}`,
    borderRadius: "5px",
    fontSize: "13px",
    wordWrap: "break-word",
    wordBreak: "keep-all",
  },
  list_rate_txt: {
    paddingLeft: "3px",
  },
}));
// RatingReview
export default function RatingReview(props) {
  const classes = ListExampleStyle();
  const { reply } = props;

  return (
    <Box className={classes.list_wrap}>
      <div className={classes.list_box}>
        <Box className={classes.list_left}>
          <img alt="image1" src={props.img} className={classes.list_left_img} />
        </Box>
        <Box p={1} className={classes.list_right}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" className={classes.list_rate_wrap}>
              <StyledRating
                className={classes.list_rate}
                name="size-medium"
                value={props.value}
                readOnly={props.readOnly}
              />
              <span className={classes.list_id}>{props.id}</span>
            </Box>
            <Typography className={classes.list_date}>{props.date}</Typography>
          </Box>
          <Box>
            <Typography className={classes.list_txt}>
              {props.list_txt}
            </Typography>
          </Box>
        </Box>
      </div>
      {reply && (
        <Box className={classes.replyBox}>
          <Box p={1} className={classes.list_reply}>
            <Box display="flex" className={classes.list_rate_wrap}>
              <ReplyRating
                className={classes.list_rate}
                name="size-small"
                value={props.replyValue}
                readOnly={props.readOnly}
              />
            </Box>
            <span className={classes.list_rate_txt}>{props.list_reply}</span>
          </Box>
        </Box>
      )}
    </Box>
  );
}
