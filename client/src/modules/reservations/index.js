
import React, {Fragment, useContext, useEffect, useState } from "react";
import { ResvContext } from './context';
import { getAllReservations } from './services';

import {makeStyles} from '@mui/styles'
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Button, Typography, Grid, TextField, Alert as MuiAlert} from "@mui/material"
import { Search as SearchIcon, RadioButtonUnchecked as IconButton, Clear as ClearIcon } from '@mui/icons-material';


import AddResturant from './addReservation'


const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    textField: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      margin: theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
);




function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="medium" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="medium" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}


function DeleteItemDialogue({enabled, item, handleDelete}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Fragment>
    <Button disabled={!enabled} onClick={handleClickOpen}>
    Delete Resturant
    </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete resturant ? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


export default function EnhancedTable() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');
  const [severnity, setSevernity] = useState("success");
  const [message, setMessage] = useState("");


  const { deleteItem, getAllItems, items } = useContext(ResvContext);

  async function handleDelete(){
    try{
      await deleteItem(item.id)
      setMessage("Resturant deleted successfully");
      setSevernity("success");
      handleSnakClose();
    }catch(err){
      console.log(err)
      setMessage(err.data);
      setSevernity("error");
      handleSnakClose();
    }
  }

  var columns = [
  	{ field: "reservationDate", flex:1, type: "date", headerName: "Reservation date",
  	valueFormatter: params => new Date(params?.value).toLocaleString(),
  },
  { field: "numOfPeople",flex:1, padding:"left", headerName: "Number of people"},
  { field: "tableNo", type: "number",flex:1,headerName: "Total tables"},
  { field: "resturant", type: "string", flex:1,headerName: "Resturant",

  valueGetter: (value) => {
  	if (!value) {
  		return value;
  	}
      // Convert the decimal value to a percentage
  	return value.name;
  }
},
{ field: "user", type: "email", flex:1,headerName: "User",

valueGetter: (value) => {
	if (!value) {
		return value;
	}
      // Convert the decimal value to a percentage
	return value.email;
} }, ]
  
  const theme = createTheme();

  columns.forEach((c) => {
    c.renderCell = (params) => {
      return (
        <ThemeProvider theme={theme}>
          <Typography variant="body1" >{params.value}</Typography>
        </ThemeProvider>
      )
    }
    c.renderHeader = () => {
      return <Typography variant="body1" >{c.headerName}</Typography>
    }
    c.headerAlign='center'
  })

  const [open, setOpen] = useState(false);
  const [snakOpen, setSnakOpen] = useState(false);
  const [item, setItem] = useState({});

  const handleClose = () => {
    setOpen(!open);
  }
  const handleSnakClose = () => {
    setSnakOpen(!snakOpen);
  }


  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = items.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };

  const [searchText, setSearchText] = React.useState('');
  const [action, setAction] = React.useState('add');


  return (
    <div sx = {{
      flexGrow :1,
      backgroundColor: 'white',
    }}>
  	<Grid 
  	container
  	direction="column"
  	alignItems="center"
  	justifyContent="center"

  	> 
  	<Typography variant="h3">
  	Reservations List
  	</Typography>


  	<DataGrid
  	style={{ width: '70%' }}
  	components={{ Toolbar: QuickSearchToolbar }}
  	onRowClick={async(s) => {
  		setItem(s.row)
  	}} 
  	width= "100%"
        rows={items} 
        columns={columns}
        getRowId={(row)=>{
            return row.id;
          }
        }
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />



    <Button onClick={()=>{setAction('add');setOpen(!open); }}> Add reservation</Button>

    <Button disabled={item.id === undefined} onClick={()=>{setAction('edit');setOpen(!open)}}> Edit resturant </Button>

    <DeleteItemDialogue enabled={item.id !== undefined} item={item} handleDelete={handleDelete}/>
  	</Grid>

    <AddResturant open={open} handleSnakClose={handleSnakClose}  handleClose = {handleClose}item = {item} action={action} setMessage={setMessage} setSevernity={setSevernity}/>



      <Snackbar anchorOrigin={{ horizontal:'right', vertical:'top'}} open={snakOpen} autoHideDuration={6000} onClose={handleSnakClose}>
        <MuiAlert onClose={handleSnakClose} severity={severnity} variant="filled" >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}