import { l as H, f, e as T, d } from "../chunks/ChhizTbv.js";
import { N as z, O as B, o as E, ac as N, ad as O, p as b, d as P, z as V, W as F, q as L, ae as R, J as h, D as l, u as q, K as k, af as D, ag as I, I as J, M as y, ah as w, ai as K, L as A, a4 as U } from "../chunks/CLHzdWKz.js";
import { e as W, s as v, r as $, i as G } from "../chunks/iI-Sx4xs.js";
function Q(e, s, ...a) {
  var t = e, r = N, o;
  z(() => {
    r !== (r = s()) && (o && (O(o), o = null), o = E(() => r(t, ...a)));
  }, B), b && (t = P);
}
function X(e, s, a = s) {
  H(e, "change", (t) => {
    var r = t ? e.defaultChecked : e.checked;
    a(r);
  }), (b && e.defaultChecked !== e.checked || V(s) == null) && a(e.checked), F(() => {
    var t = s();
    e.checked = !!t;
  });
}
const Y = false, e1 = true, n1 = Object.freeze(Object.defineProperty({ __proto__: null, prerender: e1, ssr: Y }, Symbol.toStringTag, { value: "Module" }));
var a1 = f('<link rel="preload" as="style"/>'), t1 = f('<!> <link rel="stylesheet"/>', 1), s1 = f('<div class="relative"><label class="swap swap-rotate absolute top-3 right-8 z-10 opacity-100"><input type="checkbox" class="theme-controller"/> <svg class="swap-on h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg> <svg class="swap-off h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg></label> <!></div>');
function c1(e, s) {
  L(s, true);
  let a = D(false);
  R("lightmode", () => l(a));
  const t = "vs", r = "atom-one-dark", o = w(() => l(a) ? t : r);
  function p(n) {
    return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/${n}.min.css`;
  }
  const Z = w(() => p(l(o)));
  var c = s1();
  T((n) => {
    var m = t1();
    I.title = "Hecate Playground";
    var _ = J(m);
    W(_, 17, () => [t, r], G, (S, j) => {
      var g = a1();
      h((C) => v(g, "href", C), [() => p(l(j))]), d(S, g);
    });
    var M = y(_, 2);
    h(() => v(M, "href", l(Z))), d(n, m);
  });
  var i = k(c), u = k(i);
  $(u), K(4), A(i);
  var x = y(i, 2);
  Q(x, () => s.children), A(c), h(() => v(c, "data-theme", l(a) ? "light" : "dark")), X(u, () => l(a), (n) => U(a, n)), d(e, c), q();
}
export {
  c1 as component,
  n1 as universal
};
