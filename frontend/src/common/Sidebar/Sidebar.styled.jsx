import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  color: white;
  padding-top: ${(props) => props.$paddingtop || "0"};
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  width: 12vw;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 7px;
`;

export const MenuWrap = styled.div`
  width: 100%;
  height: calc(100vh-2rem);
  max-width: 20rem;
  font-size: 0.8rem;
  color: white;
`;

export const List = styled.div`
  display: flex;
`;

export const ListItem = styled.div`
  margin-top: 30px;
  margin-left: 1rem;
  margin-bottom: 30px;
  display: flex;
  align-item: center;
`;

export const Icon = styled.div`
  display: grid;
  margin-right: 1rem;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 7.5%;

  span {
    margin-left: 10%;
    font-size: large;
  }
`;

export const Profile = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

export const Nickname = styled.h3`
  font-weight: bold;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;

export const Text = styled.p`
  color: grey;
  padding-top: 5%;
`;
