import { N as H, p as O, h as K, O as M, P as Z, H as $, Q as z, R as G, c as V, s as L, S as m, o as Y, T as q, U as Q, d as W, V as X, W as J, z as w, X as x, Y as y, Z as D, _ as k, $ as ee, F as U, a0 as re, a1 as se, D as h, a2 as ne, a3 as ae, a4 as ie, a5 as te, a6 as C, y as fe, a7 as ue, a8 as le, a9 as ce, aa as oe, ab as P } from "./D-TuGdn3.js";
function be(e, r, [n, s] = [0, 0]) {
  O && n === 0 && K();
  var a = e, i = null, f = null, d = Q, I = n > 0 ? M : 0, l = false;
  const g = (u, c = true) => {
    l = true, p(c, u);
  }, p = (u, c) => {
    if (d === (d = u)) return;
    let v = false;
    if (O && s !== -1) {
      if (n === 0) {
        const o = Z(a);
        o === $ ? s = 0 : o === z ? s = 1 / 0 : (s = parseInt(o.substring(1)), s !== s && (s = d ? 1 / 0 : -1));
      }
      const S = s > n;
      !!d === S && (a = G(), V(a), L(false), v = true, s = -1);
    }
    d ? (i ? m(i) : c && (i = Y(() => c(a))), f && q(f, () => {
      f = null;
    })) : (f ? m(f) : c && (f = Y(() => c(a, [n + 1, s]))), i && q(i, () => {
      i = null;
    })), v && L(true);
  };
  H(() => {
    l = false, r(g), l || p(null, null);
  }, I), O && (a = W);
}
function B(e, r) {
  return e === r || (e == null ? void 0 : e[y]) === r;
}
function he(e = {}, r, n, s) {
  return X(() => {
    var a, i;
    return J(() => {
      a = i, i = [], w(() => {
        e !== n(...i) && (r(e, ...i), a && B(n(...a), e) && r(null, ...a));
      });
    }), () => {
      x(() => {
        i && B(n(...i), e) && r(null, ...i);
      });
    };
  }), e;
}
let R = false;
function _e(e) {
  var r = R;
  try {
    return R = false, [e(), R];
  } finally {
    R = r;
  }
}
const pe = { get(e, r) {
  if (!e.exclude.includes(r)) return e.props[r];
}, set(e, r) {
  return false;
}, getOwnPropertyDescriptor(e, r) {
  if (!e.exclude.includes(r) && r in e.props) return { enumerable: true, configurable: true, value: e.props[r] };
}, has(e, r) {
  return e.exclude.includes(r) ? false : r in e.props;
}, ownKeys(e) {
  return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
} };
function Pe(e, r, n) {
  return new Proxy({ props: e, exclude: r }, pe);
}
const de = { get(e, r) {
  let n = e.props.length;
  for (; n--; ) {
    let s = e.props[n];
    if (P(s) && (s = s()), typeof s == "object" && s !== null && r in s) return s[r];
  }
}, set(e, r, n) {
  let s = e.props.length;
  for (; s--; ) {
    let a = e.props[s];
    P(a) && (a = a());
    const i = D(a, r);
    if (i && i.set) return i.set(n), true;
  }
  return false;
}, getOwnPropertyDescriptor(e, r) {
  let n = e.props.length;
  for (; n--; ) {
    let s = e.props[n];
    if (P(s) && (s = s()), typeof s == "object" && s !== null && r in s) {
      const a = D(s, r);
      return a && !a.configurable && (a.configurable = true), a;
    }
  }
}, has(e, r) {
  if (r === y || r === C) return false;
  for (let n of e.props) if (P(n) && (n = n()), n != null && r in n) return true;
  return false;
}, ownKeys(e) {
  const r = [];
  for (let n of e.props) if (P(n) && (n = n()), !!n) {
    for (const s in n) r.includes(s) || r.push(s);
    for (const s of Object.getOwnPropertySymbols(n)) r.includes(s) || r.push(s);
  }
  return r;
} };
function Ie(...e) {
  return new Proxy({ props: e }, de);
}
function j(e) {
  var _a;
  return ((_a = e.ctx) == null ? void 0 : _a.d) ?? false;
}
function Se(e, r, n, s) {
  var _a;
  var a = (n & ce) !== 0, i = !fe || (n & ue) !== 0, f = (n & te) !== 0, d = (n & oe) !== 0, I = false, l;
  f ? [l, I] = _e(() => e[r]) : l = e[r];
  var g = y in e || C in e, p = f && (((_a = D(e, r)) == null ? void 0 : _a.set) ?? (g && r in e && ((t) => e[r] = t))) || void 0, u = s, c = true, v = false, S = () => (v = true, c && (c = false, d ? u = w(s) : u = s), u);
  l === void 0 && s !== void 0 && (p && i && k(), l = S(), p && p(l));
  var o;
  if (i) o = () => {
    var t = e[r];
    return t === void 0 ? S() : (c = true, v = false, t);
  };
  else {
    var N = (a ? U : re)(() => e[r]);
    N.f |= ee, o = () => {
      var t = h(N);
      return t !== void 0 && (u = void 0), t === void 0 ? u : t;
    };
  }
  if ((n & se) === 0 && i) return o;
  if (p) {
    var F = e.$$legacy;
    return function(t, b) {
      return arguments.length > 0 ? ((!i || !b || F || I) && p(b ? o() : t), t) : o();
    };
  }
  var T = false, A = le(l), _ = U(() => {
    var t = o(), b = h(A);
    return T ? (T = false, b) : A.v = t;
  });
  return f && h(_), a || (_.equals = ne), function(t, b) {
    if (arguments.length > 0) {
      const E = b ? h(_) : i && f ? ae(t) : t;
      if (!_.equals(E)) {
        if (T = true, ie(A, E), v && u !== void 0 && (u = E), j(_)) return t;
        w(() => h(_));
      }
      return t;
    }
    return j(_) ? _.v : h(_);
  };
}
export {
  he as b,
  be as i,
  Se as p,
  Pe as r,
  Ie as s
};
