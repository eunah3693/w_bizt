import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Divider, Typography } from "@material-ui/core";

import ChargeForm from "./ChargeForm";
import theme from "utility/theme";
import { fontSize } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  body: {
    flex: "1 0 auto",
  },
  foot: {
    flex: "0 0 56px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    flex: "1 1 auto",
  },
}));

export default function Charge() {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Box className="root">
          <Box className="body">
            <Box className=" SpaceBetween" style={{ padding: "20px 0" }}>
              <Box>
                <Box>BIZT POINT</Box>
                <Box style={{ color: `${theme.palette.primary.sub}` }}>
                  자동 충전 중 입니다
                </Box>
              </Box>
              <Box
                style={{
                  color: `${theme.palette.primary.sub}`,
                  fontSize: "18px",
                }}
              >
                [BIZT 포인트 액수]
              </Box>
            </Box>
            <Divider />

            <div style={{ fontSize: "13px", margin: "20px 0px" }}>
              <Box className="MarginHor10px SpaceBetween">
                <Box>충전 방식</Box>
                <Box>기준 미만 자동 충전</Box>
              </Box>
              <Box className="MarginHor20px SpaceBetween">
                <Box>기준 금액</Box>
                <Box>10,000원</Box>
              </Box>
              <Box className="MarginHor20px SpaceBetween">
                <Box>충전 금액</Box>
                <Box>10,000원</Box>
              </Box>
              <Box className="MarginHor20px SpaceBetween">
                <Box>결제 수단</Box>
                <Box className="">
                  <Typography style={{ fontSize: "13px" }} align="right">
                    someBank
                  </Typography>
                  <Typography style={{ fontSize: "13px" }} align="right">
                    1234
                  </Typography>
                </Box>
              </Box>
            </div>
          </Box>
          <Box className={`${classes.foot} `}>
            <Button className="wideBtnWrapper">
              <span className="wideBtn">해지하기</span>
            </Button>
            <Button
              className="wideBtnWrapper"
              component={Link}
              to={`${path}/auto`}
            >
              <span className="wideBtn">변경하기</span>
            </Button>
          </Box>
        </Box>
      </Route>
      <Route path={path} component={ChargeForm} />
    </Switch>
  );
}
