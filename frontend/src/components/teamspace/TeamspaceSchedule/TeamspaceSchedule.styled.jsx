import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  align-items: center;
`;
export const ScheduleWrap = styled.div`
  color: white;
  background-color: #151c2c;
  border-radius: 20px;
  width: 20rem;
  max-height: 32rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const TodayWrap = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: space-between;

  .today {
    color: #f04d23;
    font-weight: bold;
    margin-right: 15px;
  }

  .day {
    color: #7d7e80;
    font-weight: bold;
  }
`;

export const EventList = styled.ul`
  padding-left: 5%;
  padding-bottom: 3%;

  .content {
    margin: 10px;
  }
`;