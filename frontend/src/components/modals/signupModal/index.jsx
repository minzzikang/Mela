import * as s from "./Signup.styled";
import { emailCheck } from "API/UserAPI";
import { signup, checkDupNickname } from "API/AuthAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "common/Button";
import BackBtn from "assets/icons/backBtn.png";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";


function Index({ onClose }) {
  const navigate = useNavigate();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [values, setValues] = useState({
    emailId: "",
    emailDomain: "",
    password: "",
    name: "",
    nickname: "",
    gender: "",
    birth: "",
    searchAllow: "",
  });

  // 이메일 아이디 중복 확인
  const checkEmailId = (e) => {
    e.preventDefault();
    emailCheck({ emailId: values.emailId })
      .then((res) => {
        if (res.statusCode === 200) {
          alert("사용 가능한 아이디입니다.");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 409) {
          alert("이미 있는 아이디입니다.");
        }
      });
  };

  // 닉네임 중복 확인
  const checkNickname = () => {
    checkDupNickname({ nickname: values.nickname })
      .then((res) => {
        if (res.statusCode === 200) {
          alert("사용 가능한 닉네임입니다.");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 409) {
          alert("이미 있는 닉네임입니다.");
        }
      });
  };

  // 비밀번호 확인
  const handlePasswordCheck = async (e) => {
    const currentPasswordCheck = e.target.value;
    setPasswordConfirm(currentPasswordCheck);
    if (values.password !== currentPasswordCheck) {
      setIsPasswordConfirm(false);
    } else {
      setIsPasswordConfirm(true);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleGenderChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    const formmatedDate = moment(date).format("YYYY-MM-DD");
    setBirthDate(formmatedDate);
    setValues({ ...values, birth: formmatedDate });
  };

  const handleSearchAllowChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(values)
      .then((res) => {
        alert("이메일 인증을 진행해주세요.");
        navigate(`/signup/${values.emailId}`);
      })
      .catch((err) => {});
  };

  return (
    <s.Container>
      <s.BlackBox onClick={onClose} />
      <s.Wrap>
        <s.ModalName>SIGN UP</s.ModalName>
        <form onSubmit={handleSubmit}>
          <s.FormWrap>
            <s.Label>Email</s.Label>
            <input
              className="input-email"
              id="emailId"
              type="text"
              placeholder="ssafy"
              onChange={handleChange}
              required
            />
            <span style={{ alignContent: 'center'}}>@</span>
            <input
              className="input-email"
              id="emailDomain"
              type="text"
              placeholder="gmail.com"
              onChange={handleChange}
              required
            />
            <input
              type="button"
              value="중복 확인"
              onClick={checkEmailId}
              className="checkButton"
            />
          </s.FormWrap>
          <s.FormWrap>
            <s.Label>Password</s.Label>
            <s.Input
              id="password"
              type="password"
              placeholder="8-25자 영어, 숫자, 특수문자 조합"
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,25}$"
              onChange={handleChange}
            />
          </s.FormWrap>
          <s.FormWrap>
            <s.Label>Password again</s.Label>
            <s.Input
              id="password2"
              type="password"
              value={passwordConfirm}
              required
              onChange={handlePasswordCheck}
            />
          </s.FormWrap>
          {passwordConfirm &&
            (isPasswordConfirm ? (
              <div className="password-confirm">
                <p style={{ color: "blue" }}>비밀번호가 일치합니다.</p>
              </div>
            ) : (
              <div className="password-confirm">
                <p style={{ color: "red" }}>비밀번호가 다릅니다.</p>
              </div>
            ))}
          <s.FormWrap>
            <s.Label>Name</s.Label>
            <s.Input
              id="name"
              type="text"
              placeholder="홍길동"
              required
              onChange={handleChange}
            />
          </s.FormWrap>
          <s.FormWrap>
            <s.Label>Nickname</s.Label>
            <s.Input
              id="nickname"
              type="text"
              placeholder="최대 25자"
              required
              onChange={handleChange}
            />
            <input
              type="button"
              value="중복 확인"
              onClick={checkNickname}
              className="checkButton"
            />
          </s.FormWrap>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="gender-select">
              <s.Label>Gender</s.Label>
              <s.Select
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleGenderChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Etc">Etc</option>
              </s.Select>
            </div>
            <div className="birth-select">
              <s.Label>Birth</s.Label>
              <s.MyDatePicker
                id="birth"
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                disabledKeyboardNavigation
                selected={birthDate}
                onChange={handleDateChange}
                popperPlacement="left"
                locale={ko}
                required
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "flex-start",
              marginTop: "0.8em",
            }}
          >
            <input
              type="checkbox"
              id="searchAllow"
              onChange={handleSearchAllowChange}
            />
            <span>다른 회원의 검색 조건에 노출을 허용합니다.</span>
          </div>
          <br />
          <Button
            type="submit"
            text="Create an account"
            width="100%"
            height="2.5rem"
            backgroundcolor="#254ef8"
            borderradius="0.5rem"
          />
        </form>
        <s.Backdrop onClick={onClose}>
          <img src={BackBtn} alt="back-button" />
        </s.Backdrop>
      </s.Wrap>
    </s.Container>
  );
}

export default Index;
