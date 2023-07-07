uniform vec3 uColor;
uniform sampler2D uTex;
varying vec2 vUv;
varying float vElevation;

void main() {

    vec4 tex = texture(uTex, vUv);
    tex.rgb *= vElevation * .75 + .85;
    gl_FragColor = tex;
}