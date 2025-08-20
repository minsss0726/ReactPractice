import { useState, useEffect, useCallback } from "react";
import "./Editor.css";
import { emotionList, getFormattedDate } from "../util";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { DiaryDispatchContext } from "../App";
import { useStore } from "../store";

const Editor = ({ isEdit, originData }) => {
  // const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const { addDiary, editDiary } = useStore();
  const navigate = useNavigate();
  const [state, setState] = useState({
    id: crypto.randomUUID(),
    date: getFormattedDate(new Date()),
    content: "",
    emotion_id: 3,
  });

  useEffect(() => {
    if (isEdit) {
      setState({
        ...originData,
      });
    }
  }, [isEdit, originData]);

  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  const handleChangeEmotion = useCallback((emotionId) => {
    setState((prevState) => ({
      ...prevState,
      emotion_id: emotionId,
    }));
  }, []);

  const onClickCancel = () => {
    navigate("/", { replace: true });
  };

  const onClickSubmit = () => {
    if (state.content.length < 1) {
      alert("일기 내용을 입력해주세요.");
      return;
    }
    if (state.emotion_id < 1) {
      alert("감정을 선택해주세요.");
      return;
    }
    if (state.date.length < 1) {
      alert("날짜를 선택해주세요.");
      return;
    }
    addDiary(state);
    navigate("/", { replace: true });
  };

  const onClickEdit = () => {
    if (state.content.length < 1) {
      alert("일기 내용을 입력해주세요.");
      return;
    }
    if (state.emotion_id < 1) {
      alert("감정을 선택해주세요.");
      return;
    }
    if (state.date.length < 1) {
      alert("날짜를 선택해주세요.");
      return;
    }
    console.log(state);
    editDiary(state.id, { ...state });
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="Editor">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapeer">
          <input
            type="date"
            value={state.date ? state.date : null}
            onChange={handleChangeDate}
          />
        </div>
        <h4>오늘의 감정</h4>
        <div className="input_wrapeer emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotion_id ? state.emotion_id === it.id : false}
            />
          ))}
        </div>
        <h4>오늘의 일기</h4>
        <div className="input_wrapeer">
          <textarea
            value={state.content ? state.content : ""}
            onChange={handleChangeContent}
            placeholder="오늘의 일기를 입력해주세요."
          />
        </div>
        <div className="bottom_section">
          <Button text="취소하기" type="negative" onClick={onClickCancel} />
          {isEdit ? (
            <Button text="수정하기" type="positive" onClick={onClickEdit} />
          ) : (
            <Button text="작성하기" type="positive" onClick={onClickSubmit} />
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
