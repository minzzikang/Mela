import React, { useState, useEffect } from "react";
import { notification, checkNotification, delNotification } from "API/UserAPI";
import moment from "moment";
import Button from "common/Button";
import * as a from "./AlarmUnread.styled";

function AlarmUnread() {
  const [data, setData] = useState(null);
  const [checkAlarm, setCheckAlarm] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await notification();
        setData(res);
      } catch (err) {}
    };
    fetchData();
  }, []);

  // 단일 선택
  const handleSingleCheck = (checked, notificationIdx) => {
    if (checked) {
      setCheckAlarm((prev) => [...prev, notificationIdx]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열
      setCheckAlarm(checkAlarm.filter((el) => el !== notificationIdx));
    }
  };

  // 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      data.forEach((el) => idArray.push(el.notificationIdx));
      setCheckAlarm(idArray);
    } else {
      // 해제 시 빈 배열로 업데이트
      setCheckAlarm([]);
    }
  };

  // 읽기 체크
  const handleRead = async () => {
    checkAlarm.forEach((notificationIdx) => {
      checkNotification({ notificationid: notificationIdx })
        .then(() => {
          refreshNotification();
        })
        .catch((err) => {});
    });
  };

  // 삭제
  const handleDelete = async () => {
    checkAlarm.forEach((notificationIdx) => {
      delNotification({ notificationid: notificationIdx })
        .then(() => {
          refreshNotification();
        })
        .catch((err) => {});
    });
  };

  // 새로고침
  const refreshNotification = async () => {
    try {
      const res = await notification();
      setData(res);
      setCheckAlarm([]);
    } catch (err) {}
  };

  return (
    <>
      <a.Container>
        <div className="header">
          <div className="all-check">
            <input
              type="checkbox"
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={data && checkAlarm.length === data.length ? true : false}
            />
            <span>전체 선택</span>
          </div>
          <div className="actions">
            <div className="read">
              <p onClick={handleRead}>Mark all as read</p>
            </div>
          </div>
        </div>
        <div className="category">
          <span>체크</span>
          <span>상태</span>
          <span>내용</span>
          <span>날짜</span>
        </div>
        <hr className="line" />
        <div className="listWrapper">
          <ul className="content">
            {data && data.length > 0 ? (
              data
                .filter((alarm) => !alarm.checked)
                .map((alarm) => {
                  return (
                    <li key={alarm.notificationIdx} className="list">
                      <div className="alarm-check">
                        <input
                          type="checkbox"
                          checked={
                            checkAlarm.includes(alarm.notificationIdx)
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleSingleCheck(
                              e.target.checked,
                              alarm.notificationIdx
                            )
                          }
                        />
                      </div>
                      <div
                        className={
                          alarm.checked ? "text-checked" : "text-unchecked"
                        }
                      >
                        {alarm.checked ? "읽음" : "읽지 않음"}
                      </div>
                      <div className="alarm-content">{alarm.alarmContent}</div>
                      <div className="alarm-date">
                        {moment(alarm.alarmDate).format("YY-MM-DD HH:mm:ss")}
                      </div>
                    </li>
                  );
                })
            ) : (
              <p>알람이 없습니다.</p>
            )}
          </ul>
        </div>
        <br />
      </a.Container>
      <div className="footer">
        <div className="btnWrapper">
          <Button
            text="Delete"
            backgroundcolor="#C02525"
            width="4rem"
            height="2rem"
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </>
  );
}

export default AlarmUnread;
