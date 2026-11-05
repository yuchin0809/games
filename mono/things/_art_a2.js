// a2グループ（お札・500円玉・交通系ICカード）のイラスト部品
(() => {
  "use strict";

  // ---- 色をまぜる（#rrggbb 2色を t の割合でまぜて rgb(...) にする）----
  const mixc = (a, b, t) => {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const ch = (s) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
    return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
  };
  const kOf = (c) => Math.max(0, Math.min(1, (c && c.cond != null ? c.cond : 100) / 100));

  // ============================================================
  //  主人公
  // ============================================================
  // お札（ゆるいイラスト。人の顔の肖像は描かない。顔は主人公の顔だけ）
  const BILL = {
    b1000: { base: "#cfe3f3", edge: "#6f93b5", accent: "#4f7fae", num: "1000" },
    b5000: { base: "#e6d9f4", edge: "#9479b8", accent: "#7a5ea6", num: "5000" },
    b10000: { base: "#f1e8c6", edge: "#b09a52", accent: "#8c7a35", num: "10000" }
  };
  function billHero(c, mood, o) {
    const k = kOf(c), f = 0.55 * (1 - k);
    const base = mixc(o.base, "#b9b09c", f), edge = mixc(o.edge, "#8a8478", f), acc = mixc(o.accent, "#8a8478", f);
    const light = mixc(o.base, "#ffffff", 0.6);
    const crease = k < 0.65 ? `<path d="M-14 -26 L-8 -4 L-14 26" stroke="${edge}" stroke-width="1.6" fill="none" opacity=".5"/><path d="M20 -26 L25 2 L21 26" stroke="${edge}" stroke-width="1.6" fill="none" opacity=".45"/>` : "";
    const tear = k < 0.4 ? `<path d="M45 -26 L33 -26 L45 -14z" fill="#fbf7f0" stroke="${edge}" stroke-width="1.6"/>` : "";
    return `<rect x="-45" y="-26" width="90" height="52" rx="5" fill="${base}" stroke="${edge}" stroke-width="2.5"/>
      <rect x="-40" y="-21" width="80" height="42" rx="3" fill="none" stroke="${acc}" stroke-width="1.4" stroke-dasharray="3 2.4"/>
      <ellipse cx="0" cy="0" rx="23" ry="19" fill="${light}" stroke="${acc}" stroke-width="1.6"/>
      <text x="-39" y="-12" font-size="8" font-weight="bold" fill="${acc}">${o.num}</text>
      <text x="39" y="19" font-size="8" font-weight="bold" fill="${acc}" text-anchor="end">${o.num}</text>
      <rect x="29" y="-12" width="9" height="24" rx="3" fill="#cfe6ff" stroke="${acc}" stroke-width="1"/>
      <rect x="31" y="-9" width="2" height="18" fill="#ffd1e8"/><rect x="34" y="-9" width="2" height="18" fill="#d6f5c9"/>
      <circle cx="-33" cy="11" r="5" fill="none" stroke="${acc}" stroke-width="1.4"/><circle cx="-33" cy="11" r="1.6" fill="${acc}"/>
      ${crease}${tear}
      <g transform="translate(0,1) scale(.85)">${face(mood)}</g>`;
  }

  // 500円玉：外がわは白っぽい金属、まん中は金色（バイカラー・クラッド）。ふちはななめのギザギザ
  const TICKS = Array.from({ length: 40 }, (_, i) => {
    const a = (i * 9) * Math.PI / 180, b = (i * 9 + 5) * Math.PI / 180;
    return `<line x1="${(Math.cos(a) * 33).toFixed(1)}" y1="${(Math.sin(a) * 33).toFixed(1)}" x2="${(Math.cos(b) * 36).toFixed(1)}" y2="${(Math.sin(b) * 36).toFixed(1)}"/>`;
  }).join("");
  function coin500Hero(c, mood) {
    const k = kOf(c), f = 0.5 * (1 - k);
    const outer = mixc("#e9edf2", "#b5b8bb", f), inner = mixc("#f2d97f", "#c4ae78", f);
    return `<circle r="35" fill="${outer}" stroke="#9aa4ae" stroke-width="3"/>
      <g stroke="#9aa4ae" stroke-width="1.6" stroke-linecap="round">${TICKS}</g>
      <circle r="29.5" fill="none" stroke="#c4ccd4" stroke-width="1.5"/>
      <circle r="26" fill="${inner}" stroke="#c9a85d" stroke-width="2"/>
      <path d="M0 -22 q-6 3 -4 8 q4 -2 4 -8z M0 -22 q6 3 4 8 q-4 -2 -4 -8z" fill="#d6b64f"/>
      <text x="0" y="22" font-size="9" font-weight="bold" fill="#a8851f" text-anchor="middle">500</text>
      <g transform="translate(0,-1) scale(.85)">${face(mood)}</g>`;
  }

  // 交通系ICカード：チップとかざすマーク。下の細い帯は「残高メーター」（cond）。ブランドの絵は入れない
  const CARD_COLORS = ["#bfeedd", "#cde4ff", "#ffd9e6", "#fff0b8", "#e3d5f3"];
  function cardHero(c, mood) {
    const col = (c && c.v && c.v.cardCol) || CARD_COLORS[0];
    const k = kOf(c);
    return `<rect x="-42" y="-28" width="84" height="56" rx="9" fill="${col}" stroke="#6f9d90" stroke-width="2.5"/>
      <path d="M-42 15 L42 -7 V3 L-42 25z" fill="#ffffff" opacity=".5"/>
      <rect x="-34" y="-22" width="14" height="11" rx="2.5" fill="#f2d58a" stroke="#c9a85d" stroke-width="1.2"/>
      <path d="M-34 -16.5 h14 M-27 -22 v11" stroke="#c9a85d" stroke-width="1"/>
      <path d="M24 -20 q6 5 0 10 M29 -23 q9 8 0 16 M34 -26 q12 11 0 22" stroke="#4a8f7e" fill="none" stroke-width="2" stroke-linecap="round"/>
      <g transform="translate(0,-1) scale(.8)">${face(mood)}</g>
      <rect x="-34" y="19" width="68" height="5" rx="2.5" fill="#ffffff" opacity=".85"/>
      <rect x="-34" y="19" width="${(68 * k).toFixed(1)}" height="5" rx="2.5" fill="${k < 0.25 ? "#e86a6a" : "#3fb39a"}"/>`;
  }

  ART.a2 = {
    BILL, CARD_COLORS, mixc,
    billHero, coin500Hero, cardHero
  };

  // ============================================================
  //  新しいシーン（名前は a2_ で始める）
  // ============================================================
  const tag = (x, y, w, h, col) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${col}"/>`;

  // ATM
  SCENES.a2_atm = () => ({ x: 180, y: 120, s: .8, bg: `
    <rect width="360" height="200" fill="#e6eff7"/>
    <rect x="30" y="8" width="300" height="186" rx="16" fill="#8fb6d8" stroke="#6c93b6" stroke-width="4"/>
    <rect x="56" y="24" width="124" height="70" rx="8" fill="#2d4a47"/>
    <path d="M70 76 l18 -16 l14 8 l22 -22 l26 12" stroke="#9ff5d9" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${[0, 1, 2].map((r) => [0, 1, 2].map((q) => `<rect x="${212 + q * 28}" y="${28 + r * 22}" width="22" height="16" rx="4" fill="#eef5fb"/>`).join("")).join("")}
    <rect x="212" y="98" width="78" height="10" rx="5" fill="#26303a"/>
    <rect x="70" y="116" width="220" height="16" rx="8" fill="#26303a"/>
    <rect x="60" y="146" width="240" height="38" rx="10" fill="#6c93b6"/>
    ${sparkle(318, 30, .7)}` });

  // 改札
  SCENES.a2_gate = () => ({ x: 180, y: 92, s: .8, bg: `
    <rect width="360" height="200" fill="#eef3ec"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<line x1="${i * 45}" y1="0" x2="${i * 45}" y2="100" stroke="#dbe5dc" stroke-width="2"/>`).join("")}
    <rect x="22" y="14" width="120" height="30" rx="6" fill="#2f8f6e"/><path d="M40 29 h50 m-10 -8 l10 8 l-10 8" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
    <rect y="150" width="360" height="50" fill="#c9cfd6"/>
    <rect x="12" y="98" width="94" height="68" rx="8" fill="#cfd8e0" stroke="#a7b4c0" stroke-width="3"/>
    <rect x="254" y="98" width="94" height="68" rx="8" fill="#cfd8e0" stroke="#a7b4c0" stroke-width="3"/>
    <rect x="106" y="118" width="12" height="34" rx="4" fill="#ffd75e"/><rect x="242" y="118" width="12" height="34" rx="4" fill="#ffd75e"/>
    <rect x="128" y="130" width="104" height="40" rx="10" fill="#b6c3cf" stroke="#93a3b2" stroke-width="3"/>
    <circle cx="180" cy="150" r="14" fill="#3fb39a" opacity=".85"/>
    <path d="M156 120 q24 -12 48 0 M164 128 q16 -8 32 0" stroke="#3fb39a" stroke-width="3" fill="none" stroke-linecap="round"/>` });

  // ポチ袋（お年玉など）
  SCENES.a2_envelope = () => ({ x: 180, y: 92, s: .8, bg: `
    <rect width="360" height="200" fill="#fff1f1"/>
    <rect x="96" y="104" width="168" height="90" rx="10" fill="#ffc4d4" stroke="#e88aa0" stroke-width="4"/>
    <path d="M96 114 L180 160 L264 114" fill="none" stroke="#e88aa0" stroke-width="4"/>
    <path transform="translate(180,170) scale(1.1)" d="M0 8 C-14 -4 -10 -14 0 -6 C10 -14 14 -4 0 8z" fill="#ff7b9c"/>
    ${[[40, 40], [310, 60], [60, 150], [320, 150]].map(([x, y], i) => `<path transform="translate(${x},${y}) rotate(${i * 40})" d="M0 0 q8 -8 14 0 q-6 10 -14 0z" fill="#ffb3c8"/>`).join("")}
    ${sparkle(120, 50, .8)}${sparkle(250, 38, .7)}` });

  // ご祝儀袋（水引つき）
  SCENES.a2_goshugi = () => ({ x: 180, y: 84, s: .8, bg: `
    <rect width="360" height="200" fill="#fdf6e7"/>
    <rect x="104" y="96" width="152" height="98" rx="6" fill="#ffffff" stroke="#d8c3a8" stroke-width="3"/>
    <path d="M104 106 L180 150 L256 106" fill="none" stroke="#e8dcc8" stroke-width="3"/>
    <rect x="156" y="152" width="48" height="10" rx="5" fill="#d9534f"/><rect x="156" y="164" width="48" height="10" rx="5" fill="#ffffff" stroke="#d9534f" stroke-width="2"/>
    <circle cx="180" cy="158" r="10" fill="#e3b94f" stroke="#b88f2e" stroke-width="2"/>
    <path d="M168 150 q-20 -16 -28 -6 M192 150 q20 -16 28 -6" stroke="#d9534f" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${sparkle(70, 50, .9)}${sparkle(300, 60, .8)}${sparkle(40, 140, .6)}` });

  // 日本銀行の鑑査・裁断
  SCENES.a2_boj = () => ({ x: 104, y: 112, s: .8, bg: `
    <rect width="360" height="200" fill="#e6e9ee"/>
    <rect y="160" width="360" height="40" fill="#c8ced6"/>
    <rect x="14" y="142" width="190" height="12" rx="6" fill="#6f8191"/>
    ${[34, 74, 114, 154, 188].map((x) => `<circle cx="${x}" cy="148" r="4" fill="#4f5f6d"/>`).join("")}
    <rect x="204" y="30" width="140" height="130" rx="12" fill="#9aa6b2"/>
    <rect x="198" y="96" width="26" height="46" rx="6" fill="#3a4450"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${202 + i * 6} 142 l3 -10 l3 10z" fill="#c8ced6"/>`).join("")}
    <rect x="236" y="44" width="92" height="30" rx="5" fill="#d7ecff"/>
    ${[["#cfe3f3", 0], ["#e6d9f4", 1], ["#f1e8c6", 2], ["#ffffff", 3], ["#cfe3f3", 4], ["#f1e8c6", 5]].map(([col, i]) => `<rect x="${236 + i * 14}" y="${166 + (i % 3) * 6}" width="5" height="22" rx="2" fill="${col}" transform="rotate(${i * 20 - 40} ${238 + i * 14} 176)"/>`).join("")}
    ${sparkle(150, 40, .6)}` });

  // 国立印刷局の印刷機
  SCENES.a2_printing = () => ({ x: 180, y: 108, s: .85, bg: `
    <rect width="360" height="200" fill="#e4eef6"/>
    <rect x="30" y="8" width="300" height="52" rx="16" fill="#8c9bab"/>
    <circle cx="90" cy="34" r="22" fill="#b7c3cf" stroke="#6f7c88" stroke-width="4"/><circle cx="270" cy="34" r="22" fill="#b7c3cf" stroke="#6f7c88" stroke-width="4"/>
    <circle cx="90" cy="34" r="6" fill="#6f7c88"/><circle cx="270" cy="34" r="6" fill="#6f7c88"/>
    <rect y="158" width="360" height="42" fill="#c3d5e2"/>
    <rect x="14" y="146" width="332" height="12" rx="6" fill="#6f8191"/>
    ${[20, 58, 96].map((x, i) => tag(x, 128, 34, 16, ["#cfe3f3", "#e6d9f4", "#f1e8c6"][i])).join("")}
    ${[230, 268, 306].map((x, i) => tag(x, 128, 34, 16, ["#f1e8c6", "#cfe3f3", "#e6d9f4"][i])).join("")}
    ${[[130, 76, "#4f7fae"], [236, 80, "#9479b8"], [260, 70, "#b09a52"], [110, 92, "#e86a6a"]].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="5" fill="${col}" opacity=".75"/>`).join("")}
    ${sparkle(60, 100, .7)}${sparkle(300, 104, .6)}` });

  // タンス
  SCENES.a2_tansu = (c) => ({ x: 180, y: 104, s: .75, bg: `
    <rect width="360" height="200" fill="#ecdcc4"/>
    <rect y="172" width="360" height="28" fill="#c9ae86"/>
    <rect x="50" y="18" width="260" height="158" rx="6" fill="#b07d4f" stroke="#8a5d34" stroke-width="4"/>
    <rect x="60" y="28" width="240" height="26" rx="3" fill="#c4915c" stroke="#8a5d34" stroke-width="2"/><circle cx="180" cy="41" r="4" fill="#f2c94c"/>
    <rect x="60" y="58" width="240" height="26" rx="3" fill="#c4915c" stroke="#8a5d34" stroke-width="2"/><circle cx="180" cy="71" r="4" fill="#f2c94c"/>
    <rect x="66" y="92" width="228" height="62" rx="4" fill="#d9bb8d" stroke="#8a5d34" stroke-width="3"/>
    ${tag(80, 130, 90, 20, "#f6e3ee")}${tag(190, 128, 90, 22, "#cfe3f3")}${tag(100, 112, 70, 18, "#fff3c4")}
    <circle cx="300" cy="176" r="5" fill="#fff" stroke="#d2c2ab" stroke-width="2"/><circle cx="52" cy="176" r="5" fill="#fff" stroke="#d2c2ab" stroke-width="2"/>
    ${c && c.flags && c.flags.dark ? '<rect width="360" height="200" fill="#1a1622" opacity=".5"/>' : ""}` });

  // チャージ機・券売機
  SCENES.a2_charge = () => ({ x: 180, y: 126, s: .7, bg: `
    <rect width="360" height="200" fill="#e8f4f0"/>
    <rect x="90" y="12" width="180" height="180" rx="14" fill="#5fb8a8" stroke="#3f9788" stroke-width="4"/>
    <rect x="108" y="26" width="144" height="56" rx="6" fill="#e8fff8"/>
    <path d="M122 68 h24 M122 56 h40 M122 44 h30" stroke="#3fb39a" stroke-width="5" stroke-linecap="round"/>
    <path d="M200 44 l10 14 l10 -14 M210 58 v14 M200 62 h20" stroke="#3fb39a" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${[0, 1, 2].map((i) => `<circle cx="${130 + i * 50}" cy="98" r="8" fill="#e8fff8"/>`).join("")}
    <rect x="120" y="150" width="120" height="14" rx="7" fill="#26303a"/>
    <rect x="130" y="112" width="100" height="10" rx="5" fill="#26303a"/>
    ${sparkle(60, 50, .8)}${sparkle(310, 100, .7)}` });

  // 自販機の硬貨投入口（アップ）
  SCENES.a2_vm_coin = () => ({ x: 180, y: 120, s: .6, bg: `
    <rect width="360" height="200" fill="#eef0f5"/>
    <rect x="40" y="8" width="280" height="184" rx="14" fill="#d3dbe6" stroke="#aab6c4" stroke-width="4"/>
    <rect x="148" y="18" width="64" height="86" rx="10" fill="#aab6c4"/>
    <rect x="176" y="32" width="8" height="40" rx="4" fill="#2a3038"/>
    <circle cx="180" cy="88" r="7" fill="#e2574c"/>
    <circle cx="266" cy="64" r="16" fill="#e2574c" stroke="#b23b33" stroke-width="3"/>
    ${[0, 1, 2, 3].map((r) => [0, 1].map((q) => `<rect x="${58 + q * 36}" y="${26 + r * 30}" width="28" height="20" rx="4" fill="#3fb39a"/>`).join("")).join("")}
    <rect x="124" y="148" width="112" height="34" rx="8" fill="#3a4450"/>
    ${sparkle(300, 150, .7)}` });

  // 自販機のお札投入口（アップ）
  SCENES.a2_vm_bill = () => ({ x: 180, y: 118, s: .72, bg: `
    <rect width="360" height="200" fill="#eef0f5"/>
    <rect x="40" y="8" width="280" height="184" rx="14" fill="#e2574c" stroke="#b23b33" stroke-width="4"/>
    <rect x="110" y="22" width="140" height="46" rx="8" fill="#f4f6f9"/>
    <rect x="124" y="40" width="112" height="10" rx="5" fill="#2a3038"/>
    <path d="M180 28 v8 m-6 -4 l6 6 l6 -6" stroke="#3fb39a" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${[0, 1, 2, 3].map((q) => `<rect x="${64 + q * 62}" y="150" width="46" height="24" rx="5" fill="#a8342c"/>`).join("")}
    <circle cx="70" cy="44" r="12" fill="#f4f6f9"/><circle cx="290" cy="44" r="12" fill="#f4f6f9"/>
    ${sparkle(320, 110, .6)}` });

  // 500円玉貯金の缶
  SCENES.a2_can = () => ({ x: 180, y: 124, s: .7, bg: `
    <rect width="360" height="200" fill="#fff6e0"/>
    <rect y="176" width="360" height="24" fill="#ead7bd"/>
    <rect x="96" y="42" width="168" height="140" rx="16" fill="#f6d77a" stroke="#c9a64a" stroke-width="4"/>
    <rect x="96" y="92" width="168" height="22" fill="#e86a6a" opacity=".55"/>
    <ellipse cx="180" cy="42" rx="84" ry="14" fill="#e8c562" stroke="#c9a64a" stroke-width="4"/>
    <rect x="148" y="38" width="64" height="7" rx="3.5" fill="#5a4a1a"/>
    ${otherCoin(54, 164, 16, "#e4e8ed", "#9fa9b4")}${otherCoin(300, 166, 16, "#e4e8ed", "#9fa9b4")}${otherCoin(330, 150, 13, "#e4e8ed", "#9fa9b4")}
    ${sparkle(60, 60, .8)}${sparkle(310, 70, .7)}` });

  // 偽造を調べる紫外線ライトの部屋
  SCENES.a2_inspect = () => ({ x: 180, y: 114, s: .8, bg: `
    <rect width="360" height="200" fill="#2a1f45"/>
    <path d="M150 14 h60 l64 138 h-188z" fill="#b48cff" opacity=".22"/>
    <rect x="146" y="0" width="68" height="18" rx="6" fill="#4b3a7a"/>
    <rect y="152" width="360" height="48" fill="#3a2d5e"/>
    <circle cx="290" cy="76" r="26" fill="#ffffff" fill-opacity=".14" stroke="#e3c77a" stroke-width="5"/><path d="M308 96 l24 28" stroke="#e3c77a" stroke-width="7" stroke-linecap="round"/>
    ${sparkle(90, 60, .9)}${sparkle(50, 110, .6)}${sparkle(320, 30, .7)}` });

  // 洗濯機
  SCENES.a2_washer = () => ({ x: 180, y: 108, s: .7, r: -18, bg: `
    <rect width="360" height="200" fill="#e6f0f6"/>
    <rect x="60" y="6" width="240" height="190" rx="16" fill="#ffffff" stroke="#c4ccd4" stroke-width="4"/>
    <rect x="60" y="6" width="240" height="32" rx="16" fill="#dfe8ef"/>
    <circle cx="96" cy="22" r="8" fill="#9fb0bf"/><circle cx="124" cy="22" r="8" fill="#9fb0bf"/><rect x="236" y="14" width="46" height="16" rx="6" fill="#3fb39a"/>
    <circle cx="180" cy="116" r="68" fill="#bfe3ff" stroke="#9fb0bf" stroke-width="8"/>
    <path d="M124 128 q14 -10 28 0 t28 0 t28 0 t28 0" stroke="#ffffff" stroke-width="4" fill="none" opacity=".8"/>
    ${[[140, 90, 7], [214, 100, 5], [196, 150, 6], [150, 150, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".8"/>`).join("")}` });

  // スマホ
  SCENES.a2_phone = () => ({ x: 180, y: 128, s: .62, bg: `
    <rect width="360" height="200" fill="#fde8e4"/>
    <rect x="108" y="4" width="144" height="194" rx="24" fill="#3a3f4d"/>
    <rect x="117" y="16" width="126" height="170" rx="14" fill="#d9f1ff"/>
    <rect x="127" y="26" width="106" height="30" rx="7" fill="#bfeedd"/><rect x="127" y="60" width="106" height="30" rx="7" fill="#ffd1a8"/>
    <rect x="160" y="8" width="40" height="5" rx="2.5" fill="#1f232c"/>
    ${sparkle(70, 50, .8)}${sparkle(300, 80, .8)}${sparkle(60, 150, .6)}` });

  // 落とし物の棚
  SCENES.a2_lostfound = () => ({ x: 180, y: 112, s: .72, bg: `
    <rect width="360" height="200" fill="#f3ecdf"/>
    <rect x="10" y="74" width="340" height="7" fill="#b5835a"/><rect x="10" y="150" width="340" height="7" fill="#b5835a"/>
    <path d="M40 70 q18 -30 36 0z" fill="#e86a6a"/><path d="M58 70 v-8" stroke="#7d5a3c" stroke-width="3"/>
    <path d="M280 70 q8 -20 16 -10 q6 6 -2 12z M300 70 q8 -20 16 -10 q6 6 -2 12z" fill="#5b8def"/>
    <rect x="130" y="40" width="40" height="30" rx="6" fill="#3fb39a"/><rect x="214" y="44" width="34" height="26" rx="6" fill="#f2c94c"/>
    <rect x="30" y="118" width="46" height="32" rx="5" fill="#d6a66a"/><rect x="290" y="116" width="44" height="34" rx="5" fill="#ffd1a8"/>
    <rect x="130" y="144" width="100" height="10" rx="4" fill="#e8a35a"/>
    <rect x="86" y="96" width="18" height="12" rx="2" fill="#fff" stroke="#c4b49a" stroke-width="1.5"/><rect x="258" y="94" width="18" height="12" rx="2" fill="#fff" stroke="#c4b49a" stroke-width="1.5"/>
    <rect y="160" width="360" height="40" fill="#e0d2bb"/>` });

  // 額縁
  SCENES.a2_frame = () => ({ x: 180, y: 78, s: .9, bg: `
    <rect width="360" height="200" fill="#f6ecdc"/>
    <rect y="164" width="360" height="36" fill="#d9bf99"/>
    <rect x="92" y="14" width="176" height="128" rx="6" fill="#fffdf6" stroke="#8a5d34" stroke-width="10"/>
    <rect x="110" y="30" width="140" height="96" fill="none" stroke="#e3d5bf" stroke-width="2"/>
    <rect x="30" y="140" width="50" height="24" rx="3" fill="#cfe6f5"/><path d="M40 140 q10 -22 20 0" fill="#7bbf6a"/>
    ${sparkle(290, 40, .9)}${sparkle(70, 50, .7)}` });

  // バスの運賃箱
  SCENES.a2_bus = () => ({ x: 170, y: 96, s: .72, bg: `
    <rect width="360" height="200" fill="#dcebf5"/>
    <rect x="0" y="14" width="360" height="70" fill="#bfe6ff"/>
    <path d="M0 84 L50 50 L90 70 L140 36 L200 72 L260 44 L330 76 L360 62 V84z" fill="#9fd08f"/>
    <rect y="14" width="360" height="70" fill="none" stroke="#9fb0bf" stroke-width="6"/>
    ${[40, 120, 200, 280].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="14" stroke="#9fb0bf" stroke-width="3"/><circle cx="${x}" cy="22" r="8" fill="#f2c94c" opacity=".0"/>`).join("")}
    ${[60, 140, 220, 300].map((x) => `<line x1="${x}" y1="88" x2="${x}" y2="104" stroke="#b5835a" stroke-width="3"/><circle cx="${x}" cy="112" r="9" fill="none" stroke="#e8a35a" stroke-width="4"/>`).join("")}
    <rect y="170" width="360" height="30" fill="#8d9196"/>
    <rect x="212" y="110" width="110" height="74" rx="10" fill="#7fa3c0" stroke="#5f84a2" stroke-width="3"/>
    <rect x="228" y="122" width="78" height="24" rx="5" fill="#e8fff8"/><circle cx="267" cy="166" r="9" fill="#3fb39a"/>` });

  // カード工場のライン
  SCENES.a2_cardline = () => ({ x: 180, y: 106, s: .8, bg: `
    <rect width="360" height="200" fill="#e9eff4"/>
    <rect x="130" y="0" width="100" height="34" rx="8" fill="#9fb0bf"/><rect x="170" y="34" width="20" height="16" fill="#7d8f9f"/>
    <rect y="156" width="360" height="44" fill="#c3d5e2"/>
    <rect x="12" y="142" width="336" height="12" rx="6" fill="#6f8191"/>
    ${[30, 70, 110, 250, 290, 326].map((x, i) => `<rect x="${x - 17}" y="116" width="34" height="22" rx="4" fill="${["#bfeedd", "#cde4ff", "#ffd9e6", "#fff0b8", "#e3d5f3", "#bfeedd"][i]}" stroke="#8fa5b5" stroke-width="2"/><rect x="${x - 12}" y="121" width="8" height="6" rx="1.5" fill="#f2d58a"/>`).join("")}
    ${sparkle(110, 60, .7)}${sparkle(262, 66, .6)}` });

  // 金庫
  SCENES.a2_vault = () => ({ x: 180, y: 108, s: .8, bg: `
    <rect width="360" height="200" fill="#dfe6ee"/>
    <circle cx="180" cy="100" r="86" fill="#aab6c4" stroke="#7d8f9f" stroke-width="8"/>
    <circle cx="180" cy="100" r="62" fill="#c4cfda" stroke="#98a8b8" stroke-width="4"/>
    ${[0, 60, 120].map((a) => `<line x1="180" y1="100" x2="180" y2="36" stroke="#7d8f9f" stroke-width="6" stroke-linecap="round" transform="rotate(${a} 180 100)"/><line x1="180" y1="100" x2="180" y2="36" stroke="#7d8f9f" stroke-width="6" stroke-linecap="round" transform="rotate(${a + 180} 180 100)"/>`).join("")}
    <rect y="176" width="360" height="24" fill="#c3ccd6"/>
    ${[22, 52].map((x, i) => `<rect x="${x}" y="150" width="34" height="26" rx="3" fill="${["#cfe3f3", "#f1e8c6"][i]}"/><rect x="${x + 12}" y="150" width="10" height="26" fill="#ff9eb5"/>`).join("")}
    ${[274, 304].map((x, i) => `<rect x="${x}" y="150" width="34" height="26" rx="3" fill="${["#e6d9f4", "#f1e8c6"][i]}"/><rect x="${x + 12}" y="150" width="10" height="26" fill="#ff9eb5"/>`).join("")}` });

  // カプセルトイの機械
  SCENES.a2_gacha = () => ({ x: 180, y: 148, s: .55, bg: `
    <rect width="360" height="200" fill="#fff0f6"/>
    <circle cx="180" cy="66" r="58" fill="#d7ecff" fill-opacity=".8" stroke="#9fb0bf" stroke-width="5"/>
    ${[[150, 70, "#ff8a5b"], [190, 56, "#3fb39a"], [210, 90, "#f2c94c"], [160, 100, "#5b8def"], [128, 84, "#e86a9c"], [196, 100, "#9a6ad6"]].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="15" fill="${col}"/><path d="M${x - 15} ${y} h30" stroke="#fff" stroke-width="2" opacity=".6"/>`).join("")}
    <rect x="116" y="120" width="128" height="76" rx="12" fill="#e2574c" stroke="#b23b33" stroke-width="4"/>
    <rect x="156" y="130" width="48" height="26" rx="6" fill="#f6d77a"/><rect x="176" y="136" width="8" height="14" rx="4" fill="#5a4a1a"/>
    <rect x="140" y="170" width="80" height="18" rx="6" fill="#26303a"/>
    ${sparkle(60, 50, .8)}${sparkle(310, 70, .8)}${sparkle(300, 150, .6)}` });
})();
