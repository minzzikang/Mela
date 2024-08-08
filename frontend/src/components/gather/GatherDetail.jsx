import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { RecruitDetail } from "API/GatherAPI";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetComment,
  CreateComment,
  BoardDelete,
  CommentDelete,
  checkBoardLike,
  BoardLike,
} from "API/BoardAPI";
import Button from "common/Button";
import { CreateChat } from "API/ChatAPI";
import Alarm from "assets/icons/Bell.png";
import Heart from "assets/icons/Heart.png";
import HeartFill from "assets/icons/HeartFill.png";
import Clock from "assets/icons/Clock.png";
import Trash from "assets/icons/Trash.png";
import Edit from "assets/icons/Edit.png";
import Eye from "assets/icons/Eye.png";
import BackArrow from "assets/icons/BackArrow.png";

const GatherDetail = () => {
  const [data, setData] = useState(null);
  const { gatherIdx } = useParams();
  const [comments, setComments] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const Navigate = useNavigate();
  const currentUserIdx = Number(localStorage.getItem("userIdx"));
  const [boardIndex, setBoardIndex] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    const detailData = async () => {
      const response = await RecruitDetail({ gatherIdx });
      setData(response.data);
      setBoardIndex(response.data.boardIdx);
      setLikeCount(response.data.likeNum);
      setIsAuthor(response.data.userIdx === currentUserIdx);
    };
    detailData();
  }, [gatherIdx, likeCount]);

  useEffect(() => {
    const getComments = async () => {
      if (boardIndex) {
        // boardIndex가 존재할 때만 댓글을 가져옴
        const Comments = await GetComment({ boardIdx: boardIndex });
        setComments(Comments.data);
      }
    };
    getComments();
  }, [boardIndex]);

  const hanleUserInput = async (event) => {
    setUserInput(event.target.value);
  };

  const commentDeleteHandler = async (commentIdx) => {
    try {
      await CommentDelete({ boardIdx: boardIndex, commentIdx });
      const response = await GetComment({ boardIdx: boardIndex });
      setComments(response.data);
    } catch (error) {}
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.length < 1) {
      window.alert("댓글을 입력해주세요");
      return;
    }
    await CreateComment({ boardIdx: boardIndex, content: userInput });
    setUserInput("");
    const Comments = await GetComment({ boardIdx: boardIndex });
    setComments(Comments.data);
    setUserInput("");
  };

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
  };

  const [isLiked, setIsLiked] = useState(null);
  useEffect(() => {
    if (currentUserIdx === null) {
      return;
    }
    if (boardIndex === null) {
      return;
    }
    const Likecheck = async () => {
      const res = await checkBoardLike({
        boardIdx: boardIndex,
        currentUserIdx,
      });
      if (res.data.message === "true") {
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
    };
    Likecheck();
  }, [boardIndex, currentUserIdx]);

  const BoardLikeHandler = async () => {
    const res = await BoardLike({ boardIdx: boardIndex, currentUserIdx });
    setLikeCount(res.data.likeNum);
    setIsLiked(!isLiked);
  };

  // 채팅 연결
  const [roomIdx, setRoomIdx] = useState("");
  const [otheruserid, setOtheruserid] = useState();

  const handleChat = async () => {
    const otheruserid = data.userIdx;

    try {
      const response = await CreateChat({ otheruserid: otheruserid });
      setRoomIdx(response);
      Navigate(`/message/${response}`);
      setOtheruserid("");
    } catch (err) {}
  };

  const goHome = async () => {
    Navigate("../");
  };

  ////////////
  if (data) {
    return (
      <DetailMain>
        <div className="title">
          <div className="title-btn">
            <h1>{data.title}</h1>
            <div className="chat-btn">
              {!isAuthor && (
                <Button text={"채팅연결"} width={"6rem"} onClick={handleChat} />
              )}
            </div>
          </div>
          <img
            src={BackArrow}
            alt="back-btn"
            className="back-btn"
            onClick={goHome}
          />
        </div>
        <div>
          <div className="profile">
            <h3>{data.nickname}</h3>
            <div className="info">
              <div className="infoContainer">
                <div className="infoDate">
                  <div className="registdate">
                    <img src={Clock} alt="icon" className="icon" />
                    {data.registDate}
                  </div>
                  <div className="viewCount">
                    <img src={Eye} className="icon" alt="icon" />
                    {data.viewNum}
                  </div>
                </div>
                {data.updateDate ? (
                  <p>최근 수정 {data.updateDate}</p>
                ) : (
                  <p> 최근 수정 {data.registDate} </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="content-box">
          <div className="taglist">
            {data.positions.length > 1 &&
              data.positions.map((position, i) => {
                i = i + 1;
                return <span className="tag">#{position}</span>;
              })}
            {data.genreName1 && (
              <span className="tag"># {data.genreName1}</span>
            )}
            {data.genreName2 && (
              <span className="tag"># {data.genreName2}</span>
            )}
            {data.genreName3 && (
              <span className="tag"># {data.genreName3}</span>
            )}
          </div>
          <div className="content">
            <p>{data.content}</p>
          </div>
        </div>
        <div className="enddate">
          <p>마감일 : {data.endDate}</p>
        </div>
        <div className="edit-del">
          {isAuthor && (
            <span>
              <img src={Trash} onClick={deleteHandler} alt="del" />
              삭제
            </span>
          )}
          {isAuthor && (
            <span onClick={() => Navigate(`../edit/${gatherIdx}`)}>
              <img src={Edit} alt="edit" />
              수정
            </span>
          )}
        </div>
        <LikeContainer>
          {isLiked ? (
            <span>
              <img src={Heart} onClick={BoardLikeHandler} alt="like" />
            </span>
          ) : (
            <span>
              <img src={HeartFill} onClick={BoardLikeHandler} alt="dislike" />
            </span>
          )}
          {likeCount}
        </LikeContainer>

        <div className="comment-title">
          <img src={Alarm} alt="icon" />
          <span>댓글</span>
          <div className="comment-count">{comments && comments.length}</div>
        </div>
        <div>
          <hr />
          <form action="" onSubmit={handleSubmit} className="comment">
            <input
              type="text"
              value={userInput}
              onChange={hanleUserInput}
              placeholder="댓글을 입력해주세요"
              className="input"
            />
            <button type="submit" className="button">
              등록
            </button>
          </form>
        </div>
        <div className="comment-list">
          <ul>
            {comments && comments.length > 0 ? (
              comments.reverse().map((comment) => {
                return (
                  <>
                    <br />
                    <li key={comment.commentIdx}>
                      <div>{comment.nickname}</div>
                      <div className="comment-date">{comment.registDate}</div>
                      <CommentContainer>
                        <div>{comment.content}</div>
                        {comment.userIdx === currentUserIdx && (
                          <img
                            src={Trash}
                            alt="del"
                            onClick={() =>
                              commentDeleteHandler(comment.commentIdx)
                            }
                          />
                        )}
                      </CommentContainer>
                      <br />
                      <hr />
                    </li>
                  </>
                );
              })
            ) : (
              <p>댓글 없음</p>
            )}
          </ul>
        </div>
      </DetailMain>
    );
  } else {
    return (
      <div>
        {comments &&
          comments.map((comment) => {
            return (
              <div key={comment.commentIdx}>
                <h3>{comment.nickname}</h3>
                <p>{comment.content}</p>
                <p>{comment.registDate}</p>
                {
                  <button
                    onClick={() => commentDeleteHandler(comment.commentIdx)}
                  >
                    삭제
                  </button>
                }
              </div>
            );
          })}
      </div>
    );
  }
};

export default GatherDetail;
const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DetailMain = styled.div`
  padding: 1rem;
  margin-top: 5%;

  .back-btn {
    background-color: #6c7383;
    border-radius: 10px;
    width: 3rem;
  }

  .title {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title-btn {
    display: flex;
    align-items: center;
  }

  .profile {
    display: flex;
    justify-content: space-between;
  }

  .chat-btn {
    margin-left: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .icon {
    margin-right: 0.5rem;
  }

  .registdate {
    display: flex;
  }

  .viewCount {
    display: flex;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    & > p {
      color: grey;
    }
  }

  .infoDate {
    display: flex;
    & > div {
      margin-right: 1rem;
    }
  }

  .content-box {
    position: relative;
  }

  .content {
    font-size: large;
    padding: 2rem 0;
  }

  .input {
    background-color: #202c44;
    border: none;
    height: 2.5rem;
    color: white;
    flex-grow: 1;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .button {
    background-color: #254ef8;
    border: none;
    margin-right: 1rem;
    width: 3.5rem;
    height: 2rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .tag {
    color: #873ffa;
    font-weight: bold;
    margin-right: 10px;
  }

  .enddate {
    margin-bottom: 1rem;
  }

  .edit-del {
    display: flex;
    flex-direction: column;
    color: gray;
  }

  .comment-count {
    margin-left: 0.5rem;
    border: 3px solid #254ef8;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .comment {
    background-color: #202c44;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-top: 1rem;
  }

  .comment-date {
    color: gray;
  }

  .comment-title {
    display: flex;
    margin-top: 2rem;
    margin-bottom: 10px;
    align-items: center;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #3c61f6;
  font-size: 1.5rem;
  .icon {
    margin-right: 0.5rem;
  }
`;
