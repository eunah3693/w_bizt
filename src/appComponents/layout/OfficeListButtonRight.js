import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card_left: {
    flex: "0 0 28%",
    padding:"20px 0px 20px 16px"
  },
  img: {
    width: "100px",
    height: "100px",
  },
  card_right: {
    flex: "1 0 72%",
    color: theme.typography.main,
    paddingLeft: "16px",
    position: "relative",
  },
  head: {
    width: "100%",
    position: "relative",
  },
  title: {
    fontSize: "15px",
    fontWeight: "500",
    paddingBottom: "15px",
    letterSpacing: "-1px",
  },
  status: {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontWeight: "bold",
    display: "flex",
    "& div": {
      marginLeft: "5px",
    },
  },
  interaction: {
    padding: "0 10px",
    backgroundColor: theme.palette.primary.sub,
    fontSize: "12px",
    color: theme.typography.light,
    borderRadius: "10px",
    lineHeight: "155%",
    fontWeight: "normal",
  },
  outline_btn: {
    padding: "0 10px",
    border: `1px solid ${theme.palette.primary.sub}`,
    fontSize: "12px",
    color: theme.typography.main,
    borderRadius: "10px",
    lineHeight: "150%",
    fontWeight: "normal",
  },
  detail_category: {
    width: "75px",
    textAlign: "left",
    color: theme.typography.dark,
    fontSize: "13px",
    paddingBottom: "4px",
  },
  detail_content: {
    color: theme.typography.main,
    fontSize: "13px",
    fontWeight: "500",
  },
  report_txt: {
    fontSize: "13px",
    paddingLeft: "16px",
    fontWeight: "500",
  },

}));

export default function OfficeListButtonRight(props) {
  const classes = useStyles();

  const { status, interaction } = props;

  return (
    <Box>
      <Box className={classes.root}>
        {props.list_img && (
          <Box  className={classes.card_left}>
            <img alt="office" src={props.list_img} className={classes.img} />
          </Box>
        )}
        <Box p={2} className={classes.card_right}>
          <Box className={classes.head} display="flex">
            {props.list_title && (
              <span className={classes.title}>{props.list_title}</span>
            )}
            <Box className={classes.status}>
              {status && <div className={classes.outline_btn}>{status}</div>}
              {interaction && (
                <div
                  className={classes.interaction}
                  onClick={interaction.onClick}
                >
                  {interaction.text}
                </div>
              )}
            </Box>
          </Box>

          <Box>
            {props.details?.map((item, idx) => (
              <Box display="flex" key={idx}>
                <div className={classes.detail_category}>{item.category}</div>
                <div className={classes.detail_content}>{item.content}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={classes.report_txt}>{props.report_txt}</Box>
       
    </Box>
  );
}
