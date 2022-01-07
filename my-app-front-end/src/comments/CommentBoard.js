import { useEffect } from "react";
import CommentItems from "./CommentItems";



function CommentBoard({ commentList, handleEditClick  }) {
  const displayComments = commentList.map((comment) => {
    return <CommentItems handleEditClick={handleEditClick} comment={comment} key={comment.id} />;
  });

  return <div className="Comment-board">{displayComments}</div>;
}

export default CommentBoard;
