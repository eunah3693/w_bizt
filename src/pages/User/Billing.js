import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

import InfoCard from "appComponents/layout/InfoCard";
import CustomizedCheckbox from "appComponents/interaction/CircleCheckbox";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 150,
  },
  roots: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },

  subTitle: {
    fontSize: "13px",
    color: "darkgray",
    marginRight: "8px",
  },
  infoDIvWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
  },

  rating: {
    display: "flex",
    flexWrap: "wrap",
  },
  info: {
    width: "50%",
  },
  rateStar: {
    textAlign: "right",
    boxSizing: "border-box",
  },
  detailDivWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  detailContents: {
    width: "70%",
  },
  primary: {
    padding: "0 5px",
    borderRadius: " 100px",
    marginRight: " 5px",
  },
  wrapper: {
    "& .MuiGridListTile": {
      height: "auto",
      maxWidth: "100%",
      background: "red",
    },
    "& .MuiGridList-root": {
      display: "flex",
      padding: 0,
      flexWrap: "wrap",
      listStyle: "none",
      overflow: "auto",
      flexDirection: "column",
      margin: 0,
    },
    "& .alice-carousel__stage-item img": {
      height: "auto",
      width: "100%",
      maxWidth: "100%",
    },
    "& .MuiRating-sizeSmall": {
      fontSize: "3.125rem",
    },
    "& .MuiRating-root": {
      width: "100%",
      justifyContent: "center",
    },
  },
  headTitle: {
    fontSize: "20px",
    margin: "0px 0 10px 0 ",
  },
  infoDiv: {
    marginBottom: "30px",
  },
  detailDiv: {
    marginBottom: "5px",
  },
  detailTitle: {
    color: "darkgray",
    width: "30%",
  },
}));

export default function CheckOut(props) {
  const classes = useStyles();
  return (
    <Box className="Padding20px">
      <div>
        <p className=" SubtitleLeft " style={{ marginTop: 0 }}>
          ????????????
        </p>

        <InfoCard
          classes={classes}
          headTitle="????????? ????????? 101"
          detailController={true}
          detailTitle1="????????????"
          detailTitle2="?????????"
          detailTitle3="????????????"
          detailTitle4="????????????"
          fee="15000???"
          hours="09:00 ~ 17:00 / 3??????"
          rooms="??????1?????? / ?????? 2??????"
          date="21.05.04 (???)"
          feeController={true}
        />
      </div>
      <Divider style={{ margin: "20px 0" }}></Divider>
      <div>
        <p className=" SubtitleLeft">????????? ?????????</p>
        <div
          className="FlexCenter"
          style={{ border: " 0.5px solid rgb(209, 209, 209)" }}
        >
          <input
            className="inputTag"
            placeholder="????????? ?????? ??? ?????????"
            style={{ width: "70%", border: " none" }}
          ></input>
          <button
            className="ButtonOrange"
            style={{ width: "30%", border: " none" }}
          >
            ????????????
          </button>
        </div>
        <div className="SpaceBetween" style={{ marginTop: "10px" }}>
          <p>?????? ????????? 100,000p</p>
          <CustomizedCheckbox
            label="?????? ?????? ??????"
            CheckboxController={true}
          />
        </div>
        <div>
          <CustomizedCheckbox label="????????????" CheckboxController={true} />
        </div>
      </div>
      <div>
        <div className="SpaceBetween">
          <p className=" SubtitleLeft">????????????</p>
          <button className="ButtonWhite" style={{ padding: "5px 10px" }}>
            ??????????????????
          </button>
        </div>
        <CustomizedCheckbox
          label="???????????? **** **** **** *23*"
          CheckboxController={true}
        />
        <CustomizedCheckbox
          label="???????????? **** **** **** *86*"
          CheckboxController={true}
        />
      </div>
      <Divider style={{ margin: "20px 0" }}></Divider>
      <div className="SpaceBetween" style={{ margin: "5px 0" }}>
        <p>????????????</p>
        <p>45000???</p>
      </div>
      <div className="SpaceBetween" style={{ margin: "5px 0" }}>
        <p>???????????????</p>
        <p>20000???</p>
      </div>
      <div className="SpaceBetween" style={{ margin: "5px 0" }}>
        <p>????????????</p>
        <p>25000???</p>
      </div>
      <Divider style={{ margin: "20px 0" }}></Divider>
      <div>
        <CustomizedCheckbox label="??????????????????" CheckboxController={true} />
        <CustomizedCheckbox
          label="??? ?????? ?????? ?????? ??? ?????? ?????? ??????"
          CheckboxController={true}
        />
        <CustomizedCheckbox
          label="??? 3??? ?????? ?????? ?????? ??????"
          CheckboxController={true}
        />
      </div>

      <Box className="FlexCenter">
        <button className="ButtonConfirm">????????????</button>
      </Box>
    </Box>
  );
}
