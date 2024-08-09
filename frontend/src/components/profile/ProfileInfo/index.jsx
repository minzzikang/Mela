import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "common/Button";
import * as p from "./ProfileInfo.styled"
import { followUser } from "API/UserAPI";
import { getImg } from "API/FileAPI";
import { isFollow } from "API/UserAPI";
import { CreateChat } from "API/ChatAPI";
import defaultprofile from "assets/images/default-profile.png";
import instagram from "assets/images/instagram.png";
import youtube from "assets/images/youtube.png";

function Index(props) {
  const [isFollowed, setIsFollowed] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserPortfolio, setCurrentUserPortfolio] = useState("");
  const [currentUserPosition, setCurrentUserPosition] = useState([]);
  const [currentUserGenre, setCurrentUserGenre] = useState([]);
  const [loginUser, setLoginUser] = useState("");
  const [loginUserPortfolio, setLoginUserPortfolio] = useState("");
  const [imgURL, setImgURL] = useState("");
  const navigate = useNavigate();

  // 장르 //
  const genres = [
    "Pop",
    "Rock",
    "Hiphop",
    "Classic",
    "Jazz",
    "R&B",
    "Disco",
    "Electrionic",
    "Balad",
    "Country",
    "Reggae",
    "Folk",
    "Etc",
  ];

  // 포지션 //
  const positions = ["보컬", "작곡", "작사", "세션", "믹싱", "기타"];

  useEffect(() => {
    setCurrentUser(props.currentUser);
    setCurrentUserPortfolio(props.currentUserPortfolio);
    setCurrentUserPosition(props.currentUserPosition);
    setCurrentUserGenre(props.currentUserGenre);
    setLoginUser(props.loginUser);
    setLoginUserPortfolio(props.loginPortfolio);
  }, [props.currentUser, props.loginUser]);

  useEffect(() => {
    const imgInfo = async () => {
      try {
        if (currentUserPortfolio.portfolio_picture_file_idx) {
          const response = await getImg(
            currentUserPortfolio.portfolio_picture_file_idx.fileIdx
          );
          setImgURL(response.message);
        } else {
          setImgURL(defaultprofile);
        }
      } catch (err) {
        console.error(err);
      }
    };

    imgInfo();
    const followInfo = async () => {
      try {
        const response = await isFollow(currentUser.emailId);
        setIsFollowed(response);
      } catch (err) {
      }
    };

    followInfo();
  }, [currentUser, currentUserPortfolio]);

  const handleFollow = async () => {
    if (loginUser && currentUser && loginUser.emailId !== currentUser.emailId) {
      try {
        await followUser(currentUser.emailId);
        setIsFollowed(!isFollowed);
      } catch (err) {
        console.error(err);
      }
    }
  };


  // 채팅 연결
  const [roomIdx, setRoomIdx] = useState("");
  const [otheruserid, setOtheruserid] = useState();

  const handleChat = async () => {
    const otheruserid = currentUser.userIdx;

    try {
      const response = await CreateChat({ otheruserid: otheruserid });
      console.log(response);
      setRoomIdx(response);
      navigate(`/message/${response}`);
      setOtheruserid("");
    } catch (err) {
      console.log(err);
    }
  };


  if (!loginUser || !currentUser || !currentUser.userIdx) {
    return (
      <div>
        <p>로딩 중...</p>
      </div>
    );
  }

  const instagramURL = currentUserPortfolio.instagram;
  const youtubeURL = currentUserPortfolio.youtube;

  const getImgURL = async () => {
    const response = await getImg(
      currentUserPortfolio.portfolio_picture_file_idx
    );
    console.log(response);
    setImgURL(response.data);
  };

  return (
    <>
      <p.Container>
        {currentUser.emailId === loginUser.emailId ? (
          <>
            <div className="main">
              <div className="header">
                <div className="userInfo">
                  <div className="image">
                    <p.Img
                      src={imgURL ? imgURL : defaultprofile}
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="name">
                    <p.Title>{loginUser.nickname}</p.Title>
                    <p style={{ marginBottom: "10px" }}>{loginUser.name}</p>
                    <p>{loginUserPortfolio.selfIntro}</p>
                  </div>
                </div>
                <Button
                  text={"Edit"}
                  backgroundcolor={"#6C7383"}
                  fontcolor={"white"}
                  width={"4rem"}
                  height={"2rem"}
                  onClick={() => navigate("/users")}
                />
              </div>
              <div className="genre">
              <span>Genre : </span>
                <ul>
                {Object.values(currentUserGenre).map((genre) =>
                  genre ? (
                    <li key={genre}>{genre}</li>
                  ) : null
                )}
                </ul>
              </div>
              <div className="position">
                <span>Position : </span>
                <ul>
                {Object.values(currentUserPosition).map((position) =>
                  position ? (
                    <li key={position}>{position}</li>
                  ) : null
                )}
                </ul>
              </div>
              <div className="sns">
                <p>SNS</p>
                <p.URL
                  onClick={() => {
                    window.open(instagramURL);
                  }}
                  src={instagram}
                  alt="인스타그램"
                />
                <p.URL
                  onClick={() => {
                    window.open(youtubeURL);
                  }}
                  src={youtube}
                  alt="유튜브"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="header">
              <div className="userInfo">
                <div className="image">
                  <p.Img
                    src={
                      currentUserPortfolio.portfolio_picture_file_idx
                        ? currentUserPortfolio.portfolio_picture_file_idx
                        : defaultprofile
                    }
                    alt="프로필 이미지"
                  />
                </div>
                <div className="name">
                  <p.Title>{currentUser.nickname}</p.Title>
                  <p style={{ marginBottom: "10px" }}>{currentUser.name}</p>
                  <p>{currentUser.selfIntro}</p>
                </div>
              </div>
              <div className="buttons">
                <Button
                  text={"채팅하기"}
                  backgroundcolor={"#873ffa"}
                  width={"5rem"}
                  height={"2rem"}
                  onClick={handleChat}
                />
                <br />
                <Button
                  fontcolor={"white"}
                  text={isFollowed ? "Unfollow" : "Follow"}
                  backgroundcolor={isFollowed ? "#6C7383" : "#254ef8"}
                  width={"5rem"}
                  height={"2rem"}
                  onClick={handleFollow}
                />
              </div>
            </div>
            <div className="genre">
              <span>Genre : </span>
                <ul>
                {Object.values(currentUserGenre).map((genre) =>
                  genre ? (
                    <li key={genre}>{genre}</li>
                  ) : null
                )}
                </ul>
              </div>
              <div className="position">
                <span>Position : </span>
                <ul>
                {Object.values(currentUserPosition).map((position) =>
                  position ? (
                    <li key={position}>{position}</li>
                  ) : null
                )}
                </ul>
              </div>
            <div className="sns">
              <p>SNS</p>
              <p.URL
                onClick={() => {
                  window.open(instagramURL);
                }}
                src={instagram}
                alt="인스타그램"
              />
              <p.URL
                onClick={() => {
                  window.open(youtubeURL);
                }}
                src={youtube}
                alt="유튜브"
              />
            </div>

          </>
        )}
      </p.Container>
    </>
  );
}

export default Index;