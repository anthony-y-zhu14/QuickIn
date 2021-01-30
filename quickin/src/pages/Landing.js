import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IndividualPage from './IndividualPage.js';
import BusinessPage from './BusinessPage.js';
import LandingCard from '../components/LandingCard.js';
import { makeStyles } from '@material-ui/core/styles';
import LottieStoreFront from '../components/Lottie.js';
import LottieIndividual from '../components/Lottie2.js';


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
  });

export default function LandingPage() {
    const classes = useStyles();
    const [isIndividual, setIndividual] = useState(false);
    const [isBusiness, setBusiness] = useState(false);

    const reset = () => {
        setIndividual(false);
        setBusiness(false);
    }

    if (!isIndividual && !isBusiness) {    
        return (
            <React.Fragment>
                <Container maxWidth={'md'} className={classes.main}>
                    <Typography variant={'h2'} style={{textAlign: 'center', padding: 40}}>Welcome to quickin.</Typography>
                    <Container>
                        <Typography variant={'body1'} style={{margin: 20}}>A simple check-in process that provides businesses with a
                        fast, secure, and safe experience for collecting contact tracing information from customers.
                        </Typography>
                    </Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <LandingCard title='Business' image={<LottieStoreFront/>} handleClick={() => setBusiness(true)} 
                            content='Automate contract tracing information gathering in your storefront!' />
                        </Grid>
                        <Grid item xs={6}>
                            <LandingCard title='Individual' image={<LottieIndividual/>} handleClick={() => setIndividual(true)} 
                            content="Sign in here if you're checking in to a storefront. Let's keep you safe." />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>

        )
    }
    if (isIndividual) {
        return (
            <Container maxWidth={'md'}>
                <IndividualPage goBack={reset}/>
            </Container> 
        )
    }

    if (isBusiness) {
        return (
            <Container maxWidth={'md'}>
                <BusinessPage />
            </Container> 
        )
    }
   
}
