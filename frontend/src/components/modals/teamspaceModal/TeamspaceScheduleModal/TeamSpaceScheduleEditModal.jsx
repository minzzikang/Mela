import { useState, useEffect } from "react";
import { ScheduleUpdate } from "API/ScheduleAPI";
import moment from "moment";
import Button from "common/Button";
import BackBtn from "assets/icons/BackBtn.png";
import * as t from "./TeamspaceScheduleEditModal.styled";

function ScheduleEditModal({
  teamspaceId,
  scheduleId,
  initialData,
  onScheduleEdit,
  onClose,
}) {
  const [values, setValues] = useState({
    content: "",
    place: "",
    sDate: "",
    sTime: "",
    eDate: "",
    eTime: "",
  });

  useEffect(() => {
    if (initialData) {
      setValues({
        content: initialData.content,
        place: initialData.place,
        sDate: moment(initialData.startTime).format("YYYY-MM-DD"),
        sTime: moment(initialData.startTime).format("HH:mm"),
        eDate: moment(initialData.endTime).format("YYYY-MM-DD"),
        eTime: moment(initialData.endTime).format("HH:mm"),
      });
    }
  }, [initialData]);

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  const formatDateTime = (date, time) => {
    const info = time ? `${time}:00` : "00:00:00";
    return `${date} ${info}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTime = formatDateTime(values.sDate, values.sTime);
    const endDateTime = formatDateTime(values.eDate, values.eTime);

    if (new Date(endDateTime) < new Date(startDateTime)) {
      alert("종료일은 시작일보다 빠를 수 없습니다.");
      return;
    }

    try {
      const data = {
        content: values.content,
        place: values.place,
        startTime: startDateTime,
        endTime: endDateTime,
      };

      await ScheduleUpdate(teamspaceId, scheduleId, data);
      onScheduleEdit();
    } catch (err) {}
  };

  return (
    <t.Container>
      <t.BlackBox onClick={onClose} />
      <t.Wrap>
        <t.ModalName>일정 수정</t.ModalName>
        <form onSubmit={handleSubmit}>
          <t.FormWrap>
            <t.Label>내용</t.Label>
            <t.Input
              type="text"
              placeholder="일정 내용을 입력해주세요"
              id="content"
              value={values.content}
              onChange={handleChange}
            />
          </t.FormWrap>
          <t.FormWrap>
            <t.Label>장소</t.Label>
            <t.Input
              type="text"
              placeholder="일정 내용을 입력해주세요"
              id="place"
              value={values.place}
              onChange={handleChange}
            />
          </t.FormWrap>
          <t.FormWrap>
            <t.Label>시작일</t.Label>
            <t.Input
              type="date"
              id="sDate"
              value={values.sDate}
              onChange={handleChange}
            />
            <t.Input
              type="time"
              id="sTime"
              value={values.sTime}
              onChange={handleChange}
            />
          </t.FormWrap>
          <t.FormWrap>
            <t.Label>종료일</t.Label>
            <t.Input
              type="date"
              id="eDate"
              value={values.eDate}
              onChange={handleChange}
            />
            <t.Input
              type="time"
              id="eTime"
              value={values.eTime}
              onChange={handleChange}
            />
          </t.FormWrap>
          <Button
            type="submit"
            text="Save"
            width="100%"
            height="2.5rem"
            backgroundcolor="#254ef8"
            borderradius="0.5rem"
          />
        </form>
        <t.Backdrop onClick={onClose}>
          <img src={BackBtn} alt="back-button" />
        </t.Backdrop>
      </t.Wrap>
    </t.Container>
  );
}

export default ScheduleEditModal;
