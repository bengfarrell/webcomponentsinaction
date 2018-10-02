import Template from './template.js';

export default class Plan extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.initialized) {
            this.root.innerHTML = Template.render();
            this.dom = Template.mapDOM(this.root);
        }
    }

    add(exercise) {
        this.dom.exercises.innerHTML += Template.renderExercise(exercise);
    }
}

if (!customElements.get('wkout-plan')) {
    customElements.define('wkout-plan', Plan);
}