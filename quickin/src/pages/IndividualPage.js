import React from 'react';
import {Fab, Typography, Container, Grid, Zoom, ButtonGroup, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IndividualForm from '../components/IndividualForm.js';

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
    const classes = useStyles();

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