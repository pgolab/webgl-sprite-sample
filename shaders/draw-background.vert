attribute vec4 position;
attribute vec2 texture_coordinates;

uniform mat4 transform_matrix;

varying vec2 texture_coordinates_varying;

void main() {
    gl_Position = transform_matrix * position;

    texture_coordinates_varying = texture_coordinates;
}
