'use client';

import { useEffect, useState } from 'react';
import { InputManager } from '../engine/InputManager';

interface MobileControlsProps {
  input: InputManager;
}

export default function MobileControls({ input }: MobileControlsProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (!isTouchDevice) return null;

  const btnClass = "w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white active:bg-white/40 select-none touch-none";
  const actionBtnClass = "w-14 h-14 rounded-full bg-amber-500/30 backdrop-blur border border-amber-400/50 flex items-center justify-center text-amber-200 active:bg-amber-500/50 select-none touch-none";

  const handleTouchStart = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    input.simulateKeyDown(key);
  };

  const handleTouchEnd = (key: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    input.simulateKeyUp(key);
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 w-full max-w-[480px] mx-auto">
      {/* D-Pad */}
      <div className="grid grid-cols-3 gap-1">
        <div />
        <button
          className={btnClass}
          onTouchStart={handleTouchStart('arrowup')}
          onTouchEnd={handleTouchEnd('arrowup')}
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}
        >
          ▲
        </button>
        <div />
        <button
          className={btnClass}
          onTouchStart={handleTouchStart('arrowleft')}
          onTouchEnd={handleTouchEnd('arrowleft')}
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}
        >
          ◄
        </button>
        <div />
        <button
          className={btnClass}
          onTouchStart={handleTouchStart('arrowright')}
          onTouchEnd={handleTouchEnd('arrowright')}
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}
        >
          ►
        </button>
        <div />
        <button
          className={btnClass}
          onTouchStart={handleTouchStart('arrowdown')}
          onTouchEnd={handleTouchEnd('arrowdown')}
          style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}
        >
          ▼
        </button>
        <div />
      </div>

      {/* Action button */}
      <button
        className={actionBtnClass}
        onTouchStart={handleTouchStart('enter')}
        onTouchEnd={handleTouchEnd('enter')}
        style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '14px' }}
      >
        A
      </button>
    </div>
  );
}
