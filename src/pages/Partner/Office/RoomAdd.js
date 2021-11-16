import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import ImgUpload from "appComponents/interaction/ImgUpload";
import Button100 from "appComponents/interaction/Button100";
import CustomizedCheckbox from "appComponents/interaction/CircleCheckbox";
import MultipleSlider from "appComponents/interaction/MultipleSlider";

import { onResponseSuccess, requestBiztApi } from "utility/connectivity";

import "react-spring-bottom-sheet/dist/style.css";
import ListCard from "appComponents/layout/ListCard";
import { testing } from "App";
import Promotion from "./RoomAddComponent/Promotion";
import { optionLists } from "string/officeConstants";

const useStyles = makeStyles((theme) => ({
  listCardBox: {
    paddingBottom: "20px",
  },
  form_box: {
    backgroundColor: theme.palette.primary.gray,
    borderTop: `3px solid ${theme.palette.primary.lightdark}`,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
  },
  form_line: {
    height: "70px",
    display: "flex",
    alignItems: "center",
  },
  form_flex: {
    display: "flex",
  },
  form_subline: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
  },
  form_left: {
    width: "90px",
    fontSize: "15px",
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-2px",
    color: theme.typography.color,
  },
  form_checkbox: {
    paddingLeft: "4px",
  },
  form_input: {
    width: "300px",
    height: "47px",
    border: `1px solid ${theme.palette.primary.lightdark}`,
    paddingLeft: "10px",
  },
  form_txt: {
    fontSize: "14px",
    paddingLeft: "15px",
    fontWeight: theme.typography.fontWeightMedium,
  },
  option_box: {
    paddingBottom: "20px",
    paddingTop: "20px",
    "& input": {
      width: "360px",
      height: "35px",
      border: `1px solid ${theme.palette.primary.lightdark}`,
      paddingLeft: "10px",
    },
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  title_wrap: {
    display: "flex",
    alignItems: "center",
  },
  detail_circle: {
    color: theme.palette.primary.main,
    fontSize: "30px",
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: "-2px",
    color: theme.typography.color,
    fontSize: "15px",
  },
  select_circle_area: {
    display: "flex",
    flexWrap: "wrap",
  },
  select_circle: {
    backgroundColor: theme.palette.primary.sub,
    borderRadius: "20px",
    color: theme.typography.light,
    fontSize: "12px",
    padding: "0px 25px 0px 10px",
    marginRight: "5px",
    marginBottom: "5px",
    position: "relative",
    lineHeight: "160%",
    "&::after": {
      content: '"x"',
      color: theme.typography.light,
      position: "absolute",
      right: "8px",
      top: "-1px",
      fontSize: "15px",
    },
  },
  option_title: {
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    paddingBottom: "15px",
  },
  option_circle_area: {
    width: "90%",
    display: "flex",
    flexWrap: "wrap",
  },
  option_circle: {
    border: `1px solid ${theme.palette.primary.sub}`,
    borderRadius: "20px",
    fontSize: "12px",
    padding: "1px 10px",
    marginRight: "5px",
    marginBottom: "5px",
  },
  promotion: {
    backgroundColor: theme.palette.primary.gray,
    borderTop: `3px solid ${theme.palette.primary.lightdark}`,
    borderBottom: `3px solid ${theme.palette.primary.lightdark}`,
    position: "relative",
  },
}));

