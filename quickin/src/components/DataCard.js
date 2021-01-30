import React, { useState } from 'react';
import {Fab, Typography, Container, Grid, Button, Paper, TextField, Box, AppBar, Tabs, Tab, Card, CardActions, CardContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function DataCard() { 
    const [count, setCount] = React.useState(0);

    return (
        <React.Fragment>
            <Grid container justify={'center'} alignItems={'center'}>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} variant={'body1'}>
                        Access your contact tracing data below.
                    </Typography>
                    <br />
                    <Grid container justify={'center'} alignItems={'center'}>
                        <Grid item xs={6} >
                            <Paper elevation={3}>
                                <Typography variant={'body2'} style={{textAlign: 'center'}}>Total check-ins logged today:</Typography> 
                                <Typography variant={'h1'} style={{textAlign: 'center'}}>{count}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </React.Fragment>
    )
}