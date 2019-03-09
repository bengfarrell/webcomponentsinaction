import Blobs from './canvas/blobs.js';
import CanvasFilters from './canvas/filters.js';
import WebGLFilters from './webgl/filters.js';
import Shaders from './webgl/shaders.js';
import Textures from './webgl/textures.js';
import Uniforms from './webgl/uniforms.js';
import Constants from './webgl/constants.js';

exports.image = {
    canvas: {
        blobs: Blobs,
        filters: CanvasFilters
    },
    webgl: {
        shaders: Shaders,
        textures: Textures,
        uniforms: Uniforms,
        filters: WebGLFilters,
        constants: Constants
    }
};