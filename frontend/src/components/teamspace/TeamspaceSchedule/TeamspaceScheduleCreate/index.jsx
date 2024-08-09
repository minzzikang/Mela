import { useState } from "react";
import { ScheduleGenerate } from "API/ScheduleAPI";
import Button from "common/Button";
import Modal from "common/Modal"
import * as t from "./TeamspaceScheduleCreate.styled";

function Index({ teamspaceId, onScheduleCreate, onClose }) {
  const [values, setValues] = useState({
    content: "",
    place: "",
    sDate: "",
    sTime: "",
    eDate: "",
    eTime: "",
  });

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setValues((preValue) => ({
      ...preValue,
      [id]: value,
    }));
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
        endTime: endDateTime,
        place: values.place,
        startTime: startDateTime,
      };

      const res = await ScheduleGenerate(teamspaceId, data);
      onScheduleCreate(res);
    } catch (err) {}
  };

  return (
    <Modal name={"일정 수정"} onClose={onClose}>
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
            text="Create"
            width="100%"
            height="2.5rem"
            backgroundcolor="#254ef8"
            borderradius="0.5rem"
          />
        </form>
    </Modal>
  );
}

export default Index;
