import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';

export function applyDrunkRender(
  ctx: CanvasRenderingContext2D,
  frameCount: number
) {
  // Heavy screen wobble
  const wobbleX = Math.sin(frameCount * 0.08) * 8;
  const wobbleY = Math.cos(frameCount * 0.11) * 5;

  ctx.save();
  ctx.translate(wobbleX, wobbleY);

  // Noticeable rotation
  ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  ctx.rotate(Math.sin(frameCount * 0.05) * 0.04);
  ctx.translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);
}

export function finishDrunkRender(
  ctx: CanvasRenderingContext2D,
  frameCount: number
) {
  ctx.restore();

  // Strong warm/blurry overlay that pulses
  const pulse = 0.12 + Math.sin(frameCount * 0.06) * 0.05;
  ctx.fillStyle = `rgba(255, 180, 60, ${pulse})`;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Double vision effect — draw faint offset copy
  ctx.globalAlpha = 0.15;
  ctx.drawImage(ctx.canvas, 3, 2);
  ctx.globalAlpha = 1.0;

  // Vignette — dark edges
  const gradient = ctx.createRadialGradient(
    CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH * 0.25,
    CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH * 0.6
  );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Floating "bubbles"
  ctx.fillStyle = 'rgba(255, 255, 200, 0.3)';
  for (let i = 0; i < 6; i++) {
    const bx = (CANVAS_WIDTH * 0.2 + i * 70 + Math.sin(frameCount * 0.03 + i) * 30) % CANVAS_WIDTH;
    const by = (CANVAS_HEIGHT - (frameCount * 0.5 + i * 60) % CANVAS_HEIGHT);
    const size = 2 + Math.sin(frameCount * 0.1 + i) * 1;
    ctx.beginPath();
    ctx.arc(bx, by, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Modify movement to be erratic
export function getDrunkMovementDrift(frameCount: number): { dx: number; dy: number } {
  if (Math.random() < 0.3) {
    return {
      dx: Math.round(Math.sin(frameCount * 0.2) * 0.5),
      dy: Math.round(Math.cos(frameCount * 0.17) * 0.3),
    };
  }
  return { dx: 0, dy: 0 };
}
