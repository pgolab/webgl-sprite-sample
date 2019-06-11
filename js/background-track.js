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
        const ratio = this.width / canvas.width;

        posX = Math.round(posX * ratio);
        posY = Math.round(posY * ratio);
        const tileHalf = Math.round(TILE_SIZE / 2 * ratio);

        for (let y = Math.max(0, posY - tileHalf); y < Math.min(this.height, posY + tileHalf); y++) {
            for (let x = Math.max(0, posX - tileHalf); x < Math.min(this.width, posX + tileHalf); x++) {
                this.track[y * this.width + x] = 255;
            }
        }
    }

    createTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.LUMINANCE,
            this.width, this.height,
            0, gl.LUMINANCE, gl.UNSIGNED_BYTE,
            new Uint8Array(this.track)
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
}
