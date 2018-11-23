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
            logoPicker: scope.querySelector('.logo-picker select'),
            backgroundPicker: scope.querySelector('.background-picker select'),
            logo: scope.querySelector('.logo'),
            background: scope.querySelector('.biz-card')
        }
    },

    html(p) {
        return `
           <div class="logo-picker">Logo: ${this.options(p.logoChoices)}</div>
           <div class="background-picker">Background: ${this.options(p.backgroundChoices)}</div>
           <div class="biz-card">
            <div class="logo"></div>
            <div class="top-text">
                <h1>${p.first_name} ${p.last_name}</h1>
                <h3>${p.title}</h3>
            </div>
        
            <div class="bottom-text">
                <h3>phone: ${p.phone}</h3>
                <h3>${p.email} / ${p.website}</h3>
            </div>
        </div>`;
    },

    css(p) {
        return `<style>
                    .biz-card {
                        font-size: 16px;
                        font-family: sans-serif;
                        color: white;
                        width: 700px;
                        height: 400px;
                        display: inline-block;
                        border-color: #9a9a9a;
                        background-size: 5%;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }
                
                    .biz-card .logo {
                        height: 100px;
                        margin-top: 10%;
                        text-align: center;
                        background-size: contain;
                        background-position-x: center;
                        background-repeat: no-repeat;
                    }
                
                    .biz-card .top-text {
                        text-align: center;
                    }
                
                    .biz-card .top-text h1 {
                        font-size: 2.5em;
                        margin-bottom: 0;
                    }
                
                    .biz-card .top-text h3 {
                        margin: 0;
                    }
                
                    .biz-card .bottom-text {
                        text-align: center;
                        margin-top: 10%;
                    }
                
                    .biz-card .bottom-text h3 {
                        margin: 0;
                    }
                </style>`;
        },
}
