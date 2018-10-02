import Exercise from '../exercise/exercise.js';

export default {
    render(exercises) {
        return `${this.css()}
                ${this.html(exercises)}`;
    },

    mapDOM(scope) {
        return {};
    },

    html(exercises) {

        let mkup = `<h1>Exercises</h1>
                    <div id="container">`;
        for (let c = 0; c < exercises.length; c++) {
            mkup += `<wkout-exercise class="${exercises[c].type}" ${Exercise.toAttributeString(exercises[c])}></wkout-exercise>`;
        }
        return mkup + `</div>`;
    },

    css() {
        return `<style>                                
                    :host {
                        display: flex;
                        flex-direction: column;
                        font-family: var(--font);
                        color: var(--text-color);
                    }
                    
                    #container {
                        overflow-y: scroll;
                        width: 100%;
                        height: calc(100% - 30px);
                    }
                    
                    h1 {
                        font-size: var(--header-font-size);
                    }
                </style>`;
    }
}
