'use client';

interface MenuOverlayProps {
  isVisible: boolean;
  onResume: () => void;
}

export default function MenuOverlay({ isVisible, onResume }: MenuOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70">
      <div
        className="border-3 border-white bg-black p-8 text-center rounded-sm"
        style={{
          fontFamily: '"Press Start 2P", monospace',
        }}
      >
        <h1 className="text-white text-2xl mb-6">KNICKOLAUS</h1>
        <p className="text-gray-400 text-xs mb-8 leading-relaxed">
          A town of projects by<br />Nicholaus C. Mills
        </p>
        <button
          onClick={onResume}
          className="block w-full text-white text-sm py-3 px-6 border border-white/50 hover:bg-white/10 transition-colors mb-4"
        >
          RESUME
        </button>
        <div className="text-gray-500 text-[10px] mt-6 leading-relaxed">
          Arrow keys / WASD to move<br />
          Enter / Space to interact<br />
          ESC to pause
        </div>
      </div>
    </div>
  );
}
