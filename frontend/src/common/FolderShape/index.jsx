import React, { useEffect, useState } from "react";
import defaultimage from "assets/images/default-image.png";
import { getImg } from "API/FileAPI";
import * as f from "./FolderShape.styled";

const Index = (props) => {
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    const imageInfo = async () => {
      try {
        if (props.image) {
          const response = await getImg(props.image.fileIdx);
          setImageURL(response.message);
        } else {
          setImageURL(defaultimage);
        }
      } catch (err) {
        console.error(err);
      }
    };

    imageInfo();
  }, []);

  return (
    <>
      <f.Container width={props.width} onClick={props.onClick}>
        <div className="titleday">
          <f.Title>{props.title}</f.Title>
          <f.Day>{props.day}</f.Day>
        </div>
        <div className="imgcontent">
          <f.Img src={imageURL} alt="프로필 이미지" />
          <f.Content>{props.content}</f.Content>
        </div>
      </f.Container>
    </>
  );
};

Index.defaultProps = {
  title: "Project name",
  content: "프로젝트 설명",
  width: "1rem",
  image: "",
  onClick: () => {},
};

export default Index;
