import logo from "assets/images/logo.png";
import Search from "assets/icons/Search.png";
import * as n from "./Navbar.styled";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Index({ backcolour }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  function LogoClick(event) {
    navigate("/");
  }

  const handleChange = async (e) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    navigate(`/search/${searchInput}`);
  };

  return (
    <>
      <n.Container $backcolour={backcolour}>
        <img src={logo} alt="" onClick={LogoClick} />
        <n.SearchBar onSubmit={submitHandler}>
          <img src={Search} alt='search'/>
          <input
            id="search"
            type="text"
            spellCheck="false"
            placeholder="Search"
            onChange={handleChange}
          />
        </n.SearchBar>
        <div className="MenuContainer">
          <span>
            <NavLink
              style={({ isActive }) =>
                isActive ? n.activeStyle : n.deActiveStyle
              }
              to="/maingather"
            >
              Gather
            </NavLink>
          </span>
          <span>
            <NavLink
              style={({ isActive }) =>
                isActive ? n.activeStyle : n.deActiveStyle
              }
              to="/teamspace"
            >
              Team Space
            </NavLink>
          </span>
          <span>
            <NavLink
              style={({ isActive }) =>
                isActive ? n.activeStyle : n.deActiveStyle
              }
              to="/community"
            >
              Community
            </NavLink>
          </span>
        </div>
      </n.Container>
    </>
  );
}

export default Index;
