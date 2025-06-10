var ue = Array.isArray, oe = Array.prototype.indexOf, Je = Array.from, We = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, _e = Object.getOwnPropertyDescriptors, ce = Object.prototype, ve = Array.prototype, St = Object.getPrototypeOf, Rt = Object.isExtensible;
function Xe(t) {
  return typeof t == "function";
}
const Qe = () => {
};
function tn(t) {
  return t();
}
function Ct(t) {
  for (var e = 0; e < t.length; e++) t[e]();
}
const x = 2, Pt = 4, st = 8, yt = 16, O = 32, U = 64, wt = 128, g = 256, nt = 512, y = 1024, D = 2048, S = 4096, H = 8192, Et = 16384, Ft = 32768, Mt = 65536, en = 1 << 17, de = 1 << 19, Lt = 1 << 20, vt = 1 << 21, P = Symbol("$state"), nn = Symbol("legacy props"), rn = Symbol("");
function qt(t) {
  return t === this.v;
}
function pe(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function jt(t) {
  return !pe(t, this.v);
}
function he(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function ye() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function we(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Ee() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function an() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function ln(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function ge() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function me() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Te() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let it = false;
function sn() {
  it = true;
}
const fn = 1, un = 2, on = 4, _n = 8, cn = 16, vn = 1, dn = 2, pn = 4, hn = 8, yn = 16, wn = 1, En = 2, xe = "[", Ae = "[!", be = "]", gt = {}, w = Symbol(), gn = "http://www.w3.org/1999/xhtml", mn = "@attach";
function Ie(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let p = null;
function Dt(t) {
  p = t;
}
function Tn(t) {
  return Yt().get(t);
}
function xn(t, e) {
  return Yt().set(t, e), e;
}
function An(t, e = false, n) {
  var r = p = { p, c: null, d: false, e: null, m: false, s: t, x: null, l: null };
  it && !e && (p.l = { s: null, u: null, r1: [], r2: Tt(false) }), Ce(() => {
    r.d = true;
  });
}
function bn(t) {
  const e = p;
  if (e !== null) {
    const f = e.e;
    if (f !== null) {
      var n = d, r = v;
      e.e = null;
      try {
        for (var a = 0; a < f.length; a++) {
          var l = f[a];
          rt(l.effect), B(l.reaction), Zt(l.fn);
        }
      } finally {
        rt(n), B(r);
      }
    }
    p = e.p, e.m = true;
  }
  return {};
}
function ft() {
  return !it || p !== null && p.l === null;
}
function Yt(t) {
  return p === null && Ie(), p.c ?? (p.c = new Map(Re(p) || void 0));
}
function Re(t) {
  let e = t.p;
  for (; e !== null; ) {
    const n = e.c;
    if (n !== null) return n;
    e = e.p;
  }
  return null;
}
function j(t) {
  if (typeof t != "object" || t === null || P in t) return t;
  const e = St(t);
  if (e !== ce && e !== ve) return t;
  var n = /* @__PURE__ */ new Map(), r = ue(t), a = k(0), l = v, f = (u) => {
    var s = v;
    B(l);
    var i = u();
    return B(s), i;
  };
  return r && n.set("length", k(t.length)), new Proxy(t, { defineProperty(u, s, i) {
    (!("value" in i) || i.configurable === false || i.enumerable === false || i.writable === false) && ge();
    var _ = n.get(s);
    return _ === void 0 ? (_ = f(() => k(i.value)), n.set(s, _)) : I(_, f(() => j(i.value))), true;
  }, deleteProperty(u, s) {
    var i = n.get(s);
    if (i === void 0) s in u && (n.set(s, f(() => k(w))), ct(a));
    else {
      if (r && typeof s == "string") {
        var _ = n.get("length"), o = Number(s);
        Number.isInteger(o) && o < _.v && I(_, o);
      }
      I(i, w), ct(a);
    }
    return true;
  }, get(u, s, i) {
    var _a;
    if (s === P) return t;
    var _ = n.get(s), o = s in u;
    if (_ === void 0 && (!o || ((_a = $(u, s)) == null ? void 0 : _a.writable)) && (_ = f(() => k(j(o ? u[s] : w))), n.set(s, _)), _ !== void 0) {
      var c = Y(_);
      return c === w ? void 0 : c;
    }
    return Reflect.get(u, s, i);
  }, getOwnPropertyDescriptor(u, s) {
    var i = Reflect.getOwnPropertyDescriptor(u, s);
    if (i && "value" in i) {
      var _ = n.get(s);
      _ && (i.value = Y(_));
    } else if (i === void 0) {
      var o = n.get(s), c = o == null ? void 0 : o.v;
      if (o !== void 0 && c !== w) return { enumerable: true, configurable: true, value: c, writable: true };
    }
    return i;
  }, has(u, s) {
    var _a;
    if (s === P) return true;
    var i = n.get(s), _ = i !== void 0 && i.v !== w || Reflect.has(u, s);
    if (i !== void 0 || d !== null && (!_ || ((_a = $(u, s)) == null ? void 0 : _a.writable))) {
      i === void 0 && (i = f(() => k(_ ? j(u[s]) : w)), n.set(s, i));
      var o = Y(i);
      if (o === w) return false;
    }
    return _;
  }, set(u, s, i, _) {
    var _a;
    var o = n.get(s), c = s in u;
    if (r && s === "length") for (var C = i; C < o.v; C += 1) {
      var et = n.get(C + "");
      et !== void 0 ? I(et, w) : C in u && (et = f(() => k(w)), n.set(C + "", et));
    }
    o === void 0 ? (!c || ((_a = $(u, s)) == null ? void 0 : _a.writable)) && (o = f(() => k(void 0)), I(o, f(() => j(i))), n.set(s, o)) : (c = o.v !== w, I(o, f(() => j(i))));
    var bt = Reflect.getOwnPropertyDescriptor(u, s);
    if ((bt == null ? void 0 : bt.set) && bt.set.call(_, i), !c) {
      if (r && typeof s == "string") {
        var It = n.get("length"), _t = Number(s);
        Number.isInteger(_t) && _t >= It.v && I(It, _t + 1);
      }
      ct(a);
    }
    return true;
  }, ownKeys(u) {
    Y(a);
    var s = Reflect.ownKeys(u).filter((o) => {
      var c = n.get(o);
      return c === void 0 || c.v !== w;
    });
    for (var [i, _] of n) _.v !== w && !(i in u) && s.push(i);
    return s;
  }, setPrototypeOf() {
    me();
  } });
}
function ct(t, e = 1) {
  I(t, t.v + e);
}
function Ot(t) {
  try {
    if (t !== null && typeof t == "object" && P in t) return t[P];
  } catch {
  }
  return t;
}
function In(t, e) {
  return Object.is(Ot(t), Ot(e));
}
function mt(t) {
  var e = x | D, n = v !== null && (v.f & x) !== 0 ? v : null;
  return d === null || n !== null && (n.f & g) !== 0 ? e |= g : d.f |= Lt, { ctx: p, deps: null, effects: null, equals: qt, f: e, fn: t, reactions: null, rv: 0, v: null, wv: 0, parent: n ?? d };
}
function Rn(t) {
  const e = mt(t);
  return re(e), e;
}
function Dn(t) {
  const e = mt(t);
  return e.equals = jt, e;
}
function Ht(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1) L(e[n]);
  }
}
function De(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & x) === 0) return e;
    e = e.parent;
  }
  return null;
}
function Bt(t) {
  var e, n = d;
  rt(De(t));
  try {
    Ht(t), e = ie(t);
  } finally {
    rt(n);
  }
  return e;
}
function Ut(t) {
  var e = Bt(t);
  if (t.equals(e) || (t.v = e, t.wv = le()), !G) {
    var n = (N || (t.f & g) !== 0) && t.deps !== null ? S : y;
    T(t, n);
  }
}
const z = /* @__PURE__ */ new Map();
function Tt(t, e) {
  var n = { f: 0, v: t, reactions: null, equals: qt, rv: 0, wv: 0 };
  return n;
}
function k(t, e) {
  const n = Tt(t);
  return re(n), n;
}
function On(t, e = false) {
  var _a;
  const n = Tt(t);
  return e || (n.equals = jt), it && p !== null && p.l !== null && ((_a = p.l).s ?? (_a.s = [])).push(n), n;
}
function I(t, e, n = false) {
  v !== null && !b && ft() && (v.f & (x | yt)) !== 0 && !(R == null ? void 0 : R.includes(t)) && Te();
  let r = n ? j(e) : e;
  return Oe(t, r);
}
function Oe(t, e) {
  if (!t.equals(e)) {
    var n = t.v;
    G ? z.set(t, e) : z.set(t, n), t.v = e, (t.f & x) !== 0 && ((t.f & D) !== 0 && Bt(t), T(t, (t.f & g) === 0 ? y : S)), t.wv = le(), Vt(t, D), ft() && d !== null && (d.f & y) !== 0 && (d.f & (O | U)) === 0 && (m === null ? Be([t]) : m.push(t));
  }
  return e;
}
function Vt(t, e) {
  var n = t.reactions;
  if (n !== null) for (var r = ft(), a = n.length, l = 0; l < a; l++) {
    var f = n[l], u = f.f;
    (u & D) === 0 && (!r && f === d || (T(f, e), (u & (y | g)) !== 0 && ((u & x) !== 0 ? Vt(f, S) : ot(f))));
  }
}
function xt(t) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function kn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let M = false;
function Nn(t) {
  M = t;
}
let A;
function J(t) {
  if (t === null) throw xt(), gt;
  return A = t;
}
function Sn() {
  return J(q(A));
}
function Cn(t) {
  if (M) {
    if (q(A) !== null) throw xt(), gt;
    A = t;
  }
}
function Pn(t = 1) {
  if (M) {
    for (var e = t, n = A; e--; ) n = q(n);
    A = n;
  }
}
function Fn() {
  for (var t = 0, e = A; ; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === be) {
        if (t === 0) return e;
        t -= 1;
      } else (n === xe || n === Ae) && (t += 1);
    }
    var r = q(e);
    e.remove(), e = r;
  }
}
function Mn(t) {
  if (!t || t.nodeType !== 8) throw xt(), gt;
  return t.data;
}
var kt, ke, Ne, Gt, Kt;
function Ln() {
  if (kt === void 0) {
    kt = window, ke = document, Ne = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    Gt = $(e, "firstChild").get, Kt = $(e, "nextSibling").get, Rt(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), Rt(n) && (n.__t = void 0);
  }
}
function dt(t = "") {
  return document.createTextNode(t);
}
function pt(t) {
  return Gt.call(t);
}
function q(t) {
  return Kt.call(t);
}
function qn(t, e) {
  if (!M) return pt(t);
  var n = pt(A);
  if (n === null) n = A.appendChild(dt());
  else if (e && n.nodeType !== 3) {
    var r = dt();
    return n == null ? void 0 : n.before(r), J(r), r;
  }
  return J(n), n;
}
function jn(t, e) {
  if (!M) {
    var n = pt(t);
    return n instanceof Comment && n.data === "" ? q(n) : n;
  }
  return A;
}
function Yn(t, e = 1, n = false) {
  let r = M ? A : t;
  for (var a; e--; ) a = r, r = q(r);
  if (!M) return r;
  var l = r == null ? void 0 : r.nodeType;
  if (n && l !== 3) {
    var f = dt();
    return r === null ? a == null ? void 0 : a.after(f) : r.before(f), J(f), f;
  }
  return J(r), r;
}
function Hn(t) {
  t.textContent = "";
}
function $t(t) {
  d === null && v === null && we(), v !== null && (v.f & g) !== 0 && d === null && ye(), G && he();
}
function Se(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function V(t, e, n, r = true) {
  var a = d, l = { ctx: p, deps: null, nodes_start: null, nodes_end: null, f: t | D, first: null, fn: e, last: null, next: null, parent: a, prev: null, teardown: null, transitions: null, wv: 0 };
  if (n) try {
    ut(l), l.f |= Ft;
  } catch (s) {
    throw L(l), s;
  }
  else e !== null && ot(l);
  var f = n && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & (Lt | wt)) === 0;
  if (!f && r && (a !== null && Se(l, a), v !== null && (v.f & x) !== 0)) {
    var u = v;
    (u.effects ?? (u.effects = [])).push(l);
  }
  return l;
}
function Ce(t) {
  const e = V(st, null, false);
  return T(e, y), e.teardown = t, e;
}
function Bn(t) {
  $t();
  var e = d !== null && (d.f & O) !== 0 && p !== null && !p.m;
  if (e) {
    var n = p;
    (n.e ?? (n.e = [])).push({ fn: t, effect: d, reaction: v });
  } else {
    var r = Zt(t);
    return r;
  }
}
function Un(t) {
  return $t(), At(t);
}
function Vn(t) {
  const e = V(U, t, true);
  return (n = {}) => new Promise((r) => {
    n.outro ? Le(e, () => {
      L(e), r(void 0);
    }) : (L(e), r(void 0));
  });
}
function Zt(t) {
  return V(Pt, t, false);
}
function Gn(t, e) {
  var n = p, r = { effect: null, ran: false };
  n.l.r1.push(r), r.effect = At(() => {
    t(), !r.ran && (r.ran = true, I(n.l.r2, true), Ze(e));
  });
}
function Kn() {
  var t = p;
  At(() => {
    if (Y(t.l.r2)) {
      for (var e of t.l.r1) {
        var n = e.effect;
        (n.f & y) !== 0 && T(n, S), K(n) && ut(n), e.ran = false;
      }
      t.l.r2.v = false;
    }
  });
}
function At(t) {
  return V(st, t, true);
}
function $n(t, e = [], n = mt) {
  const r = e.map(n);
  return Pe(() => t(...r.map(Y)));
}
function Pe(t, e = 0) {
  return V(st | yt | e, t, true);
}
function Zn(t, e = true) {
  return V(st | O, t, true, e);
}
function zt(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = G, r = v;
    Nt(true), B(null);
    try {
      e.call(null);
    } finally {
      Nt(n), B(r);
    }
  }
}
function Jt(t, e = false) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    var r = n.next;
    (n.f & U) !== 0 ? n.parent = null : L(n, e), n = r;
  }
}
function Fe(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & O) === 0 && L(e), e = n;
  }
}
function L(t, e = true) {
  var n = false;
  (e || (t.f & de) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (Me(t.nodes_start, t.nodes_end), n = true), Jt(t, e && !n), lt(t, 0), T(t, Et);
  var r = t.transitions;
  if (r !== null) for (const l of r) l.stop();
  zt(t);
  var a = t.parent;
  a !== null && a.first !== null && Wt(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Me(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : q(t);
    t.remove(), t = n;
  }
}
function Wt(t) {
  var e = t.parent, n = t.prev, r = t.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), e !== null && (e.first === t && (e.first = r), e.last === t && (e.last = n));
}
function Le(t, e) {
  var n = [];
  Xt(t, n, true), qe(n, () => {
    L(t), e && e();
  });
}
function qe(t, e) {
  var n = t.length;
  if (n > 0) {
    var r = () => --n || e();
    for (var a of t) a.out(r);
  } else e();
}
function Xt(t, e, n) {
  if ((t.f & H) === 0) {
    if (t.f ^= H, t.transitions !== null) for (const f of t.transitions) (f.is_global || n) && e.push(f);
    for (var r = t.first; r !== null; ) {
      var a = r.next, l = (r.f & Mt) !== 0 || (r.f & O) !== 0;
      Xt(r, e, l ? n : false), r = a;
    }
  }
}
function zn(t) {
  Qt(t, true);
}
function Qt(t, e) {
  if ((t.f & H) !== 0) {
    t.f ^= H, (t.f & y) === 0 && (t.f ^= y), K(t) && (T(t, D), ot(t));
    for (var n = t.first; n !== null; ) {
      var r = n.next, a = (n.f & Mt) !== 0 || (n.f & O) !== 0;
      Qt(n, a ? e : false), n = r;
    }
    if (t.transitions !== null) for (const l of t.transitions) (l.is_global || e) && l.in();
  }
}
const je = typeof requestIdleCallback > "u" ? (t) => setTimeout(t, 1) : requestIdleCallback;
let W = [], X = [];
function te() {
  var t = W;
  W = [], Ct(t);
}
function ee() {
  var t = X;
  X = [], Ct(t);
}
function Jn(t) {
  W.length === 0 && queueMicrotask(te), W.push(t);
}
function Wn(t) {
  X.length === 0 && je(ee), X.push(t);
}
function Ye() {
  W.length > 0 && te(), X.length > 0 && ee();
}
function He(t) {
  var e = d;
  if ((e.f & Ft) === 0) {
    if ((e.f & wt) === 0) throw t;
    e.fn(t);
  } else ne(t, e);
}
function ne(t, e) {
  for (; e !== null; ) {
    if ((e.f & wt) !== 0) try {
      e.fn(t);
      return;
    } catch {
    }
    e = e.parent;
  }
  throw t;
}
let Q = false, tt = null, F = false, G = false;
function Nt(t) {
  G = t;
}
let Z = [];
let v = null, b = false;
function B(t) {
  v = t;
}
let d = null;
function rt(t) {
  d = t;
}
let R = null;
function re(t) {
  v !== null && v.f & vt && (R === null ? R = [t] : R.push(t));
}
let h = null, E = 0, m = null;
function Be(t) {
  m = t;
}
let ae = 1, at = 0, N = false;
function le() {
  return ++ae;
}
function K(t) {
  var _a;
  var e = t.f;
  if ((e & D) !== 0) return true;
  if ((e & S) !== 0) {
    var n = t.deps, r = (e & g) !== 0;
    if (n !== null) {
      var a, l, f = (e & nt) !== 0, u = r && d !== null && !N, s = n.length;
      if (f || u) {
        var i = t, _ = i.parent;
        for (a = 0; a < s; a++) l = n[a], (f || !((_a = l == null ? void 0 : l.reactions) == null ? void 0 : _a.includes(i))) && (l.reactions ?? (l.reactions = [])).push(i);
        f && (i.f ^= nt), u && _ !== null && (_.f & g) === 0 && (i.f ^= g);
      }
      for (a = 0; a < s; a++) if (l = n[a], K(l) && Ut(l), l.wv > t.wv) return true;
    }
    (!r || d !== null && !N) && T(t, y);
  }
  return false;
}
function se(t, e, n = true) {
  var r = t.reactions;
  if (r !== null) for (var a = 0; a < r.length; a++) {
    var l = r[a];
    (R == null ? void 0 : R.includes(t)) || ((l.f & x) !== 0 ? se(l, e, false) : e === l && (n ? T(l, D) : (l.f & y) !== 0 && T(l, S), ot(l)));
  }
}
function ie(t) {
  var _a;
  var e = h, n = E, r = m, a = v, l = N, f = R, u = p, s = b, i = t.f;
  h = null, E = 0, m = null, N = (i & g) !== 0 && (b || !F || v === null), v = (i & (O | U)) === 0 ? t : null, R = null, Dt(t.ctx), b = false, at++, t.f |= vt;
  try {
    var _ = (0, t.fn)(), o = t.deps;
    if (h !== null) {
      var c;
      if (lt(t, E), o !== null && E > 0) for (o.length = E + h.length, c = 0; c < h.length; c++) o[E + c] = h[c];
      else t.deps = o = h;
      if (!N) for (c = E; c < o.length; c++) ((_a = o[c]).reactions ?? (_a.reactions = [])).push(t);
    } else o !== null && E < o.length && (lt(t, E), o.length = E);
    if (ft() && m !== null && !b && o !== null && (t.f & (x | S | D)) === 0) for (c = 0; c < m.length; c++) se(m[c], t);
    return a !== null && a !== t && (at++, m !== null && (r === null ? r = m : r.push(...m))), _;
  } catch (C) {
    He(C);
  } finally {
    h = e, E = n, m = r, v = a, N = l, R = f, Dt(u), b = s, t.f ^= vt;
  }
}
function Ue(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var r = oe.call(n, t);
    if (r !== -1) {
      var a = n.length - 1;
      a === 0 ? n = e.reactions = null : (n[r] = n[a], n.pop());
    }
  }
  n === null && (e.f & x) !== 0 && (h === null || !h.includes(e)) && (T(e, S), (e.f & (g | nt)) === 0 && (e.f ^= nt), Ht(e), lt(e, 0));
}
function lt(t, e) {
  var n = t.deps;
  if (n !== null) for (var r = e; r < n.length; r++) Ue(t, n[r]);
}
function ut(t) {
  var e = t.f;
  if ((e & Et) === 0) {
    T(t, y);
    var n = d, r = F;
    d = t, F = true;
    try {
      (e & yt) !== 0 ? Fe(t) : Jt(t), zt(t);
      var a = ie(t);
      t.teardown = typeof a == "function" ? a : null, t.wv = ae;
      var l = t.deps, f;
    } finally {
      F = r, d = n;
    }
  }
}
function Ve() {
  try {
    Ee();
  } catch (t) {
    if (tt !== null) ne(t, tt);
    else throw t;
  }
}
function fe() {
  var t = F;
  try {
    var e = 0;
    for (F = true; Z.length > 0; ) {
      e++ > 1e3 && Ve();
      var n = Z, r = n.length;
      Z = [];
      for (var a = 0; a < r; a++) {
        var l = Ke(n[a]);
        Ge(l);
      }
      z.clear();
    }
  } finally {
    Q = false, F = t, tt = null;
  }
}
function Ge(t) {
  var e = t.length;
  if (e !== 0) for (var n = 0; n < e; n++) {
    var r = t[n];
    (r.f & (Et | H)) === 0 && K(r) && (ut(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Wt(r) : r.fn = null));
  }
}
function ot(t) {
  Q || (Q = true, queueMicrotask(fe));
  for (var e = tt = t; e.parent !== null; ) {
    e = e.parent;
    var n = e.f;
    if ((n & (U | O)) !== 0) {
      if ((n & y) === 0) return;
      e.f ^= y;
    }
  }
  Z.push(e);
}
function Ke(t) {
  for (var e = [], n = t; n !== null; ) {
    var r = n.f, a = (r & (O | U)) !== 0, l = a && (r & y) !== 0;
    if (!l && (r & H) === 0) {
      (r & Pt) !== 0 ? e.push(n) : a ? n.f ^= y : K(n) && ut(n);
      var f = n.first;
      if (f !== null) {
        n = f;
        continue;
      }
    }
    var u = n.parent;
    for (n = n.next; n === null && u !== null; ) n = u.next, u = u.parent;
  }
  return e;
}
function $e(t) {
  for (var e; ; ) {
    if (Ye(), Z.length === 0) return Q = false, tt = null, e;
    Q = true, fe();
  }
}
async function Xn() {
  await Promise.resolve(), $e();
}
function Y(t) {
  var e = t.f, n = (e & x) !== 0;
  if (v !== null && !b) {
    if (!(R == null ? void 0 : R.includes(t))) {
      var r = v.deps;
      t.rv < at && (t.rv = at, h === null && r !== null && r[E] === t ? E++ : h === null ? h = [t] : (!N || !h.includes(t)) && h.push(t));
    }
  } else if (n && t.deps === null && t.effects === null) {
    var a = t, l = a.parent;
    l !== null && (l.f & g) === 0 && (a.f ^= g);
  }
  return n && (a = t, K(a) && Ut(a)), G && z.has(t) ? z.get(t) : t.v;
}
function Ze(t) {
  var e = b;
  try {
    return b = true, t();
  } finally {
    b = e;
  }
}
const ze = -7169;
function T(t, e) {
  t.f = t.f & ze | e;
}
function Qn(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (P in t) ht(t);
    else if (!Array.isArray(t)) for (let e in t) {
      const n = t[e];
      typeof n == "object" && n && P in n && ht(n);
    }
  }
}
function ht(t, e = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && !(t instanceof EventTarget) && !e.has(t)) {
    e.add(t), t instanceof Date && t.getTime();
    for (let r in t) try {
      ht(t[r], e);
    } catch {
    }
    const n = St(t);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = _e(n);
      for (let a in r) {
        const l = r[a].get;
        if (l) try {
          l.call(t);
        } catch {
        }
      }
    }
  }
}
export {
  en as $,
  Un as A,
  Ct as B,
  tn as C,
  Y as D,
  Qn as E,
  mt as F,
  sn as G,
  xe as H,
  jn as I,
  $n as J,
  qn as K,
  Cn as L,
  Yn as M,
  Pe as N,
  Mt as O,
  Mn as P,
  Ae as Q,
  Fn as R,
  zn as S,
  Le as T,
  w as U,
  Zt as V,
  At as W,
  Jn as X,
  P as Y,
  $ as Z,
  ln as _,
  q as a,
  Dn as a0,
  pn as a1,
  jt as a2,
  j as a3,
  I as a4,
  hn as a5,
  nn as a6,
  dn as a7,
  On as a8,
  vn as a9,
  gn as aA,
  St as aB,
  _e as aC,
  mn as aD,
  B as aE,
  rt as aF,
  v as aG,
  de as aH,
  Ne as aI,
  wn as aJ,
  En as aK,
  Me as aL,
  Gn as aM,
  Kn as aN,
  Tn as aO,
  pe as aP,
  yn as aa,
  Xe as ab,
  Qe as ac,
  L as ad,
  xn as ae,
  k as af,
  ke as ag,
  Rn as ah,
  Pn as ai,
  $e as aj,
  We as ak,
  Xn as al,
  Tt as am,
  H as an,
  un as ao,
  Oe as ap,
  Xt as aq,
  qe as ar,
  fn as as,
  cn as at,
  on as au,
  _n as av,
  kn as aw,
  In as ax,
  rn as ay,
  Wn as az,
  gt as b,
  J as c,
  A as d,
  be as e,
  xt as f,
  pt as g,
  Sn as h,
  Ln as i,
  an as j,
  Hn as k,
  Je as l,
  Vn as m,
  dt as n,
  Zn as o,
  M as p,
  An as q,
  p as r,
  Nn as s,
  d as t,
  bn as u,
  Ie as v,
  Bn as w,
  ue as x,
  it as y,
  Ze as z
};
