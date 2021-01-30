import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IndividualPage from './IndividualPage.js';
import LandingCard from '../components/LandingCard.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

export default function LandingPage() {
    const classes = useStyles();
    const [isIndividual, setIndividual] = useState(false);
    const [isBusiness, setBusiness] = useState(false);
 

    if (!isIndividual && !isBusiness) {    
        return (
            <Container maxWidth={'md'}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <LandingCard title='Business' handleClick={() => setBusiness(true)} 
                        content='Automate contract tracing information gathering in your storefront!' />
                    </Grid>
                    <Grid item xs={6}>
                        <LandingCard title='Individual' handleClick={() => setIndividual(true)} 
                        content="Sign in here if you're checking in to a storefront." />
                    </Grid>
                </Grid>
            </Container>
        )
    }
    if (isIndividual) {
        return (
            <Container maxWidth={'md'}>
                <IndividualPage />
            </Container> 
        )
    }

    if (isBusiness) {
        return (
            <Container maxWidth={'md'}>
                <h1>Bizness</h1>
            </Container> 
        )
    }
   
}
