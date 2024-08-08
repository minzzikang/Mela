// 커뮤니티 게시판 메인
import Navbar from "common/Navbar";
import styled from "styled-components";
import Sidebar from "common/Sidebar/index";
import { Outlet } from "react-router-dom";
import Alarmbar from "components/alarm/Alarmbar";

const Community = () => {
  return (
    <CommunityContainer>
      <SideDiv>
        <Sidebar paddingtop="6vh" />
      </SideDiv>
      <MainDiv>
        <Navbar backcolour="10" />
        <Outlet />
      </MainDiv>
      <RSideDiv>
        <Alarmbar />
      </RSideDiv>
    </CommunityContainer>
  );
};

export default Community;

const CommunityContainer = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  height: 100%;
  color: white;
  padding-top: 3%;
  justify-content: space-evenly;
`;

const SideDiv = styled.div`
  width: 12.5vw;
  padding-left: 1%;
`;

const MainDiv = styled.div`
  width: 64%;
  height: 100%;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow-x: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: rgb(19, 160, 0);
  }

  .Container {
    margin-top: 5%;
    h1 {
      margin-bottom: 3vh;
    }
    .SearchContainer {
      display: flex;
      align-items: center;
      input {
        height: 100%;
        margin-left: 7.5%;
        width: 15rem;
        background-color: ${(props) => props.theme.colours.point};
        border-top: none;
        border-right: none;
        border-left: none;
        color: white;
        text-align: center;
        outline: none;
        font-size: medium;
        &:active {
          border: none;
        }
      }
    }
    .BoardSearch {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3%;
      button {
        margin-right: 20px;
      }
    }
  }
`;

const RSideDiv = styled.div`
  width: 15%;
`;
