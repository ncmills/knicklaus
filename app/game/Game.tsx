'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import { StatusEffect } from './types';
import { InputManager } from './engine/InputManager';
import { GameEngine } from './engine/GameEngine';
import DialogBox from './ui/DialogBox';
import MobileControls from './ui/MobileControls';
import MenuOverlay from './ui/MenuOverlay';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const inputRef = useRef<InputManager>(new InputManager());

  const [dialogText, setDialogText] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogCancellable, setDialogCancellable] = useState(false);
  const [dialogCallback, setDialogCallback] = useState<(() => void) | null>(null);
  const [dialogCancelCallback, setDialogCancelCallback] = useState<(() => void) | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Prevent all default touch on document for iOS
    const preventTouch = (e: TouchEvent) => {
      // Allow touches on buttons/interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) return;
      e.preventDefault();
    };
    document.addEventListener('touchmove', preventTouch, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('touchmove', preventTouch);
    };
  }, []);

  const closeDialog = useCallback(() => {
    setDialogVisible(false);
    setDialogCancellable(false);
    engineRef.current?.setDialogActive(false);
  }, []);

  const handleDialog = useCallback((text: string, onDismiss?: () => void, onCancel?: () => void) => {
    setDialogText(text);
    setDialogVisible(true);
    setDialogCancellable(!!onCancel);
    setDialogCallback(() => onDismiss || null);
    setDialogCancelCallback(() => onCancel || null);
    engineRef.current?.setDialogActive(true);
  }, []);

  const handleDismissDialog = useCallback(() => {
    closeDialog();
    if (dialogCallback) {
      dialogCallback();
    }
  }, [dialogCallback, closeDialog]);

  const handleCancelDialog = useCallback(() => {
    closeDialog();
    if (dialogCancelCallback) {
      dialogCancelCallback();
    }
  }, [dialogCancelCallback, closeDialog]);

  const handlePause = useCallback(() => {
    setMenuVisible(true);
    engineRef.current?.setPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setMenuVisible(false);
    engineRef.current?.setPaused(false);
  }, []);

  const handleStatusEffect = useCallback((effect: StatusEffect) => {
    if (effect === StatusEffect.Drunk) {
      setStatusMessage('You had a few too many...');
      setTimeout(() => setStatusMessage(''), 3000);
    } else if (effect === StatusEffect.Wet) {
      setStatusMessage('You fell in the pond!');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  }, []);

  const handleStatusExpired = useCallback((effect: StatusEffect) => {
    if (effect === StatusEffect.Drunk) {
      handleDialog("You've sobered up.\n\nMaybe take it easy next time.", () => {});
    } else if (effect === StatusEffect.Wet) {
      handleDialog("You've dried off.\n\nNote to self: stay away\nfrom the pond.", () => {});
    }
  }, [handleDialog]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const input = inputRef.current;
    input.attach(container);
    container.focus();

    const engine = new GameEngine(canvas, input, {
      onDialog: handleDialog,
      onStatusEffect: handleStatusEffect,
      onStatusExpired: handleStatusExpired,
      onPause: handlePause,
    });

    engineRef.current = engine;
    engine.start();

    return () => {
      engine.stop();
      input.detach();
    };
  }, [handleDialog, handleStatusEffect, handleStatusExpired, handlePause]);

  return (
    <div
      className="flex flex-col w-screen h-screen bg-black overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Game area — takes remaining space above controls */}
      <div
        ref={containerRef}
        tabIndex={0}
        className="relative outline-none flex-1 min-h-0"
        style={{ touchAction: 'none' }}
      >
        {/* Title overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-10 text-center py-2 md:py-3"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          }}
        >
          <h1
            className="text-white text-xs md:text-lg tracking-widest"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            Nicholaus C. Mills
          </h1>
        </div>

        <canvas
          ref={canvasRef}
          style={{
            imageRendering: 'pixelated',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Dialog overlay */}
        <DialogBox
          text={dialogText}
          isVisible={dialogVisible}
          cancellable={dialogCancellable}
          onDismiss={handleDismissDialog}
          onCancel={handleCancelDialog}
        />

        {/* Menu overlay */}
        <MenuOverlay
          isVisible={menuVisible}
          onResume={handleResume}
        />

        {/* Status effect message */}
        {statusMessage && (
          <div
            className="absolute top-10 md:top-6 left-1/2 -translate-x-1/2 z-20 text-white bg-black/85 border-2 border-white/40 px-3 md:px-6 py-2 md:py-3 rounded-sm"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: isMobile ? '9px' : '14px',
            }}
          >
            {statusMessage}
          </div>
        )}
      </div>

      {/* Mobile controls — fixed at bottom, only on touch devices */}
      {isMobile && (
        <div className="shrink-0 bg-black/90 border-t border-white/10 safe-area-bottom">
          <MobileControls input={inputRef.current} onMenuPress={handlePause} />
        </div>
      )}

      {/* Desktop instructions — only on non-touch */}
      {!isMobile && (
        <div
          className="shrink-0 text-gray-500 text-center py-1"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '6px',
            lineHeight: '12px',
          }}
        >
          ARROW KEYS / WASD: Move &nbsp; ENTER / SPACE: Interact &nbsp; ESC: Menu / Cancel
        </div>
      )}
    </div>
  );
}
