import {
  ContextItemData,
  GeographyAnchor,
  LookbookTile,
  OnboardingStatus,
  PersonaArchetype,
} from '@/types';

export interface RingAxisSegment {
  id: string;
  label: string;
  shortLabel: string;
  isLit: boolean;
  strength: number; // 0.3 to 1.0 when lit
  accentColor: string;
  summaryLine: string;
  unlockPrompt?: {
    question: string;
    options: Array<{
      label: string;
      key: string;
      value: string;
      type: 'preference' | 'constraint';
    }>;
  };
}

export interface RhythmSnapshot {
  isEarlyCurtain: boolean;
  hasMorningLight: boolean;
  isIntimateScale: boolean;
  isVegetarian: boolean;
  isFamilyFriendly: boolean;
  neighborhoodLabel: string | null;
}

export interface BentoWorldCard {
  id: string;
  eyebrow: string;
  title: string;
  caption: string;
  image: string;
  span: 'wide' | 'tall' | 'square';
  detailBody: string;
  signalCount: number;
}

export interface VisualPortraitData {
  illuminationPercent: number;
  archetypeHeadline: string;
  segments: RingAxisSegment[];
  rhythm: RhythmSnapshot;
  bentoWorlds: BentoWorldCard[];
}

export function deriveVisualPortrait(
  contextItems: ContextItemData[],
  persona: PersonaArchetype,
  geography: GeographyAnchor,
  onboardingStatus: OnboardingStatus,
  hasPersonalized: boolean
): VisualPortraitData {
  const isSin = geography === 'singapore-sin';
  const city = isSin ? 'Singapore' : 'Bangalore';
  const isTuned = onboardingStatus === 'tuned' || hasPersonalized;
  const activeRules = isTuned ? contextItems.filter((c) => c.status === 'active') : [];
  const corpus = activeRules.map((r) => `${r.key} ${r.value}`.toLowerCase()).join(' | ');

  const matchRule = (regex: RegExp) =>
    activeRules.filter((r) => regex.test(`${r.key} ${r.value}`.toLowerCase()));

  const soundMatches = matchRule(/unamplified|acoustic|chamber|music|vinyl|jazz|stage|concert/);
  const rhythmMatches = matchRule(/9:15|9:30|weeknight|late|evening|sunday|curtain/);
  const morningMatches = matchRule(/morning|dawn|7:15|7:30|walk|canopy|tree|shophouse|park/);
  const tableMatches = matchRule(/vegetarian|supper|dining|food|menu|coffee|tea|culinary/);
  const craftMatches = matchRule(/clay|stoneware|print|paper|craft|studio|bench|workshop|making/);
  const ideasMatches = matchRule(/salon|book|essay|talk|gallery|art|curator|architecture|cinema/);
  const companyMatches = matchRule(/child|kid|family|daughter|solo|adults|together/);
  const radiusMatches = matchRule(
    /indiranagar|domlur|cubbon|central|tiong|circle|mrt|budget|under ₹|under s\$/
  );

  const segments: RingAxisSegment[] = [
    {
      id: 'sound',
      label: 'Live Sound',
      shortLabel: 'Sound',
      isLit: soundMatches.length > 0,
      strength: Math.min(1, 0.72 + soundMatches.length * 0.14),
      accentColor: '#9DB6A9',
      summaryLine:
        soundMatches[0]?.value ||
        'Tap below to set whether you prefer unamplified halls or buzzing vinyl rooms.',
      unlockPrompt: {
        question: 'What live music rooms pull you in?',
        options: [
          {
            label: 'Unamplified <250 seats',
            key: 'Intimate Unamplified Rooms',
            value: 'Drawn to small timber halls and courtyards where acoustic sound carries naturally.',
            type: 'preference',
          },
          {
            label: 'Vinyl bars & live stages',
            key: 'Lively Social Sound',
            value: 'Enjoys vinyl listening bars, live bands, and energetic evening stages.',
            type: 'preference',
          },
        ],
      },
    },
    {
      id: 'rhythm',
      label: 'Evening Pace',
      shortLabel: 'Pace',
      isLit: rhythmMatches.length > 0,
      strength: Math.min(1, 0.76 + rhythmMatches.length * 0.12),
      accentColor: '#C66E45',
      summaryLine:
        rhythmMatches[0]?.value || 'Calibrate how late you like weeknight evenings to run.',
      unlockPrompt: {
        question: 'For Tuesday–Thursday evenings:',
        options: [
          {
            label: 'Home by 9:30 PM',
            key: 'Early Weeknight Finish',
            value: 'Prefer punctual weeknight curtains that wrap up cleanly by 9:30 PM.',
            type: 'constraint',
          },
          {
            label: 'Open to late sets',
            key: 'Open to Late Evenings',
            value: 'Happy staying out past 10:00 PM for great evening sets.',
            type: 'preference',
          },
        ],
      },
    },
    {
      id: 'mornings',
      label: 'Daylight & Walks',
      shortLabel: 'Walks',
      isLit: morningMatches.length > 0,
      strength: Math.min(1, 0.7 + morningMatches.length * 0.15),
      accentColor: '#9DB6A9',
      summaryLine:
        morningMatches[0]?.value ||
        `Tell Undernote if early ${city} outdoor walks fit your weekends.`,
      unlockPrompt: {
        question: 'Early Saturday morning walks (7:15 AM)?',
        options: [
          {
            label: 'Love dawn tree walks',
            key: 'Early Daylight Walks',
            value: `Enjoys 7:15–9:30 AM botanical and architectural walks in ${city}.`,
            type: 'preference',
          },
          {
            label: 'Prefer afternoon pace',
            key: 'Unhurried Mornings Indoors',
            value: 'Keep early weekend mornings restful; surface afternoon and evening picks instead.',
            type: 'constraint',
          },
        ],
      },
    },
    {
      id: 'table',
      label: 'At the Table',
      shortLabel: 'Table',
      isLit: tableMatches.length > 0,
      strength: Math.min(1, 0.8 + tableMatches.length * 0.1),
      accentColor: '#C66E45',
      summaryLine:
        tableMatches[0]?.value || 'Set your dining preference for supper clubs & cafés.',
      unlockPrompt: {
        question: 'When food is part of an outing:',
        options: [
          {
            label: 'Strictly vegetarian',
            key: '100% Vegetarian Dining',
            value: 'Strictly vegetarian for any supper club, tasting table, or pre-show dining.',
            type: 'constraint',
          },
          {
            label: 'Open to all menus',
            key: 'Open to All Culinary Menus',
            value: 'Open to regional seafood, tasting tables, and plant-forward menus alike.',
            type: 'preference',
          },
        ],
      },
    },
    {
      id: 'craft',
      label: 'Hands-On Craft',
      shortLabel: 'Craft',
      isLit: craftMatches.length > 0,
      strength: Math.min(1, 0.74 + craftMatches.length * 0.14),
      accentColor: '#EAE3D5',
      summaryLine:
        craftMatches[0]?.value || 'Light this up if stoneware, printmaking, or tea studios call to you.',
      unlockPrompt: {
        question: 'Small-bench clay, paper, or print workshops?',
        options: [
          {
            label: 'Love making things',
            key: 'Tactile Craft Workshops',
            value: 'Drawn to small-bench stoneware, printmaking, paper, and tea workshops.',
            type: 'preference',
          },
          {
            label: 'Prefer attending shows',
            key: 'Observer Over Workshops',
            value: 'Prefer concerts, plays, and talks over hands-on studio classes.',
            type: 'preference',
          },
        ],
      },
    },
    {
      id: 'ideas',
      label: 'Ideas & Galleries',
      shortLabel: 'Ideas',
      isLit: ideasMatches.length > 0,
      strength: Math.min(1, 0.74 + ideasMatches.length * 0.14),
      accentColor: '#9DB6A9',
      summaryLine:
        ideasMatches[0]?.value || 'Bookshop salons, architecture talks & twilight gallery walks.',
      unlockPrompt: {
        question: 'Small-group bookshop salons & curator walks?',
        options: [
          {
            label: 'My kind of room',
            key: 'Salons, Essays & Curated Walks',
            value: 'Enjoys independent bookshop salons, architecture talks, and curator walkthroughs.',
            type: 'preference',
          },
          {
            label: 'Stick to music & stage',
            key: 'Performance Focus',
            value: 'Prioritize live music, cinema, and stage performances over talks.',
            type: 'preference',
          },
        ],
      },
    },
    {
      id: 'company',
      label: 'Who Joins You',
      shortLabel: 'Circle',
      isLit: companyMatches.length > 0,
      strength: Math.min(1, 0.68 + companyMatches.length * 0.16),
      accentColor: '#EAE3D5',
      summaryLine:
        companyMatches[0]?.value || 'Tell us whether outings are solo/partner or include young kids.',
      unlockPrompt: {
        question: 'Who usually shares your weekends?',
        options: [
          {
            label: 'Include kid-welcoming',
            key: 'Child-Welcoming Weekend Mornings',
            value: 'Highlight weekend morning walks and studios where a young child fits right in.',
            type: 'preference',
          },
          {
            label: 'Solo / partner / friends',
            key: 'Adult Social Circle',
            value: 'Focus on solo-friendly and partner/friends evening and weekend gatherings.',
            type: 'preference',
          },
        ],
      },
    },
    {
      id: 'radius',
      label: 'Local Radius',
      shortLabel: 'Radius',
      isLit: radiusMatches.length > 0,
      strength: Math.min(1, 0.75 + radiusMatches.length * 0.15),
      accentColor: '#C66E45',
      summaryLine:
        radiusMatches[0]?.value || `Pin your favorite ${city} neighborhoods or ticket comfort.`,
      unlockPrompt: {
        question: isSin ? 'Preferred Singapore radius?' : 'Preferred Bangalore radius?',
        options: isSin
          ? [
              {
                label: 'Central & Circle MRT',
                key: 'Central & Circle Line Radius',
                value: 'Prefer Esplanade, Civic District, Tiong Bahru, and Gillman Barracks.',
                type: 'preference',
              },
              {
                label: 'Anywhere on the island',
                key: 'Island-Wide Explorer',
                value: 'Happy traveling across East Coast, Dempsey, or Central for great rooms.',
                type: 'preference',
              },
            ]
          : [
              {
                label: 'Indiranagar, Domlur & Central',
                key: 'Central & East Corridor',
                value: 'Prioritize Indiranagar, Domlur, Cubbon Park, Kasturba Rd & Vasanth Nagar.',
                type: 'preference',
              },
              {
                label: 'South BLR & JP Nagar too',
                key: 'Across Bangalore for Great Rooms',
                value: 'Happy crossing town to Ranga Shankara or Courtyard Koota when worth it.',
                type: 'preference',
              },
            ],
      },
    },
  ];

  const litCount = segments.filter((s) => s.isLit).length;
  const rawPct = !isTuned
    ? 0
    : Math.min(100, Math.round((litCount / segments.length) * 88 + Math.min(12, activeRules.length * 2)));

  // Rhythm Snapshot for Visual Dials
  const isEarlyCurtain =
    !/late nights work|open to late evenings|staying out past 10/.test(corpus) &&
    (/9:15|9:30|early weeknight/.test(corpus) || activeRules.length > 0);
  const hasMorningLight = /morning|dawn|7:15|7:30|walk/.test(corpus);
  const isIntimateScale = !/lively late-evening|vinyl listening bars|love this energy/.test(corpus);
  const isVegetarian = /100% vegetarian|strictly vegetarian|pure vegetarian/.test(corpus);
  const isFamilyFriendly = /child|kid|daughter|family/.test(corpus);

  let neighborhoodLabel: string | null = null;
  if (/indiranagar|domlur/.test(corpus)) neighborhoodLabel = 'Indiranagar · Central';
  else if (/tiong bahru|circle line/.test(corpus)) neighborhoodLabel = 'Central · Tiong Bahru';

  // Build Rich Visual Bento Worlds dynamically from active signals + custom AI lookbook tiles
  const bentoWorlds: BentoWorldCard[] = [];

  if (soundMatches.length > 0 || !isTuned) {
    const lovesBuzz = !isIntimateScale && isTuned;
    bentoWorlds.push({
      id: 'world-sound',
      eyebrow: lovesBuzz ? 'SOCIAL SOUND' : 'NATURAL ACOUSTICS',
      title: lovesBuzz ? 'Vinyl Rooms & Live Stages' : 'Rooms Where Sound Breathes',
      caption: lovesBuzz
        ? 'Warm analog selectors, horn speakers & late-evening energy'
        : 'Timber halls under 300 seats where instruments need zero PA',
      image: lovesBuzz
        ? '/v2/images/me/me_pillar_social.jpg'
        : '/v2/images/me/me_pillar_acoustics.jpg',
      span: 'wide',
      detailBody:
        soundMatches[0]?.value ||
        'Drawn to spaces built around listening first—where architectural timber and attentive audiences let every note land cleanly.',
      signalCount: Math.max(1, soundMatches.length),
    });
  }

  if (morningMatches.length > 0) {
    bentoWorlds.push({
      id: 'world-mornings',
      eyebrow: 'FIRST LIGHT',
      title: isSin ? 'Dawn Shophouse Walks' : 'Rain-Tree Mornings',
      caption: 'Outdoors before 9:00 AM with mist, trees & filter coffee',
      image: '/v2/images/me/me_pillar_mornings.jpg',
      span: 'tall',
      detailBody: morningMatches[0].value,
      signalCount: morningMatches.length,
    });
  }

  if (craftMatches.length > 0) {
    bentoWorlds.push({
      id: 'world-craft',
      eyebrow: 'WORKING HANDS',
      title: 'Clay, Woodblock & Paper',
      caption: 'Unhurried 8-bench studios away from screens',
      image: '/v2/images/me/me_pillar_craft.jpg',
      span: morningMatches.length > 0 ? 'square' : 'tall',
      detailBody: craftMatches[0].value,
      signalCount: craftMatches.length,
    });
  }

  if (ideasMatches.length > 0) {
    bentoWorlds.push({
      id: 'world-ideas',
      eyebrow: 'SMALL CIRCLES',
      title: 'Salons, Books & Galleries',
      caption: '15 chairs, architecture essays & twilight walkthroughs',
      image: '/v2/images/me/me_pillar_ideas.jpg',
      span: 'square',
      detailBody: ideasMatches[0].value,
      signalCount: ideasMatches.length,
    });
  }

  if (tableMatches.length > 0) {
    bentoWorlds.push({
      id: 'world-table',
      eyebrow: isVegetarian ? 'PURE PLANT TABLE' : 'SHARED SUPPERS',
      title: isVegetarian ? 'Heirloom Botanical Tables' : 'Chef Tasting Tables',
      caption: isVegetarian
        ? '100% vegetarian kitchens, ferments & 12-seat suppers'
        : 'Intimate 12-to-30-seat regional tasting menus',
      image: '/v2/images/me/me_pillar_table.jpg',
      span: bentoWorlds.length % 2 === 0 ? 'wide' : 'square',
      detailBody: tableMatches[0].value,
      signalCount: tableMatches.length,
    });
  }

  // Also include extra custom AI-synthesized pillars (e.g. Permaculture, Architecture, Travel) if imported!
  const customImportedTiles: LookbookTile[] = (persona.lookbookTiles || []).filter(
    (t) => t.domain !== 'events'
  );
  customImportedTiles.slice(0, 4).forEach((tile, i) => {
    bentoWorlds.push({
      id: `world-ai-${i}`,
      eyebrow: (tile.pillarName || tile.domain).toUpperCase(),
      title: tile.title,
      caption: tile.pullQuote,
      image: tile.heroImage,
      span: 'square',
      detailBody: `${tile.enduringTendency} ${tile.currentFocus}`,
      signalCount: 2,
    });
  });

  // Synthesize crisp 3-4 word Archetype Headline from actual active signals
  let archetypeHeadline = persona.title || 'Quiet Rooms & Thoughtful Gatherings';
  if (!isTuned) {
    archetypeHeadline = 'Portrait Waiting to Be Lit';
  } else if (!isIntimateScale && hasMorningLight) {
    archetypeHeadline = 'Daylight Walker & Night Listener';
  } else if (!isIntimateScale) {
    archetypeHeadline = 'Analog Sound & Late-Evening Energy';
  } else if (craftMatches.length > 0 && morningMatches.length > 0) {
    archetypeHeadline = 'Tactile Maker & Canopy Walker';
  } else if (ideasMatches.length > 0 && soundMatches.length > 0) {
    archetypeHeadline = 'Acoustic Listener & Salon Reader';
  }

  return {
    illuminationPercent: rawPct,
    archetypeHeadline,
    segments,
    rhythm: {
      isEarlyCurtain,
      hasMorningLight,
      isIntimateScale,
      isVegetarian,
      isFamilyFriendly,
      neighborhoodLabel,
    },
    bentoWorlds,
  };
}
