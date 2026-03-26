export const TILE_SIZE = 16;
export const SCALE = 3;
export const SCALED_TILE = TILE_SIZE * SCALE; // 48px

export const MAP_COLS = 30;
export const MAP_ROWS = 22;

// Full world view — show entire map at once
export const VIEW_COLS = MAP_COLS;
export const VIEW_ROWS = MAP_ROWS;

export const CANVAS_WIDTH = MAP_COLS * TILE_SIZE;   // 480 native
export const CANVAS_HEIGHT = MAP_ROWS * TILE_SIZE;  // 352 native

export const PLAYER_SPEED = 2; // pixels per frame (native scale)
export const WALK_ANIM_SPEED = 4; // frames per sprite change during movement

export const DIALOG_CHAR_SPEED = 15; // ms per character in typewriter effect

export const STATUS_EFFECT_DURATION = 600; // frames (~10 seconds at 60fps)

export const SPRITE_WIDTH = 16;
export const SPRITE_HEIGHT = 20;
