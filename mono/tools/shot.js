// モノに生まれたら：イラストの確認用スクリーンショット
//
//   node tools/shot.js <id> [出力先.png]
//
// そのモノの「すべての場所」のイラストに、主人公（いろいろな顔）を置いて、1枚の画像に並べる。
// 絵がはみ出していないか、主人公が隠れていないか、を目で確かめるために使う。
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const id = process.argv[2];
const out = process.argv[3] || path.join(require("os").tmpdir(), `shot-${id}.png`);
if (!id) { console.log("使い方: node tools/shot.js <id> [出力先.png]"); process.exit(1); }

const artFiles = fs.readdirSync(path.join(ROOT, "things")).filter((f) => /^_art_.*\.js$/.test(f)).sort().map((f) => "things/" + f);
const scripts = ["core.js", ...artFiles, `things/${id}.js`];
const tmp = path.join(ROOT, `.tmp-shot-${process.pid}.html`);
fs.writeFileSync(tmp, `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{margin:0;background:#eee;font-family:sans-serif}.g{display:grid;grid-template-columns:repeat(3,360px);gap:8px;padding:8px}
.c{background:#fff}.c svg{display:block;width:360px;height:200px}.c p{margin:0;padding:4px 6px;font-size:12px}</style></head><body>
<div class="g" id="g"></div>
${scripts.map((f) => `<script src="${f}"></script>`).join("\n")}
<script>
const m = MONOS[${JSON.stringify(id)}];
const moods = ["happy", "neutral", "sad", "surprise", "sleep"];
const c = { t: 0, gen: 1, owners: 1, km: 0, cond: 100, fill: 1, v: { pref: "東京都", owner: "会社員" }, used: {}, usedQ: {}, flags: {}, startYear: 2026 };
if (m.init) m.init(c);
const list = Object.entries(m.places).map(([pid, p]) => [pid, p.scene]);
Object.entries(m.ends || {}).forEach(([k, e]) => e.scene && list.push(["ends." + k, e.scene]));
// 主人公だけの見本（5つの顔）
let html = '<div class="c"><svg viewBox="0 0 360 200"><rect width="360" height="200" fill="#fff"/>' +
  moods.map((md, i) => '<g transform="translate(' + (40 + i * 70) + ',100) scale(.55)">' + m.hero(c, md) + "</g>").join("") + "</svg><p>主人公（5つの顔）</p></div>";
list.forEach(([pid, sid], i) => {
  const sc = (SCENES[sid] || SCENES.plain)(c);
  const md = moods[i % moods.length];
  html += '<div class="c"><svg viewBox="0 0 360 200">' + sc.bg + '<g transform="translate(' + sc.x + "," + sc.y + ") rotate(" + (sc.r || 0) + ") scale(" + sc.s + ')">' + m.hero(c, md) + "</g></svg><p>" + pid + " / " + sid + (SCENES[sid] ? "" : "（シーンがない！）") + "</p></div>";
});
document.getElementById("g").innerHTML = html;
</script></body></html>`);

(async () => {
  const { chromium } = require("playwright");
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1100, height: 800 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto("file://" + tmp);
  await p.screenshot({ path: out, fullPage: true });
  fs.unlinkSync(tmp);
  await b.close();
  if (errs.length) console.log("エラー:", errs.join(" / "));
  console.log("保存しました:", out);
})();
