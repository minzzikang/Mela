import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GatherList } from "API/GatherAPI";
import * as s from "./SearchGather.styled"

function Index() {
  const { word } = useParams();
  const [values, setValues] = useState([]);

  useEffect(() => {
    const info = async () => {
      try {
        const searchInfo = await GatherList({
          page: 1,
          size: 10,
          word: word,
        });
        setValues(searchInfo.data.boardRecruitRes);
      } catch (err) {
        console.log(err);
      }
    };
    info();
  }, [word]);

  return (
    <s.Container>
      {values.length === 0 ? (
        <>
          <h1>일치하는 검색 결과가 없습니다.</h1>
        </>
      ) : (
        <>
          {Object.entries(values).map(([key, value]) => (
            <Link
              to={`/gather/detail/${value.boardRecruitIdx}`}
              key={value.boardRecruitIdx}
            >
              <s.Card>
                <s.Title>{value.title}</s.Title>
                <s.Content>{value.content}</s.Content>
              </s.Card>
            </Link>
          ))}
        </>
      )}
    </s.Container>
  );
}

export default Index;
