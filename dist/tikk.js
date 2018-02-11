// [AIV]  Tikk Build version: 1.0.2  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tikk", [], factory);
	else if(typeof exports === 'object')
		exports["tikk"] = factory();
	else
		root["tikk"] = factory();
})(this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(4);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(3);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate, clearImmediate) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flak = __webpack_require__(6);

if (typeof global !== 'undefined') {
    global.performance = Date;
    global.requestAnimationFrame = function (fn) {
        return setImmediate(function () {
            fn();
        });
    };
    global.cancelAnimationFrame = function (id) {
        return clearImmediate(id);
    };
}

/**
 * Tikk handler
 * @typedef {Function} Tikk~handler
 * @property {number} value - can be offset between 0 and 1 if duration is specified or delta (in ms) if no duration is specified. Usually 16 or 17
 * @property {number} elapsed - elapsed time
 */

/**
 * @class
 */

var Tikk = function () {

    /**
     * Create instance
     * @param handler {Tikk~handler}
     * @param duration {number}
     */
    function Tikk(handler) {
        var _this = this;

        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Tikk);

        Object.defineProperties(this, {
            emitter: {
                value: new Flak()
            },

            req: {
                writable: true,
                value: null
            },

            start: {
                writable: true,
                value: 0
            },

            elapsed: {
                writable: true,
                value: 0
            },

            currentTime: {
                writable: true,
                value: 0
            },

            lastTime: {
                writable: true,
                value: 0
            },

            state: {
                writable: true,
                value: null
            }
        });

        this.tick = function () {
            _this.currentTime = _this.state === 'pause' ? _this.currentTime : performance.now();

            if (!_this.start) _this.start = _this.currentTime;

            _this.elapsed = _this.currentTime - _this.start;

            handler(duration ? _this.elapsed / duration : _this.currentTime - _this.lastTime, _this.elapsed);

            _this.req = requestAnimationFrame(_this.tick);

            _this.lastTime = _this.currentTime;

            if (duration && _this.elapsed >= duration) _this.stop();
        };
    }

    /**
     * Play animation
     * @returns {Tikk}
     */


    _createClass(Tikk, [{
        key: 'play',
        value: function play() {
            this.emitter.fire('play');
            this.state = 'play';
            this.tick();
            return this;
        }

        /**
         * Pause animation
         * @returns {Tikk}
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.emitter.fire('pause', this.elapsed);
            cancelAnimationFrame(this.req);
            this.state = 'pause';
            return this;
        }

        /**
         * Stop animation
         * @returns {Tikk}
         */

    }, {
        key: 'stop',
        value: function stop() {
            cancelAnimationFrame(this.req);
            this.emitter.fire('stop', this.elapsed);
            this.state = 'stop';
            this.start = 0;
            this.elapsed = 0;
            return this;
        }

        /**
         * Returns state can be play, pause, stop
         * @returns {string}
         */

    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }

        /**
         * Add event
         * @param eventName {string} event name
         * @param callback {Function} callback
         * @returns {Tikk}
         */

    }, {
        key: 'on',
        value: function on(eventName, callback) {
            this.emitter.on.call(this.emitter, eventName, callback);
            return this;
        }

        /**
         * Suspends firing of the named event(s).
         * @param eventName {...string} multiple event names to suspend
         * @returns {Tikk}
         */

    }, {
        key: 'suspendEvent',
        value: function suspendEvent() {
            for (var _len = arguments.length, eventName = Array(_len), _key = 0; _key < _len; _key++) {
                eventName[_key] = arguments[_key];
            }

            this.emitter.suspendEvent.call(this.emitter, eventName);
            return this;
        }

        /**
         * Resumes firing of the named event(s).
         * @param eventName {...string} multiple event names to resume.
         * @returns {Tikk}
         */

    }, {
        key: 'resumeEvent',
        value: function resumeEvent() {
            for (var _len2 = arguments.length, eventName = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                eventName[_key2] = arguments[_key2];
            }

            this.emitter.resumeEvent.call(this.emitter, eventName);
            return this;
        }

        /**
         * Suspends all events.
         * @returns {Tikk}
         */

    }, {
        key: 'suspendEvents',
        value: function suspendEvents() {
            this.emitter.suspendEvents.call(this.emitter);
            return this;
        }

        /**
         * Resume all events.
         * @returns {Tikk}
         */

    }, {
        key: 'resumeEvents',
        value: function resumeEvents() {
            this.emitter.resumeEvents.call(this.emitter);
            return this;
        }

        /**
         * Triggered at play
         * @event Tikk#play
         */

        /**
         * Triggered at pause
         * @event Tikk#pause
         * @param elapsed {number}
         */

        /**
         * Triggered at stop
         * @event Tikk#stop
         * @param elapsed {number}
         */

    }]);

    return Tikk;
}();

