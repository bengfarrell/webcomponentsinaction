export default {
    render() {
        return `${this.css()}
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

    css() {
        return `<style>
                    wcia-slider {
                        display: inline-block;
                        position: relative;
                        border-radius: 3px;
                    }
                    
                    .bg-overlay {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        border-radius: 3px;
                    }
                    
                    .thumb {
                        margin-top: -1px;
                        width: 5px;
                        height: calc(100% - 5px);
                        position: absolute;
                        border-style: solid;
                        border-width: 3px;
                        border-color: white;
                        border-radius: 3px;
                        pointer-events: none;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }
                </style>`;
    }
}
