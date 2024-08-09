import React, { useState, useEffect } from "react";
import Chat from "assets/icons/Chat.png";
import { ChatList } from "API/ChatAPI";
import moment from "moment";
import useStore from "status/store";
import Message from "components/message";
import { getImg } from "API/FileAPI";
import defaultProfile from "assets/images/default-profile.png";
import * as m from "./MessagePage.styled";

function MessagePage() {
  const [chatRooms, setChatRooms] = useState([]);
  const [roomIdx, setRoomIdx] = useState("");
  const [userIdx, setUserIdx] = useState("");
  const [otherNickname, setOtherNickname] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const user = useStore((state) => state.user);

  useEffect(() => {
    useStore.getState().fetchUser();
    findAllRooms();
  }, []);

  const findAllRooms = async () => {
    try {
      const response = await ChatList();
      setChatRooms(response);
    } catch (err) {}
  };

  useEffect(() => {
    const imgInfo = async () => {
      const result = [];
      try {
        for (let index = 0; index < chatRooms.length; index++) {
          if (chatRooms[index].portfolioAbstract.portfolio_picture_file_idx) {
            const response = await getImg(
              chatRooms[index].portfolioAbstract.portfolio_picture_file_idx
            );
            result.push(response.message);
          } else {
            result.push(defaultProfile);
          }
        }
        setImgUrl(result);
      } catch (err) {}
    };
    imgInfo();
  }, [userIdx]);

  const enterRoom = (roomIdx, nickname) => {
    if (user) {
      setUserIdx(localStorage.getItem("userIdx"));
      setRoomIdx(roomIdx);
      setOtherNickname(nickname);
    }
  };

  useEffect(() => {
    setUserIdx(localStorage.getItem("wschat.userIdx"));
  }, []);

  return (
    <m.Container>
      {roomIdx ? (
        <div className="chatting-wrapper">
          <Message roomIdx={roomIdx} recvUser={otherNickname} />
        </div>
      ) : (
        <div className="chatting-wrapper"></div>
      )}
      <div className="room-list">
        <div className="header">
          <div className="icon">
            <img src={Chat} alt="icon" />
          </div>
          <h3>Inbox</h3>
        </div>
        {chatRooms.length >= 1 ? (
          <m.ChatWrap>
            <ul className="list-group">
              {chatRooms.map((room) => (
                <li
                  key={room.roomIdx}
                  className="list-item"
                  onClick={() => enterRoom(room.roomIdx, room.user.nickname)}
                >
                  {room.lastSendMessage ? (
                    <>
                      <div>
                        {imgUrl.map((img) => (
                          <m.Img key={img} src={img} alt="프로필 이미지" />
                        ))}
                        <div className="user">{room.user.nickname}</div>
                        <div className="message">
                          <p>{room.lastSendMessage}</p>
                          <p style={{ color: "gray" }}>
                            {moment(room.lastSendTime).format(
                              "YY-MM-DD HH:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="user">{room.user.nickname}</div>
                        <div className="message-not">
                          <p>아직 대화를 시작하지 않았습니다.</p>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </m.ChatWrap>
        ) : (
          <p>현재 채팅 중인 방이 없습니다.</p>
        )}
      </div>
    </m.Container>
  );
}
export default MessagePage;
