import { CardData } from '@/types';

export const BASE_PATH = '/v2';

/**
 * Resolves public asset URLs cleanly when Next.js `basePath` ('/v2') is active
 * alongside `images: { unoptimized: true }`.
 */
export function resolveAssetUrl(src?: string): string {
  if (!src) return `${BASE_PATH}/images/events/blr_chamber_recital.jpg`;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  if (src.startsWith('/live/')) {
    return `${BASE_PATH}/${src.slice('/live/'.length)}`;
  }
  if (src.startsWith(`${BASE_PATH}/`)) {
    return src;
  }
  if (src.startsWith('/')) {
    return `${BASE_PATH}${src}`;
  }
  return `${BASE_PATH}/${src}`;
}

/**
 * Generates and downloads a real RFC 5545 .ics calendar invite for any Undernote event.
 */
export function downloadEventIcs(card: CardData): void {
  if (typeof window === 'undefined') return;

  const meta = card.eventMeta;
  const start = meta?.startIso ? new Date(meta.startIso) : new Date(Date.now() + 86400000 * 2);
  const end = meta?.endIso
    ? new Date(meta.endIso)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const toIcsDate = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');

  const escapeIcs = (str: string) =>
    str
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');

  const location = meta
    ? `${meta.venue}, ${meta.neighborhood}, ${meta.cityLabel}`
    : card.subtitle || '';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Undernote//Cultural Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${card.id}@undernote.co`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs(card.title)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(`${card.summary}\n\nBooking: ${card.deepDive.directActionUrl}`)}`,
    `URL:${card.deepDive.directActionUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
