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
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.slider = factory());
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

  return Slider;
});
