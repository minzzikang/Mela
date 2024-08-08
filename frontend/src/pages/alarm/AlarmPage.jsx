import { useState, useEffect } from "react";
import AlarmAll from "components/alarm/AlarmAll";
import AlarmUnread from "components/alarm/AlarmUnread";
import Bell from "assets/icons/Bell.png"
import BellDot from "assets/icons/BellDot.png"
import { notification } from "API/UserAPI";
import * as a from "./AlarmPage.styled";

function AlarmPage() {
  const [data, setData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const menuArr = [
    { name: "All", content: <AlarmAll />, icon: <img src={Bell} alt='all-alarm' /> },
    { name: "Unread", content: <AlarmUnread />, icon: <img src={BellDot} alt='unread-alarm' /> },
  ];

  const handleClickMenu = (index) => {
    setCurrentTab(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await notification();
        setData(res);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <a.Container>
        <a.TabMenu>
          {menuArr.map((el, index) => (
            <li
              className={index === currentTab ? "submenu focused" : "submenu"}
              key={index}
            >
              <span onClick={() => handleClickMenu(index)}>
                <a.MenuWrap>
                  {el.icon}
                  <a.MenuName>{el.name}</a.MenuName>
                </a.MenuWrap>
              </span>
            </li>
          ))}
        </a.TabMenu>
        <div className="main-box">{menuArr[currentTab].content}</div>
      </a.Container>
    </>
  );
}

export default AlarmPage;
