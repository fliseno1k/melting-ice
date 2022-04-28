import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from '@react-three/fiber';
import { Center } from '@react-three/drei';

const Model = () => {
    const groupRef = useRef(null);
    const gltf = useLoader(GLTFLoader, './models/scene.gltf');
    const [mixer] = useState(() => new THREE.AnimationMixer());

    useEffect(() => {
        void mixer.clipAction(gltf.animations[0], groupRef.current).play();
    }, []);

    useFrame((state, delta) => {
        mixer.update(delta * 0.2);
    });

    useEffect(() => {
        if (gltf.animations) {
            const mixer = new THREE.AnimationMixer(gltf.scene);
            gltf.scene.animations.forEach(animation => {
                mixer.clipAction(animation).play();
            });
        }
    }, [gltf]);

    return (
        <Suspense fallback={null}>
            <Center>
                <group ref={groupRef} scale={2}>
                    <primitive object={gltf.scene} />
                </group>
            </Center>
        </Suspense>
    );
};

export default Model;