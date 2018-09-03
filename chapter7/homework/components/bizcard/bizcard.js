import Template from './template.js';

export default class BizCard extends HTMLElement {
    static get observedAttributes() { return ['layout']; }

    connectedCallback() {
        // attach the Shadom DOM to use slots
        this.root = this.attachShadow({mode: 'open'});

        // Render HTML into the shadow root
        this.root.innerHTML = Template.render({
            backgroundChoices: [
                { name: 'default', uri: './images/big-dot-pattern.png' },
                { name: 'little dots', uri: './images/tiny-dot-pattern.png'},
                { name: 'squares', uri: './images/square-pattern.png'},
                { name: 'stripes', uri: './images/stripes-pattern.png'},
                { name: 'diamond', uri: './images/diamond-pattern.png'},
            ],
            logoChoices: [
                { name: 'default', uri: './images/mobius-logo.png' },
                { name: 'shopping bag', uri: './images/bag-logo.png'},
                { name: 'copper splash', uri: './images/splash-logo.png'},
                { name: 'star', uri: './images/star-logo.png'},
                { name: 'cone', uri: './images/cone-logo.png'},
        ]});

        // Cache our component elements
        this.dom = Template.mapDOM(this.root);

        // Listen for changes from the background and logo menus
        this.dom.backgroundPicker.addEventListener( 'change', e => this.updateGraphics() );
        this.dom.logoPicker.addEventListener( 'change', e => this.updateGraphics() );

        // Make the network request our to our templates.html file
        const request = new XMLHttpRequest();
        request.open( 'GET', 'templates.html', true );
        request.addEventListener( 'load', (event) => {

            // set the inner HTML of our cached/query selected template container with our templates response
            this.dom.templateContainer.innerHTML = event.target.response;

            // populate with the current card as specified by the layout attribute
            this.populateCard();
        });
        request.send();
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        // this.dom might not exist because attributeChangedCallback
        // may have been fired before setup in connectedCallback
        if (this.dom) {
            // populate with the current card as specified by the layout attribute
            this.populateCard();
        }
    }

    populateCard() {
        // get the template with class of the value of the layout attribute
        const template = this.dom.templateContainer.querySelector('template.' + this.getAttribute('layout'));

        if (template) { // if found
            const clone = template.content.cloneNode(true); // clone the template
            this.dom.cardContainer.innerHTML = ''; // clear the precached card container div
            this.dom.cardContainer.appendChild(clone); // add the templaet clone to the card container div

            // requery select our DOM elements, with the new layout,
            // our background and logo are now different elements
            // (we could query select here, but it's easier though slightly more wasteful to just rerun this method)
            this.dom = Template.mapDOM(this.root);

            // reset the menus for the logo and menu
            this.dom.logoPicker.value = null;
            this.dom.backgroundPicker.value = null;
        }
    }

    updateGraphics() {
        // its possible that we are using the blank biz card layout and don't have a background
        // or the menu has been reset and the background picker has no value
        if (this.dom.background && this.dom.backgroundPicker.value) {

            // if both exist, set the background image to the menu value
            this.dom.background.style.backgroundImage = `url("${this.dom.backgroundPicker.value}")`;
        }

        // its possible that we are using the blank biz card layout and don't have a logo
        // or the menu has been reset and the logo picker has no value
        if (this.dom.logo && this.dom.logoPicker.value) {

            // if both exist, set the logo image to the menu value
            this.dom.logo.style.backgroundImage = `url("${this.dom.logoPicker.value}")`;
        }
    }
}

if (!customElements.get('biz-card')) {
    customElements.define('biz-card', BizCard);
}
