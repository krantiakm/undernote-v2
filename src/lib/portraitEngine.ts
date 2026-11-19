import {
  ContextItemData,
  GeographyAnchor,
  LookbookTile,
  OnboardingStatus,
  PersonaArchetype,
  RadarDomain,
} from '@/types';

export type ContextSlice = 'events' | 'dining' | 'travel' | 'books' | 'shopping';

export interface SliceMeta {
  id: ContextSlice;
  label: string;
  shortHint: string;
}

export const ALL_CONTEXT_SLICES: SliceMeta[] = [
  { id: 'events', label: 'Events', shortHint: 'Events' },
  { id: 'dining', label: 'Dining', shortHint: 'Dining' },
  { id: 'travel', label: 'Travel', shortHint: 'Travel' },
  { id: 'books', label: 'Books & Ideas', shortHint: 'Books' },
  { id: 'shopping', label: 'Shopping & Craft', shortHint: 'Craft' },
];

export type PersonaId =
  | 'midnight_catalyst'
  | 'table_gatherer'
  | 'daylight_explorer'
  | 'hands_on_maker'
  | 'curious_flaneur'
  | 'deep_listener';

export interface PersonaProfile {
  id: PersonaId;
  name: string;
  badge: string;
  tagline: string;
  heroImage: string;
  accentHex: string;
  portraitEssay: string;
  howUndernoteTunes: string;
  signatureTraits: string[];
  nudgeRule: {
    key: string;
    value: string;
    type: 'preference' | 'constraint';
    domain: RadarDomain;
  };
}

