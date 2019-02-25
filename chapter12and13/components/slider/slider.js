(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.slider = factory());
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

    return Slider;

}));
//# sourceMappingURL=slider.js.map
