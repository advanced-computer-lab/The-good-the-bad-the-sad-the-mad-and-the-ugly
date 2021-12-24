import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import {animateScroll as scroll} from "react-scroll";

function Copyright() {



  return (
    <React.Fragment>
      <div style={{
        color: 'white'
      }}>
      {'© '}

      <Link style={{
        color: 'white'
      }} href="https://mui.com/">
        Contributers
      </Link>{' '}
      {new Date().getFullYear()}
      </div>
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter() {

  const style = {
    fontFamily: "Montserrat"
  }

  const scrollDown = () => {
    scroll.scrollTo(700);
  }

  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'primary.main' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={5}>
          </Grid>
          <Grid item xs={6}>
            <Copyright />
          </Grid>
          <Grid item xs={1}>
          </Grid>


        </Grid>
      </Container>
    </Typography>
  );
}
