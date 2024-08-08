import React, { useEffect, useState } from "react";
import { GatherList } from "API/GatherAPI";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import Button from 'common/Button';
import LeftArrow from "assets/icons/LeftArrow.png";
import RightArrow from "assets/icons/RightArrow.png";
import { shortsList } from "API/ShortsAPI";

const PaginationButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#254EF8" : "#13295b")};
  border: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 3px;
  cursor: pointer;
  align-items: center;
`;

const GatherHome = () => {
  const [gathers, setGathers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [videoList, setVideoList] = useState([])

  const Navigate = useNavigate();

  const Createbutton = () => {
    Navigate("/gather/create");
  };

  useEffect(() => {
    const fetchGathers = async () => {
      const res = await GatherList({ page: currentPage, size: 10 });
      setGathers(res.data.boardRecruitRes);
      const totalPage = Math.ceil(res.data.totalPageCount / 10);
      setTotalPage(totalPage);
      const list = await shortsList()
      setVideoList(list)
    };
    fetchGathers();
  }, [currentPage]);

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 5);
    let end = Math.min(totalPage, currentPage + 5);
    return Array.from({ length: totalPage }, (_, i) => i + 1).slice(start - 1, end);
  };

  const onPageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPage) {
      // 페이지 범위를 벗어난 경우
      return;
    }
  
    // 해당 페이지의 글을 불러옵니다.
    const res = await GatherList({page: newPage, size: 10});
  
    // 글이 없는 경우
    if (res.data.boardRecruitRes.length === 0) {
      alert('글이 없는 페이지입니다.');
      return;
    }
  
    setCurrentPage(newPage);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPage / 10) + 1; i++) {
    pages.push(
      <PaginationButton
        onClick={() => setCurrentPage(i)}
        isActive={currentPage === i ? "active" : ""}
      ></PaginationButton>
    );
  }
  return (
    <MainDiv>
      <div className="Container">
        <h1>구인</h1>
        <div className="header">
            <span>NO</span>
            <span>제목</span>
            <span>작성자</span>
            <span>날짜</span>
            <span>조회수</span>
            <span>추천수</span>
          </div>
        <div className="listWrapper">
          <ul className='content'>
            {gathers.map((gather) => (
              <li key={gather.gatherIdx} className="list">
                <div>{gather.boardRecruitIdx}</div>
                <div className="title"><Link to={`/gather/detail/${gather.boardRecruitIdx}`}>
                {gather.title.length < 20
                ? gather.title
                : gather.title.slice(0, 15) + "..."}
                </Link></div>
                <div>{gather.nickname}</div>
                <div>{moment(gather.registDate).format("YY-MM-DD")}</div>
                <div>{gather.viewNum}</div>
                <div><span>{gather.likeNum}</span></div>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <br />
        <div className="buttonWrapper">
            <Button
              onClick={Createbutton}
              text="글쓰기"
              width="4rem"
              height="2rem"
            />
          </div>
      </div>
        <div className="footer">
          <div
            className="page-btn"
            onClick={async () => await onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={LeftArrow} alt='back'/>
          </div>
          <div className="pagination">{pages}</div>
          <div className="page-btn" onClick={async ()=> await onPageChange(currentPage + 1)}>
            <img src={RightArrow} alt='forward' />
          </div>
          </div>
    </MainDiv>
  );
};

export default GatherHome;

const MainDiv = styled.div`
  a {
    text-decoration: none;
    color: white;
  }

  .header {
    display: flex;
    background-color: #1e40c6;
    justify-content: space-between;
    height: 2rem;
    border-radius: 10px;
    align-items: center;
    margin-bottom: 10px;
  }

  .listWrapper {
    background-color: #202C44;
    border-radius: 10px;
    height: 100%;
    min-height: 2.5rem;
    align-items: center;
    display: flex;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #254EF8;
    text-align: center;
  }

  .list:last-child {
    border-bottom: none;
  }

  .header span {
    flex: 1;
    text-align: center;
  }

  .header span:nth-child(1), .list div:nth-child(1) { flex: 0.5; } /* NO */
  .header span:nth-child(2), .list div:nth-child(2) { flex: 3; } /* 제목 */
  .header span:nth-child(3), .list div:nth-child(3) { flex: 1; } /* 작성자 */
  .header span:nth-child(4), .list div:nth-child(4) { flex: 1; } /* 날짜 */
  .header span:nth-child(5), .list div:nth-child(5) { flex: 0.5; } /* 조회수 */
  .header span:nth-child(6), .list div:nth-child(6) { flex: 0.5; } /* 추천수 */


  .sort-btn {
    color: #6C7383;
    background-color: #151C2C;
    border: none;
    cursor: pointer;
  }

  .sort-btn.active-sort {
    color: #254EF8;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }

  .like {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .comment-count {
    color: gray;
    margin-left: 10px;
  }
  
  .buttonWrapper {
    position: absolute;
    right: 20px;
  }

  .page-btn {
    background-color: #202C44;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .footer {
    display: flex;
    align-items: center;
    margin: 5px;
  }

  .pagination {
    margin: 5px;
  }

  .Container {
    margin-top: 5%;
    padding: 10px;
    margin-right: 15px;
    position: relative;

    h1 {
      margin-bottom: 3vh;
    }
    .SearchContainer {
      display: flex;
      align-items: center;
      input {
        height: 100%;
        margin-left: 7.5%;
        width: 15rem;
        background-color: ${(props) => props.theme.colours.point};
        border-top: none;
        border-right: none;
        border-left: none;
        color: white;
        text-align: center;
        outline: none;
        font-size: medium;
        &:active {
          border: none;
        }
      }
    }
    .BoardSearch {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3%;
      button {
        margin-right: 20px;
      }
    }
  }
`