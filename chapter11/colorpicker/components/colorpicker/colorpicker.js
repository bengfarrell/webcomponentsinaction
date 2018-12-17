import Template from './template.js';
import Handlers from './handlers.js';

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
                if (this._ignoreNextAttributeChange) {
                    this._ignoreNextAttributeChange = false;
                    return;
                }
                if (oldVal !== newValue) {
                    Handlers.update({
                        model: this.data,
                        dom: this.dom,
                        element: this,
                        attribute: name,
                        changeType: Handlers.ATTRIBUTE_INPUT
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
        this._ignoreNextAttributeChange = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);
        const observer = new MutationObserver( e => this.onMutationChange(e));
        observer.observe(this.shadowRoot, { attributes: true, subtree: true });
        this.shadowRoot.addEventListener('change', e => this.onInputValueChanged(e));
    }

    onMutationChange(records) {
       records.forEach( rec => {
           this.data = Handlers.update({
               model: this.data,
               dom: this.dom,
               element: rec.target,
               attribute: rec.attributeName,
               changeType: Handlers.MOUSE_INPUT
           });
       });

       this._ignoreNextAttributeChange = true;
       this.hex = this.data.color.hex;
       this._ignoreNextAttributeChange = true;
       this.alpha = this.data.color.transparency;
    }

    onInputValueChanged(e) {
        this.data = Handlers.update( {
            model: this.data,
            dom: this.dom,
            element: e.target,
            changeType: Handlers.TEXT_INPUT
        });

        this._ignoreNextAttributeChange = true;
        this.hex = this.data.color.hex;
        this._ignoreNextAttributeChange = true;
        this.alpha = this.data.color.transparency;
    }
}

if (!customElements.get('cp-color-picker')) {
    customElements.define('cp-color-picker', ColorPicker);
}
