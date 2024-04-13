import axios from 'axios';
import { UserContext } from './context';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState, useContext } from 'react';
import api from '../../constants/api';

import {Card, CardContent,TextField, CardMedia, Avatar, Button, Typography, Grid, Backdrop, CircularProgress, }  from '@mui/material';
import { getUserToken } from '../../utils/sessionManager';

const access_token = getUserToken();


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}));

const UserProfile = (props) => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const classes = useStyles();
  const {user_info, addIssuerAndApprove } = useContext(UserContext);
  const [unlock, setUnlock] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    console.log(user_info)
  }, [user_info]);

  return loading ? (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <Typography>Registering user</Typography>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  ) : (
    <div className={classes.root}>
    <Grid container 
    alignItems="center"
    justifyContent="center"
    marginTop="20px"
    >
          <Card>
            <CardMedia>
            </CardMedia>
            <CardContent direction="column" >
              <Typography gutterBottom variant="h5" component="h2">
              Profile
              </Typography>

              <Grid container direction="column">
              <TextField id="username" name="username" value={user_info.username} type={"text"} onChange={()=>{console.log("changed")}} label="Username"  disabled={!isEdit} />

              <br/>
              <TextField id="email" name="email" value={user_info.email} type={"text"} onChange={()=>{console.log("changed")}} label="Email"  disabled={!isEdit} />

              <br/>
              <TextField id="password" name="password" value="1000000000000000000000000" type={"password"} onChange={()=>{console.log("changed")}} label="Password"  disabled={!isEdit} />
              <br/>
              <Typography gutterBottom variant="body1">
              Role : {user_info.role}
              </Typography>
              </Grid>

            <Button onClick={()=>setIsEdit(!isEdit)}> Edit user </Button>
            <Button onClick={()=>setIsEdit(!isEdit)} disabled={!isEdit}> Confirm Changes </Button>
            </CardContent>
          </Card>

          <br />
      </Grid>
    </div>
  );
};
export default UserProfile;
