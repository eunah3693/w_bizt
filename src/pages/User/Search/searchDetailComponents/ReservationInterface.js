import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import RangeCalendar from "appComponents/interaction/RangeCalendar";
import UseTimeSelector from "./UseTimeSelector";
import SeatSelector from "./SeatSelector";
import SwipeButton from "appComponents/interaction/SwipeButton";
import { ScrollToTargetOnMount } from "utility/scrollHandler";
import CarouselSwiper from "appComponents/layout/CarouselSwiper";

const useStyles = makeStyles((theme) => ({
  headTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0 15px 0 ",
  },
  points: {
    textAlign: "end",
    fontWeight: "500",
    fontSize: "15px",
    color: `${theme.palette.primary.sub}`,
  },
  accordion: {
    margin: 0,
    boxShadow: "none",
  },
  accordionDetail: {
    display: "block",
    padding: 0,
  },
}));

function SelectorInfo() {
  return (
    <div className="FlexEnd ">
      <div className="SpaceBetween" style={{ paddingRight: "10px" }}>
        <div className="Seat Selected "></div>
        <p>선택영역</p>
      </div>
      <div className="SpaceBetween" style={{ paddingRight: "10px" }}>
        <div className="Seat Disabled "></div>
        <p>선택불가</p>
      </div>
      <div className="SpaceBetween">
        <div className="Seat WhiteBackground "></div>
        <p>선택가능</p>
      </div>
    </div>
  );
}

export default function ReservationInterface({ room }) {
  const classes = useStyles();
  const history = useHistory();

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [useTime, setUseTime] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  let { room_image, open_time, close_time, seat_count } = room;

  open_time = open_time ? parseInt(open_time) : 0;
  close_time = close_time ? parseInt(close_time) : 0;

  function handleSelectorChange(target) {
    let tempSet;
    let setter;
    if (target === "time") {
      tempSet = new Set(useTime);
      setter = setUseTime;
    } else if (target === "seat") {
      tempSet = new Set(selectedSeats);
      setter = setSelectedSeats;
    } else {
      console.error("invalid target from handleSelectorChange");
      return;
    }

    return (value, action) => {
      if (action === "add") {
        tempSet.add(value);
      } else if (action === "remove") {
        tempSet.delete(value);
      }
      setter(Array.from(tempSet));
    };
  }

  return (
    <Fragment>
      <Box className="Padding10px">
        <CarouselSwiper images={room_image} />
      </Box>
      <Box className="Padding10px">
        <p className="SubtitleCenter" style={{ marginBottom: 0 }}>
          예약기간
        </p>
        <RangeCalendar
          ranges={[dateRange]}
          onChange={({ selection }) => {
            setDateRange(selection);
          }}
        />
      </Box>
      <Divider />
      <Box>
        <Accordion
          className={classes.accordion}
          expanded={
            dateRange.startDate.toString() === dateRange.endDate.toString()
          }
        >
          <AccordionSummary style={{ display: "none" }} />
          <AccordionDetails className={classes.accordionDetail}>
            <Box>
              <Box className="Padding20px">
                <p className="SubtitleCenter">이용시간</p>
                <UseTimeSelector
                  open_time={open_time}
                  close_time={close_time}
                  selection={useTime}
                  onChange={handleSelectorChange("time")}
                  disabled={[]}
                />
              </Box>
              <Box pr={3} pb={3}>
                <SelectorInfo />
              </Box>
              <Divider />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className="Padding20px">
        <p className="SubtitleCenter">좌석선택</p>
        <SeatSelector
          seat_count={seat_count}
          selection={selectedSeats}
          onChange={handleSelectorChange("seat")}
          disabled={[]}
        />
      </Box>
      <Box pr={3} pb={3}>
        <SelectorInfo />
      </Box>
      <Divider></Divider>
      <Box style={{ padding: "40px 20px 20px" }}>
        <div>
          <p className={classes.points}>현재 보유포인트: 23500 P</p>
        </div>
        <div>
          <p className={classes.points}>총 결제 예정 포인트: 5000 P </p>
        </div>
      </Box>

      <Box margin="20px">
        <SwipeButton
          text="밀어서 예약하기"
          text_unlocked="결제중..."
          onSuccess={() => {
            // 여기서 예약하기 api 호출
            history.push({
              pathname: "/favorite/myreservation/1",
            });
          }}
        />
      </Box>
      <ScrollToTargetOnMount
        targetId="room-selector"
        option={{ behavior: "smooth" }}
      />
    </Fragment>
  );
}
