const rmaes = {};

rmaes.webgl = {
    createGL: (aCanvas, avAttribs) => {
        if (!aCanvas) {
            return null
        }

        const avstrNames = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let gl = null, n = avstrNames.length;

        for (let i = 0; i < n; ++i) {
            try {
                gl = aCanvas.getContext(avstrNames[i], avAttribs)
            } catch (e) {

            }
            if (gl) {
                break
            }
        }
        return gl
    },

    getGL: (aCanvas, abDebug) => {
        let gl = rmaes.webgl.createGL(aCanvas);
        if (!gl) {
            return null
        }
        if (abDebug) {
            gl = WebGLDebugUtils.makeDebugContext(gl);
        }
        return gl
    },

    createShaderObject: (gl, aeShaderType, astrSource) => {
        if (!gl) {
            console.error("rmaes.webgl.createShaderObject: gl undefined")
            return null
        }
        const aShader = gl.createShader(aeShaderType);
        if (!aShader) {
            console.error("rmaes.webgl.createShaderObject: createShader failed")
            return null
        }
        gl.shaderSource(aShader, astrSource);
        gl.compileShader(aShader);

        if (!gl.getShaderParameter(aShader, gl.COMPILE_STATUS)) {
            console.error(`Failed to compile shader: ${gl.getShaderInfoLog(aShader)}`);
            gl.deleteShader(aShader);
            return null
        }
        return aShader
    },

    createProgramObject: (gl, aVShader, aFShader) => {
        if (!gl) {
            console.error("rmaes.webgl.createProgramObject: gl undefined");
            return null
        }
        if (!aVShader) {
            console.error("rmaes.webgl.createProgramObject: aVShader undefined");
            return null
        }
        if (!aFShader) {
            console.error("rmaes.webgl.createProgramObject: aFShader undefined");
            return null
        }

        const aProgram = gl.createProgram();
        if (!aProgram) {
            console.error("rmaes.webgl.createProgramObject: createProgram undefined");
            return null
        }
        gl.attachShader(aProgram, aVShader);
        gl.attachShader(aProgram, aFShader);
        gl.linkProgram(aProgram);

        if (!gl.getProgramParameter(aProgram, gl.LINK_STATUS)) {
            console.error(`Failed to link program: ${gl.getProgramInfoLog(aProgram)}`);
            gl.deleteProgram(aProgram);
            return null
        }
        return aProgram
    },

    initShaders: (gl, astrVertexShader, astrFragmentShader) => {
        if (!gl) {
            console.error("rmaes.webgl.initShaders: gl undefined");
            return null
        }
        if (0 >= astrVertexShader.length) {
            console.error("rmaes.webgl.initShaders: astrVertexShader empty");
            return null
        }
        if (0 >= astrFragmentShader.length) {
            console.error("rmaes.webgl.initShaders: astrFragmentShader empty");
            return null
        }

        const aVShader = rmaes.webgl.createShaderObject(gl, gl.VERTEX_SHADER, astrVertexShader);
        if (!aVShader) {
            console.error("rmaes.webgl.initShaders: aVShader undefined");
            return null
        }

        const aFShader = rmaes.webgl.createShaderObject(gl, gl.FRAGMENT_SHADER, astrFragmentShader);
        if (!aFShader) {
            console.error("rmaes.webgl.initShaders: aFShader undefined");
            gl.deleteShader(aVShader);
            return null
        }

        const aProgram = rmaes.webgl.createProgramObject(gl, aVShader, aFShader);
        if (!aProgram) {
            console.error("rmaes.webgl.initShaders: createProgram failed");
            gl.deleteShader(aVShader);
            gl.deleteShader(aFShader);
            return null
        }
        return aProgram
    },

    initShadersAndMakeCurrent: (gl, astrVertexShader, astrFragmentShader) => {
        const aProgram = rmaes.webgl.initShaders(gl, astrVertexShader, astrFragmentShader);
        if (!aProgram) {
            console.error("rmaes.webgl.initShadersAndMakeCurrent: rmaes.webgl.initShaders failed");
            return null
        }
        gl.useProgram(aProgram);
        return aProgram
    }
}

export {rmaes as default};