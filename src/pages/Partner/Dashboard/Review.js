import React, { useState, useEffect } from "react";
import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import RatingReview from "appComponents/layout/RatingReview";
import { requestBiztApi } from "utility/connectivity";

// 파트너 이미지
import officeImg from "Img/office.png";

const useStyles = makeStyles((theme) => ({
  Dashboard: {
    padding: "40px 0 20px 0",
  },
  title: {
    padding: "0 0 30px 26px",
    fontSize: "18px",
    letterSpacing: "-1px",
  },
  re_line: {
    padding: "16px 20px",
    textDecoration: "none",
    color: theme.typography.color,
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

function DashboardReview(props) {
  const classes = useStyles();

  const [review, reviewlist] = useState(null);

  useEffect(() => {
    //props에서 office idx를 가져와 처리해여야 함
    requestBiztApi("/api/reviews", null, reviewlist);
  }, []);
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
  function DateForm(date) {
    const regex = /[^0-9]/g;
    return (
      date.split(regex)[0] +
      "-" +
      date.split(regex)[2] +
      "-" +
      date.split(regex)[4]
    );
  }

  return (
    <Box className={classes.Dashboard}>
      <h5 className={classes.title}>오피스별 리뷰현황</h5>
      {/*최근 이용리뷰*/}
      {review &&
        review.map((reviewData, idx) => (
          <div key={idx} className={classes.UnderlineBox}>
            <Box
              className={classes.re_line}
              display="flex"
              alignContent="center"
            >
              <RatingReview
                id={maskingName(reviewData.reviewId)}
                value={reviewData.rateing}
                img={officeImg}
                date={DateForm(
                  new Date(reviewData.date).toLocaleDateString("ko-KR")
                )}
                list_txt={reviewData.desc}
                readOnly={true}
              ></RatingReview>
            </Box>
            <Divider className={classes.Divider}></Divider>
          </div>
        ))}
    </Box>
  );
}

export default DashboardReview;
