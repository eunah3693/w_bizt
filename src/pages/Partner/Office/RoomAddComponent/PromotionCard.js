import React, { useState, useRef } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";

import { BottomSheet } from "react-spring-bottom-sheet";

import RangeCalendar from "appComponents/interaction/RangeCalendar";
import CircleButton from "appComponents/interaction/CircleButton";
import MultipleSlider from "appComponents/interaction/MultipleSlider";
import Slider from "@material-ui/core/Slider";
import SelectMini from "appComponents/interaction/SelectMini";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: "90%",
    backgroundColor: theme.typography.light,
    padding: "50px 15px 15px 15px",
    margin: "10px auto",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  box: {
    position: "absolute",
    right: "20px",
    top: "5px",
    fontSize: "40px",
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  option_title: {
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: "15px",
  },
  slider: {
    height: "65px",
  },
  promotion_cal: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "13px",
    alignItems: "center",
  },
  promotion_date: {
    fontWeight: "500",
  },
  promotion_week: {
    paddingTop: "15px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  form_line2: {
    height: "70px",
    display: "flex",
    alignItems: "center",
  },
  form_left: {
    width: "90px",
    fontSize: "15px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-2px",
    color: theme.typography.color,
  },

  form_right3: {
    width: "calc(100% - 90px)",
    display: "flex",
    alignItems: "center",
    "& input": {
      width: "200px",
      height: "47px",
      border: `1px solid ${theme.palette.primary.lightdark}`,
      paddingLeft: "10px",
    },
    position: "relative",
  },
  bottomSheet: {
    "& [data-rsbs-overlay], [data-rsbs-backdrop], [data-rsbs-root]:after": {
      zIndex: 101,
      bottom: "56px",
    },
    "& [data-rsbs-header]": {
      height: "75px",
    },
  },
  orange: {
    color: theme.palette.primary.main,
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
});

/**
 * data = {
 *  key: 123, // ???????????? ????????? ????????? promotion??????
 *  promotion_idx: 123, // ????????? ???????????? promotion????????? db??? idx???
 *  start_time: 0~24,
 *  end_time: 0~24,
 *  start_date: 0~24,
 *  end_date: 0~24,
 *  day: [???~???],
 *  discount_fee: 123,
 *  unit: "won || perc"
 * }
 * @param {*} props
 * @returns
 */

const weekDays = ["???", "???", "???", "???", "???", "???", "???"];
const WEEKENUM = { ???: 0, ???: 1, ???: 2, ???: 3, ???: 4, ???: 5, ???: 6 };

function boolWeeksToString(boolWeeks) {
  let strWeeks = [];
  boolWeeks.forEach((value, index) => {
    if (value) {
      strWeeks.push(weekDays[index]);
    }
  });
  return strWeeks;
}

function strWeeksToBool(strWeeks) {
  let boolWeeks = new Array(7).fill(false);
  strWeeks.split(",").forEach((day) => {
    boolWeeks[WEEKENUM[day]] = true;
  });

  return boolWeeks;
}

function renderWeekDays(weekState, handler) {
  return weekDays.map((text, idx) => (
    <CircleButton
      key={idx}
      value={weekState[idx]}
      onClick={() => handler(idx)}
      text={text}
    />
  ));
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 24,
    label: "24",
  },
];

const units = [
  { value: "???", label: "???" },
  { value: "%", label: "%" },
];

class PromotionCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.sheetRef = React.createRef();
    this.state = {
      open: false,
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    };
  }

  // setPromotion??? ?????? promotion??? ?????? ???????????? ???????????? ??????
  modifyPromotion(newState) {
    let newPromotion = { ...this.props.data, ...newState };
    this.props.setPromotion(newPromotion, this.props.arrIdx);
  }

  // promotion??? ?????? ?????? ?????????????????? ?????????
  reset() {
    this.setState({
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    });
  }

  // promotion??? ?????? ?????? ?????????????????? ????????????
  onRangeChange(ranges) {
    if (ranges["selection"] != null) {
      this.setState({ selection: ranges["selection"] });
    }
  }

  // promotion??? ?????? ?????? ????????????????????? ?????? ?????? ??? promotion data ????????? ????????????
  handleDateChange() {
    this.setState({ open: !this.state.open });
    let slt = this.state.selection;
    if (slt) {
      this.modifyPromotion({
        start_date: slt.startDate.toLocaleDateString("ko-KR"),
        end_date: slt.endDate.toLocaleDateString("ko-KR"),
      });
    }
  }

  // promotion??? ?????? ?????? ???????????? ?????????????????? ????????????
  handleWeekChange(day) {
    let newWeek = [...strWeeksToBool(this.props.data.weeks)];
    newWeek[day] = !newWeek[day];
    newWeek = boolWeeksToString(newWeek).toString();
    this.modifyPromotion({
      weeks: newWeek,
    });
  }

  // date ?????? YY-MM-DD  ????????? ?????????
  DateForm(date) {
    var dateObj = new Date(date);
    return (
      dateObj.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateObj.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateObj.toLocaleDateString("en", { day: "2-digit" })
    );
  }

  render() {
    const { classes, arrIdx, data, deletePromotion } = this.props;
    let {
      start_time,
      end_time,
      start_date,
      end_date,
      weeks,
      discount_fee,
      promotion_type,
    } = data;

    return (
      <>
        <div className={classes.root}>
          <div className={classes.box} onClick={() => deletePromotion(arrIdx)}>
            ??
          </div>
          <h3 className={classes.option_title}>???????????? ?????? ??????</h3>
          <div className={classes.slider}>
            {/* <MultipleSlider
              setting={[parseInt(start_time), parseInt(end_time)]}
              width="350px"
              onChange={(event, newValue) => {
                modifyPromotion({
                  start_time: newValue[0],
                  end_time: newValue[1],
                });
              }}
            /> */}
            <Slider
              style={{
                position: "relative",
                width: "350px",
                margin: "0 auto",
              }}
              step={1}
              min={0}
              max={24}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              defaultValue={[parseInt(start_time), parseInt(end_time)]}
              onChangeCommitted={(e, newValue) => {
                this.modifyPromotion({
                  start_time: newValue[0],
                  end_time: newValue[1],
                });
              }}
              marks={marks}
            />
          </div>
          <h3 className={classes.option_title}>???????????? ?????? ??????/??????</h3>
          <div className={classes.promotion_cal}>
            <span className={classes.promotion_date}>
              <span>{this.DateForm(start_date)}</span>
              {start_date !== end_date && (
                <span> ~ {this.DateForm(end_date)}</span>
              )}
            </span>
            <span>
              <DateRangeIcon
                className={classes.orange}
                onClick={() => this.setState({ open: !this.state.open })}
              />
            </span>
          </div>
          <div className={classes.promotion_week}>
            {renderWeekDays(
              strWeeksToBool(weeks),
              this.handleWeekChange.bind(this)
            )}
          </div>
          <div style={{ paddingTop: "20px" }}>
            <div className={classes.form_line2}>
              <div className={classes.form_left}>?????? ??????</div>
              <div className={classes.form_right3}>
                <input
                  type="text"
                  placeholder="?????? ????????? ???????????????"
                  value={discount_fee ? discount_fee : ""}
                  onChange={(e) =>
                    this.modifyPromotion({ discount_fee: e.target.value })
                  }
                />

                <div>
                  <SelectMini
                    onChange={({ value }) =>
                      this.modifyPromotion({ promotion_type: value })
                    }
                    options={units}
                    defaultValue={{
                      value: promotion_type,
                      label: promotion_type,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomSheet
          open={this.state.open}
          skipInitialTransition
          blocking={false}
          ref={this.sheetRef}
          onDismiss={() => this.setState({ open: false })}
          className={classes.bottomSheet}
          header={
            <div className={classes.calendar_title}>
              <span className={classes.reset} onClick={this.reset.bind(this)}>
                ?????????
              </span>
              <span className={classes.title}>????????????</span>
              <span
                className={classes.close}
                onClick={this.handleDateChange.bind(this)}
              >
                ??????
              </span>
            </div>
          }
          snapPoints={({ maxHeight }) => 0.7 * maxHeight}
        >
          <Box p={1}>
            <RangeCalendar
              onChange={this.onRangeChange.bind(this)}
              ranges={[this.state.selection]}
            />
          </Box>
        </BottomSheet>
      </>
    );
  }
}

export default withStyles(styles)(PromotionCard);
