import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  boxWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  root: {
    color: theme.typography.light,
    width: "100%",
    "& .MuiTextField-root": {
      width: "100%",
      borderRadius: "0",
      border: "0",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      width: "100%",
      borderRadius: "0",
      border: `0px solid ${theme.typography.light}`,
    },
    "& .MuiOutlinedInput-multiline": {
      fontSize: "15px",
      paddingLeft: "0",
      paddingTop: "10px",
    },
    "& .MuiOutlinedInput-inputMultiline": {
      height: "170px",


    },
    "& .MuiFormHelperText-contained": {
      color: ` ${theme.palette.primary.redOrange}`,
      marginTop: "0",
      marginLeft: "0",
    },
  },
  textarea: {
    border: "0",
  },
  textarea_box: {
    border: "0",
  },
}));
// Textarea
export default function Textarea(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.textarea}>
        <TextField
          className={classes.textarea_box}
          id="standard-multiline-static"
          multiline
          rows={4}
          defaultValue={props.value}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          variant="outlined"
          helperText={props.error}
        />
      </div>
    </form>
  );
}