export const PERSONA_CATALOG: Record<PersonaId, PersonaProfile> = {
  midnight_catalyst: {
    id: 'midnight_catalyst',
    name: 'The Midnight Catalyst',
    badge: 'NIGHTS & LIVE ENERGY',
    tagline: 'Electric vinyl bars, open-air stages, and nights that hit their stride after ten.',
    heroImage: '/v2/images/personas/persona_midnight_catalyst.jpg',
    accentHex: '#E68860',
    portraitEssay:
      'You draw real energy from a room in motion. While half the city winds down at nine, you come alive around warm horn speakers, late-night selectors, open-air gigs, and spontaneous second stops where everyone is locked into the music.',
    howUndernoteTunes:
      'Prioritizes buzzing vinyl listening bars, live evening stages, rooftop sets, and late screenings—never hiding great nights that run past midnight.',
    signatureTraits: ['Late-Night Energy', 'Vinyl & Live Stages', 'Magnetic Crowds'],
    nudgeRule: {
      key: 'Late-Night Vinyl & Live Stages',
      value:
        'Loves electric vinyl bars, DJ selectors, open-air stages, and vibrant evening crowds running past 10:30 PM.',
      type: 'preference',
      domain: 'events',
    },
  },
  table_gatherer: {
    id: 'table_gatherer',
    name: 'The Table Gatherer',
    badge: 'CULINARY & COMPANY',
    tagline: 'Long-table suppers, expressive kitchens, and evenings anchored around who is eating together.',
    heroImage: '/v2/images/personas/persona_table_gatherer.jpg',
    accentHex: '#C66E45',
    portraitEssay:
      'For you, the truest measure of a city—or any trip—is what lands in the middle of the table and the conversation around it. Intimate chef pop-ups, heirloom regional menus, specialty roasters, and generous shared plates always win.',
    howUndernoteTunes:
      'Elevates 12-to-30-seat supper clubs, regional tasting tables, craft coffee & wine rooms, and dining-led plans tuned strictly to your dietary rules.',
    signatureTraits: ['Supper Clubs', 'Shared Plates', 'Host Instinct'],
    nudgeRule: {
      key: 'Shared Suppers & Tasting Tables',
      value:
        'Drawn to intimate supper clubs, expressive regional kitchens, specialty coffee, and gathering friends around a great table.',
      type: 'preference',
      domain: 'food-drink',
    },
  },
  daylight_explorer: {
    id: 'daylight_explorer',
    name: 'The Daylight Explorer',
    badge: 'FIRST LIGHT & TRAILS',
    tagline: 'Sunlit canopies, hidden streets, and mornings well spent before the city wakes.',
    heroImage: '/v2/images/personas/persona_daylight_explorer.jpg',
    accentHex: '#9DB6A9',
    portraitEssay:
      'Your sharpest hours happen in natural light. Whether it is a 7:15 AM walk beneath rain trees, wandering an old neighborhood with filter coffee in hand, or plotting a scenic weekend escape out of town, open air resets your rhythm.',
    howUndernoteTunes:
      'Highlights dawn botanical & heritage walks, sunlit courtyards, cycling/trail routes, and boutique weekend escapes while protecting weeknight rest.',
    signatureTraits: ['First-Light Walks', 'Open-Air Movement', 'Boutique Escapes'],
    nudgeRule: {
      key: 'First-Light Walks & Scenic Escapes',
      value:
        'Loves 7:15 AM tree walks, exploring neighborhoods on foot, outdoor movement, and scenic boutique getaways.',
      type: 'preference',
      domain: 'travel',
    },
  },
  hands_on_maker: {
    id: 'hands_on_maker',
    name: 'The Hands-On Maker',
    badge: 'CRAFT & MATERIAL',
    tagline: 'Clay on the bench, honest materials, and studios where you make rather than watch.',
    heroImage: '/v2/images/personas/persona_hands_on_maker.jpg',
    accentHex: '#D99B78',
    portraitEssay:
      'After days spent in front of glowing screens, your curiosity gravitates toward things with grain, weight, and human touch. Small stoneware benches, relief printmaking, natural linen, and independent makers speak louder than big spectacles.',
    howUndernoteTunes:
      'Surfaces 8-to-12-seat ceramic, paper, woodblock, and tea studios alongside independent craft objects and design ateliers.',
    signatureTraits: ['Tactile Studios', 'Small Benches', 'Well-Made Objects'],
    nudgeRule: {
      key: 'Tactile Craft Studios & Objects',
      value:
        'Drawn to small-bench stoneware, printmaking, paper craft, and thoughtfully made everyday objects.',
      type: 'preference',
      domain: 'shopping',
    },
  },
  curious_flaneur: {
    id: 'curious_flaneur',
    name: 'The Curious Flâneur',
    badge: 'IDEAS, BOOKS & CINEMA',
    tagline: 'Indie bookshops, twilight galleries, and rooms that send you home with a new thought.',
    heroImage: '/v2/images/personas/persona_curious_flaneur.jpg',
    accentHex: '#A8C2B5',
    portraitEssay:
      'You move through a city like a reader following margin notes. Fifteen chairs in an independent bookshop, a director Q&A at a repertory cinema, or a twilight gallery walkthrough—if a room sparks sharp conversation, it is your kind of evening.',
    howUndernoteTunes:
      'Prioritizes bookshop salons, curator walkthroughs, indie & world cinema, architecture talks, and sharp non-fiction or literary picks.',
    signatureTraits: ['Bookshop Salons', 'Arthouse Cinema', 'Gallery Walks'],
    nudgeRule: {
      key: 'Bookshop Salons, Essays & Cinema',
      value:
        'Enjoys independent bookshop salons, twilight gallery walkthroughs, arthouse screenings, and cultural essays.',
      type: 'preference',
      domain: 'books',
    },
  },
  deep_listener: {
    id: 'deep_listener',
    name: 'The Deep Listener',
    badge: 'INTIMATE ACOUSTICS',
    tagline: 'Unamplified timber halls, unhurried pace, and rooms where every note lands cleanly.',
    heroImage: '/v2/images/personas/persona_deep_listener.jpg',
    accentHex: '#9DB6A9',
    portraitEssay:
      'You care about presence far more than volume. A 200-seat hall where strings or bansuri carry without a PA, a play that begins right on time, and stepping out into calm night air by 9:30 PM feel infinitely richer than shouting over a crowd.',
    howUndernoteTunes:
      'Filters for acoustic clarity, seated rooms under 300 capacity, punctual weeknight curtains, and unhurried cultural gatherings.',
    signatureTraits: ['Under 300 Seats', 'Acoustic Clarity', 'Unhurried Evenings'],
    nudgeRule: {
      key: 'Intimate Unamplified Listening',
      value:
        'Drawn to seated timber halls and courtyards under 300 seats where live music and theatre carry naturally.',
      type: 'preference',
      domain: 'events',
    },
  },
};

