import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userSearch } from "API/UserAPI";
import DefaultUserShape from "./SearchUserDefault";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Index() {
  const { word } = useParams();
  const [values, setValues] = useState([]);

  useEffect(() => {
    const info = async () => {
      try {
        const searchInfo = await userSearch(word);
        setValues(searchInfo);
      } catch (err) {
      }
    };
    info();
  }, [word]);

  return (
    <SearchContainer>
      {values.length === 0 ? (
        <>
          <h1>일치하는 검색 결과가 없습니다.</h1>
        </>
      ) : (
        <>
          {Object.entries(values).map(([key, value]) => (
            <Link
              to={`/portfolio/${value.userIdx.emailId}`}
              key={value.portfolioAbstractIdx}
            >
              <DefaultUserShape
                profileImage={value.portfolio_picture_file_idx}
                nickname={value.userIdx.nickname}
              />
            </Link>
          ))}
        </>
      )}
    </SearchContainer>
  );
}

export default Index;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 3% 7%;
  color: white;
  gap: 13%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
