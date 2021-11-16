import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const StyledRating = withStyles((theme) => ({
  iconFilled: {
    color: theme.palette.primary.sub,
  },
  iconHover: {
    color: theme.palette.primary.sub,
  },
}))(Rating);

function RatingStar(props) {
  return <StyledRating name="simple-controlled" {...props} />;
}

export default RatingStar;
