import { build, icon, typed, esc, VO_OFFSET } from "./frame.mjs";

const durs = [9.4, 10.2, 9.4, 9.7, 8.9, 9.3, 11.4, 9.2, 8.4, 12.6];
const scenes = [];
const HD = `tl.fromTo($(".hd"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.2);`;
const HDCSS = `@R .hd { position:absolute; left:140px; top:96px; }`;
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E${extra} }, ${t});`;
const sp = (s) => esc(s).replace(/ /g, "&nbsp;");
const HOST = "anna@203.0.113.7";
const NDCSS = (top = 440) => `
@R .nd { top:${top}px; width:300px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--muted); }
@R .nd > .ic { width:72px; height:72px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); }
@R .n0 { left:140px; } @R .n1 { left:1480px; }
`;
const nodes = (a = "Ты", b = "Сервер") =>
  `<div class="card nd n0">${icon("laptop")}<span class="lb">${a}</span></div><div class="card nd n1">${icon("server")}<span class="lb">${b}</span></div>`;

// 01 HOOK
scenes.push({
  css: `${NDCSS(300)}
@R .wire .dash { stroke:#3a4842; stroke-dasharray:12 12; }
@R .wire .live { stroke:var(--green); stroke-width:4; }
@R .km { position:absolute; left:760px; top:330px; width:400px; text-align:center; color:var(--muted); }
@R .lk { position:absolute; left:930px; top:368px; width:60px; height:60px; border-radius:50%; background:var(--bg); display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .lk .ic { width:40px; height:40px; stroke-width:1.8; }
@R .q { position:absolute; left:0; right:0; top:640px; text-align:center; font-size:96px; }
@R .ssh { position:absolute; left:0; right:0; top:800px; text-align:center; font-size:84px; color:var(--green); }
`,
  html: `
<svg class="wire" viewBox="0 0 1920 1080"><path class="dash" d="M440 400 L1480 400"/><path class="live" pathLength="1" d="M440 400 L1480 400"/></svg>
${nodes("Ты", "Сервер")}
<div class="km mono">1000 км</div>
<div class="lk">${icon("lock")}</div>
<h1 class="hd q">Как управлять им <span class="g">издалека</span>?</h1>
<div class="ssh mono">ssh</div>`,
  js: `
tl.fromTo($(".n0"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, 0.2);
tl.fromTo($(".n1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(0.2));
tl.fromTo($(".dash"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, V(1.6));
tl.fromTo($(".km"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(2.0));
tl.fromTo($(".q"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(3.7));
draw(".live", V(6.9), 0.9);
tl.fromTo($(".lk"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, V(7.5));
tl.to($(".km"), { opacity: 0, duration: 0.3 }, V(6.9));
tl.fromTo($(".ssh"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(7.6));
`,
});

// 02 REMOTE CONSOLE
scenes.push({
  css: `${HDCSS}
@R .t0 { left:140px; top:280px; width:700px; height:400px; } @R .t1 { left:1080px; top:280px; width:700px; height:400px; }
@R .out { color:var(--muted); }
@R .tun { position:absolute; left:850px; top:450px; width:220px; height:60px; border-radius:30px; border:2px solid var(--green); background:rgba(62,224,143,.08);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .tun .ic { width:34px; height:34px; stroke-width:1.8; }
@R .pk { position:absolute; left:870px; top:462px; width:36px; height:36px; border-radius:50%; background:var(--yellow); }
@R .cap { position:absolute; left:0; right:0; top:760px; text-align:center; font-size:56px; font-weight:600; letter-spacing:-0.02em; }
@R .enc { position:absolute; left:0; right:0; top:860px; text-align:center; color:var(--muted); }
`,
  html: `
<h1 class="hd">Удалённая <span class="g">консоль</span></h1>
<div class="term t0"><div class="bar"><i></i><i></i><i></i><span class="mono muted">твой компьютер</span></div>
  <div class="body"><div class="mono c0"><span class="g">$</span> ${typed("ls /var/www")}</div></div></div>
<div class="tun">${icon("lock")}</div>
<div class="pk"></div>
<div class="term t1"><div class="bar"><i></i><i></i><i></i><span class="mono muted">сервер</span></div>
  <div class="body"><div class="mono out o0">index.html</div><div class="mono out o1">app.js</div><div class="mono out o2">logs/</div></div></div>
<div class="cap">Вводишь <span class="g">тут</span>, выполняется <span class="y">там</span></div>
<div class="enc lb">весь трафик зашифрован</div>`,
  js: `${HD}
${IN(".t0", "V(0.8)")}
${IN(".t1", "V(1.4)")}
tl.fromTo($(".tun"), { opacity: 0, scaleX: 0.6 }, { opacity: 1, scaleX: 1, duration: 0.5, ease: E }, V(1.9));
type(".c0", V(3.9), 0.06);
tl.fromTo($(".pk"), { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.2 }, V(4.9));
tl.to($(".pk"), { x: 144, duration: 0.6, ease: IO }, V(5.0));
tl.to($(".pk"), { opacity: 0, duration: 0.2 }, V(5.6));
tl.fromTo($(".out"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: E, stagger: 0.12 }, V(5.7));
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.3));
tl.fromTo($(".enc"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(7.8));
`,
});

// 03 COMMAND ANATOMY
const parts = [
  ["ssh", "команда", "g", 1.74],
  ["anna", "пользователь", "", 2.74],
  ["@", "собака", "y", 3.49],
  ["203.0.113.7", "адрес сервера", "", 4.26],
];
scenes.push({
  css: `${HDCSS}
@R .cmd { position:absolute; left:0; right:0; top:330px; display:flex; justify-content:center; gap:36px; font-size:92px; }
@R .pt { display:flex; flex-direction:column; align-items:center; gap:22px; }
@R .pt .u { height:4px; width:100%; border-radius:2px; background:var(--line); }
@R .pt .l { color:var(--muted); }
@R .port { left:610px; top:690px; width:700px; height:130px; display:flex; align-items:center; justify-content:center; gap:30px; }
@R .port .mono { font-size:60px; color:var(--yellow); }
`,
  html: `
<h1 class="hd">Подключение: <span class="g">одна команда</span></h1>
<div class="cmd">${parts.map(([t, l, c], i) => `<div class="pt p${i}"><span class="mono ${c}">${t}</span><span class="u"></span><span class="lb l">${l}</span></div>`).join("")}</div>
<div class="card port"><span class="mono">:22</span><span class="lb">порт по умолчанию</span></div>`,
  js: `${HD}
tl.fromTo($(".pt .mono"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.12 }, V(0.9));
${parts.map(([, , , t], i) => `tl.to($(".p${i} .u"), { backgroundColor: "#3ee08f", duration: 0.3 }, V(${t}));\ntl.fromTo($(".p${i} .l"), { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(${t}));`).join("\n")}
${IN(".port", "V(5.9)")}
`,
});

// 04 FINGERPRINT
const fp = [
  ["The authenticity of host can't be established.", "muted"],
  ["ED25519 key fingerprint is SHA256:3fK9…xQ2", "y"],
  ["Are you sure you want to continue (yes/no)?", "muted"],
];
scenes.push({
  css: `${HDCSS}
@R .term { left:140px; top:260px; width:1640px; height:400px; }
@R .kh { left:140px; top:730px; width:760px; height:150px; display:flex; align-items:center; gap:28px; padding:0 40px; }
@R .kh .ic { width:56px; height:56px; color:var(--green); stroke-width:1.5; }
@R .kh .ok { margin-left:auto; color:var(--green); }
@R .sh { position:absolute; left:1000px; top:760px; display:flex; align-items:center; gap:22px; }
@R .sh .ic { width:56px; height:56px; color:var(--yellow); stroke-width:1.5; }
`,
  html: `
<h1 class="hd">Отпечаток <span class="g">сервера</span></h1>
<div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">ssh ${HOST}</span></div>
  <div class="body">${fp.map(([l, c], i) => `<div class="mono f${i} ${c}">${sp(l)}</div>`).join("")}<div class="mono ans"><span class="g">&gt;</span> ${typed("yes")}</div></div></div>
<div class="card kh">${icon("file-text")}<span class="mono">known_hosts</span><span class="lb ok">+ сервер</span></div>
<div class="sh">${icon("shield-check")}<span class="lb">подмена будет замечена</span></div>`,
  js: `${HD}
${IN(".term", "V(0.3)")}
tl.fromTo($(".f0"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, V(1.2));
tl.fromTo($(".f1"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, V(2.4));
tl.fromTo($(".f2"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, V(3.3));
type(".ans", V(4.1), 0.1);
${IN(".kh", "V(5.3)")}
tl.fromTo($(".kh .ok"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(6.2));
${IN(".sh", "V(7.8)")}
`,
});

// 05 PASSWORD WEAK
const tries = ["123456", "qwerty", "password", "anna2024", "admin", "letmein"];
scenes.push({
  css: `${HDCSS}
@R .lg { left:140px; top:280px; width:760px; height:240px; padding:40px; display:flex; flex-direction:column; gap:24px; }
@R .lg .f { height:84px; border-radius:16px; border:1.5px solid var(--line); background:#0e1311; display:flex; align-items:center; padding:0 26px; }
@R .bt { left:1040px; top:280px; width:740px; height:560px; padding:36px 44px; }
@R .bt .t { display:flex; align-items:center; gap:18px; color:var(--yellow); margin-bottom:20px; }
@R .bt .t .ic { width:56px; height:56px; stroke-width:1.5; }
@R .tr { display:flex; align-items:center; justify-content:space-between; height:62px; color:var(--muted); }
@R .tr .x { color:var(--yellow); }
@R .cnt { position:absolute; left:140px; top:600px; }
@R .cnt .n { font-size:96px; font-weight:600; color:var(--yellow); letter-spacing:-0.03em; }
@R .cnt .lb { color:var(--muted); }
`,
  html: `
<h1 class="hd">Пароль: <span class="y">слабое место</span></h1>
<div class="card lg"><span class="mono muted">anna@server's password:</span><div class="f mono">${typed("••••••••")}</div></div>
<div class="card bt"><div class="t">${icon("bot")}<span class="lb">бот перебирает</span></div>
${tries.map((p, i) => `<div class="tr tr${i} mono"><span>${p}</span><span class="x">✕</span></div>`).join("")}</div>
<div class="cnt"><div class="n mono">12 408</div><div class="lb">попыток за сутки</div></div>`,
  js: `${HD}
${IN(".lg", "V(0.3)")}
type(".lg .f", V(0.8), 0.07);
tl.to($(".lg"), { borderColor: "rgba(245,197,24,.6)", duration: 0.4 }, V(1.8));
${IN(".bt", "V(3.0)")}
tl.fromTo($(".tr"), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.3, ease: E, stagger: 0.32 }, V(3.4));
${IN(".cnt", "V(5.2)")}
`,
});

// 06 KEYGEN
scenes.push({
  css: `${HDCSS}${NDCSS(600)}
@R .term { left:140px; top:250px; width:1000px; height:230px; }
@R .term .body { font-size:52px; }
@R .kf { position:absolute; top:640px; height:120px; display:flex; align-items:center; gap:20px; padding:0 30px; border-radius:22px; background:var(--panel); }
@R .kf .ic { width:52px; height:52px; stroke-width:1.6; }
@R .pv { left:480px; border:1.5px solid rgba(245,197,24,.6); color:var(--yellow); }
@R .pb { left:480px; top:780px; border:1.5px solid rgba(62,224,143,.6); color:var(--green); }
@R .kf .lb { color:var(--text); }
@R .ak { position:absolute; left:1390px; top:990px; width:420px; text-align:center; color:var(--muted); }
`,
  html: `
<h1 class="hd">Вход по <span class="g">ключам</span></h1>
<div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">терминал</span></div>
  <div class="body"><div class="mono kg"><span class="g">$</span> ${typed("ssh-keygen -t ed25519")}</div></div></div>
${nodes("Ты", "Сервер")}
<div class="kf pv">${icon("key-round")}<span class="mono">id_ed25519</span><span class="lb">приватный</span></div>
<div class="kf pb">${icon("key-round")}<span class="mono">.pub</span><span class="lb">публичный</span></div>
<div class="ak mono">authorized_keys</div>`,
  js: `${HD}
${IN(".term", "V(2.2)")}
type(".kg", V(2.9), 0.04);
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.1 }, V(3.8));
${IN(".pv", "V(4.8)")}
${IN(".pb", "V(6.6)")}
tl.to($(".pb"), { y: 60, duration: 0.4, ease: IO }, V(7.2));
tl.to($(".pb"), { x: 900, duration: 0.8, ease: IO }, V(7.5));
tl.fromTo($(".ak"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(8.1));
`,
});

// 07 CHALLENGE
const steps = [
  ["puzzle", "задача", 1.28, -1, 470],
  ["key-round", "решение приватным ключом", 3.34, 0, 0],
  ["check", "ответ верный", 5.5, 1, 650],
];
scenes.push({
  css: `${HDCSS}${NDCSS(330)}
@R .wire .ar { stroke:var(--green); } @R .wire .ah { fill:var(--green); }
@R .lb2 { position:absolute; left:460px; width:1000px; text-align:center; }
@R .l0 { top:410px; color:var(--yellow); display:flex; justify-content:center; align-items:center; gap:16px; }
@R .l0 .ic { width:48px; height:48px; stroke-width:1.6; } @R .l2 { top:620px; color:var(--green); }
@R .sg { position:absolute; left:90px; top:560px; width:400px; display:flex; flex-direction:column; align-items:center; gap:12px; color:var(--yellow); text-align:center; }
@R .sg .ic { width:56px; height:56px; stroke-width:1.6; }
@R .dr { position:absolute; left:1480px; top:560px; width:300px; display:flex; flex-direction:column; align-items:center; gap:12px; color:var(--green); text-align:center; }
@R .dr .ic { width:64px; height:64px; stroke-width:1.5; }
@R .cap { position:absolute; left:0; right:0; top:850px; display:flex; justify-content:center; align-items:center; gap:22px; font-size:56px; font-weight:600; letter-spacing:-0.02em; }
@R .cap .ic { width:56px; height:56px; color:var(--green); }
`,
  html: `
<h1 class="hd">Как сервер <span class="g">проверяет</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="ar a0" pathLength="1" d="M1470 490 L470 490"/><polygon class="ah h0" points="450,490 466,480 466,500"/>
  <path class="ar a1" pathLength="1" d="M450 600 L1450 600"/><polygon class="ah h1" points="1470,600 1454,590 1454,610"/>
</svg>
${nodes("Ты", "Сервер")}
<div class="lb2 l0 lt lb">${icon("puzzle")}<span>задача</span></div>
<div class="sg">${icon("key-round")}<span class="lb">решаю ключом</span></div>
<div class="lb2 l2 lb">ответ верный</div>
<div class="dr">${icon("door-open")}<span class="lb">вход разрешён</span></div>
<div class="cap">${icon("lock")}<span>Ключ <span class="y">не покидает</span> компьютер</span></div>`,
  js: `${HD}
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.1 }, V(0.2));
tl.set([$(".ah"), $(".l0")], { opacity: 0 }, 0);
draw(".a0", V(1.0), 0.7); tl.to($(".h0"), { opacity: 1, duration: 0.15 }, V(1.65));
tl.to($(".lt"), { opacity: 1, duration: 0.4 }, V(1.3));
${IN(".sg", "V(3.3)")}
draw(".a1", V(5.3), 0.7); tl.to($(".h1"), { opacity: 1, duration: 0.15 }, V(5.95));
tl.fromTo($(".l2"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(5.5));
${IN(".dr", "V(6.9)")}
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(8.4));
`,
});

// 08 SCP
scenes.push({
  css: `${HDCSS}${NDCSS(560)}
@R .term { left:140px; top:250px; width:1640px; height:220px; }
@R .term .body { font-size:50px; }
@R .fl { position:absolute; left:480px; top:620px; height:84px; display:flex; align-items:center; gap:16px; padding:0 24px; border-radius:18px; background:var(--panel); border:1.5px solid rgba(245,197,24,.6); color:var(--yellow); }
@R .fl .ic { width:40px; height:40px; stroke-width:1.6; }
@R .pg { position:absolute; left:480px; top:740px; width:960px; height:8px; border-radius:4px; background:var(--line); overflow:hidden; }
@R .pg i { display:block; width:100%; height:100%; background:var(--green); }
@R .pc { position:absolute; left:480px; top:770px; color:var(--green); }
`,
  html: `
<h1 class="hd">Копирование: <span class="g">scp</span></h1>
<div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">терминал</span></div>
  <div class="body"><div class="mono sc"><span class="g">$</span> ${typed(`scp report.pdf ${HOST}:~/`)}</div></div></div>
${nodes("Ты", "Сервер")}
<div class="fl mono">${icon("file")}report.pdf</div>
<div class="pg"><i></i></div><div class="pc mono">100%</div>`,
  js: `${HD}
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.1 }, V(0.4));
${IN(".term", "V(3.0)")}
type(".sc", V(3.6), 0.04);
${IN(".fl", "V(5.0)")}
tl.fromTo($(".pg"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, V(5.3));
tl.fromTo($(".pg i"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.4, ease: "power1.inOut" }, V(5.4));
tl.to($(".fl"), { x: 720, duration: 1.4, ease: IO }, V(5.4));
tl.to($(".fl"), { opacity: 0, duration: 0.3 }, V(6.8));
tl.fromTo($(".pc"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, V(6.9));
tl.to($(".n1"), { borderColor: "rgba(62,224,143,.6)", duration: 0.4 }, V(6.9));
`,
});

// 09 TUNNEL
scenes.push({
  css: `${HDCSS}
@R .ep { top:330px; width:420px; height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .ep > .ic { width:72px; height:72px; stroke-width:1.4; }
@R .ep .lb { color:var(--text); }
@R .e0 { left:140px; } @R .e1 { left:1360px; }
@R .ep .mono { color:var(--yellow); }
@R .tb { position:absolute; left:560px; top:420px; width:800px; height:80px; border-radius:40px; border:2px solid var(--green); background:rgba(62,224,143,.06); overflow:hidden; }
@R .tl { position:absolute; left:860px; top:350px; width:200px; display:flex; justify-content:center; color:var(--green); }
@R .tl .ic { width:48px; height:48px; stroke-width:1.8; }
@R .dt { position:absolute; top:28px; width:24px; height:24px; border-radius:50%; background:var(--green); }
@R .cmd { left:140px; top:700px; width:1640px; height:120px; display:flex; align-items:center; padding:0 40px; font-size:50px; }
`,
  html: `
<h1 class="hd">Туннели <span class="g">SSH</span></h1>
<div class="card ep e0">${icon("laptop")}<span class="lb">твой компьютер</span><span class="mono">localhost:5432</span></div>
<div class="tb">${[0, 1, 2, 3].map((i) => `<div class="dt d${i}" style="left:${740}px"></div>`).join("")}</div>
<div class="tl">${icon("lock")}</div>
<div class="card ep e1">${icon("database")}<span class="lb">база на сервере</span><span class="mono">:5432</span></div>
<div class="card cmd mono"><span class="g">$</span>&nbsp;${typed(`ssh -L 5432:localhost:5432 ${HOST}`)}</div>`,
  js: `${HD}
${IN(".e0", "V(0.6)")}
${IN(".e1", "V(1.0)")}
tl.fromTo($(".tb"), { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: E }, V(1.8));
tl.fromTo($(".tl"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(2.2));
${[0, 1, 2, 3].map((i) => `tl.fromTo($(".d${i}"), { x: 0, opacity: 0 }, { x: -720, opacity: 1, duration: 1.2, ease: "none" }, V(4.8) + ${i} * 0.35);\ntl.set($(".d${i}"), { opacity: 0 }, V(6.0) + ${i} * 0.35);`).join("\n")}
${IN(".cmd", "V(3.4)")}
type(".cmd", V(3.8), 0.035);
`,
});

// 10 SUMMARY + TRY
const sum = [
  ["terminal", "Удалённая консоль", 0.1],
  ["lock", "Шифрование", 1.3],
  ["key-round", "Ключи вместо паролей", 2.19],
  ["route", "Туннели", 3.44],
];
scenes.push({
  exit: 0.9,
  css: `
@R .ls { position:absolute; inset:0; }
@R .sm { width:790px; height:150px; display:flex; align-items:center; gap:28px; padding:0 40px; color:var(--green); }
@R .sm .ic { width:60px; height:60px; stroke-width:1.5; }
@R .sm .lb { color:var(--text); font-size:54px; font-weight:600; letter-spacing:-0.02em; }
${sum.map((_, i) => `@R .s${i} { left:${140 + (i % 2) * 850}px; top:${180 + Math.floor(i / 2) * 190}px; }`).join("\n")}
@R .ft { position:absolute; left:140px; top:640px; font-size:108px; }
@R .fin { position:absolute; inset:0; }
@R .fh { position:absolute; left:0; right:0; top:170px; text-align:center; font-size:100px; }
@R .term { left:360px; top:360px; width:1200px; height:300px; }
@R .term .body { font-size:52px; }
@R .out { color:var(--muted); font-size:44px; }
`,
  html: `
<div class="ls">
${sum.map(([ic, n], i) => `<div class="card sm s${i}">${icon(ic)}<span class="lb">${n}</span></div>`).join("\n")}
<h1 class="hd ft">Так работает <span class="g">SSH</span></h1>
</div>
<div class="fin">
  <h1 class="hd fh">Попробуй <span class="g">сам</span></h1>
  <div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">терминал</span></div>
    <div class="body"><div class="mono k0"><span class="g">$</span> ${typed("ssh-keygen -t ed25519")}</div><div class="mono out">Generating public/private ed25519 key pair.</div></div></div>
</div>`,
  js: `
${sum.map(([, , w], i) => IN(`.s${i}`, `V(${w})`)).join("\n")}
tl.fromTo($(".ft"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(4.7));
tl.to($(".ls"), { opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, V(6.7));
tl.fromTo($(".fh"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(7.1));
${IN(".term", "V(7.6)")}
type(".k0", V(8.7), 0.045);
tl.fromTo($(".out"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(9.9));
`,
});

build({
  title: "Как работает SSH",
  lang: "ru",
  durs,
  scenes,
  sfx: (st) => [
    ["typing", st[1] + VO_OFFSET + 3.9, 0.7, 0.3, 14],
    ["typing", st[3] + VO_OFFSET + 4.1, 0.35, 0.3, 14],
    ["typing", st[4] + VO_OFFSET + 0.8, 0.6, 0.3, 14],
    ["typing", st[5] + VO_OFFSET + 2.9, 0.9, 0.3, 14],
    ["click-soft", st[6] + VO_OFFSET + 6.9, 0.365, 0.45, 13],
    ["typing", st[7] + VO_OFFSET + 3.6, 1.3, 0.3, 14],
    ["typing", st[8] + VO_OFFSET + 3.8, 1.5, 0.3, 14],
    ["chime", st[9] + VO_OFFSET + 7.1, 2.5, 0.22, 15],
    ["typing", st[9] + VO_OFFSET + 8.7, 1.0, 0.3, 14],
  ],
});
