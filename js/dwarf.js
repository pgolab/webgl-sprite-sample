function initDwarfProgram(gl, dwarfProgram) {
    const programInfo = {
        program: dwarfProgram
    };

    programInfo.positionLocation = gl.getAttribLocation(programInfo.program, 'position');
    programInfo.textureCoordinatesLocation = gl.getAttribLocation(programInfo.program, 'texture_coordinates');

    programInfo.transformMatrixLocation = gl.getUniformLocation(programInfo.program, 'transform_matrix');
    // ToDo: add texture matrix

    programInfo.textureLocation = gl.getUniformLocation(programInfo.program, 'sprite_texture');

    programInfo.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);

    const positions = QUAD;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    programInfo.textureCoordinatesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.textureCoordinatesBuffer);

    const textureCoordinates = QUAD;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    programInfo.textureInfo = utils.loadImageAndCreateTextureInfo(gl, 'assets/dwarf.png');
    programInfo.dwarf = new DwarfClass();

    return programInfo
}

function drawDwarf(gl, dwarfProgramInfo) {
    gl.useProgram(dwarfProgramInfo.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, dwarfProgramInfo.positionBuffer);
    gl.enableVertexAttribArray(dwarfProgramInfo.positionLocation);
    gl.vertexAttribPointer(dwarfProgramInfo.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, dwarfProgramInfo.textureCoordinatesBuffer);
    gl.enableVertexAttribArray(dwarfProgramInfo.textureCoordinatesLocation);
    gl.vertexAttribPointer(dwarfProgramInfo.textureCoordinatesLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, dwarfProgramInfo.textureInfo.texture);
    gl.uniform1i(dwarfProgramInfo.textureLocation, 0);

    let transformationMatrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
    transformationMatrix = m4.translate(transformationMatrix, dwarfProgramInfo.dwarf.x, dwarfProgramInfo.dwarf.y, 0);
    transformationMatrix = m4.scale(transformationMatrix, dwarfProgramInfo.textureInfo.width, dwarfProgramInfo.textureInfo.height, 1);
    gl.uniformMatrix4fv(dwarfProgramInfo.transformMatrixLocation, false, transformationMatrix);

    // ToDo: add texture matrix and update transformation matrix

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function createFrameSelectMatrix(x, y, textureInfo) {
    // ToDo: implement matrix for frame selection
    // https://webglfundamentals.org/webgl/lessons/webgl-2d-drawimage.html
    return m4.identity();
}
