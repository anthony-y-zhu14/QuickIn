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
    const [business, setBusiness] = React.useState(false);
    const [businessData, setBusinessData] = React.useState(undefined);


    useEffect(() => {
        if (!authenticated) {
            checkAuth();
        }
        if(!business) {
            fetchBusiness().then((res)=>setBusiness(res));
        }
        if(!businessData) {
            fetchBusinessData().then((res)=>setBusinessData(res));
        }
    })

    const fetchBusiness = async() => {
        if (authenticated) {
            const response = await fetch('/business');
            const data = response.json();
            console.log(data);
            return data;
        }  
    }

    const fetchBusinessData = async() => {
        if (authenticated) {
            const response = await fetch(`/businessData?search=${business.businessId}`);
            const data = response.json();
            console.log(data);
            return data;
        }  
    }

    const checkAuth = async () => {
        const response = await fetch('/business/checkSession');
        const data = await response.json()
        if (data) {
            setAuth(true); 
        }  
    }

    const logout = async () => {
        fetch('/business/logout');
        setAuth(false);
    }

    if(!authenticated) {
        return (
            <React.Fragment>
                <BusinessForm goBack={action.goBack} auth={checkAuth}/>
            </React.Fragment>
        )
    }
    if(authenticated && (!business || !businessData)) {
        return (
            <h1>Loading...</h1>

        )
    }
    if(authenticated && business && businessData) {
        return (
            <React.Fragment>
                <Dashboard isAuthenticated={authenticated} busi={business} visitsData={businessData} logout={logout}/>
            </React.Fragment>
        )
    } 
}

   