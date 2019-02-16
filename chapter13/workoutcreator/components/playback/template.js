import Exercise from '../exercise/exercise.js';
import WorkoutPlanData from "../../data/workoutplan.js";

export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    mapDOM(scope) {
        return {
            closeButton: scope.querySelector('#close-button'),
            playButton: scope.querySelector('#play-button'),
            timer: scope.querySelector('#timer'),
            currentExercise: scope.querySelector('#current-exercise-name'),
            window: scope.querySelector('#modal-window')
        }
    },

    renderTime(currentTime, exercise) {
        return `<div>Time until next: 
                    ${WorkoutPlanData.formatTime(
                        WorkoutPlanData.getDurationOfExercise(exercise) - (currentTime - WorkoutPlanData.getExerciseStartTime(exercise)))}</div>
                <div>Total time: ${WorkoutPlanData.formatTime(currentTime)} /  
                    ${WorkoutPlanData.formatTime(WorkoutPlanData.totalDuration)}</div>`;
    },

    html() {
        return `<div id="modal">
                    <div id="modal-blackout"></div>
                    <div id="modal-window">
                        <div id="banner">
                            <button id="play-button">Play</button>
                            <div id="banner-label">Workout Player - <span id="current-exercise-name"></span></div>
                            <button id="close-button">x</button>
                        </div>
                        <div id="timer"></div>
                    </div>
                </div>`;
    },

    css() {
        return `<style>
                    :host {
                        display: inline-block;
                        font-family: var(--font);
                    }
                    
                    :host(.active) #modal {
                        display: inline-block;
                    }
                    
                    #timer {
                        background-color: #0a0a0a;
                        color: white;
                        position: absolute;
                        width: calc(100% - 16px);
                        bottom: 0;
                        line-height: 21px;
                        padding: 8px;
                    }
                    
                    #banner {
                        background-color: #0a0a0a;
                        height: 50px;
                        display: flex;
                        color: white;
                        align-items: center;
                    }
                    
                    #banner-label {
                        flex: 1;
                    }
                    
                    #play-button {
                        height: 100%;
                        width: 80px;
                        margin-right: 10px;
                    }
                    
                    #close-button {
                        border: none;
                        color: white;
                        font-weight: bolder;
                        font-size: large;
                        height: 100%;
                        background-color: #4a4a4a;
                        width: 50px;
                    }
                    
                    #close-button:hover {
                        background-color: #9a9a9a;
                    }
         
                    #modal {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        display: none;
                    }
                    
                    #modal-window {
                        width: 600px;
                        height: 600px;
                        margin: 50px;
                        background-color: white;
                        position: absolute;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: contain;
                    }
                    
                    #modal-blackout {
                        width: 100%;
                        height: 100%;
                        opacity: .75;
                        background-color: black;
                        position: absolute;
                    }

                </style>`;
    },
}
