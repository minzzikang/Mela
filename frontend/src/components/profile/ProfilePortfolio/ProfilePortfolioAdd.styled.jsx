import styled from "styled-components";

export const Input = styled.input`
  background: transparent;
  border: none;
  height: 2.5rem;
  color: white;
  flex-grow: 1;
`;

export const Profile = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

export const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-bottom: 1rem;
  background-color: #151c2c;
  padding: 0.2rem;

  & .label-file {
    padding: 6px 25px;
    background-color: #254ef8;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
`;

export const Label = styled.span`
  color: #254ef8;
  font-weight: bold;
  padding: 10px;
`;
