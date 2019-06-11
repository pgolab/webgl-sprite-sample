precision mediump float;

varying vec2 texture_coordinates_varying;

uniform sampler2D background_texture;

void main() {
    vec4 color = texture2D(background_texture, texture_coordinates_varying);
    float g = dot(color.rgb, vec3(0.2989, 0.5870, 0.1140));
    gl_FragColor = vec4(vec3(g), color.a);

    // ToDo: add gaussian blur
    // https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf
    // https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html

    // ToDo: apply above filters only when area is not visited
    // https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
    // https://webglfundamentals.org/webgl/lessons/webgl-2-textures.html
}
