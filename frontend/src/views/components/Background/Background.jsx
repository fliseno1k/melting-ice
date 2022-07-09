import React from 'react';
import { Canvas } from '@react-three/fiber';
import Models from './Model';

const Background = React.memo(() => {
    return (
        <Canvas style={{position: "fixed", left: 0, top: 0, zIndex: 0 }}>
            <Models />
        </Canvas>
    );
}, []);

export default Background;