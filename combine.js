const $ = (id) => document.getElementById(id);
const toast = (msg) => { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2600); };
const clamp = (n) => Math.max(0, Math.min(100, n));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- Drill registry and scorecard ---------- */
// Scoring bands are documented on about.html; keep the two in sync.
const DRILLS = [
  { id: 'reaction', name: 'Doors Closing', what: 'Reaction',    lower: true,  fmt: (v) => v + ' ms',             pts: (v) => clamp((400 - v) / 2.5) },
  { id: 'aim',      name: 'Chope!',        what: 'Aim',         lower: true,  fmt: (v) => v + ' ms',             pts: (v) => clamp((1100 - v) / 7.5) },
  { id: 'cps',      name: 'Queue Rush',    what: 'Click speed', lower: false, fmt: (v) => v.toFixed(1) + ' cps', pts: (v) => clamp((v - 4) * 12.5) },
  { id: 'memory',   name: 'Hawker Recall', what: 'Memory',      lower: false, fmt: (v) => v + ' steps',          pts: (v) => clamp((v - 3) * 11.1) },
  { id: 'typing',   name: 'Kopi Order',    what: 'Typing',      lower: false, fmt: (v) => v + ' wpm',            pts: (v) => clamp((v - 20) * 1.25) },
];
const best = {};
const TIERS = [[0, 'Blur Like Sotong'], [25, 'Can Lah'], [50, 'Shiok'], [75, 'Steady Pom Pi Pi']];

function renderScorecard() {
  $('scRows').innerHTML = DRILLS.map((d, i) => `
    <button class="sc-row" data-go="${d.id}">
      <span class="sc-num">0${i + 1}</span>
      <span class="sc-name">${d.name}<small>${d.what}</small></span>
      <span class="sc-val ${best[d.id] != null ? 'done' : ''}">${best[d.id] != null ? d.fmt(best[d.id]) : '—'}</span>
    </button>`).join('');
  const done = DRILLS.filter((d) => best[d.id] != null);
  const score = Math.round(done.reduce((s, d) => s + d.pts(best[d.id]), 0) / DRILLS.length);
  $('meter').style.width = score + '%';
  if (done.length === DRILLS.length) {
    const tier = TIERS.filter(([min]) => score >= min).pop()[1];
    $('rank').textContent = tier; $('rank').classList.add('set');
    $('rankNote').textContent = `Combine score ${score}/100. Retry any drill to climb.`;
  } else {
    $('rank').textContent = 'Unranked'; $('rank').classList.remove('set');
    $('rankNote').textContent = `${done.length} of 5 drills done. Clear all five to get ranked.`;
  }
  $('tabs').querySelectorAll('.tab').forEach((t) => { const d = DRILLS.find((x) => x.id === t.dataset.id); t.querySelector('em').textContent = best[d.id] != null ? d.fmt(best[d.id]) : '—'; });
  bindGo($('scRows'));
}
function record(id, value) {
  const d = DRILLS.find((x) => x.id === id);
  const prev = best[id];
  const better = prev == null || (d.lower ? value < prev : value > prev);
  if (!better) return false;
  best[id] = value; renderScorecard(); updateHud();
  if (prev != null) toast(`New best on ${d.name}: ${d.fmt(value)}. Power!`);
  else if (DRILLS.every((x) => best[x.id] != null)) toast('All five cleared. Check your rank up top.');
  return true;
}

/* ---------- Arena ---------- */
let current = null, cleanup = () => {};
const play = $('play');
function updateHud() {
  const d = DRILLS.find((x) => x.id === current);
  $('hudName').textContent = d.name + ' · ' + d.what;
  $('hudStat').innerHTML = 'Best <b>' + (best[d.id] != null ? d.fmt(best[d.id]) : '—') + '</b>';
}
function select(id, scroll) {
  cleanup(); cleanup = () => {};
  current = id;
  $('tabs').querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', t.dataset.id === id));
  updateHud();
  play.innerHTML = '';
  MOUNT[id]();
  if (scroll) $('arena').scrollIntoView({ behavior: 'smooth' });
}
function bindGo(root) { root.querySelectorAll('[data-go]').forEach((b) => b.onclick = () => select(b.dataset.go, true)); }
$('tabs').innerHTML = DRILLS.map((d, i) => `<button class="tab" role="tab" data-id="${d.id}"><span>0${i + 1} ${d.name}</span><em>—</em></button>`).join('');
$('tabs').querySelectorAll('.tab').forEach((t) => t.onclick = () => select(t.dataset.id));

