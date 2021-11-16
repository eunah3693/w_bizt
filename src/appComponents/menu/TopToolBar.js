import React, { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Box,
  Toolbar,
  Divider,
  Button,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import mainlogo from "Img/mainlogo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
  },
  spotIcon: {
    width: "80px",
    height: "30px",
    marginTop: "5px",
  },
  title: {
    display: "flex",
    width: "100%",
    paddingInline: theme.spacing(2),
    boxSizing: "border-box",
    justifyContent: "space-between",
    color: theme.typography.color,
  },
  sideLeftIconContainer: {
    width: "30%",
    textAlign: "left",
    margin: "auto 0",
  },
  sideRightIconContainer: {
    width: "30%",
    textAlign: "right",
    fontSize: "13px",
    margin: "auto 0",
  },
  mainHeaderBox: {
    width: "40%",
    textAlign: "center",
    margin: "auto 0",
    "& h1": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  sideIcon: {
    display: "block",
  },
  mainHeader: {
    fontSize: " 17px",
  },
}));

/**
 * 상단바의 타이틀을 정하기 위한 참조 테이블.
 * 다음과 같은 구조를 갖는다.
 *
 * titleList = {
 *   titleObject,
 *   titleObject,
 *   ...
 * }
 *
 * titleObject =
 *   path: {
 *     text: "해당 path 의 제목"
 *     depth: titleList // 해당 path이하의 path들이 참조할 제목 리스트
 *   }
 */
const pageTitleList = {
  //유저
  favorite: { text: "즐겨찾기" },
  message: { text: "메시지" },
  mypage: {
    text: "마이페이지",
    depth: {
      calculate: {
        text: "정산 관리",
        depth: {
          tax: {
            text: "세금계산서 정보관리",
          },
        },
      },
      announces: {
        text: "공지사항",
      },
      faq: { text: "자주 묻는 질문" },
      events: { text: "이벤트" },
      payments: { text: "결제 관리" },
      "reviews-of-me": { text: "마이 리뷰" },
      reviews: { text: "리뷰 관리" },
      reports: { text: "자리 신고하기" },
    },
  },
  billing: { text: "결제하기" },

  //파트너
  office: {
    text: "오피스",
    depth: {
      number: {
        text: "호실 보기",
      },
      compose: {
        text: "오피스 추가",
        depth: {
          number: {
            text: "오피스 수정",
            depth: {
              room: {
                text: "호실 추가",
                depth: {
                  number: {
                    text: "호실 수정",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  reservation: { text: "예약 조회" },
};

/**
 * pageTitleList를 참조하여 상단 메뉴바 중앙에 노출될 제목 텍스트를 결정
 * pathname의 각 directory에 대하여 titleDict = pageTitleList에 있는지 비교한다.
 * 있을 시 해당 entry의 text 값을 잠정 title 값으로 설정하고 다음 directory에 대한 비교를 순차적으로 이어간다
 * 없을 시 기존 잠정 title값을 유지한다
 *
 * 만일 해당 entry에 depth 오브젝트가 있을 시 depth 오브젝트를 titleDict로 설정한다.
 * (즉 titleDict가 그 시점부터 pageTitleList를 대체한다)
 * 이를 통해 동일한 directory 이름에 대하여도 다른 hierarchical 구조 안에 있는 directory는 다른 title값을 보여줄 수 있다.
 *
 * @param {String} pathname
 * @returns {String} 상단바 중앙에 노출될 텍스트
 */
function getPageTitle(pathname) {
  let pathArr = getPathArray(pathname);
  let titleDict = pageTitleList;
  let title = "";

  pathArr.forEach((path) => {
    // 만일 1개 path가 숫자일 시 path를 "number" 으로 치환
    if (!isNaN(parseInt(path))) path = "number";

    if (titleDict[path]) {
      title = titleDict[path].text;

      if (titleDict[path].depth) {
        titleDict = titleDict[path].depth;
      }
    }
  });

  return title;
}

function getPathArray(pathname) {
  if (!pathname) return [];

  let [_, ...pathArr] = pathname.split("/");
  if (pathArr.length === 0) return [];

  if (pathArr[0] === "partner") [_, ...pathArr] = pathArr;

  return pathArr;
}

function computeGoBack(pathname) {
  return getPathArray(pathname).length > 1;
}

/**
 * 상단 메뉴바
 *
 * pathname에 따라 중앙에 노출되는 text 값이 변경됨.
 * pageTitleList를 수정해서 노출될 값 설정 가능.
 *
 *
 * 다음과 같은 사용을 통해 어느 Component에서든 상단바에 우측에 버튼을 추가할 수 있음.
 * import { useContext } from "react";
 * import { TTBContext } from "utility/contexts";
 *
 * function TTBButtonExample() {
 *   const { path } = useRouteMatch();
 *   const setTtbOptional = useContext(TTBContext);
 *
 *   useEffect(() => {
 *     setTtbOptional({ path: path, button: "asdf" });
 *   }, [path]);
 * }
 *
 * @param {optional: {path: "string", button: reactElement}} props
 * @returns
 */
export default function TopToolBar(props) {
  const history = useHistory();

  const [pageTitle, setPageTitle] = useState("");

  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    let pathname = history.location.pathname;
    setCanGoBack(computeGoBack(pathname));
    setPageTitle(getPageTitle(pathname));
  }, []);

  useEffect(() => {
    return history.listen(() => {
      let pathname = history.location.pathname;
      setCanGoBack(computeGoBack(pathname));
      setPageTitle(getPageTitle(pathname));
    });
  }, [history]);

  const classes = useStyles();
  return (
    <AppBar className={classes.root} elevation={0} position="relative">
      <Toolbar variant="dense" disableGutters>
        <Box className={classes.title}>
          <Box className={classes.sideLeftIconContainer}>
            {canGoBack && (
              <Box onClick={history.goBack}>
                <ArrowBackIosIcon className={classes.sideIcon} />
              </Box>
            )}
          </Box>
          <Box className={classes.mainHeaderBox}>
            {pageTitle ? (
              <h1 className={classes.mainHeader}>{pageTitle}</h1>
            ) : (
              <img className={classes.spotIcon} src={mainlogo} alt="" />
            )}
          </Box>
          <div className={classes.sideRightIconContainer}>
            {props.optional && (
              <Route exact path={props.optional.path}>
                {props.optional.button}
              </Route>
            )}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
