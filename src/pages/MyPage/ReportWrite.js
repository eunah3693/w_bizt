import React, { useState } from "react";
import { Box, Button, Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import "react-alice-carousel/lib/alice-carousel.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Dialog from "appComponents/layout/Dialog";
import Select100 from "appComponents/interaction/Select100";
import ImgUpload from "appComponents/interaction/ImgUpload";

const useStyles = makeStyles((theme) => ({
  starTitle: {
    textAlign: "center",
    fontSize: "17px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  fileUpload: {
    "& .MuiButton-root": {
      minWidth: "100px",
      minHeight: "100px",
      borderRadius: "2px",
      boxShadow: "none",
    },
  },
  next: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "1px",
    width: "100%",
  },
  rateStar: {
    textAlign: "right",
    boxSizing: "border-box",
  },
  wrapper: {
    "& .MuiGridListTile": {
      height: "auto",
      maxWidth: "100%",
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
    fre_wrap: {
      backgroundColor: theme.palette.primary.gray,
      padding: "30px 0",
      display: "block",
      textDecoration: "none",
      color: theme.typography.color,
    },
    fre_title: {
      paddingLeft: "26px",
      paddingBottom: "20px",
      fontWeight: "600",
      letterSpacing: "-1px",
    },
    fre_select: {
      width: "90%",
      margin: "0 auto",
    },
    fre_select_box: {
      marginBottom: "10px",
    },
  },
}));

export default function ReviewWrite(props) {
  const classes = useStyles();
  const [reviewImgs, setReviewImgs] = useState([]);
  let reviewImgFiles = [];

  return (
    <Box className="root" style={{ minHeight: "100%" }}>
      <Box className="body">
        <Box style={{ padding: "20px" }}>
          <p className={classes.starTitle} style={{ padding: "30px 0 " }}>
            {" "}
            입실예정이거나 이용중인 오피스에 대하여 <br /> 신고할 수 있습니다.
          </p>
        </Box>
        <Box className={classes.fre_wrap}>
          <Box className={classes.fre_select}>
            <Select100
              options={[
                { value: "K128470j", label: "K128470j" },
                { value: "H182847K", label: "H182847K" },
                { value: "IK12378Y", label: "IK12378Y" },
              ]}
              placeholder="예약번호"
            ></Select100>
            <Box style={{ padding: "5px" }}></Box>
            <Select100
              options={[
                { value: "정리 미흡", label: "정리 미흡" },
                { value: "소란스러움", label: "소란스러움" },
                { value: "어쩌고저쩌고", label: "어쩌고저쩌고" },
              ]}
              placeholder="신고사유"
            ></Select100>
          </Box>
        </Box>
        <Box className={classes.fileUpload} style={{ padding: "20px 0" }}>
          <ImgUpload
            imgs={reviewImgs}
            setImgs={setReviewImgs}
            fileContainer={reviewImgFiles}
          />

          <Divider style={{ marginTop: "20px" }}></Divider>
        </Box>

        <Box style={{ padding: "20px 0" }}>
          <TextareaAutosize
            className={classes.textarea}
            aria-label="minimum height"
            rowsMin={3}
            placeholder="최소 15자 이상 작성해 주세요"
            style={{
              width: "100%",
              height: "70px",
              border: "none",
              resize: "none",
              marginBottom: "20px",
            }}
          />
        </Box>
      </Box>
      <Box className="foot">
        <Dialog
          disableScrollLock
          buttonName="+ 신고하기"
          modalTitle="자리 신고하기"
          modalContents={`신고 내용이 파트너에게 전달되었습니다. 파트너를 대신하여 다음이용자를 위해 자리를 정리하여 주시면 위반자의 보증금이 증정됩니다.`}
          CancleBtnController={true}
          next="확인"
          nextClick={"/mypage/report"}
        ></Dialog>
      </Box>
    </Box>
  );
}
