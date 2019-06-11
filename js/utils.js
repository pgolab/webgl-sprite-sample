(function(root, factory) {  // eslint-disable-line
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.utils = factory();
    }
}(this, function() {
    "use strict";

    function loadScriptsContents(scriptsIds) {
        return Promise.all(scriptsIds.map(loadScriptContent));
    }

    function loadScriptContent(scriptId) {
        const shaderScript = document.getElementById(scriptId);

        if (!shaderScript) {
            throw ("*** Error: unknown script element " + scriptId);
        }

        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", shaderScript.src);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    resolve(xhr.responseText);
                }
            };
            xhr.send();
        });
    }

    function loadImageAndCreateTextureInfo(gl, url, callback) {
        const texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 255, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        const textureInfo = {
            width: 1,
            height: 1,
            texture: texture,
        };

        const image = new Image();
        image.addEventListener('load', function() {
            textureInfo.width = image.width;
            textureInfo.height = image.height;
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            if (callback !== undefined) {
                callback(textureInfo);
            }
        });
        image.src = url;

        return textureInfo;
    }

    return {
        loadScriptsContents,
        loadImageAndCreateTextureInfo
    };
}));
