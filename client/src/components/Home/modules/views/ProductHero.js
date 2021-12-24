import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


export default function ProductHero() {

  const style = {
      fontFamily: "Montserrat"
  }

  const scrollDown = () => {
      scroll.scrollTo(700);
  }

  return (
    <ProductHeroLayout>

      <Typography sx={{mt: 30}} color="primary" align="center" variant="h2" marked="center" style={style}>
        Welcome to Shetewy Airways
      </Typography>
      <Typography color="primary" sx={{mt: 2}} style={style}>
        Enjoy secret offers up to -70% off the best journeys to all beautiful cities.
      </Typography>
        <Button
        color="primary"
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
        onClick={scrollDown}
        style={style}
      >
        Get Started
      </Button>
      <Typography variant="body2" color="primary" sx={{ mt: 2 }} style={style}>
        Discover the world!
      </Typography>
    </ProductHeroLayout>
  );
}
