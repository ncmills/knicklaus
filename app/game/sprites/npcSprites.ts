import { SPRITE_WIDTH, SPRITE_HEIGHT } from '../constants';

const _ = null;

// ── FISHERMAN: hat, vest, fishing rod ──
const K = '#1a1a2e';  // outline
const H = '#4a6b8a';  // hat blue
const S = '#f5deb3';  // skin
const V = '#8b5e3c';  // vest brown
const W = '#ffffff';   // white shirt
const R = '#6b4226';  // rod brown
const G = '#4a4a6a';  // gray

const fishermanDown: (string | null)[][] = [
  [_,_,_,_,_,H,H,H,H,H,H,_,_,_,_,_],
  [_,_,_,_,H,H,H,H,H,H,H,H,_,_,_,_],
  [_,_,_,H,H,H,H,H,H,H,H,H,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,S,_,_,_,_],
  [_,_,_,K,S,K,S,S,S,K,S,S,K,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,_,_,_,_,_],
  [_,_,_,_,S,S,S,K,S,S,S,_,_,_,_,_],
  [_,_,_,_,_,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,V,V,W,W,W,W,W,V,V,_,_,R,_],
  [_,_,_,V,W,W,W,W,W,W,W,V,_,_,R,_],
  [_,_,_,V,W,W,W,W,W,W,W,V,_,_,R,_],
  [_,_,_,V,W,W,W,W,W,W,W,V,_,_,R,_],
  [_,_,_,_,V,W,W,W,W,W,V,_,_,_,R,_],
  [_,_,_,_,V,V,V,V,V,V,V,_,_,_,R,_],
  [_,_,_,_,G,G,G,_,G,G,G,_,_,R,_,_],
  [_,_,_,_,G,G,G,_,G,G,G,_,_,R,_,_],
  [_,_,_,_,G,G,G,_,G,G,G,_,R,_,_,_],
  [_,_,_,_,G,G,_,_,_,G,G,_,R,_,_,_],
  [_,_,_,K,K,K,_,_,_,K,K,K,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// ── BARTENDER: apron, bald/short hair ──
const AP = '#f0f0f0';  // apron white
const SH = '#3d3d3d';  // short dark hair

const bartenderDown: (string | null)[][] = [
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,SH,SH,SH,SH,SH,_,_,_,_,_,_],
  [_,_,_,_,SH,SH,SH,SH,SH,SH,SH,_,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,_,_,_,_,_],
  [_,_,_,K,S,K,S,S,S,K,S,K,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,_,_,_,_,_],
  [_,_,_,_,S,S,K,S,K,S,S,_,_,_,_,_],
  [_,_,_,_,_,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,K,K,W,W,W,W,W,K,K,_,_,_,_],
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  [_,_,_,AP,AP,AP,AP,AP,AP,AP,AP,AP,_,_,_,_],
  [_,_,_,AP,AP,AP,AP,AP,AP,AP,AP,AP,_,_,_,_],
  [_,_,_,AP,AP,AP,AP,AP,AP,AP,AP,AP,_,_,_,_],
  [_,_,_,_,AP,AP,AP,AP,AP,AP,AP,_,_,_,_,_],
  [_,_,_,_,K,K,K,_,K,K,K,_,_,_,_,_],
  [_,_,_,_,K,K,K,_,K,K,K,_,_,_,_,_],
  [_,_,_,_,K,K,K,_,K,K,K,_,_,_,_,_],
  [_,_,_,_,K,K,_,_,_,K,K,_,_,_,_,_],
  [_,_,_,K,K,K,_,_,_,K,K,K,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// ── OLD MAN: white hair, cane ──
const WH = '#d4d4d4'; // white hair
const CA = '#6b4226';  // cane

const oldManDown: (string | null)[][] = [
  [_,_,_,_,_,WH,WH,WH,WH,WH,_,_,_,_,_,_],
  [_,_,_,_,WH,WH,WH,WH,WH,WH,WH,_,_,_,_,_],
  [_,_,_,_,WH,WH,WH,WH,WH,WH,WH,_,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,_,_,_,_,_],
  [_,_,_,K,S,K,S,S,S,K,S,K,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,_,_,_,_,_],
  [_,_,_,_,S,S,S,K,S,S,S,_,_,_,_,_],
  [_,_,_,_,_,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,V,V,V,V,V,V,V,V,V,_,_,_,_],
  [_,_,_,V,V,V,V,V,V,V,V,V,_,_,_,_],
  [_,_,_,V,V,V,V,V,V,V,V,V,_,CA,_,_],
  [_,_,_,V,V,V,V,V,V,V,V,V,_,CA,_,_],
  [_,_,_,_,V,V,V,V,V,V,V,_,_,CA,_,_],
  [_,_,_,_,V,V,V,V,V,V,V,_,_,CA,_,_],
  [_,_,_,_,G,G,G,_,G,G,G,_,CA,_,_,_],
  [_,_,_,_,G,G,G,_,G,G,G,_,CA,_,_,_],
  [_,_,_,_,G,G,G,_,G,G,G,CA,_,_,_,_],
  [_,_,_,_,G,G,_,_,_,G,G,CA,_,_,_,_],
  [_,_,_,K,K,K,_,_,_,K,K,K,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

const NPC_SPRITES: Record<string, (string | null)[][]> = {
  fisherman: fishermanDown,
  bartender: bartenderDown,
  oldman: oldManDown,
};

let npcSpriteSheets: Record<string, HTMLCanvasElement> = {};

export function initNpcSprites() {
  for (const [key, pixels] of Object.entries(NPC_SPRITES)) {
    const canvas = document.createElement('canvas');
    canvas.width = SPRITE_WIDTH;
    canvas.height = SPRITE_HEIGHT;
    const ctx = canvas.getContext('2d')!;

    for (let y = 0; y < SPRITE_HEIGHT; y++) {
      for (let x = 0; x < SPRITE_WIDTH; x++) {
        const color = pixels[y]?.[x];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    npcSpriteSheets[key] = canvas;
  }
}

export function drawNpc(
  ctx: CanvasRenderingContext2D,
  spriteKey: string,
  pixelX: number,
  pixelY: number,
  cameraX: number,
  cameraY: number
) {
  const sprite = npcSpriteSheets[spriteKey];
  if (!sprite) return;

  const screenX = Math.round(pixelX - cameraX);
  const screenY = Math.round(pixelY - cameraY);

  const drawX = screenX - (SPRITE_WIDTH - 16) / 2;
  const drawY = screenY - (SPRITE_HEIGHT - 16);

  ctx.drawImage(sprite, drawX, drawY, SPRITE_WIDTH, SPRITE_HEIGHT);
}
