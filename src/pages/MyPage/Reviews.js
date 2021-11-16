import React, { useState, useEffect } from "react";
import { Box, Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import RatingReview from "appComponents/layout/RatingReview";
import Select100 from "appComponents/interaction/Select100";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
// 파트너 이미지
import officeImg from "Img/office.png";

const styles = makeStyles((theme) => ({
  Dashboard: {
    paddingBottom: "30px",
  },
  fre_wrap: {
    height: "130px",
    backgroundColor: theme.palette.primary.gray,
    paddingTop: "30px",
    marginBottom: "10px",
  },
  fre_title: {
    fontSize: "15px",
    paddingLeft: "26px",
    paddingBottom: "20px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-1px",
  },
  fre_select: {
    width: "90%",
    margin: "0 auto",
  },
  re_line: {
    padding: "16px 20px 26px 16px",
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  UnderlineBox: {
    "&:last-child": {
      "& .MuiDivider-root": {
        backgroundColor: theme.typography.light,
      },
    },
  },
}));

function ReviewTotal() {
  const classes = styles();
  const [reviews, setreviews] = useState(null);
  const [office, setoffice] = useState(null);
  useEffect(() => {
    requestBiztApi("/api/reviews", null, setreviews);
    requestBiztApi("/api/office", null, onResponseSuccess(setoffice));
  }, []);

  // date 수정
  function makeDate(date) {
    var dateObj = new Date(date);
    return (
      dateObj.toLocaleDateString("en", { year: "numeric" }) +
      "-" +
      dateObj.toLocaleDateString("en", { month: "2-digit" }) +
      "-" +
      dateObj.toLocaleDateString("en", { day: "2-digit" })
    );
  }
  // 아이디 마스킹처리
  const maskingName = function (strName) {
    if (strName) {
      strName = strName.toString();
      if (strName.length > 2) {
        var originName = strName.split("");
        originName.forEach(function (name, i) {
          if (i < 3 || i > originName.length - 1) return;
          originName[i] = "*";
        });
        var joinName = originName.join();
        return joinName.replace(/,/g, "");
      } else {
        var pattern = /.$/; // 정규식
        return strName.replace(pattern, "*");
      }
    }
  };
  return (
    <Box className={classes.Dashboard}>
      {/*최근 이용리뷰*/}
      <Box className={classes.fre_wrap}>
        <h2 className={classes.fre_title}>이용리뷰</h2>
        <Box className={classes.fre_select}>
          {office && (
            <Select100
              options={[
                { label: "전체", value: -1 },
                ...office.map((officeData) => ({
                  label: officeData.office_name,
                  value: officeData.office_idx,
                })),
              ]}
              placeholder="등록 오피스 선택"
            />
          )}
        </Box>
      </Box>
      {/*최근 이용리뷰*/}
      {/*리뷰리스트*/}
      {reviews &&
        reviews.map((data) => {
          let cardProps = {
            value: data.rateing,
            img: officeImg,
            date: makeDate(data.date),
            list_txt: data.desc,
            id: maskingName(data.reviewId),
            readOnly: true,
            reply: true,
            replyValue: data.rateing,
            list_reply: "사용자 리뷰",
          };
          return (
            <div className={classes.UnderlineBox}>
              <Box
                className={classes.re_line}
                display="flex"
                alignContent="center"
              >
                <RatingReview {...cardProps}></RatingReview>
              </Box>
              <Divider className={classes.Divider}></Divider>
            </div>
          );
        })}
    </Box>
  );
}

export default ReviewTotal;
