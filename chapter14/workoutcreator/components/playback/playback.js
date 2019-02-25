import Template from './template.js';
import EventBus from '../../data/eventbus.js';
import WorkoutPlanData from '../../data/workoutplan.js';

export default class Playback extends HTMLElement {
    static get ACTIVATE_PLAYBACK_EVENT() { return 'activate_playback_event'; }

    static get observedAttributes() {
        return ['active'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        if (name === 'active') {
            this.classList.toggle('active', newValue);

            WorkoutPlanData.stop();
            this.dom.playButton.innerText = 'Play';

            if (newValue === 'true') {
                this.dom.currentExercise.innerHTML = WorkoutPlanData.currentExercise.label;
                this.dom.window.style.backgroundImage = `url("${WorkoutPlanData.currentExercise.thumb}")`;
                this.dom.timer.innerHTML = Template.renderTime(0, WorkoutPlanData.currentExercise );
            }
        }
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);

        this.dom.closeButton.addEventListener('click', () => {
            this.active = false;
        });

        this.dom.playButton.addEventListener('click', (e) => {
            if (e.target.innerText === 'Play') {
                e.target.innerText = 'Pause';
                WorkoutPlanData.play();
            } else {
                e.target.innerText = 'Play';
                WorkoutPlanData.pause();
            }
        });

        EventBus.addEventListener(Playback.ACTIVATE_PLAYBACK_EVENT, e => {
            this.active =  true;
        });

        EventBus.addEventListener(WorkoutPlanData.PLAYLIST_UPDATE_EVENT, e => {
            if (e.detail.exercise) {
                if (e.detail.exerciseChanged) {
                    this.dom.currentExercise.innerHTML = e.detail.exercise.label;
                    this.dom.window.style.backgroundImage = `url("${e.detail.exercise.thumb}")`;
                }
                this.dom.timer.innerHTML = Template.renderTime(e.detail.time, e.detail.exercise);
            }
        });
    }

    get active() {
        return this.getAttribute('active');
    }

    set active(val) {
        if (val) {
            this.setAttribute('active', true);
        } else {
            this.removeAttribute('active');
        }
    }

}

if (!customElements.get('wkout-playback')) {
    customElements.define('wkout-playback', Playback);
}
