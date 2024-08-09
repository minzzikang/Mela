import styled from "styled-components";
import Datepicker from "react-datepicker";

export const DateUpdate = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const InputWrap = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #151c2c;
  margin-top: 3rem;
  padding: 20px;
  margin-right: 3rem;

  textarea {
    background-color: transparent;
    border: none;
    resize: none;
    color: white;
    margin-top: 1rem;
    font-size: large;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileInputWrap = styled.div`
  margin-top: 1rem;
  background-color: #151c2c;
  margin-bottom: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    padding: 6px 25px;
    background-color: #254ef8;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
`;

export const Container = styled.form`
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;

  hr {
    width: 100%;
  }
`;

export const ThumChange = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

export const ImageWrap = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Thumnail = styled.div`
  img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 3px white solid;
  }
`;

export const BackThum = styled.div`
  img {
    width: 100%;
    height: 6rem;
    margin-top: 10px;
    border: 3px white solid;
  }
`;

export const Button = styled.button`
  background-color: #254ef8;
  border-radius: 20px;
  border: none;
  color: white;
  height: 2rem;
  width: 4rem;
  align-self: flex-end;
  margin-top: 1rem;
`;

export const MyDatePicker = styled(Datepicker)`
  background-color: #202c44;
  color: white;
  border: none;
  text-align: center;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;
