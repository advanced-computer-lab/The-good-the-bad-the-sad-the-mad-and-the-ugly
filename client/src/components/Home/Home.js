import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import MenuAppBar from "../AppBar/appBar";
import backgroundVideo from "../../Video/background.mp4";
import "../../styles.css"
import {createTheme} from "@mui/material/styles";
import {MuiThemeProvider} from "@material-ui/core";

function Index() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

  return (
    <React.Fragment>
        <MenuAppBar />
        <MuiThemeProvider theme={darkTheme}>
        <section className="video_container">
            <video autoPlay loop muted>
                <source src={backgroundVideo} type="video/mp4"></source>
            </video>
            <div className="overlay">
                <ProductHero />
            </div>
        </section>
            <ProductHowItWorks />
      <ProductValues />


      <AppFooter />
        </MuiThemeProvider>
    </React.Fragment>
  );
}

export default withRoot(Index);
