import React from 'react';
import {Typography, Container, Grid, Zoom, Button, Paper } from '@material-ui/core';
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
    const [scanResult, setResult] = React.useState(undefined);
    const classes = useStyles();

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = (err) => {
        console.log(err);
    }

    const logout = () => {
        setAuth(false);
        action.goBack()
    }
    
    if (!authenicated) {
        return (
            <React.Fragment>
                <Button onClick={()=>setAuth(true)}>Test page</Button>
                <IndividualForm goBack={action.goBack} />
            </React.Fragment>
        );
    }  

    if (authenicated) {
        return (
            <React.Fragment>
                 {/* remove it later */}
                <Button onClick={()=>setAuth(false)}>Test form</Button>
                <Zoom in={true}>
                    <Container className={classes.main}>
                        <Paper elevation={3} className={classes.content}>
                            <Typography variant='h5'>Welcome 'insert Username'</Typography>
                            <Typography variant='p'>Today is 'insert date'</Typography>   
                            <Grid container spacing={2}>  
                                <Grid item xs={12}>
                                    <Container className={classes.cameraWindow}>
                                        <h1>This is where the camera window will be</h1>
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