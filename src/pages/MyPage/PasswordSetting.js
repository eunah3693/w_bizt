import { useState } from "react";
import { useHistory } from "react-router-dom";

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
import { makeStyles } from "@material-ui/core/styles";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

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
    border: `0px solid ${theme.palette.primary.lightdark}`,
    padding: "7px ",
    marginTop: "5px",
    marginBottom: "0px",
    color: theme.typography.light,
    borderRadius: "10px",
    cursor: "pointer",
    background: theme.palette.primary.navy,
  },
}));

export default function Register() {
  const history = useHistory();

  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [passwordError, setPasswordError] = useState();
  const [newPasswordError, setNewPasswordError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setPassword(!password);
    setPasswordError(!password);
    setNewPassword(!newPassword);
    setNewPasswordError(!newPasswordError);

    requestBiztApi(
      "/api/account",
      {
        method: "POST",
        body: {
          password: password,
          newPassword: newPassword,
        },
      },
      (data) => {
        console.log(data);
      }
    );
  };

  const classes = useStyles();
  return (
    <Grow in={true}>
      <Paper className={classes.paper}>
        <div className="Padding20px"></div>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
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
                setPassword(e.target.value);
              }}
              value={password}
              id="current-password"
              label="현재 비밀번호"
              required
              error={passwordError}
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
                setPassword(e.target.value);
              }}
              id="new-password"
              label="새 비밀번호"
              value={newPassword}
              required
              error={newPasswordError}
            />
          </Box>
          {/* 푸시, 알림톡, 문자, email 수신동의 */}

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
