// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App = props => {
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      "h1",
      null,
      "Users"
    ),
    _react2.default.createElement(
      "ul",
      null,
      console.log(props.data)
    )
  );
};

exports.default = App;
},{}],7:[function(require,module,exports) {
  'use strict';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _react = _interopRequireWildcard(require("react"));

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// import Search from './Search';
    var MegaMenu =
      /*#__PURE__*/
      function (_Component) {
        _inherits(MegaMenu, _Component);

        function MegaMenu(props) {
          var _this;

          _classCallCheck(this, MegaMenu);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(MegaMenu).call(this, props));
          _this.handleNav = _this.handleNav.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.handleMenuItem = _this.handleMenuItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          return _this;
        }

        _createClass(MegaMenu, [{
          key: "handleMenuItem",
          value: function handleMenuItem(href, title) {
            var regex = /(twitter\.com|facebook\.com|addthis\.com|ebay)/;
            var found = href.match(regex);
            return _react.default.createElement("a", {
              role: "menuitem",
              href: href,
              className: !found || 'external',
              target: !found || '_blank'
            }, title);
          }
        }, {
          key: "handleChange",
          value: function handleChange(e) {
            document.querySelectorAll('.cr-menu__btn').forEach(function (el) {
              return el.checked = false;
            });
            document.getElementById(e.target.id).checked = true;
          } // @TODO: Refactor and extract checkbox to separate reusable component

        }, {
          key: "handleNav",
          value: function handleNav(data) {
            var _this2 = this;

            var menuItems = Object.keys(data).filter(function (obj) {
              return data[obj]['#title'] !== undefined;
            }).sort(function (a, b) {
              return data[a]['#original_link'].weight - data[b]['#original_link'].weight;
            }).map(function (obj) {
              var level1 = data[obj];

              var menuBar = _react.default.createElement("div", {
                className: "cr-menu__block"
              }, _react.default.createElement("span", null), _this2.handleMenuItem(level1['#href'], level1['#title']));

              var menus = Object.keys(level1['#below']).filter(function (obj2) {
                return level1['#below'][obj2]['#title'] !== undefined;
              }).map(function (obj2) {
                var level2 = level1['#below'][obj2];
                var menuItem = Object.keys(level2['#below']).filter(function (obj3) {
                  return level2['#below'][obj3]['#title'] !== undefined;
                }).sort(function (a, b) {
                  return level2['#below'][a]['#original_link'].weight - level2['#below'][b]['#original_link'].weight;
                }).map(function (obj3) {
                  var level3 = level2['#below'][obj3];
                  return _react.default.createElement("li", {
                    key: level3['#title']
                  }, _this2.handleMenuItem(level3['#href'], level3['#title']));
                });
                return _react.default.createElement("li", {
                  key: level2['#title']
                }, _this2.handleMenuItem(level2['#href'], level2['#title']), _react.default.createElement("ul", null, menuItem));
              });
              return _react.default.createElement("li", {
                key: level1['#title']
              }, menuBar, _react.default.createElement("ul", {
                role: "menu"
              }, menus));
            });
            return _react.default.createElement("nav", {
              className: "cr-menu__nav"
            }, _react.default.createElement("ul", {
              role: "menubar",
              tabIndex: "0"
            }, menuItems));
          }
        }, {
          key: "render",
          value: function render() {
            var menu = this.props.menu;
            return _react.default.createElement("div", {
              className: "cr-menu__wrapper"
            }, _react.default.createElement("hr", {
              className: "cr-menu__divider"
            }), _react.default.createElement("div", {
              className: "cr-menu__inner"
            }, _react.default.createElement("div", {
              className: "cr-menu"
            }, _react.default.createElement("input", {
              type: "checkbox",
              id: "cr-menu__btn--menu",
              className: "cr-menu__btn",
              onClick: this.handleChange
            }), _react.default.createElement("label", {
              htmlFor: "cr-menu__btn--menu",
              className: "cr-menu__label"
            }, "Menu"), _react.default.createElement("input", {
              type: "checkbox",
              id: "cr-menu__btn--search",
              className: "cr-menu__btn",
              onClick: this.handleChange
            }), _react.default.createElement("label", {
              htmlFor: "cr-menu__btn--search",
              className: "cr-menu__label"
            }, "Search"), _react.default.createElement("div", {
              className: "cr-menu__main-menu"
            }, this.handleNav(menu)), _react.default.createElement("div", {
              className: "cr-menu__search"
            }))));
          }
        }]);

        return MegaMenu;
      }(_react.Component);

    exports.default = MegaMenu;

},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Data() {
    return (0, _isomorphicFetch2.default)('https://www.cancerresearchuk.org/cruk-navigation/menu-mdd/json').then(data => data.json());
}
exports.default = Data;
},{}],1:[function(require,module,exports) {
"use strict";

var _serverlessHttp = require("serverless-http");

var _serverlessHttp2 = _interopRequireDefault(_serverlessHttp);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _App = require("./src/App");

var _App2 = _interopRequireDefault(_App);

var _MegaMenu = require("./src/MegaMenu");

var _MegaMenu2 = _interopRequireDefault(_MegaMenu);

var _users = require("./src/users");

var _users2 = _interopRequireDefault(_users);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.resolve(__dirname, "./Browser")));

const markup = _fs2.default.readFileSync(__dirname + "/index.html", "utf8");

app.get("**", (req, res) => {
  (0, _users2.default)().then(menuData => {
    const html = (0, _server.renderToString)(_react2.default.createElement(_MegaMenu2.default, { menu: menuData }));
    res.send(markup.replace("<!--App-->", html));
  });
});

module.exports.ssr = (0, _serverlessHttp2.default)(app);
},{"./src/App":5,"./src/users":6, "./src/MegaMenu":7}]},{},[1], null)
//# sourceMappingURL=handler.map
