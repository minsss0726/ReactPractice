import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import { useReducer, useEffect, createContext, useState } from "react";
import Edit from "./pages/Edit";
import Dairy from "./pages/Dairy";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "INIT":
//       return action.data;
//     case "CREATE":
//       return [action.data, ...state];
//     case "REMOVE":
//       return state.filter((it) => it.id !== action.targetId);
//     case "EDIT":
//       return state.map((it) =>
//         it.id === action.targetId ? { ...action.newData } : it
//       );
//     default:
//       return state;
//   }
// };

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const [data, dispatch] = useReducer(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // dispatch({ type: "INIT", data: [] });
    setIsDataLoaded(true);
  }, []);

  // const onCreate = (data) => {
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: data.id,
  //       date: data.date,
  //       content: data.content,
  //       emotion_id: data.emotion_id,
  //     },
  //   });
  // };

  // const onDelete = (targetId) => {
  //   dispatch({ type: "REMOVE", targetId });
  // };

  // const onEdit = (targetId, newData) => {
  //   dispatch({ type: "EDIT", targetId, newData });
  // };

  if (!isDataLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/dairy/:id" element={<Dairy />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
