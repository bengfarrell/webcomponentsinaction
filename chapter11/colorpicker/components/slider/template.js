export default {
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
                        width: 5px;
                        height: calc(100% - 5px);
                        position: absolute;
                        border-style: solid;
                        border-width: var(--border-width-thick);
                        border-color: var(--border-inverted-color);
                        border-radius: var(--border-radius);
                        pointer-events: none;
                    }
                </style>`;
    },

    designSystem() {
        return ``;
    }
}
