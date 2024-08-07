import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  margin: 20px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h3`
  color: white;
  margin-bottom: 10px;
`;

export const ListWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2px 5%;
  padding-top: 3%;
  padding-left: 0%;
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
