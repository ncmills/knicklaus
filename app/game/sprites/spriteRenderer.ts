import { SPRITE_WIDTH, SPRITE_HEIGHT } from '../constants';
import { Direction, StatusEffect } from '../types';
import { generatePlayerSpriteSheet } from './playerSprite';

let spriteSheet: HTMLCanvasElement | null = null;

export function initPlayerSprite() {
  spriteSheet = generatePlayerSpriteSheet();
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  pixelX: number,
  pixelY: number,
  direction: Direction,
  walkFrame: number,
  cameraX: number,
  cameraY: number,
  statusEffect: StatusEffect,
  frameCount: number
) {
  if (!spriteSheet) return;

  const screenX = Math.round(pixelX - cameraX);
  const screenY = Math.round(pixelY - cameraY);

  // Offset so sprite is centered on the tile and feet align with tile bottom
  const drawX = screenX - (SPRITE_WIDTH - 16) / 2;
  const drawY = screenY - (SPRITE_HEIGHT - 16);

  ctx.save();

  // Drunk: sway the sprite
  if (statusEffect === StatusEffect.Drunk) {
    const sway = Math.sin(frameCount * 0.15) * 2;
    ctx.translate(drawX + SPRITE_WIDTH / 2, drawY + SPRITE_HEIGHT);
    ctx.rotate(Math.sin(frameCount * 0.1) * 0.08);
    ctx.translate(-(drawX + SPRITE_WIDTH / 2) + sway, -(drawY + SPRITE_HEIGHT));
  }

  // Wet: slight blue tint via globalAlpha trick
  if (statusEffect === StatusEffect.Wet) {
    // Draw drip particles
    for (let i = 0; i < 3; i++) {
      const dripY = (frameCount * 2 + i * 7) % 10;
      const dripX = drawX + 4 + i * 4;
      ctx.fillStyle = 'rgba(100, 180, 255, 0.6)';
      ctx.fillRect(dripX, drawY + SPRITE_HEIGHT - 2 + dripY, 1, 2);
    }
  }

  // Source rect from sprite sheet
  const srcX = walkFrame * SPRITE_WIDTH;
  const srcY = direction * SPRITE_HEIGHT;

  ctx.drawImage(
    spriteSheet,
    srcX, srcY, SPRITE_WIDTH, SPRITE_HEIGHT,
    drawX, drawY, SPRITE_WIDTH, SPRITE_HEIGHT
  );

  ctx.restore();
}
