import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  Fab,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import "css/FloatingButton.css";

//플로팅 버튼
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTypography-colorPrimary": {
      color: "white",
    },
    position: "absolute",
    bottom: 80,
    right: 10,
    display: "flex",
    flexDirection: "column",
  },
  model: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "70%",
      padding: " 0 40px",
    },
  },
  paper: {
    position: "absolute",
    bottom: "75px",
    right: "5px",
    zIndex: "9999",
  },
  fab: {
    background: theme.palette.primary.floatingGradient,
    color: "white",
    borderRadius: "10px",
    zIndex: 1102,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  next: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "1px",
    width: "40%",
  },
  cancel: {
    borderRadius: "1px",
    color: theme.palette.primary.main,
    width: "40%",
    border: ` 1px solid ${theme.palette.primary.main}`,
  },
  ModalPopUpTitle: {
    fontSize: "18px",
    textAlign: "center",
    paddingTop: "15px",
    minWidth: "300px",
  },
}));

const CheckInMark = [
  { value: 0, label: "1km" },
  { value: 20, label: "5km" },
  { value: 40, label: "10km" },
  { value: 60, label: "30km" },
  { value: 80, label: "50km" },
  { value: 100, label: "100km" },
];

function FloatingActionButtons(props) {
  const classes = useStyles();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkInOut, setCheckInOut] = useState("체크아웃");
  const [modalOpen, setModalOpen] = useState(false);

  const changeText = () => {
    if (checkInOut === "체크아웃") {
      setCheckInOut("체크인");
      setCheckInOpen(false);
    } else {
      setCheckInOut("체크아웃");
      setCheckInOpen(false);
    }
  };
  return (
    <Fragment>
      <div className={classes.ModalWrapper}>
        <Dialog
          disableScrollLock
          open={checkInOpen}
          onClose={() => setCheckInOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            className={classes.ModalPopUpTitle}
            disableTypography={true}
          >
            {checkInOut} 하시겠어요?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className={classes.modalContents}
            ></DialogContentText>
          </DialogContent>
          <DialogActions className={classes.buttonGroup}>
            <Button
              onClick={() => setCheckInOpen(false)}
              color="primary"
              className={classes.cancel}
            >
              취소하기
            </Button>
            <Button
              onClick={changeText}
              color="primary"
              className={classes.next}
              autoFocus
            >
              {checkInOut}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {modalOpen ? (
        <div className={classes.model}>
          <Paper className={classes.paper} elevation={3}>
            <div style={{ position: "absolute", right: "0px", top: "20px" }}>
              <Button onClick={() => setModalOpen(false)}>
                <CloseIcon></CloseIcon>
              </Button>
            </div>
            <Box>
              <p className="SubtitleLeft Margin-5px">빠른검색</p>

              <p className="Margin-5px">거리</p>
              <Slider
                aria-label="Custom marks"
                defaultValue={0}
                step={20}
                marks={CheckInMark}
              />
              <p className="Margin-5px">가격</p>
              <Slider
                aria-label="Custom marks"
                defaultValue={0}
                step={20}
                marks={CheckInMark}
              />
              <p className="Margin-5px">시간</p>
              <Slider
                aria-label="Custom marks"
                defaultValue={0}
                step={20}
                marks={CheckInMark}
              />
            </Box>
            <Link to="/search">
              <div className="FlexEnd" style={{ padding: "20px 0 " }}>
                <Button>검색하기</Button>
              </div>
            </Link>
          </Paper>
        </div>
      ) : null}
      <div className={classes.root}>
        <Fab
          className={classes.fab}
          aria-label="add"
          onClick={() => setCheckInOpen(true)}
        >
          {/* 아이콘 svg 추가 */}
          <p style={{ fontSize: "12px" }}>
            {(() => {
              if (checkInOut === "체크아웃")
                return (
                  <>
                    체크
                    <br />
                    아웃
                  </>
                );
              else return checkInOut;
            })()}
          </p>
        </Fab>
        <Fab
          className={classes.fab}
          color="secondary"
          aria-label="edit"
          onClick={() => setModalOpen(true)}
        >
          {/* <EditIcon /> */}
          <p style={{ fontSize: "12px" }}>{"검색"}</p>
        </Fab>
      </div>
    </Fragment>
  );
}

export default FloatingActionButtons;
