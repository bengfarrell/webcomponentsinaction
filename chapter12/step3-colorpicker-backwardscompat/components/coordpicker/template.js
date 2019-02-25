export default {
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
}
