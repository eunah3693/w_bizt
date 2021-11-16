import { useState, useEffect, useRef } from "react";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import SearchTopToolBar from "pages/User/Search/SearchTopToolBar";
import SearchDetail from "pages/User/Search/searchDetailComponents/SearchDetail";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Map from "appComponents/Map";
import { SearchCard } from "appComponents/interaction/CarouselCard";

import {
  dataToMarkers,
  refreshMarkerIcons,
  getSelectedMarker,
  getSelectedCardId,
  computeCenter,
} from "./Search/mapController";

import {
  constructUrl,
  onResponseSuccess,
  requestBiztApi,
} from "utility/connectivity";

import {
  ScrollToTargetOnMount,
  ScrollToTopOnMount,
} from "utility/scrollHandler";

import "react-spring-bottom-sheet/dist/style.css";
import LightBottomSheet from "./Search/LightBottomSheet";
import Review from "pages/User/Review";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexFlow: "column",
    height: "100%",
    width: "100%",
    maxWidth: "inherit",
    overflow: "hidden",
  },
  head: {
    flex: "0 0 56px",
    height: "56px",
  },
  body: {
    flex: "1 1 auto",
    overflow: "hidden",
  },
  searchCard: {
    "& .MuiPaper-rounded": {
      borderRadius: "0",
      border: `1px solid ${theme.palette.primary.lightdark}`,
    },
  },
}));

/**
 * Map의 marker와 BottomSheet의 CarouselCard는 서로 1대1 대응하여야만 한다.
 *
 * @const {Int} selected      검색창에서 선택된 officeId
 * @const {Object} mapOption  Naver Map 설정값
 * @const {Array} officeData  하단창에 노출된 carousel card 들의 구성 정보
 * @const {Array} markers     Naver Map의 Overlay로 노출된 마커들의 배열
 * @returns
 */

let recentView;

