import Template from './template.js';

export default class CoordPicker extends HTMLElement {
    static get observedAttributes() {
        return ['x', 'y', 'backgroundcolor'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
        switch (name) {
            case 'x':
            case 'y':
                this.refreshCoordinates();
                break;

            case 'backgroundcolor':
                this.style.backgroundColor = newValue;
                break;
        }
    }

    set x(val) {
        this.setAttribute('x', val);
    }

    get x() {
        return this.getAttribute('x');
    }

    set y(val) {
        this.setAttribute('y', val);
    }

    get y() {
        return this.getAttribute('y');
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


    eventHandler(e) {
        const bounds = this.getBoundingClientRect();
        const coords = {
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top
        };
        switch (e.type) {
            case 'mousedown':
                this.isDragging = true;
                this.updateXY(coords.x, coords.y);
                this.refreshCoordinates();
                break;

            case 'mouseup':
                this.isDragging = false;
                break;

            case 'mousemove':
                if (this.isDragging) {
                    this.updateXY(coords.x, coords.y);
                    this.refreshCoordinates();
                }
                break;
        }
    }

    updateXY(x, y) {
        let hPos = x - this.dom.thumb.offsetWidth/2;
        let vPos = y - this.dom.thumb.offsetHeight/2;
        if (hPos > this.offsetWidth) {
            hPos = this.offsetWidth;
        }
        if (hPos < 0) {
            hPos = 0;
        }
        if (vPos > this.offsetHeight) {
            vPos = this.offsetHeight;
        }
        if (vPos < 0) {
            vPos = 0;
        }
        this.x = (hPos / this.offsetWidth) * 100;
        this.y = (vPos / this.offsetHeight) * 100;
    }

    refreshCoordinates() {
        this.dom.thumb.style.left = (this.x/100 * this.offsetWidth - this.dom.thumb.offsetWidth/2) + 'px';
        this.dom.thumb.style.top = (this.y/100 * this.offsetHeight - this.dom.thumb.offsetWidth/2) + 'px';
    }
}

if (!customElements.get('wcia-coord-picker')) {
    customElements.define('wcia-coord-picker', CoordPicker);
}
