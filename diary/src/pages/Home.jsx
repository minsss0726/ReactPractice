import DairyList from "../component/DairyList";
import Header from "../component/Header";
import Button from "../component/Button";
import { useState, useEffect } from "react";
import { getFormattedDate, setPageTitle } from "../util";

const Home = () => {
  const [date, setDate] = useState(getFormattedDate(new Date()));

  useEffect(() => {
    setPageTitle("mins 일기장");
  }, []);

  const onClickPrev = () => {
    // date가 "2025-07-22" 형태의 문자열이므로 년도와 월을 추출
    const [year, month] = date.split("-").map(Number);
    // 이전 달의 날짜를 생성하고 포맷팅
    const newDate = new Date(year, month - 2, 1); // month는 0-based이므로 -2
    setDate(getFormattedDate(newDate));
  };

  const onClickNext = () => {
    const [year, month] = date.split("-").map(Number);
    const newDate = new Date(year, month, 1); // 다음달은 현재 month 사용
    setDate(getFormattedDate(newDate));
  };

  return (
    <>
      <Header
        title={date.slice(0, 7)}
        leftChild={<Button text="<" type="" onClick={onClickPrev} />}
        rightChild={<Button text=">" type="" onClick={onClickNext} />}
      />
      <DairyList date={date} />
    </>
  );
};

export default Home;
