import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Chart, AreaSeries } from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, Animation } from "@devexpress/dx-react-chart";
import { curveCatmullRom, area } from "d3-shape";
import { scalePoint } from "d3-scale";

const Area = (props) => (
  <>
    <defs>
      <linearGradient id="PathGradient">
        <stop offset="0%" stopColor="#6fc5de" />
        <stop offset="70%" stopColor="#2047a2" />
        <stop offset="100%" stopColor="#6fc5de" />
      </linearGradient>
    </defs>
    <AreaSeries.Path
      {...props}
      fill={"url(#PathGradient)"}
      path={area()
        .x(({ arg }) => arg)
        .y1(({ val }) => val)
        .y0(({ startVal }) => startVal)
        .curve(curveCatmullRom)}
    />
  </>
);

const useStyles = makeStyles((theme) => ({
  chart_wrap: {
    "& *": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
  },

  chart: {
    width: "405px",
    "& path": {
      opacity: 1,
    },
    "& #center-axis-container": {
      minHeight: "74px",
    },
    "& #bottom-container": {
      height: "2px",
      backgroundColor: theme.palette.primary.lightdark,
    },
  },
  axis: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.typography.sub,
    "& span": {
      fontSize: "13px",
    },
  },
}));

export default function Graph(props) {
  const classes = useStyles();
  return (
    <div className={classes.chart_wrap}>
      <div>
        <Chart
          data={props.chartData}
          className={classes.chart}
          height="73px"
          width="400px"
        >
          <ArgumentScale factory={scalePoint} />
          <AreaSeries
            name="user"
            valueField="user"
            argumentField="time"
            seriesComponent={Area}
          />
          <Animation />
        </Chart>
      </div>
      <div className={classes.axis}>
        <span>00:00</span>
        <span>12:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
}
