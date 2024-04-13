import React, { useState } from "react";
import { Snackbar,Grid,  AppBar, Tabs, Tab, Typography, Box, Alert as MuiAlert} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import Login from "./login";
import SignUp from "./signup";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


export default function Auth() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severnity, setSevernity] = useState("success");

    const handleClose = () => {
        setOpen(!open);
    }

  return (
    <div sx = {{
      flexGrow :1,
      backgroundColor: 'white'
    }}>
      <AppBar position="static" variant="elevation">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>
      </AppBar>
      <Grid 
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    marginTop="10px"

      >
        <Box
        component="img"
        sx={{
          height: 200,
          width: 200,
        }}
        alt="The house from the offer."
        src="http://localhost:5000/static/logo/logo-black.png"
        />
      </Grid>
      <SwipeableViews
        axis={"x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        containerStyle={{
          transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
        }}
      >
        <TabPanel value={value} index={0}>
          <Login handleClose={handleClose} setMessage={setMessage} setSevernity={setSevernity} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp handleClose={handleClose} setMessage={setMessage} setSevernity={setSevernity} />
        </TabPanel>
      </SwipeableViews>
      <Snackbar anchorOrigin={{ horizontal:'right', vertical:'top'}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={severnity} variant="filled" >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
