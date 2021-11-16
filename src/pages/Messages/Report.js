import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Select100 from "appComponents/interaction/Select100";
import Textarea from "appComponents/interaction/TextArea";
import ReportCard from "pages/Messages/ReportCard";
import { requestBiztApi } from "utility/connectivity";

// 파트너 이미지
import office from "Img/office.png";
const useStyles = makeStyles((theme) => ({
  selet_wrap: {
    backgroundColor: theme.palette.primary.gray,
    padding: "22px 17px",
  },
  line: {
    padding: "10px 2px 15px 1px;",
    backgroundColor: theme.typography.light,
  },
  Divider: {
    width: "100%",
    margin: "0 auto",
  },
}));

export default function Report() {
  const classes = useStyles();

  const [report, reportlist] = useState(null);
  const [findOffice, findOfficelist] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    requestBiztApi("/api/report/list", null, reportlist);
  }, []);

  function selectchange(selectedOption) {
    findOfficelist(selectedOption.value);
  }

  return (
    <div>
      <div className={classes.selet_wrap}>
        <Select100
          onChange={selectchange}
          options={report?.map((reportData, idx) => ({
            label: reportData.officeName,
            value: reportData.officeName,
          }))}
          placeholder="등록 오피스 선택"
        />
      </div>

      {report?.map((reportData, idx) => (
        <div key={idx}>
          <div>
            <div className={classes.line}>
              <ReportCard
                list_img={office}
                list_title={reportData.reservationId}
                details={[
                  { category: "오피스", content: reportData.officeName },
                  {
                    category: "이용호실",
                    content: `${reportData.seatName}/${reportData.seatNumber}`,
                  },
                  { category: "예약자", content: "kimm***" },
                ]}
                report_txt={reportData.category}
                color="true"
              />
            </div>
            <Divider className={classes.Divider}></Divider>
          </div>
        </div>
      ))}
    </div>
  );
}
