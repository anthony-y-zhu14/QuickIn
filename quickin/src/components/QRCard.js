import React, { useState } from 'react';
import {Fab, Typography, Container, Grid, Button, Paper, TextField, Box, AppBar, Tabs, Tab, Card, CardActions, CardContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from "qrcode.react";

export default function QRCard(value) { 

    const downloadQRCode = () => {
        const canvas = document.getElementById("canvas");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <React.Fragment>
            <Grid container justify={'center'} alignItems={'center'}>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center'}} variant={'body1'}>
                        <b>Here is your unique QR Code:</b>
                    </Typography>
                    <Typography style={{textAlign: 'center'}} variant={'body2'}>
                        You may download this code and place it where your customers can see it.
                        Simply get them to scan the QR Code and their contact information is recorded
                        and safely stored for your convenience.
                    </Typography>
                    <br />
                </Grid>
                <Grid item xs={2}>
                    <div id='qr-code'>
                        <QRCode value="google.ca" id="canvas" />
                    </div>
                </Grid>
                <Grid container spacing={2} style={{margin: 10}} justify={'center'} alignItems={'center'}> 
                    <Grid item>
                        <Button onClick={() => downloadQRCode()} variant="contained" color='primary'>Download</Button>
                    </Grid>               
                </Grid>   
            </Grid>
        </React.Fragment>
    )
}