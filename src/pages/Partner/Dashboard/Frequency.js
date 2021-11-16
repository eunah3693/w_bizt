import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  Dashboard: {
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  title: {
    padding: "0 0 30px 26px",
    fontSize: "18px",
    letterSpacing: "-1px",
  },
  fre_graph_wrap: {
    borderBottom: `1px solid ${theme.palette.primary.lightdark}`,
    padding: "40px 0 20px 0",
  },
  fre_graph_left: {
    width: "100px",
    textAlign: "right",
    fontSize: "14px",
  },
  fre_left_top: {
    fontWeight: "500",
    fontSize: "15px",
  },
  fre_graph_line: {
    paddingBottom: "10px",
  },
  fre_graph_line_top: {
    paddingBottom: "20px",
  },
  fre_graph_right: {
    width: "calc(100% - 120px)",
    paddingLeft: "10px",
  },

  fre_graph_num: {
    width: "20%",
    fontSize: "13px",
    color: theme.typography.sub,
    paddingLeft: "5px",
  },
  fre_graph: {
    width: "270px",
    height: "8px",
    backgroundColor: theme.palette.primary.lightdark,
    borderRadius: "3px",
    position: "relative",
    overflow: "hidden",
    left: "0",
    top: "50%",
    transform: "translateY(-50%)",
  },
  fre_graph_inner: {
    position: "absolute",
    left: "0",
    top: "0",

    height: "8px",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.sub,
  },
  fre_graph_inner_top: {
    backgroundColor: theme.palette.primary.main,
  },
}));
function FrequencyBar(props) {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.fre_graph_line}>
      <Box className={classes.fre_graph_left}>{props.name}</Box>
      <Box className={classes.fre_graph_right} display="flex">
        <Box className={classes.fre_graph}>
          <Box
            className={classes.fre_graph_inner}
            style={{ width: props.percent + "%" }}
          ></Box>
        </Box>
        <span className={classes.fre_graph_num}>
          {props.num + "/" + props.total}
        </span>
      </Box>
    </Box>
  );
}

function Frequency(props) {
  const classes = useStyles();

  const { roomData, roomTotalData } = props;

  return (
    <Box className={classes.Dashboard}>
      {/* 오피스 이용 빈도 그래프 */}
      <Box className={classes.fre_graph_wrap}>
        <h5 className={classes.title}>오피스별 이용현황</h5>
        <Box
          display="flex"
          className={clsx(classes.fre_graph_line, classes.fre_graph_line_top)}
        >
          <Box className={clsx(classes.fre_graph_left, classes.fre_left_top)}>
            {roomTotalData?.name}
          </Box>
          <Box className={classes.fre_graph_right} display="flex">
            <Box className={clsx(classes.fre_graph, classes.fre_graph_top)}>
              <Box
                className={clsx(
                  classes.fre_graph_inner,
                  classes.fre_graph_inner_top
                )}
                style={{
                  width:
                    (roomTotalData?.num / roomTotalData?.total) * 100 + "%",
                }}
              ></Box>
            </Box>
            <span className={classes.fre_graph_num}>
              {roomTotalData?.num + "/" + roomTotalData?.total}
            </span>
          </Box>
        </Box>
        {roomData &&
          roomData.map((val, idx) => {
            return (
              <FrequencyBar
                key={idx}
                name={val.name}
                num={val.num}
                total={val.total}
                percent={(val.num / val.total) * 100}
              ></FrequencyBar>
            );
          })}
      </Box>
    </Box>
  );
}

export default Frequency;
