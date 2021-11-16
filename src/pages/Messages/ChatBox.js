import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemAvatar, Avatar, Box } from "@material-ui/core";

import ReservBox from "pages/Messages/ReservBox";

// RCE CSS
import "react-chat-elements/dist/main.css";
import { fileApi } from "utility/connectivity";

const styles = (theme) => ({
  card_wrap: {
    backgroundColor: theme.palette.primary.gray,
    paddingBottom: "10px",
    position: "relative",
  },
  circle_box: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    position: "relative",
    width: "calc(100% - 56px)",
    color: theme.typography.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "15px",
    paddingTop: "10px",
  },
  body: {
    width: "100%",
    paddingTop: "4px",
    fontSize: "13px",
    fontWeight: "normal",
    wordBreak: "break-all",
  },
  date_left: {
    position: "absolute",
    left: "0",
    top: "5px",
    color: theme.typography.dark,
    fontSize: "13px",
    fontWeight: "normal",
  },
  date_right: {
    position: "absolute",
    right: "0",
    top: "5px",
    color: theme.typography.dark,
    fontSize: "13px",
    fontWeight: "normal",
  },
  circle_img: {
    width: "60px",
    height: "60px",
  },
});

class ChatBox extends React.PureComponent {
  render() {
    const {
      classes,
      account,
      member_idx,
      opponent_name,
      opponent_image,
      contents,
      reserv_idx,
      created_datetime,
    } = this.props;
    const my_idx = account.member_idx;
    const my_name = account.member_name;
    const my_image = account.profile_image;

    const isSelf = my_idx === member_idx;
    const chatBody = (
      <Box
        className={classes.title}
        style={{ textAlign: isSelf ? "right" : "left" }}
        px={2}
      >
        <div className={classes.id}>{isSelf ? my_name : opponent_name}</div>
        <div className={classes.body}>{contents}</div>
        <span className={isSelf ? classes.date_left : classes.date_right}>
          {created_datetime}
        </span>
      </Box>
    );
    const chatAvater = (
      <ListItemAvatar className={classes.circle_box}>
        <Avatar
          alt="Remy Sharp"
          src={fileApi + (isSelf ? my_image?.[0] : opponent_image?.[0])}
          className={classes.circle_img}
        />
      </ListItemAvatar>
    );

    return (
      <div className={classes.card_wrap}>
        {reserv_idx == null ? (
          <ListItem alignItems={isSelf ? "flex-end" : "flex-start"}>
            {isSelf ? [chatBody, chatAvater] : [chatAvater, chatBody]}
          </ListItem>
        ) : (
          <ListItem>
            <ReservBox reserv_idx={reserv_idx} />
          </ListItem>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ChatBox);
