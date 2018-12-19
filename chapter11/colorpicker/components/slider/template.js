export default {
    get _THUMB_SIZE() { return 5; },
    get THUMB_SIZE() { return this._THUMB_SIZE + 3 + 3 }, // include border thickness

    render() {
        return `${this.designSystem()}
                ${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            overlay: scope.getElementById('bg-overlay'),
            thumb: scope.getElementById('thumb'),
        }
    },

    html() {
        return `<div id="bg-overlay"></div>
                <div id="thumb"></div>`;
    },

    css() {
        return `<style>
                    :host {
                        display: inline-block;
                        position: relative;
                        border-radius: var(--border-radius);
                    }
                    
                    #bg-overlay {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        border-radius: var(--border-radius);
                    }
                    
                    #thumb {
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
