import * as React from 'react';
import {PATH_APP} from "../../../routes/paths"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Typography, Snackbar, Alert as MuiAlert} from '@mui/material';
import { Grid, Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { RestContext } from '../../admin/resturants/context';

import AddReservations from "../../reservations/addReservation"


function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


const SearchBar = ({setData, items}) => {

  const [searchVal, setSearchVal] = React.useState('');
  const requestSearch = (e) => {
    setSearchVal(e.target.value);
    const searchRegex = new RegExp(escapeRegExp(searchVal), 'i');
    const filteredRows = items.filter((row) => {
      return Object.keys(row).some((field) => {
        if(row[field]){
          return searchRegex.test(row[field].toString());
        }
      });
    });

    if(searchVal == ""){
      setData(items);
    }else{
      setData(filteredRows);
    }
  };

  return(
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {requestSearch(e) }}
      value={searchVal}
      label="Enter a city name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
    )
};

export default function MultiActionAreaCard() {
  const { items} = React.useContext(RestContext);

  const [open, setOpen] = React.useState(false);
  const [snakOpen, setSnakOpen] = React.useState(false);
  const [item, setItem] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [severnity, setSevernity] = React.useState("success");
  const [action, setAction] = React.useState('add');
  const [data, setData] = React.useState([])

  const [searchVal, setSearchVal] = React.useState('');
  const handleSnakClose = () => {
    setSnakOpen(!snakOpen);
  }

  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(!open);
  }


  React.useEffect(()=>{
    setData(items)
    console.log(items)
  },[items])

  return (
    <Grid container 


    direction="flex"
    alignItems="center"
    justifyContent="center"
    marginTop = "50px"

    >
    <SearchBar setData={setData} items={items} />
    <br></br>
    <Grid 

    container
    direction="flex"
    alignItems="center"
    justifyContent="center"
    marginTop = "50px"
    > 




    {data.map(item=>{
      return (
        <Card sx={{ maxWidth: 445, margin : 3 }}>
        <CardActionArea
        onClick={()=>{navigate(PATH_APP.app.resturants + `/${item.id}`)}}
        >
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:5000/static/${item.id}/${item.files[0]}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={()=>{
            setItem(item)
            handleClose()
          }}>
            Reserve
          </Button>
        </CardActions>
      </Card>
    )})}

    {item? (<AddReservations open={open} handleSnakClose={handleSnakClose}  handleClose = {handleClose}item = {item} action={action} setMessage={setMessage} setSevernity={setSevernity}/>): ""}

      <Snackbar anchorOrigin={{ horizontal:'right', vertical:'top'}} open={snakOpen} autoHideDuration={6000} onClose={handleSnakClose}>
        <MuiAlert onClose={handleSnakClose} severity={severnity} variant="filled" >
          {message}
        </MuiAlert>
      </Snackbar>

    </Grid>
    </Grid>
    )
}
