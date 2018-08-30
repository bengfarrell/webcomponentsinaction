export default {
    render(props) {
        return `${this.html(props)}
                ${this.css(props)}`;
    },

    options(list) {
        let choices = ``;
        for (let c = 0; c < list.length; c++) {
            choices += `<option value="${list[c].uri}">${list[c].name}</option>`;
        }
        return `<select>${choices}</select>`;
    },

    mapDOM(scope) {
        return {
            logoPicker: scope.querySelector('.logo-picker select'), // logo menu
            backgroundPicker: scope.querySelector('.background-picker select'), // background menu
            logo: scope.querySelector('.logo'), // card logo, found inside template
            background: scope.querySelector('.biz-card'), // background of card, found inside template
            cardContainer: scope.querySelector('.biz-card-container'), // container to keep our current biz card layout
            templateContainer: scope.querySelector('.template-container') // storage for the incoming templates
        }
    },
    
    html(p) {
        return `
           <div class="logo-picker">Logo: ${this.options(p.logoChoices)}</div>
           <div class="background-picker">Background: ${this.options(p.backgroundChoices)}</div>
           <div class="biz-card-container"></div>
           <div class="template-container"></div>`;
    },

    css(p) {
        // no CSS needed here - biz card style is inside the templates
        // if we wanted to style our menus better, we could do some stuff here
        return `<style>
                </style>`;
    },
}
