import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box } from "@material-ui/core";

import { constructUrl, requestBiztApi } from "utility/connectivity";
import PostDetail from "./PostDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  link: {
    display: "flex",
    textDecoration: "none",
    color: theme.typography.color,
    height: "65px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
  },
  txt: {
    color: theme.typography.color,
    width: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  date: {
    color: theme.typography.dark,
  },
}));

/**
 * 내용물이 API 호출을 통해 이루어질 수 있도록 변경 필요
 * @returns
 */
export default function Post() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const [postList, setPostList] = useState([]);

  let category = path.split("/");
  category = category[category.length - 1];
  useEffect(() => {
    //https://bizt.guworldwide.com/api/board/notice?before=18&order=board_idx desc&limit=10
    // category = announce || event || faq 를 query param으로 활용하여 api 요청을 하여야 함.
    let url = constructUrl("/api/board/" + category, {
      order: "board_idx desc",
      limit: 10,
    });
    requestBiztApi(url, null, (res) => setPostList(res.data));
  }, []);

  return (
    <Switch>
      <Route path={`${path}/([0-9]+)`}>
        <PostDetail category={category} />
      </Route>
      <Route path="/">
        <Box>
          {postList?.map((post, idx) => {
            const { board_idx, subject, created_datetime } = post;

            var dateObj = new Date(created_datetime);
            let date =
              dateObj.toLocaleDateString("en", { year: "numeric" }) +
              "-" +
              dateObj.toLocaleDateString("en", { month: "2-digit" }) +
              "-" +
              dateObj.toLocaleDateString("en", { day: "2-digit" });
            return (
              <Box key={idx}>
                <Box
                  component={Link}
                  to={`${path}/${board_idx}`}
                  className={classes.link}
                >
                  <span className={classes.txt}>{subject}</span>
                  <span className={classes.date}>{date}</span>
                </Box>
                <Divider className={classes.Divider} />
              </Box>
            );
          })}
        </Box>
      </Route>
    </Switch>
  );
}
