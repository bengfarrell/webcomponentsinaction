import Template from './template.js';

export default class Plan extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);
    }

    add(exercise) {
        this.dom.exercises.innerHTML += Template.renderExercise(exercise);
    }
}

if (!customElements.get('wkout-plan')) {
    customElements.define('wkout-plan', Plan);
}