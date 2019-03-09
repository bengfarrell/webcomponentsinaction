export default class PolySearch extends HTMLElement {
    connectedCallback() {
        if (this.hasAttribute('thumbheight')) {
            this._thumbheight = this.getAttribute('thumbheight');
            this._thumbwidth = (this.getAttribute('thumbheight') * 1.3333 /*aspect ratio*/);
        } else {
            this._thumbheight = 150;
            this._thumbwidth = 200;
        }

        if (this.hasAttribute('backgroundcolor')) {
            this.style.backgroundColor = this.getAttribute('backgroundcolor');
        }
    }

    static get observedAttributes() {
        return ['searchterm'];
    }

    get searchTerm() {
        return this.getAttribute('searchTerm');
    }

    set searchTerm(val) {
        this.setAttribute('searchTerm', val);
    }

    attributeChangedCallback(name, oldval, newval) {
        if (name === 'searchterm') {
            this.doSearch();
        }
    }

    doSearch() {
        if (this.getAttribute('apiKey') && this.getAttribute('searchTerm')) {
            const url = this.getAttribute('baseuri') + '?keywords=' + this.getAttribute('searchTerm') + '&format=' + this.getAttribute('format') + '&key=' + this.getAttribute('apiKey');
            const request = new XMLHttpRequest();
            request.open( 'GET', url, true );
            request.addEventListener( 'load', (event) => {
                this.renderResults(JSON.parse( event.target.response ).assets);
            });
            request.send();
        }
    }

    renderResults(assets) {
        let html = '';
        for (let c = 0; c < assets.length; c++) {
            for (let d = 0; d < assets[c].formats.length; d++) {
                if (assets[c].formats[d].formatType === this.getAttribute('format')) {
                    html += '<img gltf="' + assets[c].formats[d].root.url + '" src="' + assets[c].thumbnail.url + '" width="' + this._thumbwidth + '" height="' + this._thumbheight + '"/>';
                }
            }
        }
        this.innerHTML = html;
        this.innerHTML += `<style>
            poly-search {
                border-style: solid;
                border-width: 1px;
                border-color: #9a9a9a;
                padding: 10px;
                background-color: #fafafa;
                display: inline-block;
                text-align: center;
            }
    
            poly-search img {
                margin: 5px;
            }
    
            input {
                font-size: 18px;
            }</style>`;
    }
}

customElements.define('poly-search', PolySearch);
