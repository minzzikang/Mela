import styled from "styled-components";

export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2px 10%;
  padding-top: 3%;
  padding-left: 7%;
`;

export const TeamspaceContainer = styled.div`
  background-color: ${(props) => props.theme.colours.primary};
  display: flex;
  color: white;
  padding-top: 3%;
  height: 100%;
  justify-content: space-evenly;
`;

export const AddWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 1.5em;
`;

export const Add = styled.img`
  width: 2em;
  height: 2em;
`;

export const SideDiv = styled.div`
  width: 12.5vw;
  padding-left: 1%;
  height: 50vh;
`;

export const MainDiv = styled.div`
  width: 64%;
  height: 100%;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colours.point};
  border-radius: 50px;
  overflow: hidden;
  padding-top: 1%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;

  .Container {
    margin-top: 5%;
    h1 {
      margin-bottom: 3vh;
    }
  }
`;

export const RSideDiv = styled.div`
  width: 15%;
`;
