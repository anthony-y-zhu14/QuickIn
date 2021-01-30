import React from 'react';
import {Fab, Container, Grid, Zoom, ButtonGroup, Button, Paper, TextField } from '@material-ui/core';
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
    const [login_email, setlogin_email] = React.useState(undefined);
    const [login_password, setlogin_password] = React.useState(undefined);
    const [register_email, setregister_email] = React.useState(undefined);
    const [register_password, setregister_password] = React.useState(undefined);
    const [register_re_password, setregister_re_password] = React.useState(undefined);
    const [register_firstName, setregister_firstName] = React.useState(undefined);
    const [register_lastName, setregister_lastName] = React.useState(undefined);
    const [register_phoneNumber, setregister_phoneNumber] = React.useState(undefined);

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
        if (login_email && login_password) {
            attemptLogin()
        }
        else alert("please fill all required field")
    }

    async function attemptLogin() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: login_email, password: login_password })
        };
        const response = await fetch('/visitor/login', requestOptions);
        const data = await response.json();
        if (data.authentication === true) {
            action.auth(); 
        }               
    }     


    const handleRegister = () => {
        if (register_email && register_firstName && register_lastName && register_password && register_phoneNumber && register_re_password && (register_re_password === register_password)) {
            attemptRegister();
        }
        else if (register_re_password !== register_password) {
            alert("same password pls") 
        }
        else alert("please fill all required field") 
    }

    async function attemptRegister() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: register_email, password: register_password, firstName: register_firstName, lastName: register_lastName, phoneNumber: register_phoneNumber })
        };
        const response = await fetch('/visitor/register', requestOptions);
        const data = await response.json();
        if (data.authentication === true) {
            action.auth(); 
        }               
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
                                <TextField variant='outlined' label='Email' value={login_email} onChange={(e)=>setlogin_email(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' label='Password' type='password' value={login_password} onChange={(e)=>setlogin_password(e.target.value)}></TextField>
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
                                <TextField variant='outlined' label='First Name' value={register_firstName} onChange={(e)=>setregister_firstName(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Last Name' value={register_lastName} onChange={(e)=>setregister_lastName(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Phone Number' value={register_phoneNumber} onChange={(e)=>setregister_phoneNumber(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Email' value={register_email} onChange={(e)=>setregister_email(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={6}></Grid>

                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Password' type='password' value={register_password} onChange={(e)=>setregister_password(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant='outlined' label='Re-enter Password' type='password' value={register_re_password} onChange={(e)=>setregister_re_password(e.target.value)}></TextField>
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