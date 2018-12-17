export default {
    css() {
        return `
            .ds-modal {
                ${this.rules()}
            }
        `;
    },

    rules() {
        return `
            background-color: var(--background-color);
            border-radius: var(--border-radius);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        `;
    }
}
