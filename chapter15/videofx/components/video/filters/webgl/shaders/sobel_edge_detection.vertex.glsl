attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;
varying vec2 v_texCoord;
uniform vec2 offset;

void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0 + offset;
    gl_Position = vec4(clipSpace.x * 1.0, clipSpace.y * -1.0, 0.0, 1.0);
    v_texCoord = a_texCoord;
}