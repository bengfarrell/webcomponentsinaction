import Template from './template.js';

export default class WorkoutCreatorApp extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.initialized) {
            this.root.innerHTML = Template.render();
            this.dom = Template.mapDOM(this.root);
            this.root.addEventListener('click', e => this.onClick(e));
        }
    }
}

if (!customElements.get('wkout-creator-app')) {
    customElements.define('wkout-creator-app', WorkoutCreatorApp );
}