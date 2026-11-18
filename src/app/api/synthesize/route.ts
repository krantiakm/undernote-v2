import { NextRequest, NextResponse } from 'next/server';
import { synthesizeContext } from '@/lib/gemini/synthesizer';
import {
  CardData,
  ContextItemData,
  EventCategory,
  GeographyAnchor,
  PersonaArchetype,
} from '@/types';
import { curatedEventsCards } from '@/data/eventsData';

const EVENT_IMAGE_POOL: Record<GeographyAnchor, Record<EventCategory, string>> = {
  'india-blr': {
    music: '/v2/images/events/blr_chamber_recital.jpg',
    theatre: '/v2/images/events/blr_theatre_stage.jpg',
    talks: '/v2/images/events/blr_bookstore_salon.jpg',
    art: '/v2/images/events/sin_gallery_twilight.jpg',
    workshops: '/v2/images/events/blr_pottery_studio.jpg',
    walks: '/v2/images/events/blr_cubbon_walk.jpg',
    'supper-cinema': '/v2/images/events/blr_supper_club.jpg',
  },
  'singapore-sin': {
    music: '/v2/images/events/sin_recital_studio.jpg',
    theatre: '/v2/images/events/blr_theatre_stage.jpg',
    talks: '/v2/images/events/blr_bookstore_salon.jpg',
    art: '/v2/images/events/sin_gallery_twilight.jpg',
    workshops: '/v2/images/events/sin_printmaking_stpi.jpg',
    walks: '/v2/images/events/sin_shophouse_walk.jpg',
    'supper-cinema': '/v2/images/events/sin_botanical_supper.jpg',
  },
};

function inferEventCategory(text: string): { category: EventCategory; label: string } {
  const lower = text.toLowerCase();
  if (/theatre|play|stage|drama/.test(lower)) return { category: 'theatre', label: 'Theatre' };
  if (/walk|park|tree|trail|heritage|shophouse|botanical/.test(lower))
    return { category: 'walks', label: 'Walks' };
  if (/clay|pottery|print|paper|craft|studio|workshop/.test(lower))
    return { category: 'workshops', label: 'Workshops' };
  if (/gallery|museum|exhibition|art|textile/.test(lower))
    return { category: 'art', label: 'Art & Exhibitions' };
  if (/supper|dinner|tasting|cinema|film|screening/.test(lower))
    return { category: 'supper-cinema', label: 'Supper & Cinema' };
  if (/talk|salon|book|reading|lecture/.test(lower))
    return { category: 'talks', label: 'Talks & Salons' };
  return { category: 'music', label: 'Music & Acoustic' };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawText, geography: reqGeo } = body;
    const geo: GeographyAnchor = reqGeo === 'singapore-sin' ? 'singapore-sin' : 'india-blr';
    const isSin = geo === 'singapore-sin';

    if (!rawText || typeof rawText !== 'string' || rawText.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please share a few lines about what matters to you.' },
        { status: 400 }
      );
    }

    const synthesized = await synthesizeContext(rawText);
    const pool = EVENT_IMAGE_POOL[geo];
    const tileKeys: EventCategory[] = ['music', 'walks', 'talks', 'workshops', 'art', 'supper-cinema'];

    const tileImages = synthesized.persona.lookbookTiles.slice(0, 6).map((tile, idx) => {
      const cat = inferEventCategory(`${tile.domain} ${tile.title} ${tile.pillarName || ''}`);
      return {
        domain: 'events',
        pillarName: tile.pillarName || cat.label,
        foundationBadge: tile.foundationBadge || tile.title,
        title: tile.title,
        pullQuote: tile.pullQuote,
        enduringTendency: tile.enduringTendency,
        currentFocus: tile.currentFocus,
        heroImage: pool[cat.category] || pool[tileKeys[idx % tileKeys.length]],
        aspectRatio: (idx % 2 === 0 ? 'tall' : 'square') as 'tall' | 'square',
        localAnchor: isSin ? 'Singapore' : 'Bangalore',
      };
    });

    const fullPersona: PersonaArchetype = {
      userName: synthesized.persona.userName || 'Kranti',
      monogram: (synthesized.persona.monogram || synthesized.persona.userName || 'K')
        .charAt(0)
        .toUpperCase(),
      title: synthesized.persona.title,
      tagline: synthesized.persona.manifestoHeadline,
      locationAnchor: isSin ? 'Singapore' : 'Bangalore, India',
      homeAirport: isSin ? 'SIN' : 'BLR',
      currency: isSin ? 'SGD (S$)' : 'INR (₹)',
      familyComposition: 'Personal Context',
      domainCapsules: [],
      lifeNarrative: {
        manifestoHeadline: synthesized.persona.manifestoHeadline,
        openingSummary: synthesized.persona.openingSummary,
        chapters: synthesized.persona.chapters.slice(0, 2).map((ch, idx) => ({
          id: ch.id || `ch-${idx}`,
          title: ch.title,
          subtitle: ch.subtitle,
          body: ch.body,
          pullQuote: ch.pullQuote,
          image: idx === 0 ? pool.music : pool.walks,
        })),
      },
      lookbookTiles: tileImages,
      livingStory: [],
    };

    const fullContextItems: ContextItemData[] = synthesized.contextRules.map((rule, idx) => ({
      id: `ctx-live-${Date.now()}-${idx}`,
      domain: 'events',
      type: rule.type as ContextItemData['type'],
      key: rule.key,
      value: rule.value,
      durability: rule.durability,
      horizon: rule.horizon,
      confidence: rule.confidence,
      status: 'active',
      origin: 'imported',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      provenance: {
        provider: 'Imported Memory',
      },
    }));

    // Blend curated real-world market events personalized with the user's matched context reasons
    const marketCards = curatedEventsCards
      .filter((c) => c.geography === geo)
      .map((card, idx) => {
        const matchedRule = fullContextItems[idx % Math.max(1, fullContextItems.length)];
        return {
          ...card,
          eventMeta: card.eventMeta
            ? {
                ...card.eventMeta,
                personalFitLine: matchedRule
                  ? `Tuned to "${matchedRule.key}" — ${card.eventMeta.personalFitLine}`
                  : card.eventMeta.personalFitLine,
              }
            : undefined,
        };
      });

    return NextResponse.json({
      success: true,
      persona: fullPersona,
      contextItems: fullContextItems,
      cards: marketCards,
      calibrationQuestions: synthesized.calibrationQuestions || [],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to synthesize context';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
