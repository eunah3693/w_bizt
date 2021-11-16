import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Divider,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { requestBiztApi } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  check_wrap: {
    border: `2px solid ${theme.palette.primary.lightdark}`,
    borderRadius: "10px",
    overflow: "hidden",
    "& .MuiFormGroup-root": {
      padding: "10px 0",
      width: "100%",
    },

    "& .MuiFormControlLabel-label": {
      fontSize: "13px",
      paddingLeft: "10px",
    },
    paddingBottom: "5px",
  },
  check_wrap_border: {
    border: "1px solid #f44336",
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
  },
  back: {
    marginLeft: "30px",
  },
  check_line: {
    width: "300px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  check_right: {
    fontSize: "13px",
    paddingRight: "10px",
    cursor: "pointer",
  },
  checktxt: {
    color: "#f44336",
    fontSize: "0.75rem",
    padding: "20px 0 10px 0",
  },
}));

const errorText = {
  email: "이메일을 확인해주세요",
  password: "영어소문자, 숫자 포함 8자 이상으로 입력해주세요",
  confirm: "비밀번호가 일치하지 않습니다",
  name: "이름을 입력해주세요",
  mobile: "숫자만 입력해주세요",
  agreements: "약관에 동의해주세요",
};
const allowText = {
  push: "앱푸시",
  talk: "알림톡",
  sms: "SMS",
  email: "이메일",
};

