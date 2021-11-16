import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, DialogActions } from "@material-ui/core";

import renderDetailedDesc from "appComponents/interaction/SpeechBubble";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  cancel: {
    borderRadius: "1px",
    color: "black",
    width: "100%",
    border: "1px solid orange",
  },
  modalWrapper: {
    backgroundColor: "white",
  },
  headTitle: {
    fontSize: "25px",
    fontWeight: "bold",
    margin: "10px 0 15px 0 ",
  },
}));

export default function ProcessCard(props) {
  const classes = useStyles();

  // open을 안쓰는데 setOpen만 사용한다??
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.modalWrapper}>
      <Box style={{ padding: "20px" }}>
        <div className="SpaceBetween">
          <p className={classes.headTitle}>{props.headTitle}</p>
        </div>
        <div>{renderDetailedDesc(props.detailDataList)}</div>
      </Box>

      <DialogActions
        className={classes.buttonGroup}
        style={{ padding: "20px" }}
      >
        <Button
          onClick={handleClose}
          color="primary"
          className={classes.cancel}
        >
          {props.cancel}
        </Button>
      </DialogActions>
    </Box>
  );
}
