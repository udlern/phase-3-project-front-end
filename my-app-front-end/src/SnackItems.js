import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const API = "http://localhost:9292/snacks";



function SnackItems({ snack }) {


  function handleClickDelete() {
    fetch(`${API}/${snack.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    document.location.reload();
  }
  return (
    
    <div className="row">
  <div className="column">
    <div className="card">

   
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="180"
        image={snack.picture}
        alt={snack.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Snack Name: {snack.name}
          <br/>
          Who brought this snack? {snack.employee.name}
          <br/>
          Keto: 🍗 {snack.keto ? "Yes" : "No"}
          <br/>
          Gluten-free: 🌾 {snack.gluten_free ? "Yes" : "No"}
          <br/>
          Vegetarian: 🍅 {snack.vegetarian ? "Yes" : "No"}
          <br/>
          Dairy-free: 🥛 {snack.dairy_free ? "Yes" : "No"}
          <br/>
          Nut-free: 🥜 {snack.nut_free ? "Yes" : "No"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleClickDelete}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
    </div>
    </div>
    </div>
  
   
   
   
  );
}

export default SnackItems;
