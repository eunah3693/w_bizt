import React, { useState, useEffect } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import MyPageMenu from "pages/MyPage/MyPageMenu";
import Calculate from "pages/MyPage/Calculate";
import Reviews from "pages/MyPage/Reviews";
import Post from "pages/MyPage/Post";

import { requestBiztApi } from "utility/connectivity";
import Event from "pages/MyPage/Event";

export default function MyPage() {
  let { path } = useRouteMatch();
  const [account, setAccount] = useState(null);

  const menuItems = {
    //acount settings 추가 필요
    announce: {
      category: "announces",
      text: "공지사항",
      path: `${path}/announces`,
    },
    event: { category: "events", text: "이벤트", path: `${path}/events` },
    payment: {
      category: "payments",
      text: "정산 관리",
      path: `${path}/calculate`,
    },
    reviews: {
      category: "reviews",
      text: "리뷰 관리",
      path: `${path}/reviews`,
    },
    faq: { category: "faq", text: "자주 묻는 질문", path: `${path}/faq` },
  };

  useEffect(() => {
    requestBiztApi("/api/account1", null, setAccount, (response) => {
      if (response.status === 403) {
        console.log("Login required");
      }
    });
  }, []);

  return (
    <Switch>
      <Route path={menuItems.announce.path}>
        <Post category={menuItems.announce.category} />
      </Route>
      <Route path={menuItems.event.path} component={Event} />
      <Route path={menuItems.payment.path} component={Calculate} />
      <Route path={menuItems.reviews.path} component={Reviews} />
      <Route path={menuItems.faq.path}>
        <Post category={menuItems.faq.category} />
      </Route>

      <Route path={path}>
        <MyPageMenu account={account} menuItems={menuItems} />
      </Route>
    </Switch>
  );
}
