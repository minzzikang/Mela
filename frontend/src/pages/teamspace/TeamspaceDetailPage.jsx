import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeamspaceTeam from "components/teamspace/TeamspaceTeam";
import TeamspaceAudio from "components/teamspace/TeamspaceAudio";
import TeamspaceFile from "components/teamspace/TeamspaceFile";
import TeamspaceManage from "components/teamspace/TeamspaceManage";
import TeamspaceInvite from "components/teamspace/TeamspaceInvite";
import ScheduleBar from "components/teamspace/TeamspaceSchedule";
import * as t from "./TeamspaceDetailPage.styled";
import Video from "assets/icons/Video.png";

function TeamspaceDetailPage() {
  const [currentTab, clickTab] = useState(0);
  const teamspaceIdx = useParams().teamspaceIdx;
  const Navigate = useNavigate();
  const menuArr = [
    { name: "Team", content: <TeamspaceTeam /> },
    { name: "Audio File", content: <TeamspaceAudio /> },
    { name: "Files", content: <TeamspaceFile /> },
    { name: "Management", content: <TeamspaceManage /> },
  ];

  // 현재 선택한 인덱스 값을 받아서 clickTab에 저장하여 currentTab 갱신
  const clickMenuHandler = (index) => {
    clickTab(index);
  };

  const goVideo = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    sessionStorage.setItem("teamspaceIdx", teamspaceIdx);
    Navigate(`../teamspace/video/${teamspaceIdx}`, {
      state: { teamspace: teamspaceIdx },
    });
  };

  let au = null;
  if (localStorage.getItem("accessToken")) {
    au = true;
  } else {
    au = false;
  }

  if (au) {
    return (
      <>
        <t.Container>
          <t.Header>
            <t.TabMenu>
              {menuArr.map((el, index) => (
                <li
                  className={
                    index === currentTab ? "submenu focused" : "submenu"
                  }
                  key={index}
                >
                  <span onClick={() => clickMenuHandler(index)}>{el.name}</span>
                </li>
              ))}
            </t.TabMenu>
            <div className="button-wrapper">
              <TeamspaceInvite />
            </div>
          </t.Header>
          <div className="content-box">
            <div className="nowContent">{menuArr[currentTab].content}</div>
            <div className="schedule-box">
              <ScheduleBar />
              <div>
                <img src={Video} alt="video-chat" />
                <span onClick={goVideo} style={{ color: "white" }}>
                  화상 회의 참여하기
                </span>
              </div>
            </div>
          </div>
        </t.Container>
      </>
    );
  } else {
    return <div>로그인이 필요합니다.</div>;
  }
}
export default TeamspaceDetailPage;
