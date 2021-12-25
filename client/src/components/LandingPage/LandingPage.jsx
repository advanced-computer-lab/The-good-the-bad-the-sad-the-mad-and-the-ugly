import React from 'react';
// import sample from '../../Img/Airplane-1.m4v'
import background from "../../Img/Flight3.jpeg";


export default function LandingPage() {
    const style = { backgroundImage: `url('${background}')` };
    return (
        <div>
            <div>
                {/*<video autoPlay loop muted*/}
                {/*       style={{*/}
                {/*           position: 'absolute',*/}
                {/*           top: '0',*/}
                {/*           left: '0',*/}
                {/*           width: '100%',*/}
                {/*           'background-color': 'black',*/}
                {/*           opacity: '0.5',*/}
                {/*           'z-index': 1*/}

                {/*       }}*/}
                {/*>*/}
                {/*    <source*/}
                {/*        src={sample} type='video/mp4'/>*/}
                {/*</video>*/}
                <div  style={{
                    backgroundImage: `url(${require('../../Img/Flight3.jpeg')})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                </div>
            </div>
            <div style={{
                "fontFamily": 'Montserrat',
                'fontSize': '60px',
                margin: 'auto',
                marginTop: '350px',
                width: '500px',
                height: '500px',
                'textAlign': 'center',
                opacity:'1.0'
            }}
                 className="text-white d-flex h-100 text-center align-items-center"
            >
                AirLine System
            </div>
        </div>
    );

}