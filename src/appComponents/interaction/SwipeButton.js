import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const slider = React.createRef();
const container = React.createRef();
const isTouchDevice = "ontouchstart" in document.documentElement;

const styles = (theme) => ({
  ReactSwipeButton: {
    width: "100%",
    height: "50px",
    position: "relative",
  },
  rsbContainer: {
    float: "left",
    width: "100%",
    height: "100%",
    background: "#eee",
    // borderRadius: "50px",
    position: "relative",
    overflow: "hidden",
  },
  rsbContainerUnlocked: {
    width: "50% !important",
    marginLeft: "25%",
    transition: "0.5s",
    cursor: "default",
    "& $rsbcSlider": {
      left: "100% !important",
      cursor: "default",
      pointerEvents: "none",
    },
    "& $rsbcSliderArrow": {
      transition: "0.5s",
      marginRight: "-60px",
    },
    "& $rsbcSliderCircle": {
      transition: "0.5s",
      marginRight: "-60px",
    },
  },
  rsbcSlider: {
    float: "left",
    width: "100%",
    position: "absolute",
    height: "50px",
    top: "0",
    left: "50px",
    marginLeft: "-100%",
    background: theme.palette.primary.main,
    // borderRadius: "25px",
    zIndex: "100",
    cursor: "pointer",
  },
  rsbcSliderText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    lineHeight: "50px",
    textAlign: "center",
    letterSpacing: "2px",
    color: "#fff",
    fontSize: "13px",
  },
  rsbcSliderArrow: {
    float: "left",
    position: "absolute",
    transform: "rotate(45deg)",
    border: "2px solid #fff",
    height: "8px",
    width: "8px",
    top: "50%",
    right: "22px",
    marginTop: "-6px",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transformOrigin: "center",
    zIndex: 10,
  },
  rsbcSliderCircle: {
    position: "absolute",
    right: 0,
    background: theme.palette.primary.navy,
    top: 0,
    height: "50px",
    width: "50px",
    // borderRadius: "100%",
  },
  rsbcText: {
    float: "left",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    letterSpacing: "2px",
    fontSize: "13px",
    color: theme.palette.primary.darkgray,
  },
});

class SwipeButton extends Component {
  isDragging = false;
  sliderLeft = 0;

  state = {};

  componentDidMount() {
    if (isTouchDevice) {
      document.addEventListener("touchmove", this.onDrag);
      document.addEventListener("touchend", this.stopDrag);
    } else {
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    }
    this.containerWidth = container.current.clientWidth - 50;
  }

  startDrag = (e) => {
    if (this.unmounted || this.state.unlocked) return;
    this.isDragging = true;
    if (isTouchDevice) {
      this.startX = e.touches?.[0].clientX;
    } else {
      this.startX = e.clientX;
    }
  };

  onDrag = (e) => {
    if (this.unmounted || this.state.unlocked) return;
    if (this.isDragging) {
      if (isTouchDevice) {
        this.sliderLeft = Math.min(
          Math.max(0, e.touches[0].clientX - this.startX),
          this.containerWidth
        );
      } else {
        this.sliderLeft = Math.min(
          Math.max(0, e.clientX - this.startX),
          this.containerWidth
        );
      }
      this.updateSliderStyle();
    }
  };

  stopDrag = () => {
    if (this.unmounted || this.state.unlocked) return;
    if (this.isDragging) {
      this.isDragging = false;
      if (this.sliderLeft > this.containerWidth * 0.9) {
        this.sliderLeft = this.containerWidth;
        this.onSuccess();
        if (this.props.onSuccess) {
          this.props.onSuccess();
        }
        this.updateSliderStyle();
      } else {
        if (this.props.onFailure) {
          this.props.onFailure();
        }
        this.animateSliderStyle(0);
      }
    }
  };

  updateSliderStyle = () => {
    if (this.unmounted || this.state.unlocked) return;
    slider.current.style.left = this.sliderLeft + 50 + "px";
  };

  animateSliderStyle = (to) => {
    if (this.unmounted || this.state.unlocked) return;

    const duration = 0.25;
    const fps = 60;
    const totRefresh = duration * fps;
    let delta = to - this.sliderLeft;
    let shiftPerRefresh = delta / totRefresh;

    let animation = setInterval(() => {
      if (this.sliderLeft <= 0 || this.unmounted || this.state.unlocked)
        clearInterval(animation);

      this.sliderLeft += shiftPerRefresh;
      delta = to - this.sliderLeft;
      if (delta > -10) delta = -10;
      shiftPerRefresh = (delta / totRefresh) * 1.5;

      if (this.sliderLeft < 0) this.sliderLeft = 0;
      if (slider.current)
        slider.current.style.left = this.sliderLeft + 50 + "px";
    }, 1000 / fps);
  };

  onSuccess = () => {
    container.current.style.width = container.current.clientWidth + "px";
    this.setState({
      unlocked: true,
    });
  };

  getText = () => {
    return this.state.unlocked
      ? this.props.text_unlocked || "UNLOCKED"
      : this.props.text || "SLIDE";
  };

  reset = () => {
    if (this.unmounted) return;
    this.setState({ unlocked: false }, () => {
      this.sliderLeft = 0;
      this.updateSliderStyle();
    });
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.ReactSwipeButton}>
        <div
          className={
            classes.rsbContainer +
            " " +
            (this.state.unlocked ? classes.rsbContainerUnlocked : "")
          }
          ref={container}
        >
          <div
            className={classes.rsbcSlider}
            ref={slider}
            onMouseDown={this.startDrag}
            style={{ background: this.props.color }}
            onTouchStart={this.startDrag}
          >
            <span className={classes.rsbcSliderText}>{this.getText()}</span>
            <span className={classes.rsbcSliderArrow}></span>
            <span
              className={classes.rsbcSliderCircle}
              style={{ background: this.props.color }}
            ></span>
          </div>
          <div className={classes.rsbcText}>{this.getText()}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SwipeButton);
