class PhotoCarousel extends HTMLElement {
    connectedCallback() {
        this._photoIndex = 0;
        this._photos = this.getAttribute('photos').split(',');

        this.innerHTML = '<h2>'+ this.getAttribute('title') + '</h2>' +
            '<h4>by '+ this.getAttribute('author') + '</h4>' +
            '<div class="image-container"></div>' +
            '<button class="back">&lt</button>' +
            '<button class="forward">&gt</button>';


        this.showPhoto();

        this.querySelector('button.back').addEventListener('click', event => this.onBackButtonClick(event));
        this.querySelector('button.forward').addEventListener('click', event => this.onForwardButtonClick(event));
    }

    /**
     * handler for when user clicks the back button
     * @param event
     */
    onBackButtonClick(event) {
        this._photoIndex --;
        if (this._photoIndex < 0) {
            this._photoIndex = this._photos.length-1;
        }
        this.showPhoto();
    }

    /**
     * handler for when user clicks the forward button
     * @param event
     */
    onForwardButtonClick(event) {
        this._photoIndex ++;
        if (this._photoIndex >= this._photos.length) {
            this._photoIndex = 0;
        }
        this.showPhoto();
    }

    showPhoto() {
        this.querySelector('.image-container').style.backgroundImage = 'url(' + this._photos[this._photoIndex] + ')';
    }
}

if (!customElements.get('wcia-photo-carousel')) {
    customElements.define('wcia-photo-carousel', PhotoCarousel);
}
