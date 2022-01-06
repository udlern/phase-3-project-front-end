import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const API = "http://localhost:9292/comments";
const APIEmp = "http://localhost:9292/employees";

function CommentForm({ commentFormOpen, setCommentFormOpen }) {
  const [comment, setComment] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetch(APIEmp)
      .then((resp) => resp.json())
      .then(setEmployeeList);
  }, []);

  function handleOnChangeComment(event) {
    setComment(event.target.value);
  }

  function handleChangeEmployee(event) {
    setEmployeeId(event.target.value);
  }

  function handleOnSubmit(event) {
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

  return (
    <Modal
      open={commentFormOpen}
      onClose={() => setCommentFormOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Comment Form
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Employees</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Employees"
            onChange={handleChangeEmployee}
            defaultValue=""
          >
            {employeeList.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
          <br />
          <label>
            <TextField
              id="comment-input"
              value={comment}
              onChange={handleOnChangeComment}
              label="Type your comment here!"
              variant="outlined"
            />
          </label>
          <Button variant="contained" onClick={handleOnSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}

export default CommentForm;
