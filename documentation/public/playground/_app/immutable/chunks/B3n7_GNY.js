import { r as d, A as g, w as c, B as i, z as m, C as b, D as p, E as v, F as h, G as k } from "./D-TuGdn3.js";
function x(n = false) {
  const s = d, e = s.l.u;
  if (!e) return;
  let f = () => v(s.s);
  if (n) {
    let a = 0, t = {};
    const _ = h(() => {
      let l = false;
      const r = s.s;
      for (const o in r) r[o] !== t[o] && (t[o] = r[o], l = true);
      return l && a++, a;
    });
    f = () => p(_);
  }
  e.b.length && g(() => {
    u(s, f), i(e.b);
  }), c(() => {
    const a = m(() => e.m.map(b));
    return () => {
      for (const t of a) typeof t == "function" && t();
    };
  }), e.a.length && c(() => {
    u(s, f), i(e.a);
  });
}
function u(n, s) {
  if (n.l.s) for (const e of n.l.s) p(e);
  s();
}
k();
export {
  x as i
};
