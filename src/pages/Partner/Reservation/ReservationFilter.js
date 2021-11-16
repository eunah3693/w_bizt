import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { BottomSheet } from "react-spring-bottom-sheet";
import RangeCalendar from "appComponents/interaction/RangeCalendar";
import Select100 from "appComponents/interaction/Select100";

const useStyles = makeStyles((theme) => ({
  bottomSheet: {
    "& [data-rsbs-overlay], [data-rsbs-backdrop], [data-rsbs-root]:after": {
      zIndex: 101,
      bottom: "56px",
    },
    "&:after": {
      zIndex: 101,
      bottom: "56px",
    },
    "& [data-rsbs-header]": {
      height: "75px",
    },
    "& [data-rsbs-content]": {
      overflow: "unset",
    },
  },
  popup: {
    width: "100%",
    "& .MuiDialog-container": {
      width: "100%",
    },
    "& .MuiDialog-paper": {
      margin: "0",
    },
  },
  calendar_title: {
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.typography.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "15px",
  },
  calendar_wrap: {
    width: "100%",
  },
  title: {
    paddingRight: "10px",
  },
  reset: {
    color: theme.typography.sub,
    fontSize: "13px",
    paddingLeft: "10px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  close: {
    color: theme.palette.primary.sub,
    fontSize: "13px",
    paddingRight: "10px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  fre_wrap: {
    padding: "30px 0 0 0",
    display: "block",
    textDecoration: "none",
    color: theme.typography.color,
  },
  fre_title: {
    paddingLeft: "26px",
    paddingBottom: "30px",
    fontWeight: "600",
    letterSpacing: "-1px",
    fontSize: "15px",
  },
  se_title: {
    paddingLeft: "26px",
    fontWeight: "600",
    letterSpacing: "-1px",
    fontSize: "15px",
  },
  fre_select: {
    width: "90%",
    margin: "0 auto",
  },
}));

const nowDay = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export default function ReservationFilter(props) {
  const { open, onDismiss, setFilter } = props;

  const classes = useStyles();
  const sheetRef = useRef();

  //select office, room 선택값
  const [office, setOffice] = useState({
    value: "전체 오피스",
    label: "전체 오피스",
  });
  const [room, setRoom] = useState({ value: "전체 호실", label: "전체 호실" });

  // 기간설정 rangecalendar
  const [selection, setSelection] = useState(nowDay);

  // 필터 확정
  function confirmFilter() {
    var startDate = selection.startDate;
    var endDate = selection.endDate;

    setFilter({
      startDate,
      endDate,
      office,
      room,
    });
    onDismiss();
  }

  function reset() {
    setSelection(nowDay);
    setOffice({ value: "전체 오피스", label: "전체 오피스" });
    setRoom({ value: "전체 호실", label: "전체 호실" });
  }

  return (
    <BottomSheet
      open={open}
      skipInitialTransition
      blocking={false}
      ref={sheetRef}
      onDismiss={onDismiss}
      className={classes.bottomSheet}
      header={
        <div className={classes.calendar_title}>
          <span className={classes.reset} onClick={reset}>
            초기화
          </span>
          <span className={classes.title}>예약찾기</span>
          <span className={classes.close} onClick={confirmFilter}>
            검색
          </span>
        </div>
      }
      snapPoints={({ maxHeight }) => maxHeight - 56}
    >
      <Box className={classes.fre_wrap}>
        <h2 className={classes.se_title}>기간 설정</h2>
        <RangeCalendar
          onChange={(ranges) => {
            setSelection(ranges["selection"]);
          }}
          ranges={[selection]}
        ></RangeCalendar>
      </Box>

      <Box className={classes.fre_wrap}>
        <h2 className={classes.fre_title}>오피스 설정</h2>
        <Box className={classes.fre_select}>
          <Select100
            options={[
              { value: "전체 오피스", label: "전체 오피스" },
              { value: "오피스1", label: "오피스1" },
              { value: "오피스2", label: "오피스2" },
              { value: "오피스3", label: "오피스3" },
            ]}
            value={office}
            onChange={setOffice}
          />
        </Box>
      </Box>
      {office.value !== "전체 오피스" && (
        <Box className={classes.fre_wrap}>
          <h2 className={classes.fre_title}>호실 설정</h2>
          <Box className={classes.fre_select}>
            <Select100
              options={[
                { value: "전체 호실", label: "전체 호실" },
                { value: "호실1", label: "호실1" },
                { value: "호실2", label: "호실2" },
                { value: "호실3", label: "호실3" },
              ]}
              value={room}
              onChange={setRoom}
            />
          </Box>
        </Box>
      )}
    </BottomSheet>
  );
}
