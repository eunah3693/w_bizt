import React from "react";

import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";

// 라이브러리: https://github.com/maxmarinich/react-alice-carousel
export default function CarouselReport(props) {
  const responsive = {
    0: {
      items: 1,
    },
  };
  return (
    <AliceCarousel
      mouseTracking
      disableButtonsControls
      disableDotsControls
      items={props.img}
      responsive={responsive}
    />
  );
}
