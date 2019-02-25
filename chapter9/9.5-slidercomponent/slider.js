import Template from './template.js';

export default class Slider extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'backgroundcolor'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        switch (name) {
            case 'value':
                this.refreshSlider(newValue);
                break;

            case 'backgroundcolor':
                this.setColor(newValue);
                break;
        }
    }

    set value(val) {
        this.setAttribute('value', val);
    }

    get value() {
        return this.getAttribute('value');
    }

    set backgroundcolor(val) {
        this.setAttribute('backgroundcolor', val);
    }

    get backgroundcolor() {
        return this.getAttribute('backgroundcolor');
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);

        document.addEventListener('mousemove', e => this.eventHandler(e));
        document.addEventListener('mouseup', e => this.eventHandler(e));
        this.addEventListener('mousedown', e => this.eventHandler(e));
    }


    setColor(color) {
        this.dom.overlay.style.background = `linear-gradient(to right, ${color} 0%, ${color}00 100%)`;
    }

    refreshSlider(value) {
         this.dom.thumb.style.left = (value/100 * this.offsetWidth - this.dom.thumb.offsetWidth/2) + 'px';
    }

    updateX(x) {
        let hPos = x - this.dom.thumb.offsetWidth/2;
        if (hPos > this.offsetWidth) {
            hPos = this.offsetWidth;
        }
        if (hPos < 0) {
            hPos = 0;
        }
        this.value = (hPos / this.offsetWidth) * 100;
    }

    eventHandler(e) {
        const bounds = this.getBoundingClientRect();
        const x = e.clientX - bounds.left;

        switch (e.type) {
            case 'mousedown':
                this.isDragging = true;
                this.updateX(x);
                this.refreshSlider(this.value);
                break;

            case 'mouseup':
                this.isDragging = false;
                break;

            case 'mousemove':
                if (this.isDragging) {
                    this.updateX(x);
                    this.refreshSlider(this.value);
                }
                break;
        }
    }
}

if (!customElements.get('wcia-slider')) {
    customElements.define('wcia-slider', Slider);
}
