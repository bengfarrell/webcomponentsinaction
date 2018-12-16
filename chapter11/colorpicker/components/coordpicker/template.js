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
                        border-radius: 10px;
                        position: absolute;
                        background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);
                    }
                    
                    #bg-overlay-b {
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                        position: absolute;
                        background: linear-gradient(to bottom, transparent 0%, #000 100%);
                    }
                    
                    #thumb {
                        width: 5px;
                        height: 5px;
                        position: absolute;
                        border-style: solid;
                        border-width: 3px;
                        border-color: white;
                        border-radius: 10px;
                        pointer-events: none;
                    }
                </style>`;
    }
}
