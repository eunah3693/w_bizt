import { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import OnOffButton from "pages/Partner/Reservation/OnOffButton";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
// 파트너 이미지
import mess from "Img/mess.svg";

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: 0,
    minHeight: "auto",
    "&$expanded": {
      minHeight: 0,
    },
  },
  content: {
    margin: "0",
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    width: "100%",
  },
}))(MuiAccordionDetails);

const OfficeListButtonStyle = makeStyles((theme) => ({
  list_box: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  list_left_img: {
    marginRight: "12px",
    width: "100px",
    height: "100px",
  },
  list_right: {
    width: "72%",
    color: theme.typography.main,
    position: "relative",
  },
  list_top: {
    width: "100%",
    display: "flex",
    position: "relative",
  },
  list_title: {
    fontSize: "15px",
    fontWeight: "500",
    paddingRight: "15px",
    letterSpacing: "-1px",
  },
  list_right_btn: {
    position: "absolute",
    top: "-2px",
    right: "-20px",
    fontWeight: "bold",
  },
  txt_left: {
    width: "75px",
    textAlign: "left",
    color: theme.typography.dark,
    fontSize: "13px",
    wordSpacing: "1px",
    letterSpacing: "1px",
  },
  txt_right: {
    color: theme.typography.main,
    fontSize: "13px",
    fontWeight: "500",
  },
  list_bottom_btn: {
    position: "absolute",
    right: "0",
    bottom: "0",
    "& img": {
      width: "24px",
      height: "24px",
    },
  },
  button_wrap: {
    width: "100%",
    padding: "5px 16px 15px 16px",
    display: "flex",
    justifyContent: "space-around",
  },
  list_btn: {
    display: "flex",
    boxSizing: "border-box",
    padding: "2px 0px",
    fontWeight: "500",
    "& div": {
      marginRight: "3px",
      borderRadius: "9px",
      lineHeight: "155%",
      boxSizing: "content-box",
      padding: "0px 10px",
      fontSize: "12px",
    },
  },
  bg_btn: {
    backgroundColor: theme.palette.primary.sub,
    color: theme.typography.light,
  },
  outline_btn: {
    border: `1px solid ${theme.palette.primary.sub}`,
    color: theme.typography.main,
  },
}));

const StatusToText = {
  ing: "승인요청",
  before: "입실전",
  cancel: "예약취소",
  use: "이용중",
  after: "퇴실완료",
};

export default function ReservationListItem(props) {
  const classes = OfficeListButtonStyle();
  // const [value, setValue] = useState({});
  const [expand, expand_change] = useState(true);

  var { status, review } = props;
  var { title, img, cardDetails, mess_link } = props;
  const [expanded, setExpanded] = useState("panel1");

  const expandShow = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    expand_change(newExpanded ? false : true);
  };

  function renderButton(status, review) {
    if (status === "before") {
      return <OnOffButton>예약 취소</OnOffButton>;
    } else if (status === "after") {
      if (review) {
        return <OnOffButton>리뷰 작성</OnOffButton>;
      }
    }
  }

  const reservStatus = StatusToText[status];

  return (
    <Accordion
      square
      expanded={expanded === "panel2"}
      onChange={expandShow("panel2")}
    >
      <Box className={classes.list_box} p={2}>
        <img src={img} alt="reservation" className={classes.list_left_img} />
        <Box pl={1.5} className={classes.list_right}>
          <Box className={classes.list_top} pb={0.5}>
            <span className={classes.list_title}>{title}</span>
            <div className={classes.list_btn}>
              {reservStatus && (
                <div className={classes.outline_btn}>{reservStatus}</div>
              )}
              {review && <div className={classes.bg_btn}>사용자리뷰</div>}
            </div>
            {(status === "before" || (status === "after" && review)) && (
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                className={classes.list_right_btn}
              >
                {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </AccordionSummary>
            )}
          </Box>
          <Box className={classes.list_bottom}>
            {cardDetails?.map((detail, idx) => (
              <Box key={idx} display="flex" pb={0.5}>
                <div className={classes.txt_left}>{detail.category}</div>
                <div className={classes.txt_right}>{detail.content}</div>
              </Box>
            ))}
            <Link to={mess_link} className={classes.list_bottom_btn}>
              <img src={mess} alt="대화창" />
            </Link>
          </Box>
        </Box>
      </Box>
      <AccordionDetails className={classes.button_wrap}>
        {renderButton(status, review)}
      </AccordionDetails>
    </Accordion>
  );
}
