import { CardData, ContextItemData } from '@/types';

export interface ScoredEventCard {
  card: CardData;
  matchPercent: number;
  isTopMatch: boolean;
}

/**
 * Infers semantic tags for an event card from its explicit `contextTags`
 * as well as its category, title, setting, and summary.
 */
function getCardTags(card: CardData): Set<string> {
  const tags = new Set<string>(card.eventMeta?.contextTags || []);
  const cat = card.eventMeta?.category;
  if (cat) tags.add(cat);

  const blob = `${card.title} ${card.subtitle || ''} ${card.summary} ${
    card.eventMeta?.settingNote || ''
  } ${card.eventMeta?.timeLabel || ''} ${card.relevanceReason.join(' ')}`.toLowerCase();

  if (/unamplified|acoustic|chamber|timber|245 seats|180 seats|320 seats/.test(blob)) {
    tags.add('acoustic');
    tags.add('intimate');
  }
  if (/7:15 am|7:30 am|morning|dawn|10:00 am/.test(blob)) {
    tags.add('morning');
  }
  if (/walk|canopy|trees|shophouse|park/.test(blob)) {
    tags.add('walks');
    tags.add('outdoors');
  }
  if (/clay|stoneware|printmaking|woodblock|paper|studio|bench|teaware/.test(blob)) {
    tags.add('workshops');
    tags.add('craft');
  }
  if (/salon|reading|essay|curator|gallery|museum|walkthrough/.test(blob)) {
    tags.add('talks');
    tags.add('art');
  }
  if (/vegetarian|plant-based|plant-forward/.test(blob)) {
    tags.add('vegetarian');
  }
  if (/seafood|prawn|crab|meat|pork|toddy/.test(blob)) {
    tags.add('non-veg-menu');
  }
  if (/11:30 pm|midnight|12:00 am|10:30 pm|late-night/.test(blob)) {
    tags.add('late-finish');
  } else {
    tags.add('early-finish');
  }
  if (/dj|standing crowd|500+|rooftop bar|nightclub|amphitheatre gig/.test(blob)) {
    tags.add('loud-crowd');
    tags.add('social-night');
  }
  if (/child|7-year-old|ages 6\+|ages 8\+|family/.test(blob)) {
    tags.add('child-friendly');
  }

  return tags;
}

/**
 * Evaluates all market events against the user's Personal Context rules,
 * producing an honest 52%–99% match score and separating Top Matches (<=10)
 * from lower-relevance "See More" items.
 */
export function scoreEventsAgainstContext(
  cards: CardData[],
  contextItems: ContextItemData[],
  isTuned: boolean
): {
  topMatches: ScoredEventCard[];
  moreMatches: ScoredEventCard[];
} {
  const activeCards = cards.filter((c) => c.status !== 'dismissed');

  if (!isTuned || contextItems.length === 0) {
    // Untuned generic mode: preserve natural order without claiming high personal match
    const genericScored = activeCards.map((card) => ({
      card,
      matchPercent: Math.round(card.relevanceScore * 100),
      isTopMatch: true,
    }));
    return {
      topMatches: genericScored.slice(0, 8),
      moreMatches: genericScored.slice(8),
    };
  }

  const activeRules = contextItems.filter((r) => r.status === 'active');
  const ruleCorpus = activeRules.map((r) => `${r.key} ${r.value}`.toLowerCase()).join(' | ');

  const wantsAcoustic = /unamplified|acoustic|chamber|intimate|quiet room/.test(ruleCorpus);
  const wantsWalks = /walk|morning|dawn|trees|park|shophouse|botanical/.test(ruleCorpus);
  const wantsCraft = /clay|stoneware|print|paper|craft|studio|hands-on|workshop/.test(ruleCorpus);
  const wantsSalons = /book|salon|talk|essay|architecture|gallery|curator|cinema/.test(ruleCorpus);
  const wantsSocialNight = /lively late-evening|rooftop|vinyl dj|high-energy|late evenings/.test(
    ruleCorpus
  );
  const wantsChildFriendly = /child|daughter|kid|family/.test(ruleCorpus);

  const vetoLoudCrowds =
    /no loud|skip loud|standing crowd|standing bars|large festival crowds|dj club|standing nightlife/.test(
      ruleCorpus
    );
  const vetoLateFinish = /9:15 pm|9:30 pm|9:45 pm|early weeknight|before 10|after 8:30 pm/.test(
    ruleCorpus
  );
  const vetoNonVeg = /100% vegetarian|strictly vegetarian|pure vegetarian/.test(ruleCorpus);

  const scored: ScoredEventCard[] = activeCards.map((card) => {
    const tags = getCardTags(card);
    let score = 76; // Neutral baseline

    // Positive affinity boosts
    if (wantsAcoustic && (tags.has('acoustic') || tags.has('intimate'))) score += 13;
    if (wantsWalks && (tags.has('walks') || tags.has('morning'))) score += 11;
    if (wantsCraft && (tags.has('workshops') || tags.has('craft'))) score += 12;
    if (wantsSalons && (tags.has('talks') || tags.has('art'))) score += 10;
    if (wantsSocialNight && tags.has('social-night')) score += 18;
    if (wantsChildFriendly && tags.has('child-friendly')) score += 6;
    if (vetoNonVeg && tags.has('vegetarian')) score += 7;
    if (vetoLateFinish && tags.has('early-finish') && !tags.has('loud-crowd')) score += 4;

    // Hard boundary penalties (pushing violating events down into "See More")
    if (vetoLoudCrowds && tags.has('loud-crowd')) score -= 28;
    if (vetoLateFinish && tags.has('late-finish')) score -= 22;
    if (vetoNonVeg && tags.has('non-veg-menu')) score -= 32;

    // If user explicitly likes high-energy nights & didn't ask for quiet, slightly temper ultra-quiet dawn walks
    if (wantsSocialNight && !wantsWalks && tags.has('morning')) score -= 8;

    // Neighborhood / custom text keyword boost from user-added context notes
    for (const rule of activeRules) {
      const words = rule.value
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 5);
      const cardText = `${card.title} ${card.subtitle || ''} ${
        card.eventMeta?.neighborhood || ''
      } ${card.eventMeta?.venue || ''}`.toLowerCase();
      if (words.some((w) => ['indiranagar', 'domlur', 'cubbon', 'tiong', 'esplanade', 'dempsey', 'gillman'].includes(w) && cardText.includes(w))) {
        score += 5;
      }
    }

    const clamped = Math.max(52, Math.min(99, Math.round(score)));
    return {
      card,
      matchPercent: clamped,
      isTopMatch: clamped >= 80,
    };
  });

  scored.sort((a, b) => b.matchPercent - a.matchPercent);

  let topMatches = scored.filter((s) => s.matchPercent >= 80).slice(0, 10);
  if (topMatches.length < 3 && scored.length >= 3) {
    // Guarantee at least the top 3 relative matches if rules were ultra-narrow
    topMatches = scored.slice(0, 3).map((s) => ({ ...s, isTopMatch: true }));
  }

  const topIds = new Set(topMatches.map((t) => t.card.id));
  const moreMatches = scored
    .filter((s) => !topIds.has(s.card.id))
    .map((s) => ({ ...s, isTopMatch: false }));

  return { topMatches, moreMatches };
}
