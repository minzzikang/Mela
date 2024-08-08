import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PortfolioContainer = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;
export const Album = styled.img`
  width: 90%;
  height: 60%;
  border-radius: 10%;
`;

export const Lyrics = styled.div`
  position: relative;
  z-index: 1000;
  color: white;
  width: 400px;
  height: 400px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Open = styled.div`
  width: fit-content;
  cursor: pointer;
`;
