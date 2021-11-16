import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { usePrevious, useDeepCompareEffect } from "utility/customHook";
import { pinIcon } from "pages/User/Search/mapController";

const useStyles = makeStyles((theme) => ({
  map: {
    height: "calc(100vh - 112px)",
    width: "100%",
    display: "inline-block",
  },
}));

var mapObject = null;

/**
 * Map Component는 React Component로는 <div id='search_map' /> 태그를 생성하는 것 외에는 기능이 없다.
 * 부모 Component로부터 Markers를 받아 naver map api와 통신하는 것을 목적으로한다.
 * 해당 Component는 rerender이 될 때 DOM이 변경되어서는 안된다.
 * @param {Markers, setSelected} props
 * @returns
 */

export default function Map(props) {
  const nMaps = window.naver.maps;
  var { markers, mapCenter, pinCenter } = props;

  const prevMarkers = usePrevious(markers);

  useEffect(() => {
    var option = Object.assign(
      {},
      {
        zoom: 15,
        scaleControl: false,
        logoControl: true,
        logoControlOptions: {
          position: nMaps?.Position.TOP_LEFT,
        },
        mapDataControl: false,
      }
    );
    mapObject = nMaps ? new nMaps.Map("search_map", option) : null;
    nMaps?.Event.addListener(mapObject, "tilesloaded", function (e) {
      var logo = document.getElementById("search_map");
      if (logo) {
        logo = [...logo.children].find((item) => {
          return (
            item.children[0] &&
            item.children[0].children[0] &&
            item.children[0].children[0].tagName === "A"
          );
        });
      }
      if (logo) {
        logo.style.marginTop = "10px";
      }
    });

    if (pinCenter && nMaps) {
      new nMaps.Marker({
        position: mapObject.center,
        clickable: true,
        icon: pinIcon(true),
      }).setMap(mapObject);
    }
  }, []);

  // props.markers가 변경될 시 기존 지도 마커를 제거하고 새로 수정된 마커를 노출.

  useEffect(() => {
    if (prevMarkers) {
      for (var prevMarker in prevMarkers) {
        prevMarkers[prevMarker].setMap(null);
      }
    }

    if (markers && mapObject) {
      for (let markerOfficeId in markers) {
        markers[markerOfficeId].setMap(mapObject);
      }
    }
  }, [markers]);

  // 상위 Component에서 mapOption을 변경할 시 작동 ?useDeepCompareEffect
  useEffect(() => {
    if (mapCenter) {
      mapObject?.setCenter(mapCenter);
    }
  }, [mapCenter]);

  const classes = useStyles();

  return (
    <Box>
      <div
        id="search_map"
        style={props.style}
        className={props.className || classes.map}
      ></div>
    </Box>
  );
}
