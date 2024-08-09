import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  color: white;
  padding-top: 3%;
  height: 70rem;
  justify-content: space-evenly;
`;

export const ListWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2px 5%;
  padding-top: 3%;
  padding-left: 3%;
`;

export const Side = styled.div`
  width: 12.5vw;
  padding-left: 1%;
`;

export const Main = styled.div`
  width: 64%;
  height: 600px;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  .main-box {
    padding: 30px;
    margin-top: 20px;
  }
`;

export const Header = styled.div`
display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RSide = styled.div`
  width: 15%;
`;

export const Card = styled.div`
  width: 250px;
  height: 200px;
  background-color: #202c44;
  border-radius: 15%;
  margin-bottom: 5%;
  cursor: pointer;
`;

export const ShortsWrap = styled.video`
  width: 250px;
  height: 280px;
  background-color: #202c44;
  border-radius: 15%;
  margin-bottom: 5%;
  /* 전체화면 버튼 */
  &::-webkit-media-controls-fullscreen-button {
    display: none !important;
  }

  /* 일시정지, 재생 버튼 */
  &::-webkit-media-controls-play-button {
    display: none !important;
  }

  /* 재생 슬라이드..? */
  &::-webkit-media-controls-timeline {
    display: none !important;
  }

  /* 현재 진행 시간 */
  &::-webkit-media-controls-current-time-display {
    display: none !important;
  }

  /* 전체 시간 */
  &::-webkit-media-controls-time-remaining-display {
    display: none !important;
  }

  /* 음소거 버튼 */
  &::-webkit-media-controls-mute-button {
    display: none !important;
  }

  /* 볼륨 조절 슬라이드 */
  &::-webkit-media-controls-volume-slider {
    display: none !important;
  }
`;

export const Title = styled.div`
  color: white;
  padding-top: 20%;
  padding-left: 10%;
  padding-right: 10%;
  font-weight: bold;
  font-size: x-large;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;

export const Content = styled.div`
  color: white;
  padding-top: 15%;
  padding-left: 10%;
  padding-right: 10%;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;
