import Template from './template.js';

export default class Exercise extends HTMLElement {
    static get DELETE_EVENT() { return 'onDelete'; }
    static get CHANGE_EVENT() { return 'onChange'; }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        //this.setAttribute('instance', Exercise.guid());

        const params = {
            label: this.getAttribute('label'),
            type: this.getAttribute('type'),
            thumb: this.getAttribute('thumb'),
            time: this.getAttribute('time'),
            count: this.getAttribute('count'),
            estimatedTimePerCount: this.getAttribute('estimatedtimepercount'),
            sets: this.getAttribute('sets'),
        };
        this.shadowRoot.innerHTML = Template.render(params);
        this.dom = Template.mapDOM(this.shadowRoot);

        this.dom.deleteBtn.addEventListener('click', e => this.onDelete(e));
        this.shadowRoot.addEventListener('change', e => this.onInputFieldChange(e));
    }

    onDelete() {
        const ce = new CustomEvent(Exercise.DELETE_EVENT, { bubbles: true, detail: { element: this } });
        this.dispatchEvent(ce);
    }

    onInputFieldChange(e) {
        switch (e.target) {
            case this.dom.countInput:
                this.count = e.target.value;
                break;

            case this.dom.setsInput:
                this.sets = e.target.value;
                break;

            case this.dom.timeInput:
                this.time = e.target.value;
                break;
        }
        const ce = new CustomEvent(Exercise.CHANGE_EVENT, { bubbles: true, detail: { element: this } });
        this.dispatchEvent(ce);
    }

    get instance() {
        return this.getAttribute('instance');
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(val) {
        this.setAttribute('label', val);
    }

    get thumb() {
        return this.getAttribute('thumb');
    }

    set thumb(val) {
        this.setAttribute('thumb', val);
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(val) {
        this.setAttribute('type', val);
    }

    get time() {
        return this.getAttribute('time');
    }

    set time(val) {
        this.setAttribute('time', val);
    }

    get count() {
        return this.getAttribute('count');
    }

    set count(val) {
        this.setAttribute('count', val);
    }

    get estimatedTimePerCount() {
        return this.getAttribute('estimatedtimepercount');
    }

    set estimatedTimePerCount(val) {
        this.setAttribute('estimatedtimepercount', val);
    }

    get sets() {
        return this.getAttribute('sets');
    }

    set sets(val) {
        this.setAttribute('sets', val);
    }

    serialize() {
        return {
            label: this.label,
            type: this.type,
            thumb: this.thumb,
            time: this.time,
            count: this.count,
            estimatedTimePerCount: this.estimatedTimePerCount,
            sets: this.sets,
        }
    }

    static toAttributeString(obj) {
        let attr = '';
        for (let key in obj) {
            if (obj[key]) {
                attr += key + '="' + obj[key] + '" ';
            }
        }
        return attr;
    }

    /*static get guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }*/
}

if (!customElements.get('wkout-exercise')) {
    customElements.define('wkout-exercise', Exercise);
}
