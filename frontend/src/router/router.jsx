import React from "react";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import Profile from "pages/profile/ProfilePage";
import SigninModal from "components/signin";
import SignupModal from "components/signup";
import Gather from "pages/gather/GatherPage";
import UserUpdate from "pages/profile/ProfileUserEditPage";
import PortfolioAll from "pages/profile/PortfolioMorePage";
import Message from "pages/message/MessagePage";
import Matching from "pages/matcing/MatchingPage";
import TeamspaceTeam from "components/teamspace/TeamspaceTeam";
import TeamspaceAudio from "components/teamspace/TeamspaceAudio";
import TeamspaceFile from "components/teamspace/TeamspaceFile";
import TeamspaceManage from "components/teamspace/TeamspaceManage";
import TeamspaceDetail from "pages/teamspace/TeamspaceDetailPage";
import ForgotPassword from "pages/certification/ForgotPasswordPage";
import AlarmMain from "pages/alarm/AlarmPage";
import SequenceMain from "sequence/SequenceMain";
import Video from "Video/Video";
import { useNavigate } from "react-router-dom";

function AppRouter({ className }) {
  const Navigate = useNavigate();
  const lgd = localStorage.getItem("accessToken") ? true : false;
  const ng = () => {
    Navigate("/home");
  };

  const goBack = () => {
    Navigate(-1);
  };
  return (
    <div className={className}>
      <Routes>
        <Route path="/portfolio/:emailId" element={<Profile />} />
        <Route path="/gather" exact element={<Gather />} />

        {lgd ? (
          <Route
            path="/teamspace/:teamspaceIdx"
            element={<TeamspaceDetail />}
          />
        ) : (
          ng()
        )}

        {lgd ? (
          <Route
            path="/teamspace/:teamspaceIdx/team"
            element={<TeamspaceTeam />}
          />
        ) : (
          ng()
        )}

        {lgd ? (
          <Route
            path="/teamspace/:teamspaceIdx/audio"
            element={<TeamspaceAudio />}
          />
        ) : (
          ng()
        )}

        {lgd ? (
          <Route
            path="/teamspace/:teamspaceIdx/file"
            element={<TeamspaceFile />}
          />
        ) : (
          ng()
        )}

        {lgd ? (
          <Route
            path="/teamspace/:teamspaceIdx/management"
            element={<TeamspaceManage />}
          />
        ) : (
          ng()
        )}

        {lgd ? (
          <Route
            path="/teamspace/video/:teamspaceIdx"
            element={<Video goBack={goBack} />}
          />
        ) : (
          ng()
        )}

        <Route path="/signup" element={<SignupModal />} />
        <Route path="/login" element={<SigninModal />} />

        {lgd ? <Route path="/users" element={<UserUpdate />} /> : ng()}

        <Route path="/:emailId/musics" element={<PortfolioAll />} />

        {lgd ? <Route path="/message/:roomid" element={<Message />} /> : ng()}

        {lgd ? <Route path="/message" element={<Message />} /> : ng()}

        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {lgd ? <Route path="/alarm" element={<AlarmMain />} /> : ng()}

        {lgd ? <Route path="/matching" element={<Matching />} /> : ng()}
      </Routes>
    </div>
  );
}

export default AppRouter;
