import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alarm from "assets/icons/Bell.png";
import Button from "common/Button";
import { notification } from "API/UserAPI";
import * as a from "./Alarmbar.styled"

function Alarmbar() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await notification();
      setData(res);
      // console.log(res)
    };
    fetchData();
  }, []);

  const goDetail = () => {
    navigate("/alarm");
  };

  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <a.Container>
          <a.Header>
            <div>
              <img src={Alarm} alt="icon" />
              <span>Alarm</span>
            </div>
            <Button
              text="+"
              width="1.5rem"
              height="1rem"
              backgroundcolor="#151C2C"
              onClick={goDetail}
            />
          </a.Header>
          <div className="listWrap">
            <ul className="content">
              {data && data.length > 0 ? (
                data.map((alarm) => {
                  return (
                    <li key={alarm.notificationIdx}>
                      <a.Content>
                        <div className={alarm.checked ? "read" : "unread"} />
                        <Link to={`/alarm`} className="link">
                          {alarm.alarmContent.length < 10
                            ? alarm.alarmContent
                            : alarm.alarmContent.slice(0, 9) + "..."}
                        </Link>
                      </a.Content>
                    </li>
                  );
                })
              ) : (
                <p style={{ marginTop: "10px" }}>알람이 없습니다.</p>
              )}
            </ul>
          </div>
        </a.Container>
      ) : null}
    </>
  );
}

export default Alarmbar;