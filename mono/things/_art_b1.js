// 担当 b1：アルミ缶・スチール缶・ガラスびん・牛乳パック・割り箸 のイラスト部品
(() => {
  "use strict";

  // ---------- 小さな絵の部品 ----------
  const rc = (x, y, w, h, f, rx = 0, sk = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${sk}/>`;
  const ci = (x, y, r, f, sk = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${sk}/>`;
  const mcan = (x, y, col, s = 1, tilt = 0) => `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${s})"><rect x="-9" y="-20" width="18" height="40" rx="3" fill="#dfe6ec" stroke="#8c9aa7" stroke-width="1.5"/><rect x="-9" y="-8" width="18" height="16" fill="${col}"/><ellipse cx="0" cy="-20" rx="8" ry="2" fill="#b4c0cb"/></g>`;
  const msteel = (x, y, col, s = 1, tilt = 0) => `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${s})"><rect x="-12" y="-14" width="24" height="30" rx="2" fill="#cfd5d9" stroke="#7e8a93" stroke-width="1.5"/><rect x="-12" y="-6" width="24" height="14" fill="${col}"/><path d="M-12 -11 h24 M-12 12 h24" stroke="#9aa5ad" stroke-width="1.2"/></g>`;
  const mglass = (x, y, col, s = 1, tilt = 0) => `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${s})"><rect x="-3" y="-26" width="6" height="3" fill="#d9a441"/><path d="M-3 -23 h6 v10 c0 4 7 6 7 12 v18 q0 3 -3 3 h-14 q-3 0 -3 -3 v-18 c0 -6 7 -8 7 -12z" fill="${col}" stroke="#6b4423" stroke-opacity=".5" stroke-width="1.2"/><rect x="-7" y="2" width="14" height="10" fill="#fff6e0"/></g>`;
  const mcarton = (x, y, s = 1, tilt = 0) => `<g transform="translate(${x},${y}) rotate(${tilt}) scale(${s})"><path d="M-9 -12 l9 -10 l9 10z" fill="#dbe8f5" stroke="#8fb0d4" stroke-width="1.2"/><rect x="-9" y="-12" width="18" height="32" fill="#ffffff" stroke="#8fb0d4" stroke-width="1.2"/><rect x="-9" y="-2" width="18" height="8" fill="#6aa9e8"/></g>`;
  const chopMini = (x, y, rot, s = 1) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-3" y="-30" width="4" height="60" rx="2" fill="#e8c88a" stroke="#b58b4c" stroke-width="1"/><rect x="3" y="-30" width="4" height="60" rx="2" fill="#e8c88a" stroke="#b58b4c" stroke-width="1"/></g>`;
  const tree = (x, y, s = 1, col = "#6fbf73") => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="0" width="8" height="30" fill="#8a5d3b"/><path d="M0 -40 L-22 4 H22Z" fill="${col}"/><path d="M0 -26 L-26 22 H26Z" fill="${col}" opacity=".9"/></g>`;
  const steam = (x, y) => `<path d="M${x} ${y} q-6 -8 0 -16 q6 -8 0 -16" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;
  const dim = (c) => ((c && c.cond !== undefined && c.cond < 45) ? '<rect x="-60" y="-70" width="120" height="130" fill="#6b5a3a" opacity=".16"/>' : "");

  // ---------- 主人公 ----------
  // アルミ缶
  function canHero(c, mood) {
    const col = (c.v && c.v.canColor) || "#6aa9e8";
    const body = `<rect x="-22" y="-42" width="44" height="88" rx="6" fill="#e2e8ee" stroke="#8c9aa7" stroke-width="2.5"/>
      <path d="M-22 -42 L-17 -50 H17 L22 -42Z" fill="#c3ced8" stroke="#8c9aa7" stroke-width="2"/>
      <path d="M-22 46 L-17 52 H17 L22 46Z" fill="#c3ced8" stroke="#8c9aa7" stroke-width="2"/>
      <ellipse cx="0" cy="-52" rx="16" ry="4" fill="#b4c0cb" stroke="#8c9aa7" stroke-width="1.8"/>
      <ellipse cx="5" cy="-52" rx="7" ry="2.4" fill="#9aa8b5"/><circle cx="-6" cy="-52" r="2.2" fill="#7d8c99"/>
      <rect x="-22" y="-26" width="44" height="50" fill="${col}"/>
      <path d="M-22 -14 q11 -8 22 0 t22 0" stroke="#ffffff" stroke-width="3" fill="none" opacity=".75"/>
      <path d="M-15 -40 v78" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
      <g transform="translate(2,6) scale(.85)">${face(mood)}</g>`;
    if (c.flags && c.flags.crushed) return `<g transform="translate(0,34) scale(1.35,.42) translate(0,-4)">${body}</g><g transform="translate(0,22) scale(.9)">${face(mood)}</g>`;
    return body;
  }

  // スチール缶
  function steelHero(c, mood) {
    const col = (c.v && c.v.steelColor) || "#e0894a";
    const body = `<g transform="scale(1.12) translate(0,4)">
      <rect x="-26" y="-34" width="52" height="76" rx="4" fill="#cfd5d9" stroke="#6f7c86" stroke-width="2.5"/>
      <ellipse cx="0" cy="-35" rx="24" ry="5" fill="#b8c0c6" stroke="#6f7c86" stroke-width="2"/>
      <path d="M-26 -27 h52 M-26 -22 h52 M-26 34 h52 M-26 39 h52" stroke="#8d99a2" stroke-width="2"/>
      <rect x="-26" y="-14" width="52" height="42" fill="${col}"/>
      <path d="M-26 -8 h52 M-26 22 h52" stroke="#ffffff" stroke-width="2" opacity=".7"/>
      <path d="M-19 -32 v70" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".6"/>
      <g transform="translate(0,7) scale(.92)">${face(mood)}</g></g>`;
    if (c.flags && c.flags.crushed) return `<g transform="translate(0,30) scale(1.25,.45)">${body}</g><g transform="translate(0,22) scale(.85)">${face(mood)}</g>`;
    return body;
  }

  // ガラスびん
  const GLASS = { "茶色": ["#a5693a", "#5e3a1c"], "透明": ["#d6eef6", "#7aa6b6"], "緑": ["#6bb274", "#38703f"] };
  function glassHero(c, mood) {
    const g = GLASS[(c.v && c.v.glassColor) || "茶色"] || GLASS["茶色"];
    const label = (c.flags && c.flags.nolabel) ? "" : `<rect x="-20" y="0" width="40" height="34" fill="#fff6e0" stroke="${g[1]}" stroke-width="1.5"/><rect x="-20" y="0" width="40" height="5" fill="#d9a441"/>`;
    return `<rect x="-8" y="-62" width="16" height="7" rx="2" fill="#d9a441" stroke="#a87a1f" stroke-width="1.5"/>
      <path d="M-7 -55 h14 v26 c0 12 14 14 14 28 v46 q0 8 -8 8 h-26 q-8 0 -8 -8 v-46 c0 -14 14 -16 14 -28z" fill="${g[0]}" stroke="${g[1]}" stroke-width="2.5" stroke-linejoin="round"/>
      ${label}
      <path d="M-13 -2 v44" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".55"/>
      <path d="M-3 -52 v18" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <g transform="translate(0,17) scale(.7)">${face(mood)}</g>`;
  }

  // 牛乳パック
  function milkHero(c, mood) {
    const open = c.flags && c.flags.opened;
    const body = `<path d="M-24 -30 L0 -52 L24 -30Z" fill="#dbe8f5" stroke="#7fa3cc" stroke-width="2.5" stroke-linejoin="round"/>
      ${open ? '<path d="M-14 -34 L0 -48 L14 -34Z" fill="#9fc0e0"/><ellipse cx="0" cy="-41" rx="6" ry="3" fill="#ffffff"/>' : '<rect x="-15" y="-61" width="30" height="9" rx="2" fill="#cfe0f2" stroke="#7fa3cc" stroke-width="2"/><path d="M-15 -56 h30" stroke="#7fa3cc" stroke-width="1.5"/>'}
      <rect x="-24" y="-30" width="48" height="82" fill="#ffffff" stroke="#7fa3cc" stroke-width="2.5"/>
      <rect x="-24" y="-30" width="48" height="8" fill="#6aa9e8"/><rect x="-24" y="44" width="48" height="8" fill="#6aa9e8"/>
      <ellipse cx="-15" cy="-12" rx="8" ry="5" fill="#3a3a44" opacity=".85"/><ellipse cx="16" cy="34" rx="7" ry="5" fill="#3a3a44" opacity=".85"/><ellipse cx="-13" cy="36" rx="5" ry="4" fill="#3a3a44" opacity=".85"/>
      <path d="M-18 -18 v54" stroke="#e6f0fa" stroke-width="3" stroke-linecap="round" opacity=".0"/>
      <g transform="translate(0,9) scale(.95)">${face(mood)}</g>`;
    if (c.flags && c.flags.crushed) return `<g transform="translate(0,34) scale(1.3,.42)">${body}</g><g transform="translate(0,24) scale(.9)">${face(mood)}</g>`;
    if (c.flags && c.flags.opened_flat) return `<rect x="-40" y="-10" width="80" height="40" rx="3" fill="#ffffff" stroke="#7fa3cc" stroke-width="2.5"/><rect x="-40" y="-10" width="80" height="7" fill="#6aa9e8"/><g transform="translate(0,12) scale(.9)">${face(mood)}</g>`;
    return body;
  }

  // 割り箸
  function chopHero(c, mood) {
    const f = c.flags || {};
    const wood = f.dirty ? "#e8c88a" : "#f3dfb0";
    const sk = 'stroke="#b58b4c" stroke-width="2.5" stroke-linejoin="round"';
    const sauce = f.dirty ? '<ellipse cx="-4" cy="40" rx="6" ry="3" fill="#8a4b2a" opacity=".75"/><ellipse cx="10" cy="30" rx="4" ry="2.4" fill="#d9822b" opacity=".8"/>' : "";
    if (f.split) {
      return `<polygon points="-34,-52 -10,-52 -5,52 -13,52" fill="${wood}" ${sk}/>
        <polygon points="8,-56 32,-52 18,52 11,52" fill="${wood}" ${sk}/>${sauce}
        <path d="M-27 -44 l4 80" stroke="#ffffff" stroke-width="3" opacity=".5" stroke-linecap="round"/>
        <g transform="translate(-22,-28) scale(.62)">${face(mood)}</g>`;
    }
    const sleeve = f.out ? "" : `<rect x="-26" y="-4" width="52" height="40" rx="3" fill="#fff8ea" stroke="#d9c4a0" stroke-width="2"/><rect x="-26" y="6" width="52" height="6" fill="#e8574c" opacity=".85"/>`;
    return `<polygon points="-22,-30 -2,-30 -1,52 -6,52" fill="${wood}" ${sk}/>
      <polygon points="22,-30 2,-30 1,52 6,52" fill="${wood}" ${sk}/>
      <rect x="-23" y="-62" width="46" height="38" rx="9" fill="${wood}" ${sk}/>
      <path d="M0 -26 v-4" stroke="#b58b4c" stroke-width="2"/>
      ${sleeve}${sauce}
      <path d="M-15 -56 q-3 8 -1 16" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
      <g transform="translate(0,-43) scale(.8)">${face(mood)}</g>`;
  }

  // ---------- 新しいシーン ----------
  const S = SCENES;

  S.b1_canfactory = () => ({ x: 180, y: 106, s: .8, bg: `
    ${rc(0, 0, 360, 200, "#e8eff5")}${rc(0, 156, 360, 44, "#c3cfd9")}
    ${rc(130, 0, 100, 52, "#9fb0bf", 8)}${rc(166, 52, 28, 22, "#7d8f9f")}
    ${ci(52, 100, 40, "#dfe6ec", 'stroke="#9aa8b5" stroke-width="4"')}${ci(52, 100, 14, "#9aa8b5")}${ci(52, 100, 28, "none", 'stroke="#b4c0cb" stroke-width="3"')}
    ${rc(14, 150, 332, 12, "#6f8191", 6)}
    ${[40, 88, 270, 316].map((x) => `<ellipse cx="${x}" cy="143" rx="14" ry="6" fill="#dfe6ec" stroke="#9aa8b5" stroke-width="2"/>`).join("")}
    ${[110, 250].map((x) => mcan(x, 128, "#6aa9e8", .8)).join("")}${sparkle(116, 40, .7)}${sparkle(260, 60, .6)}` });

  S.b1_fillplant = () => ({ x: 180, y: 104, s: .78, bg: `
    ${rc(0, 0, 360, 200, "#e4f2fb")}${rc(0, 152, 360, 48, "#c3d5e2")}
    ${rc(110, 0, 140, 16, "#9fb0bf", 6)}${rc(170, 16, 20, 30, "#7d8f9f")}${rc(176, 46, 8, 12, "#f5a623")}
    ${rc(14, 148, 332, 12, "#6f8191", 6)}
    ${[40, 80, 120, 240, 280, 320].map((x, i) => mcan(x, 126, ["#e9b949", "#e86a6a", "#7bbf6a", "#6aa9e8", "#f5a623", "#c98fd6"][i], .9)).join("")}
    ${[[150, 60], [210, 70], [66, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#a9d8f5" opacity=".8"/>`).join("")}${sparkle(300, 50, .7)}` });

  S.b1_cargo = () => ({ x: 180, y: 100, s: .62, bg: `
    ${rc(0, 0, 360, 200, "#cfeaff")}${cloud(30, 30, .8)}${cloud(260, 24, .7)}
    <path d="M0 120 q60 -40 120 0 q60 -50 130 0 q60 -30 110 0 v20 h-360z" fill="#b6dca0"/>
    ${rc(0, 150, 360, 50, "#8d9196")}${rc(60, 100, 240, 78, "#d6a66a", 4)}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${100 + i * 40}" y1="100" x2="${100 + i * 40}" y2="178" stroke="#c4914f" stroke-width="3"/>`).join("")}
    ${mcan(86, 96, "#e9b949", .8)}${mcarton(270, 94, .8)}${mglass(122, 92, "#a5693a", .8)}` });

  S.b1_cases = () => ({ x: 180, y: 106, s: .68, bg: `
    ${rc(0, 0, 360, 200, "#dff1fb")}${rc(10, 6, 340, 188, "#f6fbff", 10, 'stroke="#c4ccd4" stroke-width="6"')}
    ${rc(16, 140, 328, 8, "#c4ccd4")}${rc(16, 64, 328, 6, "#c4ccd4")}
    ${[50, 80, 110, 250, 280, 310].map((x, i) => (i % 3 === 1 ? mcarton(x, 118, 1.1) : i % 3 === 2 ? mglass(x, 118, "#a5693a", 1.1) : mcan(x, 118, ["#e9b949", "#7bbf6a", "#6aa9e8"][i % 3], 1.1))).join("")}
    ${[50, 90, 130, 170, 210, 250, 290].map((x, i) => mcan(x, 44, ["#e86a6a", "#6aa9e8", "#9a6a48", "#7bbf6a", "#f5a623", "#e9b949", "#c98fd6"][i], .85)).join("")}
    ${rc(150, 146, 60, 16, "#ffe15a", 3)}<text x="180" y="158" font-size="11" text-anchor="middle" font-weight="bold">¥150</text>` });

  S.b1_vend = () => ({ x: 180, y: 76, s: .45, bg: `
    ${rc(0, 0, 360, 200, "#24324d")}${ci(180, 100, 150, "#5b7bb5", 'opacity=".25"')}
    ${rc(62, 8, 236, 200, "#f4f6f9", 10)}${rc(80, 20, 200, 104, "#d7ecff", 6)}
    ${[100, 136, 224, 260].map((x, i) => mcan(x, 56, ["#e9b949", "#e86a6a", "#6aa9e8", "#7bbf6a"][i], .85)).join("")}
    ${[100, 136, 172, 208, 244].map((x, i) => mcan(x + 6, 102, ["#9a6a48", "#f5a623", "#7bbf6a", "#c98fd6", "#6aa9e8"][i], .75)).join("")}
    ${[96, 132, 224, 260].map((x) => rc(x - 8, 78, 16, 6, "#3fb39a", 3)).join("")}
    ${rc(236, 134, 40, 20, "#c8ced6", 4)}${rc(96, 164, 140, 30, "#2b2f36", 6)}` });

  S.b1_canbin = () => ({ x: 180, y: 60, s: .55, bg: `
    ${rc(0, 0, 360, 200, "#e7f3ea")}${rc(0, 176, 360, 24, "#c9d8c5")}
    ${rc(110, 86, 140, 92, "#3fa26b", 10)}${rc(104, 80, 152, 16, "#2f8556", 6)}
    ${[140, 180, 220].map((x) => ci(x, 88, 7, "#1d5a3c")).join("")}
    <text x="180" y="140" font-size="18" fill="#fff" text-anchor="middle" font-weight="bold">あきかん</text>
    ${mcan(60, 160, "#e9b949", .8, 70)}${mcan(300, 164, "#6aa9e8", .8, -60)}` });

  S.b1_sorting = () => ({ x: 180, y: 128, s: .62, bg: `
    ${rc(0, 0, 360, 200, "#eceff3")}${rc(0, 164, 360, 36, "#cfd5dc")}
    <path d="M150 14 v40 a30 30 0 0 0 60 0 v-40 h-18 v40 a12 12 0 0 1 -24 0 v-40z" fill="#e24a4a"/><rect x="150" y="14" width="18" height="10" fill="#dfe6ec"/><rect x="192" y="14" width="18" height="10" fill="#dfe6ec"/>
    ${rc(14, 156, 332, 12, "#6f8191", 6)}
    ${mcan(50, 138, "#e9b949", .8)}${mcan(84, 138, "#6aa9e8", .8)}${msteel(280, 142, "#e0894a", .8)}${mcan(316, 138, "#7bbf6a", .8)}
    ${msteel(210, 64, "#7bbf6a", .7, 8)}
    ${[[130, 36], [236, 40]].map(([x, y]) => sparkle(x, y, .6)).join("")}` });

  S.b1_press = () => ({ x: 180, y: 118, s: .7, bg: `
    ${rc(0, 0, 360, 200, "#eceff3")}${rc(0, 164, 360, 36, "#cfd5dc")}
    ${rc(90, 0, 180, 40, "#7d8f9f", 6)}${rc(160, 40, 40, 24, "#5f7080")}
    ${rc(20, 120, 70, 50, "#9aa8b5", 3, 'stroke="#6f7c88" stroke-width="2"')}${rc(270, 120, 70, 50, "#9aa8b5", 3, 'stroke="#6f7c88" stroke-width="2"')}
    ${[0, 1, 2].map((i) => `<path d="M${20} ${134 + i * 14} h70 M${270} ${134 + i * 14} h70" stroke="#6f7c88" stroke-width="2"/>`).join("")}` });

  S.b1_camp = () => ({ x: 120, y: 132, s: .62, bg: `
    ${rc(0, 0, 360, 200, "#ffcf9e")}${ci(300, 50, 22, "#ffb37a")}${cloud(40, 36, .8)}
    ${tree(40, 90, 1.3)}${tree(330, 80, 1.2)}
    ${rc(0, 156, 360, 44, "#a8d88f")}
    <path d="M230 160 l40 -60 l40 60z" fill="#f2a65a"/><path d="M270 160 l-12 -34 h24z" fill="#8a5d3b"/>
    <path d="M200 164 h60" stroke="#6b4a2e" stroke-width="7" stroke-linecap="round"/>
    <path d="M216 164 q-10 -30 4 -42 q4 12 12 6 q8 14 -2 36z" fill="#ff7a2f"/><path d="M222 164 q-4 -18 4 -26 q6 12 2 26z" fill="#ffd166"/>
    ${rc(176, 150, 36, 8, "#c99a6b", 3)}` });

  S.b1_stadium = () => ({ x: 180, y: 116, s: .66, bg: `
    ${rc(0, 0, 360, 200, "#bfe3ff")}${rc(0, 40, 360, 70, "#8fcf8a")}
    <path d="M0 40 q180 -50 360 0 v10 h-360z" fill="#d9d9e0"/>
    ${Array.from({ length: 36 }, (_, i) => ci(10 + (i % 12) * 30, 20 + Math.floor(i / 12) * 10, 5, ["#e86a6a", "#f5a623", "#6aa9e8", "#fff"][i % 4])).join("")}
    ${rc(0, 110, 360, 90, "#7a6a60")}${rc(60, 140, 240, 14, "#5a4c44", 4)}
    ${rc(130, 96, 100, 70, "#3a3a44", 8)}${ci(180, 100, 40, "none", 'stroke="#555" stroke-width="3"')}` });

  S.b1_carfactory = () => ({ x: 180, y: 118, s: .72, bg: `
    ${rc(0, 0, 360, 200, "#e9eef2")}${rc(0, 160, 360, 40, "#c3cfd9")}
    <path d="M30 150 q10 -40 50 -40 h40 q20 -20 50 -20 q40 0 60 20 h40 q30 0 30 40z" fill="#e86a6a" opacity=".55"/>
    ${ci(90, 156, 16, "#3a3a44")}${ci(270, 156, 16, "#3a3a44")}
    <path d="M300 0 v50 l-40 30" stroke="#f5a623" stroke-width="10" fill="none" stroke-linecap="round"/>${ci(260, 80, 9, "#6f7c88")}
    ${sparkle(50, 40, .7)}${sparkle(320, 110, .6)}` });

  S.b1_steelworks = () => ({ x: 110, y: 124, s: .68, bg: `
    ${rc(0, 0, 360, 200, "#3a2a2a")}${ci(250, 190, 150, "#ff7a2f", 'opacity=".35"')}
    ${rc(180, 60, 150, 120, "#6f7c88", 12)}${rc(196, 80, 118, 80, "#ff9a3c", 10)}${rc(206, 94, 98, 52, "#ffd166", 8)}
    <path d="M230 60 v-40 h40 v40" fill="#5f6b76"/>
    ${[[150, 40], [290, 30], [334, 70], [160, 90]].map(([x, y]) => sparkle(x, y, .8)).join("")}
    ${rc(0, 170, 360, 30, "#4a3a3a")}` });

  S.b1_building = () => ({ x: 110, y: 130, s: .6, bg: `
    ${rc(0, 0, 360, 200, "#cfe8ff")}${cloud(40, 30, .8)}
    ${rc(0, 168, 360, 32, "#c9b88f")}
    ${[170, 240, 310].map((x) => rc(x, 50, 12, 120, "#e8743c")).join("")}${[70, 110, 150].map((y) => rc(160, y, 170, 12, "#e8743c")).join("")}
    <path d="M280 0 v30 h60" stroke="#f2c94c" stroke-width="8" fill="none"/><path d="M340 30 v26" stroke="#555" stroke-width="2"/>${rc(332, 56, 16, 10, "#f2c94c")}
    <path d="M160 70 L330 150 M330 70 L160 150" stroke="#e8743c" stroke-width="4" opacity=".6"/>` });

  S.b1_stock = () => ({ x: 180, y: 112, s: .66, bg: `
    ${rc(0, 0, 360, 200, "#f3ead8")}${rc(0, 160, 360, 40, "#cdb894")}
    ${rc(20, 70, 320, 8, "#9a7a52")}${rc(20, 130, 320, 8, "#9a7a52")}${rc(24, 10, 8, 150, "#9a7a52")}${rc(328, 10, 8, 150, "#9a7a52")}
    ${[44, 74, 104, 250, 280, 310].map((x, i) => msteel(x, 52, ["#e0894a", "#7bbf6a", "#e86a6a", "#e9b949", "#6aa9e8", "#c98fd6"][i], 1.1)).join("")}
    ${[44, 74, 104, 250, 280, 310].map((x, i) => msteel(x, 114, ["#e86a6a", "#e0894a", "#6aa9e8", "#7bbf6a", "#e9b949", "#e0894a"][i], 1.1)).join("")}
    ${rc(150, 2, 60, 22, "#e8574c", 4)}<path d="M180 6 v14 M173 13 h14" stroke="#fff" stroke-width="4"/>` });

  S.b1_sakaya = () => ({ x: 180, y: 110, s: .66, bg: `
    ${rc(0, 0, 360, 200, "#f6e7d0")}${rc(0, 150, 360, 50, "#c99a6b")}
    ${rc(20, 116, 110, 46, "#f2c94c", 4, 'stroke="#c9a02a" stroke-width="3"')}${rc(230, 116, 110, 46, "#f2c94c", 4, 'stroke="#c9a02a" stroke-width="3"')}
    ${[36, 58, 80, 102, 244, 266, 288, 310].map((x, i) => mglass(x, 98, ["#a5693a", "#a5693a", "#6bb274", "#a5693a", "#a5693a", "#d6eef6", "#a5693a", "#a5693a"][i], 1.1)).join("")}
    ${rc(140, 14, 80, 30, "#c0392b", 6)}<text x="180" y="35" font-size="15" fill="#fff" text-anchor="middle" font-weight="bold">さかや</text>` });

  S.b1_bottlewash = () => ({ x: 180, y: 112, s: .7, bg: `
    ${rc(0, 0, 360, 200, "#dff3fb")}${rc(0, 160, 360, 40, "#b7d4e2")}
    ${rc(60, 20, 240, 40, "#9fb0bf", 8)}
    ${[100, 140, 180, 220, 260].map((x) => `<path d="M${x} 60 v34" stroke="#6aa9e8" stroke-width="3" stroke-dasharray="3 5"/>`).join("")}
    ${[[70, 120, 10], [300, 110, 8], [50, 80, 6], [320, 150, 12], [90, 150, 7]].map(([x, y, r]) => ci(x, y, r, "#ffffff", 'opacity=".8" stroke="#a9d8f5" stroke-width="2"')).join("")}
    ${rc(14, 156, 332, 10, "#6f8191", 5)}${sparkle(120, 30, .6)}${sparkle(240, 180, .6)}` });

  S.b1_glassworks = () => ({ x: 130, y: 116, s: .7, bg: `
    ${rc(0, 0, 360, 200, "#2b1a13")}${ci(250, 200, 160, "#ff7a2f", 'opacity=".4"')}
    ${rc(190, 50, 140, 110, "#5f4a3f", 10)}${rc(206, 70, 108, 70, "#ffb347", 8)}${ci(260, 106, 20, "#ffe08a")}
    ${rc(0, 168, 360, 32, "#4a342a")}
    <path d="M190 120 L40 100" stroke="#8a8f96" stroke-width="5" stroke-linecap="round"/>${sparkle(180, 40, .7)}${sparkle(340, 40, .6)}` });

  S.b1_table = () => ({ x: 180, y: 110, s: .66, bg: `
    ${rc(0, 0, 360, 200, "#ffe3c4")}${ci(180, 10, 90, "#fff2c9", 'opacity=".6"')}
    ${rc(0, 150, 360, 50, "#b5835a")}${rc(0, 146, 360, 8, "#9c6d44")}
    ${[[60, 130], [300, 130]].map(([x, y]) => `<path d="M${x - 16} ${y - 20} h32 l-4 36 h-24z" fill="#d7ecff" stroke="#9fbfd4" stroke-width="2"/>`).join("")}
    <ellipse cx="60" cy="168" rx="36" ry="9" fill="#ffffff"/><ellipse cx="300" cy="168" rx="36" ry="9" fill="#ffffff"/>
    ${ci(48, 164, 6, "#e86a6a")}${ci(70, 166, 6, "#f2c94c")}${ci(290, 164, 6, "#7bbf6a")}` });

  S.b1_school = () => ({ x: 180, y: 118, s: .6, bg: `
    ${rc(0, 0, 360, 200, "#fdf3dd")}${rc(30, 10, 300, 70, "#4f8a66", 6, 'stroke="#b5835a" stroke-width="6"')}
    <path d="M60 40 h60 M60 54 h90" stroke="#ffffff" stroke-width="3" opacity=".6"/>
    ${rc(0, 150, 360, 50, "#d9b98a")}
    ${rc(240, 96, 100, 60, "#c0c8d0", 4)}${[252, 276, 300, 324].map((x) => mglass(x, 90, "#f5f1e6", .9)).join("")}
    ${rc(80, 140, 160, 12, "#c99a6b", 4)}${rc(96, 126, 70, 14, "#ffffff", 4, 'stroke="#d8c3a8" stroke-width="2"')}${ci(200, 134, 10, "#ffd1a8")}` });

  S.b1_cullet = () => ({ x: 180, y: 96, s: .6, bg: `
    ${rc(0, 0, 360, 200, "#eceff3")}${rc(0, 164, 360, 36, "#cfd5dc")}
    <path d="M20 170 q30 -70 80 -70 q50 0 80 70z" fill="#d6eef6" opacity=".9"/>
    <path d="M180 170 q30 -60 70 -60 q40 0 70 60z" fill="#a5693a" opacity=".9"/>
    ${[[60, 150], [90, 130], [130, 150], [220, 150], [260, 132], [300, 156], [170, 130], [200, 120]].map(([x, y], i) => `<path d="M${x} ${y} l10 -4 l4 10 l-8 6z" fill="${["#ffffff", "#8ecbf0", "#6bb274", "#c98250"][i % 4]}" stroke="#9fb0bf" stroke-width="1.2"/>`).join("")}
    ${sparkle(120, 80, .7)}${sparkle(280, 90, .6)}` });

  S.b1_wall = () => ({ x: 180, y: 106, s: .5, bg: `
    ${rc(0, 0, 360, 200, "#f3e7d3")}${[30, 130, 230, 330].map((x) => rc(x - 8, 0, 16, 200, "#c99a6b")).join("")}
    ${[[30, 130], [130, 230], [230, 330]].map(([a, b]) => `<rect x="${a + 8}" y="0" width="${b - a - 16}" height="200" fill="#ffd1dc"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${a + 12} ${12 + i * 22} q${(b - a) / 4} -10 ${(b - a) / 2 - 12} 0 t${(b - a) / 2 - 12} 0" stroke="#ffb3c6" stroke-width="3" fill="none"/>`).join("")}`).join("")}` });

  S.b1_roadbase = () => ({ x: 180, y: 110, s: .55, bg: `
    ${rc(0, 0, 360, 200, "#cfe8ff")}${cloud(40, 24, .7)}
    ${rc(0, 70, 360, 20, "#55555c")}${rc(0, 90, 360, 40, "#b0a79a")}${rc(0, 130, 360, 70, "#8a7a62")}
    ${[[40, 112], [100, 104], [150, 118], [260, 108], [320, 114]].map(([x, y]) => `<path d="M${x} ${y} l8 -3 l3 8 l-7 4z" fill="#d6eef6" stroke="#9fb0bf" stroke-width="1"/>`).join("")}
    ${rc(0, 82, 360, 3, "#f2f2f2")}${rc(250, 36, 70, 34, "#f2c94c", 6)}${ci(266, 74, 10, "#3a3a44")}${ci(306, 74, 10, "#3a3a44")}` });

  S.b1_window = () => ({ x: 180, y: 114, s: .68, bg: `
    ${rc(0, 0, 360, 200, "#cfe8ff")}${ci(300, 40, 24, "#ffe08a")}${cloud(40, 40, .8)}
    ${rc(0, 0, 360, 200, "none", 0, 'stroke="#fff" stroke-width="16"')}${rc(176, 0, 8, 160, "#ffffff")}
    ${rc(0, 160, 360, 40, "#e4c9a6")}${rc(0, 156, 360, 8, "#c9a47a")}
    ${[[160, 70], [200, 50], [180, 82]].map(([x, y], i) => `<path d="M180 140 L${x} ${y}" stroke="#4fa563" stroke-width="3"/>${ci(x, y, 12, ["#f5a6c0", "#ffd166", "#ff8a5b"][i])}${ci(x, y, 4, "#fff6c9")}`).join("")}` });

  S.b1_dairy = () => ({ x: 180, y: 126, s: .6, bg: `
    ${rc(0, 0, 360, 200, "#cfeaff")}${cloud(30, 26, .8)}${cloud(250, 20, .7)}
    <path d="M0 100 q60 -34 130 0 q80 -40 230 0 v100 h-360z" fill="#9fd88f"/>
    ${rc(220, 50, 110, 60, "#f6f1e6", 4)}<path d="M214 50 l61 -26 l61 26z" fill="#c0392b"/>${rc(246, 70, 18, 40, "#6aa9e8")}${ci(310, 60, 10, "#cfe0f2", 'stroke="#9fb0bf" stroke-width="2"')}
    ${[[50, 150], [100, 168]].map(([x, y]) => `<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="22" ry="12" fill="#fff" stroke="#8c8c94" stroke-width="2"/><ellipse cx="-6" cy="-2" rx="7" ry="5" fill="#3a3a44"/><circle cx="-24" cy="-4" r="8" fill="#fff" stroke="#8c8c94" stroke-width="2"/><rect x="-14" y="8" width="4" height="12" fill="#8c8c94"/><rect x="10" y="8" width="4" height="12" fill="#8c8c94"/></g>`).join("")}
    ${rc(0, 176, 360, 24, "#7fc07f")}` });

  S.b1_fridge = () => ({ x: 180, y: 106, s: .66, bg: `
    ${rc(0, 0, 360, 200, "#dff1fb")}${rc(10, 8, 340, 186, "#f6fbff", 10, 'stroke="#b8c4cc" stroke-width="6"')}
    ${rc(16, 60, 328, 6, "#c4ccd4")}${rc(16, 142, 328, 6, "#c4ccd4")}
    ${[40, 70, 100].map((x, i) => ci(x, 48, 10, ["#ffd1a8", "#ff8a8a", "#a8d88f"][i])).join("")}${rc(250, 20, 60, 40, "#fff3c4", 4)}
    ${[264, 292].map((x) => ci(x + 8, 128, 12, "#fff3dc", 'stroke="#e8d2a8" stroke-width="2"')).join("")}${rc(40, 100, 34, 40, "#f6c1d0", 4)}
    ${rc(90, 150, 180, 30, "#e8f1f8", 4)}${sparkle(60, 24, .6)}` });

  S.b1_papermill = () => ({ x: 120, y: 116, s: .66, bg: `
    ${rc(0, 0, 360, 200, "#eef1e4")}${rc(0, 164, 360, 36, "#cfd5c4")}
    ${rc(180, 90, 160, 76, "#9fc4d6", 10)}<path d="M186 108 q20 -10 40 0 t40 0 t40 0 t40 0" stroke="#ffffff" stroke-width="4" fill="none" opacity=".8"/>
    ${rc(250, 20, 80, 30, "#9aa6b2", 6)}${ci(40, 40, 28, "#fff", 'stroke="#d8d2c4" stroke-width="3"')}${ci(40, 40, 8, "#c9a47a")}
    ${[[196, 150], [220, 140], [300, 146]].map(([x, y]) => rc(x, y, 14, 6, "#e8c88a", 2)).join("")}${sparkle(160, 40, .6)}` });

  S.b1_tpshelf = () => ({ x: 180, y: 110, s: .62, bg: `
    ${rc(0, 0, 360, 200, "#fdf0f3")}${rc(0, 150, 360, 50, "#ead7bd")}${rc(0, 66, 360, 8, "#d8b98a")}${rc(0, 142, 360, 8, "#d8b98a")}
    ${[30, 70, 110, 250, 290, 330].map((x) => `${rc(x - 16, 28, 32, 38, "#ffffff", 5, 'stroke="#e2d6d9" stroke-width="2"')}${ci(x, 47, 6, "#f4d9de")}`).join("")}
    ${[30, 70, 110, 250, 290, 330].map((x) => `${rc(x - 16, 104, 32, 38, "#ffffff", 5, 'stroke="#e2d6d9" stroke-width="2"')}${ci(x, 123, 6, "#f4d9de")}`).join("")}` });

  S.b1_sink = () => ({ x: 180, y: 122, s: .62, bg: `
    ${rc(0, 0, 360, 200, "#fff0dc")}${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<line x1="${i * 45}" y1="0" x2="${i * 45}" y2="100" stroke="#f3dec2" stroke-width="2"/>`).join("")}
    ${rc(0, 100, 360, 100, "#e0b788")}${rc(40, 108, 280, 80, "#dfe6ec", 14, 'stroke="#b4c0cb" stroke-width="4"')}
    <path d="M240 0 v40 q0 14 -20 14 h-10" stroke="#9aa8b5" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M212 62 v30" stroke="#6aa9e8" stroke-width="5" stroke-dasharray="4 5"/>
    ${[[80, 150, 12], [110, 164, 8], [300, 140, 9]].map(([x, y, r]) => ci(x, y, r, "#ffffff", 'opacity=".85"')).join("")}${rc(268, 132, 30, 14, "#f2c94c", 4)}` });

  S.b1_storebin = () => ({ x: 180, y: 62, s: .55, bg: `
    ${rc(0, 0, 360, 200, "#f1f6ee")}${rc(0, 176, 360, 24, "#d9dfd0")}
    ${rc(0, 20, 360, 16, "#ff8a5b")}
    ${rc(110, 86, 140, 92, "#6aa9e8", 10)}${rc(104, 80, 152, 16, "#4f88c6", 6)}${rc(150, 90, 60, 8, "#1d3f70", 4)}
    <text x="180" y="142" font-size="17" fill="#fff" text-anchor="middle" font-weight="bold">紙パック</text>
    ${mcarton(60, 154, 1, 20)}${mcarton(300, 156, 1, -25)}` });

  S.b1_craftdesk = () => ({ x: 180, y: 112, s: .68, bg: `
    ${rc(0, 0, 360, 200, "#fff5d6")}${rc(0, 140, 360, 60, "#c99a6b")}${rc(0, 134, 360, 8, "#b5835a")}
    ${rc(20, 20, 70, 90, "#ffffff", 3, 'stroke="#e0d6c0" stroke-width="3"')}${ci(55, 60, 14, "#ffd166")}<path d="M36 90 q19 -20 38 0" stroke="#e86a6a" stroke-width="4" fill="none"/>
    ${rc(250, 112, 56, 22, "#f6a6b8", 4)}<path d="M290 120 l40 -24" stroke="#e86a6a" stroke-width="5" stroke-linecap="round"/><path d="M268 150 l30 -10 l4 10z" fill="#6aa9e8"/>
    ${[[110, 150, "#e86a6a"], [140, 156, "#6aa9e8"], [320, 160, "#7bbf6a"]].map(([x, y, col]) => ci(x, y, 7, col)).join("")}` });

  S.b1_forest = () => ({ x: 180, y: 128, s: .6, bg: `
    ${rc(0, 0, 360, 200, "#d6f0d0")}${ci(300, 36, 20, "#ffe9a0")}
    ${tree(40, 80, 1.5, "#4fa563")}${tree(110, 96, 1.2, "#6fbf73")}${tree(250, 90, 1.3, "#4fa563")}${tree(330, 100, 1.6, "#6fbf73")}
    ${rc(0, 160, 360, 40, "#8fcf8a")}${rc(150, 156, 60, 14, "#b5835a", 6)}${ci(210, 163, 7, "#e8c88a", 'stroke="#8a5d3b" stroke-width="2"')}` });

  S.b1_diner = () => ({ x: 214, y: 106, s: .62, bg: `
    ${rc(0, 0, 360, 200, "#ffe9d0")}${rc(20, 14, 320, 30, "#c0392b", 6)}${[0, 1, 2, 3, 4].map((i) => `<path d="M${50 + i * 62} 44 v8 q8 8 16 0 v-8" fill="#c0392b"/>`).join("")}
    ${rc(0, 150, 360, 50, "#b5835a")}${rc(0, 144, 360, 8, "#9c6d44")}
    <path d="M30 150 q0 -40 50 -40 q50 0 50 40z" fill="#ffffff" stroke="#d8c3a8" stroke-width="3"/><ellipse cx="80" cy="112" rx="38" ry="7" fill="#f2c94c"/>${steam(70, 96)}${steam(92, 98)}
    ${rc(290, 100, 40, 50, "#e9ddc4", 6, 'stroke="#c9b48a" stroke-width="2"')}${chopMini(300, 96, -10, .5)}` });

  // ---------- 外から使う部品 ----------
  ART.b1 = { canHero, steelHero, glassHero, milkHero, chopHero, mcan, msteel, mglass, mcarton };
})();
