import { SPRITE_WIDTH, SPRITE_HEIGHT } from '../constants';

// Color palette for the character
const _ = null;         // transparent
const K = '#1a1a2e';   // black (outline, hair, glasses)
const H = '#4a3728';   // dark brown (hair)
const S = '#f5deb3';   // skin tone
const W = '#ffffff';   // white (shirt, eyes)
const G = '#4a4a6a';   // glasses frame gray
const B = '#2d2d4a';   // dark (pants)
const E = '#87CEEB';   // shirt collar accent
const P = '#d4a574';   // skin shadow

// Each frame is SPRITE_HEIGHT rows x SPRITE_WIDTH cols
// Character: curly hair, glasses, collared shirt, dark pants
// 16x20 pixels

type PixelRow = (string | null)[];

// ── DOWN-FACING FRAMES ──
const downStand: PixelRow[] = [
  // Row 0-3: Hair
  [_,_,_,_,_,H,H,H,H,H,H,_,_,_,_,_],
  [_,_,_,_,H,K,H,K,H,K,H,H,_,_,_,_],
  [_,_,_,H,K,H,K,H,K,H,K,H,H,_,_,_],
  [_,_,_,H,H,K,H,H,H,K,H,H,H,_,_,_],
  // Row 4-7: Face with glasses
  [_,_,_,H,S,S,S,S,S,S,S,S,H,_,_,_],
  [_,_,_,K,G,G,G,S,G,G,G,S,K,_,_,_],
  [_,_,_,K,G,W,G,S,G,W,G,S,K,_,_,_],
  [_,_,_,S,G,G,G,S,G,G,G,S,S,_,_,_],
  // Row 8-9: Nose, mouth
  [_,_,_,_,S,S,S,P,S,S,S,S,_,_,_,_],
  [_,_,_,_,S,S,P,S,P,S,S,_,_,_,_,_],
  // Row 10-13: Collar & shirt
  [_,_,_,_,_,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,E,E,W,W,W,W,W,E,E,_,_,_,_],
  [_,_,E,E,W,W,W,W,W,W,W,E,E,_,_,_],
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  // Row 14-16: Lower shirt
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  [_,_,_,_,W,W,W,W,W,W,W,_,_,_,_,_],
  // Row 17-19: Pants & feet
  [_,_,_,_,B,B,B,_,B,B,B,_,_,_,_,_],
  [_,_,_,_,B,B,B,_,B,B,B,_,_,_,_,_],
  [_,_,_,K,K,K,_,_,_,K,K,K,_,_,_,_],
];

const downWalk1: PixelRow[] = [
  // Same upper body, different leg position
  ...downStand.slice(0, 17),
  [_,_,_,_,_,B,B,_,B,B,B,_,_,_,_,_],
  [_,_,_,_,_,B,B,_,B,B,_,_,_,_,_,_],
  [_,_,_,_,K,K,_,_,_,_,K,K,_,_,_,_],
];

const downWalk2: PixelRow[] = [
  ...downStand.slice(0, 17),
  [_,_,_,_,B,B,B,_,B,B,_,_,_,_,_,_],
  [_,_,_,_,B,B,_,_,B,B,_,_,_,_,_,_],
  [_,_,_,K,K,_,_,_,_,K,K,_,_,_,_,_],
];

// ── UP-FACING FRAMES ──
const upStand: PixelRow[] = [
  [_,_,_,_,_,H,H,H,H,H,H,_,_,_,_,_],
  [_,_,_,_,H,H,K,H,K,H,H,H,_,_,_,_],
  [_,_,_,H,H,K,H,K,H,K,H,H,H,_,_,_],
  [_,_,_,H,H,H,H,H,H,H,H,H,H,_,_,_],
  [_,_,_,H,S,S,S,S,S,S,S,S,H,_,_,_],
  [_,_,_,K,S,S,S,S,S,S,S,S,K,_,_,_],
  [_,_,_,K,S,S,S,S,S,S,S,S,K,_,_,_],
  [_,_,_,S,S,S,S,S,S,S,S,S,S,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,S,_,_,_,_],
  [_,_,_,_,S,S,S,S,S,S,S,_,_,_,_,_],
  [_,_,_,_,_,S,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,E,E,W,W,W,W,W,E,E,_,_,_,_],
  [_,_,E,E,W,W,W,W,W,W,W,E,E,_,_,_],
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  [_,_,_,W,W,W,W,W,W,W,W,W,_,_,_,_],
  [_,_,_,_,W,W,W,W,W,W,W,_,_,_,_,_],
  [_,_,_,_,B,B,B,_,B,B,B,_,_,_,_,_],
  [_,_,_,_,B,B,B,_,B,B,B,_,_,_,_,_],
  [_,_,_,K,K,K,_,_,_,K,K,K,_,_,_,_],
];

