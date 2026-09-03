export type RadarDomain =
  | 'shopping'
  | 'travel'
  | 'food-drink'
  | 'books'
  | 'events'
  | 'interests'
  | 'what-matters'
  | 'my-world';

export type ContextHorizon = 'persistent_long_term' | 'active_short_term';
export type RecommendationOrigin = 'proactive' | 'requested';

export interface ContextItemData {
  id: string;
  domain: RadarDomain;
  type: 'fact' | 'preference' | 'dislike' | 'constraint' | 'goal' | 'value' | 'relationship' | 'behavior_pattern' | 'decision_rule' | 'routine';
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
    provider: string; // e.g. "ChatGPT", "Claude", "Voice Note"
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
  domain: RadarDomain;
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
}

export interface WatchData {
  id: string;
  type: 'price' | 'availability' | 'route' | 'product' | 'travel';
  entity: string;
  criteria: string;
  targetPrice?: number;
  currentPrice?: number;
  currency: string;
  status: 'active' | 'paused' | 'expired';
  lastChecked: string;
  checkCadence: string;
  notificationMode: 'important_only' | 'digest' | 'all';
  triggerMet: boolean;
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
  category: 'shopping' | 'travel' | 'other';
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
  type: 'trip' | 'dining' | 'gifting';
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
    status: 'joined' | 'pending';
  }>;
  overlapHighlights: string[];
  fusedOpportunities: CardData[];
  createdAt: string;
  expiresAt: string;
}

export interface PersonaArchetype {
  title: string;
  tagline: string;
  locationAnchor: string;
  homeAirport: string;
  familyComposition: string;
  dnaScores: {
    familySanctuary: number;
    craftSovereignty: number;
    minimalistHardware: number;
    lowFrictionTravel: number;
    specialtyCoffee: number;
    culturalArts: number;
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
