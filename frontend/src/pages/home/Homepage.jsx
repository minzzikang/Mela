import * as h from "./Homepage.styled";
import HomeMatching from "../../components/home/HomeMatching";
import HomeGather from "../../components/home/HomeGather";
import HomeCommunity from "../../components/home/HomeCommunity";
import Navbar from "../../common/Navbar";
import Button from "../../common/Button";
import Signin from "../../components/modals/signin";
import Signup from "../../components/modals/signup";
import { useEffect, useState } from "react";

function Homepage() {
  const [logined, setLogined] = useState(false);
  const [IsSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [IsSignupModalOpen, setIsSignupModalOpen] = useState(false);

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
              <Button
                text="SIGN UP"
                width="7vw"
                height="7vh"
                onClick={() => setIsSignupModalOpen(true)}
              />
              <Button
                text="SIGN IN"
                width="7vw"
                height="7vh"
                onClick={() => setIsSigninModalOpen(true)}
              />
            </div>
          </h.LandingImage>
        )}
        {logined && <HomeMatching />}
        <div className="contents">
          <HomeGather />
          <HomeCommunity />
        </div>
        {IsSigninModalOpen && (
          <Signin onClose={() => setIsSigninModalOpen(false)} />
        )}
        {IsSignupModalOpen && (
          <Signup onClose={() => setIsSignupModalOpen(false)} />
        )}
      </h.Container>
    </>
  );
}

export default Homepage;
