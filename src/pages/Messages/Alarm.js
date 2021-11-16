import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { requestBiztApi } from "utility/connectivity";
import AlarmCard from "appComponents/interaction/AlarmCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.gray,
  },
}));

export default function Alarm() {
  const classes = useStyles();
  const [notification, notificationlist] = useState(null);
  function DateForm(date) {
    var dateObj = new Date(date);
    return (
      dateObj.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateObj.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateObj.toLocaleDateString("en", { day: "2-digit" })
    );
  }
  useEffect(() => {
    requestBiztApi("/api/notification", null, notificationlist);
    // console.log(notificationlist);
  }, []);
  return (
    <List className={classes.root}>
      {!notification ? (
        <div></div>
      ) : (
        notification.map((notificationData, idx) => (
          <div>
            <AlarmCard
              src={notificationData.image}
              title={notificationData.notificationId}
              body={notificationData.content}
              circle={notificationData.isRead}
              date={DateForm(notificationData.date)}
            />
          </div>
        ))
      )}
    </List>
  );
}
