(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.coordpicker = factory());
}(this, function () { 'use strict';

    var Template = {
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
                this.root.innerHTML = Template.render( { useShadowDOM: CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow });
                this.dom = Template.mapDOM(this.root);
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

    return CoordPicker;

}));
//# sourceMappingURL=coordpicker.js.map
