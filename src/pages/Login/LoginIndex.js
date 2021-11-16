import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { BottomSheet } from "react-spring-bottom-sheet";

import { useQuery } from "utility/customHook";

import Login from "./Login";
import Register from "./Register";
import Terms from "pages/Policy/Terms";
import Privacy from "pages/Policy/Privacy";
import Guide from "pages/Policy/Guide";

const useStyles = makeStyles((theme) => ({
  bottomSheet: {
    "& [data-rsbs-overlay], [data-rsbs-backdrop], [data-rsbs-root]:after": {
      zIndex: 103, // in front of everything(topToolBar 100, BotNavBar 102)
    },
    "& [data-rsbs-header]": {
      height: "56px",
      boxShadow: "none",
    },
  },
}));

export default function LoginIndex(props) {
  const { callback, forceOpen } = props;

  const query = useQuery();
  const history = useHistory();
  const [regdata, setRegdata] = useState({});
  const [pageToOpen, setPageToOpen] = useState();
  const [locationKeys, setLocationKeys] = useState([]);

  const requestLoginParam = query.get("request-login");
  const requestPolicyParam = query.get("policy");

  useEffect(() => {
    setPageToOpen(forceOpen || requestLoginParam || requestPolicyParam);
  }, [requestLoginParam, forceOpen, requestPolicyParam]);

  const classes = useStyles();

  // 하단창이 열린 후로 navigation 개수 집계.
  useEffect(() => {
    if (pageToOpen) {
      return history.listen((location) => {
        if (history.action === "PUSH") {
          setLocationKeys((keys) => [location.key, ...keys]);
        }

        if (history.action === "POP") {
          if (!locationKeys[1] || locationKeys[1] === location.key) {
            setLocationKeys(([_, ...keys]) => keys);

            // Handle forward event
          } else {
            setLocationKeys((keys) => [location.key, ...keys]);

            // Handle back event
          }
        }
      });
    }
  }, [pageToOpen, locationKeys]);

  // 하단창이 열려있을 떄만 locationkeys 집계
  useEffect(() => {
    if (!pageToOpen) {
      setLocationKeys([]);
    }
  }, [pageToOpen]);

  return (
    <BottomSheet
      open={pageToOpen}
      blocking
      className={classes.bottomSheet}
      snapPoints={({ maxHeight }) => [maxHeight]}
      initialFocusRef={false}
      onDismiss={() => {
        if (pageToOpen) {
          // request-login 쿼리가 입력되기 전으로 뒤로가기
          history.go(-(locationKeys.length + 1));
        }
        // pageToOpen를 false로 설정하지 않으면 history.goBack에 의해 query가 변경되어 render가 1번,
        // useEffect 구문에 의해 2번 이루어진다
        setPageToOpen(false);

        // 페이지가 종료될 때 요청된 콜백이 있을 시 호출한다.
        if (typeof callback === "function") callback();
      }}
      header={
        <Box className="SpaceBetween">
          {locationKeys.length > 0 && (
            <Box
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIosIcon />
            </Box>
          )}
        </Box>
      }
    >
      {(() => {
        switch (pageToOpen) {
          case "user":
            return <Login />;
          case "register":
            return <Register forceOpen={forceOpen} />;
          case "terms":
            return <Terms forceOpen={forceOpen} />;
          case "privacy":
            return <Privacy forceOpen={forceOpen} />;
          case "guide":
            return <Guide forceOpen={forceOpen} />;
          default:
            return null;
        }
      })()}
    </BottomSheet>
  );
}
