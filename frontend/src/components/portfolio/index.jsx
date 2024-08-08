import { useState, useRef } from "react";
import Button from "common/Button";
import Modal from "common/Modal";
import { musicUpload } from "API/PortfolioAPI";
import defaultimage from "assets/images/default-profile.png";
import { Link } from "react-router-dom";
import * as p from "./PortfolioAddModal.styled";

function PortfolioAddModal({ onClose }) {
  const [pinFixed, setPinFixed] = useState(false);
  // const [fileDescription, setFileDescription] = useState('')
  const [title, setTitle] = useState("");
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [musicFile, setMusicFile] = useState();
  const [lyricFile, setLyricFile] = useState();

  // 음원 제목
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  // 음원 설명
  // const handleDescription = (e) => {
  //     e.preventDefault()
  //     setFileDescription(e.target.value)
  // }

  // 앨범 커버 (jpg, jpeg, png)
  const handleImgFile = (e) => {
    e.preventDefault();
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    console.log(e.target.files[0]);
    setImgFile(e.target.files[0]);
  };

  // 음원 (mp3, flac)
  const handleMusicFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setMusicFile(e.target.files[0]);
    }
  };

  // 가사 (txt, xml)
  const handleLyricFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setLyricFile(e.target.files[0]);
    }
  };

  // const handlePin = (e) => {
  //     e.preventDefault()
  //     setPinFixed(e.target.checked)
  // }

  const handleUpload = async (e) => {
    e.preventDefault();

    if (musicFile === "") {
      alert("음원파일을 선택해주세요");
      return;
    }

    const formData = new FormData();
    const body = JSON.stringify({
      // pinFixed: pinFixed,
      // fileDescription: fileDescription,
      title: title,
    });

    formData.append("portfolioMusicPostReq", body);
    formData.append("file", imgFile);
    formData.append("file", musicFile);
    formData.append("file", lyricFile);

    try {
      await musicUpload(formData);
      alert("업로드가 완료되었습니다.");
      setTitle("");
      setPinFixed(false);
      setImgFile("");
      setMusicFile("");
      setLyricFile("");
    } catch (err) {}
  };

  return (
    <Modal name={"포트폴리오 업로드"} onClose={onClose}>
      <form onSubmit={handleUpload}>
        <p.FormWrap>
          <p.Label>Title</p.Label>
          <p.Input type="text" placeholder="제목" onChange={handleTitle} />
        </p.FormWrap>
        {/* <div className='inputWrapper'>
                    <label className='label'>Content</label>
                    <input type='text' className='input' placeholder='설명' onChange={handleDescription} />
                </div> */}
        <p.Profile
          src={imgPreview ? imgPreview : defaultimage}
          alt="프로필 이미지"
        />
        <p.FormWrap>
          <label className="label-file">앨범 커버 (jpg, jpeg, png)</label>
          <p.Input
            type="file"
            onChange={handleImgFile}
            accept=".jpg,.jpeg,.png"
            ref={imgRef}
            id="input-file-album"
          />
        </p.FormWrap>
        <p.FormWrap>
          <label className="label-file" for="input-file-music">
            음원 (mp3, flac)
          </label>
          <p.Input
            type="file"
            onChange={handleMusicFile}
            accept=".mp3,.flac"
            style={{ display: "none" }}
            id="input-file-music"
          />
        </p.FormWrap>
        <p.FormWrap>
          <label className="label-file" for="input-file-lyric">
            가사 (txt, xml)
          </label>
          <p.Input
            type="file"
            onChange={handleLyricFile}
            accept=".txt,.xml"
            style={{ display: "none" }}
            id="input-file-lyric"
          />
        </p.FormWrap>
        {/* <div className='inputWrapper'>
                    <label className='label'>pin고정</label>
                    <input type='checkbox' className='input' onChange={handlePin} />
                </div> */}
        {/* <FaFileUpload size={80}/> */}
        <br />
        <Link to="/musics">
          <Button type="submit" text={"업로드"} />
        </Link>
      </form>
    </Modal>
  );
}

export default PortfolioAddModal;
