// モノに生まれたら：データの自動チェック
//
//   node tools/validate.js            … 全部のモノをチェック
//   node tools/validate.js coin bill  … 指定したモノだけチェック
//   node tools/validate.js --static   … シミュレーションなし（速い）
//
// 1. 静的チェック：必須項目、行き先・シーンの存在、質問の形、文章の {名前}
// 2. シミュレーション：本物の画面で何十回も一生を最後まで進め、
//    エラー・止まり・質問の重複・文章のこわれ を調べる
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2);
const STATIC_ONLY = args.includes("--static");
const only = args.filter((a) => !a.startsWith("--"));
const LIVES = Number((args.find((a) => a.startsWith("--lives=")) || "--lives=60").split("=")[1]);

// 読み込むファイル
//  ・モノを指定したとき：core.js ＋ things/_art_*.js ＋ things/<id>.js だけ（ほかの人の作業中のファイルに影響されない）
//  ・指定しないとき：index.html に並んでいる <script src> 全部
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const artFiles = fs.readdirSync(path.join(ROOT, "things")).filter((f) => /^_art_.*\.js$/.test(f)).sort().map((f) => "things/" + f);
const scripts = only.length
  ? ["core.js", ...artFiles, ...only.map((id) => `things/${id}.js`)]
  : [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const mine = new Set(only.map((id) => `things/${id}.js`));

const ctx = vm.createContext({ console, Math, JSON, Object, Array, String, Number, Set, Map });
const loadProblems = [];
for (const f of scripts) {
  const full = path.join(ROOT, f);
  if (!fs.existsSync(full)) { loadProblems.push({ f, msg: "ファイルがない", fatal: true }); continue; }
  try {
    vm.runInContext(fs.readFileSync(full, "utf8"), ctx, { filename: f });
  } catch (e) {
    // 自分のファイル・core.js の失敗はエラー、ほかの人の _art ファイルの失敗は注意だけ
    loadProblems.push({ f, msg: e.message, fatal: !only.length || mine.has(f) || f === "core.js" });
  }
}
const MONOS = vm.runInContext("MONOS", ctx);
const SCENES = vm.runInContext("SCENES", ctx);
const RANDOM_WORDS = vm.runInContext("RANDOM_WORDS", ctx);

const errors = [];
const warns = [];
const err = (id, msg) => errors.push(`[${id}] ${msg}`);
const warn = (id, msg) => warns.push(`[${id}] ${msg}`);

for (const p of loadProblems) (p.fatal ? err : warn)(p.f, "読み込めない: " + p.msg);
for (const id of only) if (MONOS[id] === undefined) err(id, `things/${id}.js の中で MONOS.${id} = {...} が作られていない`);

const KNOWN_WORDS = new Set(["owner", "pref", "content", ...Object.keys(RANDOM_WORDS)]);
const MOODS = ["happy", "sad", "surprise", "sleep", "neutral"];

function textsOf(obj, out = []) {
  if (!obj || typeof obj !== "object") return out;
  for (const [k, v] of Object.entries(obj)) {
    if ((k === "t" || k === "q" || k === "l" || k === "short" || k === "title") && typeof v === "string") out.push(v);
    else if (typeof v === "object") textsOf(v, out);
  }
  return out;
}

function checkOption(id, where, a, places) {
  if (!a || typeof a !== "object") { err(id, `${where}: 選択肢が空`); return; }
  const outcomes = a.p !== undefined ? [a.ok, a.ng] : [a];
  if (a.p !== undefined) {
    if (!(a.p > 0 && a.p < 1)) err(id, `${where}: p は 0〜1 の間にする`);
    if (!a.ok || !a.ng) err(id, `${where}: p があるときは ok と ng の両方が必要`);
  }
  for (const r of outcomes) {
    if (!r) continue;
    if (r.go && !places[r.go]) err(id, `${where}: go の行き先「${r.go}」がない`);
    if (r.b) for (const k of Object.keys(r.b)) if (!places[k]) err(id, `${where}: b の行き先「${k}」がない`);
    if (r.m && !MOODS.includes(r.m)) err(id, `${where}: 顔 m「${r.m}」は ${MOODS.join("/")} のどれか`);
  }
}

const targetIds = only.length ? only : Object.keys(MONOS);
for (const id of targetIds) {
  const m = MONOS[id];
  if (!m) { err(id, "MONOS にない"); continue; }
  for (const k of ["name", "group", "hero", "time", "condLabel", "odds", "oddsText", "owners", "start", "birthText", "places", "sources"]) {
    if (m[k] === undefined) err(id, `必須項目 ${k} がない`);
  }
  if (!["お金", "容器", "電化製品", "身の回り", "その他"].includes(m.group)) err(id, `group「${m.group}」はお金/容器/電化製品/身の回り/その他のどれか`);
  if (!["year", "day"].includes(m.time)) err(id, `time は "year" か "day"`);
  if (!Array.isArray(m.owners) || m.owners.length < 5) err(id, "owners は5人以上");
  if (!m.places || !m.places[m.start]) { err(id, `start「${m.start}」が places にない`); continue; }
  const places = m.places;

  // ヒーローの絵
  for (const mood of MOODS) {
    try {
      const c = { t: 0, gen: 1, owners: 0, km: 0, cond: 100, fill: 1, v: { pref: "東京都" }, used: {}, usedQ: {}, flags: {}, startYear: 2026 };
      if (m.init) m.init(c);
      const svg = m.hero(c, mood);
      if (typeof svg !== "string" || svg.length < 30) err(id, `hero(${mood}) が SVG の文字列を返さない`);
      else if (/undefined|NaN/.test(svg)) err(id, `hero(${mood}) に undefined / NaN が入っている`);
    } catch (e) { err(id, `hero(${mood}) でエラー: ${e.message}`); }
  }

  let nChoices = 0, nEvents = 0, nEnds = 0;
  const reach = new Set([m.start]);
  const edges = {};
  for (const [pid, p] of Object.entries(places)) {
    const W = `${pid}`;
    edges[pid] = [];
    if (!SCENES[p.scene]) err(id, `${W}: scene「${p.scene}」が SCENES にない`);
    else {
      try {
        const sc = SCENES[p.scene]({ v: { content: "お茶" }, flags: {}, cond: 100, fill: 1 });
        if (/undefined|NaN/.test(sc.bg)) err(id, `${W}: scene「${p.scene}」の絵に undefined / NaN`);
      } catch (e) { err(id, `${W}: scene「${p.scene}」でエラー: ${e.message}`); }
    }
    if (p.label === undefined) err(id, `${W}: label がない`);
    if (!Array.isArray(p.stay) || p.stay.length !== 2 || !(p.stay[0] <= p.stay[1])) err(id, `${W}: stay は [短い, 長い]`);
    if (!Array.isArray(p.n) || p.n.length !== 2 || p.n[0] > p.n[1]) err(id, `${W}: n は [少ない, 多い]`);
    const kinds = [p.next ? "next" : null, p.end ? "end" : null, p.rebirth ? "rebirth" : null].filter(Boolean);
    if (kinds.length !== 1) err(id, `${W}: next / end / rebirth のどれか1つだけを書く（今: ${kinds.join(",") || "なし"}）`);
    (p.events || []).forEach((e, i) => {
      nEvents++;
      if (!e.t) err(id, `${W}: events[${i}] に t がない`);
      if (e.m && !MOODS.includes(e.m)) err(id, `${W}: events[${i}] の m「${e.m}」`);
    });
    if (p.n && p.n[1] > 0 && !(p.events || []).length) err(id, `${W}: n が 1 以上なのに events がない`);
    (p.next || []).forEach((n, i) => {
      if (!places[n.to]) err(id, `${W}: next[${i}] の行き先「${n.to}」がない`);
      else edges[pid].push(n.to);
    });
    (p.choices || []).forEach((ch, i) => {
      nChoices++;
      if (!ch.q) err(id, `${W}: choices[${i}] に q がない`);
      if (!Array.isArray(ch.a) || ch.a.length < 2 || ch.a.length > 3) err(id, `${W}: choices[${i}] の a は2〜3個`);
      (ch.a || []).forEach((a, j) => {
        if (!a.l) err(id, `${W}: choices[${i}].a[${j}] に l がない`);
        checkOption(id, `${W}: choices[${i}].a[${j}]`, a, places);
        [a, a.ok, a.ng].forEach((r) => { if (r && r.go && places[r.go]) edges[pid].push(r.go); });
      });
    });
    if (p.choice) err(id, `${W}: choice ではなく choices（配列）で書く`);
    if (p.escape) {
      if (!p.end) err(id, `${W}: escape は end のある場所にだけ書く`);
      nChoices++;
      (p.escape.a || []).forEach((a, j) => {
        checkOption(id, `${W}: escape.a[${j}]`, a, places);
        [a, a.ok, a.ng].forEach((r) => { if (r && r.go && places[r.go]) edges[pid].push(r.go); });
      });
    }
    if (p.end) {
      nEnds++;
      for (const k of ["key", "title", "t", "short"]) if (!p.end[k]) err(id, `${W}: end に ${k} がない`);
    }
    if (p.rebirth) {
      if (!p.rebirth.end || !m.ends || !m.ends[p.rebirth.end]) err(id, `${W}: rebirth.end「${p.rebirth && p.rebirth.end}」が ends にない`);
      if (!m.onRebirth) warn(id, `${W}: rebirth があるのに onRebirth がない（生まれ変わり時の準備）`);
      edges[pid].push(m.start);
    }
  }
  if (m.ends) for (const [k, e] of Object.entries(m.ends)) { nEnds++; if (e.scene && !SCENES[e.scene]) err(id, `ends.${k}: scene「${e.scene}」がない`); }

  // たどり着けない場所
  const queue = [m.start];
  while (queue.length) { const q = queue.shift(); for (const to of edges[q] || []) if (!reach.has(to)) { reach.add(to); queue.push(to); } }
  if (m.force && m.forceTo && !reach.has(m.forceTo)) reach.add(m.forceTo);
  for (const pid of Object.keys(places)) if (!reach.has(pid)) warn(id, `場所「${pid}」には、どこからも行けない`);

  // 文章の {名前}
  const words = new Set();
  for (const t of textsOf(places)) for (const mm of t.matchAll(/\{(\w+)\}/g)) words.add(mm[1]);
  const initSrc = String(m.init || "") + Object.values(places).map((p) => String(p.init || "")).join("");
  for (const w of words) if (!KNOWN_WORDS.has(w) && !initSrc.includes(`v.${w}`)) warn(id, `文章の {${w}} が、どこでも決められていない`);

  // 量の目安
  if (nEvents < 40) warn(id, `出来事が ${nEvents} 個（目安 40 以上）`);
  if (nChoices < 18) warn(id, `質問が ${nChoices} 個（目安 18 以上）`);
  if (nEnds < 6) warn(id, `結末が ${nEnds} 種類（目安 6 以上）`);
  console.log(`${id.padEnd(14)} ${m.name.padEnd(10)} 場所 ${String(Object.keys(places).length).padStart(2)} / 出来事 ${String(nEvents).padStart(3)} / 質問 ${String(nChoices).padStart(2)} / 結末 ${nEnds}`);
}

function report() {
  if (warns.length) { console.log(`\n⚠ 注意 ${warns.length}件`); warns.forEach((w) => console.log("  " + w)); }
  if (errors.length) { console.log(`\n✖ エラー ${errors.length}件`); errors.forEach((e) => console.log("  " + e)); }
  else console.log("\n✔ 静的チェックOK");
}

if (STATIC_ONLY || errors.length) { report(); process.exit(errors.length ? 1 : 0); }

// ---------------- シミュレーション ----------------
(async () => {
  let chromium;
  try { ({ chromium } = require("playwright")); } catch (e) { console.log("playwright がないのでシミュレーションは省略"); report(); return; }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  // 指定したモノだけを読み込む一時ページを作る
  const tmpName = `.tmp-validate-${process.pid}.html`;
  const tmpPath = path.join(ROOT, tmpName);
  const tags = scripts.map((f) => `<script src="${f}"></script>`).join("\n");
  fs.writeFileSync(tmpPath, html.replace(/(<script src="[^"]+"><\/script>\s*)+/, tags + "\n"));
  const relevant = (msg) => !only.length || [...mine, "core.js", tmpName].some((f) => msg.includes(f)) || !/\.js/.test(msg);
  page.removeAllListeners("pageerror");
  page.on("pageerror", (e) => { const msg = (e.stack || e.message); if (relevant(msg)) pageErrors.push(e.message); });
  await page.goto("file://" + tmpPath);
  fs.unlinkSync(tmpPath);
  console.log(`\nシミュレーション（1種類につき ${LIVES} 回）`);
  for (const id of targetIds) {
    const r = await page.evaluate(async ({ id, LIVES }) => {
      const out = { stuck: 0, dupQ: 0, broken: [], ends: {}, lens: [], qs: 0 };
      for (let i = 0; i < LIVES; i++) {
        document.querySelector("#title").hidden = false;
        document.querySelector("#life").hidden = true;
        document.querySelector(`[data-pick="${id}"]`).click();
        document.getElementById("liveBtn").click();
        document.querySelector('[data-speed="0"]').click();
        const seen = []; let steps = 0;
        while (document.getElementById("endCard").hidden && steps < 2000) {
          const box = document.getElementById("choiceBox");
          if (!box.hidden) {
            const q = document.getElementById("choiceQ").textContent;
            if (seen.includes(q)) out.dupQ++;
            seen.push(q);
            const bs = box.querySelectorAll("button");
            bs[Math.floor(Math.random() * bs.length)].click();
          } else document.getElementById("nextBtn").click();
          steps++;
        }
        if (steps >= 2000) out.stuck++;
        out.qs += seen.length;
        const all = document.getElementById("life").innerText;
        const bad = all.match(/[^\n]*(\{\w+\}|undefined|NaN|\[object)[^\n]*/);
        if (bad && out.broken.length < 5) out.broken.push(bad[0].slice(0, 80));
        const t = document.getElementById("endTitle").textContent.replace("🏷 ", "");
        out.ends[t] = (out.ends[t] || 0) + 1;
        out.lens.push(document.getElementById("endGrid").innerText.split("\n")[1]);
      }
      return out;
    }, { id, LIVES });
    const name = MONOS[id].name;
    console.log(`${id.padEnd(14)} ${name.padEnd(10)} 止まり ${r.stuck} / 質問の重複 ${r.dupQ} / 平均質問 ${(r.qs / LIVES).toFixed(1)} / 結末 ${Object.keys(r.ends).length}種`);
    console.log(`   結末: ${Object.entries(r.ends).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join("、")}`);
    console.log(`   一生の長さの例: ${r.lens.slice(0, 6).join(" / ")}`);
    if (r.stuck) err(id, `${r.stuck}回、一生が終わらなかった`);
    if (r.dupQ) err(id, `同じ質問が ${r.dupQ} 回出た`);
    r.broken.forEach((b) => err(id, `文章がこわれている: ${b}`));
  }
  pageErrors.slice(0, 10).forEach((e) => err("page", "画面のエラー: " + e));
  await browser.close();
  report();
  process.exit(errors.length ? 1 : 0);
})();
