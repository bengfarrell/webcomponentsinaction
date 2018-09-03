import Template from './template.js';
import {render} from './lit-html/lit-html.js';

class BizCard extends HTMLElement {
    connectedCallback() {
        render(Template.render(this, {
            first_name: 'Emmett',
            last_name: 'Brown',
            title: 'Student of all Sciences',
            phone: '555-4385',
            email: 'emmett@docbrown.flux',
            website: 'www.docbrown.flux',

            backgroundChoices: [
                { name: 'big dots', uri: './images/big-dot-pattern.png'},
                { name: 'little dots', uri: './images/tiny-dot-pattern.png'},
                { name: 'squares', uri: './images/square-pattern.png'},
                { name: 'stripes', uri: './images/stripes-pattern.png'},
                { name: 'diamond', uri: './images/diamond-pattern.png'},
            ],
            logoChoices: [
                { name: 'mobius strip', uri: './images/mobius-logo.png'},
                { name: 'shopping bag', uri: './images/bag-logo.png'},
                { name: 'copper splash', uri: './images/splash-logo.png'},
                { name: 'star', uri: './images/star-logo.png'},
                { name: 'cone', uri: './images/cone-logo.png'},
            ],
        }), this);

        this.dom = Template.mapDOM(this);
        this.updateGraphics();
    }

    updateGraphics() {
        this.dom.background.style.backgroundImage = `url("${this.dom.backgroundPicker.value}")`;
        this.dom.logo.style.backgroundImage = `url("${this.dom.logoPicker.value}")`;
    }
}

if (!customElements.get('biz-card')) {
    customElements.define('biz-card', BizCard);
}
