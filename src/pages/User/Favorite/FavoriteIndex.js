import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab, Box, useTheme } from "@material-ui/core";
import {
  ReservationCard,
  SearchCard,
} from "appComponents/interaction/CarouselCard";

import { AccountContext } from "utility/contexts";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
import AccessDenied from "appComponents/layout/AccessDenied";

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
    flexGrow: 1,
    height: "100%",
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "0",
      border: `1px solid ${theme.palette.primary.lightdark}`,
    },
  },
  TabPanelContainer: {
    overflowY: "auto",
    flex: "1 1 auto",
  },
  TabButton: {
    minWidth: "0",
  },
}));

const TabMenu = {
  RESERVATION: 0,
  FAVORITE: 1,
  VIEWED: 2,
};

export default function FavoriteIndex() {
  const { path } = useRouteMatch();

  const classes = useStyles();
  const theme = useTheme();
  const [account] = useContext(AccountContext);

  const [selected, setSelected] = useState(0);
  const [reservationData, setReservationData] = useState(null);
  const [bookmarkData, setbookmarkData] = useState(null);
  const [viewedData, setViewedData] = useState(null);

  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  var selectedData;
  switch (selected) {
    case TabMenu.RESERVATION:
      selectedData = reservationData;
      break;
    case TabMenu.FAVORITE:
      selectedData = bookmarkData;
      break;
    case TabMenu.VIEWED:
      selectedData = viewedData;
      break;
    default:
      selectedData = [];
  }

  useEffect(() => {
    switch (selected) {
      case TabMenu.RESERVATION:
        requestBiztApi(
          "/api/reservation",
          null,
          onResponseSuccess(setReservationData)
        );
        break;
      case TabMenu.FAVORITE:
        // favorite에 대한 무언가를 url에 추가해야함
        requestBiztApi(
          "/api/bookmark",
          null,
          onResponseSuccess(setbookmarkData)
        );
        break;
      case TabMenu.VIEWED:
        // 로컬 스토리지 이용할까
        let dataStr = window.localStorage.getItem("recent-view");
        if (dataStr) {
          setViewedData(JSON.parse(dataStr));
        }
        break;
      default:
        console.error("invalid tab selection: ", selected);
    }
  }, [selected, account]);

  return (
    <div className={classes.root}>
      <Tabs
        value={selected}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        style={{
          borderBottom: `1px solid ${theme.palette.primary.lightdark}`,
        }}
      >
        <Tab label="예약조회" className={classes.TabButton} />
        <Tab label="찜목록" className={classes.TabButton} />
        <Tab label="최근검색" className={classes.TabButton} />
      </Tabs>
      <Box className={classes.TabPanelContainer}>
        {account ? (
          selectedData?.length ? (
            <>
              <TabPanel value={selected} index={0}>
                {reservationData?.map((item, index) => (
                  <Link
                    key={index}
                    to={`${path}/myreservation/${item.reserv_idx}`}
                  >
                    <ReservationCard key={index} {...item} />
                  </Link>
                ))}
              </TabPanel>
              <TabPanel value={selected} index={1}>
                {bookmarkData?.map((item, index) => (
                  <SearchCard key={index} {...item} />
                ))}
              </TabPanel>
              <TabPanel value={selected} index={2}>
                {viewedData?.reverse().map((item, index) => (
                  <SearchCard key={index} {...item} />
                ))}
              </TabPanel>
            </>
          ) : (
            <Box width="100%" textAlign="center" my={30}>
              검색 결과가 없습니다 :(
            </Box>
          )
        ) : (
          <AccessDenied />
        )}
      </Box>
    </div>
  );
}
