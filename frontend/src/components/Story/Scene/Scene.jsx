import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import './Scene.css';


const Scene = () => {
    return (
        <Canvas 
            style={{ position: "fixed", zIndex: 1 }}
        >
            <OrbitControls />
            <Model />
        </Canvas>
    );
};

export default Scene;