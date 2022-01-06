import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const API = "http://localhost:9292/comments";

function CommentItems({ comment }) {
  const [employeeId, setEmployeeId] = useState("");

  function handleClickDelete() {
    fetch(`${API}/${comment.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    document.location.reload();
  }

  function handleClickSnackEdit() {
    const reqBody = {
      method: "PATCH",
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
  }
  return (
    <div className="row">
      <div className="column">
        <div className="card">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {comment.comment_content}
                </Typography>
                <Typography style={{fontWeight: "bold", color: "grey"}} variant="body2" color="text.secondary">
                  Posted by: {comment.employee.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button variant="contained" onClick={handleClickSnackEdit}>
              Edit
            </Button>
            <Button
              onClick={handleClickDelete}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CommentItems;
