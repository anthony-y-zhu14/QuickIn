import React from 'react';
import {Fab, Typography, Container, Grid } from '@material-ui/core';


export default function IndividualPage() {
    
    return (
    <Container>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Fab variant="contained" color="primary">
                    I have an account
                </Fab>
            </Grid>
            <Grid item xs={6}>
                <Fab variant="contained" color="primary">
                I want to Register
                </Fab>
            </Grid>

        </Grid>

    </Container> 
    );
  }