import {
  addressAutoCompleteApi,
  reverseGeocodeApi,
} from "utility/connectivity";

/**
 * address로 들어온 string에 대한 자동완성 결과를 반환.
 *
 * @param {string} address 검색 string의 일부
 * @param {int} chunkIndex
 * @param {(array) => {}} callback
 */

function addressAutoComplete(address, chunkIndex, callback) {
  let url = new URL(addressAutoCompleteApi);

  let itemPerChunk = 10;

  url.searchParams.append("autoKeyword", address);
  url.searchParams.append("autoStart", chunkIndex * itemPerChunk);
  url.searchParams.append("autoRow", itemPerChunk);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
}

/**
 * 좌표에 대응하는 주소 정보 수신
 *
 * @param {lng, lat} coord
 * @param {({...}) => {}} callback
 */
function coordinateToAddress(coord, callback) {
  let url = new URL(reverseGeocodeApi);
  url.searchParams.append("coords", `${coord.lng},${coord.lat}`);
  url.searchParams.append("output", "json");
  fetch(url)
    .then((response) => response.json())
    .then(callback);
}

export { coordinateToAddress, addressAutoComplete };
