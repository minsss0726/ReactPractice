import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { DiaryStateContext } from "../App";
import { useStore } from "../store";

const useDairy = (id) => {
  // const data = useContext(DiaryStateContext);
  const { diary } = useStore();
  const [dairy, setDairy] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const matchDairy = diary.find((it) => String(it.id) === String(id));
    if (matchDairy) {
      setDairy(matchDairy);
    } else {
      alert("일기가 존재하지 않습니다");
      navigate("/", { replace: true });
    }
  }, [id]);

  return dairy;
};
export default useDairy;
