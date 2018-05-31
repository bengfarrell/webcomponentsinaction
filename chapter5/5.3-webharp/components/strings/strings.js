import String from '../string/string.js';

export default class Strings extends HTMLElement {
    /**
     * set points
     * @param pts
     */
    set points(pts) {
        if (!this.stringsElements) {return; }
        for (let c = 0; c < pts.length; c++) {
            if (pts[c].last && pts[c].current) {
                let magnitude = Math.abs(pts[c].current.x - pts[c].last.x);

                let xMin = Math.min(pts[c].current.x, pts[c].last.x);
                let xMax = Math.max(pts[c].current.x, pts[c].last.x);

                for (let d = 0; d < this.stringsElements.length; d++) {
                    if (xMin <= this.stringsElements[d].offsetLeft && xMax >= this.stringsElements[d].offsetLeft) {
                        let strum = {
                            direction: Math.abs(pts[c].current.x - pts[c].last.x) / (pts[c].current.x - pts[c].last.x),
                            power: magnitude,
                            position: pts[c].current.y,
                            string: d,
                            numStrings: this.stringsElements.length
                        };
                        this.stringsElements[d].strum(strum);
                    }
                }
            }
        }
    }

    connectedCallback() {
        let strings = '<div class="spacer"></div>';
        for (let c = 0; c < parseInt(this.getAttribute('numstrings')); c++) {
            strings += `<webharp-string></webharp-string>`;
        }

        strings += '<style>\
                        webharp-strings { \
                            width: 100%; \
                            height: 100%; \
                            display: flex; \
                            flex-direction: column; \
                            position: absolute; \
                        } \
                        webharp-strings > webharp-string, div.spacer { \
                            flex: 1; \
                        } \
                        webharp-strings { \
                            flex-direction: row; \
                        } \
                        webharp-strings > webharp-string { \
                            height: 100%; \
                        } \
                    </style>';
        this.innerHTML = strings;
        this.stringsElements = this.querySelectorAll('webharp-string');
    }
}

customElements.define('webharp-strings', Strings);
