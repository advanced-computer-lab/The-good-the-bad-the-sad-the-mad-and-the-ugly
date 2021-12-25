import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import {animateScroll as scroll} from "react-scroll";

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

const style = {
  fontFamily: "Montserrat"
}

const scrollDown = () => {
  scroll.scrollTo(1300);
}


function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }} style={style}>
          How To Book
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number} color="primary">1.</Box>
                <Typography variant="h5" align="center" style={style}>
                  Click on "Book Now" button below.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number} color="primary">2.</Box>
                <Typography variant="h5" align="center" style={style}>
                  Search for the flights you need.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number} color="primary">3.</Box>

                <Typography variant="h5" align="center" style={style}>
                  Complete your reservation.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="primary"
          size="large"
          variant="contained"
          sx={{ mt: 8 }}
          onClick={scrollDown}
          style={style}
        >
          Book Now
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
