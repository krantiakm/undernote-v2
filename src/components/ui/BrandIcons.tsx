'use client';

import React from 'react';

export interface BrandIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  accent?: string;
  filled?: boolean;
}

const TERRACOTTA = '#C66E45';

/**
 * Official Undernote Bespoke Duotone Architectural Icon System
 * Modeled directly on Section 4 ("ICONS & PATTERNS") of undernotebrand.png:
 * - Fine 1.5px rounded strokes in currentColor (Ink #17201E / Deep Green #24483F)
 * - Deliberate single Terracotta (#C66E45) inner focal element
 */

// ============================================================================
// 1. PRIMARY NAVIGATION ICONS
// ============================================================================

export const IconCompass: React.FC<BrandIconProps> = ({
  size = 22,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M15.6 8.4L13.35 13.35L8.4 15.6L10.65 10.65L15.6 8.4Z"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconTogether: React.FC<BrandIconProps> = ({
  size = 22,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="9.5" cy="9.5" r="3.2" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M4.2 19.2C4.6 16.3 6.8 14.6 9.5 14.6C12.2 14.6 14.4 16.3 14.8 19.2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <circle cx="16.2" cy="10.2" r="2.5" stroke={accent} strokeWidth={strokeWidth} />
    <path
      d="M15.8 15.2C17.8 15.4 19.4 16.8 19.8 19.2"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconRadarWatch: React.FC<BrandIconProps> = ({
  size = 22,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="3.2" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M3.5 9.8H20.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M8.2 3.2V6.4M15.8 3.2V6.4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <circle cx="12" cy="15" r="2.1" fill={accent} />
  </svg>
);

export const IconProfileSeal: React.FC<BrandIconProps> = ({
  size = 22,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M9.4 9V12.6C9.4 14.1 10.5 15.2 12 15.2C13.5 15.2 14.6 14.1 14.6 12.6V9"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path d="M9.2 17.6H14.8" stroke={accent} strokeWidth={strokeWidth + 0.3} strokeLinecap="round" />
  </svg>
);

// ============================================================================
// 2. EVENT TAXONOMY & CULTURAL FORMAT ICONS
// ============================================================================

export const IconMusic: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M9 17.5V6.2L19 4.5V15.8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 9.5L19 7.8" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
    <circle cx="6.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="16.5" cy="15.8" r="2.5" stroke={accent} strokeWidth={strokeWidth} />
  </svg>
);

export const IconTheatre: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V19.5H4V5.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M4 9.5C7.2 9.5 9.2 7.2 9.5 4M20 9.5C16.8 9.5 14.8 7.2 14.5 4"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path d="M7.5 16.5H16.5" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconBookSalon: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 6.2C10.2 4.9 7.4 4.6 4.5 5.2V18.4C7.4 17.8 10.2 18.1 12 19.4C13.8 18.1 16.6 17.8 19.5 18.4V5.2C16.6 4.6 13.8 4.9 12 6.2Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 6.2V19.4" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconGalleryFrame: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="9.2" cy="9.2" r="1.7" stroke={accent} strokeWidth={strokeWidth} />
    <path
      d="M5.5 17.5L10.5 13L13.8 15.8L16.5 13.4L19 16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconStudioHands: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M7.5 8.5H16.5L18 19.5H6L7.5 8.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M9.5 8.5V6.6C9.5 5.2 10.6 4.2 12 4.2C13.4 4.2 14.5 5.2 14.5 6.6V8.5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path d="M9.8 14H14.2" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconBotanicalWalk: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 18.5C6 11.5 11.2 5.5 19 5.5C19 13.3 13 18.5 6 18.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 19.5L14.2 10.3" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconSupperTable: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M4.5 15.5C4.5 11.36 7.86 8 12 8C16.14 8 19.5 11.36 19.5 15.5H4.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M3.5 18.5H20.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M12 5V6.5" stroke={accent} strokeWidth={strokeWidth + 0.2} strokeLinecap="round" />
  </svg>
);

export const IconCinemaReel: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M7.5 5V19M16.5 5V19" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M10.6 9.8L14.4 12L10.6 14.2V9.8Z"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// 3. CORE UI, LOGISTICS & INTERACTION ICONS
// ============================================================================

export const IconCalendar: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.8" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M8 3.2V6.2M16 3.2V6.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <circle cx="12" cy="14.8" r="1.7" fill={accent} />
  </svg>
);

export const IconClock: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M12 7.5V12.2L15.2 14" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconVenuePin: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 20.5C12 20.5 18.5 14.9 18.5 9.8C18.5 6.21 15.59 3.3 12 3.3C8.41 3.3 5.5 6.21 5.5 9.8C5.5 14.9 12 20.5 12 20.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.8" r="2.2" stroke={accent} strokeWidth={strokeWidth} />
  </svg>
);

