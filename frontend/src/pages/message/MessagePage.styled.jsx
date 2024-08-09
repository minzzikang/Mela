import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  color: white;

  .chatting-wrapper {
    flex: 3;
    padding: 20px;
  }

  .room-list {
    flex: 1;
    background-color: #202c44;
    padding: 20px;
    border-radius: 20px;
    margin-right: 1rem;
  }

  .header {
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
    font-weight: bold;
  }

  .icon {
    margin-right: 1rem;
  }
`;

export const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  // height: 5rem;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  .user {
    font-weight: bold;
    font-size: large;
  }

  .message-not {
    margin-top: 0.5rem;
    color: gray;
  }

  .message {
    margin-top: 0.5rem;
  }
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
