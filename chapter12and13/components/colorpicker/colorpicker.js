(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.colorpicker = factory());
}(this, function () { 'use strict';

    var Template = {
        render(opts) {
            return `${this.css(opts.useShadowDOM)}
                ${this.html()}`;
        },

        mapDOM(scope) {
            return {
                overlay: scope.querySelector('.bg-overlay'),
                thumb: scope.querySelector('.thumb'),
            }
        },

        html() {
            return `<div class="bg-overlay"></div>
                <div class="thumb"></div>`;
        },

        createHostSelector(useshadow, host) {
            if (useshadow) {
                return ':host';
            } else {
                return host;
            }
        },

        css(useShadowDOM) {
            const comp = 'wcia-slider';
            return `<style>
                    ${this.createHostSelector(useShadowDOM, comp)} {
                        display: inline-block;
                        position: relative;
                        border-radius: var(--border-radius);
                    }
                    
                    ${this.createHostSelector(useShadowDOM, comp)} .bg-overlay {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        border-radius: var(--border-radius);
                    }
                    
                    ${this.createHostSelector(useShadowDOM, comp)} .thumb {
                        margin-top: -1px;
                        width: 5px;
                        height: calc(100% - 5px);
                        position: absolute;
                        border-style: solid;
                        border-width: var(--border-width-thick);
                        border-color: var(--border-inverted-color);
                        border-radius: var(--border-radius);
                        pointer-events: none;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }
                </style>`;
        }
    };

    /**
     * from http://www.easyrgb.com/en/math.php#text1
     */

    var Color = {
        /* accepts parameters
         * h  Object = {h:x, s:y, v:z}
         * OR
         * h, s, v
        */
        HSVtoRGB(H, S, V) {
            let R,G,B, var_h, var_i, var_1, var_2, var_3, var_r, var_g, var_b;
            if ( S === 0 ) {
                R = V * 255;
                G = V * 255;
                B = V * 255;
            } else {
                var_h = H * 6;
                if ( var_h === 6 ) { var_h = 0; }      //H must be < 1
                var_i = parseInt( var_h );            //Or ... var_i = floor( var_h )
                var_1 = V * ( 1 - S );
                var_2 = V * ( 1 - S * ( var_h - var_i ) );
                var_3 = V * ( 1 - S * ( 1 - ( var_h - var_i ) ) );

                if      ( var_i === 0 ) { var_r = V     ; var_g = var_3 ; var_b = var_1; }
                else if ( var_i === 1 ) { var_r = var_2 ; var_g = V     ; var_b = var_1; }
                else if ( var_i === 2 ) { var_r = var_1 ; var_g = V     ; var_b = var_3; }
                else if ( var_i === 3 ) { var_r = var_1 ; var_g = var_2 ; var_b = V;     }
                else if ( var_i === 4 ) { var_r = var_3 ; var_g = var_1 ; var_b = V;     }
                else                   { var_r = V     ; var_g = var_1 ; var_b = var_2; }

                R = parseInt(var_r * 255);
                G = parseInt(var_g * 255);
                B = parseInt(var_b * 255);
            }
            return { r: R, g: G, b: B };
        },

        RGBtoHSV(r, g, b) {
            //R, G and B input range = 0 ÷ 255
            //H, S and V output range = 0 ÷ 1.0

            const var_R = ( r / 255 );
            const var_G = ( g / 255 );
            const var_B = ( b / 255 );

            const var_Min = Math.min( var_R, var_G, var_B );   //Min. value of RGB
            const var_Max = Math.max( var_R, var_G, var_B );    //Max. value of RGB
            const del_Max = var_Max - var_Min;             //Delta RGB value

            let V = var_Max;
            let H, S;

            if ( del_Max === 0 )                     //This is a gray, no chroma...
            {
                H = 0;
                S = 0;
            }
            else                                    //Chromatic data...
            {
                S = del_Max / var_Max;

                const del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
                const del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
                const del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

                if      ( var_R === var_Max ) { H = del_B - del_G; }
                else if ( var_G === var_Max ) { H = ( 1 / 3 ) + del_R - del_B; }
                else if ( var_B === var_Max ) { H = ( 2 / 3 ) + del_G - del_R; }

                if ( H < 0 ) { H += 1; }
                if ( H > 1 ) { H -= 1; }
            }
            return { h: H, s: S, v: V };
        },

        RGBtoHex(r, g, b) {
            if (typeof r === 'object') {
                g = r.g;
                b = r.b;
                r = r.r;
            }
            return '#' + this.toHex(parseInt(r)) + this.toHex(parseInt(g)) + this.toHex(parseInt(b));
        },

        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        hexToRGB(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            let target;
            if (hex.charAt(0) === '#') {
                target = 7;
            } else if (hex.charAt(0) !== '#') {
                target = 6;
            }

            while(hex.length < target) {
                hex += '0';
            }

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },

        formatHex(val) {
            if (val.charAt(0) !== '#') {
                val = '#' + val;
            }
            while (val.length < 7) {
                val += '0';
            }
            return val;
        },



        toHex(val) {
            let hex = Number(val).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        }

    };

    class Slider extends HTMLElement {
        static get USE_SHADOWDOM_WHEN_AVAILABLE() { return true; }

        static get observedAttributes() {
            return ['value', 'backgroundcolor'];
        }

        attributeChangedCallback(name, oldVal, newValue) {
            if (!this.dom) { return; }
            switch (name) {
                case 'value':
                    this.refreshSlider(newValue);
                    break;

                case 'backgroundcolor':
                    this.setColor(newValue);
                    break;
            }
        }

        set value(val) {
            this.setAttribute('value', val);
        }

        get value() {
            return this.getAttribute('value');
        }

        set backgroundcolor(val) {
            this.setAttribute('backgroundcolor', val);
        }

        get backgroundcolor() {
            return this.getAttribute('backgroundcolor');
        }

        constructor() {
            super();

            if (Slider.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow) {
                this.root = this.attachShadow({mode: 'open'});
            } else {
                this.root = this;
            }

            document.addEventListener('mousemove', e => this.eventHandler(e));
            document.addEventListener('mouseup', e => this.eventHandler(e));
            this.addEventListener('mousedown', e => this.eventHandler(e));
        }

        connectedCallback() {
            if (!this.initialized) {
                this.root.innerHTML = Template.render({ useShadowDOM: Slider.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow });
                this.dom = Template.mapDOM(this.root);
                if ( typeof cssVars !== 'undefined') {
                    cssVars();
                }
                this.initialized = true;

                if (this.backgroundcolor) {
                    this.setColor(this.backgroundcolor);
                }

                if (this.value) {
                    this.refreshSlider(this.value);
                }
            }
        }

        setColor(color) {
            const rgb = Color.hexToRGB(color);
            this.dom.overlay.style.background = `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 100%)`;
        }

        refreshSlider(value) {
             this.dom.thumb.style.left = (value/100 * this.offsetWidth - this.dom.thumb.offsetWidth/2) + 'px';
        }

        updateX(x) {
            let hPos = x - this.dom.thumb.offsetWidth/2;
            if (hPos > this.offsetWidth) {
                hPos = this.offsetWidth;
            }
            if (hPos < 0) {
                hPos = 0;
            }
            this.value = (hPos / this.offsetWidth) * 100;
        }

        eventHandler(e) {
            const bounds = this.getBoundingClientRect();
            const x = e.clientX - bounds.left;

            switch (e.type) {
                case 'mousedown':
                    this.isdragging = true;
                    this.updateX(x);
                    this.refreshSlider(this.value);
                    break;

                case 'mouseup':
                    this.isdragging = false;
                    break;

                case 'mousemove':
                    if (this.isdragging) {
                        this.updateX(x);
                        this.refreshSlider(this.value);
                    }
                    break;
            }
        }
    }

    if (!customElements.get('wcia-slider')) {
        customElements.define('wcia-slider', Slider);
    }

    var Template$1 = {
        render(opts) {
            return `${this.css(opts.useShadowDOM)}
                ${this.html()}`;
        },

        mapDOM(scope) {
            return {
                thumb: scope.querySelector('.thumb')
            }
        },

        html() {
            return `<div class="bg-overlay-a"></div>
                <div class="bg-overlay-b"></div>
                <div class="thumb"></div>`;
        },

        createHostSelector(useshadow, host) {
            if (useshadow) {
                return ':host';
            } else {
                return host;
            }
        },

        css(useShadowDOM) {
            const comp = 'wcia-coord-picker';
            return `<style>
                    ${this.createHostSelector(useShadowDOM, comp)} {
                        display: inline-block;
                        position: relative;
                    }
                    
                    ${this.createHostSelector(useShadowDOM, comp)} .bg-overlay-a {
                        width: 100%;
                        height: 100%;
                        border-radius: var(--border-radius);
                        position: absolute;
                        background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);
                    }
                    
                    ${this.createHostSelector(useShadowDOM, comp)} .bg-overlay-b {
                        width: 100%;
                        height: 100%;
                        border-radius: var(--border-radius);
                        position: absolute;
                        background: linear-gradient(to bottom, transparent 0%, #000 100%);
                    }
                    
                    ${this.createHostSelector(useShadowDOM, comp)} .thumb {
                        width: 5px;
                        height: 5px;
                        position: absolute;
                        border-style: solid;
                        border-width: var(--border-width-thick);
                        border-color: var(--border-inverted-color);
                        border-radius: var(--border-radius);
                        pointer-events: none;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }
                </style>`;
        }
    };

    class CoordPicker extends HTMLElement {
        static get USE_SHADOWDOM_WHEN_AVAILABLE() { return true; }

        static get observedAttributes() {
            return ['x', 'y', 'backgroundcolor'];
        }

        attributeChangedCallback(name, oldVal, newValue) {
            if (!this.dom) { return; }
            switch (name) {
                case 'x':
                case 'y':
                    this.refreshCoordinates();
                    break;

                case 'backgroundcolor':
                    this.style.backgroundColor = newValue;
                    break;
            }
        }

        set x(val) {
            this.setAttribute('x', val);
        }

        get x() {
            return this.getAttribute('x');
        }

        set y(val) {
            this.setAttribute('y', val);
        }

        get y() {
            return this.getAttribute('y');
        }

        set backgroundcolor(val) {
            this.setAttribute('backgroundcolor', val);
        }

        get backgroundcolor() {
            return this.getAttribute('backgroundcolor');
        }

        constructor() {
            super();

            if (CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow) {
                this.root = this.attachShadow({mode: 'open'});
            } else {
                this.root = this;
            }

            document.addEventListener('mousemove', e => this.eventHandler(e));
            document.addEventListener('mouseup', e => this.eventHandler(e));
            this.addEventListener('mousedown', e => this.eventHandler(e));
        }

        connectedCallback() {
            if (!this.initialized) {
                this.root.innerHTML = Template$1.render( { useShadowDOM: CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow });
                this.dom = Template$1.mapDOM(this.root);
                if ( typeof cssVars !== 'undefined') {
                    cssVars();
                }
                this.initialized = true;

                if (this.x || this.y) {
                    this.refreshCoordinates();
                }

                if (this.backgroundColor) {
                    this.style.backgroundColor = this.backgroundColor;
                }
            }
        }

        eventHandler(e) {
            const bounds = this.getBoundingClientRect();
            const coords = {
                x: e.clientX - bounds.left,
                y: e.clientY - bounds.top
            };
            switch (e.type) {
                case 'mousedown':
                    this.isDragging = true;
                    this.updateXY(coords.x, coords.y);
                    this.refreshCoordinates();
                    break;

                case 'mouseup':
                    this.isDragging = false;
                    break;

                case 'mousemove':
                    if (this.isDragging) {
                        this.updateXY(coords.x, coords.y);
                        this.refreshCoordinates();
                    }
                    break;
            }
        }

        updateXY(x, y) {
            let hPos = x - this.dom.thumb.offsetWidth/2;
            let vPos = y - this.dom.thumb.offsetHeight/2;
            if (hPos > this.offsetWidth) {
                hPos = this.offsetWidth;
            }
            if (hPos < 0) {
                hPos = 0;
            }
            if (vPos > this.offsetHeight) {
                vPos = this.offsetHeight;
            }
            if (vPos < 0) {
                vPos = 0;
            }
            this.x = (hPos / this.offsetWidth) * 100;
            this.y = (vPos / this.offsetHeight) * 100;
        }

        refreshCoordinates() {
            this.dom.thumb.style.left = (this.x/100 * this.offsetWidth - this.dom.thumb.offsetWidth/2) + 'px';
            this.dom.thumb.style.top = (this.y/100 * this.offsetHeight - this.dom.thumb.offsetWidth/2) + 'px';
        }
    }

    if (!customElements.get('wcia-coord-picker')) {
        customElements.define('wcia-coord-picker', CoordPicker);
    }

    var Text = {
        normal() {
            return `
            font-family: sans-serif;
            font-size: 1em;
            line-height: 1.2em;
            color: black;
        `;
        },

        inverted() {
            return `
            color: white;
        `;
        }
    };

    var InputFields = {
        css() {
            return `
            .ds-form-input {
                margin-right: 5px;
            }
            
            .ds-form-input .ds-input-field-label {
                border-top-left-radius: var(--border-radius);
                border-top-right-radius: var(--border-radius);
                background-color: var(--background-inverted-color);
                padding: var(--padding-medium);
                display: block;
                
                font-size: var(--text-xsmall);
                ${Text.inverted()}
            }
            
            .ds-form-input .ds-input-field-label.top {
                display: block;
            }
            
            .ds-form-input input {
                border-style: solid;
                border-width: var(--border-width);
                border-color: var(--border-color-light);
                padding: var(--padding-medium);
                font-size: var(--text-large);
            }
        `;
        }
    };

    var Base = {
        common() { return `${Text.normal()}`; }
    };

    var Modal = {
        css() {
            return `
            .ds-modal {
                ${this.rules()}
            }
        `;
        },

        rules() {
            return `
            background-color: var(--background-color);
            border-radius: var(--border-radius);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        `;
        }
    };

    var Template$2 = {
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
    };

    var Handlers = {
        init() {
            return {
                color: {}
            }
        },

        update(o) {
            if (!o.model) { o.model = this.init(); }

            if (this.shouldIgnoreChange(o)) { return o.model; }

            switch (o.element) {
                case o.component:
                    this.handleComponentAttributes(o);
                    break;

                case o.dom.hue:
                case o.dom.satbright:
                case o.dom.transparency:
                    this.handleMouseInput(o);
                    break;

                case o.dom.textInputA:
                case o.dom.textInputR:
                case o.dom.textInputG:
                case o.dom.textInputB:
                    this.handleRGBA(o);
                    break;

                case o.dom.textInputHex:
                    this.handleHex(o);
                    break;
            }

            return o.model;
        },

        handleMouseInput(o) {
            switch (o.element) {
                case o.dom.hue:
                    if (o.attribute === 'value') {
                        o.model.color.hue = o.element[o.attribute] / 100;

                        // change slider backgrounds to reflect current colors
                        o.dom.satbright.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(o.model.color.hue, 1, 1));
                        o.dom.transparency.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(o.model.color.hue, 1, 1));
                    } else {
                        return; // unimportant attribute change
                    }
                    break;

                case o.dom.satbright:
                    if (o.attribute === 'x' || o.attribute === 'y') {
                        o.model.color.saturation = o.dom.satbright.x / 100;
                        o.model.color.brightness = (100 - o.dom.satbright.y) / 100;
                    } else {
                        return; // unimportant attribute change
                    }
                    break;

                case o.dom.transparency:
                    if (o.attribute === 'value') {
                        o.model.color.alpha = 100 - this.formatTextInput(o.element[o.attribute], 0, 100);
                        o.dom.textInputA.value = this.formatTextInput(o.model.color.alpha, 0, 100);
                        o.component.alpha = o.model.color.alpha;
                        this.ignoreNextChange(o, o.component,'alpha');
                        return; // no need to update anything else
                    } else {
                        return; // unimportant attribute change
                    }
                    break;

                default:
                    return;
            }

            o.model.color.rgb = Color.HSVtoRGB(o.model.color.hue, o.model.color.saturation, o.model.color.brightness);
            o.model.color.hex = Color.RGBtoHex(o.model.color.rgb);

            this.ignoreNextChange(o, o.component,'hex');
            o.component.hex = o.model.color.hex;

            // update text inputs to reflect changes from sliders and coord picker
            o.dom.textInputHex.value = o.model.color.hex;
            o.dom.textInputR.value = this.formatTextInput(o.model.color.rgb.r, 0, 255);
            o.dom.textInputG.value = this.formatTextInput(o.model.color.rgb.g, 0, 255);
            o.dom.textInputB.value = this.formatTextInput(o.model.color.rgb.b, 0, 255);
        },

        handleRGBA(o) {
            if (o.element === o.dom.textInputA) {
                o.model.color.alpha = this.formatTextInput(o.dom.textInputA.value,0, 100);
                this.ignoreNextChange(o, o.dom.transparency, 'value');
                this.ignoreNextChange(o, o.component,'alpha');
                o.dom.transparency.value = o.model.color.alpha;
                o.component.alpha = o.model.color.alpha;

                // set the field to the model value in case it was out of bounds and invalid by the user
                o.dom.textInputA.value = o.model.color.alpha;
            } else {
                o.model.color.rgb = {
                    r: this.formatTextInput(o.dom.textInputR.value, 0, 255),
                    g: this.formatTextInput(o.dom.textInputG.value, 0, 255),
                    b: this.formatTextInput(o.dom.textInputB.value, 0, 255)
                };

                // set the fields to the model value in case they were out of bounds and invalid by the user
                o.dom.textInputR.value = o.model.color.rgb.r;
                o.dom.textInputG.value = o.model.color.rgb.g;
                o.dom.textInputB.value = o.model.color.rgb.b;

                o.model.color.hex = Color.RGBtoHex(o.model.color.rgb);
                this.ignoreNextChange(o, o.component,'hex');
                o.component.hex = o.model.color.hex;
                o.dom.textInputHex.value = o.model.color.hex;

                this.updateHSBFromRGB(o);
            }
        },

        handleComponentAttributes(o) {
            if (o.attribute === 'alpha') {
                o.model.color.alpha = 100 - o.element.alpha;

                this.ignoreNextChange(o, o.dom.transparency,'value');
                o.dom.transparency.value = o.model.color.alpha;
                o.dom.textInputA.value = o.element.alpha;
            } else {
                o.model.color.hex = o.element.hex;
                o.dom.textInputHex.value = o.element.hex;
                this.updateRGBFromHex(o);
            }
        },

        handleHex(o) {
            o.model.color.hex = Color.formatHex(o.dom.textInputHex.value);
            this.ignoreNextChange(o, o.component,'hex');
            o.component.hex = o.model.color.hex;

            // set the field to the model value in case it was made invalid by the user
            o.dom.textInputHex.value = o.model.color.hex;
            this.updateRGBFromHex(o);
        },

        formatTextInput(value, min, max) {
            value = Math.min(value, max);
            value = Math.max(value, min);
            return parseInt(value);
        },

        updateRGBFromHex(o) {
            o.model.color.rgb = Color.hexToRGB(o.model.color.hex);
            o.dom.textInputR.value = parseInt(o.model.color.rgb.r);
            o.dom.textInputG.value = parseInt(o.model.color.rgb.g);
            o.dom.textInputB.value = parseInt(o.model.color.rgb.b);

            this.updateHSBFromRGB(o);
        },

        updateHSBFromRGB(o) {
            const hsv = Color.RGBtoHSV(o.model.color.rgb.r, o.model.color.rgb.g, o.model.color.rgb.b);
            o.model.color.hue = hsv.h;
            o.model.color.saturation = hsv.s;
            o.model.color.brightness = hsv.v;

            this.ignoreNextChange(o, o.dom.hue,'value');
            this.ignoreNextChange(o, o.dom.satbright,['x', 'y']);
            o.dom.hue.value = o.model.color.hue * 100;
            o.dom.satbright.x = o.model.color.saturation * 100;
            o.dom.satbright.y = (1 - o.model.color.brightness) * 100;

            // change slider backgrounds to reflect current colors
            o.dom.satbright.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(hsv.h, 1, 1));
            o.dom.transparency.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(hsv.h, 1, 1));
        },

        /* You've got an attribute change from one component incoming.
           You make the appropriate UI changes including changing another component's attributes.
           The problem is that by changing THAT component, it will trigger another attribute change event.
           This could go on and on in an infinite loop.
           When making changes to those components, we record that we should ignore the incoming change that occurred.
           And now, no infinite loops!
         */
        ignoreNextChange(o, el, attr) {
            if (!Array.isArray(attr)) {
                attr = [ attr ];
            }

            if (!o.model.ignoreNextChange) {
                o.model.ignoreNextChange = new WeakMap();
            }

            for (let c = 0; c < attr.length; c++) {
                if (o.model.ignoreNextChange.has(el)) {
                    o.model.ignoreNextChange.get(el).push(attr[c]);
                } else {
                    o.model.ignoreNextChange.set(el, [ attr[c] ]);
                }
            }
        },

        shouldIgnoreChange(o) {
            if (o.model.ignoreNextChange && o.model.ignoreNextChange.has(o.element)) {
                const ignore = o.model.ignoreNextChange.get(o.element);
                if (ignore.indexOf(o.attribute) !== -1) {
                    ignore.splice(ignore.indexOf(o.attribute), 1);
                    if (ignore.length === 0) {
                        o.model.ignoreNextChange.delete(o.element);
                    }
                    return true;
                }
            }
            return false;
        }
    };

    /**
     * design is heavily borrowed/stolen from https://cssgradient.io/
     */
    class ColorPicker extends HTMLElement {
        static get USE_SHADOWDOM_WHEN_AVAILABLE() { return true; }

        static get DEFAULT_HEX() { return '#77aabb'; }
        static get DEFAULT_ALPHA() { return 100; }

        static get observedAttributes() {
            return ['hex', 'alpha'];
        }

        attributeChangedCallback(name, oldVal, newValue) {
            if (!this.dom) { return; }
            switch (name) {
                case 'hex':
                case 'alpha':
                    if (oldVal !== newValue) {
                        this.data = Handlers.update({
                            model: this.data,
                            dom: this.dom,
                            component: this,
                            element: this,
                            attribute: name,
                        });
                    }
                    break;
            }
        }

        set hex(val) {
            this.setAttribute('hex', val);
        }

        get hex() {
            return this.getAttribute('hex');
        }

        set alpha(val) {
            this.setAttribute('alpha', val);
        }

        get alpha() {
            return this.getAttribute('alpha');
        }

        constructor() {
            super();

            if (ColorPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow) {
                this.root = this.attachShadow({mode: 'open'});
            } else {
                this.root = this;
            }

            const observer = new MutationObserver( e => this.onMutationChange(e));
            observer.observe(this.root, { attributes: true, subtree: true });
            this.root.addEventListener('change', e => this.onInputValueChanged(e));
        }

        connectedCallback() {
            if (!this.initialized) {
                this.root.innerHTML = Template$2.render({ useShadowDOM: ColorPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow });
                this.dom = Template$2.mapDOM(this.root);
                if ( typeof cssVars !== 'undefined') {
                    cssVars();
                }
                this.initialized = true;

                if (this.hex) {
                    this.data = Handlers.update({
                        model: this.data,
                        dom: this.dom,
                        component: this,
                        element: this,
                        attribute: 'hex',
                    });
                } else {
                    this.hex = ColorPicker.DEFAULT_HEX;
                }
                if (this.alpha) {
                    this.data = Handlers.update({
                        model: this.data,
                        dom: this.dom,
                        component: this,
                        element: this,
                        attribute: 'alpha',
                    });
                } else {
                    this.alpha = ColorPicker.DEFAULT_ALPHA;
                }
            }
        }

        onMutationChange(records) {
           records.forEach( rec => {
               if (rec.target !== this) {
                   this.data = Handlers.update({
                       model: this.data,
                       dom: this.dom,
                       component: this,
                       element: rec.target,
                       attribute: rec.attributeName,
                   });
               }
           });
        }

        onInputValueChanged(e) {
            this.data = Handlers.update( {
                model: this.data,
                dom: this.dom,
                component: this,
                element: e.target,
            });
        }
    }

    if (!customElements.get('wcia-color-picker')) {
        customElements.define('wcia-color-picker', ColorPicker);
    }

    return ColorPicker;

}));
//# sourceMappingURL=colorpicker.js.map
