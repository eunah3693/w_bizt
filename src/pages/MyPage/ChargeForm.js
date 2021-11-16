import { useEffect, useState } from "react";
import clsx from "clsx";

import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { BottomSheet } from "react-spring-bottom-sheet";
import AddCard from "./AddCard";
import { ThemeProvider, useTheme } from "@material-ui/styles";
import theme from "utility/theme";
import { fontSize, palette } from "@material-ui/system";

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
  spaceAround: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    flex: "1 1 auto",
  },
  radio: {
    flex: "0 0 auto",
  },
  paymentMethod: {
    flex: "1 1 auto",
  },
  bottomSheet: {
    "& [data-rsbs-overlay], [data-rsbs-backdrop], [data-rsbs-root]:after": {
      zIndex: 101,
      bottom: "56px",
    },
  },
  slider: {
    width: "350px",
    "& .MuiSlider-rail": {
      opacity: 0.65,
    },
  },
  fontSize: {
    fontSize: "13px",
    fontWeight: "bold",
  },
  TextField: {
    margin: "10px 0",
    "& > div > input": {
      padding: "10px",
    },
  },
  button: {
    padding: "6px 8px",
    marginRight: "5px",
    marginTop: "15px",

    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: "none",
    borderRadius: "5px",
    border: `1px solid ${theme.palette.primary.d3border}`,
    color: `${theme.typography.color}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.typography.light,
      color: theme.palette.primary.main,
      boxShadow: "none",
    },
  },

  colorchange: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.typography.light,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.typography.light,
      boxShadow: "none",
    },
  },
}));

const marks = [
  {
    value: 0,
    label: "1일",
  },
  {
    value: 10,
    label: "10일",
  },
  {
    value: 20,
    label: "20일",
  },
  {
    value: 30,
    label: "말일",
  },
];

const autoCharge = {
  onDemand: { value: "onDemand", text: "기준 하한 자동 충전" },
  monthly: { value: "monthly", text: "월 정기 자동 충전" },
};

const selectableValues = [10000, 30000, 50000, 70000, 100000];
const demandSelectableValues = [10000, 20000, 30000, 40000, 50000];

const buttonEnum = {
  first: 10000,
  second: 30000,
  third: 50000,
  forth: 70000,
  fifth: 100000,
};

function CustomButton({ value, tag, label, onClick }) {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      className={clsx(
        classes.button,
        value === tag ? classes.colorchange : null
      )}
      onClick={() => onClick(tag)}
    >
      {label}
    </Button>
  );
}

export default function ChargeForm() {
  const classes = useStyles();
  const history = useHistory();
  const pathArr = history.location.pathname.split("/");

  const type = pathArr?.[pathArr.length - 1]; // regular | auto

  // 자동충전 타입
  const [autoType, setAutoType] = useState(autoCharge.onDemand.value);
  const [chargeDay, setChargeDay] = useState(); // 정기 충전 날짜
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [chargeValue, setChargeValue] = useState(); // 충전 금액

  const [minValues, setMinValues] = useState(); // 하한기준금액
  console.log(minValues);

  useEffect(() => { }, [history]);
  const theme = useTheme();

  return (
    <Box className={classes.root}>
      <Box
        className={classes.body}
        style={{ fontSize: "13px", padding: "20px" }}
      >
        {type === "auto" && (
          <>
            <Box>
              <RadioGroup
                row
                className={classes.spaceAround}
                value={autoType}
                onChange={(e) => setAutoType(e.target.value)}
              >
                <FormControlLabel
                  value={autoCharge.onDemand.value}
                  control={<Radio color="primary" size="small" />}
                  label={autoCharge.onDemand.text}
                />
                <FormControlLabel
                  value={autoCharge.monthly.value}
                  control={<Radio color="primary" size="small" />}
                  label={autoCharge.monthly.text}
                />
              </RadioGroup>
              <Box
                style={{
                  backgroundColor: `${theme.palette.primary.gray}`,
                  padding: "20px",
                  margin: "10px 0",
                }}
              >
                자동충전 타입에 대한 설명 자동충전 타입에 대한 설명자동충전
                타입에 대한 설명자동충전 타입에 대한 설명자동충전 타입에 대한
                설명자동충전 타입에 대한 설명자동충전 타입에 대한 설명자동충전
                타입에 대한 설명자동충전 타입에 대한 설명자동충전 타입에 대한
                설명자동충전 타입에 대한 설명자동충전 타입에 대한 설명
              </Box>
            </Box>
            <Divider />

            {autoType === autoCharge.onDemand.value && (
              <Box>
                <Box style={{ margin: "20px 0px" }}>
                  <Typography className={classes.fontSize}>
                    하한 기준 금액
                  </Typography>
                  {/* 라디오 버튼 구조로 바꾸는 것을 고려해야함. */}
                  <Box className="FlexStart">
                    {demandSelectableValues.map((tag, idx) => (
                      <CustomButton
                        value={minValues}
                        key={idx}
                        tag={tag}
                        label={tag / 10000 + "만원"}
                        onClick={setMinValues}
                      />
                    ))}
                  </Box>
                </Box>
                <Divider />
              </Box>
            )}
            {autoType === autoCharge.monthly.value && (
              <Box style={{ margin: "20px 0px" }}>
                <Typography className={classes.fontSize}>
                  자동 충전일
                </Typography>
                <Box className="Padding20px FlexCenter">
                  <Slider
                    className={classes.slider}
                    marks={marks}
                    track={false}
                    onChange={(event, value) => setChargeDay(value)}
                    step={10}
                    defaultValue={10}
                    min={0}
                    max={30}
                  />
                </Box>
                <Divider />
              </Box>
            )}
          </>
        )}
        <Box style={{ margin: "20px 0px" }}>
          <Typography className={classes.fontSize}>충전 금액</Typography>
          <TextField
            className={classes.TextField}
            value={chargeValue ? chargeValue : ""}
            type="number"
            variant="outlined"
            onChange={(e, i) => {
              setChargeValue(e.target.value);
            }}
          />
          <br />
          {selectableValues.map((amount, idx) => (
            <Button
              style={{
                backgroundColor: `${theme.typography.light}`,
                border: `1px solid ${theme.palette.primary.d3border}`,
                color: `${theme.typography.color}`,
                marginRight: "5px",
                marginTop: "15px",
              }}
              key={idx}
              color="primary"
              onClick={() => {
                setChargeValue(amount);
              }}
              value={amount}
            >
              {amount / 10000}만원
            </Button>
          ))}
        </Box>
        <Divider />
        <Box style={{ margin: "20px 0px" }}>
          <Box className="SpaceBetween">
            <Typography className={classes.fontSize}>결제 수단</Typography>

            <Button
              style={{
                color: ` ${theme.palette.primary.sub}`,
                borderRadius: "5px",
                fontSize: "13px",
              }}
              onClick={() => setAddCardOpen(true)}
            >
              추가하기
            </Button>
          </Box>
          {/* 결제수단 목록에서 가져와 렌더해야함 */}
          <Box className="SpaceBetween">
            <Radio className={classes.radio} color="primary" size="small" />
            <Box className={`${classes.paymentMethod} SpaceBetween`}>
              국민 1234-1234-1234-1234
            </Box>
          </Box>
          {/* ... */}
        </Box>
        <Divider />
      </Box>
      <Box className={`${classes.foot} `}>
        <Button className="wideBtnWrapper">
          <span className="wideBtn">충전하기</span>
        </Button>
      </Box>
      <BottomSheet
        open={addCardOpen}
        className={classes.bottomSheet}
        onDismiss={() => setAddCardOpen(false)}
      >
        <AddCard onSuccess={() => { }} />
      </BottomSheet>
    </Box>
  );
}
