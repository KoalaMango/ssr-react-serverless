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
      localRequire.cache = {};

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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

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
})({"processor/engines/baseEngine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slugify = _interopRequireDefault(require("slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseEngine = {
  getPlaceholders: template => {
    const pattern = /{{(.*?)}}/g;
    return template.match(pattern);
  },
  replacePlaceholders: (template, replacementPattern) => {
    let newTemplate = '';
    newTemplate = template.replace(/{{(.*?)}}/g, (a, b) => {
      const patternSyntax = replacementPattern.split('|');
      const variablePrefix = patternSyntax.length > 2 && patternSyntax[2] || '';
      return `${patternSyntax[0]} ${variablePrefix}${b.trim()} ${patternSyntax[1]}`;
    });
    return newTemplate;
  },
  getFileName: name => {
    return (0, _slugify.default)(name.toLowerCase(), '_');
  }
};
var _default = baseEngine;
exports.default = _default;
},{}],"processor/engines/twig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseEngine = _interopRequireDefault(require("./baseEngine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getFileName
} = _baseEngine.default;
const twig = {
  parse: pattern => {
    return _baseEngine.default.replacePlaceholders(pattern.h_markup, '{{|}}');
  },
  getExtension: () => {
    return 'twig';
  }
};

var _default = Object.assign(twig, {
  getFileName
});

exports.default = _default;
},{"./baseEngine":"processor/engines/baseEngine.js"}],"processor/engines/phpD7.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseEngine = _interopRequireDefault(require("./baseEngine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getFileName
} = _baseEngine.default;
const phpD7 = {
  parse: pattern => {
    return _baseEngine.default.replacePlaceholders(pattern.h_markup, '<?php print|?>|$');
  },
  getExtension: () => {
    return 'tpl.php';
  }
};

var _default = Object.assign(phpD7, {
  getFileName
});

exports.default = _default;
},{"./baseEngine":"processor/engines/baseEngine.js"}],"processor/engines/react.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _esformatter = _interopRequireDefault(require("esformatter"));

var _camelcase = _interopRequireDefault(require("camelcase"));

var _baseEngine = _interopRequireDefault(require("./baseEngine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_esformatter.default.register(require('esformatter-jsx'));

const react = {
  parse: pattern => {
    const componentRender = _baseEngine.default.replacePlaceholders(pattern.h_markup, '{|}|props.').replace('class', 'className');

    return _esformatter.default.format(react.generateComponentSkeleton(componentRender, (0, _camelcase.default)(pattern.name)), {
      indent_size: 2,
      space_in_empty_paren: true
    });
  },
  generateComponentSkeleton: (content, name) => {
    return `
      import React from 'react';
      const ${name} = (props) => {
        return (
          ${content}
        );
      };
      export default ${name};
    `;
  },
  getExtension: () => {
    return 'jsx';
  },
  getFileName: name => {
    return (0, _camelcase.default)(name);
  }
};
var _default = react;
exports.default = _default;
},{"./baseEngine":"processor/engines/baseEngine.js"}],"processor/engines/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _twig = _interopRequireDefault(require("./twig"));

var _phpD = _interopRequireDefault(require("./phpD7"));

var _react = _interopRequireDefault(require("./react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  phpD7: _phpD.default,
  twig: _twig.default,
  react: _react.default
};
exports.default = _default;
},{"./twig":"processor/engines/twig.js","./phpD7":"processor/engines/phpD7.js","./react":"processor/engines/react.js"}],"processor/tprocessor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPattern = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _slugify = _interopRequireDefault(require("slugify"));