export interface PortraitBentoItem {
  id: string;
  variant: 'photo' | 'architectural';
  theme?: 'forest' | 'linen' | 'terracotta';
  iconKind?: 'clock' | 'diet' | 'circle' | 'pin' | 'spark';
  eyebrow: string;
  title: string;
  caption: string;
  image?: string;
  span: 'wide' | 'tall' | 'square';
  slices: ContextSlice[];
  detailBody: string;
  matchedRules: ContextItemData[];
  flipAction?: {
    buttonLabel: string;
    key: string;
    value: string;
    type: 'preference' | 'constraint';
    domain: RadarDomain;
  };
}

export interface MatchedPersonaResult {
  primary: PersonaProfile;
  secondary: PersonaProfile;
  whyMatched: string[];
  allPersonas: PersonaProfile[];
  isColdStart: boolean;
}

export interface VisualPortraitData {
  personaMatch: MatchedPersonaResult;
  bentoItems: PortraitBentoItem[];
  activeSlices: SliceMeta[];
  unmappedSlices: SliceMeta[];
  totalSignals: number;
}

const CUSTOM_FALLBACK_IMAGES: Record<ContextSlice, string[]> = {
  travel: [
    '/v2/images/hero_srilanka_villa.jpg',
    '/v2/images/scenic_alpine_rail.jpg',
    '/v2/images/for_you_alpine_cabin.jpg',
    '/v2/images/feed_modern_coastal.jpg',
  ],
  books: [
    '/v2/images/hero_alexander_book.jpg',
    '/v2/images/for_you_indie_cinema.jpg',
    '/v2/images/for_you_film.jpg',
    '/v2/images/me/me_pillar_ideas.jpg',
  ],
  shopping: [
    '/v2/images/craft_linen_jacket.jpg',
    '/v2/images/hero_sonya7cr_camera.jpg',
    '/v2/images/ceramic_teapot_tea.jpg',
    '/v2/images/me/me_pillar_craft.jpg',
  ],
  dining: [
    '/v2/images/specialty_coffee_roaster.jpg',
    '/v2/images/for_you_bistro.jpg',
    '/v2/images/hero_araku_coffee.jpg',
    '/v2/images/me/me_pillar_table.jpg',
  ],
  events: [
    '/v2/images/feed_vinyl_listening.jpg',
    '/v2/images/for_you_audiophile.jpg',
    '/v2/images/feed_museum_event.jpg',
    '/v2/images/hero_theatre_acoustic.jpg',
  ],
};

export function inferSlicesAndDomain(rawText: string, existingDomain?: RadarDomain): {
  primaryDomain: RadarDomain;
  slices: ContextSlice[];
} {
  const text = rawText.toLowerCase();
  const slices = new Set<ContextSlice>();

  if (
    existingDomain === 'travel' ||
    /travel|flight|hotel|stay|villa|train|trip|island|mountain|trail|hike|walk|kyoto|sri lanka|bali|airport|window seat|getaway/.test(
      text
    )
  ) {
    slices.add('travel');
  }

  if (
    existingDomain === 'food-drink' ||
    /food|vegetarian|vegan|supper|dining|dinner|menu|coffee|roaster|tea|wine|cocktail|bakery|sourdough|chef|kitchen|cafe|allerg/.test(
      text
    )
  ) {
    slices.add('dining');
  }

  if (
    existingDomain === 'books' ||
    existingDomain === 'films' ||
    /book|read|novel|essay|fiction|author|poetry|salon|literature|cinema|film|movie|director|philosophy|architecture|history/.test(
      text
    )
  ) {
    slices.add('books');
  }

  if (
    existingDomain === 'shopping' ||
    /shop|buy|craft|linen|denim|ceramic|stoneware|pottery|jacket|watch|camera|gear|design|printmaking|woodblock|leather|handmade|wardrobe/.test(
      text
    )
  ) {
    slices.add('shopping');
  }

  if (
    existingDomain === 'events' ||
    /concert|music|vinyl|dj|party|club|dance|nightlife|stage|theatre|play|recital|jazz|gallery|workshop|curtain|weeknight|crowd|bar|gig|festival/.test(
      text
    )
  ) {
    slices.add('events');
  }

  if (slices.size === 0) {
    slices.add('events');
  }

  const ordered = Array.from(slices);
  let primaryDomain: RadarDomain = existingDomain || 'events';
  if (!existingDomain) {
    if (slices.has('travel')) primaryDomain = 'travel';
    else if (slices.has('books')) primaryDomain = 'books';
    else if (slices.has('shopping')) primaryDomain = 'shopping';
    else if (slices.has('dining')) primaryDomain = 'food-drink';
    else primaryDomain = 'events';
  }

  return { primaryDomain, slices: ordered };
}

