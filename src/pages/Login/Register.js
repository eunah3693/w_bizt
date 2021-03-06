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
  email: "???????????? ??????????????????",
  password: "???????????????, ?????? ?????? 8??? ???????????? ??????????????????",
  confirm: "??????????????? ???????????? ????????????",
  name: "????????? ??????????????????",
  mobile: "????????? ??????????????????",
  agreements: "????????? ??????????????????",
};
const allowText = {
  push: "?????????",
  talk: "?????????",
  sms: "SMS",
  email: "?????????",
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

  /* ??????, ?????????, ??????, email ???????????? */
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

    // newErrors??? ?????? flag??? ???????????? ????????? ????????? setError ??? return
    for (let value in Object.values(newErrors)) {
      if (value) {
        setErrors(newErrors);
        return;
      }
    }

    //object ????????? sns ?????? ?????? ????????? string??? ????????? ??????
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
              label="?????????"
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
              label="????????????"
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
              label="???????????? ??????"
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
              label="??????"
              required
              error={errors.name}
              helperText={errors.name && errorText.name}
            />
          </Box>
          <Box {...inputProp}>
            {/* ???????????? ?????? ?????? */}
            <TextField
              className={classes.input}
              onChange={(e) => {
                editUserInfo({ member_mobile: e.target.value });
              }}
              id="register-phone-number"
              label="????????? ??????"
              required
              error={errors.mobile}
              helperText={errors.mobile && errorText.mobile}
            />
          </Box>
          {/* ??????, ?????????, ??????, email ???????????? */}
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
                    label="SNS ?????? ??????"
                  />
                  <span className={classes.check_right}>(??????)</span>
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
                    label="????????? ?????? ??????"
                  />
                  <span className={classes.check_right}>[??????]</span>
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
                    label="????????? ?????? ??????"
                  />
                  <span className={classes.check_right}>[??????]</span>
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
                    label="SMS ?????? ??????"
                  />
                  <span className={classes.check_right}>[??????]</span>
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
                    label="????????? ?????? ??????"
                  />
                  <span className={classes.check_right}>[??????]</span>
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
                    label="?????? ?????? ??????"
                  />
                  <span className={classes.check_right}>(??????)</span>
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
                    label="???????????? ??????"
                  />
                  <Link className={classes.check_right} to="?policy=terms">
                    [??????]
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
                    label="???????????????????????? ??????"
                  />
                  <Link className={classes.check_right} to="?policy=privacy">
                    [??????]
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
                    label="??????????????? ??????"
                  />
                  <span className={classes.check_right}>[??????]</span>
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
              ????????????
            </Button>
          </Box>
        </form>
      </Paper>
    </Grow>
  );
}
