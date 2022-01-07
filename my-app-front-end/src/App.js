import { useState, useEffect } from "react";

import "./css/App.css";
import SnackBoard from "./snacks/SnackBoard";
import CommentBoard from "./comments/CommentBoard";
import Header from "./Header";
import SnackForm from "./snacks/SnackForm";
import CommentForm from "./comments/CommentForm";

const API = "http://localhost:9292/comments";
const APIEmp = "http://localhost:9292/employees";

function App() {
  const [snackList, setSnackList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [snackFormOpen, setSnackFormOpen] = useState(false)
  const [commentFormOpen, setCommentFormOpen] = useState(false)
  const [commentId, setCommentId] = useState("")
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState("")
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(API)
      .then((resp) => resp.json())
      .then(setCommentList);
  }, []);

  useEffect(() => {
    fetch(APIEmp)
      .then((resp) => resp.json())
      .then(setEmployeeList);
  }, []);

  function handleEditClick(commentId, employeeId) {
    setCommentId(commentId)
    setEmployeeId(employeeId)
    setCommentFormOpen(true)
    console.log(employeeId)
    

  }

  function handleOnSubmitNewForm(event) {
    event.preventDefault();

    if (comment === "" && employeeId === "") {
      alert("Please enter your comment and choose an employee!");
    } else if (employeeId === "") {
      alert("Please choose an employee!");
    } else if (comment === "") {
      alert("Please enter your comment!");
    } else {
      const reqBody = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: employeeId,
          comment_content: comment,
        }),
      };
      fetch(API, reqBody)
        .then((resp) => resp.json())
        .then((data) => console.log(data));
      document.location.reload();
    }
  }

  function handleOnSubmitEditForm(event) {
    event.preventDefault()



  }




  return (
    <div className="app">
      <Header setSnackFormOpen={setSnackFormOpen} setCommentFormOpen={setCommentFormOpen}/>
      <SnackBoard snackList={snackList} setSnackList={setSnackList} />
      <CommentBoard handleEditClick={handleEditClick} commentList={commentList} setCommentList={setCommentList} />
      <SnackForm snackFormOpen={snackFormOpen} setSnackFormOpen={setSnackFormOpen}/>
      <CommentForm handleOnSubmitEditForm={handleOnSubmitEditForm} handleOnSubmitNewForm={handleOnSubmitNewForm} comment={comment} setComment={setComment} setEmployee={setEmployee} employee={employee} employeeId={employeeId} setEmployeeId={setEmployeeId} employeeList={employeeList} commentList={commentList} commentId={commentId} commentFormOpen={commentFormOpen} setCommentFormOpen={setCommentFormOpen}/>
    </div>
  );
}

export default App;
