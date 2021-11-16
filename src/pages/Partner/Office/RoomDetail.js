import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import { Box, Divider } from "@material-ui/core";

import SeatButton from "appComponents/interaction/SeatButton";
import RatingReview from "appComponents/layout/RatingReview";
import OfficeListButtonRight from "appComponents/layout/OfficeListButtonRight";
import CarouselSwiper from "appComponents/layout/CarouselSwiper";

import { requestBiztApi } from "utility/connectivity";

// 파트너 이미지
import officeImg from "Img/office.png";

const styles = makeStyles((theme) => ({
  Dashboard: {
    paddingTop: "20px",
  },
  lineBox: {
    borderTop: `3px solid ${theme.palette.primary.lightdark}`,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  box: {
    borderTop: `3px solid ${theme.palette.primary.lightdark}`,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
    paddingBottom: "20px",
  },
  officeListBox: {
    paddingLeft: "6px",
    paddingRight: "6px",
  },
  officeUnderline: {
    paddingLeft: "6px",
    paddingRight: "6px",
    "&:last-child": {
      "& .MuiDivider-root": {
        backgroundColor: theme.typography.light,
      },
    },
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  room_info: {
    paddingTop: "20px",
  },
  fre_wrap: {
    height: "80px",
    backgroundColor: theme.palette.primary.gray,
    paddingTop: "20px",
    display: "block",
    textDecoration: "none",
    color: theme.typography.main,
  },
  fre_title: {
    fontSize: "15px",
    paddingLeft: "26px",
    paddingBottom: "20px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-1px",
  },
  title: {
    fontSize: "15px",
    padding: "25px 26px 10px 23px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-1px",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    textDecoration: "none",
    color: theme.typography.main,
  },
  seat_box: {
    padding: "10px 0 30px 0",
  },
  seat_img: {
    padding: "10px 0 30px 0",
    "& img": {
      width: "400px",
      height: "220px",
    },
  },
  use: {
    width: "16px",
    height: "16px",
    backgroundColor: theme.palette.primary.sub,
  },
  notuse: {
    width: "16px",
    height: "16px",
    backgroundColor: theme.typography.light,
    border: `1px solid ${theme.palette.primary.lightdark}`,
  },
  notusable: {
    width: "16px",
    height: "16px",
    backgroundColor: theme.palette.primary.gray,
  },

  button_wrap: {
    display: "flex",
    flexWrap: "wrap",
    paddingBottom: "20px",
  },
  seat_txt_box: {
    paddingBottom: "20px",
    paddingRight: "20px",
  },
  seat_txt: {
    display: "flex",
    paddingRight: "10px",
    "& span": {
      paddingLeft: "5px",
      fontSize: "13px",
    },
    "& div": {
      marginTop: "2px",
    },
  },
  fre_select: {
    width: "90%",
    margin: "0 auto",
  },

  time_fre_wrap: {
    height: "253px",
    paddingTop: "10px",
    paddingBottom: "40px",
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  re_line: {
    padding: "16px 16px 16px 10px",
    textDecoration: "none",
    color: theme.typography.main,
  },
  select_circle: {
    backgroundColor: theme.palette.primary.sub,
    borderRadius: "15px",
    color: theme.typography.light,
    fontSize: "12px",
    padding: "1px 10px 3px 10px",
    marginRight: "5px",
    position: "relative",
    fontWeight: "normal",
    display: "inline-block",
    lineHeight: "160%",
  },
}));

function RoomDetail(props) {
  const classes = styles();
  const [office, setoffice] = useState(null);
  const [reservation, setreservation] = useState(null);
  const [reviews, setreviews] = useState(null);
  const handleDragStart = (e) => e.preventDefault();

  //url parameter
  const history = useHistory();
  let queryId = history.location.pathname.split("/partner/roomadd/")[1];
  useEffect(() => {
    requestBiztApi("/api/office", null, setoffice);
    requestBiztApi("/api/reservation", null, setreservation);
    requestBiztApi("/api/reviews", null, setreviews);
  }, [queryId]);

  function MakeCircle(arr) {
    var circle_array = arr.map(function (name, index) {
      return <div className={classes.select_circle}>{name}</div>;
    });
    return circle_array;
  }
  //기간 날짜
  function CalculateDate(from, to) {
    var dateFrom = new Date(from);
    var dateTo = new Date(to);
    from =
      dateFrom.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateFrom.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateFrom.toLocaleDateString("en", { day: "2-digit" });

    to =
      dateTo.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateTo.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateTo.toLocaleDateString("en", { day: "2-digit" });
    return from + "~" + to;
  }
  //기간 시간
  function CalculateTime(from, to) {
    var dateFrom = new Date(from);
    var dateTo = new Date(to);
    return (
      dateFrom.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      "~" +
      dateTo.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }
  //날짜 dateformat
  function DateForm(date) {
    var dateObj = new Date(date);
    return (
      dateObj.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateObj.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateObj.toLocaleDateString("en", { day: "2-digit" })
    );
  }
  return (
    <Box className={classes.Dashboard}>
      {/* 오피스 자세히보기 */}
      <Box className={classes.room_info}>
        {office && (
          <CarouselSwiper
            img_array={office[0].images.map((val) =>
              val.url ? (
                <img
                  alt="image1"
                  src={val}
                  className={classes.list_left_img}
                  onDragStart={handleDragStart}
                />
              ) : (
                <img
                  alt="image1"
                  src={"/" + val}
                  className={classes.list_left_img}
                  onDragStart={handleDragStart}
                />
              )
            )}
          ></CarouselSwiper>
        )}
      </Box>

      {/* 오피스 자세히보기 */}
      <Box>
        {office && (
          <div className={classes.officeListBox}>
            <OfficeListButtonRight
              details={[
                {
                  category: "호실이름",
                  content: office[0].seatTypes[0].officeId,
                },
                {
                  category: "운영시간",
                  content: `${office[0].seatTypes[0].HoO.from}:00~${office[0].seatTypes[0].HoO.to}:00`,
                },
                {
                  category: "이용가격",
                  content:
                    `${office[0].seatTypes[0].price.perHour}원/시간, ` +
                    ` ${office[0].seatTypes[0].price.perDay}원/일`,
                },
                {
                  category: "운영옵션",
                  content: MakeCircle(office[0].seatTypes[0].options),
                },
              ]}
            />
          </div>
        )}
      </Box>
      {/* 오피스 프로모션 */}
      <Box className={classes.lineBox}>
        <Box className={classes.title}>
          <span>프로모션 현황</span>
        </Box>
        {office && (
          <div className={classes.officeListBox}>
            <OfficeListButtonRight
              details={[
                {
                  category: "운영기간",
                  content: CalculateDate(
                    office[0].seatTypes[0].appliedPromotion[0].reservedPeriod
                      .from,
                    office[0].seatTypes[0].appliedPromotion[0].reservedPeriod.to
                  ),
                },
                {
                  category: "운영시간",
                  content:
                    new Date(
                      office[0].seatTypes[0].appliedPromotion[0].reservedPeriod.from
                    ).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) +
                    "~" +
                    new Date(
                      office[0].seatTypes[0].appliedPromotion[0].reservedPeriod.to
                    ).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                },
                {
                  category: "운영요일",
                  content: "월,화,수",
                },
                {
                  category: "할인가격",
                  content: `${office[0].seatTypes[0].appliedPromotion[0].value}원/시간`,
                },
              ]}
            />
          </div>
        )}
      </Box>
      {/* 좌석 이용현황 */}
      <Box>
        <Box className={classes.title}>
          <span>좌석 이용현황</span>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.seat_img}
        >
          <img alt="seats" src={officeImg}></img>
        </Box>
        <Box className={classes.button_wrap}>
          {office && (
            <SeatButton num={office[0].seatRemaining.total}></SeatButton>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignContent="center"
          className={classes.seat_txt_box}
        >
          <div className={classes.seat_txt}>
            <div className={classes.use}></div>
            <span className={classes.seatDes}>이용중</span>
          </div>
          <div className={classes.seat_txt}>
            <div className={classes.notuse}></div>
            <span className={classes.seatDes}>예약가능</span>
          </div>
          <div className={classes.seat_txt}>
            <div className={classes.notusable}></div>
            <span className={classes.seatDes}>예약불가능</span>
          </div>
        </Box>
      </Box>
      {/* 좌석 이용현황 */}
      {/* 예약현황 */}
      <Box className={classes.box}>
        <Box
          className={classes.title}
          component={Link}
          to="/partner/reservation"
        >
          <span>예약현황</span>
          {/* <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon> */}
        </Box>
        {reservation &&
          reservation.map((data) => (
            <div className={classes.officeUnderline}>
              <OfficeListButtonRight
                status="사용중"
                details={[
                  { category: "예약번호", content: data.reservationId },
                  { category: "이용호실", content: data.seatNumber },
                  {
                    category: "예약시간",
                    content: CalculateTime(
                      data.reservedPeriod.from,
                      data.reservedPeriod.to
                    ),
                  },
                  {
                    category: "결제액",
                    content: `${data.paymentDetails.price}원`,
                  },
                ]}
              />
              <Divider className={classes.Divider}></Divider>
            </div>
          ))}
      </Box>
      {/* 예약현황 */}
      {/*리뷰리스트*/}
      <Box>
        <Box className={classes.title}>
          <span>최근 이용리뷰</span>
          {/* <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon> */}
        </Box>
        {reviews &&
          reviews.map((data) => (
            <div className={classes.officeUnderline}>
              <Box
                className={classes.re_line}
                display="flex"
                alignContent="center"
              >
                <RatingReview
                  value={data.rateing}
                  img={officeImg}
                  date={DateForm(data.date)}
                  list_txt={data.desc}
                  readOnly={true}
                ></RatingReview>
              </Box>

              <Divider className={classes.Divider}></Divider>
            </div>
          ))}
      </Box>
      {/*리뷰리스트*/}
    </Box>
  );
}

export default RoomDetail;
