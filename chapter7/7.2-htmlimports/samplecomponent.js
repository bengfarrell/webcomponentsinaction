class SampleComponent extends HTMLElement {
    connectedCallback() {
        HTMLImports.whenReady( () => {
            const template = ownerDoc.querySelector('template');
            const clone = template.content.cloneNode(true);
            this.appendChild(clone);
        });
    }
}

const ownerDoc = HTMLImports.importForElement(document.currentScript);
if (!customElements.get('sample-component')) {
    customElements.define('sample-component', SampleComponent);
}
