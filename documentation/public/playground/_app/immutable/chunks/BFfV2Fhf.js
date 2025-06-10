import { p as S, h as _r, N as K, D as z, a0 as hr, P as pr, Q as gr, R as Q, c as q, s as y, d as O, e as Ar, S as ir, o as P, T as br, l as ar, x as fr, a8 as Er, am as j, an as Y, t as J, ao as X, ap as W, aq as Tr, k as Sr, ar as Nr, ad as H, as as G, at as Ir, a as Cr, g as wr, n as Lr, au as tr, X as Or, av as Mr, V as sr, z as kr, aw as yr, ax as Rr, ay as Hr, az as Dr, aA as Pr, aB as $r, aC as Vr, F as qr, aD as Yr } from "./D-TuGdn3.js";
import { j as Br, k as Ur, m as zr, n as Fr, o as Kr, p as Xr, q as Gr } from "./BIiAUV6v.js";
function le(r, e) {
  return e;
}
function Qr(r, e, i, a) {
  for (var f = [], t = e.length, l = 0; l < t; l++) Tr(e[l].e, f, true);
  var v = t > 0 && f.length === 0 && i !== null;
  if (v) {
    var g = i.parentNode;
    Sr(g), g.append(i), a.clear(), w(r, e[0].prev, e[t - 1].next);
  }
  Nr(f, () => {
    for (var d = 0; d < t; d++) {
      var h = e[d];
      v || (a.delete(h.k), w(r, h.prev, h.next)), H(h.e, !v);
    }
  });
}
function ne(r, e, i, a, f, t = null) {
  var l = r, v = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, g = (e & tr) !== 0;
  if (g) {
    var d = r;
    l = S ? q(wr(d)) : d.appendChild(Lr());
  }
  S && _r();
  var h = null, p = false, u = hr(() => {
    var _ = i();
    return fr(_) ? _ : _ == null ? [] : ar(_);
  });
  K(() => {
    var _ = z(u), n = _.length;
    if (p && n === 0) return;
    p = n === 0;
    let T = false;
    if (S) {
      var E = pr(l) === gr;
      E !== (n === 0) && (l = Q(), q(l), y(false), T = true);
    }
    if (S) {
      for (var A = null, N, c = 0; c < n; c++) {
        if (O.nodeType === 8 && O.data === Ar) {
          l = O, T = true, y(false);
          break;
        }
        var s = _[c], o = a(s, c);
        N = ur(O, v, A, null, s, o, c, f, e, i), v.items.set(o, N), A = N;
      }
      n > 0 && q(Q());
    }
    S || jr(_, v, l, f, e, a, i), t !== null && (n === 0 ? h ? ir(h) : h = P(() => t(l)) : h !== null && br(h, () => {
      h = null;
    })), T && y(true), z(u);
  }), S && (l = O);
}
function jr(r, e, i, a, f, t, l) {
  var _a, _b, _c, _d;
  var v = (f & Mr) !== 0, g = (f & (G | X)) !== 0, d = r.length, h = e.items, p = e.first, u = p, _, n = null, T, E = [], A = [], N, c, s, o;
  if (v) for (o = 0; o < d; o += 1) N = r[o], c = t(N, o), s = h.get(c), s !== void 0 && ((_a = s.a) == null ? void 0 : _a.measure(), (T ?? (T = /* @__PURE__ */ new Set())).add(s));
  for (o = 0; o < d; o += 1) {
    if (N = r[o], c = t(N, o), s = h.get(c), s === void 0) {
      var C = u ? u.e.nodes_start : i;
      n = ur(C, e, n, n === null ? e.first : n.next, N, c, o, a, f, l), h.set(c, n), E = [], A = [], u = n.next;
      continue;
    }
    if (g && Jr(s, N, o, f), (s.e.f & Y) !== 0 && (ir(s.e), v && ((_b = s.a) == null ? void 0 : _b.unfix(), (T ?? (T = /* @__PURE__ */ new Set())).delete(s))), s !== u) {
      if (_ !== void 0 && _.has(s)) {
        if (E.length < A.length) {
          var b = A[0], I;
          n = b.prev;
          var R = E[0], $ = E[E.length - 1];
          for (I = 0; I < E.length; I += 1) Z(E[I], b, i);
          for (I = 0; I < A.length; I += 1) _.delete(A[I]);
          w(e, R.prev, $.next), w(e, n, R), w(e, $, b), u = b, n = $, o -= 1, E = [], A = [];
        } else _.delete(s), Z(s, u, i), w(e, s.prev, s.next), w(e, s, n === null ? e.first : n.next), w(e, n, s), n = s;
        continue;
      }
      for (E = [], A = []; u !== null && u.k !== c; ) (u.e.f & Y) === 0 && (_ ?? (_ = /* @__PURE__ */ new Set())).add(u), A.push(u), u = u.next;
      if (u === null) continue;
      s = u;
    }
    E.push(s), n = s, u = s.next;
  }
  if (u !== null || _ !== void 0) {
    for (var L = _ === void 0 ? [] : ar(_); u !== null; ) (u.e.f & Y) === 0 && L.push(u), u = u.next;
    var V = L.length;
    if (V > 0) {
      var dr = (f & tr) !== 0 && d === 0 ? i : null;
      if (v) {
        for (o = 0; o < V; o += 1) (_c = L[o].a) == null ? void 0 : _c.measure();
        for (o = 0; o < V; o += 1) (_d = L[o].a) == null ? void 0 : _d.fix();
      }
      Qr(e, L, dr, h);
    }
  }
  v && Or(() => {
    var _a2;
    if (T !== void 0) for (s of T) (_a2 = s.a) == null ? void 0 : _a2.apply();
  }), J.first = e.first && e.first.e, J.last = n && n.e;
}
function Jr(r, e, i, a) {
  (a & G) !== 0 && W(r.v, e), (a & X) !== 0 ? W(r.i, i) : r.i = i;
}
function ur(r, e, i, a, f, t, l, v, g, d) {
  var h = (g & G) !== 0, p = (g & Ir) === 0, u = h ? p ? Er(f) : j(f) : f, _ = (g & X) === 0 ? l : j(l), n = { i: _, v: u, k: t, a: null, e: null, prev: i, next: a };
  try {
    return n.e = P(() => v(r, u, _, d), S), n.e.prev = i && i.e, n.e.next = a && a.e, i === null ? e.first = n : (i.next = n, i.e.next = n.e), a !== null && (a.prev = n, a.e.prev = n.e), n;
  } finally {
  }
}
function Z(r, e, i) {
  for (var a = r.next ? r.next.e.nodes_start : i, f = e ? e.e.nodes_start : i, t = r.e.nodes_start; t !== a; ) {
    var l = Cr(t);
    f.before(t), t = l;
  }
}
function w(r, e, i) {
  e === null ? r.first = i : (e.next = i, e.e.next = i && i.e), i !== null && (i.prev = e, i.e.prev = e && e.e);
}
function Wr(r, e) {
  var i = void 0, a;
  K(() => {
    i !== (i = e()) && (a && (H(a), a = null), i && (a = P(() => {
      sr(() => i(r));
    })));
  });
}
function lr(r) {
  var e, i, a = "";
  if (typeof r == "string" || typeof r == "number") a += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var f = r.length;
    for (e = 0; e < f; e++) r[e] && (i = lr(r[e])) && (a && (a += " "), a += i);
  } else for (i in r) r[i] && (a && (a += " "), a += i);
  return a;
}
function Zr() {
  for (var r, e, i = 0, a = "", f = arguments.length; i < f; i++) (r = arguments[i]) && (e = lr(r)) && (a && (a += " "), a += e);
  return a;
}
function mr(r) {
  return typeof r == "object" ? Zr(r) : r ?? "";
}
const m = [...` 	
\r\f\xA0\v\uFEFF`];
function xr(r, e, i) {
  var a = r == null ? "" : "" + r;
  if (e && (a = a ? a + " " + e : e), i) {
    for (var f in i) if (i[f]) a = a ? a + " " + f : f;
    else if (a.length) for (var t = f.length, l = 0; (l = a.indexOf(f, l)) >= 0; ) {
      var v = l + t;
      (l === 0 || m.includes(a[l - 1])) && (v === a.length || m.includes(a[v])) ? a = (l === 0 ? "" : a.substring(0, l)) + a.substring(v + 1) : l = v;
    }
  }
  return a === "" ? null : a;
}
function x(r, e = false) {
  var i = e ? " !important;" : ";", a = "";
  for (var f in r) {
    var t = r[f];
    t != null && t !== "" && (a += " " + f + ": " + t + i);
  }
  return a;
}
function B(r) {
  return r[0] !== "-" || r[1] !== "-" ? r.toLowerCase() : r;
}
function re(r, e) {
  if (e) {
    var i = "", a, f;
    if (Array.isArray(e) ? (a = e[0], f = e[1]) : a = e, r) {
      r = String(r).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var t = false, l = 0, v = false, g = [];
      a && g.push(...Object.keys(a).map(B)), f && g.push(...Object.keys(f).map(B));
      var d = 0, h = -1;
      const T = r.length;
      for (var p = 0; p < T; p++) {
        var u = r[p];
        if (v ? u === "/" && r[p - 1] === "*" && (v = false) : t ? t === u && (t = false) : u === "/" && r[p + 1] === "*" ? v = true : u === '"' || u === "'" ? t = u : u === "(" ? l++ : u === ")" && l--, !v && t === false && l === 0) {
          if (u === ":" && h === -1) h = p;
          else if (u === ";" || p === T - 1) {
            if (h !== -1) {
              var _ = B(r.substring(d, h).trim());
              if (!g.includes(_)) {
                u !== ";" && p++;
                var n = r.substring(d, p).trim();
                i += " " + n + ";";
              }
            }
            d = p + 1, h = -1;
          }
        }
      }
    }
    return a && (i += x(a)), f && (i += x(f, true)), i = i.trim(), i === "" ? null : i;
  }
  return r == null ? null : String(r);
}
function ee(r, e, i, a, f, t) {
  var l = r.__className;
  if (S || l !== i || l === void 0) {
    var v = xr(i, a, t);
    (!S || v !== r.getAttribute("class")) && (v == null ? r.removeAttribute("class") : e ? r.className = v : r.setAttribute("class", v)), r.__className = i;
  } else if (t && f !== t) for (var g in t) {
    var d = !!t[g];
    (f == null || d !== !!f[g]) && r.classList.toggle(g, d);
  }
  return t;
}
function U(r, e = {}, i, a) {
  for (var f in i) {
    var t = i[f];
    e[f] !== t && (i[f] == null ? r.style.removeProperty(f) : r.style.setProperty(f, t, a));
  }
}
function ie(r, e, i, a) {
  var f = r.__style;
  if (S || f !== e) {
    var t = re(e, a);
    (!S || t !== r.getAttribute("style")) && (t == null ? r.removeAttribute("style") : r.style.cssText = t), r.__style = e;
  } else a && (Array.isArray(a) ? (U(r, i == null ? void 0 : i[0], a[0]), U(r, i == null ? void 0 : i[1], a[1], "important")) : U(r, i, a));
  return a;
}
function F(r, e, i) {
  if (r.multiple) {
    if (e == null) return;
    if (!fr(e)) return yr();
    for (var a of r.options) a.selected = e.includes(rr(a));
    return;
  }
  for (a of r.options) {
    var f = rr(a);
    if (Rr(f, e)) {
      a.selected = true;
      return;
    }
  }
  (!i || e !== void 0) && (r.selectedIndex = -1);
}
function ae(r, e) {
  let i = true;
  sr(() => {
    e && F(r, kr(e), i), i = false;
    var a = new MutationObserver(() => {
      var f = r.__value;
      F(r, f);
    });
    return a.observe(r, { childList: true, subtree: true, attributes: true, attributeFilter: ["value"] }), () => {
      a.disconnect();
    };
  });
}
function rr(r) {
  return "__value" in r ? r.__value : r.value;
}
const M = Symbol("class"), k = Symbol("style"), nr = Symbol("is custom element"), or = Symbol("is html");
function oe(r) {
  if (S) {
    var e = false, i = () => {
      if (!e) {
        if (e = true, r.hasAttribute("value")) {
          var a = r.value;
          D(r, "value", null), r.value = a;
        }
        if (r.hasAttribute("checked")) {
          var f = r.checked;
          D(r, "checked", null), r.checked = f;
        }
      }
    };
    r.__on_r = i, Dr(i), Br();
  }
}
function fe(r, e) {
  e ? r.hasAttribute("selected") || r.setAttribute("selected", "") : r.removeAttribute("selected");
}
function D(r, e, i, a) {
  var f = vr(r);
  S && (f[e] = r.getAttribute(e), e === "src" || e === "srcset" || e === "href" && r.nodeName === "LINK") || f[e] !== (f[e] = i) && (e === "loading" && (r[Hr] = i), i == null ? r.removeAttribute(e) : typeof i != "string" && cr(r).includes(e) ? r[e] = i : r.setAttribute(e, i));
}
function te(r, e, i, a, f = false) {
  var t = vr(r), l = t[nr], v = !t[or];
  let g = S && l;
  g && y(false);
  var d = e || {}, h = r.tagName === "OPTION";
  for (var p in e) p in i || (i[p] = null);
  i.class ? i.class = mr(i.class) : (a || i[M]) && (i.class = null), i[k] && (i.style ?? (i.style = null));
  var u = cr(r);
  for (const c in i) {
    let s = i[c];
    if (h && c === "value" && s == null) {
      r.value = r.__value = "", d[c] = s;
      continue;
    }
    if (c === "class") {
      var _ = r.namespaceURI === "http://www.w3.org/1999/xhtml";
      ee(r, _, s, a, e == null ? void 0 : e[M], i[M]), d[c] = s, d[M] = i[M];
      continue;
    }
    if (c === "style") {
      ie(r, s, e == null ? void 0 : e[k], i[k]), d[c] = s, d[k] = i[k];
      continue;
    }
    var n = d[c];
    if (s !== n) {
      d[c] = s;
      var T = c[0] + c[1];
      if (T !== "$$") if (T === "on") {
        const o = {}, C = "$$" + c;
        let b = c.slice(2);
        var E = Gr(b);
        if (Ur(b) && (b = b.slice(0, -7), o.capture = true), !E && n) {
          if (s != null) continue;
          r.removeEventListener(b, d[C], o), d[C] = null;
        }
        if (s != null) if (E) r[`__${b}`] = s, Fr([b]);
        else {
          let I = function(R) {
            d[c].call(this, R);
          };
          d[C] = zr(b, r, I, o);
        }
        else E && (r[`__${b}`] = void 0);
      } else if (c === "style") D(r, c, s);
      else if (c === "autofocus") Kr(r, !!s);
      else if (!l && (c === "__value" || c === "value" && s != null)) r.value = r.__value = s;
      else if (c === "selected" && h) fe(r, s);
      else {
        var A = c;
        v || (A = Xr(A));
        var N = A === "defaultValue" || A === "defaultChecked";
        if (s == null && !l && !N) if (t[c] = null, A === "value" || A === "checked") {
          let o = r;
          const C = e === void 0;
          if (A === "value") {
            let b = o.defaultValue;
            o.removeAttribute(A), o.defaultValue = b, o.value = o.__value = C ? b : null;
          } else {
            let b = o.defaultChecked;
            o.removeAttribute(A), o.defaultChecked = b, o.checked = C ? b : false;
          }
        } else r.removeAttribute(c);
        else N || u.includes(A) && (l || typeof s != "string") ? r[A] = s : typeof s != "function" && D(r, A, s);
      }
    }
  }
  return g && y(true), d;
}
function ve(r, e, i = [], a, f = false, t = qr) {
  const l = i.map(t);
  var v = void 0, g = {}, d = r.nodeName === "SELECT", h = false;
  K(() => {
    var p = e(...l.map(z));
    te(r, v, p, a, f), h && d && "value" in p && F(r, p.value, false);
    for (let _ of Object.getOwnPropertySymbols(g)) p[_] || H(g[_]);
    for (let _ of Object.getOwnPropertySymbols(p)) {
      var u = p[_];
      _.description === Yr && (!v || u !== v[_]) && (g[_] && H(g[_]), g[_] = P(() => Wr(r, () => u)));
    }
    v = p;
  }), d && ae(r, () => v.value), h = true;
}
function vr(r) {
  return r.__attributes ?? (r.__attributes = { [nr]: r.nodeName.includes("-"), [or]: r.namespaceURI === Pr });
}
var er = /* @__PURE__ */ new Map();
function cr(r) {
  var e = er.get(r.nodeName);
  if (e) return e;
  er.set(r.nodeName, e = []);
  for (var i, a = r, f = Element.prototype; f !== a; ) {
    i = Vr(a);
    for (var t in i) i[t].set && e.push(t);
    a = $r(a);
  }
  return e;
}
export {
  k as S,
  ve as a,
  ee as b,
  ie as c,
  ne as e,
  le as i,
  oe as r,
  D as s
};