var _engines = _interopRequireDefault(require("./engines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const createPattern = (() => {
  var _ref = _asyncToGenerator(function* (pattern) {
    // Create dir if it does not exist.
    // First check if the patterns directory does not exist then create it.
    // This will be executed for the first pattern only.
    if (!_fs.default.existsSync('./patterns')) {
      yield _fs.default.mkdirSync('./patterns');
    }

    const filename = (0, _slugify.default)(pattern.name.toLowerCase(), '_');
    const path = `./patterns/${filename}`;

    if (!_fs.default.existsSync(path)) {
      yield _fs.default.mkdirSync(path);

      if (pattern.js) {
        yield _fs.default.writeFile(`${path}/${filename}.js`, pattern.js, function () {});
      }

      if (pattern.scss) {
        yield _fs.default.writeFile(`${path}/${filename}.scss`, pattern.scss, function () {});
      }

      yield Object.keys(_engines.default).forEach((() => {
        var _ref2 = _asyncToGenerator(function* (engine) {
          const extension = _engines.default[engine].getExtension();

          const contents = _engines.default[engine].parse(pattern);

          const templateName = _engines.default[engine].getFileName(pattern.name);

          yield _fs.default.writeFile(`${path}/${templateName}.${extension}`, contents, function () {});
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      })());
    }
  });

  return function createPattern(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.createPattern = createPattern;
},{"./engines":"processor/engines/index.js"}],"services/github.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSubmission = void 0;

var _githubApi = _interopRequireDefault(require("github-api"));

var _slugify = _interopRequireDefault(require("slugify"));

var _shelljs = _interopRequireDefault(require("shelljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const handleSubmission = (() => {
  var _ref = _asyncToGenerator(function* (pattern) {
    const barnchName = `feature/${(0, _slugify.default)(pattern.name.toLowerCase(), '_')}`; // basic auth

    const gh = new _githubApi.default({
      // username: 'StrikoMirko',
      // password: 'tetak21',
      token: '6867ae0b14e7c2d7dcb1fd4a554f7003adda1abf'
    });
    const repo = gh.getRepo('KoalaMango', 'ssr-react-serverless');
    const allBranches = yield repo.listBranches();
    const branchExists = allBranches.data.filter(function (b) {
      return b.name === barnchName;
    }).length !== 0;

    if (!branchExists) {
      yield _shelljs.default.exec(`./services/github.sh ${barnchName}`);
      const pull = {
        title: pattern.name,
        body: `Pull request for pattern ${barnchName}`,
        base: 'master',
        head: barnchName
      };

      try {
        const pr = yield repo.createPullRequest(pull);
        return pr.html_url;
      } catch (e) {
        throw new Error(e);
      }
    }
  });

  return function handleSubmission(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.handleSubmission = handleSubmission;
},{}],"src/Data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Data() {
  return (0, _isomorphicFetch.default)('https://www.cancerresearchuk.org/cruk-navigation/menu-mdd/json').then(data => data.json());
}

var _default = Data;
exports.default = _default;
},{}],"src/Search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Search extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  onBlur() {
    this.setState({
      focused: false
    });
  }

  render() {
    const defaultSubmitCallback = e => e.preventDefault();

    return _react.default.createElement("form", {
      role: "search",
      onSubmit: this.props.submitCallback || defaultSubmitCallback,
      className: `cr-search-input${this.state.focused ? ' cr-search-input--focused' : ''}`,
      action: this.props.searchUrl
    }, _react.default.createElement("label", {
      htmlFor: this.props.uniqueId,
      className: "cr-search-input__label"
    }, this.props.label), _react.default.createElement("input", {
      type: "search",
      name: this.props.name,
      id: this.props.uniqueId,
      onChange: this.props.changeCallback,
      className: "cr-search-input__input",
      placeholder: this.props.label,
      autoComplete: "off",
      autoCorrect: "off",
      onBlur: this.onBlur,
      onFocus: this.onFocus
    }), _react.default.createElement("button", {
      type: "submit",
      className: "cr-search-input__button",
      "aria-label": "Submit your search"
    }, "Go"));
  }

}

Search.defaultProps = {
  label: 'Search',
  searchUrl: 'https://find.cancerresearchuk.org/',
  name: 'xss-q'
};
Search.propTypes = {
  changeCallback: _propTypes.default.func,
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  submitCallback: _propTypes.default.func,
  uniqueId: _propTypes.default.string,
  searchUrl: _propTypes.default.string
};
var _default = Search;
exports.default = _default;
},{}],"src/MegaMenu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Search = _interopRequireDefault(require("./Search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class MegaMenu extends _react.Component {
  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
    this.handleMenuItem = this.handleMenuItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleMenuItem(href, title) {
    const regex = /(twitter\.com|facebook\.com|addthis\.com|ebay)/;
    const found = href.match(regex);
    return _react.default.createElement("a", {
      role: "menuitem",
      href: href,
      className: !found ? 'internal' : 'external',
      target: !found ? '_self' : '_blank'
    }, title);
  }

  handleChange(e) {
    document.querySelectorAll('.cr-menu__btn').forEach(el => el.checked = false);
    document.getElementById(e.target.id).checked = true;
  } // @TODO: Refactor and extract checkbox to separate reusable component


  handleNav(data) {
    const menuItems = Object.keys(data).filter(obj => data[obj]['#title'] !== undefined).sort((a, b) => data[a]['#original_link'].weight - data[b]['#original_link'].weight).map(obj => {
      const level1 = data[obj];

      const menuBar = _react.default.createElement("div", {
        className: "cr-menu__block"
      }, _react.default.createElement("span", null), this.handleMenuItem(level1['#href'], level1['#title']));

      const menus = Object.keys(level1['#below']).filter(obj2 => level1['#below'][obj2]['#title'] !== undefined).map(obj2 => {
        const level2 = level1['#below'][obj2];
        const menuItem = Object.keys(level2['#below']).filter(obj3 => level2['#below'][obj3]['#title'] !== undefined).sort((a, b) => level2['#below'][a]['#original_link'].weight - level2['#below'][b]['#original_link'].weight).map(obj3 => {
          const level3 = level2['#below'][obj3];
          return _react.default.createElement("li", {
            key: level3['#title']
          }, this.handleMenuItem(level3['#href'], level3['#title']));
        });
        return _react.default.createElement("li", {
          key: level2['#title']
        }, this.handleMenuItem(level2['#href'], level2['#title']), _react.default.createElement("ul", null, menuItem));
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

  render() {
    const {
      menu
    } = this.props;
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
    }, _react.default.createElement(_Search.default, null)))));
  }

}

