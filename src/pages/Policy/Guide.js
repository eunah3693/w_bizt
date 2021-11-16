import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

import Parser from "html-react-parser";

import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";

import { requestBiztApi } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0px 16px 20px 16px",
  },
  title: {
    fontSize: "15px",
    padding: "20px 0",
  },

  wrap: {
    fontSize: "13px",
    lineHeight: "180%",
    padding: "20px 0",
  },
}));

export default function Guide() {
  const [termsDetail, setTermsDetail] = useState({});
  const [txt, setTxt] = useState();
  let { path } = useRouteMatch();
  const history = useHistory();
  let historyPath = history.location.pathname;
  let user = historyPath.split("/")[1]; //partner인지 아닌지
  useEffect(() => {
    if (user === "partner") {
      requestBiztApi("/api/posting", null, (data) => {
        // this is temp code.
        // 진짜 api 완성 시 리스트를 받아오는 것이 아닌 해당 office id에 대응하는 data 만을 가져와야함
        setTermsDetail(data[0]);
        setTxt("partner");
      });
    } else {
      requestBiztApi("/api/posting", null, (data) => {
        // this is temp code.
        // 진짜 api 완성 시 리스트를 받아오는 것이 아닌 해당 office id에 대응하는 data 만을 가져와야함
        setTermsDetail(data[0]);
        setTxt("user");
      });
    }
  }, [historyPath, path]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Divider />
      <Box className={classes.title}>이용안내</Box>
      <Divider />
      <Box className={classes.wrap}>
        {txt}
        {termsDetail.content && Parser(termsDetail.content)}
      </Box>
    </Box>
  );
}
