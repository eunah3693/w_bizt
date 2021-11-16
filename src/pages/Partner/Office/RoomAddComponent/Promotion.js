import React from "react";
import { Box } from "@material-ui/core";
import PromotionCard from "./PromotionCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";

let today = new Date().toLocaleDateString("ko-KR");
const newPromoTemplate = {
  start_time: "00:00:00",
  end_time: "24:00:00",
  start_date: today,
  end_date: today,
  weeks: "월,화,수,목,금,토,일", // 일월화수목금토
};

export default class Promotion extends React.PureComponent {
  setPromotion(newPromotionData, idx) {
    let newPromoData = [...this.props.promoData];
    newPromoData.splice(idx, 1, newPromotionData);
    this.props.set_promotion(newPromoData);
  }

  deletePromotion(idx) {
    let newPromoData = [...this.props.promoData];
    newPromoData.splice(idx, 1);
    this.props.set_promotion([...newPromoData]);
  }

  render() {
    let { promoData, classes, set_promotion } = this.props;
    return (
      <Box pt={1} className={classes.promotion}>
        <div className={classes.title_wrap}>
          <Box p={2} className={classes.title}>
            프로모션 설정
          </Box>
          <AddCircleIcon
            className={classes.detail_circle}
            onClick={() => {
              set_promotion([{ ...newPromoTemplate }, ...promoData]);
            }}
          />
        </div>
        {promoData.map((item, idx) => {
          return (
            <PromotionCard
              key={idx}
              arrIdx={idx}
              data={item}
              setPromotion={this.setPromotion.bind(this)}
              deletePromotion={this.deletePromotion.bind(this)}
            />
          );
        })}
      </Box>
    );
  }
}
