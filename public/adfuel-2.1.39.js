(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.AdFuel = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	var now = _core.Date.now;

	var now$1 = now;

	var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
	var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

	var stringify$1 = stringify;

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var _parseInt$1 = _core.parseInt;

	var _parseInt$2 = _parseInt$1;

	var $parseFloat = _global.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var _parseFloat$1 = _core.parseFloat;

	var _parseFloat$2 = _parseFloat$1;

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode:  'pure' ,
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$1
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$2 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$2
	};

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	var $Object = _core.Object;
	var getOwnPropertyNames = function getOwnPropertyNames(it) {
	  return $Object.getOwnPropertyNames(it);
	};

	var getOwnPropertyNames$1 = getOwnPropertyNames;

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = keys;

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine = _hide;

	var _iterators = {};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (( FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var process$1 = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$2 = _global.process;
	var Promise = _global.Promise;
	var isNode = _cof(process$2) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$3 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$3
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator$1 = _global.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else _hide(target, key, src[key]);
	  } return target;
	};

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$3 = _global.process;
	var versions = process$3 && process$3.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$3) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$3.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library ), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve( this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	_export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = _newPromiseCapability.f(this);
	  var result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = _core.Promise;

	var promise$1 = promise;

	var f$4 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$4
	};

	var f$5 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$5
	};

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = assign;

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	var isArray = _core.Array.isArray;

	var isArray$1 = isArray;

	var f$6 = _wks;

	var _wksExt = {
		f: f$6
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = iterator;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol =  {} );
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$7 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON$1 = _global.JSON;
	var _stringify = $JSON$1 && $JSON$1.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON$1 && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON$1, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = symbol;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof symbol$1 === "function" && _typeof2(iterator$1) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	var isMobile = createCommonjsModule(function (module) {
	(function(global) {
	  var apple_phone = /iPhone/i,
	    apple_ipod = /iPod/i,
	    apple_tablet = /iPad/i,
	    android_phone = /\bAndroid(?:.+)Mobile\b/i, // Match 'Android' AND 'Mobile'
	    android_tablet = /Android/i,
	    amazon_phone = /\bAndroid(?:.+)SD4930UR\b/i,
	    amazon_tablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
	    windows_phone = /Windows Phone/i,
	    windows_tablet = /\bWindows(?:.+)ARM\b/i, // Match 'Windows' AND 'ARM'
	    other_blackberry = /BlackBerry/i,
	    other_blackberry_10 = /BB10/i,
	    other_opera = /Opera Mini/i,
	    other_chrome = /\b(CriOS|Chrome)(?:.+)Mobile/i,
	    other_firefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

	  function match(regex, userAgent) {
	    return regex.test(userAgent);
	  }

	  function isMobile(userAgent) {
	    var ua =
	      userAgent ||
	      (typeof navigator !== 'undefined' ? navigator.userAgent : '');

	    // Facebook mobile app's integrated browser adds a bunch of strings that
	    // match everything. Strip it out if it exists.
	    var tmp = ua.split('[FBAN');
	    if (typeof tmp[1] !== 'undefined') {
	      ua = tmp[0];
	    }

	    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
	    // iPhone" string. Same probably happens on other tablet platforms.
	    // This will confuse detection so strip it out if it exists.
	    tmp = ua.split('Twitter');
	    if (typeof tmp[1] !== 'undefined') {
	      ua = tmp[0];
	    }

	    var result = {
	      apple: {
	        phone: match(apple_phone, ua) && !match(windows_phone, ua),
	        ipod: match(apple_ipod, ua),
	        tablet:
	          !match(apple_phone, ua) &&
	          match(apple_tablet, ua) &&
	          !match(windows_phone, ua),
	        device:
	          (match(apple_phone, ua) ||
	            match(apple_ipod, ua) ||
	            match(apple_tablet, ua)) &&
	          !match(windows_phone, ua)
	      },
	      amazon: {
	        phone: match(amazon_phone, ua),
	        tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
	        device: match(amazon_phone, ua) || match(amazon_tablet, ua)
	      },
	      android: {
	        phone:
	          (!match(windows_phone, ua) && match(amazon_phone, ua)) ||
	          (!match(windows_phone, ua) && match(android_phone, ua)),
	        tablet:
	          !match(windows_phone, ua) &&
	          !match(amazon_phone, ua) &&
	          !match(android_phone, ua) &&
	          (match(amazon_tablet, ua) || match(android_tablet, ua)),
	        device:
	          (!match(windows_phone, ua) &&
	            (match(amazon_phone, ua) ||
	              match(amazon_tablet, ua) ||
	              match(android_phone, ua) ||
	              match(android_tablet, ua))) ||
	          match(/\bokhttp\b/i, ua)
	      },
	      windows: {
	        phone: match(windows_phone, ua),
	        tablet: match(windows_tablet, ua),
	        device: match(windows_phone, ua) || match(windows_tablet, ua)
	      },
	      other: {
	        blackberry: match(other_blackberry, ua),
	        blackberry10: match(other_blackberry_10, ua),
	        opera: match(other_opera, ua),
	        firefox: match(other_firefox, ua),
	        chrome: match(other_chrome, ua),
	        device:
	          match(other_blackberry, ua) ||
	          match(other_blackberry_10, ua) ||
	          match(other_opera, ua) ||
	          match(other_firefox, ua) ||
	          match(other_chrome, ua)
	      }
	    };
	    (result.any =
	      result.apple.device ||
	      result.android.device ||
	      result.windows.device ||
	      result.other.device),
	      // excludes 'other' devices and ipods, targeting touchscreen phones
	      (result.phone =
	        result.apple.phone || result.android.phone || result.windows.phone),
	      (result.tablet =
	        result.apple.tablet || result.android.tablet || result.windows.tablet);

	    return result;
	  }

	  if (
	    
	    module.exports &&
	    typeof window === 'undefined'
	  ) {
	    // Node.js
	    module.exports = isMobile;
	  } else if (
	    
	    module.exports &&
	    typeof window !== 'undefined'
	  ) {
	    // Browserify
	    module.exports = isMobile();
	    module.exports.isMobile = isMobile;
	  } else {
	    global.isMobile = isMobile();
	  }
	})(commonjsGlobal);
	});
	var isMobile_1 = isMobile.isMobile;

	var semver = createCommonjsModule(function (module, exports) {
	exports = module.exports = SemVer;

	var debug;
	/* istanbul ignore next */
	if (typeof process === 'object' &&
	    process.env &&
	    process.env.NODE_DEBUG &&
	    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
	  debug = function () {
	    var args = Array.prototype.slice.call(arguments, 0);
	    args.unshift('SEMVER');
	    console.log.apply(console, args);
	  };
	} else {
	  debug = function () {};
	}

	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';

	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
	  /* istanbul ignore next */ 9007199254740991;

	// Max safe segment length for coercion.
	var MAX_SAFE_COMPONENT_LENGTH = 16;

	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;

	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.

	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.

	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';

	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.

	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

	// ## Main Version
	// Three dot-separated numeric identifiers.

	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
	                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
	                   '(' + src[NUMERICIDENTIFIER] + ')';

	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
	                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
	                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.

	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
	                            '|' + src[NONNUMERICIDENTIFIER] + ')';

	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
	                                 '|' + src[NONNUMERICIDENTIFIER] + ')';

	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.

	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
	                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
	                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.

	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.

	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
	             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';

	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.

	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.

	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] +
	                src[PRERELEASE] + '?' +
	                src[BUILD] + '?';

	src[FULL] = '^' + FULLPLAIN + '$';

	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
	                 src[PRERELEASELOOSE] + '?' +
	                 src[BUILD] + '?';

	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';

	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';

	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
	                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
	                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
	                   '(?:' + src[PRERELEASE] + ')?' +
	                   src[BUILD] + '?' +
	                   ')?)?';

	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
	                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
	                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
	                        '(?:' + src[PRERELEASELOOSE] + ')?' +
	                        src[BUILD] + '?' +
	                        ')?)?';

	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

	// Coercion.
	// Extract anything that could conceivably be a part of a valid semver
	var COERCE = R++;
	src[COERCE] = '(?:^|[^\\d])' +
	              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
	              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
	              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
	              '(?:$|[^\\d])';

	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';

	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';

	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';

	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';

	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';

	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
	                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';

	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
	                   '\\s+-\\s+' +
	                   '(' + src[XRANGEPLAIN] + ')' +
	                   '\\s*$';

	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
	                        '\\s+-\\s+' +
	                        '(' + src[XRANGEPLAINLOOSE] + ')' +
	                        '\\s*$';

	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';

	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i]) {
	    re[i] = new RegExp(src[i]);
	  }
	}

	exports.parse = parse;
	function parse (version, options) {
	  if (!options || typeof options !== 'object') {
	    options = {
	      loose: !!options,
	      includePrerelease: false
	    };
	  }

	  if (version instanceof SemVer) {
	    return version
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  if (version.length > MAX_LENGTH) {
	    return null
	  }

	  var r = options.loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version)) {
	    return null
	  }

	  try {
	    return new SemVer(version, options)
	  } catch (er) {
	    return null
	  }
	}

	exports.valid = valid;
	function valid (version, options) {
	  var v = parse(version, options);
	  return v ? v.version : null
	}

	exports.clean = clean;
	function clean (version, options) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	}

	exports.SemVer = SemVer;

	function SemVer (version, options) {
	  if (!options || typeof options !== 'object') {
	    options = {
	      loose: !!options,
	      includePrerelease: false
	    };
	  }
	  if (version instanceof SemVer) {
	    if (version.loose === options.loose) {
	      return version
	    } else {
	      version = version.version;
	    }
	  } else if (typeof version !== 'string') {
	    throw new TypeError('Invalid Version: ' + version)
	  }

	  if (version.length > MAX_LENGTH) {
	    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
	  }

	  if (!(this instanceof SemVer)) {
	    return new SemVer(version, options)
	  }

	  debug('SemVer', version, options);
	  this.options = options;
	  this.loose = !!options.loose;

	  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);

	  if (!m) {
	    throw new TypeError('Invalid Version: ' + version)
	  }

	  this.raw = version;

	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];

	  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	    throw new TypeError('Invalid major version')
	  }

	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	    throw new TypeError('Invalid minor version')
	  }

	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	    throw new TypeError('Invalid patch version')
	  }

	  // numberify any prerelease numeric ids
	  if (!m[4]) {
	    this.prerelease = [];
	  } else {
	    this.prerelease = m[4].split('.').map(function (id) {
	      if (/^[0-9]+$/.test(id)) {
	        var num = +id;
	        if (num >= 0 && num < MAX_SAFE_INTEGER) {
	          return num
	        }
	      }
	      return id
	    });
	  }

	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}

	SemVer.prototype.format = function () {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length) {
	    this.version += '-' + this.prerelease.join('.');
	  }
	  return this.version
	};

	SemVer.prototype.toString = function () {
	  return this.version
	};

	SemVer.prototype.compare = function (other) {
	  debug('SemVer.compare', this.version, this.options, other);
	  if (!(other instanceof SemVer)) {
	    other = new SemVer(other, this.options);
	  }

	  return this.compareMain(other) || this.comparePre(other)
	};

	SemVer.prototype.compareMain = function (other) {
	  if (!(other instanceof SemVer)) {
	    other = new SemVer(other, this.options);
	  }

	  return compareIdentifiers(this.major, other.major) ||
	         compareIdentifiers(this.minor, other.minor) ||
	         compareIdentifiers(this.patch, other.patch)
	};

	SemVer.prototype.comparePre = function (other) {
	  if (!(other instanceof SemVer)) {
	    other = new SemVer(other, this.options);
	  }

	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length) {
	    return -1
	  } else if (!this.prerelease.length && other.prerelease.length) {
	    return 1
	  } else if (!this.prerelease.length && !other.prerelease.length) {
	    return 0
	  }

	  var i = 0;
	  do {
	    var a = this.prerelease[i];
	    var b = other.prerelease[i];
	    debug('prerelease compare', i, a, b);
	    if (a === undefined && b === undefined) {
	      return 0
	    } else if (b === undefined) {
	      return 1
	    } else if (a === undefined) {
	      return -1
	    } else if (a === b) {
	      continue
	    } else {
	      return compareIdentifiers(a, b)
	    }
	  } while (++i)
	};

	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function (release, identifier) {
	  switch (release) {
	    case 'premajor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor = 0;
	      this.major++;
	      this.inc('pre', identifier);
	      break
	    case 'preminor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor++;
	      this.inc('pre', identifier);
	      break
	    case 'prepatch':
	      // If this is already a prerelease, it will bump to the next version
	      // drop any prereleases that might already exist, since they are not
	      // relevant at this point.
	      this.prerelease.length = 0;
	      this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break
	    // If the input is a non-prerelease version, this acts the same as
	    // prepatch.
	    case 'prerelease':
	      if (this.prerelease.length === 0) {
	        this.inc('patch', identifier);
	      }
	      this.inc('pre', identifier);
	      break

	    case 'major':
	      // If this is a pre-major version, bump up to the same major version.
	      // Otherwise increment major.
	      // 1.0.0-5 bumps to 1.0.0
	      // 1.1.0 bumps to 2.0.0
	      if (this.minor !== 0 ||
	          this.patch !== 0 ||
	          this.prerelease.length === 0) {
	        this.major++;
	      }
	      this.minor = 0;
	      this.patch = 0;
	      this.prerelease = [];
	      break
	    case 'minor':
	      // If this is a pre-minor version, bump up to the same minor version.
	      // Otherwise increment minor.
	      // 1.2.0-5 bumps to 1.2.0
	      // 1.2.1 bumps to 1.3.0
	      if (this.patch !== 0 || this.prerelease.length === 0) {
	        this.minor++;
	      }
	      this.patch = 0;
	      this.prerelease = [];
	      break
	    case 'patch':
	      // If this is not a pre-release version, it will increment the patch.
	      // If it is a pre-release it will bump up to the same patch version.
	      // 1.2.0-5 patches to 1.2.0
	      // 1.2.0 patches to 1.2.1
	      if (this.prerelease.length === 0) {
	        this.patch++;
	      }
	      this.prerelease = [];
	      break
	    // This probably shouldn't be used publicly.
	    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
	    case 'pre':
	      if (this.prerelease.length === 0) {
	        this.prerelease = [0];
	      } else {
	        var i = this.prerelease.length;
	        while (--i >= 0) {
	          if (typeof this.prerelease[i] === 'number') {
	            this.prerelease[i]++;
	            i = -2;
	          }
	        }
	        if (i === -1) {
	          // didn't increment anything
	          this.prerelease.push(0);
	        }
	      }
	      if (identifier) {
	        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	        if (this.prerelease[0] === identifier) {
	          if (isNaN(this.prerelease[1])) {
	            this.prerelease = [identifier, 0];
	          }
	        } else {
	          this.prerelease = [identifier, 0];
	        }
	      }
	      break

	    default:
	      throw new Error('invalid increment argument: ' + release)
	  }
	  this.format();
	  this.raw = this.version;
	  return this
	};

	exports.inc = inc;
	function inc (version, release, loose, identifier) {
	  if (typeof (loose) === 'string') {
	    identifier = loose;
	    loose = undefined;
	  }

	  try {
	    return new SemVer(version, loose).inc(release, identifier).version
	  } catch (er) {
	    return null
	  }
	}

	exports.diff = diff;
	function diff (version1, version2) {
	  if (eq(version1, version2)) {
	    return null
	  } else {
	    var v1 = parse(version1);
	    var v2 = parse(version2);
	    var prefix = '';
	    if (v1.prerelease.length || v2.prerelease.length) {
	      prefix = 'pre';
	      var defaultResult = 'prerelease';
	    }
	    for (var key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return prefix + key
	        }
	      }
	    }
	    return defaultResult // may be undefined
	  }
	}

	exports.compareIdentifiers = compareIdentifiers;

	var numeric = /^[0-9]+$/;
	function compareIdentifiers (a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);

	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }

	  return a === b ? 0
	    : (anum && !bnum) ? -1
	    : (bnum && !anum) ? 1
	    : a < b ? -1
	    : 1
	}

	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers (a, b) {
	  return compareIdentifiers(b, a)
	}

	exports.major = major;
	function major (a, loose) {
	  return new SemVer(a, loose).major
	}

	exports.minor = minor;
	function minor (a, loose) {
	  return new SemVer(a, loose).minor
	}

	exports.patch = patch;
	function patch (a, loose) {
	  return new SemVer(a, loose).patch
	}

	exports.compare = compare;
	function compare (a, b, loose) {
	  return new SemVer(a, loose).compare(new SemVer(b, loose))
	}

	exports.compareLoose = compareLoose;
	function compareLoose (a, b) {
	  return compare(a, b, true)
	}

	exports.rcompare = rcompare;
	function rcompare (a, b, loose) {
	  return compare(b, a, loose)
	}

	exports.sort = sort;
	function sort (list, loose) {
	  return list.sort(function (a, b) {
	    return exports.compare(a, b, loose)
	  })
	}

	exports.rsort = rsort;
	function rsort (list, loose) {
	  return list.sort(function (a, b) {
	    return exports.rcompare(a, b, loose)
	  })
	}

	exports.gt = gt;
	function gt (a, b, loose) {
	  return compare(a, b, loose) > 0
	}

	exports.lt = lt;
	function lt (a, b, loose) {
	  return compare(a, b, loose) < 0
	}

	exports.eq = eq;
	function eq (a, b, loose) {
	  return compare(a, b, loose) === 0
	}

	exports.neq = neq;
	function neq (a, b, loose) {
	  return compare(a, b, loose) !== 0
	}

	exports.gte = gte;
	function gte (a, b, loose) {
	  return compare(a, b, loose) >= 0
	}

	exports.lte = lte;
	function lte (a, b, loose) {
	  return compare(a, b, loose) <= 0
	}

	exports.cmp = cmp;
	function cmp (a, op, b, loose) {
	  switch (op) {
	    case '===':
	      if (typeof a === 'object')
	        a = a.version;
	      if (typeof b === 'object')
	        b = b.version;
	      return a === b

	    case '!==':
	      if (typeof a === 'object')
	        a = a.version;
	      if (typeof b === 'object')
	        b = b.version;
	      return a !== b

	    case '':
	    case '=':
	    case '==':
	      return eq(a, b, loose)

	    case '!=':
	      return neq(a, b, loose)

	    case '>':
	      return gt(a, b, loose)

	    case '>=':
	      return gte(a, b, loose)

	    case '<':
	      return lt(a, b, loose)

	    case '<=':
	      return lte(a, b, loose)

	    default:
	      throw new TypeError('Invalid operator: ' + op)
	  }
	}

	exports.Comparator = Comparator;
	function Comparator (comp, options) {
	  if (!options || typeof options !== 'object') {
	    options = {
	      loose: !!options,
	      includePrerelease: false
	    };
	  }

	  if (comp instanceof Comparator) {
	    if (comp.loose === !!options.loose) {
	      return comp
	    } else {
	      comp = comp.value;
	    }
	  }

	  if (!(this instanceof Comparator)) {
	    return new Comparator(comp, options)
	  }

	  debug('comparator', comp, options);
	  this.options = options;
	  this.loose = !!options.loose;
	  this.parse(comp);

	  if (this.semver === ANY) {
	    this.value = '';
	  } else {
	    this.value = this.operator + this.semver.version;
	  }

	  debug('comp', this);
	}

	var ANY = {};
	Comparator.prototype.parse = function (comp) {
	  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);

	  if (!m) {
	    throw new TypeError('Invalid comparator: ' + comp)
	  }

	  this.operator = m[1];
	  if (this.operator === '=') {
	    this.operator = '';
	  }

	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2]) {
	    this.semver = ANY;
	  } else {
	    this.semver = new SemVer(m[2], this.options.loose);
	  }
	};

	Comparator.prototype.toString = function () {
	  return this.value
	};

	Comparator.prototype.test = function (version) {
	  debug('Comparator.test', version, this.options.loose);

	  if (this.semver === ANY) {
	    return true
	  }

	  if (typeof version === 'string') {
	    version = new SemVer(version, this.options);
	  }

	  return cmp(version, this.operator, this.semver, this.options)
	};

	Comparator.prototype.intersects = function (comp, options) {
	  if (!(comp instanceof Comparator)) {
	    throw new TypeError('a Comparator is required')
	  }

	  if (!options || typeof options !== 'object') {
	    options = {
	      loose: !!options,
	      includePrerelease: false
	    };
	  }

	  var rangeTmp;

	  if (this.operator === '') {
	    rangeTmp = new Range(comp.value, options);
	    return satisfies(this.value, rangeTmp, options)
	  } else if (comp.operator === '') {
	    rangeTmp = new Range(this.value, options);
	    return satisfies(comp.semver, rangeTmp, options)
	  }

	  var sameDirectionIncreasing =
	    (this.operator === '>=' || this.operator === '>') &&
	    (comp.operator === '>=' || comp.operator === '>');
	  var sameDirectionDecreasing =
	    (this.operator === '<=' || this.operator === '<') &&
	    (comp.operator === '<=' || comp.operator === '<');
	  var sameSemVer = this.semver.version === comp.semver.version;
	  var differentDirectionsInclusive =
	    (this.operator === '>=' || this.operator === '<=') &&
	    (comp.operator === '>=' || comp.operator === '<=');
	  var oppositeDirectionsLessThan =
	    cmp(this.semver, '<', comp.semver, options) &&
	    ((this.operator === '>=' || this.operator === '>') &&
	    (comp.operator === '<=' || comp.operator === '<'));
	  var oppositeDirectionsGreaterThan =
	    cmp(this.semver, '>', comp.semver, options) &&
	    ((this.operator === '<=' || this.operator === '<') &&
	    (comp.operator === '>=' || comp.operator === '>'));

	  return sameDirectionIncreasing || sameDirectionDecreasing ||
	    (sameSemVer && differentDirectionsInclusive) ||
	    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
	};

	exports.Range = Range;
	function Range (range, options) {
	  if (!options || typeof options !== 'object') {
	    options = {
	      loose: !!options,
	      includePrerelease: false
	    };
	  }

	  if (range instanceof Range) {
	    if (range.loose === !!options.loose &&
	        range.includePrerelease === !!options.includePrerelease) {
	      return range
	    } else {
	      return new Range(range.raw, options)
	    }
	  }

	  if (range instanceof Comparator) {
	    return new Range(range.value, options)
	  }

	  if (!(this instanceof Range)) {
	    return new Range(range, options)
	  }

	  this.options = options;
	  this.loose = !!options.loose;
	  this.includePrerelease = !!options.includePrerelease;

	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
	    return this.parseRange(range.trim())
	  }, this).filter(function (c) {
	    // throw out any that are not relevant for whatever reason
	    return c.length
	  });

	  if (!this.set.length) {
	    throw new TypeError('Invalid SemVer Range: ' + range)
	  }

	  this.format();
	}

	Range.prototype.format = function () {
	  this.range = this.set.map(function (comps) {
	    return comps.join(' ').trim()
	  }).join('||').trim();
	  return this.range
	};

	Range.prototype.toString = function () {
	  return this.range
	};

	Range.prototype.parseRange = function (range) {
	  var loose = this.options.loose;
	  range = range.trim();
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);

	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);

	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);

	  // normalize spaces
	  range = range.split(/\s+/).join(' ');

	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.

	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function (comp) {
	    return parseComparator(comp, this.options)
	  }, this).join(' ').split(/\s+/);
	  if (this.options.loose) {
	    // in loose mode, throw out any that are not valid comparators
	    set = set.filter(function (comp) {
	      return !!comp.match(compRe)
	    });
	  }
	  set = set.map(function (comp) {
	    return new Comparator(comp, this.options)
	  }, this);

	  return set
	};

	Range.prototype.intersects = function (range, options) {
	  if (!(range instanceof Range)) {
	    throw new TypeError('a Range is required')
	  }

	  return this.set.some(function (thisComparators) {
	    return thisComparators.every(function (thisComparator) {
	      return range.set.some(function (rangeComparators) {
	        return rangeComparators.every(function (rangeComparator) {
	          return thisComparator.intersects(rangeComparator, options)
	        })
	      })
	    })
	  })
	};

	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators (range, options) {
	  return new Range(range, options).set.map(function (comp) {
	    return comp.map(function (c) {
	      return c.value
	    }).join(' ').trim().split(' ')
	  })
	}

	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator (comp, options) {
	  debug('comp', comp, options);
	  comp = replaceCarets(comp, options);
	  debug('caret', comp);
	  comp = replaceTildes(comp, options);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, options);
	  debug('xrange', comp);
	  comp = replaceStars(comp, options);
	  debug('stars', comp);
	  return comp
	}

	function isX (id) {
	  return !id || id.toLowerCase() === 'x' || id === '*'
	}

	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes (comp, options) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceTilde(comp, options)
	  }).join(' ')
	}

	function replaceTilde (comp, options) {
	  var r = options.loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('tilde', comp, _, M, m, p, pr);
	    var ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (isX(p)) {
	      // ~1.2 == >=1.2.0 <1.3.0
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    } else if (pr) {
	      debug('replaceTilde pr', pr);
	      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
	            ' <' + M + '.' + (+m + 1) + '.0';
	    } else {
	      // ~1.2.3 == >=1.2.3 <1.3.0
	      ret = '>=' + M + '.' + m + '.' + p +
	            ' <' + M + '.' + (+m + 1) + '.0';
	    }

	    debug('tilde return', ret);
	    return ret
	  })
	}

	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets (comp, options) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceCaret(comp, options)
	  }).join(' ')
	}

	function replaceCaret (comp, options) {
	  debug('caret', comp, options);
	  var r = options.loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('caret', comp, _, M, m, p, pr);
	    var ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (isX(p)) {
	      if (M === '0') {
	        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	      } else {
	        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
	      }
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (M === '0') {
	        if (m === '0') {
	          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
	                ' <' + M + '.' + m + '.' + (+p + 1);
	        } else {
	          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
	                ' <' + M + '.' + (+m + 1) + '.0';
	        }
	      } else {
	        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
	              ' <' + (+M + 1) + '.0.0';
	      }
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') {
	          ret = '>=' + M + '.' + m + '.' + p +
	                ' <' + M + '.' + m + '.' + (+p + 1);
	        } else {
	          ret = '>=' + M + '.' + m + '.' + p +
	                ' <' + M + '.' + (+m + 1) + '.0';
	        }
	      } else {
	        ret = '>=' + M + '.' + m + '.' + p +
	              ' <' + (+M + 1) + '.0.0';
	      }
	    }

	    debug('caret return', ret);
	    return ret
	  })
	}

	function replaceXRanges (comp, options) {
	  debug('replaceXRanges', comp, options);
	  return comp.split(/\s+/).map(function (comp) {
	    return replaceXRange(comp, options)
	  }).join(' ')
	}

	function replaceXRange (comp, options) {
	  comp = comp.trim();
	  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    var xM = isX(M);
	    var xm = xM || isX(m);
	    var xp = xm || isX(p);
	    var anyX = xp;

	    if (gtlt === '=' && anyX) {
	      gtlt = '';
	    }

	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // we know patch is an x, because we have any x at all.
	      // replace X with 0
	      if (xm) {
	        m = 0;
	      }
	      p = 0;

	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        // >1.2.3 => >= 1.2.4
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) {
	          M = +M + 1;
	        } else {
	          m = +m + 1;
	        }
	      }

	      ret = gtlt + M + '.' + m + '.' + p;
	    } else if (xm) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (xp) {
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    }

	    debug('xRange return', ret);

	    return ret
	  })
	}

	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars (comp, options) {
	  debug('replaceStars', comp, options);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '')
	}

	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace ($0,
	  from, fM, fm, fp, fpr, fb,
	  to, tM, tm, tp, tpr, tb) {
	  if (isX(fM)) {
	    from = '';
	  } else if (isX(fm)) {
	    from = '>=' + fM + '.0.0';
	  } else if (isX(fp)) {
	    from = '>=' + fM + '.' + fm + '.0';
	  } else {
	    from = '>=' + from;
	  }

	  if (isX(tM)) {
	    to = '';
	  } else if (isX(tm)) {
	    to = '<' + (+tM + 1) + '.0.0';
	  } else if (isX(tp)) {
	    to = '<' + tM + '.' + (+tm + 1) + '.0';
	  } else if (tpr) {
	    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
	  } else {
	    to = '<=' + to;
	  }

	  return (from + ' ' + to).trim()
	}

	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function (version) {
	  if (!version) {
	    return false
	  }

	  if (typeof version === 'string') {
	    version = new SemVer(version, this.options);
	  }

	  for (var i = 0; i < this.set.length; i++) {
	    if (testSet(this.set[i], version, this.options)) {
	      return true
	    }
	  }
	  return false
	};

	function testSet (set, version, options) {
	  for (var i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) {
	      return false
	    }
	  }

	  if (version.prerelease.length && !options.includePrerelease) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === ANY) {
	        continue
	      }

	      if (set[i].semver.prerelease.length > 0) {
	        var allowed = set[i].semver;
	        if (allowed.major === version.major &&
	            allowed.minor === version.minor &&
	            allowed.patch === version.patch) {
	          return true
	        }
	      }
	    }

	    // Version has a -pre, but it's not one of the ones we like.
	    return false
	  }

	  return true
	}

	exports.satisfies = satisfies;
	function satisfies (version, range, options) {
	  try {
	    range = new Range(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	}

	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying (versions, range, options) {
	  var max = null;
	  var maxSV = null;
	  try {
	    var rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach(function (v) {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!max || maxSV.compare(v) === -1) {
	        // compare(max, v, true)
	        max = v;
	        maxSV = new SemVer(max, options);
	      }
	    }
	  });
	  return max
	}

	exports.minSatisfying = minSatisfying;
	function minSatisfying (versions, range, options) {
	  var min = null;
	  var minSV = null;
	  try {
	    var rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach(function (v) {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!min || minSV.compare(v) === 1) {
	        // compare(min, v, true)
	        min = v;
	        minSV = new SemVer(min, options);
	      }
	    }
	  });
	  return min
	}

	exports.minVersion = minVersion;
	function minVersion (range, loose) {
	  range = new Range(range, loose);

	  var minver = new SemVer('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = new SemVer('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = null;
	  for (var i = 0; i < range.set.length; ++i) {
	    var comparators = range.set[i];

	    comparators.forEach(function (comparator) {
	      // Clone to avoid manipulating the comparator's semver object.
	      var compver = new SemVer(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	          /* fallthrough */
	        case '':
	        case '>=':
	          if (!minver || gt(minver, compver)) {
	            minver = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          /* Ignore maximum versions */
	          break
	        /* istanbul ignore next */
	        default:
	          throw new Error('Unexpected operation: ' + comparator.operator)
	      }
	    });
	  }

	  if (minver && range.test(minver)) {
	    return minver
	  }

	  return null
	}

	exports.validRange = validRange;
	function validRange (range, options) {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	}

	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr (version, range, options) {
	  return outside(version, range, '<', options)
	}

	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr (version, range, options) {
	  return outside(version, range, '>', options)
	}

	exports.outside = outside;
	function outside (version, range, hilo, options) {
	  version = new SemVer(version, options);
	  range = new Range(range, options);

	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }

	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, options)) {
	    return false
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (var i = 0; i < range.set.length; ++i) {
	    var comparators = range.set[i];

	    var high = null;
	    var low = null;

	    comparators.forEach(function (comparator) {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });

	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }

	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	}

	exports.prerelease = prerelease;
	function prerelease (version, options) {
	  var parsed = parse(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	}

	exports.intersects = intersects;
	function intersects (r1, r2, options) {
	  r1 = new Range(r1, options);
	  r2 = new Range(r2, options);
	  return r1.intersects(r2)
	}

	exports.coerce = coerce;
	function coerce (version) {
	  if (version instanceof SemVer) {
	    return version
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  var match = version.match(re[COERCE]);

	  if (match == null) {
	    return null
	  }

	  return parse(match[1] +
	    '.' + (match[2] || '0') +
	    '.' + (match[3] || '0'))
	}
	});
	var semver_1 = semver.SEMVER_SPEC_VERSION;
	var semver_2 = semver.re;
	var semver_3 = semver.src;
	var semver_4 = semver.parse;
	var semver_5 = semver.valid;
	var semver_6 = semver.clean;
	var semver_7 = semver.SemVer;
	var semver_8 = semver.inc;
	var semver_9 = semver.diff;
	var semver_10 = semver.compareIdentifiers;
	var semver_11 = semver.rcompareIdentifiers;
	var semver_12 = semver.major;
	var semver_13 = semver.minor;
	var semver_14 = semver.patch;
	var semver_15 = semver.compare;
	var semver_16 = semver.compareLoose;
	var semver_17 = semver.rcompare;
	var semver_18 = semver.sort;
	var semver_19 = semver.rsort;
	var semver_20 = semver.gt;
	var semver_21 = semver.lt;
	var semver_22 = semver.eq;
	var semver_23 = semver.neq;
	var semver_24 = semver.gte;
	var semver_25 = semver.lte;
	var semver_26 = semver.cmp;
	var semver_27 = semver.Comparator;
	var semver_28 = semver.Range;
	var semver_29 = semver.toComparators;
	var semver_30 = semver.satisfies;
	var semver_31 = semver.maxSatisfying;
	var semver_32 = semver.minSatisfying;
	var semver_33 = semver.minVersion;
	var semver_34 = semver.validRange;
	var semver_35 = semver.ltr;
	var semver_36 = semver.gtr;
	var semver_37 = semver.outside;
	var semver_38 = semver.prerelease;
	var semver_39 = semver.intersects;
	var semver_40 = semver.coerce;

	var MODULE_NAME = 'Ad Utilities';
	var MODULE_VERSION = 'v4.0.0';
	var objectProto = Object.prototype;
	var toString$2 = objectProto.toString;

	var noop = function noop() {};

	var cdnRoot = function cdnRoot() {
	  return typeof document !== 'undefined' && document.location !== 'undefined' && document.location.hostname !== 'undefined' && document.location.hostname !== '' ? document.location.hostname.indexOf('cnn.com') >= 0 ? 'cdn.cnn.com' : 'i.cdn.turner.com' : 'i.cdn.turner.com';
	};

	var isFunction = function isFunction(object) {
	  return toString$2.call(object) === '[object Function]';
	};

	var IsMobile = isMobile;

	var getUMTOCookies = function getUMTOCookies() {
	  var FreewheelNetwork = document.location.pathname.indexOf('/dev/') > 0 || document.location.pathname.indexOf('/qa/') > 0 ? '42448' : '48804';
	  logger.log('getting UMTO cookies');
	  return (readCookie('bea4') ? '_fw_vcid2=' + FreewheelNetwork + ':' + readCookie('bea4') : readCookie('bea4r') ? '_fw_vcid2=' + FreewheelNetwork + ':' + readCookie('bea4r') : '') + (readCookie('kxuser') ? '&krux_user=' + readCookie('kxuser') : '') + (readCookie('zwmc') ? '&zwmc=' + readCookie('zwmc') : '') + (readCookie('ifyr') ? '&ifyr=' + readCookie('ifyr') : '') + (readCookie('hkgc') ? '&hkgc=' + readCookie('hkgc') : '') + (readCookie('goiz') ? '&goiz=' + readCookie('goiz') : '');
	};

	var isObject = function isObject(object) {
	  var type = _typeof_1(object);

	  return (type === 'function' || type === 'object') && !!object;
	};

	var getURLParam = function getURLParam(name) {
	  if (typeof document === 'undefined') {
	    return '';
	  }

	  var nameParam = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	  var regexS = '[\\?&]' + nameParam + '=([^&#]*)';
	  var regex = new RegExp(regexS);

	  if (document && document.location && document.location.search) {
	    var results = regex.exec(document.location.search);

	    if (results) {
	      return results[1];
	    }

	    return '';
	  }

	  return '';
	};
	var hasCookie = function hasCookie(name) {
	  if (typeof window === 'undefined') return false;

	  if (document && document.cookie) {
	    logger.log('found?', document.cookie.indexOf('; ' + name + '=') >= 0 || document.cookie.indexOf(name + '=') === 0);
	    return document.cookie.indexOf('; ' + name + '=') >= 0 || document.cookie.indexOf(name + '=') === 0;
	  }

	  return false;
	};
	var getViewport = function getViewport() {
	  var viewportWidth;
	  var viewportHeight;

	  if (typeof window !== 'undefined' && window && typeof window.innerWidth !== 'undefined') {
	    viewportWidth = window.innerWidth;
	    viewportHeight = window.innerHeight;
	  } else if (typeof document !== 'undefined' && document && typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
	    viewportWidth = document.documentElement.clientWidth;
	    viewportHeight = document.documentElement.clientHeight;
	  } else {
	    viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
	    viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
	  }

	  return [viewportWidth, viewportHeight];
	};
	var getBrowser = function getBrowser() {
	  logger.time('Getting Browser Information');
	  var ua = navigator.userAgent;
	  var tem;
	  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

	  if (/trident/i.test(M[1])) {
	    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	    return 'IE ' + (tem[1] || '');
	  }

	  if (M[1] === 'Chrome') {
	    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

	    if (tem !== null) {
	      return tem.slice(1).join(' ').replace('OPR', 'Opera');
	    }
	  }

	  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']; // eslint-disable-next-line

	  if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
	  logger.timeEnd('Getting Browser Information');
	  return M.join(' ');
	};
	var readCookie = function readCookie(name) {
	  var readTheCookie = function readTheCookie(key) {
	    if (typeof document === 'undefined' || !document.cookie) {
	      // there is no cookie, so go no further
	      return null;
	    } // there is a cookie


	    return document.cookie.match(RegExp(key + '=.*?;')) ? document.cookie.match(RegExp(key + '=.*?;'))[0].replace(RegExp(key + '=|;', 'g'), '') : null;
	  };

	  var lsSupport = false;
	  var data = null; // Check for native support

	  if (typeof localStorage !== 'undefined') {
	    lsSupport = true;
	  } // No value supplied, return value


	  if (typeof value === 'undefined') {
	    // Get value
	    if (lsSupport) {
	      // Native support
	      data = localStorage.getItem(name);
	    }

	    if (!lsSupport || data === null) {
	      // Use cookie
	      data = readTheCookie(name);
	    }
	  }

	  return data;
	};

	var emptyTarget = function emptyTarget(value) {
	  return isArray$1(value) ? [] : {};
	};

	var deepmerge = function deepmerge(target, source, optionsArgument) {
	  var array = isArray$1(source);

	  var options = optionsArgument || {
	    arrayMerge: combineMerge
	  };
	  var arrayMerge = options.arrayMerge || combineMerge;

	  if (array) {
	    return isArray$1(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument);
	  } else {
	    return mergeObject(target, source, optionsArgument);
	  }
	};

	var combineMerge = function combineMerge(target, source, options) {
	  var destination = target.slice();
	  source.forEach(function (e, i) {
	    if (typeof destination[i] === 'undefined') {
	      var cloneRequested = clone !== false;
	      var shouldClone = cloneRequested && isMergeableObject(e);
	      destination[i] = shouldClone ? deepmerge(emptyTarget(e), e, options) : e;
	    } else if (isMergeableObject(e)) {
	      destination[i] = merge(target[i], e);
	    } else if (target.indexOf(e) === -1) {
	      destination.push(e);
	    }
	  });
	  return destination;
	};

	var isMergeableObject = function isMergeableObject(val) {
	  var nonNullObject = val && _typeof_1(val) === 'object';
	  return nonNullObject && Object.prototype.toString.call(val) !== '[object RegExp]' && Object.prototype.toString.call(val) !== '[object Date]';
	};

	var cloneIfNecessary = function cloneIfNecessary(value, optionsArgument) {
	  var clone = optionsArgument && optionsArgument.clone === true;
	  return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
	};

	var mergeObject = function mergeObject(target, source, optionsArgument) {
	  var destination = {};

	  if (isMergeableObject(target)) {
	    keys$1(target).forEach(function (key) {
	      destination[key] = cloneIfNecessary(target[key], optionsArgument);
	    });
	  }

	  keys$1(source).forEach(function (key) {
	    if (!isMergeableObject(source[key]) || !target[key]) {
	      destination[key] = cloneIfNecessary(source[key], optionsArgument);
	    } else {
	      destination[key] = deepmerge(target[key], source[key], optionsArgument);
	    }
	  });

	  return destination;
	};

	deepmerge.all = function (array, optionsArgument) {
	  if (!isArray$1(array) || array.length < 2) {
	    throw new Error('first argument should be an array with at least two elements');
	  } // we are sure there are at least 2 values, so it is safe to have no initial value


	  return array.reduce(function (prev, next) {
	    return deepmerge(prev, next, optionsArgument);
	  });
	};

	var mergeDeep = function mergeDeep(target, source) {
	  return deepmerge(target, source);
	};
	var countryCode = readCookie('countryCode') || (readCookie('CG') ? readCookie('CG').substr(0, 2) : '');
	var appId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6IndlYiIsInByb2R1Y3QiOiJhZGZ1ZWwiLCJuZXR3b3JrIjoiY25uIiwiYXBwSWQiOiJjbm4tYWRmdWVsLXdlYi14bWQ2dTkifQ.N-lYZh_mvCV2gChDusNhd85B2BD7AiCIcNY2Gr5Rc6c';
	var locationServiceURL = 'https://geo.ngtv.io/locate?appId=' + appId;

	var getLocation = function getLocation() {
	  return new promise$1(function (resolve, reject) {
	    fetch(locationServiceURL).then(function (resp) {
	      resolve(resp.json());
	    })["catch"](function (err) {
	      reject(new Error("Could not get user location: ".concat(err)));
	    });
	  });
	};

	var selectedEdition = readCookie('SelectedEdition') ? readCookie('SelectedEdition') : 'www';
	var monetizedSizes = ['160x600', '300x250', '300x600', '320x50', '728x90', '970x90', '970x250'];
	var invalidMappings = ['_ns_', '_nfs_'];
	var invalidAdUnitSegments = [];
	var invalidAdUnits = ['CNN/health', 'CNN/health/healthgrades', 'CNN/health/leaf', 'CNN/health/list', 'CNN/health/photos', 'CNN/health/specials', 'CNN/health/video', 'CNN/student-news'];
	var getLogger = function getLogger(moduleName, moduleVersion, logKey, style, override) {
	  var log = noop;
	  var info = noop;
	  var warn = noop;
	  var time = noop;
	  var timeEnd = noop;
	  var group = noop;
	  var groupEnd = noop;
	  var error = noop;
	  var inGroup = false;
	  var tag;
	  var styleFinal = style || '';
	  var logKeyFinal = logKey || moduleName.toLowerCase();
	  var debug = getURLParam('debug').split(',');
	  var debugTest = isObject(console) && isFunction(console.log) && (debug[0] === 'true' || debug.indexOf(logKeyFinal.toLowerCase()) >= 0);
	  if (override) debugTest = true;

	  if (debugTest) {
	    log = function log() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (!inGroup) {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.log.apply(console, tag);
	      } else {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.log.apply(console, tag);
	      }
	    };

	    info = function info() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      if (!inGroup) {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.info.apply(console, tag);
	      } else {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.info.apply(console, tag);
	      }
	    };

	    warn = function warn() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      if (!inGroup) {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.warn.apply(console, tag);
	      } else {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.warn.apply(console, tag);
	      }
	    };

	    error = function error() {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      if (!inGroup) {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.error.apply(console, tag);
	      } else {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] ', styleFinal];
	        tag.push.apply(tag, args);
	        console.error.apply(console, tag);
	      }
	    };

	    group = function group(groupName) {
	      if (!inGroup) {
	        tag = ['%c[' + moduleName + ' ' + moduleVersion + '] - START', styleFinal, groupName];
	        inGroup = true;
	        console.log.apply(console, tag);
	      }
	    };

	    groupEnd = function groupEnd(groupName) {
	      tag = ['%c[' + moduleName + ' ' + moduleVersion + '] - END', styleFinal, groupName];
	      inGroup = false;

	      try {
	        console.log.apply(console, tag);
	      } catch (err) {// Do Nothing
	      }
	    };

	    time = function time(timeTag) {
	      var timeKey = '[' + moduleName + ' ' + moduleVersion + '] - ' + timeTag;
	      group(timeTag);
	      addMark(timeKey + '-Start');
	      console.time(timeKey);
	    };

	    timeEnd = function timeEnd(timeTag) {
	      var timeKey = '[' + moduleName + ' ' + moduleVersion + '] - ' + timeTag;
	      addMark(timeKey + '-End');
	      addMeasure(timeKey, timeKey + '-Start', timeKey + '-End');
	      groupEnd(timeTag);
	      console.timeEnd(timeKey);
	    };
	  }

	  var logger = {
	    log: log,
	    info: info,
	    warn: warn,
	    error: error,
	    time: time,
	    timeEnd: timeEnd,
	    group: group,
	    groupEnd: groupEnd
	  };
	  return logger;
	};
	var hostname = '';
	var setHostAndPathNames = function setHostAndPathNames() {
	  var parser = typeof document !== 'undefined' ? document.createElement('a') : {
	    href: '',
	    hostname: '',
	    pathname: ''
	  };
	  parser.href = typeof document !== 'undefined' ? document.location.href : '';
	  hostname = parser.hostname;
	};
	var logger = getLogger(MODULE_NAME, MODULE_VERSION, 'utils', 'color: coral; padding: 2px');
	var addEvent = function addEvent(element, event, fn) {
	  if (element.addEventListener) {
	    element.addEventListener(event, fn, true);
	  } else if (element.attachEvent) {
	    element.attachEvent('on' + event, fn);
	  }
	};

	var bind = function bind(fn, context) {
	  for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
	    args[_key5 - 2] = arguments[_key5];
	  }

	  if (!isFunction(fn)) {
	    throw new TypeError('Bind must be called on a function');
	  }

	  return function bound() {
	    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
	  };
	};
	/* eslint-disable-next-line */


	var re = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\[\]\.,;:\s@\"]+\.)+[^<>()\[\]\.,;:\s@\"]{2,})/i;

	var piiIsPresentInQueryString = function piiIsPresentInQueryString() {
	  if (document.location.search) {
	    var dirtyResults = document.location.search.search(re) + 1;
	    var cleanResults;

	    try {
	      cleanResults = decodeURIComponent(document.location.search).search(re) + 1;
	    } catch (err) {
	      cleanResults = dirtyResults;
	    }

	    return dirtyResults === 1 || cleanResults === 1;
	  }

	  return false;
	};

	var piiIsPresentInHash = function piiIsPresentInHash() {
	  if (document.location.hash) {
	    var dirtyResults = document.location.hash.search(re) + 1;
	    var cleanResults;

	    try {
	      cleanResults = decodeURIComponent(document.location.hash).search(re) + 1;
	    } catch (err) {
	      cleanResults = dirtyResults;
	    }

	    return dirtyResults || cleanResults;
	  }

	  return false;
	};

	var piiIsPresentInReferrer = function piiIsPresentInReferrer() {
	  if (document.referrer) {
	    var dirtyResults = document.referrer.search(re) + 1;
	    var cleanResults;

	    try {
	      cleanResults = decodeURIComponent(document.location.referrer).search(re) + 1;
	    } catch (err) {
	      cleanResults = dirtyResults;
	    }

	    return dirtyResults || cleanResults;
	  }

	  return false;
	};

	var piiIsPresent = function piiIsPresent() {
	  return piiIsPresentInQueryString() || piiIsPresentInHash() || piiIsPresentInReferrer();
	};

	var filterDFPRequest = function filterDFPRequest() {
	  if (piiIsPresentInQueryString() || piiIsPresentInHash() || piiIsPresentInReferrer()) {
	    if (typeof window !== 'undefined' && window.AdFuel) {
	      logger.log('Filtering DFP Request due to PII in query string.');

	      var AdFuelMethods = getOwnPropertyNames$1(window.AdFuel);

	      for (var x = 0; x < AdFuelMethods.length; x++) {
	        window.AdFuel[AdFuelMethods[x]] = function filteredAdFuelMethod() {};
	      }

	      window.googletag = null;
	    }

	    return true;
	  }

	  return false;
	};

	var piiFilter = {
	  qs: piiIsPresentInQueryString,
	  hash: piiIsPresentInHash,
	  ref: piiIsPresentInReferrer,
	  isPIIPresent: piiIsPresent,
	  filter: filterDFPRequest
	};
	var consentStatus = false;
	var consentChecked = false;
	var gdprApplies = false;

	var getFullConsentState = function getFullConsentState() {
	  return window.WM.UserConsent.getConsentState();
	};

	var getConsentVersion = function getConsentVersion() {
	  return window.WM.UserConsent.getConsentVersion();
	};

	var getConsentString = function getConsentString() {
	  if (hasCookie('eupubconsent')) {
	    logger.log('Getting Consent Object...');
	    return readCookie('eupubconsent');
	  } else {
	    var consentString = '';

	    if (typeof window !== 'undefined' && window.__cmp && typeof window.__cmp === 'function') {
	      window.__cmp('getVendorConsents', null, function (result) {
	        consentString = result.metadata;
	      });
	    } else if (typeof window !== 'undefined' && window.__tcfapi && typeof window._tcfapi === 'function') {
	      window.__tcfapi('getTCData', 2, function (tcData, success) {
	        if (success) {
	          consentString = tcData.tcString;
	        }
	      });
	    }

	    return consentString;
	  }
	};
	var getConsent = function getConsent() {
	  var consentStates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['data-store', 'ads-contextual', 'ads-person-prof', 'ads-person', 'vendor'];
	  if (consentChecked) return consentStatus;
	  var consentVersion = '1.3.6';

	  try {
	    consentVersion = window.WM.UserConsent.getVersion();
	  } catch (err) {
	    logger.warn('Running Older UserConsent - Please Update!');
	  }

	  logger.log('UserConsent Version: ', consentVersion);
	  consentStatus = window.WM ? window.WM.UserConsent.isReady() ? semver.satisfies(consentVersion, '>=2.0.0') ? window.WM.UserConsent.inUserConsentState(consentStates) : window.WM.UserConsent.inUserConsentState(['ads-general', 'ads-vendor']) : true : true;
	  logger.log('Consent Granted: ', consentStatus);
	  var region = getUserConsentRegion();

	  if (region === 'ccpa' && getURLParam('renderStatic') !== '') {
	    logger.log('Render Static: ', getURLParam('renderStatic'));
	    logger.log('Using override for Static Ad Rendering...');
	    consentStatus = false;
	  } else {
	    logger.log('Not overriding for static rendering...');
	  }

	  consentChecked = true;
	  return consentStatus;
	};

	var getGDPRApplies = function getGDPRApplies() {
	  return window.WM.UserConsent.isInGdprRegion();
	};

	var getCCPAApplies = function getCCPAApplies() {
	  return window.WM.UserConsent.isInCcpaRegion();
	};

	var getUserConsentRegion = function getUserConsentRegion() {
	  return window.WM ? window.WM.UserConsent.getRegion() : '';
	};
	var monetizedSlots = {};
	var isMonetized = function isMonetized(slot) {
	  var rktrSlotId = slot.rktr_slot_id;
	  logger.group('Checking Monetization for: ' + rktrSlotId);
	  var rktrAdId = slot.rktr_ad_id;
	  var responsive = slot.responsive;
	  var sizes = slot.sizes;

	  if (typeof monetizedSlots[rktrSlotId] !== 'undefined') {
	    logger.log('Slot already monetized.', monetizedSlots[rktrSlotId]);
	    logger.groupEnd('Checking Monetization for: ' + rktrSlotId);
	    return monetizedSlots[rktrSlotId];
	  }

	  var slotId = rktrSlotId;

	  if (slotId === 'page') {
	    logger.log('Skipping Page-Level Object.');
	    logger.groupEnd('Checking Monetization for: ' + rktrSlotId);
	    monetizedSlots[slotId] = {
	      isMonetized: false,
	      filteredSizes: []
	    };
	    return {
	      isMonetized: false,
	      filteredSizes: []
	    };
	  }

	  var monetized = true;
	  var viewportChecked = false;
	  var browser = getViewport();
	  var responsiveSizes = [];
	  var filteredSizes = [];
	  invalidMappings.forEach(function forEachMap(invalidMapping) {
	    if (slotId.indexOf(invalidMapping) > 0) {
	      logger.log('Slot includes invalid mapping: ', invalidMapping);
	      monetizedSlots[slotId] = false;
	      monetized = false;
	    }
	  });
	  invalidAdUnitSegments.forEach(function forEachSegment(invalidAdUnitSegment) {
	    if (rktrAdId && rktrAdId.indexOf(invalidAdUnitSegment) >= 0) {
	      logger.log('Slot contains an invalid Ad Unit segment: ', invalidAdUnitSegment);
	      monetized = false;
	    }
	  });
	  invalidAdUnits.forEach(function forEachAdUnit(invalidAdUnit) {
	    if (rktrAdId === invalidAdUnit) {
	      logger.log('Slot uses an invalid Ad Unit: ', invalidAdUnit);
	      monetized = false;
	    }
	  });

	  if (responsive && responsive.length > 0) {
	    responsive.map(function (viewport) {
	      if (!viewportChecked && _parseInt$2(viewport[0][0], 10) < browser[0] && _parseInt$2(viewport[0][1], 10) < browser[1]) {
	        viewportChecked = true;
	        logger.log('Checking Responsive Sizes: ', viewport, browser);
	        responsiveSizes = viewport[1];

	        if (viewport[1][0] === 'suppress' || responsiveSizes === 'suppress') {
	          logger.log('Slot is suppressed: ', viewport[1][0], responsiveSizes);
	          monetized = false;
	        }
	      }

	      return viewport;
	    });
	  }

	  filteredSizes = monetized && responsiveSizes.length > 0 ? responsiveSizes : sizes;

	  if (monetized) {
	    filteredSizes = filteredSizes.filter(function sizeFilter(size) {
	      var retSize = size;

	      if (retSize !== 'suppress') {
	        retSize = retSize.join('x');
	      }

	      return monetizedSizes.indexOf(retSize) !== -1;
	    });
	  }

	  if (filteredSizes.length === 0) {
	    logger.log('Slot contains no monetized sizes.', filteredSizes);
	    monetizedSlots[slotId] = false;
	    monetized = false;
	  }

	  logger.log('Slot is Monetized: ', monetized);
	  logger.groupEnd('Checking Monetization for: ' + rktrSlotId);
	  monetizedSlots[slotId] = {
	    isMonetized: monetized,
	    filteredSizes: filteredSizes
	  };
	  return {
	    isMonetized: monetized,
	    filteredSizes: filteredSizes
	  };
	};

	var hasOwn = function hasOwn(object, key) {
	  return object !== null && Object.prototype.hasOwnProperty.call(object, key);
	};

	var once = function once(fn) {
	  return function () {
	    if (fn) {
	      fn.apply(this, arguments); // eslint-disable-next-line

	      fn = null;
	    }
	  };
	};

	var keyMap = function () {
	  var map = {};

	  var has = function has(id) {
	    return id in map;
	  };

	  var addKey = function addKey(id, key) {
	    if (!has(id)) {
	      map[id] = [];
	    }

	    map[id].push(key);
	  };

	  var getKeys = function getKeys(id) {
	    return has(id) ? Array.prototype.slice.call(map[id]) : [];
	  };

	  var clearKeys = function clearKeys(id) {
	    if (has(id)) {
	      map[id].length = 0;
	      return true;
	    }

	    return false;
	  };

	  return {
	    has: has,
	    clearKeys: clearKeys,
	    getKeys: getKeys,
	    addKey: addKey
	  };
	}();

	var roundFloat = function roundFloat(value, toNearest, fixed) {
	  return (Math.ceil(value / toNearest) * toNearest).toFixed(fixed);
	};

	var generateCacheBuster = function generateCacheBuster() {
	  // return_<9-digit-random-hex>
	  var cb = '';

	  for (var i = 0; i < 10; i++) {
	    cb += Math.floor(Math.random() * 9).toString();
	  }

	  return cb;
	};

	var debounce = function debounce(func, wait, immediate) {
	  var timeout;
	  return function () {
	    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }

	    var context = this;

	    var later = function later() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };

	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
	};

	var clone = function clone(obj) {
	  // Handle the 3 simple types, and null or undefined
	  if (obj === null || _typeof_1(obj) !== 'object') return obj; // Handle Date

	  if (obj instanceof Date) {
	    var copyDate = new Date();
	    copyDate.setTime(obj.getTime());
	    return copyDate;
	  } // Handle Array


	  if (obj instanceof Array) {
	    var copyArray = [];

	    for (var i = 0, len = obj.length; i < len; i++) {
	      copyArray[i] = clone(obj[i]);
	    }

	    return copyArray;
	  } // Handle Object


	  if (obj instanceof Object) {
	    var copyObject = {};

	    keys$1(obj).forEach(function (attr) {
	      copyObject[attr] = clone(obj[attr]);
	    });

	    return copyObject;
	  }

	  throw new Error("Unable to copy obj! Its type isn't supported.");
	};

	var logsSent = false;
	var isIntl = function isIntl() {
	  var isIntl = false;
	  setHostAndPathNames();

	  if (getURLParam('isIntl') === 'true') {
	    if (!logsSent) {
	      logsSent = true;
	      logger.log('Faking international site. Using International PubIds.');
	    }

	    isIntl = true;
	  } else if (hostname.search(/^.*(edition|edition-m|arabic)\./) >= 0) {
	    if (!logsSent) {
	      logsSent = true;
	      logger.log('Full international site. Using International PubIds.');
	    }

	    isIntl = true;
	  } else if (countryCode === '' || countryCode === null) {
	    if (hostname.search(/^.*(cnnespanol|cnne-test)\./) >= 0) {
	      if (!logsSent) {
	        logsSent = true;
	        logger.log('No country code. Using International PubIds.');
	      }

	      isIntl = true;
	    } else {
	      var locationMeta = document && document.querySelectorAll('meta#geo-location-data');

	      if (locationMeta && locationMeta.length > 0) {
	        if (['US', 'CA'].indexOf(locationMeta[0].dataset.geoCountryCode) >= 0) {
	          isIntl = false;
	        } else {
	          isIntl = true;
	        }
	      } else {
	        if (!logsSent) {
	          logsSent = true;
	          logger.log('No country code. Domestic Site.');
	        }
	      }
	    }
	  } else if (countryCode !== 'US' && countryCode !== 'CA') {
	    if (hostname.search(/^.*(money|cnnespanol|cnne-test|\.cnn)\./) >= 0) {
	      if (!logsSent) {
	        logsSent = true;
	        logger.log('International country code. Using International PubIds.');
	      }

	      isIntl = true;
	    } else {
	      if (!logsSent) {
	        logsSent = true;
	        logger.log('International country code but domestic site.');
	      }
	    }
	  } else {
	    if (hostname.search(/^.*(cnnespanol|cnne-test)\./) >= 0) {
	      if (!logsSent) {
	        logger.log('On CNN Espanol... looking for geo-location-data meta tag...');
	      }

	      locationMeta = document && document.querySelectorAll('meta#geo-location-data');

	      if (locationMeta && locationMeta.length > 0) {
	        countryCode = locationMeta[0].dataset.geoCountryCode.toUpperCase();

	        if (!logsSent) {
	          logger.log('Found geo-location-data meta tag with countryCode: ', countryCode);
	        }

	        if (['US', 'CA'].indexOf(countryCode) >= 0) {
	          if (!logsSent) {
	            logger.log('Domestic country code. Using Domestic PubIds.');
	            logsSent = true;
	          }

	          isIntl = false;
	        } else {
	          if (!logsSent) {
	            logger.log('International country code. Using International PubIds.');
	            logsSent = true;
	          }

	          isIntl = true;
	        }
	      } else {
	        if (!logsSent) {
	          logsSent = true;
	          logger.log('No country code. Domestic Site.');
	        }
	      }
	    } else {
	      if (!logsSent) {
	        logsSent = true;
	        logger.log('Domestic site or country code.');
	      }
	    }
	  }

	  return isIntl;
	};
	var setIsIntl = isIntl;

	var merge = function merge(source, mods) {
	  var dest = {};

	  keys$1(source).forEach(function (attrname) {
	    dest[attrname] = source[attrname];
	  });

	  keys$1(mods).forEach(function (attrname) {
	    dest[attrname] = mods[attrname];
	  });

	  return dest;
	};

	var getTrackPerformance = function getTrackPerformance() {
	  return new promise$1(function (resolve, reject) {
	    if (typeof window !== 'undefined' && !window.CNN || !window.jQuery) {
	      reject(new Error('trackPerformance not needed'));
	    } else if (typeof window !== 'undefined' && window.CNN.Analytics && window.CNN.Analytics.segment && typeof window.CNN.Analytics.segment.trackPerformance === 'function') {
	      resolve();
	    } else if (typeof window !== 'undefined' && typeof window.jQuery.fn.onSegmentReady === 'function') {
	      window.jQuery(document).onSegmentReady(function _handleSegmentReady() {
	        resolve();
	      });
	    } else {
	      reject(new Error('trackPerformance not available'));
	    }
	  });
	};

	var adfuelEntries = [];

	var queueEntry = function queueEntry(eventName) {
	  var entries = typeof window !== 'undefined' ? window.performance.getEntriesByName('[ADFUEL] ' + eventName) : [];

	  for (var i = 0; i < entries.length; i++) {
	    adfuelEntries.push(entries[i]);
	  }
	};

	var addMark = function addMark(name) {
	  typeof window !== 'undefined' && window.performance.mark('[ADFUEL] ' + name);
	};

	var addMeasure = function addMeasure(name, start, end) {
	  typeof window !== 'undefined' && window.performance.measure('[ADFUEL] ' + name, '[ADFUEL] ' + start, '[ADFUEL] ' + end);
	};

	var getMarks = function getMarks() {
	  return typeof window !== 'undefined' ? window.performance.getEntriesByType('mark').filter(function (mark) {
	    return mark.name.indexOf('[ADFUEL]');
	  }) : [];
	};

	var getMeasures = function getMeasures() {
	  return typeof window !== 'undefined' ? window.performance.getEntriesByType('measure').filter(function (mark) {
	    return mark.name.indexOf('[ADFUEL]');
	  }) : [];
	};

	if (typeof document !== 'undefined') {
	  addEvent(document, 'AdFuelCreated', filterDFPRequest);
	}

	var hasUserConsent = typeof window !== 'undefined' && window.WM && window.WM.UserConsent || false;
	var performance = {
	  adfuelEntries: adfuelEntries,
	  getTrackPerformance: getTrackPerformance,
	  mark: addMark,
	  measure: addMeasure,
	  marks: getMarks,
	  measures: getMeasures,
	  queueEntry: queueEntry,
	  slotDetails: {}
	};
	var AdFuelUtils = {
	  addEvent: addEvent,
	  bind: bind,
	  cdnRoot: cdnRoot,
	  clone: clone,
	  countryCode: countryCode,
	  debounce: debounce,
	  gdprApplies: gdprApplies,
	  getFullConsentState: getFullConsentState,
	  getConsentVersion: getConsentVersion,
	  getConsentString: getConsentString,
	  getConsent: getConsent,
	  getGDPRApplies: getGDPRApplies,
	  getCCPAApplies: getCCPAApplies,
	  getUserConsentRegion: getUserConsentRegion,
	  getLocation: getLocation,
	  generateCacheBuster: generateCacheBuster,
	  getBrowser: getBrowser,
	  getLogger: getLogger,
	  getUMTOCookies: getUMTOCookies,
	  getURLParam: getURLParam,
	  getViewport: getViewport,
	  hasCookie: hasCookie,
	  hasOwn: hasOwn,
	  hasUserConsent: hasUserConsent,
	  isFunction: isFunction,
	  isIntl: isIntl,
	  isMobile: isMobile,
	  isMonetized: isMonetized,
	  isObject: isObject,
	  keyMap: keyMap,
	  merge: merge,
	  mergeDeep: mergeDeep,
	  noop: noop,
	  once: once,
	  performance: performance,
	  piiFilter: piiFilter,
	  readCookie: readCookie,
	  roundFloat: roundFloat,
	  selectedEdition: selectedEdition,
	  setHostAndPathNames: setHostAndPathNames,
	  setIsIntl: isIntl,
	  __VERSION__: MODULE_VERSION
	};
	window.AdFuelUtils = AdFuelUtils;

	/*
	    Google Publisher Tag
	    @1.0.1: - Load GPT from securepubads.g.doubleclick.net
	    ------------------------------------------------------
	    GDPR Status: Blocked
	    CCPA Status: Blocked
	*/
	var getLogger$1 = window.AdFuelUtils.getLogger;
	var MODULE_NAME$1 = 'Google Publisher Tag';
	var MODULE_VERSION$1 = 'v1.0.1';
	var logger$1;

	var init = function init(config) {
	  var initPromise = new promise$1(function (resolve) {
	    logger$1 = getLogger$1(MODULE_NAME$1, MODULE_VERSION$1, 'gpt', 'color: #58f53f; padding: 2px', config && config.ADFUEL ? config.ADFUEL.DEBUG : false);

	    if (!document.getElementById('GPTScript')) {
	      logger$1.log('Predefining googletag and googletag.cmd...');
	      window.googletag = window.googletag || {};
	      window.googletag.cmd = window.googletag.cmd || [];
	      var gpta = document;
	      var gptb = gpta.createElement('script');
	      var gptc = gpta.getElementsByTagName('script')[0];
	      var gptd = document.location.protocol === 'https:';
	      gptb.id = 'GPTScript';
	      gptb.type = 'text/javascript';
	      gptb.src = (gptd ? 'https:' : 'http:') + '//securepubads.g.doubleclick.net/tag/js/gpt.js';
	      logger$1.log('Including GPT Library: ', gptb.src);
	      gptc.parentNode.insertBefore(gptb, gptc);
	    }

	    resolve();
	  });
	  initPromise.id = "".concat(MODULE_NAME$1, " ").concat(MODULE_VERSION$1);
	  return initPromise;
	};

	var remove = function remove() {
	  var gpta = document;
	  var gptb = gpta.getElementById('GPTScript');
	  var gptc = gpta.getElementsByTagName('script')[0];
	  gptc.parentNode.removeChild(gptb);
	  delete window.googletag;
	};

	var googleTag = {
	  init: init,
	  remove: remove,
	  runAuction: function runAuction() {
	    var auctionPromise = new promise$1(function (resolve) {
	      resolve();
	    });
	    auctionPromise.id = "".concat(MODULE_NAME$1, " ").concat(MODULE_VERSION$1);
	    return auctionPromise;
	  },
	  buildSlot: function buildSlot() {
	    var buildPromise = new promise$1(function (resolve) {
	      resolve();
	    });
	    buildPromise.id = "".concat(MODULE_NAME$1, " ").concat(MODULE_VERSION$1);
	    return buildPromise;
	  },
	  setTargeting: function setTargeting() {
	    var targetingPromise = new promise$1(function (resolve) {
	      resolve();
	    });
	    targetingPromise.id = "".concat(MODULE_NAME$1, " ").concat(MODULE_VERSION$1);
	    return targetingPromise;
	  },
	  __NAME__: MODULE_NAME$1,
	  __VERSION__: MODULE_VERSION$1
	};

	var version = "2.1.39";

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  window.googletag = window.googletag || {};
	  window.googletag.cmd = window.googletag.cmd || [];
	} // Define local AdFuel variables


	var NAME$1 = 'AdFuel';
	var VERSION = version;
	var siteOptions = {};
	var initEventSet = false;
	var _options = {};
	var perf = performance || {};
	var _initialized = false;
	var _blocked = null;
	var renderStaticAds = false;
	var _pageSlots = {};
	var _rocketeerSlots = [];
	var _builtSlots = [];
	var _queuedSlots = [];
	var _dispatchedSlots = [];

	var _adsQAPageLevelKey;

	var _adsQAPageLevelValue;

	var _setChildDirectedTreatment;

	var _setSafeFrameConfig;

	var _dynamicTargeting = {
	  pageTargets: {},
	  slotTargets: {}
	};
	var _pageLevelTargeting = [];

	var _inheritableAdUnit;

	var _preQueueExecuting = [];
	var _delayingDispatch = false; // contains queueRegistry functions which must be delayed until registries are queueable

	var _delayedRegistryQueues = []; // contains dispatchQueue functions which must be delayed until queues are dispatchable

	var _delayedDispatchQueues = []; // contains dispatchQueue functions which must be delayed until users request their dispatch

	var _userDispatchedQueues = []; // contains registered Modules (name, callbacks)

	var _registeredModules = []; // contains slot ids which can be excluded via _options.exclude or queueRegistery queueOptions.exclude
	// excluded slots must be explicitly dispatched via dispatchOptions.slots

	var _excludedSlotIds = []; // contains the registry data from queued registries to be used in the event of a re-queue
	// of the same registry

	var _cachedRegistries = {};
	var consentTags = ['data-store', 'ads-contextual', 'ads-person-prof', 'ads-person', 'vendor']; // create instance of logger for AdFuel

	var logger$2 = getLogger(NAME$1, VERSION, 'adfuel', 'color: #4f86f7; padding: 2px', window.AdFuelOptions && window.AdFuelOptions.ADFUEL && window.AdFuelOptions.ADFUEL.DEBUG || false); // create instance of logger for UserConsent purposes

	var UserConsentLogger = getLogger(' User Consent', '', 'consent', 'color: coral; padding: 2px', siteOptions && siteOptions.USER_CONSENT && siteOptions.USER_CONSENT.DEBUG || false);
	/** Registry Manager **/

	function _isRegistryQueueable() {
	  var userConsentEnabled = window.AdFuelOptions && window.AdFuelOptions.USER_CONSENT && window.AdFuelOptions.USER_CONSENT.ENABLED === true;
	  var userConsentReady = window.WM && window.WM.UserConsent ? window.WM.UserConsent.isReady() : false;
	  var consentToQueue = true;

	  if (userConsentEnabled) {
	    if (userConsentReady) {
	      var consentRegion = window.WM.UserConsent.getRegion();

	      if (consentRegion === 'gdpr') {
	        if (window.WM.UserConsent.isOptanonLoaded()) {
	          var consentStatus = window.WM.UserConsent.getUserConsentAdvertisingState();
	          logger$2.log('Region is GDPR and Optanon is ready. Setting consentToQueue:', consentStatus);
	          consentToQueue = consentStatus;

	          if (consentStatus && !_initialized) {
	            logger$2.log('Fallback initialization...');
	            initGoogleTag();
	            init$1(window.AdFuelOptions);
	          }
	        } else {
	          logger$2.log('Region is GDPR but Optanon is not ready. Setting consentToQueue:', false);
	          consentToQueue = false;
	        }
	      } else {
	        logger$2.log('Region is not GDPR.');
	      }
	    } else {
	      logger$2.log('UserConsent is not ready. Setting consentToQueue:', false);
	      consentToQueue = false;
	    }
	  }

	  if (consentToQueue && (!_initialized || _registeredModules.length === 0)) {
	    logger$2.log('AdFuel is not ready or modules not registered. Revoking consentToQueue.', {
	      init: _initialized,
	      mods: _registeredModules.length
	    });
	    consentToQueue = false;
	  }

	  logger$2.log('Is registry queueable:', consentToQueue);
	  return consentToQueue;
	}
	/** Registry Manager **/


	function _queueDelayedRegistries() {
	  if (_isRegistryQueueable()) {
	    if (_delayedRegistryQueues.length > 0) {
	      logger$2.log('Executing delayed registry queues...');

	      _delayedRegistryQueues.forEach(function (delayedQueue) {
	        delayedQueue();
	      });

	      logger$2.log('Clearing delayed registry queue...');
	      _delayedRegistryQueues.length = 0;
	    }
	  } else {
	    logger$2.log('Registries are still not queueable. Waiting 250ms...');
	    var userConsentEnabled = window.AdFuelOptions && window.AdFuelOptions.USER_CONSENT && window.AdFuelOptions.USER_CONSENT.ENABLED === true;
	    var userConsentReady = window.WM && window.WM.UserConsent ? window.WM.UserConsent.isReady() : false;
	    var userConsentRegion = window.WM && window.WM.UserConsent ? window.WM.UserConsent.getRegion() : 'global';
	    var userConsentStatus = window.WM && window.WM.UserConsent ? window.WM.UserConsent.getUserConsentAdvertisingState() : !userConsentEnabled;

	    if (!userConsentEnabled || !userConsentReady || userConsentRegion !== 'gdpr' || userConsentRegion === 'gdpr' && userConsentStatus === true) {
	      setTimeout(_queueDelayedRegistries, 250);
	    }
	  }
	}
	/** Registry Manager **/
	// main AdFuel registry handler


	var RegistryArray = function RegistryArrayFunc() {
	  var self = [];

	  self.push = function pushFunc(asset, options) {
	    if (!isArray$1(asset)) {
	      return;
	    }

	    if (_isRegistryQueueable()) {
	      var queueID = generateCacheBuster();
	      perf.mark('Queue Registry [' + asset[0].rktr_id + ' - ' + queueID + '] Start');
	      logger$2.log('Starting Queue with ID: ', queueID);
	      var optionsClone = options ? assign$1({}, options) : {
	        dispatch: true
	      };
	      optionsClone.dispatch = optionsClone.dispatch || _options.autoDispatch; // Always work with a clone of the supplied arguments to conform to the FP paradigm.

	      var assetClone = asset.map(function (slot) {
	        // Add the queue id to each slot
	        slot.queue_id = queueID;
	        return slot;
	      }).filter(function (slot, index) {
	        if (index === 0) return true; // This first check is necessary in order to dispatch excluded slots when specifically called to do so.

	        if (optionsClone.slots && optionsClone.slots.length > 0 && optionsClone.slots.indexOf(slot.rktr_slot_id) !== -1) {
	          // Remove the slot from excluded slots since it's being specificially called for dispatch.
	          if (_excludedSlotIds.indexOf(slot.rktr_slot_id) !== -1) {
	            _excludedSlotIds.splice(_excludedSlotIds.indexOf(slot.rktr_slot_id), 1);
	          }

	          return true;
	        } // Filter out slots not present in the 'slots' option or present in the 'exclude' option if supplied.
	        // Also check _excludedSlotIds for any slot that may have been previously excluded.


	        if (optionsClone.slots && optionsClone.slots.length > 0 && optionsClone.slots.indexOf(slot.rktr_slot_id) === -1) {
	          logger$2.log('Slot [' + slot.rktr_slot_id + '] is being excluded based on slot options.', queueID);
	          return false;
	        }

	        if (optionsClone.exclude && optionsClone.exclude.length > 0 && optionsClone.exclude.indexOf(slot.rktr_slot_id) !== -1) {
	          logger$2.log('Slot [' + slot.rktr_slot_id + '] is being excluded based on exclude options.', queueID);
	          return false;
	        }

	        if (_excludedSlotIds.length > 0 && _excludedSlotIds.indexOf(slot.rktr_slot_id) !== -1) {
	          logger$2.log('Slot [' + slot.rktr_slot_id + '] is being excluded based on previously excluded slots.', queueID);
	          return false;
	        }

	        return true;
	      });
	      logger$2.log('Asset Clone: ', assetClone); // Begin Queueing of Registry
	      // Calls preQueueCallback and postQueueCallback
	      // Dispatches queue if _options.autoDispatch

	      _preQueueExecuting.push(queueID);

	      var assetIndex; // Modify the asset to correlate to the slot map, if passed.

	      if (optionsClone.slotMap) {
	        logger$2.log('Parsing Slot Map: ', optionsClone.slotMap, assetClone, queueID);

	        for (assetIndex = 1; assetIndex < assetClone.length; assetIndex++) {
	          logger$2.log('Checking Slot: ', assetClone[assetIndex].rktr_slot_id, queueID);

	          if (optionsClone.slotMap[assetClone[assetIndex].rktr_slot_id]) {
	            logger$2.log('Overriding Element Id for: ' + assetClone[assetIndex].rktr_slot_id, optionsClone.slotMap[assetClone[assetIndex].rktr_slot_id], queueID);
	            assetClone[assetIndex].rktr_slot_id = optionsClone.slotMap[assetClone[assetIndex].rktr_slot_id];
	          }
	        }
	      } // Modify the asset to correlate to the ad unit map, if passed.


	      if (optionsClone && optionsClone.adUnitMap) {
	        logger$2.log('Parsing Ad Unit Map: ', optionsClone.adUnitMap, assetClone, queueID);

	        if (typeof optionsClone.adUnitMap === 'string') {
	          logger$2.log('Overriding All Ad Units: ', optionsClone.adUnitMap, queueID);

	          for (assetIndex = 1; assetIndex < assetClone.length; assetIndex++) {
	            assetClone[assetIndex].rktr_ad_id = optionsClone.adUnitMap;
	          }
	        } else {
	          for (assetIndex = 1; assetIndex < assetClone.length; assetIndex++) {
	            logger$2.log('Checking Slot: ', assetClone[assetIndex].rktr_slot_id, queueID);

	            if (optionsClone.adUnitMap[assetClone[assetIndex].rktr_slot_id]) {
	              logger$2.log('Overriding Ad Unit for: ' + assetClone[assetIndex].rktr_slot_id, optionsClone.adUnitMap[assetClone[assetIndex].rktr_slot_id], queueID);
	              assetClone[assetIndex].rktr_ad_id = optionsClone.adUnitMap[assetClone[assetIndex].rktr_slot_id];
	            }
	          }
	        }
	      } // Modify the asset to correlate to the ad unit map, if passed.


	      if (optionsClone && optionsClone.posMap) {
	        logger$2.log('Parsing POS Map: ', optionsClone.posMap, assetClone, queueID);

	        if (typeof optionsClone.posMap === 'string') {
	          logger$2.log('Overriding All Pos Values: ', optionsClone.posMap, queueID);
	          assetClone.forEach(function (asset, index) {
	            asset.targeting.forEach(function (target, index) {
	              if (target[0] === 'pos') {
	                if (optionsClone.posMap) asset.targeting[index][1][0] = optionsClone.posMap;
	              }
	            });
	          });
	        } else {
	          assetClone.forEach(function (asset, index) {
	            if (optionsClone.posMap[asset.rktr_slot_id]) {
	              asset.targeting.forEach(function (target, index) {
	                if (target[0] === 'pos') {
	                  logger$2.log('Overriding POS for Slot: ', asset.rktr_slot_id, target[1][0], optionsClone.posMap[asset.rktr_slot_id], queueID);
	                  asset.targeting[index][1][0] = optionsClone.posMap[asset.rktr_slot_id] || asset.targeting[index][1][0];
	                }
	              });
	            }
	          });
	        }
	      }

	      var monetizedAssets = [];
	      assetClone.forEach(function (clonedAsset) {
	        var monetization = isMonetized(clonedAsset);

	        if (asset.rktr_slot_id !== 'page' && monetization.isMonetized) {
	          clonedAsset.monetization = monetization;
	          monetizedAssets.push(clonedAsset);
	        }
	      });
	      logger$2.log('Monetized Slots: ', monetizedAssets, queueID); // Add asset to this array

	      Array.prototype.push.call(self, assetClone);
	      var slotsToDisplay = assetClone.filter(function (slot) {
	        var test1 = !optionsClone.slots || optionsClone.slots.length === 0 || optionsClone.slots.indexOf(slot.rktr_slot_id) >= 0;
	        var test2 = !optionsClone.exclude || _excludedSlotIds.length === 0 || _excludedSlotIds.indexOf(slot.rktr_slot_id) < 0;
	        var test3 = optionsClone.slots && optionsClone.slots.length > 0 || _excludedSlotIds.indexOf(slot.rktr_slot_id) < 0;
	        var validSlot = test1 && test2 && test3;
	        return validSlot;
	      });
	      logger$2.log('slots To display: ', slotsToDisplay, queueID);

	      var queueingProcedure = function queueingProcedure() {
	        var registryName = assetClone[0].rktr_id;
	        logger$2.log('Queueing Procedure for: ', assetClone, queueID); // set child directed treatment flag

	        if (typeof assetClone[0].child_directed_treatment !== 'undefined') {
	          _setChildDirectedTreatment = assetClone[0].child_directed_treatment === 'true' ? 1 : 0;
	        } // set SafeFrame config


	        if (typeof assetClone[0].safeframe_config !== 'undefined') {
	          _setSafeFrameConfig = assetClone[0].safeframe_config;
	        }

	        if (!assetClone[0].singleton) {
	          // registry, non-singleton
	          // save page level targeting
	          _applyRegistryPageLevelTargeting(assetClone[0].targeting); // set inheritable adunit based on first slot


	          try {
	            _inheritableAdUnit = _removeLeadingNumericNetworkId(assetClone[1].rktr_ad_id);
	          } catch (e) {
	            logger$2.log('Could not find inheritable Ad Unit.', assetClone, queueID);
	          }
	        }

	        var pageLevelRoot = _options.siteObject || (assetClone[0].root ? assetClone[0].root.toUpperCase() : assetClone[0].site.toUpperCase());
	        logger$2.log('Page Level Root: ', pageLevelRoot);
	        logger$2.log('Grabbing targeting from window object:', window[pageLevelRoot] ? window[pageLevelRoot].adTargets : {}, window[pageLevelRoot] ? window[pageLevelRoot].slotTargets : {}, queueID);

	        _applyWindowSiteLevelOptions(pageLevelRoot); // process slots


	        var startListeners = false;
	        assetClone.forEach(function (slot) {
	          slot.parentRegistry = registryName;

	          if (!slot.queued) {
	            var hasInViewRefresh = assetClone[0].hasInViewRefresh ? assetClone[0].hasInViewRefresh : slot.hasInViewRefresh;

	            if (hasInViewRefresh === true) {
	              startListeners = true;
	            }

	            logger$2.log('Adding slot to slots registry: ', slot, queueID);

	            _rocketeerSlots.push(slot);
	          }
	        });

	        if (startListeners && typeof window._startInViewListeners !== 'undefined') {
	          window._startInViewListeners();
	        }
	      };

	      getFilterValue().then(function (blocked) {
	        logger$2.log('Should render static ads? ', blocked, queueID); // renderStaticAds = blocked

	        if (getURLParam('renderStatic') !== '') {
	          logger$2.log('Using query string override for static ad rendering...', queueID);
	          renderStaticAds = getURLParam('renderStatic');
	        }

	        if (renderStaticAds !== false && renderStaticAds !== '' && typeof renderStaticAds !== 'undefined') {
	          renderStaticAd(assetClone);
	        } else {
	          logger$2.log('Executing pre-queue callbacks...', {
	            monetized: monetizedAssets,
	            registry: asset
	          }, queueID);
	          var monetizedAndBuilt = [];

	          _buildSlots(assetClone, options).then(function (builtSlots) {
	            logger$2.log('Monetized slots: ', monetizedAssets, queueID);
	            logger$2.log('Built slots: ', builtSlots, queueID);
	            monetizedAndBuilt = monetizedAssets.filter(function (monAsset) {
	              var isBuilt = false;
	              builtSlots.forEach(function (bldAsset) {
	                if (monAsset.rktr_slot_id === bldAsset.rktr_slot_id) {
	                  isBuilt = true;
	                }
	              });
	              logger$2.log("Is ".concat(monAsset.rktr_slot_id, " built? ").concat(isBuilt ? 'YES' : 'NO'), queueID);
	              return isBuilt;
	            });
	            logger$2.log('Monetized and Built: ', monetizedAndBuilt, queueID);
	            executeModuleCallbacks('preQueueCallback', monetizedAndBuilt, assetClone, optionsClone).then(function (results) {
	              logger$2.log('Pre-Queue Callbacks Complete!', {
	                results: results
	              }, queueID);

	              try {
	                var PreQueueCompleteEvent = new CustomEvent('PreQueueComplete', {
	                  detail: {
	                    asset: asset
	                  }
	                });
	                document.dispatchEvent(PreQueueCompleteEvent);
	              } catch (ex) {
	                logger$2.error('error dispatching custom Event: PreQueueComplete', {
	                  error: ex
	                }, queueID);
	              }

	              logger$2.log('Pre-Queue Complete!', queueID);
	              logger$2.log('Executing Queueing Procedures...', queueID);
	              queueingProcedure();
	              logger$2.log('Removing preQueue tracker id: ', queueID);
	              logger$2.log('DEBUG: _preQueueExecuting.splice(' + _preQueueExecuting.indexOf(queueID) + ', 1)');

	              _preQueueExecuting.splice(_preQueueExecuting.indexOf(queueID), 1);

	              perf.mark('Queue Registry [' + asset[0].rktr_id + ' - ' + queueID + '] End');
	              perf.measure('Queue Registry [' + asset[0].rktr_id + ' - ' + queueID + ']', 'Queue Registry [' + asset[0].rktr_id + ' - ' + queueID + '] Start', 'Queue Registry [' + asset[0].rktr_id + ' - ' + queueID + '] End');

	              if (optionsClone.dispatch) {
	                logger$2.log('Dispatching Queue...', queueID);
	                dispatchQueue(optionsClone);
	              }

	              if (_delayingDispatch) {
	                _delayingDispatch = false;

	                _dispatchAllQueues();
	              }
	            });
	          });
	        }
	      });
	    } else {
	      _delayedRegistryQueues.push(function () {
	        window.AdFuel.registry.push(asset, options);
	      });
	    }
	  };

	  return self;
	};
	/** Module Manager **/
	// execute module callbacks


	var executeModuleCallbacks = function executeModuleCallbacks(eventName, monetized, slots, options) {
	  var moduleCallbackPromise = new promise$1(function (resolve) {
	    var moduleCallbacks = _registeredModules.filter(function (module) {
	      logger$2.log("".concat(module.name, " has ").concat(eventName, "?  ").concat(!!module.callbacks[eventName]));
	      return !!module.callbacks[eventName];
	    }).map(function (module) {
	      var isMonetized = module.monetized;
	      logger$2.log("Calling ".concat(module.name, " ").concat(eventName, " callback with ").concat(isMonetized ? 'monetized' : 'all', " slots."));
	      return module.callbacks[eventName](isMonetized ? monetized : slots);
	    });

	    if (options && options[eventName]) {
	      // add optional preRefreshCallback
	      logger$2.log("Calling user-defined ".concat(eventName, " callback with all slots."));
	      moduleCallbacks.push(options[eventName](slots));
	    }

	    logger$2.log("".concat(eventName, " Callbacks:"), moduleCallbacks);

	    if (moduleCallbacks.length > 0) {
	      promise$1.all(moduleCallbacks).then(function (results) {
	        resolve(results);
	      });
	    } else {
	      resolve([{
	        msg: 'No Callbacks'
	      }]);
	    }
	  });
	  return moduleCallbackPromise;
	};
	/** Utils **/
	// bind a function to DOMContentLoaded


	function _bindReady(callback) {
	  var domContentLoadedCalled = false;
	  var windowLoadCalled = false;
	  var called = false;

	  function ready(eventName) {
	    // ensure this only executes once for each event
	    if (eventName === 'DOMContentLoaded' && !domContentLoadedCalled) {
	      perf.mark('AdFuel DOMContentLoaded');

	      if (_options.autoDispatch) {
	        logger$2.log('DOM Content has loaded. Auto-Dispatching Queue...');

	        _dispatchAllQueues();
	      }

	      domContentLoadedCalled = true;
	      called = true;
	      if (callback && typeof callback === 'function') callback();
	    }

	    if (eventName === 'window.load' && !windowLoadCalled) {
	      perf.mark('AdFuel window.load');

	      if (_options.autoDispatch) {
	        logger$2.log('Window has loaded. Auto-Dispatching Queue...');

	        _dispatchAllQueues();
	      }

	      windowLoadCalled = true;
	      called = true;
	      if (callback && typeof callback === 'function') callback();
	    }
	  }

	  function tryScroll() {
	    if (!called) {
	      try {
	        document.documentElement.doScroll('left');
	        ready('DOMContentLoaded');
	      } catch (e) {
	        setTimeout(tryScroll, 10);
	      }
	    }
	  } // listen for document DOMContentLoaded/complete/loaded/interactive


	  if (document.addEventListener) {
	    addEvent(document, 'DOMContentLoaded', function () {
	      ready('DOMContentLoaded');
	    });
	  } else if (document.attachEvent) {
	    // IE
	    var isFrame = false;

	    try {
	      isFrame = window.frameElement !== null;
	    } catch (e) {} // Do Nothing
	    // IE, the document is not inside a frame


	    if (document.documentElement.doScroll && !isFrame) {
	      tryScroll();
	    } // IE, the document is inside a frame


	    addEvent(document, 'readystatechange', function () {
	      if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
	        ready('DOMContentLoaded');
	      }
	    });
	  } // listen for window load/onload


	  if (window.addEventListener || window.attachEvent) {
	    addEvent(window, 'load', function () {
	      ready('window.load');
	    });
	  } else {
	    var fn = window.onload; // very old browser, copy old onload

	    window.onload = function () {
	      // replace by new onload and call the old one
	      fn && fn();
	      ready('window.load');
	    };
	  } // Fallback if adfuel is put on page post-DOMContentLoaded


	  if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
	    ready('DOMContentLoaded');
	  }
	}
	/** Targeting Manager **/
	// occurs once upon init parsing url for adsQA page-level targeting


	function _checkForAdsQA() {
	  try {
	    var qaparam = getURLParam('adsqa');

	    if (qaparam) {
	      var qaparamPieces = qaparam.split('%3D');
	      _adsQAPageLevelKey = qaparamPieces[0];
	      _adsQAPageLevelValue = qaparamPieces[1];
	      _dynamicTargeting.pageTargets[_adsQAPageLevelKey] = _adsQAPageLevelValue;
	    }
	  } catch (err) {
	    logger$2.error('checkForAdsQA', err);
	  }
	}
	/** Targeting Manager **/
	// this applies targeting from the registry at the page-level for the request


	function _applyRegistryPageLevelTargeting(targeting) {
	  perf.mark('Applying Page-Level Targeting');

	  for (var tIndex = 0; tIndex < targeting.length; tIndex++) {
	    var target = targeting[tIndex];
	    var currentTargeting = _dynamicTargeting.pageTargets[target[0]] || [];

	    for (var valIndex = 0; valIndex < target[1].length; valIndex++) {
	      var value = target[1][valIndex];

	      if (currentTargeting.indexOf(value) < 0) {
	        currentTargeting.push(value);
	      }
	    }

	    _dynamicTargeting.pageTargets[target[0]] = currentTargeting;
	  }
	}
	/** Targeting Manager **/
	// this applies targeting from the page to both slots and page-level.


	function _applyWindowSiteLevelOptions(siteLvl) {
	  if (window[siteLvl]) {
	    // moved to setOptions
	    // if (window[siteLvl].refreshOnFocusOnly){
	    //    _options.refreshOnFocusOnly = true;
	    // }
	    perf.mark('Applying Window Site-Level Options.');

	    if (window[siteLvl].adTargets) {
	      keys$1(window[siteLvl].adTargets).forEach(function (key) {
	        _dynamicTargeting.pageTargets[key] = window[siteLvl].adTargets[key];
	      });
	    }

	    if (window[siteLvl].slotTargets) {
	      keys$1(window[siteLvl].slotTargets).forEach(function (slotId) {
	        var slotTargeting = window[siteLvl].slotTargets[slotId];

	        if (!_dynamicTargeting.slotTargets[slotId]) {
	          _dynamicTargeting.slotTargets[slotId] = {};
	        }

	        keys$1(slotTargeting).forEach(function (key2) {
	          _dynamicTargeting.slotTargets[slotId][key2] = slotTargeting[key2];
	        });
	      });
	    }
	  }
	}
	/** Targeting Manager **/
	// this will return targeting set in the registry, by the page, and by calls to AdFuel


	function _getCombinedSlotTargeting(rocketeerSlot) {
	  var slotTargeting = assign$1({}, rocketeerSlot.targeting);

	  if (!isArray$1(slotTargeting)) {
	    slotTargeting = [slotTargeting];
	  }

	  var dynamicSlotTargeting = _dynamicTargeting.slotTargets;

	  if (dynamicSlotTargeting[rocketeerSlot.rktr_slot_id]) {
	    keys$1(dynamicSlotTargeting[rocketeerSlot.rktr_slot_id]).forEach(function (targetId) {
	      slotTargeting.push([targetId, dynamicSlotTargeting[rocketeerSlot.rktr_slot_id][targetId]]);
	    });
	  }

	  return slotTargeting;
	}
	/** Slot Manager **/
	// add adfuel-rendered class to container element when ad is rendered


	function _setSlotRenderedClass() {
	  addEvent(document, 'GPTRenderComplete', function (e) {
	    var el = document.getElementById(e.detail.divId);

	    if (el && el.className.indexOf('adfuel-rendered') < 0) {
	      el.className += ' adfuel-rendered';
	    }
	  });
	}
	/** Slot Manager **/
	// removes adfuel-rendered class from supplied slots


	function _removeSlotRenderedClass(slots) {
	  var slotsClone = slots;

	  if (slotsClone) {
	    if (!isArray$1(slotsClone)) {
	      slotsClone = [slotsClone];
	    }

	    if (slotsClone.length === 0) {
	      slotsClone = getOwnPropertyNames$1(_pageSlots);
	    }
	  }

	  for (var x = 0; x < slotsClone.length; x++) {
	    var slotId = slotsClone[x];
	    var el = document.getElementById(slotId);

	    if (el && el.className.indexOf('adfuel-rendered') > 0) {
	      el.className = el.className.replace('adfuel-rendered', '');
	    }
	  }
	}
	/** Slot Manager **/


	function _removePageSlots(slots) {
	  var slotsClone = slots;

	  if (slotsClone) {
	    if (!isArray$1(slotsClone)) {
	      slotsClone = [slotsClone];
	    }

	    if (slotsClone.length === 0) {
	      slotsClone = getOwnPropertyNames$1(_pageSlots);
	    }
	  }

	  for (var x = 0; x < slotsClone.length; x++) {
	    var slotId = slotsClone[x];

	    if (_pageSlots[slotId]) {
	      logger$2.log('Removing Page Slot: ', slotId);
	      delete _pageSlots[slotId];
	    }
	  }
	}
	/** Slot Manager **/


	function _removeBuiltSlots(slots) {
	  var slotsClone = slots;

	  if (slotsClone) {
	    if (!isArray$1(slotsClone)) {
	      slotsClone = [slots];
	    }

	    if (slotsClone.length === 0) {
	      slotsClone = getOwnPropertyNames$1(_pageSlots);
	    }
	  }

	  _builtSlots = _builtSlots.filter(function (bslot) {
	    var remove = false;
	    slotsClone.forEach(function (slot) {
	      if (bslot.rktr_slot_id === slot) {
	        logger$2.log('Removing Built Slot: ', bslot);
	        remove = true; // extra precaution

	        bslot.dispatched = false;
	      }
	    });
	    return !remove;
	  });
	  logger$2.log('builtSlots: ', _builtSlots);
	}
	/** Targeting Manager **/


	function _removeDynamicSlotTargeting(slots) {
	  var slotsClone = slots;

	  if (slotsClone) {
	    if (!isArray$1(slotsClone)) {
	      slotsClone = [slots];
	    }

	    if (slotsClone.length === 0) {
	      slotsClone = getOwnPropertyNames$1(_pageSlots);
	    }
	  }

	  slotsClone.forEach(function (slot) {
	    if (_dynamicTargeting.slotTargets[slot]) {
	      logger$2.log('Removing Dynamic Slot Targeting: ', _dynamicTargeting.slotTargets[slot]);
	      delete _dynamicTargeting.slotTargets[slot];
	    }
	  });
	}
	/** Slot Manager **/


	function _removeRocketeerSlots(slots) {
	  var slotsClone = slots;

	  if (slotsClone) {
	    if (!isArray$1(slotsClone)) {
	      slotsClone = [slots];
	    }

	    if (slotsClone.length === 0) {
	      slotsClone = getOwnPropertyNames$1(_pageSlots);
	    }
	  }

	  logger$2.log('Removing Rocketeer Slots: ', slotsClone);

	  for (var x = 0; x < _rocketeerSlots.length; x++) {
	    var slotId = _rocketeerSlots[x].rktr_slot_id;

	    if (slotsClone.indexOf(slotId) >= 0 || slotsClone.length === 0) {
	      logger$2.log('Removing Rocketeer Slot: ', slotId);

	      _rocketeerSlots.splice(x, 1);
	    }
	  }
	}
	/** Request Manager **/


	function _setAdIFrameTitle() {
	  window.googletag.setAdIframeTitle(_options.iframeTitle);
	}
	/** Targeting Manager **/


	function addPageLevelTarget(key, value) {
	  if (!key || !value) {
	    return;
	  }

	  var val = value;
	  var currentTargeting = AdFuel.dynamicTargeting.pageTargets[key] || [];

	  if (!isArray$1(currentTargeting)) {
	    currentTargeting = [currentTargeting];
	  }

	  if (!isArray$1(val)) {
	    val = [val];
	  }

	  for (var vIndex = 0; vIndex < val.length; vIndex++) {
	    if (currentTargeting.indexOf(val[vIndex]) < 0) {
	      currentTargeting.push(val[vIndex]);
	    }
	  }

	  _dynamicTargeting.pageTargets[key] = currentTargeting.filter(function (x, i) {
	    return currentTargeting.indexOf(x) === i;
	  }); // logger.log('Setting Page-Level Targeting', key, currentTargeting);

	  _googleApi.executeWhenAvailable('adding page-level targeting', function () {
	    var data = {};
	    data[key] = AdFuel.dynamicTargeting.pageTargets[key];

	    _googleApi.setTargeting(key, AdFuel.dynamicTargeting.pageTargets[key]);
	  });
	}
	/** Targeting Manager **/


	function removePageLevelTarget(key, value) {
	  _googleApi.executeWhenAvailable('removing page-level targeting', function () {
	    var targets = _dynamicTargeting.pageTargets[key] || [];

	    if (typeof value !== 'undefined') {
	      if (targets.indexOf(value) >= 0) {
	        targets.splice(targets.indexOf(value), 1);
	      }

	      _dynamicTargeting.pageTargets[key] = targets;
	    }

	    if (typeof key !== 'undefined' && typeof value === 'undefined') {
	      _googleApi.clearTargeting(key);

	      delete _dynamicTargeting.pageTargets[key];
	      if (targets) targets.length = 0;
	    } else if (typeof key === 'undefined') {
	      _googleApi.clearTargeting();

	      _dynamicTargeting.pageTargets = {};
	    }

	    if (typeof key !== 'undefined' && targets.length === 0) {
	      delete _dynamicTargeting.pageTargets[key];
	    } else if (typeof key !== 'undefined' && targets.length > 0) {
	      _dynamicTargeting.pageTargets[key] = targets;

	      _googleApi.setTargeting(key, targets);
	    } else {
	      _dynamicTargeting.pageTargets = {};

	      if (_adsQAPageLevelKey) {
	        // restore adsQA target
	        _dynamicTargeting.pageTargets[_adsQAPageLevelKey] = _adsQAPageLevelValue;
	        addPageLevelTarget(_adsQAPageLevelKey, _adsQAPageLevelValue);
	      }
	    }
	  });
	}
	/** Targeting Manager **/


	function addSlotLevelTarget(slotId, key, value) {
	  var slotTargeting = _dynamicTargeting.slotTargets[slotId] || {};
	  var currentTargeting = slotTargeting[key] || [];

	  if (!isArray$1(currentTargeting)) {
	    currentTargeting = currentTargeting ? [currentTargeting] : [];
	  }

	  if (isArray$1(value)) {
	    for (var vIndex = 0; vIndex < value.length; vIndex++) {
	      currentTargeting.push(value[vIndex]);
	    }
	  } else {
	    currentTargeting.push(value);
	  }

	  _dynamicTargeting.slotTargets[slotId] = _dynamicTargeting.slotTargets[slotId] || {};
	  _dynamicTargeting.slotTargets[slotId][key] = currentTargeting.filter(function (x, i) {
	    return currentTargeting.indexOf(x) === i;
	  });

	  _googleApi.executeWhenAvailable('adding slot-level targeting', function () {
	    var slot = _pageSlots[slotId];

	    if (slot) {
	      // found slot
	      _googleApi.setSlotTargeting(slot, key, currentTargeting);
	    }
	  });
	}
	/** Targeting Manager **/


	function removeSlotLevelTarget(slotId, key, value) {
	  _googleApi.executeWhenAvailable('removing slot-level targeting', function () {
	    var slot = _pageSlots[slotId];

	    if (slot) {
	      // valid slot
	      var slotTargeting = {}; // get existing targeting keys

	      var currentTargetingKeys = slot.getTargetingKeys();

	      keys$1(currentTargetingKeys).forEach(function (keyId) {
	        var keyName = currentTargetingKeys[keyId];

	        if (typeof keyName !== 'function') {
	          slotTargeting[keyName] = slot.getTargeting(keyName) || '';
	        }
	      });

	      var defaultSlotTargeting = {
	        pos: slotTargeting.pos
	      };

	      if (key) {
	        // remove only key
	        if (!value) {
	          delete _dynamicTargeting.slotTargets[slotId][key];
	          delete slotTargeting[key];
	        } else {
	          slotTargeting[key].splice(slotTargeting[key].indexOf(value), 1);

	          _dynamicTargeting.slotTargets[slotId][key].splice(_dynamicTargeting.slotTargets[slotId][key].indexOf(value), 1);
	        }
	      } else {
	        // remove everything but pos
	        slotTargeting = {
	          pos: slotTargeting.pos
	        };
	        _dynamicTargeting.slotTargets[slotId].length = 0;
	        _dynamicTargeting.slotTargets[slotId] = defaultSlotTargeting;
	      }

	      _googleApi.clearSlotTargeting(slot); // add back everything in slotTargeting


	      keys$1(slotTargeting).forEach(function (targetKey) {
	        if (slotTargeting[targetKey].length === 0) {
	          slotTargeting[targetKey][0] = '';
	        }

	        _googleApi.setSlotTargeting(slot, targetKey, slotTargeting[targetKey]);
	      });
	    }
	  });
	}
	/** Request Manager **/


	function _buildPageLevelGPTObject() {
	  perf.mark('Page-Level GPT Build Start');
	  var latlong = readCookie('gptgeo');

	  if (!latlong) {
	    logger$2.log('Unable to retrieve location cookie', latlong);
	  } else {
	    // send lat/long to GPT
	    var latlongPieces = latlong.split('%2C');

	    var latitude = _parseFloat$2(latlongPieces[0]);

	    var longitude = _parseFloat$2(latlongPieces[1]);

	    _googleApi.executeWhenAvailable('setting location', function () {
	      _googleApi.setLocation(latitude, longitude);
	    });
	  }

	  if (_setChildDirectedTreatment === 1) {
	    logger$2.log('Setting Child Directed Treat Tag : ', true);

	    _googleApi.executeWhenAvailable('setting child_directed_treatment tag', function () {
	      _googleApi.setChildDirectedTreatmentTag(_setChildDirectedTreatment);
	    });
	  }

	  if (typeof _setSafeFrameConfig !== 'undefined') {
	    logger$2.log('Setting SafeFrame Config Tag : ', _setSafeFrameConfig);

	    _googleApi.executeWhenAvailable('setting safeframe_config', function () {
	      _googleApi.setSafeFrameConfig(_setSafeFrameConfig);
	    });
	  } // combine page level targeting and _dynamicTargeting.pageTargets


	  var targetings = _pageLevelTargeting;
	  var dynamicPageTargeting = _dynamicTargeting.pageTargets;

	  keys$1(dynamicPageTargeting).forEach(function (targetId) {
	    targetings.push([targetId, dynamicPageTargeting[targetId]]);
	  });

	  for (var targetIndex = 0; targetIndex < targetings.length; targetIndex++) {
	    var targetValue = targetings[targetIndex][1]; // convert targetValue to array if necessary

	    if (targetValue && !isArray$1(targetValue)) {
	      if (targetValue.indexOf(',') >= 0) {
	        targetValue = targetValue.split(',');
	      } else {
	        targetValue = [targetValue];
	      }
	    }

	    if (targetings[targetIndex][0] === 'exclusions') {
	      for (var i = 0; i < targetValue.length; i++) {
	        var targetKeyValue = targetings[targetIndex][1][i];

	        _googleApi.executeWhenAvailable('setting category exclusion', function _setCategoryExclusions() {
	          _googleApi.setCategoryExclusion(targetKeyValue);
	        });
	      }
	    } else {
	      var targetKey = targetings[targetIndex][0];
	      addPageLevelTarget(targetKey, targetValue);
	    }
	  }

	  logger$2.log('Setting Page-Level Targeting', targetings);
	  perf.mark('Page-Level GPT Build End');
	  perf.measure('Page-Level GPT Build', 'Page-Level GPT Build Start', 'Page-Level GPT Build End');
	}
	/** Targeting Manager **/


	function _applySiteSlotTargeting(slot) {
	  var targetings = slot.targeting;
	  var dynamicSlotTargeting = _dynamicTargeting.slotTargets[slot.rktr_slot_id] || {};
	  var targetKey;

	  if (dynamicSlotTargeting[slot.rktr_slot_id]) {
	    keys$1(dynamicSlotTargeting[slot.rktr_slot_id]).forEach(function (targetKey) {
	      targetings.push([targetKey, dynamicSlotTargeting[slot.rktr_slot_id][targetKey]]);
	    });
	  }

	  if (window[_options.siteObject]) {
	    if (typeof window[_options.siteObject].slotTargets !== 'undefined' && typeof window[_options.siteObject].slotTargets[slot.rktr_slot_id] !== 'undefined') {
	      for (targetKey in window[_options.siteObject].slotTargets[slot.rktr_slot_id]) {
	        targetings.push([targetKey, window[_options.siteObject].slotTargets[slot.rktr_slot_id][targetKey]]);
	      }
	    }
	  }

	  logger$2.log('Setting Slot-Level Targeting', slot.rktr_slot_id, targetings);

	  for (var targetIndex = 0; targetIndex < targetings.length; targetIndex++) {
	    var targetValue = targetings[targetIndex][1]; // convert targetValue to array if necessary

	    if (targetValue && !isArray$1(targetValue)) {
	      if (targetValue.indexOf(',') >= 0) {
	        targetValue = targetValue.split(',');
	      } else {
	        targetValue = [targetValue];
	      }
	    }

	    logger$2.log('Setting Slot Level Target: ', slot.rktr_slot_id, targetKey, targetValue);
	    targetKey = targetings[targetIndex][0];
	    addSlotLevelTarget(slot.rktr_slot_id, targetKey, targetValue);
	  }
	}
	/** Request Manager **/


	function _renderCheck(rocketeerSlot) {
	  var unrenderedSlots = document.querySelectorAll('div#' + rocketeerSlot.rktr_slot_id);

	  if (unrenderedSlots.length !== 0) {
	    for (var sI = 0; sI < unrenderedSlots.length; sI++) {
	      var slotDiv = unrenderedSlots[sI];

	      if (slotDiv.className.indexOf('adfuel-rendered') >= 0) {
	        /* Element already has an ad rendered in it. */
	        logger$2.log('Found rendered slot...', rocketeerSlot.rktr_slot_id);
	      } else {
	        /* Clean element ready for rendering */
	        if (unrenderedSlots.length === 1 && _pageSlots[rocketeerSlot.rktr_slot_id]) {
	          /*
	            If there is only one element in unrenderedSlots and a GPT Slot object
	            already exists for this id, ignore the element count when updating the
	            slot and clear the slot.
	          */
	          var updatedSlot = _updateSlot(rocketeerSlot); // clear the slot before rendering an ad


	          clearSlots(updatedSlot.rktr_slot_id);
	          return updatedSlot;
	        }

	        return _updateSlot(rocketeerSlot);
	      }
	    }
	  } // slot not found


	  logger$2.log("Not building slot... Can't Find Unrendered Slot On Page", rocketeerSlot.rktr_slot_id);
	  return null;
	}
	/** Utils **/


	function formattedScheduleDate() {
	  var d = new Date();
	  var month = '' + (d.getMonth() + 1);
	  var day = '' + d.getDate();
	  var year = d.getFullYear();

	  if (month.length < 2) {
	    month = '0' + month;
	  }

	  if (day.length < 2) {
	    day = '0' + day;
	  }

	  return [year, month, day].join('');
	}
	/** Request Manager **/


	function renderStaticAd(rocketeerSlots) {
	  var serverLogger = getLogger('AdFuel', 'Static Ad Server', 'server', 'color: #4f86f7; padding: 2px', window.AdFuelOptions.ADFUEL.DEBUG || false);
	  serverLogger.log('Rocketeer Slots: ', rocketeerSlots);
	  var viewport = getViewport();
	  var pageLevel = rocketeerSlots.splice(0, 1)[0];
	  var site = pageLevel.root;
	  var dateToday = formattedScheduleDate();
	  fetch("//i.cdn.turner.com/ads/adspaces/".concat(site, "/xxkz_assets.json?cacheBuster=").concat(generateCacheBuster())).then(function (data) {
	    return data.json();
	  }).then(function (response) {
	    // var response = {"publishedAssets":[{"folder":"AdultSwim","filename":"20191107-20191108_ad_toolbox.png","fileStream":"true","isCCPA":"true","adSize":"300x250","startDate":"20191107","endDate":"20191108","assetUrl":"/www/ads/dev/adspaces/AdultSwim/CCPA/300x250/20191107-20191108_20191107-20191108_ad_toolbox.png"},{"folder":"AdultSwim","filename":"20191107-20191108_adFuel_modules.png","fileStream":"true","isCCPA":"true","adSize":"300x600","startDate":"20191107","endDate":"20191108","assetUrl":"/www/ads/dev/adspaces/AdultSwim/CCPA/300x600/20191107-20191108_adFuel_modules.png"},{"folder":"AdultSwim","filename":"20191111-20191115_adFuel_modules.png","fileStream":"true","isCCPA":"true","adSize":"970x250","startDate":"20191111","endDate":"20191115","assetUrl":"http://i.cdn.turner.com/ads/dev/adspaces/AdultSwim/CCPA/970x250/20191111-20191115_adFuel_modules.png"},{"folder":"AdultSwim","filename":"20191112-20191115_adFuel_modules.png","fileStream":"true","isCCPA":"true","adSize":"728x90","startDate":"20191112","endDate":"20191115","assetUrl":"http://i.cdn.turner.com/ads/dev/adspaces/AdultSwim/CCPA/728x90/20191112-20191115_adFuel_modules.png"}]};
	    var assets = response.publishedAssets;
	    serverLogger.log('CCPA Assets: ', assets);
	    rocketeerSlots.forEach(function (slotData) {
	      serverLogger.log('SlotData: ', slotData);
	      var sizes = slotData.sizes.map(function (size) {
	        return size.join('x');
	      });
	      var viewportReturned = false;
	      var responsizes = slotData.responsive.map(function (respViewport) {
	        // const viewportSize = respViewport[0].join('x');
	        var viewportSizes = respViewport[1].map(function (size) {
	          if (isArray$1(size)) return size.join('x');
	          return size;
	        });

	        if (respViewport[0][0] < viewport[0] && !viewportReturned) {
	          viewportReturned = true;
	          return viewportSizes;
	        }
	      }).filter(function (item) {
	        return typeof item !== 'undefined';
	      });
	      if (responsizes.length > 0) sizes = responsizes[0];

	      if (sizes[0] !== 'suppress') {
	        serverLogger.log('Requesting Static Ad For: ', {
	          site: site,
	          sizes: sizes
	        });
	        var eligibleAssets = assets.filter(function (asset) {
	          serverLogger.log('Checking Asset for Eligibility: ', asset);
	          serverLogger.log('Asset Ad Size: ', asset.adSize);
	          serverLogger.log('Slot Sizes: ', sizes);
	          serverLogger.log('Index: ', sizes.indexOf(asset.adSize));
	          serverLogger.log('Manual Index: ', sizes.indexOf('300x250'));
	          serverLogger.log('Checks: ', {
	            startDate: _parseInt$2(asset.startDate, 10) <= dateToday,
	            endDate: _parseInt$2(asset.endDate, 10) >= dateToday,
	            sizes: sizes.indexOf(asset.adSize) >= 0
	          });

	          if (_parseInt$2(asset.startDate, 10) <= dateToday && _parseInt$2(asset.endDate, 10) >= dateToday && sizes.indexOf(asset.adSize) >= 0) {
	            return true;
	          }
	        });
	        serverLogger.log('Eligible Assets: ', eligibleAssets);

	        if (eligibleAssets.length > 0) {
	          var randomAsset = eligibleAssets[Math.floor(Math.random() * eligibleAssets.length)];
	          var staticAd = document.createElement('img');
	          var mangledURL = randomAsset.assetUrl.replace('/www', '//i.cdn.turner.com') + "?cacheBuster=".concat(generateCacheBuster());
	          serverLogger.log('Random Asset URL: ', mangledURL);
	          staticAd.src = mangledURL;
	          staticAd.style.width = randomAsset.adSize.split('x')[0] + 'px';
	          staticAd.style.height = randomAsset.adSize.split('x')[1] + 'px';
	          staticAd.className = 'adfuel-served';
	          var adContainer = document.getElementById(slotData.rktr_slot_id);

	          if (adContainer) {
	            serverLogger.log('Rendering Static Ad: ', randomAsset);

	            if (randomAsset.clickthruUrl) {
	              var clickAnchor = document.createElement('a');
	              clickAnchor.href = randomAsset.clickthruUrl;
	              clickAnchor.target = '_blank';
	              clickAnchor.rel = 'noreferrer noopener';
	              clickAnchor.appendChild(staticAd);
	              adContainer.appendChild(clickAnchor);
	            } else {
	              adContainer.appendChild(staticAd);
	            }
	          }
	        }
	      }
	    });
	  });
	}
	/** Slot Manager **/


	function _buildSlot(rocketeerSlot) {
	  var networkId = _options.networkId;
	  perf.mark('Building Slot [' + rocketeerSlot.rktr_slot_id + '] Start');
	  logger$2.group('Building Slot: ' + rocketeerSlot.rktr_slot_id);
	  logger$2.log('Slot Ad Unit: ', rocketeerSlot.rktr_ad_id);

	  if (rocketeerSlot.inherit && _inheritableAdUnit) {
	    // for inheritable slots, override adunit if there's something to inherit
	    rocketeerSlot.rktr_ad_id = _inheritableAdUnit;
	  }

	  var adPath = '/' + networkId + '/' + rocketeerSlot.rktr_ad_id;
	  var slotId = rocketeerSlot.rktr_slot_id;
	  var isOutOfPageSlot = rocketeerSlot.rktr_slot_id.indexOf('_oop') >= 1;
	  var action = isOutOfPageSlot ? 'Defining OOP Slot' : 'Defining Standard Slot';
	  var setSafeFrameConfig;

	  if (typeof rocketeerSlot.safeframe_config !== 'undefined') {
	    setSafeFrameConfig = rocketeerSlot.safeframe_config;
	  }

	  _googleApi.executeWhenAvailable(action, function () {
	    if (isOutOfPageSlot) {
	      _pageSlots[slotId] = _googleApi.defineOutOfPageSlot(adPath, slotId);
	    } else {
	      _pageSlots[slotId] = _googleApi.defineSlot(adPath, rocketeerSlot.sizes, slotId);
	    }

	    if (setSafeFrameConfig) {
	      _googleApi.setSlotSafeFrameConfig(_pageSlots[slotId], setSafeFrameConfig);
	    }
	  });

	  _googleApi.executeWhenAvailable('Defining slot targeting', function () {
	    var slotTargeting = _getCombinedSlotTargeting(rocketeerSlot);

	    logger$2.log('Defining Slot Targeting: ', rocketeerSlot.rktr_slot_id, slotTargeting);

	    keys$1(slotTargeting).forEach(function (target) {
	      var targetValue;

	      if (slotTargeting[target] && slotTargeting[target][1]) {
	        targetValue = stringify$1(slotTargeting[target][1]);
	      } else {
	        targetValue = '';
	      }

	      if (targetValue) {
	        targetValue = JSON.parse(targetValue);
	        var gptSlot = _pageSlots[slotId];

	        if (slotTargeting[target][0] === 'exclusions') {
	          if (isArray$1(slotTargeting[target][1])) {
	            keys$1(slotTargeting[target][1]).forEach(function (targetIndex) {
	              targetValue = slotTargeting[target][1][targetIndex];

	              _googleApi.setSlotCategoryExclusion(gptSlot, targetValue);
	            });
	          } else {
	            _googleApi.setSlotCategoryExclusion(gptSlot, targetValue);
	          }
	        } else {
	          var key = slotTargeting[target][0];

	          _googleApi.setSlotTargeting(gptSlot, key, targetValue);
	        }
	      }
	    });
	  });

	  logger$2.log('Checking Responsive Mapping For Slot', rocketeerSlot.responsive);
	  rocketeerSlot.responsive = rocketeerSlot.responsive || [];

	  if (rocketeerSlot.responsive.length > 0) {
	    _buildSlotMapping(rocketeerSlot.rktr_slot_id, rocketeerSlot.responsive);
	  }

	  _applySiteSlotTargeting(rocketeerSlot);

	  logger$2.groupEnd('Building Slot: ' + rocketeerSlot.rktr_slot_id);
	  perf.mark('Building Slot [' + rocketeerSlot.rktr_slot_id + '] End');
	  perf.measure('Building Slot [' + rocketeerSlot.rktr_slot_id + ']', 'Building Slot [' + rocketeerSlot.rktr_slot_id + '] Start', 'Building Slot [' + rocketeerSlot.rktr_slot_id + '] End');
	}
	/** Slot Manager **/


	function _buildSlots(rocketeerSlots, options) {
	  var buildSlotsPromise = new promise$1(function (resolve) {
	    /*
	      options:
	      ignoreCheck: false
	    */
	    function removeSlot(slot) {
	      var index = _rocketeerSlots.indexOf(slot);

	      if (index >= 0) {
	        _rocketeerSlots.splice(index, 1);
	      }
	    }

	    for (var slotIndex = 0; slotIndex < rocketeerSlots.length; slotIndex++) {
	      var rocketeerSlot = rocketeerSlots[slotIndex];
	      var ignoreRenderCheck = options && options.ignoreCheck;
	      var buildSlot = true;

	      if (!ignoreRenderCheck) {
	        // renderCheck may return an updatedSlot or null
	        // if it updates the slot, it will modify rocketeerSlot
	        if (!_renderCheck(rocketeerSlot)) {
	          // remove slot, which is no longer valid
	          removeSlot(rocketeerSlot);
	          buildSlot = false;
	        }
	      }

	      if (buildSlot) {
	        var builtSlotIds = _builtSlots.map(function (slot) {
	          return slot.rktr_slot_id;
	        });

	        logger$2.log('Previously built slots: ', builtSlotIds);

	        if (builtSlotIds.indexOf(rocketeerSlot.rktr_slot_id) < 0) {
	          _buildSlot(rocketeerSlot);

	          _builtSlots.push(rocketeerSlot);

	          _queuedSlots.push(rocketeerSlot);

	          removeSlot(rocketeerSlot);
	        } else {
	          logger$2.log('Slot is already built: ', rocketeerSlot);
	        }
	      }
	    }

	    resolve(_builtSlots);
	  });
	  return buildSlotsPromise;
	}
	/** Slot Manager **/
	// clear slots- optional slotIds (object or array)


	function clearSlots(slotIds) {
	  var slotIdsClone = slotIds || [];

	  if (!isArray$1(slotIdsClone)) {
	    slotIdsClone = [slotIds];
	  }

	  logger$2.log('Clearing Slots', {
	    slotDivIds: slotIdsClone
	  });

	  _googleApi.executeWhenAvailable('clearing slots', function () {
	    // convert to slots
	    // what if passed slotIds are invalid?
	    var slots = [];

	    if (slotIdsClone.length > 0) {
	      slots = slotIdsClone.filter(function (slotId) {
	        return !!_pageSlots[slotId];
	      }).map(function (slotId) {
	        return _pageSlots[slotId];
	      });

	      if (slots.length === 0) {
	        return;
	      }
	    }

	    _googleApi.clearSlots(slots);
	  });
	}
	/** Slot Manager **/
	// destroy slots- optional slotIds (object or array)


	function destroySlots(slotIds) {
	  var slotIdsClone = slotIds || [];

	  if (!isArray$1(slotIdsClone)) {
	    slotIdsClone = [slotIds];
	  }

	  logger$2.log('Destroying Slots', {
	    slotDivIds: slotIds
	  }); // convert to slots
	  // what if passed slotIds are invalid?

	  var slots = [];

	  if (slotIdsClone.length > 0) {
	    slots = slotIdsClone.filter(function (slotId) {
	      return !!_pageSlots[slotId];
	    }).map(function (slotId) {
	      return _pageSlots[slotId];
	    });

	    if (slots.length === 0) {
	      return;
	    }
	  }

	  _googleApi.executeWhenAvailable('destroying slots', function () {
	    _googleApi.destroySlots(slots);
	  });

	  _removeSlotRenderedClass(slotIdsClone);

	  if (typeof window.jpUnloadUnits !== 'undefined') {
	    window.jpUnloadUnits();
	  } // Clean up internal records


	  _removeBuiltSlots(slotIdsClone);

	  _removeRocketeerSlots(slotIdsClone);

	  _removeDynamicSlotTargeting(slotIdsClone); // Removing page slots MUST happen last


	  _removePageSlots(slotIdsClone);

	  executeModuleCallbacks('destroySlotsCallback', slotIdsClone, slotIdsClone, {});
	}
	/** Slot Manager **/


	function _buildSlotMapping(slotId, responsiveMap) {
	  // transform responsiveMap- convert string values to integers, allow for "suppress"
	  for (var i = 0; i < responsiveMap.length; i++) {
	    var val = JSON.parse(stringify$1(responsiveMap[i]));

	    for (var x = 0; x < val.length; x++) {
	      if (isArray$1(val[x])) {
	        for (var y = 0; y < val[x].length; y++) {
	          if (isArray$1(val[x][y])) {
	            for (var z = 0; z < val[x][y].length; z++) {
	              if (val[x][y][z] !== 'fluid') {
	                val[x][y][z] = _parseInt$2(val[x][y][z], 10);
	              }
	            }
	          } else if (_parseInt$2(val[x][y], 10) >= 0) {
	            val[x][y] = _parseInt$2(val[x][y], 10);
	          } else if (val[x][y] !== 'fluid') {
	            val[x] = [];
	          }
	        }
	      } else {
	        val[x] = [];
	      }
	    }

	    responsiveMap[i] = val;
	  }

	  _googleApi.executeWhenAvailable('setting slot mappings', function () {
	    _googleApi.defineSlotSizeMapping(_pageSlots[slotId], responsiveMap);
	  });
	}
	/** Slot Manager **/


	function _updateSlot(slot, ignoreCount) {
	  var origSlotId = slot.rktr_slot_id;
	  var newSlotId = origSlotId;
	  var idArray = origSlotId.split('_');
	  var incrementer = idArray[idArray.length - 1];
	  var pageDivs = document.querySelectorAll('div#' + origSlotId);

	  if (pageDivs.length > 1 || pageDivs.length === 1 && ignoreCount) {
	    logger$2.log('updating slot div id.', {
	      slot: slot
	    });

	    while (_pageSlots[newSlotId]) {
	      // slot exists, so increment
	      if (idArray.length === 3) {
	        incrementer = generateCacheBuster();
	      } else {
	        incrementer = _parseInt$2(incrementer, 10) + 1;

	        if (incrementer < 10) {
	          incrementer = '0' + String(incrementer);
	        } else {
	          incrementer = String(incrementer);
	        }
	      }

	      idArray[idArray.length - 1] = incrementer;
	      newSlotId = idArray.join('_');
	    }

	    _updateSlotId(slot, newSlotId, origSlotId);

	    _updateDivId(origSlotId, newSlotId);
	  }

	  return slot;
	}
	/** Slot Manager **/


	function _updateSlotId(slot, newSlotId, origSlotId) {
	  slot.rktr_slot_id = newSlotId;

	  try {
	    var SlotIDChangeEvent = new CustomEvent('SlotIdChange', {
	      detail: {
	        asset: slot,
	        originalId: origSlotId,
	        newId: newSlotId
	      }
	    });
	    document.dispatchEvent(SlotIDChangeEvent);
	  } catch (ex) {
	    logger$2.error('error dispatching custom Event: SlotIdChange', {
	      error: ex
	    });
	  }
	}
	/** Slot Manager **/


	function _updateDivId(origSlotId, newSlotId) {
	  var pageDivs = document.querySelectorAll('div#' + origSlotId);

	  if (pageDivs.length > 0) {
	    for (var slotIndex = 0; slotIndex < pageDivs.length; slotIndex++) {
	      var el = pageDivs[slotIndex];

	      if (el.className.indexOf('adfuel-rendered') < 0 && pageDivs.length > 1 || pageDivs.length === 1) {
	        el.id = newSlotId;
	      }
	    }
	  }
	}
	/** Request Manager **/


	function _isQueueDispatchable() {
	  logger$2.log('Is Queue Dispatchable: ', {
	    initialized: _initialized,
	    activePreQueue: _preQueueExecuting
	  });
	  return _initialized && _preQueueExecuting.length === 0;
	}
	/** Request Manager **/
	// executed from init and ready, queue is only dispatchable once


	function _dispatchAllQueues() {
	  if (_isQueueDispatchable()) {
	    if (_delayedDispatchQueues.length > 0 || _userDispatchedQueues.length > 0) {
	      logger$2.log('Processing delayed dispatch queues'); // process all delayed dispatch queue functions

	      var i;

	      for (i = 0; i < _delayedDispatchQueues.length; i++) {
	        _delayedDispatchQueues[i]();
	      }

	      for (i = 0; i < _userDispatchedQueues.length; i++) {
	        _userDispatchedQueues[i]();
	      }

	      _delayedDispatchQueues.length = 0;
	      _userDispatchedQueues.length = 0;
	      dispatchQueue();
	    } else if (_options.autoDispatch) {
	      logger$2.log('Processing all queues'); // dispatch whatever has been queued

	      dispatchQueue();
	    }
	  } else {
	    _delayingDispatch = true;
	  }
	}
	/** Request Manager **/


	function dispatchQueue(dispatchOptions) {
	  /*
	            dispatchOptions:
	            preDispatchCallback
	            postDispatchCallback
	            ignoreCheck: false
	            sync: false
	            syncSlots: []
	            slots: []
	            exclude: []
	            maintainCorrelator: true
	            */
	  if (!_isQueueDispatchable()) {
	    perf.mark('Delaying Queue Dispatch');
	    logger$2.log('Delaying Queue Dispatch');
	    _delayingDispatch = true;

	    _delayedDispatchQueues.push(function () {
	      dispatchQueue(dispatchOptions);
	    });

	    return;
	  }

	  perf.mark('Dispatch Queue Start');
	  var dispatchOpts = dispatchOptions || {
	    sync: false,
	    maintainCorrelator: true
	  };

	  if (dispatchOpts.slots && dispatchOpts.slots.length > 0) {
	    for (var slotIndex = 0; slotIndex < dispatchOpts.slots.length; slotIndex++) {
	      if (_excludedSlotIds.indexOf(dispatchOpts.slots[slotIndex]) >= 0) {
	        _excludedSlotIds.splice(_excludedSlotIds.indexOf(dispatchOpts.slots[slotIndex]), 1);
	      }
	    }
	  }

	  if (_rocketeerSlots.length > 0) {
	    // display all slots or just the ones in requestOptions.slots
	    // exclude any in requestOptions.exclude
	    // if requestOptions.slots are not provided, ensure rocketeer slot is not in _excludeSlotIds (set via QueueRegistery/options.exclude)
	    // remove excluded slot ids if explicitly requested
	    if (dispatchOpts.slots && dispatchOpts.slots.length > 0 && _excludedSlotIds.length > 0) {
	      for (var i = 0; i < dispatchOpts.slots.length; i++) {
	        var indexToRemove = _excludedSlotIds.indexOf(dispatchOpts.slots[i]);

	        if (indexToRemove >= 0) {
	          _excludedSlotIds.splice(indexToRemove, 1);
	        }
	      }
	    }

	    logger$2.log('Built Slots: ', _builtSlots);

	    if (_builtSlots.length > 0) {
	      // wait on all registered modules- passing clone of slotQueue
	      var builtSlotsClone = _builtSlots;
	      builtSlotsClone = builtSlotsClone.filter(function (slot) {
	        var filter = typeof slot.dispatched === 'undefined' || slot.dispatched === false;
	        return filter;
	      });
	      var builtSlotIds = [];

	      for (var slotId = 0; slotId < builtSlotsClone.length; slotId++) {
	        var slot = builtSlotsClone[slotId];
	        slot.dispatched = true;
	        _builtSlots[slotId] = slot;
	        builtSlotIds.push(slot.rktr_slot_id);
	      }

	      if (builtSlotIds.length > 0) {
	        executeModuleCallbacks('preDispatchCallback', builtSlotsClone, builtSlotsClone, dispatchOptions).then(function () {
	          try {
	            var PreDispatchCompleteEvent = new CustomEvent('PreDispatchComplete', {
	              detail: {
	                slots: _rocketeerSlots.length
	              }
	            });
	            document.dispatchEvent(PreDispatchCompleteEvent);
	          } catch (ex) {
	            logger$2.error('error dispatching custom Event: PreDispatchComplete', {
	              error: ex
	            });
	          }

	          _buildPageLevelGPTObject();

	          logger$2.log('preDispatchCallback events completed.  Sending request.');

	          _sendRequest(builtSlotsClone, dispatchOptions).then(function (displayedSlots) {
	            perf.mark('Dispatch Queue End');
	            perf.measure('Dispatch Queue', 'Dispatch Queue Start', 'Dispatch Queue End');
	            logger$2.log('Displayed Slots: ', displayedSlots);

	            for (var index = 0; index < _queuedSlots.length; index++) {
	              var slot = _queuedSlots[index];

	              if (builtSlotIds.indexOf(slot.rktr_slot_id) >= 0) {
	                _queuedSlots.splice(index, 1);

	                index--;
	              }
	            }
	          });
	        });
	      } else {
	        logger$2.log('No undispatched slots.');
	      }
	    }
	  }
	}
	/** Registry Manager **/


	var loadJSON = function _loadJSON(url, callback) {
	  perf.mark('Registry Load [' + url + '] Start');
	  var parser = document.createElement('a');
	  parser.href = url;
	  var pathname = parser.pathname.replace(/(\.min)?(\.js)$/, '.json');
	  var jsonURL = parser.protocol + '//' + cdnRoot() + (pathname.indexOf('/') === 0 ? pathname : '/' + pathname);
	  var req = new XMLHttpRequest();

	  req.onload = function () {
	    var data;

	    try {
	      var registry = JSON.parse(this.response).registry;
	      logger$2.log('JSON Parse Complete: ', registry);
	      perf.mark('Registry Load [' + url + '] End');
	      perf.measure('Registry Load [' + url + ']', 'Registry Load [' + url + '] Start', 'Registry Load [' + url + '] End');
	      data = {
	        response: registry,
	        error: false
	      };
	      callback(data);
	    } catch (err) {
	      logger$2.log('JSON Parse Failed: ', err);
	      data = {
	        response: this.response,
	        error: true
	      };
	      callback(data);
	    }
	  };

	  try {
	    logger$2.log('Requesting JSON: ', jsonURL);
	    req.open('GET', jsonURL, true);
	    req.send();
	  } catch (err) {
	    logger$2.log('JSON Request Failed: ', err);
	    var data = {
	      response: this.response,
	      error: true
	    };
	    callback(data);
	  }
	};
	/** Registry Manager **/


	function queueRegistry(url, queueOptions) {
	  /*
	             queueOptions:
	            preDispatchCallback
	            postDispatchCallback
	            sync: false
	            exclude: []
	            syncSlots: []
	            slots: []
	            maintainCorrelator: true
	            dispatch: false  (options.autodispatch is ignored)
	            slotMap: {}
	     */
	  getFilterValue().then(function (shouldFilter) {
	    logger$2.log('Queueing Registry: ', url, queueOptions, _options);

	    if (!url) {
	      logger$2.error('Empty Registry url');
	      return;
	    }

	    var queueOpts = queueOptions || {
	      // set based on autoDispatch
	      dispatch: _options.autoDispatch
	    };

	    if (queueOpts.exclude && queueOpts.exclude.length > 0) {
	      // add non-duplicating exclude slotIds
	      for (var i = 0; i < queueOpts.exclude.length; i++) {
	        var slotId = queueOpts.exclude[i];

	        if (_excludedSlotIds.indexOf(slotId) < 0) {
	          logger$2.log('Excluding Slot: ', slotId);

	          _excludedSlotIds.push(slotId);
	        }
	      }
	    }

	    function addScriptTag(urlParam) {
	      var scriptA = document;
	      var scriptB = scriptA.createElement('script');
	      var scriptC = scriptA.getElementsByTagName('script')[0];
	      var scriptD = /^(complete|loaded)$/;
	      var scriptE = false;
	      scriptB.type = 'text/javascript';
	      scriptB.src = urlParam;

	      scriptB.onload = scriptB.onreadystatechange = function () {
	        if (!scriptE && !('readyState' in scriptB && scriptD.test(scriptB.readyState))) {
	          scriptB.onload = scriptB.onreadystatechange = null;
	          scriptE = true;
	          scriptComplete();
	        }
	      };

	      scriptC.parentNode.insertBefore(scriptB, scriptC);
	    }

	    function scriptComplete() {
	      perf.mark('Registry Load [' + url + '] End');
	      perf.measure('Registry Load [' + url + ']', 'Registry Load [' + url + '] Start', 'Registry Load [' + url + '] End');

	      if (queueOpts.dispatch) {
	        dispatchQueue(queueOpts);
	      }
	    }

	    function filterSlots(registry, slots) {
	      var returnData = [];
	      returnData.push(registry[0]);

	      if (slots && slots.length > 0) {
	        for (var x = 1; x < registry.length; x++) {
	          if (slots.indexOf(registry[x].rktr_slot_id) >= 0) {
	            returnData.push(registry[x]);
	          }
	        }
	      } else {
	        returnData = registry;
	      }

	      return returnData;
	    }

	    var normalizedUrl = normalizeUrl(url);

	    function requestComplete(data) {
	      if (data.error === true) {
	        logger$2.log('Using Script Tag Method...');
	        addScriptTag(url);
	      } else {
	        var filteredResponse = filterSlots(data.response, queueOpts.slots);
	        logger$2.log('Response: ', data.response);
	        _cachedRegistries[normalizedUrl] = data.response;
	        AdFuel.registry.push(filteredResponse, queueOpts);
	      }
	    }

	    if (_cachedRegistries[normalizedUrl]) {
	      logger$2.log('Queueing Cached Registry: ', _cachedRegistries[normalizedUrl], queueOpts);
	      var filteredResponse = filterSlots(_cachedRegistries[normalizedUrl], queueOpts.slots);
	      AdFuel.registry.push(filteredResponse, queueOpts);
	    } else {
	      logger$2.log('Requesting Registry: ', normalizedUrl, queueOpts);
	      loadJSON(url, requestComplete);
	    }
	  });
	}
	/** Utils **/


	function _startInterval(length, steps, oninterval) {
	  var stepsClone = steps || 10;
	  var speed = length / stepsClone;
	  var count = 0;

	  var start = now$1();

	  function instance() {
	    if (count++ === stepsClone) {
	      // return true to continue repeating
	      var continueInterval = oninterval();

	      if (continueInterval) {
	        _startInterval(length, stepsClone, oninterval);
	      }
	    } else {
	      // wait longer, basing delay upon remaining time
	      var diff = now$1() - start - count * speed;
	      window.setTimeout(instance, speed - diff);
	    }
	  }

	  window.setTimeout(instance, speed);
	}
	/** Slot Manager **/


	function refresh(slotIds, refreshOptions) {
	  /***
	    slotIds: optional array to refresh (empty/null=refresh all)
	     refreshOptions:
	      pageload: BOOLEAN (default is true)
	      interval: INT
	      preRefreshCallback: function (optional)
	      postRefreshCallback: function (optional)
	      maintainCorrelator: BOOLEAN (default is true)
	  ***/
	  perf.mark('Refresh Called');
	  var refreshOpts = refreshOptions || {};
	  var slotIdsClone = slotIds || [];

	  if (slotIds && !isArray$1(slotIds) && !refreshOptions) {
	    // assume user passed refreshOptions as first argument
	    refreshOpts = slotIds;
	    slotIdsClone = [];
	  }

	  var monetization;
	  var monetizedAssets = [];

	  var rocketeerSlotsToRefresh = _rocketeerSlots.filter(function (slot) {
	    if (slotIdsClone.length === 0) {
	      monetization = isMonetized(slot);

	      if (slot.rktr_slot_id !== 'page' && monetization.isMonetized) {
	        slot.monetization = monetization;
	        monetizedAssets.push(slot);
	      }

	      return true;
	    }

	    if (slotIds.length > 0 && slotIds.indexOf(slot.rktr_slot_id) >= 0) {
	      monetization = isMonetized(slot);

	      if (slot.rktr_slot_id !== 'page' && monetization.isMonetized) {
	        slot.monetization = monetization;
	        monetizedAssets.push(slot);
	      }

	      return true;
	    }

	    return false;
	  });

	  logger$2.log('Monetized Assets: ', monetizedAssets);
	  logger$2.log(''); // default pageload to true

	  refreshOpts.interval = refreshOpts.interval || 0;
	  refreshOpts.pageload = typeof refreshOpts.pageload === 'undefined' ? true : refreshOpts.pageload;
	  refreshOpts.maintainCorrelator = typeof refreshOpts.maintainCorrelator === 'undefined' ? true : refreshOpts.maintainCorrelator;

	  var refreshSlots = function refreshSlots(monetizedAssets, rocketeerSlotsToRefresh) {
	    {
	      var slotsToRefresh = [];
	      var slotIdsToRefresh = [];
	      var slotIdsToCheck = [];

	      if (slotIdsClone.length === 0) {
	        // refresh all- build list allowing for repeated iterations via interval option
	        keys$1(_pageSlots).forEach(function (slotId) {
	          slotIdsToCheck.push(slotId);
	        });
	      } else {
	        slotIdsToCheck = slotIdsClone;
	      }

	      for (var i = 0; i < slotIdsToCheck.length; i++) {
	        var slotIdVal = slotIdsToCheck[i];

	        if (document.getElementById(slotIdVal)) {
	          var slot = _pageSlots[slotIdVal];

	          if (slot) {
	            slotsToRefresh.push(slot);
	            slotIdsToRefresh.push(slotIdVal);
	          }
	        } else {
	          logger$2.log('Cannot find element on page to refresh: ' + slotIdVal);
	        }
	      }

	      if (slotIdsClone.length > 0 && slotIdsToRefresh.length === 0) {
	        // caller sent all invalid slotIds to refresh, so do nothing
	        return;
	      }

	      logger$2.log('Callback Parameters: ', {
	        name: 'preRefreshCallback',
	        monetization: monetizedAssets,
	        slots: rocketeerSlotsToRefresh,
	        options: refreshOpts
	      });
	      executeModuleCallbacks('preRefreshCallback', monetizedAssets, rocketeerSlotsToRefresh, refreshOpts).then(function () {
	        try {
	          var PreRefreshCompleteEvent = new CustomEvent('PreRefreshComplete', {
	            detail: {
	              slots: slotIdsToRefresh
	            }
	          });
	          document.dispatchEvent(PreRefreshCompleteEvent);
	        } catch (ex) {
	          logger$2.error('error dispatching custom Event: PreRefreshComplete', {
	            error: ex
	          });
	        }

	        clearSlots(slotIdsToRefresh);

	        if (refreshOpts.pageload) {
	          _googleApi.setTargeting('pageload', 'ref');
	        } else {
	          _googleApi.clearTargeting('pageload');
	        }

	        _googleApi.refreshSlots(slotsToRefresh, refreshOpts);
	      });
	    }
	  };

	  function startInterval(interval) {
	    logger$2.log('starting refresh interval: ' + interval, refreshOptions);
	    var intervalInMilliseconds = interval * 1000;

	    _startInterval(intervalInMilliseconds, 5, function () {
	      // if the interval has been removed, stop repeating
	      if (!refreshOptions.interval || _parseInt$2(refreshOptions.interval, 10) === 0) {
	        logger$2.log('stopping refresh interval: ' + interval, refreshOptions);
	        return false;
	      } // if the interval has changed, start new interval and stop repeating


	      var currentInterval = _parseInt$2(refreshOptions.interval, 10);

	      if (interval !== currentInterval) {
	        logger$2.log('changing refresh interval: ' + interval, refreshOptions);
	        startInterval(currentInterval);
	        return false;
	      } // interval has been reached, so refresh spots


	      refreshSlots(monetizedAssets, rocketeerSlotsToRefresh); // repeat interval

	      return true;
	    });
	  }

	  if (refreshOpts.interval && _parseInt$2(refreshOpts.interval, 10) > 0) {
	    var interval = _parseInt$2(refreshOptions.interval, 10);

	    startInterval(interval);
	  } else {
	    refreshSlots(monetizedAssets, rocketeerSlotsToRefresh);
	  }
	}
	/** Request Manager **/


	function _sendRequest(rocketeerSlots, requestOptions) {
	  /*
	            rOptions: {
	            sync: false,
	            syncSlots: [],
	            maintainCorrelator: true
	            };
	            */
	  return new promise$1(function (resolve) {
	    perf.mark('Sending Request Start');

	    _googleApi.configurePubAds().then(function () {
	      logger$2.log('pubads configured...');
	      var requestOpts = requestOptions || {
	        sync: false,
	        syncSlots: [],
	        maintainCorrelator: true
	      };
	      var displayedSlots = [];

	      var displaySlot = function displaySlot(slotId) {
	        _googleApi.executeWhenAvailable('displaying slot', function () {
	          logger$2.log('Displaying Slot: ' + slotId);

	          _googleApi.displaySlotById(slotId);
	        });
	      };

	      logger$2.log('Dispatching Slots: ', rocketeerSlots);

	      for (var i = 0; i < rocketeerSlots.length; i++) {
	        var slotId = rocketeerSlots[i].rktr_slot_id;

	        if (!document.getElementById(slotId)) {
	          logger$2.log("Can't Find Slot On Page", slotId);
	        } else {
	          // solve closure issue with slotId
	          if (_excludedSlotIds.indexOf(slotId) < 0 && !rocketeerSlots[i].displayed && _dispatchedSlots.indexOf(rocketeerSlots[i]) < 0) {
	            displaySlot(slotId);
	            rocketeerSlots[i].displayed = true;
	            displayedSlots.push(rocketeerSlots[i]);

	            _dispatchedSlots.push(rocketeerSlots[i]);
	          } else {
	            logger$2.log('Slot is excluded or already displayed. Not displaying: ', slotId);
	          }
	        }
	      }

	      if (!getURLParam('enableInitialLoad')) {
	        var displayedSlotIds = displayedSlots.map(function (displayedSlot) {
	          return displayedSlot.rktr_slot_id;
	        });

	        _googleApi.executeWhenAvailable('refreshing slots', function () {
	          // all displayed slots must be refreshed to have their ad populated
	          // when syncing also include requestOptions.syncSlots
	          var slotsToRefresh = [];

	          keys$1(_pageSlots).forEach(function (slotDivId) {
	            // keep all slots or the ones matching requestOpts.syncSlots or the ones matching displayedSlotIds
	            logger$2.log('Checking Slot for Sync: ' + slotDivId);

	            if (requestOpts.sync && (!requestOpts.syncSlots || requestOpts.syncSlots.length === 0 || requestOpts.syncSlots.indexOf(slotDivId) >= 0) || displayedSlotIds.indexOf(slotDivId) >= 0) {
	              logger$2.log('Syncing Slot With Request: ' + slotDivId);
	              slotsToRefresh.push(_pageSlots[slotDivId]);
	            }
	          });

	          logger$2.log('Slots To Refresh: ', slotsToRefresh.map(function (slot) {
	            return slot ? slot.getSlotElementId() : 'NO ID';
	          }));

	          _googleApi.refreshSlots(slotsToRefresh);

	          perf.mark('Sending Request End');
	          perf.measure('Sending Request', 'Sending Request Start', 'Sending Request End');
	        });

	        requestOpts.maintainCorrelator = requestOpts.maintainCorrelator || true;
	        logger$2.log({
	          maintainCorrelator: requestOpts.maintainCorrelator
	        });
	      }

	      try {
	        var requestCompleteEvent = new CustomEvent('AdFuelRequestComplete', {
	          detail: {
	            slots: JSON.parse(stringify$1(displayedSlots)),
	            options: requestOptions
	          }
	        });
	        perf.mark('AdFuel Request Complete');
	        document.dispatchEvent(requestCompleteEvent);
	      } catch (ex) {
	        logger$2.error('error dispatching custom Event: AdFuelRequestComplete', {
	          error: ex
	        });
	      }

	      resolve(displayedSlots);
	    });
	  });
	}
	/** Targeting Manager **/


	function setBulkTargeting(targeting) {
	  if (targeting) {
	    keys$1(targeting).forEach(function (key) {
	      if (key === 'slotTargets') {
	        keys$1(targeting[key]).forEach(function (key2) {
	          var targetGroup = targeting[key][key2];

	          keys$1(targetGroup).forEach(function (key3) {
	            AdFuel.addSlotLevelTarget(key2, key3, targeting[key][key2][key3]);
	          });
	        });
	      } else if (key === 'adTargets') {
	        keys$1(targeting[key]).forEach(function (key4) {
	          AdFuel.addPageLevelTarget(key4, targeting[key][key4]);
	        });
	      } else {
	        // For backwards compatibility
	        AdFuel.addPageLevelTarget(key, targeting[key]);
	      }
	    });
	  }
	}
	/** Slot Manager **/


	function _removeLeadingNumericNetworkId(adunit) {
	  // remove leading numeric networkId (ex:  8663477/CNN/Homepage)
	  var adUnitClone = adunit;

	  if (adUnitClone && adUnitClone.indexOf('/') >= 0) {
	    var nId = adUnitClone.split('/')[0];

	    if (_parseInt$2(nId, 10) > 0) {
	      var adUnitArray = adUnitClone.split('/');
	      adUnitArray.splice(0, 1);
	      adUnitClone = adUnitArray.join('/');
	    }
	  }

	  return adUnitClone;
	}
	/** Event Manager **/


	function _addDebugListeners() {
	  addEvent(document, 'AdFuelRequestComplete', function (e) {
	    logger$2.log('AdFuel Request Complete', {
	      requestEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'GPTRenderComplete', function (e) {
	    logger$2.log('GPT Render Complete', {
	      renderEvent: e,
	      timestamp: new Date().toLocaleTimeString(),
	      slot: e.detail.asset ? e.detail.asset.getSlotElementId() : 'NO ID'
	    });
	  });
	  addEvent(document, 'SlotIdChange', function (e) {
	    logger$2.log('Slot ID Change', {
	      idChangeEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'SlotVisibilityChanged', function (e) {
	    logger$2.log('Slot Visibility Changed', {
	      visibilityChangedEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'SlotViewable', function (e) {
	    logger$2.log('Slot Viewable', {
	      viewableEvent: e,
	      timestamp: new Date().toLocaleTimeString(),
	      slot: e.detail.slot ? e.detail.slot.getSlotElementId() : 'NO ID'
	    });
	  });
	  addEvent(document, 'GPTSlotLoaded', function (e) {
	    logger$2.log('Slot Loaded', {
	      slotOnLoadEvent: e,
	      timestamp: new Date().toLocaleTimeString(),
	      slot: e.detail.slot ? e.detail.slot.getSlotElementId() : 'NO ID'
	    });
	  });
	  addEvent(document, 'PreQueueComplete', function (e) {
	    logger$2.log('PreQueueComplete', {
	      preQueueCompleteEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'PostQueueComplete', function (e) {
	    logger$2.log('PostQueueComplete', {
	      postQueueCompleteEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'PreDispatchComplete', function (e) {
	    logger$2.log('PreDispatchComplete', {
	      preDispatchCompleteEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'PostDispatchComplete', function (e) {
	    logger$2.log('PostDispatchComplete', {
	      postDispatchCompleteEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'PreRefreshComplete', function (e) {
	    logger$2.log('PreRefreshComplete', {
	      preRefreshCompleteEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	  addEvent(document, 'PostRefreshComplete', function (e) {
	    logger$2.log('PostRefreshComplete', {
	      postRefreshCompleteEvent: e,
	      timestamp: new Date().toLocaleTimeString()
	    });
	  });
	}
	/** Utils **/


	function getFilterValue() {
	  return new promise$1(function (resolve) {
	    setTimeout(function () {
	      if (_blocked !== null) {
	        var consentRegion = getUserConsentRegion();
	        var consentStatus = getConsent(consentTags);
	        UserConsentLogger ? UserConsentLogger.log("Consent already determined.  Region: ".concat(consentRegion, "  Status: ").concat(consentStatus)) : console.log("Consent already determined. Region: ".concat(consentRegion, " Status: ").concat(consentStatus));
	      } else {
	        _blocked = _isRegistryQueueable();
	      }

	      resolve(_blocked);
	    }, 1);
	  });
	}
	/** Event Manager **/


	function receiveMessage(event) {
	  var currentLocation = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port;

	  if (event.origin !== currentLocation) ; else {
	    try {
	      var payload = JSON.parse(event.data);

	      if (payload.action === 'getDivHeight') {
	        logger$2.log('Event Payload: ', payload);
	        var div = document.getElementById(payload.id);
	        var computedHeight = window.getComputedStyle(div, null).getPropertyValue('height');
	        var result = {
	          id: payload.id,
	          client: div.clientHeight,
	          offset: div.offsetHeight,
	          scroll: div.scrollHeight,
	          height: computedHeight
	        };
	        logger$2.log('Event Response: ', result);
	        event.source.postMessage(stringify$1({
	          source: 'adfuel',
	          action: 'returnDivHeight',
	          value: result
	        }));
	      }
	    } catch (err) {}
	  }
	}
	/** Utils **/


	function checkForUserConsent(opts) {
	  if (opts.USER_CONSENT && opts.USER_CONSENT.ENABLED && (!window.WM || !window.WM.UserConsent)) {
	    UserConsentLogger.log('UserConsent is ENABLED but not present.');
	  } else if (window.WM && window.WM.UserConsent) {
	    UserConsentLogger.log('UserConsent is already present.');
	  } else {
	    UserConsentLogger.log('UserConsent is not enabled.');
	  }
	}
	/** Keep Here **/


	function init$1(opts) {
	  // only occur once
	  siteOptions = opts;
	  _options = {
	    autoDispatch: siteOptions.ADFUEL.AUTO_DISPATCH,
	    defaultTimeout: IsMobile.any ? siteOptions.ADFUEL.DEFAULT_MOBILE_TIMEOUT || siteOptions.ADFUEL.DEFAULT_TIMEOUT : siteOptions.ADFUEL.DEFAULT_DESKTOP_TIMEOUT || siteOptions.ADFUEL.DEFAULT_TIMEOUT,
	    exclude: [],
	    siteObject: siteOptions.ADFUEL.SITE_OBJECT,
	    iframeTitle: siteOptions.ADFUEL.IFRAME_TITLE,
	    networkId: siteOptions.ADFUEL.NETWORK_ID,
	    refreshOnFocusOnly: siteOptions.ADFUEL.REFRESH_ON_FOCUS_ONLY
	  };

	  if (!_initialized) {
	    logger$2 = getLogger(NAME$1, VERSION, 'adfuel', 'color: #4f86f7; padding: 2px', siteOptions && siteOptions.ADFUEL && siteOptions.ADFUEL.DEBUG || false);
	    UserConsentLogger = getLogger(' User Consent', '', 'consent', 'color: coral; padding: 2px', siteOptions && siteOptions.USER_CONSENT && siteOptions.USER_CONSENT.DEBUG || false);
	    setHostAndPathNames();
	    setIsIntl();

	    if (window.WM && window.WM.UserConsent && window.WM.UserConsent.getRegion() === 'gdpr' && window.WM.UserConsent.getUserConsentAdvertisingState()) {
	      initGoogleTag();
	    }

	    checkForUserConsent(opts);
	    getFilterValue().then(function (shouldFilter) {
	      if (!shouldFilter) {
	        _initialized = true;
	        perf.mark('AdFuel Initialized');
	        window.addEventListener('message', receiveMessage, false);
	        if (getURLParam('debug')) _addDebugListeners();

	        _setSlotRenderedClass();

	        logger$2.log('Checking for AdsQA...');

	        _checkForAdsQA();

	        logger$2.log('Binding dispatch to DOMContentLoaded and window.load...');

	        _bindReady();

	        _googleApi.executeWhenAvailable('set ad iframe title', _setAdIFrameTitle);

	        setTimeout(function () {
	          _queueDelayedRegistries();

	          _dispatchAllQueues();
	        }, 500);

	        try {
	          // trigger AdFuelCreated event, so pre-loaded modules can register
	          var adFuelCreatedWithConsentEvent = new CustomEvent('AdFuelCreated', {
	            detail: {
	              AdFuel: AdFuel
	            }
	          });
	          document.dispatchEvent(adFuelCreatedWithConsentEvent);
	        } catch (ex) {
	          logger$2.error('error dispatching custom Event: AdFuelCreated', {
	            error: ex
	          });
	        }
	      } else {
	        _dispatchAllQueues();

	        try {
	          // trigger AdFuelCreated event, so pre-loaded modules can register
	          var adFuelCreatedEvent = new CustomEvent('AdFuelCreated', {
	            detail: {
	              AdFuel: AdFuel
	            }
	          });
	          document.dispatchEvent(adFuelCreatedEvent);
	        } catch (ex) {
	          logger$2.error('error dispatching custom Event: AdFuelCreated', {
	            error: ex
	          });
	        }
	      }
	    });
	  }
	}
	/** Slot Manager **/


	function getQueuedSlots() {
	  return _queuedSlots;
	}
	/** Slot Manager **/


	function getSlotDetails(slotId) {
	  var matchingRocketeerSlot;

	  for (var i = 0; i < AdFuel.registry.length; i++) {
	    var reg = AdFuel.registry[i];

	    for (var j = 1; j < reg.length; j++) {
	      var rocketeerSlot = reg[j];

	      if (rocketeerSlot.rktr_slot_id === slotId) {
	        matchingRocketeerSlot = assign$1({}, rocketeerSlot);
	      }
	    }
	  }

	  var adUnitPath;
	  var slotTargeting = {};
	  var slot = _pageSlots[slotId];

	  if (slot) {
	    // get adUnit
	    adUnitPath = slot.getAdUnitPath(); // get targeting keys

	    var currentTargetingKeys = slot.getTargetingKeys();

	    keys$1(currentTargetingKeys).forEach(function (keyId) {
	      var keyName = currentTargetingKeys[keyId];
	      slotTargeting[keyName] = slot.getTargeting(keyName);
	    });
	  }

	  return {
	    adUnit: adUnitPath,
	    slot: matchingRocketeerSlot,
	    slotTargeting: slotTargeting
	  };
	}
	/** Module Manager **/


	function registerModule(name, callbacks, version, options, monetizedOnly) {
	  getFilterValue().then(function (shouldFilter) {
	    if (shouldFilter) {
	      logger$2.log('User Consent Not Granted or Not Found. Not Registering Module.');
	    } else {
	      logger$2.log('Registering Module: ' + name + ' ' + version);
	      perf.mark('Registering Module: ' + name + ' ' + version);
	      var index = -1;

	      for (var i = 0; i < _registeredModules.length; i++) {
	        if (_registeredModules[i].name === name) {
	          index = i;
	        }
	      }

	      monetizedOnly = monetizedOnly || false;
	      version = version || 'Unspecified';
	      options = options || {};

	      if (callbacks.init) {
	        callbacks.init().then(function () {
	          if (index >= 0) {
	            // replace callbacks
	            _registeredModules[index] = {
	              name: name,
	              version: version,
	              callbacks: callbacks,
	              options: options,
	              monetized: monetizedOnly
	            };
	          } else {
	            // add module
	            _registeredModules.push({
	              name: name,
	              version: version,
	              callbacks: callbacks,
	              options: options,
	              monetized: monetizedOnly
	            });
	          }
	        });
	      } else {
	        if (index >= 0) {
	          // replace callbacks
	          _registeredModules[index] = {
	            name: name,
	            version: version,
	            callbacks: callbacks,
	            options: options,
	            monetized: monetizedOnly
	          };
	        } else {
	          // add module
	          _registeredModules.push({
	            name: name,
	            version: version,
	            callbacks: callbacks,
	            options: options,
	            monetized: monetizedOnly
	          });
	        }
	      }
	    }
	  });
	}
	/** Module Manager **/


	function unregisterModule(name) {
	  // remove module, if it's found
	  var indexToRemove = -1;

	  for (var i = 0; i < _registeredModules.length; i++) {
	    if (_registeredModules[i].name === name) {
	      indexToRemove = i;
	    }
	  }

	  if (indexToRemove >= 0) {
	    _registeredModules.splice(indexToRemove, 1);
	  }
	}
	/** GoogleAPI **/


	var _googleApi = function createGoogleAPI() {
	  var _pubAdsConfiged = false;
	  var _isGPTAvailable = false;

	  function isAvailable(action, obj) {
	    if (!_isGPTAvailable) {
	      _isGPTAvailable = window.googletag.apiReady && typeof window.googletag.pubads === 'function';

	      if (!_isGPTAvailable && action) {
	        logger$2.error('GPT is unavailable - ' + action, obj);
	      }
	    }

	    return _isGPTAvailable;
	  }

	  function executeWhenAvailable(action, fn) {
	    window.googletag.cmd.push(fn);
	  }

	  function configurePubAds() {
	    return new promise$1(function (resolve) {
	      if (!_pubAdsConfiged) {
	        // only execute once
	        _pubAdsConfiged = true;
	        window.googletag.cmd.push(function pushGPTServices() {
	          window.googletag.pubads().addEventListener('impressionViewable', function _impressionViewableFunc(event) {
	            perf.mark('Slot Viewable [' + (event.slot ? event.slot.getSlotElementId() : 'NO ID') + ']');
	            var slotViewableEvent = new CustomEvent('SlotViewable', {
	              detail: event
	            });
	            document.dispatchEvent(slotViewableEvent);
	          });
	          window.googletag.pubads().addEventListener('slotVisibilityChanged', function (event) {
	            var slotVisibilityChanged = new CustomEvent('SlotVisibilityChanged', {
	              detail: event.detail
	            });
	            document.dispatchEvent(slotVisibilityChanged);
	          });
	          window.googletag.pubads().addEventListener('slotRenderEnded', function (event) {
	            perf.mark('Ad Rendered [' + (event.slot ? event.slot.getSlotElementId() : 'NO ID') + ']');

	            try {
	              var detail = {};
	              detail.asset = event.slot || null;
	              detail.pos = event.slot ? event.slot.getTargeting('pos') : [''];
	              detail.empty = !!event.isEmpty;
	              detail.renderedSize = event.size ? event.size : '0x0';
	              detail.creativeId = event.creativeId ? event.creativeId : '0';
	              detail.lineItemId = event.lineItemId ? event.lineItemId : '0';
	              detail.serviceName = event.serviceName ? event.serviceName : '';
	              detail.divId = event.slot ? event.slot.getSlotElementId() : 'NO ID';

	              if (detail.empty && siteOptions.ADFUEL.COLLAPSE_EMPTY_DIVS === false) {
	                logger$2.log('Collapsing Empty Div...', detail.divId);
	                var el = document.getElementById(detail.divId);
	                el.style.display = 'none';
	              }

	              var creativeIds = window.googletag && typeof window.googletag.pubads === 'function' ? window.googletag.pubads().getTargeting('creativeId') : [];
	              var lineItemIds = window.googletag && typeof window.googletag.pubads === 'function' ? window.googletag.pubads().getTargeting('lineItemId') : [];

	              if (event.creativeId && creativeIds.indexOf(event.creativeId) < 0) {
	                creativeIds.push(event.creativeId);
	              }

	              if (event.lineItemId && lineItemIds.indexOf(event.lineItemId) < 0) {
	                lineItemIds.push(event.lineItemId);
	              }

	              window.googletag.cmd.push(function () {
	                window.googletag.pubads().setTargeting('creativeId', creativeIds);
	                window.googletag.pubads().setTargeting('lineItemId', lineItemIds);
	              });
	              performance.slotDetails[detail.divId] = detail;
	              var renderCompleteEvent = new CustomEvent('GPTRenderComplete', {
	                detail: detail
	              });
	              document.dispatchEvent(renderCompleteEvent);
	            } catch (ex) {
	              logger$2.error('error dispatching custom Event: GPTRenderComplete', {
	                error: ex
	              });
	            }
	          });
	          window.googletag.pubads().addEventListener('slotOnload', function (event) {
	            perf.mark('Slot Loaded [' + (event.slot ? event.slot.getSlotElementId() : 'NO ID') + ']');
	            var gptSlotLoaded = new CustomEvent('GPTSlotLoaded', {
	              detail: event
	            });
	            document.dispatchEvent(gptSlotLoaded);
	          });
	          logger$2.log("Enabling 'Collapse Empty Divs'");
	          window.googletag.pubads().collapseEmptyDivs(true);
	          logger$2.log("Enabling 'Async Rendering'");
	          window.googletag.pubads().enableAsyncRendering();
	          logger$2.log("Enabling 'Single Request'");
	          window.googletag.pubads().enableSingleRequest();

	          if (!getURLParam('enableInitialLoad')) {
	            logger$2.log("Disabling 'Initial Load'");
	            window.googletag.pubads().disableInitialLoad();
	          }

	          var consentRegion = getUserConsentRegion();
	          var consentStatus = getConsent(consentTags);
	          var userConsentKey = 'ucs';
	          var userConsentString = window.WM && window.WM.CDP && window.WM.CDP.getUSPString ? window.WM.CDP.getUSPString() : '';

	          if (consentRegion === 'ccpa') {
	            if (userConsentString) {
	              _googleApi.setTargeting(userConsentKey, userConsentString);
	            }

	            if (!consentStatus) {
	              window.googletag.pubads().setPrivacySettings({
	                restrictDataProcessing: true
	              });
	            }
	          }

	          logger$2.log("Enabling 'Services'");
	          window.googletag.enableServices();
	          resolve();
	        });
	      } else {
	        resolve();
	      }
	    });
	  }

	  function clearTargeting(key) {
	    var success = false;

	    if (isAvailable('clearing target', {
	      key: key || 'all'
	    })) {
	      if (key) {
	        window.googletag.cmd.push(function () {
	          window.googletag.pubads().clearTargeting(key);
	        });
	      } else {
	        window.googletag.cmd.push(function () {
	          window.googletag.pubads().clearTargeting();
	        });
	      }

	      success = true;
	    }

	    return success;
	  }

	  function setTargeting(key, value) {
	    var success = false;

	    if (isAvailable('setting target', {
	      key: key,
	      value: value
	    })) {
	      // this was in refresh() to setTargeting
	      AdFuel.requestScriptText += "googletag.pubads().setTargeting('" + key + "', '" + value + "');\n";
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().setTargeting(key, value);
	      });
	      success = true;
	    }

	    return success;
	  }

	  function setLocation(latitude, longitude) {
	    var success = false;

	    if (isAvailable('setting location', {
	      latitude: latitude,
	      logitude: longitude
	    })) {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().setLocation(latitude, longitude);
	      });
	      success = true;
	    }

	    return success;
	  }

	  function setChildDirectedTreatmentTag(status) {
	    var success = false;

	    if (isAvailable('setting child directed treatment tag: true')) {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().setPrivacySettings({
	          childDirectedTreatment: true,
	          underAgeOfConsent: true
	        });
	      });
	      success = true;
	    }

	    return success;
	  }

	  function setSafeFrameConfig(value) {
	    var success = false;
	    value.sandbox = value.sandbox === true || value.sandbox === 'true';
	    value.allowOverlayExpansion = value.allowOverlayExpansion === true || value.allowOverlayExpansion === 'true';
	    value.allowPushExpansion = value.allowPushExpansion === true || value.allowPushExpansion === 'true';

	    if (value.sandbox !== true) {
	      logger$2.log('Removing invalid sandbox value');
	      delete value.sandbox;
	    }

	    if (isAvailable('setting SafeFrame config tag: ' + value)) {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().setSafeFrameConfig(value);
	      });
	      success = true;
	    }

	    return success;
	  }

	  function setCategoryExclusion(value) {
	    var success = false;

	    if (isAvailable('setting category exclusion: ' + value)) {
	      AdFuel.requestScriptText += "googletag.pubads().setCategoryExclusion('" + value + "');\n";
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().setCategoryExclusion(value);
	      });
	      success = true;
	    }

	    return success;
	  }

	  function defineOutOfPageSlot(adPath, slotId) {
	    var result = false;

	    if (isAvailable('defining out of page slot', {
	      adPath: adPath,
	      slotId: slotId
	    })) {
	      logger$2.log('Building OOP Slot Object', {
	        adPath: adPath,
	        slotId: slotId
	      });
	      AdFuel.requestScriptText += "\n_pageSlots['" + slotId + "'] = googletag.defineOutOfPageSlot('" + adPath + "', '" + slotId + "').addService(googletag.pubads());\n";
	      result = window.googletag.defineOutOfPageSlot(adPath, slotId);

	      if (result) {
	        result.addService(window.googletag.pubads());
	      } else {
	        logger$2.warn('Could not define OOP Slot: ', adPath, slotId);
	      }
	    }

	    return result;
	  }

	  function defineSlot(adPath, sizes, slotId) {
	    var result = false;

	    if (isAvailable('defining standard slot', {
	      adPath: adPath,
	      sizes: sizes,
	      slotId: slotId
	    })) {
	      logger$2.log('Building Standard Slot Object', {
	        adPath: adPath,
	        sizes: sizes,
	        slotId: slotId
	      });
	      AdFuel.requestScriptText += "\n_pageSlots['" + slotId + "'] = googletag.defineSlot('" + adPath + "', " + stringify$1(sizes) + ", '" + slotId + "').addService(googletag.pubads());\n";
	      result = window.googletag.defineSlot(adPath, sizes, slotId);

	      if (result) {
	        result.addService(window.googletag.pubads());
	      } else {
	        logger$2.warn('Could not define Slot: ', adPath, sizes, slotId, result);
	      }
	    }

	    return result;
	  }

	  function setSlotCategoryExclusion(slot, value) {
	    if (slot) {
	      var slotId = slot.getSlotElementId();
	      logger$2.log('Setting Slot Category Exclusion', {
	        slotId: slotId,
	        value: value
	      });
	      AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].setCategoryExclusion('" + value + "');\n";
	      slot.setCategoryExclusion(value);
	    }
	  }

	  function setSlotTargeting(slot, key, value) {
	    if (slot) {
	      var slotId = slot.getSlotElementId();
	      logger$2.log('Setting Slot Targeting', {
	        slotId: slotId,
	        key: key,
	        value: value
	      });
	      AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].setTargeting('" + key + "', '" + value + "');\n";
	      slot.setTargeting(key, value);
	    }
	  }

	  function setSlotSafeFrameConfig(slot, value) {
	    if (slot) {
	      var slotId = slot.getSlotElementId();
	      logger$2.log('Setting Slot SafeFrame config', {
	        slotId: slotId,
	        value: value
	      });
	      AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].setSafeFrameConfig(" + value + ');\n';
	      slot.setSafeFrameConfig(value);
	    }
	  }

	  function defineSlotSizeMapping(slot, responsiveMap) {
	    if (slot) {
	      var slotId = slot.getSlotElementId();
	      logger$2.log('Setting Slot size mapping', {
	        slotId: slotId,
	        responsiveMap: responsiveMap
	      });
	      AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].defineSizeMapping('" + stringify$1(responsiveMap) + "');\n";
	      slot.defineSizeMapping(responsiveMap);
	    }
	  }

	  function displaySlotById(slotId) {
	    AdFuel.requestScriptText += 'googletag.display("' + slotId + '");\n';
	    window.googletag.cmd.push(function () {
	      window.googletag.display(slotId);
	    });
	  }

	  function clearSlotTargeting(slot) {
	    if (slot) {
	      var slotId = slot.getSlotElementId();
	      logger$2.log('Clearing targeting for Slot: ' + slotId);
	      AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].clearTargeting();\n";
	      slot.clearTargeting();
	    }
	  }

	  function clearGPTSlots(slots) {
	    var slotIds = slots.length === 0 ? 'all' : slots.map(function (slot) {
	      return slot ? slot.getSlotElementId() : 'NO ID';
	    }).join(',');
	    AdFuel.requestScriptText += 'googletag.pubads().clear(' + slotIds + ');\n';

	    if (slots.length > 0) {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().clear(slots);
	      });
	    } else {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().clear();
	      });
	    }
	  }

	  function destroyGPTSlots(slots) {
	    var slotIds = slots.length === 0 ? 'all' : slots.map(function (slot) {
	      return slot ? slot.getSlotElementId() : 'NO ID';
	    }).join(',');
	    AdFuel.requestScriptText += 'googletag.pubads().destroySlots(' + slotIds + ');\n';

	    if (slots.length > 0) {
	      window.googletag.cmd.push(function () {
	        window.googletag.destroySlots(slots);
	      });
	    } else {
	      window.googletag.cmd.push(function () {
	        window.googletag.destroySlots();
	      });
	    }
	  }

	  function refreshSlots(slots, options) {
	    var opts = options || {
	      maintainCorrelator: true
	    };
	    var slotIds = slots.length === 0 ? 'all' : slots.map(function (slot) {
	      return slot ? slot.getSlotElementId() : 'NO ID';
	    }).join(',');
	    AdFuel.requestScriptText += 'googletag.pubads().refresh(' + slotIds + ');\n';

	    if (slots.length > 0) {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().refresh(slots, {
	          changeCorrelator: !opts.maintainCorrelator
	        });
	      });
	    } else {
	      window.googletag.cmd.push(function () {
	        window.googletag.pubads().refresh(null, {
	          changeCorrelator: !opts.maintainCorrelator
	        });
	      });
	    }
	  }

	  return {
	    executeWhenAvailable: executeWhenAvailable,
	    isAvailable: isAvailable,
	    configurePubAds: configurePubAds,
	    clearTargeting: clearTargeting,
	    setTargeting: setTargeting,
	    setLocation: setLocation,
	    setChildDirectedTreatmentTag: setChildDirectedTreatmentTag,
	    setSafeFrameConfig: setSafeFrameConfig,
	    setSlotSafeFrameConfig: setSlotSafeFrameConfig,
	    setCategoryExclusion: setCategoryExclusion,
	    defineOutOfPageSlot: defineOutOfPageSlot,
	    defineSlot: defineSlot,
	    setSlotCategoryExclusion: setSlotCategoryExclusion,
	    setSlotTargeting: setSlotTargeting,
	    displaySlotById: displaySlotById,
	    defineSlotSizeMapping: defineSlotSizeMapping,
	    refreshSlots: refreshSlots,
	    clearSlots: clearGPTSlots,
	    clearSlotTargeting: clearSlotTargeting,
	    destroySlots: destroyGPTSlots
	  };
	}();
	/** Utils **/


	var normalizeUrl = function _normalizeUrl(urlString) {
	  var options = assign$1({
	    normalizeProtocol: false,
	    normalizeHttps: true,
	    normalizeHttp: false,
	    stripFragment: true,
	    stripWWW: true,
	    removeQueryParameters: true,
	    removeTrailingSlash: true,
	    removeDirectoryIndex: false
	  }, {});

	  var urlStringInput = urlString.trim();
	  var hasRelativeProtocol = urlString[0] === '/' && urlString[1] === '/';
	  var isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString); // Prepend protocol

	  if (!isRelativeUrl) {
	    urlStringInput = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, 'http://');
	  }

	  var urlObj = document.createElement('a');
	  urlObj.href = urlStringInput;

	  if (options.normalizeHttps && options.normalizeHttp) {
	    throw new Error('The `normalizeHttp` and `normalizeHttps` options cannot be used together');
	  }

	  if (options.normalizeHttp && urlObj.protocol === 'http:') {
	    urlObj.protocol = 'https:';
	  }

	  if (options.normalizeHttps && urlObj.protocol === 'https:') {
	    urlObj.protocol = 'http:';
	  } // Remove fragment


	  if (options.stripFragment) {
	    urlObj.hash = '';
	  } // Remove duplicate slashes if not preceded by a protocol


	  if (urlObj.pathname) {
	    // TODO: Use the following instead when targeting Node.js 10
	    // `urlObj.pathname = urlObj.pathname.replace(/(?<!https?:)\/{2,}/g, '/');`
	    urlObj.pathname = urlObj.pathname.replace(/((?![https?:]).)\/{2,}/g, function _pathnameReplace(_, p1) {
	      if (/^(?!\/)/g.test(p1)) {
	        return p1 + '/';
	      }

	      return '/';
	    });
	  } // Decode URI octets


	  if (urlObj.pathname) {
	    urlObj.pathname = decodeURI(urlObj.pathname);
	  }

	  if (urlObj.hostname) {
	    // Remove trailing dot
	    urlObj.hostname = urlObj.hostname.replace(/\.$/, ''); // Remove `www.`

	    if (options.stripWWW) {
	      urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
	    }
	  } // Remove query unwanted parameters


	  if (options.removeQueryParameters) {
	    urlObj.search = '';
	  } // Take advantage of many of the Node `url` normalizations


	  urlStringInput = urlObj.href; // Remove ending `/`

	  if (options.removeTrailingSlash || urlObj.pathname === '/') {
	    urlStringInput = urlString.replace(/\/$/, '');
	  } // Restore relative protocol, if applicable


	  if (hasRelativeProtocol && !options.normalizeProtocol) {
	    urlStringInput = urlString.replace(/^http:\/\//, '//');
	  }

	  return urlStringInput;
	};
	/** Keep Here - Main AdFuel Export object **/


	var AdFuel = {
	  init: init$1,
	  addEvent: addEvent,
	  dynamicTargeting: _dynamicTargeting,
	  setBulkTargeting: setBulkTargeting,
	  dispatchQueue: dispatchQueue,
	  queueRegistry: queueRegistry,
	  getQueuedSlots: getQueuedSlots,
	  getSlotDetails: getSlotDetails,
	  refresh: refresh,
	  destroySlots: destroySlots,
	  clearSlots: clearSlots,
	  removePageLevelTarget: removePageLevelTarget,
	  removeSlotLevelTarget: removeSlotLevelTarget,
	  addPageLevelTarget: addPageLevelTarget,
	  addSlotLevelTarget: addSlotLevelTarget,
	  registry: new RegistryArray(),
	  requestScriptText: '',
	  setOptions: function setOptions() {
	    /* for backwards-compatibility */
	  },
	  // module registration
	  registerModule: registerModule,
	  unregisterModule: unregisterModule,
	  registeredModules: _registeredModules,
	  // for debug
	  __VERSION__: function __VERSION__() {
	    return VERSION;
	  },
	  __OPTIONS__: function __OPTIONS__() {
	    return _options;
	  },
	  __CONFIG__: function __CONFIG__() {
	    return siteOptions;
	  },
	  rocketeerSlots: _rocketeerSlots,
	  pageSlots: _pageSlots,
	  builtSlots: _builtSlots,
	  queuedSlots: _queuedSlots,
	  cachedRegistries: _cachedRegistries // /////////////////////////////////////////////////

	};
	/** Keep Here - CCPA/GDPR Compliant Initialization Function */

	var initGoogleTag = function initGoogleTag() {
	  setTimeout(function () {
	    logger$2.log('Initializing GoogleTag Library...');
	    googleTag.init({
	      ADFUEL: {
	        DEBUG: false
	      }
	    });
	  }, 1);
	};
	/** Keep Here - CCPA/GDPR Compliant Initialization Function */


	var callInit = function callInit() {
	  setTimeout(function () {
	    if (window.WM.UserConsent && window.WM.UserConsent.isReady()) {
	      initEventSet = window.WM.UserConsent.isOptanonLoaded() || false;

	      if (window.WM.UserConsent.getRegion() === 'ccpa') {
	        setTimeout(function () {
	          initGoogleTag();
	          init$1(window.AdFuelOptions);
	        }, 1);
	      } else if (window.WM.UserConsent.getRegion() === 'gdpr') {
	        if (initEventSet) {
	          setTimeout(function () {
	            initGoogleTag();
	            init$1(window.AdFuelOptions);
	          }, 1);
	        } else {
	          addEvent(document, 'optanonLoaded', function () {
	            initEventSet = true;
	            initGoogleTag();
	            init$1(window.AdFuelOptions);
	          });
	        }
	      } else {
	        setTimeout(function () {
	          initGoogleTag();
	          init$1(window.AdFuelOptions);
	        }, 1);
	      }
	    }
	  }, 100);
	};
	/** Keep Here - CCPA/GDPR Compliant Initialization Function */


	if (window.AdFuelOptions) {
	  if (window.AdFuelOptions.USER_CONSENT.ENABLED) {
	    if (window.WM && window.WM.UserConsent && window.WM.UserConsent.isReady()) {
	      setTimeout(callInit, 1);
	    } else {
	      addEvent(document, 'userConsentReady', callInit);
	    }
	  } else {
	    setTimeout(function () {
	      initGoogleTag();
	      init$1(window.AdFuelOptions);
	    }, 1);
	  }
	}

	return AdFuel;

}));
