import Template from './template.js';
import WorkoutPlanData from '../../data/workoutplan.js';
import EventBus from '../../data/eventbus.js';
import Playback from '../playback/playback.js';

export default class Plan extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);

        this.dom.saveButton.addEventListener('click', e => {
            WorkoutPlanData.save(this.dom.planName.innerText);
        });

        this.dom.clearButton.addEventListener('click', e => {
            WorkoutPlanData.clear();
        });

        this.dom.playButton.addEventListener('click', e => {
            if (WorkoutPlanData.exercises.length === 0) {
                alert('Please add exercises to your workout');
                return;
            }
            EventBus.dispatchEvent(new CustomEvent(Playback.ACTIVATE_PLAYBACK_EVENT));
        });

        this.dom.menu.addEventListener('change', e => {
            WorkoutPlanData.load(this.dom.menu.value);
        });

        EventBus.addEventListener(WorkoutPlanData.PLAYLIST_UPDATE_EVENT, e => {
            for (let c = 0; c < this.dom.exercises.children.length; c++) {
                if (e.detail.exercise && this.dom.exercises.children[c].getAttribute('id') === e.detail.exercise.id) {
                    this.dom.exercises.children[c].classList.add('playing');
                } else {
                    this.dom.exercises.children[c].classList.remove('playing');
                }
            }
        });

        EventBus.addEventListener(WorkoutPlanData.WORKOUT_PLAN_CHANGE_EVENT, e => this.onWorkoutPlanChange(e));

        this.dom.time.innerHTML = new Date(0).toISOString().substr(11, 8);
    }

    /**
     * handle data model changes and reflect in component UI
     * @param e
     */
    onWorkoutPlanChange(e) {
        this.dom.time.innerHTML = WorkoutPlanData.formatTime(e.detail.duration);

        switch (e.detail.action) {
            case WorkoutPlanData.WORKOUT_PLAN_ADD_ACTION:
                this.dom.exercises.innerHTML += Template.renderExercise(e.detail.exercise);
                break;

            case WorkoutPlanData.WORKOUT_PLAN_CLEAR_ACTION:
                this.dom.exercises.innerHTML = '';
                break;

            case WorkoutPlanData.WORKOUT_PLAN_LOAD_ACTION:
                this.dom.exercises.innerHTML = Template.renderExercises(e.detail.exercises);
                break;

            case WorkoutPlanData.WORKOUT_PLAN_DELETE_ACTION:
                for (let c = 0; c < this.dom.exercises.children.length; c++) {
                    if (e.detail.exercise.id === this.dom.exercises.children[c].id ) {
                        this.dom.exercises.removeChild(this.dom.exercises.children[c]);
                        return;
                    }
                }
                break;

            case WorkoutPlanData.WORKOUT_PLAN_EDIT_ACTION:
                break;
        }
    }
}

if (!customElements.get('wkout-plan')) {
    customElements.define('wkout-plan', Plan);
}
