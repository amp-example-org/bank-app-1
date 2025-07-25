/**
 * Angular 7 Runtime - Legacy Build Output
 * This represents webpack runtime code that would be generated
 */

// Legacy: Webpack runtime with global pollution
(function(global) {
    'use strict';
    
    var __webpack_require__ = function(moduleId) {
        // Legacy module resolution
        return modules[moduleId] || {};
    };
    
    var modules = {};
    
    // Legacy polyfills for IE11 support (common in 2018)
    if (!Array.prototype.includes) {
        Array.prototype.includes = function(searchElement) {
            return this.indexOf(searchElement) !== -1;
        };
    }
    
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }
            return this.substr(start).indexOf(search) !== -1;
        };
    }
    
    // Legacy: Object.assign polyfill
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }
    
    // Legacy: Promise polyfill check
    if (typeof Promise === 'undefined') {
        console.warn('Promise polyfill required for legacy browsers');
    }
    
    // Legacy: Console safety for IE
    if (typeof console === 'undefined') {
        window.console = {
            log: function() {},
            warn: function() {},
            error: function() {}
        };
    }
    
    console.log('Angular 7 Runtime initialized (Legacy Build)');
    
})(this);
