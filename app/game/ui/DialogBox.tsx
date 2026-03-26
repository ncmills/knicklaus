'use client';

import { useEffect, useState, useCallback } from 'react';
import { DIALOG_CHAR_SPEED } from '../constants';

interface DialogBoxProps {
  text: string;
  isVisible: boolean;
  cancellable: boolean;
  onDismiss: () => void;
  onCancel?: () => void;
}

export default function DialogBox({ text, isVisible, cancellable, onDismiss, onCancel }: DialogBoxProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedChars(0);
      setIsComplete(false);
      return;
    }

    setDisplayedChars(0);
    setIsComplete(false);

    const interval = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev >= text.length) {
          setIsComplete(true);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, DIALOG_CHAR_SPEED);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  const handleAction = useCallback(() => {
    if (!isComplete) {
      setDisplayedChars(text.length);
      setIsComplete(true);
    } else {
      onDismiss();
    }
  }, [isComplete, text.length, onDismiss]);

  const handleCancel = useCallback(() => {
    if (cancellable && onCancel) {
      onCancel();
    } else {
      onDismiss();
    }
  }, [cancellable, onCancel, onDismiss]);

  useEffect(() => {
    if (!isVisible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAction();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isVisible, handleAction, handleCancel]);

  if (!isVisible) return null;

  const displayedText = text.slice(0, displayedChars);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 p-2 md:p-4"
    >
      <div
        className="mx-auto border-2 md:border-3 border-white bg-black/95 p-3 md:p-5 rounded-sm max-w-2xl"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          color: '#ffffff',
          letterSpacing: '0.5px',
        }}
      >
        <pre
          className="whitespace-pre-wrap m-0"
          style={{ fontSize: 'clamp(9px, 2vw, 13px)', lineHeight: 'clamp(16px, 3.5vw, 24px)' }}
          onClick={handleAction}
        >
          {displayedText}
        </pre>
        {isComplete && (
          <div className="flex justify-between items-center mt-2 md:mt-3 gap-2">
            {/* Cancel button — always visible, works on mobile tap */}
            <button
              onClick={(e) => { e.stopPropagation(); handleCancel(); }}
              onTouchStart={(e) => { e.stopPropagation(); }}
              className="px-3 py-2 border border-white/30 text-white/50 active:bg-white/10"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(7px, 1.5vw, 10px)' }}
            >
              {cancellable ? 'CANCEL' : 'CLOSE'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleAction(); }}
              onTouchStart={(e) => { e.stopPropagation(); }}
              className="px-4 py-2 border-2 border-green-400/60 bg-green-500/20 text-green-200 active:bg-green-500/40"
              style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(7px, 1.5vw, 10px)' }}
            >
              {cancellable ? 'YES' : 'OK'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
