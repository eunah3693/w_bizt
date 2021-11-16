import { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    position: "fixed",
    bottom: "56px",
    zIndex: 100,
    width: "451px",
    willChange: "transform",
    touchAction: "none",
    background: "white",
    borderRadius: "16px 16px 0 0",
  },
  header: {
    height: "56px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  body: {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const DragStateEnum = {
  EASE: 0,
  DOWN: 1,
  HOLD: 2,
  UP: 3,
  SPRING: 4,
};

class LightBottomSheet extends Component {
  constructor(props) {
    super(props);

    const { maxHeight, snapPoints, defaultSnap } = props;

    this.dragState = DragStateEnum.EASE;
    this.state = {
      height: snapPoints?.[defaultSnap] || maxHeight || window.innerHeight - 56,
    };
  }

  handleDown(e) {
    if (e.touches?.[0]) {
      e = e.touches?.[0];
    }

    this.dragState = DragStateEnum.HOLD;
    this.initMousePosn = e.clientY;
    this.initHeight = this.state.height;

    this.handleDragBinded = this.handleDrag.bind(this);
    this.handleUpBinded = this.handleUp.bind(this);
    window.addEventListener("touchmove", this.handleDragBinded);
    window.addEventListener("mousemove", this.handleDragBinded);
    window.addEventListener("touchend", this.handleUpBinded);
    window.addEventListener("mouseup", this.handleUpBinded);
  }

  // drag 이벤트를 throttle 하여 초당 60번만 부르게 하기
  handleDrag(e) {
    if (e.touches?.[0]) {
      e = e.touches?.[0];
    }

    if (this.dragState === DragStateEnum.HOLD) {
      let newHeight = this.initHeight + (this.initMousePosn - e.clientY);
      if (newHeight > this.props.maxHeight) newHeight = this.props.maxHeight;

      this.setState({ height: newHeight });
    }
  }

  // start spring animation
  // on spring animation end, change drag state to ease
  // move to closest snap point
  // 1. for each snap points
  // 2. compute |snap point - this.state.height|
  // 3. pick the snap point with smallest <2> value
  // 4. activate transform animation towards the snap point <3>
  // 4-1. or use setState for spring animation
  handleUp(e) {
    this.dragState = DragStateEnum.UP;
    let { snapPoints, maxHeight } = this.props;

    window.removeEventListener("touchmove", this.handleDragBinded);
    window.removeEventListener("mousemove", this.handleDragBinded);
    window.removeEventListener("touchend", this.handleUpBinded);
    window.removeEventListener("mouseup", this.handleUpBinded);

    // 드래그가 끝난 위치와 가장 가까운 snap point를 계산
    let nearestSnap;
    if (snapPoints) {
      let minDeltaIdx = 0;
      snapPoints.forEach((snap, index) => {
        if (
          Math.abs(this.state.height - snapPoints[minDeltaIdx]) >
          Math.abs(this.state.height - snap)
        ) {
          minDeltaIdx = index;
        }
      });
      nearestSnap = snapPoints[minDeltaIdx];
    } else {
      nearestSnap = maxHeight;
    }

    // 드래그가 끝난 위치로 state를 이동
    this.dragState = DragStateEnum.SPRING;
    let newHeight = this.state.height;
    let sprintInterval = setInterval(
      (() => {
        if (this.dragState === DragStateEnum.SPRING) {
          let delta = (nearestSnap - newHeight) / 6;

          if (Math.abs(delta * 60) < 1) newHeight = nearestSnap;
          else newHeight = newHeight + delta;

          // this.dragState를 바꿈으로 사실상 interval의 break문
          if (newHeight === nearestSnap) this.dragState = DragStateEnum.EASE;

          this.setState({ height: newHeight });
        } else {
          clearInterval(sprintInterval);
        }
      }).bind(this),
      1000 / 60
    );
  }

  render() {
    const { classes, children, header, sheetRef, maxHeight } = this.props;
    const { height } = this.state;

    if (sheetRef.current) sheetRef.current.height = height;

    const rootDisposition = {
      transform: `translate(0px, calc( ${maxHeight}px - ${height}px ))`,
    };
    return (
      <Box className={classes.root} style={rootDisposition}>
        <Box
          px={2}
          pt={2.5}
          pb={1.5}
          className={classes.header}
          onMouseDown={this.handleDown.bind(this)}
          onTouchStart={this.handleDown.bind(this)}
        >
          {header}
        </Box>
        <Divider />
        <Box
          className={classes.body}
          ref={sheetRef}
          style={{ height: `${maxHeight - 56}px` }}
        >
          {children}
          <Box style={{ height: `${maxHeight - height}px` }} />
        </Box>
      </Box>
    );
  }
}

LightBottomSheet.propTypes = {
  maxHeight: PropTypes.number.isRequired,
};

export default withStyles(styles)(LightBottomSheet);
