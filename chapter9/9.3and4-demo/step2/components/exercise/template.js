export default {
    render(exercise) {
        return `${this.css(exercise)}
                ${this.html(exercise)}`;
    },

    html(exercise) {
        return `<div id="info">
                    <span id="label">${exercise.label}</span>
                </div>`;
    },

    css(exercise) {
        return `<style>
                    :host {
                        display: inline-block;
                        background: radial-gradient(circle, rgba(235,235,235,1) 0%, rgba(208,208,208,1) 100%);
                        /*background-image: url('${exercise.thumb}');*/
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
                        display: flex;
                        align-items: center;
                        background-color: black;
                        color: white;
                    }    
                                 
                    :host {
                        width: 200px;
                        height: 200px;
                        background-size: cover;
                    }
                    
                    :host #info {
                        padding: 5px;
                    }
                </style>`;
    },
}