export const IconTicket: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M3.5 8.2C3.5 7 4.5 6 5.7 6H18.3C19.5 6 20.5 7 20.5 8.2V9.8C19.1 9.8 18 10.8 18 12C18 13.2 19.1 14.2 20.5 14.2V15.8C20.5 17 19.5 18 18.3 18H5.7C4.5 18 3.5 17 3.5 15.8V14.2C4.9 14.2 6 13.2 6 12C6 10.8 4.9 9.8 3.5 9.8V8.2Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M14 8.5V15.5" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="2 2.5" />
  </svg>
);

export const IconBookmark: React.FC<BrandIconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
  filled = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6.5 4.5H17.5C18.05 4.5 18.5 4.95 18.5 5.5V19.8L12 15.7L5.5 19.8V5.5C5.5 4.95 5.95 4.5 6.5 4.5Z"
      fill={filled ? accent : 'none'}
      stroke={filled ? accent : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {!filled && <path d="M9.5 8.5H14.5" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />}
  </svg>
);

export const IconHeart: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
  filled = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 19.8C12 19.8 4.2 14.6 4.2 9.1C4.2 6.5 6.2 4.6 8.6 4.6C10.2 4.6 11.4 5.5 12 6.6C12.6 5.5 13.8 4.6 15.4 4.6C17.8 4.6 19.8 6.5 19.8 9.1C19.8 14.6 12 19.8 12 19.8Z"
      fill={filled ? accent : 'none'}
      stroke={filled ? accent : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShare: React.FC<BrandIconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 15V4.5" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8.2 8.2L12 4.4L15.8 8.2" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5.5 13.5V18.2C5.5 19.2 6.3 20 7.3 20H16.7C17.7 20 18.5 19.2 18.5 18.2V13.5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconMicrophone: React.FC<BrandIconProps> = ({
  size = 17,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="9" y="3.5" width="6" height="10.5" rx="3" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M6 11.2C6 14.5 8.7 17.2 12 17.2C15.3 17.2 18 14.5 18 11.2"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path d="M12 17.2V20.5M9.2 20.5H14.8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconSparkNote: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 3.8L13.9 9.5L19.6 11.4L13.9 13.3L12 19L10.1 13.3L4.4 11.4L10.1 9.5L12 3.8Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle cx="18.2" cy="5.8" r="1.4" fill={accent} />
  </svg>
);

export const IconSliders: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4.5 7.5H19.5M4.5 16.5H19.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <circle cx="9.5" cy="7.5" r="2.2" fill="#FCFBF8" stroke={accent} strokeWidth={strokeWidth} />
    <circle cx="15" cy="16.5" r="2.2" fill="#FCFBF8" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const IconSearch: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="11" cy="11" r="6.8" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M16.2 16.2L20 20" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconPlus: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconCheck: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.7,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12.5L9.6 17.1L19 7.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconClose: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconArrowLeft: React.FC<BrandIconProps> = ({
  size = 18,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M19 12H5M11 6L5 12L11 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowRight: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowUpRight: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M7 17L17 7M9 7H17V15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronDown: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 9.5L12 15.5L18 9.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronRight: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M9.5 6L15.5 12L9.5 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCopy: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.2" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M15.5 8.5V6.2C15.5 5.26 14.74 4.5 13.8 4.5H6.2C5.26 4.5 4.5 5.26 4.5 6.2V13.8C4.5 14.74 5.26 15.5 6.2 15.5H8.5"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconDownload: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 4.5V15" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8.2 11.5L12 15.3L15.8 11.5" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19.2H19" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconTrash: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.5,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4.5 7H19.5M9.5 7V5C9.5 4.45 9.95 4 10.5 4H13.5C14.05 4 14.5 4.45 14.5 5V7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M6.8 7L7.6 19C7.65 19.8 8.3 20.4 9.1 20.4H14.9C15.7 20.4 16.35 19.8 16.4 19L17.2 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconEdit: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M15.8 4.8L19.2 8.2L8.6 18.8H5.2V15.4L15.8 4.8Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M13.6 7L17 10.4" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconReset: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.5,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4.8 8.5V4.5H8.8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5.2 8.5C6.5 5.8 9.1 4.2 12.2 4.2C16.6 4.2 20 7.6 20 12C20 16.4 16.6 19.8 12.2 19.8C8.4 19.8 5.3 17.2 4.6 13.6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const IconPause: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M9.2 6V18M14.8 6V18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconPlay: React.FC<BrandIconProps> = ({
  size = 15,
  className = '',
  strokeWidth = 1.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M8 6.2L17.5 12L8 17.8V6.2Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

export const IconShieldPrivacy: React.FC<BrandIconProps> = ({
  size = 16,
  className = '',
  strokeWidth = 1.5,
  accent = TERRACOTTA,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 3.6L19 6.5V11.8C19 16.1 16.1 19.4 12 20.8C7.9 19.4 5 16.1 5 11.8V6.5L12 3.6Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M9.2 12.1L11.2 14.1L15 10.1" stroke={accent} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
