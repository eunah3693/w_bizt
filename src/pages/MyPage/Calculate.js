import { useState } from "react";
import clsx from "clsx";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { requestBiztApi } from "utility/connectivity";
import Select100 from "appComponents/interaction/Select100";
import Tax from "pages/MyPage/Tax";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
  },
  fre_wrap: {
    width: "100%",
  },
  fre_select: {
    width: "300px",
    margin: "0 auto",
  },
  error: {
    color: "#f44336",
    fontSize: "0.75rem",
  },
  Wrapper: {
    width: "300px",
    padding: "6px 0",
    "& .MuiFormLabel-root": {
      fontSize: "14px",
    },
    "& .MuiCheckbox-root": {
      padding: "6px",
    },
    "& .MuiFormControlLabel-label": {
      letterSpacing: "-1px",
    },
    "& .MuiFormControlLabel-root": {
      paddingLeft: "15px",
    },
    "& .MuiFormGroup-root": {
      paddingTop: "0px",
    },
  },

  input: {
    width: "100%",
  },
  Divider: {
    width: "100%",
    // margin:"3px 0"
  },
  Btn: {
    width: "100%",
    border: "0px solid #e7e7e7",
    padding: "7px ",
    marginTop: "15px",
    marginBottom: "5px",
    color: theme.typography.light,
    borderRadius: "0px",
    cursor: "pointer",
    background: theme.palette.primary.navy,
    "&:hover": {
      background: theme.palette.primary.navy,
      color: theme.typography.light,
    },
  },
  back: {
    marginLeft: "30px",
  },
  txt: {
    margin: "0 auto",
    width: "300px",
    textAlign: "right",
    fontSize: "13px",
  },
  taxWrapper: {
    margin: "0 auto",
    width: "300px",
    "& a": {
      marginTop: "0",
    },
  },
}));
const banks = [
  { value: "SC제일은행", label: "SC제일은행" },
  { value: "부산은행", label: "부산은행" },
  { value: "새마을금고", label: "새마을금고" },
  { value: "한국씨티은행", label: "한국씨티은행" },
  { value: "광주은행", label: "광주은행" },
  { value: "경남은행", label: "경남은행" },
  { value: "수협", label: "수협" },
  { value: "신협", label: "신협" },
  { value: "전북은행", label: "전북은행" },
  { value: "제주은행", label: "제주은행" },
  { value: "산림조합", label: "산림조합" },
  { value: "우체국", label: "우체국" },
  { value: "기업은행", label: "기업은행" },
  { value: "국민은행", label: "국민은행" },
  { value: "농협중앙회", label: "농협중앙회" },
  { value: "단위농협", label: "단위농협" },
  { value: "우리은행", label: "우리은행" },
  { value: "대구은행", label: "대구은행" },
  { value: "외환은행", label: "외환은행" },
  { value: "신한은행", label: "신한은행" },
  { value: "동양종금증권", label: "동양종금증권" },
  { value: "한국투자증권", label: "한국투자증권" },
  { value: "삼성증권", label: "삼성증권" },
  { value: "미래에셋", label: "미래에셋" },
  { value: "우리투자증권", label: "우리투자증권" },
  { value: "현대증권", label: "현대증권" },
  { value: "SK증권", label: "SK증권" },
  { value: "신한금융투자", label: "신한금융투자" },
  { value: "하이증권", label: "하이증권" },
  { value: "HMC증권", label: "HMC증권" },
  { value: "대신증권", label: "대신증권" },
  { value: "하나대투증권", label: "하나대투증권" },
  { value: "동부증권", label: "동부증권" },
  { value: "유진증권", label: "유진증권" },
  { value: "메리츠증권", label: "메리츠증권" },
  { value: "신영증권", label: "신영증권" },
  { value: "대우증권", label: "대우증권" },
];
export default function Calculate() {
  const classes = useStyles();
  const { path } = useRouteMatch();

  const [userInfo, setUserInfo] = useState({
    name: "",
    bank: "",
    account: "",
  });

  const errorText = {
    name: "예금주를 입력해주세요",
    bank: "입금은행을 선택해주세요",
    account: "입금계좌를 다시확인해주세요",
  };
  // keys: email password confirm name mobile agreement
  const [errors, setErrors] = useState({
    name: false,
    bank: false,
    account: false,
  });

  function editUserInfo(obj) {
    setUserInfo({ ...userInfo, ...obj });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRegex = /^[가-힣a-zA-Z]+$/; //한글영어만
    const accountRegex = /[0-9,\-]{3,6}\-[0-9,\-]{2,6}\-[0-9,\-]/; //계좌번호

    let newErrors = {
      name: !nameRegex.test(userInfo.name),
      bank: !userInfo.bank,
      account: !accountRegex.test(userInfo.account),
    };

    // newErrors에 에러 flag가 하나라도 올라가 있으면 setError 후 return
    for (let value in Object.values(newErrors)) {
      if (value) {
        setErrors(newErrors);
        return;
      }
    }

    let body = new FormData();
    Object.entries(userInfo).forEach(([key, value]) => {
      body.append(key, value);
    });

    requestBiztApi(
      "/api/account",
      {
        method: "POST",
        body: body,
      },
      (data) => {
        console.log(data);
      }
    );
  };
  function fre_handleChange(selectedOption) {
    // console.log(selectedOption.value);
    editUserInfo({ bank: selectedOption.value });
  }
  const inputProp = {
    display: "flex",
    justifyContent: "center",
    className: classes.Wrapper,
  };
  return (
    <Switch>
      <Route path={path + "/tax"} component={Tax} />
      <Route path={path}>
        <div className={classes.paper}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            method="post"
            onSubmit={handleSubmit}
          >
            <Box className={classes.fre_wrap}>
              <Box className={classes.fre_select}>
                <Select100
                  options={banks?.map((name) => ({
                    label: name.label,
                    value: name.value,
                  }))}
                  onChange={fre_handleChange}
                  placeholder="입금은행 선택"
                />
                {errors.bank && (
                  <span className={classes.error}>
                    {errors.bank && errorText.bank}
                  </span>
                )}
              </Box>
            </Box>
            <Box {...inputProp}>
              <TextField
                className={classes.input}
                onChange={(e) => {
                  editUserInfo({ name: e.target.value });
                }}
                id="register-name"
                label="예금주"
                required
                error={errors.name}
                helperText={errors.name && errorText.name}
              />
            </Box>

            <Box {...inputProp}>
              <TextField
                className={classes.input}
                onChange={(e) => {
                  editUserInfo({ account: e.target.value });
                }}
                id="register-account"
                label="입금계좌번호"
                required
                error={errors.account}
                helperText={errors.account && errorText.account}
              />
            </Box>
            <Box className={classes.txt}>매달 10일에 입금됩니다</Box>
            <Box
              display="flex"
              justifyContent="center"
              className={classes.Wrapper}
            >
              <Button type={"submit"} className={classes.Btn}>
                저장하기
              </Button>
            </Box>
          </form>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.taxWrapper}
          >
            <Button className={classes.Btn} component={Link} to={`${path}/tax`}>
              세금계산서 정보등록
            </Button>
          </Box>
        </div>
      </Route>
    </Switch>
  );
}
