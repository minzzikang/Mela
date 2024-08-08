import { useEffect, useState } from "react";
import Button from "common/Button";
import styled from "styled-components";
import PortfolioAdd from "components/portfolio";
import Headphone from "assets/icons/Headphone.png";
import { othersInfo } from "API/UserAPI";
import { useParams } from "react-router-dom";
import DefaultPortfolio from "common/Portfolio";

const Hedaer = styled.div`
  display: flex;
  justify-content: center;
  color: white;

  .btn-wrapper {
    margin-left: 1rem;
  }
`;

const PinList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;

  .title {
    display: flex;
  }
`;

const AllList = styled.div`
  display: flex;
  padding: 20px;
  color: white;

  .title {
    display: flex;
  }
`;

function PortfolioMorePage() {
  const emailIdInfo = useParams();
  const [userValues, setUserValues] = useState({});
  const [musicValues, setMusicValues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await othersInfo(emailIdInfo.emailId);
        setUserValues(response[0]);
        setMusicValues(response[2]);
      } catch (err) {}
    };

    getInfo();
  }, []);

  return (
    <>
      <Hedaer>
        <h1>{userValues.nickname}님의 Portfolio</h1>
        <Button
          text={"Add"}
          backgroundcolor={"#254ef8"}
          fontcolor={"white"}
          width={"100px"}
          onClick={() => setIsModalOpen(true)}
        />
        {isModalOpen && <PortfolioAdd />}
      </Hedaer>
      <AllList>
        <div className="title">
          <img src={Headphone} alt="icon" />
          <h3>All</h3>
          <Container>
            {Object.entries(musicValues).map(([key, value]) => (
              <DefaultPortfolio
                key={value.portfolioMusicIdx}
                albumImage={value.albumArtFileIdx}
                content={value.lyricFileIdx}
                file={value.musicFileIdx}
              />
            ))}
          </Container>
        </div>
      </AllList>
    </>
  );
}

export default PortfolioMorePage;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 3%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Img = styled.img`
  width: 30px;
  height: 20px;
`;
