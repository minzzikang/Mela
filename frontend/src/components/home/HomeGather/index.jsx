import { GatherList } from "../../../API/GatherAPI";
import RightDouble from "../../../assets/icons/Expand_right_double.svg";
import LeftDouble from "../../../assets/icons/Expand_left.png";
import FolderNoImage from "../../../components/FolderNoImage";
import Button from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as h from "./HomeGather.styled";

function Index() {
  const Navi = useNavigate();
  const [logined, setLogined] = useState(false);
  const [gatherList, setGatherList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GatherList({ page: 1, size: 4 });
      setGatherList(response.data.boardRecruitRes);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.accessToken) {
      setLogined(true);
    }
  }, []);

  return (
    <h.ContentWrap>
      <h.InnerWrap>
        <img src={RightDouble} alt="" />
        <h1> Gathering List</h1>
        <h.Titles>
          <img src={LeftDouble} alt="" />
        </h.Titles>
      </h.InnerWrap>
      <h.FolderWrap>
        {gatherList.map((gather) => {
          return (
            <FolderNoImage
              key={gather.boardRecruitIdx}
              title={gather.title}
              content={gather.content}
              day={gather.endDate}
              width="12vw"
              maxwidth="400px"
              onClick={(event) =>
                Navi(`/gather/detail/${gather.boardRecruitIdx}`)
              }
            />
          );
        })}
      </h.FolderWrap>
      <div className="buttonholder">
        <Button
          text="More"
          width="6vw"
          height="5vh"
          onClick={(event) => Navi("/gather")}
        />
      </div>
    </h.ContentWrap>
  );
}

export default Index;
