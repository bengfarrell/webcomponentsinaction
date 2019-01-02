import Color from "./color.js";

export default {
    init() {
        return {
            color: {}
        }
    },

    update(o) {
        if (!o.model) { o.model = this.init(); }

        if (this.shouldIgnoreChange(o)) { return o.model; }

        switch (o.element) {
            case o.component:
                this.handleComponentAttributes(o);
                break;

            case o.dom.hue:
            case o.dom.satbright:
            case o.dom.transparency:
                this.handleMouseInput(o);
                break;

            case o.dom.textInputA:
            case o.dom.textInputR:
            case o.dom.textInputG:
            case o.dom.textInputB:
                this.handleRGBA(o);
                break;

            case o.dom.textInputHex:
                this.handleHex(o);
                break;
        }

        return o.model;
    },

    handleMouseInput(o) {
        switch (o.element) {
            case o.dom.hue:
                if (o.attribute === 'value') {
                    o.model.color.hue = o.element[o.attribute] / 100;

                    // change slider backgrounds to reflect current colors
                    o.dom.satbright.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(o.model.color.hue, 1, 1));
                    o.dom.transparency.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(o.model.color.hue, 1, 1));
                } else {
                    return; // unimportant attribute change
                }
                break;

            case o.dom.satbright:
                if (o.attribute === 'x' || o.attribute === 'y') {
                    o.model.color.saturation = o.dom.satbright.x / 100;
                    o.model.color.brightness = (100 - o.dom.satbright.y) / 100;
                } else {
                    return; // unimportant attribute change
                }
                break;

            case o.dom.transparency:
                if (o.attribute === 'value') {
                    o.model.color.alpha = 100 - this.formatTextInput(o.element[o.attribute], 0, 100);
                    o.dom.textInputA.value = this.formatTextInput(o.model.color.alpha, 0, 100);
                    o.component.alpha = o.model.color.alpha;
                    this.ignoreNextChange(o, o.component,'alpha');
                    return; // no need to update anything else
                } else {
                    return; // unimportant attribute change
                }
                break;

            default:
                return;
        }

        o.model.color.rgb = Color.HSVtoRGB(o.model.color.hue, o.model.color.saturation, o.model.color.brightness);
        o.model.color.hex = Color.RGBtoHex(o.model.color.rgb);

        this.ignoreNextChange(o, o.component,'hex');
        o.component.hex = o.model.color.hex;

        // update text inputs to reflect changes from sliders and coord picker
        o.dom.textInputHex.value = o.model.color.hex;
        o.dom.textInputR.value = this.formatTextInput(o.model.color.rgb.r, 0, 255);
        o.dom.textInputG.value = this.formatTextInput(o.model.color.rgb.g, 0, 255);
        o.dom.textInputB.value = this.formatTextInput(o.model.color.rgb.b, 0, 255);
    },

    handleRGBA(o) {
        if (o.element === o.dom.textInputA) {
            o.model.color.alpha = this.formatTextInput(o.dom.textInputA.value,0, 100);
            this.ignoreNextChange(o, o.dom.transparency, 'value');
            this.ignoreNextChange(o, o.component,'alpha');
            o.dom.transparency.value = o.model.color.alpha;
            o.component.alpha = o.model.color.alpha;

            // set the field to the model value in case it was out of bounds and invalid by the user
            o.dom.textInputA.value = o.model.color.alpha;
        } else {
            o.model.color.rgb = {
                r: this.formatTextInput(o.dom.textInputR.value, 0, 255),
                g: this.formatTextInput(o.dom.textInputG.value, 0, 255),
                b: this.formatTextInput(o.dom.textInputB.value, 0, 255)
            };

            // set the fields to the model value in case they were out of bounds and invalid by the user
            o.dom.textInputR.value = o.model.color.rgb.r;
            o.dom.textInputG.value = o.model.color.rgb.g;
            o.dom.textInputB.value = o.model.color.rgb.b;

            o.model.color.hex = Color.RGBtoHex(o.model.color.rgb);
            this.ignoreNextChange(o, o.component,'hex');
            o.component.hex = o.model.color.hex;
            o.dom.textInputHex.value = o.model.color.hex;

            this.updateHSBFromRGB(o);
        }
    },

    handleComponentAttributes(o) {
        if (o.attribute === 'alpha') {
            o.model.color.alpha = 100 - o.element.alpha;

            this.ignoreNextChange(o, o.dom.transparency,'value');
            o.dom.transparency.value = o.model.color.alpha;
            o.dom.textInputA.value = o.element.alpha;
        } else {
            o.model.color.hex = o.element.hex;
            o.dom.textInputHex.value = o.element.hex;
            this.updateRGBFromHex(o);
        }
    },

    handleHex(o) {
        o.model.color.hex = Color.formatHex(o.dom.textInputHex.value);
        this.ignoreNextChange(o, o.component,'hex');
        o.component.hex = o.model.color.hex;

        // set the field to the model value in case it was made invalid by the user
        o.dom.textInputHex.value = o.model.color.hex;
        this.updateRGBFromHex(o);
    },

    formatTextInput(value, min, max) {
        value = Math.min(value, max);
        value = Math.max(value, min);
        return parseInt(value);
    },

    updateRGBFromHex(o) {
        o.model.color.rgb = Color.hexToRGB(o.model.color.hex);
        o.dom.textInputR.value = parseInt(o.model.color.rgb.r);
        o.dom.textInputG.value = parseInt(o.model.color.rgb.g);
        o.dom.textInputB.value = parseInt(o.model.color.rgb.b);

        this.updateHSBFromRGB(o);
    },

    updateHSBFromRGB(o) {
        const hsv = Color.RGBtoHSV(o.model.color.rgb.r, o.model.color.rgb.g, o.model.color.rgb.b);
        o.model.color.hue = hsv.h;
        o.model.color.saturation = hsv.s;
        o.model.color.brightness = hsv.v;

        this.ignoreNextChange(o, o.dom.hue,'value');
        this.ignoreNextChange(o, o.dom.satbright,['x', 'y']);
        o.dom.hue.value = o.model.color.hue * 100;
        o.dom.satbright.x = o.model.color.saturation * 100;
        o.dom.satbright.y = (1 - o.model.color.brightness) * 100;

        // change slider backgrounds to reflect current colors
        o.dom.satbright.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(hsv.h, 1, 1));
        o.dom.transparency.backgroundcolor = Color.RGBtoHex(Color.HSVtoRGB(hsv.h, 1, 1));
    },

    /* You've got an attribute change from one component incoming.
       You make the appropriate UI changes including changing another component's attributes.
       The problem is that by changing THAT component, it will trigger another attribute change event.
       This could go on and on in an infinite loop.
       When making changes to those components, we record that we should ignore the incoming change that occurred.
       And now, no infinite loops!
     */
    ignoreNextChange(o, el, attr) {
        if (!Array.isArray(attr)) {
            attr = [ attr ];
        }

        if (!o.model.ignoreNextChange) {
            o.model.ignoreNextChange = new WeakMap();
        }

        for (let c = 0; c < attr.length; c++) {
            if (o.model.ignoreNextChange.has(el)) {
                o.model.ignoreNextChange.get(el).push(attr[c]);
            } else {
                o.model.ignoreNextChange.set(el, [ attr[c] ]);
            }
        }
    },

    shouldIgnoreChange(o) {
        if (o.model.ignoreNextChange && o.model.ignoreNextChange.has(o.element)) {
            const ignore = o.model.ignoreNextChange.get(o.element);
            if (ignore.indexOf(o.attribute) !== -1) {
                ignore.splice(ignore.indexOf(o.attribute), 1);
                if (ignore.length === 0) {
                    o.model.ignoreNextChange.delete(o.element);
                }
                return true;
            }
        }
        return false;
    }
}
