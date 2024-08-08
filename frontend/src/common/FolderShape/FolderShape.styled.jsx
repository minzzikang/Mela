import styled from "styled-components";

export const Container = styled.div`
  // 폴더 모양으로 자르기
  // 참고 => https://bennettfeely.com/clippy/
  clip-path: polygon(47% 0, 61% 15%, 100% 15%, 100% 75%, 0 75%, 0 0);
  width: 260px;
  height: 270px;
  display: flex;
  flex-direction: column;
  background: #202c44;
  box-shadow: 0px 11px 5px #1b263b;
  border-radius: 20px;
  justify-content: space-evenly;
  padding-bottom: 5%;
  padding-left: 3vw;
  padding-right: 3vw;
  cursor: pointer;

  .titleday {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .imgcontent {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  &:hover {
    /* Rectangle 4017 */
    background: linear-gradient(180deg, #873ffa 29.5%, #254ef8 100%);
    box-shadow: 0px 11px 5px #342c93;
    border-radius: 20px;
  }
`;

// 프로젝트 이름
export const Title = styled.span`
  color: white;
  font-weight: bold;
  /* top: 70px;
    left: 30px; */
  font-size: x-large;
`;

// 프로젝트 설명
export const Content = styled.span`
  color: white;
  /* top: 180px;/ */
`;

// 프로젝트 디데이
export const Day = styled.span`
  color: white;
  /* top: 70px;
  right: 30px; */
`;

// 프로젝트 프로필
export const Img = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  /* margin-left: 3rem; */
`;
