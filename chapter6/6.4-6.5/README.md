The index-autocache.html example is based on a section I cut from the book

The idea is to replace this:

    mapDOM(scope) {
        return {
            logoPicker: scope.querySelector('.logo-picker select'),
            backgroundPicker: scope.querySelector('.background-picker select'),
            logo: scope.querySelector('.logo'),
            background: scope.querySelector('.biz-card')
        }
    },
    
...with something automated.   

Note how the HTML in bizcard-autocache/template.js has a "cache" attribute

        <div class="logo-picker">Logo: ${this.options(p.logoChoices, 'logoPicker')}</div>
           <div class="background-picker">Background: ${this.options(p.backgroundChoices, 'backgroundPicker')}</div>
           <div class="biz-card" cache="background">
            <div class="logo" cache="logo"></div>
            <div class="top-text">
                <h1>${p.first_name} ${p.last_name}</h1>
                <h3>${p.title}</h3>
            </div>
        
            <div class="bottom-text">
                <h3>phone: ${p.phone}</h3>
                <h3>${p.email} / ${p.website}</h3>
            </div>
        </div> 
        
The mapdom.js script takes these marked elements and automatically
creates an object with these element references.

I use a similar approach in my work all the time - and keep improving on it
