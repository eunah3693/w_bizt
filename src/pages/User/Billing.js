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
          결제상품
        </p>

        <InfoCard
          classes={classes}
          headTitle="방이동 오피스 101"
          detailController={true}
          detailTitle1="이용호실"
          detailTitle2="예약일"
          detailTitle3="예약시간"
          detailTitle4="결재금액"
          fee="15000원"
          hours="09:00 ~ 17:00 / 3시간"
          rooms="개인1호실 / 개인 2호실"
          date="21.05.04 (금)"
          feeController={true}
        />
      </div>
      <Divider style={{ margin: "20px 0" }}></Divider>
      <div>
        <p className=" SubtitleLeft">비지트 포인트</p>
        <div
          className="FlexCenter"
          style={{ border: " 0.5px solid rgb(209, 209, 209)" }}
        >
          <input
            className="inputTag"
            placeholder="금액을 입력 해 주세요"
            style={{ width: "70%", border: " none" }}
          ></input>
          <button
            className="ButtonOrange"
            style={{ width: "30%", border: " none" }}
          >
            모두사용
          </button>
        </div>
        <div className="SpaceBetween" style={{ marginTop: "10px" }}>
          <p>보유 포인트 100,000p</p>
          <CustomizedCheckbox
            label="항상 모두 사용"
            CheckboxController={true}
          />
        </div>
        <div>
          <CustomizedCheckbox label="충전결제" CheckboxController={true} />
        </div>
      </div>
      <div>
        <div className="SpaceBetween">
          <p className=" SubtitleLeft">결제수단</p>
          <button className="ButtonWhite" style={{ padding: "5px 10px" }}>
            결제수단추가
          </button>
        </div>
        <CustomizedCheckbox
          label="우리은행 **** **** **** *23*"
          CheckboxController={true}
        />
        <CustomizedCheckbox
          label="하나은행 **** **** **** *86*"
          CheckboxController={true}
        />
      </div>
      <Divider style={{ margin: "20px 0" }}></Divider>
      <div className="SpaceBetween" style={{ margin: "5px 0" }}>
        <p>주문금액</p>
        <p>45000원</p>
      </div>
      <div className="SpaceBetween" style={{ margin: "5px 0" }}>
        <p>포인트사용</p>
        <p>20000원</p>
      </div>
      <div className="SpaceBetween" style={{ margin: "5px 0" }}>
        <p>청구금액</p>
        <p>25000원</p>
      </div>
      <Divider style={{ margin: "20px 0" }}></Divider>
      <div>
        <CustomizedCheckbox label="전체동의하기" CheckboxController={true} />
        <CustomizedCheckbox
          label="위 구매 조건 확인 및 결제 진행 동의"
          CheckboxController={true}
        />
        <CustomizedCheckbox
          label="제 3자 거래 정보 제공 동의"
          CheckboxController={true}
        />
      </div>

      <Box className="FlexCenter">
        <button className="ButtonConfirm">결제하기</button>
      </Box>
    </Box>
  );
}
