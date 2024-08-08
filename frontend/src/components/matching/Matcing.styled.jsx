import styled from "styled-components";

export const ShortsContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;

  .likeInfo-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LikeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-left: 1rem;

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #873ffa;
    border-radius: 50%;
    height: 5rem;
    width: 5rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .button2 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #873ffa;
    border-radius: 50%;
    height: 5rem;
    width: 5rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .letter {
    display: flex;
    justify-content: center;
  }

  .letter > p {
    font-size: large;
  }
`;

export const Video = styled.video`
  width: 500px;
  height: 600px;
  background-color: #151c2c;
  align-items: center;
  border-radius: 20px;
`;

export const Name = styled.div`
  color: white;
  position: absolute;
  bottom: 9rem;
  left: 3rem;

  .name {
    font-size: x-large;
    font-weight: bold;
  }
`;

export const Desc = styled.div`
  color: white;
  position: absolute;
  bottom: 7rem;
  left: 3rem;

  .desc {
    font-size: large;
  }
`;

export const Source = styled.source`
  width: 100%;
  height: 100%;
`;
