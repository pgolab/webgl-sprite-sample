precision mediump float;

varying vec2 texture_coordinates_varying;

uniform sampler2D sprite_texture;

void main() {
    gl_FragColor = texture2D(sprite_texture, texture_coordinates_varying);
}
