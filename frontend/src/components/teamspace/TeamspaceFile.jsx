import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Button from "common/Button";
import Modal from "common/Modal";
import Trash from "assets/icons/Trash.png";
import FileDown from "assets/icons/FileDown.png";
import { uploadTeamspaceFile, TeamspaceFileList } from "API/TeamspaceAPI";
import { downloadFile, deleteFile } from "API/FileAPI";
import defaultProfile from "assets/images/default-profile.png";

function TeamspaceFile() {
  const [isOpen, setIsOpen] = useState(false);
  const { teamspaceIdx } = useParams();
  const [file, setFile] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [values, setValues] = useState();

  useEffect(() => {
    const teamspaceFileList = async () => {
      try {
        const teamspaceFile = await TeamspaceFileList(teamspaceIdx);
        if ("fileIdx" in Object.values(teamspaceFile)[0]) {
          setValues(teamspaceFile);
        } else {
          setValues("");
        }
      } catch (err) {
        console.error(err);
      }
    };

    teamspaceFileList();
  }, []);

  const handleDescription = async (e) => {
    setFileDescription(e.target.value);
  };

  const handleFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownloadFile = async (fileIdx) => {
    // // console.log(fileIdx)
    // try {
    // // console.log(fileIdx)
    // const response = await downloadFile(fileIdx)
    // console.log(response)
    // } catch (err) {
    //     console.log(err)
    // }
  };

  const handleDeleteFile = async (fileIdx) => {
    try {
      const response = await deleteFile(fileIdx);
    } catch (err) {}
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (file === "") {
      alert("파일을 선택해주세요");
      return;
    }

    const formData = new FormData();

    const body = JSON.stringify({
      fileDescription: fileDescription,
    });

    formData.append("filePostReq", body);
    formData.append("file", file);

    try {
      await uploadTeamspaceFile({
        formData: formData,
        teamspaceid: teamspaceIdx,
      });
      alert("업로드가 완료되었습니다.");
      setFile("");
      setFileDescription("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Button
        text={"Upload"}
        backgroundcolor={"#873FFA"}
        fontcolor={"white"}
        width={"80px"}
        onClick={() => setIsOpen(true)}
        height={"30px"}
      />
      <br />
      <div>
        {values ? (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>upload User</Th>
                  <Th>File Description</Th>
                  <Th>file</Th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(values).map(([key, value]) => (
                  <tr key={value.fileIdx}>
                    <Td>
                      {value.uploaderProfileImageUrl ? (
                        <Profile
                          src={value.uploaderProfileImageUrl}
                          alt="프로필 이미지"
                        />
                      ) : (
                        <Profile src={defaultProfile} alt="프로필 이미지" />
                      )}
                      {value.userIdx.nickname}
                    </Td>
                    <Td>
                      {value.originalFilename}
                      <br />
                      {value.fileDescription}
                    </Td>
                    <Td>
                      <a
                        href={
                          process.env.REACT_APP_API_URL +
                          "/file/download?fileIdx=" +
                          value.fileIdx
                        }
                        download
                        rel="noreferrer"
                      >
                        <img src={FileDown} alt="fileDown" />
                      </a>
                      <img
                        src={Trash}
                        alt="del"
                        onClick={() => handleDeleteFile(value.fileIdx)}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <Div>업로드 된 파일이 없습니다.</Div>
        )}
      </div>

      <Modal name={"File upload"} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleUpload}>
          <FormWrap>
            <Label>File Description</Label>
            <Input
              type="text"
              placeholder="설명"
              onChange={handleDescription}
            />
          </FormWrap>
          <FileInputWrap>
            <div className="input-btn">
              <input
                type="file"
                className="file-input"
                onChange={handleFile}
                id="input-file"
              />
              <label htmlFor="input-file" className="holder">
                파일 추가
              </label>
            </div>
            {file ? <p>{file.name}</p> : <p>등록된 파일이 없습니다.</p>}
          </FileInputWrap>
          <Button text="업로드" type="submit" />
        </form>
      </Modal>
    </>
  );
}

export default TeamspaceFile;

export const FileInputWrap = styled.div`
  display: flex;
  justify-content: space-between;

  & .file-input {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
  }

  & .holder {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    color: gray;
  }
`;

const Div = styled.div`
  color: white;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Table = styled.table`
  color: white;
  width: 100%;
`;

const Td = styled.td`
  border: solid 1px white;
  vertical-align: middle;
`;

const Th = styled.th`
  border: solid 1px white;
  vertical-align: middle;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  height: 2.5rem;
  color: white;
  flex-grow: 1;
`;

export const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-bottom: 1rem;
  background-color: #151c2c;
  padding: 0.2rem;

  & .label-file {
    padding: 6px 25px;
    background-color: #254ef8;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
`;

export const Label = styled.span`
  color: #254ef8;
  font-weight: bold;
  padding: 10px;
`;
