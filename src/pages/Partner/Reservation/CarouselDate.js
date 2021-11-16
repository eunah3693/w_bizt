import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import clsx from "clsx";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const SlideListUseStyles = makeStyles((theme) => ({
  calendar_wrap: {
    height: "130px",
    padding: "20px 0",
    borderBottom: "3px solid #e7e7e7",
  },
  list_wrap: {
    height: "110px",
  },
  flex_wrp: {
    height: "110px",
    display: "flex",
    "& div": {
      marginRight: "20px",
    },
  },
  list_shadow: {
    width: "80px",
    height: "110px",
  },
  list_box: {
    width: "77px",
    height: "94px",
    border: `2px solid ${theme.palette.primary.lightdark}`,
    padding: "5px 0",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: `rgba(0, 0, 0, 0.1) 5px 5px 5px`,
  },

  list_re: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.gray,
    color: theme.typography.light,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    fontSize: "12px",
    paddingTop: "2px",
  },
  blueBox: {
    border: `2px solid ${theme.palette.primary.sub}`,
  },
  blueCircle: {
    backgroundColor: theme.palette.primary.sub,
  },
  grayBox: {
    border: `2px solid ${theme.palette.primary.lightdark}`,
  },
  grayCircle: {
    backgroundColor: theme.palette.primary.lightdark,
  },
}));
function CalendarBox(props) {
  const classes = SlideListUseStyles();

  const [items, setItems] = useState(true);

  return (
    <div className={classes.list_shadow}>
      <div
        className={clsx(
          classes.list_box,
          items ? classes.blueBox : classes.grayBox
        )}
        onClick={(e) => {
          if (!dragFlag) setItems(!items);
          dragFlag = false;
        }}
      >
        <span style={{ display: "none" }}>{props.month}</span>
        <span className={classes.list_date}>{props.date}</span>
        <span className={classes.list_num}>{props.day}</span>
        <span
          className={clsx(
            classes.list_re,
            items ? classes.blueCircle : classes.grayCircle
          )}
        >
          <span>{props.re}</span>
        </span>
      </div>
    </div>
  );
}

const week = ["일", "월", "화", "수", "목", "금", "토"];
const responsive = { 0: { items: 4.5 } };

// 슬라이더가 드래그될 시 하위 component가 클릭되지 않도록 하는 global flag
let dragFlag = false;

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  // console.log(result)
  return result;
}

export default function SlideCalendar(props) {
  const classes = SlideListUseStyles();
  const [items, setItems] = useState();
  let startDay = props.startDay;
  let duration = props.duration; //startday로 부터 몇일인지
  let fullDate = []; // starday부터 endday까지 array

  for (var i = 0; i <= duration; i++) {
    // console.log(i)
    fullDate.push(addDays(startDay, i));
  }
  // console.log(fullDate)
  let dateObject = () =>
    fullDate.map((val, key) => {
      return {
        month: val.getMonth() + 1,
        day: val.getDate(),
        date: week[val.getDay()],
        number: 1,
      };
    });
  useEffect(() => {
    setItems(dateObject());
  }, [startDay]);

  return (
    <Box className={classes.calendar_wrap}>
      {duration && duration > 4 ? (
        <AliceCarousel
          className={classes.list_wrp}
          mouseTracking
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          onSlideChange={() => {
            dragFlag = true;
          }}
          items={items?.map((data, idx) => {
            return (
              <CalendarBox
                key={idx}
                month={data.month}
                date={data.date}
                day={data.day}
                re={data.number}
              ></CalendarBox>
            );
          })}
        />
      ) : (
        <Box className={classes.flex_wrp}>
          {items?.map((data, idx) => {
            return (
              <CalendarBox
                key={idx}
                month={data.month}
                date={data.date}
                day={data.day}
                re={data.number}
              ></CalendarBox>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
