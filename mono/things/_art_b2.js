// b2担当：レジ袋・段ボール箱・卵パック・弁当容器の絵（主人公と新しいシーン）
(() => {
  "use strict";
  const r = (x, y, w, h, f, rx, ex) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx || 0}" fill="${f}" ${ex || ""}/>`;
  const e = (x, y, rx, ry, f, ex) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${ex || ""}/>`;
  const ci = (x, y, rad, f, ex) => `<circle cx="${x}" cy="${y}" r="${rad}" fill="${f}" ${ex || ""}/>`;
  const k01 = (c) => Math.max(0, Math.min(1, (c && c.cond != null ? c.cond : 100) / 100));
  // ふつうの段ボール箱（背景用の小さな箱）
  const box = (x, y, w, h, f) => `${r(x, y, w, h, f || "#d6a66a", 3, 'stroke="#a67c45" stroke-width="2"')}${r(x + w / 2 - 5, y, 10, h * 0.45, "#ecdcae", 0, 'opacity=".85"')}`;
  const floorLine = (y, col) => r(0, y, 360, 200 - y, col);

  // ---------- 主人公 ----------
  function bagHero(c, mood) {
    const k = k01(c), f = Math.max(0, Math.min(1, c.fill || 0));
    const kind = (c.v && c.v.bagKind) || "bio";
    const P = { bio: ["#f4faee", "#8fc07a"], normal: ["#f1f6fb", "#9db9d2"], thick: ["#fdf1f3", "#e0a0ae"] }[kind] || ["#f1f6fb", "#9db9d2"];
    const items = f > 0.4 ? `${r(-16, -58, 7, 24, "#6cc06a", 3, 'transform="rotate(-12 -12 -40)"')}${ci(3, -46, 9, "#ee6b5e")}${r(12, -56, 12, 22, "#e8b66f", 5, 'transform="rotate(14 18 -40)"')}` : "";
    const wr = k < 0.75 ? `<path d="M-33 14 l11 4 l-8 7 M30 -4 l-9 5 l8 5" stroke="#9aa4ae" stroke-width="2" fill="none" opacity="${(0.9 - k).toFixed(2)}"/>` : "";
    const tear = k < 0.35 ? `<path d="M20 30 l7 -5 l4 7 l7 -3 l-3 12" stroke="#b0a89c" stroke-width="2.4" fill="#fffdf6"/>` : "";
    return `${items}
    <path d="M-27 -40 Q-36 4 -41 46 Q0 54 41 46 Q36 4 27 -40Z" fill="${P[0]}" stroke="${P[1]}" stroke-width="2.6" opacity="${(0.78 + 0.22 * k).toFixed(2)}"/>
    <path d="M-38 36 q10 -7 19 0 t19 0 t19 0 t19 0" stroke="${P[1]}" fill="none" stroke-width="3" opacity=".55"/>
    <path d="M-27 -40 h54" stroke="${P[1]}" stroke-width="3.5"/>
    <path d="M-22 -40 C-28 -64 -6 -64 -8 -40 M8 -40 C6 -64 28 -64 22 -40" fill="none" stroke="${P[1]}" stroke-width="5" stroke-linecap="round"/>
    <path d="M-22 -34 q-5 28 -7 56" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
    ${wr}${tear}<g transform="translate(2,6) scale(.82)">${face(mood)}</g>`;
  }

  function cardboardHero(c, mood) {
    const k = k01(c), m = (a, b) => Math.round(b + (a - b) * k);
    const col = `rgb(${m(222, 168)},${m(176, 140)},${m(115, 100)})`;
    const top = `rgb(${m(236, 184)},${m(196, 156)},${m(138, 116)})`;
    const dr = c.flags && c.flags.drawn ? `<path transform="translate(-30,-14)" d="M0 -7 L2 -2 L8 -2 L3 2 L5 8 L0 4 L-5 8 L-3 2 L-8 -2 L-2 -2Z" fill="#ffd75e"/><path transform="translate(30,-14)" d="M0 6 q-10 -8 -6 -13 q5 -3 6 3 q1 -6 6 -3 q4 5 -6 13z" fill="#ff7b9c"/>` : "";
    const wet = k < 0.4 ? `<ellipse cx="22" cy="40" rx="18" ry="8" fill="#7a5a36" opacity=".35"/>` : "";
    const dent = k < 0.65 ? `<path d="M42 30 l-9 5 l5 8 l4 7z" fill="#a67c45" opacity=".5"/>` : "";
    return `<path d="M-42 -30 L-30 -48 L30 -48 L42 -30Z" fill="${top}" stroke="#a67c45" stroke-width="2.6" stroke-linejoin="round"/>
    <rect x="-42" y="-30" width="84" height="80" rx="3" fill="${col}" stroke="#a67c45" stroke-width="2.6"/>
    <path d="M-8 -47 h16 v40 l-4 3 l-4 -3 l-4 3 l-4 -3z" fill="#efe2b0" opacity=".9"/>
    <rect x="14" y="31" width="22" height="13" fill="#fffdf6" stroke="#c9b48a" stroke-width="1.5"/><path d="M17 36 h14 M17 40 h9" stroke="#c9b48a" stroke-width="1.5"/>
    <path d="M-42 44 h84" stroke="#a67c45" stroke-width="1.5" opacity=".5"/>
    ${dr}${wet}${dent}<g transform="translate(-2,14) scale(.9)">${face(mood)}</g>`;
  }

  function eggHero(c, mood) {
    const k = k01(c), f = Math.max(0, Math.min(1, c.fill == null ? 1 : c.fill));
    const n = Math.round(f * 6), ec = (c.v && c.v.eggCol) || "#fff6e6";
    const pos = [[-26, -12], [0, -14], [26, -12], [-26, 4], [0, 6], [26, 4]];
    const eggs = pos.slice(0, n).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="15" fill="${ec}" stroke="#d9c192" stroke-width="2"/>`).join("");
    return `<path d="M-44 20 Q-44 -34 0 -34 Q44 -34 44 20Z" fill="#e4f3fb" opacity="${(0.5 + 0.2 * k).toFixed(2)}" stroke="#9dbdd2" stroke-width="2.5"/>
    ${eggs}
    <path d="M-46 18 H46 L42 50 H-42Z" fill="#d3eaf6" stroke="#9dbdd2" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M-46 18 H46" stroke="#9dbdd2" stroke-width="4"/><rect x="-8" y="14" width="16" height="8" rx="3" fill="#bcd9ea" stroke="#9dbdd2" stroke-width="1.5"/>
    <path d="M-34 -6 Q-30 -26 -12 -28" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85"/>
    ${k < 0.5 ? '<path d="M20 -22 l10 8 M14 -8 l12 4" stroke="#fff" stroke-width="2" opacity=".7"/>' : ""}
    <g transform="translate(0,35) scale(.72)">${face(mood)}</g>`;
  }

  function bentoHero(c, mood) {
    const k = k01(c), f = Math.max(0, Math.min(1, c.fill == null ? 1 : c.fill));
    const food = f > 0.15 ? `${e(-16, 0, 22, 11, "#fffdf6", 'stroke="#e6dfcc" stroke-width="1.5"')}${[[-26, -2], [-12, 3], [-20, 6], [-4, -1]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#3a2f2a"/>`).join("")}` : "";
    const food2 = f > 0.5 ? `${ci(24, -6, 8, "#c9803f", 'stroke="#a8652a" stroke-width="1.5"')}${ci(33, 3, 7, "#d99455")}${e(24, 8, 9, 5, "#ffd24a")}${ci(36, 12, 5, "#5fb35a")}${ci(29, 14, 4, "#6cc66a")}` : "";
    const stain = k < 0.8 ? [[-30, -10], [10, -16], [30, -6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${(2 + (1 - k) * 5).toFixed(1)}" fill="#a8652a" opacity=".5"/>`).join("") : "";
    const sticker = c.flags && c.flags.sticker ? `${ci(32, -20, 10, "#ffd75e")}${ci(32, -20, 5, "#ee6b5e")}` : "";
    return `<rect x="-44" y="-8" width="88" height="50" rx="8" fill="#5a5560" stroke="#3a3640" stroke-width="2.5"/>
    <rect x="-38" y="-4" width="50" height="24" rx="6" fill="#4a4650"/><rect x="16" y="-4" width="22" height="24" rx="6" fill="#4a4650"/>
    ${food}${food2}
    <path d="M-44 -8 Q-44 -28 -26 -28 H26 Q44 -28 44 -8Z" fill="#eaf6fb" opacity=".42" stroke="#b8d3e0" stroke-width="2"/>
    <path d="M-34 -20 q4 -5 12 -5" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".85" fill="none"/>
    ${stain}${sticker}
    <rect x="-44" y="14" width="88" height="28" rx="7" fill="#fffdf6" stroke="#3a3640" stroke-width="2.5"/>
    <rect x="-44" y="14" width="88" height="5" fill="#ee8a5b"/>
    <g transform="translate(0,30) scale(.72)">${face(mood)}</g>`;
  }

  ART.b2 = { bagHero, cardboardHero, eggHero, bentoHero };

  // ---------- レジ袋のシーン ----------
  SCENES.b2_film_factory = () => ({ x: 120, y: 102, s: .68, bg: `
    ${r(0, 0, 360, 200, "#e8f3fb")}${r(0, 158, 360, 42, "#c9d6e0")}
    <path d="M22 8 h76 l-18 40 h-40z" fill="#9fb0bf"/>
    ${[[44, 22], [58, 30], [70, 20], [52, 38], [64, 40], [80, 28]].map(([x, y]) => ci(x, y, 3.5, "#fff")).join("")}
    ${r(52, 48, 16, 14, "#7d8f9f")}
    ${r(236, 26, 60, 108, "#ffffff", 30, 'opacity=".7" stroke="#b9d0e0" stroke-width="3"')}
    ${r(224, 16, 84, 12, "#8a9aa8", 6)}${r(224, 132, 84, 10, "#8a9aa8", 6)}
    ${r(10, 150, 340, 12, "#6f8191", 6)}
    ${[34, 76, 118, 160, 202].map((x) => ci(x, 156, 4.5, "#4f5f6d")).join("")}
    ${r(300, 134, 34, 16, "#f7fbff", 3, 'stroke="#b9d0e0" stroke-width="2"')}${r(318, 122, 30, 14, "#f7fbff", 3, 'stroke="#b9d0e0" stroke-width="2"')}
    ${sparkle(190, 40, .7)}${sparkle(330, 70, .6)}` });

  SCENES.b2_bagrack = () => ({ x: 150, y: 126, s: .68, bg: `
    ${r(0, 0, 360, 200, "#fde8e4")}
    ${r(232, 60, 100, 66, "#7fcfc3", 10)}${r(244, 70, 58, 28, "#2d4a47", 4)}${[250, 270, 290].map((x) => ci(x, 112, 6, "#fff", 'opacity=".8"')).join("")}
    ${r(0, 150, 360, 50, "#e7c6b8")}${r(0, 144, 360, 8, "#d3a898")}
    ${r(30, 18, 6, 130, "#9aa4ae", 3)}${r(22, 20, 44, 6, "#9aa4ae", 3)}
    ${[0, 1, 2].map((i) => `<path d="M${38 + i * 6} 28 h24 v${48 - i * 6} q-12 9 -24 0z" fill="#ffffff" stroke="#c4d4e0" stroke-width="2" opacity="${0.95 - i * 0.2}"/>`).join("")}
    ${r(196, 22, 44, 30, "#fff", 4, 'stroke="#e0b8b0" stroke-width="2"')}${ci(218, 37, 7, "#ff9e9e")}` });

  SCENES.b2_walkhome = () => ({ x: 130, y: 136, s: .7, bg: `
    ${r(0, 0, 360, 200, "#ffd9b8")}${ci(290, 70, 28, "#ffb37a")}
    ${r(180, 70, 60, 70, "#f3c9a8")}${r(250, 90, 80, 60, "#e7d3ee")}${r(300, 60, 50, 90, "#d7e3c8")}
    ${r(0, 150, 360, 50, "#b6a8a0")}${r(0, 146, 360, 6, "#d9ccc4")}
    ${[20, 110, 200, 290].map((x) => r(x, 176, 50, 6, "#f2f2f2", 3)).join("")}
    ${r(118, -4, 24, 90, "#7aa7d9", 10)}${ci(130, 90, 11, "#f6c9a8")}
    ${cloud(200, 20, .6)}` });

  SCENES.b2_pantry = () => ({ x: 180, y: 112, s: .7, bg: `
    ${r(0, 0, 360, 200, "#f2e3c8")}${r(24, 14, 312, 176, "#e6cfa6", 6, 'stroke="#b5835a" stroke-width="5"')}
    ${r(24, 150, 312, 10, "#c99a6b")}${r(24, 70, 312, 8, "#c99a6b")}
    ${[[60, 40], [100, 44], [270, 40], [310, 46]].map(([x, y]) => `<path d="M${x - 14} ${y - 14} h28 l-4 34 h-20z" fill="#fff" stroke="#c4d4e0" stroke-width="2" opacity=".9"/>`).join("")}
    ${e(70, 138, 30, 16, "#f4f8fc", 'stroke="#c4d4e0" stroke-width="2"')}${e(300, 134, 30, 18, "#f1f6fb", 'stroke="#c4d4e0" stroke-width="2"')}
    ${r(46, 84, 30, 20, "#e8a35a", 4)}${ci(300, 100, 10, "#cfe8c4")}
    ${c0dark(0)}` });
  function c0dark() { return ""; }

  SCENES.b2_trashcan = () => ({ x: 120, y: 118, s: .7, bg: `
    ${r(0, 0, 360, 200, "#fff0dc")}${floorLine(150, "#e0b788")}${r(0, 146, 360, 6, "#cfa06c")}
    ${r(226, 70, 90, 84, "#9fb0bf", 8, 'stroke="#7d8f9f" stroke-width="3"')}${r(220, 62, 102, 14, "#7d8f9f", 6)}
    <path d="M236 60 q34 -26 70 0" fill="#f4f8fc" stroke="#c4d4e0" stroke-width="2"/>
    ${r(258, 120, 26, 8, "#7d8f9f", 3)}` });

  SCENES.b2_dump = () => ({ x: 130, y: 122, s: .66, bg: `
    ${r(0, 0, 360, 200, "#d8efff")}${r(0, 40, 360, 80, "#f3d9c6")}${r(0, 120, 360, 80, "#a8a29a")}
    ${r(24, 20, 6, 110, "#8a8f96")}${r(10, 16, 34, 26, "#fff", 4, 'stroke="#8a8f96" stroke-width="2"')}${ci(27, 29, 7, "#3fb39a")}
    ${[[230, 140, 26, "#f5a623"], [270, 148, 22, "#8ecbf0"], [300, 138, 28, "#f4f8fc"], [250, 120, 20, "#cfe8c4"], [286, 118, 22, "#e86a6a"]].map(([x, y, rr, f]) => ci(x, y, rr, f, 'stroke="#c4cdd4" stroke-width="2" opacity=".95"')).join("")}
    ${r(210, 100, 120, 70, "#4aa86a", 4, 'opacity=".3" stroke="#3a8a54" stroke-width="2"')}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${210 + i * 24}" y1="100" x2="${210 + i * 24}" y2="170" stroke="#3a8a54" stroke-width="1.5" opacity=".5"/>`).join("")}` });

  SCENES.b2_sky = () => ({ x: 180, y: 92, s: .62, r: 18, bg: `
    ${r(0, 0, 360, 200, "#bfe3ff")}${cloud(20, 40)}${cloud(240, 30, .9)}${cloud(150, 150, .7)}
    <path d="M0 176 q60 -30 120 0 q60 -24 120 0 q60 -30 120 0 v24 h-360z" fill="#9fd08f"/>
    <path d="M30 70 q8 -8 16 0 q8 -8 16 0 M280 100 q6 -6 12 0 q6 -6 12 0" stroke="#3a2f2a" stroke-width="2.5" fill="none"/>
    <path d="M10 110 q40 -10 80 0 M270 60 q30 -8 70 4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>` });

  SCENES.b2_tree = () => ({ x: 214, y: 104, s: .6, r: -8, bg: `
    ${r(0, 0, 360, 200, "#cfe9ff")}${cloud(250, 20, .7)}${r(0, 170, 360, 30, "#a8d88f")}
    ${r(30, 40, 38, 140, "#8a5d3b", 8)}${ci(50, 40, 70, "#7dc47a")}${ci(100, 20, 44, "#8fd08a")}${ci(20, 70, 40, "#6cb86a")}
    <path d="M60 78 Q140 60 300 64" stroke="#8a5d3b" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${ci(250, 56, 14, "#8fd08a")}${ci(280, 58, 12, "#7dc47a")}${ci(150, 66, 11, "#8fd08a")}
    ${ci(100, 150, 7, "#4a3b2a")}` });

  SCENES.b2_river = () => ({ x: 180, y: 128, s: .55, r: 74, bg: `
    ${r(0, 0, 360, 200, "#cfe9ff")}${cloud(40, 24, .7)}
    ${r(0, 56, 360, 36, "#9fd08f")}${r(0, 86, 360, 8, "#7dba74")}
    ${r(0, 94, 360, 106, "#6bbbe0")}
    ${[110, 140, 170].map((y) => `<path d="M0 ${y} q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#a3dcf5" stroke-width="3" fill="none"/>`).join("")}
    ${[[30, 90], [330, 88], [310, 92]].map(([x, y]) => `<path d="M${x} ${y} v-34 M${x + 6} ${y} v-24 M${x - 6} ${y} v-26" stroke="#7aa05a" stroke-width="3"/>`).join("")}` });

  SCENES.b2_landfill = () => ({ x: 200, y: 134, s: .55, r: 20, bg: `
    ${r(0, 0, 360, 200, "#e4e8ec")}${cloud(40, 30, .8)}
    <path d="M0 110 Q90 70 180 100 T360 90 V200 H0z" fill="#b59a74"/><path d="M0 140 Q120 112 360 126 V200 H0z" fill="#9c8260"/><path d="M0 170 Q140 150 360 160 V200 H0z" fill="#85694a"/>
    <path d="M60 60 q8 -8 16 0 q8 -8 16 0 M250 40 q6 -6 12 0 q6 -6 12 0" stroke="#7b726a" stroke-width="2.5" fill="none"/>` });

  SCENES.b2_emergency = () => ({ x: 112, y: 120, s: .62, bg: `
    ${r(0, 0, 360, 200, "#f4ecde")}${r(0, 160, 360, 40, "#dcc9a8")}
    ${r(180, 40, 120, 124, "#e0574c", 20)}${r(196, 100, 88, 50, "#c4443a", 10)}${r(204, 20, 72, 30, "#e0574c", 14, 'stroke="#b23b33" stroke-width="3"')}
    ${r(214, 118, 28, 8, "#f2c94c", 3)}
    ${r(310, 110, 14, 50, "#8ecbf0", 6)}${r(312, 100, 10, 12, "#7bbf6a", 3)}
    ${r(20, 28, 70, 40, "#fffdf6", 4, 'stroke="#d9c7a6" stroke-width="2"')}${r(30, 40, 50, 6, "#e0574c")}${r(30, 52, 36, 5, "#d9c7a6")}` });

  // ---------- 段ボール箱のシーン ----------
  SCENES.b2_papermill = () => ({ x: 112, y: 104, s: .6, bg: `
    ${r(0, 0, 360, 200, "#e9eef2")}${floorLine(158, "#cfd5dc")}
    ${r(190, 30, 150, 100, "#b8c4cf", 10)}${e(265, 80, 52, 36, "#a98a62")}${e(265, 80, 30, 20, "#c9a878")}
    <path d="M200 140 q30 -26 60 0 t60 0" stroke="#a98a62" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${r(10, 150, 330, 10, "#6f8191", 5)}${r(20, 120, 150, 30, "#d9cdb6", 4)}
    ${[40, 80, 120].map((x) => ci(x, 135, 7, "#c9b48a")).join("")}
    ${sparkle(170, 30, .6)}` });

  SCENES.b2_corr_factory = () => ({ x: 180, y: 96, s: .68, bg: `
    ${r(0, 0, 360, 200, "#f6efe2")}${floorLine(150, "#e0cfae")}
    ${r(0, 150, 360, 10, "#b59a74")}
    ${r(0, 168, 360, 6, "#b59a74")}${r(0, 188, 360, 6, "#b59a74")}
    <path d="M0 178 q9 -14 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0" stroke="#c9996a" stroke-width="5" fill="none"/>
    ${ci(60, 40, 26, "#a98a62")}${ci(60, 40, 12, "#d9c4a0")}${ci(300, 40, 26, "#a98a62")}${ci(300, 40, 12, "#d9c4a0")}
    ${sparkle(120, 30, .6)}` });

  SCENES.b2_packing = () => ({ x: 180, y: 100, s: .66, bg: `
    ${r(0, 0, 360, 200, "#eef3f0")}${floorLine(156, "#cfd9d2")}
    ${r(8, 146, 344, 12, "#6f8191", 6)}${[30, 80, 130, 230, 280, 330].map((x) => ci(x, 152, 4, "#4f5f6d")).join("")}
    ${box(34, 112, 36, 34)}${box(290, 112, 36, 34)}
    ${[[100, 130], [124, 128], [244, 130], [268, 128]].map(([x, y], i) => r(x, y, 14, 18, ["#e86a6a", "#7bbf6a", "#f5a623", "#8ecbf0"][i], 3)).join("")}
    ${r(150, 6, 60, 22, "#9fb0bf", 6)}${r(172, 28, 16, 12, "#7d8f9f")}` });

  SCENES.b2_warehouse = () => ({ x: 180, y: 120, s: .6, bg: `
    ${r(0, 0, 360, 200, "#e6e9ee")}${floorLine(156, "#d4d8de")}
    ${r(8, 20, 100, 136, "#c9d2dc", 3)}${r(252, 20, 100, 136, "#c9d2dc", 3)}
    ${[24, 70, 110].map((y) => r(8, y, 100, 5, "#7d8f9f") + r(252, y, 100, 5, "#7d8f9f")).join("")}
    ${box(14, 36, 40, 32)}${box(58, 40, 40, 28)}${box(14, 84, 36, 24)}${box(60, 80, 36, 28)}${box(258, 38, 40, 30)}${box(304, 40, 40, 28)}${box(262, 84, 40, 24)}${box(306, 82, 36, 26)}
    ${r(150, 156, 60, 3, "#f2c94c")}${r(20, 170, 320, 3, "#f2c94c")}` });

  SCENES.b2_backyard = () => ({ x: 214, y: 120, s: .64, bg: `
    ${r(0, 0, 360, 200, "#f1ebe0")}${floorLine(156, "#d9cdb6")}
    ${box(14, 96, 56, 60)}${box(24, 56, 46, 40)}${box(76, 112, 46, 44)}
    ${r(300, 40, 50, 116, "#c9d2dc", 3)}${r(300, 80, 50, 4, "#7d8f9f")}${r(300, 116, 50, 4, "#7d8f9f")}
    ${r(134, 20, 70, 36, "#fffdf6", 4, 'stroke="#d9c7a6" stroke-width="2"')}${ci(150, 38, 9, "#7bbf6a")}${r(166, 32, 28, 4, "#d9c7a6")}${r(166, 42, 20, 4, "#d9c7a6")}` });

  SCENES.b2_doorstep = () => ({ x: 150, y: 134, s: .7, bg: `
    ${r(0, 0, 360, 200, "#cfe8ff")}${r(0, 150, 360, 50, "#bdb5aa")}
    ${r(190, 20, 140, 134, "#b5835a", 6, 'stroke="#8a5d3b" stroke-width="5"')}${r(204, 34, 112, 56, "#d9a875", 4)}${ci(304, 110, 6, "#f2c94c")}${r(310, 60, 28, 22, "#fffdf6", 3)}
    ${r(20, 160, 110, 14, "#8fb98a", 6)}
    ${r(240, 150, 100, 36, "#ff8a5b", 8)}${ci(262, 190, 9, "#3a3a3f")}${ci(318, 190, 9, "#3a3a3f")}
    ${sparkle(60, 40, .8)}` });

  SCENES.b2_room = () => ({ x: 160, y: 128, s: .68, bg: `
    ${r(0, 0, 360, 200, "#fdf2e6")}${floorLine(150, "#e8cba4")}
    ${r(230, 20, 100, 80, "#cfe8ff", 4, 'stroke="#b5835a" stroke-width="5"')}<line x1="280" y1="20" x2="280" y2="100" stroke="#b5835a" stroke-width="4"/>
    ${r(20, 100, 90, 50, "#8fb3d9", 12)}${r(20, 84, 90, 24, "#7aa0c8", 10)}
    ${e(280, 168, 52, 14, "#f4cfcf")}
    ${e(60, 178, 28, 10, "#eaf3fb", 'stroke="#c4d4e0" stroke-width="2"')}${ci(50, 174, 6, "#eaf3fb")}${ci(70, 172, 5, "#eaf3fb")}` });

  SCENES.b2_secretbase = () => ({ x: 180, y: 130, s: .6, bg: `
    ${r(0, 0, 360, 200, "#b88a58")}
    ${r(70, 30, 220, 120, "#cfe9ff", 12, 'stroke="#8a5d3b" stroke-width="8"')}${cloud(120, 56, .6)}
    <path d="M0 150 q30 -20 70 0z M290 150 q30 -20 70 0z" fill="#9fd08f"/>
    ${r(0, 150, 360, 50, "#a67a48")}
    <path d="M20 40 l14 10 l-10 14 M300 170 q10 -14 20 0 q10 -14 20 0" stroke="#ffd75e" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${ci(334, 60, 8, "#ff7b9c")}<path d="M10 100 h40 M12 112 h30" stroke="#6bb4ff" stroke-width="4" stroke-linecap="round"/>
    <path d="M310 120 L350 110 L350 160 L310 150z" fill="#fff6a8" opacity=".5"/>
    ${r(300, 168, 40, 20, "#e8a35a", 4)}` });

  SCENES.b2_catroom = () => ({ x: 150, y: 130, s: .7, bg: `
    ${r(0, 0, 360, 200, "#fff2e0")}${floorLine(152, "#e8cba4")}
    <path d="M200 0 L300 0 L360 160 L230 160z" fill="#fff6c8" opacity=".6"/>
    ${r(20, 20, 90, 70, "#cfe8ff", 4, 'stroke="#b5835a" stroke-width="4"')}
    ${e(280, 150, 40, 24, "#f2a65a")}${ci(262, 124, 20, "#f2a65a")}<path d="M246 112 l4 -18 l12 10z M278 112 l-2 -18 l-12 10z" fill="#f2a65a"/>
    <path d="M254 124 h6 M268 124 h6" stroke="#3a2f2a" stroke-width="2.5" stroke-linecap="round"/><path d="M318 160 q30 -4 24 -34" stroke="#f2a65a" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${[250, 262, 274].map((x) => `<line x1="${x}" y1="134" x2="${x - 4}" y2="140" stroke="#c98a40" stroke-width="2"/>`).join("")}` });

  SCENES.b2_craft = () => ({ x: 200, y: 124, s: .66, bg: `
    ${r(0, 0, 360, 200, "#fdf2dc")}${r(0, 150, 360, 50, "#d9b98a")}${r(0, 146, 360, 8, "#c4a070")}
    ${r(24, 20, 70, 50, "#7bbf9a", 3, 'stroke="#b5835a" stroke-width="4"')}${r(110, 24, 50, 40, "#ffe58f", 3)}${r(170, 22, 40, 44, "#f6c1d0", 3)}
    ${r(24, 96, 50, 52, "#d6a66a", 4, 'stroke="#a67c45" stroke-width="2"')}${r(32, 76, 34, 24, "#d6a66a", 4, 'stroke="#a67c45" stroke-width="2"')}
    ${ci(42, 86, 4, "#3a2f2a")}${ci(58, 86, 4, "#3a2f2a")}<path d="M42 96 h16" stroke="#3a2f2a" stroke-width="2"/>
    ${[290, 312, 334].map((x, i) => r(x, 130, 16, 20, ["#e86a6a", "#4a8fe0", "#ffd24a"][i], 3)).join("")}` });

  SCENES.b2_movingroom = () => ({ x: 150, y: 128, s: .66, bg: `
    ${r(0, 0, 360, 200, "#f7f1e6")}${floorLine(150, "#e6d2ae")}
    ${r(240, 22, 100, 76, "#cfe8ff", 4, 'stroke="#b5835a" stroke-width="5"')}
    ${box(212, 110, 56, 44)}${box(270, 124, 50, 30)}${box(220, 74, 46, 36)}${box(322, 112, 34, 42)}${box(30, 118, 50, 36)}${box(40, 86, 38, 32)}
    ${sparkle(190, 40, .7)}` });

  SCENES.b2_paperyard = () => ({ x: 110, y: 96, s: .58, bg: `
    ${r(0, 0, 360, 200, "#e3eef6")}${floorLine(150, "#c9d2dc")}
    ${[[10, 120], [92, 120], [10, 92], [92, 92]].map(([x, y]) => `${r(x, y, 78, 30, "#c9996a", 3, 'stroke="#a67c45" stroke-width="2"')}<line x1="${x + 20}" y1="${y}" x2="${x + 20}" y2="${y + 30}" stroke="#8a6a3c" stroke-width="2"/><line x1="${x + 58}" y1="${y}" x2="${x + 58}" y2="${y + 30}" stroke="#8a6a3c" stroke-width="2"/>`).join("")}
    ${r(210, 60, 130, 74, "#5b8def", 8)}${r(300, 40, 50, 44, "#4a7cd9", 6)}${r(220, 70, 70, 54, "#d6a66a", 4)}${ci(240, 142, 14, "#3a3a3f")}${ci(318, 142, 14, "#3a3a3f")}` });

  SCENES.b2_gym = () => ({ x: 180, y: 128, s: .56, bg: `
    ${r(0, 0, 360, 200, "#f3e6cf")}${floorLine(110, "#e0b27a")}
    ${r(150, 20, 60, 40, "#fff", 3, 'stroke="#9aa4ae" stroke-width="3"')}${r(170, 40, 20, 16, "none", 0, 'stroke="#e86a6a" stroke-width="3"')}
    ${[20, 250].map((x) => `${r(x, 128, 90, 40, "#d6a66a", 4, 'stroke="#a67c45" stroke-width="2"')}${r(x + 4, 120, 82, 14, "#9ccfe8", 6)}`).join("")}
    ${r(120, 70, 4, 40, "#c4a070")}` });

  SCENES.b2_closet = (c) => ({ x: 180, y: 112, s: .66, bg: `
    ${r(0, 0, 360, 200, "#cdb694")}${r(30, 14, 300, 176, "#b49a76", 4, 'stroke="#8a6a3c" stroke-width="5"')}
    ${r(30, 100, 300, 8, "#8a6a3c")}${r(40, 30, 90, 66, "#e8d0d8", 10)}${r(40, 20, 90, 16, "#f0dde4", 8)}
    ${box(250, 40, 70, 56)}${box(40, 116, 50, 60)}${box(268, 118, 52, 50)}
    ${c && c.flags && c.flags.dark ? '<rect width="360" height="200" fill="#1a1622" opacity=".5"/>' : ""}` });

  // ---------- 卵パックのシーン ----------
  SCENES.b2_moldfactory = () => ({ x: 214, y: 112, s: .64, bg: `
    ${r(0, 0, 360, 200, "#e9f3f8")}${floorLine(156, "#cdd9e0")}
    ${ci(52, 80, 46, "#d7ecf8", 'stroke="#9dbdd2" stroke-width="3" opacity=".9"')}${ci(52, 80, 18, "#bcd9ea")}
    <path d="M96 70 Q130 66 150 90 L180 118" stroke="#cfe6f3" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/>
    ${r(150, 20, 100, 22, "#9fb0bf", 6)}${r(190, 42, 20, 16, "#7d8f9f")}
    ${r(8, 150, 344, 10, "#6f8191", 5)}
    ${[0, 1, 2].map((i) => `<path d="M${270 + i * 24} 150 l12 -20 l12 20z" fill="#d3eaf6" stroke="#9dbdd2" stroke-width="2"/>`).join("")}
    ${sparkle(120, 36, .6)}` });

  SCENES.b2_gp = () => ({ x: 180, y: 112, s: .66, bg: `
    ${r(0, 0, 360, 200, "#fff8e4")}${floorLine(156, "#ead7bd")}
    ${r(8, 146, 344, 12, "#8a9aa8", 6)}
    ${[24, 56, 88, 252, 284, 316].map((x) => e(x, 134, 11, 14, "#fff3dc", 'stroke="#e0c99a" stroke-width="2"')).join("")}
    ${r(150, 8, 60, 20, "#c9d2dc", 6)}${[162, 180, 198].map((x) => e(x, 38, 6, 8, "#fff3dc", 'stroke="#e0c99a" stroke-width="1.5"')).join("")}
    ${sparkle(110, 50, .6)}${sparkle(270, 60, .6)}` });

  SCENES.b2_eggshelf = () => ({ x: 180, y: 104, s: .56, bg: `
    ${r(0, 0, 360, 200, "#fff4e6")}${r(0, 150, 360, 50, "#ead7bd")}
    ${r(0, 92, 360, 8, "#c9915a")}${r(0, 36, 360, 8, "#c9915a")}
    ${[14, 100, 220, 300].map((x) => `${r(x, 52, 48, 40, "#eaf6ff", 6, 'stroke="#a9c7dc" stroke-width="2"')}${[0, 1, 2].map((i) => e(x + 10 + i * 14, 70, 5, 7, "#fff3dc")).join("")}`).join("")}
    ${[14, 300].map((x) => `${r(x, 108, 48, 40, "#eaf6ff", 6, 'stroke="#a9c7dc" stroke-width="2"')}${[0, 1, 2].map((i) => e(x + 10 + i * 14, 126, 5, 7, "#e8c39a")).join("")}`).join("")}
    ${r(150, 150, 60, 16, "#ffe15a", 3)}${r(160, 156, 40, 4, "#c9a85d")}` });

  SCENES.b2_fridge = () => ({ x: 180, y: 112, s: .58, bg: `
    ${r(0, 0, 360, 200, "#eaf4fb")}${r(14, 10, 332, 180, "#f8fcff", 10, 'stroke="#b9d0e0" stroke-width="4"')}
    ${r(14, 76, 332, 6, "#c4d4e0")}${r(14, 140, 332, 6, "#c4d4e0")}
    ${r(30, 28, 22, 46, "#fff", 4, 'stroke="#9fbfd4" stroke-width="2"')}${r(30, 28, 22, 12, "#8ecbf0")}
    ${r(290, 40, 36, 34, "#e86a6a", 8)}${ci(60, 112, 14, "#7bbf6a")}${ci(88, 116, 12, "#9bd48a")}
    ${r(268, 96, 62, 40, "#f4d9a8", 6)}${r(40, 150, 60, 30, "#e8f1f7", 4)}
    <path d="M60 14 L110 14 L90 80 L50 80z" fill="#fff" opacity=".6"/>` });

  SCENES.b2_craftdesk = () => ({ x: 190, y: 120, s: .66, bg: `
    ${r(0, 0, 360, 200, "#fdf5e6")}${r(0, 146, 360, 54, "#d9b98a")}
    ${[30, 48, 66, 84].map((x, i) => r(x, 100 + i * 2, 8, 44, ["#e86a6a", "#4a8fe0", "#7bbf6a", "#ffd24a"][i], 2)).join("")}
    ${r(290, 108, 40, 40, "#f4f8fc", 6, 'stroke="#c4d4e0" stroke-width="2"')}${r(294, 100, 6, 22, "#e86a6a")}${r(306, 96, 6, 26, "#4a8fe0")}
    ${ci(300, 160, 12, "#e86a6a")}${ci(326, 164, 10, "#4a8fe0")}${ci(60, 170, 11, "#ffd24a")}
    ${r(110, 24, 50, 38, "#cfe9ff", 3)}${sparkle(230, 50, .7)}` });

  SCENES.b2_windowsill = () => ({ x: 200, y: 126, s: .64, bg: `
    ${r(0, 0, 360, 200, "#cfe9ff")}${cloud(50, 30, .8)}${ci(300, 40, 20, "#ffe08a")}
    ${r(0, 0, 40, 200, "#f6c1d0")}${r(320, 0, 40, 200, "#f6c1d0")}
    ${r(0, 150, 360, 50, "#c99a6b")}${r(0, 146, 360, 8, "#b5875a")}
    ${[60, 100, 270].map((x) => `${r(x - 14, 128, 28, 20, "#fff3dc", 4, 'stroke="#d9c192" stroke-width="2"')}<path d="M${x} 128 q-8 -14 -2 -20 M${x} 128 q8 -12 4 -22" stroke="#4aa86a" stroke-width="3" fill="none" stroke-linecap="round"/>`).join("")}` });

  SCENES.b2_recyclebox = () => ({ x: 112, y: 120, s: .6, bg: `
    ${r(0, 0, 360, 200, "#e6f5ec")}${floorLine(160, "#cdd9c8")}
    ${r(196, 50, 130, 112, "#3fb39a", 10)}${r(212, 70, 98, 12, "#2a8a76", 6)}
    <path d="M236 116 a16 16 0 1 1 32 0 M268 116 l-6 -6 m6 6 l6 -7" stroke="#fff" stroke-width="4" fill="none"/>
    ${r(10, 20, 90, 50, "#fff", 6, 'stroke="#9fb0bf" stroke-width="2"')}${ci(30, 45, 10, "#7bbf6a")}${r(48, 36, 44, 5, "#d9d9d9")}${r(48, 48, 30, 5, "#d9d9d9")}
    ${sparkle(170, 36, .6)}` });

  // ---------- 弁当容器のシーン ----------
  SCENES.b2_bento_factory = () => ({ x: 180, y: 104, s: .64, bg: `
    ${r(0, 0, 360, 200, "#fff3e6")}${floorLine(156, "#e6d4bc")}
    ${r(8, 146, 344, 12, "#8a9aa8", 6)}
    ${[26, 80, 250, 304].map((x) => `${r(x - 22, 124, 44, 22, "#5a5560", 5)}${ci(x - 8, 130, 7, "#fffdf6")}${ci(x + 10, 130, 6, "#c9803f")}`).join("")}
    ${r(140, 4, 80, 24, "#9fb0bf", 6)}${r(176, 28, 8, 40, "#7d8f9f")}${r(164, 66, 32, 8, "#5fb35a", 4)}
    ${sparkle(110, 40, .6)}${sparkle(280, 50, .7)}` });

  SCENES.b2_conshelf = () => ({ x: 180, y: 102, s: .58, bg: `
    ${r(0, 0, 360, 200, "#eef6ff")}${r(0, 0, 360, 18, "#fffbe0")}
    ${r(10, 20, 340, 174, "#fbfdff", 10, 'stroke="#c4ccd4" stroke-width="5"')}
    ${r(14, 76, 332, 6, "#c4ccd4")}${r(14, 148, 332, 6, "#c4ccd4")}
    ${[26, 74, 242, 292].map((x, i) => `${r(x, 46, 40, 28, "#5a5560", 4)}${r(x + 4, 50, 32, 12, ["#fffdf6", "#f5d9a0", "#e8f0d8", "#fff"][i], 3)}`).join("")}
    ${[26, 74, 242, 292].map((x, i) => `${r(x, 118, 40, 28, "#5a5560", 4)}${r(x + 4, 122, 32, 12, ["#e8f0d8", "#fffdf6", "#fff", "#f5d9a0"][i], 3)}`).join("")}
    ${r(150, 158, 60, 14, "#ffe15a", 3)}${ci(70, 170, 8, "#ffd75e")}${ci(70, 170, 4, "#ee6b5e")}` });

  SCENES.b2_cashier = () => ({ x: 120, y: 130, s: .68, bg: `
    ${r(0, 0, 360, 200, "#fff0e0")}${r(0, 0, 360, 24, "#ffe9b0")}
    ${r(0, 152, 360, 48, "#d9b98a")}${r(0, 146, 360, 8, "#c4a070")}
    ${r(210, 50, 130, 96, "#f4f6f9", 8, 'stroke="#c4ccd4" stroke-width="3"')}${r(222, 62, 80, 56, "#3a3640", 6)}${ci(322, 80, 7, "#8ecbf0")}${ci(322, 100, 7, "#7bbf6a")}
    ${r(222, 126, 80, 8, "#c8ced6", 3)}
    ${r(30, 80, 56, 44, "none", 0, 'stroke="#e86a6a" stroke-width="4"')}${r(30, 80, 56, 8, "#e86a6a")}
    ${sparkle(180, 40, .6)}` });

  SCENES.b2_microwave = () => ({ x: 180, y: 126, s: .66, bg: `
    ${r(0, 0, 360, 200, "#5a3a22")}${ci(180, 40, 160, "#ffb347", 'opacity=".28"')}
    ${r(14, 10, 332, 176, "#f2c27a", 14, 'opacity=".55"')}
    ${e(180, 160, 130, 18, "#f4f8fc", 'stroke="#c4d4e0" stroke-width="3"')}
    ${r(150, 6, 60, 14, "#fff1a8", 7)}
    ${[[50, 60], [80, 30], [290, 70], [310, 40], [260, 28]].map(([x, y]) => `<path d="M${x} ${y} q-10 -10 0 -20 q10 -10 0 -20" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>`).join("")}` });

  SCENES.b2_lunchdesk = () => ({ x: 170, y: 122, s: .68, bg: `
    ${r(0, 0, 360, 200, "#fdf2e6")}${r(220, 14, 120, 80, "#cfe8ff", 4, 'stroke="#b5835a" stroke-width="5"')}${cloud(240, 30, .5)}
    ${ci(60, 50, 24, "#fff", 'stroke="#9aa4ae" stroke-width="3"')}<path d="M60 50 v-14 M60 50 l10 6" stroke="#3a2f2a" stroke-width="3" stroke-linecap="round"/>
    ${r(0, 150, 360, 50, "#c99a6b")}${r(0, 146, 360, 8, "#b5875a")}
    ${r(276, 120, 28, 28, "#fffdf6", 6, 'stroke="#d9c7a6" stroke-width="2"')}${r(280, 124, 20, 8, "#7bbf6a")}
    ${r(24, 124, 8, 24, "#e86a6a", 2)}${r(36, 120, 8, 28, "#4a8fe0", 2)}${r(310, 134, 36, 12, "#d6a66a", 3)}` });

  SCENES.b2_sink = () => ({ x: 180, y: 132, s: .62, r: -8, bg: `
    ${r(0, 0, 360, 200, "#e3f3f7")}${r(0, 0, 360, 60, "#cfe6ec")}
    ${r(150, 6, 20, 40, "#b0bcc6", 6)}${r(140, 38, 60, 12, "#b0bcc6", 6)}${[160, 172].map((x) => `<path d="M${x} 54 q-3 8 0 14 q3 -6 0 -14z" fill="#6bb4ff"/>`).join("")}
    ${r(0, 150, 360, 50, "#c8d0d6")}${r(40, 120, 280, 34, "#eef2f5", 8, 'stroke="#b0bcc6" stroke-width="3"')}
    ${[[70, 110, 12], [92, 100, 8], [290, 108, 14], [262, 98, 9], [310, 90, 7]].map(([x, y, rr]) => ci(x, y, rr, "#fff", 'opacity=".85" stroke="#cfe6ec" stroke-width="1.5"')).join("")}
    ${r(300, 140, 40, 16, "#ffe15a", 4)}` });
})();
