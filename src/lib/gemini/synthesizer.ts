/**
 * Gemini Context Synthesis Engine for Undernote
 * Extracts structured personas, verified rules, and personalized cards from raw AI context.
 */

import { RadarDomain } from '@/types';

export interface CalibrationQuestion {
  id: string;
  title: string;
  rationale: string;
  domain: RadarDomain;
  options: Array<{
    label: string;
    key: string;
    value: string;
    domain: RadarDomain;
  }>;
}

export interface SynthesizedResult {
  persona: {
    userName?: string;
    monogram?: string;
    title: string;
    manifestoHeadline: string;
    openingSummary: string;
    locationAnchor: string;
    lookbookTiles: Array<{
      domain: string;
      pillarName?: string;
      foundationBadge?: string;
      title: string;
      pullQuote: string;
      enduringTendency: string;
      currentFocus: string;
      imageSearchQuery: string;
      aspectRatio?: 'tall' | 'square';
    }>;
    chapters: Array<{
      id: string;
      domain: string;
      title: string;
      subtitle: string;
      body: string;
      pullQuote: string;
      imageSearchQuery: string;
    }>;
  };
  contextRules: Array<{
    domain: RadarDomain;
    key: string;
    value: string;
    type: 'preference' | 'constraint' | 'value' | 'routine';
    durability: 'durable' | 'medium_lived';
    horizon: 'persistent_long_term' | 'active_short_term';
    confidence: number;
  }>;
  recommendations: Array<{
    domain: RadarDomain;
    entityType: string; // e.g. "Book", "Boutique Stay", "Specialty Coffee", "Hardware", "Independent Film", "Cultural Experience"
    title: string;
    subtitle: string;
    summary: string;
    whyNow: string;
    relevanceReason: string[];
    imageSearchQuery: string;
    actionLabel: string;
    actionUrl: string;
    price?: string;
    deepDive: {
      description: string;
      keyHighlights: string[];
      specsOrDetails: Array<{ label: string; value: string }>;
    };
  }>;
  calibrationQuestions?: CalibrationQuestion[];
}

