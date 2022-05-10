import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Center } from '@react-three/drei';
import { fragmentShader as objectFragmentShader } from './glsl/object.fs';
import { vertexShader as objectVertexShader } from './glsl/object.vs';

import matcap from '../../../static/matcap.jpg';

const Sphere = () => {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.material.uniforms.time.value += 1;
        meshRef.current.material.uniforms.distort.value = 0.8 + Math.sin(state.clock.elapsedTime / 1000);
        meshRef.current.material.uniforms.radius.value = 1.0 + Math.sin(state.clock.elapsedTime / 100);
    });

    return (
        <Center>
            <mesh ref={meshRef}>
                <octahedronGeometry args={[100, 20]} />
                <shaderMaterial 
                    lights={true}
                    uniforms={ 
                        THREE.UniformsUtils.merge([
                            THREE.UniformsLib["lights"],
                            {
                                time: { type: 'f', value: 0 },
                                radius: { type: 'f', value: 1.0 },
                                distort: { type: 'f', value: 0.8 },
                                matcap: { value: new THREE.TextureLoader().load(matcap) },
                            }
                        ])
                    }
                    vertexShader={objectVertexShader}
                    fragmentShader={objectFragmentShader}
                />
            </mesh>
        </Center>
    );
};

const ModelsGroup = () => (
    <group>
        <PerspectiveCamera
            fov={45}
            near={1}
            far={10000}
            position={[40, -40, 400]}
            zoom={1}
            lookAt={[0, 0, 0]}
            makeDefault
        />
        <hemisphereLight 
            position={[0, 0, 0]}
            skyColor={0xf11faf}
            groundColor={0x666666}
            intensity={0.8}
        />
        <Sphere />
    </group>
);

export default ModelsGroup;