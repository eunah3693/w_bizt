import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MyReservationCard from "./MyReservationCard";
import AddressCopy from "appComponents/interaction/AddressCopy";

import message from "Img/messageColor.svg";

import { requestBiztApi, onResponseSuccess } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  plusMinusWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& > p": {
      width: "50%",
    },

    "& button": {
      // margin: "0 5px",
      boxShadow: "none",
      borderRadius: "0",
    },
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",

    "& .MuiGrid-container": {
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    "& .MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
  root: {
    "& .MuiGrid-container": {
      flexWrap: "nowrap",
      boxSizing: "border-box",
      flexDiWhitetion: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  detailTitle: {
    color: "black",
    fontWeight: "bold",
  },
  headTitle: {
    fontSize: "18px",
    fontWeight: "bold",

    margin: "20px 0 15px 0 ",
  },
  subDiv: {
    marginBottom: "20px",
  },
  infoDiv: {
    marginBottom: "30px",
  },
  detailDiv: {
    marginBottom: "10px",
  },
  filterWrapper: {
    padding: "20px",
    "& > p": {
      fontWeight: " bold",
    },
  },
  next: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "white",
    borderRadius: "1px",
    width: "100%",
  },
  spotIcon: {
    width: "15px",
    marginRight: "5px",
  },
  moreButton: {
    color: "darkgray",
    border: "none",
    // backgroundColor: "transparent",
    textAlign: "center",
  },
}));

export default function Myreservation(props) {
  const classes = useStyles();
  const history = useHistory();
  const pathArr = history.location.pathname.split("/");
  const reserv_idx = pathArr[pathArr.length - 1];

  const [reserv, setReserv] = useState();

  useEffect(() => {
    requestBiztApi(
      "/api/reservation/" + reserv_idx,
      null,
      onResponseSuccess(([data]) => {
        setReserv(data);
      })
    );
  }, []);

  console.log(reserv);

  return (
    <Box>
      <MyReservationCard reserv={reserv} />
      <Divider />
      <Box className="Padding20px">
        <Box
          className="FlexStart"
          onClick={() => {
            requestBiztApi("/api/message/room", { method: "POST" }, () => {});
          }}
        >
          <img className={classes.spotIcon} src={message} alt="" />
          <p className="Padding10px"> ??????????????? ????????? ?????????</p>
        </Box>
      </Box>
      <Box className="BoxGap" style={{ height: "5px" }} />

      <Box className="Padding20px">
        <Box style={{ marginBottom: "10px" }}>
          <p className="bold">????????????</p>
          <p className=""> HM2RJHF78</p>
        </Box>
        <Divider></Divider>
        <Box style={{ margin: "10px 0" }}>
          <p className="bold">?????????</p>
          <p className="">45,000???</p>
        </Box>
        <Divider></Divider>
        <Box style={{ marginTop: "10px" }}>
          <p className="bold">?????? ??????</p>
          <p style={{ color: "blue", cursor: "pointer" }} className="">
            ????????? ????????????
          </p>
        </Box>
      </Box>
      <Box className="BoxGap" style={{ height: "5px" }} />

      {/* <Box className="Padding20px">
        <p className="SubtitleLeft">?????? ?????? ??????</p>
        <p className="">????????? ????????? ????????? 889-23 204???</p>
        <Divider style={{ marginTop: "10px" }}></Divider>
        <Box className="FlexStart">
          <img className={classes.spotIcon} src={copy} alt="" />
          <p className="Padding10px">?????? ????????????</p>
        </Box>
      </Box> */}
      <AddressCopy></AddressCopy>
      <Box className="BoxGap" style={{ height: "5px" }} />

      <Box className="Padding20px" style={{ marginBottom: "20px" }}>
        <p style={{ margin: "10px 0 20px" }} className="SubtitleLeft">
          ?????? ??????
        </p>
        <div className="SpaceBetween">
          <p className="" style={{ width: "85%" }}>
            ????????????????????????????????????????????????????????????
          </p>
          <div style={{ width: "15%" }}>
            {/* <button className={`${classes.moreButton}`}>?????????</button> */}
          </div>
        </div>
      </Box>
      <Box className="BoxGap" style={{ height: "5px" }} />
    </Box>
  );
}
