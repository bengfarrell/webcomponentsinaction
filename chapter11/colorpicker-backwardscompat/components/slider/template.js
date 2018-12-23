export default {
    get _THUMB_SIZE() { return 5; },
    get THUMB_SIZE() { return this._THUMB_SIZE + 3 + 3 }, // include border thickness

    render(opts) {
        return `${this.designSystem()}
                ${this.css(opts.useShadowDOM)}
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
        const comp = 'cp-slider';
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
                        width: ${this._THUMB_SIZE}px;
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
    },

    designSystem() {
        return ``;
    }
}
