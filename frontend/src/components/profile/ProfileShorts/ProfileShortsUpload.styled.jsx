import styled from "styled-components";

export const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-bottom: 1rem;
  background-color: #151c2c;
  padding: 0.2rem;

  & .file-input {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
  }

  & .holder {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    color: gray;
  }
`;

export const Label = styled.span`
  color: #254ef8;
  font-weight: bold;
  padding: 10px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  height: 2.5rem;
  color: white;
  flex-grow: 1;
`;