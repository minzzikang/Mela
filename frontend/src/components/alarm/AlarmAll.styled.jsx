import styled from "styled-components";

export const Container = styled.div`
  color: white;
  margin: 20px;
  display: flex;
  flex-direction: column;

  .actions {
    display: flex;
    gap: 20px;
  }

  .line {
    border: 1px solid #254ef8;
    margin-bottom: 1rem;
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Read = styled.div`
  color: #254ef8;
  cursor: pointer;
`;

export const Category = styled.div`
  display: flex;
  background-color: #1e40c6;
  height: 2rem;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  margin-top: 10px;
  flex: 1;
  text-align: center;

  span:nth-child(1) {
    flex: 0.5;
  }

  span:nth-child(2) {
    flex: 1;
  }

  span:nth-child(3) {
    flex: 3;
  }

  span:nth-child(4) {
    flex: 1;
  }
`;

export const Footer = styled.div`
  display: flex;
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #254ef8;
  text-align: center;
  margin-bottom: 10px;

  div:nth-child(1) {
    flex: 0.5;
  }

  div:nth-child(2) {
    flex: 1;
  }

  div:nth-child(3) {
    flex: 3;
  }

  div:nth-child(4) {
    flex: 1;
  }

  :last-child {
    border-bottom: none;
  }
`;

export const AlarmContent = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 3rem;
`;

export const TextCheck = styled.div`
  color: #6c7383;
  font-size: large;
`;

export const TextUnCheck = styled.div`
  color: #254ef8;
  font-size: large;
`;
