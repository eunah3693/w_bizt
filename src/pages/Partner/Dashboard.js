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
  // 이용빈도 랜덤수 지정
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

  // 호실별 이용현황 데이터
  // 호실데이터
  const [roomData, setRoomData] = useState(getRandomRoomData());
  function getRandomRoomData() {
    let data = [];
    for (let i = 1; i < 3; i++) {
      data.push({
        name: "개인" + i + "호실",
        num: Math.floor(Math.random() * 100) + 1,
        total: 100,
      });
    }
    return data;
  }
  // 오피스데이터
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
  // 이용및 예약현황 캘린더 랜덤수지정
  const [calDates, setCalDates] = useState(getRandomCalendarData());

  // 이용및 예약현황 캘린더 셀렉트박스 클릭시
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
  // 그래프 랜덤데이터
  const [graphData, setGraphData] = useState(getRandomGraphData());
  // 그래프 셀렉트박스 클릭시
  function getRandomGraphData() {
    let data = [];

    for (let i = 0; i < 24; i++) {
      data.push({ time: i + ":00", user: Math.random() * 10 });
    }

    return data;
  }

  // 이용빈도 셀렉트박스 클릭시
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
            <h2 className={classes.fre_title}>오피스별 현황</h2>
            <Box className={classes.fre_select}>
              <Select100
                options={[
                  { label: "전체", value: -1 },
                  ...office.map((officeData) => ({
                    label: officeData.office_name,
                    value: officeData.office_idx,
                  })),
                ]}
                onChange={fre_handleChange}
                placeholder="등록 오피스 선택"
              />
            </Box>
          </Box>
          {/* 매출정보 */}
          <Title prev="3,000" next="3,000" this="3,000" />
          {/* 오피스 이용 빈도 */}
          <Frequency roomData={roomData} roomTotalData={roomTotalData} />
          {/* 이용 및 예약 현황*/}
          <DashboardCalendar data={calDates} />
          {/*  시간별 예약빈도 */}
          <Box className={classes.time_fre_wrap}>
            <h2 className={classes.title}>시간별 예약빈도</h2>
            <Box className={classes.chart_title_wrap}>
              <div className={classes.chart_title_select}>
                <SimpleSelect
                  options={[
                    { value: "30", label: "최근30일" },
                    { value: "7", label: "최근7일" },
                  ]}
                  autoFocus={false}
                  input={false}
                  placeholder="최근30일"
                  handleChange={() => {
                    setGraphData(getRandomGraphData());
                  }}
                />
              </div>
            </Box>
            <Graph chartData={graphData} />
          </Box>
          {/* 최근 이용리뷰  -  빼는거 고려 */}
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
