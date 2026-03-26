import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
}

interface Splat {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

let rainDrops: RainDrop[] = [];
let splats: Splat[] = [];

export function initRainDrops() {
  rainDrops = [];
  splats = [];
  // Way more rain drops for full world view
  for (let i = 0; i < 200; i++) {
    rainDrops.push({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      speed: 3 + Math.random() * 4,
      length: 4 + Math.random() * 8,
    });
  }
}

export function applyWetRender(
  ctx: CanvasRenderingContext2D,
  frameCount: number
) {
  if (rainDrops.length === 0) initRainDrops();

  // Strong blue tint overlay
  ctx.fillStyle = 'rgba(40, 100, 180, 0.18)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Heavy rain
  ctx.strokeStyle = 'rgba(180, 220, 255, 0.6)';
  ctx.lineWidth = 1;

  for (const drop of rainDrops) {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x - 2, drop.y + drop.length);
    ctx.stroke();

    // Move drop
    drop.y += drop.speed;
    drop.x -= 1;

    // When hitting bottom, create splat
    if (drop.y > CANVAS_HEIGHT) {
      splats.push({
        x: drop.x,
        y: CANVAS_HEIGHT - 2,
        size: 1,
        alpha: 0.5,
      });
      drop.y = -drop.length;
      drop.x = Math.random() * CANVAS_WIDTH;
    }
  }

  // Water spots/splats on screen
  ctx.fillStyle = 'rgba(150, 200, 255, 0.25)';
  for (let i = splats.length - 1; i >= 0; i--) {
    const splat = splats[i];
    ctx.beginPath();
    ctx.arc(splat.x, splat.y, splat.size, 0, Math.PI * 2);
    ctx.fill();
    splat.size += 0.3;
    splat.alpha -= 0.02;
    if (splat.alpha <= 0) {
      splats.splice(i, 1);
    }
  }

  // Water droplets on "lens" — big spotty drops that persist
  ctx.fillStyle = 'rgba(120, 180, 240, 0.12)';
  for (let i = 0; i < 12; i++) {
    const dx = ((i * 137 + 50) % CANVAS_WIDTH);
    const dy = ((i * 89 + 30) % CANVAS_HEIGHT);
    const r = 8 + (i % 5) * 4;
    ctx.beginPath();
    ctx.arc(dx, dy, r, 0, Math.PI * 2);
    ctx.fill();
    // Highlight on droplet
    ctx.fillStyle = 'rgba(200, 230, 255, 0.08)';
    ctx.beginPath();
    ctx.arc(dx - r * 0.2, dy - r * 0.2, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(120, 180, 240, 0.12)';
  }

  // Ripple circles — periodic
  if (frameCount % 20 === 0) {
    for (let i = 0; i < 3; i++) {
      const rx = Math.random() * CANVAS_WIDTH;
      const ry = Math.random() * CANVAS_HEIGHT;
      ctx.strokeStyle = 'rgba(150, 200, 255, 0.3)';
      ctx.lineWidth = 1;
      const rippleSize = (frameCount % 60) / 60 * 6;
      ctx.beginPath();
      ctx.arc(rx, ry, rippleSize, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Darker vignette for stormy feel
  const gradient = ctx.createRadialGradient(
    CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH * 0.3,
    CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH * 0.6
  );
  gradient.addColorStop(0, 'rgba(0, 0, 30, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 30, 0.25)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawSplash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number
) {
  const progress = frame / 20;
  if (progress > 1) return;

  const numParticles = 8;
  const radius = progress * 12;
  const alpha = 1 - progress;

  ctx.fillStyle = `rgba(100, 180, 255, ${alpha * 0.7})`;
  for (let i = 0; i < numParticles; i++) {
    const angle = (i / numParticles) * Math.PI * 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius * 0.6;
    ctx.fillRect(px, py, 2, 2);
  }
}
