export default class BizCard extends HTMLElement {
    static get observedAttributes() { return ['layout']; }

    attributeChangedCallback(name, oldvalue, newvalue) {
        this.innerHTML = '';
        const template = document.getElementById(newvalue);
        const clone = template.content.cloneNode(true);
        this.appendChild(clone);
    }
}

if (!customElements.get('biz-card')) {
    customElements.define('biz-card', BizCard);
}
