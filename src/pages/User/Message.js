import React, { useRef } from "react";

import { Paper, Tabs, Tab, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Alarm from "pages/Messages/Alarm";
import Chat from "pages/Messages/Chat";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`message-tabpanel-${index}`}
      aria-labelledby={`message-tab-${index}`}
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
    flexGrow: 1,
    height: "100%",
    minHeight: "100%",
    backgroundColor: theme.palette.primary.gray,
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
  },
  tabContainer: {
    flex: "0 0 48px",
    zIndex: 1,
    background: "white",
  },
  tabPanelContainer: {
    overflowY: "auto",
    flex: "1 1 auto",
  },
  chatPannel: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  tabButton: {
    minWidth: "0",
  },
  content: {
    "& .MuiBox-root": {
      padding: "0px",
    },
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
  const [selected, setSelected] = React.useState(0);
  const scrollRef = useRef();

  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.tabContainer}>
        <Tabs
          value={selected}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="대화" className={classes.tabButton} />
          <Tab label="알림" className={classes.tabButton} />
        </Tabs>
      </Paper>
      <Box
        ref={scrollRef}
        className={`${classes.tabPanelContainer} ${
          selected === 0 && classes.chatPannel
        }`}
      >
        <TabPanel value={selected} index={0}>
          <Chat scrollRef={scrollRef} />
        </TabPanel>
        <TabPanel value={selected} index={1}>
          <Alarm scrollRef={scrollRef} />
        </TabPanel>
      </Box>
    </div>
  );
}
