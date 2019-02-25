"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.colorpicker = factory());
})(void 0, function () {
  'use strict';

  var Template = {
    render: function render(opts) {
      return "".concat(this.css(opts.useShadowDOM), "\n                ").concat(this.html());
    },
    mapDOM: function mapDOM(scope) {
      return {
        overlay: scope.querySelector('.bg-overlay'),
        thumb: scope.querySelector('.thumb')
      };
    },
    html: function html() {
      return "<div class=\"bg-overlay\"></div>\n                <div class=\"thumb\"></div>";
    },
    createHostSelector: function createHostSelector(useshadow, host) {
      if (useshadow) {
        return ':host';
      } else {
        return host;
      }
    },
    css: function css(useShadowDOM) {
      var comp = 'wcia-slider';
      return "<style>\n                    ".concat(this.createHostSelector(useShadowDOM, comp), " {\n                        display: inline-block;\n                        position: relative;\n                        border-radius: var(--border-radius);\n                    }\n                    \n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .bg-overlay {\n                        width: 100%;\n                        height: 100%;\n                        position: absolute;\n                        border-radius: var(--border-radius);\n                    }\n                    \n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .thumb {\n                        margin-top: -1px;\n                        width: 5px;\n                        height: calc(100% - 5px);\n                        position: absolute;\n                        border-style: solid;\n                        border-width: var(--border-width-thick);\n                        border-color: var(--border-inverted-color);\n                        border-radius: var(--border-radius);\n                        pointer-events: none;\n                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n                    }\n                </style>");
    }
  };
  /**
   * from http://www.easyrgb.com/en/math.php#text1
   */

  var Color = {
    /* accepts parameters
     * h  Object = {h:x, s:y, v:z}
     * OR
     * h, s, v
    */
    HSVtoRGB: function HSVtoRGB(H, S, V) {
      var R, G, B, var_h, var_i, var_1, var_2, var_3, var_r, var_g, var_b;

      if (S === 0) {
        R = V * 255;
        G = V * 255;
        B = V * 255;
      } else {
        var_h = H * 6;

        if (var_h === 6) {
          var_h = 0;
        } //H must be < 1


        var_i = parseInt(var_h); //Or ... var_i = floor( var_h )

        var_1 = V * (1 - S);
        var_2 = V * (1 - S * (var_h - var_i));
        var_3 = V * (1 - S * (1 - (var_h - var_i)));

        if (var_i === 0) {
          var_r = V;
          var_g = var_3;
          var_b = var_1;
        } else if (var_i === 1) {
          var_r = var_2;
          var_g = V;
          var_b = var_1;
        } else if (var_i === 2) {
          var_r = var_1;
          var_g = V;
          var_b = var_3;
        } else if (var_i === 3) {
          var_r = var_1;
          var_g = var_2;
          var_b = V;
        } else if (var_i === 4) {
          var_r = var_3;
          var_g = var_1;
          var_b = V;
        } else {
          var_r = V;
          var_g = var_1;
          var_b = var_2;
        }

        R = parseInt(var_r * 255);
        G = parseInt(var_g * 255);
        B = parseInt(var_b * 255);
      }

      return {
        r: R,
        g: G,
        b: B
      };
    },
    RGBtoHSV: function RGBtoHSV(r, g, b) {
      //R, G and B input range = 0 ÷ 255
      //H, S and V output range = 0 ÷ 1.0
      var var_R = r / 255;
      var var_G = g / 255;
      var var_B = b / 255;
      var var_Min = Math.min(var_R, var_G, var_B); //Min. value of RGB

      var var_Max = Math.max(var_R, var_G, var_B); //Max. value of RGB

      var del_Max = var_Max - var_Min; //Delta RGB value

      var V = var_Max;
      var H, S;

      if (del_Max === 0) //This is a gray, no chroma...
        {
          H = 0;
          S = 0;
        } else //Chromatic data...
        {
          S = del_Max / var_Max;
          var del_R = ((var_Max - var_R) / 6 + del_Max / 2) / del_Max;
          var del_G = ((var_Max - var_G) / 6 + del_Max / 2) / del_Max;
          var del_B = ((var_Max - var_B) / 6 + del_Max / 2) / del_Max;

          if (var_R === var_Max) {
            H = del_B - del_G;
          } else if (var_G === var_Max) {
            H = 1 / 3 + del_R - del_B;
          } else if (var_B === var_Max) {
            H = 2 / 3 + del_G - del_R;
          }

          if (H < 0) {
            H += 1;
          }

          if (H > 1) {
            H -= 1;
          }
        }

      return {
        h: H,
        s: S,
        v: V
      };
    },
    RGBtoHex: function RGBtoHex(r, g, b) {
      if (_typeof(r) === 'object') {
        g = r.g;
        b = r.b;
        r = r.r;
      }

      return '#' + this.toHex(parseInt(r)) + this.toHex(parseInt(g)) + this.toHex(parseInt(b));
    },
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRGB: function hexToRGB(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var target;

      if (hex.charAt(0) === '#') {
        target = 7;
      } else if (hex.charAt(0) !== '#') {
        target = 6;
      }

      while (hex.length < target) {
        hex += '0';
      }

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    formatHex: function formatHex(val) {
      if (val.charAt(0) !== '#') {
        val = '#' + val;
      }

      while (val.length < 7) {
        val += '0';
      }

      return val;
    },
    toHex: function toHex(val) {
      var hex = Number(val).toString(16);

      if (hex.length < 2) {
        hex = "0" + hex;
      }

      return hex;
    }
  };

  var Slider =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(Slider, _HTMLElement);

    _createClass(Slider, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldVal, newValue) {
        if (!this.dom) {
          return;
        }

        switch (name) {
          case 'value':
            this.refreshSlider(newValue);
            break;

          case 'backgroundcolor':
            this.setColor(newValue);
            break;
        }
      }
    }, {
      key: "value",
      set: function set(val) {
        this.setAttribute('value', val);
      },
      get: function get() {
        return this.getAttribute('value');
      }
    }, {
      key: "backgroundcolor",
      set: function set(val) {
        this.setAttribute('backgroundcolor', val);
      },
      get: function get() {
        return this.getAttribute('backgroundcolor');
      }
    }], [{
      key: "USE_SHADOWDOM_WHEN_AVAILABLE",
      get: function get() {
        return true;
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        return ['value', 'backgroundcolor'];
      }
    }]);

    function Slider() {
      var _this;

      _classCallCheck(this, Slider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this));

      if (Slider.USE_SHADOWDOM_WHEN_AVAILABLE && _this.attachShadow) {
        _this.root = _this.attachShadow({
          mode: 'open'
        });
      } else {
        _this.root = _assertThisInitialized(_assertThisInitialized(_this));
      }

      document.addEventListener('mousemove', function (e) {
        return _this.eventHandler(e);
      });
      document.addEventListener('mouseup', function (e) {
        return _this.eventHandler(e);
      });

      _this.addEventListener('mousedown', function (e) {
        return _this.eventHandler(e);
      });

      return _this;
    }

    _createClass(Slider, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.initialized) {
          this.root.innerHTML = Template.render({
            useShadowDOM: Slider.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow
          });
          this.dom = Template.mapDOM(this.root);

          if (typeof cssVars !== 'undefined') {
            cssVars();
          }

          this.initialized = true;

          if (this.backgroundcolor) {
            this.setColor(this.backgroundcolor);
          }

          if (this.value) {
            this.refreshSlider(this.value);
          }
        }
      }
    }, {
      key: "setColor",
      value: function setColor(color) {
        var rgb = Color.hexToRGB(color);
        this.dom.overlay.style.background = "linear-gradient(to right, rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", 1) 0%, rgba(").concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", 0) 100%)");
      }
    }, {
      key: "refreshSlider",
      value: function refreshSlider(value) {
        this.dom.thumb.style.left = value / 100 * this.offsetWidth - this.dom.thumb.offsetWidth / 2 + 'px';
      }
    }, {
      key: "updateX",
      value: function updateX(x) {
        var hPos = x - this.dom.thumb.offsetWidth / 2;

        if (hPos > this.offsetWidth) {
          hPos = this.offsetWidth;
        }

        if (hPos < 0) {
          hPos = 0;
        }

        this.value = hPos / this.offsetWidth * 100;
      }
    }, {
      key: "eventHandler",
      value: function eventHandler(e) {
        var bounds = this.getBoundingClientRect();
        var x = e.clientX - bounds.left;

        switch (e.type) {
          case 'mousedown':
            this.isdragging = true;
            this.updateX(x);
            this.refreshSlider(this.value);
            break;

          case 'mouseup':
            this.isdragging = false;
            break;

          case 'mousemove':
            if (this.isdragging) {
              this.updateX(x);
              this.refreshSlider(this.value);
            }

            break;
        }
      }
    }]);

    return Slider;
  }(_wrapNativeSuper(HTMLElement));

  if (!customElements.get('wcia-slider')) {
    customElements.define('wcia-slider', Slider);
  }

  var Template$1 = {
    render: function render(opts) {
      return "".concat(this.css(opts.useShadowDOM), "\n                ").concat(this.html());
    },
    mapDOM: function mapDOM(scope) {
      return {
        thumb: scope.querySelector('.thumb')
      };
    },
    html: function html() {
      return "<div class=\"bg-overlay-a\"></div>\n                <div class=\"bg-overlay-b\"></div>\n                <div class=\"thumb\"></div>";
    },
    createHostSelector: function createHostSelector(useshadow, host) {
      if (useshadow) {
        return ':host';
      } else {
        return host;
      }
    },
    css: function css(useShadowDOM) {
      var comp = 'wcia-coord-picker';
      return "<style>\n                    ".concat(this.createHostSelector(useShadowDOM, comp), " {\n                        display: inline-block;\n                        position: relative;\n                    }\n                    \n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .bg-overlay-a {\n                        width: 100%;\n                        height: 100%;\n                        border-radius: var(--border-radius);\n                        position: absolute;\n                        background: linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%);\n                    }\n                    \n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .bg-overlay-b {\n                        width: 100%;\n                        height: 100%;\n                        border-radius: var(--border-radius);\n                        position: absolute;\n                        background: linear-gradient(to bottom, transparent 0%, #000 100%);\n                    }\n                    \n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .thumb {\n                        width: 5px;\n                        height: 5px;\n                        position: absolute;\n                        border-style: solid;\n                        border-width: var(--border-width-thick);\n                        border-color: var(--border-inverted-color);\n                        border-radius: var(--border-radius);\n                        pointer-events: none;\n                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n                    }\n                </style>");
    }
  };

  var CoordPicker =
  /*#__PURE__*/
  function (_HTMLElement2) {
    _inherits(CoordPicker, _HTMLElement2);

    _createClass(CoordPicker, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldVal, newValue) {
        if (!this.dom) {
          return;
        }

        switch (name) {
          case 'x':
          case 'y':
            this.refreshCoordinates();
            break;

          case 'backgroundcolor':
            this.style.backgroundColor = newValue;
            break;
        }
      }
    }, {
      key: "x",
      set: function set(val) {
        this.setAttribute('x', val);
      },
      get: function get() {
        return this.getAttribute('x');
      }
    }, {
      key: "y",
      set: function set(val) {
        this.setAttribute('y', val);
      },
      get: function get() {
        return this.getAttribute('y');
      }
    }, {
      key: "backgroundcolor",
      set: function set(val) {
        this.setAttribute('backgroundcolor', val);
      },
      get: function get() {
        return this.getAttribute('backgroundcolor');
      }
    }], [{
      key: "USE_SHADOWDOM_WHEN_AVAILABLE",
      get: function get() {
        return true;
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        return ['x', 'y', 'backgroundcolor'];
      }
    }]);

    function CoordPicker() {
      var _this2;

      _classCallCheck(this, CoordPicker);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(CoordPicker).call(this));

      if (CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && _this2.attachShadow) {
        _this2.root = _this2.attachShadow({
          mode: 'open'
        });
      } else {
        _this2.root = _assertThisInitialized(_assertThisInitialized(_this2));
      }

      document.addEventListener('mousemove', function (e) {
        return _this2.eventHandler(e);
      });
      document.addEventListener('mouseup', function (e) {
        return _this2.eventHandler(e);
      });

      _this2.addEventListener('mousedown', function (e) {
        return _this2.eventHandler(e);
      });

      return _this2;
    }

    _createClass(CoordPicker, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.initialized) {
          this.root.innerHTML = Template$1.render({
            useShadowDOM: CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow
          });
          this.dom = Template$1.mapDOM(this.root);

          if (typeof cssVars !== 'undefined') {
            cssVars();
          }

          this.initialized = true;

          if (this.x || this.y) {
            this.refreshCoordinates();
          }

          if (this.backgroundColor) {
            this.style.backgroundColor = this.backgroundColor;
          }
        }
      }
    }, {
      key: "eventHandler",
      value: function eventHandler(e) {
        var bounds = this.getBoundingClientRect();
        var coords = {
          x: e.clientX - bounds.left,
          y: e.clientY - bounds.top
        };

        switch (e.type) {
          case 'mousedown':
            this.isDragging = true;
            this.updateXY(coords.x, coords.y);
            this.refreshCoordinates();
            break;

          case 'mouseup':
            this.isDragging = false;
            break;

          case 'mousemove':
            if (this.isDragging) {
              this.updateXY(coords.x, coords.y);
              this.refreshCoordinates();
            }

            break;
        }
      }
    }, {
      key: "updateXY",
      value: function updateXY(x, y) {
        var hPos = x - this.dom.thumb.offsetWidth / 2;
        var vPos = y - this.dom.thumb.offsetHeight / 2;

        if (hPos > this.offsetWidth) {
          hPos = this.offsetWidth;
        }

        if (hPos < 0) {
          hPos = 0;
        }

        if (vPos > this.offsetHeight) {
          vPos = this.offsetHeight;
        }

        if (vPos < 0) {
          vPos = 0;
        }

        this.x = hPos / this.offsetWidth * 100;
        this.y = vPos / this.offsetHeight * 100;
      }
    }, {
      key: "refreshCoordinates",
      value: function refreshCoordinates() {
        this.dom.thumb.style.left = this.x / 100 * this.offsetWidth - this.dom.thumb.offsetWidth / 2 + 'px';
        this.dom.thumb.style.top = this.y / 100 * this.offsetHeight - this.dom.thumb.offsetWidth / 2 + 'px';
      }
    }]);

    return CoordPicker;
  }(_wrapNativeSuper(HTMLElement));

  if (!customElements.get('wcia-coord-picker')) {
    customElements.define('wcia-coord-picker', CoordPicker);
  }

  var Text = {
    normal: function normal() {
      return "\n            font-family: sans-serif;\n            font-size: 1em;\n            line-height: 1.2em;\n            color: black;\n        ";
    },
    inverted: function inverted() {
      return "\n            color: white;\n        ";
    }
  };
  var InputFields = {
    css: function css() {
      return "\n            .ds-form-input {\n                margin-right: 5px;\n            }\n            \n            .ds-form-input .ds-input-field-label {\n                border-top-left-radius: var(--border-radius);\n                border-top-right-radius: var(--border-radius);\n                background-color: var(--background-inverted-color);\n                padding: var(--padding-medium);\n                display: block;\n                \n                font-size: var(--text-xsmall);\n                ".concat(Text.inverted(), "\n            }\n            \n            .ds-form-input .ds-input-field-label.top {\n                display: block;\n            }\n            \n            .ds-form-input input {\n                border-style: solid;\n                border-width: var(--border-width);\n                border-color: var(--border-color-light);\n                padding: var(--padding-medium);\n                font-size: var(--text-large);\n            }\n        ");
    }
  };
  var Base = {
    common: function common() {
      return "".concat(Text.normal());
    }
  };
  var Modal = {
    css: function css() {
      return "\n            .ds-modal {\n                ".concat(this.rules(), "\n            }\n        ");
    },
    rules: function rules() {
      return "\n            background-color: var(--background-color);\n            border-radius: var(--border-radius);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n        ";
    }
  };
  var Template$2 = {
    render: function render(opts) {
      return "".concat(this.css(opts.useShadowDOM), "\n                ").concat(this.html());
    },
    mapDOM: function mapDOM(scope) {
      return {
        hue: scope.querySelector('.hue-slider'),
        transparency: scope.querySelector('.transparency-slider'),
        satbright: scope.querySelector('.saturation-brightness'),
        textInputR: scope.querySelector('.textInputR'),
        textInputG: scope.querySelector('.textInputG'),
        textInputB: scope.querySelector('.textInputB'),
        textInputA: scope.querySelector('.textInputA'),
        textInputHex: scope.querySelector('.textInputHex')
      };
    },
    html: function html() {
      return "<div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"slider-container\">\n                            <wcia-slider class=\"hue-slider\" value=\"50\"></wcia-slider>\n                            <wcia-slider class=\"transparency-slider\" value=\"0\"></wcia-slider>\n                        </div>\n\n                        <wcia-coord-picker x=\"50\" y=\"50\" class=\"saturation-brightness\"></wcia-coord-picker>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"text-inputs\">\n                            <div class=\"ds-form-input\">\n                              <label class=\"ds-input-field-label top\" for=\"textInputR\">Red</label>\n                              <input class=\"textInputR\" type=\"number\" value=\"0\" max=\"255\" size=\"4\" min=\"0\">\n                            </div>\n\n                            <div class=\"ds-form-input\">\n                              <label class=\"ds-input-field-label top\" for=\"textInputG\">Green</label>\n                              <input class=\"textInputG\" type=\"number\" value=\"0\" max=\"255\" size=\"4\" min=\"0\">\n                            </div>\n\n                            <div class=\"ds-form-input\">\n                              <label class=\"ds-input-field-label top\" for=\"textInputB\">Blue</label>\n                              <input class=\"textInputB\" type=\"number\" value=\"0\" max=\"255\" size=\"4\" min=\"0\">\n                            </div>\n\n                            <div class=\"ds-form-input\">\n                              <label class=\"ds-input-field-label top\" for=\"textInputA\">Alpha</label>\n                              <input class=\"textInputA\" type=\"number\" value=\"0\" max=\"100\" min=\"0\" size=\"4\">\n                            </div>\n\n                            <div class=\"ds-form-input\">\n                              <label class=\"ds-input-field-label top\" for=\"textInputHex\">Hex</label>\n                              <input class=\"textInputHex\" type=\"text\" width=\"50px\" size=\"8\">\n                            </div>\n                        </div>\n                    </div>\n                </div>";
    },
    createHostSelector: function createHostSelector(useshadow, host) {
      if (useshadow) {
        return ':host';
      } else {
        return host;
      }
    },
    createHostContextSelector: function createHostContextSelector(useshadow, host, clazz) {
      if (useshadow) {
        return ":host(".concat(clazz, ")");
      } else {
        return host + clazz;
      }
    },
    css: function css(useShadowDOM) {
      var comp = 'wcia-color-picker';
      return "<style>\n                    ".concat(InputFields.css(), "\n                    \n                    ").concat(this.createHostSelector(useShadowDOM, comp), "\n                    {\n                        ").concat(Base.common(), ";\n                        width: 100%;\n                        display: inline-block;\n                    }\n\n                    ").concat(this.createHostContextSelector(useShadowDOM, comp, '.modal'), "\n                    {\n                        ").concat(Modal.rules(), "\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .container {\n                        padding: 10px;\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .text-inputs {\n                        display: flex;\n                        width: 100%;\n                        justify-content: center;\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .row {\n                        display: flex;\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .slider-container {\n                        flex: 1;\n                        padding-right: 10px;\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .hue-slider, \n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .transparency-slider {\n                        width: 100%;\n                        height: 40px;\n                        margin-bottom: 5px;\n                        border-radius: var(--border-radius);\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .saturation-brightness {\n                        width: 90px;\n                        height: 90px;\n                        border-radius: var(--border-radius);\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .hue-slider {\n                        background: linear-gradient(to right, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);\n                    }\n\n                    ").concat(this.createHostSelector(useShadowDOM, comp), " .transparency-slider {\n                        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),linear-gradient(-45deg, #ccc 25%, transparent 25%),linear-gradient(45deg, transparent 75%, #ccc 75%),linear-gradient(-45deg, transparent 75%, #ccc 75%);\n                        background-size: 16px 16px;\n                        background-position: 0 0, 0 8px, 8px -8px, -8px 0px;\n                    }\n                </style>");
    }
  };
  var Handlers = {
    init: function init() {
      return {
        color: {}
      };
    },
    update: function update(o) {
      if (!o.model) {
        o.model = this.init();
      }

      if (this.shouldIgnoreChange(o)) {
        return o.model;
      }

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
    handleMouseInput: function handleMouseInput(o) {
      switch (o.element) {
        case o.dom.hue:
          if (o.attribute === 'value') {
            o.model.color.hue = o.element[o.attribute] / 100; // change slider backgrounds to reflect current colors

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
            this.ignoreNextChange(o, o.component, 'alpha');
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
      this.ignoreNextChange(o, o.component, 'hex');
      o.component.hex = o.model.color.hex; // update text inputs to reflect changes from sliders and coord picker

      o.dom.textInputHex.value = o.model.color.hex;
      o.dom.textInputR.value = this.formatTextInput(o.model.color.rgb.r, 0, 255);
      o.dom.textInputG.value = this.formatTextInput(o.model.color.rgb.g, 0, 255);
      o.dom.textInputB.value = this.formatTextInput(o.model.color.rgb.b, 0, 255);
    },
    handleRGBA: function handleRGBA(o) {
      if (o.element === o.dom.textInputA) {
        o.model.color.alpha = this.formatTextInput(o.dom.textInputA.value, 0, 100);
        this.ignoreNextChange(o, o.dom.transparency, 'value');
        this.ignoreNextChange(o, o.component, 'alpha');
        o.dom.transparency.value = o.model.color.alpha;
        o.component.alpha = o.model.color.alpha; // set the field to the model value in case it was out of bounds and invalid by the user

        o.dom.textInputA.value = o.model.color.alpha;
      } else {
        o.model.color.rgb = {
          r: this.formatTextInput(o.dom.textInputR.value, 0, 255),
          g: this.formatTextInput(o.dom.textInputG.value, 0, 255),
          b: this.formatTextInput(o.dom.textInputB.value, 0, 255)
        }; // set the fields to the model value in case they were out of bounds and invalid by the user

        o.dom.textInputR.value = o.model.color.rgb.r;
        o.dom.textInputG.value = o.model.color.rgb.g;
        o.dom.textInputB.value = o.model.color.rgb.b;
        o.model.color.hex = Color.RGBtoHex(o.model.color.rgb);
        this.ignoreNextChange(o, o.component, 'hex');
        o.component.hex = o.model.color.hex;
        o.dom.textInputHex.value = o.model.color.hex;
        this.updateHSBFromRGB(o);
      }
    },
    handleComponentAttributes: function handleComponentAttributes(o) {
      if (o.attribute === 'alpha') {
        o.model.color.alpha = 100 - o.element.alpha;
        this.ignoreNextChange(o, o.dom.transparency, 'value');
        o.dom.transparency.value = o.model.color.alpha;
        o.dom.textInputA.value = o.element.alpha;
      } else {
        o.model.color.hex = o.element.hex;
        o.dom.textInputHex.value = o.element.hex;
        this.updateRGBFromHex(o);
      }
    },
    handleHex: function handleHex(o) {
      o.model.color.hex = Color.formatHex(o.dom.textInputHex.value);
      this.ignoreNextChange(o, o.component, 'hex');
      o.component.hex = o.model.color.hex; // set the field to the model value in case it was made invalid by the user

      o.dom.textInputHex.value = o.model.color.hex;
      this.updateRGBFromHex(o);
    },
    formatTextInput: function formatTextInput(value, min, max) {
      value = Math.min(value, max);
      value = Math.max(value, min);
      return parseInt(value);
    },
    updateRGBFromHex: function updateRGBFromHex(o) {
      o.model.color.rgb = Color.hexToRGB(o.model.color.hex);
      o.dom.textInputR.value = parseInt(o.model.color.rgb.r);
      o.dom.textInputG.value = parseInt(o.model.color.rgb.g);
      o.dom.textInputB.value = parseInt(o.model.color.rgb.b);
      this.updateHSBFromRGB(o);
    },
    updateHSBFromRGB: function updateHSBFromRGB(o) {
      var hsv = Color.RGBtoHSV(o.model.color.rgb.r, o.model.color.rgb.g, o.model.color.rgb.b);
      o.model.color.hue = hsv.h;
      o.model.color.saturation = hsv.s;
      o.model.color.brightness = hsv.v;
      this.ignoreNextChange(o, o.dom.hue, 'value');
      this.ignoreNextChange(o, o.dom.satbright, ['x', 'y']);
      o.dom.hue.value = o.model.color.hue * 100;
      o.dom.satbright.x = o.model.color.saturation * 100;
      o.dom.satbright.y = (1 - o.model.color.brightness) * 100; // change slider backgrounds to reflect current colors

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
    ignoreNextChange: function ignoreNextChange(o, el, attr) {
      if (!Array.isArray(attr)) {
        attr = [attr];
      }

      if (!o.model.ignoreNextChange) {
        o.model.ignoreNextChange = new WeakMap();
      }

      for (var c = 0; c < attr.length; c++) {
        if (o.model.ignoreNextChange.has(el)) {
          o.model.ignoreNextChange.get(el).push(attr[c]);
        } else {
          o.model.ignoreNextChange.set(el, [attr[c]]);
        }
      }
    },
    shouldIgnoreChange: function shouldIgnoreChange(o) {
      if (o.model.ignoreNextChange && o.model.ignoreNextChange.has(o.element)) {
        var ignore = o.model.ignoreNextChange.get(o.element);

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
  };
  /**
   * design is heavily borrowed/stolen from https://cssgradient.io/
   */

  var ColorPicker =
  /*#__PURE__*/
  function (_HTMLElement3) {
    _inherits(ColorPicker, _HTMLElement3);

    _createClass(ColorPicker, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldVal, newValue) {
        if (!this.dom) {
          return;
        }

        switch (name) {
          case 'hex':
          case 'alpha':
            if (oldVal !== newValue) {
              this.data = Handlers.update({
                model: this.data,
                dom: this.dom,
                component: this,
                element: this,
                attribute: name
              });
            }

            break;
        }
      }
    }, {
      key: "hex",
      set: function set(val) {
        this.setAttribute('hex', val);
      },
      get: function get() {
        return this.getAttribute('hex');
      }
    }, {
      key: "alpha",
      set: function set(val) {
        this.setAttribute('alpha', val);
      },
      get: function get() {
        return this.getAttribute('alpha');
      }
    }], [{
      key: "USE_SHADOWDOM_WHEN_AVAILABLE",
      get: function get() {
        return true;
      }
    }, {
      key: "DEFAULT_HEX",
      get: function get() {
        return '#77aabb';
      }
    }, {
      key: "DEFAULT_ALPHA",
      get: function get() {
        return 100;
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        return ['hex', 'alpha'];
      }
    }]);

    function ColorPicker() {
      var _this3;

      _classCallCheck(this, ColorPicker);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ColorPicker).call(this));

      if (ColorPicker.USE_SHADOWDOM_WHEN_AVAILABLE && _this3.attachShadow) {
        _this3.root = _this3.attachShadow({
          mode: 'open'
        });
      } else {
        _this3.root = _assertThisInitialized(_assertThisInitialized(_this3));
      }

      var observer = new MutationObserver(function (e) {
        return _this3.onMutationChange(e);
      });
      observer.observe(_this3.root, {
        attributes: true,
        subtree: true
      });

      _this3.root.addEventListener('change', function (e) {
        return _this3.onInputValueChanged(e);
      });

      return _this3;
    }

    _createClass(ColorPicker, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.initialized) {
          this.root.innerHTML = Template$2.render({
            useShadowDOM: ColorPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow
          });
          this.dom = Template$2.mapDOM(this.root);

          if (typeof cssVars !== 'undefined') {
            cssVars();
          }

          this.initialized = true;

          if (this.hex) {
            this.data = Handlers.update({
              model: this.data,
              dom: this.dom,
              component: this,
              element: this,
              attribute: 'hex'
            });
          } else {
            this.hex = ColorPicker.DEFAULT_HEX;
          }

          if (this.alpha) {
            this.data = Handlers.update({
              model: this.data,
              dom: this.dom,
              component: this,
              element: this,
              attribute: 'alpha'
            });
          } else {
            this.alpha = ColorPicker.DEFAULT_ALPHA;
          }
        }
      }
    }, {
      key: "onMutationChange",
      value: function onMutationChange(records) {
        var _this4 = this;

        records.forEach(function (rec) {
          if (rec.target !== _this4) {
            _this4.data = Handlers.update({
              model: _this4.data,
              dom: _this4.dom,
              component: _this4,
              element: rec.target,
              attribute: rec.attributeName
            });
          }
        });
      }
    }, {
      key: "onInputValueChanged",
      value: function onInputValueChanged(e) {
        this.data = Handlers.update({
          model: this.data,
          dom: this.dom,
          component: this,
          element: e.target
        });
      }
    }]);

    return ColorPicker;
  }(_wrapNativeSuper(HTMLElement));

  if (!customElements.get('wcia-color-picker')) {
    customElements.define('wcia-color-picker', ColorPicker);
  }

  return ColorPicker;
});
