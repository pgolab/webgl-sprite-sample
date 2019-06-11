precision mediump float;

varying vec2 texture_coordinates_varying;

uniform sampler2D background_texture;
uniform sampler2D track_texture;

uniform vec2 texture_size;
uniform float kernel[9];

void main() {
    vec4 visited = texture2D(track_texture, texture_coordinates_varying);

    if (visited.x > 0.0) {
        gl_FragColor = texture2D(background_texture, texture_coordinates_varying);
    }
    else {
        vec2 pixel_size = vec2(1.0, 1.0) / texture_size;
        vec4 color =
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(-1, -1)) * kernel[0] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(0, -1)) * kernel[1] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(1, -1)) * kernel[2] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(-1, 0)) * kernel[3] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(0, 0)) * kernel[4] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(1, 0)) * kernel[5] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(-1, 1)) * kernel[6] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(0, 1)) * kernel[7] +
            texture2D(background_texture, texture_coordinates_varying + pixel_size * vec2(1, 1)) * kernel[8];

        float g = dot(color.rgb, vec3(0.2989, 0.5870, 0.1140));
        gl_FragColor = vec4(vec3(g), color.a);
    }
}
