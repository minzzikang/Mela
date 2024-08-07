import styled from "styled-components";
import mainImage from "../../assets/images/mainImage.png";

export const Container = styled.div`
  min-height: 300vh;
  background-color: ${(props) => props.theme.colours.primary};
  color: white;
  text-align: center;
  .contents {
    padding-top: 5%;
  }
`;

export const LandingImage = styled.div`
  background-image: url(${mainImage});
  background-size: 100% auto;
  background-repeat: no-repeat;
  min-height: calc(100vh + 5rem);
  margin-top: -15vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  h1 {
    color: white;
    font-size: 4.4rem;
    margin-bottom: 1.5vh;
    padding: 1%;
    font-family: InterBold;
  }
  > div:nth-child(1) {
  }
  > div:nth-child(3) {
    flex-grow: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-bottom: 5%; */
    gap: 3rem;
  }
`;