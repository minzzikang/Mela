import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%; // Adjust the width as needed
  height: 70%; // Adjust the height as needed
  display: flex;
  justify-content: center;
  align-items: center;
  background: #151c2c;
  z-index: 1000;
  border-radius: 30px;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  justify-content: center;
  width: 70%;
  height: 70%;
  margin: 2% 2%;
  text-align: center;
  margin-block-end: 30px 50px;
  background-color: #2a3446;
  border-radius: 30px;
  color: white;
  padding-top: 3%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const SearchBar = styled.form`
  // 최상위
  position: relative;
  width: 70%;
  text-align: center;
  margin-left: 1%;
  margin-top: 20px;
  // search 문구 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: flex-start;

  & > input {
    background-color: #202c44;
    min-height: 20px;
    width: 80%;
    height: 4vh;
    border: 0;
    border-radius: 15rem;
    padding-left: 8%;
    /* min-width: 80px; */
    text-align: center;
    color: white;
    outline: none;
  }
  // Icon 위치 조절
  .Icon {
    background-color: #202c44;
    color: grey;
    position: absolute;
    top: 50%;
    left: 12%;
    transform: translateY(-50%);
    height: 85%;
  }
`;

export const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;
