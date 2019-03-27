import Strings from '../strings/strings.js';
import HandTracker from '../../../videofx/handtracker.js';

export default class WebHarpApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                wcia-handtracker {
                    position: absolute;
                    background: none;
                    width: 100%;
                    height: 100%;
                }
                webharp-strings {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <wcia-handtracker useCamera useCanvasForDisplay canvasRefreshInterval="50"></wcia-handtracker>
            <webharp-strings strings="${this.getAttribute('strings')}"></webharp-strings>`;

        this.stringsElement = this.querySelector('webharp-strings');
        this.addEventListener(HandTracker.HAND_LOCATION, e => this.onMouseMove(e));
    }

    onMouseMove(event) {
        if (event.detail.points.length > 0) {
            this.stringsElement.points = { last: this.lastPoint, current: { x: event.detail.points[0].x, y: event.detail.points[0].y } };
            this.lastPoint = { x: event.detail.points[0].x, y: event.detail.points[0].y };
        }
    }
}

if (!customElements.get('webharp-app')) {
    customElements.define('webharp-app', WebHarpApp);
}