module.exports = Tikk;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1).setImmediate, __webpack_require__(1).clearImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// [AIV]  Flak Build version: 1.0.0  
(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["flak"] = factory();else root["flak"] = factory();
})(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 0);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            module.exports = __webpack_require__(1);

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var helper = __webpack_require__(2);
            var error = __webpack_require__(3);

            var Flak = function () {
                //TODO add support to cross-domain through postMessage, see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
                /**
                 * Constructor
                 * @param [opts] {Object} options
                 * @param [opts.maxListeners=10] {number} Max number listeners per event
                 * @param [opts.asyncDelay=10] {number} Delay in ms for async method `fireAsync`
                 * @example
                 * const emitter = new Flak();
                 */
                function Flak() {
                    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    _classCallCheck(this, Flak);

                    /**
                     * Class options
                     * @type {{maxListeners: number, asyncDelay: number}}
                     * @ignore
                     */
                    this.defaultClassOpts = {
                        maxListeners: 10,
                        asyncDelay: 10 // ms
                    };

                    /**
                     * Event options
                     * @type {{maxCalls: number, prepend: boolean}}
                     * @ignore
                     */
                    this.defaultListenerOpts = {
                        maxCalls: 0,
                        prepend: false
                    };

                    this.opts = helper.defaults(opts, this.defaultClassOpts);
                    this.events = {};
                }

                /**
                 * Create event and add listener
                 * @param eventName {string} event name
                 * @param listener {Function} listener function
                 * @param [opts] {Object} option object
                 * @param [opts.maxCalls=0] {number} Max calls for event created, disabled if is `0`
                 * @param [opts.prepend=false] {boolean} Adds the listener function to the beginning of the listeners array for the event named `eventName`
                 * @private
                 * @ignore
                 */

                _createClass(Flak, [{
                    key: '_createEvent',
                    value: function _createEvent(eventName, listener, opts) {

                        if (!this.events[eventName]) this.events[eventName] = [];

                        if (this.opts.maxListeners) {
                            var maxListeners = this.opts.maxListeners;
                            var listenersCount = this.events[eventName].length;
                            if (listenersCount >= maxListeners) throw new Error(error[3] + maxListeners);
                        }

                        listener.opts = helper.defaults(opts, this.defaultListenerOpts);

                        listener.state = {
                            suspended: false,
                            calls: 0
                        };

                        if (opts.prepend) this.events[eventName].unshift(listener);else this.events[eventName].push(listener);

                        this._created.call(this, eventName, listener, opts);
                    }

                    /**
                     * Call event
                     * @param eventName {string} event name
                     * @param eventListener {Function} event listener
                     * @param args args {*} ...arguments
                     * @private
                     * @ignore
                     */

                }, {
                    key: '_callEvent',
                    value: function _callEvent(eventName, eventListener, args) {
                        if (eventListener.state.suspended) return;

                        if (eventListener.opts.maxCalls && eventListener.state.calls++ >= eventListener.opts.maxCalls) {
                            this.off(eventName, eventListener);
                            return;
                        }

                        this._catchAll.call(this, args);
                        return eventListener.apply(this, args);
                    }

                    /**
                     *
                     * @param events {Array} event list
                     * @param suspended {boolean}
                     * @returns {Flak}
                     * @private
                     * @ignore
                     */

                }, {
                    key: '_suspendEvent',
                    value: function _suspendEvent() {
                        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                        var suspended = arguments[1];

                        var eventName = void 0;

                        for (var event in events) {
                            eventName = events[event];
                            if (this.events[eventName]) {
                                this.events[eventName].forEach(function (e) {
                                    e.state.suspended = suspended;
                                });
                            }
                        }

                        return this;
                    }

                    /**
                     * Callback on create
                     * @private
                     * @ignore
                     */

                }, {
                    key: '_created',
                    value: function _created() {}

                    /**
                     * Callback on remove
                     * @private
                     * @ignore
                     */

                }, {
                    key: '_removed',
                    value: function _removed() {}

                    /**
                     * Callback catch all
                     * @private
                     * @ignore
                     */

                }, {
                    key: '_catchAll',
                    value: function _catchAll() {}

                    /**
                     * Adds event listener for eventName
                     * @param eventName {string} event name
                     * @param listener {(Function|Function[])} listener function
                     * @param [opts] {Object} option object
                     * @param [opts.maxCalls=0] {number} Max calls for event created, disabled if is `0`
                     * @param [opts.prepend=false] {boolean} Adds the listener function to the beginning of the listeners array for the event named `eventName`
                     * @returns {Flak}
                     * @example
                     * emitter.on('myEvent', (param)=>{
                     *      console.log(param);
                     * });
                     */

                }, {
                    key: 'on',
                    value: function on(eventName, listener) {
                        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                        if (!helper.is(eventName, 'string')) throw new Error(error[0]);

                        eventName = eventName.trim();

                        if (!eventName.length) throw new Error(error[4]);

                        if (helper.is(listener, 'array')) {
                            for (var i in listener) {
                                if (listener.hasOwnProperty(i)) {
                                    if (!helper.is(listener[i], 'function')) throw new Error(error[1]);
                                    this._createEvent(eventName, listener[i], opts);
                                }
                            }
                        } else {
                            if (!helper.is(listener, 'function')) throw new Error(error[1]);
                            this._createEvent(eventName, listener, opts);
                        }

                        return this;
                    }

                    /**
                     * Adds a one time listener function for the event named eventName.
                     * This is a wrapper method of `on` that set to `opts.maxCalls = 1`
                     * @param eventName {string} event name
                     * @param listener {(Function|Function[])} listener function
                     * @returns {Flak}
                     * @example
                     * emitter.once('myEvent', (param)=>{
                     *      console.log(param);
                     * });
                     */

                }, {
                    key: 'once',
                    value: function once(eventName, listener) {
                        return this.on(eventName, listener, {
                            maxCalls: 1
                        });
                    }

                    /**
                     * Calls each of the listeners registered for the event
                     * @param eventName {string} event name
                     * @param [args] {*} ...arguments
                     * @returns {Flak}
                     * @example
                     * emitter.fire('myEvent', param1, param2, ...);
                     */

                }, {
                    key: 'fire',
                    value: function fire(eventName) {

                        if (this.exists(eventName)) {
                            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                                args[_key - 1] = arguments[_key];
                            }

                            for (var j = 0; j < this.events[eventName].length; j++) {
                                this._callEvent(eventName, this.events[eventName][j], args);
                            }
                        }return this;
                    }

                    /**
                     * Calls the first of the listeners registered for the event and return it
                     * @param eventName {string} event name
                     * @param [args] {*} ...arguments
                     * @returns {*}
                     * @since 0.3.0
                     * @example
                     * emitter.on('myEvent', (param1, param2)=>{
                     *      return param1 + '-' + param2;
                     * });
                     * console.log('foo-bar' === emitter.fireTheFirst('myEvent', 'foo', 'bar')) //=> true;
                     */

                }, {
                    key: 'fireTheFirst',
                    value: function fireTheFirst(eventName) {
                        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                            args[_key2 - 1] = arguments[_key2];
                        }

                        /* istanbul ignore else  */
                        if (this.exists(eventName)) return this._callEvent(eventName, this.events[eventName][0], args);
                    }

                    /**
                     * Calls each of the listeners registered for the event, this method is async
                     * @param eventName {string} event name
                     * @param args {*} ...arguments
                     * @example
                     * emitter.fireAsync('myEvent', param1, param2, ...);
                     */

                }, {
                    key: 'fireAsync',
                    value: function fireAsync(eventName) {
                        var _this = this;

                        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                            args[_key3 - 1] = arguments[_key3];
                        }

                        args.unshift(eventName);
                        setTimeout(function () {
                            _this.fire.apply(_this, args);
                        }, this.opts.asyncDelay);
                    }

                    /**
                     * Remove event/listener
                     * @param eventName {string} event name
                     * @param [listener] {Function} listener function, if is set remove listener only for this event
                     * @returns {Flak}
                     * @example
                     * emitter.off('myEvent'); // remove event
                     * emitter.off('myEvent', listener); // remove specific listener
                     */

                }, {
                    key: 'off',
                    value: function off(eventName, listener) {
                        if (!helper.is(eventName, 'string')) throw new Error(error[0]);

                        /* istanbul ignore else  */
                        if (this.events[eventName]) if (typeof listener === 'function') {
                            for (var i = 0; i < this.events[eventName].length; i++) {
                                if (this.events[eventName][i] === listener) {
                                    this.events[eventName].splice(i, 1);
                                    this._removed.call(this, eventName, listener);
                                }
                            }
                        } else {
                            delete this.events[eventName];
                            this._removed.call(this, eventName);
                        }

                        return this;
                    }

                    /**
                     * Adds the listener function to the beginning of the listeners array for the event named eventName.
                     * This is a wrapper method of `on` that set to `opts.prepend = true`
                     * @param eventName {string} event name
                     * @param listener {(Function|Function[])} listener function
                     * @returns {Flak}
                     */

                }, {
                    key: 'prependListener',
                    value: function prependListener(eventName, listener) {
                        return this.on(eventName, listener, {
                            prepend: true
                        });
                    }

                    /**
                     * Adds a one time listener function to the beginning of the listeners array for the event named eventName.
                     * This is a wrapper method of `on` that set to `opts.maxCalls = 1` and `opts.prepend = true`
                     * @param eventName {string} event name
                     * @param listener {(Function|Function[])} listener function
                     * @returns {Flak}
                     */

                }, {
                    key: 'prependOnceListener',
                    value: function prependOnceListener(eventName, listener) {
                        return this.on(eventName, listener, {
                            maxCalls: 1,
                            prepend: true
                        });
                    }

                    /**
                     * Suspends firing of the named event(s).
                     * @param eventName {...string} multiple event names to suspend
                     * @returns {Flak}
                     */

                }, {
                    key: 'suspendEvent',
                    value: function suspendEvent() {
                        for (var _len4 = arguments.length, eventName = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            eventName[_key4] = arguments[_key4];
                        }

                        return this._suspendEvent(eventName, true);
                    }

                    /**
                     * Resumes firing of the named event(s).
                     * @param eventName {...string} multiple event names to resume.
                     * @returns {Flak}
                     */

                }, {
                    key: 'resumeEvent',
                    value: function resumeEvent() {
                        for (var _len5 = arguments.length, eventName = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                            eventName[_key5] = arguments[_key5];
                        }

                        return this._suspendEvent(eventName, false);
                    }

                    /**
                     * Suspends all events.
                     * @returns {Flak}
                     */

                }, {
                    key: 'suspendEvents',
                    value: function suspendEvents() {
                        return this._suspendEvent(Object.keys(this.events), true);
                    }

                    /**
                     * Resume all events.
                     * @returns {Flak}
                     */

                }, {
                    key: 'resumeEvents',
                    value: function resumeEvents() {
                        return this._suspendEvent(Object.keys(this.events), false);
                    }

                    /**
                     * Check if an event is suspended
                     * @param eventName {string}
                     * @returns {boolean}
                     */

                }, {
                    key: 'isSuspended',
                    value: function isSuspended(eventName) {
                        /* istanbul ignore else  */
                        if (!this.exists(eventName)) return false;
                        return this.events[eventName][0].state.suspended;
                    }

                    /**
                     * Remove all events
                     * @returns {Flak}
                     * @example
                     * emitter.clear();
                     */

                }, {
                    key: 'clear',
                    value: function clear() {
                        this.events = [];
                        return this;
                    }

                    /**
                     * Get listeners count
                     * @param eventName {string} event name
                     * @returns {number}
                     * @example
                     * emitter.on('event', listener1);
                     * emitter.on('event', listener2);
                     * emitter.on('event1', listener3);
                     *
                     * emitter.getListenersCount('event'); // 2
                     */

                }, {
                    key: 'getListenersCount',
                    value: function getListenersCount(eventName) {
                        return this.getListeners(eventName).length;
                    }

                    /**
                     * Get listeners list of event
                     * @param eventName {string} event name
                     * @returns {Array}
                     */

                }, {
                    key: 'getListeners',
                    value: function getListeners(eventName) {
                        if (!helper.is(eventName, 'string')) throw new Error(error[0]);

                        if (!this.exists(eventName)) throw new Error(error[5]);

                        return this.events[eventName];
                    }

                    /**
                     * Get events list
                     * @returns {Object}
                     */

                }, {
                    key: 'getEvents',
                    value: function getEvents() {
                        return this.events;
                    }

                    /**
                     * Check if event exists
                     * @param eventName {string} event name
                     * @returns {boolean}
                     */

                }, {
                    key: 'exists',
                    value: function exists(eventName) {
                        if (!helper.is(eventName, 'string')) throw new Error(error[0]);

                        return !helper.is(this.events[eventName], 'undefined');
                    }

                    /**
                     * Get max number of listeners per event
                     * @returns {number}
                     */

                }, {
                    key: 'getMaxListeners',
                    value: function getMaxListeners() {
                        return this.opts.maxListeners;
                    }

                    /**
                     * Set max number of listeners per event
                     * @param value {int} number max listeners
                     * @returns {Flak}
                     */

                }, {
                    key: 'setMaxListeners',
                    value: function setMaxListeners(value) {
                        if (!helper.is(value, 'number')) throw new Error(error[2]);

                        this.opts.maxListeners = value;
                        return this;
                    }

                    /**
                     * Triggered when an event is fired
                     * @param callback {Function} callback function
                     * @returns {Flak}
                     * @since 0.2.0
                     * @example
                     * emitter.onCatchAll(args=>{
                     *      // args is an array of params
                     *      console.log(args);
                     * });
                     *
                     * emitter.on('myEvent', param=>{
                     *      console.log(param);
                     * });
                     *
                     * emitter.fire('myEvent');
                     */

                }, {
                    key: 'onCatchAll',
                    value: function onCatchAll(callback) {
                        this._catchAll = callback;
                        return this;
                    }

                    /**
                     * Triggered when an event is created
                     * @param callback {Function} callback function
                     * @returns {Flak}
                     * @example
                     * emitter.onCreated(obj=>{
                     *      console.log(obj); //-> eventName, listener, opts
                     * });
                     *
                     * emitter.on('myEvent', (param)=>{
                     *      console.log(param);
                     * });
                     */

                }, {
                    key: 'onCreated',
                    value: function onCreated(callback) {
                        this._created = callback;
                        return this;
                    }

                    /**
                     * Triggered when an event is removed
                     * @param callback {Function} callback function
                     * @returns {Flak}
                     * @example
                     * emitter.onRemoved(obj=>{
                     *      console.log(obj); //-> eventName, (listener)
                     * });
                     *
                     * emitter.off('myEvent');
                     */

                }, {
                    key: 'onRemoved',
                    value: function onRemoved(callback) {
                        this._removed = callback;
                        return this;
                    }
                }]);

                return Flak;
            }();

            module.exports = Flak;
            module.exports._error = error;

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            };

            var helper = {};

            /**
             * Get object type
             * @param object {*}
             * @param type {string}
             * @returns {boolean}
             */
            helper.is = function (object, type) {
                var objectToString = Object.prototype.toString.call(object);
                return objectToString.toLowerCase() === '[object ' + type + ']'.toLowerCase();
            };

            /**
             * Set default value
             * @param opts {Object} options
             * @param defaultOpts {Object} default options
             * @returns {*}
             */
            helper.defaults = function (opts, defaultOpts) {
                for (var i in defaultOpts) {
                    if (defaultOpts.hasOwnProperty(i)) if (!opts.hasOwnProperty(i)) {
                        opts[i] = defaultOpts[i];
                    } else {
                        if (_typeof(opts[i]) === 'object') {
                            helper.defaults(opts[i], defaultOpts[i]);
                        }
                    }
                }
                return opts;
            };

            module.exports = helper;

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            module.exports = ['event name is required and must be a string', 'listener is required and must be a function or an array of function', 'value must be a number', 'increase maxListeners per event: ', 'event name not valid', 'event not found'];

            /***/
        }]
        /******/)
    );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ })
/******/ ]);
}); 