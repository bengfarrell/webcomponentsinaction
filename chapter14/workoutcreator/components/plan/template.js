import Exercise from '../exercise/exercise.js';
import WorkoutPlanData from '../../data/workoutplan.js';

export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            exercises: scope.querySelector('#container'),
            time: scope.querySelector('#time'),
            saveButton: scope.querySelector('#savebutton'),
            playButton: scope.querySelector('#workoutbutton'),
            clearButton: scope.querySelector('#clearbutton'),
            planName: scope.querySelector('#planname'),
            menu: scope.querySelector('#menu')
        }
    },

    renderSavedPlans() {
        const saved = WorkoutPlanData.saved;
        let options = '<option value="none">Load a saved plan</option>';
        for (let c = 0; c < saved.length; c++) {
            options += `<option value="${saved[c]}">${saved[c]}</option>`;
        }
        return `<select id="menu">${options}</select>`;
    },

    renderExercises(exercises) {
        let html = '';
        for (let c = 0; c < exercises.length; c++) {
            html += this.renderExercise(exercises[c]);
        }
        return html;
    },

    renderExercise(exercise) {
        if (exercise.serialize) {
            exercise = exercise.serialize();
        }
        return `<wkout-exercise class="${exercise.type} plan" ${Exercise.toAttributeString(exercise)}></wkout-exercise>`
    },

    html() {
        return `<h1 contenteditable="true" id="planname">My Plan</h1>

                <div>
                    <button id="savebutton">Save Plan</button>
                    <button id="clearbutton">Clear Plan</button>
                    <button id="workoutbutton">Do Workout</button>
                    ${this.renderSavedPlans()}
                </div>
                
                <div id="container"></div>
                <div>Total Time: <span id="time"></span></div>`;
    },

    css() {
        return `<style>    
                    :host {
                        display: flex;
                        flex-direction: column;
                        font-family: var(--font);
                        color: var(--text-color);
                    }
                    
                    h1 {
                        font-size: var(--header-font-size); 
                        margin-bottom: 0; 
                        border-style: solid;
                        border-width: 1px;
                        border-color: #cacaca;
                        padding: 5px;
                        display: inline-block;
                    }
                    
                    #time {
                        height: 30px;
                    }
                                        
                    #container {
                        background: linear-gradient(90deg, rgba(235,235,235,1) 0%, rgba(208,208,208,1) 100%);
                        width: 100%;
                        height: calc(100% - 60px);
                        overflow-y: scroll;
                        margin-top: 5px;
                    }
                </style>`;
    },
}
