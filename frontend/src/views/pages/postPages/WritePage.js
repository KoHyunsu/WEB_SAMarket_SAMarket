/* 사용자가 게시물을 작성하는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  getInitialPostInfo,
  getPostInfoUpdater
} from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import Content from "views/components/post/Content";

export default function WritePage() {
  // Posting 을 작성하는 페이지
  const [info, setInfo] = useState(
    getInitialPostInfo(useSelector(state => state.sign.userInfo))
  ); // 정해진 포맷을 받음
  const updateInfo = getPostInfoUpdater(info, setInfo);

  return (
    <Fragment>
      <div className="postHeadBack backdropBlur">
        <BackBtn />
        <div className={`writeHead ${info.contents.title ? "" : "emptyTitle"}`}>
          {info.contents.title ? info.contents.title : "포스팅 제목"}
        </div>
      </div>
      <div className="postingInfo">
        <form className="postingBack">
          <Content info={info} disable={true} />
          <PostForm info={info} updateInfo={updateInfo} />
        </form>
      </div>
    </Fragment>
  );
}

const InputTitle = styled.div`
  position: relative;
  right: 35px;
  margin-top: 25px;
  font-size: 14px;
  color: #05b0ea;
  text-align: right;
`;

function PostForm({ info, updateInfo }) {
  return (
    <div>
      <InputTitle>포스팅 간판</InputTitle>
      <PostTypeSelector updateInfo={updateInfo} />
      <input
        placeholder={"*포스팅 제목"}
        value={info.contents.title}
        onChange={e => updateInfo({ title: e.target.value })}
        className={`postInput ${
          info.contents.title === undefined || info.contents.title ? "" : "WARN"
        }`}
      />
      <input
        placeholder={info.type === "sell" ? "*가격" : "*한 줄 요약"}
        type={info.type === "sell" ? "number" : "text"}
        value={info.contents.sub}
        onChange={e => updateInfo({ sub: e.target.value })}
        className={`postInput ${
          info.contents.sub === undefined || info.contents.sub ? "" : "WARN"
        }`}
      />
      <InputTitle># 태그</InputTitle>
      <div>태그를 하나씩 여러 개 입력하도록</div>
      <InputTitle>색상 설정</InputTitle>
      <div>font back tag 3 가지</div>
      <InputTitle>내용</InputTitle>
      <div>줄 바꿈 가능한 글로 입력가능하도록</div>
      <button className="btn postSubmitBtn" type="submit" disabled={true}>
        강군로드에 게시하기
      </button>
    </div>
  );
}

function PostTypeSelector({ updateInfo }) {
  const [curr, setCurr] = useState("post");
  const selectType = e => {
    updateInfo({ type: e.target.name });
    setCurr(e.target.name);
  };
  const types = [
    ["post", "일반"],
    ["adv", "광고"],
    ["sell", "판매"]
  ];

  return (
    <div className="typeSelector">
      {types.map((type, idx) => (
        <button
          className={`btn typeBtn ${type[0] === curr ? "selectedType" : ""} ${
            ["leftT", "centerT", "rightT"][idx]
          }`}
          onClick={selectType}
          type="button"
          name={type[0]}
        >
          {type[1]}
        </button>
      ))}
    </div>
  );
}
