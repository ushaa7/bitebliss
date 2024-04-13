import React, { useState, useContext, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useSnackbar } from "notistack";
import {Typography, Button, Paper, Modal, TextField, FormControl,  Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { RestContext } from './context';




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

const AddResturant = ({ open, handleSnakClose,action, handleClose, item , setMessage, setSevernity}) => {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { addItem, updateItem, refreshData } = useContext(RestContext);

  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    totalTables: 5,
    description : ""
  });

  const [files, setFiles] = useState([])

  const handleAddItem= async () => {
    try {
      console.log(newItem)

      if(action == 'add'){
        const form = Object.entries(newItem).reduce((d, e) => (d.append(...e), d), new FormData());

        files.forEach(file=>{
          form.append("image", file)
        })

        if(files.length <= 1){
          form.append("image", "pineapple.exe")
        }
        await addItem(form);
        setMessage("Resturant added successfully");
      }else{
        delete newItem.createdAt
        delete newItem.updatedAt
        delete newItem.updatedAt
        await updateItem(newItem);
        setMessage("Resturant updated successfully");
      }
      setSevernity("success");
      handleSnakClose();
      refreshData()
    } catch (err) {
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


  const handleFileUpload = (e)=>{
    setFiles([...files, e.target.files[0]])
    console.log(files)
    console.log(e.target.files)
  }

  const removeFileRest = (name)=>{
    const new_files = files.slice(0)
    files.forEach((file, i)=>{
      if(file.name == name){
        new_files.splice(i,1)
      }
    })
    console.log(new_files)
    setFiles(new_files)
  }


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
            <TextField id="name" value={newItem.name} type={"text"} onChange={handleChange} label="name" name="name" variant="outlined" />
            <br></br>
            <TextField id="description" name="description" value={newItem.description} type={"text"} onChange={handleChange} label="description" variant="outlined" />
            <br></br>

            {files.length > 0 ? (files.map((file)=>{
              return (
                <div key={file.name}>
                <Typography >{file.name}</Typography>
                <Button onClick={()=>removeFileRest(file.name)} >Delete </Button>
                </div>
                )
            })): ""}
              <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{ marginRight: "1rem" }}
              >
              Upload images
              <input type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleFileUpload} />
              </Button>

            <br></br>
            <TextField id="totalTables" name="totalTables" value={newItem.totalTables} type={"number"} onChange={handleChange} label="total tables" variant="outlined" />
            <br></br>
            <Button
              onClick={handleAddItem}
              variant="contained" color="secondary">

              {(action === 'edit') ? "Edit resturant" : "Add Resturant" }
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  )
}
export default AddResturant;