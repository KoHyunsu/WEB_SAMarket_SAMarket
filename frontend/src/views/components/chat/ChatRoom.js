import React, { useEffect, useState, createRef } from "react";
import { getPostById } from "views/modules/common/fakeServer";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rate from "views/components/rate/Rate";
import Post from "../post/Post";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import io from "socket.io-client";
import "./Chat.css";
import { NotFoundPage } from "views/pages/tempPages";
import SAHistory from "../rate/SAHistory";
import { sendChat } from "views/modules/chat/state";
import { getReviewByPostID } from "api";

let socket;

export default function ChatRoom({ chatRoom, messages, me, st }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  var el = createRef();
  const sendMessage = e => {
    e.preventDefault();
    dispatch(sendChat(message));
    setMessage("");
  };

  const [review, setReview] = useState({});
  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.scrollIntoView(false);
    });

    if (st.status == 3) {
      getReviewByPostID(chatRoom.post_id).then(response => {
        setReview(response.data);
      });
    }
  }, [messages, st.status]);
  if (chatRoom.post)
    return (
      <div className="chatRoom">
        {chatRoom.post && (
          <div className="chatPost">
            <Post info={chatRoom.post} hideBtn={true} />
          </div>
        )}
        <MessageList divRef={el} me={me} messages={messages} />
        {st.status == 1 && <Rate me={me} chatRoom={chatRoom} st={st} />}
        {st.status == 2 && "다른 구매자가 상품을 구매하였습니다."}
        {st.status == 3 && (
          <div className="historyContainer">
            <p style={{textAlign:"center"}}>리뷰를 확인하세요!</p>
            <SAHistory review={review} user={me} />
          </div>
        )}
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    );
  return null;
}
