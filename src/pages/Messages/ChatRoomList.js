import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  useTheme,
} from "@material-ui/core";
import { fileApi } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  circleBox: {
    width: "65px",
  },
  circleImg: {
    width: "50px",
    height: "50px",
  },
  circle: {
    position: "absolute",
    width: "6px",
    height: "6px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
  },
  cardBody: {
    position: "relative",
    width: "calc(100% - 65px)",
    fontWeight: "500",
    fontSize: "15px",
  },
  listHead: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  date: {
    color: theme.typography.dark,
    flexShrink: "0",
    fontSize: "13px",
  },
  bgBtn: {
    backgroundColor: theme.palette.primary.sub,
    fontSize: "12px",
    color: theme.typography.light,
    borderRadius: "10px",
    lineHeight: "160%",
    fontWeight: "normal",
  },
  content: {
    paddingTop: "5px",
    fontSize: "13px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: "normal",
  },
}));

function decorateDateTime(dateTime) {
  if (!dateTime) return "";
  let dt = new Date(dateTime);
  return dt.toLocaleDateString();
}

export default function ChatRoomList(props) {
  const classes = useStyles();
  const theme = useTheme();
  let { path } = useRouteMatch();

  const { chatRooms, scrollRef } = props;

  useEffect(() => {
    let ref = scrollRef.current;
    ref?.scrollTo(0, ref.offsetHeight - ref?.scrollHeight);
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: theme.palette.primary.gray,
      }}
    >
      {chatRooms?.length ? (
        chatRooms.map((chatData, idx) => {
          const {
            chatroom_idx,
            member_name,
            profile_image,
            last_visited,
            latest_chat_idx,
            latest_chat_datetime,
            reserv_idx,
            contents,
          } = chatData;
          return (
            <Link key={idx} to={`${path}/${chatroom_idx}`}>
              <List style={{ padding: "4px 12px" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar style={{ width: "65px" }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={fileApi + profile_image?.[0]}
                      className={classes.circleImg}
                    />
                  </ListItemAvatar>
                  <div className={classes.cardBody}>
                    <Box className={classes.listHead}>
                      <Box display="flex">
                        {member_name}
                        {/* <Box className={classes.bgBtn} px={1} ml={1}>
                          {stateCircle ? "승인요청중" : "승인 완료"}
                        </Box> */}
                      </Box>
                      <span className={classes.date}>
                        {decorateDateTime(latest_chat_datetime)}
                        {latest_chat_idx > last_visited && (
                          <span className={classes.circle} />
                        )}
                      </span>
                    </Box>
                    <div className={classes.content}>
                      {reserv_idx ? (
                        <span style={{ color: theme.typography.dark }}>
                          오피스 예약이 요청되었습니다
                        </span>
                      ) : (
                        contents || (
                          <span style={{ color: theme.typography.dark }}>
                            대화 내역이 없습니다.
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </ListItem>
              </List>
            </Link>
          );
        })
      ) : (
        <Box width="100%" textAlign="center" my={30}>
          검색 결과가 없습니다 :(
        </Box>
      )}
    </Box>
  );
}
