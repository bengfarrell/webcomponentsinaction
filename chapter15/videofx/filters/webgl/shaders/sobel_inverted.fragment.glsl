precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;
uniform vec2 f_resolution;

void main(void) {
    float x = 1.0 / f_resolution.x;
    float y = 1.0 / f_resolution.y;
    vec4 horizEdge = vec4( 0.0 );
    horizEdge -= texture2D( u_image, vec2( v_texCoord.x - x, v_texCoord.y - y ) ) * 1.0;
    horizEdge -= texture2D( u_image, vec2( v_texCoord.x - x, v_texCoord.y     ) ) * 2.0;
    horizEdge -= texture2D( u_image, vec2( v_texCoord.x - x, v_texCoord.y + y ) ) * 1.0;
    horizEdge += texture2D( u_image, vec2( v_texCoord.x + x, v_texCoord.y - y ) ) * 1.0;
    horizEdge += texture2D( u_image, vec2( v_texCoord.x + x, v_texCoord.y     ) ) * 2.0;
    horizEdge += texture2D( u_image, vec2( v_texCoord.x + x, v_texCoord.y + y ) ) * 1.0;
    vec4 vertEdge = vec4( 0.0 );
    vertEdge -= texture2D( u_image, vec2( v_texCoord.x - x, v_texCoord.y - y ) ) * 1.0;
    vertEdge -= texture2D( u_image, vec2( v_texCoord.x    , v_texCoord.y - y ) ) * 2.0;
    vertEdge -= texture2D( u_image, vec2( v_texCoord.x + x, v_texCoord.y - y ) ) * 1.0;
    vertEdge += texture2D( u_image, vec2( v_texCoord.x - x, v_texCoord.y + y ) ) * 1.0;
    vertEdge += texture2D( u_image, vec2( v_texCoord.x    , v_texCoord.y + y ) ) * 2.0;
    vertEdge += texture2D( u_image, vec2( v_texCoord.x + x, v_texCoord.y + y ) ) * 1.0;
    vec3 edge = 0.8 - sqrt((horizEdge.rgb * horizEdge.rgb) + (vertEdge.rgb * vertEdge.rgb));

    gl_FragColor = vec4(edge, texture2D( u_image, v_texCoord ).a );
}