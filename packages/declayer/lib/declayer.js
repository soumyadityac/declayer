(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("declayer", [], factory);
	else if(typeof exports === 'object')
		exports["declayer"] = factory();
	else
		root["declayer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/declayer.js":
/*!*************************!*\
  !*** ./src/declayer.js ***!
  \*************************/
/*! exports provided: Component, createCustomElement, attachAppToDOM, getRootElementState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCustomElement\", function() { return createCustomElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"attachAppToDOM\", function() { return attachAppToDOM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRootElementState\", function() { return getRootElementState; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable no-undef */\nvar getKey = function getKey(Tag, properties) {\n  return \"\".concat(Tag, \"-\").concat(JSON.stringify(properties));\n};\n\nvar appCache = {};\nvar mountedObjectCache = {};\nfunction Component() {}\nfunction createCustomElement(Tag, properties, eventListeners) {\n  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n\n  if (Object.getPrototypeOf(Tag) === Component) {\n    var uniqKey = getKey(Tag, properties);\n\n    if (!mountedObjectCache[uniqKey]) {\n      mountedObjectCache[uniqKey] = new Tag(properties, eventListeners, children);\n    }\n\n    return mountedObjectCache[uniqKey].mount();\n  }\n\n  var ele = document.createElement(Tag);\n  Object.assign(ele, properties);\n\n  if (eventListeners) {\n    Object.keys(eventListeners).forEach(function (key) {\n      ele.addEventListener(key, eventListeners[key]);\n    });\n  }\n\n  if (children.length) {\n    children.forEach(function (element) {\n      if (typeof element === 'string') element = document.createTextNode(element);\n      ele.appendChild(element);\n    });\n  }\n\n  return ele;\n}\nfunction attachAppToDOM(_ref) {\n  var domNode = _ref.domNode,\n      element = _ref.element,\n      properties = _ref.properties;\n\n  if (!appCache.attachToDomProps) {\n    appCache.attachToDomProps = {\n      domNode: domNode,\n      element: element,\n      properties: properties\n    };\n  }\n\n  domNode.innerHTML = ''; // eslint-disable-line no-param-reassign\n\n  domNode.appendChild(createCustomElement(element, properties));\n} // eslint-disable-next-line func-names\n\nComponent.prototype.setState = function (newState) {\n  this.state = _objectSpread(_objectSpread({}, this.state), newState);\n  attachAppToDOM(appCache.attachToDomProps);\n};\n\nfunction getRootElementState() {\n  var _appCache$attachToDom = appCache.attachToDomProps,\n      element = _appCache$attachToDom.element,\n      properties = _appCache$attachToDom.properties;\n  var key = getKey(element, properties);\n  var mountedObject = mountedObjectCache[key] || {};\n  return mountedObject.state;\n}\n\n//# sourceURL=webpack://declayer/./src/declayer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _declayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declayer */ \"./src/declayer.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Component: _declayer__WEBPACK_IMPORTED_MODULE_0__[\"Component\"],\n  Declare: {\n    createCustomElement: _declayer__WEBPACK_IMPORTED_MODULE_0__[\"createCustomElement\"],\n    attachAppToDOM: _declayer__WEBPACK_IMPORTED_MODULE_0__[\"attachAppToDOM\"],\n    getRootElementState: _declayer__WEBPACK_IMPORTED_MODULE_0__[\"getRootElementState\"]\n  }\n});\n\n//# sourceURL=webpack://declayer/./src/index.js?");

/***/ })

/******/ });
});