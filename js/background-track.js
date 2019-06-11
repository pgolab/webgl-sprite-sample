class BackgroundTrack {
    constructor(width, height) {
        this.update(width, height);
    }

    update(width, height) {
        this.width = width;
        this.height = height;
        this.track = Array(height * width).fill(0);
    }

    registerPosition(posX, posY, canvas) {
        // ToDo: mark visited position
    }

    createTexture(gl) {
        // ToDo: create texture from track
        // https://webglfundamentals.org/webgl/lessons/webgl-data-textures.html
    }
}
