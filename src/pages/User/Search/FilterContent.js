import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RangeCalendar from "appComponents/interaction/RangeCalendar";
import CustomizedCheckbox from "appComponents/interaction/CircleCheckbox";
import Slider from "@material-ui/core/Slider";

import { FILTER, optionLists } from "string/officeConstants";
import { CheckInMark, PriceMark, DistanceMark } from "./filterLabels";
import { ButtonColor } from "./filterComponents";

const useStyles = makeStyles((theme) => ({
  filterWrapper: {
    padding: "0px 24px",
    "& > p": {
      fontWeight: " bold",
    },
    "& .MuiCheckbox-root": {
      padding: "0 10px 0 0 ",
    },
  },
  plusMinusWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      width: "30%",
    },
    "& button": {
      // margin: "0 5px",
      boxShadow: "none",
      borderRadius: "0",
    },
  },
  PlusMinusButton: {
    minWidth: " 40px",
    color: "white",
    fontWeight: "bold",
    backgroundColor: `${theme.palette.primary.sub}`,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& .MuiGrid-container": {
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },

  root: {
    "& .MuiGrid-container": {
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  optionBtn: {
    backgroundColor: "white",
    borderRadius: "100px",
    margin: "5px",
  },
  result: {
    backgroundColor: "white",
    boxSizing: "border-box",
  },
  checkIn: {
    "& .MuiSlider-rail": {
      opacity: "1",
    },
  },
  thickLine: {
    marginTop: "30px",
    height: "5px",
    backgroundColor: `${theme.palette.primary.lightdark}`,
  },
}));

export default function FilterContent({ filter, setFilter }) {
  const classes = useStyles();

  const {
    count,
    auto_accept,
    start_price,
    end_price,
    start_distance,
    end_distance,
    start_date,
    end_date,
    checkin,
    options,
    resetter,
  } = filter;

  const [priceSlider, setPriceSlider] = useState([start_price, end_price]);
  const [distanceSlider, setDistanceSlider] = useState([
    start_distance,
    end_distance,
  ]);
  const [checkinSlider, setCheckinSlider] = useState(checkin);

  useEffect(() => {
    setPriceSlider([start_price, end_price]);
  }, [start_price, end_price]);
  useEffect(() => {
    setDistanceSlider([start_distance, end_distance]);
  }, [start_distance, end_distance]);
  useEffect(() => {
    setCheckinSlider(checkin);
  }, [checkin]);

  const incrementCount = (value) => {
    let newCount = count + value;
    if (!(newCount < 0 || newCount > 10)) {
      setFilter({ [FILTER.count]: newCount });
    }
  };

  let selectedOptionArr = options?.split(",");
  if (!selectedOptionArr) selectedOptionArr = [];

  return (
    <Box className={classes.filterWrapper}>
      <Box className={classes.plusMinusWrapper}>
        <p className="SubtitleLeft">사용인원</p>
        <Box style={{ border: " 1px solid gainsboro" }}>
          <Button
            className={classes.PlusMinusButton}
            variant="contained"
            onClick={() => incrementCount(-1)}
          >
            -
          </Button>

          <Button className={classes.result} variant="contained">
            {count}명
          </Button>
          <Button
            className={classes.PlusMinusButton}
            variant="contained"
            onClick={() => incrementCount(1)}
          >
            +
          </Button>
        </Box>
      </Box>

      <CustomizedCheckbox
        label="자동승인"
        checked={auto_accept === "Y"}
        onChange={(e) =>
          setFilter({ [FILTER.auto_accept]: e.target.checked ? "Y" : "N" })
        }
      />

      <p className="SubtitleLeft">가격범위</p>
      <Box px={2}>
        <Slider
          value={priceSlider}
          onChange={(e, value) => {
            setPriceSlider(value);
          }}
          onChangeCommitted={() =>
            setFilter({
              [FILTER.start_price]: priceSlider[0],
              [FILTER.end_price]: priceSlider[1],
            })
          }
          valueLabelDisplay="auto"
          valueLabelFormat={(value) =>
            `${value / 1000}${value > 1000 ? "k" : ""}`
          }
          marks={PriceMark}
          step={10000}
          min={0}
          max={100000}
        />
      </Box>

      <p className="SubtitleLeft">거리범위</p>
      <Box px={2}>
        <Slider
          value={distanceSlider}
          onChange={(e, value) => {
            setDistanceSlider(value);
          }}
          onChangeCommitted={() =>
            setFilter({
              [FILTER.start_distance]: distanceSlider[0],
              [FILTER.end_distance]: distanceSlider[1],
            })
          }
          valueLabelDisplay="auto"
          marks={DistanceMark}
          step={10}
          min={0}
          max={100}
        />
      </Box>

      <Box className={classes.thickLine} />

      <RangeCalendar
        ranges={[
          {
            startDate: start_date,
            endDate: end_date,
            key: "selection",
          },
        ]}
        onChange={({ selection }) =>
          setFilter({
            [FILTER.start_date]: selection.startDate,
            [FILTER.end_date]: selection.endDate,
          })
        }
      />

      <Box className={classes.thickLine} />

      <p className="SubtitleLeft">체크인 시간</p>
      <Box px={2} className={classes.checkIn}>
        <Slider
          value={checkinSlider}
          onChange={(e, value) => setCheckinSlider(value)}
          onChangeCommitted={(e, value) =>
            setFilter({ [FILTER.checkin]: value })
          }
          marks={CheckInMark}
          min={0}
          max={24}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box className={classes.thickLine} />

      <p className="SubtitleLeft">옵션</p>
      <Box className="FlexStart FlexRowWrap">
        {optionLists.map((value, index) => {
          let clickState = selectedOptionArr.includes(value);
          return (
            <ButtonColor
              key={index}
              className={classes.optionBtn}
              label={value}
              clicked={clickState}
              onClick={() => {
                if (clickState) {
                  let optionArrIndex = selectedOptionArr.indexOf(value);
                  if (optionArrIndex !== -1) {
                    selectedOptionArr.splice(optionArrIndex, 1);
                  }
                } else {
                  selectedOptionArr.push(value);
                }
                setFilter({ [FILTER.options]: selectedOptionArr.toString() });
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
