import { ScheduleDelete } from "API/ScheduleAPI";
import moment from "moment";
import Trash from "assets/icons/Trash.png";
import ScheduleEdit from "../TeamspaceScheduleEdit";
import { useState } from "react";
import Button from "common/Button";
import Modal from "common/Modal";

function Index({ teamspaceId, dates, onRefresh, onClose }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const ScheduleDeleteHandler = async (scheduleId) => {
    try {
      await ScheduleDelete({ teamspaceId, scheduleId });
      onRefresh();
    } catch (err) {}
  };

  const handleScheduleEdit = () => {
    onRefresh();
  };

  return (
    <Modal name={"모든 일정"} onClose={onClose}>
      <ul>
        {dates && dates.length > 0 ? (
          dates.map((schedule) => {
            return (
              <div id="modal-description" key={schedule.scheduleIdx}>
                <li>
                  {moment(schedule.startTime).format("MM/DD HH:mm")} -{" "}
                  {moment(schedule.endTime).format("MM/DD HH:mm")}
                  <div className="content">
                    <p>
                      {schedule.content} ({schedule.place})
                    </p>
                    <div>
                      <Button
                        text="수정"
                        width="1em"
                        onClick={() => setIsEditOpen(true)}
                      />
                      {isEditOpen && (
                        <ScheduleEdit
                          teamspaceId={teamspaceId}
                          scheduleId={schedule.scheduleIdx}
                          initialData={schedule}
                          onScheduleEdit={handleScheduleEdit}
                          onClose={() => setIsEditOpen(false)}
                        />
                      )}

                      <img
                        src={Trash}
                        alt="trash"
                        onClick={() =>
                          ScheduleDeleteHandler(schedule.scheduleIdx)
                        }
                      />
                    </div>
                  </div>
                </li>
                <hr />
              </div>
            );
          })
        ) : (
          <p>일정이 없습니다.</p>
        )}
      </ul>
    </Modal>
  );
}

export default Index;
