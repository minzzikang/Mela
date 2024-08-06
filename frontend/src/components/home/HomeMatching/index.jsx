import * as h from "./HomeMatching.styled";
import { useEffect, useState } from "react";
import { shortsList } from "../../../API/ShortsAPI";
import RightDouble from "../../../assets/icons/Expand_right_double.svg";
import LeftDouble from "../../../assets/icons/Expand_left.png";

function Index() {
  const [logined, setLogined] = useState(false);
  const [shortList, setShortList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (logined) {
        const response = await shortsList();
        setShortList(response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.accessToken) {
      setLogined(true);
    }
  }, []);

  const shortsLimitList = () => {
    const result = [];
    if (shortList.length > 4) {
      for (let i = 0; i < 4; i++) {
        result.push(shortList[i]);
      }
    } else {
      for (let i = 0; i < shortList.length; i++) {
        result.push(shortList[i]);
      }
    }
    return result;
  };

  return (
    <h.ContentWrap>
      <h.InnerWrap>
        <img src={RightDouble} alt="" />
        <h1> Matching</h1>
        <h.Titles>
          <img src={LeftDouble} alt="" />
        </h.Titles>
      </h.InnerWrap>
      <h.FolderWrap>
        {Object.entries(shortsLimitList()).map(([key, value]) => (
          <h.ShortsWrap
            key={value.shortsIdx}
            src={value.fileURL}
            alt="영상"
            muted
            controls
          ></h.ShortsWrap>
        ))}
      </h.FolderWrap>
    </h.ContentWrap>
  );
}

export default Index;
