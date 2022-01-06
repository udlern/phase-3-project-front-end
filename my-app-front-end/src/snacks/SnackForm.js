import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const API = "http://localhost:9292/snacks";
const APIEmp = "http://localhost:9292/employees";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function SnackForm({ snackFormOpen, setSnackFormOpen }) {
  const [snackName, setSnackName] = useState("");
  const [snackImage, setSnackImage] = useState("");
  const [keto, setKeto] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [veggie, setVeggie] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);
  const [nutFree, setNutFree] = useState(false);
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

  function handleOnChangeSnackName(event) {
    setSnackName(event.target.value);
  }

  function handleOnChangeSnackImage(event) {
    setSnackImage(event.target.value);
  }

  function handleOnChangeKeto(event) {
    setKeto(event.target.checked);
  }

  function handleOnChangeGlutenFree(event) {
    setGlutenFree(event.target.checked);
  }

  function handleOnChangeVeggie(event) {
    setVeggie(event.target.checked);
  }

  function handleOnChangeDairyFree(event) {
    setDairyFree(event.target.checked);
  }

  function handleOnChangeNutFree(event) {
    setNutFree(event.target.checked);
  }

  useEffect(() => {
    fetch(APIEmp)
      .then((resp) => resp.json())
      .then(setEmployeeList);
  }, []);



  function handleChangeEmployee(event) {
    setEmployeeId(event.target.value);
  }

  function handleSnackSubmit(event) {
    event.preventDefault();

    if (employeeId === "" && snackName === "" && snackImage === "") {
      alert("Please fill out text boxes!");
    } else if (employeeId === "") {
      alert("Please choose an employee!");
    } else if (snackName === "") {
      alert("Please enter a snack name!");
    } else if (snackImage === "") {
      alert("Please enter a url of the snack image!");
    } else {
      const reqBody = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: employeeId,
          name: snackName,
          keto: keto,
          gluten_free: glutenFree,
          vegetarian: veggie,
          dairy_free: dairyFree,
          nut_free: nutFree,
          picture: snackImage,
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
      open={snackFormOpen}
      onClose={() => setSnackFormOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Snack Form
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
            {employeeList.map((employee) => {
              return (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              );
            })}
          </Select>
          <label>
            <TextField
              id="snack-name-input"
              value={snackName}
              onChange={handleOnChangeSnackName}
              label="Type the snack name here!"
              variant="outlined"
            />
          </label>
          <label>
            <TextField
              id="snack-url-input"
              value={snackImage}
              onChange={handleOnChangeSnackImage}
              label="Type the url of the snack image here!"
              variant="outlined"
            />
          </label>
          <label>
            Is your snack keto? 🍗
            <Checkbox checked={keto} onChange={handleOnChangeKeto} {...label} />
          </label>
          <label>
            Is your snack gluten-free? 🌾
            <Checkbox
              checked={glutenFree}
              onChange={handleOnChangeGlutenFree}
              {...label}
            />
          </label>
          <label>
            Is your snack vegetarian? 🍅
            <Checkbox
              checked={veggie}
              onChange={handleOnChangeVeggie}
              {...label}
            />
          </label>
          <label>
            Is your snack dairy-free? 🥛
            <Checkbox
              checked={dairyFree}
              onChange={handleOnChangeDairyFree}
              {...label}
            />
          </label>
          <label>
            Is your snack nut-free? 🥜
            <Checkbox
              checked={nutFree}
              onChange={handleOnChangeNutFree}
              {...label}
            />
          </label>
          <Button variant="contained" onClick={handleSnackSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}

export default SnackForm;