const MOUNT = {
  /* 01 Doors Closing: wait for the signal, then go. Five tries averaged. */
  reaction() {
    play.innerHTML = '<p class="hint">Tap to step onto the platform. The doors are closing. When the panel turns lime, tap to squeeze in. Tap early and you kena stuck outside.</p><button class="pad" id="rpad">Tap to start<small>Try 1 of 5</small></button>';
    const pad = $('rpad'); let phase = 'idle', t0 = 0, timer = null, tries = [];
    const set = (cls, big, small) => { pad.className = 'pad ' + cls; pad.innerHTML = big + '<small>' + small + '</small>'; };
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (phase === 'idle') {
        phase = 'wait'; set('wait', 'Doors closing…', 'Wait for it');
        timer = setTimeout(() => { phase = 'go'; t0 = performance.now(); set('go', 'Go go go!', 'Tap now'); }, 1200 + Math.random() * 2800);
      } else if (phase === 'wait') {
        clearTimeout(timer); phase = 'idle'; set('', 'Eh, too early', 'Tap to retry this one');
      } else if (phase === 'go') {
        const ms = Math.round(performance.now() - t0); tries.push(ms); phase = 'idle';
        if (tries.length < 5) set('', ms + ' ms', `Tap for try ${tries.length + 1} of 5`);
        else {
          const avg = Math.round(tries.reduce((a, b) => a + b, 0) / 5); tries = [];
          const nb = record('reaction', avg);
          set('', avg + ' ms avg', (nb ? 'New best. ' : '') + 'Tap to run it again');
        }
      }
    });
    cleanup = () => clearTimeout(timer);
  },

  /* 02 Chope!: 20 targets, average ms per target. */
  aim() {
    play.innerHTML = '<p class="hint">Lunch crowd incoming. Chope 20 seats before anyone else does. Tapping empty floor counts as a miss.</p><div class="field" id="field"><div class="overlay" id="ov"><div><h3>Chope!</h3><p>20 seats. Fast and accurate.</p><button class="btn" id="aimStart">Start</button></div></div></div><div class="result" id="aimRes">Choped <b>0</b>/20 · Misses <b>0</b></div>';
    const field = $('field'); let hits = 0, misses = 0, t0 = 0, running = false, tgt = null;
    const status = () => $('aimRes').innerHTML = `Choped <b>${hits}</b>/20 · Misses <b>${misses}</b>`;
    const spawn = () => {
      tgt?.remove();
      tgt = document.createElement('button'); tgt.className = 'target'; tgt.setAttribute('aria-label', 'Empty seat');
      tgt.style.left = (8 + Math.random() * 84) + '%'; tgt.style.top = (10 + Math.random() * 80) + '%';
      tgt.addEventListener('pointerdown', (e) => { e.stopPropagation(); e.preventDefault(); hit(); });
      field.appendChild(tgt);
    };
    const hit = () => {
      hits++; status();
      if (hits < 20) return spawn();
      running = false; tgt.remove(); tgt = null;
      const avg = Math.round((performance.now() - t0) / 20);
      const acc = Math.round(20 / (20 + misses) * 100);
      const nb = record('aim', avg);
      field.insertAdjacentHTML('beforeend', `<div class="overlay" id="ov"><div><h3>${avg} ms</h3><p>Per seat · ${acc}% accuracy${nb ? ' · New best' : ''}</p><button class="btn" id="aimStart">Go again</button></div></div>`);
      $('aimStart').onclick = start;
    };
    const start = () => { $('ov').remove(); hits = 0; misses = 0; status(); running = true; t0 = performance.now(); spawn(); };
    field.addEventListener('pointerdown', () => { if (running) { misses++; status(); } });
    $('aimStart').onclick = start;
  },

  /* 03 Queue Rush: clicks per second over 5 seconds. */
  cps() {
    play.innerHTML = '<p class="hint">The bubble tea queue is 40 people long. Mash to reach the counter. Timer starts on your first tap. Five seconds.</p><button class="pad" id="cpad">Tap to start<small>5.0 s</small></button>';
    const pad = $('cpad'); let n = 0, t0 = 0, state = 'idle', iv = null;
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (state === 'locked') return;
      if (state === 'idle') {
        state = 'run'; n = 0; t0 = performance.now(); pad.className = 'pad go';
        iv = setInterval(() => {
          const left = 5 - (performance.now() - t0) / 1000;
          if (left > 0) { pad.innerHTML = n + '<small>' + left.toFixed(1) + ' s</small>'; return; }
          clearInterval(iv); state = 'locked';
          const cps = Math.round(n / 5 * 10) / 10; const nb = record('cps', cps);
          pad.className = 'pad'; pad.innerHTML = cps.toFixed(1) + ' cps<small>' + n + ' taps' + (nb ? ' · New best' : '') + '</small>';
          setTimeout(() => { state = 'idle'; pad.querySelector('small').textContent += ' · Tap to go again'; }, 1200);
        }, 50);
      }
      if (state === 'run') n++;
    });
    cleanup = () => clearInterval(iv);
  },

  /* 04 Hawker Recall: growing sequence. */
  memory() {
    play.innerHTML = '<p class="hint center">Your kakis each want food from a different stall. Watch which stalls light up, then tap them in the same order. One more order every round.</p><div class="memgrid" id="mg">' + Array.from({ length: 9 }, (_, i) => `<button class="mem" data-i="${i}" aria-label="Stall ${i + 1}"><span>#0${i + 1}</span></button>`).join('') + '</div><div class="center"><button class="btn" id="memStart">Start</button><div class="result" id="memRes">Round <b>0</b></div></div>';
    const pads = [...play.querySelectorAll('.mem')]; let seq = [], pos = 0, input = false, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const flash = (i, cls = 'flash', ms = 380) => { pads[i].classList.add(cls); later(() => pads[i].classList.remove(cls), ms); };
    const round = () => {
      seq.push(Math.floor(Math.random() * 9)); pos = 0; input = false;
      $('memRes').innerHTML = `Round <b>${seq.length}</b> · Watch`;
      seq.forEach((p, k) => later(() => flash(p), 600 + k * 560));
      later(() => { input = true; $('memRes').innerHTML = `Round <b>${seq.length}</b> · Your turn`; }, 600 + seq.length * 560);
    };
    pads.forEach((b) => b.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!input) return;
      const i = +b.dataset.i;
      if (i !== seq[pos]) {
        input = false; flash(i, 'bad', 600);
        const score = seq.length - 1; const nb = score > 0 && record('memory', score);
        $('memRes').innerHTML = `Wrong stall on order ${pos + 1}. You held <b>${score}</b> orders${nb ? ' · New best' : ''}`;
        $('memStart').disabled = false; $('memStart').textContent = 'Again';
        return;
      }
      flash(i, 'flash', 180); pos++;
      if (pos === seq.length) { input = false; later(round, 650); }
    }));
    $('memStart').onclick = () => { $('memStart').disabled = true; seq = []; round(); };
    cleanup = () => timers.forEach(clearTimeout);
  },

  /* 05 Kopi Order: type 12 drink orders, words per minute. */
  typing() {
    const ORDERS = ['kopi o', 'kopi c', 'kopi o kosong', 'kopi siew dai', 'kopi gao', 'kopi peng', 'teh o', 'teh c', 'teh halia', 'teh tarik', 'teh o ice limau', 'milo dinosaur', 'milo peng', 'bandung', 'barley', 'yuan yang', 'kopi c kosong', 'teh c siew dai', 'sugarcane', 'lime juice'];
    play.innerHTML = '<p class="hint center">Uncle is waiting. Type each order and it clears by itself. The clock starts on your first key.</p><div class="word" id="w"></div><div class="next" id="nx"></div><input class="typein" id="ti" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Type the order"><div class="result" id="tyRes">0 / 12</div>';
    let list = [], k = 0, t0 = 0, chars = 0;
    const show = () => { $('w').textContent = list[k]; $('nx').textContent = list[k + 1] ? 'Next: ' + list[k + 1] : 'Last order'; };
    const reset = () => { list = shuffle(ORDERS).slice(0, 12); k = 0; t0 = 0; chars = 0; $('ti').value = ''; $('ti').disabled = false; show(); $('tyRes').textContent = '0 / 12'; };
    $('ti').addEventListener('input', (e) => {
      if (!t0) t0 = performance.now();
      const v = e.target.value.trim().toLowerCase().replace(/\s+/g, ' ');
      e.target.classList.toggle('ok', list[k].startsWith(v));
      if (v !== list[k]) return;
      chars += list[k].length + 1; k++; e.target.value = '';
      $('tyRes').textContent = k + ' / 12';
      if (k < list.length) return show();
      const wpm = Math.round((chars / 5) / ((performance.now() - t0) / 60000));
      const nb = record('typing', wpm);
      $('w').textContent = wpm + ' wpm'; $('nx').textContent = nb ? 'New best. Uncle impressed.' : 'Orders out';
      e.target.disabled = true;
      $('tyRes').innerHTML = '<button class="btn" id="tyAgain">Go again</button>';
      $('tyAgain').onclick = () => { reset(); $('ti').focus(); };
    });
    reset();
  },
};

