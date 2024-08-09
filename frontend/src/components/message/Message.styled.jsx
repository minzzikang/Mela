import styled from "styled-components";

export const Title = styled.div`
  margin-bottom: 1rem;
  font-size: x-large;

  .recvUser {
    color: #757575;
  }
`;

export const MessageList = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  margin: 0;
  padding: 0;
`;

export const MessageWrap = styled.li`
  display: flex;
  flex-direction: col;
  align-items: flex-end;
  margin: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    // display: none;
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export const Time = styled.span`
  margin-left: auto;
`;

export const MyMessage = styled.div`
  background-color: #202c44;
  padding: 20px;
  width: 50%;
  border-radius: 20px;
  margin-left: 1rem;
`;

export const ReceiveMessage = styled.div`
  background: linear-gradient(90deg, #873ffa 28.25%, #254ef8 94.99%);
  padding: 20px;
  width: 50%;
  border-radius: 20px;
  margin-right: 1rem;
`;

export const InputWrap = styled.div`
  display: flex;
  margin-top: 1rem;
  color: white;
  background-color: #202c44;
  border-radius: 10px;
  align-items: center;

  input {
    flex: 1;
    padding: 10px;
    border: none;
    height: 2rem;
    border-radius: 10px;
    margin-right: 10px;
    width: 90%;
    background-color: transparent;
    color: white;
  }

  button {
    background-color: #254ef8;
    border: none;
    border-radius: 5px;
    height: 2rem;
    color: white;
    width: 4rem;
    margin-right: 10px;

    &:hover {
      background-color: #1a349a;
      cursor: pointer;
    }
  }
`;
