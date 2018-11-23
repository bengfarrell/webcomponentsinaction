import Template from './template.js';
import Plan from "../../components/plan/plan.js";
import Exercise from '../exercise/exercise.js';

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
