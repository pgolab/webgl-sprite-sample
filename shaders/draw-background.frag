precision mediump float;

varying vec2 texture_coordinates_varying;

uniform sampler2D background_texture;

void main() {
    gl_FragColor = texture2D(background_texture, texture_coordinates_varying);

    // ToDo: convert result image to grayscale
    // https://en.wikipedia.org/wiki/Grayscale

    // ToDo: add gaussian blur
    // https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf
    // https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html

    // ToDo: apply above filters only when area is not visited
    // https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
    // https://webglfundamentals.org/webgl/lessons/webgl-2-textures.html
}
