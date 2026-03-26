import { TILE_SIZE } from '../constants';
import { npcs } from '../map/buildings';
import { drawNpc, initNpcSprites } from './npcSprites';

export function initNpcs() {
  initNpcSprites();
}

export function renderNpcs(
  ctx: CanvasRenderingContext2D,
  cameraX: number,
  cameraY: number
) {
  for (const npc of npcs) {
    drawNpc(
      ctx,
      npc.spriteKey,
      npc.tileX * TILE_SIZE,
      npc.tileY * TILE_SIZE,
      cameraX,
      cameraY
    );
  }
}
