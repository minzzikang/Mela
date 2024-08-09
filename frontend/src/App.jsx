import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "common/Navbar";
import Homepage from "pages/home/Homepage";
import GlobalStyle from "styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import AppRouter from "router/router";
import Sidebar from "common/Sidebar";
import Community from "pages/community/CommuityPage";
import CommunityCreate from "components/community/CommunityCreate";
import CommunityDetail from "components/community/CommunityDetail";
import CommunityHome from "components/community/CommunityHome";
import CommunityEdit from "components/community/CommunityEdit";
import TeamspaceMain from "pages/teamspace/TeamspaceMainPage";
import EmailVerify from "pages/certification/EmailVerifyPage";
import GatherHome from "components/gather/GatherHome";
import GatherCreate from "components/gather/GatherCreate";
import GatherDetail from "components/gather/GatherDetail";
import GatherEdit from "components/gather/GatherEdit";
import ChangePassword from "pages/certification/ChangePasswordPage";
import Search from "pages/search/SearchPage";
import Gather from "pages/gather/GatherPage";

function App() {
  const lgd = localStorage.getItem("accessToken") ? true : false;

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Scroll>
          <BrowserRouter>
            <Routes>
              <Route path="/Home" element={<Homepage />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/teamspace" element={<TeamspaceMain />} />
              <Route path="/search/:word" element={<Search />} />
              <Route path="/signup/:emailId" element={<EmailVerify />} />
              <Route path="/maingather" element={<Gather />} />
              <Route path="/gather" element={<Community />}>
                <Route index element={<GatherHome />} />
                {lgd ? (
                  <Route path="edit/:gatherIdx" element={<GatherEdit />} />
                ) : null}
                {lgd ? (
                  <Route path=":pageNumber" element={<GatherHome />} />
                ) : null}
                {lgd ? (
                  <Route path="create" element={<GatherCreate />} />
                ) : null}
                {lgd ? (
                  <Route path="detail/:gatherIdx" element={<GatherDetail />} />
                ) : null}
              </Route>
              <Route path="/community" element={<Community />}>
                <Route path="/community" exact element={<CommunityHome />} />
                {lgd ? (
                  <Route
                    path="/community/create"
                    element={<CommunityCreate />}
                  />
                ) : null}
                <Route
                  path="/community/:boardIdx"
                  element={<CommunityDetail />}
                />
                <Route
                  path="/community/:boardIdx/edit"
                  element={<CommunityEdit />}
                />
              </Route>
              {lgd ? (
                <Route path="/changepassword" element={<ChangePassword />} />
              ) : null}
              <Route
                path="*"
                element={
                  <>
                    <header>
                      <Navbar />
                    </header>
                    <Body>
                      <Sidebar className="Side" />
                      <StyledAppRouter className="BodyRouter" />
                    </Body>
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </Scroll>
      </ThemeProvider>
    </>
  );
}

export default App;

const StyledAppRouter = styled(AppRouter)`
  min-height: 100%;
  width: 100%;
`;

const Scroll = styled.div``;
const Body = styled.div`
  padding-top: 2.5%;
  display: flex;
  flex-direction: row;

  background-color: #10141d;
  height: 100%;

  .BodyRouter {
    // 컴포 이하
    background-color: #10141d;
    padding-left: 10px;
    height: 100%;
    min-height: 90vh;
  }
  .Side {
    // 사이드 L 바
    width: 12.5vw;
    padding-top: 1.5%;
    text-align: center;
    padding-left: 0.5%;
    margin-left: 1rem;
    height: 60%;
    border-radius: 10px;
  }
`;
