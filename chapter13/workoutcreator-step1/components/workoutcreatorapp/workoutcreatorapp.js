import Template from './template.js';

export default class WorkoutCreatorApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
    }
}

if (!customElements.get('wkout-creator-app')) {
    customElements.define('wkout-creator-app', WorkoutCreatorApp );
}
