import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { fetchUser } from "API/UserAPI";
import moment from "moment";
import { EnterChat } from "API/ChatAPI";
import * as m from './Message.styled'

let sock;
let ws;

function Index(props) {
  const [messages, setMessages] = useState([]);
  const [userIdx, setUserIdx] = useState("");
  const [message, setMessage] = useState("");
  const [roomIdx, setRoomIdx] = useState("");
  const [nickname, setNickname] = useState("");
  let reconnect = 0;

  useEffect(() => {
    setRoomIdx(props.roomIdx);
    setUserIdx(localStorage.getItem("userIdx"));
    loadMessages();

    if (ws && ws.connect) {
      ws.disconnect();
      connect();
    }
  }, [props.roomIdx]);

  useEffect(() => {
    setRoomIdx(props.roomIdx);
    setUserIdx(localStorage.getItem("userIdx"));
    loadMessages();

    connect();

    const userInfo = async () => {
      try {
        const res = await fetchUser();
        setNickname(res[0].nickname);
      } catch (err) {}
    };
    userInfo();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await EnterChat({ roomid: props.roomIdx });
      setMessages(response);
    } catch (err) {}
  };

  const connect = () => {
    sock = new SockJS("/ws-stomp");
    ws = Stomp.over(sock);

    ws.connect(
      {},
      (frame) => {
        setTimeout(() => {
          ws.subscribe(`/sub/chat/room/${props.roomIdx}`, (message) => {
            const recv = JSON.parse(message.body);
            recvMessage(recv);
          });
        }, 100);
      },
      (error) => {
        console.error();
        if (reconnect++ < 5) {
          setTimeout(connect, 1000);
        }
      }
    );
  };

  const sendMessage = () => {
    if (ws && ws.connected && message.trim() !== "") {
      ws.send(
        "/pub/chat/message",
        {},
        JSON.stringify({ type: "TALK", roomIdx, userIdx, message, nickname })
      );
      setMessage("");
    } else {
      // WebSocket 연결이 설정되지 않은 경우, 메시지를 보낼 수 없음을 사용자에게 알림
      console.error("WebSocket 연결이 설정되지 않았습니다.");
      connect();
    }
  };

  const recvMessage = (recv) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: recv.type,
        userIdx: recv.userIdx,
        message: recv.message,
        nickname: recv.nickname,
      },
    ]);
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지가 추가될 때마다 스크롤을 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <m.Container>
        <m.Title>
          <span>Message from </span>
          <span className="recvUser">{props.recvUser}</span>
        </m.Title>
        <m.MessageList>
          <ul className="list-group">
            {messages.map((msg, index) => (
              <m.MessageWrap key={index}>
                {msg.nickname === nickname ? (
                  <>
                    <m.Time>
                      {moment(msg.sendTime).format("MM/DD HH:mm")}
                    </m.Time>
                    <m.MyMessage>{msg.message}</m.MyMessage>{" "}
                  </>
                ) : (
                  <>
                    <m.ReceiveMessage>{msg.message}</m.ReceiveMessage>{" "}
                    <span>{moment(msg.sendTime).format("MM/DD HH:mm")}</span>
                  </>
                )}
              </m.MessageWrap>
            ))}
            <div ref={messagesEndRef}></div>
          </ul>
        </m.MessageList>
        <m.InputWrap>
          <input
            type="text"
            placeholder="메시지를 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn" type="button" onClick={sendMessage}>
            Send
          </button>
        </m.InputWrap>
      </m.Container>
    </>
  );
};

export default Index