attribute vec4 position;
attribute vec2 texture_coordinates;

uniform mat4 transform_matrix;
uniform mat4 texture_matrix;

varying vec2 texture_coordinates_varying;

void main() {
    gl_Position = transform_matrix * position;

    texture_coordinates_varying = (texture_matrix * vec4(texture_coordinates, 0, 1)).xy;
}
