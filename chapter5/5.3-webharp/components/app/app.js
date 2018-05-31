import Strings from '../strings/strings.js';

export default class App extends HTMLElement {
    connectedCallback() {
        let numStrings = this.getAttribute('horizontal');
        this.innerHTML = '<webharp-strings numstrings="10"></webharp-strings>';
        this.stringsElement = this.querySelector('webharp-strings');
        this.lastPoint = null;
        document.addEventListener('mousemove', e => this.onMouseMove(e));
    }

    onMouseMove(event) {
        this.stringsElement.points = [ { last: this.lastPoint, current: { x: event.pageX, y: event.pageY } } ];
        this.lastPoint = { x: event.pageX, y: event.pageY };
    }
}

customElements.define('webharp-app', App);
