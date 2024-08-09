//포트폴리오 페이지(Profile)
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "status/store";
import ProfileInfo from "components/profile/ProfileInfo";
import ProfileShorts from "components/profile/ProfileShorts";
import ProfilePortfolio from "components/profile/ProfilePortfolio";
import { othersInfo } from "API/UserAPI";
import Alarmbar from "components/alarm/AlarmBar";
import styled from "styled-components";
import Feed from "components/Feed";

function ProfilePage() {
  // 내가 들어간 포트폴리오
  const { emailId } = useParams();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserPortfolio, setCurrentUserPortfolio] = useState("");
  const [currentUserPosition, setCurrentUserPosition] = useState([]);
  const [currentUserGenre, setCurrentUserGenre] = useState([]);
  const [currentUserMusics, setCurrentUserMusics] = useState([]);
  const [currentUserShorts, setCurrentUserShorts] = useState([]);
  // 현재 로그인 한 사람
  const { fetchUser, user, userPortfolio } = useStore();

  useEffect(() => {
    const info = async () => {
      try {
        const otherInfo = await othersInfo(emailId);
        setCurrentUser(otherInfo[0]);
        setCurrentUserPortfolio(otherInfo[1]);
        setCurrentUserMusics(otherInfo[2]);
        setCurrentUserShorts(otherInfo[3]);
        setCurrentUserPosition(otherInfo[4]);
        setCurrentUserGenre(otherInfo[5]);
      } catch (err) {}
    };
    info();
  }, [emailId]);

  const userProps = {
    currentUser: currentUser,
    currentUserPortfolio: currentUserPortfolio,
    currentUserGenre: currentUserGenre,
    currentUserPosition: currentUserPosition,
    currentUserShorts: currentUserShorts,
    currentUserMusics: currentUserMusics,
    loginUser: user,
    loginPortfolio: userPortfolio,
  };

  return (
    <>
      {user ? (
        <>
          <Container>
            <div className="main">
              <ProfileInfo {...userProps} />
              <ProfileShorts {...userProps} />
              <ProfilePortfolio />
            </div>
            <div className="side">
              <div className="alarm">
                <Alarmbar />
              </div>
              <div className="feed">
                <Feed />
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
}

export default ProfilePage;

const Container = styled.div`
  display: flex;
  color: white;

  .main {
    flex: 2;
  }

  .side {
    flex: 0.8;
    margin: 20px;
    align-items: center;
  }

  .alarm {
    margin-bottom: 3rem;
  }
`;
