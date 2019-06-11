class DwarfClass {
    constructor() {
        this.vx = 1;
        this.vy = 1;

        this.x = Math.round(TILE_SIZE / 2);
        this.y = Math.round(TILE_SIZE / 2);

        this.loop = LOOPS.WALK_RIGHT;
        this.loopFrame = 0;
    }

    update(drawInfo, canvasSize) {
        const dx = drawInfo.delta * SPEED * this.vx;
        const dy = drawInfo.delta * SPEED * this.vy;

        const left = TILE_SIZE / 2;
        const right = canvasSize.width - TILE_SIZE / 2;
        const bottom = TILE_SIZE / 2;
        const top = canvasSize.height - TILE_SIZE / 2;

        this.x = Math.max(left, Math.min(right, Math.round(this.x + dx)));
        this.y = Math.max(bottom, Math.min(top, Math.round(this.y + dy)));

        if ((this.x === left) || (this.x === right) || (Math.random() < 0.01)) {
            this.vx *= -1;

            if (this.vx > 0) {
                this.loop = LOOPS.WALK_RIGHT;
            }
            else {
                this.loop = LOOPS.WALK_LEFT;
            }
        }

        if ((this.y === bottom) || (this.y === top) || (Math.random() < 0.01)) {
            this.vy *= -1;
        }

        this.loopFrame = Math.round((this.loop.framesCount - 1) * (drawInfo.animationFrame / FRAMERATE));
    }
}
