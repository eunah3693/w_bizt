import { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Select, MenuItem, Box } from "@material-ui/core";
import { fileApi } from "utility/connectivity";

const styles = () => ({
  root: {
    width: "100%",
    "&:before": { display: "none" },
    "&:after": { border: "none" },
  },
  menu: {
    display: "flex",
    height: "80px",
  },
  thumb: {
    height: "80px",
    width: "80px",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
});

/**
 * props로 rooms에 대한 정보를 일괄 수령
 */
class RoomSelector extends PureComponent {
  render() {
    const { classes, rooms, ...others } = this.props;
    return (
      <Select className={classes.root} label="호실선택" {...others}>
        <MenuItem value={-1}>호실을 선택해주세요.</MenuItem>
        {rooms.map((room, index) => {
          const { room_name, fee_per_hour } = room;
          return (
            <MenuItem value={index} key={index}>
              <Box className={classes.menu}>
                <Box className={classes.thumb} mr={1}>
                  <img
                    src={fileApi + room.room_image?.[0]}
                    className={classes.image}
                    alt="thumb"
                  />
                </Box>
                <Box>
                  <Box>{room_name}</Box>
                  <Box>{fee_per_hour}원/시간</Box>
                </Box>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    );
  }
}

export default withStyles(styles)(RoomSelector);
