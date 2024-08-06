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
