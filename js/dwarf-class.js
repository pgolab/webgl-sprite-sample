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
        // ToDo: animate sprite cycle

        // ToDo: animate random movement
    }
}
