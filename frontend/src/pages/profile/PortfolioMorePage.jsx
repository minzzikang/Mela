import { useEffect, useState } from "react";
import Button from "common/Button";
import PortfolioAdd from "components/profile/ProfilePortfolio/ProfilePortfolioAdd";
import Headphone from "assets/icons/Headphone.png";
import { othersInfo } from "API/UserAPI";
import { useParams } from "react-router-dom";
import DefaultPortfolio from "common/Portfolio";
import * as p from "./PortfolioMorePage.styled";

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
      <p.Hedaer>
        <h1>{userValues.nickname}님의 Portfolio</h1>
        <Button
          text={"Add"}
          backgroundcolor={"#254ef8"}
          fontcolor={"white"}
          width={"100px"}
          onClick={() => setIsModalOpen(true)}
        />
        {isModalOpen && <PortfolioAdd />}
      </p.Hedaer>
      <p.AllList>
        <div className="title">
          <img src={Headphone} alt="icon" />
          <h3>All</h3>
          <p.Container>
            {Object.entries(musicValues).map(([key, value]) => (
              <DefaultPortfolio
                key={value.portfolioMusicIdx}
                albumImage={value.albumArtFileIdx}
                content={value.lyricFileIdx}
                file={value.musicFileIdx}
              />
            ))}
          </p.Container>
        </div>
      </p.AllList>
    </>
  );
}

export default PortfolioMorePage;
