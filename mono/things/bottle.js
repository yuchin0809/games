// ペットボトル
"use strict";

// BOTTLE_COLORS（中身ごとの色）は core.js にある

function bottleHero(c, mood) {
  const color = BOTTLE_COLORS[c.v.content] || "#8ecbf0";
  const f = Math.max(0, Math.min(1, c.fill));
  const h = 84 * f;
  return `<rect x="-9" y="-62" width="18" height="10" rx="3" fill="${color}"/>
    <path d="M-8 -52 h16 l6 10 h-28z" fill="#e8f5fd" stroke="#8fb3cc" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="-22" y="-44" width="44" height="96" rx="15" fill="#e8f5fd" stroke="#8fb3cc" stroke-width="2.5"/>
    ${h > 1 ? `<rect x="-19" y="${(49 - h).toFixed(1)}" width="38" height="${h.toFixed(1)}" rx="11" fill="${color}" opacity=".45"/>` : ""}
    <rect x="-22" y="-10" width="44" height="30" fill="#ffffff" stroke="#8fb3cc" stroke-width="2"/>
    <rect x="-22" y="-10" width="44" height="5" fill="${color}"/>
    <rect x="-22" y="15" width="44" height="5" fill="${color}"/>
    <path d="M-14 -38 v20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
    <g transform="translate(0,6) scale(.72)">${face(mood)}</g>`;
}

