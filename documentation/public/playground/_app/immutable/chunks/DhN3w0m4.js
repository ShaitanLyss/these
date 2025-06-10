import { i as p, g as D, H, a as L, b as g, s as u, c as E, h as O, d as f, e as I, f as Y, j, k, l as x, m as C, n as M, o as S, p as m, q as V, r as $, t as q, u as P } from "./D-TuGdn3.js";
import { a as W, r as b, h as c, i as z, b as B, c as F } from "./BIiAUV6v.js";
function Q(t, e) {
  var r = e == null ? "" : typeof e == "object" ? e + "" : e;
  r !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = r, t.nodeValue = r + "");
}
function G(t, e) {
  return N(t, e);
}
function U(t, e) {
  p(), e.intro = e.intro ?? false;
  const r = e.target, _ = m, l = f;
  try {
    for (var a = D(r); a && (a.nodeType !== 8 || a.data !== H); ) a = L(a);
    if (!a) throw g;
    u(true), E(a), O();
    const o = N(t, { ...e, anchor: a });
    if (f === null || f.nodeType !== 8 || f.data !== I) throw Y(), g;
    return u(false), o;
  } catch (o) {
    if (o === g) return e.recover === false && j(), p(), k(r), u(false), G(t, e);
    throw o;
  } finally {
    u(_), E(l), B();
  }
}
const i = /* @__PURE__ */ new Map();
function N(t, { target: e, anchor: r, props: _ = {}, events: l, context: a, intro: o = true }) {
  p();
  var h = /* @__PURE__ */ new Set(), v = (d) => {
    for (var s = 0; s < d.length; s++) {
      var n = d[s];
      if (!h.has(n)) {
        h.add(n);
        var R = z(n);
        e.addEventListener(n, c, { passive: R });
        var T = i.get(n);
        T === void 0 ? (document.addEventListener(n, c, { passive: R }), i.set(n, 1)) : i.set(n, T + 1);
      }
    }
  };
  v(x(W)), b.add(v);
  var y = void 0, A = C(() => {
    var d = r ?? e.appendChild(M());
    return S(() => {
      if (a) {
        V({});
        var s = $;
        s.c = a;
      }
      l && (_.$$events = l), m && F(d, null), y = t(d, _) || {}, m && (q.nodes_end = f), a && P();
    }), () => {
      var _a;
      for (var s of h) {
        e.removeEventListener(s, c);
        var n = i.get(s);
        --n === 0 ? (document.removeEventListener(s, c), i.delete(s)) : i.set(s, n);
      }
      b.delete(v), d !== r && ((_a = d.parentNode) == null ? void 0 : _a.removeChild(d));
    };
  });
  return w.set(y, A), y;
}
let w = /* @__PURE__ */ new WeakMap();
function X(t, e) {
  const r = w.get(t);
  return r ? (w.delete(t), r(e)) : Promise.resolve();
}
export {
  U as h,
  G as m,
  Q as s,
  X as u
};
