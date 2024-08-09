import { useState } from "react";
import ShortsUpload from "components/profile/ProfileShorts/ProfileShortsUpload";
import Button from "common/Button";
import * as p from "./ProfileShorts.styled";

function Index(props) {
  const shorts = props.currentUserShorts;
  const [isAddOpen, setIsAddOpen] = useState(false);
  const shortsLimitList = () => {
    const result = [];
    if (shorts.length > 3) {
      for (let i = 0; i < 3; i++) {
        result.push(shorts[i]);
      }
    } else {
      for (let i = 0; i < shorts.length; i++) {
        result.push(shorts[i]);
      }
    }

    return result;
  };
  return (
    <>
      <p.Container>
        <div className="header">
          <p.Title>Self-shorts</p.Title>
          {props.loginUser.emailId === props.currentUser.emailId ? (
            <Button
              text="Add"
              width="3em"
              height="2em"
              onClick={() => setIsAddOpen(true)}
            />
          ) : (
            <></>
          )}
        </div>
        {isAddOpen && <ShortsUpload onClose={() => setIsAddOpen(false)} />}
        <p.ListWrap>
          {shorts.length === 0 ? (
            <>
              <p>업로드 한 영상이 없습니다.</p>
            </>
          ) : (
            <>
              {Object.entries(shortsLimitList()).map(([key, value]) => (
                <p.ShortsWrap
                  key={value.shortsIdx}
                  src={value.fileURL}
                  alt="영상"
                  muted
                  controls
                ></p.ShortsWrap>
              ))}
            </>
          )}
        </p.ListWrap>
      </p.Container>
    </>
  );
}

export default Index;
