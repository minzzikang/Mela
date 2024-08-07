import { BoardList } from "../../../API/BoardAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../common/Button";
import RightDouble from "../../../assets/icons/Expand_right_double.svg";
import LeftDouble from "../../../assets/icons/Expand_left.png";
import FolderNoImage from "../../../components/FolderNoImage";
import * as h from "./HomeCommunity.styled";

function Index() {
  const Navi = useNavigate();
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await BoardList({ page: 1, size: 4 });
      const sortedData = response.data.boardResList.sort(
        (a, b) => b.likeNum - a.likeNum
      );
      setBoardList(sortedData);
    };
    fetchData();
  }, []);

  return (
    <h.ContentWrap>
      <h.InnerWrap>
        <img src={RightDouble} alt="" />
        <h1> Community</h1>
        <h.Titles>
          <img src={LeftDouble} alt="" />
        </h.Titles>
      </h.InnerWrap>
      <h.FolderWrap>
        {boardList.map((board) => {
          return (
            <FolderNoImage
              key={board.boardIdx}
              title={board.title}
              content={board.content}
              day={board.createAt}
              width="12vw"
              maxwidth="400px"
              onClick={(event) => Navi(`/community/${board.boardIdx}`)}
            />
          );
        })}
      </h.FolderWrap>
      <div className="buttonholder">
        <Button
          text="More"
          width="6vw"
          height="5vh"
          onClick={(event) => Navi("/community")}
        />
      </div>
    </h.ContentWrap>
  );
}

export default Index;
