import { cnoise3, hsv2rgb } from "./utils";

export const fragmentShader =  `

uniform sampler2D matcap;

varying vec3 vColor;
varying vec3 vNormal;

${cnoise3}

${hsv2rgb}

struct HemisphereLight {
    vec3 direction;
    vec3 groundColor;
    vec3 skyColor;
};
uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];

vec2 getMatcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
    return reflected.xy / m + 0.5;
}

void main() {
    vec3 light = vec3(0.0);

    light += (dot(hemisphereLights[0].direction, vNormal) + 1.0) * hemisphereLights[0].skyColor * 0.5;
    light += (-dot(hemisphereLights[0].direction, vNormal) + 1.0) * hemisphereLights[0].groundColor * 0.5;
    gl_FragColor = vec4(vColor * 0.7 * light, 1.0);
}
`;