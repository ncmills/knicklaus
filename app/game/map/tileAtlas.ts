import { TILE_SIZE } from '../constants';
import { TileType } from '../types';

// GBA-era color palette
const COLORS = {
  // Grass
  grassLight: '#5cb85c',
  grassDark: '#4a9e4a',
  grassTuft: '#3d8b3d',
  // Path
  pathMain: '#d4a574',
  pathEdge: '#c49464',
  pathLight: '#e0b888',
  // Water
  waterDeep: '#3b82f6',
  waterMid: '#60a5fa',
  waterLight: '#93c5fd',
  waterShine: '#bfdbfe',
  // Trees
  trunkDark: '#6b4226',
  trunkLight: '#8b5e3c',
  leafDark: '#2d6b2d',
  leafMid: '#3d8b3d',
  leafLight: '#5cb85c',
  // Buildings
  stoneDark: '#7c7c8a',
  stoneLight: '#9c9ca8',
  stoneLine: '#5c5c6a',
  woodDark: '#6b4226',
  woodLight: '#8b5e3c',
  // Roof colors (per gym theme)
  roofRed: '#c0392b',
  roofGreen: '#27ae60',
  roofGold: '#d4a017',
  roofOrange: '#e07832',
  roofCoral: '#e8664a',
  roofNavy: '#2c3e6b',
  roofDarkWood: '#4a3020',
  // Decorative
  fenceColor: '#8b5e3c',
  flowerPink: '#ff69b4',
  flowerYellow: '#ffd700',
  flowerWhite: '#ffffff',
  // Signs
  signWood: '#8b5e3c',
  signDark: '#5c3a1e',
  // Objects
  benchColor: '#8b5e3c',
  mailboxRed: '#c0392b',
  mailboxPost: '#6b6b6b',
  // Reeds/lily
  reedGreen: '#4a8b4a',
  lilyGreen: '#3d8b3d',
  lilyPink: '#ff8fab',
  // Lantern
  lanternYellow: '#ffd700',
  lanternFrame: '#4a4a4a',
};

type TileDrawer = (ctx: CanvasRenderingContext2D, x: number, y: number) => void;

function drawGrass(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Subtle variation
  ctx.fillStyle = COLORS.grassDark;
  ctx.fillRect(x + 3, y + 5, 1, 1);
  ctx.fillRect(x + 10, y + 2, 1, 1);
  ctx.fillRect(x + 7, y + 11, 1, 1);
}

function drawGrassAlt(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Tufts
  ctx.fillStyle = COLORS.grassTuft;
  ctx.fillRect(x + 2, y + 3, 2, 1);
  ctx.fillRect(x + 3, y + 2, 1, 1);
  ctx.fillRect(x + 11, y + 9, 2, 1);
  ctx.fillRect(x + 12, y + 8, 1, 1);
  ctx.fillRect(x + 6, y + 13, 2, 1);
  ctx.fillRect(x + 7, y + 12, 1, 1);
}

function drawPath(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.pathMain;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Subtle pebble detail
  ctx.fillStyle = COLORS.pathLight;
  ctx.fillRect(x + 4, y + 3, 2, 1);
  ctx.fillRect(x + 10, y + 8, 2, 1);
  ctx.fillRect(x + 6, y + 12, 1, 1);
  ctx.fillStyle = COLORS.pathEdge;
  ctx.fillRect(x + 2, y + 7, 1, 1);
  ctx.fillRect(x + 12, y + 4, 1, 1);
}

function drawWater(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number = 0) {
  ctx.fillStyle = COLORS.waterDeep;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Animated wave highlights
  const offset = frame * 3;
  ctx.fillStyle = COLORS.waterMid;
  ctx.fillRect(x + ((2 + offset) % 14), y + 3, 4, 1);
  ctx.fillRect(x + ((8 + offset) % 14), y + 9, 3, 1);
  ctx.fillStyle = COLORS.waterLight;
  ctx.fillRect(x + ((5 + offset) % 14), y + 6, 2, 1);
  ctx.fillRect(x + ((11 + offset) % 12), y + 12, 2, 1);
  ctx.fillStyle = COLORS.waterShine;
  ctx.fillRect(x + ((3 + offset) % 13), y + 4, 1, 1);
}

