import React from "react";

import styled from "styled-components";

import { useEffect, useState } from "react";
import { RecruitDetail } from "../../API/GatherAPI";
import useStore from "../../status/store";
import { useNavigate, useParams } from "react-router-dom";
import { GetComment, CreateComment,BoardDelete} from "../../API/BoardAPI";

const GatherDetail = () => {
  const [data, setData] = useState(null);
  const { gatherIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [userInput, setUserInput] = useState("");
  const Navigate = useNavigate();
  const currentUserIdx = useStore((s) => (s.user ? s.user.userIdx : null));
  const [boardIndex, setBoardIndex] = useState(null);

  useEffect(() => {
    const detailData = async () => {
      const response = await RecruitDetail({ gatherIdx });
      setData(response.data);
      setBoardIndex(response.data.boardIdx);
    };
    detailData();
  }, [gatherIdx]);

useEffect(() => {
    const getComments = async () => {
      if (boardIndex) { // boardIndex가 존재할 때만 댓글을 가져옴
        const Comments = await GetComment({boardIdx: boardIndex});
        setComments(Comments.data);
      }
    };
    getComments();
  }, [boardIndex])

  const hanleUserInput = async (event) => {
    setUserInput(event.target.value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    await CreateComment({ boardIdx: boardIndex, content: userInput });
    setUserInput("");
    const Comments = await GetComment({ boardIdx: boardIndex });
    setComments(Comments.data);
    setUserInput("");
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    const Check = window.confirm("삭제하시겠습니까?");
    if (Check) {
      const response = await BoardDelete({ boardIdx: boardIndex });
      if (response.status === 200) {
        Navigate("/gather");
        window.alert("삭제되었습니다");
      }
    }
  }

  const isAuthor = data ? data.userIdx === currentUserIdx : null;

  if (data) {
  return (
    <DetailMain>
      <button onClick={() => console.log(isAuthor,boardIndex, "작성자 확인")}>
        작성자 확인
      </button>
      <button>수정 </button>
      <button onClick={deleteHandler}>삭제 </button>
      <hr />
      <h1>GatherDetail</h1>
      <p>글 번호 : {gatherIdx}</p>
      <h1>제목 : {data.title}</h1>
      <h3>작성자 : {data.nickname}</h3>
      <h3>내용 : {data.content}</h3>
      <h3>게시일 : {data.registDate}</h3>
      <h3>마감일 : {data.endDate}</h3>
      {data.genreName1 && <h3># {data.genreName1}</h3>}
      {data.genreName2 && <h3># {data.genreName2}</h3>}
      {data.genreName3 && <h3># {data.genreName3}</h3>}
      <h3>{data.position}</h3>
      <div>
        <p>댓글</p>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={hanleUserInput}
            placeholder="댓글을 입력해주세요"
          />
          <button type="submit">등록</button>
        </form>
      </div>
    </DetailMain>
  );}
  else {
    return <div><p>로딩중</p></div>;
  }
};

export default GatherDetail;

const DetailMain = styled.div`
  padding-top: 15px ;
`