import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import {
  Divider,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { pingBiztApi, requestBiztApi, setToken } from "utility/connectivity";

import office from "Img/office.png";
import { AccountContext } from "utility/contexts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  user_wrap: {
    justifyContent: "Space-between",
  },
  user_left: {
    width: "60px",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& img": {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
    },
  },
  user_right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "55%",
    "& h3": {
      fontSize: "18px",
    },
    "& a": {
      fontSize: "13px",
      color: theme.palette.primary.main,
      paddingTop: "2px",
    },
  },
  left: {
    width: "50%",
    padding: " 10px 0 10px 20px",
    borderRight: `1px solid ${theme.palette.primary.lightdark}`,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
    "& h5": {
      fontSize: "13px",
      paddingBottom: "5px",
    },
    "& span": {
      fontSize: "18px",
      fontWeight: "600",
    },
  },
  right: {
    width: "50%",
    padding: " 10px 0 10px 20px",
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
    "& h5": {
      fontSize: "13px",
      paddingBottom: "5px",
    },
    "& span": {
      fontSize: "18px",
      fontWeight: "600",
    },
  },
  logout: {
    paddingTop: "20px",
    paddingInline: "16px",
    float: "right",
    fontSize: "13px",
    color: theme.palette.primary.main,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  next: {
    backgroundColor: `${theme.palette.primary.main}`,
    color: "white",
    borderRadius: "1px",
    width: "40%",
  },
  cancel: {
    borderRadius: "1px",
    color: `${theme.palette.primary.main}`,
    width: "40%",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  buttonText: {
    color: `${theme.palette.primary.sub}`,
    borderRadius: "50px",
    padding: "1px 5px",
    border: `1px solid ${theme.palette.primary.sub}`,
    fontSize: "13px",
  },
  ModalPopUpTitle: {
    fontSize: "18px",
    textAlign: "center",
    paddingTop: "15px",
    minWidth: "300px",
  },
}));

export default function Profile() {
  const classes = useStyles();

  const { path } = useRouteMatch();
  const [modalOpen, setModalOpen] = useState(false);

  //TODO: ????????? ????????? ?????? login????????? ???????????? login()??? ?????? ??????
  const logOut = () => {
    requestBiztApi("/api/logout", null, (res) => {
      if (res.result === "00") {
        setToken(res.token);
        window.location.reload();
      } else {
        console.error(res.message);
      }
    });
  };

  return (
    <AccountContext.Consumer>
      {([account]) => {
        return (
          <Box>
            {/* ????????? ???????????? account??? falsy??? ??? dummy ???????????? ???????????? ??????????????? ?????? ?????? */}
            <Box p={2} className={classes.user_wrap} display="flex">
              <div className={classes.user_left}>
                {account ? (
                  // src={office}??? account. ????????? ????????? ????????? ?????? ??????????????????
                  <img src={office} alt="???????????????" />
                ) : (
                  <PersonIcon />
                )}
              </div>
              <div className={classes.user_right}>
                {account ? (
                  <>
                    <h3>{account.member_name}</h3>
                    <Link to={`${path}/setting`}>????????????</Link>
                  </>
                ) : (
                  <h3>???????????? ??????????????????!</h3>
                )}
              </div>
              <Box className="FlexEnd" style={{ minWidth: "85px" }}>
                {account ? (
                  <Button
                    style={{ padding: 0 }}
                    onClick={() => setModalOpen(true)}
                  >
                    <span className={classes.buttonText}>????????????</span>
                  </Button>
                ) : (
                  // ?????? ??? onClick??? setLoginCallback ??????
                  <Button component={Link} to="?request-login=user">
                    <span className={classes.buttonText}>?????????</span>
                  </Button>
                )}
              </Box>
            </Box>
            {/* ?????? ???????????? ???????????? ?????? */}
            {false && account && (
              <>
                <Divider className={classes.Divider} />
                <Box display="flex">
                  <div className={classes.left}>
                    <h5>????????????</h5>
                    <span>VIP</span>
                  </div>
                  <div className={classes.right}>
                    <h5>?????????</h5>
                    <span>20,000</span>
                  </div>
                </Box>
              </>
            )}
            <Dialog
              disableScrollLock
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                className={classes.ModalPopUpTitle}
              >
                ???????????? ????????????????
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  className={classes.modalContents}
                />
              </DialogContent>
              <DialogActions className={classes.buttonGroup}>
                <Button
                  onClick={() => setModalOpen(false)}
                  color="primary"
                  className={classes.cancel}
                >
                  ????????????
                </Button>
                <Button
                  onClick={logOut}
                  color="primary"
                  className={classes.next}
                  autoFocus
                >
                  ????????????
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        );
      }}
    </AccountContext.Consumer>
  );
}
