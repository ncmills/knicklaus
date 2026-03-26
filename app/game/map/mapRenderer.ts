import { TILE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { drawTile } from './tileAtlas';
import { groundLayer } from './tileMap';
import { buildings } from './buildings';

export function renderMap(
  ctx: CanvasRenderingContext2D,
  cameraX: number,
  cameraY: number,
  frameCount: number
) {
  const waterFrame = Math.floor(frameCount / 30) % 3;

  // Calculate visible tile range
  const startCol = Math.floor(cameraX / TILE_SIZE);
  const startRow = Math.floor(cameraY / TILE_SIZE);
  const endCol = startCol + Math.ceil(CANVAS_WIDTH / TILE_SIZE) + 1;
  const endRow = startRow + Math.ceil(CANVAS_HEIGHT / TILE_SIZE) + 1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (row < 0 || row >= groundLayer.length || col < 0 || col >= groundLayer[0].length) {
        continue;
      }

      const tileType = groundLayer[row][col];
      const screenX = col * TILE_SIZE - cameraX;
      const screenY = row * TILE_SIZE - cameraY;

      drawTile(ctx, tileType, Math.round(screenX), Math.round(screenY), waterFrame);
    }
  }
}

// Draw building labels on the map
export function renderLabels(
  ctx: CanvasRenderingContext2D,
  cameraX: number,
  cameraY: number
) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (const building of buildings) {
    const [doorCol, doorRow] = building.doorTile;
    // Position label above the building — clamp so it doesn't go above row 2
    const labelX = doorCol * TILE_SIZE - cameraX + TILE_SIZE / 2;
    const labelRow = Math.max(doorRow - 4, 2);
    const labelY = labelRow * TILE_SIZE - cameraY + TILE_SIZE / 2;

    // Measure text
    const name = building.name;
    ctx.font = 'bold 8px monospace';
    const textWidth = ctx.measureText(name).width;
    const padding = 5;

    // Background pill
    const rx = labelX - textWidth / 2 - padding;
    const ry = labelY - 6;
    const rw = textWidth + padding * 2;
    const rh = 13;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(rx + 1, ry + 1, rw, rh);

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(rx, ry, rw, rh);

    // Color bar at top
    ctx.fillStyle = building.color;
    ctx.fillRect(rx, ry, rw, 2);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, labelX, labelY + 1);
  }

  ctx.restore();
}

// Draw overlay elements that should appear on top of the player (tree canopies)
export function renderOverlay(
  ctx: CanvasRenderingContext2D,
  cameraX: number,
  cameraY: number
) {
  const startCol = Math.floor(cameraX / TILE_SIZE);
  const startRow = Math.floor(cameraY / TILE_SIZE);
  const endCol = startCol + Math.ceil(CANVAS_WIDTH / TILE_SIZE) + 1;
  const endRow = startRow + Math.ceil(CANVAS_HEIGHT / TILE_SIZE) + 1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (row < 0 || row >= groundLayer.length || col < 0 || col >= groundLayer[0].length) {
        continue;
      }

      const tileType = groundLayer[row][col];
      // Tree canopies render on top of the player for depth
      if (tileType === 10) { // TreeCanopy
        const screenX = col * TILE_SIZE - cameraX;
        const screenY = row * TILE_SIZE - cameraY;
        drawTile(ctx, tileType, Math.round(screenX), Math.round(screenY));
      }
    }
  }
}
