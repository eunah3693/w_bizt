import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { imgUrl } from "placeHolder/tileData";
import { fileApi } from "utility/connectivity";

const useStyles = makeStyles({
  list_wrap: {
    width: "100%",
    display: "flex",
  },
  list_left: {
    width: "120px",
    height: "120px",
  },
  list_left_img: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
  },
  list_right: {
    width: "calc( 100% - 115px )",
    paddingLeft: "15px",
  },
  headTitle: {
    fontSize: "18px",
    margin: "0px 0 10px 0 ",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-bwtween",
    width: "100%",
    "& > div": {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "2px",
    },
  },
  detailTitle: {
    width: "25%",
    color: "darkgray",
  },
  detailContents: {
    width: "75%",
  },
});
function InfoCard(props) {
  const classes = useStyles();

  const { title, details, image } = props;

  return (
    <Box className={classes.list_wrap}>
      <Box className={classes.list_left}>
        <img
          alt="image1"
          src={fileApi + image}
          className={classes.list_left_img}
        />
      </Box>
      <Box className={classes.list_right}>
        <p className={classes.headTitle}>{title}</p>

        <div className={classes.details}>
          {details?.map((item, index) => {
            const { category, content } = item;
            return (
              <Box key={index}>
                <p className={classes.detailTitle}>{category}</p>
                <Box className={classes.detailContents}>{content}</Box>
              </Box>
            );
          })}
        </div>
      </Box>
    </Box>
  );
}

export default InfoCard;