bindGo(document);
renderScorecard();
// Ads deep-link straight to a drill with ?drill=<id>.
const linked = new URLSearchParams(location.search).get('drill');
if (DRILLS.some((d) => d.id === linked)) {
  select(linked);
  // Wait for fonts and layout, or the jump lands short of the arena.
  window.addEventListener('load', () => setTimeout(() => $('arena').scrollIntoView({ behavior: 'instant' }), 50));
} else select('reaction');

/* ---------- Lobby talk ---------- */
const QUESTIONS = [
  'Which game have you put the most hours into, honestly?',
  'Supper after the match: prata, McSpicy or mala?',
  'Who here confirm rage quit first?',
  'Keyboard and mouse or controller, forever?',
  'Which MRT line is the most cursed?',
  'Best comeback you\'ve ever pulled off?',
  'Main or flex? Defend your answer.',
  'Worst teammate habit you\'ve seen?',
  'If tonight goes badly, whose fault is it already?',
  'Most overrated game everyone loves?',
  'Which map do you secretly hate?',
  'Never lag again or never get matched with trolls again?',
  'What game got you into gaming?',
  'Who carries this squad? Point at them.',
  'Your walk-out song at a tournament?',
  'Worst rank drop you ever kena?',
  'Kopi or bubble tea for a late-night session?',
  'Most clutch moment you\'ve seen live?',
  'LAN at someone\'s house or everyone at home on voice?',
  'Sweat or vibes tonight?',
  'Biggest skill gap in this squad? Be nice. Or don\'t.',
  'Which game would you play during NS book-out weekend?',
  'Chope the best gaming chair: who gets it?',
  'What are we queueing next?',
];
let qOrder = shuffle(QUESTIONS.map((_, i) => i)), qPos = 0;
$('draw').addEventListener('click', () => {
  if (qPos >= qOrder.length) { qOrder = shuffle(QUESTIONS.map((_, i) => i)); qPos = 0; }
  $('question').textContent = QUESTIONS[qOrder[qPos]];
  $('count').textContent = `${qPos + 1} / ${QUESTIONS.length}`;
  qPos++;
});

