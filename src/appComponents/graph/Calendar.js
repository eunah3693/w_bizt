import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import Calendar from "react-calendar";
import dayjs from "dayjs";
import { differenceInCalendarDays } from "date-fns";

import "react-calendar/dist/Calendar.css";
import styles from "css/Calendar.css";

// 파트너, 대시보드에 퍼센트나오는 캘린더 2.16.0버전
// 퍼센트
class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * this.props.percentage) / 100;

    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          transform={`rotate(-90 ${this.props.sqSize / 2} ${
            this.props.sqSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
    );
  }
}
CircularProgressBar.defaultProps = {
  sqSize: 20,
  percentage: 25,
  strokeWidth: 10,
};

const isSameDay = (a) => (b) => {
  var year = b.cal.getFullYear();
  var month = b.cal.getMonth() - 1;
  var date = b.cal.getDate();
  var day = b.cal.getDay();
  b = new Date(year, month, date, day);
  return differenceInCalendarDays(a, b) === 0;
};

class TileContent extends Component {
  render() {
    const { data, date } = this.props;

    const toFilter = data.filter(isSameDay(date));

    return (
      <CircularProgressBar
        className={"circle"}
        strokeWidth={40}
        sqSize="350"
        percentage={toFilter?.[0]?.percent}
        formatDay={(locale, date) => dayjs(date).format("YYYY-MM-DD")}
      />
    );
  }
}

class PercentCalendarSampler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      value: new Date(),
    };
  }

  tileContent = ({ activeStartDate, date, view }) => {
    return <TileContent date={date} data={this.props.data} />;
  };

  render() {
    return (
      <Calendar
        className={"wrap"}
        value={this.state.value}
        calendarType={"US"}
        locale={"ko"}
        maxDetail={"month"}
        minDetail={"month"}
        tileClassName={({ date, view }) => {
          return "circle_box"; // class name
        }}
        tileContent={this.tileContent}
      />
    );
  }
}
export default withStyles(styles)(PercentCalendarSampler);
