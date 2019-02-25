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
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.coordpicker = factory());
})(void 0, function () {
  'use strict';

  var Template = {
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
  function (_HTMLElement) {
    _inherits(CoordPicker, _HTMLElement);

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
      var _this;

      _classCallCheck(this, CoordPicker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CoordPicker).call(this));

      if (CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && _this.attachShadow) {
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

    _createClass(CoordPicker, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.initialized) {
          this.root.innerHTML = Template.render({
            useShadowDOM: CoordPicker.USE_SHADOWDOM_WHEN_AVAILABLE && this.attachShadow
          });
          this.dom = Template.mapDOM(this.root);

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

  return CoordPicker;
});