MONOS.bottle = {
  group: "容器",
  sources: [
    { n: "PETボトルリサイクル推進協議会（販売本数・回収率・再生の用途・輸出先）", u: "https://www.petbottle-rec.gr.jp/data/calculate.html" },
    { n: "PETボトル用樹脂の用途別需要", u: "https://www.petbottle-rec.gr.jp/data/demand_trend.html" },
    { n: "環境省「漂着ごみ対策総合検討業務」", u: "https://www.env.go.jp/content/900543449.pdf" }
  ],
  onRebirth(c) { MONOS.bottle.newContent(c); },
  name: "ペットボトル", hero: bottleHero, time: "day", condLabel: "きれい度",
  odds: "287億",
  oddsText: "日本で1年間に売られるペットボトルは、約287億本。あなたはその中の1本です。",
  oddsFact: "PETボトルリサイクル推進協議会",
  owners: ["部活帰りの高校生", "会社員", "登山中のおじいさん", "塾帰りの小学生", "ランニング中のお姉さん", "旅行中の家族", "トラックの運転手さん", "大学生", "野球の観客", "保育園のお母さん"],
  init(c) {
    MONOS.bottle.newContent(c);
    c.v.pref = pick(PREFS);
    c.startYear = 2026;
  },
  newContent(c) {
    // PETボトル用樹脂の用途別需要（2024年）の割合にもとづく。清涼飲料の中の内訳は演出
    const it = wpick([
      { k: "お茶", w: 27, kind: "drink" }, { k: "水", w: 18, kind: "drink" }, { k: "炭酸飲料", w: 15, kind: "drink" },
      { k: "スポーツドリンク", w: 12, kind: "drink" }, { k: "コーヒー", w: 8, kind: "drink" }, { k: "ジュース", w: 9, kind: "drink" },
      { k: "しょうゆ", w: 4.9, kind: "soy" }, { k: "シャンプー", w: 1.7, kind: "bath" }, { k: "化粧水", w: 1.6, kind: "bath" }, { k: "お酒", w: 1.1, kind: "drink" }
    ]);
    c.v.content = it.k; c.kind = it.kind; c.fill = 1;
  },
  year: (c) => c.startYear + Math.floor(c.t / 365),
  ageLabel: (c) => `${Math.floor(c.t) + 1}日目`,
  meta: (c) => `${MONOS.bottle.year(c)}年 · ${c.gen > 1 ? c.gen + "代目の" : ""}${c.v.content}のペットボトル`,
  birthText: (c) => `${c.gen > 1 ? "" : ""}${c.v.pref}のボトル工場で、${c.v.content}のペットボトルとして生まれた。`,
  start: "factory",
  aging: 0,
  places: {
    factory: {
      scene: "bottle_factory", label: (c) => `${c.v.pref}のボトル工場`, stay: [0.5, 2], n: [2, 3],
      events: [
        { t: "試験管みたいな形の「プリフォーム」が、熱い空気でふくらまされて、ボトルの形になった。", f: "PETボトルリサイクル推進協議会", m: "surprise" },
        { t: "{content}がたっぷり注がれて、キャップがきゅっとしまった。", m: "happy" },
        { t: "2004年のボトルより、28%も軽い体で生まれた。", f: "PETボトルリサイクル推進協議会", m: "happy" },
        { t: "前の人生の記憶はない。でも、なんだか懐かしい気がする。", c: (c) => c.gen > 1, m: "neutral", w: 6 }
      ],
      choices: [
        { q: "{content}を注ぐ機械が近づいてきた！", a: [
          { l: "なみなみ入れてほしい", t: "ふちぎりぎりまで、たっぷり入った…気がする。", m: "happy" },
          { l: "ちょっと少なめでいい", t: "機械はとても正確だった。いつもどおりの量が入った。", m: "neutral" }
        ] },
        { q: "検査のカメラが、ボトルをチェックしている。", a: [
          { l: "かっこいいポーズをとる", t: "合格！ ラベルがまっすぐ、きれいに貼られた。", m: "happy" },
          { l: "ちょっと傾いてみる", p: 0.3, ok: { t: "ラベルが少し曲がって貼られた。でも、それも個性だ。", m: "surprise", e: { cond: -2 } }, ng: { t: "機械にまっすぐに直された。", m: "neutral" } }
        ] }
      ],
      next: [{ to: "truck", w: 1, t: "段ボールに詰められて、トラックに積まれた。", e: { km: [20, 300] } }]
    },
    truck: {
      scene: "truck", label: () => "トラックの荷台", stay: [0.5, 3], n: [1, 2],
      events: [
        { t: "高速道路を走って、{pref2}へ。", m: "happy", e: { km: [40, 800] } },
        { t: "サービスエリアで、運転手さんがひと休み。", m: "sleep" },
        { t: "カーブのたびに、仲間とぶつかり合った。", m: "surprise", e: { cond: -3 } }
      ],
      choices: [
        { q: "トラックの荷台。どんな場所で売られたい？", c: (c) => c.kind === "drink", a: [
          { l: "にぎやかな駅前のコンビニ", t: "「駅前に行きたい！」と、段ボールの中で願った。", b: { shelf: 3 } },
          { l: "山の上の、ぽつんとした自販機", t: "トラックは山道をのぼっていった。", b: { vending: 4 }, e: { km: [30, 150] } }
        ] },
        { q: "段ボールの中で、となりのボトルが話しかけてきた。", a: [
          { l: "前の人生の話を聞く", t: "「ぼくは前、服だったんだ」と言われた。そんなこともあるのか。", m: "surprise" },
          { l: "ゆれに身をまかせて眠る", t: "ゴトゴトというゆれが、子守唄みたいだった。", m: "sleep" }
        ] }
      ],
      next: [
        { to: "shelf", w: (c) => (c.kind === "drink" ? 5 : 0), t: "コンビニの冷蔵ケースへ。" },
        { to: "vending", w: (c) => (c.kind === "drink" ? 3 : 0), t: "自販機の中へ。" },
        { to: "super", w: (c) => (c.kind === "drink" ? 1.5 : 10), t: "スーパーの棚へ。" }
      ]
    },
    shelf: {
      scene: "shelf", label: () => "コンビニの冷蔵ケース", stay: [1, 20], n: [1, 2],
      events: [
        { t: "となりには、同じ顔の仲間がずらり。", m: "happy" },
        { t: "店員さんに、前へ前へと並べ直された。", m: "neutral" },
        { t: "何人もが手に取って、また戻した。", m: "sad" },
        { t: "ひんやりして、気持ちがいい。", m: "happy" }
      ],
      choices: [
        { q: "お客さんが、冷蔵ケースの前で迷っている。", a: [
          { l: "ラベルをお客さんに向ける", t: "目が合った！ 手が伸びてきた。", m: "happy" },
          { l: "いちばん奥にかくれる", t: "毎朝の前出しで、少しずつ前に出されていった。", extend: 2, m: "neutral" }
        ] },
        { q: "深夜のコンビニ。外は大雨だ。", a: [
          { l: "雨宿りのお客さんを待つ", t: "ずぶぬれの大学生が入ってきて、まっすぐこっちを見た。", m: "happy" },
          { l: "静かな夜を楽しむ", t: "店内の音楽が、何周もくり返された。", extend: 1, m: "sleep" }
        ] }
      ],
      next: [{ to: "owner", w: 1, t: "{owner}に選ばれた！", e: { owner: true }, m: "happy" }]
    },
    vending: {
      scene: "vending", label: () => "自販機の中", stay: [1, 15], n: [1, 2],
      events: [
        { t: "自販機の中で、きんきんに冷やされた。", m: "happy" },
        { t: "ガコン、と落ちる順番を、じっと待っている。", m: "neutral" },
        { t: "夜になると、自販機の明かりに虫が集まってきた。", m: "neutral" }
      ],
      choices: [
        { q: "自販機の中。外は真夏の炎天下だ。", a: [
          { l: "一番に買われたい", t: "汗だくの人が、迷わずこっちのボタンを押した！", m: "happy" },
          { l: "もう少し冷えてから", t: "後ろの列で、きんきんになるまで待った。", extend: 1, m: "sleep" }
        ] }
      ],
      next: [{ to: "owner", w: 1, t: "ガコン！ {owner}が買ってくれた。", e: { owner: true }, m: "surprise" }]
    },
    super: {
      scene: "super", label: () => "スーパーの棚", stay: [2, 30], n: [1, 2],
      events: [
        { t: "特売のシールを貼られた。", m: "neutral" },
        { t: "カートにぶつかられて、ちょっとへこんだ。", m: "surprise", e: { cond: -5 } }
      ],
      next: [
        { to: "owner", w: (c) => (c.kind === "drink" ? 1 : 0), t: "{owner}のかごに入った。", e: { owner: true } },
        { to: "kitchen", w: (c) => (c.kind === "soy" ? 1 : 0), t: "{owner}のかごに入って、家へ。", e: { owner: true } },
        { to: "bathroom", w: (c) => (c.kind === "bath" ? 1 : 0), t: "{owner}のかごに入って、家へ。", e: { owner: true } }
      ]
    },
    owner: {
      scene: "hand", label: (c) => `${c.v.owner}の手の中`, stay: [0.1, 3], n: [2, 3],
      choices: [
        { q: "中身を飲み終わったら、どうしてほしい？", a: [
          { l: "ちゃんと回収ボックスへ", b: { bin: 1.6, sort: 1.6 }, t: "「最後まで、ちゃんとしてね」と心の中で言った。" },
          { l: "もっと世界を見てみたい", b: { bench: 4, litter: 4 }, t: "「まだ旅を終わりたくない」と、心の中で言った。" }
        ] },
        { q: "{owner}が、キャップを開けようとしている。", a: [
          { l: "かたく閉まってみる", t: "{owner}は顔を真っ赤にして、ようやく開けた。", m: "surprise" },
          { l: "すっと開いてあげる", t: "プシュッ。気持ちのいい音がした。", m: "happy" }
        ] },
        { q: "{owner}が、きみを持ったまま走り出した！", a: [
          { l: "しっかりつかまる", t: "ゴールまで、一緒に走りきった！", e: { km: [1, 10] }, m: "happy" },
          { l: "手からすべり落ちる", t: "手からすべって、道に転がった！", go: "litter", m: "surprise" }
        ] },
        { q: "{owner}の友だちが「ひと口ちょうだい」と言っている。", a: [
          { l: "ひと口わけてあげる", t: "友だちは「ありがとう」と笑った。", e: { fill: -0.3 }, m: "happy" },
          { l: "ぜんぶ{owner}に飲まれたい", t: "{owner}は「ごめん、最後の一口なんだ」と言った。", m: "neutral" }
        ] },
        { q: "{owner}が、きみをカバンに入れようとしている。", a: [
          { l: "カバンの中で旅をする", t: "カバンに入って、{owner}と一緒に遠くへ出かけた。", go: "trip", m: "happy" },
          { l: "机の上で待つ", t: "机の上で、{owner}の帰りを待った。", extend: 1, m: "neutral" }
        ] },
        { q: "冷凍庫のドアが開いた。", a: [
          { l: "凍らせてもらう！", t: "カチカチに凍って、次の日の部活で大活躍した。", e: { cond: -3 }, m: "surprise" },
          { l: "冷蔵庫くらいがいい", t: "ほどよく冷えて、いちばんおいしい温度になった。", m: "happy" }
        ] }
      ],
      events: [
        { t: "{owner}が、ごくごくと一気に半分飲んだ。", m: "surprise", e: { fill: -0.5 } },
        { t: "部活の休けい時間、みんなで回し飲みされた。", m: "happy", e: { fill: -0.4 } },
        { t: "カバンの中で、教科書の下じきになった。", m: "sad", e: { cond: -6 } },
        { t: "冷凍庫で凍らされて、カチカチになった！", m: "surprise", e: { cond: -3 } },
        { t: "{owner}と一緒に、{outing}へお出かけ。", m: "happy", e: { km: [3, 120] } },
        { t: "飲み終わったあと、水を入れて何日か使ってもらえた。", m: "happy", e: { fill: -1 } },
        { t: "キャップをなくされた。すーすーする。", m: "sad" }
      ],
      next: [
        { to: "bin", w: 45, t: "飲み終わって、自販機の横の回収ボックスへ。", e: { fill: -1 } },
        { to: "sort", w: 47, t: "家に持ち帰られて、ラベルをはがされ、つぶされて、資源ごみの日に出された。", e: { fill: -1, cond: -8 } },
        { to: "burn", w: 4, t: "燃えるゴミの袋に入れられてしまった。", e: { fill: -1 } },
        { to: "bench", w: 2, t: "公園のベンチに、置きざりにされた。" },
        { to: "litter", w: 2, t: "道ばたに、ポイ捨てされた。", e: { fill: -1 } }
      ]
    },
    kitchen: {
      scene: "kitchen", label: (c) => `${c.v.owner}の家のキッチン`, stay: [30, 120], n: [2, 3],
      events: [
        { t: "冷蔵庫のドアポケットが、定位置になった。", m: "happy" },
        { t: "卵かけご飯のたびに、出番がくる。", m: "happy", e: { fill: -0.3 } },
        { t: "お刺身の日は、大活躍だった。", m: "happy", e: { fill: -0.3 } },
        { t: "最後の数滴を出そうと、逆さにして振られた。", m: "surprise", e: { fill: -1 } }
      ],
      choices: [
        { q: "冷蔵庫のドアポケット。となりはマヨネーズだ。", a: [
          { l: "毎日たくさん使われたい", t: "卵かけご飯の朝が、毎日続いた。", e: { fill: -0.4 }, m: "happy" },
          { l: "ゆっくり大事に使われたい", t: "しょうゆは、少しずつ少しずつ減っていった。", extend: 2, m: "sleep" }
        ] }
      ],
      next: [
        { to: "sort", w: 8, t: "中を洗われて、資源ごみの日に出された。" },
        { to: "burn", w: 2, t: "燃えるゴミに出されてしまった。" }
      ]
    },
    bathroom: {
      scene: "bath", label: (c) => `${c.v.owner}の家のお風呂場`, stay: [40, 150], n: [2, 2],
      events: [
        { t: "毎晩、湯気の中で出番がくる。", m: "happy", e: { fill: -0.4 } },
        { t: "最後は、水を入れてシャカシャカ振られ、使い切られた。", m: "surprise", e: { fill: -1 } }
      ],
      choices: [
        { q: "お風呂場の棚。となりに、新しいボトルが置かれた。", a: [
          { l: "まだまだ使ってほしい", t: "{owner}は「こっちを先に使い切ろう」と言ってくれた。", extend: 1, m: "happy" },
          { l: "新しい子にゆずる", t: "棚の奥へ、そっと下がった。", m: "neutral" }
        ] }
      ],
      next: [
        { to: "plastic", w: 1, t: "プラスチック資源ごみの日に出された。" },
        { to: "burn", w: 1, t: "燃えるゴミに出された。" }
      ]
    },
    bin: {
      scene: "bin", label: () => "ペットボトル回収ボックス", stay: [0.5, 5], n: [1, 1],
      events: [
        { t: "仲間でぎゅうぎゅうの回収ボックス。日本では、ペットボトルの91.9%が回収されている。", f: "PETボトルリサイクル推進協議会", m: "happy" }
      ],
      choices: [
        { q: "回収ボックスの入り口。キャップとラベルがついたままだ。", a: [
          { l: "外してほしいと願う", t: "通りがかった人が、キャップとラベルを外してくれた。体が軽い！", e: { cond: 5 }, m: "happy" },
          { l: "そのまま飛びこむ", t: "仲間の上に、ぽすっと着地した。", m: "neutral" }
        ] }
      ],
      next: [{ to: "plant", w: 1, t: "回収のトラックにゆられて、リサイクル工場へ。", e: { km: [10, 150] } }]
    },
    sort: {
      scene: "bin", label: () => "資源ごみの集積所", stay: [0.5, 4], n: [1, 1],
      events: [{ t: "収集車がやって来た。", m: "happy" }],
      next: [{ to: "plant", w: 1, t: "リサイクル工場へ運ばれた。", e: { km: [10, 150] } }]
    },
    plant: {
      scene: "recycle_plant", label: () => "リサイクル工場", stay: [3, 30], n: [2, 2],
      events: [
        { t: "細かく砕かれて、「フレーク」というかけらになった。", m: "surprise", e: { cond: -20 } },
        { t: "よく洗われて、高温で汚れを飛ばされた。", m: "surprise", e: { cond: 30 } }
      ],
      choices: [
        { q: "リサイクル工場。次は、何に生まれ変わりたい？", a: [
          { l: "またペットボトルに！", t: "「もう一度ボトルに！」と、フレークの中で願った。", b: { reborn: 2 } },
          { l: "服になってみたい", t: "「服になって、だれかを温めたい」と願った。", b: { fiber: 4 } },
          { l: "海外へ行ってみたい", t: "「海の向こうを見てみたい」と願った。", b: { ship: 2.5 } }
        ] },
        { q: "フレークになって、ベルトコンベアの上。", a: [
          { l: "仲間とはぐれないようにする", t: "ぎゅっと固まって、同じ機械へ流れていった。", m: "happy" },
          { l: "ちがう機械のほうへ転がる", t: "となりのラインへ、ころんと落ちた！", b: { egg: 2, molded: 2 }, m: "surprise" }
        ] }
      ],
      // 再生PET樹脂の用途（2024年度）と、国内・海外の再資源化量の割合にもとづく
      next: [
        { to: "reborn", w: 46, t: "そして、またペットボトルに生まれ変わることになった！（ボトルtoボトル）", f: "PETボトルリサイクル推進協議会", m: "happy" },
        { to: "egg", w: 20.4, t: "卵パックなどの、透明な容器になることになった。", f: "PETボトルリサイクル推進協議会" },
        { to: "fiber", w: 6.2, t: "糸にされて、服になることになった。ペットボトルが服になるのは、約13本に1本。", f: "PETボトルリサイクル推進協議会", m: "surprise" },
        { to: "molded", w: 5.4, t: "形を変えて、植木鉢や文房具になることになった。", f: "PETボトルリサイクル推進協議会" },
        { to: "ship", w: 19.8, t: "フレークのまま、海外の工場へ輸出されることになった。", f: "PETボトルリサイクル推進協議会", m: "surprise" }
      ]
    },
    reborn: {
      scene: "recycle_plant", label: () => "リサイクル工場", stay: [5, 20], n: [0, 0],
      rebirth: { max: 8, t: "新しいペットボトルとして、もう一度生まれた！ ボトルtoボトルは、何度でもくり返せる。", f: "PETボトルリサイクル推進協議会", end: "manytimes" }
    },
    bench: {
      scene: "bench", label: () => "夕方の公園のベンチ", stay: [1, 7], n: [1, 2],
      events: [
        { t: "半分残ったまま、置いていかれた。", m: "sad" },
        { t: "夜の公園。カラスがじっとこっちを見ている。", m: "surprise" },
        { t: "雨が降ってきた。", m: "sad", e: { cond: -4 } }
      ],
      choices: [
        { q: "夜の公園。カラスが近づいてきた。", a: [
          { l: "にらみ返す", t: "カラスはあきれて、飛んでいった。", m: "neutral" },
          { l: "転がってにげる", t: "ベンチから転がり落ちて、植え込みの中へ。", go: "litter", m: "surprise" }
        ] },
        { q: "朝の公園。犬の散歩の人が近づいてくる。", a: [
          { l: "気づいてもらう", p: 0.6, ok: { t: "「誰か置いていったのね」と、回収ボックスに入れてくれた。", go: "bin", m: "happy" }, ng: { t: "犬にくんくんかがれただけだった。", m: "sad" } },
          { l: "ベンチの上で日なたぼっこ", t: "ぽかぽかして気持ちいい。", extend: 1, m: "sleep" }
        ] }
      ],
      next: [
        { to: "bin", w: 2, t: "掃除のおじさんが、回収ボックスに入れてくれた。", m: "happy" },
        { to: "litter", w: 1, t: "風に吹かれて、植え込みへ転がった。", m: "surprise" }
      ]
    },
    litter: {
      scene: "street", label: () => "道ばたの植え込み", stay: [3, 60], n: [1, 2],
      events: [
        { t: "植え込みの中で、ほこりをかぶった。", m: "sad", e: { cond: -10 } },
        { t: "大雨の日、側溝に流された。", m: "surprise" }
      ],
      choices: [
        { q: "大雨だ。側溝に、水がごうごうと流れこんでいる。", a: [
          { l: "流れに乗る", t: "ざぶん！ 流れに乗って、どんどん進んでいく。", b: { sea: 3 }, m: "surprise" },
          { l: "草にしがみつく", t: "なんとか踏みとどまった。", b: { bin: 3 }, m: "neutral" }
        ] }
      ],
      next: [
        { to: "sea", w: 2, t: "川に流れ込んで、そのまま下っていった。", e: { km: [5, 60] }, m: "surprise" },
        { to: "bin", w: 1, t: "地域のゴミ拾いボランティアに拾われた。", m: "happy" }
      ]
    },
    sea: {
      scene: "sea", label: () => "海の上", stay: [30, 600], n: [2, 3],
      events: [
        { t: "ついに海へ出た。波にゆられて、どこまでも。", m: "surprise", e: { km: [100, 2000] } },
        { t: "海鳥が、ひと休みしていった。", m: "neutral" },
        { t: "日本の海岸に流れ着くごみの中で、ペットボトルは個数で6.9%。キャップは17.6%で一番多い。", f: "環境省", m: "sad" },
        { t: "強い日差しで、体がだんだん白っぽくなってきた。", m: "sad", e: { cond: -15 } }
      ],
      choices: [
        { q: "海の上。遠くに、島が見える。", a: [
          { l: "島をめざす", t: "波に背中を押されて、島のほうへ。", b: { beach: 3 }, m: "happy" },
          { l: "もっと遠くの海へ", t: "島を通りすぎて、外の海へ。", b: { drift: 3 }, e: { km: [300, 2000] }, m: "surprise" }
        ] },
        { q: "海鳥が、背中にとまった。", a: [
          { l: "一緒に旅をする", t: "海鳥と一緒に、夕日の海をただよった。", extend: 1, e: { km: [50, 300] }, m: "happy" },
          { l: "くるっと回って落とす", t: "海鳥はびっくりして、飛んでいった。", m: "surprise" }
        ] }
      ],
      next: [
        { to: "beach", w: 2, t: "{beach}の浜に、流れ着いた。", e: { km: [100, 1500] } },
        { to: "drift", w: 1, t: "流れに乗って、さらに遠くへ。", e: { km: [500, 5000] } }
      ]
    },
    beach: {
      scene: "beach", label: () => "浜辺", stay: [5, 120], n: [1, 2],
      events: [
        { t: "浜には、外国の言葉のラベルのボトルもたくさん。対馬の浜では、半分以上が韓国語のラベルだという。", f: "環境省", m: "surprise" },
        { t: "カニが、中をのぞいていった。", m: "surprise" }
      ],
      choices: [
        { q: "浜辺。海岸清掃の人たちが近づいてくる。", a: [
          { l: "見つけてもらう", t: "「あ、ここにも！」 トングでつかまれた。", b: { bin: 3 }, m: "happy" },
          { l: "砂の中にかくれる", t: "砂をかぶって、見つからなかった。", b: { sand: 3 }, m: "sleep" }
        ] }
      ],
      next: [
        { to: "bin", w: 2, t: "海岸清掃の人たちに拾われた！", m: "happy" },
        { to: "sand", w: 1, t: "砂に少しずつ、うもれていった。" }
      ]
    },
    ship: {
      scene: "ship", label: () => "コンテナ船の上", stay: [10, 30], n: [1, 1],
      init: (c) => {
        // 2026年7月の輸出先の割合にもとづく
        const d = wpick([{ k: "マレーシア", w: 27, km: 5300 }, { k: "台湾", w: 25, km: 2100 }, { k: "アメリカ", w: 15, km: 9000 }, { k: "ベトナム", w: 14, km: 3600 }, { k: "韓国", w: 12, km: 1000 }, { k: "インドネシア", w: 6, km: 5800 }]);
        c.v.country = d.k; c.km += d.km;
      },
      events: [{ t: "コンテナ船で、{country}へ。使用済みペットボトルの輸出先は、マレーシア・台湾・アメリカなど。", f: "PETボトルリサイクル推進協議会", m: "happy" }],
      end: { key: "export", title: "海を渡ったボトル", t: "{country}の工場で、新しい何かに生まれ変わった。", short: "{country}へ海を渡って、新しい何かに生まれ変わった", m: "happy" }
    },
    // --- 結末 ---
    egg: {
      scene: "eggpack", label: () => "スーパーの卵売り場", stay: [10, 40], n: [0, 0],
      escape: { q: "卵パックになって、卵を守っている。", a: [
        { l: "このまま卵を守る" },
        { l: "もう一度リサイクルされたい", p: 0.5, ok: { t: "卵を食べ終わった家の人が、スーパーの回収ボックスに入れてくれた！", go: "plant", dt: [5, 30], m: "happy" }, ng: { t: "燃えるゴミの日に出されてしまった。", go: "burn", m: "sad" } }
      ] },
      end: { key: "egg", title: "卵を守るもの", t: "卵パックに生まれ変わって、毎日6個の卵を守っている。", short: "卵パックに生まれ変わって、卵を守っている", m: "happy" }
    },
    fiber: {
      scene: "clothes", label: () => "服屋さんのハンガー", stay: [30, 200], n: [0, 0],
      escape: { q: "Tシャツになった。着なくなったら、どうなりたい？", a: [
        { l: "この服で一生を終える" },
        { l: "古着として旅に出る", p: 0.75, ok: { t: "着なくなったTシャツは、古着として海を渡った。", go: "usedclothes", dt: [200, 900], e: { km: [3000, 8000] }, m: "happy" }, ng: { t: "タンスの奥で、出番を待つことになった。", m: "sleep" } }
      ] },
      end: { key: "fiber", title: "服になったボトル", t: "青いTシャツに生まれ変わって、だれかと一緒に夏を過ごした。", short: "Tシャツに生まれ変わった（約13本に1本の確率）", m: "happy" }
    },
    usedclothes: {
      scene: "market", label: (c) => `${c.v.country2}の古着市場`, stay: [100, 900], n: [1, 2],
      init: (c) => { c.v.country2 = pick(["マレーシア", "フィリピン", "カンボジア", "パキスタン", "ケニア", "ガーナ"]); },
      events: [
        { t: "{country2}の市場で、色とりどりの古着と並んだ。", m: "happy" },
        { t: "日本語の書いてあるTシャツは、ちょっと人気らしい。", m: "surprise" }
      ],
      end: { key: "usedclothes", title: "世界を旅するTシャツ", t: "{country2}で新しい持ち主に出会い、また何年も着てもらえた。", short: "Tシャツになり、古着として海外で新しい持ち主に出会った", m: "happy" }
    },
    trip: {
      scene: "train", label: (c) => `${c.v.owner}のカバンの中`, stay: [0.2, 3], n: [2, 2],
      events: [
        { t: "電車にゆられて、{outing}へ。", m: "happy", e: { km: [10, 200] } },
        { t: "カバンの中で、お弁当やタオルと一緒になった。", m: "neutral" },
        { t: "カバンから取り出されて、きれいな景色と一緒に写真を撮られた。", m: "happy" }
      ],
      next: [{ to: "owner", w: 1, t: "{owner}が、カバンからきみを取り出した。" }]
    },
    molded: {
      scene: "recycle_plant", label: () => "文房具の工場", stay: [10, 60], n: [0, 0],
      end: { key: "molded", title: "形を変えたボトル", t: "文房具に生まれ変わって、どこかの学校の机の上にいる。", short: "文房具に生まれ変わった", m: "happy" }
    },
    plastic: {
      scene: "recycle_plant", label: () => "プラスチックのリサイクル工場", stay: [5, 30], n: [0, 0],
      end: { key: "plastic", title: "プラスチックの旅人", t: "ほかのプラスチックと一緒に、新しい製品の材料になった。", short: "プラスチック製品の材料になった", m: "neutral" }
    },
    burn: {
      scene: "fire", label: () => "清掃工場", stay: [1, 5], n: [0, 0],
      end: { key: "burn", title: "燃えたボトル", t: "清掃工場で燃やされた。その熱の一部は、電気に変わった。", short: "清掃工場で燃やされ、熱の一部は電気になった", m: "surprise" }
    },
    drift: {
      scene: "sea", label: () => "どこかの海", stay: [300, 3000], n: [0, 0],
      escape: { q: "広い広い海の上。陸はもう見えない。", a: [
        { l: "ただよい続ける" },
        { l: "どこかの浜にたどり着きたい", p: 0.6, ok: { t: "何年も海をただよったあと、ついに{beach}の浜に打ち上げられた。", go: "beach", dt: [200, 900], e: { km: [1000, 6000] }, m: "happy" }, ng: { t: "潮の流れは、ずっと沖のほうへ向かっていた。", m: "sleep" } }
      ] },
      end: { key: "drift", title: "海をただようボトル", t: "今もどこかの海を、ただよい続けている。", short: "今もどこかの海をただよい続けている", m: "sleep" }
    },
    sand: {
      scene: "beach", label: () => "浜辺の砂の中", stay: [100, 2000], n: [0, 0],
      escape: { q: "砂の中。上から、子どもたちの声がする。", a: [
        { l: "浜の一部になる" },
        { l: "掘り出してほしい", p: 0.5, ok: { t: "夏休みの子どもが、砂遊びで掘り出してくれた！", go: "bin", dt: [30, 300], m: "happy" }, ng: { t: "スコップは、すぐとなりを掘っていった。", m: "sad" } }
      ] },
      end: { key: "sand", title: "浜辺の住人", t: "砂にうもれて、浜辺の一部になった。", short: "浜辺の砂にうもれて、浜の一部になった", m: "sleep" }
    }
  },
  ends: { manytimes: { title: "生まれ変わりの達人", t: "何度も何度も生まれ変わって、ついに旅を終えた。", short: "何度もペットボトルに生まれ変わった", m: "happy", scene: "bottle_factory" } }
};