export default function Search() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const history = useHistory();

  const sheetRef = useRef();

  const [mapCenter, setMapCenter] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [selected_arrIdx, setSelected_arrIdx] = useState(-1);

  const [officeData, setOfficeData] = useState(null);
  const [markers, setMarkers] = useState([]);

  //history에 기반하여 변경되는 값
  const searchParams = new URLSearchParams(history.location.search);
  const userLat = searchParams.get("latitude");
  const userLng = searchParams.get("longitude");

  useEffect(() => {
    recentView = window.localStorage.getItem("recent-view");
    if (!recentView) recentView = [];
    else recentView = JSON.parse(recentView);
  }, []);

  // 최초 render 시 지도의 중앙을 사용자 위치로 변경
  useEffect(() => {
    // 사용자 위치에 기반하여 지도 위치 재설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          // url에 현재 위치를 중앙값으로 추가
          let newSearch = new URLSearchParams(history.location.search);
          newSearch.set("latitude", data.coords.latitude);
          newSearch.set("longitude", data.coords.longitude);
          history.replace({
            pathname: history.location.pathname,
            search: "?" + newSearch.toString(),
          });
        },
        null,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, [navigator.geolocation]);

  // url의 search param이 변경될 때 마다 OfficeData와 Markers를 재설정함.
  useEffect(() => {
    // 백엔드에서 office 리스트에 대한 데이터 요청.
    let url = constructUrl("/api/office", history.location.search);
    requestBiztApi(
      url,
      null,
      onResponseSuccess((data) => {
        //officeData 설정
        setOfficeData(data);

        // 지도에 마커 구성
        // naver맵이 로딩되어있지 않을 시 실행하지 않음
        if (!window.naver.maps) return {};

        // api 호출 결과를 기반으로 마커에 필요한 데이터 제작
        let newMarkerData = data.map((item) => ({
          officeId: item.office_idx,
          lat: item.office_latitude,
          lng: item.office_longitude,
        }));

        // 수신한 office 위치정보에 대응하는 marker 제작 및 설정
        setMarkers(
          dataToMarkers(
            // 본인 위치에 대한 마킹
            // [{ officeId: -1, lat: userLat, userLng: lng }, ...newMarkerData],
            newMarkerData,
            (officeId) => {
              // onClick
              // search 컴포넌트의 selected를 해당 마커에 대응하는 officeId값으로 설정
              setSelected(officeId);

              // 오피스 상세정보를 보고있을 때 마커 클릭 시 리스트 뷰로 나가진다.
              history.replace({
                pathname: path,
                search: history.location.search,
              });

              // 상응하는 하단창의 카드로 스크롤 이동
              let selectedCard = document.getElementById(
                getSelectedCardId(officeId)
              );

              if (selectedCard) {
                selectedCard.scrollIntoView({ behavior: "smooth" });
              }
            }
          )
        );
      })
    );
  }, [history.location.search]);

  // url의 latitide, longitude가 변경될 시 지도 중앙 조정
  useEffect(() => {
    console.log(userLat, userLng);
    if (userLat && userLng && window.naver.maps) {
      let height = sheetRef?.current?.height
        ? sheetRef.current.height
        : (window.innerHeight - 56 * 2) / 2 - 56;
      setMapCenter(computeCenter({ lat: userLat, lng: userLng }, height / 2));
    }
  }, [userLat, userLng]);

  // Markers 혹은 selected 변경 시 marker들의 아이콘 재설정
  useEffect(() => {
    if (markers && window.naver.maps) {
      // 카드 혹은 마커 선택 시 모든 마커의 선택 여부 표기가 refresh 됨
      refreshMarkerIcons(markers, selected);
    }
  }, [markers, selected]);

  const cardId = (officeId) => `searchBottomSheet-${officeId}`;
  return (
    <Box className={`${classes.root} PositionRelative`}>
      <Box className={classes.head}>
        <SearchTopToolBar />
      </Box>
      <Box className={classes.body}>
        <Map mapCenter={mapCenter} markers={markers} />
      </Box>

      <LightBottomSheet
        maxHeight={window.innerHeight - 56}
        snapPoints={[
          window.innerHeight - 56,
          (window.innerHeight - 56) / 2,
          56,
        ]}
        defaultSnap={1}
        sheetRef={sheetRef}
        header={
          <div className="FlexStart">
            <Route path={`${path}/([0-9]+)`}>
              <Box>
                <ArrowBackIosIcon
                  className={classes.sideIcon}
                  onClick={history.goBack}
                />
              </Box>
            </Route>
          </div>
        }
      >
        <Switch>
          <Route path={`${path}/([0-9]+)/reviews`}>
            <Review />
          </Route>
          <Route path={`${path}/([0-9]+)`}>
            <SearchDetail office={officeData?.[selected_arrIdx]} />
            <ScrollToTopOnMount sheetRef={sheetRef} />
          </Route>
          <Route path={path}>
            <Box className={classes.searchCard}>
              {officeData
                ? officeData.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        to={{
                          pathname: `${path}/${item.office_idx}`,
                          search: history.location.search,
                        }}
                      >
                        <SearchCard
                          {...item}
                          onClick={(officeId) => {
                            // 카드 선택 시
                            // 1. 오피스 선택
                            setSelected(officeId);
                            setSelected_arrIdx(index);

                            // 2. 선택된 오피스에 해당하는 마커로 map center 이동
                            if (window.naver.maps) {
                              let selectedMarker = getSelectedMarker(
                                markers,
                                officeId
                              );
                              if (selectedMarker) {
                                setMapCenter(
                                  computeCenter(
                                    {
                                      lat: selectedMarker.position.lat(),
                                      lng: selectedMarker.position.lng(),
                                    },
                                    sheetRef.current.height / 2
                                  )
                                );
                              }
                            }

                            // 3. 해당 오피스에 대한 item 정보를 localStorage에 저장
                            let duplicateIndex = recentView.findIndex(
                              (recent) => recent.office_idx === item.office_idx
                            );
                            if (duplicateIndex !== -1)
                              recentView.splice(duplicateIndex, 1);
                            else if (recentView.length > 15) {
                              recentView.splice(0, 1);
                            }
                            recentView.push({ ...item });
                            window.localStorage.setItem(
                              "recent-view",
                              JSON.stringify(recentView)
                            );
                          }}
                        />
                      </Link>
                    );
                  })
                : "검색 결과가 없습니다 :("}
            </Box>
            <ScrollToTargetOnMount targetId={cardId(selected)} />
          </Route>
        </Switch>
      </LightBottomSheet>
    </Box>
  );
}
