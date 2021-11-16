import React from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swiper from "react-id-swiper";

import "swiper/swiper.scss";
import "css/CarouselSwiper.css";
import { fileApi } from "utility/connectivity";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .swiper-pagination": {
      right: "15px",
    },
  },
  slideImage: {
    width: "420px",
    height: "280px",
    objectFit: "cover",
  },
}));
//version: 4.0.0
const CarouselSwiper = (props) => {
  const classes = useStyles();
  const img = props.images;
  const params = {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  };
  return (
    <Box className={classes.root}>
      <Swiper {...params}>
        {img?.map((item, idx) => (
          <img
            key={idx}
            alt={`office_${idx}`}
            className={classes.slideImage}
            src={fileApi + item}
            onDragStart={(e) => e.preventDefault()}
          />
        ))}
      </Swiper>
    </Box>
  );
};
export default CarouselSwiper;
