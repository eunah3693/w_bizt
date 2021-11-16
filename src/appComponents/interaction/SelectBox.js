import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  wrapper: {
    "& .MuiAccordionSummary-content": {
      margin: "0",
      flexDirection: "column",
    },
    "& .MuiAccordion-root.Mui-expanded": {
      borderBottom: "1px solid lightgray",
      margin: 0,
    },
    "& .MuiAccordion-root.Mui-expanded:before": {
      opacity: "1",
    },
    "& .react-calendar": {
      width: "auto",
    },
    "& .react-calendar__tile--active::after": {
      content: "none",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "none",
      display: "none",
    },
    "& .PrivateNotchedOutline-legendLabelled-26": {
      display: "none",
    },
    "& legend > span": {
      display: "none",
    },
    "& .MuiOutlinedInput-input": {
      padding: "8.5px 14px;",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "& .Mui-focused": {
      backgroundColor: "white",
    },
    "& .MuiSelect-root": {
      backgroundColor: "white",
    },
  },
}));

export default function SelectBox(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(props.options[0]);
  const handleChange = (event) => {
    setState(event.target.value);
    props.callback(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select native value={state} onChange={handleChange} label="sort">
          {props.options.map((value, index) => {
            return (
              <option value={value} key={index}>
                {value}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
