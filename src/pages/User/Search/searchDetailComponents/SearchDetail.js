import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchDetailCard from "pages/User/Search/searchDetailComponents/SearchDetailCard";
import { testing } from "App";
import {
  constructUrl,
  onResponseSuccess,
  requestBiztApi,
} from "utility/connectivity";
import SearchDetailAccordion from "./SearchDetailAccordion";
import ReservationInterface from "./ReservationInterface";
import RoomSelector from "./RoomSelector";

const useStyles = makeStyles((theme) => ({
  checkoutWrapper: {
    fontSize: "13px",
  },
}));

export default function SearchDetail(props) {
  const classes = useStyles();
  const history = useHistory();

  const path = history.location.pathname.split("/");
  let office_idx = path[2];
  let init_room_idx = path[3];
  if (!init_room_idx) init_room_idx = -1;

  const [office, setOffice] = useState(props.office);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomArrIdx, setSelectedRoomArrIdx] = useState(init_room_idx);

  const precautions = office?.precautions;
  const information = office?.information;

  useEffect(() => {
    requestBiztApi(
      "/api/office/" + office_idx,
      null,
      onResponseSuccess(([data]) => {
        setOffice(data);
      })
    );
    requestBiztApi(
      constructUrl("/api/room", { office: office_idx }),
      null,
      onResponseSuccess(setRooms)
    );
  }, []);

  return (
    <Box className={classes.checkoutWrapper}>
      {/* 오피스 전체 정보 */}
      <SearchDetailCard office={office} rooms={rooms} />
      <Box className="BoxGap" style={{ height: "5px" }} />

      <Box className="SpaceBetween">
        <SearchDetailAccordion title="주의사항">
          {precautions}
        </SearchDetailAccordion>
      </Box>
      <Divider />
      <Box className="SpaceBetween">
        <SearchDetailAccordion title="이용안내">
          {information}
        </SearchDetailAccordion>
      </Box>
      <Box className="BoxGap" style={{ height: "5px" }} />

      {/* 호실 정보 */}
      <Box
        className="BoxLightBackground"
        style={{ padding: "25px 20px" }}
        id="room-selector"
      >
        <RoomSelector
          rooms={rooms}
          value={selectedRoomArrIdx}
          onChange={(e) => setSelectedRoomArrIdx(e.target.value)}
        />
      </Box>

      {selectedRoomArrIdx !== -1 && (
        <ReservationInterface
          key={selectedRoomArrIdx}
          room={rooms[selectedRoomArrIdx]}
        />
      )}
    </Box>
  );
}
