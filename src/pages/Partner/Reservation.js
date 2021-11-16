import React, { useState, useEffect, useContext } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import CarouselDate from "pages/Partner/Reservation/CarouselDate";
import ReservationFilter from "pages/Partner/Reservation/ReservationFilter";
import ReservationListItem from "pages/Partner/Reservation/ReservationListItem";

import {
  fileApi,
  onResponseSuccess,
  requestBiztApi,
} from "utility/connectivity";
import { TTBContext } from "utility/contexts";
import { dateFormat } from "utility/dateHandler";

import "react-spring-bottom-sheet/dist/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
}));

export default function Reservation(props) {
  const classes = useStyles();
  const { path } = useRouteMatch(); // /partner/reservation
  const setTtbOptional = useContext(TTBContext);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [reservation, reservationlist] = useState(null);

  const history = useHistory();
  const historyPath = history.location.pathname;

  useEffect(() => {
    requestBiztApi(
      "/api/reservation",
      null,
      onResponseSuccess(reservationlist)
    );
  }, [historyPath]);

  //toptoolbar
  useEffect(() => {
    setTtbOptional({
      path: path,
      button: (
        <SettingsIcon
          onClick={() => setOpen(true)}
          style={{
            width: "20px",
            height: "20px",
            marginTop: "3px",
          }}
          fontSize="small"
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let startDate = new Date();
  let duration = 6;
  if (filter?.startDate) {
    startDate = filter.startDate;
    duration =
      (filter.endDate.getTime() - filter.startDate.getTime()) /
      1000 /
      60 /
      60 /
      24;
  }
  return (
    <Box>
      <CarouselDate startDay={startDate} duration={duration} />

      <Box className={classes.root}>
        {reservation?.map((reservationData, idx) => {
          const {
            reserv_idx,
            office_name,
            office_image,
            room_name,
            seat_num,
            start_datetime,
            end_datetime,
          } = reservationData;

          return (
            <Box key={idx}>
              <ReservationListItem
                img={fileApi + office_image?.[0]}
                title={office_name}
                mess_link={"/partner/message"}
                status={"after"}
                review
                cardDetails={[
                  { category: "예약번호", content: reserv_idx },
                  {
                    category: "이용호실",
                    content: `${room_name} / ${seat_num}`,
                  },
                  {
                    category: "예약시간",
                    content: (
                      <Box>
                        {dateFormat(new Date(start_datetime))}
                        {" ~"} <br />
                        {dateFormat(new Date(end_datetime))}
                      </Box>
                    ),
                  },
                  { category: "결제액", content: 123 + "원" },
                ]}
              />
              <Divider className={classes.Divider} />
            </Box>
          );
        })}
      </Box>
      <ReservationFilter
        open={open}
        onDismiss={() => setOpen(false)}
        setFilter={setFilter}
      />
    </Box>
  );
}