function drawWaterEdge(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Grass base with water bottom half
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, 6);
  ctx.fillStyle = COLORS.waterDeep;
  ctx.fillRect(x, y + 6, TILE_SIZE, 10);
  // Sandy edge
  ctx.fillStyle = COLORS.pathMain;
  ctx.fillRect(x, y + 5, TILE_SIZE, 2);
}

function drawTreeTrunk(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = COLORS.trunkDark;
  ctx.fillRect(x + 6, y, 4, TILE_SIZE);
  ctx.fillStyle = COLORS.trunkLight;
  ctx.fillRect(x + 7, y, 2, TILE_SIZE);
}

function drawTreeCanopy(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.leafDark;
  ctx.fillRect(x + 1, y + 4, 14, 10);
  ctx.fillRect(x + 3, y + 2, 10, 2);
  ctx.fillStyle = COLORS.leafMid;
  ctx.fillRect(x + 2, y + 5, 12, 8);
  ctx.fillRect(x + 4, y + 3, 8, 2);
  ctx.fillStyle = COLORS.leafLight;
  ctx.fillRect(x + 4, y + 5, 4, 3);
  ctx.fillRect(x + 9, y + 7, 3, 2);
  // Top highlight
  ctx.fillRect(x + 5, y + 3, 3, 1);
}

function drawFence(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = COLORS.fenceColor;
  // Posts
  ctx.fillRect(x + 2, y + 4, 2, 10);
  ctx.fillRect(x + 12, y + 4, 2, 10);
  // Rails
  ctx.fillRect(x, y + 6, TILE_SIZE, 2);
  ctx.fillRect(x, y + 11, TILE_SIZE, 2);
}

function drawFlowers(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Pink flower
  ctx.fillStyle = COLORS.flowerPink;
  ctx.fillRect(x + 3, y + 4, 2, 2);
  ctx.fillRect(x + 2, y + 5, 1, 1);
  ctx.fillRect(x + 5, y + 5, 1, 1);
  // Yellow flower
  ctx.fillStyle = COLORS.flowerYellow;
  ctx.fillRect(x + 10, y + 8, 2, 2);
  ctx.fillRect(x + 9, y + 9, 1, 1);
  ctx.fillRect(x + 12, y + 9, 1, 1);
  // White flower
  ctx.fillStyle = COLORS.flowerWhite;
  ctx.fillRect(x + 6, y + 12, 2, 2);
  // Stems
  ctx.fillStyle = COLORS.grassTuft;
  ctx.fillRect(x + 3, y + 6, 1, 3);
  ctx.fillRect(x + 10, y + 10, 1, 3);
  ctx.fillRect(x + 6, y + 14, 1, 2);
}

function makeRoofDrawer(color: string): TileDrawer {
  return (ctx, x, y) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Roof tile pattern
    const darker = shadeColor(color, -20);
    ctx.fillStyle = darker;
    for (let row = 0; row < TILE_SIZE; row += 4) {
      const offset = (row / 4) % 2 === 0 ? 0 : 4;
      for (let col = offset; col < TILE_SIZE; col += 8) {
        ctx.fillRect(x + col, y + row, 1, 4);
      }
      ctx.fillRect(x, y + row + 3, TILE_SIZE, 1);
    }
  };
}

function drawWallStone(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.stoneLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = COLORS.stoneLine;
  // Brick pattern
  for (let row = 0; row < TILE_SIZE; row += 4) {
    ctx.fillRect(x, y + row + 3, TILE_SIZE, 1);
    const offset = (row / 4) % 2 === 0 ? 0 : 4;
    for (let col = offset; col < TILE_SIZE; col += 8) {
      ctx.fillRect(x + col, y + row, 1, 4);
    }
  }
}

function drawWallWood(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.woodLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = COLORS.woodDark;
  // Vertical wood grain
  for (let col = 0; col < TILE_SIZE; col += 4) {
    ctx.fillRect(x + col, y, 1, TILE_SIZE);
  }
}

function drawDoor(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.stoneLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Door frame
  ctx.fillStyle = COLORS.woodDark;
  ctx.fillRect(x + 3, y + 2, 10, 14);
  ctx.fillStyle = COLORS.woodLight;
  ctx.fillRect(x + 4, y + 3, 8, 13);
  // Door handle
  ctx.fillStyle = COLORS.lanternFrame;
  ctx.fillRect(x + 10, y + 9, 1, 2);
  // Doormat
  ctx.fillStyle = COLORS.pathEdge;
  ctx.fillRect(x + 4, y + 14, 8, 2);
}

