import styled from "styled-components";
import Datepicker from "react-datepicker";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const BlackBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: #fff;
  opacity: 0.1;
`;

export const Wrap = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0c0a15 0%, #171930 100%);
  border-radius: 12px;
  width: 30vw;
  height: 80vh;
  padding: 2.5rem;

  & .password-confirm {
    display: flex;
    align-item: flex-start;
    margin-bottom: 1em;
  }

  & .gender-select {
    background-color: #151c2c;
    display: flex;
    align-item: flex-start;
    width: 13em;
  }

  & .birth-select {
    background-color: #151c2c;
    display: flex;
    align-item: center;
    width: 13em;
  }
`;

export const ModalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 2em;
  margin-bottom: 2rem;
  text-decoration: underline;
  text-decoration-color: #254ef8;
`;

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
    width: 6rem;
    margin-left: 1em;
    background: transparent;
    border: none;
    color: white;
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

export const Select = styled.select`
  background-color: transparent;
  border-radius: 0.5em;
  border: none;
  color: white;
  height: 2.5rem;
  option {
    color: black;
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  img {
    cursor: pointer;
    width: 2.5rem;
    height: 1.5rem;
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
