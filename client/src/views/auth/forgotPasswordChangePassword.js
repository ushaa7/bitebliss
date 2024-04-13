import { Snackbar, Button, Grid, TextField, Typography , Alert as MuiAlert} from "@mui/material";
import { useState,useContext, useEffect } from "react";
import { UserContext } from "../../modules/users/context";
import { useNavigate} from "react-router-dom";
import { ROOTS, PATH_PAGE } from '../../routes/paths';


const ForgotPasswordChangePassword = (props) => {
    const {logout} = useContext(UserContext);
    const navigate = useNavigate();


    const [password, setPassword] = useState("");
    const [cpassword , setCPassword] = useState("");
    const {userLogin} = useContext(UserContext);
    const [token, setToken] = useState("");

    useEffect(()=>{
        const arr = window.location.href.split('/')
        setToken(arr[arr.length-1])
        console.log(token)
    })
    const {changePassword} = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severnity, setSevernity] = useState("success");

    const handleClose = () => {
        setOpen(!open);
    }

    const handleUpdatePassword=async()=>{
        try{
            await changePassword(password, cpassword, token);
            setMessage("Passwor changed");
            setSevernity("success");
            navigate(PATH_PAGE.auth.login)
            handleClose();
            setOpen(true)
        }catch(err){
            setSevernity("error");
            setMessage(err.response.data.message);
            setOpen(false)
            handleClose();
        }

    }
    return (
        <div>
        <br></br>
        <Grid container spacing={0} justifyContent="center" >
        <Typography variant="h1"> Update password </Typography>
        <Grid container sx={{ width: "75%", alignItems: "center", justifyContent: "center" }}>
                <form  autoComplete="off">
                    <TextField id = "loginpassword" value={password} type={"password"} onChange={(e)=>{setPassword(e.target.value)}} label="new password" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField id = "logincpassword" value={cpassword} type={"password"} onChange={(e)=>{setCPassword(e.target.value)}} label="confirm password" variant="outlined" />
                    <br></br>
                    <br></br>
                    <Button
                        onClick={handleUpdatePassword}
                        variant="contained" color="secondary">
                        Update password
                    </Button>
                </form>
            </Grid>
            </Grid>

            <Snackbar anchorOrigin={{ horizontal:'right', vertical:'top'}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={severnity} variant="filled" >
            {message}
            </MuiAlert>
            </Snackbar>

            </div>
            );
}
export default ForgotPasswordChangePassword;