export function buildShortTitleFromFreeText(rawText: string): string {
  const cleaned = rawText
    .replace(/^(i love|i like|i prefer|i enjoy|always|strictly|no |never |avoid |looking for |obsessed with )/i, '')
    .trim();
  const words = cleaned.split(/\s+/).slice(0, 4);
  if (words.length === 0) return 'Personal Signal';
  const joined = words.join(' ').replace(/[.,;:!?]+$/, '');
  return joined.charAt(0).toUpperCase() + joined.slice(1);
}

export function deriveVisualPortrait(
  contextItems: ContextItemData[],
  persona: PersonaArchetype,
  geography: GeographyAnchor,
  onboardingStatus: OnboardingStatus,
  hasPersonalized: boolean
): VisualPortraitData {
  const isSin = geography === 'singapore-sin';
  const isTuned = onboardingStatus === 'tuned' || hasPersonalized || contextItems.length > 0;
  const activeRules = isTuned ? contextItems.filter((c) => c.status === 'active') : [];
  const corpus = activeRules.map((r) => `${r.key} ${r.value}`.toLowerCase()).join(' | ');

  // Track which rule IDs have been represented so custom/imported items become their own Bentos!
  const consumedIds = new Set<string>();

  const claimMatching = (regex: RegExp): ContextItemData[] => {
    const hits = activeRules.filter((r) => regex.test(`${r.key} ${r.value}`.toLowerCase()));
    hits.forEach((h) => consumedIds.add(h.id));
    return hits;
  };

  // Core thematic clusters
  const highEnergyMatches = claimMatching(
    /vinyl|dj|party|club|nightlife|open-air|lively|buzzing|love this energy|late-evening social|rooftop|house music|techno|festival|dancing/
  );
  const intimateSoundMatches = claimMatching(
    /unamplified|acoustic|chamber|recital|bansuri|strings|seated.*300|small timber|theatre|ranga shankara|esplanade recital/
  );
  const rhythmMatches = claimMatching(
    /9:15|9:30|9:45|weeknight|late nights|late evenings|past 10|curtain|sunday.*free/
  );
  const morningWalkMatches = claimMatching(
    /morning|dawn|7:15|7:30|walk|canopy|rain-tree|cubbon|shophouse|botanical|trail|cycling/
  );
  const craftMatches = claimMatching(
    /clay|stoneware|pottery|printmaking|woodblock|paper|craft|bench|workshop|making|ceramic|tea studio/
  );
  const ideasMatches = claimMatching(
    /salon|bookshop|champaca|essay|architecture|gallery|curator|museum|cinema|film|projector|reading/
  );
  const tableMatches = claimMatching(
    /vegetarian|vegan|supper|tasting|menus|culinary|food|dining|chef|ferment|coffee|wine/
  );
  const circleRadiusMatches = claimMatching(
    /child|kid|daughter|family|indiranagar|domlur|tiong bahru|circle line|central|under ₹|under s\$/
  );

  // ============================================================================
  // 1. SCORE & MATCH PERSONA ACROSS THE 6 DIVERSE ARCHETYPES
  // ============================================================================
  const explicitOverride = activeRules.find(
    (r) =>
      r.provenance?.provider === 'Persona Choice' &&
      r.provenance?.importId &&
      r.provenance.importId in PERSONA_CATALOG
  );

  const scores: Record<PersonaId, number> = {
    midnight_catalyst: highEnergyMatches.length * 3.4,
    table_gatherer: tableMatches.length * 2.5,
    daylight_explorer: morningWalkMatches.length * 2.8,
    hands_on_maker: craftMatches.length * 2.9,
    curious_flaneur: ideasMatches.length * 2.7,
    deep_listener: intimateSoundMatches.length * 2.6,
  };

  if (/late nights|past 10|open to late|midnight|party|dj/.test(corpus)) {
    scores.midnight_catalyst += 3.2;
  }
  if (/9:15|9:30|early weeknight|unamplified|skip loud/.test(corpus)) {
    scores.deep_listener += 2.2;
    scores.midnight_catalyst = Math.max(0, scores.midnight_catalyst - 1.5);
  }
  if (/supper|chef|tasting|wine|coffee|host/.test(corpus)) {
    scores.table_gatherer += 1.8;
  }
  if (/travel|trail|hike|morning|7:15|outdoor/.test(corpus)) {
    scores.daylight_explorer += 1.8;
  }
  if (/clay|stoneware|linen|handmade|craft|studio/.test(corpus)) {
    scores.hands_on_maker += 1.8;
  }
  if (/book|salon|cinema|gallery|architecture|essay/.test(corpus)) {
    scores.curious_flaneur += 1.8;
  }

  const rankedPersonas = (Object.keys(PERSONA_CATALOG) as PersonaId[])
    .sort((a, b) => scores[b] - scores[a])
    .map((id) => PERSONA_CATALOG[id]);

  const primaryPersona = explicitOverride?.provenance?.importId
    ? PERSONA_CATALOG[explicitOverride.provenance.importId as PersonaId]
    : rankedPersonas[0] || PERSONA_CATALOG.curious_flaneur;

  const secondaryPersona =
    rankedPersonas.find((p) => p.id !== primaryPersona.id) || PERSONA_CATALOG.daylight_explorer;

  const whyMatched: string[] = activeRules
    .slice(0, 4)
    .map((r) => `${r.key}: ${r.value}`);

  if (whyMatched.length === 0) {
    whyMatched.push(
      'Your portrait starts here—add signals or swipe the taste deck to sharpen your persona.'
    );
  }

  // ============================================================================
  // 2. BUILD UNIFIED BENTO MOSAIC WITH CROSS-DOMAIN AUTO-SLICES
  // ============================================================================
  const bentoItems: PortraitBentoItem[] = [];

  // A. High-Energy Nightlife OR Intimate Acoustics Bento
  if (highEnergyMatches.length > 0) {
    bentoItems.push({
      id: 'bento-electric-nights',
      variant: 'photo',
      eyebrow: 'SOCIAL SOUND & NIGHTS',
      title: 'Vinyl Bars & Open-Air Stages',
      caption: 'Analog selectors, warm horn speakers & electric rooms',
      image: '/v2/images/me/me_pillar_social.jpg',
      span: 'wide',
      slices: ['events', 'travel'],
      detailBody: highEnergyMatches.map((m) => m.value).join(' · '),
      matchedRules: highEnergyMatches,
      flipAction: {
        buttonLabel: 'Switch to intimate seated halls instead',
        key: 'Intimate Unamplified Rooms',
        value: 'Prefer seated rooms under 300 seats where music carries without heavy PA.',
        type: 'constraint',
        domain: 'events',
      },
    });
  } else if (intimateSoundMatches.length > 0) {
    bentoItems.push({
      id: 'bento-intimate-acoustics',
      variant: 'photo',
      eyebrow: 'NATURAL ACOUSTICS',
      title: 'Rooms Where Sound Breathes',
      caption: 'Timber halls & courtyards under 300 seats',
      image: '/v2/images/me/me_pillar_acoustics.jpg',
      span: 'wide',
      slices: ['events'],
      detailBody: intimateSoundMatches.map((m) => m.value).join(' · '),
      matchedRules: intimateSoundMatches,
      flipAction: {
        buttonLabel: 'Open up to lively vinyl bars & stages',
        key: 'Vinyl Bars & Live Stages',
        value: 'Enjoys warm vinyl listening bars, live evening bands, and buzzing social rooms.',
        type: 'preference',
        domain: 'events',
      },
    });
  }

  // B. Daylight & Trails Bento (Events + Travel)
  if (morningWalkMatches.length > 0) {
    bentoItems.push({
      id: 'bento-mornings',
      variant: 'photo',
      eyebrow: 'FIRST LIGHT',
      title: isSin ? 'Dawn Shophouse Walks' : 'Rain-Tree Mornings',
      caption: 'Outdoors before 9 AM under canopies & heritage lanes',
      image: '/v2/images/me/me_pillar_mornings.jpg',
      span: 'tall',
      slices: ['events', 'travel'],
      detailBody: morningWalkMatches.map((m) => m.value).join(' · '),
      matchedRules: morningWalkMatches,
    });
  }

  // C. Architectural Evening Rhythm Bento (Square — Crisp Typographic Tile Inside Grid!)
  if (rhythmMatches.length > 0) {
    const isLateOpen = /late nights|open to late|past 10/.test(
      rhythmMatches.map((m) => `${m.key} ${m.value}`.toLowerCase()).join(' ')
    );
    bentoItems.push({
      id: 'bento-rhythm-clock',
      variant: 'architectural',
      theme: isLateOpen ? 'terracotta' : 'forest',
      iconKind: 'clock',
      eyebrow: 'EVENING PACE',
      title: isLateOpen ? 'Late-Night Open' : 'Home by 9:30 PM',
      caption: isLateOpen
        ? 'Happy staying out past 10 PM when the room is right'
        : 'Punctual weeknight curtains that protect tomorrow morning',
      span: 'square',
      slices: ['events', 'dining', 'travel'],
      detailBody: rhythmMatches.map((m) => m.value).join(' · '),
      matchedRules: rhythmMatches,
      flipAction: isLateOpen
        ? {
            buttonLabel: 'Switch to Home by 9:30 PM on weeknights',
            key: 'Early Weeknight Finish',
            value: 'Prefer punctual weeknight curtains that wrap up cleanly by 9:30 PM.',
            type: 'constraint',
            domain: 'events',
          }
        : {
            buttonLabel: 'Switch to Late-Night Open (past 10 PM)',
            key: 'Late-Night Open',
            value: 'Happy staying out past 10:30 PM for great evening sets, suppers, and screenings.',
            type: 'preference',
            domain: 'events',
          },
    });
  }

  // D. Tactile Craft & Studios Bento (Events + Shopping)
  if (craftMatches.length > 0) {
    bentoItems.push({
      id: 'bento-craft',
      variant: 'photo',
      eyebrow: 'WORKING HANDS',
      title: 'Clay, Woodblock & Paper',
      caption: 'Small 8-bench studios & tactile objects',
      image: '/v2/images/me/me_pillar_craft.jpg',
      span: 'square',
      slices: ['events', 'shopping'],
      detailBody: craftMatches.map((m) => m.value).join(' · '),
      matchedRules: craftMatches,
    });
  }

  // E. Ideas, Books & Cinema Bento (Events + Books + Travel)
  if (ideasMatches.length > 0) {
    bentoItems.push({
      id: 'bento-ideas',
      variant: 'photo',
      eyebrow: 'BOOKS & GALLERIES',
      title: 'Salons, Books & Indie Film',
      caption: '15 chairs, curator walks & sharp conversation',
      image: '/v2/images/me/me_pillar_ideas.jpg',
      span: morningWalkMatches.length === 0 ? 'tall' : 'square',
      slices: ['events', 'books', 'travel'],
      detailBody: ideasMatches.map((m) => m.value).join(' · '),
      matchedRules: ideasMatches,
    });
  }

  // F. Table & Dietary Bento (Photo + Architectural Guardrail if Vegetarian)
  if (tableMatches.length > 0) {
    const isVeg = /100% vegetarian|strictly vegetarian|pure vegetarian|vegan/.test(
      tableMatches.map((m) => `${m.key} ${m.value}`.toLowerCase()).join(' ')
    );
    bentoItems.push({
      id: 'bento-table',
      variant: 'photo',
      eyebrow: isVeg ? '100% VEGETARIAN TABLE' : 'AT THE TABLE',
      title: isVeg ? 'Botanical & Heirloom Kitchens' : 'Shared Suppers & Tasting Menus',
      caption: isVeg
        ? 'Strictly plant-forward supper clubs, cafés & travel tables'
        : 'Chef tasting tables, regional kitchens & specialty coffee',
      image: '/v2/images/me/me_pillar_table.jpg',
      span: 'wide',
      slices: ['dining', 'events', 'travel'],
      detailBody: tableMatches.map((m) => m.value).join(' · '),
      matchedRules: tableMatches,
      flipAction: isVeg
        ? {
            buttonLabel: 'Switch to Open to All Menus',
            key: 'Open to All Culinary Menus',
            value: 'Open to regional seafood, tasting tables, and plant-forward menus alike.',
            type: 'preference',
            domain: 'food-drink',
          }
        : {
            buttonLabel: 'Set boundary: 100% Vegetarian',
            key: '100% Vegetarian Dining',
            value: 'Strictly vegetarian for any supper club, restaurant, or travel table.',
            type: 'constraint',
            domain: 'food-drink',
          },
    });
  }

  // G. Circle & Local Radius Architectural Bento
  if (circleRadiusMatches.length > 0) {
    const hasKids = /child|kid|daughter|family/.test(
      circleRadiusMatches.map((m) => `${m.key} ${m.value}`.toLowerCase()).join(' ')
    );
    bentoItems.push({
      id: 'bento-circle-radius',
      variant: 'architectural',
      theme: 'linen',
      iconKind: hasKids ? 'circle' : 'pin',
      eyebrow: hasKids ? 'WEEKEND CIRCLE' : 'HOME RADIUS',
      title: hasKids
        ? 'Kid-Welcoming Mornings'
        : isSin
        ? 'Central & Tiong Bahru'
        : 'Indiranagar & Central',
      caption: circleRadiusMatches[0].value,
      span: 'square',
      slices: hasKids ? ['events', 'travel', 'dining'] : ['events', 'dining'],
      detailBody: circleRadiusMatches.map((m) => m.value).join(' · '),
      matchedRules: circleRadiusMatches,
    });
  }

  // H. AI-Imported Multi-Domain Lookbook Tiles (Travel, Books, Shopping, etc.)
  const extraLookbookTiles: LookbookTile[] = (persona.lookbookTiles || []).filter(
    (t) => t.domain !== 'events' && hasPersonalized
  );
  extraLookbookTiles.slice(0, 4).forEach((tile, idx) => {
    const { slices } = inferSlicesAndDomain(
      `${tile.domain} ${tile.pillarName || ''} ${tile.title} ${tile.pullQuote}`
    );
    bentoItems.push({
      id: `bento-lookbook-${idx}`,
      variant: 'photo',
      eyebrow: (tile.pillarName || tile.domain).toUpperCase(),
      title: tile.title,
      caption: tile.pullQuote,
      image: tile.heroImage,
      span: 'square',
      slices,
      detailBody: `${tile.enduringTendency} ${tile.currentFocus}`.trim(),
      matchedRules: [],
    });
  });

  // I. Every Unclaimed Custom / User-Added / Imported Signal Spawns Its Own Bento!
  const usedFallbackImages = new Set<string>(
    bentoItems.map((b) => b.image).filter(Boolean) as string[]
  );

  const remainingCustomRules = activeRules.filter(
    (r) => !consumedIds.has(r.id) && r.provenance?.provider !== 'Persona Choice'
  );

  remainingCustomRules.forEach((rule, idx) => {
    const { slices } = inferSlicesAndDomain(`${rule.key} ${rule.value}`, rule.domain);
    const primarySlice = slices[0] || 'events';
    const isHardBoundary = rule.type === 'constraint' || rule.type === 'dislike';

    if (isHardBoundary && idx % 2 === 1) {
      bentoItems.push({
        id: `bento-custom-${rule.id}`,
        variant: 'architectural',
        theme: 'terracotta',
        iconKind: 'spark',
        eyebrow: `${primarySlice.toUpperCase()} BOUNDARY`,
        title: rule.key,
        caption: rule.value,
        span: 'square',
        slices,
        detailBody: rule.value,
        matchedRules: [rule],
      });
      return;
    }

    const pool = CUSTOM_FALLBACK_IMAGES[primarySlice] || CUSTOM_FALLBACK_IMAGES.events;
    const chosenImg = pool.find((img) => !usedFallbackImages.has(img)) || pool[idx % pool.length];
    usedFallbackImages.add(chosenImg);

    bentoItems.push({
      id: `bento-custom-${rule.id}`,
      variant: 'photo',
      eyebrow: slices.map((s) => s.toUpperCase()).slice(0, 2).join(' · '),
      title: rule.key,
      caption: rule.value,
      image: chosenImg,
      span: idx === 0 && bentoItems.length % 2 === 0 ? 'wide' : 'square',
      slices,
      detailBody: rule.value,
      matchedRules: [rule],
    });
  });

  // Compute Active vs Unmapped Slices for the Auto-Segmented Filter Bar + Subtle Hint!
  const activeSliceSet = new Set<ContextSlice>();
  bentoItems.forEach((item) => {
    item.slices.forEach((s) => activeSliceSet.add(s));
  });

  const activeSlices = ALL_CONTEXT_SLICES.filter((s) => activeSliceSet.has(s.id));
  const unmappedSlices = ALL_CONTEXT_SLICES.filter((s) => !activeSliceSet.has(s.id));

  return {
    personaMatch: {
      primary: primaryPersona,
      secondary: secondaryPersona,
      whyMatched,
      allPersonas: Object.values(PERSONA_CATALOG),
      isColdStart: activeRules.length === 0,
    },
    bentoItems,
    activeSlices,
    unmappedSlices,
    totalSignals: contextItems.length,
  };
}
