(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver(o => {
    for (const i of o) if (i.type === 'childList') for (const r of i.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : o.crossOrigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = s(o);
    fetch(o.href, i);
  }
})();
function Rs(e, t) {
  const s = Object.create(null),
    n = e.split(',');
  for (let o = 0; o < n.length; o++) s[n[o]] = !0;
  return t ? o => !!s[o.toLowerCase()] : o => !!s[o];
}
const G = {},
  at = [],
  Ie = () => {},
  Bo = () => !1,
  jo = /^on[^a-z]/,
  ns = e => jo.test(e),
  Bs = e => e.startsWith('onUpdate:'),
  le = Object.assign,
  js = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  Lo = Object.prototype.hasOwnProperty,
  H = (e, t) => Lo.call(e, t),
  R = Array.isArray,
  dt = e => os(e) === '[object Map]',
  Hn = e => os(e) === '[object Set]',
  j = e => typeof e == 'function',
  re = e => typeof e == 'string',
  Ls = e => typeof e == 'symbol',
  X = e => e !== null && typeof e == 'object',
  Un = e => X(e) && j(e.then) && j(e.catch),
  Kn = Object.prototype.toString,
  os = e => Kn.call(e),
  No = e => os(e).slice(8, -1),
  Dn = e => os(e) === '[object Object]',
  Ns = e => re(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  qt = Rs(',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'),
  is = e => {
    const t = Object.create(null);
    return s => t[s] || (t[s] = e(s));
  },
  Ho = /-(\w)/g,
  _t = is(e => e.replace(Ho, (t, s) => (s ? s.toUpperCase() : ''))),
  Uo = /\B([A-Z])/g,
  bt = is(e => e.replace(Uo, '-$1').toLowerCase()),
  zn = is(e => e.charAt(0).toUpperCase() + e.slice(1)),
  _s = is(e => (e ? `on${zn(e)}` : '')),
  It = (e, t) => !Object.is(e, t),
  gs = (e, t) => {
    for (let s = 0; s < e.length; s++) e[s](t);
  },
  Gt = (e, t, s) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: s });
  },
  Ko = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let un;
const xs = () =>
  un || (un = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : typeof global < 'u' ? global : {});
function Hs(e) {
  if (R(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s],
        o = re(n) ? qo(n) : Hs(n);
      if (o) for (const i in o) t[i] = o[i];
    }
    return t;
  } else {
    if (re(e)) return e;
    if (X(e)) return e;
  }
}
const Do = /;(?![^(]*\))/g,
  zo = /:([^]+)/,
  Wo = /\/\*[^]*?\*\//g;
