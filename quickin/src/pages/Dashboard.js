import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QRCard from '../components/QRCard.js';
import DataCard from '../components/DataCard.js';

import {Fab, Typography, Container, Grid, Button, Paper, TextField, Box, AppBar, Tabs, Tab, Card, CardActions, CardContent} from '@material-ui/core';
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

export default function Dashboard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return (
        <React.Fragment>
            <Paper className={classes.form} elevation={3}>
                <Container maxWidth={'md'}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={'h4'}>Welcome, Team Shonies</Typography>
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
                                    <QRCard />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <DataCard />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    Item Three
                                </TabPanel>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </React.Fragment>
    )
}

   