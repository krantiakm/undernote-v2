/**
 * Undernote Books & Literature Ingestion Module (OpenLibrary + Google Books)
 */

export interface BookEnrichmentResult {
  isbn: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishYear?: string;
  pageCount?: number;
  description?: string;
  coverImageUrl?: string;
  subjects: string[];
  isArchitectureOrUrbanism: boolean;
}

/**
 * Enriches a book opportunity by ISBN using OpenLibrary and Google Books APIs
 */
export async function enrichBookByIsbn(isbn: string): Promise<BookEnrichmentResult | null> {
  const cleanIsbn = isbn.replace(/[-\s]/g, '');

  try {
    // 1. Query OpenLibrary API
    const olUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${cleanIsbn}&format=json&jscmd=data`;
    const olRes = await fetch(olUrl, { next: { revalidate: 86400 } });
    
    if (olRes.ok) {
      const olData = await olRes.json();
      const bookData = olData[`ISBN:${cleanIsbn}`];

      if (bookData) {
        const subjects: string[] = (bookData.subjects || []).map((s: any) =>
          typeof s === 'string' ? s : s.name
        );

        const lowerSubjects = subjects.map((s) => s.toLowerCase()).join(' ');
        const isArchitecture =
          lowerSubjects.includes('architecture') ||
          lowerSubjects.includes('urban') ||
          lowerSubjects.includes('city planning') ||
          lowerSubjects.includes('design') ||
          bookData.title.toLowerCase().includes('pattern language');

        return {
          isbn: cleanIsbn,
          title: bookData.title,
          subtitle: bookData.subtitle,
          authors: (bookData.authors || []).map((a: any) => a.name),
          publisher: bookData.publishers?.[0]?.name,
          publishYear: bookData.publish_date,
          pageCount: bookData.number_of_pages,
          coverImageUrl: bookData.cover?.large || bookData.cover?.medium,
          subjects,
          isArchitectureOrUrbanism: isArchitecture,
        };
      }
    }

    // 2. Fallback to Google Books Volume API
    const gbUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`;
    const gbRes = await fetch(gbUrl, { next: { revalidate: 86400 } });
    
    if (gbRes.ok) {
      const gbData = await gbRes.json();
      const item = gbData.items?.[0]?.volumeInfo;

      if (item) {
        const categories: string[] = item.categories || [];
        const isArchitecture = categories.some((c) =>
          /architecture|urban|design|art/i.test(c)
        );

        return {
          isbn: cleanIsbn,
          title: item.title,
          subtitle: item.subtitle,
          authors: item.authors || [],
          publisher: item.publisher,
          publishYear: item.publishedDate,
          pageCount: item.pageCount,
          description: item.description,
          coverImageUrl: item.imageLinks?.thumbnail?.replace('http:', 'https:'),
          subjects: categories,
          isArchitectureOrUrbanism: isArchitecture,
        };
      }
    }

    return null;
  } catch (err) {
    console.error('Book enrichment failed:', err);
    return null;
  }
}
