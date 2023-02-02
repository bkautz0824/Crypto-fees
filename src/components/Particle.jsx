
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import { useCallback } from "react";

function Particle() {

    const optionsVar = {
        fullScreen: {
            zIndex: -1
        },
        background: {
            color: {
                value: "#0d47a1",
            },
            gradient:{}
        },
        // style: {
        //     position: 'absolute'
        // },
        fpsLimit: 120,
        interactivity: {
            events: {
                // onClick: {
                //     enable: true,
                //     mode: "push",
                // },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 8,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            collisions: {
                enable: false,
            },
            line_linked: {
                enable: true,
                distance: 600,
                color: "#ffffff",
                opacity: 0.4,
                width: 2
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
            },
            "number": {
                "value": 25,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 4 },
            },

        },
        
        detectRetina: true,
    }

    const particlesInit = useCallback(async main => {
        console.log(main);
    //     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    //     // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    }, []);
    
    const particlesLoaded = useCallback(async container => {
       await console.log(container);
    }, []);

return (
<Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={optionsVar}
    />
)
}

export default Particle