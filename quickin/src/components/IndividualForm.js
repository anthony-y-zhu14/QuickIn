import React from 'react';
import {Fab, Typography, Container, Grid, Zoom, ButtonGroup, Button, Paper, TextField, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    main: {
        margin: '100px auto',
    },
    form: {
        textAlign: 'center',
        padding: '1em',
    }
  });

export default function IndividualForm(action) {
    const [login, setLogin] = React.useState(true);
    const [register, setRegister] = React.useState(false);

    const classes = useStyles();

    const renderLogin = () => {
        setLogin(true);
        setRegister(false);
    }

    const renderRegister = () => {
        setRegister(true);
        setLogin(false);
    }

    const handleLogin = () => {
        alert("login");
    }

    const handleRegister = () => {
        alert("register");
    }
    
    return (
        <Zoom in={true}>
            <Container axWidth={'md'} className={classes.main}>                    
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={renderLogin}>I have an account</Button>
                    <Button onClick={renderRegister}>I want to Register</Button>
                </ButtonGroup> 
                {login && (
                    <Paper className={classes.form} elevation={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' label='Email'></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' label='Password' type='password'></TextField>
                            </Grid>                        
                            <Grid item xs={12}>
                                <Button variant='contained' color='primary' onClick={handleLogin}>Submit</Button>
                            </Grid>                           
                        </Grid>
                    </Paper> 
                )}
                {register && (
                        <Paper className={classes.form} elevation={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='First Name'></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Last Name'></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Phone Number'></TextField>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Email'></TextField>
                            </Grid>
                            <Grid item xs={6}></Grid>

                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Password' type='password'></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Re-enter Password' type='password'></TextField>
                            </Grid>                          
                            <Grid item xs={12}>
                                <Button variant='contained' color='primary' onClick={handleRegister}>Submit</Button>
                            </Grid>                           
                        </Grid>
                    </Paper>    
                )}   
                <br/>
                <Fab variant='extended' color='primary' onClick={action.goBack}><ArrowBackIcon/>Back</Fab>                                   
            </Container> 
        </Zoom>
    ); 
          
  }