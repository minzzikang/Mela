import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 1%;
`;

export const P = styled.p`
  font-size: x-large;
  padding-top: 3%;
  padding-left: 7%;
  font-weight: bold;
`;

export const TabMenu = styled.ul`
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: px;

  // 메뉴 css
  .submenu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 30px;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  // 선택한 메뉴 css
  .focused {
    text-decoration: underline;
    text-decoration-color: #254ef8;
  }
`;
export const Container = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  color: white;
  padding-top: 3%;
  height: 70rem;
  justify-content: space-evenly;
`;

export const Side = styled.div`
  width: 12.5vw;
  padding-left: 1%;
`;

export const MainWrap = styled.div`
  width: 67.5vw;
  height: 700px;
`;
export const Main = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 3%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  height: 70%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  .Container {
    margin-top: 5%;
    h1 {
      margin-bottom: 3vh;
    }
  }
`;

export const RSide = styled.div`
  width: 15vw;
`;
