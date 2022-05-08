import React from 'react';
import cn from 'classnames';

import { OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import { Canvas } from '@react-three/fiber';
import Model from './Model';

import s from './Scene.module.scss';


const Scene = ({ modelUrl }) => {
    return (
        <ErrorBoundary FallbackComponent={() => (
            <div className={cn(s.canvas, s.canvas_error)}>
                <p>Возникла ошибка при загрузке модели</p>
            </div>
        )}>
            <Canvas 
                style={{ position: "fixed", left: 0, top: 0, zIndex: 1 }}
            >
                <pointLight position={[1, 1, 1]} />
                <OrbitControls />
                <Model url={modelUrl} />
            </Canvas>
        </ErrorBoundary>
    );
};

export default Scene;