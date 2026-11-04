// モノに生まれたら：共通の道具とイラスト
// ここで作った関数・定数は、things/*.js と index.html から使う
"use strict";

// ============================================================
//  小さな道具
// ============================================================
const $ = (id) => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);
const rint = (a, b) => Math.floor(rand(a, b + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const val = (v, c) => (typeof v === "function" ? v(c) : v);
function wpick(items) {
  // items: [{w, ...}]
  const total = items.reduce((s, it) => s + it.w, 0);
  let r = Math.random() * total;
  for (const it of items) { r -= it.w; if (r <= 0) return it; }
  return items[items.length - 1];
}
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

const PREFS = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];

// 文章の中の {名前} を置きかえる。毎回ランダムに選ぶものと、一生のあいだ固定のものがある
const RANDOM_WORDS = {
  shop: ["コンビニ", "スーパー", "八百屋さん", "駄菓子屋さん", "100円ショップ", "ドラッグストア", "駅の売店", "パン屋さん", "本屋さん", "商店街のお肉屋さん"],
  wish: ["合格しますように", "家族が元気でいますように", "宝くじが当たりますように", "推しに会えますように", "背がのびますように", "テストで100点がとれますように", "猫が長生きしますように", "彼女ができますように"],
  cause: ["災害にあった地域を助ける", "盲導犬を育てる", "保護された動物を助ける", "海外の子どもに給食を届ける"],
  outing: ["遊園地", "海", "山の頂上", "野球場", "図書館", "学校の運動会", "夏祭り", "動物園"],
  beach: ["対馬", "石垣島", "九十九里浜", "能登の海岸", "沖縄本島の浜", "五島列島"],
  pref2: PREFS
};
function fill(text, c) {
  return String(val(text, c)).replace(/\{(\w+)\}/g, (m, k) => {
    if (c.v[k] !== undefined) return c.v[k];
    if (RANDOM_WORDS[k]) return pick(RANDOM_WORDS[k]);
    return m;
  });
}
function fmtKm(km) { return km >= 10000 ? (km / 10000).toFixed(1) + "万km" : Math.round(km).toLocaleString() + "km"; }

// ============================================================
//  イラスト（モノ目線・フラットなパステル）
// ============================================================
function face(mood) {
  const s = 'stroke="#3a2f2a" stroke-width="2.6" stroke-linecap="round" fill="none"';
  const cheeks = '<circle cx="-13" cy="6" r="3.6" fill="#ff9e9e" opacity=".55"/><circle cx="13" cy="6" r="3.6" fill="#ff9e9e" opacity=".55"/>';
  switch (mood) {
    case "happy":
      return `<path d="M-11 -2 q3 -5 6 0 M5 -2 q3 -5 6 0" ${s}/><path d="M-6 6 q6 7 12 0" ${s}/>${cheeks}`;
    case "sad":
      return `<circle cx="-8" cy="-2" r="2.4" fill="#3a2f2a"/><circle cx="8" cy="-2" r="2.4" fill="#3a2f2a"/><path d="M-6 10 q6 -6 12 0" ${s}/><path d="M11 3 q2 4 0 6 q-2 -2 0 -6z" fill="#6bb4ff"/>`;
    case "surprise":
      return `<circle cx="-8" cy="-3" r="3.4" fill="#3a2f2a"/><circle cx="8" cy="-3" r="3.4" fill="#3a2f2a"/><ellipse cx="0" cy="8" rx="4" ry="5" fill="#3a2f2a"/>`;
    case "sleep":
      return `<path d="M-11 -2 h6 M5 -2 h6" ${s}/><path d="M-3 7 h6" ${s}/><text x="16" y="-12" font-size="11" fill="#7b726a" font-weight="bold">z</text><text x="24" y="-20" font-size="8" fill="#7b726a" font-weight="bold">z</text>`;
    default:
      return `<circle cx="-8" cy="-2" r="2.4" fill="#3a2f2a"/><circle cx="8" cy="-2" r="2.4" fill="#3a2f2a"/><path d="M-4 7 h8" ${s}/>`;
  }
}


const sparkle = (x, y, s = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2Z" fill="#ffd75e"/>`;
const cloud = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" fill="#ffffff"><ellipse cx="0" cy="0" rx="22" ry="12"/><ellipse cx="18" cy="-6" rx="16" ry="12"/><ellipse cx="34" cy="2" rx="16" ry="10"/></g>`;
const miniBottle = (x, y, col, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="-26" width="8" height="5" rx="1.5" fill="${col}"/><rect x="-9" y="-21" width="18" height="40" rx="6" fill="#e8f5fd" stroke="#9fbfd4" stroke-width="1.5"/><rect x="-9" y="-6" width="18" height="12" fill="${col}" opacity=".8"/></g>`;
const otherCoin = (x, y, r, fillc, stroke, hole) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fillc}" stroke="${stroke}" stroke-width="2.5"/>${hole ? `<circle cx="${x}" cy="${y}" r="${r * 0.28}" fill="none" stroke="${stroke}" stroke-width="2"/>` : ""}`;

// ペットボトルの中身ごとの色（スーパーの棚のシーンでも使う）
const BOTTLE_COLORS = {
  "お茶": "#7bbf6a", "水": "#8ecbf0", "炭酸飲料": "#e86a6a", "スポーツドリンク": "#4a8fe0",
  "コーヒー": "#9a6a48", "ジュース": "#f5a623", "しょうゆ": "#6b3a26", "シャンプー": "#c98fd6",
  "化粧水": "#f2a6c0", "お酒": "#c9b458"
};

const SCENES = {
  // 何もない場所（シーンが見つからないときにも使う）
  plain: () => ({ x: 180, y: 108, s: .8, bg: `<rect width="360" height="200" fill="#fdf2e6"/>${cloud(40, 40, .8)}${cloud(250, 30, .7)}<rect y="160" width="360" height="40" fill="#f0dcc4"/>` }),
  // ---- 1円玉 ----
  mint: () => ({ x: 180, y: 110, s: .85, bg: `
    <rect width="360" height="200" fill="#dcecf7"/>
    <rect y="152" width="360" height="48" fill="#bccbd8"/>
    <rect x="138" y="0" width="84" height="60" rx="10" fill="#9fb0bf"/>
    <rect x="166" y="60" width="28" height="18" fill="#7d8f9f"/>
    <rect x="18" y="140" width="324" height="14" rx="7" fill="#6f8191"/>
    ${[40, 85, 130, 230, 275, 320].map((x) => `<circle cx="${x}" cy="147" r="4.5" fill="#4f5f6d"/>`).join("")}
    ${[55, 100, 260, 305].map((x) => otherCoin(x, 127, 12, "#e4e8ed", "#9fa9b4")).join("")}
    ${sparkle(118, 44)}${sparkle(250, 30, .8)}${sparkle(292, 78, .7)}` }),
  bank: () => ({ x: 180, y: 102, s: .8, bg: `
    <rect width="360" height="200" fill="#f6ecdc"/>
    <rect x="26" y="18" width="124" height="82" rx="8" fill="#cfe6f5" stroke="#b49a7a" stroke-width="4"/>
    <line x1="88" y1="18" x2="88" y2="100" stroke="#b49a7a" stroke-width="4"/>
    <rect x="208" y="22" width="126" height="34" rx="10" fill="#2f5d8c"/>
    <text x="271" y="45" font-size="16" fill="#fff" text-anchor="middle" font-weight="bold">ぎんこう</text>
    ${[0, 1, 2].map((i) => `<rect x="${236 + i * 22}" y="${84}" width="16" height="44" rx="4" fill="#f4dfa8" stroke="#c9a85d" stroke-width="2"/>`).join("")}
    <rect y="128" width="360" height="72" fill="#c99a6b"/><rect y="122" width="360" height="10" fill="#b5875a"/>
    <ellipse cx="180" cy="132" rx="72" ry="12" fill="#3f7fc4"/>` }),
  register: () => ({ x: 180, y: 128, s: .7, bg: `
    <rect width="360" height="200" fill="#fde8e4"/>
    <rect x="214" y="0" width="44" height="30" fill="#fff"/><line x1="222" y1="10" x2="250" y2="10" stroke="#ddd" stroke-width="2"/><line x1="222" y1="18" x2="244" y2="18" stroke="#ddd" stroke-width="2"/>
    <rect x="66" y="26" width="228" height="60" rx="12" fill="#7fcfc3"/>
    <rect x="96" y="38" width="120" height="30" rx="5" fill="#2d4a47"/>
    <text x="206" y="60" font-size="18" fill="#9ff5d9" text-anchor="end" font-family="monospace" font-weight="bold">¥1</text>
    <circle cx="248" cy="46" r="7" fill="#fff" opacity=".8"/><circle cx="270" cy="46" r="7" fill="#fff" opacity=".8"/><circle cx="248" cy="66" r="7" fill="#fff" opacity=".8"/><circle cx="270" cy="66" r="7" fill="#fff" opacity=".8"/>
    <rect x="40" y="92" width="280" height="84" rx="10" fill="#eef9f6" stroke="#7fcfc3" stroke-width="4"/>
    ${[110, 180, 250].map((x) => `<line x1="${x - 35}" y1="96" x2="${x - 35}" y2="172" stroke="#b9e3da" stroke-width="3"/>`).join("")}
    ${otherCoin(110, 140, 18, "#c98250", "#9c5f37")}${otherCoin(250, 138, 20, "#e4e7ea", "#9fa9b4")}${otherCoin(290, 146, 17, "#e3b94f", "#b88f2e", true)}
    <rect y="176" width="360" height="24" fill="#e7c6b8"/>` }),
  wallet: () => ({ x: 182, y: 138, s: .8, bg: `
    <rect width="360" height="200" fill="#5a3b2a"/>
    <rect x="20" y="6" width="96" height="54" rx="6" fill="#f2c94c" transform="rotate(-6 68 33)"/>
    <rect x="108" y="2" width="96" height="54" rx="6" fill="#7fb7e6" transform="rotate(3 156 29)"/>
    <rect x="250" y="-4" width="60" height="96" fill="#fffdf6" transform="rotate(8 280 44)"/>
    ${[20, 34, 48, 62].map((y) => `<line x1="258" y1="${y}" x2="298" y2="${y + 5}" stroke="#d8d2c4" stroke-width="2"/>`).join("")}
    <path d="M0 70 Q180 46 360 70 L360 200 L0 200Z" fill="#7b5139"/>
    <path d="M10 78 Q180 56 350 78" stroke="#a87855" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
    ${otherCoin(86, 150, 26, "#c98250", "#9c5f37")}${otherCoin(282, 146, 29, "#e4e7ea", "#9fa9b4")}${otherCoin(320, 98, 20, "#e3b94f", "#b88f2e", true)}` }),
  piggy: () => ({ x: 180, y: 126, s: .8, bg: `
    <rect width="360" height="200" fill="#fff3d9"/>
    <rect x="88" y="20" width="184" height="176" rx="32" fill="#e3f3fc" stroke="#9cc7de" stroke-width="5"/>
    <rect x="108" y="6" width="144" height="20" rx="7" fill="#e8a35a"/>
    ${[[118, 176, "#c98250"], [146, 182, "#e4e8ed"], [174, 180, "#e3b94f"], [204, 182, "#e4e8ed"], [232, 176, "#c98250"], [130, 160, "#e4e8ed"], [242, 160, "#e3b94f"], [110, 150, "#e4e8ed"], [252, 140, "#e4e8ed"]].map(([x, y, col]) => otherCoin(x, y, 14, col, "#9fa9b4", col === "#e3b94f")).join("")}
    <path d="M104 40 v120" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>` }),
  street: () => ({ x: 140, y: 152, s: .7, bg: `
    <rect width="360" height="200" fill="#cfe8ff"/>
    ${cloud(40, 30)}${cloud(220, 22, .8)}
    <rect x="0" y="60" width="60" height="50" fill="#f3d9c6"/><rect x="66" y="44" width="50" height="66" fill="#d7e3c8"/><rect x="290" y="50" width="70" height="60" fill="#e7d3ee"/>
    <rect y="104" width="360" height="96" fill="#8d9196"/>
    ${[20, 90, 160, 230, 300].map((x) => `<rect x="${x}" y="176" width="40" height="6" rx="3" fill="#f2f2f2"/>`).join("")}
    <path d="M236 104 h124 v54 q-30 18 -124 6z" fill="#3a3a3f"/>
    ${[250, 274, 298, 322].map((x) => `<line x1="${x}" y1="118" x2="${x}" y2="150" stroke="#55555c" stroke-width="5"/>`).join("")}
    <path d="M60 140 q12 -14 24 0 q-12 10 -24 0z" fill="#e8a35a"/>` }),
  vend_under: () => ({ x: 206, y: 164, s: .7, bg: `
    <rect width="360" height="200" fill="#0f1014"/>
    <rect width="360" height="72" fill="#e2574c"/>
    ${[30, 70, 110, 150, 190, 230, 270, 310].map((x) => `<rect x="${x}" y="40" width="24" height="6" rx="3" fill="#b23b33"/>`).join("")}
    <rect y="64" width="360" height="12" fill="#a8342c"/>
    <path d="M0 200 L0 132 L110 200Z" fill="#23252c"/>
    <rect y="190" width="360" height="10" fill="#1f2026"/>
    ${[[60, 184, 9], [300, 186, 12], [270, 180, 7], [120, 188, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4a4c55"/>`).join("")}
    ${otherCoin(98, 172, 18, "#9c6440", "#6e4429")}
    <g transform="translate(98,174) scale(.5)">${face("neutral")}</g>
    <ellipse cx="206" cy="190" rx="34" ry="5" fill="#000" opacity=".5"/>` }),
  shrine: () => ({ x: 180, y: 76, s: .7, bg: `
    <rect width="360" height="200" fill="#f7efe1"/>
    <rect x="40" y="30" width="12" height="130" fill="#d9534f"/><rect x="308" y="30" width="12" height="130" fill="#d9534f"/>
    <rect x="20" y="22" width="320" height="12" rx="4" fill="#c0392b"/><rect x="36" y="46" width="288" height="8" fill="#d9534f"/>
    <rect y="160" width="360" height="40" fill="#d9c7a6"/>
    <path d="M180 0 v40" stroke="#c9a26b" stroke-width="5"/><circle cx="180" cy="44" r="9" fill="#e3b94f"/>
    <rect x="104" y="102" width="152" height="18" fill="#7d4f22"/>
    <rect x="110" y="118" width="140" height="62" fill="#a7713c"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${112 + i * 20}" y="104" width="12" height="14" fill="#5e3a16"/>`).join("")}
    <rect x="110" y="134" width="140" height="6" fill="#8b5a2b"/>` }),
  donation: () => ({ x: 180, y: 128, s: .6, bg: `
    <rect width="360" height="200" fill="#e6f5ec"/>
    <rect y="158" width="360" height="42" fill="#cdb38f"/>
    <rect x="116" y="58" width="128" height="102" rx="8" fill="#ffffff" opacity=".7" stroke="#8fbfa3" stroke-width="4"/>
    <rect x="160" y="52" width="40" height="8" rx="3" fill="#3a2f2a"/>
    <path d="M166 92 q14 -16 28 0 q-14 18 -28 0z" fill="#ff7b7b" opacity=".8"/>
    ${otherCoin(140, 148, 11, "#c98250", "#9c5f37")}${otherCoin(222, 150, 12, "#e4e8ed", "#9fa9b4")}` }),
  drawer: (c) => ({ x: 180, y: 118, s: .75, bg: `
    <rect width="360" height="200" fill="#e5d1b4"/>
    <path d="M0 0 L50 40 L310 40 L360 0z" fill="#d4bc98"/><path d="M0 200 L50 160 L310 160 L360 200z" fill="#c9ae86"/>
    <rect x="50" y="40" width="260" height="120" fill="#efe0c8"/>
    <ellipse cx="180" cy="140" rx="70" ry="16" fill="#ffffff" stroke="#d2c2ab" stroke-width="3"/>
    <circle cx="90" cy="120" r="16" fill="none" stroke="#e8a35a" stroke-width="4"/>
    <path d="M262 110 h26 a6 6 0 0 1 0 12 h-22 a4 4 0 0 1 0 -8 h18" stroke="#9aa4ae" stroke-width="3" fill="none"/>
    <rect x="230" y="64" width="70" height="8" rx="4" fill="#f2c94c" transform="rotate(-12 265 68)"/>
    ${c && c.flags.dark ? '<rect width="360" height="200" fill="#1a1622" opacity=".55"/>' : ""}` }),
  furnace: () => ({ x: 180, y: 112, s: .8, bg: `
    <rect width="360" height="200" fill="#2b1a13"/>
    <circle cx="180" cy="210" r="170" fill="#ff7a2f" opacity=".35"/>
    <ellipse cx="180" cy="186" rx="160" ry="26" fill="#ffb347"/>
    <ellipse cx="150" cy="182" rx="40" ry="6" fill="#ffe08a"/>
    <path d="M40 150 q10 -30 20 0 M300 146 q10 -30 20 0" stroke="#ff9a4d" stroke-width="5" fill="none" stroke-linecap="round"/>` }),
  collector: () => ({ x: 180, y: 104, s: .7, bg: `
    <rect width="360" height="200" fill="#20335a"/>
    <rect x="20" y="40" width="320" height="130" rx="16" fill="#2c4475"/>
    <text x="180" y="30" font-size="13" fill="#e3c77a" text-anchor="middle" font-weight="bold">貨幣セット</text>
    ${otherCoin(50, 104, 22, "#e3c25a", "#b8952e")}${otherCoin(102, 104, 20, "#e4e7ea", "#9fa9b4")}${otherCoin(258, 104, 18, "#e4e7ea", "#9fa9b4", true)}${otherCoin(306, 104, 20, "#c98250", "#9c5f37")}
    <rect x="20" y="40" width="320" height="40" rx="16" fill="#ffffff" opacity=".07"/>
    ${sparkle(140, 60, .6)}${sparkle(224, 150, .6)}` }),
  seafloor: () => ({ x: 180, y: 160, s: .6, bg: `
    <rect width="360" height="200" fill="#1d4f7a"/><rect width="360" height="70" fill="#2f6d9e"/>
    <rect y="168" width="360" height="32" fill="#c9b27c"/>
    <path d="M60 168 q-10 -30 4 -60 q-14 30 -4 60z M80 168 q10 -40 -4 -80 q14 40 4 80z M300 168 q-10 -26 6 -52" stroke="#3fa26b" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${[[120, 60, 5], [130, 40, 3], [250, 90, 4], [258, 70, 2.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#a9d8f5" stroke-width="2"/>`).join("")}
    <path d="M240 120 q16 -12 30 0 q-14 12 -30 0z M270 120 l8 -6 v12z" fill="#ffb45e"/>` }),

  // ---- ペットボトル ----
  bottle_factory: () => ({ x: 180, y: 96, s: .8, bg: `
    <rect width="360" height="200" fill="#e4f2fb"/>
    <rect y="150" width="360" height="50" fill="#c3d5e2"/>
    <rect x="150" y="0" width="60" height="22" rx="6" fill="#9fb0bf"/><rect x="172" y="22" width="16" height="12" fill="#7d8f9f"/>
    <rect x="14" y="146" width="332" height="12" rx="6" fill="#6f8191"/>
    ${[40, 74, 108, 252, 286, 320].map((x) => `<rect x="${x - 7}" y="104" width="14" height="40" rx="7" fill="#d9cdf2" stroke="#a796d6" stroke-width="2"/><rect x="${x - 9}" y="100" width="18" height="6" rx="2" fill="#a796d6"/>`).join("")}
    ${sparkle(120, 40, .7)}${sparkle(256, 60, .6)}` }),
  truck: () => ({ x: 180, y: 96, s: .62, bg: `
    <rect width="360" height="200" fill="#cfeaff"/>${cloud(30, 30, .8)}${cloud(260, 24, .7)}
    <path d="M0 120 q60 -40 120 0 q60 -50 130 0 q60 -30 110 0 v20 h-360z" fill="#b6dca0"/>
    <rect y="150" width="360" height="50" fill="#8d9196"/>
    <rect x="70" y="112" width="220" height="66" rx="4" fill="#d6a66a"/>
    <path d="M70 112 l-24 -16 h60 l10 16z M290 112 l24 -16 h-60 l-10 16z" fill="#c4914f"/>
    ${miniBottle(110, 106, "#7bbf6a", .9)}${miniBottle(140, 104, "#e86a6a", .9)}${miniBottle(220, 104, "#8ecbf0", .9)}${miniBottle(250, 106, "#f5a623", .9)}
    <rect x="70" y="112" width="220" height="66" rx="4" fill="#d6a66a"/>
    <text x="180" y="152" font-size="14" fill="#8a5d2a" text-anchor="middle" font-weight="bold">こわれもの</text>` }),
  shelf: () => ({ x: 180, y: 104, s: .7, bg: `
    <rect width="360" height="200" fill="#dff1fb"/>
    <rect x="10" y="6" width="340" height="188" rx="10" fill="#f6fbff" stroke="#c4ccd4" stroke-width="6"/>
    <rect x="16" y="140" width="328" height="8" fill="#c4ccd4"/><rect x="16" y="64" width="328" height="6" fill="#c4ccd4"/>
    ${[50, 80, 110, 250, 280, 310].map((x, i) => miniBottle(x, 118, ["#7bbf6a", "#7bbf6a", "#8ecbf0", "#e86a6a", "#4a8fe0", "#f5a623"][i], 1)).join("")}
    ${[50, 90, 130, 170, 210, 250, 290].map((x, i) => miniBottle(x, 44, ["#f5a623", "#e86a6a", "#9a6a48", "#7bbf6a", "#8ecbf0", "#4a8fe0", "#7bbf6a"][i], .8)).join("")}
    <rect x="150" y="146" width="60" height="16" rx="3" fill="#ffe15a"/><text x="180" y="158" font-size="11" text-anchor="middle" font-weight="bold">¥150</text>
    <path d="M40 190 L120 10 h30 L70 190z" fill="#ffffff" opacity=".35"/>` }),
  vending: () => ({ x: 180, y: 72, s: .45, bg: `
    <rect width="360" height="200" fill="#24324d"/>
    <circle cx="180" cy="100" r="150" fill="#5b7bb5" opacity=".25"/>
    <rect x="62" y="8" width="236" height="200" rx="10" fill="#f4f6f9"/>
    <rect x="80" y="20" width="200" height="104" rx="6" fill="#d7ecff"/>
    ${[100, 136, 224, 260].map((x, i) => miniBottle(x, 58, ["#7bbf6a", "#e86a6a", "#4a8fe0", "#f5a623"][i], .75)).join("")}
    ${[100, 136, 172, 208, 244, 260].slice(0, 5).map((x, i) => miniBottle(x + 6, 104, ["#8ecbf0", "#9a6a48", "#7bbf6a", "#e86a6a", "#4a8fe0"][i], .65)).join("")}
    ${[96, 132, 224, 260].map((x) => `<rect x="${x - 8}" y="78" width="16" height="6" rx="3" fill="#3fb39a"/>`).join("")}
    <rect x="236" y="134" width="40" height="20" rx="4" fill="#c8ced6"/><rect x="250" y="140" width="12" height="4" rx="2" fill="#3a3a3f"/>
    <rect x="96" y="164" width="140" height="30" rx="6" fill="#2b2f36"/>` }),
  super: (c) => ({ x: 180, y: 104, s: .7, bg: `
    <rect width="360" height="200" fill="#fff4e6"/>
    <rect y="140" width="360" height="12" fill="#c9915a"/><rect y="62" width="360" height="10" fill="#c9915a"/>
    ${[40, 76, 112, 248, 284, 320].map((x) => miniBottle(x, 118, (c && BOTTLE_COLORS[c.v.content]) || "#6b3a26", 1)).join("")}
    ${[30, 80, 130, 230, 280, 330].map((x, i) => `<rect x="${x - 18}" y="${26}" width="36" height="36" rx="4" fill="${["#ffd1a8", "#cfe8c4", "#ffe58f", "#f6c1d0", "#c9dcf5", "#ffd1a8"][i]}"/>`).join("")}
    <rect y="152" width="360" height="48" fill="#ead7bd"/>` }),
  hand: () => ({ x: 180, y: 88, s: .72, bg: `
    <rect width="360" height="200" fill="#bfe3ff"/>${cloud(30, 40)}${cloud(250, 30, .9)}
    <path d="M96 200 C96 150 100 132 120 128 L240 128 C262 130 268 150 268 200z" fill="#f6c9a8"/>
    ${[118, 150, 182, 214].map((x) => `<rect x="${x}" y="104" width="26" height="44" rx="13" fill="#f6c9a8"/>`).join("")}
    <path d="M248 160 q30 -36 46 -30 q6 10 -26 48z" fill="#f6c9a8"/>
    <path d="M126 148 h110" stroke="#e8b08c" stroke-width="3" stroke-linecap="round"/>` }),
  kitchen: () => ({ x: 180, y: 104, s: .7, bg: `
    <rect width="360" height="200" fill="#fff0dc"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<line x1="${i * 45}" y1="0" x2="${i * 45}" y2="140" stroke="#f3dec2" stroke-width="2"/>`).join("")}
    <rect y="140" width="360" height="60" fill="#e0b788"/><rect y="136" width="360" height="8" fill="#cfa06c"/>
    <path d="M50 140 q0 -26 30 -26 q30 0 30 26z" fill="#ffffff" stroke="#d8c3a8" stroke-width="3"/>
    <ellipse cx="80" cy="116" rx="22" ry="6" fill="#ffffff"/>
    <path d="M240 112 l70 -16 M244 120 l70 -16" stroke="#b5835a" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="290" cy="138" rx="34" ry="8" fill="#ffffff" stroke="#d8c3a8" stroke-width="3"/>` }),
  bath: () => ({ x: 180, y: 100, s: .7, bg: `
    <rect width="360" height="200" fill="#e3f3f7"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="140" stroke="#cfe6ec" stroke-width="2"/><line x1="0" y1="${i * 40}" x2="360" y2="${i * 40}" stroke="#cfe6ec" stroke-width="2"/>`).join("")}
    <rect y="138" width="360" height="62" fill="#ffffff"/><rect y="138" width="360" height="10" fill="#a8d8ea"/>
    <circle cx="60" cy="120" r="14" fill="#ffffff" opacity=".8"/><circle cx="80" cy="110" r="9" fill="#ffffff" opacity=".8"/><circle cx="300" cy="118" r="12" fill="#ffffff" opacity=".8"/>` }),
  bench: () => ({ x: 192, y: 110, s: .62, bg: `
    <rect width="360" height="200" fill="#ffd9b8"/>
    <circle cx="300" cy="50" r="22" fill="#ffb37a"/>
    <circle cx="50" cy="80" r="40" fill="#8fcf8a"/><rect x="44" y="100" width="12" height="60" fill="#b5835a"/>
    <rect y="150" width="360" height="50" fill="#a8d88f"/>
    <rect x="90" y="136" width="200" height="12" rx="4" fill="#b5835a"/><rect x="90" y="118" width="200" height="10" rx="4" fill="#c99a6b"/>
    <rect x="104" y="148" width="10" height="30" fill="#7d5a3c"/><rect x="266" y="148" width="10" height="30" fill="#7d5a3c"/>
    <path d="M300 128 q10 -12 22 -4 l8 -4 l-4 8 q4 10 -8 12 q-14 2 -18 -12z" fill="#2b2b30"/><circle cx="318" cy="126" r="1.6" fill="#fff"/>` }),
  bin: () => ({ x: 180, y: 58, s: .55, bg: `
    <rect width="360" height="200" fill="#e7f3ea"/>
    <rect y="176" width="360" height="24" fill="#c9d8c5"/>
    <rect x="110" y="86" width="140" height="92" rx="10" fill="#3b7dd8"/>
    <rect x="104" y="80" width="152" height="16" rx="6" fill="#2f66b3"/>
    ${[140, 180, 220].map((x) => `<circle cx="${x}" cy="88" r="7" fill="#1d3f70"/>`).join("")}
    <text x="180" y="138" font-size="15" fill="#fff" text-anchor="middle" font-weight="bold">ペットボトル</text>
    <path d="M160 156 a12 12 0 1 1 24 0" stroke="#fff" stroke-width="3" fill="none"/><path d="M184 156 l-5 -4 m5 4 l4 -5" stroke="#fff" stroke-width="3"/>` }),
  recycle_plant: () => ({ x: 104, y: 98, s: .62, bg: `
    <rect width="360" height="200" fill="#eceff3"/>
    <rect y="160" width="360" height="40" fill="#cfd5dc"/>
    <rect x="190" y="40" width="140" height="110" rx="10" fill="#9aa6b2"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M${200 + i * 26} 150 l13 -20 l13 20z" fill="#6f7c88"/>`).join("")}
    <rect x="200" y="54" width="70" height="30" rx="5" fill="#d7ecff"/>
    <rect x="10" y="150" width="190" height="12" rx="6" fill="#6f8191"/>
    ${Array.from({ length: 18 }, (_, i) => `<rect x="${210 + (i * 37) % 120}" y="${165 + (i * 13) % 26}" width="7" height="5" fill="${["#8ecbf0", "#7bbf6a", "#ffffff", "#f5a623"][i % 4]}" transform="rotate(${i * 23} ${213 + (i * 37) % 120} ${167 + (i * 13) % 26})"/>`).join("")}` }),
  sea: () => ({ x: 180, y: 120, s: .62, r: 70, bg: `
    <rect width="360" height="200" fill="#bfe6ff"/><circle cx="300" cy="40" r="20" fill="#ffe08a"/>${cloud(40, 36, .8)}
    <rect y="112" width="360" height="88" fill="#5ab4e0"/>
    ${[130, 155, 180].map((y) => `<path d="M0 ${y} q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#8fd0f2" stroke-width="3" fill="none"/>`).join("")}
    <path d="M90 70 q8 -8 16 0 q8 -8 16 0" stroke="#3a2f2a" stroke-width="2.5" fill="none"/>` }),
  beach: () => ({ x: 186, y: 150, s: .55, r: 80, bg: `
    <rect width="360" height="200" fill="#c9ebff"/>${cloud(250, 30, .8)}
    <rect y="78" width="360" height="40" fill="#5ab4e0"/>
    <path d="M0 116 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 V200 H0z" fill="#f2dcae"/>
    <g transform="translate(70,150) rotate(-70)">${miniBottle(0, 0, "#4a8fe0", 1)}</g>
    <g transform="translate(296,160) rotate(60)">${miniBottle(0, 0, "#e86a6a", 1)}</g>
    <path d="M270 120 q8 -10 16 0z" fill="#ffffff"/>
    <ellipse cx="120" cy="178" rx="12" ry="8" fill="#e8574c"/><path d="M108 172 l-6 -6 M132 172 l6 -6" stroke="#e8574c" stroke-width="3" stroke-linecap="round"/>` }),
  ship: () => ({ x: 286, y: 70, s: .42, bg: `
    <rect width="360" height="200" fill="#c9ebff"/>${cloud(40, 30, .8)}
    <rect y="140" width="360" height="60" fill="#5ab4e0"/>
    <path d="M30 112 h300 l-24 36 h-252z" fill="#c0392b"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${50 + i * 36}" y="88" width="32" height="24" fill="${["#3b7dd8", "#f5a623", "#3fb39a", "#e86a6a", "#9a6ad6", "#3b7dd8"][i]}"/>`).join("")}
    ${[0, 1, 2, 3].map((i) => `<rect x="${68 + i * 36}" y="64" width="32" height="24" fill="${["#3fb39a", "#e86a6a", "#3b7dd8", "#f5a623"][i]}"/>`).join("")}
    <rect x="270" y="80" width="40" height="32" fill="#ffffff"/>` }),
  fire: () => ({ x: 180, y: 106, s: .72, bg: `
    <rect width="360" height="200" fill="#3a1d18"/>
    ${[40, 110, 250, 320].map((x, i) => `<path d="M${x} 200 q-26 -60 0 -${100 + i * 10} q26 60 0 ${100 + i * 10}z" fill="#ff7a2f"/><path d="M${x} 200 q-14 -40 0 -${64 + i * 6} q14 40 0 ${64 + i * 6}z" fill="#ffd166"/>`).join("")}
    <rect y="180" width="360" height="20" fill="#5a2c22"/>` }),
  clothes: () => ({ x: 180, y: 104, s: .42, bg: `
    <rect width="360" height="200" fill="#f6eefb"/>
    <path d="M180 14 q0 -10 10 -10 q10 0 10 10 q0 8 -20 18 l-80 34 h180 l-80 -34" stroke="#9aa4ae" stroke-width="3" fill="none"/>
    <path d="M110 50 l-50 30 l22 34 l26 -12 v86 h144 v-86 l26 12 l22 -34 l-50 -30 q-20 18 -70 18 q-50 0 -70 -18z" fill="#5b8def"/>
    <path d="M150 50 q30 20 60 0" stroke="#3d6fc9" stroke-width="4" fill="none"/>` }),
  eggpack: () => ({ x: 180, y: 54, s: .42, bg: `
    <rect width="360" height="200" fill="#fff8e4"/>
    <rect y="170" width="360" height="30" fill="#ead7bd"/>
    <rect x="66" y="96" width="228" height="76" rx="12" fill="#eaf6ff" stroke="#a9c7dc" stroke-width="4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${96 + i * 42}" cy="${126}" rx="16" ry="20" fill="#fff3dc" stroke="#e8d2a8" stroke-width="2"/>`).join("")}
    <path d="M66 110 h228" stroke="#ffffff" stroke-width="4" opacity=".7"/>` }),

  // ---- 新しい場所 ----
  train: () => ({ x: 180, y: 140, s: .6, bg: `
    <rect width="360" height="200" fill="#3d4a5c"/>
    <rect x="24" y="14" width="312" height="110" rx="18" fill="#bfe6ff"/>
    ${cloud(60, 40, .7)}
    <path d="M24 110 L110 50 L150 80 L210 30 L280 86 L336 60 V124 H24z" fill="#9fd08f"/>
    <path d="M190 44 L210 30 L230 44z" fill="#ffffff"/>
    <rect x="24" y="96" width="312" height="28" fill="#7cc06d"/>
    <rect x="24" y="14" width="312" height="110" rx="18" fill="none" stroke="#2a3442" stroke-width="10"/>
    <rect y="150" width="360" height="50" fill="#d7c1a0"/><rect x="40" y="150" width="280" height="10" rx="4" fill="#c4a982"/>
    <path d="M60 124 h240" stroke="#ffffff" stroke-width="2" opacity=".3"/>` }),
  nest: () => ({ x: 180, y: 108, s: .55, bg: `
    <rect width="360" height="200" fill="#cfe9ff"/>${cloud(250, 30, .8)}
    <path d="M0 150 Q120 130 360 170 V200 H0z" fill="#8a5d3b"/>
    <path d="M20 120 L120 140 M260 150 L340 110" stroke="#8a5d3b" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="180" cy="138" rx="110" ry="30" fill="#a8774c"/>
    <ellipse cx="180" cy="130" rx="92" ry="20" fill="#6e4a2e"/>
    ${[[110, 128, "#5aa9ff"], [250, 126, "#ff7b7b"]].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="9" fill="${col}"/><circle cx="${x - 3}" cy="${y - 3}" r="3" fill="#fff" opacity=".7"/>`).join("")}
    <circle cx="140" cy="126" r="8" fill="#f2c94c"/><circle cx="137" cy="124" r="1.5" fill="#8a6d1c"/><circle cx="143" cy="124" r="1.5" fill="#8a6d1c"/>
    <rect x="214" y="118" width="16" height="10" rx="3" fill="#e86a6a"/>
    ${[110, 150, 200, 240].map((x) => `<path d="M${x} 152 q10 -10 20 0" stroke="#5e3f27" stroke-width="3" fill="none"/>`).join("")}` }),
  airport: () => ({ x: 180, y: 140, s: .6, bg: `
    <rect width="360" height="200" fill="#d8efff"/>${cloud(40, 40, .7)}
    <path d="M210 40 l60 -6 l10 -14 l6 0 l-4 16 l40 -4 q8 0 0 6 l-40 8 l4 14 l-6 0 l-10 -12 l-60 6z" fill="#ffffff" stroke="#9fb0bf" stroke-width="2"/>
    <rect y="100" width="360" height="100" fill="#eef3f7"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 46}" y="100" width="42" height="56" fill="#cfe6f5" stroke="#b5c7d6" stroke-width="2"/>`).join("")}
    <rect y="156" width="360" height="44" fill="#c9d2da"/>
    <rect x="60" y="164" width="46" height="30" rx="5" fill="#ff8a5b"/><rect x="74" y="158" width="18" height="6" rx="2" fill="#d9663a"/>
    <rect x="250" y="160" width="52" height="34" rx="5" fill="#3fb39a"/>` }),
  market: () => ({ x: 180, y: 112, s: .4, bg: `
    <rect width="360" height="200" fill="#fff1c9"/><circle cx="310" cy="36" r="20" fill="#ffd166"/>
    <path d="M20 40 L340 40 L320 70 L40 70z" fill="#ff8a5b"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${40 + i * 35} 70 v6 q8 8 16 0 v-6" fill="${i % 2 ? "#ff8a5b" : "#ffffff"}"/>`).join("")}
    <path d="M40 76 h280" stroke="#9aa4ae" stroke-width="3"/>
    ${[["#5b8def", 80], ["#3fb39a", 130], ["#f2c94c", 230], ["#e86a6a", 280]].map(([col, x]) => `<path transform="translate(${x},80) scale(.45)" d="M-40 0 l-30 20 l14 22 l16 -8 v60 h80 v-60 l16 8 l14 -22 l-30 -20 q-10 10 -40 10 q-30 0 -40 -10z" fill="${col}"/>`).join("")}
    <rect y="150" width="360" height="50" fill="#e8c99a"/>
    <path d="M180 62 l-30 20 l14 22 l16 -8 v60 h80 v-60 l16 8 l14 -22 l-30 -20" fill="none"/>
    <path transform="translate(180,84) scale(.7)" d="M-40 0 l-30 20 l14 22 l16 -8 v60 h80 v-60 l16 8 l14 -22 l-30 -20 q-10 10 -40 10 q-30 0 -40 -10z" fill="#5b8def"/>` })
};

// モノのデータはここに集まる（things/*.js が MONOS.xxx = {...} で追加する）
const MONOS = {};

// グループのイラスト部品を入れておく場所（things/_art_*.js が ART.xxx = {...} で追加する）
const ART = {};
