// a1グループのイラスト部品：5円玉・10円玉・50円玉・100円玉の絵と、新しいシーン
(() => {
  "use strict";

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const mx = (a, b, k) => Math.round(b + (a - b) * k);
  const kOf = (c) => clamp01(((c && c.cond) === undefined ? 100 : c.cond) / 100);

  // ---------------- 主人公の絵 ----------------

  // 5円玉：金色で、まん中に穴。お守りになると赤い糸が通る
  function hero5(c, mood) {
    const k = kOf(c);
    const col = `rgb(${mx(240, 200, k)},${mx(199, 164, k)},${mx(80, 92, k)})`;
    const charm = c && c.flags && c.flags.charm;
    return `<g>
      <path fill-rule="evenodd" d="M0 -34 a34 34 0 1 1 0 68 a34 34 0 1 1 0 -68z M0 -22 a9 9 0 1 0 0 18 a9 9 0 1 0 0 -18z" fill="${col}" stroke="#a8842c" stroke-width="3"/>
      <circle r="28" fill="none" stroke="#fff3c4" stroke-width="1.8" opacity=".8"/>
      <g fill="#d9a93a" opacity=".9">
        <ellipse cx="-25" cy="-10" rx="2.6" ry="6" transform="rotate(-24 -25 -10)"/><ellipse cx="-22" cy="-2" rx="2.4" ry="5.5" transform="rotate(-8 -22 -2)"/>
        <ellipse cx="25" cy="-10" rx="2.6" ry="6" transform="rotate(24 25 -10)"/><ellipse cx="22" cy="-2" rx="2.4" ry="5.5" transform="rotate(8 22 -2)"/>
      </g>
      ${charm ? '<path d="M-6 -13 h12" stroke="#e0403a" stroke-width="3.4" stroke-linecap="round"/><path d="M0 -22 C-10 -40 10 -50 0 -60" stroke="#e0403a" stroke-width="3" fill="none" stroke-linecap="round"/>' : ""}
      <g transform="translate(0,15) scale(.8)">${face(mood)}</g>
    </g>`;
  }

  // 10円玉：赤茶色。古くなると緑青（みどりのサビ）が出る。ふちがギザギザの「ギザ10」もある
  function hero10(c, mood) {
    const k = kOf(c);
    const col = `rgb(${mx(222, 150, k)},${mx(138, 104, k)},${mx(88, 78, k)})`;
    const green = clamp01((70 - ((c && c.cond) === undefined ? 100 : c.cond)) / 55);
    let ticks = "";
    if (c && c.giza) for (let i = 0; i < 40; i++) ticks += `<line x1="0" y1="-32" x2="0" y2="-37" stroke="#8a5632" stroke-width="2" transform="rotate(${i * 9})"/>`;
    const patina = green > 0
      ? `<g fill="#6fbf9a" opacity="${(0.25 + green * 0.5).toFixed(2)}"><circle cx="-24" cy="-14" r="7"/><circle cx="26" cy="4" r="6"/><circle cx="-8" cy="27" r="6"/><circle cx="18" cy="-26" r="5"/><circle cx="-28" cy="12" r="4"/></g>` : "";
    return `<g>
      ${ticks}
      <circle r="34" fill="${col}" stroke="#8a5632" stroke-width="3"/>
      <circle r="28" fill="none" stroke="#f3c19a" stroke-width="1.8" opacity=".7"/>
      <path d="M-15 -17 h30 v5 h-30z M-9 -17 l9 -9 l9 9z M-19 -12 h6 v4 h-6z M13 -12 h6 v4 h-6z" fill="#b66b3f" opacity=".85"/>
      ${patina}
      <text x="0" y="30" font-size="10" text-anchor="middle" font-weight="bold" fill="#7a4627">10</text>
      <g transform="translate(0,7) scale(.85)">${face(mood)}</g>
    </g>`;
  }

  // 50円玉：銀色で小さな穴。まわりに菊の花びら
  function hero50(c, mood) {
    const k = kOf(c);
    const col = `rgb(${mx(236, 186, k)},${mx(240, 190, k)},${mx(246, 192, k)})`;
    let petals = "";
    for (let i = 0; i < 12; i++) petals += `<ellipse cx="0" cy="-26" rx="2.6" ry="6.5" transform="rotate(${i * 30} 0 -14)"/>`;
    return `<g>
      <path fill-rule="evenodd" d="M0 -33 a33 33 0 1 1 0 66 a33 33 0 1 1 0 -66z M0 -21 a7 7 0 1 0 0 14 a7 7 0 1 0 0 -14z" fill="${col}" stroke="#8d98a5" stroke-width="3"/>
      <circle r="27" fill="none" stroke="#ffffff" stroke-width="1.8" opacity=".85"/>
      <g fill="#cfd6de" stroke="#a9b3be" stroke-width="1">${petals}</g>
      <g transform="translate(0,17) scale(.72)">${face(mood)}</g>
    </g>`;
  }

  // 100円玉：銀色で穴なし。桜の花
  function hero100(c, mood) {
    const k = kOf(c);
    const col = `rgb(${mx(238, 188, k)},${mx(241, 192, k)},${mx(246, 196, k)})`;
    let sakura = "";
    for (let i = 0; i < 5; i++) sakura += `<ellipse cx="0" cy="-26" rx="5" ry="7" transform="rotate(${i * 72} 0 -20)"/>`;
    return `<g>
      <circle r="35" fill="${col}" stroke="#8d98a5" stroke-width="3"/>
      <circle r="29" fill="none" stroke="#ffffff" stroke-width="1.8" opacity=".85"/>
      <g fill="#f8cdd8" stroke="#e79ab0" stroke-width="1.3">${sakura}</g>
      <circle cx="0" cy="-20" r="2.6" fill="#f2b04c"/>
      <text x="0" y="31" font-size="10" text-anchor="middle" font-weight="bold" fill="#7b8794">100</text>
      <g transform="translate(0,9) scale(.8)">${face(mood)}</g>
    </g>`;
  }

  ART.a1 = { hero5, hero10, hero50, hero100 };

  // ---------------- 新しいシーン ----------------

  const bag = (x, y, col, w = 34, h = 50) => `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="0" width="${w}" height="${h}" rx="6" fill="${col}"/><rect x="${-w / 2}" y="${h * 0.28}" width="${w}" height="4" fill="#fff" opacity=".6"/><path d="M${-w / 4} 0 q${w / 4} -14 ${w / 2} 0" fill="none" stroke="#e8c266" stroke-width="3"/><path d="M0 ${h * 0.5} v12" stroke="#fff" stroke-width="3" opacity=".7"/></g>`;

  // お守りの棚（5円玉・お守り）
  SCENES.a1_omamori = () => ({ x: 180, y: 118, s: .72, bg: `
    <rect width="360" height="200" fill="#fdf0e0"/>
    <rect y="150" width="360" height="50" fill="#b98a5c"/><rect y="146" width="360" height="8" fill="#9c7048"/>
    ${bag(50, 70, "#d9534f")}${bag(100, 78, "#4a8fe0", 30, 44)}${bag(262, 70, "#f2a6c0")}${bag(312, 78, "#7bbf6a", 30, 44)}
    <path d="M180 0 C170 40 190 60 180 84" stroke="#e0403a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M150 0 C146 24 156 34 150 52" stroke="#e0403a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
    ${sparkle(130, 40, .7)}${sparkle(236, 36, .6)}` });

  // 手芸台：ひもや糸を通す作業
  SCENES.a1_himo = () => ({ x: 180, y: 112, s: .72, bg: `
    <rect width="360" height="200" fill="#fff3e0"/>
    <rect y="140" width="360" height="60" fill="#d9a066"/><rect y="136" width="360" height="8" fill="#c58a52"/>
    ${[[40, 112, "#e0403a"], [84, 118, "#ffffff"], [284, 114, "#4a8fe0"], [326, 118, "#f2c94c"]].map(([x, y, col]) => `<g><rect x="${x - 14}" y="${y - 14}" width="28" height="32" rx="4" fill="${col}" stroke="#9c7048" stroke-width="2"/><rect x="${x - 16}" y="${y - 18}" width="32" height="6" rx="2" fill="#c9a26b"/><rect x="${x - 16}" y="${y + 16}" width="32" height="6" rx="2" fill="#c9a26b"/></g>`).join("")}
    <path d="M60 94 C100 60 140 120 180 100 S260 70 300 96" stroke="#e0403a" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${[[130, 156, "#7bbf6a"], [226, 160, "#f5a623"], [250, 150, "#9a6ad6"]].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="7" fill="${col}"/><circle cx="${x}" cy="${y}" r="2" fill="#fff3e0"/>`).join("")}
    <path d="M210 36 l30 36 M232 36 l-30 36" stroke="#9aa4ae" stroke-width="4" stroke-linecap="round"/><circle cx="208" cy="34" r="7" fill="none" stroke="#e0403a" stroke-width="4"/><circle cx="234" cy="34" r="7" fill="none" stroke="#e0403a" stroke-width="4"/>` });

  // 神棚
  SCENES.a1_kamidana = () => ({ x: 180, y: 126, s: .62, bg: `
    <rect width="360" height="200" fill="#efe6d8"/>
    <rect y="150" width="360" height="50" fill="#c9b08a"/>
    <rect x="96" y="40" width="168" height="14" rx="3" fill="#7d4f22"/>
    <path d="M86 40 L180 8 L274 40z" fill="#9c6a35"/>
    <rect x="108" y="54" width="144" height="56" fill="#f7ecd4" stroke="#b59a6c" stroke-width="3"/>
    <rect x="160" y="64" width="40" height="46" fill="#5e3a16"/>
    <rect x="70" y="112" width="220" height="10" fill="#7d4f22"/>
    <path d="M62 56 h22 l-6 10 l8 6 l-8 8 l6 8 h-22z M276 56 h22 l-6 10 l8 6 l-8 8 l6 8 h-22z" fill="#ffffff" stroke="#d8c8a8" stroke-width="1.5"/>
    <path d="M100 118 q-10 -20 6 -26 q-2 14 8 18z M260 118 q10 -20 -6 -26 q2 14 -8 18z" fill="#5aa05a"/>
    <ellipse cx="180" cy="142" rx="48" ry="9" fill="#ffffff" stroke="#d8c8a8" stroke-width="3"/>
    ${sparkle(120, 140, .6)}${sparkle(246, 134, .6)}` });

  // 学校の教室：糸でぶら下げられる
  SCENES.a1_pendulum = () => ({ x: 180, y: 118, s: .6, bg: `
    <rect width="360" height="200" fill="#e8f1e4"/>
    <rect x="26" y="20" width="170" height="86" rx="4" fill="#3f7a57" stroke="#b58a58" stroke-width="6"/>
    <path d="M44 48 h60 M44 66 h90" stroke="#e8f1e4" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <rect x="248" y="22" width="86" height="76" rx="4" fill="#cfe8ff" stroke="#b58a58" stroke-width="5"/><line x1="291" y1="22" x2="291" y2="98" stroke="#b58a58" stroke-width="4"/>
    <rect y="150" width="360" height="50" fill="#d6b88a"/>
    <rect x="20" y="128" width="90" height="12" rx="3" fill="#c99a6b"/><rect x="250" y="128" width="90" height="12" rx="3" fill="#c99a6b"/>
    <path d="M180 0 V74" stroke="#e0403a" stroke-width="3"/><circle cx="180" cy="3" r="4" fill="#9aa4ae"/>
    <path d="M150 96 q-26 -10 -30 -34 M210 96 q26 -10 30 -34" stroke="#bcd0c4" stroke-width="3" fill="none" stroke-dasharray="5 6"/>` });

  // 駄菓子屋さん
  SCENES.a1_dagashi = () => ({ x: 180, y: 116, s: .62, bg: `
    <rect width="360" height="200" fill="#fff0cf"/>
    <rect y="154" width="360" height="46" fill="#c99a6b"/>
    <rect x="12" y="20" width="336" height="8" fill="#a8774c"/><rect x="12" y="76" width="336" height="8" fill="#a8774c"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<rect x="${20 + i * 33}" y="${i % 2 ? 34 : 40}" width="26" height="${i % 2 ? 40 : 34}" rx="4" fill="${["#f6a5a5", "#ffd166", "#9ad6c8", "#a9c8f5", "#d9b3ee"][i % 5]}"/>`).join("")}
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<circle cx="${34 + i * 36}" cy="${96 + (i % 2) * 4}" r="9" fill="${["#ffd166", "#f6a5a5", "#9ad6c8"][i % 3]}"/>`).join("")}
    <rect x="236" y="128" width="96" height="30" rx="6" fill="#d9d9d9" stroke="#9aa4ae" stroke-width="3"/><ellipse cx="284" cy="128" rx="48" ry="7" fill="#7a7a80"/>
    ${otherCoin(262, 122, 8, "#c98250", "#9c5f37")}${otherCoin(290, 120, 8, "#e3b94f", "#b88f2e", true)}
    <rect x="30" y="126" width="70" height="30" rx="6" fill="#fff" stroke="#e0b88a" stroke-width="3"/>` });

  // 自販機の投入口
  SCENES.a1_slot = () => ({ x: 180, y: 126, s: .6, bg: `
    <rect width="360" height="200" fill="#24324d"/>
    <rect x="92" y="0" width="176" height="200" rx="12" fill="#f4f6f9"/>
    <rect x="112" y="10" width="136" height="26" rx="5" fill="#2f3b52"/>
    <text x="180" y="29" font-size="14" fill="#9ff5d9" text-anchor="middle" font-family="monospace" font-weight="bold">¥ 110</text>
    <rect x="164" y="46" width="32" height="14" rx="3" fill="#8f98a4"/><rect x="176" y="49" width="8" height="8" rx="2" fill="#2b2f36"/>
    <rect x="138" y="64" width="84" height="8" rx="4" fill="#d6dbe2"/>
    <circle cx="124" cy="56" r="9" fill="#d9534f"/><path d="M118 56 h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <path d="M146 62 l-12 12" stroke="#d6dbe2" stroke-width="3"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${118 + i * 32}" y="82" width="22" height="9" rx="3" fill="${["#3fb39a", "#e86a6a", "#4a8fe0", "#f5a623"][i]}"/>`).join("")}
    <rect x="114" y="164" width="132" height="30" rx="6" fill="#2b2f36"/><rect x="142" y="170" width="76" height="6" rx="3" fill="#555a63"/>
    <rect x="248" y="146" width="22" height="30" rx="5" fill="#d6dbe2" opacity=".9"/>
    ${sparkle(86, 54, .6)}` });

  // 公衆電話
  SCENES.a1_phone = () => ({ x: 180, y: 140, s: .55, bg: `
    <rect width="360" height="200" fill="#d6ead8"/>
    <rect y="170" width="360" height="30" fill="#a9b8aa"/>
    <rect x="86" y="8" width="188" height="170" rx="10" fill="#cfe8ff" opacity=".8" stroke="#4a8a5a" stroke-width="6"/>
    <line x1="180" y1="8" x2="180" y2="178" stroke="#4a8a5a" stroke-width="4"/>
    <rect x="120" y="42" width="120" height="84" rx="10" fill="#3f9a5c"/>
    <rect x="132" y="52" width="96" height="18" rx="4" fill="#2a6d40"/>
    ${[0, 1, 2].map((r) => [0, 1, 2].map((q) => `<circle cx="${150 + q * 20}" cy="${88 + r * 12}" r="4.5" fill="#e9f5ec"/>`).join("")).join("")}
    <rect x="204" y="76" width="22" height="9" rx="3" fill="#1f4c2e"/><rect x="206" y="94" width="18" height="18" rx="3" fill="#2a6d40"/>
    <path d="M118 52 q-24 6 -22 40 q4 12 16 6" stroke="#2a6d40" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="104" y="40" width="30" height="12" rx="6" fill="#2a6d40"/>
    <path d="M110 100 q-6 40 -22 60" stroke="#6f7d73" stroke-width="3" fill="none"/>` });

  // 噴水・池（コインが沈んでいる）
  SCENES.a1_fountain = () => ({ x: 180, y: 150, s: .58, bg: `
    <rect width="360" height="200" fill="#cfeaff"/>${cloud(40, 28, .8)}
    <rect y="60" width="360" height="140" fill="#6cc2ea"/>
    <rect y="60" width="360" height="6" fill="#a8e0f5"/>
    <path d="M180 60 V20 M180 20 q-20 -4 -30 14 M180 20 q20 -4 30 14 M180 26 q-34 0 -44 30 M180 26 q34 0 44 30" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>
    <rect y="170" width="360" height="30" fill="#d9c9a0"/>
    ${[[40, 176, 9], [90, 184, 8], [250, 178, 9], [300, 184, 8], [330, 172, 7]].map(([x, y, r]) => otherCoin(x, y, r, "#e4e7ea", "#9fa9b4")).join("")}
    ${otherCoin(128, 188, 8, "#e3b94f", "#b88f2e", true)}${otherCoin(214, 188, 8, "#c98250", "#9c5f37")}
    ${[[70, 110, 5], [78, 92, 3], [290, 120, 4], [300, 98, 2.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#ffffff" stroke-width="2"/>`).join("")}` });

  // ゲームセンター
  SCENES.a1_arcade = () => ({ x: 180, y: 130, s: .6, bg: `
    <rect width="360" height="200" fill="#2a1d4f"/>
    <rect y="160" width="360" height="40" fill="#3d2a6b"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${20 + i * 55}" cy="${14 + (i % 2) * 8}" r="5" fill="${["#ff6bd6", "#6bf0ff", "#ffe15a"][i % 3]}"/>`).join("")}
    <rect x="14" y="40" width="96" height="124" rx="8" fill="#ff6bd6"/><rect x="26" y="52" width="72" height="50" rx="4" fill="#1b1340"/>
    <circle cx="48" cy="124" r="9" fill="#ffe15a"/><circle cx="76" cy="126" r="7" fill="#6bf0ff"/><rect x="30" y="144" width="64" height="8" rx="3" fill="#2a1d4f"/>
    <rect x="250" y="40" width="96" height="124" rx="8" fill="#6bf0ff"/><rect x="262" y="52" width="72" height="50" rx="4" fill="#1b1340"/>
    <rect x="268" y="112" width="60" height="14" rx="4" fill="#ff6bd6"/><rect x="290" y="132" width="16" height="22" rx="3" fill="#2a1d4f"/>
    <path d="M40 66 l10 10 l-10 10 M70 66 h16 M70 80 h10" stroke="#6bf0ff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="298" cy="76" r="12" fill="#ffe15a"/>
    ${sparkle(150, 60, .8)}${sparkle(214, 44, .7)}` });

  // ガチャガチャ
  SCENES.a1_gacha = () => ({ x: 180, y: 140, s: .5, bg: `
    <rect width="360" height="200" fill="#ffeef0"/>
    <rect y="172" width="360" height="28" fill="#e9c9c9"/>
    <rect x="96" y="96" width="168" height="76" rx="10" fill="#ff7b7b"/>
    <circle cx="180" cy="62" r="62" fill="#e6f6ff" opacity=".85" stroke="#9fbfd4" stroke-width="4"/>
    ${[[150, 36, "#ffd166"], [190, 30, "#7bbf6a"], [218, 56, "#4a8fe0"], [160, 70, "#f2a6c0"], [196, 82, "#ffffff"], [128, 56, "#9a6ad6"], [226, 84, "#f5a623"]].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="13" fill="${col}" stroke="#ffffff" stroke-width="2"/><path d="M${x - 13} ${y} h26" stroke="#ffffff" stroke-width="2" opacity=".7"/>`).join("")}
    <circle cx="150" cy="134" r="14" fill="#fff3d6" stroke="#b88f2e" stroke-width="3"/><path d="M142 134 h16 M150 126 v16" stroke="#b88f2e" stroke-width="3"/>
    <rect x="196" y="122" width="48" height="12" rx="4" fill="#3a3a3f"/><rect x="206" y="148" width="30" height="16" rx="4" fill="#3a3a3f"/>
    ${sparkle(76, 40, .7)}${sparkle(292, 50, .7)}` });

  // コインロッカー
  SCENES.a1_locker = () => ({ x: 180, y: 128, s: .55, bg: `
    <rect width="360" height="200" fill="#e7edf2"/>
    <rect y="176" width="360" height="24" fill="#c3ccd4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${10 + i * 68}" y="12" width="64" height="${i % 2 ? 78 : 92}" rx="5" fill="${["#4a8fe0", "#f5a623", "#4a8fe0", "#3fb39a", "#f5a623"][i]}" stroke="#ffffff" stroke-width="3"/><circle cx="${52 + i * 68}" cy="${i % 2 ? 50 : 56}" r="5" fill="#ffffff" opacity=".8"/><rect x="${24 + i * 68}" y="22" width="22" height="9" rx="2" fill="#2b2f36"/>`).join("")}
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${10 + i * 68}" y="${i % 2 ? 94 : 108}" width="64" height="${i % 2 ? 76 : 62}" rx="5" fill="${["#f5a623", "#4a8fe0", "#3fb39a", "#f5a623", "#4a8fe0"][i]}" stroke="#ffffff" stroke-width="3"/><rect x="${24 + i * 68}" y="${i % 2 ? 104 : 118}" width="22" height="9" rx="2" fill="#2b2f36"/>`).join("")}
    <rect x="108" y="64" width="144" height="54" rx="6" fill="#ffffff" opacity=".35"/>` });

  // 貨幣セット（コレクション用の台紙）
  SCENES.a1_set = () => ({ x: 180, y: 106, s: .62, bg: `
    <rect width="360" height="200" fill="#1e2e55"/>
    <rect x="16" y="26" width="328" height="148" rx="14" fill="#2f4a86" stroke="#e3c77a" stroke-width="4"/>
    ${[44, 94, 266, 316].map((x, i) => `<circle cx="${x}" cy="100" r="${[18, 20, 19, 17][i]}" fill="#223a6c" stroke="#e3c77a" stroke-width="2"/>`).join("")}
    ${otherCoin(44, 100, 16, "#e3b94f", "#b88f2e", true)}${otherCoin(94, 100, 18, "#e4e7ea", "#9fa9b4", true)}${otherCoin(266, 100, 17, "#e4e7ea", "#9fa9b4")}${otherCoin(316, 100, 15, "#c98250", "#9c5f37")}
    <rect x="16" y="26" width="328" height="34" rx="14" fill="#ffffff" opacity=".08"/>
    ${sparkle(150, 52, .6)}${sparkle(214, 150, .6)}` });

  // こすり出し（紙の上で鉛筆）
  SCENES.a1_rubbing = () => ({ x: 170, y: 112, s: .62, bg: `
    <rect width="360" height="200" fill="#e9d4b4"/>
    <rect x="40" y="18" width="240" height="164" rx="4" fill="#fffdf6" stroke="#d8c8a8" stroke-width="3" transform="rotate(-2 160 100)"/>
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${60 + i * 14}" y1="30" x2="${50 + i * 14}" y2="170" stroke="#9aa4ae" stroke-width="1.5" opacity=".35"/>`).join("")}
    <g transform="translate(300,40) rotate(55)"><rect x="-6" y="0" width="12" height="100" fill="#f5c542"/><path d="M-6 100 L0 118 L6 100z" fill="#f1d9b0"/><path d="M-2 112 L0 118 L2 112z" fill="#3a2f2a"/><rect x="-6" y="-10" width="12" height="10" rx="2" fill="#f2a6c0"/></g>
    ${otherCoin(300, 156, 16, "#e4e7ea", "#9fa9b4", true)}` });

  // バスの運賃箱
  SCENES.a1_busfare = () => ({ x: 180, y: 118, s: .6, bg: `
    <rect width="360" height="200" fill="#e9f3e2"/>
    <rect x="0" y="0" width="360" height="40" fill="#cfe3c4"/>
    <rect y="150" width="360" height="50" fill="#7d8f9f"/>
    ${[0, 1, 2].map((i) => `<path d="M${14 + i * 54} 60 h40 v50 h-40z" fill="#4a8fe0" opacity=".8"/>`).join("")}
    <path d="M60 22 v22 M110 22 v22" stroke="#9aa4ae" stroke-width="3"/><circle cx="60" cy="48" r="5" fill="#f2c94c"/><circle cx="110" cy="48" r="5" fill="#f2c94c"/>
    <rect x="212" y="52" width="110" height="104" rx="8" fill="#8f98a4"/>
    <rect x="224" y="62" width="86" height="26" rx="4" fill="#2f3b52"/><text x="267" y="81" font-size="13" fill="#9ff5d9" text-anchor="middle" font-family="monospace" font-weight="bold">運賃</text>
    <rect x="236" y="98" width="60" height="26" rx="5" fill="#2b2f36"/><rect x="246" y="106" width="40" height="6" rx="3" fill="#555a63"/>
    <rect x="212" y="156" width="110" height="10" fill="#6f7d8a"/>` });

  // 首かざり・ひもにぶら下がる
  SCENES.a1_necklace = () => ({ x: 180, y: 112, s: .62, bg: `
    <rect width="360" height="200" fill="#fbe9ef"/>
    <path d="M30 0 C60 140 300 140 330 0" stroke="#e0403a" stroke-width="4" fill="none"/>
    <path d="M180 100 V66" stroke="#e0403a" stroke-width="4"/>
    ${[[100, 100, "#7bbf6a"], [260, 100, "#4a8fe0"], [64, 70, "#f2c94c"], [296, 70, "#9a6ad6"], [140, 120, "#f2a6c0"], [220, 120, "#f5a623"]].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="8" fill="${col}"/><circle cx="${x - 2}" cy="${y - 2}" r="2.5" fill="#fff" opacity=".7"/>`).join("")}
    <rect y="170" width="360" height="30" fill="#f2d5df"/>
    ${sparkle(60, 30, .6)}${sparkle(300, 34, .7)}` });
})();
