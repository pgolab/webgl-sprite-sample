"use strict";

window.onload = init;

function init() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false });

    if (!gl) {
        return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    utils.loadScriptsContents([
        'draw-dwarf-vertex-shader', 'draw-dwarf-fragment-shader',
        'draw-background-vertex-shader', 'draw-background-fragment-shader'
    ])
        .then((scriptsSources) => {
            const dwarfProgram = webglUtils.createProgramFromSources(gl, scriptsSources.slice(0, 2));
            const backgroundProgram = webglUtils.createProgramFromSources(gl, scriptsSources.slice(2, 4));
            startPrograms(gl, dwarfProgram, backgroundProgram);
        });
}

function startPrograms(gl, dwarfProgram, backroundProgram) {
    const dwarfProgramInfo = initDwarfProgram(gl, dwarfProgram);
    const backgroundProgramInfo = initBackgroundProgram(gl, backroundProgram);

    const drawInfo = {
        animationFrame: 0,
        lastUpdate: 0,
        delta: 0,
        changed: true
    };

    requestAnimationFrame((time) => render(gl, drawInfo, dwarfProgramInfo, backgroundProgramInfo, time));
}

function render(gl, drawInfo, dwarfProgramInfo, backgroundProgramInfo, time) {
    drawInfo = updateDrawInfo(drawInfo, time);

    if (drawInfo.changed) {
        dwarfProgramInfo.dwarf.update(drawInfo, { width: gl.canvas.width, height: gl.canvas.height });
        backgroundProgramInfo.track.registerPosition(dwarfProgramInfo.dwarf.x, dwarfProgramInfo.dwarf.y, gl.canvas);
        draw(gl, dwarfProgramInfo, backgroundProgramInfo);
    }

    requestAnimationFrame((time) => render(gl, drawInfo, dwarfProgramInfo, backgroundProgramInfo, time));
}

function updateDrawInfo(drawInfo, time) {
    // ToDo: calculate current frame and fill other data

    return Object.assign({}, drawInfo, { changed: true });
}

function draw(gl, dwarfProgramInfo, backgroundProgramInfo) {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // ToDo: enable background drawing
    // drawBackground(gl, backgroundProgramInfo);
    drawDwarf(gl, dwarfProgramInfo);
}
