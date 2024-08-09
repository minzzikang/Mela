import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "common/Button";
import Danger from "assets/icons/Danger.png";
import { fetchUser, updateUser, deleteUser } from "API/UserAPI";
import { getImg } from "API/FileAPI";
import defaultprofile from "assets/images/default-profile.png";
import * as p from "./ProfileUserEditPage.styled"

function ProfileUserEditPage() {
  const [imgFile, setImgFile] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);

  // 장르 //
  const genres = [
    "Pop",
    "Rock",
    "Hiphop",
    "Classic",
    "Jazz",
    "R&B",
    "Disco",
    "Electrionic",
    "Balad",
    "Country",
    "Reggae",
    "Folk",
    "Etc",
  ];

  // 포지션 //
  const positions = ["보컬", "작곡", "작사", "세션", "믹싱", "기타"];

  const handleGenreChange = (event) => {
    const { checked, value } = event.target;
    if (checked && selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, value]);
    } else if (!checked) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    } else if (checked && selectedGenres.length >= 3) {
      window.alert("장르는 최대 3개까지만 선택 가능합니다.");
      event.preventDefault();
    }
  };

  const handlePositionChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedPositions([...selectedPositions, value]);
    } else if (!checked) {
      setSelectedPositions(
        selectedPositions.filter((position) => position !== value)
      );
    }
  };

  const [userValues, setUserValues] = useState({
    name: "",
    nickname: "",
    gender: "",
    birth: "",
    searchAllow: "",
  });

  const [portfolioValues, setPortfolioValues] = useState({
    instagram: "",
    selfIntro: "",
    youtube: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetchUser();
        setUserValues(res[0]);
        setPortfolioValues(res[1]);
        setSelectedPositions(res[2]);
        setSelectedGenres(res[3]);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const imageInfo = async () => {
      try {
        if (portfolioValues.portfolio_picture_file_idx) {
          const response = await getImg(
            portfolioValues.portfolio_picture_file_idx.fileIdx
          );
          setImgPreview(response.message);
        } else {
          setImgPreview(defaultprofile);
        }
      } catch (err) {
        console.error(err);
      }
    };
    imageInfo();
  }, [userValues]);

  const handleImgFile = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUserChange = async (e) => {
    setUserValues({ ...userValues, [e.target.id]: e.target.value });
  };

  const handlePortfolioChange = async (e) => {
    setPortfolioValues({ ...portfolioValues, [e.target.id]: e.target.value });
  };

  const handleGenderChange = async (e) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const handleSearchAllowChange = async (e) => {
    setUserValues({ ...userValues, [e.target.id]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const user = JSON.stringify({
      name: userValues.name,
      nickname: userValues.nickname,
      gender: userValues.gender,
      birth: userValues.birth,
      searchAllow: userValues.searchAllow,
      genre: selectedGenres,
      position: selectedPositions,
    });
    const portfolio = JSON.stringify({
      instagram: portfolioValues.instagram,
      selfIntro: portfolioValues.selfIntro,
      youtube: portfolioValues.youtube,
    });

    formData.append("userUpdateInfo", user);
    formData.append("portfolioAbstractPostReq", portfolio);
    formData.append("portfolioPicture", imgFile);

    try {
      await updateUser(formData);
      alert("회원정보 수정이 완료되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    deleteUser()
      .then((res) => {
        alert("그동안 이용해주셔서 감사합니다.");
        window.location.href = "/";
      })
      .catch((err) => {});
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <p.Container>
      <p.Title>Profile Settings</p.Title>
      <p.Form onSubmit={handleSubmit}>
        <p.ProfileImageWrapper>
          <div className="image">
            <img src={imgPreview} alt="프로필 이미지" />
          </div>
          <input type="file" onChange={handleImgFile} />
        </p.ProfileImageWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Name</p.Label>
          </div>
          <p.Input
            type="text"
            id="name"
            value={userValues.name}
            onChange={handleUserChange}
            placeholder={userValues.name}
          />
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Nickname</p.Label>
          </div>
          <p.Input
            type="text"
            id="nickname"
            value={userValues.nickname}
            onChange={handleUserChange}
            placeholder={userValues.nickname}
          />
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Self-introdution</p.Label>
          </div>
          <p.TextArea
            type="text"
            id="selfIntro"
            value={portfolioValues.selfIntro}
            onChange={handlePortfolioChange}
            placeholder={portfolioValues.selfIntro}
          />
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Gender</p.Label>
          </div>
          <p.Input
            type="text"
            name="gender"
            value={userValues.gender}
            onChange={handleGenderChange}
            placeholder={userValues.gender}
          />
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Birth</p.Label>
          </div>
          <input
            type="date"
            id="birth"
            value={userValues.birth}
            onChange={handleUserChange}
            placeholder={userValues.birth}
          />
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Like genre</p.Label>
          </div>
          <p.GenreContainer>
            {genres.map((genre) => (
              <div key={genre}>
                <input
                  type="checkbox"
                  id={genre}
                  value={genre}
                  onChange={handleGenreChange}
                  checked={selectedGenres.includes(genre)}
                />
                <label htmlFor={genre}>{genre}</label>
              </div>
            ))}
          </p.GenreContainer>
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Position</p.Label>
          </div>
          <p.GenreContainer>
            {positions.map((position) => (
              <div key={position}>
                <input
                  type="checkbox"
                  id={position}
                  value={position}
                  onChange={handlePositionChange}
                  checked={selectedPositions.includes(position)}
                />
                <label htmlFor={position}>{position}</label>
              </div>
            ))}
          </p.GenreContainer>
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>Instagram</p.Label>
          </div>
          <p.Input
            type="text"
            id="instagram"
            value={portfolioValues.instagram}
            onChange={handlePortfolioChange}
            placeholder={portfolioValues.instagram}
          />
        </p.InputWrapper>
        <p.InputWrapper>
          <div className="label">
            <p.Label>YouTube</p.Label>
          </div>
          <p.Input
            type="text"
            id="youtube"
            value={portfolioValues.youtube}
            onChange={handlePortfolioChange}
            placeholder={portfolioValues.youtube}
          />
        </p.InputWrapper>
        <div className="findCheck">
          <p.Label>다른 회원 검색 노출 허용</p.Label>
          <div className="checkbox">
            <input
              type="checkbox"
              id="searchAllow"
              checked={userValues.searchAllow}
              onChange={handleSearchAllowChange}
            />
          </div>
        </div>
      </p.Form>
      <p.ButtonWrapper>
        <Button
          text={"Cancel"}
          backgroundcolor={"#6C7383"}
          fontcolor={"white"}
          width={"7rem"}
          onClick={handleCancel}
        />
        <div className="save-btn">
          <Button
            text={"Save"}
            backgroundcolor={"#254ef8"}
            fontcolor={"white"}
            width={"7rem"}
            onClick={handleSubmit}
          />
        </div>
      </p.ButtonWrapper>
      {/* <Span>
                <MdLockOutline />
                <span>Change password</span>
            </Span> */}
      <p.Span onClick={handleDelete}>
        <img src={Danger} alt='icon' />
        <span>회원 탈퇴</span>
      </p.Span>
    </p.Container>
  );
}

export default ProfileUserEditPage;