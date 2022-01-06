import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import SnackForm from "./snacks/SnackForm";
import CommentForm from "./comments/CommentForm";


function Header() {
  const [snackFormOpen, setSnackFormOpen] = useState(false)
  const [commentFormOpen, setCommentFormOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleMenuCloseSnackFormOpen() {
      handleClose()
      setSnackFormOpen(true)
  }

  function handleMenuCloseCommentFormOpen() {
      handleClose()
      setCommentFormOpen(true)
  }
  return (
    <>
      <Button
        id="menu-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem style={{color: "lightsteelblue", fontFamily: "ariel", fontWeight: "bold", fontSize: "20px"}} onClick={handleMenuCloseSnackFormOpen}>Click to add a snack!</MenuItem>
        <MenuItem style={{color: "lightsteelblue", fontFamily: "ariel", fontWeight: "bold", fontSize: "20px"}}onClick={handleMenuCloseCommentFormOpen}>Click to add a comment!</MenuItem>
      </Menu>

      <h1 className="header">Snack It Up! 💼🥯</h1>

      <SnackForm snackFormOpen={snackFormOpen} setSnackFormOpen={setSnackFormOpen}/>
      <CommentForm commentFormOpen={commentFormOpen} setCommentFormOpen={setCommentFormOpen}/>
    </>
  );
}

export default Header;
