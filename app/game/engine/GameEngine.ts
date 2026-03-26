import { TILE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_SPEED, WALK_ANIM_SPEED } from '../constants';
import { Direction, StatusEffect, GameState, Building } from '../types';
import { InputManager } from './InputManager';
import { Camera } from './Camera';
import { renderMap, renderOverlay, renderLabels } from '../map/mapRenderer';
import { isBlocked, getTile } from '../map/tileMap';
import { findInteraction, getDirectionOffset } from '../map/buildings';
import { initPlayerSprite, drawPlayer } from '../sprites/spriteRenderer';
import { initNpcs, renderNpcs } from '../sprites/npcManager';
import { StatusManager } from '../effects/statusManager';
import { applyDrunkRender, finishDrunkRender } from '../effects/drunkEffect';
import { applyWetRender, initRainDrops } from '../effects/wetEffect';
import { TileType } from '../types';
import { npcs as npcList } from '../map/buildings';

export interface GameCallbacks {
  onDialog: (text: string, onDismiss?: () => void, onCancel?: () => void) => void;
  onStatusEffect: (effect: StatusEffect) => void;
  onStatusExpired: (effect: StatusEffect) => void;
  onPause: () => void;
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private input: InputManager;
  private camera: Camera;
  private statusManager: StatusManager;
  private callbacks: GameCallbacks;

  private state: GameState;
  private frameCount = 0;
  private animId: number | null = null;
  private dialogActive = false;

  // Intro animation
  private introStep = 0;
  private introTimer = 0;

  constructor(
    canvas: HTMLCanvasElement,
    input: InputManager,
    callbacks: GameCallbacks
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;
    this.input = input;
    this.camera = new Camera();
    this.statusManager = new StatusManager();
    this.callbacks = callbacks;

    // Player starts at the bottom of the map (south entrance)
    const startCol = 13;
    const startRow = 21;

    this.state = {
      playerX: startCol,
      playerY: startRow,
      pixelX: startCol * TILE_SIZE,
      pixelY: startRow * TILE_SIZE,
      direction: Direction.Up,
      isMoving: false,
      walkFrame: 0,
      walkFrameCounter: 0,
      targetPixelX: startCol * TILE_SIZE,
      targetPixelY: startRow * TILE_SIZE,
      statusEffect: StatusEffect.None,
      statusTimer: 0,
      dialog: null,
      introPlaying: true,
      paused: false,
    };

    // Initialize sprite systems
    initPlayerSprite();
    initNpcs();
  }

  start() {
    this.loop();
  }

