export default class WebHarpString extends HTMLElement {
    strum(params) {
        if (this.timer) { clearTimeout(this.timer); }

        let dur = params.power * 10 + 250;
        this.classList.add('shake', 'shake-constant', 'shake-horizontal');
        if (dur < 500) {
            this.classList.add('shake-little');
        }
        this.timer = setTimeout( () => this.stopStrum(), dur);
    }

    stopStrum() {
        this.classList.remove('shake', 'shake-constant', 'shake-horizontal', 'shake-little');
    }

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

