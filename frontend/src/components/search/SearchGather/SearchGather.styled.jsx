import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 4%;
  color: white;
  padding-top: 3%;
  padding-left: 5%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Card = styled.div`
  width: 250px;
  height: 200px;
  background-color: #202c44;
  border-radius: 15%;
  margin-bottom: 10%;
`;

export const Title = styled.div`
  color: white;
  padding-top: 20%;
  padding-left: 10%;
  padding-right: 10%;
  font-weight: bold;
  font-size: x-large;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;

export const Content = styled.div`
  color: white;
  padding-top: 15%;
  padding-left: 10%;
  padding-right: 10%;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0; /* Add this line to remove default margin */
`;
