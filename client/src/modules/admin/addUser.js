import React, { useState, useContext, useEffect } from 'react';
import { Paper, Modal, TextField,  FormControl, Grid, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useSnackbar } from "notistack";
import { UserContext } from '../users/context';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const EditUser = ({ open, handleClose, item }) => {
  const [modalStyle] = React.useState(getModalStyle);
  const { updateUser } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    try {
      await updateUser(item._id, { email,  role });
      enqueueSnackbar("User updated successfully");
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.response.data.message);
    }
  }
  const [roles, setRoles] = useState([]);
  const { getAllRoles } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(()=>{
    console.log(item)
    setRole(item.role)
    setEmail(item.email)
  },[item])

  useEffect(() => {
    getAllRoles().then((res) => setRoles(res));
  }, [getAllRoles])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          style={modalStyle}
        >
          <form  autoComplete="off">
          </form>
        </Paper>
      </Modal>
    </div>
  )
}
export default EditUser;