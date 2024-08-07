import styled from "styled-components";

const Container = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$fontcolor};
  background: ${(props) => props.$backgroundcolor};
  border-radius: ${(props) => props.$borderradius};
  cursor: pointer;
  border: 3px solid #254ef8;

  &:hover {
    background: linear-gradient(90deg, #254ef8, #3960fc, #873ffa, #a977fa);
  }

  &:active {
    background: linear-gradient(90deg, #254ef8, #873ffa);
    border-color: linear-gradient(90deg, #254ef8, #873ffa);
  }
`;

const Index = ({
  backgroundcolor,
  fontcolor,
  width,
  height,
  onClick,
  borderradius,
  text,
}) => {
  return (
    <>
      <Container
        $backgroundcolor={backgroundcolor}
        $fontcolor={fontcolor}
        width={width}
        height={height}
        onClick={onClick}
        $borderradius={borderradius}
      >
        {text}
      </Container>
    </>
  );
};

Index.defaultProps = {
  text: "default",
  fontcolor: "white",
  width: "1rem",
  height: "50px",
  borderradius: "30px",
  onClick: () => {},
};

export default Index;