export default function Register() {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState({
    member_email: "",
    member_password: "",
    confirm: "",
    member_name: "",
    member_mobile: "",
  });

  // keys: email password confirm name mobile agreement
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirm: false,
    name: false,
    mobile: false,
    agreements: false,
  });

  /* 푸시, 알림톡, 문자, email 수신동의 */
  const [allows, setAllows] = useState({
    push: false,
    talk: false,
    sms: false,
    email: false,
  });

  const [agreements, setAgreements] = useState({
    usage: false,
    privacy: false,
    marketing: false,
  });

  function editUserInfo(obj) {
    setUserInfo({ ...userInfo, ...obj });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/;
    const phonRegex = /^\d{11}$/;

    let newErrors = {
      email: !emailRegex.test(userInfo.member_email),
      password: !passwordRegex.test(userInfo.member_password),
      confirm: userInfo.member_password !== userInfo.confirm,
      name: !userInfo.member_name,
      mobile: !phonRegex.test(userInfo.member_mobile),
      agreements: !(
        agreements.usage &&
        agreements.privacy &&
        agreements.marketing
      ),
    };

    // newErrors에 에러 flag가 하나라도 올라가 있으면 setError 후 return
    for (let value in Object.values(newErrors)) {
      if (value) {
        setErrors(newErrors);
        return;
      }
    }

    //object 형태의 sns 수신 설정 여부를 string의 배열로 변경
    let allowsForm = [];
    for (const [key, value] in Object.values(allows)) {
      if (value) {
        allowsForm.push(allowText[key]);
      }
    }

    let body = new FormData();
    Object.entries(userInfo).forEach(([key, value]) => {
      body.append(key, value);
    });
    body.append("member_allow", allowsForm.toString());

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

  const inputProp = {
    display: "flex",
    justifyContent: "center",
    className: classes.Wrapper,
  };
  return (
    <Grow in={true}>
      <Paper className={classes.paper}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          method="post"
          onSubmit={handleSubmit}
        >
          <Box {...inputProp}>
            <TextField
              className={classes.input}
              onChange={(e) => {
                editUserInfo({ member_email: e.target.value });
              }}
              id="register-email"
              label="이메일"
              required
              error={errors.email}
              helperText={errors.email && errorText.email}
            />
          </Box>
          <Box {...inputProp}>
            <TextField
              className={classes.input}
              onChange={(e) => {
                editUserInfo({ member_password: e.target.value });
              }}
              id="register-password"
              label="비밀번호"
              required
              error={errors.password}
              helperText={errors.password && errorText.password}
            />
          </Box>
          <Box {...inputProp}>
            <TextField
              className={classes.input}
              onChange={(e) => {
                editUserInfo({ passwordConfirm: e.target.value });
              }}
              id="register-password2"
              label="비밀번호 확인"
              required
              error={errors.confirm}
              helperText={errors.confirm && errorText.confirm}
            />
          </Box>
          <Box {...inputProp}>
            <TextField
              className={classes.input}
              onChange={(e) => {
                editUserInfo({ member_name: e.target.value });
              }}
              id="register-name"
              label="이름"
              required
              error={errors.name}
              helperText={errors.name && errorText.name}
            />
          </Box>
          <Box {...inputProp}>
            {/* 전화번호 인증 필요 */}
            <TextField
              className={classes.input}
              onChange={(e) => {
                editUserInfo({ member_mobile: e.target.value });
              }}
              id="register-phone-number"
              label="핸드폰 번호"
              required
              error={errors.mobile}
              helperText={errors.mobile && errorText.mobile}
            />
          </Box>
          {/* 푸시, 알림톡, 문자, email 수신동의 */}
          <Box mt={2} {...inputProp}>
            <FormGroup>
              <div className={classes.check_wrap}>
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={
                          allows.push &&
                          allows.talk &&
                          allows.sms &&
                          allows.email
                        }
                        onChange={(e) => {
                          setAllows({
                            push: e.target.checked,
                            talk: e.target.checked,
                            sms: e.target.checked,
                            email: e.target.checked,
                          });
                        }}
                        name="snsChecked"
                        color="primary"
                        value="dd"
                      />
                    }
                    label="SNS 전체 동의"
                  />
                  <span className={classes.check_right}>(선택)</span>
                </div>
                <Divider className={classes.Divider} />
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={allows.push}
                        onChange={(e) => {
                          setAllows({ ...allows, push: e.target.checked });
                        }}
                        name="pushChecked"
                        color="primary"
                      />
                    }
                    label="앱푸시 수신 동의"
                  />
                  <span className={classes.check_right}>[보기]</span>
                </div>
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={allows.talk}
                        onChange={(e) => {
                          setAllows({ ...allows, talk: e.target.checked });
                        }}
                        name="talkChecked"
                        color="primary"
                      />
                    }
                    label="알림톡 수신 동의"
                  />
                  <span className={classes.check_right}>[보기]</span>
                </div>
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={allows.sms}
                        onChange={(e) => {
                          setAllows({ ...allows, sms: e.target.checked });
                        }}
                        name="smsChecked"
                        color="primary"
                      />
                    }
                    label="SMS 수신 동의"
                  />
                  <span className={classes.check_right}>[보기]</span>
                </div>
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={allows.email}
                        onChange={(e) => {
                          setAllows({ ...allows, email: e.target.checked });
                        }}
                        name="emailChecked"
                        color="primary"
                      />
                    }
                    label="이메일 수신 동의"
                  />
                  <span className={classes.check_right}>[보기]</span>
                </div>
              </div>
              <span className={classes.checktxt}>
                {errors.agreements && errorText.agreements}
              </span>
              <div
                className={clsx(
                  classes.check_wrap,
                  errors.agreements && classes.check_wrap_border
                )}
              >
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={
                          agreements.usage &&
                          agreements.privacy &&
                          agreements.marketing
                        }
                        onChange={(e) => {
                          setAgreements({
                            usage: e.target.checked,
                            privacy: e.target.checked,
                            marketing: e.target.checked,
                          });
                        }}
                        name="termsChecked"
                        color="primary"
                      />
                    }
                    label="약관 전체 동의"
                  />
                  <span className={classes.check_right}>(필수)</span>
                </div>
                <Divider className={classes.Divider} />
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={agreements.usage}
                        onChange={(e) => {
                          setAgreements({
                            ...agreements,
                            usage: e.target.checked,
                          });
                        }}
                        name="emailChecked"
                        color="primary"
                      />
                    }
                    label="이용약관 동의"
                  />
                  <Link className={classes.check_right} to="?policy=terms">
                    [보기]
                  </Link>
                </div>
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={agreements.privacy}
                        onChange={(e) => {
                          setAgreements({
                            ...agreements,
                            privacy: e.target.checked,
                          });
                        }}
                        name="privacyChecked"
                        color="primary"
                      />
                    }
                    label="개인정보처리방침 동의"
                  />
                  <Link className={classes.check_right} to="?policy=privacy">
                    [보기]
                  </Link>
                </div>
                <div className={classes.check_line}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        className={classes.chekbox}
                        checked={agreements.marketing}
                        onChange={(e) => {
                          setAgreements({
                            ...agreements,
                            marketing: e.target.checked,
                          });
                        }}
                        name="marketingChecked"
                        color="primary"
                      />
                    }
                    label="마케팅수신 동의"
                  />
                  <span className={classes.check_right}>[보기]</span>
                </div>
              </div>
            </FormGroup>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.Wrapper}
          >
            <Button type={"submit"} className={classes.Btn}>
              가입하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Grow>
  );
}
