import Template from './template.js';

export default class Plan extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
    }
}

if (!customElements.get('wkout-plan')) {
    customElements.define('wkout-plan', Plan);
}
