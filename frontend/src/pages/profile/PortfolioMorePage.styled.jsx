import styled from "styled-components";

export const Hedaer = styled.div`
  display: flex;
  justify-content: center;
  color: white;

  .btn-wrapper {
    margin-left: 1rem;
  }
`;

export const PinList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;

  .title {
    display: flex;
  }
`;

export const AllList = styled.div`
  display: flex;
  padding: 20px;
  color: white;

  .title {
    display: flex;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 3%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Img = styled.img`
  width: 30px;
  height: 20px;
`;
