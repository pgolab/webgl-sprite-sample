const TILE_SIZE = 32;
const FRAMERATE = 24;
const SPEED = 32;

const LOOPS = {
    IDLE_RIGHT: {
        row: 0,
        framesCount: 5
    },
    WALK_RIGHT: {
        row: 1,
        framesCount: 8
    },
    ATTACK_RIGHT: {
        row: 2,
        framesCount: 7
    },
    HIT_RIGHT: {
        row: 3,
        framesCount: 4
    },
    DEATH_RIGHT: {
        row: 4,
        framesCount: 7
    },
    IDLE_LEFT: {
        row: 5,
        framesCount: 8
    },
    WALK_LEFT: {
        row: 6,
        framesCount: 8
    },
    ATTACK_LEFT: {
        row: 7,
        framesCount: 7
    },
    HIT_LEFT: {
        row: 8,
        framesCount: 4
    },
    DEATH_LEFT: {
        row: 9,
        framesCount: 7
    }
};

const QUAD = [
    0, 0,
    0, 1,
    1, 0,
    1, 0,
    0, 1,
    1, 1
];

const BLUR_KERNEL = [
    0.045, 0.122, 0.045,
    0.122, 0.332, 0.122,
    0.045, 0.122, 0.045
];
