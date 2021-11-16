import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

import OfficeListAccordion from "pages/Partner/Office/OfficeListAccordion";
import ListCard from "appComponents/layout/ListCard";
import addIcon from "Img/addIcon.svg";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
const OfficeListDropdownStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  detail_wrap: {
    width: "100%",
    backgroundColor: theme.palette.primary.gray,
  },
  roomLine: {
    paddingBottom: "20px",
  },
  detail_title: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px",
    paddingBottom: "10px",
    fontSize: "16px",
    letterSpacing: "-2px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  detail_circle: {
    width: "20px",
    height: "25px",
    marginRight: "5px",
  },
}));

export default function OfficeList(props) {
  const classes = OfficeListDropdownStyle();
  const { path } = useRouteMatch(); // /partner/office

  const { listImg, listTitle, officeId } = props;
  const [expanded, setExpanded] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // 더미데이터가 아닐 시 ?office=" + props.office_idx 가 붙어야함
    requestBiztApi("/api/room", null, onResponseSuccess(setRooms));
  }, []);

  let officeDetails = () => [
    {
      category: "주소",
      content: props.office_address,
    },
    {
      category: "",
      content: props.office_address_detail,
    },
    {
      category: "등록호실",
      content: rooms.length,
    },
  ];

  return (
    <div className={classes.root}>
      <ListCard
        cardImage={listImg}
        title={listTitle}
        editLink={`${path}/compose/${officeId}`}
        cardDetails={officeDetails()}
      />
      <OfficeListAccordion
        expanded={expanded}
        onChange={(event, newExpanded) => setExpanded(newExpanded)}
      >
        <Box className={classes.detail_wrap}>
          <div className={classes.detail_title}>
            <img
              alt="add room"
              src={addIcon}
              className={classes.detail_circle}
            />
            <Link to={`${path}/compose/${officeId}/room`}>호실 등록</Link>
          </div>

          {rooms?.map((roomData, idx) => {
            const { room_name, room_idx, fee_per_hour, seat_count } = roomData;

            let cardProps = {
              cardImage: "/",
              title: room_name,
              editLink: `${path}/compose/${officeId}/room/${room_idx}`,
              detailLink: `${path}/${officeId}/room/${room_idx}`,
              cardDetails: [
                {
                  category: "사용금액",
                  content: fee_per_hour + "/시간",
                },
                {
                  category: "가용좌석",
                  content: seat_count,
                },
              ],
            };

            return (
              <Box key={idx}>
                <div className={classes.roomLine}>
                  <ListCard {...cardProps} />
                </div>
                <Divider />
              </Box>
            );
          })}
        </Box>
      </OfficeListAccordion>
    </div>
  );
}
