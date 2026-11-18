export type RadarDomain =
  | 'travel'
  | 'books'
  | 'events'
  | 'shopping'
  | 'food-drink'
  | 'films'
  | 'interests'
  | 'what-matters'
  | 'my-world';

export type EventCategory =
  | 'music'
  | 'theatre'
  | 'talks'
  | 'art'
  | 'workshops'
  | 'walks'
  | 'supper-cinema';

export type EventTimeWindow = 'tonight' | 'weekend' | 'week' | 'upcoming';

export type EventAvailabilityState =
  | 'open'
  | 'few-left'
  | 'rsvp'
  | 'waitlist';

export interface EventScheduleMeta {
  category: EventCategory;
  categoryLabel: string;
  timeWindow: EventTimeWindow;
  startIso: string;
  endIso: string;
  dayLabel: string;        // e.g. "Sat, 14 Nov"
  timeLabel: string;       // e.g. "7:00 PM – 8:45 PM"
  doorsNote?: string;      // e.g. "Doors close strictly at 7:00 PM"
  venue: string;           // e.g. "Ranga Shankara"
  neighborhood: string;    // e.g. "JP Nagar"
  cityLabel: string;       // e.g. "Bangalore" or "Singapore"
  settingNote: string;     // e.g. "Intimate · 320 seats · Unamplified"
  priceLabel: string;      // e.g. "₹350" or "Free · RSVP" or "S$38"
  availabilityState: EventAvailabilityState;
  availabilityLabel?: string; // e.g. "14 seats left" or "RSVP Open"
  personalFitLine: string; // Calm 1-line "Why this fits your world"
  featured?: boolean;
}

export type ContextHorizon = 'persistent_long_term' | 'active_short_term';
export type RecommendationOrigin = 'proactive' | 'requested';
export type GeographyAnchor = 'india-blr' | 'singapore-sin';

export interface ContextItemData {
  id: string;
  domain: RadarDomain;
  type:
    | 'fact'
    | 'preference'
    | 'dislike'
    | 'constraint'
    | 'goal'
    | 'value'
    | 'relationship'
    | 'behavior_pattern'
    | 'decision_rule'
    | 'routine';
  key: string;
  value: string;
  durability: 'durable' | 'medium_lived';
  horizon: ContextHorizon;
  expiryCountdown?: string;
  confidence: number; // 0.0 to 1.0
  status: 'active' | 'archived' | 'conflicted';
  origin: 'imported' | 'user_answer' | 'user_edit' | 'feedback_inferred';
  explicitness: 'explicit' | 'inferred';
  sensitivity: 'normal' | 'sensitive' | 'highly_sensitive';
  lastConfirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
  provenance: {
    provider: string;
    importId?: string;
    evidence?: string;
    sourceUrl?: string;
  };
}

export interface CardDeepDive {
  description: string;
  keyHighlights: string[];
  specsOrDetails: Array<{ label: string; value: string }>;
  directActionUrl: string;
  directActionLabel: string;
  pricingBreakdown?: string;
}

export interface CardComparison {
  name: string;
  matchScore: number;
  pros: string;
  cons: string;
  price: string;
}

export interface CardData {
  id: string;
  type: string;
  originType: RecommendationOrigin;
  requestedTriggerLabel?: string;
  geography: GeographyAnchor;
  domain: RadarDomain;
  entityType?: string;
  eventMeta?: EventScheduleMeta;
  title: string;
  subtitle?: string;
  summary: string;
  whyNow: string;
  heroImage: string;
  imageAlt: string;
  accentColor: string;
  relevanceReason: string[];
  contextIds: string[];
  intentIds: string[];
  watchIds: string[];
  relevanceScore: number;
  freshnessScore: number;
  confidenceScore: number;
  actionabilityScore: number;
  noveltyScore: number;
  createdAt: string;
  expiresAt?: string;
  status: 'active' | 'saved' | 'dismissed';
  deepDive: CardDeepDive;
  sourceEvidence: Array<{
    title: string;
    url: string;
    retrievedAt: string;
    price?: string;
    baselinePrice?: string;
    discountPercent?: number;
  }>;
  priceHistory?: Array<{ date: string; price: number; merchant: string }>;
  comparisons?: CardComparison[];
  question?: {
    id: string;
    text: string;
    targetDomain: string;
    targetKey: string;
    options: string[];
  } | null;
}

export interface StoryPulse {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  timeAgo: string;
  heroImage: string;
  accentColor: string;
  takeaways: string[];
  cardId: string;
  actionUrl: string;
  actionLabel: string;
  geography: GeographyAnchor;
}

export interface WatchData {
  id: string;
  type: 'venue' | 'artist' | 'tickets' | 'series' | 'price' | 'availability' | 'route' | 'product' | 'travel';
  geography: GeographyAnchor;
  entity: string;
  neighborhood?: string;
  criteria: string;
  targetPrice?: number;
  currentPrice?: number;
  currency: string;
  status: 'active' | 'paused' | 'expired';
  lastChecked: string;
  checkCadence: string;
  notificationMode: 'important_only' | 'digest' | 'all';
  triggerMet: boolean;
  matchedCardId?: string;
  observations: Array<{
    timestamp: string;
    price?: number;
    availability: string;
    sourceUrl: string;
    notes: string;
  }>;
}

export interface IntentData {
  id: string;
  geography: GeographyAnchor;
  category: 'shopping' | 'travel' | 'books' | 'events' | 'other';
  title: string;
  description: string;
  status: 'active' | 'fulfilled' | 'expired';
  createdAt: string;
  expiresAt: string;
  daysRemaining: number;
  progressPercent: number;
}

export interface GroupCapsuleData {
  id: string;
  type: 'evening' | 'weekend' | 'family' | 'trip' | 'dining' | 'gifting';
  geography?: GeographyAnchor;
  whenLabel?: string;
  title: string;
  hostUserId: string;
  inviteCode: string;
  scopedDomains: RadarDomain[];
  members: Array<{
    userId: string;
    name: string;
    avatar: string;
    isPcpUser: boolean;
    contributedRuleIds: string[];
    tasteSummary?: string;
    status: 'joined' | 'pending';
  }>;
  overlapHighlights: string[];
  fusedOpportunities: CardData[];
  createdAt: string;
  expiresAt: string;
}

export interface DomainMoodboardCapsule {
  domain: 'travel' | 'books' | 'events' | 'shopping';
  title: string;
  tagline: string;
  heroImage: string;
  accentColor: string;
  bedrockRule: string;
  activeWatchOrHorizon: string;
  curatedLocalNode: string;
  guardrailMetric: string;
}

export interface LookbookTile {
  domain: string;
  pillarName?: string;
  foundationBadge?: string;
  title: string;
  pullQuote: string;
  heroImage: string;
  aspectRatio: 'tall' | 'square';
  enduringTendency: string;
  currentFocus: string;
  localAnchor: string;
}

export interface LifeNarrativeChapter {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image?: string;
  pullQuote?: string;
}

export interface PersonaArchetype {
  userName?: string;
  monogram?: string;
  title: string;
  tagline: string;
  locationAnchor: string;
  homeAirport: string;
  currency: string;
  familyComposition: string;
  domainCapsules: DomainMoodboardCapsule[];
  lookbookTiles: LookbookTile[];
  lifeNarrative: {
    openingSummary: string;
    manifestoHeadline: string;
    chapters: LifeNarrativeChapter[];
  };
  livingStory: Array<{
    paragraph: string;
    tokenChips: Array<{
      token: string;
      ruleKey: string;
      impactSummary: string;
    }>;
  }>;
}
