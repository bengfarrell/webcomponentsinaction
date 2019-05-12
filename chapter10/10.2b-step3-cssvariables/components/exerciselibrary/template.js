import Exercise from '../exercise/exercise.js';

export default {
    render(exercises) {
        return `${this.css()}
                ${this.html(exercises)}`;
    },

    html(exercises) {

        let mkup = `<h1>Exercises</h1>
                    <div id="container">`;
        for (let c = 0; c < exercises.length; c++) {
            mkup += `<wkout-exercise class="${exercises[c].type} library" ${Exercise.toAttributeString(exercises[c])}></wkout-exercise>`;
        }
        return mkup + `</div>`;
    },

    css() {
        return `<style>                                
                    :host {
                       display: inline-block;
                       font-family: var(--font);
                       color: var(--text-color);
                    }
                    
                    h1 {
                       font-size: var(--header-font-size);
                    }
                    
                    #container {
                        overflow-y: scroll;
                        height: calc(100% - 30px);
                    }
                </style>`;
    }
}
