import { useState } from "react";
import { shortsUpload } from "API/ShortsAPI";
import * as s from "./ProfileShortsUpload.styled";
import Button from "common/Button";
import Modal from "common/Modal";

function ProfileShortsUpload({ onClose }) {
  const [values, setValues] = useState({
    fileDescription: "",
  });

  const [file, setFile] = useState("");

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = JSON.stringify({
      fileDescription: values.fileDescription,
    });
    formData.append("shortsPostReq", data);
    formData.append("file", file);

    try {
      const res = await shortsUpload(formData);
      alert("쇼츠가 업로드 되었습니다.");
    } catch (err) {}
  };

  return (
    <Modal name={"Shorts upload"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <s.FormWrap>
          <s.Label>업로드 할 영상</s.Label>
          <input
            type="file"
            id="backInput"
            className="file-input"
            onChange={handleFile}
            accept=".mp4, .mkv, .avi"
          />
          <label htmlFor="backInput" className="holder">
            쇼츠 추가하기
          </label>
        </s.FormWrap>
        <s.FormWrap>
          <s.Input
            type="text"
            id="fileDescription"
            onChange={handleChange}
            placeholder="설명을 입력해주세요."
          />
        </s.FormWrap>
        <Button type="submit" text="Upload" width="100%" height="2.5rem" />
      </form>
    </Modal>
  );
}

export default ProfileShortsUpload;
