// グループC1（電化製品・デジタル）のイラスト部品
// 主人公：スマホ・ゲーム機・ノートパソコン・イヤホン・モバイルバッテリー、新しいシーン（c1_ で始まる名前）
(() => {
  "use strict";

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  // 状態(cond)が下がるほど、色をくすませる
  function mixHex(hex, k) {
    const h = String(hex || "#ff9e8a").replace("#", "");
    const n = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    const t = (1 - k) * 0.5;
    const g = [150, 145, 140];
    return `rgb(${n.map((v, i) => Math.round(v + (g[i] - v) * t)).join(",")})`;
  }
  const kOf = (c) => clamp01((c.cond === undefined ? 100 : c.cond) / 100);
  const flag = (c, k) => !!(c.flags && c.flags[k]);
  const COLORS = ["#ff9e8a", "#7fc4f5", "#8fd8b0", "#c6a7f0", "#ffd36b", "#f5a6c8"];

  // ---------- 主人公 ----------
  function phone(c, mood) {
    const col = mixHex(c.v.color, kOf(c));
    const icons = ["#ff9e8a", "#7fc4f5", "#8fd8b0", "#ffd36b"].map((f, i) => `<rect x="${-17 + i * 10.5}" y="30" width="8" height="8" rx="2.5" fill="${f}"/>`).join("");
    const crack = flag(c, "cracked")
      ? `<path d="M10 -53 L2 -30 L12 -14 L-2 4 L8 20 L2 47 M2 -30 L-14 -24 M12 -14 L22 -8 M-2 4 L-16 9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/><path d="M10 -53 L2 -30 L12 -14 L-2 4 L8 20 L2 47 M2 -30 L-14 -24 M12 -14 L22 -8 M-2 4 L-16 9" stroke="#7b726a" stroke-width="1.4" fill="none" stroke-linecap="round"/>`
      : "";
    const drops = flag(c, "wet")
      ? `<path d="M-30 -20 q3 6 0 9 q-3 -3 0 -9z M31 10 q3 6 0 9 q-3 -3 0 -9z M-29 30 q2 5 0 7 q-2 -2 0 -7z" fill="#6bb4ff"/>`
      : "";
    return `<rect x="-27" y="-58" width="54" height="110" rx="12" fill="${col}" stroke="#6b5a52" stroke-width="2.5"/>
      <rect x="-23" y="-53" width="46" height="100" rx="8" fill="#fffaf0"/>
      <rect x="-8" y="-51" width="16" height="4" rx="2" fill="#6b5a52"/>
      <g transform="translate(0,-8) scale(.85)">${face(mood)}</g>
      ${icons}<rect x="-12" y="42" width="24" height="3" rx="1.5" fill="#d9d2c8"/>${crack}${drops}`;
  }

  function gameconsole(c, mood) {
    const col = mixHex(c.v.color, kOf(c));
    const dark = "#4a4f5c";
    return `<rect x="-38" y="-39" width="24" height="9" rx="4" fill="${dark}"/><rect x="14" y="-39" width="24" height="9" rx="4" fill="${dark}"/>
      <rect x="-44" y="-33" width="88" height="64" rx="22" fill="${col}" stroke="#6b5a52" stroke-width="2.5"/>
      <rect x="-24" y="-26" width="48" height="38" rx="5" fill="#f3f7ff" stroke="#6b5a52" stroke-width="2"/>
      <g transform="translate(0,-7) scale(.72)">${face(mood)}</g>
      <rect x="-40" y="-4.5" width="12" height="5" rx="1.5" fill="${dark}"/><rect x="-36.5" y="-8" width="5" height="12" rx="1.5" fill="${dark}"/>
      <circle cx="34" cy="-8" r="3.2" fill="#ffd36b"/><circle cx="34" cy="4" r="3.2" fill="#7fc4f5"/><circle cx="28" cy="-2" r="3.2" fill="#ff9e8a"/><circle cx="40" cy="-2" r="3.2" fill="#8fd8b0"/>
      <circle cx="-30" cy="19" r="5" fill="${dark}"/><circle cx="30" cy="19" r="5" fill="${dark}"/>
      <rect x="-12" y="19" width="9" height="4" rx="2" fill="#fff" opacity=".8"/><rect x="3" y="19" width="9" height="4" rx="2" fill="#fff" opacity=".8"/>`;
  }

  function laptop(c, mood) {
    const col = mixHex(c.v.color, kOf(c));
    const keys = [0, 1, 2].map((r) => Array.from({ length: 9 }, (_, i) => `<rect x="${-32 + i * 7.4 - r * 0}" y="${4 + r * 3.6}" width="5.4" height="2.4" rx=".8" fill="#fff" opacity=".7"/>`).join("")).join("");
    const sticker = flag(c, "sticker") ? `<path transform="translate(26,-44) scale(.9)" d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2Z" fill="#ffd75e" stroke="#e0a82e" stroke-width="1"/>` : "";
    return `<g transform="translate(0,8)">
      <rect x="-38" y="-58" width="76" height="56" rx="6" fill="${col}" stroke="#6b5a52" stroke-width="2.5"/>
      <rect x="-33" y="-53" width="66" height="45" rx="2" fill="#f3f7ff"/>
      <circle cx="0" cy="-56" r="1.4" fill="#6b5a52"/>
      <g transform="translate(0,-31) scale(.85)">${face(mood)}</g>
      <path d="M-38 -2 L38 -2 L48 14 L-48 14 Z" fill="${col}" stroke="#6b5a52" stroke-width="2.5" stroke-linejoin="round"/>
      ${keys}<rect x="-8" y="9" width="16" height="3" rx="1.5" fill="#fff" opacity=".6"/>
      <rect x="-48" y="14" width="96" height="5" rx="2.5" fill="${col}" stroke="#6b5a52" stroke-width="2"/>${sticker}</g>`;
  }

  function earbuds(c, mood) {
    const k = kOf(c);
    const col = mixHex("#fffdf8", k), edge = "#8a8078";
    const bud = (cx, sign) => `<rect x="${sign < 0 ? cx + 6 : cx - 16}" y="2" width="10" height="46" rx="5" fill="${col}" stroke="${edge}" stroke-width="2.5"/>
      <circle cx="${cx}" cy="-12" r="22" fill="${col}" stroke="${edge}" stroke-width="2.5"/>
      <circle cx="${sign < 0 ? cx + 11 : cx - 11}" cy="40" r="2" fill="${k > 0.3 ? "#7be08a" : "#ff9e8a"}"/>
      <g transform="translate(${cx},-12) scale(.72)">${face(mood)}</g>`;
    const lost = flag(c, "lostOne");
    const right = lost
      ? `<circle cx="22" cy="-12" r="22" fill="none" stroke="#b5aca3" stroke-width="2.5" stroke-dasharray="5 5"/><rect x="6" y="2" width="10" height="46" rx="5" fill="none" stroke="#b5aca3" stroke-width="2.5" stroke-dasharray="5 5"/>`
      : bud(22, 1);
    return `${bud(-22, -1)}${right}`;
  }

  function powerbank(c, mood) {
    const col = mixHex(c.v.color, kOf(c));
    const lv = c.cond > 75 ? 4 : c.cond > 50 ? 3 : c.cond > 25 ? 2 : 1;
    const leds = [0, 1, 2, 3].map((i) => `<circle cx="${-15 + i * 10}" cy="36" r="3.4" fill="${i < lv ? "#7be08a" : "#e3dcd2"}" stroke="#6b5a52" stroke-width="1"/>`).join("");
    const hot = flag(c, "hot") ? `<path d="M-36 -40 q-5 8 0 16 q5 8 0 16 M36 -40 q5 8 0 16 q-5 8 0 16" stroke="#ff7b5a" stroke-width="3" fill="none" stroke-linecap="round"/>` : "";
    return `<rect x="-12" y="-62" width="24" height="9" rx="2.5" fill="#9aa4ae" stroke="#6b5a52" stroke-width="2"/><rect x="-6" y="-60" width="12" height="4" rx="1" fill="#4a4f5c"/>
      <rect x="-28" y="-55" width="56" height="106" rx="13" fill="${col}" stroke="#6b5a52" stroke-width="2.5"/>
      <rect x="-23" y="-50" width="46" height="62" rx="9" fill="#fffaf0"/>
      <g transform="translate(0,-19) scale(.88)">${face(mood)}</g>
      <path d="M-20 18 h40" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>${leds}${hot}`;
  }

  ART.c1 = { COLORS, mixHex, phone, gameconsole, laptop, earbuds, powerbank };

  // ---------- 新しいシーン ----------
  const rects = (arr) => arr.map(([x, y, w, h, f, rx]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx || 0}" fill="${f}"/>`).join("");
  const miniDev = (x, y, f) => `<rect x="${x}" y="${y}" width="14" height="24" rx="3" fill="${f}" stroke="#8a8078" stroke-width="1.5"/><rect x="${x + 2}" y="${y + 3}" width="10" height="16" rx="1.5" fill="#fffaf0"/>`;

  // 電子機器の工場（ベルトコンベアと小さなロボット）
  SCENES.c1_factory = () => ({ x: 180, y: 98, s: .75, bg: `
    <rect width="360" height="200" fill="#eaf4ff"/>
    <rect y="150" width="360" height="50" fill="#cfd9e6"/>
    <rect x="0" y="0" width="360" height="14" fill="#d9e6f5"/>${[40, 130, 220, 310].map((x) => `<rect x="${x}" y="10" width="40" height="6" rx="3" fill="#fff"/>`).join("")}
    <rect x="262" y="46" width="22" height="104" fill="#9fb0bf"/><path d="M273 54 L212 36 L196 52" stroke="#7d8f9f" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="196" cy="54" r="7" fill="#f2c94c"/>
    <rect x="10" y="146" width="340" height="12" rx="6" fill="#6f8191"/>${[34, 80, 126, 232, 278, 324].map((x) => `<circle cx="${x}" cy="152" r="4.5" fill="#4f5f6d"/>`).join("")}
    ${[36, 96].map((x) => `<rect x="${x}" y="128" width="32" height="18" rx="2" fill="#4caf7a"/><rect x="${x + 5}" y="133" width="8" height="8" fill="#2f7d52"/><circle cx="${x + 22}" cy="137" r="2.2" fill="#f2d16b"/>`).join("")}
    ${[300].map((x) => `<rect x="${x}" y="128" width="32" height="18" rx="2" fill="#4caf7a"/><circle cx="${x + 8}" cy="137" r="2.2" fill="#f2d16b"/><circle cx="${x + 20}" cy="137" r="2.2" fill="#f2d16b"/>`).join("")}
    ${sparkle(120, 50, .7)}${sparkle(70, 80, .5)}` });

  // 宅配便の箱の中
  SCENES.c1_parcel = () => ({ x: 180, y: 112, s: .72, bg: `
    <rect width="360" height="200" fill="#d6a66a"/>
    <path d="M0 0 L60 40 L300 40 L360 0z" fill="#e6bd85"/><path d="M0 200 L60 160 L300 160 L360 200z" fill="#c4914f"/>
    <rect x="150" y="0" width="60" height="30" fill="#f1dca8" opacity=".9"/>
    <rect x="60" y="40" width="240" height="120" fill="#efe0c8"/>
    ${Array.from({ length: 40 }, (_, i) => `<circle cx="${70 + (i % 10) * 24}" cy="${52 + Math.floor(i / 10) * 30}" r="9" fill="#ffffff" opacity=".55" stroke="#dbe9f2" stroke-width="1.5"/>`).join("")}
    ${sparkle(300, 20, .6)}` });

  // 家電量販店の展示台
  SCENES.c1_store = () => ({ x: 180, y: 94, s: .72, bg: `
    <rect width="360" height="200" fill="#eef3fb"/>
    <path d="M110 0 L250 0 L290 150 L70 150z" fill="#ffffff" opacity=".6"/>
    ${[[14, 18, "#7fc4f5"], [48, 18, "#ff9e8a"], [82, 18, "#8fd8b0"], [262, 18, "#ffd36b"], [296, 18, "#c6a7f0"], [330, 18, "#7fc4f5"]].map(([x, y, f]) => `<rect x="${x}" y="${y}" width="26" height="38" rx="3" fill="${f}"/><rect x="${x + 4}" y="${y + 6}" width="18" height="12" rx="2" fill="#fff" opacity=".7"/>`).join("")}
    <rect x="8" y="60" width="344" height="5" fill="#c4ccd4"/>
    <path d="M300 78 l16 -4 l-4 14 l14 4 l-18 8z" fill="#e2574c"/><rect x="24" y="76" width="52" height="22" rx="4" fill="#ffe15a"/><path d="M38 84 h24 M38 90 h16" stroke="#c9a021" stroke-width="3" stroke-linecap="round"/>
    <rect y="150" width="360" height="50" fill="#dfe6ee"/>
    <rect x="104" y="138" width="152" height="26" rx="6" fill="#ffffff" stroke="#c4ccd4" stroke-width="3"/>
    ${sparkle(120, 70, .7)}${sparkle(250, 90, .6)}` });

  // 中古ショップのガラスケース
  SCENES.c1_usedshop = () => ({ x: 180, y: 108, s: .62, bg: `
    <rect width="360" height="200" fill="#fff1d6"/>
    <rect x="20" y="8" width="320" height="30" rx="8" fill="#f2a14e"/><path d="M160 14 h40 v18 h-40z" fill="#fff" opacity=".85"/><path d="M172 22 h16 M172 28 h10" stroke="#e08a2e" stroke-width="3" stroke-linecap="round"/>
    <rect x="30" y="50" width="300" height="130" rx="10" fill="#e8f5fb" stroke="#a9c7dc" stroke-width="5"/>
    <rect x="34" y="88" width="292" height="5" fill="#c9915a"/><rect x="34" y="140" width="292" height="5" fill="#c9915a"/>
    ${[46, 70, 94, 244, 268, 292].map((x, i) => miniDev(x, 62, ["#7fc4f5", "#ff9e8a", "#8fd8b0", "#ffd36b", "#c6a7f0", "#f5a6c8"][i])).join("")}
    ${[46, 70, 292].map((x, i) => miniDev(x, 114, ["#ffd36b", "#8fd8b0", "#ff9e8a"][i])).join("")}
    <rect x="124" y="150" width="46" height="22" rx="3" fill="#ffe15a"/><path d="M134 158 h26 M134 165 h16" stroke="#c9a021" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 58 L100 170 M70 58 L120 160" stroke="#fff" stroke-width="8" opacity=".35"/>
    <rect y="182" width="360" height="18" fill="#d9b88a"/>` });

  // 教室の机
  SCENES.c1_desk = () => ({ x: 215, y: 104, s: .62, bg: `
    <rect width="360" height="200" fill="#f4ecd8"/>
    <rect x="20" y="10" width="320" height="76" rx="6" fill="#4f8a6a" stroke="#b5835a" stroke-width="7"/>
    <path d="M50 40 q16 -18 32 0 M110 52 h60 M110 64 h40 M220 36 l16 22 l16 -22" stroke="#f2f6f0" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85"/>
    <rect x="14" y="92" width="332" height="6" fill="#c9a26b"/>
    <rect y="124" width="360" height="76" fill="#d9a86a"/><rect y="118" width="360" height="9" fill="#c4914f"/>
    <rect x="34" y="136" width="86" height="50" rx="4" fill="#ffffff" stroke="#d8c3a8" stroke-width="2"/><path d="M44 148 h56 M44 158 h56 M44 168 h38" stroke="#b9d3ec" stroke-width="2.5"/>
    <rect x="272" y="148" width="64" height="9" rx="3" fill="#f2c94c" transform="rotate(-10 304 152)"/><rect x="268" y="150" width="10" height="9" fill="#f5a6c8" transform="rotate(-10 304 152)"/>` });

  // 家の机（在宅・勉強）
  SCENES.c1_homedesk = () => ({ x: 190, y: 106, s: .62, bg: `
    <rect width="360" height="200" fill="#fdf0e0"/>
    <rect x="28" y="20" width="96" height="84" rx="6" fill="#cfe9ff" stroke="#b5835a" stroke-width="5"/><path d="M76 20 v84 M28 62 h96" stroke="#b5835a" stroke-width="3"/>${cloud(34, 40, .5)}
    <rect y="128" width="360" height="72" fill="#c99a6b"/><rect y="122" width="360" height="9" fill="#b5835a"/>
    <path d="M300 122 v-60 l-30 -14" stroke="#7d8f9f" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M256 40 l28 -10 l12 18z" fill="#f2c94c"/><path d="M262 48 l22 -8 l6 16z" fill="#fff6c4" opacity=".7"/>
    <rect x="48" y="132" width="26" height="28" rx="4" fill="#fff"/><path d="M74 140 q12 0 0 12" stroke="#fff" stroke-width="4" fill="none"/><path d="M56 126 q4 -8 0 -14 M66 126 q4 -8 0 -14" stroke="#ddd" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M330 122 q-6 -22 6 -32 q4 20 -6 32 M340 122 q8 -18 0 -30" stroke="#5aa86a" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="326" y="122" width="22" height="18" rx="3" fill="#e58f7c"/>` });

  // カバンの中
  SCENES.c1_bag = () => ({ x: 180, y: 118, s: .66, bg: `
    <rect width="360" height="200" fill="#7f6aa8"/>
    <rect y="0" width="360" height="30" fill="#6a578f"/>${Array.from({ length: 24 }, (_, i) => `<rect x="${i * 15 + 2}" y="26" width="9" height="5" rx="1.5" fill="#cfc3ea"/>`).join("")}
    <rect x="12" y="46" width="94" height="60" rx="8" fill="#a995d0" stroke="#5e4d84" stroke-width="3"/>
    ${miniBottle(310, 112, "#7bbf6a", 1.5)}
    <rect x="248" y="52" width="60" height="44" rx="6" fill="#f5a6c8"/><path d="M256 62 h44" stroke="#fff" stroke-width="3" opacity=".7"/>
    <rect x="30" y="140" width="76" height="46" rx="6" fill="#fff"/><path d="M40 152 h56 M40 162 h56" stroke="#b9d3ec" stroke-width="3"/>
    <circle cx="258" cy="158" r="9" fill="none" stroke="#e8b450" stroke-width="4"/><rect x="266" y="154" width="22" height="8" rx="3" fill="#e8b450"/>` });

  // ソファのすき間
  SCENES.c1_sofa = () => ({ x: 180, y: 120, s: .6, bg: `
    <rect width="360" height="200" fill="#f6dcc8"/>
    <rect x="260" y="14" width="70" height="52" rx="4" fill="#fff" stroke="#c9915a" stroke-width="4"/><circle cx="295" cy="40" r="12" fill="#ffd36b"/>
    <rect x="6" y="56" width="348" height="104" rx="26" fill="#e58f7c"/>
    <rect x="150" y="80" width="60" height="84" fill="#9c5a49"/>
    <rect x="14" y="76" width="140" height="84" rx="20" fill="#f0a595"/><rect x="206" y="76" width="140" height="84" rx="20" fill="#f0a595"/>
    <path d="M30 140 q60 10 110 0 M220 140 q60 10 110 0" stroke="#d9806d" stroke-width="3" fill="none"/>
    <rect y="160" width="360" height="40" fill="#d9b88a"/>
    <path d="M30 40 q30 -20 60 0" stroke="#b9d3ec" stroke-width="0" fill="none"/>` });

  // 駅の落とし物センター
  SCENES.c1_station = () => ({ x: 180, y: 100, s: .6, bg: `
    <rect width="360" height="200" fill="#eef0f4"/>
    <circle cx="180" cy="26" r="17" fill="#fff" stroke="#6f7c88" stroke-width="3"/><path d="M180 26 v-10 M180 26 l8 5" stroke="#3a2f2a" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="10" y="56" width="340" height="4" fill="#b5bcc6"/>
    <path d="M30 56 v-22 q10 -14 20 0 v22z M70 56 l10 -34 l10 34z" fill="#5b8def"/><rect x="108" y="30" width="36" height="26" rx="5" fill="#e58f7c"/><path d="M114 30 q12 -14 24 0" stroke="#a95c4b" stroke-width="3" fill="none"/>
    <path d="M232 56 v-26 l22 6 v20z M270 56 q-4 -22 10 -26 q14 4 10 26z" fill="#ffd36b"/><rect x="306" y="30" width="30" height="26" rx="4" fill="#8fd8b0"/>
    <rect y="124" width="360" height="76" fill="#b5835a"/><rect y="118" width="360" height="10" fill="#c99a6b"/>
    <rect x="258" y="130" width="44" height="22" rx="3" fill="#fff"/><path d="M266 138 h28 M266 145 h18" stroke="#b9d3ec" stroke-width="2.5"/>` });

  // 駅のホームの下（線路）
  SCENES.c1_track = () => ({ x: 180, y: 138, s: .5, bg: `
    <rect width="360" height="200" fill="#3d4a5c"/>
    <rect y="0" width="360" height="78" fill="#cfd5dc"/><rect y="64" width="360" height="9" fill="#f2c94c"/><rect y="78" width="360" height="12" fill="#8a929c"/>
    <rect y="112" width="360" height="88" fill="#8d9196"/>
    ${Array.from({ length: 16 }, (_, i) => `<circle cx="${(i * 47) % 360}" cy="${118 + (i * 31) % 78}" r="${3 + (i % 3)}" fill="#a9adb2"/>`).join("")}
    ${[30, 110, 190, 270, 350].map((x) => `<rect x="${x - 18}" y="116" width="36" height="74" rx="3" fill="#7a5a3c"/>`).join("")}
    <rect y="132" width="360" height="9" fill="#c7ced6"/><rect y="170" width="360" height="9" fill="#c7ced6"/>` });

  // 小型家電の回収ボックス
  SCENES.c1_recycle = () => ({ x: 180, y: 56, s: .5, bg: `
    <rect width="360" height="200" fill="#e7f3ea"/>
    <rect y="176" width="360" height="24" fill="#c9d8c5"/>
    <rect x="104" y="88" width="152" height="90" rx="10" fill="#5bb98c"/>
    <rect x="98" y="82" width="164" height="16" rx="6" fill="#3f9c70"/>
    <rect x="150" y="86" width="60" height="8" rx="3" fill="#1d4f38"/>
    <text x="180" y="142" font-size="14" fill="#fff" text-anchor="middle" font-weight="bold">小型家電</text>
    <path d="M162 158 a12 12 0 1 1 24 0" stroke="#fff" stroke-width="3" fill="none"/><path d="M186 158 l-5 -4 m5 4 l4 -5" stroke="#fff" stroke-width="3"/>` });

  // 金属を取り出す工場
  SCENES.c1_metal = () => ({ x: 92, y: 100, s: .6, bg: `
    <rect width="360" height="200" fill="#eceff3"/>
    <rect y="164" width="360" height="36" fill="#cfd5dc"/>
    <rect x="8" y="136" width="210" height="12" rx="6" fill="#6f8191"/>${[30, 70, 110, 150, 190].map((x) => `<circle cx="${x}" cy="142" r="4" fill="#4f5f6d"/>`).join("")}
    <rect x="150" y="60" width="62" height="40" rx="8" fill="#9aa6b2"/><circle cx="181" cy="106" r="16" fill="#e2574c"/><circle cx="181" cy="106" r="7" fill="#fff"/>
    ${[[238, "#e3c25a"], [278, "#c98250"], [318, "#cfd5dc"]].map(([x, f]) => `<path d="M${x - 22} 190 L${x - 14} 140 H${x + 14} L${x + 22} 190z" fill="#8a929c"/><path d="M${x - 14} 140 q14 -22 28 0z" fill="${f}"/><path d="M${x - 10} 146 h20" stroke="${f}" stroke-width="6"/>`).join("")}
    ${sparkle(238, 118, .8)}${sparkle(284, 112, .6)}${sparkle(320, 120, .6)}
    <rect x="28" y="126" width="14" height="10" fill="#4caf7a"/><rect x="198" y="126" width="12" height="9" fill="#4caf7a"/>` });

  // 修理の作業台
  SCENES.c1_repair = () => ({ x: 180, y: 106, s: .6, bg: `
    <rect width="360" height="200" fill="#e9eef3"/>
    <rect x="30" y="20" width="60" height="50" rx="4" fill="#fff" stroke="#c4ccd4" stroke-width="3"/><path d="M40 34 h40 M40 44 h40 M40 54 h26" stroke="#b9d3ec" stroke-width="3"/>
    <path d="M300 130 L280 60 L240 30" stroke="#7d8f9f" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M226 22 l26 -4 l6 24z" fill="#f2c94c"/>
    <rect y="136" width="360" height="64" fill="#b5835a"/><rect y="130" width="360" height="10" fill="#c99a6b"/>
    <rect x="70" y="142" width="220" height="44" rx="6" fill="#4caf7a"/>
    <rect x="96" y="150" width="9" height="30" rx="3" fill="#e2574c" transform="rotate(30 100 165)"/><rect x="104" y="170" width="3" height="14" fill="#9aa4ae" transform="rotate(30 100 165)"/>
    <circle cx="252" cy="160" r="12" fill="#cfe9ff" stroke="#6f7c88" stroke-width="3"/><path d="M261 169 l12 12" stroke="#6f7c88" stroke-width="4" stroke-linecap="round"/>
    ${[[130, 176], [142, 180], [152, 174]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#d8dde3" stroke="#9aa4ae"/>`).join("")}` });

  // コンセントで充電
  SCENES.c1_charge = () => ({ x: 158, y: 112, s: .62, bg: `
    <rect width="360" height="200" fill="#fdf0e0"/>
    <rect y="164" width="360" height="36" fill="#d9b88a"/><rect y="160" width="360" height="6" fill="#c4a070"/>
    <rect x="270" y="86" width="40" height="56" rx="8" fill="#fff" stroke="#d8c3a8" stroke-width="3"/><rect x="282" y="98" width="4" height="12" fill="#6f7c88"/><rect x="294" y="98" width="4" height="12" fill="#6f7c88"/><circle cx="290" cy="126" r="4" fill="#d8c3a8"/>
    <path d="M282 140 C262 192 236 186 206 132" stroke="#3a3a3f" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path transform="translate(236,62) scale(1.4)" d="M2 -12 L-8 2 H-1 L-3 12 L8 -3 H1z" fill="#ffd75e" stroke="#e0a82e" stroke-width="1.5"/>
    ${sparkle(60, 40, .7)}${sparkle(100, 78, .5)}` });

  // 水の中（お風呂・洗面所・雨）
  SCENES.c1_water = () => ({ x: 180, y: 90, s: .6, r: 14, bg: `
    <rect width="360" height="200" fill="#e3f3f7"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<line x1="${i * 45}" y1="0" x2="${i * 45}" y2="120" stroke="#cfe6ec" stroke-width="2"/>`).join("")}
    <rect y="120" width="360" height="80" fill="#7cc6ea"/>
    ${[150, 168, 186].map((y) => `<path d="M0 ${y} q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#a9dcf3" stroke-width="3" fill="none"/>`).join("")}
    <ellipse cx="180" cy="124" rx="52" ry="8" fill="#a9dcf3" opacity=".7"/>
    ${[[60, 100, 9], [86, 84, 5], [290, 96, 11], [312, 70, 6], [250, 150, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".7"/>`).join("")}
    <path d="M232 70 q5 8 0 12 q-5 -4 0 -12z M128 62 q4 6 0 9 q-4 -3 0 -9z" fill="#6bb4ff"/>` });

  // 夏の車の中
  SCENES.c1_car = () => ({ x: 204, y: 104, s: .6, bg: `
    <rect width="360" height="200" fill="#bfe6ff"/><circle cx="276" cy="40" r="30" fill="#ffb347"/><circle cx="276" cy="40" r="20" fill="#ffd166"/>${cloud(30, 40, .8)}
    <path d="M0 96 q60 -28 130 -4 q60 -22 120 -2 q60 -10 110 6 V120 H0z" fill="#b6dca0"/>
    <rect y="120" width="360" height="80" fill="#4a4f5c"/><rect y="116" width="360" height="10" fill="#6a7080"/>
    <circle cx="48" cy="190" r="56" fill="none" stroke="#2f343e" stroke-width="12"/>
    ${[100, 150, 250, 300].map((x) => `<path d="M${x} 110 q-8 -12 0 -24 q8 -12 0 -24" stroke="#ff9a4d" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>`).join("")}` });

  // キャンプ場の夜
  SCENES.c1_camp = () => ({ x: 128, y: 128, s: .6, bg: `
    <rect width="360" height="200" fill="#1f2a4a"/>
    ${sparkle(40, 30, .6)}${sparkle(120, 52, .4)}${sparkle(200, 22, .5)}${sparkle(300, 38, .7)}${sparkle(260, 74, .4)}<circle cx="326" cy="70" r="14" fill="#ffe9a8"/>
    <path d="M0 130 L70 70 L130 120 L210 56 L290 124 L360 84 V160 H0z" fill="#2c3e66"/>
    <rect y="150" width="360" height="50" fill="#3a5a3e"/>
    <path d="M236 160 L286 90 L336 160z" fill="#ff9a4d"/><path d="M286 90 L270 160 H302z" fill="#ffc78a"/>
    <path d="M190 164 q-12 -22 4 -40 q4 14 12 8 q8 14 -4 32z" fill="#ff7a2f"/><path d="M194 164 q-6 -12 2 -22 q6 10 6 22z" fill="#ffd166"/>
    <circle cx="200" cy="130" r="50" fill="#ff9a4d" opacity=".12" />` });

  // カフェのテーブル
  SCENES.c1_cafe = () => ({ x: 190, y: 98, s: .6, bg: `
    <rect width="360" height="200" fill="#fff3e0"/>
    <rect x="24" y="16" width="130" height="86" rx="6" fill="#cfe9ff" stroke="#b5835a" stroke-width="5"/>${cloud(34, 40, .6)}<path d="M40 102 v-30 M60 102 v-44 M80 102 v-24 M100 102 v-38" stroke="#b5a8d6" stroke-width="10"/>
    <path d="M240 20 q16 20 0 40 M270 20 q16 20 0 40" stroke="#e8c27a" stroke-width="4" fill="none"/><circle cx="256" cy="66" r="10" fill="#ffd36b"/>
    <rect y="128" width="360" height="72" fill="#c99a6b"/><rect y="122" width="360" height="9" fill="#b5835a"/>
    <ellipse cx="290" cy="146" rx="32" ry="8" fill="#fff"/><rect x="272" y="128" width="36" height="18" rx="6" fill="#fff" stroke="#e0d3bf" stroke-width="2"/><path d="M308 134 q12 0 0 10" stroke="#e0d3bf" stroke-width="4" fill="none"/><rect x="274" y="130" width="32" height="6" rx="3" fill="#8a5d3b"/>
    <ellipse cx="62" cy="152" rx="30" ry="8" fill="#fff"/><path d="M44 148 l18 -16 l18 16z" fill="#ffd1dc"/><circle cx="62" cy="130" r="4" fill="#e2574c"/>` });

  // 子ども部屋
  SCENES.c1_kidsroom = () => ({ x: 150, y: 124, s: .66, bg: `
    <rect width="360" height="200" fill="#ffe6ef"/>
    <rect x="30" y="20" width="84" height="76" rx="6" fill="#2f3a66" stroke="#fff" stroke-width="5"/><circle cx="84" cy="44" r="12" fill="#ffe9a8"/>${sparkle(52, 42, .5)}${sparkle(60, 70, .4)}
    <rect y="156" width="360" height="44" fill="#e8c7a0"/>
    <ellipse cx="150" cy="170" rx="110" ry="20" fill="#9ed0ff"/><ellipse cx="150" cy="170" rx="80" ry="13" fill="#c8e4ff"/>
    <rect x="258" y="86" width="100" height="74" rx="8" fill="#fff" stroke="#e0c9b0" stroke-width="3"/><rect x="258" y="86" width="100" height="26" rx="8" fill="#9ed0ff"/><rect x="262" y="70" width="34" height="22" rx="8" fill="#fff" stroke="#e0c9b0" stroke-width="3"/>
    <rect x="30" y="132" width="26" height="26" rx="3" fill="#ffd36b"/><rect x="52" y="146" width="22" height="22" rx="3" fill="#ff9e8a"/><rect x="38" y="118" width="20" height="16" rx="3" fill="#8fd8b0"/>
    <circle cx="238" cy="148" r="12" fill="#f5a6c8"/>` });

  // リビングのテレビの前
  SCENES.c1_livingtv = () => ({ x: 180, y: 148, s: .52, bg: `
    <rect width="360" height="200" fill="#e9f0ff"/>
    <rect x="62" y="10" width="236" height="112" rx="8" fill="#2f3a4a"/>
    <rect x="70" y="18" width="220" height="96" rx="4" fill="#8fd8ff"/>
    <path d="M70 100 L110 62 L150 90 L200 54 L250 92 L290 70 V114 H70z" fill="#6cc27a"/>${cloud(86, 34, .5)}
    <circle cx="170" cy="86" r="8" fill="#ff9e8a"/><rect x="164" y="92" width="12" height="12" rx="3" fill="#e2574c"/>
    <rect x="150" y="122" width="60" height="10" fill="#7d8f9f"/><rect x="130" y="130" width="100" height="6" rx="3" fill="#9fb0bf"/>
    <rect y="140" width="360" height="60" fill="#cfe0cf"/><ellipse cx="180" cy="176" rx="150" ry="22" fill="#b9d3b9"/>
    <path d="M316 150 q0 -30 10 -36 q10 8 6 36z" fill="#e58f7c"/>` });

  // 防災リュック
  SCENES.c1_bousai = () => ({ x: 190, y: 110, s: .6, bg: `
    <rect width="360" height="200" fill="#fff1e0"/>
    <rect y="164" width="360" height="36" fill="#e8c7a0"/>
    <rect x="30" y="30" width="120" height="136" rx="30" fill="#ff8a5b"/><rect x="46" y="96" width="88" height="50" rx="12" fill="#ff9e7a"/><path d="M60 96 v50 M120 96 v50" stroke="#e2674a" stroke-width="3"/>
    <path d="M60 30 q30 -34 60 0" stroke="#e2674a" stroke-width="8" fill="none"/>
    <rect x="256" y="128" width="24" height="36" rx="10" fill="#cfe9ff" stroke="#8fb3cc" stroke-width="2.5"/><rect x="262" y="120" width="12" height="9" rx="2" fill="#7fc4f5"/>
    <rect x="296" y="104" width="46" height="60" rx="6" fill="#4caf7a"/><circle cx="319" cy="132" r="12" fill="#e8f5ee"/><path d="M319 124 v8 l6 4" stroke="#2f7d52" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <rect x="226" y="40" width="70" height="14" rx="7" fill="#f2c94c"/><path d="M296 47 l24 -10 v24z" fill="#ffe9a8"/>` });
})();
