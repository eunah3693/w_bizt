import React from "react";
import { Box, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
import MessButton from "./MessButton";

const styles = (theme) => ({
  root: {
    width: "95%",
    margin: "10px auto 0 auto",
    padding: "20px",
    backgroundColor: theme.typography.light,
  },
  list_top: {
    display: "flex",
    width: "100%",
    paddingBottom: "15px",
    position: "relative",
  },
  list_title: {
    fontSize: "18px",
    fontWeight: "500",
    paddingBottom: "15px",
    letterSpacing: "-1px",
  },
  txt_left: {
    width: "85px",
    textAlign: "left",
    color: theme.typography.main,
    fontSize: "15px",
    paddingBottom: "13px",
    fontWeight: "500",
  },
  txt_right: {
    color: theme.typography.main,
    fontSize: "15px",
  },
  oneButton: {
    width: "100%",
    border: `1px solid ${theme.typography.main}`,
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  buttonWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    height: "47px",
    display: "flex",
    flexGrow: "1",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    borderRadius: "8px",
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,
      color: theme.typography.light,
    },
    "&:nth-child(n+2)": {
      marginLeft: "10px",
    },
  },
});

class ReservBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { reservData: null };
  }

  componentDidMount() {
    const reserv_idx = this.props.reserv_idx;
    requestBiztApi(
      "/api/reservation/" + reserv_idx,
      null,
      onResponseSuccess((data) => {
        this.setState({ reservData: data?.[0] });
      })
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <Box width="100%">
          <Box className={classes.list_top}>
            <span className={classes.list_title}>list_title</span>
          </Box>
          <Box className={classes.list_bottom}>
            {/* {infoTxt?.map((infoTxtData, idx) => (
              <Box display="flex" key={idx}>
                <div className={classes.txt_left}>{infoTxtData.txt_left}</div>
                <div className={classes.txt_right}>{infoTxtData.txt_right}</div>
              </Box>
            ))} */}
          </Box>
        </Box>
        <div className={classes.buttonWrap}>
          <Button color="primary" className={classes.button}>
            승인
          </Button>
        </div>
        {true ? (
          <MessButton />
        ) : (
          <Box className="FlexCenter">
            <button className={classes.oneButton}>
              props.reservationStatus
            </button>
          </Box>
        )}
      </Box>
    );
  }
}

export default withStyles(styles)(ReservBox);
