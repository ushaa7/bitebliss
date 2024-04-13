import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { UserContext } from '../../modules/users/context';

const SignUp = ({handleClose , setMessage, setSevernity}) => {
    const { addUser } = useContext(UserContext);



    const handleLogin = async () => {
        try {
            await addUser({ username, email, password, role });
            setMessage("User added successfully");
            setSevernity("success");
            handleClose();
        } catch (err) {
            setSevernity("error");
            setMessage(err.response.data.message);
            handleClose();
        }
    }
    const [roles, setRoles] = useState([]);
    const {getAllRoles} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    useEffect(()=>{
        getAllRoles().then((res)=>setRoles(res));
    },[getAllRoles])

    return (
        <div>
            <Grid
                container
                spacing={0}
                justifyContent="center"
                style={{ minHeight: '10vh' }}
            >
                <form  autoComplete="off">
                    <TextField id = "username" value={username} type={"text"} onChange={(e) => { setUsername(e.target.value) }}  label="username" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField id = "email" value={email} type={"email"} onChange={(e) => { setEmail(e.target.value) }}  label="email" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField id = "password" value={password} type={"password"} onChange={(e) => { setPassword(e.target.value) }}  label="password" variant="outlined" />
                    <br></br>
                    <br></br>
                    <FormControl id = "role"  variant="filled" >
                        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                        >

                            {roles.map((r, i) => {
                                return (
                                    <MenuItem key={i} value={r}>{r}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <br></br>
                    <br></br>
                    <Button
                        onClick={handleLogin}
                        variant="contained" color="secondary">
                        Sign Up
                    </Button>
                </form>
            </Grid>
        </div>
    )
}
export default SignUp;