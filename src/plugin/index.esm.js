function i(e) { return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

function a(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

function o(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
    }
}

function s(e, t, n) { return t && o(e.prototype, t), n && o(e, n), e }

function c(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }

function u(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && function(e, t) {
        (Object.setPrototypeOf || function(e, t) { return e.__proto__ = t, e })(e, t)
    }(e, t)
}

function l(e) { return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) { return e.__proto__ || Object.getPrototypeOf(e) })(e) }

function h(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e }

function p(e, t) { return !t || "object" != typeof t && "function" != typeof t ? h(e) : t }

function d(e) {
    var t = function() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0 } catch (e) { return !1 } }();
    return function() {
        var n, r = l(e);
        if (t) {
            var i = l(this).constructor;
            n = Reflect.construct(r, arguments, i)
        } else n = r.apply(this, arguments);
        return p(this, n)
    }
}

function f(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function m(e) {
    if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
        if (Array.isArray(e) || (e = function(e, t) { if (e) { if ("string" == typeof e) return f(e, t); var n = Object.prototype.toString.call(e).slice(8, -1); return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(e, t) : void 0 } }(e))) {
            var t = 0,
                n = function() {};
            return { s: n, n: function() { return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] } }, e: function(e) { throw e }, f: n }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var r, i, a = !0,
        o = !1;
    return { s: function() { r = e[Symbol.iterator]() }, n: function() { var e = r.next(); return a = e.done, e }, e: function(e) { o = !0, i = e }, f: function() { try { a || null == r.return || r.return() } finally { if (o) throw i } } }
}
var v, g = function() {
        function e() { a(this, e), this.poolPool = {} }
        return s(e, null, [{ key: "getPool", value: function(e) { return this.instance.poolPool[e] || (this.instance.poolPool[e] = []) } }, {
            key: "getItem",
            value: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = this.getPool(e),
                    i = r.length ? r.shift() : new t(n);
                return i
            }
        }, { key: "recover", value: function(e, t) { this.getPool(e).push(t) } }, { key: "instance", get: function() { return this.pool || (this.pool = new e), this.pool } }]), e
    }(),
    y = function() {
        function e() { a(this, e) }
        return s(e, null, [{
            key: "collide",
            value: function(e, t) {
                var n = this,
                    r = this.apex(e),
                    i = this.apex(t),
                    a = !!r.filter((function(e) { return n.pointInPoly(e, i) })).length,
                    o = !!i.filter((function(e) { return n.pointInPoly(e, r) })).length;
                return a || o
            }
        }, {
            key: "apex",
            value: function(e) {
                var t = e.width,
                    n = e.height,
                    r = e.x,
                    i = e.y,
                    a = r - t * e.anchor.x * Math.cos(e.rotate * Math.PI / 180),
                    o = i - t * e.anchor.x * Math.sin(e.rotate * Math.PI / 180),
                    s = { x: a + (r + n * e.anchor.y * Math.sin(e.rotate * Math.PI / 180)) - r, y: o + (i - n * e.anchor.y * Math.cos(e.rotate * Math.PI / 180)) - i },
                    c = { x: s.x + t * Math.cos(e.rotate * Math.PI / 180), y: s.y + t * Math.sin(e.rotate * Math.PI / 180) },
                    u = { x: s.x - n * Math.sin(e.rotate * Math.PI / 180), y: s.y + n * Math.cos(e.rotate * Math.PI / 180) };
                return [s, c, { x: c.x + u.x - s.x, y: c.y + u.y - s.y }, u]
            }
        }, { key: "containsPoint", value: function(e, t) { var n = this.apex(t); return this.pointInPoly(e, n) } }, { key: "inside", value: function(e, t) { var n = this; return this.apex(e).every((function(e) { return n.containsPoint(e, t) })) } }, { key: "pointInPoly", value: function(e, t) { for (var n = !1, r = -1, i = t.length, a = i - 1; ++r < i; a = r)(t[r].y <= e.y && e.y < t[a].y || t[a].y <= e.y && e.y < t[r].y) && e.x < (t[a].x - t[r].x) * (e.y - t[r].y) / (t[a].y - t[r].y) + t[r].x && (n = !n); return n } }]), e
    }();
void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Number.isInteger && (Number.isInteger = function(e) { return "number" == typeof e && isFinite(e) && Math.floor(e) === e }), void 0 === Math.sign && (Math.sign = function(e) { return e < 0 ? -1 : e > 0 ? 1 : +e }), "name" in Function.prototype == 0 && Object.defineProperty(Function.prototype, "name", { get: function() { return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1] } }), void 0 === Object.assign && (Object.assign = function(e) {
    var t = arguments;
    if (null == e) throw new TypeError("Cannot convert undefined or null to object");
    for (var n = Object(e), r = 1; r < arguments.length; r++) {
        var i = t[r];
        if (null != i)
            for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a])
    }
    return n
});
var x = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 },
    b = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };

function w() {}
Object.assign(w.prototype, {
    addEventListener: function(e, t) {
        void 0 === this._listeners && (this._listeners = {});
        var n = this._listeners;
        void 0 === n[e] && (n[e] = []), -1 === n[e].indexOf(t) && n[e].push(t)
    },
    hasEventListener: function(e, t) { if (void 0 === this._listeners) return !1; var n = this._listeners; return void 0 !== n[e] && -1 !== n[e].indexOf(t) },
    removeEventListener: function(e, t) { if (void 0 !== this._listeners) { var n = this._listeners[e]; if (void 0 !== n) { var r = n.indexOf(t); - 1 !== r && n.splice(r, 1) } } },
    dispatchEvent: function(e) { if (void 0 !== this._listeners) { var t = this._listeners[e.type]; if (void 0 !== t) { e.target = this; for (var n = t.slice(0), r = 0, i = n.length; r < i; r++) n[r].call(this, e) } } }
});
for (var _ = [], M = 0; M < 256; M++) _[M] = (M < 16 ? "0" : "") + M.toString(16);
var S, T = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function() {
        var e = 4294967295 * Math.random() | 0,
            t = 4294967295 * Math.random() | 0,
            n = 4294967295 * Math.random() | 0,
            r = 4294967295 * Math.random() | 0;
        return (_[255 & e] + _[e >> 8 & 255] + _[e >> 16 & 255] + _[e >> 24 & 255] + "-" + _[255 & t] + _[t >> 8 & 255] + "-" + _[t >> 16 & 15 | 64] + _[t >> 24 & 255] + "-" + _[63 & n | 128] + _[n >> 8 & 255] + "-" + _[n >> 16 & 255] + _[n >> 24 & 255] + _[255 & r] + _[r >> 8 & 255] + _[r >> 16 & 255] + _[r >> 24 & 255]).toUpperCase()
    },
    clamp: function(e, t, n) { return Math.max(t, Math.min(n, e)) },
    euclideanModulo: function(e, t) { return (e % t + t) % t },
    mapLinear: function(e, t, n, r, i) { return r + (e - t) * (i - r) / (n - t) },
    lerp: function(e, t, n) { return (1 - n) * e + n * t },
    smoothstep: function(e, t, n) { return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * (3 - 2 * e) },
    smootherstep: function(e, t, n) { return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * e * (e * (6 * e - 15) + 10) },
    randInt: function(e, t) { return e + Math.floor(Math.random() * (t - e + 1)) },
    randFloat: function(e, t) { return e + Math.random() * (t - e) },
    randFloatSpread: function(e) { return e * (.5 - Math.random()) },
    degToRad: function(e) { return e * T.DEG2RAD },
    radToDeg: function(e) { return e * T.RAD2DEG },
    isPowerOfTwo: function(e) { return 0 == (e & e - 1) && 0 !== e },
    ceilPowerOfTwo: function(e) { return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2)) },
    floorPowerOfTwo: function(e) { return Math.pow(2, Math.floor(Math.log(e) / Math.LN2)) },
    setQuaternionFromProperEuler: function(e, t, n, r, i) {
        var a = Math.cos,
            o = Math.sin,
            s = a(n / 2),
            c = o(n / 2),
            u = a((t + r) / 2),
            l = o((t + r) / 2),
            h = a((t - r) / 2),
            p = o((t - r) / 2),
            d = a((r - t) / 2),
            f = o((r - t) / 2);
        "XYX" === i ? e.set(s * l, c * h, c * p, s * u) : "YZY" === i ? e.set(c * p, s * l, c * h, s * u) : "ZXZ" === i ? e.set(c * h, c * p, s * l, s * u) : "XZX" === i ? e.set(s * l, c * f, c * d, s * u) : "YXY" === i ? e.set(c * d, s * l, c * f, s * u) : "ZYZ" === i ? e.set(c * f, c * d, s * l, s * u) : console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order.")
    }
};

function E(e, t) { this.x = e || 0, this.y = t || 0 }

function A() { this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.") }
Object.defineProperties(E.prototype, { width: { get: function() { return this.x }, set: function(e) { this.x = e } }, height: { get: function() { return this.y }, set: function(e) { this.y = e } } }), Object.assign(E.prototype, {
    isVector2: !0,
    set: function(e, t) { return this.x = e, this.y = t, this },
    setScalar: function(e) { return this.x = e, this.y = e, this },
    setX: function(e) { return this.x = e, this },
    setY: function(e) { return this.y = e, this },
    setComponent: function(e, t) {
        switch (e) {
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            default:
                throw new Error("index is out of range: " + e)
        }
        return this
    },
    getComponent: function(e) {
        switch (e) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw new Error("index is out of range: " + e)
        }
    },
    clone: function() { return new this.constructor(this.x, this.y) },
    copy: function(e) { return this.x = e.x, this.y = e.y, this },
    add: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this) },
    addScalar: function(e) { return this.x += e, this.y += e, this },
    addVectors: function(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this },
    addScaledVector: function(e, t) { return this.x += e.x * t, this.y += e.y * t, this },
    sub: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this) },
    subScalar: function(e) { return this.x -= e, this.y -= e, this },
    subVectors: function(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this },
    multiply: function(e) { return this.x *= e.x, this.y *= e.y, this },
    multiplyScalar: function(e) { return this.x *= e, this.y *= e, this },
    divide: function(e) { return this.x /= e.x, this.y /= e.y, this },
    divideScalar: function(e) { return this.multiplyScalar(1 / e) },
    applyMatrix3: function(e) {
        var t = this.x,
            n = this.y,
            r = e.elements;
        return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this
    },
    min: function(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this },
    max: function(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this },
    clamp: function(e, t) { return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this },
    clampScalar: function(e, t) { return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this },
    clampLength: function(e, t) { var n = this.length(); return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n))) },
    floor: function() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this },
    ceil: function() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this },
    round: function() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this },
    roundToZero: function() { return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this },
    negate: function() { return this.x = -this.x, this.y = -this.y, this },
    dot: function(e) { return this.x * e.x + this.y * e.y },
    cross: function(e) { return this.x * e.y - this.y * e.x },
    lengthSq: function() { return this.x * this.x + this.y * this.y },
    length: function() { return Math.sqrt(this.x * this.x + this.y * this.y) },
    manhattanLength: function() { return Math.abs(this.x) + Math.abs(this.y) },
    normalize: function() { return this.divideScalar(this.length() || 1) },
    angle: function() { return Math.atan2(-this.y, -this.x) + Math.PI },
    distanceTo: function(e) { return Math.sqrt(this.distanceToSquared(e)) },
    distanceToSquared: function(e) {
        var t = this.x - e.x,
            n = this.y - e.y;
        return t * t + n * n
    },
    manhattanDistanceTo: function(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) },
    setLength: function(e) { return this.normalize().multiplyScalar(e) },
    lerp: function(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this },
    lerpVectors: function(e, t, n) { return this.subVectors(t, e).multiplyScalar(n).add(e) },
    equals: function(e) { return e.x === this.x && e.y === this.y },
    fromArray: function(e, t) { return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this },
    toArray: function(e, t) { return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e },
    fromBufferAttribute: function(e, t, n) { return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this },
    rotateAround: function(e, t) {
        var n = Math.cos(t),
            r = Math.sin(t),
            i = this.x - e.x,
            a = this.y - e.y;
        return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this
    }
}), Object.assign(A.prototype, {
    isMatrix3: !0,
    set: function(e, t, n, r, i, a, o, s, c) { var u = this.elements; return u[0] = e, u[1] = r, u[2] = o, u[3] = t, u[4] = i, u[5] = s, u[6] = n, u[7] = a, u[8] = c, this },
    identity: function() { return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this },
    clone: function() { return (new this.constructor).fromArray(this.elements) },
    copy: function(e) {
        var t = this.elements,
            n = e.elements;
        return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this
    },
    extractBasis: function(e, t, n) { return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this },
    setFromMatrix4: function(e) { var t = e.elements; return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this },
    multiply: function(e) { return this.multiplyMatrices(this, e) },
    premultiply: function(e) { return this.multiplyMatrices(e, this) },
    multiplyMatrices: function(e, t) {
        var n = e.elements,
            r = t.elements,
            i = this.elements,
            a = n[0],
            o = n[3],
            s = n[6],
            c = n[1],
            u = n[4],
            l = n[7],
            h = n[2],
            p = n[5],
            d = n[8],
            f = r[0],
            m = r[3],
            v = r[6],
            g = r[1],
            y = r[4],
            x = r[7],
            b = r[2],
            w = r[5],
            _ = r[8];
        return i[0] = a * f + o * g + s * b, i[3] = a * m + o * y + s * w, i[6] = a * v + o * x + s * _, i[1] = c * f + u * g + l * b, i[4] = c * m + u * y + l * w, i[7] = c * v + u * x + l * _, i[2] = h * f + p * g + d * b, i[5] = h * m + p * y + d * w, i[8] = h * v + p * x + d * _, this
    },
    multiplyScalar: function(e) { var t = this.elements; return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this },
    determinant: function() {
        var e = this.elements,
            t = e[0],
            n = e[1],
            r = e[2],
            i = e[3],
            a = e[4],
            o = e[5],
            s = e[6],
            c = e[7],
            u = e[8];
        return t * a * u - t * o * c - n * i * u + n * o * s + r * i * c - r * a * s
    },
    getInverse: function(e, t) {
        void 0 !== t && console.warn("THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate.");
        var n = e.elements,
            r = this.elements,
            i = n[0],
            a = n[1],
            o = n[2],
            s = n[3],
            c = n[4],
            u = n[5],
            l = n[6],
            h = n[7],
            p = n[8],
            d = p * c - u * h,
            f = u * l - p * s,
            m = h * s - c * l,
            v = i * d + a * f + o * m;
        if (0 === v) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var g = 1 / v;
        return r[0] = d * g, r[1] = (o * h - p * a) * g, r[2] = (u * a - o * c) * g, r[3] = f * g, r[4] = (p * i - o * l) * g, r[5] = (o * s - u * i) * g, r[6] = m * g, r[7] = (a * l - h * i) * g, r[8] = (c * i - a * s) * g, this
    },
    transpose: function() { var e, t = this.elements; return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this },
    getNormalMatrix: function(e) { return this.setFromMatrix4(e).getInverse(this).transpose() },
    transposeIntoArray: function(e) { var t = this.elements; return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this },
    setUvTransform: function(e, t, n, r, i, a, o) {
        var s = Math.cos(i),
            c = Math.sin(i);
        this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1)
    },
    scale: function(e, t) { var n = this.elements; return n[0] *= e, n[3] *= e, n[6] *= e, n[1] *= t, n[4] *= t, n[7] *= t, this },
    rotate: function(e) {
        var t = Math.cos(e),
            n = Math.sin(e),
            r = this.elements,
            i = r[0],
            a = r[3],
            o = r[6],
            s = r[1],
            c = r[4],
            u = r[7];
        return r[0] = t * i + n * s, r[3] = t * a + n * c, r[6] = t * o + n * u, r[1] = -n * i + t * s, r[4] = -n * a + t * c, r[7] = -n * o + t * u, this
    },
    translate: function(e, t) { var n = this.elements; return n[0] += e * n[2], n[3] += e * n[5], n[6] += e * n[8], n[1] += t * n[2], n[4] += t * n[5], n[7] += t * n[8], this },
    equals: function(e) {
        for (var t = this.elements, n = e.elements, r = 0; r < 9; r++)
            if (t[r] !== n[r]) return !1;
        return !0
    },
    fromArray: function(e, t) { void 0 === t && (t = 0); for (var n = 0; n < 9; n++) this.elements[n] = e[n + t]; return this },
    toArray: function(e, t) { void 0 === e && (e = []), void 0 === t && (t = 0); var n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e }
});
var L = {
        getDataURL: function(e) {
            var t;
            if ("undefined" == typeof HTMLCanvasElement) return e.src;
            if (e instanceof HTMLCanvasElement) t = e;
            else {
                void 0 === S && (S = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), S.width = e.width, S.height = e.height;
                var n = S.getContext("2d");
                e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = S
            }
            return t.width > 2048 || t.height > 2048 ? t.toDataURL("image/jpeg", .6) : t.toDataURL("image/png")
        }
    },
    R = 0;

function P(e, t, n, r, i, a, o, s, c, u) { Object.defineProperty(this, "id", { value: R++ }), this.uuid = T.generateUUID(), this.name = "", this.image = void 0 !== e ? e : P.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== t ? t : P.DEFAULT_MAPPING, this.wrapS = void 0 !== n ? n : 1001, this.wrapT = void 0 !== r ? r : 1001, this.magFilter = void 0 !== i ? i : 1006, this.minFilter = void 0 !== a ? a : 1008, this.anisotropy = void 0 !== c ? c : 1, this.format = void 0 !== o ? o : 1023, this.internalFormat = null, this.type = void 0 !== s ? s : 1009, this.offset = new E(0, 0), this.repeat = new E(1, 1), this.center = new E(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new A, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== u ? u : 3e3, this.version = 0, this.onUpdate = null }

function C(e, t, n, r) { this.x = e || 0, this.y = t || 0, this.z = n || 0, this.w = void 0 !== r ? r : 1 }

function O(e, t, n) { this.width = e, this.height = t, this.scissor = new C(0, 0, e, t), this.scissorTest = !1, this.viewport = new C(0, 0, e, t), n = n || {}, this.texture = new P(void 0, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.image = {}, this.texture.image.width = e, this.texture.image.height = t, this.texture.generateMipmaps = void 0 !== n.generateMipmaps && n.generateMipmaps, this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : 1006, this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer, this.stencilBuffer = void 0 === n.stencilBuffer || n.stencilBuffer, this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null }

function I(e, t, n) { O.call(this, e, t, n), this.samples = 4 }

function D(e, t, n, r) { this._x = e || 0, this._y = t || 0, this._z = n || 0, this._w = void 0 !== r ? r : 1 }
P.DEFAULT_IMAGE = void 0, P.DEFAULT_MAPPING = 300, P.prototype = Object.assign(Object.create(w.prototype), {
    constructor: P,
    isTexture: !0,
    updateMatrix: function() { this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y) },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.name = e.name, this.image = e.image, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this },
    toJSON: function(e) {
        var t = void 0 === e || "string" == typeof e;
        if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
        var n = { metadata: { version: 4.5, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, mapping: this.mapping, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, type: this.type, encoding: this.encoding, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
        if (void 0 !== this.image) {
            var r = this.image;
            if (void 0 === r.uuid && (r.uuid = T.generateUUID()), !t && void 0 === e.images[r.uuid]) {
                var i;
                if (Array.isArray(r)) { i = []; for (var a = 0, o = r.length; a < o; a++) i.push(L.getDataURL(r[a])) } else i = L.getDataURL(r);
                e.images[r.uuid] = { uuid: r.uuid, url: i }
            }
            n.image = r.uuid
        }
        return t || (e.textures[this.uuid] = n), n
    },
    dispose: function() { this.dispatchEvent({ type: "dispose" }) },
    transformUv: function(e) {
        if (300 !== this.mapping) return e;
        if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
            case 1e3:
                e.x = e.x - Math.floor(e.x);
                break;
            case 1001:
                e.x = e.x < 0 ? 0 : 1;
                break;
            case 1002:
                1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x)
        }
        if (e.y < 0 || e.y > 1) switch (this.wrapT) {
            case 1e3:
                e.y = e.y - Math.floor(e.y);
                break;
            case 1001:
                e.y = e.y < 0 ? 0 : 1;
                break;
            case 1002:
                1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y)
        }
        return this.flipY && (e.y = 1 - e.y), e
    }
}), Object.defineProperty(P.prototype, "needsUpdate", { set: function(e) {!0 === e && this.version++ } }), Object.defineProperties(C.prototype, { width: { get: function() { return this.z }, set: function(e) { this.z = e } }, height: { get: function() { return this.w }, set: function(e) { this.w = e } } }), Object.assign(C.prototype, {
    isVector4: !0,
    set: function(e, t, n, r) { return this.x = e, this.y = t, this.z = n, this.w = r, this },
    setScalar: function(e) { return this.x = e, this.y = e, this.z = e, this.w = e, this },
    setX: function(e) { return this.x = e, this },
    setY: function(e) { return this.y = e, this },
    setZ: function(e) { return this.z = e, this },
    setW: function(e) { return this.w = e, this },
    setComponent: function(e, t) {
        switch (e) {
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            case 2:
                this.z = t;
                break;
            case 3:
                this.w = t;
                break;
            default:
                throw new Error("index is out of range: " + e)
        }
        return this
    },
    getComponent: function(e) {
        switch (e) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new Error("index is out of range: " + e)
        }
    },
    clone: function() { return new this.constructor(this.x, this.y, this.z, this.w) },
    copy: function(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this },
    add: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this) },
    addScalar: function(e) { return this.x += e, this.y += e, this.z += e, this.w += e, this },
    addVectors: function(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this },
    addScaledVector: function(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this },
    sub: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this) },
    subScalar: function(e) { return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this },
    subVectors: function(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this },
    multiplyScalar: function(e) { return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this },
    applyMatrix4: function(e) {
        var t = this.x,
            n = this.y,
            r = this.z,
            i = this.w,
            a = e.elements;
        return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this
    },
    divideScalar: function(e) { return this.multiplyScalar(1 / e) },
    setAxisAngleFromQuaternion: function(e) { this.w = 2 * Math.acos(e.w); var t = Math.sqrt(1 - e.w * e.w); return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this },
    setAxisAngleFromRotationMatrix: function(e) {
        var t, n, r, i, a = e.elements,
            o = a[0],
            s = a[4],
            c = a[8],
            u = a[1],
            l = a[5],
            h = a[9],
            p = a[2],
            d = a[6],
            f = a[10];
        if (Math.abs(s - u) < .01 && Math.abs(c - p) < .01 && Math.abs(h - d) < .01) {
            if (Math.abs(s + u) < .1 && Math.abs(c + p) < .1 && Math.abs(h + d) < .1 && Math.abs(o + l + f - 3) < .1) return this.set(1, 0, 0, 0), this;
            t = Math.PI;
            var m = (o + 1) / 2,
                v = (l + 1) / 2,
                g = (f + 1) / 2,
                y = (s + u) / 4,
                x = (c + p) / 4,
                b = (h + d) / 4;
            return m > v && m > g ? m < .01 ? (n = 0, r = .707106781, i = .707106781) : (r = y / (n = Math.sqrt(m)), i = x / n) : v > g ? v < .01 ? (n = .707106781, r = 0, i = .707106781) : (n = y / (r = Math.sqrt(v)), i = b / r) : g < .01 ? (n = .707106781, r = .707106781, i = 0) : (n = x / (i = Math.sqrt(g)), r = b / i), this.set(n, r, i, t), this
        }
        var w = Math.sqrt((d - h) * (d - h) + (c - p) * (c - p) + (u - s) * (u - s));
        return Math.abs(w) < .001 && (w = 1), this.x = (d - h) / w, this.y = (c - p) / w, this.z = (u - s) / w, this.w = Math.acos((o + l + f - 1) / 2), this
    },
    min: function(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this },
    max: function(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this },
    clamp: function(e, t) { return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this },
    clampScalar: function(e, t) { return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this },
    clampLength: function(e, t) { var n = this.length(); return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n))) },
    floor: function() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this },
    ceil: function() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this },
    round: function() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this },
    roundToZero: function() { return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this },
    negate: function() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this },
    dot: function(e) { return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w },
    lengthSq: function() { return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w },
    length: function() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) },
    manhattanLength: function() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w) },
    normalize: function() { return this.divideScalar(this.length() || 1) },
    setLength: function(e) { return this.normalize().multiplyScalar(e) },
    lerp: function(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this },
    lerpVectors: function(e, t, n) { return this.subVectors(t, e).multiplyScalar(n).add(e) },
    equals: function(e) { return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w },
    fromArray: function(e, t) { return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this },
    toArray: function(e, t) { return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e },
    fromBufferAttribute: function(e, t, n) { return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this }
}), O.prototype = Object.assign(Object.create(w.prototype), { constructor: O, isWebGLRenderTarget: !0, setSize: function(e, t) { this.width === e && this.height === t || (this.width = e, this.height = t, this.texture.image.width = e, this.texture.image.height = t, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t) }, clone: function() { return (new this.constructor).copy(this) }, copy: function(e) { return this.width = e.width, this.height = e.height, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this }, dispose: function() { this.dispatchEvent({ type: "dispose" }) } }), I.prototype = Object.assign(Object.create(O.prototype), { constructor: I, isWebGLMultisampleRenderTarget: !0, copy: function(e) { return O.prototype.copy.call(this, e), this.samples = e.samples, this } }), Object.assign(D, {
    slerp: function(e, t, n, r) { return n.copy(e).slerp(t, r) },
    slerpFlat: function(e, t, n, r, i, a, o) {
        var s = n[r + 0],
            c = n[r + 1],
            u = n[r + 2],
            l = n[r + 3],
            h = i[a + 0],
            p = i[a + 1],
            d = i[a + 2],
            f = i[a + 3];
        if (l !== f || s !== h || c !== p || u !== d) {
            var m = 1 - o,
                v = s * h + c * p + u * d + l * f,
                g = v >= 0 ? 1 : -1,
                y = 1 - v * v;
            if (y > Number.EPSILON) {
                var x = Math.sqrt(y),
                    b = Math.atan2(x, v * g);
                m = Math.sin(m * b) / x, o = Math.sin(o * b) / x
            }
            var w = o * g;
            if (s = s * m + h * w, c = c * m + p * w, u = u * m + d * w, l = l * m + f * w, m === 1 - o) {
                var _ = 1 / Math.sqrt(s * s + c * c + u * u + l * l);
                s *= _, c *= _, u *= _, l *= _
            }
        }
        e[t] = s, e[t + 1] = c, e[t + 2] = u, e[t + 3] = l
    }
}), Object.defineProperties(D.prototype, { x: { get: function() { return this._x }, set: function(e) { this._x = e, this._onChangeCallback() } }, y: { get: function() { return this._y }, set: function(e) { this._y = e, this._onChangeCallback() } }, z: { get: function() { return this._z }, set: function(e) { this._z = e, this._onChangeCallback() } }, w: { get: function() { return this._w }, set: function(e) { this._w = e, this._onChangeCallback() } } }), Object.assign(D.prototype, {
    isQuaternion: !0,
    set: function(e, t, n, r) { return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this },
    clone: function() { return new this.constructor(this._x, this._y, this._z, this._w) },
    copy: function(e) { return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this },
    setFromEuler: function(e, t) {
        if (!e || !e.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
        var n = e._x,
            r = e._y,
            i = e._z,
            a = e.order,
            o = Math.cos,
            s = Math.sin,
            c = o(n / 2),
            u = o(r / 2),
            l = o(i / 2),
            h = s(n / 2),
            p = s(r / 2),
            d = s(i / 2);
        return "XYZ" === a ? (this._x = h * u * l + c * p * d, this._y = c * p * l - h * u * d, this._z = c * u * d + h * p * l, this._w = c * u * l - h * p * d) : "YXZ" === a ? (this._x = h * u * l + c * p * d, this._y = c * p * l - h * u * d, this._z = c * u * d - h * p * l, this._w = c * u * l + h * p * d) : "ZXY" === a ? (this._x = h * u * l - c * p * d, this._y = c * p * l + h * u * d, this._z = c * u * d + h * p * l, this._w = c * u * l - h * p * d) : "ZYX" === a ? (this._x = h * u * l - c * p * d, this._y = c * p * l + h * u * d, this._z = c * u * d - h * p * l, this._w = c * u * l + h * p * d) : "YZX" === a ? (this._x = h * u * l + c * p * d, this._y = c * p * l + h * u * d, this._z = c * u * d - h * p * l, this._w = c * u * l - h * p * d) : "XZY" === a && (this._x = h * u * l - c * p * d, this._y = c * p * l - h * u * d, this._z = c * u * d + h * p * l, this._w = c * u * l + h * p * d), !1 !== t && this._onChangeCallback(), this
    },
    setFromAxisAngle: function(e, t) {
        var n = t / 2,
            r = Math.sin(n);
        return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this
    },
    setFromRotationMatrix: function(e) {
        var t, n = e.elements,
            r = n[0],
            i = n[4],
            a = n[8],
            o = n[1],
            s = n[5],
            c = n[9],
            u = n[2],
            l = n[6],
            h = n[10],
            p = r + s + h;
        return p > 0 ? (t = .5 / Math.sqrt(p + 1), this._w = .25 / t, this._x = (l - c) * t, this._y = (a - u) * t, this._z = (o - i) * t) : r > s && r > h ? (t = 2 * Math.sqrt(1 + r - s - h), this._w = (l - c) / t, this._x = .25 * t, this._y = (i + o) / t, this._z = (a + u) / t) : s > h ? (t = 2 * Math.sqrt(1 + s - r - h), this._w = (a - u) / t, this._x = (i + o) / t, this._y = .25 * t, this._z = (c + l) / t) : (t = 2 * Math.sqrt(1 + h - r - s), this._w = (o - i) / t, this._x = (a + u) / t, this._y = (c + l) / t, this._z = .25 * t), this._onChangeCallback(), this
    },
    setFromUnitVectors: function(e, t) { var n = e.dot(t) + 1; return n < 1e-6 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize() },
    angleTo: function(e) { return 2 * Math.acos(Math.abs(T.clamp(this.dot(e), -1, 1))) },
    rotateTowards: function(e, t) { var n = this.angleTo(e); if (0 === n) return this; var r = Math.min(1, t / n); return this.slerp(e, r), this },
    inverse: function() { return this.conjugate() },
    conjugate: function() { return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this },
    dot: function(e) { return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w },
    lengthSq: function() { return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w },
    length: function() { return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w) },
    normalize: function() { var e = this.length(); return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this },
    multiply: function(e, t) { return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e) },
    premultiply: function(e) { return this.multiplyQuaternions(e, this) },
    multiplyQuaternions: function(e, t) {
        var n = e._x,
            r = e._y,
            i = e._z,
            a = e._w,
            o = t._x,
            s = t._y,
            c = t._z,
            u = t._w;
        return this._x = n * u + a * o + r * c - i * s, this._y = r * u + a * s + i * o - n * c, this._z = i * u + a * c + n * s - r * o, this._w = a * u - n * o - r * s - i * c, this._onChangeCallback(), this
    },
    slerp: function(e, t) {
        if (0 === t) return this;
        if (1 === t) return this.copy(e);
        var n = this._x,
            r = this._y,
            i = this._z,
            a = this._w,
            o = a * e._w + n * e._x + r * e._y + i * e._z;
        if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1) return this._w = a, this._x = n, this._y = r, this._z = i, this;
        var s = 1 - o * o;
        if (s <= Number.EPSILON) { var c = 1 - t; return this._w = c * a + t * this._w, this._x = c * n + t * this._x, this._y = c * r + t * this._y, this._z = c * i + t * this._z, this.normalize(), this._onChangeCallback(), this }
        var u = Math.sqrt(s),
            l = Math.atan2(u, o),
            h = Math.sin((1 - t) * l) / u,
            p = Math.sin(t * l) / u;
        return this._w = a * h + this._w * p, this._x = n * h + this._x * p, this._y = r * h + this._y * p, this._z = i * h + this._z * p, this._onChangeCallback(), this
    },
    equals: function(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w },
    fromArray: function(e, t) { return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this },
    toArray: function(e, t) { return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e },
    fromBufferAttribute: function(e, t) { return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this },
    _onChange: function(e) { return this._onChangeCallback = e, this },
    _onChangeCallback: function() {}
});
var N = new U,
    F = new D;

function U(e, t, n) { this.x = e || 0, this.y = t || 0, this.z = n || 0 }
Object.assign(U.prototype, {
    isVector3: !0,
    set: function(e, t, n) { return this.x = e, this.y = t, this.z = n, this },
    setScalar: function(e) { return this.x = e, this.y = e, this.z = e, this },
    setX: function(e) { return this.x = e, this },
    setY: function(e) { return this.y = e, this },
    setZ: function(e) { return this.z = e, this },
    setComponent: function(e, t) {
        switch (e) {
            case 0:
                this.x = t;
                break;
            case 1:
                this.y = t;
                break;
            case 2:
                this.z = t;
                break;
            default:
                throw new Error("index is out of range: " + e)
        }
        return this
    },
    getComponent: function(e) {
        switch (e) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw new Error("index is out of range: " + e)
        }
    },
    clone: function() { return new this.constructor(this.x, this.y, this.z) },
    copy: function(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this },
    add: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this) },
    addScalar: function(e) { return this.x += e, this.y += e, this.z += e, this },
    addVectors: function(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this },
    addScaledVector: function(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this },
    sub: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this) },
    subScalar: function(e) { return this.x -= e, this.y -= e, this.z -= e, this },
    subVectors: function(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this },
    multiply: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this) },
    multiplyScalar: function(e) { return this.x *= e, this.y *= e, this.z *= e, this },
    multiplyVectors: function(e, t) { return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this },
    applyEuler: function(e) { return e && e.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(F.setFromEuler(e)) },
    applyAxisAngle: function(e, t) { return this.applyQuaternion(F.setFromAxisAngle(e, t)) },
    applyMatrix3: function(e) {
        var t = this.x,
            n = this.y,
            r = this.z,
            i = e.elements;
        return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this
    },
    applyNormalMatrix: function(e) { return this.applyMatrix3(e).normalize() },
    applyMatrix4: function(e) {
        var t = this.x,
            n = this.y,
            r = this.z,
            i = e.elements,
            a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
        return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this
    },
    applyQuaternion: function(e) {
        var t = this.x,
            n = this.y,
            r = this.z,
            i = e.x,
            a = e.y,
            o = e.z,
            s = e.w,
            c = s * t + a * r - o * n,
            u = s * n + o * t - i * r,
            l = s * r + i * n - a * t,
            h = -i * t - a * n - o * r;
        return this.x = c * s + h * -i + u * -o - l * -a, this.y = u * s + h * -a + l * -i - c * -o, this.z = l * s + h * -o + c * -a - u * -i, this
    },
    project: function(e) { return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix) },
    unproject: function(e) { return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld) },
    transformDirection: function(e) {
        var t = this.x,
            n = this.y,
            r = this.z,
            i = e.elements;
        return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize()
    },
    divide: function(e) { return this.x /= e.x, this.y /= e.y, this.z /= e.z, this },
    divideScalar: function(e) { return this.multiplyScalar(1 / e) },
    min: function(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this },
    max: function(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this },
    clamp: function(e, t) { return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this },
    clampScalar: function(e, t) { return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this },
    clampLength: function(e, t) { var n = this.length(); return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n))) },
    floor: function() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this },
    ceil: function() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this },
    round: function() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this },
    roundToZero: function() { return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this },
    negate: function() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this },
    dot: function(e) { return this.x * e.x + this.y * e.y + this.z * e.z },
    lengthSq: function() { return this.x * this.x + this.y * this.y + this.z * this.z },
    length: function() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) },
    manhattanLength: function() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) },
    normalize: function() { return this.divideScalar(this.length() || 1) },
    setLength: function(e) { return this.normalize().multiplyScalar(e) },
    lerp: function(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this },
    lerpVectors: function(e, t, n) { return this.subVectors(t, e).multiplyScalar(n).add(e) },
    cross: function(e, t) { return void 0 !== t ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t)) : this.crossVectors(this, e) },
    crossVectors: function(e, t) {
        var n = e.x,
            r = e.y,
            i = e.z,
            a = t.x,
            o = t.y,
            s = t.z;
        return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this
    },
    projectOnVector: function(e) { var t = e.lengthSq(); if (0 === t) return this.set(0, 0, 0); var n = e.dot(this) / t; return this.copy(e).multiplyScalar(n) },
    projectOnPlane: function(e) { return N.copy(this).projectOnVector(e), this.sub(N) },
    reflect: function(e) { return this.sub(N.copy(e).multiplyScalar(2 * this.dot(e))) },
    angleTo: function(e) { var t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (0 === t) return Math.PI / 2; var n = this.dot(e) / t; return Math.acos(T.clamp(n, -1, 1)) },
    distanceTo: function(e) { return Math.sqrt(this.distanceToSquared(e)) },
    distanceToSquared: function(e) {
        var t = this.x - e.x,
            n = this.y - e.y,
            r = this.z - e.z;
        return t * t + n * n + r * r
    },
    manhattanDistanceTo: function(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z) },
    setFromSpherical: function(e) { return this.setFromSphericalCoords(e.radius, e.phi, e.theta) },
    setFromSphericalCoords: function(e, t, n) { var r = Math.sin(t) * e; return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this },
    setFromCylindrical: function(e) { return this.setFromCylindricalCoords(e.radius, e.theta, e.y) },
    setFromCylindricalCoords: function(e, t, n) { return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this },
    setFromMatrixPosition: function(e) { var t = e.elements; return this.x = t[12], this.y = t[13], this.z = t[14], this },
    setFromMatrixScale: function(e) {
        var t = this.setFromMatrixColumn(e, 0).length(),
            n = this.setFromMatrixColumn(e, 1).length(),
            r = this.setFromMatrixColumn(e, 2).length();
        return this.x = t, this.y = n, this.z = r, this
    },
    setFromMatrixColumn: function(e, t) { return this.fromArray(e.elements, 4 * t) },
    setFromMatrix3Column: function(e, t) { return this.fromArray(e.elements, 3 * t) },
    equals: function(e) { return e.x === this.x && e.y === this.y && e.z === this.z },
    fromArray: function(e, t) { return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this },
    toArray: function(e, t) { return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e },
    fromBufferAttribute: function(e, t, n) { return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this }
});
var B = new U,
    k = new W,
    z = new U(0, 0, 0),
    G = new U(1, 1, 1),
    H = new U,
    j = new U,
    V = new U;

function W() { this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.") }
Object.assign(W.prototype, {
    isMatrix4: !0,
    set: function(e, t, n, r, i, a, o, s, c, u, l, h, p, d, f, m) { var v = this.elements; return v[0] = e, v[4] = t, v[8] = n, v[12] = r, v[1] = i, v[5] = a, v[9] = o, v[13] = s, v[2] = c, v[6] = u, v[10] = l, v[14] = h, v[3] = p, v[7] = d, v[11] = f, v[15] = m, this },
    identity: function() { return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this },
    clone: function() { return (new W).fromArray(this.elements) },
    copy: function(e) {
        var t = this.elements,
            n = e.elements;
        return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this
    },
    copyPosition: function(e) {
        var t = this.elements,
            n = e.elements;
        return t[12] = n[12], t[13] = n[13], t[14] = n[14], this
    },
    extractBasis: function(e, t, n) { return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this },
    makeBasis: function(e, t, n) { return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this },
    extractRotation: function(e) {
        var t = this.elements,
            n = e.elements,
            r = 1 / B.setFromMatrixColumn(e, 0).length(),
            i = 1 / B.setFromMatrixColumn(e, 1).length(),
            a = 1 / B.setFromMatrixColumn(e, 2).length();
        return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    },
    makeRotationFromEuler: function(e) {
        e && e.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var t = this.elements,
            n = e.x,
            r = e.y,
            i = e.z,
            a = Math.cos(n),
            o = Math.sin(n),
            s = Math.cos(r),
            c = Math.sin(r),
            u = Math.cos(i),
            l = Math.sin(i);
        if ("XYZ" === e.order) {
            var h = a * u,
                p = a * l,
                d = o * u,
                f = o * l;
            t[0] = s * u, t[4] = -s * l, t[8] = c, t[1] = p + d * c, t[5] = h - f * c, t[9] = -o * s, t[2] = f - h * c, t[6] = d + p * c, t[10] = a * s
        } else if ("YXZ" === e.order) {
            var m = s * u,
                v = s * l,
                g = c * u,
                y = c * l;
            t[0] = m + y * o, t[4] = g * o - v, t[8] = a * c, t[1] = a * l, t[5] = a * u, t[9] = -o, t[2] = v * o - g, t[6] = y + m * o, t[10] = a * s
        } else if ("ZXY" === e.order) m = s * u, v = s * l, g = c * u, y = c * l, t[0] = m - y * o, t[4] = -a * l, t[8] = g + v * o, t[1] = v + g * o, t[5] = a * u, t[9] = y - m * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
        else if ("ZYX" === e.order) h = a * u, p = a * l, d = o * u, f = o * l, t[0] = s * u, t[4] = d * c - p, t[8] = h * c + f, t[1] = s * l, t[5] = f * c + h, t[9] = p * c - d, t[2] = -c, t[6] = o * s, t[10] = a * s;
        else if ("YZX" === e.order) {
            var x = a * s,
                b = a * c,
                w = o * s,
                _ = o * c;
            t[0] = s * u, t[4] = _ - x * l, t[8] = w * l + b, t[1] = l, t[5] = a * u, t[9] = -o * u, t[2] = -c * u, t[6] = b * l + w, t[10] = x - _ * l
        } else "XZY" === e.order && (x = a * s, b = a * c, w = o * s, _ = o * c, t[0] = s * u, t[4] = -l, t[8] = c * u, t[1] = x * l + _, t[5] = a * u, t[9] = b * l - w, t[2] = w * l - b, t[6] = o * u, t[10] = _ * l + x);
        return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    },
    makeRotationFromQuaternion: function(e) { return this.compose(z, e, G) },
    lookAt: function(e, t, n) { var r = this.elements; return V.subVectors(e, t), 0 === V.lengthSq() && (V.z = 1), V.normalize(), H.crossVectors(n, V), 0 === H.lengthSq() && (1 === Math.abs(n.z) ? V.x += 1e-4 : V.z += 1e-4, V.normalize(), H.crossVectors(n, V)), H.normalize(), j.crossVectors(V, H), r[0] = H.x, r[4] = j.x, r[8] = V.x, r[1] = H.y, r[5] = j.y, r[9] = V.y, r[2] = H.z, r[6] = j.z, r[10] = V.z, this },
    multiply: function(e, t) { return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e) },
    premultiply: function(e) { return this.multiplyMatrices(e, this) },
    multiplyMatrices: function(e, t) {
        var n = e.elements,
            r = t.elements,
            i = this.elements,
            a = n[0],
            o = n[4],
            s = n[8],
            c = n[12],
            u = n[1],
            l = n[5],
            h = n[9],
            p = n[13],
            d = n[2],
            f = n[6],
            m = n[10],
            v = n[14],
            g = n[3],
            y = n[7],
            x = n[11],
            b = n[15],
            w = r[0],
            _ = r[4],
            M = r[8],
            S = r[12],
            T = r[1],
            E = r[5],
            A = r[9],
            L = r[13],
            R = r[2],
            P = r[6],
            C = r[10],
            O = r[14],
            I = r[3],
            D = r[7],
            N = r[11],
            F = r[15];
        return i[0] = a * w + o * T + s * R + c * I, i[4] = a * _ + o * E + s * P + c * D, i[8] = a * M + o * A + s * C + c * N, i[12] = a * S + o * L + s * O + c * F, i[1] = u * w + l * T + h * R + p * I, i[5] = u * _ + l * E + h * P + p * D, i[9] = u * M + l * A + h * C + p * N, i[13] = u * S + l * L + h * O + p * F, i[2] = d * w + f * T + m * R + v * I, i[6] = d * _ + f * E + m * P + v * D, i[10] = d * M + f * A + m * C + v * N, i[14] = d * S + f * L + m * O + v * F, i[3] = g * w + y * T + x * R + b * I, i[7] = g * _ + y * E + x * P + b * D, i[11] = g * M + y * A + x * C + b * N, i[15] = g * S + y * L + x * O + b * F, this
    },
    multiplyScalar: function(e) { var t = this.elements; return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this },
    determinant: function() {
        var e = this.elements,
            t = e[0],
            n = e[4],
            r = e[8],
            i = e[12],
            a = e[1],
            o = e[5],
            s = e[9],
            c = e[13],
            u = e[2],
            l = e[6],
            h = e[10],
            p = e[14];
        return e[3] * (+i * s * l - r * c * l - i * o * h + n * c * h + r * o * p - n * s * p) + e[7] * (+t * s * p - t * c * h + i * a * h - r * a * p + r * c * u - i * s * u) + e[11] * (+t * c * l - t * o * p - i * a * l + n * a * p + i * o * u - n * c * u) + e[15] * (-r * o * u - t * s * l + t * o * h + r * a * l - n * a * h + n * s * u)
    },
    transpose: function() { var e, t = this.elements; return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this },
    setPosition: function(e, t, n) { var r = this.elements; return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this },
    getInverse: function(e, t) {
        void 0 !== t && console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");
        var n = this.elements,
            r = e.elements,
            i = r[0],
            a = r[1],
            o = r[2],
            s = r[3],
            c = r[4],
            u = r[5],
            l = r[6],
            h = r[7],
            p = r[8],
            d = r[9],
            f = r[10],
            m = r[11],
            v = r[12],
            g = r[13],
            y = r[14],
            x = r[15],
            b = d * y * h - g * f * h + g * l * m - u * y * m - d * l * x + u * f * x,
            w = v * f * h - p * y * h - v * l * m + c * y * m + p * l * x - c * f * x,
            _ = p * g * h - v * d * h + v * u * m - c * g * m - p * u * x + c * d * x,
            M = v * d * l - p * g * l - v * u * f + c * g * f + p * u * y - c * d * y,
            S = i * b + a * w + o * _ + s * M;
        if (0 === S) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var T = 1 / S;
        return n[0] = b * T, n[1] = (g * f * s - d * y * s - g * o * m + a * y * m + d * o * x - a * f * x) * T, n[2] = (u * y * s - g * l * s + g * o * h - a * y * h - u * o * x + a * l * x) * T, n[3] = (d * l * s - u * f * s - d * o * h + a * f * h + u * o * m - a * l * m) * T, n[4] = w * T, n[5] = (p * y * s - v * f * s + v * o * m - i * y * m - p * o * x + i * f * x) * T, n[6] = (v * l * s - c * y * s - v * o * h + i * y * h + c * o * x - i * l * x) * T, n[7] = (c * f * s - p * l * s + p * o * h - i * f * h - c * o * m + i * l * m) * T, n[8] = _ * T, n[9] = (v * d * s - p * g * s - v * a * m + i * g * m + p * a * x - i * d * x) * T, n[10] = (c * g * s - v * u * s + v * a * h - i * g * h - c * a * x + i * u * x) * T, n[11] = (p * u * s - c * d * s - p * a * h + i * d * h + c * a * m - i * u * m) * T, n[12] = M * T, n[13] = (p * g * o - v * d * o + v * a * f - i * g * f - p * a * y + i * d * y) * T, n[14] = (v * u * o - c * g * o - v * a * l + i * g * l + c * a * y - i * u * y) * T, n[15] = (c * d * o - p * u * o + p * a * l - i * d * l - c * a * f + i * u * f) * T, this
    },
    scale: function(e) {
        var t = this.elements,
            n = e.x,
            r = e.y,
            i = e.z;
        return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this
    },
    getMaxScaleOnAxis: function() {
        var e = this.elements,
            t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
            n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
            r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
        return Math.sqrt(Math.max(t, n, r))
    },
    makeTranslation: function(e, t, n) { return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this },
    makeRotationX: function(e) {
        var t = Math.cos(e),
            n = Math.sin(e);
        return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this
    },
    makeRotationY: function(e) {
        var t = Math.cos(e),
            n = Math.sin(e);
        return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this
    },
    makeRotationZ: function(e) {
        var t = Math.cos(e),
            n = Math.sin(e);
        return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    makeRotationAxis: function(e, t) {
        var n = Math.cos(t),
            r = Math.sin(t),
            i = 1 - n,
            a = e.x,
            o = e.y,
            s = e.z,
            c = i * a,
            u = i * o;
        return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, u * o + n, u * s - r * a, 0, c * s - r * o, u * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this
    },
    makeScale: function(e, t, n) { return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this },
    makeShear: function(e, t, n) { return this.set(1, t, n, 0, e, 1, n, 0, e, t, 1, 0, 0, 0, 0, 1), this },
    compose: function(e, t, n) {
        var r = this.elements,
            i = t._x,
            a = t._y,
            o = t._z,
            s = t._w,
            c = i + i,
            u = a + a,
            l = o + o,
            h = i * c,
            p = i * u,
            d = i * l,
            f = a * u,
            m = a * l,
            v = o * l,
            g = s * c,
            y = s * u,
            x = s * l,
            b = n.x,
            w = n.y,
            _ = n.z;
        return r[0] = (1 - (f + v)) * b, r[1] = (p + x) * b, r[2] = (d - y) * b, r[3] = 0, r[4] = (p - x) * w, r[5] = (1 - (h + v)) * w, r[6] = (m + g) * w, r[7] = 0, r[8] = (d + y) * _, r[9] = (m - g) * _, r[10] = (1 - (h + f)) * _, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this
    },
    decompose: function(e, t, n) {
        var r = this.elements,
            i = B.set(r[0], r[1], r[2]).length(),
            a = B.set(r[4], r[5], r[6]).length(),
            o = B.set(r[8], r[9], r[10]).length();
        this.determinant() < 0 && (i = -i), e.x = r[12], e.y = r[13], e.z = r[14], k.copy(this);
        var s = 1 / i,
            c = 1 / a,
            u = 1 / o;
        return k.elements[0] *= s, k.elements[1] *= s, k.elements[2] *= s, k.elements[4] *= c, k.elements[5] *= c, k.elements[6] *= c, k.elements[8] *= u, k.elements[9] *= u, k.elements[10] *= u, t.setFromRotationMatrix(k), n.x = i, n.y = a, n.z = o, this
    },
    makePerspective: function(e, t, n, r, i, a) {
        void 0 === a && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
        var o = this.elements,
            s = 2 * i / (t - e),
            c = 2 * i / (n - r),
            u = (t + e) / (t - e),
            l = (n + r) / (n - r),
            h = -(a + i) / (a - i),
            p = -2 * a * i / (a - i);
        return o[0] = s, o[4] = 0, o[8] = u, o[12] = 0, o[1] = 0, o[5] = c, o[9] = l, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = h, o[14] = p, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
    },
    makeOrthographic: function(e, t, n, r, i, a) {
        var o = this.elements,
            s = 1 / (t - e),
            c = 1 / (n - r),
            u = 1 / (a - i),
            l = (t + e) * s,
            h = (n + r) * c,
            p = (a + i) * u;
        return o[0] = 2 * s, o[4] = 0, o[8] = 0, o[12] = -l, o[1] = 0, o[5] = 2 * c, o[9] = 0, o[13] = -h, o[2] = 0, o[6] = 0, o[10] = -2 * u, o[14] = -p, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
    },
    equals: function(e) {
        for (var t = this.elements, n = e.elements, r = 0; r < 16; r++)
            if (t[r] !== n[r]) return !1;
        return !0
    },
    fromArray: function(e, t) { void 0 === t && (t = 0); for (var n = 0; n < 16; n++) this.elements[n] = e[n + t]; return this },
    toArray: function(e, t) { void 0 === e && (e = []), void 0 === t && (t = 0); var n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e }
});
var q = new W,
    X = new D;

function Y(e, t, n, r) { this._x = e || 0, this._y = t || 0, this._z = n || 0, this._order = r || Y.DefaultOrder }

function Z() { this.mask = 1 }
Y.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], Y.DefaultOrder = "XYZ", Object.defineProperties(Y.prototype, { x: { get: function() { return this._x }, set: function(e) { this._x = e, this._onChangeCallback() } }, y: { get: function() { return this._y }, set: function(e) { this._y = e, this._onChangeCallback() } }, z: { get: function() { return this._z }, set: function(e) { this._z = e, this._onChangeCallback() } }, order: { get: function() { return this._order }, set: function(e) { this._order = e, this._onChangeCallback() } } }), Object.assign(Y.prototype, {
    isEuler: !0,
    set: function(e, t, n, r) { return this._x = e, this._y = t, this._z = n, this._order = r || this._order, this._onChangeCallback(), this },
    clone: function() { return new this.constructor(this._x, this._y, this._z, this._order) },
    copy: function(e) { return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this },
    setFromRotationMatrix: function(e, t, n) {
        var r = T.clamp,
            i = e.elements,
            a = i[0],
            o = i[4],
            s = i[8],
            c = i[1],
            u = i[5],
            l = i[9],
            h = i[2],
            p = i[6],
            d = i[10];
        return "XYZ" === (t = t || this._order) ? (this._y = Math.asin(r(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, d), this._z = Math.atan2(-o, a)) : (this._x = Math.atan2(p, u), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-r(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(s, d), this._z = Math.atan2(c, u)) : (this._y = Math.atan2(-h, a), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(r(p, -1, 1)), Math.abs(p) < .9999999 ? (this._y = Math.atan2(-h, d), this._z = Math.atan2(-o, u)) : (this._y = 0, this._z = Math.atan2(c, a))) : "ZYX" === t ? (this._y = Math.asin(-r(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(p, d), this._z = Math.atan2(c, a)) : (this._x = 0, this._z = Math.atan2(-o, u))) : "YZX" === t ? (this._z = Math.asin(r(c, -1, 1)), Math.abs(c) < .9999999 ? (this._x = Math.atan2(-l, u), this._y = Math.atan2(-h, a)) : (this._x = 0, this._y = Math.atan2(s, d))) : "XZY" === t ? (this._z = Math.asin(-r(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(p, u), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-l, d), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, !1 !== n && this._onChangeCallback(), this
    },
    setFromQuaternion: function(e, t, n) { return q.makeRotationFromQuaternion(e), this.setFromRotationMatrix(q, t, n) },
    setFromVector3: function(e, t) { return this.set(e.x, e.y, e.z, t || this._order) },
    reorder: function(e) { return X.setFromEuler(this), this.setFromQuaternion(X, e) },
    equals: function(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order },
    fromArray: function(e) { return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this },
    toArray: function(e, t) { return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e },
    toVector3: function(e) { return e ? e.set(this._x, this._y, this._z) : new U(this._x, this._y, this._z) },
    _onChange: function(e) { return this._onChangeCallback = e, this },
    _onChangeCallback: function() {}
}), Object.assign(Z.prototype, { set: function(e) { this.mask = 1 << e | 0 }, enable: function(e) { this.mask |= 1 << e | 0 }, enableAll: function() { this.mask = -1 }, toggle: function(e) { this.mask ^= 1 << e | 0 }, disable: function(e) { this.mask &= ~(1 << e | 0) }, disableAll: function() { this.mask = 0 }, test: function(e) { return 0 != (this.mask & e.mask) } });
var J = 0,
    K = new U,
    Q = new D,
    $ = new W,
    ee = new U,
    te = new U,
    ne = new U,
    re = new D,
    ie = new U(1, 0, 0),
    ae = new U(0, 1, 0),
    oe = new U(0, 0, 1),
    se = { type: "added" },
    ce = { type: "removed" };

function ue() {
    Object.defineProperty(this, "id", { value: J++ }), this.uuid = T.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ue.DefaultUp.clone();
    var e = new U,
        t = new Y,
        n = new D,
        r = new U(1, 1, 1);
    t._onChange((function() { n.setFromEuler(t, !1) })), n._onChange((function() { t.setFromQuaternion(n, void 0, !1) })), Object.defineProperties(this, { position: { configurable: !0, enumerable: !0, value: e }, rotation: { configurable: !0, enumerable: !0, value: t }, quaternion: { configurable: !0, enumerable: !0, value: n }, scale: { configurable: !0, enumerable: !0, value: r }, modelViewMatrix: { value: new W }, normalMatrix: { value: new A } }), this.matrix = new W, this.matrixWorld = new W, this.matrixAutoUpdate = ue.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new Z, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
}

function le() { ue.call(this), this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })) }
ue.DefaultUp = new U(0, 1, 0), ue.DefaultMatrixAutoUpdate = !0, ue.prototype = Object.assign(Object.create(w.prototype), {
    constructor: ue,
    isObject3D: !0,
    onBeforeRender: function() {},
    onAfterRender: function() {},
    applyMatrix4: function(e) { this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale) },
    applyQuaternion: function(e) { return this.quaternion.premultiply(e), this },
    setRotationFromAxisAngle: function(e, t) { this.quaternion.setFromAxisAngle(e, t) },
    setRotationFromEuler: function(e) { this.quaternion.setFromEuler(e, !0) },
    setRotationFromMatrix: function(e) { this.quaternion.setFromRotationMatrix(e) },
    setRotationFromQuaternion: function(e) { this.quaternion.copy(e) },
    rotateOnAxis: function(e, t) { return Q.setFromAxisAngle(e, t), this.quaternion.multiply(Q), this },
    rotateOnWorldAxis: function(e, t) { return Q.setFromAxisAngle(e, t), this.quaternion.premultiply(Q), this },
    rotateX: function(e) { return this.rotateOnAxis(ie, e) },
    rotateY: function(e) { return this.rotateOnAxis(ae, e) },
    rotateZ: function(e) { return this.rotateOnAxis(oe, e) },
    translateOnAxis: function(e, t) { return K.copy(e).applyQuaternion(this.quaternion), this.position.add(K.multiplyScalar(t)), this },
    translateX: function(e) { return this.translateOnAxis(ie, e) },
    translateY: function(e) { return this.translateOnAxis(ae, e) },
    translateZ: function(e) { return this.translateOnAxis(oe, e) },
    localToWorld: function(e) { return e.applyMatrix4(this.matrixWorld) },
    worldToLocal: function(e) { return e.applyMatrix4($.getInverse(this.matrixWorld)) },
    lookAt: function(e, t, n) {
        e.isVector3 ? ee.copy(e) : ee.set(e, t, n);
        var r = this.parent;
        this.updateWorldMatrix(!0, !1), te.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? $.lookAt(te, ee, this.up) : $.lookAt(ee, te, this.up), this.quaternion.setFromRotationMatrix($), r && ($.extractRotation(r.matrixWorld), Q.setFromRotationMatrix($), this.quaternion.premultiply(Q.inverse()))
    },
    add: function(e) { var t = arguments; if (arguments.length > 1) { for (var n = 0; n < arguments.length; n++) this.add(t[n]); return this } return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(se)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this) },
    remove: function(e) { var t = arguments; if (arguments.length > 1) { for (var n = 0; n < arguments.length; n++) this.remove(t[n]); return this } var r = this.children.indexOf(e); return -1 !== r && (e.parent = null, this.children.splice(r, 1), e.dispatchEvent(ce)), this },
    attach: function(e) { return this.updateWorldMatrix(!0, !1), $.getInverse(this.matrixWorld), null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), $.multiply(e.parent.matrixWorld)), e.applyMatrix4($), e.updateWorldMatrix(!1, !1), this.add(e), this },
    getObjectById: function(e) { return this.getObjectByProperty("id", e) },
    getObjectByName: function(e) { return this.getObjectByProperty("name", e) },
    getObjectByProperty: function(e, t) { if (this[e] === t) return this; for (var n = 0, r = this.children.length; n < r; n++) { var i = this.children[n].getObjectByProperty(e, t); if (void 0 !== i) return i } },
    getWorldPosition: function(e) { return void 0 === e && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), e = new U), this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld) },
    getWorldQuaternion: function(e) { return void 0 === e && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), e = new D), this.updateMatrixWorld(!0), this.matrixWorld.decompose(te, e, ne), e },
    getWorldScale: function(e) { return void 0 === e && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), e = new U), this.updateMatrixWorld(!0), this.matrixWorld.decompose(te, re, e), e },
    getWorldDirection: function(e) { void 0 === e && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), e = new U), this.updateMatrixWorld(!0); var t = this.matrixWorld.elements; return e.set(t[8], t[9], t[10]).normalize() },
    raycast: function() {},
    traverse: function(e) { e(this); for (var t = this.children, n = 0, r = t.length; n < r; n++) t[n].traverse(e) },
    traverseVisible: function(e) { if (!1 !== this.visible) { e(this); for (var t = this.children, n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e) } },
    traverseAncestors: function(e) {
        var t = this.parent;
        null !== t && (e(t), t.traverseAncestors(e))
    },
    updateMatrix: function() { this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0 },
    updateMatrixWorld: function(e) { this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0); for (var t = this.children, n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e) },
    updateWorldMatrix: function(e, t) {
        var n = this.parent;
        if (!0 === e && null !== n && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === t)
            for (var r = this.children, i = 0, a = r.length; i < a; i++) r[i].updateWorldMatrix(!1, !0)
    },
    toJSON: function(e) {
        var t = void 0 === e || "string" == typeof e,
            n = {};
        t && (e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {} }, n.metadata = { version: 4.5, type: "Object", generator: "Object3D.toJSON" });
        var r = {};

        function i(t, n) { return void 0 === t[n.uuid] && (t[n.uuid] = n.toJSON(e)), n.uuid }
        if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), !0 === this.castShadow && (r.castShadow = !0), !0 === this.receiveShadow && (r.receiveShadow = !0), !1 === this.visible && (r.visible = !1), !1 === this.frustumCulled && (r.frustumCulled = !1), 0 !== this.renderOrder && (r.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON()), this.isMesh || this.isLine || this.isPoints) {
            r.geometry = i(e.geometries, this.geometry);
            var a = this.geometry.parameters;
            if (void 0 !== a && void 0 !== a.shapes) {
                var o = a.shapes;
                if (Array.isArray(o))
                    for (var s = 0, c = o.length; s < c; s++) {
                        var u = o[s];
                        i(e.shapes, u)
                    } else i(e.shapes, o)
            }
        }
        if (void 0 !== this.material)
            if (Array.isArray(this.material)) {
                var l = [];
                for (s = 0, c = this.material.length; s < c; s++) l.push(i(e.materials, this.material[s]));
                r.material = l
            } else r.material = i(e.materials, this.material);
        if (this.children.length > 0)
            for (r.children = [], s = 0; s < this.children.length; s++) r.children.push(this.children[s].toJSON(e).object);
        if (t) {
            var h = m(e.geometries),
                p = m(e.materials),
                d = m(e.textures),
                f = m(e.images);
            o = m(e.shapes), h.length > 0 && (n.geometries = h), p.length > 0 && (n.materials = p), d.length > 0 && (n.textures = d), f.length > 0 && (n.images = f), o.length > 0 && (n.shapes = o)
        }
        return n.object = r, n;

        function m(e) {
            var t = [];
            for (var n in e) {
                var r = e[n];
                delete r.metadata, t.push(r)
            }
            return t
        }
    },
    clone: function(e) { return (new this.constructor).copy(this, e) },
    copy: function(e, t) {
        if (void 0 === t && (t = !0), this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t)
            for (var n = 0; n < e.children.length; n++) {
                var r = e.children[n];
                this.add(r.clone())
            }
        return this
    }
}), le.prototype = Object.assign(Object.create(ue.prototype), { constructor: le, isScene: !0, copy: function(e, t) { return ue.prototype.copy.call(this, e, t), null !== e.background && (this.background = e.background.clone()), null !== e.environment && (this.environment = e.environment.clone()), null !== e.fog && (this.fog = e.fog.clone()), null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.autoUpdate = e.autoUpdate, this.matrixAutoUpdate = e.matrixAutoUpdate, this }, toJSON: function(e) { var t = ue.prototype.toJSON.call(this, e); return null !== this.background && (t.object.background = this.background.toJSON(e)), null !== this.environment && (t.object.environment = this.environment.toJSON(e)), null !== this.fog && (t.object.fog = this.fog.toJSON()), t }, dispose: function() { this.dispatchEvent({ type: "dispose" }) } });
var he = [new U, new U, new U, new U, new U, new U, new U, new U],
    pe = new U,
    de = new Se,
    fe = new U,
    me = new U,
    ve = new U,
    ge = new U,
    ye = new U,
    xe = new U,
    be = new U,
    we = new U,
    _e = new U,
    Me = new U;

function Se(e, t) { this.min = void 0 !== e ? e : new U(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new U(-1 / 0, -1 / 0, -1 / 0) }

function Te(e, t, n, r, i) {
    var a, o;
    for (a = 0, o = e.length - 3; a <= o; a += 3) {
        Me.fromArray(e, a);
        var s = i.x * Math.abs(Me.x) + i.y * Math.abs(Me.y) + i.z * Math.abs(Me.z),
            c = t.dot(Me),
            u = n.dot(Me),
            l = r.dot(Me);
        if (Math.max(-Math.max(c, u, l), Math.min(c, u, l)) > s) return !1
    }
    return !0
}
Object.assign(Se.prototype, {
    isBox3: !0,
    set: function(e, t) { return this.min.copy(e), this.max.copy(t), this },
    setFromArray: function(e) {
        for (var t = 1 / 0, n = 1 / 0, r = 1 / 0, i = -1 / 0, a = -1 / 0, o = -1 / 0, s = 0, c = e.length; s < c; s += 3) {
            var u = e[s],
                l = e[s + 1],
                h = e[s + 2];
            u < t && (t = u), l < n && (n = l), h < r && (r = h), u > i && (i = u), l > a && (a = l), h > o && (o = h)
        }
        return this.min.set(t, n, r), this.max.set(i, a, o), this
    },
    setFromBufferAttribute: function(e) {
        for (var t = 1 / 0, n = 1 / 0, r = 1 / 0, i = -1 / 0, a = -1 / 0, o = -1 / 0, s = 0, c = e.count; s < c; s++) {
            var u = e.getX(s),
                l = e.getY(s),
                h = e.getZ(s);
            u < t && (t = u), l < n && (n = l), h < r && (r = h), u > i && (i = u), l > a && (a = l), h > o && (o = h)
        }
        return this.min.set(t, n, r), this.max.set(i, a, o), this
    },
    setFromPoints: function(e) { this.makeEmpty(); for (var t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]); return this },
    setFromCenterAndSize: function(e, t) { var n = pe.copy(t).multiplyScalar(.5); return this.min.copy(e).sub(n), this.max.copy(e).add(n), this },
    setFromObject: function(e) { return this.makeEmpty(), this.expandByObject(e) },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.min.copy(e.min), this.max.copy(e.max), this },
    makeEmpty: function() { return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this },
    isEmpty: function() { return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z },
    getCenter: function(e) { return void 0 === e && (console.warn("THREE.Box3: .getCenter() target is now required"), e = new U), this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) },
    getSize: function(e) { return void 0 === e && (console.warn("THREE.Box3: .getSize() target is now required"), e = new U), this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min) },
    expandByPoint: function(e) { return this.min.min(e), this.max.max(e), this },
    expandByVector: function(e) { return this.min.sub(e), this.max.add(e), this },
    expandByScalar: function(e) { return this.min.addScalar(-e), this.max.addScalar(e), this },
    expandByObject: function(e) {
        e.updateWorldMatrix(!1, !1);
        var t = e.geometry;
        void 0 !== t && (null === t.boundingBox && t.computeBoundingBox(), de.copy(t.boundingBox), de.applyMatrix4(e.matrixWorld), this.union(de));
        for (var n = e.children, r = 0, i = n.length; r < i; r++) this.expandByObject(n[r]);
        return this
    },
    containsPoint: function(e) { return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z) },
    containsBox: function(e) { return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z },
    getParameter: function(e, t) { return void 0 === t && (console.warn("THREE.Box3: .getParameter() target is now required"), t = new U), t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z)) },
    intersectsBox: function(e) { return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z) },
    intersectsSphere: function(e) { return this.clampPoint(e.center, pe), pe.distanceToSquared(e.center) <= e.radius * e.radius },
    intersectsPlane: function(e) { var t, n; return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant },
    intersectsTriangle: function(e) {
        if (this.isEmpty()) return !1;
        this.getCenter(be), we.subVectors(this.max, be), fe.subVectors(e.a, be), me.subVectors(e.b, be), ve.subVectors(e.c, be), ge.subVectors(me, fe), ye.subVectors(ve, me), xe.subVectors(fe, ve);
        var t = [0, -ge.z, ge.y, 0, -ye.z, ye.y, 0, -xe.z, xe.y, ge.z, 0, -ge.x, ye.z, 0, -ye.x, xe.z, 0, -xe.x, -ge.y, ge.x, 0, -ye.y, ye.x, 0, -xe.y, xe.x, 0];
        return !!Te(t, fe, me, ve, we) && !!Te(t = [1, 0, 0, 0, 1, 0, 0, 0, 1], fe, me, ve, we) && (_e.crossVectors(ge, ye), Te(t = [_e.x, _e.y, _e.z], fe, me, ve, we))
    },
    clampPoint: function(e, t) { return void 0 === t && (console.warn("THREE.Box3: .clampPoint() target is now required"), t = new U), t.copy(e).clamp(this.min, this.max) },
    distanceToPoint: function(e) { return pe.copy(e).clamp(this.min, this.max).sub(e).length() },
    getBoundingSphere: function(e) { return void 0 === e && console.error("THREE.Box3: .getBoundingSphere() target is now required"), this.getCenter(e.center), e.radius = .5 * this.getSize(pe).length(), e },
    intersect: function(e) { return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this },
    union: function(e) { return this.min.min(e.min), this.max.max(e.max), this },
    applyMatrix4: function(e) { return this.isEmpty() || (he[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), he[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), he[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), he[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), he[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), he[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), he[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), he[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(he)), this },
    translate: function(e) { return this.min.add(e), this.max.add(e), this },
    equals: function(e) { return e.min.equals(this.min) && e.max.equals(this.max) }
});
var Ee = new Se;

function Ae(e, t) { this.center = void 0 !== e ? e : new U, this.radius = void 0 !== t ? t : 0 }
Object.assign(Ae.prototype, {
    set: function(e, t) { return this.center.copy(e), this.radius = t, this },
    setFromPoints: function(e, t) {
        var n = this.center;
        void 0 !== t ? n.copy(t) : Ee.setFromPoints(e).getCenter(n);
        for (var r = 0, i = 0, a = e.length; i < a; i++) r = Math.max(r, n.distanceToSquared(e[i]));
        return this.radius = Math.sqrt(r), this
    },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.center.copy(e.center), this.radius = e.radius, this },
    empty: function() { return this.radius <= 0 },
    containsPoint: function(e) { return e.distanceToSquared(this.center) <= this.radius * this.radius },
    distanceToPoint: function(e) { return e.distanceTo(this.center) - this.radius },
    intersectsSphere: function(e) { var t = this.radius + e.radius; return e.center.distanceToSquared(this.center) <= t * t },
    intersectsBox: function(e) { return e.intersectsSphere(this) },
    intersectsPlane: function(e) { return Math.abs(e.distanceToPoint(this.center)) <= this.radius },
    clampPoint: function(e, t) { var n = this.center.distanceToSquared(e); return void 0 === t && (console.warn("THREE.Sphere: .clampPoint() target is now required"), t = new U), t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t },
    getBoundingBox: function(e) { return void 0 === e && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), e = new Se), e.set(this.center, this.center), e.expandByScalar(this.radius), e },
    applyMatrix4: function(e) { return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this },
    translate: function(e) { return this.center.add(e), this },
    equals: function(e) { return e.center.equals(this.center) && e.radius === this.radius }
});
var Le = new U,
    Re = new U,
    Pe = new U,
    Ce = new U,
    Oe = new U,
    Ie = new U,
    De = new U;

function Ne(e, t) { this.origin = void 0 !== e ? e : new U, this.direction = void 0 !== t ? t : new U(0, 0, -1) }
Object.assign(Ne.prototype, {
    set: function(e, t) { return this.origin.copy(e), this.direction.copy(t), this },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.origin.copy(e.origin), this.direction.copy(e.direction), this },
    at: function(e, t) { return void 0 === t && (console.warn("THREE.Ray: .at() target is now required"), t = new U), t.copy(this.direction).multiplyScalar(e).add(this.origin) },
    lookAt: function(e) { return this.direction.copy(e).sub(this.origin).normalize(), this },
    recast: function(e) { return this.origin.copy(this.at(e, Le)), this },
    closestPointToPoint: function(e, t) { void 0 === t && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), t = new U), t.subVectors(e, this.origin); var n = t.dot(this.direction); return n < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(n).add(this.origin) },
    distanceToPoint: function(e) { return Math.sqrt(this.distanceSqToPoint(e)) },
    distanceSqToPoint: function(e) { var t = Le.subVectors(e, this.origin).dot(this.direction); return t < 0 ? this.origin.distanceToSquared(e) : (Le.copy(this.direction).multiplyScalar(t).add(this.origin), Le.distanceToSquared(e)) },
    distanceSqToSegment: function(e, t, n, r) {
        Re.copy(e).add(t).multiplyScalar(.5), Pe.copy(t).sub(e).normalize(), Ce.copy(this.origin).sub(Re);
        var i, a, o, s, c = .5 * e.distanceTo(t),
            u = -this.direction.dot(Pe),
            l = Ce.dot(this.direction),
            h = -Ce.dot(Pe),
            p = Ce.lengthSq(),
            d = Math.abs(1 - u * u);
        if (d > 0)
            if (a = u * l - h, s = c * d, (i = u * h - l) >= 0)
                if (a >= -s)
                    if (a <= s) {
                        var f = 1 / d;
                        o = (i *= f) * (i + u * (a *= f) + 2 * l) + a * (u * i + a + 2 * h) + p
                    } else a = c, o = -(i = Math.max(0, -(u * a + l))) * i + a * (a + 2 * h) + p;
        else a = -c, o = -(i = Math.max(0, -(u * a + l))) * i + a * (a + 2 * h) + p;
        else a <= -s ? o = -(i = Math.max(0, -(-u * c + l))) * i + (a = i > 0 ? -c : Math.min(Math.max(-c, -h), c)) * (a + 2 * h) + p : a <= s ? (i = 0, o = (a = Math.min(Math.max(-c, -h), c)) * (a + 2 * h) + p) : o = -(i = Math.max(0, -(u * c + l))) * i + (a = i > 0 ? c : Math.min(Math.max(-c, -h), c)) * (a + 2 * h) + p;
        else a = u > 0 ? -c : c, o = -(i = Math.max(0, -(u * a + l))) * i + a * (a + 2 * h) + p;
        return n && n.copy(this.direction).multiplyScalar(i).add(this.origin), r && r.copy(Pe).multiplyScalar(a).add(Re), o
    },
    intersectSphere: function(e, t) {
        Le.subVectors(e.center, this.origin);
        var n = Le.dot(this.direction),
            r = Le.dot(Le) - n * n,
            i = e.radius * e.radius;
        if (r > i) return null;
        var a = Math.sqrt(i - r),
            o = n - a,
            s = n + a;
        return o < 0 && s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t)
    },
    intersectsSphere: function(e) { return this.distanceSqToPoint(e.center) <= e.radius * e.radius },
    distanceToPlane: function(e) { var t = e.normal.dot(this.direction); if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null; var n = -(this.origin.dot(e.normal) + e.constant) / t; return n >= 0 ? n : null },
    intersectPlane: function(e, t) { var n = this.distanceToPlane(e); return null === n ? null : this.at(n, t) },
    intersectsPlane: function(e) { var t = e.distanceToPoint(this.origin); return 0 === t || e.normal.dot(this.direction) * t < 0 },
    intersectBox: function(e, t) {
        var n, r, i, a, o, s, c = 1 / this.direction.x,
            u = 1 / this.direction.y,
            l = 1 / this.direction.z,
            h = this.origin;
        return c >= 0 ? (n = (e.min.x - h.x) * c, r = (e.max.x - h.x) * c) : (n = (e.max.x - h.x) * c, r = (e.min.x - h.x) * c), u >= 0 ? (i = (e.min.y - h.y) * u, a = (e.max.y - h.y) * u) : (i = (e.max.y - h.y) * u, a = (e.min.y - h.y) * u), n > a || i > r ? null : ((i > n || n != n) && (n = i), (a < r || r != r) && (r = a), l >= 0 ? (o = (e.min.z - h.z) * l, s = (e.max.z - h.z) * l) : (o = (e.max.z - h.z) * l, s = (e.min.z - h.z) * l), n > s || o > r ? null : ((o > n || n != n) && (n = o), (s < r || r != r) && (r = s), r < 0 ? null : this.at(n >= 0 ? n : r, t)))
    },
    intersectsBox: function(e) { return null !== this.intersectBox(e, Le) },
    intersectTriangle: function(e, t, n, r, i) {
        Oe.subVectors(t, e), Ie.subVectors(n, e), De.crossVectors(Oe, Ie);
        var a, o = this.direction.dot(De);
        if (o > 0) {
            if (r) return null;
            a = 1
        } else {
            if (!(o < 0)) return null;
            a = -1, o = -o
        }
        Ce.subVectors(this.origin, e);
        var s = a * this.direction.dot(Ie.crossVectors(Ce, Ie));
        if (s < 0) return null;
        var c = a * this.direction.dot(Oe.cross(Ce));
        if (c < 0) return null;
        if (s + c > o) return null;
        var u = -a * Ce.dot(De);
        return u < 0 ? null : this.at(u / o, i)
    },
    applyMatrix4: function(e) { return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this },
    equals: function(e) { return e.origin.equals(this.origin) && e.direction.equals(this.direction) }
});
var Fe = new U,
    Ue = new U,
    Be = new A;

function ke(e, t) { this.normal = void 0 !== e ? e : new U(1, 0, 0), this.constant = void 0 !== t ? t : 0 }
Object.assign(ke.prototype, {
    isPlane: !0,
    set: function(e, t) { return this.normal.copy(e), this.constant = t, this },
    setComponents: function(e, t, n, r) { return this.normal.set(e, t, n), this.constant = r, this },
    setFromNormalAndCoplanarPoint: function(e, t) { return this.normal.copy(e), this.constant = -t.dot(this.normal), this },
    setFromCoplanarPoints: function(e, t, n) { var r = Fe.subVectors(n, t).cross(Ue.subVectors(e, t)).normalize(); return this.setFromNormalAndCoplanarPoint(r, e), this },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.normal.copy(e.normal), this.constant = e.constant, this },
    normalize: function() { var e = 1 / this.normal.length(); return this.normal.multiplyScalar(e), this.constant *= e, this },
    negate: function() { return this.constant *= -1, this.normal.negate(), this },
    distanceToPoint: function(e) { return this.normal.dot(e) + this.constant },
    distanceToSphere: function(e) { return this.distanceToPoint(e.center) - e.radius },
    projectPoint: function(e, t) { return void 0 === t && (console.warn("THREE.Plane: .projectPoint() target is now required"), t = new U), t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e) },
    intersectLine: function(e, t) {
        void 0 === t && (console.warn("THREE.Plane: .intersectLine() target is now required"), t = new U);
        var n = e.delta(Fe),
            r = this.normal.dot(n);
        if (0 === r) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : void 0;
        var i = -(e.start.dot(this.normal) + this.constant) / r;
        return i < 0 || i > 1 ? void 0 : t.copy(n).multiplyScalar(i).add(e.start)
    },
    intersectsLine: function(e) {
        var t = this.distanceToPoint(e.start),
            n = this.distanceToPoint(e.end);
        return t < 0 && n > 0 || n < 0 && t > 0
    },
    intersectsBox: function(e) { return e.intersectsPlane(this) },
    intersectsSphere: function(e) { return e.intersectsPlane(this) },
    coplanarPoint: function(e) { return void 0 === e && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), e = new U), e.copy(this.normal).multiplyScalar(-this.constant) },
    applyMatrix4: function(e, t) {
        var n = t || Be.getNormalMatrix(e),
            r = this.coplanarPoint(Fe).applyMatrix4(e),
            i = this.normal.applyMatrix3(n).normalize();
        return this.constant = -r.dot(i), this
    },
    translate: function(e) { return this.constant -= e.dot(this.normal), this },
    equals: function(e) { return e.normal.equals(this.normal) && e.constant === this.constant }
});
var ze = new U,
    Ge = new U,
    He = new U,
    je = new U,
    Ve = new U,
    We = new U,
    qe = new U,
    Xe = new U,
    Ye = new U,
    Ze = new U;

function Je(e, t, n) { this.a = void 0 !== e ? e : new U, this.b = void 0 !== t ? t : new U, this.c = void 0 !== n ? n : new U }
Object.assign(Je, {
    getNormal: function(e, t, n, r) { void 0 === r && (console.warn("THREE.Triangle: .getNormal() target is now required"), r = new U), r.subVectors(n, t), ze.subVectors(e, t), r.cross(ze); var i = r.lengthSq(); return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0) },
    getBarycoord: function(e, t, n, r, i) {
        ze.subVectors(r, t), Ge.subVectors(n, t), He.subVectors(e, t);
        var a = ze.dot(ze),
            o = ze.dot(Ge),
            s = ze.dot(He),
            c = Ge.dot(Ge),
            u = Ge.dot(He),
            l = a * c - o * o;
        if (void 0 === i && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), i = new U), 0 === l) return i.set(-2, -1, -1);
        var h = 1 / l,
            p = (c * s - o * u) * h,
            d = (a * u - o * s) * h;
        return i.set(1 - p - d, d, p)
    },
    containsPoint: function(e, t, n, r) { return Je.getBarycoord(e, t, n, r, je), je.x >= 0 && je.y >= 0 && je.x + je.y <= 1 },
    getUV: function(e, t, n, r, i, a, o, s) { return this.getBarycoord(e, t, n, r, je), s.set(0, 0), s.addScaledVector(i, je.x), s.addScaledVector(a, je.y), s.addScaledVector(o, je.z), s },
    isFrontFacing: function(e, t, n, r) { return ze.subVectors(n, t), Ge.subVectors(e, t), ze.cross(Ge).dot(r) < 0 }
}), Object.assign(Je.prototype, {
    set: function(e, t, n) { return this.a.copy(e), this.b.copy(t), this.c.copy(n), this },
    setFromPointsAndIndices: function(e, t, n, r) { return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this },
    getArea: function() { return ze.subVectors(this.c, this.b), Ge.subVectors(this.a, this.b), .5 * ze.cross(Ge).length() },
    getMidpoint: function(e) { return void 0 === e && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), e = new U), e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3) },
    getNormal: function(e) { return Je.getNormal(this.a, this.b, this.c, e) },
    getPlane: function(e) { return void 0 === e && (console.warn("THREE.Triangle: .getPlane() target is now required"), e = new ke), e.setFromCoplanarPoints(this.a, this.b, this.c) },
    getBarycoord: function(e, t) { return Je.getBarycoord(e, this.a, this.b, this.c, t) },
    getUV: function(e, t, n, r, i) { return Je.getUV(e, this.a, this.b, this.c, t, n, r, i) },
    containsPoint: function(e) { return Je.containsPoint(e, this.a, this.b, this.c) },
    isFrontFacing: function(e) { return Je.isFrontFacing(this.a, this.b, this.c, e) },
    intersectsBox: function(e) { return e.intersectsTriangle(this) },
    closestPointToPoint: function(e, t) {
        void 0 === t && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), t = new U);
        var n, r, i = this.a,
            a = this.b,
            o = this.c;
        Ve.subVectors(a, i), We.subVectors(o, i), Xe.subVectors(e, i);
        var s = Ve.dot(Xe),
            c = We.dot(Xe);
        if (s <= 0 && c <= 0) return t.copy(i);
        Ye.subVectors(e, a);
        var u = Ve.dot(Ye),
            l = We.dot(Ye);
        if (u >= 0 && l <= u) return t.copy(a);
        var h = s * l - u * c;
        if (h <= 0 && s >= 0 && u <= 0) return n = s / (s - u), t.copy(i).addScaledVector(Ve, n);
        Ze.subVectors(e, o);
        var p = Ve.dot(Ze),
            d = We.dot(Ze);
        if (d >= 0 && p <= d) return t.copy(o);
        var f = p * c - s * d;
        if (f <= 0 && c >= 0 && d <= 0) return r = c / (c - d), t.copy(i).addScaledVector(We, r);
        var m = u * d - p * l;
        if (m <= 0 && l - u >= 0 && p - d >= 0) return qe.subVectors(o, a), r = (l - u) / (l - u + (p - d)), t.copy(a).addScaledVector(qe, r);
        var v = 1 / (m + f + h);
        return n = f * v, r = h * v, t.copy(i).addScaledVector(Ve, n).addScaledVector(We, r)
    },
    equals: function(e) { return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c) }
});
var Ke = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 },
    Qe = { h: 0, s: 0, l: 0 },
    $e = { h: 0, s: 0, l: 0 };

function et(e, t, n) { return void 0 === t && void 0 === n ? this.set(e) : this.setRGB(e, t, n) }

function tt(e, t, n) { return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - n) : e }

function nt(e) { return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4) }

function rt(e) { return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055 }

function it(e, t, n, r, i, a) { this.a = e, this.b = t, this.c = n, this.normal = r && r.isVector3 ? r : new U, this.vertexNormals = Array.isArray(r) ? r : [], this.color = i && i.isColor ? i : new et, this.vertexColors = Array.isArray(i) ? i : [], this.materialIndex = void 0 !== a ? a : 0 }
Object.assign(et.prototype, {
    isColor: !0,
    r: 1,
    g: 1,
    b: 1,
    set: function(e) { return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this },
    setScalar: function(e) { return this.r = e, this.g = e, this.b = e, this },
    setHex: function(e) { return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this },
    setRGB: function(e, t, n) { return this.r = e, this.g = t, this.b = n, this },
    setHSL: function(e, t, n) {
        if (e = T.euclideanModulo(e, 1), t = T.clamp(t, 0, 1), n = T.clamp(n, 0, 1), 0 === t) this.r = this.g = this.b = n;
        else {
            var r = n <= .5 ? n * (1 + t) : n + t - n * t,
                i = 2 * n - r;
            this.r = tt(i, r, e + 1 / 3), this.g = tt(i, r, e), this.b = tt(i, r, e - 1 / 3)
        }
        return this
    },
    setStyle: function(e) {
        function t(t) { void 0 !== t && parseFloat(t) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.") }
        var n;
        if (n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e)) {
            var r, i = n[1],
                a = n[2];
            switch (i) {
                case "rgb":
                case "rgba":
                    if (r = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(255, parseInt(r[1], 10)) / 255, this.g = Math.min(255, parseInt(r[2], 10)) / 255, this.b = Math.min(255, parseInt(r[3], 10)) / 255, t(r[5]), this;
                    if (r = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) return this.r = Math.min(100, parseInt(r[1], 10)) / 100, this.g = Math.min(100, parseInt(r[2], 10)) / 100, this.b = Math.min(100, parseInt(r[3], 10)) / 100, t(r[5]), this;
                    break;
                case "hsl":
                case "hsla":
                    if (r = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)) {
                        var o = parseFloat(r[1]) / 360,
                            s = parseInt(r[2], 10) / 100,
                            c = parseInt(r[3], 10) / 100;
                        return t(r[5]), this.setHSL(o, s, c)
                    }
            }
        } else if (n = /^\#([A-Fa-f0-9]+)$/.exec(e)) {
            var u = n[1],
                l = u.length;
            if (3 === l) return this.r = parseInt(u.charAt(0) + u.charAt(0), 16) / 255, this.g = parseInt(u.charAt(1) + u.charAt(1), 16) / 255, this.b = parseInt(u.charAt(2) + u.charAt(2), 16) / 255, this;
            if (6 === l) return this.r = parseInt(u.charAt(0) + u.charAt(1), 16) / 255, this.g = parseInt(u.charAt(2) + u.charAt(3), 16) / 255, this.b = parseInt(u.charAt(4) + u.charAt(5), 16) / 255, this
        }
        return e && e.length > 0 ? this.setColorName(e) : this
    },
    setColorName: function(e) { var t = Ke[e]; return void 0 !== t ? this.setHex(t) : console.warn("THREE.Color: Unknown color " + e), this },
    clone: function() { return new this.constructor(this.r, this.g, this.b) },
    copy: function(e) { return this.r = e.r, this.g = e.g, this.b = e.b, this },
    copyGammaToLinear: function(e, t) { return void 0 === t && (t = 2), this.r = Math.pow(e.r, t), this.g = Math.pow(e.g, t), this.b = Math.pow(e.b, t), this },
    copyLinearToGamma: function(e, t) { void 0 === t && (t = 2); var n = t > 0 ? 1 / t : 1; return this.r = Math.pow(e.r, n), this.g = Math.pow(e.g, n), this.b = Math.pow(e.b, n), this },
    convertGammaToLinear: function(e) { return this.copyGammaToLinear(this, e), this },
    convertLinearToGamma: function(e) { return this.copyLinearToGamma(this, e), this },
    copySRGBToLinear: function(e) { return this.r = nt(e.r), this.g = nt(e.g), this.b = nt(e.b), this },
    copyLinearToSRGB: function(e) { return this.r = rt(e.r), this.g = rt(e.g), this.b = rt(e.b), this },
    convertSRGBToLinear: function() { return this.copySRGBToLinear(this), this },
    convertLinearToSRGB: function() { return this.copyLinearToSRGB(this), this },
    getHex: function() { return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0 },
    getHexString: function() { return ("000000" + this.getHex().toString(16)).slice(-6) },
    getHSL: function(e) {
        void 0 === e && (console.warn("THREE.Color: .getHSL() target is now required"), e = { h: 0, s: 0, l: 0 });
        var t, n, r = this.r,
            i = this.g,
            a = this.b,
            o = Math.max(r, i, a),
            s = Math.min(r, i, a),
            c = (s + o) / 2;
        if (s === o) t = 0, n = 0;
        else {
            var u = o - s;
            switch (n = c <= .5 ? u / (o + s) : u / (2 - o - s), o) {
                case r:
                    t = (i - a) / u + (i < a ? 6 : 0);
                    break;
                case i:
                    t = (a - r) / u + 2;
                    break;
                case a:
                    t = (r - i) / u + 4
            }
            t /= 6
        }
        return e.h = t, e.s = n, e.l = c, e
    },
    getStyle: function() { return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")" },
    offsetHSL: function(e, t, n) { return this.getHSL(Qe), Qe.h += e, Qe.s += t, Qe.l += n, this.setHSL(Qe.h, Qe.s, Qe.l), this },
    add: function(e) { return this.r += e.r, this.g += e.g, this.b += e.b, this },
    addColors: function(e, t) { return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this },
    addScalar: function(e) { return this.r += e, this.g += e, this.b += e, this },
    sub: function(e) { return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this },
    multiply: function(e) { return this.r *= e.r, this.g *= e.g, this.b *= e.b, this },
    multiplyScalar: function(e) { return this.r *= e, this.g *= e, this.b *= e, this },
    lerp: function(e, t) { return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this },
    lerpHSL: function(e, t) {
        this.getHSL(Qe), e.getHSL($e);
        var n = T.lerp(Qe.h, $e.h, t),
            r = T.lerp(Qe.s, $e.s, t),
            i = T.lerp(Qe.l, $e.l, t);
        return this.setHSL(n, r, i), this
    },
    equals: function(e) { return e.r === this.r && e.g === this.g && e.b === this.b },
    fromArray: function(e, t) { return void 0 === t && (t = 0), this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this },
    toArray: function(e, t) { return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e },
    toJSON: function() { return this.getHex() }
}), et.NAMES = Ke, Object.assign(it.prototype, { clone: function() { return (new this.constructor).copy(this) }, copy: function(e) { this.a = e.a, this.b = e.b, this.c = e.c, this.normal.copy(e.normal), this.color.copy(e.color), this.materialIndex = e.materialIndex; for (var t = 0, n = e.vertexNormals.length; t < n; t++) this.vertexNormals[t] = e.vertexNormals[t].clone(); for (t = 0, n = e.vertexColors.length; t < n; t++) this.vertexColors[t] = e.vertexColors[t].clone(); return this } });
var at = 0;

function ot() { Object.defineProperty(this, "id", { value: at++ }), this.uuid = T.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.blending = 1, this.side = 0, this.flatShading = !1, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaTest = 0, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0 }

function st(e) { ot.call(this), this.type = "MeshBasicMaterial", this.color = new et(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.setValues(e) }
ot.prototype = Object.assign(Object.create(w.prototype), {
    constructor: ot,
    isMaterial: !0,
    onBeforeCompile: function() {},
    setValues: function(e) {
        if (void 0 !== e)
            for (var t in e) {
                var n = e[t];
                if (void 0 !== n)
                    if ("shading" !== t) {
                        var r = this[t];
                        void 0 !== r ? r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n : console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.")
                    } else console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === n;
                else console.warn("THREE.Material: '" + t + "' parameter is undefined.")
            }
    },
    toJSON: function(e) {
        var t = void 0 === e || "string" == typeof e;
        t && (e = { textures: {}, images: {} });
        var n = { metadata: { version: 4.5, type: "Material", generator: "Material.toJSON" } };

        function r(e) {
            var t = [];
            for (var n in e) {
                var r = e[n];
                delete r.metadata, t.push(r)
            }
            return t
        }
        if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, n.reflectivity = this.reflectivity, n.refractionRatio = this.refractionRatio, void 0 !== this.combine && (n.combine = this.combine), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity)), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.size && (n.size = this.size), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (n.blending = this.blending), !0 === this.flatShading && (n.flatShading = this.flatShading), 0 !== this.side && (n.side = this.side), this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), !0 === this.transparent && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.stencilWrite = this.stencilWrite, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, this.rotation && 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.morphTargets && (n.morphTargets = !0), !0 === this.morphNormals && (n.morphNormals = !0), !0 === this.skinning && (n.skinning = !0), !1 === this.visible && (n.visible = !1), !1 === this.toneMapped && (n.toneMapped = !1), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), t) {
            var i = r(e.textures),
                a = r(e.images);
            i.length > 0 && (n.textures = i), a.length > 0 && (n.images = a)
        }
        return n
    },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) {
        this.name = e.name, this.fog = e.fog, this.blending = e.blending, this.side = e.side, this.flatShading = e.flatShading, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
        var t = e.clippingPlanes,
            n = null;
        if (null !== t) {
            var r = t.length;
            n = new Array(r);
            for (var i = 0; i !== r; ++i) n[i] = t[i].clone()
        }
        return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.premultipliedAlpha = e.premultipliedAlpha, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this
    },
    dispose: function() { this.dispatchEvent({ type: "dispose" }) }
}), Object.defineProperty(ot.prototype, "needsUpdate", { set: function(e) {!0 === e && this.version++ } }), st.prototype = Object.create(ot.prototype), st.prototype.constructor = st, st.prototype.isMeshBasicMaterial = !0, st.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this };
var ct = new U;

function ut(e, t, n) {
    if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.name = "", this.array = e, this.itemSize = t, this.count = void 0 !== e ? e.length / t : 0, this.normalized = !0 === n, this.usage = 35044, this.updateRange = { offset: 0, count: -1 }, this.version = 0
}

function lt(e, t, n) { ut.call(this, new Int8Array(e), t, n) }

function ht(e, t, n) { ut.call(this, new Uint8Array(e), t, n) }

function pt(e, t, n) { ut.call(this, new Uint8ClampedArray(e), t, n) }

function dt(e, t, n) { ut.call(this, new Int16Array(e), t, n) }

function ft(e, t, n) { ut.call(this, new Uint16Array(e), t, n) }

function mt(e, t, n) { ut.call(this, new Int32Array(e), t, n) }

function vt(e, t, n) { ut.call(this, new Uint32Array(e), t, n) }

function gt(e, t, n) { ut.call(this, new Float32Array(e), t, n) }

function yt(e, t, n) { ut.call(this, new Float64Array(e), t, n) }

function xt() { this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1 }

function bt(e) { if (0 === e.length) return -1 / 0; for (var t = e[0], n = 1, r = e.length; n < r; ++n) e[n] > t && (t = e[n]); return t }
Object.defineProperty(ut.prototype, "needsUpdate", { set: function(e) {!0 === e && this.version++ } }), Object.assign(ut.prototype, {
    isBufferAttribute: !0,
    onUploadCallback: function() {},
    setUsage: function(e) { return this.usage = e, this },
    copy: function(e) { return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this },
    copyAt: function(e, t, n) { e *= this.itemSize, n *= t.itemSize; for (var r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r]; return this },
    copyArray: function(e) { return this.array.set(e), this },
    copyColorsArray: function(e) {
        for (var t = this.array, n = 0, r = 0, i = e.length; r < i; r++) {
            var a = e[r];
            void 0 === a && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", r), a = new et), t[n++] = a.r, t[n++] = a.g, t[n++] = a.b
        }
        return this
    },
    copyVector2sArray: function(e) {
        for (var t = this.array, n = 0, r = 0, i = e.length; r < i; r++) {
            var a = e[r];
            void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", r), a = new E), t[n++] = a.x, t[n++] = a.y
        }
        return this
    },
    copyVector3sArray: function(e) {
        for (var t = this.array, n = 0, r = 0, i = e.length; r < i; r++) {
            var a = e[r];
            void 0 === a && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", r), a = new U), t[n++] = a.x, t[n++] = a.y, t[n++] = a.z
        }
        return this
    },
    copyVector4sArray: function(e) {
        for (var t = this.array, n = 0, r = 0, i = e.length; r < i; r++) {
            var a = e[r];
            void 0 === a && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", r), a = new C), t[n++] = a.x, t[n++] = a.y, t[n++] = a.z, t[n++] = a.w
        }
        return this
    },
    applyMatrix3: function(e) { for (var t = 0, n = this.count; t < n; t++) ct.x = this.getX(t), ct.y = this.getY(t), ct.z = this.getZ(t), ct.applyMatrix3(e), this.setXYZ(t, ct.x, ct.y, ct.z); return this },
    applyMatrix4: function(e) { for (var t = 0, n = this.count; t < n; t++) ct.x = this.getX(t), ct.y = this.getY(t), ct.z = this.getZ(t), ct.applyMatrix4(e), this.setXYZ(t, ct.x, ct.y, ct.z); return this },
    applyNormalMatrix: function(e) { for (var t = 0, n = this.count; t < n; t++) ct.x = this.getX(t), ct.y = this.getY(t), ct.z = this.getZ(t), ct.applyNormalMatrix(e), this.setXYZ(t, ct.x, ct.y, ct.z); return this },
    transformDirection: function(e) { for (var t = 0, n = this.count; t < n; t++) ct.x = this.getX(t), ct.y = this.getY(t), ct.z = this.getZ(t), ct.transformDirection(e), this.setXYZ(t, ct.x, ct.y, ct.z); return this },
    set: function(e, t) { return void 0 === t && (t = 0), this.array.set(e, t), this },
    getX: function(e) { return this.array[e * this.itemSize] },
    setX: function(e, t) { return this.array[e * this.itemSize] = t, this },
    getY: function(e) { return this.array[e * this.itemSize + 1] },
    setY: function(e, t) { return this.array[e * this.itemSize + 1] = t, this },
    getZ: function(e) { return this.array[e * this.itemSize + 2] },
    setZ: function(e, t) { return this.array[e * this.itemSize + 2] = t, this },
    getW: function(e) { return this.array[e * this.itemSize + 3] },
    setW: function(e, t) { return this.array[e * this.itemSize + 3] = t, this },
    setXY: function(e, t, n) { return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this },
    setXYZ: function(e, t, n, r) { return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this },
    setXYZW: function(e, t, n, r, i) { return e *= this.itemSize, this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this },
    onUpload: function(e) { return this.onUploadCallback = e, this },
    clone: function() { return new this.constructor(this.array, this.itemSize).copy(this) },
    toJSON: function() { return { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.prototype.slice.call(this.array), normalized: this.normalized } }
}), lt.prototype = Object.create(ut.prototype), lt.prototype.constructor = lt, ht.prototype = Object.create(ut.prototype), ht.prototype.constructor = ht, pt.prototype = Object.create(ut.prototype), pt.prototype.constructor = pt, dt.prototype = Object.create(ut.prototype), dt.prototype.constructor = dt, ft.prototype = Object.create(ut.prototype), ft.prototype.constructor = ft, mt.prototype = Object.create(ut.prototype), mt.prototype.constructor = mt, vt.prototype = Object.create(ut.prototype), vt.prototype.constructor = vt, gt.prototype = Object.create(ut.prototype), gt.prototype.constructor = gt, yt.prototype = Object.create(ut.prototype), yt.prototype.constructor = yt, Object.assign(xt.prototype, {
    computeGroups: function(e) {
        for (var t, n = [], r = void 0, i = e.faces, a = 0; a < i.length; a++) {
            var o = i[a];
            o.materialIndex !== r && (r = o.materialIndex, void 0 !== t && (t.count = 3 * a - t.start, n.push(t)), t = { start: 3 * a, materialIndex: r })
        }
        void 0 !== t && (t.count = 3 * a - t.start, n.push(t)), this.groups = n
    },
    fromGeometry: function(e) {
        var t, n = e.faces,
            r = e.vertices,
            i = e.faceVertexUvs,
            a = i[0] && i[0].length > 0,
            o = i[1] && i[1].length > 0,
            s = e.morphTargets,
            c = s.length;
        if (c > 0) {
            t = [];
            for (var u = 0; u < c; u++) t[u] = { name: s[u].name, data: [] };
            this.morphTargets.position = t
        }
        var l, h = e.morphNormals,
            p = h.length;
        if (p > 0) {
            for (l = [], u = 0; u < p; u++) l[u] = { name: h[u].name, data: [] };
            this.morphTargets.normal = l
        }
        var d = e.skinIndices,
            f = e.skinWeights,
            m = d.length === r.length,
            v = f.length === r.length;
        for (r.length > 0 && 0 === n.length && console.error("THREE.DirectGeometry: Faceless geometries are not supported."), u = 0; u < n.length; u++) {
            var g = n[u];
            this.vertices.push(r[g.a], r[g.b], r[g.c]);
            var y = g.vertexNormals;
            if (3 === y.length) this.normals.push(y[0], y[1], y[2]);
            else {
                var x = g.normal;
                this.normals.push(x, x, x)
            }
            var b, w = g.vertexColors;
            if (3 === w.length) this.colors.push(w[0], w[1], w[2]);
            else {
                var _ = g.color;
                this.colors.push(_, _, _)
            }!0 === a && (void 0 !== (b = i[0][u]) ? this.uvs.push(b[0], b[1], b[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", u), this.uvs.push(new E, new E, new E))), !0 === o && (void 0 !== (b = i[1][u]) ? this.uvs2.push(b[0], b[1], b[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", u), this.uvs2.push(new E, new E, new E)));
            for (var M = 0; M < c; M++) {
                var S = s[M].vertices;
                t[M].data.push(S[g.a], S[g.b], S[g.c])
            }
            for (M = 0; M < p; M++) {
                var T = h[M].vertexNormals[u];
                l[M].data.push(T.a, T.b, T.c)
            }
            m && this.skinIndices.push(d[g.a], d[g.b], d[g.c]), v && this.skinWeights.push(f[g.a], f[g.b], f[g.c])
        }
        return this.computeGroups(e), this.verticesNeedUpdate = e.verticesNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), this
    }
});
var wt = 1,
    _t = new W,
    Mt = new ue,
    St = new U,
    Tt = new Se,
    Et = new Se,
    At = new U;

function Lt() { Object.defineProperty(this, "id", { value: wt += 2 }), this.uuid = T.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {} }
Lt.prototype = Object.assign(Object.create(w.prototype), {
    constructor: Lt,
    isBufferGeometry: !0,
    getIndex: function() { return this.index },
    setIndex: function(e) { Array.isArray(e) ? this.index = new(bt(e) > 65535 ? vt : ft)(e, 1) : this.index = e },
    getAttribute: function(e) { return this.attributes[e] },
    setAttribute: function(e, t) { return this.attributes[e] = t, this },
    deleteAttribute: function(e) { return delete this.attributes[e], this },
    addGroup: function(e, t, n) { this.groups.push({ start: e, count: t, materialIndex: void 0 !== n ? n : 0 }) },
    clearGroups: function() { this.groups = [] },
    setDrawRange: function(e, t) { this.drawRange.start = e, this.drawRange.count = t },
    applyMatrix4: function(e) {
        var t = this.attributes.position;
        void 0 !== t && (t.applyMatrix4(e), t.needsUpdate = !0);
        var n = this.attributes.normal;
        if (void 0 !== n) {
            var r = (new A).getNormalMatrix(e);
            n.applyNormalMatrix(r), n.needsUpdate = !0
        }
        var i = this.attributes.tangent;
        return void 0 !== i && (i.transformDirection(e), i.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
    },
    rotateX: function(e) { return _t.makeRotationX(e), this.applyMatrix4(_t), this },
    rotateY: function(e) { return _t.makeRotationY(e), this.applyMatrix4(_t), this },
    rotateZ: function(e) { return _t.makeRotationZ(e), this.applyMatrix4(_t), this },
    translate: function(e, t, n) { return _t.makeTranslation(e, t, n), this.applyMatrix4(_t), this },
    scale: function(e, t, n) { return _t.makeScale(e, t, n), this.applyMatrix4(_t), this },
    lookAt: function(e) { return Mt.lookAt(e), Mt.updateMatrix(), this.applyMatrix4(Mt.matrix), this },
    center: function() { return this.computeBoundingBox(), this.boundingBox.getCenter(St).negate(), this.translate(St.x, St.y, St.z), this },
    setFromObject: function(e) {
        var t = e.geometry;
        if (e.isPoints || e.isLine) {
            var n = new gt(3 * t.vertices.length, 3),
                r = new gt(3 * t.colors.length, 3);
            if (this.setAttribute("position", n.copyVector3sArray(t.vertices)), this.setAttribute("color", r.copyColorsArray(t.colors)), t.lineDistances && t.lineDistances.length === t.vertices.length) {
                var i = new gt(t.lineDistances.length, 1);
                this.setAttribute("lineDistance", i.copyArray(t.lineDistances))
            }
            null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone())
        } else e.isMesh && t && t.isGeometry && this.fromGeometry(t);
        return this
    },
    setFromPoints: function(e) {
        for (var t = [], n = 0, r = e.length; n < r; n++) {
            var i = e[n];
            t.push(i.x, i.y, i.z || 0)
        }
        return this.setAttribute("position", new gt(t, 3)), this
    },
    updateFromObject: function(e) {
        var t, n = e.geometry;
        if (e.isMesh) {
            var r = n.__directGeometry;
            if (!0 === n.elementsNeedUpdate && (r = void 0, n.elementsNeedUpdate = !1), void 0 === r) return this.fromGeometry(n);
            r.verticesNeedUpdate = n.verticesNeedUpdate, r.normalsNeedUpdate = n.normalsNeedUpdate, r.colorsNeedUpdate = n.colorsNeedUpdate, r.uvsNeedUpdate = n.uvsNeedUpdate, r.groupsNeedUpdate = n.groupsNeedUpdate, n.verticesNeedUpdate = !1, n.normalsNeedUpdate = !1, n.colorsNeedUpdate = !1, n.uvsNeedUpdate = !1, n.groupsNeedUpdate = !1, n = r
        }
        return !0 === n.verticesNeedUpdate && (void 0 !== (t = this.attributes.position) && (t.copyVector3sArray(n.vertices), t.needsUpdate = !0), n.verticesNeedUpdate = !1), !0 === n.normalsNeedUpdate && (void 0 !== (t = this.attributes.normal) && (t.copyVector3sArray(n.normals), t.needsUpdate = !0), n.normalsNeedUpdate = !1), !0 === n.colorsNeedUpdate && (void 0 !== (t = this.attributes.color) && (t.copyColorsArray(n.colors), t.needsUpdate = !0), n.colorsNeedUpdate = !1), n.uvsNeedUpdate && (void 0 !== (t = this.attributes.uv) && (t.copyVector2sArray(n.uvs), t.needsUpdate = !0), n.uvsNeedUpdate = !1), n.lineDistancesNeedUpdate && (void 0 !== (t = this.attributes.lineDistance) && (t.copyArray(n.lineDistances), t.needsUpdate = !0), n.lineDistancesNeedUpdate = !1), n.groupsNeedUpdate && (n.computeGroups(e.geometry), this.groups = n.groups, n.groupsNeedUpdate = !1), this
    },
    fromGeometry: function(e) { return e.__directGeometry = (new xt).fromGeometry(e), this.fromDirectGeometry(e.__directGeometry) },
    fromDirectGeometry: function(e) {
        var t = new Float32Array(3 * e.vertices.length);
        if (this.setAttribute("position", new ut(t, 3).copyVector3sArray(e.vertices)), e.normals.length > 0) {
            var n = new Float32Array(3 * e.normals.length);
            this.setAttribute("normal", new ut(n, 3).copyVector3sArray(e.normals))
        }
        if (e.colors.length > 0) {
            var r = new Float32Array(3 * e.colors.length);
            this.setAttribute("color", new ut(r, 3).copyColorsArray(e.colors))
        }
        if (e.uvs.length > 0) {
            var i = new Float32Array(2 * e.uvs.length);
            this.setAttribute("uv", new ut(i, 2).copyVector2sArray(e.uvs))
        }
        if (e.uvs2.length > 0) {
            var a = new Float32Array(2 * e.uvs2.length);
            this.setAttribute("uv2", new ut(a, 2).copyVector2sArray(e.uvs2))
        }
        for (var o in this.groups = e.groups, e.morphTargets) {
            for (var s = [], c = e.morphTargets[o], u = 0, l = c.length; u < l; u++) {
                var h = c[u],
                    p = new gt(3 * h.data.length, 3);
                p.name = h.name, s.push(p.copyVector3sArray(h.data))
            }
            this.morphAttributes[o] = s
        }
        if (e.skinIndices.length > 0) {
            var d = new gt(4 * e.skinIndices.length, 4);
            this.setAttribute("skinIndex", d.copyVector4sArray(e.skinIndices))
        }
        if (e.skinWeights.length > 0) {
            var f = new gt(4 * e.skinWeights.length, 4);
            this.setAttribute("skinWeight", f.copyVector4sArray(e.skinWeights))
        }
        return null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), this
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new Se);
        var e = this.attributes.position,
            t = this.morphAttributes.position;
        if (void 0 !== e) {
            if (this.boundingBox.setFromBufferAttribute(e), t)
                for (var n = 0, r = t.length; n < r; n++) {
                    var i = t[n];
                    Tt.setFromBufferAttribute(i), this.morphTargetsRelative ? (At.addVectors(this.boundingBox.min, Tt.min), this.boundingBox.expandByPoint(At), At.addVectors(this.boundingBox.max, Tt.max), this.boundingBox.expandByPoint(At)) : (this.boundingBox.expandByPoint(Tt.min), this.boundingBox.expandByPoint(Tt.max))
                }
        } else this.boundingBox.makeEmpty();
        (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
    },
    computeBoundingSphere: function() {
        null === this.boundingSphere && (this.boundingSphere = new Ae);
        var e = this.attributes.position,
            t = this.morphAttributes.position;
        if (e) {
            var n = this.boundingSphere.center;
            if (Tt.setFromBufferAttribute(e), t)
                for (var r = 0, i = t.length; r < i; r++) {
                    var a = t[r];
                    Et.setFromBufferAttribute(a), this.morphTargetsRelative ? (At.addVectors(Tt.min, Et.min), Tt.expandByPoint(At), At.addVectors(Tt.max, Et.max), Tt.expandByPoint(At)) : (Tt.expandByPoint(Et.min), Tt.expandByPoint(Et.max))
                }
            Tt.getCenter(n);
            var o = 0;
            for (r = 0, i = e.count; r < i; r++) At.fromBufferAttribute(e, r), o = Math.max(o, n.distanceToSquared(At));
            if (t)
                for (r = 0, i = t.length; r < i; r++) { a = t[r]; for (var s = this.morphTargetsRelative, c = 0, u = a.count; c < u; c++) At.fromBufferAttribute(a, c), s && (St.fromBufferAttribute(e, c), At.add(St)), o = Math.max(o, n.distanceToSquared(At)) }
            this.boundingSphere.radius = Math.sqrt(o), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
        }
    },
    computeFaceNormals: function() {},
    computeVertexNormals: function() {
        var e = this.index,
            t = this.attributes;
        if (t.position) {
            var n = t.position.array;
            if (void 0 === t.normal) this.setAttribute("normal", new ut(new Float32Array(n.length), 3));
            else
                for (var r = t.normal.array, i = 0, a = r.length; i < a; i++) r[i] = 0;
            var o, s, c, u = t.normal.array,
                l = new U,
                h = new U,
                p = new U,
                d = new U,
                f = new U;
            if (e) { var m = e.array; for (i = 0, a = e.count; i < a; i += 3) o = 3 * m[i + 0], s = 3 * m[i + 1], c = 3 * m[i + 2], l.fromArray(n, o), h.fromArray(n, s), p.fromArray(n, c), d.subVectors(p, h), f.subVectors(l, h), d.cross(f), u[o] += d.x, u[o + 1] += d.y, u[o + 2] += d.z, u[s] += d.x, u[s + 1] += d.y, u[s + 2] += d.z, u[c] += d.x, u[c + 1] += d.y, u[c + 2] += d.z } else
                for (i = 0, a = n.length; i < a; i += 9) l.fromArray(n, i), h.fromArray(n, i + 3), p.fromArray(n, i + 6), d.subVectors(p, h), f.subVectors(l, h), d.cross(f), u[i] = d.x, u[i + 1] = d.y, u[i + 2] = d.z, u[i + 3] = d.x, u[i + 4] = d.y, u[i + 5] = d.z, u[i + 6] = d.x, u[i + 7] = d.y, u[i + 8] = d.z;
            this.normalizeNormals(), t.normal.needsUpdate = !0
        }
    },
    merge: function(e, t) {
        if (e && e.isBufferGeometry) {
            void 0 === t && (t = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
            var n = this.attributes;
            for (var r in n)
                if (void 0 !== e.attributes[r])
                    for (var i = n[r].array, a = e.attributes[r], o = a.array, s = a.itemSize * t, c = Math.min(o.length, i.length - s), u = 0, l = s; u < c; u++, l++) i[l] = o[u];
            return this
        }
        console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e)
    },
    normalizeNormals: function() { for (var e = this.attributes.normal, t = 0, n = e.count; t < n; t++) At.x = e.getX(t), At.y = e.getY(t), At.z = e.getZ(t), At.normalize(), e.setXYZ(t, At.x, At.y, At.z) },
    toNonIndexed: function() {
        function e(e, t) { for (var n = e.array, r = e.itemSize, i = new n.constructor(t.length * r), a = 0, o = 0, s = 0, c = t.length; s < c; s++) { a = t[s] * r; for (var u = 0; u < r; u++) i[o++] = n[a++] } return new ut(i, r) }
        if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
        var t = new Lt,
            n = this.index.array,
            r = this.attributes;
        for (var i in r) {
            var a = e(r[i], n);
            t.setAttribute(i, a)
        }
        var o = this.morphAttributes;
        for (i in o) {
            for (var s = [], c = o[i], u = 0, l = c.length; u < l; u++) a = e(c[u], n), s.push(a);
            t.morphAttributes[i] = s
        }
        t.morphTargetsRelative = this.morphTargetsRelative;
        for (var h = this.groups, p = (u = 0, h.length); u < p; u++) {
            var d = h[u];
            t.addGroup(d.start, d.count, d.materialIndex)
        }
        return t
    },
    toJSON: function() {
        var e = { metadata: { version: 4.5, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
        if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters) { var t = this.parameters; for (var n in t) void 0 !== t[n] && (e[n] = t[n]); return e }
        e.data = { attributes: {} };
        var r = this.index;
        null !== r && (e.data.index = { type: r.array.constructor.name, array: Array.prototype.slice.call(r.array) });
        var i = this.attributes;
        for (var n in i) { var a = (p = i[n]).toJSON(); "" !== p.name && (a.name = p.name), e.data.attributes[n] = a }
        var o = {},
            s = !1;
        for (var n in this.morphAttributes) {
            for (var c = this.morphAttributes[n], u = [], l = 0, h = c.length; l < h; l++) {
                var p;
                a = (p = c[l]).toJSON(), "" !== p.name && (a.name = p.name), u.push(a)
            }
            u.length > 0 && (o[n] = u, s = !0)
        }
        s && (e.data.morphAttributes = o, e.data.morphTargetsRelative = this.morphTargetsRelative);
        var d = this.groups;
        d.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(d)));
        var f = this.boundingSphere;
        return null !== f && (e.data.boundingSphere = { center: f.center.toArray(), radius: f.radius }), e
    },
    clone: function() { return (new Lt).copy(this) },
    copy: function(e) {
        var t, n, r;
        this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
        var i = e.index;
        null !== i && this.setIndex(i.clone());
        var a = e.attributes;
        for (t in a) {
            var o = a[t];
            this.setAttribute(t, o.clone())
        }
        var s = e.morphAttributes;
        for (t in s) {
            var c = [],
                u = s[t];
            for (n = 0, r = u.length; n < r; n++) c.push(u[n].clone());
            this.morphAttributes[t] = c
        }
        this.morphTargetsRelative = e.morphTargetsRelative;
        var l = e.groups;
        for (n = 0, r = l.length; n < r; n++) {
            var h = l[n];
            this.addGroup(h.start, h.count, h.materialIndex)
        }
        var p = e.boundingBox;
        null !== p && (this.boundingBox = p.clone());
        var d = e.boundingSphere;
        return null !== d && (this.boundingSphere = d.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this
    },
    dispose: function() { this.dispatchEvent({ type: "dispose" }) }
});
var Rt = new W,
    Pt = new Ne,
    Ct = new Ae,
    Ot = new U,
    It = new U,
    Dt = new U,
    Nt = new U,
    Ft = new U,
    Ut = new U,
    Bt = new U,
    kt = new U,
    zt = new U,
    Gt = new E,
    Ht = new E,
    jt = new E,
    Vt = new U,
    Wt = new U;

function qt(e, t) { ue.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new Lt, this.material = void 0 !== t ? t : new st, this.updateMorphTargets() }

function Xt(e, t, n, r, i, a, o, s) {
    if (null === (1 === t.side ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, 2 !== t.side, s))) return null;
    Wt.copy(s), Wt.applyMatrix4(e.matrixWorld);
    var c = n.ray.origin.distanceTo(Wt);
    return c < n.near || c > n.far ? null : { distance: c, point: Wt.clone(), object: e }
}

function Yt(e, t, n, r, i, a, o, s, c, u, l, h) {
    Ot.fromBufferAttribute(i, u), It.fromBufferAttribute(i, l), Dt.fromBufferAttribute(i, h);
    var p = e.morphTargetInfluences;
    if (t.morphTargets && a && p) {
        Bt.set(0, 0, 0), kt.set(0, 0, 0), zt.set(0, 0, 0);
        for (var d = 0, f = a.length; d < f; d++) {
            var m = p[d],
                v = a[d];
            0 !== m && (Nt.fromBufferAttribute(v, u), Ft.fromBufferAttribute(v, l), Ut.fromBufferAttribute(v, h), o ? (Bt.addScaledVector(Nt, m), kt.addScaledVector(Ft, m), zt.addScaledVector(Ut, m)) : (Bt.addScaledVector(Nt.sub(Ot), m), kt.addScaledVector(Ft.sub(It), m), zt.addScaledVector(Ut.sub(Dt), m)))
        }
        Ot.add(Bt), It.add(kt), Dt.add(zt)
    }
    var g = Xt(e, t, n, r, Ot, It, Dt, Vt);
    if (g) {
        s && (Gt.fromBufferAttribute(s, u), Ht.fromBufferAttribute(s, l), jt.fromBufferAttribute(s, h), g.uv = Je.getUV(Vt, Ot, It, Dt, Gt, Ht, jt, new E)), c && (Gt.fromBufferAttribute(c, u), Ht.fromBufferAttribute(c, l), jt.fromBufferAttribute(c, h), g.uv2 = Je.getUV(Vt, Ot, It, Dt, Gt, Ht, jt, new E));
        var y = new it(u, l, h);
        Je.getNormal(Ot, It, Dt, y.normal), g.face = y
    }
    return g
}
qt.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: qt,
    isMesh: !0,
    copy: function(e) { return ue.prototype.copy.call(this, e), void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this },
    updateMorphTargets: function() {
        var e, t, n, r = this.geometry;
        if (r.isBufferGeometry) {
            var i = r.morphAttributes,
                a = Object.keys(i);
            if (a.length > 0) {
                var o = i[a[0]];
                if (void 0 !== o)
                    for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, e = 0, t = o.length; e < t; e++) n = o[e].name || String(e), this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
            }
        } else {
            var s = r.morphTargets;
            void 0 !== s && s.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
        }
    },
    raycast: function(e, t) {
        var n, r = this.geometry,
            i = this.material,
            a = this.matrixWorld;
        if (void 0 !== i && (null === r.boundingSphere && r.computeBoundingSphere(), Ct.copy(r.boundingSphere), Ct.applyMatrix4(a), !1 !== e.ray.intersectsSphere(Ct) && (Rt.getInverse(a), Pt.copy(e.ray).applyMatrix4(Rt), null === r.boundingBox || !1 !== Pt.intersectsBox(r.boundingBox))))
            if (r.isBufferGeometry) {
                var o, s, c, u, l, h, p, d, f, m = r.index,
                    v = r.attributes.position,
                    g = r.morphAttributes.position,
                    y = r.morphTargetsRelative,
                    x = r.attributes.uv,
                    b = r.attributes.uv2,
                    w = r.groups,
                    _ = r.drawRange;
                if (null !== m)
                    if (Array.isArray(i))
                        for (u = 0, h = w.length; u < h; u++)
                            for (f = i[(d = w[u]).materialIndex], l = Math.max(d.start, _.start), p = Math.min(d.start + d.count, _.start + _.count); l < p; l += 3) o = m.getX(l), s = m.getX(l + 1), c = m.getX(l + 2), (n = Yt(this, f, e, Pt, v, g, y, x, b, o, s, c)) && (n.faceIndex = Math.floor(l / 3), n.face.materialIndex = d.materialIndex, t.push(n));
                    else
                        for (u = Math.max(0, _.start), h = Math.min(m.count, _.start + _.count); u < h; u += 3) o = m.getX(u), s = m.getX(u + 1), c = m.getX(u + 2), (n = Yt(this, i, e, Pt, v, g, y, x, b, o, s, c)) && (n.faceIndex = Math.floor(u / 3), t.push(n));
                else if (void 0 !== v)
                    if (Array.isArray(i))
                        for (u = 0, h = w.length; u < h; u++)
                            for (f = i[(d = w[u]).materialIndex], l = Math.max(d.start, _.start), p = Math.min(d.start + d.count, _.start + _.count); l < p; l += 3)(n = Yt(this, f, e, Pt, v, g, y, x, b, o = l, s = l + 1, c = l + 2)) && (n.faceIndex = Math.floor(l / 3), n.face.materialIndex = d.materialIndex, t.push(n));
                    else
                        for (u = Math.max(0, _.start), h = Math.min(v.count, _.start + _.count); u < h; u += 3)(n = Yt(this, i, e, Pt, v, g, y, x, b, o = u, s = u + 1, c = u + 2)) && (n.faceIndex = Math.floor(u / 3), t.push(n))
            } else if (r.isGeometry) {
            var M, S, T, A, L = Array.isArray(i),
                R = r.vertices,
                P = r.faces,
                C = r.faceVertexUvs[0];
            C.length > 0 && (A = C);
            for (var O = 0, I = P.length; O < I; O++) {
                var D = P[O],
                    N = L ? i[D.materialIndex] : i;
                if (void 0 !== N && (M = R[D.a], S = R[D.b], T = R[D.c], n = Xt(this, N, e, Pt, M, S, T, Vt))) {
                    if (A && A[O]) {
                        var F = A[O];
                        Gt.copy(F[0]), Ht.copy(F[1]), jt.copy(F[2]), n.uv = Je.getUV(Vt, M, S, T, Gt, Ht, jt, new E)
                    }
                    n.face = D, n.faceIndex = O, t.push(n)
                }
            }
        }
    },
    clone: function() { return new this.constructor(this.geometry, this.material).copy(this) }
});
var Zt = 0,
    Jt = new W,
    Kt = new ue,
    Qt = new U;

function $t() {
    Object.defineProperty(this, "id", { value: Zt += 2 }), this.uuid = T.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
        []
    ], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
}
$t.prototype = Object.assign(Object.create(w.prototype), {
    constructor: $t,
    isGeometry: !0,
    applyMatrix4: function(e) {
        for (var t = (new A).getNormalMatrix(e), n = 0, r = this.vertices.length; n < r; n++) this.vertices[n].applyMatrix4(e);
        for (n = 0, r = this.faces.length; n < r; n++) {
            var i = this.faces[n];
            i.normal.applyMatrix3(t).normalize();
            for (var a = 0, o = i.vertexNormals.length; a < o; a++) i.vertexNormals[a].applyMatrix3(t).normalize()
        }
        return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
    },
    rotateX: function(e) { return Jt.makeRotationX(e), this.applyMatrix4(Jt), this },
    rotateY: function(e) { return Jt.makeRotationY(e), this.applyMatrix4(Jt), this },
    rotateZ: function(e) { return Jt.makeRotationZ(e), this.applyMatrix4(Jt), this },
    translate: function(e, t, n) { return Jt.makeTranslation(e, t, n), this.applyMatrix4(Jt), this },
    scale: function(e, t, n) { return Jt.makeScale(e, t, n), this.applyMatrix4(Jt), this },
    lookAt: function(e) { return Kt.lookAt(e), Kt.updateMatrix(), this.applyMatrix4(Kt.matrix), this },
    fromBufferGeometry: function(e) {
        var t = this,
            n = null !== e.index ? e.index.array : void 0,
            r = e.attributes;
        if (void 0 === r.position) return console.error("THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion."), this;
        var i = r.position.array,
            a = void 0 !== r.normal ? r.normal.array : void 0,
            o = void 0 !== r.color ? r.color.array : void 0,
            s = void 0 !== r.uv ? r.uv.array : void 0,
            c = void 0 !== r.uv2 ? r.uv2.array : void 0;
        void 0 !== c && (this.faceVertexUvs[1] = []);
        for (var u = 0; u < i.length; u += 3) t.vertices.push((new U).fromArray(i, u)), void 0 !== o && t.colors.push((new et).fromArray(o, u));

        function l(e, n, r, i) {
            var u = void 0 === o ? [] : [t.colors[e].clone(), t.colors[n].clone(), t.colors[r].clone()],
                l = new it(e, n, r, void 0 === a ? [] : [(new U).fromArray(a, 3 * e), (new U).fromArray(a, 3 * n), (new U).fromArray(a, 3 * r)], u, i);
            t.faces.push(l), void 0 !== s && t.faceVertexUvs[0].push([(new E).fromArray(s, 2 * e), (new E).fromArray(s, 2 * n), (new E).fromArray(s, 2 * r)]), void 0 !== c && t.faceVertexUvs[1].push([(new E).fromArray(c, 2 * e), (new E).fromArray(c, 2 * n), (new E).fromArray(c, 2 * r)])
        }
        var h = e.groups;
        if (h.length > 0)
            for (u = 0; u < h.length; u++)
                for (var p = h[u], d = p.start, f = d, m = d + p.count; f < m; f += 3) void 0 !== n ? l(n[f], n[f + 1], n[f + 2], p.materialIndex) : l(f, f + 1, f + 2, p.materialIndex);
        else if (void 0 !== n)
            for (u = 0; u < n.length; u += 3) l(n[u], n[u + 1], n[u + 2]);
        else
            for (u = 0; u < i.length / 3; u += 3) l(u, u + 1, u + 2);
        return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
    },
    center: function() { return this.computeBoundingBox(), this.boundingBox.getCenter(Qt).negate(), this.translate(Qt.x, Qt.y, Qt.z), this },
    normalize: function() {
        this.computeBoundingSphere();
        var e = this.boundingSphere.center,
            t = this.boundingSphere.radius,
            n = 0 === t ? 1 : 1 / t,
            r = new W;
        return r.set(n, 0, 0, -n * e.x, 0, n, 0, -n * e.y, 0, 0, n, -n * e.z, 0, 0, 0, 1), this.applyMatrix4(r), this
    },
    computeFaceNormals: function() {
        for (var e = new U, t = new U, n = 0, r = this.faces.length; n < r; n++) {
            var i = this.faces[n],
                a = this.vertices[i.a],
                o = this.vertices[i.b],
                s = this.vertices[i.c];
            e.subVectors(s, o), t.subVectors(a, o), e.cross(t), e.normalize(), i.normal.copy(e)
        }
    },
    computeVertexNormals: function(e) {
        var t, n, r, i, a, o;
        for (void 0 === e && (e = !0), o = new Array(this.vertices.length), t = 0, n = this.vertices.length; t < n; t++) o[t] = new U;
        if (e) {
            var s, c, u, l = new U,
                h = new U;
            for (r = 0, i = this.faces.length; r < i; r++) a = this.faces[r], s = this.vertices[a.a], c = this.vertices[a.b], u = this.vertices[a.c], l.subVectors(u, c), h.subVectors(s, c), l.cross(h), o[a.a].add(l), o[a.b].add(l), o[a.c].add(l)
        } else
            for (this.computeFaceNormals(), r = 0, i = this.faces.length; r < i; r++) o[(a = this.faces[r]).a].add(a.normal), o[a.b].add(a.normal), o[a.c].add(a.normal);
        for (t = 0, n = this.vertices.length; t < n; t++) o[t].normalize();
        for (r = 0, i = this.faces.length; r < i; r++) {
            var p = (a = this.faces[r]).vertexNormals;
            3 === p.length ? (p[0].copy(o[a.a]), p[1].copy(o[a.b]), p[2].copy(o[a.c])) : (p[0] = o[a.a].clone(), p[1] = o[a.b].clone(), p[2] = o[a.c].clone())
        }
        this.faces.length > 0 && (this.normalsNeedUpdate = !0)
    },
    computeFlatVertexNormals: function() {
        var e, t, n;
        for (this.computeFaceNormals(), e = 0, t = this.faces.length; e < t; e++) {
            var r = (n = this.faces[e]).vertexNormals;
            3 === r.length ? (r[0].copy(n.normal), r[1].copy(n.normal), r[2].copy(n.normal)) : (r[0] = n.normal.clone(), r[1] = n.normal.clone(), r[2] = n.normal.clone())
        }
        this.faces.length > 0 && (this.normalsNeedUpdate = !0)
    },
    computeMorphNormals: function() {
        var e, t, n, r, i;
        for (n = 0, r = this.faces.length; n < r; n++)
            for ((i = this.faces[n]).__originalFaceNormal ? i.__originalFaceNormal.copy(i.normal) : i.__originalFaceNormal = i.normal.clone(), i.__originalVertexNormals || (i.__originalVertexNormals = []), e = 0, t = i.vertexNormals.length; e < t; e++) i.__originalVertexNormals[e] ? i.__originalVertexNormals[e].copy(i.vertexNormals[e]) : i.__originalVertexNormals[e] = i.vertexNormals[e].clone();
        var a = new $t;
        for (a.faces = this.faces, e = 0, t = this.morphTargets.length; e < t; e++) {
            if (!this.morphNormals[e]) {
                this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
                var o = this.morphNormals[e].faceNormals,
                    s = this.morphNormals[e].vertexNormals;
                for (n = 0, r = this.faces.length; n < r; n++) c = new U, u = { a: new U, b: new U, c: new U }, o.push(c), s.push(u)
            }
            var c, u, l = this.morphNormals[e];
            for (a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals(), n = 0, r = this.faces.length; n < r; n++) i = this.faces[n], c = l.faceNormals[n], u = l.vertexNormals[n], c.copy(i.normal), u.a.copy(i.vertexNormals[0]), u.b.copy(i.vertexNormals[1]), u.c.copy(i.vertexNormals[2])
        }
        for (n = 0, r = this.faces.length; n < r; n++)(i = this.faces[n]).normal = i.__originalFaceNormal, i.vertexNormals = i.__originalVertexNormals
    },
    computeBoundingBox: function() { null === this.boundingBox && (this.boundingBox = new Se), this.boundingBox.setFromPoints(this.vertices) },
    computeBoundingSphere: function() { null === this.boundingSphere && (this.boundingSphere = new Ae), this.boundingSphere.setFromPoints(this.vertices) },
    merge: function(e, t, n) {
        if (e && e.isGeometry) {
            var r, i = this.vertices.length,
                a = this.vertices,
                o = e.vertices,
                s = this.faces,
                c = e.faces,
                u = this.colors,
                l = e.colors;
            void 0 === n && (n = 0), void 0 !== t && (r = (new A).getNormalMatrix(t));
            for (var h = 0, p = o.length; h < p; h++) {
                var d = o[h].clone();
                void 0 !== t && d.applyMatrix4(t), a.push(d)
            }
            for (h = 0, p = l.length; h < p; h++) u.push(l[h].clone());
            for (h = 0, p = c.length; h < p; h++) {
                var f, m, v, g = c[h],
                    y = g.vertexNormals,
                    x = g.vertexColors;
                (f = new it(g.a + i, g.b + i, g.c + i)).normal.copy(g.normal), void 0 !== r && f.normal.applyMatrix3(r).normalize();
                for (var b = 0, w = y.length; b < w; b++) m = y[b].clone(), void 0 !== r && m.applyMatrix3(r).normalize(), f.vertexNormals.push(m);
                for (f.color.copy(g.color), b = 0, w = x.length; b < w; b++) v = x[b], f.vertexColors.push(v.clone());
                f.materialIndex = g.materialIndex + n, s.push(f)
            }
            for (h = 0, p = e.faceVertexUvs.length; h < p; h++) {
                var _ = e.faceVertexUvs[h];
                for (void 0 === this.faceVertexUvs[h] && (this.faceVertexUvs[h] = []), b = 0, w = _.length; b < w; b++) {
                    for (var M = _[b], S = [], T = 0, E = M.length; T < E; T++) S.push(M[T].clone());
                    this.faceVertexUvs[h].push(S)
                }
            }
        } else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e)
    },
    mergeMesh: function(e) { e && e.isMesh ? (e.matrixAutoUpdate && e.updateMatrix(), this.merge(e.geometry, e.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e) },
    mergeVertices: function() {
        var e, t, n, r, i, a, o, s, c = {},
            u = [],
            l = [],
            h = Math.pow(10, 4);
        for (n = 0, r = this.vertices.length; n < r; n++) e = this.vertices[n], void 0 === c[t = Math.round(e.x * h) + "_" + Math.round(e.y * h) + "_" + Math.round(e.z * h)] ? (c[t] = n, u.push(this.vertices[n]), l[n] = u.length - 1) : l[n] = l[c[t]];
        var p = [];
        for (n = 0, r = this.faces.length; n < r; n++) {
            (i = this.faces[n]).a = l[i.a], i.b = l[i.b], i.c = l[i.c], a = [i.a, i.b, i.c];
            for (var d = 0; d < 3; d++)
                if (a[d] === a[(d + 1) % 3]) { p.push(n); break }
        }
        for (n = p.length - 1; n >= 0; n--) { var f = p[n]; for (this.faces.splice(f, 1), o = 0, s = this.faceVertexUvs.length; o < s; o++) this.faceVertexUvs[o].splice(f, 1) }
        var m = this.vertices.length - u.length;
        return this.vertices = u, m
    },
    setFromPoints: function(e) {
        this.vertices = [];
        for (var t = 0, n = e.length; t < n; t++) {
            var r = e[t];
            this.vertices.push(new U(r.x, r.y, r.z || 0))
        }
        return this
    },
    sortFacesByMaterialIndex: function() {
        for (var e = this.faces, t = e.length, n = 0; n < t; n++) e[n]._id = n;
        e.sort((function(e, t) { return e.materialIndex - t.materialIndex }));
        var r, i, a = this.faceVertexUvs[0],
            o = this.faceVertexUvs[1];
        for (a && a.length === t && (r = []), o && o.length === t && (i = []), n = 0; n < t; n++) {
            var s = e[n]._id;
            r && r.push(a[s]), i && i.push(o[s])
        }
        r && (this.faceVertexUvs[0] = r), i && (this.faceVertexUvs[1] = i)
    },
    toJSON: function() {
        var e = { metadata: { version: 4.5, type: "Geometry", generator: "Geometry.toJSON" } };
        if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), void 0 !== this.parameters) { var t = this.parameters; for (var n in t) void 0 !== t[n] && (e[n] = t[n]); return e }
        for (var r = [], i = 0; i < this.vertices.length; i++) {
            var a = this.vertices[i];
            r.push(a.x, a.y, a.z)
        }
        var o = [],
            s = [],
            c = {},
            u = [],
            l = {},
            h = [],
            p = {};
        for (i = 0; i < this.faces.length; i++) {
            var d = this.faces[i],
                f = void 0 !== this.faceVertexUvs[0][i],
                m = d.normal.length() > 0,
                v = d.vertexNormals.length > 0,
                g = 1 !== d.color.r || 1 !== d.color.g || 1 !== d.color.b,
                y = d.vertexColors.length > 0,
                x = 0;
            if (x = M(x, 0, 0), x = M(x, 1, !0), x = M(x, 2, !1), x = M(x, 3, f), x = M(x, 4, m), x = M(x, 5, v), x = M(x, 6, g), x = M(x, 7, y), o.push(x), o.push(d.a, d.b, d.c), o.push(d.materialIndex), f) {
                var b = this.faceVertexUvs[0][i];
                o.push(E(b[0]), E(b[1]), E(b[2]))
            }
            if (m && o.push(S(d.normal)), v) {
                var w = d.vertexNormals;
                o.push(S(w[0]), S(w[1]), S(w[2]))
            }
            if (g && o.push(T(d.color)), y) {
                var _ = d.vertexColors;
                o.push(T(_[0]), T(_[1]), T(_[2]))
            }
        }

        function M(e, t, n) { return n ? e | 1 << t : e & ~(1 << t) }

        function S(e) { var t = e.x.toString() + e.y.toString() + e.z.toString(); return void 0 !== c[t] || (c[t] = s.length / 3, s.push(e.x, e.y, e.z)), c[t] }

        function T(e) { var t = e.r.toString() + e.g.toString() + e.b.toString(); return void 0 !== l[t] || (l[t] = u.length, u.push(e.getHex())), l[t] }

        function E(e) { var t = e.x.toString() + e.y.toString(); return void 0 !== p[t] || (p[t] = h.length / 2, h.push(e.x, e.y)), p[t] }
        return e.data = {}, e.data.vertices = r, e.data.normals = s, u.length > 0 && (e.data.colors = u), h.length > 0 && (e.data.uvs = [h]), e.data.faces = o, e
    },
    clone: function() { return (new $t).copy(this) },
    copy: function(e) {
        var t, n, r, i, a, o;
        this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
            []
        ], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = e.name;
        var s = e.vertices;
        for (t = 0, n = s.length; t < n; t++) this.vertices.push(s[t].clone());
        var c = e.colors;
        for (t = 0, n = c.length; t < n; t++) this.colors.push(c[t].clone());
        var u = e.faces;
        for (t = 0, n = u.length; t < n; t++) this.faces.push(u[t].clone());
        for (t = 0, n = e.faceVertexUvs.length; t < n; t++) {
            var l = e.faceVertexUvs[t];
            for (void 0 === this.faceVertexUvs[t] && (this.faceVertexUvs[t] = []), r = 0, i = l.length; r < i; r++) {
                var h = l[r],
                    p = [];
                for (a = 0, o = h.length; a < o; a++) {
                    var d = h[a];
                    p.push(d.clone())
                }
                this.faceVertexUvs[t].push(p)
            }
        }
        var f = e.morphTargets;
        for (t = 0, n = f.length; t < n; t++) {
            var m = {};
            if (m.name = f[t].name, void 0 !== f[t].vertices)
                for (m.vertices = [], r = 0, i = f[t].vertices.length; r < i; r++) m.vertices.push(f[t].vertices[r].clone());
            if (void 0 !== f[t].normals)
                for (m.normals = [], r = 0, i = f[t].normals.length; r < i; r++) m.normals.push(f[t].normals[r].clone());
            this.morphTargets.push(m)
        }
        var v = e.morphNormals;
        for (t = 0, n = v.length; t < n; t++) {
            var g = {};
            if (void 0 !== v[t].vertexNormals)
                for (g.vertexNormals = [], r = 0, i = v[t].vertexNormals.length; r < i; r++) {
                    var y = v[t].vertexNormals[r],
                        x = {};
                    x.a = y.a.clone(), x.b = y.b.clone(), x.c = y.c.clone(), g.vertexNormals.push(x)
                }
            if (void 0 !== v[t].faceNormals)
                for (g.faceNormals = [], r = 0, i = v[t].faceNormals.length; r < i; r++) g.faceNormals.push(v[t].faceNormals[r].clone());
            this.morphNormals.push(g)
        }
        var b = e.skinWeights;
        for (t = 0, n = b.length; t < n; t++) this.skinWeights.push(b[t].clone());
        var w = e.skinIndices;
        for (t = 0, n = w.length; t < n; t++) this.skinIndices.push(w[t].clone());
        var _ = e.lineDistances;
        for (t = 0, n = _.length; t < n; t++) this.lineDistances.push(_[t]);
        var M = e.boundingBox;
        null !== M && (this.boundingBox = M.clone());
        var S = e.boundingSphere;
        return null !== S && (this.boundingSphere = S.clone()), this.elementsNeedUpdate = e.elementsNeedUpdate, this.verticesNeedUpdate = e.verticesNeedUpdate, this.uvsNeedUpdate = e.uvsNeedUpdate, this.normalsNeedUpdate = e.normalsNeedUpdate, this.colorsNeedUpdate = e.colorsNeedUpdate, this.lineDistancesNeedUpdate = e.lineDistancesNeedUpdate, this.groupsNeedUpdate = e.groupsNeedUpdate, this
    },
    dispose: function() { this.dispatchEvent({ type: "dispose" }) }
});
var en = function(e) {
        u(n, $t);
        var t = d(n);

        function n(e, r, i, o, s, c) { var u; return a(this, n), (u = t.call(this)).type = "BoxGeometry", u.parameters = { width: e, height: r, depth: i, widthSegments: o, heightSegments: s, depthSegments: c }, u.fromBufferGeometry(new tn(e, r, i, o, s, c)), u.mergeVertices(), u }
        return n
    }(),
    tn = function(e) {
        u(n, Lt);
        var t = d(n);

        function n(e, r, i, o, s, c) {
            var u;
            a(this, n), (u = t.call(this)).type = "BoxBufferGeometry", u.parameters = { width: e, height: r, depth: i, widthSegments: o, heightSegments: s, depthSegments: c };
            var l = h(u);
            e = e || 1, r = r || 1, i = i || 1, o = Math.floor(o) || 1, s = Math.floor(s) || 1, c = Math.floor(c) || 1;
            var p = [],
                d = [],
                f = [],
                m = [],
                v = 0,
                g = 0;

            function y(e, t, n, r, i, a, o, s, c, u, h) {
                var y, x, b = a / c,
                    w = o / u,
                    _ = a / 2,
                    M = o / 2,
                    S = s / 2,
                    T = c + 1,
                    E = u + 1,
                    A = 0,
                    L = 0,
                    R = new U;
                for (x = 0; x < E; x++) {
                    var P = x * w - M;
                    for (y = 0; y < T; y++) {
                        var C = y * b - _;
                        R[e] = C * r, R[t] = P * i, R[n] = S, d.push(R.x, R.y, R.z), R[e] = 0, R[t] = 0, R[n] = s > 0 ? 1 : -1, f.push(R.x, R.y, R.z), m.push(y / c), m.push(1 - x / u), A += 1
                    }
                }
                for (x = 0; x < u; x++)
                    for (y = 0; y < c; y++) {
                        var O = v + y + T * x,
                            I = v + y + T * (x + 1),
                            D = v + (y + 1) + T * (x + 1),
                            N = v + (y + 1) + T * x;
                        p.push(O, I, N), p.push(I, D, N), L += 6
                    }
                l.addGroup(g, L, h), g += L, v += A
            }
            return y("z", "y", "x", -1, -1, i, r, e, c, s, 0), y("z", "y", "x", 1, -1, i, r, -e, c, s, 1), y("x", "z", "y", 1, 1, e, i, r, o, c, 2), y("x", "z", "y", 1, -1, e, i, -r, o, c, 3), y("x", "y", "z", 1, -1, e, r, i, o, s, 4), y("x", "y", "z", -1, -1, e, r, -i, o, s, 5), u.setIndex(p), u.setAttribute("position", new gt(d, 3)), u.setAttribute("normal", new gt(f, 3)), u.setAttribute("uv", new gt(m, 2)), u
        }
        return n
    }();

function nn(e) {
    var t = {};
    for (var n in e)
        for (var r in t[n] = {}, e[n]) {
            var i = e[n][r];
            i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture) ? t[n][r] = i.clone() : Array.isArray(i) ? t[n][r] = i.slice() : t[n][r] = i
        }
    return t
}

function rn(e) { for (var t = {}, n = 0; n < e.length; n++) { var r = nn(e[n]); for (var i in r) t[i] = r[i] } return t }
var an = { clone: nn, merge: rn };

function on(e) { ot.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1 }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, void 0 !== e && (void 0 !== e.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(e)) }

function sn() { ue.call(this), this.type = "Camera", this.matrixWorldInverse = new W, this.projectionMatrix = new W, this.projectionMatrixInverse = new W }

function cn(e, t, n, r) { sn.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== e ? e : 50, this.zoom = 1, this.near = void 0 !== n ? n : .1, this.far = void 0 !== r ? r : 2e3, this.focus = 10, this.aspect = void 0 !== t ? t : 1, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix() }

function un(e, t, n, r) {
    ue.call(this), this.type = "CubeCamera";
    var i = new cn(90, 1, e, t);
    i.up.set(0, -1, 0), i.lookAt(new U(1, 0, 0)), this.add(i);
    var a = new cn(90, 1, e, t);
    a.up.set(0, -1, 0), a.lookAt(new U(-1, 0, 0)), this.add(a);
    var o = new cn(90, 1, e, t);
    o.up.set(0, 0, 1), o.lookAt(new U(0, 1, 0)), this.add(o);
    var s = new cn(90, 1, e, t);
    s.up.set(0, 0, -1), s.lookAt(new U(0, -1, 0)), this.add(s);
    var c = new cn(90, 1, e, t);
    c.up.set(0, -1, 0), c.lookAt(new U(0, 0, 1)), this.add(c);
    var u = new cn(90, 1, e, t);
    u.up.set(0, -1, 0), u.lookAt(new U(0, 0, -1)), this.add(u), r = r || { format: 1022, magFilter: 1006, minFilter: 1006 }, this.renderTarget = new ln(n, r), this.renderTarget.texture.name = "CubeCamera", this.update = function(e, t) {
        null === this.parent && this.updateMatrixWorld();
        var n = e.getRenderTarget(),
            r = this.renderTarget,
            l = r.texture.generateMipmaps;
        r.texture.generateMipmaps = !1, e.setRenderTarget(r, 0), e.render(t, i), e.setRenderTarget(r, 1), e.render(t, a), e.setRenderTarget(r, 2), e.render(t, o), e.setRenderTarget(r, 3), e.render(t, s), e.setRenderTarget(r, 4), e.render(t, c), r.texture.generateMipmaps = l, e.setRenderTarget(r, 5), e.render(t, u), e.setRenderTarget(n)
    }, this.clear = function(e, t, n, r) {
        for (var i = e.getRenderTarget(), a = this.renderTarget, o = 0; o < 6; o++) e.setRenderTarget(a, o), e.clear(t, n, r);
        e.setRenderTarget(i)
    }
}

function ln(e, t, n) { Number.isInteger(t) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), t = n), O.call(this, e, e, t) }

function hn(e, t, n, r, i, a, o, s, c, u, l, h) { P.call(this, null, a, o, s, c, u, r, i, l, h), this.image = { data: e || null, width: t || 1, height: n || 1 }, this.magFilter = void 0 !== c ? c : 1003, this.minFilter = void 0 !== u ? u : 1003, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0 }
on.prototype = Object.create(ot.prototype), on.prototype.constructor = on, on.prototype.isShaderMaterial = !0, on.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = nn(e.uniforms), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.lights = e.lights, this.clipping = e.clipping, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this.extensions = e.extensions, this }, on.prototype.toJSON = function(e) {
    var t = ot.prototype.toJSON.call(this, e);
    for (var n in t.uniforms = {}, this.uniforms) {
        var r = this.uniforms[n].value;
        r && r.isTexture ? t.uniforms[n] = { type: "t", value: r.toJSON(e).uuid } : r && r.isColor ? t.uniforms[n] = { type: "c", value: r.getHex() } : r && r.isVector2 ? t.uniforms[n] = { type: "v2", value: r.toArray() } : r && r.isVector3 ? t.uniforms[n] = { type: "v3", value: r.toArray() } : r && r.isVector4 ? t.uniforms[n] = { type: "v4", value: r.toArray() } : r && r.isMatrix3 ? t.uniforms[n] = { type: "m3", value: r.toArray() } : r && r.isMatrix4 ? t.uniforms[n] = { type: "m4", value: r.toArray() } : t.uniforms[n] = { value: r }
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
    var i = {};
    for (var a in this.extensions) !0 === this.extensions[a] && (i[a] = !0);
    return Object.keys(i).length > 0 && (t.extensions = i), t
}, sn.prototype = Object.assign(Object.create(ue.prototype), { constructor: sn, isCamera: !0, copy: function(e, t) { return ue.prototype.copy.call(this, e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this }, getWorldDirection: function(e) { void 0 === e && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), e = new U), this.updateMatrixWorld(!0); var t = this.matrixWorld.elements; return e.set(-t[8], -t[9], -t[10]).normalize() }, updateMatrixWorld: function(e) { ue.prototype.updateMatrixWorld.call(this, e), this.matrixWorldInverse.getInverse(this.matrixWorld) }, updateWorldMatrix: function(e, t) { ue.prototype.updateWorldMatrix.call(this, e, t), this.matrixWorldInverse.getInverse(this.matrixWorld) }, clone: function() { return (new this.constructor).copy(this) } }), cn.prototype = Object.assign(Object.create(sn.prototype), {
    constructor: cn,
    isPerspectiveCamera: !0,
    copy: function(e, t) { return sn.prototype.copy.call(this, e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this },
    setFocalLength: function(e) {
        var t = .5 * this.getFilmHeight() / e;
        this.fov = 2 * T.RAD2DEG * Math.atan(t), this.updateProjectionMatrix()
    },
    getFocalLength: function() { var e = Math.tan(.5 * T.DEG2RAD * this.fov); return .5 * this.getFilmHeight() / e },
    getEffectiveFOV: function() { return 2 * T.RAD2DEG * Math.atan(Math.tan(.5 * T.DEG2RAD * this.fov) / this.zoom) },
    getFilmWidth: function() { return this.filmGauge * Math.min(this.aspect, 1) },
    getFilmHeight: function() { return this.filmGauge / Math.max(this.aspect, 1) },
    setViewOffset: function(e, t, n, r, i, a) { this.aspect = e / t, null === this.view && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix() },
    clearViewOffset: function() { null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix() },
    updateProjectionMatrix: function() {
        var e = this.near,
            t = e * Math.tan(.5 * T.DEG2RAD * this.fov) / this.zoom,
            n = 2 * t,
            r = this.aspect * n,
            i = -.5 * r,
            a = this.view;
        if (null !== this.view && this.view.enabled) {
            var o = a.fullWidth,
                s = a.fullHeight;
            i += a.offsetX * r / o, t -= a.offsetY * n / s, r *= a.width / o, n *= a.height / s
        }
        var c = this.filmOffset;
        0 !== c && (i += e * c / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
    },
    toJSON: function(e) { var t = ue.prototype.toJSON.call(this, e); return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t }
}), un.prototype = Object.create(ue.prototype), un.prototype.constructor = un, ln.prototype = Object.create(O.prototype), ln.prototype.constructor = ln, ln.prototype.isWebGLCubeRenderTarget = !0, ln.prototype.fromEquirectangularTexture = function(e, t) {
    this.texture.type = t.type, this.texture.format = t.format, this.texture.encoding = t.encoding;
    var n = new le,
        r = { uniforms: { tEquirect: { value: null } }, vertexShader: ["varying vec3 vWorldDirection;", "vec3 transformDirection( in vec3 dir, in mat4 matrix ) {", "\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );", "}", "void main() {", "\tvWorldDirection = transformDirection( position, modelMatrix );", "\t#include <begin_vertex>", "\t#include <project_vertex>", "}"].join("\n"), fragmentShader: ["uniform sampler2D tEquirect;", "varying vec3 vWorldDirection;", "#define RECIPROCAL_PI 0.31830988618", "#define RECIPROCAL_PI2 0.15915494", "void main() {", "\tvec3 direction = normalize( vWorldDirection );", "\tvec2 sampleUV;", "\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;", "\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "\tgl_FragColor = texture2D( tEquirect, sampleUV );", "}"].join("\n") },
        i = new on({ type: "CubemapFromEquirect", uniforms: nn(r.uniforms), vertexShader: r.vertexShader, fragmentShader: r.fragmentShader, side: 1, blending: 0 });
    i.uniforms.tEquirect.value = t;
    var a = new qt(new tn(5, 5, 5), i);
    n.add(a);
    var o = new un(1, 10, 1);
    return o.renderTarget = this, o.renderTarget.texture.name = "CubeCameraTexture", o.update(e, n), a.geometry.dispose(), a.material.dispose(), this
}, hn.prototype = Object.create(P.prototype), hn.prototype.constructor = hn, hn.prototype.isDataTexture = !0;
var pn = new Ae,
    dn = new U;

function fn(e, t, n, r, i, a) { this.planes = [void 0 !== e ? e : new ke, void 0 !== t ? t : new ke, void 0 !== n ? n : new ke, void 0 !== r ? r : new ke, void 0 !== i ? i : new ke, void 0 !== a ? a : new ke] }
Object.assign(fn.prototype, {
    set: function(e, t, n, r, i, a) { var o = this.planes; return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { for (var t = this.planes, n = 0; n < 6; n++) t[n].copy(e.planes[n]); return this },
    setFromProjectionMatrix: function(e) {
        var t = this.planes,
            n = e.elements,
            r = n[0],
            i = n[1],
            a = n[2],
            o = n[3],
            s = n[4],
            c = n[5],
            u = n[6],
            l = n[7],
            h = n[8],
            p = n[9],
            d = n[10],
            f = n[11],
            m = n[12],
            v = n[13],
            g = n[14],
            y = n[15];
        return t[0].setComponents(o - r, l - s, f - h, y - m).normalize(), t[1].setComponents(o + r, l + s, f + h, y + m).normalize(), t[2].setComponents(o + i, l + c, f + p, y + v).normalize(), t[3].setComponents(o - i, l - c, f - p, y - v).normalize(), t[4].setComponents(o - a, l - u, f - d, y - g).normalize(), t[5].setComponents(o + a, l + u, f + d, y + g).normalize(), this
    },
    intersectsObject: function(e) { var t = e.geometry; return null === t.boundingSphere && t.computeBoundingSphere(), pn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(pn) },
    intersectsSprite: function(e) { return pn.center.set(0, 0, 0), pn.radius = .7071067811865476, pn.applyMatrix4(e.matrixWorld), this.intersectsSphere(pn) },
    intersectsSphere: function(e) {
        for (var t = this.planes, n = e.center, r = -e.radius, i = 0; i < 6; i++)
            if (t[i].distanceToPoint(n) < r) return !1;
        return !0
    },
    intersectsBox: function(e) { for (var t = this.planes, n = 0; n < 6; n++) { var r = t[n]; if (dn.x = r.normal.x > 0 ? e.max.x : e.min.x, dn.y = r.normal.y > 0 ? e.max.y : e.min.y, dn.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(dn) < 0) return !1 } return !0 },
    containsPoint: function(e) {
        for (var t = this.planes, n = 0; n < 6; n++)
            if (t[n].distanceToPoint(e) < 0) return !1;
        return !0
    }
});
var mn = { common: { diffuse: { value: new et(15658734) }, opacity: { value: 1 }, map: { value: null }, uvTransform: { value: new A }, uv2Transform: { value: new A }, alphaMap: { value: null } }, specularmap: { specularMap: { value: null } }, envmap: { envMap: { value: null }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, refractionRatio: { value: .98 }, maxMipLevel: { value: 0 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } }, emissivemap: { emissiveMap: { value: null } }, bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalScale: { value: new E(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, roughnessmap: { roughnessMap: { value: null } }, metalnessmap: { metalnessMap: { value: null } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new et(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotShadowMap: { value: [] }, spotShadowMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } } }, points: { diffuse: { value: new et(15658734) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, uvTransform: { value: new A } }, sprite: { diffuse: { value: new et(15658734) }, opacity: { value: 1 }, center: { value: new E(.5, .5) }, rotation: { value: 0 }, map: { value: null }, alphaMap: { value: null }, uvTransform: { value: new A } } };

function vn() {
    var e = null,
        t = !1,
        n = null;

    function r(i, a) {!1 !== t && (n(i, a), e.requestAnimationFrame(r)) }
    return { start: function() {!0 !== t && null !== n && (e.requestAnimationFrame(r), t = !0) }, stop: function() { t = !1 }, setAnimationLoop: function(e) { n = e }, setContext: function(t) { e = t } }
}

function gn(e, t) {
    var n = t.isWebGL2,
        r = new WeakMap;
    return {
        get: function(e) { return e.isInterleavedBufferAttribute && (e = e.data), r.get(e) },
        remove: function(t) {
            t.isInterleavedBufferAttribute && (t = t.data);
            var n = r.get(t);
            n && (e.deleteBuffer(n.buffer), r.delete(t))
        },
        update: function(t, i) {
            t.isInterleavedBufferAttribute && (t = t.data);
            var a = r.get(t);
            void 0 === a ? r.set(t, function(t, n) {
                var r = t.array,
                    i = t.usage,
                    a = e.createBuffer();
                e.bindBuffer(n, a), e.bufferData(n, r, i), t.onUploadCallback();
                var o = 5126;
                return r instanceof Float32Array ? o = 5126 : r instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : r instanceof Uint16Array ? o = 5123 : r instanceof Int16Array ? o = 5122 : r instanceof Uint32Array ? o = 5125 : r instanceof Int32Array ? o = 5124 : r instanceof Int8Array ? o = 5120 : r instanceof Uint8Array && (o = 5121), { buffer: a, type: o, bytesPerElement: r.BYTES_PER_ELEMENT, version: t.version }
            }(t, i)) : a.version < t.version && (function(t, r, i) {
                var a = r.array,
                    o = r.updateRange;
                e.bindBuffer(i, t), -1 === o.count ? e.bufferSubData(i, 0, a) : (n ? e.bufferSubData(i, o.offset * a.BYTES_PER_ELEMENT, a, o.offset, o.count) : e.bufferSubData(i, o.offset * a.BYTES_PER_ELEMENT, a.subarray(o.offset, o.offset + o.count)), o.count = -1)
            }(a.buffer, t, i), a.version = t.version)
        }
    }
}

function yn(e, t, n, r) { $t.call(this), this.type = "PlaneGeometry", this.parameters = { width: e, height: t, widthSegments: n, heightSegments: r }, this.fromBufferGeometry(new xn(e, t, n, r)), this.mergeVertices() }

function xn(e, t, n, r) {
    Lt.call(this), this.type = "PlaneBufferGeometry", this.parameters = { width: e, height: t, widthSegments: n, heightSegments: r };
    var i, a, o = (e = e || 1) / 2,
        s = (t = t || 1) / 2,
        c = Math.floor(n) || 1,
        u = Math.floor(r) || 1,
        l = c + 1,
        h = u + 1,
        p = e / c,
        d = t / u,
        f = [],
        m = [],
        v = [],
        g = [];
    for (a = 0; a < h; a++) {
        var y = a * d - s;
        for (i = 0; i < l; i++) {
            var x = i * p - o;
            m.push(x, -y, 0), v.push(0, 0, 1), g.push(i / c), g.push(1 - a / u)
        }
    }
    for (a = 0; a < u; a++)
        for (i = 0; i < c; i++) {
            var b = i + l * a,
                w = i + l * (a + 1),
                _ = i + 1 + l * (a + 1),
                M = i + 1 + l * a;
            f.push(b, w, M), f.push(w, _, M)
        }
    this.setIndex(f), this.setAttribute("position", new gt(m, 3)), this.setAttribute("normal", new gt(v, 3)), this.setAttribute("uv", new gt(g, 2))
}
yn.prototype = Object.create($t.prototype), yn.prototype.constructor = yn, xn.prototype = Object.create(Lt.prototype), xn.prototype.constructor = xn;
var bn = { alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif", alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif", alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif", aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif", aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif", begin_vertex: "vec3 transformed = vec3( position );", beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif", bsdfs: "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha  = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif", bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif", clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif", clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif", clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif", clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif", color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif", color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif", color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif", color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif", common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n  return m[ 2 ][ 3 ] == - 1.0;\n}", cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_maxMipLevel 8.0\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_maxTileSize 256.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction) {\n    vec3 absDirection = abs(direction);\n    float face = -1.0;\n    if (absDirection.x > absDirection.z) {\n      if (absDirection.x > absDirection.y)\n        face = direction.x > 0.0 ? 0.0 : 3.0;\n      else\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n    } else {\n      if (absDirection.z > absDirection.y)\n        face = direction.z > 0.0 ? 2.0 : 5.0;\n      else\n        face = direction.y > 0.0 ? 1.0 : 4.0;\n    }\n    return face;\n}\nvec2 getUV(vec3 direction, float face) {\n    vec2 uv;\n    if (face == 0.0) {\n      uv = vec2(-direction.z, direction.y) / abs(direction.x);\n    } else if (face == 1.0) {\n      uv = vec2(direction.x, -direction.z) / abs(direction.y);\n    } else if (face == 2.0) {\n      uv = direction.xy / abs(direction.z);\n    } else if (face == 3.0) {\n      uv = vec2(direction.z, direction.y) / abs(direction.x);\n    } else if (face == 4.0) {\n      uv = direction.xz / abs(direction.y);\n    } else {\n      uv = vec2(-direction.x, direction.y) / abs(direction.z);\n    }\n    return 0.5 * (uv + 1.0);\n}\nvec3 bilinearCubeUV(sampler2D envMap, vec3 direction, float mipInt) {\n  float face = getFace(direction);\n  float filterInt = max(cubeUV_minMipLevel - mipInt, 0.0);\n  mipInt = max(mipInt, cubeUV_minMipLevel);\n  float faceSize = exp2(mipInt);\n  float texelSize = 1.0 / (3.0 * cubeUV_maxTileSize);\n  vec2 uv = getUV(direction, face) * (faceSize - 1.0);\n  vec2 f = fract(uv);\n  uv += 0.5 - f;\n  if (face > 2.0) {\n    uv.y += faceSize;\n    face -= 3.0;\n  }\n  uv.x += face * faceSize;\n  if(mipInt < cubeUV_maxMipLevel){\n    uv.y += 2.0 * cubeUV_maxTileSize;\n  }\n  uv.y += filterInt * 2.0 * cubeUV_minTileSize;\n  uv.x += 3.0 * max(0.0, cubeUV_maxTileSize - 2.0 * faceSize);\n  uv *= texelSize;\n  vec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.x += texelSize;\n  vec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.y += texelSize;\n  vec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  uv.x -= texelSize;\n  vec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n  vec3 tm = mix(tl, tr, f.x);\n  vec3 bm = mix(bl, br, f.x);\n  return mix(tm, bm, f.y);\n}\n#define r0 1.0\n#define v0 0.339\n#define m0 -2.0\n#define r1 0.8\n#define v1 0.276\n#define m1 -1.0\n#define r4 0.4\n#define v4 0.046\n#define m4 2.0\n#define r5 0.305\n#define v5 0.016\n#define m5 3.0\n#define r6 0.21\n#define v6 0.0038\n#define m6 4.0\nfloat roughnessToMip(float roughness) {\n  float mip = 0.0;\n  if (roughness >= r1) {\n    mip = (r0 - roughness) * (m1 - m0) / (r0 - r1) + m0;\n  } else if (roughness >= r4) {\n    mip = (r1 - roughness) * (m4 - m1) / (r1 - r4) + m1;\n  } else if (roughness >= r5) {\n    mip = (r4 - roughness) * (m5 - m4) / (r4 - r5) + m4;\n  } else if (roughness >= r6) {\n    mip = (r5 - roughness) * (m6 - m5) / (r5 - r6) + m5;\n  } else {\n    mip = -2.0 * log2(1.16 * roughness);  }\n  return mip;\n}\nvec4 textureCubeUV(sampler2D envMap, vec3 sampleDir, float roughness) {\n  float mip = clamp(roughnessToMip(roughness), m0, cubeUV_maxMipLevel);\n  float mipF = fract(mip);\n  float mipInt = floor(mip);\n  vec3 color0 = bilinearCubeUV(envMap, sampleDir, mipInt);\n  if (mipF == 0.0) {\n    return vec4(color0, 1.0);\n  } else {\n    vec3 color1 = bilinearCubeUV(envMap, sampleDir, mipInt + 1.0);\n    return vec4(mix(color0, color1, mipF), 1.0);\n  }\n}\n#endif", defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif", displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif", displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif", emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif", emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif", encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );", encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}", envmap_fragment: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\t\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t}  else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif", envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif", envmap_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif", envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif", envmap_physical_pars_fragment: "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t  vec3 reflectVec = reflect( -viewDir, normal );\n\t\t  reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t  vec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif", envmap_vertex: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) { \n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif", fog_vertex: "#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif", fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif", fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif", fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif", gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}", lightmap_fragment: "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif", lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif", lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif", lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif", lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;", lights_toon_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)", lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;", lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)", lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif", lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}", lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif", lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif", lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif", logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif", logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif", logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif", logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif", map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif", map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif", map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif", map_particle_pars_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif", metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif", metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif", morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif", morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif", morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif", normal_fragment_begin: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;", normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif", normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tmat3 tsn = mat3( S, T, N );\n\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif", clearcoat_normal_fragment_begin: "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif", clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );\n\t#endif\n#endif", clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif", packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}", premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif", project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;", dithering_fragment: "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif", dithering_pars_fragment: "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif", roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif", roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif", shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif", shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif", shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif", shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}", skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif", skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif", skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif", skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif", specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif", specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif", tonemapping_fragment: "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif", tonemapping_pars_fragment: "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}", uv_pars_fragment: "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif", uv_pars_vertex: "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif", uv_vertex: "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif", uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif", uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif", uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif", worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif", background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}", background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}", cube_frag: "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}", cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}", depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}", depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}", distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}", distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}", equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}", equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}", linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}", linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}", meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}", meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}", meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}", meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}", meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}", meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}", meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}", meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}", meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}", meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}", meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSPARENCY\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSPARENCY\n\tuniform float transparency;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSPARENCY\n\t\tdiffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}", meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}", normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}", normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}", points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}", points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}", shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}", shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}", sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}", sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}" },
    wn = { basic: { uniforms: rn([mn.common, mn.specularmap, mn.envmap, mn.aomap, mn.lightmap, mn.fog]), vertexShader: bn.meshbasic_vert, fragmentShader: bn.meshbasic_frag }, lambert: { uniforms: rn([mn.common, mn.specularmap, mn.envmap, mn.aomap, mn.lightmap, mn.emissivemap, mn.fog, mn.lights, { emissive: { value: new et(0) } }]), vertexShader: bn.meshlambert_vert, fragmentShader: bn.meshlambert_frag }, phong: { uniforms: rn([mn.common, mn.specularmap, mn.envmap, mn.aomap, mn.lightmap, mn.emissivemap, mn.bumpmap, mn.normalmap, mn.displacementmap, mn.fog, mn.lights, { emissive: { value: new et(0) }, specular: { value: new et(1118481) }, shininess: { value: 30 } }]), vertexShader: bn.meshphong_vert, fragmentShader: bn.meshphong_frag }, standard: { uniforms: rn([mn.common, mn.envmap, mn.aomap, mn.lightmap, mn.emissivemap, mn.bumpmap, mn.normalmap, mn.displacementmap, mn.roughnessmap, mn.metalnessmap, mn.fog, mn.lights, { emissive: { value: new et(0) }, roughness: { value: .5 }, metalness: { value: .5 }, envMapIntensity: { value: 1 } }]), vertexShader: bn.meshphysical_vert, fragmentShader: bn.meshphysical_frag }, toon: { uniforms: rn([mn.common, mn.specularmap, mn.aomap, mn.lightmap, mn.emissivemap, mn.bumpmap, mn.normalmap, mn.displacementmap, mn.gradientmap, mn.fog, mn.lights, { emissive: { value: new et(0) }, specular: { value: new et(1118481) }, shininess: { value: 30 } }]), vertexShader: bn.meshtoon_vert, fragmentShader: bn.meshtoon_frag }, matcap: { uniforms: rn([mn.common, mn.bumpmap, mn.normalmap, mn.displacementmap, mn.fog, { matcap: { value: null } }]), vertexShader: bn.meshmatcap_vert, fragmentShader: bn.meshmatcap_frag }, points: { uniforms: rn([mn.points, mn.fog]), vertexShader: bn.points_vert, fragmentShader: bn.points_frag }, dashed: { uniforms: rn([mn.common, mn.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: bn.linedashed_vert, fragmentShader: bn.linedashed_frag }, depth: { uniforms: rn([mn.common, mn.displacementmap]), vertexShader: bn.depth_vert, fragmentShader: bn.depth_frag }, normal: { uniforms: rn([mn.common, mn.bumpmap, mn.normalmap, mn.displacementmap, { opacity: { value: 1 } }]), vertexShader: bn.normal_vert, fragmentShader: bn.normal_frag }, sprite: { uniforms: rn([mn.sprite, mn.fog]), vertexShader: bn.sprite_vert, fragmentShader: bn.sprite_frag }, background: { uniforms: { uvTransform: { value: new A }, t2D: { value: null } }, vertexShader: bn.background_vert, fragmentShader: bn.background_frag }, cube: { uniforms: rn([mn.envmap, { opacity: { value: 1 } }]), vertexShader: bn.cube_vert, fragmentShader: bn.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: bn.equirect_vert, fragmentShader: bn.equirect_frag }, distanceRGBA: { uniforms: rn([mn.common, mn.displacementmap, { referencePosition: { value: new U }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: bn.distanceRGBA_vert, fragmentShader: bn.distanceRGBA_frag }, shadow: { uniforms: rn([mn.lights, mn.fog, { color: { value: new et(0) }, opacity: { value: 1 } }]), vertexShader: bn.shadow_vert, fragmentShader: bn.shadow_frag } };

function _n(e, t, n, r) {
    var i, a, o = new et(0),
        s = 0,
        c = null,
        u = 0,
        l = null;

    function h(e, n) { t.buffers.color.setClear(e.r, e.g, e.b, n, r) }
    return {
        getClearColor: function() { return o },
        setClearColor: function(e, t) { o.set(e), h(o, s = void 0 !== t ? t : 1) },
        getClearAlpha: function() { return s },
        setClearAlpha: function(e) { h(o, s = e) },
        render: function(t, r, p, d) {
            var f = r.background,
                m = e.xr,
                v = m.getSession && m.getSession();
            if (v && "additive" === v.environmentBlendMode && (f = null), null === f ? h(o, s) : f && f.isColor && (h(f, 1), d = !0), (e.autoClear || d) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), f && (f.isCubeTexture || f.isWebGLCubeRenderTarget || 306 === f.mapping)) {
                void 0 === a && ((a = new qt(new tn(1, 1, 1), new on({ type: "BackgroundCubeMaterial", uniforms: nn(wn.cube.uniforms), vertexShader: wn.cube.vertexShader, fragmentShader: wn.cube.fragmentShader, side: 1, depthTest: !1, depthWrite: !1, fog: !1 }))).geometry.deleteAttribute("normal"), a.geometry.deleteAttribute("uv"), a.onBeforeRender = function(e, t, n) { this.matrixWorld.copyPosition(n.matrixWorld) }, Object.defineProperty(a.material, "envMap", { get: function() { return this.uniforms.envMap.value } }), n.update(a));
                var g = f.isWebGLCubeRenderTarget ? f.texture : f;
                a.material.uniforms.envMap.value = g, a.material.uniforms.flipEnvMap.value = g.isCubeTexture ? -1 : 1, c === f && u === g.version && l === e.toneMapping || (a.material.needsUpdate = !0, c = f, u = g.version, l = e.toneMapping), t.unshift(a, a.geometry, a.material, 0, 0, null)
            } else f && f.isTexture && (void 0 === i && ((i = new qt(new xn(2, 2), new on({ type: "BackgroundMaterial", uniforms: nn(wn.background.uniforms), vertexShader: wn.background.vertexShader, fragmentShader: wn.background.fragmentShader, side: 0, depthTest: !1, depthWrite: !1, fog: !1 }))).geometry.deleteAttribute("normal"), Object.defineProperty(i.material, "map", { get: function() { return this.uniforms.t2D.value } }), n.update(i)), i.material.uniforms.t2D.value = f, !0 === f.matrixAutoUpdate && f.updateMatrix(), i.material.uniforms.uvTransform.value.copy(f.matrix), c === f && u === f.version && l === e.toneMapping || (i.material.needsUpdate = !0, c = f, u = f.version, l = e.toneMapping), t.unshift(i, i.geometry, i.material, 0, 0, null))
        }
    }
}

function Mn(e, t, n, r) {
    var i, a = r.isWebGL2;
    this.setMode = function(e) { i = e }, this.render = function(t, r) { e.drawArrays(i, t, r), n.update(r, i) }, this.renderInstances = function(r, o, s, c) {
        if (0 !== c) {
            var u, l;
            if (a) u = e, l = "drawArraysInstanced";
            else if (l = "drawArraysInstancedANGLE", null === (u = t.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            u[l](i, o, s, c), n.update(s, i, c)
        }
    }
}

function Sn(e, t, n) {
    var r;

    function i(t) {
        if ("highp" === t) {
            if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
            t = "mediump"
        }
        return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
    }
    var a = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && e instanceof WebGL2ComputeRenderingContext,
        o = void 0 !== n.precision ? n.precision : "highp",
        s = i(o);
    s !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", s, "instead."), o = s);
    var c = !0 === n.logarithmicDepthBuffer,
        u = e.getParameter(34930),
        l = e.getParameter(35660),
        h = e.getParameter(3379),
        p = e.getParameter(34076),
        d = e.getParameter(34921),
        f = e.getParameter(36347),
        m = e.getParameter(36348),
        v = e.getParameter(36349),
        g = l > 0,
        y = a || !!t.get("OES_texture_float");
    return { isWebGL2: a, getMaxAnisotropy: function() { if (void 0 !== r) return r; var n = t.get("EXT_texture_filter_anisotropic"); return r = null !== n ? e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0 }, getMaxPrecision: i, precision: o, logarithmicDepthBuffer: c, maxTextures: u, maxVertexTextures: l, maxTextureSize: h, maxCubemapSize: p, maxAttributes: d, maxVertexUniforms: f, maxVaryings: m, maxFragmentUniforms: v, vertexTextures: g, floatFragmentTextures: y, floatVertexTextures: g && y, maxSamples: a ? e.getParameter(36183) : 0 }
}

function Tn() {
    var e = this,
        t = null,
        n = 0,
        r = !1,
        i = !1,
        a = new ke,
        o = new A,
        s = { value: null, needsUpdate: !1 };

    function c() { s.value !== t && (s.value = t, s.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0 }

    function u(t, n, r, i) {
        var c = null !== t ? t.length : 0,
            u = null;
        if (0 !== c) {
            if (u = s.value, !0 !== i || null === u) {
                var l = r + 4 * c,
                    h = n.matrixWorldInverse;
                o.getNormalMatrix(h), (null === u || u.length < l) && (u = new Float32Array(l));
                for (var p = 0, d = r; p !== c; ++p, d += 4) a.copy(t[p]).applyMatrix4(h, o), a.normal.toArray(u, d), u[d + 3] = a.constant
            }
            s.value = u, s.needsUpdate = !0
        }
        return e.numPlanes = c, e.numIntersection = 0, u
    }
    this.uniform = s, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, i, a) { var o = 0 !== e.length || i || 0 !== n || r; return r = i, t = u(e, a, 0), n = e.length, o }, this.beginShadows = function() { i = !0, u(null) }, this.endShadows = function() { i = !1, c() }, this.setState = function(e, a, o, l, h, p) {
        if (!r || null === e || 0 === e.length || i && !o) i ? u(null) : c();
        else {
            var d = i ? 0 : n,
                f = 4 * d,
                m = h.clippingState || null;
            s.value = m, m = u(e, l, f, p);
            for (var v = 0; v !== f; ++v) m[v] = t[v];
            h.clippingState = m, this.numIntersection = a ? this.numPlanes : 0, this.numPlanes += d
        }
    }
}

function En(e) {
    var t = {};
    return {
        get: function(n) {
            if (void 0 !== t[n]) return t[n];
            var r;
            switch (n) {
                case "WEBGL_depth_texture":
                    r = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
                    break;
                case "EXT_texture_filter_anisotropic":
                    r = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                    break;
                case "WEBGL_compressed_texture_s3tc":
                    r = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                    break;
                case "WEBGL_compressed_texture_pvrtc":
                    r = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                    break;
                default:
                    r = e.getExtension(n)
            }
            return null === r && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), t[n] = r, r
        }
    }
}

function An(e, t, n) {
    var r = new WeakMap,
        i = new WeakMap;

    function a(e) {
        var o = e.target,
            s = r.get(o);
        for (var c in null !== s.index && t.remove(s.index), s.attributes) t.remove(s.attributes[c]);
        o.removeEventListener("dispose", a), r.delete(o);
        var u = i.get(s);
        u && (t.remove(u), i.delete(s)), n.memory.geometries--
    }

    function o(e) {
        var n = [],
            r = e.index,
            a = e.attributes.position,
            o = 0;
        if (null !== r) {
            var s = r.array;
            o = r.version;
            for (var c = 0, u = s.length; c < u; c += 3) {
                var l = s[c + 0],
                    h = s[c + 1],
                    p = s[c + 2];
                n.push(l, h, h, p, p, l)
            }
        } else
            for (s = a.array, o = a.version, c = 0, u = s.length / 3 - 1; c < u; c += 3) l = c + 0, h = c + 1, p = c + 2, n.push(l, h, h, p, p, l);
        var d = new(bt(n) > 65535 ? vt : ft)(n, 1);
        d.version = o, t.update(d, 34963);
        var f = i.get(e);
        f && t.remove(f), i.set(e, d)
    }
    return {
        get: function(e, t) { var i = r.get(t); return i || (t.addEventListener("dispose", a), t.isBufferGeometry ? i = t : t.isGeometry && (void 0 === t._bufferGeometry && (t._bufferGeometry = (new Lt).setFromObject(e)), i = t._bufferGeometry), r.set(t, i), n.memory.geometries++, i) },
        update: function(e) {
            var n = e.index,
                r = e.attributes;
            for (var i in null !== n && t.update(n, 34963), r) t.update(r[i], 34962);
            var a = e.morphAttributes;
            for (var i in a)
                for (var o = a[i], s = 0, c = o.length; s < c; s++) t.update(o[s], 34962)
        },
        getWireframeAttribute: function(e) {
            var t = i.get(e);
            if (t) {
                var n = e.index;
                null !== n && t.version < n.version && o(e)
            } else o(e);
            return i.get(e)
        }
    }
}

function Ln(e, t, n, r) {
    var i, a, o, s = r.isWebGL2;
    this.setMode = function(e) { i = e }, this.setIndex = function(e) { a = e.type, o = e.bytesPerElement }, this.render = function(t, r) { e.drawElements(i, r, a, t * o), n.update(r, i) }, this.renderInstances = function(r, c, u, l) {
        if (0 !== l) {
            var h, p;
            if (s) h = e, p = "drawElementsInstanced";
            else if (p = "drawElementsInstancedANGLE", null === (h = t.get("ANGLE_instanced_arrays"))) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            h[p](i, u, a, c * o, l), n.update(u, i, l)
        }
    }
}

function Rn(e) {
    var t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    return {
        memory: { geometries: 0, textures: 0 },
        render: t,
        programs: null,
        autoReset: !0,
        reset: function() { t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0 },
        update: function(e, n, r) {
            switch (r = r || 1, t.calls++, n) {
                case 4:
                    t.triangles += r * (e / 3);
                    break;
                case 1:
                    t.lines += r * (e / 2);
                    break;
                case 3:
                    t.lines += r * (e - 1);
                    break;
                case 2:
                    t.lines += r * e;
                    break;
                case 0:
                    t.points += r * e;
                    break;
                default:
                    console.error("THREE.WebGLInfo: Unknown draw mode:", n)
            }
        }
    }
}

function Pn(e, t) { return Math.abs(t[1]) - Math.abs(e[1]) }

function Cn(e) {
    var t = {},
        n = new Float32Array(8);
    return {
        update: function(r, i, a, o) {
            var s = r.morphTargetInfluences,
                c = void 0 === s ? 0 : s.length,
                u = t[i.id];
            if (void 0 === u) {
                u = [];
                for (var l = 0; l < c; l++) u[l] = [l, 0];
                t[i.id] = u
            }
            var h = a.morphTargets && i.morphAttributes.position,
                p = a.morphNormals && i.morphAttributes.normal;
            for (l = 0; l < c; l++) 0 !== (f = u[l])[1] && (h && i.deleteAttribute("morphTarget" + l), p && i.deleteAttribute("morphNormal" + l));
            for (l = 0; l < c; l++)(f = u[l])[0] = l, f[1] = s[l];
            u.sort(Pn);
            var d = 0;
            for (l = 0; l < 8; l++) {
                var f;
                if (f = u[l]) {
                    var m = f[0],
                        v = f[1];
                    if (v) { h && i.setAttribute("morphTarget" + l, h[m]), p && i.setAttribute("morphNormal" + l, p[m]), n[l] = v, d += v; continue }
                }
                n[l] = 0
            }
            var g = i.morphTargetsRelative ? 1 : 1 - d;
            o.getUniforms().setValue(e, "morphTargetBaseInfluence", g), o.getUniforms().setValue(e, "morphTargetInfluences", n)
        }
    }
}

function On(e, t, n, r) {
    var i = new WeakMap;
    return {
        update: function(e) {
            var a = r.render.frame,
                o = e.geometry,
                s = t.get(e, o);
            return i.get(s) !== a && (o.isGeometry && s.updateFromObject(e), t.update(s), i.set(s, a)), e.isInstancedMesh && n.update(e.instanceMatrix, 34962), s
        },
        dispose: function() { i = new WeakMap }
    }
}

function In(e, t, n, r, i, a, o, s, c, u) { e = void 0 !== e ? e : [], t = void 0 !== t ? t : 301, o = void 0 !== o ? o : 1022, P.call(this, e, t, n, r, i, a, o, s, c, u), this.flipY = !1 }

function Dn(e, t, n, r) { P.call(this, null), this.image = { data: e || null, width: t || 1, height: n || 1, depth: r || 1 }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.needsUpdate = !0 }

function Nn(e, t, n, r) { P.call(this, null), this.image = { data: e || null, width: t || 1, height: n || 1, depth: r || 1 }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.needsUpdate = !0 }
wn.physical = { uniforms: rn([wn.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatNormalScale: { value: new E(1, 1) }, clearcoatNormalMap: { value: null }, sheen: { value: new et(0) }, transparency: { value: 0 } }]), vertexShader: bn.meshphysical_vert, fragmentShader: bn.meshphysical_frag }, In.prototype = Object.create(P.prototype), In.prototype.constructor = In, In.prototype.isCubeTexture = !0, Object.defineProperty(In.prototype, "images", { get: function() { return this.image }, set: function(e) { this.image = e } }), Dn.prototype = Object.create(P.prototype), Dn.prototype.constructor = Dn, Dn.prototype.isDataTexture2DArray = !0, Nn.prototype = Object.create(P.prototype), Nn.prototype.constructor = Nn, Nn.prototype.isDataTexture3D = !0;
var Fn = new P,
    Un = new Dn,
    Bn = new Nn,
    kn = new In,
    zn = [],
    Gn = [],
    Hn = new Float32Array(16),
    jn = new Float32Array(9),
    Vn = new Float32Array(4);

function Wn(e, t, n) {
    var r = e[0];
    if (r <= 0 || r > 0) return e;
    var i = t * n,
        a = zn[i];
    if (void 0 === a && (a = new Float32Array(i), zn[i] = a), 0 !== t) { r.toArray(a, 0); for (var o = 1, s = 0; o !== t; ++o) s += n, e[o].toArray(a, s) }
    return a
}

function qn(e, t) {
    if (e.length !== t.length) return !1;
    for (var n = 0, r = e.length; n < r; n++)
        if (e[n] !== t[n]) return !1;
    return !0
}

function Xn(e, t) { for (var n = 0, r = t.length; n < r; n++) e[n] = t[n] }

function Yn(e, t) {
    var n = Gn[t];
    void 0 === n && (n = new Int32Array(t), Gn[t] = n);
    for (var r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
    return n
}

function Zn(e, t) {
    var n = this.cache;
    n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t)
}

function Jn(e, t) {
    var n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
    else {
        if (qn(n, t)) return;
        e.uniform2fv(this.addr, t), Xn(n, t)
    }
}

function Kn(e, t) {
    var n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
    else if (void 0 !== t.r) n[0] === t.r && n[1] === t.g && n[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
    else {
        if (qn(n, t)) return;
        e.uniform3fv(this.addr, t), Xn(n, t)
    }
}

function Qn(e, t) {
    var n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z && n[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
    else {
        if (qn(n, t)) return;
        e.uniform4fv(this.addr, t), Xn(n, t)
    }
}

function $n(e, t) {
    var n = this.cache,
        r = t.elements;
    if (void 0 === r) {
        if (qn(n, t)) return;
        e.uniformMatrix2fv(this.addr, !1, t), Xn(n, t)
    } else {
        if (qn(n, r)) return;
        Vn.set(r), e.uniformMatrix2fv(this.addr, !1, Vn), Xn(n, r)
    }
}

function er(e, t) {
    var n = this.cache,
        r = t.elements;
    if (void 0 === r) {
        if (qn(n, t)) return;
        e.uniformMatrix3fv(this.addr, !1, t), Xn(n, t)
    } else {
        if (qn(n, r)) return;
        jn.set(r), e.uniformMatrix3fv(this.addr, !1, jn), Xn(n, r)
    }
}

function tr(e, t) {
    var n = this.cache,
        r = t.elements;
    if (void 0 === r) {
        if (qn(n, t)) return;
        e.uniformMatrix4fv(this.addr, !1, t), Xn(n, t)
    } else {
        if (qn(n, r)) return;
        Hn.set(r), e.uniformMatrix4fv(this.addr, !1, Hn), Xn(n, r)
    }
}

function nr(e, t, n) {
    var r = this.cache,
        i = n.allocateTextureUnit();
    r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.safeSetTexture2D(t || Fn, i)
}

function rr(e, t, n) {
    var r = this.cache,
        i = n.allocateTextureUnit();
    r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || Un, i)
}

function ir(e, t, n) {
    var r = this.cache,
        i = n.allocateTextureUnit();
    r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || Bn, i)
}

function ar(e, t, n) {
    var r = this.cache,
        i = n.allocateTextureUnit();
    r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.safeSetTextureCube(t || kn, i)
}

function or(e, t) {
    var n = this.cache;
    n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t)
}

function sr(e, t) {
    var n = this.cache;
    qn(n, t) || (e.uniform2iv(this.addr, t), Xn(n, t))
}

function cr(e, t) {
    var n = this.cache;
    qn(n, t) || (e.uniform3iv(this.addr, t), Xn(n, t))
}

function ur(e, t) {
    var n = this.cache;
    qn(n, t) || (e.uniform4iv(this.addr, t), Xn(n, t))
}

function lr(e, t) {
    var n = this.cache;
    n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t)
}

function hr(e, t) { e.uniform1fv(this.addr, t) }

function pr(e, t) { e.uniform1iv(this.addr, t) }

function dr(e, t) { e.uniform2iv(this.addr, t) }

function fr(e, t) { e.uniform3iv(this.addr, t) }

function mr(e, t) { e.uniform4iv(this.addr, t) }

function vr(e, t) {
    var n = Wn(t, this.size, 2);
    e.uniform2fv(this.addr, n)
}

function gr(e, t) {
    var n = Wn(t, this.size, 3);
    e.uniform3fv(this.addr, n)
}

function yr(e, t) {
    var n = Wn(t, this.size, 4);
    e.uniform4fv(this.addr, n)
}

function xr(e, t) {
    var n = Wn(t, this.size, 4);
    e.uniformMatrix2fv(this.addr, !1, n)
}

function br(e, t) {
    var n = Wn(t, this.size, 9);
    e.uniformMatrix3fv(this.addr, !1, n)
}

function wr(e, t) {
    var n = Wn(t, this.size, 16);
    e.uniformMatrix4fv(this.addr, !1, n)
}

function _r(e, t, n) {
    var r = t.length,
        i = Yn(n, r);
    e.uniform1iv(this.addr, i);
    for (var a = 0; a !== r; ++a) n.safeSetTexture2D(t[a] || Fn, i[a])
}

function Mr(e, t, n) {
    var r = t.length,
        i = Yn(n, r);
    e.uniform1iv(this.addr, i);
    for (var a = 0; a !== r; ++a) n.safeSetTextureCube(t[a] || kn, i[a])
}

function Sr(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.setValue = function(e) {
        switch (e) {
            case 5126:
                return Zn;
            case 35664:
                return Jn;
            case 35665:
                return Kn;
            case 35666:
                return Qn;
            case 35674:
                return $n;
            case 35675:
                return er;
            case 35676:
                return tr;
            case 5124:
            case 35670:
                return or;
            case 35667:
            case 35671:
                return sr;
            case 35668:
            case 35672:
                return cr;
            case 35669:
            case 35673:
                return ur;
            case 5125:
                return lr;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
                return nr;
            case 35679:
            case 36299:
            case 36307:
                return ir;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
                return ar;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
                return rr
        }
    }(t.type)
}

function Tr(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.size = t.size, this.setValue = function(e) {
        switch (e) {
            case 5126:
                return hr;
            case 35664:
                return vr;
            case 35665:
                return gr;
            case 35666:
                return yr;
            case 35674:
                return xr;
            case 35675:
                return br;
            case 35676:
                return wr;
            case 5124:
            case 35670:
                return pr;
            case 35667:
            case 35671:
                return dr;
            case 35668:
            case 35672:
                return fr;
            case 35669:
            case 35673:
                return mr;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
                return _r;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
                return Mr
        }
    }(t.type)
}

function Er(e) { this.id = e, this.seq = [], this.map = {} }
Tr.prototype.updateCache = function(e) {
    var t = this.cache;
    e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), Xn(t, e)
}, Er.prototype.setValue = function(e, t, n) {
    for (var r = this.seq, i = 0, a = r.length; i !== a; ++i) {
        var o = r[i];
        o.setValue(e, t[o.id], n)
    }
};
var Ar = /([\w\d_]+)(\])?(\[|\.)?/g;

function Lr(e, t) { e.seq.push(t), e.map[t.id] = t }

function Rr(e, t, n) {
    var r = e.name,
        i = r.length;
    for (Ar.lastIndex = 0;;) {
        var a = Ar.exec(r),
            o = Ar.lastIndex,
            s = a[1],
            c = "]" === a[2],
            u = a[3];
        if (c && (s |= 0), void 0 === u || "[" === u && o + 2 === i) { Lr(n, void 0 === u ? new Sr(s, e, t) : new Tr(s, e, t)); break }
        var l = n.map[s];
        void 0 === l && Lr(n, l = new Er(s)), n = l
    }
}

function Pr(e, t) {
    this.seq = [], this.map = {};
    for (var n = e.getProgramParameter(t, 35718), r = 0; r < n; ++r) {
        var i = e.getActiveUniform(t, r);
        Rr(i, e.getUniformLocation(t, i.name), this)
    }
}

function Cr(e, t, n) { var r = e.createShader(t); return e.shaderSource(r, n), e.compileShader(r), r }
Pr.prototype.setValue = function(e, t, n, r) {
    var i = this.map[t];
    void 0 !== i && i.setValue(e, n, r)
}, Pr.prototype.setOptional = function(e, t, n) {
    var r = t[n];
    void 0 !== r && this.setValue(e, n, r)
}, Pr.upload = function(e, t, n, r) {
    for (var i = 0, a = t.length; i !== a; ++i) {
        var o = t[i],
            s = n[o.id];
        !1 !== s.needsUpdate && o.setValue(e, s.value, r)
    }
}, Pr.seqWithValue = function(e, t) {
    for (var n = [], r = 0, i = e.length; r !== i; ++r) {
        var a = e[r];
        a.id in t && n.push(a)
    }
    return n
};
var Or = 0;

function Ir(e) {
    switch (e) {
        case 3e3:
            return ["Linear", "( value )"];
        case 3001:
            return ["sRGB", "( value )"];
        case 3002:
            return ["RGBE", "( value )"];
        case 3004:
            return ["RGBM", "( value, 7.0 )"];
        case 3005:
            return ["RGBM", "( value, 16.0 )"];
        case 3006:
            return ["RGBD", "( value, 256.0 )"];
        case 3007:
            return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
        case 3003:
            return ["LogLuv", "( value )"];
        default:
            throw new Error("unsupported encoding: " + e)
    }
}

function Dr(e, t, n) {
    var r = e.getShaderParameter(t, 35713),
        i = e.getShaderInfoLog(t).trim();
    return r && "" === i ? "" : "THREE.WebGLShader: gl.getShaderInfoLog() " + n + "\n" + i + function(e) { for (var t = e.split("\n"), n = 0; n < t.length; n++) t[n] = n + 1 + ": " + t[n]; return t.join("\n") }(e.getShaderSource(t))
}

function Nr(e, t) { var n = Ir(t); return "vec4 " + e + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }" }

function Fr(e, t) {
    var n;
    switch (t) {
        case 1:
            n = "Linear";
            break;
        case 2:
            n = "Reinhard";
            break;
        case 3:
            n = "Uncharted2";
            break;
        case 4:
            n = "OptimizedCineon";
            break;
        case 5:
            n = "ACESFilmic";
            break;
        default:
            throw new Error("unsupported toneMapping: " + t)
    }
    return "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
}

function Ur(e) { return "" !== e }

function Br(e, t) { return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows) }

function kr(e, t) { return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection) }
var zr = /^[ \t]*#include +<([\w\d./]+)>/gm;

function Gr(e) { return e.replace(zr, Hr) }

function Hr(e, t) { var n = bn[t]; if (void 0 === n) throw new Error("Can not resolve #include <" + t + ">"); return Gr(n) }
var jr = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
    Vr = /#pragma unroll_loop_start[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}[\s]+?#pragma unroll_loop_end/g;

function Wr(e) { return e.replace(Vr, Xr).replace(jr, qr) }

function qr(e, t, n, r) { return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), Xr(e, t, n, r) }

function Xr(e, t, n, r) { for (var i = "", a = parseInt(t); a < parseInt(n); a++) i += r.replace(/\[ i \]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a); return i }

function Yr(e) { var t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;"; return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t }

function Zr(e, t, n) {
    var r, i, a, o, s = e.getContext(),
        c = n.defines,
        u = n.vertexShader,
        l = n.fragmentShader,
        h = function(e) { var t = "SHADOWMAP_TYPE_BASIC"; return 1 === e.shadowMapType ? t = "SHADOWMAP_TYPE_PCF" : 2 === e.shadowMapType ? t = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === e.shadowMapType && (t = "SHADOWMAP_TYPE_VSM"), t }(n),
        p = function(e) {
            var t = "ENVMAP_TYPE_CUBE";
            if (e.envMap) switch (e.envMapMode) {
                case 301:
                case 302:
                    t = "ENVMAP_TYPE_CUBE";
                    break;
                case 306:
                case 307:
                    t = "ENVMAP_TYPE_CUBE_UV";
                    break;
                case 303:
                case 304:
                    t = "ENVMAP_TYPE_EQUIREC";
                    break;
                case 305:
                    t = "ENVMAP_TYPE_SPHERE"
            }
            return t
        }(n),
        d = function(e) {
            var t = "ENVMAP_MODE_REFLECTION";
            if (e.envMap) switch (e.envMapMode) {
                case 302:
                case 304:
                    t = "ENVMAP_MODE_REFRACTION"
            }
            return t
        }(n),
        f = function(e) {
            var t = "ENVMAP_BLENDING_NONE";
            if (e.envMap) switch (e.combine) {
                case 0:
                    t = "ENVMAP_BLENDING_MULTIPLY";
                    break;
                case 1:
                    t = "ENVMAP_BLENDING_MIX";
                    break;
                case 2:
                    t = "ENVMAP_BLENDING_ADD"
            }
            return t
        }(n),
        m = e.gammaFactor > 0 ? e.gammaFactor : 1,
        v = n.isWebGL2 ? "" : function(e) { return [e.extensionDerivatives || e.envMapCubeUV || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (e.extensionShaderTextureLOD || e.envMap) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(Ur).join("\n") }(n),
        g = function(e) { var t = []; for (var n in e) { var r = e[n];!1 !== r && t.push("#define " + n + " " + r) } return t.join("\n") }(c),
        y = s.createProgram();
    if (n.isRawShaderMaterial ? ((r = [g].filter(Ur).join("\n")).length > 0 && (r += "\n"), (i = [v, g].filter(Ur).join("\n")).length > 0 && (i += "\n")) : (r = [Yr(n), "#define SHADER_NAME " + n.shaderName, g, n.instancing ? "#define USE_INSTANCING" : "", n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + m, "#define MAX_BONES " + n.maxBones, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + d : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + h : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", " attribute mat4 instanceMatrix;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(Ur).join("\n"), i = [v, Yr(n), "#define SHADER_NAME " + n.shaderName, g, n.alphaTest ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0") : "", "#define GAMMA_FACTOR " + m, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + p : "", n.envMap ? "#define " + d : "", n.envMap ? "#define " + f : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.sheen ? "#define USE_SHEEN" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + h : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== n.toneMapping ? "#define TONE_MAPPING" : "", 0 !== n.toneMapping ? bn.tonemapping_pars_fragment : "", 0 !== n.toneMapping ? Fr("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.outputEncoding || n.mapEncoding || n.matcapEncoding || n.envMapEncoding || n.emissiveMapEncoding || n.lightMapEncoding ? bn.encodings_pars_fragment : "", n.mapEncoding ? Nr("mapTexelToLinear", n.mapEncoding) : "", n.matcapEncoding ? Nr("matcapTexelToLinear", n.matcapEncoding) : "", n.envMapEncoding ? Nr("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMapEncoding ? Nr("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.lightMapEncoding ? Nr("lightMapTexelToLinear", n.lightMapEncoding) : "", n.outputEncoding ? ("linearToOutputTexel", a = n.outputEncoding, o = Ir(a), "vec4 linearToOutputTexel( vec4 value ) { return LinearTo" + o[0] + o[1] + "; }") : "", n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(Ur).join("\n")), u = kr(u = Br(u = Gr(u), n), n), l = kr(l = Br(l = Gr(l), n), n), u = Wr(u), l = Wr(l), n.isWebGL2 && !n.isRawShaderMaterial) {
        var x = !1,
            b = /^\s*#version\s+300\s+es\s*\n/;
        n.isShaderMaterial && null !== u.match(b) && null !== l.match(b) && (x = !0, u = u.replace(b, ""), l = l.replace(b, "")), r = ["#version 300 es\n", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + r, i = ["#version 300 es\n", "#define varying in", x ? "" : "out highp vec4 pc_fragColor;", x ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + i
    }
    var w, _, M = i + l,
        S = Cr(s, 35633, r + u),
        T = Cr(s, 35632, M);
    if (s.attachShader(y, S), s.attachShader(y, T), void 0 !== n.index0AttributeName ? s.bindAttribLocation(y, 0, n.index0AttributeName) : !0 === n.morphTargets && s.bindAttribLocation(y, 0, "position"), s.linkProgram(y), e.debug.checkShaderErrors) {
        var E = s.getProgramInfoLog(y).trim(),
            A = s.getShaderInfoLog(S).trim(),
            L = s.getShaderInfoLog(T).trim(),
            R = !0,
            P = !0;
        if (!1 === s.getProgramParameter(y, 35714)) {
            R = !1;
            var C = Dr(s, S, "vertex"),
                O = Dr(s, T, "fragment");
            console.error("THREE.WebGLProgram: shader error: ", s.getError(), "35715", s.getProgramParameter(y, 35715), "gl.getProgramInfoLog", E, C, O)
        } else "" !== E ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", E) : "" !== A && "" !== L || (P = !1);
        P && (this.diagnostics = { runnable: R, programLog: E, vertexShader: { log: A, prefix: r }, fragmentShader: { log: L, prefix: i } })
    }
    return s.detachShader(y, S), s.detachShader(y, T), s.deleteShader(S), s.deleteShader(T), this.getUniforms = function() { return void 0 === w && (w = new Pr(s, y)), w }, this.getAttributes = function() {
        return void 0 === _ && (_ = function(e, t) {
            for (var n = {}, r = e.getProgramParameter(t, 35721), i = 0; i < r; i++) {
                var a = e.getActiveAttrib(t, i).name;
                n[a] = e.getAttribLocation(t, a)
            }
            return n
        }(s, y)), _
    }, this.destroy = function() { s.deleteProgram(y), this.program = void 0 }, this.name = n.shaderName, this.id = Or++, this.cacheKey = t, this.usedTimes = 1, this.program = y, this.vertexShader = S, this.fragmentShader = T, this
}

function Jr(e, t, n) {
    var r = [],
        i = n.isWebGL2,
        a = n.logarithmicDepthBuffer,
        o = n.floatVertexTextures,
        s = n.precision,
        c = n.maxVertexUniforms,
        u = n.vertexTextures,
        l = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" },
        h = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "sheen"];

    function p(e) { var t; return e ? e.isTexture ? t = e.encoding : e.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), t = e.texture.encoding) : t = 3e3, t }
    this.getParameters = function(r, h, d, f, m, v, g) {
        var y = f.fog,
            x = r.isMeshStandardMaterial ? f.environment : null,
            b = r.envMap || x,
            w = l[r.type],
            _ = g.isSkinnedMesh ? function(e) {
                var t = e.skeleton.bones;
                if (o) return 1024;
                var n = c,
                    r = Math.floor((n - 20) / 4),
                    i = Math.min(r, t.length);
                return i < t.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + t.length + " bones. This GPU supports " + i + "."), 0) : i
            }(g) : 0;
        null !== r.precision && (s = n.getMaxPrecision(r.precision)) !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", s, "instead.");
        var M = function(e, t) {
            var n;
            if (t) {
                var r = wn[t];
                n = { name: e.type, uniforms: an.clone(r.uniforms), vertexShader: r.vertexShader, fragmentShader: r.fragmentShader }
            } else n = { name: e.type, uniforms: e.uniforms, vertexShader: e.vertexShader, fragmentShader: e.fragmentShader };
            return n
        }(r, w);
        r.onBeforeCompile(M, e);
        var S = e.getRenderTarget();
        return { isWebGL2: i, shaderID: w, shaderName: M.name, uniforms: M.uniforms, vertexShader: M.vertexShader, fragmentShader: M.fragmentShader, defines: r.defines, isRawShaderMaterial: r.isRawShaderMaterial, isShaderMaterial: r.isShaderMaterial, precision: s, instancing: !0 === g.isInstancedMesh, supportsVertexTextures: u, outputEncoding: null !== S ? p(S.texture) : e.outputEncoding, map: !!r.map, mapEncoding: p(r.map), matcap: !!r.matcap, matcapEncoding: p(r.matcap), envMap: !!b, envMapMode: b && b.mapping, envMapEncoding: p(b), envMapCubeUV: !!b && (306 === b.mapping || 307 === b.mapping), lightMap: !!r.lightMap, lightMapEncoding: p(r.lightMap), aoMap: !!r.aoMap, emissiveMap: !!r.emissiveMap, emissiveMapEncoding: p(r.emissiveMap), bumpMap: !!r.bumpMap, normalMap: !!r.normalMap, objectSpaceNormalMap: 1 === r.normalMapType, tangentSpaceNormalMap: 0 === r.normalMapType, clearcoatMap: !!r.clearcoatMap, clearcoatRoughnessMap: !!r.clearcoatRoughnessMap, clearcoatNormalMap: !!r.clearcoatNormalMap, displacementMap: !!r.displacementMap, roughnessMap: !!r.roughnessMap, metalnessMap: !!r.metalnessMap, specularMap: !!r.specularMap, alphaMap: !!r.alphaMap, gradientMap: !!r.gradientMap, sheen: !!r.sheen, combine: r.combine, vertexTangents: r.normalMap && r.vertexTangents, vertexColors: r.vertexColors, vertexUvs: !!(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatMap || r.clearcoatRoughnessMap || r.clearcoatNormalMap || r.displacementMap), uvsVertexOnly: !(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatNormalMap || !r.displacementMap), fog: !!y, useFog: r.fog, fogExp2: y && y.isFogExp2, flatShading: r.flatShading, sizeAttenuation: r.sizeAttenuation, logarithmicDepthBuffer: a, skinning: r.skinning && _ > 0, maxBones: _, useVertexTexture: o, morphTargets: r.morphTargets, morphNormals: r.morphNormals, maxMorphTargets: e.maxMorphTargets, maxMorphNormals: e.maxMorphNormals, numDirLights: h.directional.length, numPointLights: h.point.length, numSpotLights: h.spot.length, numRectAreaLights: h.rectArea.length, numHemiLights: h.hemi.length, numDirLightShadows: h.directionalShadowMap.length, numPointLightShadows: h.pointShadowMap.length, numSpotLightShadows: h.spotShadowMap.length, numClippingPlanes: m, numClipIntersection: v, dithering: r.dithering, shadowMapEnabled: e.shadowMap.enabled && d.length > 0, shadowMapType: e.shadowMap.type, toneMapping: r.toneMapped ? e.toneMapping : 0, physicallyCorrectLights: e.physicallyCorrectLights, premultipliedAlpha: r.premultipliedAlpha, alphaTest: r.alphaTest, doubleSided: 2 === r.side, flipSided: 1 === r.side, depthPacking: void 0 !== r.depthPacking && r.depthPacking, index0AttributeName: r.index0AttributeName, extensionDerivatives: r.extensions && r.extensions.derivatives, extensionFragDepth: r.extensions && r.extensions.fragDepth, extensionDrawBuffers: r.extensions && r.extensions.drawBuffers, extensionShaderTextureLOD: r.extensions && r.extensions.shaderTextureLOD, rendererExtensionFragDepth: i || null !== t.get("EXT_frag_depth"), rendererExtensionDrawBuffers: i || null !== t.get("WEBGL_draw_buffers"), rendererExtensionShaderTextureLod: i || null !== t.get("EXT_shader_texture_lod"), onBeforeCompile: r.onBeforeCompile }
    }, this.getProgramCacheKey = function(t) {
        var n = [];
        if (t.shaderID ? n.push(t.shaderID) : (n.push(t.fragmentShader), n.push(t.vertexShader)), void 0 !== t.defines)
            for (var r in t.defines) n.push(r), n.push(t.defines[r]);
        if (void 0 === t.isRawShaderMaterial) {
            for (var i = 0; i < h.length; i++) n.push(t[h[i]]);
            n.push(e.outputEncoding), n.push(e.gammaFactor)
        }
        return n.push(t.onBeforeCompile.toString()), n.join()
    }, this.acquireProgram = function(t, n) { for (var i, a = 0, o = r.length; a < o; a++) { var s = r[a]; if (s.cacheKey === n) {++(i = s).usedTimes; break } } return void 0 === i && (i = new Zr(e, n, t), r.push(i)), i }, this.releaseProgram = function(e) {
        if (0 == --e.usedTimes) {
            var t = r.indexOf(e);
            r[t] = r[r.length - 1], r.pop(), e.destroy()
        }
    }, this.programs = r
}

function Kr() { var e = new WeakMap; return { get: function(t) { var n = e.get(t); return void 0 === n && (n = {}, e.set(t, n)), n }, remove: function(t) { e.delete(t) }, update: function(t, n, r) { e.get(t)[n] = r }, dispose: function() { e = new WeakMap } } }

function Qr(e, t) { return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.program !== t.program ? e.program.id - t.program.id : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id }

function $r(e, t) { return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id }

function ei() {
    var e = [],
        t = 0,
        n = [],
        r = [],
        i = { id: -1 };

    function a(n, r, a, o, s, c) { var u = e[t]; return void 0 === u ? (u = { id: n.id, object: n, geometry: r, material: a, program: a.program || i, groupOrder: o, renderOrder: n.renderOrder, z: s, group: c }, e[t] = u) : (u.id = n.id, u.object = n, u.geometry = r, u.material = a, u.program = a.program || i, u.groupOrder = o, u.renderOrder = n.renderOrder, u.z = s, u.group = c), t++, u }
    return {
        opaque: n,
        transparent: r,
        init: function() { t = 0, n.length = 0, r.length = 0 },
        push: function(e, t, i, o, s, c) {
            var u = a(e, t, i, o, s, c);
            (!0 === i.transparent ? r : n).push(u)
        },
        unshift: function(e, t, i, o, s, c) {
            var u = a(e, t, i, o, s, c);
            (!0 === i.transparent ? r : n).unshift(u)
        },
        finish: function() {
            for (var n = t, r = e.length; n < r; n++) {
                var i = e[n];
                if (null === i.id) break;
                i.id = null, i.object = null, i.geometry = null, i.material = null, i.program = null, i.group = null
            }
        },
        sort: function(e, t) { n.length > 1 && n.sort(e || Qr), r.length > 1 && r.sort(t || $r) }
    }
}

function ti() {
    var e = new WeakMap;

    function t(n) {
        var r = n.target;
        r.removeEventListener("dispose", t), e.delete(r)
    }
    return { get: function(n, r) { var i, a = e.get(n); return void 0 === a ? (i = new ei, e.set(n, new WeakMap), e.get(n).set(r, i), n.addEventListener("dispose", t)) : void 0 === (i = a.get(r)) && (i = new ei, a.set(r, i)), i }, dispose: function() { e = new WeakMap } }
}

function ni() {
    var e = {};
    return {
        get: function(t) {
            if (void 0 !== e[t.id]) return e[t.id];
            var n;
            switch (t.type) {
                case "DirectionalLight":
                    n = { direction: new U, color: new et };
                    break;
                case "SpotLight":
                    n = { position: new U, direction: new U, color: new et, distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
                    break;
                case "PointLight":
                    n = { position: new U, color: new et, distance: 0, decay: 0 };
                    break;
                case "HemisphereLight":
                    n = { direction: new U, skyColor: new et, groundColor: new et };
                    break;
                case "RectAreaLight":
                    n = { color: new et, position: new U, halfWidth: new U, halfHeight: new U }
            }
            return e[t.id] = n, n
        }
    }
}
var ri = 0;

function ii(e, t) { return (t.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0) }

function ai() {
    for (var e, t = new ni, n = (e = {}, {
            get: function(t) {
                if (void 0 !== e[t.id]) return e[t.id];
                var n;
                switch (t.type) {
                    case "DirectionalLight":
                    case "SpotLight":
                        n = { shadowBias: 0, shadowRadius: 1, shadowMapSize: new E };
                        break;
                    case "PointLight":
                        n = { shadowBias: 0, shadowRadius: 1, shadowMapSize: new E, shadowCameraNear: 1, shadowCameraFar: 1e3 }
                }
                return e[t.id] = n, n
            }
        }), r = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotShadow: [], spotShadowMap: [], spotShadowMatrix: [], rectArea: [], point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [] }, i = 0; i < 9; i++) r.probe.push(new U);
    var a = new U,
        o = new W,
        s = new W;
    return {
        setup: function(e, i, c) {
            for (var u = 0, l = 0, h = 0, p = 0; p < 9; p++) r.probe[p].set(0, 0, 0);
            var d = 0,
                f = 0,
                m = 0,
                v = 0,
                g = 0,
                y = 0,
                x = 0,
                b = 0,
                w = c.matrixWorldInverse;
            e.sort(ii), p = 0;
            for (var _ = e.length; p < _; p++) {
                var M = e[p],
                    S = M.color,
                    T = M.intensity,
                    E = M.distance,
                    A = M.shadow && M.shadow.map ? M.shadow.map.texture : null;
                if (M.isAmbientLight) u += S.r * T, l += S.g * T, h += S.b * T;
                else if (M.isLightProbe)
                    for (var L = 0; L < 9; L++) r.probe[L].addScaledVector(M.sh.coefficients[L], T);
                else if (M.isDirectionalLight) {
                    if ((C = t.get(M)).color.copy(M.color).multiplyScalar(M.intensity), C.direction.setFromMatrixPosition(M.matrixWorld), a.setFromMatrixPosition(M.target.matrixWorld), C.direction.sub(a), C.direction.transformDirection(w), M.castShadow) {
                        var R = M.shadow;
                        (P = n.get(M)).shadowBias = R.bias, P.shadowRadius = R.radius, P.shadowMapSize = R.mapSize, r.directionalShadow[d] = P, r.directionalShadowMap[d] = A, r.directionalShadowMatrix[d] = M.shadow.matrix, y++
                    }
                    r.directional[d] = C, d++
                } else if (M.isSpotLight)(C = t.get(M)).position.setFromMatrixPosition(M.matrixWorld), C.position.applyMatrix4(w), C.color.copy(S).multiplyScalar(T), C.distance = E, C.direction.setFromMatrixPosition(M.matrixWorld), a.setFromMatrixPosition(M.target.matrixWorld), C.direction.sub(a), C.direction.transformDirection(w), C.coneCos = Math.cos(M.angle), C.penumbraCos = Math.cos(M.angle * (1 - M.penumbra)), C.decay = M.decay, M.castShadow && (R = M.shadow, (P = n.get(M)).shadowBias = R.bias, P.shadowRadius = R.radius, P.shadowMapSize = R.mapSize, r.spotShadow[m] = P, r.spotShadowMap[m] = A, r.spotShadowMatrix[m] = M.shadow.matrix, b++), r.spot[m] = C, m++;
                else if (M.isRectAreaLight)(C = t.get(M)).color.copy(S).multiplyScalar(T), C.position.setFromMatrixPosition(M.matrixWorld), C.position.applyMatrix4(w), s.identity(), o.copy(M.matrixWorld), o.premultiply(w), s.extractRotation(o), C.halfWidth.set(.5 * M.width, 0, 0), C.halfHeight.set(0, .5 * M.height, 0), C.halfWidth.applyMatrix4(s), C.halfHeight.applyMatrix4(s), r.rectArea[v] = C, v++;
                else if (M.isPointLight) {
                    var P;
                    if ((C = t.get(M)).position.setFromMatrixPosition(M.matrixWorld), C.position.applyMatrix4(w), C.color.copy(M.color).multiplyScalar(M.intensity), C.distance = M.distance, C.decay = M.decay, M.castShadow) R = M.shadow, (P = n.get(M)).shadowBias = R.bias, P.shadowRadius = R.radius, P.shadowMapSize = R.mapSize, P.shadowCameraNear = R.camera.near, P.shadowCameraFar = R.camera.far, r.pointShadow[f] = P, r.pointShadowMap[f] = A, r.pointShadowMatrix[f] = M.shadow.matrix, x++;
                    r.point[f] = C, f++
                } else if (M.isHemisphereLight) {
                    var C;
                    (C = t.get(M)).direction.setFromMatrixPosition(M.matrixWorld), C.direction.transformDirection(w), C.direction.normalize(), C.skyColor.copy(M.color).multiplyScalar(T), C.groundColor.copy(M.groundColor).multiplyScalar(T), r.hemi[g] = C, g++
                }
            }
            r.ambient[0] = u, r.ambient[1] = l, r.ambient[2] = h;
            var O = r.hash;
            O.directionalLength === d && O.pointLength === f && O.spotLength === m && O.rectAreaLength === v && O.hemiLength === g && O.numDirectionalShadows === y && O.numPointShadows === x && O.numSpotShadows === b || (r.directional.length = d, r.spot.length = m, r.rectArea.length = v, r.point.length = f, r.hemi.length = g, r.directionalShadow.length = y, r.directionalShadowMap.length = y, r.pointShadow.length = x, r.pointShadowMap.length = x, r.spotShadow.length = b, r.spotShadowMap.length = b, r.directionalShadowMatrix.length = y, r.pointShadowMatrix.length = x, r.spotShadowMatrix.length = b, O.directionalLength = d, O.pointLength = f, O.spotLength = m, O.rectAreaLength = v, O.hemiLength = g, O.numDirectionalShadows = y, O.numPointShadows = x, O.numSpotShadows = b, r.version = ri++)
        },
        state: r
    }
}

function oi() {
    var e = new ai,
        t = [],
        n = [];
    return { init: function() { t.length = 0, n.length = 0 }, state: { lightsArray: t, shadowsArray: n, lights: e }, setupLights: function(r) { e.setup(t, n, r) }, pushLight: function(e) { t.push(e) }, pushShadow: function(e) { n.push(e) } }
}

function si() {
    var e = new WeakMap;

    function t(n) {
        var r = n.target;
        r.removeEventListener("dispose", t), e.delete(r)
    }
    return { get: function(n, r) { var i; return !1 === e.has(n) ? (i = new oi, e.set(n, new WeakMap), e.get(n).set(r, i), n.addEventListener("dispose", t)) : !1 === e.get(n).has(r) ? (i = new oi, e.get(n).set(r, i)) : i = e.get(n).get(r), i }, dispose: function() { e = new WeakMap } }
}

function ci(e) { ot.call(this), this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.setValues(e) }

function ui(e) { ot.call(this), this.type = "MeshDistanceMaterial", this.referencePosition = new U, this.nearDistance = 1, this.farDistance = 1e3, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.setValues(e) }

function li(e, t, n) {
    var r = new fn,
        i = new E,
        a = new E,
        o = new C,
        s = [],
        c = [],
        u = {},
        l = { 0: 1, 1: 0, 2: 2 },
        h = new on({ defines: { SAMPLE_RATE: .25, HALF_SAMPLE_RATE: 1 / 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new E }, radius: { value: 4 } }, vertexShader: "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}", fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n  float mean = 0.0;\n  float squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy  ) / resolution ) );\n  for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n    #ifdef HORIZONAL_PASS\n      vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n      mean += distribution.x;\n      squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n    #else\n      float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0,  i )  * radius ) / resolution ) );\n      mean += depth;\n      squared_mean += depth * depth;\n    #endif\n  }\n  mean = mean * HALF_SAMPLE_RATE;\n  squared_mean = squared_mean * HALF_SAMPLE_RATE;\n  float std_dev = sqrt( squared_mean - mean * mean );\n  gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}" }),
        p = h.clone();
    p.defines.HORIZONAL_PASS = 1;
    var d = new Lt;
    d.setAttribute("position", new ut(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
    var f = new qt(d, h),
        m = this;

    function v(n, r) {
        var i = t.update(f);
        h.uniforms.shadow_pass.value = n.map.texture, h.uniforms.resolution.value = n.mapSize, h.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, i, h, f, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, i, p, f, null)
    }

    function g(e, t, n) {
        var r = e << 0 | t << 1 | n << 2,
            i = s[r];
        return void 0 === i && (i = new ci({ depthPacking: 3201, morphTargets: e, skinning: t }), s[r] = i), i
    }

    function y(e, t, n) {
        var r = e << 0 | t << 1 | n << 2,
            i = c[r];
        return void 0 === i && (i = new ui({ morphTargets: e, skinning: t }), c[r] = i), i
    }

    function x(t, n, r, i, a, o) {
        var s = t.geometry,
            c = null,
            h = g,
            p = t.customDepthMaterial;
        if (!0 === r.isPointLight && (h = y, p = t.customDistanceMaterial), void 0 === p) { var d = !1;!0 === n.morphTargets && (!0 === s.isBufferGeometry ? d = s.morphAttributes && s.morphAttributes.position && s.morphAttributes.position.length > 0 : !0 === s.isGeometry && (d = s.morphTargets && s.morphTargets.length > 0)); var f = !1;!0 === t.isSkinnedMesh && (!0 === n.skinning ? f = !0 : console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", t)), c = h(d, f, !0 === t.isInstancedMesh) } else c = p;
        if (e.localClippingEnabled && !0 === n.clipShadows && 0 !== n.clippingPlanes.length) {
            var m = c.uuid,
                v = n.uuid,
                x = u[m];
            void 0 === x && (x = {}, u[m] = x);
            var b = x[v];
            void 0 === b && (b = c.clone(), x[v] = b), c = b
        }
        return c.visible = n.visible, c.wireframe = n.wireframe, c.side = 3 === o ? null !== n.shadowSide ? n.shadowSide : n.side : null !== n.shadowSide ? n.shadowSide : l[n.side], c.clipShadows = n.clipShadows, c.clippingPlanes = n.clippingPlanes, c.clipIntersection = n.clipIntersection, c.wireframeLinewidth = n.wireframeLinewidth, c.linewidth = n.linewidth, !0 === r.isPointLight && !0 === c.isMeshDistanceMaterial && (c.referencePosition.setFromMatrixPosition(r.matrixWorld), c.nearDistance = i, c.farDistance = a), c
    }

    function b(n, i, a, o, s) {
        if (!1 !== n.visible) {
            if (n.layers.test(i.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && 3 === s) && (!n.frustumCulled || r.intersectsObject(n))) {
                n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
                var c = t.update(n),
                    u = n.material;
                if (Array.isArray(u))
                    for (var l = c.groups, h = 0, p = l.length; h < p; h++) {
                        var d = l[h],
                            f = u[d.materialIndex];
                        if (f && f.visible) {
                            var m = x(n, f, o, a.near, a.far, s);
                            e.renderBufferDirect(a, null, c, m, n, d)
                        }
                    } else u.visible && (m = x(n, u, o, a.near, a.far, s), e.renderBufferDirect(a, null, c, m, n, null))
            }
            for (var v = n.children, g = 0, y = v.length; g < y; g++) b(v[g], i, a, o, s)
        }
    }
    this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1, this.render = function(t, s, c) {
        if (!1 !== m.enabled && (!1 !== m.autoUpdate || !1 !== m.needsUpdate) && 0 !== t.length) {
            var u = e.getRenderTarget(),
                l = e.getActiveCubeFace(),
                h = e.getActiveMipmapLevel(),
                p = e.state;
            p.setBlending(0), p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), p.setScissorTest(!1);
            for (var d = 0, f = t.length; d < f; d++) {
                var g = t[d],
                    y = g.shadow;
                if (void 0 !== y) {
                    i.copy(y.mapSize);
                    var x = y.getFrameExtents();
                    if (i.multiply(x), a.copy(y.mapSize), (i.x > n || i.y > n) && (console.warn("THREE.WebGLShadowMap:", g, "has shadow exceeding max texture size, reducing"), i.x > n && (a.x = Math.floor(n / x.x), i.x = a.x * x.x, y.mapSize.x = a.x), i.y > n && (a.y = Math.floor(n / x.y), i.y = a.y * x.y, y.mapSize.y = a.y)), null === y.map && !y.isPointLightShadow && 3 === this.type) {
                        var w = { minFilter: 1006, magFilter: 1006, format: 1023 };
                        y.map = new O(i.x, i.y, w), y.map.texture.name = g.name + ".shadowMap", y.mapPass = new O(i.x, i.y, w), y.camera.updateProjectionMatrix()
                    }
                    null === y.map && (w = { minFilter: 1003, magFilter: 1003, format: 1023 }, y.map = new O(i.x, i.y, w), y.map.texture.name = g.name + ".shadowMap", y.camera.updateProjectionMatrix()), e.setRenderTarget(y.map), e.clear();
                    for (var _ = y.getViewportCount(), M = 0; M < _; M++) {
                        var S = y.getViewport(M);
                        o.set(a.x * S.x, a.y * S.y, a.x * S.z, a.y * S.w), p.viewport(o), y.updateMatrices(g, M), r = y.getFrustum(), b(s, c, y.camera, g, this.type)
                    }
                    y.isPointLightShadow || 3 !== this.type || v(y, c)
                } else console.warn("THREE.WebGLShadowMap:", g, "has no shadow.")
            }
            m.needsUpdate = !1, e.setRenderTarget(u, l, h)
        }
    }
}

function hi(e, t, n) {
    var r, i, a = n.isWebGL2,
        o = new function() {
            var t = !1,
                n = new C,
                r = null,
                i = new C(0, 0, 0, 0);
            return { setMask: function(n) { r === n || t || (e.colorMask(n, n, n, n), r = n) }, setLocked: function(e) { t = e }, setClear: function(t, r, a, o, s) {!0 === s && (t *= o, r *= o, a *= o), n.set(t, r, a, o), !1 === i.equals(n) && (e.clearColor(t, r, a, o), i.copy(n)) }, reset: function() { t = !1, r = null, i.set(-1, 0, 0, 0) } }
        },
        s = new function() {
            var t = !1,
                n = null,
                r = null,
                i = null;
            return {
                setTest: function(e) { e ? H(2929) : j(2929) },
                setMask: function(r) { n === r || t || (e.depthMask(r), n = r) },
                setFunc: function(t) {
                    if (r !== t) {
                        if (t) switch (t) {
                            case 0:
                                e.depthFunc(512);
                                break;
                            case 1:
                                e.depthFunc(519);
                                break;
                            case 2:
                                e.depthFunc(513);
                                break;
                            case 3:
                                e.depthFunc(515);
                                break;
                            case 4:
                                e.depthFunc(514);
                                break;
                            case 5:
                                e.depthFunc(518);
                                break;
                            case 6:
                                e.depthFunc(516);
                                break;
                            case 7:
                                e.depthFunc(517);
                                break;
                            default:
                                e.depthFunc(515)
                        } else e.depthFunc(515);
                        r = t
                    }
                },
                setLocked: function(e) { t = e },
                setClear: function(t) { i !== t && (e.clearDepth(t), i = t) },
                reset: function() { t = !1, n = null, r = null, i = null }
            }
        },
        u = new function() {
            var t = !1,
                n = null,
                r = null,
                i = null,
                a = null,
                o = null,
                s = null,
                c = null,
                u = null;
            return { setTest: function(e) { t || (e ? H(2960) : j(2960)) }, setMask: function(r) { n === r || t || (e.stencilMask(r), n = r) }, setFunc: function(t, n, o) { r === t && i === n && a === o || (e.stencilFunc(t, n, o), r = t, i = n, a = o) }, setOp: function(t, n, r) { o === t && s === n && c === r || (e.stencilOp(t, n, r), o = t, s = n, c = r) }, setLocked: function(e) { t = e }, setClear: function(t) { u !== t && (e.clearStencil(t), u = t) }, reset: function() { t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, u = null } }
        },
        l = e.getParameter(34921),
        h = new Uint8Array(l),
        p = new Uint8Array(l),
        d = new Uint8Array(l),
        f = {},
        m = null,
        v = null,
        g = null,
        y = null,
        x = null,
        b = null,
        w = null,
        _ = null,
        M = null,
        S = !1,
        T = null,
        E = null,
        A = null,
        L = null,
        R = null,
        P = e.getParameter(35661),
        O = !1,
        I = 0,
        D = e.getParameter(7938); - 1 !== D.indexOf("WebGL") ? (I = parseFloat(/^WebGL\ ([0-9])/.exec(D)[1]), O = I >= 1) : -1 !== D.indexOf("OpenGL ES") && (I = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(D)[1]), O = I >= 2);
    var N = null,
        F = {},
        U = new C,
        B = new C;

    function k(t, n, r) {
        var i = new Uint8Array(4),
            a = e.createTexture();
        e.bindTexture(t, a), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
        for (var o = 0; o < r; o++) e.texImage2D(n + o, 0, 6408, 1, 1, 0, 6408, 5121, i);
        return a
    }
    var z = {};

    function G(n, r) { h[n] = 1, 0 === p[n] && (e.enableVertexAttribArray(n), p[n] = 1), d[n] !== r && ((a ? e : t.get("ANGLE_instanced_arrays"))[a ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, r), d[n] = r) }

    function H(t) {!0 !== f[t] && (e.enable(t), f[t] = !0) }

    function j(t) {!1 !== f[t] && (e.disable(t), f[t] = !1) }
    z[3553] = k(3553, 3553, 1), z[34067] = k(34067, 34069, 6), o.setClear(0, 0, 0, 1), s.setClear(1), u.setClear(0), H(2929), s.setFunc(3), Y(!1), Z(1), H(2884), X(0);
    var V = (c(r = {}, 100, 32774), c(r, 101, 32778), c(r, 102, 32779), r);
    if (a) V[103] = 32775, V[104] = 32776;
    else {
        var W = t.get("EXT_blend_minmax");
        null !== W && (V[103] = W.MIN_EXT, V[104] = W.MAX_EXT)
    }
    var q = (c(i = {}, 200, 0), c(i, 201, 1), c(i, 202, 768), c(i, 204, 770), c(i, 210, 776), c(i, 208, 774), c(i, 206, 772), c(i, 203, 769), c(i, 205, 771), c(i, 209, 775), c(i, 207, 773), i);

    function X(t, n, r, i, a, o, s, c) {
        if (0 !== t) {
            if (v || (H(3042), v = !0), 5 === t) a = a || n, o = o || r, s = s || i, n === y && a === w || (e.blendEquationSeparate(V[n], V[a]), y = n, w = a), r === x && i === b && o === _ && s === M || (e.blendFuncSeparate(q[r], q[i], q[o], q[s]), x = r, b = i, _ = o, M = s), g = t, S = null;
            else if (t !== g || c !== S) {
                if (100 === y && 100 === w || (e.blendEquation(32774), y = 100, w = 100), c) switch (t) {
                    case 1:
                        e.blendFuncSeparate(1, 771, 1, 771);
                        break;
                    case 2:
                        e.blendFunc(1, 1);
                        break;
                    case 3:
                        e.blendFuncSeparate(0, 0, 769, 771);
                        break;
                    case 4:
                        e.blendFuncSeparate(0, 768, 0, 770);
                        break;
                    default:
                        console.error("THREE.WebGLState: Invalid blending: ", t)
                } else switch (t) {
                    case 1:
                        e.blendFuncSeparate(770, 771, 1, 771);
                        break;
                    case 2:
                        e.blendFunc(770, 1);
                        break;
                    case 3:
                        e.blendFunc(0, 769);
                        break;
                    case 4:
                        e.blendFunc(0, 768);
                        break;
                    default:
                        console.error("THREE.WebGLState: Invalid blending: ", t)
                }
                x = null, b = null, _ = null, M = null, g = t, S = c
            }
        } else v && (j(3042), v = !1)
    }

    function Y(t) { T !== t && (t ? e.frontFace(2304) : e.frontFace(2305), T = t) }

    function Z(t) { 0 !== t ? (H(2884), t !== E && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : j(2884), E = t }

    function J(t, n, r) { t ? (H(32823), L === n && R === r || (e.polygonOffset(n, r), L = n, R = r)) : j(32823) }

    function K(t) { void 0 === t && (t = 33984 + P - 1), N !== t && (e.activeTexture(t), N = t) }
    return {
        buffers: { color: o, depth: s, stencil: u },
        initAttributes: function() { for (var e = 0, t = h.length; e < t; e++) h[e] = 0 },
        enableAttribute: function(e) { G(e, 0) },
        enableAttributeAndDivisor: G,
        disableUnusedAttributes: function() { for (var t = 0, n = p.length; t !== n; ++t) p[t] !== h[t] && (e.disableVertexAttribArray(t), p[t] = 0) },
        enable: H,
        disable: j,
        useProgram: function(t) { return m !== t && (e.useProgram(t), m = t, !0) },
        setBlending: X,
        setMaterial: function(e, t) {
            2 === e.side ? j(2884) : H(2884);
            var n = 1 === e.side;
            t && (n = !n), Y(n), 1 === e.blending && !1 === e.transparent ? X(0) : X(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha), s.setFunc(e.depthFunc), s.setTest(e.depthTest), s.setMask(e.depthWrite), o.setMask(e.colorWrite);
            var r = e.stencilWrite;
            u.setTest(r), r && (u.setMask(e.stencilWriteMask), u.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), u.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)), J(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits)
        },
        setFlipSided: Y,
        setCullFace: Z,
        setLineWidth: function(t) { t !== A && (O && e.lineWidth(t), A = t) },
        setPolygonOffset: J,
        setScissorTest: function(e) { e ? H(3089) : j(3089) },
        activeTexture: K,
        bindTexture: function(t, n) {
            null === N && K();
            var r = F[N];
            void 0 === r && (r = { type: void 0, texture: void 0 }, F[N] = r), r.type === t && r.texture === n || (e.bindTexture(t, n || z[t]), r.type = t, r.texture = n)
        },
        unbindTexture: function() {
            var t = F[N];
            void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0)
        },
        compressedTexImage2D: function() { try { e.compressedTexImage2D.apply(e, arguments) } catch (e) { console.error("THREE.WebGLState:", e) } },
        texImage2D: function() { try { e.texImage2D.apply(e, arguments) } catch (e) { console.error("THREE.WebGLState:", e) } },
        texImage3D: function() { try { e.texImage3D.apply(e, arguments) } catch (e) { console.error("THREE.WebGLState:", e) } },
        scissor: function(t) {!1 === U.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), U.copy(t)) },
        viewport: function(t) {!1 === B.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), B.copy(t)) },
        reset: function() {
            for (var t = 0; t < p.length; t++) 1 === p[t] && (e.disableVertexAttribArray(t), p[t] = 0);
            f = {}, N = null, F = {}, m = null, g = null, T = null, E = null, o.reset(), s.reset(), u.reset()
        }
    }
}

function pi(e, t, n, r, i, a, o) {
    var s, u, l, h = i.isWebGL2,
        p = i.maxTextures,
        d = i.maxCubemapSize,
        f = i.maxTextureSize,
        m = i.maxSamples,
        v = new WeakMap,
        g = !1;
    try { g = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d") } catch (e) {}

    function y(e, t) { return g ? new OffscreenCanvas(e, t) : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas") }

    function x(e, t, n, r) {
        var i = 1;
        if ((e.width > r || e.height > r) && (i = r / Math.max(e.width, e.height)), i < 1 || !0 === t) {
            if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                var a = t ? T.floorPowerOfTwo : Math.floor,
                    o = a(i * e.width),
                    s = a(i * e.height);
                void 0 === l && (l = y(o, s));
                var c = n ? y(o, s) : l;
                return c.width = o, c.height = s, c.getContext("2d").drawImage(e, 0, 0, o, s), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + o + "x" + s + ")."), c
            }
            return "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ")."), e
        }
        return e
    }

    function b(e) { return T.isPowerOfTwo(e.width) && T.isPowerOfTwo(e.height) }

    function w(e, t) { return e.generateMipmaps && t && 1003 !== e.minFilter && 1006 !== e.minFilter }

    function _(t, n, i, a) { e.generateMipmap(t), r.get(n).__maxMipLevel = Math.log(Math.max(i, a)) * Math.LOG2E }

    function M(n, r, i) {
        if (!1 === h) return r;
        if (null !== n) {
            if (void 0 !== e[n]) return e[n];
            console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'")
        }
        var a = r;
        return 6403 === r && (5126 === i && (a = 33326), 5131 === i && (a = 33325), 5121 === i && (a = 33321)), 6407 === r && (5126 === i && (a = 34837), 5131 === i && (a = 34843), 5121 === i && (a = 32849)), 6408 === r && (5126 === i && (a = 34836), 5131 === i && (a = 34842), 5121 === i && (a = 32856)), 33325 !== a && 33326 !== a && 34842 !== a && 34836 !== a || t.get("EXT_color_buffer_float"), a
    }

    function S(e) { return 1003 === e || 1004 === e || 1005 === e ? 9728 : 9729 }

    function E(t) {
        var n = t.target;
        n.removeEventListener("dispose", E),
            function(t) {
                var n = r.get(t);
                void 0 !== n.__webglInit && (e.deleteTexture(n.__webglTexture), r.remove(t))
            }(n), n.isVideoTexture && v.delete(n), o.memory.textures--
    }

    function A(t) {
        var n = t.target;
        n.removeEventListener("dispose", A),
            function(t) {
                var n = r.get(t),
                    i = r.get(t.texture);
                if (t) {
                    if (void 0 !== i.__webglTexture && e.deleteTexture(i.__webglTexture), t.depthTexture && t.depthTexture.dispose(), t.isWebGLCubeRenderTarget)
                        for (var a = 0; a < 6; a++) e.deleteFramebuffer(n.__webglFramebuffer[a]), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[a]);
                    else e.deleteFramebuffer(n.__webglFramebuffer), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer && e.deleteRenderbuffer(n.__webglColorRenderbuffer), n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
                    r.remove(t.texture), r.remove(t)
                }
            }(n), o.memory.textures--
    }
    var L = 0;

    function R(e, t) {
        var i = r.get(e);
        if (e.isVideoTexture && function(e) {
                var t = o.render.frame;
                v.get(e) !== t && (v.set(e, t), e.update())
            }(e), e.version > 0 && i.__version !== e.version) {
            var a = e.image;
            if (void 0 === a) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
            else {
                if (!1 !== a.complete) return void F(i, e, t);
                console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
            }
        }
        n.activeTexture(33984 + t), n.bindTexture(3553, i.__webglTexture)
    }

    function P(t, i) {
        if (6 === t.image.length) {
            var o = r.get(t);
            if (t.version > 0 && o.__version !== t.version) {
                N(o, t), n.activeTexture(33984 + i), n.bindTexture(34067, o.__webglTexture), e.pixelStorei(37440, t.flipY);
                for (var s = t && (t.isCompressedTexture || t.image[0].isCompressedTexture), c = t.image[0] && t.image[0].isDataTexture, u = [], l = 0; l < 6; l++) u[l] = s || c ? c ? t.image[l].image : t.image[l] : x(t.image[l], !1, !0, d);
                var p, f = u[0],
                    m = b(f) || h,
                    v = a.convert(t.format),
                    g = a.convert(t.type),
                    y = M(t.internalFormat, v, g);
                if (D(34067, t, m), s) {
                    for (l = 0; l < 6; l++) {
                        p = u[l].mipmaps;
                        for (var S = 0; S < p.length; S++) {
                            var T = p[S];
                            1023 !== t.format && 1022 !== t.format ? null !== v ? n.compressedTexImage2D(34069 + l, S, y, T.width, T.height, 0, T.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(34069 + l, S, y, T.width, T.height, 0, v, g, T.data)
                        }
                    }
                    o.__maxMipLevel = p.length - 1
                } else {
                    for (p = t.mipmaps, l = 0; l < 6; l++)
                        if (c)
                            for (n.texImage2D(34069 + l, 0, y, u[l].width, u[l].height, 0, v, g, u[l].data), S = 0; S < p.length; S++) {
                                var E = (T = p[S]).image[l].image;
                                n.texImage2D(34069 + l, S + 1, y, E.width, E.height, 0, v, g, E.data)
                            } else
                                for (n.texImage2D(34069 + l, 0, y, v, g, u[l]), S = 0; S < p.length; S++) T = p[S], n.texImage2D(34069 + l, S + 1, y, v, g, T.image[l]);
                    o.__maxMipLevel = p.length
                }
                w(t, m) && _(34067, t, f.width, f.height), o.__version = t.version, t.onUpdate && t.onUpdate(t)
            } else n.activeTexture(33984 + i), n.bindTexture(34067, o.__webglTexture)
        }
    }

    function C(e, t) { n.activeTexture(33984 + t), n.bindTexture(34067, r.get(e).__webglTexture) }
    var O = (c(s = {}, 1e3, 10497), c(s, 1001, 33071), c(s, 1002, 33648), s),
        I = (c(u = {}, 1003, 9728), c(u, 1004, 9984), c(u, 1005, 9986), c(u, 1006, 9729), c(u, 1007, 9985), c(u, 1008, 9987), u);

    function D(n, a, o) {
        o ? (e.texParameteri(n, 10242, O[a.wrapS]), e.texParameteri(n, 10243, O[a.wrapT]), 32879 !== n && 35866 !== n || e.texParameteri(n, 32882, O[a.wrapR]), e.texParameteri(n, 10240, I[a.magFilter]), e.texParameteri(n, 10241, I[a.minFilter])) : (e.texParameteri(n, 10242, 33071), e.texParameteri(n, 10243, 33071), 32879 !== n && 35866 !== n || e.texParameteri(n, 32882, 33071), 1001 === a.wrapS && 1001 === a.wrapT || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), e.texParameteri(n, 10240, S(a.magFilter)), e.texParameteri(n, 10241, S(a.minFilter)), 1003 !== a.minFilter && 1006 !== a.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));
        var s = t.get("EXT_texture_filter_anisotropic");
        if (s) {
            if (1015 === a.type && null === t.get("OES_texture_float_linear")) return;
            if (1016 === a.type && null === (h || t.get("OES_texture_half_float_linear"))) return;
            (a.anisotropy > 1 || r.get(a).__currentAnisotropy) && (e.texParameterf(n, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, i.getMaxAnisotropy())), r.get(a).__currentAnisotropy = a.anisotropy)
        }
    }

    function N(t, n) { void 0 === t.__webglInit && (t.__webglInit = !0, n.addEventListener("dispose", E), t.__webglTexture = e.createTexture(), o.memory.textures++) }

    function F(t, r, i) {
        var o = 3553;
        r.isDataTexture2DArray && (o = 35866), r.isDataTexture3D && (o = 32879), N(t, r), n.activeTexture(33984 + i), n.bindTexture(o, t.__webglTexture), e.pixelStorei(37440, r.flipY), e.pixelStorei(37441, r.premultiplyAlpha), e.pixelStorei(3317, r.unpackAlignment);
        var s = function(e) { return !h && (1001 !== e.wrapS || 1001 !== e.wrapT || 1003 !== e.minFilter && 1006 !== e.minFilter) }(r) && !1 === b(r.image),
            c = x(r.image, s, !1, f),
            u = b(c) || h,
            l = a.convert(r.format),
            p = a.convert(r.type),
            d = M(r.internalFormat, l, p);
        D(o, r, u);
        var m, v = r.mipmaps;
        if (r.isDepthTexture) d = 6402, h ? d = 1015 === r.type ? 36012 : 1014 === r.type ? 33190 : 1020 === r.type ? 35056 : 33189 : 1015 === r.type && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), 1026 === r.format && 6402 === d && 1012 !== r.type && 1014 !== r.type && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), r.type = 1012, p = a.convert(r.type)), 1027 === r.format && 6402 === d && (d = 34041, 1020 !== r.type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), r.type = 1020, p = a.convert(r.type))), n.texImage2D(3553, 0, d, c.width, c.height, 0, l, p, null);
        else if (r.isDataTexture)
            if (v.length > 0 && u) {
                for (var g = 0, y = v.length; g < y; g++) m = v[g], n.texImage2D(3553, g, d, m.width, m.height, 0, l, p, m.data);
                r.generateMipmaps = !1, t.__maxMipLevel = v.length - 1
            } else n.texImage2D(3553, 0, d, c.width, c.height, 0, l, p, c.data), t.__maxMipLevel = 0;
        else if (r.isCompressedTexture) {
            for (g = 0, y = v.length; g < y; g++) m = v[g], 1023 !== r.format && 1022 !== r.format ? null !== l ? n.compressedTexImage2D(3553, g, d, m.width, m.height, 0, m.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(3553, g, d, m.width, m.height, 0, l, p, m.data);
            t.__maxMipLevel = v.length - 1
        } else if (r.isDataTexture2DArray) n.texImage3D(35866, 0, d, c.width, c.height, c.depth, 0, l, p, c.data), t.__maxMipLevel = 0;
        else if (r.isDataTexture3D) n.texImage3D(32879, 0, d, c.width, c.height, c.depth, 0, l, p, c.data), t.__maxMipLevel = 0;
        else if (v.length > 0 && u) {
            for (g = 0, y = v.length; g < y; g++) m = v[g], n.texImage2D(3553, g, d, l, p, m);
            r.generateMipmaps = !1, t.__maxMipLevel = v.length - 1
        } else n.texImage2D(3553, 0, d, l, p, c), t.__maxMipLevel = 0;
        w(r, u) && _(o, r, c.width, c.height), t.__version = r.version, r.onUpdate && r.onUpdate(r)
    }

    function U(t, i, o, s) {
        var c = a.convert(i.texture.format),
            u = a.convert(i.texture.type),
            l = M(i.texture.internalFormat, c, u);
        n.texImage2D(s, 0, l, i.width, i.height, 0, c, u, null), e.bindFramebuffer(36160, t), e.framebufferTexture2D(36160, o, s, r.get(i.texture).__webglTexture, 0), e.bindFramebuffer(36160, null)
    }

    function B(t, n, r) {
        if (e.bindRenderbuffer(36161, t), n.depthBuffer && !n.stencilBuffer) {
            var i = 33189;
            if (r) {
                var o = n.depthTexture;
                o && o.isDepthTexture && (1015 === o.type ? i = 36012 : 1014 === o.type && (i = 33190));
                var s = k(n);
                e.renderbufferStorageMultisample(36161, s, i, n.width, n.height)
            } else e.renderbufferStorage(36161, i, n.width, n.height);
            e.framebufferRenderbuffer(36160, 36096, 36161, t)
        } else if (n.depthBuffer && n.stencilBuffer) r ? (s = k(n), e.renderbufferStorageMultisample(36161, s, 35056, n.width, n.height)) : e.renderbufferStorage(36161, 34041, n.width, n.height), e.framebufferRenderbuffer(36160, 33306, 36161, t);
        else {
            var c = a.convert(n.texture.format),
                u = a.convert(n.texture.type);
            i = M(n.texture.internalFormat, c, u), r ? (s = k(n), e.renderbufferStorageMultisample(36161, s, i, n.width, n.height)) : e.renderbufferStorage(36161, i, n.width, n.height)
        }
        e.bindRenderbuffer(36161, null)
    }

    function k(e) { return h && e.isWebGLMultisampleRenderTarget ? Math.min(m, e.samples) : 0 }
    var z = !1,
        G = !1;
    this.allocateTextureUnit = function() { var e = L; return e >= p && console.warn("THREE.WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + p), L += 1, e }, this.resetTextureUnits = function() { L = 0 }, this.setTexture2D = R, this.setTexture2DArray = function(e, t) {
        var i = r.get(e);
        e.version > 0 && i.__version !== e.version ? F(i, e, t) : (n.activeTexture(33984 + t), n.bindTexture(35866, i.__webglTexture))
    }, this.setTexture3D = function(e, t) {
        var i = r.get(e);
        e.version > 0 && i.__version !== e.version ? F(i, e, t) : (n.activeTexture(33984 + t), n.bindTexture(32879, i.__webglTexture))
    }, this.setTextureCube = P, this.setTextureCubeDynamic = C, this.setupRenderTarget = function(t) {
        var i = r.get(t),
            s = r.get(t.texture);
        t.addEventListener("dispose", A), s.__webglTexture = e.createTexture(), o.memory.textures++;
        var c = !0 === t.isWebGLCubeRenderTarget,
            u = !0 === t.isWebGLMultisampleRenderTarget,
            l = b(t) || h;
        if (!h || 1022 !== t.texture.format || 1015 !== t.texture.type && 1016 !== t.texture.type || (t.texture.format = 1023, console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")), c) { i.__webglFramebuffer = []; for (var p = 0; p < 6; p++) i.__webglFramebuffer[p] = e.createFramebuffer() } else if (i.__webglFramebuffer = e.createFramebuffer(), u)
            if (h) {
                i.__webglMultisampledFramebuffer = e.createFramebuffer(), i.__webglColorRenderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(36161, i.__webglColorRenderbuffer);
                var d = a.convert(t.texture.format),
                    f = a.convert(t.texture.type),
                    m = M(t.texture.internalFormat, d, f),
                    v = k(t);
                e.renderbufferStorageMultisample(36161, v, m, t.width, t.height), e.bindFramebuffer(36160, i.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064, 36161, i.__webglColorRenderbuffer), e.bindRenderbuffer(36161, null), t.depthBuffer && (i.__webglDepthRenderbuffer = e.createRenderbuffer(), B(i.__webglDepthRenderbuffer, t, !0)), e.bindFramebuffer(36160, null)
            } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
        if (c) {
            for (n.bindTexture(34067, s.__webglTexture), D(34067, t.texture, l), p = 0; p < 6; p++) U(i.__webglFramebuffer[p], t, 36064, 34069 + p);
            w(t.texture, l) && _(34067, t.texture, t.width, t.height), n.bindTexture(34067, null)
        } else n.bindTexture(3553, s.__webglTexture), D(3553, t.texture, l), U(i.__webglFramebuffer, t, 36064, 3553), w(t.texture, l) && _(3553, t.texture, t.width, t.height), n.bindTexture(3553, null);
        t.depthBuffer && function(t) {
            var n = r.get(t),
                i = !0 === t.isWebGLCubeRenderTarget;
            if (t.depthTexture) {
                if (i) throw new Error("target.depthTexture not supported in Cube render targets");
                ! function(t, n) {
                    if (n && n.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
                    if (e.bindFramebuffer(36160, t), !n.depthTexture || !n.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    r.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height || (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = !0), R(n.depthTexture, 0);
                    var i = r.get(n.depthTexture).__webglTexture;
                    if (1026 === n.depthTexture.format) e.framebufferTexture2D(36160, 36096, 3553, i, 0);
                    else {
                        if (1027 !== n.depthTexture.format) throw new Error("Unknown depthTexture format");
                        e.framebufferTexture2D(36160, 33306, 3553, i, 0)
                    }
                }(n.__webglFramebuffer, t)
            } else if (i) { n.__webglDepthbuffer = []; for (var a = 0; a < 6; a++) e.bindFramebuffer(36160, n.__webglFramebuffer[a]), n.__webglDepthbuffer[a] = e.createRenderbuffer(), B(n.__webglDepthbuffer[a], t, !1) } else e.bindFramebuffer(36160, n.__webglFramebuffer), n.__webglDepthbuffer = e.createRenderbuffer(), B(n.__webglDepthbuffer, t, !1);
            e.bindFramebuffer(36160, null)
        }(t)
    }, this.updateRenderTargetMipmap = function(e) {
        var t = e.texture;
        if (w(t, b(e) || h)) {
            var i = e.isWebGLCubeRenderTarget ? 34067 : 3553,
                a = r.get(t).__webglTexture;
            n.bindTexture(i, a), _(i, t, e.width, e.height), n.bindTexture(i, null)
        }
    }, this.updateMultisampleRenderTarget = function(t) {
        if (t.isWebGLMultisampleRenderTarget)
            if (h) {
                var n = r.get(t);
                e.bindFramebuffer(36008, n.__webglMultisampledFramebuffer), e.bindFramebuffer(36009, n.__webglFramebuffer);
                var i = t.width,
                    a = t.height,
                    o = 16384;
                t.depthBuffer && (o |= 256), t.stencilBuffer && (o |= 1024), e.blitFramebuffer(0, 0, i, a, 0, 0, i, a, o, 9728), e.bindFramebuffer(36160, n.__webglMultisampledFramebuffer)
            } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
    }, this.safeSetTexture2D = function(e, t) { e && e.isWebGLRenderTarget && (!1 === z && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), z = !0), e = e.texture), R(e, t) }, this.safeSetTextureCube = function(e, t) { e && e.isWebGLCubeRenderTarget && (!1 === G && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), G = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? P(e, t) : C(e, t) }
}

function di(e, t, n) { var r = n.isWebGL2; return { convert: function(e) { var n; if (1009 === e) return 5121; if (1017 === e) return 32819; if (1018 === e) return 32820; if (1019 === e) return 33635; if (1010 === e) return 5120; if (1011 === e) return 5122; if (1012 === e) return 5123; if (1013 === e) return 5124; if (1014 === e) return 5125; if (1015 === e) return 5126; if (1016 === e) return r ? 5131 : null !== (n = t.get("OES_texture_half_float")) ? n.HALF_FLOAT_OES : null; if (1021 === e) return 6406; if (1022 === e) return 6407; if (1023 === e) return 6408; if (1024 === e) return 6409; if (1025 === e) return 6410; if (1026 === e) return 6402; if (1027 === e) return 34041; if (1028 === e) return 6403; if (1029 === e) return 36244; if (1030 === e) return 33319; if (1031 === e) return 33320; if (1032 === e) return 36248; if (1033 === e) return 36249; if (33776 === e || 33777 === e || 33778 === e || 33779 === e) { if (null === (n = t.get("WEBGL_compressed_texture_s3tc"))) return null; if (33776 === e) return n.COMPRESSED_RGB_S3TC_DXT1_EXT; if (33777 === e) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT; if (33778 === e) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT; if (33779 === e) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT } if (35840 === e || 35841 === e || 35842 === e || 35843 === e) { if (null === (n = t.get("WEBGL_compressed_texture_pvrtc"))) return null; if (35840 === e) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG; if (35841 === e) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG; if (35842 === e) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG; if (35843 === e) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG } if (36196 === e) return null !== (n = t.get("WEBGL_compressed_texture_etc1")) ? n.COMPRESSED_RGB_ETC1_WEBGL : null; if ((37492 === e || 37496 === e) && null !== (n = t.get("WEBGL_compressed_texture_etc"))) { if (37492 === e) return n.COMPRESSED_RGB8_ETC2; if (37496 === e) return n.COMPRESSED_RGBA8_ETC2_EAC } return 37808 === e || 37809 === e || 37810 === e || 37811 === e || 37812 === e || 37813 === e || 37814 === e || 37815 === e || 37816 === e || 37817 === e || 37818 === e || 37819 === e || 37820 === e || 37821 === e || 37840 === e || 37841 === e || 37842 === e || 37843 === e || 37844 === e || 37845 === e || 37846 === e || 37847 === e || 37848 === e || 37849 === e || 37850 === e || 37851 === e || 37852 === e || 37853 === e ? null !== (n = t.get("WEBGL_compressed_texture_astc")) ? e : null : 36492 === e ? null !== (n = t.get("EXT_texture_compression_bptc")) ? e : null : 1020 === e ? r ? 34042 : null !== (n = t.get("WEBGL_depth_texture")) ? n.UNSIGNED_INT_24_8_WEBGL : null : void 0 } } }

function fi(e) { cn.call(this), this.cameras = e || [] }

function mi() { ue.call(this), this.type = "Group" }

function vi(e, t) {
    var n = this,
        r = null,
        i = 1,
        a = null,
        o = "local-floor",
        s = null,
        c = [],
        u = new Map,
        l = new cn;
    l.layers.enable(1), l.viewport = new C;
    var h = new cn;
    h.layers.enable(2), h.viewport = new C;
    var p = new fi([l, h]);
    p.layers.enable(1), p.layers.enable(2);
    var d = null,
        f = null;

    function m(e) {
        var t = u.get(e.inputSource);
        t && (t.targetRay && t.targetRay.dispatchEvent({ type: e.type }), t.grip && t.grip.dispatchEvent({ type: e.type }))
    }

    function v() { u.forEach((function(e, t) { e.targetRay && (e.targetRay.dispatchEvent({ type: "disconnected", data: t }), e.targetRay.visible = !1), e.grip && (e.grip.dispatchEvent({ type: "disconnected", data: t }), e.grip.visible = !1) })), u.clear(), e.setFramebuffer(null), e.setRenderTarget(e.getRenderTarget()), M.stop(), n.isPresenting = !1, n.dispatchEvent({ type: "sessionend" }) }

    function g(e) { a = e, M.setContext(r), M.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" }) }

    function y(e) {
        for (var t = r.inputSources, n = 0; n < c.length; n++) u.set(t[n], c[n]);
        for (n = 0; n < e.removed.length; n++) {
            var i = e.removed[n];
            (a = u.get(i)) && (a.targetRay && a.targetRay.dispatchEvent({ type: "disconnected", data: i }), a.grip && a.grip.dispatchEvent({ type: "disconnected", data: i }), u.delete(i))
        }
        for (n = 0; n < e.added.length; n++) {
            var a;
            i = e.added[n], (a = u.get(i)) && (a.targetRay && a.targetRay.dispatchEvent({ type: "connected", data: i }), a.grip && a.grip.dispatchEvent({ type: "connected", data: i }))
        }
    }
    this.enabled = !1, this.isPresenting = !1, this.getController = function(e) { var t = c[e]; return void 0 === t && (t = {}, c[e] = t), void 0 === t.targetRay && (t.targetRay = new mi, t.targetRay.matrixAutoUpdate = !1, t.targetRay.visible = !1), t.targetRay }, this.getControllerGrip = function(e) { var t = c[e]; return void 0 === t && (t = {}, c[e] = t), void 0 === t.grip && (t.grip = new mi, t.grip.matrixAutoUpdate = !1, t.grip.visible = !1), t.grip }, this.setFramebufferScaleFactor = function(e) { i = e, 1 == n.isPresenting && console.warn("WebXRManager: Cannot change framebuffer scale while presenting VR content") }, this.setReferenceSpaceType = function(e) { o = e }, this.getReferenceSpace = function() { return a }, this.getSession = function() { return r }, this.setSession = function(e) {
        if (null !== (r = e)) {
            r.addEventListener("select", m), r.addEventListener("selectstart", m), r.addEventListener("selectend", m), r.addEventListener("squeeze", m), r.addEventListener("squeezestart", m), r.addEventListener("squeezeend", m), r.addEventListener("end", v);
            var n = t.getContextAttributes(),
                a = { antialias: n.antialias, alpha: n.alpha, depth: n.depth, stencil: n.stencil, framebufferScaleFactor: i },
                s = new XRWebGLLayer(r, t, a);
            r.updateRenderState({ baseLayer: s }), r.requestReferenceSpace(o).then(g), r.addEventListener("inputsourceschange", y)
        }
    };
    var x = new U,
        b = new U;

    function w(e, t) { null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.getInverse(e.matrixWorld) }
    this.getCamera = function(e) {
        p.near = h.near = l.near = e.near, p.far = h.far = l.far = e.far, d === p.near && f === p.far || (r.updateRenderState({ depthNear: p.near, depthFar: p.far }), d = p.near, f = p.far);
        var t = e.parent,
            n = p.cameras;
        w(p, t);
        for (var i = 0; i < n.length; i++) w(n[i], t);
        e.matrixWorld.copy(p.matrixWorld);
        for (var a = e.children, o = (i = 0, a.length); i < o; i++) a[i].updateMatrixWorld(!0);
        return function(e, t, n) {
            x.setFromMatrixPosition(t.matrixWorld), b.setFromMatrixPosition(n.matrixWorld);
            var r = x.distanceTo(b),
                i = t.projectionMatrix.elements,
                a = n.projectionMatrix.elements,
                o = i[14] / (i[10] - 1),
                s = i[14] / (i[10] + 1),
                c = (i[9] + 1) / i[5],
                u = (i[9] - 1) / i[5],
                l = (i[8] - 1) / i[0],
                h = (a[8] + 1) / a[0],
                p = o * l,
                d = o * h,
                f = r / (-l + h),
                m = f * -l;
            t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(m), e.translateZ(f), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.getInverse(e.matrixWorld);
            var v = o + f,
                g = s + f,
                y = p - m,
                w = d + (r - m),
                _ = c * s / g * v,
                M = u * s / g * v;
            e.projectionMatrix.makePerspective(y, w, _, M, v, g)
        }(p, l, h), p
    };
    var _ = null,
        M = new vn;
    M.setAnimationLoop((function(t, n) {
        if (null !== (s = n.getViewerPose(a))) {
            var i = s.views,
                o = r.renderState.baseLayer;
            e.setFramebuffer(o.framebuffer);
            for (var u = 0; u < i.length; u++) {
                var l = i[u],
                    h = o.getViewport(l),
                    d = p.cameras[u];
                d.matrix.fromArray(l.transform.matrix), d.projectionMatrix.fromArray(l.projectionMatrix), d.viewport.set(h.x, h.y, h.width, h.height), 0 === u && p.matrix.copy(d.matrix)
            }
        }
        var f = r.inputSources;
        for (u = 0; u < c.length; u++) {
            var m = c[u],
                v = f[u],
                g = null,
                y = null;
            v && (m.targetRay && null !== (g = n.getPose(v.targetRaySpace, a)) && (m.targetRay.matrix.fromArray(g.transform.matrix), m.targetRay.matrix.decompose(m.targetRay.position, m.targetRay.rotation, m.targetRay.scale)), m.grip && v.gripSpace && null !== (y = n.getPose(v.gripSpace, a)) && (m.grip.matrix.fromArray(y.transform.matrix), m.grip.matrix.decompose(m.grip.position, m.grip.rotation, m.grip.scale))), m.targetRay && (m.targetRay.visible = null !== g), m.grip && (m.grip.visible = null !== y)
        }
        _ && _(t, n)
    })), this.setAnimationLoop = function(e) { _ = e }, this.dispose = function() {}
}

function gi(e) {
    var t = void 0 !== (e = e || {}).canvas ? e.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
        n = void 0 !== e.context ? e.context : null,
        r = void 0 !== e.alpha && e.alpha,
        i = void 0 === e.depth || e.depth,
        a = void 0 === e.stencil || e.stencil,
        o = void 0 !== e.antialias && e.antialias,
        s = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
        c = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
        u = void 0 !== e.powerPreference ? e.powerPreference : "default",
        l = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat,
        h = null,
        p = null;
    this.domElement = t, this.debug = { checkShaderErrors: !0 }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.outputEncoding = 3e3, this.physicallyCorrectLights = !1, this.toneMapping = 1, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
    var d, f, m, v, g, y, x, b, w, _, M, S, A, L, R, P, O, I, D = this,
        N = !1,
        F = null,
        B = 0,
        k = 0,
        z = null,
        G = null,
        H = -1,
        j = { geometry: null, program: null, wireframe: !1 },
        V = null,
        q = null,
        X = new C,
        Y = new C,
        Z = null,
        J = t.width,
        K = t.height,
        Q = 1,
        $ = null,
        ee = null,
        te = new C(0, 0, J, K),
        ne = new C(0, 0, J, K),
        re = !1,
        ie = new fn,
        ae = new Tn,
        oe = !1,
        se = !1,
        ce = new W,
        ue = new U;

    function he() { return null === z ? Q : 1 }
    try {
        var pe = { alpha: r, depth: i, stencil: a, antialias: o, premultipliedAlpha: s, preserveDrawingBuffer: c, powerPreference: u, failIfMajorPerformanceCaveat: l, xrCompatible: !0 };
        if (t.addEventListener("webglcontextlost", ve, !1), t.addEventListener("webglcontextrestored", ge, !1), null === (d = n || t.getContext("webgl", pe) || t.getContext("experimental-webgl", pe))) throw null !== t.getContext("webgl") ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
        void 0 === d.getShaderPrecisionFormat && (d.getShaderPrecisionFormat = function() { return { rangeMin: 1, rangeMax: 1, precision: 1 } })
    } catch (e) { throw console.error("THREE.WebGLRenderer: " + e.message), e }

    function de() { f = new En(d), !1 === (m = new Sn(d, f, e)).isWebGL2 && (f.get("WEBGL_depth_texture"), f.get("OES_texture_float"), f.get("OES_texture_half_float"), f.get("OES_texture_half_float_linear"), f.get("OES_standard_derivatives"), f.get("OES_element_index_uint"), f.get("ANGLE_instanced_arrays")), f.get("OES_texture_float_linear"), I = new di(d, f, m), (v = new hi(d, f, m)).scissor(Y.copy(ne).multiplyScalar(Q).floor()), v.viewport(X.copy(te).multiplyScalar(Q).floor()), g = new Rn(d), y = new Kr, x = new pi(d, f, v, y, m, I, g), b = new gn(d, m), w = new An(d, b, g), _ = new On(d, w, b, g), R = new Cn(d), M = new Jr(D, f, m), S = new ti, A = new si, L = new _n(D, v, _, s), P = new Mn(d, f, g, m), O = new Ln(d, f, g, m), g.programs = M.programs, D.capabilities = m, D.extensions = f, D.properties = y, D.renderLists = S, D.state = v, D.info = g }
    de();
    var fe = new vi(D, d);
    this.xr = fe;
    var me = new li(D, _, m.maxTextureSize);

    function ve(e) { e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), N = !0 }

    function ge() { console.log("THREE.WebGLRenderer: Context Restored."), N = !1, de() }

    function ye(e) {
        var t = e.target;
        t.removeEventListener("dispose", ye),
            function(e) { xe(e), y.remove(e) }(t)
    }

    function xe(e) {
        var t = y.get(e).program;
        e.program = void 0, void 0 !== t && M.releaseProgram(t)
    }
    this.shadowMap = me, this.getContext = function() { return d }, this.getContextAttributes = function() { return d.getContextAttributes() }, this.forceContextLoss = function() {
        var e = f.get("WEBGL_lose_context");
        e && e.loseContext()
    }, this.forceContextRestore = function() {
        var e = f.get("WEBGL_lose_context");
        e && e.restoreContext()
    }, this.getPixelRatio = function() { return Q }, this.setPixelRatio = function(e) { void 0 !== e && (Q = e, this.setSize(J, K, !1)) }, this.getSize = function(e) { return void 0 === e && (console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"), e = new E), e.set(J, K) }, this.setSize = function(e, n, r) { fe.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (J = e, K = n, t.width = Math.floor(e * Q), t.height = Math.floor(n * Q), !1 !== r && (t.style.width = e + "px", t.style.height = n + "px"), this.setViewport(0, 0, e, n)) }, this.getDrawingBufferSize = function(e) { return void 0 === e && (console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"), e = new E), e.set(J * Q, K * Q).floor() }, this.setDrawingBufferSize = function(e, n, r) { J = e, K = n, Q = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n) }, this.getCurrentViewport = function(e) { return void 0 === e && (console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"), e = new C), e.copy(X) }, this.getViewport = function(e) { return e.copy(te) }, this.setViewport = function(e, t, n, r) { e.isVector4 ? te.set(e.x, e.y, e.z, e.w) : te.set(e, t, n, r), v.viewport(X.copy(te).multiplyScalar(Q).floor()) }, this.getScissor = function(e) { return e.copy(ne) }, this.setScissor = function(e, t, n, r) { e.isVector4 ? ne.set(e.x, e.y, e.z, e.w) : ne.set(e, t, n, r), v.scissor(Y.copy(ne).multiplyScalar(Q).floor()) }, this.getScissorTest = function() { return re }, this.setScissorTest = function(e) { v.setScissorTest(re = e) }, this.setOpaqueSort = function(e) { $ = e }, this.setTransparentSort = function(e) { ee = e }, this.getClearColor = function() { return L.getClearColor() }, this.setClearColor = function() { L.setClearColor.apply(L, arguments) }, this.getClearAlpha = function() { return L.getClearAlpha() }, this.setClearAlpha = function() { L.setClearAlpha.apply(L, arguments) }, this.clear = function(e, t, n) {
        var r = 0;
        (void 0 === e || e) && (r |= 16384), (void 0 === t || t) && (r |= 256), (void 0 === n || n) && (r |= 1024), d.clear(r)
    }, this.clearColor = function() { this.clear(!0, !1, !1) }, this.clearDepth = function() { this.clear(!1, !0, !1) }, this.clearStencil = function() { this.clear(!1, !1, !0) }, this.dispose = function() { t.removeEventListener("webglcontextlost", ve, !1), t.removeEventListener("webglcontextrestored", ge, !1), S.dispose(), A.dispose(), y.dispose(), _.dispose(), fe.dispose(), _e.stop(), this.forceContextLoss() }, this.renderBufferImmediate = function(e, t) {
        v.initAttributes();
        var n = y.get(e);
        e.hasPositions && !n.position && (n.position = d.createBuffer()), e.hasNormals && !n.normal && (n.normal = d.createBuffer()), e.hasUvs && !n.uv && (n.uv = d.createBuffer()), e.hasColors && !n.color && (n.color = d.createBuffer());
        var r = t.getAttributes();
        e.hasPositions && (d.bindBuffer(34962, n.position), d.bufferData(34962, e.positionArray, 35048), v.enableAttribute(r.position), d.vertexAttribPointer(r.position, 3, 5126, !1, 0, 0)), e.hasNormals && (d.bindBuffer(34962, n.normal), d.bufferData(34962, e.normalArray, 35048), v.enableAttribute(r.normal), d.vertexAttribPointer(r.normal, 3, 5126, !1, 0, 0)), e.hasUvs && (d.bindBuffer(34962, n.uv), d.bufferData(34962, e.uvArray, 35048), v.enableAttribute(r.uv), d.vertexAttribPointer(r.uv, 2, 5126, !1, 0, 0)), e.hasColors && (d.bindBuffer(34962, n.color), d.bufferData(34962, e.colorArray, 35048), v.enableAttribute(r.color), d.vertexAttribPointer(r.color, 3, 5126, !1, 0, 0)), v.disableUnusedAttributes(), d.drawArrays(4, 0, e.count), e.count = 0
    };
    var be = new le;
    this.renderBufferDirect = function(e, t, n, r, i, a) {
        null === t && (t = be);
        var o = i.isMesh && i.matrixWorld.determinant() < 0,
            s = Ae(e, t, r, i);
        v.setMaterial(r, o);
        var c = !1;
        j.geometry === n.id && j.program === s.id && j.wireframe === (!0 === r.wireframe) || (j.geometry = n.id, j.program = s.id, j.wireframe = !0 === r.wireframe, c = !0), (r.morphTargets || r.morphNormals) && (R.update(i, n, r, s), c = !0);
        var u = n.index,
            l = n.attributes.position;
        if (null === u) { if (void 0 === l || 0 === l.count) return } else if (0 === u.count) return;
        var h, p = 1;
        !0 === r.wireframe && (u = w.getWireframeAttribute(n), p = 2);
        var g = P;
        null !== u && (h = b.get(u), (g = O).setIndex(h)), c && (function(e, t, n, r) {
            if (!1 !== m.isWebGL2 || !e.isInstancedMesh && !t.isInstancedBufferGeometry || null !== f.get("ANGLE_instanced_arrays")) {
                v.initAttributes();
                var i = t.attributes,
                    a = r.getAttributes(),
                    o = n.defaultAttributeValues;
                for (var s in a) {
                    var c = a[s];
                    if (c >= 0) {
                        var u = i[s];
                        if (void 0 !== u) {
                            var l = u.normalized,
                                h = u.itemSize;
                            if (void 0 === (M = b.get(u))) continue;
                            var p = M.buffer,
                                g = M.type,
                                y = M.bytesPerElement;
                            if (u.isInterleavedBufferAttribute) {
                                var x = u.data,
                                    w = x.stride,
                                    _ = u.offset;
                                x && x.isInstancedInterleavedBuffer ? (v.enableAttributeAndDivisor(c, x.meshPerAttribute), void 0 === t.maxInstancedCount && (t.maxInstancedCount = x.meshPerAttribute * x.count)) : v.enableAttribute(c), d.bindBuffer(34962, p), d.vertexAttribPointer(c, h, g, l, w * y, _ * y)
                            } else u.isInstancedBufferAttribute ? (v.enableAttributeAndDivisor(c, u.meshPerAttribute), void 0 === t.maxInstancedCount && (t.maxInstancedCount = u.meshPerAttribute * u.count)) : v.enableAttribute(c), d.bindBuffer(34962, p), d.vertexAttribPointer(c, h, g, l, 0, 0)
                        } else if ("instanceMatrix" === s) {
                            var M;
                            if (void 0 === (M = b.get(e.instanceMatrix))) continue;
                            p = M.buffer, g = M.type, v.enableAttributeAndDivisor(c + 0, 1), v.enableAttributeAndDivisor(c + 1, 1), v.enableAttributeAndDivisor(c + 2, 1), v.enableAttributeAndDivisor(c + 3, 1), d.bindBuffer(34962, p), d.vertexAttribPointer(c + 0, 4, g, !1, 64, 0), d.vertexAttribPointer(c + 1, 4, g, !1, 64, 16), d.vertexAttribPointer(c + 2, 4, g, !1, 64, 32), d.vertexAttribPointer(c + 3, 4, g, !1, 64, 48)
                        } else if (void 0 !== o) {
                            var S = o[s];
                            if (void 0 !== S) switch (S.length) {
                                case 2:
                                    d.vertexAttrib2fv(c, S);
                                    break;
                                case 3:
                                    d.vertexAttrib3fv(c, S);
                                    break;
                                case 4:
                                    d.vertexAttrib4fv(c, S);
                                    break;
                                default:
                                    d.vertexAttrib1fv(c, S)
                            }
                        }
                    }
                }
                v.disableUnusedAttributes()
            }
        }(i, n, r, s), null !== u && d.bindBuffer(34963, h.buffer));
        var y = null !== u ? u.count : l.count,
            x = n.drawRange.start * p,
            _ = n.drawRange.count * p,
            M = null !== a ? a.start * p : 0,
            S = null !== a ? a.count * p : 1 / 0,
            T = Math.max(x, M),
            E = Math.min(y, x + _, M + S) - 1,
            A = Math.max(0, E - T + 1);
        if (0 !== A) {
            if (i.isMesh) !0 === r.wireframe ? (v.setLineWidth(r.wireframeLinewidth * he()), g.setMode(1)) : g.setMode(4);
            else if (i.isLine) {
                var L = r.linewidth;
                void 0 === L && (L = 1), v.setLineWidth(L * he()), i.isLineSegments ? g.setMode(1) : i.isLineLoop ? g.setMode(2) : g.setMode(3)
            } else i.isPoints ? g.setMode(0) : i.isSprite && g.setMode(4);
            i.isInstancedMesh ? g.renderInstances(n, T, A, i.count) : n.isInstancedBufferGeometry ? g.renderInstances(n, T, A, n.maxInstancedCount) : g.render(T, A)
        }
    }, this.compile = function(e, t) {
        (p = A.get(e, t)).init(), e.traverse((function(e) { e.isLight && (p.pushLight(e), e.castShadow && p.pushShadow(e)) })), p.setupLights(t);
        var n = {};
        e.traverse((function(t) {
            if (t.material)
                if (Array.isArray(t.material))
                    for (var r = 0; r < t.material.length; r++) t.material[r].uuid in n == 0 && (Ee(t.material[r], e, t), n[t.material[r].uuid] = !0);
                else t.material.uuid in n == 0 && (Ee(t.material, e, t), n[t.material.uuid] = !0)
        }))
    };
    var we = null,
        _e = new vn;

    function Me(e, t, n, r) {
        if (!1 !== e.visible) {
            if (e.layers.test(t.layers))
                if (e.isGroup) n = e.renderOrder;
                else if (e.isLOD) !0 === e.autoUpdate && e.update(t);
            else if (e.isLight) p.pushLight(e), e.castShadow && p.pushShadow(e);
            else if (e.isSprite) {
                if (!e.frustumCulled || ie.intersectsSprite(e)) {
                    r && ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ce);
                    var i = _.update(e);
                    (a = e.material).visible && h.push(e, i, a, n, ue.z, null)
                }
            } else if (e.isImmediateRenderObject) r && ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ce), h.push(e, null, e.material, n, ue.z, null);
            else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.frame !== g.render.frame && (e.skeleton.update(), e.skeleton.frame = g.render.frame), !e.frustumCulled || ie.intersectsObject(e))) {
                r && ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ce), i = _.update(e);
                var a = e.material;
                if (Array.isArray(a))
                    for (var o = i.groups, s = 0, c = o.length; s < c; s++) {
                        var u = o[s],
                            l = a[u.materialIndex];
                        l && l.visible && h.push(e, i, l, n, ue.z, u)
                    } else a.visible && h.push(e, i, a, n, ue.z, null)
            }
            var d = e.children;
            for (s = 0, c = d.length; s < c; s++) Me(d[s], t, n, r)
        }
    }

    function Se(e, t, n, r) {
        for (var i = 0, a = e.length; i < a; i++) {
            var o = e[i],
                s = o.object,
                c = o.geometry,
                u = void 0 === r ? o.material : r,
                l = o.group;
            if (n.isArrayCamera) {
                q = n;
                for (var h = n.cameras, d = 0, f = h.length; d < f; d++) {
                    var m = h[d];
                    s.layers.test(m.layers) && (v.viewport(X.copy(m.viewport)), p.setupLights(m), Te(s, t, m, c, u, l))
                }
            } else q = null, Te(s, t, n, c, u, l)
        }
    }

    function Te(e, t, n, r, i, a) {
        if (e.onBeforeRender(D, t, n, r, i, a), p = A.get(t, q || n), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), e.isImmediateRenderObject) {
            var o = Ae(n, t, i, e);
            v.setMaterial(i), j.geometry = null, j.program = null, j.wireframe = !1,
                function(e, t) { e.render((function(e) { D.renderBufferImmediate(e, t) })) }(e, o)
        } else D.renderBufferDirect(n, t, r, i, e, a);
        e.onAfterRender(D, t, n, r, i, a), p = A.get(t, q || n)
    }

    function Ee(e, t, n) {
        var r = y.get(e),
            i = p.state.lights,
            a = p.state.shadowsArray,
            o = i.state.version,
            s = M.getParameters(e, i.state, a, t, ae.numPlanes, ae.numIntersection, n),
            c = M.getProgramCacheKey(s),
            u = r.program,
            l = !0;
        if (void 0 === u) e.addEventListener("dispose", ye);
        else if (u.cacheKey !== c) xe(e);
        else if (r.lightsStateVersion !== o) r.lightsStateVersion = o, l = !1;
        else {
            if (void 0 !== s.shaderID) return;
            l = !1
        }
        l && (u = M.acquireProgram(s, c), r.program = u, r.uniforms = s.uniforms, r.environment = e.isMeshStandardMaterial ? t.environment : null, r.outputEncoding = D.outputEncoding, e.program = u);
        var h = u.getAttributes();
        if (e.morphTargets) { e.numSupportedMorphTargets = 0; for (var d = 0; d < D.maxMorphTargets; d++) h["morphTarget" + d] >= 0 && e.numSupportedMorphTargets++ }
        if (e.morphNormals)
            for (e.numSupportedMorphNormals = 0, d = 0; d < D.maxMorphNormals; d++) h["morphNormal" + d] >= 0 && e.numSupportedMorphNormals++;
        var f = r.uniforms;
        (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (r.numClippingPlanes = ae.numPlanes, r.numIntersection = ae.numIntersection, f.clippingPlanes = ae.uniform), r.fog = t.fog, r.needsLights = function(e) { return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights }(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.directionalShadowMap.value = i.state.directionalShadowMap, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotShadowMap.value = i.state.spotShadowMap, f.spotShadowMatrix.value = i.state.spotShadowMatrix, f.pointShadowMap.value = i.state.pointShadowMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix);
        var m = r.program.getUniforms(),
            v = Pr.seqWithValue(m.seq, f);
        r.uniformsList = v
    }

    function Ae(e, t, n, r) {
        x.resetTextureUnits();
        var i = t.fog,
            a = n.isMeshStandardMaterial ? t.environment : null,
            o = y.get(n),
            s = p.state.lights;
        if (oe && (se || e !== V)) {
            var c = e === V && n.id === H;
            ae.setState(n.clippingPlanes, n.clipIntersection, n.clipShadows, e, o, c)
        }
        n.version === o.__version ? void 0 === o.program || n.fog && o.fog !== i || o.environment !== a || o.needsLights && o.lightsStateVersion !== s.state.version ? Ee(n, t, r) : void 0 === o.numClippingPlanes || o.numClippingPlanes === ae.numPlanes && o.numIntersection === ae.numIntersection ? o.outputEncoding !== D.outputEncoding && Ee(n, t, r) : Ee(n, t, r) : (Ee(n, t, r), o.__version = n.version);
        var u, l, h = !1,
            f = !1,
            g = !1,
            b = o.program,
            w = b.getUniforms(),
            _ = o.uniforms;
        if (v.useProgram(b.program) && (h = !0, f = !0, g = !0), n.id !== H && (H = n.id, f = !0), h || V !== e) {
            if (w.setValue(d, "projectionMatrix", e.projectionMatrix), m.logarithmicDepthBuffer && w.setValue(d, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), V !== e && (V = e, f = !0, g = !0), n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap) {
                var M = w.map.cameraPosition;
                void 0 !== M && M.setValue(d, ue.setFromMatrixPosition(e.matrixWorld))
            }(n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) && w.setValue(d, "isOrthographic", !0 === e.isOrthographicCamera), (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.skinning) && w.setValue(d, "viewMatrix", e.matrixWorldInverse)
        }
        if (n.skinning) {
            w.setOptional(d, r, "bindMatrix"), w.setOptional(d, r, "bindMatrixInverse");
            var S = r.skeleton;
            if (S) {
                var E = S.bones;
                if (m.floatVertexTextures) {
                    if (void 0 === S.boneTexture) {
                        var A = Math.sqrt(4 * E.length);
                        A = T.ceilPowerOfTwo(A), A = Math.max(A, 4);
                        var L = new Float32Array(A * A * 4);
                        L.set(S.boneMatrices);
                        var R = new hn(L, A, A, 1023, 1015);
                        S.boneMatrices = L, S.boneTexture = R, S.boneTextureSize = A
                    }
                    w.setValue(d, "boneTexture", S.boneTexture, x), w.setValue(d, "boneTextureSize", S.boneTextureSize)
                } else w.setOptional(d, S, "boneMatrices")
            }
        }
        return (f || o.receiveShadow !== r.receiveShadow) && (o.receiveShadow = r.receiveShadow, w.setValue(d, "receiveShadow", r.receiveShadow)), f && (w.setValue(d, "toneMappingExposure", D.toneMappingExposure), w.setValue(d, "toneMappingWhitePoint", D.toneMappingWhitePoint), o.needsLights && (l = g, (u = _).ambientLightColor.needsUpdate = l, u.lightProbe.needsUpdate = l, u.directionalLights.needsUpdate = l, u.directionalLightShadows.needsUpdate = l, u.pointLights.needsUpdate = l, u.pointLightShadows.needsUpdate = l, u.spotLights.needsUpdate = l, u.spotLightShadows.needsUpdate = l, u.rectAreaLights.needsUpdate = l, u.hemisphereLights.needsUpdate = l), i && n.fog && function(e, t) { e.fogColor.value.copy(t.color), t.isFog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t.isFogExp2 && (e.fogDensity.value = t.density) }(_, i), n.isMeshBasicMaterial ? Le(_, n) : n.isMeshLambertMaterial ? (Le(_, n), function(e, t) { t.emissiveMap && (e.emissiveMap.value = t.emissiveMap) }(_, n)) : n.isMeshToonMaterial ? (Le(_, n), function(e, t) { e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4), t.gradientMap && (e.gradientMap.value = t.gradientMap), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias) }(_, n)) : n.isMeshPhongMaterial ? (Le(_, n), function(e, t) { e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias) }(_, n)) : n.isMeshStandardMaterial ? (Le(_, n, a), n.isMeshPhysicalMaterial ? function(e, t, n) { Re(e, t, n), e.reflectivity.value = t.reflectivity, e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.sheen && e.sheen.value.copy(t.sheen), t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap), t.clearcoatNormalMap && (e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), e.clearcoatNormalMap.value = t.clearcoatNormalMap, 1 === t.side && e.clearcoatNormalScale.value.negate()), e.transparency.value = t.transparency }(_, n, a) : Re(_, n, a)) : n.isMeshMatcapMaterial ? (Le(_, n), function(e, t) { t.matcap && (e.matcap.value = t.matcap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias) }(_, n)) : n.isMeshDepthMaterial ? (Le(_, n), function(e, t) { t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias) }(_, n)) : n.isMeshDistanceMaterial ? (Le(_, n), function(e, t) { t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias), e.referencePosition.value.copy(t.referencePosition), e.nearDistance.value = t.nearDistance, e.farDistance.value = t.farDistance }(_, n)) : n.isMeshNormalMaterial ? (Le(_, n), function(e, t) { t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias) }(_, n)) : n.isLineBasicMaterial ? (function(e, t) { e.diffuse.value.copy(t.color), e.opacity.value = t.opacity }(_, n), n.isLineDashedMaterial && function(e, t) { e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale }(_, n)) : n.isPointsMaterial ? function(e, t) {
            var n;
            e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * Q, e.scale.value = .5 * K, t.map && (e.map.value = t.map), t.alphaMap && (e.alphaMap.value = t.alphaMap), t.map ? n = t.map : t.alphaMap && (n = t.alphaMap), void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), e.uvTransform.value.copy(n.matrix))
        }(_, n) : n.isSpriteMaterial ? function(e, t) {
            var n;
            e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map), t.alphaMap && (e.alphaMap.value = t.alphaMap), t.map ? n = t.map : t.alphaMap && (n = t.alphaMap), void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), e.uvTransform.value.copy(n.matrix))
        }(_, n) : n.isShadowMaterial && (_.color.value.copy(n.color), _.opacity.value = n.opacity), void 0 !== _.ltc_1 && (_.ltc_1.value = mn.LTC_1), void 0 !== _.ltc_2 && (_.ltc_2.value = mn.LTC_2), Pr.upload(d, o.uniformsList, _, x), n.isShaderMaterial && (n.uniformsNeedUpdate = !1)), n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (Pr.upload(d, o.uniformsList, _, x), n.uniformsNeedUpdate = !1), n.isSpriteMaterial && w.setValue(d, "center", r.center), w.setValue(d, "modelViewMatrix", r.modelViewMatrix), w.setValue(d, "normalMatrix", r.normalMatrix), w.setValue(d, "modelMatrix", r.matrixWorld), b
    }

    function Le(e, t, n) {
        e.opacity.value = t.opacity, t.color && e.diffuse.value.copy(t.color), t.emissive && e.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity), t.map && (e.map.value = t.map), t.alphaMap && (e.alphaMap.value = t.alphaMap), t.specularMap && (e.specularMap.value = t.specularMap);
        var r, i, a = t.envMap || n;
        a && (e.envMap.value = a, e.flipEnvMap.value = a.isCubeTexture ? -1 : 1, e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio, e.maxMipLevel.value = y.get(a).__maxMipLevel), t.lightMap && (e.lightMap.value = t.lightMap, e.lightMapIntensity.value = t.lightMapIntensity), t.aoMap && (e.aoMap.value = t.aoMap, e.aoMapIntensity.value = t.aoMapIntensity), t.map ? r = t.map : t.specularMap ? r = t.specularMap : t.displacementMap ? r = t.displacementMap : t.normalMap ? r = t.normalMap : t.bumpMap ? r = t.bumpMap : t.roughnessMap ? r = t.roughnessMap : t.metalnessMap ? r = t.metalnessMap : t.alphaMap ? r = t.alphaMap : t.emissiveMap && (r = t.emissiveMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix)), t.aoMap ? i = t.aoMap : t.lightMap && (i = t.lightMap), void 0 !== i && (i.isWebGLRenderTarget && (i = i.texture), !0 === i.matrixAutoUpdate && i.updateMatrix(), e.uv2Transform.value.copy(i.matrix))
    }

    function Re(e, t, n) { e.roughness.value = t.roughness, e.metalness.value = t.metalness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap), t.metalnessMap && (e.metalnessMap.value = t.metalnessMap), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap), t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale, 1 === t.side && (e.bumpScale.value *= -1)), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate()), t.displacementMap && (e.displacementMap.value = t.displacementMap, e.displacementScale.value = t.displacementScale, e.displacementBias.value = t.displacementBias), (t.envMap || n) && (e.envMapIntensity.value = t.envMapIntensity) }
    _e.setAnimationLoop((function(e) { fe.isPresenting || we && we(e) })), "undefined" != typeof window && _e.setContext(window), this.setAnimationLoop = function(e) { we = e, fe.setAnimationLoop(e), _e.start() }, this.render = function(e, t) {
        var n, r;
        if (void 0 !== arguments[2] && (console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."), n = arguments[2]), void 0 !== arguments[3] && (console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."), r = arguments[3]), t && t.isCamera) {
            if (!N) {
                j.geometry = null, j.program = null, j.wireframe = !1, H = -1, V = null, !0 === e.autoUpdate && e.updateMatrixWorld(), null === t.parent && t.updateMatrixWorld(), fe.enabled && fe.isPresenting && (t = fe.getCamera(t)), (p = A.get(e, t)).init(), e.onBeforeRender(D, e, t, n || z), ce.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), ie.setFromProjectionMatrix(ce), se = this.localClippingEnabled, oe = ae.init(this.clippingPlanes, se, t), (h = S.get(e, t)).init(), Me(e, t, 0, D.sortObjects), h.finish(), !0 === D.sortObjects && h.sort($, ee), oe && ae.beginShadows();
                var i = p.state.shadowsArray;
                me.render(i, e, t), p.setupLights(t), oe && ae.endShadows(), this.info.autoReset && this.info.reset(), void 0 !== n && this.setRenderTarget(n), L.render(h, e, t, r);
                var a = h.opaque,
                    o = h.transparent;
                if (e.overrideMaterial) {
                    var s = e.overrideMaterial;
                    a.length && Se(a, e, t, s), o.length && Se(o, e, t, s)
                } else a.length && Se(a, e, t), o.length && Se(o, e, t);
                e.onAfterRender(D, e, t), null !== z && (x.updateRenderTargetMipmap(z), x.updateMultisampleRenderTarget(z)), v.buffers.depth.setTest(!0), v.buffers.depth.setMask(!0), v.buffers.color.setMask(!0), v.setPolygonOffset(!1), h = null, p = null
            }
        } else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")
    }, this.setFramebuffer = function(e) { F !== e && null === z && d.bindFramebuffer(36160, e), F = e }, this.getActiveCubeFace = function() { return B }, this.getActiveMipmapLevel = function() { return k }, this.getRenderTarget = function() { return z }, this.setRenderTarget = function(e, t, n) {
        z = e, B = t, k = n, e && void 0 === y.get(e).__webglFramebuffer && x.setupRenderTarget(e);
        var r = F,
            i = !1;
        if (e) {
            var a = y.get(e).__webglFramebuffer;
            e.isWebGLCubeRenderTarget ? (r = a[t || 0], i = !0) : r = e.isWebGLMultisampleRenderTarget ? y.get(e).__webglMultisampledFramebuffer : a, X.copy(e.viewport), Y.copy(e.scissor), Z = e.scissorTest
        } else X.copy(te).multiplyScalar(Q).floor(), Y.copy(ne).multiplyScalar(Q).floor(), Z = re;
        if (G !== r && (d.bindFramebuffer(36160, r), G = r), v.viewport(X), v.scissor(Y), v.setScissorTest(Z), i) {
            var o = y.get(e.texture);
            d.framebufferTexture2D(36160, 36064, 34069 + (t || 0), o.__webglTexture, n || 0)
        }
    }, this.readRenderTargetPixels = function(e, t, n, r, i, a, o) {
        if (e && e.isWebGLRenderTarget) {
            var s = y.get(e).__webglFramebuffer;
            if (e.isWebGLCubeRenderTarget && void 0 !== o && (s = s[o]), s) {
                var c = !1;
                s !== G && (d.bindFramebuffer(36160, s), c = !0);
                try {
                    var u = e.texture,
                        l = u.format,
                        h = u.type;
                    if (1023 !== l && I.convert(l) !== d.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                    if (!(1009 === h || I.convert(h) === d.getParameter(35738) || 1015 === h && (m.isWebGL2 || f.get("OES_texture_float") || f.get("WEBGL_color_buffer_float")) || 1016 === h && (m.isWebGL2 ? f.get("EXT_color_buffer_float") : f.get("EXT_color_buffer_half_float")))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                    36053 === d.checkFramebufferStatus(36160) ? t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && d.readPixels(t, n, r, i, I.convert(l), I.convert(h), a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
                } finally { c && d.bindFramebuffer(36160, G) }
            }
        } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
    }, this.copyFramebufferToTexture = function(e, t, n) {
        void 0 === n && (n = 0);
        var r = Math.pow(2, -n),
            i = Math.floor(t.image.width * r),
            a = Math.floor(t.image.height * r),
            o = I.convert(t.format);
        x.setTexture2D(t, 0), d.copyTexImage2D(3553, n, o, e.x, e.y, i, a, 0), v.unbindTexture()
    }, this.copyTextureToTexture = function(e, t, n, r) {
        var i = t.image.width,
            a = t.image.height,
            o = I.convert(n.format),
            s = I.convert(n.type);
        x.setTexture2D(n, 0), t.isDataTexture ? d.texSubImage2D(3553, r || 0, e.x, e.y, i, a, o, s, t.image.data) : d.texSubImage2D(3553, r || 0, e.x, e.y, o, s, t.image), v.unbindTexture()
    }, this.initTexture = function(e) { x.setTexture2D(e, 0), v.unbindTexture() }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }))
}

function yi(e, t) { this.name = "", this.color = new et(e), this.density = void 0 !== t ? t : 25e-5 }

function xi(e, t, n) { this.name = "", this.color = new et(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== n ? n : 1e3 }

function bi(e, t) { this.array = e, this.stride = t, this.count = void 0 !== e ? e.length / t : 0, this.usage = 35044, this.updateRange = { offset: 0, count: -1 }, this.version = 0 }
ci.prototype = Object.create(ot.prototype), ci.prototype.constructor = ci, ci.prototype.isMeshDepthMaterial = !0, ci.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.depthPacking = e.depthPacking, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this }, ui.prototype = Object.create(ot.prototype), ui.prototype.constructor = ui, ui.prototype.isMeshDistanceMaterial = !0, ui.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this }, fi.prototype = Object.assign(Object.create(cn.prototype), { constructor: fi, isArrayCamera: !0 }), mi.prototype = Object.assign(Object.create(ue.prototype), { constructor: mi, isGroup: !0 }), Object.assign(vi.prototype, w.prototype), Object.assign(yi.prototype, { isFogExp2: !0, clone: function() { return new yi(this.color, this.density) }, toJSON: function() { return { type: "FogExp2", color: this.color.getHex(), density: this.density } } }), Object.assign(xi.prototype, { isFog: !0, clone: function() { return new xi(this.color, this.near, this.far) }, toJSON: function() { return { type: "Fog", color: this.color.getHex(), near: this.near, far: this.far } } }), Object.defineProperty(bi.prototype, "needsUpdate", { set: function(e) {!0 === e && this.version++ } }), Object.assign(bi.prototype, { isInterleavedBuffer: !0, onUploadCallback: function() {}, setUsage: function(e) { return this.usage = e, this }, copy: function(e) { return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this }, copyAt: function(e, t, n) { e *= this.stride, n *= t.stride; for (var r = 0, i = this.stride; r < i; r++) this.array[e + r] = t.array[n + r]; return this }, set: function(e, t) { return void 0 === t && (t = 0), this.array.set(e, t), this }, clone: function() { return (new this.constructor).copy(this) }, onUpload: function(e) { return this.onUploadCallback = e, this } });
var wi, _i = new U;

function Mi(e, t, n, r) { this.data = e, this.itemSize = t, this.offset = n, this.normalized = !0 === r }

function Si(e) { ot.call(this), this.type = "SpriteMaterial", this.color = new et(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.setValues(e) }
Object.defineProperties(Mi.prototype, { count: { get: function() { return this.data.count } }, array: { get: function() { return this.data.array } } }), Object.assign(Mi.prototype, { isInterleavedBufferAttribute: !0, applyMatrix4: function(e) { for (var t = 0, n = this.data.count; t < n; t++) _i.x = this.getX(t), _i.y = this.getY(t), _i.z = this.getZ(t), _i.applyMatrix4(e), this.setXYZ(t, _i.x, _i.y, _i.z); return this }, setX: function(e, t) { return this.data.array[e * this.data.stride + this.offset] = t, this }, setY: function(e, t) { return this.data.array[e * this.data.stride + this.offset + 1] = t, this }, setZ: function(e, t) { return this.data.array[e * this.data.stride + this.offset + 2] = t, this }, setW: function(e, t) { return this.data.array[e * this.data.stride + this.offset + 3] = t, this }, getX: function(e) { return this.data.array[e * this.data.stride + this.offset] }, getY: function(e) { return this.data.array[e * this.data.stride + this.offset + 1] }, getZ: function(e) { return this.data.array[e * this.data.stride + this.offset + 2] }, getW: function(e) { return this.data.array[e * this.data.stride + this.offset + 3] }, setXY: function(e, t, n) { return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this }, setXYZ: function(e, t, n, r) { return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this }, setXYZW: function(e, t, n, r, i) { return e = e * this.data.stride + this.offset, this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = i, this } }), Si.prototype = Object.create(ot.prototype), Si.prototype.constructor = Si, Si.prototype.isSpriteMaterial = !0, Si.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this };
var Ti = new U,
    Ei = new U,
    Ai = new U,
    Li = new E,
    Ri = new E,
    Pi = new W,
    Ci = new U,
    Oi = new U,
    Ii = new U,
    Di = new E,
    Ni = new E,
    Fi = new E;

function Ui(e) {
    if (ue.call(this), this.type = "Sprite", void 0 === wi) {
        wi = new Lt;
        var t = new bi(new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]), 5);
        wi.setIndex([0, 1, 2, 0, 2, 3]), wi.setAttribute("position", new Mi(t, 3, 0, !1)), wi.setAttribute("uv", new Mi(t, 2, 3, !1))
    }
    this.geometry = wi, this.material = void 0 !== e ? e : new Si, this.center = new E(.5, .5)
}

function Bi(e, t, n, r, i, a) { Li.subVectors(e, n).addScalar(.5).multiply(r), void 0 !== i ? (Ri.x = a * Li.x - i * Li.y, Ri.y = i * Li.x + a * Li.y) : Ri.copy(Li), e.copy(t), e.x += Ri.x, e.y += Ri.y, e.applyMatrix4(Pi) }
Ui.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: Ui,
    isSprite: !0,
    raycast: function(e, t) {
        null === e.camera && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Ei.setFromMatrixScale(this.matrixWorld), Pi.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), Ai.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && Ei.multiplyScalar(-Ai.z);
        var n, r, i = this.material.rotation;
        0 !== i && (r = Math.cos(i), n = Math.sin(i));
        var a = this.center;
        Bi(Ci.set(-.5, -.5, 0), Ai, a, Ei, n, r), Bi(Oi.set(.5, -.5, 0), Ai, a, Ei, n, r), Bi(Ii.set(.5, .5, 0), Ai, a, Ei, n, r), Di.set(0, 0), Ni.set(1, 0), Fi.set(1, 1);
        var o = e.ray.intersectTriangle(Ci, Oi, Ii, !1, Ti);
        if (null !== o || (Bi(Oi.set(-.5, .5, 0), Ai, a, Ei, n, r), Ni.set(0, 1), null !== (o = e.ray.intersectTriangle(Ci, Ii, Oi, !1, Ti)))) {
            var s = e.ray.origin.distanceTo(Ti);
            s < e.near || s > e.far || t.push({ distance: s, point: Ti.clone(), uv: Je.getUV(Ti, Ci, Oi, Ii, Di, Ni, Fi, new E), face: null, object: this })
        }
    },
    clone: function() { return new this.constructor(this.material).copy(this) },
    copy: function(e) { return ue.prototype.copy.call(this, e), void 0 !== e.center && this.center.copy(e.center), this }
});
var ki = new U,
    zi = new U;

function Gi() { ue.call(this), this._currentLevel = 0, this.type = "LOD", Object.defineProperties(this, { levels: { enumerable: !0, value: [] } }), this.autoUpdate = !0 }

function Hi(e, t) { e && e.isGeometry && console.error("THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."), qt.call(this, e, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new W, this.bindMatrixInverse = new W }
Gi.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: Gi,
    isLOD: !0,
    copy: function(e) {
        ue.prototype.copy.call(this, e, !1);
        for (var t = e.levels, n = 0, r = t.length; n < r; n++) {
            var i = t[n];
            this.addLevel(i.object.clone(), i.distance)
        }
        return this.autoUpdate = e.autoUpdate, this
    },
    addLevel: function(e, t) { void 0 === t && (t = 0), t = Math.abs(t); for (var n = this.levels, r = 0; r < n.length && !(t < n[r].distance); r++); return n.splice(r, 0, { distance: t, object: e }), this.add(e), this },
    getCurrentLevel: function() { return this._currentLevel },
    getObjectForDistance: function(e) { var t = this.levels; if (t.length > 0) { for (var n = 1, r = t.length; n < r && !(e < t[n].distance); n++); return t[n - 1].object } return null },
    raycast: function(e, t) {
        if (this.levels.length > 0) {
            ki.setFromMatrixPosition(this.matrixWorld);
            var n = e.ray.origin.distanceTo(ki);
            this.getObjectForDistance(n).raycast(e, t)
        }
    },
    update: function(e) {
        var t = this.levels;
        if (t.length > 1) {
            ki.setFromMatrixPosition(e.matrixWorld), zi.setFromMatrixPosition(this.matrixWorld);
            var n = ki.distanceTo(zi) / e.zoom;
            t[0].object.visible = !0;
            for (var r = 1, i = t.length; r < i && n >= t[r].distance; r++) t[r - 1].object.visible = !1, t[r].object.visible = !0;
            for (this._currentLevel = r - 1; r < i; r++) t[r].object.visible = !1
        }
    },
    toJSON: function(e) {
        var t = ue.prototype.toJSON.call(this, e);
        !1 === this.autoUpdate && (t.object.autoUpdate = !1), t.object.levels = [];
        for (var n = this.levels, r = 0, i = n.length; r < i; r++) {
            var a = n[r];
            t.object.levels.push({ object: a.object.uuid, distance: a.distance })
        }
        return t
    }
}), Hi.prototype = Object.assign(Object.create(qt.prototype), {
    constructor: Hi,
    isSkinnedMesh: !0,
    bind: function(e, t) { this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.getInverse(t) },
    pose: function() { this.skeleton.pose() },
    normalizeSkinWeights: function() {
        for (var e = new C, t = this.geometry.attributes.skinWeight, n = 0, r = t.count; n < r; n++) {
            e.x = t.getX(n), e.y = t.getY(n), e.z = t.getZ(n), e.w = t.getW(n);
            var i = 1 / e.manhattanLength();
            i !== 1 / 0 ? e.multiplyScalar(i) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w)
        }
    },
    updateMatrixWorld: function(e) { qt.prototype.updateMatrixWorld.call(this, e), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode) },
    clone: function() { return new this.constructor(this.geometry, this.material).copy(this) }
});
var ji = new W,
    Vi = new W;

function Wi(e, t) {
    if (e = e || [], this.bones = e.slice(0), this.boneMatrices = new Float32Array(16 * this.bones.length), this.frame = -1, void 0 === t) this.calculateInverses();
    else if (this.bones.length === t.length) this.boneInverses = t.slice(0);
    else { console.warn("THREE.Skeleton boneInverses is the wrong length."), this.boneInverses = []; for (var n = 0, r = this.bones.length; n < r; n++) this.boneInverses.push(new W) }
}

function qi() { ue.call(this), this.type = "Bone" }
Object.assign(Wi.prototype, {
    calculateInverses: function() {
        this.boneInverses = [];
        for (var e = 0, t = this.bones.length; e < t; e++) {
            var n = new W;
            this.bones[e] && n.getInverse(this.bones[e].matrixWorld), this.boneInverses.push(n)
        }
    },
    pose: function() { var e, t, n; for (t = 0, n = this.bones.length; t < n; t++)(e = this.bones[t]) && e.matrixWorld.getInverse(this.boneInverses[t]); for (t = 0, n = this.bones.length; t < n; t++)(e = this.bones[t]) && (e.parent && e.parent.isBone ? (e.matrix.getInverse(e.parent.matrixWorld), e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld), e.matrix.decompose(e.position, e.quaternion, e.scale)) },
    update: function() {
        for (var e = this.bones, t = this.boneInverses, n = this.boneMatrices, r = this.boneTexture, i = 0, a = e.length; i < a; i++) {
            var o = e[i] ? e[i].matrixWorld : Vi;
            ji.multiplyMatrices(o, t[i]), ji.toArray(n, 16 * i)
        }
        void 0 !== r && (r.needsUpdate = !0)
    },
    clone: function() { return new Wi(this.bones, this.boneInverses) },
    getBoneByName: function(e) { for (var t = 0, n = this.bones.length; t < n; t++) { var r = this.bones[t]; if (r.name === e) return r } },
    dispose: function() { this.boneTexture && (this.boneTexture.dispose(), this.boneTexture = void 0) }
}), qi.prototype = Object.assign(Object.create(ue.prototype), { constructor: qi, isBone: !0 });
var Xi = new W,
    Yi = new W,
    Zi = [],
    Ji = new qt;

function Ki(e, t, n) { qt.call(this, e, t), this.instanceMatrix = new ut(new Float32Array(16 * n), 16), this.count = n, this.frustumCulled = !1 }

function Qi(e) { ot.call(this), this.type = "LineBasicMaterial", this.color = new et(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.setValues(e) }
Ki.prototype = Object.assign(Object.create(qt.prototype), {
    constructor: Ki,
    isInstancedMesh: !0,
    getMatrixAt: function(e, t) { t.fromArray(this.instanceMatrix.array, 16 * e) },
    raycast: function(e, t) {
        var n = this.matrixWorld,
            r = this.count;
        if (Ji.geometry = this.geometry, Ji.material = this.material, void 0 !== Ji.material)
            for (var i = 0; i < r; i++) this.getMatrixAt(i, Xi), Yi.multiplyMatrices(n, Xi), Ji.matrixWorld = Yi, Ji.raycast(e, Zi), Zi.length > 0 && (Zi[0].instanceId = i, Zi[0].object = this, t.push(Zi[0]), Zi.length = 0)
    },
    setMatrixAt: function(e, t) { t.toArray(this.instanceMatrix.array, 16 * e) },
    updateMorphTargets: function() {}
}), Qi.prototype = Object.create(ot.prototype), Qi.prototype.constructor = Qi, Qi.prototype.isLineBasicMaterial = !0, Qi.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this };
var $i = new U,
    ea = new U,
    ta = new W,
    na = new Ne,
    ra = new Ae;

function ia(e, t, n) { 1 === n && console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."), ue.call(this), this.type = "Line", this.geometry = void 0 !== e ? e : new Lt, this.material = void 0 !== t ? t : new Qi }
ia.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: ia,
    isLine: !0,
    computeLineDistances: function() {
        var e = this.geometry;
        if (e.isBufferGeometry)
            if (null === e.index) {
                for (var t = e.attributes.position, n = [0], r = 1, i = t.count; r < i; r++) $i.fromBufferAttribute(t, r - 1), ea.fromBufferAttribute(t, r), n[r] = n[r - 1], n[r] += $i.distanceTo(ea);
                e.setAttribute("lineDistance", new gt(n, 1))
            } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
        else if (e.isGeometry) { var a = e.vertices; for ((n = e.lineDistances)[0] = 0, r = 1, i = a.length; r < i; r++) n[r] = n[r - 1], n[r] += a[r - 1].distanceTo(a[r]) }
        return this
    },
    raycast: function(e, t) {
        var n = this.geometry,
            r = this.matrixWorld,
            i = e.params.Line.threshold;
        if (null === n.boundingSphere && n.computeBoundingSphere(), ra.copy(n.boundingSphere), ra.applyMatrix4(r), ra.radius += i, !1 !== e.ray.intersectsSphere(ra)) {
            ta.getInverse(r), na.copy(e.ray).applyMatrix4(ta);
            var a = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                o = a * a,
                s = new U,
                c = new U,
                u = new U,
                l = new U,
                h = this && this.isLineSegments ? 2 : 1;
            if (n.isBufferGeometry) {
                var p = n.index,
                    d = n.attributes.position.array;
                if (null !== p)
                    for (var f = p.array, m = 0, v = f.length - 1; m < v; m += h) {
                        var g = f[m],
                            y = f[m + 1];
                        s.fromArray(d, 3 * g), c.fromArray(d, 3 * y), na.distanceSqToSegment(s, c, l, u) > o || (l.applyMatrix4(this.matrixWorld), (w = e.ray.origin.distanceTo(l)) < e.near || w > e.far || t.push({ distance: w, point: u.clone().applyMatrix4(this.matrixWorld), index: m, face: null, faceIndex: null, object: this }))
                    } else
                        for (m = 0, v = d.length / 3 - 1; m < v; m += h) s.fromArray(d, 3 * m), c.fromArray(d, 3 * m + 3), na.distanceSqToSegment(s, c, l, u) > o || (l.applyMatrix4(this.matrixWorld), (w = e.ray.origin.distanceTo(l)) < e.near || w > e.far || t.push({ distance: w, point: u.clone().applyMatrix4(this.matrixWorld), index: m, face: null, faceIndex: null, object: this }))
            } else if (n.isGeometry) {
                var x = n.vertices,
                    b = x.length;
                for (m = 0; m < b - 1; m += h) {
                    var w;
                    na.distanceSqToSegment(x[m], x[m + 1], l, u) > o || (l.applyMatrix4(this.matrixWorld), (w = e.ray.origin.distanceTo(l)) < e.near || w > e.far || t.push({ distance: w, point: u.clone().applyMatrix4(this.matrixWorld), index: m, face: null, faceIndex: null, object: this }))
                }
            }
        }
    },
    clone: function() { return new this.constructor(this.geometry, this.material).copy(this) }
});
var aa = new U,
    oa = new U;

function sa(e, t) { ia.call(this, e, t), this.type = "LineSegments" }

function ca(e, t) { ia.call(this, e, t), this.type = "LineLoop" }

function ua(e) { ot.call(this), this.type = "PointsMaterial", this.color = new et(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.morphTargets = !1, this.setValues(e) }
sa.prototype = Object.assign(Object.create(ia.prototype), {
    constructor: sa,
    isLineSegments: !0,
    computeLineDistances: function() {
        var e = this.geometry;
        if (e.isBufferGeometry)
            if (null === e.index) {
                for (var t = e.attributes.position, n = [], r = 0, i = t.count; r < i; r += 2) aa.fromBufferAttribute(t, r), oa.fromBufferAttribute(t, r + 1), n[r] = 0 === r ? 0 : n[r - 1], n[r + 1] = n[r] + aa.distanceTo(oa);
                e.setAttribute("lineDistance", new gt(n, 1))
            } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
        else if (e.isGeometry) { var a = e.vertices; for (n = e.lineDistances, r = 0, i = a.length; r < i; r += 2) aa.copy(a[r]), oa.copy(a[r + 1]), n[r] = 0 === r ? 0 : n[r - 1], n[r + 1] = n[r] + aa.distanceTo(oa) }
        return this
    }
}), ca.prototype = Object.assign(Object.create(ia.prototype), { constructor: ca, isLineLoop: !0 }), ua.prototype = Object.create(ot.prototype), ua.prototype.constructor = ua, ua.prototype.isPointsMaterial = !0, ua.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.morphTargets = e.morphTargets, this };
var la = new W,
    ha = new Ne,
    pa = new Ae,
    da = new U;

function fa(e, t) { ue.call(this), this.type = "Points", this.geometry = void 0 !== e ? e : new Lt, this.material = void 0 !== t ? t : new ua, this.updateMorphTargets() }

function ma(e, t, n, r, i, a, o) {
    var s = ha.distanceSqToPoint(e);
    if (s < n) {
        var c = new U;
        ha.closestPointToPoint(e, c), c.applyMatrix4(r);
        var u = i.ray.origin.distanceTo(c);
        if (u < i.near || u > i.far) return;
        a.push({ distance: u, distanceToRay: Math.sqrt(s), point: c, index: t, face: null, object: o })
    }
}

function va(e, t, n, r, i, a, o, s, c) { P.call(this, e, t, n, r, i, a, o, s, c), this.format = void 0 !== o ? o : 1022, this.minFilter = void 0 !== a ? a : 1006, this.magFilter = void 0 !== i ? i : 1006, this.generateMipmaps = !1 }

function ga(e, t, n, r, i, a, o, s, c, u, l, h) { P.call(this, null, a, o, s, c, u, r, i, l, h), this.image = { width: t, height: n }, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1 }

function ya(e, t, n, r, i, a, o, s, c) { P.call(this, e, t, n, r, i, a, o, s, c), this.needsUpdate = !0 }

function xa(e, t, n, r, i, a, o, s, c, u) {
    if (1026 !== (u = void 0 !== u ? u : 1026) && 1027 !== u) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    void 0 === n && 1026 === u && (n = 1012), void 0 === n && 1027 === u && (n = 1020), P.call(this, null, r, i, a, o, s, u, n, c), this.image = { width: e, height: t }, this.magFilter = void 0 !== o ? o : 1003, this.minFilter = void 0 !== s ? s : 1003, this.flipY = !1, this.generateMipmaps = !1
}

function ba(e) {
    Lt.call(this), this.type = "WireframeGeometry";
    var t, n, r, i, a, o, s, c, u, l, h = [],
        p = [0, 0],
        d = {},
        f = ["a", "b", "c"];
    if (e && e.isGeometry) { var m = e.faces; for (t = 0, r = m.length; t < r; t++) { var v = m[t]; for (n = 0; n < 3; n++) s = v[f[n]], c = v[f[(n + 1) % 3]], p[0] = Math.min(s, c), p[1] = Math.max(s, c), void 0 === d[u = p[0] + "," + p[1]] && (d[u] = { index1: p[0], index2: p[1] }) } for (u in d) o = d[u], l = e.vertices[o.index1], h.push(l.x, l.y, l.z), l = e.vertices[o.index2], h.push(l.x, l.y, l.z) } else if (e && e.isBufferGeometry) {
        var g, y, x, b, w, _, M;
        if (l = new U, null !== e.index) {
            for (g = e.attributes.position, y = e.index, 0 === (x = e.groups).length && (x = [{ start: 0, count: y.count, materialIndex: 0 }]), i = 0, a = x.length; i < a; ++i)
                for (t = w = (b = x[i]).start, r = w + b.count; t < r; t += 3)
                    for (n = 0; n < 3; n++) s = y.getX(t + n), c = y.getX(t + (n + 1) % 3), p[0] = Math.min(s, c), p[1] = Math.max(s, c), void 0 === d[u = p[0] + "," + p[1]] && (d[u] = { index1: p[0], index2: p[1] });
            for (u in d) o = d[u], l.fromBufferAttribute(g, o.index1), h.push(l.x, l.y, l.z), l.fromBufferAttribute(g, o.index2), h.push(l.x, l.y, l.z)
        } else
            for (t = 0, r = (g = e.attributes.position).count / 3; t < r; t++)
                for (n = 0; n < 3; n++) _ = 3 * t + n, l.fromBufferAttribute(g, _), h.push(l.x, l.y, l.z), M = 3 * t + (n + 1) % 3, l.fromBufferAttribute(g, M), h.push(l.x, l.y, l.z)
    }
    this.setAttribute("position", new gt(h, 3))
}

function wa(e, t, n) { $t.call(this), this.type = "ParametricGeometry", this.parameters = { func: e, slices: t, stacks: n }, this.fromBufferGeometry(new _a(e, t, n)), this.mergeVertices() }

function _a(e, t, n) {
    Lt.call(this), this.type = "ParametricBufferGeometry", this.parameters = { func: e, slices: t, stacks: n };
    var r, i, a = [],
        o = [],
        s = [],
        c = [],
        u = 1e-5,
        l = new U,
        h = new U,
        p = new U,
        d = new U,
        f = new U;
    e.length < 3 && console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");
    var m = t + 1;
    for (r = 0; r <= n; r++) {
        var v = r / n;
        for (i = 0; i <= t; i++) {
            var g = i / t;
            e(g, v, h), o.push(h.x, h.y, h.z), g - u >= 0 ? (e(g - u, v, p), d.subVectors(h, p)) : (e(g + u, v, p), d.subVectors(p, h)), v - u >= 0 ? (e(g, v - u, p), f.subVectors(h, p)) : (e(g, v + u, p), f.subVectors(p, h)), l.crossVectors(d, f).normalize(), s.push(l.x, l.y, l.z), c.push(g, v)
        }
    }
    for (r = 0; r < n; r++)
        for (i = 0; i < t; i++) {
            var y = r * m + i,
                x = r * m + i + 1,
                b = (r + 1) * m + i + 1,
                w = (r + 1) * m + i;
            a.push(y, x, w), a.push(x, b, w)
        }
    this.setIndex(a), this.setAttribute("position", new gt(o, 3)), this.setAttribute("normal", new gt(s, 3)), this.setAttribute("uv", new gt(c, 2))
}

function Ma(e, t, n, r) { $t.call(this), this.type = "PolyhedronGeometry", this.parameters = { vertices: e, indices: t, radius: n, detail: r }, this.fromBufferGeometry(new Sa(e, t, n, r)), this.mergeVertices() }

function Sa(e, t, n, r) {
    Lt.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = { vertices: e, indices: t, radius: n, detail: r }, n = n || 1;
    var i = [],
        a = [];

    function o(e, t, n, r) {
        var i, a, o = Math.pow(2, r),
            c = [];
        for (i = 0; i <= o; i++) {
            c[i] = [];
            var u = e.clone().lerp(n, i / o),
                l = t.clone().lerp(n, i / o),
                h = o - i;
            for (a = 0; a <= h; a++) c[i][a] = 0 === a && i === o ? u : u.clone().lerp(l, a / h)
        }
        for (i = 0; i < o; i++)
            for (a = 0; a < 2 * (o - i) - 1; a++) {
                var p = Math.floor(a / 2);
                a % 2 == 0 ? (s(c[i][p + 1]), s(c[i + 1][p]), s(c[i][p])) : (s(c[i][p + 1]), s(c[i + 1][p + 1]), s(c[i + 1][p]))
            }
    }

    function s(e) { i.push(e.x, e.y, e.z) }

    function c(t, n) {
        var r = 3 * t;
        n.x = e[r + 0], n.y = e[r + 1], n.z = e[r + 2]
    }

    function u(e, t, n, r) { r < 0 && 1 === e.x && (a[t] = e.x - 1), 0 === n.x && 0 === n.z && (a[t] = r / 2 / Math.PI + .5) }

    function l(e) { return Math.atan2(e.z, -e.x) }! function(e) { for (var n = new U, r = new U, i = new U, a = 0; a < t.length; a += 3) c(t[a + 0], n), c(t[a + 1], r), c(t[a + 2], i), o(n, r, i, e) }(r = r || 0),
    function(e) { for (var t = new U, n = 0; n < i.length; n += 3) t.x = i[n + 0], t.y = i[n + 1], t.z = i[n + 2], t.normalize().multiplyScalar(e), i[n + 0] = t.x, i[n + 1] = t.y, i[n + 2] = t.z }(n),
    function() {
        for (var e = new U, t = 0; t < i.length; t += 3) {
            e.x = i[t + 0], e.y = i[t + 1], e.z = i[t + 2];
            var n = l(e) / 2 / Math.PI + .5,
                r = (o = e, Math.atan2(-o.y, Math.sqrt(o.x * o.x + o.z * o.z)) / Math.PI + .5);
            a.push(n, 1 - r)
        }
        var o;
        (function() {
            for (var e = new U, t = new U, n = new U, r = new U, o = new E, s = new E, c = new E, h = 0, p = 0; h < i.length; h += 9, p += 6) {
                e.set(i[h + 0], i[h + 1], i[h + 2]), t.set(i[h + 3], i[h + 4], i[h + 5]), n.set(i[h + 6], i[h + 7], i[h + 8]), o.set(a[p + 0], a[p + 1]), s.set(a[p + 2], a[p + 3]), c.set(a[p + 4], a[p + 5]), r.copy(e).add(t).add(n).divideScalar(3);
                var d = l(r);
                u(o, p + 0, e, d), u(s, p + 2, t, d), u(c, p + 4, n, d)
            }
        })(),
        function() {
            for (var e = 0; e < a.length; e += 6) {
                var t = a[e + 0],
                    n = a[e + 2],
                    r = a[e + 4],
                    i = Math.max(t, n, r),
                    o = Math.min(t, n, r);
                i > .9 && o < .1 && (t < .2 && (a[e + 0] += 1), n < .2 && (a[e + 2] += 1), r < .2 && (a[e + 4] += 1))
            }
        }()
    }(), this.setAttribute("position", new gt(i, 3)), this.setAttribute("normal", new gt(i.slice(), 3)), this.setAttribute("uv", new gt(a, 2)), 0 === r ? this.computeVertexNormals() : this.normalizeNormals()
}

function Ta(e, t) { $t.call(this), this.type = "TetrahedronGeometry", this.parameters = { radius: e, detail: t }, this.fromBufferGeometry(new Ea(e, t)), this.mergeVertices() }

function Ea(e, t) { Sa.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t), this.type = "TetrahedronBufferGeometry", this.parameters = { radius: e, detail: t } }

function Aa(e, t) { $t.call(this), this.type = "OctahedronGeometry", this.parameters = { radius: e, detail: t }, this.fromBufferGeometry(new La(e, t)), this.mergeVertices() }

function La(e, t) { Sa.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t), this.type = "OctahedronBufferGeometry", this.parameters = { radius: e, detail: t } }

function Ra(e, t) { $t.call(this), this.type = "IcosahedronGeometry", this.parameters = { radius: e, detail: t }, this.fromBufferGeometry(new Pa(e, t)), this.mergeVertices() }

function Pa(e, t) {
    var n = (1 + Math.sqrt(5)) / 2,
        r = [-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1];
    Sa.call(this, r, [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t), this.type = "IcosahedronBufferGeometry", this.parameters = { radius: e, detail: t }
}

function Ca(e, t) { $t.call(this), this.type = "DodecahedronGeometry", this.parameters = { radius: e, detail: t }, this.fromBufferGeometry(new Oa(e, t)), this.mergeVertices() }

function Oa(e, t) {
    var n = (1 + Math.sqrt(5)) / 2,
        r = 1 / n,
        i = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, 0, -n, 0, -r, n, 0, -r, -n, 0, r, n, 0, r];
    Sa.call(this, i, [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t), this.type = "DodecahedronBufferGeometry", this.parameters = { radius: e, detail: t }
}

function Ia(e, t, n, r, i, a) {
    $t.call(this), this.type = "TubeGeometry", this.parameters = { path: e, tubularSegments: t, radius: n, radialSegments: r, closed: i }, void 0 !== a && console.warn("THREE.TubeGeometry: taper has been removed.");
    var o = new Da(e, t, n, r, i);
    this.tangents = o.tangents, this.normals = o.normals, this.binormals = o.binormals, this.fromBufferGeometry(o), this.mergeVertices()
}

function Da(e, t, n, r, i) {
    Lt.call(this), this.type = "TubeBufferGeometry", this.parameters = { path: e, tubularSegments: t, radius: n, radialSegments: r, closed: i }, t = t || 64, n = n || 1, r = r || 8, i = i || !1;
    var a = e.computeFrenetFrames(t, i);
    this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
    var o, s, c = new U,
        u = new U,
        l = new E,
        h = new U,
        p = [],
        d = [],
        f = [],
        m = [];

    function v(i) {
        h = e.getPointAt(i / t, h);
        var o = a.normals[i],
            l = a.binormals[i];
        for (s = 0; s <= r; s++) {
            var f = s / r * Math.PI * 2,
                m = Math.sin(f),
                v = -Math.cos(f);
            u.x = v * o.x + m * l.x, u.y = v * o.y + m * l.y, u.z = v * o.z + m * l.z, u.normalize(), d.push(u.x, u.y, u.z), c.x = h.x + n * u.x, c.y = h.y + n * u.y, c.z = h.z + n * u.z, p.push(c.x, c.y, c.z)
        }
    }! function() {
        for (o = 0; o < t; o++) v(o);
        v(!1 === i ? t : 0),
            function() {
                for (o = 0; o <= t; o++)
                    for (s = 0; s <= r; s++) l.x = o / t, l.y = s / r, f.push(l.x, l.y)
            }(),
            function() {
                for (s = 1; s <= t; s++)
                    for (o = 1; o <= r; o++) {
                        var e = (r + 1) * (s - 1) + (o - 1),
                            n = (r + 1) * s + (o - 1),
                            i = (r + 1) * s + o,
                            a = (r + 1) * (s - 1) + o;
                        m.push(e, n, a), m.push(n, i, a)
                    }
            }()
    }(), this.setIndex(m), this.setAttribute("position", new gt(p, 3)), this.setAttribute("normal", new gt(d, 3)), this.setAttribute("uv", new gt(f, 2))
}

function Na(e, t, n, r, i, a, o) { $t.call(this), this.type = "TorusKnotGeometry", this.parameters = { radius: e, tube: t, tubularSegments: n, radialSegments: r, p: i, q: a }, void 0 !== o && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), this.fromBufferGeometry(new Fa(e, t, n, r, i, a)), this.mergeVertices() }

function Fa(e, t, n, r, i, a) {
    Lt.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = { radius: e, tube: t, tubularSegments: n, radialSegments: r, p: i, q: a }, e = e || 1, t = t || .4, n = Math.floor(n) || 64, r = Math.floor(r) || 8, i = i || 2, a = a || 3;
    var o, s, c = [],
        u = [],
        l = [],
        h = [],
        p = new U,
        d = new U,
        f = new U,
        m = new U,
        v = new U,
        g = new U,
        y = new U;
    for (o = 0; o <= n; ++o) {
        var x = o / n * i * Math.PI * 2;
        for (A(x, i, a, e, f), A(x + .01, i, a, e, m), g.subVectors(m, f), y.addVectors(m, f), v.crossVectors(g, y), y.crossVectors(v, g), v.normalize(), y.normalize(), s = 0; s <= r; ++s) {
            var b = s / r * Math.PI * 2,
                w = -t * Math.cos(b),
                _ = t * Math.sin(b);
            p.x = f.x + (w * y.x + _ * v.x), p.y = f.y + (w * y.y + _ * v.y), p.z = f.z + (w * y.z + _ * v.z), u.push(p.x, p.y, p.z), d.subVectors(p, f).normalize(), l.push(d.x, d.y, d.z), h.push(o / n), h.push(s / r)
        }
    }
    for (s = 1; s <= n; s++)
        for (o = 1; o <= r; o++) {
            var M = (r + 1) * (s - 1) + (o - 1),
                S = (r + 1) * s + (o - 1),
                T = (r + 1) * s + o,
                E = (r + 1) * (s - 1) + o;
            c.push(M, S, E), c.push(S, T, E)
        }

    function A(e, t, n, r, i) {
        var a = Math.cos(e),
            o = Math.sin(e),
            s = n / t * e,
            c = Math.cos(s);
        i.x = r * (2 + c) * .5 * a, i.y = r * (2 + c) * o * .5, i.z = r * Math.sin(s) * .5
    }
    this.setIndex(c), this.setAttribute("position", new gt(u, 3)), this.setAttribute("normal", new gt(l, 3)), this.setAttribute("uv", new gt(h, 2))
}

function Ua(e, t, n, r, i) { $t.call(this), this.type = "TorusGeometry", this.parameters = { radius: e, tube: t, radialSegments: n, tubularSegments: r, arc: i }, this.fromBufferGeometry(new Ba(e, t, n, r, i)), this.mergeVertices() }

function Ba(e, t, n, r, i) {
    Lt.call(this), this.type = "TorusBufferGeometry", this.parameters = { radius: e, tube: t, radialSegments: n, tubularSegments: r, arc: i }, e = e || 1, t = t || .4, n = Math.floor(n) || 8, r = Math.floor(r) || 6, i = i || 2 * Math.PI;
    var a, o, s = [],
        c = [],
        u = [],
        l = [],
        h = new U,
        p = new U,
        d = new U;
    for (a = 0; a <= n; a++)
        for (o = 0; o <= r; o++) {
            var f = o / r * i,
                m = a / n * Math.PI * 2;
            p.x = (e + t * Math.cos(m)) * Math.cos(f), p.y = (e + t * Math.cos(m)) * Math.sin(f), p.z = t * Math.sin(m), c.push(p.x, p.y, p.z), h.x = e * Math.cos(f), h.y = e * Math.sin(f), d.subVectors(p, h).normalize(), u.push(d.x, d.y, d.z), l.push(o / r), l.push(a / n)
        }
    for (a = 1; a <= n; a++)
        for (o = 1; o <= r; o++) {
            var v = (r + 1) * a + o - 1,
                g = (r + 1) * (a - 1) + o - 1,
                y = (r + 1) * (a - 1) + o,
                x = (r + 1) * a + o;
            s.push(v, g, x), s.push(g, y, x)
        }
    this.setIndex(s), this.setAttribute("position", new gt(c, 3)), this.setAttribute("normal", new gt(u, 3)), this.setAttribute("uv", new gt(l, 2))
}
fa.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: fa,
    isPoints: !0,
    raycast: function(e, t) {
        var n = this.geometry,
            r = this.matrixWorld,
            i = e.params.Points.threshold;
        if (null === n.boundingSphere && n.computeBoundingSphere(), pa.copy(n.boundingSphere), pa.applyMatrix4(r), pa.radius += i, !1 !== e.ray.intersectsSphere(pa)) {
            la.getInverse(r), ha.copy(e.ray).applyMatrix4(la);
            var a = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                o = a * a;
            if (n.isBufferGeometry) {
                var s = n.index,
                    c = n.attributes.position.array;
                if (null !== s)
                    for (var u = s.array, l = 0, h = u.length; l < h; l++) {
                        var p = u[l];
                        da.fromArray(c, 3 * p), ma(da, p, o, r, e, t, this)
                    } else { l = 0; for (var d = c.length / 3; l < d; l++) da.fromArray(c, 3 * l), ma(da, l, o, r, e, t, this) }
            } else { var f = n.vertices; for (l = 0, d = f.length; l < d; l++) ma(f[l], l, o, r, e, t, this) }
        }
    },
    updateMorphTargets: function() {
        var e, t, n, r = this.geometry;
        if (r.isBufferGeometry) {
            var i = r.morphAttributes,
                a = Object.keys(i);
            if (a.length > 0) {
                var o = i[a[0]];
                if (void 0 !== o)
                    for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, e = 0, t = o.length; e < t; e++) n = o[e].name || String(e), this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
            }
        } else {
            var s = r.morphTargets;
            void 0 !== s && s.length > 0 && console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")
        }
    },
    clone: function() { return new this.constructor(this.geometry, this.material).copy(this) }
}), va.prototype = Object.assign(Object.create(P.prototype), {
    constructor: va,
    isVideoTexture: !0,
    update: function() {
        var e = this.image;
        e.readyState >= e.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
    }
}), ga.prototype = Object.create(P.prototype), ga.prototype.constructor = ga, ga.prototype.isCompressedTexture = !0, ya.prototype = Object.create(P.prototype), ya.prototype.constructor = ya, ya.prototype.isCanvasTexture = !0, xa.prototype = Object.create(P.prototype), xa.prototype.constructor = xa, xa.prototype.isDepthTexture = !0, ba.prototype = Object.create(Lt.prototype), ba.prototype.constructor = ba, wa.prototype = Object.create($t.prototype), wa.prototype.constructor = wa, _a.prototype = Object.create(Lt.prototype), _a.prototype.constructor = _a, Ma.prototype = Object.create($t.prototype), Ma.prototype.constructor = Ma, Sa.prototype = Object.create(Lt.prototype), Sa.prototype.constructor = Sa, Ta.prototype = Object.create($t.prototype), Ta.prototype.constructor = Ta, Ea.prototype = Object.create(Sa.prototype), Ea.prototype.constructor = Ea, Aa.prototype = Object.create($t.prototype), Aa.prototype.constructor = Aa, La.prototype = Object.create(Sa.prototype), La.prototype.constructor = La, Ra.prototype = Object.create($t.prototype), Ra.prototype.constructor = Ra, Pa.prototype = Object.create(Sa.prototype), Pa.prototype.constructor = Pa, Ca.prototype = Object.create($t.prototype), Ca.prototype.constructor = Ca, Oa.prototype = Object.create(Sa.prototype), Oa.prototype.constructor = Oa, Ia.prototype = Object.create($t.prototype), Ia.prototype.constructor = Ia, Da.prototype = Object.create(Lt.prototype), Da.prototype.constructor = Da, Da.prototype.toJSON = function() { var e = Lt.prototype.toJSON.call(this); return e.path = this.parameters.path.toJSON(), e }, Na.prototype = Object.create($t.prototype), Na.prototype.constructor = Na, Fa.prototype = Object.create(Lt.prototype), Fa.prototype.constructor = Fa, Ua.prototype = Object.create($t.prototype), Ua.prototype.constructor = Ua, Ba.prototype = Object.create(Lt.prototype), Ba.prototype.constructor = Ba;

function ka(e, t, n, r, i) {
    var a, o;
    if (i === function(e, t, n, r) { for (var i = 0, a = t, o = n - r; a < n; a += r) i += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a; return i }(e, t, n, r) > 0)
        for (a = t; a < n; a += r) o = ro(a, e[a], e[a + 1], o);
    else
        for (a = n - r; a >= t; a -= r) o = ro(a, e[a], e[a + 1], o);
    return o && $a(o, o.next) && (io(o), o = o.next), o
}

function za(e, t) {
    if (!e) return e;
    t || (t = e);
    var n, r = e;
    do {
        if (n = !1, r.steiner || !$a(r, r.next) && 0 !== Qa(r.prev, r, r.next)) r = r.next;
        else {
            if (io(r), (r = t = r.prev) === r.next) break;
            n = !0
        }
    } while (n || r !== t);
    return t
}

function Ga(e, t, n, r, i, a, o) {
    if (e) {
        !o && a && function(e, t, n, r) {
            var i = e;
            do { null === i.z && (i.z = Ya(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next } while (i !== e);
            i.prevZ.nextZ = null, i.prevZ = null,
                function(e) {
                    var t, n, r, i, a, o, s, c, u = 1;
                    do {
                        for (n = e, e = null, a = null, o = 0; n;) {
                            for (o++, r = n, s = 0, t = 0; t < u && (s++, r = r.nextZ); t++);
                            for (c = u; s > 0 || c > 0 && r;) 0 !== s && (0 === c || !r || n.z <= r.z) ? (i = n, n = n.nextZ, s--) : (i = r, r = r.nextZ, c--), a ? a.nextZ = i : e = i, i.prevZ = a, a = i;
                            n = r
                        }
                        a.nextZ = null, u *= 2
                    } while (o > 1)
                }(i)
        }(e, r, i, a);
        for (var s, c, u = e; e.prev !== e.next;)
            if (s = e.prev, c = e.next, a ? ja(e, r, i, a) : Ha(e)) t.push(s.i / n), t.push(e.i / n), t.push(c.i / n), io(e), e = c.next, u = c.next;
            else if ((e = c) === u) { o ? 1 === o ? Ga(e = Va(e, t, n), t, n, r, i, a, 2) : 2 === o && Wa(e, t, n, r, i, a) : Ga(za(e), t, n, r, i, a, 1); break }
    }
}

function Ha(e) {
    var t = e.prev,
        n = e,
        r = e.next;
    if (Qa(t, n, r) >= 0) return !1;
    for (var i = e.next.next; i !== e.prev;) {
        if (Ja(t.x, t.y, n.x, n.y, r.x, r.y, i.x, i.y) && Qa(i.prev, i, i.next) >= 0) return !1;
        i = i.next
    }
    return !0
}

function ja(e, t, n, r) {
    var i = e.prev,
        a = e,
        o = e.next;
    if (Qa(i, a, o) >= 0) return !1;
    for (var s = i.x < a.x ? i.x < o.x ? i.x : o.x : a.x < o.x ? a.x : o.x, c = i.y < a.y ? i.y < o.y ? i.y : o.y : a.y < o.y ? a.y : o.y, u = i.x > a.x ? i.x > o.x ? i.x : o.x : a.x > o.x ? a.x : o.x, l = i.y > a.y ? i.y > o.y ? i.y : o.y : a.y > o.y ? a.y : o.y, h = Ya(s, c, t, n, r), p = Ya(u, l, t, n, r), d = e.prevZ, f = e.nextZ; d && d.z >= h && f && f.z <= p;) {
        if (d !== e.prev && d !== e.next && Ja(i.x, i.y, a.x, a.y, o.x, o.y, d.x, d.y) && Qa(d.prev, d, d.next) >= 0) return !1;
        if (d = d.prevZ, f !== e.prev && f !== e.next && Ja(i.x, i.y, a.x, a.y, o.x, o.y, f.x, f.y) && Qa(f.prev, f, f.next) >= 0) return !1;
        f = f.nextZ
    }
    for (; d && d.z >= h;) {
        if (d !== e.prev && d !== e.next && Ja(i.x, i.y, a.x, a.y, o.x, o.y, d.x, d.y) && Qa(d.prev, d, d.next) >= 0) return !1;
        d = d.prevZ
    }
    for (; f && f.z <= p;) {
        if (f !== e.prev && f !== e.next && Ja(i.x, i.y, a.x, a.y, o.x, o.y, f.x, f.y) && Qa(f.prev, f, f.next) >= 0) return !1;
        f = f.nextZ
    }
    return !0
}

function Va(e, t, n) {
    var r = e;
    do {
        var i = r.prev,
            a = r.next.next;
        !$a(i, a) && eo(i, r, r.next, a) && to(i, a) && to(a, i) && (t.push(i.i / n), t.push(r.i / n), t.push(a.i / n), io(r), io(r.next), r = e = a), r = r.next
    } while (r !== e);
    return r
}

function Wa(e, t, n, r, i, a) {
    var o = e;
    do {
        for (var s = o.next.next; s !== o.prev;) {
            if (o.i !== s.i && Ka(o, s)) { var c = no(o, s); return o = za(o, o.next), c = za(c, c.next), Ga(o, t, n, r, i, a), void Ga(c, t, n, r, i, a) }
            s = s.next
        }
        o = o.next
    } while (o !== e)
}

function qa(e, t) { return e.x - t.x }

function Xa(e, t) {
    if (t = function(e, t) {
            var n, r = t,
                i = e.x,
                a = e.y,
                o = -1 / 0;
            do {
                if (a <= r.y && a >= r.next.y && r.next.y !== r.y) {
                    var s = r.x + (a - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                    if (s <= i && s > o) {
                        if (o = s, s === i) { if (a === r.y) return r; if (a === r.next.y) return r.next }
                        n = r.x < r.next.x ? r : r.next
                    }
                }
                r = r.next
            } while (r !== t);
            if (!n) return null;
            if (i === o) return n.prev;
            var c, u = n,
                l = n.x,
                h = n.y,
                p = 1 / 0;
            for (r = n.next; r !== u;) i >= r.x && r.x >= l && i !== r.x && Ja(a < h ? i : o, a, l, h, a < h ? o : i, a, r.x, r.y) && ((c = Math.abs(a - r.y) / (i - r.x)) < p || c === p && r.x > n.x) && to(r, e) && (n = r, p = c), r = r.next;
            return n
        }(e, t)) {
        var n = no(t, e);
        za(n, n.next)
    }
}

function Ya(e, t, n, r, i) { return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * i) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * i) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1 }

function Za(e) {
    var t = e,
        n = e;
    do {
        (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next
    } while (t !== e);
    return n
}

function Ja(e, t, n, r, i, a, o, s) { return (i - o) * (t - s) - (e - o) * (a - s) >= 0 && (e - o) * (r - s) - (n - o) * (t - s) >= 0 && (n - o) * (a - s) - (i - o) * (r - s) >= 0 }

function Ka(e, t) {
    return e.next.i !== t.i && e.prev.i !== t.i && ! function(e, t) {
        var n = e;
        do {
            if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && eo(n, n.next, e, t)) return !0;
            n = n.next
        } while (n !== e);
        return !1
    }(e, t) && to(e, t) && to(t, e) && function(e, t) {
        var n = e,
            r = !1,
            i = (e.x + t.x) / 2,
            a = (e.y + t.y) / 2;
        do { n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next } while (n !== e);
        return r
    }(e, t)
}

function Qa(e, t, n) { return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y) }

function $a(e, t) { return e.x === t.x && e.y === t.y }

function eo(e, t, n, r) { return !!($a(e, n) && $a(t, r) || $a(e, r) && $a(n, t)) || Qa(e, t, n) > 0 != Qa(e, t, r) > 0 && Qa(n, r, e) > 0 != Qa(n, r, t) > 0 }

function to(e, t) { return Qa(e.prev, e, e.next) < 0 ? Qa(e, t, e.next) >= 0 && Qa(e, e.prev, t) >= 0 : Qa(e, t, e.prev) < 0 || Qa(e, e.next, t) < 0 }

function no(e, t) {
    var n = new ao(e.i, e.x, e.y),
        r = new ao(t.i, t.x, t.y),
        i = e.next,
        a = t.prev;
    return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r
}

function ro(e, t, n, r) { var i = new ao(e, t, n); return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i }

function io(e) { e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ) }

function ao(e, t, n) { this.i = e, this.x = t, this.y = n, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1 }
var oo = {
    area: function(e) { for (var t = e.length, n = 0, r = t - 1, i = 0; i < t; r = i++) n += e[r].x * e[i].y - e[i].x * e[r].y; return .5 * n },
    isClockWise: function(e) { return oo.area(e) < 0 },
    triangulateShape: function(e, t) {
        var n = [],
            r = [],
            i = [];
        so(e), co(n, e);
        var a = e.length;
        t.forEach(so);
        for (var o = 0; o < t.length; o++) r.push(a), a += t[o].length, co(n, t[o]);
        var s = function(e, t, n) {
            n = n || 2;
            var r, i, a, o, s, c, u, l = t && t.length,
                h = l ? t[0] * n : e.length,
                p = ka(e, 0, h, n, !0),
                d = [];
            if (!p || p.next === p.prev) return d;
            if (l && (p = function(e, t, n, r) { var i, a, o, s = []; for (i = 0, a = t.length; i < a; i++)(o = ka(e, t[i] * r, i < a - 1 ? t[i + 1] * r : e.length, r, !1)) === o.next && (o.steiner = !0), s.push(Za(o)); for (s.sort(qa), i = 0; i < s.length; i++) Xa(s[i], n), n = za(n, n.next); return n }(e, t, p, n)), e.length > 80 * n) {
                r = a = e[0], i = o = e[1];
                for (var f = n; f < h; f += n)(s = e[f]) < r && (r = s), (c = e[f + 1]) < i && (i = c), s > a && (a = s), c > o && (o = c);
                u = 0 !== (u = Math.max(a - r, o - i)) ? 1 / u : 0
            }
            return Ga(p, d, n, r, i, u), d
        }(n, r);
        for (o = 0; o < s.length; o += 3) i.push(s.slice(o, o + 3));
        return i
    }
};

function so(e) {
    var t = e.length;
    t > 2 && e[t - 1].equals(e[0]) && e.pop()
}

function co(e, t) { for (var n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y) }

function uo(e, t) { $t.call(this), this.type = "ExtrudeGeometry", this.parameters = { shapes: e, options: t }, this.fromBufferGeometry(new lo(e, t)), this.mergeVertices() }

function lo(e, t) {
    Lt.call(this), this.type = "ExtrudeBufferGeometry", this.parameters = { shapes: e, options: t }, e = Array.isArray(e) ? e : [e];
    for (var n = this, r = [], i = [], a = 0, o = e.length; a < o; a++) s(e[a]);

    function s(e) {
        var a = [],
            o = void 0 !== t.curveSegments ? t.curveSegments : 12,
            s = void 0 !== t.steps ? t.steps : 1,
            c = void 0 !== t.depth ? t.depth : 100,
            u = void 0 === t.bevelEnabled || t.bevelEnabled,
            l = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
            h = void 0 !== t.bevelSize ? t.bevelSize : l - 2,
            p = void 0 !== t.bevelOffset ? t.bevelOffset : 0,
            d = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
            f = t.extrudePath,
            m = void 0 !== t.UVGenerator ? t.UVGenerator : ho;
        void 0 !== t.amount && (console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."), c = t.amount);
        var v, g, y, x, b, w, _, M, S = !1;
        f && (v = f.getSpacedPoints(s), S = !0, u = !1, g = f.computeFrenetFrames(s, !1), y = new U, x = new U, b = new U), u || (d = 0, l = 0, h = 0, p = 0);
        var T = e.extractPoints(o),
            A = T.shape,
            L = T.holes;
        if (!oo.isClockWise(A))
            for (A = A.reverse(), _ = 0, M = L.length; _ < M; _++) w = L[_], oo.isClockWise(w) && (L[_] = w.reverse());
        var R = oo.triangulateShape(A, L),
            P = A;
        for (_ = 0, M = L.length; _ < M; _++) w = L[_], A = A.concat(w);

        function C(e, t, n) { return t || console.error("THREE.ExtrudeGeometry: vec does not exist"), t.clone().multiplyScalar(n).add(e) }
        var O, I, D, N, F, B, k = A.length,
            z = R.length;

        function G(e, t, n) {
            var r, i, a, o = e.x - t.x,
                s = e.y - t.y,
                c = n.x - e.x,
                u = n.y - e.y,
                l = o * o + s * s,
                h = o * u - s * c;
            if (Math.abs(h) > Number.EPSILON) {
                var p = Math.sqrt(l),
                    d = Math.sqrt(c * c + u * u),
                    f = t.x - s / p,
                    m = t.y + o / p,
                    v = ((n.x - u / d - f) * u - (n.y + c / d - m) * c) / (o * u - s * c),
                    g = (r = f + o * v - e.x) * r + (i = m + s * v - e.y) * i;
                if (g <= 2) return new E(r, i);
                a = Math.sqrt(g / 2)
            } else {
                var y = !1;
                o > Number.EPSILON ? c > Number.EPSILON && (y = !0) : o < -Number.EPSILON ? c < -Number.EPSILON && (y = !0) : Math.sign(s) === Math.sign(u) && (y = !0), y ? (r = -s, i = o, a = Math.sqrt(l)) : (r = o, i = s, a = Math.sqrt(l / 2))
            }
            return new E(r / a, i / a)
        }
        for (var H = [], j = 0, V = P.length, W = V - 1, q = j + 1; j < V; j++, W++, q++) W === V && (W = 0), q === V && (q = 0), H[j] = G(P[j], P[W], P[q]);
        var X, Y, Z = [],
            J = H.concat();
        for (_ = 0, M = L.length; _ < M; _++) {
            for (w = L[_], X = [], j = 0, W = (V = w.length) - 1, q = j + 1; j < V; j++, W++, q++) W === V && (W = 0), q === V && (q = 0), X[j] = G(w[j], w[W], w[q]);
            Z.push(X), J = J.concat(X)
        }
        for (O = 0; O < d; O++) {
            for (D = O / d, N = l * Math.cos(D * Math.PI / 2), I = h * Math.sin(D * Math.PI / 2) + p, j = 0, V = P.length; j < V; j++) Q((F = C(P[j], H[j], I)).x, F.y, -N);
            for (_ = 0, M = L.length; _ < M; _++)
                for (w = L[_], X = Z[_], j = 0, V = w.length; j < V; j++) Q((F = C(w[j], X[j], I)).x, F.y, -N)
        }
        for (I = h + p, j = 0; j < k; j++) F = u ? C(A[j], J[j], I) : A[j], S ? (x.copy(g.normals[0]).multiplyScalar(F.x), y.copy(g.binormals[0]).multiplyScalar(F.y), b.copy(v[0]).add(x).add(y), Q(b.x, b.y, b.z)) : Q(F.x, F.y, 0);
        for (Y = 1; Y <= s; Y++)
            for (j = 0; j < k; j++) F = u ? C(A[j], J[j], I) : A[j], S ? (x.copy(g.normals[Y]).multiplyScalar(F.x), y.copy(g.binormals[Y]).multiplyScalar(F.y), b.copy(v[Y]).add(x).add(y), Q(b.x, b.y, b.z)) : Q(F.x, F.y, c / s * Y);
        for (O = d - 1; O >= 0; O--) {
            for (D = O / d, N = l * Math.cos(D * Math.PI / 2), I = h * Math.sin(D * Math.PI / 2) + p, j = 0, V = P.length; j < V; j++) Q((F = C(P[j], H[j], I)).x, F.y, c + N);
            for (_ = 0, M = L.length; _ < M; _++)
                for (w = L[_], X = Z[_], j = 0, V = w.length; j < V; j++) F = C(w[j], X[j], I), S ? Q(F.x, F.y + v[s - 1].y, v[s - 1].x + N) : Q(F.x, F.y, c + N)
        }

        function K(e, t) {
            var n, r;
            for (j = e.length; --j >= 0;) {
                n = j, (r = j - 1) < 0 && (r = e.length - 1);
                var i = 0,
                    a = s + 2 * d;
                for (i = 0; i < a; i++) {
                    var o = k * i,
                        c = k * (i + 1);
                    ee(t + n + o, t + r + o, t + r + c, t + n + c)
                }
            }
        }

        function Q(e, t, n) { a.push(e), a.push(t), a.push(n) }

        function $(e, t, i) {
            te(e), te(t), te(i);
            var a = r.length / 3,
                o = m.generateTopUV(n, r, a - 3, a - 2, a - 1);
            ne(o[0]), ne(o[1]), ne(o[2])
        }

        function ee(e, t, i, a) {
            te(e), te(t), te(a), te(t), te(i), te(a);
            var o = r.length / 3,
                s = m.generateSideWallUV(n, r, o - 6, o - 3, o - 2, o - 1);
            ne(s[0]), ne(s[1]), ne(s[3]), ne(s[1]), ne(s[2]), ne(s[3])
        }

        function te(e) { r.push(a[3 * e + 0]), r.push(a[3 * e + 1]), r.push(a[3 * e + 2]) }

        function ne(e) { i.push(e.x), i.push(e.y) }! function() {
            var e = r.length / 3;
            if (u) {
                var t = 0,
                    i = k * t;
                for (j = 0; j < z; j++) $((B = R[j])[2] + i, B[1] + i, B[0] + i);
                for (i = k * (t = s + 2 * d), j = 0; j < z; j++) $((B = R[j])[0] + i, B[1] + i, B[2] + i)
            } else { for (j = 0; j < z; j++) $((B = R[j])[2], B[1], B[0]); for (j = 0; j < z; j++) $((B = R[j])[0] + k * s, B[1] + k * s, B[2] + k * s) }
            n.addGroup(e, r.length / 3 - e, 0)
        }(),
        function() {
            var e = r.length / 3,
                t = 0;
            for (K(P, t), t += P.length, _ = 0, M = L.length; _ < M; _++) K(w = L[_], t), t += w.length;
            n.addGroup(e, r.length / 3 - e, 1)
        }()
    }
    this.setAttribute("position", new gt(r, 3)), this.setAttribute("uv", new gt(i, 2)), this.computeVertexNormals()
}
uo.prototype = Object.create($t.prototype), uo.prototype.constructor = uo, uo.prototype.toJSON = function() { var e = $t.prototype.toJSON.call(this); return po(this.parameters.shapes, this.parameters.options, e) }, lo.prototype = Object.create(Lt.prototype), lo.prototype.constructor = lo, lo.prototype.toJSON = function() { var e = Lt.prototype.toJSON.call(this); return po(this.parameters.shapes, this.parameters.options, e) };
var ho = {
    generateTopUV: function(e, t, n, r, i) {
        var a = t[3 * n],
            o = t[3 * n + 1],
            s = t[3 * r],
            c = t[3 * r + 1],
            u = t[3 * i],
            l = t[3 * i + 1];
        return [new E(a, o), new E(s, c), new E(u, l)]
    },
    generateSideWallUV: function(e, t, n, r, i, a) {
        var o = t[3 * n],
            s = t[3 * n + 1],
            c = t[3 * n + 2],
            u = t[3 * r],
            l = t[3 * r + 1],
            h = t[3 * r + 2],
            p = t[3 * i],
            d = t[3 * i + 1],
            f = t[3 * i + 2],
            m = t[3 * a],
            v = t[3 * a + 1],
            g = t[3 * a + 2];
        return Math.abs(s - l) < .01 ? [new E(o, 1 - c), new E(u, 1 - h), new E(p, 1 - f), new E(m, 1 - g)] : [new E(s, 1 - c), new E(l, 1 - h), new E(d, 1 - f), new E(v, 1 - g)]
    }
};

function po(e, t, n) {
    if (n.shapes = [], Array.isArray(e))
        for (var r = 0, i = e.length; r < i; r++) {
            var a = e[r];
            n.shapes.push(a.uuid)
        } else n.shapes.push(e.uuid);
    return void 0 !== t.extrudePath && (n.options.extrudePath = t.extrudePath.toJSON()), n
}

function fo(e, t) { $t.call(this), this.type = "TextGeometry", this.parameters = { text: e, parameters: t }, this.fromBufferGeometry(new mo(e, t)), this.mergeVertices() }

function mo(e, t) {
    var n = (t = t || {}).font;
    if (!n || !n.isFont) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new $t;
    var r = n.generateShapes(e, t.size);
    t.depth = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), lo.call(this, r, t), this.type = "TextBufferGeometry"
}

function vo(e, t, n, r, i, a, o) { $t.call(this), this.type = "SphereGeometry", this.parameters = { radius: e, widthSegments: t, heightSegments: n, phiStart: r, phiLength: i, thetaStart: a, thetaLength: o }, this.fromBufferGeometry(new go(e, t, n, r, i, a, o)), this.mergeVertices() }

function go(e, t, n, r, i, a, o) {
    Lt.call(this), this.type = "SphereBufferGeometry", this.parameters = { radius: e, widthSegments: t, heightSegments: n, phiStart: r, phiLength: i, thetaStart: a, thetaLength: o }, e = e || 1, t = Math.max(3, Math.floor(t) || 8), n = Math.max(2, Math.floor(n) || 6), r = void 0 !== r ? r : 0, i = void 0 !== i ? i : 2 * Math.PI, a = void 0 !== a ? a : 0, o = void 0 !== o ? o : Math.PI;
    var s, c, u = Math.min(a + o, Math.PI),
        l = 0,
        h = [],
        p = new U,
        d = new U,
        f = [],
        m = [],
        v = [],
        g = [];
    for (c = 0; c <= n; c++) {
        var y = [],
            x = c / n,
            b = 0;
        for (0 == c && 0 == a ? b = .5 / t : c == n && u == Math.PI && (b = -.5 / t), s = 0; s <= t; s++) {
            var w = s / t;
            p.x = -e * Math.cos(r + w * i) * Math.sin(a + x * o), p.y = e * Math.cos(a + x * o), p.z = e * Math.sin(r + w * i) * Math.sin(a + x * o), m.push(p.x, p.y, p.z), d.copy(p).normalize(), v.push(d.x, d.y, d.z), g.push(w + b, 1 - x), y.push(l++)
        }
        h.push(y)
    }
    for (c = 0; c < n; c++)
        for (s = 0; s < t; s++) {
            var _ = h[c][s + 1],
                M = h[c][s],
                S = h[c + 1][s],
                T = h[c + 1][s + 1];
            (0 !== c || a > 0) && f.push(_, M, T), (c !== n - 1 || u < Math.PI) && f.push(M, S, T)
        }
    this.setIndex(f), this.setAttribute("position", new gt(m, 3)), this.setAttribute("normal", new gt(v, 3)), this.setAttribute("uv", new gt(g, 2))
}

function yo(e, t, n, r, i, a) { $t.call(this), this.type = "RingGeometry", this.parameters = { innerRadius: e, outerRadius: t, thetaSegments: n, phiSegments: r, thetaStart: i, thetaLength: a }, this.fromBufferGeometry(new xo(e, t, n, r, i, a)), this.mergeVertices() }

function xo(e, t, n, r, i, a) {
    Lt.call(this), this.type = "RingBufferGeometry", this.parameters = { innerRadius: e, outerRadius: t, thetaSegments: n, phiSegments: r, thetaStart: i, thetaLength: a }, e = e || .5, t = t || 1, i = void 0 !== i ? i : 0, a = void 0 !== a ? a : 2 * Math.PI, n = void 0 !== n ? Math.max(3, n) : 8;
    var o, s, c, u = [],
        l = [],
        h = [],
        p = [],
        d = e,
        f = (t - e) / (r = void 0 !== r ? Math.max(1, r) : 1),
        m = new U,
        v = new E;
    for (s = 0; s <= r; s++) {
        for (c = 0; c <= n; c++) o = i + c / n * a, m.x = d * Math.cos(o), m.y = d * Math.sin(o), l.push(m.x, m.y, m.z), h.push(0, 0, 1), v.x = (m.x / t + 1) / 2, v.y = (m.y / t + 1) / 2, p.push(v.x, v.y);
        d += f
    }
    for (s = 0; s < r; s++) {
        var g = s * (n + 1);
        for (c = 0; c < n; c++) {
            var y = o = c + g,
                x = o + n + 1,
                b = o + n + 2,
                w = o + 1;
            u.push(y, x, w), u.push(x, b, w)
        }
    }
    this.setIndex(u), this.setAttribute("position", new gt(l, 3)), this.setAttribute("normal", new gt(h, 3)), this.setAttribute("uv", new gt(p, 2))
}

function bo(e, t, n, r) { $t.call(this), this.type = "LatheGeometry", this.parameters = { points: e, segments: t, phiStart: n, phiLength: r }, this.fromBufferGeometry(new wo(e, t, n, r)), this.mergeVertices() }

function wo(e, t, n, r) {
    Lt.call(this), this.type = "LatheBufferGeometry", this.parameters = { points: e, segments: t, phiStart: n, phiLength: r }, t = Math.floor(t) || 12, n = n || 0, r = r || 2 * Math.PI, r = T.clamp(r, 0, 2 * Math.PI);
    var i, a, o, s = [],
        c = [],
        u = [],
        l = 1 / t,
        h = new U,
        p = new E;
    for (a = 0; a <= t; a++) {
        var d = n + a * l * r,
            f = Math.sin(d),
            m = Math.cos(d);
        for (o = 0; o <= e.length - 1; o++) h.x = e[o].x * f, h.y = e[o].y, h.z = e[o].x * m, c.push(h.x, h.y, h.z), p.x = a / t, p.y = o / (e.length - 1), u.push(p.x, p.y)
    }
    for (a = 0; a < t; a++)
        for (o = 0; o < e.length - 1; o++) {
            var v = i = o + a * e.length,
                g = i + e.length,
                y = i + e.length + 1,
                x = i + 1;
            s.push(v, g, x), s.push(g, y, x)
        }
    if (this.setIndex(s), this.setAttribute("position", new gt(c, 3)), this.setAttribute("uv", new gt(u, 2)), this.computeVertexNormals(), r === 2 * Math.PI) {
        var b = this.attributes.normal.array,
            w = new U,
            _ = new U,
            M = new U;
        for (i = t * e.length * 3, a = 0, o = 0; a < e.length; a++, o += 3) w.x = b[o + 0], w.y = b[o + 1], w.z = b[o + 2], _.x = b[i + o + 0], _.y = b[i + o + 1], _.z = b[i + o + 2], M.addVectors(w, _).normalize(), b[o + 0] = b[i + o + 0] = M.x, b[o + 1] = b[i + o + 1] = M.y, b[o + 2] = b[i + o + 2] = M.z
    }
}

function _o(e, t) { $t.call(this), this.type = "ShapeGeometry", "object" === i(t) && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), t = t.curveSegments), this.parameters = { shapes: e, curveSegments: t }, this.fromBufferGeometry(new Mo(e, t)), this.mergeVertices() }

function Mo(e, t) {
    Lt.call(this), this.type = "ShapeBufferGeometry", this.parameters = { shapes: e, curveSegments: t }, t = t || 12;
    var n = [],
        r = [],
        i = [],
        a = [],
        o = 0,
        s = 0;
    if (!1 === Array.isArray(e)) u(e);
    else
        for (var c = 0; c < e.length; c++) u(e[c]), this.addGroup(o, s, c), o += s, s = 0;

    function u(e) {
        var o, c, u, l = r.length / 3,
            h = e.extractPoints(t),
            p = h.shape,
            d = h.holes;
        for (!1 === oo.isClockWise(p) && (p = p.reverse()), o = 0, c = d.length; o < c; o++) u = d[o], !0 === oo.isClockWise(u) && (d[o] = u.reverse());
        var f = oo.triangulateShape(p, d);
        for (o = 0, c = d.length; o < c; o++) u = d[o], p = p.concat(u);
        for (o = 0, c = p.length; o < c; o++) {
            var m = p[o];
            r.push(m.x, m.y, 0), i.push(0, 0, 1), a.push(m.x, m.y)
        }
        for (o = 0, c = f.length; o < c; o++) {
            var v = f[o],
                g = v[0] + l,
                y = v[1] + l,
                x = v[2] + l;
            n.push(g, y, x), s += 3
        }
    }
    this.setIndex(n), this.setAttribute("position", new gt(r, 3)), this.setAttribute("normal", new gt(i, 3)), this.setAttribute("uv", new gt(a, 2))
}

function So(e, t) {
    if (t.shapes = [], Array.isArray(e))
        for (var n = 0, r = e.length; n < r; n++) {
            var i = e[n];
            t.shapes.push(i.uuid)
        } else t.shapes.push(e.uuid);
    return t
}

function To(e, t) {
    Lt.call(this), this.type = "EdgesGeometry", this.parameters = { thresholdAngle: t }, t = void 0 !== t ? t : 1;
    var n, r, i, a, o = [],
        s = Math.cos(T.DEG2RAD * t),
        c = [0, 0],
        u = {},
        l = ["a", "b", "c"];
    e.isBufferGeometry ? (a = new $t).fromBufferGeometry(e) : a = e.clone(), a.mergeVertices(), a.computeFaceNormals();
    for (var h = a.vertices, p = a.faces, d = 0, f = p.length; d < f; d++)
        for (var m = p[d], v = 0; v < 3; v++) n = m[l[v]], r = m[l[(v + 1) % 3]], c[0] = Math.min(n, r), c[1] = Math.max(n, r), void 0 === u[i = c[0] + "," + c[1]] ? u[i] = { index1: c[0], index2: c[1], face1: d, face2: void 0 } : u[i].face2 = d;
    for (i in u) {
        var g = u[i];
        if (void 0 === g.face2 || p[g.face1].normal.dot(p[g.face2].normal) <= s) {
            var y = h[g.index1];
            o.push(y.x, y.y, y.z), y = h[g.index2], o.push(y.x, y.y, y.z)
        }
    }
    this.setAttribute("position", new gt(o, 3))
}

function Eo(e, t, n, r, i, a, o, s) { $t.call(this), this.type = "CylinderGeometry", this.parameters = { radiusTop: e, radiusBottom: t, height: n, radialSegments: r, heightSegments: i, openEnded: a, thetaStart: o, thetaLength: s }, this.fromBufferGeometry(new Ao(e, t, n, r, i, a, o, s)), this.mergeVertices() }

function Ao(e, t, n, r, i, a, o, s) {
    Lt.call(this), this.type = "CylinderBufferGeometry", this.parameters = { radiusTop: e, radiusBottom: t, height: n, radialSegments: r, heightSegments: i, openEnded: a, thetaStart: o, thetaLength: s };
    var c = this;
    e = void 0 !== e ? e : 1, t = void 0 !== t ? t : 1, n = n || 1, r = Math.floor(r) || 8, i = Math.floor(i) || 1, a = void 0 !== a && a, o = void 0 !== o ? o : 0, s = void 0 !== s ? s : 2 * Math.PI;
    var u = [],
        l = [],
        h = [],
        p = [],
        d = 0,
        f = [],
        m = n / 2,
        v = 0;

    function g(n) {
        var i, a, f, g = new E,
            y = new U,
            x = 0,
            b = !0 === n ? e : t,
            w = !0 === n ? 1 : -1;
        for (a = d, i = 1; i <= r; i++) l.push(0, m * w, 0), h.push(0, w, 0), p.push(.5, .5), d++;
        for (f = d, i = 0; i <= r; i++) {
            var _ = i / r * s + o,
                M = Math.cos(_),
                S = Math.sin(_);
            y.x = b * S, y.y = m * w, y.z = b * M, l.push(y.x, y.y, y.z), h.push(0, w, 0), g.x = .5 * M + .5, g.y = .5 * S * w + .5, p.push(g.x, g.y), d++
        }
        for (i = 0; i < r; i++) {
            var T = a + i,
                A = f + i;
            !0 === n ? u.push(A, A + 1, T) : u.push(A + 1, A, T), x += 3
        }
        c.addGroup(v, x, !0 === n ? 1 : 2), v += x
    }! function() {
        var a, g, y = new U,
            x = new U,
            b = 0,
            w = (t - e) / n;
        for (g = 0; g <= i; g++) {
            var _ = [],
                M = g / i,
                S = M * (t - e) + e;
            for (a = 0; a <= r; a++) {
                var T = a / r,
                    E = T * s + o,
                    A = Math.sin(E),
                    L = Math.cos(E);
                x.x = S * A, x.y = -M * n + m, x.z = S * L, l.push(x.x, x.y, x.z), y.set(A, w, L).normalize(), h.push(y.x, y.y, y.z), p.push(T, 1 - M), _.push(d++)
            }
            f.push(_)
        }
        for (a = 0; a < r; a++)
            for (g = 0; g < i; g++) {
                var R = f[g][a],
                    P = f[g + 1][a],
                    C = f[g + 1][a + 1],
                    O = f[g][a + 1];
                u.push(R, P, O), u.push(P, C, O), b += 6
            }
        c.addGroup(v, b, 0), v += b
    }(), !1 === a && (e > 0 && g(!0), t > 0 && g(!1)), this.setIndex(u), this.setAttribute("position", new gt(l, 3)), this.setAttribute("normal", new gt(h, 3)), this.setAttribute("uv", new gt(p, 2))
}

function Lo(e, t, n, r, i, a, o) { Eo.call(this, 0, e, t, n, r, i, a, o), this.type = "ConeGeometry", this.parameters = { radius: e, height: t, radialSegments: n, heightSegments: r, openEnded: i, thetaStart: a, thetaLength: o } }

function Ro(e, t, n, r, i, a, o) { Ao.call(this, 0, e, t, n, r, i, a, o), this.type = "ConeBufferGeometry", this.parameters = { radius: e, height: t, radialSegments: n, heightSegments: r, openEnded: i, thetaStart: a, thetaLength: o } }

function Po(e, t, n, r) { $t.call(this), this.type = "CircleGeometry", this.parameters = { radius: e, segments: t, thetaStart: n, thetaLength: r }, this.fromBufferGeometry(new Co(e, t, n, r)), this.mergeVertices() }

function Co(e, t, n, r) {
    Lt.call(this), this.type = "CircleBufferGeometry", this.parameters = { radius: e, segments: t, thetaStart: n, thetaLength: r }, e = e || 1, t = void 0 !== t ? Math.max(3, t) : 8, n = void 0 !== n ? n : 0, r = void 0 !== r ? r : 2 * Math.PI;
    var i, a, o = [],
        s = [],
        c = [],
        u = [],
        l = new U,
        h = new E;
    for (s.push(0, 0, 0), c.push(0, 0, 1), u.push(.5, .5), a = 0, i = 3; a <= t; a++, i += 3) {
        var p = n + a / t * r;
        l.x = e * Math.cos(p), l.y = e * Math.sin(p), s.push(l.x, l.y, l.z), c.push(0, 0, 1), h.x = (s[i] / e + 1) / 2, h.y = (s[i + 1] / e + 1) / 2, u.push(h.x, h.y)
    }
    for (i = 1; i <= t; i++) o.push(i, i + 1, 0);
    this.setIndex(o), this.setAttribute("position", new gt(s, 3)), this.setAttribute("normal", new gt(c, 3)), this.setAttribute("uv", new gt(u, 2))
}
fo.prototype = Object.create($t.prototype), fo.prototype.constructor = fo, mo.prototype = Object.create(lo.prototype), mo.prototype.constructor = mo, vo.prototype = Object.create($t.prototype), vo.prototype.constructor = vo, go.prototype = Object.create(Lt.prototype), go.prototype.constructor = go, yo.prototype = Object.create($t.prototype), yo.prototype.constructor = yo, xo.prototype = Object.create(Lt.prototype), xo.prototype.constructor = xo, bo.prototype = Object.create($t.prototype), bo.prototype.constructor = bo, wo.prototype = Object.create(Lt.prototype), wo.prototype.constructor = wo, _o.prototype = Object.create($t.prototype), _o.prototype.constructor = _o, _o.prototype.toJSON = function() { var e = $t.prototype.toJSON.call(this); return So(this.parameters.shapes, e) }, Mo.prototype = Object.create(Lt.prototype), Mo.prototype.constructor = Mo, Mo.prototype.toJSON = function() { var e = Lt.prototype.toJSON.call(this); return So(this.parameters.shapes, e) }, To.prototype = Object.create(Lt.prototype), To.prototype.constructor = To, Eo.prototype = Object.create($t.prototype), Eo.prototype.constructor = Eo, Ao.prototype = Object.create(Lt.prototype), Ao.prototype.constructor = Ao, Lo.prototype = Object.create(Eo.prototype), Lo.prototype.constructor = Lo, Ro.prototype = Object.create(Ao.prototype), Ro.prototype.constructor = Ro, Po.prototype = Object.create($t.prototype), Po.prototype.constructor = Po, Co.prototype = Object.create(Lt.prototype), Co.prototype.constructor = Co;
var Oo = Object.freeze({ __proto__: null, WireframeGeometry: ba, ParametricGeometry: wa, ParametricBufferGeometry: _a, TetrahedronGeometry: Ta, TetrahedronBufferGeometry: Ea, OctahedronGeometry: Aa, OctahedronBufferGeometry: La, IcosahedronGeometry: Ra, IcosahedronBufferGeometry: Pa, DodecahedronGeometry: Ca, DodecahedronBufferGeometry: Oa, PolyhedronGeometry: Ma, PolyhedronBufferGeometry: Sa, TubeGeometry: Ia, TubeBufferGeometry: Da, TorusKnotGeometry: Na, TorusKnotBufferGeometry: Fa, TorusGeometry: Ua, TorusBufferGeometry: Ba, TextGeometry: fo, TextBufferGeometry: mo, SphereGeometry: vo, SphereBufferGeometry: go, RingGeometry: yo, RingBufferGeometry: xo, PlaneGeometry: yn, PlaneBufferGeometry: xn, LatheGeometry: bo, LatheBufferGeometry: wo, ShapeGeometry: _o, ShapeBufferGeometry: Mo, ExtrudeGeometry: uo, ExtrudeBufferGeometry: lo, EdgesGeometry: To, ConeGeometry: Lo, ConeBufferGeometry: Ro, CylinderGeometry: Eo, CylinderBufferGeometry: Ao, CircleGeometry: Po, CircleBufferGeometry: Co, BoxGeometry: en, BoxBufferGeometry: tn });

function Io(e) { ot.call(this), this.type = "ShadowMaterial", this.color = new et(0), this.transparent = !0, this.setValues(e) }

function Do(e) { on.call(this, e), this.type = "RawShaderMaterial" }

function No(e) { ot.call(this), this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new et(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new et(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.vertexTangents = !1, this.setValues(e) }

function Fo(e) { No.call(this), this.defines = { STANDARD: "", PHYSICAL: "" }, this.type = "MeshPhysicalMaterial", this.clearcoat = 0, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new E(1, 1), this.clearcoatNormalMap = null, this.reflectivity = .5, this.sheen = null, this.transparency = 0, this.setValues(e) }

function Uo(e) { ot.call(this), this.type = "MeshPhongMaterial", this.color = new et(16777215), this.specular = new et(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new et(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e) }

function Bo(e) { ot.call(this), this.defines = { TOON: "" }, this.type = "MeshToonMaterial", this.color = new et(16777215), this.specular = new et(1118481), this.shininess = 30, this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new et(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e) }

function ko(e) { ot.call(this), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e) }

function zo(e) { ot.call(this), this.type = "MeshLambertMaterial", this.color = new et(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new et(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e) }

function Go(e) { ot.call(this), this.defines = { MATCAP: "" }, this.type = "MeshMatcapMaterial", this.color = new et(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new E(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e) }

function Ho(e) { Qi.call(this), this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(e) }
Io.prototype = Object.create(ot.prototype), Io.prototype.constructor = Io, Io.prototype.isShadowMaterial = !0, Io.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this }, Do.prototype = Object.create(on.prototype), Do.prototype.constructor = Do, Do.prototype.isRawShaderMaterial = !0, No.prototype = Object.create(ot.prototype), No.prototype.constructor = No, No.prototype.isMeshStandardMaterial = !0, No.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this.vertexTangents = e.vertexTangents, this }, Fo.prototype = Object.create(No.prototype), Fo.prototype.constructor = Fo, Fo.prototype.isMeshPhysicalMaterial = !0, Fo.prototype.copy = function(e) { return No.prototype.copy.call(this, e), this.defines = { STANDARD: "", PHYSICAL: "" }, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.reflectivity = e.reflectivity, e.sheen ? this.sheen = (this.sheen || new et).copy(e.sheen) : this.sheen = null, this.transparency = e.transparency, this }, Uo.prototype = Object.create(ot.prototype), Uo.prototype.constructor = Uo, Uo.prototype.isMeshPhongMaterial = !0, Uo.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this }, Bo.prototype = Object.create(ot.prototype), Bo.prototype.constructor = Bo, Bo.prototype.isMeshToonMaterial = !0, Bo.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.gradientMap = e.gradientMap, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this }, ko.prototype = Object.create(ot.prototype), ko.prototype.constructor = ko, ko.prototype.isMeshNormalMaterial = !0, ko.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this }, zo.prototype = Object.create(ot.prototype), zo.prototype.constructor = zo, zo.prototype.isMeshLambertMaterial = !0, zo.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this }, Go.prototype = Object.create(ot.prototype), Go.prototype.constructor = Go, Go.prototype.isMeshMatcapMaterial = !0, Go.prototype.copy = function(e) { return ot.prototype.copy.call(this, e), this.defines = { MATCAP: "" }, this.color.copy(e.color), this.matcap = e.matcap, this.map = e.map, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.skinning = e.skinning, this.morphTargets = e.morphTargets, this.morphNormals = e.morphNormals, this }, Ho.prototype = Object.create(Qi.prototype), Ho.prototype.constructor = Ho, Ho.prototype.isLineDashedMaterial = !0, Ho.prototype.copy = function(e) { return Qi.prototype.copy.call(this, e), this.scale = e.scale, this.dashSize = e.dashSize, this.gapSize = e.gapSize, this };
var jo = Object.freeze({ __proto__: null, ShadowMaterial: Io, SpriteMaterial: Si, RawShaderMaterial: Do, ShaderMaterial: on, PointsMaterial: ua, MeshPhysicalMaterial: Fo, MeshStandardMaterial: No, MeshPhongMaterial: Uo, MeshToonMaterial: Bo, MeshNormalMaterial: ko, MeshLambertMaterial: zo, MeshDepthMaterial: ci, MeshDistanceMaterial: ui, MeshBasicMaterial: st, MeshMatcapMaterial: Go, LineDashedMaterial: Ho, LineBasicMaterial: Qi, Material: ot }),
    Vo = {
        arraySlice: function(e, t, n) { return Vo.isTypedArray(e) ? new e.constructor(e.subarray(t, void 0 !== n ? n : e.length)) : e.slice(t, n) },
        convertArray: function(e, t, n) { return !e || !n && e.constructor === t ? e : "number" == typeof t.BYTES_PER_ELEMENT ? new t(e) : Array.prototype.slice.call(e) },
        isTypedArray: function(e) { return ArrayBuffer.isView(e) && !(e instanceof DataView) },
        getKeyframeOrder: function(e) { for (var t = e.length, n = new Array(t), r = 0; r !== t; ++r) n[r] = r; return n.sort((function(t, n) { return e[t] - e[n] })), n },
        sortedArray: function(e, t, n) {
            for (var r = e.length, i = new e.constructor(r), a = 0, o = 0; o !== r; ++a)
                for (var s = n[a] * t, c = 0; c !== t; ++c) i[o++] = e[s + c];
            return i
        },
        flattenJSON: function(e, t, n, r) {
            for (var i = 1, a = e[0]; void 0 !== a && void 0 === a[r];) a = e[i++];
            if (void 0 !== a) {
                var o = a[r];
                if (void 0 !== o)
                    if (Array.isArray(o))
                        do { void 0 !== (o = a[r]) && (t.push(a.time), n.push.apply(n, o)), a = e[i++] } while (void 0 !== a);
                    else if (void 0 !== o.toArray)
                    do { void 0 !== (o = a[r]) && (t.push(a.time), o.toArray(n, n.length)), a = e[i++] } while (void 0 !== a);
                else
                    do { void 0 !== (o = a[r]) && (t.push(a.time), n.push(o)), a = e[i++] } while (void 0 !== a)
            }
        },
        subclip: function(e, t, n, r, i) {
            i = i || 30;
            var a = e.clone();
            a.name = t;
            for (var o = [], s = 0; s < a.tracks.length; ++s) {
                for (var c = a.tracks[s], u = c.getValueSize(), l = [], h = [], p = 0; p < c.times.length; ++p) { var d = c.times[p] * i; if (!(d < n || d >= r)) { l.push(c.times[p]); for (var f = 0; f < u; ++f) h.push(c.values[p * u + f]) } }
                0 !== l.length && (c.times = Vo.convertArray(l, c.times.constructor), c.values = Vo.convertArray(h, c.values.constructor), o.push(c))
            }
            a.tracks = o;
            var m = 1 / 0;
            for (s = 0; s < a.tracks.length; ++s) m > a.tracks[s].times[0] && (m = a.tracks[s].times[0]);
            for (s = 0; s < a.tracks.length; ++s) a.tracks[s].shift(-1 * m);
            return a.resetDuration(), a
        }
    };

function Wo(e, t, n, r) { this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = void 0 !== r ? r : new t.constructor(n), this.sampleValues = t, this.valueSize = n }

function qo(e, t, n, r) { Wo.call(this, e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0 }

function Xo(e, t, n, r) { Wo.call(this, e, t, n, r) }

function Yo(e, t, n, r) { Wo.call(this, e, t, n, r) }

function Zo(e, t, n, r) {
    if (void 0 === e) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === t || 0 === t.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Vo.convertArray(t, this.TimeBufferType), this.values = Vo.convertArray(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation)
}

function Jo(e, t, n) { Zo.call(this, e, t, n) }

function Ko(e, t, n, r) { Zo.call(this, e, t, n, r) }

function Qo(e, t, n, r) { Zo.call(this, e, t, n, r) }

function $o(e, t, n, r) { Wo.call(this, e, t, n, r) }

function es(e, t, n, r) { Zo.call(this, e, t, n, r) }

function ts(e, t, n, r) { Zo.call(this, e, t, n, r) }

function ns(e, t, n, r) { Zo.call(this, e, t, n, r) }

function rs(e, t, n) { this.name = e, this.tracks = n, this.duration = void 0 !== t ? t : -1, this.uuid = T.generateUUID(), this.duration < 0 && this.resetDuration() }

function is(e) {
    if (void 0 === e.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
    var t = function(e) {
        switch (e.toLowerCase()) {
            case "scalar":
            case "double":
            case "float":
            case "number":
            case "integer":
                return Qo;
            case "vector":
            case "vector2":
            case "vector3":
            case "vector4":
                return ns;
            case "color":
                return Ko;
            case "quaternion":
                return es;
            case "bool":
            case "boolean":
                return Jo;
            case "string":
                return ts
        }
        throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e)
    }(e.type);
    if (void 0 === e.times) {
        var n = [],
            r = [];
        Vo.flattenJSON(e.keys, n, r, "value"), e.times = n, e.values = r
    }
    return void 0 !== t.parse ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation)
}
Object.assign(Wo.prototype, {
    evaluate: function(e) {
        var t = this.parameterPositions,
            n = this._cachedIndex,
            r = t[n],
            i = t[n - 1];
        e: {
            t: {
                var a;n: {
                    r: if (!(e < r)) {
                        for (var o = n + 2;;) { if (void 0 === r) { if (e < i) break r; return n = t.length, this._cachedIndex = n, this.afterEnd_(n - 1, e, i) } if (n === o) break; if (i = r, e < (r = t[++n])) break t }
                        a = t.length;
                        break n
                    }if (e >= i) break e;
                    var s = t[1];
                    for (e < s && (n = 2, i = s), o = n - 2;;) { if (void 0 === i) return this._cachedIndex = 0, this.beforeStart_(0, e, r); if (n === o) break; if (r = i, e >= (i = t[--n - 1])) break t }
                    a = n,
                    n = 0
                }
                for (; n < a;) {
                    var c = n + a >>> 1;
                    e < t[c] ? a = c : n = c + 1
                }
                if (r = t[n], void 0 === (i = t[n - 1])) return this._cachedIndex = 0, this.beforeStart_(0, e, r);
                if (void 0 === r) return n = t.length, this._cachedIndex = n, this.afterEnd_(n - 1, i, e)
            }
            this._cachedIndex = n,
            this.intervalChanged_(n, i, r)
        }
        return this.interpolate_(n, i, e, r)
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function() { return this.settings || this.DefaultSettings_ },
    copySampleValue_: function(e) { for (var t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r, a = 0; a !== r; ++a) t[a] = n[i + a]; return t },
    interpolate_: function() { throw new Error("call to abstract method") },
    intervalChanged_: function() {}
}), Object.assign(Wo.prototype, { beforeStart_: Wo.prototype.copySampleValue_, afterEnd_: Wo.prototype.copySampleValue_ }), qo.prototype = Object.assign(Object.create(Wo.prototype), {
    constructor: qo,
    DefaultSettings_: { endingStart: 2400, endingEnd: 2400 },
    intervalChanged_: function(e, t, n) {
        var r = this.parameterPositions,
            i = e - 2,
            a = e + 1,
            o = r[i],
            s = r[a];
        if (void 0 === o) switch (this.getSettings_().endingStart) {
            case 2401:
                i = e, o = 2 * t - n;
                break;
            case 2402:
                o = t + r[i = r.length - 2] - r[i + 1];
                break;
            default:
                i = e, o = n
        }
        if (void 0 === s) switch (this.getSettings_().endingEnd) {
            case 2401:
                a = e, s = 2 * n - t;
                break;
            case 2402:
                a = 1, s = n + r[1] - r[0];
                break;
            default:
                a = e - 1, s = t
        }
        var c = .5 * (n - t),
            u = this.valueSize;
        this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * u, this._offsetNext = a * u
    },
    interpolate_: function(e, t, n, r) { for (var i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, u = this._offsetPrev, l = this._offsetNext, h = this._weightPrev, p = this._weightNext, d = (n - t) / (r - t), f = d * d, m = f * d, v = -h * m + 2 * h * f - h * d, g = (1 + h) * m + (-1.5 - 2 * h) * f + (-.5 + h) * d + 1, y = (-1 - p) * m + (1.5 + p) * f + .5 * d, x = p * m - p * f, b = 0; b !== o; ++b) i[b] = v * a[u + b] + g * a[c + b] + y * a[s + b] + x * a[l + b]; return i }
}), Xo.prototype = Object.assign(Object.create(Wo.prototype), { constructor: Xo, interpolate_: function(e, t, n, r) { for (var i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, u = (n - t) / (r - t), l = 1 - u, h = 0; h !== o; ++h) i[h] = a[c + h] * l + a[s + h] * u; return i } }), Yo.prototype = Object.assign(Object.create(Wo.prototype), { constructor: Yo, interpolate_: function(e) { return this.copySampleValue_(e - 1) } }), Object.assign(Zo, {
    toJSON: function(e) {
        var t, n = e.constructor;
        if (void 0 !== n.toJSON) t = n.toJSON(e);
        else {
            t = { name: e.name, times: Vo.convertArray(e.times, Array), values: Vo.convertArray(e.values, Array) };
            var r = e.getInterpolation();
            r !== e.DefaultInterpolation && (t.interpolation = r)
        }
        return t.type = e.ValueTypeName, t
    }
}), Object.assign(Zo.prototype, {
    constructor: Zo,
    TimeBufferType: Float32Array,
    ValueBufferType: Float32Array,
    DefaultInterpolation: 2301,
    InterpolantFactoryMethodDiscrete: function(e) { return new Yo(this.times, this.values, this.getValueSize(), e) },
    InterpolantFactoryMethodLinear: function(e) { return new Xo(this.times, this.values, this.getValueSize(), e) },
    InterpolantFactoryMethodSmooth: function(e) { return new qo(this.times, this.values, this.getValueSize(), e) },
    setInterpolation: function(e) {
        var t;
        switch (e) {
            case 2300:
                t = this.InterpolantFactoryMethodDiscrete;
                break;
            case 2301:
                t = this.InterpolantFactoryMethodLinear;
                break;
            case 2302:
                t = this.InterpolantFactoryMethodSmooth
        }
        if (void 0 === t) {
            var n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
            if (void 0 === this.createInterpolant) {
                if (e === this.DefaultInterpolation) throw new Error(n);
                this.setInterpolation(this.DefaultInterpolation)
            }
            return console.warn("THREE.KeyframeTrack:", n), this
        }
        return this.createInterpolant = t, this
    },
    getInterpolation: function() {
        switch (this.createInterpolant) {
            case this.InterpolantFactoryMethodDiscrete:
                return 2300;
            case this.InterpolantFactoryMethodLinear:
                return 2301;
            case this.InterpolantFactoryMethodSmooth:
                return 2302
        }
    },
    getValueSize: function() { return this.values.length / this.times.length },
    shift: function(e) {
        if (0 !== e)
            for (var t = this.times, n = 0, r = t.length; n !== r; ++n) t[n] += e;
        return this
    },
    scale: function(e) {
        if (1 !== e)
            for (var t = this.times, n = 0, r = t.length; n !== r; ++n) t[n] *= e;
        return this
    },
    trim: function(e, t) {
        for (var n = this.times, r = n.length, i = 0, a = r - 1; i !== r && n[i] < e;) ++i;
        for (; - 1 !== a && n[a] > t;) --a;
        if (++a, 0 !== i || a !== r) {
            i >= a && (i = (a = Math.max(a, 1)) - 1);
            var o = this.getValueSize();
            this.times = Vo.arraySlice(n, i, a), this.values = Vo.arraySlice(this.values, i * o, a * o)
        }
        return this
    },
    validate: function() {
        var e = !0,
            t = this.getValueSize();
        t - Math.floor(t) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
        var n = this.times,
            r = this.values,
            i = n.length;
        0 === i && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
        for (var a = null, o = 0; o !== i; o++) {
            var s = n[o];
            if ("number" == typeof s && isNaN(s)) { console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, s), e = !1; break }
            if (null !== a && a > s) { console.error("THREE.KeyframeTrack: Out of order keys.", this, o, s, a), e = !1; break }
            a = s
        }
        if (void 0 !== r && Vo.isTypedArray(r)) { o = 0; for (var c = r.length; o !== c; ++o) { var u = r[o]; if (isNaN(u)) { console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, u), e = !1; break } } }
        return e
    },
    optimize: function() {
        for (var e = Vo.arraySlice(this.times), t = Vo.arraySlice(this.values), n = this.getValueSize(), r = 2302 === this.getInterpolation(), i = 1, a = e.length - 1, o = 1; o < a; ++o) {
            var s = !1,
                c = e[o];
            if (c !== e[o + 1] && (1 !== o || c !== c[0]))
                if (r) s = !0;
                else
                    for (var u = o * n, l = u - n, h = u + n, p = 0; p !== n; ++p) { var d = t[u + p]; if (d !== t[l + p] || d !== t[h + p]) { s = !0; break } }
            if (s) {
                if (o !== i) {
                    e[i] = e[o];
                    var f = o * n,
                        m = i * n;
                    for (p = 0; p !== n; ++p) t[m + p] = t[f + p]
                }++i
            }
        }
        if (a > 0) { for (e[i] = e[a], f = a * n, m = i * n, p = 0; p !== n; ++p) t[m + p] = t[f + p];++i }
        return i !== e.length ? (this.times = Vo.arraySlice(e, 0, i), this.values = Vo.arraySlice(t, 0, i * n)) : (this.times = e, this.values = t), this
    },
    clone: function() {
        var e = Vo.arraySlice(this.times, 0),
            t = Vo.arraySlice(this.values, 0),
            n = new(0, this.constructor)(this.name, e, t);
        return n.createInterpolant = this.createInterpolant, n
    }
}), Jo.prototype = Object.assign(Object.create(Zo.prototype), { constructor: Jo, ValueTypeName: "bool", ValueBufferType: Array, DefaultInterpolation: 2300, InterpolantFactoryMethodLinear: void 0, InterpolantFactoryMethodSmooth: void 0 }), Ko.prototype = Object.assign(Object.create(Zo.prototype), { constructor: Ko, ValueTypeName: "color" }), Qo.prototype = Object.assign(Object.create(Zo.prototype), { constructor: Qo, ValueTypeName: "number" }), $o.prototype = Object.assign(Object.create(Wo.prototype), { constructor: $o, interpolate_: function(e, t, n, r) { for (var i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = (n - t) / (r - t), u = s + o; s !== u; s += 4) D.slerpFlat(i, 0, a, s - o, a, s, c); return i } }), es.prototype = Object.assign(Object.create(Zo.prototype), { constructor: es, ValueTypeName: "quaternion", DefaultInterpolation: 2301, InterpolantFactoryMethodLinear: function(e) { return new $o(this.times, this.values, this.getValueSize(), e) }, InterpolantFactoryMethodSmooth: void 0 }), ts.prototype = Object.assign(Object.create(Zo.prototype), { constructor: ts, ValueTypeName: "string", ValueBufferType: Array, DefaultInterpolation: 2300, InterpolantFactoryMethodLinear: void 0, InterpolantFactoryMethodSmooth: void 0 }), ns.prototype = Object.assign(Object.create(Zo.prototype), { constructor: ns, ValueTypeName: "vector" }), Object.assign(rs, {
    parse: function(e) { for (var t = [], n = e.tracks, r = 1 / (e.fps || 1), i = 0, a = n.length; i !== a; ++i) t.push(is(n[i]).scale(r)); return new rs(e.name, e.duration, t) },
    toJSON: function(e) { for (var t = [], n = e.tracks, r = { name: e.name, duration: e.duration, tracks: t, uuid: e.uuid }, i = 0, a = n.length; i !== a; ++i) t.push(Zo.toJSON(n[i])); return r },
    CreateFromMorphTargetSequence: function(e, t, n, r) {
        for (var i = t.length, a = [], o = 0; o < i; o++) {
            var s = [],
                c = [];
            s.push((o + i - 1) % i, o, (o + 1) % i), c.push(0, 1, 0);
            var u = Vo.getKeyframeOrder(s);
            s = Vo.sortedArray(s, 1, u), c = Vo.sortedArray(c, 1, u), r || 0 !== s[0] || (s.push(i), c.push(c[0])), a.push(new Qo(".morphTargetInfluences[" + t[o].name + "]", s, c).scale(1 / n))
        }
        return new rs(e, -1, a)
    },
    findByName: function(e, t) {
        var n = e;
        if (!Array.isArray(e)) {
            var r = e;
            n = r.geometry && r.geometry.animations || r.animations
        }
        for (var i = 0; i < n.length; i++)
            if (n[i].name === t) return n[i];
        return null
    },
    CreateClipsFromMorphTargetSequences: function(e, t, n) {
        for (var r = {}, i = /^([\w-]*?)([\d]+)$/, a = 0, o = e.length; a < o; a++) {
            var s = e[a],
                c = s.name.match(i);
            if (c && c.length > 1) {
                var u = r[h = c[1]];
                u || (r[h] = u = []), u.push(s)
            }
        }
        var l = [];
        for (var h in r) l.push(rs.CreateFromMorphTargetSequence(h, r[h], t, n));
        return l
    },
    parseAnimation: function(e, t) {
        if (!e) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
        for (var n = function(e, t, n, r, i) {
                if (0 !== n.length) {
                    var a = [],
                        o = [];
                    Vo.flattenJSON(n, a, o, r), 0 !== a.length && i.push(new e(t, a, o))
                }
            }, r = [], i = e.name || "default", a = e.length || -1, o = e.fps || 30, s = e.hierarchy || [], c = 0; c < s.length; c++) {
            var u = s[c].keys;
            if (u && 0 !== u.length)
                if (u[0].morphTargets) {
                    for (var l = {}, h = 0; h < u.length; h++)
                        if (u[h].morphTargets)
                            for (var p = 0; p < u[h].morphTargets.length; p++) l[u[h].morphTargets[p]] = -1;
                    for (var d in l) {
                        var f = [],
                            m = [];
                        for (p = 0; p !== u[h].morphTargets.length; ++p) {
                            var v = u[h];
                            f.push(v.time), m.push(v.morphTarget === d ? 1 : 0)
                        }
                        r.push(new Qo(".morphTargetInfluence[" + d + "]", f, m))
                    }
                    a = l.length * (o || 1)
                } else {
                    var g = ".bones[" + t[c].name + "]";
                    n(ns, g + ".position", u, "pos", r), n(es, g + ".quaternion", u, "rot", r), n(ns, g + ".scale", u, "scl", r)
                }
        }
        return 0 === r.length ? null : new rs(i, a, r)
    }
}), Object.assign(rs.prototype, {
    resetDuration: function() {
        for (var e = 0, t = 0, n = this.tracks.length; t !== n; ++t) {
            var r = this.tracks[t];
            e = Math.max(e, r.times[r.times.length - 1])
        }
        return this.duration = e, this
    },
    trim: function() { for (var e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration); return this },
    validate: function() { for (var e = !0, t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate(); return e },
    optimize: function() { for (var e = 0; e < this.tracks.length; e++) this.tracks[e].optimize(); return this },
    clone: function() { for (var e = [], t = 0; t < this.tracks.length; t++) e.push(this.tracks[t].clone()); return new rs(this.name, this.duration, e) }
});
var as = { enabled: !1, files: {}, add: function(e, t) {!1 !== this.enabled && (this.files[e] = t) }, get: function(e) { if (!1 !== this.enabled) return this.files[e] }, remove: function(e) { delete this.files[e] }, clear: function() { this.files = {} } };

function os(e, t, n) {
    var r = this,
        i = !1,
        a = 0,
        o = 0,
        s = void 0,
        c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function(e) { o++, !1 === i && void 0 !== r.onStart && r.onStart(e, a, o), i = !0 }, this.itemEnd = function(e) { a++, void 0 !== r.onProgress && r.onProgress(e, a, o), a === o && (i = !1, void 0 !== r.onLoad && r.onLoad()) }, this.itemError = function(e) { void 0 !== r.onError && r.onError(e) }, this.resolveURL = function(e) { return s ? s(e) : e }, this.setURLModifier = function(e) { return s = e, this }, this.addHandler = function(e, t) { return c.push(e, t), this }, this.removeHandler = function(e) { var t = c.indexOf(e); return -1 !== t && c.splice(t, 2), this }, this.getHandler = function(e) {
        for (var t = 0, n = c.length; t < n; t += 2) {
            var r = c[t],
                i = c[t + 1];
            if (r.global && (r.lastIndex = 0), r.test(e)) return i
        }
        return null
    }
}
var ss = new os;

function cs(e) { this.manager = void 0 !== e ? e : ss, this.crossOrigin = "anonymous", this.path = "", this.resourcePath = "" }
Object.assign(cs.prototype, { load: function() {}, parse: function() {}, setCrossOrigin: function(e) { return this.crossOrigin = e, this }, setPath: function(e) { return this.path = e, this }, setResourcePath: function(e) { return this.resourcePath = e, this } });
var us = {};

function ls(e) { cs.call(this, e) }

function hs(e) { cs.call(this, e) }

function ps(e) { cs.call(this, e) }

function ds(e) { cs.call(this, e) }

function fs(e) { cs.call(this, e) }

function ms(e) { cs.call(this, e) }

function vs(e) { cs.call(this, e) }

function gs() { this.type = "Curve", this.arcLengthDivisions = 200 }

function ys(e, t, n, r, i, a, o, s) { gs.call(this), this.type = "EllipseCurve", this.aX = e || 0, this.aY = t || 0, this.xRadius = n || 1, this.yRadius = r || 1, this.aStartAngle = i || 0, this.aEndAngle = a || 2 * Math.PI, this.aClockwise = o || !1, this.aRotation = s || 0 }

function xs(e, t, n, r, i, a) { ys.call(this, e, t, n, n, r, i, a), this.type = "ArcCurve" }

function bs() {
    var e = 0,
        t = 0,
        n = 0,
        r = 0;

    function i(i, a, o, s) { e = i, t = o, n = -3 * i + 3 * a - 2 * o - s, r = 2 * i - 2 * a + o + s }
    return {
        initCatmullRom: function(e, t, n, r, a) { i(t, n, a * (n - e), a * (r - t)) },
        initNonuniformCatmullRom: function(e, t, n, r, a, o, s) {
            var c = (t - e) / a - (n - e) / (a + o) + (n - t) / o,
                u = (n - t) / o - (r - t) / (o + s) + (r - n) / s;
            i(t, n, c *= o, u *= o)
        },
        calc: function(i) { var a = i * i; return e + t * i + n * a + r * (a * i) }
    }
}
ls.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: ls,
    load: function(e, t, n, r) {
        void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
        var i = this,
            a = as.get(e);
        if (void 0 !== a) return i.manager.itemStart(e), setTimeout((function() { t && t(a), i.manager.itemEnd(e) }), 0), a;
        if (void 0 === us[e]) {
            var o = e.match(/^data:(.*?)(;base64)?,(.*)$/);
            if (o) {
                var s = o[1],
                    c = !!o[2],
                    u = o[3];
                u = decodeURIComponent(u), c && (u = atob(u));
                try {
                    var l, h = (this.responseType || "").toLowerCase();
                    switch (h) {
                        case "arraybuffer":
                        case "blob":
                            for (var p = new Uint8Array(u.length), d = 0; d < u.length; d++) p[d] = u.charCodeAt(d);
                            l = "blob" === h ? new Blob([p.buffer], { type: s }) : p.buffer;
                            break;
                        case "document":
                            var f = new DOMParser;
                            l = f.parseFromString(u, s);
                            break;
                        case "json":
                            l = JSON.parse(u);
                            break;
                        default:
                            l = u
                    }
                    setTimeout((function() { t && t(l), i.manager.itemEnd(e) }), 0)
                } catch (t) { setTimeout((function() { r && r(t), i.manager.itemError(e), i.manager.itemEnd(e) }), 0) }
            } else {
                us[e] = [], us[e].push({ onLoad: t, onProgress: n, onError: r });
                var m = new XMLHttpRequest;
                for (var v in m.open("GET", e, !0), m.addEventListener("load", (function(t) {
                        var n = this.response,
                            r = us[e];
                        if (delete us[e], 200 === this.status || 0 === this.status) {
                            0 === this.status && console.warn("THREE.FileLoader: HTTP Status 0 received."), as.add(e, n);
                            for (var a = 0, o = r.length; a < o; a++)(s = r[a]).onLoad && s.onLoad(n);
                            i.manager.itemEnd(e)
                        } else {
                            for (a = 0, o = r.length; a < o; a++) {
                                var s;
                                (s = r[a]).onError && s.onError(t)
                            }
                            i.manager.itemError(e), i.manager.itemEnd(e)
                        }
                    }), !1), m.addEventListener("progress", (function(t) {
                        for (var n = us[e], r = 0, i = n.length; r < i; r++) {
                            var a = n[r];
                            a.onProgress && a.onProgress(t)
                        }
                    }), !1), m.addEventListener("error", (function(t) {
                        var n = us[e];
                        delete us[e];
                        for (var r = 0, a = n.length; r < a; r++) {
                            var o = n[r];
                            o.onError && o.onError(t)
                        }
                        i.manager.itemError(e), i.manager.itemEnd(e)
                    }), !1), m.addEventListener("abort", (function(t) {
                        var n = us[e];
                        delete us[e];
                        for (var r = 0, a = n.length; r < a; r++) {
                            var o = n[r];
                            o.onError && o.onError(t)
                        }
                        i.manager.itemError(e), i.manager.itemEnd(e)
                    }), !1), void 0 !== this.responseType && (m.responseType = this.responseType), void 0 !== this.withCredentials && (m.withCredentials = this.withCredentials), m.overrideMimeType && m.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain"), this.requestHeader) m.setRequestHeader(v, this.requestHeader[v]);
                m.send(null)
            }
            return i.manager.itemStart(e), m
        }
        us[e].push({ onLoad: t, onProgress: n, onError: r })
    },
    setResponseType: function(e) { return this.responseType = e, this },
    setWithCredentials: function(e) { return this.withCredentials = e, this },
    setMimeType: function(e) { return this.mimeType = e, this },
    setRequestHeader: function(e) { return this.requestHeader = e, this }
}), hs.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: hs,
    load: function(e, t, n, r) {
        var i = this,
            a = new ls(i.manager);
        a.setPath(i.path), a.load(e, (function(e) { t(i.parse(JSON.parse(e))) }), n, r)
    },
    parse: function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var r = rs.parse(e[n]);
            t.push(r)
        }
        return t
    }
}), ps.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: ps,
    load: function(e, t, n, r) {
        var i = this,
            a = [],
            o = new ga;
        o.image = a;
        var s = new ls(this.manager);

        function c(c) {
            s.load(e[c], (function(e) {
                var n = i.parse(e, !0);
                a[c] = { width: n.width, height: n.height, format: n.format, mipmaps: n.mipmaps }, 6 === (u += 1) && (1 === n.mipmapCount && (o.minFilter = 1006), o.format = n.format, o.needsUpdate = !0, t && t(o))
            }), n, r)
        }
        if (s.setPath(this.path), s.setResponseType("arraybuffer"), Array.isArray(e))
            for (var u = 0, l = 0, h = e.length; l < h; ++l) c(l);
        else s.load(e, (function(e) {
            var n = i.parse(e, !0);
            if (n.isCubemap)
                for (var r = n.mipmaps.length / n.mipmapCount, s = 0; s < r; s++) { a[s] = { mipmaps: [] }; for (var c = 0; c < n.mipmapCount; c++) a[s].mipmaps.push(n.mipmaps[s * n.mipmapCount + c]), a[s].format = n.format, a[s].width = n.width, a[s].height = n.height } else o.image.width = n.width, o.image.height = n.height, o.mipmaps = n.mipmaps;
            1 === n.mipmapCount && (o.minFilter = 1006), o.format = n.format, o.needsUpdate = !0, t && t(o)
        }), n, r);
        return o
    }
}), ds.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: ds,
    load: function(e, t, n, r) {
        var i = this,
            a = new hn,
            o = new ls(this.manager);
        return o.setResponseType("arraybuffer"), o.setPath(this.path), o.load(e, (function(e) {
            var n = i.parse(e);
            n && (void 0 !== n.image ? a.image = n.image : void 0 !== n.data && (a.image.width = n.width, a.image.height = n.height, a.image.data = n.data), a.wrapS = void 0 !== n.wrapS ? n.wrapS : 1001, a.wrapT = void 0 !== n.wrapT ? n.wrapT : 1001, a.magFilter = void 0 !== n.magFilter ? n.magFilter : 1006, a.minFilter = void 0 !== n.minFilter ? n.minFilter : 1006, a.anisotropy = void 0 !== n.anisotropy ? n.anisotropy : 1, void 0 !== n.format && (a.format = n.format), void 0 !== n.type && (a.type = n.type), void 0 !== n.mipmaps && (a.mipmaps = n.mipmaps, a.minFilter = 1008), 1 === n.mipmapCount && (a.minFilter = 1006), a.needsUpdate = !0, t && t(a, n))
        }), n, r), a
    }
}), fs.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: fs,
    load: function(e, t, n, r) {
        void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
        var i = this,
            a = as.get(e);
        if (void 0 !== a) return i.manager.itemStart(e), setTimeout((function() { t && t(a), i.manager.itemEnd(e) }), 0), a;
        var o = document.createElementNS("http://www.w3.org/1999/xhtml", "img");

        function s() { o.removeEventListener("load", s, !1), o.removeEventListener("error", c, !1), as.add(e, this), t && t(this), i.manager.itemEnd(e) }

        function c(t) { o.removeEventListener("load", s, !1), o.removeEventListener("error", c, !1), r && r(t), i.manager.itemError(e), i.manager.itemEnd(e) }
        return o.addEventListener("load", s, !1), o.addEventListener("error", c, !1), "data:" !== e.substr(0, 5) && void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin), i.manager.itemStart(e), o.src = e, o
    }
}), ms.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: ms,
    load: function(e, t, n, r) {
        var i = new In,
            a = new fs(this.manager);
        a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
        var o = 0;

        function s(n) { a.load(e[n], (function(e) { i.images[n] = e, 6 == ++o && (i.needsUpdate = !0, t && t(i)) }), void 0, r) }
        for (var c = 0; c < e.length; ++c) s(c);
        return i
    }
}), vs.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: vs,
    load: function(e, t, n, r) {
        var i = new P,
            a = new fs(this.manager);
        return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, (function(n) {
            i.image = n;
            var r = e.search(/\.jpe?g($|\?)/i) > 0 || 0 === e.search(/^data\:image\/jpeg/);
            i.format = r ? 1022 : 1023, i.needsUpdate = !0, void 0 !== t && t(i)
        }), n, r), i
    }
}), Object.assign(gs.prototype, {
    getPoint: function() { return console.warn("THREE.Curve: .getPoint() not implemented."), null },
    getPointAt: function(e, t) { var n = this.getUtoTmapping(e); return this.getPoint(n, t) },
    getPoints: function(e) { void 0 === e && (e = 5); for (var t = [], n = 0; n <= e; n++) t.push(this.getPoint(n / e)); return t },
    getSpacedPoints: function(e) { void 0 === e && (e = 5); for (var t = [], n = 0; n <= e; n++) t.push(this.getPointAt(n / e)); return t },
    getLength: function() { var e = this.getLengths(); return e[e.length - 1] },
    getLengths: function(e) {
        if (void 0 === e && (e = this.arcLengthDivisions), this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
        this.needsUpdate = !1;
        var t, n, r = [],
            i = this.getPoint(0),
            a = 0;
        for (r.push(0), n = 1; n <= e; n++) a += (t = this.getPoint(n / e)).distanceTo(i), r.push(a), i = t;
        return this.cacheArcLengths = r, r
    },
    updateArcLengths: function() { this.needsUpdate = !0, this.getLengths() },
    getUtoTmapping: function(e, t) {
        var n, r = this.getLengths(),
            i = 0,
            a = r.length;
        n = t || e * r[a - 1];
        for (var o, s = 0, c = a - 1; s <= c;)
            if ((o = r[i = Math.floor(s + (c - s) / 2)] - n) < 0) s = i + 1;
            else {
                if (!(o > 0)) { c = i; break }
                c = i - 1
            }
        if (r[i = c] === n) return i / (a - 1);
        var u = r[i];
        return (i + (n - u) / (r[i + 1] - u)) / (a - 1)
    },
    getTangent: function(e) {
        var t = e - 1e-4,
            n = e + 1e-4;
        t < 0 && (t = 0), n > 1 && (n = 1);
        var r = this.getPoint(t);
        return this.getPoint(n).clone().sub(r).normalize()
    },
    getTangentAt: function(e) { var t = this.getUtoTmapping(e); return this.getTangent(t) },
    computeFrenetFrames: function(e, t) {
        var n, r, i, a = new U,
            o = [],
            s = [],
            c = [],
            u = new U,
            l = new W;
        for (n = 0; n <= e; n++) r = n / e, o[n] = this.getTangentAt(r), o[n].normalize();
        s[0] = new U, c[0] = new U;
        var h = Number.MAX_VALUE,
            p = Math.abs(o[0].x),
            d = Math.abs(o[0].y),
            f = Math.abs(o[0].z);
        for (p <= h && (h = p, a.set(1, 0, 0)), d <= h && (h = d, a.set(0, 1, 0)), f <= h && a.set(0, 0, 1), u.crossVectors(o[0], a).normalize(), s[0].crossVectors(o[0], u), c[0].crossVectors(o[0], s[0]), n = 1; n <= e; n++) s[n] = s[n - 1].clone(), c[n] = c[n - 1].clone(), u.crossVectors(o[n - 1], o[n]), u.length() > Number.EPSILON && (u.normalize(), i = Math.acos(T.clamp(o[n - 1].dot(o[n]), -1, 1)), s[n].applyMatrix4(l.makeRotationAxis(u, i))), c[n].crossVectors(o[n], s[n]);
        if (!0 === t)
            for (i = Math.acos(T.clamp(s[0].dot(s[e]), -1, 1)), i /= e, o[0].dot(u.crossVectors(s[0], s[e])) > 0 && (i = -i), n = 1; n <= e; n++) s[n].applyMatrix4(l.makeRotationAxis(o[n], i * n)), c[n].crossVectors(o[n], s[n]);
        return { tangents: o, normals: s, binormals: c }
    },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.arcLengthDivisions = e.arcLengthDivisions, this },
    toJSON: function() { var e = { metadata: { version: 4.5, type: "Curve", generator: "Curve.toJSON" } }; return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e },
    fromJSON: function(e) { return this.arcLengthDivisions = e.arcLengthDivisions, this }
}), ys.prototype = Object.create(gs.prototype), ys.prototype.constructor = ys, ys.prototype.isEllipseCurve = !0, ys.prototype.getPoint = function(e, t) {
    for (var n = t || new E, r = 2 * Math.PI, i = this.aEndAngle - this.aStartAngle, a = Math.abs(i) < Number.EPSILON; i < 0;) i += r;
    for (; i > r;) i -= r;
    i < Number.EPSILON && (i = a ? 0 : r), !0 !== this.aClockwise || a || (i === r ? i = -r : i -= r);
    var o = this.aStartAngle + e * i,
        s = this.aX + this.xRadius * Math.cos(o),
        c = this.aY + this.yRadius * Math.sin(o);
    if (0 !== this.aRotation) {
        var u = Math.cos(this.aRotation),
            l = Math.sin(this.aRotation),
            h = s - this.aX,
            p = c - this.aY;
        s = h * u - p * l + this.aX, c = h * l + p * u + this.aY
    }
    return n.set(s, c)
}, ys.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this }, ys.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e }, ys.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this }, xs.prototype = Object.create(ys.prototype), xs.prototype.constructor = xs, xs.prototype.isArcCurve = !0;
var ws = new U,
    _s = new bs,
    Ms = new bs,
    Ss = new bs;

function Ts(e, t, n, r) { gs.call(this), this.type = "CatmullRomCurve3", this.points = e || [], this.closed = t || !1, this.curveType = n || "centripetal", this.tension = r || .5 }

function Es(e, t, n, r, i) {
    var a = .5 * (r - t),
        o = .5 * (i - n),
        s = e * e;
    return (2 * n - 2 * r + a + o) * (e * s) + (-3 * n + 3 * r - 2 * a - o) * s + a * e + n
}

function As(e, t, n, r) { return function(e, t) { var n = 1 - e; return n * n * t }(e, t) + function(e, t) { return 2 * (1 - e) * e * t }(e, n) + function(e, t) { return e * e * t }(e, r) }

function Ls(e, t, n, r, i) { return function(e, t) { var n = 1 - e; return n * n * n * t }(e, t) + function(e, t) { var n = 1 - e; return 3 * n * n * e * t }(e, n) + function(e, t) { return 3 * (1 - e) * e * e * t }(e, r) + function(e, t) { return e * e * e * t }(e, i) }

function Rs(e, t, n, r) { gs.call(this), this.type = "CubicBezierCurve", this.v0 = e || new E, this.v1 = t || new E, this.v2 = n || new E, this.v3 = r || new E }

function Ps(e, t, n, r) { gs.call(this), this.type = "CubicBezierCurve3", this.v0 = e || new U, this.v1 = t || new U, this.v2 = n || new U, this.v3 = r || new U }

function Cs(e, t) { gs.call(this), this.type = "LineCurve", this.v1 = e || new E, this.v2 = t || new E }

function Os(e, t) { gs.call(this), this.type = "LineCurve3", this.v1 = e || new U, this.v2 = t || new U }

function Is(e, t, n) { gs.call(this), this.type = "QuadraticBezierCurve", this.v0 = e || new E, this.v1 = t || new E, this.v2 = n || new E }

function Ds(e, t, n) { gs.call(this), this.type = "QuadraticBezierCurve3", this.v0 = e || new U, this.v1 = t || new U, this.v2 = n || new U }

function Ns(e) { gs.call(this), this.type = "SplineCurve", this.points = e || [] }
Ts.prototype = Object.create(gs.prototype), Ts.prototype.constructor = Ts, Ts.prototype.isCatmullRomCurve3 = !0, Ts.prototype.getPoint = function(e, t) {
    var n, r, i, a, o = t || new U,
        s = this.points,
        c = s.length,
        u = (c - (this.closed ? 0 : 1)) * e,
        l = Math.floor(u),
        h = u - l;
    if (this.closed ? l += l > 0 ? 0 : (Math.floor(Math.abs(l) / c) + 1) * c : 0 === h && l === c - 1 && (l = c - 2, h = 1), this.closed || l > 0 ? n = s[(l - 1) % c] : (ws.subVectors(s[0], s[1]).add(s[0]), n = ws), r = s[l % c], i = s[(l + 1) % c], this.closed || l + 2 < c ? a = s[(l + 2) % c] : (ws.subVectors(s[c - 1], s[c - 2]).add(s[c - 1]), a = ws), "centripetal" === this.curveType || "chordal" === this.curveType) {
        var p = "chordal" === this.curveType ? .5 : .25,
            d = Math.pow(n.distanceToSquared(r), p),
            f = Math.pow(r.distanceToSquared(i), p),
            m = Math.pow(i.distanceToSquared(a), p);
        f < 1e-4 && (f = 1), d < 1e-4 && (d = f), m < 1e-4 && (m = f), _s.initNonuniformCatmullRom(n.x, r.x, i.x, a.x, d, f, m), Ms.initNonuniformCatmullRom(n.y, r.y, i.y, a.y, d, f, m), Ss.initNonuniformCatmullRom(n.z, r.z, i.z, a.z, d, f, m)
    } else "catmullrom" === this.curveType && (_s.initCatmullRom(n.x, r.x, i.x, a.x, this.tension), Ms.initCatmullRom(n.y, r.y, i.y, a.y, this.tension), Ss.initCatmullRom(n.z, r.z, i.z, a.z, this.tension));
    return o.set(_s.calc(h), Ms.calc(h), Ss.calc(h)), o
}, Ts.prototype.copy = function(e) {
    gs.prototype.copy.call(this, e), this.points = [];
    for (var t = 0, n = e.points.length; t < n; t++) {
        var r = e.points[t];
        this.points.push(r.clone())
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
}, Ts.prototype.toJSON = function() {
    var e = gs.prototype.toJSON.call(this);
    e.points = [];
    for (var t = 0, n = this.points.length; t < n; t++) {
        var r = this.points[t];
        e.points.push(r.toArray())
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e
}, Ts.prototype.fromJSON = function(e) {
    gs.prototype.fromJSON.call(this, e), this.points = [];
    for (var t = 0, n = e.points.length; t < n; t++) {
        var r = e.points[t];
        this.points.push((new U).fromArray(r))
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this
}, Rs.prototype = Object.create(gs.prototype), Rs.prototype.constructor = Rs, Rs.prototype.isCubicBezierCurve = !0, Rs.prototype.getPoint = function(e, t) {
    var n = t || new E,
        r = this.v0,
        i = this.v1,
        a = this.v2,
        o = this.v3;
    return n.set(Ls(e, r.x, i.x, a.x, o.x), Ls(e, r.y, i.y, a.y, o.y)), n
}, Rs.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this }, Rs.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e }, Rs.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this }, Ps.prototype = Object.create(gs.prototype), Ps.prototype.constructor = Ps, Ps.prototype.isCubicBezierCurve3 = !0, Ps.prototype.getPoint = function(e, t) {
    var n = t || new U,
        r = this.v0,
        i = this.v1,
        a = this.v2,
        o = this.v3;
    return n.set(Ls(e, r.x, i.x, a.x, o.x), Ls(e, r.y, i.y, a.y, o.y), Ls(e, r.z, i.z, a.z, o.z)), n
}, Ps.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this }, Ps.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e }, Ps.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this }, Cs.prototype = Object.create(gs.prototype), Cs.prototype.constructor = Cs, Cs.prototype.isLineCurve = !0, Cs.prototype.getPoint = function(e, t) { var n = t || new E; return 1 === e ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n }, Cs.prototype.getPointAt = function(e, t) { return this.getPoint(e, t) }, Cs.prototype.getTangent = function() { return this.v2.clone().sub(this.v1).normalize() }, Cs.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.v1.copy(e.v1), this.v2.copy(e.v2), this }, Cs.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e }, Cs.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this }, Os.prototype = Object.create(gs.prototype), Os.prototype.constructor = Os, Os.prototype.isLineCurve3 = !0, Os.prototype.getPoint = function(e, t) { var n = t || new U; return 1 === e ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n }, Os.prototype.getPointAt = function(e, t) { return this.getPoint(e, t) }, Os.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.v1.copy(e.v1), this.v2.copy(e.v2), this }, Os.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e }, Os.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this }, Is.prototype = Object.create(gs.prototype), Is.prototype.constructor = Is, Is.prototype.isQuadraticBezierCurve = !0, Is.prototype.getPoint = function(e, t) {
    var n = t || new E,
        r = this.v0,
        i = this.v1,
        a = this.v2;
    return n.set(As(e, r.x, i.x, a.x), As(e, r.y, i.y, a.y)), n
}, Is.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this }, Is.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e }, Is.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this }, Ds.prototype = Object.create(gs.prototype), Ds.prototype.constructor = Ds, Ds.prototype.isQuadraticBezierCurve3 = !0, Ds.prototype.getPoint = function(e, t) {
    var n = t || new U,
        r = this.v0,
        i = this.v1,
        a = this.v2;
    return n.set(As(e, r.x, i.x, a.x), As(e, r.y, i.y, a.y), As(e, r.z, i.z, a.z)), n
}, Ds.prototype.copy = function(e) { return gs.prototype.copy.call(this, e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this }, Ds.prototype.toJSON = function() { var e = gs.prototype.toJSON.call(this); return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e }, Ds.prototype.fromJSON = function(e) { return gs.prototype.fromJSON.call(this, e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this }, Ns.prototype = Object.create(gs.prototype), Ns.prototype.constructor = Ns, Ns.prototype.isSplineCurve = !0, Ns.prototype.getPoint = function(e, t) {
    var n = t || new E,
        r = this.points,
        i = (r.length - 1) * e,
        a = Math.floor(i),
        o = i - a,
        s = r[0 === a ? a : a - 1],
        c = r[a],
        u = r[a > r.length - 2 ? r.length - 1 : a + 1],
        l = r[a > r.length - 3 ? r.length - 1 : a + 2];
    return n.set(Es(o, s.x, c.x, u.x, l.x), Es(o, s.y, c.y, u.y, l.y)), n
}, Ns.prototype.copy = function(e) {
    gs.prototype.copy.call(this, e), this.points = [];
    for (var t = 0, n = e.points.length; t < n; t++) {
        var r = e.points[t];
        this.points.push(r.clone())
    }
    return this
}, Ns.prototype.toJSON = function() {
    var e = gs.prototype.toJSON.call(this);
    e.points = [];
    for (var t = 0, n = this.points.length; t < n; t++) {
        var r = this.points[t];
        e.points.push(r.toArray())
    }
    return e
}, Ns.prototype.fromJSON = function(e) {
    gs.prototype.fromJSON.call(this, e), this.points = [];
    for (var t = 0, n = e.points.length; t < n; t++) {
        var r = e.points[t];
        this.points.push((new E).fromArray(r))
    }
    return this
};
var Fs = Object.freeze({ __proto__: null, ArcCurve: xs, CatmullRomCurve3: Ts, CubicBezierCurve: Rs, CubicBezierCurve3: Ps, EllipseCurve: ys, LineCurve: Cs, LineCurve3: Os, QuadraticBezierCurve: Is, QuadraticBezierCurve3: Ds, SplineCurve: Ns });

function Us() { gs.call(this), this.type = "CurvePath", this.curves = [], this.autoClose = !1 }

function Bs(e) { Us.call(this), this.type = "Path", this.currentPoint = new E, e && this.setFromPoints(e) }

function ks(e) { Bs.call(this, e), this.uuid = T.generateUUID(), this.type = "Shape", this.holes = [] }

function zs(e, t) { ue.call(this), this.type = "Light", this.color = new et(e), this.intensity = void 0 !== t ? t : 1, this.receiveShadow = void 0 }

function Gs(e, t, n) { zs.call(this, e, n), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(ue.DefaultUp), this.updateMatrix(), this.groundColor = new et(t) }

function Hs(e) { this.camera = e, this.bias = 0, this.radius = 1, this.mapSize = new E(512, 512), this.map = null, this.mapPass = null, this.matrix = new W, this._frustum = new fn, this._frameExtents = new E(1, 1), this._viewportCount = 1, this._viewports = [new C(0, 0, 1, 1)] }

function js() { Hs.call(this, new cn(50, 1, .5, 500)) }

function Vs(e, t, n, r, i, a) { zs.call(this, e, t), this.type = "SpotLight", this.position.copy(ue.DefaultUp), this.updateMatrix(), this.target = new ue, Object.defineProperty(this, "power", { get: function() { return this.intensity * Math.PI }, set: function(e) { this.intensity = e / Math.PI } }), this.distance = void 0 !== n ? n : 0, this.angle = void 0 !== r ? r : Math.PI / 3, this.penumbra = void 0 !== i ? i : 0, this.decay = void 0 !== a ? a : 1, this.shadow = new js }

function Ws() { Hs.call(this, new cn(90, 1, .5, 500)), this._frameExtents = new E(4, 2), this._viewportCount = 6, this._viewports = [new C(2, 1, 1, 1), new C(0, 1, 1, 1), new C(3, 1, 1, 1), new C(1, 1, 1, 1), new C(3, 0, 1, 1), new C(1, 0, 1, 1)], this._cubeDirections = [new U(1, 0, 0), new U(-1, 0, 0), new U(0, 0, 1), new U(0, 0, -1), new U(0, 1, 0), new U(0, -1, 0)], this._cubeUps = [new U(0, 1, 0), new U(0, 1, 0), new U(0, 1, 0), new U(0, 1, 0), new U(0, 0, 1), new U(0, 0, -1)] }

function qs(e, t, n, r) { zs.call(this, e, t), this.type = "PointLight", Object.defineProperty(this, "power", { get: function() { return 4 * this.intensity * Math.PI }, set: function(e) { this.intensity = e / (4 * Math.PI) } }), this.distance = void 0 !== n ? n : 0, this.decay = void 0 !== r ? r : 1, this.shadow = new Ws }

function Xs(e, t, n, r, i, a) { sn.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = void 0 !== e ? e : -1, this.right = void 0 !== t ? t : 1, this.top = void 0 !== n ? n : 1, this.bottom = void 0 !== r ? r : -1, this.near = void 0 !== i ? i : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix() }

function Ys() { Hs.call(this, new Xs(-5, 5, 5, -5, .5, 500)) }

function Zs(e, t) { zs.call(this, e, t), this.type = "DirectionalLight", this.position.copy(ue.DefaultUp), this.updateMatrix(), this.target = new ue, this.shadow = new Ys }

function Js(e, t) { zs.call(this, e, t), this.type = "AmbientLight", this.castShadow = void 0 }

function Ks(e, t, n, r) { zs.call(this, e, t), this.type = "RectAreaLight", this.width = void 0 !== n ? n : 10, this.height = void 0 !== r ? r : 10 }

function Qs(e) { cs.call(this, e), this.textures = {} }
Us.prototype = Object.assign(Object.create(gs.prototype), {
    constructor: Us,
    add: function(e) { this.curves.push(e) },
    closePath: function() {
        var e = this.curves[0].getPoint(0),
            t = this.curves[this.curves.length - 1].getPoint(1);
        e.equals(t) || this.curves.push(new Cs(t, e))
    },
    getPoint: function(e) {
        for (var t = e * this.getLength(), n = this.getCurveLengths(), r = 0; r < n.length;) {
            if (n[r] >= t) {
                var i = n[r] - t,
                    a = this.curves[r],
                    o = a.getLength(),
                    s = 0 === o ? 0 : 1 - i / o;
                return a.getPointAt(s)
            }
            r++
        }
        return null
    },
    getLength: function() { var e = this.getCurveLengths(); return e[e.length - 1] },
    updateArcLengths: function() { this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths() },
    getCurveLengths: function() { if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths; for (var e = [], t = 0, n = 0, r = this.curves.length; n < r; n++) t += this.curves[n].getLength(), e.push(t); return this.cacheLengths = e, e },
    getSpacedPoints: function(e) { void 0 === e && (e = 40); for (var t = [], n = 0; n <= e; n++) t.push(this.getPoint(n / e)); return this.autoClose && t.push(t[0]), t },
    getPoints: function(e) {
        e = e || 12;
        for (var t, n = [], r = 0, i = this.curves; r < i.length; r++)
            for (var a = i[r], o = a && a.isEllipseCurve ? 2 * e : a && (a.isLineCurve || a.isLineCurve3) ? 1 : a && a.isSplineCurve ? e * a.points.length : e, s = a.getPoints(o), c = 0; c < s.length; c++) {
                var u = s[c];
                t && t.equals(u) || (n.push(u), t = u)
            }
        return this.autoClose && n.length > 1 && !n[n.length - 1].equals(n[0]) && n.push(n[0]), n
    },
    copy: function(e) {
        gs.prototype.copy.call(this, e), this.curves = [];
        for (var t = 0, n = e.curves.length; t < n; t++) {
            var r = e.curves[t];
            this.curves.push(r.clone())
        }
        return this.autoClose = e.autoClose, this
    },
    toJSON: function() {
        var e = gs.prototype.toJSON.call(this);
        e.autoClose = this.autoClose, e.curves = [];
        for (var t = 0, n = this.curves.length; t < n; t++) {
            var r = this.curves[t];
            e.curves.push(r.toJSON())
        }
        return e
    },
    fromJSON: function(e) {
        gs.prototype.fromJSON.call(this, e), this.autoClose = e.autoClose, this.curves = [];
        for (var t = 0, n = e.curves.length; t < n; t++) {
            var r = e.curves[t];
            this.curves.push((new Fs[r.type]).fromJSON(r))
        }
        return this
    }
}), Bs.prototype = Object.assign(Object.create(Us.prototype), {
    constructor: Bs,
    setFromPoints: function(e) { this.moveTo(e[0].x, e[0].y); for (var t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y); return this },
    moveTo: function(e, t) { return this.currentPoint.set(e, t), this },
    lineTo: function(e, t) { var n = new Cs(this.currentPoint.clone(), new E(e, t)); return this.curves.push(n), this.currentPoint.set(e, t), this },
    quadraticCurveTo: function(e, t, n, r) { var i = new Is(this.currentPoint.clone(), new E(e, t), new E(n, r)); return this.curves.push(i), this.currentPoint.set(n, r), this },
    bezierCurveTo: function(e, t, n, r, i, a) { var o = new Rs(this.currentPoint.clone(), new E(e, t), new E(n, r), new E(i, a)); return this.curves.push(o), this.currentPoint.set(i, a), this },
    splineThru: function(e) { var t = new Ns([this.currentPoint.clone()].concat(e)); return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this },
    arc: function(e, t, n, r, i, a) {
        var o = this.currentPoint.x,
            s = this.currentPoint.y;
        return this.absarc(e + o, t + s, n, r, i, a), this
    },
    absarc: function(e, t, n, r, i, a) { return this.absellipse(e, t, n, n, r, i, a), this },
    ellipse: function(e, t, n, r, i, a, o, s) {
        var c = this.currentPoint.x,
            u = this.currentPoint.y;
        return this.absellipse(e + c, t + u, n, r, i, a, o, s), this
    },
    absellipse: function(e, t, n, r, i, a, o, s) {
        var c = new ys(e, t, n, r, i, a, o, s);
        if (this.curves.length > 0) {
            var u = c.getPoint(0);
            u.equals(this.currentPoint) || this.lineTo(u.x, u.y)
        }
        this.curves.push(c);
        var l = c.getPoint(1);
        return this.currentPoint.copy(l), this
    },
    copy: function(e) { return Us.prototype.copy.call(this, e), this.currentPoint.copy(e.currentPoint), this },
    toJSON: function() { var e = Us.prototype.toJSON.call(this); return e.currentPoint = this.currentPoint.toArray(), e },
    fromJSON: function(e) { return Us.prototype.fromJSON.call(this, e), this.currentPoint.fromArray(e.currentPoint), this }
}), ks.prototype = Object.assign(Object.create(Bs.prototype), {
    constructor: ks,
    getPointsHoles: function(e) { for (var t = [], n = 0, r = this.holes.length; n < r; n++) t[n] = this.holes[n].getPoints(e); return t },
    extractPoints: function(e) { return { shape: this.getPoints(e), holes: this.getPointsHoles(e) } },
    copy: function(e) {
        Bs.prototype.copy.call(this, e), this.holes = [];
        for (var t = 0, n = e.holes.length; t < n; t++) {
            var r = e.holes[t];
            this.holes.push(r.clone())
        }
        return this
    },
    toJSON: function() {
        var e = Bs.prototype.toJSON.call(this);
        e.uuid = this.uuid, e.holes = [];
        for (var t = 0, n = this.holes.length; t < n; t++) {
            var r = this.holes[t];
            e.holes.push(r.toJSON())
        }
        return e
    },
    fromJSON: function(e) {
        Bs.prototype.fromJSON.call(this, e), this.uuid = e.uuid, this.holes = [];
        for (var t = 0, n = e.holes.length; t < n; t++) {
            var r = e.holes[t];
            this.holes.push((new Bs).fromJSON(r))
        }
        return this
    }
}), zs.prototype = Object.assign(Object.create(ue.prototype), { constructor: zs, isLight: !0, copy: function(e) { return ue.prototype.copy.call(this, e), this.color.copy(e.color), this.intensity = e.intensity, this }, toJSON: function(e) { var t = ue.prototype.toJSON.call(this, e); return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (t.object.distance = this.distance), void 0 !== this.angle && (t.object.angle = this.angle), void 0 !== this.decay && (t.object.decay = this.decay), void 0 !== this.penumbra && (t.object.penumbra = this.penumbra), void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()), t } }), Gs.prototype = Object.assign(Object.create(zs.prototype), { constructor: Gs, isHemisphereLight: !0, copy: function(e) { return zs.prototype.copy.call(this, e), this.groundColor.copy(e.groundColor), this } }), Object.assign(Hs.prototype, {
    _projScreenMatrix: new W,
    _lightPositionWorld: new U,
    _lookTarget: new U,
    getViewportCount: function() { return this._viewportCount },
    getFrustum: function() { return this._frustum },
    updateMatrices: function(e) {
        var t = this.camera,
            n = this.matrix,
            r = this._projScreenMatrix,
            i = this._lookTarget,
            a = this._lightPositionWorld;
        a.setFromMatrixPosition(e.matrixWorld), t.position.copy(a), i.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(i), t.updateMatrixWorld(), r.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(r), n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(t.projectionMatrix), n.multiply(t.matrixWorldInverse)
    },
    getViewport: function(e) { return this._viewports[e] },
    getFrameExtents: function() { return this._frameExtents },
    copy: function(e) { return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this },
    clone: function() { return (new this.constructor).copy(this) },
    toJSON: function() { var e = {}; return 0 !== this.bias && (e.bias = this.bias), 1 !== this.radius && (e.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e }
}), js.prototype = Object.assign(Object.create(Hs.prototype), {
    constructor: js,
    isSpotLightShadow: !0,
    updateMatrices: function(e) {
        var t = this.camera,
            n = 2 * T.RAD2DEG * e.angle,
            r = this.mapSize.width / this.mapSize.height,
            i = e.distance || t.far;
        n === t.fov && r === t.aspect && i === t.far || (t.fov = n, t.aspect = r, t.far = i, t.updateProjectionMatrix()), Hs.prototype.updateMatrices.call(this, e)
    }
}), Vs.prototype = Object.assign(Object.create(zs.prototype), { constructor: Vs, isSpotLight: !0, copy: function(e) { return zs.prototype.copy.call(this, e), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this } }), Ws.prototype = Object.assign(Object.create(Hs.prototype), {
    constructor: Ws,
    isPointLightShadow: !0,
    updateMatrices: function(e, t) {
        void 0 === t && (t = 0);
        var n = this.camera,
            r = this.matrix,
            i = this._lightPositionWorld,
            a = this._lookTarget,
            o = this._projScreenMatrix;
        i.setFromMatrixPosition(e.matrixWorld), n.position.copy(i), a.copy(n.position), a.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(a), n.updateMatrixWorld(), r.makeTranslation(-i.x, -i.y, -i.z), o.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(o)
    }
}), qs.prototype = Object.assign(Object.create(zs.prototype), { constructor: qs, isPointLight: !0, copy: function(e) { return zs.prototype.copy.call(this, e), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this } }), Xs.prototype = Object.assign(Object.create(sn.prototype), {
    constructor: Xs,
    isOrthographicCamera: !0,
    copy: function(e, t) { return sn.prototype.copy.call(this, e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = null === e.view ? null : Object.assign({}, e.view), this },
    setViewOffset: function(e, t, n, r, i, a) { null === this.view && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix() },
    clearViewOffset: function() { null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix() },
    updateProjectionMatrix: function() {
        var e = (this.right - this.left) / (2 * this.zoom),
            t = (this.top - this.bottom) / (2 * this.zoom),
            n = (this.right + this.left) / 2,
            r = (this.top + this.bottom) / 2,
            i = n - e,
            a = n + e,
            o = r + t,
            s = r - t;
        if (null !== this.view && this.view.enabled) {
            var c = (this.right - this.left) / this.view.fullWidth / this.zoom,
                u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
            a = (i += c * this.view.offsetX) + c * this.view.width, s = (o -= u * this.view.offsetY) - u * this.view.height
        }
        this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix)
    },
    toJSON: function(e) { var t = ue.prototype.toJSON.call(this, e); return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, null !== this.view && (t.object.view = Object.assign({}, this.view)), t }
}), Ys.prototype = Object.assign(Object.create(Hs.prototype), { constructor: Ys, isDirectionalLightShadow: !0, updateMatrices: function(e) { Hs.prototype.updateMatrices.call(this, e) } }), Zs.prototype = Object.assign(Object.create(zs.prototype), { constructor: Zs, isDirectionalLight: !0, copy: function(e) { return zs.prototype.copy.call(this, e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this } }), Js.prototype = Object.assign(Object.create(zs.prototype), { constructor: Js, isAmbientLight: !0 }), Ks.prototype = Object.assign(Object.create(zs.prototype), { constructor: Ks, isRectAreaLight: !0, copy: function(e) { return zs.prototype.copy.call(this, e), this.width = e.width, this.height = e.height, this }, toJSON: function(e) { var t = zs.prototype.toJSON.call(this, e); return t.object.width = this.width, t.object.height = this.height, t } }), Qs.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: Qs,
    load: function(e, t, n, r) {
        var i = this,
            a = new ls(i.manager);
        a.setPath(i.path), a.load(e, (function(e) { t(i.parse(JSON.parse(e))) }), n, r)
    },
    parse: function(e) {
        var t = this.textures;

        function n(e) { return void 0 === t[e] && console.warn("THREE.MaterialLoader: Undefined texture", e), t[e] }
        var r = new jo[e.type];
        if (void 0 !== e.uuid && (r.uuid = e.uuid), void 0 !== e.name && (r.name = e.name), void 0 !== e.color && r.color.setHex(e.color), void 0 !== e.roughness && (r.roughness = e.roughness), void 0 !== e.metalness && (r.metalness = e.metalness), void 0 !== e.sheen && (r.sheen = (new et).setHex(e.sheen)), void 0 !== e.emissive && r.emissive.setHex(e.emissive), void 0 !== e.specular && r.specular.setHex(e.specular), void 0 !== e.shininess && (r.shininess = e.shininess), void 0 !== e.clearcoat && (r.clearcoat = e.clearcoat), void 0 !== e.clearcoatRoughness && (r.clearcoatRoughness = e.clearcoatRoughness), void 0 !== e.fog && (r.fog = e.fog), void 0 !== e.flatShading && (r.flatShading = e.flatShading), void 0 !== e.blending && (r.blending = e.blending), void 0 !== e.combine && (r.combine = e.combine), void 0 !== e.side && (r.side = e.side), void 0 !== e.opacity && (r.opacity = e.opacity), void 0 !== e.transparent && (r.transparent = e.transparent), void 0 !== e.alphaTest && (r.alphaTest = e.alphaTest), void 0 !== e.depthTest && (r.depthTest = e.depthTest), void 0 !== e.depthWrite && (r.depthWrite = e.depthWrite), void 0 !== e.colorWrite && (r.colorWrite = e.colorWrite), void 0 !== e.stencilWrite && (r.stencilWrite = e.stencilWrite), void 0 !== e.stencilWriteMask && (r.stencilWriteMask = e.stencilWriteMask), void 0 !== e.stencilFunc && (r.stencilFunc = e.stencilFunc), void 0 !== e.stencilRef && (r.stencilRef = e.stencilRef), void 0 !== e.stencilFuncMask && (r.stencilFuncMask = e.stencilFuncMask), void 0 !== e.stencilFail && (r.stencilFail = e.stencilFail), void 0 !== e.stencilZFail && (r.stencilZFail = e.stencilZFail), void 0 !== e.stencilZPass && (r.stencilZPass = e.stencilZPass), void 0 !== e.wireframe && (r.wireframe = e.wireframe), void 0 !== e.wireframeLinewidth && (r.wireframeLinewidth = e.wireframeLinewidth), void 0 !== e.wireframeLinecap && (r.wireframeLinecap = e.wireframeLinecap), void 0 !== e.wireframeLinejoin && (r.wireframeLinejoin = e.wireframeLinejoin), void 0 !== e.rotation && (r.rotation = e.rotation), 1 !== e.linewidth && (r.linewidth = e.linewidth), void 0 !== e.dashSize && (r.dashSize = e.dashSize), void 0 !== e.gapSize && (r.gapSize = e.gapSize), void 0 !== e.scale && (r.scale = e.scale), void 0 !== e.polygonOffset && (r.polygonOffset = e.polygonOffset), void 0 !== e.polygonOffsetFactor && (r.polygonOffsetFactor = e.polygonOffsetFactor), void 0 !== e.polygonOffsetUnits && (r.polygonOffsetUnits = e.polygonOffsetUnits), void 0 !== e.skinning && (r.skinning = e.skinning), void 0 !== e.morphTargets && (r.morphTargets = e.morphTargets), void 0 !== e.morphNormals && (r.morphNormals = e.morphNormals), void 0 !== e.dithering && (r.dithering = e.dithering), void 0 !== e.vertexTangents && (r.vertexTangents = e.vertexTangents), void 0 !== e.visible && (r.visible = e.visible), void 0 !== e.toneMapped && (r.toneMapped = e.toneMapped), void 0 !== e.userData && (r.userData = e.userData), void 0 !== e.vertexColors && ("number" == typeof e.vertexColors ? r.vertexColors = e.vertexColors > 0 : r.vertexColors = e.vertexColors), void 0 !== e.uniforms)
            for (var i in e.uniforms) {
                var a = e.uniforms[i];
                switch (r.uniforms[i] = {}, a.type) {
                    case "t":
                        r.uniforms[i].value = n(a.value);
                        break;
                    case "c":
                        r.uniforms[i].value = (new et).setHex(a.value);
                        break;
                    case "v2":
                        r.uniforms[i].value = (new E).fromArray(a.value);
                        break;
                    case "v3":
                        r.uniforms[i].value = (new U).fromArray(a.value);
                        break;
                    case "v4":
                        r.uniforms[i].value = (new C).fromArray(a.value);
                        break;
                    case "m3":
                        r.uniforms[i].value = (new A).fromArray(a.value);
                    case "m4":
                        r.uniforms[i].value = (new W).fromArray(a.value);
                        break;
                    default:
                        r.uniforms[i].value = a.value
                }
            }
        if (void 0 !== e.defines && (r.defines = e.defines), void 0 !== e.vertexShader && (r.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (r.fragmentShader = e.fragmentShader), void 0 !== e.extensions)
            for (var o in e.extensions) r.extensions[o] = e.extensions[o];
        if (void 0 !== e.shading && (r.flatShading = 1 === e.shading), void 0 !== e.size && (r.size = e.size), void 0 !== e.sizeAttenuation && (r.sizeAttenuation = e.sizeAttenuation), void 0 !== e.map && (r.map = n(e.map)), void 0 !== e.matcap && (r.matcap = n(e.matcap)), void 0 !== e.alphaMap && (r.alphaMap = n(e.alphaMap)), void 0 !== e.bumpMap && (r.bumpMap = n(e.bumpMap)), void 0 !== e.bumpScale && (r.bumpScale = e.bumpScale), void 0 !== e.normalMap && (r.normalMap = n(e.normalMap)), void 0 !== e.normalMapType && (r.normalMapType = e.normalMapType), void 0 !== e.normalScale) { var s = e.normalScale;!1 === Array.isArray(s) && (s = [s, s]), r.normalScale = (new E).fromArray(s) }
        return void 0 !== e.displacementMap && (r.displacementMap = n(e.displacementMap)), void 0 !== e.displacementScale && (r.displacementScale = e.displacementScale), void 0 !== e.displacementBias && (r.displacementBias = e.displacementBias), void 0 !== e.roughnessMap && (r.roughnessMap = n(e.roughnessMap)), void 0 !== e.metalnessMap && (r.metalnessMap = n(e.metalnessMap)), void 0 !== e.emissiveMap && (r.emissiveMap = n(e.emissiveMap)), void 0 !== e.emissiveIntensity && (r.emissiveIntensity = e.emissiveIntensity), void 0 !== e.specularMap && (r.specularMap = n(e.specularMap)), void 0 !== e.envMap && (r.envMap = n(e.envMap)), void 0 !== e.envMapIntensity && (r.envMapIntensity = e.envMapIntensity), void 0 !== e.reflectivity && (r.reflectivity = e.reflectivity), void 0 !== e.refractionRatio && (r.refractionRatio = e.refractionRatio), void 0 !== e.lightMap && (r.lightMap = n(e.lightMap)), void 0 !== e.lightMapIntensity && (r.lightMapIntensity = e.lightMapIntensity), void 0 !== e.aoMap && (r.aoMap = n(e.aoMap)), void 0 !== e.aoMapIntensity && (r.aoMapIntensity = e.aoMapIntensity), void 0 !== e.gradientMap && (r.gradientMap = n(e.gradientMap)), void 0 !== e.clearcoatMap && (r.clearcoatMap = n(e.clearcoatMap)), void 0 !== e.clearcoatRoughnessMap && (r.clearcoatRoughnessMap = n(e.clearcoatRoughnessMap)), void 0 !== e.clearcoatNormalMap && (r.clearcoatNormalMap = n(e.clearcoatNormalMap)), void 0 !== e.clearcoatNormalScale && (r.clearcoatNormalScale = (new E).fromArray(e.clearcoatNormalScale)), r
    },
    setTextures: function(e) { return this.textures = e, this }
});
var $s = { decodeText: function(e) { if ("undefined" != typeof TextDecoder) return (new TextDecoder).decode(e); for (var t = "", n = 0, r = e.length; n < r; n++) t += String.fromCharCode(e[n]); try { return decodeURIComponent(escape(t)) } catch (e) { return t } }, extractUrlBase: function(e) { var t = e.lastIndexOf("/"); return -1 === t ? "./" : e.substr(0, t + 1) } };

function ec() { Lt.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0 }

function tc(e, t, n, r) { "number" == typeof n && (r = n, n = !1, console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")), ut.call(this, e, t, n), this.meshPerAttribute = r || 1 }

function nc(e) { cs.call(this, e) }
ec.prototype = Object.assign(Object.create(Lt.prototype), { constructor: ec, isInstancedBufferGeometry: !0, copy: function(e) { return Lt.prototype.copy.call(this, e), this.maxInstancedCount = e.maxInstancedCount, this }, clone: function() { return (new this.constructor).copy(this) }, toJSON: function() { var e = Lt.prototype.toJSON.call(this); return e.maxInstancedCount = this.maxInstancedCount, e.isInstancedBufferGeometry = !0, e } }), tc.prototype = Object.assign(Object.create(ut.prototype), { constructor: tc, isInstancedBufferAttribute: !0, copy: function(e) { return ut.prototype.copy.call(this, e), this.meshPerAttribute = e.meshPerAttribute, this }, toJSON: function() { var e = ut.prototype.toJSON.call(this); return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e } }), nc.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: nc,
    load: function(e, t, n, r) {
        var i = this,
            a = new ls(i.manager);
        a.setPath(i.path), a.load(e, (function(e) { t(i.parse(JSON.parse(e))) }), n, r)
    },
    parse: function(e) {
        var t = e.isInstancedBufferGeometry ? new ec : new Lt,
            n = e.data.index;
        if (void 0 !== n) {
            var r = new rc[n.type](n.array);
            t.setIndex(new ut(r, 1))
        }
        var i = e.data.attributes;
        for (var a in i) {
            var o = i[a],
                s = (r = new rc[o.type](o.array), new(o.isInstancedBufferAttribute ? tc : ut)(r, o.itemSize, o.normalized));
            void 0 !== o.name && (s.name = o.name), t.setAttribute(a, s)
        }
        var c = e.data.morphAttributes;
        if (c)
            for (var a in c) {
                for (var u = c[a], l = [], h = 0, p = u.length; h < p; h++) o = u[h], s = new ut(r = new rc[o.type](o.array), o.itemSize, o.normalized), void 0 !== o.name && (s.name = o.name), l.push(s);
                t.morphAttributes[a] = l
            }
        e.data.morphTargetsRelative && (t.morphTargetsRelative = !0);
        var d = e.data.groups || e.data.drawcalls || e.data.offsets;
        if (void 0 !== d) {
            h = 0;
            for (var f = d.length; h !== f; ++h) {
                var m = d[h];
                t.addGroup(m.start, m.count, m.materialIndex)
            }
        }
        var v = e.data.boundingSphere;
        if (void 0 !== v) {
            var g = new U;
            void 0 !== v.center && g.fromArray(v.center), t.boundingSphere = new Ae(g, v.radius)
        }
        return e.name && (t.name = e.name), e.userData && (t.userData = e.userData), t
    }
});
var rc = { Int8Array: Int8Array, Uint8Array: Uint8Array, Uint8ClampedArray: "undefined" != typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array, Int16Array: Int16Array, Uint16Array: Uint16Array, Int32Array: Int32Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array };

function ic(e) { cs.call(this, e) }
ic.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: ic,
    load: function(e, t, n, r) {
        var i = this,
            a = "" === this.path ? $s.extractUrlBase(e) : this.path;
        this.resourcePath = this.resourcePath || a;
        var o = new ls(i.manager);
        o.setPath(this.path), o.load(e, (function(n) {
            var a = null;
            try { a = JSON.parse(n) } catch (t) { return void 0 !== r && r(t), void console.error("THREE:ObjectLoader: Can't parse " + e + ".", t.message) }
            var o = a.metadata;
            void 0 !== o && void 0 !== o.type && "geometry" !== o.type.toLowerCase() ? i.parse(a, t) : console.error("THREE.ObjectLoader: Can't load " + e)
        }), n, r)
    },
    parse: function(e, t) {
        var n = this.parseShape(e.shapes),
            r = this.parseGeometries(e.geometries, n),
            i = this.parseImages(e.images, (function() { void 0 !== t && t(s) })),
            a = this.parseTextures(e.textures, i),
            o = this.parseMaterials(e.materials, a),
            s = this.parseObject(e.object, r, o);
        return e.animations && (s.animations = this.parseAnimations(e.animations)), void 0 !== e.images && 0 !== e.images.length || void 0 !== t && t(s), s
    },
    parseShape: function(e) {
        var t = {};
        if (void 0 !== e)
            for (var n = 0, r = e.length; n < r; n++) {
                var i = (new ks).fromJSON(e[n]);
                t[i.uuid] = i
            }
        return t
    },
    parseGeometries: function(e, t) {
        var n = {};
        if (void 0 !== e)
            for (var r = new nc, i = 0, a = e.length; i < a; i++) {
                var o, s = e[i];
                switch (s.type) {
                    case "PlaneGeometry":
                    case "PlaneBufferGeometry":
                        o = new Oo[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
                        break;
                    case "BoxGeometry":
                    case "BoxBufferGeometry":
                    case "CubeGeometry":
                        o = new Oo[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
                        break;
                    case "CircleGeometry":
                    case "CircleBufferGeometry":
                        o = new Oo[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
                        break;
                    case "CylinderGeometry":
                    case "CylinderBufferGeometry":
                        o = new Oo[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                        break;
                    case "ConeGeometry":
                    case "ConeBufferGeometry":
                        o = new Oo[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                        break;
                    case "SphereGeometry":
                    case "SphereBufferGeometry":
                        o = new Oo[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
                        break;
                    case "DodecahedronGeometry":
                    case "DodecahedronBufferGeometry":
                    case "IcosahedronGeometry":
                    case "IcosahedronBufferGeometry":
                    case "OctahedronGeometry":
                    case "OctahedronBufferGeometry":
                    case "TetrahedronGeometry":
                    case "TetrahedronBufferGeometry":
                        o = new Oo[s.type](s.radius, s.detail);
                        break;
                    case "RingGeometry":
                    case "RingBufferGeometry":
                        o = new Oo[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
                        break;
                    case "TorusGeometry":
                    case "TorusBufferGeometry":
                        o = new Oo[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
                        break;
                    case "TorusKnotGeometry":
                    case "TorusKnotBufferGeometry":
                        o = new Oo[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
                        break;
                    case "TubeGeometry":
                    case "TubeBufferGeometry":
                        o = new Oo[s.type]((new Fs[s.path.type]).fromJSON(s.path), s.tubularSegments, s.radius, s.radialSegments, s.closed);
                        break;
                    case "LatheGeometry":
                    case "LatheBufferGeometry":
                        o = new Oo[s.type](s.points, s.segments, s.phiStart, s.phiLength);
                        break;
                    case "PolyhedronGeometry":
                    case "PolyhedronBufferGeometry":
                        o = new Oo[s.type](s.vertices, s.indices, s.radius, s.details);
                        break;
                    case "ShapeGeometry":
                    case "ShapeBufferGeometry":
                        for (var c = [], u = 0, l = s.shapes.length; u < l; u++) {
                            var h = t[s.shapes[u]];
                            c.push(h)
                        }
                        o = new Oo[s.type](c, s.curveSegments);
                        break;
                    case "ExtrudeGeometry":
                    case "ExtrudeBufferGeometry":
                        for (c = [], u = 0, l = s.shapes.length; u < l; u++) h = t[s.shapes[u]], c.push(h);
                        var p = s.options.extrudePath;
                        void 0 !== p && (s.options.extrudePath = (new Fs[p.type]).fromJSON(p)), o = new Oo[s.type](c, s.options);
                        break;
                    case "BufferGeometry":
                    case "InstancedBufferGeometry":
                        o = r.parse(s);
                        break;
                    case "Geometry":
                        console.error('THREE.ObjectLoader: Loading "Geometry" is not supported anymore.');
                        break;
                    default:
                        console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');
                        continue
                }
                o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), !0 === o.isBufferGeometry && void 0 !== s.userData && (o.userData = s.userData), n[s.uuid] = o
            }
        return n
    },
    parseMaterials: function(e, t) {
        var n = {},
            r = {};
        if (void 0 !== e) {
            var i = new Qs;
            i.setTextures(t);
            for (var a = 0, o = e.length; a < o; a++) {
                var s = e[a];
                if ("MultiMaterial" === s.type) {
                    for (var c = [], u = 0; u < s.materials.length; u++) {
                        var l = s.materials[u];
                        void 0 === n[l.uuid] && (n[l.uuid] = i.parse(l)), c.push(n[l.uuid])
                    }
                    r[s.uuid] = c
                } else void 0 === n[s.uuid] && (n[s.uuid] = i.parse(s)), r[s.uuid] = n[s.uuid]
            }
        }
        return r
    },
    parseAnimations: function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var r = e[n],
                i = rs.parse(r);
            void 0 !== r.uuid && (i.uuid = r.uuid), t.push(i)
        }
        return t
    },
    parseImages: function(e, t) {
        var n = this,
            r = {};

        function i(e) { return n.manager.itemStart(e), a.load(e, (function() { n.manager.itemEnd(e) }), void 0, (function() { n.manager.itemError(e), n.manager.itemEnd(e) })) }
        if (void 0 !== e && e.length > 0) {
            var a = new fs(new os(t));
            a.setCrossOrigin(this.crossOrigin);
            for (var o = 0, s = e.length; o < s; o++) {
                var c = e[o],
                    u = c.url;
                if (Array.isArray(u)) {
                    r[c.uuid] = [];
                    for (var l = 0, h = u.length; l < h; l++) {
                        var p = u[l],
                            d = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(p) ? p : n.resourcePath + p;
                        r[c.uuid].push(i(d))
                    }
                } else d = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : n.resourcePath + c.url, r[c.uuid] = i(d)
            }
        }
        return r
    },
    parseTextures: function(e, t) {
        function n(e, t) { return "number" == typeof e ? e : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", e), t[e]) }
        var r = {};
        if (void 0 !== e)
            for (var i = 0, a = e.length; i < a; i++) {
                var o, s = e[i];
                void 0 === s.image && console.warn('THREE.ObjectLoader: No "image" specified for', s.uuid), void 0 === t[s.image] && console.warn("THREE.ObjectLoader: Undefined image", s.image), (o = Array.isArray(t[s.image]) ? new In(t[s.image]) : new P(t[s.image])).needsUpdate = !0, o.uuid = s.uuid, void 0 !== s.name && (o.name = s.name), void 0 !== s.mapping && (o.mapping = n(s.mapping, oc)), void 0 !== s.offset && o.offset.fromArray(s.offset), void 0 !== s.repeat && o.repeat.fromArray(s.repeat), void 0 !== s.center && o.center.fromArray(s.center), void 0 !== s.rotation && (o.rotation = s.rotation), void 0 !== s.wrap && (o.wrapS = n(s.wrap[0], sc), o.wrapT = n(s.wrap[1], sc)), void 0 !== s.format && (o.format = s.format), void 0 !== s.type && (o.type = s.type), void 0 !== s.encoding && (o.encoding = s.encoding), void 0 !== s.minFilter && (o.minFilter = n(s.minFilter, cc)), void 0 !== s.magFilter && (o.magFilter = n(s.magFilter, cc)), void 0 !== s.anisotropy && (o.anisotropy = s.anisotropy), void 0 !== s.flipY && (o.flipY = s.flipY), void 0 !== s.premultiplyAlpha && (o.premultiplyAlpha = s.premultiplyAlpha), void 0 !== s.unpackAlignment && (o.unpackAlignment = s.unpackAlignment), r[s.uuid] = o
            }
        return r
    },
    parseObject: function(e, t, n) {
        var r;

        function i(e) { return void 0 === t[e] && console.warn("THREE.ObjectLoader: Undefined geometry", e), t[e] }

        function a(e) {
            if (void 0 !== e) {
                if (Array.isArray(e)) {
                    for (var t = [], r = 0, i = e.length; r < i; r++) {
                        var a = e[r];
                        void 0 === n[a] && console.warn("THREE.ObjectLoader: Undefined material", a), t.push(n[a])
                    }
                    return t
                }
                return void 0 === n[e] && console.warn("THREE.ObjectLoader: Undefined material", e), n[e]
            }
        }
        switch (e.type) {
            case "Scene":
                r = new le, void 0 !== e.background && Number.isInteger(e.background) && (r.background = new et(e.background)), void 0 !== e.fog && ("Fog" === e.fog.type ? r.fog = new xi(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (r.fog = new yi(e.fog.color, e.fog.density)));
                break;
            case "PerspectiveCamera":
                r = new cn(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (r.focus = e.focus), void 0 !== e.zoom && (r.zoom = e.zoom), void 0 !== e.filmGauge && (r.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (r.filmOffset = e.filmOffset), void 0 !== e.view && (r.view = Object.assign({}, e.view));
                break;
            case "OrthographicCamera":
                r = new Xs(e.left, e.right, e.top, e.bottom, e.near, e.far), void 0 !== e.zoom && (r.zoom = e.zoom), void 0 !== e.view && (r.view = Object.assign({}, e.view));
                break;
            case "AmbientLight":
                r = new Js(e.color, e.intensity);
                break;
            case "DirectionalLight":
                r = new Zs(e.color, e.intensity);
                break;
            case "PointLight":
                r = new qs(e.color, e.intensity, e.distance, e.decay);
                break;
            case "RectAreaLight":
                r = new Ks(e.color, e.intensity, e.width, e.height);
                break;
            case "SpotLight":
                r = new Vs(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
                break;
            case "HemisphereLight":
                r = new Gs(e.color, e.groundColor, e.intensity);
                break;
            case "SkinnedMesh":
                console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");
            case "Mesh":
                r = new qt(o = i(e.geometry), s = a(e.material));
                break;
            case "InstancedMesh":
                var o = i(e.geometry),
                    s = a(e.material),
                    c = e.count,
                    u = e.instanceMatrix;
                (r = new Ki(o, s, c)).instanceMatrix = new ut(new Float32Array(u.array), 16);
                break;
            case "LOD":
                r = new Gi;
                break;
            case "Line":
                r = new ia(i(e.geometry), a(e.material), e.mode);
                break;
            case "LineLoop":
                r = new ca(i(e.geometry), a(e.material));
                break;
            case "LineSegments":
                r = new sa(i(e.geometry), a(e.material));
                break;
            case "PointCloud":
            case "Points":
                r = new fa(i(e.geometry), a(e.material));
                break;
            case "Sprite":
                r = new Ui(a(e.material));
                break;
            case "Group":
                r = new mi;
                break;
            default:
                r = new ue
        }
        if (r.uuid = e.uuid, void 0 !== e.name && (r.name = e.name), void 0 !== e.matrix ? (r.matrix.fromArray(e.matrix), void 0 !== e.matrixAutoUpdate && (r.matrixAutoUpdate = e.matrixAutoUpdate), r.matrixAutoUpdate && r.matrix.decompose(r.position, r.quaternion, r.scale)) : (void 0 !== e.position && r.position.fromArray(e.position), void 0 !== e.rotation && r.rotation.fromArray(e.rotation), void 0 !== e.quaternion && r.quaternion.fromArray(e.quaternion), void 0 !== e.scale && r.scale.fromArray(e.scale)), void 0 !== e.castShadow && (r.castShadow = e.castShadow), void 0 !== e.receiveShadow && (r.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (r.shadow.bias = e.shadow.bias), void 0 !== e.shadow.radius && (r.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && r.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (r.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (r.visible = e.visible), void 0 !== e.frustumCulled && (r.frustumCulled = e.frustumCulled), void 0 !== e.renderOrder && (r.renderOrder = e.renderOrder), void 0 !== e.userData && (r.userData = e.userData), void 0 !== e.layers && (r.layers.mask = e.layers), void 0 !== e.children)
            for (var l = e.children, h = 0; h < l.length; h++) r.add(this.parseObject(l[h], t, n));
        if ("LOD" === e.type) {
            void 0 !== e.autoUpdate && (r.autoUpdate = e.autoUpdate);
            for (var p = e.levels, d = 0; d < p.length; d++) {
                var f = p[d],
                    m = r.getObjectByProperty("uuid", f.object);
                void 0 !== m && r.addLevel(m, f.distance)
            }
        }
        return r
    }
});
var ac, oc = { UVMapping: 300, CubeReflectionMapping: 301, CubeRefractionMapping: 302, EquirectangularReflectionMapping: 303, EquirectangularRefractionMapping: 304, SphericalReflectionMapping: 305, CubeUVReflectionMapping: 306, CubeUVRefractionMapping: 307 },
    sc = { RepeatWrapping: 1e3, ClampToEdgeWrapping: 1001, MirroredRepeatWrapping: 1002 },
    cc = { NearestFilter: 1003, NearestMipmapNearestFilter: 1004, NearestMipmapLinearFilter: 1005, LinearFilter: 1006, LinearMipmapNearestFilter: 1007, LinearMipmapLinearFilter: 1008 };

function uc(e) { "undefined" == typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), "undefined" == typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), cs.call(this, e), this.options = void 0 }

function lc() { this.type = "ShapePath", this.color = new et, this.subPaths = [], this.currentPath = null }

function hc(e) { this.type = "Font", this.data = e }

function pc(e, t, n, r, i) {
    var a = i.glyphs[e] || i.glyphs["?"];
    if (a) {
        var o, s, c, u, l, h, p, d, f = new lc;
        if (a.o)
            for (var m = a._cachedOutline || (a._cachedOutline = a.o.split(" ")), v = 0, g = m.length; v < g;) switch (m[v++]) {
                case "m":
                    o = m[v++] * t + n, s = m[v++] * t + r, f.moveTo(o, s);
                    break;
                case "l":
                    o = m[v++] * t + n, s = m[v++] * t + r, f.lineTo(o, s);
                    break;
                case "q":
                    c = m[v++] * t + n, u = m[v++] * t + r, l = m[v++] * t + n, h = m[v++] * t + r, f.quadraticCurveTo(l, h, c, u);
                    break;
                case "b":
                    c = m[v++] * t + n, u = m[v++] * t + r, l = m[v++] * t + n, h = m[v++] * t + r, p = m[v++] * t + n, d = m[v++] * t + r, f.bezierCurveTo(l, h, p, d, c, u)
            }
        return { offsetX: a.ha * t, path: f }
    }
    console.error('THREE.Font: character "' + e + '" does not exists in font family ' + i.familyName + ".")
}

function dc(e) { cs.call(this, e) }
uc.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: uc,
    setOptions: function(e) { return this.options = e, this },
    load: function(e, t, n, r) {
        void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
        var i = this,
            a = as.get(e);
        if (void 0 !== a) return i.manager.itemStart(e), setTimeout((function() { t && t(a), i.manager.itemEnd(e) }), 0), a;
        fetch(e).then((function(e) { return e.blob() })).then((function(e) { return void 0 === i.options ? createImageBitmap(e) : createImageBitmap(e, i.options) })).then((function(n) { as.add(e, n), t && t(n), i.manager.itemEnd(e) })).catch((function(t) { r && r(t), i.manager.itemError(e), i.manager.itemEnd(e) })), i.manager.itemStart(e)
    }
}), Object.assign(lc.prototype, {
    moveTo: function(e, t) { return this.currentPath = new Bs, this.subPaths.push(this.currentPath), this.currentPath.moveTo(e, t), this },
    lineTo: function(e, t) { return this.currentPath.lineTo(e, t), this },
    quadraticCurveTo: function(e, t, n, r) { return this.currentPath.quadraticCurveTo(e, t, n, r), this },
    bezierCurveTo: function(e, t, n, r, i, a) { return this.currentPath.bezierCurveTo(e, t, n, r, i, a), this },
    splineThru: function(e) { return this.currentPath.splineThru(e), this },
    toShapes: function(e, t) {
        function n(e) {
            for (var t = [], n = 0, r = e.length; n < r; n++) {
                var i = e[n],
                    a = new ks;
                a.curves = i.curves, t.push(a)
            }
            return t
        }

        function r(e, t) {
            for (var n = t.length, r = !1, i = n - 1, a = 0; a < n; i = a++) {
                var o = t[i],
                    s = t[a],
                    c = s.x - o.x,
                    u = s.y - o.y;
                if (Math.abs(u) > Number.EPSILON) {
                    if (u < 0 && (o = t[a], c = -c, s = t[i], u = -u), e.y < o.y || e.y > s.y) continue;
                    if (e.y === o.y) { if (e.x === o.x) return !0 } else {
                        var l = u * (e.x - o.x) - c * (e.y - o.y);
                        if (0 === l) return !0;
                        if (l < 0) continue;
                        r = !r
                    }
                } else { if (e.y !== o.y) continue; if (s.x <= e.x && e.x <= o.x || o.x <= e.x && e.x <= s.x) return !0 }
            }
            return r
        }
        var i = oo.isClockWise,
            a = this.subPaths;
        if (0 === a.length) return [];
        if (!0 === t) return n(a);
        var o, s, c, u = [];
        if (1 === a.length) return s = a[0], (c = new ks).curves = s.curves, u.push(c), u;
        var l = !i(a[0].getPoints());
        l = e ? !l : l;
        var h, p, d = [],
            f = [],
            m = [],
            v = 0;
        f[v] = void 0, m[v] = [];
        for (var g = 0, y = a.length; g < y; g++) o = i(h = (s = a[g]).getPoints()), (o = e ? !o : o) ? (!l && f[v] && v++, f[v] = { s: new ks, p: h }, f[v].s.curves = s.curves, l && v++, m[v] = []) : m[v].push({ h: s, p: h[0] });
        if (!f[0]) return n(a);
        if (f.length > 1) {
            for (var x = !1, b = [], w = 0, _ = f.length; w < _; w++) d[w] = [];
            for (w = 0, _ = f.length; w < _; w++)
                for (var M = m[w], S = 0; S < M.length; S++) {
                    for (var T = M[S], E = !0, A = 0; A < f.length; A++) r(T.p, f[A].p) && (w !== A && b.push({ froms: w, tos: A, hole: S }), E ? (E = !1, d[A].push(T)) : x = !0);
                    E && d[w].push(T)
                }
            b.length > 0 && (x || (m = d))
        }
        g = 0;
        for (var L = f.length; g < L; g++) { c = f[g].s, u.push(c); for (var R = 0, P = (p = m[g]).length; R < P; R++) c.holes.push(p[R].h) }
        return u
    }
}), Object.assign(hc.prototype, {
    isFont: !0,
    generateShapes: function(e, t) {
        void 0 === t && (t = 100);
        for (var n = [], r = function(e, t, n) {
                for (var r = Array.from ? Array.from(e) : String(e).split(""), i = t / n.resolution, a = (n.boundingBox.yMax - n.boundingBox.yMin + n.underlineThickness) * i, o = [], s = 0, c = 0, u = 0; u < r.length; u++) {
                    var l = r[u];
                    if ("\n" === l) s = 0, c -= a;
                    else {
                        var h = pc(l, i, s, c, n);
                        s += h.offsetX, o.push(h.path)
                    }
                }
                return o
            }(e, t, this.data), i = 0, a = r.length; i < a; i++) Array.prototype.push.apply(n, r[i].toShapes());
        return n
    }
}), dc.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: dc,
    load: function(e, t, n, r) {
        var i = this,
            a = new ls(this.manager);
        a.setPath(this.path), a.load(e, (function(e) {
            var n;
            try { n = JSON.parse(e) } catch (t) { console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), n = JSON.parse(e.substring(65, e.length - 2)) }
            var r = i.parse(n);
            t && t(r)
        }), n, r)
    },
    parse: function(e) { return new hc(e) }
});
var fc = { getContext: function() { return void 0 === ac && (ac = new(window.AudioContext || window.webkitAudioContext)), ac }, setContext: function(e) { ac = e } };

function mc(e) { cs.call(this, e) }

function vc() { this.coefficients = []; for (var e = 0; e < 9; e++) this.coefficients.push(new U) }

function gc(e, t) { zs.call(this, void 0, t), this.sh = void 0 !== e ? e : new vc }

function yc(e, t, n) {
    gc.call(this, void 0, n);
    var r = (new et).set(e),
        i = (new et).set(t),
        a = new U(r.r, r.g, r.b),
        o = new U(i.r, i.g, i.b),
        s = Math.sqrt(Math.PI),
        c = s * Math.sqrt(.75);
    this.sh.coefficients[0].copy(a).add(o).multiplyScalar(s), this.sh.coefficients[1].copy(a).sub(o).multiplyScalar(c)
}

function xc(e, t) {
    gc.call(this, void 0, t);
    var n = (new et).set(e);
    this.sh.coefficients[0].set(n.r, n.g, n.b).multiplyScalar(2 * Math.sqrt(Math.PI))
}
mc.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: mc,
    load: function(e, t, n, r) {
        var i = new ls(this.manager);
        i.setResponseType("arraybuffer"), i.setPath(this.path), i.load(e, (function(e) {
            var n = e.slice(0);
            fc.getContext().decodeAudioData(n, (function(e) { t(e) }))
        }), n, r)
    }
}), Object.assign(vc.prototype, {
    isSphericalHarmonics3: !0,
    set: function(e) { for (var t = 0; t < 9; t++) this.coefficients[t].copy(e[t]); return this },
    zero: function() { for (var e = 0; e < 9; e++) this.coefficients[e].set(0, 0, 0); return this },
    getAt: function(e, t) {
        var n = e.x,
            r = e.y,
            i = e.z,
            a = this.coefficients;
        return t.copy(a[0]).multiplyScalar(.282095), t.addScaledVector(a[1], .488603 * r), t.addScaledVector(a[2], .488603 * i), t.addScaledVector(a[3], .488603 * n), t.addScaledVector(a[4], n * r * 1.092548), t.addScaledVector(a[5], r * i * 1.092548), t.addScaledVector(a[6], .315392 * (3 * i * i - 1)), t.addScaledVector(a[7], n * i * 1.092548), t.addScaledVector(a[8], .546274 * (n * n - r * r)), t
    },
    getIrradianceAt: function(e, t) {
        var n = e.x,
            r = e.y,
            i = e.z,
            a = this.coefficients;
        return t.copy(a[0]).multiplyScalar(.886227), t.addScaledVector(a[1], 1.023328 * r), t.addScaledVector(a[2], 1.023328 * i), t.addScaledVector(a[3], 1.023328 * n), t.addScaledVector(a[4], .858086 * n * r), t.addScaledVector(a[5], .858086 * r * i), t.addScaledVector(a[6], .743125 * i * i - .247708), t.addScaledVector(a[7], .858086 * n * i), t.addScaledVector(a[8], .429043 * (n * n - r * r)), t
    },
    add: function(e) { for (var t = 0; t < 9; t++) this.coefficients[t].add(e.coefficients[t]); return this },
    addScaledSH: function(e, t) { for (var n = 0; n < 9; n++) this.coefficients[n].addScaledVector(e.coefficients[n], t); return this },
    scale: function(e) { for (var t = 0; t < 9; t++) this.coefficients[t].multiplyScalar(e); return this },
    lerp: function(e, t) { for (var n = 0; n < 9; n++) this.coefficients[n].lerp(e.coefficients[n], t); return this },
    equals: function(e) {
        for (var t = 0; t < 9; t++)
            if (!this.coefficients[t].equals(e.coefficients[t])) return !1;
        return !0
    },
    copy: function(e) { return this.set(e.coefficients) },
    clone: function() { return (new this.constructor).copy(this) },
    fromArray: function(e, t) { void 0 === t && (t = 0); for (var n = this.coefficients, r = 0; r < 9; r++) n[r].fromArray(e, t + 3 * r); return this },
    toArray: function(e, t) { void 0 === e && (e = []), void 0 === t && (t = 0); for (var n = this.coefficients, r = 0; r < 9; r++) n[r].toArray(e, t + 3 * r); return e }
}), Object.assign(vc, {
    getBasisAt: function(e, t) {
        var n = e.x,
            r = e.y,
            i = e.z;
        t[0] = .282095, t[1] = .488603 * r, t[2] = .488603 * i, t[3] = .488603 * n, t[4] = 1.092548 * n * r, t[5] = 1.092548 * r * i, t[6] = .315392 * (3 * i * i - 1), t[7] = 1.092548 * n * i, t[8] = .546274 * (n * n - r * r)
    }
}), gc.prototype = Object.assign(Object.create(zs.prototype), { constructor: gc, isLightProbe: !0, copy: function(e) { return zs.prototype.copy.call(this, e), this.sh.copy(e.sh), this.intensity = e.intensity, this }, toJSON: function(e) { return zs.prototype.toJSON.call(this, e) } }), yc.prototype = Object.assign(Object.create(gc.prototype), { constructor: yc, isHemisphereLightProbe: !0, copy: function(e) { return gc.prototype.copy.call(this, e), this }, toJSON: function(e) { return gc.prototype.toJSON.call(this, e) } }), xc.prototype = Object.assign(Object.create(gc.prototype), { constructor: xc, isAmbientLightProbe: !0, copy: function(e) { return gc.prototype.copy.call(this, e), this }, toJSON: function(e) { return gc.prototype.toJSON.call(this, e) } });
var bc = new W,
    wc = new W;

function _c() { this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new cn, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new cn, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1, this._cache = { focus: null, fov: null, aspect: null, near: null, far: null, zoom: null, eyeSep: null } }

function Mc(e) { this.autoStart = void 0 === e || e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1 }
Object.assign(_c.prototype, {
    update: function(e) {
        var t = this._cache;
        if (t.focus !== e.focus || t.fov !== e.fov || t.aspect !== e.aspect * this.aspect || t.near !== e.near || t.far !== e.far || t.zoom !== e.zoom || t.eyeSep !== this.eyeSep) {
            t.focus = e.focus, t.fov = e.fov, t.aspect = e.aspect * this.aspect, t.near = e.near, t.far = e.far, t.zoom = e.zoom, t.eyeSep = this.eyeSep;
            var n, r, i = e.projectionMatrix.clone(),
                a = t.eyeSep / 2,
                o = a * t.near / t.focus,
                s = t.near * Math.tan(T.DEG2RAD * t.fov * .5) / t.zoom;
            wc.elements[12] = -a, bc.elements[12] = a, n = -s * t.aspect + o, r = s * t.aspect + o, i.elements[0] = 2 * t.near / (r - n), i.elements[8] = (r + n) / (r - n), this.cameraL.projectionMatrix.copy(i), n = -s * t.aspect - o, r = s * t.aspect - o, i.elements[0] = 2 * t.near / (r - n), i.elements[8] = (r + n) / (r - n), this.cameraR.projectionMatrix.copy(i)
        }
        this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(wc), this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(bc)
    }
}), Object.assign(Mc.prototype, {
    start: function() { this.startTime = ("undefined" == typeof performance ? Date : performance).now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0 },
    stop: function() { this.getElapsedTime(), this.running = !1, this.autoStart = !1 },
    getElapsedTime: function() { return this.getDelta(), this.elapsedTime },
    getDelta: function() {
        var e = 0;
        if (this.autoStart && !this.running) return this.start(), 0;
        if (this.running) {
            var t = ("undefined" == typeof performance ? Date : performance).now();
            e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e
        }
        return e
    }
});
var Sc = new U,
    Tc = new D,
    Ec = new U,
    Ac = new U;

function Lc() { ue.call(this), this.type = "AudioListener", this.context = fc.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null, this.timeDelta = 0, this._clock = new Mc }

function Rc(e) { ue.call(this), this.type = "Audio", this.listener = e, this.context = e.context, this.gain = this.context.createGain(), this.gain.connect(e.getInput()), this.autoplay = !1, this.buffer = null, this.detune = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.offset = 0, this.duration = void 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.sourceType = "empty", this._startedAt = 0, this._pausedAt = 0, this.filters = [] }
Lc.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: Lc,
    getInput: function() { return this.gain },
    removeFilter: function() { return null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null), this },
    getFilter: function() { return this.filter },
    setFilter: function(e) { return null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = e, this.gain.connect(this.filter), this.filter.connect(this.context.destination), this },
    getMasterVolume: function() { return this.gain.gain.value },
    setMasterVolume: function(e) { return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this },
    updateMatrixWorld: function(e) {
        ue.prototype.updateMatrixWorld.call(this, e);
        var t = this.context.listener,
            n = this.up;
        if (this.timeDelta = this._clock.getDelta(), this.matrixWorld.decompose(Sc, Tc, Ec), Ac.set(0, 0, -1).applyQuaternion(Tc), t.positionX) {
            var r = this.context.currentTime + this.timeDelta;
            t.positionX.linearRampToValueAtTime(Sc.x, r), t.positionY.linearRampToValueAtTime(Sc.y, r), t.positionZ.linearRampToValueAtTime(Sc.z, r), t.forwardX.linearRampToValueAtTime(Ac.x, r), t.forwardY.linearRampToValueAtTime(Ac.y, r), t.forwardZ.linearRampToValueAtTime(Ac.z, r), t.upX.linearRampToValueAtTime(n.x, r), t.upY.linearRampToValueAtTime(n.y, r), t.upZ.linearRampToValueAtTime(n.z, r)
        } else t.setPosition(Sc.x, Sc.y, Sc.z), t.setOrientation(Ac.x, Ac.y, Ac.z, n.x, n.y, n.z)
    }
}), Rc.prototype = Object.assign(Object.create(ue.prototype), {
    constructor: Rc,
    getOutput: function() { return this.gain },
    setNodeSource: function(e) { return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = e, this.connect(), this },
    setMediaElementSource: function(e) { return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(e), this.connect(), this },
    setMediaStreamSource: function(e) { return this.hasPlaybackControl = !1, this.sourceType = "mediaStreamNode", this.source = this.context.createMediaStreamSource(e), this.connect(), this },
    setBuffer: function(e) { return this.buffer = e, this.sourceType = "buffer", this.autoplay && this.play(), this },
    play: function(e) {
        if (void 0 === e && (e = 0), !0 !== this.isPlaying) {
            if (!1 !== this.hasPlaybackControl) { this._startedAt = this.context.currentTime + e; var t = this.context.createBufferSource(); return t.buffer = this.buffer, t.loop = this.loop, t.loopStart = this.loopStart, t.loopEnd = this.loopEnd, t.onended = this.onEnded.bind(this), t.start(this._startedAt, this._pausedAt + this.offset, this.duration), this.isPlaying = !0, this.source = t, this.setDetune(this.detune), this.setPlaybackRate(this.playbackRate), this.connect() }
            console.warn("THREE.Audio: this Audio has no playback control.")
        } else console.warn("THREE.Audio: Audio is already playing.")
    },
    pause: function() {
        if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this._pausedAt += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate, this.source.stop(), this.source.onended = null, this.isPlaying = !1), this;
        console.warn("THREE.Audio: this Audio has no playback control.")
    },
    stop: function() {
        if (!1 !== this.hasPlaybackControl) return this._pausedAt = 0, this.source.stop(), this.source.onended = null, this.isPlaying = !1, this;
        console.warn("THREE.Audio: this Audio has no playback control.")
    },
    connect: function() {
        if (this.filters.length > 0) {
            this.source.connect(this.filters[0]);
            for (var e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].connect(this.filters[e]);
            this.filters[this.filters.length - 1].connect(this.getOutput())
        } else this.source.connect(this.getOutput());
        return this
    },
    disconnect: function() {
        if (this.filters.length > 0) {
            this.source.disconnect(this.filters[0]);
            for (var e = 1, t = this.filters.length; e < t; e++) this.filters[e - 1].disconnect(this.filters[e]);
            this.filters[this.filters.length - 1].disconnect(this.getOutput())
        } else this.source.disconnect(this.getOutput());
        return this
    },
    getFilters: function() { return this.filters },
    setFilters: function(e) { return e || (e = []), !0 === this.isPlaying ? (this.disconnect(), this.filters = e, this.connect()) : this.filters = e, this },
    setDetune: function(e) { if (this.detune = e, void 0 !== this.source.detune) return !0 === this.isPlaying && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01), this },
    getDetune: function() { return this.detune },
    getFilter: function() { return this.getFilters()[0] },
    setFilter: function(e) { return this.setFilters(e ? [e] : []) },
    setPlaybackRate: function(e) {
        if (!1 !== this.hasPlaybackControl) return this.playbackRate = e, !0 === this.isPlaying && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01), this;
        console.warn("THREE.Audio: this Audio has no playback control.")
    },
    getPlaybackRate: function() { return this.playbackRate },
    onEnded: function() { this.isPlaying = !1 },
    getLoop: function() { return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop },
    setLoop: function(e) {
        if (!1 !== this.hasPlaybackControl) return this.loop = e, !0 === this.isPlaying && (this.source.loop = this.loop), this;
        console.warn("THREE.Audio: this Audio has no playback control.")
    },
    setLoopStart: function(e) { return this.loopStart = e, this },
    setLoopEnd: function(e) { return this.loopEnd = e, this },
    getVolume: function() { return this.gain.gain.value },
    setVolume: function(e) { return this.gain.gain.setTargetAtTime(e, this.context.currentTime, .01), this }
});
var Pc = new U,
    Cc = new D,
    Oc = new U,
    Ic = new U;

function Dc(e) { Rc.call(this, e), this.panner = this.context.createPanner(), this.panner.panningModel = "HRTF", this.panner.connect(this.gain) }

function Nc(e, t) { this.analyser = e.context.createAnalyser(), this.analyser.fftSize = void 0 !== t ? t : 2048, this.data = new Uint8Array(this.analyser.frequencyBinCount), e.getOutput().connect(this.analyser) }

function Fc(e, t, n) {
    this.binding = e, this.valueSize = n;
    var r, i = Float64Array;
    switch (t) {
        case "quaternion":
            r = this._slerp;
            break;
        case "string":
        case "bool":
            i = Array, r = this._select;
            break;
        default:
            r = this._lerp
    }
    this.buffer = new i(4 * n), this._mixBufferRegion = r, this.cumulativeWeight = 0, this.useCount = 0, this.referenceCount = 0
}
Dc.prototype = Object.assign(Object.create(Rc.prototype), {
    constructor: Dc,
    getOutput: function() { return this.panner },
    getRefDistance: function() { return this.panner.refDistance },
    setRefDistance: function(e) { return this.panner.refDistance = e, this },
    getRolloffFactor: function() { return this.panner.rolloffFactor },
    setRolloffFactor: function(e) { return this.panner.rolloffFactor = e, this },
    getDistanceModel: function() { return this.panner.distanceModel },
    setDistanceModel: function(e) { return this.panner.distanceModel = e, this },
    getMaxDistance: function() { return this.panner.maxDistance },
    setMaxDistance: function(e) { return this.panner.maxDistance = e, this },
    setDirectionalCone: function(e, t, n) { return this.panner.coneInnerAngle = e, this.panner.coneOuterAngle = t, this.panner.coneOuterGain = n, this },
    updateMatrixWorld: function(e) {
        if (ue.prototype.updateMatrixWorld.call(this, e), !0 !== this.hasPlaybackControl || !1 !== this.isPlaying) {
            this.matrixWorld.decompose(Pc, Cc, Oc), Ic.set(0, 0, 1).applyQuaternion(Cc);
            var t = this.panner;
            if (t.positionX) {
                var n = this.context.currentTime + this.listener.timeDelta;
                t.positionX.linearRampToValueAtTime(Pc.x, n), t.positionY.linearRampToValueAtTime(Pc.y, n), t.positionZ.linearRampToValueAtTime(Pc.z, n), t.orientationX.linearRampToValueAtTime(Ic.x, n), t.orientationY.linearRampToValueAtTime(Ic.y, n), t.orientationZ.linearRampToValueAtTime(Ic.z, n)
            } else t.setPosition(Pc.x, Pc.y, Pc.z), t.setOrientation(Ic.x, Ic.y, Ic.z)
        }
    }
}), Object.assign(Nc.prototype, { getFrequencyData: function() { return this.analyser.getByteFrequencyData(this.data), this.data }, getAverageFrequency: function() { for (var e = 0, t = this.getFrequencyData(), n = 0; n < t.length; n++) e += t[n]; return e / t.length } }), Object.assign(Fc.prototype, {
    accumulate: function(e, t) {
        var n = this.buffer,
            r = this.valueSize,
            i = e * r + r,
            a = this.cumulativeWeight;
        if (0 === a) {
            for (var o = 0; o !== r; ++o) n[i + o] = n[o];
            a = t
        } else {
            var s = t / (a += t);
            this._mixBufferRegion(n, i, 0, s, r)
        }
        this.cumulativeWeight = a
    },
    apply: function(e) {
        var t = this.valueSize,
            n = this.buffer,
            r = e * t + t,
            i = this.cumulativeWeight,
            a = this.binding;
        if (this.cumulativeWeight = 0, i < 1) {
            var o = 3 * t;
            this._mixBufferRegion(n, r, o, 1 - i, t)
        }
        for (var s = t, c = t + t; s !== c; ++s)
            if (n[s] !== n[s + t]) { a.setValue(n, r); break }
    },
    saveOriginalState: function() {
        var e = this.binding,
            t = this.buffer,
            n = this.valueSize,
            r = 3 * n;
        e.getValue(t, r);
        for (var i = n, a = r; i !== a; ++i) t[i] = t[r + i % n];
        this.cumulativeWeight = 0
    },
    restoreOriginalState: function() {
        var e = 3 * this.valueSize;
        this.binding.setValue(this.buffer, e)
    },
    _select: function(e, t, n, r, i) {
        if (r >= .5)
            for (var a = 0; a !== i; ++a) e[t + a] = e[n + a]
    },
    _slerp: function(e, t, n, r) { D.slerpFlat(e, t, e, t, e, n, r) },
    _lerp: function(e, t, n, r, i) {
        for (var a = 1 - r, o = 0; o !== i; ++o) {
            var s = t + o;
            e[s] = e[s] * a + e[n + o] * r
        }
    }
});
var Uc = new RegExp("[\\[\\]\\.:\\/]", "g"),
    Bc = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]",
    kc = /((?:WC+[\/:])*)/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
    zc = /(WCOD+)?/.source.replace("WCOD", Bc),
    Gc = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
    Hc = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
    jc = new RegExp("^" + kc + zc + Gc + Hc + "$"),
    Vc = ["material", "materials", "bones"];

function Wc(e, t, n) {
    var r = n || qc.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, r)
}

function qc(e, t, n) { this.path = t, this.parsedPath = n || qc.parseTrackName(t), this.node = qc.findNode(e, this.parsedPath.nodeName) || e, this.rootNode = e }

function Xc() {
    var e = arguments;
    this.uuid = T.generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
    var t = {};
    this._indicesByUUID = t;
    for (var n = 0, r = arguments.length; n !== r; ++n) t[e[n].uuid] = n;
    this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
    var i = this;
    this.stats = { objects: {get total() { return i._objects.length }, get inUse() { return this.total - i.nCachedObjects_ } }, get bindingsPerObject() { return i._bindings.length } }
}

function Yc(e, t, n) {
    this._mixer = e, this._clip = t, this._localRoot = n || null;
    for (var r = t.tracks, i = r.length, a = new Array(i), o = { endingStart: 2400, endingEnd: 2400 }, s = 0; s !== i; ++s) {
        var c = r[s].createInterpolant(null);
        a[s] = c, c.settings = o
    }
    this._interpolantSettings = o, this._interpolants = a, this._propertyBindings = new Array(i), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = 2201, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
}

function Zc(e) { this._root = e, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1 }

function Jc(e) { "string" == typeof e && (console.warn("THREE.Uniform: Type parameter is no longer needed."), e = arguments[1]), this.value = e }

function Kc(e, t, n) { bi.call(this, e, t), this.meshPerAttribute = n || 1 }

function Qc(e, t, n, r) { this.ray = new Ne(e, t), this.near = n || 0, this.far = r || 1 / 0, this.camera = null, this.layers = new Z, this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} }, Object.defineProperties(this.params, { PointCloud: { get: function() { return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points } } }) }

function $c(e, t) { return e.distance - t.distance }

function eu(e, t, n, r) {
    if (e.layers.test(t.layers) && e.raycast(t, n), !0 === r)
        for (var i = e.children, a = 0, o = i.length; a < o; a++) eu(i[a], t, n, !0)
}

function tu(e, t, n) { return this.radius = void 0 !== e ? e : 1, this.phi = void 0 !== t ? t : 0, this.theta = void 0 !== n ? n : 0, this }

function nu(e, t, n) { return this.radius = void 0 !== e ? e : 1, this.theta = void 0 !== t ? t : 0, this.y = void 0 !== n ? n : 0, this }
Object.assign(Wc.prototype, {
    getValue: function(e, t) {
        this.bind();
        var n = this._targetGroup.nCachedObjects_,
            r = this._bindings[n];
        void 0 !== r && r.getValue(e, t)
    },
    setValue: function(e, t) { for (var n = this._bindings, r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t) },
    bind: function() { for (var e = this._bindings, t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind() },
    unbind: function() { for (var e = this._bindings, t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind() }
}), Object.assign(qc, {
    Composite: Wc,
    create: function(e, t, n) { return e && e.isAnimationObjectGroup ? new qc.Composite(e, t, n) : new qc(e, t, n) },
    sanitizeNodeName: function(e) { return e.replace(/\s/g, "_").replace(Uc, "") },
    parseTrackName: function(e) {
        var t = jc.exec(e);
        if (!t) throw new Error("PropertyBinding: Cannot parse trackName: " + e);
        var n = { nodeName: t[2], objectName: t[3], objectIndex: t[4], propertyName: t[5], propertyIndex: t[6] },
            r = n.nodeName && n.nodeName.lastIndexOf(".");
        if (void 0 !== r && -1 !== r) { var i = n.nodeName.substring(r + 1); - 1 !== Vc.indexOf(i) && (n.nodeName = n.nodeName.substring(0, r), n.objectName = i) }
        if (null === n.propertyName || 0 === n.propertyName.length) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
        return n
    },
    findNode: function(e, t) { if (!t || "" === t || "." === t || -1 === t || t === e.name || t === e.uuid) return e; if (e.skeleton) { var n = e.skeleton.getBoneByName(t); if (void 0 !== n) return n } if (e.children) { var r = function e(n) { for (var r = 0; r < n.length; r++) { var i = n[r]; if (i.name === t || i.uuid === t) return i; var a = e(i.children); if (a) return a } return null }(e.children); if (r) return r } return null }
}), Object.assign(qc.prototype, {
    _getValue_unavailable: function() {},
    _setValue_unavailable: function() {},
    BindingType: { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 },
    Versioning: { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 },
    GetterByBindingType: [function(e, t) { e[t] = this.node[this.propertyName] }, function(e, t) { for (var n = this.resolvedProperty, r = 0, i = n.length; r !== i; ++r) e[t++] = n[r] }, function(e, t) { e[t] = this.resolvedProperty[this.propertyIndex] }, function(e, t) { this.resolvedProperty.toArray(e, t) }],
    SetterByBindingTypeAndVersioning: [
        [function(e, t) { this.targetObject[this.propertyName] = e[t] }, function(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0 }, function(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 }],
        [function(e, t) { for (var n = this.resolvedProperty, r = 0, i = n.length; r !== i; ++r) n[r] = e[t++] }, function(e, t) {
            for (var n = this.resolvedProperty, r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
            this.targetObject.needsUpdate = !0
        }, function(e, t) {
            for (var n = this.resolvedProperty, r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
            this.targetObject.matrixWorldNeedsUpdate = !0
        }],
        [function(e, t) { this.resolvedProperty[this.propertyIndex] = e[t] }, function(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0 }, function(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 }],
        [function(e, t) { this.resolvedProperty.fromArray(e, t) }, function(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0 }, function(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0 }]
    ],
    getValue: function(e, t) { this.bind(), this.getValue(e, t) },
    setValue: function(e, t) { this.bind(), this.setValue(e, t) },
    bind: function() {
        var e = this.node,
            t = this.parsedPath,
            n = t.objectName,
            r = t.propertyName,
            i = t.propertyIndex;
        if (e || (e = qc.findNode(this.rootNode, t.nodeName) || this.rootNode, this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, e) {
            if (n) {
                var a = t.objectIndex;
                switch (n) {
                    case "materials":
                        if (!e.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                        if (!e.material.materials) return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                        e = e.material.materials;
                        break;
                    case "bones":
                        if (!e.skeleton) return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                        e = e.skeleton.bones;
                        for (var o = 0; o < e.length; o++)
                            if (e[o].name === a) { a = o; break }
                        break;
                    default:
                        if (void 0 === e[n]) return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
                        e = e[n]
                }
                if (void 0 !== a) {
                    if (void 0 === e[a]) return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
                    e = e[a]
                }
            }
            var s = e[r];
            if (void 0 !== s) {
                var c = this.Versioning.None;
                this.targetObject = e, void 0 !== e.needsUpdate ? c = this.Versioning.NeedsUpdate : void 0 !== e.matrixWorldNeedsUpdate && (c = this.Versioning.MatrixWorldNeedsUpdate);
                var u = this.BindingType.Direct;
                if (void 0 !== i) {
                    if ("morphTargetInfluences" === r) {
                        if (!e.geometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                        if (e.geometry.isBufferGeometry) {
                            if (!e.geometry.morphAttributes) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                            for (o = 0; o < this.node.geometry.morphAttributes.position.length; o++)
                                if (e.geometry.morphAttributes.position[o].name === i) { i = o; break }
                        } else {
                            if (!e.geometry.morphTargets) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.", this);
                            for (o = 0; o < this.node.geometry.morphTargets.length; o++)
                                if (e.geometry.morphTargets[o].name === i) { i = o; break }
                        }
                    }
                    u = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = i
                } else void 0 !== s.fromArray && void 0 !== s.toArray ? (u = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (u = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = r;
                this.getValue = this.GetterByBindingType[u], this.setValue = this.SetterByBindingTypeAndVersioning[u][c]
            } else {
                var l = t.nodeName;
                console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + r + " but it wasn't found.", e)
            }
        } else console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.")
    },
    unbind: function() { this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound }
}), Object.assign(qc.prototype, { _getValue_unbound: qc.prototype.getValue, _setValue_unbound: qc.prototype.setValue }), Object.assign(Xc.prototype, {
    isAnimationObjectGroup: !0,
    add: function() {
        for (var e = arguments, t = this._objects, n = t.length, r = this.nCachedObjects_, i = this._indicesByUUID, a = this._paths, o = this._parsedPaths, s = this._bindings, c = s.length, u = void 0, l = 0, h = arguments.length; l !== h; ++l) {
            var p = e[l],
                d = p.uuid,
                f = i[d];
            if (void 0 === f) { f = n++, i[d] = f, t.push(p); for (var m = 0, v = c; m !== v; ++m) s[m].push(new qc(p, a[m], o[m])) } else if (f < r) {
                u = t[f];
                var g = --r,
                    y = t[g];
                for (i[y.uuid] = f, t[f] = y, i[d] = g, t[g] = p, m = 0, v = c; m !== v; ++m) {
                    var x = s[m],
                        b = x[g],
                        w = x[f];
                    x[f] = b, void 0 === w && (w = new qc(p, a[m], o[m])), x[g] = w
                }
            } else t[f] !== u && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")
        }
        this.nCachedObjects_ = r
    },
    remove: function() {
        for (var e = arguments, t = this._objects, n = this.nCachedObjects_, r = this._indicesByUUID, i = this._bindings, a = i.length, o = 0, s = arguments.length; o !== s; ++o) {
            var c = e[o],
                u = c.uuid,
                l = r[u];
            if (void 0 !== l && l >= n) {
                var h = n++,
                    p = t[h];
                r[p.uuid] = l, t[l] = p, r[u] = h, t[h] = c;
                for (var d = 0, f = a; d !== f; ++d) {
                    var m = i[d],
                        v = m[h],
                        g = m[l];
                    m[l] = v, m[h] = g
                }
            }
        }
        this.nCachedObjects_ = n
    },
    uncache: function() {
        for (var e = arguments, t = this._objects, n = t.length, r = this.nCachedObjects_, i = this._indicesByUUID, a = this._bindings, o = a.length, s = 0, c = arguments.length; s !== c; ++s) {
            var u = e[s],
                l = u.uuid,
                h = i[l];
            if (void 0 !== h)
                if (delete i[l], h < r) {
                    var p = --r,
                        d = t[p],
                        f = t[x = --n];
                    i[d.uuid] = h, t[h] = d, i[f.uuid] = p, t[p] = f, t.pop();
                    for (var m = 0, v = o; m !== v; ++m) {
                        var g = (b = a[m])[p],
                            y = b[x];
                        b[h] = g, b[p] = y, b.pop()
                    }
                } else {
                    var x;
                    for (i[(f = t[x = --n]).uuid] = h, t[h] = f, t.pop(), m = 0, v = o; m !== v; ++m) {
                        var b;
                        (b = a[m])[h] = b[x], b.pop()
                    }
                }
        }
        this.nCachedObjects_ = r
    },
    subscribe_: function(e, t) {
        var n = this._bindingsIndicesByPath,
            r = n[e],
            i = this._bindings;
        if (void 0 !== r) return i[r];
        var a = this._paths,
            o = this._parsedPaths,
            s = this._objects,
            c = s.length,
            u = this.nCachedObjects_,
            l = new Array(c);
        r = i.length, n[e] = r, a.push(e), o.push(t), i.push(l);
        for (var h = u, p = s.length; h !== p; ++h) {
            var d = s[h];
            l[h] = new qc(d, e, t)
        }
        return l
    },
    unsubscribe_: function(e) {
        var t = this._bindingsIndicesByPath,
            n = t[e];
        if (void 0 !== n) {
            var r = this._paths,
                i = this._parsedPaths,
                a = this._bindings,
                o = a.length - 1,
                s = a[o];
            t[e[o]] = n, a[n] = s, a.pop(), i[n] = i[o], i.pop(), r[n] = r[o], r.pop()
        }
    }
}), Object.assign(Yc.prototype, {
    play: function() { return this._mixer._activateAction(this), this },
    stop: function() { return this._mixer._deactivateAction(this), this.reset() },
    reset: function() { return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping() },
    isRunning: function() { return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this) },
    isScheduled: function() { return this._mixer._isActiveAction(this) },
    startAt: function(e) { return this._startTime = e, this },
    setLoop: function(e, t) { return this.loop = e, this.repetitions = t, this },
    setEffectiveWeight: function(e) { return this.weight = e, this._effectiveWeight = this.enabled ? e : 0, this.stopFading() },
    getEffectiveWeight: function() { return this._effectiveWeight },
    fadeIn: function(e) { return this._scheduleFading(e, 0, 1) },
    fadeOut: function(e) { return this._scheduleFading(e, 1, 0) },
    crossFadeFrom: function(e, t, n) {
        if (e.fadeOut(t), this.fadeIn(t), n) {
            var r = this._clip.duration,
                i = e._clip.duration,
                a = i / r,
                o = r / i;
            e.warp(1, a, t), this.warp(o, 1, t)
        }
        return this
    },
    crossFadeTo: function(e, t, n) { return e.crossFadeFrom(this, t, n) },
    stopFading: function() { var e = this._weightInterpolant; return null !== e && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this },
    setEffectiveTimeScale: function(e) { return this.timeScale = e, this._effectiveTimeScale = this.paused ? 0 : e, this.stopWarping() },
    getEffectiveTimeScale: function() { return this._effectiveTimeScale },
    setDuration: function(e) { return this.timeScale = this._clip.duration / e, this.stopWarping() },
    syncWith: function(e) { return this.time = e.time, this.timeScale = e.timeScale, this.stopWarping() },
    halt: function(e) { return this.warp(this._effectiveTimeScale, 0, e) },
    warp: function(e, t, n) {
        var r = this._mixer,
            i = r.time,
            a = this._timeScaleInterpolant,
            o = this.timeScale;
        null === a && (a = r._lendControlInterpolant(), this._timeScaleInterpolant = a);
        var s = a.parameterPositions,
            c = a.sampleValues;
        return s[0] = i, s[1] = i + n, c[0] = e / o, c[1] = t / o, this
    },
    stopWarping: function() { var e = this._timeScaleInterpolant; return null !== e && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(e)), this },
    getMixer: function() { return this._mixer },
    getClip: function() { return this._clip },
    getRoot: function() { return this._localRoot || this._mixer._root },
    _update: function(e, t, n, r) {
        if (this.enabled) {
            var i = this._startTime;
            if (null !== i) {
                var a = (e - i) * n;
                if (a < 0 || 0 === n) return;
                this._startTime = null, t = n * a
            }
            t *= this._updateTimeScale(e);
            var o = this._updateTime(t),
                s = this._updateWeight(e);
            if (s > 0)
                for (var c = this._interpolants, u = this._propertyBindings, l = 0, h = c.length; l !== h; ++l) c[l].evaluate(o), u[l].accumulate(r, s)
        } else this._updateWeight(e)
    },
    _updateWeight: function(e) {
        var t = 0;
        if (this.enabled) {
            t = this.weight;
            var n = this._weightInterpolant;
            if (null !== n) {
                var r = n.evaluate(e)[0];
                t *= r, e > n.parameterPositions[1] && (this.stopFading(), 0 === r && (this.enabled = !1))
            }
        }
        return this._effectiveWeight = t, t
    },
    _updateTimeScale: function(e) {
        var t = 0;
        if (!this.paused) {
            t = this.timeScale;
            var n = this._timeScaleInterpolant;
            null !== n && (t *= n.evaluate(e)[0], e > n.parameterPositions[1] && (this.stopWarping(), 0 === t ? this.paused = !0 : this.timeScale = t))
        }
        return this._effectiveTimeScale = t, t
    },
    _updateTime: function(e) {
        var t = this.time + e,
            n = this._clip.duration,
            r = this.loop,
            i = this._loopCount,
            a = 2202 === r;
        if (0 === e) return -1 === i ? t : a && 1 == (1 & i) ? n - t : t;
        if (2200 === r) {
            -1 === i && (this._loopCount = 0, this._setEndings(!0, !0, !1));
            e: {
                if (t >= n) t = n;
                else {
                    if (!(t < 0)) { this.time = t; break e }
                    t = 0
                }
                this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
                this.time = t,
                this._mixer.dispatchEvent({ type: "finished", action: this, direction: e < 0 ? -1 : 1 })
            }
        } else {
            if (-1 === i && (e >= 0 ? (i = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), t >= n || t < 0) {
                var o = Math.floor(t / n);
                t -= n * o, i += Math.abs(o);
                var s = this.repetitions - i;
                if (s <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, t = e > 0 ? n : 0, this.time = t, this._mixer.dispatchEvent({ type: "finished", action: this, direction: e > 0 ? 1 : -1 });
                else {
                    if (1 === s) {
                        var c = e < 0;
                        this._setEndings(c, !c, a)
                    } else this._setEndings(!1, !1, a);
                    this._loopCount = i, this.time = t, this._mixer.dispatchEvent({ type: "loop", action: this, loopDelta: o })
                }
            } else this.time = t;
            if (a && 1 == (1 & i)) return n - t
        }
        return t
    },
    _setEndings: function(e, t, n) {
        var r = this._interpolantSettings;
        n ? (r.endingStart = 2401, r.endingEnd = 2401) : (r.endingStart = e ? this.zeroSlopeAtStart ? 2401 : 2400 : 2402, r.endingEnd = t ? this.zeroSlopeAtEnd ? 2401 : 2400 : 2402)
    },
    _scheduleFading: function(e, t, n) {
        var r = this._mixer,
            i = r.time,
            a = this._weightInterpolant;
        null === a && (a = r._lendControlInterpolant(), this._weightInterpolant = a);
        var o = a.parameterPositions,
            s = a.sampleValues;
        return o[0] = i, s[0] = t, o[1] = i + e, s[1] = n, this
    }
}), Zc.prototype = Object.assign(Object.create(w.prototype), {
    constructor: Zc,
    _bindAction: function(e, t) {
        var n = e._localRoot || this._root,
            r = e._clip.tracks,
            i = r.length,
            a = e._propertyBindings,
            o = e._interpolants,
            s = n.uuid,
            c = this._bindingsByRootAndName,
            u = c[s];
        void 0 === u && (u = {}, c[s] = u);
        for (var l = 0; l !== i; ++l) {
            var h = r[l],
                p = h.name,
                d = u[p];
            if (void 0 !== d) a[l] = d;
            else { if (void 0 !== (d = a[l])) { null === d._cacheIndex && (++d.referenceCount, this._addInactiveBinding(d, s, p)); continue } var f = t && t._propertyBindings[l].binding.parsedPath;++(d = new Fc(qc.create(n, p, f), h.ValueTypeName, h.getValueSize())).referenceCount, this._addInactiveBinding(d, s, p), a[l] = d }
            o[l].resultBuffer = d.buffer
        }
    },
    _activateAction: function(e) {
        if (!this._isActiveAction(e)) {
            if (null === e._cacheIndex) {
                var t = (e._localRoot || this._root).uuid,
                    n = e._clip.uuid,
                    r = this._actionsByClip[n];
                this._bindAction(e, r && r.knownActions[0]), this._addInactiveAction(e, n, t)
            }
            for (var i = e._propertyBindings, a = 0, o = i.length; a !== o; ++a) {
                var s = i[a];
                0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState())
            }
            this._lendAction(e)
        }
    },
    _deactivateAction: function(e) {
        if (this._isActiveAction(e)) {
            for (var t = e._propertyBindings, n = 0, r = t.length; n !== r; ++n) {
                var i = t[n];
                0 == --i.useCount && (i.restoreOriginalState(), this._takeBackBinding(i))
            }
            this._takeBackAction(e)
        }
    },
    _initMemoryManager: function() {
        this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
        var e = this;
        this.stats = { actions: {get total() { return e._actions.length }, get inUse() { return e._nActiveActions } }, bindings: {get total() { return e._bindings.length }, get inUse() { return e._nActiveBindings } }, controlInterpolants: {get total() { return e._controlInterpolants.length }, get inUse() { return e._nActiveControlInterpolants } } }
    },
    _isActiveAction: function(e) { var t = e._cacheIndex; return null !== t && t < this._nActiveActions },
    _addInactiveAction: function(e, t, n) {
        var r = this._actions,
            i = this._actionsByClip,
            a = i[t];
        if (void 0 === a) a = { knownActions: [e], actionByRoot: {} }, e._byClipCacheIndex = 0, i[t] = a;
        else {
            var o = a.knownActions;
            e._byClipCacheIndex = o.length, o.push(e)
        }
        e._cacheIndex = r.length, r.push(e), a.actionByRoot[n] = e
    },
    _removeInactiveAction: function(e) {
        var t = this._actions,
            n = t[t.length - 1],
            r = e._cacheIndex;
        n._cacheIndex = r, t[r] = n, t.pop(), e._cacheIndex = null;
        var i = e._clip.uuid,
            a = this._actionsByClip,
            o = a[i],
            s = o.knownActions,
            c = s[s.length - 1],
            u = e._byClipCacheIndex;
        c._byClipCacheIndex = u, s[u] = c, s.pop(), e._byClipCacheIndex = null, delete o.actionByRoot[(e._localRoot || this._root).uuid], 0 === s.length && delete a[i], this._removeInactiveBindingsForAction(e)
    },
    _removeInactiveBindingsForAction: function(e) {
        for (var t = e._propertyBindings, n = 0, r = t.length; n !== r; ++n) {
            var i = t[n];
            0 == --i.referenceCount && this._removeInactiveBinding(i)
        }
    },
    _lendAction: function(e) {
        var t = this._actions,
            n = e._cacheIndex,
            r = this._nActiveActions++,
            i = t[r];
        e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i
    },
    _takeBackAction: function(e) {
        var t = this._actions,
            n = e._cacheIndex,
            r = --this._nActiveActions,
            i = t[r];
        e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i
    },
    _addInactiveBinding: function(e, t, n) {
        var r = this._bindingsByRootAndName,
            i = r[t],
            a = this._bindings;
        void 0 === i && (i = {}, r[t] = i), i[n] = e, e._cacheIndex = a.length, a.push(e)
    },
    _removeInactiveBinding: function(e) {
        var t = this._bindings,
            n = e.binding,
            r = n.rootNode.uuid,
            i = n.path,
            a = this._bindingsByRootAndName,
            o = a[r],
            s = t[t.length - 1],
            c = e._cacheIndex;
        s._cacheIndex = c, t[c] = s, t.pop(), delete o[i], 0 === Object.keys(o).length && delete a[r]
    },
    _lendBinding: function(e) {
        var t = this._bindings,
            n = e._cacheIndex,
            r = this._nActiveBindings++,
            i = t[r];
        e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i
    },
    _takeBackBinding: function(e) {
        var t = this._bindings,
            n = e._cacheIndex,
            r = --this._nActiveBindings,
            i = t[r];
        e._cacheIndex = r, t[r] = e, i._cacheIndex = n, t[n] = i
    },
    _lendControlInterpolant: function() {
        var e = this._controlInterpolants,
            t = this._nActiveControlInterpolants++,
            n = e[t];
        return void 0 === n && ((n = new Xo(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer)).__cacheIndex = t, e[t] = n), n
    },
    _takeBackControlInterpolant: function(e) {
        var t = this._controlInterpolants,
            n = e.__cacheIndex,
            r = --this._nActiveControlInterpolants,
            i = t[r];
        e.__cacheIndex = r, t[r] = e, i.__cacheIndex = n, t[n] = i
    },
    _controlInterpolantsResultBuffer: new Float32Array(1),
    clipAction: function(e, t) {
        var n = t || this._root,
            r = n.uuid,
            i = "string" == typeof e ? rs.findByName(n, e) : e,
            a = null !== i ? i.uuid : e,
            o = this._actionsByClip[a],
            s = null;
        if (void 0 !== o) {
            var c = o.actionByRoot[r];
            if (void 0 !== c) return c;
            s = o.knownActions[0], null === i && (i = s._clip)
        }
        if (null === i) return null;
        var u = new Yc(this, i, t);
        return this._bindAction(u, s), this._addInactiveAction(u, a, r), u
    },
    existingAction: function(e, t) {
        var n = t || this._root,
            r = n.uuid,
            i = "string" == typeof e ? rs.findByName(n, e) : e,
            a = i ? i.uuid : e,
            o = this._actionsByClip[a];
        return void 0 !== o && o.actionByRoot[r] || null
    },
    stopAllAction: function() {
        var e = this._actions,
            t = this._nActiveActions,
            n = this._bindings,
            r = this._nActiveBindings;
        this._nActiveActions = 0, this._nActiveBindings = 0;
        for (var i = 0; i !== t; ++i) e[i].reset();
        for (i = 0; i !== r; ++i) n[i].useCount = 0;
        return this
    },
    update: function(e) {
        e *= this.timeScale;
        for (var t = this._actions, n = this._nActiveActions, r = this.time += e, i = Math.sign(e), a = this._accuIndex ^= 1, o = 0; o !== n; ++o) t[o]._update(r, e, i, a);
        var s = this._bindings,
            c = this._nActiveBindings;
        for (o = 0; o !== c; ++o) s[o].apply(a);
        return this
    },
    setTime: function(e) { this.time = 0; for (var t = 0; t < this._actions.length; t++) this._actions[t].time = 0; return this.update(e) },
    getRoot: function() { return this._root },
    uncacheClip: function(e) {
        var t = this._actions,
            n = e.uuid,
            r = this._actionsByClip,
            i = r[n];
        if (void 0 !== i) {
            for (var a = i.knownActions, o = 0, s = a.length; o !== s; ++o) {
                var c = a[o];
                this._deactivateAction(c);
                var u = c._cacheIndex,
                    l = t[t.length - 1];
                c._cacheIndex = null, c._byClipCacheIndex = null, l._cacheIndex = u, t[u] = l, t.pop(), this._removeInactiveBindingsForAction(c)
            }
            delete r[n]
        }
    },
    uncacheRoot: function(e) {
        var t = e.uuid,
            n = this._actionsByClip;
        for (var r in n) {
            var i = n[r].actionByRoot[t];
            void 0 !== i && (this._deactivateAction(i), this._removeInactiveAction(i))
        }
        var a = this._bindingsByRootAndName[t];
        if (void 0 !== a)
            for (var o in a) {
                var s = a[o];
                s.restoreOriginalState(), this._removeInactiveBinding(s)
            }
    },
    uncacheAction: function(e, t) {
        var n = this.existingAction(e, t);
        null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
    }
}), Jc.prototype.clone = function() { return new Jc(void 0 === this.value.clone ? this.value : this.value.clone()) }, Kc.prototype = Object.assign(Object.create(bi.prototype), { constructor: Kc, isInstancedInterleavedBuffer: !0, copy: function(e) { return bi.prototype.copy.call(this, e), this.meshPerAttribute = e.meshPerAttribute, this } }), Object.assign(Qc.prototype, { set: function(e, t) { this.ray.set(e, t) }, setFromCamera: function(e, t) { t && t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t && t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type.") }, intersectObject: function(e, t, n) { var r = n || []; return eu(e, this, r, t), r.sort($c), r }, intersectObjects: function(e, t, n) { var r = n || []; if (!1 === Array.isArray(e)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), r; for (var i = 0, a = e.length; i < a; i++) eu(e[i], this, r, t); return r.sort($c), r } }), Object.assign(tu.prototype, { set: function(e, t, n) { return this.radius = e, this.phi = t, this.theta = n, this }, clone: function() { return (new this.constructor).copy(this) }, copy: function(e) { return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this }, makeSafe: function() { return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this }, setFromVector3: function(e) { return this.setFromCartesianCoords(e.x, e.y, e.z) }, setFromCartesianCoords: function(e, t, n) { return this.radius = Math.sqrt(e * e + t * t + n * n), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(T.clamp(t / this.radius, -1, 1))), this } }), Object.assign(nu.prototype, { set: function(e, t, n) { return this.radius = e, this.theta = t, this.y = n, this }, clone: function() { return (new this.constructor).copy(this) }, copy: function(e) { return this.radius = e.radius, this.theta = e.theta, this.y = e.y, this }, setFromVector3: function(e) { return this.setFromCartesianCoords(e.x, e.y, e.z) }, setFromCartesianCoords: function(e, t, n) { return this.radius = Math.sqrt(e * e + n * n), this.theta = Math.atan2(e, n), this.y = t, this } });
var ru = new E;

function iu(e, t) { this.min = void 0 !== e ? e : new E(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new E(-1 / 0, -1 / 0) }
Object.assign(iu.prototype, { set: function(e, t) { return this.min.copy(e), this.max.copy(t), this }, setFromPoints: function(e) { this.makeEmpty(); for (var t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]); return this }, setFromCenterAndSize: function(e, t) { var n = ru.copy(t).multiplyScalar(.5); return this.min.copy(e).sub(n), this.max.copy(e).add(n), this }, clone: function() { return (new this.constructor).copy(this) }, copy: function(e) { return this.min.copy(e.min), this.max.copy(e.max), this }, makeEmpty: function() { return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this }, isEmpty: function() { return this.max.x < this.min.x || this.max.y < this.min.y }, getCenter: function(e) { return void 0 === e && (console.warn("THREE.Box2: .getCenter() target is now required"), e = new E), this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) }, getSize: function(e) { return void 0 === e && (console.warn("THREE.Box2: .getSize() target is now required"), e = new E), this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min) }, expandByPoint: function(e) { return this.min.min(e), this.max.max(e), this }, expandByVector: function(e) { return this.min.sub(e), this.max.add(e), this }, expandByScalar: function(e) { return this.min.addScalar(-e), this.max.addScalar(e), this }, containsPoint: function(e) { return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y) }, containsBox: function(e) { return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y }, getParameter: function(e, t) { return void 0 === t && (console.warn("THREE.Box2: .getParameter() target is now required"), t = new E), t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y)) }, intersectsBox: function(e) { return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y) }, clampPoint: function(e, t) { return void 0 === t && (console.warn("THREE.Box2: .clampPoint() target is now required"), t = new E), t.copy(e).clamp(this.min, this.max) }, distanceToPoint: function(e) { return ru.copy(e).clamp(this.min, this.max).sub(e).length() }, intersect: function(e) { return this.min.max(e.min), this.max.min(e.max), this }, union: function(e) { return this.min.min(e.min), this.max.max(e.max), this }, translate: function(e) { return this.min.add(e), this.max.add(e), this }, equals: function(e) { return e.min.equals(this.min) && e.max.equals(this.max) } });
var au = new U,
    ou = new U;

function su(e, t) { this.start = void 0 !== e ? e : new U, this.end = void 0 !== t ? t : new U }

function cu(e) { ue.call(this), this.material = e, this.render = function() {} }
Object.assign(su.prototype, {
    set: function(e, t) { return this.start.copy(e), this.end.copy(t), this },
    clone: function() { return (new this.constructor).copy(this) },
    copy: function(e) { return this.start.copy(e.start), this.end.copy(e.end), this },
    getCenter: function(e) { return void 0 === e && (console.warn("THREE.Line3: .getCenter() target is now required"), e = new U), e.addVectors(this.start, this.end).multiplyScalar(.5) },
    delta: function(e) { return void 0 === e && (console.warn("THREE.Line3: .delta() target is now required"), e = new U), e.subVectors(this.end, this.start) },
    distanceSq: function() { return this.start.distanceToSquared(this.end) },
    distance: function() { return this.start.distanceTo(this.end) },
    at: function(e, t) { return void 0 === t && (console.warn("THREE.Line3: .at() target is now required"), t = new U), this.delta(t).multiplyScalar(e).add(this.start) },
    closestPointToPointParameter: function(e, t) {
        au.subVectors(e, this.start), ou.subVectors(this.end, this.start);
        var n = ou.dot(ou),
            r = ou.dot(au) / n;
        return t && (r = T.clamp(r, 0, 1)), r
    },
    closestPointToPoint: function(e, t, n) { var r = this.closestPointToPointParameter(e, t); return void 0 === n && (console.warn("THREE.Line3: .closestPointToPoint() target is now required"), n = new U), this.delta(n).multiplyScalar(r).add(this.start) },
    applyMatrix4: function(e) { return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this },
    equals: function(e) { return e.start.equals(this.start) && e.end.equals(this.end) }
}), cu.prototype = Object.create(ue.prototype), cu.prototype.constructor = cu, cu.prototype.isImmediateRenderObject = !0;
var uu = new U;

function lu(e, t) {
    ue.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = t;
    for (var n = new Lt, r = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], i = 0, a = 1; i < 32; i++, a++) {
        var o = i / 32 * Math.PI * 2,
            s = a / 32 * Math.PI * 2;
        r.push(Math.cos(o), Math.sin(o), 1, Math.cos(s), Math.sin(s), 1)
    }
    n.setAttribute("position", new gt(r, 3));
    var c = new Qi({ fog: !1, toneMapped: !1 });
    this.cone = new sa(n, c), this.add(this.cone), this.update()
}
lu.prototype = Object.create(ue.prototype), lu.prototype.constructor = lu, lu.prototype.dispose = function() { this.cone.geometry.dispose(), this.cone.material.dispose() }, lu.prototype.update = function() {
    this.light.updateMatrixWorld();
    var e = this.light.distance ? this.light.distance : 1e3,
        t = e * Math.tan(this.light.angle);
    this.cone.scale.set(t, t, e), uu.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(uu), void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color)
};
var hu = new U,
    pu = new W,
    du = new W;

function fu(e) {
    for (var t = function e(t) {
            var n = [];
            t && t.isBone && n.push(t);
            for (var r = 0; r < t.children.length; r++) n.push.apply(n, e(t.children[r]));
            return n
        }(e), n = new Lt, r = [], i = [], a = new et(0, 0, 1), o = new et(0, 1, 0), s = 0; s < t.length; s++) {
        var c = t[s];
        c.parent && c.parent.isBone && (r.push(0, 0, 0), r.push(0, 0, 0), i.push(a.r, a.g, a.b), i.push(o.r, o.g, o.b))
    }
    n.setAttribute("position", new gt(r, 3)), n.setAttribute("color", new gt(i, 3));
    var u = new Qi({ vertexColors: !0, depthTest: !1, depthWrite: !1, toneMapped: !1, transparent: !0 });
    sa.call(this, n, u), this.root = e, this.bones = t, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
}

function mu(e, t, n) {
    this.light = e, this.light.updateMatrixWorld(), this.color = n;
    var r = new go(t, 4, 2),
        i = new st({ wireframe: !0, fog: !1, toneMapped: !1 });
    qt.call(this, r, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, this.update()
}
fu.prototype = Object.create(sa.prototype), fu.prototype.constructor = fu, fu.prototype.isSkeletonHelper = !0, fu.prototype.updateMatrixWorld = function(e) {
    var t = this.bones,
        n = this.geometry,
        r = n.getAttribute("position");
    du.getInverse(this.root.matrixWorld);
    for (var i = 0, a = 0; i < t.length; i++) {
        var o = t[i];
        o.parent && o.parent.isBone && (pu.multiplyMatrices(du, o.matrixWorld), hu.setFromMatrixPosition(pu), r.setXYZ(a, hu.x, hu.y, hu.z), pu.multiplyMatrices(du, o.parent.matrixWorld), hu.setFromMatrixPosition(pu), r.setXYZ(a + 1, hu.x, hu.y, hu.z), a += 2)
    }
    n.getAttribute("position").needsUpdate = !0, ue.prototype.updateMatrixWorld.call(this, e)
}, mu.prototype = Object.create(qt.prototype), mu.prototype.constructor = mu, mu.prototype.dispose = function() { this.geometry.dispose(), this.material.dispose() }, mu.prototype.update = function() { void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color) };
var vu = new U,
    gu = new et,
    yu = new et;

function xu(e, t, n) {
    ue.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = n;
    var r = new La(t);
    r.rotateY(.5 * Math.PI), this.material = new st({ wireframe: !0, fog: !1, toneMapped: !1 }), void 0 === this.color && (this.material.vertexColors = !0);
    var i = r.getAttribute("position"),
        a = new Float32Array(3 * i.count);
    r.setAttribute("color", new ut(a, 3)), this.add(new qt(r, this.material)), this.update()
}

function bu(e, t, n, r) {
    e = e || 10, t = t || 10, n = new et(void 0 !== n ? n : 4473924), r = new et(void 0 !== r ? r : 8947848);
    for (var i = t / 2, a = e / t, o = e / 2, s = [], c = [], u = 0, l = 0, h = -o; u <= t; u++, h += a) {
        s.push(-o, 0, h, o, 0, h), s.push(h, 0, -o, h, 0, o);
        var p = u === i ? n : r;
        p.toArray(c, l), l += 3, p.toArray(c, l), l += 3, p.toArray(c, l), l += 3, p.toArray(c, l), l += 3
    }
    var d = new Lt;
    d.setAttribute("position", new gt(s, 3)), d.setAttribute("color", new gt(c, 3));
    var f = new Qi({ vertexColors: !0, toneMapped: !1 });
    sa.call(this, d, f)
}

function wu(e, t, n, r, i, a) {
    e = e || 10, t = t || 16, n = n || 8, r = r || 64, i = new et(void 0 !== i ? i : 4473924), a = new et(void 0 !== a ? a : 8947848);
    var o, s, c, u, l, h, p, d = [],
        f = [];
    for (u = 0; u <= t; u++) c = u / t * (2 * Math.PI), o = Math.sin(c) * e, s = Math.cos(c) * e, d.push(0, 0, 0), d.push(o, 0, s), p = 1 & u ? i : a, f.push(p.r, p.g, p.b), f.push(p.r, p.g, p.b);
    for (u = 0; u <= n; u++)
        for (p = 1 & u ? i : a, h = e - e / n * u, l = 0; l < r; l++) c = l / r * (2 * Math.PI), o = Math.sin(c) * h, s = Math.cos(c) * h, d.push(o, 0, s), f.push(p.r, p.g, p.b), c = (l + 1) / r * (2 * Math.PI), o = Math.sin(c) * h, s = Math.cos(c) * h, d.push(o, 0, s), f.push(p.r, p.g, p.b);
    var m = new Lt;
    m.setAttribute("position", new gt(d, 3)), m.setAttribute("color", new gt(f, 3));
    var v = new Qi({ vertexColors: !0, toneMapped: !1 });
    sa.call(this, m, v)
}
xu.prototype = Object.create(ue.prototype), xu.prototype.constructor = xu, xu.prototype.dispose = function() { this.children[0].geometry.dispose(), this.children[0].material.dispose() }, xu.prototype.update = function() {
    var e = this.children[0];
    if (void 0 !== this.color) this.material.color.set(this.color);
    else {
        var t = e.geometry.getAttribute("color");
        gu.copy(this.light.color), yu.copy(this.light.groundColor);
        for (var n = 0, r = t.count; n < r; n++) {
            var i = n < r / 2 ? gu : yu;
            t.setXYZ(n, i.r, i.g, i.b)
        }
        t.needsUpdate = !0
    }
    e.lookAt(vu.setFromMatrixPosition(this.light.matrixWorld).negate())
}, bu.prototype = Object.assign(Object.create(sa.prototype), { constructor: bu, copy: function(e) { return sa.prototype.copy.call(this, e), this.geometry.copy(e.geometry), this.material.copy(e.material), this }, clone: function() { return (new this.constructor).copy(this) } }), wu.prototype = Object.create(sa.prototype), wu.prototype.constructor = wu;
var _u = new U,
    Mu = new U,
    Su = new U;

function Tu(e, t, n) {
    ue.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.color = n, void 0 === t && (t = 1);
    var r = new Lt;
    r.setAttribute("position", new gt([-t, t, 0, t, t, 0, t, -t, 0, -t, -t, 0, -t, t, 0], 3));
    var i = new Qi({ fog: !1, toneMapped: !1 });
    this.lightPlane = new ia(r, i), this.add(this.lightPlane), (r = new Lt).setAttribute("position", new gt([0, 0, 0, 0, 0, 1], 3)), this.targetLine = new ia(r, i), this.add(this.targetLine), this.update()
}
Tu.prototype = Object.create(ue.prototype), Tu.prototype.constructor = Tu, Tu.prototype.dispose = function() { this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose() }, Tu.prototype.update = function() { _u.setFromMatrixPosition(this.light.matrixWorld), Mu.setFromMatrixPosition(this.light.target.matrixWorld), Su.subVectors(Mu, _u), this.lightPlane.lookAt(Mu), void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(Mu), this.targetLine.scale.z = Su.length() };
var Eu = new U,
    Au = new sn;

function Lu(e) {
    var t = new Lt,
        n = new Qi({ color: 16777215, vertexColors: !0, toneMapped: !1 }),
        r = [],
        i = [],
        a = {},
        o = new et(16755200),
        s = new et(16711680),
        c = new et(43775),
        u = new et(16777215),
        l = new et(3355443);

    function h(e, t, n) { p(e, n), p(t, n) }

    function p(e, t) { r.push(0, 0, 0), i.push(t.r, t.g, t.b), void 0 === a[e] && (a[e] = []), a[e].push(r.length / 3 - 1) }
    h("n1", "n2", o), h("n2", "n4", o), h("n4", "n3", o), h("n3", "n1", o), h("f1", "f2", o), h("f2", "f4", o), h("f4", "f3", o), h("f3", "f1", o), h("n1", "f1", o), h("n2", "f2", o), h("n3", "f3", o), h("n4", "f4", o), h("p", "n1", s), h("p", "n2", s), h("p", "n3", s), h("p", "n4", s), h("u1", "u2", c), h("u2", "u3", c), h("u3", "u1", c), h("c", "t", u), h("p", "c", l), h("cn1", "cn2", l), h("cn3", "cn4", l), h("cf1", "cf2", l), h("cf3", "cf4", l), t.setAttribute("position", new gt(r, 3)), t.setAttribute("color", new gt(i, 3)), sa.call(this, t, n), this.camera = e, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
}

function Ru(e, t, n, r, i, a, o) {
    Eu.set(i, a, o).unproject(r);
    var s = t[e];
    if (void 0 !== s)
        for (var c = n.getAttribute("position"), u = 0, l = s.length; u < l; u++) c.setXYZ(s[u], Eu.x, Eu.y, Eu.z)
}
Lu.prototype = Object.create(sa.prototype), Lu.prototype.constructor = Lu, Lu.prototype.update = function() {
    var e = this.geometry,
        t = this.pointMap;
    Au.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse), Ru("c", t, e, Au, 0, 0, -1), Ru("t", t, e, Au, 0, 0, 1), Ru("n1", t, e, Au, -1, -1, -1), Ru("n2", t, e, Au, 1, -1, -1), Ru("n3", t, e, Au, -1, 1, -1), Ru("n4", t, e, Au, 1, 1, -1), Ru("f1", t, e, Au, -1, -1, 1), Ru("f2", t, e, Au, 1, -1, 1), Ru("f3", t, e, Au, -1, 1, 1), Ru("f4", t, e, Au, 1, 1, 1), Ru("u1", t, e, Au, .7, 1.1, -1), Ru("u2", t, e, Au, -.7, 1.1, -1), Ru("u3", t, e, Au, 0, 2, -1), Ru("cf1", t, e, Au, -1, 0, 1), Ru("cf2", t, e, Au, 1, 0, 1), Ru("cf3", t, e, Au, 0, -1, 1), Ru("cf4", t, e, Au, 0, 1, 1), Ru("cn1", t, e, Au, -1, 0, -1), Ru("cn2", t, e, Au, 1, 0, -1), Ru("cn3", t, e, Au, 0, -1, -1), Ru("cn4", t, e, Au, 0, 1, -1), e.getAttribute("position").needsUpdate = !0
};
var Pu = new Se;

function Cu(e, t) {
    this.object = e, void 0 === t && (t = 16776960);
    var n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
        r = new Float32Array(24),
        i = new Lt;
    i.setIndex(new ut(n, 1)), i.setAttribute("position", new ut(r, 3)), sa.call(this, i, new Qi({ color: t, toneMapped: !1 })), this.matrixAutoUpdate = !1, this.update()
}

function Ou(e, t) {
    this.type = "Box3Helper", this.box = e, t = t || 16776960;
    var n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
        r = new Lt;
    r.setIndex(new ut(n, 1)), r.setAttribute("position", new gt([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3)), sa.call(this, r, new Qi({ color: t, toneMapped: !1 })), this.geometry.computeBoundingSphere()
}

function Iu(e, t, n) {
    this.type = "PlaneHelper", this.plane = e, this.size = void 0 === t ? 1 : t;
    var r = void 0 !== n ? n : 16776960,
        i = new Lt;
    i.setAttribute("position", new gt([1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], 3)), i.computeBoundingSphere(), ia.call(this, i, new Qi({ color: r, toneMapped: !1 }));
    var a = new Lt;
    a.setAttribute("position", new gt([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1], 3)), a.computeBoundingSphere(), this.add(new qt(a, new st({ color: r, opacity: .2, transparent: !0, depthWrite: !1, toneMapped: !1 })))
}
Cu.prototype = Object.create(sa.prototype), Cu.prototype.constructor = Cu, Cu.prototype.update = function(e) {
    if (void 0 !== e && console.warn("THREE.BoxHelper: .update() has no longer arguments."), void 0 !== this.object && Pu.setFromObject(this.object), !Pu.isEmpty()) {
        var t = Pu.min,
            n = Pu.max,
            r = this.geometry.attributes.position,
            i = r.array;
        i[0] = n.x, i[1] = n.y, i[2] = n.z, i[3] = t.x, i[4] = n.y, i[5] = n.z, i[6] = t.x, i[7] = t.y, i[8] = n.z, i[9] = n.x, i[10] = t.y, i[11] = n.z, i[12] = n.x, i[13] = n.y, i[14] = t.z, i[15] = t.x, i[16] = n.y, i[17] = t.z, i[18] = t.x, i[19] = t.y, i[20] = t.z, i[21] = n.x, i[22] = t.y, i[23] = t.z, r.needsUpdate = !0, this.geometry.computeBoundingSphere()
    }
}, Cu.prototype.setFromObject = function(e) { return this.object = e, this.update(), this }, Cu.prototype.copy = function(e) { return sa.prototype.copy.call(this, e), this.object = e.object, this }, Cu.prototype.clone = function() { return (new this.constructor).copy(this) }, Ou.prototype = Object.create(sa.prototype), Ou.prototype.constructor = Ou, Ou.prototype.updateMatrixWorld = function(e) {
    var t = this.box;
    t.isEmpty() || (t.getCenter(this.position), t.getSize(this.scale), this.scale.multiplyScalar(.5), ue.prototype.updateMatrixWorld.call(this, e))
}, Iu.prototype = Object.create(ia.prototype), Iu.prototype.constructor = Iu, Iu.prototype.updateMatrixWorld = function(e) {
    var t = -this.plane.constant;
    Math.abs(t) < 1e-8 && (t = 1e-8), this.scale.set(.5 * this.size, .5 * this.size, t), this.children[0].material.side = t < 0 ? 1 : 0, this.lookAt(this.plane.normal), ue.prototype.updateMatrixWorld.call(this, e)
};
var Du, Nu, Fu = new U;

function Uu(e, t, n, r, i, a) { ue.call(this), void 0 === e && (e = new U(0, 0, 1)), void 0 === t && (t = new U(0, 0, 0)), void 0 === n && (n = 1), void 0 === r && (r = 16776960), void 0 === i && (i = .2 * n), void 0 === a && (a = .2 * i), void 0 === Du && ((Du = new Lt).setAttribute("position", new gt([0, 0, 0, 0, 1, 0], 3)), (Nu = new Ao(0, .5, 1, 5, 1)).translate(0, -.5, 0)), this.position.copy(t), this.line = new ia(Du, new Qi({ color: r, toneMapped: !1 })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new qt(Nu, new st({ color: r, toneMapped: !1 })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(n, i, a) }

function Bu(e) {
    var t = [0, 0, 0, e = e || 1, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
        n = new Lt;
    n.setAttribute("position", new gt(t, 3)), n.setAttribute("color", new gt([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
    var r = new Qi({ vertexColors: !0, toneMapped: !1 });
    sa.call(this, n, r)
}
Uu.prototype = Object.create(ue.prototype), Uu.prototype.constructor = Uu, Uu.prototype.setDirection = function(e) {
    if (e.y > .99999) this.quaternion.set(0, 0, 0, 1);
    else if (e.y < -.99999) this.quaternion.set(1, 0, 0, 0);
    else {
        Fu.set(e.z, 0, -e.x).normalize();
        var t = Math.acos(e.y);
        this.quaternion.setFromAxisAngle(Fu, t)
    }
}, Uu.prototype.setLength = function(e, t, n) { void 0 === t && (t = .2 * e), void 0 === n && (n = .2 * t), this.line.scale.set(1, Math.max(1e-4, e - t), 1), this.line.updateMatrix(), this.cone.scale.set(n, t, n), this.cone.position.y = e, this.cone.updateMatrix() }, Uu.prototype.setColor = function(e) { this.line.material.color.set(e), this.cone.material.color.set(e) }, Uu.prototype.copy = function(e) { return ue.prototype.copy.call(this, e, !1), this.line.copy(e.line), this.cone.copy(e.cone), this }, Uu.prototype.clone = function() { return (new this.constructor).copy(this) }, Bu.prototype = Object.create(sa.prototype), Bu.prototype.constructor = Bu;
var ku, zu = Math.pow(2, 8),
    Gu = [.125, .215, .35, .446, .526, .582],
    Hu = 5 + Gu.length,
    ju = (c(v = {}, 3e3, 0), c(v, 3001, 1), c(v, 3002, 2), c(v, 3004, 3), c(v, 3005, 4), c(v, 3006, 5), c(v, 3007, 6), v),
    Vu = new Xs,
    Wu = (20, (ku = new Do({ defines: { n: 20 }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: new Float32Array(20) }, latitudinal: { value: !1 }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: new U(0, 1, 0) }, inputEncoding: { value: ju[3e3] }, outputEncoding: { value: ju[3e3] } }, vertexShader: "\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nattribute float faceIndex;\nvarying vec3 vOutputDirection;\nvec3 getDirection(vec2 uv, float face) {\n\tuv = 2.0 * uv - 1.0;\n\tvec3 direction = vec3(uv, 1.0);\n\tif (face == 0.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 1.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 3.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.x *= -1.0;\n\t} else if (face == 4.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.y *= -1.0;\n\t} else if (face == 5.0) {\n\t\tdirection.xz *= -1.0;\n\t}\n\treturn direction;\n}\nvoid main() {\n\tvOutputDirection = getDirection(uv, faceIndex);\n\tgl_Position = vec4( position, 1.0 );\n}\n\t", fragmentShader: "\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform int samples;\nuniform float weights[n];\nuniform bool latitudinal;\nuniform float dTheta;\nuniform float mipInt;\nuniform vec3 poleAxis;\n\n".concat("\nuniform int inputEncoding;\nuniform int outputEncoding;\n\n#include <encodings_pars_fragment>\n\nvec4 inputTexelToLinear(vec4 value){\n\tif(inputEncoding == 0){\n\t\treturn value;\n\t}else if(inputEncoding == 1){\n\t\treturn sRGBToLinear(value);\n\t}else if(inputEncoding == 2){\n\t\treturn RGBEToLinear(value);\n\t}else if(inputEncoding == 3){\n\t\treturn RGBMToLinear(value, 7.0);\n\t}else if(inputEncoding == 4){\n\t\treturn RGBMToLinear(value, 16.0);\n\t}else if(inputEncoding == 5){\n\t\treturn RGBDToLinear(value, 256.0);\n\t}else{\n\t\treturn GammaToLinear(value, 2.2);\n\t}\n}\n\nvec4 linearToOutputTexel(vec4 value){\n\tif(outputEncoding == 0){\n\t\treturn value;\n\t}else if(outputEncoding == 1){\n\t\treturn LinearTosRGB(value);\n\t}else if(outputEncoding == 2){\n\t\treturn LinearToRGBE(value);\n\t}else if(outputEncoding == 3){\n\t\treturn LinearToRGBM(value, 7.0);\n\t}else if(outputEncoding == 4){\n\t\treturn LinearToRGBM(value, 16.0);\n\t}else if(outputEncoding == 5){\n\t\treturn LinearToRGBD(value, 256.0);\n\t}else{\n\t\treturn LinearToGamma(value, 2.2);\n\t}\n}\n\nvec4 envMapTexelToLinear(vec4 color) {\n\treturn inputTexelToLinear(color);\n}\n\t", "\n\n#define ENVMAP_TYPE_CUBE_UV\n#include <cube_uv_reflection_fragment>\n\nvec3 getSample(float theta, vec3 axis) {\n\tfloat cosTheta = cos(theta);\n\t// Rodrigues' axis-angle rotation\n\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t+ cross(axis, vOutputDirection) * sin(theta)\n\t\t+ axis * dot(axis, vOutputDirection) * (1.0 - cosTheta);\n\treturn bilinearCubeUV(envMap, sampleDirection, mipInt);\n}\n\nvoid main() {\n\tvec3 axis = latitudinal ? poleAxis : cross(poleAxis, vOutputDirection);\n\tif (all(equal(axis, vec3(0.0))))\n\t\taxis = vec3(vOutputDirection.z, 0.0, - vOutputDirection.x);\n\taxis = normalize(axis);\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb += weights[0] * getSample(0.0, axis);\n\tfor (int i = 1; i < n; i++) {\n\t\tif (i >= samples)\n\t\t\tbreak;\n\t\tfloat theta = dTheta * float(i);\n\t\tgl_FragColor.rgb += weights[i] * getSample(-1.0 * theta, axis);\n\t\tgl_FragColor.rgb += weights[i] * getSample(theta, axis);\n\t}\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t"), blending: 0, depthTest: !1, depthWrite: !1 })).type = "SphericalGaussianBlur", ku),
    qu = null,
    Xu = null,
    Yu = function() {
        for (var e = [], t = [], n = [], r = 8, i = 0; i < Hu; i++) {
            var a = Math.pow(2, r);
            t.push(a);
            var o = 1 / a;
            i > 4 ? o = Gu[i - 8 + 4 - 1] : 0 == i && (o = 0), n.push(o);
            for (var s = 1 / (a - 1), c = -s / 2, u = 1 + s / 2, l = [c, c, u, c, u, u, c, c, u, u, c, u], h = new Float32Array(108), p = new Float32Array(72), d = new Float32Array(36), f = 0; f < 6; f++) {
                var m = f % 3 * 2 / 3 - 1,
                    v = f > 2 ? 0 : -1,
                    g = [m, v, 0, m + 2 / 3, v, 0, m + 2 / 3, v + 1, 0, m, v, 0, m + 2 / 3, v + 1, 0, m, v + 1, 0];
                h.set(g, 18 * f), p.set(l, 12 * f);
                var y = [f, f, f, f, f, f];
                d.set(y, 6 * f)
            }
            var x = new Lt;
            x.setAttribute("position", new ut(h, 3)), x.setAttribute("uv", new ut(p, 2)), x.setAttribute("faceIndex", new ut(d, 1)), e.push(x), r > 4 && r--
        }
        return { _lodPlanes: e, _sizeLods: t, _sigmas: n }
    }(),
    Zu = Yu._lodPlanes,
    Ju = Yu._sizeLods,
    Ku = Yu._sigmas,
    Qu = null,
    $u = null,
    el = null,
    tl = (1 + Math.sqrt(5)) / 2,
    nl = 1 / tl,
    rl = [new U(1, 1, 1), new U(-1, 1, 1), new U(1, 1, -1), new U(-1, 1, -1), new U(0, tl, nl), new U(0, tl, -nl), new U(nl, 0, tl), new U(-nl, 0, tl), new U(tl, nl, 0), new U(-tl, nl, 0)];

function il(e) { $u = e, cl(Wu) }

function al(e) {
    var t = { magFilter: 1003, minFilter: 1003, generateMipmaps: !1, type: e ? e.type : 1009, format: e ? e.format : 1023, encoding: e ? e.encoding : 3002, depthBuffer: !1, stencilBuffer: !1 },
        n = ul(t);
    return n.depthBuffer = !e, Qu = ul(t), n
}

function ol(e) { Qu.dispose(), $u.setRenderTarget(el), e.scissorTest = !1, e.setSize(e.width, e.height) }

function sl(e, t, n, r) {
    var i = new cn(90, 1, t, n),
        a = [1, 1, 1, 1, -1, 1],
        o = [1, 1, -1, -1, -1, 1],
        s = $u.outputEncoding,
        c = $u.toneMapping,
        u = $u.toneMappingExposure,
        l = $u.getClearColor(),
        h = $u.getClearAlpha();
    $u.toneMapping = 1, $u.toneMappingExposure = 1, $u.outputEncoding = 3e3, e.scale.z *= -1;
    var p = e.background;
    if (p && p.isColor) {
        p.convertSRGBToLinear();
        var d = Math.max(p.r, p.g, p.b),
            f = Math.min(Math.max(Math.ceil(Math.log2(d)), -128), 127);
        p = p.multiplyScalar(Math.pow(2, -f));
        var m = (f + 128) / 255;
        $u.setClearColor(p, m), e.background = null
    }
    for (var v = 0; v < 6; v++) {
        var g = v % 3;
        0 == g ? (i.up.set(0, a[v], 0), i.lookAt(o[v], 0, 0)) : 1 == g ? (i.up.set(0, 0, a[v]), i.lookAt(0, o[v], 0)) : (i.up.set(0, a[v], 0), i.lookAt(0, 0, o[v])), ll(r, g * zu, v > 2 ? zu : 0, zu, zu), $u.setRenderTarget(r), $u.render(e, i)
    }
    $u.toneMapping = c, $u.toneMappingExposure = u, $u.outputEncoding = s, $u.setClearColor(l, h), e.scale.z *= -1
}

function cl(e) {
    var t = new le;
    t.add(new qt(Zu[0], e)), $u.compile(t, Vu)
}

function ul(e) { var t = new O(3 * zu, 3 * zu, e); return t.texture.mapping = 306, t.texture.name = "PMREM.cubeUv", t.scissorTest = !0, t }

function ll(e, t, n, r, i) { e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i) }

function hl(e) {
    var t = $u.autoClear;
    $u.autoClear = !1;
    for (var n = 1; n < Hu; n++) pl(e, n - 1, n, Math.sqrt(Ku[n] * Ku[n] - Ku[n - 1] * Ku[n - 1]), rl[(n - 1) % rl.length]);
    $u.autoClear = t
}

function pl(e, t, n, r, i) { dl(e, Qu, t, n, r, "latitudinal", i), dl(Qu, e, n, n, r, "longitudinal", i) }

function dl(e, t, n, r, i, a, o) {
    "latitudinal" !== a && "longitudinal" !== a && console.error("blur direction must be either latitudinal or longitudinal!");
    var s = new le;
    s.add(new qt(Zu[r], Wu));
    var c = Wu.uniforms,
        u = Ju[n] - 1,
        l = isFinite(i) ? Math.PI / (2 * u) : 2 * Math.PI / 39,
        h = i / l,
        p = isFinite(i) ? 1 + Math.floor(3 * h) : 20;
    p > 20 && console.warn("sigmaRadians, ".concat(i, ", is too large and will clip, as it requested ").concat(p, " samples when the maximum is set to ").concat(20));
    for (var d = [], f = 0, m = 0; m < 20; ++m) {
        var v = m / h,
            g = Math.exp(-v * v / 2);
        d.push(g), 0 == m ? f += g : m < p && (f += 2 * g)
    }
    for (m = 0; m < d.length; m++) d[m] = d[m] / f;
    c.envMap.value = e.texture, c.samples.value = p, c.weights.value = d, c.latitudinal.value = "latitudinal" === a, o && (c.poleAxis.value = o), c.dTheta.value = l, c.mipInt.value = 8 - n, c.inputEncoding.value = ju[e.texture.encoding], c.outputEncoding.value = ju[e.texture.encoding];
    var y = Ju[r];
    ll(t, v = 3 * Math.max(0, zu - 2 * y), (0 === r ? 0 : 2 * zu) + 2 * y * (r > 4 ? r - 8 + 4 : 0), 3 * y, 2 * y), $u.setRenderTarget(t), $u.render(s, Vu)
}

function fl() { var e = new Do({ uniforms: { envMap: { value: null }, texelSize: { value: new E(1, 1) }, inputEncoding: { value: ju[3e3] }, outputEncoding: { value: ju[3e3] } }, vertexShader: "\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nattribute float faceIndex;\nvarying vec3 vOutputDirection;\nvec3 getDirection(vec2 uv, float face) {\n\tuv = 2.0 * uv - 1.0;\n\tvec3 direction = vec3(uv, 1.0);\n\tif (face == 0.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 1.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 3.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.x *= -1.0;\n\t} else if (face == 4.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.y *= -1.0;\n\t} else if (face == 5.0) {\n\t\tdirection.xz *= -1.0;\n\t}\n\treturn direction;\n}\nvoid main() {\n\tvOutputDirection = getDirection(uv, faceIndex);\n\tgl_Position = vec4( position, 1.0 );\n}\n\t", fragmentShader: "\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform sampler2D envMap;\nuniform vec2 texelSize;\n\n".concat("\nuniform int inputEncoding;\nuniform int outputEncoding;\n\n#include <encodings_pars_fragment>\n\nvec4 inputTexelToLinear(vec4 value){\n\tif(inputEncoding == 0){\n\t\treturn value;\n\t}else if(inputEncoding == 1){\n\t\treturn sRGBToLinear(value);\n\t}else if(inputEncoding == 2){\n\t\treturn RGBEToLinear(value);\n\t}else if(inputEncoding == 3){\n\t\treturn RGBMToLinear(value, 7.0);\n\t}else if(inputEncoding == 4){\n\t\treturn RGBMToLinear(value, 16.0);\n\t}else if(inputEncoding == 5){\n\t\treturn RGBDToLinear(value, 256.0);\n\t}else{\n\t\treturn GammaToLinear(value, 2.2);\n\t}\n}\n\nvec4 linearToOutputTexel(vec4 value){\n\tif(outputEncoding == 0){\n\t\treturn value;\n\t}else if(outputEncoding == 1){\n\t\treturn LinearTosRGB(value);\n\t}else if(outputEncoding == 2){\n\t\treturn LinearToRGBE(value);\n\t}else if(outputEncoding == 3){\n\t\treturn LinearToRGBM(value, 7.0);\n\t}else if(outputEncoding == 4){\n\t\treturn LinearToRGBM(value, 16.0);\n\t}else if(outputEncoding == 5){\n\t\treturn LinearToRGBD(value, 256.0);\n\t}else{\n\t\treturn LinearToGamma(value, 2.2);\n\t}\n}\n\nvec4 envMapTexelToLinear(vec4 color) {\n\treturn inputTexelToLinear(color);\n}\n\t", "\n\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tvec3 outputDirection = normalize(vOutputDirection);\n\tvec2 uv;\n\tuv.y = asin(clamp(outputDirection.y, -1.0, 1.0)) * RECIPROCAL_PI + 0.5;\n\tuv.x = atan(outputDirection.z, outputDirection.x) * RECIPROCAL_PI2 + 0.5;\n\tvec2 f = fract(uv / texelSize - 0.5);\n\tuv -= f * texelSize;\n\tvec3 tl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x += texelSize.x;\n\tvec3 tr = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.y += texelSize.y;\n\tvec3 br = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tuv.x -= texelSize.x;\n\tvec3 bl = envMapTexelToLinear(texture2D(envMap, uv)).rgb;\n\tvec3 tm = mix(tl, tr, f.x);\n\tvec3 bm = mix(bl, br, f.x);\n\tgl_FragColor.rgb = mix(tm, bm, f.y);\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t"), blending: 0, depthTest: !1, depthWrite: !1 }); return e.type = "EquirectangularToCubeUV", e }

function ml() { var e = new Do({ uniforms: { envMap: { value: null }, inputEncoding: { value: ju[3e3] }, outputEncoding: { value: ju[3e3] } }, vertexShader: "\nprecision mediump float;\nprecision mediump int;\nattribute vec3 position;\nattribute vec2 uv;\nattribute float faceIndex;\nvarying vec3 vOutputDirection;\nvec3 getDirection(vec2 uv, float face) {\n\tuv = 2.0 * uv - 1.0;\n\tvec3 direction = vec3(uv, 1.0);\n\tif (face == 0.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 1.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.z *= -1.0;\n\t} else if (face == 3.0) {\n\t\tdirection = direction.zyx;\n\t\tdirection.x *= -1.0;\n\t} else if (face == 4.0) {\n\t\tdirection = direction.xzy;\n\t\tdirection.y *= -1.0;\n\t} else if (face == 5.0) {\n\t\tdirection.xz *= -1.0;\n\t}\n\treturn direction;\n}\nvoid main() {\n\tvOutputDirection = getDirection(uv, faceIndex);\n\tgl_Position = vec4( position, 1.0 );\n}\n\t", fragmentShader: "\nprecision mediump float;\nprecision mediump int;\nvarying vec3 vOutputDirection;\nuniform samplerCube envMap;\n\n".concat("\nuniform int inputEncoding;\nuniform int outputEncoding;\n\n#include <encodings_pars_fragment>\n\nvec4 inputTexelToLinear(vec4 value){\n\tif(inputEncoding == 0){\n\t\treturn value;\n\t}else if(inputEncoding == 1){\n\t\treturn sRGBToLinear(value);\n\t}else if(inputEncoding == 2){\n\t\treturn RGBEToLinear(value);\n\t}else if(inputEncoding == 3){\n\t\treturn RGBMToLinear(value, 7.0);\n\t}else if(inputEncoding == 4){\n\t\treturn RGBMToLinear(value, 16.0);\n\t}else if(inputEncoding == 5){\n\t\treturn RGBDToLinear(value, 256.0);\n\t}else{\n\t\treturn GammaToLinear(value, 2.2);\n\t}\n}\n\nvec4 linearToOutputTexel(vec4 value){\n\tif(outputEncoding == 0){\n\t\treturn value;\n\t}else if(outputEncoding == 1){\n\t\treturn LinearTosRGB(value);\n\t}else if(outputEncoding == 2){\n\t\treturn LinearToRGBE(value);\n\t}else if(outputEncoding == 3){\n\t\treturn LinearToRGBM(value, 7.0);\n\t}else if(outputEncoding == 4){\n\t\treturn LinearToRGBM(value, 16.0);\n\t}else if(outputEncoding == 5){\n\t\treturn LinearToRGBD(value, 256.0);\n\t}else{\n\t\treturn LinearToGamma(value, 2.2);\n\t}\n}\n\nvec4 envMapTexelToLinear(vec4 color) {\n\treturn inputTexelToLinear(color);\n}\n\t", "\n\nvoid main() {\n\tgl_FragColor = vec4(0.0);\n\tgl_FragColor.rgb = envMapTexelToLinear(textureCube(envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ))).rgb;\n\tgl_FragColor = linearToOutputTexel(gl_FragColor);\n}\n\t\t"), blending: 0, depthTest: !1, depthWrite: !1 }); return e.type = "CubemapToCubeUV", e }

function vl(e) { console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), Ts.call(this, e), this.type = "catmullrom", this.closed = !0 }

function gl(e) { console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), Ts.call(this, e), this.type = "catmullrom" }

function yl(e) { console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."), Ts.call(this, e), this.type = "catmullrom" }
il.prototype = {
    constructor: il,
    fromScene: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 100;
        el = $u.getRenderTarget();
        var i = al();
        return sl(e, n, r, i), t > 0 && pl(i, 0, 0, t), hl(i), ol(i), i
    },
    fromEquirectangular: function(e) { return e.magFilter = 1003, e.minFilter = 1003, e.generateMipmaps = !1, this.fromCubemap(e) },
    fromCubemap: function(e) {
        el = $u.getRenderTarget();
        var t = al(e);
        return function(e, t) {
            var n = new le;
            e.isCubeTexture ? null == Xu && (Xu = ml()) : null == qu && (qu = fl());
            var r = e.isCubeTexture ? Xu : qu;
            n.add(new qt(Zu[0], r));
            var i = r.uniforms;
            i.envMap.value = e, e.isCubeTexture || i.texelSize.value.set(1 / e.image.width, 1 / e.image.height), i.inputEncoding.value = ju[e.encoding], i.outputEncoding.value = ju[e.encoding], ll(t, 0, 0, 3 * zu, 2 * zu), $u.setRenderTarget(t), $u.render(n, Vu)
        }(e, t), hl(t), ol(t), t
    },
    compileCubemapShader: function() { null == Xu && cl(Xu = ml()) },
    compileEquirectangularShader: function() { null == qu && cl(qu = fl()) },
    dispose: function() { Wu.dispose(), null != Xu && Xu.dispose(), null != qu && qu.dispose(); for (var e = 0; e < Zu.length; e++) Zu[e].dispose() }
}, gs.create = function(e, t) { return console.log("THREE.Curve.create() has been deprecated"), e.prototype = Object.create(gs.prototype), e.prototype.constructor = e, e.prototype.getPoint = t, e }, Object.assign(Us.prototype, {
    createPointsGeometry: function(e) { console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead."); var t = this.getPoints(e); return this.createGeometry(t) },
    createSpacedPointsGeometry: function(e) { console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead."); var t = this.getSpacedPoints(e); return this.createGeometry(t) },
    createGeometry: function(e) {
        console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
        for (var t = new $t, n = 0, r = e.length; n < r; n++) {
            var i = e[n];
            t.vertices.push(new U(i.x, i.y, i.z || 0))
        }
        return t
    }
}), Object.assign(Bs.prototype, { fromPoints: function(e) { return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."), this.setFromPoints(e) } }), vl.prototype = Object.create(Ts.prototype), gl.prototype = Object.create(Ts.prototype), yl.prototype = Object.create(Ts.prototype), Object.assign(yl.prototype, { initFromArray: function() { console.error("THREE.Spline: .initFromArray() has been removed.") }, getControlPointsArray: function() { console.error("THREE.Spline: .getControlPointsArray() has been removed.") }, reparametrizeByArcLength: function() { console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.") } }), bu.prototype.setColors = function() { console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.") }, fu.prototype.update = function() { console.error("THREE.SkeletonHelper: update() no longer needs to be called.") }, Object.assign(cs.prototype, { extractUrlBase: function(e) { return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."), $s.extractUrlBase(e) } }), cs.Handlers = { add: function() { console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.") }, get: function() { console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.") } }, Object.assign(ic.prototype, { setTexturePath: function(e) { return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."), this.setResourcePath(e) } }), Object.assign(iu.prototype, { center: function(e) { return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(e) }, empty: function() { return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty() }, isIntersectionBox: function(e) { return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(e) }, size: function(e) { return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(e) } }), Object.assign(Se.prototype, { center: function(e) { return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(e) }, empty: function() { return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty() }, isIntersectionBox: function(e) { return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(e) }, isIntersectionSphere: function(e) { return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(e) }, size: function(e) { return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(e) } }), fn.prototype.setFromMatrix = function(e) { return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."), this.setFromProjectionMatrix(e) }, su.prototype.center = function(e) { return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(e) }, Object.assign(T, { random16: function() { return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."), Math.random() }, nearestPowerOfTwo: function(e) { return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."), T.floorPowerOfTwo(e) }, nextPowerOfTwo: function(e) { return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."), T.ceilPowerOfTwo(e) } }), Object.assign(A.prototype, { flattenToArrayOffset: function(e, t) { return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(e, t) }, multiplyVector3: function(e) { return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this) }, multiplyVector3Array: function() { console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.") }, applyToBufferAttribute: function(e) { return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."), e.applyMatrix3(this) }, applyToVector3Array: function() { console.error("THREE.Matrix3: .applyToVector3Array() has been removed.") } }), Object.assign(W.prototype, { extractPosition: function(e) { return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e) }, flattenToArrayOffset: function(e, t) { return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(e, t) }, getPosition: function() { return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), (new U).setFromMatrixColumn(this, 3) }, setRotationFromQuaternion: function(e) { return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(e) }, multiplyToArray: function() { console.warn("THREE.Matrix4: .multiplyToArray() has been removed.") }, multiplyVector3: function(e) { return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this) }, multiplyVector4: function(e) { return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this) }, multiplyVector3Array: function() { console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.") }, rotateAxis: function(e) { console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this) }, crossVector: function(e) { return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this) }, translate: function() { console.error("THREE.Matrix4: .translate() has been removed.") }, rotateX: function() { console.error("THREE.Matrix4: .rotateX() has been removed.") }, rotateY: function() { console.error("THREE.Matrix4: .rotateY() has been removed.") }, rotateZ: function() { console.error("THREE.Matrix4: .rotateZ() has been removed.") }, rotateByAxis: function() { console.error("THREE.Matrix4: .rotateByAxis() has been removed.") }, applyToBufferAttribute: function(e) { return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."), e.applyMatrix4(this) }, applyToVector3Array: function() { console.error("THREE.Matrix4: .applyToVector3Array() has been removed.") }, makeFrustum: function(e, t, n, r, i, a) { return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), this.makePerspective(e, t, r, n, i, a) } }), ke.prototype.isIntersectionLine = function(e) { return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(e) }, D.prototype.multiplyVector3 = function(e) { return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this) }, Object.assign(Ne.prototype, { isIntersectionBox: function(e) { return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(e) }, isIntersectionPlane: function(e) { return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(e) }, isIntersectionSphere: function(e) { return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(e) } }), Object.assign(Je.prototype, { area: function() { return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."), this.getArea() }, barycoordFromPoint: function(e, t) { return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), this.getBarycoord(e, t) }, midpoint: function(e) { return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."), this.getMidpoint(e) }, normal: function(e) { return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), this.getNormal(e) }, plane: function(e) { return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."), this.getPlane(e) } }), Object.assign(Je, { barycoordFromPoint: function(e, t, n, r, i) { return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), Je.getBarycoord(e, t, n, r, i) }, normal: function(e, t, n, r) { return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), Je.getNormal(e, t, n, r) } }), Object.assign(ks.prototype, { extractAllPoints: function(e) { return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."), this.extractPoints(e) }, extrude: function(e) { return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new uo(this, e) }, makeGeometry: function(e) { return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new _o(this, e) } }), Object.assign(E.prototype, { fromAttribute: function(e, t, n) { return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(e, t, n) }, distanceToManhattan: function(e) { return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(e) }, lengthManhattan: function() { return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength() } }), Object.assign(U.prototype, { setEulerFromRotationMatrix: function() { console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.") }, setEulerFromQuaternion: function() { console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.") }, getPositionFromMatrix: function(e) { return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(e) }, getScaleFromMatrix: function(e) { return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(e) }, getColumnFromMatrix: function(e, t) { return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(t, e) }, applyProjection: function(e) { return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), this.applyMatrix4(e) }, fromAttribute: function(e, t, n) { return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(e, t, n) }, distanceToManhattan: function(e) { return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(e) }, lengthManhattan: function() { return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength() } }), Object.assign(C.prototype, { fromAttribute: function(e, t, n) { return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(e, t, n) }, lengthManhattan: function() { return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength() } }), Object.assign($t.prototype, { computeTangents: function() { console.error("THREE.Geometry: .computeTangents() has been removed.") }, computeLineDistances: function() { console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.") }, applyMatrix: function(e) { return console.warn("THREE.Geometry: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(e) } }), Object.assign(ue.prototype, { getChildByName: function(e) { return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e) }, renderDepth: function() { console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.") }, translate: function(e, t) { return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, e) }, getWorldRotation: function() { console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.") }, applyMatrix: function(e) { return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(e) } }), Object.defineProperties(ue.prototype, { eulerOrder: { get: function() { return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order }, set: function(e) { console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = e } }, useQuaternion: { get: function() { console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.") }, set: function() { console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.") } } }), Object.assign(qt.prototype, { setDrawMode: function() { console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.") } }), Object.defineProperties(qt.prototype, { drawMode: { get: function() { return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."), 0 }, set: function() { console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.") } } }), Object.defineProperties(Gi.prototype, { objects: { get: function() { return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels } } }), Object.defineProperty(Wi.prototype, "useVertexTexture", { get: function() { console.warn("THREE.Skeleton: useVertexTexture has been removed.") }, set: function() { console.warn("THREE.Skeleton: useVertexTexture has been removed.") } }), Hi.prototype.initBones = function() { console.error("THREE.SkinnedMesh: initBones() has been removed.") }, Object.defineProperty(gs.prototype, "__arcLengthDivisions", { get: function() { return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), this.arcLengthDivisions }, set: function(e) { console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."), this.arcLengthDivisions = e } }), cn.prototype.setLens = function(e, t) { console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== t && (this.filmGauge = t), this.setFocalLength(e) }, Object.defineProperties(zs.prototype, { onlyShadow: { set: function() { console.warn("THREE.Light: .onlyShadow has been removed.") } }, shadowCameraFov: { set: function(e) { console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = e } }, shadowCameraLeft: { set: function(e) { console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = e } }, shadowCameraRight: { set: function(e) { console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = e } }, shadowCameraTop: { set: function(e) { console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = e } }, shadowCameraBottom: { set: function(e) { console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = e } }, shadowCameraNear: { set: function(e) { console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = e } }, shadowCameraFar: { set: function(e) { console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = e } }, shadowCameraVisible: { set: function() { console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.") } }, shadowBias: { set: function(e) { console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = e } }, shadowDarkness: { set: function() { console.warn("THREE.Light: .shadowDarkness has been removed.") } }, shadowMapWidth: { set: function(e) { console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = e } }, shadowMapHeight: { set: function(e) { console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = e } } }), Object.defineProperties(ut.prototype, { length: { get: function() { return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length } }, dynamic: { get: function() { return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), 35048 === this.usage }, set: function() { console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), this.setUsage(35048) } } }), Object.assign(ut.prototype, { setDynamic: function(e) { return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(!0 === e ? 35048 : 35044), this }, copyIndicesArray: function() { console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.") }, setArray: function() { console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers") } }), Object.assign(Lt.prototype, { addIndex: function(e) { console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(e) }, addAttribute: function(e, t) { return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."), t && t.isBufferAttribute || t && t.isInterleavedBufferAttribute ? "index" === e ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(t), this) : this.setAttribute(e, t) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.setAttribute(e, new ut(arguments[1], arguments[2]))) }, addDrawCall: function(e, t, n) { void 0 !== n && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(e, t) }, clearDrawCalls: function() { console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups() }, computeTangents: function() { console.warn("THREE.BufferGeometry: .computeTangents() has been removed.") }, computeOffsets: function() { console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.") }, removeAttribute: function(e) { return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."), this.deleteAttribute(e) }, applyMatrix: function(e) { return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(e) } }), Object.defineProperties(Lt.prototype, { drawcalls: { get: function() { return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups } }, offsets: { get: function() { return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups } } }), Object.defineProperties(Qc.prototype, { linePrecision: { get: function() { return console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."), this.params.Line.threshold }, set: function(e) { console.warn("THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."), this.params.Line.threshold = e } } }), Object.defineProperties(bi.prototype, { dynamic: { get: function() { return console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."), 35048 === this.usage }, set: function(e) { console.warn("THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."), this.setUsage(e) } } }), Object.assign(bi.prototype, { setDynamic: function(e) { return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(!0 === e ? 35048 : 35044), this }, setArray: function() { console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers") } }), Object.assign(lo.prototype, { getArrays: function() { console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.") }, addShapeList: function() { console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.") }, addShape: function() { console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.") } }), Object.defineProperties(Jc.prototype, { dynamic: { set: function() { console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.") } }, onUpdate: { value: function() { return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this } } }), Object.defineProperties(ot.prototype, { wrapAround: { get: function() { console.warn("THREE.Material: .wrapAround has been removed.") }, set: function() { console.warn("THREE.Material: .wrapAround has been removed.") } }, overdraw: { get: function() { console.warn("THREE.Material: .overdraw has been removed.") }, set: function() { console.warn("THREE.Material: .overdraw has been removed.") } }, wrapRGB: { get: function() { return console.warn("THREE.Material: .wrapRGB has been removed."), new et } }, shading: { get: function() { console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.") }, set: function(e) { console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === e } }, stencilMask: { get: function() { return console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask }, set: function(e) { console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask = e } } }), Object.defineProperties(Uo.prototype, { metal: { get: function() { return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), !1 }, set: function() { console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead") } } }), Object.defineProperties(on.prototype, { derivatives: { get: function() { return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives }, set: function(e) { console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = e } } }), Object.assign(gi.prototype, { clearTarget: function(e, t, n, r) { console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."), this.setRenderTarget(e), this.clear(t, n, r) }, animate: function(e) { console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."), this.setAnimationLoop(e) }, getCurrentRenderTarget: function() { return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."), this.getRenderTarget() }, getMaxAnisotropy: function() { return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."), this.capabilities.getMaxAnisotropy() }, getPrecision: function() { return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."), this.capabilities.precision }, resetGLState: function() { return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."), this.state.reset() }, supportsFloatTextures: function() { return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float") }, supportsHalfFloatTextures: function() { return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float") }, supportsStandardDerivatives: function() { return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives") }, supportsCompressedTextureS3TC: function() { return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc") }, supportsCompressedTexturePVRTC: function() { return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc") }, supportsBlendMinMax: function() { return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax") }, supportsVertexTextures: function() { return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures }, supportsInstancedArrays: function() { return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays") }, enableScissorTest: function(e) { console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(e) }, initMaterial: function() { console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.") }, addPrePlugin: function() { console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.") }, addPostPlugin: function() { console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.") }, updateShadowMap: function() { console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.") }, setFaceCulling: function() { console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.") }, allocTextureUnit: function() { console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.") }, setTexture: function() { console.warn("THREE.WebGLRenderer: .setTexture() has been removed.") }, setTexture2D: function() { console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.") }, setTextureCube: function() { console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.") }, getActiveMipMapLevel: function() { return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."), this.getActiveMipmapLevel() } }), Object.defineProperties(gi.prototype, { shadowMapEnabled: { get: function() { return this.shadowMap.enabled }, set: function(e) { console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = e } }, shadowMapType: { get: function() { return this.shadowMap.type }, set: function(e) { console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = e } }, shadowMapCullFace: { get: function() { console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.") }, set: function() { console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.") } }, context: { get: function() { return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."), this.getContext() } }, vr: { get: function() { return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"), this.xr } }, gammaInput: { get: function() { return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."), !1 }, set: function() { console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.") } }, gammaOutput: { get: function() { return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), !1 }, set: function(e) { console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), this.outputEncoding = !0 === e ? 3001 : 3e3 } } }), Object.defineProperties(li.prototype, { cullFace: { get: function() { console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.") }, set: function() { console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.") } }, renderReverseSided: { get: function() { console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.") }, set: function() { console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.") } }, renderSingleSided: { get: function() { console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.") }, set: function() { console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.") } } }), Object.defineProperties(O.prototype, { wrapS: { get: function() { return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = e } }, wrapT: { get: function() { return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = e } }, magFilter: { get: function() { return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = e } }, minFilter: { get: function() { return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = e } }, anisotropy: { get: function() { return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = e } }, offset: { get: function() { return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = e } }, repeat: { get: function() { return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = e } }, format: { get: function() { return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = e } }, type: { get: function() { return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = e } }, generateMipmaps: { get: function() { return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps }, set: function(e) { console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = e } } }), Object.defineProperties(Rc.prototype, { load: { value: function(e) { console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead."); var t = this; return (new mc).load(e, (function(e) { t.setBuffer(e) })), this } }, startTime: { set: function() { console.warn("THREE.Audio: .startTime is now .play( delay ).") } } }), Nc.prototype.getData = function() { return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData() }, un.prototype.updateCubeMap = function(e, t) { return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."), this.update(e, t) };
var xl = {
    merge: function(e, t, n) {
        var r;
        console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead."), t.isMesh && (t.matrixAutoUpdate && t.updateMatrix(), r = t.matrix, t = t.geometry), e.merge(t, r, n)
    },
    center: function(e) { return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), e.center() }
};
L.crossOrigin = void 0, L.loadTexture = function(e, t, n, r) {
    console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
    var i = new vs;
    i.setCrossOrigin(this.crossOrigin);
    var a = i.load(e, n, void 0, r);
    return t && (a.mapping = t), a
}, L.loadTextureCube = function(e, t, n, r) {
    console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
    var i = new ms;
    i.setCrossOrigin(this.crossOrigin);
    var a = i.load(e, n, void 0, r);
    return t && (a.mapping = t), a
}, L.loadCompressedTexture = function() { console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.") }, L.loadCompressedTextureCube = function() { console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.") };
var bl = { createMultiMaterialObject: function() { console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js") }, detach: function() { console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js") }, attach: function() { console.error("THREE.SceneUtils has been moved to /examples/jsm/utils/SceneUtils.js") } };
"undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "115" } }));
var wl = Object.freeze({ __proto__: null, ACESFilmicToneMapping: 5, AddEquation: 100, AddOperation: 2, AdditiveBlending: 2, AlphaFormat: 1021, AlwaysDepth: 1, AlwaysStencilFunc: 519, AmbientLight: Js, AmbientLightProbe: xc, AnimationClip: rs, AnimationLoader: hs, AnimationMixer: Zc, AnimationObjectGroup: Xc, AnimationUtils: Vo, ArcCurve: xs, ArrayCamera: fi, ArrowHelper: Uu, Audio: Rc, AudioAnalyser: Nc, AudioContext: fc, AudioListener: Lc, AudioLoader: mc, AxesHelper: Bu, AxisHelper: function(e) { return console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."), new Bu(e) }, BackSide: 1, BasicDepthPacking: 3200, BasicShadowMap: 0, BinaryTextureLoader: function(e) { return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."), new ds(e) }, Bone: qi, BooleanKeyframeTrack: Jo, BoundingBoxHelper: function(e, t) { return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), new Cu(e, t) }, Box2: iu, Box3: Se, Box3Helper: Ou, BoxBufferGeometry: tn, BoxGeometry: en, BoxHelper: Cu, BufferAttribute: ut, BufferGeometry: Lt, BufferGeometryLoader: nc, ByteType: 1010, Cache: as, Camera: sn, CameraHelper: Lu, CanvasRenderer: function() { console.error("THREE.CanvasRenderer has been removed") }, CanvasTexture: ya, CatmullRomCurve3: Ts, CineonToneMapping: 4, CircleBufferGeometry: Co, CircleGeometry: Po, ClampToEdgeWrapping: 1001, Clock: Mc, ClosedSplineCurve3: vl, Color: et, ColorKeyframeTrack: Ko, CompressedTexture: ga, CompressedTextureLoader: ps, ConeBufferGeometry: Ro, ConeGeometry: Lo, CubeCamera: un, CubeGeometry: en, CubeReflectionMapping: 301, CubeRefractionMapping: 302, CubeTexture: In, CubeTextureLoader: ms, CubeUVReflectionMapping: 306, CubeUVRefractionMapping: 307, CubicBezierCurve: Rs, CubicBezierCurve3: Ps, CubicInterpolant: qo, CullFaceBack: 1, CullFaceFront: 2, CullFaceFrontBack: 3, CullFaceNone: 0, Curve: gs, CurvePath: Us, CustomBlending: 5, CylinderBufferGeometry: Ao, CylinderGeometry: Eo, Cylindrical: nu, DataTexture: hn, DataTexture2DArray: Dn, DataTexture3D: Nn, DataTextureLoader: ds, DecrementStencilOp: 7683, DecrementWrapStencilOp: 34056, DefaultLoadingManager: ss, DepthFormat: 1026, DepthStencilFormat: 1027, DepthTexture: xa, DirectionalLight: Zs, DirectionalLightHelper: Tu, DirectionalLightShadow: Ys, DiscreteInterpolant: Yo, DodecahedronBufferGeometry: Oa, DodecahedronGeometry: Ca, DoubleSide: 2, DstAlphaFactor: 206, DstColorFactor: 208, DynamicBufferAttribute: function(e, t) { return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setUsage( THREE.DynamicDrawUsage ) instead."), new ut(e, t).setUsage(35048) }, DynamicCopyUsage: 35050, DynamicDrawUsage: 35048, DynamicReadUsage: 35049, EdgesGeometry: To, EdgesHelper: function(e, t) { return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."), new sa(new To(e.geometry), new Qi({ color: void 0 !== t ? t : 16777215 })) }, EllipseCurve: ys, EqualDepth: 4, EqualStencilFunc: 514, EquirectangularReflectionMapping: 303, EquirectangularRefractionMapping: 304, Euler: Y, EventDispatcher: w, ExtrudeBufferGeometry: lo, ExtrudeGeometry: uo, Face3: it, Face4: function(e, t, n, r, i, a, o) { return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new it(e, t, n, i, a, o) }, FaceColors: 1, FileLoader: ls, FlatShading: 1, Float32Attribute: function(e, t) { return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), new gt(e, t) }, Float32BufferAttribute: gt, Float64Attribute: function(e, t) { return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), new yt(e, t) }, Float64BufferAttribute: yt, FloatType: 1015, Fog: xi, FogExp2: yi, Font: hc, FontLoader: dc, FrontFaceDirectionCCW: 1, FrontFaceDirectionCW: 0, FrontSide: 0, Frustum: fn, GammaEncoding: 3007, Geometry: $t, GeometryUtils: xl, GreaterDepth: 6, GreaterEqualDepth: 5, GreaterEqualStencilFunc: 518, GreaterStencilFunc: 516, GridHelper: bu, Group: mi, HalfFloatType: 1016, HemisphereLight: Gs, HemisphereLightHelper: xu, HemisphereLightProbe: yc, IcosahedronBufferGeometry: Pa, IcosahedronGeometry: Ra, ImageBitmapLoader: uc, ImageLoader: fs, ImageUtils: L, ImmediateRenderObject: cu, IncrementStencilOp: 7682, IncrementWrapStencilOp: 34055, InstancedBufferAttribute: tc, InstancedBufferGeometry: ec, InstancedInterleavedBuffer: Kc, InstancedMesh: Ki, Int16Attribute: function(e, t) { return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), new dt(e, t) }, Int16BufferAttribute: dt, Int32Attribute: function(e, t) { return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), new mt(e, t) }, Int32BufferAttribute: mt, Int8Attribute: function(e, t) { return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), new lt(e, t) }, Int8BufferAttribute: lt, IntType: 1013, InterleavedBuffer: bi, InterleavedBufferAttribute: Mi, Interpolant: Wo, InterpolateDiscrete: 2300, InterpolateLinear: 2301, InterpolateSmooth: 2302, InvertStencilOp: 5386, JSONLoader: function() { console.error("THREE.JSONLoader has been removed.") }, KeepStencilOp: 7680, KeyframeTrack: Zo, LOD: Gi, LatheBufferGeometry: wo, LatheGeometry: bo, Layers: Z, LensFlare: function() { console.error("THREE.LensFlare has been moved to /examples/jsm/objects/Lensflare.js") }, LessDepth: 2, LessEqualDepth: 3, LessEqualStencilFunc: 515, LessStencilFunc: 513, Light: zs, LightProbe: gc, LightShadow: Hs, Line: ia, Line3: su, LineBasicMaterial: Qi, LineCurve: Cs, LineCurve3: Os, LineDashedMaterial: Ho, LineLoop: ca, LinePieces: 1, LineSegments: sa, LineStrip: 0, LinearEncoding: 3e3, LinearFilter: 1006, LinearInterpolant: Xo, LinearMipMapLinearFilter: 1008, LinearMipMapNearestFilter: 1007, LinearMipmapLinearFilter: 1008, LinearMipmapNearestFilter: 1007, LinearToneMapping: 1, Loader: cs, LoaderUtils: $s, LoadingManager: os, LogLuvEncoding: 3003, LoopOnce: 2200, LoopPingPong: 2202, LoopRepeat: 2201, LuminanceAlphaFormat: 1025, LuminanceFormat: 1024, MOUSE: x, Material: ot, MaterialLoader: Qs, Math: T, MathUtils: T, Matrix3: A, Matrix4: W, MaxEquation: 104, Mesh: qt, MeshBasicMaterial: st, MeshDepthMaterial: ci, MeshDistanceMaterial: ui, MeshFaceMaterial: function(e) { return console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead."), e }, MeshLambertMaterial: zo, MeshMatcapMaterial: Go, MeshNormalMaterial: ko, MeshPhongMaterial: Uo, MeshPhysicalMaterial: Fo, MeshStandardMaterial: No, MeshToonMaterial: Bo, MinEquation: 103, MirroredRepeatWrapping: 1002, MixOperation: 1, MultiMaterial: function(e) { return void 0 === e && (e = []), console.warn("THREE.MultiMaterial has been removed. Use an Array instead."), e.isMultiMaterial = !0, e.materials = e, e.clone = function() { return e.slice() }, e }, MultiplyBlending: 4, MultiplyOperation: 0, NearestFilter: 1003, NearestMipMapLinearFilter: 1005, NearestMipMapNearestFilter: 1004, NearestMipmapLinearFilter: 1005, NearestMipmapNearestFilter: 1004, NeverDepth: 0, NeverStencilFunc: 512, NoBlending: 0, NoColors: 0, NoToneMapping: 0, NormalBlending: 1, NotEqualDepth: 7, NotEqualStencilFunc: 517, NumberKeyframeTrack: Qo, Object3D: ue, ObjectLoader: ic, ObjectSpaceNormalMap: 1, OctahedronBufferGeometry: La, OctahedronGeometry: Aa, OneFactor: 201, OneMinusDstAlphaFactor: 207, OneMinusDstColorFactor: 209, OneMinusSrcAlphaFactor: 205, OneMinusSrcColorFactor: 203, OrthographicCamera: Xs, PCFShadowMap: 1, PCFSoftShadowMap: 2, PMREMGenerator: il, ParametricBufferGeometry: _a, ParametricGeometry: wa, Particle: function(e) { return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new Ui(e) }, ParticleBasicMaterial: function(e) { return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), new ua(e) }, ParticleSystem: function(e, t) { return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new fa(e, t) }, ParticleSystemMaterial: function(e) { return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), new ua(e) }, Path: Bs, PerspectiveCamera: cn, Plane: ke, PlaneBufferGeometry: xn, PlaneGeometry: yn, PlaneHelper: Iu, PointCloud: function(e, t) { return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new fa(e, t) }, PointCloudMaterial: function(e) { return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), new ua(e) }, PointLight: qs, PointLightHelper: mu, Points: fa, PointsMaterial: ua, PolarGridHelper: wu, PolyhedronBufferGeometry: Sa, PolyhedronGeometry: Ma, PositionalAudio: Dc, PropertyBinding: qc, PropertyMixer: Fc, QuadraticBezierCurve: Is, QuadraticBezierCurve3: Ds, Quaternion: D, QuaternionKeyframeTrack: es, QuaternionLinearInterpolant: $o, REVISION: "115", RGBADepthPacking: 3201, RGBAFormat: 1023, RGBAIntegerFormat: 1033, RGBA_ASTC_10x10_Format: 37819, RGBA_ASTC_10x5_Format: 37816, RGBA_ASTC_10x6_Format: 37817, RGBA_ASTC_10x8_Format: 37818, RGBA_ASTC_12x10_Format: 37820, RGBA_ASTC_12x12_Format: 37821, RGBA_ASTC_4x4_Format: 37808, RGBA_ASTC_5x4_Format: 37809, RGBA_ASTC_5x5_Format: 37810, RGBA_ASTC_6x5_Format: 37811, RGBA_ASTC_6x6_Format: 37812, RGBA_ASTC_8x5_Format: 37813, RGBA_ASTC_8x6_Format: 37814, RGBA_ASTC_8x8_Format: 37815, RGBA_BPTC_Format: 36492, RGBA_ETC2_EAC_Format: 37496, RGBA_PVRTC_2BPPV1_Format: 35843, RGBA_PVRTC_4BPPV1_Format: 35842, RGBA_S3TC_DXT1_Format: 33777, RGBA_S3TC_DXT3_Format: 33778, RGBA_S3TC_DXT5_Format: 33779, RGBDEncoding: 3006, RGBEEncoding: 3002, RGBEFormat: 1023, RGBFormat: 1022, RGBIntegerFormat: 1032, RGBM16Encoding: 3005, RGBM7Encoding: 3004, RGB_ETC1_Format: 36196, RGB_ETC2_Format: 37492, RGB_PVRTC_2BPPV1_Format: 35841, RGB_PVRTC_4BPPV1_Format: 35840, RGB_S3TC_DXT1_Format: 33776, RGFormat: 1030, RGIntegerFormat: 1031, RawShaderMaterial: Do, Ray: Ne, Raycaster: Qc, RectAreaLight: Ks, RedFormat: 1028, RedIntegerFormat: 1029, ReinhardToneMapping: 2, RepeatWrapping: 1e3, ReplaceStencilOp: 7681, ReverseSubtractEquation: 102, RingBufferGeometry: xo, RingGeometry: yo, SRGB8_ALPHA8_ASTC_10x10_Format: 37851, SRGB8_ALPHA8_ASTC_10x5_Format: 37848, SRGB8_ALPHA8_ASTC_10x6_Format: 37849, SRGB8_ALPHA8_ASTC_10x8_Format: 37850, SRGB8_ALPHA8_ASTC_12x10_Format: 37852, SRGB8_ALPHA8_ASTC_12x12_Format: 37853, SRGB8_ALPHA8_ASTC_4x4_Format: 37840, SRGB8_ALPHA8_ASTC_5x4_Format: 37841, SRGB8_ALPHA8_ASTC_5x5_Format: 37842, SRGB8_ALPHA8_ASTC_6x5_Format: 37843, SRGB8_ALPHA8_ASTC_6x6_Format: 37844, SRGB8_ALPHA8_ASTC_8x5_Format: 37845, SRGB8_ALPHA8_ASTC_8x6_Format: 37846, SRGB8_ALPHA8_ASTC_8x8_Format: 37847, Scene: le, SceneUtils: bl, ShaderChunk: bn, ShaderLib: wn, ShaderMaterial: on, ShadowMaterial: Io, Shape: ks, ShapeBufferGeometry: Mo, ShapeGeometry: _o, ShapePath: lc, ShapeUtils: oo, ShortType: 1011, Skeleton: Wi, SkeletonHelper: fu, SkinnedMesh: Hi, SmoothShading: 2, Sphere: Ae, SphereBufferGeometry: go, SphereGeometry: vo, Spherical: tu, SphericalHarmonics3: vc, SphericalReflectionMapping: 305, Spline: yl, SplineCurve: Ns, SplineCurve3: gl, SpotLight: Vs, SpotLightHelper: lu, SpotLightShadow: js, Sprite: Ui, SpriteMaterial: Si, SrcAlphaFactor: 204, SrcAlphaSaturateFactor: 210, SrcColorFactor: 202, StaticCopyUsage: 35046, StaticDrawUsage: 35044, StaticReadUsage: 35045, StereoCamera: _c, StreamCopyUsage: 35042, StreamDrawUsage: 35040, StreamReadUsage: 35041, StringKeyframeTrack: ts, SubtractEquation: 101, SubtractiveBlending: 3, TOUCH: b, TangentSpaceNormalMap: 0, TetrahedronBufferGeometry: Ea, TetrahedronGeometry: Ta, TextBufferGeometry: mo, TextGeometry: fo, Texture: P, TextureLoader: vs, TorusBufferGeometry: Ba, TorusGeometry: Ua, TorusKnotBufferGeometry: Fa, TorusKnotGeometry: Na, Triangle: Je, TriangleFanDrawMode: 2, TriangleStripDrawMode: 1, TrianglesDrawMode: 0, TubeBufferGeometry: Da, TubeGeometry: Ia, UVMapping: 300, Uint16Attribute: function(e, t) { return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), new ft(e, t) }, Uint16BufferAttribute: ft, Uint32Attribute: function(e, t) { return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), new vt(e, t) }, Uint32BufferAttribute: vt, Uint8Attribute: function(e, t) { return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), new ht(e, t) }, Uint8BufferAttribute: ht, Uint8ClampedAttribute: function(e, t) { return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), new pt(e, t) }, Uint8ClampedBufferAttribute: pt, Uncharted2ToneMapping: 3, Uniform: Jc, UniformsLib: mn, UniformsUtils: an, UnsignedByteType: 1009, UnsignedInt248Type: 1020, UnsignedIntType: 1014, UnsignedShort4444Type: 1017, UnsignedShort5551Type: 1018, UnsignedShort565Type: 1019, UnsignedShortType: 1012, VSMShadowMap: 3, Vector2: E, Vector3: U, Vector4: C, VectorKeyframeTrack: ns, Vertex: function(e, t, n) { return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), new U(e, t, n) }, VertexColors: 2, VideoTexture: va, WebGLCubeRenderTarget: ln, WebGLMultisampleRenderTarget: I, WebGLRenderTarget: O, WebGLRenderTargetCube: function(e, t, n) { return console.warn("THREE.WebGLRenderTargetCube( width, height, options ) is now WebGLCubeRenderTarget( size, options )."), new ln(e, n) }, WebGLRenderer: gi, WebGLUtils: di, WireframeGeometry: ba, WireframeHelper: function(e, t) { return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), new sa(new ba(e.geometry), new Qi({ color: void 0 !== t ? t : 16777215 })) }, WrapAroundEnding: 2402, XHRLoader: function(e) { return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new ls(e) }, ZeroCurvatureEnding: 2400, ZeroFactor: 200, ZeroSlopeEnding: 2401, ZeroStencilOp: 0, sRGBEncoding: 3001 }),
    _l = function(e, t) {
        return function(e) {
            var t = Object.prototype.hasOwnProperty,
                n = "~";

            function r() {}

            function i(e, t, n) { this.fn = e, this.context = t, this.once = n || !1 }

            function a(e, t, r, a, o) {
                if ("function" != typeof r) throw new TypeError("The listener must be a function");
                var s = new i(r, a || e, o),
                    c = n ? n + t : t;
                return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e
            }

            function o(e, t) { 0 == --e._eventsCount ? e._events = new r : delete e._events[t] }

            function s() { this._events = new r, this._eventsCount = 0 }
            Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (n = !1)), s.prototype.eventNames = function() { var e, r, i = []; if (0 === this._eventsCount) return i; for (r in e = this._events) t.call(e, r) && i.push(n ? r.slice(1) : r); return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(e)) : i }, s.prototype.listeners = function(e) {
                var t = n ? n + e : e,
                    r = this._events[t];
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var i = 0, a = r.length, o = new Array(a); i < a; i++) o[i] = r[i].fn;
                return o
            }, s.prototype.listenerCount = function(e) {
                var t = n ? n + e : e,
                    r = this._events[t];
                return r ? r.fn ? 1 : r.length : 0
            }, s.prototype.emit = function(e, t, r, i, a, o) {
                var s = arguments,
                    c = n ? n + e : e;
                if (!this._events[c]) return !1;
                var u, l, h = this._events[c],
                    p = arguments.length;
                if (h.fn) {
                    switch (h.once && this.removeListener(e, h.fn, void 0, !0), p) {
                        case 1:
                            return h.fn.call(h.context), !0;
                        case 2:
                            return h.fn.call(h.context, t), !0;
                        case 3:
                            return h.fn.call(h.context, t, r), !0;
                        case 4:
                            return h.fn.call(h.context, t, r, i), !0;
                        case 5:
                            return h.fn.call(h.context, t, r, i, a), !0;
                        case 6:
                            return h.fn.call(h.context, t, r, i, a, o), !0
                    }
                    for (l = 1, u = new Array(p - 1); l < p; l++) u[l - 1] = s[l];
                    h.fn.apply(h.context, u)
                } else {
                    var d, f = h.length;
                    for (l = 0; l < f; l++) switch (h[l].once && this.removeListener(e, h[l].fn, void 0, !0), p) {
                        case 1:
                            h[l].fn.call(h[l].context);
                            break;
                        case 2:
                            h[l].fn.call(h[l].context, t);
                            break;
                        case 3:
                            h[l].fn.call(h[l].context, t, r);
                            break;
                        case 4:
                            h[l].fn.call(h[l].context, t, r, i);
                            break;
                        default:
                            if (!u)
                                for (d = 1, u = new Array(p - 1); d < p; d++) u[d - 1] = s[d];
                            h[l].fn.apply(h[l].context, u)
                    }
                }
                return !0
            }, s.prototype.on = function(e, t, n) { return a(this, e, t, n, !1) }, s.prototype.once = function(e, t, n) { return a(this, e, t, n, !0) }, s.prototype.removeListener = function(e, t, r, i) {
                var a = n ? n + e : e;
                if (!this._events[a]) return this;
                if (!t) return o(this, a), this;
                var s = this._events[a];
                if (s.fn) s.fn !== t || i && !s.once || r && s.context !== r || o(this, a);
                else {
                    for (var c = 0, u = [], l = s.length; c < l; c++)(s[c].fn !== t || i && !s[c].once || r && s[c].context !== r) && u.push(s[c]);
                    u.length ? this._events[a] = 1 === u.length ? u[0] : u : o(this, a)
                }
                return this
            }, s.prototype.removeAllListeners = function(e) { var t; return e ? (t = n ? n + e : e, this._events[t] && o(this, t)) : (this._events = new r, this._eventsCount = 0), this }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = n, s.EventEmitter = s, e.exports = s
        }(t = { exports: {} }), t.exports
    }(),
    Ml = function() {
        function e() { a(this, e) }
        return s(e, null, [{ key: "id", get: function() { return this.index++, this.index } }]), e
    }();
Ml.index = 0;
var Sl = function(e) {
        u(n, _l);
        var t = d(n);

        function n() { var e; return a(this, n), (e = t.call(this)).name = "", e.rotate = 0, e.active = !0, e.anchor = { x: .5, y: .5 }, e.draggable = !1, e.touchAble = !1, e.dragEdge = "full", e.nodeType = "baseNode", e.children = [], e.deleteList = [], e.id = Ml.id, e.x = 0, e.y = 0, e.width = 0, e.height = 0, e }
        return s(n, [{ key: "addChild", value: function(e) { this[this.nodeType].add(e[e.nodeType]), this.children.push(e), e.onLoad() } }, { key: "removeChild", value: function(e) { e.onDestroy(), this.deleteList.push(e), this[e.nodeType].remove(e[e.nodeType]) } }, { key: "onLoad", value: function() {} }, { key: "onDestroy", value: function() {} }, { key: "update", value: function(e) {} }, { key: "onDragStart", value: function(e) {} }, { key: "onTap", value: function(e) {} }, { key: "onDrop", value: function(e) {} }, {
            key: "_panstart",
            value: function(e) {
                var t = y.containsPoint(e, this);
                if (this.children.length && !this.draggable)
                    for (var n = this.children.length - 1; n >= 0; n--) { var r = this.children[n]; if (r.active) { var i = r._panstart(e); if (i) return i } } else if (this.draggable && t) return this.onDragStart(e), this;
                return !1
            }
        }, {
            key: "_tap",
            value: function(e, t) {
                var n = y.containsPoint(e, this);
                if (this.children.length && !this.touchAble)
                    for (var r = this.children.length - 1; r >= 0; r--) { var i = this.children[r]; if (i.active) { var a = i._tap(e, t); if (a) return a } } else if (this.touchAble && n) return this.onTap(t), this;
                return !1
            }
        }, {
            key: "_update",
            value: function(e) {
                var t, n = this,
                    r = m(this.deleteList);
                try {
                    var i = function() {
                        var e = t.value;
                        e.onDestroy(), n.children.splice(n.children.findIndex((function(t) { return t.id === e.id })), 1), n.sence.remove(e[e.nodeType])
                    };
                    for (r.s(); !(t = r.n()).done;) i()
                } catch (e) { r.e(e) } finally { r.f() }
                this.deleteList = [];
                var a, o = m(this.children);
                try {
                    for (o.s(); !(a = o.n()).done;) {
                        var s = a.value;
                        s._update(e), s.update(e)
                    }
                } catch (e) { o.e(e) } finally { o.f() }
            }
        }]), n
    }(),
    Tl = function(e) {
        u(n, Sl);
        var t = d(n);

        function n(e) {
            var r;
            a(this, n), (r = t.call(this)).nodeType = "sprite", r.width = e.image.width || 0, r.height = e.image.height || 0;
            var i = new Si({ map: e });
            return r.sprite = new Ui(i), r.zIndex = 0, r
        }
        return s(n, [{
            key: "_update",
            value: function(e) {
                var t, n = this,
                    r = m(this.deleteList);
                try {
                    var i = function() {
                        var e = t.value;
                        e.onDestroy(), n.children.splice(n.children.findIndex((function(t) { return t.id === e.id })), 1), n.sence.remove(e[e.nodeType])
                    };
                    for (r.s(); !(t = r.n()).done;) i()
                } catch (e) { r.e(e) } finally { r.f() }
                this.deleteList = [];
                var a, o = m(this.children);
                try {
                    for (o.s(); !(a = o.n()).done;) {
                        var s = a.value;
                        s._update(e), s.update(e)
                    }
                } catch (e) { o.e(e) } finally { o.f() }
                this.sprite.center.set(this.anchor.x, this.anchor.y), this.sprite.scale.set(this.width, this.height, 1), this.sprite.position.set(this.x, this.y, this.zIndex || 1), this.sprite.material.rotation = -this.rotate * Math.PI / 180, this.sprite.visible = this.active
            }
        }]), n
    }(),
    El = function(e) {
        u(n, Sl);
        var t = d(n);

        function n() { var e; return a(this, n), (e = t.call(this)).nodeType = "group", e.group = new mi, e }
        return s(n, [{
            key: "_update",
            value: function(e) {
                var t, n = this,
                    r = m(this.deleteList);
                try {
                    var i = function() {
                        var e = t.value;
                        e.onDestroy(), n.children.splice(n.children.findIndex((function(t) { return t.id === e.id })), 1), n.sence.remove(e[e.nodeType])
                    };
                    for (r.s(); !(t = r.n()).done;) i()
                } catch (e) { r.e(e) } finally { r.f() }
                this.deleteList = [];
                var a, o = m(this.children);
                try {
                    for (o.s(); !(a = o.n()).done;) {
                        var s = a.value;
                        s._update(e), s.update(e)
                    }
                } catch (e) { o.e(e) } finally { o.f() }
                this.group.position.set(this.x, this.y, 0), this.group.rotation.set(0, 0, -this.rotate * Math.PI / 180), this.group.visible = this.active
            }
        }]), n
    }(),
    Al = function(e) {
        u(n, Sl);
        var t = d(n);

        function n(e) { var r; return a(this, n), (r = t.call(this)).z = 0, r.scale = 1, r.rotateX = 0, r.rotateY = 0, r.rotateZ = 0, r.nodeType = "model", r.model = e, r }
        return s(n, [{ key: "_update", value: function(e) { this.model.scale.set(this.scale, this.scale, this.scale), this.model.position.set(this.x, this.y, this.z), this.model.rotation.set(this.rotateX * Math.PI / 180, this.rotateY * Math.PI / 180, this.rotateZ * Math.PI / 180), this.model.visible = this.active } }]), n
    }(),
    Ll = function() {
        function e() { a(this, e), this.frame = 0, this.count = 1, this.track = [], this.frame = 0, this.count = 1, this.track = [], this.bindLoop = this.loop.bind(this), this.aniId = window.requestAnimationFrame(this.bindLoop) }
        return s(e, [{
            key: "loop",
            value: function() {
                for (var e in this.frame++, this.track) this.track[e].func(this.frame);
                this.aniId = window.requestAnimationFrame(this.bindLoop)
            }
        }], [{ key: "add", value: function(e) { var t = this.instance.count; return this.instance.count++, this.instance.track.push({ id: t, func: e }), t } }, {
            key: "remove",
            value: function(e) {
                if (!e) return !1;
                var t = this.instance.track.findIndex((function(t) { return t.id === e }));
                t > -1 && this.instance.track.splice(t, 1)
            }
        }, {
            key: "timeOut",
            value: function(e, t) {
                var n = this,
                    r = 0,
                    i = this.add((function(a) {++r === t && (e(), n.remove(i)) }));
                return i
            }
        }, { key: "interval", value: function(e, t) { return this.add((function(n) { n % t == 0 && e() })) } }, { key: "instance", get: function() { return this.ticker || (this.ticker = new e), this.ticker } }]), e
    }(),
    Rl = function() {
        function e(t) { a(this, e), this.nodes = [], this.canvas = t, this.itemTemp = null, this.startX = 0, this.startY = 0, this.startScale = 0, this.supTouch = "ontouchstart" in window, this.eventListener() }
        return s(e, [{
            key: "eventListener",
            value: function() {
                var e = this.supTouch ? "touchstart" : "mousedown";
                this.canvas.addEventListener(e, this.touchStart.bind(this))
            }
        }, {
            key: "touchStart",
            value: function(e) {
                this.itemTemp = null;
                for (var t = this.supTouch ? e.touches[0] : e, n = this.canvas.getBoundingClientRect(), r = this.canvas.width / n.width, i = (t.clientX - n.left) * r - this.canvas.width / 2, a = this.canvas.height / 2 - (t.clientY - n.top) * r, o = this.nodes.length - 1; o >= 0; o--) { var s = this.nodes[o]; if (s.active) { var c = s._panstart({ x: i, y: a }); if (c) return this.itemTemp = c, this.startX = c.x, void(this.startY = c.y) } }
                this.model && (this.startX = this.model.rotateX, this.startY = this.model.rotateY, this.startScale = this.model.scale, this.model.freeModeFlag = !1, this.model.tween && this.model.tween.stop(), this.model.control.autoRotate = !1, this.model.control.update())
            }
        }]), e
    }(),
    Pl = function() {
        function e(e) { cs.call(this, e), this.dracoLoader = null, this.ddsLoader = null }

        function t() { var e = {}; return { get: function(t) { return e[t] }, add: function(t, n) { e[t] = n }, remove: function(t) { delete e[t] }, removeAll: function() { e = {} } } }
        e.prototype = Object.assign(Object.create(cs.prototype), {
            constructor: e,
            load: function(e, t, n, r) {
                var i, a = this;
                i = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : $s.extractUrlBase(e), a.manager.itemStart(e);
                var o = function(t) { r ? r(t) : console.error(t), a.manager.itemError(e), a.manager.itemEnd(e) },
                    s = new ls(a.manager);
                s.setPath(this.path), s.setResponseType("arraybuffer"), "use-credentials" === a.crossOrigin && s.setWithCredentials(!0), s.load(e, (function(n) { try { a.parse(n, i, (function(n) { t(n), a.manager.itemEnd(e) }), o) } catch (e) { o(e) } }), n, o)
            },
            setDRACOLoader: function(e) { return this.dracoLoader = e, this },
            setDDSLoader: function(e) { return this.ddsLoader = e, this },
            parse: function(e, t, i, p) {
                var m, v = {};
                if ("string" == typeof e) m = e;
                else if ($s.decodeText(new Uint8Array(e, 0, 4)) === c) {
                    try { v[n.KHR_BINARY_GLTF] = new u(e) } catch (e) { return void(p && p(e)) }
                    m = v[n.KHR_BINARY_GLTF].content
                } else m = $s.decodeText(new Uint8Array(e));
                var g = JSON.parse(m);
                if (void 0 === g.asset || g.asset.version[0] < 2) p && p(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
                else {
                    if (g.extensionsUsed)
                        for (var y = 0; y < g.extensionsUsed.length; ++y) {
                            var x = g.extensionsUsed[y],
                                b = g.extensionsRequired || [];
                            switch (x) {
                                case n.KHR_LIGHTS_PUNCTUAL:
                                    v[x] = new a(g);
                                    break;
                                case n.KHR_MATERIALS_CLEARCOAT:
                                    v[x] = new s;
                                    break;
                                case n.KHR_MATERIALS_UNLIT:
                                    v[x] = new o;
                                    break;
                                case n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                                    v[x] = new d;
                                    break;
                                case n.KHR_DRACO_MESH_COMPRESSION:
                                    v[x] = new l(g, this.dracoLoader);
                                    break;
                                case n.MSFT_TEXTURE_DDS:
                                    v[x] = new r(this.ddsLoader);
                                    break;
                                case n.KHR_TEXTURE_TRANSFORM:
                                    v[x] = new h;
                                    break;
                                case n.KHR_MESH_QUANTIZATION:
                                    v[x] = new f;
                                    break;
                                default:
                                    b.indexOf(x) >= 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + x + '".')
                            }
                        }
                    new C(g, v, { path: t || this.resourcePath || "", crossOrigin: this.crossOrigin, manager: this.manager }).parse(i, p)
                }
            }
        });
        var n = { KHR_BINARY_GLTF: "KHR_binary_glTF", KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression", KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual", KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat", KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness", KHR_MATERIALS_UNLIT: "KHR_materials_unlit", KHR_TEXTURE_TRANSFORM: "KHR_texture_transform", KHR_MESH_QUANTIZATION: "KHR_mesh_quantization", MSFT_TEXTURE_DDS: "MSFT_texture_dds" };

        function r(e) {
            if (!e) throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader");
            this.name = n.MSFT_TEXTURE_DDS, this.ddsLoader = e
        }

        function a(e) {
            this.name = n.KHR_LIGHTS_PUNCTUAL;
            var t = e.extensions && e.extensions[n.KHR_LIGHTS_PUNCTUAL] || {};
            this.lightDefs = t.lights || []
        }

        function o() { this.name = n.KHR_MATERIALS_UNLIT }

        function s() { this.name = n.KHR_MATERIALS_CLEARCOAT }
        a.prototype.loadLight = function(e) {
            var t, n = this.lightDefs[e],
                r = new et(16777215);
            void 0 !== n.color && r.fromArray(n.color);
            var i = void 0 !== n.range ? n.range : 0;
            switch (n.type) {
                case "directional":
                    (t = new Zs(r)).target.position.set(0, 0, -1), t.add(t.target);
                    break;
                case "point":
                    (t = new qs(r)).distance = i;
                    break;
                case "spot":
                    (t = new Vs(r)).distance = i, n.spot = n.spot || {}, n.spot.innerConeAngle = void 0 !== n.spot.innerConeAngle ? n.spot.innerConeAngle : 0, n.spot.outerConeAngle = void 0 !== n.spot.outerConeAngle ? n.spot.outerConeAngle : Math.PI / 4, t.angle = n.spot.outerConeAngle, t.penumbra = 1 - n.spot.innerConeAngle / n.spot.outerConeAngle, t.target.position.set(0, 0, -1), t.add(t.target);
                    break;
                default:
                    throw new Error('THREE.GLTFLoader: Unexpected light type, "' + n.type + '".')
            }
            return t.position.set(0, 0, 0), t.decay = 2, void 0 !== n.intensity && (t.intensity = n.intensity), t.name = n.name || "light_" + e, Promise.resolve(t)
        }, o.prototype.getMaterialType = function() { return st }, o.prototype.extendParams = function(e, t, n) {
            var r = [];
            e.color = new et(1, 1, 1), e.opacity = 1;
            var i = t.pbrMetallicRoughness;
            if (i) {
                if (Array.isArray(i.baseColorFactor)) {
                    var a = i.baseColorFactor;
                    e.color.fromArray(a), e.opacity = a[3]
                }
                void 0 !== i.baseColorTexture && r.push(n.assignTexture(e, "map", i.baseColorTexture))
            }
            return Promise.all(r)
        }, s.prototype.getMaterialType = function() { return Fo }, s.prototype.extendParams = function(e, t, n) {
            var r = [],
                i = t.extensions[this.name];
            if (void 0 !== i.clearcoatFactor && (e.clearcoat = i.clearcoatFactor), void 0 !== i.clearcoatTexture && r.push(n.assignTexture(e, "clearcoatMap", i.clearcoatTexture)), void 0 !== i.clearcoatRoughnessFactor && (e.clearcoatRoughness = i.clearcoatRoughnessFactor), void 0 !== i.clearcoatRoughnessTexture && r.push(n.assignTexture(e, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)), void 0 !== i.clearcoatNormalTexture && (r.push(n.assignTexture(e, "clearcoatNormalMap", i.clearcoatNormalTexture)), void 0 !== i.clearcoatNormalTexture.scale)) {
                var a = i.clearcoatNormalTexture.scale;
                e.clearcoatNormalScale = new E(a, a)
            }
            return Promise.all(r)
        };
        var c = "glTF";

        function u(e) {
            this.name = n.KHR_BINARY_GLTF, this.content = null, this.body = null;
            var t = new DataView(e, 0, 12);
            if (this.header = { magic: $s.decodeText(new Uint8Array(e.slice(0, 4))), version: t.getUint32(4, !0), length: t.getUint32(8, !0) }, this.header.magic !== c) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
            if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
            for (var r = new DataView(e, 12), i = 0; i < r.byteLength;) {
                var a = r.getUint32(i, !0);
                i += 4;
                var o = r.getUint32(i, !0);
                if (i += 4, 1313821514 === o) {
                    var s = new Uint8Array(e, 12 + i, a);
                    this.content = $s.decodeText(s)
                } else if (5130562 === o) {
                    var u = 12 + i;
                    this.body = e.slice(u, u + a)
                }
                i += a
            }
            if (null === this.content) throw new Error("THREE.GLTFLoader: JSON content not found.")
        }

        function l(e, t) {
            if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
            this.name = n.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload()
        }

        function h() { this.name = n.KHR_TEXTURE_TRANSFORM }

        function p(e) {
            No.call(this), this.isGLTFSpecularGlossinessMaterial = !0;
            var t = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n"),
                n = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n"),
                r = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\ttexelSpecular = sRGBToLinear( texelSpecular );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n"),
                i = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n"),
                a = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb;", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.", "material.specularRoughness += geometryRoughness;", "material.specularRoughness = min( material.specularRoughness, 1.0 );", "material.specularColor = specularFactor.rgb;"].join("\n"),
                o = { specular: { value: (new et).setHex(16777215) }, glossiness: { value: 1 }, specularMap: { value: null }, glossinessMap: { value: null } };
            this._extraUniforms = o, this.onBeforeCompile = function(e) {
                for (var s in o) e.uniforms[s] = o[s];
                e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;"), e.fragmentShader = e.fragmentShader.replace("uniform float metalness;", "uniform float glossiness;"), e.fragmentShader = e.fragmentShader.replace("#include <roughnessmap_pars_fragment>", t), e.fragmentShader = e.fragmentShader.replace("#include <metalnessmap_pars_fragment>", n), e.fragmentShader = e.fragmentShader.replace("#include <roughnessmap_fragment>", r), e.fragmentShader = e.fragmentShader.replace("#include <metalnessmap_fragment>", i), e.fragmentShader = e.fragmentShader.replace("#include <lights_physical_fragment>", a)
            }, Object.defineProperties(this, { specular: { get: function() { return o.specular.value }, set: function(e) { o.specular.value = e } }, specularMap: { get: function() { return o.specularMap.value }, set: function(e) { o.specularMap.value = e } }, glossiness: { get: function() { return o.glossiness.value }, set: function(e) { o.glossiness.value = e } }, glossinessMap: { get: function() { return o.glossinessMap.value }, set: function(e) { o.glossinessMap.value = e, e ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_ROUGHNESSMAP = "") : (delete this.defines.USE_ROUGHNESSMAP, delete this.defines.USE_GLOSSINESSMAP) } } }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(e)
        }

        function d() {
            return {
                name: n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
                specularGlossinessParams: ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity", "refractionRatio"],
                getMaterialType: function() { return p },
                extendParams: function(e, t, n) {
                    var r = t.extensions[this.name];
                    e.color = new et(1, 1, 1), e.opacity = 1;
                    var i = [];
                    if (Array.isArray(r.diffuseFactor)) {
                        var a = r.diffuseFactor;
                        e.color.fromArray(a), e.opacity = a[3]
                    }
                    if (void 0 !== r.diffuseTexture && i.push(n.assignTexture(e, "map", r.diffuseTexture)), e.emissive = new et(0, 0, 0), e.glossiness = void 0 !== r.glossinessFactor ? r.glossinessFactor : 1, e.specular = new et(1, 1, 1), Array.isArray(r.specularFactor) && e.specular.fromArray(r.specularFactor), void 0 !== r.specularGlossinessTexture) {
                        var o = r.specularGlossinessTexture;
                        i.push(n.assignTexture(e, "glossinessMap", o)), i.push(n.assignTexture(e, "specularMap", o))
                    }
                    return Promise.all(i)
                },
                createMaterial: function(e) { var t = new p(e); return t.fog = !0, t.color = e.color, t.map = void 0 === e.map ? null : e.map, t.lightMap = null, t.lightMapIntensity = 1, t.aoMap = void 0 === e.aoMap ? null : e.aoMap, t.aoMapIntensity = 1, t.emissive = e.emissive, t.emissiveIntensity = 1, t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap, t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap, t.bumpScale = 1, t.normalMap = void 0 === e.normalMap ? null : e.normalMap, t.normalMapType = 0, e.normalScale && (t.normalScale = e.normalScale), t.displacementMap = null, t.displacementScale = 1, t.displacementBias = 0, t.specularMap = void 0 === e.specularMap ? null : e.specularMap, t.specular = e.specular, t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap, t.glossiness = e.glossiness, t.alphaMap = null, t.envMap = void 0 === e.envMap ? null : e.envMap, t.envMapIntensity = 1, t.refractionRatio = .98, t }
            }
        }

        function f() { this.name = n.KHR_MESH_QUANTIZATION }

        function m(e, t, n, r) { Wo.call(this, e, t, n, r) }
        l.prototype.decodePrimitive = function(e, t) {
            var n = this.json,
                r = this.dracoLoader,
                i = e.extensions[this.name].bufferView,
                a = e.extensions[this.name].attributes,
                o = {},
                s = {},
                c = {};
            for (var u in a) {
                var l = b[u] || u.toLowerCase();
                o[l] = a[u]
            }
            for (u in e.attributes)
                if (l = b[u] || u.toLowerCase(), void 0 !== a[u]) {
                    var h = n.accessors[e.attributes[u]],
                        p = v[h.componentType];
                    c[l] = p, s[l] = !0 === h.normalized
                }
            return t.getDependency("bufferView", i).then((function(e) {
                return new Promise((function(t) {
                    r.decodeDracoFile(e, (function(e) {
                        for (var n in e.attributes) {
                            var r = e.attributes[n],
                                i = s[n];
                            void 0 !== i && (r.normalized = i)
                        }
                        t(e)
                    }), o, c)
                }))
            }))
        }, h.prototype.extendTexture = function(e, t) { return e = e.clone(), void 0 !== t.offset && e.offset.fromArray(t.offset), void 0 !== t.rotation && (e.rotation = t.rotation), void 0 !== t.scale && e.repeat.fromArray(t.scale), void 0 !== t.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), e.needsUpdate = !0, e }, p.prototype = Object.create(No.prototype), p.prototype.constructor = p, p.prototype.copy = function(e) { return No.prototype.copy.call(this, e), this.specularMap = e.specularMap, this.specular.copy(e.specular), this.glossinessMap = e.glossinessMap, this.glossiness = e.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this }, m.prototype = Object.create(Wo.prototype), m.prototype.constructor = m, m.prototype.copySampleValue_ = function(e) { for (var t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r * 3 + r, a = 0; a !== r; a++) t[a] = n[i + a]; return t }, m.prototype.beforeStart_ = m.prototype.copySampleValue_, m.prototype.afterEnd_ = m.prototype.copySampleValue_, m.prototype.interpolate_ = function(e, t, n, r) {
            for (var i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = 2 * o, c = 3 * o, u = r - t, l = (n - t) / u, h = l * l, p = h * l, d = e * c, f = d - c, m = -2 * p + 3 * h, v = p - h, g = 1 - m, y = v - h + l, x = 0; x !== o; x++) {
                var b = a[f + x + o],
                    w = a[f + x + s] * u,
                    _ = a[d + x + o],
                    M = a[d + x] * u;
                i[x] = g * b + y * w + m * _ + v * M
            }
            return i
        };
        var v = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array },
            g = { 9728: 1003, 9729: 1006, 9984: 1004, 9985: 1007, 9986: 1005, 9987: 1008 },
            y = { 33071: 1001, 33648: 1002, 10497: 1e3 },
            x = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
            b = { POSITION: "position", NORMAL: "normal", TANGENT: "tangent", TEXCOORD_0: "uv", TEXCOORD_1: "uv2", COLOR_0: "color", WEIGHTS_0: "skinWeight", JOINTS_0: "skinIndex" },
            w = { scale: "scale", translation: "position", rotation: "quaternion", weights: "morphTargetInfluences" },
            _ = { CUBICSPLINE: void 0, LINEAR: 2301, STEP: 2300 },
            M = { "image/png": 1023, "image/jpeg": 1022 };

        function S(e, t) { return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e) }

        function A(e, t, n) { for (var r in n.extensions) void 0 === e[r] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]) }

        function L(e, t) { void 0 !== t.extras && ("object" === i(t.extras) ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras)) }

        function R(e, t) {
            if (e.updateMorphTargets(), void 0 !== t.weights)
                for (var n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
            if (t.extras && Array.isArray(t.extras.targetNames)) {
                var i = t.extras.targetNames;
                if (e.morphTargetInfluences.length === i.length)
                    for (e.morphTargetDictionary = {}, n = 0, r = i.length; n < r; n++) e.morphTargetDictionary[i[n]] = n;
                else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
            }
        }

        function P(e) { for (var t = "", n = Object.keys(e).sort(), r = 0, i = n.length; r < i; r++) t += n[r] + ":" + e[n[r]] + ";"; return t }

        function C(e, n, r) { this.json = e || {}, this.extensions = n || {}, this.options = r || {}, this.cache = new t, this.primitiveCache = {}, this.textureLoader = new vs(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.fileLoader = new ls(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0) }

        function O(e, t, n) {
            var r = t.attributes,
                i = [];

            function a(t, r) { return n.getDependency("accessor", t).then((function(t) { e.setAttribute(r, t) })) }
            for (var o in r) {
                var s = b[o] || o.toLowerCase();
                s in e.attributes || i.push(a(r[o], s))
            }
            if (void 0 !== t.indices && !e.index) {
                var c = n.getDependency("accessor", t.indices).then((function(t) { e.setIndex(t) }));
                i.push(c)
            }
            return L(e, t),
                function(e, t, n) {
                    var r = t.attributes,
                        i = new Se;
                    if (void 0 !== r.POSITION) {
                        var a = (p = n.json.accessors[r.POSITION]).min,
                            o = p.max;
                        if (void 0 !== a && void 0 !== o) {
                            i.set(new U(a[0], a[1], a[2]), new U(o[0], o[1], o[2]));
                            var s = t.targets;
                            if (void 0 !== s) {
                                for (var c = new U, u = new U, l = 0, h = s.length; l < h; l++) { var p, d = s[l]; if (void 0 !== d.POSITION) a = (p = n.json.accessors[d.POSITION]).min, o = p.max, void 0 !== a && void 0 !== o ? (u.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), u.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), u.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), c.max(u)) : console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.") }
                                i.expandByVector(c)
                            }
                            e.boundingBox = i;
                            var f = new Ae;
                            i.getCenter(f.center), f.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = f
                        } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
                    }
                }(e, t, n), Promise.all(i).then((function() {
                    return void 0 !== t.targets ? function(e, t, n) {
                        for (var r = !1, i = !1, a = 0, o = t.length; a < o && (void 0 !== (u = t[a]).POSITION && (r = !0), void 0 !== u.NORMAL && (i = !0), !r || !i); a++);
                        if (!r && !i) return Promise.resolve(e);
                        var s = [],
                            c = [];
                        for (a = 0, o = t.length; a < o; a++) {
                            var u = t[a];
                            if (r) {
                                var l = void 0 !== u.POSITION ? n.getDependency("accessor", u.POSITION) : e.attributes.position;
                                s.push(l)
                            }
                            i && (l = void 0 !== u.NORMAL ? n.getDependency("accessor", u.NORMAL) : e.attributes.normal, c.push(l))
                        }
                        return Promise.all([Promise.all(s), Promise.all(c)]).then((function(t) {
                            var n = t[0],
                                a = t[1];
                            return r && (e.morphAttributes.position = n), i && (e.morphAttributes.normal = a), e.morphTargetsRelative = !0, e
                        }))
                    }(e, t.targets, n) : e
                }))
        }

        function I(e, t) {
            var n = e.getIndex();
            if (null === n) {
                var r = [],
                    i = e.getAttribute("position");
                if (void 0 === i) return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
                for (var a = 0; a < i.count; a++) r.push(a);
                e.setIndex(r), n = e.getIndex()
            }
            var o = n.count - 2,
                s = [];
            if (2 === t)
                for (a = 1; a <= o; a++) s.push(n.getX(0)), s.push(n.getX(a)), s.push(n.getX(a + 1));
            else
                for (a = 0; a < o; a++) a % 2 == 0 ? (s.push(n.getX(a)), s.push(n.getX(a + 1)), s.push(n.getX(a + 2))) : (s.push(n.getX(a + 2)), s.push(n.getX(a + 1)), s.push(n.getX(a)));
            s.length / 3 !== o && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
            var c = e.clone();
            return c.setIndex(s), c
        }
        return C.prototype.parse = function(e, t) {
            var n = this,
                r = this.json,
                i = this.extensions;
            this.cache.removeAll(), this.markDefs(), Promise.all([this.getDependencies("scene"), this.getDependencies("animation"), this.getDependencies("camera")]).then((function(t) {
                var a = { scene: t[0][r.scene || 0], scenes: t[0], animations: t[1], cameras: t[2], asset: r.asset, parser: n, userData: {} };
                A(i, a, r), L(a, r), e(a)
            })).catch(t)
        }, C.prototype.markDefs = function() {
            for (var e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [], r = {}, i = {}, a = 0, o = t.length; a < o; a++)
                for (var s = t[a].joints, c = 0, u = s.length; c < u; c++) e[s[c]].isBone = !0;
            for (var l = 0, h = e.length; l < h; l++) {
                var p = e[l];
                void 0 !== p.mesh && (void 0 === r[p.mesh] && (r[p.mesh] = i[p.mesh] = 0), r[p.mesh]++, void 0 !== p.skin && (n[p.mesh].isSkinnedMesh = !0))
            }
            this.json.meshReferences = r, this.json.meshUses = i
        }, C.prototype.getDependency = function(e, t) {
            var r = e + ":" + t,
                i = this.cache.get(r);
            if (!i) {
                switch (e) {
                    case "scene":
                        i = this.loadScene(t);
                        break;
                    case "node":
                        i = this.loadNode(t);
                        break;
                    case "mesh":
                        i = this.loadMesh(t);
                        break;
                    case "accessor":
                        i = this.loadAccessor(t);
                        break;
                    case "bufferView":
                        i = this.loadBufferView(t);
                        break;
                    case "buffer":
                        i = this.loadBuffer(t);
                        break;
                    case "material":
                        i = this.loadMaterial(t);
                        break;
                    case "texture":
                        i = this.loadTexture(t);
                        break;
                    case "skin":
                        i = this.loadSkin(t);
                        break;
                    case "animation":
                        i = this.loadAnimation(t);
                        break;
                    case "camera":
                        i = this.loadCamera(t);
                        break;
                    case "light":
                        i = this.extensions[n.KHR_LIGHTS_PUNCTUAL].loadLight(t);
                        break;
                    default:
                        throw new Error("Unknown type: " + e)
                }
                this.cache.add(r, i)
            }
            return i
        }, C.prototype.getDependencies = function(e) {
            var t = this.cache.get(e);
            if (!t) {
                var n = this,
                    r = this.json[e + ("mesh" === e ? "es" : "s")] || [];
                t = Promise.all(r.map((function(t, r) { return n.getDependency(e, r) }))), this.cache.add(e, t)
            }
            return t
        }, C.prototype.loadBuffer = function(e) {
            var t = this.json.buffers[e],
                r = this.fileLoader;
            if (t.type && "arraybuffer" !== t.type) throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
            if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[n.KHR_BINARY_GLTF].body);
            var i = this.options;
            return new Promise((function(e, n) { r.load(S(t.uri, i.path), e, void 0, (function() { n(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".')) })) }))
        }, C.prototype.loadBufferView = function(e) {
            var t = this.json.bufferViews[e];
            return this.getDependency("buffer", t.buffer).then((function(e) {
                var n = t.byteLength || 0,
                    r = t.byteOffset || 0;
                return e.slice(r, r + n)
            }))
        }, C.prototype.loadAccessor = function(e) {
            var t = this,
                n = this.json,
                r = this.json.accessors[e];
            if (void 0 === r.bufferView && void 0 === r.sparse) return Promise.resolve(null);
            var i = [];
            return void 0 !== r.bufferView ? i.push(this.getDependency("bufferView", r.bufferView)) : i.push(null), void 0 !== r.sparse && (i.push(this.getDependency("bufferView", r.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", r.sparse.values.bufferView))), Promise.all(i).then((function(e) {
                var i, a = e[0],
                    o = x[r.type],
                    s = v[r.componentType],
                    c = s.BYTES_PER_ELEMENT,
                    u = c * o,
                    l = r.byteOffset || 0,
                    h = void 0 !== r.bufferView ? n.bufferViews[r.bufferView].byteStride : void 0,
                    p = !0 === r.normalized;
                if (h && h !== u) {
                    var d = Math.floor(l / h),
                        f = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + d + ":" + r.count,
                        m = t.cache.get(f);
                    m || (m = new bi(new s(a, d * h, r.count * h / c), h / c), t.cache.add(f, m)), i = new Mi(m, o, l % h / c, p)
                } else i = new ut(null === a ? new s(r.count * o) : new s(a, l, r.count * o), o, p);
                if (void 0 !== r.sparse) {
                    var g = x.SCALAR,
                        y = v[r.sparse.indices.componentType],
                        b = r.sparse.indices.byteOffset || 0,
                        w = r.sparse.values.byteOffset || 0,
                        _ = new y(e[1], b, r.sparse.count * g),
                        M = new s(e[2], w, r.sparse.count * o);
                    null !== a && (i = new ut(i.array.slice(), i.itemSize, i.normalized));
                    for (var S = 0, T = _.length; S < T; S++) { var E = _[S]; if (i.setX(E, M[S * o]), o >= 2 && i.setY(E, M[S * o + 1]), o >= 3 && i.setZ(E, M[S * o + 2]), o >= 4 && i.setW(E, M[S * o + 3]), o >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.") }
                }
                return i
            }))
        }, C.prototype.loadTexture = function(e) {
            var t, r = this,
                i = this.json,
                a = this.options,
                o = this.textureLoader,
                s = self.URL || self.webkitURL,
                c = i.textures[e],
                u = c.extensions || {},
                l = (t = u[n.MSFT_TEXTURE_DDS] ? i.images[u[n.MSFT_TEXTURE_DDS].source] : i.images[c.source]).uri,
                h = !1;
            return void 0 !== t.bufferView && (l = r.getDependency("bufferView", t.bufferView).then((function(e) { h = !0; var n = new Blob([e], { type: t.mimeType }); return l = s.createObjectURL(n) }))), Promise.resolve(l).then((function(e) { var t = a.manager.getHandler(e); return t || (t = u[n.MSFT_TEXTURE_DDS] ? r.extensions[n.MSFT_TEXTURE_DDS].ddsLoader : o), new Promise((function(n, r) { t.load(S(e, a.path), n, void 0, r) })) })).then((function(e) {!0 === h && s.revokeObjectURL(l), e.flipY = !1, c.name && (e.name = c.name), t.mimeType in M && (e.format = M[t.mimeType]); var n = (i.samplers || {})[c.sampler] || {}; return e.magFilter = g[n.magFilter] || 1006, e.minFilter = g[n.minFilter] || 1008, e.wrapS = y[n.wrapS] || 1e3, e.wrapT = y[n.wrapT] || 1e3, e }))
        }, C.prototype.assignTexture = function(e, t, r) {
            var i = this;
            return this.getDependency("texture", r.index).then((function(a) {
                if (!a.isCompressedTexture) switch (t) {
                    case "aoMap":
                    case "emissiveMap":
                    case "metalnessMap":
                    case "normalMap":
                    case "roughnessMap":
                        a.format = 1022
                }
                if (void 0 === r.texCoord || 0 == r.texCoord || "aoMap" === t && 1 == r.texCoord || console.warn("THREE.GLTFLoader: Custom UV set " + r.texCoord + " for texture " + t + " not yet supported."), i.extensions[n.KHR_TEXTURE_TRANSFORM]) {
                    var o = void 0 !== r.extensions ? r.extensions[n.KHR_TEXTURE_TRANSFORM] : void 0;
                    o && (a = i.extensions[n.KHR_TEXTURE_TRANSFORM].extendTexture(a, o))
                }
                e[t] = a
            }))
        }, C.prototype.assignFinalMaterial = function(e) {
            var t = e.geometry,
                n = e.material,
                r = void 0 !== t.attributes.tangent,
                i = void 0 !== t.attributes.color,
                a = void 0 === t.attributes.normal,
                o = !0 === e.isSkinnedMesh,
                s = Object.keys(t.morphAttributes).length > 0,
                c = s && void 0 !== t.morphAttributes.normal;
            if (e.isPoints) {
                var u = "PointsMaterial:" + n.uuid,
                    l = this.cache.get(u);
                l || (l = new ua, ot.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, l.sizeAttenuation = !1, this.cache.add(u, l)), n = l
            } else if (e.isLine) {
                u = "LineBasicMaterial:" + n.uuid;
                var h = this.cache.get(u);
                h || (h = new Qi, ot.prototype.copy.call(h, n), h.color.copy(n.color), this.cache.add(u, h)), n = h
            }
            if (r || i || a || o || s) {
                u = "ClonedMaterial:" + n.uuid + ":", n.isGLTFSpecularGlossinessMaterial && (u += "specular-glossiness:"), o && (u += "skinning:"), r && (u += "vertex-tangents:"), i && (u += "vertex-colors:"), a && (u += "flat-shading:"), s && (u += "morph-targets:"), c && (u += "morph-normals:");
                var p = this.cache.get(u);
                p || (p = n.clone(), o && (p.skinning = !0), r && (p.vertexTangents = !0), i && (p.vertexColors = !0), a && (p.flatShading = !0), s && (p.morphTargets = !0), c && (p.morphNormals = !0), this.cache.add(u, p)), n = p
            }
            n.aoMap && void 0 === t.attributes.uv2 && void 0 !== t.attributes.uv && t.setAttribute("uv2", new ut(t.attributes.uv.array, 2)), n.normalScale && !r && (n.normalScale.y = -n.normalScale.y), n.clearcoatNormalScale && !r && (n.clearcoatNormalScale.y = -n.clearcoatNormalScale.y), e.material = n
        }, C.prototype.loadMaterial = function(e) {
            var t, r = this.json,
                i = this.extensions,
                a = r.materials[e],
                o = {},
                s = a.extensions || {},
                c = [];
            if (s[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
                var u = i[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
                t = u.getMaterialType(), c.push(u.extendParams(o, a, this))
            } else if (s[n.KHR_MATERIALS_UNLIT]) {
                var l = i[n.KHR_MATERIALS_UNLIT];
                t = l.getMaterialType(), c.push(l.extendParams(o, a, this))
            } else {
                t = No;
                var h = a.pbrMetallicRoughness || {};
                if (o.color = new et(1, 1, 1), o.opacity = 1, Array.isArray(h.baseColorFactor)) {
                    var d = h.baseColorFactor;
                    o.color.fromArray(d), o.opacity = d[3]
                }
                void 0 !== h.baseColorTexture && c.push(this.assignTexture(o, "map", h.baseColorTexture)), o.metalness = void 0 !== h.metallicFactor ? h.metallicFactor : 1, o.roughness = void 0 !== h.roughnessFactor ? h.roughnessFactor : 1, void 0 !== h.metallicRoughnessTexture && (c.push(this.assignTexture(o, "metalnessMap", h.metallicRoughnessTexture)), c.push(this.assignTexture(o, "roughnessMap", h.metallicRoughnessTexture)))
            }!0 === a.doubleSided && (o.side = 2);
            var f = a.alphaMode || "OPAQUE";
            if ("BLEND" === f ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, "MASK" === f && (o.alphaTest = void 0 !== a.alphaCutoff ? a.alphaCutoff : .5)), void 0 !== a.normalTexture && t !== st && (c.push(this.assignTexture(o, "normalMap", a.normalTexture)), o.normalScale = new E(1, 1), void 0 !== a.normalTexture.scale && o.normalScale.set(a.normalTexture.scale, a.normalTexture.scale)), void 0 !== a.occlusionTexture && t !== st && (c.push(this.assignTexture(o, "aoMap", a.occlusionTexture)), void 0 !== a.occlusionTexture.strength && (o.aoMapIntensity = a.occlusionTexture.strength)), void 0 !== a.emissiveFactor && t !== st && (o.emissive = (new et).fromArray(a.emissiveFactor)), void 0 !== a.emissiveTexture && t !== st && c.push(this.assignTexture(o, "emissiveMap", a.emissiveTexture)), s[n.KHR_MATERIALS_CLEARCOAT]) {
                var m = i[n.KHR_MATERIALS_CLEARCOAT];
                t = m.getMaterialType(), c.push(m.extendParams(o, { extensions: s }, this))
            }
            return Promise.all(c).then((function() { var e; return e = t === p ? i[n.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(o) : new t(o), a.name && (e.name = a.name), e.map && (e.map.encoding = 3001), e.emissiveMap && (e.emissiveMap.encoding = 3001), L(e, a), a.extensions && A(i, e, a), e }))
        }, C.prototype.loadGeometries = function(e) {
            var t = this,
                r = this.extensions,
                i = this.primitiveCache;

            function a(e) { return r[n.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then((function(n) { return O(n, e, t) })) }
            for (var o, s, c = [], u = 0, l = e.length; u < l; u++) {
                var h, p = e[u],
                    d = (void 0, (s = (o = p).extensions && o.extensions[n.KHR_DRACO_MESH_COMPRESSION]) ? "draco:" + s.bufferView + ":" + s.indices + ":" + P(s.attributes) : o.indices + ":" + P(o.attributes) + ":" + o.mode),
                    f = i[d];
                f ? c.push(f.promise) : (h = p.extensions && p.extensions[n.KHR_DRACO_MESH_COMPRESSION] ? a(p) : O(new Lt, p, t), i[d] = { primitive: p, promise: h }, c.push(h))
            }
            return Promise.all(c)
        }, C.prototype.loadMesh = function(e) {
            for (var t, n = this, r = this.json.meshes[e], i = r.primitives, a = [], o = 0, s = i.length; o < s; o++) {
                var c = void 0 === i[o].material ? (void 0 === (t = this.cache).DefaultMaterial && (t.DefaultMaterial = new No({ color: 16777215, emissive: 0, metalness: 1, roughness: 1, transparent: !1, depthTest: !0, side: 0 })), t.DefaultMaterial) : this.getDependency("material", i[o].material);
                a.push(c)
            }
            return a.push(n.loadGeometries(i)), Promise.all(a).then((function(t) {
                for (var a = t.slice(0, t.length - 1), o = t[t.length - 1], s = [], c = 0, u = o.length; c < u; c++) {
                    var l, h = o[c],
                        p = i[c],
                        d = a[c];
                    if (4 === p.mode || 5 === p.mode || 6 === p.mode || void 0 === p.mode) !0 !== (l = !0 === r.isSkinnedMesh ? new Hi(h, d) : new qt(h, d)).isSkinnedMesh || l.geometry.attributes.skinWeight.normalized || l.normalizeSkinWeights(), 5 === p.mode ? l.geometry = I(l.geometry, 1) : 6 === p.mode && (l.geometry = I(l.geometry, 2));
                    else if (1 === p.mode) l = new sa(h, d);
                    else if (3 === p.mode) l = new ia(h, d);
                    else if (2 === p.mode) l = new ca(h, d);
                    else {
                        if (0 !== p.mode) throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
                        l = new fa(h, d)
                    }
                    Object.keys(l.geometry.morphAttributes).length > 0 && R(l, r), l.name = r.name || "mesh_" + e, o.length > 1 && (l.name += "_" + c), L(l, r), n.assignFinalMaterial(l), s.push(l)
                }
                if (1 === s.length) return s[0];
                var f = new mi;
                for (c = 0, u = s.length; c < u; c++) f.add(s[c]);
                return f
            }))
        }, C.prototype.loadCamera = function(e) {
            var t, n = this.json.cameras[e],
                r = n[n.type];
            if (r) return "perspective" === n.type ? t = new cn(T.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2e6) : "orthographic" === n.type && (t = new Xs(r.xmag / -2, r.xmag / 2, r.ymag / 2, r.ymag / -2, r.znear, r.zfar)), n.name && (t.name = n.name), L(t, n), Promise.resolve(t);
            console.warn("THREE.GLTFLoader: Missing camera parameters.")
        }, C.prototype.loadSkin = function(e) {
            var t = this.json.skins[e],
                n = { joints: t.joints };
            return void 0 === t.inverseBindMatrices ? Promise.resolve(n) : this.getDependency("accessor", t.inverseBindMatrices).then((function(e) { return n.inverseBindMatrices = e, n }))
        }, C.prototype.loadAnimation = function(e) {
            for (var t = this.json.animations[e], n = [], r = [], i = [], a = [], o = [], s = 0, c = t.channels.length; s < c; s++) {
                var u = t.channels[s],
                    l = t.samplers[u.sampler],
                    h = u.target,
                    p = void 0 !== h.node ? h.node : h.id,
                    d = void 0 !== t.parameters ? t.parameters[l.input] : l.input,
                    f = void 0 !== t.parameters ? t.parameters[l.output] : l.output;
                n.push(this.getDependency("node", p)), r.push(this.getDependency("accessor", d)), i.push(this.getDependency("accessor", f)), a.push(l), o.push(h)
            }
            return Promise.all([Promise.all(n), Promise.all(r), Promise.all(i), Promise.all(a), Promise.all(o)]).then((function(n) {
                for (var r = n[0], i = n[1], a = n[2], o = n[3], s = n[4], c = [], u = 0, l = r.length; u < l; u++) {
                    var h = r[u],
                        p = i[u],
                        d = a[u],
                        f = o[u],
                        v = s[u];
                    if (void 0 !== h) {
                        var g;
                        switch (h.updateMatrix(), h.matrixAutoUpdate = !0, w[v.path]) {
                            case w.weights:
                                g = Qo;
                                break;
                            case w.rotation:
                                g = es;
                                break;
                            case w.position:
                            case w.scale:
                            default:
                                g = ns
                        }
                        var y = h.name ? h.name : h.uuid,
                            x = void 0 !== f.interpolation ? _[f.interpolation] : 2301,
                            b = [];
                        w[v.path] === w.weights ? h.traverse((function(e) {!0 === e.isMesh && e.morphTargetInfluences && b.push(e.name ? e.name : e.uuid) })) : b.push(y);
                        var M = d.array;
                        if (d.normalized) {
                            var S;
                            if (M.constructor === Int8Array) S = 1 / 127;
                            else if (M.constructor === Uint8Array) S = 1 / 255;
                            else if (M.constructor == Int16Array) S = 1 / 32767;
                            else {
                                if (M.constructor !== Uint16Array) throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");
                                S = 1 / 65535
                            }
                            for (var T = new Float32Array(M.length), E = 0, A = M.length; E < A; E++) T[E] = M[E] * S;
                            M = T
                        }
                        for (E = 0, A = b.length; E < A; E++) { var L = new g(b[E] + "." + w[v.path], p.array, M, x); "CUBICSPLINE" === f.interpolation && (L.createInterpolant = function(e) { return new m(this.times, this.values, this.getValueSize() / 3, e) }, L.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), c.push(L) }
                    }
                }
                return new rs(t.name ? t.name : "animation_" + e, void 0, c)
            }))
        }, C.prototype.loadNode = function(e) {
            var t, r = this.json,
                i = this.extensions,
                a = this,
                o = r.meshReferences,
                s = r.meshUses,
                c = r.nodes[e];
            return (t = [], void 0 !== c.mesh && t.push(a.getDependency("mesh", c.mesh).then((function(e) {
                var t;
                if (o[c.mesh] > 1) {
                    var n = s[c.mesh]++;
                    (t = e.clone()).name += "_instance_" + n
                } else t = e;
                return void 0 !== c.weights && t.traverse((function(e) {
                    if (e.isMesh)
                        for (var t = 0, n = c.weights.length; t < n; t++) e.morphTargetInfluences[t] = c.weights[t]
                })), t
            }))), void 0 !== c.camera && t.push(a.getDependency("camera", c.camera)), c.extensions && c.extensions[n.KHR_LIGHTS_PUNCTUAL] && void 0 !== c.extensions[n.KHR_LIGHTS_PUNCTUAL].light && t.push(a.getDependency("light", c.extensions[n.KHR_LIGHTS_PUNCTUAL].light)), Promise.all(t)).then((function(e) {
                var t;
                if ((t = !0 === c.isBone ? new qi : e.length > 1 ? new mi : 1 === e.length ? e[0] : new ue) !== e[0])
                    for (var n = 0, r = e.length; n < r; n++) t.add(e[n]);
                if (c.name && (t.userData.name = c.name, t.name = qc.sanitizeNodeName(c.name)), L(t, c), c.extensions && A(i, t, c), void 0 !== c.matrix) {
                    var a = new W;
                    a.fromArray(c.matrix), t.applyMatrix4(a)
                } else void 0 !== c.translation && t.position.fromArray(c.translation), void 0 !== c.rotation && t.quaternion.fromArray(c.rotation), void 0 !== c.scale && t.scale.fromArray(c.scale);
                return t
            }))
        }, C.prototype.loadScene = function() {
            function e(t, n, r, i) {
                var a = r.nodes[t];
                return i.getDependency("node", t).then((function(e) {
                    return void 0 === a.skin ? e : i.getDependency("skin", a.skin).then((function(e) { for (var n = [], r = 0, a = (t = e).joints.length; r < a; r++) n.push(i.getDependency("node", t.joints[r])); return Promise.all(n) })).then((function(n) {
                        return e.traverse((function(e) {
                            if (e.isMesh) {
                                for (var r = [], i = [], a = 0, o = n.length; a < o; a++) {
                                    var s = n[a];
                                    if (s) {
                                        r.push(s);
                                        var c = new W;
                                        void 0 !== t.inverseBindMatrices && c.fromArray(t.inverseBindMatrices.array, 16 * a), i.push(c)
                                    } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[a])
                                }
                                e.bind(new Wi(r, i), e.matrixWorld)
                            }
                        })), e
                    }));
                    var t
                })).then((function(t) {
                    n.add(t);
                    var o = [];
                    if (a.children)
                        for (var s = a.children, c = 0, u = s.length; c < u; c++) {
                            var l = s[c];
                            o.push(e(l, t, r, i))
                        }
                    return Promise.all(o)
                }))
            }
            return function(t) {
                var n = this.json,
                    r = this.extensions,
                    i = this.json.scenes[t],
                    a = new mi;
                i.name && (a.name = i.name), L(a, i), i.extensions && A(r, a, i);
                for (var o = i.nodes || [], s = [], c = 0, u = o.length; c < u; c++) s.push(e(o[c], a, n, this));
                return Promise.all(s).then((function() { return a }))
            }
        }(), e
    }(),
    Cl = function(e) { cs.call(this, e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = { position: "POSITION", normal: "NORMAL", color: "COLOR", uv: "TEX_COORD" }, this.defaultAttributeTypes = { position: "Float32Array", normal: "Float32Array", color: "Float32Array", uv: "Float32Array" } };
Cl.prototype = Object.assign(Object.create(cs.prototype), {
    constructor: Cl,
    setDecoderPath: function(e) { return this.decoderPath = e, this },
    setDecoderConfig: function(e) { return this.decoderConfig = e, this },
    setWorkerLimit: function(e) { return this.workerLimit = e, this },
    setVerbosity: function() { console.warn("THREE.DRACOLoader: The .setVerbosity() method has been removed.") },
    setDrawMode: function() { console.warn("THREE.DRACOLoader: The .setDrawMode() method has been removed.") },
    setSkipDequantization: function() { console.warn("THREE.DRACOLoader: The .setSkipDequantization() method has been removed.") },
    load: function(e, t, n, r) {
        var i = this,
            a = new ls(this.manager);
        a.setPath(this.path), a.setResponseType("arraybuffer"), "use-credentials" === this.crossOrigin && a.setWithCredentials(!0), a.load(e, (function(e) {
            var n = { attributeIDs: i.defaultAttributeIDs, attributeTypes: i.defaultAttributeTypes, useUniqueIDs: !1 };
            i.decodeGeometry(e, n).then(t).catch(r)
        }), n, r)
    },
    decodeDracoFile: function(e, t, n, r) {
        var i = { attributeIDs: n || this.defaultAttributeIDs, attributeTypes: r || this.defaultAttributeTypes, useUniqueIDs: !!n };
        this.decodeGeometry(e, i).then(t)
    },
    decodeGeometry: function(e, t) {
        var n = this;
        for (var r in t.attributeTypes) {
            var i = t.attributeTypes[r];
            void 0 !== i.BYTES_PER_ELEMENT && (t.attributeTypes[r] = i.name)
        }
        var a, o = JSON.stringify(t);
        if (Cl.taskCache.has(e)) { var s = Cl.taskCache.get(e); if (s.key === o) return s.promise; if (0 === e.byteLength) throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.") }
        var c = this.workerNextTaskID++,
            u = e.byteLength,
            l = this._getWorker(c, u).then((function(n) { return a = n, new Promise((function(n, r) { a._callbacks[c] = { resolve: n, reject: r }, a.postMessage({ type: "decode", id: c, taskConfig: t, buffer: e }, [e]) })) })).then((function(e) { return n._createGeometry(e.geometry) }));
        return l.finally((function() { a && c && n._releaseTask(a, c) })), Cl.taskCache.set(e, { key: o, promise: l }), l
    },
    _createGeometry: function(e) {
        var t = new Lt;
        e.index && t.setIndex(new ut(e.index.array, 1));
        for (var n = 0; n < e.attributes.length; n++) {
            var r = e.attributes[n],
                i = r.name,
                a = r.array,
                o = r.itemSize;
            t.setAttribute(i, new ut(a, o))
        }
        return t
    },
    _loadLibrary: function(e, t) { var n = new ls(this.manager); return n.setPath(this.decoderPath), n.setResponseType(t), new Promise((function(t, r) { n.load(e, t, void 0, r) })) },
    preload: function() { return this._initDecoder(), this },
    _initDecoder: function() {
        var e = this;
        if (this.decoderPending) return this.decoderPending;
        var t = "object" !== ("undefined" == typeof WebAssembly ? "undefined" : i(WebAssembly)) || "js" === this.decoderConfig.type,
            n = [];
        return t ? n.push(this._loadLibrary("draco_decoder.js", "text")) : (n.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), n.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(n).then((function(n) {
            var r = n[0];
            t || (e.decoderConfig.wasmBinary = n[1]);
            var i = Cl.DRACOWorker.toString(),
                a = ["/* draco decoder */", r, "", "/* worker */", i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))].join("\n");
            e.workerSourceURL = URL.createObjectURL(new Blob([a]))
        })), this.decoderPending
    },
    _getWorker: function(e, t) {
        var n = this;
        return this._initDecoder().then((function() {
            var r;
            return n.workerPool.length < n.workerLimit ? ((r = new Worker(n.workerSourceURL))._callbacks = {}, r._taskCosts = {}, r._taskLoad = 0, r.postMessage({ type: "init", decoderConfig: n.decoderConfig }), r.onmessage = function(e) {
                var t = e.data;
                switch (t.type) {
                    case "decode":
                        r._callbacks[t.id].resolve(t);
                        break;
                    case "error":
                        r._callbacks[t.id].reject(t);
                        break;
                    default:
                        console.error('THREE.DRACOLoader: Unexpected message, "' + t.type + '"')
                }
            }, n.workerPool.push(r)) : n.workerPool.sort((function(e, t) { return e._taskLoad > t._taskLoad ? -1 : 1 })), (r = n.workerPool[n.workerPool.length - 1])._taskCosts[e] = t, r._taskLoad += t, r
        }))
    },
    _releaseTask: function(e, t) { e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t] },
    debug: function() { console.log("Task load: ", this.workerPool.map((function(e) { return e._taskLoad }))) },
    dispose: function() { for (var e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate(); return this.workerPool.length = 0, this }
}), Cl.DRACOWorker = function() {
    var e, t;

    function n(e, t, n, r, i, a) {
        var o, s, c = a.num_components(),
            u = n.num_points() * c;
        switch (i) {
            case Float32Array:
                o = new e.DracoFloat32Array, t.GetAttributeFloatForAllPoints(n, a, o), s = new Float32Array(u);
                break;
            case Int8Array:
                o = new e.DracoInt8Array, t.GetAttributeInt8ForAllPoints(n, a, o), s = new Int8Array(u);
                break;
            case Int16Array:
                o = new e.DracoInt16Array, t.GetAttributeInt16ForAllPoints(n, a, o), s = new Int16Array(u);
                break;
            case Int32Array:
                o = new e.DracoInt32Array, t.GetAttributeInt32ForAllPoints(n, a, o), s = new Int32Array(u);
                break;
            case Uint8Array:
                o = new e.DracoUInt8Array, t.GetAttributeUInt8ForAllPoints(n, a, o), s = new Uint8Array(u);
                break;
            case Uint16Array:
                o = new e.DracoUInt16Array, t.GetAttributeUInt16ForAllPoints(n, a, o), s = new Uint16Array(u);
                break;
            case Uint32Array:
                o = new e.DracoUInt32Array, t.GetAttributeUInt32ForAllPoints(n, a, o), s = new Uint32Array(u);
                break;
            default:
                throw new Error("THREE.DRACOLoader: Unexpected attribute type.")
        }
        for (var l = 0; l < u; l++) s[l] = o.GetValue(l);
        return e.destroy(o), { name: r, array: s, itemSize: c }
    }
    onmessage = function(r) {
        var i = r.data;
        switch (i.type) {
            case "init":
                e = i.decoderConfig, t = new Promise((function(t) { e.onModuleLoaded = function(e) { t({ draco: e }) }, DracoDecoderModule(e) }));
                break;
            case "decode":
                var a = i.buffer,
                    o = i.taskConfig;
                t.then((function(e) {
                    var t = e.draco,
                        r = new t.Decoder,
                        s = new t.DecoderBuffer;
                    s.Init(new Int8Array(a), a.byteLength);
                    try {
                        var c = function(e, t, r, i) {
                                var a, o, s = i.attributeIDs,
                                    c = i.attributeTypes,
                                    u = t.GetEncodedGeometryType(r);
                                if (u === e.TRIANGULAR_MESH) a = new e.Mesh, o = t.DecodeBufferToMesh(r, a);
                                else {
                                    if (u !== e.POINT_CLOUD) throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
                                    a = new e.PointCloud, o = t.DecodeBufferToPointCloud(r, a)
                                }
                                if (!o.ok() || 0 === a.ptr) throw new Error("THREE.DRACOLoader: Decoding failed: " + o.error_msg());
                                var l = { index: null, attributes: [] };
                                for (var h in s) {
                                    var p, d, f = self[c[h]];
                                    if (i.useUniqueIDs) d = s[h], p = t.GetAttributeByUniqueId(a, d);
                                    else {
                                        if (-1 === (d = t.GetAttributeId(a, e[s[h]]))) continue;
                                        p = t.GetAttribute(a, d)
                                    }
                                    l.attributes.push(n(e, t, a, h, f, p))
                                }
                                if (u === e.TRIANGULAR_MESH) {
                                    for (var m = a.num_faces(), v = new Uint32Array(3 * m), g = new e.DracoInt32Array, y = 0; y < m; ++y) { t.GetFaceFromMesh(a, y, g); for (var x = 0; x < 3; ++x) v[3 * y + x] = g.GetValue(x) }
                                    l.index = { array: v, itemSize: 1 }, e.destroy(g)
                                }
                                return e.destroy(a), l
                            }(t, r, s, o),
                            u = c.attributes.map((function(e) { return e.array.buffer }));
                        c.index && u.push(c.index.array.buffer), self.postMessage({ type: "decode", id: i.id, geometry: c }, u)
                    } catch (e) { console.error(e), self.postMessage({ type: "error", id: i.id, error: e.message }) } finally { t.destroy(s), t.destroy(r) }
                }))
        }
    }
}, Cl.taskCache = new WeakMap, Cl.setDecoderPath = function() { console.warn("THREE.DRACOLoader: The .setDecoderPath() method has been removed. Use instance methods.") }, Cl.setDecoderConfig = function() { console.warn("THREE.DRACOLoader: The .setDecoderConfig() method has been removed. Use instance methods.") }, Cl.releaseDecoderModule = function() { console.warn("THREE.DRACOLoader: The .releaseDecoderModule() method has been removed. Use instance methods.") }, Cl.getDecoderModule = function() { console.warn("THREE.DRACOLoader: The .getDecoderModule() method has been removed. Use instance methods.") };
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
var Ol = {},
    Il = void 0,
    Dl = Ol;

function Nl(e, t) {
    var n, r = e.split("."),
        i = Dl;
    !(r[0] in i) && i.execScript && i.execScript("var " + r[0]);
    for (; r.length && (n = r.shift());) r.length || t === Il ? i = i[n] ? i[n] : i[n] = {} : i[n] = t
}
var Fl = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array && "undefined" != typeof DataView;

function Ul(e) {
    var t, n, r, i, a, o, s, c, u, l, h = e.length,
        p = 0,
        d = Number.POSITIVE_INFINITY;
    for (c = 0; c < h; ++c) e[c] > p && (p = e[c]), e[c] < d && (d = e[c]);
    for (t = 1 << p, n = new(Fl ? Uint32Array : Array)(t), r = 1, i = 0, a = 2; r <= p;) {
        for (c = 0; c < h; ++c)
            if (e[c] === r) { for (o = 0, s = i, u = 0; u < r; ++u) o = o << 1 | 1 & s, s >>= 1; for (l = r << 16 | c, u = o; u < t; u += a) n[u] = l;++i }++r, i <<= 1, a <<= 1
    }
    return [n, p, d]
}

function Bl(e, t) {
    switch (this.g = [], this.h = 32768, this.d = this.f = this.a = this.l = 0, this.input = Fl ? new Uint8Array(e) : e, this.m = !1, this.i = zl, this.r = !1, !t && (t = {}) || (t.index && (this.a = t.index), t.bufferSize && (this.h = t.bufferSize), t.bufferType && (this.i = t.bufferType), t.resize && (this.r = t.resize)), this.i) {
        case kl:
            this.b = 32768, this.c = new(Fl ? Uint8Array : Array)(32768 + this.h + 258);
            break;
        case zl:
            this.b = 0, this.c = new(Fl ? Uint8Array : Array)(this.h), this.e = this.z, this.n = this.v, this.j = this.w;
            break;
        default:
            throw Error("invalid inflate mode")
    }
}
var kl = 0,
    zl = 1,
    Gl = { t: kl, s: zl };
Bl.prototype.k = function() {
    for (; !this.m;) {
        var e = oh(this, 3);
        switch (1 & e && (this.m = !0), e >>>= 1) {
            case 0:
                var t = this.input,
                    n = this.a,
                    r = this.c,
                    i = this.b,
                    a = t.length,
                    o = Il,
                    s = r.length,
                    c = Il;
                if (this.d = this.f = 0, n + 1 >= a) throw Error("invalid uncompressed block header: LEN");
                if (o = t[n++] | t[n++] << 8, n + 1 >= a) throw Error("invalid uncompressed block header: NLEN");
                if (o === ~(t[n++] | t[n++] << 8)) throw Error("invalid uncompressed block header: length verify");
                if (n + o > t.length) throw Error("input buffer is broken");
                switch (this.i) {
                    case kl:
                        for (; i + o > r.length;) {
                            if (o -= c = s - i, Fl) r.set(t.subarray(n, n + c), i), i += c, n += c;
                            else
                                for (; c--;) r[i++] = t[n++];
                            this.b = i, r = this.e(), i = this.b
                        }
                        break;
                    case zl:
                        for (; i + o > r.length;) r = this.e({ p: 2 });
                        break;
                    default:
                        throw Error("invalid inflate mode")
                }
                if (Fl) r.set(t.subarray(n, n + o), i), i += o, n += o;
                else
                    for (; o--;) r[i++] = t[n++];
                this.a = n, this.b = i, this.c = r;
                break;
            case 1:
                this.j(rh, ah);
                break;
            case 2:
                var u, l, h, p, d = oh(this, 5) + 257,
                    f = oh(this, 5) + 1,
                    m = oh(this, 4) + 4,
                    v = new(Fl ? Uint8Array : Array)(Wl.length),
                    g = Il,
                    y = Il,
                    x = Il,
                    b = Il,
                    w = Il;
                for (w = 0; w < m; ++w) v[Wl[w]] = oh(this, 3);
                if (!Fl)
                    for (w = m, m = v.length; w < m; ++w) v[Wl[w]] = 0;
                for (u = Ul(v), g = new(Fl ? Uint8Array : Array)(d + f), w = 0, p = d + f; w < p;) switch (y = sh(this, u)) {
                    case 16:
                        for (b = 3 + oh(this, 2); b--;) g[w++] = x;
                        break;
                    case 17:
                        for (b = 3 + oh(this, 3); b--;) g[w++] = 0;
                        x = 0;
                        break;
                    case 18:
                        for (b = 11 + oh(this, 7); b--;) g[w++] = 0;
                        x = 0;
                        break;
                    default:
                        x = g[w++] = y
                }
                l = Ul(Fl ? g.subarray(0, d) : g.slice(0, d)), h = Ul(Fl ? g.subarray(d) : g.slice(d)), this.j(l, h);
                break;
            default:
                throw Error("unknown BTYPE: " + e)
        }
    }
    return this.n()
};
var Hl, jl, Vl = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    Wl = Fl ? new Uint16Array(Vl) : Vl,
    ql = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258],
    Xl = Fl ? new Uint16Array(ql) : ql,
    Yl = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0],
    Zl = Fl ? new Uint8Array(Yl) : Yl,
    Jl = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
    Kl = Fl ? new Uint16Array(Jl) : Jl,
    Ql = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
    $l = Fl ? new Uint8Array(Ql) : Ql,
    eh = new(Fl ? Uint8Array : Array)(288);
for (Hl = 0, jl = eh.length; Hl < jl; ++Hl) eh[Hl] = 143 >= Hl ? 8 : 255 >= Hl ? 9 : 279 >= Hl ? 7 : 8;
var th, nh, rh = Ul(eh),
    ih = new(Fl ? Uint8Array : Array)(30);
for (th = 0, nh = ih.length; th < nh; ++th) ih[th] = 5;
var ah = Ul(ih);

function oh(e, t) {
    for (var n, r = e.f, i = e.d, a = e.input, o = e.a, s = a.length; i < t;) {
        if (o >= s) throw Error("input buffer is broken");
        r |= a[o++] << i, i += 8
    }
    return n = r & (1 << t) - 1, e.f = r >>> t, e.d = i - t, e.a = o, n
}

function sh(e, t) { for (var n, r, i = e.f, a = e.d, o = e.input, s = e.a, c = o.length, u = t[0], l = t[1]; a < l && !(s >= c);) i |= o[s++] << a, a += 8; if ((r = (n = u[i & (1 << l) - 1]) >>> 16) > a) throw Error("invalid code length: " + r); return e.f = i >> r, e.d = a - r, e.a = s, 65535 & n }

function ch(e, t) {
    var n, r;
    switch (this.input = e, this.a = 0, !t && (t = {}) || (t.index && (this.a = t.index), t.verify && (this.A = t.verify)), n = e[this.a++], r = e[this.a++], 15 & n) {
        case uh:
            this.method = uh;
            break;
        default:
            throw Error("unsupported compression method")
    }
    if (0 != ((n << 8) + r) % 31) throw Error("invalid fcheck flag:" + ((n << 8) + r) % 31);
    if (32 & r) throw Error("fdict flag is not supported");
    this.q = new Bl(e, { index: this.a, bufferSize: t.bufferSize, bufferType: t.bufferType, resize: t.resize })
}
Bl.prototype.j = function(e, t) {
    var n = this.c,
        r = this.b;
    this.o = e;
    for (var i, a, o, s, c = n.length - 258; 256 !== (i = sh(this, e));)
        if (256 > i) r >= c && (this.b = r, n = this.e(), r = this.b), n[r++] = i;
        else
            for (s = Xl[a = i - 257], 0 < Zl[a] && (s += oh(this, Zl[a])), i = sh(this, t), o = Kl[i], 0 < $l[i] && (o += oh(this, $l[i])), r >= c && (this.b = r, n = this.e(), r = this.b); s--;) n[r] = n[r++ - o];
    for (; 8 <= this.d;) this.d -= 8, this.a--;
    this.b = r
}, Bl.prototype.w = function(e, t) {
    var n = this.c,
        r = this.b;
    this.o = e;
    for (var i, a, o, s, c = n.length; 256 !== (i = sh(this, e));)
        if (256 > i) r >= c && (c = (n = this.e()).length), n[r++] = i;
        else
            for (s = Xl[a = i - 257], 0 < Zl[a] && (s += oh(this, Zl[a])), i = sh(this, t), o = Kl[i], 0 < $l[i] && (o += oh(this, $l[i])), r + s > c && (c = (n = this.e()).length); s--;) n[r] = n[r++ - o];
    for (; 8 <= this.d;) this.d -= 8, this.a--;
    this.b = r
}, Bl.prototype.e = function() {
    var e, t, n = new(Fl ? Uint8Array : Array)(this.b - 32768),
        r = this.b - 32768,
        i = this.c;
    if (Fl) n.set(i.subarray(32768, n.length));
    else
        for (e = 0, t = n.length; e < t; ++e) n[e] = i[e + 32768];
    if (this.g.push(n), this.l += n.length, Fl) i.set(i.subarray(r, r + 32768));
    else
        for (e = 0; 32768 > e; ++e) i[e] = i[r + e];
    return this.b = 32768, i
}, Bl.prototype.z = function(e) {
    var t, n, r, i = this.input.length / this.a + 1 | 0,
        a = this.input,
        o = this.c;
    return e && ("number" == typeof e.p && (i = e.p), "number" == typeof e.u && (i += e.u)), n = 2 > i ? (r = (a.length - this.a) / this.o[2] / 2 * 258 | 0) < o.length ? o.length + r : o.length << 1 : o.length * i, Fl ? (t = new Uint8Array(n)).set(o) : t = o, this.c = t
}, Bl.prototype.n = function() {
    var e, t, n, r, i, a = 0,
        o = this.c,
        s = this.g,
        c = new(Fl ? Uint8Array : Array)(this.l + (this.b - 32768));
    if (0 === s.length) return Fl ? this.c.subarray(32768, this.b) : this.c.slice(32768, this.b);
    for (t = 0, n = s.length; t < n; ++t)
        for (r = 0, i = (e = s[t]).length; r < i; ++r) c[a++] = e[r];
    for (t = 32768, n = this.b; t < n; ++t) c[a++] = o[t];
    return this.g = [], this.buffer = c
}, Bl.prototype.v = function() { var e, t = this.b; return Fl ? this.r ? (e = new Uint8Array(t)).set(this.c.subarray(0, t)) : e = this.c.subarray(0, t) : (this.c.length > t && (this.c.length = t), e = this.c), this.buffer = e }, ch.prototype.k = function() {
    var e, t, n = this.input;
    if (e = this.q.k(), this.a = this.q.a, this.A) {
        t = (n[this.a++] << 24 | n[this.a++] << 16 | n[this.a++] << 8 | n[this.a++]) >>> 0;
        var r = e;
        if ("string" == typeof r) {
            var i, a, o = r.split("");
            for (i = 0, a = o.length; i < a; i++) o[i] = (255 & o[i].charCodeAt(0)) >>> 0;
            r = o
        }
        for (var s, c = 1, u = 0, l = r.length, h = 0; 0 < l;) {
            l -= s = 1024 < l ? 1024 : l;
            do { u += c += r[h++] } while (--s);
            c %= 65521, u %= 65521
        }
        if (t !== (u << 16 | c) >>> 0) throw Error("invalid adler-32 checksum")
    }
    return e
};
var uh = 8;
Nl("Zlib.Inflate", ch), Nl("Zlib.Inflate.prototype.decompress", ch.prototype.k);
var lh, hh, ph, dh, fh = { ADAPTIVE: Gl.s, BLOCK: Gl.t };
if (Object.keys) lh = Object.keys(fh);
else
    for (hh in lh = [], ph = 0, fh) lh[ph++] = hh;
for (ph = 0, dh = lh.length; ph < dh; ++ph) Nl("Zlib.Inflate.BufferType." + (hh = lh[ph]), fh[hh]);
var mh = Ol.Zlib,
    vh = {
        findSpan: function(e, t, n) { var r = n.length - e - 1; if (t >= n[r]) return r - 1; if (t <= n[e]) return e; for (var i = e, a = r, o = Math.floor((i + a) / 2); t < n[o] || t >= n[o + 1];) t < n[o] ? a = o : i = o, o = Math.floor((i + a) / 2); return o },
        calcBasisFunctions: function(e, t, n, r) {
            var i = [],
                a = [],
                o = [];
            i[0] = 1;
            for (var s = 1; s <= n; ++s) {
                a[s] = t - r[e + 1 - s], o[s] = r[e + s] - t;
                for (var c = 0, u = 0; u < s; ++u) {
                    var l = o[u + 1],
                        h = a[s - u],
                        p = i[u] / (l + h);
                    i[u] = c + l * p, c = h * p
                }
                i[s] = c
            }
            return i
        },
        calcBSplinePoint: function(e, t, n, r) {
            for (var i = this.findSpan(e, r, t), a = this.calcBasisFunctions(i, r, e, t), o = new C(0, 0, 0, 0), s = 0; s <= e; ++s) {
                var c = n[i - e + s],
                    u = a[s],
                    l = c.w * u;
                o.x += c.x * l, o.y += c.y * l, o.z += c.z * l, o.w += c.w * u
            }
            return o
        },
        calcBasisFunctionDerivatives: function(e, t, n, r, i) {
            for (var a = [], o = 0; o <= n; ++o) a[o] = 0;
            var s = [];
            for (o = 0; o <= r; ++o) s[o] = a.slice(0);
            var c = [];
            for (o = 0; o <= n; ++o) c[o] = a.slice(0);
            c[0][0] = 1;
            for (var u = a.slice(0), l = a.slice(0), h = 1; h <= n; ++h) {
                u[h] = t - i[e + 1 - h], l[h] = i[e + h] - t;
                for (var p = 0, d = 0; d < h; ++d) {
                    var f = l[d + 1],
                        m = u[h - d];
                    c[h][d] = f + m;
                    var v = c[d][h - 1] / c[h][d];
                    c[d][h] = p + f * v, p = m * v
                }
                c[h][h] = p
            }
            for (h = 0; h <= n; ++h) s[0][h] = c[h][n];
            for (d = 0; d <= n; ++d) {
                var g = 0,
                    y = 1,
                    x = [];
                for (o = 0; o <= n; ++o) x[o] = a.slice(0);
                x[0][0] = 1;
                for (var b = 1; b <= r; ++b) {
                    var w = 0,
                        _ = d - b,
                        M = n - b;
                    d >= b && (x[y][0] = x[g][0] / c[M + 1][_], w = x[y][0] * c[_][M]);
                    var S = d - 1 <= M ? b - 1 : n - d;
                    for (h = _ >= -1 ? 1 : -_; h <= S; ++h) x[y][h] = (x[g][h] - x[g][h - 1]) / c[M + 1][_ + h], w += x[y][h] * c[_ + h][M];
                    d <= M && (x[y][b] = -x[g][b - 1] / c[M + 1][d], w += x[y][b] * c[d][M]), s[b][d] = w, h = g, g = y, y = h
                }
            }
            for (d = n, b = 1; b <= r; ++b) {
                for (h = 0; h <= n; ++h) s[b][h] *= d;
                d *= n - b
            }
            return s
        },
        calcBSplineDerivatives: function(e, t, n, r, i) {
            for (var a = i < e ? i : e, o = [], s = this.findSpan(e, r, t), c = this.calcBasisFunctionDerivatives(s, r, e, a, t), u = [], l = 0; l < n.length; ++l) {
                var h = (d = n[l].clone()).w;
                d.x *= h, d.y *= h, d.z *= h, u[l] = d
            }
            for (var p = 0; p <= a; ++p) {
                for (var d = u[s - e].clone().multiplyScalar(c[p][0]), f = 1; f <= e; ++f) d.add(u[s - e + f].clone().multiplyScalar(c[p][f]));
                o[p] = d
            }
            for (p = a + 1; p <= i + 1; ++p) o[p] = new C(0, 0, 0);
            return o
        },
        calcKoverI: function(e, t) { for (var n = 1, r = 2; r <= e; ++r) n *= r; var i = 1; for (r = 2; r <= t; ++r) i *= r; for (r = 2; r <= e - t; ++r) i *= r; return n / i },
        calcRationalCurveDerivatives: function(e) {
            for (var t = e.length, n = [], r = [], i = 0; i < t; ++i) {
                var a = e[i];
                n[i] = new U(a.x, a.y, a.z), r[i] = a.w
            }
            for (var o = [], s = 0; s < t; ++s) {
                var c = n[s].clone();
                for (i = 1; i <= s; ++i) c.sub(o[s - i].clone().multiplyScalar(this.calcKoverI(s, i) * r[i]));
                o[s] = c.divideScalar(r[0])
            }
            return o
        },
        calcNURBSDerivatives: function(e, t, n, r, i) { var a = this.calcBSplineDerivatives(e, t, n, r, i); return this.calcRationalCurveDerivatives(a) },
        calcSurfacePoint: function(e, t, n, r, i, a, o, s) {
            for (var c = this.findSpan(e, a, n), u = this.findSpan(t, o, r), l = this.calcBasisFunctions(c, a, e, n), h = this.calcBasisFunctions(u, o, t, r), p = [], d = 0; d <= t; ++d) {
                p[d] = new C(0, 0, 0, 0);
                for (var f = 0; f <= e; ++f) {
                    var m = i[c - e + f][u - t + d].clone(),
                        v = m.w;
                    m.x *= v, m.y *= v, m.z *= v, p[d].add(m.multiplyScalar(l[f]))
                }
            }
            var g = new C(0, 0, 0, 0);
            for (d = 0; d <= t; ++d) g.add(p[d].multiplyScalar(h[d]));
            g.divideScalar(g.w), s.set(g.x, g.y, g.z)
        }
    },
    gh = function(e, t, n, r, i) {
        gs.call(this), this.degree = e, this.knots = t, this.controlPoints = [], this.startKnot = r || 0, this.endKnot = i || this.knots.length - 1;
        for (var a = 0; a < n.length; ++a) {
            var o = n[a];
            this.controlPoints[a] = new C(o.x, o.y, o.z, o.w)
        }
    };
(gh.prototype = Object.create(gs.prototype)).constructor = gh, gh.prototype.getPoint = function(e) {
    var t = this.knots[this.startKnot] + e * (this.knots[this.endKnot] - this.knots[this.startKnot]),
        n = vh.calcBSplinePoint(this.degree, this.knots, this.controlPoints, t);
    return 1 != n.w && n.divideScalar(n.w), new U(n.x, n.y, n.z)
}, gh.prototype.getTangent = function(e) {
    var t = this.knots[0] + e * (this.knots[this.knots.length - 1] - this.knots[0]),
        n = vh.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, t, 1)[1].clone();
    return n.normalize(), n
};
var yh = function() {
        var e, t, n;

        function r(e) { cs.call(this, e) }

        function a(e, t) { this.textureLoader = e, this.manager = t }

        function o() {}

        function s() {}

        function c() {}

        function u() {}

        function l(e, t) { this.dv = new DataView(e), this.offset = 0, this.littleEndian = void 0 === t || t }

        function h() {}

        function p(e) { var t = e.match(/FBXVersion: (\d+)/); if (t) return parseInt(t[1]); throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.") }

        function d(e) { return e / 46186158e3 }
        r.prototype = Object.assign(Object.create(cs.prototype), {
            constructor: r,
            load: function(e, t, n, r) {
                var i = this,
                    a = "" === i.path ? $s.extractUrlBase(e) : i.path,
                    o = new ls(this.manager);
                o.setPath(i.path), o.setResponseType("arraybuffer"), o.load(e, (function(n) { try { t(i.parse(n, a)) } catch (t) { setTimeout((function() { r && r(t), i.manager.itemError(e) }), 0) } }), n, r)
            },
            parse: function(t, n) {
                if (o = "Kaydara FBX Binary  \0", (i = t).byteLength >= o.length && o === w(i, 0, o.length)) e = (new u).parse(t);
                else {
                    var r = w(t);
                    if (! function(e) {
                            for (var t, n = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"], r = 0, i = 0; i < n.length; ++i)
                                if (void 0, t = e[1 - 1], e = e.slice(r + 1), r++, t === n[i]) return !1;
                            return !0
                        }(r)) throw new Error("THREE.FBXLoader: Unknown format.");
                    if (p(r) < 7e3) throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + p(r));
                    e = (new c).parse(r)
                }
                var i, o;
                return new a(new vs(this.manager).setPath(this.resourcePath || n).setCrossOrigin(this.crossOrigin), this.manager).parse(e)
            }
        }), a.prototype = {
            constructor: a,
            parse: function() {
                t = this.parseConnections();
                var e = this.parseImages(),
                    r = this.parseTextures(e),
                    i = this.parseMaterials(r),
                    a = this.parseDeformers(),
                    s = (new o).parse(a);
                return this.parseScene(a, s, i), n
            },
            parseConnections: function() {
                var t = new Map;
                return "Connections" in e && e.Connections.connections.forEach((function(e) {
                    var n = e[0],
                        r = e[1],
                        i = e[2];
                    t.has(n) || t.set(n, { parents: [], children: [] });
                    var a = { ID: r, relationship: i };
                    t.get(n).parents.push(a), t.has(r) || t.set(r, { parents: [], children: [] });
                    var o = { ID: n, relationship: i };
                    t.get(r).children.push(o)
                })), t
            },
            parseImages: function() {
                var t = {},
                    n = {};
                if ("Video" in e.Objects) {
                    var r = e.Objects.Video;
                    for (var i in r) {
                        var a = r[i];
                        if (t[u = parseInt(i)] = a.RelativeFilename || a.Filename, "Content" in a) {
                            var o = a.Content instanceof ArrayBuffer && a.Content.byteLength > 0,
                                s = "string" == typeof a.Content && "" !== a.Content;
                            if (o || s) {
                                var c = this.parseImage(r[i]);
                                n[a.RelativeFilename || a.Filename] = c
                            }
                        }
                    }
                }
                for (var u in t) {
                    var l = t[u];
                    void 0 !== n[l] ? t[u] = n[l] : t[u] = t[u].split("\\").pop()
                }
                return t
            },
            parseImage: function(e) {
                var t, n = e.Content,
                    r = e.RelativeFilename || e.Filename,
                    i = r.slice(r.lastIndexOf(".") + 1).toLowerCase();
                switch (i) {
                    case "bmp":
                        t = "image/bmp";
                        break;
                    case "jpg":
                    case "jpeg":
                        t = "image/jpeg";
                        break;
                    case "png":
                        t = "image/png";
                        break;
                    case "tif":
                        t = "image/tiff";
                        break;
                    case "tga":
                        null === this.manager.getHandler(".tga") && console.warn("FBXLoader: TGA loader not found, skipping ", r), t = "image/tga";
                        break;
                    default:
                        return void console.warn('FBXLoader: Image type "' + i + '" is not supported.')
                }
                if ("string" == typeof n) return "data:" + t + ";base64," + n;
                var a = new Uint8Array(n);
                return window.URL.createObjectURL(new Blob([a], { type: t }))
            },
            parseTextures: function(t) {
                var n = new Map;
                if ("Texture" in e.Objects) {
                    var r = e.Objects.Texture;
                    for (var i in r) {
                        var a = this.parseTexture(r[i], t);
                        n.set(parseInt(i), a)
                    }
                }
                return n
            },
            parseTexture: function(e, t) {
                var n = this.loadTexture(e, t);
                n.ID = e.id, n.name = e.attrName;
                var r = e.WrapModeU,
                    i = e.WrapModeV,
                    a = void 0 !== r ? r.value : 0,
                    o = void 0 !== i ? i.value : 0;
                if (n.wrapS = 0 === a ? 1e3 : 1001, n.wrapT = 0 === o ? 1e3 : 1001, "Scaling" in e) {
                    var s = e.Scaling.value;
                    n.repeat.x = s[0], n.repeat.y = s[1]
                }
                return n
            },
            loadTexture: function(e, n) {
                var r, i, a = this.textureLoader.path,
                    o = t.get(e.id).children;
                void 0 !== o && o.length > 0 && void 0 !== n[o[0].ID] && (0 !== (r = n[o[0].ID]).indexOf("blob:") && 0 !== r.indexOf("data:") || this.textureLoader.setPath(void 0));
                var s = e.FileName.slice(-3).toLowerCase();
                if ("tga" === s) {
                    var c = this.manager.getHandler(".tga");
                    null === c ? (console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", e.RelativeFilename), i = new P) : i = c.load(r)
                } else "psd" === s ? (console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", e.RelativeFilename), i = new P) : i = this.textureLoader.load(r);
                return this.textureLoader.setPath(a), i
            },
            parseMaterials: function(t) {
                var n = new Map;
                if ("Material" in e.Objects) {
                    var r = e.Objects.Material;
                    for (var i in r) {
                        var a = this.parseMaterial(r[i], t);
                        null !== a && n.set(parseInt(i), a)
                    }
                }
                return n
            },
            parseMaterial: function(e, n) {
                var r = e.id,
                    a = e.attrName,
                    o = e.ShadingModel;
                if ("object" === i(o) && (o = o.value), !t.has(r)) return null;
                var s, c = this.parseParameters(e, n, r);
                switch (o.toLowerCase()) {
                    case "phong":
                        s = new Uo;
                        break;
                    case "lambert":
                        s = new zo;
                        break;
                    default:
                        console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', o), s = new Uo
                }
                return s.setValues(c), s.name = a, s
            },
            parseParameters: function(e, n, r) {
                var i = {};
                e.BumpFactor && (i.bumpScale = e.BumpFactor.value), e.Diffuse ? i.color = (new et).fromArray(e.Diffuse.value) : e.DiffuseColor && "Color" === e.DiffuseColor.type && (i.color = (new et).fromArray(e.DiffuseColor.value)), e.DisplacementFactor && (i.displacementScale = e.DisplacementFactor.value), e.Emissive ? i.emissive = (new et).fromArray(e.Emissive.value) : e.EmissiveColor && "Color" === e.EmissiveColor.type && (i.emissive = (new et).fromArray(e.EmissiveColor.value)), e.EmissiveFactor && (i.emissiveIntensity = parseFloat(e.EmissiveFactor.value)), e.Opacity && (i.opacity = parseFloat(e.Opacity.value)), i.opacity < 1 && (i.transparent = !0), e.ReflectionFactor && (i.reflectivity = e.ReflectionFactor.value), e.Shininess && (i.shininess = e.Shininess.value), e.Specular ? i.specular = (new et).fromArray(e.Specular.value) : e.SpecularColor && "Color" === e.SpecularColor.type && (i.specular = (new et).fromArray(e.SpecularColor.value));
                var a = this;
                return t.get(r).children.forEach((function(e) {
                    var t = e.relationship;
                    switch (t) {
                        case "Bump":
                            i.bumpMap = a.getTexture(n, e.ID);
                            break;
                        case "Maya|TEX_ao_map":
                            i.aoMap = a.getTexture(n, e.ID);
                            break;
                        case "DiffuseColor":
                        case "Maya|TEX_color_map":
                            i.map = a.getTexture(n, e.ID), i.map.encoding = 3001;
                            break;
                        case "DisplacementColor":
                            i.displacementMap = a.getTexture(n, e.ID);
                            break;
                        case "EmissiveColor":
                            i.emissiveMap = a.getTexture(n, e.ID), i.emissiveMap.encoding = 3001;
                            break;
                        case "NormalMap":
                        case "Maya|TEX_normal_map":
                            i.normalMap = a.getTexture(n, e.ID);
                            break;
                        case "ReflectionColor":
                            i.envMap = a.getTexture(n, e.ID), i.envMap.mapping = 303, i.envMap.encoding = 3001;
                            break;
                        case "SpecularColor":
                            i.specularMap = a.getTexture(n, e.ID), i.specularMap.encoding = 3001;
                            break;
                        case "TransparentColor":
                            i.alphaMap = a.getTexture(n, e.ID), i.transparent = !0;
                            break;
                        case "AmbientColor":
                        case "ShininessExponent":
                        case "SpecularFactor":
                        case "VectorDisplacementColor":
                        default:
                            console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", t)
                    }
                })), i
            },
            getTexture: function(n, r) { return "LayeredTexture" in e.Objects && r in e.Objects.LayeredTexture && (console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."), r = t.get(r).children[0].ID), n.get(r) },
            parseDeformers: function() {
                var n = {},
                    r = {};
                if ("Deformer" in e.Objects) {
                    var i = e.Objects.Deformer;
                    for (var a in i) {
                        var o = i[a],
                            s = t.get(parseInt(a));
                        if ("Skin" === o.attrType) {
                            var c = this.parseSkeleton(s, i);
                            c.ID = a, s.parents.length > 1 && console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."), c.geometryID = s.parents[0].ID, n[a] = c
                        } else if ("BlendShape" === o.attrType) {
                            var u = { id: a };
                            u.rawTargets = this.parseMorphTargets(s, i), u.id = a, s.parents.length > 1 && console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."), r[a] = u
                        }
                    }
                }
                return { skeletons: n, morphTargets: r }
            },
            parseSkeleton: function(e, t) { var n = []; return e.children.forEach((function(e) { var r = t[e.ID]; if ("Cluster" === r.attrType) { var i = { ID: e.ID, indices: [], weights: [], transformLink: (new W).fromArray(r.TransformLink.a) }; "Indexes" in r && (i.indices = r.Indexes.a, i.weights = r.Weights.a), n.push(i) } })), { rawBones: n, bones: [] } },
            parseMorphTargets: function(e, n) {
                for (var r = [], i = 0; i < e.children.length; i++) {
                    var a = e.children[i],
                        o = n[a.ID],
                        s = { name: o.attrName, initialWeight: o.DeformPercent, id: o.id, fullWeights: o.FullWeights.a };
                    if ("BlendShapeChannel" !== o.attrType) return;
                    s.geoID = t.get(parseInt(a.ID)).children.filter((function(e) { return void 0 === e.relationship }))[0].ID, r.push(s)
                }
                return r
            },
            parseScene: function(r, i, a) {
                n = new mi;
                var o = this.parseModels(r.skeletons, i, a),
                    c = e.Objects.Model,
                    u = this;
                o.forEach((function(e) {
                    var r = c[e.ID];
                    u.setLookAtProperties(e, r), t.get(e.ID).parents.forEach((function(t) {
                        var n = o.get(t.ID);
                        void 0 !== n && n.add(e)
                    })), null === e.parent && n.add(e)
                })), this.bindSkeleton(r.skeletons, i, o), this.createAmbientLight(), this.setupMorphMaterials(), n.traverse((function(e) {
                    if (e.userData.transformData) {
                        e.parent && (e.userData.transformData.parentMatrixWorld = e.parent.matrix);
                        var t = y(e.userData.transformData);
                        e.applyMatrix4(t)
                    }
                }));
                var l = (new s).parse();
                1 === n.children.length && n.children[0].isGroup && (n.children[0].animations = l, n = n.children[0]), n.animations = l
            },
            parseModels: function(n, r, i) {
                var a = new Map,
                    o = e.Objects.Model;
                for (var s in o) {
                    var c = parseInt(s),
                        u = o[s],
                        l = t.get(c),
                        h = this.buildSkeleton(l, n, c, u.attrName);
                    if (!h) {
                        switch (u.attrType) {
                            case "Camera":
                                h = this.createCamera(l);
                                break;
                            case "Light":
                                h = this.createLight(l);
                                break;
                            case "Mesh":
                                h = this.createMesh(l, r, i);
                                break;
                            case "NurbsCurve":
                                h = this.createCurve(l, r);
                                break;
                            case "LimbNode":
                            case "Root":
                                h = new qi;
                                break;
                            case "Null":
                            default:
                                h = new mi
                        }
                        h.name = u.attrName ? qc.sanitizeNodeName(u.attrName) : "", h.ID = c
                    }
                    this.getTransformData(h, u), a.set(c, h)
                }
                return a
            },
            buildSkeleton: function(e, t, n, r) {
                var i = null;
                return e.parents.forEach((function(e) {
                    for (var a in t) {
                        var o = t[a];
                        o.rawBones.forEach((function(t, a) {
                            if (t.ID === e.ID) {
                                var s = i;
                                (i = new qi).matrixWorld.copy(t.transformLink), i.name = r ? qc.sanitizeNodeName(r) : "", i.ID = n, o.bones[a] = i, null !== s && i.add(s)
                            }
                        }))
                    }
                })), i
            },
            createCamera: function(t) {
                var n, r;
                if (t.children.forEach((function(t) {
                        var n = e.Objects.NodeAttribute[t.ID];
                        void 0 !== n && (r = n)
                    })), void 0 === r) n = new ue;
                else {
                    var i = 0;
                    void 0 !== r.CameraProjectionType && 1 === r.CameraProjectionType.value && (i = 1);
                    var a = 1;
                    void 0 !== r.NearPlane && (a = r.NearPlane.value / 1e3);
                    var o = 1e3;
                    void 0 !== r.FarPlane && (o = r.FarPlane.value / 1e3);
                    var s = window.innerWidth,
                        c = window.innerHeight;
                    void 0 !== r.AspectWidth && void 0 !== r.AspectHeight && (s = r.AspectWidth.value, c = r.AspectHeight.value);
                    var u = s / c,
                        l = 45;
                    void 0 !== r.FieldOfView && (l = r.FieldOfView.value);
                    var h = r.FocalLength ? r.FocalLength.value : null;
                    switch (i) {
                        case 0:
                            n = new cn(l, u, a, o), null !== h && n.setFocalLength(h);
                            break;
                        case 1:
                            n = new Xs(-s / 2, s / 2, c / 2, -c / 2, a, o);
                            break;
                        default:
                            console.warn("THREE.FBXLoader: Unknown camera type " + i + "."), n = new ue
                    }
                }
                return n
            },
            createLight: function(t) {
                var n, r;
                if (t.children.forEach((function(t) {
                        var n = e.Objects.NodeAttribute[t.ID];
                        void 0 !== n && (r = n)
                    })), void 0 === r) n = new ue;
                else {
                    var i;
                    i = void 0 === r.LightType ? 0 : r.LightType.value;
                    var a = 16777215;
                    void 0 !== r.Color && (a = (new et).fromArray(r.Color.value));
                    var o = void 0 === r.Intensity ? 1 : r.Intensity.value / 100;
                    void 0 !== r.CastLightOnObject && 0 === r.CastLightOnObject.value && (o = 0);
                    var s = 0;
                    switch (void 0 !== r.FarAttenuationEnd && (s = void 0 !== r.EnableFarAttenuation && 0 === r.EnableFarAttenuation.value ? 0 : r.FarAttenuationEnd.value), i) {
                        case 0:
                            n = new qs(a, o, s, 1);
                            break;
                        case 1:
                            n = new Zs(a, o);
                            break;
                        case 2:
                            var c = Math.PI / 3;
                            void 0 !== r.InnerAngle && (c = T.degToRad(r.InnerAngle.value));
                            var u = 0;
                            void 0 !== r.OuterAngle && (u = T.degToRad(r.OuterAngle.value), u = Math.max(u, 1)), n = new Vs(a, o, s, c, u, 1);
                            break;
                        default:
                            console.warn("THREE.FBXLoader: Unknown light type " + r.LightType.value + ", defaulting to a PointLight."), n = new qs(a, o)
                    }
                    void 0 !== r.CastShadows && 1 === r.CastShadows.value && (n.castShadow = !0)
                }
                return n
            },
            createMesh: function(e, t, n) {
                var r, i = null,
                    a = null,
                    o = [];
                return e.children.forEach((function(e) { t.has(e.ID) && (i = t.get(e.ID)), n.has(e.ID) && o.push(n.get(e.ID)) })), o.length > 1 ? a = o : o.length > 0 ? a = o[0] : (a = new Uo({ color: 13421772 }), o.push(a)), "color" in i.attributes && o.forEach((function(e) { e.vertexColors = !0 })), i.FBX_Deformer ? (o.forEach((function(e) { e.skinning = !0 })), (r = new Hi(i, a)).normalizeSkinWeights()) : r = new qt(i, a), r
            },
            createCurve: function(e, t) { return new ia(e.children.reduce((function(e, n) { return t.has(n.ID) && (e = t.get(n.ID)), e }), null), new Qi({ color: 3342591, linewidth: 1 })) },
            getTransformData: function(e, t) { var n = {}; "InheritType" in t && (n.inheritType = parseInt(t.InheritType.value)), n.eulerOrder = "RotationOrder" in t ? x(t.RotationOrder.value) : "ZYX", "Lcl_Translation" in t && (n.translation = t.Lcl_Translation.value), "PreRotation" in t && (n.preRotation = t.PreRotation.value), "Lcl_Rotation" in t && (n.rotation = t.Lcl_Rotation.value), "PostRotation" in t && (n.postRotation = t.PostRotation.value), "Lcl_Scaling" in t && (n.scale = t.Lcl_Scaling.value), "ScalingOffset" in t && (n.scalingOffset = t.ScalingOffset.value), "ScalingPivot" in t && (n.scalingPivot = t.ScalingPivot.value), "RotationOffset" in t && (n.rotationOffset = t.RotationOffset.value), "RotationPivot" in t && (n.rotationPivot = t.RotationPivot.value), e.userData.transformData = n },
            setLookAtProperties: function(r, i) {
                "LookAtProperty" in i && t.get(r.ID).children.forEach((function(t) {
                    if ("LookAtProperty" === t.relationship) {
                        var i = e.Objects.Model[t.ID];
                        if ("Lcl_Translation" in i) {
                            var a = i.Lcl_Translation.value;
                            void 0 !== r.target ? (r.target.position.fromArray(a), n.add(r.target)) : r.lookAt((new U).fromArray(a))
                        }
                    }
                }))
            },
            bindSkeleton: function(e, n, r) {
                var i = this.parsePoseNodes();
                for (var a in e) {
                    var o = e[a];
                    t.get(parseInt(o.ID)).parents.forEach((function(e) {
                        if (n.has(e.ID)) {
                            var a = e.ID;
                            t.get(a).parents.forEach((function(e) { r.has(e.ID) && r.get(e.ID).bind(new Wi(o.bones), i[e.ID]) }))
                        }
                    }))
                }
            },
            parsePoseNodes: function() {
                var t = {};
                if ("Pose" in e.Objects) {
                    var n = e.Objects.Pose;
                    for (var r in n)
                        if ("BindPose" === n[r].attrType) {
                            var i = n[r].PoseNode;
                            Array.isArray(i) ? i.forEach((function(e) { t[e.Node] = (new W).fromArray(e.Matrix.a) })) : t[i.Node] = (new W).fromArray(i.Matrix.a)
                        }
                }
                return t
            },
            createAmbientLight: function() {
                if ("GlobalSettings" in e && "AmbientColor" in e.GlobalSettings) {
                    var t = e.GlobalSettings.AmbientColor.value,
                        r = t[0],
                        i = t[1],
                        a = t[2];
                    if (0 !== r || 0 !== i || 0 !== a) {
                        var o = new et(r, i, a);
                        n.add(new Js(o, 1))
                    }
                }
            },
            setupMorphMaterials: function() {
                var e = this;
                n.traverse((function(t) { t.isMesh && t.geometry.morphAttributes.position && t.geometry.morphAttributes.position.length && (Array.isArray(t.material) ? t.material.forEach((function(n, r) { e.setupMorphMaterial(t, n, r) })) : e.setupMorphMaterial(t, t.material)) }))
            },
            setupMorphMaterial: function(e, t, r) {
                var i = e.uuid,
                    a = t.uuid,
                    o = !1;
                if (n.traverse((function(e) { e.isMesh && (Array.isArray(e.material) ? e.material.forEach((function(t) { t.uuid === a && e.uuid !== i && (o = !0) })) : e.material.uuid === a && e.uuid !== i && (o = !0)) })), !0 === o) {
                    var s = t.clone();
                    s.morphTargets = !0, void 0 === r ? e.material = s : e.material[r] = s
                } else t.morphTargets = !0
            }
        }, o.prototype = {
            constructor: o,
            parse: function(n) {
                var r = new Map;
                if ("Geometry" in e.Objects) {
                    var i = e.Objects.Geometry;
                    for (var a in i) {
                        var o = t.get(parseInt(a)),
                            s = this.parseGeometry(o, i[a], n);
                        r.set(parseInt(a), s)
                    }
                }
                return r
            },
            parseGeometry: function(e, t, n) {
                switch (t.attrType) {
                    case "Mesh":
                        return this.parseMeshGeometry(e, t, n);
                    case "NurbsCurve":
                        return this.parseNurbsGeometry(t)
                }
            },
            parseMeshGeometry: function(t, n, r) {
                var i = r.skeletons,
                    a = [],
                    o = t.parents.map((function(t) { return e.Objects.Model[t.ID] }));
                if (0 !== o.length) {
                    var s = t.children.reduce((function(e, t) { return void 0 !== i[t.ID] && (e = i[t.ID]), e }), null);
                    t.children.forEach((function(e) { void 0 !== r.morphTargets[e.ID] && a.push(r.morphTargets[e.ID]) }));
                    var c = o[0],
                        u = {};
                    "RotationOrder" in c && (u.eulerOrder = x(c.RotationOrder.value)), "InheritType" in c && (u.inheritType = parseInt(c.InheritType.value)), "GeometricTranslation" in c && (u.translation = c.GeometricTranslation.value), "GeometricRotation" in c && (u.rotation = c.GeometricRotation.value), "GeometricScaling" in c && (u.scale = c.GeometricScaling.value);
                    var l = y(u);
                    return this.genGeometry(n, s, a, l)
                }
            },
            genGeometry: function(e, t, n, r) {
                var i = new Lt;
                e.attrName && (i.name = e.attrName);
                var a = this.parseGeoNode(e, t),
                    o = this.genBuffers(a),
                    s = new gt(o.vertex, 3);
                if (s.applyMatrix4(r), i.setAttribute("position", s), o.colors.length > 0 && i.setAttribute("color", new gt(o.colors, 3)), t && (i.setAttribute("skinIndex", new ft(o.weightsIndices, 4)), i.setAttribute("skinWeight", new gt(o.vertexWeights, 4)), i.FBX_Deformer = t), o.normal.length > 0) {
                    var c = (new A).getNormalMatrix(r),
                        u = new gt(o.normal, 3);
                    u.applyNormalMatrix(c), i.setAttribute("normal", u)
                }
                if (o.uvs.forEach((function(e, t) {
                        var n = "uv" + (t + 1).toString();
                        0 === t && (n = "uv"), i.setAttribute(n, new gt(o.uvs[t], 2))
                    })), a.material && "AllSame" !== a.material.mappingType) {
                    var l = o.materialIndex[0],
                        h = 0;
                    if (o.materialIndex.forEach((function(e, t) { e !== l && (i.addGroup(h, t - h, l), l = e, h = t) })), i.groups.length > 0) {
                        var p = i.groups[i.groups.length - 1],
                            d = p.start + p.count;
                        d !== o.materialIndex.length && i.addGroup(d, o.materialIndex.length - d, l)
                    }
                    0 === i.groups.length && i.addGroup(0, o.materialIndex.length, o.materialIndex[0])
                }
                return this.addMorphTargets(i, e, n, r), i
            },
            parseGeoNode: function(e, t) { var n = {}; if (n.vertexPositions = void 0 !== e.Vertices ? e.Vertices.a : [], n.vertexIndices = void 0 !== e.PolygonVertexIndex ? e.PolygonVertexIndex.a : [], e.LayerElementColor && (n.color = this.parseVertexColors(e.LayerElementColor[0])), e.LayerElementMaterial && (n.material = this.parseMaterialIndices(e.LayerElementMaterial[0])), e.LayerElementNormal && (n.normal = this.parseNormals(e.LayerElementNormal[0])), e.LayerElementUV) { n.uv = []; for (var r = 0; e.LayerElementUV[r];) n.uv.push(this.parseUVs(e.LayerElementUV[r])), r++ } return n.weightTable = {}, null !== t && (n.skeleton = t, t.rawBones.forEach((function(e, t) { e.indices.forEach((function(r, i) { void 0 === n.weightTable[r] && (n.weightTable[r] = []), n.weightTable[r].push({ id: t, weight: e.weights[i] }) })) }))), n },
            genBuffers: function(e) {
                var t = { vertex: [], normal: [], colors: [], uvs: [], materialIndex: [], vertexWeights: [], weightsIndices: [] },
                    n = 0,
                    r = 0,
                    i = !1,
                    a = [],
                    o = [],
                    s = [],
                    c = [],
                    u = [],
                    l = [],
                    h = this;
                return e.vertexIndices.forEach((function(p, d) {
                    var f = !1;
                    p < 0 && (p ^= -1, f = !0);
                    var v = [],
                        g = [];
                    if (a.push(3 * p, 3 * p + 1, 3 * p + 2), e.color) {
                        var y = m(d, n, p, e.color);
                        s.push(y[0], y[1], y[2])
                    }
                    if (e.skeleton) {
                        if (void 0 !== e.weightTable[p] && e.weightTable[p].forEach((function(e) { g.push(e.weight), v.push(e.id) })), g.length > 4) {
                            i || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."), i = !0);
                            var x = [0, 0, 0, 0],
                                b = [0, 0, 0, 0];
                            g.forEach((function(e, t) {
                                var n = e,
                                    r = v[t];
                                b.forEach((function(e, t, i) {
                                    if (n > e) {
                                        i[t] = n, n = e;
                                        var a = x[t];
                                        x[t] = r, r = a
                                    }
                                }))
                            })), v = x, g = b
                        }
                        for (; g.length < 4;) g.push(0), v.push(0);
                        for (var w = 0; w < 4; ++w) u.push(g[w]), l.push(v[w])
                    }
                    if (e.normal && (y = m(d, n, p, e.normal), o.push(y[0], y[1], y[2])), e.material && "AllSame" !== e.material.mappingType) var _ = m(d, n, p, e.material)[0];
                    e.uv && e.uv.forEach((function(e, t) {
                        var r = m(d, n, p, e);
                        void 0 === c[t] && (c[t] = []), c[t].push(r[0]), c[t].push(r[1])
                    })), r++, f && (h.genFace(t, e, a, _, o, s, c, u, l, r), n++, r = 0, a = [], o = [], s = [], c = [], u = [], l = [])
                })), t
            },
            genFace: function(e, t, n, r, i, a, o, s, c, u) { for (var l = 2; l < u; l++) e.vertex.push(t.vertexPositions[n[0]]), e.vertex.push(t.vertexPositions[n[1]]), e.vertex.push(t.vertexPositions[n[2]]), e.vertex.push(t.vertexPositions[n[3 * (l - 1)]]), e.vertex.push(t.vertexPositions[n[3 * (l - 1) + 1]]), e.vertex.push(t.vertexPositions[n[3 * (l - 1) + 2]]), e.vertex.push(t.vertexPositions[n[3 * l]]), e.vertex.push(t.vertexPositions[n[3 * l + 1]]), e.vertex.push(t.vertexPositions[n[3 * l + 2]]), t.skeleton && (e.vertexWeights.push(s[0]), e.vertexWeights.push(s[1]), e.vertexWeights.push(s[2]), e.vertexWeights.push(s[3]), e.vertexWeights.push(s[4 * (l - 1)]), e.vertexWeights.push(s[4 * (l - 1) + 1]), e.vertexWeights.push(s[4 * (l - 1) + 2]), e.vertexWeights.push(s[4 * (l - 1) + 3]), e.vertexWeights.push(s[4 * l]), e.vertexWeights.push(s[4 * l + 1]), e.vertexWeights.push(s[4 * l + 2]), e.vertexWeights.push(s[4 * l + 3]), e.weightsIndices.push(c[0]), e.weightsIndices.push(c[1]), e.weightsIndices.push(c[2]), e.weightsIndices.push(c[3]), e.weightsIndices.push(c[4 * (l - 1)]), e.weightsIndices.push(c[4 * (l - 1) + 1]), e.weightsIndices.push(c[4 * (l - 1) + 2]), e.weightsIndices.push(c[4 * (l - 1) + 3]), e.weightsIndices.push(c[4 * l]), e.weightsIndices.push(c[4 * l + 1]), e.weightsIndices.push(c[4 * l + 2]), e.weightsIndices.push(c[4 * l + 3])), t.color && (e.colors.push(a[0]), e.colors.push(a[1]), e.colors.push(a[2]), e.colors.push(a[3 * (l - 1)]), e.colors.push(a[3 * (l - 1) + 1]), e.colors.push(a[3 * (l - 1) + 2]), e.colors.push(a[3 * l]), e.colors.push(a[3 * l + 1]), e.colors.push(a[3 * l + 2])), t.material && "AllSame" !== t.material.mappingType && (e.materialIndex.push(r), e.materialIndex.push(r), e.materialIndex.push(r)), t.normal && (e.normal.push(i[0]), e.normal.push(i[1]), e.normal.push(i[2]), e.normal.push(i[3 * (l - 1)]), e.normal.push(i[3 * (l - 1) + 1]), e.normal.push(i[3 * (l - 1) + 2]), e.normal.push(i[3 * l]), e.normal.push(i[3 * l + 1]), e.normal.push(i[3 * l + 2])), t.uv && t.uv.forEach((function(t, n) { void 0 === e.uvs[n] && (e.uvs[n] = []), e.uvs[n].push(o[n][0]), e.uvs[n].push(o[n][1]), e.uvs[n].push(o[n][2 * (l - 1)]), e.uvs[n].push(o[n][2 * (l - 1) + 1]), e.uvs[n].push(o[n][2 * l]), e.uvs[n].push(o[n][2 * l + 1]) })) },
            addMorphTargets: function(t, n, r, i) {
                if (0 !== r.length) {
                    t.morphTargetsRelative = !0, t.morphAttributes.position = [];
                    var a = this;
                    r.forEach((function(r) {
                        r.rawTargets.forEach((function(r) {
                            var o = e.Objects.Geometry[r.geoID];
                            void 0 !== o && a.genMorphGeometry(t, n, o, i, r.name)
                        }))
                    }))
                }
            },
            genMorphGeometry: function(e, t, n, r, i) {
                for (var a = void 0 !== t.PolygonVertexIndex ? t.PolygonVertexIndex.a : [], o = void 0 !== n.Vertices ? n.Vertices.a : [], s = void 0 !== n.Indexes ? n.Indexes.a : [], c = 3 * e.attributes.position.count, u = new Float32Array(c), l = 0; l < s.length; l++) {
                    var h = 3 * s[l];
                    u[h] = o[3 * l], u[h + 1] = o[3 * l + 1], u[h + 2] = o[3 * l + 2]
                }
                var p = { vertexIndices: a, vertexPositions: u },
                    d = new gt(this.genBuffers(p).vertex, 3);
                d.name = i || n.attrName, d.applyMatrix4(r), e.morphAttributes.position.push(d)
            },
            parseNormals: function(e) {
                var t = e.MappingInformationType,
                    n = e.ReferenceInformationType,
                    r = e.Normals.a,
                    i = [];
                return "IndexToDirect" === n && ("NormalIndex" in e ? i = e.NormalIndex.a : "NormalsIndex" in e && (i = e.NormalsIndex.a)), { dataSize: 3, buffer: r, indices: i, mappingType: t, referenceType: n }
            },
            parseUVs: function(e) {
                var t = e.MappingInformationType,
                    n = e.ReferenceInformationType,
                    r = e.UV.a,
                    i = [];
                return "IndexToDirect" === n && (i = e.UVIndex.a), { dataSize: 2, buffer: r, indices: i, mappingType: t, referenceType: n }
            },
            parseVertexColors: function(e) {
                var t = e.MappingInformationType,
                    n = e.ReferenceInformationType,
                    r = e.Colors.a,
                    i = [];
                return "IndexToDirect" === n && (i = e.ColorIndex.a), { dataSize: 4, buffer: r, indices: i, mappingType: t, referenceType: n }
            },
            parseMaterialIndices: function(e) {
                var t = e.MappingInformationType,
                    n = e.ReferenceInformationType;
                if ("NoMappingInformation" === t) return { dataSize: 1, buffer: [0], indices: [0], mappingType: "AllSame", referenceType: n };
                for (var r = e.Materials.a, i = [], a = 0; a < r.length; ++a) i.push(a);
                return { dataSize: 1, buffer: r, indices: i, mappingType: t, referenceType: n }
            },
            parseNurbsGeometry: function(e) {
                if (void 0 === gh) return console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry."), new Lt;
                var t = parseInt(e.Order);
                if (isNaN(t)) return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", e.Order, e.id), new Lt;
                for (var n, r, i = t - 1, a = e.KnotVector.a, o = [], s = e.Points.a, c = 0, u = s.length; c < u; c += 4) o.push((new C).fromArray(s, c));
                if ("Closed" === e.Form) o.push(o[0]);
                else if ("Periodic" === e.Form)
                    for (n = i, r = a.length - 1 - n, c = 0; c < i; ++c) o.push(o[c]);
                var l = new gh(i, a, o, n, r).getPoints(7 * o.length),
                    h = new Float32Array(3 * l.length);
                l.forEach((function(e, t) { e.toArray(h, 3 * t) }));
                var p = new Lt;
                return p.setAttribute("position", new ut(h, 3)), p
            }
        }, s.prototype = {
            constructor: s,
            parse: function() {
                var e = [],
                    t = this.parseClips();
                if (void 0 !== t)
                    for (var n in t) {
                        var r = t[n],
                            i = this.addClip(r);
                        e.push(i)
                    }
                return e
            },
            parseClips: function() {
                if (void 0 !== e.Objects.AnimationCurve) {
                    var t = this.parseAnimationCurveNodes();
                    this.parseAnimationCurves(t);
                    var n = this.parseAnimationLayers(t);
                    return this.parseAnimStacks(n)
                }
            },
            parseAnimationCurveNodes: function() {
                var t = e.Objects.AnimationCurveNode,
                    n = new Map;
                for (var r in t) {
                    var i = t[r];
                    if (null !== i.attrName.match(/S|R|T|DeformPercent/)) {
                        var a = { id: i.id, attr: i.attrName, curves: {} };
                        n.set(a.id, a)
                    }
                }
                return n
            },
            parseAnimationCurves: function(n) {
                var r = e.Objects.AnimationCurve;
                for (var i in r) {
                    var a = { id: r[i].id, times: r[i].KeyTime.a.map(d), values: r[i].KeyValueFloat.a },
                        o = t.get(a.id);
                    if (void 0 !== o) {
                        var s = o.parents[0].ID,
                            c = o.parents[0].relationship;
                        c.match(/X/) ? n.get(s).curves.x = a : c.match(/Y/) ? n.get(s).curves.y = a : c.match(/Z/) ? n.get(s).curves.z = a : c.match(/d|DeformPercent/) && n.has(s) && (n.get(s).curves.morph = a)
                    }
                }
            },
            parseAnimationLayers: function(r) {
                var i = e.Objects.AnimationLayer,
                    a = new Map;
                for (var o in i) {
                    var s = [],
                        c = t.get(parseInt(o));
                    void 0 !== c && (c.children.forEach((function(i, a) {
                        if (r.has(i.ID)) {
                            var o = r.get(i.ID);
                            if (void 0 !== o.curves.x || void 0 !== o.curves.y || void 0 !== o.curves.z) {
                                if (void 0 === s[a] && void 0 !== (d = t.get(i.ID).parents.filter((function(e) { return void 0 !== e.relationship }))[0].ID)) {
                                    var c = { modelName: (u = e.Objects.Model[d.toString()]).attrName ? qc.sanitizeNodeName(u.attrName) : "", ID: u.id, initialPosition: [0, 0, 0], initialRotation: [0, 0, 0], initialScale: [1, 1, 1] };
                                    n.traverse((function(e) { e.ID === u.id && (c.transform = e.matrix, e.userData.transformData && (c.eulerOrder = e.userData.transformData.eulerOrder)) })), c.transform || (c.transform = new W), "PreRotation" in u && (c.preRotation = u.PreRotation.value), "PostRotation" in u && (c.postRotation = u.PostRotation.value), s[a] = c
                                }
                                s[a] && (s[a][o.attr] = o)
                            } else if (void 0 !== o.curves.morph) {
                                if (void 0 === s[a]) {
                                    var u, l = t.get(i.ID).parents.filter((function(e) { return void 0 !== e.relationship }))[0].ID,
                                        h = t.get(l).parents[0].ID,
                                        p = t.get(h).parents[0].ID,
                                        d = t.get(p).parents[0].ID;
                                    c = { modelName: (u = e.Objects.Model[d]).attrName ? qc.sanitizeNodeName(u.attrName) : "", morphName: e.Objects.Deformer[l].attrName }, s[a] = c
                                }
                                s[a][o.attr] = o
                            }
                        }
                    })), a.set(parseInt(o), s))
                }
                return a
            },
            parseAnimStacks: function(n) {
                var r = e.Objects.AnimationStack,
                    i = {};
                for (var a in r) {
                    var o = t.get(parseInt(a)).children;
                    o.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
                    var s = n.get(o[0].ID);
                    i[a] = { name: r[a].attrName, layer: s }
                }
                return i
            },
            addClip: function(e) {
                var t = [],
                    n = this;
                return e.layer.forEach((function(e) { t = t.concat(n.generateTracks(e)) })), new rs(e.name, -1, t)
            },
            generateTracks: function(e) {
                var t = [],
                    n = new U,
                    r = new D,
                    i = new U;
                if (e.transform && e.transform.decompose(n, r, i), n = n.toArray(), r = (new Y).setFromQuaternion(r, e.eulerOrder).toArray(), i = i.toArray(), void 0 !== e.T && Object.keys(e.T.curves).length > 0) {
                    var a = this.generateVectorTrack(e.modelName, e.T.curves, n, "position");
                    void 0 !== a && t.push(a)
                }
                if (void 0 !== e.R && Object.keys(e.R.curves).length > 0) {
                    var o = this.generateRotationTrack(e.modelName, e.R.curves, r, e.preRotation, e.postRotation, e.eulerOrder);
                    void 0 !== o && t.push(o)
                }
                if (void 0 !== e.S && Object.keys(e.S.curves).length > 0) {
                    var s = this.generateVectorTrack(e.modelName, e.S.curves, i, "scale");
                    void 0 !== s && t.push(s)
                }
                if (void 0 !== e.DeformPercent) {
                    var c = this.generateMorphTrack(e);
                    void 0 !== c && t.push(c)
                }
                return t
            },
            generateVectorTrack: function(e, t, n, r) { var i = this.getTimesForAllAxes(t); return new ns(e + "." + r, i, this.getKeyframeTrackValues(i, t, n)) },
            generateRotationTrack: function(e, t, n, r, i, a) {
                void 0 !== t.x && (this.interpolateRotations(t.x), t.x.values = t.x.values.map(T.degToRad)), void 0 !== t.y && (this.interpolateRotations(t.y), t.y.values = t.y.values.map(T.degToRad)), void 0 !== t.z && (this.interpolateRotations(t.z), t.z.values = t.z.values.map(T.degToRad));
                var o = this.getTimesForAllAxes(t),
                    s = this.getKeyframeTrackValues(o, t, n);
                void 0 !== r && ((r = r.map(T.degToRad)).push(a), r = (new Y).fromArray(r), r = (new D).setFromEuler(r)), void 0 !== i && ((i = i.map(T.degToRad)).push(a), i = (new Y).fromArray(i), i = (new D).setFromEuler(i).inverse());
                for (var c = new D, u = new Y, l = [], h = 0; h < s.length; h += 3) u.set(s[h], s[h + 1], s[h + 2], a), c.setFromEuler(u), void 0 !== r && c.premultiply(r), void 0 !== i && c.multiply(i), c.toArray(l, h / 3 * 4);
                return new es(e + ".quaternion", o, l)
            },
            generateMorphTrack: function(e) {
                var t = e.DeformPercent.curves.morph,
                    r = t.values.map((function(e) { return e / 100 })),
                    i = n.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];
                return new Qo(e.modelName + ".morphTargetInfluences[" + i + "]", t.times, r)
            },
            getTimesForAllAxes: function(e) { var t = []; return void 0 !== e.x && (t = t.concat(e.x.times)), void 0 !== e.y && (t = t.concat(e.y.times)), void 0 !== e.z && (t = t.concat(e.z.times)), t.sort((function(e, t) { return e - t })).filter((function(e, t, n) { return n.indexOf(e) == t })) },
            getKeyframeTrackValues: function(e, t, n) {
                var r = n,
                    i = [],
                    a = -1,
                    o = -1,
                    s = -1;
                return e.forEach((function(e) {
                    if (t.x && (a = t.x.times.indexOf(e)), t.y && (o = t.y.times.indexOf(e)), t.z && (s = t.z.times.indexOf(e)), -1 !== a) {
                        var n = t.x.values[a];
                        i.push(n), r[0] = n
                    } else i.push(r[0]);
                    if (-1 !== o) {
                        var c = t.y.values[o];
                        i.push(c), r[1] = c
                    } else i.push(r[1]);
                    if (-1 !== s) {
                        var u = t.z.values[s];
                        i.push(u), r[2] = u
                    } else i.push(r[2])
                })), i
            },
            interpolateRotations: function(e) {
                for (var t = 1; t < e.values.length; t++) {
                    var n = e.values[t - 1],
                        r = e.values[t] - n,
                        i = Math.abs(r);
                    if (i >= 180) {
                        for (var a = i / 180, o = r / a, s = n + o, c = e.times[t - 1], u = (e.times[t] - c) / a, l = c + u, h = [], p = []; l < e.times[t];) h.push(l), l += u, p.push(s), s += o;
                        e.times = _(e.times, t, h), e.values = _(e.values, t, p)
                    }
                }
            }
        }, c.prototype = {
            constructor: c,
            getPrevNode: function() { return this.nodeStack[this.currentIndent - 2] },
            getCurrentNode: function() { return this.nodeStack[this.currentIndent - 1] },
            getCurrentProp: function() { return this.currentProp },
            pushStack: function(e) { this.nodeStack.push(e), this.currentIndent += 1 },
            popStack: function() { this.nodeStack.pop(), this.currentIndent -= 1 },
            setCurrentProp: function(e, t) { this.currentProp = e, this.currentPropName = t },
            parse: function(e) {
                this.currentIndent = 0, this.allNodes = new h, this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
                var t = this,
                    n = e.split(/[\r\n]+/);
                return n.forEach((function(e, r) {
                    var i = e.match(/^[\s\t]*;/),
                        a = e.match(/^[\s\t]*$/);
                    if (!i && !a) {
                        var o = e.match("^\\t{" + t.currentIndent + "}(\\w+):(.*){", ""),
                            s = e.match("^\\t{" + t.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)"),
                            c = e.match("^\\t{" + (t.currentIndent - 1) + "}}");
                        o ? t.parseNodeBegin(e, o) : s ? t.parseNodeProperty(e, s, n[++r]) : c ? t.popStack() : e.match(/^[^\s\t}]/) && t.parseNodePropertyContinued(e)
                    }
                })), this.allNodes
            },
            parseNodeBegin: function(e, t) {
                var n = t[1].trim().replace(/^"/, "").replace(/"$/, ""),
                    r = t[2].split(",").map((function(e) { return e.trim().replace(/^"/, "").replace(/"$/, "") })),
                    i = { name: n },
                    a = this.parseNodeAttr(r),
                    o = this.getCurrentNode();
                0 === this.currentIndent ? this.allNodes.add(n, i) : n in o ? ("PoseNode" === n ? o.PoseNode.push(i) : void 0 !== o[n].id && (o[n] = {}, o[n][o[n].id] = o[n]), "" !== a.id && (o[n][a.id] = i)) : "number" == typeof a.id ? (o[n] = {}, o[n][a.id] = i) : "Properties70" !== n && (o[n] = "PoseNode" === n ? [i] : i), "number" == typeof a.id && (i.id = a.id), "" !== a.name && (i.attrName = a.name), "" !== a.type && (i.attrType = a.type), this.pushStack(i)
            },
            parseNodeAttr: function(e) {
                var t = e[0];
                "" !== e[0] && (t = parseInt(e[0]), isNaN(t) && (t = e[0]));
                var n = "",
                    r = "";
                return e.length > 1 && (n = e[1].replace(/^(\w+)::/, ""), r = e[2]), { id: t, name: n, type: r }
            },
            parseNodeProperty: function(e, t, n) {
                var r = t[1].replace(/^"/, "").replace(/"$/, "").trim(),
                    i = t[2].replace(/^"/, "").replace(/"$/, "").trim();
                "Content" === r && "," === i && (i = n.replace(/"/g, "").replace(/,$/, "").trim());
                var a = this.getCurrentNode();
                if ("Properties70" !== a.name) {
                    if ("C" === r) {
                        var o = i.split(",").slice(1),
                            s = parseInt(o[0]),
                            c = parseInt(o[1]),
                            u = i.split(",").slice(3);
                        r = "connections",
                            function(e, t) { for (var n = 0, r = e.length, i = t.length; n < i; n++, r++) e[r] = t[n] }(i = [s, c], u = u.map((function(e) { return e.trim().replace(/^"/, "") }))), void 0 === a[r] && (a[r] = [])
                    }
                    "Node" === r && (a.id = i), r in a && Array.isArray(a[r]) ? a[r].push(i) : "a" !== r ? a[r] = i : a.a = i, this.setCurrentProp(a, r), "a" === r && "," !== i.slice(-1) && (a.a = b(i))
                } else this.parseNodeSpecialProperty(e, r, i)
            },
            parseNodePropertyContinued: function(e) {
                var t = this.getCurrentNode();
                t.a += e, "," !== e.slice(-1) && (t.a = b(t.a))
            },
            parseNodeSpecialProperty: function(e, t, n) {
                var r = n.split('",').map((function(e) { return e.trim().replace(/^\"/, "").replace(/\s/, "_") })),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    s = r[3],
                    c = r[4];
                switch (a) {
                    case "int":
                    case "enum":
                    case "bool":
                    case "ULongLong":
                    case "double":
                    case "Number":
                    case "FieldOfView":
                        c = parseFloat(c);
                        break;
                    case "Color":
                    case "ColorRGB":
                    case "Vector3D":
                    case "Lcl_Translation":
                    case "Lcl_Rotation":
                    case "Lcl_Scaling":
                        c = b(c)
                }
                this.getPrevNode()[i] = { type: a, type2: o, flag: s, value: c }, this.setCurrentProp(this.getPrevNode(), i)
            }
        }, u.prototype = {
            constructor: u,
            parse: function(e) {
                var t = new l(e);
                t.skip(23);
                var n = t.getUint32();
                console.log("THREE.FBXLoader: FBX binary version: " + n);
                for (var r = new h; !this.endOfContent(t);) {
                    var i = this.parseNode(t, n);
                    null !== i && r.add(i.name, i)
                }
                return r
            },
            endOfContent: function(e) { return e.size() % 16 == 0 ? (e.getOffset() + 160 + 16 & -16) >= e.size() : e.getOffset() + 160 + 16 >= e.size() },
            parseNode: function(e, t) {
                var n = {},
                    r = t >= 7500 ? e.getUint64() : e.getUint32(),
                    i = t >= 7500 ? e.getUint64() : e.getUint32(),
                    a = (t >= 7500 ? e.getUint64() : e.getUint32(), e.getUint8()),
                    o = e.getString(a);
                if (0 === r) return null;
                for (var s = [], c = 0; c < i; c++) s.push(this.parseProperty(e));
                var u = s.length > 0 ? s[0] : "",
                    l = s.length > 1 ? s[1] : "",
                    h = s.length > 2 ? s[2] : "";
                for (n.singleProperty = 1 === i && e.getOffset() === r; r > e.getOffset();) {
                    var p = this.parseNode(e, t);
                    null !== p && this.parseSubNode(o, n, p)
                }
                return n.propertyList = s, "number" == typeof u && (n.id = u), "" !== l && (n.attrName = l), "" !== h && (n.attrType = h), "" !== o && (n.name = o), n
            },
            parseSubNode: function(e, t, n) {
                if (!0 === n.singleProperty) {
                    var r = n.propertyList[0];
                    Array.isArray(r) ? (t[n.name] = n, n.a = r) : t[n.name] = r
                } else if ("Connections" === e && "C" === n.name) {
                    var i = [];
                    n.propertyList.forEach((function(e, t) { 0 !== t && i.push(e) })), void 0 === t.connections && (t.connections = []), t.connections.push(i)
                } else if ("Properties70" === n.name) Object.keys(n).forEach((function(e) { t[e] = n[e] }));
                else if ("Properties70" === e && "P" === n.name) {
                    var a, o = n.propertyList[0],
                        s = n.propertyList[1],
                        c = n.propertyList[2],
                        u = n.propertyList[3];
                    0 === o.indexOf("Lcl ") && (o = o.replace("Lcl ", "Lcl_")), 0 === s.indexOf("Lcl ") && (s = s.replace("Lcl ", "Lcl_")), a = "Color" === s || "ColorRGB" === s || "Vector" === s || "Vector3D" === s || 0 === s.indexOf("Lcl_") ? [n.propertyList[4], n.propertyList[5], n.propertyList[6]] : n.propertyList[4], t[o] = { type: s, type2: c, flag: u, value: a }
                } else void 0 === t[n.name] ? "number" == typeof n.id ? (t[n.name] = {}, t[n.name][n.id] = n) : t[n.name] = n : "PoseNode" === n.name ? (Array.isArray(t[n.name]) || (t[n.name] = [t[n.name]]), t[n.name].push(n)) : void 0 === t[n.name][n.id] && (t[n.name][n.id] = n)
            },
            parseProperty: function(e) {
                var t = e.getString(1);
                switch (t) {
                    case "C":
                        return e.getBoolean();
                    case "D":
                        return e.getFloat64();
                    case "F":
                        return e.getFloat32();
                    case "I":
                        return e.getInt32();
                    case "L":
                        return e.getInt64();
                    case "R":
                        var n = e.getUint32();
                        return e.getArrayBuffer(n);
                    case "S":
                        return n = e.getUint32(), e.getString(n);
                    case "Y":
                        return e.getInt16();
                    case "b":
                    case "c":
                    case "d":
                    case "f":
                    case "i":
                    case "l":
                        var r = e.getUint32(),
                            i = e.getUint32(),
                            a = e.getUint32();
                        if (0 === i) switch (t) {
                            case "b":
                            case "c":
                                return e.getBooleanArray(r);
                            case "d":
                                return e.getFloat64Array(r);
                            case "f":
                                return e.getFloat32Array(r);
                            case "i":
                                return e.getInt32Array(r);
                            case "l":
                                return e.getInt64Array(r)
                        }
                        void 0 === mh && console.error("THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js");
                        var o = new l(new mh.Inflate(new Uint8Array(e.getArrayBuffer(a))).decompress().buffer);
                        switch (t) {
                            case "b":
                            case "c":
                                return o.getBooleanArray(r);
                            case "d":
                                return o.getFloat64Array(r);
                            case "f":
                                return o.getFloat32Array(r);
                            case "i":
                                return o.getInt32Array(r);
                            case "l":
                                return o.getInt64Array(r)
                        }
                    default:
                        throw new Error("THREE.FBXLoader: Unknown property type " + t)
                }
            }
        }, l.prototype = { constructor: l, getOffset: function() { return this.offset }, size: function() { return this.dv.buffer.byteLength }, skip: function(e) { this.offset += e }, getBoolean: function() { return 1 == (1 & this.getUint8()) }, getBooleanArray: function(e) { for (var t = [], n = 0; n < e; n++) t.push(this.getBoolean()); return t }, getUint8: function() { var e = this.dv.getUint8(this.offset); return this.offset += 1, e }, getInt16: function() { var e = this.dv.getInt16(this.offset, this.littleEndian); return this.offset += 2, e }, getInt32: function() { var e = this.dv.getInt32(this.offset, this.littleEndian); return this.offset += 4, e }, getInt32Array: function(e) { for (var t = [], n = 0; n < e; n++) t.push(this.getInt32()); return t }, getUint32: function() { var e = this.dv.getUint32(this.offset, this.littleEndian); return this.offset += 4, e }, getInt64: function() { var e, t; return this.littleEndian ? (e = this.getUint32(), t = this.getUint32()) : (t = this.getUint32(), e = this.getUint32()), 2147483648 & t ? (t = 4294967295 & ~t, 4294967295 == (e = 4294967295 & ~e) && (t = t + 1 & 4294967295), -(4294967296 * t + (e = e + 1 & 4294967295))) : 4294967296 * t + e }, getInt64Array: function(e) { for (var t = [], n = 0; n < e; n++) t.push(this.getInt64()); return t }, getUint64: function() { var e, t; return this.littleEndian ? (e = this.getUint32(), t = this.getUint32()) : (t = this.getUint32(), e = this.getUint32()), 4294967296 * t + e }, getFloat32: function() { var e = this.dv.getFloat32(this.offset, this.littleEndian); return this.offset += 4, e }, getFloat32Array: function(e) { for (var t = [], n = 0; n < e; n++) t.push(this.getFloat32()); return t }, getFloat64: function() { var e = this.dv.getFloat64(this.offset, this.littleEndian); return this.offset += 8, e }, getFloat64Array: function(e) { for (var t = [], n = 0; n < e; n++) t.push(this.getFloat64()); return t }, getArrayBuffer: function(e) { var t = this.dv.buffer.slice(this.offset, this.offset + e); return this.offset += e, t }, getString: function(e) { for (var t = [], n = 0; n < e; n++) t[n] = this.getUint8(); var r = t.indexOf(0); return r >= 0 && (t = t.slice(0, r)), $s.decodeText(new Uint8Array(t)) } }, h.prototype = { constructor: h, add: function(e, t) { this[e] = t } };
        var f = [];

        function m(e, t, n, r) {
            var i;
            switch (r.mappingType) {
                case "ByPolygonVertex":
                    i = e;
                    break;
                case "ByPolygon":
                    i = t;
                    break;
                case "ByVertice":
                    i = n;
                    break;
                case "AllSame":
                    i = r.indices[0];
                    break;
                default:
                    console.warn("THREE.FBXLoader: unknown attribute mapping type " + r.mappingType)
            }
            "IndexToDirect" === r.referenceType && (i = r.indices[i]);
            var a = i * r.dataSize,
                o = a + r.dataSize;
            return function(e, t, n, r) { for (var i = n, a = 0; i < r; i++, a++) e[a] = t[i]; return e }(f, r.buffer, a, o)
        }
        var v = new Y,
            g = new U;

        function y(e) {
            var t, n = new W,
                r = new W,
                i = new W,
                a = new W,
                o = new W,
                s = new W,
                c = new W,
                u = new W,
                l = new W,
                h = new W,
                p = new W,
                d = e.inheritType ? e.inheritType : 0;
            e.translation && n.setPosition(g.fromArray(e.translation)), e.preRotation && ((t = e.preRotation.map(T.degToRad)).push(e.eulerOrder), r.makeRotationFromEuler(v.fromArray(t))), e.rotation && ((t = e.rotation.map(T.degToRad)).push(e.eulerOrder), i.makeRotationFromEuler(v.fromArray(t))), e.postRotation && ((t = e.postRotation.map(T.degToRad)).push(e.eulerOrder), a.makeRotationFromEuler(v.fromArray(t))), e.scale && o.scale(g.fromArray(e.scale)), e.scalingOffset && c.setPosition(g.fromArray(e.scalingOffset)), e.scalingPivot && s.setPosition(g.fromArray(e.scalingPivot)), e.rotationOffset && u.setPosition(g.fromArray(e.rotationOffset)), e.rotationPivot && l.setPosition(g.fromArray(e.rotationPivot)), e.parentMatrixWorld && (h = e.parentMatrixWorld);
            var f = r.multiply(i).multiply(a),
                m = new W;
            h.extractRotation(m);
            var y, x, b, w, _ = new W;
            if (_.copyPosition(h), b = _.getInverse(_).multiply(h), x = m.getInverse(m).multiply(b), y = o, 0 === d) w = m.multiply(f).multiply(x).multiply(y);
            else if (1 === d) w = m.multiply(x).multiply(f).multiply(y);
            else {
                var M = (new W).copy(o),
                    S = x.multiply(M.getInverse(M));
                w = m.multiply(f).multiply(S).multiply(y)
            }
            var E = n.multiply(u).multiply(l).multiply(r).multiply(i).multiply(a).multiply(l.getInverse(l)).multiply(c).multiply(s).multiply(o).multiply(s.getInverse(s)),
                A = (new W).copyPosition(E),
                L = h.multiply(A);
            return p.copyPosition(L), p.multiply(w)
        }

        function x(e) { var t = ["ZYX", "YZX", "XZY", "ZXY", "YXZ", "XYZ"]; return 6 === (e = e || 0) ? (console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."), t[0]) : t[e] }

        function b(e) { return e.split(",").map((function(e) { return parseFloat(e) })) }

        function w(e, t, n) { return void 0 === t && (t = 0), void 0 === n && (n = e.byteLength), $s.decodeText(new Uint8Array(e, t, n)) }

        function _(e, t, n) { return e.slice(0, t).concat(n).concat(e.slice(t)) }
        return r
    }(),
    xh = function(e) { ds.call(this, e), this.type = 1009 };
xh.prototype = Object.assign(Object.create(ds.prototype), {
    constructor: xh,
    parse: function(e) {
        var t = function(e, t) {
                switch (e) {
                    case 1:
                        console.error("RGBELoader Read Error: " + (t || ""));
                        break;
                    case 2:
                        console.error("RGBELoader Write Error: " + (t || ""));
                        break;
                    case 3:
                        console.error("RGBELoader Bad File Format: " + (t || ""));
                        break;
                    default:
                    case 4:
                        console.error("RGBELoader: Error: " + (t || ""))
                }
                return -1
            },
            n = function(e, t, n) { t = t || 1024; for (var r = e.pos, i = -1, a = 0, o = "", s = String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128))); 0 > (i = s.indexOf("\n")) && a < t && r < e.byteLength;) o += s, a += s.length, r += 128, s += String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128))); return -1 < i && (!1 !== n && (e.pos += a + i + 1), o + s.slice(0, i)) },
            r = function() {
                var e = new Float32Array(1),
                    t = new Int32Array(e.buffer);

                function n(n) {
                    e[0] = n;
                    var r = t[0],
                        i = r >> 16 & 32768,
                        a = r >> 12 & 2047,
                        o = r >> 23 & 255;
                    return o < 103 ? i : o > 142 ? (i |= 31744, i |= (255 == o ? 0 : 1) && 8388607 & r) : o < 113 ? i |= ((a |= 2048) >> 114 - o) + (a >> 113 - o & 1) : (i |= o - 112 << 10 | a >> 1, i += 1 & a)
                }
                return function(e, t, r, i) {
                    var a = e[t + 3],
                        o = Math.pow(2, a - 128) / 255;
                    r[i + 0] = n(e[t + 0] * o), r[i + 1] = n(e[t + 1] * o), r[i + 2] = n(e[t + 2] * o)
                }
            }(),
            i = new Uint8Array(e);
        i.pos = 0;
        var a, o, s, c, u, l, h = function(e) {
            var r, i, a = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
                o = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
                s = /^\s*FORMAT=(\S+)\s*$/,
                c = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
                u = { valid: 0, string: "", comments: "", programtype: "RGBE", format: "", gamma: 1, exposure: 1, width: 0, height: 0 };
            if (e.pos >= e.byteLength || !(r = n(e))) return t(1, "no header found");
            if (!(i = r.match(/^#\?(\S+)$/))) return t(3, "bad initial token");
            for (u.valid |= 1, u.programtype = i[1], u.string += r + "\n"; !1 !== (r = n(e));)
                if (u.string += r + "\n", "#" !== r.charAt(0)) { if ((i = r.match(a)) && (u.gamma = parseFloat(i[1], 10)), (i = r.match(o)) && (u.exposure = parseFloat(i[1], 10)), (i = r.match(s)) && (u.valid |= 2, u.format = i[1]), (i = r.match(c)) && (u.valid |= 4, u.height = parseInt(i[1], 10), u.width = parseInt(i[2], 10)), 2 & u.valid && 4 & u.valid) break } else u.comments += r + "\n";
            return 2 & u.valid ? 4 & u.valid ? u : t(3, "missing image size specifier") : t(3, "missing format specifier")
        }(i);
        if (-1 !== h) {
            var p = h.width,
                d = h.height,
                f = function(e, n, r) {
                    var i, a, o, s, c, u, l, h, p, d, f, m, v, g = n,
                        y = r;
                    if (g < 8 || g > 32767 || 2 !== e[0] || 2 !== e[1] || 128 & e[2]) return new Uint8Array(e);
                    if (g !== (e[2] << 8 | e[3])) return t(3, "wrong scanline width");
                    if (!(i = new Uint8Array(4 * n * r)) || !i.length) return t(4, "unable to allocate buffer space");
                    for (a = 0, o = 0, h = 4 * g, v = new Uint8Array(4), u = new Uint8Array(h); y > 0 && o < e.byteLength;) {
                        if (o + 4 > e.byteLength) return t(1);
                        if (v[0] = e[o++], v[1] = e[o++], v[2] = e[o++], v[3] = e[o++], 2 != v[0] || 2 != v[1] || (v[2] << 8 | v[3]) != g) return t(3, "bad rgbe scanline format");
                        for (l = 0; l < h && o < e.byteLength;) {
                            if ((m = (s = e[o++]) > 128) && (s -= 128), 0 === s || l + s > h) return t(3, "bad scanline data");
                            if (m)
                                for (c = e[o++], p = 0; p < s; p++) u[l++] = c;
                            else u.set(e.subarray(o, o + s), l), l += s, o += s
                        }
                        for (d = g, p = 0; p < d; p++) f = 0, i[a] = u[p + f], f += g, i[a + 1] = u[p + f], f += g, i[a + 2] = u[p + f], f += g, i[a + 3] = u[p + f], a += 4;
                        y--
                    }
                    return i
                }(i.subarray(i.pos), p, d);
            if (-1 !== f) {
                switch (this.type) {
                    case 1009:
                        var m = f,
                            v = 1023,
                            g = 1009;
                        break;
                    case 1015:
                        for (var y = f.length / 4 * 3, x = new Float32Array(y), b = 0; b < y; b++) s = x, c = 3 * b, void 0, void 0, u = (a = f)[3 + (o = 4 * b)], l = Math.pow(2, u - 128) / 255, s[c + 0] = a[o + 0] * l, s[c + 1] = a[o + 1] * l, s[c + 2] = a[o + 2] * l;
                        m = x, v = 1022, g = 1015;
                        break;
                    case 1016:
                        y = f.length / 4 * 3;
                        var w = new Uint16Array(y);
                        for (b = 0; b < y; b++) r(f, 4 * b, w, 3 * b);
                        m = w, v = 1022, g = 1016;
                        break;
                    default:
                        console.error("THREE.RGBELoader: unsupported type: ", this.type)
                }
                return { width: p, height: d, data: m, header: h.string, gamma: h.gamma, exposure: h.exposure, format: v, type: g }
            }
        }
        return null
    },
    setDataType: function(e) { return this.type = e, this },
    load: function(e, t, n, r) {
        return ds.prototype.load.call(this, e, (function(e, n) {
            switch (e.type) {
                case 1009:
                    e.encoding = 3002, e.minFilter = 1003, e.magFilter = 1003, e.generateMipmaps = !1, e.flipY = !0;
                    break;
                case 1015:
                case 1016:
                    e.encoding = 3e3, e.minFilter = 1006, e.magFilter = 1006, e.generateMipmaps = !1, e.flipY = !0
            }
            t && t(e, n)
        }), n, r)
    }
});
var bh = function() {
        function e(t) { a(this, e), this.current = 0, this.total = 0, this.config = t, this.imgList = [] }
        return s(e, [{
            key: "loadGroups",
            value: function(e) {
                var t = this,
                    n = this.config.groups.find((function(t) { return t.name === e }));
                return new Promise((function(e, r) {
                    if (n) {
                        var i = n.keys.split(",");
                        t.total = i.length, t.current = 0;
                        var a, o = m(i);
                        try {
                            var s = function() {
                                var n = a.value,
                                    r = t.config.resources.find((function(e) { return e.name === n }));
                                if (r) switch (r.type) {
                                    case "image":
                                        var i = new Image;
                                        i.setAttribute("crossOrigin", "Anonymous"), i.src = r.url, t.imgList.filter((function(e) { return e.name === n })).length ? (t.current++, t.current === t.total && e()) : (t.imgList.push({ name: n, img: i }), i.onload = function() { t.current++, t.current === t.total && e() });
                                        break;
                                    default:
                                        t.current++, t.current === t.total && e()
                                }
                            };
                            for (o.s(); !(a = o.n()).done;) s()
                        } catch (e) { o.e(e) } finally { o.f() }
                    } else r()
                }))
            }
        }, {
            key: "getRes",
            value: function(e) {
                var t = this.config.resources.find((function(t) { return t.name === e }));
                if (t) switch (t.type) {
                    case "image":
                        return this.imgList.find((function(t) { return t.name === e })).img;
                    default:
                        return !1
                }
            }
        }], [{ key: "loadImg", value: function(e) { var t = this; return new Promise((function(n) { t.instenceTextureLoader.load(e, (function(e) { n(e) })) })) } }, {
            key: "initEnvMap",
            value: function(e) {
                var t = this;
                return new Promise((function(n) {
                    (new xh).setDataType(1009).load(e, (function(e) {
                        var r = t.pmremGenerator.fromEquirectangular(e).texture;
                        t.pmremGenerator.dispose(), n(r)
                    }))
                }))
            }
        }, {
            key: "loadGLTF",
            value: function(e, t, n) {
                var r = this;
                return new Promise((function(n) {
                    r.instenceGLTFLoader.load(e, (function(e) {
                        var t = e.scene || e.scenes[0];
                        r.traverseMat(t, (function(e) { e.depthWrite = !e.transparent, e.map && (e.map.encoding = 3001, e.map.needsUpdate = !0), e.emissiveMap && (e.emissiveMap.encoding = 3001, e.emissiveMap.needsUpdate = !0) })), n(t)
                    }), (function(e) { t && t(e) }))
                }))
            }
        }, { key: "traverseMat", value: function(e, t) { e.traverse((function(e) { e.isMesh && (Array.isArray(e.material) ? e.material : [e.material]).forEach(t) })) } }, { key: "loadFBX", value: function(e, t) { var n = this; return new Promise((function(t) { n.instenceFBXLoader.load(e, (function(e) { console.log(e), t(e) })) })) } }, {
            key: "instenceGLTFLoader",
            get: function() {
                if (!this.gltfLoader) {
                    var e = new Pl,
                        t = new Cl;
                    return t.setDecoderPath("https://shopact-static.vivo.com.cn/vgameLoader/"), t.setDecoderConfig({ type: "js" }), t.preload(), e.setDRACOLoader(t), e
                }
                return this.gltfLoader
            }
        }, { key: "instenceFBXLoader", get: function() { return this.fbxLoader ? this.fbxLoader : new yh } }, { key: "instenceTextureLoader", get: function() { return this.textureLoader ? this.textureLoader : new vs } }]), e
    }(),
    wh = { linear: function(e) { return e }, inQuad: function(e) { return e * e }, outQuad: function(e) { return e * (2 - e) }, inOutQuad: function(e) { return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1) }, inCube: function(e) { return e * e * e }, outCube: function(e) { return --e * e * e + 1 }, inOutCube: function(e) { return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2) } },
    _h = function() {
        function e(t) { a(this, e), this.timmer = 0, this.node = t }
        return s(e, [{
            key: "to",
            value: function(e) {
                for (var t = this, n = Object.keys(e), r = {}, i = e.time || 120, a = e.type || "linear", o = e.repeat || "false", s = 0, c = 0, u = n; c < u.length; c++) {
                    var l = u[c];
                    this.verifiedKey(l) && (r[l] = this.node[l])
                }
                return this.stop(), new Promise((function(c) {
                    t.timmer = Ll.add((function(u) {
                        if (++s > i)
                            if ("false" === o) {
                                var l, h = m(n);
                                try {
                                    for (h.s(); !(l = h.n()).done;) {
                                        var p = l.value;
                                        t.verifiedKey(p) && (t.node[p] = e[p])
                                    }
                                } catch (e) { h.e(e) } finally { h.f() }
                                t.stop(), c()
                            } else if ("infinity" === o.toLowerCase()) s = 0;
                        else if ("0" !== o) {
                            s = 0;
                            var d = Number(o);
                            o = String(--d)
                        } else t.stop();
                        else {
                            var f, v = s / i,
                                g = wh[a](v),
                                y = m(n);
                            try {
                                for (y.s(); !(f = y.n()).done;) {
                                    var x = f.value;
                                    t.verifiedKey(x) && (t.node[x] = r[x] + (e[x] - r[x]) * g)
                                }
                            } catch (e) { y.e(e) } finally { y.f() }
                        }
                    }))
                }))
            }
        }, {
            key: "repeat",
            value: function(e) {
                for (var t = this, n = Object.keys(e), r = {}, i = e.time || 120, a = e.type || "linear", o = e.repeat || "false", s = 0, c = 0, u = n; c < u.length; c++) {
                    var l = u[c];
                    this.verifiedKey(l) && (r[l] = this.node[l])
                }
                this.stop(), this.timmer = Ll.add((function(c) {
                    if (++s > i)
                        if ("infinity" === o.toLowerCase()) s = 0;
                        else if ("0" !== o) {
                        s = 0;
                        var u = Number(o);
                        o = String(--u)
                    } else t.stop();
                    else {
                        var l, h = s / i,
                            p = wh[a](h),
                            d = m(n);
                        try {
                            for (d.s(); !(l = d.n()).done;) {
                                var f = l.value;
                                t.verifiedKey(f) && (t.node[f] = r[f] + (e[f] - r[f]) * p)
                            }
                        } catch (e) { d.e(e) } finally { d.f() }
                    }
                }))
            }
        }, { key: "stop", value: function() { this.timmer && Ll.remove(this.timmer) } }, { key: "verifiedKey", value: function(e) { return ["x", "y", "z", "width", "height", "rotate", "alpha", "rotateX", "rotateY", "rotateZ", "scale"].findIndex((function(t) { return t === e })) > -1 } }]), e
    }(),
    Mh = function(e) {
        u(n, Sl);
        var t = d(n);

        function n(e, r, i, o) { var s; return a(this, n), (s = t.call(this)).track = { name: "", frame: 0, end: 0 }, s.frame = 0, s.playing = !1, s.rate = 1, s.loop = 1, s.timmer = 0, s.save = !1, s.nodeType = "movie", s.clip = e, s.res = r, s.maps = o, s.material = i, s.rate = Math.floor(60 / e.frameRate) || 1, s.movie = new Ui, s }
        return s(n, [{
            key: "_update",
            value: function(e) {
                var t, n = this,
                    r = m(this.deleteList);
                try {
                    var i = function() {
                        var e = t.value;
                        e.onDestroy(), n.children.splice(n.children.findIndex((function(t) { return t.id === e.id })), 1), n.sence.remove(e[e.nodeType])
                    };
                    for (r.s(); !(t = r.n()).done;) i()
                } catch (e) { r.e(e) } finally { r.f() }
                this.deleteList = [];
                var a, o = m(this.children);
                try {
                    for (o.s(); !(a = o.n()).done;) {
                        var s = a.value;
                        s._update(e), s.update(e)
                    }
                } catch (e) { o.e(e) } finally { o.f() }
                if (this.playing) {
                    var c = this.clip.frames[this.frame],
                        u = this.res[c.res];
                    this.width = u.w, this.height = u.h, this.movie.scale.set(this.width, this.height, 1), this.movie.material = this.material, this.movie.material.rotation = -this.rotate * Math.PI / 180, this.movie.material.map && (this.movie.material.map.offset = this.maps[c.res].offset, this.movie.material.map.repeat = this.maps[c.res].repeat), this.movie.center.set(this.anchor.x, this.anchor.y), this.movie.position.set(this.x - c.x, this.y - c.y, 10)
                }
                this.movie.visible = this.active
            }
        }, {
            key: "play",
            value: function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                    r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                this.timmer && Ll.remove(this.timmer), this.loop = n, this.save = r;
                var i = this.clip.labels.filter((function(t) { return t.name === e }));
                return !!i.length && (this.track = i[0], this.frame = this.track.frame - 1, this.playing = !0, new Promise((function(e) { t.timmer = Ll.interval((function() { t.frame++, t.frame === t.track.end && (0 === t.loop ? t.frame = t.track.frame - 1 : 1 === t.loop ? (t.stop(), e()) : (t.loop--, t.frame = t.track.frame - 1)), console.log(123) }), t.rate) })))
            }
        }, { key: "stop", value: function() { Ll.remove(this.timmer), this.playing = !1, this.save ? this.frame = this.track.end - 1 : this.frame = 0 } }]), n
    }(),
    Sh = function() {
        function e(t, n) {
            a(this, e), this.config = n, this.texture = t, this.maps = {};
            var r = n.res,
                i = Object.keys(r),
                o = new Si;
            o.map = t, this.material = o;
            var s = t.image.src;
            console.log(s);
            for (var c = 0, u = i; c < u.length; c++) {
                var l = u[c],
                    h = { offset: new E(r[l].x / t.image.width, 1 - (r[l].y + r[l].h) / t.image.height), repeat: new E(r[l].w / t.image.width, r[l].h / t.image.height) };
                this.maps[l] = h
            }
        }
        return s(e, [{
            key: "getMovie",
            value: function(e) {
                var t = this.config.mc[e],
                    n = this.config.res;
                return new Mh(t, n, this.material, this.maps)
            }
        }]), e
    }(),
    Th = function(e, t) {
        var n, r, i, a, o;
        void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'), t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.object = e, this.domElement = t, this.zoomStart = 0, this.zoomDampingFactor = .2, this.smoothZoomSpeed = 2.3, this.smoothZoom = !0, this.smoothZoomUpdate = function() {
            var e = 1 + (0 - this.zoomStart) * this.smoothZoomSpeed;
            v *= e, this.zoomStart += (0 - this.zoomStart) * this.zoomDampingFactor
        }, this.enabled = !0, this.target = new U, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }, this.mouseButtons = { LEFT: x.ROTATE, MIDDLE: x.DOLLY, RIGHT: x.ROTATE }, this.touches = { ONE: b.ROTATE, TWO: b.DOLLY_ROTATE }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function() { return f.phi }, this.getAzimuthalAngle = function() { return f.theta }, this.saveState = function() { s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object.zoom }, this.reset = function() { s.target.copy(s.target0), s.object.position.copy(s.position0), s.object.zoom = s.zoom0, s.object.updateProjectionMatrix(), s.dispatchEvent(c), s.update(), p = h.NONE }, this.update = (n = new U, r = (new D).setFromUnitVectors(e.up, new U(0, 1, 0)), i = r.clone().inverse(), a = new U, o = new D, function() { var e = s.object.position; return n.copy(e).sub(s.target), n.applyQuaternion(r), f.setFromVector3(n), s.autoRotate && p === h.NONE && O(2 * Math.PI / 60 / 60 * s.autoRotateSpeed), s.enableDamping ? (f.theta += m.theta * s.dampingFactor, f.phi += m.phi * s.dampingFactor) : (f.theta += m.theta, f.phi += m.phi), f.theta = Math.max(s.minAzimuthAngle, Math.min(s.maxAzimuthAngle, f.theta)), f.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, f.phi)), f.makeSafe(), f.radius *= v, f.radius = Math.max(s.minDistance, Math.min(s.maxDistance, f.radius)), !0 === s.enableDamping ? s.target.addScaledVector(g, s.dampingFactor) : s.target.add(g), n.setFromSpherical(f), n.applyQuaternion(i), e.copy(s.target).add(n), s.object.lookAt(s.target), !0 === s.enableDamping ? (m.theta *= 1 - s.dampingFactor, m.phi *= 1 - s.dampingFactor, g.multiplyScalar(1 - s.dampingFactor)) : (m.set(0, 0, 0), g.set(0, 0, 0)), v = 1, y || a.distanceToSquared(s.object.position) > d || 8 * (1 - o.dot(s.object.quaternion)) > d ? (s.dispatchEvent(c), a.copy(s.object.position), o.copy(s.object.quaternion), y = !1, !0) : (s.smoothZoomUpdate(), !1) }), this.dispose = function() { s.domElement.removeEventListener("contextmenu", re, !1), s.domElement.removeEventListener("mousedown", Z, !1), s.domElement.removeEventListener("wheel", Q, !1), s.domElement.removeEventListener("touchstart", ee, !1), s.domElement.removeEventListener("touchend", ne, !1), s.domElement.removeEventListener("touchmove", te, !1), document.removeEventListener("mousemove", J, !1), document.removeEventListener("mouseup", K, !1), s.domElement.removeEventListener("keydown", $, !1) };
        var s = this,
            c = { type: "change" },
            u = { type: "start" },
            l = { type: "end" },
            h = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 },
            p = h.NONE,
            d = 1e-6,
            f = new tu,
            m = new tu,
            v = 1,
            g = new U,
            y = !1,
            w = new E,
            _ = new E,
            M = new E,
            S = new E,
            T = new E,
            A = new E,
            L = new E,
            R = new E,
            P = new E;

        function C() { return Math.pow(.95, s.zoomSpeed) }

        function O(e) { m.theta -= e }

        function I(e) { m.phi -= e }
        var N = function() { var e = new U; return function(t, n) { e.setFromMatrixColumn(n, 0), e.multiplyScalar(-t), g.add(e) } }(),
            F = function() { var e = new U; return function(t, n) {!0 === s.screenSpacePanning ? e.setFromMatrixColumn(n, 1) : (e.setFromMatrixColumn(n, 0), e.crossVectors(s.object.up, e)), e.multiplyScalar(t), g.add(e) } }(),
            B = function() {
                var e = new U;
                return function(t, n) {
                    var r = s.domElement;
                    if (s.object.isPerspectiveCamera) {
                        var i = s.object.position;
                        e.copy(i).sub(s.target);
                        var a = e.length();
                        a *= Math.tan(s.object.fov / 2 * Math.PI / 180), N(2 * t * a / r.clientHeight, s.object.matrix), F(2 * n * a / r.clientHeight, s.object.matrix)
                    } else s.object.isOrthographicCamera ? (N(t * (s.object.right - s.object.left) / s.object.zoom / r.clientWidth, s.object.matrix), F(n * (s.object.top - s.object.bottom) / s.object.zoom / r.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = !1)
                }
            }();

        function k(e) { s.object.isPerspectiveCamera ? v /= e : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * e)), s.object.updateProjectionMatrix(), y = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1) }

        function z(e) { s.object.isPerspectiveCamera ? v *= e : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / e)), s.object.updateProjectionMatrix(), y = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1) }

        function G(e) { w.set(e.clientX, e.clientY) }

        function H(e) { S.set(e.clientX, e.clientY) }

        function j(e) {
            if (1 == e.touches.length) w.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                w.set(t, n)
            }
        }

        function V(e) {
            if (1 == e.touches.length) S.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                S.set(t, n)
            }
        }

        function W(e) {
            var t = e.touches[0].pageX - e.touches[1].pageX,
                n = e.touches[0].pageY - e.touches[1].pageY,
                r = Math.sqrt(t * t + n * n);
            L.set(0, r)
        }

        function q(e) {
            if (1 == e.touches.length) _.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                _.set(t, n)
            }
            M.subVectors(_, w).multiplyScalar(s.rotateSpeed);
            var r = s.domElement;
            O(2 * Math.PI * M.x / r.clientHeight), I(2 * Math.PI * M.y / r.clientHeight), w.copy(_)
        }

        function X(e) {
            if (1 == e.touches.length) T.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                T.set(t, n)
            }
            A.subVectors(T, S).multiplyScalar(s.panSpeed), B(A.x, A.y), S.copy(T)
        }

        function Y(e) {
            var t = e.touches[0].pageX - e.touches[1].pageX,
                n = e.touches[0].pageY - e.touches[1].pageY,
                r = Math.sqrt(t * t + n * n);
            R.set(0, r), P.set(0, Math.pow(R.y / L.y, s.zoomSpeed)), k(P.y), L.copy(R)
        }

        function Z(e) {
            if (!1 !== s.enabled) {
                var t;
                switch (e.preventDefault(), !s.rotateSpeed && (s.rotateSpeed = 1), s.domElement.focus ? s.domElement.focus() : window.focus(), e.button) {
                    case 0:
                        t = s.mouseButtons.LEFT;
                        break;
                    case 1:
                        t = s.mouseButtons.MIDDLE;
                        break;
                    case 2:
                        t = s.mouseButtons.RIGHT;
                        break;
                    default:
                        t = -1
                }
                switch (t) {
                    case x.DOLLY:
                        if (!1 === s.enableZoom) return;
                        ! function(e) { L.set(e.clientX, e.clientY) }(e), p = h.DOLLY;
                        break;
                    case x.ROTATE:
                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                            if (!1 === s.enablePan) return;
                            H(e), p = h.PAN
                        } else {
                            if (!1 === s.enableRotate) return;
                            G(e), p = h.ROTATE
                        }
                        break;
                    case x.PAN:
                        if (e.ctrlKey || e.metaKey || e.shiftKey) {
                            if (!1 === s.enableRotate) return;
                            G(e), p = h.ROTATE
                        } else {
                            if (!1 === s.enablePan) return;
                            H(e), p = h.PAN
                        }
                        break;
                    default:
                        p = h.NONE
                }
                p !== h.NONE && (document.addEventListener("mousemove", J, !1), document.addEventListener("mouseup", K, !1), s.dispatchEvent(u))
            }
        }

        function J(e) {
            if (!1 !== s.enabled) switch (e.preventDefault(), p) {
                case h.ROTATE:
                    if (!1 === s.enableRotate) return;
                    ! function(e) {
                        _.set(e.clientX, e.clientY), M.subVectors(_, w).multiplyScalar(s.rotateSpeed);
                        var t = s.domElement;
                        O(2 * Math.PI * M.x / t.clientHeight), I(2 * Math.PI * M.y / t.clientHeight), w.copy(_), s.update()
                    }(e);
                    break;
                case h.DOLLY:
                    if (!1 === s.enableZoom) return;
                    ! function(e) { R.set(e.clientX, e.clientY), P.subVectors(R, L), P.y > 0 ? k(C()) : P.y < 0 && z(C()), L.copy(R), s.update() }(e);
                    break;
                case h.PAN:
                    if (!1 === s.enablePan) return;
                    ! function(e) { T.set(e.clientX, e.clientY), A.subVectors(T, S).multiplyScalar(s.panSpeed), B(A.x, A.y), S.copy(T), s.update() }(e)
            }
        }

        function K(e) {!1 !== s.enabled && (document.removeEventListener("mousemove", J, !1), document.removeEventListener("mouseup", K, !1), s.dispatchEvent(l), p = h.NONE) }

        function Q(e) { if (!1 !== s.enabled && !1 !== s.enableZoom && p === h.NONE) { e.preventDefault(), e.stopPropagation(), s.rotateSpeed = 0, s.autoRotate && s.smoothZoomUpdate(), s.autoRotate = !1; var t = 0;!1 !== s.smoothZoom ? (e.wheelDelta ? t = e.wheelDelta / 40 : void 0 !== e.detail && (t = -e.deltaY / 4), s.zoomStart += .002 * t) : (void 0 !== e.wheelDelta ? t = e.wheelDelta : void 0 !== e.detail && (t = -e.deltaY), t > 0 ? z(C()) : t < 0 && k(C())), s.update(), s.dispatchEvent(u), s.dispatchEvent(l) } }

        function $(e) {
            !1 !== s.enabled && !1 !== s.enableKeys && !1 !== s.enablePan && (!s.rotateSpeed && (s.rotateSpeed = 1), function(e) {
                var t = !1;
                switch (e.keyCode) {
                    case s.keys.UP:
                        B(0, s.keyPanSpeed), t = !0;
                        break;
                    case s.keys.BOTTOM:
                        B(0, -s.keyPanSpeed), t = !0;
                        break;
                    case s.keys.LEFT:
                        B(s.keyPanSpeed, 0), t = !0;
                        break;
                    case s.keys.RIGHT:
                        B(-s.keyPanSpeed, 0), t = !0
                }
                t && (e.preventDefault(), s.update())
            }(e))
        }

        function ee(e) {
            if (!1 !== s.enabled) {
                switch (!s.rotateSpeed && (s.rotateSpeed = 1), e.preventDefault(), e.touches.length) {
                    case 1:
                        switch (s.touches.ONE) {
                            case b.ROTATE:
                                if (!1 === s.enableRotate) return;
                                j(e), p = h.TOUCH_ROTATE;
                                break;
                            case b.PAN:
                                if (!1 === s.enablePan) return;
                                V(e), p = h.TOUCH_PAN;
                                break;
                            default:
                                p = h.NONE
                        }
                        break;
                    case 2:
                        switch (s.touches.TWO) {
                            case b.DOLLY_PAN:
                                if (!1 === s.enableZoom && !1 === s.enablePan) return;
                                ! function(e) { s.enableZoom && W(e), s.enablePan && V(e) }(e), p = h.TOUCH_DOLLY_PAN;
                                break;
                            case b.DOLLY_ROTATE:
                                if (!1 === s.enableZoom && !1 === s.enableRotate) return;
                                ! function(e) { s.enableZoom && W(e), s.enableRotate && j(e) }(e), p = h.TOUCH_DOLLY_ROTATE;
                                break;
                            default:
                                p = h.NONE
                        }
                        break;
                    default:
                        p = h.NONE
                }
                p !== h.NONE && s.dispatchEvent(u)
            }
        }

        function te(e) {
            if (!1 !== s.enabled) switch (e.preventDefault(), e.stopPropagation(), p) {
                case h.TOUCH_ROTATE:
                    if (!1 === s.enableRotate) return;
                    q(e), s.update();
                    break;
                case h.TOUCH_PAN:
                    if (!1 === s.enablePan) return;
                    X(e), s.update();
                    break;
                case h.TOUCH_DOLLY_PAN:
                    if (!1 === s.enableZoom && !1 === s.enablePan) return;
                    ! function(e) { s.enableZoom && Y(e), s.enablePan && X(e) }(e), s.update();
                    break;
                case h.TOUCH_DOLLY_ROTATE:
                    if (!1 === s.enableZoom && !1 === s.enableRotate) return;
                    ! function(e) { s.enableZoom && Y(e), s.enableRotate && q(e) }(e), s.update();
                    break;
                default:
                    p = h.NONE
            }
        }

        function ne(e) {!1 !== s.enabled && (s.dispatchEvent(l), p = h.NONE) }

        function re(e) {!1 !== s.enabled && e.preventDefault() }
        s.domElement.addEventListener("contextmenu", re, !1), s.domElement.addEventListener("mousedown", Z, !1), s.domElement.addEventListener("wheel", Q, !1), s.domElement.addEventListener("touchstart", ee, !1), s.domElement.addEventListener("touchend", ne, !1), s.domElement.addEventListener("touchmove", te, !1), s.domElement.addEventListener("keydown", $, !1), -1 === s.domElement.tabIndex && (s.domElement.tabIndex = 0), this.update()
    };
(Th.prototype = Object.create(w.prototype)).constructor = Th;
var Eh = function(e, t) { Th.call(this, e, t), this.mouseButtons.LEFT = x.PAN, this.mouseButtons.RIGHT = x.PAN, this.touches.ONE = b.PAN, this.touches.TWO = b.DOLLY_ROTATE };
(Eh.prototype = Object.create(w.prototype)).constructor = Eh;
var Ah = function() {
    function e() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        a(this, e);
        var n = t.width || 540,
            r = t.height || 1080;
        this.nodes = [], this.deleteList = [];
        var i = document.getElementById(t.el || "canvas"),
            o = { canvas: i, alpha: !0, antialias: !0 };
        t.compatible && (delete o.antialias, o.precision = "mediump"), this.ctx = new gi(o), this.ctx.physicallyCorrectLights = !0;
        var s = new il(this.ctx);
        this.scene = new le, s.compileEquirectangularShader(), bh.pmremGenerator = s, this.ctx.setSize(n, r, !1), t.zoom && this.ctx.setPixelRatio(devicePixelRatio), this.ctx.toneMappingExposure = 1;
        var c = 360 * Math.atan(.5) / Math.PI;
        if (this.camera = new cn(c, n / r, 60, 10 * r), this.camera.position.z = r, t.light) {
            this.ctx.outputEncoding = 3001;
            var u = new Gs;
            this.scene.add(u);
            var l = new Js(16777215, .95);
            this.scene.add(l)
        }
        this.controls = new Th(this.camera, this.ctx.domElement), this.loop(), this.event = new Rl(i), this.event.nodes = this.nodes
    }
    return s(e, [{ key: "getNodes", value: function(e) { return this.nodes.filter((function(t) { return t.name === e })) } }, { key: "addChild", value: function(e) { this.scene.add(e[e.nodeType]), this.nodes.push(e), e.onLoad() } }, { key: "removeChild", value: function(e) { this.deleteList.push(e) } }, { key: "addControl", value: function(e) { this.event.model = e, this.controls = new Th(this.camera, this.ctx.domElement), this.controls.enableKeys = !1, this.controls.enablePan = !1, this.controls.enableRotate = !0, this.controls.autoRotate = !0, this.controls.autoRotateSpeed = .8, this.controls.rotateSpeed = 1, this.controls.enableDamping = !0, this.controls.dampingFactor = .15, this.controls.screenSpacePanning = !1, this.controls.zoomSpeed = .1; var t = this.camera.position.z; return this.controls.minDistance = t / 2.1, this.controls.maxDistance = 2 * t, this.controls.update(), this.controls } }, { key: "changeModel", value: function(e) { this.event.model = e } }, {
        key: "loop",
        value: function() {
            var t = this;
            e.Ticker.add((function(e) {
                t.ctx.clear();
                var n, r = m(t.deleteList);
                try {
                    var i = function() {
                        var e = n.value;
                        e.onDestroy(), t.nodes.splice(t.nodes.findIndex((function(t) { return t.id === e.id })), 1), t.scene.remove(e[e.nodeType])
                    };
                    for (r.s(); !(n = r.n()).done;) i()
                } catch (e) { r.e(e) } finally { r.f() }
                t.deleteList = [];
                var a, o = m(t.nodes);
                try {
                    for (o.s(); !(a = o.n()).done;) {
                        var s = a.value;
                        s._update(e), s.update(e)
                    }
                } catch (e) { o.e(e) } finally { o.f() }
                t.controls.update(), t.ctx.render(t.scene, t.camera)
            }))
        }
    }]), e
}();
Ah.Ticker = Ll, Ah.THREE = wl, Ah.MovieData = Sh, Ah.Loader = bh, Ah.Sprite = Tl, Ah.Model = Al, Ah.Group = El, Ah.Tween = _h, Ah.Impact = y, Ah.Pool = g;
export default Ah;