import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  GridList,
  GridListTile,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import spotIcon from "Img/spot.svg";
import person from "Img/person.svg";
import star from "Img/star.svg";
import more from "Img/more.svg";

import bookmark_off from "Img/bookmark_on.svg";
import bookmark_on from "Img/bookmark_off.svg";
import { Link } from "react-router-dom";

const officeTileStyle = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  media: {
    height: "200px",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  headTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  headDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: "13px",
    color: "gray",
    marginRight: "8px",
  },
  subDivContainer: {
    marginBottom: "25px",
  },
  subDiv: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  infoDIvWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  rating: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  rateStar: {
    textAlign: "right",
    boxSizing: "border-box",
  },
  bookmarkIcon: {
    width: "20px",
  },
  spotIcon: {
    width: "10px",
    marginRight: "5px",
  },
  starIcon: {
    width: "15px",
    marginRight: "5px",
  },
  review: {
    color: "darkgray",
    fontSize: "13px",
    fontWeight: "normal",
    marginLeft: "10px",
  },
}));

const OfficeTile = (props) => {
  const classes = officeTileStyle();

  const [clicked, setClicked] = useState(false);

  return (
    <GridListTile
      key={props.key}
      style={{ height: "auto", marginRight: "20px" }}
    >
      <Link to="/search/1">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.images[0]}
              title="Contemplative Reptile"
            />
            <CardContent>
              <div className={classes.headDiv}>
                <p className={classes.headTitle}>{props.officeName}</p>
                <div
                  onClick={(e) => {
                    setClicked(!clicked);
                    e.preventDefault();
                  }}
                >
                  <img
                    className={classes.bookmarkIcon}
                    src={clicked ? bookmark_on : bookmark_off}
                    alt="bookmark"
                  />
                </div>
              </div>
              <div className={classes.subDivContainer}>
                <div className={classes.subDiv}>
                  <img className={classes.spotIcon} src={spotIcon} alt="" />
                  <p className={classes.subTitle}>{props.address}</p>
                </div>
                <div className={classes.subDiv}>
                  <img className={classes.spotIcon} src={person} alt="" />
                  <p className={classes.subTitle}>
                    {props.seatRemaining.total - props.seatRemaining.available}{" "}
                    / {props.seatRemaining.total}
                  </p>
                </div>
              </div>
              <div className={classes.infoDIvWrapper}>
                <div className={classes.infoDiv}>
                  <p className={classes.info}>{props.minPrice}원/시간</p>
                </div>
                <div className={`${classes.infoDiv} ${classes.rating}`}>
                  <img className={classes.starIcon} src={star} alt="" />

                  <p className={`${classes.info} ${classes.rateStar}`}>
                    {props.rating.toFixed(1)}
                  </p>
                  <p className={`${classes.info} ${classes.review}`}>
                    {props.numReviews && `리뷰${props.numReviews} 개`}
                  </p>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </GridListTile>
  );
};

const officeBannerStyle = makeStyles((theme) => ({
  wrapper: {
    marginBottom: "30px",
    "& .MuiGridListTile": {
      height: "auto",
      maxWidth: "100%",
      background: "red",
    },
    "& .MuiGridListTile-tile": {
      boxShadow: ` 8px 1px 8px ${theme.palette.primary.shadow}`,
    },
    "& .MuiPaper-rounded": {
      borderRadius: "0",
    },
    "& .MuiGridList-root": {
      display: "flex",
      padding: 0,
      flexWrap: "nowrap",
      listStyle: "none",
      overflow: "auto",
      flexDirection: "row",
    },
    "& .alice-carousel__stage-item img": {
      height: "auto",
      width: "100%",
      maxWidth: "100%",
    },
  },
  MainTitleBox: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
  },
  spotIcon: {
    width: "10px",
    marginRight: "5px",
  },
  more: {
    color: "darkgray",
    fontSize: "13px",
    fontWeight: "normal",
  },
  gridList: {
    flexWrap: "nowrap",
    margin: "10px",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

export default function OfficeBanner(props) {
  const { bannerData } = props;

  const classes = officeBannerStyle();

  return (
    <div className={classes.wrapper}>
      <Box m={1.5}>
        <Box className={classes.MainTitleBox}>
          <p
            style={{ marginRight: "20px", fontWeight: "500", fontSize: "18px" }}
          >
            {bannerData.sliderTitle}
          </p>

          {/* <Box display="contents">
            <img className={classes.spotIcon} src={more} alt="" />
            <p className={classes.more}>more</p>
          </Box> */}
        </Box>
      </Box>
      <Box className="Padding10px">
        <GridList
          style={{ paddingBottom: "10px" }}
          className={classes.gridList}
          cols={1.65}
        >
          {bannerData.contents?.map((officeData, index) => (
            <OfficeTile key={index} {...officeData} />
          ))}
        </GridList>
      </Box>
    </div>
  );
}
