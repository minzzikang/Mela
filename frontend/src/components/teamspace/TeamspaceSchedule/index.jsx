import { useState, useEffect } from "react";
import moment from "moment";
import { ScheduleList } from "API/ScheduleAPI";
import { useParams } from "react-router-dom";
import ScheduleCreate from "components/teamspace/TeamspaceSchedule/TeamspaceScheduleCreate";
import Calendar from "./TeamspaceScheduleCalendar";
import Button from "common/Button";
import ScheduleMore from "components/teamspace/TeamspaceSchedule/TeamspaceScheduleMore";
import * as t from "./TeamspaceSchedule.styled";

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
      <t.Container>
        <t.ScheduleWrap>
          <t.Header>
            <h3>Schedule</h3>
            <Button
              text="+"
              width="1em"
              height="1em"
              borderradius="50%"
              onClick={() => setIsCreateOpen(true)}
            />
          </t.Header>
          {isCreateOpen && (
            <ScheduleCreate
              teamspaceId={teamspaceIdx}
              onScheduleCreate={refreshEvents}
              onClose={() => setIsCreateOpen(false)}
            />
          )}
          <Calendar />
          <t.TodayWrap>
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
          </t.TodayWrap>
          <t.EventList>
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
          </t.EventList>
        </t.ScheduleWrap>
      </t.Container>
    </>
  );
}

export default TeamspaceScheduleBar;
