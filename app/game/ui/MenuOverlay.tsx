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
        className="border-2 md:border-3 border-white bg-black p-6 md:p-8 text-center rounded-sm mx-4"
        style={{
          fontFamily: '"Press Start 2P", monospace',
        }}
      >
        <h1 className="text-white text-lg md:text-2xl mb-4 md:mb-6">KNICKOLAUS</h1>
        <p className="text-gray-400 text-[9px] md:text-xs mb-6 md:mb-8 leading-relaxed">
          A town of projects by<br />Nicholaus C. Mills
        </p>
        <button
          onClick={onResume}
          className="block w-full text-white text-xs md:text-sm py-3 px-6 border border-white/50 hover:bg-white/10 active:bg-white/20 transition-colors mb-4"
        >
          RESUME
        </button>
        <div className="text-gray-500 text-[8px] md:text-[10px] mt-4 md:mt-6 leading-relaxed">
          D-Pad to move<br />
          A to interact / B to cancel<br />
          MENU to pause
        </div>
      </div>
    </div>
  );
}