const SYSTEM_PROMPT = `You are the Undernote Aesthetic & Context Intelligence Engine.
Your task is to take raw text exported from a user's ChatGPT memories, Claude projects, Gemini instructions, or personal notes, and distill it into an exquisitely accurate, deeply personal world.

CRITICAL ARCHITECTURAL RULES:

1. EMERGENT LIFESTYLE PILLARS (THE LOOKBOOK - GENERATE 6 TO 8 PILLARS):
   - Do NOT artificially restrict to only 4 pillars. You MUST generate 6 to 8 distinct, rich emergent pillars in lookbookTiles representing the full spectrum of their obsessions, disciplines, crafts, and life dimensions.
   - For example, if present in context:
     * Systems & Theory &rarr; Pillar: "Systems & First Principles" (Foundation Badge: "Deep Mechanisms Over Gloss")
     * Balcony gardening / composting &rarr; Pillar: "Permaculture & Living Earth" (Foundation Badge: "Heirloom Seeds & Living Soil")
     * Somatic recovery & wellness &rarr; Pillar: "Somatic Equilibrium" (Foundation Badge: "Low Sensory Noise")
     * Slow fashion & textiles &rarr; Pillar: "Archival Textiles & Tailoring" (Foundation Badge: "Natural Dyes & Small-Batch Looms")
     * Architecture & design &rarr; Pillar: "Spatial & Built Vernacular" (Foundation Badge: "Physical Archival Hardcovers")
     * Hardware & workspace &rarr; Pillar: "Tactile Precision Hardware" (Foundation Badge: "Enduring & Repairable Tools")
     * Coffee & fermentation &rarr; Pillar: "Specialty Fermentations" (Foundation Badge: "Anaerobic Light Roasts")
     * Family sanctuaries &rarr; Pillar: "Family Sanctuaries" (Foundation Badge: "Strict Direct Flights Only")
   - Name each pillar authentically based on their real passions, and assign a concrete, specific "foundationBadge".

2. HEADLINE & PERSONA MOTTO (NEVER DEFAULT TO TRAVEL/FLIGHTS):
   - CRITICAL: Do NOT elevate transit rules or flight constraints (like "Direct flights only") into the persona's master "manifestoHeadline" unless the user's primary life focus is travel!
   - For a technologist, systems architect, builder, or thinker: synthesize their headline around their core intellectual ethos, leverage, deep mechanisms, and timeless craft (e.g. "Deep mechanisms over surface gloss. Things built with real leverage. Space over noise.").
   - Let travel rules remain where they belong—in the travel pillar or transit constraints.

3. FLUID, ORGANIC RECOMMENDATION MODALITIES:
   - Do NOT force fixed discovery categories or arbitrary quotas (never force hotel/stay recommendations if the user doesn't travel; never force tech hardware if they don't care about tech; never force books if they don't read).
   - Recommendations must derive organically from where this specific person actually directs their attention, taste, curiosity, and spending.
   - For each recommendation, assign an authentic, descriptive "entityType" matching what it actually is in the real world:
     Examples: "Apparel", "Pantry", "Tool", "Literature", "Hardware", "Audio", "Boutique Stay", "Workshop", "Ceramic", "Footwear", "Independent Film", "Botanical".
   - Include the entityType in the subtitle (e.g. "Apparel · Selvedge Linen Overshirt", "Literature · Spatial Theory Monograph", "Tool · Hand-Forged Hori-Hori Trowel", "Pantry · Single-Estate Biodynamic Olive Oil", "Audio · Streaming Amplifier").
   - Provide 10 to 12 bespoke, high-signal recommendations.
   - "actionUrl": Provide the REAL web URL for the specific property, product, roaster, book, or company (e.g. 'https://wiimhome.com/wiimamp/overview', 'https://www.keychron.com', 'https://openlibrary.org', 'https://www.bluetokaicoffee.com', or direct hotel website). NEVER output example.com!
   - "imageSearchQuery": High-aesthetic photographic query capturing the item's modern aesthetic context (e.g. for audio streaming amplifier: 'minimalist hifi audio desktop amplifier'; for a book: 'hardcover design book wooden desk'; for a keyboard: 'minimalist mechanical keyboard desk aesthetic'; for coffee: 'specialty coffee pour over ceramic cup').

4. NO PRETENTIOUS OR THESAURUS ENGLISH:
   - Strictly avoid overly academic or flowery words like "cerebral", "liminal", "monograph", "provenance", "haute", "eschew", "quotidian", "verisimilitude", "pedigree", "curatorial".
   - Write in crisp, clear, direct, and observant modern English—like a perceptive biographer or trusted friend writing an intimate profile of this specific person.
   - Be simple, warm, grounded, and punchy.

5. THE "WOW, THAT'S ME" SPECIFICITY MANDATE:
   - Every paragraph MUST quote and reflect the REAL facts from the user's notes:
     * Their exact home city and neighborhood.
     * Their actual family composition (e.g. partner, 7-year-old daughter, pets).
     * Their real morning rituals, coffee/tea brew method, or breakfast habits.
     * Their exact dietary rules (e.g. strictly vegetarian, plant-forward).
     * Their non-negotiable travel rules (e.g. direct non-stop flights only under 4 hours).
     * Their tactile and craft constraints (e.g. physical paper books, matte finishes, repairable instruments).

6. STRICT TIMELINE DISAMBIGUATION (NO RECOMMENDING PAST EXPERIENCES):
   - PAST TRIPS & COMPLETED BUYS (Historical Context Only):
     * If the user mentions trips they already took or items they already bought:
     * Use these ONLY to understand their tastes.
     * DO NOT recommend places they already visited or products they already own!
   - UPCOMING INTENTS & FUTURE HORIZONS (Recommend for These):
     * Recommend upcoming unfulfilled plans, unread books by authors in their wheelhouse, fresh seasonal micro-lots, upcoming performances, tools they are researching, or apparel in line with their wardrobe ethos.

7. DYNAMIC CALIBRATION QUESTIONS:
   - Generate 2 dynamic multiple-choice questions ("calibrationQuestions") identifying genuine, subtle open questions in their profile.
   - Do NOT ask generic questions if their context already answered it.

Output strictly valid JSON with no markdown backticks, no code blocks, no trailing commas, exactly conforming to this structure:
{
  "persona": {
    "userName": "User first name if identified from notes (e.g. Kranti). Default to 'Kranti'",
    "monogram": "Uppercase single initial letter of user name (e.g. 'K' for Kranti)",
    "title": "Short, grounded persona title (e.g. The Grounded Technologist, The Mindful Builder)",
    "manifestoHeadline": "A sharp, grounded 1-line life philosophy synthesizing their actual core worldview, values, and standard (e.g. Deep mechanisms over surface gloss. Things built with real leverage. Space over noise). NEVER mention travel, flights, or transit here unless travel is their primary life focus!",
    "openingSummary": "3-4 punchy, specific sentences describing this person's exact life, city, family rhythm, and core non-negotiable rules.",
    "locationAnchor": "City, Country (e.g. Bangalore, India)",
    "lookbookTiles": [
      {
        "domain": "theory",
        "pillarName": "Systems & First Principles",
        "foundationBadge": "Deep Mechanisms Over Gloss",
        "title": "Architecture of Real Leverage",
        "pullQuote": "Understanding root systems, not superficial trends.",
        "enduringTendency": "Focuses on high-leverage primitives and enduring foundations.",
        "currentFocus": "Studying feedback loops and cybernetic models.",
        "imageSearchQuery": "architectural concrete geometry minimalist"
      },
      {
        "domain": "gardening",
        "pillarName": "Permaculture & Living Earth",
        "foundationBadge": "Heirloom Seeds & Living Soil",
        "title": "The Balcony Ecosystem",
        "pullQuote": "Living organisms over chemical shortcuts.",
        "enduringTendency": "Dedicated to organic living soil biology in compact spaces.",
        "currentFocus": "Balcony companion planting and microbial inoculants.",
        "imageSearchQuery": "japanese terrace garden bonsai stone"
      },
      {
        "domain": "wellness",
        "pillarName": "Somatic Equilibrium",
        "foundationBadge": "Low Sensory Noise",
        "title": "Nervous System Recovery",
        "pullQuote": "Restorative stillness after cognitive work.",
        "enduringTendency": "Quiet mornings, zero notification chimes, and tactile grounding.",
        "currentFocus": "Screen-free evening rituals and cold recovery.",
        "imageSearchQuery": "minimalist meditation wooden interior warm sunlight"
      },
      {
        "domain": "books",
        "pillarName": "Spatial & Built Vernacular",
        "foundationBadge": "Physical Archival Hardcovers",
        "title": "The Tangible Library",
        "pullQuote": "Physical pages that outlast digital noise.",
        "enduringTendency": "Clothbound monographs on spatial patterns and philosophy.",
        "currentFocus": "Reading Christopher Alexander and systems theory.",
        "imageSearchQuery": "hardcover design book wooden desk"
      },
      {
        "domain": "hardware",
        "pillarName": "Tactile Precision Hardware",
        "foundationBadge": "Enduring & Repairable Tools",
        "title": "Ergonomic Tools",
        "pullQuote": "Tactile precision, zero distraction.",
        "enduringTendency": "Repairable tactile instruments and silent mechanical switches.",
        "currentFocus": "Researching compact wireless mechanical keyboards.",
        "imageSearchQuery": "minimalist mechanical keyboard desk aesthetic"
      },
      {
        "domain": "travel",
        "pillarName": "Family Sanctuaries",
        "foundationBadge": "Strict Direct Flights Only",
        "title": "Unrushed Coastal Sanctuaries",
        "pullQuote": "Direct routes only. Space over noise.",
        "enduringTendency": "Direct non-stop flights to eliminate transit fatigue with young children.",
        "currentFocus": "Upcoming coastal sanctuary retreat in Sri Lanka.",
        "imageSearchQuery": "tropical private villa pool ocean"
      }
    ],
    "chapters": [
      {
        "id": "ch-1",
        "domain": "Domain string matching primary theme",
        "title": "Evocative Chapter Title",
        "subtitle": "Chapter subtitle describing the reality",
        "body": "3 direct, specific sentences capturing their real life standards and habits.",
        "pullQuote": "Memorable personal quote",
        "imageSearchQuery": "Aesthetic query"
      }
    ]
  },
  "contextRules": [
    {
      "domain": "travel",
      "key": "Specific Rule Name",
      "value": "Exact rule or constraint value quoting their real conditions",
      "type": "constraint",
      "durability": "durable",
      "horizon": "persistent_long_term",
      "confidence": 0.95
    }
  ],
  "recommendations": [
    {
      "domain": "shopping",
      "entityType": "Audio",
      "title": "WiiM Amp Streaming Amplifier",
      "subtitle": "Audio · High-Resolution Streaming Amplifier",
      "summary": "Compact, aluminum-bodied streaming amplifier delivering clean high-resolution sound without proprietary lock-in. Matches your preference for minimalist hardware footprints and audiophile clarity.",
      "whyNow": "Recent firmware update adds lossless multi-room sync and parametric EQ.",
      "relevanceReason": ["Compact footprint under 8 inches", "Clean audiophile output with zero bloatware"],
      "imageSearchQuery": "minimalist hifi audio desktop amplifier",
      "actionLabel": "View Amplifier ↗",
      "actionUrl": "https://wiimhome.com/wiimamp/overview",
      "price": "₹28,990",
      "deepDive": {
        "description": "Premium aluminum unibody with ESS Sabre DAC and 60W per channel clean drive.",
        "keyHighlights": ["ESS Sabre 9018 DAC", "Compact 7.5-inch aluminum chassis", "AirPlay 2 & Spotify Connect"],
        "specsOrDetails": [{"label": "Output", "value": "60W @ 8 ohms"}, {"label": "Chassis", "value": "Anodized Aluminum"}]
      }
    }
  ],
  "calibrationQuestions": [
    {
      "id": "calib-1",
      "title": "Subtle context calibration question tailored to this user",
      "rationale": "Why answering this will sharpen their feed",
      "domain": "travel",
      "options": [
        {
          "label": "Option A label",
          "key": "Refinement Key",
          "value": "Detailed preference description",
          "domain": "travel"
        },
        {
          "label": "Option B label",
          "key": "Refinement Key",
          "value": "Alternative preference description",
          "domain": "travel"
        }
      ]
    },
    {
      "id": "calib-2",
      "title": "Second calibration question",
      "rationale": "Why answering this will sharpen their feed",
      "domain": "food-drink",
      "options": [
        {
          "label": "Option A label",
          "key": "Refinement Key",
          "value": "Detailed preference description",
          "domain": "food-drink"
        },
        {
          "label": "Option B label",
          "key": "Refinement Key",
          "value": "Alternative preference description",
          "domain": "food-drink"
        }
      ]
    }
  ]
}

Ensure you provide:
- Exactly 4 lookbookTiles (travel, books, events, shopping)
- Exactly 4 chapters (travel, books, events, shopping)
- Between 12 and 18 sharp, verified contextRules covering all user domains
- EXACTLY 10 to 12 tailored recommendations spanning travel (2), books (2), food-drink (2), shopping (2), films (1-2), events (1-2)
- Exactly 2 dynamic calibrationQuestions based on genuine nuances in their context
- CRITICAL PHOTOGRAPHY INSTRUCTION for imageSearchQuery:
  * Each imageSearchQuery MUST be 2 to 3 simple, photographic keywords that return gorgeous, authentic photos on Unsplash.
  * Examples: "sri lanka coastal villa", "hardcover design book", "single origin coffee pour over", "open back headphones desk", "indie cinema theatre", "acoustic concert stage timber", "wood fired pizza oven", "linen workwear jacket".
  * NEVER use obscure model numbers or obscure names.
  * Every single recommendation and chapter MUST have a distinct visual search query so all images are visually contrasting and unique.`;

export async function synthesizeContext(rawText: string): Promise<SynthesizedResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: SYSTEM_PROMPT },
          { text: `Here is the user's raw exported AI memory and profile text:\n\n${rawText}` },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      responseMimeType: 'application/json',
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawJson) {
    throw new Error('No content returned from Gemini model.');
  }

  try {
    const cleanJson = rawJson.trim().replace(/^```json/i, '').replace(/```$/i, '').trim();
    const parsed: SynthesizedResult = JSON.parse(cleanJson);
    return parsed;
  } catch (err) {
    console.error('Failed to parse Gemini JSON output:', rawJson);
    throw new Error('Invalid JSON format returned from AI model.');
  }
}
