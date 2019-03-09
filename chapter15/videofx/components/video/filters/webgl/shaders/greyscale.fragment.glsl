precision mediump float;
varying vec2 v_texCoord;

uniform sampler2D u_image0;

void main(void) {
    vec4 px = texture2D(u_image0, v_texCoord);
    float avg = (px.r + px.g + px.b)/3.0;
    gl_FragColor = vec4(avg, avg, avg, px.a);
}