import Header from "../component/Header";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
// import { DiaryDispatchContext } from "../App";
import { useContext, useEffect } from "react";
import useDairy from "../hook/useDairy";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../util";
import { useStore } from "../store";

const Edit = () => {
  // const { onDelete } = useContext(DiaryDispatchContext);
  const { removeDiary } = useStore();
  const { id } = useParams();
  const dairy = useDairy(id);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("일기 수정");
  }, [dairy]);

  const onClickBack = () => {
    navigate("/");
  };

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      removeDiary(id);
      // replace: true는 페이지 이동 시 현재 페이지를 방문 기록에서 제거합니다.
      // 이렇게 하면 뒤로가기 버튼을 눌렀을 때 삭제된 페이지로 돌아갈 수 없게 됩니다.
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <Header
        title="일기 수정"
        leftChild={<Button text="뒤로가기" type="" onClick={onClickBack} />}
        rightChild={
          <Button text="삭제하기" type="negative" onClick={onClickDelete} />
        }
      />
      <Editor isEdit={true} originData={dairy} />
    </>
  );
};

export default Edit;
