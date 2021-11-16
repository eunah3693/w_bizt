import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ImgUpload from "appComponents/interaction/ImgUpload";
import Textarea from "appComponents/interaction/TextArea";
import Button100 from "appComponents/interaction/Button100";
import PopupPostCode from "pages/Partner/PopupPostCode";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
import { useHistory } from "react-router-dom";
import { testing } from "App";
import { BottomSheet } from "react-spring-bottom-sheet";

const useStyles = makeStyles((theme) => ({
  form_box: {
    padding: "20px ",
    backgroundColor: theme.palette.primary.gray,
    borderTop: `3px solid ${theme.palette.primary.lightdark}`,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  form_line: {
    height: "58px",
    display: "flex",
    alignItems: "center",
  },
  form_left: {
    width: "90px",
    fontSize: "15px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-2px",
    color: theme.typography.color,
  },
  form_right: {
    "& input": {
      width: "300px",
      height: "47px",
      border: `1px solid ${theme.palette.primary.lightdark}`,
      paddingLeft: "10px",
    },
    position: "relative",
  },
  form_button: {
    width: "85px",
    height: "47px",
    position: "absolute",
    right: "0",
    top: "0",
    backgroundColor: theme.typography.sub,
    color: theme.typography.light,
    border: "0",
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  textarea: {
    padding: "0 16px",
  },
  root: {
    minHeight: "120px",
    "& .MuiOutlinedInput-multiline": {
      height: "110px",
    },
    "& .MuiOutlinedInput-inputMultiline": {
      height: "94px",
    },
  },
  title: {
    paddingLeft: "16px",
    paddingTop: "16px",
    paddingBottom: "10px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-2px",
    color: theme.typography.color,
    fontSize: "15px",
  },
  bottomSheet: {
    "&:after, [data-rsbs-overlay], [data-rsbs-backdrop]": {
      zIndex: 101,
      bottom: "56px",
    },
    "& [data-rsbs-header]": {
      height: "48px",
    },
  },
}));

let coordinate;
let regionCode;
export default function OfficeCompose(props) {
  const classes = useStyles();

  const [officeImgs, setOfficeImgs] = useState([]);
  let officeImgFiles = [];

  // 우편팝업창 상태 관리
  const [postalOpen, setPostalOpen] = useState();
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [office, setofficelist] = useState();

  const [officeName, setOfficeName] = useState();
  const [caution, setCaution] = useState();
  const [announce, setAnnounce] = useState();

  // 우편팝업창 닫기
  function closePostCode(address, newZipCode, bcode) {
    const geocoder = new window.daum.maps.services.Geocoder();

    // 주소 -> 좌표 변환
    geocoder.addressSearch(address, (result, status) => {
      // 좌표 변환 성공 시 주소값 저장.
      if (status === window.daum.maps.services.Status.OK) {
        coordinate = { x: result[0].x, y: result[0].y };
        regionCode = bcode;
        setAddress(address);
        setZipCode(newZipCode);
      } else {
        console.error("invalid address");
      }
      setPostalOpen(false);
    });
  }

  // 기존 오피스 수정 시 작동:
  // 1. url에서 오피스 번호 있을 시 추출
  const history = useHistory();
  let pathArr = history.location.pathname.split("/");

  let officeId = pathArr[pathArr.length - 1].match(/[0-9]+/)
    ? pathArr[pathArr.length - 1]
    : false;

  // 2. 기존 오피스 정보 수령
  useEffect(() => {
    if (officeId) {
      //테스트용
      if (testing) officeId = 1;
      //테스트용
      requestBiztApi(
        "/api/office/" + officeId,
        null,
        onResponseSuccess(([data]) => setofficelist(data))
      );
    }
  }, [officeId]);

  // 3. 기존 오피스 수정 시 text field에 기존 정보 삽입
  useEffect(() => {
    if (office) {
      setOfficeName(office.office_name);
      setCaution(office.precautions);
      setAnnounce(office.information);
      setAddress(office.office_address);
      setAddressDetail(office.office_address_detail);
    }
  }, [office]);

  function handleSubmit() {
    // let url = "/api/office";
    // if (officeId) url += `/${officeId}`;
    // requestBiztApi(url, {
    //   method: "POST",
    //   body: {
    //     office_name: officeName,
    //     office_address: address,
    //     office_address_detail: addressDetail,
    //     region_code: regionCode,
    //     office_latitude: coordinate.y,
    //     office_longitude: coordinate.x,
    //     precautions: caution,
    //     information: announce,
    //     available: "Y",
    //     // office_contact: "02-1234-5678"
    //   },
    // });
    // coordinate = null;

    requestBiztApi(
      "https://bizt.co.kr/api/ping",
      {
        header: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        method: "POST",
        body: { aa: "asdfasdf" },
      },
      console.log
    );
  }

  return (
    <Box>
      <Box className={classes.form_box}>
        <div className={classes.form_line}>
          <div className={classes.form_left}>오피스 이름</div>
          <div className={classes.form_right}>
            <input
              type="text"
              value={officeName}
              placeholder="오피스 이름을 입력해주세요"
              onChange={(e) => setOfficeName(e.target.value)}
            ></input>
          </div>
        </div>
        <div className={classes.form_line}>
          <div className={classes.form_left}>오피스 주소</div>
          <div className={classes.form_right}>
            <input type="text" placeholder="우편번호" value={zipCode}></input>
            <button
              className={classes.form_button}
              onClick={() => {
                setPostalOpen(true);
              }}
            >
              우편번호
            </button>
          </div>
        </div>
        <div className={classes.form_line}>
          <div className={classes.form_left}></div>
          <div className={classes.form_right}>
            <input
              type="text"
              placeholder="우편번호를 검색해주세요"
              value={address}
            ></input>
          </div>
        </div>
        <div className={classes.form_line}>
          <div className={classes.form_left}></div>
          <div className={classes.form_right}>
            <input
              type="text"
              placeholder="상세 주소를 입력해주세요"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            ></input>
          </div>
        </div>
      </Box>
      <Box p={2}>
        <ImgUpload
          imgs={officeImgs}
          setImgs={setOfficeImgs}
          fileContainer={officeImgFiles}
        />
      </Box>
      <Divider className={classes.Divider}></Divider>
      <Box>
        <div className={classes.title}>주의사항</div>
        <div className={classes.textarea}>
          <Textarea
            classes={classes}
            value={caution}
            placeholder="주의사항을 입력해주세요"
            onChange={(e) => setCaution(e.target.value)}
          ></Textarea>
        </div>
      </Box>
      <Divider className={classes.Divider}></Divider>
      <Box>
        <div className={classes.title}>이용안내</div>
        <div className={classes.textarea}>
          <Textarea
            classes={classes}
            value={announce}
            placeholder="이용안내를 입력해주세요"
            onChange={(e) => setAnnounce(e.target.value)}
          ></Textarea>
        </div>
      </Box>
      <Divider className={classes.Divider}></Divider>
      <Box p={2}>
        <Button100 onClick={handleSubmit}>
          {office ? "수정하기" : "등록하기"}
        </Button100>
      </Box>
      {/* 우편번호 */}
      {/* // 팝업 생성 기준 div */}
      <BottomSheet
        open={postalOpen}
        className={classes.bottomSheet}
        onDismiss={() => setPostalOpen(false)}
      >
        <Box id="popupDom" className={classes.popupDom} mt={1}>
          <PopupPostCode onClose={closePostCode} />
        </Box>
      </BottomSheet>
    </Box>
  );
}