let roomImgFiles = [];
let seatImgFiles = [];
export default function RoomAdd() {
  const classes = useStyles();

  // url으로부터 officeId와 roomId 추출
  const history = useHistory();
  const pathArr = history.location.pathname.split("/");

  const pathComposeIndex = 3;
  let officeId = pathArr[pathComposeIndex + 1];
  let roomId = pathArr[pathComposeIndex + 3];

  if (testing) {
    officeId = 1;
    roomId = 1;
  }

  const [office, setOffice] = useState();

  // 템플릿 정보
  const [room_name, set_room_name] = useState();
  const [auto_accept, set_auto_accept] = useState("Y");
  const [open_time, set_open_time] = useState("00:00:00");
  const [close_time, set_close_time] = useState("24:00:00");
  const [fee_per_hour, set_fee_per_hour] = useState();
  const [fee_per_day, set_fee_per_day] = useState();
  const [seat_count, set_seat_count] = useState();
  const [option_set, set_option_set] = useState([]);
  const [option_etc, set_option_etc] = useState([]);
  const [promotion, set_promotion] = useState([]);

  // 이미지 데이터
  const [roomImgs, setRoomImgs] = useState([]);
  const [seatImgs, setSeatImgs] = useState([]);

  const [seatsDisabled, setSeatsDisabled] = useState(false);

  const [optionInputValue, setOptionInputValue] = useState("");

  //오피스 데이터 불러오기
  useEffect(() => {
    if (officeId) {
      requestBiztApi(
        "/api/office/" + officeId,
        null,
        onResponseSuccess(([data]) => {
          setOffice(data);
        })
      );
    }
  }, [officeId]);

  // roomId가 있을 시 기존 호실 정보 수정으로 간주
  // 호실 정보 불러오기
  /// 하고있던거. 통짜 room data에서 개별 대이터로 분리함
  /// ajax 를 통해 초기값을 set을 통해 삽입해야함.
  useEffect(() => {
    if (roomId) {
      requestBiztApi(
        "/api/room/" + roomId,
        null,
        onResponseSuccess((data) => {
          set_room_name(data.room_name);
          set_auto_accept(data.auto_accept);
          set_open_time(parseInt(data.open_time));
          set_close_time(parseInt(data.close_time));
          set_fee_per_hour(data.fee_per_hour);
          set_fee_per_day(data.fee_per_day);
          set_seat_count(data.seat_count);
          set_option_set(data.option_set?.split(","));
          set_option_etc(data.option_etc?.split(","));
          set_promotion(data.promotion);
          setSeatsDisabled(true);
        })
      );
    }
  }, [roomId]);

  function setOptionsWithoutDuplicate(value) {
    if (optionLists.includes(value)) {
      set_option_set([...new Set([...option_set, value])]);
    } else {
      set_option_etc([...new Set([...option_etc, value])]);
    }
  }

  return (
    <Box>
      {/* 기존 오피스 있을 시 해당 오피스 정보 노출 */}
      <div className={classes.listCardBox}>
        <ListCard
          disableInteraction
          // cardImage={`/${office.images[0]}`}
          title={office?.office_name}
          cardDetails={[
            {
              category: "오피스주소",
              content: office?.office_address,
            },
            {
              category: "",
              content: office?.office_address_detail,
            },
          ]}
        />
      </div>

      {/* 호실 타이틀 */}
      <Box p={2} className={classes.form_box}>
        <div className={classes.form_line}>
          <div className={classes.form_left}>호실 이름</div>
          <div>
            <input
              className={classes.form_input}
              style={{ width: "300px" }}
              type="text"
              placeholder="호실 이름을 입력해주세요"
              value={room_name ? room_name : ""}
              onChange={(e) => set_room_name(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.form_flex}>
          <div className={classes.form_left} />
          <div className={classes.form_checkbox}>
            <CustomizedCheckbox
              label="자동 승인"
              checked={!!auto_accept}
              onChange={(e) => set_auto_accept(e.target.checked)}
            />
          </div>
        </div>
      </Box>

      {/* 사진 업로드 */}
      <Box p={2}>
        <Box mb={1} className={classes.title}>
          호실 이미지
        </Box>
        <ImgUpload
          imgs={roomImgs}
          setImgs={setRoomImgs}
          fileContainer={roomImgFiles}
        />
      </Box>
      <Divider className={classes.Divider} />
      <Box p={2}>
        <Box mb={1} className={classes.title}>
          좌석배치 이미지
        </Box>
        <ImgUpload
          imgs={seatImgs}
          setImgs={setSeatImgs}
          fileContainer={seatImgFiles}
        />
      </Box>
      <Divider className={classes.Divider} />

      {/* 운영시간, 가격 및 자리 */}
      <Box p={2}>
        <Box mb={1} className={classes.title}>
          운영 시간
        </Box>
        <MultipleSlider
          setting={[parseInt(open_time), parseInt(close_time)]}
          onChange={(e, newValue) => {
            set_open_time(`${newValue[0]}:00:00`);
            set_close_time(`${newValue[1]}:00:00`);
          }}
        />
      </Box>
      <Divider className={classes.Divider} />

      <Box p={2}>
        <div className={classes.form_line}>
          <div className={classes.form_left}>이용 가격</div>
          <div>
            <input
              className={classes.form_input}
              style={{ width: "250px" }}
              type="text"
              placeholder="설정 가격을 입력하세요"
              value={fee_per_hour ? fee_per_hour : ""}
              onChange={(e) => set_fee_per_hour(e.target.value)}
            />

            <span className={classes.form_txt}>원/시간</span>
          </div>
        </div>
        <div className={classes.form_flex}>
          <div className={classes.form_left}></div>
          <div>
            <input
              className={classes.form_input}
              style={{ width: "250px" }}
              type="text"
              placeholder="설정 가격을 입력하세요"
              value={fee_per_day ? fee_per_day : ""}
              onChange={(e) => set_fee_per_day(e.target.value)}
            />

            <span className={classes.form_txt}>원/일</span>
          </div>
        </div>
      </Box>

      <Divider className={classes.Divider}></Divider>

      <Box p={2}>
        <div className={classes.form_line}>
          <div className={classes.form_left}>좌석 개수</div>
          <div>
            <input
              className={classes.form_input}
              style={{ width: "250px" }}
              type="text"
              placeholder="좌석 개수를 입력하세요"
              disabled={seatsDisabled}
              value={seat_count ? seat_count : ""}
              onChange={(e) => set_seat_count(e.target.value)}
            />

            <span className={classes.form_txt}>개</span>
          </div>
        </div>
        <div className={classes.form_subline}>
          <div className={classes.form_left}></div>
          <div>* 좌석개수는 수정불가능합니다</div>
        </div>
      </Box>
      <Divider className={classes.Divider}></Divider>

      {/* 호실 옵션 등제 */}
      <Box className={classes.option_box}>
        <Box p={2} className={classes.title}>
          운영 옵션
        </Box>
        <Box pb={2} pl={2}>
          <div className={classes.option_circle_area}>
            {optionLists.map((value, idx) => {
              if ([...option_set, ...option_etc].includes(value)) return false;
              return (
                <span
                  key={idx}
                  className={classes.option_circle}
                  onClick={() => setOptionsWithoutDuplicate(value)}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </Box>
        <Box mx={2} style={{ display: "flex" }}>
          <input
            type="text"
            value={optionInputValue}
            placeholder="기타 운영옵션을 입력하세요"
            onChange={(e) => setOptionInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && optionInputValue) {
                setOptionsWithoutDuplicate(optionInputValue);
                setOptionInputValue("");
              }
            }}
          />

          <Box
            style={{
              paddingLeft: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <AddCircleIcon
              style={{ fontSize: "28px" }}
              onClick={() => {
                if (optionInputValue) {
                  setOptionsWithoutDuplicate(optionInputValue);
                  setOptionInputValue("");
                }
              }}
            />
          </Box>
        </Box>

        <Box mx={2} mt={2} className={classes.select_circle_area}>
          {[...option_set, ...option_etc].map((value, idx) => {
            return (
              <div
                className={classes.select_circle}
                key={idx}
                data-name={value}
                onClick={() => {
                  if (idx < option_set.length) {
                    option_set.splice(idx, 1);
                    set_option_set([...option_set]);
                  } else {
                    option_etc.splice(idx - option_set.length, 1);
                    set_option_etc([...option_etc]);
                  }
                }}
              >
                {value}
              </div>
            );
          })}
        </Box>
      </Box>

      <Promotion
        promoData={promotion}
        classes={classes}
        set_promotion={set_promotion}
      />

      {/* 등록 */}
      <Box p={2}>
        <Button100>{roomId ? "수정하기" : "등록하기"}</Button100>
      </Box>
    </Box>
  );
}
