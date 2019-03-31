export default {
    map(node, param) {
        let settings = {
            attribute: 'cache',
            selector: this.attributeSelector('cache'),
            cacheroot: 'cacheroot'
        };
        let attribute, selector, cacheroot;

        if (param !== undefined) {
            if (typeof param === 'string') {
                settings.attribute = param;
                settings.selector = this.attributeSelector(param);
            } else {
                settings.attribute = param.attribute ? param.attribute : settings.attribute;
                settings.selector = param.selector ? param.selector : settings.selector;
                settings.cacheroot = param.cacheroot ? param.cacheroot : settings.cacheroot;
            }
        }

        let domcache = {};
        let els = node.querySelectorAll(settings.selector);
        let rootlevelEls = node.querySelectorAll(this.attributeSelector(settings.cacheroot));

        let nondeepEls = [];
        // weed out where we selected past the desired root
        for (let e = 0; e < els.length; e++) {
            let elIsContainedByRoot = false;
            for (let d = 0; d < rootlevelEls.length; d++) {
                if (rootlevelEls[d] !== els[e] && rootlevelEls[d].contains(els[e])) {
                    elIsContainedByRoot = true;
                }
            }
            if (!elIsContainedByRoot) {
                nondeepEls.push(els[e]);
            }
        }

        for (let c = 0; c < nondeepEls.length; c++) {
            let props = nondeepEls[c].getAttribute(settings.attribute);
            let level = domcache;
            props = props.split('.');
            props = props.reverse();

            while (props.length > 0) {
                let prop = props.pop();

                if (!level[prop]) {
                    if (props.length === 0) {
                        level[prop] = nondeepEls[c];
                    } else {
                        level[prop] = {}
                    }
                }
                level = level[prop];
            }
        }
        return domcache;
    },

    attributeSelector(name) { return '[' + name + ']'; }
}
