import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5px;
  color: white;
`;

export const ImageWrap = styled.div`
  position: relative;

  p {
    color: white;
    position: absolute;
    text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
    top: 9rem;
    left: 13rem;
    font-size: large;
  }
`;

export const H1 = styled.h1`
  color: white;
  position: absolute;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  left: 13rem;
  top: 2rem;
`;

export const BackgroundImage = styled.img`
  background-image: url(backImgURL);
  width: 57vw;
  height: 33vh;
  border-radius: 20px;
`;

export const TeamspaceImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  position: absolute;
  top: 7rem;
  left: 6rem;
  transform: translate(-50%, -50%);
`;

export const MemberWrap = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Card = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 15%;
  background-color: #151c2c;
  text-align: center;
  margin-right: 7%;
`;

export const Profile = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 15%;
  text-align: center;
  margin-top: 10%;
`;

export const Nickname = styled.p`
  color: white;
  padding-top: 10%;
`;
