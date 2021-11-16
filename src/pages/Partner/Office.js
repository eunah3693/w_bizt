import React, { useState, useEffect, useContext } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import OfficeList from "pages/Partner/Office/OfficeList";
import { TTBContext } from "utility/contexts";
import OfficeComposeIndex from "./Office/OfficeComposeIndex";
import RoomDetail from "./Office/RoomDetail";

import { onResponseSuccess, requestBiztApi } from "utility/connectivity";

import addIcon from "Img/addIcon.svg";

const Usestyle = makeStyles((theme) => ({
  circle_wrap: {
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-end",
    paddingTop: "3px",
  },
  detail_circle: {
    width: "15px",
    height: "20px",
    marginRight: "5px",
  },
}));

export default function Reservation(props) {
  const { path } = useRouteMatch(); // /partner/office
  const classes = Usestyle();
  const history = useHistory();
  const setTtbOptional = useContext(TTBContext);
  const [office, setofficelist] = useState(null);

  let historyPath = history.location.pathname;

  useEffect(() => {
    if (historyPath === path) {
      requestBiztApi("/api/office", null, onResponseSuccess(setofficelist));
    }

    setTtbOptional({
      path: path,
      button: (
        <Link to={`${path}/compose`}>
          <div className={classes.circle_wrap}>
            <img
              alt="add room"
              src={addIcon}
              className={classes.detail_circle}
            />
            <span>오피스 등록</span>
          </div>
        </Link>
      ),
    });
  }, [historyPath, path]);

  return (
    <>
      <Route exact path={`${path}/`}>
        <Redirect to={path} />
      </Route>
      <Switch>
        <Route path={`${path}/compose`} component={OfficeComposeIndex} />
        <Route path={`${path}/([0-9]+)/room/([0-9]+)`} component={RoomDetail} />
        <Route path={path}>
          <Box
            style={{
              paddingTop: "20px",
            }}
          >
            {office &&
              office.map((data, idx) => {
                // debugger;
                let officeDetails = [
                  {
                    category: "주소",
                    content: data.office_address,
                  },
                  {
                    category: "",
                    content: data.office_address_detail,
                  },
                  // {
                  //   category: "등록호실",
                  //   content: data.seatTypes.length,
                  // },
                ];
                return (
                  <OfficeList
                    key={idx}
                    officeId={data.office_idx}
                    listTitle={data.office_name}
                    // listImg={"/" + data.images[0]}
                    listAlt="오피스"
                    {...data}
                  />
                );
              })}
          </Box>
        </Route>
      </Switch>
    </>
  );
}
