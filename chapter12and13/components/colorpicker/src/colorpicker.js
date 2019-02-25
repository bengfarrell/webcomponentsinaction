import Template from './template.js';
import Handlers from './handlers.js';

/**
 * design is heavily borrowed/stolen from https://cssgradient.io/
 */
export default class ColorPicker extends HTMLElement {
    static get USE_SHADOWDOM_WHEN_AVAILABLE() { return true; }

    static get DEFAULT_HEX() { return '#77aabb'; }
    static get DEFAULT_ALPHA() { return 100; }

    static get observedAttributes() {
        return ['hex', 'alpha'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        if (!this.dom) { return; }
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

        if (ColorPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow) {
            this.root = this.attachShadow({mode: 'open'});
        } else {
            this.root = this;
        }

        const observer = new MutationObserver( e => this.onMutationChange(e));
        observer.observe(this.root, { attributes: true, subtree: true });
        this.root.addEventListener('change', e => this.onInputValueChanged(e));
    }

    connectedCallback() {
        if (!this.initialized) {
            this.root.innerHTML = Template.render({ useShadowDOM: ColorPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow });
            this.dom = Template.mapDOM(this.root);
            if ( typeof cssVars !== 'undefined') {
                cssVars();
            }
            this.initialized = true;

            if (this.hex) {
                this.data = Handlers.update({
                    model: this.data,
                    dom: this.dom,
                    component: this,
                    element: this,
                    attribute: 'hex',
                });
            } else {
                this.hex = ColorPicker.DEFAULT_HEX;
            }
            if (this.alpha) {
                this.data = Handlers.update({
                    model: this.data,
                    dom: this.dom,
                    component: this,
                    element: this,
                    attribute: 'alpha',
                });
            } else {
                this.alpha = ColorPicker.DEFAULT_ALPHA;
            }
        }
    }

    onMutationChange(records) {
       records.forEach( rec => {
           if (rec.target !== this) {
               this.data = Handlers.update({
                   model: this.data,
                   dom: this.dom,
                   component: this,
                   element: rec.target,
                   attribute: rec.attributeName,
               });
           }
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
