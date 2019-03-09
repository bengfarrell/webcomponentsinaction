export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            scene: scope.querySelector('canvas')
        }
    },

    html() {
        return `<canvas touch-action="none"></canvas>`;
    },

    css() {
        return `<style>  
                  :host {
                    display: inline-block;
                    width: 100%;
                    height: 100%;   
                  }
                  canvas {
                    width: 100%;
                    height: 100%;   
                  }  
                </style>`;
    }
}
