import React, { useState, useEffect } from 'react';
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
    const [authenticated, setAuth] = React.useState(false);

    React.useEffect = (()=>{
        if (!authenticated) {
            checkAuth();
        }
    })

    const checkAuth = async () => {
        const response = await fetch('/visitor/checkSession');
        const data = await response.json();
        if (data) {
            setAuth(true); 
        }  
    }

    if(!authenticated) {
        return (
            <React.Fragment>
                <BusinessForm goBack={action.goBack}/>
            </React.Fragment>
        )
    }
    if(authenticated) {
        return (
            <React.Fragment>
                <Dashboard/>
            </React.Fragment>
        )
    }
}

   