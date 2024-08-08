import styled from "styled-components";

export const Container = styled.div`
  background-color: #202c44;
  height: 70%;
  width: 80%;
  border-radius: 20px;
  margin-bottom: 1rem;
  color: white;

  .main-box {
    padding: 20px;
  }

  .footer {
    display: flex;
  }
`;

export const TabMenu = styled.ul`
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-evenly;

  // 메뉴 css
  .submenu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 30px;
    padding: 10px;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
  }

  // 선택한 메뉴 css
  .focused {
    border-bottom: solid 2px #254ef8;
  }

  p {
    color: #254ef8;
    font-size: 20px;
  }
`;

export const MenuWrap = styled.span`
  display: flex;
  align-items: center;
`;

export const MenuName = styled.span`
  margin-left: 10px;
`;
