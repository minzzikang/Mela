import styled from "styled-components";

export const FileInputWrap = styled.div`
  display: flex;
  justify-content: space-between;

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

export const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Table = styled.table`
  color: white;
  width: 100%;
`;

export const Td = styled.td`
  border: solid 1px white;
  vertical-align: middle;
`;

export const Th = styled.th`
  border: solid 1px white;
  vertical-align: middle;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  height: 2.5rem;
  color: white;
  flex-grow: 1;
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
