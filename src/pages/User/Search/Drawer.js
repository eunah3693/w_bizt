import { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Drawer } from "@material-ui/core";
import { Tune } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

import FilterContent from "pages/User/Search/FilterContent";
import { FILTER } from "string/officeConstants";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "100vh",
    width: "100%",
    zIndex: "1002",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  topOffset: {
    flex: "0 0 56px",
  },
  topElement: {
    width: "100%",
    height: "56px",
    zIndex: "9999",
    backgroundColor: "white",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  topButtons: {},
  body: {
    flex: "1 1 auto",
    overflowY: "auto",
  },
  bottomOffset: {
    flex: "0 0 56px",
  },
  bottomElement: {
    zIndex: "9998",
    width: "100%",
    maxWidth: "730px",
    backgroundColor: "white",
    position: "fixed",
    height: "56px",
    bottom: "0px",
  },
  closeButton: { padding: 0, minWidth: 0 },
  resetButton: {
    color: `${theme.palette.primary.sub}`,
  },
  next: {
    backgroundColor: `${theme.palette.primary.navy}`,
    color: "white",
    borderRadius: "1px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "20px",
  },
}));

let resetCount = 0;
const filterDefault = {
  [FILTER.count]: 1,
  [FILTER.auto_accept]: "Y",
  [FILTER.start_price]: 0,
  [FILTER.end_price]: 100000,
  [FILTER.start_distance]: 0,
  [FILTER.end_distance]: 10000,
  [FILTER.start_date]: new Date(),
  [FILTER.end_date]: new Date(),
  [FILTER.checkin]: 8,
  [FILTER.options]: "회의실,프린터,팩스",
  resetter: resetCount,
};

/**
 * TDL
 * /search/filter url으로 이동 시 열림
 * /search로 돌아갈 시 닫힘
 */

export default function DrawerMenu() {
  const classes = useStyles();

  const { path } = useRouteMatch();
  const history = useHistory();
  const [filterState, setFilterState] = useState({ ...filterDefault });

  let lastPathname = history?.location.pathname.split("/");
  if (lastPathname) lastPathname = lastPathname[lastPathname.length - 1];

  return (
    <>
      <Link
        to={{ pathname: `${path}/filter`, search: history.location.search }}
      >
        <Button style={{ minWidth: 0 }}>
          <Tune />
        </Button>
      </Link>
      <Drawer
        anchor="right"
        open={lastPathname === "filter"}
        onClose={history.goBack}
      >
        <Box className={classes.list} role="presentation">
          <Box className={classes.topOffset}>
            <Box className={classes.topElement}>
              <Box px={2} className={`${classes.topButtons} SpaceBetween`}>
                <Button
                  className={classes.resetButton}
                  onClick={() => {
                    resetCount++;
                    setFilterState({ ...filterDefault });
                  }}
                >
                  검색 초기화
                </Button>
                <Button
                  className={classes.closeButton}
                  onClick={history.goBack}
                >
                  <CloseIcon />
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className={classes.body}>
            <FilterContent
              filter={filterState}
              setFilter={(newFilter) =>
                setFilterState({ ...filterState, ...newFilter })
              }
            />
          </Box>
          <Box className={classes.bottomOffset}>
            <Box className={`${classes.bottomElement} Padding10px FlexCenter`}>
              <Button
                className={classes.next}
                onClick={() => {
                  let queryParam = new URLSearchParams(
                    history?.location?.search
                  );
                  Object.entries(filterState).forEach(([key, value]) => {
                    queryParam.set(key, value);
                  });
                  history.replace({
                    pathname: path,
                    search: queryParam.toString(),
                  });
                }}
              >
                검색하기
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
