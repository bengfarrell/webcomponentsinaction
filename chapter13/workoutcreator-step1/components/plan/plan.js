import Template from './template.js';
import Exercise from '../exercise/exercise.js';

export default class Plan extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);

        this.dom.exercises.addEventListener(Exercise.DELETE_EVENT, e => this.deleteExercise(e));
        this.dom.exercises.addEventListener(Exercise.CHANGE_EVENT, e => this.changeExercise(e));

        this.updateTime();
    }

    add(exercise) {
        this.dom.exercises.innerHTML += Template.renderExercise(exercise);
        this.updateTime();
    }

    deleteExercise(e) {
        this.dom.exercises.removeChild(e.detail.element);
        this.updateTime();
    }

    changeExercise(e) {
        this.updateTime();
    }

    updateTime() {
        let ttlTime = 0;
        const exercises = this.dom.exercises.children;
        for (let c = 0; c < exercises.length; c++) {
            const exercise = exercises[c].serialize();
            if (exercise.time) {
                ttlTime += exercise.time * exercise.sets;
            } else {
                ttlTime += exercise.estimatedTimePerCount * exercise.count * exercise.sets;
            }
        }
        this.dom.time.innerHTML = this.formatTime(ttlTime);
    }

    formatTime(seconds) {
        return new Date(1000 * seconds).toISOString().substr(11, 8);
    }
}

if (!customElements.get('wkout-plan')) {
    customElements.define('wkout-plan', Plan);
}
