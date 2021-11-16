import React, { useState, useEffect, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import {
  constructUrl,
  fileApi,
  onResponseSuccess,
  requestBiztApi,
} from "utility/connectivity";

import SelectBox from "appComponents/interaction/SelectBox";
import { useHistory, useRouteMatch } from "react-router";

const useStyles = makeStyles((theme) => ({
  selectBoxWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  card_wrap: {
    width: "100%",
    padding: "10px",
    display: "flex",
  },
  list_left: {
    width: "120px",
    height: "120px",
  },
  list_left_img: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
  },
  list_right: {
    width: "calc( 100% - 120px )",
    paddingLeft: "10px",
  },
  subDiv: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  comment: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  rateStar: {
    alignItems: "flex-end",
    boxSizing: "border-box",
    width: "33 %",
  },
  date: {
    fontSize: "15px",
    color: "gray",
    textAlign: "right",
  },
}));

/**
 * 필요한 정보: review 사진, 평점, 날짜, 코멘트
 * @param {*} props
 * @returns
 */
export default function Review(props) {
  const classes = useStyles();

  const [reviews, setReviews] = useState(null);
  const routePath = useRouteMatch().path;
  const history = useHistory();

  useEffect(() => {
    let pathIdx = routePath.split("/").length - 2;
    let office_idx = history.location?.pathname.split("/")[pathIdx];
    let url = "/api/review";
    if (!isNaN(parseInt(office_idx))) {
      url = constructUrl("/api/review", {
        office_idx: office_idx,
      });
    }
    requestBiztApi(url, null, onResponseSuccess(setReviews));
  }, []);

  const selectSort = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption === "최신순") {
    } else if (selectedOption === "인기순") {
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Box>
        <Box className={classes.selectBoxWrapper}>
          <SelectBox
            options={["전체호실", "개인실1", "개인실2", "개인실3"]}
            callback={(selectedOption) => {
              selectSort(selectedOption);
            }}
          />
          <SelectBox
            options={["최신순", "인기순"]}
            callback={(selectedOption) => {
              selectSort(selectedOption);
            }}
          />
        </Box>

        {/* 생성하기 */}
        {reviews ? (
          reviews.map((review, idx) => {
            return (
              <Fragment key={idx}>
                <Box className={classes.card_wrap}>
                  <Box p={1} className={classes.list_left}>
                    <img
                      alt="review"
                      src={fileApi + review.review_image?.[0]}
                      className={classes.list_left_img}
                    />
                  </Box>
                  <Box p={1} className={classes.list_right}>
                    <Box mb={1} className={classes.subDiv}>
                      <Rating
                        readOnly
                        className={classes.rateStar}
                        size="small"
                        value={review.rating}
                      />
                      <p className={`${classes.subTitle} ${classes.date}`}>
                        {review.created_datetime}
                      </p>
                    </Box>
                    <Box className={classes.comment}>{review.contents}</Box>
                  </Box>
                </Box>
                <Divider />
              </Fragment>
            );
          })
        ) : (
          <Box m={1}>리뷰가 없습니다 :(</Box>
        )}
      </Box>
    </Box>
  );
}
