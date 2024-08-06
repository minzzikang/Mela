import styled from "styled-components";

export const Container = styled.div`
  padding-top: 1%;
  display: flex;
  height: 3rem;
  color: #ffffff;
  font-family: InterMedium;
  font-size: larger;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.$backcolour === "10"
      ? props.theme.colours.point
      : props.theme.colours.primary};
  span {
    font-size: large;
    /* margin-left: 5% ; */
  }
  img {
    height: 3rem;
    margin-left: 2%;
    margin-right: 5%;
  }
  .MenuContainer {
    display: flex;
    justify-content: space-evenly;
    padding: 1%;
    width: 40%;
  }
  a {
    text-decoration: none;
  }
`;
export const activeStyle = {
  color: "#873FFA",
};
export const deActiveStyle = {
  color: "#FFFFFF",
};

export const SearchBar = styled.form`
  // 최상위
  position: relative;
  width: 30%;
  text-align: center;
  // search 문구 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  // 인풋
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
  img {
    background-color: #202c44;
    color: grey;
    position: absolute;
    top: 15%;
    left: 12%;
    height: 60%;
  }
`;
