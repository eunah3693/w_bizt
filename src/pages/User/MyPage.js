import { Switch, Route, useRouteMatch } from "react-router-dom";

import MyPageMenu from "pages/MyPage/MyPageMenu";
import Payment from "pages/MyPage/Payment";
import Report from "pages/MyPage/Report";
import Post from "pages/MyPage/Post";
import Event from "pages/MyPage/Event";
import Review from "./Review";

export default function MyPage() {
  let { path } = useRouteMatch();

  const menuItems = {
    //acount settings 추가 필요
    announce: {
      category: "announces",
      text: "공지사항",
      path: `${path}/announces`,
    },
    event: {
      category: "events",
      text: "이벤트",
      path: `${path}/events`,
    },
    payment: {
      category: "payments",
      text: "결제관리",
      path: `${path}/payments`,
      login: true,
    },
    review: {
      category: "reviewsOfMe",
      text: "마이 리뷰",
      path: `${path}/reviews-of-me`,
      login: true,
    },
    faq: {
      category: "faq",
      text: "자주 묻는 질문",
      path: `${path}/faq`,
    },
    report: {
      category: "reports",
      text: "자리 신고하기",
      path: `${path}/reports`,
      login: true,
    },
  };

  return (
    <Switch>
      <Route path={menuItems.announce.path}>
        <Post category={menuItems.announce.category} />
      </Route>
      <Route path={menuItems.event.path} component={Event} />
      <Route path={menuItems.payment.path} component={Payment} />
      <Route path={menuItems.review.path} component={Review} />
      <Route path={menuItems.faq.path}>
        <Post category={menuItems.faq.category} />
      </Route>
      <Route path={menuItems.report.path} component={Report} />
      <Route path={path}>
        <MyPageMenu menuItems={menuItems} />
      </Route>
    </Switch>
  );
}
