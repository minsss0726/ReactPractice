import "./DairyItem.css";
import { getEmotionImgById } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DairyItem = ({ id, emotion_id, content, date }) => {
  const navigate = useNavigate();
  const onClickEdit = (event) => {
    event.stopPropagation();
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem" onClick={() => navigate(`/dairy/${id}`)}>
      <div className="img_section">
        <img src={getEmotionImgById(emotion_id)} alt="emotion" />
      </div>
      <div className="info_section">
        <div className="date_wrapper">{date}</div>
        <div className="content_wrapper">{content}</div>
      </div>
      <div className="button_section">
        <Button text="수정하기" type="positive" onClick={onClickEdit} />
      </div>
    </div>
  );
};

export default DairyItem;
