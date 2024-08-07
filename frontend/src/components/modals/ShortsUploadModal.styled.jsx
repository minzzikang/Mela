import styled from "styled-components";

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
`;

export const Label = styled.span`
  color: #254ef8;
  font-weight: bold;
  padding: 10px;
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