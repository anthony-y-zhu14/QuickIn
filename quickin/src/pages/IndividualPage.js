import React, { useEffect } from 'react';
import {Typography, Container, Grid, Zoom, Button, Paper, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IndividualForm from '../components/IndividualForm.js';
import QrReader from 'react-qr-reader'

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    main: {
        margin: '100px auto',
    },
    content: {
        textAlign: 'center',
        padding: '1em',
        color: 'black'
    },
    cameraWindow: {
        margin: '5% auto',
        border: "5px solid black"
    }
  });

export default function IndividualPage(action) {
    const [authenicated, setAuth] = React.useState(false);
    const [visitor, setVisitor] = React.useState(undefined);
    const [scanResult, setResult] = React.useState(undefined);
    const classes = useStyles();
      
    useEffect(() => {
        if (!authenicated) {
            checkAuth();
        }
        if (!visitor) {
            fetchVisitorData().then((res)=>setVisitor(res));
        }
    })

    const checkIn = async() => {

    }

    const fetchVisitorData = async() => {
        if (authenicated) {
            const response = await fetch('/visitor');
            const data = response.json();
            return data;
        }
        
    }

    const checkAuth = async () => {
        const response = await fetch('/visitor/checkSession');
        const data = await response.json();
        if (data) {
            setAuth(true); 
        }  
    }

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = (err) => {
        console.log(err);
    }

    const logout = async () => {
        fetch('/visitor/logout');
        setAuth(false);
    }
    
    if (!authenicated) {
        return (
            <React.Fragment>
                <IndividualForm goBack={action.goBack} auth={checkAuth}/>
            </React.Fragment>
        );
    }  

    if (!visitor) {
        return (
            <React.Fragment>
                <LinearProgress/>
            </React.Fragment>
        );
    } 

    if (authenicated && visitor) {
        return (
            <React.Fragment>
                <Zoom in={true}>
                    <Container className={classes.main}>
                        <Paper elevation={3} className={classes.content}>
                            <Typography variant='h5'>Welcome {visitor.firstName} {visitor.lastName}</Typography>
                            <Grid container spacing={2}>  
                                <Grid item xs={12}>
                                    <Container className={classes.cameraWindow}>
                                        <h1>Point the camera to the QR code</h1>
                                        <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }}/>
                                        <p>{scanResult}</p>
                                    </Container>
                                </Grid>   
                                <Grid item xs={12}>
                                    <Button variant='contained' color='primary' onClick={logout}>Log Out</Button>
                                </Grid>                
                            </Grid>
                        </Paper>              
                    </Container>
                </Zoom>
            </React.Fragment>
        );
    }          
  }