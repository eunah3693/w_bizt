import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { onResponseSuccess, requestBiztApi } from "utility/connectivity";

import Graph from "appComponents/graph/Graph";
import InfoFooter from "appComponents/InfoFooter";
import Title from "pages/Partner/Dashboard/Title";
import Frequency from "pages/Partner/Dashboard/Frequency";
import DashboardCalendar from "pages/Partner/Dashboard/Calendar";
import DashboardReview from "pages/Partner/Dashboard/Review";
import Select100 from "appComponents/interaction/Select100";
import SimpleSelect from "appComponents/interaction/SimpleSelect";

const useStyles = makeStyles((theme) => ({
  Dashboard: {
    position: "relative",
    paddingTop: "120px",
  },
  fre_wrap: {
    width: "450px",
    height: "130px",
    backgroundColor: theme.palette.primary.gray,
    paddingTop: "30px",
    display: "block",
    textDecoration: "none",
    color: theme.typography.color,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
    position: "fixed",
    top: "40px",
    zIndex: "11",
  },
  fre_title: {
    fontSize: "18px",
    paddingLeft: "26px",
    paddingBottom: "20px",
    fontWeight: "500",
    letterSpacing: "-1px",
  },
  fre_select: {
    width: "90%",
    margin: "0 auto",
  },
  title: {
    fontSize: "18px",
    letterSpacing: "-1px",
    paddingLeft: "6px",
  },
  time_fre_wrap: {
    padding: "40px 20px 20px 20px",
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
    borderTop: `3px solid ${theme.palette.primary.lightdark}`,
  },
  footer: {
    marginTop: "10px",
    backgroundColor: theme.palette.primary.gray,
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "26px",
    color: theme.typography.color,
    position: "relative",
    "& h2": {
      paddingBottom: "10px",
      fontSize: "15px",
    },
    "& p": {
      lineHeight: "180%",
      fontSize: "13px",
    },
  },
  footer_btn: {
    margin: "10px 5px 10px 0",
  },
  sns: {
    position: "absolute",
    right: "30px",
    top: "25px",
    display: "flex",
  },
  circle: {
    border: `1px solid ${theme.typography.main}`,
    borderRadius: "50%",
    padding: "3px 4px 0px 5px",
    marginLeft: "5px",
    cursor: "pointer",
  },
  chart_title_wrap: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "20px",
  },
  chart_title_select: {
    width: "130px",
    position: "relative",
    zIndex: "10",
    "& .css-1uccc91-singleValue": {
      fontSize: "13px",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  // ???????????? ????????? ??????
  const [ro1_random, setro1_random] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [ro2_random, setro2_random] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const [office, officelist] = useState(null);
  const [review, reviewlist] = useState(null);

  useEffect(() => {
    requestBiztApi("/api/office", null, onResponseSuccess(officelist));
    requestBiztApi("/api/reviews", null, reviewlist);
  }, []);

  // ????????? ???????????? ?????????
  // ???????????????
  const [roomData, setRoomData] = useState(getRandomRoomData());
  function getRandomRoomData() {
    let data = [];
    for (let i = 1; i < 3; i++) {
      data.push({
        name: "??????" + i + "??????",
        num: Math.floor(Math.random() * 100) + 1,
        total: 100,
      });
    }
    return data;
  }
  // ??????????????????
  const [roomTotalData, setRoomTotalData] = useState(getRandomRoomTotalData());
  function getRandomRoomTotalData() {
    let officeNum = 0;
    let officeTotal = 0;
    roomData.forEach((element) => {
      officeNum += element.num;
      officeTotal += element.total;
    });

    let officeData = {
      name: "KBS860106",
      num: officeNum,
      total: officeTotal,
    };
    return officeData;
  }
  // ????????? ???????????? ????????? ???????????????
  const [calDates, setCalDates] = useState(getRandomCalendarData());

  // ????????? ???????????? ????????? ??????????????? ?????????
  function getRandomCalendarData() {
    let data = [];

    for (let i = 1; i < 31; i++) {
      data.push({
        cal: new Date(2021, 8, i),
        percent: Math.floor(Math.random() * 100) + 1,
      });
    }

    return data;
  }
  // ????????? ???????????????
  const [graphData, setGraphData] = useState(getRandomGraphData());
  // ????????? ??????????????? ?????????
  function getRandomGraphData() {
    let data = [];

    for (let i = 0; i < 24; i++) {
      data.push({ time: i + ":00", user: Math.random() * 10 });
    }

    return data;
  }

  // ???????????? ??????????????? ?????????
  function fre_handleChange(selectedOption) {
    // console.log(selectedOption.value)
    setRoomData(getRandomRoomData());
    setRoomTotalData(getRandomRoomTotalData());
    setCalDates(getRandomCalendarData());
    setGraphData(getRandomGraphData());
  }
  return (
    <Box className={classes.Dashboard}>
      {office && (
        <Box>
          <Box className={classes.fre_wrap}>
            <h2 className={classes.fre_title}>???????????? ??????</h2>
            <Box className={classes.fre_select}>
              <Select100
                options={[
                  { label: "??????", value: -1 },
                  ...office.map((officeData) => ({
                    label: officeData.office_name,
                    value: officeData.office_idx,
                  })),
                ]}
                onChange={fre_handleChange}
                placeholder="?????? ????????? ??????"
              />
            </Box>
          </Box>
          {/* ???????????? */}
          <Title prev="3,000" next="3,000" this="3,000" />
          {/* ????????? ?????? ?????? */}
          <Frequency roomData={roomData} roomTotalData={roomTotalData} />
          {/* ?????? ??? ?????? ??????*/}
          <DashboardCalendar data={calDates} />
          {/*  ????????? ???????????? */}
          <Box className={classes.time_fre_wrap}>
            <h2 className={classes.title}>????????? ????????????</h2>
            <Box className={classes.chart_title_wrap}>
              <div className={classes.chart_title_select}>
                <SimpleSelect
                  options={[
                    { value: "30", label: "??????30???" },
                    { value: "7", label: "??????7???" },
                  ]}
                  autoFocus={false}
                  input={false}
                  placeholder="??????30???"
                  handleChange={() => {
                    setGraphData(getRandomGraphData());
                  }}
                />
              </div>
            </Box>
            <Graph chartData={graphData} />
          </Box>
          {/* ?????? ????????????  -  ????????? ?????? */}
          <DashboardReview value={review} />
        </Box>
      )}
      <InfoFooter />
    </Box>
  );
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Dashboard;
