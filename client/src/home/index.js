import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from "react";
import { Grid, Typography, Box } from "@mui/material"

export default function Home(params) {
    return (
        <Grid container sx={{alignItems: "center", justifyContent: "center" }}>
        <Box
        component="img"
        sx={{ height: 200, width: 200, marginTop:"30px"}}
        src="http://localhost:5000/static/logo/logo-black.png"
        />
        <Grid container sx={{ alignItems: "center", justifyContent: "center", mt: 20 }}>
        <Typography variant="h1" >Let's start with BiteBliss...</Typography><br />
        <Grid container sx={{ width: "75%", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="body2" sx={{ fontFamily: "Nunito", mt: 5 }}>
        Enjoy the convenience of dining in the future with our advanced restaurant
        reservation web application! In a world where time is of the essence, our app
        emerges as the solution to streamline and elevate your dining experiences. Picture a
        platform that puts the power of choice in your hands, allowing you to effortlessly
        discover, select, and reserve tables at your preferred restaurants. Whether you&#39;re a
        spontaneous foodie seeking the hottest spot in town or an organized planner
        organizing a special celebration, our app is designed to meet your unique dining
        needs.
        </Typography>
        </Grid>     </Grid>
        </Grid>
        )
}