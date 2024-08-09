import DefaultFileShape from "common/FolderShape";
import TeamspaceCreate from "components/teamspace/TeamspaceCreate";
import Navbar from "common/Navbar";
import Sidebar from "common/Sidebar";
import Alarmbar from "components/alarm/AlarmBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TeamspaceList } from "API/TeamspaceAPI";
import * as t from "./TeamspaceMainPage.styled";
import Add from "assets/icons/Add.png";

function TeamspaceMainPage() {
  const Navi = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [newTeamspace, setNewTeamspace] = useState(null);
  const [values, setValues] = useState({
    endDate: "",
    host: {},
    startDate: "",
    teamDescription: "",
    teamName: "",
    teamspaceBackgroundPictureFileIdx: {},
    teamspaceIdx: "",
    teamspacePictureFileIdx: {},
  });

  useEffect(() => {
    const myTeamspaceList = async () => {
      try {
        const teamspace = await TeamspaceList();
        setValues(teamspace);
      } catch (err) {
        console.error(err);
      }
    };

    myTeamspaceList();
  }, [newTeamspace]);

  return (
    <t.TeamspaceContainer>
      <t.SideDiv>
        <Sidebar paddingtop="6vh" />
      </t.SideDiv>
      <t.MainDiv>
        <Navbar backcolour="10" />
        <Outlet />
        <t.AddWrap onClick={() => setIsOpen(true)}>
          <t.Add src={Add} alt="add" />
          <span>Create</span>
        </t.AddWrap>
        {isOpen && <TeamspaceCreate onClose={() => setIsOpen(false)} />}
        <t.FileContainer>
          {Object.entries(values).map(([key, value]) => (
            <DefaultFileShape
              key={value.teamspaceIdx}
              title={value.teamName}
              content={value.teamDescription}
              day={value.endDate}
              image={value.teamspacePictureFileIdx}
              onClick={() => Navi(`/teamspace/${value.teamspaceIdx}`)}
            />
          ))}
        </t.FileContainer>
      </t.MainDiv>
      <t.RSideDiv>
        <Alarmbar />
      </t.RSideDiv>
    </t.TeamspaceContainer>
  );
}

export default TeamspaceMainPage;
