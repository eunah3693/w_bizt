import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { BTN_VARIANT } from "string/componentString";
import { Box } from "@material-ui/core";

const ButtonStyle = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    cursor: "pointer",
    padding: "10px 0",
    margin: "10px",
    width: "60px",
  },
}));

export function ButtonColor(props) {
  const theme = useTheme();
  const classes = ButtonStyle();

  let { variant } = props;
  if (!variant) variant = BTN_VARIANT.default;
  let btnStyle = {
    [BTN_VARIANT.default]: {
      border: `2px solid ${theme.palette.primary.d3border}`,
    },
    [BTN_VARIANT.disabled]: {
      backgroundColor: `${theme.palette.primary.lightdark}`,
      border: `2px solid ${theme.palette.primary.d3border}`,
    },
    [BTN_VARIANT.colored]: {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  };

  return (
    <div
      className={classes.root}
      onClick={props.onClick}
      style={btnStyle[variant]}
    >
      {props.options}
    </div>
  );
}

export const CategoryLabel = ({ text }) => (
  <p className="Margin0px SubtitleLeft " style={{ padding: "10px" }}>
    {text}
  </p>
);
export const PaddingBox = () => <Box width="60px" margin="10px" />;

export function mod(n, m) {
  return ((n % m) + m) % m;
}
