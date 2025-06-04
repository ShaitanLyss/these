var _a;
import { X as N, aE as h, aF as m, aG as P, t as g, ak as D, x as R, n as y, N as V, aH as F, p as l, H, a as S, s as A, c as b, d as s, g as w, aI as B, aJ as W, aK as j, h as q } from "./CLHzdWKz.js";
function ee(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const G = ["beforeinput", "click", "change", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"];
function te(e) {
  return G.includes(e);
}
const U = { formnovalidate: "formNoValidate", ismap: "isMap", nomodule: "noModule", playsinline: "playsInline", readonly: "readOnly", defaultvalue: "defaultValue", defaultchecked: "defaultChecked", srcobject: "srcObject", novalidate: "noValidate", allowfullscreen: "allowFullscreen", disablepictureinpicture: "disablePictureInPicture", disableremoteplayback: "disableRemotePlayback" };
function re(e) {
  return e = e.toLowerCase(), U[e] ?? e;
}
const z = ["touchstart", "touchmove"];
function ae(e) {
  return z.includes(e);
}
function ne(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = true, N(() => {
      document.activeElement === r && e.focus();
    });
  }
}
let L = false;
function J() {
  L || (L = true, document.addEventListener("reset", (e) => {
    Promise.resolve().then(() => {
      var _a2;
      if (!e.defaultPrevented) for (const t of e.target.elements) (_a2 = t.__on_r) == null ? void 0 : _a2.call(t);
    });
  }, { capture: true }));
}
function I(e) {
  var t = P, r = g;
  h(null), m(null);
  try {
    return e();
  } finally {
    h(t), m(r);
  }
}
function oe(e, t, r, o = r) {
  e.addEventListener(t, () => I(r));
  const n = e.__on_r;
  n ? e.__on_r = () => {
    n(), o(true);
  } : e.__on_r = () => o(true), J();
}
const K = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set();
function ie(e, t, r, o = {}) {
  function n(a) {
    if (o.capture || Y.call(t, a), !a.cancelBubble) return I(() => r == null ? void 0 : r.call(this, a));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? N(() => {
    t.addEventListener(e, n, o);
  }) : t.addEventListener(e, n, o), n;
}
function ue(e) {
  for (var t = 0; t < e.length; t++) K.add(e[t]);
  for (var r of X) r(e);
}
function Y(e) {
  var _a2;
  var t = this, r = t.ownerDocument, o = e.type, n = ((_a2 = e.composedPath) == null ? void 0 : _a2.call(e)) || [], a = n[0] || e.target, u = 0, d = e.__root;
  if (d) {
    var f = n.indexOf(d);
    if (f !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var T = n.indexOf(t);
    if (T === -1) return;
    f <= T && (u = f);
  }
  if (a = n[u] || e.target, a !== t) {
    D(e, "currentTarget", { configurable: true, get() {
      return a || r;
    } });
    var x = P, M = g;
    h(null), m(null);
    try {
      for (var _, k = []; a !== null; ) {
        var E = a.assignedSlot || a.parentNode || a.host || null;
        try {
          var p = a["__" + o];
          if (p != null && (!a.disabled || e.target === a)) if (R(p)) {
            var [O, ...C] = p;
            O.apply(a, [e, ...C]);
          } else p.call(a, e);
        } catch (v) {
          _ ? k.push(v) : _ = v;
        }
        if (e.cancelBubble || E === t || E === null) break;
        a = E;
      }
      if (_) {
        for (let v of k) queueMicrotask(() => {
          throw v;
        });
        throw _;
      }
    } finally {
      e.__root = t, delete e.currentTarget, h(x), m(M);
    }
  }
}
let i;
function se() {
  i = void 0;
}
function le(e) {
  let t = null, r = l;
  var o;
  if (l) {
    for (t = s, i === void 0 && (i = w(document.head)); i !== null && (i.nodeType !== 8 || i.data !== H); ) i = S(i);
    i === null ? A(false) : i = b(S(i));
  }
  l || (o = document.head.appendChild(y()));
  try {
    V(() => e(o), F);
  } finally {
    r && (A(true), i = s, b(t));
  }
}
function Q(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function c(e, t) {
  var r = g;
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
function ce(e, t) {
  var r = (t & W) !== 0, o = (t & j) !== 0, n, a = !e.startsWith("<!>");
  return () => {
    if (l) return c(s, null), s;
    n === void 0 && (n = Q(a ? e : "<!>" + e), r || (n = w(n)));
    var u = o || B ? document.importNode(n, true) : n.cloneNode(true);
    if (r) {
      var d = w(u), f = u.lastChild;
      c(d, f);
    } else c(u, u);
    return u;
  };
}
function fe(e = "") {
  if (!l) {
    var t = y(e + "");
    return c(t, t), t;
  }
  var r = s;
  return r.nodeType !== 3 && (r.before(r = y()), b(r)), c(r, r), r;
}
function de() {
  if (l) return c(s, null), s;
  var e = document.createDocumentFragment(), t = document.createComment(""), r = y();
  return e.append(t, r), c(t, r), e;
}
function _e(e, t) {
  if (l) {
    g.nodes_end = s, q();
    return;
  }
  e !== null && e.before(t);
}
const Z = "5";
typeof window < "u" && ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(Z);
export {
  K as a,
  se as b,
  c,
  _e as d,
  le as e,
  ce as f,
  de as g,
  Y as h,
  ae as i,
  J as j,
  ee as k,
  oe as l,
  ie as m,
  ue as n,
  ne as o,
  re as p,
  te as q,
  X as r,
  Q as s,
  fe as t
};
