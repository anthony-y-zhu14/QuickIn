import React, { useState } from 'react';
import {Fab, Typography, Container, Grid, Button, ButtonGroup, Paper, Zoom, TextField } from '@material-ui/core';
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

    const [login_email, setlogin_email] = React.useState(undefined);
    const [login_password, setlogin_password] = React.useState(undefined);
    const [register_email, setregister_email] = React.useState(undefined);
    const [register_password, setregister_password] = React.useState(undefined);
    const [register_re_password, setregister_re_password] = React.useState(undefined);
    const [register_businessName, setregister_businessName] = React.useState(undefined);
    const [register_addressOne, setRegister_addressOne] = React.useState(undefined);
    const [register_addressTwo, setRegister_addressTwo] = React.useState(undefined);
    const [register_postalCode, setRegister_postalCode] = React.useState(undefined);
    const [register_city, setRegister_city] = React.useState(undefined);
    const [register_province, setRegister_province] = React.useState(undefined);
    const [register_country] = React.useState('Canada');
    const [register_phoneNumber, setRegister_phoneNumber] = React.useState(undefined);

    const handleRegister = () => {
        if (register_password && register_re_password && (register_re_password === register_password)) {
            attemptRegister();
        }
        else if (register_re_password !== register_password) {
            alert("same password pls") 
        } else alert('Please fill out all form fields to continue.');
    }

    const handleLogin = () => {
        if (login_email && login_password) {
            attemptLogin()
        }
        else alert('Please fill out all form fields to continue.');
    }

    const handleNext = () => {
        if (register_email && register_businessName && register_phoneNumber && register_addressOne && register_postalCode && register_city && register_province && register_country) {
            setNext(true);
        } else { alert('Please fill out all form fields to continue.'); }
    }

    async function attemptRegister() {
        if(!register_addressTwo) {
            setRegister_addressTwo('N/A');
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: register_email, 
                password: register_password, 
                phoneNumber: register_phoneNumber,
                businessName: register_businessName,
                addressOne: register_addressOne,
                addressTwo: register_addressTwo,
                city: register_city,
                postalCode: register_postalCode,
                province: register_province
            })
        };
        const response = await fetch('/business/register', requestOptions);
        const data = await response.json();
        if (data.authentication === true) {
            action.auth(); 
        }               
    }

    async function attemptLogin() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: login_email, password: login_password })
        };
        const response = await fetch('/business/login', requestOptions);
        const data = await response.json();
        if (data.authentication === true) {
            action.auth(); 
        }               
    }     


    if(!isRegistered && !isNext) {
        return (
            
                <Container maxWidth={'md'} className={classes.main}>
                <Zoom in={true}>
                <Paper className={classes.form} elevation={3}>
                    <LottieHands />
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get your business setup.</Typography>
                    <ButtonGroup variant='contained'>
                    <Button color={isRegistered?'secondary':'primary'} onClick={() => setRegistered(false)}>Register</Button>
                            <Button color={isRegistered?'primary':'secondary'} onClick={() => setRegistered(true)}>Login</Button>
                    </ButtonGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}><TextField style={{width: 200}} variant='outlined' onChange={(e)=>setregister_businessName(e.target.value)} label='Business Name' /></Grid>
                            <Grid item xs={12} sm={6}><TextField style={{width: 200}} variant='outlined' onChange={(e)=>setregister_email(e.target.value)} label='Email' /></Grid>
                            <Grid item xs={12} sm={6}><TextField  style={{width: 200}}variant='outlined' onChange={(e)=>setRegister_phoneNumber(e.target.value)} label='Phone Number'/></Grid> 
                            <Grid container spacing={2} style={{marginTop: 20}}>
                                <Grid item xs={12} sm={6} style={{width: 200}}><TextField variant='outlined' onChange={(e)=>setRegister_addressOne(e.target.value)} label='Address Line 1' /></Grid>
                                <Grid item xs={12} sm={6} style={{width: 200}}><TextField variant='outlined' onChange={(e)=>setRegister_addressTwo(e.target.value)} label='Address Line 2' /></Grid>
                                <Grid item xs={12} sm={6} style={{width: 200}}><TextField variant='outlined' onChange={(e)=>setRegister_postalCode(e.target.value)} label='Postal Code' /></Grid>
                                <Grid item xs={12} sm={6} style={{width: 200}}><TextField variant='outlined' onChange={(e)=>setRegister_city(e.target.value)} label='City' /></Grid>
                                <Grid item xs={12} sm={6} style={{width: 200}}><TextField variant='outlined' onChange={(e)=>setRegister_province(e.target.value)} label='Province / Territory' /></Grid>
                                <Grid item xs={12}  sm={6} style={{width: 200}}><TextField disabled={'true'} variant='outlined' label='Canada' /></Grid>
                            </Grid>           
                            <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}>
                         
                                <Grid item>
                                    <Button onClick={() => handleNext()} variant="contained" color='primary'>Next</Button>
                                </Grid>               
                            </Grid>        
                            <Grid item xs={12}>
                                <Typography variant={'body2'}>Step 1/2</Typography>
                            </Grid>                   
                        </Grid>
                    </Paper>
                    </Zoom> 
                    <br />
                    <Fab variant='extended' onClick={action.goBack} color='primary'><ArrowBackIcon/>Home</Fab>                                   
                </Container>

            
    
        )
    } if(isRegistered) {
        return (
            <React.Fragment>
                <Zoom in={true}>
                <Container maxWidth={'md'} className={classes.main}>
                <Paper className={classes.form} elevation={3}>                    
                <LottieHands />
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get you logged in!</Typography>
                    <ButtonGroup variant='contained'>
                            <Button color={isRegistered?'secondary':'primary'} onClick={() => setRegistered(false)}>Register</Button>
                            <Button color={isRegistered?'primary':'secondary'} onClick={() => setRegistered(true)}>Login</Button>
                    </ButtonGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' style={{width: 200}} onChange={(e)=>setlogin_email(e.target.value)} label='Email'></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' style={{width: 200}} type='password' onChange={(e)=>setlogin_password(e.target.value)} label='Password'></TextField>
                            </Grid>  
                            <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}>
                                             
                                <Grid item>
                                    <Button variant="contained" color='primary' onClick={handleLogin}>Submit</Button>
                                </Grid>   
                            </Grid>                          
                        </Grid>
                    </Paper> 
                </Container>
                </Zoom>
            </React.Fragment>
        )
    }

    if(isNext && !isRegistered) {
        return (
            <React.Fragment>
                <Zoom in={true}>
                <Container maxWidth={'md'} className={classes.main}>
                <Paper className={classes.form} elevation={3}>
                    <Typography variant={'h3'} style={{margin: '2%'}}>Let's get your business setup.</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField variant='outlined' style={{width: 200}} type='password' onChange={(e)=>setregister_password(e.target.value)} label='Password'></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant='outlined' style={{width: 200}} type='password'  onChange={(e)=>setregister_re_password(e.target.value)} label='Confirm Password'></TextField>
                            </Grid>
                            <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}>
                                <Grid item>
                                    <Button onClick={() => setNext(false)} variant="contained" color='primary'>Back</Button>
                                </Grid>               
                                <Grid item>
                                    <Button variant="contained" color='primary' onClick={handleRegister}>Submit</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body2'}>Step 2/2</Typography>
                            </Grid>  
                        </Grid>
                    </Paper> 
                </Container>
                </Zoom>
            </React.Fragment>
        )
    }
}
 