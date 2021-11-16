import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import Textarea from "appComponents/interaction/TextArea";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button100 from "appComponents/interaction/Button100";

const useStyles = makeStyles((theme) => ({
  popup_box: {
    position: "relative",
    backgroundColor: theme.typography.light,
    "& .MuiDialogTitle-root": {
      padding: "60px 24px 25px 24px",
    },
  },
  coseIcon: {
    position: "absolute",
    right: "15px",
    top: "15px",
    fontSize: "35px",
  },
  popup_content: {
    overflowY: "inherit",
  },
  Divider: {
    width: "100%",
    margin: "0 auto",
  },
  re_title: {
    height: "110px",
    padding: "20px 0",
    "& .MuiRating-label": {
      margin: "0 5px",
    },
  },
  re_title_h: {
    fontSize: "16px",
    letterSpacing: "-1px",
    paddingBottom: "5px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  re_title_h2: {
    fontSize: "13px",
    letterSpacing: "-1px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  re_select: {
    backgroundColor: theme.palette.primary.gray,
  },
  list_left_img: {
    height: "92px",
    width: "92px",
  },
  popup_title: {
    fontSize: "15px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  popup_subtitle: {
    fontSize: "13px",
  },
}));

export default function ResDeny(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <Box className={classes.popup_box}>
      <DialogTitle id="form-dialog-title" disableTypography={true}>
        <p className={classes.popup_title}>거부 사유를 입력해주세요</p>
        <p className={classes.popup_subtitle}>
          정당하지 않은 입실 거부는 정책에 대한 위반 사항입니다.
        </p>
      </DialogTitle>
      <DialogContent className={classes.popup_content}>
        <Textarea
          id="outlined-multiline-static"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          error={props.error}
        />
      </DialogContent>
      <div>
        <Box p={2}>
          <Button100
            onClick={() => {
              props.submit(value);
            }}
          >
            등록하기
          </Button100>
        </Box>
      </div>
      <CloseIcon className={classes.coseIcon} onClick={props.close} />
    </Box>
  );
}
