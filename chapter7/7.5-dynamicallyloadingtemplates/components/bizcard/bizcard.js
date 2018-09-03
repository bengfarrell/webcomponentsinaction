export default class BizCard extends HTMLElement {
    static get observedAttributes() { return ['layout']; }

    connectedCallback() {
        this.cardElement = document.createElement('div');
        this.templates = document.createElement('div');
        this.appendChild(this.cardElement);
        this.appendChild(this.templates);
        const request = new XMLHttpRequest();
        request.open( 'GET', 'templates.html', true );
        request.addEventListener( 'load', (event) => {
            this.templates.innerHTML = event.target.response;
            this.populateCard();
        });
        request.send();
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        if (this.templates) {
            this.populateCard();
        }
    }

    populateCard() {
        const template = this.templates.querySelector('template.' + this.getAttribute('layout'));
        if (template) {
            const clone = template.content.cloneNode(true);
            this.cardElement.innerHTML = '';
            this.cardElement.appendChild(clone);
        }
    }
}

if (!customElements.get('biz-card')) {
    customElements.define('biz-card', BizCard);
}
