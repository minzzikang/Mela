import { ScheduleDelete } from "API/ScheduleAPI";
import moment from "moment";
import Trash from "assets/icons/Trash.png";
import ScheduleEditModal from "./TeamSpaceScheduleEditModal";
import { useState } from "react";
import Button from "common/Button";
import BackBtn from "assets/icons/BackBtn.png";
import * as t from "./TeamSpaceScheduleMoreModal.styled";

function ScheduleMoreModal({
  teamspaceId,
  dates,
  onRefresh,
  onClose,
}) {
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
    <t.Container>
      <t.BlackBox onClick={onClose} />
      <t.Wrap>
        <t.ModalName>모든 일정</t.ModalName>
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
                          <ScheduleEditModal
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
        <t.Backdrop onClick={onClose}>
          <img src={BackBtn} alt="back-button" />
        </t.Backdrop>
      </t.Wrap>
    </t.Container>
  );
}

export default ScheduleMoreModal;
