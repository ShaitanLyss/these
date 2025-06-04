import { f as u, d as h } from "../chunks/ChhizTbv.js";
import { i as g } from "../chunks/Dx4UTkTT.js";
import { q as d, I as l, J as v, u as _, K as e, L as a, M as x } from "../chunks/CLHzdWKz.js";
import { s as o } from "../chunks/98t1C0Ls.js";
import { s as $, p } from "../chunks/BiMYQU74.js";
const k = { get error() {
  return p.error;
}, get status() {
  return p.status;
} };
$.updated.check;
const m = k;
var b = u("<h1> </h1> <p> </p>", 1);
function L(i, f) {
  d(f, false), g();
  var t = b(), r = l(t), n = e(r, true);
  a(r);
  var s = x(r, 2), c = e(s, true);
  a(s), v(() => {
    var _a;
    o(n, m.status), o(c, (_a = m.error) == null ? void 0 : _a.message);
  }), h(i, t), _();
}
export {
  L as component
};
