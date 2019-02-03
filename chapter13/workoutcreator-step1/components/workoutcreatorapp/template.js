import ExerciseLibrary from '../exerciselibrary/exerciselibrary.js';
import Plan from '../plan/plan.js';

export default {
    render() {
        return `${this.css()}
                ${this.html()}`;
    },

    html() {
        return `<wkout-exercise-lib></wkout-exercise-lib>
                <div id="divider-line"></div>
                <wkout-plan></wkout-plan>`;
    },

    css() {
        return `<style>
                    :host {
                       display: flex;
                    }
                    
                    wkout-exercise-lib,
                    wkout-plan {
                        flex: 1;
                        height: 100%;
                    }
                    
                    #divider-line {
                        width: 1px;
                        height: 100%;
                        margin-right: 25px;
                        background-color: var(--text-color);
                    }
                </style>`;
    }
}
