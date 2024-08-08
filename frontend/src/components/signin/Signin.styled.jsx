import styled from "styled-components";

export const Text = styled.div`
  margin-top: 1em;
  font-weight: 200;
  margin-bottom: 4px;
  color: gray;
  cursor: pointer;
`;

export const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-bottom: 1rem;
  background-color: #151c2c;
  padding: 0.2rem;
`;

export const Label = styled.span`
  color: #254ef8;
  font-weight: bold;
  padding: 10px;
`;

export const Input = styled.input`
  border-radius: 0.5em;
  color: white;
  height: 2.5rem;
  flex-grow: 1;
  background-color: transparent;
  border: none;

  &:focus {
    border-color: #254ef8;
  }
`;
