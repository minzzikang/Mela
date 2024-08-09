import React, { useState, useEffect } from "react";
import { TeamspaceInfo, TeamspaceMember } from "API/TeamspaceAPI";
import { useParams } from "react-router-dom";
import defaultBackImage from "assets/images/default-cover.jpg";
import defaultTeamspaceImage from "assets/images/default-image.png";
import defaultProfile from "assets/images/default-profile.png";
import * as t from './TeamspaceTeam.styled'

function Index() {
  const { teamspaceIdx } = useParams();
  const [values, setValues] = useState({});
  const [backImgURL, setBackImgURL] = useState();
  const [teamspaceImgURL, setTeamspaceImgURL] = useState();
  const [profileURL, setProfileURL] = useState();

  // 멤버 정보
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const info = async () => {
      try {
        const teamInfo = await TeamspaceInfo(teamspaceIdx);
        setValues(teamInfo);

        const memberInfo = await TeamspaceMember(teamspaceIdx);
        setMembers(memberInfo);
      } catch (err) {
      }
    };
    info();
  }, [members]);

  useEffect(() => {
    const backImgInfo = async () => {
      try {
        if (values.teamspaceBackgroundPictureFileURL) {
          setBackImgURL(values.teamspaceBackgroundPictureFileURL);
        } else {
          setBackImgURL(defaultBackImage);
        }
      } catch (err) {
        console.error(err);
      }
    };

    backImgInfo();

    const teamImgInfo = async () => {
      try {
        if (values.teamspacePictureFileURL) {
          setTeamspaceImgURL(values.teamspacePictureFileURL);
        } else {
          setTeamspaceImgURL(defaultTeamspaceImage);
        }
      } catch (err) {
        console.error(err);
      }
    };

    teamImgInfo();
  }, [values]);

  return (
    <>
      <t.Container>
        <t.ImageWrap>
          <t.BackgroundImage src={backImgURL} alt="팀스페이스 배경 이미지" />
          <t.TeamspaceImage src={teamspaceImgURL} alt="팀스페이스 이미지" />
          <t.H1>{values.teamName}</t.H1>
          <p>{values.teamDescription}</p>
        </t.ImageWrap>
        <br />
        <h2>Members</h2>
        <br />
        <t.MemberWrap>
          {Object.entries(members).map(([key, member]) => (
            <t.Card key={member.userIdx}>
              {member.profileImageURL === null ? (
                <>
                  <t.Profile src={defaultProfile} alt="프로필 이미지" />
                </>
              ) : (
                <>
                  <t.Profile src={member.profileImageURL} alt="프로필 이미지" />
                </>
              )}
              <t.Nickname>{member.nickname}</t.Nickname>
            </t.Card>
          ))}
        </t.MemberWrap>
      </t.Container>
    </>
  );
}

export default Index;