import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  primary: {
    borderRadius: "100px",
    padding: "0 10px ",
  },
}));

export default function OptionButton() {
  const classes = useStyles();

  return (
    <Box m={1}>
      <div className={classes.root}>
        {/* <Button variant="outlined">Default</Button> */}
        <Button className={classes.primary} variant="outlined" color="primary">
          Primary
        </Button>
        <Button className={classes.primary} variant="outlined" color="primary">
          Primary
        </Button>
        <Button className={classes.primary} variant="outlined" color="primary">
          Primary
        </Button>
        <p>active 추가시 backgroundcolor변경</p>
        {/* <Button variant="outlined" color="secondary">
                Secondary
            </Button>
            <Button variant="outlined" disabled>
                Disabled
            </Button>
            <Button variant="outlined" color="primary" href="#outlined-buttons">
                Link
            </Button> */}
      </div>
    </Box>
  );
}
