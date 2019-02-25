import Slider from '../../slider/src/slider.js';
import CoordinatePicker from '../../coordpicker/src/coordpicker.js';

import InputFields from '../../../designsystem/inputfields.js';
import Base from '../../../designsystem/base.js';
import Modal from '../../../designsystem/modal.js';

export default {
    render(opts) {
        return `${this.css(opts.useShadowDOM)}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            hue: scope.querySelector('.hue-slider'),
            transparency: scope.querySelector('.transparency-slider'),
            satbright: scope.querySelector('.saturation-brightness'),
            textInputR: scope.querySelector('.textInputR'),
            textInputG: scope.querySelector('.textInputG'),
            textInputB: scope.querySelector('.textInputB'),
            textInputA: scope.querySelector('.textInputA'),
            textInputHex: scope.querySelector('.textInputHex'),
        }
    },

    html() {
        return `<div class="container">
                    <div class="row">
                        <div class="slider-container">
                            <wcia-slider class="hue-slider" value="50"></wcia-slider>
                            <wcia-slider class="transparency-slider" value="0"></wcia-slider>
                        </div>

                        <wcia-coord-picker x="50" y="50" class="saturation-brightness"></wcia-coord-picker>
                    </div>

                    <div class="row">
                        <div class="text-inputs">
                            <div class="ds-form-input">
                              <label class="ds-input-field-label top" for="textInputR">Red</label>
                              <input class="textInputR" type="number" value="0" max="255" size="4" min="0">
                            </div>

                            <div class="ds-form-input">
                              <label class="ds-input-field-label top" for="textInputG">Green</label>
                              <input class="textInputG" type="number" value="0" max="255" size="4" min="0">
                            </div>

                            <div class="ds-form-input">
                              <label class="ds-input-field-label top" for="textInputB">Blue</label>
                              <input class="textInputB" type="number" value="0" max="255" size="4" min="0">
                            </div>

                            <div class="ds-form-input">
                              <label class="ds-input-field-label top" for="textInputA">Alpha</label>
                              <input class="textInputA" type="number" value="0" max="100" min="0" size="4">
                            </div>

                            <div class="ds-form-input">
                              <label class="ds-input-field-label top" for="textInputHex">Hex</label>
                              <input class="textInputHex" type="text" width="50px" size="8">
                            </div>
                        </div>
                    </div>
                </div>`
    },

    createHostSelector(useshadow, host) {
        if (useshadow) {
            return ':host';
        } else {
            return host;
        }
    },

    createHostContextSelector(useshadow, host, clazz) {
        if (useshadow) {
            return `:host(${clazz})`;
        } else {
            return host + clazz;
        }
    },

    css(useShadowDOM) {
        const comp = 'wcia-color-picker';
        return `<style>
                    ${InputFields.css()}
                    
                    ${this.createHostSelector(useShadowDOM, comp)}
                    {
                        ${Base.common()};
                        width: 100%;
                        display: inline-block;
                    }

                    ${this.createHostContextSelector(useShadowDOM, comp, '.modal')}
                    {
                        ${Modal.rules()}
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .container {
                        padding: 10px;
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .text-inputs {
                        display: flex;
                        width: 100%;
                        justify-content: center;
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .row {
                        display: flex;
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .slider-container {
                        flex: 1;
                        padding-right: 10px;
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .hue-slider, 
                    ${this.createHostSelector(useShadowDOM, comp)} .transparency-slider {
                        width: 100%;
                        height: 40px;
                        margin-bottom: 5px;
                        border-radius: var(--border-radius);
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .saturation-brightness {
                        width: 90px;
                        height: 90px;
                        border-radius: var(--border-radius);
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .hue-slider {
                        background: linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);
                    }

                    ${this.createHostSelector(useShadowDOM, comp)} .transparency-slider {
                        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),linear-gradient(-45deg, #ccc 25%, transparent 25%),linear-gradient(45deg, transparent 75%, #ccc 75%),linear-gradient(-45deg, transparent 75%, #ccc 75%);
                        background-size: 16px 16px;
                        background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
                    }
                </style>`;
    }
}
