// eslint-disable-next-line import/no-anonymous-default-export
export default `
varying vec2 vUv;

void main() {
    vUv = uv; 

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 20. * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;