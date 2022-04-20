import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

import vertex from '../../shaders/background/vertex';
import fragment from '../../shaders/background/fragment';

import matcap from '../../static/matcap.png';


const Blob = () => {
    const mesh = useRef(null);

    const materialUniforms = useMemo(() => ({
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        matcap: { value: new THREE.TextureLoader().load(matcap) },
    }), []);
    
    useFrame((state) => {
        materialUniforms.time.value = state.clock.elapsedTime;
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]}>
            <planeGeometry 
                args={[1, 1, 1, 1]}
                attach="geometry" 
            />
            <shaderMaterial
                attach="material"
                uniforms={materialUniforms}
                extensions={{derivatives: "#extension GL_OES_standard_derivatives: enable"}}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </mesh>
    );
};

const Background = () => {
    return (
        <Canvas style={{position: "fixed"}}>
            <OrthographicCamera 
                makeDefault
                position={[0, 0, 2]}
                left={-1/2}
                right={1/2}
                top={1/2}
                bottom={-1/2}
                near={-1000}
                far={1000}
            />
            <Blob />
        </Canvas>
    );
};

export default Background;