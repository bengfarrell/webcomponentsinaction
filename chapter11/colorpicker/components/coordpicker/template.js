export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            thumb: scope.getElementById('thumb')
        }
    },

    html() {
        return `<div id="bg-overlay-a"></div>
                <div id="bg-overlay-b"></div>
                <div id="thumb"></div>`;
    },

    css() {
        return `<style>
                    :host {
                        display: inline-block;
                        position: relative;
                    }
                    
                    #bg-overlay-a {
                        width: 100%;
                        height: 100%;
                        border-radius: var(--border-radius);
                        position: absolute;
                        background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);
                    }
                    
                    #bg-overlay-b {
                        width: 100%;
                        height: 100%;
                        border-radius: var(--border-radius);
                        position: absolute;
                        background: linear-gradient(to bottom, transparent 0%, #000 100%);
                    }
                    
                    #thumb {
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
