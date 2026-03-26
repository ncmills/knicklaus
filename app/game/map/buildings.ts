import { Building, NPC, InteractableObject, Direction, TileType } from '../types';

export const buildings: Building[] = [
  // ── GYMS ──
  {
    name: 'Tour de Fore',
    type: 'gym',
    url: 'https://tourdefore.com',
    doorTile: [6, 4],  // Path tile in front of the door
    dialogText: 'TOUR DE FORE GYM\n\nSix years of fairways,\nfriendships, and questionable\nhandicaps.\n\nEnter the gym?',
    color: '#27ae60',
  },
  {
    name: 'DoppelWriter',
    type: 'gym',
    url: 'https://doppelwriter.com',
    doorTile: [12, 4],
    dialogText: 'DOPPELWRITER GYM\n\nAI-powered writing that clones\nyour voice. Edit drafts and\ngenerate content in any style.\n\nEnter the gym?',
    color: '#d4a017',
  },
  {
    name: 'whatpeptidesdo',
    type: 'gym',
    url: 'https://whatpeptidesdo.com',
    doorTile: [18, 4],
    dialogText: 'WHATPEPTIDESDO GYM\n\nThe complete guide to peptides:\nwhat they are, how they work,\nand an AI stacking engine.\n\nEnter the gym?',
    color: '#e07832',
  },
  {
    name: "I'm Frustrated",
    type: 'gym',
    url: 'https://imfrustrated.org',
    doorTile: [6, 9],
    dialogText: "I'M FRUSTRATED GYM\n\nTalk to a real attorney before\nyou hire one. Free, honest\nlegal guidance.\n\nEnter the gym?",
    color: '#e8664a',
  },
  {
    name: 'idonthaveawill',
    type: 'gym',
    url: 'https://idonthaveawill.com',
    doorTile: [21, 9],
    dialogText: 'IDONTHAVEAWILL GYM\n\nDraft a simple will for free\nin about 10 minutes. All 50\nstates + DC. No account needed.\n\nEnter the gym?',
    color: '#2c3e6b',
  },

  // ── BAR ──
  {
    name: "Knick Cage's Collapse",
    type: 'bar',
    doorTile: [6, 14],
    dialogText: "Welcome to KNICK CAGE'S COLLAPSE!\n\nLooks like they're pouring\ngenerously tonight...\n\nStep inside?",
    color: '#4a3020',
  },

  // ── POND ──
  {
    name: 'Wet Whistle',
    type: 'pond',
    doorTile: [24, 13],
    dialogText: "The water looks refreshing...\nand surprisingly deep.\n\nGet a closer look?",
    color: '#3b82f6',
  },
];

export const npcs: NPC[] = [
  {
    name: 'Fisherman',
    tileX: 24,
    tileY: 11,
    direction: Direction.Down,
    dialogText: "The pond looks peaceful...\nJust don't fall in!\n\nI've been fishing here for years\nand I still haven't caught anything.",
    spriteKey: 'fisherman',
  },
  {
    name: 'Bartender',
    tileX: 3,
    tileY: 12,
    direction: Direction.Right,
    dialogText: "Come on in! First round's\non the house.\n\nWe've got a special tonight:\nThe 'Infinite Loop' cocktail.",
    spriteKey: 'bartender',
  },
  {
    name: 'Old Man',
    tileX: 10,
    tileY: 6,
    direction: Direction.Down,
    dialogText: "I've visited all 5 gyms in\nthis town...\n\nTour de Fore was my favorite.\nNothing beats a good golf trip!",
    spriteKey: 'oldman',
  },
];

export const interactables: InteractableObject[] = [
  {
    name: 'Bench',
    tileX: 13,
    tileY: 7,
    tileType: TileType.Bench,
    dialogText: "You sit down for a moment.\n\n...\n\nNice day to build something.",
    action: 'sit',
  },
  {
    name: 'Mailbox',
    tileX: 13,
    tileY: 8,
    tileType: TileType.Mailbox,
    dialogText: "It's full of spam...\nand one message:\n\n\"Build cool stuff.\n  - The Internet\"",
  },
  {
    name: 'Bio Sign',
    tileX: 15,
    tileY: 7,
    tileType: TileType.BioSign,
    dialogText: "NICHOLAUS C. MILLS\n\nBuilder of things.\nForever the intern.\n\nPopulation: 5 gyms",
  },
];

// Check if player is touching (on or adjacent to) a tile
function isTouching(playerX: number, playerY: number, targetX: number, targetY: number): boolean {
  const dx = Math.abs(playerX - targetX);
  const dy = Math.abs(playerY - targetY);
  return (dx <= 1 && dy <= 1) && (dx + dy <= 1); // Adjacent (not diagonal) or standing on
}

// Find what building/NPC/object the player is interacting with
// Very forgiving — triggers if player is adjacent to the target from any direction
export function findInteraction(
  playerTileX: number,
  playerTileY: number,
  facingDirection: { dx: number; dy: number }
): { type: 'building' | 'npc' | 'object'; data: Building | NPC | InteractableObject } | null {
  // Check buildings — player is on or adjacent to doorTile
  for (const building of buildings) {
    const [dx, dy] = building.doorTile;
    if (isTouching(playerTileX, playerTileY, dx, dy)) {
      return { type: 'building', data: building };
    }
  }

  // Check NPCs — player is adjacent to NPC
  for (const npc of npcs) {
    if (isTouching(playerTileX, playerTileY, npc.tileX, npc.tileY)) {
      return { type: 'npc', data: npc };
    }
  }

  // Check interactable objects — player is adjacent to object
  for (const obj of interactables) {
    if (isTouching(playerTileX, playerTileY, obj.tileX, obj.tileY)) {
      return { type: 'object', data: obj };
    }
  }

  return null;
}

// Get the direction offset from a Direction enum
export function getDirectionOffset(direction: number): { dx: number; dy: number } {
  switch (direction) {
    case 0: return { dx: 0, dy: 1 };  // Down
    case 1: return { dx: -1, dy: 0 }; // Left
    case 2: return { dx: 1, dy: 0 };  // Right
    case 3: return { dx: 0, dy: -1 }; // Up
    default: return { dx: 0, dy: 0 };
  }
}
