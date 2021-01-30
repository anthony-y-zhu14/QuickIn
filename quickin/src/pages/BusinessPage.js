import React, { useState } from 'react';
import {Fab, Typography, Container, Grid, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessForm from '../components/BusinessForm.js'
import Dashboard from '../pages/Dashboard.js'

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
        padding: '1em',
    
    },
  });

export default function BusinessPage(action) {
    const classes = useStyles();
    const [isTest, setIsTest] = useState(false);

    if(!isTest) {
        return (
            <React.Fragment>
                <Button onClick={() => setIsTest(true)}>Test Page</Button>
                <BusinessForm goBack={action.goBack}/>
            </React.Fragment>
        )
    }
    if(isTest) {
        return (
            <React.Fragment>
                <Button onClick={() => setIsTest(false)}>Go Back</Button>
                <Dashboard/>
            </React.Fragment>
        )
    }
}

   