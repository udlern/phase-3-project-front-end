import { useState } from "react";

import "./css/App.css";
import SnackBoard from "./snacks/SnackBoard";
import CommentBoard from "./comments/CommentBoard";
import Header from "./Header";

function App() {
  const [snackList, setSnackList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  return (
    <div className="app">
      <Header />
      <SnackBoard snackList={snackList} setSnackList={setSnackList} />
      <CommentBoard commentList={commentList} setCommentList={setCommentList} />
    </div>
  );
}

export default App;
