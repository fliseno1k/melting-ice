import { cnoise3, hsv2rgb } from "./utils";

export const vertexShader = `

uniform float time;
uniform float radius;
uniform float distort;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;

${cnoise3}

${hsv2rgb}

void main() {
    vUv = uv;
    float updateTime = time / 1000.0;
    float noise = cnoise3(vec3(position / 150.1 + updateTime * 10.0));
    vec4 mvPosition = modelViewMatrix * vec4(position * (noise * pow(distort, 2.0) + radius), 1.0);

    vColor = hsv2rgb(vec3(noise * distort * 0.3 + updateTime, 0.2, 1.0));
    vNormal = normal;

    gl_Position = projectionMatrix * mvPosition;
}
`;