const upWalk1: PixelRow[] = [
  ...upStand.slice(0, 17),
  [_,_,_,_,_,B,B,_,B,B,B,_,_,_,_,_],
  [_,_,_,_,_,B,B,_,B,B,_,_,_,_,_,_],
  [_,_,_,_,K,K,_,_,_,_,K,K,_,_,_,_],
];

const upWalk2: PixelRow[] = [
  ...upStand.slice(0, 17),
  [_,_,_,_,B,B,B,_,B,B,_,_,_,_,_,_],
  [_,_,_,_,B,B,_,_,B,B,_,_,_,_,_,_],
  [_,_,_,K,K,_,_,_,_,K,K,_,_,_,_,_],
];

// ── LEFT-FACING FRAMES ──
const leftStand: PixelRow[] = [
  [_,_,_,_,H,H,H,H,H,H,_,_,_,_,_,_],
  [_,_,_,H,K,H,K,H,K,H,H,_,_,_,_,_],
  [_,_,H,K,H,K,H,K,H,H,_,_,_,_,_,_],
  [_,_,H,H,H,H,H,H,H,H,_,_,_,_,_,_],
  [_,_,H,S,S,S,S,S,S,H,_,_,_,_,_,_],
  [_,_,K,G,G,G,S,S,S,K,_,_,_,_,_,_],
  [_,_,K,G,W,G,S,S,S,K,_,_,_,_,_,_],
  [_,_,S,G,G,G,S,S,S,S,_,_,_,_,_,_],
  [_,_,_,S,S,P,S,S,S,_,_,_,_,_,_,_],
  [_,_,_,S,S,P,S,S,_,_,_,_,_,_,_,_],
  [_,_,_,_,S,S,S,S,_,_,_,_,_,_,_,_],
  [_,_,_,E,W,W,W,W,E,_,_,_,_,_,_,_],
  [_,_,E,W,W,W,W,W,W,_,_,_,_,_,_,_],
  [_,_,_,W,W,W,W,W,W,_,_,_,_,_,_,_],
  [_,_,_,W,W,W,W,W,_,_,_,_,_,_,_,_],
  [_,_,_,W,W,W,W,W,_,_,_,_,_,_,_,_],
  [_,_,_,_,W,W,W,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,B,B,B,B,_,_,_,_,_,_,_,_],
  [_,_,_,_,B,B,B,B,_,_,_,_,_,_,_,_],
  [_,_,_,K,K,_,K,K,K,_,_,_,_,_,_,_],
];

const leftWalk1: PixelRow[] = [
  ...leftStand.slice(0, 17),
  [_,_,_,_,_,B,B,B,_,_,_,_,_,_,_,_],
  [_,_,_,_,B,B,_,B,_,_,_,_,_,_,_,_],
  [_,_,_,K,K,_,_,K,K,_,_,_,_,_,_,_],
];

const leftWalk2: PixelRow[] = [
  ...leftStand.slice(0, 17),
  [_,_,_,_,B,B,B,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,B,_,B,B,_,_,_,_,_,_,_,_],
  [_,_,_,_,K,_,_,K,K,_,_,_,_,_,_,_],
];

// ── RIGHT-FACING = mirror of LEFT ──
function mirrorFrame(frame: PixelRow[]): PixelRow[] {
  return frame.map(row => [...row].reverse());
}

const rightStand = mirrorFrame(leftStand);
const rightWalk1 = mirrorFrame(leftWalk1);
const rightWalk2 = mirrorFrame(leftWalk2);

// All frames indexed by [direction][frame]
// Direction order: Down=0, Left=1, Right=2, Up=3
export const PLAYER_FRAMES: PixelRow[][][] = [
  [downStand, downWalk1, downWalk2],   // Down
  [leftStand, leftWalk1, leftWalk2],   // Left
  [rightStand, rightWalk1, rightWalk2], // Right
  [upStand, upWalk1, upWalk2],         // Up
];

// Render all frames to a single canvas for efficient drawing
export function generatePlayerSpriteSheet(): HTMLCanvasElement {
  const cols = 3; // frames per direction
  const rows = 4; // directions
  const canvas = document.createElement('canvas');
  canvas.width = SPRITE_WIDTH * cols;
  canvas.height = SPRITE_HEIGHT * rows;
  const ctx = canvas.getContext('2d')!;

  for (let dir = 0; dir < rows; dir++) {
    for (let frame = 0; frame < cols; frame++) {
      const pixels = PLAYER_FRAMES[dir][frame];
      const offsetX = frame * SPRITE_WIDTH;
      const offsetY = dir * SPRITE_HEIGHT;

      for (let y = 0; y < SPRITE_HEIGHT; y++) {
        for (let x = 0; x < SPRITE_WIDTH; x++) {
          const color = pixels[y]?.[x];
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(offsetX + x, offsetY + y, 1, 1);
          }
        }
      }
    }
  }

  return canvas;
}
