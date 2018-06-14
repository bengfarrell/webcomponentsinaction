import Strings from '../strings/strings.js';

export default class WebHarpApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<webharp-strings strings="' + this.getAttribute('strings') + '"></webharp-strings>';
        this.stringsElement = this.querySelector('webharp-strings');
        this.addEventListener('mousemove', e => this.onMouseMove(e));
    }

    onMouseMove(event) {
        this.stringsElement.points = { last: this.lastPoint, current: { x: event.pageX, y: event.pageY } };
        this.lastPoint = { x: event.pageX, y: event.pageY };
    }
}

if (!customElements.get('webharp-app')) {
    customElements.define('webharp-app', WebHarpApp);
}
