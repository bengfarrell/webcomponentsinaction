import Color from "./color.js";

export default {
    get MOUSE_INPUT() { return 'mouseinput'; },
    get TEXT_INPUT() { return 'textinput'; },
    get ATTRIBUTE_INPUT() { return 'attributeinput'; },

    init(dom) {
        return {
            rawvalues: {
                satbright: {
                    x: dom.satbright.x,
                    y: dom.satbright.y
                },

                transparency: dom.transparency.value,
                hue: dom.hue.value
            },
            color: {}
        }
    },

    update(o) {
        if (!o.model) {
            o.model = this.init(o.dom);
        }

        if (o.changeType === this.MOUSE_INPUT) {
            return this.handleMouseInput(o);
        } else if (o.element === o.dom.textInputHex) {
            return this.handleHex(o);
        } else if (o.changeType === this.ATTRIBUTE_INPUT) {
            return this.handleAttributes(o);
        }  else {
            return this.handleRGB(o);
        }
    },

    handleMouseInput(o) {
        switch (o.element) {
            case o.dom.hue:
                if (o.attribute === 'value') {
                    o.model.rawvalues.hue = o.element[o.attribute];
                } else {
                    return o.model;
                }
                break;

            case o.dom.satbright:
                if (o.attribute === 'x' || o.attribute === 'y') {
                    o.model.rawvalues.satbright[o.attribute] = o.element[o.attribute];
                } else {
                    return o.model;
                }
                break;

            case o.dom.transparency:
                if (o.attribute === 'value') {
                    o.model.rawvalues.transparency = o.element[o.attribute];
                } else {
                    return o.model;
                }
                break;

            default:
                return o.model;
        }

        // calculate color values from input
        const color = {
            hue: o.model.rawvalues.hue / 100,
            transparency: 100 - parseInt(o.model.rawvalues.transparency),
            saturation: o.model.rawvalues.satbright.x / 100,
            brightness: (100 - o.model.rawvalues.satbright.y) / 100
        };

        color.rgb = Color.HSVtoRGB(color.hue, color.saturation, color.brightness);
        color.hex = Color.RGBtoHex(color.rgb);

        // change slider backgrounds to reflect current colors
        o.dom.satbright.backgroundColor = Color.RGBtoHex(Color.HSVtoRGB(color.hue, 1, 1));
        o.dom.transparency.backgroundColor = Color.RGBtoHex(Color.HSVtoRGB(color.hue, 1, 1));

        // update text inputs to reflect changes from sliders and coord picker
        o.dom.textInputHex.value = color.hex;
        o.dom.textInputR.value = color.rgb.r;
        o.dom.textInputG.value = color.rgb.g;
        o.dom.textInputB.value = color.rgb.b;
        o.dom.textInputA.value = color.transparency;

        // update model with new color vals
        o.model.color = color;

        return o.model;
    },

    handleRGB(o) {
        const color = {
            rgb: {
                r: o.dom.textInputR.value,
                g: o.dom.textInputG.value,
                b: o.dom.textInputB.value,
            }
        };

        const hsv = Color.RGBtoHSV(color.rgb.r, color.rgb.g, color.rgb.b);
        o.dom.hue.value = hsv.h * 100;
        o.dom.satbright.x = hsv.s * 100;
        o.dom.satbright.y = 100 - hsv.v * 100;

        return o.model;

    },

    handleAttributes(o) {
        if (o.attribute === 'alpha') {
            o.model.rawvalues.transparency = o.element.alpha;
            o.dom.transparency.value = 100 - o.element.alpha;
            o.dom.textInputA.value = o.element.alpha;
            return o.model;
        } else {
            o.model.color.hex = o.element.hex;
            return this.updateFromHex(o);
        }
    },

    handleHex(o) {
        o.model.color.hex = o.dom.textInputHex.value;
        return this.updateFromHex(o);
    },

    updateFromHex(o) {
        const color = {
            rgb: Color.hexToRGB(o.model.color.hex)
        };

        o.dom.textInputR.value = color.rgb.r;
        o.dom.textInputG.value = color.rgb.g;
        o.dom.textInputB.value = color.rgb.b;

        const hsv = Color.RGBtoHSV(color.rgb.r, color.rgb.g, color.rgb.b);

        o.dom.hue.value = hsv.h * 100;
        o.dom.satbright.x = hsv.s * 100;
        o.dom.satbright.y = 100 - hsv.v * 100;

        return o.model;
    }
}
