import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  height: 100%;
  color: white;
  padding-top: 3%;
  justify-content: space-evenly;
`;

export const Side = styled.div`
  width: 12.5vw;
  padding-left: 1%;
`;

export const Main = styled.div`
  width: 64%;
  height: 100%;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow-x: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RSide = styled.div`
  width: 15%;
`;
