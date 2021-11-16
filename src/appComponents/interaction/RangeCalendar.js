import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import ko from "date-fns/locale/ko";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "css/RangeCalendar.css";

// 캘린더 기간지정하는 캘린더
function RangeCalendar(props) {
  const theme = useTheme();

  return (
    <div className={"calendar_box"}>
      <DateRangePicker
        className={"calendar_wrap"}
        onChange={props.onChange}
        months={1}
        minDate={addDays(new Date(), -300)}
        maxDate={addDays(new Date(), 900)}
        direction="vertical"
        scroll={{ enabled: false }}
        ranges={props.ranges}
        showMonthAndYearPickers={false}
        monthDisplayFormat={"MMM YYY"}
        locale={ko}
        rangeColors={[`${theme.palette.primary.sub}`]}
      />
    </div>
  );
}

export default RangeCalendar;
