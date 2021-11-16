import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import CarouselSwiper from "appComponents/layout/CarouselSwiper";

import { dateFormat } from "utility/dateHandler";

// 카드리스트

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.light,
  },
  headTitle: {
    fontSize: "25px",
    // fontSize: "18px",
    fontWeight: "bold",

    margin: "20px 0 15px 0 ",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    "& > div": {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      marginBottom: "10px",
      "& p:nth-child(1)": {
        width: "20%",
        color: "black",
        fontWeight: "bold",
      },
      "& p:nth-child(2)": {
        width: "80%",
      },
    },
  },
  statusBtn: {
    marginRight: "0px",
    padding: "1px 5px",
    color: `${theme.typography.light}`,
    backgroundColor: `${theme.palette.primary.sub}`,
    borderRadius: "50px",
  },
}));

const ReservStatus = {
  pending: "승인대기",
  denied: "승인거부",
  confirmed: "예약완료",
  present: "이용중",
  exit: "이용완료",
  wait: "대기중",
};

const MyReservationCard = (props) => {
  const { reserv } = props;

  const classes = useStyles();

  const sd = new Date(reserv?.start_datetime);
  const ed = new Date(reserv?.end_datetime);
  const details = [
    { title: "이용호실", contents: reserv?.room_name },
    { title: "좌석번호", contents: reserv?.seat_num },
    {
      title: "예약일시",
      contents: `${dateFormat(sd)} ~ ${dateFormat(ed)}`,
    },
    {
      title: "주소",
      contents: `${reserv?.office_address} ${reserv?.office_address_detail}`,
    },
  ];

  const getStatus = () => {
    let reservState;
    let color;
    if (!reserv) return "";
    else if (reserv.accept === null) {
      reservState = ReservStatus.pending;
      color = "darkgray";
    } else if (reserv.accept === "N") {
      reservState = ReservStatus.denied;
      color = "darkgray";
    } else if (new Date() < new Date(reserv.start_datetime))
      reservState = ReservStatus.confirmed;
    else if (new Date() < new Date(reserv.end_datetime))
      reservState = ReservStatus.present;
    else {
      reservState = ReservStatus.exit;
      color = "darkgray";
    }

    return (
      <p className={classes.statusBtn} style={{ backgroundColor: color }}>
        {reservState}
      </p>
    );
  };

  return (
    <Box p={2.5}>
      <CarouselSwiper images={reserv?.office_image} />
      <Box>
        <div className="SpaceBetween">
          <p className={classes.headTitle}>{reserv?.office_name}</p>
          {getStatus()}
        </div>

        <div className={classes.details}>
          {details.map(({ title, contents }, idx) => (
            <div key={idx}>
              <p>{title}</p>
              <p>{contents}</p>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default MyReservationCard;
