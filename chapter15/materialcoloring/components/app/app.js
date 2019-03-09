import Template from './template.js';

export default class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render();
        this.dom = Template.mapDOM(this.shadowRoot);

        const observer = new MutationObserver( e => this.onMutationChange(e));
        observer.observe(this.dom.colorpicker, { attributes: true });

        this.shadowRoot.addEventListener('click', e => this.onClick(e));
        this.dom.scene.color = this.dom.colorpicker.hex;
        this.dom.scene.alpha = this.dom.colorpicker.alpha;
    }

    onClick(e) {
        if (e.target.classList.contains('object-button')) {
            this.dom.scene.object = e.target.innerText;
        }
    }

    onMutationChange(changes) {
        for (let c = 0; c < changes.length; c++) {
            switch (changes[c].attributeName) {
                case 'hex':
                    this.dom.scene.color = this.dom.colorpicker.hex;
                    break;

                case 'alpha':
                    this.dom.scene.alpha = this.dom.colorpicker.alpha;
                    break;
            }
        }
    }
}

if (!customElements.get('mc-app')) {
    customElements.define('mc-app', App);
}
