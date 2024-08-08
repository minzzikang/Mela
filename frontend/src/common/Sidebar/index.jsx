import * as s from "./Sidebar.styled";
import React, { useState, useEffect } from "react";
import User from "assets/icons/User.png";
import Message from "assets/icons/Message.png";
import Logout from "assets/icons/Exit.png";
import Matching from "assets/icons/Matching.png";
import useStore from "status/store";
import { follower, followerList } from "API/UserAPI";
import { followee, followingList } from "API/UserAPI";
import { fetchUser } from "API/UserAPI";
import { getImg } from "API/FileAPI";
import defaultprofile from "assets/images/default-profile.png";
import { getShorts } from "API/ShortsAPI";

function Index({ paddingtop }) {
  const { logout } = useStore();
  const [userValues, setUserValues] = useState({});
  const [portfolioValues, setPortfolioValues] = useState({});
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [imageURL, setImageURL] = useState();
  const [shortsIdx, setShortsIdx] = useState("");

  useEffect(() => {
    if (!localStorage.accessToken) {
      return;
    }
    const userInfo = async () => {
      try {
        const res = await fetchUser();
        setUserValues(res[0]);
        setPortfolioValues(res[1]);

        const shorts = await getShorts();
        setShortsIdx(shorts.shortsIdx);
      } catch (err) {}
    };
    userInfo();
  }, []);

  useEffect(() => {
    const imageInfo = async () => {
      try {
        if (portfolioValues.portfolio_picture_file_idx) {
          const response = await getImg(
            portfolioValues.portfolio_picture_file_idx.fileIdx
          );
          setImageURL(response.message);
        } else {
          setImageURL(defaultprofile);
        }
      } catch (err) {}
    };
    imageInfo();

    const follow = async () => {
      if (userValues.emailId) {
        try {
          const getFollower = await follower(userValues.emailId);
          setFollowers(getFollower);
          const getFollowing = await followee(userValues.emailId);
          setFollowings(getFollowing);
        } catch (err) {}
      }
    };
    follow();
  }, [userValues, portfolioValues]);

  return (
    <s.Container $paddingtop={paddingtop}>
      {userValues ? (
        <>
          <s.Header>
            <s.Profile src={imageURL} alt="프로필 이미지" />
            <s.InfoWrap>
              <s.Nickname> {userValues.nickname} </s.Nickname>
              <s.Text>팔로워 {followers.length} </s.Text>
              <s.Text>팔로잉 {followings.length}</s.Text>
            </s.InfoWrap>
          </s.Header>
          <s.MenuWrap>
            <s.List>
              <s.ListItem>
                <s.Icon>
                  <img src={User} alt="user" />
                </s.Icon>
                <s.CustomLink to={`/portfolio/${userValues.emailId}`}>
                  <span>Profile</span>
                </s.CustomLink>
              </s.ListItem>
              <s.ListItem>
                <s.Icon>
                  <img src={Message} alt="message" />
                </s.Icon>
                <s.CustomLink to="/message">
                  <span>Message</span>
                </s.CustomLink>
              </s.ListItem>
              <s.ListItem>
                <s.Icon>
                  <img src={Matching} alt="matching" />
                </s.Icon>
                <s.CustomLink to={`/matching`}>
                  <span>Matching</span>
                </s.CustomLink>
              </s.ListItem>
              <s.ListItem>
                <s.Icon>
                  <img src={Logout} alt="logout" />
                </s.Icon>
                <span onClick={logout}>Logout</span>
              </s.ListItem>
            </s.List>
          </s.MenuWrap>
        </>
      ) : (
        <p>유저정보가 없습니다.</p>
      )}
    </s.Container>
  );
}

export default Index;
