import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

import Textarea from "appComponents/interaction/TextArea";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Button100 from "appComponents/interaction/Button100";
const useStyles = makeStyles((theme) => ({
  popup_box: {
    position: "relative",
    backgroundColor: theme.typography.light,

    "& .MuiDialogTitle-root": {
      padding: "60px 24px 5px 24px",
    },
    "& .MuiTypography-body1": {
      textAlign: "center",
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
  content: {
    paddingBottom: "20px",
  },
  startBox: {
    display: "flex",
    jutifyContent: "center",
  },
  Divider: {
    width: "100%",
    margin: "0 auto",
  },

  popup_title: {
    fontSize: "16px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  popup_subtitle: {
    fontSize: "13px",
  },
}));

export default function DenyWrite(props) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const { disabled } = props;
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box className={classes.popup_box}>
      <DialogTitle disableTypography={true} id="form-dialog-title">
        <span className={classes.popup_title}>
          예약취소 사유를 입력해주세요
        </span>
      </DialogTitle>
      <DialogContent className={classes.popup_content}>
        <DialogContentText className={classes.content}></DialogContentText>
        <Divider className={classes.Divider}></Divider>
        <Textarea
          value={value}
          onChange={handleChange}
          error={props.error}
          placeholder="예약취소사유를 입력해주세요"
        ></Textarea>
        <Divider className={classes.Divider}></Divider>
      </DialogContent>
      <div>
        <Box p={2}>
          <Button100
            disabled={disabled}
            onClick={() => {
              props.submit(value);
            }}
          >
            취소하기
          </Button100>
        </Box>
      </div>
      <CloseIcon
        className={classes.coseIcon}
        onClick={() => {
          props.close();
        }}
      ></CloseIcon>
    </Box>
  );
}
