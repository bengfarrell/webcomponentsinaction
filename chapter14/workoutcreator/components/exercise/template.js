export default {
    render(exercise) {
        return `${this.css(exercise)}
                ${this.html(exercise)}`;
    },

    mapDOM(scope) {
        return {
            deleteBtn: scope.getElementById('delete'),
            timeInput: scope.getElementById('time'),
            countInput: scope.getElementById('count'),
            setsInput: scope.getElementById('sets'),
        }
    },

    html(exercise) {
        return `<div id="info">
                    <span id="label">${exercise.label}</span>
                    <div id="customize">
                        <label class="${exercise.time?'visible':'hidden'}">
                            <input id="time" type="number" max="999" style="width:45px;" value="${Number(exercise.time)}"> seconds
                        </label>
                        <label class="${exercise.count?'visible':'hidden'}">
                            <input id="count" type="number" max="99" style="width:35px;" value="${Number(exercise.count)}">
                        </label>
                        <label class="${exercise.sets?'visible':'hidden'}">x 
                            <input id="sets" type="number" max="9" style="width:30px;" value="${Number(exercise.sets)}"> set(s)
                        </label>
                    </div>
                    <span id="delete">x</span>
                </div>`;
    },

    css(exercise) {
        return `<style>
                    :host {
                        font-family: var(--font);
                        display: inline-block;
                        background: radial-gradient(circle, rgba(235,235,235,1) 0%, rgba(208,208,208,1) 100%);
                        background-image: url('${exercise.thumb}');
                        border-left-style: solid;
                        border-left-width: 5px;
                    }
                   
                    :host(.cardio) {
                         border-left-color: #28a7ff;
                    }  
                    
                    :host(.strength) {
                         border-left-color: #75af01;
                    }  
                    
                    #info {
                        font-size: small;
                        background-color: var(--label-color);
                        color: var(--inverted-text-color);
                        display: flex;
                        align-items: center;
                    }    
                           
                    :host(.plan.playing) #info  {
                        background-color: orangered;
                    }
                                 
                    :host(.library) {
                        width: 200px;
                        height: 200px;
                        background-size: cover;
                    }
                    
                    :host(.library) #info {
                        padding: 5px;
                    }
                    
                    :host(.library) #customize {
                        display: none;
                    }
                    
                    :host(.library) #delete {
                        display: none;
                    }
                    
                    :host(.plan) {
                        width: 100%;
                        height: 50px;
                        margin-bottom: 1px;
                        background-size: contain;
                    }
                    
                    :host(.plan) input {
                        background-color: #505050;
                        padding: 5px;
                        color: white;
                        border: none;
                    }
                    
                    :host(.plan) #delete {
                        width: 30px;
                        height: 100%;
                        line-height: 50px;
                        font-size: 12px;
                        font-family: Arial;
                        text-align: center;
                        background-color: #404040;
                        cursor: pointer;
                    }
                    
                    :host(.plan) #delete:hover {                        
                        background-color: #797979;
                    }
                    
                    :host(.plan) #info {
                        width: calc(100% - 80px);
                        height: 100%;
                        margin-left: 75px;
                        background-size: 75px 75px;
                    }

                    :host(.plan) #customize {
                        display: inline-block;
                        flex: 1;
                    }
                    
                    :host(.plan) #label {
                        padding-left: 10px;
                        font-size: 16px;
                        font-weight: bold;
                        display: inline-block;
                        flex: 1;
                    }
                    
                    :host(.plan) label.hidden {
                        display: none;
                    }
                </style>`;
    },
}
