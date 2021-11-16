import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, TextField, Button } from "@material-ui/core";
import { backendUrl, requestBiztApi } from "utility/connectivity";
import scanner from "Img/scanner.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& .MuiFormLabel-root": {
      width: "130px"
    }
  },
  flexComp: {
    marginRight: "20px",
  },
  confirm: {
    borderRadius: "1px",
    color: "white",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  gray: {
    color: "gray",
    padding: "5px 0",
  },
  fontGradient: {
    color: `${theme.palette.primary.sub}`,
  },
}));

export default function AddCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");

  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [birthError, setBirthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCardNumberError(!cardNumber);
    setExpiryError(!expiry);
    setBirthError(!birth);
    setPasswordError(!password);

    requestBiztApi(
      backendUrl + "/api/payment-method",
      {
        method: "POST",
        body: JSON.stringify({
          card_number: cardNumber,
          expiry: expiry,
          birth: birth,
          pwd_2digit: password,
        }),
      },
      (data) => {
        console.log(data);
      }
    );
  };

  const classes = useStyles();
  return (
    <Box className={classes.wrapper} style={{ height: "100%" }}>
      <form
        style={{ height: "100%" }}
        noValidate
        autoComplete="off"
        method="post"
        onSubmit={handleSubmit}
      >
        <Box className="root">
          <Box className="body">
            <Box className="SpaceBetween" style={{ margin: " 30px 0px" }}>
              <p>카드 정보 입력 (최초1회만)</p>
            </Box>
            <Box className="SpaceBetween">
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                style={{ width: "100%" }}
                id="outlined-number"
                label="카드 별칭"
                type="srting"
                required
                error={cardNumberError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className="SpaceBetween" style={{ marginTop: "20px" }}>
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                className={classes.flexComp}
                id="outlined-number"
                label="카드 번호"
                type="number"
                required
                error={cardNumberError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                className={classes.flexComp}
                id="outlined-number"
                label=" "
                type="number"
                error={cardNumberError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                className={classes.flexComp}
                id="outlined-number"
                label=" "
                type="number"
                error={cardNumberError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                id="outlined-number"
                label=" "
                error={cardNumberError}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <p className={classes.gray}>본인 명의의 카드만 사용 가능합니다. </p>
            <Box className="SpaceBetween" style={{ marginTop: "20px" }}>
              <TextField
                className={classes.flexComp}
                onChange={(e) => setBirth(e.target.value)}
                label="생년월일"
                type="number"
                required
                id="birth"
                error={birthError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className={classes.flexComp}
                onChange={(e) => setBirth(e.target.value)}
                type="number"
                id="birth"
                label=" "
                error={birthError}
              />
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                type="number"
                id="birth"
                label=" "
                error={birthError}
              />
            </Box>
            <Box className="SpaceBetween" style={{ marginTop: "20px" }}>
              <TextField
                className={classes.flexComp}
                onChange={(e) => setBirth(e.target.value)}
                label="만료기간"
                type="number"
                required
                id="expiry"
                error={expiryError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className={classes.flexComp}
                onChange={(e) => setBirth(e.target.value)}
                label=" "
                type="number"
                id="expiry"
                error={expiryError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={(e) => setBirth(e.target.value)}
                label="비밀번호 앞2자리"
                type="number"
                id="pwd_2digit"
                error={passwordError}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
          <Box className="foot">
            <Link to="/mypage/payment">
              <Button type="submit" className="wideBtnWrapper">
                <span className="wideBtn">결제수단 추가</span>
              </Button>
            </Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
