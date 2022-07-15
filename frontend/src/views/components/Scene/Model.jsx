import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from '@react-three/fiber';

import { Bounds } from '@react-three/drei';


const Model = ({ url }) => {
    const groupRef = useRef(null);
    // const gltf = useLoader(GLTFLoader, `http://localhost:5000/${url}/scene.gltf`);
    const gltf = useLoader(GLTFLoader, `https://melting-ice.xyz/${url}/scene.gltf`);
    const [mixer] = useState(() => new THREE.AnimationMixer());

    useEffect(() => {
        if (gltf?.animations?.length) {
            void mixer.clipAction(gltf.animations[0], groupRef.current).play();
        }
    });

    useFrame((state, delta) => {
        mixer.update(delta * 0.2);
    });

    useEffect(() => {
        if (gltf?.animations?.length) {
            const mixer = new THREE.AnimationMixer(gltf.scene);
            gltf.scene.animations.forEach(animation => {
                mixer.clipAction(animation).play();
            });
        }
    }, [gltf]);

    return (
        <Suspense fallback={null}>
            <Bounds fit clip observe damping={6} margin={1.2}>
                <group ref={groupRef}>
                    <primitive object={gltf.scene} />
                </group>
            </Bounds>
            {/* <Center>
                <group ref={groupRef}>
                    <primitive object={gltf.scene} />
                </group>
            </Center> */}
        </Suspense>
    );
};

export default Model;