  stop() {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private dialogCooldown = 0;

  setDialogActive(active: boolean) {
    this.dialogActive = active;
    if (!active) {
      // Prevent the key that dismissed the dialog from immediately re-triggering
      this.dialogCooldown = 20; // ~20 frames cooldown
      this.input.clearAll();
    }
  }

  setPaused(paused: boolean) {
    this.state.paused = paused;
  }

  private loop = () => {
    this.update();
    this.render();
    this.frameCount++;
    this.input.clearJustPressed();
    this.animId = requestAnimationFrame(this.loop);
  };

  private update() {
    if (this.state.paused) return;

    // Handle intro sequence
    if (this.state.introPlaying) {
      this.updateIntro();
      return;
    }

    // Don't process movement during dialog
    if (this.dialogActive) return;

    // Cooldown after dialog dismiss to prevent re-triggering
    if (this.dialogCooldown > 0) {
      this.dialogCooldown--;
      this.input.clearAll(); // Flush ALL keys so nothing leaks through
      return;
    }

    // Check for escape/pause
    if (this.input.escape) {
      this.callbacks.onPause();
      return;
    }

    // Tick status effects
    const expired = this.statusManager.tick();
    if (expired !== null) {
      this.state.statusEffect = StatusEffect.None;
      this.callbacks.onStatusExpired(expired);
    }
    this.state.statusEffect = this.statusManager.effect;

    // Handle tile-to-tile movement
    if (this.state.isMoving) {
      this.continueMovement();
    } else {
      // Check for interaction
      if (this.input.action) {
        this.tryInteract();
        return;
      }

      // Check for new movement
      this.tryStartMovement();
    }
  }

  private updateIntro() {
    this.introTimer++;

    if (this.introStep === 0) {
      // Fade in period (60 frames = 1 second)
      if (this.introTimer > 60) {
        this.introStep = 1;
        this.introTimer = 0;
      }
    } else if (this.introStep === 1) {
      // Walk up from spawn
      if (!this.state.isMoving) {
        if (this.state.playerY > 17) {
          this.startMovement(Direction.Up);
        } else {
          this.introStep = 2;
          this.introTimer = 0;
          // Show welcome dialog
          this.state.introPlaying = false;
          this.callbacks.onDialog(
            "Welcome to KNICKOLAUS!\n\nUse arrow keys or WASD to move.\nPress ENTER or SPACE to interact.\n\nVisit the gyms to explore\nmy projects!",
            () => {}
          );
        }
      } else {
        this.continueMovement();
      }
    }
  }

  private tryStartMovement() {
    let dir: Direction | null = null;

    if (this.input.up) dir = Direction.Up;
    else if (this.input.down) dir = Direction.Down;
    else if (this.input.left) dir = Direction.Left;
    else if (this.input.right) dir = Direction.Right;

    if (dir !== null) {
      this.state.direction = dir;
      this.startMovement(dir);
    }
  }

  private startMovement(dir: Direction) {
    const offset = getDirectionOffset(dir);
    const targetCol = this.state.playerX + offset.dx;
    const targetRow = this.state.playerY + offset.dy;

    // Check collision
    if (isBlocked(targetCol, targetRow)) {
      // Face the direction but don't move
      this.state.direction = dir;
      return;
    }

    // Also check NPC collision
    for (const npc of npcList) {
      if (npc.tileX === targetCol && npc.tileY === targetRow) {
        this.state.direction = dir;
        return;
      }
    }

    // Start moving
    this.state.isMoving = true;
    this.state.targetPixelX = targetCol * TILE_SIZE;
    this.state.targetPixelY = targetRow * TILE_SIZE;
    this.state.playerX = targetCol;
    this.state.playerY = targetRow;
  }

  private continueMovement() {
    const dx = this.state.targetPixelX - this.state.pixelX;
    const dy = this.state.targetPixelY - this.state.pixelY;

    const moveX = dx === 0 ? 0 : (dx > 0 ? PLAYER_SPEED : -PLAYER_SPEED);
    const moveY = dy === 0 ? 0 : (dy > 0 ? PLAYER_SPEED : -PLAYER_SPEED);

    this.state.pixelX += moveX;
    this.state.pixelY += moveY;

    // Animate walk
    this.state.walkFrameCounter++;
    if (this.state.walkFrameCounter >= WALK_ANIM_SPEED) {
      this.state.walkFrameCounter = 0;
      this.state.walkFrame = (this.state.walkFrame + 1) % 3;
    }

    // Check if arrived
    if (this.state.pixelX === this.state.targetPixelX &&
        this.state.pixelY === this.state.targetPixelY) {
      this.state.isMoving = false;
      this.state.walkFrame = 0;
      this.state.walkFrameCounter = 0;

      // Check for walk-over triggers (town sign)
      this.checkWalkOverTriggers();
    }
  }

  private checkWalkOverTriggers() {
    const tile = getTile(this.state.playerX, this.state.playerY);
    // Town sign tiles are next to the path, not on it.
    // We could add step-on triggers here if needed.
  }

  private tryInteract() {
    const offset = getDirectionOffset(this.state.direction);
    const interaction = findInteraction(
      this.state.playerX,
      this.state.playerY,
      offset
    );

    if (interaction) {
      if (interaction.type === 'building') {
        const building = interaction.data as Building;
        const onConfirm = () => {
          if (building.type === 'gym' && building.url) {
            window.open(building.url, '_blank');
          } else if (building.type === 'bar') {
            this.statusManager.applyEffect(StatusEffect.Drunk);
            this.state.statusEffect = StatusEffect.Drunk;
            this.callbacks.onStatusEffect(StatusEffect.Drunk);
          } else if (building.type === 'pond') {
            initRainDrops();
            this.statusManager.applyEffect(StatusEffect.Wet);
            this.state.statusEffect = StatusEffect.Wet;
            this.callbacks.onStatusEffect(StatusEffect.Wet);
          }
        };
        const onCancel = () => {
          // Just close dialog, no action
        };
        this.callbacks.onDialog(building.dialogText, onConfirm, onCancel);
      } else {
        const data = interaction.data as { dialogText: string };
        this.callbacks.onDialog(data.dialogText, () => {});
      }
    }
  }

  private render() {
    const { ctx } = this;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update camera
    this.camera.update(this.state.pixelX, this.state.pixelY);

    // Apply drunk effect pre-render
    if (this.state.statusEffect === StatusEffect.Drunk) {
      applyDrunkRender(ctx, this.frameCount);
    }

    // Draw map ground layer
    renderMap(ctx, this.camera.x, this.camera.y, this.frameCount);

    // Draw NPCs
    renderNpcs(ctx, this.camera.x, this.camera.y);

    // Draw player
    drawPlayer(
      ctx,
      this.state.pixelX,
      this.state.pixelY,
      this.state.direction,
      this.state.isMoving ? this.state.walkFrame : 0,
      this.camera.x,
      this.camera.y,
      this.state.statusEffect,
      this.frameCount
    );

    // Draw tree canopy overlay (on top of player for depth)
    renderOverlay(ctx, this.camera.x, this.camera.y);

    // Draw building labels
    renderLabels(ctx, this.camera.x, this.camera.y);

    // Apply drunk effect post-render
    if (this.state.statusEffect === StatusEffect.Drunk) {
      finishDrunkRender(ctx, this.frameCount);
    }

    // Apply wet effect
    if (this.state.statusEffect === StatusEffect.Wet) {
      applyWetRender(ctx, this.frameCount);
    }

    // Intro fade-in
    if (this.state.introPlaying && this.introStep === 0) {
      const alpha = 1 - this.introTimer / 60;
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, alpha)})`;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }
}