exports.default = MegaMenu;
},{"./Search":"src/Search.js"}],"src/PatternBuilder/PatternBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PatternBuilder = () => {
  return _react.default.createElement("form", {
    className: "pure-form pure-form-aligned",
    action: "/pattern-submitted",
    method: "POST"
  }, _react.default.createElement("fieldset", null, _react.default.createElement("div", {
    className: "pure-control-group"
  }, _react.default.createElement("label", {
    htmlFor: "name"
  }, "Pattern name"), _react.default.createElement("input", {
    type: "text",
    name: "name",
    id: "name",
    className: "pure-input-1-2",
    placeholder: "Add pattern name here"
  })), _react.default.createElement("div", {
    className: "pure-control-group"
  }, _react.default.createElement("label", {
    htmlFor: "scss"
  }, "SCSS"), _react.default.createElement("textarea", {
    name: "scss",
    id: "scss",
    className: "pure-input-1-2",
    placeholder: "Add scss here"
  })), _react.default.createElement("div", {
    className: "pure-control-group"
  }, _react.default.createElement("label", {
    htmlFor: "js"
  }, "Vanilla JS"), _react.default.createElement("textarea", {
    name: "js",
    id: "js",
    className: "pure-input-1-2",
    placeholder: "Add Vanilla javascript here"
  })), _react.default.createElement("div", {
    className: "pure-control-group"
  }, _react.default.createElement("label", {
    htmlFor: "h_markup"
  }, "Handlebars template"), _react.default.createElement("textarea", {
    name: "h_markup",
    id: "h_markup",
    className: "pure-input-1-2",
    placeholder: "Add Handlebars template here"
  })), _react.default.createElement("button", {
    type: "submit",
    className: "pure-button pure-button-primary"
  }, "Submit")));
};

var _default = PatternBuilder;
exports.default = _default;
},{}],"src/PatternBuilder/PatternBuilderSubmitted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PatternBuilderSubmitted = props => {
  const link = _react.default.createElement("a", {
    href: props.prLink
  }, "props.prLink");

  return _react.default.createElement("div", null, _react.default.createElement("h1", null, "Successfully submitted"), _react.default.createElement("p", null, "Thank you for your contribution. We will examine your submission and notify you if it satisfies our standards."), _react.default.createElement("p", null, "Have a nice day UI/design/web design/sorta JS/Sorta CSS person :)"), _react.default.createElement("p", null, "You can view your PR here ", link));
};

var _default = PatternBuilderSubmitted;
exports.default = _default;
},{}],"server.js":[function(require,module,exports) {
"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _serverlessHttp = _interopRequireDefault(require("serverless-http"));

var _tprocessor = require("./processor/tprocessor");

var _github = require("./services/github");

var _Data = _interopRequireDefault(require("./src/Data"));

var _MegaMenu = _interopRequireDefault(require("./src/MegaMenu"));

var _PatternBuilder = _interopRequireDefault(require("./src/PatternBuilder/PatternBuilder"));

var _PatternBuilderSubmitted = _interopRequireDefault(require("./src/PatternBuilder/PatternBuilderSubmitted"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_express.default.static(_path.default.resolve(__dirname, "./build")));

const markup = _fs.default.readFileSync(__dirname + "/index.html", "utf8");

app.get("/api", (req, res) => {
  (0, _Data.default)().then(menuData => {
    const html = (0, _server.renderToString)(_react.default.createElement(_MegaMenu.default, {
      menu: menuData
    }));
    res.json({
      pattern: 'Mega Menu',
      html_markup: html
    });
  });
});
app.get("/", (req, res) => {
  (0, _Data.default)().then(menuData => {
    const html = (0, _server.renderToString)(_react.default.createElement(_MegaMenu.default, {
      menu: menuData
    }));
    res.send(markup.replace("<!--App-->", html));
  });
});
app.get("/pattern-builder", (req, res) => {
  const html = (0, _server.renderToString)(_react.default.createElement(_PatternBuilder.default, null));
  res.send(markup.replace("<!--App-->", html));
});
app.post("/pattern-submitted", (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    yield (0, _tprocessor.createPattern)(req.body);
    const result = yield (0, _github.handleSubmission)(req.body);
    const html = (0, _server.renderToString)(_react.default.createElement(_PatternBuilderSubmitted.default, {
      prLink: result
    }));
    res.send(markup.replace("<!--App-->", html));
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());
module.exports.ssr = (0, _serverlessHttp.default)(app);
},{"./processor/tprocessor":"processor/tprocessor.js","./services/github":"services/github.js","./src/Data":"src/Data.js","./src/MegaMenu":"src/MegaMenu.js","./src/PatternBuilder/PatternBuilder":"src/PatternBuilder/PatternBuilder.js","./src/PatternBuilder/PatternBuilderSubmitted":"src/PatternBuilder/PatternBuilderSubmitted.js"}]},{},["server.js"], null)