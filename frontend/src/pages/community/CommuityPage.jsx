// 커뮤니티 게시판 메인
import Navbar from "common/Navbar";
import Sidebar from "common/Sidebar/index";
import { Outlet } from "react-router-dom";
import Alarmbar from "components/alarm/AlarmBar";
import * as c from './CommunityPage.styled'

const CommunityPage = () => {
  return (
    <c.Container>
      <c.Side>
        <Sidebar paddingtop="6vh" />
      </c.Side>
      <c.Main>
        <Navbar backcolour="10" />
        <Outlet />
      </c.Main>
      <c.RSide>
        <Alarmbar />
      </c.RSide>
    </c.Container>
  );
};

export default CommunityPage;
