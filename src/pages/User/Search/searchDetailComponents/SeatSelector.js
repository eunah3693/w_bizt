import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { BTN_VARIANT } from "string/componentString";
import { ButtonColor, PaddingBox, mod } from "./selectorComponents";

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

export default function SeatSelector(props) {
  const classes = useStyles();

  const { seat_count, selection, onChange, disabled } = props;

  let seatSlot = [];

  for (let i = 1; i <= seat_count; i++) {
    let variant = BTN_VARIANT.default;
    if (selection?.includes(i)) variant = BTN_VARIANT.colored;
    if (disabled?.includes(i)) variant = BTN_VARIANT.disabled;

    seatSlot.push(
      <ButtonColor
        key={i}
        options={`${i}번`}
        variant={variant}
        onClick={() => {
          if (variant === BTN_VARIANT.default) onChange(i, "add");
          else if (variant === BTN_VARIANT.colored) onChange(i, "remove");
        }}
      />
    );
  }

  for (let j = 0; j < mod(5 - seat_count, 5); j++) {
    seatSlot.push(<PaddingBox key={"padding-box-" + j} />);
  }

  return <Box className={classes.slotWrapper}>{seatSlot}</Box>;
}
