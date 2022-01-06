import { useEffect } from "react";
import CommentItems from "./CommentItems";

const API = "http://localhost:9292/comments";

function CommentBoard({ commentList, setCommentList }) {
  const displayComments = commentList.map((comment) => {
    return <CommentItems comment={comment} key={comment.id} />;
  });

  useEffect(() => {
    fetch(API)
      .then((resp) => resp.json())
      .then(setCommentList);
  }, []);

  return <div className="Comment-board">{displayComments}</div>;
}

export default CommentBoard;