function drawGymSign(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Sign post
  ctx.fillStyle = COLORS.signDark;
  ctx.fillRect(x + 7, y + 8, 2, 8);
  // Sign board
  ctx.fillStyle = COLORS.signWood;
  ctx.fillRect(x + 2, y + 2, 12, 7);
  ctx.fillStyle = COLORS.signDark;
  ctx.fillRect(x + 2, y + 2, 12, 1);
  ctx.fillRect(x + 2, y + 8, 12, 1);
  ctx.fillRect(x + 2, y + 2, 1, 7);
  ctx.fillRect(x + 13, y + 2, 1, 7);
  // "GYM" text hint
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 4, y + 4, 1, 3);
  ctx.fillRect(x + 5, y + 6, 1, 1);
  ctx.fillRect(x + 6, y + 4, 1, 3);
  ctx.fillRect(x + 8, y + 4, 3, 1);
  ctx.fillRect(x + 9, y + 5, 1, 1);
  ctx.fillRect(x + 9, y + 6, 1, 1);
}

function drawTownSign(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Sign posts
  ctx.fillStyle = COLORS.signDark;
  ctx.fillRect(x + 3, y + 8, 2, 8);
  ctx.fillRect(x + 11, y + 8, 2, 8);
  // Sign board
  ctx.fillStyle = COLORS.signWood;
  ctx.fillRect(x + 1, y + 2, 14, 7);
  // Border
  ctx.fillStyle = COLORS.signDark;
  ctx.fillRect(x + 1, y + 2, 14, 1);
  ctx.fillRect(x + 1, y + 8, 14, 1);
  ctx.fillRect(x + 1, y + 2, 1, 7);
  ctx.fillRect(x + 14, y + 2, 1, 7);
}

function drawBench(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Bench legs
  ctx.fillStyle = COLORS.woodDark;
  ctx.fillRect(x + 3, y + 10, 2, 4);
  ctx.fillRect(x + 11, y + 10, 2, 4);
  // Seat
  ctx.fillStyle = COLORS.benchColor;
  ctx.fillRect(x + 2, y + 8, 12, 3);
  // Back rest
  ctx.fillStyle = COLORS.woodDark;
  ctx.fillRect(x + 2, y + 5, 12, 2);
  ctx.fillRect(x + 3, y + 4, 1, 1);
  ctx.fillRect(x + 12, y + 4, 1, 1);
}

function drawMailbox(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Post
  ctx.fillStyle = COLORS.mailboxPost;
  ctx.fillRect(x + 7, y + 8, 2, 8);
  // Mailbox body
  ctx.fillStyle = COLORS.mailboxRed;
  ctx.fillRect(x + 4, y + 3, 8, 6);
  // Rounded top
  ctx.fillRect(x + 5, y + 2, 6, 1);
  // Flag
  ctx.fillStyle = COLORS.lanternFrame;
  ctx.fillRect(x + 12, y + 3, 1, 4);
  ctx.fillStyle = COLORS.mailboxRed;
  ctx.fillRect(x + 12, y + 3, 2, 2);
}

function drawBioSign(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawTownSign(ctx, x, y); // Same visual as town sign
}

function drawLilyPad(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.waterDeep;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Lily pad
  ctx.fillStyle = COLORS.lilyGreen;
  ctx.beginPath();
  ctx.arc(x + 8, y + 8, 4, 0, Math.PI * 2);
  ctx.fill();
  // Notch
  ctx.fillStyle = COLORS.waterDeep;
  ctx.fillRect(x + 8, y + 5, 3, 1);
  // Flower
  ctx.fillStyle = COLORS.lilyPink;
  ctx.fillRect(x + 7, y + 6, 2, 2);
}

function drawReeds(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.waterDeep;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Reeds
  ctx.fillStyle = COLORS.reedGreen;
  ctx.fillRect(x + 3, y + 2, 1, 14);
  ctx.fillRect(x + 7, y + 4, 1, 12);
  ctx.fillRect(x + 11, y + 1, 1, 15);
  // Reed tops
  ctx.fillRect(x + 2, y + 1, 3, 2);
  ctx.fillRect(x + 6, y + 3, 3, 2);
  ctx.fillRect(x + 10, y + 0, 3, 2);
}

