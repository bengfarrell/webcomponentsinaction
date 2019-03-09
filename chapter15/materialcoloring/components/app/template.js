import Scene from '../scene/scene.js';

export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            scene: scope.querySelector('mc-scene'),
            colorpicker: scope.querySelector('wcia-color-picker')
        }
    },

    html() {
        return `<mc-scene object="cube"></mc-scene>
                <div id="model-buttons">
                    <button class="object-button">cube</button>
                    <button class="object-button">sphere</button>
                    <button class="object-button">geodesic</button>
                </div>
                <wcia-color-picker class="modal" hex="#99224A"></wcia-color-picker>`;
    },

    css() {
        return `<style>
                    :host {
                        display: inline-block;
                    }
                    
                    #model-buttons {
                        position: absolute;
                        width: 100%;
                        bottom: 10px;
                        left: 10px;
                    }
                    
                    #model-buttons button {
                        font-size: 20px;
                    }
                    
                    mc-scene {
                        position: absolute;
                        width: 100%;
                    }
                    
                    wcia-color-picker {
                        position: absolute;
                        width: calc(100% - 20px);
                        margin: 10px;
                    }
                </style>`;
    }
}
