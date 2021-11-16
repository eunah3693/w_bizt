import { app_setProgressBar } from "./ApplicationInterface";

export const backendUrl = "http://localhost:8080";

export const addressAutoCompleteApi =
  "https://www.juso.go.kr/searchExt/rnAutocomplete.do";
export const geocodeApi =
  "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";
export const reverseGeocodeApi =
  "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc";

let crsf_token = null;

const domain = "https://bizt.co.kr";

export const fileApi = domain + "/api/file/";

const USE_LOCAL_API = process.env.NODE_ENV !== "production";

export function requestBiztApi(url, init, onSuccess, onFail, hideProgressBar) {
  if (!onSuccess) onSuccess = () => {};
  if (!onFail) onFail = () => {};
  if (!init) init = {};

  if (!process.env.NODE_ENV === "production")
    init.headers["x-crsf-token"] = crsf_token;

  if (init.method === "GET" || !init.method) {
    //GET type request cannot have body
    init.body = null;
  } else if (init.method !== "POST") {
    init.header["Content-Type"] = "application/json";
    init.header["Accept"] = "application/json";
  }

  // 테스트용 환경
  if (USE_LOCAL_API && typeof url === "string" && !url.includes("http")) {
    url = domain + url;
  }

  // console.log(1);
  if (process.env.NODE_ENV !== "production") console.log(url);
  if (hideProgressBar) app_setProgressBar(true);
  fetch(url, init)
    .then((res) => {
      if (hideProgressBar) app_setProgressBar(true);
      if (res.status === 200) return res.json();
      else onFail(res);
    })
    .then(onSuccess);
}

/**
 * @param {"/~~"} path '/' 으로 시작하는 pathname
 * @param {*} params 페러미터의 key: value를 담고있는 object
 * @returns {URL}
 */
export function constructUrl(path, params) {
  let url = new URL(path, domain);

  url.search = new URLSearchParams(params);
  return url;
}

export function pingBiztApi(callback) {
  requestBiztApi(
    "/api/ping",
    null,
    (data) => {
      crsf_token = data.token;
      callback?.(data);
    },
    null,
    true
  );
}

export function setToken(newValue) {
  crsf_token = newValue;
}

export function onResponseSuccess(run) {
  return (res) => {
    if (res.result !== "00") {
      console.error(res.message);
      return;
    }
    run(res.data);
  };
}
