// d1 グループのイラスト部品：主人公5つ（傘・自転車・靴下・Tシャツ・ランドセル）と、新しいシーン
(() => {
  "use strict";

  const clamp = (v) => Math.max(0, Math.min(1, v));
  function mixHex(a, b, k) {
    // k=1 で a、k=0 で b
    const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
    const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
    return "#" + pa.map((v, i) => Math.round(pb[i] + (v - pb[i]) * k).toString(16).padStart(2, "0")).join("");
  }
  const rect = (x, y, w, h, f, rx = 0, more = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${more}/>`;
  const circ = (x, y, r, f, more = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${more}/>`;
  const rainLines = (n, seed, col = "#8fb3d1") =>
    Array.from({ length: n }, (_, i) => {
      const x = (i * 47 + seed) % 380 - 10, y = (i * 31 + seed * 3) % 190;
      return `<path d="M${x} ${y} l-5 14" stroke="${col}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
    }).join("");

  // ---- 小さな部品 ----
  const umbClosed = (x, y, s, col) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0 -34 Q8 -10 5 14 L-5 14 Q-8 -10 0 -34z" fill="${col}" opacity=".8" stroke="#8fb3c7" stroke-width="1.5"/><path d="M0 14 V34 q0 7 7 7" fill="none" stroke="#7d848c" stroke-width="2.6" stroke-linecap="round"/></g>`;
  const umbOpen = (x, y, s, col) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-26 0 Q-26 -32 0 -32 Q26 -32 26 0 Q13 -7 0 0 Q-13 -7 -26 0z" fill="${col}" opacity=".65" stroke="#8fb3c7" stroke-width="1.5"/><path d="M0 -2 V26 q0 6 -6 6" fill="none" stroke="#7d848c" stroke-width="2.4" stroke-linecap="round"/></g>`;
  const miniBike = (x, y, s, col) => `<g transform="translate(${x},${y}) scale(${s})"><circle cx="-16" cy="0" r="10" fill="none" stroke="#454b54" stroke-width="3"/><circle cx="16" cy="0" r="10" fill="none" stroke="#454b54" stroke-width="3"/><path d="M-16 0 L-5 -16 H11 L0 0z M11 -16 L16 0 M11 -16 l-2 -7 h8" fill="none" stroke="${col}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><rect x="-12" y="-21" width="12" height="4" rx="2" fill="#3a3f46"/></g>`;
  const miniSock = (x, y, s, col, col2 = "#ffffff") => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-10 -24 H6 V-2 Q6 2 10 2 H20 Q28 2 28 12 Q28 22 20 22 H-4 Q-10 22 -10 14Z" fill="${col}" stroke="#00000022" stroke-width="1"/><rect x="-10" y="-24" width="16" height="7" fill="${col2}" opacity=".85"/></g>`;
  const miniTee = (x, y, s, col) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-9 -25 Q0 -20 9 -25 L22 -17 L17 -7 L12 -10 V25 H-12 V-10 L-17 -7 L-22 -17Z" fill="${col}" stroke="#00000018" stroke-width="1"/></g>`;
  const miniRando = (x, y, s, col, lock = "#e8c15a") => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-17" y="-24" width="34" height="48" rx="7" fill="${col}"/><path d="M-17 -24 H17 V12 Q17 16 13 16 H-13 Q-17 16 -17 12Z" fill="#ffffff" opacity=".18"/><rect x="-4" y="9" width="8" height="9" rx="2" fill="${lock}"/><path d="M-6 -27 q6 -7 12 0" fill="none" stroke="${col}" stroke-width="3"/></g>`;
  const tree = (x, y, s, col = "#8fcf8a") => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="0" width="8" height="34" fill="#b5835a"/><circle cx="0" cy="-8" r="26" fill="${col}"/><circle cx="-16" cy="6" r="16" fill="${col}"/><circle cx="16" cy="6" r="16" fill="${col}"/></g>`;

  // ============================================================
  //  主人公
  // ============================================================

  // ビニール傘：ひらいた傘を正面から。状態が下がると黄ばむ・やぶれる
  function umbrellaHero(c, mood) {
    const k = clamp((c.cond === undefined ? 100 : c.cond) / 100);
    const base = (c.v && c.v.umbTint) || "#cfe9fa";
    const tint = mixHex(base, "#efe3a0", 0.35 + 0.65 * k);
    const dark = "#7fb3d1";
    const canopy = "M-45 -4 Q-45 -52 0 -52 Q45 -52 45 -4 Q33.75 -13 22.5 -4 Q11.25 -13 0 -4 Q-11.25 -13 -22.5 -4 Q-33.75 -13 -45 -4z";
    const ribs = [-45, -22.5, 0, 22.5, 45].map((x) => `<path d="M0 -52 L${x} -5" stroke="${dark}" stroke-width="1.3" opacity=".75"/>`).join("");
    const torn = k < 0.35 ? `<path d="M22 -34 l9 10 l-7 3 l7 12" fill="none" stroke="#6f8191" stroke-width="2" stroke-linecap="round"/><path d="M-30 -20 l6 8" stroke="#6f8191" stroke-width="2" stroke-linecap="round"/>` : "";
    const bent = c.flags && c.flags.bent ? `<path d="M30 -10 L44 -32" stroke="#6f7782" stroke-width="2.6" stroke-linecap="round"/>` : "";
    return `<rect x="-2.5" y="-61" width="5" height="9" rx="2" fill="#8a9099"/>
      <path d="${canopy}" fill="${tint}" fill-opacity=".72" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/>
      ${ribs}
      <path d="M-34 -36 Q-26 -46 -14 -48" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".85"/>
      <path d="M0 -4 V42" stroke="#8a9099" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M0 42 q0 10 -9 10 q-8 0 -8 -8" fill="none" stroke="#6f7782" stroke-width="4" stroke-linecap="round"/>
      ${torn}${bent}
      <g transform="translate(0,-24) scale(.85)">${face(mood)}</g>`;
  }

  // 自転車：フレームの三角形の中に顔。さびる・パンクする
  function bicycleHero(c, mood) {
    const col = (c.v && c.v.bikeCol) || "#7fcfc3";
    const dark = mixHex(col, "#26343a", 0.55);
    const k = clamp((c.cond === undefined ? 100 : c.cond) / 100);
    const flat = c.flags && c.flags.flat;
    const wheel = (cx, isFlat) => {
      if (isFlat) return `<ellipse cx="${cx}" cy="42" rx="18" ry="10" fill="none" stroke="#454b54" stroke-width="4"/><path d="M${cx - 12} 42 h24" stroke="#b9c0c8" stroke-width="1.5"/>`;
      return `<circle cx="${cx}" cy="34" r="17" fill="none" stroke="#454b54" stroke-width="4"/><circle cx="${cx}" cy="34" r="13" fill="none" stroke="#c3cad2" stroke-width="1"/>
        ${[0, 45, 90, 135].map((a) => `<path d="M${cx} 34 l${(13 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(13 * Math.sin((a * Math.PI) / 180)).toFixed(1)} M${cx} 34 l${(-13 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(-13 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" stroke="#c3cad2" stroke-width="1"/>`).join("")}
        <circle cx="${cx}" cy="34" r="3" fill="#8a9099"/>`;
    };
    const rust = k < 0.55 ? `<circle cx="-6" cy="-1" r="3" fill="#c97b3c" opacity=".85"/><circle cx="12" cy="6" r="2.4" fill="#c97b3c" opacity=".85"/><circle cx="-18" cy="24" r="2.6" fill="#c97b3c" opacity=".85"/><circle cx="-28" cy="30" r="3" fill="#c97b3c" opacity=".6"/>` : "";
    return `${wheel(-26, false)}${wheel(26, flat)}
      <path d="M-26 34 L-10 -6 L22 -6 L0 34z" fill="${col}" stroke="${dark}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M22 -6 L${flat ? 26 : 26} ${flat ? 42 : 34}" stroke="${dark}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M22 -6 L19 -24 M12 -26 H28 q5 0 5 5" fill="none" stroke="#454b54" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M25 -19 h18 l-3 13 h-12z" fill="#ffffff" fill-opacity=".55" stroke="#8f959c" stroke-width="2"/>
      <path d="M30 -18 v12 M36 -18 v12" stroke="#8f959c" stroke-width="1"/>
      <path d="M-10 -6 V-13" stroke="#454b54" stroke-width="3.5"/>
      <rect x="-21" y="-19" width="21" height="6" rx="3" fill="#3a3f46"/>
      <circle cx="0" cy="34" r="5" fill="#c3c9d0" stroke="#8a9099" stroke-width="1.5"/>
      <rect x="3" y="40" width="10" height="3.5" rx="1.5" fill="#454b54"/>
      ${rust}
      <g transform="translate(-3,11) scale(.6)">${face(mood)}</g>`;
  }

  // 靴下：L字の形。つま先に穴があく
  function socksHero(c, mood) {
    const col = (c.v && c.v.sockCol) || "#f5a8c0";
    const col2 = (c.v && c.v.sockCol2) || "#ffffff";
    const k = clamp((c.cond === undefined ? 100 : c.cond) / 100);
    const body = mixHex(col, "#cfc7bd", 0.45 + 0.55 * k);
    const dark = mixHex(body, "#3a2f2a", 0.78);
    const hole = k < 0.45 ? `<ellipse cx="33" cy="26" rx="8" ry="7" fill="#f6c9a8" stroke="${dark}" stroke-width="1.8" stroke-dasharray="3 2"/>` : "";
    const hole2 = k < 0.25 ? `<ellipse cx="-14" cy="34" rx="5" ry="4" fill="#f6c9a8" stroke="${dark}" stroke-width="1.5" stroke-dasharray="2 2"/>` : "";
    const shape = "M-24 -58 H8 V0 Q8 4 14 4 H30 Q46 4 46 24 Q46 44 30 44 H-8 Q-24 44 -24 28 Z";
    return `<path d="${shape}" fill="${body}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="-24" y="-58" width="32" height="13" fill="${col2}" opacity=".9" stroke="${dark}" stroke-width="2"/>
      <path d="M-24 -52 H8" stroke="${dark}" stroke-width="1" opacity=".4"/>
      <path d="M34 5 Q46 6 46 24 Q46 43 34 44 Q41 24 34 5z" fill="${col2}" opacity=".85"/>
      <path d="M-24 22 V28 Q-24 44 -8 44 Q-13 34 -13 22z" fill="${col2}" opacity=".85"/>
      <path d="M-14 -40 v70 M-4 -40 v40" stroke="${dark}" stroke-width="1" opacity=".18"/>
      ${hole}${hole2}
      <g transform="translate(-8,-20) scale(.95)">${face(mood)}</g>`;
  }

  // Tシャツ：色と絵がらはランダム。着込むほど色あせる
  function tshirtHero(c, mood) {
    const col = (c.v && c.v.shirtCol) || "#5b8def";
    const k = clamp((c.cond === undefined ? 100 : c.cond) / 100);
    const body = mixHex(col, "#cfcac2", 0.5 + 0.5 * k);
    const dark = mixHex(body, "#2a2f3a", 0.72);
    const pr = (c.v && c.v.tprint) || "star";
    const pc = mixHex("#ffffff", body, 0.85);
    const print = pr === "star" ? `<path transform="translate(0,31) scale(.9)" d="M0 -9 L2.6 -3 L9 -2.6 L4 1.6 L5.6 8 L0 4.6 L-5.6 8 L-4 1.6 L-9 -2.6 L-2.6 -3Z" fill="${pc}"/>`
      : pr === "heart" ? `<path transform="translate(0,31)" d="M0 8 C-14 -2 -8 -12 0 -5 C8 -12 14 -2 0 8z" fill="${pc}"/>`
      : pr === "stripe" ? `<rect x="-24" y="24" width="48" height="6" fill="${pc}" opacity=".9"/><rect x="-24" y="34" width="48" height="6" fill="${pc}" opacity=".9"/>`
      : "";
    const stain = k < 0.4 ? `<ellipse cx="12" cy="36" rx="6" ry="4" fill="#b99a74" opacity=".6"/><circle cx="-14" cy="44" r="2" fill="#6f6a60" opacity=".5"/>` : "";
    const hole = k < 0.2 ? `<ellipse cx="-12" cy="-18" rx="4" ry="3" fill="#ffffff" opacity=".9" stroke="${dark}" stroke-width="1.2" stroke-dasharray="2 1.5"/>` : "";
    return `<path d="M-18 -50 Q0 -42 18 -50 L44 -34 L34 -14 L24 -20 V50 H-24 V-20 L-34 -14 L-44 -34 Z" fill="${body}" stroke="${dark}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M-18 -50 Q0 -36 18 -50" fill="none" stroke="${dark}" stroke-width="3"/>
      <path d="M-44 -34 L-34 -14 M44 -34 L34 -14" stroke="${dark}" stroke-width="1.2" opacity=".5"/>
      <path d="M-24 46 H24" stroke="${dark}" stroke-width="1.2" opacity=".4"/>
      ${print}${stain}${hole}
      <g transform="translate(0,-14)">${face(mood)}</g>`;
  }

  // ランドセル：1年生のあいだは黄色いカバー。傷がふえる
  function randoseruHero(c, mood) {
    const col = (c.v && c.v.rcol) || "#2f3440";
    const k = clamp((c.cond === undefined ? 100 : c.cond) / 100);
    const body = mixHex(col, "#9a9187", 0.55 + 0.45 * k);
    const flap = mixHex(body, "#ffffff", 0.88);
    const dark = mixHex(body, "#1a1a1a", 0.65);
    const stitch = mixHex(body, "#ffffff", 0.55);
    const cover = c.t !== undefined && c.t < 1 ? `<path d="M-33 -47 H33 V8 Q33 12 29 12 H-29 Q-33 12 -33 8Z" fill="#ffd84a" fill-opacity=".92" stroke="#e0b52a" stroke-width="2"/><path d="M-26 -40 H26" stroke="#fff3b0" stroke-width="3" opacity=".8"/>` : "";
    const scr = k < 0.7 ? `<path d="M-22 -30 l10 6 M14 4 l12 -5 M-8 18 l9 3" stroke="${stitch}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>` : "";
    const scr2 = k < 0.4 ? `<path d="M10 -36 l-8 12 M-26 8 l8 -8" stroke="#e9e1d6" stroke-width="2" stroke-linecap="round" opacity=".85"/>` : "";
    return `<path d="M-8 -50 Q0 -64 8 -50" fill="none" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
      <rect x="-40" y="-26" width="9" height="56" rx="4" fill="${dark}"/><rect x="31" y="-26" width="9" height="56" rx="4" fill="${dark}"/>
      <rect x="-33" y="-48" width="66" height="98" rx="13" fill="${body}" stroke="${dark}" stroke-width="2.5"/>
      <path d="M-33 -36 Q-33 -48 -21 -48 H21 Q33 -48 33 -36 V26 Q33 38 21 38 H-21 Q-33 38 -33 26Z" fill="${flap}" fill-opacity=".28" stroke="${dark}" stroke-width="2"/>
      <path d="M-27 -42 H27 V30 H-27Z" fill="none" stroke="${stitch}" stroke-width="1.6" stroke-dasharray="4 3" rx="8"/>
      <rect x="-9" y="26" width="18" height="16" rx="4" fill="#e8c15a" stroke="#b8952e" stroke-width="2"/>
      <circle cx="0" cy="34" r="2.6" fill="#b8952e"/>
      ${scr}${scr2}${cover}
      <g transform="translate(0,-12) scale(.88)">${face(mood)}</g>`;
  }

  // ============================================================
  //  シーン
  // ============================================================
  const S = SCENES;

  // ---- 傘 ----
  S.d1_umb_factory = () => ({ x: 180, y: 98, s: .62, bg: `
    <rect width="360" height="200" fill="#e8f1f8"/><rect y="150" width="360" height="50" fill="#c6d3de"/>
    <rect x="14" y="146" width="332" height="12" rx="6" fill="#6f8191"/>
    ${[26, 56].map((x) => `<rect x="${x}" y="40" width="26" height="76" rx="13" fill="#e4f6fd" stroke="#a9cfe0" stroke-width="2"/><ellipse cx="${x + 13}" cy="40" rx="13" ry="5" fill="#cfeaf6"/>`).join("")}
    ${[100, 252, 300].map((x) => `<path d="M${x} 0 V30" stroke="#9aa6b2" stroke-width="3"/><path d="M${x} 30 L${x - 22} 62 M${x} 30 L${x} 66 M${x} 30 L${x + 22} 62 M${x} 66 V100" stroke="#7d8f9f" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join("")}
    ${[44, 70, 296, 330].map((x) => umbClosed(x, 128, .55, "#cfe9fa")).join("")}
    ${sparkle(130, 40, .7)}${sparkle(228, 60, .6)}` });

  S.d1_konbini = () => ({ x: 186, y: 112, s: .66, bg: `
    <rect width="360" height="200" fill="#e9f4ef"/>
    <rect x="0" y="0" width="360" height="30" fill="#4bb28a"/><rect x="0" y="30" width="360" height="6" fill="#2f8a68"/>
    <rect x="16" y="46" width="120" height="104" rx="8" fill="#f8fdff" stroke="#b9d6cf" stroke-width="4"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${30 + i * 26} 150 V50" stroke="#e3f1ee" stroke-width="2"/>`).join("")}
    ${[34, 58, 82, 106].map((x, i) => umbClosed(x, 60 + (i % 2) * 6, .62, ["#cfe9fa", "#d8f0e6", "#cfe9fa", "#e9f0fa"][i])).join("")}
    <rect x="246" y="52" width="100" height="98" rx="8" fill="#cfe6f5" stroke="#9fbfd4" stroke-width="4"/>
    <path d="M246 52 L346 150" stroke="#ffffff" stroke-width="10" opacity=".35"/>
    ${rainLines(14, 11)}
    <rect y="150" width="360" height="50" fill="#d9d4cc"/>
    <rect x="148" y="144" width="70" height="46" rx="6" fill="#ffe15a" stroke="#d9b92e" stroke-width="2"/>` });

  S.d1_rain_street = () => ({ x: 180, y: 110, s: .78, bg: `
    <rect width="360" height="200" fill="#a9bccd"/>
    <rect x="0" y="40" width="64" height="100" fill="#8fa4b6"/><rect x="70" y="20" width="56" height="120" fill="#9bb0c2"/><rect x="274" y="30" width="86" height="110" fill="#8fa4b6"/>
    ${[50, 74, 98].map((y) => `<rect x="80" y="${y}" width="10" height="10" fill="#e6eef5"/><rect x="104" y="${y}" width="10" height="10" fill="#e6eef5"/>`).join("")}
    <rect y="140" width="360" height="60" fill="#6f7c88"/>
    ${[40, 130, 220, 310].map((x) => `<rect x="${x - 18}" y="176" width="36" height="5" rx="2.5" fill="#d5dde4"/>`).join("")}
    <ellipse cx="80" cy="168" rx="46" ry="8" fill="#9fc0dc" opacity=".8"/><ellipse cx="290" cy="184" rx="40" ry="7" fill="#9fc0dc" opacity=".8"/>
    ${rainLines(30, 5)}` });

  S.d1_stand = () => ({ x: 120, y: 92, s: .62, bg: `
    <rect width="360" height="200" fill="#f3e9da"/>
    <rect x="200" y="14" width="130" height="150" rx="6" fill="#c99a6b" stroke="#a87a4d" stroke-width="4"/><circle cx="314" cy="92" r="5" fill="#e8c15a"/>
    <rect y="160" width="360" height="40" fill="#d9c7a6"/>
    <rect x="236" y="104" width="66" height="62" rx="8" fill="#7fa5c9" stroke="#5b83a8" stroke-width="3"/>
    <rect x="236" y="104" width="66" height="10" rx="4" fill="#5b83a8"/>
    ${umbClosed(252, 96, .7, "#cfe9fa")}${umbClosed(272, 92, .7, "#d8f0e6")}${umbClosed(290, 98, .7, "#e7d8f6")}
    <rect x="30" y="40" width="70" height="8" rx="4" fill="#b5835a"/>
    <path d="M44 48 v-10 M86 48 v-10" stroke="#b5835a" stroke-width="3"/>
    <rect x="20" y="150" width="100" height="10" fill="#c9ae86"/>` });

  S.d1_lostfound = () => ({ x: 180, y: 78, s: .56, bg: `
    <rect width="360" height="200" fill="#eef0f4"/>
    ${[0, 1, 2].map((r) => `<rect x="10" y="${12 + r * 60}" width="340" height="6" fill="#aab4c0"/>`).join("")}
    ${Array.from({ length: 22 }, (_, i) => umbClosed(24 + (i % 11) * 31, 46 + Math.floor(i / 11) * 124 - (Math.floor(i / 11) ? 0 : 0), .6, ["#cfe9fa", "#d8f0e6", "#e9e1c6", "#e7d8f6"][i % 4])).join("")}
    ${[0, 1, 2].map((r) => `<rect x="10" y="${72 + r * 60}" width="340" height="6" fill="#aab4c0"/>`).join("")}
    <rect x="0" y="182" width="360" height="18" fill="#c3cbd5"/>
    <rect x="110" y="150" width="140" height="26" rx="6" fill="#ffffff" stroke="#aab4c0" stroke-width="2"/>
    <text x="180" y="168" font-size="13" fill="#5a6572" text-anchor="middle" font-weight="bold">わすれもの</text>` });

  S.d1_wind = () => ({ x: 176, y: 108, s: .72, r: -12, bg: `
    <rect width="360" height="200" fill="#9fb4c6"/>
    <path d="M0 40 q60 -20 120 0 t120 0 t120 0" stroke="#e5edf3" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M20 90 q60 -20 120 0 t120 0" stroke="#e5edf3" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M200 130 q50 -16 100 0 t60 0" stroke="#e5edf3" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <rect y="150" width="360" height="50" fill="#7d8a97"/>
    <g transform="translate(300,150) rotate(-24)"><rect x="-4" y="-70" width="8" height="70" fill="#8a5d3b"/><circle cx="-14" cy="-70" r="22" fill="#6fae78"/><circle cx="10" cy="-80" r="20" fill="#6fae78"/></g>
    ${[[60, 60], [90, 120], [250, 70], [150, 30]].map(([x, y], i) => `<path transform="translate(${x},${y}) rotate(${i * 50})" d="M0 -6 q8 6 0 12 q-8 -6 0 -12z" fill="#c7d98a"/>`).join("")}
    ${rainLines(12, 3)}` });

  S.d1_dump = () => ({ x: 232, y: 116, s: .62, r: 24, bg: `
    <rect width="360" height="200" fill="#e7ecdf"/>
    <rect y="150" width="360" height="50" fill="#c8cfbd"/>
    <path d="M20 40 H190 V150 H20z" fill="none" stroke="#8fa08a" stroke-width="3"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M${20 + i * 34} 40 V150" stroke="#8fa08a" stroke-width="2"/>`).join("")}
    ${Array.from({ length: 4 }, (_, i) => `<path d="M20 ${40 + i * 28} H190" stroke="#8fa08a" stroke-width="2"/>`).join("")}
    <ellipse cx="60" cy="150" rx="34" ry="30" fill="#8fb8a0"/><ellipse cx="116" cy="154" rx="30" ry="26" fill="#d6c7a3"/><ellipse cx="160" cy="150" rx="26" ry="22" fill="#a9b8d6"/>
    <path d="M40 150 q-22 -40 -10 -62" stroke="#7d848c" stroke-width="3" fill="none"/>
    ${umbOpen(100, 112, .8, "#cfe9fa")}` });

  S.d1_veranda = () => ({ x: 120, y: 112, s: .62, bg: `
    <rect width="360" height="200" fill="#cfeaff"/>${cloud(40, 34, .8)}${cloud(250, 24, .7)}
    <rect y="40" width="360" height="12" fill="#e7e1d6"/>
    <rect x="0" y="44" width="360" height="6" fill="#c9c1b3"/>
    ${Array.from({ length: 18 }, (_, i) => `<rect x="${i * 20 + 4}" y="52" width="4" height="100" fill="#f3efe7"/>`).join("")}
    <rect y="150" width="360" height="50" fill="#d9c7a6"/>
    <rect x="210" y="124" width="100" height="34" rx="6" fill="#c9774a"/>
    <path d="M230 124 V52 M260 124 V44 M290 124 V56" stroke="#8a9099" stroke-width="3"/>
    ${[[230, 90], [260, 70], [290, 100], [260, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#ff7b6b"/><circle cx="${x - 3}" cy="${y - 3}" r="2.5" fill="#fff" opacity=".6"/>`).join("")}
    <path d="M206 124 q10 -20 24 -8 q14 -22 30 -6 q18 -18 30 6" fill="#6fae78"/>` });

  // ---- 自転車 ----
  S.d1_bike_shop = () => ({ x: 180, y: 114, s: .8, bg: `
    <rect width="360" height="200" fill="#f6ecdc"/>
    <rect x="0" y="30" width="360" height="70" fill="#e9dcc4"/>
    ${[24, 80, 136].map((x) => `<path d="M${x} 36 v26 M${x - 8} 62 h16" stroke="#8a9099" stroke-width="3"/><circle cx="${x}" cy="76" r="8" fill="#9aa4ae"/>`).join("")}
    <circle cx="260" cy="64" r="26" fill="none" stroke="#454b54" stroke-width="6"/><circle cx="260" cy="64" r="16" fill="none" stroke="#c3cad2" stroke-width="1.5"/>
    <circle cx="310" cy="64" r="22" fill="none" stroke="#454b54" stroke-width="6"/>
    <rect y="150" width="360" height="50" fill="#cdbd9d"/><rect x="20" y="146" width="320" height="8" rx="3" fill="#b5a07a"/>
    ${miniBike(52, 128, .85, "#e86a6a")}${miniBike(308, 130, .85, "#4a8fe0")}
    <rect x="12" y="8" width="90" height="18" rx="4" fill="#4a8fe0"/>` });

  S.d1_bikepark = () => ({ x: 180, y: 126, s: .8, bg: `
    <rect width="360" height="200" fill="#d8ecf8"/>
    <rect x="0" y="0" width="360" height="26" fill="#9aa6b2"/>
    ${[40, 120, 200, 280, 340].map((x) => `<rect x="${x}" y="26" width="6" height="140" fill="#b7c0c9"/>`).join("")}
    <rect y="160" width="360" height="40" fill="#b9bec4"/>
    ${[20, 60, 100, 250, 290, 330].map((x, i) => miniBike(x, 134, .72, ["#e86a6a", "#4a8fe0", "#f5a623", "#7bbf6a", "#9a6ad6", "#4a8fe0"][i])).join("")}
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<rect x="${i * 44 + 4}" y="170" width="28" height="4" rx="2" fill="#f2f2f2"/>`).join("")}` });

  S.d1_schoolroad = () => ({ x: 140, y: 126, s: .78, bg: `
    <rect width="360" height="200" fill="#cfeaff"/>${cloud(40, 30)}${cloud(240, 24, .8)}
    <rect x="228" y="52" width="110" height="68" fill="#f3e3c6"/><rect x="222" y="44" width="122" height="12" fill="#c98e72"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${238 + i * 24}" y="66" width="16" height="22" fill="#cfe6f5"/>`).join("")}
    ${tree(30, 74, .9, "#f6b8cf")}${tree(300, 90, .6, "#f6b8cf")}
    <path d="M0 150 Q160 120 360 150 V200 H0z" fill="#9aa0a7"/>
    <path d="M0 176 Q160 150 360 176" stroke="#f2f2f2" stroke-width="4" stroke-dasharray="14 10" fill="none"/>
    ${[[60, 40], [100, 100], [200, 60], [270, 20], [330, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ffd1e0"/>`).join("")}` });

  S.d1_station = () => ({ x: 180, y: 128, s: .78, bg: `
    <rect width="360" height="200" fill="#dfeaf3"/>
    <rect x="30" y="20" width="300" height="84" fill="#f3e9da"/><rect x="26" y="12" width="308" height="14" rx="3" fill="#4a6fa5"/>
    <rect x="150" y="40" width="60" height="28" rx="6" fill="#ffffff"/><circle cx="180" cy="54" r="9" fill="#4a6fa5"/>
    ${[50, 80, 240, 270, 300].map((x) => `<rect x="${x}" y="46" width="20" height="40" fill="#cfe6f5"/>`).join("")}
    <rect y="150" width="360" height="50" fill="#b9bec4"/>
    ${[22, 60, 100, 262, 300, 336].map((x, i) => miniBike(x, 138, .7, ["#e86a6a", "#4a8fe0", "#f5a623", "#7bbf6a", "#9a6ad6", "#e86a6a"][i])).join("")}
    <path d="M250 128 h38 v16 h-38z" fill="#ffe15a" stroke="#d9b92e" stroke-width="2" transform="rotate(-8 270 136)"/>` });

  S.d1_impound = () => ({ x: 180, y: 126, s: .76, bg: `
    <rect width="360" height="200" fill="#e3ecd8"/>
    <rect y="156" width="360" height="44" fill="#b5b9a8"/>
    ${Array.from({ length: 19 }, (_, i) => `<path d="M${i * 20} 40 V160" stroke="#8fa08a" stroke-width="2"/>`).join("")}
    ${[44, 84, 124].map((y) => `<path d="M0 ${y} H360" stroke="#8fa08a" stroke-width="2"/>`).join("")}
    ${[30, 76, 270, 318].map((x, i) => miniBike(x, 140, .8, ["#e86a6a", "#7bbf6a", "#4a8fe0", "#f5a623"][i])).join("")}
    ${[30, 76, 270, 318].map((x) => `<path d="M${x} 118 v-8" stroke="#8a9099" stroke-width="1.5"/><rect x="${x - 7}" y="100" width="14" height="10" fill="#ffe15a" stroke="#d9b92e" stroke-width="1.5"/>`).join("")}
    <rect x="130" y="10" width="100" height="22" rx="4" fill="#ffffff" stroke="#aab4c0" stroke-width="2"/><text x="180" y="26" font-size="12" fill="#5a6572" text-anchor="middle" font-weight="bold">ほかんじょ</text>` });

  S.d1_riverbank = () => ({ x: 170, y: 126, s: .78, bg: `
    <rect width="360" height="200" fill="#ffd9b8"/><circle cx="290" cy="56" r="26" fill="#ffb37a"/>
    <rect y="96" width="360" height="40" fill="#8fc8ea"/>
    <path d="M0 108 q30 -6 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#bfe3f6" stroke-width="3" fill="none"/>
    <path d="M0 136 Q180 124 360 140 V200 H0z" fill="#a8d88f"/>
    <path d="M0 176 Q180 160 360 176 V200 H0z" fill="#8fc57a"/>
    ${[40, 70, 300, 330].map((x) => `<path d="M${x} 150 q-4 -16 -10 -22 M${x} 150 q2 -18 8 -26" stroke="#6fae78" stroke-width="3" fill="none" stroke-linecap="round"/>`).join("")}` });

  S.d1_garage = () => ({ x: 190, y: 124, s: .8, bg: `
    <rect width="360" height="200" fill="#8e8a86"/>
    ${Array.from({ length: 10 }, (_, i) => `<rect x="0" y="${i * 20}" width="360" height="2" fill="#7d7975"/>`).join("")}
    <rect y="156" width="360" height="44" fill="#6e6a66"/>
    <path d="M0 0 L70 0 L0 60z" fill="#d9d5d0" opacity=".5"/><path d="M0 4 L58 4 M0 16 L44 16 M0 28 L30 28 M10 0 L0 60" stroke="#e8e5e0" stroke-width="1"/>
    <rect x="270" y="60" width="70" height="80" rx="4" fill="#a39b92"/><rect x="278" y="68" width="54" height="64" fill="#8a837b"/>
    ${[290, 310].map((x) => `<rect x="${x}" y="74" width="10" height="20" fill="#e8c15a" opacity=".8"/>`).join("")}
    <circle cx="30" cy="150" r="14" fill="#6f6a66"/><circle cx="50" cy="156" r="9" fill="#5e5a56"/>
    <ellipse cx="190" cy="168" rx="70" ry="7" fill="#000" opacity=".25"/>` });

  S.d1_foreign = () => ({ x: 180, y: 126, s: .78, bg: `
    <rect width="360" height="200" fill="#bfe8ff"/><circle cx="60" cy="40" r="24" fill="#ffe08a"/>
    <rect x="224" y="60" width="64" height="70" fill="#ff9e7a"/><rect x="290" y="76" width="54" height="54" fill="#ffd166"/><rect x="236" y="76" width="16" height="22" fill="#fff3d9"/>
    <path d="M24 130 V70" stroke="#a8774c" stroke-width="8"/><path d="M24 70 q-26 -4 -34 14 M24 70 q26 -4 34 14 M24 70 q-14 -22 -28 -16 M24 70 q14 -22 28 -16" stroke="#3fa26b" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect y="130" width="360" height="70" fill="#e8c99a"/>
    <path d="M0 170 Q180 150 360 170" stroke="#d6b27c" stroke-width="3" fill="none"/>
    ${[[110, 110, "#5b8def"], [320, 150, "#e86a6a"]].map(([x, y, col]) => miniBike(x, y, .6, col)).join("")}` });

  // ---- 靴下 ----
  S.d1_sock_factory = () => ({ x: 180, y: 100, s: .62, bg: `
    <rect width="360" height="200" fill="#f3eefa"/>
    <rect y="150" width="360" height="50" fill="#d6cfe3"/>
    ${[["#f5a8c0", 24], ["#8ecbf0", 50], ["#ffd166", 76], ["#a8d88f", 284], ["#c9a8f0", 310]].map(([col, x]) => `<path d="M${x - 10} 30 H${x + 10} L${x + 14} 100 H${x - 14}z" fill="${col}"/><path d="M${x - 12} 52 h24 M${x - 13} 74 h26" stroke="#ffffff" stroke-width="2" opacity=".6"/>`).join("")}
    <rect x="96" y="40" width="168" height="78" rx="10" fill="#9fb0bf"/><circle cx="130" cy="78" r="18" fill="#7d8f9f"/><circle cx="130" cy="78" r="8" fill="#c3cad2"/>
    <path d="M24 100 Q80 120 130 96 M50 100 Q90 116 130 96" stroke="#f5a8c0" stroke-width="2" fill="none"/>
    <rect x="14" y="146" width="332" height="12" rx="6" fill="#6f8191"/>
    ${sparkle(240, 34, .6)}` });

  S.d1_sockshop = () => ({ x: 180, y: 100, s: .6, bg: `
    <rect width="360" height="200" fill="#fff4e6"/>
    <rect y="170" width="360" height="30" fill="#ead7bd"/>
    <rect x="14" y="26" width="332" height="6" rx="3" fill="#b5835a"/>
    ${Array.from({ length: 9 }, (_, i) => miniSock(30 + i * 37, 54, .8, ["#f5a8c0", "#8ecbf0", "#ffd166", "#a8d88f", "#c9a8f0", "#f5a8c0", "#8ecbf0", "#ffd166", "#a8d88f"][i], ["#ffffff", "#ffe15a"][i % 2])).join("")}
    <rect x="14" y="140" width="332" height="6" rx="3" fill="#b5835a"/>
    ${Array.from({ length: 9 }, (_, i) => miniSock(30 + i * 37, 168, .6, ["#7fcfc3", "#e86a6a", "#9a6ad6", "#f5a623"][i % 4])).join("")}` });

  S.d1_sockdrawer = () => ({ x: 180, y: 96, s: .6, bg: `
    <rect width="360" height="200" fill="#e5d1b4"/>
    <rect x="14" y="14" width="332" height="172" rx="10" fill="#c99a6b" stroke="#a87a4d" stroke-width="4"/>
    <rect x="26" y="26" width="308" height="148" rx="6" fill="#efe0c8"/>
    ${[40, 130, 250].map((x, i) => `<rect x="${x}" y="32" width="2" height="136" fill="#d4bc98"/>`).join("")}
    ${[[56, 44], [56, 100], [96, 70], [150, 50], [150, 104], [196, 76], [262, 48], [262, 104], [300, 74]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="15" fill="${["#f5a8c0", "#8ecbf0", "#ffd166", "#a8d88f", "#c9a8f0", "#7fcfc3", "#e86a6a", "#f5a623", "#9aa4ae"][i]}"/><circle cx="${x}" cy="${y}" r="6" fill="#ffffff" opacity=".4"/>`).join("")}` });

  S.d1_washer = () => ({ x: 180, y: 100, s: .55, r: 20, bg: `
    <rect width="360" height="200" fill="#e9eff5"/>
    <circle cx="180" cy="100" r="96" fill="#cdd7e1" stroke="#aeb9c5" stroke-width="8"/>
    <circle cx="180" cy="100" r="82" fill="#bfe3ff"/>
    <circle cx="180" cy="100" r="82" fill="none" stroke="#ffffff" stroke-width="3" opacity=".5"/>
    ${[[110, 70, 12], [250, 60, 9], [130, 150, 10], [240, 140, 14], [200, 40, 7], [150, 100, 6], [220, 100, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity=".75"/>`).join("")}
    <path d="M112 128 q-20 -10 -12 -30 M262 82 q16 12 6 30" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".5"/>
    ${miniTee(120, 118, .7, "#f6b86b")}${miniSock(250, 96, .6, "#8ecbf0")}` });

  S.d1_laundry_line = () => ({ x: 176, y: 94, s: .55, bg: `
    <rect width="360" height="200" fill="#cfeaff"/>${cloud(250, 24, .8)}${cloud(30, 130, .6)}
    <path d="M0 40 Q180 62 360 40" stroke="#8a9099" stroke-width="3" fill="none"/>
    <rect y="170" width="360" height="30" fill="#a8d88f"/>
    ${miniTee(48, 78, .95, "#f6b86b")}${miniTee(300, 80, .95, "#8ecbf0")}${miniSock(100, 82, .85, "#f5a8c0")}${miniSock(258, 82, .85, "#c9a8f0")}
    ${[48, 100, 258, 300].map((x) => `<rect x="${x - 3}" y="42" width="6" height="12" rx="2" fill="#e86a6a"/>`).join("")}` });

  S.d1_sofa_under = () => ({ x: 176, y: 142, s: .56, r: 72, bg: `
    <rect width="360" height="200" fill="#2b2530"/>
    <rect width="360" height="56" fill="#7b5a6a"/><rect y="50" width="360" height="12" fill="#5a3f4d"/>
    <rect x="0" y="62" width="14" height="138" fill="#5a3f4d"/><rect x="346" y="62" width="14" height="138" fill="#5a3f4d"/>
    <rect y="180" width="360" height="20" fill="#3a3340"/>
    ${[[60, 176, 14], [270, 170, 18], [310, 178, 10], [120, 182, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4a4550"/>`).join("")}
    <circle cx="54" cy="150" r="6" fill="#e86a6a"/><rect x="290" y="136" width="30" height="5" rx="2" fill="#ffd166"/>` });

  S.d1_genkan = () => ({ x: 220, y: 118, s: .62, bg: `
    <rect width="360" height="200" fill="#f6ecdc"/>
    <rect x="0" y="0" width="360" height="110" fill="#efe3cf"/>
    <rect x="0" y="112" width="360" height="14" fill="#b5835a"/>
    <rect y="126" width="360" height="74" fill="#c9c3bb"/>
    <rect x="16" y="30" width="92" height="82" rx="4" fill="#c99a6b" stroke="#a87a4d" stroke-width="3"/>
    <path d="M16 70 H108" stroke="#a87a4d" stroke-width="3"/>
    <path d="M40 176 q0 -26 28 -26 h30 q10 0 10 12 v14z" fill="#e86a6a" stroke="#b84a4a" stroke-width="2"/>
    <path d="M300 178 q0 -24 22 -24 h16 q10 0 10 10 v14z" fill="#4a8fe0" stroke="#2f66b3" stroke-width="2"/>` });

  S.d1_rag = () => ({ x: 120, y: 116, s: .6, r: -18, bg: `
    <rect width="360" height="200" fill="#fbf1de"/>
    <rect y="100" width="360" height="100" fill="#e0b788"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 50} 100 L${i * 50 - 30} 200" stroke="#cfa06c" stroke-width="2"/>`).join("")}
    <path d="M230 90 L246 164 H318 L334 90z" fill="#7fb7e6" stroke="#5b8fc2" stroke-width="3"/>
    <ellipse cx="282" cy="90" rx="52" ry="9" fill="#bfe3ff" stroke="#5b8fc2" stroke-width="3"/>
    <path d="M232 92 q50 -70 100 0" fill="none" stroke="#8a9099" stroke-width="3"/>
    ${[[250, 52, 8], [320, 40, 6], [296, 30, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="#bfe3ff" stroke-width="2"/>`).join("")}` });

  // ---- Tシャツ ----
  S.d1_sew_factory = () => ({ x: 180, y: 100, s: .6, bg: `
    <rect width="360" height="200" fill="#f1ecf7"/><rect y="150" width="360" height="50" fill="#d6cfe3"/>
    ${[["#5b8def", 20], ["#f6b86b", 52], ["#8fd0a0", 284], ["#f5a8c0", 316]].map(([col, x]) => `<rect x="${x - 12}" y="64" width="26" height="82" rx="13" fill="${col}"/><ellipse cx="${x + 1}" cy="64" rx="13" ry="5" fill="#ffffff" opacity=".4"/>`).join("")}
    <rect x="90" y="108" width="180" height="14" rx="4" fill="#9fb0bf"/><rect x="100" y="122" width="10" height="30" fill="#7d8f9f"/><rect x="250" y="122" width="10" height="30" fill="#7d8f9f"/>
    <rect x="210" y="56" width="50" height="52" rx="8" fill="#9fb0bf"/><path d="M234 108 v14" stroke="#454b54" stroke-width="3"/><rect x="226" y="40" width="26" height="18" rx="4" fill="#7d8f9f"/>
    <path d="M10 28 H350" stroke="#9aa6b2" stroke-width="2"/>${miniTee(60, 28, .5, "#5b8def")}${miniTee(110, 28, .5, "#f6b86b")}${miniTee(310, 28, .5, "#8fd0a0")}` });

  S.d1_tee_shop = () => ({ x: 180, y: 106, s: .6, bg: `
    <rect width="360" height="200" fill="#fdf2f4"/>
    <rect y="168" width="360" height="32" fill="#e8d6cc"/>
    <path d="M20 40 H340" stroke="#9aa4ae" stroke-width="4"/>
    ${[44, 84, 276, 316].map((x, i) => `<path d="M${x} 40 v-8 q0 -6 6 -6" stroke="#9aa4ae" stroke-width="2" fill="none"/>${miniTee(x, 74, .95, ["#f6b86b", "#8ecbf0", "#c9a8f0", "#8fd0a0"][i])}`).join("")}
    <rect x="130" y="130" width="100" height="38" rx="4" fill="#ffffff" stroke="#e0c9c0" stroke-width="2"/>
    <rect x="152" y="118" width="56" height="26" rx="3" fill="#ffe15a"/><text x="180" y="136" font-size="11" text-anchor="middle" font-weight="bold">ねだん</text>` });

  S.d1_closet = () => ({ x: 180, y: 108, s: .56, bg: `
    <rect width="360" height="200" fill="#d9c7a6"/>
    <rect x="12" y="8" width="336" height="184" rx="6" fill="#efe0c8" stroke="#b5835a" stroke-width="5"/>
    <path d="M26 40 H334" stroke="#8a9099" stroke-width="4"/>
    ${[44, 76, 108, 252, 284, 316].map((x, i) => `${miniTee(x, 70, .85, ["#8ecbf0", "#f5a8c0", "#ffd166", "#8fd0a0", "#c9a8f0", "#e86a6a"][i])}`).join("")}
    <path d="M26 128 H334" stroke="#b5835a" stroke-width="5"/>
    ${[44, 100, 256, 312].map((x, i) => `<rect x="${x - 22}" y="140" width="44" height="40" rx="4" fill="${["#f6b86b", "#8ecbf0", "#c9a8f0", "#8fd0a0"][i]}"/><path d="M${x - 22} 150 h44" stroke="#ffffff" stroke-width="2" opacity=".5"/>`).join("")}` });

  S.d1_thrift = () => ({ x: 180, y: 108, s: .58, bg: `
    <rect width="360" height="200" fill="#fff1c9"/>
    <rect y="170" width="360" height="30" fill="#d9c09a"/>
    <path d="M14 36 H346" stroke="#8a9099" stroke-width="4"/>
    ${[36, 70, 104, 256, 290, 324].map((x, i) => miniTee(x, 70, .9, ["#e86a6a", "#5b8def", "#f2c94c", "#8fd0a0", "#c9a8f0", "#f5a8c0"][i])).join("")}
    <rect x="130" y="138" width="100" height="32" rx="5" fill="#c99a6b" stroke="#a87a4d" stroke-width="3"/>
    ${[148, 180, 212].map((x, i) => miniTee(x, 142, .5, ["#5b8def", "#f2c94c", "#e86a6a"][i])).join("")}
    <rect x="10" y="150" width="14" height="22" fill="#c99a6b"/>` });

  S.d1_collect = () => ({ x: 180, y: 94, s: .56, bg: `
    <rect width="360" height="200" fill="#e7f3ea"/><rect y="170" width="360" height="30" fill="#c9d8c5"/>
    <rect x="96" y="40" width="168" height="130" rx="10" fill="#4bb28a" stroke="#2f8a68" stroke-width="4"/>
    <rect x="150" y="56" width="60" height="14" rx="5" fill="#2f6f58"/>
    <path transform="translate(180,120) scale(.9)" d="M-20 -14 q10 8 20 8 q10 0 20 -8 l16 12 l-8 12 l-10 -4 V28 h-36 V6 l-10 4 l-8 -12z" fill="#ffffff" opacity=".9"/>
    ${[[30, 150], [62, 156], [310, 150]].map(([x, y]) => `<rect x="${x - 22}" y="${y - 24}" width="44" height="34" fill="#d6a66a" stroke="#c4914f" stroke-width="2"/>`).join("")}` });

  S.d1_parcel = () => ({ x: 180, y: 88, s: .5, bg: `
    <rect width="360" height="200" fill="#fff4e6"/><rect y="150" width="360" height="50" fill="#ead7bd"/>
    <path d="M70 100 L110 70 H250 L290 100 V170 H70z" fill="#d6a66a" stroke="#c4914f" stroke-width="3"/>
    <path d="M70 100 H290" stroke="#c4914f" stroke-width="3"/>
    <path d="M70 100 L90 76 M290 100 L270 76" stroke="#c4914f" stroke-width="3"/>
    <rect x="156" y="100" width="48" height="12" fill="#f2e3b5"/>
    <rect x="230" y="128" width="40" height="28" rx="4" fill="#ffffff" stroke="#c9c1b3" stroke-width="2"/><path d="M236 138 h28 M236 146 h20" stroke="#c9c1b3" stroke-width="2"/>` });

  // ---- ランドセル ----
  S.d1_rando_shop = () => ({ x: 180, y: 104, s: .6, bg: `
    <rect width="360" height="200" fill="#fdeef4"/>
    <rect y="172" width="360" height="28" fill="#ead7bd"/>
    <rect x="10" y="48" width="340" height="6" fill="#c9915a"/><rect x="10" y="118" width="340" height="6" fill="#c9915a"/>
    ${[28, 64, 100, 260, 296, 332].map((x, i) => miniRando(x, 28, .6, ["#2f3440", "#b58fe0", "#f5a8c0", "#4a8fe0", "#e86a6a", "#8ecbf0"][i])).join("")}
    ${[28, 64, 100, 260, 296, 332].map((x, i) => miniRando(x, 98, .6, ["#8ecbf0", "#e86a6a", "#2f3440", "#b58fe0", "#2f4a8a", "#f5a8c0"][i])).join("")}
    ${sparkle(150, 26, .6)}${sparkle(214, 150, .7)}` });

  S.d1_classroom = () => ({ x: 184, y: 128, s: .6, bg: `
    <rect width="360" height="200" fill="#f6f0e0"/>
    <rect x="30" y="16" width="180" height="84" rx="4" fill="#3f7a5a" stroke="#b5835a" stroke-width="6"/>
    <path d="M50 44 h60 M50 62 h90" stroke="#ffffff" stroke-width="3" opacity=".7"/>
    <rect x="236" y="18" width="100" height="70" fill="#cfe9ff" stroke="#b5835a" stroke-width="4"/><path d="M286 18 V88 M236 53 H336" stroke="#b5835a" stroke-width="3"/>
    <rect y="136" width="360" height="64" fill="#d9bd8c"/>
    <rect x="30" y="120" width="76" height="8" fill="#b5835a"/><rect x="36" y="128" width="6" height="40" fill="#8a6a3f"/><rect x="94" y="128" width="6" height="40" fill="#8a6a3f"/>
    <rect x="258" y="118" width="76" height="8" fill="#b5835a"/><rect x="264" y="126" width="6" height="40" fill="#8a6a3f"/><rect x="322" y="126" width="6" height="40" fill="#8a6a3f"/>
    <rect x="130" y="150" width="100" height="10" rx="4" fill="#b5835a"/>` });

  S.d1_playground = () => ({ x: 150, y: 138, s: .62, bg: `
    <rect width="360" height="200" fill="#cfeaff"/>${cloud(30, 30)}${cloud(240, 22, .8)}
    <rect x="220" y="60" width="110" height="60" fill="#f3e3c6"/><rect x="214" y="52" width="122" height="10" fill="#c98e72"/>
    <rect y="120" width="360" height="80" fill="#d9bd8c"/>
    <path d="M250 124 V76 M300 124 V76 M240 76 H310" stroke="#e86a6a" stroke-width="5" fill="none"/>
    <path d="M262 76 V112 M288 76 V112" stroke="#8a9099" stroke-width="2"/><rect x="256" y="112" width="12" height="4" fill="#5b8def"/><rect x="282" y="112" width="12" height="4" fill="#5b8def"/>
    <circle cx="40" cy="150" r="14" fill="#ffffff" stroke="#e86a6a" stroke-width="3"/><path d="M30 144 q10 8 20 0 M28 154 q12 -6 24 0" stroke="#e86a6a" stroke-width="2" fill="none"/>
    <path d="M0 190 H360" stroke="#ffffff" stroke-width="3" opacity=".6"/>` });

  S.d1_oshiire = () => ({ x: 180, y: 112, s: .6, bg: `
    <rect width="360" height="200" fill="#d9c7a6"/>
    <rect x="12" y="10" width="336" height="180" fill="#efe0c8" stroke="#a87a4d" stroke-width="5"/>
    <rect x="12" y="98" width="336" height="8" fill="#a87a4d"/>
    <rect x="30" y="34" width="110" height="60" rx="8" fill="#f5a8c0"/><rect x="40" y="42" width="90" height="12" rx="6" fill="#f8c9d8"/>
    <rect x="236" y="48" width="80" height="46" fill="#d6a66a" stroke="#c4914f" stroke-width="2"/><rect x="250" y="30" width="60" height="22" fill="#c4914f"/>
    <rect x="30" y="142" width="80" height="44" fill="#d6a66a" stroke="#c4914f" stroke-width="2"/>
    <rect x="256" y="136" width="70" height="50" rx="6" fill="#8ecbf0"/>
    <rect width="360" height="200" fill="#1a1622" opacity=".18"/>` });

  S.d1_kidsroom = () => ({ x: 130, y: 118, s: .66, bg: `
    <rect width="360" height="200" fill="#fff3d9"/><rect y="150" width="360" height="50" fill="#e0b788"/>
    <rect x="200" y="86" width="140" height="10" rx="3" fill="#c99a6b"/><rect x="210" y="96" width="8" height="58" fill="#a87a4d"/><rect x="322" y="96" width="8" height="58" fill="#a87a4d"/>
    <rect x="226" y="60" width="52" height="26" rx="3" fill="#cfe9ff" stroke="#b5835a" stroke-width="2"/>
    <rect x="290" y="68" width="30" height="18" fill="#f5a8c0"/><rect x="296" y="60" width="18" height="8" fill="#ffd166"/>
    <rect x="24" y="16" width="70" height="50" fill="#cfe9ff" stroke="#b5835a" stroke-width="4"/>
    <path d="M200 40 l20 -14 l20 14 v10 h-40z" fill="#ffd166" opacity=".9"/>${sparkle(262, 30, .6)}` });

  S.d1_donate = () => ({ x: 180, y: 96, s: .56, bg: `
    <rect width="360" height="200" fill="#e6f5ec"/><rect y="168" width="360" height="32" fill="#cdb38f"/>
    <rect x="96" y="40" width="168" height="130" fill="#d6a66a" stroke="#c4914f" stroke-width="4"/>
    <path d="M96 40 L116 18 H244 L264 40" fill="#e0b57e" stroke="#c4914f" stroke-width="3"/>
    <path transform="translate(180,128)" d="M0 14 C-24 -4 -14 -22 0 -10 C14 -22 24 -4 0 14z" fill="#ff7b7b"/>
    ${[[40, 150], [320, 150]].map(([x, y]) => miniRando(x, y, .9, "#b58fe0")).join("")}` });

  S.d1_afghan_school = () => ({ x: 130, y: 128, s: .64, bg: `
    <rect width="360" height="200" fill="#bfe3ff"/><circle cx="300" cy="40" r="22" fill="#ffe08a"/>
    <path d="M0 120 L60 70 L110 110 L170 56 L240 112 L300 80 L360 120 V150 H0z" fill="#c9b79a"/>
    <path d="M150 70 L170 56 L190 72z" fill="#ffffff"/>
    <rect y="146" width="360" height="54" fill="#e3cf9f"/>
    <rect x="212" y="84" width="110" height="64" fill="#f3e9da" stroke="#c9b79a" stroke-width="3"/><path d="M204 84 L267 56 L330 84z" fill="#6ba7d6"/>
    ${[228, 262, 296].map((x) => `<rect x="${x}" y="104" width="18" height="26" fill="#6ba7d6"/>`).join("")}
    <path d="M200 148 V104 M200 104 h18" stroke="#8a6a3f" stroke-width="3"/><path d="M200 104 h22 v10 h-22z" fill="#4bb28a"/>` });

  S.d1_remake = () => ({ x: 182, y: 112, s: .58, bg: `
    <rect width="360" height="200" fill="#f6ecdc"/>
    <rect x="10" y="126" width="340" height="14" rx="4" fill="#c99a6b"/><rect x="24" y="140" width="10" height="50" fill="#a87a4d"/><rect x="326" y="140" width="10" height="50" fill="#a87a4d"/>
    <rect x="20" y="14" width="140" height="64" rx="4" fill="#cfe9ff" stroke="#b5835a" stroke-width="4"/>
    ${[40, 70, 100].map((x, i) => `<path d="M${x} 78 v14 q0 6 6 6" fill="none" stroke="#8a9099" stroke-width="2"/>`).join("")}
    <path d="M230 40 L262 106 M262 40 L230 106" stroke="#8a9099" stroke-width="4" stroke-linecap="round"/><circle cx="226" cy="112" r="8" fill="none" stroke="#e86a6a" stroke-width="4"/><circle cx="266" cy="112" r="8" fill="none" stroke="#e86a6a" stroke-width="4"/>
    ${[[300, 112, "#2f3440"], [330, 112, "#b58fe0"]].map(([x, y, col]) => `<rect x="${x - 14}" y="${y - 12}" width="28" height="14" rx="3" fill="${col}"/>`).join("")}
    ${miniRando(52, 108, .55, "#e86a6a")}` });

  ART.d1 = {
    mixHex, umbrellaHero, bicycleHero, socksHero, tshirtHero, randoseruHero,
    umbOpen, umbClosed, miniBike, miniSock, miniTee, miniRando
  };
})();
