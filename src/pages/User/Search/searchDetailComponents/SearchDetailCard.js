import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

import Rating from "@material-ui/lab/Rating";

import { withStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

import CarouselSwiper from "appComponents/layout/CarouselSwiper";

import bookmark_on from "Img/bookmark_off.svg";
import bookmark_off from "Img/bookmark_on.svg";

import message from "Img/messageColor.svg";
import { requestBiztApi } from "utility/connectivity";

const useStyles = (theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
  headDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headTitle: {
    fontSize: "25px",
  },
  bookmarkIcon: {
    width: "25px",
  },
  infoDiv: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  info: {
    marginLeft: "5px",
  },
  detailDivWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    fontSize: "15px",
  },
  detailDiv: {
    width: "100%",
    marginBottom: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  detailTitle: {
    whiteSpace: "nowrap",
    width: "19%",
  },
  detailContents: {
    width: "81%",
  },
  optionButton: {
    fontSize: "13px",
    padding: "0 5px",
    borderRadius: " 100px",
    marginRight: " 5px",
    backgroundColor: ` ${theme.palette.primary.sub}`,
    color: "white",
    border: "none",
  },
  rateStar: {
    color: theme.palette.primary.sub,
    boxSizing: "border-box",
    marginRight: theme.spacing(1),
  },
  rateScore: {
    boxSizing: "border-box",
    fontWeight: "bold",
    fontSize: "15px",
    marginRight: theme.spacing(1),
  },
  reviews: {
    color: theme.palette.primary.helper,
    boxSizing: "border-box",
    fontSize: "15px",
  },
});

class SearchDetailCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bookMarkClicked: false,
    };
  }

  handleBookmarkClick() {
    this.setState({ bookMarkClicked: !this.state.bookMarkClicked });
    // 즐겨찾기 등록 api 호출
    requestBiztApi("/api/bookmark", {
      method: "POST",
      body: { office_idx: this.props.office_idx },
    });
  }

  configureDetails(detailInfoArr) {
    const classes = this.props.classes;
    return detailInfoArr?.map((data, index) => {
      // data.category.length is at max 4
      let numSpaces = data.category.length - 1;
      let emptyPx = (4 - data.category.length) * 0.92;
      return (
        <Box key={index} className={classes.detailDiv}>
          <div
            className={classes.detailTitle}
            style={{ letterSpacing: `${emptyPx / numSpaces}em` }}
          >
            {data.category}
          </div>
          <div className={`${classes.detail} ${classes.detailContents}`}>
            {data.content}
          </div>
        </Box>
      );
    });
  }

  getRoomNameList() {
    const rooms = this.props.rooms;
    if (!rooms.length) return "";
    let getRoomNameList = rooms?.map((item) => item.room_name);
    return getRoomNameList.toString().replace(/,/g, " / ");
  }

  configureOptionButtons() {
    const rooms = this.props.rooms;
    if (!rooms.length) return "";

    let totalOptionsSet = new Set();
    let totalOptionsEtc = new Set();

    rooms.forEach((item) => {
      item.option_set?.split(",").forEach(totalOptionsSet.add, totalOptionsSet);
      item.option_etc?.split(",").forEach(totalOptionsEtc.add, totalOptionsEtc);
    });

    let optionArr = Array.from(totalOptionsSet).concat(
      Array.from(totalOptionsEtc)
    );

    return optionArr.map((option, index) => (
      <Button key={index} className={this.props.classes.optionButton}>
        {option}
      </Button>
    ));
  }

  componentDidMount() {
    requestBiztApi(
      `/api/bookmark/${window.location.pathname.split("/")[2]}`,
      null,
      (res) => {
        console.log(res);
        this.setState({ bookMarkClicked: !!res?.data.length });
      }
    );
  }

  render() {
    const { classes, office } = this.props;

    if (!office) return "";
    var {
      office_name,
      office_image,
      office_address,
      office_address_detail,
      rating,
      review_count,
    } = office;
    rating = rating ? rating : 0;
    review_count = review_count ? review_count : 0;

    const detailInfoArr = [
      {
        category: "주소",
        content: `${office_address} ${office_address_detail}`,
      },
      {
        category: "운영호실",
        content: this.getRoomNameList(),
      },
      {
        category: "옵션",
        content: this.configureOptionButtons(),
      },
    ];

    return (
      <Box className={classes.wrapper}>
        <Box>
          <CarouselSwiper images={office_image} />
        </Box>
        <Box py={2}>
          <div className={classes.headDiv}>
            {/* 북마크 */}
            <div onClick={this.handleBookmarkClick.bind(this)}>
              <img
                className={classes.bookmarkIcon}
                src={this.state.bookMarkClicked ? bookmark_on : bookmark_off}
                alt="bookmark"
              />
            </div>
            {/* 메시지 - 클릭하였을 때 채팅방 개설 등의 로직이 누락됨. */}
            <Link to="/message/chat/123">
              <img className={classes.bookmarkIcon} src={message} alt="" />
            </Link>
          </div>
          <div>
            <p className={classes.headTitle}>{office_name}</p>
          </div>

          {/* 별점 및 리뷰 */}
          <Box my={1} className={classes.infoDiv}>
            <Rating
              size="medium"
              className={classes.rateStar}
              name="read-only"
              value={rating}
              readOnly
            />

            <p className={`${classes.info} ${classes.rateScore}`}>{rating}점</p>
            <p className={`${classes.info} ${classes.reviews}`}>
              {review_count}개
            </p>
            <Link
              to={{
                pathname: `${this.props.history.location.pathname}/reviews`,
                search: this.props.history.location.search,
              }}
            >
              <Box className={`${classes.info} ${classes.reviews}`} ml={1}>
                <p>리뷰 조회</p>
              </Box>
            </Link>
          </Box>

          {/* 운영시간, 운영호실, 옵션 */}
          <div className={classes.detailDivWrapper}>
            {this.configureDetails(detailInfoArr)}
          </div>
        </Box>
      </Box>
    );
  }
}

SearchDetailCard.propTypes = {
  office: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
};

export default withRouter(withStyles(useStyles)(SearchDetailCard));
