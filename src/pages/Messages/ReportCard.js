import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Textarea from "appComponents/interaction/TextArea";
import { requestBiztApi } from "utility/connectivity";
import CloseIcon from "@material-ui/icons/Close";
import Button100 from "appComponents/interaction/Button100";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card_left: {
    flex: "0 0 28%",
    padding: "20px 0px 20px 16px",
  },
  img: {
    width: "100px",
    height: "100px",
  },
  card_right: {
    flex: "1 0 72%",
    color: theme.typography.main,
    paddingLeft: "16px",
    position: "relative",
  },
  head: {
    width: "100%",
    position: "relative",
  },
  title: {
    fontSize: "15px",
    fontWeight: "500",
    paddingBottom: "15px",
    letterSpacing: "-1px",
  },
  status: {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontWeight: "bold",
    display: "flex",
    "& div": {
      marginLeft: "5px",
    },
  },
  interaction: {
    padding: "0 10px",
    backgroundColor: theme.palette.primary.sub,
    fontSize: "12px",
    color: theme.typography.light,
    borderRadius: "10px",
    lineHeight: "155%",
    fontWeight: "normal",
  },
  outline_btn: {
    padding: "0 10px",
    border: `1px solid ${theme.palette.primary.sub}`,
    fontSize: "12px",
    color: theme.typography.main,
    borderRadius: "10px",
    lineHeight: "150%",
    fontWeight: "normal",
  },
  detail_category: {
    width: "75px",
    textAlign: "left",
    color: theme.typography.dark,
    fontSize: "13px",
    paddingBottom: "4px",
  },
  detail_content: {
    color: theme.typography.main,
    fontSize: "13px",
    fontWeight: "500",
  },
  report_txt: {
    fontSize: "13px",
    paddingLeft: "16px",
    fontWeight: "500",
    wordBreak: "break-all",
    paddingRight: "16px",
  },
  popup_content: {
    overflowY: "visible",
  },
  popup_title: {
    fontSize: "15px",
    fontWeight: "500",
  },
  popup_subtitle: {
    fontSize: "13px",
  },
  popup_box: {
    position: "relative",

    "& .MuiDialogTitle-root": {
      padding: "60px 24px 20px 24px",
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
}));

export default function ReportCard(props) {
  const classes = useStyles();

  const { interaction, apiSend } = props;
  const [open, setOpen] = React.useState(false);
  const [txt, setTxt] = React.useState();
  const [error, setError] = React.useState();
  const [disabled, setDisabled] = React.useState(false);
  const [status, setStatus] = React.useState("진행중");

  const handleChange = (event) => {
    setTxt(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit() {
    if (!txt) {
      setError("* 메세지를 작성해주세요");
    } else {
      setOpen(false);
      setError("");
      setTxt("");
      setDisabled(true);
      setStatus("접수됨");
      // requestBiztApi(
      //   "/api/report/list",
      //   {
      //     method: "POST",
      //     body: {
      //       txt: txt,
      //     },
      //   },
      //   (accountData) => {
      //     if (accountData.res === "00") {
      //       // setStatus("접수됨")
      //     }
      //   }
      // );
    }
  }

  return (
    <Box>
      <Box className={classes.root}>
        {props.list_img && (
          <Box className={classes.card_left}>
            <img alt="office" src={props.list_img} className={classes.img} />
          </Box>
        )}
        <Box p={2} className={classes.card_right} onClick={handleClickOpen}>
          <Box className={classes.head} display="flex">
            {props.list_title && (
              <span className={classes.title}>{props.list_title}</span>
            )}
            <Box className={classes.status}>
              <div className={classes.outline_btn}>{status}</div>
              {interaction && (
                <div
                  className={classes.interaction}
                  onClick={interaction.onClick}
                >
                  {interaction.text}
                </div>
              )}
            </Box>
          </Box>

          <Box>
            {props.details?.map((item, idx) => (
              <Box display="flex" key={idx}>
                <div className={classes.detail_category}>{item.category}</div>
                <div className={classes.detail_content}>{item.content}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={classes.report_txt}>{props.report_txt}</Box>

      <Dialog
        disableScrollLock
        fullWidth={true}
        open={open}
        onClose={handleClose}
        className={classes.popup_box}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span className={classes.popup_title}>
            신고자에게 메세지를 보낼수있습니다
          </span>
        </DialogTitle>
        <DialogContent className={classes.popup_content}>
          <Divider className={classes.Divider}></Divider>
          <Textarea value={txt} onChange={handleChange} error={error}>
            {" "}
          </Textarea>
          <Divider className={classes.Divider}></Divider>
        </DialogContent>
        <div>
          <Box p={2}>
            <Button100 onClick={handleSubmit} disabled={disabled}>
              전송하기
            </Button100>
          </Box>
        </div>
        <CloseIcon
          className={classes.coseIcon}
          onClick={handleClose}
        ></CloseIcon>
      </Dialog>
    </Box>
  );
}
