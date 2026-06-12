import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);

    // ── Resize ──────────────────────────────────────────────────
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Warp star field ──────────────────────────────────────────
    const STAR_COUNT = 260;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      pz: 0,
    }));

    // ── Nebula blobs ─────────────────────────────────────────────
    const nebulas = [
      { x: 0.12, y: 0.18, r: 380, hue: 220, alpha: 0.13, phase: 0,    speed: 0.00035, driftX:  0.00008, driftY:  0.00005 },
      { x: 0.85, y: 0.08, r: 320, hue: 195, alpha: 0.10, phase: 1.2,  speed: 0.00028, driftX: -0.00010, driftY:  0.00007 },
      { x: 0.50, y: 0.85, r: 440, hue: 255, alpha: 0.09, phase: 2.5,  speed: 0.00022, driftX:  0.00006, driftY: -0.00009 },
      { x: 0.75, y: 0.60, r: 280, hue: 180, alpha: 0.07, phase: 0.8,  speed: 0.00040, driftX: -0.00007, driftY:  0.00006 },
      { x: 0.25, y: 0.70, r: 300, hue: 240, alpha: 0.08, phase: 3.1,  speed: 0.00031, driftX:  0.00009, driftY: -0.00005 },
    ];

    // ── Shooting stars ───────────────────────────────────────────
    let shooters = [];
    const spawnShooter = () => {
      shooters.push({
        x:     Math.random() * W * 0.75,
        y:     Math.random() * H * 0.45,
        vx:    7  + Math.random() * 9,
        vy:    3  + Math.random() * 5,
        len:   150 + Math.random() * 150,
        life:  1,
        decay: 0.016 + Math.random() * 0.012,
        width: 1.5 + Math.random() * 0.8,
      });
    };
    const shootInterval = setInterval(spawnShooter, 2600);
    // spawn one immediately
    setTimeout(spawnShooter, 800);

    // ── Static twinkle stars (drawn once, fade via alpha) ────────
    const TWINKLE_COUNT = 120;
    const twinkles = Array.from({ length: TWINKLE_COUNT }, () => ({
      x:     Math.random() * 9999, // will be scaled in draw
      y:     Math.random() * 9999,
      size:  0.5 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.015,
      baseAlpha: 0.2 + Math.random() * 0.6,
    }));

    // ── Draw ─────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Base black-blue
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, W, H);

      // ── Nebulas ──
      nebulas.forEach((n) => {
        n.phase += n.speed;
        n.x += n.driftX;
        n.y += n.driftY;
        if (n.x < -0.15 || n.x > 1.15) n.driftX *= -1;
        if (n.y < -0.15 || n.y > 1.15) n.driftY *= -1;

        const pulse = Math.sin(n.phase) * 0.03;
        const radius = n.r * (1 + pulse);
        const nx = n.x * W, ny = n.y * H;

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius);
        grd.addColorStop(0,   `hsla(${n.hue},80%,60%,${n.alpha + pulse * 0.03})`);
        grd.addColorStop(0.45,`hsla(${n.hue + 15},70%,45%,${n.alpha * 0.55})`);
        grd.addColorStop(1,   "transparent");

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Twinkle stars ──
      twinkles.forEach((s) => {
        s.phase += s.speed;
        const alpha = s.baseAlpha * (0.4 + 0.6 * (Math.sin(s.phase) * 0.5 + 0.5));
        const sx = (s.x / 9999) * W;
        const sy = (s.y / 9999) * H;
        ctx.beginPath();
        ctx.fillStyle = `rgba(210,235,255,${alpha})`;
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();
        // tiny glow on larger ones
        if (s.size > 1.4) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 3.5);
          g.addColorStop(0, `rgba(180,220,255,${alpha * 0.4})`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── Warp star streaks ──
      const cx = W / 2, cy = H / 2;
      const warpSpeed = 2.5;
      stars.forEach((s) => {
        s.pz = s.z;
        s.z -= warpSpeed;
        if (s.z <= 1) {
          s.x  = (Math.random() - 0.5) * 2000;
          s.y  = (Math.random() - 0.5) * 2000;
          s.z  = 1800 + Math.random() * 200;
          s.pz = s.z;
          return;
        }

        const sx  = (s.x / s.z)  * W + cx;
        const sy  = (s.y / s.z)  * H + cy;
        const spx = (s.x / s.pz) * W + cx;
        const spy = (s.y / s.pz) * H + cy;

        // skip if off-screen
        if (sx < 0 || sx > W || sy < 0 || sy > H) return;

        const progress = clamp(1 - s.z / 2000, 0, 1);
        const alpha    = progress * 0.7;
        const size     = Math.max(0.3, progress * 2.2);

        // streak
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${Math.round(lerp(140,255,progress))},${Math.round(lerp(190,245,progress))},255,${alpha})`;
        ctx.lineWidth = size * 0.55;
        ctx.moveTo(spx, spy);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // leading dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(220,240,255,${alpha * 1.2})`;
        ctx.arc(sx, sy, size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Shooting stars ──
      shooters = shooters.filter((s) => s.life > 0);
      shooters.forEach((s) => {
        s.x    += s.vx;
        s.y    += s.vy;
        s.life -= s.decay;

        const dist = s.len;
        const tx = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * dist;
        const ty = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * dist;

        const grd = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grd.addColorStop(0,    "transparent");
        grd.addColorStop(0.55, `rgba(103,232,249,${s.life * 0.45})`);
        grd.addColorStop(0.85, `rgba(186,230,253,${s.life * 0.75})`);
        grd.addColorStop(1,    `rgba(255,255,255,${s.life})`);

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = grd;
        ctx.lineWidth = s.width * s.life;
        ctx.lineCap = "round";
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();

        // head glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 9);
        glow.addColorStop(0, `rgba(240,250,255,${s.life * 0.85})`);
        glow.addColorStop(0.5, `rgba(103,232,249,${s.life * 0.3})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Vignette ──
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.28, W/2, H/2, H*0.9);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(2,6,23,0.78)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // Bottom fade
      const bot = ctx.createLinearGradient(0, H * 0.55, 0, H);
      bot.addColorStop(0, "transparent");
      bot.addColorStop(1, "rgba(2,6,23,0.48)");
      ctx.fillStyle = bot;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shootInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}