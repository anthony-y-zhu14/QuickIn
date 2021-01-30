import React, { useState } from 'react';

import {Fab, Typography, Container, Grid, Zoom, ButtonGroup, Button, Paper, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    main: {
        margin: '100px auto',
    },
    media: {
      height: 140,
    },
    form: {
        textAlign: 'center',
        padding: '1em'
    },
  });

export default function BusinessPage() {
    const classes = useStyles();

        return (
            <React.Fragment>
                <Container maxWidth={'md'} className={classes.main}>
                <Paper className={classes.form} elevation={3}>
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get your business setup.</Typography>
                    <Typography variant={'body1'} style={{margin: '2%'}}>Already have an account? <a href=''>Login.</a></Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Business Name'></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Email'></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Phone Number'></TextField>
                            </Grid> 
                            <Grid container spacing={2} style={{marginTop: 20}}>
                                <Grid item xs={6}><TextField variant='outlined' label='Address Line 1'></TextField></Grid>
                                <Grid item xs={6}><TextField variant='outlined' label='Address Line 2'></TextField></Grid>
                                <Grid item xs={6}><TextField variant='outlined' label='Postal Code'></TextField></Grid>
                                <Grid item xs={6}><TextField variant='outlined' label='City'></TextField></Grid>
                                <Grid item xs={6}><TextField variant='outlined' label='Province / Territory'></TextField></Grid>
                                <Grid item xs={6}><TextField variant='outlined' label='Country'></TextField></Grid>
                            </Grid>   
                        
                            <Grid item xs={12}>
                                <Button variant="contained" style={{float: 'right', marginRight: 100, marginTop: 20}} color='primary'>Next</Button>
                            </Grid>                           
                        </Grid>
                    </Paper> 
                </Container>
            </React.Fragment>

        )
    
   
}