import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";






const SeatStyle = makeStyles((theme) => ({
    wrap:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
    },
    line:{
        width:"100%",
        display:"flex",
        
    },
    title:{
        width:"40px",
        height:"40px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    box:{
        width:"40px",
        height:"40px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    use:{
        width:"30px",
        height:"30px",
        
        backgroundColor:theme.palette.primary.sub,
    },
    notuse:{
        width:"30px",
        height:"30px",
        backgroundColor:theme.palette.primary.gray,
    }
    
}));

function Seat(props) {
  const classes = SeatStyle();
  // const [value, setValue] = React.useState({});
  var title=["","A","B","C","D","E","F","G"];
  var txt=[props.number,<div   className={classes.use}></div>,<div  className={classes.notuse}  ></div>,<div  className={classes.use}  ></div>,<div className={classes.notuse}  ></div>,<div className={classes.notuse}  ></div>,<div className={classes.use}  ></div>,<div className={classes.use}  ></div>];

  var title_control=props.title_control;
  return (
  <div className={classes.wrap}  >
      <div >

      {title_control && <div className={classes.line} >
        {/* 알파벳 */}
        {title.map((val, idx) => (
            <div className={classes.title} key={idx}>
            {val}
            </div>
        ))}
      </div>}
      <div className={classes.line} >
        {/* 숫자+좌석 */}
        {txt.map((val, idx) => (
            <div className={classes.box} key={idx}>
            {val}
            </div>
        ))}
       </div>
       </div>
    </div>);

}
export default Seat;
