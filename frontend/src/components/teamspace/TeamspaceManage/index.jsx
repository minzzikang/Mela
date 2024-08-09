import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TeamspaceUpdate } from "API/TeamspaceAPI";
import { TeamspaceInfo } from "API/TeamspaceAPI";
import moment from "moment";
import * as t from "./TeamspaceManage.styled";

function Index() {
  const { teamspaceIdx } = useParams();

  const [values, setValues] = useState({
    teamName: "",
    startDate: "",
    endDate: "",
    teamDescription: "",
  });

  const [imgFile, setImgFile] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [backImgFile, setBackImgFile] = useState("");
  const [backImgPreview, setBackImgPreview] = useState("");
  const [changeDate, setChangeDate] = useState(new Date());

  useEffect(() => {
    const getTeamspaceInfo = async () => {
      try {
        const res = await TeamspaceInfo(teamspaceIdx);
        setValues(res);
        setImgFile(res.teamspacePictureFile);
        setImgPreview(res.teamspacePictureFileURL);
        setBackImgFile(res.teamspaceBackgroundPictureFile);
        setBackImgPreview(res.teamspaceBackgroundPictureFileURL);
        setChangeDate(res.endDate);
      } catch (err) {}
    };
    getTeamspaceInfo();
  }, [teamspaceIdx]);

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formmatedDate = moment(date).format("YYYY-MM-DD");
    setChangeDate(formmatedDate);
  };

  const handleImgFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBackFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setBackImgFile(e.target.files[0]);
      setBackImgPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const updateInfo = JSON.stringify({
      teamName: values.teamName,
      startDate: values.startDate,
      endDate: changeDate,
      teamDescription: values.teamDescription,
    });
    formData.append("updateInfo", updateInfo);
    formData.append("teamspaceBackgroundPicture", backImgFile);
    formData.append("teamspacePicture", imgFile);

    try {
      const res = await TeamspaceUpdate({
        formData: formData,
        teamspaceId: teamspaceIdx,
      });
      alert("정보가 업데이트 되었습니다.");
    } catch (err) {}
  };

  return (
    <t.Container onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <h2>마감일 변경</h2>
          <t.DateUpdate>
            <p>
              기존 마감일 : {moment(values.endDate).format("YY-MM-DD(ddd)")}
            </p>
            <t.InputWrap>
              <label for="endDate">변경 마감일 : </label>
              <t.MyDatePicker
                id="endDate"
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                selected={changeDate}
                onChange={handleDateChange}
                popperPlacement="right"
              />
            </t.InputWrap>
          </t.DateUpdate>
          <t.Description>
            <h2>개요 변경</h2>
            <textarea
              type="text"
              value={values.teamDescription}
              id="teamDescription"
              onChange={handleChange}
              rows="7"
            />
          </t.Description>
        </div>
        <div style={{ flex: "1" }}>
          <h2>프로젝트 이미지 변경</h2>
          <t.ImageWrap>
            <t.ThumChange>
              <div>
                <label style={{ fontSize: "large" }}>썸네일 변경</label>
                <t.FileInputWrap>
                  <label for="input-file-thum">파일 선택</label>
                  <input
                    type="file"
                    onChange={handleImgFile}
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    id="input-file-thum"
                  />
                </t.FileInputWrap>
              </div>
              <t.Thumnail>
                {imgPreview && <img src={imgPreview} alt="미리보기" />}
              </t.Thumnail>
            </t.ThumChange>
            <hr />
            <div style={{ marginTop: "1rem" }}>
              <div>
                <label style={{ fontSize: "large" }}>배경 이미지 변경</label>
                <t.FileInputWrap>
                  <label for="input-file-back">파일 선택</label>
                  <input
                    type="file"
                    onChange={handleBackFile}
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    id="input-file-back"
                  />
                </t.FileInputWrap>
              </div>
              <t.BackThum>
                {backImgPreview && <img src={backImgPreview} alt="미리보기" />}
              </t.BackThum>
            </div>
          </t.ImageWrap>
        </div>
      </div>
      <t.Footer>
        <t.Button type="submit">
          <span>Save</span>
        </t.Button>
      </t.Footer>
    </t.Container>
  );
}

export default Index;
