import * as g from "./GatherPage.styled";
import Navbar from "common/Navbar";
import Sidebar from "common/Sidebar";
import Button from "common/Button";
import Alarmbar from "components/alarm/AlarmBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { shortsList } from "API/ShortsAPI";
import { recommendList } from "API/GatherAPI";
import { myGatherList } from "API/UserAPI";

function GatherPage() {
  const [recommend, setRecommend] = useState([]);
  const [myGather, setMyGather] = useState([]);
  const [shorts, setShorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const gatherInfo = async () => {
      try {
        const recommendInfo = await recommendList({
          page: 1,
          size: 10,
          word: "",
          sortKey: "viewNum",
        });
        setRecommend(recommendInfo.boardRecruitRes);
        const myGatherInfo = await myGatherList({
          page: 1,
          size: 10,
        });
        setMyGather(myGatherInfo.boardRecruitRes);
        const shortsInfo = await shortsList();
        setShorts(shortsInfo);
      } catch (err) {
        console.error(err);
      }
    };

    gatherInfo();
  }, []);

  const recommendLimitList = () => {
    const result = [];
    if (recommend.length > 3) {
      for (let i = 0; i < 3; i++) {
        result.push(recommend[i]);
      }
    } else {
      for (let i = 0; i < recommend.length; i++) {
        result.push(recommend[i]);
      }
    }
    return result;
  };

  const myGatherLimitList = () => {
    const result = [];
    if (myGather.length > 3) {
      for (let i = 0; i < 3; i++) {
        result.push(myGather[i]);
      }
    } else {
      for (let i = 0; i < myGather.length; i++) {
        result.push(myGather[i]);
      }
    }
    return result;
  };

  const shortsLimitList = () => {
    const result = [];
    if (shorts.length > 3) {
      for (let i = 0; i < 3; i++) {
        result.push(shorts[i]);
      }
    } else {
      for (let i = 0; i < shorts.length; i++) {
        result.push(shorts[i]);
      }
    }

    return result;
  };

  return (
    <g.Container>
      <g.Side>
        <Sidebar paddingtop="6vh" />
      </g.Side>
      <g.Main>
        <Navbar backcolour="10" />
        <div className="main-box">
          <g.Header>
            <h3>내가 작성한 공고</h3>
            <Button
              text="글쓰기"
              width="4rem"
              height="2rem"
              onClick={() => navigate("/gather/create")}
            />
          </g.Header>
          <g.ListWrap>
            {myGather.length === 0 ? (
              <>
                <p>작성한 공고가 없습니다.</p>
              </>
            ) : (
              <>
                {Object.entries(myGatherLimitList()).map(([key, value]) => (
                  <g.Card
                    key={value.boardRecruitIdx}
                    onClick={() =>
                      navigate(`/gather/detail/${value.boardRecruitIdx}`)
                    }
                  >
                    <g.Title>{value.title}</g.Title>
                    <g.Content>{value.content}</g.Content>
                  </g.Card>
                ))}
              </>
            )}
          </g.ListWrap>
          <h3>내가 선호할 만한 사람</h3>
          <g.ListWrap>
            {shorts.length === 0 ? (
              <>
                <p>선호할 만한 사람이 없습니다.</p>
              </>
            ) : (
              <>
                {Object.entries(shortsLimitList()).map(([key, value]) => (
                  <g.ShortsWrap
                    key={value.shortsIdx}
                    src={value.fileURL}
                    alt="영상"
                    muted
                    controls
                  ></g.ShortsWrap>
                ))}
              </>
            )}
          </g.ListWrap>
          <h3>나를 찾는 공고</h3>
          <g.ListWrap>
            {recommend.length === 0 ? (
              <>
                <p>적합한 공고가 없습니다.</p>
              </>
            ) : (
              <>
                {Object.entries(recommendLimitList()).map(([key, value]) => (
                  <g.Card
                    key={value.boardRecruitIdx}
                    onClick={() =>
                      navigate(`/gather/detail/${value.boardRecruitIdx}`)
                    }
                  >
                    <g.Title>{value.title}</g.Title>
                    <g.Content>{value.content}</g.Content>
                  </g.Card>
                ))}
              </>
            )}
          </g.ListWrap>
        </div>
      </g.Main>
      <g.RSide>
        <Alarmbar />
      </g.RSide>
    </g.Container>
  );
}

export default GatherPage;
