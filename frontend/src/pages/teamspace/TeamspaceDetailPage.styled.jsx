import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .content-box {
    display: flex;
    flex-direction: row;
  }

  .nowContent {
    flex: 0.7;
  }

  .schedule-box {
    flex: 0.3;
    /* margin-top: -4.5%; */
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TabMenu = styled.ul`
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 10px;

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