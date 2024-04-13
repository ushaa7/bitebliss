import React, { useState, useContext, Fragment, FormEvent } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { UserContext } from '../../modules/users/context';
import { ROOTS, PATH_PAGE } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog({open, setOpen, handleClose, setMessage, setSevernity}) {

    const {forgotPassword} = useContext(UserContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDialogueClose = () => {
        setOpen(false);
    };
    const [email, setEmail] = useState("")

    const handleSubmit = async () => {
        console.log(email)

        try{
            await forgotPassword(email);
            setMessage("Email sent");
            setSevernity("success");
            handleClose();
            setOpen(false)
        }catch(err){
            setSevernity("error");
            setMessage(err.response.data.message);
            handleClose();
            setOpen(false)
        }
    }



return (
    <Fragment>
      <Button onClick={handleClickOpen}>
      Forgot Password
      </Button>
      <Dialog
        open={open}
        onClose={handleDialogueClose}
      >
        <DialogTitle>Fogot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter the email address,
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>{setEmail(e.target.value)}}  
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogueClose}>Cancel</Button>
          <Button onClick = {handleSubmit}> Confirm </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


const Login = ({handleClose, setMessage, setSevernity}) => {
    const {userLogin, forgotPassword} = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogin=async()=>{
        try{
            console.log(userLogin)
            await userLogin({email, password});
            setMessage("Login successful");
            setSevernity("success");
            handleClose();
            navigate(ROOTS.app)
        }catch(err){
            setSevernity("error");
            setMessage(err.response.data.message);
            handleClose();
        }
    }

    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    return (
        <Grid
            container
            spacing={0}
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <form  autoComplete="off">
                <TextField id="loginemail" value={email} type={"email"} onChange={(e)=>{setEmail(e.target.value)}}  label="email" variant="outlined" />
                <br></br>
                <br></br>
                <TextField id = "loginpassword" value={password} type={"password"} onChange={(e)=>{setPassword(e.target.value)}} label="password" variant="outlined" />
                <br></br>
                <br></br>
                <Button
                    onClick={handleLogin}
                    variant="contained" color="secondary">
                    Sign In 
                </Button>
                <FormDialog open={dialogueOpen} setOpen={setDialogueOpen} handleClose={handleClose} setMessage={setMessage} setSevernity={setSevernity} />
            </form>
        </Grid>
    )
}
export default Login;