/**
 * Undernote Native Storefront Ingestion Engine (Shopify / WooCommerce)
 * Sub-50ms conditional ingestion using HTTP ETag / If-None-Match caching.
 */

export interface ShopifyProductVariant {
  id: number;
  title: string;
  price: string;
  sku: string;
  available: boolean;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[] | string;
  variants: ShopifyProductVariant[];
  images: Array<{ id: number; src: string; width: number; height: number }>;
}

export interface NormalizedStoreOpportunity {
  sourceDomain: string;
  title: string;
  handle: string;
  productUrl: string;
  cleanDescription: string;
  price: number;
  currency: string;
  isAvailable: boolean;
  images: string[];
  tags: string[];
  attributes: {
    isAnaerobic?: boolean;
    isLightRoast?: boolean;
    flavorNotes?: string[];
    isHardwareCompact?: boolean;
  };
  publishedAt: string;
  updatedAt: string;
}

export interface IngestionResult {
  status: 'updated' | 'unmodified' | 'error';
  eTag?: string;
  domain: string;
  opportunities?: NormalizedStoreOpportunity[];
  error?: string;
}

/**
 * Polls an independent Shopify store endpoint with ETag conditional validation
 */
export async function pollShopifyStore(
  domain: string,
  collectionSlug: string = 'coffee',
  previousETag?: string
): Promise<IngestionResult> {
  try {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const url = `https://${cleanDomain}/collections/${collectionSlug}/products.json?limit=50`;

    const headers: Record<string, string> = {
      'User-Agent': 'UndernoteSovereignBot/1.0 (+https://undernote.ai/bot)',
      'Accept': 'application/json',
    };

    if (previousETag) {
      headers['If-None-Match'] = previousETag;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (response.status === 304) {
      return {
        status: 'unmodified',
        domain: cleanDomain,
        eTag: previousETag,
      };
    }

    if (!response.ok) {
      return {
        status: 'error',
        domain: cleanDomain,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const newETag = response.headers.get('ETag') || undefined;
    const data = await response.json();
    const products: ShopifyProduct[] = data.products || [];

    const opportunities: NormalizedStoreOpportunity[] = products.map((p) => {
      const isAvailable = p.variants.some((v) => v.available);
      const prices = p.variants.map((v) => parseFloat(v.price)).filter((n) => !isNaN(n));
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      
      const tagArray = Array.isArray(p.tags)
        ? p.tags
        : typeof p.tags === 'string'
        ? p.tags.split(',').map((t) => t.trim())
        : [];

      const lowerTags = tagArray.map((t) => t.toLowerCase());
      const lowerTitle = p.title.toLowerCase();
      const lowerBody = (p.body_html || '').toLowerCase();

      // Clean HTML tags from description
      const cleanDesc = (p.body_html || '')
        .replace(/<[^>]*>?/gm, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        sourceDomain: cleanDomain,
        title: p.title,
        handle: p.handle,
        productUrl: `https://${cleanDomain}/products/${p.handle}`,
        cleanDescription: cleanDesc,
        price: minPrice,
        currency: 'INR',
        isAvailable,
        images: p.images ? p.images.map((img) => img.src) : [],
        tags: tagArray,
        attributes: {
          isAnaerobic: lowerTags.includes('anaerobic') || lowerTitle.includes('anaerobic') || lowerBody.includes('carbonic maceration'),
          isLightRoast: lowerTags.includes('light roast') || lowerTags.includes('filter roast') || lowerTitle.includes('light'),
          flavorNotes: extractFlavorNotes(lowerDesc(cleanDesc)),
        },
        publishedAt: p.published_at,
        updatedAt: p.updated_at,
      };
    });

    return {
      status: 'updated',
      eTag: newETag,
      domain: cleanDomain,
      opportunities,
    };
  } catch (err: any) {
    return {
      status: 'error',
      domain,
      error: err.message || 'Unknown network error',
    };
  }
}

function lowerDesc(text: string): string {
  return text.toLowerCase();
}

function extractFlavorNotes(text: string): string[] {
  const commonNotes = [
    'jasmine', 'peach', 'white peach', 'bergamot', 'apricot', 'floral',
    'honey', 'raw honey', 'citrus', 'lime', 'black tea', 'orange blossom',
    'blueberry', 'tropical', 'guava', 'cardamom'
  ];

  return commonNotes.filter((note) => text.includes(note));
}
