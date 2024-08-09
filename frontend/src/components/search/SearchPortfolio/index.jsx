import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { musicSearch } from "API/PortfolioAPI";
import DefaultPortfolioShape from "./SearchPortfolioDefault";
import styled from "styled-components";

function Index(props) {
  const { word } = useParams();
  const [values, setValues] = useState([]);

  useEffect(() => {
    const info = async () => {
      try {
        const searchInfo = await musicSearch(word);
        setValues(searchInfo);
      } catch (err) {
        console.log(err);
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
            <DefaultPortfolioShape
              key={value[0].portfolioMusicIdx}
              albumImage={value[0].albumArtFileIdx}
              nickname={value[0].userIdx.nickname}
              profileImage={value[1].portfolio_picture_file_idx}
            />
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
  color: white;
  padding: 3% 5%;
  gap: 4%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
