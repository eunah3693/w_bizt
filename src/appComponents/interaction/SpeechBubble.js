import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const detailStyle = makeStyles((theme) => ({
  detailDivWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  detailDiv: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    margin: "5px 0",
  },
  detailTitle: {
    width: "20%",
    fontWeight: "bold",
  },
  detailContents: {
    width: "80%",
  },
}));

const DetailedDesc = (props) => {
  const classes = detailStyle();
  return (
    <div className={`${classes.detailDiv}`}>
      <p className={`${classes.detail} ${classes.detailTitle}`}>
        {props.detailCategory}
      </p>
      <p className={`${classes.detail} ${classes.detailContents}`}>
        {props.detailContent}
      </p>
    </div>
  );
};

function renderDetailedDesc(dataList) {
  return dataList.map((data, index) => {
    return (
      <DetailedDesc
        key={index}
        detailCategory={data.category}
        detailContent={data.content}
      />
    );
  });
}

export default renderDetailedDesc;
