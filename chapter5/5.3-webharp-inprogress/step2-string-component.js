export default class WebHarpString extends HTMLElement {
    strum(params) {
        if (this.timer) { clearTimeout(this.timer); }
        this.timer = setTimeout( () => this.stopStrum(), 1000);
        console.log(params);
    }

    stopStrum() {}

    connectedCallback() {
        this.innerHTML = '<div class="line"></div> \
                          <style>\
                              webharp-string > .line { \
                                  background-color: white;\
                                  height: 100%; \
                                  width: 2px; \
                              }\
                          </style>';
    }
}

if (!customElements.get('webharp-string')) {
    customElements.define('webharp-string', WebHarpString);
}

