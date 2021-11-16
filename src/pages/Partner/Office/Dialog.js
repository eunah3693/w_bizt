import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Button100 from "appComponents/interaction/Button100";
const useStyles = makeStyles((theme) => ({
  popup_box: {
    position: "relative",
    backgroundColor: theme.typography.light,

    "& .MuiDialogTitle-root": {
      padding: "60px 24px 40px 24px",
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

  popup_title: {
    fontSize: "16px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  popup_subtitle: {
    fontSize: "13px",
  },
}));

export default function DialogPopup(props) {
  const classes = useStyles();
  const [reservationStatus, setReservationStatus] = useState(false);

  return (
    <Box className={classes.popup_box}>
      <DialogTitle disableTypography={true} id="form-dialog-title">
        <span className={classes.popup_title}>
          {reservationStatus ? (
            <span>현재 예약된 오피스가 있어 삭제가 불가합니다</span>
          ) : (
            <span>삭제하시겠습니까?</span>
          )}
        </span>
      </DialogTitle>
      <DialogContent className={classes.popup_content}></DialogContent>
      <div>
        <Box p={2}>
          <Button100 onClick={props.click}>
            {reservationStatus ? "확 인" : "삭제하기"}
          </Button100>
        </Box>
      </div>
      <CloseIcon className={classes.coseIcon} onClick={props.click}></CloseIcon>
    </Box>
  );
}
