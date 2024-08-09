import styled from "styled-components";

export const Container = styled.div`
  color: white;
  margin: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .category {
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
  }

  .actions {
    display: flex;
    gap: 20px;
  }

  .read {
    color: #254ef8;
    cursor: pointer;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #254ef8;
    text-align: center;
    margin-bottom: 10px;
  }

  .list:last-child {
    border-bottom: none;
  }

  .category span:nth-child(1),
  .list div:nth-child(1) {
    flex: 0.5;
  }
  .category span:nth-child(2),
  .list div:nth-child(2) {
    flex: 1;
  }
  .category span:nth-child(3),
  .list div:nth-child(3) {
    flex: 3;
  }
  .category span:nth-child(4),
  .list div:nth-child(4) {
    flex: 1;
  }

  .listWrapper {
    overflow: hidden;
  }

  .content {
    overflow-y: scroll;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  .btnWrapper {
    margin-left: 3rem;
  }

  .alarm-content {
    font-size: 18px;
    margin-bottom: 10px;
    margin-left: 3rem;
  }

  .content-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .text-checked {
    color: #6c7383;
    font-size: large;
  }

  .text-unchecked {
    color: #254ef8;
    font-size: large;
  }

  .line {
    border: 1px solid #254ef8;
    margin-bottom: 1rem;
  }

  .footer {
    display: flex;
  }
`;
