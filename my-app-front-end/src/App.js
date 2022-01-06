import { useState } from "react";

import "./App.css";
import SnackBoard from "./SnackBoard";
import CommentBoard from "./CommentBoard";
import Header from "./Header";
import SnackForm from "./SnackForm";
import CommentForm from "./CommentForm";

function App() {
  const [snackList, setSnackList] = useState([]);
  const [commentList, setCommentList] = useState([])
  return (
    <div className="app">
      <Header />
      <SnackBoard snackList={snackList} setSnackList={setSnackList} />
      <CommentBoard commentList={commentList} setCommentList={setCommentList}/>
      <SnackForm />
      <CommentForm />
    </div>
  );
}

export default App;
