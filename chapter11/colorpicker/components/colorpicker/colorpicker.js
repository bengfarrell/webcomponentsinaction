import Template from './template.js';
import States from './states.js';

/**
 * design is heavily borrowed/stolen from https://cssgradient.io/
 */
export default class ColorPicker extends HTMLElement {
    static get observedAttributes() {
        return ['hex', 'alpha'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        switch (name) {
            case 'hex':
            case 'alpha':
                if (oldVal !== newValue) {
                    States.handle({
                        model: this.data,
                        dom: this.dom,
                        element: this,
                        attribute: name,
                        changeType: States.ATTRIBUTE_INPUT
                    });
                }
                break;
        }
    }

    set hex(val) {
        this.setAttribute('hex', val);
    }

    get hex() {
        return this.getAttribute('hex');
    }

    set alpha(val) {
        this.setAttribute('alpha', val);
    }

    get alpha() {
        return this.getAttribute('alpha');
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);
        const observer = new MutationObserver( e => this.onMutationChange(e));
        observer.observe(this.shadowRoot, { attributes: true, attributeOldValue: true, subtree: true });
        this.shadowRoot.addEventListener('change', e => this.onInputValueChanged(e));
    }

    onMutationChange(records) {
       records.forEach( rec => {
           this.data = States.handle({
               model: this.data,
               dom: this.dom,
               element: rec.target,
               attribute: rec.attributeName,
               changeType: States.MOUSE_INPUT
           });
       });
       this.hex = this.data.color.hex;
       this.alpha = this.data.color.transparency;
    }

    onInputValueChanged(e) {
        this.data = States.handle( {
            model: this.data,
            dom: this.dom,
            element: e.target,
            changeType: States.TEXT_INPUT
        });
        this.hex = this.data.color.hex;
        this.alpha = this.data.color.transparency;
    }
}

if (!customElements.get('cp-color-picker')) {
    customElements.define('cp-color-picker', ColorPicker);
}
