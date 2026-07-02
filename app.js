/* Happy 60th, Dad — a little birthday card. Love, Kyle. */
(function () {
  "use strict";

  // ---- The poem, one slide at a time -------------------------------------
  const SLIDES = [
    {
      kind: "open",
      img: "assets/01.jpg",
      pos: "center 32%",
      title: "Happy 60th,\nDad",
      subtitle:
        "Sixty years, and this is true&nbsp;—\nnobody does it like you.",
    },
    {
      kind: "verse",
      img: "assets/02.jpg",
      pos: "center 28%",
      kicker: "Where it started",
      lines: [
        "Before the sixty candles, before a fleck of gray,",
        "you were building us a home and lighting up the way.",
        "Reason one you’re the best: you were there from the start —",
        "the steady set of hands, the patient heart.",
      ],
    },
    {
      kind: "verse",
      img: "assets/03.jpg",
      pos: "center 45%",
      kicker: "The Game",
      lines: [
        "You put a club in my hands and taught me how to swing —",
        "head down, tempo easy, that calm and honest thing.",
        "Golf rewards the patient, the steady, and the true;",
        "every reason I love the game is really loving you.",
      ],
    },
    {
      kind: "verse",
      img: "assets/04.jpg",
      pos: "center 34%",
      kicker: "The Cart",
      lines: [
        "The best rounds were never really about the score —",
        "just you and me, a cart, eighteen holes and more.",
        "The jokes between the fairways, the bets we’d never pay —",
        "Dad, those are the mornings I’d relive any day.",
      ],
    },
    {
      kind: "verse",
      img: "assets/05.jpg",
      pos: "center 26%",
      kicker: "The Finish Line",
      lines: [
        "When I’ve toed the line at races, legs aching, nerves pulled tight,",
        "I’d find you in the crowd and everything felt right.",
        "Through every finish line and every mile I’ve run,",
        "you show up — and you show up as number one.",
      ],
    },
    {
      kind: "verse",
      img: "assets/06.jpg",
      pos: "center 38%",
      kicker: "The Adventures",
      lines: [
        "From city lights to shorelines you were game to roam,",
        "proof adventure’s better when you bring your people home.",
        "Wherever roads have led us, near or far away,",
        "the best part of the view was you, anyway.",
      ],
    },
    {
      kind: "verse",
      img: "assets/08.jpg",
      pos: "center 30%",
      kicker: "The Milestones",
      lines: [
        "At every cap and milestone, every proud and nervous day,",
        "you stood a little taller and never looked away.",
        "You believed in me first, before I even knew —",
        "and so much of who I am, I owe to you.",
      ],
    },
    {
      kind: "verse",
      img: "assets/09.jpg",
      pos: "center 34%",
      kicker: "The Friend",
      lines: [
        "Somewhere down the fairway you became my friend as well,",
        "the one I call to grab a beer, the one I want to tell.",
        "A father and a buddy — the finest kind, it’s true;",
        "I hit life’s jackpot, Dad, and the jackpot’s you.",
      ],
    },
    {
      kind: "verse",
      img: "assets/10.jpg",
      pos: "center 32%",
      kicker: "The Family",
      lines: [
        "You built a family that laughs too loud and loves out loud,",
        "the kind that sticks together and makes a person proud.",
        "No gift I give today can match a thing you’ve done —",
        "you gave us all a home, and that’s a hole-in-one.",
      ],
    },
    {
      kind: "verse",
      img: "assets/11.jpg",
      pos: "center 58%",
      kicker: "The Back Nine",
      lines: [
        "So here’s to the back nine, Dad — the fun has just begun:",
        "more fairways, more adventures, more rounds beneath the sun.",
        "Sixty looks good on you; you’re barely at the turn —",
        "keep swinging, keep smiling, there’s more course left to learn.",
      ],
    },
    {
      kind: "close",
      img: "assets/12.jpg",
      pos: "center 38%",
      kicker: "Happy Birthday",
      lines: [
        "Happy 60th, Dad — my hero and my friend,",
        "the best there ever was, from first tee to the end.",
        "No card could hold it all, so I’ll keep it short and true:",
        "happy birthday, thank you, and I love you.",
      ],
      signoff: "Love, Kyle",
    },
  ];

  const flagSVG =
    '<svg class="flag" viewBox="0 0 64 64" aria-hidden="true">' +
    '<circle cx="46" cy="55" r="4" fill="currentColor" opacity="0.35"/>' +
    '<path d="M20 55 V10" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>' +
    '<path d="M20 12 C 34 6, 44 18, 58 12 L 58 30 C 44 36, 34 24, 20 30 Z" fill="currentColor"/>' +
    '<circle cx="12" cy="52" r="5" fill="#fff" stroke="currentColor" stroke-width="2"/>' +
    "</svg>";

  // ---- Build the DOM ------------------------------------------------------
  const track = document.getElementById("track");
  const dotsWrap = document.getElementById("dots");
  const progressBar = document.getElementById("progressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const deck = document.getElementById("deck");

  const total = SLIDES.length;

  SLIDES.forEach((s, i) => {
    const slide = document.createElement("article");
    slide.className = "slide slide--" + s.kind;
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", i + 1 + " of " + total);

    const figure = document.createElement("figure");
    figure.className = "photo";
    const img = document.createElement("img");
    img.src = s.img;
    img.alt = s.kicker ? s.kicker : "A photo of Dad";
    img.decoding = "async";
    img.loading = i <= 1 ? "eager" : "lazy";
    img.style.objectPosition = s.pos || "center";
    img.draggable = false;
    figure.appendChild(img);

    const verse = document.createElement("div");
    verse.className = "verse";

    let inner = "";
    if (s.kind === "open") {
      inner += '<div class="mark">' + flagSVG + '<span class="sixty">60</span></div>';
      inner += '<h1 class="title">' + escapeLines(s.title) + "</h1>";
      inner += '<p class="subtitle">' + escapeLines(s.subtitle) + "</p>";
      inner += '<p class="hint">Swipe or tap <span aria-hidden="true">→</span></p>';
    } else {
      if (s.kicker) inner += '<p class="kicker">' + s.kicker + "</p>";
      inner += '<blockquote class="poem">';
      s.lines.forEach((ln) => {
        inner += "<span>" + ln + "</span>";
      });
      inner += "</blockquote>";
      if (s.signoff) {
        inner += '<p class="signoff">' + s.signoff + "</p>";
        inner +=
          '<button class="cta cta--ghost" data-cta="replay">Play again ' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 1 2.3 5.6M4 12V7m0 5h5"/></svg></button>';
      }
    }
    verse.innerHTML = inner;

    if (s.kind === "verse") {
      slide.appendChild(figure);
      slide.appendChild(verse);
    } else {
      // hero slides: verse first (text lead), photo as companion
      slide.appendChild(verse);
      slide.appendChild(figure);
    }
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => go(i));
    dotsWrap.appendChild(dot);
  });

  const slides = Array.from(track.children);
  const dots = Array.from(dotsWrap.children);

  // ---- Navigation ---------------------------------------------------------
  let current = 0;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(n) {
    return Math.max(0, Math.min(total - 1, n));
  }

  function render() {
    track.style.transform = "translateX(" + -current * 100 + "%)";
    slides.forEach((el, i) => {
      const active = i === current;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-hidden", active ? "false" : "true");
      el.querySelectorAll("button, a").forEach((b) => {
        if (b.classList.contains("cta")) b.tabIndex = active ? 0 : -1;
      });
    });
    dots.forEach((d, i) => {
      d.classList.toggle("is-on", i === current);
      d.setAttribute("aria-current", i === current ? "true" : "false");
    });
    progressBar.style.width = ((current + 1) / total) * 100 + "%";
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    deck.dataset.slide = current;
    deck.dataset.kind = SLIDES[current].kind;

    if (SLIDES[current].kind === "open" || SLIDES[current].kind === "close") {
      celebrate();
    }
  }

  function go(n) {
    const next = clamp(n);
    if (next === current) return;
    current = next;
    render();
  }
  function next() { go(current + 1); }
  function prev() { go(current - 1); }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  track.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cta]");
    if (!btn) return;
    if (btn.dataset.cta === "next") next();
    if (btn.dataset.cta === "replay") go(0);
  });

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") { next(); e.preventDefault(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { prev(); e.preventDefault(); }
    else if (e.key === "Home") { go(0); e.preventDefault(); }
    else if (e.key === "End") { go(total - 1); e.preventDefault(); }
    else if (e.key === " ") { next(); e.preventDefault(); }
  });

  // Touch / pointer swipe
  let startX = 0, startY = 0, dragging = false;
  deck.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".nav, .cta, .dot")) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  deck.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next(); else prev();
    }
  });
  deck.addEventListener("pointercancel", () => { dragging = false; });

  // Wheel (throttled) — supports trackpads & mouse on laptop
  let wheelLock = false;
  deck.addEventListener(
    "wheel",
    (e) => {
      const mag = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(mag) < 12) return;
      if (wheelLock) { e.preventDefault(); return; }
      wheelLock = true;
      if (mag > 0) next(); else prev();
      setTimeout(() => (wheelLock = false), 600);
      e.preventDefault();
    },
    { passive: false }
  );

  // ---- Confetti (lightweight) --------------------------------------------
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  let pieces = [];
  let rafId = null;
  let lastCelebrate = -1;

  function sizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  sizeCanvas();

  const COLORS = ["#c9a24b", "#e4c877", "#1c5a3a", "#2f8f5b", "#f7f1e4", "#b9822f"];

  function celebrate() {
    if (reduceMotion) return;
    if (lastCelebrate === current) return; // don't re-fire on same slide
    lastCelebrate = current;
    const w = window.innerWidth;
    const burst = Math.min(140, Math.round(w / 6));
    for (let i = 0; i < burst; i++) {
      pieces.push({
        x: Math.random() * w,
        y: -20 - Math.random() * window.innerHeight * 0.3,
        r: 4 + Math.random() * 6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        vx: -1.5 + Math.random() * 3,
        vy: 2 + Math.random() * 3.5,
        rot: Math.random() * Math.PI,
        vr: -0.15 + Math.random() * 0.3,
        life: 1,
      });
    }
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const h = window.innerHeight;
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.rot += p.vr;
      if (p.y > h * 0.75) p.life -= 0.02;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      ctx.restore();
    });
    pieces = pieces.filter((p) => p.life > 0 && p.y < h + 40);
    if (pieces.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rafId = null;
    }
  }

  window.addEventListener("resize", sizeCanvas);

  // ---- Helpers ------------------------------------------------------------
  function escapeLines(str) {
    return str
      .split("\n")
      .map((s) => s)
      .join("<br />");
  }

  // ---- Go -----------------------------------------------------------------
  render();
  // deep-link support (#3 opens slide 3)
  const fromHash = parseInt(location.hash.replace("#", ""), 10);
  if (!isNaN(fromHash)) go(fromHash - 1);

  // expose minimal API for testing
  window.__card = { go, next, prev, get current() { return current; }, total };
})();
