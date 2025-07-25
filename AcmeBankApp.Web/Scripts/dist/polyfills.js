/**
 * Angular 7 Polyfills - Legacy Browser Support
 * Supporting IE11 and other legacy browsers common in enterprise environments
 */

// ES6 Map polyfill
if (typeof Map === 'undefined') {
    window.Map = function() {
        this._keys = [];
        this._values = [];
        this.size = 0;
    };
    
    Map.prototype.set = function(key, value) {
        var index = this._keys.indexOf(key);
        if (index === -1) {
            this._keys.push(key);
            this._values.push(value);
            this.size++;
        } else {
            this._values[index] = value;
        }
        return this;
    };
    
    Map.prototype.get = function(key) {
        var index = this._keys.indexOf(key);
        return index !== -1 ? this._values[index] : undefined;
    };
    
    Map.prototype.has = function(key) {
        return this._keys.indexOf(key) !== -1;
    };
    
    Map.prototype.delete = function(key) {
        var index = this._keys.indexOf(key);
        if (index !== -1) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            this.size--;
            return true;
        }
        return false;
    };
}

// ES6 Set polyfill
if (typeof Set === 'undefined') {
    window.Set = function() {
        this._values = [];
        this.size = 0;
    };
    
    Set.prototype.add = function(value) {
        if (this._values.indexOf(value) === -1) {
            this._values.push(value);
            this.size++;
        }
        return this;
    };
    
    Set.prototype.has = function(value) {
        return this._values.indexOf(value) !== -1;
    };
    
    Set.prototype.delete = function(value) {
        var index = this._values.indexOf(value);
        if (index !== -1) {
            this._values.splice(index, 1);
            this.size--;
            return true;
        }
        return false;
    };
}

// Fetch polyfill for legacy browsers
if (typeof fetch === 'undefined') {
    window.fetch = function(url, options) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            options = options || {};
            
            xhr.open(options.method || 'GET', url);
            
            if (options.headers) {
                for (var header in options.headers) {
                    xhr.setRequestHeader(header, options.headers[header]);
                }
            }
            
            xhr.onload = function() {
                resolve({
                    status: xhr.status,
                    json: function() {
                        return Promise.resolve(JSON.parse(xhr.responseText));
                    },
                    text: function() {
                        return Promise.resolve(xhr.responseText);
                    }
                });
            };
            
            xhr.onerror = function() {
                reject(new Error('Network error'));
            };
            
            xhr.send(options.body);
        });
    };
}

// CustomEvent polyfill for IE
if (typeof CustomEvent === 'undefined') {
    window.CustomEvent = function(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
}

// classList polyfill for IE9
if (!('classList' in document.createElement('_'))) {
    (function(view) {
        if (!('Element' in view)) return;
        
        var classListProp = 'classList',
            protoProp = 'prototype',
            elemCtrProto = view.Element[protoProp],
            objCtr = Object,
            strTrim = String[protoProp].trim || function() {
                return this.replace(/^\s+|\s+$/g, '');
            };
            
        var DOMTokenList = function(el) {
            this.el = el;
            var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
            for (var i = 0; i < classes.length; i++) {
                this.push(classes[i]);
            }
            this._updateClassName = function() {
                el.className = this.toString();
            };
        };
        
        DOMTokenList[protoProp] = [];
        DOMTokenList[protoProp].item = function(i) {
            return this[i] || null;
        };
        
        DOMTokenList[protoProp].contains = function(token) {
            token += '';
            return this.indexOf(token) !== -1;
        };
        
        DOMTokenList[protoProp].add = function() {
            var tokens = arguments;
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i] + '';
                if (this.indexOf(token) === -1) {
                    this.push(token);
                }
            }
            this._updateClassName();
        };
        
        DOMTokenList[protoProp].remove = function() {
            var tokens = arguments;
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i] + '';
                var index = this.indexOf(token);
                if (index !== -1) {
                    this.splice(index, 1);
                }
            }
            this._updateClassName();
        };
        
        DOMTokenList[protoProp].toggle = function(token, force) {
            token += '';
            var result = this.contains(token),
                method = result ? 
                    force !== true && 'remove' : 
                    force !== false && 'add';
            
            if (method) {
                this[method](token);
            }
            
            if (force === true || force === false) {
                return force;
            } else {
                return !result;
            }
        };
        
        DOMTokenList[protoProp].toString = function() {
            return this.join(' ');
        };
        
        if (objCtr.defineProperty) {
            var defineGetter = function(object, name, fn) {
                if (Object.defineProperty) {
                    Object.defineProperty(object, name, {
                        configurable: false,
                        enumerable: true,
                        get: fn
                    });
                }
            };
            
            defineGetter(elemCtrProto, classListProp, function() {
                return new DOMTokenList(this);
            });
        }
    }(window));
}

// requestAnimationFrame polyfill
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
            window[vendors[x] + 'CancelAnimationFrame'] || 
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { 
                callback(currTime + timeToCall); 
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

console.log('Legacy polyfills loaded for Angular 7 compatibility');
