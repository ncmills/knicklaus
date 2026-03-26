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
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  useEffect(() => {
    if (!isVisible) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAction();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        // Cancellable dialogs call onCancel (no action), others just dismiss normally
        if (cancellable) {
          handleCancel();
        } else {
          onDismiss();
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isVisible, handleAction, handleCancel, cancellable]);

  if (!isVisible) return null;

  const displayedText = text.slice(0, displayedChars);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 p-4"
      onClick={handleAction}
    >
      <div
        className="mx-auto border-3 border-white bg-black/95 p-5 rounded-sm max-w-2xl"
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '13px',
          lineHeight: '24px',
          color: '#ffffff',
          letterSpacing: '0.5px',
        }}
      >
        <pre className="whitespace-pre-wrap m-0">{displayedText}</pre>
        {isComplete && (
          <div className="flex justify-between items-center mt-3">
            <span style={{ fontSize: '10px', opacity: 0.6 }}>
              {cancellable ? 'ENTER: Yes  ESC: No' : 'ENTER: Continue'}
            </span>
            <span
              className="animate-bounce"
              style={{ fontSize: '14px' }}
            >
              ▼
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
