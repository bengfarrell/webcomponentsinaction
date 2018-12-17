import Text from './text.js';

export default {
    css() {
        return `
            .ds-form-input {
                margin-right: 5px;
            }
            
            .ds-form-input .ds-input-field-label {
                border-top-left-radius: var(--border-radius);
                border-top-right-radius: var(--border-radius);
                background-color: var(--background-inverted-color);
                padding: var(--padding-medium);
                display: block;
                
                font-size: var(--text-xsmall);
                ${Text.inverted()}
            }
            
            .ds-form-input .ds-input-field-label.top {
                display: block;
            }
            
            .ds-form-input input {
                border-style: solid;
                border-width: var(--border-width);
                border-color: var(--border-color-light);
                padding: var(--padding-medium);
                font-size: var(--text-large);
            }
        `;
    }
}


