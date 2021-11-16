import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Select100 from "appComponents/interaction/Select100";
import OfficeListButtonRight from "appComponents/layout/OfficeListButtonRight";
// 파트너 이미지
import office from "Img/office.png";
import { requestBiztApi } from "utility/connectivity";

const useStyles = makeStyles((theme) => ({
  select_wrap: {
    backgroundColor: theme.palette.primary.gray,
    padding: "22px 17px",
  },
  line: {
    padding: "10px 2px 10px 1px;",
    backgroundColor: theme.typography.light,
  },
  Divider: {
    width: "95%",
    margin: "0 auto",
  },
  list_left_img: {
    width: "92px",
    height: "92px",
  },
}));

export default function Exit() {
  const classes = useStyles();
  const handleDragStart = (e) => e.preventDefault();
  const [Office, Officelist] = useState(null);
  const [reportPopup, setReportPopup] = useState(false);
  const [exit, exitlist] = useState([
    {
      img: "office",
      officename: "someoffice",
      reservationNumber: "123",
      room: "someroom",
      seat: "someseat",
      reservationTime: "09:00~12:00",
      reservationId: "123",
      exitTime: "2021.05.10",
      exit: true,
      review: true,
    },
    {
      img: "office",
      officename: "someoffice",
      reservationNumber: "123",
      room: "someroom",
      seat: "someseat",
      reservationTime: "09:00~12:00",
      reservationId: "123",
      exitTime: "2021.05.10",
      exit: true,
      review: true,
    },
    {
      img: "office",
      officename: "someoffice",
      reservationNumber: "123",
      room: "someroom",
      seat: "someseat",
      reservationTime: "09:00~12:00",
      reservationId: "123",
      exitTime: "2021.05.10",
      exit: true,
      review: true,
    },
  ]);

  useEffect(() => {
    requestBiztApi("/api/report/list", null, Officelist);
  }, []);
  function selectchange(selectedOption) {
    console.log(selectedOption.value);
  }
  return (
    <div>
      <div className={classes.select_wrap}>
        <Select100
          onChange={selectchange}
          options={Office?.map((reportData, idx) => ({
            label: reportData.officeName,
            value: reportData.officeName,
          }))}
          placeholder="등록 오피스 선택"
        />
      </div>

      {exit?.map((exitData, idx) => (
        <div key={idx}>
          <div className={classes.line}>
            <OfficeListButtonRight
              list_img={office}
              list_bottom_btn_img="/mess.svg"
              list_alt="오피스"
              list_title={exitData.officename}
              status="대기중"
              interaction={{ text: "사용자리뷰", onClick: () => {} }}
              details={[
                { category: "예약번호", content: exitData.reservationNumber },
                { category: "이용호실", content: exitData.room },
                { category: "예약시간", content: exitData.reservationTime },
                { category: "예약자", content: exitData.reservationId },
                { category: "퇴실시간", content: exitData.exitTime },
              ]}
            />
          </div>
          <Divider className={classes.Divider}></Divider>
        </div>
      ))}
    </div>
  );
}
