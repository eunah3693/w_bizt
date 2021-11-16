import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";




//플로팅 버튼
const useStyles = makeStyles((theme) => ({
    wrapper: {
        "& .MuiFormControlLabel-root ": {
            marginRight: 0,
            marginLeft: 0
        },
        "& .PrivateSwitchBase-root-71 ": {
            padding: 0,
            marginRight: "5px"
        },
        "& .MuiRadio-colorSecondary.Mui-checked ": {
            color: " #ff6408"
        }
    }
}));

function RadioExample(props) {
    const classes = useStyles();


    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Box className={classes.wrapper}>
            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="0" control={<Radio />} label={props.label0} />
                    <FormControlLabel value="1" control={<Radio />} label={props.label1} />
                    {/* <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                    {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default RadioExample;
