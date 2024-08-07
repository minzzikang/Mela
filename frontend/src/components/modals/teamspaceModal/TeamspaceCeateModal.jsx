import { TeamspaceGenerate } from "../../../API/TeamspaceAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as t from "./TeamspaceCreateModal.styled";
import Button from "../../../common/Button";
import BackBtn from "../../../assets/icons/backBtn.png";

function TeamspaceCreateModal({ onClose }) {
  const navigate = useNavigate();
  const today = new Date();

  let todayMonth =
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : "0" + (today.getMonth() + 1);
  let todayDay = today.getDate() > 9 ? today.getDate() : "0" + today.getDate();
  const formattedDate = `${today.getFullYear()}-${todayMonth}-${todayDay}`;

  const [values, setValues] = useState({
    teamName: "",
    startDate: formattedDate,
    endDate: "",
    teamDescription: "",
  });

  const [imgFile, setImgFile] = useState("");
  const [backImgFile, setBackImgFile] = useState("");

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleImgFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };

  const handleBackFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setBackImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const registerInfo = JSON.stringify({
      teamName: values.teamName,
      startDate: values.startDate,
      endDate: values.endDate,
      teamDescription: values.teamDescription,
    });
    formData.append("registerInfo", registerInfo);
    formData.append("teamspaceBackgroundPicture", backImgFile);
    formData.append("teamspacePicture", imgFile);

    try {
      const res = await TeamspaceGenerate(formData);
      alert("팀스페이스 생성이 완료되었습니다.");
      navigate(`../teamspace/${res.message}`);
      // setOpen(!open);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <t.Container>
      <t.BlackBox onClick={onClose} />
      <t.Wrap>
        <t.ModalName>Create</t.ModalName>
        <form onSubmit={handleSubmit}>
          <t.FormWrap>
            <t.Label>배경 이미지</t.Label>
            <input
              type="file"
              id="backInput"
              className="inputFile"
              onChange={handleBackFile}
            />
            <label htmlFor="backInput" className="holder">
              배경 이미지 추가하기
            </label>
          </t.FormWrap>
          <t.FormWrap>
            <t.Label>프로필 이미지</t.Label>
            <input
              type="file"
              id="profileInput"
              className="inputFile"
              onChange={handleImgFile}
            />
            <label htmlFor="profileInput" className="holder">
              프로필 이미지 추가하기
            </label>
          </t.FormWrap>
          <t.FormWrap>
            <t.Label>종료일</t.Label>
            <t.Input type="date" id="endDate" onChange={handleChange} />
          </t.FormWrap>
          <t.FormWrap>
            <t.Label>팀스페이스 명</t.Label>
            <t.Input
              id="teamName"
              type="text"
              placeholder="팀 스페이스 이름을 입력해주세요. (최대 30자)"
              onChange={handleChange}
              required
            />
          </t.FormWrap>
          <t.FormWrap>
            <input
              type="text"
              id="teamDescription"
              onChange={handleChange}
              placeholder="팀 스페이스 설명을 입력해주세요."
            />
          </t.FormWrap>
          <Button
            type="submit"
            text="Create"
            width="100%"
            height="2.5rem"
            backgroundcolor="#254ef8"
            borderradius="0.5rem"
          />
        </form>
        <t.Backdrop onClick={onClose}>
          <img src={BackBtn} alt="back-button" />
        </t.Backdrop>
      </t.Wrap>
    </t.Container>
  );
}

export default TeamspaceCreateModal;
