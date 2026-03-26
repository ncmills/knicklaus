import { TILE_SIZE, MAP_COLS, MAP_ROWS, CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';

export class Camera {
  public x = 0;
  public y = 0;

  update(playerPixelX: number, playerPixelY: number) {
    // Center camera on player
    this.x = playerPixelX - CANVAS_WIDTH / 2 + TILE_SIZE / 2;
    this.y = playerPixelY - CANVAS_HEIGHT / 2 + TILE_SIZE / 2;

    // Clamp to map boundaries
    const maxX = MAP_COLS * TILE_SIZE - CANVAS_WIDTH;
    const maxY = MAP_ROWS * TILE_SIZE - CANVAS_HEIGHT;

    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
  }
}
