import Header from "../component/Header";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";
import { useEffect } from "react";

const New = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("새 일기 쓰기");
  }, []);

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <>
      <Header
        title="새 일기 쓰기"
        leftChild={<Button text="< 뒤로가기" type="" onClick={onClickBack} />}
      />
      <Editor isEdit={false} />
    </>
  );
};

export default New;
