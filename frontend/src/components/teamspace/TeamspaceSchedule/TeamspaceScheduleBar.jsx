import { useState, useEffect } from "react";
import "assets/css/calendar.css";
import moment from "moment";
import styled from "styled-components";
import { ScheduleList } from "API/ScheduleAPI";
import { useParams } from "react-router-dom";
import ScheduleCreate from "components/modals/teamspaceModal/TeamspaceScheduleModal/TeamspaceScheduleCreateModal";
import Calendar from "./TeamspaceSchedule";
import Button from "common/Button";
import ScheduleMore from "components/modals/teamspaceModal/TeamspaceScheduleModal/TeamSpaceScheduleMoreModal";

function TeamspaceScheduleBar() {
  const [today, setToday] = useState(new Date());
  const { teamspaceIdx } = useParams();
  const [dates, setDates] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const refreshEvents = async () => {
    try {
      const dateInfo = await ScheduleList(teamspaceIdx);
      setDates(dateInfo);
    } catch (err) {}
  };

  useEffect(() => {
    refreshEvents();
  }, [teamspaceIdx]);

  return (
    <>
      <Container>
        <ScheduleWrap>
          <Header>
            <h3>Schedule</h3>
            <Button
              text="+"
              width="1em"
              height="1em"
              borderradius="50%"
              onClick={() => setIsCreateOpen(true)}
            />
          </Header>
          {isCreateOpen && (
            <ScheduleCreate
              teamspaceId={teamspaceIdx}
              onScheduleCreate={refreshEvents}
              onClose={() => setIsCreateOpen(false)}
            />
          )}
          <Calendar />
          <TodayWrapper>
            <div>
              <span className="today">TODAY </span>
              <span className="day">{moment(today).format("MM/DD(ddd)")}</span>
            </div>
            <Button text={"더보기"} onClick={() => setIsMoreOpen(true)} />
            {isMoreOpen && (
              <ScheduleMore
                dates={dates}
                teamspaceId={teamspaceIdx}
                onRefresh={refreshEvents}
                onClose={() => setIsMoreOpen(false)}
              />
            )}
          </TodayWrapper>
          <EventList>
            {dates && dates.length > 0 ? (
              dates.map((schedule) => {
                return (
                  <div className="content-box" key={schedule.scheduleIdx}>
                    <li>
                      {moment(schedule.startTime).format("MM/DD HH:mm")} -{" "}
                      {moment(schedule.endTime).format("MM/DD HH:mm")}
                      <div className="content">
                        <p>
                          {schedule.content} ({schedule.place})
                        </p>
                      </div>
                    </li>
                  </div>
                );
              })
            ) : (
              <p>일정이 없습니다.</p>
            )}
          </EventList>
        </ScheduleWrap>
      </Container>
    </>
  );
}

export default TeamspaceScheduleBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  align-items: center;
`;
const ScheduleWrap = styled.div`
  color: white;
  background-color: #151c2c;
  border-radius: 20px;
  width: 20rem;
  max-height: 32rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const TodayWrapper = styled.div`
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

const EventList = styled.ul`
  padding-left: 5%;
  padding-bottom: 3%;

  .content {
    margin: 10px;
  }
`;
