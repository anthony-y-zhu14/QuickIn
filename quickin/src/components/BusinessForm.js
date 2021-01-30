import React, { useState } from 'react';
import {Fab, Typography, Container, Grid, Button, Paper, Zoom, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

export default function BusinessForm(action) {
    const classes = useStyles();
    const [isRegistered, setRegistered] = useState(false);
    const [isNext, setNext] = useState(false);


    if(!isRegistered && !isNext) {
        return (
            <Zoom in={true}>
                <Container maxWidth={'md'} className={classes.main}>
                <Paper className={classes.form} elevation={3}>
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get your business setup.</Typography>
                    <Typography variant={'body1'} style={{margin: '2%'}}>Already have an account?   
                     <span onClick={() => setRegistered(true)} style={{color: 'blue', textDecoration: 'underline', paddingLeft: 3}}>Login.</span>
                    </Typography>
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
                            <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}>
                         
                                <Grid item>
                                    <Button onClick={() => setNext(true)} variant="contained" color='primary'>Next</Button>
                                </Grid>               
                            </Grid>        
                            <Grid item xs={12}>
                                <Typography variant={'body2'}>Step 1/2</Typography>
                            </Grid>                   
                        </Grid>
                    </Paper> 
                    <br />
                    <Fab variant='extended' onClick={action.goBack} color='primary'><ArrowBackIcon/>Back</Fab>                                   
                </Container>

            </Zoom>
    
        )
    } if(isRegistered) {
        return (
            <React.Fragment>
                <Container maxWidth={'md'} className={classes.main}>
                <Paper className={classes.form} elevation={3}>
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get you logged in!</Typography>
                    <Typography variant={'body1'} style={{margin: '2%'}}>Don't have an account?   
                     <span onClick={() => setRegistered(false)} style={{color: 'blue', textDecoration: 'underline', paddingLeft: 3}}>Register.</span>
                    </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' label='Email'></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' type='password' label='Password'></TextField>
                            </Grid>  
                            <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}>
                                <Grid item>
                                    <Button onClick={() => setNext(false), () => setRegistered(false)} variant="contained" color='primary'>Back</Button>
                                </Grid>               
                                <Grid item>
                                    <Button variant="contained" color='primary'>Login</Button>
                                </Grid>   
                            </Grid>                          
                        </Grid>
                    </Paper> 
                </Container>
            </React.Fragment>
        )
    }

    if(isNext && !isRegistered) {
        return (
            <React.Fragment>
                <Container maxWidth={'md'} className={classes.main}>
                <Paper className={classes.form} elevation={3}>
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get your business setup.</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' type='password' label='Password'></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' type='password'  label='Confirm Password'></TextField>
                            </Grid>
                            <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}>
                                <Grid item>
                                    <Button onClick={() => setNext(false)} variant="contained" color='primary'>Back</Button>
                                </Grid>               
                                <Grid item>
                                    <Button variant="contained" color='primary'>Login</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body2'}>Step 2/2</Typography>
                            </Grid>  
                        </Grid>
                    </Paper> 
                </Container>
            </React.Fragment>
        )
    }
}
 