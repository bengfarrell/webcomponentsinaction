import Template from './template.js';
import Library from '../../data/exerciselibrary.js';
import WorkoutPlanData from '../../data/workoutplan.js';

export default class ExerciseLibrary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render(Library.all);
        this.shadowRoot.addEventListener('click', e => {
            if (e.target.constructor.name === 'Exercise') {
                WorkoutPlanData.add(e.target.serialize());
            }
        })
    }
}

if (!customElements.get('wkout-exercise-lib')) {
    customElements.define('wkout-exercise-lib', ExerciseLibrary);
}
