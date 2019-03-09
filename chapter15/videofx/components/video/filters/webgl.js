import Filters from './webgl/filters.js';
import Shaders from './webgl/shaders.js';
import Textures from './webgl/textures.js';
import Uniforms from './webgl/uniforms.js';
import Constants from './webgl/constants.js';

exports.image = {
    webgl: {
        shaders: Shaders,
        textures: Textures,
        uniforms: Uniforms,
        filters: Filters,
        constants: Constants
    }
};