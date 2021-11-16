import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box } from "@material-ui/core";

import Parser from "html-react-parser";

import { requestBiztApi } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  line: {
    width: "100%",
    padding: "20px 16px",
  },
  txt: {
    color: theme.typography.color,
    width: "100%",
    fontSize: "15px",
    paddingBottom: "5px",
    fontWeight: "600",
  },
  date: {
    color: theme.typography.dark,
    fontSize: "13px",
  },
  wrap: {
    padding: "20px 16px",
    fontSize: "13px",
    lineHeight: "180%",
  },
}));

export default function PostDetail({ category }) {
  const classes = useStyles();
  const history = useHistory();
  const [postDetail, setPostDetail] = useState({});

  let boardId = history.location.pathname.split("/");
  boardId = boardId[boardId.length - 1];

  //테스트용 코드
  boardId = 1;
  //테스트용 코드

  useEffect(() => {
    //https://bizt.guworldwide.com/api/board/notice/9
    requestBiztApi(`/api/board/${category}/${boardId}`, null, (res) => {
      // this is temp code.
      // 진짜 api 완성 시 리스트를 받아오는 것이 아닌 해당 office id에 대응하는 data 만을 가져와야함
      if (res.result === "00") setPostDetail(res.data[0]);
      else console.error(res.message);
    });
  }, []);

  function DateForm(date) {
    if (!date) return null;
    var dateObj = new Date(date);

    return (
      dateObj.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateObj.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateObj.toLocaleDateString("en", { day: "2-digit" })
    );
  }
  return (
    <Box>
      <Box className={classes.line}>
        <div className={classes.txt}>{postDetail.subject}</div>
        <div className={classes.date}>
          {DateForm(postDetail.created_datetime)}
        </div>
      </Box>
      <Divider className={classes.Divider} />
      <Box className={classes.wrap}>
        {postDetail.contents && Parser(postDetail.contents)}
      </Box>
    </Box>
  );
}
