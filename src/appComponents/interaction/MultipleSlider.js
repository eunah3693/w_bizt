import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { PinDropSharp } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    padding: "0px 8px 16px 8px",
    display: "flex",
    justifyContent: "space-between",
  },
  add: {
    color: theme.palette.primary.main,
  },
  remove: {
    color: theme.palette.primary.main,
  },
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 24,
    label: "24",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function MultipleSlider(props) {
  const classes = useStyles();
  const AddIcon = props.AddIcon;
  const RemoveIcon = props.RemoveIcon;

  return (
    <div style={{ position: "relative", margin: "0 auto" }}>
      <div className={classes.margin}>
        {RemoveIcon && (
          <RemoveCircleIcon
            className={classes.remove}
            onClick={props.remove}
          ></RemoveCircleIcon>
        )}

        <Slider
          style={{ position: "relative", width: props.width, margin: "0 auto" }}
          step={1}
          min={0}
          max={24}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          value={props.setting ? props.setting : 0}
          onChange={props.onChange}
          marks={marks}
        />

        {AddIcon && (
          <AddCircleIcon
            className={classes.add}
            onClick={props.add}
          ></AddCircleIcon>
        )}
      </div>
    </div>
  );
}
