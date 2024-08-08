import { signin } from "API/AuthAPI";
import useStore from "status/store";
import { useNavigate, Link } from "react-router-dom";
import * as c from "./CoSiginModal.styled";
import { useState } from "react";
import Button from "common/Button";
import BackBtn from "assets/icons/BackBtn.png";

function CoSigninModal({ onClose }) {
  const setIsLogined = useStore((state) => state.setIsLogined);
  const fetchUser = useStore((state) => state.fetchUser);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signin(values)
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("accessToken", res.accessToken);
        setIsLogined(true);
        fetchUser().then(() => {});
        navigate("/community/create");
      })
      .then(() => {})
      .catch((err) => {});
  };

  return (
    <c.Container>
      <c.BlackBox onClick={onClose} />
      <c.Wrap>
        <c.ModalName>SIGN IN</c.ModalName>
        <form onSubmit={handleSubmit}>
          <c.FormWrap>
            <c.Label>Email</c.Label>
            <c.Input
              id="id"
              type='email'
              placeholder="ssafy@gmail.com"
              onChange={handleChange}
              required
            />
          </c.FormWrap>
          <c.FormWrap>
            <c.Label>Password</c.Label>
            <c.Input
              id="password"
              type='password'
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </c.FormWrap>
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
        <c.Backdrop onClick={onClose}>
          <img src={BackBtn} alt='back button'/>
        </c.Backdrop>
      </c.Wrap>
    </c.Container>
  );
}

export default CoSigninModal;
