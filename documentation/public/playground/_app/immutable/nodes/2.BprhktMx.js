import { c as Pa, s as Lp, f as xt, d as $e, g as Nc, t as Ic } from "../chunks/ChhizTbv.js";
import { J as Li, p as Da, h as Ra, t as _p, aL as Np, d as Ea, a as Ip, f as Fp, b as Hp, c as Wp, g as us, K as We, L as Le, I as Pl, q as Dl, u as Rl, M as Ti, D as K, ah as qt, aM as ds, aN as zp, a4 as hi, a8 as ps, E as ht, aO as Vp, w as Qp, af as Gr, a3 as qp, z as Xp } from "../chunks/CLHzdWKz.js";
import { s as Ln } from "../chunks/98t1C0Ls.js";
import { p as ve, i as ci, r as Fc, s as Up, b as $p } from "../chunks/Ccg59MuO.js";
import { i as jp } from "../chunks/Dx4UTkTT.js";
import { c as Kp, o as Gp, a as Yp } from "../chunks/DUYpbP9Z.js";
import { a as Hc, b as li, e as Jp, c as gs, i as Zp, S as eg } from "../chunks/iI-Sx4xs.js";
let Vk;
let __tla = (async () => {
  function Wc(n, e, t = false, i = false, s = false) {
    var r = n, o = "";
    Li(() => {
      var l = _p;
      if (o === (o = e() ?? "")) {
        Da && Ra();
        return;
      }
      if (l.nodes_start !== null && (Np(l.nodes_start, l.nodes_end), l.nodes_start = l.nodes_end = null), o !== "") {
        if (Da) {
          Ea.data;
          for (var a = Ra(), h = a; a !== null && (a.nodeType !== 8 || a.data !== ""); ) h = a, a = Ip(a);
          if (a === null) throw Fp(), Hp;
          Pa(Ea, h), r = Wp(a);
          return;
        }
        var c = o + "";
        t ? c = `<svg>${c}</svg>` : i && (c = `<math>${c}</math>`);
        var f = Lp(c);
        if ((t || i) && (f = us(f)), Pa(us(f), f.lastChild), t || i) for (; us(f); ) r.before(us(f));
        else r.before(f);
      }
    });
  }
  const tg = "" + new URL("../assets/hecate_bg.B_QtrzMS.wasm", import.meta.url).href, ig = async (n = {}, e) => {
    let t;
    if (e.startsWith("data:")) {
      const i = e.replace(/^data:.*?base64,/, "");
      let s;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") s = Buffer.from(i, "base64");
      else if (typeof atob == "function") {
        const r = atob(i);
        s = new Uint8Array(r.length);
        for (let o = 0; o < r.length; o++) s[o] = r.charCodeAt(o);
      } else throw new Error("Cannot decode base64-encoded data URL");
      t = await WebAssembly.instantiate(s, n);
    } else {
      const i = await fetch(e), s = i.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && s.startsWith("application/wasm")) t = await WebAssembly.instantiateStreaming(i, n);
      else {
        const r = await i.arrayBuffer();
        t = await WebAssembly.instantiate(r, n);
      }
    }
    return t.instance.exports;
  };
  let jt;
  function ng(n) {
    jt = n;
  }
  const sg = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let zc = new sg("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  zc.decode();
  let ms = null;
  function zs() {
    return (ms === null || ms.byteLength === 0) && (ms = new Uint8Array(jt.memory.buffer)), ms;
  }
  function Vc(n, e) {
    return n = n >>> 0, zc.decode(zs().subarray(n, n + e));
  }
  let To = 0;
  const rg = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let Vs = new rg("utf-8");
  const og = typeof Vs.encodeInto == "function" ? function(n, e) {
    return Vs.encodeInto(n, e);
  } : function(n, e) {
    const t = Vs.encode(n);
    return e.set(t), {
      read: n.length,
      written: t.length
    };
  };
  function lg(n, e, t) {
    if (t === void 0) {
      const l = Vs.encode(n), a = e(l.length, 1) >>> 0;
      return zs().subarray(a, a + l.length).set(l), To = l.length, a;
    }
    let i = n.length, s = e(i, 1) >>> 0;
    const r = zs();
    let o = 0;
    for (; o < i; o++) {
      const l = n.charCodeAt(o);
      if (l > 127) break;
      r[s + o] = l;
    }
    if (o !== i) {
      o !== 0 && (n = n.slice(o)), s = t(s, i, i = o + n.length * 3, 1) >>> 0;
      const l = zs().subarray(s + o, s + i), a = og(n, l);
      o += a.written, s = t(s, i, o, 1) >>> 0;
    }
    return To = o, s;
  }
  function ag(n) {
    const e = jt.__wbindgen_export_0.get(n);
    return jt.__externref_table_dealloc(n), e;
  }
  function hg(n) {
    let e, t;
    try {
      const r = lg(n, jt.__wbindgen_malloc, jt.__wbindgen_realloc), o = To, l = jt.code_gen_from_yaml(r, o);
      var i = l[0], s = l[1];
      if (l[3]) throw i = 0, s = 0, ag(l[2]);
      return e = i, t = s, Vc(i, s);
    } finally {
      jt.__wbindgen_free(e, t, 1);
    }
  }
  function cg() {
    const n = jt.__wbindgen_export_0, e = n.grow(4);
    n.set(0, void 0), n.set(e + 0, void 0), n.set(e + 1, null), n.set(e + 2, true), n.set(e + 3, false);
  }
  function fg(n, e) {
    return Vc(n, e);
  }
  URL = globalThis.URL;
  const Wt = await ig({
    "./hecate_bg.js": {
      __wbindgen_string_new: fg,
      __wbindgen_init_externref_table: cg
    }
  }, tg), ug = Wt.memory, dg = Wt.code_gen_from_yaml, pg = Wt.start, gg = Wt.sum, mg = Wt.__wbindgen_export_0, bg = Wt.__wbindgen_malloc, yg = Wt.__wbindgen_realloc, xg = Wt.__externref_table_dealloc, wg = Wt.__wbindgen_free, Qc = Wt.__wbindgen_start, kg = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_dealloc: xg,
    __wbindgen_export_0: mg,
    __wbindgen_free: wg,
    __wbindgen_malloc: bg,
    __wbindgen_realloc: yg,
    __wbindgen_start: Qc,
    code_gen_from_yaml: dg,
    memory: ug,
    start: pg,
    sum: gg
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ng(kg);
  Qc();
  const vg = `meshes:
    mesh:
        type: hyper_cube
        range: -1 m .. 1 m
        subdivisions: 5
        show_info: true

equations:
    wave: diff(u, t, 2) - c^2 * laplacian * u = f

time: 0 .. 5 s
time_step: 0.1 s

parameters:
    c: 
      type: speed
      value: 1

solve:
  equations:
    - wave
  mesh: mesh
  element: Q1

unknowns:
  u:
    initial: u0
    boundary: g
    derivative:
      initial: v0

functions:
    f: 0
    u0: 0 
    v0: 0
    g:
      - expr: sin(4 * pi * t)
        t: 0 .. 0.5 s
        x: -1 m
        y: -0.33 .. 0.33 m
      - expr: 0
`;
  function Sg(n) {
    const e = n.regex, t = n.COMMENT("//", "$", {
      contains: [
        {
          begin: /\\\n/
        }
      ]
    }), i = "decltype\\(auto\\)", s = "[a-zA-Z_]\\w*::", o = "(?!struct)(" + i + "|" + e.optional(s) + "[a-zA-Z_]\\w*" + e.optional("<[^<>]+>") + ")", l = {
      className: "type",
      begin: "\\b[a-z\\d_]*_t\\b"
    }, h = {
      className: "string",
      variants: [
        {
          begin: '(u8?|U|L)?"',
          end: '"',
          illegal: "\\n",
          contains: [
            n.BACKSLASH_ESCAPE
          ]
        },
        {
          begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
          end: "'",
          illegal: "."
        },
        n.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
          end: /\)([^()\\ ]{0,16})"/
        })
      ]
    }, c = {
      className: "number",
      variants: [
        {
          begin: "[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"
        },
        {
          begin: "[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"
        }
      ],
      relevance: 0
    }, f = {
      className: "meta",
      begin: /#\s*[a-z]+\b/,
      end: /$/,
      keywords: {
        keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
      },
      contains: [
        {
          begin: /\\\n/,
          relevance: 0
        },
        n.inherit(h, {
          className: "string"
        }),
        {
          className: "string",
          begin: /<.*?>/
        },
        t,
        n.C_BLOCK_COMMENT_MODE
      ]
    }, u = {
      className: "title",
      begin: e.optional(s) + n.IDENT_RE,
      relevance: 0
    }, d = e.optional(s) + n.IDENT_RE + "\\s*\\(", p = [
      "alignas",
      "alignof",
      "and",
      "and_eq",
      "asm",
      "atomic_cancel",
      "atomic_commit",
      "atomic_noexcept",
      "auto",
      "bitand",
      "bitor",
      "break",
      "case",
      "catch",
      "class",
      "co_await",
      "co_return",
      "co_yield",
      "compl",
      "concept",
      "const_cast|10",
      "consteval",
      "constexpr",
      "constinit",
      "continue",
      "decltype",
      "default",
      "delete",
      "do",
      "dynamic_cast|10",
      "else",
      "enum",
      "explicit",
      "export",
      "extern",
      "false",
      "final",
      "for",
      "friend",
      "goto",
      "if",
      "import",
      "inline",
      "module",
      "mutable",
      "namespace",
      "new",
      "noexcept",
      "not",
      "not_eq",
      "nullptr",
      "operator",
      "or",
      "or_eq",
      "override",
      "private",
      "protected",
      "public",
      "reflexpr",
      "register",
      "reinterpret_cast|10",
      "requires",
      "return",
      "sizeof",
      "static_assert",
      "static_cast|10",
      "struct",
      "switch",
      "synchronized",
      "template",
      "this",
      "thread_local",
      "throw",
      "transaction_safe",
      "transaction_safe_dynamic",
      "true",
      "try",
      "typedef",
      "typeid",
      "typename",
      "union",
      "using",
      "virtual",
      "volatile",
      "while",
      "xor",
      "xor_eq"
    ], g = [
      "bool",
      "char",
      "char16_t",
      "char32_t",
      "char8_t",
      "double",
      "float",
      "int",
      "long",
      "short",
      "void",
      "wchar_t",
      "unsigned",
      "signed",
      "const",
      "static"
    ], b = [
      "any",
      "auto_ptr",
      "barrier",
      "binary_semaphore",
      "bitset",
      "complex",
      "condition_variable",
      "condition_variable_any",
      "counting_semaphore",
      "deque",
      "false_type",
      "flat_map",
      "flat_set",
      "future",
      "imaginary",
      "initializer_list",
      "istringstream",
      "jthread",
      "latch",
      "lock_guard",
      "multimap",
      "multiset",
      "mutex",
      "optional",
      "ostringstream",
      "packaged_task",
      "pair",
      "promise",
      "priority_queue",
      "queue",
      "recursive_mutex",
      "recursive_timed_mutex",
      "scoped_lock",
      "set",
      "shared_future",
      "shared_lock",
      "shared_mutex",
      "shared_timed_mutex",
      "shared_ptr",
      "stack",
      "string_view",
      "stringstream",
      "timed_mutex",
      "thread",
      "true_type",
      "tuple",
      "unique_lock",
      "unique_ptr",
      "unordered_map",
      "unordered_multimap",
      "unordered_multiset",
      "unordered_set",
      "variant",
      "vector",
      "weak_ptr",
      "wstring",
      "wstring_view"
    ], y = [
      "abort",
      "abs",
      "acos",
      "apply",
      "as_const",
      "asin",
      "atan",
      "atan2",
      "calloc",
      "ceil",
      "cerr",
      "cin",
      "clog",
      "cos",
      "cosh",
      "cout",
      "declval",
      "endl",
      "exchange",
      "exit",
      "exp",
      "fabs",
      "floor",
      "fmod",
      "forward",
      "fprintf",
      "fputs",
      "free",
      "frexp",
      "fscanf",
      "future",
      "invoke",
      "isalnum",
      "isalpha",
      "iscntrl",
      "isdigit",
      "isgraph",
      "islower",
      "isprint",
      "ispunct",
      "isspace",
      "isupper",
      "isxdigit",
      "labs",
      "launder",
      "ldexp",
      "log",
      "log10",
      "make_pair",
      "make_shared",
      "make_shared_for_overwrite",
      "make_tuple",
      "make_unique",
      "malloc",
      "memchr",
      "memcmp",
      "memcpy",
      "memset",
      "modf",
      "move",
      "pow",
      "printf",
      "putchar",
      "puts",
      "realloc",
      "scanf",
      "sin",
      "sinh",
      "snprintf",
      "sprintf",
      "sqrt",
      "sscanf",
      "std",
      "stderr",
      "stdin",
      "stdout",
      "strcat",
      "strchr",
      "strcmp",
      "strcpy",
      "strcspn",
      "strlen",
      "strncat",
      "strncmp",
      "strncpy",
      "strpbrk",
      "strrchr",
      "strspn",
      "strstr",
      "swap",
      "tan",
      "tanh",
      "terminate",
      "to_underlying",
      "tolower",
      "toupper",
      "vfprintf",
      "visit",
      "vprintf",
      "vsprintf"
    ], C = {
      type: g,
      keyword: p,
      literal: [
        "NULL",
        "false",
        "nullopt",
        "nullptr",
        "true"
      ],
      built_in: [
        "_Pragma"
      ],
      _type_hints: b
    }, w = {
      className: "function.dispatch",
      relevance: 0,
      keywords: {
        _hint: y
      },
      begin: e.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, n.IDENT_RE, e.lookahead(/(<[^<>]+>|)\s*\(/))
    }, O = [
      w,
      f,
      l,
      t,
      n.C_BLOCK_COMMENT_MODE,
      c,
      h
    ], M = {
      variants: [
        {
          begin: /=/,
          end: /;/
        },
        {
          begin: /\(/,
          end: /\)/
        },
        {
          beginKeywords: "new throw return else",
          end: /;/
        }
      ],
      keywords: C,
      contains: O.concat([
        {
          begin: /\(/,
          end: /\)/,
          keywords: C,
          contains: O.concat([
            "self"
          ]),
          relevance: 0
        }
      ]),
      relevance: 0
    }, W = {
      className: "function",
      begin: "(" + o + "[\\*&\\s]+)+" + d,
      returnBegin: true,
      end: /[{;=]/,
      excludeEnd: true,
      keywords: C,
      illegal: /[^\w\s\*&:<>.]/,
      contains: [
        {
          begin: i,
          keywords: C,
          relevance: 0
        },
        {
          begin: d,
          returnBegin: true,
          contains: [
            u
          ],
          relevance: 0
        },
        {
          begin: /::/,
          relevance: 0
        },
        {
          begin: /:/,
          endsWithParent: true,
          contains: [
            h,
            c
          ]
        },
        {
          relevance: 0,
          match: /,/
        },
        {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: C,
          relevance: 0,
          contains: [
            t,
            n.C_BLOCK_COMMENT_MODE,
            h,
            c,
            l,
            {
              begin: /\(/,
              end: /\)/,
              keywords: C,
              relevance: 0,
              contains: [
                "self",
                t,
                n.C_BLOCK_COMMENT_MODE,
                h,
                c,
                l
              ]
            }
          ]
        },
        l,
        t,
        n.C_BLOCK_COMMENT_MODE,
        f
      ]
    };
    return {
      name: "C++",
      aliases: [
        "cc",
        "c++",
        "h++",
        "hpp",
        "hh",
        "hxx",
        "cxx"
      ],
      keywords: C,
      illegal: "</",
      classNameAliases: {
        "function.dispatch": "built_in"
      },
      contains: [].concat(M, W, w, O, [
        f,
        {
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
          end: ">",
          keywords: C,
          contains: [
            "self",
            l
          ]
        },
        {
          begin: n.IDENT_RE + "::",
          keywords: C
        },
        {
          match: [
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        }
      ])
    };
  }
  const Og = {
    name: "cpp",
    register: Sg
  };
  function Cg(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
  }
  var Yr, Ba;
  function Ag() {
    if (Ba) return Yr;
    Ba = 1;
    function n(m) {
      return m instanceof Map ? m.clear = m.delete = m.set = function() {
        throw new Error("map is read-only");
      } : m instanceof Set && (m.add = m.clear = m.delete = function() {
        throw new Error("set is read-only");
      }), Object.freeze(m), Object.getOwnPropertyNames(m).forEach((k) => {
        const D = m[k], X = typeof D;
        (X === "object" || X === "function") && !Object.isFrozen(D) && n(D);
      }), m;
    }
    class e {
      constructor(k) {
        k.data === void 0 && (k.data = {}), this.data = k.data, this.isMatchIgnored = false;
      }
      ignoreMatch() {
        this.isMatchIgnored = true;
      }
    }
    function t(m) {
      return m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    }
    function i(m, ...k) {
      const D = /* @__PURE__ */ Object.create(null);
      for (const X in m) D[X] = m[X];
      return k.forEach(function(X) {
        for (const we in X) D[we] = X[we];
      }), D;
    }
    const s = "</span>", r = (m) => !!m.scope, o = (m, { prefix: k }) => {
      if (m.startsWith("language:")) return m.replace("language:", "language-");
      if (m.includes(".")) {
        const D = m.split(".");
        return [
          `${k}${D.shift()}`,
          ...D.map((X, we) => `${X}${"_".repeat(we + 1)}`)
        ].join(" ");
      }
      return `${k}${m}`;
    };
    class l {
      constructor(k, D) {
        this.buffer = "", this.classPrefix = D.classPrefix, k.walk(this);
      }
      addText(k) {
        this.buffer += t(k);
      }
      openNode(k) {
        if (!r(k)) return;
        const D = o(k.scope, {
          prefix: this.classPrefix
        });
        this.span(D);
      }
      closeNode(k) {
        r(k) && (this.buffer += s);
      }
      value() {
        return this.buffer;
      }
      span(k) {
        this.buffer += `<span class="${k}">`;
      }
    }
    const a = (m = {}) => {
      const k = {
        children: []
      };
      return Object.assign(k, m), k;
    };
    class h {
      constructor() {
        this.rootNode = a(), this.stack = [
          this.rootNode
        ];
      }
      get top() {
        return this.stack[this.stack.length - 1];
      }
      get root() {
        return this.rootNode;
      }
      add(k) {
        this.top.children.push(k);
      }
      openNode(k) {
        const D = a({
          scope: k
        });
        this.add(D), this.stack.push(D);
      }
      closeNode() {
        if (this.stack.length > 1) return this.stack.pop();
      }
      closeAllNodes() {
        for (; this.closeNode(); ) ;
      }
      toJSON() {
        return JSON.stringify(this.rootNode, null, 4);
      }
      walk(k) {
        return this.constructor._walk(k, this.rootNode);
      }
      static _walk(k, D) {
        return typeof D == "string" ? k.addText(D) : D.children && (k.openNode(D), D.children.forEach((X) => this._walk(k, X)), k.closeNode(D)), k;
      }
      static _collapse(k) {
        typeof k != "string" && k.children && (k.children.every((D) => typeof D == "string") ? k.children = [
          k.children.join("")
        ] : k.children.forEach((D) => {
          h._collapse(D);
        }));
      }
    }
    class c extends h {
      constructor(k) {
        super(), this.options = k;
      }
      addText(k) {
        k !== "" && this.add(k);
      }
      startScope(k) {
        this.openNode(k);
      }
      endScope() {
        this.closeNode();
      }
      __addSublanguage(k, D) {
        const X = k.root;
        D && (X.scope = `language:${D}`), this.add(X);
      }
      toHTML() {
        return new l(this, this.options).value();
      }
      finalize() {
        return this.closeAllNodes(), true;
      }
    }
    function f(m) {
      return m ? typeof m == "string" ? m : m.source : null;
    }
    function u(m) {
      return g("(?=", m, ")");
    }
    function d(m) {
      return g("(?:", m, ")*");
    }
    function p(m) {
      return g("(?:", m, ")?");
    }
    function g(...m) {
      return m.map((D) => f(D)).join("");
    }
    function b(m) {
      const k = m[m.length - 1];
      return typeof k == "object" && k.constructor === Object ? (m.splice(m.length - 1, 1), k) : {};
    }
    function y(...m) {
      return "(" + (b(m).capture ? "" : "?:") + m.map((X) => f(X)).join("|") + ")";
    }
    function S(m) {
      return new RegExp(m.toString() + "|").exec("").length - 1;
    }
    function A(m, k) {
      const D = m && m.exec(k);
      return D && D.index === 0;
    }
    const C = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
    function w(m, { joinWith: k }) {
      let D = 0;
      return m.map((X) => {
        D += 1;
        const we = D;
        let ke = f(X), N = "";
        for (; ke.length > 0; ) {
          const _ = C.exec(ke);
          if (!_) {
            N += ke;
            break;
          }
          N += ke.substring(0, _.index), ke = ke.substring(_.index + _[0].length), _[0][0] === "\\" && _[1] ? N += "\\" + String(Number(_[1]) + we) : (N += _[0], _[0] === "(" && D++);
        }
        return N;
      }).map((X) => `(${X})`).join(k);
    }
    const O = /\b\B/, M = "[a-zA-Z]\\w*", W = "[a-zA-Z_]\\w*", U = "\\b\\d+(\\.\\d+)?", te = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", V = "\\b(0b[01]+)", I = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", J = (m = {}) => {
      const k = /^#![ ]*\//;
      return m.binary && (m.begin = g(k, /.*\b/, m.binary, /\b.*/)), i({
        scope: "meta",
        begin: k,
        end: /$/,
        relevance: 0,
        "on:begin": (D, X) => {
          D.index !== 0 && X.ignoreMatch();
        }
      }, m);
    }, Q = {
      begin: "\\\\[\\s\\S]",
      relevance: 0
    }, ne = {
      scope: "string",
      begin: "'",
      end: "'",
      illegal: "\\n",
      contains: [
        Q
      ]
    }, xe = {
      scope: "string",
      begin: '"',
      end: '"',
      illegal: "\\n",
      contains: [
        Q
      ]
    }, be = {
      begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }, Te = function(m, k, D = {}) {
      const X = i({
        scope: "comment",
        begin: m,
        end: k,
        contains: []
      }, D);
      X.contains.push({
        scope: "doctag",
        begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
        end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
        excludeBegin: true,
        relevance: 0
      });
      const we = y("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
      return X.contains.push({
        begin: g(/[ ]+/, "(", we, /[.]?[:]?([.][ ]|[ ])/, "){3}")
      }), X;
    }, ye = Te("//", "$"), Ee = Te("/\\*", "\\*/"), Z = Te("#", "$"), se = {
      scope: "number",
      begin: U,
      relevance: 0
    }, fe = {
      scope: "number",
      begin: te,
      relevance: 0
    }, qe = {
      scope: "number",
      begin: V,
      relevance: 0
    }, lt = {
      scope: "regexp",
      begin: /\/(?=[^/\n]*\/)/,
      end: /\/[gimuy]*/,
      contains: [
        Q,
        {
          begin: /\[/,
          end: /\]/,
          relevance: 0,
          contains: [
            Q
          ]
        }
      ]
    }, At = {
      scope: "title",
      begin: M,
      relevance: 0
    }, ii = {
      scope: "title",
      begin: W,
      relevance: 0
    }, et = {
      begin: "\\.\\s*" + W,
      relevance: 0
    };
    var rs = Object.freeze({
      __proto__: null,
      APOS_STRING_MODE: ne,
      BACKSLASH_ESCAPE: Q,
      BINARY_NUMBER_MODE: qe,
      BINARY_NUMBER_RE: V,
      COMMENT: Te,
      C_BLOCK_COMMENT_MODE: Ee,
      C_LINE_COMMENT_MODE: ye,
      C_NUMBER_MODE: fe,
      C_NUMBER_RE: te,
      END_SAME_AS_BEGIN: function(m) {
        return Object.assign(m, {
          "on:begin": (k, D) => {
            D.data._beginMatch = k[1];
          },
          "on:end": (k, D) => {
            D.data._beginMatch !== k[1] && D.ignoreMatch();
          }
        });
      },
      HASH_COMMENT_MODE: Z,
      IDENT_RE: M,
      MATCH_NOTHING_RE: O,
      METHOD_GUARD: et,
      NUMBER_MODE: se,
      NUMBER_RE: U,
      PHRASAL_WORDS_MODE: be,
      QUOTE_STRING_MODE: xe,
      REGEXP_MODE: lt,
      RE_STARTERS_RE: I,
      SHEBANG: J,
      TITLE_MODE: At,
      UNDERSCORE_IDENT_RE: W,
      UNDERSCORE_TITLE_MODE: ii
    });
    function Gd(m, k) {
      m.input[m.index - 1] === "." && k.ignoreMatch();
    }
    function Yd(m, k) {
      m.className !== void 0 && (m.scope = m.className, delete m.className);
    }
    function Jd(m, k) {
      k && m.beginKeywords && (m.begin = "\\b(" + m.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", m.__beforeBegin = Gd, m.keywords = m.keywords || m.beginKeywords, delete m.beginKeywords, m.relevance === void 0 && (m.relevance = 0));
    }
    function Zd(m, k) {
      Array.isArray(m.illegal) && (m.illegal = y(...m.illegal));
    }
    function ep(m, k) {
      if (m.match) {
        if (m.begin || m.end) throw new Error("begin & end are not supported with match");
        m.begin = m.match, delete m.match;
      }
    }
    function tp(m, k) {
      m.relevance === void 0 && (m.relevance = 1);
    }
    const ip = (m, k) => {
      if (!m.beforeMatch) return;
      if (m.starts) throw new Error("beforeMatch cannot be used with starts");
      const D = Object.assign({}, m);
      Object.keys(m).forEach((X) => {
        delete m[X];
      }), m.keywords = D.keywords, m.begin = g(D.beforeMatch, u(D.begin)), m.starts = {
        relevance: 0,
        contains: [
          Object.assign(D, {
            endsParent: true
          })
        ]
      }, m.relevance = 0, delete D.beforeMatch;
    }, np = [
      "of",
      "and",
      "for",
      "in",
      "not",
      "or",
      "if",
      "then",
      "parent",
      "list",
      "value"
    ], sp = "keyword";
    function da(m, k, D = sp) {
      const X = /* @__PURE__ */ Object.create(null);
      return typeof m == "string" ? we(D, m.split(" ")) : Array.isArray(m) ? we(D, m) : Object.keys(m).forEach(function(ke) {
        Object.assign(X, da(m[ke], k, ke));
      }), X;
      function we(ke, N) {
        k && (N = N.map((_) => _.toLowerCase())), N.forEach(function(_) {
          const q = _.split("|");
          X[q[0]] = [
            ke,
            rp(q[0], q[1])
          ];
        });
      }
    }
    function rp(m, k) {
      return k ? Number(k) : op(m) ? 0 : 1;
    }
    function op(m) {
      return np.includes(m.toLowerCase());
    }
    const pa = {}, vi = (m) => {
      console.error(m);
    }, ga = (m, ...k) => {
      console.log(`WARN: ${m}`, ...k);
    }, zi = (m, k) => {
      pa[`${m}/${k}`] || (console.log(`Deprecated as of ${m}. ${k}`), pa[`${m}/${k}`] = true);
    }, os = new Error();
    function ma(m, k, { key: D }) {
      let X = 0;
      const we = m[D], ke = {}, N = {};
      for (let _ = 1; _ <= k.length; _++) N[_ + X] = we[_], ke[_ + X] = true, X += S(k[_ - 1]);
      m[D] = N, m[D]._emit = ke, m[D]._multi = true;
    }
    function lp(m) {
      if (Array.isArray(m.begin)) {
        if (m.skip || m.excludeBegin || m.returnBegin) throw vi("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), os;
        if (typeof m.beginScope != "object" || m.beginScope === null) throw vi("beginScope must be object"), os;
        ma(m, m.begin, {
          key: "beginScope"
        }), m.begin = w(m.begin, {
          joinWith: ""
        });
      }
    }
    function ap(m) {
      if (Array.isArray(m.end)) {
        if (m.skip || m.excludeEnd || m.returnEnd) throw vi("skip, excludeEnd, returnEnd not compatible with endScope: {}"), os;
        if (typeof m.endScope != "object" || m.endScope === null) throw vi("endScope must be object"), os;
        ma(m, m.end, {
          key: "endScope"
        }), m.end = w(m.end, {
          joinWith: ""
        });
      }
    }
    function hp(m) {
      m.scope && typeof m.scope == "object" && m.scope !== null && (m.beginScope = m.scope, delete m.scope);
    }
    function cp(m) {
      hp(m), typeof m.beginScope == "string" && (m.beginScope = {
        _wrap: m.beginScope
      }), typeof m.endScope == "string" && (m.endScope = {
        _wrap: m.endScope
      }), lp(m), ap(m);
    }
    function fp(m) {
      function k(N, _) {
        return new RegExp(f(N), "m" + (m.case_insensitive ? "i" : "") + (m.unicodeRegex ? "u" : "") + (_ ? "g" : ""));
      }
      class D {
        constructor() {
          this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
        }
        addRule(_, q) {
          q.position = this.position++, this.matchIndexes[this.matchAt] = q, this.regexes.push([
            q,
            _
          ]), this.matchAt += S(_) + 1;
        }
        compile() {
          this.regexes.length === 0 && (this.exec = () => null);
          const _ = this.regexes.map((q) => q[1]);
          this.matcherRe = k(w(_, {
            joinWith: "|"
          }), true), this.lastIndex = 0;
        }
        exec(_) {
          this.matcherRe.lastIndex = this.lastIndex;
          const q = this.matcherRe.exec(_);
          if (!q) return null;
          const Be = q.findIndex((mn, qr) => qr > 0 && mn !== void 0), Ce = this.matchIndexes[Be];
          return q.splice(0, Be), Object.assign(q, Ce);
        }
      }
      class X {
        constructor() {
          this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
        }
        getMatcher(_) {
          if (this.multiRegexes[_]) return this.multiRegexes[_];
          const q = new D();
          return this.rules.slice(_).forEach(([Be, Ce]) => q.addRule(Be, Ce)), q.compile(), this.multiRegexes[_] = q, q;
        }
        resumingScanAtSamePosition() {
          return this.regexIndex !== 0;
        }
        considerAll() {
          this.regexIndex = 0;
        }
        addRule(_, q) {
          this.rules.push([
            _,
            q
          ]), q.type === "begin" && this.count++;
        }
        exec(_) {
          const q = this.getMatcher(this.regexIndex);
          q.lastIndex = this.lastIndex;
          let Be = q.exec(_);
          if (this.resumingScanAtSamePosition() && !(Be && Be.index === this.lastIndex)) {
            const Ce = this.getMatcher(0);
            Ce.lastIndex = this.lastIndex + 1, Be = Ce.exec(_);
          }
          return Be && (this.regexIndex += Be.position + 1, this.regexIndex === this.count && this.considerAll()), Be;
        }
      }
      function we(N) {
        const _ = new X();
        return N.contains.forEach((q) => _.addRule(q.begin, {
          rule: q,
          type: "begin"
        })), N.terminatorEnd && _.addRule(N.terminatorEnd, {
          type: "end"
        }), N.illegal && _.addRule(N.illegal, {
          type: "illegal"
        }), _;
      }
      function ke(N, _) {
        const q = N;
        if (N.isCompiled) return q;
        [
          Yd,
          ep,
          cp,
          ip
        ].forEach((Ce) => Ce(N, _)), m.compilerExtensions.forEach((Ce) => Ce(N, _)), N.__beforeBegin = null, [
          Jd,
          Zd,
          tp
        ].forEach((Ce) => Ce(N, _)), N.isCompiled = true;
        let Be = null;
        return typeof N.keywords == "object" && N.keywords.$pattern && (N.keywords = Object.assign({}, N.keywords), Be = N.keywords.$pattern, delete N.keywords.$pattern), Be = Be || /\w+/, N.keywords && (N.keywords = da(N.keywords, m.case_insensitive)), q.keywordPatternRe = k(Be, true), _ && (N.begin || (N.begin = /\B|\b/), q.beginRe = k(q.begin), !N.end && !N.endsWithParent && (N.end = /\B|\b/), N.end && (q.endRe = k(q.end)), q.terminatorEnd = f(q.end) || "", N.endsWithParent && _.terminatorEnd && (q.terminatorEnd += (N.end ? "|" : "") + _.terminatorEnd)), N.illegal && (q.illegalRe = k(N.illegal)), N.contains || (N.contains = []), N.contains = [].concat(...N.contains.map(function(Ce) {
          return up(Ce === "self" ? N : Ce);
        })), N.contains.forEach(function(Ce) {
          ke(Ce, q);
        }), N.starts && ke(N.starts, _), q.matcher = we(q), q;
      }
      if (m.compilerExtensions || (m.compilerExtensions = []), m.contains && m.contains.includes("self")) throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
      return m.classNameAliases = i(m.classNameAliases || {}), ke(m);
    }
    function ba(m) {
      return m ? m.endsWithParent || ba(m.starts) : false;
    }
    function up(m) {
      return m.variants && !m.cachedVariants && (m.cachedVariants = m.variants.map(function(k) {
        return i(m, {
          variants: null
        }, k);
      })), m.cachedVariants ? m.cachedVariants : ba(m) ? i(m, {
        starts: m.starts ? i(m.starts) : null
      }) : Object.isFrozen(m) ? i(m) : m;
    }
    var dp = "11.11.1";
    class pp extends Error {
      constructor(k, D) {
        super(k), this.name = "HTMLInjectionError", this.html = D;
      }
    }
    const Qr = t, ya = i, xa = Symbol("nomatch"), gp = 7, wa = function(m) {
      const k = /* @__PURE__ */ Object.create(null), D = /* @__PURE__ */ Object.create(null), X = [];
      let we = true;
      const ke = "Could not find the language '{}', did you forget to load/include a language module?", N = {
        disableAutodetect: true,
        name: "Plain text",
        contains: []
      };
      let _ = {
        ignoreUnescapedHTML: false,
        throwUnescapedHTML: false,
        noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
        classPrefix: "hljs-",
        cssSelector: "pre code",
        languages: null,
        __emitter: c
      };
      function q(T) {
        return _.noHighlightRe.test(T);
      }
      function Be(T) {
        let H = T.className + " ";
        H += T.parentNode ? T.parentNode.className : "";
        const ee = _.languageDetectRe.exec(H);
        if (ee) {
          const ue = ni(ee[1]);
          return ue || (ga(ke.replace("{}", ee[1])), ga("Falling back to no-highlight mode for this block.", T)), ue ? ee[1] : "no-highlight";
        }
        return H.split(/\s+/).find((ue) => q(ue) || ni(ue));
      }
      function Ce(T, H, ee) {
        let ue = "", Pe = "";
        typeof H == "object" ? (ue = T, ee = H.ignoreIllegals, Pe = H.language) : (zi("10.7.0", "highlight(lang, code, ...args) has been deprecated."), zi("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), Pe = T, ue = H), ee === void 0 && (ee = true);
        const kt = {
          code: ue,
          language: Pe
        };
        as("before:highlight", kt);
        const si = kt.result ? kt.result : mn(kt.language, kt.code, ee);
        return si.code = kt.code, as("after:highlight", si), si;
      }
      function mn(T, H, ee, ue) {
        const Pe = /* @__PURE__ */ Object.create(null);
        function kt(R, F) {
          return R.keywords[F];
        }
        function si() {
          if (!$.keywords) {
            Fe.addText(de);
            return;
          }
          let R = 0;
          $.keywordPatternRe.lastIndex = 0;
          let F = $.keywordPatternRe.exec(de), G = "";
          for (; F; ) {
            G += de.substring(R, F.index);
            const le = Tt.case_insensitive ? F[0].toLowerCase() : F[0], Xe = kt($, le);
            if (Xe) {
              const [Qt, Ep] = Xe;
              if (Fe.addText(G), G = "", Pe[le] = (Pe[le] || 0) + 1, Pe[le] <= gp && (fs += Ep), Qt.startsWith("_")) G += F[0];
              else {
                const Bp = Tt.classNameAliases[Qt] || Qt;
                Mt(F[0], Bp);
              }
            } else G += F[0];
            R = $.keywordPatternRe.lastIndex, F = $.keywordPatternRe.exec(de);
          }
          G += de.substring(R), Fe.addText(G);
        }
        function hs() {
          if (de === "") return;
          let R = null;
          if (typeof $.subLanguage == "string") {
            if (!k[$.subLanguage]) {
              Fe.addText(de);
              return;
            }
            R = mn($.subLanguage, de, true, Ta[$.subLanguage]), Ta[$.subLanguage] = R._top;
          } else R = Xr(de, $.subLanguage.length ? $.subLanguage : null);
          $.relevance > 0 && (fs += R.relevance), Fe.__addSublanguage(R._emitter, R.language);
        }
        function at() {
          $.subLanguage != null ? hs() : si(), de = "";
        }
        function Mt(R, F) {
          R !== "" && (Fe.startScope(F), Fe.addText(R), Fe.endScope());
        }
        function Oa(R, F) {
          let G = 1;
          const le = F.length - 1;
          for (; G <= le; ) {
            if (!R._emit[G]) {
              G++;
              continue;
            }
            const Xe = Tt.classNameAliases[R[G]] || R[G], Qt = F[G];
            Xe ? Mt(Qt, Xe) : (de = Qt, si(), de = ""), G++;
          }
        }
        function Ca(R, F) {
          return R.scope && typeof R.scope == "string" && Fe.openNode(Tt.classNameAliases[R.scope] || R.scope), R.beginScope && (R.beginScope._wrap ? (Mt(de, Tt.classNameAliases[R.beginScope._wrap] || R.beginScope._wrap), de = "") : R.beginScope._multi && (Oa(R.beginScope, F), de = "")), $ = Object.create(R, {
            parent: {
              value: $
            }
          }), $;
        }
        function Aa(R, F, G) {
          let le = A(R.endRe, G);
          if (le) {
            if (R["on:end"]) {
              const Xe = new e(R);
              R["on:end"](F, Xe), Xe.isMatchIgnored && (le = false);
            }
            if (le) {
              for (; R.endsParent && R.parent; ) R = R.parent;
              return R;
            }
          }
          if (R.endsWithParent) return Aa(R.parent, F, G);
        }
        function Mp(R) {
          return $.matcher.regexIndex === 0 ? (de += R[0], 1) : (Kr = true, 0);
        }
        function Tp(R) {
          const F = R[0], G = R.rule, le = new e(G), Xe = [
            G.__beforeBegin,
            G["on:begin"]
          ];
          for (const Qt of Xe) if (Qt && (Qt(R, le), le.isMatchIgnored)) return Mp(F);
          return G.skip ? de += F : (G.excludeBegin && (de += F), at(), !G.returnBegin && !G.excludeBegin && (de = F)), Ca(G, R), G.returnBegin ? 0 : F.length;
        }
        function Pp(R) {
          const F = R[0], G = H.substring(R.index), le = Aa($, R, G);
          if (!le) return xa;
          const Xe = $;
          $.endScope && $.endScope._wrap ? (at(), Mt(F, $.endScope._wrap)) : $.endScope && $.endScope._multi ? (at(), Oa($.endScope, R)) : Xe.skip ? de += F : (Xe.returnEnd || Xe.excludeEnd || (de += F), at(), Xe.excludeEnd && (de = F));
          do
            $.scope && Fe.closeNode(), !$.skip && !$.subLanguage && (fs += $.relevance), $ = $.parent;
          while ($ !== le.parent);
          return le.starts && Ca(le.starts, R), Xe.returnEnd ? 0 : F.length;
        }
        function Dp() {
          const R = [];
          for (let F = $; F !== Tt; F = F.parent) F.scope && R.unshift(F.scope);
          R.forEach((F) => Fe.openNode(F));
        }
        let cs = {};
        function Ma(R, F) {
          const G = F && F[0];
          if (de += R, G == null) return at(), 0;
          if (cs.type === "begin" && F.type === "end" && cs.index === F.index && G === "") {
            if (de += H.slice(F.index, F.index + 1), !we) {
              const le = new Error(`0 width match regex (${T})`);
              throw le.languageName = T, le.badRule = cs.rule, le;
            }
            return 1;
          }
          if (cs = F, F.type === "begin") return Tp(F);
          if (F.type === "illegal" && !ee) {
            const le = new Error('Illegal lexeme "' + G + '" for mode "' + ($.scope || "<unnamed>") + '"');
            throw le.mode = $, le;
          } else if (F.type === "end") {
            const le = Pp(F);
            if (le !== xa) return le;
          }
          if (F.type === "illegal" && G === "") return de += `
`, 1;
          if (jr > 1e5 && jr > F.index * 3) throw new Error("potential infinite loop, way more iterations than matches");
          return de += G, G.length;
        }
        const Tt = ni(T);
        if (!Tt) throw vi(ke.replace("{}", T)), new Error('Unknown language: "' + T + '"');
        const Rp = fp(Tt);
        let $r = "", $ = ue || Rp;
        const Ta = {}, Fe = new _.__emitter(_);
        Dp();
        let de = "", fs = 0, Si = 0, jr = 0, Kr = false;
        try {
          if (Tt.__emitTokens) Tt.__emitTokens(H, Fe);
          else {
            for ($.matcher.considerAll(); ; ) {
              jr++, Kr ? Kr = false : $.matcher.considerAll(), $.matcher.lastIndex = Si;
              const R = $.matcher.exec(H);
              if (!R) break;
              const F = H.substring(Si, R.index), G = Ma(F, R);
              Si = R.index + G;
            }
            Ma(H.substring(Si));
          }
          return Fe.finalize(), $r = Fe.toHTML(), {
            language: T,
            value: $r,
            relevance: fs,
            illegal: false,
            _emitter: Fe,
            _top: $
          };
        } catch (R) {
          if (R.message && R.message.includes("Illegal")) return {
            language: T,
            value: Qr(H),
            illegal: true,
            relevance: 0,
            _illegalBy: {
              message: R.message,
              index: Si,
              context: H.slice(Si - 100, Si + 100),
              mode: R.mode,
              resultSoFar: $r
            },
            _emitter: Fe
          };
          if (we) return {
            language: T,
            value: Qr(H),
            illegal: false,
            relevance: 0,
            errorRaised: R,
            _emitter: Fe,
            _top: $
          };
          throw R;
        }
      }
      function qr(T) {
        const H = {
          value: Qr(T),
          illegal: false,
          relevance: 0,
          _top: N,
          _emitter: new _.__emitter(_)
        };
        return H._emitter.addText(T), H;
      }
      function Xr(T, H) {
        H = H || _.languages || Object.keys(k);
        const ee = qr(T), ue = H.filter(ni).filter(Sa).map((at) => mn(at, T, false));
        ue.unshift(ee);
        const Pe = ue.sort((at, Mt) => {
          if (at.relevance !== Mt.relevance) return Mt.relevance - at.relevance;
          if (at.language && Mt.language) {
            if (ni(at.language).supersetOf === Mt.language) return 1;
            if (ni(Mt.language).supersetOf === at.language) return -1;
          }
          return 0;
        }), [kt, si] = Pe, hs = kt;
        return hs.secondBest = si, hs;
      }
      function mp(T, H, ee) {
        const ue = H && D[H] || ee;
        T.classList.add("hljs"), T.classList.add(`language-${ue}`);
      }
      function Ur(T) {
        let H = null;
        const ee = Be(T);
        if (q(ee)) return;
        if (as("before:highlightElement", {
          el: T,
          language: ee
        }), T.dataset.highlighted) {
          console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", T);
          return;
        }
        if (T.children.length > 0 && (_.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(T)), _.throwUnescapedHTML)) throw new pp("One of your code blocks includes unescaped HTML.", T.innerHTML);
        H = T;
        const ue = H.textContent, Pe = ee ? Ce(ue, {
          language: ee,
          ignoreIllegals: true
        }) : Xr(ue);
        T.innerHTML = Pe.value, T.dataset.highlighted = "yes", mp(T, ee, Pe.language), T.result = {
          language: Pe.language,
          re: Pe.relevance,
          relevance: Pe.relevance
        }, Pe.secondBest && (T.secondBest = {
          language: Pe.secondBest.language,
          relevance: Pe.secondBest.relevance
        }), as("after:highlightElement", {
          el: T,
          result: Pe,
          text: ue
        });
      }
      function bp(T) {
        _ = ya(_, T);
      }
      const yp = () => {
        ls(), zi("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
      };
      function xp() {
        ls(), zi("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
      }
      let ka = false;
      function ls() {
        function T() {
          ls();
        }
        if (document.readyState === "loading") {
          ka || window.addEventListener("DOMContentLoaded", T, false), ka = true;
          return;
        }
        document.querySelectorAll(_.cssSelector).forEach(Ur);
      }
      function wp(T, H) {
        let ee = null;
        try {
          ee = H(m);
        } catch (ue) {
          if (vi("Language definition for '{}' could not be registered.".replace("{}", T)), we) vi(ue);
          else throw ue;
          ee = N;
        }
        ee.name || (ee.name = T), k[T] = ee, ee.rawDefinition = H.bind(null, m), ee.aliases && va(ee.aliases, {
          languageName: T
        });
      }
      function kp(T) {
        delete k[T];
        for (const H of Object.keys(D)) D[H] === T && delete D[H];
      }
      function vp() {
        return Object.keys(k);
      }
      function ni(T) {
        return T = (T || "").toLowerCase(), k[T] || k[D[T]];
      }
      function va(T, { languageName: H }) {
        typeof T == "string" && (T = [
          T
        ]), T.forEach((ee) => {
          D[ee.toLowerCase()] = H;
        });
      }
      function Sa(T) {
        const H = ni(T);
        return H && !H.disableAutodetect;
      }
      function Sp(T) {
        T["before:highlightBlock"] && !T["before:highlightElement"] && (T["before:highlightElement"] = (H) => {
          T["before:highlightBlock"](Object.assign({
            block: H.el
          }, H));
        }), T["after:highlightBlock"] && !T["after:highlightElement"] && (T["after:highlightElement"] = (H) => {
          T["after:highlightBlock"](Object.assign({
            block: H.el
          }, H));
        });
      }
      function Op(T) {
        Sp(T), X.push(T);
      }
      function Cp(T) {
        const H = X.indexOf(T);
        H !== -1 && X.splice(H, 1);
      }
      function as(T, H) {
        const ee = T;
        X.forEach(function(ue) {
          ue[ee] && ue[ee](H);
        });
      }
      function Ap(T) {
        return zi("10.7.0", "highlightBlock will be removed entirely in v12.0"), zi("10.7.0", "Please use highlightElement now."), Ur(T);
      }
      Object.assign(m, {
        highlight: Ce,
        highlightAuto: Xr,
        highlightAll: ls,
        highlightElement: Ur,
        highlightBlock: Ap,
        configure: bp,
        initHighlighting: yp,
        initHighlightingOnLoad: xp,
        registerLanguage: wp,
        unregisterLanguage: kp,
        listLanguages: vp,
        getLanguage: ni,
        registerAliases: va,
        autoDetection: Sa,
        inherit: ya,
        addPlugin: Op,
        removePlugin: Cp
      }), m.debugMode = function() {
        we = false;
      }, m.safeMode = function() {
        we = true;
      }, m.versionString = dp, m.regex = {
        concat: g,
        lookahead: u,
        either: y,
        optional: p,
        anyNumberOfTimes: d
      };
      for (const T in rs) typeof rs[T] == "object" && n(rs[T]);
      return Object.assign(m, rs), m;
    }, Vi = wa({});
    return Vi.newInstance = () => wa({}), Yr = Vi, Vi.HighlightJS = Vi, Vi.default = Vi, Yr;
  }
  var Mg = Ag();
  const La = Cg(Mg);
  var Tg = xt("<pre><code><!></code></pre>");
  function Pg(n, e) {
    let t = ve(e, "languageName", 3, "plaintext"), i = ve(e, "langtag", 3, false), s = Fc(e, [
      "$$slots",
      "$$events",
      "$$legacy",
      "code",
      "highlighted",
      "languageName",
      "langtag",
      "preClass"
    ]);
    var r = Tg();
    Hc(r, () => ({
      class: `${e.preClass ?? ""} ${i() ? "langtag" : ""}`,
      "data-language": t(),
      ...s
    }), void 0, "svelte-h24d32");
    var o = We(r);
    li(o, 1, "", null, {}, {
      hljs: true
    });
    var l = We(o);
    {
      var a = (c) => {
        var f = Nc(), u = Pl(f);
        Wc(u, () => e.highlighted), $e(c, f);
      }, h = (c) => {
        var f = Ic();
        Li(() => Ln(f, e.code)), $e(c, f);
      };
      ci(l, (c) => {
        e.highlighted ? c(a) : c(h, false);
      });
    }
    Le(o), Le(r), $e(n, r);
  }
  var Dg = xt("<div></div>"), Rg = xt("<div></div>"), Eg = xt("<tr><td><code> </code> <!></td><td><pre><code><!></code></pre> <!></td></tr>"), Bg = xt("<div><table><tbody></tbody></table></div>"), Lg = xt(`<style>pre {
			margin: 0;
		}

		table,
		tr,
		td {
			padding: 0;
			border: 0;
			margin: 0;
			vertical-align: baseline;
		}

		table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0;
		}

		tr:first-of-type td {
			padding-top: 1em;
		}

		tr:last-child td {
			padding-bottom: 1em;
		}

		tr td:first-of-type {
			z-index: 2;
		}

		td {
			padding-left: var(--padding-left, 1em);
			padding-right: var(--padding-right, 1em);
		}

		td.hljs:not(.hideBorder):after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 1px;
			height: 100%;
			background: var(--border-color, currentColor);
		}

		.wrapLines {
			white-space: pre-wrap;
		}

		td,
		td > code,
		pre {
			position: relative;
		}

		td > code,
		pre {
			z-index: 1;
		}

		.line-background {
			position: absolute;
			z-index: 0;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		tr:first-of-type td .line-background,
		tr:last-of-type td .line-background {
			height: calc(100% - 1em);
		}

		tr:first-of-type td .line-background {
			top: 1em;
		}

		tr:last-of-type td .line-background {
			bottom: 1em;
		}</style>`), _g = xt("<!> <!>", 1);
  function Ng(n, e) {
    Dl(e, true);
    let t = ve(e, "code", 3, ""), i = ve(e, "langtag", 3, false), s = ve(e, "startingLineNumber", 3, 1), r = ve(e, "highlightedLines", 19, () => []), o = ve(e, "position", 3, "sticky"), l = Fc(e, [
      "$$slots",
      "$$events",
      "$$legacy",
      "numberLine",
      "language",
      "code",
      "langtag",
      "hideBorder",
      "wrapLines",
      "startingLineNumber",
      "highlightedLines",
      "backgroudColor",
      "position"
    ]);
    const a = 12, h = 2;
    La.registerLanguage(e.language.name, e.language.register);
    let c = qt(() => La.highlight(t(), {
      language: e.language.name
    }).value), f = qt(() => K(c).split(`
`)), u = qt(() => K(f).length.toString().length), d = qt(() => K(u) - h < 1 ? h : K(u)), p = qt(() => K(d) * a);
    var g = _g(), b = Pl(g);
    {
      var y = (w) => {
        var O = Bg();
        Hc(O, () => ({
          ...l,
          [eg]: {
            "overflow-x": "auto"
          }
        }));
        var M = We(O), W = We(M);
        li(W, 1, "", null, {}, {
          hljs: true
        }), Jp(W, 21, () => K(f), Zp, (U, te, V) => {
          var I = Eg();
          const J = qt(() => V + s());
          var Q = We(I);
          let ne, xe;
          var be = We(Q);
          gs(be, "", {}, {
            color: "var(--line-number-color, currentColor)"
          });
          var Te = We(be, true);
          Le(be);
          var ye = Ti(be, 2);
          {
            var Ee = (et) => {
              var Ie = Dg();
              li(Ie, 1, "", null, {}, {
                "line-background": true
              }), gs(Ie, "", {}, {
                background: "var(--highlighted-background, rgba(254, 241, 96, 0.2))"
              }), $e(et, Ie);
            };
            ci(ye, (et) => {
              r().includes(V) && et(Ee);
            });
          }
          Le(Q);
          var Z = Ti(Q), se = We(Z);
          let fe;
          var qe = We(se), lt = We(qe);
          Wc(lt, () => K(te) || `
`), Le(qe), Le(se);
          var At = Ti(se, 2);
          {
            var ii = (et) => {
              var Ie = Rg();
              li(Ie, 1, "", null, {}, {
                "line-background": true
              }), gs(Ie, "", {}, {
                background: "var(--highlighted-background, rgba(254, 241, 96, 0.2))"
              }), $e(et, Ie);
            };
            ci(At, (et) => {
              r().includes(V) && et(ii);
            });
          }
          Le(Z), Le(I), Li((et, Ie) => {
            ne = li(Q, 1, "", null, ne, et), xe = gs(Q, "", xe, {
              position: o(),
              left: "0",
              "text-align": "right",
              "user-select": "none",
              width: K(p) + "px",
              "background-color": e.backgroudColor
            }), Ln(Te, K(J)), fe = li(se, 1, "", null, fe, Ie);
          }, [
            () => ({
              hljs: true,
              hideBorder: e.hideBorder
            }),
            () => ({
              wrapLines: e.wrapLines
            })
          ]), $e(U, I);
        }), Le(W), Le(M), Le(O), $e(w, O);
      }, S = (w) => {
        Pg(w, Up(() => l, {
          get languageName() {
            return e.language.name;
          },
          get langtag() {
            return i();
          },
          get highlighted() {
            return K(c);
          },
          get code() {
            return t();
          }
        }));
      };
      ci(b, (w) => {
        e.numberLine ? w(y) : w(S, false);
      });
    }
    var A = Ti(b, 2);
    {
      var C = (w) => {
        var O = Lg();
        $e(w, O);
      };
      ci(A, (w) => {
        e.numberLine && w(C);
      });
    }
    $e(n, g), Rl();
  }
  let Po = [], qc = [];
  (() => {
    let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
    for (let e = 0, t = 0; e < n.length; e++) (e % 2 ? qc : Po).push(t = t + n[e]);
  })();
  function Ig(n) {
    if (n < 768) return false;
    for (let e = 0, t = Po.length; ; ) {
      let i = e + t >> 1;
      if (n < Po[i]) t = i;
      else if (n >= qc[i]) e = i + 1;
      else return true;
      if (e == t) return false;
    }
  }
  function _a(n) {
    return n >= 127462 && n <= 127487;
  }
  const Na = 8205;
  function Fg(n, e, t = true, i = true) {
    return (t ? Xc : Hg)(n, e, i);
  }
  function Xc(n, e, t) {
    if (e == n.length) return e;
    e && Uc(n.charCodeAt(e)) && $c(n.charCodeAt(e - 1)) && e--;
    let i = Jr(n, e);
    for (e += Ia(i); e < n.length; ) {
      let s = Jr(n, e);
      if (i == Na || s == Na || t && Ig(s)) e += Ia(s), i = s;
      else if (_a(s)) {
        let r = 0, o = e - 2;
        for (; o >= 0 && _a(Jr(n, o)); ) r++, o -= 2;
        if (r % 2 == 0) break;
        e += 2;
      } else break;
    }
    return e;
  }
  function Hg(n, e, t) {
    for (; e > 0; ) {
      let i = Xc(n, e - 2, t);
      if (i < e) return i;
      e--;
    }
    return 0;
  }
  function Jr(n, e) {
    let t = n.charCodeAt(e);
    if (!$c(t) || e + 1 == n.length) return t;
    let i = n.charCodeAt(e + 1);
    return Uc(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
  }
  function Uc(n) {
    return n >= 56320 && n < 57344;
  }
  function $c(n) {
    return n >= 55296 && n < 56320;
  }
  function Ia(n) {
    return n < 65536 ? 1 : 2;
  }
  class oe {
    lineAt(e) {
      if (e < 0 || e > this.length) throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
      return this.lineInner(e, false, 1, 0);
    }
    line(e) {
      if (e < 1 || e > this.lines) throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
      return this.lineInner(e, true, 1, 0);
    }
    replace(e, t, i) {
      [e, t] = sn(this, e, t);
      let s = [];
      return this.decompose(0, e, s, 2), i.length && i.decompose(0, i.length, s, 3), this.decompose(t, this.length, s, 1), Bt.from(s, this.length - (t - e) + i.length);
    }
    append(e) {
      return this.replace(this.length, this.length, e);
    }
    slice(e, t = this.length) {
      [e, t] = sn(this, e, t);
      let i = [];
      return this.decompose(e, t, i, 0), Bt.from(i, t - e);
    }
    eq(e) {
      if (e == this) return true;
      if (e.length != this.length || e.lines != this.lines) return false;
      let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), s = new Mn(this), r = new Mn(e);
      for (let o = t, l = t; ; ) {
        if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value) return false;
        if (l += s.value.length, s.done || l >= i) return true;
      }
    }
    iter(e = 1) {
      return new Mn(this, e);
    }
    iterRange(e, t = this.length) {
      return new jc(this, e, t);
    }
    iterLines(e, t) {
      let i;
      if (e == null) i = this.iter();
      else {
        t == null && (t = this.lines + 1);
        let s = this.line(e).from;
        i = this.iterRange(s, Math.max(s, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
      }
      return new Kc(i);
    }
    toString() {
      return this.sliceString(0);
    }
    toJSON() {
      let e = [];
      return this.flatten(e), e;
    }
    constructor() {
    }
    static of(e) {
      if (e.length == 0) throw new RangeError("A document must have at least one line");
      return e.length == 1 && !e[0] ? oe.empty : e.length <= 32 ? new Se(e) : Bt.from(Se.split(e, []));
    }
  }
  class Se extends oe {
    constructor(e, t = Wg(e)) {
      super(), this.text = e, this.length = t;
    }
    get lines() {
      return this.text.length;
    }
    get children() {
      return null;
    }
    lineInner(e, t, i, s) {
      for (let r = 0; ; r++) {
        let o = this.text[r], l = s + o.length;
        if ((t ? i : l) >= e) return new zg(s, l, i, o);
        s = l + 1, i++;
      }
    }
    decompose(e, t, i, s) {
      let r = e <= 0 && t >= this.length ? this : new Se(Fa(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
      if (s & 1) {
        let o = i.pop(), l = Qs(r.text, o.text.slice(), 0, r.length);
        if (l.length <= 32) i.push(new Se(l, o.length + r.length));
        else {
          let a = l.length >> 1;
          i.push(new Se(l.slice(0, a)), new Se(l.slice(a)));
        }
      } else i.push(r);
    }
    replace(e, t, i) {
      if (!(i instanceof Se)) return super.replace(e, t, i);
      [e, t] = sn(this, e, t);
      let s = Qs(this.text, Qs(i.text, Fa(this.text, 0, e)), t), r = this.length + i.length - (t - e);
      return s.length <= 32 ? new Se(s, r) : Bt.from(Se.split(s, []), r);
    }
    sliceString(e, t = this.length, i = `
`) {
      [e, t] = sn(this, e, t);
      let s = "";
      for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
        let l = this.text[o], a = r + l.length;
        r > e && o && (s += i), e < a && t > r && (s += l.slice(Math.max(0, e - r), t - r)), r = a + 1;
      }
      return s;
    }
    flatten(e) {
      for (let t of this.text) e.push(t);
    }
    scanIdentical() {
      return 0;
    }
    static split(e, t) {
      let i = [], s = -1;
      for (let r of e) i.push(r), s += r.length + 1, i.length == 32 && (t.push(new Se(i, s)), i = [], s = -1);
      return s > -1 && t.push(new Se(i, s)), t;
    }
  }
  class Bt extends oe {
    constructor(e, t) {
      super(), this.children = e, this.length = t, this.lines = 0;
      for (let i of e) this.lines += i.lines;
    }
    lineInner(e, t, i, s) {
      for (let r = 0; ; r++) {
        let o = this.children[r], l = s + o.length, a = i + o.lines - 1;
        if ((t ? a : l) >= e) return o.lineInner(e, t, i, s);
        s = l + 1, i = a + 1;
      }
    }
    decompose(e, t, i, s) {
      for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
        let l = this.children[r], a = o + l.length;
        if (e <= a && t >= o) {
          let h = s & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
          o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
        }
        o = a + 1;
      }
    }
    replace(e, t, i) {
      if ([e, t] = sn(this, e, t), i.lines < this.lines) for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[s] = a, new Bt(c, this.length - (t - e) + i.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
      return super.replace(e, t, i);
    }
    sliceString(e, t = this.length, i = `
`) {
      [e, t] = sn(this, e, t);
      let s = "";
      for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
        let l = this.children[r], a = o + l.length;
        o > e && r && (s += i), e < a && t > o && (s += l.sliceString(e - o, t - o, i)), o = a + 1;
      }
      return s;
    }
    flatten(e) {
      for (let t of this.children) t.flatten(e);
    }
    scanIdentical(e, t) {
      if (!(e instanceof Bt)) return 0;
      let i = 0, [s, r, o, l] = t > 0 ? [
        0,
        0,
        this.children.length,
        e.children.length
      ] : [
        this.children.length - 1,
        e.children.length - 1,
        -1,
        -1
      ];
      for (; ; s += t, r += t) {
        if (s == o || r == l) return i;
        let a = this.children[s], h = e.children[r];
        if (a != h) return i + a.scanIdentical(h, t);
        i += a.length + 1;
      }
    }
    static from(e, t = e.reduce((i, s) => i + s.length + 1, -1)) {
      let i = 0;
      for (let d of e) i += d.lines;
      if (i < 32) {
        let d = [];
        for (let p of e) p.flatten(d);
        return new Se(d, t);
      }
      let s = Math.max(32, i >> 5), r = s << 1, o = s >> 1, l = [], a = 0, h = -1, c = [];
      function f(d) {
        let p;
        if (d.lines > r && d instanceof Bt) for (let g of d.children) f(g);
        else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof Se && a && (p = c[c.length - 1]) instanceof Se && d.lines + p.lines <= 32 ? (a += d.lines, h += d.length + 1, c[c.length - 1] = new Se(p.text.concat(d.text), p.length + 1 + d.length)) : (a + d.lines > s && u(), a += d.lines, h += d.length + 1, c.push(d));
      }
      function u() {
        a != 0 && (l.push(c.length == 1 ? c[0] : Bt.from(c, h)), h = -1, a = c.length = 0);
      }
      for (let d of e) f(d);
      return u(), l.length == 1 ? l[0] : new Bt(l, t);
    }
  }
  oe.empty = new Se([
    ""
  ], 0);
  function Wg(n) {
    let e = -1;
    for (let t of n) e += t.length + 1;
    return e;
  }
  function Qs(n, e, t = 0, i = 1e9) {
    for (let s = 0, r = 0, o = true; r < n.length && s <= i; r++) {
      let l = n[r], a = s + l.length;
      a >= t && (a > i && (l = l.slice(0, i - s)), s < t && (l = l.slice(t - s)), o ? (e[e.length - 1] += l, o = false) : e.push(l)), s = a + 1;
    }
    return e;
  }
  function Fa(n, e, t) {
    return Qs(n, [
      ""
    ], e, t);
  }
  class Mn {
    constructor(e, t = 1) {
      this.dir = t, this.done = false, this.lineBreak = false, this.value = "", this.nodes = [
        e
      ], this.offsets = [
        t > 0 ? 1 : (e instanceof Se ? e.text.length : e.children.length) << 1
      ];
    }
    nextInner(e, t) {
      for (this.done = this.lineBreak = false; ; ) {
        let i = this.nodes.length - 1, s = this.nodes[i], r = this.offsets[i], o = r >> 1, l = s instanceof Se ? s.text.length : s.children.length;
        if (o == (t > 0 ? l : 0)) {
          if (i == 0) return this.done = true, this.value = "", this;
          t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
        } else if ((r & 1) == (t > 0 ? 0 : 1)) {
          if (this.offsets[i] += t, e == 0) return this.lineBreak = true, this.value = `
`, this;
          e--;
        } else if (s instanceof Se) {
          let a = s.text[o + (t < 0 ? -1 : 0)];
          if (this.offsets[i] += t, a.length > Math.max(0, e)) return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
          e -= a.length;
        } else {
          let a = s.children[o + (t < 0 ? -1 : 0)];
          e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof Se ? a.text.length : a.children.length) << 1));
        }
      }
    }
    next(e = 0) {
      return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
    }
  }
  class jc {
    constructor(e, t, i) {
      this.value = "", this.done = false, this.cursor = new Mn(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
    }
    nextInner(e, t) {
      if (t < 0 ? this.pos <= this.from : this.pos >= this.to) return this.value = "", this.done = true, this;
      e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
      let i = t < 0 ? this.pos - this.from : this.to - this.pos;
      e > i && (e = i), i -= e;
      let { value: s } = this.cursor.next(e);
      return this.pos += (s.length + e) * t, this.value = s.length <= i ? s : t < 0 ? s.slice(s.length - i) : s.slice(0, i), this.done = !this.value, this;
    }
    next(e = 0) {
      return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
    }
    get lineBreak() {
      return this.cursor.lineBreak && this.value != "";
    }
  }
  class Kc {
    constructor(e) {
      this.inner = e, this.afterBreak = true, this.value = "", this.done = false;
    }
    next(e = 0) {
      let { done: t, lineBreak: i, value: s } = this.inner.next(e);
      return t && this.afterBreak ? (this.value = "", this.afterBreak = false) : t ? (this.done = true, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = true, this.next()) : (this.value = s, this.afterBreak = false), this;
    }
    get lineBreak() {
      return false;
    }
  }
  typeof Symbol < "u" && (oe.prototype[Symbol.iterator] = function() {
    return this.iter();
  }, Mn.prototype[Symbol.iterator] = jc.prototype[Symbol.iterator] = Kc.prototype[Symbol.iterator] = function() {
    return this;
  });
  class zg {
    constructor(e, t, i, s) {
      this.from = e, this.to = t, this.number = i, this.text = s;
    }
    get length() {
      return this.to - this.from;
    }
  }
  function sn(n, e, t) {
    return e = Math.max(0, Math.min(n.length, e)), [
      e,
      Math.max(e, Math.min(n.length, t))
    ];
  }
  function Ve(n, e, t = true, i = true) {
    return Fg(n, e, t, i);
  }
  function Vg(n) {
    return n >= 56320 && n < 57344;
  }
  function Qg(n) {
    return n >= 55296 && n < 56320;
  }
  function tt(n, e) {
    let t = n.charCodeAt(e);
    if (!Qg(t) || e + 1 == n.length) return t;
    let i = n.charCodeAt(e + 1);
    return Vg(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
  }
  function El(n) {
    return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
  }
  function Lt(n) {
    return n < 65536 ? 1 : 2;
  }
  const Do = /\r\n?|\n/;
  var Ye = function(n) {
    return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
  }(Ye || (Ye = {}));
  class Ft {
    constructor(e) {
      this.sections = e;
    }
    get length() {
      let e = 0;
      for (let t = 0; t < this.sections.length; t += 2) e += this.sections[t];
      return e;
    }
    get newLength() {
      let e = 0;
      for (let t = 0; t < this.sections.length; t += 2) {
        let i = this.sections[t + 1];
        e += i < 0 ? this.sections[t] : i;
      }
      return e;
    }
    get empty() {
      return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
    }
    iterGaps(e) {
      for (let t = 0, i = 0, s = 0; t < this.sections.length; ) {
        let r = this.sections[t++], o = this.sections[t++];
        o < 0 ? (e(i, s, r), s += r) : s += o, i += r;
      }
    }
    iterChangedRanges(e, t = false) {
      Ro(this, e, t);
    }
    get invertedDesc() {
      let e = [];
      for (let t = 0; t < this.sections.length; ) {
        let i = this.sections[t++], s = this.sections[t++];
        s < 0 ? e.push(i, s) : e.push(s, i);
      }
      return new Ft(e);
    }
    composeDesc(e) {
      return this.empty ? e : e.empty ? this : Gc(this, e);
    }
    mapDesc(e, t = false) {
      return e.empty ? this : Eo(this, e, t);
    }
    mapPos(e, t = -1, i = Ye.Simple) {
      let s = 0, r = 0;
      for (let o = 0; o < this.sections.length; ) {
        let l = this.sections[o++], a = this.sections[o++], h = s + l;
        if (a < 0) {
          if (h > e) return r + (e - s);
          r += l;
        } else {
          if (i != Ye.Simple && h >= e && (i == Ye.TrackDel && s < e && h > e || i == Ye.TrackBefore && s < e || i == Ye.TrackAfter && h > e)) return null;
          if (h > e || h == e && t < 0 && !l) return e == s || t < 0 ? r : r + a;
          r += a;
        }
        s = h;
      }
      if (e > s) throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);
      return r;
    }
    touchesRange(e, t = e) {
      for (let i = 0, s = 0; i < this.sections.length && s <= t; ) {
        let r = this.sections[i++], o = this.sections[i++], l = s + r;
        if (o >= 0 && s <= t && l >= e) return s < e && l > t ? "cover" : true;
        s = l;
      }
      return false;
    }
    toString() {
      let e = "";
      for (let t = 0; t < this.sections.length; ) {
        let i = this.sections[t++], s = this.sections[t++];
        e += (e ? " " : "") + i + (s >= 0 ? ":" + s : "");
      }
      return e;
    }
    toJSON() {
      return this.sections;
    }
    static fromJSON(e) {
      if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number")) throw new RangeError("Invalid JSON representation of ChangeDesc");
      return new Ft(e);
    }
    static create(e) {
      return new Ft(e);
    }
  }
  class De extends Ft {
    constructor(e, t) {
      super(e), this.inserted = t;
    }
    apply(e) {
      if (this.length != e.length) throw new RangeError("Applying change set to a document with the wrong length");
      return Ro(this, (t, i, s, r, o) => e = e.replace(s, s + (i - t), o), false), e;
    }
    mapDesc(e, t = false) {
      return Eo(this, e, t, true);
    }
    invert(e) {
      let t = this.sections.slice(), i = [];
      for (let s = 0, r = 0; s < t.length; s += 2) {
        let o = t[s], l = t[s + 1];
        if (l >= 0) {
          t[s] = l, t[s + 1] = o;
          let a = s >> 1;
          for (; i.length < a; ) i.push(oe.empty);
          i.push(o ? e.slice(r, r + o) : oe.empty);
        }
        r += o;
      }
      return new De(t, i);
    }
    compose(e) {
      return this.empty ? e : e.empty ? this : Gc(this, e, true);
    }
    map(e, t = false) {
      return e.empty ? this : Eo(this, e, t, true);
    }
    iterChanges(e, t = false) {
      Ro(this, e, t);
    }
    get desc() {
      return Ft.create(this.sections);
    }
    filter(e) {
      let t = [], i = [], s = [], r = new _n(this);
      e: for (let o = 0, l = 0; ; ) {
        let a = o == e.length ? 1e9 : e[o++];
        for (; l < a || l == a && r.len == 0; ) {
          if (r.done) break e;
          let c = Math.min(r.len, a - l);
          Ue(s, c, -1);
          let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
          Ue(t, c, f), f > 0 && fi(i, t, r.text), r.forward(c), l += c;
        }
        let h = e[o++];
        for (; l < h; ) {
          if (r.done) break e;
          let c = Math.min(r.len, h - l);
          Ue(t, c, -1), Ue(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), l += c;
        }
      }
      return {
        changes: new De(t, i),
        filtered: Ft.create(s)
      };
    }
    toJSON() {
      let e = [];
      for (let t = 0; t < this.sections.length; t += 2) {
        let i = this.sections[t], s = this.sections[t + 1];
        s < 0 ? e.push(i) : s == 0 ? e.push([
          i
        ]) : e.push([
          i
        ].concat(this.inserted[t >> 1].toJSON()));
      }
      return e;
    }
    static of(e, t, i) {
      let s = [], r = [], o = 0, l = null;
      function a(c = false) {
        if (!c && !s.length) return;
        o < t && Ue(s, t - o, -1);
        let f = new De(s, r);
        l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
      }
      function h(c) {
        if (Array.isArray(c)) for (let f of c) h(f);
        else if (c instanceof De) {
          if (c.length != t) throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
          a(), l = l ? l.compose(c.map(l)) : c;
        } else {
          let { from: f, to: u = f, insert: d } = c;
          if (f > u || f < 0 || u > t) throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
          let p = d ? typeof d == "string" ? oe.of(d.split(i || Do)) : d : oe.empty, g = p.length;
          if (f == u && g == 0) return;
          f < o && a(), f > o && Ue(s, f - o, -1), Ue(s, u - f, g), fi(r, s, p), o = u;
        }
      }
      return h(e), a(!l), l;
    }
    static empty(e) {
      return new De(e ? [
        e,
        -1
      ] : [], []);
    }
    static fromJSON(e) {
      if (!Array.isArray(e)) throw new RangeError("Invalid JSON representation of ChangeSet");
      let t = [], i = [];
      for (let s = 0; s < e.length; s++) {
        let r = e[s];
        if (typeof r == "number") t.push(r, -1);
        else {
          if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string")) throw new RangeError("Invalid JSON representation of ChangeSet");
          if (r.length == 1) t.push(r[0], 0);
          else {
            for (; i.length < s; ) i.push(oe.empty);
            i[s] = oe.of(r.slice(1)), t.push(r[0], i[s].length);
          }
        }
      }
      return new De(t, i);
    }
    static createSet(e, t) {
      return new De(e, t);
    }
  }
  function Ue(n, e, t, i = false) {
    if (e == 0 && t <= 0) return;
    let s = n.length - 2;
    s >= 0 && t <= 0 && t == n[s + 1] ? n[s] += e : s >= 0 && e == 0 && n[s] == 0 ? n[s + 1] += t : i ? (n[s] += e, n[s + 1] += t) : n.push(e, t);
  }
  function fi(n, e, t) {
    if (t.length == 0) return;
    let i = e.length - 2 >> 1;
    if (i < n.length) n[n.length - 1] = n[n.length - 1].append(t);
    else {
      for (; n.length < i; ) n.push(oe.empty);
      n.push(t);
    }
  }
  function Ro(n, e, t) {
    let i = n.inserted;
    for (let s = 0, r = 0, o = 0; o < n.sections.length; ) {
      let l = n.sections[o++], a = n.sections[o++];
      if (a < 0) s += l, r += l;
      else {
        let h = s, c = r, f = oe.empty;
        for (; h += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); ) l = n.sections[o++], a = n.sections[o++];
        e(s, h, r, c, f), s = h, r = c;
      }
    }
  }
  function Eo(n, e, t, i = false) {
    let s = [], r = i ? [] : null, o = new _n(n), l = new _n(e);
    for (let a = -1; ; ) {
      if (o.done && l.len || l.done && o.len) throw new Error("Mismatched change set lengths");
      if (o.ins == -1 && l.ins == -1) {
        let h = Math.min(o.len, l.len);
        Ue(s, h, -1), o.forward(h), l.forward(h);
      } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
        let h = l.len;
        for (Ue(s, l.ins, -1); h; ) {
          let c = Math.min(o.len, h);
          o.ins >= 0 && a < o.i && o.len <= c && (Ue(s, 0, o.ins), r && fi(r, s, o.text), a = o.i), o.forward(c), h -= c;
        }
        l.next();
      } else if (o.ins >= 0) {
        let h = 0, c = o.len;
        for (; c; ) if (l.ins == -1) {
          let f = Math.min(c, l.len);
          h += f, c -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < c) c -= l.len, l.next();
        else break;
        Ue(s, h, a < o.i ? o.ins : 0), r && a < o.i && fi(r, s, o.text), a = o.i, o.forward(o.len - c);
      } else {
        if (o.done && l.done) return r ? De.createSet(s, r) : Ft.create(s);
        throw new Error("Mismatched change set lengths");
      }
    }
  }
  function Gc(n, e, t = false) {
    let i = [], s = t ? [] : null, r = new _n(n), o = new _n(e);
    for (let l = false; ; ) {
      if (r.done && o.done) return s ? De.createSet(i, s) : Ft.create(i);
      if (r.ins == 0) Ue(i, r.len, 0, l), r.next();
      else if (o.len == 0 && !o.done) Ue(i, 0, o.ins, l), s && fi(s, i, o.text), o.next();
      else {
        if (r.done || o.done) throw new Error("Mismatched change set lengths");
        {
          let a = Math.min(r.len2, o.len), h = i.length;
          if (r.ins == -1) {
            let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
            Ue(i, a, c, l), s && c && fi(s, i, o.text);
          } else o.ins == -1 ? (Ue(i, r.off ? 0 : r.len, a, l), s && fi(s, i, r.textBit(a))) : (Ue(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && fi(s, i, o.text));
          l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), r.forward2(a), o.forward(a);
        }
      }
    }
  }
  class _n {
    constructor(e) {
      this.set = e, this.i = 0, this.next();
    }
    next() {
      let { sections: e } = this.set;
      this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
    }
    get done() {
      return this.ins == -2;
    }
    get len2() {
      return this.ins < 0 ? this.len : this.ins;
    }
    get text() {
      let { inserted: e } = this.set, t = this.i - 2 >> 1;
      return t >= e.length ? oe.empty : e[t];
    }
    textBit(e) {
      let { inserted: t } = this.set, i = this.i - 2 >> 1;
      return i >= t.length && !e ? oe.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
    }
    forward(e) {
      e == this.len ? this.next() : (this.len -= e, this.off += e);
    }
    forward2(e) {
      this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
    }
  }
  class Pi {
    constructor(e, t, i) {
      this.from = e, this.to = t, this.flags = i;
    }
    get anchor() {
      return this.flags & 32 ? this.to : this.from;
    }
    get head() {
      return this.flags & 32 ? this.from : this.to;
    }
    get empty() {
      return this.from == this.to;
    }
    get assoc() {
      return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
    }
    get bidiLevel() {
      let e = this.flags & 7;
      return e == 7 ? null : e;
    }
    get goalColumn() {
      let e = this.flags >> 6;
      return e == 16777215 ? void 0 : e;
    }
    map(e, t = -1) {
      let i, s;
      return this.empty ? i = s = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), i == this.from && s == this.to ? this : new Pi(i, s, this.flags);
    }
    extend(e, t = e) {
      if (e <= this.anchor && t >= this.anchor) return v.range(e, t);
      let i = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
      return v.range(this.anchor, i);
    }
    eq(e, t = false) {
      return this.anchor == e.anchor && this.head == e.head && (!t || !this.empty || this.assoc == e.assoc);
    }
    toJSON() {
      return {
        anchor: this.anchor,
        head: this.head
      };
    }
    static fromJSON(e) {
      if (!e || typeof e.anchor != "number" || typeof e.head != "number") throw new RangeError("Invalid JSON representation for SelectionRange");
      return v.range(e.anchor, e.head);
    }
    static create(e, t, i) {
      return new Pi(e, t, i);
    }
  }
  class v {
    constructor(e, t) {
      this.ranges = e, this.mainIndex = t;
    }
    map(e, t = -1) {
      return e.empty ? this : v.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
    }
    eq(e, t = false) {
      if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex) return false;
      for (let i = 0; i < this.ranges.length; i++) if (!this.ranges[i].eq(e.ranges[i], t)) return false;
      return true;
    }
    get main() {
      return this.ranges[this.mainIndex];
    }
    asSingle() {
      return this.ranges.length == 1 ? this : new v([
        this.main
      ], 0);
    }
    addRange(e, t = true) {
      return v.create([
        e
      ].concat(this.ranges), t ? 0 : this.mainIndex + 1);
    }
    replaceRange(e, t = this.mainIndex) {
      let i = this.ranges.slice();
      return i[t] = e, v.create(i, this.mainIndex);
    }
    toJSON() {
      return {
        ranges: this.ranges.map((e) => e.toJSON()),
        main: this.mainIndex
      };
    }
    static fromJSON(e) {
      if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length) throw new RangeError("Invalid JSON representation for EditorSelection");
      return new v(e.ranges.map((t) => Pi.fromJSON(t)), e.main);
    }
    static single(e, t = e) {
      return new v([
        v.range(e, t)
      ], 0);
    }
    static create(e, t = 0) {
      if (e.length == 0) throw new RangeError("A selection needs at least one range");
      for (let i = 0, s = 0; s < e.length; s++) {
        let r = e[s];
        if (r.empty ? r.from <= i : r.from < i) return v.normalized(e.slice(), t);
        i = r.to;
      }
      return new v(e, t);
    }
    static cursor(e, t = 0, i, s) {
      return Pi.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (s ?? 16777215) << 6);
    }
    static range(e, t, i, s) {
      let r = (i ?? 16777215) << 6 | (s == null ? 7 : Math.min(6, s));
      return t < e ? Pi.create(t, e, 48 | r) : Pi.create(e, t, (t > e ? 8 : 0) | r);
    }
    static normalized(e, t = 0) {
      let i = e[t];
      e.sort((s, r) => s.from - r.from), t = e.indexOf(i);
      for (let s = 1; s < e.length; s++) {
        let r = e[s], o = e[s - 1];
        if (r.empty ? r.from <= o.to : r.from < o.to) {
          let l = o.from, a = Math.max(r.to, o.to);
          s <= t && t--, e.splice(--s, 2, r.anchor > r.head ? v.range(a, l) : v.range(l, a));
        }
      }
      return new v(e, t);
    }
  }
  function Yc(n, e) {
    for (let t of n.ranges) if (t.to > e) throw new RangeError("Selection points outside of document");
  }
  let Bl = 0;
  class B {
    constructor(e, t, i, s, r) {
      this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = s, this.id = Bl++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
    }
    get reader() {
      return this;
    }
    static define(e = {}) {
      return new B(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : Ll), !!e.static, e.enables);
    }
    of(e) {
      return new qs([], this, 0, e);
    }
    compute(e, t) {
      if (this.isStatic) throw new Error("Can't compute a static facet");
      return new qs(e, this, 1, t);
    }
    computeN(e, t) {
      if (this.isStatic) throw new Error("Can't compute a static facet");
      return new qs(e, this, 2, t);
    }
    from(e, t) {
      return t || (t = (i) => i), this.compute([
        e
      ], (i) => t(i.field(e)));
    }
  }
  function Ll(n, e) {
    return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
  }
  class qs {
    constructor(e, t, i, s) {
      this.dependencies = e, this.facet = t, this.type = i, this.value = s, this.id = Bl++;
    }
    dynamicSlot(e) {
      var t;
      let i = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, l = this.type == 2, a = false, h = false, c = [];
      for (let f of this.dependencies) f == "doc" ? a = true : f == "selection" ? h = true : (((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && c.push(e[f.id]);
      return {
        create(f) {
          return f.values[o] = i(f), 1;
        },
        update(f, u) {
          if (a && u.docChanged || h && (u.docChanged || u.selection) || Bo(f, c)) {
            let d = i(f);
            if (l ? !Ha(d, f.values[o], s) : !s(d, f.values[o])) return f.values[o] = d, 1;
          }
          return 0;
        },
        reconfigure: (f, u) => {
          let d, p = u.config.address[r];
          if (p != null) {
            let g = ir(u, p);
            if (this.dependencies.every((b) => b instanceof B ? u.facet(b) === f.facet(b) : b instanceof Qe ? u.field(b, false) == f.field(b, false) : true) || (l ? Ha(d = i(f), g, s) : s(d = i(f), g))) return f.values[o] = g, 0;
          } else d = i(f);
          return f.values[o] = d, 1;
        }
      };
    }
  }
  function Ha(n, e, t) {
    if (n.length != e.length) return false;
    for (let i = 0; i < n.length; i++) if (!t(n[i], e[i])) return false;
    return true;
  }
  function Bo(n, e) {
    let t = false;
    for (let i of e) Tn(n, i) & 1 && (t = true);
    return t;
  }
  function qg(n, e, t) {
    let i = t.map((a) => n[a.id]), s = t.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
    function l(a) {
      let h = [];
      for (let c = 0; c < i.length; c++) {
        let f = ir(a, i[c]);
        if (s[c] == 2) for (let u of f) h.push(u);
        else h.push(f);
      }
      return e.combine(h);
    }
    return {
      create(a) {
        for (let h of i) Tn(a, h);
        return a.values[o] = l(a), 1;
      },
      update(a, h) {
        if (!Bo(a, r)) return 0;
        let c = l(a);
        return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
      },
      reconfigure(a, h) {
        let c = Bo(a, i), f = h.config.facets[e.id], u = h.facet(e);
        if (f && !c && Ll(t, f)) return a.values[o] = u, 0;
        let d = l(a);
        return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
      }
    };
  }
  const bs = B.define({
    static: true
  });
  class Qe {
    constructor(e, t, i, s, r) {
      this.id = e, this.createF = t, this.updateF = i, this.compareF = s, this.spec = r, this.provides = void 0;
    }
    static define(e) {
      let t = new Qe(Bl++, e.create, e.update, e.compare || ((i, s) => i === s), e);
      return e.provide && (t.provides = e.provide(t)), t;
    }
    create(e) {
      let t = e.facet(bs).find((i) => i.field == this);
      return ((t == null ? void 0 : t.create) || this.createF)(e);
    }
    slot(e) {
      let t = e[this.id] >> 1;
      return {
        create: (i) => (i.values[t] = this.create(i), 1),
        update: (i, s) => {
          let r = i.values[t], o = this.updateF(r, s);
          return this.compareF(r, o) ? 0 : (i.values[t] = o, 1);
        },
        reconfigure: (i, s) => {
          let r = i.facet(bs), o = s.facet(bs), l;
          return (l = r.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : s.config.address[this.id] != null ? (i.values[t] = s.field(this), 0) : (i.values[t] = this.create(i), 1);
        }
      };
    }
    init(e) {
      return [
        this,
        bs.of({
          field: this,
          create: e
        })
      ];
    }
    get extension() {
      return this;
    }
  }
  const Ci = {
    lowest: 4,
    low: 3,
    default: 2,
    high: 1,
    highest: 0
  };
  function bn(n) {
    return (e) => new Jc(e, n);
  }
  const Wi = {
    highest: bn(Ci.highest),
    high: bn(Ci.high),
    default: bn(Ci.default),
    low: bn(Ci.low),
    lowest: bn(Ci.lowest)
  };
  class Jc {
    constructor(e, t) {
      this.inner = e, this.prec = t;
    }
  }
  class Pr {
    of(e) {
      return new Lo(this, e);
    }
    reconfigure(e) {
      return Pr.reconfigure.of({
        compartment: this,
        extension: e
      });
    }
    get(e) {
      return e.config.compartments.get(this);
    }
  }
  class Lo {
    constructor(e, t) {
      this.compartment = e, this.inner = t;
    }
  }
  class tr {
    constructor(e, t, i, s, r, o) {
      for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; ) this.statusTemplate.push(0);
    }
    staticFacet(e) {
      let t = this.address[e.id];
      return t == null ? e.default : this.staticValues[t >> 1];
    }
    static resolve(e, t, i) {
      let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
      for (let u of Xg(e, t, o)) u instanceof Qe ? s.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
      let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
      for (let u of s) l[u.id] = h.length << 1, h.push((d) => u.slot(d));
      let c = i == null ? void 0 : i.config.facets;
      for (let u in r) {
        let d = r[u], p = d[0].facet, g = c && c[u] || [];
        if (d.every((b) => b.type == 0)) if (l[p.id] = a.length << 1 | 1, Ll(g, d)) a.push(i.facet(p));
        else {
          let b = p.combine(d.map((y) => y.value));
          a.push(i && p.compare(b, i.facet(p)) ? i.facet(p) : b);
        }
        else {
          for (let b of d) b.type == 0 ? (l[b.id] = a.length << 1 | 1, a.push(b.value)) : (l[b.id] = h.length << 1, h.push((y) => b.dynamicSlot(y)));
          l[p.id] = h.length << 1, h.push((b) => qg(b, p, d));
        }
      }
      let f = h.map((u) => u(l));
      return new tr(e, o, f, l, a, r);
    }
  }
  function Xg(n, e, t) {
    let i = [
      [],
      [],
      [],
      [],
      []
    ], s = /* @__PURE__ */ new Map();
    function r(o, l) {
      let a = s.get(o);
      if (a != null) {
        if (a <= l) return;
        let h = i[a].indexOf(o);
        h > -1 && i[a].splice(h, 1), o instanceof Lo && t.delete(o.compartment);
      }
      if (s.set(o, l), Array.isArray(o)) for (let h of o) r(h, l);
      else if (o instanceof Lo) {
        if (t.has(o.compartment)) throw new RangeError("Duplicate use of compartment in extensions");
        let h = e.get(o.compartment) || o.inner;
        t.set(o.compartment, h), r(h, l);
      } else if (o instanceof Jc) r(o.inner, o.prec);
      else if (o instanceof Qe) i[l].push(o), o.provides && r(o.provides, l);
      else if (o instanceof qs) i[l].push(o), o.facet.extensions && r(o.facet.extensions, Ci.default);
      else {
        let h = o.extension;
        if (!h) throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
        r(h, l);
      }
    }
    return r(n, Ci.default), i.reduce((o, l) => o.concat(l));
  }
  function Tn(n, e) {
    if (e & 1) return 2;
    let t = e >> 1, i = n.status[t];
    if (i == 4) throw new Error("Cyclic dependency between fields and/or facets");
    if (i & 2) return i;
    n.status[t] = 4;
    let s = n.computeSlot(n, n.config.dynamicSlots[t]);
    return n.status[t] = 2 | s;
  }
  function ir(n, e) {
    return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
  }
  const Zc = B.define(), _o = B.define({
    combine: (n) => n.some((e) => e),
    static: true
  }), ef = B.define({
    combine: (n) => n.length ? n[0] : void 0,
    static: true
  }), tf = B.define(), nf = B.define(), sf = B.define(), rf = B.define({
    combine: (n) => n.length ? n[0] : false
  });
  class ei {
    constructor(e, t) {
      this.type = e, this.value = t;
    }
    static define() {
      return new Ug();
    }
  }
  class Ug {
    of(e) {
      return new ei(this, e);
    }
  }
  class $g {
    constructor(e) {
      this.map = e;
    }
    of(e) {
      return new j(this, e);
    }
  }
  class j {
    constructor(e, t) {
      this.type = e, this.value = t;
    }
    map(e) {
      let t = this.type.map(this.value, e);
      return t === void 0 ? void 0 : t == this.value ? this : new j(this.type, t);
    }
    is(e) {
      return this.type == e;
    }
    static define(e = {}) {
      return new $g(e.map || ((t) => t));
    }
    static mapEffects(e, t) {
      if (!e.length) return e;
      let i = [];
      for (let s of e) {
        let r = s.map(t);
        r && i.push(r);
      }
      return i;
    }
  }
  j.reconfigure = j.define();
  j.appendConfig = j.define();
  class Re {
    constructor(e, t, i, s, r, o) {
      this.startState = e, this.changes = t, this.selection = i, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && Yc(i, t.newLength), r.some((l) => l.type == Re.time) || (this.annotations = r.concat(Re.time.of(Date.now())));
    }
    static create(e, t, i, s, r, o) {
      return new Re(e, t, i, s, r, o);
    }
    get newDoc() {
      return this._doc || (this._doc = this.changes.apply(this.startState.doc));
    }
    get newSelection() {
      return this.selection || this.startState.selection.map(this.changes);
    }
    get state() {
      return this._state || this.startState.applyTransaction(this), this._state;
    }
    annotation(e) {
      for (let t of this.annotations) if (t.type == e) return t.value;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get reconfigured() {
      return this.startState.config != this.state.config;
    }
    isUserEvent(e) {
      let t = this.annotation(Re.userEvent);
      return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
    }
  }
  Re.time = ei.define();
  Re.userEvent = ei.define();
  Re.addToHistory = ei.define();
  Re.remote = ei.define();
  function jg(n, e) {
    let t = [];
    for (let i = 0, s = 0; ; ) {
      let r, o;
      if (i < n.length && (s == e.length || e[s] >= n[i])) r = n[i++], o = n[i++];
      else if (s < e.length) r = e[s++], o = e[s++];
      else return t;
      !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
    }
  }
  function of(n, e, t) {
    var i;
    let s, r, o;
    return t ? (s = e.changes, r = De.empty(e.changes.length), o = n.changes.compose(e.changes)) : (s = e.changes.map(n.changes), r = n.changes.mapDesc(e.changes, true), o = n.changes.compose(s)), {
      changes: o,
      selection: e.selection ? e.selection.map(r) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(s),
      effects: j.mapEffects(n.effects, s).concat(j.mapEffects(e.effects, r)),
      annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
      scrollIntoView: n.scrollIntoView || e.scrollIntoView
    };
  }
  function No(n, e, t) {
    let i = e.selection, s = Yi(e.annotations);
    return e.userEvent && (s = s.concat(Re.userEvent.of(e.userEvent))), {
      changes: e.changes instanceof De ? e.changes : De.of(e.changes || [], t, n.facet(ef)),
      selection: i && (i instanceof v ? i : v.single(i.anchor, i.head)),
      effects: Yi(e.effects),
      annotations: s,
      scrollIntoView: !!e.scrollIntoView
    };
  }
  function lf(n, e, t) {
    let i = No(n, e.length ? e[0] : {}, n.doc.length);
    e.length && e[0].filter === false && (t = false);
    for (let r = 1; r < e.length; r++) {
      e[r].filter === false && (t = false);
      let o = !!e[r].sequential;
      i = of(i, No(n, e[r], o ? i.changes.newLength : n.doc.length), o);
    }
    let s = Re.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
    return Gg(t ? Kg(s) : s);
  }
  function Kg(n) {
    let e = n.startState, t = true;
    for (let s of e.facet(tf)) {
      let r = s(n);
      if (r === false) {
        t = false;
        break;
      }
      Array.isArray(r) && (t = t === true ? r : jg(t, r));
    }
    if (t !== true) {
      let s, r;
      if (t === false) r = n.changes.invertedDesc, s = De.empty(e.doc.length);
      else {
        let o = n.changes.filter(t);
        s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
      }
      n = Re.create(e, s, n.selection && n.selection.map(r), j.mapEffects(n.effects, r), n.annotations, n.scrollIntoView);
    }
    let i = e.facet(nf);
    for (let s = i.length - 1; s >= 0; s--) {
      let r = i[s](n);
      r instanceof Re ? n = r : Array.isArray(r) && r.length == 1 && r[0] instanceof Re ? n = r[0] : n = lf(e, Yi(r), false);
    }
    return n;
  }
  function Gg(n) {
    let e = n.startState, t = e.facet(sf), i = n;
    for (let s = t.length - 1; s >= 0; s--) {
      let r = t[s](n);
      r && Object.keys(r).length && (i = of(i, No(e, r, n.changes.newLength), true));
    }
    return i == n ? n : Re.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
  }
  const Yg = [];
  function Yi(n) {
    return n == null ? Yg : Array.isArray(n) ? n : [
      n
    ];
  }
  var me = function(n) {
    return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
  }(me || (me = {}));
  const Jg = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  let Io;
  try {
    Io = new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
  } catch {
  }
  function Zg(n) {
    if (Io) return Io.test(n);
    for (let e = 0; e < n.length; e++) {
      let t = n[e];
      if (/\w/.test(t) || t > "\x80" && (t.toUpperCase() != t.toLowerCase() || Jg.test(t))) return true;
    }
    return false;
  }
  function em(n) {
    return (e) => {
      if (!/\S/.test(e)) return me.Space;
      if (Zg(e)) return me.Word;
      for (let t = 0; t < n.length; t++) if (e.indexOf(n[t]) > -1) return me.Word;
      return me.Other;
    };
  }
  class ie {
    constructor(e, t, i, s, r, o) {
      this.config = e, this.doc = t, this.selection = i, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
      for (let l = 0; l < this.config.dynamicSlots.length; l++) Tn(this, l << 1);
      this.computeSlot = null;
    }
    field(e, t = true) {
      let i = this.config.address[e.id];
      if (i == null) {
        if (t) throw new RangeError("Field is not present in this state");
        return;
      }
      return Tn(this, i), ir(this, i);
    }
    update(...e) {
      return lf(this, e, true);
    }
    applyTransaction(e) {
      let t = this.config, { base: i, compartments: s } = t;
      for (let l of e.effects) l.is(Pr.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => s.set(h, a)), t = null), s.set(l.value.compartment, l.value.extension)) : l.is(j.reconfigure) ? (t = null, i = l.value) : l.is(j.appendConfig) && (t = null, i = Yi(i).concat(l.value));
      let r;
      t ? r = e.startState.values.slice() : (t = tr.resolve(i, s, this), r = new ie(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
      let o = e.startState.facet(_o) ? e.newSelection : e.newSelection.asSingle();
      new ie(t, e.newDoc, o, r, (l, a) => a.update(l, e), e);
    }
    replaceSelection(e) {
      return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
        changes: {
          from: t.from,
          to: t.to,
          insert: e
        },
        range: v.cursor(t.from + e.length)
      }));
    }
    changeByRange(e) {
      let t = this.selection, i = e(t.ranges[0]), s = this.changes(i.changes), r = [
        i.range
      ], o = Yi(i.effects);
      for (let l = 1; l < t.ranges.length; l++) {
        let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(s);
        for (let u = 0; u < l; u++) r[u] = r[u].map(c);
        let f = s.mapDesc(h, true);
        r.push(a.range.map(f)), s = s.compose(c), o = j.mapEffects(o, c).concat(j.mapEffects(Yi(a.effects), f));
      }
      return {
        changes: s,
        selection: v.create(r, t.mainIndex),
        effects: o
      };
    }
    changes(e = []) {
      return e instanceof De ? e : De.of(e, this.doc.length, this.facet(ie.lineSeparator));
    }
    toText(e) {
      return oe.of(e.split(this.facet(ie.lineSeparator) || Do));
    }
    sliceDoc(e = 0, t = this.doc.length) {
      return this.doc.sliceString(e, t, this.lineBreak);
    }
    facet(e) {
      let t = this.config.address[e.id];
      return t == null ? e.default : (Tn(this, t), ir(this, t));
    }
    toJSON(e) {
      let t = {
        doc: this.sliceDoc(),
        selection: this.selection.toJSON()
      };
      if (e) for (let i in e) {
        let s = e[i];
        s instanceof Qe && this.config.address[s.id] != null && (t[i] = s.spec.toJSON(this.field(e[i]), this));
      }
      return t;
    }
    static fromJSON(e, t = {}, i) {
      if (!e || typeof e.doc != "string") throw new RangeError("Invalid JSON representation for EditorState");
      let s = [];
      if (i) {
        for (let r in i) if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = i[r], l = e[r];
          s.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
      }
      return ie.create({
        doc: e.doc,
        selection: v.fromJSON(e.selection),
        extensions: t.extensions ? s.concat([
          t.extensions
        ]) : s
      });
    }
    static create(e = {}) {
      let t = tr.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof oe ? e.doc : oe.of((e.doc || "").split(t.staticFacet(ie.lineSeparator) || Do)), s = e.selection ? e.selection instanceof v ? e.selection : v.single(e.selection.anchor, e.selection.head) : v.single(0);
      return Yc(s, i.length), t.staticFacet(_o) || (s = s.asSingle()), new ie(t, i, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
    }
    get tabSize() {
      return this.facet(ie.tabSize);
    }
    get lineBreak() {
      return this.facet(ie.lineSeparator) || `
`;
    }
    get readOnly() {
      return this.facet(rf);
    }
    phrase(e, ...t) {
      for (let i of this.facet(ie.phrases)) if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
      return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, s) => {
        if (s == "$") return "$";
        let r = +(s || 1);
        return !r || r > t.length ? i : t[r - 1];
      })), e;
    }
    languageDataAt(e, t, i = -1) {
      let s = [];
      for (let r of this.facet(Zc)) for (let o of r(this, t, i)) Object.prototype.hasOwnProperty.call(o, e) && s.push(o[e]);
      return s;
    }
    charCategorizer(e) {
      return em(this.languageDataAt("wordChars", e).join(""));
    }
    wordAt(e) {
      let { text: t, from: i, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - i, l = e - i;
      for (; o > 0; ) {
        let a = Ve(t, o, false);
        if (r(t.slice(a, o)) != me.Word) break;
        o = a;
      }
      for (; l < s; ) {
        let a = Ve(t, l);
        if (r(t.slice(l, a)) != me.Word) break;
        l = a;
      }
      return o == l ? null : v.range(o + i, l + i);
    }
  }
  ie.allowMultipleSelections = _o;
  ie.tabSize = B.define({
    combine: (n) => n.length ? n[0] : 4
  });
  ie.lineSeparator = ef;
  ie.readOnly = rf;
  ie.phrases = B.define({
    compare(n, e) {
      let t = Object.keys(n), i = Object.keys(e);
      return t.length == i.length && t.every((s) => n[s] == e[s]);
    }
  });
  ie.languageData = Zc;
  ie.changeFilter = tf;
  ie.transactionFilter = nf;
  ie.transactionExtender = sf;
  Pr.reconfigure = j.define();
  function zt(n, e, t = {}) {
    let i = {};
    for (let s of n) for (let r of Object.keys(s)) {
      let o = s[r], l = i[r];
      if (l === void 0) i[r] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, r)) i[r] = t[r](l, o);
      else throw new Error("Config merge conflict for field " + r);
    }
    for (let s in e) i[s] === void 0 && (i[s] = e[s]);
    return i;
  }
  class _i {
    eq(e) {
      return this == e;
    }
    range(e, t = e) {
      return Fo.create(e, t, this);
    }
  }
  _i.prototype.startSide = _i.prototype.endSide = 0;
  _i.prototype.point = false;
  _i.prototype.mapMode = Ye.TrackDel;
  let Fo = class af {
    constructor(e, t, i) {
      this.from = e, this.to = t, this.value = i;
    }
    static create(e, t, i) {
      return new af(e, t, i);
    }
  };
  function Ho(n, e) {
    return n.from - e.from || n.value.startSide - e.value.startSide;
  }
  class _l {
    constructor(e, t, i, s) {
      this.from = e, this.to = t, this.value = i, this.maxPoint = s;
    }
    get length() {
      return this.to[this.to.length - 1];
    }
    findIndex(e, t, i, s = 0) {
      let r = i ? this.to : this.from;
      for (let o = s, l = r.length; ; ) {
        if (o == l) return o;
        let a = o + l >> 1, h = r[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
        if (a == o) return h >= 0 ? o : l;
        h >= 0 ? l = a : o = a + 1;
      }
    }
    between(e, t, i, s) {
      for (let r = this.findIndex(t, -1e9, true), o = this.findIndex(i, 1e9, false, r); r < o; r++) if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === false) return false;
    }
    map(e, t) {
      let i = [], s = [], r = [], o = -1, l = -1;
      for (let a = 0; a < this.value.length; a++) {
        let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, d;
        if (c == f) {
          let p = t.mapPos(c, h.startSide, h.mapMode);
          if (p == null || (u = d = p, h.startSide != h.endSide && (d = t.mapPos(c, h.endSide), d < u))) continue;
        } else if (u = t.mapPos(c, h.startSide), d = t.mapPos(f, h.endSide), u > d || u == d && h.startSide > 0 && h.endSide <= 0) continue;
        (d - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, d - u)), i.push(h), s.push(u - o), r.push(d - o));
      }
      return {
        mapped: i.length ? new _l(s, r, i, l) : null,
        pos: o
      };
    }
  }
  class re {
    constructor(e, t, i, s) {
      this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = s;
    }
    static create(e, t, i, s) {
      return new re(e, t, i, s);
    }
    get length() {
      let e = this.chunk.length - 1;
      return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
    }
    get size() {
      if (this.isEmpty) return 0;
      let e = this.nextLayer.size;
      for (let t of this.chunk) e += t.value.length;
      return e;
    }
    chunkEnd(e) {
      return this.chunkPos[e] + this.chunk[e].length;
    }
    update(e) {
      let { add: t = [], sort: i = false, filterFrom: s = 0, filterTo: r = this.length } = e, o = e.filter;
      if (t.length == 0 && !o) return this;
      if (i && (t = t.slice().sort(Ho)), this.isEmpty) return t.length ? re.of(t) : this;
      let l = new hf(this, null, -1).goto(0), a = 0, h = [], c = new Gt();
      for (; l.value || a < t.length; ) if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(Fo.create(l.from, l.to, l.value))), l.next());
      return c.finishInner(this.nextLayer.isEmpty && !h.length ? re.empty : this.nextLayer.update({
        add: h,
        filter: o,
        filterFrom: s,
        filterTo: r
      }));
    }
    map(e) {
      if (e.empty || this.isEmpty) return this;
      let t = [], i = [], s = -1;
      for (let o = 0; o < this.chunk.length; o++) {
        let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
        if (h === false) s = Math.max(s, a.maxPoint), t.push(a), i.push(e.mapPos(l));
        else if (h === true) {
          let { mapped: c, pos: f } = a.map(l, e);
          c && (s = Math.max(s, c.maxPoint), t.push(c), i.push(f));
        }
      }
      let r = this.nextLayer.map(e);
      return t.length == 0 ? r : new re(i, t, r || re.empty, s);
    }
    between(e, t, i) {
      if (!this.isEmpty) {
        for (let s = 0; s < this.chunk.length; s++) {
          let r = this.chunkPos[s], o = this.chunk[s];
          if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, i) === false) return;
        }
        this.nextLayer.between(e, t, i);
      }
    }
    iter(e = 0) {
      return Nn.from([
        this
      ]).goto(e);
    }
    get isEmpty() {
      return this.nextLayer == this;
    }
    static iter(e, t = 0) {
      return Nn.from(e).goto(t);
    }
    static compare(e, t, i, s, r = -1) {
      let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = Wa(o, l, i), h = new yn(o, a, r), c = new yn(l, a, r);
      i.iterGaps((f, u, d) => za(h, f, c, u, d, s)), i.empty && i.length == 0 && za(h, 0, c, 0, 0, s);
    }
    static eq(e, t, i = 0, s) {
      s == null && (s = 999999999);
      let r = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
      if (r.length != o.length) return false;
      if (!r.length) return true;
      let l = Wa(r, o), a = new yn(r, l, 0).goto(i), h = new yn(o, l, 0).goto(i);
      for (; ; ) {
        if (a.to != h.to || !Wo(a.active, h.active) || a.point && (!h.point || !a.point.eq(h.point))) return false;
        if (a.to > s) return true;
        a.next(), h.next();
      }
    }
    static spans(e, t, i, s, r = -1) {
      let o = new yn(e, null, r).goto(t), l = t, a = o.openStart;
      for (; ; ) {
        let h = Math.min(o.to, i);
        if (o.point) {
          let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
          s.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
        } else h > l && (s.span(l, h, o.active, a), a = o.openEnd(h));
        if (o.to > i) return a + (o.point && o.to > i ? 1 : 0);
        l = o.to, o.next();
      }
    }
    static of(e, t = false) {
      let i = new Gt();
      for (let s of e instanceof Fo ? [
        e
      ] : t ? tm(e) : e) i.add(s.from, s.to, s.value);
      return i.finish();
    }
    static join(e) {
      if (!e.length) return re.empty;
      let t = e[e.length - 1];
      for (let i = e.length - 2; i >= 0; i--) for (let s = e[i]; s != re.empty; s = s.nextLayer) t = new re(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
      return t;
    }
  }
  re.empty = new re([], [], null, -1);
  function tm(n) {
    if (n.length > 1) for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (Ho(e, i) > 0) return n.slice().sort(Ho);
      e = i;
    }
    return n;
  }
  re.empty.nextLayer = re.empty;
  class Gt {
    finishChunk(e) {
      this.chunks.push(new _l(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
    }
    constructor() {
      this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
    }
    add(e, t, i) {
      this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new Gt())).add(e, t, i);
    }
    addInner(e, t, i) {
      let s = e - this.lastTo || i.startSide - this.last.endSide;
      if (s <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0) throw new Error("Ranges must be added sorted by `from` position and `startSide`");
      return s < 0 ? false : (this.from.length == 250 && this.finishChunk(true), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), true);
    }
    addChunk(e, t) {
      if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0) return false;
      this.from.length && this.finishChunk(true), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
      let i = t.value.length - 1;
      return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, true;
    }
    finish() {
      return this.finishInner(re.empty);
    }
    finishInner(e) {
      if (this.from.length && this.finishChunk(false), this.chunks.length == 0) return e;
      let t = re.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
      return this.from = null, t;
    }
  }
  function Wa(n, e, t) {
    let i = /* @__PURE__ */ new Map();
    for (let r of n) for (let o = 0; o < r.chunk.length; o++) r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
    let s = /* @__PURE__ */ new Set();
    for (let r of e) for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == r.chunkPos[o] && !(t == null ? void 0 : t.touchesRange(l, l + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
    return s;
  }
  class hf {
    constructor(e, t, i, s = 0) {
      this.layer = e, this.skip = t, this.minPoint = i, this.rank = s;
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    get endSide() {
      return this.value ? this.value.endSide : 0;
    }
    goto(e, t = -1e9) {
      return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, false), this;
    }
    gotoInner(e, t, i) {
      for (; this.chunkIndex < this.layer.chunk.length; ) {
        let s = this.layer.chunk[this.chunkIndex];
        if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < e || s.maxPoint < this.minPoint)) break;
        this.chunkIndex++, i = false;
      }
      if (this.chunkIndex < this.layer.chunk.length) {
        let s = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, true);
        (!i || this.rangeIndex < s) && this.setRangeIndex(s);
      }
      this.next();
    }
    forward(e, t) {
      (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, true);
    }
    next() {
      for (; ; ) if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break;
      }
    }
    setRangeIndex(e) {
      if (e == this.layer.chunk[this.chunkIndex].value.length) {
        if (this.chunkIndex++, this.skip) for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); ) this.chunkIndex++;
        this.rangeIndex = 0;
      } else this.rangeIndex = e;
    }
    nextChunk() {
      this.chunkIndex++, this.rangeIndex = 0, this.next();
    }
    compare(e) {
      return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
    }
  }
  class Nn {
    constructor(e) {
      this.heap = e;
    }
    static from(e, t = null, i = -1) {
      let s = [];
      for (let r = 0; r < e.length; r++) for (let o = e[r]; !o.isEmpty; o = o.nextLayer) o.maxPoint >= i && s.push(new hf(o, t, i, r));
      return s.length == 1 ? s[0] : new Nn(s);
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    goto(e, t = -1e9) {
      for (let i of this.heap) i.goto(e, t);
      for (let i = this.heap.length >> 1; i >= 0; i--) Zr(this.heap, i);
      return this.next(), this;
    }
    forward(e, t) {
      for (let i of this.heap) i.forward(e, t);
      for (let i = this.heap.length >> 1; i >= 0; i--) Zr(this.heap, i);
      (this.to - e || this.value.endSide - t) < 0 && this.next();
    }
    next() {
      if (this.heap.length == 0) this.from = this.to = 1e9, this.value = null, this.rank = -1;
      else {
        let e = this.heap[0];
        this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Zr(this.heap, 0);
      }
    }
  }
  function Zr(n, e) {
    for (let t = n[e]; ; ) {
      let i = (e << 1) + 1;
      if (i >= n.length) break;
      let s = n[i];
      if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), t.compare(s) < 0) break;
      n[i] = t, n[e] = s, e = i;
    }
  }
  class yn {
    constructor(e, t, i) {
      this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Nn.from(e, t, i);
    }
    goto(e, t = -1e9) {
      return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
    }
    forward(e, t) {
      for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; ) this.removeActive(this.minActive);
      this.cursor.forward(e, t);
    }
    removeActive(e) {
      ys(this.active, e), ys(this.activeTo, e), ys(this.activeRank, e), this.minActive = Va(this.active, this.activeTo);
    }
    addActive(e) {
      let t = 0, { value: i, to: s, rank: r } = this.cursor;
      for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; ) t++;
      xs(this.active, t, i), xs(this.activeTo, t, s), xs(this.activeRank, t, r), e && xs(e, t, this.cursor.from), this.minActive = Va(this.active, this.activeTo);
    }
    next() {
      let e = this.to, t = this.point;
      this.point = null;
      let i = this.openStart < 0 ? [] : null;
      for (; ; ) {
        let s = this.minActive;
        if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
          if (this.activeTo[s] > e) {
            this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
            break;
          }
          this.removeActive(s), i && ys(i, s);
        } else if (this.cursor.value) if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point) this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to) this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
        else {
          this.to = this.endSide = 1e9;
          break;
        }
      }
      if (i) {
        this.openStart = 0;
        for (let s = i.length - 1; s >= 0 && i[s] < e; s--) this.openStart++;
      }
    }
    activeForPoint(e) {
      if (!this.active.length) return this.active;
      let t = [];
      for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--) (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
      return t.reverse();
    }
    openEnd(e) {
      let t = 0;
      for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--) t++;
      return t;
    }
  }
  function za(n, e, t, i, s, r) {
    n.goto(e), t.goto(i);
    let o = i + s, l = i, a = i - e;
    for (; ; ) {
      let h = n.to + a - t.to, c = h || n.endSide - t.endSide, f = c < 0 ? n.to + a : t.to, u = Math.min(f, o);
      if (n.point || t.point ? n.point && t.point && (n.point == t.point || n.point.eq(t.point)) && Wo(n.activeForPoint(n.to), t.activeForPoint(t.to)) || r.comparePoint(l, u, n.point, t.point) : u > l && !Wo(n.active, t.active) && r.compareRange(l, u, n.active, t.active), f > o) break;
      (h || n.openEnd != t.openEnd) && r.boundChange && r.boundChange(f), l = f, c <= 0 && n.next(), c >= 0 && t.next();
    }
  }
  function Wo(n, e) {
    if (n.length != e.length) return false;
    for (let t = 0; t < n.length; t++) if (n[t] != e[t] && !n[t].eq(e[t])) return false;
    return true;
  }
  function ys(n, e) {
    for (let t = e, i = n.length - 1; t < i; t++) n[t] = n[t + 1];
    n.pop();
  }
  function xs(n, e, t) {
    for (let i = n.length - 1; i >= e; i--) n[i + 1] = n[i];
    n[e] = t;
  }
  function Va(n, e) {
    let t = -1, i = 1e9;
    for (let s = 0; s < e.length; s++) (e[s] - i || n[s].endSide - n[t].endSide) < 0 && (t = s, i = e[s]);
    return t;
  }
  function dn(n, e, t = n.length) {
    let i = 0;
    for (let s = 0; s < t && s < n.length; ) n.charCodeAt(s) == 9 ? (i += e - i % e, s++) : (i++, s = Ve(n, s));
    return i;
  }
  function zo(n, e, t, i) {
    for (let s = 0, r = 0; ; ) {
      if (r >= e) return s;
      if (s == n.length) break;
      r += n.charCodeAt(s) == 9 ? t - r % t : 1, s = Ve(n, s);
    }
    return i === true ? -1 : n.length;
  }
  const Vo = "\u037C", Qa = typeof Symbol > "u" ? "__" + Vo : Symbol.for(Vo), Qo = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), qa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
  class mi {
    constructor(e, t) {
      this.rules = [];
      let { finish: i } = t || {};
      function s(o) {
        return /^@/.test(o) ? [
          o
        ] : o.split(/,\s*/);
      }
      function r(o, l, a, h) {
        let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
        if (f && l == null) return a.push(o[0] + ";");
        for (let d in l) {
          let p = l[d];
          if (/&/.test(d)) r(d.split(/,\s*/).map((g) => o.map((b) => g.replace(/&/, b))).reduce((g, b) => g.concat(b)), p, a);
          else if (p && typeof p == "object") {
            if (!f) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
            r(s(d), p, c, u);
          } else p != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (g) => "-" + g.toLowerCase()) + ": " + p + ";");
        }
        (c.length || u) && a.push((i && !f && !h ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
      }
      for (let o in e) r(s(o), e[o], this.rules);
    }
    getRules() {
      return this.rules.join(`
`);
    }
    static newName() {
      let e = qa[Qa] || 1;
      return qa[Qa] = e + 1, Vo + e.toString(36);
    }
    static mount(e, t, i) {
      let s = e[Qo], r = i && i.nonce;
      s ? r && s.setNonce(r) : s = new im(e, r), s.mount(Array.isArray(t) ? t : [
        t
      ], e);
    }
  }
  let Xa = /* @__PURE__ */ new Map();
  class im {
    constructor(e, t) {
      let i = e.ownerDocument || e, s = i.defaultView;
      if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
        let r = Xa.get(i);
        if (r) return e[Qo] = r;
        this.sheet = new s.CSSStyleSheet(), Xa.set(i, this);
      } else this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
      this.modules = [], e[Qo] = this;
    }
    mount(e, t) {
      let i = this.sheet, s = 0, r = 0;
      for (let o = 0; o < e.length; o++) {
        let l = e[o], a = this.modules.indexOf(l);
        if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
          if (this.modules.splice(r++, 0, l), i) for (let h = 0; h < l.rules.length; h++) i.insertRule(l.rules[h], s++);
        } else {
          for (; r < a; ) s += this.modules[r++].rules.length;
          s += l.rules.length, r++;
        }
      }
      if (i) t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [
        this.sheet,
        ...t.adoptedStyleSheets
      ]);
      else {
        let o = "";
        for (let a = 0; a < this.modules.length; a++) o += this.modules[a].getRules() + `
`;
        this.styleTag.textContent = o;
        let l = t.head || t;
        this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
      }
    }
    setNonce(e) {
      this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
    }
  }
  var bi = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
  }, In = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"'
  }, nm = typeof navigator < "u" && /Mac/.test(navigator.platform), sm = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
  for (var ze = 0; ze < 10; ze++) bi[48 + ze] = bi[96 + ze] = String(ze);
  for (var ze = 1; ze <= 24; ze++) bi[ze + 111] = "F" + ze;
  for (var ze = 65; ze <= 90; ze++) bi[ze] = String.fromCharCode(ze + 32), In[ze] = String.fromCharCode(ze);
  for (var eo in bi) In.hasOwnProperty(eo) || (In[eo] = bi[eo]);
  function rm(n) {
    var e = nm && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || sm && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? In : bi)[n.keyCode] || n.key || "Unidentified";
    return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
  }
  function ae() {
    var n = arguments[0];
    typeof n == "string" && (n = document.createElement(n));
    var e = 1, t = arguments[1];
    if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
      for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) {
        var s = t[i];
        typeof s == "string" ? n.setAttribute(i, s) : s != null && (n[i] = s);
      }
      e++;
    }
    for (; e < arguments.length; e++) cf(n, arguments[e]);
    return n;
  }
  function cf(n, e) {
    if (typeof e == "string") n.appendChild(document.createTextNode(e));
    else if (e != null) if (e.nodeType != null) n.appendChild(e);
    else if (Array.isArray(e)) for (var t = 0; t < e.length; t++) cf(n, e[t]);
    else throw new RangeError("Unsupported child node: " + e);
  }
  function Fn(n) {
    let e;
    return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
  }
  function qo(n, e) {
    return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : false;
  }
  function Xs(n, e) {
    if (!e.anchorNode) return false;
    try {
      return qo(n, e.anchorNode);
    } catch {
      return false;
    }
  }
  function rn(n) {
    return n.nodeType == 3 ? Ii(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
  }
  function Pn(n, e, t, i) {
    return t ? Ua(n, e, t, i, -1) || Ua(n, e, t, i, 1) : false;
  }
  function Ni(n) {
    for (var e = 0; ; e++) if (n = n.previousSibling, !n) return e;
  }
  function nr(n) {
    return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
  }
  function Ua(n, e, t, i, s) {
    for (; ; ) {
      if (n == t && e == i) return true;
      if (e == (s < 0 ? 0 : Ht(n))) {
        if (n.nodeName == "DIV") return false;
        let r = n.parentNode;
        if (!r || r.nodeType != 1) return false;
        e = Ni(n) + (s < 0 ? 0 : 1), n = r;
      } else if (n.nodeType == 1) {
        if (n = n.childNodes[e + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false") return false;
        e = s < 0 ? Ht(n) : 0;
      } else return false;
    }
  }
  function Ht(n) {
    return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
  }
  function Yn(n, e) {
    let t = e ? n.left : n.right;
    return {
      left: t,
      right: t,
      top: n.top,
      bottom: n.bottom
    };
  }
  function om(n) {
    let e = n.visualViewport;
    return e ? {
      left: 0,
      right: e.width,
      top: 0,
      bottom: e.height
    } : {
      left: 0,
      right: n.innerWidth,
      top: 0,
      bottom: n.innerHeight
    };
  }
  function ff(n, e) {
    let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
    return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), {
      scaleX: t,
      scaleY: i
    };
  }
  function lm(n, e, t, i, s, r, o, l) {
    let a = n.ownerDocument, h = a.defaultView || window;
    for (let c = n, f = false; c && !f; ) if (c.nodeType == 1) {
      let u, d = c == a.body, p = 1, g = 1;
      if (d) u = om(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = true), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let S = c.getBoundingClientRect();
        ({ scaleX: p, scaleY: g } = ff(c, S)), u = {
          left: S.left,
          right: S.left + c.clientWidth * p,
          top: S.top,
          bottom: S.top + c.clientHeight * g
        };
      }
      let b = 0, y = 0;
      if (s == "nearest") e.top < u.top ? (y = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + y && (y = e.bottom - u.bottom + o)) : e.bottom > u.bottom && (y = e.bottom - u.bottom + o, t < 0 && e.top - y < u.top && (y = e.top - (u.top + o)));
      else {
        let S = e.bottom - e.top, A = u.bottom - u.top;
        y = (s == "center" && S <= A ? e.top + S / 2 - A / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - A + o) - u.top;
      }
      if (i == "nearest" ? e.left < u.left ? (b = e.left - (u.left + r), t > 0 && e.right > u.right + b && (b = e.right - u.right + r)) : e.right > u.right && (b = e.right - u.right + r, t < 0 && e.left < u.left + b && (b = e.left - (u.left + r))) : b = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - r : e.right - (u.right - u.left) + r) - u.left, b || y) if (d) h.scrollBy(b, y);
      else {
        let S = 0, A = 0;
        if (y) {
          let C = c.scrollTop;
          c.scrollTop += y / g, A = (c.scrollTop - C) * g;
        }
        if (b) {
          let C = c.scrollLeft;
          c.scrollLeft += b / p, S = (c.scrollLeft - C) * p;
        }
        e = {
          left: e.left - S,
          top: e.top - A,
          right: e.right - S,
          bottom: e.bottom - A
        }, S && Math.abs(S - b) < 1 && (i = "nearest"), A && Math.abs(A - y) < 1 && (s = "nearest");
      }
      if (d) break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11) c = c.host;
    else break;
  }
  function am(n) {
    let e = n.ownerDocument, t, i;
    for (let s = n.parentNode; s && !(s == e.body || t && i); ) if (s.nodeType == 1) !i && s.scrollHeight > s.clientHeight && (i = s), !t && s.scrollWidth > s.clientWidth && (t = s), s = s.assignedSlot || s.parentNode;
    else if (s.nodeType == 11) s = s.host;
    else break;
    return {
      x: t,
      y: i
    };
  }
  class hm {
    constructor() {
      this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
    }
    eq(e) {
      return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
    }
    setRange(e) {
      let { anchorNode: t, focusNode: i } = e;
      this.set(t, Math.min(e.anchorOffset, t ? Ht(t) : 0), i, Math.min(e.focusOffset, i ? Ht(i) : 0));
    }
    set(e, t, i, s) {
      this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = s;
    }
  }
  let Qi = null;
  function uf(n) {
    if (n.setActive) return n.setActive();
    if (Qi) return n.focus(Qi);
    let e = [];
    for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode) ;
    if (n.focus(Qi == null ? {
      get preventScroll() {
        return Qi = {
          preventScroll: true
        }, true;
      }
    } : void 0), !Qi) {
      Qi = false;
      for (let t = 0; t < e.length; ) {
        let i = e[t++], s = e[t++], r = e[t++];
        i.scrollTop != s && (i.scrollTop = s), i.scrollLeft != r && (i.scrollLeft = r);
      }
    }
  }
  let $a;
  function Ii(n, e, t = e) {
    let i = $a || ($a = document.createRange());
    return i.setEnd(n, t), i.setStart(n, e), i;
  }
  function Ji(n, e, t, i) {
    let s = {
      key: e,
      code: e,
      keyCode: t,
      which: t,
      cancelable: true
    };
    i && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = i);
    let r = new KeyboardEvent("keydown", s);
    r.synthetic = true, n.dispatchEvent(r);
    let o = new KeyboardEvent("keyup", s);
    return o.synthetic = true, n.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
  }
  function cm(n) {
    for (; n; ) {
      if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host)) return n;
      n = n.assignedSlot || n.parentNode;
    }
    return null;
  }
  function df(n) {
    for (; n.attributes.length; ) n.removeAttributeNode(n.attributes[0]);
  }
  function fm(n, e) {
    let t = e.focusNode, i = e.focusOffset;
    if (!t || e.anchorNode != t || e.anchorOffset != i) return false;
    for (i = Math.min(i, Ht(t)); ; ) if (i) {
      if (t.nodeType != 1) return false;
      let s = t.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (t = s, i = Ht(t));
    } else {
      if (t == n) return true;
      i = Ni(t), t = t.parentNode;
    }
  }
  function pf(n) {
    return n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
  }
  function gf(n, e) {
    for (let t = n, i = e; ; ) {
      if (t.nodeType == 3 && i > 0) return {
        node: t,
        offset: i
      };
      if (t.nodeType == 1 && i > 0) {
        if (t.contentEditable == "false") return null;
        t = t.childNodes[i - 1], i = Ht(t);
      } else if (t.parentNode && !nr(t)) i = Ni(t), t = t.parentNode;
      else return null;
    }
  }
  function mf(n, e) {
    for (let t = n, i = e; ; ) {
      if (t.nodeType == 3 && i < t.nodeValue.length) return {
        node: t,
        offset: i
      };
      if (t.nodeType == 1 && i < t.childNodes.length) {
        if (t.contentEditable == "false") return null;
        t = t.childNodes[i], i = 0;
      } else if (t.parentNode && !nr(t)) i = Ni(t) + 1, t = t.parentNode;
      else return null;
    }
  }
  class je {
    constructor(e, t, i = true) {
      this.node = e, this.offset = t, this.precise = i;
    }
    static before(e, t) {
      return new je(e.parentNode, Ni(e), t);
    }
    static after(e, t) {
      return new je(e.parentNode, Ni(e) + 1, t);
    }
  }
  const Nl = [];
  class ce {
    constructor() {
      this.parent = null, this.dom = null, this.flags = 2;
    }
    get overrideDOMText() {
      return null;
    }
    get posAtStart() {
      return this.parent ? this.parent.posBefore(this) : 0;
    }
    get posAtEnd() {
      return this.posAtStart + this.length;
    }
    posBefore(e) {
      let t = this.posAtStart;
      for (let i of this.children) {
        if (i == e) return t;
        t += i.length + i.breakAfter;
      }
      throw new RangeError("Invalid child in posBefore");
    }
    posAfter(e) {
      return this.posBefore(e) + e.length;
    }
    sync(e, t) {
      if (this.flags & 2) {
        let i = this.dom, s = null, r;
        for (let o of this.children) {
          if (o.flags & 7) {
            if (!o.dom && (r = s ? s.nextSibling : i.firstChild)) {
              let l = ce.get(r);
              (!l || !l.parent && l.canReuseDOM(o)) && o.reuseDOM(r);
            }
            o.sync(e, t), o.flags &= -8;
          }
          if (r = s ? s.nextSibling : i.firstChild, t && !t.written && t.node == i && r != o.dom && (t.written = true), o.dom.parentNode == i) for (; r && r != o.dom; ) r = ja(r);
          else i.insertBefore(o.dom, r);
          s = o.dom;
        }
        for (r = s ? s.nextSibling : i.firstChild, r && t && t.node == i && (t.written = true); r; ) r = ja(r);
      } else if (this.flags & 1) for (let i of this.children) i.flags & 7 && (i.sync(e, t), i.flags &= -8);
    }
    reuseDOM(e) {
    }
    localPosFromDOM(e, t) {
      let i;
      if (e == this.dom) i = this.dom.childNodes[t];
      else {
        let s = Ht(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let r = e.parentNode;
          if (r == this.dom) break;
          s == 0 && r.firstChild != r.lastChild && (e == r.firstChild ? s = -1 : s = 1), e = r;
        }
        s < 0 ? i = e : i = e.nextSibling;
      }
      if (i == this.dom.firstChild) return 0;
      for (; i && !ce.get(i); ) i = i.nextSibling;
      if (!i) return this.length;
      for (let s = 0, r = 0; ; s++) {
        let o = this.children[s];
        if (o.dom == i) return r;
        r += o.length + o.breakAfter;
      }
    }
    domBoundsAround(e, t, i = 0) {
      let s = -1, r = -1, o = -1, l = -1;
      for (let a = 0, h = i, c = i; a < this.children.length; a++) {
        let f = this.children[a], u = h + f.length;
        if (h < e && u > t) return f.domBoundsAround(e, t, h);
        if (u >= e && s == -1 && (s = a, r = h), h > t && f.dom.parentNode == this.dom) {
          o = a, l = c;
          break;
        }
        c = u, h = u + f.breakAfter;
      }
      return {
        from: r,
        to: l < 0 ? i + this.length : l,
        startDOM: (s ? this.children[s - 1].dom.nextSibling : null) || this.dom.firstChild,
        endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
      };
    }
    markDirty(e = false) {
      this.flags |= 2, this.markParentsDirty(e);
    }
    markParentsDirty(e) {
      for (let t = this.parent; t; t = t.parent) {
        if (e && (t.flags |= 2), t.flags & 1) return;
        t.flags |= 1, e = false;
      }
    }
    setParent(e) {
      this.parent != e && (this.parent = e, this.flags & 7 && this.markParentsDirty(true));
    }
    setDOM(e) {
      this.dom != e && (this.dom && (this.dom.cmView = null), this.dom = e, e.cmView = this);
    }
    get rootView() {
      for (let e = this; ; ) {
        let t = e.parent;
        if (!t) return e;
        e = t;
      }
    }
    replaceChildren(e, t, i = Nl) {
      this.markDirty();
      for (let s = e; s < t; s++) {
        let r = this.children[s];
        r.parent == this && i.indexOf(r) < 0 && r.destroy();
      }
      i.length < 250 ? this.children.splice(e, t - e, ...i) : this.children = [].concat(this.children.slice(0, e), i, this.children.slice(t));
      for (let s = 0; s < i.length; s++) i[s].setParent(this);
    }
    ignoreMutation(e) {
      return false;
    }
    ignoreEvent(e) {
      return false;
    }
    childCursor(e = this.length) {
      return new bf(this.children, e, this.children.length);
    }
    childPos(e, t = 1) {
      return this.childCursor().findPos(e, t);
    }
    toString() {
      let e = this.constructor.name.replace("View", "");
      return e + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (e == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
    }
    static get(e) {
      return e.cmView;
    }
    get isEditable() {
      return true;
    }
    get isWidget() {
      return false;
    }
    get isHidden() {
      return false;
    }
    merge(e, t, i, s, r, o) {
      return false;
    }
    become(e) {
      return false;
    }
    canReuseDOM(e) {
      return e.constructor == this.constructor && !((this.flags | e.flags) & 8);
    }
    getSide() {
      return 0;
    }
    destroy() {
      for (let e of this.children) e.parent == this && e.destroy();
      this.parent = null;
    }
  }
  ce.prototype.breakAfter = 0;
  function ja(n) {
    let e = n.nextSibling;
    return n.parentNode.removeChild(n), e;
  }
  class bf {
    constructor(e, t, i) {
      this.children = e, this.pos = t, this.i = i, this.off = 0;
    }
    findPos(e, t = 1) {
      for (; ; ) {
        if (e > this.pos || e == this.pos && (t > 0 || this.i == 0 || this.children[this.i - 1].breakAfter)) return this.off = e - this.pos, this;
        let i = this.children[--this.i];
        this.pos -= i.length + i.breakAfter;
      }
    }
  }
  function yf(n, e, t, i, s, r, o, l, a) {
    let { children: h } = n, c = h.length ? h[e] : null, f = r.length ? r[r.length - 1] : null, u = f ? f.breakAfter : o;
    if (!(e == i && c && !o && !u && r.length < 2 && c.merge(t, s, r.length ? f : null, t == 0, l, a))) {
      if (i < h.length) {
        let d = h[i];
        d && (s < d.length || d.breakAfter && (f == null ? void 0 : f.breakAfter)) ? (e == i && (d = d.split(s), s = 0), !u && f && d.merge(0, s, f, true, 0, a) ? r[r.length - 1] = d : ((s || d.children.length && !d.children[0].length) && d.merge(0, s, null, false, 0, a), r.push(d))) : (d == null ? void 0 : d.breakAfter) && (f ? f.breakAfter = 1 : o = 1), i++;
      }
      for (c && (c.breakAfter = o, t > 0 && (!o && r.length && c.merge(t, c.length, r[0], false, l, 0) ? c.breakAfter = r.shift().breakAfter : (t < c.length || c.children.length && c.children[c.children.length - 1].length == 0) && c.merge(t, c.length, null, false, l, 0), e++)); e < i && r.length; ) if (h[i - 1].become(r[r.length - 1])) i--, r.pop(), a = r.length ? 0 : l;
      else if (h[e].become(r[0])) e++, r.shift(), l = r.length ? 0 : a;
      else break;
      !r.length && e && i < h.length && !h[e - 1].breakAfter && h[i].merge(0, 0, h[e - 1], false, l, a) && e--, (e < i || r.length) && n.replaceChildren(e, i, r);
    }
  }
  function xf(n, e, t, i, s, r) {
    let o = n.childCursor(), { i: l, off: a } = o.findPos(t, 1), { i: h, off: c } = o.findPos(e, -1), f = e - t;
    for (let u of i) f += u.length;
    n.length += f, yf(n, h, c, l, a, i, 0, s, r);
  }
  let it = typeof navigator < "u" ? navigator : {
    userAgent: "",
    vendor: "",
    platform: ""
  }, Xo = typeof document < "u" ? document : {
    documentElement: {
      style: {}
    }
  };
  const Uo = /Edge\/(\d+)/.exec(it.userAgent), wf = /MSIE \d/.test(it.userAgent), $o = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(it.userAgent), Dr = !!(wf || $o || Uo), Ka = !Dr && /gecko\/(\d+)/i.test(it.userAgent), to = !Dr && /Chrome\/(\d+)/.exec(it.userAgent), um = "webkitFontSmoothing" in Xo.documentElement.style, kf = !Dr && /Apple Computer/.test(it.vendor), Ga = kf && (/Mobile\/\w+/.test(it.userAgent) || it.maxTouchPoints > 2);
  var L = {
    mac: Ga || /Mac/.test(it.platform),
    windows: /Win/.test(it.platform),
    linux: /Linux|X11/.test(it.platform),
    ie: Dr,
    ie_version: wf ? Xo.documentMode || 6 : $o ? +$o[1] : Uo ? +Uo[1] : 0,
    gecko: Ka,
    gecko_version: Ka ? +(/Firefox\/(\d+)/.exec(it.userAgent) || [
      0,
      0
    ])[1] : 0,
    chrome: !!to,
    chrome_version: to ? +to[1] : 0,
    ios: Ga,
    android: /Android\b/.test(it.userAgent),
    safari: kf,
    webkit_version: um ? +(/\bAppleWebKit\/(\d+)/.exec(it.userAgent) || [
      0,
      0
    ])[1] : 0,
    tabSize: Xo.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
  };
  const dm = 256;
  class St extends ce {
    constructor(e) {
      super(), this.text = e;
    }
    get length() {
      return this.text.length;
    }
    createDOM(e) {
      this.setDOM(e || document.createTextNode(this.text));
    }
    sync(e, t) {
      this.dom || this.createDOM(), this.dom.nodeValue != this.text && (t && t.node == this.dom && (t.written = true), this.dom.nodeValue = this.text);
    }
    reuseDOM(e) {
      e.nodeType == 3 && this.createDOM(e);
    }
    merge(e, t, i) {
      return this.flags & 8 || i && (!(i instanceof St) || this.length - (t - e) + i.length > dm || i.flags & 8) ? false : (this.text = this.text.slice(0, e) + (i ? i.text : "") + this.text.slice(t), this.markDirty(), true);
    }
    split(e) {
      let t = new St(this.text.slice(e));
      return this.text = this.text.slice(0, e), this.markDirty(), t.flags |= this.flags & 8, t;
    }
    localPosFromDOM(e, t) {
      return e == this.dom ? t : t ? this.text.length : 0;
    }
    domAtPos(e) {
      return new je(this.dom, e);
    }
    domBoundsAround(e, t, i) {
      return {
        from: i,
        to: i + this.length,
        startDOM: this.dom,
        endDOM: this.dom.nextSibling
      };
    }
    coordsAt(e, t) {
      return pm(this.dom, e, t);
    }
  }
  class Yt extends ce {
    constructor(e, t = [], i = 0) {
      super(), this.mark = e, this.children = t, this.length = i;
      for (let s of t) s.setParent(this);
    }
    setAttrs(e) {
      if (df(e), this.mark.class && (e.className = this.mark.class), this.mark.attrs) for (let t in this.mark.attrs) e.setAttribute(t, this.mark.attrs[t]);
      return e;
    }
    canReuseDOM(e) {
      return super.canReuseDOM(e) && !((this.flags | e.flags) & 8);
    }
    reuseDOM(e) {
      e.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(e), this.flags |= 6);
    }
    sync(e, t) {
      this.dom ? this.flags & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(e, t);
    }
    merge(e, t, i, s, r, o) {
      return i && (!(i instanceof Yt && i.mark.eq(this.mark)) || e && r <= 0 || t < this.length && o <= 0) ? false : (xf(this, e, t, i ? i.children.slice() : [], r - 1, o - 1), this.markDirty(), true);
    }
    split(e) {
      let t = [], i = 0, s = -1, r = 0;
      for (let l of this.children) {
        let a = i + l.length;
        a > e && t.push(i < e ? l.split(e - i) : l), s < 0 && i >= e && (s = r), i = a, r++;
      }
      let o = this.length - e;
      return this.length = e, s > -1 && (this.children.length = s, this.markDirty()), new Yt(this.mark, t, o);
    }
    domAtPos(e) {
      return vf(this, e);
    }
    coordsAt(e, t) {
      return Of(this, e, t);
    }
  }
  function pm(n, e, t) {
    let i = n.nodeValue.length;
    e > i && (e = i);
    let s = e, r = e, o = 0;
    e == 0 && t < 0 || e == i && t >= 0 ? L.chrome || L.gecko || (e ? (s--, o = 1) : r < i && (r++, o = -1)) : t < 0 ? s-- : r < i && r++;
    let l = Ii(n, s, r).getClientRects();
    if (!l.length) return null;
    let a = l[(o ? o < 0 : t >= 0) ? 0 : l.length - 1];
    return L.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (h) => h.width) || a), o ? Yn(a, o < 0) : a || null;
  }
  class ui extends ce {
    static create(e, t, i) {
      return new ui(e, t, i);
    }
    constructor(e, t, i) {
      super(), this.widget = e, this.length = t, this.side = i, this.prevWidget = null;
    }
    split(e) {
      let t = ui.create(this.widget, this.length - e, this.side);
      return this.length -= e, t;
    }
    sync(e) {
      (!this.dom || !this.widget.updateDOM(this.dom, e)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(e)), this.widget.editable || (this.dom.contentEditable = "false"));
    }
    getSide() {
      return this.side;
    }
    merge(e, t, i, s, r, o) {
      return i && (!(i instanceof ui) || !this.widget.compare(i.widget) || e > 0 && r <= 0 || t < this.length && o <= 0) ? false : (this.length = e + (i ? i.length : 0) + (this.length - t), true);
    }
    become(e) {
      return e instanceof ui && e.side == this.side && this.widget.constructor == e.widget.constructor ? (this.widget.compare(e.widget) || this.markDirty(true), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, this.length = e.length, true) : false;
    }
    ignoreMutation() {
      return true;
    }
    ignoreEvent(e) {
      return this.widget.ignoreEvent(e);
    }
    get overrideDOMText() {
      if (this.length == 0) return oe.empty;
      let e = this;
      for (; e.parent; ) e = e.parent;
      let { view: t } = e, i = t && t.state.doc, s = this.posAtStart;
      return i ? i.slice(s, s + this.length) : oe.empty;
    }
    domAtPos(e) {
      return (this.length ? e == 0 : this.side > 0) ? je.before(this.dom) : je.after(this.dom, e == this.length);
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(e, t) {
      let i = this.widget.coordsAt(this.dom, e, t);
      if (i) return i;
      let s = this.dom.getClientRects(), r = null;
      if (!s.length) return null;
      let o = this.side ? this.side < 0 : e > 0;
      for (let l = o ? s.length - 1 : 0; r = s[l], !(e > 0 ? l == 0 : l == s.length - 1 || r.top < r.bottom); l += o ? -1 : 1) ;
      return Yn(r, !o);
    }
    get isEditable() {
      return false;
    }
    get isWidget() {
      return true;
    }
    get isHidden() {
      return this.widget.isHidden;
    }
    destroy() {
      super.destroy(), this.dom && this.widget.destroy(this.dom);
    }
  }
  class on extends ce {
    constructor(e) {
      super(), this.side = e;
    }
    get length() {
      return 0;
    }
    merge() {
      return false;
    }
    become(e) {
      return e instanceof on && e.side == this.side;
    }
    split() {
      return new on(this.side);
    }
    sync() {
      if (!this.dom) {
        let e = document.createElement("img");
        e.className = "cm-widgetBuffer", e.setAttribute("aria-hidden", "true"), this.setDOM(e);
      }
    }
    getSide() {
      return this.side;
    }
    domAtPos(e) {
      return this.side > 0 ? je.before(this.dom) : je.after(this.dom);
    }
    localPosFromDOM() {
      return 0;
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(e) {
      return this.dom.getBoundingClientRect();
    }
    get overrideDOMText() {
      return oe.empty;
    }
    get isHidden() {
      return true;
    }
  }
  St.prototype.children = ui.prototype.children = on.prototype.children = Nl;
  function vf(n, e) {
    let t = n.dom, { children: i } = n, s = 0;
    for (let r = 0; s < i.length; s++) {
      let o = i[s], l = r + o.length;
      if (!(l == r && o.getSide() <= 0)) {
        if (e > r && e < l && o.dom.parentNode == t) return o.domAtPos(e - r);
        if (e <= r) break;
        r = l;
      }
    }
    for (let r = s; r > 0; r--) {
      let o = i[r - 1];
      if (o.dom.parentNode == t) return o.domAtPos(o.length);
    }
    for (let r = s; r < i.length; r++) {
      let o = i[r];
      if (o.dom.parentNode == t) return o.domAtPos(0);
    }
    return new je(t, 0);
  }
  function Sf(n, e, t) {
    let i, { children: s } = n;
    t > 0 && e instanceof Yt && s.length && (i = s[s.length - 1]) instanceof Yt && i.mark.eq(e.mark) ? Sf(i, e.children[0], t - 1) : (s.push(e), e.setParent(n)), n.length += e.length;
  }
  function Of(n, e, t) {
    let i = null, s = -1, r = null, o = -1;
    function l(h, c) {
      for (let f = 0, u = 0; f < h.children.length && u <= c; f++) {
        let d = h.children[f], p = u + d.length;
        p >= c && (d.children.length ? l(d, c - u) : (!r || r.isHidden && (t > 0 || mm(r, d))) && (p > c || u == p && d.getSide() > 0) ? (r = d, o = c - u) : (u < c || u == p && d.getSide() < 0 && !d.isHidden) && (i = d, s = c - u)), u = p;
      }
    }
    l(n, e);
    let a = (t < 0 ? i : r) || i || r;
    return a ? a.coordsAt(Math.max(0, a == i ? s : o), t) : gm(n);
  }
  function gm(n) {
    let e = n.dom.lastChild;
    if (!e) return n.dom.getBoundingClientRect();
    let t = rn(e);
    return t[t.length - 1] || null;
  }
  function mm(n, e) {
    let t = n.coordsAt(0, 1), i = e.coordsAt(0, 1);
    return t && i && i.top < t.bottom;
  }
  function jo(n, e) {
    for (let t in n) t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
    return e;
  }
  const Ya = /* @__PURE__ */ Object.create(null);
  function sr(n, e, t) {
    if (n == e) return true;
    n || (n = Ya), e || (e = Ya);
    let i = Object.keys(n), s = Object.keys(e);
    if (i.length - (t && i.indexOf(t) > -1 ? 1 : 0) != s.length - (t && s.indexOf(t) > -1 ? 1 : 0)) return false;
    for (let r of i) if (r != t && (s.indexOf(r) == -1 || n[r] !== e[r])) return false;
    return true;
  }
  function Ko(n, e, t) {
    let i = false;
    if (e) for (let s in e) t && s in t || (i = true, s == "style" ? n.style.cssText = "" : n.removeAttribute(s));
    if (t) for (let s in t) e && e[s] == t[s] || (i = true, s == "style" ? n.style.cssText = t[s] : n.setAttribute(s, t[s]));
    return i;
  }
  function bm(n) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let t = 0; t < n.attributes.length; t++) {
      let i = n.attributes[t];
      e[i.name] = i.value;
    }
    return e;
  }
  class ti {
    eq(e) {
      return false;
    }
    updateDOM(e, t) {
      return false;
    }
    compare(e) {
      return this == e || this.constructor == e.constructor && this.eq(e);
    }
    get estimatedHeight() {
      return -1;
    }
    get lineBreaks() {
      return 0;
    }
    ignoreEvent(e) {
      return true;
    }
    coordsAt(e, t, i) {
      return null;
    }
    get isHidden() {
      return false;
    }
    get editable() {
      return false;
    }
    destroy(e) {
    }
  }
  var Je = function(n) {
    return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
  }(Je || (Je = {}));
  class z extends _i {
    constructor(e, t, i, s) {
      super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = s;
    }
    get heightRelevant() {
      return false;
    }
    static mark(e) {
      return new Jn(e);
    }
    static widget(e) {
      let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
      return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new yi(e, t, t, i, e.widget || null, false);
    }
    static replace(e) {
      let t = !!e.block, i, s;
      if (e.isBlockGap) i = -5e8, s = 4e8;
      else {
        let { start: r, end: o } = Cf(e, t);
        i = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
      }
      return new yi(e, i, s, t, e.widget || null, true);
    }
    static line(e) {
      return new Zn(e);
    }
    static set(e, t = false) {
      return re.of(e, t);
    }
    hasHeight() {
      return this.widget ? this.widget.estimatedHeight > -1 : false;
    }
  }
  z.none = re.empty;
  class Jn extends z {
    constructor(e) {
      let { start: t, end: i } = Cf(e);
      super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.class = e.class || "", this.attrs = e.attributes || null;
    }
    eq(e) {
      var t, i;
      return this == e || e instanceof Jn && this.tagName == e.tagName && (this.class || ((t = this.attrs) === null || t === void 0 ? void 0 : t.class)) == (e.class || ((i = e.attrs) === null || i === void 0 ? void 0 : i.class)) && sr(this.attrs, e.attrs, "class");
    }
    range(e, t = e) {
      if (e >= t) throw new RangeError("Mark decorations may not be empty");
      return super.range(e, t);
    }
  }
  Jn.prototype.point = false;
  class Zn extends z {
    constructor(e) {
      super(-2e8, -2e8, null, e);
    }
    eq(e) {
      return e instanceof Zn && this.spec.class == e.spec.class && sr(this.spec.attributes, e.spec.attributes);
    }
    range(e, t = e) {
      if (t != e) throw new RangeError("Line decoration ranges must be zero-length");
      return super.range(e, t);
    }
  }
  Zn.prototype.mapMode = Ye.TrackBefore;
  Zn.prototype.point = true;
  class yi extends z {
    constructor(e, t, i, s, r, o) {
      super(t, i, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? Ye.TrackBefore : Ye.TrackAfter : Ye.TrackDel;
    }
    get type() {
      return this.startSide != this.endSide ? Je.WidgetRange : this.startSide <= 0 ? Je.WidgetBefore : Je.WidgetAfter;
    }
    get heightRelevant() {
      return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
    }
    eq(e) {
      return e instanceof yi && ym(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
    }
    range(e, t = e) {
      if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0)) throw new RangeError("Invalid range for replacement decoration");
      if (!this.isReplace && t != e) throw new RangeError("Widget decorations can only have zero-length ranges");
      return super.range(e, t);
    }
  }
  yi.prototype.point = true;
  function Cf(n, e = false) {
    let { inclusiveStart: t, inclusiveEnd: i } = n;
    return t == null && (t = n.inclusive), i == null && (i = n.inclusive), {
      start: t ?? e,
      end: i ?? e
    };
  }
  function ym(n, e) {
    return n == e || !!(n && e && n.compare(e));
  }
  function Us(n, e, t, i = 0) {
    let s = t.length - 1;
    s >= 0 && t[s] + i >= n ? t[s] = Math.max(t[s], e) : t.push(n, e);
  }
  class Ae extends ce {
    constructor() {
      super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
    }
    merge(e, t, i, s, r, o) {
      if (i) {
        if (!(i instanceof Ae)) return false;
        this.dom || i.transferDOM(this);
      }
      return s && this.setDeco(i ? i.attrs : null), xf(this, e, t, i ? i.children.slice() : [], r, o), true;
    }
    split(e) {
      let t = new Ae();
      if (t.breakAfter = this.breakAfter, this.length == 0) return t;
      let { i, off: s } = this.childPos(e);
      s && (t.append(this.children[i].split(s), 0), this.children[i].merge(s, this.children[i].length, null, false, 0, 0), i++);
      for (let r = i; r < this.children.length; r++) t.append(this.children[r], 0);
      for (; i > 0 && this.children[i - 1].length == 0; ) this.children[--i].destroy();
      return this.children.length = i, this.markDirty(), this.length = e, t;
    }
    transferDOM(e) {
      this.dom && (this.markDirty(), e.setDOM(this.dom), e.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
    }
    setDeco(e) {
      sr(this.attrs, e) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = e);
    }
    append(e, t) {
      Sf(this, e, t);
    }
    addLineDeco(e) {
      let t = e.spec.attributes, i = e.spec.class;
      t && (this.attrs = jo(t, this.attrs || {})), i && (this.attrs = jo({
        class: i
      }, this.attrs || {}));
    }
    domAtPos(e) {
      return vf(this, e);
    }
    reuseDOM(e) {
      e.nodeName == "DIV" && (this.setDOM(e), this.flags |= 6);
    }
    sync(e, t) {
      var i;
      this.dom ? this.flags & 4 && (df(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (Ko(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(e, t);
      let s = this.dom.lastChild;
      for (; s && ce.get(s) instanceof Yt; ) s = s.lastChild;
      if (!s || !this.length || s.nodeName != "BR" && ((i = ce.get(s)) === null || i === void 0 ? void 0 : i.isEditable) == false && (!L.ios || !this.children.some((r) => r instanceof St))) {
        let r = document.createElement("BR");
        r.cmIgnore = true, this.dom.appendChild(r);
      }
    }
    measureTextSize() {
      if (this.children.length == 0 || this.length > 20) return null;
      let e = 0, t;
      for (let i of this.children) {
        if (!(i instanceof St) || /[^ -~]/.test(i.text)) return null;
        let s = rn(i.dom);
        if (s.length != 1) return null;
        e += s[0].width, t = s[0].height;
      }
      return e ? {
        lineHeight: this.dom.getBoundingClientRect().height,
        charWidth: e / this.length,
        textHeight: t
      } : null;
    }
    coordsAt(e, t) {
      let i = Of(this, e, t);
      if (!this.children.length && i && this.parent) {
        let { heightOracle: s } = this.parent.view.viewState, r = i.bottom - i.top;
        if (Math.abs(r - s.lineHeight) < 2 && s.textHeight < r) {
          let o = (r - s.textHeight) / 2;
          return {
            top: i.top + o,
            bottom: i.bottom - o,
            left: i.left,
            right: i.left
          };
        }
      }
      return i;
    }
    become(e) {
      return e instanceof Ae && this.children.length == 0 && e.children.length == 0 && sr(this.attrs, e.attrs) && this.breakAfter == e.breakAfter;
    }
    covers() {
      return true;
    }
    static find(e, t) {
      for (let i = 0, s = 0; i < e.children.length; i++) {
        let r = e.children[i], o = s + r.length;
        if (o >= t) {
          if (r instanceof Ae) return r;
          if (o > t) break;
        }
        s = o + r.breakAfter;
      }
      return null;
    }
  }
  class Kt extends ce {
    constructor(e, t, i) {
      super(), this.widget = e, this.length = t, this.deco = i, this.breakAfter = 0, this.prevWidget = null;
    }
    merge(e, t, i, s, r, o) {
      return i && (!(i instanceof Kt) || !this.widget.compare(i.widget) || e > 0 && r <= 0 || t < this.length && o <= 0) ? false : (this.length = e + (i ? i.length : 0) + (this.length - t), true);
    }
    domAtPos(e) {
      return e == 0 ? je.before(this.dom) : je.after(this.dom, e == this.length);
    }
    split(e) {
      let t = this.length - e;
      this.length = e;
      let i = new Kt(this.widget, t, this.deco);
      return i.breakAfter = this.breakAfter, i;
    }
    get children() {
      return Nl;
    }
    sync(e) {
      (!this.dom || !this.widget.updateDOM(this.dom, e)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(e)), this.widget.editable || (this.dom.contentEditable = "false"));
    }
    get overrideDOMText() {
      return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : oe.empty;
    }
    domBoundsAround() {
      return null;
    }
    become(e) {
      return e instanceof Kt && e.widget.constructor == this.widget.constructor ? (e.widget.compare(this.widget) || this.markDirty(true), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, this.length = e.length, this.deco = e.deco, this.breakAfter = e.breakAfter, true) : false;
    }
    ignoreMutation() {
      return true;
    }
    ignoreEvent(e) {
      return this.widget.ignoreEvent(e);
    }
    get isEditable() {
      return false;
    }
    get isWidget() {
      return true;
    }
    coordsAt(e, t) {
      let i = this.widget.coordsAt(this.dom, e, t);
      return i || (this.widget instanceof Go ? null : Yn(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0));
    }
    destroy() {
      super.destroy(), this.dom && this.widget.destroy(this.dom);
    }
    covers(e) {
      let { startSide: t, endSide: i } = this.deco;
      return t == i ? false : e < 0 ? t < 0 : i > 0;
    }
  }
  class Go extends ti {
    constructor(e) {
      super(), this.height = e;
    }
    toDOM() {
      let e = document.createElement("div");
      return e.className = "cm-gap", this.updateDOM(e), e;
    }
    eq(e) {
      return e.height == this.height;
    }
    updateDOM(e) {
      return e.style.height = this.height + "px", true;
    }
    get editable() {
      return true;
    }
    get estimatedHeight() {
      return this.height;
    }
    ignoreEvent() {
      return false;
    }
  }
  class Dn {
    constructor(e, t, i, s) {
      this.doc = e, this.pos = t, this.end = i, this.disallowBlockEffectsFor = s, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.bufferMarks = [], this.atCursorPos = true, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = e.iter(), this.skip = t;
    }
    posCovered() {
      if (this.content.length == 0) return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
      let e = this.content[this.content.length - 1];
      return !(e.breakAfter || e instanceof Kt && e.deco.endSide < 0);
    }
    getLine() {
      return this.curLine || (this.content.push(this.curLine = new Ae()), this.atCursorPos = true), this.curLine;
    }
    flushBuffer(e = this.bufferMarks) {
      this.pendingBuffer && (this.curLine.append(ws(new on(-1), e), e.length), this.pendingBuffer = 0);
    }
    addBlockWidget(e) {
      this.flushBuffer(), this.curLine = null, this.content.push(e);
    }
    finish(e) {
      this.pendingBuffer && e <= this.bufferMarks.length ? this.flushBuffer() : this.pendingBuffer = 0, !this.posCovered() && !(e && this.content.length && this.content[this.content.length - 1] instanceof Kt) && this.getLine();
    }
    buildText(e, t, i) {
      for (; e > 0; ) {
        if (this.textOff == this.text.length) {
          let { value: r, lineBreak: o, done: l } = this.cursor.next(this.skip);
          if (this.skip = 0, l) throw new Error("Ran out of text content when drawing inline views");
          if (o) {
            this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer(), this.curLine = null, this.atCursorPos = true, e--;
            continue;
          } else this.text = r, this.textOff = 0;
        }
        let s = Math.min(this.text.length - this.textOff, e, 512);
        this.flushBuffer(t.slice(t.length - i)), this.getLine().append(ws(new St(this.text.slice(this.textOff, this.textOff + s)), t), i), this.atCursorPos = true, this.textOff += s, e -= s, i = 0;
      }
    }
    span(e, t, i, s) {
      this.buildText(t - e, i, s), this.pos = t, this.openStart < 0 && (this.openStart = s);
    }
    point(e, t, i, s, r, o) {
      if (this.disallowBlockEffectsFor[o] && i instanceof yi) {
        if (i.block) throw new RangeError("Block decorations may not be specified via plugins");
        if (t > this.doc.lineAt(this.pos).to) throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
      }
      let l = t - e;
      if (i instanceof yi) if (i.block) i.startSide > 0 && !this.posCovered() && this.getLine(), this.addBlockWidget(new Kt(i.widget || ln.block, l, i));
      else {
        let a = ui.create(i.widget || ln.inline, l, l ? 0 : i.startSide), h = this.atCursorPos && !a.isEditable && r <= s.length && (e < t || i.startSide > 0), c = !a.isEditable && (e < t || r > s.length || i.startSide <= 0), f = this.getLine();
        this.pendingBuffer == 2 && !h && !a.isEditable && (this.pendingBuffer = 0), this.flushBuffer(s), h && (f.append(ws(new on(1), s), r), r = s.length + Math.max(0, r - s.length)), f.append(ws(a, s), r), this.atCursorPos = c, this.pendingBuffer = c ? e < t || r > s.length ? 1 : 2 : 0, this.pendingBuffer && (this.bufferMarks = s.slice());
      }
      else this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
      l && (this.textOff + l <= this.text.length ? this.textOff += l : (this.skip += l - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = t), this.openStart < 0 && (this.openStart = r);
    }
    static build(e, t, i, s, r) {
      let o = new Dn(e, t, i, r);
      return o.openEnd = re.spans(s, t, i, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
    }
  }
  function ws(n, e) {
    for (let t of e) n = new Yt(t, [
      n
    ], n.length);
    return n;
  }
  class ln extends ti {
    constructor(e) {
      super(), this.tag = e;
    }
    eq(e) {
      return e.tag == this.tag;
    }
    toDOM() {
      return document.createElement(this.tag);
    }
    updateDOM(e) {
      return e.nodeName.toLowerCase() == this.tag;
    }
    get isHidden() {
      return true;
    }
  }
  ln.inline = new ln("span");
  ln.block = new ln("div");
  var ge = function(n) {
    return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
  }(ge || (ge = {}));
  const Fi = ge.LTR, Il = ge.RTL;
  function Af(n) {
    let e = [];
    for (let t = 0; t < n.length; t++) e.push(1 << +n[t]);
    return e;
  }
  const xm = Af("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), wm = Af("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Yo = /* @__PURE__ */ Object.create(null), Pt = [];
  for (let n of [
    "()",
    "[]",
    "{}"
  ]) {
    let e = n.charCodeAt(0), t = n.charCodeAt(1);
    Yo[e] = t, Yo[t] = -e;
  }
  function Mf(n) {
    return n <= 247 ? xm[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? wm[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
  }
  const km = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
  class di {
    get dir() {
      return this.level % 2 ? Il : Fi;
    }
    constructor(e, t, i) {
      this.from = e, this.to = t, this.level = i;
    }
    side(e, t) {
      return this.dir == t == e ? this.to : this.from;
    }
    forward(e, t) {
      return e == (this.dir == t);
    }
    static find(e, t, i, s) {
      let r = -1;
      for (let o = 0; o < e.length; o++) {
        let l = e[o];
        if (l.from <= t && l.to >= t) {
          if (l.level == i) return o;
          (r < 0 || (s != 0 ? s < 0 ? l.from < t : l.to > t : e[r].level > l.level)) && (r = o);
        }
      }
      if (r < 0) throw new RangeError("Index out of range");
      return r;
    }
  }
  function Tf(n, e) {
    if (n.length != e.length) return false;
    for (let t = 0; t < n.length; t++) {
      let i = n[t], s = e[t];
      if (i.from != s.from || i.to != s.to || i.direction != s.direction || !Tf(i.inner, s.inner)) return false;
    }
    return true;
  }
  const he = [];
  function vm(n, e, t, i, s) {
    for (let r = 0; r <= i.length; r++) {
      let o = r ? i[r - 1].to : e, l = r < i.length ? i[r].from : t, a = r ? 256 : s;
      for (let h = o, c = a, f = a; h < l; h++) {
        let u = Mf(n.charCodeAt(h));
        u == 512 ? u = c : u == 8 && f == 4 && (u = 16), he[h] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
      }
      for (let h = o, c = a, f = a; h < l; h++) {
        let u = he[h];
        if (u == 128) h < l - 1 && c == he[h + 1] && c & 24 ? u = he[h] = c : he[h] = 256;
        else if (u == 64) {
          let d = h + 1;
          for (; d < l && he[d] == 64; ) d++;
          let p = h && c == 8 || d < t && he[d] == 8 ? f == 1 ? 1 : 8 : 256;
          for (let g = h; g < d; g++) he[g] = p;
          h = d - 1;
        } else u == 8 && f == 1 && (he[h] = 1);
        c = u, u & 7 && (f = u);
      }
    }
  }
  function Sm(n, e, t, i, s) {
    let r = s == 1 ? 2 : 1;
    for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
      let h = o ? i[o - 1].to : e, c = o < i.length ? i[o].from : t;
      for (let f = h, u, d, p; f < c; f++) if (d = Yo[u = n.charCodeAt(f)]) if (d < 0) {
        for (let g = l - 3; g >= 0; g -= 3) if (Pt[g + 1] == -d) {
          let b = Pt[g + 2], y = b & 2 ? s : b & 4 ? b & 1 ? r : s : 0;
          y && (he[f] = he[Pt[g]] = y), l = g;
          break;
        }
      } else {
        if (Pt.length == 189) break;
        Pt[l++] = f, Pt[l++] = u, Pt[l++] = a;
      }
      else if ((p = he[f]) == 2 || p == 1) {
        let g = p == s;
        a = g ? 0 : 1;
        for (let b = l - 3; b >= 0; b -= 3) {
          let y = Pt[b + 2];
          if (y & 2) break;
          if (g) Pt[b + 2] |= 2;
          else {
            if (y & 4) break;
            Pt[b + 2] |= 4;
          }
        }
      }
    }
  }
  function Om(n, e, t, i) {
    for (let s = 0, r = i; s <= t.length; s++) {
      let o = s ? t[s - 1].to : n, l = s < t.length ? t[s].from : e;
      for (let a = o; a < l; ) {
        let h = he[a];
        if (h == 256) {
          let c = a + 1;
          for (; ; ) if (c == l) {
            if (s == t.length) break;
            c = t[s++].to, l = s < t.length ? t[s].from : e;
          } else if (he[c] == 256) c++;
          else break;
          let f = r == 1, u = (c < e ? he[c] : i) == 1, d = f == u ? f ? 1 : 2 : i;
          for (let p = c, g = s, b = g ? t[g - 1].to : n; p > a; ) p == b && (p = t[--g].from, b = g ? t[g - 1].to : n), he[--p] = d;
          a = c;
        } else r = h, a++;
      }
    }
  }
  function Jo(n, e, t, i, s, r, o) {
    let l = i % 2 ? 2 : 1;
    if (i % 2 == s % 2) for (let a = e, h = 0; a < t; ) {
      let c = true, f = false;
      if (h == r.length || a < r[h].from) {
        let g = he[a];
        g != l && (c = false, f = g == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, p = a;
      e: for (; ; ) if (h < r.length && p == r[h].from) {
        if (f) break e;
        let g = r[h];
        if (!c) for (let b = g.to, y = h + 1; ; ) {
          if (b == t) break e;
          if (y < r.length && r[y].from == b) b = r[y++].to;
          else {
            if (he[b] == l) break e;
            break;
          }
        }
        if (h++, u) u.push(g);
        else {
          g.from > a && o.push(new di(a, g.from, d));
          let b = g.direction == Fi != !(d % 2);
          Zo(n, b ? i + 1 : i, s, g.inner, g.from, g.to, o), a = g.to;
        }
        p = g.to;
      } else {
        if (p == t || (c ? he[p] != l : he[p] == l)) break;
        p++;
      }
      u ? Jo(n, a, p, i + 1, s, u, o) : a < p && o.push(new di(a, p, d)), a = p;
    }
    else for (let a = t, h = r.length; a > e; ) {
      let c = true, f = false;
      if (!h || a > r[h - 1].to) {
        let g = he[a - 1];
        g != l && (c = false, f = g == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, p = a;
      e: for (; ; ) if (h && p == r[h - 1].to) {
        if (f) break e;
        let g = r[--h];
        if (!c) for (let b = g.from, y = h; ; ) {
          if (b == e) break e;
          if (y && r[y - 1].to == b) b = r[--y].from;
          else {
            if (he[b - 1] == l) break e;
            break;
          }
        }
        if (u) u.push(g);
        else {
          g.to < a && o.push(new di(g.to, a, d));
          let b = g.direction == Fi != !(d % 2);
          Zo(n, b ? i + 1 : i, s, g.inner, g.from, g.to, o), a = g.from;
        }
        p = g.from;
      } else {
        if (p == e || (c ? he[p - 1] != l : he[p - 1] == l)) break;
        p--;
      }
      u ? Jo(n, p, a, i + 1, s, u, o) : p < a && o.push(new di(p, a, d)), a = p;
    }
  }
  function Zo(n, e, t, i, s, r, o) {
    let l = e % 2 ? 2 : 1;
    vm(n, s, r, i, l), Sm(n, s, r, i, l), Om(s, r, i, l), Jo(n, s, r, e, t, i, o);
  }
  function Cm(n, e, t) {
    if (!n) return [
      new di(0, 0, e == Il ? 1 : 0)
    ];
    if (e == Fi && !t.length && !km.test(n)) return Pf(n.length);
    if (t.length) for (; n.length > he.length; ) he[he.length] = 256;
    let i = [], s = e == Fi ? 0 : 1;
    return Zo(n, s, s, t, 0, n.length, i), i;
  }
  function Pf(n) {
    return [
      new di(0, n, 0)
    ];
  }
  let Df = "";
  function Am(n, e, t, i, s) {
    var r;
    let o = i.head - n.from, l = di.find(e, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), a = e[l], h = a.side(s, t);
    if (o == h) {
      let u = l += s ? 1 : -1;
      if (u < 0 || u >= e.length) return null;
      a = e[l = u], o = a.side(!s, t), h = a.side(s, t);
    }
    let c = Ve(n.text, o, a.forward(s, t));
    (c < a.from || c > a.to) && (c = h), Df = n.text.slice(Math.min(o, c), Math.max(o, c));
    let f = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
    return f && c == h && f.level + (s ? 0 : 1) < a.level ? v.cursor(f.side(!s, t) + n.from, f.forward(s, t) ? 1 : -1, f.level) : v.cursor(c + n.from, a.forward(s, t) ? -1 : 1, a.level);
  }
  function Mm(n, e, t) {
    for (let i = e; i < t; i++) {
      let s = Mf(n.charCodeAt(i));
      if (s == 1) return Fi;
      if (s == 2 || s == 4) return Il;
    }
    return Fi;
  }
  const Rf = B.define(), Ef = B.define(), Bf = B.define(), Lf = B.define(), el = B.define(), _f = B.define(), Nf = B.define(), Fl = B.define(), Hl = B.define(), If = B.define({
    combine: (n) => n.some((e) => e)
  }), Ff = B.define({
    combine: (n) => n.some((e) => e)
  }), Hf = B.define();
  class Zi {
    constructor(e, t = "nearest", i = "nearest", s = 5, r = 5, o = false) {
      this.range = e, this.y = t, this.x = i, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
    }
    map(e) {
      return e.empty ? this : new Zi(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
    }
    clip(e) {
      return this.range.to <= e.doc.length ? this : new Zi(v.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
    }
  }
  const ks = j.define({
    map: (n, e) => n.map(e)
  }), Wf = j.define();
  function st(n, e, t) {
    let i = n.facet(Lf);
    i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
  }
  const $t = B.define({
    combine: (n) => n.length ? n[0] : true
  });
  let Tm = 0;
  const $i = B.define({
    combine(n) {
      return n.filter((e, t) => {
        for (let i = 0; i < t; i++) if (n[i].plugin == e.plugin) return false;
        return true;
      });
    }
  });
  class Oe {
    constructor(e, t, i, s, r) {
      this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat($i.of({
        plugin: this,
        arg: void 0
      }));
    }
    of(e) {
      return this.baseExtensions.concat($i.of({
        plugin: this,
        arg: e
      }));
    }
    static define(e, t) {
      const { eventHandlers: i, eventObservers: s, provide: r, decorations: o } = t || {};
      return new Oe(Tm++, e, i, s, (l) => {
        let a = [];
        return o && a.push(Hn.of((h) => {
          let c = h.plugin(l);
          return c ? o(c) : z.none;
        })), r && a.push(r(l)), a;
      });
    }
    static fromClass(e, t) {
      return Oe.define((i, s) => new e(i, s), t);
    }
  }
  class io {
    constructor(e) {
      this.spec = e, this.mustUpdate = null, this.value = null;
    }
    get plugin() {
      return this.spec && this.spec.plugin;
    }
    update(e) {
      if (this.value) {
        if (this.mustUpdate) {
          let t = this.mustUpdate;
          if (this.mustUpdate = null, this.value.update) try {
            this.value.update(t);
          } catch (i) {
            if (st(t.state, i, "CodeMirror plugin crashed"), this.value.destroy) try {
              this.value.destroy();
            } catch {
            }
            this.deactivate();
          }
        }
      } else if (this.spec) try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        st(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
      return this;
    }
    destroy(e) {
      var t;
      if (!((t = this.value) === null || t === void 0) && t.destroy) try {
        this.value.destroy();
      } catch (i) {
        st(e.state, i, "CodeMirror plugin crashed");
      }
    }
    deactivate() {
      this.spec = this.value = null;
    }
  }
  const zf = B.define(), Wl = B.define(), Hn = B.define(), Vf = B.define(), zl = B.define(), Qf = B.define();
  function Ja(n, e) {
    let t = n.state.facet(Qf);
    if (!t.length) return t;
    let i = t.map((r) => r instanceof Function ? r(n) : r), s = [];
    return re.spans(i, e.from, e.to, {
      point() {
      },
      span(r, o, l, a) {
        let h = r - e.from, c = o - e.from, f = s;
        for (let u = l.length - 1; u >= 0; u--, a--) {
          let d = l[u].spec.bidiIsolate, p;
          if (d == null && (d = Mm(e.text, h, c)), a > 0 && f.length && (p = f[f.length - 1]).to == h && p.direction == d) p.to = c, f = p.inner;
          else {
            let g = {
              from: h,
              to: c,
              direction: d,
              inner: []
            };
            f.push(g), f = g.inner;
          }
        }
      }
    }), s;
  }
  const qf = B.define();
  function Vl(n) {
    let e = 0, t = 0, i = 0, s = 0;
    for (let r of n.state.facet(qf)) {
      let o = r(n);
      o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
    }
    return {
      left: e,
      right: t,
      top: i,
      bottom: s
    };
  }
  const Sn = B.define();
  class mt {
    constructor(e, t, i, s) {
      this.fromA = e, this.toA = t, this.fromB = i, this.toB = s;
    }
    join(e) {
      return new mt(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
    }
    addToSet(e) {
      let t = e.length, i = this;
      for (; t > 0; t--) {
        let s = e[t - 1];
        if (!(s.fromA > i.toA)) {
          if (s.toA < i.fromA) break;
          i = i.join(s), e.splice(t - 1, 1);
        }
      }
      return e.splice(t, 0, i), e;
    }
    static extendWithRanges(e, t) {
      if (t.length == 0) return e;
      let i = [];
      for (let s = 0, r = 0, o = 0, l = 0; ; s++) {
        let a = s == e.length ? null : e[s], h = o - l, c = a ? a.fromB : 1e9;
        for (; r < t.length && t[r] < c; ) {
          let f = t[r], u = t[r + 1], d = Math.max(l, f), p = Math.min(c, u);
          if (d <= p && new mt(d + h, p + h, d, p).addToSet(i), u > c) break;
          r += 2;
        }
        if (!a) return i;
        new mt(a.fromA, a.toA, a.fromB, a.toB).addToSet(i), o = a.toA, l = a.toB;
      }
    }
  }
  class rr {
    constructor(e, t, i) {
      this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = De.empty(this.startState.doc.length);
      for (let r of i) this.changes = this.changes.compose(r.changes);
      let s = [];
      this.changes.iterChangedRanges((r, o, l, a) => s.push(new mt(r, o, l, a))), this.changedRanges = s;
    }
    static create(e, t, i) {
      return new rr(e, t, i);
    }
    get viewportChanged() {
      return (this.flags & 4) > 0;
    }
    get viewportMoved() {
      return (this.flags & 8) > 0;
    }
    get heightChanged() {
      return (this.flags & 2) > 0;
    }
    get geometryChanged() {
      return this.docChanged || (this.flags & 18) > 0;
    }
    get focusChanged() {
      return (this.flags & 1) > 0;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get selectionSet() {
      return this.transactions.some((e) => e.selection);
    }
    get empty() {
      return this.flags == 0 && this.transactions.length == 0;
    }
  }
  class Za extends ce {
    get length() {
      return this.view.state.doc.length;
    }
    constructor(e) {
      super(), this.view = e, this.decorations = [], this.dynamicDecorationMap = [
        false
      ], this.domChanged = null, this.hasComposition = null, this.markedForComposition = /* @__PURE__ */ new Set(), this.editContextFormatting = z.none, this.lastCompositionAfterCursor = false, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = false, this.lastUpdate = Date.now(), this.setDOM(e.contentDOM), this.children = [
        new Ae()
      ], this.children[0].setParent(this), this.updateDeco(), this.updateInner([
        new mt(0, 0, 0, e.state.doc.length)
      ], 0, null);
    }
    update(e) {
      var t;
      let i = e.changedRanges;
      this.minWidth > 0 && i.length && (i.every(({ fromA: h, toA: c }) => c < this.minWidthFrom || h > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
      let s = -1;
      this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !_m(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
      let r = s > -1 ? Dm(this.view, e.changes, s) : null;
      if (this.domChanged = null, this.hasComposition) {
        this.markedForComposition.clear();
        let { from: h, to: c } = this.hasComposition;
        i = new mt(h, c, e.changes.mapPos(h, -1), e.changes.mapPos(c, 1)).addToSet(i.slice());
      }
      this.hasComposition = r ? {
        from: r.range.fromB,
        to: r.range.toB
      } : null, (L.ie || L.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = true);
      let o = this.decorations, l = this.updateDeco(), a = Bm(o, l, e.changes);
      return i = mt.extendWithRanges(i, a), !(this.flags & 7) && i.length == 0 ? false : (this.updateInner(i, e.startState.doc.length, r), e.transactions.length && (this.lastUpdate = Date.now()), true);
    }
    updateInner(e, t, i) {
      this.view.viewState.mustMeasureContent = true, this.updateChildren(e, t, i);
      let { observer: s } = this.view;
      s.ignore(() => {
        this.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
        let o = L.chrome || L.ios ? {
          node: s.selectionRange.focusNode,
          written: false
        } : void 0;
        this.sync(this.view, o), this.flags &= -8, o && (o.written || s.selectionRange.focusNode != o.node) && (this.forceSelection = true), this.dom.style.height = "";
      }), this.markedForComposition.forEach((o) => o.flags &= -9);
      let r = [];
      if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) for (let o of this.children) o instanceof Kt && o.widget instanceof Go && r.push(o.dom);
      s.updateGaps(r);
    }
    updateChildren(e, t, i) {
      let s = i ? i.range.addToSet(e.slice()) : e, r = this.childCursor(t);
      for (let o = s.length - 1; ; o--) {
        let l = o >= 0 ? s[o] : null;
        if (!l) break;
        let { fromA: a, toA: h, fromB: c, toB: f } = l, u, d, p, g;
        if (i && i.range.fromB < f && i.range.toB > c) {
          let C = Dn.build(this.view.state.doc, c, i.range.fromB, this.decorations, this.dynamicDecorationMap), w = Dn.build(this.view.state.doc, i.range.toB, f, this.decorations, this.dynamicDecorationMap);
          d = C.breakAtStart, p = C.openStart, g = w.openEnd;
          let O = this.compositionView(i);
          w.breakAtStart ? O.breakAfter = 1 : w.content.length && O.merge(O.length, O.length, w.content[0], false, w.openStart, 0) && (O.breakAfter = w.content[0].breakAfter, w.content.shift()), C.content.length && O.merge(0, 0, C.content[C.content.length - 1], true, 0, C.openEnd) && C.content.pop(), u = C.content.concat(O).concat(w.content);
        } else ({ content: u, breakAtStart: d, openStart: p, openEnd: g } = Dn.build(this.view.state.doc, c, f, this.decorations, this.dynamicDecorationMap));
        let { i: b, off: y } = r.findPos(h, 1), { i: S, off: A } = r.findPos(a, -1);
        yf(this, S, A, b, y, u, d, p, g);
      }
      i && this.fixCompositionDOM(i);
    }
    updateEditContextFormatting(e) {
      this.editContextFormatting = this.editContextFormatting.map(e.changes);
      for (let t of e.transactions) for (let i of t.effects) i.is(Wf) && (this.editContextFormatting = i.value);
    }
    compositionView(e) {
      let t = new St(e.text.nodeValue);
      t.flags |= 8;
      for (let { deco: s } of e.marks) t = new Yt(s, [
        t
      ], t.length);
      let i = new Ae();
      return i.append(t, 0), i;
    }
    fixCompositionDOM(e) {
      let t = (r, o) => {
        o.flags |= 8 | (o.children.some((a) => a.flags & 7) ? 1 : 0), this.markedForComposition.add(o);
        let l = ce.get(r);
        l && l != o && (l.dom = null), o.setDOM(r);
      }, i = this.childPos(e.range.fromB, 1), s = this.children[i.i];
      t(e.line, s);
      for (let r = e.marks.length - 1; r >= -1; r--) i = s.childPos(i.off, 1), s = s.children[i.i], t(r >= 0 ? e.marks[r].node : e.text, s);
    }
    updateSelection(e = false, t = false) {
      (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
      let i = this.view.root.activeElement, s = i == this.dom, r = !s && !(this.view.state.facet($t) || this.dom.tabIndex > -1) && Xs(this.dom, this.view.observer.selectionRange) && !(i && this.dom.contains(i));
      if (!(s || t || r)) return;
      let o = this.forceSelection;
      this.forceSelection = false;
      let l = this.view.state.selection.main, a = this.moveToLine(this.domAtPos(l.anchor)), h = l.empty ? a : this.moveToLine(this.domAtPos(l.head));
      if (L.gecko && l.empty && !this.hasComposition && Pm(a)) {
        let f = document.createTextNode("");
        this.view.observer.ignore(() => a.node.insertBefore(f, a.node.childNodes[a.offset] || null)), a = h = new je(f, 0), o = true;
      }
      let c = this.view.observer.selectionRange;
      (o || !c.focusNode || (!Pn(a.node, a.offset, c.anchorNode, c.anchorOffset) || !Pn(h.node, h.offset, c.focusNode, c.focusOffset)) && !this.suppressWidgetCursorChange(c, l)) && (this.view.observer.ignore(() => {
        L.android && L.chrome && this.dom.contains(c.focusNode) && Lm(c.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({
          preventScroll: true
        }));
        let f = Fn(this.view.root);
        if (f) if (l.empty) {
          if (L.gecko) {
            let u = Rm(a.node, a.offset);
            if (u && u != 3) {
              let d = (u == 1 ? gf : mf)(a.node, a.offset);
              d && (a = new je(d.node, d.offset));
            }
          }
          f.collapse(a.node, a.offset), l.bidiLevel != null && f.caretBidiLevel !== void 0 && (f.caretBidiLevel = l.bidiLevel);
        } else if (f.extend) {
          f.collapse(a.node, a.offset);
          try {
            f.extend(h.node, h.offset);
          } catch {
          }
        } else {
          let u = document.createRange();
          l.anchor > l.head && ([a, h] = [
            h,
            a
          ]), u.setEnd(h.node, h.offset), u.setStart(a.node, a.offset), f.removeAllRanges(), f.addRange(u);
        }
        r && this.view.root.activeElement == this.dom && (this.dom.blur(), i && i.focus());
      }), this.view.observer.setSelectionRange(a, h)), this.impreciseAnchor = a.precise ? null : new je(c.anchorNode, c.anchorOffset), this.impreciseHead = h.precise ? null : new je(c.focusNode, c.focusOffset);
    }
    suppressWidgetCursorChange(e, t) {
      return this.hasComposition && t.empty && Pn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
    }
    enforceCursorAssoc() {
      if (this.hasComposition) return;
      let { view: e } = this, t = e.state.selection.main, i = Fn(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
      if (!i || !t.empty || !t.assoc || !i.modify) return;
      let o = Ae.find(this, t.head);
      if (!o) return;
      let l = o.posAtStart;
      if (t.head == l || t.head == l + o.length) return;
      let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
      if (!a || !h || a.bottom > h.top) return;
      let c = this.domAtPos(t.head + t.assoc);
      i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
      let f = e.observer.selectionRange;
      e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(s, r);
    }
    moveToLine(e) {
      let t = this.dom, i;
      if (e.node != t) return e;
      for (let s = e.offset; !i && s < t.childNodes.length; s++) {
        let r = ce.get(t.childNodes[s]);
        r instanceof Ae && (i = r.domAtPos(0));
      }
      for (let s = e.offset - 1; !i && s >= 0; s--) {
        let r = ce.get(t.childNodes[s]);
        r instanceof Ae && (i = r.domAtPos(r.length));
      }
      return i ? new je(i.node, i.offset, true) : e;
    }
    nearest(e) {
      for (let t = e; t; ) {
        let i = ce.get(t);
        if (i && i.rootView == this) return i;
        t = t.parentNode;
      }
      return null;
    }
    posFromDOM(e, t) {
      let i = this.nearest(e);
      if (!i) throw new RangeError("Trying to find position for a DOM position outside of the document");
      return i.localPosFromDOM(e, t) + i.posAtStart;
    }
    domAtPos(e) {
      let { i: t, off: i } = this.childCursor().findPos(e, -1);
      for (; t < this.children.length - 1; ) {
        let s = this.children[t];
        if (i < s.length || s instanceof Ae) break;
        t++, i = 0;
      }
      return this.children[t].domAtPos(i);
    }
    coordsAt(e, t) {
      let i = null, s = 0;
      for (let r = this.length, o = this.children.length - 1; o >= 0; o--) {
        let l = this.children[o], a = r - l.breakAfter, h = a - l.length;
        if (a < e) break;
        if (h <= e && (h < e || l.covers(-1)) && (a > e || l.covers(1)) && (!i || l instanceof Ae && !(i instanceof Ae && t >= 0))) i = l, s = h;
        else if (i && h == e && a == e && l instanceof Kt && Math.abs(t) < 2) {
          if (l.deco.startSide < 0) break;
          o && (i = null);
        }
        r = h;
      }
      return i ? i.coordsAt(e - s, t) : null;
    }
    coordsForChar(e) {
      let { i: t, off: i } = this.childPos(e, 1), s = this.children[t];
      if (!(s instanceof Ae)) return null;
      for (; s.children.length; ) {
        let { i: l, off: a } = s.childPos(i, 1);
        for (; ; l++) {
          if (l == s.children.length) return null;
          if ((s = s.children[l]).length) break;
        }
        i = a;
      }
      if (!(s instanceof St)) return null;
      let r = Ve(s.text, i);
      if (r == i) return null;
      let o = Ii(s.dom, i, r).getClientRects();
      for (let l = 0; l < o.length; l++) {
        let a = o[l];
        if (l == o.length - 1 || a.top < a.bottom && a.left < a.right) return a;
      }
      return null;
    }
    measureVisibleLineHeights(e) {
      let t = [], { from: i, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == ge.LTR;
      for (let h = 0, c = 0; c < this.children.length; c++) {
        let f = this.children[c], u = h + f.length;
        if (u > s) break;
        if (h >= i) {
          let d = f.dom.getBoundingClientRect();
          if (t.push(d.height), o) {
            let p = f.dom.lastChild, g = p ? rn(p) : [];
            if (g.length) {
              let b = g[g.length - 1], y = a ? b.right - d.left : d.right - b.left;
              y > l && (l = y, this.minWidth = r, this.minWidthFrom = h, this.minWidthTo = u);
            }
          }
        }
        h = u + f.breakAfter;
      }
      return t;
    }
    textDirectionAt(e) {
      let { i: t } = this.childPos(e, 1);
      return getComputedStyle(this.children[t].dom).direction == "rtl" ? ge.RTL : ge.LTR;
    }
    measureTextSize() {
      for (let r of this.children) if (r instanceof Ae) {
        let o = r.measureTextSize();
        if (o) return o;
      }
      let e = document.createElement("div"), t, i, s;
      return e.className = "cm-line", e.style.width = "99999px", e.style.position = "absolute", e.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
        this.dom.appendChild(e);
        let r = rn(e.firstChild)[0];
        t = e.getBoundingClientRect().height, i = r ? r.width / 27 : 7, s = r ? r.height : t, e.remove();
      }), {
        lineHeight: t,
        charWidth: i,
        textHeight: s
      };
    }
    childCursor(e = this.length) {
      let t = this.children.length;
      return t && (e -= this.children[--t].length), new bf(this.children, e, t);
    }
    computeBlockGapDeco() {
      let e = [], t = this.view.viewState;
      for (let i = 0, s = 0; ; s++) {
        let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.length;
        if (o > i) {
          let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
          e.push(z.replace({
            widget: new Go(l),
            block: true,
            inclusive: true,
            isBlockGap: true
          }).range(i, o));
        }
        if (!r) break;
        i = r.to + 1;
      }
      return z.set(e);
    }
    updateDeco() {
      let e = 1, t = this.view.state.facet(Hn).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), i = false, s = this.view.state.facet(Vf).map((r, o) => {
        let l = typeof r == "function";
        return l && (i = true), l ? r(this.view) : r;
      });
      for (s.length && (this.dynamicDecorationMap[e++] = i, t.push(re.join(s))), this.decorations = [
        this.editContextFormatting,
        ...t,
        this.computeBlockGapDeco(),
        this.view.viewState.lineGapDeco
      ]; e < this.decorations.length; ) this.dynamicDecorationMap[e++] = false;
      return this.decorations;
    }
    scrollIntoView(e) {
      if (e.isSnapshot) {
        let h = this.view.viewState.lineBlockAt(e.range.head);
        this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
        return;
      }
      for (let h of this.view.state.facet(Hf)) try {
        if (h(this.view, e.range, e)) return true;
      } catch (c) {
        st(this.view.state, c, "scroll handler");
      }
      let { range: t } = e, i = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), s;
      if (!i) return;
      !t.empty && (s = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
        left: Math.min(i.left, s.left),
        top: Math.min(i.top, s.top),
        right: Math.max(i.right, s.right),
        bottom: Math.max(i.bottom, s.bottom)
      });
      let r = Vl(this.view), o = {
        left: i.left - r.left,
        top: i.top - r.top,
        right: i.right + r.right,
        bottom: i.bottom + r.bottom
      }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
      lm(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == ge.LTR);
    }
  }
  function Pm(n) {
    return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
  }
  function Xf(n, e) {
    let t = n.observer.selectionRange;
    if (!t.focusNode) return null;
    let i = gf(t.focusNode, t.focusOffset), s = mf(t.focusNode, t.focusOffset), r = i || s;
    if (s && i && s.node != i.node) {
      let l = ce.get(s.node);
      if (!l || l instanceof St && l.text != s.node.nodeValue) r = s;
      else if (n.docView.lastCompositionAfterCursor) {
        let a = ce.get(i.node);
        !a || a instanceof St && a.text != i.node.nodeValue || (r = s);
      }
    }
    if (n.docView.lastCompositionAfterCursor = r != i, !r) return null;
    let o = e - r.offset;
    return {
      from: o,
      to: o + r.node.nodeValue.length,
      node: r.node
    };
  }
  function Dm(n, e, t) {
    let i = Xf(n, t);
    if (!i) return null;
    let { node: s, from: r, to: o } = i, l = s.nodeValue;
    if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l) return null;
    let a = e.invertedDesc, h = new mt(a.mapPos(r), a.mapPos(o), r, o), c = [];
    for (let f = s.parentNode; ; f = f.parentNode) {
      let u = ce.get(f);
      if (u instanceof Yt) c.push({
        node: f,
        deco: u.mark
      });
      else {
        if (u instanceof Ae || f.nodeName == "DIV" && f.parentNode == n.contentDOM) return {
          range: h,
          text: s,
          marks: c,
          line: f
        };
        if (f != n.contentDOM) c.push({
          node: f,
          deco: new Jn({
            inclusive: true,
            attributes: bm(f),
            tagName: f.tagName.toLowerCase()
          })
        });
        else return null;
      }
    }
  }
  function Rm(n, e) {
    return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
  }
  let Em = class {
    constructor() {
      this.changes = [];
    }
    compareRange(e, t) {
      Us(e, t, this.changes);
    }
    comparePoint(e, t) {
      Us(e, t, this.changes);
    }
    boundChange(e) {
      Us(e, e, this.changes);
    }
  };
  function Bm(n, e, t) {
    let i = new Em();
    return re.compare(n, e, t, i), i.changes;
  }
  function Lm(n, e) {
    for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode) if (t.nodeType == 1 && t.contentEditable == "false") return true;
    return false;
  }
  function _m(n, e) {
    let t = false;
    return e && n.iterChangedRanges((i, s) => {
      i < e.to && s > e.from && (t = true);
    }), t;
  }
  function Nm(n, e, t = 1) {
    let i = n.charCategorizer(e), s = n.doc.lineAt(e), r = e - s.from;
    if (s.length == 0) return v.cursor(e);
    r == 0 ? t = 1 : r == s.length && (t = -1);
    let o = r, l = r;
    t < 0 ? o = Ve(s.text, r, false) : l = Ve(s.text, r);
    let a = i(s.text.slice(o, l));
    for (; o > 0; ) {
      let h = Ve(s.text, o, false);
      if (i(s.text.slice(h, o)) != a) break;
      o = h;
    }
    for (; l < s.length; ) {
      let h = Ve(s.text, l);
      if (i(s.text.slice(l, h)) != a) break;
      l = h;
    }
    return v.range(o + s.from, l + s.from);
  }
  function Im(n, e) {
    return e.left > n ? e.left - n : Math.max(0, n - e.right);
  }
  function Fm(n, e) {
    return e.top > n ? e.top - n : Math.max(0, n - e.bottom);
  }
  function no(n, e) {
    return n.top < e.bottom - 1 && n.bottom > e.top + 1;
  }
  function eh(n, e) {
    return e < n.top ? {
      top: e,
      left: n.left,
      right: n.right,
      bottom: n.bottom
    } : n;
  }
  function th(n, e) {
    return e > n.bottom ? {
      top: n.top,
      left: n.left,
      right: n.right,
      bottom: e
    } : n;
  }
  function tl(n, e, t) {
    let i, s, r, o, l = false, a, h, c, f;
    for (let p = n.firstChild; p; p = p.nextSibling) {
      let g = rn(p);
      for (let b = 0; b < g.length; b++) {
        let y = g[b];
        s && no(s, y) && (y = eh(th(y, s.bottom), s.top));
        let S = Im(e, y), A = Fm(t, y);
        if (S == 0 && A == 0) return p.nodeType == 3 ? ih(p, e, t) : tl(p, e, t);
        if (!i || o > A || o == A && r > S) {
          i = p, s = y, r = S, o = A;
          let C = A ? t < y.top ? -1 : 1 : S ? e < y.left ? -1 : 1 : 0;
          l = !C || (C > 0 ? b < g.length - 1 : b > 0);
        }
        S == 0 ? t > y.bottom && (!c || c.bottom < y.bottom) ? (a = p, c = y) : t < y.top && (!f || f.top > y.top) && (h = p, f = y) : c && no(c, y) ? c = th(c, y.bottom) : f && no(f, y) && (f = eh(f, y.top));
      }
    }
    if (c && c.bottom >= t ? (i = a, s = c) : f && f.top <= t && (i = h, s = f), !i) return {
      node: n,
      offset: 0
    };
    let u = Math.max(s.left, Math.min(s.right, e));
    if (i.nodeType == 3) return ih(i, u, t);
    if (l && i.contentEditable != "false") return tl(i, u, t);
    let d = Array.prototype.indexOf.call(n.childNodes, i) + (e >= (s.left + s.right) / 2 ? 1 : 0);
    return {
      node: n,
      offset: d
    };
  }
  function ih(n, e, t) {
    let i = n.nodeValue.length, s = -1, r = 1e9, o = 0;
    for (let l = 0; l < i; l++) {
      let a = Ii(n, l, l + 1).getClientRects();
      for (let h = 0; h < a.length; h++) {
        let c = a[h];
        if (c.top == c.bottom) continue;
        o || (o = e - c.left);
        let f = (c.top > t ? c.top - t : t - c.bottom) - 1;
        if (c.left - 1 <= e && c.right + 1 >= e && f < r) {
          let u = e >= (c.left + c.right) / 2, d = u;
          if ((L.chrome || L.gecko) && Ii(n, l).getBoundingClientRect().left == c.right && (d = !u), f <= 0) return {
            node: n,
            offset: l + (d ? 1 : 0)
          };
          s = l + (d ? 1 : 0), r = f;
        }
      }
    }
    return {
      node: n,
      offset: s > -1 ? s : o > 0 ? n.nodeValue.length : 0
    };
  }
  function Uf(n, e, t, i = -1) {
    var s, r;
    let o = n.contentDOM.getBoundingClientRect(), l = o.top + n.viewState.paddingTop, a, { docHeight: h } = n.viewState, { x: c, y: f } = e, u = f - l;
    if (u < 0) return 0;
    if (u > h) return n.state.doc.length;
    for (let C = n.viewState.heightOracle.textHeight / 2, w = false; a = n.elementAtHeight(u), a.type != Je.Text; ) for (; u = i > 0 ? a.bottom + C : a.top - C, !(u >= 0 && u <= h); ) {
      if (w) return t ? null : 0;
      w = true, i = -i;
    }
    f = l + u;
    let d = a.from;
    if (d < n.viewport.from) return n.viewport.from == 0 ? 0 : t ? null : nh(n, o, a, c, f);
    if (d > n.viewport.to) return n.viewport.to == n.state.doc.length ? n.state.doc.length : t ? null : nh(n, o, a, c, f);
    let p = n.dom.ownerDocument, g = n.root.elementFromPoint ? n.root : p, b = g.elementFromPoint(c, f);
    b && !n.contentDOM.contains(b) && (b = null), b || (c = Math.max(o.left + 1, Math.min(o.right - 1, c)), b = g.elementFromPoint(c, f), b && !n.contentDOM.contains(b) && (b = null));
    let y, S = -1;
    if (b && ((s = n.docView.nearest(b)) === null || s === void 0 ? void 0 : s.isEditable) != false) {
      if (p.caretPositionFromPoint) {
        let C = p.caretPositionFromPoint(c, f);
        C && ({ offsetNode: y, offset: S } = C);
      } else if (p.caretRangeFromPoint) {
        let C = p.caretRangeFromPoint(c, f);
        C && ({ startContainer: y, startOffset: S } = C, (!n.contentDOM.contains(y) || L.safari && Hm(y, S, c) || L.chrome && Wm(y, S, c)) && (y = void 0));
      }
      y && (S = Math.min(Ht(y), S));
    }
    if (!y || !n.docView.dom.contains(y)) {
      let C = Ae.find(n.docView, d);
      if (!C) return u > a.top + a.height / 2 ? a.to : a.from;
      ({ node: y, offset: S } = tl(C.dom, c, f));
    }
    let A = n.docView.nearest(y);
    if (!A) return null;
    if (A.isWidget && ((r = A.dom) === null || r === void 0 ? void 0 : r.nodeType) == 1) {
      let C = A.dom.getBoundingClientRect();
      return e.y < C.top || e.y <= C.bottom && e.x <= (C.left + C.right) / 2 ? A.posAtStart : A.posAtEnd;
    } else return A.localPosFromDOM(y, S) + A.posAtStart;
  }
  function nh(n, e, t, i, s) {
    let r = Math.round((i - e.left) * n.defaultCharacterWidth);
    if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
      let l = n.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (n.defaultLineHeight - l) * 0.5) / l);
      r += a * n.viewState.heightOracle.lineLength;
    }
    let o = n.state.sliceDoc(t.from, t.to);
    return t.from + zo(o, r, n.state.tabSize);
  }
  function Hm(n, e, t) {
    let i;
    if (n.nodeType != 3 || e != (i = n.nodeValue.length)) return false;
    for (let s = n.nextSibling; s; s = s.nextSibling) if (s.nodeType != 1 || s.nodeName != "BR") return false;
    return Ii(n, i - 1, i).getBoundingClientRect().left > t;
  }
  function Wm(n, e, t) {
    if (e != 0) return false;
    for (let s = n; ; ) {
      let r = s.parentNode;
      if (!r || r.nodeType != 1 || r.firstChild != s) return false;
      if (r.classList.contains("cm-line")) break;
      s = r;
    }
    let i = n.nodeType == 1 ? n.getBoundingClientRect() : Ii(n, 0, Math.max(n.nodeValue.length, 1)).getBoundingClientRect();
    return t - i.left > 5;
  }
  function il(n, e, t) {
    let i = n.lineBlockAt(e);
    if (Array.isArray(i.type)) {
      let s;
      for (let r of i.type) {
        if (r.from > e) break;
        if (!(r.to < e)) {
          if (r.from < e && r.to > e) return r;
          (!s || r.type == Je.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
        }
      }
      return s || i;
    }
    return i;
  }
  function zm(n, e, t, i) {
    let s = il(n, e.head, e.assoc || -1), r = !i || s.type != Je.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
    if (r) {
      let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(s.from), a = n.posAtCoords({
        x: t == (l == ge.LTR) ? o.right - 1 : o.left + 1,
        y: (r.top + r.bottom) / 2
      });
      if (a != null) return v.cursor(a, t ? -1 : 1);
    }
    return v.cursor(t ? s.to : s.from, t ? -1 : 1);
  }
  function sh(n, e, t, i) {
    let s = n.state.doc.lineAt(e.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
    for (let l = e, a = null; ; ) {
      let h = Am(s, r, o, l, t), c = Df;
      if (!h) {
        if (s.number == (t ? n.state.doc.lines : 1)) return l;
        c = `
`, s = n.state.doc.line(s.number + (t ? 1 : -1)), r = n.bidiSpans(s), h = n.visualLineSide(s, !t);
      }
      if (a) {
        if (!a(c)) return l;
      } else {
        if (!i) return h;
        a = i(c);
      }
      l = h;
    }
  }
  function Vm(n, e, t) {
    let i = n.state.charCategorizer(e), s = i(t);
    return (r) => {
      let o = i(r);
      return s == me.Space && (s = o), s == o;
    };
  }
  function Qm(n, e, t, i) {
    let s = e.head, r = t ? 1 : -1;
    if (s == (t ? n.state.doc.length : 0)) return v.cursor(s, e.assoc);
    let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(s, e.assoc || -1), c = n.documentTop;
    if (h) o == null && (o = h.left - a.left), l = r < 0 ? h.top : h.bottom;
    else {
      let d = n.viewState.lineBlockAt(s);
      o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (s - d.from))), l = (r < 0 ? d.top : d.bottom) + c;
    }
    let f = a.left + o, u = i ?? n.viewState.heightOracle.textHeight >> 1;
    for (let d = 0; ; d += 10) {
      let p = l + (u + d) * r, g = Uf(n, {
        x: f,
        y: p
      }, false, r);
      if (p < a.top || p > a.bottom || (r < 0 ? g < s : g > s)) {
        let b = n.docView.coordsForChar(g), y = !b || p < b.top ? -1 : 1;
        return v.cursor(g, y, void 0, o);
      }
    }
  }
  function $s(n, e, t) {
    for (; ; ) {
      let i = 0;
      for (let s of n) s.between(e - 1, e + 1, (r, o, l) => {
        if (e > r && e < o) {
          let a = i || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, i = a;
        }
      });
      if (!i) return e;
    }
  }
  function so(n, e, t) {
    let i = $s(n.state.facet(zl).map((s) => s(n)), t.from, e.head > t.from ? -1 : 1);
    return i == t.from ? t : v.cursor(i, i < t.from ? 1 : -1);
  }
  const On = "\uFFFF";
  class qm {
    constructor(e, t) {
      this.points = e, this.text = "", this.lineSeparator = t.facet(ie.lineSeparator);
    }
    append(e) {
      this.text += e;
    }
    lineBreak() {
      this.text += On;
    }
    readRange(e, t) {
      if (!e) return this;
      let i = e.parentNode;
      for (let s = e; ; ) {
        this.findPointBefore(i, s);
        let r = this.text.length;
        this.readNode(s);
        let o = s.nextSibling;
        if (o == t) break;
        let l = ce.get(s), a = ce.get(o);
        (l && a ? l.breakAfter : (l ? l.breakAfter : nr(s)) || nr(o) && (s.nodeName != "BR" || s.cmIgnore) && this.text.length > r) && this.lineBreak(), s = o;
      }
      return this.findPointBefore(i, t), this;
    }
    readTextNode(e) {
      let t = e.nodeValue;
      for (let i of this.points) i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
      for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
        let r = -1, o = 1, l;
        if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = s.exec(t)) && (r = l.index, o = l[0].length), this.append(t.slice(i, r < 0 ? t.length : r)), r < 0) break;
        if (this.lineBreak(), o > 1) for (let a of this.points) a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
        i = r + o;
      }
    }
    readNode(e) {
      if (e.cmIgnore) return;
      let t = ce.get(e), i = t && t.overrideDOMText;
      if (i != null) {
        this.findPointInside(e, i.length);
        for (let s = i.iter(); !s.next().done; ) s.lineBreak ? this.lineBreak() : this.append(s.value);
      } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
    }
    findPointBefore(e, t) {
      for (let i of this.points) i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
    }
    findPointInside(e, t) {
      for (let i of this.points) (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (Xm(e, i.node, i.offset) ? t : 0));
    }
  }
  function Xm(n, e, t) {
    for (; ; ) {
      if (!e || t < Ht(e)) return false;
      if (e == n) return true;
      t = Ni(e) + 1, e = e.parentNode;
    }
  }
  class rh {
    constructor(e, t) {
      this.node = e, this.offset = t, this.pos = -1;
    }
  }
  class Um {
    constructor(e, t, i, s) {
      this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
      let { impreciseHead: r, impreciseAnchor: o } = e.docView;
      if (e.state.readOnly && t > -1) this.newSel = null;
      else if (t > -1 && (this.bounds = e.docView.domBoundsAround(t, i, 0))) {
        let l = r || o ? [] : Km(e), a = new qm(l, e.state);
        a.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = a.text, this.newSel = Gm(l, this.bounds.from);
      } else {
        let l = e.observer.selectionRange, a = r && r.node == l.focusNode && r.offset == l.focusOffset || !qo(e.contentDOM, l.focusNode) ? e.state.selection.main.head : e.docView.posFromDOM(l.focusNode, l.focusOffset), h = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !qo(e.contentDOM, l.anchorNode) ? e.state.selection.main.anchor : e.docView.posFromDOM(l.anchorNode, l.anchorOffset), c = e.viewport;
        if ((L.ios || L.chrome) && e.state.selection.main.empty && a != h && (c.from > 0 || c.to < e.state.doc.length)) {
          let f = Math.min(a, h), u = Math.max(a, h), d = c.from - f, p = c.to - u;
          (d == 0 || d == 1 || f == 0) && (p == 0 || p == -1 || u == e.state.doc.length) && (a = 0, h = e.state.doc.length);
        }
        this.newSel = v.single(h, a);
      }
    }
  }
  function $f(n, e) {
    let t, { newSel: i } = e, s = n.state.selection.main, r = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
    if (e.bounds) {
      let { from: o, to: l } = e.bounds, a = s.from, h = null;
      (r === 8 || L.android && e.text.length < l - o) && (a = s.to, h = "end");
      let c = jm(n.state.doc.sliceString(o, l, On), e.text, a - o, h);
      c && (L.chrome && r == 13 && c.toB == c.from + 2 && e.text.slice(c.from, c.toB) == On + On && c.toB--, t = {
        from: o + c.from,
        to: o + c.toA,
        insert: oe.of(e.text.slice(c.from, c.toB).split(On))
      });
    } else i && (!n.hasFocus && n.state.facet($t) || i.main.eq(s)) && (i = null);
    if (!t && !i) return false;
    if (!t && e.typeOver && !s.empty && i && i.main.empty ? t = {
      from: s.from,
      to: s.to,
      insert: n.state.doc.slice(s.from, s.to)
    } : (L.mac || L.android) && t && t.from == t.to && t.from == s.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = v.single(i.main.anchor - 1, i.main.head - 1)), t = {
      from: t.from,
      to: t.to,
      insert: oe.of([
        t.insert.toString().replace(".", " ")
      ])
    }) : t && t.from >= s.from && t.to <= s.to && (t.from != s.from || t.to != s.to) && s.to - s.from - (t.to - t.from) <= 4 ? t = {
      from: s.from,
      to: s.to,
      insert: n.state.doc.slice(s.from, t.from).append(t.insert).append(n.state.doc.slice(t.to, s.to))
    } : L.chrome && t && t.from == t.to && t.from == s.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = v.single(i.main.anchor - 1, i.main.head - 1)), t = {
      from: s.from,
      to: s.to,
      insert: oe.of([
        " "
      ])
    }), t) return Ql(n, t, i, r);
    if (i && !i.main.eq(s)) {
      let o = false, l = "select";
      return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = true), l = n.inputState.lastSelectionOrigin), n.dispatch({
        selection: i,
        scrollIntoView: o,
        userEvent: l
      }), true;
    } else return false;
  }
  function Ql(n, e, t, i = -1) {
    if (L.ios && n.inputState.flushIOSKey(e)) return true;
    let s = n.state.selection.main;
    if (L.android && (e.to == s.to && (e.from == s.from || e.from == s.from - 1 && n.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Ji(n.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > s.head) && Ji(n.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && Ji(n.contentDOM, "Delete", 46))) return true;
    let r = e.insert.toString();
    n.inputState.composing >= 0 && n.inputState.composing++;
    let o, l = () => o || (o = $m(n, e, t));
    return n.state.facet(_f).some((a) => a(n, e.from, e.to, r, l)) || n.dispatch(l()), true;
  }
  function $m(n, e, t) {
    let i, s = n.state, r = s.selection.main;
    if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
      let l = r.from < e.from ? s.sliceDoc(r.from, e.from) : "", a = r.to > e.to ? s.sliceDoc(e.to, r.to) : "";
      i = s.replaceSelection(n.state.toText(l + e.insert.sliceString(0, void 0, n.state.lineBreak) + a));
    } else {
      let l = s.changes(e), a = t && t.main.to <= l.newLength ? t.main : void 0;
      if (s.selection.ranges.length > 1 && n.inputState.composing >= 0 && e.to <= r.to && e.to >= r.to - 10) {
        let h = n.state.sliceDoc(e.from, e.to), c, f = t && Xf(n, t.main.head);
        if (f) {
          let p = e.insert.length - (e.to - e.from);
          c = {
            from: f.from,
            to: f.to - p
          };
        } else c = n.state.doc.lineAt(r.head);
        let u = r.to - e.to, d = r.to - r.from;
        i = s.changeByRange((p) => {
          if (p.from == r.from && p.to == r.to) return {
            changes: l,
            range: a || p.map(l)
          };
          let g = p.to - u, b = g - h.length;
          if (p.to - p.from != d || n.state.sliceDoc(b, g) != h || p.to >= c.from && p.from <= c.to) return {
            range: p
          };
          let y = s.changes({
            from: b,
            to: g,
            insert: e.insert
          }), S = p.to - r.to;
          return {
            changes: y,
            range: a ? v.range(Math.max(0, a.anchor + S), Math.max(0, a.head + S)) : p.map(y)
          };
        });
      } else i = {
        changes: l,
        selection: a && s.selection.replaceRange(a)
      };
    }
    let o = "input.type";
    return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = false, o += ".compose", n.inputState.compositionFirstChange && (o += ".start", n.inputState.compositionFirstChange = false)), s.update(i, {
      userEvent: o,
      scrollIntoView: true
    });
  }
  function jm(n, e, t, i) {
    let s = Math.min(n.length, e.length), r = 0;
    for (; r < s && n.charCodeAt(r) == e.charCodeAt(r); ) r++;
    if (r == s && n.length == e.length) return null;
    let o = n.length, l = e.length;
    for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); ) o--, l--;
    if (i == "end") {
      let a = Math.max(0, r - Math.min(o, l));
      t -= o + a - r;
    }
    if (o < r && n.length < e.length) {
      let a = t <= r && t >= o ? r - t : 0;
      r -= a, l = r + (l - o), o = r;
    } else if (l < r) {
      let a = t <= r && t >= l ? r - t : 0;
      r -= a, o = r + (o - l), l = r;
    }
    return {
      from: r,
      toA: o,
      toB: l
    };
  }
  function Km(n) {
    let e = [];
    if (n.root.activeElement != n.contentDOM) return e;
    let { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
    return t && (e.push(new rh(t, i)), (s != t || r != i) && e.push(new rh(s, r))), e;
  }
  function Gm(n, e) {
    if (n.length == 0) return null;
    let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
    return t > -1 && i > -1 ? v.single(t + e, i + e) : null;
  }
  class Ym {
    setSelectionOrigin(e) {
      this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
    }
    constructor(e) {
      this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = false, this.compositionPendingChange = false, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, L.safari && e.contentDOM.addEventListener("input", () => null), L.gecko && d0(e.contentDOM.ownerDocument);
    }
    handleEvent(e) {
      !r0(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
    }
    runHandlers(e, t) {
      let i = this.handlers[e];
      if (i) {
        for (let s of i.observers) s(this.view, t);
        for (let s of i.handlers) {
          if (t.defaultPrevented) break;
          if (s(this.view, t)) {
            t.preventDefault();
            break;
          }
        }
      }
    }
    ensureHandlers(e) {
      let t = Jm(e), i = this.handlers, s = this.view.contentDOM;
      for (let r in t) if (r != "scroll") {
        let o = !t[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (s.removeEventListener(r, this.handleEvent), l = null), l || s.addEventListener(r, this.handleEvent, {
          passive: o
        });
      }
      for (let r in i) r != "scroll" && !t[r] && s.removeEventListener(r, this.handleEvent);
      this.handlers = t;
    }
    keydown(e) {
      if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode)) return true;
      if (this.tabFocusMode > 0 && e.keyCode != 27 && Kf.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), L.android && L.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8)) return this.view.observer.delayAndroidKey(e.key, e.keyCode), true;
      let t;
      return L.ios && !e.synthetic && !e.altKey && !e.metaKey && ((t = jf.find((i) => i.keyCode == e.keyCode)) && !e.ctrlKey || Zm.indexOf(e.key) > -1 && e.ctrlKey && !e.shiftKey) ? (this.pendingIOSKey = t || e, setTimeout(() => this.flushIOSKey(), 250), true) : (e.keyCode != 229 && this.view.observer.forceFlush(), false);
    }
    flushIOSKey(e) {
      let t = this.pendingIOSKey;
      return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? false : (this.pendingIOSKey = void 0, Ji(this.view.contentDOM, t.key, t.keyCode, t instanceof KeyboardEvent ? t : void 0));
    }
    ignoreDuringComposition(e) {
      return /^key/.test(e.type) ? this.composing > 0 ? true : L.safari && !L.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = false, true) : false : false;
    }
    startMouseSelection(e) {
      this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
    }
    update(e) {
      this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
    }
    destroy() {
      this.mouseSelection && this.mouseSelection.destroy();
    }
  }
  function oh(n, e) {
    return (t, i) => {
      try {
        return e.call(n, i, t);
      } catch (s) {
        st(t.state, s);
      }
    };
  }
  function Jm(n) {
    let e = /* @__PURE__ */ Object.create(null);
    function t(i) {
      return e[i] || (e[i] = {
        observers: [],
        handlers: []
      });
    }
    for (let i of n) {
      let s = i.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
      if (r) for (let l in r) {
        let a = r[l];
        a && t(l).handlers.push(oh(i.value, a));
      }
      if (o) for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(oh(i.value, a));
      }
    }
    for (let i in Ot) t(i).handlers.push(Ot[i]);
    for (let i in yt) t(i).observers.push(yt[i]);
    return e;
  }
  const jf = [
    {
      key: "Backspace",
      keyCode: 8,
      inputType: "deleteContentBackward"
    },
    {
      key: "Enter",
      keyCode: 13,
      inputType: "insertParagraph"
    },
    {
      key: "Enter",
      keyCode: 13,
      inputType: "insertLineBreak"
    },
    {
      key: "Delete",
      keyCode: 46,
      inputType: "deleteContentForward"
    }
  ], Zm = "dthko", Kf = [
    16,
    17,
    18,
    20,
    91,
    92,
    224,
    225
  ], vs = 6;
  function Ss(n) {
    return Math.max(0, n) * 0.7 + 8;
  }
  function e0(n, e) {
    return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
  }
  class t0 {
    constructor(e, t, i, s) {
      this.view = e, this.startEvent = t, this.style = i, this.mustSelect = s, this.scrollSpeed = {
        x: 0,
        y: 0
      }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = am(e.contentDOM), this.atoms = e.state.facet(zl).map((o) => o(e));
      let r = e.contentDOM.ownerDocument;
      r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(ie.allowMultipleSelections) && i0(e, t), this.dragging = s0(e, t) && Jf(t) == 1 ? null : false;
    }
    start(e) {
      this.dragging === false && this.select(e);
    }
    move(e) {
      if (e.buttons == 0) return this.destroy();
      if (this.dragging || this.dragging == null && e0(this.startEvent, e) < 10) return;
      this.select(this.lastEvent = e);
      let t = 0, i = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
      this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
      let a = Vl(this.view);
      e.clientX - a.left <= s + vs ? t = -Ss(s - e.clientX) : e.clientX + a.right >= o - vs && (t = Ss(e.clientX - o)), e.clientY - a.top <= r + vs ? i = -Ss(r - e.clientY) : e.clientY + a.bottom >= l - vs && (i = Ss(e.clientY - l)), this.setScrollSpeed(t, i);
    }
    up(e) {
      this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
    }
    destroy() {
      this.setScrollSpeed(0, 0);
      let e = this.view.contentDOM.ownerDocument;
      e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
    }
    setScrollSpeed(e, t) {
      this.scrollSpeed = {
        x: e,
        y: t
      }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
    }
    scroll() {
      let { x: e, y: t } = this.scrollSpeed;
      e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === false && this.select(this.lastEvent);
    }
    skipAtoms(e) {
      let t = null;
      for (let i = 0; i < e.ranges.length; i++) {
        let s = e.ranges[i], r = null;
        if (s.empty) {
          let o = $s(this.atoms, s.from, 0);
          o != s.from && (r = v.cursor(o, -1));
        } else {
          let o = $s(this.atoms, s.from, -1), l = $s(this.atoms, s.to, 1);
          (o != s.from || l != s.to) && (r = v.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
        }
        r && (t || (t = e.ranges.slice()), t[i] = r);
      }
      return t ? v.create(t, e.mainIndex) : e;
    }
    select(e) {
      let { view: t } = this, i = this.skipAtoms(this.style.get(e, this.extend, this.multiple));
      (this.mustSelect || !i.eq(t.state.selection, this.dragging === false)) && this.view.dispatch({
        selection: i,
        userEvent: "select.pointer"
      }), this.mustSelect = false;
    }
    update(e) {
      e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
    }
  }
  function i0(n, e) {
    let t = n.state.facet(Rf);
    return t.length ? t[0](e) : L.mac ? e.metaKey : e.ctrlKey;
  }
  function n0(n, e) {
    let t = n.state.facet(Ef);
    return t.length ? t[0](e) : L.mac ? !e.altKey : !e.ctrlKey;
  }
  function s0(n, e) {
    let { main: t } = n.state.selection;
    if (t.empty) return false;
    let i = Fn(n.root);
    if (!i || i.rangeCount == 0) return true;
    let s = i.getRangeAt(0).getClientRects();
    for (let r = 0; r < s.length; r++) {
      let o = s[r];
      if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY) return true;
    }
    return false;
  }
  function r0(n, e) {
    if (!e.bubbles) return true;
    if (e.defaultPrevented) return false;
    for (let t = e.target, i; t != n.contentDOM; t = t.parentNode) if (!t || t.nodeType == 11 || (i = ce.get(t)) && i.ignoreEvent(e)) return false;
    return true;
  }
  const Ot = /* @__PURE__ */ Object.create(null), yt = /* @__PURE__ */ Object.create(null), Gf = L.ie && L.ie_version < 15 || L.ios && L.webkit_version < 604;
  function o0(n) {
    let e = n.dom.parentNode;
    if (!e) return;
    let t = e.appendChild(document.createElement("textarea"));
    t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
      n.focus(), t.remove(), Yf(n, t.value);
    }, 50);
  }
  function Rr(n, e, t) {
    for (let i of n.facet(e)) t = i(t, n);
    return t;
  }
  function Yf(n, e) {
    e = Rr(n.state, Fl, e);
    let { state: t } = n, i, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
    if (nl != null && t.selection.ranges.every((a) => a.empty) && nl == r.toString()) {
      let a = -1;
      i = t.changeByRange((h) => {
        let c = t.doc.lineAt(h.from);
        if (c.from == a) return {
          range: h
        };
        a = c.from;
        let f = t.toText((o ? r.line(s++).text : e) + t.lineBreak);
        return {
          changes: {
            from: c.from,
            insert: f
          },
          range: v.cursor(h.from + f.length)
        };
      });
    } else o ? i = t.changeByRange((a) => {
      let h = r.line(s++);
      return {
        changes: {
          from: a.from,
          to: a.to,
          insert: h.text
        },
        range: v.cursor(a.from + h.length)
      };
    }) : i = t.replaceSelection(r);
    n.dispatch(i, {
      userEvent: "input.paste",
      scrollIntoView: true
    });
  }
  yt.scroll = (n) => {
    n.inputState.lastScrollTop = n.scrollDOM.scrollTop, n.inputState.lastScrollLeft = n.scrollDOM.scrollLeft;
  };
  Ot.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), false);
  yt.touchstart = (n, e) => {
    n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
  };
  yt.touchmove = (n) => {
    n.inputState.setSelectionOrigin("select.pointer");
  };
  Ot.mousedown = (n, e) => {
    if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3) return false;
    let t = null;
    for (let i of n.state.facet(Bf)) if (t = i(n, e), t) break;
    if (!t && e.button == 0 && (t = h0(n, e)), t) {
      let i = !n.hasFocus;
      n.inputState.startMouseSelection(new t0(n, e, t, i)), i && n.observer.ignore(() => {
        uf(n.contentDOM);
        let r = n.root.activeElement;
        r && !r.contains(n.contentDOM) && r.blur();
      });
      let s = n.inputState.mouseSelection;
      if (s) return s.start(e), s.dragging === false;
    }
    return false;
  };
  function lh(n, e, t, i) {
    if (i == 1) return v.cursor(e, t);
    if (i == 2) return Nm(n.state, e, t);
    {
      let s = Ae.find(n.docView, e), r = n.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
      return l < n.state.doc.length && l == r.to && l++, v.range(o, l);
    }
  }
  let ah = (n, e, t) => e >= t.top && e <= t.bottom && n >= t.left && n <= t.right;
  function l0(n, e, t, i) {
    let s = Ae.find(n.docView, e);
    if (!s) return 1;
    let r = e - s.posAtStart;
    if (r == 0) return 1;
    if (r == s.length) return -1;
    let o = s.coordsAt(r, -1);
    if (o && ah(t, i, o)) return -1;
    let l = s.coordsAt(r, 1);
    return l && ah(t, i, l) ? 1 : o && o.bottom >= i ? -1 : 1;
  }
  function hh(n, e) {
    let t = n.posAtCoords({
      x: e.clientX,
      y: e.clientY
    }, false);
    return {
      pos: t,
      bias: l0(n, t, e.clientX, e.clientY)
    };
  }
  const a0 = L.ie && L.ie_version <= 11;
  let ch = null, fh = 0, uh = 0;
  function Jf(n) {
    if (!a0) return n.detail;
    let e = ch, t = uh;
    return ch = n, uh = Date.now(), fh = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (fh + 1) % 3 : 1;
  }
  function h0(n, e) {
    let t = hh(n, e), i = Jf(e), s = n.state.selection;
    return {
      update(r) {
        r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
      },
      get(r, o, l) {
        let a = hh(n, r), h, c = lh(n, a.pos, a.bias, i);
        if (t.pos != a.pos && !o) {
          let f = lh(n, t.pos, t.bias, i), u = Math.min(f.from, c.from), d = Math.max(f.to, c.to);
          c = u < c.from ? v.range(u, d) : v.range(d, u);
        }
        return o ? s.replaceRange(s.main.extend(c.from, c.to)) : l && i == 1 && s.ranges.length > 1 && (h = c0(s, a.pos)) ? h : l ? s.addRange(c) : v.create([
          c
        ]);
      }
    };
  }
  function c0(n, e) {
    for (let t = 0; t < n.ranges.length; t++) {
      let { from: i, to: s } = n.ranges[t];
      if (i <= e && s >= e) return v.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
    }
    return null;
  }
  Ot.dragstart = (n, e) => {
    let { selection: { main: t } } = n.state;
    if (e.target.draggable) {
      let s = n.docView.nearest(e.target);
      if (s && s.isWidget) {
        let r = s.posAtStart, o = r + s.length;
        (r >= t.to || o <= t.from) && (t = v.range(r, o));
      }
    }
    let { inputState: i } = n;
    return i.mouseSelection && (i.mouseSelection.dragging = true), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Rr(n.state, Hl, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), false;
  };
  Ot.dragend = (n) => (n.inputState.draggedContent = null, false);
  function dh(n, e, t, i) {
    if (t = Rr(n.state, Fl, t), !t) return;
    let s = n.posAtCoords({
      x: e.clientX,
      y: e.clientY
    }, false), { draggedContent: r } = n.inputState, o = i && r && n0(n, e) ? {
      from: r.from,
      to: r.to
    } : null, l = {
      from: s,
      insert: t
    }, a = n.state.changes(o ? [
      o,
      l
    ] : l);
    n.focus(), n.dispatch({
      changes: a,
      selection: {
        anchor: a.mapPos(s, -1),
        head: a.mapPos(s, 1)
      },
      userEvent: o ? "move.drop" : "input.drop"
    }), n.inputState.draggedContent = null;
  }
  Ot.drop = (n, e) => {
    if (!e.dataTransfer) return false;
    if (n.state.readOnly) return true;
    let t = e.dataTransfer.files;
    if (t && t.length) {
      let i = Array(t.length), s = 0, r = () => {
        ++s == t.length && dh(n, e, i.filter((o) => o != null).join(n.state.lineBreak), false);
      };
      for (let o = 0; o < t.length; o++) {
        let l = new FileReader();
        l.onerror = r, l.onload = () => {
          /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
        }, l.readAsText(t[o]);
      }
      return true;
    } else {
      let i = e.dataTransfer.getData("Text");
      if (i) return dh(n, e, i, true), true;
    }
    return false;
  };
  Ot.paste = (n, e) => {
    if (n.state.readOnly) return true;
    n.observer.flush();
    let t = Gf ? null : e.clipboardData;
    return t ? (Yf(n, t.getData("text/plain") || t.getData("text/uri-list")), true) : (o0(n), false);
  };
  function f0(n, e) {
    let t = n.dom.parentNode;
    if (!t) return;
    let i = t.appendChild(document.createElement("textarea"));
    i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
      i.remove(), n.focus();
    }, 50);
  }
  function u0(n) {
    let e = [], t = [], i = false;
    for (let s of n.selection.ranges) s.empty || (e.push(n.sliceDoc(s.from, s.to)), t.push(s));
    if (!e.length) {
      let s = -1;
      for (let { from: r } of n.selection.ranges) {
        let o = n.doc.lineAt(r);
        o.number > s && (e.push(o.text), t.push({
          from: o.from,
          to: Math.min(n.doc.length, o.to + 1)
        })), s = o.number;
      }
      i = true;
    }
    return {
      text: Rr(n, Hl, e.join(n.lineBreak)),
      ranges: t,
      linewise: i
    };
  }
  let nl = null;
  Ot.copy = Ot.cut = (n, e) => {
    let { text: t, ranges: i, linewise: s } = u0(n.state);
    if (!t && !s) return false;
    nl = s ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
      changes: i,
      scrollIntoView: true,
      userEvent: "delete.cut"
    });
    let r = Gf ? null : e.clipboardData;
    return r ? (r.clearData(), r.setData("text/plain", t), true) : (f0(n, t), false);
  };
  const Zf = ei.define();
  function eu(n, e) {
    let t = [];
    for (let i of n.facet(Nf)) {
      let s = i(n, e);
      s && t.push(s);
    }
    return t.length ? n.update({
      effects: t,
      annotations: Zf.of(true)
    }) : null;
  }
  function tu(n) {
    setTimeout(() => {
      let e = n.hasFocus;
      if (e != n.inputState.notifiedFocused) {
        let t = eu(n.state, e);
        t ? n.dispatch(t) : n.update([]);
      }
    }, 10);
  }
  yt.focus = (n) => {
    n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), tu(n);
  };
  yt.blur = (n) => {
    n.observer.clearSelectionRange(), tu(n);
  };
  yt.compositionstart = yt.compositionupdate = (n) => {
    n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = true), n.inputState.composing < 0 && (n.inputState.composing = 0));
  };
  yt.compositionend = (n) => {
    n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = true, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, L.chrome && L.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
      n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
    }, 50));
  };
  yt.contextmenu = (n) => {
    n.inputState.lastContextMenu = Date.now();
  };
  Ot.beforeinput = (n, e) => {
    var t, i;
    if (e.inputType == "insertReplacementText" && n.observer.editContext) {
      let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
      if (r && o.length) {
        let l = o[0], a = n.posAtDOM(l.startContainer, l.startOffset), h = n.posAtDOM(l.endContainer, l.endOffset);
        return Ql(n, {
          from: a,
          to: h,
          insert: n.state.toText(r)
        }, null), true;
      }
    }
    let s;
    if (L.chrome && L.android && (s = jf.find((r) => r.inputType == e.inputType)) && (n.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
      let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
      setTimeout(() => {
        var o;
        (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
      }, 100);
    }
    return L.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), L.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => yt.compositionend(n, e), 20), false;
  };
  const ph = /* @__PURE__ */ new Set();
  function d0(n) {
    ph.has(n) || (ph.add(n), n.addEventListener("copy", () => {
    }), n.addEventListener("cut", () => {
    }));
  }
  const gh = [
    "pre-wrap",
    "normal",
    "pre-line",
    "break-spaces"
  ];
  let an = false;
  function mh() {
    an = false;
  }
  class p0 {
    constructor(e) {
      this.lineWrapping = e, this.doc = oe.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
    }
    heightForGap(e, t) {
      let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
      return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
    }
    heightForLine(e) {
      return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
    }
    setDoc(e) {
      return this.doc = e, this;
    }
    mustRefreshForWrapping(e) {
      return gh.indexOf(e) > -1 != this.lineWrapping;
    }
    mustRefreshForHeights(e) {
      let t = false;
      for (let i = 0; i < e.length; i++) {
        let s = e[i];
        s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (t = true, this.heightSamples[Math.floor(s * 10)] = true);
      }
      return t;
    }
    refresh(e, t, i, s, r, o) {
      let l = gh.indexOf(e) > -1, a = Math.round(t) != Math.round(this.lineHeight) || this.lineWrapping != l;
      if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = s, this.lineLength = r, a) {
        this.heightSamples = {};
        for (let h = 0; h < o.length; h++) {
          let c = o[h];
          c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = true;
        }
      }
      return a;
    }
  }
  class g0 {
    constructor(e, t) {
      this.from = e, this.heights = t, this.index = 0;
    }
    get more() {
      return this.index < this.heights.length;
    }
  }
  class _t {
    constructor(e, t, i, s, r) {
      this.from = e, this.length = t, this.top = i, this.height = s, this._content = r;
    }
    get type() {
      return typeof this._content == "number" ? Je.Text : Array.isArray(this._content) ? this._content : this._content.type;
    }
    get to() {
      return this.from + this.length;
    }
    get bottom() {
      return this.top + this.height;
    }
    get widget() {
      return this._content instanceof yi ? this._content.widget : null;
    }
    get widgetLineBreaks() {
      return typeof this._content == "number" ? this._content : 0;
    }
    join(e) {
      let t = (Array.isArray(this._content) ? this._content : [
        this
      ]).concat(Array.isArray(e._content) ? e._content : [
        e
      ]);
      return new _t(this.from, this.length + e.length, this.top, this.height + e.height, t);
    }
  }
  var pe = function(n) {
    return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
  }(pe || (pe = {}));
  const js = 1e-3;
  class Ze {
    constructor(e, t, i = 2) {
      this.length = e, this.height = t, this.flags = i;
    }
    get outdated() {
      return (this.flags & 2) > 0;
    }
    set outdated(e) {
      this.flags = (e ? 2 : 0) | this.flags & -3;
    }
    setHeight(e) {
      this.height != e && (Math.abs(this.height - e) > js && (an = true), this.height = e);
    }
    replace(e, t, i) {
      return Ze.of(i);
    }
    decomposeLeft(e, t) {
      t.push(this);
    }
    decomposeRight(e, t) {
      t.push(this);
    }
    applyChanges(e, t, i, s) {
      let r = this, o = i.doc;
      for (let l = s.length - 1; l >= 0; l--) {
        let { fromA: a, toA: h, fromB: c, toB: f } = s[l], u = r.lineAt(a, pe.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h ? u : r.lineAt(h, pe.ByPosNoHeight, i, 0, 0);
        for (f += d.to - h, h = d.to; l > 0 && u.from <= s[l - 1].toA; ) a = s[l - 1].fromA, c = s[l - 1].fromB, l--, a < u.from && (u = r.lineAt(a, pe.ByPosNoHeight, i, 0, 0));
        c += u.from - a, a = u.from;
        let p = ql.build(i.setDoc(o), e, c, f);
        r = or(r, r.replace(a, h, p));
      }
      return r.updateHeight(i, 0);
    }
    static empty() {
      return new ut(0, 0);
    }
    static of(e) {
      if (e.length == 1) return e[0];
      let t = 0, i = e.length, s = 0, r = 0;
      for (; ; ) if (t == i) if (s > r * 2) {
        let l = e[t - 1];
        l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, s -= l.size;
      } else if (r > s * 2) {
        let l = e[i];
        l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
      } else break;
      else if (s < r) {
        let l = e[t++];
        l && (s += l.size);
      } else {
        let l = e[--i];
        l && (r += l.size);
      }
      let o = 0;
      return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new m0(Ze.of(e.slice(0, t)), o, Ze.of(e.slice(i)));
    }
  }
  function or(n, e) {
    return n == e ? n : (n.constructor != e.constructor && (an = true), e);
  }
  Ze.prototype.size = 1;
  class iu extends Ze {
    constructor(e, t, i) {
      super(e, t), this.deco = i;
    }
    blockAt(e, t, i, s) {
      return new _t(s, this.length, i, this.height, this.deco || 0);
    }
    lineAt(e, t, i, s, r) {
      return this.blockAt(0, i, s, r);
    }
    forEachLine(e, t, i, s, r, o) {
      e <= r + this.length && t >= r && o(this.blockAt(0, i, s, r));
    }
    updateHeight(e, t = 0, i = false, s) {
      return s && s.from <= t && s.more && this.setHeight(s.heights[s.index++]), this.outdated = false, this;
    }
    toString() {
      return `block(${this.length})`;
    }
  }
  class ut extends iu {
    constructor(e, t) {
      super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0;
    }
    blockAt(e, t, i, s) {
      return new _t(s, this.length, i, this.height, this.breaks);
    }
    replace(e, t, i) {
      let s = i[0];
      return i.length == 1 && (s instanceof ut || s instanceof He && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof He ? s = new ut(s.length, this.height) : s.height = this.height, this.outdated || (s.outdated = false), s) : Ze.of(i);
    }
    updateHeight(e, t = 0, i = false, s) {
      return s && s.from <= t && s.more ? this.setHeight(s.heights[s.index++]) : (i || this.outdated) && this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight), this.outdated = false, this;
    }
    toString() {
      return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
    }
  }
  class He extends Ze {
    constructor(e) {
      super(e, 0);
    }
    heightMetrics(e, t) {
      let i = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - i + 1, o, l = 0;
      if (e.lineWrapping) {
        let a = Math.min(this.height, e.lineHeight * r);
        o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
      } else o = this.height / r;
      return {
        firstLine: i,
        lastLine: s,
        perLine: o,
        perChar: l
      };
    }
    blockAt(e, t, i, s) {
      let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, s);
      if (t.lineWrapping) {
        let h = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, u = Math.max(i, e - f / 2);
        return new _t(c.from, c.length, u, f, 0);
      } else {
        let h = Math.max(0, Math.min(o - r, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(r + h);
        return new _t(c, f, i + l * h, l, 0);
      }
    }
    lineAt(e, t, i, s, r) {
      if (t == pe.ByHeight) return this.blockAt(e, i, s, r);
      if (t == pe.ByPosNoHeight) {
        let { from: d, to: p } = i.doc.lineAt(e);
        return new _t(d, p - d, 0, 0, 0);
      }
      let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, r), h = i.doc.lineAt(e), c = l + h.length * a, f = h.number - o, u = s + l * f + a * (h.from - r - f);
      return new _t(h.from, h.length, Math.max(s, Math.min(u, s + this.height - c)), c, 0);
    }
    forEachLine(e, t, i, s, r, o) {
      e = Math.max(e, r), t = Math.min(t, r + this.length);
      let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, r);
      for (let c = e, f = s; c <= t; ) {
        let u = i.doc.lineAt(c);
        if (c == e) {
          let p = u.number - l;
          f += a * p + h * (e - r - p);
        }
        let d = a + h * u.length;
        o(new _t(u.from, u.length, f, d, 0)), f += d, c = u.to + 1;
      }
    }
    replace(e, t, i) {
      let s = this.length - t;
      if (s > 0) {
        let r = i[i.length - 1];
        r instanceof He ? i[i.length - 1] = new He(r.length + s) : i.push(null, new He(s - 1));
      }
      if (e > 0) {
        let r = i[0];
        r instanceof He ? i[0] = new He(e + r.length) : i.unshift(new He(e - 1), null);
      }
      return Ze.of(i);
    }
    decomposeLeft(e, t) {
      t.push(new He(e - 1), null);
    }
    decomposeRight(e, t) {
      t.push(null, new He(this.length - e - 1));
    }
    updateHeight(e, t = 0, i = false, s) {
      let r = t + this.length;
      if (s && s.from <= t + this.length && s.more) {
        let o = [], l = Math.max(t, s.from), a = -1;
        for (s.from > t && o.push(new He(s.from - t - 1).updateHeight(e, t)); l <= r && s.more; ) {
          let c = e.doc.lineAt(l).length;
          o.length && o.push(null);
          let f = s.heights[s.index++];
          a == -1 ? a = f : Math.abs(f - a) >= js && (a = -2);
          let u = new ut(c, f);
          u.outdated = false, o.push(u), l += c + 1;
        }
        l <= r && o.push(null, new He(r - l).updateHeight(e, l));
        let h = Ze.of(o);
        return (a < 0 || Math.abs(h.height - this.height) >= js || Math.abs(a - this.heightMetrics(e, t).perLine) >= js) && (an = true), or(this, h);
      } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = false);
      return this;
    }
    toString() {
      return `gap(${this.length})`;
    }
  }
  class m0 extends Ze {
    constructor(e, t, i) {
      super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
    }
    get break() {
      return this.flags & 1;
    }
    blockAt(e, t, i, s) {
      let r = i + this.left.height;
      return e < r ? this.left.blockAt(e, t, i, s) : this.right.blockAt(e, t, r, s + this.left.length + this.break);
    }
    lineAt(e, t, i, s, r) {
      let o = s + this.left.height, l = r + this.left.length + this.break, a = t == pe.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, s, r) : this.right.lineAt(e, t, i, o, l);
      if (this.break || (a ? h.to < l : h.from > l)) return h;
      let c = t == pe.ByPosNoHeight ? pe.ByPosNoHeight : pe.ByPos;
      return a ? h.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, s, r).join(h);
    }
    forEachLine(e, t, i, s, r, o) {
      let l = s + this.left.height, a = r + this.left.length + this.break;
      if (this.break) e < a && this.left.forEachLine(e, t, i, s, r, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
      else {
        let h = this.lineAt(a, pe.ByPos, i, s, r);
        e < h.from && this.left.forEachLine(e, h.from - 1, i, s, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
      }
    }
    replace(e, t, i) {
      let s = this.left.length + this.break;
      if (t < s) return this.balanced(this.left.replace(e, t, i), this.right);
      if (e > this.left.length) return this.balanced(this.left, this.right.replace(e - s, t - s, i));
      let r = [];
      e > 0 && this.decomposeLeft(e, r);
      let o = r.length;
      for (let l of i) r.push(l);
      if (e > 0 && bh(r, o - 1), t < this.length) {
        let l = r.length;
        this.decomposeRight(t, r), bh(r, l);
      }
      return Ze.of(r);
    }
    decomposeLeft(e, t) {
      let i = this.left.length;
      if (e <= i) return this.left.decomposeLeft(e, t);
      t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
    }
    decomposeRight(e, t) {
      let i = this.left.length, s = i + this.break;
      if (e >= s) return this.right.decomposeRight(e - s, t);
      e < i && this.left.decomposeRight(e, t), this.break && e < s && t.push(null), t.push(this.right);
    }
    balanced(e, t) {
      return e.size > 2 * t.size || t.size > 2 * e.size ? Ze.of(this.break ? [
        e,
        null,
        t
      ] : [
        e,
        t
      ]) : (this.left = or(this.left, e), this.right = or(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
    }
    updateHeight(e, t = 0, i = false, s) {
      let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
      return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, i, s) : r.updateHeight(e, t, i), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(e, l, i, s) : o.updateHeight(e, l, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = false, this);
    }
    toString() {
      return this.left + (this.break ? " " : "-") + this.right;
    }
  }
  function bh(n, e) {
    let t, i;
    n[e] == null && (t = n[e - 1]) instanceof He && (i = n[e + 1]) instanceof He && n.splice(e - 1, 3, new He(t.length + 1 + i.length));
  }
  const b0 = 5;
  class ql {
    constructor(e, t) {
      this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
    }
    get isCovered() {
      return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
    }
    span(e, t) {
      if (this.lineStart > -1) {
        let i = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
        s instanceof ut ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new ut(i - this.pos, -1)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
      }
      this.pos = t;
    }
    point(e, t, i) {
      if (e < t || i.heightRelevant) {
        let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
        s < 0 && (s = this.oracle.lineHeight);
        let o = t - e;
        i.block ? this.addBlock(new iu(o, s, i)) : (o || r || s >= b0) && this.addLineDeco(s, r, o);
      } else t > e && this.span(e, t);
      this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
    }
    enterLine() {
      if (this.lineStart > -1) return;
      let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
      this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new ut(this.pos - e, -1)), this.writtenTo = this.pos;
    }
    blankContent(e, t) {
      let i = new He(t - e);
      return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
    }
    ensureLine() {
      this.enterLine();
      let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
      if (e instanceof ut) return e;
      let t = new ut(0, -1);
      return this.nodes.push(t), t;
    }
    addBlock(e) {
      this.enterLine();
      let t = e.deco;
      t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
    }
    addLineDeco(e, t, i) {
      let s = this.ensureLine();
      s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, e), s.breaks += t, this.writtenTo = this.pos = this.pos + i;
    }
    finish(e) {
      let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
      this.lineStart > -1 && !(t instanceof ut) && !this.isCovered ? this.nodes.push(new ut(0, -1)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
      let i = e;
      for (let s of this.nodes) s instanceof ut && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
      return this.nodes;
    }
    static build(e, t, i, s) {
      let r = new ql(i, e);
      return re.spans(t, i, s, r, 0), r.finish(i);
    }
  }
  function y0(n, e, t) {
    let i = new x0();
    return re.compare(n, e, t, i, 0), i.changes;
  }
  class x0 {
    constructor() {
      this.changes = [];
    }
    compareRange() {
    }
    comparePoint(e, t, i, s) {
      (e < t || i && i.heightRelevant || s && s.heightRelevant) && Us(e, t, this.changes, 5);
    }
  }
  function w0(n, e) {
    let t = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
    for (let h = n.parentNode; h && h != i.body; ) if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h == n.parentNode ? s.innerHeight : a, u.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11) h = h.host;
    else break;
    return {
      left: r - t.left,
      right: Math.max(r, o) - t.left,
      top: l - (t.top + e),
      bottom: Math.max(l, a) - (t.top + e)
    };
  }
  function k0(n) {
    let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
    return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
  }
  function v0(n, e) {
    let t = n.getBoundingClientRect();
    return {
      left: 0,
      right: t.right - t.left,
      top: e,
      bottom: t.bottom - (t.top + e)
    };
  }
  class ro {
    constructor(e, t, i, s) {
      this.from = e, this.to = t, this.size = i, this.displaySize = s;
    }
    static same(e, t) {
      if (e.length != t.length) return false;
      for (let i = 0; i < e.length; i++) {
        let s = e[i], r = t[i];
        if (s.from != r.from || s.to != r.to || s.size != r.size) return false;
      }
      return true;
    }
    draw(e, t) {
      return z.replace({
        widget: new S0(this.displaySize * (t ? e.scaleY : e.scaleX), t)
      }).range(this.from, this.to);
    }
  }
  class S0 extends ti {
    constructor(e, t) {
      super(), this.size = e, this.vertical = t;
    }
    eq(e) {
      return e.size == this.size && e.vertical == this.vertical;
    }
    toDOM() {
      let e = document.createElement("div");
      return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
    }
    get estimatedHeight() {
      return this.vertical ? this.size : -1;
    }
  }
  class yh {
    constructor(e) {
      this.state = e, this.pixelViewport = {
        left: 0,
        right: window.innerWidth,
        top: 0,
        bottom: 0
      }, this.inView = true, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = false, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = xh, this.scrollTarget = null, this.printing = false, this.mustMeasureContent = true, this.defaultTextDirection = ge.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = false;
      let t = e.facet(Wl).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
      this.heightOracle = new p0(t), this.stateDeco = e.facet(Hn).filter((i) => typeof i != "function"), this.heightMap = Ze.empty().applyChanges(this.stateDeco, oe.empty, this.heightOracle.setDoc(e.doc), [
        new mt(0, 0, 0, e.doc.length)
      ]);
      for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++) ;
      this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = z.set(this.lineGaps.map((i) => i.draw(this, false))), this.computeVisibleRanges();
    }
    updateForViewport() {
      let e = [
        this.viewport
      ], { main: t } = this.state.selection;
      for (let i = 0; i <= 1; i++) {
        let s = i ? t.head : t.anchor;
        if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
          let { from: r, to: o } = this.lineBlockAt(s);
          e.push(new Os(r, o));
        }
      }
      return this.viewports = e.sort((i, s) => i.from - s.from), this.updateScaler();
    }
    updateScaler() {
      let e = this.scaler;
      return this.scaler = this.heightMap.height <= 7e6 ? xh : new Xl(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
    }
    updateViewportLines() {
      this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
        this.viewportLines.push(Cn(e, this.scaler));
      });
    }
    update(e, t = null) {
      this.state = e.state;
      let i = this.stateDeco;
      this.stateDeco = this.state.facet(Hn).filter((c) => typeof c != "function");
      let s = e.changedRanges, r = mt.extendWithRanges(s, y0(i, this.stateDeco, e ? e.changes : De.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
      mh(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || an) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
      let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
      (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
      let h = a.from != this.viewport.from || a.to != this.viewport.to;
      this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && e.selectionSet && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Ff) && (this.mustEnforceCursorAssoc = true);
    }
    measure(e) {
      let t = e.contentDOM, i = window.getComputedStyle(t), s = this.heightOracle, r = i.whiteSpace;
      this.defaultTextDirection = i.direction == "rtl" ? ge.RTL : ge.LTR;
      let o = this.heightOracle.mustRefreshForWrapping(r), l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
      this.contentDOMHeight = l.height, this.mustMeasureContent = false;
      let h = 0, c = 0;
      if (l.width && l.height) {
        let { scaleX: C, scaleY: w } = ff(t, l);
        (C > 5e-3 && Math.abs(this.scaleX - C) > 5e-3 || w > 5e-3 && Math.abs(this.scaleY - w) > 5e-3) && (this.scaleX = C, this.scaleY = w, h |= 16, o = a = true);
      }
      let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
      (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = true), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
      let d = e.scrollDOM.scrollTop * this.scaleY;
      this.scrollTop != d && (this.scrollAnchorHeight = -1, this.scrollTop = d), this.scrolledToBottom = pf(e.scrollDOM);
      let p = (this.printing ? v0 : w0)(t, this.paddingTop), g = p.top - this.pixelViewport.top, b = p.bottom - this.pixelViewport.bottom;
      this.pixelViewport = p;
      let y = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
      if (y != this.inView && (this.inView = y, y && (a = true)), !this.inView && !this.scrollTarget && !k0(e.dom)) return 0;
      let S = l.width;
      if ((this.contentDOMWidth != S || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
        let C = e.docView.measureVisibleLineHeights(this.viewport);
        if (s.mustRefreshForHeights(C) && (o = true), o || s.lineWrapping && Math.abs(S - this.contentDOMWidth) > s.charWidth) {
          let { lineHeight: w, charWidth: O, textHeight: M } = e.docView.measureTextSize();
          o = w > 0 && s.refresh(r, w, O, M, S / O, C), o && (e.docView.minWidth = 0, h |= 16);
        }
        g > 0 && b > 0 ? c = Math.max(g, b) : g < 0 && b < 0 && (c = Math.min(g, b)), mh();
        for (let w of this.viewports) {
          let O = w.from == this.viewport.from ? C : e.docView.measureVisibleLineHeights(w);
          this.heightMap = (o ? Ze.empty().applyChanges(this.stateDeco, oe.empty, this.heightOracle, [
            new mt(0, 0, 0, e.state.doc.length)
          ]) : this.heightMap).updateHeight(s, 0, o, new g0(w.from, O));
        }
        an && (h |= 2);
      }
      let A = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
      return A && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || A) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = false, e.docView.enforceCursorAssoc()), h;
    }
    get visibleTop() {
      return this.scaler.fromDOM(this.pixelViewport.top);
    }
    get visibleBottom() {
      return this.scaler.fromDOM(this.pixelViewport.bottom);
    }
    getViewport(e, t) {
      let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new Os(s.lineAt(o - i * 1e3, pe.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - i) * 1e3, pe.ByHeight, r, 0, 0).to);
      if (t) {
        let { head: h } = t.range;
        if (h < a.from || h > a.to) {
          let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, pe.ByPos, r, 0, 0), u;
          t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new Os(s.lineAt(u - 1e3 / 2, pe.ByHeight, r, 0, 0).from, s.lineAt(u + c + 1e3 / 2, pe.ByHeight, r, 0, 0).to);
        }
      }
      return a;
    }
    mapViewport(e, t) {
      let i = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
      return new Os(this.heightMap.lineAt(i, pe.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, pe.ByPos, this.heightOracle, 0, 0).to);
    }
    viewportIsAppropriate({ from: e, to: t }, i = 0) {
      if (!this.inView) return true;
      let { top: s } = this.heightMap.lineAt(e, pe.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, pe.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
      return (e == 0 || s <= o - Math.max(10, Math.min(-i, 250))) && (t == this.state.doc.length || r >= l + Math.max(10, Math.min(i, 250))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
    }
    mapLineGaps(e, t) {
      if (!e.length || t.empty) return e;
      let i = [];
      for (let s of e) t.touchesRange(s.from, s.to) || i.push(new ro(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
      return i;
    }
    ensureLineGaps(e, t) {
      let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
      if (this.defaultTextDirection != ge.LTR && !i) return [];
      let l = [], a = (c, f, u, d) => {
        if (f - c < r) return;
        let p = this.state.selection.main, g = [
          p.from
        ];
        p.empty || g.push(p.to);
        for (let y of g) if (y > c && y < f) {
          a(c, y - 10, u, d), a(y + 10, f, u, d);
          return;
        }
        let b = C0(e, (y) => y.from >= u.from && y.to <= u.to && Math.abs(y.from - c) < r && Math.abs(y.to - f) < r && !g.some((S) => y.from < S && y.to > S));
        if (!b) {
          if (f < u.to && t && i && t.visibleRanges.some((A) => A.from <= f && A.to >= f)) {
            let A = t.moveToLineBoundary(v.cursor(f), false, true).head;
            A > c && (f = A);
          }
          let y = this.gapSize(u, c, f, d), S = i || y < 2e6 ? y : 2e6;
          b = new ro(c, f, y, S);
        }
        l.push(b);
      }, h = (c) => {
        if (c.length < o || c.type != Je.Text) return;
        let f = O0(c.from, c.to, this.stateDeco);
        if (f.total < o) return;
        let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, p;
        if (i) {
          let g = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, b, y;
          if (u != null) {
            let S = As(f, u), A = ((this.visibleBottom - this.visibleTop) / 2 + g) / c.height;
            b = S - A, y = S + A;
          } else b = (this.visibleTop - c.top - g) / c.height, y = (this.visibleBottom - c.top + g) / c.height;
          d = Cs(f, b), p = Cs(f, y);
        } else {
          let g = f.total * this.heightOracle.charWidth, b = s * this.heightOracle.charWidth, y = 0;
          if (g > 2e6) for (let O of e) O.from >= c.from && O.from < c.to && O.size != O.displaySize && O.from * this.heightOracle.charWidth + y < this.pixelViewport.left && (y = O.size - O.displaySize);
          let S = this.pixelViewport.left + y, A = this.pixelViewport.right + y, C, w;
          if (u != null) {
            let O = As(f, u), M = ((A - S) / 2 + b) / g;
            C = O - M, w = O + M;
          } else C = (S - b) / g, w = (A + b) / g;
          d = Cs(f, C), p = Cs(f, w);
        }
        d > c.from && a(c.from, d, c, f), p < c.to && a(p, c.to, c, f);
      };
      for (let c of this.viewportLines) Array.isArray(c.type) ? c.type.forEach(h) : h(c);
      return l;
    }
    gapSize(e, t, i, s) {
      let r = As(s, i) - As(s, t);
      return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
    }
    updateLineGaps(e) {
      ro.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = z.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
    }
    computeVisibleRanges(e) {
      let t = this.stateDeco;
      this.lineGaps.length && (t = t.concat(this.lineGapDeco));
      let i = [];
      re.spans(t, this.viewport.from, this.viewport.to, {
        span(r, o) {
          i.push({
            from: r,
            to: o
          });
        },
        point() {
        }
      }, 20);
      let s = 0;
      if (i.length != this.visibleRanges.length) s = 12;
      else for (let r = 0; r < i.length && !(s & 8); r++) {
        let o = this.visibleRanges[r], l = i[r];
        (o.from != l.from || o.to != l.to) && (s |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (s |= 8));
      }
      return this.visibleRanges = i, s;
    }
    lineBlockAt(e) {
      return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Cn(this.heightMap.lineAt(e, pe.ByPos, this.heightOracle, 0, 0), this.scaler);
    }
    lineBlockAtHeight(e) {
      return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Cn(this.heightMap.lineAt(this.scaler.fromDOM(e), pe.ByHeight, this.heightOracle, 0, 0), this.scaler);
    }
    scrollAnchorAt(e) {
      let t = this.lineBlockAtHeight(e + 8);
      return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
    }
    elementAtHeight(e) {
      return Cn(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
    }
    get docHeight() {
      return this.scaler.toDOM(this.heightMap.height);
    }
    get contentHeight() {
      return this.docHeight + this.paddingTop + this.paddingBottom;
    }
  }
  class Os {
    constructor(e, t) {
      this.from = e, this.to = t;
    }
  }
  function O0(n, e, t) {
    let i = [], s = n, r = 0;
    return re.spans(t, n, e, {
      span() {
      },
      point(o, l) {
        o > s && (i.push({
          from: s,
          to: o
        }), r += o - s), s = l;
      }
    }, 20), s < e && (i.push({
      from: s,
      to: e
    }), r += e - s), {
      total: r,
      ranges: i
    };
  }
  function Cs({ total: n, ranges: e }, t) {
    if (t <= 0) return e[0].from;
    if (t >= 1) return e[e.length - 1].to;
    let i = Math.floor(n * t);
    for (let s = 0; ; s++) {
      let { from: r, to: o } = e[s], l = o - r;
      if (i <= l) return r + i;
      i -= l;
    }
  }
  function As(n, e) {
    let t = 0;
    for (let { from: i, to: s } of n.ranges) {
      if (e <= s) {
        t += e - i;
        break;
      }
      t += s - i;
    }
    return t / n.total;
  }
  function C0(n, e) {
    for (let t of n) if (e(t)) return t;
  }
  const xh = {
    toDOM(n) {
      return n;
    },
    fromDOM(n) {
      return n;
    },
    scale: 1,
    eq(n) {
      return n == this;
    }
  };
  class Xl {
    constructor(e, t, i) {
      let s = 0, r = 0, o = 0;
      this.viewports = i.map(({ from: l, to: a }) => {
        let h = t.lineAt(l, pe.ByPos, e, 0, 0).top, c = t.lineAt(a, pe.ByPos, e, 0, 0).bottom;
        return s += c - h, {
          from: l,
          to: a,
          top: h,
          bottom: c,
          domTop: 0,
          domBottom: 0
        };
      }), this.scale = (7e6 - s) / (t.height - s);
      for (let l of this.viewports) l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
    }
    toDOM(e) {
      for (let t = 0, i = 0, s = 0; ; t++) {
        let r = t < this.viewports.length ? this.viewports[t] : null;
        if (!r || e < r.top) return s + (e - i) * this.scale;
        if (e <= r.bottom) return r.domTop + (e - r.top);
        i = r.bottom, s = r.domBottom;
      }
    }
    fromDOM(e) {
      for (let t = 0, i = 0, s = 0; ; t++) {
        let r = t < this.viewports.length ? this.viewports[t] : null;
        if (!r || e < r.domTop) return i + (e - s) / this.scale;
        if (e <= r.domBottom) return r.top + (e - r.domTop);
        i = r.bottom, s = r.domBottom;
      }
    }
    eq(e) {
      return e instanceof Xl ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : false;
    }
  }
  function Cn(n, e) {
    if (e.scale == 1) return n;
    let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
    return new _t(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((s) => Cn(s, e)) : n._content);
  }
  const Ms = B.define({
    combine: (n) => n.join(" ")
  }), sl = B.define({
    combine: (n) => n.indexOf(true) > -1
  }), rl = mi.newName(), nu = mi.newName(), su = mi.newName(), ru = {
    "&light": "." + nu,
    "&dark": "." + su
  };
  function ol(n, e, t) {
    return new mi(e, {
      finish(i) {
        return /&/.test(i) ? i.replace(/&\w*/, (s) => {
          if (s == "&") return n;
          if (!t || !t[s]) throw new RangeError(`Unsupported selector: ${s}`);
          return t[s];
        }) : n + " " + i;
      }
    });
  }
  const A0 = ol("." + rl, {
    "&": {
      position: "relative !important",
      boxSizing: "border-box",
      "&.cm-focused": {
        outline: "1px dotted #212121"
      },
      display: "flex !important",
      flexDirection: "column"
    },
    ".cm-scroller": {
      display: "flex !important",
      alignItems: "flex-start !important",
      fontFamily: "monospace",
      lineHeight: 1.4,
      height: "100%",
      overflowX: "auto",
      position: "relative",
      zIndex: 0,
      overflowAnchor: "none"
    },
    ".cm-content": {
      margin: 0,
      flexGrow: 2,
      flexShrink: 0,
      display: "block",
      whiteSpace: "pre",
      wordWrap: "normal",
      boxSizing: "border-box",
      minHeight: "100%",
      padding: "4px 0",
      outline: "none",
      "&[contenteditable=true]": {
        WebkitUserModify: "read-write-plaintext-only"
      }
    },
    ".cm-lineWrapping": {
      whiteSpace_fallback: "pre-wrap",
      whiteSpace: "break-spaces",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      flexShrink: 1
    },
    "&light .cm-content": {
      caretColor: "black"
    },
    "&dark .cm-content": {
      caretColor: "white"
    },
    ".cm-line": {
      display: "block",
      padding: "0 2px 0 6px"
    },
    ".cm-layer": {
      position: "absolute",
      left: 0,
      top: 0,
      contain: "size style",
      "& > *": {
        position: "absolute"
      }
    },
    "&light .cm-selectionBackground": {
      background: "#d9d9d9"
    },
    "&dark .cm-selectionBackground": {
      background: "#222"
    },
    "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
      background: "#d7d4f0"
    },
    "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
      background: "#233"
    },
    ".cm-cursorLayer": {
      pointerEvents: "none"
    },
    "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
      animation: "steps(1) cm-blink 1.2s infinite"
    },
    "@keyframes cm-blink": {
      "0%": {},
      "50%": {
        opacity: 0
      },
      "100%": {}
    },
    "@keyframes cm-blink2": {
      "0%": {},
      "50%": {
        opacity: 0
      },
      "100%": {}
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeft: "1.2px solid black",
      marginLeft: "-0.6px",
      pointerEvents: "none"
    },
    ".cm-cursor": {
      display: "none"
    },
    "&dark .cm-cursor": {
      borderLeftColor: "#ddd"
    },
    ".cm-dropCursor": {
      position: "absolute"
    },
    "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
      display: "block"
    },
    ".cm-iso": {
      unicodeBidi: "isolate"
    },
    ".cm-announced": {
      position: "fixed",
      top: "-10000px"
    },
    "@media print": {
      ".cm-announced": {
        display: "none"
      }
    },
    "&light .cm-activeLine": {
      backgroundColor: "#cceeff44"
    },
    "&dark .cm-activeLine": {
      backgroundColor: "#99eeff33"
    },
    "&light .cm-specialChar": {
      color: "red"
    },
    "&dark .cm-specialChar": {
      color: "#f78"
    },
    ".cm-gutters": {
      flexShrink: 0,
      display: "flex",
      height: "100%",
      boxSizing: "border-box",
      insetInlineStart: 0,
      zIndex: 200
    },
    "&light .cm-gutters": {
      backgroundColor: "#f5f5f5",
      color: "#6c6c6c",
      borderRight: "1px solid #ddd"
    },
    "&dark .cm-gutters": {
      backgroundColor: "#333338",
      color: "#ccc"
    },
    ".cm-gutter": {
      display: "flex !important",
      flexDirection: "column",
      flexShrink: 0,
      boxSizing: "border-box",
      minHeight: "100%",
      overflow: "hidden"
    },
    ".cm-gutterElement": {
      boxSizing: "border-box"
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 3px 0 5px",
      minWidth: "20px",
      textAlign: "right",
      whiteSpace: "nowrap"
    },
    "&light .cm-activeLineGutter": {
      backgroundColor: "#e2f2ff"
    },
    "&dark .cm-activeLineGutter": {
      backgroundColor: "#222227"
    },
    ".cm-panels": {
      boxSizing: "border-box",
      position: "sticky",
      left: 0,
      right: 0,
      zIndex: 300
    },
    "&light .cm-panels": {
      backgroundColor: "#f5f5f5",
      color: "black"
    },
    "&light .cm-panels-top": {
      borderBottom: "1px solid #ddd"
    },
    "&light .cm-panels-bottom": {
      borderTop: "1px solid #ddd"
    },
    "&dark .cm-panels": {
      backgroundColor: "#333338",
      color: "white"
    },
    ".cm-dialog": {
      padding: "2px 19px 4px 6px",
      position: "relative",
      "& label": {
        fontSize: "80%"
      }
    },
    ".cm-dialog-close": {
      position: "absolute",
      top: "3px",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      fontSize: "14px",
      padding: "0"
    },
    ".cm-tab": {
      display: "inline-block",
      overflow: "hidden",
      verticalAlign: "bottom"
    },
    ".cm-widgetBuffer": {
      verticalAlign: "text-top",
      height: "1em",
      width: 0,
      display: "inline"
    },
    ".cm-placeholder": {
      color: "#888",
      display: "inline-block",
      verticalAlign: "top",
      userSelect: "none"
    },
    ".cm-highlightSpace": {
      backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
      backgroundPosition: "center"
    },
    ".cm-highlightTab": {
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
      backgroundSize: "auto 100%",
      backgroundPosition: "right 90%",
      backgroundRepeat: "no-repeat"
    },
    ".cm-trailingSpace": {
      backgroundColor: "#ff332255"
    },
    ".cm-button": {
      verticalAlign: "middle",
      color: "inherit",
      fontSize: "70%",
      padding: ".2em 1em",
      borderRadius: "1px"
    },
    "&light .cm-button": {
      backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
      border: "1px solid #888",
      "&:active": {
        backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
      }
    },
    "&dark .cm-button": {
      backgroundImage: "linear-gradient(#393939, #111)",
      border: "1px solid #888",
      "&:active": {
        backgroundImage: "linear-gradient(#111, #333)"
      }
    },
    ".cm-textfield": {
      verticalAlign: "middle",
      color: "inherit",
      fontSize: "70%",
      border: "1px solid silver",
      padding: ".2em .5em"
    },
    "&light .cm-textfield": {
      backgroundColor: "white"
    },
    "&dark .cm-textfield": {
      border: "1px solid #555",
      backgroundColor: "inherit"
    }
  }, ru), M0 = {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    characterDataOldValue: true
  }, oo = L.ie && L.ie_version <= 11;
  class T0 {
    constructor(e) {
      this.view = e, this.active = false, this.editContext = null, this.selectionRange = new hm(), this.selectionChanged = false, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = false, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
        for (let i of t) this.queue.push(i);
        (L.ie && L.ie_version <= 11 || L.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
      }), window.EditContext && e.constructor.EDIT_CONTEXT !== false && !(L.chrome && L.chrome_version < 126) && (this.editContext = new D0(e), e.state.facet($t) && (e.contentDOM.editContext = this.editContext.editContext)), oo && (this.onCharData = (t) => {
        this.queue.push({
          target: t.target,
          type: "characterData",
          oldValue: t.prevValue
        }), this.flushSoon();
      }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
        var t;
        ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
      }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
        this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
      }, {
        threshold: [
          0,
          1e-3
        ]
      }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
        t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
      }, {})), this.listenForScroll(), this.readSelectionRange();
    }
    onScrollChanged(e) {
      this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
    }
    onScroll(e) {
      this.intersecting && this.flush(false), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
    }
    onResize() {
      this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = -1, this.view.requestMeasure();
      }, 50));
    }
    onPrint(e) {
      (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = true, this.view.measure(), setTimeout(() => {
        this.view.viewState.printing = false, this.view.requestMeasure();
      }, 500));
    }
    updateGaps(e) {
      if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
        this.gapIntersection.disconnect();
        for (let t of e) this.gapIntersection.observe(t);
        this.gaps = e;
      }
    }
    onSelectionChange(e) {
      let t = this.selectionChanged;
      if (!this.readSelectionRange() || this.delayedAndroidKey) return;
      let { view: i } = this, s = this.selectionRange;
      if (i.state.facet($t) ? i.root.activeElement != this.dom : !Xs(this.dom, s)) return;
      let r = s.anchorNode && i.docView.nearest(s.anchorNode);
      if (r && r.ignoreEvent(e)) {
        t || (this.selectionChanged = false);
        return;
      }
      (L.ie && L.ie_version <= 11 || L.android && L.chrome) && !i.state.selection.main.empty && s.focusNode && Pn(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(false);
    }
    readSelectionRange() {
      let { view: e } = this, t = Fn(e.root);
      if (!t) return false;
      let i = L.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && P0(this.view, t) || t;
      if (!i || this.selectionRange.eq(i)) return false;
      let s = Xs(this.dom, i);
      return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && fm(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), false) : (this.selectionRange.setRange(i), s && (this.selectionChanged = true), true);
    }
    setSelectionRange(e, t) {
      this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = false;
    }
    clearSelectionRange() {
      this.selectionRange.set(null, 0, null, 0);
    }
    listenForScroll() {
      this.parentCheck = -1;
      let e = 0, t = null;
      for (let i = this.dom; i; ) if (i.nodeType == 1) !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11) i = i.host;
      else break;
      if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
        for (let i of this.scrollTargets) i.removeEventListener("scroll", this.onScroll);
        for (let i of this.scrollTargets = t) i.addEventListener("scroll", this.onScroll);
      }
    }
    ignore(e) {
      if (!this.active) return e();
      try {
        return this.stop(), e();
      } finally {
        this.start(), this.clear();
      }
    }
    start() {
      this.active || (this.observer.observe(this.dom, M0), oo && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = true);
    }
    stop() {
      this.active && (this.active = false, this.observer.disconnect(), oo && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
    }
    clear() {
      this.processRecords(), this.queue.length = 0, this.selectionChanged = false;
    }
    delayAndroidKey(e, t) {
      var i;
      if (!this.delayedAndroidKey) {
        let s = () => {
          let r = this.delayedAndroidKey;
          r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Ji(this.dom, r.key, r.keyCode));
        };
        this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
      }
      (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
        key: e,
        keyCode: t,
        force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
      });
    }
    clearDelayedAndroidKey() {
      this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
    }
    flushSoon() {
      this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
        this.delayedFlush = -1, this.flush();
      }));
    }
    forceFlush() {
      this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
    }
    pendingRecords() {
      for (let e of this.observer.takeRecords()) this.queue.push(e);
      return this.queue;
    }
    processRecords() {
      let e = this.pendingRecords();
      e.length && (this.queue = []);
      let t = -1, i = -1, s = false;
      for (let r of e) {
        let o = this.readMutation(r);
        o && (o.typeOver && (s = true), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
      }
      return {
        from: t,
        to: i,
        typeOver: s
      };
    }
    readChange() {
      let { from: e, to: t, typeOver: i } = this.processRecords(), s = this.selectionChanged && Xs(this.dom, this.selectionRange);
      if (e < 0 && !s) return null;
      e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = false;
      let r = new Um(this.view, e, t, i);
      return this.view.docView.domChanged = {
        newSel: r.newSel ? r.newSel.main : null
      }, r;
    }
    flush(e = true) {
      if (this.delayedFlush >= 0 || this.delayedAndroidKey) return false;
      e && this.readSelectionRange();
      let t = this.readChange();
      if (!t) return this.view.requestMeasure(), false;
      let i = this.view.state, s = $f(this.view, t);
      return this.view.state == i && (t.domChanged || t.newSel && !t.newSel.main.eq(this.view.state.selection.main)) && this.view.update([]), s;
    }
    readMutation(e) {
      let t = this.view.docView.nearest(e.target);
      if (!t || t.ignoreMutation(e)) return null;
      if (t.markDirty(e.type == "attributes"), e.type == "attributes" && (t.flags |= 4), e.type == "childList") {
        let i = wh(t, e.previousSibling || e.target.previousSibling, -1), s = wh(t, e.nextSibling || e.target.nextSibling, 1);
        return {
          from: i ? t.posAfter(i) : t.posAtStart,
          to: s ? t.posBefore(s) : t.posAtEnd,
          typeOver: false
        };
      } else return e.type == "characterData" ? {
        from: t.posAtStart,
        to: t.posAtEnd,
        typeOver: e.target.nodeValue == e.oldValue
      } : null;
    }
    setWindow(e) {
      e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
    }
    addWindowListeners(e) {
      e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
    }
    removeWindowListeners(e) {
      e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
    }
    update(e) {
      this.editContext && (this.editContext.update(e), e.startState.facet($t) != e.state.facet($t) && (e.view.contentDOM.editContext = e.state.facet($t) ? this.editContext.editContext : null));
    }
    destroy() {
      var e, t, i;
      this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
      for (let s of this.scrollTargets) s.removeEventListener("scroll", this.onScroll);
      this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
    }
  }
  function wh(n, e, t) {
    for (; e; ) {
      let i = ce.get(e);
      if (i && i.parent == n) return i;
      let s = e.parentNode;
      e = s != n.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
    }
    return null;
  }
  function kh(n, e) {
    let t = e.startContainer, i = e.startOffset, s = e.endContainer, r = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor);
    return Pn(o.node, o.offset, s, r) && ([t, i, s, r] = [
      s,
      r,
      t,
      i
    ]), {
      anchorNode: t,
      anchorOffset: i,
      focusNode: s,
      focusOffset: r
    };
  }
  function P0(n, e) {
    if (e.getComposedRanges) {
      let s = e.getComposedRanges(n.root)[0];
      if (s) return kh(n, s);
    }
    let t = null;
    function i(s) {
      s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
    }
    return n.contentDOM.addEventListener("beforeinput", i, true), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, true), t ? kh(n, t) : null;
  }
  class D0 {
    constructor(e) {
      this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
      let t = this.editContext = new window.EditContext({
        text: e.state.doc.sliceString(this.from, this.to),
        selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
        selectionEnd: this.toContextPos(e.state.selection.main.head)
      });
      this.handlers.textupdate = (i) => {
        let s = e.state.selection.main, { anchor: r, head: o } = s, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
        e.inputState.composing >= 0 && !this.composing && (this.composing = {
          contextBase: i.updateRangeStart,
          editorBase: l,
          drifted: false
        });
        let h = {
          from: l,
          to: a,
          insert: oe.of(i.text.split(`
`))
        };
        if (h.from == this.from && r < this.from ? h.from = r : h.to == this.to && r > this.to && (h.to = r), h.from == h.to && !h.insert.length) {
          let c = v.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
          c.main.eq(s) || e.dispatch({
            selection: c,
            userEvent: "select"
          });
          return;
        }
        if ((L.mac || L.android) && h.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (h = {
          from: l,
          to: a,
          insert: oe.of([
            i.text.replace(".", " ")
          ])
        }), this.pendingContextChange = h, !e.state.readOnly) {
          let c = this.to - this.from + (h.to - h.from + h.insert.length);
          Ql(e, h, v.single(this.toEditorPos(i.selectionStart, c), this.toEditorPos(i.selectionEnd, c)));
        }
        this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state));
      }, this.handlers.characterboundsupdate = (i) => {
        let s = [], r = null;
        for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
          let a = e.coordsForChar(o);
          r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), s.push(r);
        }
        t.updateCharacterBounds(i.rangeStart, s);
      }, this.handlers.textformatupdate = (i) => {
        let s = [];
        for (let r of i.getTextFormats()) {
          let o = r.underlineStyle, l = r.underlineThickness;
          if (o != "None" && l != "None") {
            let a = this.toEditorPos(r.rangeStart), h = this.toEditorPos(r.rangeEnd);
            if (a < h) {
              let c = `text-decoration: underline ${o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${l == "Thin" ? 1 : 2}px`;
              s.push(z.mark({
                attributes: {
                  style: c
                }
              }).range(a, h));
            }
          }
        }
        e.dispatch({
          effects: Wf.of(z.set(s))
        });
      }, this.handlers.compositionstart = () => {
        e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = true);
      }, this.handlers.compositionend = () => {
        if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
          let { drifted: i } = this.composing;
          this.composing = null, i && this.reset(e.state);
        }
      };
      for (let i in this.handlers) t.addEventListener(i, this.handlers[i]);
      this.measureReq = {
        read: (i) => {
          this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
          let s = Fn(i.root);
          s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
        }
      };
    }
    applyEdits(e) {
      let t = 0, i = false, s = this.pendingContextChange;
      return e.changes.iterChanges((r, o, l, a, h) => {
        if (i) return;
        let c = h.length - (o - r);
        if (s && o >= s.to) if (s.from == r && s.to == o && s.insert.eq(h)) {
          s = this.pendingContextChange = null, t += c, this.to += c;
          return;
        } else s = null, this.revertPending(e.state);
        if (r += t, o += t, o <= this.from) this.from += c, this.to += c;
        else if (r < this.to) {
          if (r < this.from || o > this.to || this.to - this.from + h.length > 3e4) {
            i = true;
            return;
          }
          this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), h.toString()), this.to += c;
        }
        t += c;
      }), s && !i && this.revertPending(e.state), !i;
    }
    update(e) {
      let t = this.pendingContextChange, i = e.startState.selection.main;
      this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((s) => !s.isUserEvent("input.type") && s.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = true, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
    }
    resetRange(e) {
      let { head: t } = e.selection.main;
      this.from = Math.max(0, t - 1e4), this.to = Math.min(e.doc.length, t + 1e4);
    }
    reset(e) {
      this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
    }
    revertPending(e) {
      let t = this.pendingContextChange;
      this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
    }
    setSelection(e) {
      let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), s = this.toContextPos(t.head);
      (this.editContext.selectionStart != i || this.editContext.selectionEnd != s) && this.editContext.updateSelection(i, s);
    }
    rangeIsValid(e) {
      let { head: t } = e.selection.main;
      return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
    }
    toEditorPos(e, t = this.to - this.from) {
      e = Math.min(e, t);
      let i = this.composing;
      return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
    }
    toContextPos(e) {
      let t = this.composing;
      return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
    }
    destroy() {
      for (let e in this.handlers) this.editContext.removeEventListener(e, this.handlers[e]);
    }
  }
  class E {
    get state() {
      return this.viewState.state;
    }
    get viewport() {
      return this.viewState.viewport;
    }
    get visibleRanges() {
      return this.viewState.visibleRanges;
    }
    get inView() {
      return this.viewState.inView;
    }
    get composing() {
      return !!this.inputState && this.inputState.composing > 0;
    }
    get compositionStarted() {
      return !!this.inputState && this.inputState.composing >= 0;
    }
    get root() {
      return this._root;
    }
    get win() {
      return this.dom.ownerDocument.defaultView || window;
    }
    constructor(e = {}) {
      var t;
      this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = false, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
      let { dispatch: i } = e;
      this.dispatchTransactions = e.dispatchTransactions || i && ((s) => s.forEach((r) => i(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || cm(e.parent) || document, this.viewState = new yh(e.state || ie.create(e)), e.scrollTo && e.scrollTo.is(ks) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet($i).map((s) => new io(s));
      for (let s of this.plugins) s.update(this);
      this.observer = new T0(this), this.inputState = new Ym(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Za(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => this.requestMeasure());
    }
    dispatch(...e) {
      let t = e.length == 1 && e[0] instanceof Re ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [
        this.state.update(...e)
      ];
      this.dispatchTransactions(t, this);
    }
    update(e) {
      if (this.updateState != 0) throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
      let t = false, i = false, s, r = this.state;
      for (let u of e) {
        if (u.startState != r) throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
        r = u.state;
      }
      if (this.destroyed) {
        this.viewState.state = r;
        return;
      }
      let o = this.hasFocus, l = 0, a = null;
      e.some((u) => u.annotation(Zf)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = eu(r, o), a || (l = 1));
      let h = this.observer.delayedAndroidKey, c = null;
      if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(ie.phrases) != this.state.facet(ie.phrases)) return this.setState(r);
      s = rr.create(this, r, e), s.flags |= l;
      let f = this.viewState.scrollTarget;
      try {
        this.updateState = 2;
        for (let u of e) {
          if (f && (f = f.map(u.changes)), u.scrollIntoView) {
            let { main: d } = u.state.selection;
            f = new Zi(d.empty ? d : v.cursor(d.head, d.head > d.anchor ? -1 : 1));
          }
          for (let d of u.effects) d.is(ks) && (f = d.value.clip(this.state));
        }
        this.viewState.update(s, f), this.bidiCache = lr.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(Sn) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
      } finally {
        this.updateState = 0;
      }
      if (s.startState.facet(Ms) != s.state.facet(Ms) && (this.viewState.mustMeasureContent = true), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty) for (let u of this.state.facet(el)) try {
        u(s);
      } catch (d) {
        st(this.state, d, "update listener");
      }
      (a || c) && Promise.resolve().then(() => {
        a && this.state == a.startState && this.dispatch(a), c && !$f(this, c) && h.force && Ji(this.contentDOM, h.key, h.keyCode);
      });
    }
    setState(e) {
      if (this.updateState != 0) throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
      if (this.destroyed) {
        this.viewState.state = e;
        return;
      }
      this.updateState = 2;
      let t = this.hasFocus;
      try {
        for (let i of this.plugins) i.destroy(this);
        this.viewState = new yh(e), this.plugins = e.facet($i).map((i) => new io(i)), this.pluginMap.clear();
        for (let i of this.plugins) i.update(this);
        this.docView.destroy(), this.docView = new Za(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
      } finally {
        this.updateState = 0;
      }
      t && this.focus(), this.requestMeasure();
    }
    updatePlugins(e) {
      let t = e.startState.facet($i), i = e.state.facet($i);
      if (t != i) {
        let s = [];
        for (let r of i) {
          let o = t.indexOf(r);
          if (o < 0) s.push(new io(r));
          else {
            let l = this.plugins[o];
            l.mustUpdate = e, s.push(l);
          }
        }
        for (let r of this.plugins) r.mustUpdate != e && r.destroy(this);
        this.plugins = s, this.pluginMap.clear();
      } else for (let s of this.plugins) s.mustUpdate = e;
      for (let s = 0; s < this.plugins.length; s++) this.plugins[s].update(this);
      t != i && this.inputState.ensureHandlers(this.plugins);
    }
    docViewUpdate() {
      for (let e of this.plugins) {
        let t = e.value;
        if (t && t.docViewUpdate) try {
          t.docViewUpdate(this);
        } catch (i) {
          st(this.state, i, "doc view update listener");
        }
      }
    }
    measure(e = true) {
      if (this.destroyed) return;
      if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
        this.measureScheduled = -1, this.requestMeasure();
        return;
      }
      this.measureScheduled = 0, e && this.observer.forceFlush();
      let t = null, i = this.scrollDOM, s = i.scrollTop * this.scaleY, { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
      Math.abs(s - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
      try {
        for (let l = 0; ; l++) {
          if (o < 0) if (pf(i)) r = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(s);
            r = d.from, o = d.top;
          }
          this.updateState = 1;
          let a = this.viewState.measure(this);
          if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null) break;
          if (l > 5) {
            console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
            break;
          }
          let h = [];
          a & 4 || ([this.measureRequests, h] = [
            h,
            this.measureRequests
          ]);
          let c = h.map((d) => {
            try {
              return d.read(this);
            } catch (p) {
              return st(this.state, p), vh;
            }
          }), f = rr.create(this, this.state, []), u = false;
          f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
          for (let d = 0; d < h.length; d++) if (c[d] != vh) try {
            let p = h[d];
            p.write && p.write(c[d], this);
          } catch (p) {
            st(this.state, p);
          }
          if (u && this.docView.updateSelection(true), !f.viewportChanged && this.measureRequests.length == 0) {
            if (this.viewState.editorHeight) if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = (r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o;
              if (p > 1 || p < -1) {
                s = s + p, i.scrollTop = s / this.scaleY, o = -1;
                continue;
              }
            }
            break;
          }
        }
      } finally {
        this.updateState = 0, this.measureScheduled = -1;
      }
      if (t && !t.empty) for (let l of this.state.facet(el)) l(t);
    }
    get themeClasses() {
      return rl + " " + (this.state.facet(sl) ? su : nu) + " " + this.state.facet(Ms);
    }
    updateAttrs() {
      let e = Sh(this, zf, {
        class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
      }), t = {
        spellcheck: "false",
        autocorrect: "off",
        autocapitalize: "off",
        writingsuggestions: "false",
        translate: "no",
        contenteditable: this.state.facet($t) ? "true" : "false",
        class: "cm-content",
        style: `${L.tabSize}: ${this.state.tabSize}`,
        role: "textbox",
        "aria-multiline": "true"
      };
      this.state.readOnly && (t["aria-readonly"] = "true"), Sh(this, Wl, t);
      let i = this.observer.ignore(() => {
        let s = Ko(this.contentDOM, this.contentAttrs, t), r = Ko(this.dom, this.editorAttrs, e);
        return s || r;
      });
      return this.editorAttrs = e, this.contentAttrs = t, i;
    }
    showAnnouncements(e) {
      let t = true;
      for (let i of e) for (let s of i.effects) if (s.is(E.announce)) {
        t && (this.announceDOM.textContent = ""), t = false;
        let r = this.announceDOM.appendChild(document.createElement("div"));
        r.textContent = s.value;
      }
    }
    mountStyles() {
      this.styleModules = this.state.facet(Sn);
      let e = this.state.facet(E.cspNonce);
      mi.mount(this.root, this.styleModules.concat(A0).reverse(), e ? {
        nonce: e
      } : void 0);
    }
    readMeasured() {
      if (this.updateState == 2) throw new Error("Reading the editor layout isn't allowed during an update");
      this.updateState == 0 && this.measureScheduled > -1 && this.measure(false);
    }
    requestMeasure(e) {
      if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
        if (this.measureRequests.indexOf(e) > -1) return;
        if (e.key != null) {
          for (let t = 0; t < this.measureRequests.length; t++) if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
        }
        this.measureRequests.push(e);
      }
    }
    plugin(e) {
      let t = this.pluginMap.get(e);
      return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
    }
    get documentTop() {
      return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
    }
    get documentPadding() {
      return {
        top: this.viewState.paddingTop,
        bottom: this.viewState.paddingBottom
      };
    }
    get scaleX() {
      return this.viewState.scaleX;
    }
    get scaleY() {
      return this.viewState.scaleY;
    }
    elementAtHeight(e) {
      return this.readMeasured(), this.viewState.elementAtHeight(e);
    }
    lineBlockAtHeight(e) {
      return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
    }
    get viewportLineBlocks() {
      return this.viewState.viewportLines;
    }
    lineBlockAt(e) {
      return this.viewState.lineBlockAt(e);
    }
    get contentHeight() {
      return this.viewState.contentHeight;
    }
    moveByChar(e, t, i) {
      return so(this, e, sh(this, e, t, i));
    }
    moveByGroup(e, t) {
      return so(this, e, sh(this, e, t, (i) => Vm(this, e.head, i)));
    }
    visualLineSide(e, t) {
      let i = this.bidiSpans(e), s = this.textDirectionAt(e.from), r = i[t ? i.length - 1 : 0];
      return v.cursor(r.side(t, s) + e.from, r.forward(!t, s) ? 1 : -1);
    }
    moveToLineBoundary(e, t, i = true) {
      return zm(this, e, t, i);
    }
    moveVertically(e, t, i) {
      return so(this, e, Qm(this, e, t, i));
    }
    domAtPos(e) {
      return this.docView.domAtPos(e);
    }
    posAtDOM(e, t = 0) {
      return this.docView.posFromDOM(e, t);
    }
    posAtCoords(e, t = true) {
      return this.readMeasured(), Uf(this, e, t);
    }
    coordsAtPos(e, t = 1) {
      this.readMeasured();
      let i = this.docView.coordsAt(e, t);
      if (!i || i.left == i.right) return i;
      let s = this.state.doc.lineAt(e), r = this.bidiSpans(s), o = r[di.find(r, e - s.from, -1, t)];
      return Yn(i, o.dir == ge.LTR == t > 0);
    }
    coordsForChar(e) {
      return this.readMeasured(), this.docView.coordsForChar(e);
    }
    get defaultCharacterWidth() {
      return this.viewState.heightOracle.charWidth;
    }
    get defaultLineHeight() {
      return this.viewState.heightOracle.lineHeight;
    }
    get textDirection() {
      return this.viewState.defaultTextDirection;
    }
    textDirectionAt(e) {
      return !this.state.facet(If) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
    }
    get lineWrapping() {
      return this.viewState.heightOracle.lineWrapping;
    }
    bidiSpans(e) {
      if (e.length > R0) return Pf(e.length);
      let t = this.textDirectionAt(e.from), i;
      for (let r of this.bidiCache) if (r.from == e.from && r.dir == t && (r.fresh || Tf(r.isolates, i = Ja(this, e)))) return r.order;
      i || (i = Ja(this, e));
      let s = Cm(e.text, t, i);
      return this.bidiCache.push(new lr(e.from, e.to, t, i, true, s)), s;
    }
    get hasFocus() {
      var e;
      return (this.dom.ownerDocument.hasFocus() || L.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
    }
    focus() {
      this.observer.ignore(() => {
        uf(this.contentDOM), this.docView.updateSelection();
      });
    }
    setRoot(e) {
      this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
    }
    destroy() {
      this.root.activeElement == this.contentDOM && this.contentDOM.blur();
      for (let e of this.plugins) e.destroy(this);
      this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = true;
    }
    static scrollIntoView(e, t = {}) {
      return ks.of(new Zi(typeof e == "number" ? v.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin));
    }
    scrollSnapshot() {
      let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
      return ks.of(new Zi(v.cursor(i.from), "start", "start", i.top - e, t, true));
    }
    setTabFocusMode(e) {
      e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
    }
    static domEventHandlers(e) {
      return Oe.define(() => ({}), {
        eventHandlers: e
      });
    }
    static domEventObservers(e) {
      return Oe.define(() => ({}), {
        eventObservers: e
      });
    }
    static theme(e, t) {
      let i = mi.newName(), s = [
        Ms.of(i),
        Sn.of(ol(`.${i}`, e))
      ];
      return t && t.dark && s.push(sl.of(true)), s;
    }
    static baseTheme(e) {
      return Wi.lowest(Sn.of(ol("." + rl, e, ru)));
    }
    static findFromDOM(e) {
      var t;
      let i = e.querySelector(".cm-content"), s = i && ce.get(i) || ce.get(e);
      return ((t = s == null ? void 0 : s.rootView) === null || t === void 0 ? void 0 : t.view) || null;
    }
  }
  E.styleModule = Sn;
  E.inputHandler = _f;
  E.clipboardInputFilter = Fl;
  E.clipboardOutputFilter = Hl;
  E.scrollHandler = Hf;
  E.focusChangeEffect = Nf;
  E.perLineTextDirection = If;
  E.exceptionSink = Lf;
  E.updateListener = el;
  E.editable = $t;
  E.mouseSelectionStyle = Bf;
  E.dragMovesSelection = Ef;
  E.clickAddsSelectionRange = Rf;
  E.decorations = Hn;
  E.outerDecorations = Vf;
  E.atomicRanges = zl;
  E.bidiIsolatedRanges = Qf;
  E.scrollMargins = qf;
  E.darkTheme = sl;
  E.cspNonce = B.define({
    combine: (n) => n.length ? n[0] : ""
  });
  E.contentAttributes = Wl;
  E.editorAttributes = zf;
  E.lineWrapping = E.contentAttributes.of({
    class: "cm-lineWrapping"
  });
  E.announce = j.define();
  const R0 = 4096, vh = {};
  class lr {
    constructor(e, t, i, s, r, o) {
      this.from = e, this.to = t, this.dir = i, this.isolates = s, this.fresh = r, this.order = o;
    }
    static update(e, t) {
      if (t.empty && !e.some((r) => r.fresh)) return e;
      let i = [], s = e.length ? e[e.length - 1].dir : ge.LTR;
      for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
        let o = e[r];
        o.dir == s && !t.touchesRange(o.from, o.to) && i.push(new lr(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, false, o.order));
      }
      return i;
    }
  }
  function Sh(n, e, t) {
    for (let i = n.state.facet(e), s = i.length - 1; s >= 0; s--) {
      let r = i[s], o = typeof r == "function" ? r(n) : r;
      o && jo(o, t);
    }
    return t;
  }
  const E0 = L.mac ? "mac" : L.windows ? "win" : L.linux ? "linux" : "key";
  function B0(n, e) {
    const t = n.split(/-(?!$)/);
    let i = t[t.length - 1];
    i == "Space" && (i = " ");
    let s, r, o, l;
    for (let a = 0; a < t.length - 1; ++a) {
      const h = t[a];
      if (/^(cmd|meta|m)$/i.test(h)) l = true;
      else if (/^a(lt)?$/i.test(h)) s = true;
      else if (/^(c|ctrl|control)$/i.test(h)) r = true;
      else if (/^s(hift)?$/i.test(h)) o = true;
      else if (/^mod$/i.test(h)) e == "mac" ? l = true : r = true;
      else throw new Error("Unrecognized modifier name: " + h);
    }
    return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
  }
  function Ts(n, e, t) {
    return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== false && e.shiftKey && (n = "Shift-" + n), n;
  }
  const L0 = Wi.default(E.domEventHandlers({
    keydown(n, e) {
      return lu(ou(e.state), n, e, "editor");
    }
  })), Er = B.define({
    enables: L0
  }), Oh = /* @__PURE__ */ new WeakMap();
  function ou(n) {
    let e = n.facet(Er), t = Oh.get(e);
    return t || Oh.set(e, t = I0(e.reduce((i, s) => i.concat(s), []))), t;
  }
  function _0(n, e, t) {
    return lu(ou(n.state), e, n, t);
  }
  let ai = null;
  const N0 = 4e3;
  function I0(n, e = E0) {
    let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, l) => {
      let a = i[o];
      if (a == null) i[o] = l;
      else if (a != l) throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
    }, r = (o, l, a, h, c) => {
      var f, u;
      let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((y) => B0(y, e));
      for (let y = 1; y < p.length; y++) {
        let S = p.slice(0, y).join(" ");
        s(S, true), d[S] || (d[S] = {
          preventDefault: true,
          stopPropagation: false,
          run: [
            (A) => {
              let C = ai = {
                view: A,
                prefix: S,
                scope: o
              };
              return setTimeout(() => {
                ai == C && (ai = null);
              }, N0), true;
            }
          ]
        });
      }
      let g = p.join(" ");
      s(g, false);
      let b = d[g] || (d[g] = {
        preventDefault: false,
        stopPropagation: false,
        run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
      });
      a && b.run.push(a), h && (b.preventDefault = true), c && (b.stopPropagation = true);
    };
    for (let o of n) {
      let l = o.scope ? o.scope.split(" ") : [
        "editor"
      ];
      if (o.any) for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = {
          preventDefault: false,
          stopPropagation: false,
          run: []
        });
        let { any: f } = o;
        for (let u in c) c[u].run.push((d) => f(d, ll));
      }
      let a = o[e] || o.key;
      if (a) for (let h of l) r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
    }
    return t;
  }
  let ll = null;
  function lu(n, e, t, i) {
    ll = e;
    let s = rm(e), r = tt(s, 0), o = Lt(r) == s.length && s != " ", l = "", a = false, h = false, c = false;
    ai && ai.view == t && ai.scope == i && (l = ai.prefix + " ", Kf.indexOf(e.keyCode) < 0 && (h = true, ai = null));
    let f = /* @__PURE__ */ new Set(), u = (b) => {
      if (b) {
        for (let y of b.run) if (!f.has(y) && (f.add(y), y(t))) return b.stopPropagation && (c = true), true;
        b.preventDefault && (b.stopPropagation && (c = true), h = true);
      }
      return false;
    }, d = n[i], p, g;
    return d && (u(d[l + Ts(s, e, !o)]) ? a = true : o && (e.altKey || e.metaKey || e.ctrlKey) && !(L.windows && e.ctrlKey && e.altKey) && (p = bi[e.keyCode]) && p != s ? (u(d[l + Ts(p, e, true)]) || e.shiftKey && (g = In[e.keyCode]) != s && g != p && u(d[l + Ts(g, e, false)])) && (a = true) : o && e.shiftKey && u(d[l + Ts(s, e, true)]) && (a = true), !a && u(d._any) && (a = true)), h && (a = true), a && c && e.stopPropagation(), ll = null, a;
  }
  class es {
    constructor(e, t, i, s, r) {
      this.className = e, this.left = t, this.top = i, this.width = s, this.height = r;
    }
    draw() {
      let e = document.createElement("div");
      return e.className = this.className, this.adjust(e), e;
    }
    update(e, t) {
      return t.className != this.className ? false : (this.adjust(e), true);
    }
    adjust(e) {
      e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
    }
    eq(e) {
      return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
    }
    static forRange(e, t, i) {
      if (i.empty) {
        let s = e.coordsAtPos(i.head, i.assoc || 1);
        if (!s) return [];
        let r = au(e);
        return [
          new es(t, s.left - r.left, s.top - r.top, null, s.bottom - s.top)
        ];
      } else return F0(e, t, i);
    }
  }
  function au(n) {
    let e = n.scrollDOM.getBoundingClientRect();
    return {
      left: (n.textDirection == ge.LTR ? e.left : e.right - n.scrollDOM.clientWidth * n.scaleX) - n.scrollDOM.scrollLeft * n.scaleX,
      top: e.top - n.scrollDOM.scrollTop * n.scaleY
    };
  }
  function Ch(n, e, t, i) {
    let s = n.coordsAtPos(e, t * 2);
    if (!s) return i;
    let r = n.dom.getBoundingClientRect(), o = (s.top + s.bottom) / 2, l = n.posAtCoords({
      x: r.left + 1,
      y: o
    }), a = n.posAtCoords({
      x: r.right - 1,
      y: o
    });
    return l == null || a == null ? i : {
      from: Math.max(i.from, Math.min(l, a)),
      to: Math.min(i.to, Math.max(l, a))
    };
  }
  function F0(n, e, t) {
    if (t.to <= n.viewport.from || t.from >= n.viewport.to) return [];
    let i = Math.max(t.from, n.viewport.from), s = Math.min(t.to, n.viewport.to), r = n.textDirection == ge.LTR, o = n.contentDOM, l = o.getBoundingClientRect(), a = au(n), h = o.querySelector(".cm-line"), c = h && window.getComputedStyle(h), f = l.left + (c ? parseInt(c.paddingLeft) + Math.min(0, parseInt(c.textIndent)) : 0), u = l.right - (c ? parseInt(c.paddingRight) : 0), d = il(n, i, 1), p = il(n, s, -1), g = d.type == Je.Text ? d : null, b = p.type == Je.Text ? p : null;
    if (g && (n.lineWrapping || d.widgetLineBreaks) && (g = Ch(n, i, 1, g)), b && (n.lineWrapping || p.widgetLineBreaks) && (b = Ch(n, s, -1, b)), g && b && g.from == b.from && g.to == b.to) return S(A(t.from, t.to, g));
    {
      let w = g ? A(t.from, null, g) : C(d, false), O = b ? A(null, t.to, b) : C(p, true), M = [];
      return (g || d).to < (b || p).from - (g && b ? 1 : 0) || d.widgetLineBreaks > 1 && w.bottom + n.defaultLineHeight / 2 < O.top ? M.push(y(f, w.bottom, u, O.top)) : w.bottom < O.top && n.elementAtHeight((w.bottom + O.top) / 2).type == Je.Text && (w.bottom = O.top = (w.bottom + O.top) / 2), S(w).concat(M).concat(S(O));
    }
    function y(w, O, M, W) {
      return new es(e, w - a.left, O - a.top, M - w, W - O);
    }
    function S({ top: w, bottom: O, horizontal: M }) {
      let W = [];
      for (let U = 0; U < M.length; U += 2) W.push(y(M[U], w, M[U + 1], O));
      return W;
    }
    function A(w, O, M) {
      let W = 1e9, U = -1e9, te = [];
      function V(Q, ne, xe, be, Te) {
        let ye = n.coordsAtPos(Q, Q == M.to ? -2 : 2), Ee = n.coordsAtPos(xe, xe == M.from ? 2 : -2);
        !ye || !Ee || (W = Math.min(ye.top, Ee.top, W), U = Math.max(ye.bottom, Ee.bottom, U), Te == ge.LTR ? te.push(r && ne ? f : ye.left, r && be ? u : Ee.right) : te.push(!r && be ? f : Ee.left, !r && ne ? u : ye.right));
      }
      let I = w ?? M.from, J = O ?? M.to;
      for (let Q of n.visibleRanges) if (Q.to > I && Q.from < J) for (let ne = Math.max(Q.from, I), xe = Math.min(Q.to, J); ; ) {
        let be = n.state.doc.lineAt(ne);
        for (let Te of n.bidiSpans(be)) {
          let ye = Te.from + be.from, Ee = Te.to + be.from;
          if (ye >= xe) break;
          Ee > ne && V(Math.max(ye, ne), w == null && ye <= I, Math.min(Ee, xe), O == null && Ee >= J, Te.dir);
        }
        if (ne = be.to + 1, ne >= xe) break;
      }
      return te.length == 0 && V(I, w == null, J, O == null, n.textDirection), {
        top: W,
        bottom: U,
        horizontal: te
      };
    }
    function C(w, O) {
      let M = l.top + (O ? w.top : w.bottom);
      return {
        top: M,
        bottom: M,
        horizontal: []
      };
    }
  }
  function H0(n, e) {
    return n.constructor == e.constructor && n.eq(e);
  }
  class W0 {
    constructor(e, t) {
      this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = {
        read: this.measure.bind(this),
        write: this.draw.bind(this)
      }, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
    }
    update(e) {
      e.startState.facet(Ks) != e.state.facet(Ks) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
    }
    docViewUpdate(e) {
      this.layer.updateOnDocViewUpdate !== false && e.requestMeasure(this.measureReq);
    }
    setOrder(e) {
      let t = 0, i = e.facet(Ks);
      for (; t < i.length && i[t] != this.layer; ) t++;
      this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
    }
    measure() {
      return this.layer.markers(this.view);
    }
    scale() {
      let { scaleX: e, scaleY: t } = this.view;
      (e != this.scaleX || t != this.scaleY) && (this.scaleX = e, this.scaleY = t, this.dom.style.transform = `scale(${1 / e}, ${1 / t})`);
    }
    draw(e) {
      if (e.length != this.drawn.length || e.some((t, i) => !H0(t, this.drawn[i]))) {
        let t = this.dom.firstChild, i = 0;
        for (let s of e) s.update && t && s.constructor && this.drawn[i].constructor && s.update(t, this.drawn[i]) ? (t = t.nextSibling, i++) : this.dom.insertBefore(s.draw(), t);
        for (; t; ) {
          let s = t.nextSibling;
          t.remove(), t = s;
        }
        this.drawn = e;
      }
    }
    destroy() {
      this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
    }
  }
  const Ks = B.define();
  function hu(n) {
    return [
      Oe.define((e) => new W0(e, n)),
      Ks.of(n)
    ];
  }
  const Wn = B.define({
    combine(n) {
      return zt(n, {
        cursorBlinkRate: 1200,
        drawRangeCursor: true
      }, {
        cursorBlinkRate: (e, t) => Math.min(e, t),
        drawRangeCursor: (e, t) => e || t
      });
    }
  });
  function z0(n = {}) {
    return [
      Wn.of(n),
      V0,
      Q0,
      q0,
      Ff.of(true)
    ];
  }
  function cu(n) {
    return n.startState.facet(Wn) != n.state.facet(Wn);
  }
  const V0 = hu({
    above: true,
    markers(n) {
      let { state: e } = n, t = e.facet(Wn), i = [];
      for (let s of e.selection.ranges) {
        let r = s == e.selection.main;
        if (s.empty || t.drawRangeCursor) {
          let o = r ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", l = s.empty ? s : v.cursor(s.head, s.head > s.anchor ? -1 : 1);
          for (let a of es.forRange(n, o, l)) i.push(a);
        }
      }
      return i;
    },
    update(n, e) {
      n.transactions.some((i) => i.selection) && (e.style.animationName = e.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
      let t = cu(n);
      return t && Ah(n.state, e), n.docChanged || n.selectionSet || t;
    },
    mount(n, e) {
      Ah(e.state, n);
    },
    class: "cm-cursorLayer"
  });
  function Ah(n, e) {
    e.style.animationDuration = n.facet(Wn).cursorBlinkRate + "ms";
  }
  const Q0 = hu({
    above: false,
    markers(n) {
      return n.state.selection.ranges.map((e) => e.empty ? [] : es.forRange(n, "cm-selectionBackground", e)).reduce((e, t) => e.concat(t));
    },
    update(n, e) {
      return n.docChanged || n.selectionSet || n.viewportChanged || cu(n);
    },
    class: "cm-selectionLayer"
  }), q0 = Wi.highest(E.theme({
    ".cm-line": {
      "& ::selection, &::selection": {
        backgroundColor: "transparent !important"
      },
      caretColor: "transparent !important"
    },
    ".cm-content": {
      caretColor: "transparent !important",
      "& :focus": {
        caretColor: "initial !important",
        "&::selection, & ::selection": {
          backgroundColor: "Highlight !important"
        }
      }
    }
  })), fu = j.define({
    map(n, e) {
      return n == null ? null : e.mapPos(n);
    }
  }), An = Qe.define({
    create() {
      return null;
    },
    update(n, e) {
      return n != null && (n = e.changes.mapPos(n)), e.effects.reduce((t, i) => i.is(fu) ? i.value : t, n);
    }
  }), X0 = Oe.fromClass(class {
    constructor(n) {
      this.view = n, this.cursor = null, this.measureReq = {
        read: this.readPos.bind(this),
        write: this.drawCursor.bind(this)
      };
    }
    update(n) {
      var e;
      let t = n.state.field(An);
      t == null ? this.cursor != null && ((e = this.cursor) === null || e === void 0 || e.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (n.startState.field(An) != t || n.docChanged || n.geometryChanged) && this.view.requestMeasure(this.measureReq));
    }
    readPos() {
      let { view: n } = this, e = n.state.field(An), t = e != null && n.coordsAtPos(e);
      if (!t) return null;
      let i = n.scrollDOM.getBoundingClientRect();
      return {
        left: t.left - i.left + n.scrollDOM.scrollLeft * n.scaleX,
        top: t.top - i.top + n.scrollDOM.scrollTop * n.scaleY,
        height: t.bottom - t.top
      };
    }
    drawCursor(n) {
      if (this.cursor) {
        let { scaleX: e, scaleY: t } = this.view;
        n ? (this.cursor.style.left = n.left / e + "px", this.cursor.style.top = n.top / t + "px", this.cursor.style.height = n.height / t + "px") : this.cursor.style.left = "-100000px";
      }
    }
    destroy() {
      this.cursor && this.cursor.remove();
    }
    setDropPos(n) {
      this.view.state.field(An) != n && this.view.dispatch({
        effects: fu.of(n)
      });
    }
  }, {
    eventObservers: {
      dragover(n) {
        this.setDropPos(this.view.posAtCoords({
          x: n.clientX,
          y: n.clientY
        }));
      },
      dragleave(n) {
        (n.target == this.view.contentDOM || !this.view.contentDOM.contains(n.relatedTarget)) && this.setDropPos(null);
      },
      dragend() {
        this.setDropPos(null);
      },
      drop() {
        this.setDropPos(null);
      }
    }
  });
  function U0() {
    return [
      An,
      X0
    ];
  }
  function Mh(n, e, t, i, s) {
    e.lastIndex = 0;
    for (let r = n.iterRange(t, i), o = t, l; !r.next().done; o += r.value.length) if (!r.lineBreak) for (; l = e.exec(r.value); ) s(o + l.index, l);
  }
  function $0(n, e) {
    let t = n.visibleRanges;
    if (t.length == 1 && t[0].from == n.viewport.from && t[0].to == n.viewport.to) return t;
    let i = [];
    for (let { from: s, to: r } of t) s = Math.max(n.state.doc.lineAt(s).from, s - e), r = Math.min(n.state.doc.lineAt(r).to, r + e), i.length && i[i.length - 1].to >= s ? i[i.length - 1].to = r : i.push({
      from: s,
      to: r
    });
    return i;
  }
  class j0 {
    constructor(e) {
      const { regexp: t, decoration: i, decorate: s, boundary: r, maxLength: o = 1e3 } = e;
      if (!t.global) throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
      if (this.regexp = t, s) this.addMatch = (l, a, h, c) => s(c, h, h + l[0].length, l, a);
      else if (typeof i == "function") this.addMatch = (l, a, h, c) => {
        let f = i(l, a, h);
        f && c(h, h + l[0].length, f);
      };
      else if (i) this.addMatch = (l, a, h, c) => c(h, h + l[0].length, i);
      else throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
      this.boundary = r, this.maxLength = o;
    }
    createDeco(e) {
      let t = new Gt(), i = t.add.bind(t);
      for (let { from: s, to: r } of $0(e, this.maxLength)) Mh(e.state.doc, this.regexp, s, r, (o, l) => this.addMatch(l, e, o, i));
      return t.finish();
    }
    updateDeco(e, t) {
      let i = 1e9, s = -1;
      return e.docChanged && e.changes.iterChanges((r, o, l, a) => {
        a >= e.view.viewport.from && l <= e.view.viewport.to && (i = Math.min(l, i), s = Math.max(a, s));
      }), e.viewportMoved || s - i > 1e3 ? this.createDeco(e.view) : s > -1 ? this.updateRange(e.view, t.map(e.changes), i, s) : t;
    }
    updateRange(e, t, i, s) {
      for (let r of e.visibleRanges) {
        let o = Math.max(r.from, i), l = Math.min(r.to, s);
        if (l >= o) {
          let a = e.state.doc.lineAt(o), h = a.to < l ? e.state.doc.lineAt(l) : a, c = Math.max(r.from, a.from), f = Math.min(r.to, h.to);
          if (this.boundary) {
            for (; o > a.from; o--) if (this.boundary.test(a.text[o - 1 - a.from])) {
              c = o;
              break;
            }
            for (; l < h.to; l++) if (this.boundary.test(h.text[l - h.from])) {
              f = l;
              break;
            }
          }
          let u = [], d, p = (g, b, y) => u.push(y.range(g, b));
          if (a == h) for (this.regexp.lastIndex = c - a.from; (d = this.regexp.exec(a.text)) && d.index < f - a.from; ) this.addMatch(d, e, d.index + a.from, p);
          else Mh(e.state.doc, this.regexp, c, f, (g, b) => this.addMatch(b, e, g, p));
          t = t.update({
            filterFrom: c,
            filterTo: f,
            filter: (g, b) => g < c || b > f,
            add: u
          });
        }
      }
      return t;
    }
  }
  const al = /x/.unicode != null ? "gu" : "g", K0 = new RegExp(`[\0-\b
-\x7F-\x9F\xAD\u061C\u200B\u200E\u200F\u2028\u2029\u202D\u202E\u2066\u2067\u2069\uFEFF\uFFF9-\uFFFC]`, al), G0 = {
    0: "null",
    7: "bell",
    8: "backspace",
    10: "newline",
    11: "vertical tab",
    13: "carriage return",
    27: "escape",
    8203: "zero width space",
    8204: "zero width non-joiner",
    8205: "zero width joiner",
    8206: "left-to-right mark",
    8207: "right-to-left mark",
    8232: "line separator",
    8237: "left-to-right override",
    8238: "right-to-left override",
    8294: "left-to-right isolate",
    8295: "right-to-left isolate",
    8297: "pop directional isolate",
    8233: "paragraph separator",
    65279: "zero width no-break space",
    65532: "object replacement"
  };
  let lo = null;
  function Y0() {
    var n;
    if (lo == null && typeof document < "u" && document.body) {
      let e = document.body.style;
      lo = ((n = e.tabSize) !== null && n !== void 0 ? n : e.MozTabSize) != null;
    }
    return lo || false;
  }
  const Gs = B.define({
    combine(n) {
      let e = zt(n, {
        render: null,
        specialChars: K0,
        addSpecialChars: null
      });
      return (e.replaceTabs = !Y0()) && (e.specialChars = new RegExp("	|" + e.specialChars.source, al)), e.addSpecialChars && (e.specialChars = new RegExp(e.specialChars.source + "|" + e.addSpecialChars.source, al)), e;
    }
  });
  function J0(n = {}) {
    return [
      Gs.of(n),
      Z0()
    ];
  }
  let Th = null;
  function Z0() {
    return Th || (Th = Oe.fromClass(class {
      constructor(n) {
        this.view = n, this.decorations = z.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(n.state.facet(Gs)), this.decorations = this.decorator.createDeco(n);
      }
      makeDecorator(n) {
        return new j0({
          regexp: n.specialChars,
          decoration: (e, t, i) => {
            let { doc: s } = t.state, r = tt(e[0], 0);
            if (r == 9) {
              let o = s.lineAt(i), l = t.state.tabSize, a = dn(o.text, l, i - o.from);
              return z.replace({
                widget: new nb((l - a % l) * this.view.defaultCharacterWidth / this.view.scaleX)
              });
            }
            return this.decorationCache[r] || (this.decorationCache[r] = z.replace({
              widget: new ib(n, r)
            }));
          },
          boundary: n.replaceTabs ? void 0 : /[^]/
        });
      }
      update(n) {
        let e = n.state.facet(Gs);
        n.startState.facet(Gs) != e ? (this.decorator = this.makeDecorator(e), this.decorations = this.decorator.createDeco(n.view)) : this.decorations = this.decorator.updateDeco(n, this.decorations);
      }
    }, {
      decorations: (n) => n.decorations
    }));
  }
  const eb = "\u2022";
  function tb(n) {
    return n >= 32 ? eb : n == 10 ? "\u2424" : String.fromCharCode(9216 + n);
  }
  class ib extends ti {
    constructor(e, t) {
      super(), this.options = e, this.code = t;
    }
    eq(e) {
      return e.code == this.code;
    }
    toDOM(e) {
      let t = tb(this.code), i = e.state.phrase("Control character") + " " + (G0[this.code] || "0x" + this.code.toString(16)), s = this.options.render && this.options.render(this.code, i, t);
      if (s) return s;
      let r = document.createElement("span");
      return r.textContent = t, r.title = i, r.setAttribute("aria-label", i), r.className = "cm-specialChar", r;
    }
    ignoreEvent() {
      return false;
    }
  }
  class nb extends ti {
    constructor(e) {
      super(), this.width = e;
    }
    eq(e) {
      return e.width == this.width;
    }
    toDOM() {
      let e = document.createElement("span");
      return e.textContent = "	", e.className = "cm-tab", e.style.width = this.width + "px", e;
    }
    ignoreEvent() {
      return false;
    }
  }
  function sb() {
    return ob;
  }
  const rb = z.line({
    class: "cm-activeLine"
  }), ob = Oe.fromClass(class {
    constructor(n) {
      this.decorations = this.getDeco(n);
    }
    update(n) {
      (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
    }
    getDeco(n) {
      let e = -1, t = [];
      for (let i of n.state.selection.ranges) {
        let s = n.lineBlockAt(i.head);
        s.from > e && (t.push(rb.range(s.from)), e = s.from);
      }
      return z.set(t);
    }
  }, {
    decorations: (n) => n.decorations
  });
  class lb extends ti {
    constructor(e) {
      super(), this.content = e;
    }
    toDOM(e) {
      let t = document.createElement("span");
      return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(e) : this.content.cloneNode(true)), t.setAttribute("aria-hidden", "true"), t;
    }
    coordsAt(e) {
      let t = e.firstChild ? rn(e.firstChild) : [];
      if (!t.length) return null;
      let i = window.getComputedStyle(e.parentNode), s = Yn(t[0], i.direction != "rtl"), r = parseInt(i.lineHeight);
      return s.bottom - s.top > r * 1.5 ? {
        left: s.left,
        right: s.right,
        top: s.top,
        bottom: s.top + r
      } : s;
    }
    ignoreEvent() {
      return false;
    }
  }
  function ab(n) {
    let e = Oe.fromClass(class {
      constructor(t) {
        this.view = t, this.placeholder = n ? z.set([
          z.widget({
            widget: new lb(n),
            side: 1
          }).range(0)
        ]) : z.none;
      }
      get decorations() {
        return this.view.state.doc.length ? z.none : this.placeholder;
      }
    }, {
      decorations: (t) => t.decorations
    });
    return typeof n == "string" ? [
      e,
      E.contentAttributes.of({
        "aria-placeholder": n
      })
    ] : e;
  }
  const hl = 2e3;
  function hb(n, e, t) {
    let i = Math.min(e.line, t.line), s = Math.max(e.line, t.line), r = [];
    if (e.off > hl || t.off > hl || e.col < 0 || t.col < 0) {
      let o = Math.min(e.off, t.off), l = Math.max(e.off, t.off);
      for (let a = i; a <= s; a++) {
        let h = n.doc.line(a);
        h.length <= l && r.push(v.range(h.from + o, h.to + l));
      }
    } else {
      let o = Math.min(e.col, t.col), l = Math.max(e.col, t.col);
      for (let a = i; a <= s; a++) {
        let h = n.doc.line(a), c = zo(h.text, o, n.tabSize, true);
        if (c < 0) r.push(v.cursor(h.to));
        else {
          let f = zo(h.text, l, n.tabSize);
          r.push(v.range(h.from + c, h.from + f));
        }
      }
    }
    return r;
  }
  function cb(n, e) {
    let t = n.coordsAtPos(n.viewport.from);
    return t ? Math.round(Math.abs((t.left - e) / n.defaultCharacterWidth)) : -1;
  }
  function Ph(n, e) {
    let t = n.posAtCoords({
      x: e.clientX,
      y: e.clientY
    }, false), i = n.state.doc.lineAt(t), s = t - i.from, r = s > hl ? -1 : s == i.length ? cb(n, e.clientX) : dn(i.text, n.state.tabSize, t - i.from);
    return {
      line: i.number,
      col: r,
      off: s
    };
  }
  function fb(n, e) {
    let t = Ph(n, e), i = n.state.selection;
    return t ? {
      update(s) {
        if (s.docChanged) {
          let r = s.changes.mapPos(s.startState.doc.line(t.line).from), o = s.state.doc.lineAt(r);
          t = {
            line: o.number,
            col: t.col,
            off: Math.min(t.off, o.length)
          }, i = i.map(s.changes);
        }
      },
      get(s, r, o) {
        let l = Ph(n, s);
        if (!l) return i;
        let a = hb(n.state, t, l);
        return a.length ? o ? v.create(a.concat(i.ranges)) : v.create(a) : i;
      }
    } : null;
  }
  function ub(n) {
    let e = (t) => t.altKey && t.button == 0;
    return E.mouseSelectionStyle.of((t, i) => e(i) ? fb(t, i) : null);
  }
  const db = {
    Alt: [
      18,
      (n) => !!n.altKey
    ],
    Control: [
      17,
      (n) => !!n.ctrlKey
    ],
    Shift: [
      16,
      (n) => !!n.shiftKey
    ],
    Meta: [
      91,
      (n) => !!n.metaKey
    ]
  }, pb = {
    style: "cursor: crosshair"
  };
  function gb(n = {}) {
    let [e, t] = db[n.key || "Alt"], i = Oe.fromClass(class {
      constructor(s) {
        this.view = s, this.isDown = false;
      }
      set(s) {
        this.isDown != s && (this.isDown = s, this.view.update([]));
      }
    }, {
      eventObservers: {
        keydown(s) {
          this.set(s.keyCode == e || t(s));
        },
        keyup(s) {
          (s.keyCode == e || !t(s)) && this.set(false);
        },
        mousemove(s) {
          this.set(t(s));
        }
      }
    });
    return [
      i,
      E.contentAttributes.of((s) => {
        var r;
        return !((r = s.plugin(i)) === null || r === void 0) && r.isDown ? pb : null;
      })
    ];
  }
  const xn = "-10000px";
  class uu {
    constructor(e, t, i, s) {
      this.facet = t, this.createTooltipView = i, this.removeTooltipView = s, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
      let r = null;
      this.tooltipViews = this.tooltips.map((o) => r = i(o, r));
    }
    update(e, t) {
      var i;
      let s = e.state.facet(this.facet), r = s.filter((a) => a);
      if (s === this.input) {
        for (let a of this.tooltipViews) a.update && a.update(e);
        return false;
      }
      let o = [], l = t ? [] : null;
      for (let a = 0; a < r.length; a++) {
        let h = r[a], c = -1;
        if (h) {
          for (let f = 0; f < this.tooltips.length; f++) {
            let u = this.tooltips[f];
            u && u.create == h.create && (c = f);
          }
          if (c < 0) o[a] = this.createTooltipView(h, a ? o[a - 1] : null), l && (l[a] = !!h.above);
          else {
            let f = o[a] = this.tooltipViews[c];
            l && (l[a] = t[c]), f.update && f.update(e);
          }
        }
      }
      for (let a of this.tooltipViews) o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
      return t && (l.forEach((a, h) => t[h] = a), t.length = l.length), this.input = s, this.tooltips = r, this.tooltipViews = o, true;
    }
  }
  function mb(n) {
    let e = n.dom.ownerDocument.documentElement;
    return {
      top: 0,
      left: 0,
      bottom: e.clientHeight,
      right: e.clientWidth
    };
  }
  const ao = B.define({
    combine: (n) => {
      var e, t, i;
      return {
        position: L.ios ? "absolute" : ((e = n.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
        parent: ((t = n.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
        tooltipSpace: ((i = n.find((s) => s.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || mb
      };
    }
  }), Dh = /* @__PURE__ */ new WeakMap(), Ul = Oe.fromClass(class {
    constructor(n) {
      this.view = n, this.above = [], this.inView = true, this.madeAbsolute = false, this.lastTransaction = 0, this.measureTimeout = -1;
      let e = n.state.facet(ao);
      this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = {
        read: this.readMeasure.bind(this),
        write: this.writeMeasure.bind(this),
        key: this
      }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new uu(n, $l, (t, i) => this.createTooltip(t, i), (t) => {
        this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
      }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
        Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
      }, {
        threshold: [
          1
        ]
      }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
    }
    createContainer() {
      this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
    }
    observeIntersection() {
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        for (let n of this.manager.tooltipViews) this.intersectionObserver.observe(n.dom);
      }
    }
    measureSoon() {
      this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
        this.measureTimeout = -1, this.maybeMeasure();
      }, 50));
    }
    update(n) {
      n.transactions.length && (this.lastTransaction = Date.now());
      let e = this.manager.update(n, this.above);
      e && this.observeIntersection();
      let t = e || n.geometryChanged, i = n.state.facet(ao);
      if (i.position != this.position && !this.madeAbsolute) {
        this.position = i.position;
        for (let s of this.manager.tooltipViews) s.dom.style.position = this.position;
        t = true;
      }
      if (i.parent != this.parent) {
        this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
        for (let s of this.manager.tooltipViews) this.container.appendChild(s.dom);
        t = true;
      } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
      t && this.maybeMeasure();
    }
    createTooltip(n, e) {
      let t = n.create(this.view), i = e ? e.dom : null;
      if (t.dom.classList.add("cm-tooltip"), n.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
        let s = document.createElement("div");
        s.className = "cm-tooltip-arrow", t.dom.appendChild(s);
      }
      return t.dom.style.position = this.position, t.dom.style.top = xn, t.dom.style.left = "0px", this.container.insertBefore(t.dom, i), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
    }
    destroy() {
      var n, e, t;
      this.view.win.removeEventListener("resize", this.measureSoon);
      for (let i of this.manager.tooltipViews) i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
      this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
    }
    readMeasure() {
      let n = 1, e = 1, t = false;
      if (this.position == "fixed" && this.manager.tooltipViews.length) {
        let { dom: r } = this.manager.tooltipViews[0];
        if (L.gecko) t = r.offsetParent != this.container.ownerDocument.body;
        else if (r.style.top == xn && r.style.left == "0px") {
          let o = r.getBoundingClientRect();
          t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
        }
      }
      if (t || this.position == "absolute") if (this.parent) {
        let r = this.parent.getBoundingClientRect();
        r.width && r.height && (n = r.width / this.parent.offsetWidth, e = r.height / this.parent.offsetHeight);
      } else ({ scaleX: n, scaleY: e } = this.view.viewState);
      let i = this.view.scrollDOM.getBoundingClientRect(), s = Vl(this.view);
      return {
        visible: {
          left: i.left + s.left,
          top: i.top + s.top,
          right: i.right - s.right,
          bottom: i.bottom - s.bottom
        },
        parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
        pos: this.manager.tooltips.map((r, o) => {
          let l = this.manager.tooltipViews[o];
          return l.getCoords ? l.getCoords(r.pos) : this.view.coordsAtPos(r.pos);
        }),
        size: this.manager.tooltipViews.map(({ dom: r }) => r.getBoundingClientRect()),
        space: this.view.state.facet(ao).tooltipSpace(this.view),
        scaleX: n,
        scaleY: e,
        makeAbsolute: t
      };
    }
    writeMeasure(n) {
      var e;
      if (n.makeAbsolute) {
        this.madeAbsolute = true, this.position = "absolute";
        for (let l of this.manager.tooltipViews) l.dom.style.position = "absolute";
      }
      let { visible: t, space: i, scaleX: s, scaleY: r } = n, o = [];
      for (let l = 0; l < this.manager.tooltips.length; l++) {
        let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = n.pos[l], u = n.size[l];
        if (!f || a.clip !== false && (f.bottom <= Math.max(t.top, i.top) || f.top >= Math.min(t.bottom, i.bottom) || f.right < Math.max(t.left, i.left) - 0.1 || f.left > Math.min(t.right, i.right) + 0.1)) {
          c.style.top = xn;
          continue;
        }
        let d = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, p = d ? 7 : 0, g = u.right - u.left, b = (e = Dh.get(h)) !== null && e !== void 0 ? e : u.bottom - u.top, y = h.offset || yb, S = this.view.textDirection == ge.LTR, A = u.width > i.right - i.left ? S ? i.left : i.right - u.width : S ? Math.max(i.left, Math.min(f.left - (d ? 14 : 0) + y.x, i.right - g)) : Math.min(Math.max(i.left, f.left - g + (d ? 14 : 0) - y.x), i.right - g), C = this.above[l];
        !a.strictSide && (C ? f.top - b - p - y.y < i.top : f.bottom + b + p + y.y > i.bottom) && C == i.bottom - f.bottom > f.top - i.top && (C = this.above[l] = !C);
        let w = (C ? f.top - i.top : i.bottom - f.bottom) - p;
        if (w < b && h.resize !== false) {
          if (w < this.view.defaultLineHeight) {
            c.style.top = xn;
            continue;
          }
          Dh.set(h, b), c.style.height = (b = w) / r + "px";
        } else c.style.height && (c.style.height = "");
        let O = C ? f.top - b - p - y.y : f.bottom + p + y.y, M = A + g;
        if (h.overlap !== true) for (let W of o) W.left < M && W.right > A && W.top < O + b && W.bottom > O && (O = C ? W.top - b - 2 - p : W.bottom + p + 2);
        if (this.position == "absolute" ? (c.style.top = (O - n.parent.top) / r + "px", Rh(c, (A - n.parent.left) / s)) : (c.style.top = O / r + "px", Rh(c, A / s)), d) {
          let W = f.left + (S ? y.x : -y.x) - (A + 14 - 7);
          d.style.left = W / s + "px";
        }
        h.overlap !== true && o.push({
          left: A,
          top: O,
          right: M,
          bottom: O + b
        }), c.classList.toggle("cm-tooltip-above", C), c.classList.toggle("cm-tooltip-below", !C), h.positioned && h.positioned(n.space);
      }
    }
    maybeMeasure() {
      if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView))) for (let n of this.manager.tooltipViews) n.dom.style.top = xn;
    }
  }, {
    eventObservers: {
      scroll() {
        this.maybeMeasure();
      }
    }
  });
  function Rh(n, e) {
    let t = parseInt(n.style.left, 10);
    (isNaN(t) || Math.abs(e - t) > 1) && (n.style.left = e + "px");
  }
  const bb = E.baseTheme({
    ".cm-tooltip": {
      zIndex: 500,
      boxSizing: "border-box"
    },
    "&light .cm-tooltip": {
      border: "1px solid #bbb",
      backgroundColor: "#f5f5f5"
    },
    "&light .cm-tooltip-section:not(:first-child)": {
      borderTop: "1px solid #bbb"
    },
    "&dark .cm-tooltip": {
      backgroundColor: "#333338",
      color: "white"
    },
    ".cm-tooltip-arrow": {
      height: "7px",
      width: `${7 * 2}px`,
      position: "absolute",
      zIndex: -1,
      overflow: "hidden",
      "&:before, &:after": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent"
      },
      ".cm-tooltip-above &": {
        bottom: "-7px",
        "&:before": {
          borderTop: "7px solid #bbb"
        },
        "&:after": {
          borderTop: "7px solid #f5f5f5",
          bottom: "1px"
        }
      },
      ".cm-tooltip-below &": {
        top: "-7px",
        "&:before": {
          borderBottom: "7px solid #bbb"
        },
        "&:after": {
          borderBottom: "7px solid #f5f5f5",
          top: "1px"
        }
      }
    },
    "&dark .cm-tooltip .cm-tooltip-arrow": {
      "&:before": {
        borderTopColor: "#333338",
        borderBottomColor: "#333338"
      },
      "&:after": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
      }
    }
  }), yb = {
    x: 0,
    y: 0
  }, $l = B.define({
    enables: [
      Ul,
      bb
    ]
  }), ar = B.define({
    combine: (n) => n.reduce((e, t) => e.concat(t), [])
  });
  class Br {
    static create(e) {
      return new Br(e);
    }
    constructor(e) {
      this.view = e, this.mounted = false, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new uu(e, ar, (t, i) => this.createHostedView(t, i), (t) => t.dom.remove());
    }
    createHostedView(e, t) {
      let i = e.create(this.view);
      return i.dom.classList.add("cm-tooltip-section"), this.dom.insertBefore(i.dom, t ? t.dom.nextSibling : this.dom.firstChild), this.mounted && i.mount && i.mount(this.view), i;
    }
    mount(e) {
      for (let t of this.manager.tooltipViews) t.mount && t.mount(e);
      this.mounted = true;
    }
    positioned(e) {
      for (let t of this.manager.tooltipViews) t.positioned && t.positioned(e);
    }
    update(e) {
      this.manager.update(e);
    }
    destroy() {
      var e;
      for (let t of this.manager.tooltipViews) (e = t.destroy) === null || e === void 0 || e.call(t);
    }
    passProp(e) {
      let t;
      for (let i of this.manager.tooltipViews) {
        let s = i[e];
        if (s !== void 0) {
          if (t === void 0) t = s;
          else if (t !== s) return;
        }
      }
      return t;
    }
    get offset() {
      return this.passProp("offset");
    }
    get getCoords() {
      return this.passProp("getCoords");
    }
    get overlap() {
      return this.passProp("overlap");
    }
    get resize() {
      return this.passProp("resize");
    }
  }
  const xb = $l.compute([
    ar
  ], (n) => {
    let e = n.facet(ar);
    return e.length === 0 ? null : {
      pos: Math.min(...e.map((t) => t.pos)),
      end: Math.max(...e.map((t) => {
        var i;
        return (i = t.end) !== null && i !== void 0 ? i : t.pos;
      })),
      create: Br.create,
      above: e[0].above,
      arrow: e.some((t) => t.arrow)
    };
  });
  class wb {
    constructor(e, t, i, s, r) {
      this.view = e, this.source = t, this.field = i, this.setHover = s, this.hoverTime = r, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = {
        x: 0,
        y: 0,
        target: e.dom,
        time: 0
      }, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
    }
    update() {
      this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
    }
    get active() {
      return this.view.state.field(this.field);
    }
    checkHover() {
      if (this.hoverTimeout = -1, this.active.length) return;
      let e = Date.now() - this.lastMove.time;
      e < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - e) : this.startHover();
    }
    startHover() {
      clearTimeout(this.restartTimeout);
      let { view: e, lastMove: t } = this, i = e.docView.nearest(t.target);
      if (!i) return;
      let s, r = 1;
      if (i instanceof ui) s = i.posAtStart;
      else {
        if (s = e.posAtCoords(t), s == null) return;
        let l = e.coordsAtPos(s);
        if (!l || t.y < l.top || t.y > l.bottom || t.x < l.left - e.defaultCharacterWidth || t.x > l.right + e.defaultCharacterWidth) return;
        let a = e.bidiSpans(e.state.doc.lineAt(s)).find((c) => c.from <= s && c.to >= s), h = a && a.dir == ge.RTL ? -1 : 1;
        r = t.x < l.left ? -h : h;
      }
      let o = this.source(e, s, r);
      if (o == null ? void 0 : o.then) {
        let l = this.pending = {
          pos: s
        };
        o.then((a) => {
          this.pending == l && (this.pending = null, a && !(Array.isArray(a) && !a.length) && e.dispatch({
            effects: this.setHover.of(Array.isArray(a) ? a : [
              a
            ])
          }));
        }, (a) => st(e.state, a, "hover tooltip"));
      } else o && !(Array.isArray(o) && !o.length) && e.dispatch({
        effects: this.setHover.of(Array.isArray(o) ? o : [
          o
        ])
      });
    }
    get tooltip() {
      let e = this.view.plugin(Ul), t = e ? e.manager.tooltips.findIndex((i) => i.create == Br.create) : -1;
      return t > -1 ? e.manager.tooltipViews[t] : null;
    }
    mousemove(e) {
      var t, i;
      this.lastMove = {
        x: e.clientX,
        y: e.clientY,
        target: e.target,
        time: Date.now()
      }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
      let { active: s, tooltip: r } = this;
      if (s.length && r && !kb(r.dom, e) || this.pending) {
        let { pos: o } = s[0] || this.pending, l = (i = (t = s[0]) === null || t === void 0 ? void 0 : t.end) !== null && i !== void 0 ? i : o;
        (o == l ? this.view.posAtCoords(this.lastMove) != o : !vb(this.view, o, l, e.clientX, e.clientY)) && (this.view.dispatch({
          effects: this.setHover.of([])
        }), this.pending = null);
      }
    }
    mouseleave(e) {
      clearTimeout(this.hoverTimeout), this.hoverTimeout = -1;
      let { active: t } = this;
      if (t.length) {
        let { tooltip: i } = this;
        i && i.dom.contains(e.relatedTarget) ? this.watchTooltipLeave(i.dom) : this.view.dispatch({
          effects: this.setHover.of([])
        });
      }
    }
    watchTooltipLeave(e) {
      let t = (i) => {
        e.removeEventListener("mouseleave", t), this.active.length && !this.view.dom.contains(i.relatedTarget) && this.view.dispatch({
          effects: this.setHover.of([])
        });
      };
      e.addEventListener("mouseleave", t);
    }
    destroy() {
      clearTimeout(this.hoverTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
    }
  }
  const Ps = 4;
  function kb(n, e) {
    let { left: t, right: i, top: s, bottom: r } = n.getBoundingClientRect(), o;
    if (o = n.querySelector(".cm-tooltip-arrow")) {
      let l = o.getBoundingClientRect();
      s = Math.min(l.top, s), r = Math.max(l.bottom, r);
    }
    return e.clientX >= t - Ps && e.clientX <= i + Ps && e.clientY >= s - Ps && e.clientY <= r + Ps;
  }
  function vb(n, e, t, i, s, r) {
    let o = n.scrollDOM.getBoundingClientRect(), l = n.documentTop + n.documentPadding.top + n.contentHeight;
    if (o.left > i || o.right < i || o.top > s || Math.min(o.bottom, l) < s) return false;
    let a = n.posAtCoords({
      x: i,
      y: s
    }, false);
    return a >= e && a <= t;
  }
  function Sb(n, e = {}) {
    let t = j.define(), i = Qe.define({
      create() {
        return [];
      },
      update(s, r) {
        if (s.length && (e.hideOnChange && (r.docChanged || r.selection) ? s = [] : e.hideOn && (s = s.filter((o) => !e.hideOn(r, o))), r.docChanged)) {
          let o = [];
          for (let l of s) {
            let a = r.changes.mapPos(l.pos, -1, Ye.TrackDel);
            if (a != null) {
              let h = Object.assign(/* @__PURE__ */ Object.create(null), l);
              h.pos = a, h.end != null && (h.end = r.changes.mapPos(h.end)), o.push(h);
            }
          }
          s = o;
        }
        for (let o of r.effects) o.is(t) && (s = o.value), o.is(Ob) && (s = []);
        return s;
      },
      provide: (s) => ar.from(s)
    });
    return {
      active: i,
      extension: [
        i,
        Oe.define((s) => new wb(s, n, i, t, e.hoverTime || 300)),
        xb
      ]
    };
  }
  function du(n, e) {
    let t = n.plugin(Ul);
    if (!t) return null;
    let i = t.manager.tooltips.indexOf(e);
    return i < 0 ? null : t.manager.tooltipViews[i];
  }
  const Ob = j.define(), Eh = B.define({
    combine(n) {
      let e, t;
      for (let i of n) e = e || i.topContainer, t = t || i.bottomContainer;
      return {
        topContainer: e,
        bottomContainer: t
      };
    }
  });
  function zn(n, e) {
    let t = n.plugin(pu), i = t ? t.specs.indexOf(e) : -1;
    return i > -1 ? t.panels[i] : null;
  }
  const pu = Oe.fromClass(class {
    constructor(n) {
      this.input = n.state.facet(Vn), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(n));
      let e = n.state.facet(Eh);
      this.top = new Ds(n, true, e.topContainer), this.bottom = new Ds(n, false, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
      for (let t of this.panels) t.dom.classList.add("cm-panel"), t.mount && t.mount();
    }
    update(n) {
      let e = n.state.facet(Eh);
      this.top.container != e.topContainer && (this.top.sync([]), this.top = new Ds(n.view, true, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new Ds(n.view, false, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
      let t = n.state.facet(Vn);
      if (t != this.input) {
        let i = t.filter((a) => a), s = [], r = [], o = [], l = [];
        for (let a of i) {
          let h = this.specs.indexOf(a), c;
          h < 0 ? (c = a(n.view), l.push(c)) : (c = this.panels[h], c.update && c.update(n)), s.push(c), (c.top ? r : o).push(c);
        }
        this.specs = i, this.panels = s, this.top.sync(r), this.bottom.sync(o);
        for (let a of l) a.dom.classList.add("cm-panel"), a.mount && a.mount();
      } else for (let i of this.panels) i.update && i.update(n);
    }
    destroy() {
      this.top.sync([]), this.bottom.sync([]);
    }
  }, {
    provide: (n) => E.scrollMargins.of((e) => {
      let t = e.plugin(n);
      return t && {
        top: t.top.scrollMargin(),
        bottom: t.bottom.scrollMargin()
      };
    })
  });
  class Ds {
    constructor(e, t, i) {
      this.view = e, this.top = t, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
    }
    sync(e) {
      for (let t of this.panels) t.destroy && e.indexOf(t) < 0 && t.destroy();
      this.panels = e, this.syncDOM();
    }
    syncDOM() {
      if (this.panels.length == 0) {
        this.dom && (this.dom.remove(), this.dom = void 0);
        return;
      }
      if (!this.dom) {
        this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
        let t = this.container || this.view.dom;
        t.insertBefore(this.dom, this.top ? t.firstChild : null);
      }
      let e = this.dom.firstChild;
      for (let t of this.panels) if (t.dom.parentNode == this.dom) {
        for (; e != t.dom; ) e = Bh(e);
        e = e.nextSibling;
      } else this.dom.insertBefore(t.dom, e);
      for (; e; ) e = Bh(e);
    }
    scrollMargin() {
      return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
    }
    syncClasses() {
      if (!(!this.container || this.classes == this.view.themeClasses)) {
        for (let e of this.classes.split(" ")) e && this.container.classList.remove(e);
        for (let e of (this.classes = this.view.themeClasses).split(" ")) e && this.container.classList.add(e);
      }
    }
  }
  function Bh(n) {
    let e = n.nextSibling;
    return n.remove(), e;
  }
  const Vn = B.define({
    enables: pu
  });
  class Jt extends _i {
    compare(e) {
      return this == e || this.constructor == e.constructor && this.eq(e);
    }
    eq(e) {
      return false;
    }
    destroy(e) {
    }
  }
  Jt.prototype.elementClass = "";
  Jt.prototype.toDOM = void 0;
  Jt.prototype.mapMode = Ye.TrackBefore;
  Jt.prototype.startSide = Jt.prototype.endSide = -1;
  Jt.prototype.point = true;
  const Ys = B.define(), Cb = B.define(), Ab = {
    class: "",
    renderEmptyElements: false,
    elementStyle: "",
    markers: () => re.empty,
    lineMarker: () => null,
    widgetMarker: () => null,
    lineMarkerChange: null,
    initialSpacer: null,
    updateSpacer: null,
    domEventHandlers: {}
  }, Rn = B.define();
  function Mb(n) {
    return [
      gu(),
      Rn.of({
        ...Ab,
        ...n
      })
    ];
  }
  const Lh = B.define({
    combine: (n) => n.some((e) => e)
  });
  function gu(n) {
    return [
      Tb
    ];
  }
  const Tb = Oe.fromClass(class {
    constructor(n) {
      this.view = n, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(Rn).map((e) => new Nh(n, e));
      for (let e of this.gutters) this.dom.appendChild(e.dom);
      this.fixed = !n.state.facet(Lh), this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(false), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
    }
    update(n) {
      if (this.updateGutters(n)) {
        let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
        this.syncGutters(i < (t.to - t.from) * 0.8);
      }
      n.geometryChanged && (this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px"), this.view.state.facet(Lh) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : ""), this.prevViewport = n.view.viewport;
    }
    syncGutters(n) {
      let e = this.dom.nextSibling;
      n && this.dom.remove();
      let t = re.iter(this.view.state.facet(Ys), this.view.viewport.from), i = [], s = this.gutters.map((r) => new Pb(r, this.view.viewport, -this.view.documentPadding.top));
      for (let r of this.view.viewportLineBlocks) if (i.length && (i = []), Array.isArray(r.type)) {
        let o = true;
        for (let l of r.type) if (l.type == Je.Text && o) {
          cl(t, i, l.from);
          for (let a of s) a.line(this.view, l, i);
          o = false;
        } else if (l.widget) for (let a of s) a.widget(this.view, l);
      } else if (r.type == Je.Text) {
        cl(t, i, r.from);
        for (let o of s) o.line(this.view, r, i);
      } else if (r.widget) for (let o of s) o.widget(this.view, r);
      for (let r of s) r.finish();
      n && this.view.scrollDOM.insertBefore(this.dom, e);
    }
    updateGutters(n) {
      let e = n.startState.facet(Rn), t = n.state.facet(Rn), i = n.docChanged || n.heightChanged || n.viewportChanged || !re.eq(n.startState.facet(Ys), n.state.facet(Ys), n.view.viewport.from, n.view.viewport.to);
      if (e == t) for (let s of this.gutters) s.update(n) && (i = true);
      else {
        i = true;
        let s = [];
        for (let r of t) {
          let o = e.indexOf(r);
          o < 0 ? s.push(new Nh(this.view, r)) : (this.gutters[o].update(n), s.push(this.gutters[o]));
        }
        for (let r of this.gutters) r.dom.remove(), s.indexOf(r) < 0 && r.destroy();
        for (let r of s) this.dom.appendChild(r.dom);
        this.gutters = s;
      }
      return i;
    }
    destroy() {
      for (let n of this.gutters) n.destroy();
      this.dom.remove();
    }
  }, {
    provide: (n) => E.scrollMargins.of((e) => {
      let t = e.plugin(n);
      return !t || t.gutters.length == 0 || !t.fixed ? null : e.textDirection == ge.LTR ? {
        left: t.dom.offsetWidth * e.scaleX
      } : {
        right: t.dom.offsetWidth * e.scaleX
      };
    })
  });
  function _h(n) {
    return Array.isArray(n) ? n : [
      n
    ];
  }
  function cl(n, e, t) {
    for (; n.value && n.from <= t; ) n.from == t && e.push(n.value), n.next();
  }
  class Pb {
    constructor(e, t, i) {
      this.gutter = e, this.height = i, this.i = 0, this.cursor = re.iter(e.markers, t.from);
    }
    addElement(e, t, i) {
      let { gutter: s } = this, r = (t.top - this.height) / e.scaleY, o = t.height / e.scaleY;
      if (this.i == s.elements.length) {
        let l = new mu(e, o, r, i);
        s.elements.push(l), s.dom.appendChild(l.dom);
      } else s.elements[this.i].update(e, o, r, i);
      this.height = t.bottom, this.i++;
    }
    line(e, t, i) {
      let s = [];
      cl(this.cursor, s, t.from), i.length && (s = s.concat(i));
      let r = this.gutter.config.lineMarker(e, t, s);
      r && s.unshift(r);
      let o = this.gutter;
      s.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, s);
    }
    widget(e, t) {
      let i = this.gutter.config.widgetMarker(e, t.widget, t), s = i ? [
        i
      ] : null;
      for (let r of e.state.facet(Cb)) {
        let o = r(e, t.widget, t);
        o && (s || (s = [])).push(o);
      }
      s && this.addElement(e, t, s);
    }
    finish() {
      let e = this.gutter;
      for (; e.elements.length > this.i; ) {
        let t = e.elements.pop();
        e.dom.removeChild(t.dom), t.destroy();
      }
    }
  }
  class Nh {
    constructor(e, t) {
      this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
      for (let i in t.domEventHandlers) this.dom.addEventListener(i, (s) => {
        let r = s.target, o;
        if (r != this.dom && this.dom.contains(r)) {
          for (; r.parentNode != this.dom; ) r = r.parentNode;
          let a = r.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else o = s.clientY;
        let l = e.lineBlockAtHeight(o - e.documentTop);
        t.domEventHandlers[i](e, l, s) && s.preventDefault();
      });
      this.markers = _h(t.markers(e)), t.initialSpacer && (this.spacer = new mu(e, 0, 0, [
        t.initialSpacer(e)
      ]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
    }
    update(e) {
      let t = this.markers;
      if (this.markers = _h(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
        let s = this.config.updateSpacer(this.spacer.markers[0], e);
        s != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [
          s
        ]);
      }
      let i = e.view.viewport;
      return !re.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : false);
    }
    destroy() {
      for (let e of this.elements) e.destroy();
    }
  }
  class mu {
    constructor(e, t, i, s) {
      this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, s);
    }
    update(e, t, i, s) {
      this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Db(this.markers, s) || this.setMarkers(e, s);
    }
    setMarkers(e, t) {
      let i = "cm-gutterElement", s = this.dom.firstChild;
      for (let r = 0, o = 0; ; ) {
        let l = o, a = r < t.length ? t[r++] : null, h = false;
        if (a) {
          let c = a.elementClass;
          c && (i += " " + c);
          for (let f = o; f < this.markers.length; f++) if (this.markers[f].compare(a)) {
            l = f, h = true;
            break;
          }
        } else l = this.markers.length;
        for (; o < l; ) {
          let c = this.markers[o++];
          if (c.toDOM) {
            c.destroy(s);
            let f = s.nextSibling;
            s.remove(), s = f;
          }
        }
        if (!a) break;
        a.toDOM && (h ? s = s.nextSibling : this.dom.insertBefore(a.toDOM(e), s)), h && o++;
      }
      this.dom.className = i, this.markers = t;
    }
    destroy() {
      this.setMarkers(null, []);
    }
  }
  function Db(n, e) {
    if (n.length != e.length) return false;
    for (let t = 0; t < n.length; t++) if (!n[t].compare(e[t])) return false;
    return true;
  }
  const Rb = B.define(), Eb = B.define(), ji = B.define({
    combine(n) {
      return zt(n, {
        formatNumber: String,
        domEventHandlers: {}
      }, {
        domEventHandlers(e, t) {
          let i = Object.assign({}, e);
          for (let s in t) {
            let r = i[s], o = t[s];
            i[s] = r ? (l, a, h) => r(l, a, h) || o(l, a, h) : o;
          }
          return i;
        }
      });
    }
  });
  class ho extends Jt {
    constructor(e) {
      super(), this.number = e;
    }
    eq(e) {
      return this.number == e.number;
    }
    toDOM() {
      return document.createTextNode(this.number);
    }
  }
  function co(n, e) {
    return n.state.facet(ji).formatNumber(e, n.state);
  }
  const Bb = Rn.compute([
    ji
  ], (n) => ({
    class: "cm-lineNumbers",
    renderEmptyElements: false,
    markers(e) {
      return e.state.facet(Rb);
    },
    lineMarker(e, t, i) {
      return i.some((s) => s.toDOM) ? null : new ho(co(e, e.state.doc.lineAt(t.from).number));
    },
    widgetMarker: (e, t, i) => {
      for (let s of e.state.facet(Eb)) {
        let r = s(e, t, i);
        if (r) return r;
      }
      return null;
    },
    lineMarkerChange: (e) => e.startState.facet(ji) != e.state.facet(ji),
    initialSpacer(e) {
      return new ho(co(e, Ih(e.state.doc.lines)));
    },
    updateSpacer(e, t) {
      let i = co(t.view, Ih(t.view.state.doc.lines));
      return i == e.number ? e : new ho(i);
    },
    domEventHandlers: n.facet(ji).domEventHandlers
  }));
  function Lb(n = {}) {
    return [
      ji.of(n),
      gu(),
      Bb
    ];
  }
  function Ih(n) {
    let e = 9;
    for (; e < n; ) e = e * 10 + 9;
    return e;
  }
  const _b = new class extends Jt {
    constructor() {
      super(...arguments), this.elementClass = "cm-activeLineGutter";
    }
  }(), Nb = Ys.compute([
    "selection"
  ], (n) => {
    let e = [], t = -1;
    for (let i of n.selection.ranges) {
      let s = n.doc.lineAt(i.head).from;
      s > t && (t = s, e.push(_b.range(s)));
    }
    return re.of(e);
  });
  function Ib() {
    return Nb;
  }
  const bu = 1024;
  let Fb = 0;
  class fo {
    constructor(e, t) {
      this.from = e, this.to = t;
    }
  }
  class Y {
    constructor(e = {}) {
      this.id = Fb++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
        throw new Error("This node type doesn't define a deserialize function");
      });
    }
    add(e) {
      if (this.perNode) throw new RangeError("Can't add per-node props to node types");
      return typeof e != "function" && (e = ot.match(e)), (t) => {
        let i = e(t);
        return i === void 0 ? null : [
          this,
          i
        ];
      };
    }
  }
  Y.closedBy = new Y({
    deserialize: (n) => n.split(" ")
  });
  Y.openedBy = new Y({
    deserialize: (n) => n.split(" ")
  });
  Y.group = new Y({
    deserialize: (n) => n.split(" ")
  });
  Y.isolate = new Y({
    deserialize: (n) => {
      if (n && n != "rtl" && n != "ltr" && n != "auto") throw new RangeError("Invalid value for isolate: " + n);
      return n || "auto";
    }
  });
  Y.contextHash = new Y({
    perNode: true
  });
  Y.lookAhead = new Y({
    perNode: true
  });
  Y.mounted = new Y({
    perNode: true
  });
  class hr {
    constructor(e, t, i) {
      this.tree = e, this.overlay = t, this.parser = i;
    }
    static get(e) {
      return e && e.props && e.props[Y.mounted.id];
    }
  }
  const Hb = /* @__PURE__ */ Object.create(null);
  class ot {
    constructor(e, t, i, s = 0) {
      this.name = e, this.props = t, this.id = i, this.flags = s;
    }
    static define(e) {
      let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Hb, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new ot(e.name || "", t, e.id, i);
      if (e.props) {
        for (let r of e.props) if (Array.isArray(r) || (r = r(s)), r) {
          if (r[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
          t[r[0].id] = r[1];
        }
      }
      return s;
    }
    prop(e) {
      return this.props[e.id];
    }
    get isTop() {
      return (this.flags & 1) > 0;
    }
    get isSkipped() {
      return (this.flags & 2) > 0;
    }
    get isError() {
      return (this.flags & 4) > 0;
    }
    get isAnonymous() {
      return (this.flags & 8) > 0;
    }
    is(e) {
      if (typeof e == "string") {
        if (this.name == e) return true;
        let t = this.prop(Y.group);
        return t ? t.indexOf(e) > -1 : false;
      }
      return this.id == e;
    }
    static match(e) {
      let t = /* @__PURE__ */ Object.create(null);
      for (let i in e) for (let s of i.split(" ")) t[s] = e[i];
      return (i) => {
        for (let s = i.prop(Y.group), r = -1; r < (s ? s.length : 0); r++) {
          let o = t[r < 0 ? i.name : s[r]];
          if (o) return o;
        }
      };
    }
  }
  ot.none = new ot("", /* @__PURE__ */ Object.create(null), 0, 8);
  class jl {
    constructor(e) {
      this.types = e;
      for (let t = 0; t < e.length; t++) if (e[t].id != t) throw new RangeError("Node type ids should correspond to array positions when creating a node set");
    }
    extend(...e) {
      let t = [];
      for (let i of this.types) {
        let s = null;
        for (let r of e) {
          let o = r(i);
          o && (s || (s = Object.assign({}, i.props)), s[o[0].id] = o[1]);
        }
        t.push(s ? new ot(i.name, s, i.id, i.flags) : i);
      }
      return new jl(t);
    }
  }
  const Rs = /* @__PURE__ */ new WeakMap(), Fh = /* @__PURE__ */ new WeakMap();
  var _e;
  (function(n) {
    n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays";
  })(_e || (_e = {}));
  class Me {
    constructor(e, t, i, s, r) {
      if (this.type = e, this.children = t, this.positions = i, this.length = s, this.props = null, r && r.length) {
        this.props = /* @__PURE__ */ Object.create(null);
        for (let [o, l] of r) this.props[typeof o == "number" ? o : o.id] = l;
      }
    }
    toString() {
      let e = hr.get(this);
      if (e && !e.overlay) return e.tree.toString();
      let t = "";
      for (let i of this.children) {
        let s = i.toString();
        s && (t && (t += ","), t += s);
      }
      return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
    }
    cursor(e = 0) {
      return new ul(this.topNode, e);
    }
    cursorAt(e, t = 0, i = 0) {
      let s = Rs.get(this) || this.topNode, r = new ul(s);
      return r.moveTo(e, t), Rs.set(this, r._tree), r;
    }
    get topNode() {
      return new bt(this, 0, 0, null);
    }
    resolve(e, t = 0) {
      let i = Qn(Rs.get(this) || this.topNode, e, t, false);
      return Rs.set(this, i), i;
    }
    resolveInner(e, t = 0) {
      let i = Qn(Fh.get(this) || this.topNode, e, t, true);
      return Fh.set(this, i), i;
    }
    resolveStack(e, t = 0) {
      return Vb(this, e, t);
    }
    iterate(e) {
      let { enter: t, leave: i, from: s = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & _e.IncludeAnonymous) > 0;
      for (let a = this.cursor(o | _e.IncludeAnonymous); ; ) {
        let h = false;
        if (a.from <= r && a.to >= s && (!l && a.type.isAnonymous || t(a) !== false)) {
          if (a.firstChild()) continue;
          h = true;
        }
        for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
          if (!a.parent()) return;
          h = true;
        }
      }
    }
    prop(e) {
      return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
    }
    get propValues() {
      let e = [];
      if (this.props) for (let t in this.props) e.push([
        +t,
        this.props[t]
      ]);
      return e;
    }
    balance(e = {}) {
      return this.children.length <= 8 ? this : Yl(ot.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, s) => new Me(this.type, t, i, s, this.propValues), e.makeTree || ((t, i, s) => new Me(ot.none, t, i, s)));
    }
    static build(e) {
      return Qb(e);
    }
  }
  Me.empty = new Me(ot.none, [], [], 0);
  class Kl {
    constructor(e, t) {
      this.buffer = e, this.index = t;
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    get pos() {
      return this.index;
    }
    next() {
      this.index -= 4;
    }
    fork() {
      return new Kl(this.buffer, this.index);
    }
  }
  class xi {
    constructor(e, t, i) {
      this.buffer = e, this.length = t, this.set = i;
    }
    get type() {
      return ot.none;
    }
    toString() {
      let e = [];
      for (let t = 0; t < this.buffer.length; ) e.push(this.childString(t)), t = this.buffer[t + 3];
      return e.join(",");
    }
    childString(e) {
      let t = this.buffer[e], i = this.buffer[e + 3], s = this.set.types[t], r = s.name;
      if (/\W/.test(r) && !s.isError && (r = JSON.stringify(r)), e += 4, i == e) return r;
      let o = [];
      for (; e < i; ) o.push(this.childString(e)), e = this.buffer[e + 3];
      return r + "(" + o.join(",") + ")";
    }
    findChild(e, t, i, s, r) {
      let { buffer: o } = this, l = -1;
      for (let a = e; a != t && !(yu(r, s, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3]) ;
      return l;
    }
    slice(e, t, i) {
      let s = this.buffer, r = new Uint16Array(t - e), o = 0;
      for (let l = e, a = 0; l < t; ) {
        r[a++] = s[l++], r[a++] = s[l++] - i;
        let h = r[a++] = s[l++] - i;
        r[a++] = s[l++] - e, o = Math.max(o, h);
      }
      return new xi(r, o, this.set);
    }
  }
  function yu(n, e, t, i) {
    switch (n) {
      case -2:
        return t < e;
      case -1:
        return i >= e && t < e;
      case 0:
        return t < e && i > e;
      case 1:
        return t <= e && i > e;
      case 2:
        return i > e;
      case 4:
        return true;
    }
  }
  function Qn(n, e, t, i) {
    for (var s; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
      let o = !i && n instanceof bt && n.index < 0 ? null : n.parent;
      if (!o) return n;
      n = o;
    }
    let r = i ? 0 : _e.IgnoreOverlays;
    if (i) for (let o = n, l = o.parent; l; o = l, l = o.parent) o instanceof bt && o.index < 0 && ((s = l.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (n = l);
    for (; ; ) {
      let o = n.enter(e, t, r);
      if (!o) return n;
      n = o;
    }
  }
  class xu {
    cursor(e = 0) {
      return new ul(this, e);
    }
    getChild(e, t = null, i = null) {
      let s = Hh(this, e, t, i);
      return s.length ? s[0] : null;
    }
    getChildren(e, t = null, i = null) {
      return Hh(this, e, t, i);
    }
    resolve(e, t = 0) {
      return Qn(this, e, t, false);
    }
    resolveInner(e, t = 0) {
      return Qn(this, e, t, true);
    }
    matchContext(e) {
      return fl(this.parent, e);
    }
    enterUnfinishedNodesBefore(e) {
      let t = this.childBefore(e), i = this;
      for (; t; ) {
        let s = t.lastChild;
        if (!s || s.to != t.to) break;
        s.type.isError && s.from == s.to ? (i = t, t = s.prevSibling) : t = s;
      }
      return i;
    }
    get node() {
      return this;
    }
    get next() {
      return this.parent;
    }
  }
  class bt extends xu {
    constructor(e, t, i, s) {
      super(), this._tree = e, this.from = t, this.index = i, this._parent = s;
    }
    get type() {
      return this._tree.type;
    }
    get name() {
      return this._tree.type.name;
    }
    get to() {
      return this.from + this._tree.length;
    }
    nextChild(e, t, i, s, r = 0) {
      for (let o = this; ; ) {
        for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
          let c = l[e], f = a[e] + o.from;
          if (yu(s, i, f, f + c.length)) {
            if (c instanceof xi) {
              if (r & _e.ExcludeBuffers) continue;
              let u = c.findChild(0, c.buffer.length, t, i - f, s);
              if (u > -1) return new pi(new Wb(o, c, e, f), null, u);
            } else if (r & _e.IncludeAnonymous || !c.type.isAnonymous || Gl(c)) {
              let u;
              if (!(r & _e.IgnoreMounts) && (u = hr.get(c)) && !u.overlay) return new bt(u.tree, f, e, o);
              let d = new bt(c, f, e, o);
              return r & _e.IncludeAnonymous || !d.type.isAnonymous ? d : d.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, s);
            }
          }
        }
        if (r & _e.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o)) return null;
      }
    }
    get firstChild() {
      return this.nextChild(0, 1, 0, 4);
    }
    get lastChild() {
      return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
    }
    childAfter(e) {
      return this.nextChild(0, 1, e, 2);
    }
    childBefore(e) {
      return this.nextChild(this._tree.children.length - 1, -1, e, -2);
    }
    enter(e, t, i = 0) {
      let s;
      if (!(i & _e.IgnoreOverlays) && (s = hr.get(this._tree)) && s.overlay) {
        let r = e - this.from;
        for (let { from: o, to: l } of s.overlay) if ((t > 0 ? o <= r : o < r) && (t < 0 ? l >= r : l > r)) return new bt(s.tree, s.overlay[0].from + this.from, -1, this);
      }
      return this.nextChild(0, 1, e, t, i);
    }
    nextSignificantParent() {
      let e = this;
      for (; e.type.isAnonymous && e._parent; ) e = e._parent;
      return e;
    }
    get parent() {
      return this._parent ? this._parent.nextSignificantParent() : null;
    }
    get nextSibling() {
      return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
    }
    get prevSibling() {
      return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
    }
    get tree() {
      return this._tree;
    }
    toTree() {
      return this._tree;
    }
    toString() {
      return this._tree.toString();
    }
  }
  function Hh(n, e, t, i) {
    let s = n.cursor(), r = [];
    if (!s.firstChild()) return r;
    if (t != null) {
      for (let o = false; !o; ) if (o = s.type.is(t), !s.nextSibling()) return r;
    }
    for (; ; ) {
      if (i != null && s.type.is(i)) return r;
      if (s.type.is(e) && r.push(s.node), !s.nextSibling()) return i == null ? r : [];
    }
  }
  function fl(n, e, t = e.length - 1) {
    for (let i = n; t >= 0; i = i.parent) {
      if (!i) return false;
      if (!i.type.isAnonymous) {
        if (e[t] && e[t] != i.name) return false;
        t--;
      }
    }
    return true;
  }
  class Wb {
    constructor(e, t, i, s) {
      this.parent = e, this.buffer = t, this.index = i, this.start = s;
    }
  }
  class pi extends xu {
    get name() {
      return this.type.name;
    }
    get from() {
      return this.context.start + this.context.buffer.buffer[this.index + 1];
    }
    get to() {
      return this.context.start + this.context.buffer.buffer[this.index + 2];
    }
    constructor(e, t, i) {
      super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
    }
    child(e, t, i) {
      let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.context.start, i);
      return r < 0 ? null : new pi(this.context, this, r);
    }
    get firstChild() {
      return this.child(1, 0, 4);
    }
    get lastChild() {
      return this.child(-1, 0, 4);
    }
    childAfter(e) {
      return this.child(1, e, 2);
    }
    childBefore(e) {
      return this.child(-1, e, -2);
    }
    enter(e, t, i = 0) {
      if (i & _e.ExcludeBuffers) return null;
      let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
      return r < 0 ? null : new pi(this.context, this, r);
    }
    get parent() {
      return this._parent || this.context.parent.nextSignificantParent();
    }
    externalSibling(e) {
      return this._parent ? null : this.context.parent.nextChild(this.context.index + e, e, 0, 4);
    }
    get nextSibling() {
      let { buffer: e } = this.context, t = e.buffer[this.index + 3];
      return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new pi(this.context, this._parent, t) : this.externalSibling(1);
    }
    get prevSibling() {
      let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
      return this.index == t ? this.externalSibling(-1) : new pi(this.context, this._parent, e.findChild(t, this.index, -1, 0, 4));
    }
    get tree() {
      return null;
    }
    toTree() {
      let e = [], t = [], { buffer: i } = this.context, s = this.index + 4, r = i.buffer[this.index + 3];
      if (r > s) {
        let o = i.buffer[this.index + 1];
        e.push(i.slice(s, r, o)), t.push(0);
      }
      return new Me(this.type, e, t, this.to - this.from);
    }
    toString() {
      return this.context.buffer.childString(this.index);
    }
  }
  function wu(n) {
    if (!n.length) return null;
    let e = 0, t = n[0];
    for (let r = 1; r < n.length; r++) {
      let o = n[r];
      (o.from > t.from || o.to < t.to) && (t = o, e = r);
    }
    let i = t instanceof bt && t.index < 0 ? null : t.parent, s = n.slice();
    return i ? s[e] = i : s.splice(e, 1), new zb(s, t);
  }
  class zb {
    constructor(e, t) {
      this.heads = e, this.node = t;
    }
    get next() {
      return wu(this.heads);
    }
  }
  function Vb(n, e, t) {
    let i = n.resolveInner(e, t), s = null;
    for (let r = i instanceof bt ? i : i.context.parent; r; r = r.parent) if (r.index < 0) {
      let o = r.parent;
      (s || (s = [
        i
      ])).push(o.resolve(e, t)), r = o;
    } else {
      let o = hr.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new bt(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [
          i
        ])).push(Qn(l, e, t, false));
      }
    }
    return s ? wu(s) : i;
  }
  class ul {
    get name() {
      return this.type.name;
    }
    constructor(e, t = 0) {
      if (this.mode = t, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, e instanceof bt) this.yieldNode(e);
      else {
        this._tree = e.context.parent, this.buffer = e.context;
        for (let i = e._parent; i; i = i._parent) this.stack.unshift(i.index);
        this.bufferNode = e, this.yieldBuf(e.index);
      }
    }
    yieldNode(e) {
      return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, true) : false;
    }
    yieldBuf(e, t) {
      this.index = e;
      let { start: i, buffer: s } = this.buffer;
      return this.type = t || s.set.types[s.buffer[e]], this.from = i + s.buffer[e + 1], this.to = i + s.buffer[e + 2], true;
    }
    yield(e) {
      return e ? e instanceof bt ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : false;
    }
    toString() {
      return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
    }
    enterChild(e, t, i) {
      if (!this.buffer) return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
      let { buffer: s } = this.buffer, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.buffer.start, i);
      return r < 0 ? false : (this.stack.push(this.index), this.yieldBuf(r));
    }
    firstChild() {
      return this.enterChild(1, 0, 4);
    }
    lastChild() {
      return this.enterChild(-1, 0, 4);
    }
    childAfter(e) {
      return this.enterChild(1, e, 2);
    }
    childBefore(e) {
      return this.enterChild(-1, e, -2);
    }
    enter(e, t, i = this.mode) {
      return this.buffer ? i & _e.ExcludeBuffers ? false : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
    }
    parent() {
      if (!this.buffer) return this.yieldNode(this.mode & _e.IncludeAnonymous ? this._tree._parent : this._tree.parent);
      if (this.stack.length) return this.yieldBuf(this.stack.pop());
      let e = this.mode & _e.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
      return this.buffer = null, this.yieldNode(e);
    }
    sibling(e) {
      if (!this.buffer) return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : false;
      let { buffer: t } = this.buffer, i = this.stack.length - 1;
      if (e < 0) {
        let s = i < 0 ? 0 : this.stack[i] + 4;
        if (this.index != s) return this.yieldBuf(t.findChild(s, this.index, -1, 0, 4));
      } else {
        let s = t.buffer[this.index + 3];
        if (s < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3])) return this.yieldBuf(s);
      }
      return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : false;
    }
    nextSibling() {
      return this.sibling(1);
    }
    prevSibling() {
      return this.sibling(-1);
    }
    atLastNode(e) {
      let t, i, { buffer: s } = this;
      if (s) {
        if (e > 0) {
          if (this.index < s.buffer.buffer.length) return false;
        } else for (let r = 0; r < this.index; r++) if (s.buffer.buffer[r + 3] < this.index) return false;
        ({ index: t, parent: i } = s);
      } else ({ index: t, _parent: i } = this._tree);
      for (; i; { index: t, _parent: i } = i) if (t > -1) for (let r = t + e, o = e < 0 ? -1 : i._tree.children.length; r != o; r += e) {
        let l = i._tree.children[r];
        if (this.mode & _e.IncludeAnonymous || l instanceof xi || !l.type.isAnonymous || Gl(l)) return false;
      }
      return true;
    }
    move(e, t) {
      if (t && this.enterChild(e, 0, 4)) return true;
      for (; ; ) {
        if (this.sibling(e)) return true;
        if (this.atLastNode(e) || !this.parent()) return false;
      }
    }
    next(e = true) {
      return this.move(1, e);
    }
    prev(e = true) {
      return this.move(-1, e);
    }
    moveTo(e, t = 0) {
      for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); ) ;
      for (; this.enterChild(1, e, t); ) ;
      return this;
    }
    get node() {
      if (!this.buffer) return this._tree;
      let e = this.bufferNode, t = null, i = 0;
      if (e && e.context == this.buffer) e: for (let s = this.index, r = this.stack.length; r >= 0; ) {
        for (let o = e; o; o = o._parent) if (o.index == s) {
          if (s == this.index) return o;
          t = o, i = r + 1;
          break e;
        }
        s = this.stack[--r];
      }
      for (let s = i; s < this.stack.length; s++) t = new pi(this.buffer, t, this.stack[s]);
      return this.bufferNode = new pi(this.buffer, t, this.index);
    }
    get tree() {
      return this.buffer ? null : this._tree._tree;
    }
    iterate(e, t) {
      for (let i = 0; ; ) {
        let s = false;
        if (this.type.isAnonymous || e(this) !== false) {
          if (this.firstChild()) {
            i++;
            continue;
          }
          this.type.isAnonymous || (s = true);
        }
        for (; ; ) {
          if (s && t && t(this), s = this.type.isAnonymous, !i) return;
          if (this.nextSibling()) break;
          this.parent(), i--, s = true;
        }
      }
    }
    matchContext(e) {
      if (!this.buffer) return fl(this.node.parent, e);
      let { buffer: t } = this.buffer, { types: i } = t.set;
      for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
        if (r < 0) return fl(this._tree, e, s);
        let o = i[t.buffer[this.stack[r]]];
        if (!o.isAnonymous) {
          if (e[s] && e[s] != o.name) return false;
          s--;
        }
      }
      return true;
    }
  }
  function Gl(n) {
    return n.children.some((e) => e instanceof xi || !e.type.isAnonymous || Gl(e));
  }
  function Qb(n) {
    var e;
    let { buffer: t, nodeSet: i, maxBufferLength: s = bu, reused: r = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new Kl(t, t.length) : t, a = i.types, h = 0, c = 0;
    function f(w, O, M, W, U, te) {
      let { id: V, start: I, end: J, size: Q } = l, ne = c, xe = h;
      for (; Q < 0; ) if (l.next(), Q == -1) {
        let Z = r[V];
        M.push(Z), W.push(I - w);
        return;
      } else if (Q == -3) {
        h = V;
        return;
      } else if (Q == -4) {
        c = V;
        return;
      } else throw new RangeError(`Unrecognized record size: ${Q}`);
      let be = a[V], Te, ye, Ee = I - w;
      if (J - I <= s && (ye = b(l.pos - O, U))) {
        let Z = new Uint16Array(ye.size - ye.skip), se = l.pos - ye.size, fe = Z.length;
        for (; l.pos > se; ) fe = y(ye.start, Z, fe);
        Te = new xi(Z, J - ye.start, i), Ee = ye.start - w;
      } else {
        let Z = l.pos - Q;
        l.next();
        let se = [], fe = [], qe = V >= o ? V : -1, lt = 0, At = J;
        for (; l.pos > Z; ) qe >= 0 && l.id == qe && l.size >= 0 ? (l.end <= At - s && (p(se, fe, I, lt, l.end, At, qe, ne, xe), lt = se.length, At = l.end), l.next()) : te > 2500 ? u(I, Z, se, fe) : f(I, Z, se, fe, qe, te + 1);
        if (qe >= 0 && lt > 0 && lt < se.length && p(se, fe, I, lt, I, At, qe, ne, xe), se.reverse(), fe.reverse(), qe > -1 && lt > 0) {
          let ii = d(be, xe);
          Te = Yl(be, se, fe, 0, se.length, 0, J - I, ii, ii);
        } else Te = g(be, se, fe, J - I, ne - J, xe);
      }
      M.push(Te), W.push(Ee);
    }
    function u(w, O, M, W) {
      let U = [], te = 0, V = -1;
      for (; l.pos > O; ) {
        let { id: I, start: J, end: Q, size: ne } = l;
        if (ne > 4) l.next();
        else {
          if (V > -1 && J < V) break;
          V < 0 && (V = Q - s), U.push(I, J, Q), te++, l.next();
        }
      }
      if (te) {
        let I = new Uint16Array(te * 4), J = U[U.length - 2];
        for (let Q = U.length - 3, ne = 0; Q >= 0; Q -= 3) I[ne++] = U[Q], I[ne++] = U[Q + 1] - J, I[ne++] = U[Q + 2] - J, I[ne++] = ne;
        M.push(new xi(I, U[2] - J, i)), W.push(J - w);
      }
    }
    function d(w, O) {
      return (M, W, U) => {
        let te = 0, V = M.length - 1, I, J;
        if (V >= 0 && (I = M[V]) instanceof Me) {
          if (!V && I.type == w && I.length == U) return I;
          (J = I.prop(Y.lookAhead)) && (te = W[V] + I.length + J);
        }
        return g(w, M, W, U, te, O);
      };
    }
    function p(w, O, M, W, U, te, V, I, J) {
      let Q = [], ne = [];
      for (; w.length > W; ) Q.push(w.pop()), ne.push(O.pop() + M - U);
      w.push(g(i.types[V], Q, ne, te - U, I - te, J)), O.push(U - M);
    }
    function g(w, O, M, W, U, te, V) {
      if (te) {
        let I = [
          Y.contextHash,
          te
        ];
        V = V ? [
          I
        ].concat(V) : [
          I
        ];
      }
      if (U > 25) {
        let I = [
          Y.lookAhead,
          U
        ];
        V = V ? [
          I
        ].concat(V) : [
          I
        ];
      }
      return new Me(w, O, M, W, V);
    }
    function b(w, O) {
      let M = l.fork(), W = 0, U = 0, te = 0, V = M.end - s, I = {
        size: 0,
        start: 0,
        skip: 0
      };
      e: for (let J = M.pos - w; M.pos > J; ) {
        let Q = M.size;
        if (M.id == O && Q >= 0) {
          I.size = W, I.start = U, I.skip = te, te += 4, W += 4, M.next();
          continue;
        }
        let ne = M.pos - Q;
        if (Q < 0 || ne < J || M.start < V) break;
        let xe = M.id >= o ? 4 : 0, be = M.start;
        for (M.next(); M.pos > ne; ) {
          if (M.size < 0) if (M.size == -3) xe += 4;
          else break e;
          else M.id >= o && (xe += 4);
          M.next();
        }
        U = be, W += Q, te += xe;
      }
      return (O < 0 || W == w) && (I.size = W, I.start = U, I.skip = te), I.size > 4 ? I : void 0;
    }
    function y(w, O, M) {
      let { id: W, start: U, end: te, size: V } = l;
      if (l.next(), V >= 0 && W < o) {
        let I = M;
        if (V > 4) {
          let J = l.pos - (V - 4);
          for (; l.pos > J; ) M = y(w, O, M);
        }
        O[--M] = I, O[--M] = te - w, O[--M] = U - w, O[--M] = W;
      } else V == -3 ? h = W : V == -4 && (c = W);
      return M;
    }
    let S = [], A = [];
    for (; l.pos > 0; ) f(n.start || 0, n.bufferStart || 0, S, A, -1, 0);
    let C = (e = n.length) !== null && e !== void 0 ? e : S.length ? A[0] + S[0].length : 0;
    return new Me(a[n.topID], S.reverse(), A.reverse(), C);
  }
  const Wh = /* @__PURE__ */ new WeakMap();
  function Js(n, e) {
    if (!n.isAnonymous || e instanceof xi || e.type != n) return 1;
    let t = Wh.get(e);
    if (t == null) {
      t = 1;
      for (let i of e.children) {
        if (i.type != n || !(i instanceof Me)) {
          t = 1;
          break;
        }
        t += Js(n, i);
      }
      Wh.set(e, t);
    }
    return t;
  }
  function Yl(n, e, t, i, s, r, o, l, a) {
    let h = 0;
    for (let p = i; p < s; p++) h += Js(n, e[p]);
    let c = Math.ceil(h * 1.5 / 8), f = [], u = [];
    function d(p, g, b, y, S) {
      for (let A = b; A < y; ) {
        let C = A, w = g[A], O = Js(n, p[A]);
        for (A++; A < y; A++) {
          let M = Js(n, p[A]);
          if (O + M >= c) break;
          O += M;
        }
        if (A == C + 1) {
          if (O > c) {
            let M = p[C];
            d(M.children, M.positions, 0, M.children.length, g[C] + S);
            continue;
          }
          f.push(p[C]);
        } else {
          let M = g[A - 1] + p[A - 1].length - w;
          f.push(Yl(n, p, g, C, A, w, M, null, a));
        }
        u.push(w + S - r);
      }
    }
    return d(e, t, i, s, 0), (l || a)(f, u, o);
  }
  class Ei {
    constructor(e, t, i, s, r = false, o = false) {
      this.from = e, this.to = t, this.tree = i, this.offset = s, this.open = (r ? 1 : 0) | (o ? 2 : 0);
    }
    get openStart() {
      return (this.open & 1) > 0;
    }
    get openEnd() {
      return (this.open & 2) > 0;
    }
    static addTree(e, t = [], i = false) {
      let s = [
        new Ei(0, e.length, e, 0, false, i)
      ];
      for (let r of t) r.to > e.length && s.push(r);
      return s;
    }
    static applyChanges(e, t, i = 128) {
      if (!t.length) return e;
      let s = [], r = 1, o = e.length ? e[0] : null;
      for (let l = 0, a = 0, h = 0; ; l++) {
        let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
        if (f - a >= i) for (; o && o.from < f; ) {
          let u = o;
          if (a >= u.from || f <= u.to || h) {
            let d = Math.max(u.from, a) - h, p = Math.min(u.to, f) - h;
            u = d >= p ? null : new Ei(d, p, u.tree, u.offset + h, l > 0, !!c);
          }
          if (u && s.push(u), o.to > f) break;
          o = r < e.length ? e[r++] : null;
        }
        if (!c) break;
        a = c.toA, h = c.toA - c.toB;
      }
      return s;
    }
  }
  class ku {
    startParse(e, t, i) {
      return typeof e == "string" && (e = new qb(e)), i = i ? i.length ? i.map((s) => new fo(s.from, s.to)) : [
        new fo(0, 0)
      ] : [
        new fo(0, e.length)
      ], this.createParse(e, t || [], i);
    }
    parse(e, t, i) {
      let s = this.startParse(e, t, i);
      for (; ; ) {
        let r = s.advance();
        if (r) return r;
      }
    }
  }
  class qb {
    constructor(e) {
      this.string = e;
    }
    get length() {
      return this.string.length;
    }
    chunk(e) {
      return this.string.slice(e);
    }
    get lineChunks() {
      return false;
    }
    read(e, t) {
      return this.string.slice(e, t);
    }
  }
  new Y({
    perNode: true
  });
  let Xb = 0, Xt = class dl {
    constructor(e, t, i, s) {
      this.name = e, this.set = t, this.base = i, this.modified = s, this.id = Xb++;
    }
    toString() {
      let { name: e } = this;
      for (let t of this.modified) t.name && (e = `${t.name}(${e})`);
      return e;
    }
    static define(e, t) {
      let i = typeof e == "string" ? e : "?";
      if (e instanceof dl && (t = e), t == null ? void 0 : t.base) throw new Error("Can not derive from a modified tag");
      let s = new dl(i, [], null, []);
      if (s.set.push(s), t) for (let r of t.set) s.set.push(r);
      return s;
    }
    static defineModifier(e) {
      let t = new cr(e);
      return (i) => i.modified.indexOf(t) > -1 ? i : cr.get(i.base || i, i.modified.concat(t).sort((s, r) => s.id - r.id));
    }
  }, Ub = 0;
  class cr {
    constructor(e) {
      this.name = e, this.instances = [], this.id = Ub++;
    }
    static get(e, t) {
      if (!t.length) return e;
      let i = t[0].instances.find((l) => l.base == e && $b(t, l.modified));
      if (i) return i;
      let s = [], r = new Xt(e.name, s, e, t);
      for (let l of t) l.instances.push(r);
      let o = jb(t);
      for (let l of e.set) if (!l.modified.length) for (let a of o) s.push(cr.get(l, a));
      return r;
    }
  }
  function $b(n, e) {
    return n.length == e.length && n.every((t, i) => t == e[i]);
  }
  function jb(n) {
    let e = [
      []
    ];
    for (let t = 0; t < n.length; t++) for (let i = 0, s = e.length; i < s; i++) e.push(e[i].concat(n[t]));
    return e.sort((t, i) => i.length - t.length);
  }
  function vu(n) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let t in n) {
      let i = n[t];
      Array.isArray(i) || (i = [
        i
      ]);
      for (let s of t.split(" ")) if (s) {
        let r = [], o = 2, l = s;
        for (let f = 0; ; ) {
          if (l == "..." && f > 0 && f + 3 == s.length) {
            o = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u) throw new RangeError("Invalid path: " + s);
          if (r.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == s.length) break;
          let d = s[f++];
          if (f == s.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/") throw new RangeError("Invalid path: " + s);
          l = s.slice(f);
        }
        let a = r.length - 1, h = r[a];
        if (!h) throw new RangeError("Invalid path: " + s);
        let c = new fr(i, o, a > 0 ? r.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
    }
    return Su.add(e);
  }
  const Su = new Y();
  class fr {
    constructor(e, t, i, s) {
      this.tags = e, this.mode = t, this.context = i, this.next = s;
    }
    get opaque() {
      return this.mode == 0;
    }
    get inherit() {
      return this.mode == 1;
    }
    sort(e) {
      return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
    }
    get depth() {
      return this.context ? this.context.length : 0;
    }
  }
  fr.empty = new fr([], 2, null);
  function Ou(n, e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let r of n) if (!Array.isArray(r.tag)) t[r.tag.id] = r.class;
    else for (let o of r.tag) t[o.id] = r.class;
    let { scope: i, all: s = null } = e || {};
    return {
      style: (r) => {
        let o = s;
        for (let l of r) for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
        return o;
      },
      scope: i
    };
  }
  function Kb(n, e) {
    let t = null;
    for (let i of n) {
      let s = i.style(e);
      s && (t = t ? t + " " + s : s);
    }
    return t;
  }
  function Gb(n, e, t, i = 0, s = n.length) {
    let r = new Yb(i, Array.isArray(e) ? e : [
      e
    ], t);
    r.highlightRange(n.cursor(), i, s, "", r.highlighters), r.flush(s);
  }
  class Yb {
    constructor(e, t, i) {
      this.at = e, this.highlighters = t, this.span = i, this.class = "";
    }
    startSpan(e, t) {
      t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
    }
    flush(e) {
      e > this.at && this.class && this.span(this.at, e, this.class);
    }
    highlightRange(e, t, i, s, r) {
      let { type: o, from: l, to: a } = e;
      if (l >= i || a <= t) return;
      o.isTop && (r = this.highlighters.filter((d) => !d.scope || d.scope(o)));
      let h = s, c = Jb(e) || fr.empty, f = Kb(r, c.tags);
      if (f && (h && (h += " "), h += f, c.mode == 1 && (s += (s ? " " : "") + f)), this.startSpan(Math.max(t, l), h), c.opaque) return;
      let u = e.tree && e.tree.prop(Y.mounted);
      if (u && u.overlay) {
        let d = e.node.enter(u.overlay[0].from + l, 1), p = this.highlighters.filter((b) => !b.scope || b.scope(u.tree.type)), g = e.firstChild();
        for (let b = 0, y = l; ; b++) {
          let S = b < u.overlay.length ? u.overlay[b] : null, A = S ? S.from + l : a, C = Math.max(t, y), w = Math.min(i, A);
          if (C < w && g) for (; e.from < w && (this.highlightRange(e, C, w, s, r), this.startSpan(Math.min(w, e.to), h), !(e.to >= A || !e.nextSibling())); ) ;
          if (!S || A > i) break;
          y = S.to + l, y > t && (this.highlightRange(d.cursor(), Math.max(t, S.from + l), Math.min(i, y), "", p), this.startSpan(Math.min(i, y), h));
        }
        g && e.parent();
      } else if (e.firstChild()) {
        u && (s = "");
        do
          if (!(e.to <= t)) {
            if (e.from >= i) break;
            this.highlightRange(e, t, i, s, r), this.startSpan(Math.min(i, e.to), h);
          }
        while (e.nextSibling());
        e.parent();
      }
    }
  }
  function Jb(n) {
    let e = n.type.prop(Su);
    for (; e && e.context && !n.matchContext(e.context); ) e = e.next;
    return e || null;
  }
  const P = Xt.define, Es = P(), ri = P(), zh = P(ri), Vh = P(ri), oi = P(), Bs = P(oi), uo = P(oi), Et = P(), Oi = P(Et), Dt = P(), Rt = P(), pl = P(), wn = P(pl), Ls = P(), x = {
    comment: Es,
    lineComment: P(Es),
    blockComment: P(Es),
    docComment: P(Es),
    name: ri,
    variableName: P(ri),
    typeName: zh,
    tagName: P(zh),
    propertyName: Vh,
    attributeName: P(Vh),
    className: P(ri),
    labelName: P(ri),
    namespace: P(ri),
    macroName: P(ri),
    literal: oi,
    string: Bs,
    docString: P(Bs),
    character: P(Bs),
    attributeValue: P(Bs),
    number: uo,
    integer: P(uo),
    float: P(uo),
    bool: P(oi),
    regexp: P(oi),
    escape: P(oi),
    color: P(oi),
    url: P(oi),
    keyword: Dt,
    self: P(Dt),
    null: P(Dt),
    atom: P(Dt),
    unit: P(Dt),
    modifier: P(Dt),
    operatorKeyword: P(Dt),
    controlKeyword: P(Dt),
    definitionKeyword: P(Dt),
    moduleKeyword: P(Dt),
    operator: Rt,
    derefOperator: P(Rt),
    arithmeticOperator: P(Rt),
    logicOperator: P(Rt),
    bitwiseOperator: P(Rt),
    compareOperator: P(Rt),
    updateOperator: P(Rt),
    definitionOperator: P(Rt),
    typeOperator: P(Rt),
    controlOperator: P(Rt),
    punctuation: pl,
    separator: P(pl),
    bracket: wn,
    angleBracket: P(wn),
    squareBracket: P(wn),
    paren: P(wn),
    brace: P(wn),
    content: Et,
    heading: Oi,
    heading1: P(Oi),
    heading2: P(Oi),
    heading3: P(Oi),
    heading4: P(Oi),
    heading5: P(Oi),
    heading6: P(Oi),
    contentSeparator: P(Et),
    list: P(Et),
    quote: P(Et),
    emphasis: P(Et),
    strong: P(Et),
    link: P(Et),
    monospace: P(Et),
    strikethrough: P(Et),
    inserted: P(),
    deleted: P(),
    changed: P(),
    invalid: P(),
    meta: Ls,
    documentMeta: P(Ls),
    annotation: P(Ls),
    processingInstruction: P(Ls),
    definition: Xt.defineModifier("definition"),
    constant: Xt.defineModifier("constant"),
    function: Xt.defineModifier("function"),
    standard: Xt.defineModifier("standard"),
    local: Xt.defineModifier("local"),
    special: Xt.defineModifier("special")
  };
  for (let n in x) {
    let e = x[n];
    e instanceof Xt && (e.name = n);
  }
  Ou([
    {
      tag: x.link,
      class: "tok-link"
    },
    {
      tag: x.heading,
      class: "tok-heading"
    },
    {
      tag: x.emphasis,
      class: "tok-emphasis"
    },
    {
      tag: x.strong,
      class: "tok-strong"
    },
    {
      tag: x.keyword,
      class: "tok-keyword"
    },
    {
      tag: x.atom,
      class: "tok-atom"
    },
    {
      tag: x.bool,
      class: "tok-bool"
    },
    {
      tag: x.url,
      class: "tok-url"
    },
    {
      tag: x.labelName,
      class: "tok-labelName"
    },
    {
      tag: x.inserted,
      class: "tok-inserted"
    },
    {
      tag: x.deleted,
      class: "tok-deleted"
    },
    {
      tag: x.literal,
      class: "tok-literal"
    },
    {
      tag: x.string,
      class: "tok-string"
    },
    {
      tag: x.number,
      class: "tok-number"
    },
    {
      tag: [
        x.regexp,
        x.escape,
        x.special(x.string)
      ],
      class: "tok-string2"
    },
    {
      tag: x.variableName,
      class: "tok-variableName"
    },
    {
      tag: x.local(x.variableName),
      class: "tok-variableName tok-local"
    },
    {
      tag: x.definition(x.variableName),
      class: "tok-variableName tok-definition"
    },
    {
      tag: x.special(x.variableName),
      class: "tok-variableName2"
    },
    {
      tag: x.definition(x.propertyName),
      class: "tok-propertyName tok-definition"
    },
    {
      tag: x.typeName,
      class: "tok-typeName"
    },
    {
      tag: x.namespace,
      class: "tok-namespace"
    },
    {
      tag: x.className,
      class: "tok-className"
    },
    {
      tag: x.macroName,
      class: "tok-macroName"
    },
    {
      tag: x.propertyName,
      class: "tok-propertyName"
    },
    {
      tag: x.operator,
      class: "tok-operator"
    },
    {
      tag: x.comment,
      class: "tok-comment"
    },
    {
      tag: x.meta,
      class: "tok-meta"
    },
    {
      tag: x.invalid,
      class: "tok-invalid"
    },
    {
      tag: x.punctuation,
      class: "tok-punctuation"
    }
  ]);
  var po;
  const Ki = new Y();
  function Zb(n) {
    return B.define({
      combine: n ? (e) => e.concat(n) : void 0
    });
  }
  const ey = new Y();
  class vt {
    constructor(e, t, i = [], s = "") {
      this.data = e, this.name = s, ie.prototype.hasOwnProperty("tree") || Object.defineProperty(ie.prototype, "tree", {
        get() {
          return Ke(this);
        }
      }), this.parser = t, this.extension = [
        wi.of(this),
        ie.languageData.of((r, o, l) => {
          let a = Qh(r, o, l), h = a.type.prop(Ki);
          if (!h) return [];
          let c = r.facet(h), f = a.type.prop(ey);
          if (f) {
            let u = a.resolve(o - a.from, l);
            for (let d of f) if (d.test(u, r)) {
              let p = r.facet(d.facet);
              return d.type == "replace" ? p : p.concat(c);
            }
          }
          return c;
        })
      ].concat(i);
    }
    isActiveAt(e, t, i = -1) {
      return Qh(e, t, i).type.prop(Ki) == this.data;
    }
    findRegions(e) {
      let t = e.facet(wi);
      if ((t == null ? void 0 : t.data) == this.data) return [
        {
          from: 0,
          to: e.doc.length
        }
      ];
      if (!t || !t.allowsNesting) return [];
      let i = [], s = (r, o) => {
        if (r.prop(Ki) == this.data) {
          i.push({
            from: o,
            to: o + r.length
          });
          return;
        }
        let l = r.prop(Y.mounted);
        if (l) {
          if (l.tree.prop(Ki) == this.data) {
            if (l.overlay) for (let a of l.overlay) i.push({
              from: a.from + o,
              to: a.to + o
            });
            else i.push({
              from: o,
              to: o + r.length
            });
            return;
          } else if (l.overlay) {
            let a = i.length;
            if (s(l.tree, l.overlay[0].from + o), i.length > a) return;
          }
        }
        for (let a = 0; a < r.children.length; a++) {
          let h = r.children[a];
          h instanceof Me && s(h, r.positions[a] + o);
        }
      };
      return s(Ke(e), 0), i;
    }
    get allowsNesting() {
      return true;
    }
  }
  vt.setState = j.define();
  function Qh(n, e, t) {
    let i = n.facet(wi), s = Ke(n).topNode;
    if (!i || i.allowsNesting) for (let r = s; r; r = r.enter(e, t, _e.ExcludeBuffers)) r.type.isTop && (s = r);
    return s;
  }
  class ur extends vt {
    constructor(e, t, i) {
      super(e, t, [], i), this.parser = t;
    }
    static define(e) {
      let t = Zb(e.languageData);
      return new ur(t, e.parser.configure({
        props: [
          Ki.add((i) => i.isTop ? t : void 0)
        ]
      }), e.name);
    }
    configure(e, t) {
      return new ur(this.data, this.parser.configure(e), t || this.name);
    }
    get allowsNesting() {
      return this.parser.hasWrappers();
    }
  }
  function Ke(n) {
    let e = n.field(vt.state, false);
    return e ? e.tree : Me.empty;
  }
  class ty {
    constructor(e) {
      this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
    }
    get length() {
      return this.doc.length;
    }
    syncTo(e) {
      return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
    }
    chunk(e) {
      return this.syncTo(e), this.string;
    }
    get lineChunks() {
      return true;
    }
    read(e, t) {
      let i = this.cursorPos - this.string.length;
      return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
    }
  }
  let kn = null;
  class dr {
    constructor(e, t, i = [], s, r, o, l, a) {
      this.parser = e, this.state = t, this.fragments = i, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
    }
    static create(e, t, i) {
      return new dr(e, t, [], Me.empty, 0, i, [], null);
    }
    startParse() {
      return this.parser.startParse(new ty(this.state.doc), this.fragments);
    }
    work(e, t) {
      return t != null && t >= this.state.doc.length && (t = void 0), this.tree != Me.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), true) : this.withContext(() => {
        var i;
        if (typeof e == "number") {
          let s = Date.now() + e;
          e = () => Date.now() > s;
        }
        for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
          let s = this.parse.advance();
          if (s) if (this.fragments = this.withoutTempSkipped(Ei.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length)) this.parse = this.startParse();
          else return true;
          if (e()) return false;
        }
      });
    }
    takeTree() {
      let e, t;
      this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
        for (; !(t = this.parse.advance()); ) ;
      }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Ei.addTree(this.tree, this.fragments, true)), this.parse = null);
    }
    withContext(e) {
      let t = kn;
      kn = this;
      try {
        return e();
      } finally {
        kn = t;
      }
    }
    withoutTempSkipped(e) {
      for (let t; t = this.tempSkipped.pop(); ) e = qh(e, t.from, t.to);
      return e;
    }
    changes(e, t) {
      let { fragments: i, tree: s, treeLen: r, viewport: o, skipped: l } = this;
      if (this.takeTree(), !e.empty) {
        let a = [];
        if (e.iterChangedRanges((h, c, f, u) => a.push({
          fromA: h,
          toA: c,
          fromB: f,
          toB: u
        })), i = Ei.applyChanges(i, a), s = Me.empty, r = 0, o = {
          from: e.mapPos(o.from, -1),
          to: e.mapPos(o.to, 1)
        }, this.skipped.length) {
          l = [];
          for (let h of this.skipped) {
            let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
            c < f && l.push({
              from: c,
              to: f
            });
          }
        }
      }
      return new dr(this.parser, t, i, s, r, o, l, this.scheduleOn);
    }
    updateViewport(e) {
      if (this.viewport.from == e.from && this.viewport.to == e.to) return false;
      this.viewport = e;
      let t = this.skipped.length;
      for (let i = 0; i < this.skipped.length; i++) {
        let { from: s, to: r } = this.skipped[i];
        s < e.to && r > e.from && (this.fragments = qh(this.fragments, s, r), this.skipped.splice(i--, 1));
      }
      return this.skipped.length >= t ? false : (this.reset(), true);
    }
    reset() {
      this.parse && (this.takeTree(), this.parse = null);
    }
    skipUntilInView(e, t) {
      this.skipped.push({
        from: e,
        to: t
      });
    }
    static getSkippingParser(e) {
      return new class extends ku {
        createParse(t, i, s) {
          let r = s[0].from, o = s[s.length - 1].to;
          return {
            parsedPos: r,
            advance() {
              let a = kn;
              if (a) {
                for (let h of s) a.tempSkipped.push(h);
                e && (a.scheduleOn = a.scheduleOn ? Promise.all([
                  a.scheduleOn,
                  e
                ]) : e);
              }
              return this.parsedPos = o, new Me(ot.none, [], [], o - r);
            },
            stoppedAt: null,
            stopAt() {
            }
          };
        }
      }();
    }
    isDone(e) {
      e = Math.min(e, this.state.doc.length);
      let t = this.fragments;
      return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
    }
    static get() {
      return kn;
    }
  }
  function qh(n, e, t) {
    return Ei.applyChanges(n, [
      {
        fromA: e,
        toA: t,
        fromB: e,
        toB: t
      }
    ]);
  }
  class hn {
    constructor(e) {
      this.context = e, this.tree = e.tree;
    }
    apply(e) {
      if (!e.docChanged && this.tree == this.context.tree) return this;
      let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
      return t.work(20, i) || t.takeTree(), new hn(t);
    }
    static init(e) {
      let t = Math.min(3e3, e.doc.length), i = dr.create(e.facet(wi).parser, e, {
        from: 0,
        to: t
      });
      return i.work(20, t) || i.takeTree(), new hn(i);
    }
  }
  vt.state = Qe.define({
    create: hn.init,
    update(n, e) {
      for (let t of e.effects) if (t.is(vt.setState)) return t.value;
      return e.startState.facet(wi) != e.state.facet(wi) ? hn.init(e.state) : n.apply(e);
    }
  });
  let Cu = (n) => {
    let e = setTimeout(() => n(), 500);
    return () => clearTimeout(e);
  };
  typeof requestIdleCallback < "u" && (Cu = (n) => {
    let e = -1, t = setTimeout(() => {
      e = requestIdleCallback(n, {
        timeout: 400
      });
    }, 100);
    return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
  });
  const go = typeof navigator < "u" && (!((po = navigator.scheduling) === null || po === void 0) && po.isInputPending) ? () => navigator.scheduling.isInputPending() : null, iy = Oe.fromClass(class {
    constructor(e) {
      this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
    }
    update(e) {
      let t = this.view.state.field(vt.state).context;
      (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
    }
    scheduleWork() {
      if (this.working) return;
      let { state: e } = this.view, t = e.field(vt.state);
      (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Cu(this.work));
    }
    work(e) {
      this.working = null;
      let t = Date.now();
      if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
      let { state: i, viewport: { to: s } } = this.view, r = i.field(vt.state);
      if (r.tree == r.context.tree && r.context.isDone(s + 1e5)) return;
      let o = Date.now() + Math.min(this.chunkBudget, 100, e && !go ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && i.doc.length > s + 1e3, a = r.context.work(() => go && go() || Date.now() > o, s + (l ? 0 : 1e5));
      this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({
        effects: vt.setState.of(new hn(r.context))
      })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
    }
    checkAsyncSchedule(e) {
      e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => st(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
    }
    destroy() {
      this.working && this.working();
    }
    isWorking() {
      return !!(this.working || this.workScheduled > 0);
    }
  }, {
    eventHandlers: {
      focus() {
        this.scheduleWork();
      }
    }
  }), wi = B.define({
    combine(n) {
      return n.length ? n[0] : null;
    },
    enables: (n) => [
      vt.state,
      iy,
      E.contentAttributes.compute([
        n
      ], (e) => {
        let t = e.facet(n);
        return t && t.name ? {
          "data-language": t.name
        } : {};
      })
    ]
  });
  class ny {
    constructor(e, t = []) {
      this.language = e, this.support = t, this.extension = [
        e,
        t
      ];
    }
  }
  const sy = B.define(), Lr = B.define({
    combine: (n) => {
      if (!n.length) return "  ";
      let e = n[0];
      if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0])) throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
      return e;
    }
  });
  function pr(n) {
    let e = n.facet(Lr);
    return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
  }
  function qn(n, e) {
    let t = "", i = n.tabSize, s = n.facet(Lr)[0];
    if (s == "	") {
      for (; e >= i; ) t += "	", e -= i;
      s = " ";
    }
    for (let r = 0; r < e; r++) t += s;
    return t;
  }
  function Jl(n, e) {
    n instanceof ie && (n = new _r(n));
    for (let i of n.state.facet(sy)) {
      let s = i(n, e);
      if (s !== void 0) return s;
    }
    let t = Ke(n.state);
    return t.length >= e ? ry(n, t, e) : null;
  }
  class _r {
    constructor(e, t = {}) {
      this.state = e, this.options = t, this.unit = pr(e);
    }
    lineAt(e, t = 1) {
      let i = this.state.doc.lineAt(e), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
      return s != null && s >= i.from && s <= i.to ? r && s == e ? {
        text: "",
        from: e
      } : (t < 0 ? s < e : s <= e) ? {
        text: i.text.slice(s - i.from),
        from: s
      } : {
        text: i.text.slice(0, s - i.from),
        from: i.from
      } : i;
    }
    textAfterPos(e, t = 1) {
      if (this.options.simulateDoubleBreak && e == this.options.simulateBreak) return "";
      let { text: i, from: s } = this.lineAt(e, t);
      return i.slice(e - s, Math.min(i.length, e + 100 - s));
    }
    column(e, t = 1) {
      let { text: i, from: s } = this.lineAt(e, t), r = this.countColumn(i, e - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
      return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
    }
    countColumn(e, t = e.length) {
      return dn(e, this.state.tabSize, t);
    }
    lineIndent(e, t = 1) {
      let { text: i, from: s } = this.lineAt(e, t), r = this.options.overrideIndentation;
      if (r) {
        let o = r(s);
        if (o > -1) return o;
      }
      return this.countColumn(i, i.search(/\S|$/));
    }
    get simulatedBreak() {
      return this.options.simulateBreak || null;
    }
  }
  const Au = new Y();
  function ry(n, e, t) {
    let i = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
    if (s != i.node) {
      let r = [];
      for (let o = s; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent) r.push(o);
      for (let o = r.length - 1; o >= 0; o--) i = {
        node: r[o],
        next: i
      };
    }
    return Mu(i, n, t);
  }
  function Mu(n, e, t) {
    for (let i = n; i; i = i.next) {
      let s = ly(i.node);
      if (s) return s(Zl.create(e, t, i));
    }
    return 0;
  }
  function oy(n) {
    return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
  }
  function ly(n) {
    let e = n.type.prop(Au);
    if (e) return e;
    let t = n.firstChild, i;
    if (t && (i = t.type.prop(Y.closedBy))) {
      let s = n.lastChild, r = s && i.indexOf(s.name) > -1;
      return (o) => Tu(o, true, 1, void 0, r && !oy(o) ? s.from : void 0);
    }
    return n.parent == null ? ay : null;
  }
  function ay() {
    return 0;
  }
  class Zl extends _r {
    constructor(e, t, i) {
      super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
    }
    get node() {
      return this.context.node;
    }
    static create(e, t, i) {
      return new Zl(e, t, i);
    }
    get textAfter() {
      return this.textAfterPos(this.pos);
    }
    get baseIndent() {
      return this.baseIndentFor(this.node);
    }
    baseIndentFor(e) {
      let t = this.state.doc.lineAt(e.from);
      for (; ; ) {
        let i = e.resolve(t.from);
        for (; i.parent && i.parent.from == i.from; ) i = i.parent;
        if (hy(i, e)) break;
        t = this.state.doc.lineAt(i.from);
      }
      return this.lineIndent(t.from);
    }
    continue() {
      return Mu(this.context.next, this.base, this.pos);
    }
  }
  function hy(n, e) {
    for (let t = e; t; t = t.parent) if (n == t) return true;
    return false;
  }
  function cy(n) {
    let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
    if (!t) return null;
    let s = n.options.simulateBreak, r = n.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
    for (let l = t.to; ; ) {
      let a = e.childAfter(l);
      if (!a || a == i) return null;
      if (!a.type.isSkipped) {
        if (a.from >= o) return null;
        let h = /^ */.exec(r.text.slice(t.to - r.from))[0].length;
        return {
          from: t.from,
          to: t.to + h
        };
      }
      l = a.to;
    }
  }
  function Xh({ closing: n, align: e = true, units: t = 1 }) {
    return (i) => Tu(i, e, t, n);
  }
  function Tu(n, e, t, i, s) {
    let r = n.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || s == n.pos + o, a = e ? cy(n) : null;
    return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
  }
  const fy = 200;
  function uy() {
    return ie.transactionFilter.of((n) => {
      if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete")) return n;
      let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
      if (!e.length) return n;
      let t = n.newDoc, { head: i } = n.newSelection.main, s = t.lineAt(i);
      if (i > s.from + fy) return n;
      let r = t.sliceString(s.from, i);
      if (!e.some((h) => h.test(r))) return n;
      let { state: o } = n, l = -1, a = [];
      for (let { head: h } of o.selection.ranges) {
        let c = o.doc.lineAt(h);
        if (c.from == l) continue;
        l = c.from;
        let f = Jl(o, c.from);
        if (f == null) continue;
        let u = /^\s*/.exec(c.text)[0], d = qn(o, f);
        u != d && a.push({
          from: c.from,
          to: c.from + u.length,
          insert: d
        });
      }
      return a.length ? [
        n,
        {
          changes: a,
          sequential: true
        }
      ] : n;
    });
  }
  const dy = B.define(), Pu = new Y();
  function py(n) {
    let e = n.firstChild, t = n.lastChild;
    return e && e.to < t.from ? {
      from: e.to,
      to: t.type.isError ? n.to : t.from
    } : null;
  }
  function gy(n, e, t) {
    let i = Ke(n);
    if (i.length < t) return null;
    let s = i.resolveStack(t, 1), r = null;
    for (let o = s; o; o = o.next) {
      let l = o.node;
      if (l.to <= t || l.from > t) continue;
      if (r && l.from < e) break;
      let a = l.type.prop(Pu);
      if (a && (l.to < i.length - 50 || i.length == n.doc.length || !my(l))) {
        let h = a(l, n);
        h && h.from <= t && h.from >= e && h.to > t && (r = h);
      }
    }
    return r;
  }
  function my(n) {
    let e = n.lastChild;
    return e && e.to == n.to && e.type.isError;
  }
  function gr(n, e, t) {
    for (let i of n.facet(dy)) {
      let s = i(n, e, t);
      if (s) return s;
    }
    return gy(n, e, t);
  }
  function Du(n, e) {
    let t = e.mapPos(n.from, 1), i = e.mapPos(n.to, -1);
    return t >= i ? void 0 : {
      from: t,
      to: i
    };
  }
  const Nr = j.define({
    map: Du
  }), ts = j.define({
    map: Du
  });
  function Ru(n) {
    let e = [];
    for (let { head: t } of n.state.selection.ranges) e.some((i) => i.from <= t && i.to >= t) || e.push(n.lineBlockAt(t));
    return e;
  }
  const Hi = Qe.define({
    create() {
      return z.none;
    },
    update(n, e) {
      n = n.map(e.changes);
      for (let t of e.effects) if (t.is(Nr) && !by(n, t.value.from, t.value.to)) {
        let { preparePlaceholder: i } = e.state.facet(Lu), s = i ? z.replace({
          widget: new Oy(i(e.state, t.value))
        }) : Uh;
        n = n.update({
          add: [
            s.range(t.value.from, t.value.to)
          ]
        });
      } else t.is(ts) && (n = n.update({
        filter: (i, s) => t.value.from != i || t.value.to != s,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
      if (e.selection) {
        let t = false, { head: i } = e.selection.main;
        n.between(i, i, (s, r) => {
          s < i && r > i && (t = true);
        }), t && (n = n.update({
          filterFrom: i,
          filterTo: i,
          filter: (s, r) => r <= i || s >= i
        }));
      }
      return n;
    },
    provide: (n) => E.decorations.from(n),
    toJSON(n, e) {
      let t = [];
      return n.between(0, e.doc.length, (i, s) => {
        t.push(i, s);
      }), t;
    },
    fromJSON(n) {
      if (!Array.isArray(n) || n.length % 2) throw new RangeError("Invalid JSON for fold state");
      let e = [];
      for (let t = 0; t < n.length; ) {
        let i = n[t++], s = n[t++];
        if (typeof i != "number" || typeof s != "number") throw new RangeError("Invalid JSON for fold state");
        e.push(Uh.range(i, s));
      }
      return z.set(e, true);
    }
  });
  function mr(n, e, t) {
    var i;
    let s = null;
    return (i = n.field(Hi, false)) === null || i === void 0 || i.between(e, t, (r, o) => {
      (!s || s.from > r) && (s = {
        from: r,
        to: o
      });
    }), s;
  }
  function by(n, e, t) {
    let i = false;
    return n.between(e, e, (s, r) => {
      s == e && r == t && (i = true);
    }), i;
  }
  function Eu(n, e) {
    return n.field(Hi, false) ? e : e.concat(j.appendConfig.of(_u()));
  }
  const yy = (n) => {
    for (let e of Ru(n)) {
      let t = gr(n.state, e.from, e.to);
      if (t) return n.dispatch({
        effects: Eu(n.state, [
          Nr.of(t),
          Bu(n, t)
        ])
      }), true;
    }
    return false;
  }, xy = (n) => {
    if (!n.state.field(Hi, false)) return false;
    let e = [];
    for (let t of Ru(n)) {
      let i = mr(n.state, t.from, t.to);
      i && e.push(ts.of(i), Bu(n, i, false));
    }
    return e.length && n.dispatch({
      effects: e
    }), e.length > 0;
  };
  function Bu(n, e, t = true) {
    let i = n.state.doc.lineAt(e.from).number, s = n.state.doc.lineAt(e.to).number;
    return E.announce.of(`${n.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${i} ${n.state.phrase("to")} ${s}.`);
  }
  const wy = (n) => {
    let { state: e } = n, t = [];
    for (let i = 0; i < e.doc.length; ) {
      let s = n.lineBlockAt(i), r = gr(e, s.from, s.to);
      r && t.push(Nr.of(r)), i = (r ? n.lineBlockAt(r.to) : s).to + 1;
    }
    return t.length && n.dispatch({
      effects: Eu(n.state, t)
    }), !!t.length;
  }, ky = (n) => {
    let e = n.state.field(Hi, false);
    if (!e || !e.size) return false;
    let t = [];
    return e.between(0, n.state.doc.length, (i, s) => {
      t.push(ts.of({
        from: i,
        to: s
      }));
    }), n.dispatch({
      effects: t
    }), true;
  }, vy = [
    {
      key: "Ctrl-Shift-[",
      mac: "Cmd-Alt-[",
      run: yy
    },
    {
      key: "Ctrl-Shift-]",
      mac: "Cmd-Alt-]",
      run: xy
    },
    {
      key: "Ctrl-Alt-[",
      run: wy
    },
    {
      key: "Ctrl-Alt-]",
      run: ky
    }
  ], Sy = {
    placeholderDOM: null,
    preparePlaceholder: null,
    placeholderText: "\u2026"
  }, Lu = B.define({
    combine(n) {
      return zt(n, Sy);
    }
  });
  function _u(n) {
    return [
      Hi,
      My
    ];
  }
  function Nu(n, e) {
    let { state: t } = n, i = t.facet(Lu), s = (o) => {
      let l = n.lineBlockAt(n.posAtDOM(o.target)), a = mr(n.state, l.from, l.to);
      a && n.dispatch({
        effects: ts.of(a)
      }), o.preventDefault();
    };
    if (i.placeholderDOM) return i.placeholderDOM(n, s, e);
    let r = document.createElement("span");
    return r.textContent = i.placeholderText, r.setAttribute("aria-label", t.phrase("folded code")), r.title = t.phrase("unfold"), r.className = "cm-foldPlaceholder", r.onclick = s, r;
  }
  const Uh = z.replace({
    widget: new class extends ti {
      toDOM(n) {
        return Nu(n, null);
      }
    }()
  });
  class Oy extends ti {
    constructor(e) {
      super(), this.value = e;
    }
    eq(e) {
      return this.value == e.value;
    }
    toDOM(e) {
      return Nu(e, this.value);
    }
  }
  const Cy = {
    openText: "\u2304",
    closedText: "\u203A",
    markerDOM: null,
    domEventHandlers: {},
    foldingChanged: () => false
  };
  class mo extends Jt {
    constructor(e, t) {
      super(), this.config = e, this.open = t;
    }
    eq(e) {
      return this.config == e.config && this.open == e.open;
    }
    toDOM(e) {
      if (this.config.markerDOM) return this.config.markerDOM(this.open);
      let t = document.createElement("span");
      return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
    }
  }
  function Ay(n = {}) {
    let e = {
      ...Cy,
      ...n
    }, t = new mo(e, true), i = new mo(e, false), s = Oe.fromClass(class {
      constructor(o) {
        this.from = o.viewport.from, this.markers = this.buildMarkers(o);
      }
      update(o) {
        (o.docChanged || o.viewportChanged || o.startState.facet(wi) != o.state.facet(wi) || o.startState.field(Hi, false) != o.state.field(Hi, false) || Ke(o.startState) != Ke(o.state) || e.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
      }
      buildMarkers(o) {
        let l = new Gt();
        for (let a of o.viewportLineBlocks) {
          let h = mr(o.state, a.from, a.to) ? i : gr(o.state, a.from, a.to) ? t : null;
          h && l.add(a.from, a.from, h);
        }
        return l.finish();
      }
    }), { domEventHandlers: r } = e;
    return [
      s,
      Mb({
        class: "cm-foldGutter",
        markers(o) {
          var l;
          return ((l = o.plugin(s)) === null || l === void 0 ? void 0 : l.markers) || re.empty;
        },
        initialSpacer() {
          return new mo(e, false);
        },
        domEventHandlers: {
          ...r,
          click: (o, l, a) => {
            if (r.click && r.click(o, l, a)) return true;
            let h = mr(o.state, l.from, l.to);
            if (h) return o.dispatch({
              effects: ts.of(h)
            }), true;
            let c = gr(o.state, l.from, l.to);
            return c ? (o.dispatch({
              effects: Nr.of(c)
            }), true) : false;
          }
        }
      }),
      _u()
    ];
  }
  const My = E.baseTheme({
    ".cm-foldPlaceholder": {
      backgroundColor: "#eee",
      border: "1px solid #ddd",
      color: "#888",
      borderRadius: ".2em",
      margin: "0 1px",
      padding: "0 1px",
      cursor: "pointer"
    },
    ".cm-foldGutter span": {
      padding: "0 1px",
      cursor: "pointer"
    }
  });
  class is {
    constructor(e, t) {
      this.specs = e;
      let i;
      function s(l) {
        let a = mi.newName();
        return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
      }
      const r = typeof t.all == "string" ? t.all : t.all ? s(t.all) : void 0, o = t.scope;
      this.scope = o instanceof vt ? (l) => l.prop(Ki) == o.data : o ? (l) => l == o : void 0, this.style = Ou(e.map((l) => ({
        tag: l.tag,
        class: l.class || s(Object.assign({}, l, {
          tag: null
        }))
      })), {
        all: r
      }).style, this.module = i ? new mi(i) : null, this.themeType = t.themeType;
    }
    static define(e, t) {
      return new is(e, t || {});
    }
  }
  const gl = B.define(), Iu = B.define({
    combine(n) {
      return n.length ? [
        n[0]
      ] : null;
    }
  });
  function bo(n) {
    let e = n.facet(gl);
    return e.length ? e : n.facet(Iu);
  }
  function Fu(n, e) {
    let t = [
      Py
    ], i;
    return n instanceof is && (n.module && t.push(E.styleModule.of(n.module)), i = n.themeType), (e == null ? void 0 : e.fallback) ? t.push(Iu.of(n)) : i ? t.push(gl.computeN([
      E.darkTheme
    ], (s) => s.facet(E.darkTheme) == (i == "dark") ? [
      n
    ] : [])) : t.push(gl.of(n)), t;
  }
  class Ty {
    constructor(e) {
      this.markCache = /* @__PURE__ */ Object.create(null), this.tree = Ke(e.state), this.decorations = this.buildDeco(e, bo(e.state)), this.decoratedTo = e.viewport.to;
    }
    update(e) {
      let t = Ke(e.state), i = bo(e.state), s = i != bo(e.startState), { viewport: r } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
      t.length < r.to && !s && t.type == this.tree.type && o >= r.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || s) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = r.to);
    }
    buildDeco(e, t) {
      if (!t || !this.tree.length) return z.none;
      let i = new Gt();
      for (let { from: s, to: r } of e.visibleRanges) Gb(this.tree, t, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = z.mark({
          class: a
        })));
      }, s, r);
      return i.finish();
    }
  }
  const Py = Wi.high(Oe.fromClass(Ty, {
    decorations: (n) => n.decorations
  })), Dy = is.define([
    {
      tag: x.meta,
      color: "#404740"
    },
    {
      tag: x.link,
      textDecoration: "underline"
    },
    {
      tag: x.heading,
      textDecoration: "underline",
      fontWeight: "bold"
    },
    {
      tag: x.emphasis,
      fontStyle: "italic"
    },
    {
      tag: x.strong,
      fontWeight: "bold"
    },
    {
      tag: x.strikethrough,
      textDecoration: "line-through"
    },
    {
      tag: x.keyword,
      color: "#708"
    },
    {
      tag: [
        x.atom,
        x.bool,
        x.url,
        x.contentSeparator,
        x.labelName
      ],
      color: "#219"
    },
    {
      tag: [
        x.literal,
        x.inserted
      ],
      color: "#164"
    },
    {
      tag: [
        x.string,
        x.deleted
      ],
      color: "#a11"
    },
    {
      tag: [
        x.regexp,
        x.escape,
        x.special(x.string)
      ],
      color: "#e40"
    },
    {
      tag: x.definition(x.variableName),
      color: "#00f"
    },
    {
      tag: x.local(x.variableName),
      color: "#30a"
    },
    {
      tag: [
        x.typeName,
        x.namespace
      ],
      color: "#085"
    },
    {
      tag: x.className,
      color: "#167"
    },
    {
      tag: [
        x.special(x.variableName),
        x.macroName
      ],
      color: "#256"
    },
    {
      tag: x.definition(x.propertyName),
      color: "#00c"
    },
    {
      tag: x.comment,
      color: "#940"
    },
    {
      tag: x.invalid,
      color: "#f00"
    }
  ]), Ry = E.baseTheme({
    "&.cm-focused .cm-matchingBracket": {
      backgroundColor: "#328c8252"
    },
    "&.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bb555544"
    }
  }), Hu = 1e4, Wu = "()[]{}", zu = B.define({
    combine(n) {
      return zt(n, {
        afterCursor: true,
        brackets: Wu,
        maxScanDistance: Hu,
        renderMatch: Ly
      });
    }
  }), Ey = z.mark({
    class: "cm-matchingBracket"
  }), By = z.mark({
    class: "cm-nonmatchingBracket"
  });
  function Ly(n) {
    let e = [], t = n.matched ? Ey : By;
    return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
  }
  const _y = Qe.define({
    create() {
      return z.none;
    },
    update(n, e) {
      if (!e.docChanged && !e.selection) return n;
      let t = [], i = e.state.facet(zu);
      for (let s of e.state.selection.ranges) {
        if (!s.empty) continue;
        let r = Nt(e.state, s.head, -1, i) || s.head > 0 && Nt(e.state, s.head - 1, 1, i) || i.afterCursor && (Nt(e.state, s.head, 1, i) || s.head < e.state.doc.length && Nt(e.state, s.head + 1, -1, i));
        r && (t = t.concat(i.renderMatch(r, e.state)));
      }
      return z.set(t, true);
    },
    provide: (n) => E.decorations.from(n)
  }), Ny = [
    _y,
    Ry
  ];
  function Iy(n = {}) {
    return [
      zu.of(n),
      Ny
    ];
  }
  const Fy = new Y();
  function ml(n, e, t) {
    let i = n.prop(e < 0 ? Y.openedBy : Y.closedBy);
    if (i) return i;
    if (n.name.length == 1) {
      let s = t.indexOf(n.name);
      if (s > -1 && s % 2 == (e < 0 ? 1 : 0)) return [
        t[s + e]
      ];
    }
    return null;
  }
  function bl(n) {
    let e = n.type.prop(Fy);
    return e ? e(n.node) : n;
  }
  function Nt(n, e, t, i = {}) {
    let s = i.maxScanDistance || Hu, r = i.brackets || Wu, o = Ke(n), l = o.resolveInner(e, t);
    for (let a = l; a; a = a.parent) {
      let h = ml(a.type, t, r);
      if (h && a.from < a.to) {
        let c = bl(a);
        if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to)) return Hy(n, e, t, a, c, h, r);
      }
    }
    return Wy(n, e, t, o, l.type, s, r);
  }
  function Hy(n, e, t, i, s, r, o) {
    let l = i.parent, a = {
      from: s.from,
      to: s.to
    }, h = 0, c = l == null ? void 0 : l.cursor();
    if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to))) do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = bl(c);
          return {
            start: a,
            end: f ? {
              from: f.from,
              to: f.to
            } : void 0,
            matched: true
          };
        } else if (ml(c.type, t, o)) h++;
        else if (ml(c.type, -t, o)) {
          if (h == 0) {
            let f = bl(c);
            return {
              start: a,
              end: f && f.from < f.to ? {
                from: f.from,
                to: f.to
              } : void 0,
              matched: false
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
    return {
      start: a,
      matched: false
    };
  }
  function Wy(n, e, t, i, s, r, o) {
    let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
    if (a < 0 || a % 2 == 0 != t > 0) return null;
    let h = {
      from: t < 0 ? e - 1 : e,
      to: t > 0 ? e + 1 : e
    }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
    for (let u = 0; !c.next().done && u <= r; ) {
      let d = c.value;
      t < 0 && (u += d.length);
      let p = e + u * t;
      for (let g = t > 0 ? 0 : d.length - 1, b = t > 0 ? d.length : -1; g != b; g += t) {
        let y = o.indexOf(d[g]);
        if (!(y < 0 || i.resolveInner(p + g, 1).type != s)) if (y % 2 == 0 == t > 0) f++;
        else {
          if (f == 1) return {
            start: h,
            end: {
              from: p + g,
              to: p + g + 1
            },
            matched: y >> 1 == a >> 1
          };
          f--;
        }
      }
      t > 0 && (u += d.length);
    }
    return c.done ? {
      start: h,
      matched: false
    } : null;
  }
  const zy = /* @__PURE__ */ Object.create(null), $h = [
    ot.none
  ], jh = [], Kh = /* @__PURE__ */ Object.create(null), Vy = /* @__PURE__ */ Object.create(null);
  for (let [n, e] of [
    [
      "variable",
      "variableName"
    ],
    [
      "variable-2",
      "variableName.special"
    ],
    [
      "string-2",
      "string.special"
    ],
    [
      "def",
      "variableName.definition"
    ],
    [
      "tag",
      "tagName"
    ],
    [
      "attribute",
      "attributeName"
    ],
    [
      "type",
      "typeName"
    ],
    [
      "builtin",
      "variableName.standard"
    ],
    [
      "qualifier",
      "modifier"
    ],
    [
      "error",
      "invalid"
    ],
    [
      "header",
      "heading"
    ],
    [
      "property",
      "propertyName"
    ]
  ]) Vy[n] = Qy(zy, e);
  function yo(n, e) {
    jh.indexOf(n) > -1 || (jh.push(n), console.warn(e));
  }
  function Qy(n, e) {
    let t = [];
    for (let l of e.split(" ")) {
      let a = [];
      for (let h of l.split(".")) {
        let c = n[h] || x[h];
        c ? typeof c == "function" ? a.length ? a = a.map(c) : yo(h, `Modifier ${h} used at start of tag`) : a.length ? yo(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [
          c
        ] : yo(h, `Unknown highlighting tag ${h}`);
      }
      for (let h of a) t.push(h);
    }
    if (!t.length) return 0;
    let i = e.replace(/ /g, "_"), s = i + " " + t.map((l) => l.id), r = Kh[s];
    if (r) return r.id;
    let o = Kh[s] = ot.define({
      id: $h.length,
      name: i,
      props: [
        vu({
          [i]: t
        })
      ]
    });
    return $h.push(o), o.id;
  }
  ge.RTL, ge.LTR;
  const qy = (n) => {
    let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = ta(n.state, t.from);
    return i.line ? Xy(n) : i.block ? $y(n) : false;
  };
  function ea(n, e) {
    return ({ state: t, dispatch: i }) => {
      if (t.readOnly) return false;
      let s = n(e, t);
      return s ? (i(t.update(s)), true) : false;
    };
  }
  const Xy = ea(Gy, 0), Uy = ea(Vu, 0), $y = ea((n, e) => Vu(n, e, Ky(e)), 0);
  function ta(n, e) {
    let t = n.languageDataAt("commentTokens", e, 1);
    return t.length ? t[0] : {};
  }
  const vn = 50;
  function jy(n, { open: e, close: t }, i, s) {
    let r = n.sliceDoc(i - vn, i), o = n.sliceDoc(s, s + vn), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
    if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t) return {
      open: {
        pos: i - l,
        margin: l && 1
      },
      close: {
        pos: s + a,
        margin: a && 1
      }
    };
    let c, f;
    s - i <= 2 * vn ? c = f = n.sliceDoc(i, s) : (c = n.sliceDoc(i, i + vn), f = n.sliceDoc(s - vn, s));
    let u = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(f)[0].length, p = f.length - d - t.length;
    return c.slice(u, u + e.length) == e && f.slice(p, p + t.length) == t ? {
      open: {
        pos: i + u + e.length,
        margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
      },
      close: {
        pos: s - d - t.length,
        margin: /\s/.test(f.charAt(p - 1)) ? 1 : 0
      }
    } : null;
  }
  function Ky(n) {
    let e = [];
    for (let t of n.selection.ranges) {
      let i = n.doc.lineAt(t.from), s = t.to <= i.to ? i : n.doc.lineAt(t.to);
      s.from > i.from && s.from == t.to && (s = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
      let r = e.length - 1;
      r >= 0 && e[r].to > i.from ? e[r].to = s.to : e.push({
        from: i.from + /^\s*/.exec(i.text)[0].length,
        to: s.to
      });
    }
    return e;
  }
  function Vu(n, e, t = e.selection.ranges) {
    let i = t.map((r) => ta(e, r.from).block);
    if (!i.every((r) => r)) return null;
    let s = t.map((r, o) => jy(e, i[o], r.from, r.to));
    if (n != 2 && !s.every((r) => r)) return {
      changes: e.changes(t.map((r, o) => s[o] ? [] : [
        {
          from: r.from,
          insert: i[o].open + " "
        },
        {
          from: r.to,
          insert: " " + i[o].close
        }
      ]))
    };
    if (n != 1 && s.some((r) => r)) {
      let r = [];
      for (let o = 0, l; o < s.length; o++) if (l = s[o]) {
        let a = i[o], { open: h, close: c } = l;
        r.push({
          from: h.pos - a.open.length,
          to: h.pos + h.margin
        }, {
          from: c.pos - c.margin,
          to: c.pos + a.close.length
        });
      }
      return {
        changes: r
      };
    }
    return null;
  }
  function Gy(n, e, t = e.selection.ranges) {
    let i = [], s = -1;
    for (let { from: r, to: o } of t) {
      let l = i.length, a = 1e9, h = ta(e, r).line;
      if (h) {
        for (let c = r; c <= o; ) {
          let f = e.doc.lineAt(c);
          if (f.from > s && (r == o || o > f.from)) {
            s = f.from;
            let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, p = f.text.slice(u, u + h.length) == h ? u : -1;
            u < f.text.length && u < a && (a = u), i.push({
              line: f,
              comment: p,
              token: h,
              indent: u,
              empty: d,
              single: false
            });
          }
          c = f.to + 1;
        }
        if (a < 1e9) for (let c = l; c < i.length; c++) i[c].indent < i[c].line.text.length && (i[c].indent = a);
        i.length == l + 1 && (i[l].single = true);
      }
    }
    if (n != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
      let r = [];
      for (let { line: l, token: a, indent: h, empty: c, single: f } of i) (f || !c) && r.push({
        from: l.from + h,
        insert: a + " "
      });
      let o = e.changes(r);
      return {
        changes: o,
        selection: e.selection.map(o, 1)
      };
    } else if (n != 1 && i.some((r) => r.comment >= 0)) {
      let r = [];
      for (let { line: o, comment: l, token: a } of i) if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, r.push({
          from: h,
          to: c
        });
      }
      return {
        changes: r
      };
    }
    return null;
  }
  const yl = ei.define(), Yy = ei.define(), Jy = B.define(), Qu = B.define({
    combine(n) {
      return zt(n, {
        minDepth: 100,
        newGroupDelay: 500,
        joinToEvent: (e, t) => t
      }, {
        minDepth: Math.max,
        newGroupDelay: Math.min,
        joinToEvent: (e, t) => (i, s) => e(i, s) || t(i, s)
      });
    }
  }), qu = Qe.define({
    create() {
      return It.empty;
    },
    update(n, e) {
      let t = e.state.facet(Qu), i = e.annotation(yl);
      if (i) {
        let a = rt.fromTransaction(e, i.selection), h = i.side, c = h == 0 ? n.undone : n.done;
        return a ? c = br(c, c.length, t.minDepth, a) : c = $u(c, e.startState.selection), new It(h == 0 ? i.rest : c, h == 0 ? c : i.rest);
      }
      let s = e.annotation(Yy);
      if ((s == "full" || s == "before") && (n = n.isolate()), e.annotation(Re.addToHistory) === false) return e.changes.empty ? n : n.addMapping(e.changes.desc);
      let r = rt.fromTransaction(e), o = e.annotation(Re.time), l = e.annotation(Re.userEvent);
      return r ? n = n.addChanges(r, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (s == "full" || s == "after") && (n = n.isolate()), n;
    },
    toJSON(n) {
      return {
        done: n.done.map((e) => e.toJSON()),
        undone: n.undone.map((e) => e.toJSON())
      };
    },
    fromJSON(n) {
      return new It(n.done.map(rt.fromJSON), n.undone.map(rt.fromJSON));
    }
  });
  function Zy(n = {}) {
    return [
      qu,
      Qu.of(n),
      E.domEventHandlers({
        beforeinput(e, t) {
          let i = e.inputType == "historyUndo" ? Xu : e.inputType == "historyRedo" ? xl : null;
          return i ? (e.preventDefault(), i(t)) : false;
        }
      })
    ];
  }
  function Ir(n, e) {
    return function({ state: t, dispatch: i }) {
      if (!e && t.readOnly) return false;
      let s = t.field(qu, false);
      if (!s) return false;
      let r = s.pop(n, t, e);
      return r ? (i(r), true) : false;
    };
  }
  const Xu = Ir(0, false), xl = Ir(1, false), e1 = Ir(0, true), t1 = Ir(1, true);
  class rt {
    constructor(e, t, i, s, r) {
      this.changes = e, this.effects = t, this.mapped = i, this.startSelection = s, this.selectionsAfter = r;
    }
    setSelAfter(e) {
      return new rt(this.changes, this.effects, this.mapped, this.startSelection, e);
    }
    toJSON() {
      var e, t, i;
      return {
        changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
        mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
        startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
        selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
      };
    }
    static fromJSON(e) {
      return new rt(e.changes && De.fromJSON(e.changes), [], e.mapped && Ft.fromJSON(e.mapped), e.startSelection && v.fromJSON(e.startSelection), e.selectionsAfter.map(v.fromJSON));
    }
    static fromTransaction(e, t) {
      let i = pt;
      for (let s of e.startState.facet(Jy)) {
        let r = s(e);
        r.length && (i = i.concat(r));
      }
      return !i.length && e.changes.empty ? null : new rt(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, pt);
    }
    static selection(e) {
      return new rt(void 0, pt, void 0, void 0, e);
    }
  }
  function br(n, e, t, i) {
    let s = e + 1 > t + 20 ? e - t - 1 : 0, r = n.slice(s, e);
    return r.push(i), r;
  }
  function i1(n, e) {
    let t = [], i = false;
    return n.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, l) => {
      for (let a = 0; a < t.length; ) {
        let h = t[a++], c = t[a++];
        l >= h && o <= c && (i = true);
      }
    }), i;
  }
  function n1(n, e) {
    return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
  }
  function Uu(n, e) {
    return n.length ? e.length ? n.concat(e) : n : e;
  }
  const pt = [], s1 = 200;
  function $u(n, e) {
    if (n.length) {
      let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - s1));
      return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), br(n, n.length - 1, 1e9, t.setSelAfter(i)));
    } else return [
      rt.selection([
        e
      ])
    ];
  }
  function r1(n) {
    let e = n[n.length - 1], t = n.slice();
    return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
  }
  function xo(n, e) {
    if (!n.length) return n;
    let t = n.length, i = pt;
    for (; t; ) {
      let s = o1(n[t - 1], e, i);
      if (s.changes && !s.changes.empty || s.effects.length) {
        let r = n.slice(0, t);
        return r[t - 1] = s, r;
      } else e = s.mapped, t--, i = s.selectionsAfter;
    }
    return i.length ? [
      rt.selection(i)
    ] : pt;
  }
  function o1(n, e, t) {
    let i = Uu(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : pt, t);
    if (!n.changes) return rt.selection(i);
    let s = n.changes.map(e), r = e.mapDesc(n.changes, true), o = n.mapped ? n.mapped.composeDesc(r) : r;
    return new rt(s, j.mapEffects(n.effects, e), o, n.startSelection.map(r), i);
  }
  const l1 = /^(input\.type|delete)($|\.)/;
  class It {
    constructor(e, t, i = 0, s = void 0) {
      this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = s;
    }
    isolate() {
      return this.prevTime ? new It(this.done, this.undone) : this;
    }
    addChanges(e, t, i, s, r) {
      let o = this.done, l = o[o.length - 1];
      return l && l.changes && !l.changes.empty && e.changes && (!i || l1.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, i1(l.changes, e.changes)) || i == "input.type.compose") ? o = br(o, o.length - 1, s.minDepth, new rt(e.changes.compose(l.changes), Uu(j.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, pt)) : o = br(o, o.length, s.minDepth, e), new It(o, pt, t, i);
    }
    addSelection(e, t, i, s) {
      let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : pt;
      return r.length > 0 && t - this.prevTime < s && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && n1(r[r.length - 1], e) ? this : new It($u(this.done, e), this.undone, t, i);
    }
    addMapping(e) {
      return new It(xo(this.done, e), xo(this.undone, e), this.prevTime, this.prevUserEvent);
    }
    pop(e, t, i) {
      let s = e == 0 ? this.done : this.undone;
      if (s.length == 0) return null;
      let r = s[s.length - 1], o = r.selectionsAfter[0] || t.selection;
      if (i && r.selectionsAfter.length) return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: yl.of({
          side: e,
          rest: r1(s),
          selection: o
        }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: true
      });
      if (r.changes) {
        let l = s.length == 1 ? pt : s.slice(0, s.length - 1);
        return r.mapped && (l = xo(l, r.mapped)), t.update({
          changes: r.changes,
          selection: r.startSelection,
          effects: r.effects,
          annotations: yl.of({
            side: e,
            rest: l,
            selection: o
          }),
          filter: false,
          userEvent: e == 0 ? "undo" : "redo",
          scrollIntoView: true
        });
      } else return null;
    }
  }
  It.empty = new It(pt, pt);
  const a1 = [
    {
      key: "Mod-z",
      run: Xu,
      preventDefault: true
    },
    {
      key: "Mod-y",
      mac: "Mod-Shift-z",
      run: xl,
      preventDefault: true
    },
    {
      linux: "Ctrl-Shift-z",
      run: xl,
      preventDefault: true
    },
    {
      key: "Mod-u",
      run: e1,
      preventDefault: true
    },
    {
      key: "Alt-u",
      mac: "Mod-Shift-u",
      run: t1,
      preventDefault: true
    }
  ];
  function pn(n, e) {
    return v.create(n.ranges.map(e), n.mainIndex);
  }
  function Vt(n, e) {
    return n.update({
      selection: e,
      scrollIntoView: true,
      userEvent: "select"
    });
  }
  function Ct({ state: n, dispatch: e }, t) {
    let i = pn(n.selection, t);
    return i.eq(n.selection, true) ? false : (e(Vt(n, i)), true);
  }
  function Fr(n, e) {
    return v.cursor(e ? n.to : n.from);
  }
  function ju(n, e) {
    return Ct(n, (t) => t.empty ? n.moveByChar(t, e) : Fr(t, e));
  }
  function Ge(n) {
    return n.textDirectionAt(n.state.selection.main.head) == ge.LTR;
  }
  const Ku = (n) => ju(n, !Ge(n)), Gu = (n) => ju(n, Ge(n));
  function Yu(n, e) {
    return Ct(n, (t) => t.empty ? n.moveByGroup(t, e) : Fr(t, e));
  }
  const h1 = (n) => Yu(n, !Ge(n)), c1 = (n) => Yu(n, Ge(n));
  function f1(n, e, t) {
    if (e.type.prop(t)) return true;
    let i = e.to - e.from;
    return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
  }
  function Hr(n, e, t) {
    let i = Ke(n).resolveInner(e.head), s = t ? Y.closedBy : Y.openedBy;
    for (let a = e.head; ; ) {
      let h = t ? i.childAfter(a) : i.childBefore(a);
      if (!h) break;
      f1(n, h, s) ? i = h : a = t ? h.to : h.from;
    }
    let r = i.type.prop(s), o, l;
    return r && (o = t ? Nt(n, i.from, 1) : Nt(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, v.cursor(l, t ? -1 : 1);
  }
  const u1 = (n) => Ct(n, (e) => Hr(n.state, e, !Ge(n))), d1 = (n) => Ct(n, (e) => Hr(n.state, e, Ge(n)));
  function Ju(n, e) {
    return Ct(n, (t) => {
      if (!t.empty) return Fr(t, e);
      let i = n.moveVertically(t, e);
      return i.head != t.head ? i : n.moveToLineBoundary(t, e);
    });
  }
  const Zu = (n) => Ju(n, false), ed = (n) => Ju(n, true);
  function td(n) {
    let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, s;
    if (e) {
      for (let r of n.state.facet(E.scrollMargins)) {
        let o = r(n);
        (o == null ? void 0 : o.top) && (t = Math.max(o == null ? void 0 : o.top, t)), (o == null ? void 0 : o.bottom) && (i = Math.max(o == null ? void 0 : o.bottom, i));
      }
      s = n.scrollDOM.clientHeight - t - i;
    } else s = (n.dom.ownerDocument.defaultView || window).innerHeight;
    return {
      marginTop: t,
      marginBottom: i,
      selfScroll: e,
      height: Math.max(n.defaultLineHeight, s - 5)
    };
  }
  function id(n, e) {
    let t = td(n), { state: i } = n, s = pn(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : Fr(o, e));
    if (s.eq(i.selection)) return false;
    let r;
    if (t.selfScroll) {
      let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
      o && o.top > a && o.bottom < h && (r = E.scrollIntoView(s.main.head, {
        y: "start",
        yMargin: o.top - a
      }));
    }
    return n.dispatch(Vt(i, s), {
      effects: r
    }), true;
  }
  const Gh = (n) => id(n, false), wl = (n) => id(n, true);
  function ki(n, e, t) {
    let i = n.lineBlockAt(e.head), s = n.moveToLineBoundary(e, t);
    if (s.head == e.head && s.head != (t ? i.to : i.from) && (s = n.moveToLineBoundary(e, t, false)), !t && s.head == i.from && i.length) {
      let r = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
      r && e.head != i.from + r && (s = v.cursor(i.from + r));
    }
    return s;
  }
  const p1 = (n) => Ct(n, (e) => ki(n, e, true)), g1 = (n) => Ct(n, (e) => ki(n, e, false)), m1 = (n) => Ct(n, (e) => ki(n, e, !Ge(n))), b1 = (n) => Ct(n, (e) => ki(n, e, Ge(n))), y1 = (n) => Ct(n, (e) => v.cursor(n.lineBlockAt(e.head).from, 1)), x1 = (n) => Ct(n, (e) => v.cursor(n.lineBlockAt(e.head).to, -1));
  function w1(n, e, t) {
    let i = false, s = pn(n.selection, (r) => {
      let o = Nt(n, r.head, -1) || Nt(n, r.head, 1) || r.head > 0 && Nt(n, r.head - 1, 1) || r.head < n.doc.length && Nt(n, r.head + 1, -1);
      if (!o || !o.end) return r;
      i = true;
      let l = o.start.from == r.head ? o.end.to : o.end.from;
      return v.cursor(l);
    });
    return i ? (e(Vt(n, s)), true) : false;
  }
  const k1 = ({ state: n, dispatch: e }) => w1(n, e);
  function wt(n, e) {
    let t = pn(n.state.selection, (i) => {
      let s = e(i);
      return v.range(i.anchor, s.head, s.goalColumn, s.bidiLevel || void 0);
    });
    return t.eq(n.state.selection) ? false : (n.dispatch(Vt(n.state, t)), true);
  }
  function nd(n, e) {
    return wt(n, (t) => n.moveByChar(t, e));
  }
  const sd = (n) => nd(n, !Ge(n)), rd = (n) => nd(n, Ge(n));
  function od(n, e) {
    return wt(n, (t) => n.moveByGroup(t, e));
  }
  const v1 = (n) => od(n, !Ge(n)), S1 = (n) => od(n, Ge(n)), O1 = (n) => wt(n, (e) => Hr(n.state, e, !Ge(n))), C1 = (n) => wt(n, (e) => Hr(n.state, e, Ge(n)));
  function ld(n, e) {
    return wt(n, (t) => n.moveVertically(t, e));
  }
  const ad = (n) => ld(n, false), hd = (n) => ld(n, true);
  function cd(n, e) {
    return wt(n, (t) => n.moveVertically(t, e, td(n).height));
  }
  const Yh = (n) => cd(n, false), Jh = (n) => cd(n, true), A1 = (n) => wt(n, (e) => ki(n, e, true)), M1 = (n) => wt(n, (e) => ki(n, e, false)), T1 = (n) => wt(n, (e) => ki(n, e, !Ge(n))), P1 = (n) => wt(n, (e) => ki(n, e, Ge(n))), D1 = (n) => wt(n, (e) => v.cursor(n.lineBlockAt(e.head).from)), R1 = (n) => wt(n, (e) => v.cursor(n.lineBlockAt(e.head).to)), Zh = ({ state: n, dispatch: e }) => (e(Vt(n, {
    anchor: 0
  })), true), ec = ({ state: n, dispatch: e }) => (e(Vt(n, {
    anchor: n.doc.length
  })), true), tc = ({ state: n, dispatch: e }) => (e(Vt(n, {
    anchor: n.selection.main.anchor,
    head: 0
  })), true), ic = ({ state: n, dispatch: e }) => (e(Vt(n, {
    anchor: n.selection.main.anchor,
    head: n.doc.length
  })), true), E1 = ({ state: n, dispatch: e }) => (e(n.update({
    selection: {
      anchor: 0,
      head: n.doc.length
    },
    userEvent: "select"
  })), true), B1 = ({ state: n, dispatch: e }) => {
    let t = Wr(n).map(({ from: i, to: s }) => v.range(i, Math.min(s + 1, n.doc.length)));
    return e(n.update({
      selection: v.create(t),
      userEvent: "select"
    })), true;
  }, L1 = ({ state: n, dispatch: e }) => {
    let t = pn(n.selection, (i) => {
      let s = Ke(n), r = s.resolveStack(i.from, 1);
      if (i.empty) {
        let o = s.resolveStack(i.from, -1);
        o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
      }
      for (let o = r; o; o = o.next) {
        let { node: l } = o;
        if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next) return v.range(l.to, l.from);
      }
      return i;
    });
    return t.eq(n.selection) ? false : (e(Vt(n, t)), true);
  }, _1 = ({ state: n, dispatch: e }) => {
    let t = n.selection, i = null;
    return t.ranges.length > 1 ? i = v.create([
      t.main
    ]) : t.main.empty || (i = v.create([
      v.cursor(t.main.head)
    ])), i ? (e(Vt(n, i)), true) : false;
  };
  function ns(n, e) {
    if (n.state.readOnly) return false;
    let t = "delete.selection", { state: i } = n, s = i.changeByRange((r) => {
      let { from: o, to: l } = r;
      if (o == l) {
        let a = e(r);
        a < o ? (t = "delete.backward", a = _s(n, a, false)) : a > o && (t = "delete.forward", a = _s(n, a, true)), o = Math.min(o, a), l = Math.max(l, a);
      } else o = _s(n, o, false), l = _s(n, l, true);
      return o == l ? {
        range: r
      } : {
        changes: {
          from: o,
          to: l
        },
        range: v.cursor(o, o < r.head ? -1 : 1)
      };
    });
    return s.changes.empty ? false : (n.dispatch(i.update(s, {
      scrollIntoView: true,
      userEvent: t,
      effects: t == "delete.selection" ? E.announce.of(i.phrase("Selection deleted")) : void 0
    })), true);
  }
  function _s(n, e, t) {
    if (n instanceof E) for (let i of n.state.facet(E.atomicRanges).map((s) => s(n))) i.between(e, e, (s, r) => {
      s < e && r > e && (e = t ? r : s);
    });
    return e;
  }
  const fd = (n, e, t) => ns(n, (i) => {
    let s = i.from, { state: r } = n, o = r.doc.lineAt(s), l, a;
    if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, s - o.from))) {
      if (l[l.length - 1] == "	") return s - 1;
      let h = dn(l, r.tabSize), c = h % pr(r) || pr(r);
      for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++) s--;
      a = s;
    } else a = Ve(o.text, s - o.from, e, e) + o.from, a == s && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = Ve(o.text, a - o.from, false, false) + o.from);
    return a;
  }), kl = (n) => fd(n, false, true), ud = (n) => fd(n, true, false), dd = (n, e) => ns(n, (t) => {
    let i = t.head, { state: s } = n, r = s.doc.lineAt(i), o = s.charCategorizer(i);
    for (let l = null; ; ) {
      if (i == (e ? r.to : r.from)) {
        i == t.head && r.number != (e ? s.doc.lines : 1) && (i += e ? 1 : -1);
        break;
      }
      let a = Ve(r.text, i - r.from, e) + r.from, h = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), c = o(h);
      if (l != null && c != l) break;
      (h != " " || i != t.head) && (l = c), i = a;
    }
    return i;
  }), pd = (n) => dd(n, false), N1 = (n) => dd(n, true), I1 = (n) => ns(n, (e) => {
    let t = n.lineBlockAt(e.head).to;
    return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
  }), F1 = (n) => ns(n, (e) => {
    let t = n.moveToLineBoundary(e, false).head;
    return e.head > t ? t : Math.max(0, e.head - 1);
  }), H1 = (n) => ns(n, (e) => {
    let t = n.moveToLineBoundary(e, true).head;
    return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
  }), W1 = ({ state: n, dispatch: e }) => {
    if (n.readOnly) return false;
    let t = n.changeByRange((i) => ({
      changes: {
        from: i.from,
        to: i.to,
        insert: oe.of([
          "",
          ""
        ])
      },
      range: v.cursor(i.from)
    }));
    return e(n.update(t, {
      scrollIntoView: true,
      userEvent: "input"
    })), true;
  }, z1 = ({ state: n, dispatch: e }) => {
    if (n.readOnly) return false;
    let t = n.changeByRange((i) => {
      if (!i.empty || i.from == 0 || i.from == n.doc.length) return {
        range: i
      };
      let s = i.from, r = n.doc.lineAt(s), o = s == r.from ? s - 1 : Ve(r.text, s - r.from, false) + r.from, l = s == r.to ? s + 1 : Ve(r.text, s - r.from, true) + r.from;
      return {
        changes: {
          from: o,
          to: l,
          insert: n.doc.slice(s, l).append(n.doc.slice(o, s))
        },
        range: v.cursor(l)
      };
    });
    return t.changes.empty ? false : (e(n.update(t, {
      scrollIntoView: true,
      userEvent: "move.character"
    })), true);
  };
  function Wr(n) {
    let e = [], t = -1;
    for (let i of n.selection.ranges) {
      let s = n.doc.lineAt(i.from), r = n.doc.lineAt(i.to);
      if (!i.empty && i.to == r.from && (r = n.doc.lineAt(i.to - 1)), t >= s.number) {
        let o = e[e.length - 1];
        o.to = r.to, o.ranges.push(i);
      } else e.push({
        from: s.from,
        to: r.to,
        ranges: [
          i
        ]
      });
      t = r.number + 1;
    }
    return e;
  }
  function gd(n, e, t) {
    if (n.readOnly) return false;
    let i = [], s = [];
    for (let r of Wr(n)) {
      if (t ? r.to == n.doc.length : r.from == 0) continue;
      let o = n.doc.lineAt(t ? r.to + 1 : r.from - 1), l = o.length + 1;
      if (t) {
        i.push({
          from: r.to,
          to: o.to
        }, {
          from: r.from,
          insert: o.text + n.lineBreak
        });
        for (let a of r.ranges) s.push(v.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
      } else {
        i.push({
          from: o.from,
          to: r.from
        }, {
          from: r.to,
          insert: n.lineBreak + o.text
        });
        for (let a of r.ranges) s.push(v.range(a.anchor - l, a.head - l));
      }
    }
    return i.length ? (e(n.update({
      changes: i,
      scrollIntoView: true,
      selection: v.create(s, n.selection.mainIndex),
      userEvent: "move.line"
    })), true) : false;
  }
  const V1 = ({ state: n, dispatch: e }) => gd(n, e, false), Q1 = ({ state: n, dispatch: e }) => gd(n, e, true);
  function md(n, e, t) {
    if (n.readOnly) return false;
    let i = [];
    for (let s of Wr(n)) t ? i.push({
      from: s.from,
      insert: n.doc.slice(s.from, s.to) + n.lineBreak
    }) : i.push({
      from: s.to,
      insert: n.lineBreak + n.doc.slice(s.from, s.to)
    });
    return e(n.update({
      changes: i,
      scrollIntoView: true,
      userEvent: "input.copyline"
    })), true;
  }
  const q1 = ({ state: n, dispatch: e }) => md(n, e, false), X1 = ({ state: n, dispatch: e }) => md(n, e, true), U1 = (n) => {
    if (n.state.readOnly) return false;
    let { state: e } = n, t = e.changes(Wr(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, {
      from: s,
      to: r
    }))), i = pn(e.selection, (s) => {
      let r;
      if (n.lineWrapping) {
        let o = n.lineBlockAt(s.head), l = n.coordsAtPos(s.head, s.assoc || 1);
        l && (r = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
      }
      return n.moveVertically(s, true, r);
    }).map(t);
    return n.dispatch({
      changes: t,
      selection: i,
      scrollIntoView: true,
      userEvent: "delete.line"
    }), true;
  };
  function $1(n, e) {
    if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1))) return {
      from: e,
      to: e
    };
    let t = Ke(n).resolveInner(e), i = t.childBefore(e), s = t.childAfter(e), r;
    return i && s && i.to <= e && s.from >= e && (r = i.type.prop(Y.closedBy)) && r.indexOf(s.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(s.from).from && !/\S/.test(n.sliceDoc(i.to, s.from)) ? {
      from: i.to,
      to: s.from
    } : null;
  }
  const nc = bd(false), j1 = bd(true);
  function bd(n) {
    return ({ state: e, dispatch: t }) => {
      if (e.readOnly) return false;
      let i = e.changeByRange((s) => {
        let { from: r, to: o } = s, l = e.doc.lineAt(r), a = !n && r == o && $1(e, r);
        n && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
        let h = new _r(e, {
          simulateBreak: r,
          simulateDoubleBreak: !!a
        }), c = Jl(h, r);
        for (c == null && (c = dn(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); ) o++;
        a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
        let f = [
          "",
          qn(e, c)
        ];
        return a && f.push(qn(e, h.lineIndent(l.from, -1))), {
          changes: {
            from: r,
            to: o,
            insert: oe.of(f)
          },
          range: v.cursor(r + 1 + f[1].length)
        };
      });
      return t(e.update(i, {
        scrollIntoView: true,
        userEvent: "input"
      })), true;
    };
  }
  function ia(n, e) {
    let t = -1;
    return n.changeByRange((i) => {
      let s = [];
      for (let o = i.from; o <= i.to; ) {
        let l = n.doc.lineAt(o);
        l.number > t && (i.empty || i.to > l.from) && (e(l, s, i), t = l.number), o = l.to + 1;
      }
      let r = n.changes(s);
      return {
        changes: s,
        range: v.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
      };
    });
  }
  const K1 = ({ state: n, dispatch: e }) => {
    if (n.readOnly) return false;
    let t = /* @__PURE__ */ Object.create(null), i = new _r(n, {
      overrideIndentation: (r) => {
        let o = t[r];
        return o ?? -1;
      }
    }), s = ia(n, (r, o, l) => {
      let a = Jl(i, r.from);
      if (a == null) return;
      /\S/.test(r.text) || (a = 0);
      let h = /^\s*/.exec(r.text)[0], c = qn(n, a);
      (h != c || l.from < r.from + h.length) && (t[r.from] = a, o.push({
        from: r.from,
        to: r.from + h.length,
        insert: c
      }));
    });
    return s.changes.empty || e(n.update(s, {
      userEvent: "indent"
    })), true;
  }, yd = ({ state: n, dispatch: e }) => n.readOnly ? false : (e(n.update(ia(n, (t, i) => {
    i.push({
      from: t.from,
      insert: n.facet(Lr)
    });
  }), {
    userEvent: "input.indent"
  })), true), xd = ({ state: n, dispatch: e }) => n.readOnly ? false : (e(n.update(ia(n, (t, i) => {
    let s = /^\s*/.exec(t.text)[0];
    if (!s) return;
    let r = dn(s, n.tabSize), o = 0, l = qn(n, Math.max(0, r - pr(n)));
    for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); ) o++;
    i.push({
      from: t.from + o,
      to: t.from + s.length,
      insert: l.slice(o)
    });
  }), {
    userEvent: "delete.dedent"
  })), true), G1 = (n) => (n.setTabFocusMode(), true), Y1 = [
    {
      key: "Ctrl-b",
      run: Ku,
      shift: sd,
      preventDefault: true
    },
    {
      key: "Ctrl-f",
      run: Gu,
      shift: rd
    },
    {
      key: "Ctrl-p",
      run: Zu,
      shift: ad
    },
    {
      key: "Ctrl-n",
      run: ed,
      shift: hd
    },
    {
      key: "Ctrl-a",
      run: y1,
      shift: D1
    },
    {
      key: "Ctrl-e",
      run: x1,
      shift: R1
    },
    {
      key: "Ctrl-d",
      run: ud
    },
    {
      key: "Ctrl-h",
      run: kl
    },
    {
      key: "Ctrl-k",
      run: I1
    },
    {
      key: "Ctrl-Alt-h",
      run: pd
    },
    {
      key: "Ctrl-o",
      run: W1
    },
    {
      key: "Ctrl-t",
      run: z1
    },
    {
      key: "Ctrl-v",
      run: wl
    }
  ], J1 = [
    {
      key: "ArrowLeft",
      run: Ku,
      shift: sd,
      preventDefault: true
    },
    {
      key: "Mod-ArrowLeft",
      mac: "Alt-ArrowLeft",
      run: h1,
      shift: v1,
      preventDefault: true
    },
    {
      mac: "Cmd-ArrowLeft",
      run: m1,
      shift: T1,
      preventDefault: true
    },
    {
      key: "ArrowRight",
      run: Gu,
      shift: rd,
      preventDefault: true
    },
    {
      key: "Mod-ArrowRight",
      mac: "Alt-ArrowRight",
      run: c1,
      shift: S1,
      preventDefault: true
    },
    {
      mac: "Cmd-ArrowRight",
      run: b1,
      shift: P1,
      preventDefault: true
    },
    {
      key: "ArrowUp",
      run: Zu,
      shift: ad,
      preventDefault: true
    },
    {
      mac: "Cmd-ArrowUp",
      run: Zh,
      shift: tc
    },
    {
      mac: "Ctrl-ArrowUp",
      run: Gh,
      shift: Yh
    },
    {
      key: "ArrowDown",
      run: ed,
      shift: hd,
      preventDefault: true
    },
    {
      mac: "Cmd-ArrowDown",
      run: ec,
      shift: ic
    },
    {
      mac: "Ctrl-ArrowDown",
      run: wl,
      shift: Jh
    },
    {
      key: "PageUp",
      run: Gh,
      shift: Yh
    },
    {
      key: "PageDown",
      run: wl,
      shift: Jh
    },
    {
      key: "Home",
      run: g1,
      shift: M1,
      preventDefault: true
    },
    {
      key: "Mod-Home",
      run: Zh,
      shift: tc
    },
    {
      key: "End",
      run: p1,
      shift: A1,
      preventDefault: true
    },
    {
      key: "Mod-End",
      run: ec,
      shift: ic
    },
    {
      key: "Enter",
      run: nc,
      shift: nc
    },
    {
      key: "Mod-a",
      run: E1
    },
    {
      key: "Backspace",
      run: kl,
      shift: kl
    },
    {
      key: "Delete",
      run: ud
    },
    {
      key: "Mod-Backspace",
      mac: "Alt-Backspace",
      run: pd
    },
    {
      key: "Mod-Delete",
      mac: "Alt-Delete",
      run: N1
    },
    {
      mac: "Mod-Backspace",
      run: F1
    },
    {
      mac: "Mod-Delete",
      run: H1
    }
  ].concat(Y1.map((n) => ({
    mac: n.key,
    run: n.run,
    shift: n.shift
  }))), Z1 = [
    {
      key: "Alt-ArrowLeft",
      mac: "Ctrl-ArrowLeft",
      run: u1,
      shift: O1
    },
    {
      key: "Alt-ArrowRight",
      mac: "Ctrl-ArrowRight",
      run: d1,
      shift: C1
    },
    {
      key: "Alt-ArrowUp",
      run: V1
    },
    {
      key: "Shift-Alt-ArrowUp",
      run: q1
    },
    {
      key: "Alt-ArrowDown",
      run: Q1
    },
    {
      key: "Shift-Alt-ArrowDown",
      run: X1
    },
    {
      key: "Escape",
      run: _1
    },
    {
      key: "Mod-Enter",
      run: j1
    },
    {
      key: "Alt-l",
      mac: "Ctrl-l",
      run: B1
    },
    {
      key: "Mod-i",
      run: L1,
      preventDefault: true
    },
    {
      key: "Mod-[",
      run: xd
    },
    {
      key: "Mod-]",
      run: yd
    },
    {
      key: "Mod-Alt-\\",
      run: K1
    },
    {
      key: "Shift-Mod-k",
      run: U1
    },
    {
      key: "Shift-Mod-\\",
      run: k1
    },
    {
      key: "Mod-/",
      run: qy
    },
    {
      key: "Alt-A",
      run: Uy
    },
    {
      key: "Ctrl-m",
      mac: "Shift-Alt-m",
      run: G1
    }
  ].concat(J1), ex = {
    key: "Tab",
    run: yd,
    shift: xd
  }, sc = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
  class cn {
    constructor(e, t, i = 0, s = e.length, r, o) {
      this.test = o, this.value = {
        from: 0,
        to: 0
      }, this.done = false, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(i, s), this.bufferStart = i, this.normalize = r ? (l) => r(sc(l)) : sc, this.query = this.normalize(t);
    }
    peek() {
      if (this.bufferPos == this.buffer.length) {
        if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done) return -1;
        this.bufferPos = 0, this.buffer = this.iter.value;
      }
      return tt(this.buffer, this.bufferPos);
    }
    next() {
      for (; this.matches.length; ) this.matches.pop();
      return this.nextOverlapping();
    }
    nextOverlapping() {
      for (; ; ) {
        let e = this.peek();
        if (e < 0) return this.done = true, this;
        let t = El(e), i = this.bufferStart + this.bufferPos;
        this.bufferPos += Lt(e);
        let s = this.normalize(t);
        if (s.length) for (let r = 0, o = i; ; r++) {
          let l = s.charCodeAt(r), a = this.match(l, o, this.bufferPos + this.bufferStart);
          if (r == s.length - 1) {
            if (a) return this.value = a, this;
            break;
          }
          o == i && r < t.length && t.charCodeAt(r) == l && o++;
        }
      }
    }
    match(e, t, i) {
      let s = null;
      for (let r = 0; r < this.matches.length; r += 2) {
        let o = this.matches[r], l = false;
        this.query.charCodeAt(o) == e && (o == this.query.length - 1 ? s = {
          from: this.matches[r + 1],
          to: i
        } : (this.matches[r]++, l = true)), l || (this.matches.splice(r, 2), r -= 2);
      }
      return this.query.charCodeAt(0) == e && (this.query.length == 1 ? s = {
        from: t,
        to: i
      } : this.matches.push(1, t)), s && this.test && !this.test(s.from, s.to, this.buffer, this.bufferStart) && (s = null), s;
    }
  }
  typeof Symbol < "u" && (cn.prototype[Symbol.iterator] = function() {
    return this;
  });
  const wd = {
    from: -1,
    to: -1,
    match: /.*/.exec("")
  }, na = "gm" + (/x/.unicode == null ? "" : "u");
  class kd {
    constructor(e, t, i, s = 0, r = e.length) {
      if (this.text = e, this.to = r, this.curLine = "", this.done = false, this.value = wd, /\\[sWDnr]|\n|\r|\[\^/.test(t)) return new vd(e, t, i, s, r);
      this.re = new RegExp(t, na + ((i == null ? void 0 : i.ignoreCase) ? "i" : "")), this.test = i == null ? void 0 : i.test, this.iter = e.iter();
      let o = e.lineAt(s);
      this.curLineStart = o.from, this.matchPos = yr(e, s), this.getLine(this.curLineStart);
    }
    getLine(e) {
      this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
    }
    nextLine() {
      this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
    }
    next() {
      for (let e = this.matchPos - this.curLineStart; ; ) {
        this.re.lastIndex = e;
        let t = this.matchPos <= this.to && this.re.exec(this.curLine);
        if (t) {
          let i = this.curLineStart + t.index, s = i + t[0].length;
          if (this.matchPos = yr(this.text, s + (i == s ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < s || i > this.value.to) && (!this.test || this.test(i, s, t))) return this.value = {
            from: i,
            to: s,
            match: t
          }, this;
          e = this.matchPos - this.curLineStart;
        } else if (this.curLineStart + this.curLine.length < this.to) this.nextLine(), e = 0;
        else return this.done = true, this;
      }
    }
  }
  const wo = /* @__PURE__ */ new WeakMap();
  class en {
    constructor(e, t) {
      this.from = e, this.text = t;
    }
    get to() {
      return this.from + this.text.length;
    }
    static get(e, t, i) {
      let s = wo.get(e);
      if (!s || s.from >= i || s.to <= t) {
        let l = new en(t, e.sliceString(t, i));
        return wo.set(e, l), l;
      }
      if (s.from == t && s.to == i) return s;
      let { text: r, from: o } = s;
      return o > t && (r = e.sliceString(t, o) + r, o = t), s.to < i && (r += e.sliceString(s.to, i)), wo.set(e, new en(o, r)), new en(t, r.slice(t - o, i - o));
    }
  }
  class vd {
    constructor(e, t, i, s, r) {
      this.text = e, this.to = r, this.done = false, this.value = wd, this.matchPos = yr(e, s), this.re = new RegExp(t, na + ((i == null ? void 0 : i.ignoreCase) ? "i" : "")), this.test = i == null ? void 0 : i.test, this.flat = en.get(e, s, this.chunkEnd(s + 5e3));
    }
    chunkEnd(e) {
      return e >= this.to ? this.to : this.text.lineAt(e).to;
    }
    next() {
      for (; ; ) {
        let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
        if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
          let i = this.flat.from + t.index, s = i + t[0].length;
          if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, s, t))) return this.value = {
            from: i,
            to: s,
            match: t
          }, this.matchPos = yr(this.text, s + (i == s ? 1 : 0)), this;
        }
        if (this.flat.to == this.to) return this.done = true, this;
        this.flat = en.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
      }
    }
  }
  typeof Symbol < "u" && (kd.prototype[Symbol.iterator] = vd.prototype[Symbol.iterator] = function() {
    return this;
  });
  function tx(n) {
    try {
      return new RegExp(n, na), true;
    } catch {
      return false;
    }
  }
  function yr(n, e) {
    if (e >= n.length) return e;
    let t = n.lineAt(e), i;
    for (; e < t.to && (i = t.text.charCodeAt(e - t.from)) >= 56320 && i < 57344; ) e++;
    return e;
  }
  function vl(n) {
    let e = String(n.state.doc.lineAt(n.state.selection.main.head).number), t = ae("input", {
      class: "cm-textfield",
      name: "line",
      value: e
    }), i = ae("form", {
      class: "cm-gotoLine",
      onkeydown: (r) => {
        r.keyCode == 27 ? (r.preventDefault(), n.dispatch({
          effects: En.of(false)
        }), n.focus()) : r.keyCode == 13 && (r.preventDefault(), s());
      },
      onsubmit: (r) => {
        r.preventDefault(), s();
      }
    }, ae("label", n.state.phrase("Go to line"), ": ", t), " ", ae("button", {
      class: "cm-button",
      type: "submit"
    }, n.state.phrase("go")), ae("button", {
      name: "close",
      onclick: () => {
        n.dispatch({
          effects: En.of(false)
        }), n.focus();
      },
      "aria-label": n.state.phrase("close"),
      type: "button"
    }, [
      "\xD7"
    ]));
    function s() {
      let r = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(t.value);
      if (!r) return;
      let { state: o } = n, l = o.doc.lineAt(o.selection.main.head), [, a, h, c, f] = r, u = c ? +c.slice(1) : 0, d = h ? +h : l.number;
      if (h && f) {
        let b = d / 100;
        a && (b = b * (a == "-" ? -1 : 1) + l.number / o.doc.lines), d = Math.round(o.doc.lines * b);
      } else h && a && (d = d * (a == "-" ? -1 : 1) + l.number);
      let p = o.doc.line(Math.max(1, Math.min(o.doc.lines, d))), g = v.cursor(p.from + Math.max(0, Math.min(u, p.length)));
      n.dispatch({
        effects: [
          En.of(false),
          E.scrollIntoView(g.from, {
            y: "center"
          })
        ],
        selection: g
      }), n.focus();
    }
    return {
      dom: i
    };
  }
  const En = j.define(), rc = Qe.define({
    create() {
      return true;
    },
    update(n, e) {
      for (let t of e.effects) t.is(En) && (n = t.value);
      return n;
    },
    provide: (n) => Vn.from(n, (e) => e ? vl : null)
  }), ix = (n) => {
    let e = zn(n, vl);
    if (!e) {
      let t = [
        En.of(true)
      ];
      n.state.field(rc, false) == null && t.push(j.appendConfig.of([
        rc,
        nx
      ])), n.dispatch({
        effects: t
      }), e = zn(n, vl);
    }
    return e && e.dom.querySelector("input").select(), true;
  }, nx = E.baseTheme({
    ".cm-panel.cm-gotoLine": {
      padding: "2px 6px 4px",
      position: "relative",
      "& label": {
        fontSize: "80%"
      },
      "& [name=close]": {
        position: "absolute",
        top: "0",
        bottom: "0",
        right: "4px",
        backgroundColor: "inherit",
        border: "none",
        font: "inherit",
        padding: "0"
      }
    }
  }), sx = {
    highlightWordAroundCursor: false,
    minSelectionLength: 1,
    maxMatches: 100,
    wholeWords: false
  }, rx = B.define({
    combine(n) {
      return zt(n, sx, {
        highlightWordAroundCursor: (e, t) => e || t,
        minSelectionLength: Math.min,
        maxMatches: Math.min
      });
    }
  });
  function ox(n) {
    return [
      fx,
      cx
    ];
  }
  const lx = z.mark({
    class: "cm-selectionMatch"
  }), ax = z.mark({
    class: "cm-selectionMatch cm-selectionMatch-main"
  });
  function oc(n, e, t, i) {
    return (t == 0 || n(e.sliceDoc(t - 1, t)) != me.Word) && (i == e.doc.length || n(e.sliceDoc(i, i + 1)) != me.Word);
  }
  function hx(n, e, t, i) {
    return n(e.sliceDoc(t, t + 1)) == me.Word && n(e.sliceDoc(i - 1, i)) == me.Word;
  }
  const cx = Oe.fromClass(class {
    constructor(n) {
      this.decorations = this.getDeco(n);
    }
    update(n) {
      (n.selectionSet || n.docChanged || n.viewportChanged) && (this.decorations = this.getDeco(n.view));
    }
    getDeco(n) {
      let e = n.state.facet(rx), { state: t } = n, i = t.selection;
      if (i.ranges.length > 1) return z.none;
      let s = i.main, r, o = null;
      if (s.empty) {
        if (!e.highlightWordAroundCursor) return z.none;
        let a = t.wordAt(s.head);
        if (!a) return z.none;
        o = t.charCategorizer(s.head), r = t.sliceDoc(a.from, a.to);
      } else {
        let a = s.to - s.from;
        if (a < e.minSelectionLength || a > 200) return z.none;
        if (e.wholeWords) {
          if (r = t.sliceDoc(s.from, s.to), o = t.charCategorizer(s.head), !(oc(o, t, s.from, s.to) && hx(o, t, s.from, s.to))) return z.none;
        } else if (r = t.sliceDoc(s.from, s.to), !r) return z.none;
      }
      let l = [];
      for (let a of n.visibleRanges) {
        let h = new cn(t.doc, r, a.from, a.to);
        for (; !h.next().done; ) {
          let { from: c, to: f } = h.value;
          if ((!o || oc(o, t, c, f)) && (s.empty && c <= s.from && f >= s.to ? l.push(ax.range(c, f)) : (c >= s.to || f <= s.from) && l.push(lx.range(c, f)), l.length > e.maxMatches)) return z.none;
        }
      }
      return z.set(l);
    }
  }, {
    decorations: (n) => n.decorations
  }), fx = E.baseTheme({
    ".cm-selectionMatch": {
      backgroundColor: "#99ff7780"
    },
    ".cm-searchMatch .cm-selectionMatch": {
      backgroundColor: "transparent"
    }
  }), ux = ({ state: n, dispatch: e }) => {
    let { selection: t } = n, i = v.create(t.ranges.map((s) => n.wordAt(s.head) || v.cursor(s.head)), t.mainIndex);
    return i.eq(t) ? false : (e(n.update({
      selection: i
    })), true);
  };
  function dx(n, e) {
    let { main: t, ranges: i } = n.selection, s = n.wordAt(t.head), r = s && s.from == t.from && s.to == t.to;
    for (let o = false, l = new cn(n.doc, e, i[i.length - 1].to); ; ) if (l.next(), l.done) {
      if (o) return null;
      l = new cn(n.doc, e, 0, Math.max(0, i[i.length - 1].from - 1)), o = true;
    } else {
      if (o && i.some((a) => a.from == l.value.from)) continue;
      if (r) {
        let a = n.wordAt(l.value.from);
        if (!a || a.from != l.value.from || a.to != l.value.to) continue;
      }
      return l.value;
    }
  }
  const px = ({ state: n, dispatch: e }) => {
    let { ranges: t } = n.selection;
    if (t.some((r) => r.from === r.to)) return ux({
      state: n,
      dispatch: e
    });
    let i = n.sliceDoc(t[0].from, t[0].to);
    if (n.selection.ranges.some((r) => n.sliceDoc(r.from, r.to) != i)) return false;
    let s = dx(n, i);
    return s ? (e(n.update({
      selection: n.selection.addRange(v.range(s.from, s.to), false),
      effects: E.scrollIntoView(s.to)
    })), true) : false;
  }, gn = B.define({
    combine(n) {
      return zt(n, {
        top: false,
        caseSensitive: false,
        literal: false,
        regexp: false,
        wholeWord: false,
        createPanel: (e) => new Ax(e),
        scrollToMatch: (e) => E.scrollIntoView(e)
      });
    }
  });
  class Sd {
    constructor(e) {
      this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || tx(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord;
    }
    unquote(e) {
      return this.literal ? e : e.replace(/\\([nrt\\])/g, (t, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
    }
    eq(e) {
      return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord;
    }
    create() {
      return this.regexp ? new yx(this) : new mx(this);
    }
    getCursor(e, t = 0, i) {
      let s = e.doc ? e : ie.create({
        doc: e
      });
      return i == null && (i = s.doc.length), this.regexp ? Xi(this, s, t, i) : qi(this, s, t, i);
    }
  }
  class Od {
    constructor(e) {
      this.spec = e;
    }
  }
  function qi(n, e, t, i) {
    return new cn(e.doc, n.unquoted, t, i, n.caseSensitive ? void 0 : (s) => s.toLowerCase(), n.wholeWord ? gx(e.doc, e.charCategorizer(e.selection.main.head)) : void 0);
  }
  function gx(n, e) {
    return (t, i, s, r) => ((r > t || r + s.length < i) && (r = Math.max(0, t - 2), s = n.sliceString(r, Math.min(n.length, i + 2))), (e(xr(s, t - r)) != me.Word || e(wr(s, t - r)) != me.Word) && (e(wr(s, i - r)) != me.Word || e(xr(s, i - r)) != me.Word));
  }
  class mx extends Od {
    constructor(e) {
      super(e);
    }
    nextMatch(e, t, i) {
      let s = qi(this.spec, e, i, e.doc.length).nextOverlapping();
      if (s.done) {
        let r = Math.min(e.doc.length, t + this.spec.unquoted.length);
        s = qi(this.spec, e, 0, r).nextOverlapping();
      }
      return s.done || s.value.from == t && s.value.to == i ? null : s.value;
    }
    prevMatchInRange(e, t, i) {
      for (let s = i; ; ) {
        let r = Math.max(t, s - 1e4 - this.spec.unquoted.length), o = qi(this.spec, e, r, s), l = null;
        for (; !o.nextOverlapping().done; ) l = o.value;
        if (l) return l;
        if (r == t) return null;
        s -= 1e4;
      }
    }
    prevMatch(e, t, i) {
      let s = this.prevMatchInRange(e, 0, t);
      return s || (s = this.prevMatchInRange(e, Math.max(0, i - this.spec.unquoted.length), e.doc.length)), s && (s.from != t || s.to != i) ? s : null;
    }
    getReplacement(e) {
      return this.spec.unquote(this.spec.replace);
    }
    matchAll(e, t) {
      let i = qi(this.spec, e, 0, e.doc.length), s = [];
      for (; !i.next().done; ) {
        if (s.length >= t) return null;
        s.push(i.value);
      }
      return s;
    }
    highlight(e, t, i, s) {
      let r = qi(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, e.doc.length));
      for (; !r.next().done; ) s(r.value.from, r.value.to);
    }
  }
  function Xi(n, e, t, i) {
    return new kd(e.doc, n.search, {
      ignoreCase: !n.caseSensitive,
      test: n.wholeWord ? bx(e.charCategorizer(e.selection.main.head)) : void 0
    }, t, i);
  }
  function xr(n, e) {
    return n.slice(Ve(n, e, false), e);
  }
  function wr(n, e) {
    return n.slice(e, Ve(n, e));
  }
  function bx(n) {
    return (e, t, i) => !i[0].length || (n(xr(i.input, i.index)) != me.Word || n(wr(i.input, i.index)) != me.Word) && (n(wr(i.input, i.index + i[0].length)) != me.Word || n(xr(i.input, i.index + i[0].length)) != me.Word);
  }
  class yx extends Od {
    nextMatch(e, t, i) {
      let s = Xi(this.spec, e, i, e.doc.length).next();
      return s.done && (s = Xi(this.spec, e, 0, t).next()), s.done ? null : s.value;
    }
    prevMatchInRange(e, t, i) {
      for (let s = 1; ; s++) {
        let r = Math.max(t, i - s * 1e4), o = Xi(this.spec, e, r, i), l = null;
        for (; !o.next().done; ) l = o.value;
        if (l && (r == t || l.from > r + 10)) return l;
        if (r == t) return null;
      }
    }
    prevMatch(e, t, i) {
      return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
    }
    getReplacement(e) {
      return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, i) => {
        if (i == "&") return e.match[0];
        if (i == "$") return "$";
        for (let s = i.length; s > 0; s--) {
          let r = +i.slice(0, s);
          if (r > 0 && r < e.match.length) return e.match[r] + i.slice(s);
        }
        return t;
      });
    }
    matchAll(e, t) {
      let i = Xi(this.spec, e, 0, e.doc.length), s = [];
      for (; !i.next().done; ) {
        if (s.length >= t) return null;
        s.push(i.value);
      }
      return s;
    }
    highlight(e, t, i, s) {
      let r = Xi(this.spec, e, Math.max(0, t - 250), Math.min(i + 250, e.doc.length));
      for (; !r.next().done; ) s(r.value.from, r.value.to);
    }
  }
  const Xn = j.define(), sa = j.define(), gi = Qe.define({
    create(n) {
      return new ko(Sl(n).create(), null);
    },
    update(n, e) {
      for (let t of e.effects) t.is(Xn) ? n = new ko(t.value.create(), n.panel) : t.is(sa) && (n = new ko(n.query, t.value ? ra : null));
      return n;
    },
    provide: (n) => Vn.from(n, (e) => e.panel)
  });
  class ko {
    constructor(e, t) {
      this.query = e, this.panel = t;
    }
  }
  const xx = z.mark({
    class: "cm-searchMatch"
  }), wx = z.mark({
    class: "cm-searchMatch cm-searchMatch-selected"
  }), kx = Oe.fromClass(class {
    constructor(n) {
      this.view = n, this.decorations = this.highlight(n.state.field(gi));
    }
    update(n) {
      let e = n.state.field(gi);
      (e != n.startState.field(gi) || n.docChanged || n.selectionSet || n.viewportChanged) && (this.decorations = this.highlight(e));
    }
    highlight({ query: n, panel: e }) {
      if (!e || !n.spec.valid) return z.none;
      let { view: t } = this, i = new Gt();
      for (let s = 0, r = t.visibleRanges, o = r.length; s < o; s++) {
        let { from: l, to: a } = r[s];
        for (; s < o - 1 && a > r[s + 1].from - 2 * 250; ) a = r[++s].to;
        n.highlight(t.state, l, a, (h, c) => {
          let f = t.state.selection.ranges.some((u) => u.from == h && u.to == c);
          i.add(h, c, f ? wx : xx);
        });
      }
      return i.finish();
    }
  }, {
    decorations: (n) => n.decorations
  });
  function ss(n) {
    return (e) => {
      let t = e.state.field(gi, false);
      return t && t.query.spec.valid ? n(e, t) : Md(e);
    };
  }
  const kr = ss((n, { query: e }) => {
    let { to: t } = n.state.selection.main, i = e.nextMatch(n.state, t, t);
    if (!i) return false;
    let s = v.single(i.from, i.to), r = n.state.facet(gn);
    return n.dispatch({
      selection: s,
      effects: [
        oa(n, i),
        r.scrollToMatch(s.main, n)
      ],
      userEvent: "select.search"
    }), Ad(n), true;
  }), vr = ss((n, { query: e }) => {
    let { state: t } = n, { from: i } = t.selection.main, s = e.prevMatch(t, i, i);
    if (!s) return false;
    let r = v.single(s.from, s.to), o = n.state.facet(gn);
    return n.dispatch({
      selection: r,
      effects: [
        oa(n, s),
        o.scrollToMatch(r.main, n)
      ],
      userEvent: "select.search"
    }), Ad(n), true;
  }), vx = ss((n, { query: e }) => {
    let t = e.matchAll(n.state, 1e3);
    return !t || !t.length ? false : (n.dispatch({
      selection: v.create(t.map((i) => v.range(i.from, i.to))),
      userEvent: "select.search.matches"
    }), true);
  }), Sx = ({ state: n, dispatch: e }) => {
    let t = n.selection;
    if (t.ranges.length > 1 || t.main.empty) return false;
    let { from: i, to: s } = t.main, r = [], o = 0;
    for (let l = new cn(n.doc, n.sliceDoc(i, s)); !l.next().done; ) {
      if (r.length > 1e3) return false;
      l.value.from == i && (o = r.length), r.push(v.range(l.value.from, l.value.to));
    }
    return e(n.update({
      selection: v.create(r, o),
      userEvent: "select.search.matches"
    })), true;
  }, lc = ss((n, { query: e }) => {
    let { state: t } = n, { from: i, to: s } = t.selection.main;
    if (t.readOnly) return false;
    let r = e.nextMatch(t, i, i);
    if (!r) return false;
    let o = r, l = [], a, h, c = [];
    o.from == i && o.to == s && (h = t.toText(e.getReplacement(o)), l.push({
      from: o.from,
      to: o.to,
      insert: h
    }), o = e.nextMatch(t, o.from, o.to), c.push(E.announce.of(t.phrase("replaced match on line $", t.doc.lineAt(i).number) + ".")));
    let f = n.state.changes(l);
    return o && (a = v.single(o.from, o.to).map(f), c.push(oa(n, o)), c.push(t.facet(gn).scrollToMatch(a.main, n))), n.dispatch({
      changes: f,
      selection: a,
      effects: c,
      userEvent: "input.replace"
    }), true;
  }), Ox = ss((n, { query: e }) => {
    if (n.state.readOnly) return false;
    let t = e.matchAll(n.state, 1e9).map((s) => {
      let { from: r, to: o } = s;
      return {
        from: r,
        to: o,
        insert: e.getReplacement(s)
      };
    });
    if (!t.length) return false;
    let i = n.state.phrase("replaced $ matches", t.length) + ".";
    return n.dispatch({
      changes: t,
      effects: E.announce.of(i),
      userEvent: "input.replace.all"
    }), true;
  });
  function ra(n) {
    return n.state.facet(gn).createPanel(n);
  }
  function Sl(n, e) {
    var t, i, s, r, o;
    let l = n.selection.main, a = l.empty || l.to > l.from + 100 ? "" : n.sliceDoc(l.from, l.to);
    if (e && !a) return e;
    let h = n.facet(gn);
    return new Sd({
      search: ((t = e == null ? void 0 : e.literal) !== null && t !== void 0 ? t : h.literal) ? a : a.replace(/\n/g, "\\n"),
      caseSensitive: (i = e == null ? void 0 : e.caseSensitive) !== null && i !== void 0 ? i : h.caseSensitive,
      literal: (s = e == null ? void 0 : e.literal) !== null && s !== void 0 ? s : h.literal,
      regexp: (r = e == null ? void 0 : e.regexp) !== null && r !== void 0 ? r : h.regexp,
      wholeWord: (o = e == null ? void 0 : e.wholeWord) !== null && o !== void 0 ? o : h.wholeWord
    });
  }
  function Cd(n) {
    let e = zn(n, ra);
    return e && e.dom.querySelector("[main-field]");
  }
  function Ad(n) {
    let e = Cd(n);
    e && e == n.root.activeElement && e.select();
  }
  const Md = (n) => {
    let e = n.state.field(gi, false);
    if (e && e.panel) {
      let t = Cd(n);
      if (t && t != n.root.activeElement) {
        let i = Sl(n.state, e.query.spec);
        i.valid && n.dispatch({
          effects: Xn.of(i)
        }), t.focus(), t.select();
      }
    } else n.dispatch({
      effects: [
        sa.of(true),
        e ? Xn.of(Sl(n.state, e.query.spec)) : j.appendConfig.of(Tx)
      ]
    });
    return true;
  }, Td = (n) => {
    let e = n.state.field(gi, false);
    if (!e || !e.panel) return false;
    let t = zn(n, ra);
    return t && t.dom.contains(n.root.activeElement) && n.focus(), n.dispatch({
      effects: sa.of(false)
    }), true;
  }, Cx = [
    {
      key: "Mod-f",
      run: Md,
      scope: "editor search-panel"
    },
    {
      key: "F3",
      run: kr,
      shift: vr,
      scope: "editor search-panel",
      preventDefault: true
    },
    {
      key: "Mod-g",
      run: kr,
      shift: vr,
      scope: "editor search-panel",
      preventDefault: true
    },
    {
      key: "Escape",
      run: Td,
      scope: "editor search-panel"
    },
    {
      key: "Mod-Shift-l",
      run: Sx
    },
    {
      key: "Mod-Alt-g",
      run: ix
    },
    {
      key: "Mod-d",
      run: px,
      preventDefault: true
    }
  ];
  class Ax {
    constructor(e) {
      this.view = e;
      let t = this.query = e.state.field(gi).query.spec;
      this.commit = this.commit.bind(this), this.searchField = ae("input", {
        value: t.search,
        placeholder: ct(e, "Find"),
        "aria-label": ct(e, "Find"),
        class: "cm-textfield",
        name: "search",
        form: "",
        "main-field": "true",
        onchange: this.commit,
        onkeyup: this.commit
      }), this.replaceField = ae("input", {
        value: t.replace,
        placeholder: ct(e, "Replace"),
        "aria-label": ct(e, "Replace"),
        class: "cm-textfield",
        name: "replace",
        form: "",
        onchange: this.commit,
        onkeyup: this.commit
      }), this.caseField = ae("input", {
        type: "checkbox",
        name: "case",
        form: "",
        checked: t.caseSensitive,
        onchange: this.commit
      }), this.reField = ae("input", {
        type: "checkbox",
        name: "re",
        form: "",
        checked: t.regexp,
        onchange: this.commit
      }), this.wordField = ae("input", {
        type: "checkbox",
        name: "word",
        form: "",
        checked: t.wholeWord,
        onchange: this.commit
      });
      function i(s, r, o) {
        return ae("button", {
          class: "cm-button",
          name: s,
          onclick: r,
          type: "button"
        }, o);
      }
      this.dom = ae("div", {
        onkeydown: (s) => this.keydown(s),
        class: "cm-search"
      }, [
        this.searchField,
        i("next", () => kr(e), [
          ct(e, "next")
        ]),
        i("prev", () => vr(e), [
          ct(e, "previous")
        ]),
        i("select", () => vx(e), [
          ct(e, "all")
        ]),
        ae("label", null, [
          this.caseField,
          ct(e, "match case")
        ]),
        ae("label", null, [
          this.reField,
          ct(e, "regexp")
        ]),
        ae("label", null, [
          this.wordField,
          ct(e, "by word")
        ]),
        ...e.state.readOnly ? [] : [
          ae("br"),
          this.replaceField,
          i("replace", () => lc(e), [
            ct(e, "replace")
          ]),
          i("replaceAll", () => Ox(e), [
            ct(e, "replace all")
          ])
        ],
        ae("button", {
          name: "close",
          onclick: () => Td(e),
          "aria-label": ct(e, "close"),
          type: "button"
        }, [
          "\xD7"
        ])
      ]);
    }
    commit() {
      let e = new Sd({
        search: this.searchField.value,
        caseSensitive: this.caseField.checked,
        regexp: this.reField.checked,
        wholeWord: this.wordField.checked,
        replace: this.replaceField.value
      });
      e.eq(this.query) || (this.query = e, this.view.dispatch({
        effects: Xn.of(e)
      }));
    }
    keydown(e) {
      _0(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? vr : kr)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), lc(this.view));
    }
    update(e) {
      for (let t of e.transactions) for (let i of t.effects) i.is(Xn) && !i.value.eq(this.query) && this.setQuery(i.value);
    }
    setQuery(e) {
      this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
    }
    mount() {
      this.searchField.select();
    }
    get pos() {
      return 80;
    }
    get top() {
      return this.view.state.facet(gn).top;
    }
  }
  function ct(n, e) {
    return n.state.phrase(e);
  }
  const Ns = 30, Is = /[\s\.,:;?!]/;
  function oa(n, { from: e, to: t }) {
    let i = n.state.doc.lineAt(e), s = n.state.doc.lineAt(t).to, r = Math.max(i.from, e - Ns), o = Math.min(s, t + Ns), l = n.state.sliceDoc(r, o);
    if (r != i.from) {
      for (let a = 0; a < Ns; a++) if (!Is.test(l[a + 1]) && Is.test(l[a])) {
        l = l.slice(a);
        break;
      }
    }
    if (o != s) {
      for (let a = l.length - 1; a > l.length - Ns; a--) if (!Is.test(l[a - 1]) && Is.test(l[a])) {
        l = l.slice(0, a);
        break;
      }
    }
    return E.announce.of(`${n.state.phrase("current match")}. ${l} ${n.state.phrase("on line")} ${i.number}.`);
  }
  const Mx = E.baseTheme({
    ".cm-panel.cm-search": {
      padding: "2px 6px 4px",
      position: "relative",
      "& [name=close]": {
        position: "absolute",
        top: "0",
        right: "4px",
        backgroundColor: "inherit",
        border: "none",
        font: "inherit",
        padding: 0,
        margin: 0
      },
      "& input, & button, & label": {
        margin: ".2em .6em .2em 0"
      },
      "& input[type=checkbox]": {
        marginRight: ".2em"
      },
      "& label": {
        fontSize: "80%",
        whiteSpace: "pre"
      }
    },
    "&light .cm-searchMatch": {
      backgroundColor: "#ffff0054"
    },
    "&dark .cm-searchMatch": {
      backgroundColor: "#00ffff8a"
    },
    "&light .cm-searchMatch-selected": {
      backgroundColor: "#ff6a0054"
    },
    "&dark .cm-searchMatch-selected": {
      backgroundColor: "#ff00ff8a"
    }
  }), Tx = [
    gi,
    Wi.low(kx),
    Mx
  ];
  class Pd {
    constructor(e, t, i, s) {
      this.state = e, this.pos = t, this.explicit = i, this.view = s, this.abortListeners = [], this.abortOnDocChange = false;
    }
    tokenBefore(e) {
      let t = Ke(this.state).resolveInner(this.pos, -1);
      for (; t && e.indexOf(t.name) < 0; ) t = t.parent;
      return t ? {
        from: t.from,
        to: this.pos,
        text: this.state.sliceDoc(t.from, this.pos),
        type: t.type
      } : null;
    }
    matchBefore(e) {
      let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), s = t.text.slice(i - t.from, this.pos - t.from), r = s.search(Dd(e, false));
      return r < 0 ? null : {
        from: i + r,
        to: this.pos,
        text: s.slice(r)
      };
    }
    get aborted() {
      return this.abortListeners == null;
    }
    addEventListener(e, t, i) {
      e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = true));
    }
  }
  function ac(n) {
    let e = Object.keys(n).join(""), t = /\w/.test(e);
    return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
  }
  function Px(n) {
    let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
    for (let { label: s } of n) {
      e[s[0]] = true;
      for (let r = 1; r < s.length; r++) t[s[r]] = true;
    }
    let i = ac(e) + ac(t) + "*$";
    return [
      new RegExp("^" + i),
      new RegExp(i)
    ];
  }
  function Dx(n) {
    let e = n.map((s) => typeof s == "string" ? {
      label: s
    } : s), [t, i] = e.every((s) => /^\w+$/.test(s.label)) ? [
      /\w*$/,
      /\w+$/
    ] : Px(e);
    return (s) => {
      let r = s.matchBefore(i);
      return r || s.explicit ? {
        from: r ? r.from : s.pos,
        options: e,
        validFor: t
      } : null;
    };
  }
  class hc {
    constructor(e, t, i, s) {
      this.completion = e, this.source = t, this.match = i, this.score = s;
    }
  }
  function Bi(n) {
    return n.selection.main.from;
  }
  function Dd(n, e) {
    var t;
    let { source: i } = n, s = e && i[0] != "^", r = i[i.length - 1] != "$";
    return !s && !r ? n : new RegExp(`${s ? "^" : ""}(?:${i})${r ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
  }
  const Rd = ei.define();
  function Rx(n, e, t, i) {
    let { main: s } = n.selection, r = t - s.from, o = i - s.from;
    return Object.assign(Object.assign({}, n.changeByRange((l) => {
      if (l != s && t != i && n.sliceDoc(l.from + r, l.from + o) != n.sliceDoc(t, i)) return {
        range: l
      };
      let a = n.toText(e);
      return {
        changes: {
          from: l.from + r,
          to: i == s.from ? l.to : l.from + o,
          insert: a
        },
        range: v.cursor(l.from + r + a.length)
      };
    })), {
      scrollIntoView: true,
      userEvent: "input.complete"
    });
  }
  const cc = /* @__PURE__ */ new WeakMap();
  function Ex(n) {
    if (!Array.isArray(n)) return n;
    let e = cc.get(n);
    return e || cc.set(n, e = Dx(n)), e;
  }
  const Sr = j.define(), Un = j.define();
  class Bx {
    constructor(e) {
      this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
      for (let t = 0; t < e.length; ) {
        let i = tt(e, t), s = Lt(i);
        this.chars.push(i);
        let r = e.slice(t, t + s), o = r.toUpperCase();
        this.folded.push(tt(o == r ? r.toLowerCase() : o, 0)), t += s;
      }
      this.astral = e.length != this.chars.length;
    }
    ret(e, t) {
      return this.score = e, this.matched = t, this;
    }
    match(e) {
      if (this.pattern.length == 0) return this.ret(-100, []);
      if (e.length < this.pattern.length) return null;
      let { chars: t, folded: i, any: s, precise: r, byWord: o } = this;
      if (t.length == 1) {
        let S = tt(e, 0), A = Lt(S), C = A == e.length ? 0 : -100;
        if (S != t[0]) if (S == i[0]) C += -200;
        else return null;
        return this.ret(C, [
          0,
          A
        ]);
      }
      let l = e.indexOf(this.pattern);
      if (l == 0) return this.ret(e.length == this.pattern.length ? 0 : -100, [
        0,
        this.pattern.length
      ]);
      let a = t.length, h = 0;
      if (l < 0) {
        for (let S = 0, A = Math.min(e.length, 200); S < A && h < a; ) {
          let C = tt(e, S);
          (C == t[h] || C == i[h]) && (s[h++] = S), S += Lt(C);
        }
        if (h < a) return null;
      }
      let c = 0, f = 0, u = false, d = 0, p = -1, g = -1, b = /[a-z]/.test(e), y = true;
      for (let S = 0, A = Math.min(e.length, 200), C = 0; S < A && f < a; ) {
        let w = tt(e, S);
        l < 0 && (c < a && w == t[c] && (r[c++] = S), d < a && (w == t[d] || w == i[d] ? (d == 0 && (p = S), g = S + 1, d++) : d = 0));
        let O, M = w < 255 ? w >= 48 && w <= 57 || w >= 97 && w <= 122 ? 2 : w >= 65 && w <= 90 ? 1 : 0 : (O = El(w)) != O.toLowerCase() ? 1 : O != O.toUpperCase() ? 2 : 0;
        (!S || M == 1 && b || C == 0 && M != 0) && (t[f] == w || i[f] == w && (u = true) ? o[f++] = S : o.length && (y = false)), C = M, S += Lt(w);
      }
      return f == a && o[0] == 0 && y ? this.result(-100 + (u ? -200 : 0), o, e) : d == a && p == 0 ? this.ret(-200 - e.length + (g == e.length ? 0 : -100), [
        0,
        g
      ]) : l > -1 ? this.ret(-700 - e.length, [
        l,
        l + this.pattern.length
      ]) : d == a ? this.ret(-900 - e.length, [
        p,
        g
      ]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (y ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
    }
    result(e, t, i) {
      let s = [], r = 0;
      for (let o of t) {
        let l = o + (this.astral ? Lt(tt(i, o)) : 1);
        r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
      }
      return this.ret(e - i.length, s);
    }
  }
  class Lx {
    constructor(e) {
      this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
    }
    match(e) {
      if (e.length < this.pattern.length) return null;
      let t = e.slice(0, this.pattern.length), i = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
      return i == null ? null : (this.matched = [
        0,
        t.length
      ], this.score = i + (e.length == this.pattern.length ? 0 : -100), this);
    }
  }
  const Ne = B.define({
    combine(n) {
      return zt(n, {
        activateOnTyping: true,
        activateOnCompletion: () => false,
        activateOnTypingDelay: 100,
        selectOnOpen: true,
        override: null,
        closeOnBlur: true,
        maxRenderedOptions: 100,
        defaultKeymap: true,
        tooltipClass: () => "",
        optionClass: () => "",
        aboveCursor: false,
        icons: true,
        addToOptions: [],
        positionInfo: _x,
        filterStrict: false,
        compareCompletions: (e, t) => e.label.localeCompare(t.label),
        interactionDelay: 75,
        updateSyncTime: 100
      }, {
        defaultKeymap: (e, t) => e && t,
        closeOnBlur: (e, t) => e && t,
        icons: (e, t) => e && t,
        tooltipClass: (e, t) => (i) => fc(e(i), t(i)),
        optionClass: (e, t) => (i) => fc(e(i), t(i)),
        addToOptions: (e, t) => e.concat(t),
        filterStrict: (e, t) => e || t
      });
    }
  });
  function fc(n, e) {
    return n ? e ? n + " " + e : n : e;
  }
  function _x(n, e, t, i, s, r) {
    let o = n.textDirection == ge.RTL, l = o, a = false, h = "top", c, f, u = e.left - s.left, d = s.right - e.right, p = i.right - i.left, g = i.bottom - i.top;
    if (l && u < Math.min(p, d) ? l = false : !l && d < Math.min(p, u) && (l = true), p <= (l ? u : d)) c = Math.max(s.top, Math.min(t.top, s.bottom - g)) - e.top, f = Math.min(400, l ? u : d);
    else {
      a = true, f = Math.min(400, (o ? e.right : s.right - e.left) - 30);
      let S = s.bottom - e.bottom;
      S >= g || S > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
    }
    let b = (e.bottom - e.top) / r.offsetHeight, y = (e.right - e.left) / r.offsetWidth;
    return {
      style: `${h}: ${c / b}px; max-width: ${f / y}px`,
      class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
    };
  }
  function Nx(n) {
    let e = n.addToOptions.slice();
    return n.icons && e.push({
      render(t) {
        let i = document.createElement("div");
        return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), i.setAttribute("aria-hidden", "true"), i;
      },
      position: 20
    }), e.push({
      render(t, i, s, r) {
        let o = document.createElement("span");
        o.className = "cm-completionLabel";
        let l = t.displayLabel || t.label, a = 0;
        for (let h = 0; h < r.length; ) {
          let c = r[h++], f = r[h++];
          c > a && o.appendChild(document.createTextNode(l.slice(a, c)));
          let u = o.appendChild(document.createElement("span"));
          u.appendChild(document.createTextNode(l.slice(c, f))), u.className = "cm-completionMatchedText", a = f;
        }
        return a < l.length && o.appendChild(document.createTextNode(l.slice(a))), o;
      },
      position: 50
    }, {
      render(t) {
        if (!t.detail) return null;
        let i = document.createElement("span");
        return i.className = "cm-completionDetail", i.textContent = t.detail, i;
      },
      position: 80
    }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
  }
  function vo(n, e, t) {
    if (n <= t) return {
      from: 0,
      to: n
    };
    if (e < 0 && (e = 0), e <= n >> 1) {
      let s = Math.floor(e / t);
      return {
        from: s * t,
        to: (s + 1) * t
      };
    }
    let i = Math.floor((n - e) / t);
    return {
      from: n - (i + 1) * t,
      to: n - i * t
    };
  }
  class Ix {
    constructor(e, t, i) {
      this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
        read: () => this.measureInfo(),
        write: (a) => this.placeInfo(a),
        key: this
      }, this.space = null, this.currentClass = "";
      let s = e.state.field(t), { options: r, selected: o } = s.open, l = e.state.facet(Ne);
      this.optionContent = Nx(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = vo(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
        let { options: h } = e.state.field(t).open;
        for (let c = a.target, f; c && c != this.dom; c = c.parentNode) if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
      }), this.dom.addEventListener("focusout", (a) => {
        let h = e.state.field(this.stateField, false);
        h && h.tooltip && e.state.facet(Ne).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({
          effects: Un.of(null)
        });
      }), this.showOptions(r, s.id);
    }
    mount() {
      this.updateSel();
    }
    showOptions(e, t) {
      this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
        this.info && this.view.requestMeasure(this.placeInfoReq);
      });
    }
    update(e) {
      var t;
      let i = e.state.field(this.stateField), s = e.startState.field(this.stateField);
      if (this.updateTooltipClass(e.state), i != s) {
        let { options: r, selected: o, disabled: l } = i.open;
        (!s.open || s.open.options != r) && (this.range = vo(r.length, o, e.state.facet(Ne).maxRenderedOptions), this.showOptions(r, i.id)), this.updateSel(), l != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
      }
    }
    updateTooltipClass(e) {
      let t = this.tooltipClass(e);
      if (t != this.currentClass) {
        for (let i of this.currentClass.split(" ")) i && this.dom.classList.remove(i);
        for (let i of t.split(" ")) i && this.dom.classList.add(i);
        this.currentClass = t;
      }
    }
    positioned(e) {
      this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
    }
    updateSel() {
      let e = this.view.state.field(this.stateField), t = e.open;
      if ((t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = vo(t.options.length, t.selected, this.view.state.facet(Ne).maxRenderedOptions), this.showOptions(t.options, e.id)), this.updateSelectedOption(t.selected)) {
        this.destroyInfo();
        let { completion: i } = t.options[t.selected], { info: s } = i;
        if (!s) return;
        let r = typeof s == "string" ? document.createTextNode(s) : s(i);
        if (!r) return;
        "then" in r ? r.then((o) => {
          o && this.view.state.field(this.stateField, false) == e && this.addInfoPane(o, i);
        }).catch((o) => st(this.view.state, o, "completion info")) : this.addInfoPane(r, i);
      }
    }
    addInfoPane(e, t) {
      this.destroyInfo();
      let i = this.info = document.createElement("div");
      if (i.className = "cm-tooltip cm-completionInfo", e.nodeType != null) i.appendChild(e), this.infoDestroy = null;
      else {
        let { dom: s, destroy: r } = e;
        i.appendChild(s), this.infoDestroy = r || null;
      }
      this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
    }
    updateSelectedOption(e) {
      let t = null;
      for (let i = this.list.firstChild, s = this.range.from; i; i = i.nextSibling, s++) i.nodeName != "LI" || !i.id ? s-- : s == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && i.removeAttribute("aria-selected");
      return t && Hx(this.list, t), t;
    }
    measureInfo() {
      let e = this.dom.querySelector("[aria-selected]");
      if (!e || !this.info) return null;
      let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), s = e.getBoundingClientRect(), r = this.space;
      if (!r) {
        let o = this.dom.ownerDocument.documentElement;
        r = {
          left: 0,
          top: 0,
          right: o.clientWidth,
          bottom: o.clientHeight
        };
      }
      return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(Ne).positionInfo(this.view, t, s, i, r, this.dom);
    }
    placeInfo(e) {
      this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
    }
    createListBox(e, t, i) {
      const s = document.createElement("ul");
      s.id = t, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions")), s.addEventListener("mousedown", (o) => {
        o.target == s && o.preventDefault();
      });
      let r = null;
      for (let o = i.from; o < i.to; o++) {
        let { completion: l, match: a } = e[o], { section: h } = l;
        if (h) {
          let u = typeof h == "string" ? h : h.name;
          if (u != r && (o > i.from || i.from == 0)) if (r = u, typeof h != "string" && h.header) s.appendChild(h.header(h));
          else {
            let d = s.appendChild(document.createElement("completion-section"));
            d.textContent = u;
          }
        }
        const c = s.appendChild(document.createElement("li"));
        c.id = t + "-" + o, c.setAttribute("role", "option");
        let f = this.optionClass(l);
        f && (c.className = f);
        for (let u of this.optionContent) {
          let d = u(l, this.view.state, this.view, a);
          d && c.appendChild(d);
        }
      }
      return i.from && s.classList.add("cm-completionListIncompleteTop"), i.to < e.length && s.classList.add("cm-completionListIncompleteBottom"), s;
    }
    destroyInfo() {
      this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
    }
    destroy() {
      this.destroyInfo();
    }
  }
  function Fx(n, e) {
    return (t) => new Ix(t, n, e);
  }
  function Hx(n, e) {
    let t = n.getBoundingClientRect(), i = e.getBoundingClientRect(), s = t.height / n.offsetHeight;
    i.top < t.top ? n.scrollTop -= (t.top - i.top) / s : i.bottom > t.bottom && (n.scrollTop += (i.bottom - t.bottom) / s);
  }
  function uc(n) {
    return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
  }
  function Wx(n, e) {
    let t = [], i = null, s = (h) => {
      t.push(h);
      let { section: c } = h.completion;
      if (c) {
        i || (i = []);
        let f = typeof c == "string" ? c : c.name;
        i.some((u) => u.name == f) || i.push(typeof c == "string" ? {
          name: f
        } : c);
      }
    }, r = e.facet(Ne);
    for (let h of n) if (h.hasResult()) {
      let c = h.result.getMatch;
      if (h.result.filter === false) for (let f of h.result.options) s(new hc(f, h.source, c ? c(f) : [], 1e9 - t.length));
      else {
        let f = e.sliceDoc(h.from, h.to), u, d = r.filterStrict ? new Lx(f) : new Bx(f);
        for (let p of h.result.options) if (u = d.match(p.label)) {
          let g = p.displayLabel ? c ? c(p, u.matched) : [] : u.matched;
          s(new hc(p, h.source, g, u.score + (p.boost || 0)));
        }
      }
    }
    if (i) {
      let h = /* @__PURE__ */ Object.create(null), c = 0, f = (u, d) => {
        var p, g;
        return ((p = u.rank) !== null && p !== void 0 ? p : 1e9) - ((g = d.rank) !== null && g !== void 0 ? g : 1e9) || (u.name < d.name ? -1 : 1);
      };
      for (let u of i.sort(f)) c -= 1e5, h[u.name] = c;
      for (let u of t) {
        let { section: d } = u.completion;
        d && (u.score += h[typeof d == "string" ? d : d.name]);
      }
    }
    let o = [], l = null, a = r.compareCompletions;
    for (let h of t.sort((c, f) => f.score - c.score || a(c.completion, f.completion))) {
      let c = h.completion;
      !l || l.label != c.label || l.detail != c.detail || l.type != null && c.type != null && l.type != c.type || l.apply != c.apply || l.boost != c.boost ? o.push(h) : uc(h.completion) > uc(l) && (o[o.length - 1] = h), l = h.completion;
    }
    return o;
  }
  class Gi {
    constructor(e, t, i, s, r, o) {
      this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = s, this.selected = r, this.disabled = o;
    }
    setSelected(e, t) {
      return e == this.selected || e >= this.options.length ? this : new Gi(this.options, dc(t, e), this.tooltip, this.timestamp, e, this.disabled);
    }
    static build(e, t, i, s, r, o) {
      if (s && !o && e.some((h) => h.isPending)) return s.setDisabled();
      let l = Wx(e, t);
      if (!l.length) return s && e.some((h) => h.isPending) ? s.setDisabled() : null;
      let a = t.facet(Ne).selectOnOpen ? 0 : -1;
      if (s && s.selected != a && s.selected != -1) {
        let h = s.options[s.selected].completion;
        for (let c = 0; c < l.length; c++) if (l[c].completion == h) {
          a = c;
          break;
        }
      }
      return new Gi(l, dc(i, a), {
        pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
        create: Ux,
        above: r.aboveCursor
      }, s ? s.timestamp : Date.now(), a, false);
    }
    map(e) {
      return new Gi(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), {
        pos: e.mapPos(this.tooltip.pos)
      }), this.timestamp, this.selected, this.disabled);
    }
    setDisabled() {
      return new Gi(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, true);
    }
  }
  class Or {
    constructor(e, t, i) {
      this.active = e, this.id = t, this.open = i;
    }
    static start() {
      return new Or(qx, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
    }
    update(e) {
      let { state: t } = e, i = t.facet(Ne), r = (i.override || t.languageDataAt("autocomplete", Bi(t)).map(Ex)).map((a) => (this.active.find((c) => c.source == a) || new gt(a, this.active.some((c) => c.state != 0) ? 1 : 0)).update(e, i));
      r.length == this.active.length && r.every((a, h) => a == this.active[h]) && (r = this.active);
      let o = this.open, l = e.effects.some((a) => a.is(la));
      o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !zx(r, this.active) || l ? o = Gi.build(r, t, this.id, o, i, l) : o && o.disabled && !r.some((a) => a.isPending) && (o = null), !o && r.every((a) => !a.isPending) && r.some((a) => a.hasResult()) && (r = r.map((a) => a.hasResult() ? new gt(a.source, 0) : a));
      for (let a of e.effects) a.is(Bd) && (o = o && o.setSelected(a.value, this.id));
      return r == this.active && o == this.open ? this : new Or(r, this.id, o);
    }
    get tooltip() {
      return this.open ? this.open.tooltip : null;
    }
    get attrs() {
      return this.open ? this.open.attrs : this.active.length ? Vx : Qx;
    }
  }
  function zx(n, e) {
    if (n == e) return true;
    for (let t = 0, i = 0; ; ) {
      for (; t < n.length && !n[t].hasResult(); ) t++;
      for (; i < e.length && !e[i].hasResult(); ) i++;
      let s = t == n.length, r = i == e.length;
      if (s || r) return s == r;
      if (n[t++].result != e[i++].result) return false;
    }
  }
  const Vx = {
    "aria-autocomplete": "list"
  }, Qx = {};
  function dc(n, e) {
    let t = {
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-controls": n
    };
    return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
  }
  const qx = [];
  function Ed(n, e) {
    if (n.isUserEvent("input.complete")) {
      let i = n.annotation(Rd);
      if (i && e.activateOnCompletion(i)) return 12;
    }
    let t = n.isUserEvent("input.type");
    return t && e.activateOnTyping ? 5 : t ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
  }
  class gt {
    constructor(e, t, i = false) {
      this.source = e, this.state = t, this.explicit = i;
    }
    hasResult() {
      return false;
    }
    get isPending() {
      return this.state == 1;
    }
    update(e, t) {
      let i = Ed(e, t), s = this;
      (i & 8 || i & 16 && this.touches(e)) && (s = new gt(s.source, 0)), i & 4 && s.state == 0 && (s = new gt(this.source, 1)), s = s.updateFor(e, i);
      for (let r of e.effects) if (r.is(Sr)) s = new gt(s.source, 1, r.value);
      else if (r.is(Un)) s = new gt(s.source, 0);
      else if (r.is(la)) for (let o of r.value) o.source == s.source && (s = o);
      return s;
    }
    updateFor(e, t) {
      return this.map(e.changes);
    }
    map(e) {
      return this;
    }
    touches(e) {
      return e.changes.touchesRange(Bi(e.state));
    }
  }
  class tn extends gt {
    constructor(e, t, i, s, r, o) {
      super(e, 3, t), this.limit = i, this.result = s, this.from = r, this.to = o;
    }
    hasResult() {
      return true;
    }
    updateFor(e, t) {
      var i;
      if (!(t & 3)) return this.map(e.changes);
      let s = this.result;
      s.map && !e.changes.empty && (s = s.map(s, e.changes));
      let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = Bi(e.state);
      if (l > o || !s || t & 2 && (Bi(e.startState) == this.from || l < this.limit)) return new gt(this.source, t & 4 ? 1 : 0);
      let a = e.changes.mapPos(this.limit);
      return Xx(s.validFor, e.state, r, o) ? new tn(this.source, this.explicit, a, s, r, o) : s.update && (s = s.update(s, r, o, new Pd(e.state, l, false))) ? new tn(this.source, this.explicit, a, s, s.from, (i = s.to) !== null && i !== void 0 ? i : Bi(e.state)) : new gt(this.source, 1, this.explicit);
    }
    map(e) {
      return e.empty ? this : (this.result.map ? this.result.map(this.result, e) : this.result) ? new tn(this.source, this.explicit, e.mapPos(this.limit), this.result, e.mapPos(this.from), e.mapPos(this.to, 1)) : new gt(this.source, 0);
    }
    touches(e) {
      return e.changes.touchesRange(this.from, this.to);
    }
  }
  function Xx(n, e, t, i) {
    if (!n) return false;
    let s = e.sliceDoc(t, i);
    return typeof n == "function" ? n(s, t, i, e) : Dd(n, true).test(s);
  }
  const la = j.define({
    map(n, e) {
      return n.map((t) => t.map(e));
    }
  }), Bd = j.define(), nt = Qe.define({
    create() {
      return Or.start();
    },
    update(n, e) {
      return n.update(e);
    },
    provide: (n) => [
      $l.from(n, (e) => e.tooltip),
      E.contentAttributes.from(n, (e) => e.attrs)
    ]
  });
  function aa(n, e) {
    const t = e.completion.apply || e.completion.label;
    let i = n.state.field(nt).active.find((s) => s.source == e.source);
    return i instanceof tn ? (typeof t == "string" ? n.dispatch(Object.assign(Object.assign({}, Rx(n.state, t, i.from, i.to)), {
      annotations: Rd.of(e.completion)
    })) : t(n, e.completion, i.from, i.to), true) : false;
  }
  const Ux = Fx(nt, aa);
  function Fs(n, e = "option") {
    return (t) => {
      let i = t.state.field(nt, false);
      if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(Ne).interactionDelay) return false;
      let s = 1, r;
      e == "page" && (r = du(t, i.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
      let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + s * (n ? 1 : -1) : n ? 0 : o - 1;
      return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({
        effects: Bd.of(l)
      }), true;
    };
  }
  const $x = (n) => {
    let e = n.state.field(nt, false);
    return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(Ne).interactionDelay ? false : aa(n, e.open.options[e.open.selected]);
  }, pc = (n) => n.state.field(nt, false) ? (n.dispatch({
    effects: Sr.of(true)
  }), true) : false, jx = (n) => {
    let e = n.state.field(nt, false);
    return !e || !e.active.some((t) => t.state != 0) ? false : (n.dispatch({
      effects: Un.of(null)
    }), true);
  };
  class Kx {
    constructor(e, t) {
      this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
    }
  }
  const Gx = 50, Yx = 1e3, Jx = Oe.fromClass(class {
    constructor(n) {
      this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = false, this.composing = 0;
      for (let e of n.state.field(nt).active) e.isPending && this.startQuery(e);
    }
    update(n) {
      let e = n.state.field(nt), t = n.state.facet(Ne);
      if (!n.selectionSet && !n.docChanged && n.startState.field(nt) == e) return;
      let i = n.transactions.some((r) => {
        let o = Ed(r, t);
        return o & 8 || (r.selection || r.docChanged) && !(o & 3);
      });
      for (let r = 0; r < this.running.length; r++) {
        let o = this.running[r];
        if (i || o.context.abortOnDocChange && n.docChanged || o.updates.length + n.transactions.length > Gx && Date.now() - o.time > Yx) {
          for (let l of o.context.abortListeners) try {
            l();
          } catch (a) {
            st(this.view.state, a);
          }
          o.context.abortListeners = null, this.running.splice(r--, 1);
        } else o.updates.push(...n.transactions);
      }
      this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((r) => r.effects.some((o) => o.is(Sr))) && (this.pendingStart = true);
      let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
      if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0) for (let r of n.transactions) r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
    }
    startUpdate() {
      this.debounceUpdate = -1, this.pendingStart = false;
      let { state: n } = this.view, e = n.field(nt);
      for (let t of e.active) t.isPending && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
      this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Ne).updateSyncTime));
    }
    startQuery(n) {
      let { state: e } = this.view, t = Bi(e), i = new Pd(e, t, n.explicit, this.view), s = new Kx(n, i);
      this.running.push(s), Promise.resolve(n.source(i)).then((r) => {
        s.context.aborted || (s.done = r || null, this.scheduleAccept());
      }, (r) => {
        this.view.dispatch({
          effects: Un.of(null)
        }), st(this.view.state, r);
      });
    }
    scheduleAccept() {
      this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Ne).updateSyncTime));
    }
    accept() {
      var n;
      this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
      let e = [], t = this.view.state.facet(Ne), i = this.view.state.field(nt);
      for (let s = 0; s < this.running.length; s++) {
        let r = this.running[s];
        if (r.done === void 0) continue;
        if (this.running.splice(s--, 1), r.done) {
          let l = Bi(r.updates.length ? r.updates[0].startState : this.view.state), a = Math.min(l, r.done.from + (r.active.explicit ? 0 : 1)), h = new tn(r.active.source, r.active.explicit, a, r.done, r.done.from, (n = r.done.to) !== null && n !== void 0 ? n : l);
          for (let c of r.updates) h = h.update(c, t);
          if (h.hasResult()) {
            e.push(h);
            continue;
          }
        }
        let o = i.active.find((l) => l.source == r.active.source);
        if (o && o.isPending) if (r.done == null) {
          let l = new gt(r.active.source, 0);
          for (let a of r.updates) l = l.update(a, t);
          l.isPending || e.push(l);
        } else this.startQuery(o);
      }
      (e.length || i.open && i.open.disabled) && this.view.dispatch({
        effects: la.of(e)
      });
    }
  }, {
    eventHandlers: {
      blur(n) {
        let e = this.view.state.field(nt, false);
        if (e && e.tooltip && this.view.state.facet(Ne).closeOnBlur) {
          let t = e.open && du(this.view, e.open.tooltip);
          (!t || !t.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({
            effects: Un.of(null)
          }), 10);
        }
      },
      compositionstart() {
        this.composing = 1;
      },
      compositionend() {
        this.composing == 3 && setTimeout(() => this.view.dispatch({
          effects: Sr.of(false)
        }), 20), this.composing = 0;
      }
    }
  }), Zx = typeof navigator == "object" && /Win/.test(navigator.platform), ew = Wi.highest(E.domEventHandlers({
    keydown(n, e) {
      let t = e.state.field(nt, false);
      if (!t || !t.open || t.open.disabled || t.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(Zx && n.altKey) || n.metaKey) return false;
      let i = t.open.options[t.open.selected], s = t.active.find((o) => o.source == i.source), r = i.completion.commitCharacters || s.result.commitCharacters;
      return r && r.indexOf(n.key) > -1 && aa(e, i), false;
    }
  })), tw = E.baseTheme({
    ".cm-tooltip.cm-tooltip-autocomplete": {
      "& > ul": {
        fontFamily: "monospace",
        whiteSpace: "nowrap",
        overflow: "hidden auto",
        maxWidth_fallback: "700px",
        maxWidth: "min(700px, 95vw)",
        minWidth: "250px",
        maxHeight: "10em",
        height: "100%",
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& > li, & > completion-section": {
          padding: "1px 3px",
          lineHeight: 1.2
        },
        "& > li": {
          overflowX: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer"
        },
        "& > completion-section": {
          display: "list-item",
          borderBottom: "1px solid silver",
          paddingLeft: "0.5em",
          opacity: 0.7
        }
      }
    },
    "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
      background: "#17c",
      color: "white"
    },
    "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
      background: "#777"
    },
    "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
      background: "#347",
      color: "white"
    },
    "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
      background: "#444"
    },
    ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
      content: '"\xB7\xB7\xB7"',
      opacity: 0.5,
      display: "block",
      textAlign: "center"
    },
    ".cm-tooltip.cm-completionInfo": {
      position: "absolute",
      padding: "3px 9px",
      width: "max-content",
      maxWidth: "400px",
      boxSizing: "border-box",
      whiteSpace: "pre-line"
    },
    ".cm-completionInfo.cm-completionInfo-left": {
      right: "100%"
    },
    ".cm-completionInfo.cm-completionInfo-right": {
      left: "100%"
    },
    ".cm-completionInfo.cm-completionInfo-left-narrow": {
      right: "30px"
    },
    ".cm-completionInfo.cm-completionInfo-right-narrow": {
      left: "30px"
    },
    "&light .cm-snippetField": {
      backgroundColor: "#00000022"
    },
    "&dark .cm-snippetField": {
      backgroundColor: "#ffffff22"
    },
    ".cm-snippetFieldPosition": {
      verticalAlign: "text-top",
      width: 0,
      height: "1.15em",
      display: "inline-block",
      margin: "0 -0.7px -.7em",
      borderLeft: "1.4px dotted #888"
    },
    ".cm-completionMatchedText": {
      textDecoration: "underline"
    },
    ".cm-completionDetail": {
      marginLeft: "0.5em",
      fontStyle: "italic"
    },
    ".cm-completionIcon": {
      fontSize: "90%",
      width: ".8em",
      display: "inline-block",
      textAlign: "center",
      paddingRight: ".6em",
      opacity: "0.6",
      boxSizing: "content-box"
    },
    ".cm-completionIcon-function, .cm-completionIcon-method": {
      "&:after": {
        content: "'\u0192'"
      }
    },
    ".cm-completionIcon-class": {
      "&:after": {
        content: "'\u25CB'"
      }
    },
    ".cm-completionIcon-interface": {
      "&:after": {
        content: "'\u25CC'"
      }
    },
    ".cm-completionIcon-variable": {
      "&:after": {
        content: "'\u{1D465}'"
      }
    },
    ".cm-completionIcon-constant": {
      "&:after": {
        content: "'\u{1D436}'"
      }
    },
    ".cm-completionIcon-type": {
      "&:after": {
        content: "'\u{1D461}'"
      }
    },
    ".cm-completionIcon-enum": {
      "&:after": {
        content: "'\u222A'"
      }
    },
    ".cm-completionIcon-property": {
      "&:after": {
        content: "'\u25A1'"
      }
    },
    ".cm-completionIcon-keyword": {
      "&:after": {
        content: "'\u{1F511}\uFE0E'"
      }
    },
    ".cm-completionIcon-namespace": {
      "&:after": {
        content: "'\u25A2'"
      }
    },
    ".cm-completionIcon-text": {
      "&:after": {
        content: "'abc'",
        fontSize: "50%",
        verticalAlign: "middle"
      }
    }
  }), $n = {
    brackets: [
      "(",
      "[",
      "{",
      "'",
      '"'
    ],
    before: ")]}:;>",
    stringPrefixes: []
  }, Di = j.define({
    map(n, e) {
      let t = e.mapPos(n, -1, Ye.TrackAfter);
      return t ?? void 0;
    }
  }), ha = new class extends _i {
  }();
  ha.startSide = 1;
  ha.endSide = -1;
  const Ld = Qe.define({
    create() {
      return re.empty;
    },
    update(n, e) {
      if (n = n.map(e.changes), e.selection) {
        let t = e.state.doc.lineAt(e.selection.main.head);
        n = n.update({
          filter: (i) => i >= t.from && i <= t.to
        });
      }
      for (let t of e.effects) t.is(Di) && (n = n.update({
        add: [
          ha.range(t.value, t.value + 1)
        ]
      }));
      return n;
    }
  });
  function iw() {
    return [
      sw,
      Ld
    ];
  }
  const So = "()[]{}<>\xAB\xBB\xBB\xAB\uFF3B\uFF3D\uFF5B\uFF5D";
  function _d(n) {
    for (let e = 0; e < So.length; e += 2) if (So.charCodeAt(e) == n) return So.charAt(e + 1);
    return El(n < 128 ? n : n + 1);
  }
  function Nd(n, e) {
    return n.languageDataAt("closeBrackets", e)[0] || $n;
  }
  const nw = typeof navigator == "object" && /Android\b/.test(navigator.userAgent), sw = E.inputHandler.of((n, e, t, i) => {
    if ((nw ? n.composing : n.compositionStarted) || n.state.readOnly) return false;
    let s = n.state.selection.main;
    if (i.length > 2 || i.length == 2 && Lt(tt(i, 0)) == 1 || e != s.from || t != s.to) return false;
    let r = lw(n.state, i);
    return r ? (n.dispatch(r), true) : false;
  }), rw = ({ state: n, dispatch: e }) => {
    if (n.readOnly) return false;
    let i = Nd(n, n.selection.main.head).brackets || $n.brackets, s = null, r = n.changeByRange((o) => {
      if (o.empty) {
        let l = aw(n.doc, o.head);
        for (let a of i) if (a == l && zr(n.doc, o.head) == _d(tt(a, 0))) return {
          changes: {
            from: o.head - a.length,
            to: o.head + a.length
          },
          range: v.cursor(o.head - a.length)
        };
      }
      return {
        range: s = o
      };
    });
    return s || e(n.update(r, {
      scrollIntoView: true,
      userEvent: "delete.backward"
    })), !s;
  }, ow = [
    {
      key: "Backspace",
      run: rw
    }
  ];
  function lw(n, e) {
    let t = Nd(n, n.selection.main.head), i = t.brackets || $n.brackets;
    for (let s of i) {
      let r = _d(tt(s, 0));
      if (e == s) return r == s ? fw(n, s, i.indexOf(s + s + s) > -1, t) : hw(n, s, r, t.before || $n.before);
      if (e == r && Id(n, n.selection.main.from)) return cw(n, s, r);
    }
    return null;
  }
  function Id(n, e) {
    let t = false;
    return n.field(Ld).between(0, n.doc.length, (i) => {
      i == e && (t = true);
    }), t;
  }
  function zr(n, e) {
    let t = n.sliceString(e, e + 2);
    return t.slice(0, Lt(tt(t, 0)));
  }
  function aw(n, e) {
    let t = n.sliceString(e - 2, e);
    return Lt(tt(t, 0)) == t.length ? t : t.slice(1);
  }
  function hw(n, e, t, i) {
    let s = null, r = n.changeByRange((o) => {
      if (!o.empty) return {
        changes: [
          {
            insert: e,
            from: o.from
          },
          {
            insert: t,
            from: o.to
          }
        ],
        effects: Di.of(o.to + e.length),
        range: v.range(o.anchor + e.length, o.head + e.length)
      };
      let l = zr(n.doc, o.head);
      return !l || /\s/.test(l) || i.indexOf(l) > -1 ? {
        changes: {
          insert: e + t,
          from: o.head
        },
        effects: Di.of(o.head + e.length),
        range: v.cursor(o.head + e.length)
      } : {
        range: s = o
      };
    });
    return s ? null : n.update(r, {
      scrollIntoView: true,
      userEvent: "input.type"
    });
  }
  function cw(n, e, t) {
    let i = null, s = n.changeByRange((r) => r.empty && zr(n.doc, r.head) == t ? {
      changes: {
        from: r.head,
        to: r.head + t.length,
        insert: t
      },
      range: v.cursor(r.head + t.length)
    } : i = {
      range: r
    });
    return i ? null : n.update(s, {
      scrollIntoView: true,
      userEvent: "input.type"
    });
  }
  function fw(n, e, t, i) {
    let s = i.stringPrefixes || $n.stringPrefixes, r = null, o = n.changeByRange((l) => {
      if (!l.empty) return {
        changes: [
          {
            insert: e,
            from: l.from
          },
          {
            insert: e,
            from: l.to
          }
        ],
        effects: Di.of(l.to + e.length),
        range: v.range(l.anchor + e.length, l.head + e.length)
      };
      let a = l.head, h = zr(n.doc, a), c;
      if (h == e) {
        if (gc(n, a)) return {
          changes: {
            insert: e + e,
            from: a
          },
          effects: Di.of(a + e.length),
          range: v.cursor(a + e.length)
        };
        if (Id(n, a)) {
          let u = t && n.sliceDoc(a, a + e.length * 3) == e + e + e ? e + e + e : e;
          return {
            changes: {
              from: a,
              to: a + u.length,
              insert: u
            },
            range: v.cursor(a + u.length)
          };
        }
      } else {
        if (t && n.sliceDoc(a - 2 * e.length, a) == e + e && (c = mc(n, a - 2 * e.length, s)) > -1 && gc(n, c)) return {
          changes: {
            insert: e + e + e + e,
            from: a
          },
          effects: Di.of(a + e.length),
          range: v.cursor(a + e.length)
        };
        if (n.charCategorizer(a)(h) != me.Word && mc(n, a, s) > -1 && !uw(n, a, e, s)) return {
          changes: {
            insert: e + e,
            from: a
          },
          effects: Di.of(a + e.length),
          range: v.cursor(a + e.length)
        };
      }
      return {
        range: r = l
      };
    });
    return r ? null : n.update(o, {
      scrollIntoView: true,
      userEvent: "input.type"
    });
  }
  function gc(n, e) {
    let t = Ke(n).resolveInner(e + 1);
    return t.parent && t.from == e;
  }
  function uw(n, e, t, i) {
    let s = Ke(n).resolveInner(e, -1), r = i.reduce((o, l) => Math.max(o, l.length), 0);
    for (let o = 0; o < 5; o++) {
      let l = n.sliceDoc(s.from, Math.min(s.to, s.from + t.length + r)), a = l.indexOf(t);
      if (!a || a > -1 && i.indexOf(l.slice(0, a)) > -1) {
        let c = s.firstChild;
        for (; c && c.from == s.from && c.to - c.from > t.length + a; ) {
          if (n.sliceDoc(c.to - t.length, c.to) == t) return false;
          c = c.firstChild;
        }
        return true;
      }
      let h = s.to == e && s.parent;
      if (!h) break;
      s = h;
    }
    return false;
  }
  function mc(n, e, t) {
    let i = n.charCategorizer(e);
    if (i(n.sliceDoc(e - 1, e)) != me.Word) return e;
    for (let s of t) {
      let r = e - s.length;
      if (n.sliceDoc(r, e) == s && i(n.sliceDoc(r - 1, r)) != me.Word) return r;
    }
    return -1;
  }
  function dw(n = {}) {
    return [
      ew,
      nt,
      Ne.of(n),
      Jx,
      pw,
      tw
    ];
  }
  const Fd = [
    {
      key: "Ctrl-Space",
      run: pc
    },
    {
      mac: "Alt-`",
      run: pc
    },
    {
      key: "Escape",
      run: jx
    },
    {
      key: "ArrowDown",
      run: Fs(true)
    },
    {
      key: "ArrowUp",
      run: Fs(false)
    },
    {
      key: "PageDown",
      run: Fs(true, "page")
    },
    {
      key: "PageUp",
      run: Fs(false, "page")
    },
    {
      key: "Enter",
      run: $x
    }
  ], pw = Wi.highest(Er.computeN([
    Ne
  ], (n) => n.facet(Ne).defaultKeymap ? [
    Fd
  ] : []));
  class bc {
    constructor(e, t, i) {
      this.from = e, this.to = t, this.diagnostic = i;
    }
  }
  class Ai {
    constructor(e, t, i) {
      this.diagnostics = e, this.panel = t, this.selected = i;
    }
    static init(e, t, i) {
      let s = i.facet(jn).markerFilter;
      s && (e = s(e, i));
      let r = e.slice().sort((c, f) => c.from - f.from || c.to - f.to), o = new Gt(), l = [], a = 0;
      for (let c = 0; ; ) {
        let f = c == r.length ? null : r[c];
        if (!f && !l.length) break;
        let u, d;
        for (l.length ? (u = a, d = l.reduce((g, b) => Math.min(g, b.to), f && f.from > u ? f.from : 1e8)) : (u = f.from, d = f.to, l.push(f), c++); c < r.length; ) {
          let g = r[c];
          if (g.from == u && (g.to > g.from || g.to == u)) l.push(g), c++, d = Math.min(g.to, d);
          else {
            d = Math.min(g.from, d);
            break;
          }
        }
        let p = Mw(l);
        if (l.some((g) => g.from == g.to || g.from == g.to - 1 && i.doc.lineAt(g.from).to == g.from)) o.add(u, u, z.widget({
          widget: new Sw(p),
          diagnostics: l.slice()
        }));
        else {
          let g = l.reduce((b, y) => y.markClass ? b + " " + y.markClass : b, "");
          o.add(u, d, z.mark({
            class: "cm-lintRange cm-lintRange-" + p + g,
            diagnostics: l.slice(),
            inclusiveEnd: l.some((b) => b.to > d)
          }));
        }
        a = d;
        for (let g = 0; g < l.length; g++) l[g].to <= a && l.splice(g--, 1);
      }
      let h = o.finish();
      return new Ai(h, t, fn(h));
    }
  }
  function fn(n, e = null, t = 0) {
    let i = null;
    return n.between(t, 1e9, (s, r, { spec: o }) => {
      if (!(e && o.diagnostics.indexOf(e) < 0)) if (!i) i = new bc(s, r, e || o.diagnostics[0]);
      else {
        if (o.diagnostics.indexOf(i.diagnostic) < 0) return false;
        i = new bc(i.from, r, i.diagnostic);
      }
    }), i;
  }
  function gw(n, e) {
    let t = e.pos, i = e.end || t, s = n.state.facet(jn).hideOn(n, t, i);
    if (s != null) return s;
    let r = n.startState.doc.lineAt(e.pos);
    return !!(n.effects.some((o) => o.is(Hd)) || n.changes.touchesRange(r.from, Math.max(r.to, i)));
  }
  function mw(n, e) {
    return n.field(dt, false) ? e : e.concat(j.appendConfig.of(Tw));
  }
  const Hd = j.define(), ca = j.define(), Wd = j.define(), dt = Qe.define({
    create() {
      return new Ai(z.none, null, null);
    },
    update(n, e) {
      if (e.docChanged && n.diagnostics.size) {
        let t = n.diagnostics.map(e.changes), i = null, s = n.panel;
        if (n.selected) {
          let r = e.changes.mapPos(n.selected.from, 1);
          i = fn(t, n.selected.diagnostic, r) || fn(t, null, r);
        }
        !t.size && s && e.state.facet(jn).autoPanel && (s = null), n = new Ai(t, s, i);
      }
      for (let t of e.effects) if (t.is(Hd)) {
        let i = e.state.facet(jn).autoPanel ? t.value.length ? Kn.open : null : n.panel;
        n = Ai.init(t.value, i, e.state);
      } else t.is(ca) ? n = new Ai(n.diagnostics, t.value ? Kn.open : null, n.selected) : t.is(Wd) && (n = new Ai(n.diagnostics, n.panel, t.value));
      return n;
    },
    provide: (n) => [
      Vn.from(n, (e) => e.panel),
      E.decorations.from(n, (e) => e.diagnostics)
    ]
  }), bw = z.mark({
    class: "cm-lintRange cm-lintRange-active"
  });
  function yw(n, e, t) {
    let { diagnostics: i } = n.state.field(dt), s, r = -1, o = -1;
    i.between(e - (t < 0 ? 1 : 0), e + (t > 0 ? 1 : 0), (a, h, { spec: c }) => {
      if (e >= a && e <= h && (a == h || (e > a || t > 0) && (e < h || t < 0))) return s = c.diagnostics, r = a, o = h, false;
    });
    let l = n.state.facet(jn).tooltipFilter;
    return s && l && (s = l(s, n.state)), s ? {
      pos: r,
      end: o,
      above: n.state.doc.lineAt(r).to < o,
      create() {
        return {
          dom: xw(n, s)
        };
      }
    } : null;
  }
  function xw(n, e) {
    return ae("ul", {
      class: "cm-tooltip-lint"
    }, e.map((t) => Vd(n, t, false)));
  }
  const ww = (n) => {
    let e = n.state.field(dt, false);
    (!e || !e.panel) && n.dispatch({
      effects: mw(n.state, [
        ca.of(true)
      ])
    });
    let t = zn(n, Kn.open);
    return t && t.dom.querySelector(".cm-panel-lint ul").focus(), true;
  }, yc = (n) => {
    let e = n.state.field(dt, false);
    return !e || !e.panel ? false : (n.dispatch({
      effects: ca.of(false)
    }), true);
  }, kw = (n) => {
    let e = n.state.field(dt, false);
    if (!e) return false;
    let t = n.state.selection.main, i = e.diagnostics.iter(t.to + 1);
    return !i.value && (i = e.diagnostics.iter(0), !i.value || i.from == t.from && i.to == t.to) ? false : (n.dispatch({
      selection: {
        anchor: i.from,
        head: i.to
      },
      scrollIntoView: true
    }), true);
  }, vw = [
    {
      key: "Mod-Shift-m",
      run: ww,
      preventDefault: true
    },
    {
      key: "F8",
      run: kw
    }
  ], jn = B.define({
    combine(n) {
      return Object.assign({
        sources: n.map((e) => e.source).filter((e) => e != null)
      }, zt(n.map((e) => e.config), {
        delay: 750,
        markerFilter: null,
        tooltipFilter: null,
        needsRefresh: null,
        hideOn: () => null
      }, {
        needsRefresh: (e, t) => e ? t ? (i) => e(i) || t(i) : e : t
      }));
    }
  });
  function zd(n) {
    let e = [];
    if (n) e: for (let { name: t } of n) {
      for (let i = 0; i < t.length; i++) {
        let s = t[i];
        if (/[a-zA-Z]/.test(s) && !e.some((r) => r.toLowerCase() == s.toLowerCase())) {
          e.push(s);
          continue e;
        }
      }
      e.push("");
    }
    return e;
  }
  function Vd(n, e, t) {
    var i;
    let s = t ? zd(e.actions) : [];
    return ae("li", {
      class: "cm-diagnostic cm-diagnostic-" + e.severity
    }, ae("span", {
      class: "cm-diagnosticText"
    }, e.renderMessage ? e.renderMessage(n) : e.message), (i = e.actions) === null || i === void 0 ? void 0 : i.map((r, o) => {
      let l = false, a = (u) => {
        if (u.preventDefault(), l) return;
        l = true;
        let d = fn(n.state.field(dt).diagnostics, e);
        d && r.apply(n, d.from, d.to);
      }, { name: h } = r, c = s[o] ? h.indexOf(s[o]) : -1, f = c < 0 ? h : [
        h.slice(0, c),
        ae("u", h.slice(c, c + 1)),
        h.slice(c + 1)
      ];
      return ae("button", {
        type: "button",
        class: "cm-diagnosticAction",
        onclick: a,
        onmousedown: a,
        "aria-label": ` Action: ${h}${c < 0 ? "" : ` (access key "${s[o]})"`}.`
      }, f);
    }), e.source && ae("div", {
      class: "cm-diagnosticSource"
    }, e.source));
  }
  class Sw extends ti {
    constructor(e) {
      super(), this.sev = e;
    }
    eq(e) {
      return e.sev == this.sev;
    }
    toDOM() {
      return ae("span", {
        class: "cm-lintPoint cm-lintPoint-" + this.sev
      });
    }
  }
  class xc {
    constructor(e, t) {
      this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = Vd(e, t, true), this.dom.id = this.id, this.dom.setAttribute("role", "option");
    }
  }
  class Kn {
    constructor(e) {
      this.view = e, this.items = [];
      let t = (s) => {
        if (s.keyCode == 27) yc(this.view), this.view.focus();
        else if (s.keyCode == 38 || s.keyCode == 33) this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
        else if (s.keyCode == 40 || s.keyCode == 34) this.moveSelection((this.selectedIndex + 1) % this.items.length);
        else if (s.keyCode == 36) this.moveSelection(0);
        else if (s.keyCode == 35) this.moveSelection(this.items.length - 1);
        else if (s.keyCode == 13) this.view.focus();
        else if (s.keyCode >= 65 && s.keyCode <= 90 && this.selectedIndex >= 0) {
          let { diagnostic: r } = this.items[this.selectedIndex], o = zd(r.actions);
          for (let l = 0; l < o.length; l++) if (o[l].toUpperCase().charCodeAt(0) == s.keyCode) {
            let a = fn(this.view.state.field(dt).diagnostics, r);
            a && r.actions[l].apply(e, a.from, a.to);
          }
        } else return;
        s.preventDefault();
      }, i = (s) => {
        for (let r = 0; r < this.items.length; r++) this.items[r].dom.contains(s.target) && this.moveSelection(r);
      };
      this.list = ae("ul", {
        tabIndex: 0,
        role: "listbox",
        "aria-label": this.view.state.phrase("Diagnostics"),
        onkeydown: t,
        onclick: i
      }), this.dom = ae("div", {
        class: "cm-panel-lint"
      }, this.list, ae("button", {
        type: "button",
        name: "close",
        "aria-label": this.view.state.phrase("close"),
        onclick: () => yc(this.view)
      }, "\xD7")), this.update();
    }
    get selectedIndex() {
      let e = this.view.state.field(dt).selected;
      if (!e) return -1;
      for (let t = 0; t < this.items.length; t++) if (this.items[t].diagnostic == e.diagnostic) return t;
      return -1;
    }
    update() {
      let { diagnostics: e, selected: t } = this.view.state.field(dt), i = 0, s = false, r = null, o = /* @__PURE__ */ new Set();
      for (e.between(0, this.view.state.doc.length, (l, a, { spec: h }) => {
        for (let c of h.diagnostics) {
          if (o.has(c)) continue;
          o.add(c);
          let f = -1, u;
          for (let d = i; d < this.items.length; d++) if (this.items[d].diagnostic == c) {
            f = d;
            break;
          }
          f < 0 ? (u = new xc(this.view, c), this.items.splice(i, 0, u), s = true) : (u = this.items[f], f > i && (this.items.splice(i, f - i), s = true)), t && u.diagnostic == t.diagnostic ? u.dom.hasAttribute("aria-selected") || (u.dom.setAttribute("aria-selected", "true"), r = u) : u.dom.hasAttribute("aria-selected") && u.dom.removeAttribute("aria-selected"), i++;
        }
      }); i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); ) s = true, this.items.pop();
      this.items.length == 0 && (this.items.push(new xc(this.view, {
        from: -1,
        to: -1,
        severity: "info",
        message: this.view.state.phrase("No diagnostics")
      })), s = true), r ? (this.list.setAttribute("aria-activedescendant", r.id), this.view.requestMeasure({
        key: this,
        read: () => ({
          sel: r.dom.getBoundingClientRect(),
          panel: this.list.getBoundingClientRect()
        }),
        write: ({ sel: l, panel: a }) => {
          let h = a.height / this.list.offsetHeight;
          l.top < a.top ? this.list.scrollTop -= (a.top - l.top) / h : l.bottom > a.bottom && (this.list.scrollTop += (l.bottom - a.bottom) / h);
        }
      })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), s && this.sync();
    }
    sync() {
      let e = this.list.firstChild;
      function t() {
        let i = e;
        e = i.nextSibling, i.remove();
      }
      for (let i of this.items) if (i.dom.parentNode == this.list) {
        for (; e != i.dom; ) t();
        e = i.dom.nextSibling;
      } else this.list.insertBefore(i.dom, e);
      for (; e; ) t();
    }
    moveSelection(e) {
      if (this.selectedIndex < 0) return;
      let t = this.view.state.field(dt), i = fn(t.diagnostics, this.items[e].diagnostic);
      i && this.view.dispatch({
        selection: {
          anchor: i.from,
          head: i.to
        },
        scrollIntoView: true,
        effects: Wd.of(i)
      });
    }
    static open(e) {
      return new Kn(e);
    }
  }
  function Ow(n, e = 'viewBox="0 0 40 40"') {
    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(n)}</svg>')`;
  }
  function Hs(n) {
    return Ow(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${n}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
  }
  const Cw = E.baseTheme({
    ".cm-diagnostic": {
      padding: "3px 6px 3px 8px",
      marginLeft: "-1px",
      display: "block",
      whiteSpace: "pre-wrap"
    },
    ".cm-diagnostic-error": {
      borderLeft: "5px solid #d11"
    },
    ".cm-diagnostic-warning": {
      borderLeft: "5px solid orange"
    },
    ".cm-diagnostic-info": {
      borderLeft: "5px solid #999"
    },
    ".cm-diagnostic-hint": {
      borderLeft: "5px solid #66d"
    },
    ".cm-diagnosticAction": {
      font: "inherit",
      border: "none",
      padding: "2px 4px",
      backgroundColor: "#444",
      color: "white",
      borderRadius: "3px",
      marginLeft: "8px",
      cursor: "pointer"
    },
    ".cm-diagnosticSource": {
      fontSize: "70%",
      opacity: 0.7
    },
    ".cm-lintRange": {
      backgroundPosition: "left bottom",
      backgroundRepeat: "repeat-x",
      paddingBottom: "0.7px"
    },
    ".cm-lintRange-error": {
      backgroundImage: Hs("#d11")
    },
    ".cm-lintRange-warning": {
      backgroundImage: Hs("orange")
    },
    ".cm-lintRange-info": {
      backgroundImage: Hs("#999")
    },
    ".cm-lintRange-hint": {
      backgroundImage: Hs("#66d")
    },
    ".cm-lintRange-active": {
      backgroundColor: "#ffdd9980"
    },
    ".cm-tooltip-lint": {
      padding: 0,
      margin: 0
    },
    ".cm-lintPoint": {
      position: "relative",
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "-2px",
        borderLeft: "3px solid transparent",
        borderRight: "3px solid transparent",
        borderBottom: "4px solid #d11"
      }
    },
    ".cm-lintPoint-warning": {
      "&:after": {
        borderBottomColor: "orange"
      }
    },
    ".cm-lintPoint-info": {
      "&:after": {
        borderBottomColor: "#999"
      }
    },
    ".cm-lintPoint-hint": {
      "&:after": {
        borderBottomColor: "#66d"
      }
    },
    ".cm-panel.cm-panel-lint": {
      position: "relative",
      "& ul": {
        maxHeight: "100px",
        overflowY: "auto",
        "& [aria-selected]": {
          backgroundColor: "#ddd",
          "& u": {
            textDecoration: "underline"
          }
        },
        "&:focus [aria-selected]": {
          background_fallback: "#bdf",
          backgroundColor: "Highlight",
          color_fallback: "white",
          color: "HighlightText"
        },
        "& u": {
          textDecoration: "none"
        },
        padding: 0,
        margin: 0
      },
      "& [name=close]": {
        position: "absolute",
        top: "0",
        right: "2px",
        background: "inherit",
        border: "none",
        font: "inherit",
        padding: 0,
        margin: 0
      }
    }
  });
  function Aw(n) {
    return n == "error" ? 4 : n == "warning" ? 3 : n == "info" ? 2 : 1;
  }
  function Mw(n) {
    let e = "hint", t = 1;
    for (let i of n) {
      let s = Aw(i.severity);
      s > t && (t = s, e = i.severity);
    }
    return e;
  }
  const Tw = [
    dt,
    E.decorations.compute([
      dt
    ], (n) => {
      let { selected: e, panel: t } = n.field(dt);
      return !e || !t || e.from == e.to ? z.none : z.set([
        bw.range(e.from, e.to)
      ]);
    }),
    Sb(yw, {
      hideOn: gw
    }),
    Cw
  ], Pw = [
    Lb(),
    Ib(),
    J0(),
    Zy(),
    Ay(),
    z0(),
    U0(),
    ie.allowMultipleSelections.of(true),
    uy(),
    Fu(Dy, {
      fallback: true
    }),
    Iy(),
    iw(),
    dw(),
    ub(),
    gb(),
    sb(),
    ox(),
    Er.of([
      ...ow,
      ...Z1,
      ...Cx,
      ...a1,
      ...vy,
      ...Fd,
      ...vw
    ])
  ];
  function wc(n, e, t = false) {
    let i;
    return function(...r) {
      const o = this;
      i ? clearTimeout(i) : t && n.apply(o, r), i = setTimeout(l, e || 100);
      function l() {
        t || n.apply(o, r), i = null;
      }
    };
  }
  var Dw = xt("<div></div>"), Rw = xt('<div><div class="scm-waiting__loading scm-loading svelte-kcx0g9"><div class="scm-loading__spinner svelte-kcx0g9"></div> <p class="scm-loading__text svelte-kcx0g9">Loading editor...</p></div> <pre class="scm-pre cm-editor svelte-kcx0g9"> </pre></div>');
  function Ew(n, e) {
    Dl(e, false);
    const t = ps(), i = ps();
    let s = ve(e, "class", 8, ""), r = ve(e, "value", 12, ""), o = ve(e, "basic", 8, true), l = ve(e, "lang", 24, () => {
    }), a = ve(e, "theme", 24, () => {
    }), h = ve(e, "extensions", 24, () => []), c = ve(e, "useTab", 8, true), f = ve(e, "tabSize", 8, 2), u = ve(e, "styles", 24, () => {
    }), d = ve(e, "lineWrapping", 8, false), p = ve(e, "editable", 8, true), g = ve(e, "readonly", 8, false), b = ve(e, "placeholder", 24, () => {
    }), y = ve(e, "nodebounce", 8, false);
    const S = typeof window < "u", A = Kp();
    let C = ps(), w = ps(), O = false, M = false, W = true, U = true;
    Gp(() => {
      hi(w, te()), A("ready", K(w));
    }), Yp(() => {
      var _a2;
      return (_a2 = K(w)) == null ? void 0 : _a2.destroy();
    });
    function te() {
      return new E({
        parent: K(C),
        state: Q(r()),
        dispatch(Z) {
          K(w).update([
            Z
          ]), !O && Z.docChanged && K(i)();
        }
      });
    }
    function V() {
      if (W) {
        W = false;
        return;
      }
      K(w).dispatch({
        effects: j.reconfigure.of(K(t))
      }), A("reconfigure", K(w));
    }
    function I(Z) {
      if (U) {
        U = false;
        return;
      }
      if (M) {
        M = false;
        return;
      }
      O = true, K(w).setState(Q(Z)), O = false;
    }
    function J() {
      const Z = K(w).state.doc.toString();
      Z !== r() && (M = true, r(Z), A("change", r()));
    }
    function Q(Z) {
      return ie.create({
        doc: Z ?? void 0,
        extensions: K(t)
      });
    }
    function ne(Z, se, fe, qe, lt, At, ii, et) {
      const Ie = [
        Lr.of(" ".repeat(fe)),
        E.editable.of(At),
        ie.readOnly.of(ii)
      ];
      return Z && Ie.push(Pw), se && Ie.push(Er.of([
        ex
      ])), lt && Ie.push(ab(lt)), et && Ie.push(et), qe && Ie.push(E.lineWrapping), Ie;
    }
    function xe(Z, se) {
      const fe = [];
      return se && fe.push(E.theme(se)), Z && fe.push(Z), fe;
    }
    ds(() => (ht(o()), ht(c()), ht(f()), ht(d()), ht(b()), ht(p()), ht(g()), ht(l()), ht(a()), ht(u()), ht(h())), () => {
      hi(t, [
        ...ne(o(), c(), f(), d(), b(), p(), g(), l()),
        ...xe(a(), u()),
        ...h()
      ]);
    }), ds(() => (K(w), ht(r())), () => {
      K(w) && I(r());
    }), ds(() => (K(w), K(t)), () => {
      K(w) && K(t) && V();
    }), ds(() => (ht(y()), wc), () => {
      hi(i, y() ? J : wc(J, 300));
    }), zp(), jp();
    var be = Nc(), Te = Pl(be);
    {
      var ye = (Z) => {
        var se = Dw();
        $p(se, (fe) => hi(C, fe), () => K(C)), Li(() => li(se, 1, `codemirror-wrapper ${s() ?? ""}`, "svelte-kcx0g9")), $e(Z, se);
      }, Ee = (Z) => {
        var se = Rw(), fe = Ti(We(se), 2), qe = We(fe, true);
        Le(fe), Le(se), Li(() => {
          li(se, 1, `scm-waiting ${s() ?? ""}`, "svelte-kcx0g9"), Ln(qe, r());
        }), $e(Z, se);
      };
      ci(Te, (Z) => {
        S ? Z(ye) : Z(Ee, false);
      });
    }
    $e(n, be), Rl();
  }
  var kc = {};
  class Cr {
    constructor(e, t, i, s, r, o, l, a, h, c = 0, f) {
      this.p = e, this.stack = t, this.state = i, this.reducePos = s, this.pos = r, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
    }
    toString() {
      return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
    }
    static start(e, t, i = 0) {
      let s = e.parser.context;
      return new Cr(e, [], t, i, i, 0, [], 0, s ? new vc(s, s.start) : null, 0, null);
    }
    get context() {
      return this.curContext ? this.curContext.context : null;
    }
    pushState(e, t) {
      this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
    }
    reduce(e) {
      var t;
      let i = e >> 19, s = e & 65535, { parser: r } = this.p, o = this.reducePos < this.pos - 25;
      o && this.setLookAhead(this.pos);
      let l = r.dynamicPrecedence(s);
      if (l && (this.score += l), i == 0) {
        this.pushState(r.getGoto(this.state, s, true), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, o ? 8 : 4, true), this.reduceContext(s, this.reducePos);
        return;
      }
      let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), h = a ? this.stack[a - 2] : this.p.ranges[0].from, c = this.reducePos - h;
      c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[s]) === null || t === void 0) && t.isAnonymous) && (h == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h, this.p.lastBigReductionSize = c));
      let f = a ? this.stack[a - 1] : 0, u = this.bufferBase + this.buffer.length - f;
      if (s < r.minRepeatTerm || e & 131072) {
        let d = r.stateFlag(this.state, 1) ? this.pos : this.reducePos;
        this.storeNode(s, h, d, u + 4, true);
      }
      if (e & 262144) this.state = this.stack[a];
      else {
        let d = this.stack[a - 3];
        this.state = r.getGoto(d, s, true);
      }
      for (; this.stack.length > a; ) this.stack.pop();
      this.reduceContext(s, h);
    }
    storeNode(e, t, i, s = 4, r = false) {
      if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
        let o = this, l = this.buffer.length;
        if (l == 0 && o.parent && (l = o.bufferBase - o.parent.bufferBase, o = o.parent), l > 0 && o.buffer[l - 4] == 0 && o.buffer[l - 1] > -1) {
          if (t == i) return;
          if (o.buffer[l - 2] >= t) {
            o.buffer[l - 2] = i;
            return;
          }
        }
      }
      if (!r || this.pos == i) this.buffer.push(e, t, i, s);
      else {
        let o = this.buffer.length;
        if (o > 0 && this.buffer[o - 4] != 0) {
          let l = false;
          for (let a = o; a > 0 && this.buffer[a - 2] > i; a -= 4) if (this.buffer[a - 1] >= 0) {
            l = true;
            break;
          }
          if (l) for (; o > 0 && this.buffer[o - 2] > i; ) this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, s > 4 && (s -= 4);
        }
        this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = s;
      }
    }
    shift(e, t, i, s) {
      if (e & 131072) this.pushState(e & 65535, this.pos);
      else if ((e & 262144) == 0) {
        let r = e, { parser: o } = this.p;
        (s > this.pos || t <= o.maxNode) && (this.pos = s, o.stateFlag(r, 1) || (this.reducePos = s)), this.pushState(r, i), this.shiftContext(t, i), t <= o.maxNode && this.buffer.push(t, i, s, 4);
      } else this.pos = s, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, s, 4);
    }
    apply(e, t, i, s) {
      e & 65536 ? this.reduce(e) : this.shift(e, t, i, s);
    }
    useNode(e, t) {
      let i = this.p.reused.length - 1;
      (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
      let s = this.pos;
      this.reducePos = this.pos = s + e.length, this.pushState(t, s), this.buffer.push(i, s, this.reducePos, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
    }
    split() {
      let e = this, t = e.buffer.length;
      for (; t > 0 && e.buffer[t - 2] > e.reducePos; ) t -= 4;
      let i = e.buffer.slice(t), s = e.bufferBase + t;
      for (; e && s == e.bufferBase; ) e = e.parent;
      return new Cr(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, s, this.curContext, this.lookAhead, e);
    }
    recoverByDelete(e, t) {
      let i = e <= this.p.parser.maxNode;
      i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
    }
    canShift(e) {
      for (let t = new Bw(this); ; ) {
        let i = this.p.parser.stateSlot(t.state, 4) || this.p.parser.hasAction(t.state, e);
        if (i == 0) return false;
        if ((i & 65536) == 0) return true;
        t.reduce(i);
      }
    }
    recoverByInsert(e) {
      if (this.stack.length >= 300) return [];
      let t = this.p.parser.nextStates(this.state);
      if (t.length > 8 || this.stack.length >= 120) {
        let s = [];
        for (let r = 0, o; r < t.length; r += 2) (o = t[r + 1]) != this.state && this.p.parser.hasAction(o, e) && s.push(t[r], o);
        if (this.stack.length < 120) for (let r = 0; s.length < 8 && r < t.length; r += 2) {
          let o = t[r + 1];
          s.some((l, a) => a & 1 && l == o) || s.push(t[r], o);
        }
        t = s;
      }
      let i = [];
      for (let s = 0; s < t.length && i.length < 4; s += 2) {
        let r = t[s + 1];
        if (r == this.state) continue;
        let o = this.split();
        o.pushState(r, this.pos), o.storeNode(0, o.pos, o.pos, 4, true), o.shiftContext(t[s], this.pos), o.reducePos = this.pos, o.score -= 200, i.push(o);
      }
      return i;
    }
    forceReduce() {
      let { parser: e } = this.p, t = e.stateSlot(this.state, 5);
      if ((t & 65536) == 0) return false;
      if (!e.validAction(this.state, t)) {
        let i = t >> 19, s = t & 65535, r = this.stack.length - i * 3;
        if (r < 0 || e.getGoto(this.stack[r], s, false) < 0) {
          let o = this.findForcedReduction();
          if (o == null) return false;
          t = o;
        }
        this.storeNode(0, this.pos, this.pos, 4, true), this.score -= 100;
      }
      return this.reducePos = this.pos, this.reduce(t), true;
    }
    findForcedReduction() {
      let { parser: e } = this.p, t = [], i = (s, r) => {
        if (!t.includes(s)) return t.push(s), e.allActions(s, (o) => {
          if (!(o & 393216)) if (o & 65536) {
            let l = (o >> 19) - r;
            if (l > 1) {
              let a = o & 65535, h = this.stack.length - l * 3;
              if (h >= 0 && e.getGoto(this.stack[h], a, false) >= 0) return l << 19 | 65536 | a;
            }
          } else {
            let l = i(o, r + 1);
            if (l != null) return l;
          }
        });
      };
      return i(this.state, 0);
    }
    forceAll() {
      for (; !this.p.parser.stateFlag(this.state, 2); ) if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, true);
        break;
      }
      return this;
    }
    get deadEnd() {
      if (this.stack.length != 3) return false;
      let { parser: e } = this.p;
      return e.data[e.stateSlot(this.state, 1)] == 65535 && !e.stateSlot(this.state, 4);
    }
    restart() {
      this.storeNode(0, this.pos, this.pos, 4, true), this.state = this.stack[0], this.stack.length = 0;
    }
    sameState(e) {
      if (this.state != e.state || this.stack.length != e.stack.length) return false;
      for (let t = 0; t < this.stack.length; t += 3) if (this.stack[t] != e.stack[t]) return false;
      return true;
    }
    get parser() {
      return this.p.parser;
    }
    dialectEnabled(e) {
      return this.p.parser.dialect.flags[e];
    }
    shiftContext(e, t) {
      this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
    }
    reduceContext(e, t) {
      this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
    }
    emitContext() {
      let e = this.buffer.length - 1;
      (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
    }
    emitLookAhead() {
      let e = this.buffer.length - 1;
      (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
    }
    updateContext(e) {
      if (e != this.curContext.context) {
        let t = new vc(this.curContext.tracker, e);
        t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
      }
    }
    setLookAhead(e) {
      e > this.lookAhead && (this.emitLookAhead(), this.lookAhead = e);
    }
    close() {
      this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
    }
  }
  class vc {
    constructor(e, t) {
      this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
    }
  }
  class Bw {
    constructor(e) {
      this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
    }
    reduce(e) {
      let t = e & 65535, i = e >> 19;
      i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
      let s = this.start.p.parser.getGoto(this.stack[this.base - 3], t, true);
      this.state = s;
    }
  }
  class Ar {
    constructor(e, t, i) {
      this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
    }
    static create(e, t = e.bufferBase + e.buffer.length) {
      return new Ar(e, t, t - e.bufferBase);
    }
    maybeNext() {
      let e = this.stack.parent;
      e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    next() {
      this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
    }
    fork() {
      return new Ar(this.stack, this.pos, this.index);
    }
  }
  function Ws(n, e = Uint16Array) {
    if (typeof n != "string") return n;
    let t = null;
    for (let i = 0, s = 0; i < n.length; ) {
      let r = 0;
      for (; ; ) {
        let o = n.charCodeAt(i++), l = false;
        if (o == 126) {
          r = 65535;
          break;
        }
        o >= 92 && o--, o >= 34 && o--;
        let a = o - 32;
        if (a >= 46 && (a -= 46, l = true), r += a, l) break;
        r *= 46;
      }
      t ? t[s++] = r : t = new e(r);
    }
    return t;
  }
  class Zs {
    constructor() {
      this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
    }
  }
  const Sc = new Zs();
  class Lw {
    constructor(e, t) {
      this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = Sc, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
    }
    resolveOffset(e, t) {
      let i = this.range, s = this.rangeIndex, r = this.pos + e;
      for (; r < i.from; ) {
        if (!s) return null;
        let o = this.ranges[--s];
        r -= i.from - o.to, i = o;
      }
      for (; t < 0 ? r > i.to : r >= i.to; ) {
        if (s == this.ranges.length - 1) return null;
        let o = this.ranges[++s];
        r += o.from - i.to, i = o;
      }
      return r;
    }
    clipPos(e) {
      if (e >= this.range.from && e < this.range.to) return e;
      for (let t of this.ranges) if (t.to > e) return Math.max(e, t.from);
      return this.end;
    }
    peek(e) {
      let t = this.chunkOff + e, i, s;
      if (t >= 0 && t < this.chunk.length) i = this.pos + e, s = this.chunk.charCodeAt(t);
      else {
        let r = this.resolveOffset(e, 1);
        if (r == null) return -1;
        if (i = r, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length) s = this.chunk2.charCodeAt(i - this.chunk2Pos);
        else {
          let o = this.rangeIndex, l = this.range;
          for (; l.to <= i; ) l = this.ranges[++o];
          this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - i)), s = this.chunk2.charCodeAt(0);
        }
      }
      return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), s;
    }
    acceptToken(e, t = 0) {
      let i = t ? this.resolveOffset(t, -1) : this.pos;
      if (i == null || i < this.token.start) throw new RangeError("Token end out of bounds");
      this.token.value = e, this.token.end = i;
    }
    acceptTokenTo(e, t) {
      this.token.value = e, this.token.end = t;
    }
    getChunk() {
      if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
        let { chunk: e, chunkPos: t } = this;
        this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
      } else {
        this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
        let e = this.input.chunk(this.pos), t = this.pos + e.length;
        this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
      }
    }
    readNext() {
      return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
    }
    advance(e = 1) {
      for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
        if (this.rangeIndex == this.ranges.length - 1) return this.setDone();
        e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
      }
      return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
    }
    setDone() {
      return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
    }
    reset(e, t) {
      if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = Sc, this.pos != e) {
        if (this.pos = e, e == this.end) return this.setDone(), this;
        for (; e < this.range.from; ) this.range = this.ranges[--this.rangeIndex];
        for (; e >= this.range.to; ) this.range = this.ranges[++this.rangeIndex];
        e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
      }
      return this;
    }
    read(e, t) {
      if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length) return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
      if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length) return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
      if (e >= this.range.from && t <= this.range.to) return this.input.read(e, t);
      let i = "";
      for (let s of this.ranges) {
        if (s.from >= t) break;
        s.to > e && (i += this.input.read(Math.max(s.from, e), Math.min(s.to, t)));
      }
      return i;
    }
  }
  class nn {
    constructor(e, t) {
      this.data = e, this.id = t;
    }
    token(e, t) {
      let { parser: i } = t.p;
      _w(this.data, e, t, this.id, i.data, i.tokenPrecTable);
    }
  }
  nn.prototype.contextual = nn.prototype.fallback = nn.prototype.extend = false;
  nn.prototype.fallback = nn.prototype.extend = false;
  class Vr {
    constructor(e, t = {}) {
      this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
    }
  }
  function _w(n, e, t, i, s, r) {
    let o = 0, l = 1 << i, { dialect: a } = t.p.parser;
    e: for (; (l & n[o]) != 0; ) {
      let h = n[o + 1];
      for (let d = o + 3; d < h; d += 2) if ((n[d + 1] & l) > 0) {
        let p = n[d];
        if (a.allows(p) && (e.token.value == -1 || e.token.value == p || Nw(p, e.token.value, s, r))) {
          e.acceptToken(p);
          break;
        }
      }
      let c = e.next, f = 0, u = n[o + 2];
      if (e.next < 0 && u > f && n[h + u * 3 - 3] == 65535) {
        o = n[h + u * 3 - 1];
        continue e;
      }
      for (; f < u; ) {
        let d = f + u >> 1, p = h + d + (d << 1), g = n[p], b = n[p + 1] || 65536;
        if (c < g) u = d;
        else if (c >= b) f = d + 1;
        else {
          o = n[p + 2], e.advance();
          continue e;
        }
      }
      break;
    }
  }
  function Oc(n, e, t) {
    for (let i = e, s; (s = n[i]) != 65535; i++) if (s == t) return i - e;
    return -1;
  }
  function Nw(n, e, t, i) {
    let s = Oc(t, i, e);
    return s < 0 || Oc(t, i, n) < s;
  }
  const ft = typeof process < "u" && kc && /\bparse\b/.test(kc.LOG);
  let Oo = null;
  function Cc(n, e, t) {
    let i = n.cursor(_e.IncludeAnonymous);
    for (i.moveTo(e); ; ) if (!(t < 0 ? i.childBefore(e) : i.childAfter(e))) for (; ; ) {
      if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError) return t < 0 ? Math.max(0, Math.min(i.to - 1, e - 25)) : Math.min(n.length, Math.max(i.from + 1, e + 25));
      if (t < 0 ? i.prevSibling() : i.nextSibling()) break;
      if (!i.parent()) return t < 0 ? 0 : n.length;
    }
  }
  class Iw {
    constructor(e, t) {
      this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
    }
    nextFragment() {
      let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
      if (e) {
        for (this.safeFrom = e.openStart ? Cc(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? Cc(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; ) this.trees.pop(), this.start.pop(), this.index.pop();
        this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
      } else this.nextStart = 1e9;
    }
    nodeAt(e) {
      if (e < this.nextStart) return null;
      for (; this.fragment && this.safeTo <= e; ) this.nextFragment();
      if (!this.fragment) return null;
      for (; ; ) {
        let t = this.trees.length - 1;
        if (t < 0) return this.nextFragment(), null;
        let i = this.trees[t], s = this.index[t];
        if (s == i.children.length) {
          this.trees.pop(), this.start.pop(), this.index.pop();
          continue;
        }
        let r = i.children[s], o = this.start[t] + i.positions[s];
        if (o > e) return this.nextStart = o, null;
        if (r instanceof Me) {
          if (o == e) {
            if (o < this.safeFrom) return null;
            let l = o + r.length;
            if (l <= this.safeTo) {
              let a = r.prop(Y.lookAhead);
              if (!a || l + a < this.fragment.to) return r;
            }
          }
          this.index[t]++, o + r.length >= Math.max(this.safeFrom, e) && (this.trees.push(r), this.start.push(o), this.index.push(0));
        } else this.index[t]++, this.nextStart = o + r.length;
      }
    }
  }
  class Fw {
    constructor(e, t) {
      this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new Zs());
    }
    getActions(e) {
      let t = 0, i = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(e.state, 3), l = e.curContext ? e.curContext.hash : 0, a = 0;
      for (let h = 0; h < r.length; h++) {
        if ((1 << h & o) == 0) continue;
        let c = r[h], f = this.tokens[h];
        if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
          let u = t;
          if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > u)) break;
        }
      }
      for (; this.actions.length > t; ) this.actions.pop();
      return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new Zs(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
    }
    getMainToken(e) {
      if (this.mainToken) return this.mainToken;
      let t = new Zs(), { pos: i, p: s } = e;
      return t.start = i, t.end = Math.min(i + 1, s.stream.end), t.value = i == s.stream.end ? s.parser.eofTerm : 0, t;
    }
    updateCachedToken(e, t, i) {
      let s = this.stream.clipPos(i.pos);
      if (t.token(this.stream.reset(s, e), i), e.value > -1) {
        let { parser: r } = i.p;
        for (let o = 0; o < r.specialized.length; o++) if (r.specialized[o] == e.value) {
          let l = r.specializers[o](this.stream.read(e.start, e.end), i);
          if (l >= 0 && i.p.parser.dialect.allows(l >> 1)) {
            (l & 1) == 0 ? e.value = l >> 1 : e.extended = l >> 1;
            break;
          }
        }
      } else e.value = 0, e.end = this.stream.clipPos(s + 1);
    }
    putAction(e, t, i, s) {
      for (let r = 0; r < s; r += 3) if (this.actions[r] == e) return s;
      return this.actions[s++] = e, this.actions[s++] = t, this.actions[s++] = i, s;
    }
    addActions(e, t, i, s) {
      let { state: r } = e, { parser: o } = e.p, { data: l } = o;
      for (let a = 0; a < 2; a++) for (let h = o.stateSlot(r, a ? 2 : 1); ; h += 3) {
        if (l[h] == 65535) if (l[h + 1] == 1) h = Ut(l, h + 2);
        else {
          s == 0 && l[h + 1] == 2 && (s = this.putAction(Ut(l, h + 2), t, i, s));
          break;
        }
        l[h] == t && (s = this.putAction(Ut(l, h + 1), t, i, s));
      }
      return s;
    }
  }
  class Hw {
    constructor(e, t, i, s) {
      this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Lw(t, s), this.tokens = new Fw(e, this.stream), this.topTerm = e.top[1];
      let { from: r } = s[0];
      this.stacks = [
        Cr.start(this, e.top[0], r)
      ], this.fragments = i.length && this.stream.end - r > e.bufferLength * 4 ? new Iw(i, e.nodeSet) : null;
    }
    get parsedPos() {
      return this.minStackPos;
    }
    advance() {
      let e = this.stacks, t = this.minStackPos, i = this.stacks = [], s, r;
      if (this.bigReductionCount > 300 && e.length == 1) {
        let [o] = e;
        for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; ) ;
        this.bigReductionCount = this.lastBigReductionSize = 0;
      }
      for (let o = 0; o < e.length; o++) {
        let l = e[o];
        for (; ; ) {
          if (this.tokens.mainToken = null, l.pos > t) i.push(l);
          else {
            if (this.advanceStack(l, i, e)) continue;
            {
              s || (s = [], r = []), s.push(l);
              let a = this.tokens.getMainToken(l);
              r.push(a.value, a.end);
            }
          }
          break;
        }
      }
      if (!i.length) {
        let o = s && Vw(s);
        if (o) return ft && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
        if (this.parser.strict) throw ft && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
        this.recovering || (this.recovering = 5);
      }
      if (this.recovering && s) {
        let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, i);
        if (o) return ft && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
      }
      if (this.recovering) {
        let o = this.recovering == 1 ? 1 : this.recovering * 3;
        if (i.length > o) for (i.sort((l, a) => a.score - l.score); i.length > o; ) i.pop();
        i.some((l) => l.reducePos > t) && this.recovering--;
      } else if (i.length > 1) {
        e: for (let o = 0; o < i.length - 1; o++) {
          let l = i[o];
          for (let a = o + 1; a < i.length; a++) {
            let h = i[a];
            if (l.sameState(h) || l.buffer.length > 500 && h.buffer.length > 500) if ((l.score - h.score || l.buffer.length - h.buffer.length) > 0) i.splice(a--, 1);
            else {
              i.splice(o--, 1);
              continue e;
            }
          }
        }
        i.length > 12 && i.splice(12, i.length - 12);
      }
      this.minStackPos = i[0].pos;
      for (let o = 1; o < i.length; o++) i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
      return null;
    }
    stopAt(e) {
      if (this.stoppedAt != null && this.stoppedAt < e) throw new RangeError("Can't move stoppedAt forward");
      this.stoppedAt = e;
    }
    advanceStack(e, t, i) {
      let s = e.pos, { parser: r } = this, o = ft ? this.stackID(e) + " -> " : "";
      if (this.stoppedAt != null && s > this.stoppedAt) return e.forceReduce() ? e : null;
      if (this.fragments) {
        let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
        for (let f = this.fragments.nodeAt(s); f; ) {
          let u = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
          if (u > -1 && f.length && (!h || (f.prop(Y.contextHash) || 0) == c)) return e.useNode(f, u), ft && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), true;
          if (!(f instanceof Me) || f.children.length == 0 || f.positions[0] > 0) break;
          let d = f.children[0];
          if (d instanceof Me && f.positions[0] == 0) f = d;
          else break;
        }
      }
      let l = r.stateSlot(e.state, 4);
      if (l > 0) return e.reduce(l), ft && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(l & 65535)})`), true;
      if (e.stack.length >= 8400) for (; e.stack.length > 6e3 && e.forceReduce(); ) ;
      let a = this.tokens.getActions(e);
      for (let h = 0; h < a.length; ) {
        let c = a[h++], f = a[h++], u = a[h++], d = h == a.length || !i, p = d ? e : e.split(), g = this.tokens.mainToken;
        if (p.apply(c, f, g ? g.start : p.pos, u), ft && console.log(o + this.stackID(p) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${r.getName(c & 65535)}`} for ${r.getName(f)} @ ${s}${p == e ? "" : ", split"})`), d) return true;
        p.pos > s ? t.push(p) : i.push(p);
      }
      return false;
    }
    advanceFully(e, t) {
      let i = e.pos;
      for (; ; ) {
        if (!this.advanceStack(e, null, null)) return false;
        if (e.pos > i) return Ac(e, t), true;
      }
    }
    runRecovery(e, t, i) {
      let s = null, r = false;
      for (let o = 0; o < e.length; o++) {
        let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = ft ? this.stackID(l) + " -> " : "";
        if (l.deadEnd && (r || (r = true, l.restart(), ft && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, i)))) continue;
        let f = l.split(), u = c;
        for (let d = 0; f.forceReduce() && d < 10 && (ft && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); d++) ft && (u = this.stackID(f) + " -> ");
        for (let d of l.recoverByInsert(a)) ft && console.log(c + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, i);
        this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), ft && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), Ac(l, i)) : (!s || s.score < l.score) && (s = l);
      }
      return s;
    }
    stackToTree(e) {
      return e.close(), Me.build({
        buffer: Ar.create(e),
        nodeSet: this.parser.nodeSet,
        topID: this.topTerm,
        maxBufferLength: this.parser.bufferLength,
        reused: this.reused,
        start: this.ranges[0].from,
        length: e.pos - this.ranges[0].from,
        minRepeatType: this.parser.minRepeatTerm
      });
    }
    stackID(e) {
      let t = (Oo || (Oo = /* @__PURE__ */ new WeakMap())).get(e);
      return t || Oo.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
    }
  }
  function Ac(n, e) {
    for (let t = 0; t < e.length; t++) {
      let i = e[t];
      if (i.pos == n.pos && i.sameState(n)) {
        e[t].score < n.score && (e[t] = n);
        return;
      }
    }
    e.push(n);
  }
  class Ww {
    constructor(e, t, i) {
      this.source = e, this.flags = t, this.disabled = i;
    }
    allows(e) {
      return !this.disabled || this.disabled[e] == 0;
    }
  }
  const Co = (n) => n;
  class zw {
    constructor(e) {
      this.start = e.start, this.shift = e.shift || Co, this.reduce = e.reduce || Co, this.reuse = e.reuse || Co, this.hash = e.hash || (() => 0), this.strict = e.strict !== false;
    }
  }
  class Mr extends ku {
    constructor(e) {
      if (super(), this.wrappers = [], e.version != 14) throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
      let t = e.nodeNames.split(" ");
      this.minRepeatTerm = t.length;
      for (let l = 0; l < e.repeatNodeCount; l++) t.push("");
      let i = Object.keys(e.topRules).map((l) => e.topRules[l][1]), s = [];
      for (let l = 0; l < t.length; l++) s.push([]);
      function r(l, a, h) {
        s[l].push([
          a,
          a.deserialize(String(h))
        ]);
      }
      if (e.nodeProps) for (let l of e.nodeProps) {
        let a = l[0];
        typeof a == "string" && (a = Y[a]);
        for (let h = 1; h < l.length; ) {
          let c = l[h++];
          if (c >= 0) r(c, a, l[h++]);
          else {
            let f = l[h + -c];
            for (let u = -c; u > 0; u--) r(l[h++], a, f);
            h++;
          }
        }
      }
      this.nodeSet = new jl(t.map((l, a) => ot.define({
        name: a >= this.minRepeatTerm ? void 0 : l,
        id: a,
        props: s[a],
        top: i.indexOf(a) > -1,
        error: a == 0,
        skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
      }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = false, this.bufferLength = bu;
      let o = Ws(e.tokenData);
      this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
      for (let l = 0; l < this.specializerSpecs.length; l++) this.specialized[l] = this.specializerSpecs[l].term;
      this.specializers = this.specializerSpecs.map(Mc), this.states = Ws(e.states, Uint32Array), this.data = Ws(e.stateData), this.goto = Ws(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new nn(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
    }
    createParse(e, t, i) {
      let s = new Hw(this, e, t, i);
      for (let r of this.wrappers) s = r(s, e, t, i);
      return s;
    }
    getGoto(e, t, i = false) {
      let s = this.goto;
      if (t >= s[0]) return -1;
      for (let r = s[t + 1]; ; ) {
        let o = s[r++], l = o & 1, a = s[r++];
        if (l && i) return a;
        for (let h = r + (o >> 1); r < h; r++) if (s[r] == e) return a;
        if (l) return -1;
      }
    }
    hasAction(e, t) {
      let i = this.data;
      for (let s = 0; s < 2; s++) for (let r = this.stateSlot(e, s ? 2 : 1), o; ; r += 3) {
        if ((o = i[r]) == 65535) if (i[r + 1] == 1) o = i[r = Ut(i, r + 2)];
        else {
          if (i[r + 1] == 2) return Ut(i, r + 2);
          break;
        }
        if (o == t || o == 0) return Ut(i, r + 1);
      }
      return 0;
    }
    stateSlot(e, t) {
      return this.states[e * 6 + t];
    }
    stateFlag(e, t) {
      return (this.stateSlot(e, 0) & t) > 0;
    }
    validAction(e, t) {
      return !!this.allActions(e, (i) => i == t ? true : null);
    }
    allActions(e, t) {
      let i = this.stateSlot(e, 4), s = i ? t(i) : void 0;
      for (let r = this.stateSlot(e, 1); s == null; r += 3) {
        if (this.data[r] == 65535) if (this.data[r + 1] == 1) r = Ut(this.data, r + 2);
        else break;
        s = t(Ut(this.data, r + 1));
      }
      return s;
    }
    nextStates(e) {
      let t = [];
      for (let i = this.stateSlot(e, 1); ; i += 3) {
        if (this.data[i] == 65535) if (this.data[i + 1] == 1) i = Ut(this.data, i + 2);
        else break;
        if ((this.data[i + 2] & 1) == 0) {
          let s = this.data[i + 1];
          t.some((r, o) => o & 1 && r == s) || t.push(this.data[i], s);
        }
      }
      return t;
    }
    configure(e) {
      let t = Object.assign(Object.create(Mr.prototype), this);
      if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
        let i = this.topRules[e.top];
        if (!i) throw new RangeError(`Invalid top rule name ${e.top}`);
        t.top = i;
      }
      return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
        let s = e.tokenizers.find((r) => r.from == i);
        return s ? s.to : i;
      })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, s) => {
        let r = e.specializers.find((l) => l.from == i.external);
        if (!r) return i;
        let o = Object.assign(Object.assign({}, i), {
          external: r.to
        });
        return t.specializers[s] = Mc(o), o;
      })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
    }
    hasWrappers() {
      return this.wrappers.length > 0;
    }
    getName(e) {
      return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
    }
    get eofTerm() {
      return this.maxNode + 1;
    }
    get topNode() {
      return this.nodeSet.types[this.top[1]];
    }
    dynamicPrecedence(e) {
      let t = this.dynamicPrecedences;
      return t == null ? 0 : t[e] || 0;
    }
    parseDialect(e) {
      let t = Object.keys(this.dialects), i = t.map(() => false);
      if (e) for (let r of e.split(" ")) {
        let o = t.indexOf(r);
        o >= 0 && (i[o] = true);
      }
      let s = null;
      for (let r = 0; r < t.length; r++) if (!i[r]) for (let o = this.dialects[t[r]], l; (l = this.data[o++]) != 65535; ) (s || (s = new Uint8Array(this.maxTerm + 1)))[l] = 1;
      return new Ww(e, i, s);
    }
    static deserialize(e) {
      return new Mr(e);
    }
  }
  function Ut(n, e) {
    return n[e] | n[e + 1] << 16;
  }
  function Vw(n) {
    let e = null;
    for (let t of n) {
      let i = t.p.stoppedAt;
      (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(t.state, 2) && (!e || e.score < t.score) && (e = t);
    }
    return e;
  }
  function Mc(n) {
    if (n.external) {
      let e = n.extend ? 1 : 0;
      return (t, i) => n.external(t, i) << 1 | e;
    }
    return n.get;
  }
  const Ui = 63, Tc = 64, Qw = 1, qw = 2, Qd = 3, Xw = 4, qd = 5, Uw = 6, $w = 7, Xd = 65, jw = 66, Kw = 8, Gw = 9, Yw = 10, Jw = 11, Zw = 12, Ud = 13, ek = 19, tk = 20, ik = 29, nk = 33, sk = 34, rk = 47, ok = 0, fa = 1, Ol = 2, Gn = 3, Cl = 4;
  class Mi {
    constructor(e, t, i) {
      this.parent = e, this.depth = t, this.type = i, this.hash = (e ? e.hash + e.hash << 8 : 0) + t + (t << 4) + i;
    }
  }
  Mi.top = new Mi(null, -1, ok);
  function Bn(n, e) {
    for (let t = 0, i = e - n.pos - 1; ; i--, t++) {
      let s = n.peek(i);
      if (Zt(s) || s == -1) return t;
    }
  }
  function Al(n) {
    return n == 32 || n == 9;
  }
  function Zt(n) {
    return n == 10 || n == 13;
  }
  function $d(n) {
    return Al(n) || Zt(n);
  }
  function Ri(n) {
    return n < 0 || $d(n);
  }
  const lk = new zw({
    start: Mi.top,
    reduce(n, e) {
      return n.type == Gn && (e == tk || e == sk) ? n.parent : n;
    },
    shift(n, e, t, i) {
      if (e == Qd) return new Mi(n, Bn(i, i.pos), fa);
      if (e == Xd || e == qd) return new Mi(n, Bn(i, i.pos), Ol);
      if (e == Ui) return n.parent;
      if (e == ek || e == nk) return new Mi(n, 0, Gn);
      if (e == Ud && n.type == Cl) return n.parent;
      if (e == rk) {
        let s = /[1-9]/.exec(i.read(i.pos, t.pos));
        if (s) return new Mi(n, n.depth + +s[0], Cl);
      }
      return n;
    },
    hash(n) {
      return n.hash;
    }
  });
  function un(n, e, t = 0) {
    return n.peek(t) == e && n.peek(t + 1) == e && n.peek(t + 2) == e && Ri(n.peek(t + 3));
  }
  const ak = new Vr((n, e) => {
    if (n.next == -1 && e.canShift(Tc)) return n.acceptToken(Tc);
    let t = n.peek(-1);
    if ((Zt(t) || t < 0) && e.context.type != Gn) {
      if (un(n, 45)) if (e.canShift(Ui)) n.acceptToken(Ui);
      else return n.acceptToken(Qw, 3);
      if (un(n, 46)) if (e.canShift(Ui)) n.acceptToken(Ui);
      else return n.acceptToken(qw, 3);
      let i = 0;
      for (; n.next == 32; ) i++, n.advance();
      (i < e.context.depth || i == e.context.depth && e.context.type == fa && (n.next != 45 || !Ri(n.peek(1)))) && n.next != -1 && !Zt(n.next) && n.next != 35 && n.acceptToken(Ui, -i);
    }
  }, {
    contextual: true
  }), hk = new Vr((n, e) => {
    if (e.context.type == Gn) {
      n.next == 63 && (n.advance(), Ri(n.next) && n.acceptToken($w));
      return;
    }
    if (n.next == 45) n.advance(), Ri(n.next) && n.acceptToken(e.context.type == fa && e.context.depth == Bn(n, n.pos - 1) ? Xw : Qd);
    else if (n.next == 63) n.advance(), Ri(n.next) && n.acceptToken(e.context.type == Ol && e.context.depth == Bn(n, n.pos - 1) ? Uw : qd);
    else {
      let t = n.pos;
      for (; ; ) if (Al(n.next)) {
        if (n.pos == t) return;
        n.advance();
      } else if (n.next == 33) jd(n);
      else if (n.next == 38) Ml(n);
      else if (n.next == 42) {
        Ml(n);
        break;
      } else if (n.next == 39 || n.next == 34) {
        if (ua(n, true)) break;
        return;
      } else if (n.next == 91 || n.next == 123) {
        if (!fk(n)) return;
        break;
      } else {
        Kd(n, true, false, 0);
        break;
      }
      for (; Al(n.next); ) n.advance();
      if (n.next == 58) {
        if (n.pos == t && e.canShift(ik)) return;
        let i = n.peek(1);
        Ri(i) && n.acceptTokenTo(e.context.type == Ol && e.context.depth == Bn(n, t) ? jw : Xd, t);
      }
    }
  }, {
    contextual: true
  });
  function ck(n) {
    return n > 32 && n < 127 && n != 34 && n != 37 && n != 44 && n != 60 && n != 62 && n != 92 && n != 94 && n != 96 && n != 123 && n != 124 && n != 125;
  }
  function Pc(n) {
    return n >= 48 && n <= 57 || n >= 97 && n <= 102 || n >= 65 && n <= 70;
  }
  function Dc(n, e) {
    return n.next == 37 ? (n.advance(), Pc(n.next) && n.advance(), Pc(n.next) && n.advance(), true) : ck(n.next) || e && n.next == 44 ? (n.advance(), true) : false;
  }
  function jd(n) {
    if (n.advance(), n.next == 60) {
      for (n.advance(); ; ) if (!Dc(n, true)) {
        n.next == 62 && n.advance();
        break;
      }
    } else for (; Dc(n, false); ) ;
  }
  function Ml(n) {
    for (n.advance(); !Ri(n.next) && Tr(n.tag) != "f"; ) n.advance();
  }
  function ua(n, e) {
    let t = n.next, i = false, s = n.pos;
    for (n.advance(); ; ) {
      let r = n.next;
      if (r < 0) break;
      if (n.advance(), r == t) if (r == 39) if (n.next == 39) n.advance();
      else break;
      else break;
      else if (r == 92 && t == 34) n.next >= 0 && n.advance();
      else if (Zt(r)) {
        if (e) return false;
        i = true;
      } else if (e && n.pos >= s + 1024) return false;
    }
    return !i;
  }
  function fk(n) {
    for (let e = [], t = n.pos + 1024; ; ) if (n.next == 91 || n.next == 123) e.push(n.next), n.advance();
    else if (n.next == 39 || n.next == 34) {
      if (!ua(n, true)) return false;
    } else if (n.next == 93 || n.next == 125) {
      if (e[e.length - 1] != n.next - 2) return false;
      if (e.pop(), n.advance(), !e.length) return true;
    } else {
      if (n.next < 0 || n.pos > t || Zt(n.next)) return false;
      n.advance();
    }
  }
  const uk = "iiisiiissisfissssssssssssisssiiissssssssssssssssssssssssssfsfssissssssssssssssssssssssssssfif";
  function Tr(n) {
    return n < 33 ? "u" : n > 125 ? "s" : uk[n - 33];
  }
  function Ao(n, e) {
    let t = Tr(n);
    return t != "u" && !(e && t == "f");
  }
  function Kd(n, e, t, i) {
    if (Tr(n.next) == "s" || (n.next == 63 || n.next == 58 || n.next == 45) && Ao(n.peek(1), t)) n.advance();
    else return false;
    let s = n.pos;
    for (; ; ) {
      let r = n.next, o = 0, l = i + 1;
      for (; $d(r); ) {
        if (Zt(r)) {
          if (e) return false;
          l = 0;
        } else l++;
        r = n.peek(++o);
      }
      if (!(r >= 0 && (r == 58 ? Ao(n.peek(o + 1), t) : r == 35 ? n.peek(o - 1) != 32 : Ao(r, t))) || !t && l <= i || l == 0 && !t && (un(n, 45, o) || un(n, 46, o))) break;
      if (e && Tr(r) == "f") return false;
      for (let h = o; h >= 0; h--) n.advance();
      if (e && n.pos > s + 1024) return false;
    }
    return true;
  }
  const dk = new Vr((n, e) => {
    if (n.next == 33) jd(n), n.acceptToken(Zw);
    else if (n.next == 38 || n.next == 42) {
      let t = n.next == 38 ? Yw : Jw;
      Ml(n), n.acceptToken(t);
    } else n.next == 39 || n.next == 34 ? (ua(n, false), n.acceptToken(Gw)) : Kd(n, false, e.context.type == Gn, e.context.depth) && n.acceptToken(Kw);
  }), pk = new Vr((n, e) => {
    let t = e.context.type == Cl ? e.context.depth : -1, i = n.pos;
    e: for (; ; ) {
      let s = 0, r = n.next;
      for (; r == 32; ) r = n.peek(++s);
      if (!s && (un(n, 45, s) || un(n, 46, s)) || !Zt(r) && (t < 0 && (t = Math.max(e.context.depth + 1, s)), s < t)) break;
      for (; ; ) {
        if (n.next < 0) break e;
        let o = Zt(n.next);
        if (n.advance(), o) continue e;
        i = n.pos;
      }
    }
    n.acceptTokenTo(Ud, i);
  }), gk = vu({
    DirectiveName: x.keyword,
    DirectiveContent: x.attributeValue,
    "DirectiveEnd DocEnd": x.meta,
    QuotedLiteral: x.string,
    BlockLiteralHeader: x.special(x.string),
    BlockLiteralContent: x.content,
    Literal: x.content,
    "Key/Literal Key/QuotedLiteral": x.definition(x.propertyName),
    "Anchor Alias": x.labelName,
    Tag: x.typeName,
    Comment: x.lineComment,
    ": , -": x.separator,
    "?": x.punctuation,
    "[ ]": x.squareBracket,
    "{ }": x.brace
  }), mk = Mr.deserialize({
    version: 14,
    states: "5lQ!ZQgOOO#PQfO'#CpO#uQfO'#DOOOQR'#Dv'#DvO$qQgO'#DRO%gQdO'#DUO%nQgO'#DUO&ROaO'#D[OOQR'#Du'#DuO&{QgO'#D^O'rQgO'#D`OOQR'#Dt'#DtO(iOqO'#DbOOQP'#Dj'#DjO(zQaO'#CmO)YQgO'#CmOOQP'#Cm'#CmQ)jQaOOQ)uQgOOQ]QgOOO*PQdO'#CrO*nQdO'#CtOOQO'#Dw'#DwO+]Q`O'#CxO+hQdO'#CwO+rQ`O'#CwOOQO'#Cv'#CvO+wQdO'#CvOOQO'#Cq'#CqO,UQ`O,59[O,^QfO,59[OOQR,59[,59[OOQO'#Cx'#CxO,eQ`O'#DPO,pQdO'#DPOOQO'#Dx'#DxO,zQdO'#DxO-XQ`O,59jO-aQfO,59jOOQR,59j,59jOOQR'#DS'#DSO-hQcO,59mO-sQgO'#DVO.TQ`O'#DVO.YQcO,59pOOQR'#DX'#DXO#|QfO'#DWO.hQcO'#DWOOQR,59v,59vO.yOWO,59vO/OOaO,59vO/WOaO,59vO/cQgO'#D_OOQR,59x,59xO0VQgO'#DaOOQR,59z,59zOOQP,59|,59|O0yOaO,59|O1ROaO,59|O1aOqO,59|OOQP-E7h-E7hO1oQgO,59XOOQP,59X,59XO2PQaO'#DeO2_QgO'#DeO2oQgO'#DkOOQP'#Dk'#DkQ)jQaOOO3PQdO'#CsOOQO,59^,59^O3kQdO'#CuOOQO,59`,59`OOQO,59c,59cO4VQdO,59cO4aQdO'#CzO4kQ`O'#CzOOQO,59b,59bOOQU,5:Q,5:QOOQR1G.v1G.vO4pQ`O1G.vOOQU-E7d-E7dO4xQdO,59kOOQO,59k,59kO5SQdO'#DQO5^Q`O'#DQOOQO,5:d,5:dOOQU,5:R,5:ROOQR1G/U1G/UO5cQ`O1G/UOOQU-E7e-E7eO5kQgO'#DhO5xQcO1G/XOOQR1G/X1G/XOOQR,59q,59qO6TQgO,59qO6eQdO'#DiO6lQgO'#DiO7PQcO1G/[OOQR1G/[1G/[OOQR,59r,59rO#|QfO,59rOOQR1G/b1G/bO7_OWO1G/bO7dOaO1G/bOOQR,59y,59yOOQR,59{,59{OOQP1G/h1G/hO7lOaO1G/hO7tOaO1G/hO8POaO1G/hOOQP1G.s1G.sO8_QgO,5:POOQP,5:P,5:POOQP,5:V,5:VOOQP-E7i-E7iOOQO,59_,59_OOQO,59a,59aOOQO1G.}1G.}OOQO,59f,59fO8oQdO,59fOOQR7+$b7+$bP,XQ`O'#DfOOQO1G/V1G/VOOQO,59l,59lO8yQdO,59lOOQR7+$p7+$pP9TQ`O'#DgOOQR'#DT'#DTOOQR,5:S,5:SOOQR-E7f-E7fOOQR7+$s7+$sOOQR1G/]1G/]O9YQgO'#DYO9jQ`O'#DYOOQR,5:T,5:TO#|QfO'#DZO9oQcO'#DZOOQR-E7g-E7gOOQR7+$v7+$vOOQR1G/^1G/^OOQR7+$|7+$|O:QOWO7+$|OOQP7+%S7+%SO:VOaO7+%SO:_OaO7+%SOOQP1G/k1G/kOOQO1G/Q1G/QOOQO1G/W1G/WOOQR,59t,59tO:jQgO,59tOOQR,59u,59uO#|QfO,59uOOQR<<Hh<<HhOOQP<<Hn<<HnO:zOaO<<HnOOQR1G/`1G/`OOQR1G/a1G/aOOQPAN>YAN>Y",
    stateData: ";S~O!fOS!gOS^OS~OP_OQbORSOTUOWROXROYYOZZO[XOcPOqQO!PVO!V[O!cTO~O`cO~P]OVkOWROXROYeOZfO[dOcPOmhOqQO~OboO~P!bOVtOWROXROYeOZfO[dOcPOmrOqQO~OpwO~P#WORSOTUOWROXROYYOZZO[XOcPOqQO!PVO!cTO~OSvP!avP!bvP~P#|OWROXROYeOZfO[dOcPOqQO~OmzO~P%OOm!OOUzP!azP!bzP!dzP~P#|O^!SO!b!QO!f!TO!g!RO~ORSOTUOWROXROcPOqQO!PVO!cTO~OY!UOP!QXQ!QX!V!QX!`!QXS!QX!a!QX!b!QXU!QXm!QX!d!QX~P&aO[!WOP!SXQ!SX!V!SX!`!SXS!SX!a!SX!b!SXU!SXm!SX!d!SX~P&aO^!ZO!W![O!b!YO!f!]O!g!YO~OP!_O!V[OQaX!`aX~OPaXQaX!VaX!`aX~P#|OP!bOQ!cO!V[O~OP_O!V[O~P#|OWROXROY!fOcPOqQObfXmfXofXpfX~OWROXRO[!hOcPOqQObhXmhXohXphX~ObeXmlXoeX~ObkXokX~P%OOm!kO~Om!lObnPonP~P%OOb!pOo!oO~Ob!pO~P!bOm!sOosXpsX~OosXpsX~P%OOm!uOotPptP~P%OOo!xOp!yO~Op!yO~P#WOS!|O!a#OO!b#OO~OUyX!ayX!byX!dyX~P#|Om#QO~OU#SO!a#UO!b#UO!d#RO~Om#WOUzX!azX!bzX!dzX~O]#XO~O!b#XO!g#YO~O^#ZO!b#XO!g#YO~OP!RXQ!RX!V!RX!`!RXS!RX!a!RX!b!RXU!RXm!RX!d!RX~P&aOP!TXQ!TX!V!TX!`!TXS!TX!a!TX!b!TXU!TXm!TX!d!TX~P&aO!b#^O!g#^O~O^#_O!b#^O!f#`O!g#^O~O^#_O!W#aO!b#^O!g#^O~OPaaQaa!Vaa!`aa~P#|OP#cO!V[OQ!XX!`!XX~OP!XXQ!XX!V!XX!`!XX~P#|OP_O!V[OQ!_X!`!_X~P#|OWROXROcPOqQObgXmgXogXpgX~OWROXROcPOqQObiXmiXoiXpiX~Obkaoka~P%OObnXonX~P%OOm#kO~Ob#lOo!oO~Oosapsa~P%OOotXptX~P%OOm#pO~Oo!xOp#qO~OSwP!awP!bwP~P#|OS!|O!a#vO!b#vO~OUya!aya!bya!dya~P#|Om#xO~P%OOm#{OU}P!a}P!b}P!d}P~P#|OU#SO!a$OO!b$OO!d#RO~O]$QO~O!b$QO!g$RO~O!b$SO!g$SO~O^$TO!b$SO!g$SO~O^$TO!b$SO!f$UO!g$SO~OP!XaQ!Xa!V!Xa!`!Xa~P#|Obnaona~P%OOotapta~P%OOo!xO~OU|X!a|X!b|X!d|X~P#|Om$ZO~Om$]OU}X!a}X!b}X!d}X~O]$^O~O!b$_O!g$_O~O^$`O!b$_O!g$_O~OU|a!a|a!b|a!d|a~P#|O!b$cO!g$cO~O",
    goto: ",]!mPPPPPPPPPPPPPPPPP!nPP!v#v#|$`#|$c$f$j$nP%VPPP!v%Y%^%a%{&O%a&R&U&X&_&b%aP&e&{&e'O'RPP']'a'g'm's'y(XPPPPPPPP(_)e*X+c,VUaObcR#e!c!{ROPQSTUXY_bcdehknrtvz!O!U!W!_!b!c!f!h!k!l!s!u!|#Q#R#S#W#c#k#p#x#{$Z$]QmPR!qnqfPQThknrtv!k!l!s!u#R#k#pR!gdR!ieTlPnTjPnSiPnSqQvQ{TQ!mkQ!trQ!vtR#y#RR!nkTsQvR!wt!RWOSUXY_bcz!O!U!W!_!b!c!|#Q#S#W#c#x#{$Z$]RySR#t!|R|TR|UQ!PUR#|#SR#z#RR#z#SyZOSU_bcz!O!_!b!c!|#Q#S#W#c#x#{$Z$]R!VXR!XYa]O^abc!a!c!eT!da!eQnPR!rnQvQR!{vQ!}yR#u!}Q#T|R#}#TW^Obc!cS!^^!aT!aa!eQ!eaR#f!eW`Obc!cQxSS}U#SQ!`_Q#PzQ#V!OQ#b!_Q#d!bQ#s!|Q#w#QQ$P#WQ$V#cQ$Y#xQ$[#{Q$a$ZR$b$]xZOSU_bcz!O!_!b!c!|#Q#S#W#c#x#{$Z$]Q!VXQ!XYQ#[!UR#]!W!QWOSUXY_bcz!O!U!W!_!b!c!|#Q#S#W#c#x#{$Z$]pfPQThknrtv!k!l!s!u#R#k#pQ!gdQ!ieQ#g!fR#h!hSgPn^pQTkrtv#RQ!jhQ#i!kQ#j!lQ#n!sQ#o!uQ$W#kR$X#pQuQR!zv",
    nodeNames: "\u26A0 DirectiveEnd DocEnd - - ? ? ? Literal QuotedLiteral Anchor Alias Tag BlockLiteralContent Comment Stream BOM Document ] [ FlowSequence Item Tagged Anchored Anchored Tagged FlowMapping Pair Key : Pair , } { FlowMapping Pair Pair BlockSequence Item Item BlockMapping Pair Pair Key Pair Pair BlockLiteral BlockLiteralHeader Tagged Anchored Anchored Tagged Directive DirectiveName DirectiveContent Document",
    maxTerm: 74,
    context: lk,
    nodeProps: [
      [
        "isolate",
        -3,
        8,
        9,
        14,
        ""
      ],
      [
        "openedBy",
        18,
        "[",
        32,
        "{"
      ],
      [
        "closedBy",
        19,
        "]",
        33,
        "}"
      ]
    ],
    propSources: [
      gk
    ],
    skippedNodes: [
      0
    ],
    repeatNodeCount: 6,
    tokenData: "-Y~RnOX#PXY$QYZ$]Z]#P]^$]^p#Ppq$Qqs#Pst$btu#Puv$yv|#P|}&e}![#P![!]'O!]!`#P!`!a'i!a!}#P!}#O*g#O#P#P#P#Q+Q#Q#o#P#o#p+k#p#q'i#q#r,U#r;'S#P;'S;=`#z<%l?HT#P?HT?HU,o?HUO#PQ#UU!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PQ#kTOY#PZs#Pt;'S#P;'S;=`#z<%lO#PQ#}P;=`<%l#P~$VQ!f~XY$Qpq$Q~$bO!g~~$gS^~OY$bZ;'S$b;'S;=`$s<%lO$b~$vP;=`<%l$bR%OX!WQOX%kXY#PZ]%k]^#P^p%kpq#hq;'S%k;'S;=`&_<%lO%kR%rX!WQ!VPOX%kXY#PZ]%k]^#P^p%kpq#hq;'S%k;'S;=`&_<%lO%kR&bP;=`<%l%kR&lUoP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR'VUmP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR'p[!PP!WQOY#PZp#Ppq#hq{#P{|(f|}#P}!O(f!O!R#P!R![)p![;'S#P;'S;=`#z<%lO#PR(mW!PP!WQOY#PZp#Ppq#hq!R#P!R![)V![;'S#P;'S;=`#z<%lO#PR)^U!PP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR)wY!PP!WQOY#PZp#Ppq#hq{#P{|)V|}#P}!O)V!O;'S#P;'S;=`#z<%lO#PR*nUcP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR+XUbP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR+rUqP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR,]UpP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR,vU`P!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#P",
    tokenizers: [
      ak,
      hk,
      dk,
      pk,
      0,
      1
    ],
    topRules: {
      Stream: [
        0,
        15
      ]
    },
    tokenPrec: 0
  }), bk = ur.define({
    name: "yaml",
    parser: mk.configure({
      props: [
        Au.add({
          Stream: (n) => {
            for (let e = n.node.resolve(n.pos, -1); e && e.to >= n.pos; e = e.parent) {
              if (e.name == "BlockLiteralContent" && e.from < e.to) return n.baseIndentFor(e);
              if (e.name == "BlockLiteral") return n.baseIndentFor(e) + n.unit;
              if (e.name == "BlockSequence" || e.name == "BlockMapping") return n.column(e.from, 1);
              if (e.name == "QuotedLiteral") return null;
              if (e.name == "Literal") {
                let t = n.column(e.from, 1);
                if (t == n.lineIndent(e.from, 1)) return t;
                if (e.to > n.pos) return null;
              }
            }
            return null;
          },
          FlowMapping: Xh({
            closing: "}"
          }),
          FlowSequence: Xh({
            closing: "]"
          })
        }),
        Pu.add({
          "FlowMapping FlowSequence": py,
          "Item Pair BlockLiteral": (n, e) => ({
            from: e.doc.lineAt(n.from).to,
            to: n.to
          })
        })
      ]
    }),
    languageData: {
      commentTokens: {
        line: "#"
      },
      indentOnInput: /^\s*[\]\}]$/
    }
  });
  function yk() {
    return new ny(bk);
  }
  const xk = "#e5c07b", Rc = "#e06c75", wk = "#56b6c2", kk = "#ffffff", er = "#abb2bf", Tl = "#7d8799", vk = "#61afef", Sk = "#98c379", Ec = "#d19a66", Ok = "#c678dd", Ck = "#21252b", Bc = "#2c313a", Lc = "#282c34", Mo = "#353a42", Ak = "#3E4451", _c = "#528bff", Mk = E.theme({
    "&": {
      color: er,
      backgroundColor: Lc
    },
    ".cm-content": {
      caretColor: _c
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: _c
    },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: Ak
    },
    ".cm-panels": {
      backgroundColor: Ck,
      color: er
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: "2px solid black"
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "2px solid black"
    },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": {
      backgroundColor: "#6699ff0b"
    },
    ".cm-selectionMatch": {
      backgroundColor: "#aafe661a"
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: Lc,
      color: Tl,
      border: "none"
    },
    ".cm-activeLineGutter": {
      backgroundColor: Bc
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "none",
      backgroundColor: Mo
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: Mo,
      borderBottomColor: Mo
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: Bc,
        color: er
      }
    }
  }, {
    dark: true
  }), Tk = is.define([
    {
      tag: x.keyword,
      color: Ok
    },
    {
      tag: [
        x.name,
        x.deleted,
        x.character,
        x.propertyName,
        x.macroName
      ],
      color: Rc
    },
    {
      tag: [
        x.function(x.variableName),
        x.labelName
      ],
      color: vk
    },
    {
      tag: [
        x.color,
        x.constant(x.name),
        x.standard(x.name)
      ],
      color: Ec
    },
    {
      tag: [
        x.definition(x.name),
        x.separator
      ],
      color: er
    },
    {
      tag: [
        x.typeName,
        x.className,
        x.number,
        x.changed,
        x.annotation,
        x.modifier,
        x.self,
        x.namespace
      ],
      color: xk
    },
    {
      tag: [
        x.operator,
        x.operatorKeyword,
        x.url,
        x.escape,
        x.regexp,
        x.link,
        x.special(x.string)
      ],
      color: wk
    },
    {
      tag: [
        x.meta,
        x.comment
      ],
      color: Tl
    },
    {
      tag: x.strong,
      fontWeight: "bold"
    },
    {
      tag: x.emphasis,
      fontStyle: "italic"
    },
    {
      tag: x.strikethrough,
      textDecoration: "line-through"
    },
    {
      tag: x.link,
      color: Tl,
      textDecoration: "underline"
    },
    {
      tag: x.heading,
      fontWeight: "bold",
      color: Rc
    },
    {
      tag: [
        x.atom,
        x.bool,
        x.special(x.variableName)
      ],
      color: Ec
    },
    {
      tag: [
        x.processingInstruction,
        x.string,
        x.inserted
      ],
      color: Sk
    },
    {
      tag: x.invalid,
      color: kk
    }
  ]), Pk = [
    Mk,
    Fu(Tk)
  ];
  var Dk = xt('<pre class="font-sans"> </pre>'), Rk = xt('<div class="text-error-content bg-error absolute bottom-0 col-start-1 flex w-1/2 justify-center p-2"><!></div>'), Ek = xt('<section class="relative grid h-screen w-screen grid-cols-2"><!> <!> <div class="outline-base-content/10 relative h-full w-full overflow-x-auto outline"><div class=" absolute overflow-y-auto"><!></div></div></section>');
  Vk = function(n, e) {
    Dl(e, true);
    let t = Vp("lightmode"), i = Gr(qp(vg)), s = Gr(""), r = Gr(""), o = qt(() => K(r).split(`
`).length < 2 ? K(r).slice(7) : K(r));
    Qp(() => {
      K(i), Xp(() => {
        try {
          hi(s, hg(K(i)), true), hi(r, "");
        } catch (b) {
          hi(r, b, true), console.error(b);
        }
      });
    });
    var l = Ek(), a = We(l);
    const h = qt(yk), c = qt(() => t() ? void 0 : Pk);
    Ew(a, {
      get lang() {
        return K(h);
      },
      get theme() {
        return K(c);
      },
      placeholder: "Input Schema",
      class: "h-full overflow-auto text-lg",
      nodebounce: true,
      styles: {
        "&": {
          padding: "1rem 0",
          width: "100%"
        }
      },
      get value() {
        return K(i);
      },
      set value(b) {
        hi(i, b, true);
      }
    });
    var f = Ti(a, 2);
    {
      var u = (b) => {
        var y = Rk(), S = We(y);
        {
          var A = (w) => {
            var O = Dk(), M = We(O, true);
            Le(O), Li(() => Ln(M, K(o))), $e(w, O);
          }, C = (w) => {
            var O = Ic();
            Li(() => Ln(O, K(o))), $e(w, O);
          };
          ci(S, (w) => {
            K(o).includes(`
`) ? w(A) : w(C, false);
          });
        }
        Le(y), $e(b, y);
      };
      ci(f, (b) => {
        K(r) && b(u);
      });
    }
    var d = Ti(f, 2), p = We(d), g = We(p);
    Ng(g, {
      get language() {
        return Og;
      },
      get code() {
        return K(s);
      },
      wrapLines: true,
      langtag: true
    }), Le(p), Le(d), Le(l), $e(n, l), Rl();
  };
})();
export {
  __tla,
  Vk as component
};
