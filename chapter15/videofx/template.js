export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            canvas: scope.querySelector('canvas'),
            video: scope.querySelector('video')
        }
    },

    html() {
        return `<video autoplay="true"></video>
                <canvas></canvas>`;
    },

    css() {
        return `<style>  
                    :host {
                        display: inline-block;
                        background-color: black;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    canvas {
                        position: absolute;
                    }
                    
                    video {
                        position: absolute;
                    }
                </style>`;
    }
}
