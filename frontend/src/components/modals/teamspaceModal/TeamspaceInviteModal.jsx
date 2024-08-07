import { useState, useEffect } from "react";
import Button from "../../../common/Button";
import { FaSearch } from "react-icons/fa";
import { TeamspaceMemberInvite } from "../../../API/TeamspaceAPI";
import { fetchUser, followingList } from "../../../API/UserAPI";
import { useParams } from "react-router-dom";
import { userSearch } from "../../../API/UserAPI";
import * as t from "./TeamspaceInviteModal.styled";


function TeamspaceInviteModal() {
  const [open, setOpen] = useState(false);
  const [inviteList, setInviteList] = useState([]);
  const [userValues, setUserValues] = useState({});
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const teamspaceIdx = useParams();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetchUser();
        setUserValues(res[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, []);

  const openModalHandler = () => {
    setOpen(!open);
    const getList = async () => {
      try {
        const res = await followingList(userValues.emailId);
        setInviteList(res);
      } catch (err) {}
    };
    getList();
  };

  const closeModalHandler = (event) => {
    if (event.currentTarget === event.target) {
      // 모달 백드롭에서의 클릭만 처리
      setOpen(false);
    }
  };

  const handleChange = async (e) => {
    setSearchInput(e.target.value);
  };

  const handleMemberChange = (event) => {
    const { checked, value } = event.target;
    setMembers([...members, value]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (searchInput) {
      const response = await userSearch(searchInput);
      if (response.length >= 1) {
        setInviteList(response);
      } else {
        setInviteList("");
      }
    } else {
      const res = await followingList(userValues.emailId);
      setInviteList(res);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let index = 0; index < members.length; index++) {
        await TeamspaceMemberInvite({
          teamspaceId: teamspaceIdx.teamspaceIdx,
          userId: members[index],
        });
      }
      alert("멤버 초대가 완료되었습니다.");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        text={"+ Invite"}
        backgroundcolor={"#254ef8"}
        fontcolor={"white"}
        width={"5rem"}
        height={"2rem"}
        onClick={openModalHandler}
      />
      {open ? (
        <t.ModalBackdrop onClick={closeModalHandler}>
          <t.InviteContainer>
            <t.SearchBar onSubmit={submitHandler}>
              <FaSearch className="Icon" />
              <input
                id="search"
                type="text"
                spellCheck="false"
                placeholder="Search"
                onChange={handleChange}
              />
            </t.SearchBar>
            <t.ModalView>
              {inviteList.length >= 1 ? (
                <>
                  {Object.entries(inviteList).map(([key, value]) => (
                    <div
                      key={
                        value.userIdx ? value.userIdx.emailId : value.emailId
                      }
                    >
                      <input
                        type="checkbox"
                        value={
                          value.userIdx ? value.userIdx.emailId : value.emailId
                        }
                        onChange={handleMemberChange}
                      />
                      <label
                        htmlFor={
                          value.userIdx ? value.userIdx.emailId : value.emailId
                        }
                      >
                        {value.userIdx
                          ? value.userIdx.nickname
                          : value.nickname}
                      </label>
                    </div>
                  ))}
                </>
              ) : (
                <>검색 결과가 없습니다.</>
              )}
            </t.ModalView>
            <Button
              text={"Save"}
              backgroundcolor={"#254ef8"}
              fontcolor={"white"}
              width={"7rem"}
              onClick={handleSubmit}
            />
          </t.InviteContainer>
        </t.ModalBackdrop>
      ) : null}
    </>
  );
}

export default TeamspaceInviteModal;
