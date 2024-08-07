import { signin } from "../../../API/AuthAPI";
import useStore from "../../../status/store";
import { useNavigate, Link } from "react-router-dom";
import * as s from "./Signin.styled";
import { useState } from "react";
import Button from "../../../common/Button";
import BackBtn from "../../../assets/icons/backBtn.png";

function Index({ onClose }) {
  const setIsLogined = useStore((state) => state.setIsLogined);
  const fetchUser = useStore((state) => state.fetchUser);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signin(values);

      if (res && res.accessToken) {
        localStorage.clear();
        localStorage.setItem("accessToken", res.accessToken);
        setIsLogined(true);
        await fetchUser();
        window.location.reload();
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const emailId = values.id.split("@");
        alert("이메일 인증을 먼저 완료해주세요.");
        navigate(`/signup/${emailId[0]}`);
      } else {
        alert("로그인 실패");
      }
    }
  };

  return (
    <s.Container>
      <s.BlackBox onClick={onClose} />
      <s.Wrap>
        <s.ModalName>SIGN IN</s.ModalName>
        <form onSubmit={handleSubmit}>
          <s.FormWrap>
            <s.Label>Email</s.Label>
            <s.Input
              id="id"
              type='email'
              placeholder="ssafy@gmail.com"
              onChange={handleChange}
              required
            />
          </s.FormWrap>
          <s.FormWrap>
            <s.Label>Password</s.Label>
            <s.Input
              id="password"
              type='password'
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </s.FormWrap>
          <Button
            type="submit"
            text="Log in"
            width="100%"
            height="2.5rem"
            backgroundcolor="#254ef8"
            borderradius="0.5rem"
          />
        </form>
        <Link to="/forgotPassword">
          <div id="find-password" className="find-password">
            Forgot password
          </div>
        </Link>
        <s.Backdrop onClick={onClose}>
          <img src={BackBtn} alt='back button'/>
        </s.Backdrop>
      </s.Wrap>
    </s.Container>
  );
}

export default Index;
