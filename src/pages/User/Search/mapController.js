const pinIconSvg = (isSelected) =>
  `<svg class="MuiSvgIcon-root" style="font-size: 35" viewBox="4.8 0 24 24 " aria-hidden="true">
<path ${
    isSelected ? `style="fill:#ff650c"` : ""
  } d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
</svg>`;

const pinIcon = (isSelected) => {
  const nMaps = window.naver.maps;
  if (!nMaps) return {};

  return {
    content: pinIconSvg(isSelected),
    size: new nMaps.Size(22, 35),
    anchor: new nMaps.Point(11, 35),
  };
};

const newMarker = (officeId, lat, lng, instruction) => {
  const nMaps = window.naver.maps;
  if (!nMaps) return {};

  let marker = new nMaps.Marker({
    officeId: officeId,
    position: new nMaps.LatLng(lat, lng),
    clickable: true,
    icon: pinIcon(false),
  });

  nMaps.Event.addListener(marker, "click", (e) => {
    instruction(officeId);
  });

  return marker;
};

const dataToMarkers = (data, instruction) => {
  return data.map((item) =>
    newMarker(item.officeId, item.lat, item.lng, instruction)
  );
};

function pxToKm(pixel, scale) {
  return (2 * pixel) / 2 ** (scale - 6);
}

function kmToLat(kilo) {
  let r = 6378.137;
  return (360 * kilo) / (r * 2 * Math.PI);
}

function pxToLat(pixel, scale) {
  return kmToLat(pxToKm(pixel, scale));
}

function refreshMarkerIcons(markers, selected) {
  if (!window.naver.maps) return {};
  markers.forEach((marker) => {
    let isSelected = marker.officeId === selected;
    marker.setIcon(pinIcon(isSelected));
  });
}

function getSelectedMarker(markers, selected) {
  if (!window.naver.maps) return {};
  for (let marker of markers) {
    if (marker.officeId === selected) {
      return marker;
    }
  }
}

function getSelectedCardId(selected) {
  return `searchBottomSheet-${selected}`;
}

function applyCoordinateOffset(coordinate, offset, mapZoom) {
  const nMaps = window.naver.maps;
  if (!nMaps) return {};
}

function computeCenter(coordinate, offset) {
  const nMaps = window.naver.maps;
  if (!nMaps) return {};

  let mapZoom = 15;
  let viewHeight = window.document.documentElement.clientHeight - 112;
  if (offset >= viewHeight / 2) offset = 48;

  let center = new nMaps.LatLng(
    coordinate.lat - pxToLat(offset, mapZoom),
    coordinate.lng
  );

  return center;
}

export {
  pinIcon,
  newMarker,
  dataToMarkers,
  refreshMarkerIcons,
  getSelectedMarker,
  getSelectedCardId,
  pxToLat,
  applyCoordinateOffset,
  computeCenter,
};
