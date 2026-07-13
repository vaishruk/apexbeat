/* ============================================================
   CardioLumen — hero ECG waveform
   A lightweight 2D canvas ECG that sweeps beneath the anatomical
   hero image. The heavy WebGL scene was removed: it starved the
   main thread / requestAnimationFrame and janked scrolling, and
   the real anatomical diagram already carries the hero. This
   waveform pauses whenever the hero is off-screen or the tab is
   hidden, so it never competes with scrolling.
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("ecgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, dpr;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener("resize", size);

  // one PQRST beat, t in [0,1]
  function ecgY(t) {
    const g = (c, w, a) => a * Math.exp(-((t - c) ** 2) / (2 * w * w));
    return (
      g(0.16, 0.018, 0.12) - g(0.30, 0.008, 0.10) + g(0.33, 0.010, 1.0) -
      g(0.36, 0.012, 0.28) + g(0.62, 0.045, 0.22)
    );
  }

  const teal = getComputedStyle(document.documentElement).getPropertyValue("--teal").trim() || "#2dd4bf";
  let phase = 0, raf = null, running = false, last = 0;
  const FRAME = 1000 / 30;

  function draw(now) {
    raf = requestAnimationFrame(draw);
    if (now && now - last < FRAME) return;
    last = now || 0;
    ctx.clearRect(0, 0, W, H);
    const mid = H * 0.6, amp = H * 0.42, beats = 2.2;
    ctx.lineWidth = 2;
    ctx.strokeStyle = teal;
    ctx.shadowColor = teal;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let px = 0; px <= W; px += 2) {
      const u = px / W;
      const y = mid - ecgY((u * beats + phase) % 1) * amp;
      px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    phase = (phase + 0.006) % 1;
  }

  function start() { if (!running && !prefersReduced) { running = true; last = 0; raf = requestAnimationFrame(draw); } }
  function stop() { if (running) { cancelAnimationFrame(raf); running = false; } }

  if (prefersReduced) {
    // draw one static frame
    draw(0); cancelAnimationFrame(raf);
    return;
  }

  // only animate while the hero is visible
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (ents) => ents.forEach((e) => (e.isIntersecting ? start() : stop())),
      { threshold: 0.01 }
    ).observe(canvas);
  } else {
    start();
  }
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
})();
