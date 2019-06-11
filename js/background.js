function initBackgroundProgram(gl, backgroundProgram) {
    const programInfo = {
        program: backgroundProgram
    };

    programInfo.positionLocation = gl.getAttribLocation(programInfo.program, 'position');
    programInfo.textureCoordinatesLocation = gl.getAttribLocation(programInfo.program, 'texture_coordinates');

    programInfo.transformMatrixLocation = gl.getUniformLocation(programInfo.program, 'transform_matrix');

    programInfo.textureLocation = gl.getUniformLocation(programInfo.program, 'background_texture');
    programInfo.trackLocation = gl.getUniformLocation(programInfo.program, 'track_texture');

    programInfo.textureSizeLocation = gl.getUniformLocation(programInfo.program, 'texture_size');
    programInfo.kernelLocation = gl.getUniformLocation(programInfo.program, 'kernel');

    programInfo.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);

    const positions = QUAD;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    programInfo.textureCoordinatesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.textureCoordinatesBuffer);

    const textureCoordinates = QUAD;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    programInfo.track = new BackgroundTrack(gl.canvas.width, gl.canvas.height);
    programInfo.textureInfo = utils.loadImageAndCreateTextureInfo(gl, 'assets/background.jpg',
        (textureInfo) => {
            programInfo.track.update(textureInfo.width, textureInfo.height);
        }
    );

    return programInfo
}

function drawBackground(gl, backgroundProgramInfo) {
    gl.useProgram(backgroundProgramInfo.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundProgramInfo.positionBuffer);
    gl.enableVertexAttribArray(backgroundProgramInfo.positionLocation);
    gl.vertexAttribPointer(backgroundProgramInfo.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundProgramInfo.textureCoordinatesBuffer);
    gl.enableVertexAttribArray(backgroundProgramInfo.textureCoordinatesLocation);
    gl.vertexAttribPointer(backgroundProgramInfo.textureCoordinatesLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1i(backgroundProgramInfo.textureLocation, 0);
    gl.uniform1i(backgroundProgramInfo.trackLocation, 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, backgroundProgramInfo.textureInfo.texture);
    gl.activeTexture(gl.TEXTURE1);
    backgroundProgramInfo.track.createTexture(gl);
    gl.activeTexture(gl.TEXTURE0);

    let transformationMatrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
    const ratio = gl.canvas.width / backgroundProgramInfo.textureInfo.width;
    transformationMatrix = m4.scale(transformationMatrix, gl.canvas.width, backgroundProgramInfo.textureInfo.height * ratio, 1);
    gl.uniformMatrix4fv(backgroundProgramInfo.transformMatrixLocation, false, transformationMatrix);

    gl.uniform2f(backgroundProgramInfo.textureSizeLocation, backgroundProgramInfo.textureInfo.width, backgroundProgramInfo.textureInfo.height);
    gl.uniform1fv(backgroundProgramInfo.kernelLocation, BLUR_KERNEL);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
