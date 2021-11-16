import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// MessageBox component
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import OfficeCard from "appComponents/interaction/MessOfficeCard";
import ChatBox from "pages/Messages/ChatBox";

import {
  constructUrl,
  onResponseSuccess,
  requestBiztApi,
} from "utility/connectivity";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// 파트너 이미지
import office from "Img/office.png";

// RCE CSS
import "react-chat-elements/dist/main.css";
import { AccountContext } from "utility/contexts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0",
    position: "relative",
  },
  chat: {
    width: "100%",
    maxWidth: "450px",
    height: "65px",
    position: "fixed",
    bottom: "56px",
    backgroundColor: theme.palette.primary.gray,
    "& form": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      paddingTop: "15px",
    },
  },
  input_wrap: {
    width: "400px",
    position: "relative",
  },
  input: {
    width: "400px",
    height: "35px",
    borderRadius: "18px",
    paddingLeft: "20px",
    border: `1px solid ${theme.palette.primary.lightdark}`,
    paddingRight: "35px",
  },
  input_btn: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    position: "absolute",
    right: "8px",
    top: "5px",
    backgroundColor: theme.palette.primary.main,
    color: theme.typography.light,
    border: "none",
  },
}));

var scrollDownFlag = true;

export default function ChatDetail(props) {
  const { scrollRef, chatRoomInfo } = props;
  const chatroom_idx = chatRoomInfo?.chatroom_idx;
  const profile_image = chatRoomInfo?.profile_image;
  const member_name = chatRoomInfo?.member_name;

  const [account] = useContext(AccountContext);
  const classes = useStyles();
  const inputRef = useRef();

  const [newChat, setNewChat] = useState();
  const [chatLog, setChatLog] = useState([]);

  function Message(e) {
    e.preventDefault();
    if (!newChat) return;

    var newChatBox = { member_idx: account.member_idx, contents: newChat };
    setChatLog([...chatLog, newChatBox]);

    let body = new FormData();
    body.append("chatroom_idx", chatroom_idx);
    body.append("contents", newChat);
    requestBiztApi(
      "/api/message/chats",
      {
        method: "POST",
        body: body,
      },
      (res) => {
        if (res.result !== "00") {
          alert(`메시지 전송에 실패하였습니다: ${res.message}`);
        }
        let url = constructUrl("/api/message/chats", { chatroom_idx });
        requestBiztApi(url, null, onResponseSuccess(setChatLog));
      }
    );
    setNewChat("");
    scrollDownFlag = true;
  }

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
    if (scrollDownFlag) scrollDownFlag = false;
  }, [chatLog, scrollRef]);

  useEffect(() => {
    let url = constructUrl("/api/message/chats", { chatroom_idx });
    requestBiztApi(url, null, onResponseSuccess(setChatLog));
  }, [chatroom_idx]);

  return (
    <div className={classes.root} style={{ marginBottom: "50px" }}>
      {/* <OfficeCard
        src={office}
        office="방이동 오피스101"
        location="방이동"
        people="최대15인"
      /> */}

      {chatLog?.map((item) => (
        <ChatBox
          key={item.chat_idx}
          {...item}
          account={account}
          opponent_image={profile_image}
          opponent_name={member_name}
        />
      ))}

      <div className={classes.chat}>
        <form
          className={classes.cat_box}
          noValidate
          autoComplete="off"
          ref={inputRef}
        >
          <div className={classes.input_wrap}>
            <input
              type="text"
              className={classes.input}
              name="chat"
              value={newChat || ""}
              onChange={(e) => {
                setNewChat(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") Message(e);
              }}
              placeholder="메세지 입력하기"
            ></input>
            <div className={classes.input_btn} onClick={Message}>
              <KeyboardArrowUpIcon />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
