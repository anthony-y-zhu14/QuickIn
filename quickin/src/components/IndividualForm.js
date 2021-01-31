import React, { useEffect }  from 'react';
import {Fab, Container, Grid, Zoom, ButtonGroup, Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LottieHands from '../components/Lottie3.js';



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
    }, 
    buttonGroup: {
        margine: '0% auto'
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

    const [login_error, setLoginError] = React.useState(false);

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
            setLoginError(false);
        }
        else {
            setLoginError(true);
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
        else {
            alert()
        }           
    }
    
    return (
        <Zoom in={true}>
            <Container axWidth={'md'} className={classes.main}>                    
                {login && (
                    <Zoom in={true}>
                    <Paper className={classes.form} elevation={3}>
                        <LottieHands />
                        <Typography variant={'h3'} style={{margin: '2%'}}>Let's get you checked-in.</Typography>
                        <ButtonGroup variant='contained'>                            
                            <Button  color={login?'primary':'secondary'} onClick={() => renderLogin()}>I have an account</Button>
                            <Button color={register?'primary':'secondary'} onClick={() => renderRegister()}>I want to register</Button>
                        </ButtonGroup>
                
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' style={{width: 200}} label='Email' error={login_error} helperText={login_error?'Email may not exist':''} value={login_email} onChange={(e)=>setlogin_email(e.target.value)}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' style={{width: 200}} label='Password' error={login_error} helperText={login_error?'Password maybe incorrect':''} type='password' value={login_password} onChange={(e)=>setlogin_password(e.target.value)}></TextField>
                            </Grid>                        
                            <Grid item xs={12}>
                                <Button variant='contained' color='primary' disabled={(!login_email || !login_password)} onClick={handleLogin}>Submit</Button>
                            </Grid>                           
                        </Grid>
                    </Paper> 
                    </Zoom> 
                )}
                {register && (
                        <Zoom in={true}>
                        <Paper className={classes.form} elevation={3} style={{textAlign: 'center', alignItems: 'center'}}>
                        <LottieHands />
                            <Typography variant={'h3'} style={{width: '80%', margin: '5% auto'}}>Let's setup you up for future check-ins.</Typography>
                            <ButtonGroup variant='contained'>                            
                                <Button  color={login?'primary':'secondary'} onClick={() => renderLogin()}>I have an account</Button>
                                <Button color={register?'primary':'secondary'} onClick={() => renderRegister()}>I want to register</Button>
                            </ButtonGroup>               
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField variant='outlined' style={{width: 200}} label='Email' value={register_email} onChange={(e)=>setregister_email(e.target.value)}></TextField>
                                </Grid>                                
                                <Grid item xs={12} sm={6}>
                                    <TextField variant='outlined' style={{width: 200}} label='Phone Number' value={register_phoneNumber} onChange={(e)=>setregister_phoneNumber(e.target.value)}></TextField>
                                </Grid>  
                                <Grid item xs={12} sm={6}>
                                    <TextField variant='outlined' style={{width: 200}} label='First Name' value={register_firstName} onChange={(e)=>setregister_firstName(e.target.value)}></TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField variant='outlined' style={{width: 200}} label='Last Name' value={register_lastName} onChange={(e)=>setregister_lastName(e.target.value)}></TextField>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField variant='outlined' style={{width: 200}} label='Password' type='password' value={register_password} onChange={(e)=>setregister_password(e.target.value)}></TextField>
                                </Grid>

                                {register_password && (
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant='outlined' style={{width: 200}} label='Verify Password' type='password' value={register_re_password} onChange={(e)=>setregister_re_password(e.target.value)}></TextField>
                                    </Grid> 
                                )}
                                {!register_password && (
                                    <Grid item xs={12} sm={6}></Grid> 
                                )}   
                                                                               
                                <Grid item xs={12}>
                                    <Button variant='contained' color='primary' onClick={handleRegister}>Submit</Button>
                                </Grid>                           
                            </Grid>
                    </Paper>   
                    </Zoom> 
                )}   
                <br/>
                <Fab variant='extended' color='primary' onClick={action.goBack}><ArrowBackIcon/>Home</Fab>                                   
            </Container> 
        </Zoom>
    ); 
          
  }