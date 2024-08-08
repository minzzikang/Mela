import styled from "styled-components";
import Datepicker from "react-datepicker";

export const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-bottom: 1rem;
  background-color: #151c2c;
  padding: 0.2rem;

  & .checkButton {
    background-color: #254ef8;
    border: none;
    color: white;
    border-radius: 10px;
    width: 4.5rem;
    height: 2rem;
    margin-right: 5px;
  }

  & .input-email {
    width: 8rem;
    margin-left: 1em;
    background: transparent;
    border: none;
    color: white;
  }

  & .password-confirm {
    display: flex;
    align-item: flex-start;
    margin-bottom: 1em;
  }
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
`;

export const Gender = styled.div`
  background-color: #151c2c;
  display: flex;
  align-item: flex-start;
  width: 13em;
`;

export const Birth = styled.div`
  background-color: #151c2c;
  display: flex;
  align-item: center;
  width: 13em;
`;

export const Select = styled.select`
  background-color: transparent;
  border-radius: 0.5em;
  border: none;
  color: white;
  height: 2.5rem;
  width: 50%;
  option {
    color: black;
  }
`;

export const MyDatePicker = styled(Datepicker)`
  background-color: transparent;
  color: white;
  border: none;
  width: 80%;
  text-align: center;
  margin-top: 0.8em;
  font-size: 0.8rem;
`;
