import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "20px",
    backgroundColor: theme.palette.primary.gray,
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "26px",
    color: theme.typography.color,
    position: "relative",
    "& h2": {
      paddingBottom: "10px",
      fontSize: "15px",
    },
    "& p": {
      lineHeight: "180%",
      fontSize: "13px",
    },
  },
  footer_btn: {
    margin: "10px 5px 10px 0",
  },
}));

export default function InfoFooter() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <h2>(주)지유월드와이드</h2>
      <p>대표이사 : 김택수</p>
      <p>사업자등록번호 : [338-88-00714]</p>
      <p>통신판매업신고번호 : 2019-서울송파-2905</p>
      <p>개인정보관리책임자 : 김범수</p>
      <p>고객센터 : [070-5165-1231] / 평일 10:00~17:00 (점심 12:00~13:00)</p>

      <p>주소 : 서울시 송파구 방이동 196-19 DAWON빌딩 5층</p>
      <Box>
        <Button
          variant="outlined"
          className={classes.footer_btn}
          component={Link}
          to="?policy=guide"
        >
          이용안내
        </Button>
        <Button
          variant="outlined"
          className={classes.footer_btn}
          component={Link}
          to="?policy=terms"
        >
          이용약관
        </Button>
        <Button
          variant="outlined"
          className={classes.footer_btn}
          component={Link}
          to="?policy=privacy"
        >
          개인정보처리방침
        </Button>
      </Box>
      <p>Copyright 2020. 지유월드와이드 inc. all rights reserved.</p>
    </Box>
  );
}
