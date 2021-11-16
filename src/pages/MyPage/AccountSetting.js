import { useState } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import PasswordSetting from "pages/MyPage/PasswordSetting";

import { requestBiztApi } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    boxShadow: "none",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Wrapper: {
    width: "250px",
    padding: "10px 0",
  },
  input: {
    width: "100%",
  },
  btnWrapper: {
    "& .MuiButton-root:hover": {
      background: theme.palette.primary.navy,
    },
  },
  Btn: {
    width: "100%",
    padding: "7px ",
    marginTop: "5px",
    marginBottom: "0px",
    color: theme.typography.light,
    borderRadius: "10px",
    cursor: "pointer",
    display: "block",
    background: theme.palette.primary.navy,
  },
}));

export default function Register() {
  const { path } = useRouteMatch();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [agreementChecked, setAgreementChecked] = useState();

  /* 푸시, 알림톡, 문자, email 수신동의 */
  const [pushChecked, setPushChecked] = useState();
  const [talkChecked, setTalkChecked] = useState();
  const [smsChecked, setSmsChecked] = useState();
  const [emailChecked, setEmailChecked] = useState();

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [nameError, setNameError] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError(!email);
    setPasswordError(!password);
    setNameError(!name);
    setPhoneNumberError(!phoneNumber);

    let body = new FormData();
    body.append("member_email", email);
    body.append("member_password", password);
    body.append("member_name", name);
    body.append("member_mobile", phoneNumber);

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

  const classes = useStyles();
  return (
    <Switch>
      <Route path={`${path}/password`} component={PasswordSetting} />
      <Route path={path}>
        <Grow in={true}>
          <Paper className={classes.paper}>
            <div className="Padding20px"></div>

            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              method="post"
              onSubmit={handleSubmit}
            >
              <Box
                display="flex"
                justifyContent="center"
                className={classes.Wrapper}
              >
                <TextField
                  className={classes.input}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="user-email"
                  label="이메일"
                  required
                  error={emailError}
                  defaultValue="bellakim78@naver.com"
                />
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                className={classes.Wrapper}
              >
                <TextField
                  className={classes.input}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="user-name"
                  label="이름"
                  required
                  error={nameError}
                  defaultValue="김벨라"
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                className={classes.Wrapper}
              >
                {/* 전화번호 인증 필요 */}
                <TextField
                  className={classes.input}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  id="user-phone-number"
                  label="전화번호"
                  required
                  error={phoneNumberError}
                  defaultValue="01027499876"
                />
              </Box>
              {/* 푸시, 알림톡, 문자, email 수신동의 */}
              <Link
                to="/mypage/setting/password"
                className={classes.btnWrapper}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  className={classes.Wrapper}
                >
                  <Button type={"submit"} className={classes.Btn}>
                    비밀번호 변경하기
                  </Button>
                </Box>
              </Link>
              <Link to="/mypage" className={classes.btnWrapper}>
                <Box
                  display="flex"
                  justifyContent="center"
                  className={classes.Wrapper}
                >
                  <Button type={"submit"} className={classes.Btn}>
                    저장하기
                  </Button>
                </Box>
              </Link>
            </form>
          </Paper>
        </Grow>
      </Route>
    </Switch>
  );
}

/* [POST | PUT] <api/account>
 *
 * 이용권한 수정은 접속자가 관리자일 시에만 가능.
 *
 * 용도: 회원가입(POST), 정보 수정(PUT)
 *
 * 회원가입 시 필요한 목록 (* optional) :
 *  email
 *  password
 *  name
 *  mobile 전화번호
 *  allow - set('앱푸시','알림톡','문자','전자우편')
 *  * push_date
 *  * talk_date
 *  * sms_date
 *  * email_date
 */
