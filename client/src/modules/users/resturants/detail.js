import {useEffect, useState, useContext, Fragment} from 'react'
import GoogleMapReact from 'google-map-react';


import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel'

import {Star as StarIcon} from "@mui/icons-material"

import {RestContext} from "../../admin/resturants/context"
import AddReservations from "../../reservations/addReservation"
import {
	Box,
	Snackbar, 
	Paper, 
	TextField, 
	Card, 
	Modal ,
	Alert as MuiAlert, 
	CardContent, 
	CardMedia,
	Rating,
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
	Grid,
	Button
} from '@mui/material';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function HoverRating() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}




const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SimpleMap(){
  const defaultProps = {
    center: {
          lat:27.725333899486866,
          lng:85.34994999234286,
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCBeh5F0_sEJUQIFTy8-Bo9M1mWtq5dBWM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={27.725333899486866}
          lng={85.34994999234286}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}


function Comments({id}) {

	const {refreshReviews, reviews} = useContext(RestContext)

	useState(()=>{
		refreshReviews(id);
	},[])
  return (
  	<Grid> 
  	<Typography variant="h5"> Comments </Typography>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

    {reviews ? reviews.map((review)=>{
    	return(
    		<div>
    		<ListItem alignItems="flex-start">
    		<ListItemAvatar>
    		<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    		</ListItemAvatar>
    		<ListItemText
    		primary={review.review}
    		secondary={
    			<Fragment>
    			<Typography
    			sx={{ display: 'inline' }}
    			component="span"
    			variant="body2"
    			color="text.primary"
    			>
    			</Typography>
    			{review.createdAt}
    			</Fragment>
    		}
    		/>
    		</ListItem>
    		<Divider variant="inset" component="li" />
    		</div>
    		)
    }): ""}
    </List>
  	</Grid>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddRatingDialogue({ id, open, handleSnakClose,  handleClose, setMessage, setSevernity}){
	const [description, setDescription] = useState("")
	const classes = useStyles();
	const {postReview, refreshReviews} = useContext(RestContext)
	const [modalStyle] = useState(getModalStyle);

	const handleChange = (e)=>{
		setDescription(e.target.value)
	}
	const handleAddItem = async ()=>{
	}


	return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Paper
          className={classes.paper}
          style={modalStyle}
        >
          <form  autoComplete="off">
          <HoverRating/>
            <Button onClick={handleAddItem} variant="contained" color="secondary">
               Set rating
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
	
		)
}


function AddCommentDialogue({ id, open, handleSnakClose,  handleClose, setMessage, setSevernity}){
	const [description, setDescription] = useState("")
	const classes = useStyles();
	const {postReview, refreshReviews} = useContext(RestContext)
	const [modalStyle] = useState(getModalStyle);

	const handleChange = (e)=>{
		setDescription(e.target.value)
	}
	const handleAddItem = async ()=>{
		try {
			await postReview({"rating": 5,"review": description, "resturantId": id});
			setMessage("Posted review successfully");
			setSevernity("success");
			handleSnakClose();
			//refreshData()
			refreshReviews(id);
		}
		catch (err) {
			setMessage(err.data);
			setSevernity("error");
			handleSnakClose();
		}
	}


	return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Paper
          className={classes.paper}
          style={modalStyle}
        >
          <form  autoComplete="off">
            <TextField id="description" name="description" value={description} type={"text"} onChange={handleChange} label="description" variant="outlined" />
            <br></br>
            <Button onClick={handleAddItem} variant="contained" color="secondary">
               Add review
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
	
		)
}

export default function ResturantDetail(){

	const [id, setId] = useState('')
	const [item, setItem] = useState({})
	const {getById} = useContext(RestContext)

	useEffect(()=>{
		const arr = window.location.href.split('/')
		setId(arr.at(-1))
	},[])

	useEffect(()=>{
		if(id != ''){
			getById(id).then(res=>{
				console.log(res)
				setItem(res)
			})
		}
	},[id])



  const [ratingOpen, setRatingOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [snakOpen, setSnakOpen] = useState(false);
  const [severnity, setSevernity] = useState("success");
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(!open);
  }
  const handleRatingClose = () => {
    setRatingOpen(!ratingOpen);
  }
  const handleSnakClose = () => {
    setSnakOpen(!snakOpen);
  }

	return (
		<div>
		<Grid container  
		direction="column"
		alignItems="center"
		justifyContent="center"
		>
		<Typography variant="h1">Resturant Details</Typography>

		<Carousel sx={{width: 400, height:400, borderRadius: 3}}>
		{item.files ? (
			item.files.map((i)=>{
				return (
					<Grid sx={{border: 1, borderRadius: 3}}>

					<CardMedia
					sx={{border: 1, borderRadius: 3}}
					component="img" image={`http://localhost:5000/static/${id}/${i}`} alt="green iguana" />
					</Grid>
					)

			})

			):""}
		</Carousel>

		<Typography variant="h3">{item.name}</Typography>
		<Typography variant="h5">{item.description}</Typography>
		</Grid>
		<Grid marginLeft="100px">
		<HoverRating/>
		<Button onClick={handleClose} > Add your review </Button>
		<Button onClick={handleRatingClose} > Rate the resturant </Button>
		{id ? (
		<Comments id={id}/>
			): ""}

		<AddCommentDialogue id= {id} open={open} handleSnakClose={handleSnakClose}  handleClose = {handleClose} setMessage={setMessage} setSevernity={setSevernity}/>
		<AddRatingDialogue id= {id} open={ratingOpen} handleSnakClose={handleSnakClose}  handleClose = {handleRatingClose} setMessage={setMessage} setSevernity={setSevernity}/>


		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<SimpleMap/>

		</Grid>

      <Snackbar anchorOrigin={{ horizontal:'right', vertical:'top'}} open={snakOpen} autoHideDuration={6000} onClose={handleSnakClose}>
        <MuiAlert onClose={handleSnakClose} severity={severnity} variant="filled" >
          {message}
        </MuiAlert>
      </Snackbar>
		</div>
		)
}