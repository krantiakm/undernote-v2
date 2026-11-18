import { resolveEditorialImage } from './unsplash';

/**
 * Resolves authentic photography:
 * 1. For Books: queries OpenLibrary Covers API by title/author to fetch the real published book cover.
 * 2. For Websites (Hotels, Sanctuaries, Products): scrapes real OpenGraph / Twitter hero image from the destination URL.
 * 3. Fallback: High-resolution editorial photography from Unsplash.
 */

export async function resolveBookCover(title: string, author?: string): Promise<string | null> {
  try {
    // Clean author if it contains category prefix like "Literature · Sanjeev Sanyal" or "Book · Richard Feynman"
    const cleanAuthor = author ? author.replace(/^[A-Za-z\s]+·\s*/, '').trim() : '';

    // 1. Try OpenLibrary with Title + Clean Author, then Title only
    const queries = [
      cleanAuthor ? `${title} ${cleanAuthor}` : title,
      title,
    ];

    for (const q of queries) {
      try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=5`;
        const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const data = await res.json();
          const doc = data.docs?.find((d: any) => d.cover_i);
          if (doc?.cover_i) {
            return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
          }
        }
      } catch {
        // Continue to next query
      }
    }

    // 2. Try Wikipedia REST API summary thumbnail for notable books & works
    try {
      const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        title.replace(/ /g, '_')
      )}`;
      const wikiRes = await fetch(wikiUrl, {
        headers: { 'User-Agent': 'Undernote/1.0 (contact@undernote.co)' },
        signal: AbortSignal.timeout(3000),
      });
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData.thumbnail?.source && !wikiData.thumbnail.source.includes('Disambig')) {
          return wikiData.thumbnail.source;
        }
      }
    } catch {
      // Non-blocking
    }
  } catch {
    // Non-blocking fallback
  }
  return null;
}

export async function resolveWebsiteHeroImage(url: string): Promise<string | null> {
  if (!url || !url.startsWith('http') || url.includes('example.com')) return null;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return null;
    const html = await res.text();

    const ogMatch =
      html.match(/<meta[^>]+property=['"]og:image['"][^>]+content=['"]([^'"]+)['"]/i) ||
      html.match(/<meta[^>]+content=['"]([^'"]+)['"][^>]+property=['"]og:image['"]/i) ||
      html.match(/<meta[^>]+name=['"]twitter:image['"][^>]+content=['"]([^'"]+)['"]/i) ||
      html.match(/<meta[^>]+content=['"]([^'"]+)['"][^>]+name=['"]twitter:image['"]/i);

    if (ogMatch && ogMatch[1]) {
      let imgUrl = ogMatch[1].trim();
      if (imgUrl.startsWith('//')) {
        imgUrl = `https:${imgUrl}`;
      } else if (imgUrl.startsWith('/')) {
        const parsed = new URL(url);
        imgUrl = `${parsed.origin}${imgUrl}`;
      }
      // Filter out tiny icons, logos, or 196x196 icons
      if (
        imgUrl.includes('196x196') ||
        imgUrl.includes('favicon') ||
        imgUrl.includes('logo_small') ||
        imgUrl.endsWith('.ico')
      ) {
        return null;
      }
      if (imgUrl.startsWith('http')) {
        return imgUrl;
      }
    }
  } catch {
    // Non-blocking fallback
  }
  return null;
}

export async function resolveAuthenticMedia({
  domain,
  entityType,
  title,
  authorOrLocation,
  actionUrl,
  imageSearchQuery,
  orientation = 'landscape',
  usedUrls,
}: {
  domain: string;
  entityType?: string;
  title: string;
  authorOrLocation?: string;
  actionUrl?: string;
  imageSearchQuery: string;
  orientation?: 'landscape' | 'portrait';
  usedUrls: Set<string>;
}): Promise<{ url: string; source: 'openlibrary' | 'website' | 'unsplash' }> {
  const lowerDomain = domain.toLowerCase();
  const lowerType = (entityType || '').toLowerCase();
  const lowerTitle = title.toLowerCase();

  // 1. If it's any form of book, literature, thought, or monograph, resolve authentic book cover
  const isBook =
    lowerDomain === 'books' ||
    lowerDomain === 'literature' ||
    lowerDomain === 'reading' ||
    lowerDomain === 'thought' ||
    lowerType.includes('book') ||
    lowerType.includes('literature') ||
    lowerType.includes('monograph') ||
    lowerType.includes('reading') ||
    lowerType.includes('novel') ||
    lowerType.includes('essay') ||
    lowerType.includes('publication') ||
    lowerTitle.includes('book');

  if (isBook) {
    const bookCover = await resolveBookCover(title, authorOrLocation);
    if (bookCover) {
      usedUrls.add(bookCover);
      return { url: bookCover, source: 'openlibrary' };
    }
  }

  // 2. If it has a real actionUrl (hotel, roaster, hardware product), try OpenGraph image
  if (actionUrl && !actionUrl.includes('example.com')) {
    const siteImg = await resolveWebsiteHeroImage(actionUrl);
    if (siteImg && !usedUrls.has(siteImg)) {
      usedUrls.add(siteImg);
      return { url: siteImg, source: 'website' };
    }
  }

  // 3. Fallback to Unsplash
  const unsplashImg = await resolveEditorialImage(imageSearchQuery, domain as any, orientation, usedUrls);
  return { url: unsplashImg.url, source: 'unsplash' };
}
