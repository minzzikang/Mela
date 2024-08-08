import { useEffect, useState } from "react";
import { getShorts, likeShorts, hateShorts } from "API/ShortsAPI";
import Like from "assets/icons/Like.png";
import Dislike from "assets/icons/Dislike.png";
import * as m from "./Matcing.styled";

function setWindowHeight() {
  var windowHeight = window.innerHeight;
  windowHeight += 100;
  document.body.style.height = windowHeight + "px";
}
window.addEventListener("resize", setWindowHeight, false);

function Index() {
  const [scroll, setScroll] = useState(false);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [values, setValues] = useState({});

  const [likeActive, setLikeActive] = useState(false);
  const [hateActive, setHateActive] = useState(false);

  useEffect(() => {
    setWindowHeight();
    const getShort = async () => {
      try {
        const response = await getShorts();
        setValues(response);
        setNickname(response.userIdx.nickname);
        setDescription(response.description);
      } catch (err) {}
    };

    getShort();

    setLikeActive(false);
    setHateActive(false);
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, [scroll]);
  const handleScroll = () => {
    // 스크롤이 Top에서 100px 이상 내려오면 true값을 useState에 넣어줌
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };

  const handleLike = async () => {
    try {
      await likeShorts(values.shortsIdx);
      setLikeActive(!likeActive);
      if (hateActive) {
        setHateActive(false);
      }
    } catch (err) {}
  };

  const handleHate = async () => {
    try {
      await hateShorts(values.shortsIdx);
      setHateActive(!hateActive);
      if (likeActive) {
        setLikeActive(false);
      }
    } catch (err) {}
  };

  return (
    <m.ShortsContainer>
      <m.VideoInfo>
        <m.Video
          src={values.fileURL}
          alt="비디오"
          muted
          autoPlay
          loop
          controls
        ></m.Video>
        <m.Name>
          <p className="name">{nickname}</p>
        </m.Name>
        <m.Desc>
          <p className="desc">{description}</p>
        </m.Desc>
      </m.VideoInfo>
      <div className="likeInfo-container">
        <m.LikeInfo>
          {likeActive ? (
            <>
              <div className="button2" onClick={handleLike}>
                <div className="icon">
                  <img src={Like} alt="like" />
                </div>
              </div>
              <div className="letter">
                <p>좋아요 취소</p>
              </div>
            </>
          ) : (
            <>
              <div className="button" onClick={handleLike}>
                <div className="icon">
                  <img src={Like} alt="like" />
                </div>
              </div>
              <div className="letter">
                <p>좋아요 </p>
              </div>
            </>
          )}
        </m.LikeInfo>
        <m.LikeInfo>
          {hateActive ? (
            <>
              <div className="button2" onClick={handleHate}>
                <div className="icon">
                  <img src={Dislike} alt="dislike" />
                </div>
              </div>
              <div className="letter">
                <p>싫어요 취소</p>
              </div>
            </>
          ) : (
            <>
              <div className="button" onClick={handleHate}>
                <div className="icon">
                  <img src={Dislike} alt="dislike" />
                </div>
              </div>
              <div className="letter">
                <p>싫어요</p>
              </div>
            </>
          )}
        </m.LikeInfo>
      </div>
    </m.ShortsContainer>
  );
}

export default Index;