/* ---------- Kopi break ---------- */
let breathing = null;
$('breathe').addEventListener('click', () => {
  const ball = $('ball'), label = $('breathLabel'), btn = $('breathe');
  if (breathing) { clearInterval(breathing); breathing = null; ball.classList.remove('big'); label.textContent = 'In · hold · out'; btn.textContent = 'Start'; return; }
  const steps = [['Breathe in', true], ['Hold', true], ['Breathe out', false]];
  let i = 0;
  const step = () => {
    if (i >= 15) { clearInterval(breathing); breathing = null; label.textContent = 'Reset done. Back in.'; btn.textContent = 'Start'; ball.classList.remove('big'); return; }
    const [text, big] = steps[i % 3]; label.textContent = text; ball.classList.toggle('big', big); i++;
  };
  step(); breathing = setInterval(step, 4000); btn.textContent = 'Stop';
});

/* ---------- Squad up ---------- */
document.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => { $('nightName').value = c.textContent; $('nightName').focus(); }));
$('inviteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('nightName').value.trim(); if (!name) return;
  const url = new URL(location.href); url.hash = 'squad=' + encodeURIComponent(name);
  $('outName').textContent = name; $('link').value = url.href; $('out').classList.add('show');
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('link').value); toast('Copied. Drop it in the group chat.'); }
  catch { $('link').select(); toast('Select the link and copy it.'); }
});
if (location.hash.startsWith('#squad=')) {
  try { const name = decodeURIComponent(location.hash.slice(7)); toast(`You kena called in for "${name}". Run the Combine.`); } catch {}
}
