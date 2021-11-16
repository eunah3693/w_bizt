import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import CarouselSwiper from "appComponents/layout/CarouselSwiper";
import {
  fileApi,
  onResponseSuccess,
  requestBiztApi,
} from "utility/connectivity";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  useTheme,
} from "@material-ui/core";

import theme from "utility/theme";

import { CarouselCardDetail } from "./CarouselCardDetail";
import { getSelectedCardId } from "pages/User/Search/mapController";

import { dateFormat } from "utility/dateHandler";

import spotIcon from "Img/spot.svg";
import person from "Img/person.svg";
import star from "Img/star.svg";

import "react-alice-carousel/lib/alice-carousel.css";

const mediaCardStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    margin: "15px",
    height: "auto",
    "& .MuiCardContent-root": {
      // border: " 1px solid gainsboro",
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
    "& .MuiCard-root": {
      boxShadow: "none",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "0",
      border: `1px solid ${theme.palette.primary.lightdark}`,
    },
  },
  headTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: "15px",
    color: "darkgray",
    marginRight: "8px",
  },
  subDiv: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1),
  },
  infoDivWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  infoDiv: {
    width: "50%",
  },
  rating: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  rateStar: {
    textAlign: "right",
    boxSizing: "border-box",
    fontSize: "15px",
    fontWeight: "bold",
  },
  reviews: {
    marginLeft: "5px",
    textAlign: "right",
    boxSizing: "border-box",
    fontSize: "13px",
    color: `${theme.palette.primary.helper}`,
  },
  detailDivWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  optionButton: {
    padding: "0 5px",
    borderRadius: " 100px",
    marginRight: " 5px",
  },
  spotIcon: {
    width: "10px",
    marginRight: "5px",
  },
  starIcon: {
    width: "15px",
    marginRight: "5px",
  },
  fee: {
    fontSize: "20px",
    width: "100%",
    fontWeight: "bold",
  },
}));

/**
 * cardDetailDataList: [{category: "", content: ""}, ]
 * @param {*} props
 * @returns
 */
