import { f as u, d as h } from "../chunks/BIiAUV6v.js";
import { i as g } from "../chunks/B3n7_GNY.js";
import { q as d, I as l, J as v, u as _, K as e, L as a, M as x } from "../chunks/D-TuGdn3.js";
import { s as o } from "../chunks/DhN3w0m4.js";
import { s as $, p } from "../chunks/DnVWwKql.js";
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
