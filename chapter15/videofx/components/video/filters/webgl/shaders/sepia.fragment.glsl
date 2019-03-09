precision mediump float;
varying vec2 v_texCoord;

uniform sampler2D u_image0;
uniform vec4 light;
uniform vec4 dark;
uniform float desat;
uniform float toned;

const mat4 coeff = mat4(
    0.393, 0.349, 0.272, 1.0,
    0.796, 0.686, 0.534, 1.0,
    0.189, 0.168, 0.131, 1.0,
    0.0, 0.0, 0.0, 1.0
);

void main(void) {
    vec4 sourcePixel = texture2D(u_image0, v_texCoord);
    gl_FragColor = coeff * sourcePixel;
}