export default function CarouselCard(props) {
  const classes = mediaCardStyles(props);

  let {
    office_idx,
    office_image,
    office_address,
    office_name,
    minPrice,
    onClick,
    seatRemaining,
    rating,
    numReviews,
    cardDetailDataList,
  } = props;

  return (
    <Card className={classes.root} id={getSelectedCardId(office_idx)}>
      <CardActionArea component={Box} onClick={() => onClick?.(office_idx)}>
        <Box style={{ position: "relative" }}>
          <CarouselSwiper images={office_image} />
        </Box>
        <CardContent>
          <Box className="SpaceBetween" mb={1}>
            <p className={classes.headTitle}>{office_name}</p>
            {props.interaction}
          </Box>
          <div className={classes.subDiv}>
            <img className={classes.spotIcon} src={spotIcon} alt="" />
            <p className={classes.subTitle}>{office_address}</p>

            {seatRemaining && (
              <>
                <img className={classes.spotIcon} src={person} alt="" />
                <p className={classes.subTitle}>
                  {seatRemaining.total - seatRemaining.available}/
                  {seatRemaining.total}
                </p>
              </>
            )}
          </div>
          {(minPrice || (rating && numReviews)) && (
            <div className={classes.infoDivWrapper}>
              {minPrice && (
                <div className={classes.infoDiv}>
                  <p className={` ${classes.fee}`}>{minPrice}원 / 시간</p>
                </div>
              )}

              {rating && numReviews && (
                <div className={`${classes.infoDiv} ${classes.rating}`}>
                  <img className={classes.starIcon} src={star} alt="" />
                  <p className={classes.rateStar}>{rating.toFixed(1)}점</p>
                  <p className={classes.reviews}>리뷰 {numReviews}개</p>
                </div>
              )}
            </div>
          )}
          <div className={classes.detailDivWrapper}>
            {cardDetailDataList?.map((data, index) => (
              <CarouselCardDetail key={index} category={data.category}>
                {data.content}
              </CarouselCardDetail>
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// PoO = Period of Operation, HoO + DoO
function configureNetPoO(rooms) {
  let minStart = -1;
  let maxEnd = -1;
  rooms?.forEach((room) => {
    if (parseInt(room.open_time) < parseInt(minStart) || minStart === -1)
      minStart = room.open_time;
    if (parseInt(maxEnd) < parseInt(room.close_time) || maxEnd === -1)
      maxEnd = room.close_time;
  });
  return `${minStart} ~ ${maxEnd}`;
}

function configureNetRoomNames(rooms) {
  return rooms?.map((room) => room.room_name).join(", ");
}

function configureNetOptions(rooms) {
  let uniqueOptions = new Set();
  rooms?.forEach((room) => {
    room.option_set?.split(",").forEach((option) => {
      uniqueOptions.add(option);
    });
  });
  rooms?.forEach((room) => {
    room.option_etc?.split(",").forEach((option) => {
      uniqueOptions.add(option);
    });
  });

  return [...uniqueOptions]?.map((option, index) => (
    <Button
      key={index}
      style={{
        marginRight: "5px",
        lineHeight: "1.5",
        padding: 0,
        color: "white",
        cursor: "pointer",
        textDecoration: "none",
        listStyle: "none",
        borderRadius: "50px",
        backgroundColor: ` ${theme.palette.primary.sub}`,
      }}
    >
      {option}
    </Button>
  ));
}

function configureMinFeePerHour(rooms) {
  let minFee = -1;
  rooms?.forEach((room) => {
    let parsedFPH = parseInt(room.fee_per_hour);
    if (parsedFPH < minFee || minFee === -1) {
      minFee = parsedFPH;
    }
  });
  return minFee;
}

// props = {office_idx, office_address, office_name, onClick}
export function SearchCard(props) {
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    // 더미데이터가 아닐 시 ?office=" + props.office_idx 가 붙어야함
    requestBiztApi(
      "/api/room?office=" + props.office_idx,
      null,
      onResponseSuccess(setRoomData)
    );
  }, []);

  let cardDetailDataList = () => [
    { category: "운영시간", content: configureNetPoO(roomData) },
    { category: "운영호실", content: configureNetRoomNames(roomData) },
    { category: "옵션", content: configureNetOptions(roomData) },
  ];

  return (
    <>
      {!!roomData?.length && (
        <CarouselCard
          {...props}
          ratingController
          cardDetailDataList={cardDetailDataList()}
          onClick={props.onClick}
          minPrice={configureMinFeePerHour(roomData)}
        />
      )}
    </>
  );
}
export function ReservationCard(props) {
  const theme = useTheme();
  const history = useHistory();
  const { path } = useRouteMatch();

  const {
    reserv_idx,
    start_datetime,
    end_datetime,
    // office_idx,
    // room_idx,
    // seat_idx,
    // accept,
    // reject_comment,
    office_name,
    office_address,
    office_address_detail,
    office_image,
    room_name,
  } = props;

  const cardDetailDataList = [
    { category: "예약번호", content: reserv_idx },
    { category: "예약호실", content: room_name },
    {
      category: "이용시간",
      content: `${dateFormat(new Date(start_datetime))} ~ ${dateFormat(
        new Date(end_datetime)
      )}`,
    },
    { category: "결제액", content: 123 + " 원" },
  ];

  return (
    <CarouselCard
      interaction={
        <Box
          onClick={(e) => {
            e.preventDefault();
            history.push(`${path}/review/${reserv_idx}`);
          }}
        >
          <span
            style={{
              color: "white",
              cursor: "pointer",
              textDecoration: "none",
              listStyle: "none",
              borderRadius: "50px",
              padding: "3px 5px",
              backgroundColor: ` ${theme.palette.primary.sub}`,
            }}
          >
            리뷰작성
          </span>
        </Box>
      }
      office_image={office_image}
      office_name={office_name}
      office_address={`${office_address} ${office_address_detail}`}
      cardDetailDataList={cardDetailDataList}
    />
  );
}
