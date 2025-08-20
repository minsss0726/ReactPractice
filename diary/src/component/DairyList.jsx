import Button from "./Button";
import DairyItem from "./DairyItem";
import "./DairyList.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useContext } from "react";
import { DiaryStateContext } from "../App";
import { getChoseong } from "es-hangul";
import { useStore } from "../store";

const DairyList = ({ date }) => {
  const navigate = useNavigate();
  // const diary = useContext(DiaryStateContext);
  const { diary } = useStore();
  const [sort_type, setSortType] = useState("latest");
  const [sortData, setSortData] = useState(diary);
  const [search, setSearch] = useState("");

  // 무한 스크롤을 위한 상태 추가
  const [displayCount, setDisplayCount] = useState(10); // 초기에 보여줄 아이템 개수
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(); // 로드 더 버튼을 위한 ref

  const sortOpionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
  ];

  useEffect(() => {
    const compare = (a, b) => {
      // 날짜 문자열을 Date 객체로 변환하여 비교
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sort_type === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    };

    // 데이터 복사 및 정렬
    const copyList = [...diary];
    copyList.sort(compare);
    setSortData(copyList);

    const filteredData = sortData.filter(
      (it) =>
        it.date.slice(0, 7) === date.slice(0, 7) &&
        (it.content.toLowerCase().includes(search.toLowerCase()) ||
          getChoseong(it.content).includes(search))
    );

    // 필터링된 데이터가 있을 때만 리셋
    if (filteredData.length > 0) {
      setDisplayCount(Math.min(10, filteredData.length));

      // 스크롤을 상단으로 이동 (옵션)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [diary, sort_type, search, date]);

  const handleSortType = (e) => {
    setSortType(e.target.value);
  };

  const onClickNew = () => {
    navigate("/new");
  };

  const todoSearch = (e) => {
    setSearch(e.target.value);
  };

  // 무한 스크롤을 위한 더 많은 아이템 로드 함수
  const loadMore = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);

    // 로딩 시뮬레이션
    setTimeout(() => {
      setDisplayCount((prev) => prev + 10);
      setIsLoading(false);
    }, 300);
  }, [isLoading]);

  // Intersection Observer 설정
  useEffect(() => {
    // 약간의 지연을 두어 DOM이 업데이트된 후 Observer 설정
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
            loadMore();
          }
        },
        { threshold: 1.0 }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        if (loadMoreRef.current) {
          observer.unobserve(loadMoreRef.current);
        }
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [loadMore, isLoading, sort_type, search]);

  // 필터링된 데이터
  const filteredData = sortData.filter(
    (it) =>
      it.date.slice(0, 7) === date.slice(0, 7) &&
      (it.content.toLowerCase().includes(search.toLowerCase()) ||
        getChoseong(it.content).includes(search))
  );

  // 현재 표시할 데이터
  const displayedData = filteredData.slice(0, displayCount);
  const hasMore = displayCount < filteredData.length;

  return (
    <>
      <div className="DiaryList">
        <div className="menu_wrapper">
          <div className="left_col">
            <select value={sort_type} onChange={handleSortType}>
              {sortOpionList.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="right_col">
            <Button text="새 일기 쓰기" type="positive" onClick={onClickNew} />
          </div>
        </div>
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={todoSearch}
            value={search}
          ></input>
        </div>
        <div className="dairy_list_wrapper">
          {displayedData.map((it) => (
            <DairyItem key={it.id} {...it} />
          ))}

          {/* 무한 스크롤 감지용 div */}
          {hasMore && <div ref={loadMoreRef} className="observe" />}

          {/* 로딩 상태 표시 */}
          {isLoading && <div className="loading">로딩 중...</div>}

          {/* 더 이상 로드할 데이터가 없을 때 */}
          {!hasMore && filteredData.length > 0 && (
            <div className="loadDone">모든 일기를 불러왔습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(DairyList);
