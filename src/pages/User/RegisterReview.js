import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider } from "@material-ui/core";

import InfoCard from "appComponents/layout/InfoCard";
import RatingStar from "appComponents/interaction/RatingStar";
import ImgUpload from "appComponents/interaction/ImgUpload";
import TextArea from "appComponents/interaction/TextArea";

import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
import { dateFormat } from "utility/dateHandler";

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
    backgroundColor: `${theme.palette.primary.main}`,
    color: "white",
    borderRadius: "1px",
    width: "100%",
  },
  rateStar: {
    textAlign: "right",
    boxSizing: "border-box",
  },
}));

function RegisterReview(props) {
  const classes = useStyles();
  const history = useHistory();

  const [reservation, reservationlist] = useState();
  const [review, setReview] = useState(null);
  const [star, setStar] = useState();
  const [reviewImgs, setReviewImgs] = useState([]);
  let reviewImgFiles = [];

  let path = history.location.pathname;
  path = path.split("/");
  const reserv_idx = path[path.length - 1];

  useEffect(() => {
    requestBiztApi(
      "/api/reservation/" + reserv_idx,
      null,
      onResponseSuccess((data) => reservationlist(data[0]))
    );
  }, [reserv_idx]);

  function sendReview() {
    let body = new FormData();
    body.append("contents", review);
    body.append("rating", star);
    body.append("review_image", reviewImgFiles);
    requestBiztApi("/api/reviews", { method: "POST", body: body }, (res) => {
      console.log(res);
    });
  }

  const details = [
    {
      category: "이용호실",
      content: `${reservation?.room_name} / ${reservation?.seat_num}`,
    },
    {
      category: "예약시간",
      content: (
        <Box>
          {dateFormat(new Date(reservation?.start_datetime))} ~
          <br />
          {dateFormat(new Date(reservation?.end_datetime))}
        </Box>
      ),
    },
    {
      category: "결제금액",
      content: `${reservation?.price}원`,
    },
  ];

  return (
    <Box className="root body">
      <Box my={2}>
        <InfoCard
          title={reservation?.office_name}
          image={reservation?.office_image?.[0]}
          details={details}
        />
      </Box>
      <Divider style={{ height: "2px" }} />
      <Box className="FlexCenter" my={2}>
        <Box>
          <p className={classes.starTitle}> 비지트 이용은 어떠셨나요?</p>
          <div className="FlexCenter">
            <RatingStar
              onChange={(e) => setStar(e.target.value)}
              size="large"
            />
          </div>
        </Box>
      </Box>
      <Divider style={{ height: "2px" }} />
      <Box my={2}>
        <ImgUpload
          imgs={reviewImgs}
          setImgs={setReviewImgs}
          fileContainer={reviewImgFiles}
        />
      </Box>
      <Divider style={{ height: "2px" }} />
      <Box m={2}>
        <TextArea
          placeholder="사용자 리뷰를 입력해주세요."
          className={classes.Textarea}
          onChange={(e) => setReview(e.target.value)}
          style={{ padding: "0px" }}
        />
      </Box>

      <Box className="foot">
        <Button className="wideBtnWrapper" onClick={sendReview}>
          <span className="wideBtn">등록하기</span>
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterReview;
