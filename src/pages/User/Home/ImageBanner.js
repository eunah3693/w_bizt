import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";
import { LaptopWindows } from "@material-ui/icons";
import { fileApi } from "utility/connectivity";

//메인 상단 배너
const useStyles = makeStyles((theme) => ({
  box: {
    position: "relative",
    marginBottom: "20px",
    minHeight: "350px",
  },
  content: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
  },
  bannerText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    margin: 0,
  },
  desc: {
    fontSize: "17px",
    color: "white",
  },
  title: {
    fontSize: "35px",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

function createImageElements(content, className) {
  let dragFlag = false;
  return content?.map((imageItem, index) => {
    let boxProps = { key: index };
    if (imageItem.url && imageItem.url.includes("http")) {
      boxProps.onClick = () => {
        window.location.href = imageItem.url;
      };
    } else if (imageItem.url) {
      boxProps.component = Link;
      boxProps.to = imageItem.url;
    }

    return (
      <Box
        {...boxProps}
        onDragStart={(e) => {
          e.preventDefault();
          dragFlag = true;
        }}
        onClick={(e) => {
          if (dragFlag) e.preventDefault();
          dragFlag = false;
        }}
      >
        <img
          alt="Banner"
          src={fileApi + imageItem.banner_image}
          className={className}
        />
      </Box>
    );
  });
}

// props.bannerData = {
//   title: "slider 상단에 표기될 이름",
//   desc: "something description",
//   contents: [{url: "str", banner_image:["image url"]}]
// };
function ImageBanner(props) {
  const classes = useStyles();

  let { title, desc, contents } = props;

  return (
    <Box className={classes.box}>
      {contents && (
        <div>
          <AliceCarousel
            mouseTracking
            disableButtonsControls
            disableDotsControls
            items={createImageElements(contents, classes.content)}
          />
          <div className={classes.bannerText}>
            <p className={classes.desc}>{desc}</p>
            <p className={classes.title}>{title}</p>
          </div>
        </div>
      )}
    </Box>
  );
}

export default ImageBanner;
