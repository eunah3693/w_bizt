import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
    return `${value}시`;
}

export default function DiscreteSlider(props) {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Temperature"
                defaultValue={0}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={7}
                max={17}
            />
            {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
        </Box>
    );
}