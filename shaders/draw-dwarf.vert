attribute vec4 position;
attribute vec2 texture_coordinates;

uniform mat4 transform_matrix;

varying vec2 texture_coordinates_varying;

void main() {
    gl_Position = transform_matrix * position;

    // ToDo: select local sprite image from sheet
    // https://webglfundamentals.org/webgl/lessons/webgl-2d-drawimage.html
    texture_coordinates_varying = texture_coordinates;
}
