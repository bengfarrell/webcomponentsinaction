import Template from './template.js';

class BizCard extends HTMLElement {
    connectedCallback() {
        this.innerHTML = Template.render({
            first_name: 'Emmett',
            last_name: 'Brown',
            title: 'Student of all Sciences',
            phone: '555-4385',
            email: 'emmett@docbrown.flux',
            website: 'www.docbrown.flux'
        });
    }
}

if (!customElements.get('biz-card')) {
    customElements.define('biz-card', BizCard);
}
