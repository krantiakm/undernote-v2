'use client';

import React from 'react';

export type ContourVariant =
  | 'horizon'
  | 'basin'
  | 'ridge'
  | 'drift'
  | 'archipelago'
  | 'coda';

interface TopographicPatternProps {
  variant?: ContourVariant;
  className?: string;
  strokeColor?: string;
  opacity?: number;
}

/**
 * Multi-region organic topographic contour system modeled on Section 4 of the Undernote Brand Book.
 * Each variant feels cut from a different coordinate of the same warm cartographic sheet—creating
 * signature continuity across pages and footers without ever looking copy-pasted.
 */
export const TopographicPattern: React.FC<TopographicPatternProps> = ({
  variant = 'horizon',
  className = '',
  strokeColor = '#D8CFC2',
  opacity = 0.55,
}) => {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 430 180"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
    >
      {variant === 'horizon' && (
        <>
          <path
            d="M-28 28C32 8 88 46 154 34C220 22 272 -6 338 22C392 44 418 28 458 14"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-22 58C40 38 98 74 166 60C234 46 284 16 350 46C404 70 424 54 462 38"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-18 90C48 72 108 104 178 90C248 76 296 46 360 76C414 100 430 86 466 70"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-14 124C56 108 118 136 190 122C262 108 308 82 370 108C422 130 436 118 470 104"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M276 48C294 28 344 24 368 42C392 60 380 86 352 92C324 98 258 68 276 48Z"
            stroke={strokeColor}
            strokeWidth="0.95"
          />
          <path
            d="M298 54C310 42 340 40 354 50C368 60 360 74 344 78C328 82 286 66 298 54Z"
            stroke="#C66E45"
            strokeOpacity="0.28"
            strokeWidth="0.95"
          />
        </>
      )}

      {variant === 'basin' && (
        <>
          <path
            d="M-24 22C42 54 114 68 210 52C306 36 368 8 454 34"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-20 54C52 84 126 98 216 82C306 66 372 38 456 64"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-16 90C58 116 138 128 222 112C306 96 376 70 458 96"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-12 132C64 152 148 160 228 144C308 128 380 104 460 128"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M52 72C72 52 128 54 148 74C168 94 142 118 106 116C70 114 32 92 52 72Z"
            stroke={strokeColor}
            strokeWidth="0.95"
          />
          <path
            d="M286 66C308 48 362 50 380 70C398 90 374 112 340 110C306 108 264 84 286 66Z"
            stroke="#C66E45"
            strokeOpacity="0.26"
            strokeWidth="0.95"
          />
        </>
      )}

      {variant === 'ridge' && (
        <>
          <path
            d="M-24 142C24 98 68 48 144 38C220 28 294 64 374 52C414 46 438 32 462 20"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-12 164C38 118 82 72 158 62C234 52 304 88 384 76C422 70 442 58 466 46"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M12 184C60 140 102 98 174 88C246 78 314 112 392 100C428 94 446 84 470 72"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M58 52C76 30 126 22 156 38C186 54 174 84 138 92C102 100 40 74 58 52Z"
            stroke={strokeColor}
            strokeWidth="0.95"
          />
          <path
            d="M82 56C94 42 126 38 142 48C158 58 150 74 130 78C110 82 70 70 82 56Z"
            stroke="#C66E45"
            strokeOpacity="0.26"
            strokeWidth="0.95"
          />
        </>
      )}

      {variant === 'drift' && (
        <>
          <path
            d="M-20 156C54 132 108 86 184 72C260 58 326 84 402 48C428 36 446 20 464 8"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-26 122C46 98 100 54 176 40C252 26 318 52 394 18"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M6 182C76 158 130 116 204 102C278 88 342 112 418 78C440 68 456 54 470 42"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M42 194C108 172 158 138 228 126C298 114 358 136 434 104"
            stroke="#C66E45"
            strokeOpacity="0.25"
            strokeWidth="0.95"
          />
        </>
      )}

      {variant === 'archipelago' && (
        <>
          <path
            d="M-24 44C38 24 96 58 168 48C240 38 312 10 386 32C418 42 440 36 462 28"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M-20 118C46 96 112 132 186 122C260 112 324 84 398 106C426 114 446 110 466 102"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <path
            d="M72 78C92 54 156 50 184 72C212 94 192 126 148 130C104 134 52 102 72 78Z"
            stroke={strokeColor}
            strokeWidth="0.95"
          />
          <path
            d="M98 84C112 68 150 66 166 80C182 94 170 112 144 114C118 116 84 100 98 84Z"
            stroke={strokeColor}
            strokeWidth="0.9"
          />
          <path
            d="M292 64C310 46 360 46 380 66C400 86 382 110 348 112C314 114 274 82 292 64Z"
            stroke={strokeColor}
            strokeWidth="0.95"
          />
        </>
      )}

      {variant === 'coda' && (
        <>
          <path
            d="M-24 166C42 132 118 114 206 128C294 142 356 104 456 76"
            stroke={strokeColor}
            strokeWidth="1.1"
          />
          <path
            d="M-28 136C44 102 122 82 212 98C302 114 364 74 458 46"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-16 190C56 158 132 142 218 156C304 170 368 134 462 108"
            stroke={strokeColor}
            strokeWidth="1.05"
          />
          <path
            d="M-20 98C50 68 128 50 218 66C308 82 370 44 460 18"
            stroke={strokeColor}
            strokeOpacity="0.65"
            strokeWidth="0.95"
          />
          <path
            d="M158 122C182 100 248 98 274 118C300 138 276 166 232 168C188 170 134 144 158 122Z"
            stroke="#C66E45"
            strokeOpacity="0.28"
            strokeWidth="0.95"
          />
          <path
            d="M186 128C202 114 242 114 256 126C270 138 256 154 230 154C204 154 170 142 186 128Z"
            stroke={strokeColor}
            strokeWidth="0.9"
          />
        </>
      )}
    </svg>
  );
};

/**
 * Signature Undernote bottom-of-page contour bookend.
 * Echoes the header contour lines with a fresh lower-valley crop and the minimal '=' emblem.
 */
export const SignatureContourFooter: React.FC<{
  caption?: string;
  className?: string;
}> = ({ caption = 'A world in tune with you.', className = '' }) => {
  return (
    <footer
      className={`relative w-full h-[92px] mt-auto overflow-hidden flex flex-col items-center justify-center select-none ${className}`}
    >
      <TopographicPattern
        variant="coda"
        className="absolute inset-0 w-full h-full"
        opacity={0.62}
      />
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <span className="inline-flex flex-col gap-[3px]" aria-hidden="true">
          <span className="w-4 h-[2px] rounded-full bg-brand-ink/45 block" />
          <span className="w-4 h-[2px] rounded-full bg-brand-terracotta/85 block" />
        </span>
        <span className="font-serif text-[11px] text-brand-ink-light/85 tracking-wide">
          {caption}
        </span>
      </div>
    </footer>
  );
};
