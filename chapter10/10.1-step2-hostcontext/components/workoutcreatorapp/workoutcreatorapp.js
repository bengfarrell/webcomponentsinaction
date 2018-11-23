import Template from './template.js';
import Plan from "../plan/plan.js";
import Exercise from '../exercise/exercise.js';

export default class WorkoutCreatorApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);
        this.shadowRoot.addEventListener('click', e => this.onClick(e));
    }

    onClick(e) {
        const path = e.composedPath().reverse();
        for (let c = 0; c < path.length; c++) {
            if (path[c] instanceof Plan) {
                return;
            }
            if (path[c] instanceof Exercise) {
                const exercise = path[c];
                this.dom.plan.add(exercise);
            }
        }
    }
}

if (!customElements.get('wkout-creator-app')) {
    customElements.define('wkout-creator-app', WorkoutCreatorApp );
}
