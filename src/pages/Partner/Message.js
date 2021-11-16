import React , { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Paper, Tabs, Tab, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Chat from "pages/Messages/Chat";
import Alarm from "pages/Messages/Alarm";
import Exit from "pages/Messages/Exit";
import Report from "pages/Messages/Report";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    backgroundColor: theme.palette.primary.gray,
  },

  tabContainer: {
    zIndex: 1,
    background: theme.typography.light,
    flex: "0 0 48px",
  },
  contentContainer: {
    overflowY: "auto",
    flex: "1 1 1 auto",
  },
  tabbox: {
    position: "relative",
  },
  tab: {
    minWidth: "25%",
    color: theme.typography.main,
    fontWeight: "500",
  },
  tabDivider: {
    width: "100%",
    display: "inline-block",
    height: "2px",
    position: "absolute",
    left: "0px",
    bottom: "0px",
    backgroundColor: theme.palette.primary.gray,
  },
}));

export default function Message() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(0);
  const [controll, controller] = React.useState(true);
  const scrollRef = useRef();
  function Change() {
    controller(false);
  }
  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.tabContainer}>
        <Tabs
          className={classes.tabbox}
          value={selected}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="메세지" className={classes.tab} />
          <Tab label="알림" className={classes.tab} />
          <Tab label="퇴실" className={classes.tab} />
          <Tab label="신고" className={classes.tab} />
          <span className={classes.tabDivider}></span>
        </Tabs>
      </Paper>

      <Box className={classes.contentContainer}  ref={scrollRef}>
        <TabPanel className={classes.content} value={selected} index={0}>
          <Chat scrollRef={scrollRef} ></Chat>
        </TabPanel>
        <TabPanel className={classes.content} value={selected} index={1}>
          <Alarm></Alarm>
        </TabPanel>
        <TabPanel className={classes.content} value={selected} index={2}>
          <Exit></Exit>
        </TabPanel>
        <TabPanel className={classes.content} value={selected} index={3}>
          <Report></Report>
        </TabPanel>
      </Box>
    </div>
  );
}
