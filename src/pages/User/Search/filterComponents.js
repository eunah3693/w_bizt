import { useTheme } from "@material-ui/styles";

export const ButtonColor = ({ clicked, ...props }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: `${
          clicked ? theme.palette.primary.blue : theme.typography.light
        }`,
        border: `1px solid ${theme.palette.primary.blue}`,
        color: `${clicked ? theme.typography.light : theme.typography.color}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        cursor: "pointer",
        borderRadius: "100px",
        marginBottom: "10px",
        marginRight: "5px",
        padding: "5px 10px",
        fontSize: "13px",
      }}
      {...props}
    >
      {props.label}
    </div>
  );
};

// export const ResetableSlider = (props) => {
//   return (
//     <Slider
//       value={distanceSlider}
//       onChange={(e, value) => {
//         setDistanceSlider(value);
//       }}
//       onChangeCommitted={() =>
//         setFilter({
//           [FILTER.start_distance]: distanceSlider[0],
//           [FILTER.end_distance]: distanceSlider[1],
//         })
//       }
//       valueLabelDisplay="auto"
//       marks={DistanceMark}
//       step={10}
//       min={0}
//       max={100}
//     />
//   );
// };
