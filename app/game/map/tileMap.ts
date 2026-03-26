import { TileType as T } from '../types';

// 30 columns x 22 rows
// Legend:
// 0=Grass, 1=GrassAlt, 2=Path, 9=TreeTrunk, 10=TreeCanopy
// 7=Water, 28=LilyPad, 29=Reeds
// 11=Fence, 12=Flowers, 13=WallStone, 14=WallWood
// 15=RoofRed, 16=RoofGreen, 17=RoofGold, 18=RoofOrange, 19=RoofCoral, 20=RoofNavy, 21=RoofDarkWood
// 22=Door, 23=GymSign, 24=TownSign, 25=Bench, 26=Mailbox, 27=BioSign
// 30=Lantern

const _ = T.Grass;
const A = T.GrassAlt;
const P = T.Path;
const W = T.Water;
const TT = T.TreeTrunk;
const TC = T.TreeCanopy;
const FE = T.Fence;
const FL = T.Flowers;
const WS = T.WallStone;
const WW = T.WallWood;
const RG = T.RoofGreen;   // Tour de Fore
const RD = T.RoofGold;    // DoppelWriter
const RO = T.RoofOrange;  // whatpeptidesdo
const RC = T.RoofCoral;   // I'm Frustrated
const RN = T.RoofNavy;    // idonthaveawill
const RW = T.RoofDarkWood;// Bar
const DR = T.Door;
const GS = T.GymSign;
const TS = T.TownSign;
const BE = T.Bench;
const MB = T.Mailbox;
const BS = T.BioSign;
const LP = T.LilyPad;
const RE = T.Reeds;
const LA = T.Lantern;

// Ground layer - what everything is built on
// Row 0 = top of map (north)
export const groundLayer: number[][] = [
  // Row 0: Tree canopy border
  [TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC,TC],
  // Row 1: Tree trunks + building roofs
  [TT,TT,TT,TT, _,RG,RG,RG, _,TT, _,RD,RD,RD, _,TT, _,RO,RO,RO, _,TT,TT,TT,TT,TT,TT,TT,TT,TT],
  // Row 2: Gym walls row
  [TT, _,FL, _,GS,WS,WS,WS, _, A,GS,WS,WS,WS, _, A,GS,WS,WS,WS, _, A,FL, _,TT,TT,TT,TT,TT,TT],
  // Row 3: Gym doors row
  [ _, A, _, _,_,WS,DR,WS, _, _,_,WS,DR,WS, _, _,_,WS,DR,WS, _, _, _, _,TT, _,FL, _,TT, _],
  // Row 4: Path in front of top gyms
  [FE, _, _, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, _,FE],
  // Row 5: Open area with paths
  [ _, A,FL, P, _, _, _, _, _, A, _, _, _, _, _, _, _, _, _, _, _, _, _, P, _, _,FL, A, _, _],
  // Row 6: West gym roof + center area
  [ _, _, _, P, _,RC,RC,RC, _, _, _, _, _, _,LA, _, _, _, _, _,RN,RN,RN, P, _, _, _, _, _, _],
  // Row 7: West gym wall + center
  [ _, _, _, P,GS,WS,WS,WS, _, _, _, _, _,BE, P,BS, _, _, _,GS,WS,WS,WS, P, _, _, _, _, _, _],
  // Row 8: West gym door + center objects
  [ _, _, _, P, _,WS,DR,WS, _, A, _,FL, _,MB, P, _, _, A, _, _,WS,DR,WS, P, _, _, _, _, _, _],
  // Row 9: Main east-west path
  [FE, _, _, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, _, _, _, _, _,FE],
  // Row 10: Open area south
  [ _, A, _, P, _, _, _, _, _, A, _,FL, _, _, _, _, A, _, _, _, _, _, _, P, _, A, _, _, _, _],
  // Row 11: Bar roof area + pond area starts
  [ _, _, _, P, _,RW,RW,RW, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, P, _,RE, W, W,RE, _],
  // Row 12: Bar wall
  [ _, _,LA, P,GS,WW,WW,WW, _, A, _, _, _, _, _, _, _, _, _, _, _, A, _, P, _, W, W,LP, W, _],
  // Row 13: Bar door
  [ _, _, _, P, _,WW,DR,WW, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, P, _, W,LP, W, W, _],
  // Row 14: Path continues south
  [FE, _, _, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, _,RE, W, W,RE, _],
  // Row 15: Open area
  [ _, A,FL, _, _, _, _, _, _, _, _, _, _, P, _, _, _, _, _, _, _, _, _, _,FL, _, _, _, _, _],
  // Row 16: More grass
  [ _, _, _, _, _, _, A, _, _, _,FL, _, _, P, _, _, _,FL, _, _, _, _, A, _, _, _, _, A, _, _],
  // Row 17: Town entrance area
  [ _,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE, P,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE,FE, _],
  // Row 18: Town sign row
  [ _, _, _, _, _, _, _, _, _, _, _, _,TS, P,TS, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // Row 19: Southern grass
  [ _, A, _,FL, _, _, A, _, _, _, _, _, _, P, _, _, _, _, _, A, _, _, _,FL, _, _, A, _, _, _],
  // Row 20: More southern grass
  [ _, _, _, _, _, _, _, A, _, _, _,FL, _, P, _, _, A, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // Row 21: Bottom border - player spawns here
  [ _, _, _, _, _, _, _, _, _, _, _, _, _, P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Object overlay layer (tiles drawn on top, some walkable-under like tree canopy)
// -1 means nothing on this layer
export const objectLayer: number[][] = groundLayer.map(row => row.map(() => -1));

// Collision map: true = blocked
export function isBlocked(col: number, row: number): boolean {
  if (col < 0 || col >= 30 || row < 0 || row >= 22) return true;
  const tile = groundLayer[row]?.[col];
  if (tile === undefined) return true;

  // These tiles block movement
  const blockedTiles = [
    T.TreeTrunk, T.TreeCanopy, T.Fence,
    T.WallStone, T.WallWood,
    T.RoofGreen, T.RoofGold, T.RoofOrange, T.RoofCoral, T.RoofNavy, T.RoofDarkWood,
    T.Water, T.WaterEdge, T.Reeds, T.LilyPad,
    T.Lantern, T.TownSign, T.Bench, T.Mailbox, T.BioSign, T.GymSign,
  ];

  return blockedTiles.includes(tile);
}

// Get the tile at a position
export function getTile(col: number, row: number): number {
  if (col < 0 || col >= 30 || row < 0 || row >= 22) return T.Empty;
  return groundLayer[row][col];
}
