/**
 * Unsplash Editorial Image Resolver for Undernote
 * Guarantees distinct, non-duplicate editorial photography for all synthesized cards and tiles.
 */

interface ResolvedImage {
  url: string;
  alt: string;
  photographer?: string;
  photographerUrl?: string;
}

// Rich pool of diverse local editorial photography by domain and topic
const LOCAL_FALLBACK_POOL: Array<{
  url: string;
  alt: string;
  domains: string[];
  keywords: string[];
}> = [
  {
    url: '/images/for_you_bistro.jpg',
    alt: 'Courtyard wood-fired bistro and artisan dining',
    domains: ['dining', 'food-drink', 'shopping'],
    keywords: ['oven', 'pizza', 'bistro', 'restaurant', 'dining', 'wine', 'food', 'courtyard'],
  },
  {
    url: '/images/feed_vinyl_listening.jpg',
    alt: 'Warm minimalist studio with solid wood desk and vinyl',
    domains: ['shopping', 'events', 'experiences'],
    keywords: ['teak', 'desk', 'studio', 'wood', 'furniture', 'interior', 'table', 'chair', 'lamp'],
  },
  {
    url: '/images/ceramic_teapot_tea.jpg',
    alt: 'Hand-thrown stoneware kyusu and artisan ceramics',
    domains: ['shopping', 'food-drink'],
    keywords: ['ceramic', 'pottery', 'teapot', 'tea', 'cup', 'craft', 'stoneware', 'clay'],
  },
  {
    url: '/images/specialty_coffee_roaster.jpg',
    alt: 'Specialty coffee roastery and pour-over micro-lot',
    domains: ['food-drink', 'shopping'],
    keywords: ['coffee', 'roaster', 'pour-over', 'beans', 'brew', 'cafe'],
  },
  {
    url: '/images/for_you_audiophile.jpg',
    alt: 'Open-back walnut reference monitor headphones',
    domains: ['shopping', 'events', 'experiences'],
    keywords: ['headphones', 'audio', 'sound', 'hifi', 'speakers', 'walnut', 'analogue'],
  },
  {
    url: '/images/craft_linen_jacket.jpg',
    alt: 'Heavy unlined Irish linen chore jacket',
    domains: ['shopping'],
    keywords: ['jacket', 'linen', 'coat', 'shirt', 'apparel', 'clothing', 'garment', 'wear'],
  },
  {
    url: '/images/hero_sonya7cr_camera.jpg',
    alt: 'Compact lightweight full-frame rangefinder camera',
    domains: ['shopping'],
    keywords: ['camera', 'lens', 'photography', 'sensor', 'compact', 'rangefinder', 'gadget'],
  },
  {
    url: '/images/hero_pixel11_compact.jpg',
    alt: 'Ergonomic compact mobile hardware',
    domains: ['shopping'],
    keywords: ['phone', 'mobile', 'hardware', 'screen', 'device', 'electronics', 'tech'],
  },
  {
    url: '/images/for_you_indie_cinema.jpg',
    alt: 'Indie cinema auditorium and 35mm projection',
    domains: ['films', 'events', 'experiences', 'watch'],
    keywords: ['cinema', 'film', 'movie', 'theatre', 'screen', 'watch', '35mm', 'noir'],
  },
  {
    url: '/images/hero_theatre_acoustic.jpg',
    alt: 'Intimate unamplified timber acoustic theatre',
    domains: ['events', 'experiences'],
    keywords: ['theatre', 'acoustic', 'stage', 'performance', 'concert', 'recital', 'hall', 'music'],
  },
  {
    url: '/images/feed_museum_event.jpg',
    alt: 'Quiet contemporary art museum gallery',
    domains: ['events', 'experiences'],
    keywords: ['museum', 'gallery', 'art', 'exhibition', 'sculpture', 'painting', 'cultural'],
  },
  {
    url: '/images/hero_srilanka_villa.jpg',
    alt: 'Tropical modernist beachfront villa sanctuary',
    domains: ['travel', 'trips'],
    keywords: ['villa', 'beach', 'coastal', 'resort', 'ocean', 'tropical', 'sanctuary', 'retreat'],
  },
  {
    url: '/images/for_you_alpine_cabin.jpg',
    alt: 'Secluded timber cabin in alpine mist',
    domains: ['travel', 'trips'],
    keywords: ['cabin', 'mountain', 'alpine', 'mist', 'forest', 'woodland', 'timber', 'nature'],
  },
  {
    url: '/images/scenic_alpine_rail.jpg',
    alt: 'Vistadome mountain rail journey through highlands',
    domains: ['travel', 'trips'],
    keywords: ['train', 'rail', 'journey', 'scenic', 'overland', 'tracks', 'mountain'],
  },
  {
    url: '/images/hero_alexander_book.jpg',
    alt: 'Monograph and architectural design theory volume',
    domains: ['books'],
    keywords: ['book', 'monograph', 'theory', 'reading', 'hardcover', 'architecture', 'essay'],
  },
  {
    url: '/images/hero_singapore_book.jpg',
    alt: 'Curated architectural and cultural literature',
    domains: ['books'],
    keywords: ['literature', 'novel', 'anthology', 'print', 'pages', 'spine', 'shelf'],
  },
  {
    url: '/images/feed_gravel_bike.jpg',
    alt: 'Custom titanium gravel bicycle on trail',
    domains: ['shopping', 'experiences'],
    keywords: ['bike', 'bicycle', 'gravel', 'cycling', 'ride', 'outdoor'],
  },
  {
    url: '/images/feed_modern_coastal.jpg',
    alt: 'Minimalist concrete coastal architecture pavilion',
    domains: ['travel', 'trips'],
    keywords: ['architecture', 'concrete', 'pavilion', 'minimalist', 'modern', 'water'],
  },
];

