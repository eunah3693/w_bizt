import React, { useState, useEffect } from "react";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

import { Box, Divider, Button } from "@material-ui/core";
import { requestBiztApi } from "utility/connectivity";
import AddCard from "./AddCard";
import Charge from "./Charge";

/**
 * TDL
 * Delete Button 을 누를 시 delete API 호출
 * Add Card 누를 시 POST API 호출 - 아임포트 요구 페러미터 전달
 * @param {*} props
 * @returns
 */

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
  },
  btn: {
    color: theme.palette.primary.sub,
    backgroundColor: "transparent",
    borderRadius: "5px",
    border: `none`,
  },
  btnFlex: {
    flex: "1 1 auto",
  },
  spaceAround: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function RegistoredPaymentMethod(props) {
  const classes = useStyles();

  return (
    <Box>
      <div className=" SpaceBetween" style={{ padding: "20px 0px" }}>
        <div>
          <b>{props.bank}</b>
          <br /> <span>{props.cardNumber}</span>
        </div>
        <button
          className={classes.btn}
          onClick={() => props.onRemove?.(props.payment_idx)}
        >
          삭제
        </button>
      </div>
      <Divider />
    </Box>
  );
}

export default function Payment() {
  const theme = useTheme();
  const classes = useStyles();

  const { path } = useRouteMatch();

  const [paymentMethodList, setPaymentMethodList] = useState(null);
  useEffect(() => {
    requestBiztApi("/api/payment-method", null, setPaymentMethodList);
  }, []);

  const onRemove = (idx) => {
    if (!idx) {
      console.error("invalid payment idx");
      return;
    }

    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setPaymentMethodList(
      paymentMethodList.filter((method) => method.payment_idx !== idx)
    );
  };

  return (
    <Switch>
      <Route path={path + "/register"} component={AddCard} />
      <Route path={path + "/charge"} component={Charge} />
      <Route path={path}>
        <Box className="root">
          <Box className="body">
            <Box className=" SpaceBetween" style={{ padding: " 20px 0" }}>
              <Box>
                <Button
                  style={{
                    margin: "10px 5px 10px  0",
                    padding: "5px 10px",
                    border: `1px solid ${theme.palette.primary.sub}`,
                    color: ` ${theme.palette.primary.sub}`,
                    borderRadius: "5px",
                  }}
                  component={Link}
                  to={`${path}/charge/regular`}
                >
                  충전
                </Button>
                <Button
                  style={{
                    margin: "10px 0",
                    padding: "5px 10px",
                    border: `1px solid ${theme.palette.primary.sub}`,
                    color: ` ${theme.palette.primary.sub}`,
                    borderRadius: "5px",
                  }}
                  component={Link}
                  to={`${path}/charge`}
                >
                  자동 충전
                </Button>
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
            {paymentMethodList?.map((method, idx) => (
              <RegistoredPaymentMethod
                key={idx}
                onRemove={onRemove}
                {...method}
              />
            ))}
          </Box>

          <Box className={`${classes.foot} `}>
            <Button
              className="wideBtnWrapper"
              component={Link}
              to={path + "/register"}
            >
              <span className="wideBtn">충전수단 추가</span>
            </Button>
          </Box>
        </Box>
      </Route>
    </Switch>
  );
}
