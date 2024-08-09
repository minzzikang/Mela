import { useState } from "react";
import SearchPortfolio from "components/search/SearchPortfolio";
import SearchUser from "components/search/SearchUser";
import SearchGather from "components/search/SearchGather";
import SearchCommunity from "components/search/SearchCommunity";
import Navbar from "common/Navbar";
import Sidebar from "common/Sidebar";
import Alarmbar from "components/alarm/AlarmBar";
import * as s from "./SearchPage.styled";

function SearchPage() {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "Portfolio", content: <SearchPortfolio /> },
    { name: "User", content: <SearchUser /> },
    { name: "Gather", content: <SearchGather /> },
    { name: "Community", content: <SearchCommunity /> },
  ];

  const clickMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <s.Container>
      <s.Side>
        <Sidebar paddingtop="6vh" />
      </s.Side>
      <s.MainWrap>
        <Navbar />
        <s.P>Search</s.P>
        <s.Header>
          <s.TabMenu>
            {menuArr.map((el, index) => (
              <li
                className={index === currentTab ? "submenu focused" : "submenu"}
                key={index}
              >
                <span onClick={() => clickMenuHandler(index)}>{el.name}</span>
              </li>
            ))}
          </s.TabMenu>
        </s.Header>
        <s.Main>
          <div className="nowContent">{menuArr[currentTab].content}</div>
        </s.Main>
      </s.MainWrap>
      <s.RSide>
        <Alarmbar />
      </s.RSide>
    </s.Container>
  );
}

export default SearchPage;
