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
                        border-radius: 10px;
                    }
                    
                    #bg-overlay {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        border-radius: 10px;
                    }
                    
                    #thumb {
                        width: 5px;
                        height: calc(100% - 5px);
                        position: absolute;
                        border-style: solid;
                        border-width: 3px;
                        border-color: white;
                        border-radius: 10px;
                        pointer-events: none;
                    }
                </style>`;
    },

    designSystem() {
        return ``;
    }
}
