import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QRCard from '../components/QRCard.js';
import DataCard from '../components/DataCard.js';
import {Fab, Typography, Container, Grid, Button, Paper, TextField, Box, AppBar, Tabs, Tab} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
    {value === index && (
        <Box p={3}>
        <Typography>{children}</Typography>
        </Box>
    )}
    </div>
);
}

TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

const useStyles = makeStyles((theme) => ({
root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
},
}));

export default function Dashboard(data) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const [isEdit, setEdit] = React.useState('true');
    const [register_email, setregister_email] = React.useState(undefined);
    const [register_businessName, setregister_businessName] = React.useState(undefined);
    const [register_addressOne, setRegister_addressOne] = React.useState(undefined);
    const [register_addressTwo, setRegister_addressTwo] = React.useState(undefined);
    const [register_postalCode, setRegister_postalCode] = React.useState(undefined);
    const [register_city, setRegister_city] = React.useState(undefined);
    const [register_province, setRegister_province] = React.useState(undefined);
    const [register_phoneNumber, setRegister_phoneNumber] = React.useState(undefined);

    let businessData = {
        name: data.busi.businessName,
        id: data.busi.businessId
    }



    
    const settings = () => {
        return (
            <React.Fragment>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Typography style={{textAlign: 'center'}} variant={'body1'}>
                            <b>Account Settings</b>
                        </Typography>
                        <Grid container spacing={2} justify={'center'} alignItems={'center'}>
                                <Grid item>
                                    <Button onClick={() => setEdit(!isEdit)} variant="contained" color='primary'>Edit</Button>
                                </Grid>               
                                <Grid item>
                                    <Button onClick={() => setEdit('true')}  disabled={isEdit} variant="contained" color='primary'>Save</Button>
                                </Grid>   
                            </Grid>    
                        <Grid item xs ={2}>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' onChange={(e)=>setregister_businessName(e.target.value)} value={data.busi.businessName} label='Business Name' /></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.email} label='Email'/></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.phoneNumber} label='Phone Number' /></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.addressOne} label='Address Line 1' /></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.addressTwo} label='Address Line 2' /></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.postalCode} label='Postal Code' /></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.city} label='City' /></Grid>
                            <Grid item xs={12}><TextField disabled={isEdit} variant='outlined' value={data.busi.province} label='Province / Territory' /></Grid>
                        </Grid>
                        <br />
                    </Grid>   
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <br />
            <br />
            <Paper className={classes.form} elevation={3} >
                <Container maxWidth={'md'}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={'h4'}>Welcome, {data.busi.businessName}</Typography>
                        </Grid>        
                        <Grid item xs={12}>
                            <div className={classes.root}>
                                <AppBar position="static">
                                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Generate QR Code" {...a11yProps(0)} />
                                    <Tab label="Check-In Data" {...a11yProps(1)} />
                                    <Tab label="Settings" {...a11yProps(2)} />    
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={value} index={0}>
                                    <QRCard value={JSON.stringify(businessData)}/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <DataCard visitD={data.visitsData}/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    {settings()}
                                </TabPanel>
                            </div>
                        </Grid>
                    </Grid>
                    
                </Container>
            </Paper>
            <br />
            <br />
            <Fab variant='extended' color='primary' onClick={()=>data.logout()}>Logout</Fab>
        </React.Fragment>
    )
}

   