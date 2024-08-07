import styled from "styled-components";

const FolderNoImage = (props) => {
  return (
    <>
      <Container
        width={props.width}
        maxwidth={props.maxwidth}
        onClick={props.onClick}
      >
        <div className="titleday">
          <Title>{props.title}</Title>
          <Day>{props.day ? props.day : null}</Day>
        </div>
        <Content>{props.content}</Content>
      </Container>
    </>
  );
};

FolderNoImage.defaultProps = {
  title: "Project name",
  content: "프로젝트 설명",
  day: null,
  width: "1rem",
  maxwidth: "350px",
  onClick: () => {},
};

export default FolderNoImage;

const Container = styled.div`
  clip-path: polygon(47% 0, 61% 15%, 100% 15%, 100% 75%, 0 75%, 0 0);
  
  width: ${(props) => props.width};
  height: 180px;
  max-width: ${(props) => props.maxwidth};
  display: flex;
  flex-direction: column;
  background: #202C44;
  box-shadow: 0px 11px 5px #1B263B;
  border-radius: 20px;
  justify-content: space-evenly;
  padding-bottom: 4%;
  padding-left: 3vw;
  padding-right: 3vw;

.titleday{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

    &:hover{
  background: linear-gradient(180deg, #873FFA 29.5%, #254EF8 100%);
  box-shadow: 0px 11px 5px #342C93;
  border-radius: 20px;
  }
`;

// 프로젝트 이름
const Title = styled.span`
  color: white;
  font-weight: bold;
  font-size: x-large;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;

// 프로젝트 설명
const Content = styled.span`
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;

// 프로젝트 디데이
const Day = styled.span`
  color: white;
`;