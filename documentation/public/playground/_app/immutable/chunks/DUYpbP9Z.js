import { v as a, w as i, r as t, x as _, y as m, z as u } from "./CLHzdWKz.js";
function v(e) {
  t === null && a(), m && t.l !== null ? d(t).m.push(e) : i(() => {
    const n = u(e);
    if (typeof n == "function") return n;
  });
}
function y(e) {
  t === null && a(), v(() => () => u(e));
}
function p(e, n, { bubbles: o = false, cancelable: s = false } = {}) {
  return new CustomEvent(e, { detail: n, bubbles: o, cancelable: s });
}
function b() {
  const e = t;
  return e === null && a(), (n, o, s) => {
    var _a;
    const c = (_a = e.s.$$events) == null ? void 0 : _a[n];
    if (c) {
      const l = _(c) ? c.slice() : [c], r = p(n, o, s);
      for (const f of l) f.call(e.x, r);
      return !r.defaultPrevented;
    }
    return true;
  };
}
function d(e) {
  var n = e.l;
  return n.u ?? (n.u = { a: [], b: [], m: [] });
}
export {
  y as a,
  b as c,
  v as o
};
