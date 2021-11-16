import { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { BTN_VARIANT } from "string/componentString";
import {
  ButtonColor,
  PaddingBox,
  CategoryLabel,
  mod,
} from "./selectorComponents";

const useStyles = makeStyles(() => ({
  slotWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

/**
 * open_time, close_time는 정수
 * selection과 disabled는 숫자의 배열
 * selection의 숫자에 대응하는 버튼은 variant="colored"가 들어가고
 * disabled의 숫자에 대응하는 버튼은 variant="disabled"가 들어간다.
 * @param {open_time, close_time, selection, disabled} props
 * @returns
 */

export default function UseTimeSelector(props) {
  const classes = useStyles();

  const { open_time, close_time, selection, onChange, disabled } = props;

  let amSlot = [];
  let pmSlot = [];

  for (let i = open_time; i < close_time; i++) {
    let formatted = i.toLocaleString("en-US", { minimumIntegerDigits: 2 });
    let variant = BTN_VARIANT.default;
    if (selection?.includes(i)) variant = BTN_VARIANT.colored;
    if (disabled?.includes(i)) variant = BTN_VARIANT.disabled;

    let toBePushed = i < 12 ? amSlot : pmSlot;
    toBePushed.push(
      <ButtonColor
        key={i}
        options={`${formatted}:00`}
        variant={variant}
        onClick={() => {
          if (variant === BTN_VARIANT.default) onChange(i, "add");
          else if (variant === BTN_VARIANT.colored) onChange(i, "remove");
        }}
      />
    );
  }

  let amLength = amSlot.length;
  for (let j = 0; j < mod(5 - amLength, 5); j++) {
    amSlot.push(<PaddingBox key={"padding-box-" + j} />);
  }

  let pmLength = pmSlot.length;
  for (let j = 0; j < mod(5 - pmLength, 5); j++) {
    pmSlot.push(<PaddingBox key={"padding-box-" + j} />);
  }

  return (
    <Fragment>
      {amSlot.length > 0 && (
        <Fragment>
          <CategoryLabel text="오전" />
          <Box className={classes.slotWrapper}>{amSlot}</Box>
        </Fragment>
      )}
      {pmSlot.length > 0 && (
        <Fragment>
          <CategoryLabel text="오후" />
          <Box className={classes.slotWrapper}>{pmSlot}</Box>
        </Fragment>
      )}
    </Fragment>
  );
}
