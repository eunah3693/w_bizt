import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import ChatRoomList from "pages/Messages/ChatRoomList";
import ChatDetail from "pages/Messages/ChatDetail";

import { AccountContext } from "utility/contexts";
import { onResponseSuccess, requestBiztApi } from "utility/connectivity";
import AccessDenied from "appComponents/layout/AccessDenied";

export default function Chat(props) {
  let { path } = useRouteMatch();
  const [account] = useContext(AccountContext);

  const history = useHistory();
  const pathArr = history.location.pathname.split("/");
  const chatroom_idx = pathArr[pathArr.length - 1];

  const [chatRooms, setChatRooms] = useState(null);

  useEffect(() => {
    requestBiztApi("/api/message/rooms", null, onResponseSuccess(setChatRooms));
  }, [account]);

  return account ? (
    <Switch>
      <Route path={`${path}/([0-9]+)`}>
        {chatroom_idx && (
          <ChatDetail
            {...props}
            chatRoomInfo={chatRooms?.find(
              (item) => item.chatroom_idx === chatroom_idx
            )}
          />
        )}
      </Route>
      <Route path={path}>
        <ChatRoomList {...props} chatRooms={chatRooms} />
      </Route>
    </Switch>
  ) : (
    <AccessDenied />
  );
}
