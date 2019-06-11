class DwarfClass {
    constructor() {
        this.vx = 1;
        this.vy = 1;

        this.x = Math.round(TILE_SIZE / 2);
        this.y = Math.round(TILE_SIZE / 2);

        this.loop = LOOPS.IDLE_RIGHT;
        this.loopFrame = 0;
    }

    update(drawInfo, canvasSize) {
        this.loopFrame = Math.round((this.loop.framesCount - 1) * (drawInfo.animationFrame / FRAMERATE));

        // ToDo: animate random movement
    }
}
