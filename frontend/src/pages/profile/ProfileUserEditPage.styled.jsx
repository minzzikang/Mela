import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: white;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: white;
`;

export const Label = styled.span`
  color: #254ef8;
  font-weight: bolder;
  margin-bottom: 10px;
`;

export const Form = styled.div`
  .findCheck {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkbox {
    margin-left: 10px;
  }
`;

export const ProfileImageWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 6rem;
    height: 6rem;
    border: 2px solid white;
    border-radius: 50%;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  input {
    width: 100%;
    height: 1.5rem;
    background-color: #151c2c;
    border: none;
    color: white;
    border-radius: 10px;
    padding: 10px;
  }

  .label {
    display: flex;
    align-self: self-start;
  }
`;

export const Input = styled.input`
  background-color: #151c2c;
  color: white;
  border: none;
  width: 25rem;
  text-align: center;
  height: 2.5rem;
`;
export const TextArea = styled.input`
  background-color: #151c2c;
  color: white;
  border: none;
  width: 25rem;
  text-align: center;
  height: 11rem;
`;

export const ButtonWrapper = styled.div`
  padding: 5px 10px;
  display: flex;

  .save-btn {
    margin-left: 10px;
  }
`;

export const Span = styled.span`
  color: white;
  padding: 5px;
`;

export const GenreContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  height: 60%;
  border: 1px solid black;
  margin: 5px;
  color: #ffffff;
  flex-wrap: wrap;
`;
