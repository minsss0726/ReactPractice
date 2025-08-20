import Header from "../component/Header";
import Viewer from "../component/Viewer";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useDairy from "../hook/useDairy";
import { setPageTitle } from "../util";
import { useEffect } from "react";

const Dairy = () => {
  const { id } = useParams();
  const data = useDairy(id);

  useEffect(() => {
    setPageTitle("일기 상세");
  }, []);

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/", { replace: true });
  };

  const onClickEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Header
          title="일기 상세"
          leftChild={<Button text="< 뒤로가기" type="" onClick={onClickBack} />}
          rightChild={
            <Button text="수정하기" type="positive" onClick={onClickEdit} />
          }
        />
        <Viewer data={data} />
      </>
    );
  }
};

export default Dairy;
