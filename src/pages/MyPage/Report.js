import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import Dialog from "appComponents/layout/Dialog";
import ReportWrite from "pages/MyPage/ReportWrite";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";

import InfoCard from "appComponents/layout/InfoCard";

const useStyles = makeStyles(() => ({
  wrapper: {
    "& .MuiAccordionSummary-content": {
      margin: "0",
      flexDirection: "column",
    },
    "& .MuiAccordion-root.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordion-root.Mui-expanded:before": {
      opacity: "1",
    },
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .MuiIconButton-edgeEnd": {
      display: "none",
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
  },
  list_left_img: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
  },
}));

export default function Report(props) {
  const classes = useStyles();
  const { path } = useRouteMatch();

  const [reports, setReports] = useState(null);

  useEffect(() => {
    requestBiztApi("/api/report", null, (res) => {
      onResponseSuccess(setReports)(res);
    });
  }, []);

  return (
    <Box className="root">
      <Switch>
        <Route path={`${path}/write`} component={ReportWrite} />
        <Route path={path}>
          <Box className="BoxWrapper body">
            {reports?.map((item, index) => {
              console.log(reports);
              return (
                <Box pb={2} key={index}>
                  <div className={classes.wrapper}>
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Box style={{ marginBottom: "20px" }}>
                          <InfoCard
                            title={"방이동 오피스 101"}
                            details={[
                              { category: "예약번호", content: "H283947L" },
                              {
                                category: "이용호실",
                                content: "개인1호실 / 개인 2호실",
                              },
                              { category: "신고내용", content: "정리미흡" },
                              { category: "진행현황", content: "지급완료" },
                            ]}
                          />
                        </Box>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails style={{ padding: "16px" }}>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <Divider />
                </Box>
              );
            })}
          </Box>
          <Box className="foot">
            <Dialog
              disableScrollLock
              buttonName="+ 신고하기"
              modalTitle="자리 신고하기"
              modalContents={
                <>
                  이용중 불편한 점이 있으신가요? <br />
                  신고하기를 통해 파트너에게 오피스 애로사항을 전달할 수
                  있습니다.
                </>
              }
              cancel="취소하기"
              next="신고하기"
              nextClick={`${path}/write`}
            ></Dialog>
          </Box>
        </Route>
      </Switch>
    </Box>
  );
}
