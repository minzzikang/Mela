import styled from "styled-components";

export const Container = styled.div`
  background-color: #202c44;
  display: flex;
  flex-direction: column;
  height: 30%;
  max-height: 30vh;
  border-radius: 20px;
  padding: 15px;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: large;

  img {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  margin-top: 10px;
  display: flex;

  .read {
    width: 0.7rem;
    height: 0.7rem;
    background-color: #6c7383;
    border-radius: 50%;
    margin-right: 5px;
  }

  .unread {
    width: 0.7rem;
    height: 0.7rem;
    background-color: #254ef8;
    border-radius: 50%;
    margin-right: 5px;
  }

  .link {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
`;
