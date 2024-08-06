import styled from "styled-components";

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .buttonholder {
    display: flex;
    width: 100%;
    justify-content: end;
    padding-right: 5%;
    align-items: baseline;
  }
`;

export const Titles = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 50%;
  }
`;

export const InnerWrap = styled.div`
  display: flex;
  align-items: center;
  img {
    padding-bottom: 5%;
  }
`;

export const FolderWrap = styled.div`
  margin-top: 2vh;
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  padding-top: 3%;
  margin-bottom: 0%;
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

  /* 볼륨 조절 슬라이드 */
  &::-webkit-media-controls-volume-slider {
    display: none !important;
  }
`;