function qo(e) {
  const t = {};
  return (
    e
      .replace(Wo, '')
      .split(Do)
      .forEach(s => {
        if (s) {
          const n = s.split(zo);
          n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
      }),
    t
  );
}
function Ve(e) {
  let t = '';
  if (re(e)) t = e;
  else if (R(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ve(e[s]);
      n && (t += n + ' ');
    }
  else if (X(e)) for (const s in e) e[s] && (t += s + ' ');
  return t.trim();
}
const Qo = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Yo = Rs(Qo);
function Wn(e) {
  return !!e || e === '';
}
const Ne = e => (re(e) ? e : e == null ? '' : R(e) || (X(e) && (e.toString === Kn || !j(e.toString))) ? JSON.stringify(e, qn, 2) : String(e)),
  qn = (e, t) =>
    t && t.__v_isRef
      ? qn(e, t.value)
      : dt(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((s, [n, o]) => ((s[`${n} =>`] = o), s), {}) }
      : Hn(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : X(t) && !R(t) && !Dn(t)
      ? String(t)
      : t;
let $e;
class Vo {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = $e),
      !t && $e && (this.index = ($e.scopes || ($e.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = $e;
      try {
        return ($e = this), t();
      } finally {
        $e = s;
      }
    }
  }
  on() {
    $e = this;
  }
  off() {
    $e = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
      if (this.scopes) for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Jo(e, t = $e) {
  t && t.active && t.effects.push(e);
}
function Go() {
  return $e;
}
const Us = e => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Qn = e => (e.w & Je) > 0,
  Yn = e => (e.n & Je) > 0,
  Xo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Je;
  },
  Zo = e => {
    const { deps: t } = e;
    if (t.length) {
      let s = 0;
      for (let n = 0; n < t.length; n++) {
        const o = t[n];
        Qn(o) && !Yn(o) ? o.delete(e) : (t[s++] = o), (o.w &= ~Je), (o.n &= ~Je);
      }
      t.length = s;
    }
  },
  Xt = new WeakMap();
let Mt = 0,
  Je = 1;
const Es = 30;
let ke;
const ot = Symbol(''),
  Ts = Symbol('');
class Ks {
  constructor(t, s = null, n) {
    (this.fn = t), (this.scheduler = s), (this.active = !0), (this.deps = []), (this.parent = void 0), Jo(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ke,
      s = Qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (this.parent = ke), (ke = this), (Qe = !0), (Je = 1 << ++Mt), Mt <= Es ? Xo(this) : fn(this), this.fn();
    } finally {
      Mt <= Es && Zo(this), (Je = 1 << --Mt), (ke = this.parent), (Qe = s), (this.parent = void 0), this.deferStop && this.stop();
    }
  }
  stop() {
    ke === this ? (this.deferStop = !0) : this.active && (fn(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function fn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++) t[s].delete(e);
    t.length = 0;
  }
}
let Qe = !0;
const Vn = [];
function yt() {
  Vn.push(Qe), (Qe = !1);
}
function Ct() {
  const e = Vn.pop();
  Qe = e === void 0 ? !0 : e;
}
function me(e, t, s) {
  if (Qe && ke) {
    let n = Xt.get(e);
    n || Xt.set(e, (n = new Map()));
    let o = n.get(s);
    o || n.set(s, (o = Us())), Jn(o);
  }
}
function Jn(e, t) {
  let s = !1;
  Mt <= Es ? Yn(e) || ((e.n |= Je), (s = !Qn(e))) : (s = !e.has(ke)), s && (e.add(ke), ke.deps.push(e));
}
function De(e, t, s, n, o, i) {
  const r = Xt.get(e);
  if (!r) return;
  let c = [];
  if (t === 'clear') c = [...r.values()];
  else if (s === 'length' && R(e)) {
    const f = Number(n);
    r.forEach((a, d) => {
      (d === 'length' || d >= f) && c.push(a);
    });
  } else
    switch ((s !== void 0 && c.push(r.get(s)), t)) {
      case 'add':
        R(e) ? Ns(s) && c.push(r.get('length')) : (c.push(r.get(ot)), dt(e) && c.push(r.get(Ts)));
        break;
      case 'delete':
        R(e) || (c.push(r.get(ot)), dt(e) && c.push(r.get(Ts)));
        break;
      case 'set':
        dt(e) && c.push(r.get(ot));
        break;
    }
  if (c.length === 1) c[0] && Ms(c[0]);
  else {
    const f = [];
    for (const a of c) a && f.push(...a);
    Ms(Us(f));
  }
}
function Ms(e, t) {
  const s = R(e) ? e : [...e];
  for (const n of s) n.computed && an(n);
  for (const n of s) n.computed || an(n);
}
function an(e, t) {
  (e !== ke || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function ei(e, t) {
  var s;
  return (s = Xt.get(e)) == null ? void 0 : s.get(t);
}
const ti = Rs('__proto__,__v_isRef,__isVue'),
  Gn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter(e => e !== 'arguments' && e !== 'caller')
      .map(e => Symbol[e])
      .filter(Ls)
  ),
  si = Ds(),
  ni = Ds(!1, !0),
  oi = Ds(!0),
  dn = ii();
function ii() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
      e[t] = function (...s) {
        const n = U(this);
        for (let i = 0, r = this.length; i < r; i++) me(n, 'get', i + '');
        const o = n[t](...s);
        return o === -1 || o === !1 ? n[t](...s.map(U)) : o;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
      e[t] = function (...s) {
        yt();
        const n = U(this)[t].apply(this, s);
        return Ct(), n;
      };
    }),
    e
  );
}
function ri(e) {
  const t = U(this);
  return me(t, 'has', e), t.hasOwnProperty(e);
}
function Ds(e = !1, t = !1) {
  return function (n, o, i) {
    if (o === '__v_isReactive') return !e;
    if (o === '__v_isReadonly') return e;
    if (o === '__v_isShallow') return t;
    if (o === '__v_raw' && i === (e ? (t ? wi : so) : t ? to : eo).get(n)) return n;
    const r = R(n);
    if (!e) {
      if (r && H(dn, o)) return Reflect.get(dn, o, i);
      if (o === 'hasOwnProperty') return ri;
    }
    const c = Reflect.get(n, o, i);
    return (Ls(o) ? Gn.has(o) : ti(o)) || (e || me(n, 'get', o), t) ? c : ie(c) ? (r && Ns(o) ? c : c.value) : X(c) ? (e ? no(c) : qs(c)) : c;
  };
}
const li = Xn(),
  ci = Xn(!0);
function Xn(e = !1) {
  return function (s, n, o, i) {
    let r = s[n];
    if (gt(r) && ie(r) && !ie(o)) return !1;
    if (!e && (!Zt(o) && !gt(o) && ((r = U(r)), (o = U(o))), !R(s) && ie(r) && !ie(o))) return (r.value = o), !0;
    const c = R(s) && Ns(n) ? Number(n) < s.length : H(s, n),
      f = Reflect.set(s, n, o, i);
    return s === U(i) && (c ? It(o, r) && De(s, 'set', n, o) : De(s, 'add', n, o)), f;
  };
}
function ui(e, t) {
  const s = H(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && s && De(e, 'delete', t, void 0), n;
}
function fi(e, t) {
  const s = Reflect.has(e, t);
  return (!Ls(t) || !Gn.has(t)) && me(e, 'has', t), s;
}
function ai(e) {
  return me(e, 'iterate', R(e) ? 'length' : ot), Reflect.ownKeys(e);
}
const Zn = { get: si, set: li, deleteProperty: ui, has: fi, ownKeys: ai },
  di = {
    get: oi,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  hi = le({}, Zn, { get: ni, set: ci }),
  zs = e => e,
  rs = e => Reflect.getPrototypeOf(e);
function Ht(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const o = U(e),
    i = U(t);
  s || (t !== i && me(o, 'get', t), me(o, 'get', i));
  const { has: r } = rs(o),
    c = n ? zs : s ? Ys : Pt;
  if (r.call(o, t)) return c(e.get(t));
  if (r.call(o, i)) return c(e.get(i));
  e !== o && e.get(t);
}
function Ut(e, t = !1) {
  const s = this.__v_raw,
    n = U(s),
    o = U(e);
  return t || (e !== o && me(n, 'has', e), me(n, 'has', o)), e === o ? s.has(e) : s.has(e) || s.has(o);
}
function Kt(e, t = !1) {
  return (e = e.__v_raw), !t && me(U(e), 'iterate', ot), Reflect.get(e, 'size', e);
}
function hn(e) {
  e = U(e);
  const t = U(this);
  return rs(t).has.call(t, e) || (t.add(e), De(t, 'add', e, e)), this;
}
function pn(e, t) {
  t = U(t);
  const s = U(this),
    { has: n, get: o } = rs(s);
  let i = n.call(s, e);
  i || ((e = U(e)), (i = n.call(s, e)));
  const r = o.call(s, e);
  return s.set(e, t), i ? It(t, r) && De(s, 'set', e, t) : De(s, 'add', e, t), this;
}
function _n(e) {
  const t = U(this),
    { has: s, get: n } = rs(t);
  let o = s.call(t, e);
  o || ((e = U(e)), (o = s.call(t, e))), n && n.call(t, e);
  const i = t.delete(e);
  return o && De(t, 'delete', e, void 0), i;
}
function gn() {
  const e = U(this),
    t = e.size !== 0,
    s = e.clear();
  return t && De(e, 'clear', void 0, void 0), s;
}
function Dt(e, t) {
  return function (n, o) {
    const i = this,
      r = i.__v_raw,
      c = U(r),
      f = t ? zs : e ? Ys : Pt;
    return !e && me(c, 'iterate', ot), r.forEach((a, d) => n.call(o, f(a), f(d), i));
  };
}
function zt(e, t, s) {
  return function (...n) {
    const o = this.__v_raw,
      i = U(o),
      r = dt(i),
      c = e === 'entries' || (e === Symbol.iterator && r),
      f = e === 'keys' && r,
      a = o[e](...n),
      d = s ? zs : t ? Ys : Pt;
    return (
      !t && me(i, 'iterate', f ? Ts : ot),
      {
        next() {
          const { value: m, done: x } = a.next();
          return x ? { value: m, done: x } : { value: c ? [d(m[0]), d(m[1])] : d(m), done: x };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function We(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function pi() {
  const e = {
      get(i) {
        return Ht(this, i);
      },
      get size() {
        return Kt(this);
      },
      has: Ut,
      add: hn,
      set: pn,
      delete: _n,
      clear: gn,
      forEach: Dt(!1, !1),
    },
    t = {
      get(i) {
        return Ht(this, i, !1, !0);
      },
      get size() {
        return Kt(this);
      },
      has: Ut,
      add: hn,
      set: pn,
      delete: _n,
      clear: gn,
      forEach: Dt(!1, !0),
    },
    s = {
      get(i) {
        return Ht(this, i, !0);
      },
      get size() {
        return Kt(this, !0);
      },
      has(i) {
        return Ut.call(this, i, !0);
      },
      add: We('add'),
      set: We('set'),
      delete: We('delete'),
      clear: We('clear'),
      forEach: Dt(!0, !1),
    },
    n = {
      get(i) {
        return Ht(this, i, !0, !0);
      },
      get size() {
        return Kt(this, !0);
      },
      has(i) {
        return Ut.call(this, i, !0);
      },
      add: We('add'),
      set: We('set'),
      delete: We('delete'),
      clear: We('clear'),
      forEach: Dt(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(i => {
      (e[i] = zt(i, !1, !1)), (s[i] = zt(i, !0, !1)), (t[i] = zt(i, !1, !0)), (n[i] = zt(i, !0, !0));
    }),
    [e, s, t, n]
  );
}
const [_i, gi, mi, vi] = pi();
function Ws(e, t) {
  const s = t ? (e ? vi : mi) : e ? gi : _i;
  return (n, o, i) => (o === '__v_isReactive' ? !e : o === '__v_isReadonly' ? e : o === '__v_raw' ? n : Reflect.get(H(s, o) && o in n ? s : n, o, i));
}
const bi = { get: Ws(!1, !1) },
  yi = { get: Ws(!1, !0) },
  Ci = { get: Ws(!0, !1) },
  eo = new WeakMap(),
  to = new WeakMap(),
  so = new WeakMap(),
  wi = new WeakMap();
function xi(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Ei(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : xi(No(e));
}
function qs(e) {
  return gt(e) ? e : Qs(e, !1, Zn, bi, eo);
}
function Ti(e) {
  return Qs(e, !1, hi, yi, to);
}
function no(e) {
  return Qs(e, !0, di, Ci, so);
}
function Qs(e, t, s, n, o) {
  if (!X(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = o.get(e);
  if (i) return i;
  const r = Ei(e);
  if (r === 0) return e;
  const c = new Proxy(e, r === 2 ? n : s);
  return o.set(e, c), c;
}
function ht(e) {
  return gt(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function gt(e) {
  return !!(e && e.__v_isReadonly);
}
function Zt(e) {
  return !!(e && e.__v_isShallow);
}
function oo(e) {
  return ht(e) || gt(e);
}
function U(e) {
  const t = e && e.__v_raw;
  return t ? U(t) : e;
}
function io(e) {
  return Gt(e, '__v_skip', !0), e;
}
const Pt = e => (X(e) ? qs(e) : e),
  Ys = e => (X(e) ? no(e) : e);
function ro(e) {
  Qe && ke && ((e = U(e)), Jn(e.dep || (e.dep = Us())));
}
function lo(e, t) {
  e = U(e);
  const s = e.dep;
  s && Ms(s);
}
function ie(e) {
  return !!(e && e.__v_isRef === !0);
}
function Z(e) {
  return Mi(e, !1);
}
function Mi(e, t) {
  return ie(e) ? e : new $i(e, t);
}
class $i {
  constructor(t, s) {
    (this.__v_isShallow = s), (this.dep = void 0), (this.__v_isRef = !0), (this._rawValue = s ? t : U(t)), (this._value = s ? t : Pt(t));
  }
  get value() {
    return ro(this), this._value;
  }
  set value(t) {
    const s = this.__v_isShallow || Zt(t) || gt(t);
    (t = s ? t : U(t)), It(t, this._rawValue) && ((this._rawValue = t), (this._value = s ? t : Pt(t)), lo(this));
  }
}
function Be(e) {
  return ie(e) ? e.value : e;
}
const ki = {
  get: (e, t, s) => Be(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return ie(o) && !ie(s) ? ((o.value = s), !0) : Reflect.set(e, t, s, n);
  },
};
function co(e) {
  return ht(e) ? e : new Proxy(e, ki);
}
function Oi(e) {
  const t = R(e) ? new Array(e.length) : {};
  for (const s in e) t[s] = Ii(e, s);
  return t;
}
class Ai {
  constructor(t, s, n) {
    (this._object = t), (this._key = s), (this._defaultValue = n), (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return ei(U(this._object), this._key);
  }
}
function Ii(e, t, s) {
  const n = e[t];
  return ie(n) ? n : new Ai(e, t, s);
}
class Pi {
  constructor(t, s, n, o) {
    (this._setter = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Ks(t, () => {
        this._dirty || ((this._dirty = !0), lo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = n);
  }
  get value() {
    const t = U(this);
    return ro(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Fi(e, t, s = !1) {
  let n, o;
  const i = j(e);
  return i ? ((n = e), (o = Ie)) : ((n = e.get), (o = e.set)), new Pi(n, o, i || !o, s);
}
function Ye(e, t, s, n) {
  let o;
  try {
    o = n ? e(...n) : e();
  } catch (i) {
    ls(i, t, s);
  }
  return o;
}
function Pe(e, t, s, n) {
  if (j(e)) {
    const i = Ye(e, t, s, n);
    return (
      i &&
        Un(i) &&
        i.catch(r => {
          ls(r, t, s);
        }),
      i
    );
  }
  const o = [];
  for (let i = 0; i < e.length; i++) o.push(Pe(e[i], t, s, n));
  return o;
}
function ls(e, t, s, n = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const r = t.proxy,
      c = s;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, r, c) === !1) return;
      }
      i = i.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      Ye(f, null, 10, [e, r, c]);
      return;
    }
  }
  Si(e, s, o, n);
}
function Si(e, t, s, n = !0) {
  console.error(e);
}
let Ft = !1,
  $s = !1;
const fe = [];
let He = 0;
const pt = [];
let Ke = null,
  st = 0;
const uo = Promise.resolve();
let Vs = null;
function Ri(e) {
  const t = Vs || uo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bi(e) {
  let t = He + 1,
    s = fe.length;
  for (; t < s; ) {
    const n = (t + s) >>> 1;
    St(fe[n]) < e ? (t = n + 1) : (s = n);
  }
  return t;
}
function Js(e) {
  (!fe.length || !fe.includes(e, Ft && e.allowRecurse ? He + 1 : He)) && (e.id == null ? fe.push(e) : fe.splice(Bi(e.id), 0, e), fo());
}
function fo() {
  !Ft && !$s && (($s = !0), (Vs = uo.then(ho)));
}
function ji(e) {
  const t = fe.indexOf(e);
  t > He && fe.splice(t, 1);
}
function Li(e) {
  R(e) ? pt.push(...e) : (!Ke || !Ke.includes(e, e.allowRecurse ? st + 1 : st)) && pt.push(e), fo();
}
function mn(e, t = Ft ? He + 1 : 0) {
  for (; t < fe.length; t++) {
    const s = fe[t];
    s && s.pre && (fe.splice(t, 1), t--, s());
  }
}
function ao(e) {
  if (pt.length) {
    const t = [...new Set(pt)];
    if (((pt.length = 0), Ke)) {
      Ke.push(...t);
      return;
    }
    for (Ke = t, Ke.sort((s, n) => St(s) - St(n)), st = 0; st < Ke.length; st++) Ke[st]();
    (Ke = null), (st = 0);
  }
}
const St = e => (e.id == null ? 1 / 0 : e.id),
  Ni = (e, t) => {
    const s = St(e) - St(t);
    if (s === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return s;
  };
function ho(e) {
  ($s = !1), (Ft = !0), fe.sort(Ni);
  const t = Ie;
  try {
    for (He = 0; He < fe.length; He++) {
      const s = fe[He];
      s && s.active !== !1 && Ye(s, null, 14);
    }
  } finally {
    (He = 0), (fe.length = 0), ao(), (Ft = !1), (Vs = null), (fe.length || pt.length) && ho();
  }
}
function Hi(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || G;
  let o = s;
  const i = t.startsWith('update:'),
    r = i && t.slice(7);
  if (r && r in n) {
    const d = `${r === 'modelValue' ? 'model' : r}Modifiers`,
      { number: m, trim: x } = n[d] || G;
    x && (o = s.map(M => (re(M) ? M.trim() : M))), m && (o = s.map(Ko));
  }
  let c,
    f = n[(c = _s(t))] || n[(c = _s(_t(t)))];
  !f && i && (f = n[(c = _s(bt(t)))]), f && Pe(f, e, 6, o);
  const a = n[c + 'Once'];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Pe(a, e, 6, o);
  }
}
function po(e, t, s = !1) {
  const n = t.emitsCache,
    o = n.get(e);
  if (o !== void 0) return o;
  const i = e.emits;
  let r = {},
    c = !1;
  if (!j(e)) {
    const f = a => {
      const d = po(a, t, !0);
      d && ((c = !0), le(r, d));
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !i && !c ? (X(e) && n.set(e, null), null) : (R(i) ? i.forEach(f => (r[f] = null)) : le(r, i), X(e) && n.set(e, r), r);
}
function cs(e, t) {
  return !e || !ns(t) ? !1 : ((t = t.slice(2).replace(/Once$/, '')), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, bt(t)) || H(e, t));
}
let ge = null,
  us = null;
function es(e) {
  const t = ge;
  return (ge = e), (us = (e && e.type.__scopeId) || null), t;
}
function Gs(e) {
  us = e;
}
function Xs() {
  us = null;
}
function Qt(e, t = ge, s) {
  if (!t || e._n) return e;
  const n = (...o) => {
    n._d && $n(-1);
    const i = es(t);
    let r;
    try {
      r = e(...o);
    } finally {
      es(i), n._d && $n(1);
    }
    return r;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function ms(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    props: i,
    propsOptions: [r],
    slots: c,
    attrs: f,
    emit: a,
    render: d,
    renderCache: m,
    data: x,
    setupState: M,
    ctx: A,
    inheritAttrs: v,
  } = e;
  let P, p;
  const y = es(e);
  try {
    if (s.shapeFlag & 4) {
      const k = o || n;
      (P = Le(d.call(k, k, m, i, M, x, A))), (p = f);
    } else {
      const k = t;
      (P = Le(k.length > 1 ? k(i, { attrs: f, slots: c, emit: a }) : k(i, null))), (p = t.props ? f : Ui(f));
    }
  } catch (k) {
    (At.length = 0), ls(k, e, 1), (P = ee(Ge));
  }
  let O = P;
  if (p && v !== !1) {
    const k = Object.keys(p),
      { shapeFlag: Y } = O;
    k.length && Y & 7 && (r && k.some(Bs) && (p = Ki(p, r)), (O = mt(O, p)));
  }
  return (
    s.dirs && ((O = mt(O)), (O.dirs = O.dirs ? O.dirs.concat(s.dirs) : s.dirs)), s.transition && (O.transition = s.transition), (P = O), es(y), P
  );
}
const Ui = e => {
    let t;
    for (const s in e) (s === 'class' || s === 'style' || ns(s)) && ((t || (t = {}))[s] = e[s]);
    return t;
  },
  Ki = (e, t) => {
    const s = {};
    for (const n in e) (!Bs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
    return s;
  };
function Di(e, t, s) {
  const { props: n, children: o, component: i } = e,
    { props: r, children: c, patchFlag: f } = t,
    a = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && f >= 0) {
    if (f & 1024) return !0;
    if (f & 16) return n ? vn(n, r, a) : !!r;
    if (f & 8) {
      const d = t.dynamicProps;
      for (let m = 0; m < d.length; m++) {
        const x = d[m];
        if (r[x] !== n[x] && !cs(a, x)) return !0;
      }
    }
  } else return (o || c) && (!c || !c.$stable) ? !0 : n === r ? !1 : n ? (r ? vn(n, r, a) : !0) : !!r;
  return !1;
}
function vn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (t[i] !== e[i] && !cs(s, i)) return !0;
  }
  return !1;
}
function zi({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = s), (t = t.parent);
}
const Wi = e => e.__isSuspense;
function qi(e, t) {
  t && t.pendingBranch ? (R(e) ? t.effects.push(...e) : t.effects.push(e)) : Li(e);
}
const Wt = {};
function vs(e, t, s) {
  return _o(e, t, s);
}
function _o(e, t, { immediate: s, deep: n, flush: o, onTrack: i, onTrigger: r } = G) {
  var c;
  const f = Go() === ((c = ae) == null ? void 0 : c.scope) ? ae : null;
  let a,
    d = !1,
    m = !1;
  if (
    (ie(e)
      ? ((a = () => e.value), (d = Zt(e)))
      : ht(e)
      ? ((a = () => e), (n = !0))
      : R(e)
      ? ((m = !0),
        (d = e.some(k => ht(k) || Zt(k))),
        (a = () =>
          e.map(k => {
            if (ie(k)) return k.value;
            if (ht(k)) return ft(k);
            if (j(k)) return Ye(k, f, 2);
          })))
      : j(e)
      ? t
        ? (a = () => Ye(e, f, 2))
        : (a = () => {
            if (!(f && f.isUnmounted)) return x && x(), Pe(e, f, 3, [M]);
          })
      : (a = Ie),
    t && n)
  ) {
    const k = a;
    a = () => ft(k());
  }
  let x,
    M = k => {
      x = y.onStop = () => {
        Ye(k, f, 4);
      };
    },
    A;
  if (jt)
    if (((M = Ie), t ? s && Pe(t, f, 3, [a(), m ? [] : void 0, M]) : a(), o === 'sync')) {
      const k = Ur();
      A = k.__watcherHandles || (k.__watcherHandles = []);
    } else return Ie;
  let v = m ? new Array(e.length).fill(Wt) : Wt;
  const P = () => {
    if (y.active)
      if (t) {
        const k = y.run();
        (n || d || (m ? k.some((Y, D) => It(Y, v[D])) : It(k, v))) &&
          (x && x(), Pe(t, f, 3, [k, v === Wt ? void 0 : m && v[0] === Wt ? [] : v, M]), (v = k));
      } else y.run();
  };
  P.allowRecurse = !!t;
  let p;
  o === 'sync' ? (p = P) : o === 'post' ? (p = () => _e(P, f && f.suspense)) : ((P.pre = !0), f && (P.id = f.uid), (p = () => Js(P)));
  const y = new Ks(a, p);
  t ? (s ? P() : (v = y.run())) : o === 'post' ? _e(y.run.bind(y), f && f.suspense) : y.run();
  const O = () => {
    y.stop(), f && f.scope && js(f.scope.effects, y);
  };
  return A && A.push(O), O;
}
function Qi(e, t, s) {
  const n = this.proxy,
    o = re(e) ? (e.includes('.') ? go(n, e) : () => n[e]) : e.bind(n, n);
  let i;
  j(t) ? (i = t) : ((i = t.handler), (s = t));
  const r = ae;
  vt(this);
  const c = _o(o, i.bind(n), s);
  return r ? vt(r) : it(), c;
}
function go(e, t) {
  const s = t.split('.');
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++) n = n[s[o]];
    return n;
  };
}
function ft(e, t) {
  if (!X(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ie(e))) ft(e.value, t);
  else if (R(e)) for (let s = 0; s < e.length; s++) ft(e[s], t);
  else if (Hn(e) || dt(e))
    e.forEach(s => {
      ft(s, t);
    });
  else if (Dn(e)) for (const s in e) ft(e[s], t);
  return e;
}
function et(e, t, s, n) {
  const o = e.dirs,
    i = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const c = o[r];
    i && (c.oldValue = i[r].value);
    let f = c.dir[n];
    f && (yt(), Pe(f, s, 8, [e.el, c, e, t]), Ct());
  }
}
function Xe(e, t) {
  return j(e) ? (() => le({ name: e.name }, t, { setup: e }))() : e;
}
const kt = e => !!e.type.__asyncLoader,
  mo = e => e.type.__isKeepAlive;
function Yi(e, t) {
  vo(e, 'a', t);
}
function Vi(e, t) {
  vo(e, 'da', t);
}
function vo(e, t, s = ae) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let o = s;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((fs(t, n, s), s)) {
    let o = s.parent;
    for (; o && o.parent; ) mo(o.parent.vnode) && Ji(n, t, s, o), (o = o.parent);
  }
}
function Ji(e, t, s, n) {
  const o = fs(t, e, n, !0);
  bo(() => {
    js(n[t], o);
  }, s);
}
function fs(e, t, s = ae, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...r) => {
          if (s.isUnmounted) return;
          yt(), vt(s);
          const c = Pe(t, s, e, r);
          return it(), Ct(), c;
        });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const ze =
    e =>
    (t, s = ae) =>
      (!jt || e === 'sp') && fs(e, (...n) => t(...n), s),
  Gi = ze('bm'),
  Xi = ze('m'),
  Zi = ze('bu'),
  er = ze('u'),
  tr = ze('bum'),
  bo = ze('um'),
  sr = ze('sp'),
  nr = ze('rtg'),
  or = ze('rtc');
function ir(e, t = ae) {
  fs('ec', e, t);
}
const rr = Symbol.for('v-ndc');
function Rt(e, t, s, n) {
  let o;
  const i = s && s[n];
  if (R(e) || re(e)) {
    o = new Array(e.length);
    for (let r = 0, c = e.length; r < c; r++) o[r] = t(e[r], r, void 0, i && i[r]);
  } else if (typeof e == 'number') {
    o = new Array(e);
    for (let r = 0; r < e; r++) o[r] = t(r + 1, r, void 0, i && i[r]);
  } else if (X(e))
    if (e[Symbol.iterator]) o = Array.from(e, (r, c) => t(r, c, void 0, i && i[c]));
    else {
      const r = Object.keys(e);
      o = new Array(r.length);
      for (let c = 0, f = r.length; c < f; c++) {
        const a = r[c];
        o[c] = t(e[a], a, c, i && i[c]);
      }
    }
  else o = [];
  return s && (s[n] = o), o;
}
function lr(e, t, s = {}, n, o) {
  if (ge.isCE || (ge.parent && kt(ge.parent) && ge.parent.isCE)) return t !== 'default' && (s.name = t), ee('slot', s, n && n());
  let i = e[t];
  i && i._c && (i._d = !1), z();
  const r = i && yo(i(s)),
    c = Ao(oe, { key: s.key || (r && r.key) || `_${t}` }, r || (n ? n() : []), r && e._ === 1 ? 64 : -2);
  return !o && c.scopeId && (c.slotScopeIds = [c.scopeId + '-s']), i && i._c && (i._d = !0), c;
}
function yo(e) {
  return e.some(t => (Io(t) ? !(t.type === Ge || (t.type === oe && !yo(t.children))) : !0)) ? e : null;
}
const ks = e => (e ? (Fo(e) ? nn(e) || e.proxy : ks(e.parent)) : null),
  Ot = le(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => ks(e.parent),
    $root: e => ks(e.root),
    $emit: e => e.emit,
    $options: e => Zs(e),
    $forceUpdate: e => e.f || (e.f = () => Js(e.update)),
    $nextTick: e => e.n || (e.n = Ri.bind(e.proxy)),
    $watch: e => Qi.bind(e),
  }),
  bs = (e, t) => e !== G && !e.__isScriptSetup && H(e, t),
  cr = {
    get({ _: e }, t) {
      const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: c, appContext: f } = e;
      let a;
      if (t[0] !== '$') {
        const M = r[t];
        if (M !== void 0)
          switch (M) {
            case 1:
              return n[t];
            case 2:
              return o[t];
            case 4:
              return s[t];
            case 3:
              return i[t];
          }
        else {
          if (bs(n, t)) return (r[t] = 1), n[t];
          if (o !== G && H(o, t)) return (r[t] = 2), o[t];
          if ((a = e.propsOptions[0]) && H(a, t)) return (r[t] = 3), i[t];
          if (s !== G && H(s, t)) return (r[t] = 4), s[t];
          Os && (r[t] = 0);
        }
      }
      const d = Ot[t];
      let m, x;
      if (d) return t === '$attrs' && me(e, 'get', t), d(e);
      if ((m = c.__cssModules) && (m = m[t])) return m;
      if (s !== G && H(s, t)) return (r[t] = 4), s[t];
      if (((x = f.config.globalProperties), H(x, t))) return x[t];
    },
    set({ _: e }, t, s) {
      const { data: n, setupState: o, ctx: i } = e;
      return bs(o, t)
        ? ((o[t] = s), !0)
        : n !== G && H(n, t)
        ? ((n[t] = s), !0)
        : H(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((i[t] = s), !0);
    },
    has({ _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: i } }, r) {
      let c;
      return !!s[r] || (e !== G && H(e, r)) || bs(t, r) || ((c = i[0]) && H(c, r)) || H(n, r) || H(Ot, r) || H(o.config.globalProperties, r);
    },
    defineProperty(e, t, s) {
      return s.get != null ? (e._.accessCache[t] = 0) : H(s, 'value') && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
    },
  };
function bn(e) {
  return R(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e;
}
let Os = !0;
function ur(e) {
  const t = Zs(e),
    s = e.proxy,
    n = e.ctx;
  (Os = !1), t.beforeCreate && yn(t.beforeCreate, e, 'bc');
  const {
    data: o,
    computed: i,
    methods: r,
    watch: c,
    provide: f,
    inject: a,
    created: d,
    beforeMount: m,
    mounted: x,
    beforeUpdate: M,
    updated: A,
    activated: v,
    deactivated: P,
    beforeDestroy: p,
    beforeUnmount: y,
    destroyed: O,
    unmounted: k,
    render: Y,
    renderTracked: D,
    renderTriggered: W,
    errorCaptured: ce,
    serverPrefetch: xe,
    expose: ue,
    inheritAttrs: pe,
    components: ve,
    directives: be,
    filters: Ee,
  } = t;
  if ((a && fr(a, n, null), r))
    for (const K in r) {
      const N = r[K];
      j(N) && (n[K] = N.bind(s));
    }
  if (o) {
    const K = o.call(s, s);
    X(K) && (e.data = qs(K));
  }
  if (((Os = !0), i))
    for (const K in i) {
      const N = i[K],
        ye = j(N) ? N.bind(s, s) : j(N.get) ? N.get.bind(s, s) : Ie,
        Ze = !j(N) && j(N.set) ? N.set.bind(s) : Ie,
        Fe = Nr({ get: ye, set: Ze });
      Object.defineProperty(n, K, { enumerable: !0, configurable: !0, get: () => Fe.value, set: Ce => (Fe.value = Ce) });
    }
  if (c) for (const K in c) Co(c[K], n, s, K);
  if (f) {
    const K = j(f) ? f.call(s) : f;
    Reflect.ownKeys(K).forEach(N => {
      gr(N, K[N]);
    });
  }
  d && yn(d, e, 'c');
  function J(K, N) {
    R(N) ? N.forEach(ye => K(ye.bind(s))) : N && K(N.bind(s));
  }
  if ((J(Gi, m), J(Xi, x), J(Zi, M), J(er, A), J(Yi, v), J(Vi, P), J(ir, ce), J(or, D), J(nr, W), J(tr, y), J(bo, k), J(sr, xe), R(ue)))
    if (ue.length) {
      const K = e.exposed || (e.exposed = {});
      ue.forEach(N => {
        Object.defineProperty(K, N, { get: () => s[N], set: ye => (s[N] = ye) });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === Ie && (e.render = Y), pe != null && (e.inheritAttrs = pe), ve && (e.components = ve), be && (e.directives = be);
}
function fr(e, t, s = Ie) {
  R(e) && (e = As(e));
  for (const n in e) {
    const o = e[n];
    let i;
    X(o) ? ('default' in o ? (i = Yt(o.from || n, o.default, !0)) : (i = Yt(o.from || n))) : (i = Yt(o)),
      ie(i) ? Object.defineProperty(t, n, { enumerable: !0, configurable: !0, get: () => i.value, set: r => (i.value = r) }) : (t[n] = i);
  }
}
function yn(e, t, s) {
  Pe(R(e) ? e.map(n => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function Co(e, t, s, n) {
  const o = n.includes('.') ? go(s, n) : () => s[n];
  if (re(e)) {
    const i = t[e];
    j(i) && vs(o, i);
  } else if (j(e)) vs(o, e.bind(s));
  else if (X(e))
    if (R(e)) e.forEach(i => Co(i, t, s, n));
    else {
      const i = j(e.handler) ? e.handler.bind(s) : t[e.handler];
      j(i) && vs(o, i, e);
    }
}
function Zs(e) {
  const t = e.type,
    { mixins: s, extends: n } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: r },
    } = e.appContext,
    c = i.get(t);
  let f;
  return c ? (f = c) : !o.length && !s && !n ? (f = t) : ((f = {}), o.length && o.forEach(a => ts(f, a, r, !0)), ts(f, t, r)), X(t) && i.set(t, f), f;
}
function ts(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && ts(e, i, s, !0), o && o.forEach(r => ts(e, r, s, !0));
  for (const r in t)
    if (!(n && r === 'expose')) {
      const c = ar[r] || (s && s[r]);
      e[r] = c ? c(e[r], t[r]) : t[r];
    }
  return e;
}
const ar = {
  data: Cn,
  props: wn,
  emits: wn,
  methods: $t,
  computed: $t,
  beforeCreate: de,
  created: de,
  beforeMount: de,
  mounted: de,
  beforeUpdate: de,
  updated: de,
  beforeDestroy: de,
  beforeUnmount: de,
  destroyed: de,
  unmounted: de,
  activated: de,
  deactivated: de,
  errorCaptured: de,
  serverPrefetch: de,
  components: $t,
  directives: $t,
  watch: hr,
  provide: Cn,
  inject: dr,
};
function Cn(e, t) {
  return t
    ? e
      ? function () {
          return le(j(e) ? e.call(this, this) : e, j(t) ? t.call(this, this) : t);
        }
      : t
    : e;
}
function dr(e, t) {
  return $t(As(e), As(t));
}
function As(e) {
  if (R(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function de(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $t(e, t) {
  return e ? le(Object.create(null), e, t) : t;
}
function wn(e, t) {
  return e ? (R(e) && R(t) ? [...new Set([...e, ...t])] : le(Object.create(null), bn(e), bn(t ?? {}))) : t;
}
function hr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = le(Object.create(null), e);
  for (const n in t) s[n] = de(e[n], t[n]);
  return s;
}
function wo() {
  return {
    app: null,
    config: {
      isNativeTag: Bo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let pr = 0;
function _r(e, t) {
  return function (n, o = null) {
    j(n) || (n = le({}, n)), o != null && !X(o) && (o = null);
    const i = wo(),
      r = new Set();
    let c = !1;
    const f = (i.app = {
      _uid: pr++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Kr,
      get config() {
        return i.config;
      },
      set config(a) {},
      use(a, ...d) {
        return r.has(a) || (a && j(a.install) ? (r.add(a), a.install(f, ...d)) : j(a) && (r.add(a), a(f, ...d))), f;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f;
      },
      component(a, d) {
        return d ? ((i.components[a] = d), f) : i.components[a];
      },
      directive(a, d) {
        return d ? ((i.directives[a] = d), f) : i.directives[a];
      },
      mount(a, d, m) {
        if (!c) {
          const x = ee(n, o);
          return (
            (x.appContext = i), d && t ? t(x, a) : e(x, a, m), (c = !0), (f._container = a), (a.__vue_app__ = f), nn(x.component) || x.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, d) {
        return (i.provides[a] = d), f;
      },
      runWithContext(a) {
        ss = f;
        try {
          return a();
        } finally {
          ss = null;
        }
      },
    });
    return f;
  };
}
let ss = null;
function gr(e, t) {
  if (ae) {
    let s = ae.provides;
    const n = ae.parent && ae.parent.provides;
    n === s && (s = ae.provides = Object.create(n)), (s[e] = t);
  }
}
function Yt(e, t, s = !1) {
  const n = ae || ge;
  if (n || ss) {
    const o = n ? (n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides) : ss._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return s && j(t) ? t.call(n && n.proxy) : t;
  }
}
function mr(e, t, s, n = !1) {
  const o = {},
    i = {};
  Gt(i, ds, 1), (e.propsDefaults = Object.create(null)), xo(e, t, o, i);
  for (const r in e.propsOptions[0]) r in o || (o[r] = void 0);
  s ? (e.props = n ? o : Ti(o)) : e.type.props ? (e.props = o) : (e.props = i), (e.attrs = i);
}
function vr(e, t, s, n) {
  const {
      props: o,
      attrs: i,
      vnode: { patchFlag: r },
    } = e,
    c = U(o),
    [f] = e.propsOptions;
  let a = !1;
  if ((n || r > 0) && !(r & 16)) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let m = 0; m < d.length; m++) {
        let x = d[m];
        if (cs(e.emitsOptions, x)) continue;
        const M = t[x];
        if (f)
          if (H(i, x)) M !== i[x] && ((i[x] = M), (a = !0));
          else {
            const A = _t(x);
            o[A] = Is(f, c, A, M, e, !1);
          }
        else M !== i[x] && ((i[x] = M), (a = !0));
      }
    }
  } else {
    xo(e, t, o, i) && (a = !0);
    let d;
    for (const m in c)
      (!t || (!H(t, m) && ((d = bt(m)) === m || !H(t, d)))) &&
        (f ? s && (s[m] !== void 0 || s[d] !== void 0) && (o[m] = Is(f, c, m, void 0, e, !0)) : delete o[m]);
    if (i !== c) for (const m in i) (!t || !H(t, m)) && (delete i[m], (a = !0));
  }
  a && De(e, 'set', '$attrs');
}
function xo(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1,
    c;
  if (t)
    for (let f in t) {
      if (qt(f)) continue;
      const a = t[f];
      let d;
      o && H(o, (d = _t(f)))
        ? !i || !i.includes(d)
          ? (s[d] = a)
          : ((c || (c = {}))[d] = a)
        : cs(e.emitsOptions, f) || ((!(f in n) || a !== n[f]) && ((n[f] = a), (r = !0)));
    }
  if (i) {
    const f = U(s),
      a = c || G;
    for (let d = 0; d < i.length; d++) {
      const m = i[d];
      s[m] = Is(o, f, m, a[m], e, !H(a, m));
    }
  }
  return r;
}
function Is(e, t, s, n, o, i) {
  const r = e[s];
  if (r != null) {
    const c = H(r, 'default');
    if (c && n === void 0) {
      const f = r.default;
      if (r.type !== Function && !r.skipFactory && j(f)) {
        const { propsDefaults: a } = o;
        s in a ? (n = a[s]) : (vt(o), (n = a[s] = f.call(null, t)), it());
      } else n = f;
    }
    r[0] && (i && !c ? (n = !1) : r[1] && (n === '' || n === bt(s)) && (n = !0));
  }
  return n;
}
function Eo(e, t, s = !1) {
  const n = t.propsCache,
    o = n.get(e);
  if (o) return o;
  const i = e.props,
    r = {},
    c = [];
  let f = !1;
  if (!j(e)) {
    const d = m => {
      f = !0;
      const [x, M] = Eo(m, t, !0);
      le(r, x), M && c.push(...M);
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !f) return X(e) && n.set(e, at), at;
  if (R(i))
    for (let d = 0; d < i.length; d++) {
      const m = _t(i[d]);
      xn(m) && (r[m] = G);
    }
  else if (i)
    for (const d in i) {
      const m = _t(d);
      if (xn(m)) {
        const x = i[d],
          M = (r[m] = R(x) || j(x) ? { type: x } : le({}, x));
        if (M) {
          const A = Mn(Boolean, M.type),
            v = Mn(String, M.type);
          (M[0] = A > -1), (M[1] = v < 0 || A < v), (A > -1 || H(M, 'default')) && c.push(m);
        }
      }
    }
  const a = [r, c];
  return X(e) && n.set(e, a), a;
}
function xn(e) {
  return e[0] !== '$';
}
function En(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function Tn(e, t) {
  return En(e) === En(t);
}
function Mn(e, t) {
  return R(t) ? t.findIndex(s => Tn(s, e)) : j(t) && Tn(t, e) ? 0 : -1;
}
const To = e => e[0] === '_' || e === '$stable',
  en = e => (R(e) ? e.map(Le) : [Le(e)]),
  br = (e, t, s) => {
    if (t._n) return t;
    const n = Qt((...o) => en(t(...o)), s);
    return (n._c = !1), n;
  },
  Mo = (e, t, s) => {
    const n = e._ctx;
    for (const o in e) {
      if (To(o)) continue;
      const i = e[o];
      if (j(i)) t[o] = br(o, i, n);
      else if (i != null) {
        const r = en(i);
        t[o] = () => r;
      }
    }
  },
  $o = (e, t) => {
    const s = en(t);
    e.slots.default = () => s;
  },
  yr = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? ((e.slots = U(t)), Gt(t, '_', s)) : Mo(t, (e.slots = {}));
    } else (e.slots = {}), t && $o(e, t);
    Gt(e.slots, ds, 1);
  },
  Cr = (e, t, s) => {
    const { vnode: n, slots: o } = e;
    let i = !0,
      r = G;
    if (n.shapeFlag & 32) {
      const c = t._;
      c ? (s && c === 1 ? (i = !1) : (le(o, t), !s && c === 1 && delete o._)) : ((i = !t.$stable), Mo(t, o)), (r = t);
    } else t && ($o(e, t), (r = { default: 1 }));
    if (i) for (const c in o) !To(c) && !(c in r) && delete o[c];
  };
function Ps(e, t, s, n, o = !1) {
  if (R(e)) {
    e.forEach((x, M) => Ps(x, t && (R(t) ? t[M] : t), s, n, o));
    return;
  }
  if (kt(n) && !o) return;
  const i = n.shapeFlag & 4 ? nn(n.component) || n.component.proxy : n.el,
    r = o ? null : i,
    { i: c, r: f } = e,
    a = t && t.r,
    d = c.refs === G ? (c.refs = {}) : c.refs,
    m = c.setupState;
  if ((a != null && a !== f && (re(a) ? ((d[a] = null), H(m, a) && (m[a] = null)) : ie(a) && (a.value = null)), j(f))) Ye(f, c, 12, [r, d]);
  else {
    const x = re(f),
      M = ie(f);
    if (x || M) {
      const A = () => {
        if (e.f) {
          const v = x ? (H(m, f) ? m[f] : d[f]) : f.value;
          o
            ? R(v) && js(v, i)
            : R(v)
            ? v.includes(i) || v.push(i)
            : x
            ? ((d[f] = [i]), H(m, f) && (m[f] = d[f]))
            : ((f.value = [i]), e.k && (d[e.k] = f.value));
        } else x ? ((d[f] = r), H(m, f) && (m[f] = r)) : M && ((f.value = r), e.k && (d[e.k] = r));
      };
      r ? ((A.id = -1), _e(A, s)) : A();
    }
  }
}
const _e = qi;
function wr(e) {
  return xr(e);
}
function xr(e, t) {
  const s = xs();
  s.__VUE__ = !0;
  const {
      insert: n,
      remove: o,
      patchProp: i,
      createElement: r,
      createText: c,
      createComment: f,
      setText: a,
      setElementText: d,
      parentNode: m,
      nextSibling: x,
      setScopeId: M = Ie,
      insertStaticContent: A,
    } = e,
    v = (l, u, h, g = null, _ = null, E = null, $ = !1, w = null, T = !!u.dynamicChildren) => {
      if (l === u) return;
      l && !Tt(l, u) && ((g = Nt(l)), Ce(l, _, E, !0), (l = null)), u.patchFlag === -2 && ((T = !1), (u.dynamicChildren = null));
      const { type: b, ref: F, shapeFlag: I } = u;
      switch (b) {
        case as:
          P(l, u, h, g);
          break;
        case Ge:
          p(l, u, h, g);
          break;
        case Vt:
          l == null && y(u, h, g, $);
          break;
        case oe:
          ve(l, u, h, g, _, E, $, w, T);
          break;
        default:
          I & 1
            ? Y(l, u, h, g, _, E, $, w, T)
            : I & 6
            ? be(l, u, h, g, _, E, $, w, T)
            : (I & 64 || I & 128) && b.process(l, u, h, g, _, E, $, w, T, lt);
      }
      F != null && _ && Ps(F, l && l.ref, E, u || l, !u);
    },
    P = (l, u, h, g) => {
      if (l == null) n((u.el = c(u.children)), h, g);
      else {
        const _ = (u.el = l.el);
        u.children !== l.children && a(_, u.children);
      }
    },
    p = (l, u, h, g) => {
      l == null ? n((u.el = f(u.children || '')), h, g) : (u.el = l.el);
    },
    y = (l, u, h, g) => {
      [l.el, l.anchor] = A(l.children, u, h, g, l.el, l.anchor);
    },
    O = ({ el: l, anchor: u }, h, g) => {
      let _;
      for (; l && l !== u; ) (_ = x(l)), n(l, h, g), (l = _);
      n(u, h, g);
    },
    k = ({ el: l, anchor: u }) => {
      let h;
      for (; l && l !== u; ) (h = x(l)), o(l), (l = h);
      o(u);
    },
    Y = (l, u, h, g, _, E, $, w, T) => {
      ($ = $ || u.type === 'svg'), l == null ? D(u, h, g, _, E, $, w, T) : xe(l, u, _, E, $, w, T);
    },
    D = (l, u, h, g, _, E, $, w) => {
      let T, b;
      const { type: F, props: I, shapeFlag: S, transition: B, dirs: L } = l;
      if (
        ((T = l.el = r(l.type, E, I && I.is, I)),
        S & 8 ? d(T, l.children) : S & 16 && ce(l.children, T, null, g, _, E && F !== 'foreignObject', $, w),
        L && et(l, null, g, 'created'),
        W(T, l, l.scopeId, $, g),
        I)
      ) {
        for (const q in I) q !== 'value' && !qt(q) && i(T, q, null, I[q], E, l.children, g, _, Ue);
        'value' in I && i(T, 'value', null, I.value), (b = I.onVnodeBeforeMount) && Re(b, g, l);
      }
      L && et(l, null, g, 'beforeMount');
      const V = (!_ || (_ && !_.pendingBranch)) && B && !B.persisted;
      V && B.beforeEnter(T),
        n(T, u, h),
        ((b = I && I.onVnodeMounted) || V || L) &&
          _e(() => {
            b && Re(b, g, l), V && B.enter(T), L && et(l, null, g, 'mounted');
          }, _);
    },
    W = (l, u, h, g, _) => {
      if ((h && M(l, h), g)) for (let E = 0; E < g.length; E++) M(l, g[E]);
      if (_) {
        let E = _.subTree;
        if (u === E) {
          const $ = _.vnode;
          W(l, $, $.scopeId, $.slotScopeIds, _.parent);
        }
      }
    },
    ce = (l, u, h, g, _, E, $, w, T = 0) => {
      for (let b = T; b < l.length; b++) {
        const F = (l[b] = w ? qe(l[b]) : Le(l[b]));
        v(null, F, u, h, g, _, E, $, w);
      }
    },
    xe = (l, u, h, g, _, E, $) => {
      const w = (u.el = l.el);
      let { patchFlag: T, dynamicChildren: b, dirs: F } = u;
      T |= l.patchFlag & 16;
      const I = l.props || G,
        S = u.props || G;
      let B;
      h && tt(h, !1), (B = S.onVnodeBeforeUpdate) && Re(B, h, u, l), F && et(u, l, h, 'beforeUpdate'), h && tt(h, !0);
      const L = _ && u.type !== 'foreignObject';
      if ((b ? ue(l.dynamicChildren, b, w, h, g, L, E) : $ || N(l, u, w, null, h, g, L, E, !1), T > 0)) {
        if (T & 16) pe(w, u, I, S, h, g, _);
        else if ((T & 2 && I.class !== S.class && i(w, 'class', null, S.class, _), T & 4 && i(w, 'style', I.style, S.style, _), T & 8)) {
          const V = u.dynamicProps;
          for (let q = 0; q < V.length; q++) {
            const ne = V[q],
              Me = I[ne],
              ct = S[ne];
            (ct !== Me || ne === 'value') && i(w, ne, Me, ct, _, l.children, h, g, Ue);
          }
        }
        T & 1 && l.children !== u.children && d(w, u.children);
      } else !$ && b == null && pe(w, u, I, S, h, g, _);
      ((B = S.onVnodeUpdated) || F) &&
        _e(() => {
          B && Re(B, h, u, l), F && et(u, l, h, 'updated');
        }, g);
    },
    ue = (l, u, h, g, _, E, $) => {
      for (let w = 0; w < u.length; w++) {
        const T = l[w],
          b = u[w],
          F = T.el && (T.type === oe || !Tt(T, b) || T.shapeFlag & 70) ? m(T.el) : h;
        v(T, b, F, null, g, _, E, $, !0);
      }
    },
    pe = (l, u, h, g, _, E, $) => {
      if (h !== g) {
        if (h !== G) for (const w in h) !qt(w) && !(w in g) && i(l, w, h[w], null, $, u.children, _, E, Ue);
        for (const w in g) {
          if (qt(w)) continue;
          const T = g[w],
            b = h[w];
          T !== b && w !== 'value' && i(l, w, b, T, $, u.children, _, E, Ue);
        }
        'value' in g && i(l, 'value', h.value, g.value);
      }
    },
    ve = (l, u, h, g, _, E, $, w, T) => {
      const b = (u.el = l ? l.el : c('')),
        F = (u.anchor = l ? l.anchor : c(''));
      let { patchFlag: I, dynamicChildren: S, slotScopeIds: B } = u;
      B && (w = w ? w.concat(B) : B),
        l == null
          ? (n(b, h, g), n(F, h, g), ce(u.children, h, F, _, E, $, w, T))
          : I > 0 && I & 64 && S && l.dynamicChildren
          ? (ue(l.dynamicChildren, S, h, _, E, $, w), (u.key != null || (_ && u === _.subTree)) && ko(l, u, !0))
          : N(l, u, h, F, _, E, $, w, T);
    },
    be = (l, u, h, g, _, E, $, w, T) => {
      (u.slotScopeIds = w), l == null ? (u.shapeFlag & 512 ? _.ctx.activate(u, h, g, $, T) : Ee(u, h, g, _, E, $, T)) : Te(l, u, T);
    },
    Ee = (l, u, h, g, _, E, $) => {
      const w = (l.component = Fr(l, g, _));
      if ((mo(l) && (w.ctx.renderer = lt), Sr(w), w.asyncDep)) {
        if ((_ && _.registerDep(w, J), !l.el)) {
          const T = (w.subTree = ee(Ge));
          p(null, T, u, h);
        }
        return;
      }
      J(w, l, u, h, _, E, $);
    },
    Te = (l, u, h) => {
      const g = (u.component = l.component);
      if (Di(l, u, h))
        if (g.asyncDep && !g.asyncResolved) {
          K(g, u, h);
          return;
        } else (g.next = u), ji(g.update), g.update();
      else (u.el = l.el), (g.vnode = u);
    },
    J = (l, u, h, g, _, E, $) => {
      const w = () => {
          if (l.isMounted) {
            let { next: F, bu: I, u: S, parent: B, vnode: L } = l,
              V = F,
              q;
            tt(l, !1),
              F ? ((F.el = L.el), K(l, F, $)) : (F = L),
              I && gs(I),
              (q = F.props && F.props.onVnodeBeforeUpdate) && Re(q, B, F, L),
              tt(l, !0);
            const ne = ms(l),
              Me = l.subTree;
            (l.subTree = ne),
              v(Me, ne, m(Me.el), Nt(Me), l, _, E),
              (F.el = ne.el),
              V === null && zi(l, ne.el),
              S && _e(S, _),
              (q = F.props && F.props.onVnodeUpdated) && _e(() => Re(q, B, F, L), _);
          } else {
            let F;
            const { el: I, props: S } = u,
              { bm: B, m: L, parent: V } = l,
              q = kt(u);
            if ((tt(l, !1), B && gs(B), !q && (F = S && S.onVnodeBeforeMount) && Re(F, V, u), tt(l, !0), I && ps)) {
              const ne = () => {
                (l.subTree = ms(l)), ps(I, l.subTree, l, _, null);
              };
              q ? u.type.__asyncLoader().then(() => !l.isUnmounted && ne()) : ne();
            } else {
              const ne = (l.subTree = ms(l));
              v(null, ne, h, g, l, _, E), (u.el = ne.el);
            }
            if ((L && _e(L, _), !q && (F = S && S.onVnodeMounted))) {
              const ne = u;
              _e(() => Re(F, V, ne), _);
            }
            (u.shapeFlag & 256 || (V && kt(V.vnode) && V.vnode.shapeFlag & 256)) && l.a && _e(l.a, _), (l.isMounted = !0), (u = h = g = null);
          }
        },
        T = (l.effect = new Ks(w, () => Js(b), l.scope)),
        b = (l.update = () => T.run());
      (b.id = l.uid), tt(l, !0), b();
    },
    K = (l, u, h) => {
      u.component = l;
      const g = l.vnode.props;
      (l.vnode = u), (l.next = null), vr(l, u.props, g, h), Cr(l, u.children, h), yt(), mn(), Ct();
    },
    N = (l, u, h, g, _, E, $, w, T = !1) => {
      const b = l && l.children,
        F = l ? l.shapeFlag : 0,
        I = u.children,
        { patchFlag: S, shapeFlag: B } = u;
      if (S > 0) {
        if (S & 128) {
          Ze(b, I, h, g, _, E, $, w, T);
          return;
        } else if (S & 256) {
          ye(b, I, h, g, _, E, $, w, T);
          return;
        }
      }
      B & 8
        ? (F & 16 && Ue(b, _, E), I !== b && d(h, I))
        : F & 16
        ? B & 16
          ? Ze(b, I, h, g, _, E, $, w, T)
          : Ue(b, _, E, !0)
        : (F & 8 && d(h, ''), B & 16 && ce(I, h, g, _, E, $, w, T));
    },
    ye = (l, u, h, g, _, E, $, w, T) => {
      (l = l || at), (u = u || at);
      const b = l.length,
        F = u.length,
        I = Math.min(b, F);
      let S;
      for (S = 0; S < I; S++) {
        const B = (u[S] = T ? qe(u[S]) : Le(u[S]));
        v(l[S], B, h, null, _, E, $, w, T);
      }
      b > F ? Ue(l, _, E, !0, !1, I) : ce(u, h, g, _, E, $, w, T, I);
    },
    Ze = (l, u, h, g, _, E, $, w, T) => {
      let b = 0;
      const F = u.length;
      let I = l.length - 1,
        S = F - 1;
      for (; b <= I && b <= S; ) {
        const B = l[b],
          L = (u[b] = T ? qe(u[b]) : Le(u[b]));
        if (Tt(B, L)) v(B, L, h, null, _, E, $, w, T);
        else break;
        b++;
      }
      for (; b <= I && b <= S; ) {
        const B = l[I],
          L = (u[S] = T ? qe(u[S]) : Le(u[S]));
        if (Tt(B, L)) v(B, L, h, null, _, E, $, w, T);
        else break;
        I--, S--;
      }
      if (b > I) {
        if (b <= S) {
          const B = S + 1,
            L = B < F ? u[B].el : g;
          for (; b <= S; ) v(null, (u[b] = T ? qe(u[b]) : Le(u[b])), h, L, _, E, $, w, T), b++;
        }
      } else if (b > S) for (; b <= I; ) Ce(l[b], _, E, !0), b++;
      else {
        const B = b,
          L = b,
          V = new Map();
        for (b = L; b <= S; b++) {
          const we = (u[b] = T ? qe(u[b]) : Le(u[b]));
          we.key != null && V.set(we.key, b);
        }
        let q,
          ne = 0;
        const Me = S - L + 1;
        let ct = !1,
          rn = 0;
        const Et = new Array(Me);
        for (b = 0; b < Me; b++) Et[b] = 0;
        for (b = B; b <= I; b++) {
          const we = l[b];
          if (ne >= Me) {
            Ce(we, _, E, !0);
            continue;
          }
          let Se;
          if (we.key != null) Se = V.get(we.key);
          else
            for (q = L; q <= S; q++)
              if (Et[q - L] === 0 && Tt(we, u[q])) {
                Se = q;
                break;
              }
          Se === void 0 ? Ce(we, _, E, !0) : ((Et[Se - L] = b + 1), Se >= rn ? (rn = Se) : (ct = !0), v(we, u[Se], h, null, _, E, $, w, T), ne++);
        }
        const ln = ct ? Er(Et) : at;
        for (q = ln.length - 1, b = Me - 1; b >= 0; b--) {
          const we = L + b,
            Se = u[we],
            cn = we + 1 < F ? u[we + 1].el : g;
          Et[b] === 0 ? v(null, Se, h, cn, _, E, $, w, T) : ct && (q < 0 || b !== ln[q] ? Fe(Se, h, cn, 2) : q--);
        }
      }
    },
    Fe = (l, u, h, g, _ = null) => {
      const { el: E, type: $, transition: w, children: T, shapeFlag: b } = l;
      if (b & 6) {
        Fe(l.component.subTree, u, h, g);
        return;
      }
      if (b & 128) {
        l.suspense.move(u, h, g);
        return;
      }
      if (b & 64) {
        $.move(l, u, h, lt);
        return;
      }
      if ($ === oe) {
        n(E, u, h);
        for (let I = 0; I < T.length; I++) Fe(T[I], u, h, g);
        n(l.anchor, u, h);
        return;
      }
      if ($ === Vt) {
        O(l, u, h);
        return;
      }
      if (g !== 2 && b & 1 && w)
        if (g === 0) w.beforeEnter(E), n(E, u, h), _e(() => w.enter(E), _);
        else {
          const { leave: I, delayLeave: S, afterLeave: B } = w,
            L = () => n(E, u, h),
            V = () => {
              I(E, () => {
                L(), B && B();
              });
            };
          S ? S(E, L, V) : V();
        }
      else n(E, u, h);
    },
    Ce = (l, u, h, g = !1, _ = !1) => {
      const { type: E, props: $, ref: w, children: T, dynamicChildren: b, shapeFlag: F, patchFlag: I, dirs: S } = l;
      if ((w != null && Ps(w, null, h, l, !0), F & 256)) {
        u.ctx.deactivate(l);
        return;
      }
      const B = F & 1 && S,
        L = !kt(l);
      let V;
      if ((L && (V = $ && $.onVnodeBeforeUnmount) && Re(V, u, l), F & 6)) se(l.component, h, g);
      else {
        if (F & 128) {
          l.suspense.unmount(h, g);
          return;
        }
        B && et(l, null, u, 'beforeUnmount'),
          F & 64
            ? l.type.remove(l, u, h, _, lt, g)
            : b && (E !== oe || (I > 0 && I & 64))
            ? Ue(b, u, h, !1, !0)
            : ((E === oe && I & 384) || (!_ && F & 16)) && Ue(T, u, h),
          g && xt(l);
      }
      ((L && (V = $ && $.onVnodeUnmounted)) || B) &&
        _e(() => {
          V && Re(V, u, l), B && et(l, null, u, 'unmounted');
        }, h);
    },
    xt = l => {
      const { type: u, el: h, anchor: g, transition: _ } = l;
      if (u === oe) {
        te(h, g);
        return;
      }
      if (u === Vt) {
        k(l);
        return;
      }
      const E = () => {
        o(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (l.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: $, delayLeave: w } = _,
          T = () => $(h, E);
        w ? w(l.el, E, T) : T();
      } else E();
    },
    te = (l, u) => {
      let h;
      for (; l !== u; ) (h = x(l)), o(l), (l = h);
      o(u);
    },
    se = (l, u, h) => {
      const { bum: g, scope: _, update: E, subTree: $, um: w } = l;
      g && gs(g),
        _.stop(),
        E && ((E.active = !1), Ce($, l, u, h)),
        w && _e(w, u),
        _e(() => {
          l.isUnmounted = !0;
        }, u),
        u &&
          u.pendingBranch &&
          !u.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === u.pendingId &&
          (u.deps--, u.deps === 0 && u.resolve());
    },
    Ue = (l, u, h, g = !1, _ = !1, E = 0) => {
      for (let $ = E; $ < l.length; $++) Ce(l[$], u, h, g, _);
    },
    Nt = l => (l.shapeFlag & 6 ? Nt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : x(l.anchor || l.el)),
    on = (l, u, h) => {
      l == null ? u._vnode && Ce(u._vnode, null, null, !0) : v(u._vnode || null, l, u, null, null, null, h), mn(), ao(), (u._vnode = l);
    },
    lt = { p: v, um: Ce, m: Fe, r: xt, mt: Ee, mc: ce, pc: N, pbc: ue, n: Nt, o: e };
  let hs, ps;
  return t && ([hs, ps] = t(lt)), { render: on, hydrate: hs, createApp: _r(on, hs) };
}
function tt({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function ko(e, t, s = !1) {
  const n = e.children,
    o = t.children;
  if (R(n) && R(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let c = o[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && ((c = o[i] = qe(o[i])), (c.el = r.el)), s || ko(r, c)),
        c.type === as && (c.el = r.el);
    }
}
function Er(e) {
  const t = e.slice(),
    s = [0];
  let n, o, i, r, c;
  const f = e.length;
  for (n = 0; n < f; n++) {
    const a = e[n];
    if (a !== 0) {
      if (((o = s[s.length - 1]), e[o] < a)) {
        (t[n] = o), s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; ) (c = (i + r) >> 1), e[s[c]] < a ? (i = c + 1) : (r = c);
      a < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), (s[i] = n));
    }
  }
  for (i = s.length, r = s[i - 1]; i-- > 0; ) (s[i] = r), (r = t[r]);
  return s;
}
const Tr = e => e.__isTeleport,
  oe = Symbol.for('v-fgt'),
  as = Symbol.for('v-txt'),
  Ge = Symbol.for('v-cmt'),
  Vt = Symbol.for('v-stc'),
  At = [];
let Oe = null;
function z(e = !1) {
  At.push((Oe = e ? null : []));
}
function Mr() {
  At.pop(), (Oe = At[At.length - 1] || null);
}
let Bt = 1;
function $n(e) {
  Bt += e;
}
function Oo(e) {
  return (e.dynamicChildren = Bt > 0 ? Oe || at : null), Mr(), Bt > 0 && Oe && Oe.push(e), e;
}
function Q(e, t, s, n, o, i) {
  return Oo(C(e, t, s, n, o, i, !0));
}
function Ao(e, t, s, n, o) {
  return Oo(ee(e, t, s, n, o, !0));
}
function Io(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ds = '__vInternal',
  Po = ({ key: e }) => e ?? null,
  Jt = ({ ref: e, ref_key: t, ref_for: s }) => (
    typeof e == 'number' && (e = '' + e), e != null ? (re(e) || ie(e) || j(e) ? { i: ge, r: e, k: t, f: !!s } : e) : null
  );
function C(e, t = null, s = null, n = 0, o = null, i = e === oe ? 0 : 1, r = !1, c = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Po(t),
    ref: t && Jt(t),
    scopeId: us,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ge,
  };
  return (
    c ? (tn(f, s), i & 128 && e.normalize(f)) : s && (f.shapeFlag |= re(s) ? 8 : 16),
    Bt > 0 && !r && Oe && (f.patchFlag > 0 || i & 6) && f.patchFlag !== 32 && Oe.push(f),
    f
  );
}
const ee = $r;
function $r(e, t = null, s = null, n = 0, o = null, i = !1) {
  if (((!e || e === rr) && (e = Ge), Io(e))) {
    const c = mt(e, t, !0);
    return s && tn(c, s), Bt > 0 && !i && Oe && (c.shapeFlag & 6 ? (Oe[Oe.indexOf(e)] = c) : Oe.push(c)), (c.patchFlag |= -2), c;
  }
  if ((Lr(e) && (e = e.__vccOpts), t)) {
    t = kr(t);
    let { class: c, style: f } = t;
    c && !re(c) && (t.class = Ve(c)), X(f) && (oo(f) && !R(f) && (f = le({}, f)), (t.style = Hs(f)));
  }
  const r = re(e) ? 1 : Wi(e) ? 128 : Tr(e) ? 64 : X(e) ? 4 : j(e) ? 2 : 0;
  return C(e, t, s, n, o, r, i, !0);
}
function kr(e) {
  return e ? (oo(e) || ds in e ? le({}, e) : e) : null;
}
function mt(e, t, s = !1) {
  const { props: n, ref: o, patchFlag: i, children: r } = e,
    c = t ? Ar(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Po(c),
    ref: t && t.ref ? (s && o ? (R(o) ? o.concat(Jt(t)) : [o, Jt(t)]) : Jt(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== oe ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Ae(e = ' ', t = 0) {
  return ee(as, null, e, t);
}
function Or(e, t) {
  const s = ee(Vt, null, e);
  return (s.staticCount = t), s;
}
function je(e = '', t = !1) {
  return t ? (z(), Ao(Ge, null, e)) : ee(Ge, null, e);
}
function Le(e) {
  return e == null || typeof e == 'boolean' ? ee(Ge) : R(e) ? ee(oe, null, e.slice()) : typeof e == 'object' ? qe(e) : ee(as, null, String(e));
}
function qe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e);
}
function tn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (R(t)) s = 16;
  else if (typeof t == 'object')
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), tn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !(ds in t) ? (t._ctx = ge) : o === 3 && ge && (ge.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else j(t) ? ((t = { default: t, _ctx: ge }), (s = 32)) : ((t = String(t)), n & 64 ? ((s = 16), (t = [Ae(t)])) : (s = 8));
  (e.children = t), (e.shapeFlag |= s);
}
function Ar(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === 'class') t.class !== n.class && (t.class = Ve([t.class, n.class]));
      else if (o === 'style') t.style = Hs([t.style, n.style]);
      else if (ns(o)) {
        const i = t[o],
          r = n[o];
        r && i !== r && !(R(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
      } else o !== '' && (t[o] = n[o]);
  }
  return t;
}
function Re(e, t, s, n = null) {
  Pe(e, t, 7, [s, n]);
}
const Ir = wo();
let Pr = 0;
function Fr(e, t, s) {
  const n = e.type,
    o = (t ? t.appContext : e.appContext) || Ir,
    i = {
      uid: Pr++,
      vnode: e,
      type: n,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Vo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Eo(n, o),
      emitsOptions: po(n, o),
      emit: null,
      emitted: null,
      propsDefaults: G,
      inheritAttrs: n.inheritAttrs,
      ctx: G,
      data: G,
      props: G,
      attrs: G,
      slots: G,
      refs: G,
      setupState: G,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = Hi.bind(null, i)), e.ce && e.ce(i), i;
}
let ae = null,
  sn,
  ut,
  kn = '__VUE_INSTANCE_SETTERS__';
(ut = xs()[kn]) || (ut = xs()[kn] = []),
  ut.push(e => (ae = e)),
  (sn = e => {
    ut.length > 1 ? ut.forEach(t => t(e)) : ut[0](e);
  });
const vt = e => {
    sn(e), e.scope.on();
  },
  it = () => {
    ae && ae.scope.off(), sn(null);
  };
function Fo(e) {
  return e.vnode.shapeFlag & 4;
}
let jt = !1;
function Sr(e, t = !1) {
  jt = t;
  const { props: s, children: n } = e.vnode,
    o = Fo(e);
  mr(e, s, o, t), yr(e, n);
  const i = o ? Rr(e, t) : void 0;
  return (jt = !1), i;
}
function Rr(e, t) {
  const s = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = io(new Proxy(e.ctx, cr)));
  const { setup: n } = s;
  if (n) {
    const o = (e.setupContext = n.length > 1 ? jr(e) : null);
    vt(e), yt();
    const i = Ye(n, e, 0, [e.props, o]);
    if ((Ct(), it(), Un(i))) {
      if ((i.then(it, it), t))
        return i
          .then(r => {
            On(e, r, t);
          })
          .catch(r => {
            ls(r, e, 0);
          });
      e.asyncDep = i;
    } else On(e, i, t);
  } else So(e, t);
}
function On(e, t, s) {
  j(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : X(t) && (e.setupState = co(t)), So(e, s);
}
let An;
function So(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && An && !n.render) {
      const o = n.template || Zs(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: r } = e.appContext.config,
          { delimiters: c, compilerOptions: f } = n,
          a = le(le({ isCustomElement: i, delimiters: c }, r), f);
        n.render = An(o, a);
      }
    }
    e.render = n.render || Ie;
  }
  vt(e), yt(), ur(e), Ct(), it();
}
function Br(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, s) {
        return me(e, 'get', '$attrs'), t[s];
      },
    }))
  );
}
function jr(e) {
  const t = s => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return Br(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function nn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(co(io(e.exposed)), {
        get(t, s) {
          if (s in t) return t[s];
          if (s in Ot) return Ot[s](e);
        },
        has(t, s) {
          return s in t || s in Ot;
        },
      }))
    );
}
function Lr(e) {
  return j(e) && '__vccOpts' in e;
}
const Nr = (e, t) => Fi(e, t, jt),
  Hr = Symbol.for('v-scx'),
  Ur = () => Yt(Hr),
  Kr = '3.3.4',
  Dr = 'http://www.w3.org/2000/svg',
  nt = typeof document < 'u' ? document : null,
  In = nt && nt.createElement('template'),
  zr = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, n) => {
      const o = t ? nt.createElementNS(Dr, e) : nt.createElement(e, s ? { is: s } : void 0);
      return e === 'select' && n && n.multiple != null && o.setAttribute('multiple', n.multiple), o;
    },
    createText: e => nt.createTextNode(e),
    createComment: e => nt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => nt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, s, n, o, i) {
      const r = s ? s.previousSibling : t.lastChild;
      if (o && (o === i || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); );
      else {
        In.innerHTML = n ? `<svg>${e}</svg>` : e;
        const c = In.content;
        if (n) {
          const f = c.firstChild;
          for (; f.firstChild; ) c.appendChild(f.firstChild);
          c.removeChild(f);
        }
        t.insertBefore(c, s);
      }
      return [r ? r.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
    },
  };
function Wr(e, t, s) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(' ')), t == null ? e.removeAttribute('class') : s ? e.setAttribute('class', t) : (e.className = t);
}
function qr(e, t, s) {
  const n = e.style,
    o = re(s);
  if (s && !o) {
    if (t && !re(t)) for (const i in t) s[i] == null && Fs(n, i, '');
    for (const i in s) Fs(n, i, s[i]);
  } else {
    const i = n.display;
    o ? t !== s && (n.cssText = s) : t && e.removeAttribute('style'), '_vod' in e && (n.display = i);
  }
}
const Pn = /\s*!important$/;
function Fs(e, t, s) {
  if (R(s)) s.forEach(n => Fs(e, t, n));
  else if ((s == null && (s = ''), t.startsWith('--'))) e.setProperty(t, s);
  else {
    const n = Qr(e, t);
    Pn.test(s) ? e.setProperty(bt(n), s.replace(Pn, ''), 'important') : (e[n] = s);
  }
}
const Fn = ['Webkit', 'Moz', 'ms'],
  ys = {};
function Qr(e, t) {
  const s = ys[t];
  if (s) return s;
  let n = _t(t);
  if (n !== 'filter' && n in e) return (ys[t] = n);
  n = zn(n);
  for (let o = 0; o < Fn.length; o++) {
    const i = Fn[o] + n;
    if (i in e) return (ys[t] = i);
  }
  return t;
}
const Sn = 'http://www.w3.org/1999/xlink';
function Yr(e, t, s, n, o) {
  if (n && t.startsWith('xlink:')) s == null ? e.removeAttributeNS(Sn, t.slice(6, t.length)) : e.setAttributeNS(Sn, t, s);
  else {
    const i = Yo(t);
    s == null || (i && !Wn(s)) ? e.removeAttribute(t) : e.setAttribute(t, i ? '' : s);
  }
}
function Vr(e, t, s, n, o, i, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    n && r(n, o, i), (e[t] = s ?? '');
    return;
  }
  const c = e.tagName;
  if (t === 'value' && c !== 'PROGRESS' && !c.includes('-')) {
    e._value = s;
    const a = c === 'OPTION' ? e.getAttribute('value') : e.value,
      d = s ?? '';
    a !== d && (e.value = d), s == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (s === '' || s == null) {
    const a = typeof e[t];
    a === 'boolean' ? (s = Wn(s)) : s == null && a === 'string' ? ((s = ''), (f = !0)) : a === 'number' && ((s = 0), (f = !0));
  }
  try {
    e[t] = s;
  } catch {}
  f && e.removeAttribute(t);
}
function Jr(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Gr(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
function Xr(e, t, s, n, o = null) {
  const i = e._vei || (e._vei = {}),
    r = i[t];
  if (n && r) r.value = n;
  else {
    const [c, f] = Zr(t);
    if (n) {
      const a = (i[t] = sl(n, o));
      Jr(e, c, a, f);
    } else r && (Gr(e, c, r, f), (i[t] = void 0));
  }
}
const Rn = /(?:Once|Passive|Capture)$/;
function Zr(e) {
  let t;
  if (Rn.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Rn)); ) (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : bt(e.slice(2)), t];
}
let Cs = 0;
const el = Promise.resolve(),
  tl = () => Cs || (el.then(() => (Cs = 0)), (Cs = Date.now()));
function sl(e, t) {
  const s = n => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= s.attached) return;
    Pe(nl(n, s.value), t, 5, [n]);
  };
  return (s.value = e), (s.attached = tl()), s;
}
function nl(e, t) {
  if (R(t)) {
    const s = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        s.call(e), (e._stopped = !0);
      }),
      t.map(n => o => !o._stopped && n && n(o))
    );
  } else return t;
}
const Bn = /^on[a-z]/,
  ol = (e, t, s, n, o = !1, i, r, c, f) => {
    t === 'class'
      ? Wr(e, n, o)
      : t === 'style'
      ? qr(e, s, n)
      : ns(t)
      ? Bs(t) || Xr(e, t, s, n, r)
      : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : il(e, t, n, o))
      ? Vr(e, t, n, i, r, c, f)
      : (t === 'true-value' ? (e._trueValue = n) : t === 'false-value' && (e._falseValue = n), Yr(e, t, n, o));
  };
function il(e, t, s, n) {
  return n
    ? !!(t === 'innerHTML' || t === 'textContent' || (t in e && Bn.test(t) && j(s)))
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Bn.test(t) && re(s))
    ? !1
    : t in e;
}
const rl = ['ctrl', 'shift', 'alt', 'meta'],
  ll = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => 'button' in e && e.button !== 0,
    middle: e => 'button' in e && e.button !== 1,
    right: e => 'button' in e && e.button !== 2,
    exact: (e, t) => rl.some(s => e[`${s}Key`] && !t.includes(s)),
  },
  Ss =
    (e, t) =>
    (s, ...n) => {
      for (let o = 0; o < t.length; o++) {
        const i = ll[t[o]];
        if (i && i(s, t)) return;
      }
      return e(s, ...n);
    },
  cl = le({ patchProp: ol }, zr);
let jn;
function ul() {
  return jn || (jn = wr(cl));
}
const fl = (...e) => {
  const t = ul().createApp(...e),
    { mount: s } = t;
  return (
    (t.mount = n => {
      const o = al(n);
      if (!o) return;
      const i = t._component;
      !j(i) && !i.render && !i.template && (i.template = o.innerHTML), (o.innerHTML = '');
      const r = s(o, !1, o instanceof SVGElement);
      return o instanceof Element && (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')), r;
    }),
    t
  );
};
function al(e) {
  return re(e) ? document.querySelector(e) : e;
}
Z();
const dl = Z([]),
  he = Z('Home');
localStorage.setItem('LocalUserList', JSON.stringify(dl.value));
const hl = Or(
    '<header><h1>Willkommen bei Bullshit Games</h1></header><section><h2>Unsere Highlights:</h2><ul><li><s>Einzigartige Spiele</s></li><li>Aktuelle &quot;Bullshit&quot;-Neuerscheinungen</li><li><s>Verrückte Community</s></li><li>Lachsgarantie</li></ul></section><section><h2>Warum Bullshit Games wählen?</h2><ul><li><s>Unsere Einzigartigkeit</s></li></ul></section>',
    3
  ),
  pl = C('h2', null, 'Unsere Spiele:', -1),
  _l = { class: 'game' },
  gl = C('h3', null, 'Spiel 1: Tic Tac Toe', -1),
  ml = C(
    'p',
    null,
    'Spiele eine runde TicTacToe gegen deine freunde. Und wenn du keine hast spiele einfach gegen dich selsbt und gewinne jede runde.',
    -1
  ),
  vl = { class: 'game' },
  bl = C('h3', null, 'Spiel 2: Cookie Clicker', -1),
  yl = C('p', null, 'Clicke bis die finger bluten und sammle alle Coockies. Jetzt neu, versklave deine oma um mit dir zu arbeiten.', -1),
  Cl = Xe({
    __name: 'Home',
    setup(e) {
      return (t, s) => (
        z(),
        Q(
          oe,
          null,
          [
            hl,
            C('section', null, [
              pl,
              C('div', _l, [gl, ml, C('button', { onClick: s[0] || (s[0] = Ss(n => (he.value = 'TicTacToe'), ['prevent'])) }, 'Spiel starten')]),
              C('div', vl, [bl, yl, C('button', { onClick: s[1] || (s[1] = Ss(n => (he.value = 'CookieClicker'), ['prevent'])) }, 'Spiel starten')]),
            ]),
          ],
          64
        )
      );
    },
  }),
  wl = { class: 'Body' },
  xl = { class: 'Game' },
  El = { class: 'field' },
  Tl = { class: 'row' },
  Ml = ['onClick'],
  $l = { key: 0 },
  kl = { key: 1 },
  Ol = ['open'],
  Al = Xe({
    __name: 'ConnectFour',
    setup(e) {
      const t = Z(!1);
      let s = !0,
        n = !1,
        o = 7;
      const i = Z([]);
      r();
      function r() {
        for (let v = 0; v < o; v++) {
          const P = [];
          for (let p = 0; p < o; p++) {
            const y = { isEmpty: !0, player: !1 };
            P.push(y);
          }
          i.value.push(P);
        }
      }
      function c() {
        s = !s;
      }
      function f(v) {
        let P = -1;
        for (let p = o - 1; p >= 0; p--)
          if (i.value[v][p].isEmpty) {
            P = p;
            break;
          }
        P !== -1 && ((i.value[v][P].player = s), (i.value[v][P].isEmpty = !1)), a(), c();
      }
      function a() {
        m(), x(), M(), n && (t.value = !0);
      }
      function d() {
        document.querySelector('.winText').showModal();
      }
      function m() {
        var p, y, O, k, Y;
        let v = 0,
          P = 0;
        for (let D = o - 1; D >= 0; D--) {
          (v = 0), (P = 0);
          for (let W = o - 1; W >= 0; W--)
            (p = i.value[W][D]) != null && p.player && !((y = i.value[W][D]) != null && y.isEmpty) && (P++, (v = 0), A(P)),
              !((O = i.value[W][D]) != null && O.player) && !((k = i.value[W][D]) != null && k.isEmpty) && (v++, (P = 0), A(v)),
              (Y = i.value[W][D]) != null && Y.isEmpty && ((v = 0), (P = 0));
        }
      }
      function x() {
        var p, y, O, k, Y;
        let v = 0,
          P = 0;
        for (let D = o - 1; D >= 0; D--) {
          (v = 0), (P = 0);
          for (let W = o - 1; W >= 0; W--)
            (p = i.value[D][W]) != null && p.player && !((y = i.value[D][W]) != null && y.isEmpty) && (P++, (v = 0), A(P)),
              !((O = i.value[D][W]) != null && O.player) && !((k = i.value[D][W]) != null && k.isEmpty) && (v++, (P = 0), A(v)),
              (Y = i.value[D][W]) != null && Y.isEmpty && ((v = 0), (P = 0));
        }
      }
      function M() {
        var v, P, p, y, O, k, Y, D, W, ce, xe, ue, pe, ve, be, Ee, Te, J, K, N, ye, Ze, Fe, Ce;
        for (let xt = 2; xt >= 0; xt--)
          for (let te = o - 1; te > 0; te--)
            for (let se = o - 1; se > 0; se--)
              i.value[te][se].player === s &&
                !i.value[te][se].isEmpty &&
                ((P = (v = i.value[te - 1]) == null ? void 0 : v[se - 1]) == null ? void 0 : P.player) === s &&
                !((y = (p = i.value[te - 1]) == null ? void 0 : p[se - 1]) != null && y.isEmpty) &&
                ((k = (O = i.value[te - 2]) == null ? void 0 : O[se - 2]) == null ? void 0 : k.player) === s &&
                !((D = (Y = i.value[te - 2]) == null ? void 0 : Y[se - 2]) != null && D.isEmpty) &&
                ((ce = (W = i.value[te - 3]) == null ? void 0 : W[se - 3]) == null ? void 0 : ce.player) === s &&
                !((ue = (xe = i.value[te - 3]) == null ? void 0 : xe[se - 3]) != null && ue.isEmpty) &&
                d(),
                i.value[te][se].player === s &&
                  !i.value[te][se].isEmpty &&
                  ((ve = (pe = i.value[te - 1]) == null ? void 0 : pe[se + 1]) == null ? void 0 : ve.player) === s &&
                  !((Ee = (be = i.value[te - 1]) == null ? void 0 : be[se + 1]) != null && Ee.isEmpty) &&
                  ((J = (Te = i.value[te - 2]) == null ? void 0 : Te[se + 2]) == null ? void 0 : J.player) === s &&
                  !((N = (K = i.value[te - 2]) == null ? void 0 : K[se + 2]) != null && N.isEmpty) &&
                  ((Ze = (ye = i.value[te - 3]) == null ? void 0 : ye[se + 3]) == null ? void 0 : Ze.player) === s &&
                  !((Ce = (Fe = i.value[te - 3]) == null ? void 0 : Fe[se + 3]) != null && Ce.isEmpty) &&
                  d();
      }
      function A(v) {
        v >= 4 && (n = !0);
      }
      return (v, P) => (
        z(),
        Q('div', wl, [
          C('div', xl, [
            C('div', El, [
              (z(!0),
              Q(
                oe,
                null,
                Rt(
                  i.value,
                  (p, y) => (
                    z(),
                    Q('div', Tl, [
                      (z(!0),
                      Q(
                        oe,
                        null,
                        Rt(
                          p,
                          O => (
                            z(),
                            Q(
                              'div',
                              {
                                class: 'tile',
                                onClick: Ss(
                                  k => {
                                    Be(n) || (O.isEmpty && (f(y), a()));
                                  },
                                  ['prevent']
                                ),
                              },
                              [
                                O.player && !O.isEmpty ? (z(), Q('div', $l, '🔴')) : je('', !0),
                                !O.player && !O.isEmpty ? (z(), Q('div', kl, '🔵')) : je('', !0),
                              ],
                              8,
                              Ml
                            )
                          )
                        ),
                        256
                      )),
                    ])
                  )
                ),
                256
              )),
            ]),
          ]),
          C(
            'dialog',
            { class: 'GameEnd', open: t.value },
            [
              C('p', null, [
                Ae(' Click '),
                C(
                  'button',
                  {
                    class: Ve('RestartGame'),
                    onClick:
                      P[0] ||
                      (P[0] = p => {
                        (i.value = []), r(), (t.value = !1), ie(n) ? (n.value = !1) : (n = !1), ie(s) ? (s.value = !0) : (s = !0);
                      }),
                  },
                  ' Here '
                ),
                Ae(' to restart the game '),
              ]),
            ],
            8,
            Ol
          ),
        ])
      );
    },
  });
const Lt = (e, t) => {
    const s = e.__vccOpts || e;
    for (const [n, o] of t) s[n] = o;
    return s;
  },
  Il = Lt(Al, [['__scopeId', 'data-v-866f4757']]),
  Pl = '' + new URL('../cookie.png', import.meta.url).href,
  Fl = '' + new URL('../cursor.png', import.meta.url).href,
  Sl = '' + new URL('../grandma.jpg', import.meta.url).href,
  Rl = { class: 'd-flex justify-content-center align-items-center text-decoration-underline' },
  ws = Xe({
    __name: 'ShowCookies',
    props: { cookies: {} },
    setup(e) {
      const t = e,
        { cookies: s } = Oi(t);
      return (n, o) => (z(), Q('h5', Rl, [Ae(Ne(Be(s)) + ' ', 1), lr(n.$slots, 'default')]));
    },
  }),
  rt = e => (Gs('data-v-da95c464'), (e = e()), Xs(), e),
  Bl = { class: 'cookieClicker' },
  jl = rt(() => C('h1', null, 'Cookie Clicker', -1)),
  Ll = { class: 'd-flex justify-content-center align-items-center' },
  Nl = { class: 'stats' },
  Hl = rt(() => C('span', { class: 'd-flex justify-content-center h2' }, 'Stats', -1)),
  Ul = { class: 'upgrades' },
  Kl = rt(() => C('span', { class: 'd-flex justify-content-center h2' }, 'Upgrades', -1)),
  Dl = rt(() => C('img', { src: Fl, alt: 'cursor' }, null, -1)),
  zl = rt(() => C('span', { class: 'd-flex justify-content-center align-items-center fs-4' }, 'Cursor', -1)),
  Wl = { class: 'd-flex justify-content-center align-items-center fs-4' },
  ql = rt(() => C('img', { src: Sl, alt: 'grandma' }, null, -1)),
  Ql = rt(() => C('span', { class: 'd-flex justify-content-center align-items-center fs-4' }, 'Grandma', -1)),
  Yl = { class: 'd-flex justify-content-center align-items-center fs-4' },
  Vl = 1,
  Jl = Xe({
    __name: 'cookieClicker',
    setup(e) {
      const t = Z(''),
        s = Z(!1),
        n = Z(!1),
        o = Z({ cookiesInTotal: 0, cookies: 0, clickValue: 1, passiveClicks: 0 }),
        i = Z({ clickUpgradeLevel: 1, grandmaUpgradeLevel: 1 });
      setInterval(() => (r(), M()), 1e3 / Vl);
      function r() {
        a(o.value.passiveClicks);
      }
      function c() {
        return 100 * (0.5 * i.value.clickUpgradeLevel);
      }
      function f() {
        return 100 * i.value.grandmaUpgradeLevel;
      }
      function a(v) {
        n.value && (v *= 7), (o.value.cookies += v), (o.value.cookiesInTotal += v);
      }
      function d() {
        a(o.value.clickValue), setTimeout(() => (t.value = ''), 100);
      }
      function m() {
        o.value.cookies >= c() && (o.value.clickValue++, (o.value.cookies -= c()), i.value.clickUpgradeLevel++);
      }
      function x() {
        o.value.cookies >= f() && (o.value.passiveClicks++, (o.value.cookies -= f()), i.value.grandmaUpgradeLevel++);
      }
      function M() {
        const v = Math.random() * 100;
        console.log(v), v <= 1 && ((s.value = !0), setTimeout(() => (s.value = !1), 1e4));
      }
      function A() {
        (s.value = !1), (n.value = !0), setTimeout(() => (n.value = !1), 7e3);
      }
      return (v, P) => (
        z(),
        Q('div', Bl, [
          jl,
          C('h3', Ll, Ne(Math.ceil(o.value.cookies)) + ' Cookies', 1),
          C(
            'div',
            {
              class: Ve(['cookie', t.value]),
              role: 'button',
              onClick:
                P[0] ||
                (P[0] = p => {
                  (t.value = 'biggerCookie'), d();
                }),
            },
            null,
            2
          ),
          C('div', null, [
            s.value ? (z(), Q('img', { key: 0, src: Pl, alt: 'golden cookie', width: '75', class: 'goldenCookie', onClick: A })) : je('', !0),
          ]),
          C('div', Nl, [
            Hl,
            ee(ws, { cookies: n.value ? o.value.clickValue * 7 : o.value.clickValue }, { default: Qt(() => [Ae('Cookies per Click')]), _: 1 }, 8, [
              'cookies',
            ]),
            ee(ws, { cookies: o.value.passiveClicks }, { default: Qt(() => [Ae('Cookies per Second')]), _: 1 }, 8, ['cookies']),
            ee(ws, { cookies: o.value.cookiesInTotal }, { default: Qt(() => [Ae('In total collected Cookies')]), _: 1 }, 8, ['cookies']),
          ]),
          C('div', Ul, [
            Kl,
            C(
              'div',
              {
                class: 'd-flex justify-content-around text-decoration-underline',
                style: { height: '60px' },
                role: 'button',
                onClick: P[1] || (P[1] = p => m()),
              },
              [Dl, zl, C('span', Wl, Ne(c()), 1)]
            ),
            C(
              'div',
              {
                class: 'd-flex justify-content-around text-decoration-underline',
                style: { height: '60px' },
                role: 'button',
                onClick: P[2] || (P[2] = p => x()),
              },
              [ql, Ql, C('span', Yl, Ne(f()), 1)]
            ),
          ]),
        ])
      );
    },
  });
const Gl = Lt(Jl, [['__scopeId', 'data-v-da95c464']]),
  Xl = { class: 'tictactoe' },
  Zl = ['open'],
  ec = ['open'],
  tc = { class: 'field' },
  sc = { class: 'row' },
  nc = ['onClick'],
  Ln = 3,
  oc = Xe({
    __name: 'TicTacToe',
    setup(e) {
      const t = Z([]),
        s = Z(!0),
        n = Z(!1),
        o = Z('✗');
      function i() {
        (o.value = '✗'), f();
      }
      function r() {
        const a = ['✗', '◯'];
        for (let d = 0; d < 3; d++)
          for (const m of a)
            ((t.value[d][0].isCross === m && t.value[d][1].isCross === m && t.value[d][2].isCross === m) ||
              (t.value[0][d].isCross === m && t.value[1][d].isCross === m && t.value[2][d].isCross === m) ||
              (t.value[0][0].isCross === m && t.value[1][1].isCross === m && t.value[2][2].isCross === m) ||
              (t.value[0][2].isCross === m && t.value[1][1].isCross === m && t.value[2][0].isCross === m) ||
              (!t.value[0][0].isEmpty &&
                !t.value[0][1].isEmpty &&
                !t.value[0][2].isEmpty &&
                !t.value[1][0].isEmpty &&
                !t.value[1][1].isEmpty &&
                !t.value[1][2].isEmpty &&
                !t.value[2][0].isEmpty &&
                !t.value[2][1].isEmpty &&
                !t.value[2][2].isEmpty)) &&
              (n.value = !0);
      }
      function c() {
        o.value === '✗' ? (o.value = '◯') : (o.value = '✗');
      }
      function f() {
        t.value = [];
        for (let a = 0; a < Ln; a++) {
          const d = [];
          for (let m = 0; m < Ln; m++) {
            const x = { isEmpty: !0, isCross: '' };
            d.push(x);
          }
          t.value.push(d);
        }
      }
      return (a, d) => (
        z(),
        Q('div', Xl, [
          C(
            'dialog',
            { class: 'GameStart', open: s.value },
            [
              C('p', null, [
                Ae(' Click '),
                C('button', { class: Ve('StartGame'), onClick: d[0] || (d[0] = m => ((s.value = !1), i())) }, 'Here'),
                Ae(' to start the game '),
              ]),
            ],
            8,
            Zl
          ),
          C(
            'dialog',
            { class: 'GameEnd', open: n.value },
            [
              C('p', null, [
                Ae(' Click '),
                C('button', { class: Ve('RestartGame'), onClick: d[1] || (d[1] = m => ((n.value = !1), i())) }, 'Here'),
                Ae(' to restart the game '),
              ]),
            ],
            8,
            ec
          ),
          C('div', tc, [
            (z(!0),
            Q(
              oe,
              null,
              Rt(
                t.value,
                m => (
                  z(),
                  Q('div', sc, [
                    (z(!0),
                    Q(
                      oe,
                      null,
                      Rt(
                        m,
                        x => (
                          z(),
                          Q(
                            'div',
                            {
                              class: 'tile',
                              onClick: M => {
                                x.isEmpty && ((x.isEmpty = !1), (x.isCross = o.value), r(), c());
                              },
                            },
                            [C('div', null, Ne(x.isCross), 1)],
                            8,
                            nc
                          )
                        )
                      ),
                      256
                    )),
                  ])
                )
              ),
              256
            )),
          ]),
        ])
      );
    },
  });
const ic = Lt(oc, [['__scopeId', 'data-v-8c39d73b']]),
  Ro = e => (Gs('data-v-62d6e68c'), (e = e()), Xs(), e),
  rc = { class: 'mathQuiz' },
  lc = Ro(() => C('h1', { class: 'd-flex justify-content-center align-items-center header' }, 'Math Quiz', -1)),
  cc = Ro(() => C('h3', { class: 'd-flex justify-content-center align-items-center' }, 'Try to go as far as you can!', -1)),
  uc = { class: 'd-flex justify-content-center align-items-center' },
  fc = { class: 'textWrapper' },
  ac = { class: 'questionWrapper' },
  dc = ['onClick'],
  hc = Xe({
    __name: 'MathQuiz',
    setup(e) {
      const t = Z(null),
        s = Z(''),
        n = Z(''),
        o = Z(0),
        i = Z(0),
        r = Z(0),
        c = Z([]);
      function f(x) {
        setTimeout(() => {
          x === c.value[o.value].correctAnswer ? (i.value++, (s.value = 'correctColor')) : (r.value++, (n.value = 'wrongColor')),
            o.value++,
            (t.value = null),
            m();
        }, 1e3);
      }
      function a() {
        c.value[o.value].answers.splice(Math.floor(Math.random() * 4), 1, c.value[o.value].correctAnswer);
      }
      function d(x) {
        return t.value !== c.value[o.value].correctAnswer && x === t.value
          ? 'bg-danger'
          : t.value !== null && x === c.value[o.value].correctAnswer
          ? 'bg-success'
          : '';
      }
      m();
      function m() {
        const x = Math.random(),
          M = Math.ceil(Math.random() * 100),
          A = Math.ceil(Math.random() * 100),
          v = Math.ceil(Math.random() * 100);
        x <= 25
          ? (c.value.push({
              question: `${M} + ${A} * ${v}`,
              answers: [M * (A - M) * v, M * (A + v), M - A * v, M * (A - v)],
              correctAnswer: M + A * v,
            }),
            (c.value[o.value].question = `${M} + ${A} * ${v}`))
          : x <= 50 && x >= 25
          ? c.value.push({
              question: `${M} * (${A} + ${v})`,
              answers: [M - A * v, M + A * v, M + A ** 2 - v, M * (A - v)],
              correctAnswer: M * (A + v),
            })
          : x <= 75 && x >= 50
          ? c.value.push({ question: `${M} - ${A} * ${v}`, answers: [M * (A + v), M * (A - v), M + A * v, A * v], correctAnswer: M - A * v })
          : c.value.push({
              question: `${M} * (${A} - ${v})`,
              answers: [M - A * v, A - v * M + 3, M + A * v, M * (A + v)],
              correctAnswer: M * (A - v),
            }),
          a();
      }
      return (x, M) => (
        z(),
        Q('div', rc, [
          lc,
          cc,
          C('h1', uc, Ne(c.value[o.value].question), 1),
          C('div', fc, [
            C('h3', null, 'Question: ' + Ne(o.value + 1), 1),
            C('div', null, [C('h3', null, 'Questions correct: ' + Ne(i.value), 1), C('h3', null, 'Questions wrong: ' + Ne(r.value), 1)]),
          ]),
          C('div', ac, [
            (z(!0),
            Q(
              oe,
              null,
              Rt(
                c.value[o.value].answers,
                A => (
                  z(),
                  Q(
                    'div',
                    {
                      onClick: v => {
                        f(A), (t.value = A);
                      },
                      class: Ve(['d-flex justify-content-center align-items-center answerWrapper', d(A)]),
                    },
                    Ne(A),
                    11,
                    dc
                  )
                )
              ),
              256
            )),
          ]),
        ])
      );
    },
  });
const pc = Lt(hc, [['__scopeId', 'data-v-62d6e68c']]),
  wt = e => (Gs('data-v-e0e08e61'), (e = e()), Xs(), e),
  _c = wt(() => C('h1', null, 'Minesweeper', -1)),
  gc = wt(() => C('h4', null, 'PLACE FLAGS WITH RIGHT CLICK', -1)),
  mc = wt(() => C('div', { class: 'field' }, null, -1)),
  vc = wt(() =>
    C(
      'dialog',
      { class: 'start' },
      [
        C('p', null, 'Pick the Map Size!'),
        C('select', { name: 'map-größen', id: 'map-größen' }, [
          C('option', { value: 'small' }, 'Small'),
          C('option', { value: 'medium' }, 'Medium'),
          C('option', { value: 'large' }, 'Large'),
        ]),
        C('button', { class: 'pickSize', onclick: "document.querySelector('.start').close(); game() " }, 'Submit'),
      ],
      -1
    )
  ),
  bc = wt(() =>
    C(
      'dialog',
      { class: 'restartGame' },
      [
        C('p', null, 'YOU LOST'),
        C('button', { class: 'restart', onclick: "document.querySelector('.restartGame').close(); startGame()" }, 'Restart'),
      ],
      -1
    )
  ),
  yc = wt(() =>
    C(
      'dialog',
      { class: 'winText' },
      [C('p', null, 'YOU WON'), C('button', { class: 'newGame', onclick: "document.querySelector('dialog').close()" }, 'New Game')],
      -1
    )
  ),
  Cc = Xe({
    __name: 'Minesweeper',
    setup(e) {
      let t = [],
        s,
        n,
        o;
      function i() {
        A(), (t = []), r(), c(), a();
      }
      function r() {
        for (let p = 0; p < s; p++) {
          const y = [];
          for (let O = 0; O < n; O++) {
            const Y = { isBomb: !1, isFlag: !1, isOpen: !1 };
            y.push(Y);
          }
          t.push(y);
        }
      }
      function c() {
        for (let p = 0; p < s; p++) for (let y = 0; y < o; y++) t[p][Math.round(Math.random() * (n - 1))].isBomb = !0;
        (t[Math.floor(s / 2)][Math.floor(n / 2)].isBomb = !1),
          (t[Math.floor(s / 2)][Math.floor(n / 2 - 1)].isBomb = !1),
          (t[Math.floor(s / 2)][Math.floor(n / 2 + 1)].isBomb = !1),
          (t[Math.floor(s / 2 - 1)][Math.floor(n / 2)].isBomb = !1),
          (t[Math.floor(s / 2 - 1)][Math.floor(n / 2 - 1)].isBomb = !1),
          (t[Math.floor(s / 2 - 1)][Math.floor(n / 2 + 1)].isBomb = !1),
          (t[Math.floor(s / 2 + 1)][Math.floor(n / 2)].isBomb = !1),
          (t[Math.floor(s / 2 + 1)][Math.floor(n / 2 - 1)].isBomb = !1),
          (t[Math.floor(s / 2 + 1)][Math.floor(n / 2 + 1)].isBomb = !1);
      }
      function f(p, y) {
        var k, Y, D, W, ce, xe, ue, pe, ve, be, Ee, Te, J, K, N, ye;
        let O = 0;
        return (
          (Y = (k = t[p + 1]) == null ? void 0 : k[y]) != null && Y.isBomb && O++,
          (W = (D = t[p - 1]) == null ? void 0 : D[y]) != null && W.isBomb && O++,
          (xe = (ce = t[p]) == null ? void 0 : ce[y + 1]) != null && xe.isBomb && O++,
          (pe = (ue = t[p]) == null ? void 0 : ue[y - 1]) != null && pe.isBomb && O++,
          (be = (ve = t[p + 1]) == null ? void 0 : ve[y + 1]) != null && be.isBomb && O++,
          (Te = (Ee = t[p - 1]) == null ? void 0 : Ee[y + 1]) != null && Te.isBomb && O++,
          (K = (J = t[p - 1]) == null ? void 0 : J[y - 1]) != null && K.isBomb && O++,
          (ye = (N = t[p + 1]) == null ? void 0 : N[y - 1]) != null && ye.isBomb && O++,
          O
        );
      }
      function a() {
        const p = document.querySelector('.field');
        p !== null && (p.innerHTML = ''), p == null || p.setAttribute('style', `grid-template-columns: repeat(${s},1fr); width: ${50 * s}px;`);
        for (let y = 0; y < n; y++)
          for (let O = 0; O < s; O++) {
            const k = document.createElement('div');
            (k.className = 'tile'),
              O === Math.floor(s / 2) && y === Math.floor(n / 2) && k.setAttribute('isMiddle', 'middle'),
              (k.onclick = () => {
                d(O, y);
              }),
              (k.oncontextmenu = Y => {
                Y.preventDefault(), m(O, y);
              }),
              p == null || p.appendChild(k),
              t[O][y].isOpen
                ? (k.setAttribute('isOpen', 'open'),
                  t[O][y].isBomb
                    ? (k.innerHTML = '💣')
                    : ((k.innerHTML = `${f(O, y)}`),
                      f(O, y) === 0 &&
                        setTimeout(() => {
                          v(O, y);
                        }, 200)))
                : t[O][y].isOpen || (t[O][y].isFlag ? (k.innerHTML = '🚩') : (k.innerHTML = ''));
          }
      }
      function d(p, y) {
        t[p][y].isFlag || (t[p][y].isBomb ? x(p, y) : t[p][y].isOpen || ((t[p][y].isOpen = !0), a()), M());
      }
      function m(p, y) {
        t[p][y].isFlag ? (t[p][y].isFlag = !1) : (t[p][y].isFlag = !0), a();
      }
      function x(p, y) {
        if (t[p][y].isBomb) {
          i();
          const O = document.querySelector('dialog');
          O && O.showModal();
        }
      }
      function M() {
        t.every(p => p.every(y => y.isOpen || y.isBomb)) && (document.querySelector('.winText').showModal(), i());
      }
      function A() {
        const p = document.querySelector('select');
        p &&
          (p.value === 'small' ? ((s = 11), (n = 9), (o = 2)) : p.value === 'medium' ? ((s = 23), (n = 11), (o = 3)) : ((s = 37), (n = 15), (o = 5)));
      }
      function v(p, y) {
        var O, k, Y, D, W, ce, xe, ue, pe, ve, be, Ee, Te, J, K, N;
        ((k = (O = t[p + 0]) == null ? void 0 : O[y + 1]) != null && k.isOpen) || d(p, y + 1),
          ((D = (Y = t[p + 0]) == null ? void 0 : Y[y - 1]) != null && D.isOpen) || d(p, y - 1),
          ((ce = (W = t[p + 1]) == null ? void 0 : W[y + 1]) != null && ce.isOpen) || d(p + 1, y + 1),
          ((ue = (xe = t[p + 1]) == null ? void 0 : xe[y - 1]) != null && ue.isOpen) || d(p + 1, y - 1),
          ((ve = (pe = t[p - 1]) == null ? void 0 : pe[y + 1]) != null && ve.isOpen) || d(p - 1, y + 1),
          ((Ee = (be = t[p - 1]) == null ? void 0 : be[y - 1]) != null && Ee.isOpen) || d(p - 1, y - 1),
          ((J = (Te = t[p - 1]) == null ? void 0 : Te[y + 0]) != null && J.isOpen) || d(p - 1, y),
          ((N = (K = t[p + 1]) == null ? void 0 : K[y + 0]) != null && N.isOpen) || d(p + 1, y);
      }
      function P() {
        document.querySelector('.start').showModal();
      }
      return P(), (window.game = i), (window.startGame = P), (p, y) => (z(), Q(oe, null, [_c, gc, mc, vc, bc, yc], 64));
    },
  });
const Nn = Lt(Cc, [['__scopeId', 'data-v-e0e08e61']]),
  wc = { class: 'navbar navbar-expand-lg navbar-dark bg-dark' },
  xc = { class: 'container-fluid' },
  Ec = C('a', { class: 'navbar-brand', href: '#' }, 'Bullshit Games', -1),
  Tc = C(
    'button',
    {
      class: 'navbar-toggler',
      type: 'button',
      'data-bs-toggle': 'collapse',
      'data-bs-target': '#navbarNav',
      'aria-controls': 'navbarNav',
      'aria-expanded': 'false',
      'aria-label': 'Toggle navigation',
    },
    [C('span', { class: 'navbar-toggler-icon' })],
    -1
  ),
  Mc = { class: 'collapse navbar-collapse', id: 'navbarNav' },
  $c = { class: 'navbar-nav' },
  kc = { class: 'nav-item' },
  Oc = { class: 'nav-item' },
  Ac = { class: 'nav-item' },
  Ic = { class: 'nav-item' },
  Pc = { class: 'nav-item' },
  Fc = { class: 'nav-item' },
  Sc = { class: 'd-flex justify-content-center align-items-center' },
  Rc = { class: 'Game', style: { height: '90%' } },
  Bc = { key: 0 },
  jc = { key: 1 },
  Lc = { key: 2 },
  Nc = { key: 3 },
  Hc = { key: 4 },
  Uc = { key: 5 },
  Kc = { key: 6 },
  Dc = Xe({
    __name: 'App',
    setup(e) {
      return (t, s) => (
        z(),
        Q(
          oe,
          null,
          [
            C('nav', wc, [
              C('div', xc, [
                Ec,
                Tc,
                C('div', Mc, [
                  C('ul', $c, [
                    C('li', kc, [
                      C(
                        'a',
                        { class: 'nav-link active', 'aria-current': 'page', href: '#', onClick: s[0] || (s[0] = n => (he.value = 'Home')) },
                        'Home'
                      ),
                    ]),
                    C('li', Oc, [C('a', { class: 'nav-link', href: '#', onClick: s[1] || (s[1] = n => (he.value = 'TicTacToe')) }, 'TicTacToe')]),
                    C('li', Ac, [
                      C('a', { class: 'nav-link', href: '#', onClick: s[2] || (s[2] = n => (he.value = 'CookieClicker')) }, 'Cookie Clicker'),
                    ]),
                    C('li', Ic, [
                      C('a', { class: 'nav-link', href: '#', onClick: s[3] || (s[3] = n => (he.value = 'ConnectFour')) }, 'Connect Four'),
                    ]),
                    C('li', Pc, [C('a', { class: 'nav-link', href: '#', onClick: s[4] || (s[4] = n => (he.value = 'MathQuiz')) }, 'Math Quiz')]),
                    C('li', Fc, [C('a', { class: 'nav-link', href: '#', onClick: s[5] || (s[5] = n => (he.value = 'Minesweeper')) }, 'Minesweeper')]),
                  ]),
                ]),
              ]),
            ]),
            C('div', Sc, [
              C('div', Rc, [
                Be(he) === 'Home' ? (z(), Q('div', Bc, [ee(Cl)])) : je('', !0),
                Be(he) === 'Minesweeper' ? (z(), Q('div', jc, [ee(Nn)])) : je('', !0),
                Be(he) === 'MathQuiz' ? (z(), Q('div', Lc, [ee(pc)])) : je('', !0),
                Be(he) === 'ConnectFour' ? (z(), Q('div', Nc, [ee(Il)])) : je('', !0),
                Be(he) === 'CookieClicker' ? (z(), Q('div', Hc, [ee(Gl)])) : je('', !0),
                Be(he) === 'TicTacToe' ? (z(), Q('div', Uc, [ee(ic)])) : je('', !0),
                Be(he) === 'Minesweeper' ? (z(), Q('div', Kc, [ee(Nn)])) : je('', !0),
              ]),
            ]),
          ],
          64
        )
      );
    },
  });
fl(Dc).mount('#app');
