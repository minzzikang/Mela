import styled from "styled-components";

export const Container = styled.div`
  flex: 2;
  padding: 1rem;
  margin: 20px;
  display: flex;
  flex-direction: column;
  background-color: #202c44;
  border-radius: 20px;
  color: white;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .image {
    display: flex;
  }

  .userInfo {
    display: flex;
  }

  .name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }

  .genre {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .sns {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
  }
`;

export const Title = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Img = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  border: 2px solid white;
`;

export const URL = styled.img`
  width: 23px;
  height: 23px;
  padding-right: 2%;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;
