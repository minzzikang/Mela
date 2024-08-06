import * as h from "./Homepage.styled";
import HomeMatching from "../../components/home/HomeMatching";
import HomeGather from "../../components/home/HomeGather";
import HomeCommunity from "../../components/home/HomeCommunity";
import Navbar from "../../common/Navbar";
// import SignupModal from "../components/Modals/SignupModal";
// import SigninModal from "../components/Modals/SigninModal";
import { useEffect, useState } from "react";

function Homepage() {
  const [logined, setLogined] = useState(false);

  useEffect(() => {
    if (localStorage.accessToken) {
      setLogined(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <h.Container>
        {!logined && (
          <h.LandingImage>
            <div></div>
            <div>
              <h1>M A T C H</h1>
              <h1>C O L L A B O R A T E</h1>
              <h1>P O R T F O L I O</h1>
            </div>
            <div>
              {/* <SignUp />
              <SignIn /> */}
            </div>
          </h.LandingImage>
        )}
        {logined && <HomeMatching />}
        <div className="contents">
          <HomeGather />
          <HomeCommunity />
        </div>
      </h.Container>
    </>
  );
}

export default Homepage;
