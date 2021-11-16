import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemAvatar } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";

const OfficeStyles = makeStyles((theme) => ({
  img_box: {
    "& img": {
      width: "52px",
    },
  },
  office_right: {
    padding: "10px 0 0 8px",
  },
  office_title: {
    fontSize: "15px",
    fontWeight: "500",
    paddingBottom: "3px",
  },
  office_info: {
    color: theme.typography.dark,
    fontSize: "13px",
  },
  icon: {
    fontSize: "13px",
    verticalAlign: "-1px",
    marginRight: "3px",
  },
}));
const OfficeCard = (props) => {
  const classes = OfficeStyles();
  const { src, title, subTitle, body } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar className={classes.img_box}>
        <img alt="Remy Sharp" src={src} />
      </ListItemAvatar>
      <div className={classes.office_right}>
        <div className={classes.office_title}>{props.office}</div>
        <div className={classes.office_info}>
          <span>
            <LocationOnIcon className={classes.icon}></LocationOnIcon>
            {props.location}
          </span>
          <span>
            <PersonIcon className={classes.icon}></PersonIcon>
            {props.people}
          </span>
        </div>
      </div>
    </ListItem>
  );
};

export default OfficeCard;
