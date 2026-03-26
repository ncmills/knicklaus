export enum Direction {
  Down = 0,
  Left = 1,
  Right = 2,
  Up = 3,
}

export enum TileType {
  Grass = 0,
  GrassAlt = 1,
  Path = 2,
  PathEdgeTop = 3,
  PathEdgeBottom = 4,
  PathEdgeLeft = 5,
  PathEdgeRight = 6,
  Water = 7,
  WaterEdge = 8,
  TreeTrunk = 9,
  TreeCanopy = 10,
  Fence = 11,
  Flowers = 12,
  // Buildings — generic
  WallStone = 13,
  WallWood = 14,
  RoofRed = 15,
  RoofGreen = 16,
  RoofGold = 17,
  RoofOrange = 18,
  RoofCoral = 19,
  RoofNavy = 20,
  RoofDarkWood = 21,
  Door = 22,
  // Signs & objects
  GymSign = 23,
  TownSign = 24,
  Bench = 25,
  Mailbox = 26,
  BioSign = 27,
  LilyPad = 28,
  Reeds = 29,
  Lantern = 30,
  // Blank / empty
  Empty = 31,
}

export enum StatusEffect {
  None = 0,
  Drunk = 1,
  Wet = 2,
}

export interface DialogState {
  text: string;
  displayedChars: number;
  isComplete: boolean;
  onDismiss?: () => void;
}

export interface GameState {
  playerX: number; // tile X
  playerY: number; // tile Y
  pixelX: number;  // actual pixel position (native scale)
  pixelY: number;
  direction: Direction;
  isMoving: boolean;
  walkFrame: number;
  walkFrameCounter: number;
  targetPixelX: number;
  targetPixelY: number;
  statusEffect: StatusEffect;
  statusTimer: number;
  dialog: DialogState | null;
  introPlaying: boolean;
  paused: boolean;
}

export interface Building {
  name: string;
  type: 'gym' | 'bar' | 'pond' | 'object';
  url?: string;
  doorTile: [number, number]; // [col, row] the player stands on to interact
  dialogText: string;
  color: string;
}

export interface NPC {
  name: string;
  tileX: number;
  tileY: number;
  direction: Direction;
  dialogText: string;
  spriteKey: string;
}

export interface InteractableObject {
  name: string;
  tileX: number;
  tileY: number;
  tileType: TileType;
  dialogText: string;
  action?: 'drunk' | 'wet' | 'sit' | 'url';
  url?: string;
}
