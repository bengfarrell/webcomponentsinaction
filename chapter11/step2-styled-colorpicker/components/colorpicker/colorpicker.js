import Template from './template.js';
import Handlers from './handlers.js';

/**
 * design is heavily borrowed/stolen from https://cssgradient.io/
 */
export default class ColorPicker extends HTMLElement {
    static get DEFAULT_HEX() { return '#77aabb'; }

    static get DEFAULT_ALPHA() { return 100; }

    static get observedAttributes() {
        return ['hex', 'alpha'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        switch (name) {
            case 'hex':
            case 'alpha':
                if (oldVal !== newValue) {
                    this.data = Handlers.update({
                        model: this.data,
                        dom: this.dom,
                        component: this,
                        element: this,
                        attribute: name,
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
        observer.observe(this.shadowRoot, { attributes: true, subtree: true });
        this.shadowRoot.addEventListener('change', e => this.onInputValueChanged(e));
    }

    connectedCallback() {
        if (!this.hex) {
            this.hex = ColorPicker.DEFAULT_HEX;
        }
        if (!this.alpha) {
            this.alpha = ColorPicker.DEFAULT_ALPHA;
        }
    }

    onMutationChange(records) {
       records.forEach( rec => {
           this.data = Handlers.update({
               model: this.data,
               dom: this.dom,
               component: this,
               element: rec.target,
               attribute: rec.attributeName,
           });
       });
    }

    onInputValueChanged(e) {
        this.data = Handlers.update( {
            model: this.data,
            dom: this.dom,
            component: this,
            element: e.target,
        });
    }
}

if (!customElements.get('wcia-color-picker')) {
    customElements.define('wcia-color-picker', ColorPicker);
}
