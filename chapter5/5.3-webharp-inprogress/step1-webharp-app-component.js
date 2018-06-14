import Strings from './step1-strings-component.js';

export default class WebHarpApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<webharp-strings strings="' + this.getAttribute('strings') + '"></webharp-strings>';
    }
}

if (!customElements.get('webharp-app')) {
    customElements.define('webharp-app', WebHarpApp);
}
