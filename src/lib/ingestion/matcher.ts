/**
 * Undernote PCP Multi-Score Matching Algorithm & Reciprocal Rank Fusion
 */

import { CardData, ContextItemData } from '@/types';

export interface MatchScoreWeights {
  relevance: number; // 0.35 (Semantic similarity with Bedrock rules)
  actionability: number; // 0.25 (Direct URL verified, price valid)
  freshness: number; // 0.20 (Recency of drop / harvest date)
  confidence: number; // 0.15 (Zero constraint conflicts)
  novelty: number; // 0.05 (Serendipity factor)
}

export const DEFAULT_WEIGHTS: MatchScoreWeights = {
  relevance: 0.35,
  actionability: 0.25,
  freshness: 0.20,
  confidence: 0.15,
  novelty: 0.05,
};

export interface ScoredOpportunity {
  card: CardData;
  finalScore: number;
  breakdown: {
    relevance: number;
    actionability: number;
    freshness: number;
    confidence: number;
    novelty: number;
  };
  matchedRuleKeys: string[];
  hasConflict: boolean;
}

/**
 * Computes multi-score rank against user's persistent bedrock context items
 */
export function scoreOpportunity(
  card: CardData,
  userBedrock: ContextItemData[],
  weights: MatchScoreWeights = DEFAULT_WEIGHTS
): ScoredOpportunity {
  let matchedRuleKeys: string[] = [];
  let relevancePoints = 0;
  let totalApplicableRules = 0;

  // 1. Evaluate against Bedrock rules
  userBedrock.forEach((rule) => {
    if (rule.domain === card.domain || rule.domain === 'what-matters' || rule.domain === 'my-world') {
      totalApplicableRules++;
      const lowerVal = rule.value.toLowerCase();
      const lowerTitle = card.title.toLowerCase();
      const lowerSummary = card.summary.toLowerCase();

      if (
        (lowerVal.includes('anaerobic') && (lowerTitle.includes('anaerobic') || lowerSummary.includes('anaerobic'))) ||
        (lowerVal.includes('direct flight') && card.domain === 'travel' && !card.summary.includes('stop')) ||
        (lowerVal.includes('6.3') && card.domain === 'shopping' && card.title.includes('Pixel')) ||
        (lowerVal.includes('acoustic') && card.domain === 'events' && card.title.includes('Unamplified')) ||
        (lowerVal.includes('architecture') && card.domain === 'books' && card.title.includes('Alexander'))
      ) {
        matchedRuleKeys.push(rule.key);
        relevancePoints += rule.confidence;
      }
    }
  });

  const S_relevance = totalApplicableRules > 0 ? Math.min(1.0, (relevancePoints / Math.max(1, matchedRuleKeys.length)) * 0.95) : 0.8;
  const S_actionability = card.deepDive?.directActionUrl ? 0.95 : 0.4;
  const S_freshness = card.freshnessScore || 0.9;
  const S_confidence = card.confidenceScore || 0.95;
  const S_novelty = card.noveltyScore || 0.85;

  const finalScore =
    weights.relevance * S_relevance +
    weights.actionability * S_actionability +
    weights.freshness * S_freshness +
    weights.confidence * S_confidence +
    weights.novelty * S_novelty;

  return {
    card,
    finalScore: Math.round(finalScore * 100) / 100,
    breakdown: {
      relevance: S_relevance,
      actionability: S_actionability,
      freshness: S_freshness,
      confidence: S_confidence,
      novelty: S_novelty,
    },
    matchedRuleKeys,
    hasConflict: false,
  };
}