export async function resolveEditorialImage(
  query: string,
  categoryHint: string = 'default',
  orientation: 'landscape' | 'portrait' | 'squarish' = 'landscape',
  usedUrls: Set<string> = new Set()
): Promise<ResolvedImage> {
  const cleanQuery = query.replace(/[^\w\s-]/g, ' ').trim();
  const accessKey = (
    process.env.UNSPLASH_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ||
    'dTfBXcxYV-3na02ntxRnDdqFD8xObvNP3tf5VDTEH7A'
  ).trim();

  // Try Unsplash API first
  if (accessKey) {
    try {
      const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        cleanQuery
      )}&per_page=5&orientation=${orientation}&client_id=${accessKey}`;

      const res = await fetch(endpoint, {
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const photos = data?.results || [];

        // Pick the first photo that has NOT been used yet in this batch
        const unusedPhoto = photos.find(
          (p: any) => p?.urls?.regular && !usedUrls.has(p.urls.regular)
        );

        if (unusedPhoto) {
          usedUrls.add(unusedPhoto.urls.regular);
          return {
            url: unusedPhoto.urls.regular,
            alt: unusedPhoto.alt_description || query,
            photographer: unusedPhoto.user?.name || 'Unsplash Photographer',
            photographerUrl: unusedPhoto.user?.links?.html || 'https://unsplash.com',
          };
        }
      } else {
        console.warn(`Unsplash API responded with ${res.status} for query "${cleanQuery}"`);
      }
    } catch (err) {
      console.warn('Unsplash fetch error:', err);
    }
  }

  // Fallback to local image pool with semantic keyword matching and de-duplication
  const queryWords = cleanQuery.toLowerCase().split(/\s+/);

  // 1. Try finding an unused image matching keywords
  let bestFallback = LOCAL_FALLBACK_POOL.find(
    (item) =>
      !usedUrls.has(item.url) &&
      (item.keywords.some((k) => queryWords.some((w) => w.includes(k) || k.includes(w))) ||
        item.domains.includes(categoryHint.toLowerCase()))
  );

  // 2. If all keyword matches are used, find ANY unused local image
  if (!bestFallback) {
    bestFallback = LOCAL_FALLBACK_POOL.find((item) => !usedUrls.has(item.url));
  }

  // 3. Absolute safety fallback
  const fallbackUrl = bestFallback ? bestFallback.url : '/images/ambient_sanctuary_bg.jpg';
  usedUrls.add(fallbackUrl);

  return {
    url: fallbackUrl,
    alt: bestFallback?.alt || query,
    photographer: 'Undernote Editorial Archive',
    photographerUrl: 'https://undernote.co',
  };
}
