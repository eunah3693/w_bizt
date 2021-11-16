import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouteMatch } from "react-router-dom";
import { requestBiztApi } from "utility/connectivity";
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

export default function Tax() {
  const classes = useStyles();
  const { path } = useRouteMatch();

  const errorText = {
    CompanyNumber: "사업자등록번호를 다시확인해주세요",
    registrationName: "사업자등록상호를 다시확인해주세요",
    representativeName: "대표자성명을 입력해주세요",
    address: "사업장주소를 입력해주세요",
    businessCondition: "업태를 입력해주세요",
    businessType: "업종을 입력해주세요",
    email: "이메일을 입력해주세요",
  };

  const [userInfo, setUserInfo] = useState({
    CompanyNumber: "",
    registrationName: "",
    representativeName: "",
    address: "",
    businessCondition: "",
    businessType: "",
    email: "",
  });

  // keys: email password confirm name mobile agreement
  const [errors, setErrors] = useState({
    CompanyNumber: false,
    registrationName: false,
    representativeName: false,
    address: false,
    businessCondition: false,
    businessType: false,
    email: false,
  });

  function editUserInfo(obj) {
    setUserInfo({ ...userInfo, ...obj });
  }
  //사업자등록번호 reg
  function checkCorporateRegistrationNumber(value) {
    var valueMap = value
      .replace(/-/gi, "")
      .split("")
      .map(function (item) {
        return parseInt(item, 10);
      });

    if (valueMap.length === 10) {
      var multiply = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5);
      var checkSum = 0;

      for (var i = 0; i < multiply.length; ++i) {
        checkSum += multiply[i] * valueMap[i];
      }

      checkSum += parseInt((multiply[8] * valueMap[8]) / 10, 10);
      return Math.floor(valueMap[9]) === 10 - (checkSum % 10);
    }

    return false;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let newErrors = {
      CompanyNumber: !checkCorporateRegistrationNumber(userInfo.CompanyNumber),
      registrationName: !userInfo.registrationName,
      representativeName: !userInfo.representativeName,
      address: !userInfo.address,
      businessCondition: !userInfo.businessCondition,
      businessType: !userInfo.businessType,
      email: !emailRegex.test(userInfo.email),
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
  const inputProp = {
    display: "flex",
    justifyContent: "center",
    className: classes.Wrapper,
  };
  return (
    <div className={classes.paper}>
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
              editUserInfo({ CompanyNumber: e.target.value });
            }}
            id="register-CompanyNumber "
            label="사업자등록번호"
            required
            error={errors.CompanyNumber}
            helperText={errors.CompanyNumber && errorText.CompanyNumber}
          />
        </Box>
        <Box {...inputProp}>
          <TextField
            className={classes.input}
            onChange={(e) => {
              editUserInfo({ registrationName: e.target.value });
            }}
            id="register-registrationName "
            label="상호"
            required
            error={errors.registrationName}
            helperText={errors.registrationName && errorText.registrationName}
          />
        </Box>
        <Box {...inputProp}>
          <TextField
            className={classes.input}
            onChange={(e) => {
              editUserInfo({ representativeName: e.target.value });
            }}
            id="register-representativeName "
            label="대표자성명"
            required
            error={errors.representativeName}
            helperText={
              errors.representativeName && errorText.representativeName
            }
          />
        </Box>
        <Box {...inputProp}>
          <TextField
            className={classes.input}
            onChange={(e) => {
              editUserInfo({ address: e.target.value });
            }}
            id="register-address "
            label="사업장주소"
            required
            error={errors.address}
            helperText={errors.address && errorText.address}
          />
        </Box>
        <Box {...inputProp}>
          <TextField
            className={classes.input}
            onChange={(e) => {
              editUserInfo({ businessCondition: e.target.value });
            }}
            id="register-businessCondition "
            label="업태"
            required
            error={errors.businessCondition}
            helperText={errors.businessCondition && errorText.businessCondition}
          />
        </Box>
        <Box {...inputProp}>
          <TextField
            className={classes.input}
            onChange={(e) => {
              editUserInfo({ businessType: e.target.value });
            }}
            id="register-businessType "
            label="종목"
            required
            error={errors.businessType}
            helperText={errors.businessType && errorText.businessType}
          />
        </Box>
        <Box {...inputProp}>
          <TextField
            className={classes.input}
            onChange={(e) => {
              editUserInfo({ email: e.target.value });
            }}
            id="register-email "
            label="이메일"
            required
            error={errors.email}
            helperText={errors.email && errorText.email}
          />
        </Box>
        <Box display="flex" justifyContent="center" className={classes.Wrapper}>
          <Button type={"submit"} className={classes.Btn}>
            저장하기
          </Button>
        </Box>
      </form>
    </div>
  );
}
