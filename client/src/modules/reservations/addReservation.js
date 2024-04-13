import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from "notistack";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Button, Paper, Modal, TextField, FormControl,  Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ResvContext } from './context';




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

const AddReservation = ({ open, handleSnakClose,action, handleClose, item , setMessage, setSevernity}) => {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { addItem, updateItem, refreshData, initiateKhaltiPayment } = useContext(ResvContext);

  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    totalTables: 5,
    description : ""
  });

  useEffect(()=>{
    console.log(item)
  },[item])


  const handleAddItem= async () => {
    try {

        const res = await initiateKhaltiPayment(1000);

      if(action == 'add'){
        newItem.resturantId = item.id;
        await addItem(newItem);
        setMessage("Reservation added successfully");
        console.log(res)
      }else{
        delete newItem.createdAt
        delete newItem.updatedAt
        delete newItem.updatedAt
        await updateItem(newItem);
        setMessage("Reservation updated successfully");
      }
      setSevernity("success");
      handleSnakClose();
      window.location.href = res.data.payment_url;
      refreshData()
    } catch (err) {
      console.log(err)
      setMessage(err.data);
      setSevernity("error");
      handleSnakClose();
    }
  }


  const handleChange = e => {

    const {name, value } = e.target;

    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  useEffect(()=>{
    console.log(item)
    console.log(action)
    if(action =='edit'){
      setNewItem(item)
    }else{
      setNewItem({})
    }
  },[item, action])


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          className={classes.paper}
          style={modalStyle}
        >
          <form className={classes.root} autoComplete="off">
            <TextField id="tableNo" name="tableNo" value={newItem.tableNo} type={"number"} onChange={handleChange} label="total tables" variant="outlined" />
            <br></br>
            <TextField id="numOfPeople" name="numOfPeople" value={newItem.totalTables} type={"number"} onChange={handleChange} label="number of people" variant="outlined" />
            <br></br>
            <DatePicker id="reservationDate" name="reservationDate" value={newItem.reservationDate} onChange={(newValue) => {

              setNewItem(prevState => ({
                ...prevState,
                reservationDate: newValue
              }));

            }} label="Reservation Date"  />
            <br></br>

            <Button size="small" color="primary" onClick={()=>{
              //setItem(item)
              //handleClose()
            }}>
            Reserve
            </Button>

            <Button
              onClick={handleAddItem}
              variant="contained" color="secondary">

              {(action === 'edit') ? "Edit resturant" : "Reserve table" }
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  )
}
export default AddReservation;