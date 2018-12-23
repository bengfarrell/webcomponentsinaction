import Text from './text.js';

export default {
    css() {
        return `
            :host {
                ${Text.normal()}
            }
            
            .ds-align-right {
                text-align: right;
            }
            
            .ds-align-center {
                text-align: center;
            }
        `;
    }
}