function drawLantern(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = COLORS.grassLight;
  ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // Post
  ctx.fillStyle = COLORS.lanternFrame;
  ctx.fillRect(x + 7, y + 6, 2, 10);
  // Lantern top
  ctx.fillRect(x + 5, y + 3, 6, 1);
  // Glass
  ctx.fillStyle = COLORS.lanternYellow;
  ctx.fillRect(x + 5, y + 4, 6, 3);
  // Glow effect
  ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
  ctx.fillRect(x + 4, y + 3, 8, 6);
}

function drawEmpty(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // transparent - draw nothing
}

// Utility to shade a hex color
function shadeColor(color: string, amount: number): string {
  const num = parseInt(color.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Map tile types to their draw functions
const tileDrawers: Record<number, TileDrawer> = {
  [TileType.Grass]: drawGrass,
  [TileType.GrassAlt]: drawGrassAlt,
  [TileType.Path]: drawPath,
  [TileType.PathEdgeTop]: drawPath,
  [TileType.PathEdgeBottom]: drawPath,
  [TileType.PathEdgeLeft]: drawPath,
  [TileType.PathEdgeRight]: drawPath,
  [TileType.Water]: drawWater,
  [TileType.WaterEdge]: drawWaterEdge,
  [TileType.TreeTrunk]: drawTreeTrunk,
  [TileType.TreeCanopy]: drawTreeCanopy,
  [TileType.Fence]: drawFence,
  [TileType.Flowers]: drawFlowers,
  [TileType.WallStone]: drawWallStone,
  [TileType.WallWood]: drawWallWood,
  [TileType.RoofRed]: makeRoofDrawer(COLORS.roofRed),
  [TileType.RoofGreen]: makeRoofDrawer(COLORS.roofGreen),
  [TileType.RoofGold]: makeRoofDrawer(COLORS.roofGold),
  [TileType.RoofOrange]: makeRoofDrawer(COLORS.roofOrange),
  [TileType.RoofCoral]: makeRoofDrawer(COLORS.roofCoral),
  [TileType.RoofNavy]: makeRoofDrawer(COLORS.roofNavy),
  [TileType.RoofDarkWood]: makeRoofDrawer(COLORS.roofDarkWood),
  [TileType.Door]: drawDoor,
  [TileType.GymSign]: drawGymSign,
  [TileType.TownSign]: drawTownSign,
  [TileType.Bench]: drawBench,
  [TileType.Mailbox]: drawMailbox,
  [TileType.BioSign]: drawBioSign,
  [TileType.LilyPad]: drawLilyPad,
  [TileType.Reeds]: drawReeds,
  [TileType.Lantern]: drawLantern,
  [TileType.Empty]: drawEmpty,
};

// Pre-render all tiles to a tile atlas canvas
export function generateTileAtlas(): HTMLCanvasElement {
  const tileCount = Object.keys(tileDrawers).length;
  const cols = 8;
  const rows = Math.ceil(tileCount / cols);
  const canvas = document.createElement('canvas');
  canvas.width = cols * TILE_SIZE;
  canvas.height = rows * TILE_SIZE;
  const ctx = canvas.getContext('2d')!;

  const tileTypes = Object.keys(tileDrawers).map(Number);
  tileTypes.forEach((type, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    tileDrawers[type](ctx, col * TILE_SIZE, row * TILE_SIZE);
  });

  return canvas;
}

// Draw a single tile directly (used by mapRenderer)
export function drawTile(
  ctx: CanvasRenderingContext2D,
  tileType: number,
  x: number,
  y: number,
  waterFrame: number = 0
) {
  if (tileType === TileType.Water) {
    drawWater(ctx, x, y, waterFrame);
  } else if (tileType === TileType.LilyPad) {
    drawWater(ctx, x, y, waterFrame);
    drawLilyPad(ctx, x, y);
  } else {
    const drawer = tileDrawers[tileType];
    if (drawer) drawer(ctx, x, y);
  }
}

// Which tiles block movement
export function isSolidTile(tileType: number): boolean {
  return [
    TileType.Water,
    TileType.WaterEdge,
    TileType.TreeTrunk,
    TileType.TreeCanopy,
    TileType.Fence,
    TileType.WallStone,
    TileType.WallWood,
    TileType.RoofRed,
    TileType.RoofGreen,
    TileType.RoofGold,
    TileType.RoofOrange,
    TileType.RoofCoral,
    TileType.RoofNavy,
    TileType.RoofDarkWood,
    TileType.Reeds,
    TileType.LilyPad,
    TileType.Lantern,
  ].includes(tileType);
}
