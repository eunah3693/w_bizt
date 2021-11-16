import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Switch, Grid, FormGroup } from "@material-ui/core";

import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";

const listDragStart = (e) => e.preventDefault();

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
const RoomDetailSwitchStyle = makeStyles((theme) => ({
  list_wrap: {
    position: "relative",
  },
  list_box: {
    width: "100%",
    textAlign: "center",
  },
  list_img: {
    width: "400px",
    height: "220px",
  },
  list_num: {
    position: "absolute",
    right: "30px",
    bottom: "20px",
    borderRadius: "5px",
    backgroundColor: theme.typography.color,
    opacity: ".8",
    padding: "2px 5px",
    color: theme.typography.light,
    fontSize: "12px",
  },
  info: {
    padding: "20px 26px 20px 26px",
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  promotion: {
    padding: "20px 26px 20px 26px",
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  line: {
    width: "100%",
    display: "flex",
    padding: "3px 0",
    position: "relative",
  },
  switch_icon: {
    position: "absolute",
    right: "0",
    top: "5px",
  },
  left: {
    width: "100px",
    color: theme.typography.dark,
    fontSize: "13px",
  },
  right: {
    width: "calc(100% - 100px)",
    color: theme.typography.color,
    fontSize: "13px",
    display: "flex",
  },
  room: {
    paddingBottom: "15px",
    fontSize: "18px",
  },
  title: {
    paddingBottom: "15px",
    fontSize: "16px",
  },
  circle: {
    backgroundColor: theme.palette.primary.sub,
    padding: "1px 5px",
    borderRadius: "10px",
    color: theme.typography.light,
    marginRight: "3px",
  },
}));

const itemss = (classes, props) => [
  <div className={classes.list_box} onDragStart={listDragStart}>
    <img alt="image1" src={props.img1123} className={classes.list_img} />
  </div>,
  <div className={classes.list_box} onDragStart={listDragStart}>
    <img alt="image2" src={props.img21} className={classes.list_img} />
  </div>,
  <div className={classes.list_box} onDragStart={listDragStart}>
    <img alt="image3" src={props.img31} className={classes.list_img} />
  </div>,
  <div className={classes.list_box} onDragStart={listDragStart}>
    <img alt="image4" src={props.img41} className={classes.list_img} />
  </div>,
  <div className={classes.list_box} onDragStart={listDragStart}>
    <img alt="image5" src={props.img51} className={classes.list_img} />
  </div>,
];

function RoomDetailSwitch(props) {
  const classes = RoomDetailSwitchStyle();

  // const [value, setValue] = React.useState({});
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const responsive = {
    0: {
      items: 1,
    },
  };

  const [num, numChange] = React.useState(1);

  function onSlideChange(e) {
    // console.log(e.item);
    // console.log(e.item + 1);
    // debugger;
    console.log(Number(e.item) + 1);
    numChange(Number(e.item) + 1);
  }
  return (
    <div>
      <div className={classes.list_wrap}>
        <AliceCarousel
          mouseTracking
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          // onSlideChange={onSlideChange.bind(this)}
          onSlideChanged={onSlideChange}
          infinite={false}
          items={itemss(classes, props)}
        ></AliceCarousel>
        {/* <div className={classes.list_num}>
          <span>{num}</span>/<span>{itemss(classes, props).length}</span>
        </div> */}
      </div>
      <div className={classes.info}>
        <div className={classes.line}>
          <h3 className={classes.room}>개인 1호실</h3>
          <FormGroup className={classes.switch_icon}>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <AntSwitch
                    checked={state.checkedC}
                    onChange={handleChange}
                    name="checkedC"
                  />
                </Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </div>
        <div className={classes.line}>
          <div className={classes.left}>운영시간</div>
          <div className={classes.right}>평일 09:00~17:00</div>
        </div>
        <div className={classes.line}>
          <div className={classes.left}>이용가격</div>
          <div className={classes.right}>25,000원/시간</div>
        </div>
        <div className={classes.line}>
          <div className={classes.left}>운영옵션</div>
          <div className={classes.right}>
            <div className={classes.circle}>인터넷</div>
            <div className={classes.circle}>회의실</div>
            <div className={classes.circle}>프린터</div>
          </div>
        </div>
      </div>
      <div className={classes.promotion}>
        <h3 className={classes.title}>프로모션 설정</h3>
        <div className={classes.line}>
          <div className={classes.left}>운영시간</div>
          <div className={classes.right}>09:00~17:00</div>
        </div>
        <div className={classes.line}>
          <div className={classes.left}>운영요일</div>
          <div className={classes.right}>화수목</div>
        </div>
        <div className={classes.line}>
          <div className={classes.left}>운영기간</div>
          <div className={classes.right}>2021.05.01~2021.05.17</div>
        </div>
        <div className={classes.line}>
          <div className={classes.left}>할인설정</div>
          <div className={classes.right}>3,000원/시간</div>
        </div>
      </div>
    </div>
  );
}
export default RoomDetailSwitch;
