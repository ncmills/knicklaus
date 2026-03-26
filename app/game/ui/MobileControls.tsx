'use client';

import { useEffect, useState, useCallback } from 'react';
import { InputManager } from '../engine/InputManager';

interface MobileControlsProps {
  input: InputManager;
  onMenuPress: () => void;
}

export default function MobileControls({ input, onMenuPress }: MobileControlsProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Prevent any default touch behavior on the control area
  const preventDefaults = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleTouchStart = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    input.simulateKeyDown(key);
  };

  const handleTouchEnd = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    input.simulateKeyUp(key);
  };

  if (!isTouchDevice) return null;

  const dpadBtn = "w-16 h-16 rounded-xl bg-white/15 backdrop-blur-sm border-2 border-white/25 flex items-center justify-center text-white/80 active:bg-white/35 active:scale-95 select-none transition-all duration-75";
  const actionBtn = "w-18 h-18 rounded-full flex items-center justify-center select-none active:scale-90 transition-all duration-75";

  return (
    <div
      className="w-full flex items-center justify-between px-4 py-2"
      onTouchMove={preventDefaults}
      style={{ touchAction: 'none' }}
    >
      {/* D-Pad */}
      <div className="grid grid-cols-3 gap-1">
        <div />
        <button
          className={dpadBtn}
          onTouchStart={handleTouchStart('arrowup')}
          onTouchEnd={handleTouchEnd('arrowup')}
        >
          <span style={{ fontSize: '20px' }}>▲</span>
        </button>
        <div />
        <button
          className={dpadBtn}
          onTouchStart={handleTouchStart('arrowleft')}
          onTouchEnd={handleTouchEnd('arrowleft')}
        >
          <span style={{ fontSize: '20px' }}>◄</span>
        </button>
        <div />
        <button
          className={dpadBtn}
          onTouchStart={handleTouchStart('arrowright')}
          onTouchEnd={handleTouchEnd('arrowright')}
        >
          <span style={{ fontSize: '20px' }}>►</span>
        </button>
        <div />
        <button
          className={dpadBtn}
          onTouchStart={handleTouchStart('arrowdown')}
          onTouchEnd={handleTouchEnd('arrowdown')}
        >
          <span style={{ fontSize: '20px' }}>▼</span>
        </button>
        <div />
      </div>

      {/* Right side: A button (action) + B button (cancel) + Menu */}
      <div className="flex flex-col items-center gap-2">
        {/* Menu button */}
        <button
          className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white/50 active:bg-white/25 select-none"
          onTouchStart={(e) => { e.preventDefault(); onMenuPress(); }}
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px' }}
        >
          MENU
        </button>

        {/* A and B buttons */}
        <div className="flex items-center gap-4">
          {/* B button — cancel/back */}
          <div className="flex flex-col items-center gap-1">
            <button
              className={`${actionBtn} w-14 h-14 bg-red-500/30 border-2 border-red-400/50 active:bg-red-500/50`}
              onTouchStart={handleTouchStart('escape')}
              onTouchEnd={handleTouchEnd('escape')}
            >
              <span className="text-red-200" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px' }}>B</span>
            </button>
          </div>

          {/* A button — action/confirm */}
          <div className="flex flex-col items-center gap-1">
            <button
              className={`${actionBtn} w-18 h-18 bg-green-500/30 border-2 border-green-400/50 active:bg-green-500/50`}
              onTouchStart={handleTouchStart('enter')}
              onTouchEnd={handleTouchEnd('enter')}
              style={{ width: '72px', height: '72px' }}
            >
              <span className="text-green-200" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '16px' }}>A</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
