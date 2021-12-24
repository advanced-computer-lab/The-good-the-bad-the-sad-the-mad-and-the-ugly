import React from 'react';
import sample from '../../Img/Airplane-1.m4v'


export default function LandingPage() {

    return (
        <div>
            <div>
                <video autoPlay loop muted
                       style={{
                           position: 'absolute',
                           top: '0',
                           left: '0',
                           width: '100%',
                           'background-color': 'black',
                           opacity: '0.5',
                           'z-index': 1

                       }}
                >
                    <source
                        src={sample} type='video/mp4'/>
                </video>
            </div>
            <div style={{
                "fontFamily": 'Montserrat',
                'fontSize': '60px',
                margin: 'auto',
                marginTop: '350px',
                width: '500px',
                height: '500px',
                'text-align': 'center',
                opacity:'1'
            }}>
                AirLine System
            </div>
        </div>
    );

}