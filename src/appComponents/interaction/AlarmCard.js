import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.gray,
  },
  inline: {
    display: "inline",
  },
  circle_box: {
    position: "relative",
    width: "65px",
  },
  circle: {
    position: "absolute",
    right: "9px",
    top: "1px",
    width: "6px",
    height: "6px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
  },
  circle_img: {
    width: "50px",
    height: "50px",
  },
  title_box: {
    display: "flex",
    paddingTop: "8px",
  },

  title: {
    position: "relative",
    width: "calc(100% - 56px)",
    color: theme.typography.main,
    fontWeight: "500",
    fontSize: "15px",
    paddingLeft: "10px",
  },
  body: {
    paddingTop: "5px",
    fontSize: "13px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  date: {
    position: "absolute",
    right: "0",
    top: "8px",
    color: theme.typography.dark,
    fontSize: "13px",
    fontWeight: "normal",
  },
}));

const AlarmCard = (props) => {
  const classes = useStyles();
  var OnOff = props.circle;
  const { src } = props;

  return (
    <List style={{ padding: "5px 23px 5px 20px" }}>
      <ListItem alignItems="flex-start" component={Link} to={props.link}>
        <ListItemAvatar className={classes.circle_box}>
          <Avatar alt="Remy Sharp" src={src} className={classes.circle_img} />
          {OnOff && <span className={classes.circle}></span>}
        </ListItemAvatar>
        <div className={classes.title}>
          <div className={classes.title_box}>
            <div>{props.title}</div>
          </div>
          <div className={classes.body}>{props.body}</div>
          <span className={classes.date}>{props.date}</span>
        </div>
      </ListItem>
    </List>
  );
};

export default AlarmCard;
