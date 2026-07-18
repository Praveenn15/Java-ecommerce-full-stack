import React, { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadFull} from "tsparticles";

const ParticlesBg = () => {
  const particlesInit = useCallback( async (engine) => {
    await loadFull(engine);
  },[]);
    
    return (
            <Particles id="tsparticles"
            init={particlesInit}
             options ={{
                background: {
                    color: { value: '#0c0e1a'}
                },
                particles : {
                    number: { value: 60, density : {enable:true, value_area:800}},
                    color: {value: '#ffffff'},
                    shape: {type: 'circle'},
                    opacity: { value: 0.3, random: true},
                    size: {value: 3,random: true},
                    links: {
                        enable:true,
                        distance:150,
                        color:'#9333ea' ,
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable:true,
                        speed:1.5,
                        direction:'none',
                        random:false,
                        straight:false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on :'canvas',
                    events: {
                        onhover: {enable: true,mode: 'grab'}, //add lines when hover mouse
                        onclick: {enable:true, mode: 'push'}, //forming new particles when clicked..
                        resize: true
                    }
                }, retina_detect: true
             }} />
            );
};

export default ParticlesBg;