import {
  CardData,
  ContextItemData,
  GeographyAnchor,
  GroupCapsuleData,
  IntentData,
  PersonaArchetype,
  StoryPulse,
  WatchData,
} from '@/types';

// ============================================================================
// 1. DUAL GEOGRAPHY PERSONAS (INDIA - BLR vs SINGAPORE - SIN)
// ============================================================================

export const indiaPersona: PersonaArchetype = {
  title: "Sample: The Architectural Minimalist",
  tagline: "Illustrative Preview Profile • Space over clutter • Natural light & tactile craft",
  locationAnchor: "Illustrative Preview Anchor",
  homeAirport: "Sample Airport Anchor",
  currency: "INR (₹)",
  familyComposition: "Demonstration Profile (Unpersonalized)",
  domainCapsules: [
    {
      domain: "travel",
      title: "Zero-Friction Escapes",
      tagline: "Strict direct non-stop flights to eliminate transit exhaustion",
      heroImage: "/images/hero_srilanka_villa.jpg",
      accentColor: "#24483F",
      bedrockRule: "Non-stop direct flights only; secluded boutique beachfront sanctuaries",
      activeWatchOrHorizon: "Coastal retreat window watch",
      curatedLocalNode: "Sample Pier · Direct Escape Window",
      guardrailMetric: "100% Direct Route Compliance",
    },
    {
      domain: "books",
      title: "Built Environment Theory",
      tagline: "Christopher Alexander pattern theory, humane city design, and archival prints",
      heroImage: "/images/hero_alexander_book.jpg",
      accentColor: "#C66E45",
      bedrockRule: "Christopher Alexander pattern theory, humane architecture treatises, clothbound editions",
      activeWatchOrHorizon: "Archival clothbound architectural reprint watch",
      curatedLocalNode: "Independent Curated Bookshop Network",
      guardrailMetric: "Hardcover & Clothbound Only",
    },
    {
      domain: "events",
      title: "Acoustic Performing Arts",
      tagline: "Unamplified 200-seat natural resonance without microphones or synthetic equalization",
      heroImage: "/images/hero_theatre_acoustic.jpg",
      accentColor: "#C66E45",
      bedrockRule: "100% Unamplified acoustic instruments; natural timber hall resonance; intimate 200-seat capacity",
      activeWatchOrHorizon: "Weekend acoustic classical recital watch",
      curatedLocalNode: "Acoustic Chamber Stage",
      guardrailMetric: "0% Synthetic Amplification",
    },
    {
      domain: "shopping",
      title: "Compact Tactile Ergonomics",
      tagline: "Physical hardware strictly under 6.3\" screen diagonal with pure stock OS",
      heroImage: "/images/hero_pixel11_compact.jpg",
      accentColor: "#24483F",
      bedrockRule: "Screen size strictly < 6.3\" diagonal for single-handed comfort; clean stock OS",
      activeWatchOrHorizon: "Compact hardware threshold watch",
      curatedLocalNode: "Authorized Direct Channels",
      guardrailMetric: "Screen < 6.3\" & Long-term Updates",
    },
  ],
  lookbookTiles: [
    {
      domain: 'travel',
      title: 'The Coastal Sanctuary',
      pullQuote: 'Space over clutter, calm over velocity.',
      heroImage: '/images/hero_srilanka_villa.jpg',
      aspectRatio: 'tall',
      enduringTendency: 'Long-term preference for secluded coastal sanctuaries and non-stop journeys.',
      currentFocus: 'Upcoming coastal retreat window for quiet contemplation.',
      localAnchor: 'Sample Travel Anchor',
    },
    {
      domain: 'books',
      title: 'Theory & The Built Environment',
      pullQuote: 'Ideas that outlast temporary trends.',
      heroImage: '/images/hero_alexander_book.jpg',
      aspectRatio: 'square',
      enduringTendency: 'Deep immersion in architectural treatises, urban patterns, and clothbound editions.',
      currentFocus: 'Reading foundational theory on spatial humanism and pattern language.',
      localAnchor: 'Independent Bookseller Archive',
    },
    {
      domain: 'events',
      title: 'Acoustic Performing Arts',
      pullQuote: 'Sound without synthetic amplification.',
      heroImage: '/images/hero_theatre_acoustic.jpg',
      aspectRatio: 'square',
      enduringTendency: 'Appreciation for unamplified acoustic instruments and natural timber hall resonance (< 200 seats).',
      currentFocus: 'Intimate weekend chamber recitals and natural resonance performances.',
      localAnchor: 'Chamber Recital Stage',
    },
    {
      domain: 'shopping',
      title: 'The Ergonomic Boundary',
      pullQuote: 'Tools designed for human hands, not algorithms.',
      heroImage: '/images/hero_pixel11_compact.jpg',
      aspectRatio: 'tall',
      enduringTendency: 'Single-handed tactile ergonomics (< 6.3" screen); clean stock OS with zero bloat.',
      currentFocus: 'Compact daily hardware with longevity and repairability.',
      localAnchor: 'Direct Flagship Channels',
    },
  ],
  lifeNarrative: {
    openingSummary: 'This is an illustrative demonstration profile. It reflects a life oriented around tactile craft, unhurried rhythms, and deliberate boundaries. Paste your context from ChatGPT, Claude, or Gemini to synthesize your own bespoke persona, rules, and feed.',
    manifestoHeadline: 'An illustrative preview of personal context.',
    chapters: [
      {
        id: 'ch-1',
        title: 'The Architecture of Travel',
        subtitle: 'Preserving personal calm through non-stop horizons',
        body: 'This is an illustrative demonstration chapter. In Undernote, journeys are not measured in miles, but in transit friction. When you paste your own AI context, this chapter immediately recalibrates to your exact home base, family rules, and spatial philosophy.',
        image: '/images/hero_srilanka_villa.jpg',
        pullQuote: 'Direct transit is not a luxury; it is the foundation of mental calm.',
      },
      {
        id: 'ch-2',
        title: 'The Tangible Mind & Library',
        subtitle: 'Christopher Alexander and built environment theory',
        body: 'Your reading life favors timeless systems over fleeting bestsellers. Rooted in Christopher Alexander\'s A Pattern Language and humane urban fabric, your library is built on durable clothbound prints and monographs. Sourced through independent community anchors like Champaca Bookstore on Edward Road, books are collected as lifelong references for spatial harmony.',
        image: '/images/hero_alexander_book.jpg',
        pullQuote: 'Books collected not for rapid consumption, but as enduring companions for spatial craft.',
      },
      {
        id: 'ch-3',
        title: 'Acoustic Sanctuary',
        subtitle: 'Natural resonance without synthetic equalization',
        body: 'In an era of wall-to-wall amplification and digital noise, your performing arts focus is deliberately acoustic. Recitals at Ranga Shankara\'s intimate 200-seat timber blackbox theater allow string and wood resonances to reach the ear unfiltered by microphones or speakers. These unhurried Saturday evenings protect cultural presence and deep listening.',
        image: '/images/hero_theatre_acoustic.jpg',
        pullQuote: 'The human ear responds to wood, skin, and strings vibrating in physical space.',
      },
      {
        id: 'ch-4',
        title: 'Ergonomic Sovereignty',
        subtitle: 'Physical boundaries for everyday hardware',
        body: 'Everyday physical tools must respect human anatomy. In a smartphone landscape dominated by heavy phablets, you preserve a strict physical boundary: displays under 6.3 inches for effortless single-handed navigation. Paired with pure stock Android and an absence of carrier bloat, hardware remains a calm instrument rather than a relentless notification trap.',
        image: '/images/hero_pixel11_compact.jpg',
        pullQuote: 'Technology should feel like a fine tactile pen: purposeful, quiet, and perfectly balanced in the hand.',
      },
    ],
  },
  livingStory: [
    {
      paragraph: "Based in Bangalore, your lifestyle revolves around intentional, unhurried routines. With a 7-year-old daughter, family journeys are designed around zero transit friction—strictly non-stop direct flights and child-safe boutique sanctuaries.",
      tokenChips: [
        { token: "Bangalore (BLR)", ruleKey: "home_city", impactSummary: "Filters all departures strictly from BLR with zero layovers." },
        { token: "7-year-old daughter", ruleKey: "child_safety", impactSummary: "Enforces child-friendly swimming pool safety and quiet room zoning." },
        { token: "Non-stop direct flights", ruleKey: "flight_direct_only", impactSummary: "Discards any flight deal with layovers, regardless of discount." },
      ]
    },
    {
      paragraph: "In physical hardware, you enforce strict tactile ergonomics: phone screens under 6.3 inches with clean OS, titanium build, and ultralight full-frame camera bodies under 500g.",
      tokenChips: [
        { token: "Screens < 6.3 inches", ruleKey: "screen_size_limit", impactSummary: "Auto-flags compact flagships like Pixel 11 while filtering heavy phablets." },
        { token: "Camera < 500g body", ruleKey: "ultralight_camera", impactSummary: "Monitors lightweight travel primes and compact bodies like Sony A7CR." },
      ]
    },
    {
      paragraph: "In cultural pursuits, you seek unamplified acoustic theatre, architectural literature, and heritage dawn walks. Data privacy is sovereign: zero ad surveillance, 100% local context ownership.",
      tokenChips: [
        { token: "Unamplified theatre", ruleKey: "acoustic_performance", impactSummary: "Prioritizes intimate 200-seat venues like Ranga Shankara." },
        { token: "Architectural literature", ruleKey: "urbanism_books", impactSummary: "Scans indie bookstores like Champaca for seminal urbanism prints." },
        { token: "Data Sovereignty", ruleKey: "zero_ad_tracking", impactSummary: "Guarantees zero ad tracking and 1-click portable context export." },
      ]
    }
  ]
};

export const singaporePersona: PersonaArchetype = {
  title: "The Mindful Cosmopolitan & Spatial Curator",
  tagline: "Tropical Modernism • Direct Changi Escapes • Acoustic Intimacy • Precision Hardware",
  locationAnchor: "Singapore",
  homeAirport: "SIN (Changi Airport T3)",
  currency: "SGD (S$)",
  familyComposition: "Married · 1 Child (7yo daughter)",
  domainCapsules: [
    {
      domain: "travel",
      title: "Direct Changi Island Escapes",
      tagline: "Short-hop non-stop coastal getaways under 3h flight time from Singapore",
      heroImage: "/images/hero_singapore_travel.jpg",
      accentColor: "#24483F",
      bedrockRule: "Direct flights from Changi only (< 3 hours); secluded cliffside or beachfront boutique villas",
      activeWatchOrHorizon: "December Bali Uluwatu Coastal Retreat (52 days remaining)",
      curatedLocalNode: "Changi Terminal 3 Pier · Direct SIN→DPS / SIN→LGK",
      guardrailMetric: "Flight Time < 3h & Non-Stop",
    },
    {
      domain: "books",
      title: "Tropical Architecture & Craft",
      tagline: "Southeast Asian humane architecture, biophilic urban design, and design monographs",
      heroImage: "/images/hero_singapore_book.jpg",
      accentColor: "#C66E45",
      bedrockRule: "Southeast Asian tropical modernism monographs, biophilic design treatises, clothbound editions",
      activeWatchOrHorizon: "Tropical Architecture & Craftsmanship Monograph first edition watch",
      curatedLocalNode: "Basheer Graphic Books · Bras Basah Complex",
      guardrailMetric: "Hardcover Design Monographs",
    },
    {
      domain: "events",
      title: "Acoustic Chamber Recitals",
      tagline: "Unamplified string quartets and solo acoustic instruments in heritage halls",
      heroImage: "/images/hero_theatre_acoustic.jpg",
      accentColor: "#C66E45",
      bedrockRule: "100% Unamplified acoustic instruments; natural timber hall resonance (< 350 seats)",
      activeWatchOrHorizon: "Esplanade Waterfront acoustic recital watch",
      curatedLocalNode: "Victoria Concert Hall & Esplanade Studio",
      guardrailMetric: "Intimate Heritage Acoustics",
    },
    {
      domain: "shopping",
      title: "Precision Ergonomic Hardware",
      tagline: "Single-handed compact flagship with clean stock OS and titanium chassis",
      heroImage: "/images/hero_pixel11_compact.jpg",
      accentColor: "#24483F",
      bedrockRule: "Screen size strictly < 6.3\" diagonal; stock clean Android; zero carrier bloat",
      activeWatchOrHorizon: "Pixel 11 Compact price watch below S$950",
      curatedLocalNode: "Authorized Singapore Flagship Channel",
      guardrailMetric: "Display < 6.3\" & Global 5G Bands",
    },
  ],
  lookbookTiles: [
    {
      domain: 'travel',
      title: 'Island Sanctuaries',
      pullQuote: 'Short-hop horizons; tranquil arrivals without layovers.',
      heroImage: '/images/hero_singapore_travel.jpg',
      aspectRatio: 'tall',
      enduringTendency: 'Direct non-stop flights under 3h from Changi; secluded cliffside villas with private pools.',
      currentFocus: 'December Bali Uluwatu family escape (52 days remaining).',
      localAnchor: 'Changi Terminal 3 Pier · Direct SIN→DPS',
    },
    {
      domain: 'books',
      title: 'Tropical Modernism',
      pullQuote: 'Architecture shaped by climate, breeze, and craft.',
      heroImage: '/images/hero_singapore_book.jpg',
      aspectRatio: 'square',
      enduringTendency: 'Southeast Asian spatial theory, biophilic design, and clothbound monographs.',
      currentFocus: 'Tropical Architecture first edition monograph via Basheer Graphic Books.',
      localAnchor: 'Basheer Graphic Books · Bras Basah Complex',
    },
    {
      domain: 'events',
      title: 'Heritage Acoustics',
      pullQuote: 'Pure natural chamber sound in historic civic spaces.',
      heroImage: '/images/hero_theatre_acoustic.jpg',
      aspectRatio: 'square',
      enduringTendency: 'Unamplified acoustic recitals in natural acoustic resonance halls (< 350 seats).',
      currentFocus: 'Friday evening acoustic chamber recital at Victoria Concert Hall.',
      localAnchor: 'Victoria Concert Hall · Empress Place',
    },
    {
      domain: 'shopping',
      title: 'Compact Precision',
      pullQuote: 'Instruments designed for human scale.',
      heroImage: '/images/hero_pixel11_compact.jpg',
      aspectRatio: 'tall',
      enduringTendency: 'Single-handed flagship ergonomics (< 6.3" display); pure clean stock Android.',
      currentFocus: 'Pixel 11 Compact Singapore official clearance below S$950.',
      localAnchor: 'Authorized Singapore Flagship Channel',
    },
  ],
  lifeNarrative: {
    openingSummary: 'An urban rhythm balanced by short-hop tropical escapes, biophilic spatial design, and unhurried acoustic sound. Long-standing foundations—like non-stop regional flights from Changi and single-handed compact hardware—curate a quiet, high-signal life.',
    manifestoHeadline: 'A life defined by what is kept out.',
    chapters: [
      {
        id: 'ch-sg-1',
        title: 'Changi as a Portal of Calm',
        subtitle: 'Sub-3 hour non-stop tropical horizons',
        body: 'From Singapore, family travel is focused on short-hop serenity. Rather than grueling long-haul transit with a 7-year-old daughter, your travel foundation is anchored in direct non-stop escapes under 3 hours from Changi Terminal 3 to Bali or Langkawi, landing in time for an unhurried sunset.',
        image: '/images/hero_singapore_travel.jpg',
        pullQuote: 'The best family escapes begin with a short direct flight and arrive before transit fatigue sets in.',
      },
      {
        id: 'ch-sg-2',
        title: 'Tropical Spatial Craft',
        subtitle: 'Southeast Asian modernism & shophouse heritage',
        body: 'Surrounded by the dense vertical skyline of Singapore, your spatial heart lies in tropical modernism—deep overhangs, cross-ventilation, and tactile timber joinery. Basheer Graphic Books at Bras Basah Complex serves as your sanctuary for rare monographs celebrating humane Southeast Asian architecture.',
        image: '/images/hero_singapore_book.jpg',
        pullQuote: 'Architecture that breathes with the tropical climate, celebrated in clothbound print.',
      },
      {
        id: 'ch-sg-3',
        title: 'Acoustic Sanctuary in the Civic District',
        subtitle: 'Natural sound in Victoria Concert Hall',
        body: 'Away from the electronic hum of the city, Victoria Concert Hall offers an acoustic refuge. Unamplified chamber recitals allow strings, woodwinds, and natural acoustic reverberations to reach you without public address distortion or synthetic equalization.',
        image: '/images/hero_theatre_acoustic.jpg',
        pullQuote: 'In a digital metropolis, pure unamplified sound is the ultimate luxury of attention.',
      },
      {
        id: 'ch-sg-4',
        title: 'Tactile Precision Hardware',
        subtitle: 'Compact ergonomics for human hands',
        body: 'Your everyday computing requires absolute physical discipline: displays strictly under 6.3 inches for true single-handed comfort, titanium build, and stock clean software without commercial carrier bloatware.',
        image: '/images/hero_pixel11_compact.jpg',
        pullQuote: 'A compact phone that respects human anatomy, not algorithmic engagement.',
      },
    ],
  },
  livingStory: [
    {
      paragraph: "Based in Singapore, your rhythm balances urban density with tranquil island retreats. Family journeys are anchored at Changi Airport: non-stop flights strictly under 3 hours to tropical coastal sanctuaries.",
      tokenChips: [
        { token: "Singapore (SIN)", ruleKey: "home_city", impactSummary: "Anchors all travel to Changi Terminal 3 with direct regional departures." },
        { token: "Under 3h Flight Time", ruleKey: "flight_duration_limit", impactSummary: "Focuses on Bali, Langkawi, and Penang to eliminate travel fatigue." },
        { token: "Non-stop Direct Only", ruleKey: "flight_direct_only", impactSummary: "Rejects any layovers regardless of price discount." },
      ]
    },
    {
      paragraph: "Your aesthetic values celebrate Southeast Asian tropical modernism and tactile craft literature, sourced through beloved cultural anchors like Basheer Graphic Books at Bras Basah Complex.",
      tokenChips: [
        { token: "Tropical Modernism", ruleKey: "architecture_style", impactSummary: "Surfaces architectural monographs on biophilic and tropical structures." },
        { token: "Basheer Books", ruleKey: "indie_bookstore", impactSummary: "Monitors independent design book shipments in Bras Basah." },
      ]
    },
    {
      paragraph: "For entertainment and tech, you preserve quiet acoustic purity: intimate unamplified performances at Victoria Concert Hall, and compact phones strictly under 6.3 inches.",
      tokenChips: [
        { token: "Victoria Concert Hall", ruleKey: "acoustic_venue", impactSummary: "Prioritizes natural resonance concerts with zero PA distortion." },
        { token: "Compact Phones <6.3\"", ruleKey: "hardware_limit", impactSummary: "Restricts all device recommendations to single-handed flagships." },
      ]
    }
  ]
};

// ============================================================================
// 2. DISCOVERY CARDS FOR BOTH GEOGRAPHIES (FOCUSED 4 DOMAINS)
// ============================================================================

export const allCards: CardData[] = [
  // --- INDIA (BLR) CARDS ---
  {
    id: "card-in-travel",
    type: "travel-window",
    geography: "india-blr",
    originType: "requested",
    requestedTriggerLabel: 'Triggered by active watch: "Sri Lanka Direct Flights < ₹16,000"',
    domain: "travel",
    title: "Direct Flight Window: BLR → CMB",
    subtitle: "SriLankan Airlines Non-Stop · Dec 20–27 Holiday",
    summary: "Direct flights for your exact 6-day family holiday window dropped to ₹14,200 return (satisfying your strict no-layovers constraint and <₹16,000 price watch).",
    whyNow: "Airline opened festive inventory bucket; flight duration is only 1h 25m gate-to-gate.",
    heroImage: "/images/hero_srilanka_villa.jpg",
    imageAlt: "Serene coastal boutique villa pool in Sri Lanka",
    accentColor: "#24483F",
    relevanceReason: [
      "Strict Rule Satisfied: Non-stop flight (1h 25m direct, zero transit stops)",
      "Price Target Met: ₹14,200 vs ₹16,000 threshold",
      "Dates Align: Matches active intent for Dec 20–27 coastal family retreat"
    ],
    contextIds: ["ctx-1", "ctx-3", "ctx-4"],
    intentIds: ["i-2"],
    watchIds: ["watch-2"],
    relevanceScore: 0.98,
    freshnessScore: 0.94,
    confidenceScore: 0.99,
    actionabilityScore: 0.95,
    noveltyScore: 0.80,
    createdAt: "2026-09-02T05:00:00Z",
    status: "active",
    deepDive: {
      description: "SriLankan Airlines UL172 operates a seamless 85-minute direct hop from Kempegowda International (BLR) to Bandaranaike International (CMB). This timing avoids airport layover exhaustion with your 7-year-old daughter, landing in Colombo at 11:45 AM for an easy 1h 45m expressway transfer to southern coastal Galle.",
      keyHighlights: [
        "100% Non-Stop Direct Flight (85 minutes total gate-to-gate)",
        "Optimal midday arrival (11:45 AM) allowing smooth coastal villa check-in",
        "Includes 30kg checked baggage + child meal options",
        "Free cancellation within 24 hours of booking"
      ],
      specsOrDetails: [
        { label: "Outbound Flight", value: "UL172 · BLR 10:20 AM → CMB 11:45 AM (Non-stop 1h 25m)" },
        { label: "Return Flight", value: "UL173 · CMB 05:40 PM → BLR 07:05 PM (Non-stop 1h 25m)" },
        { label: "Cabin & Baggage", value: "Economy Classic · 30kg Checked + 7kg Cabin" },
        { label: "Transit Friction", value: "Zero layovers · Child-friendly departure times" }
      ],
      pricingBreakdown: "Round-trip adult fare: ₹14,200 including all international airport taxes and fuel surcharges.",
      directActionUrl: "https://srilankan.com",
      directActionLabel: "Book on SriLankan Airlines ↗"
    },
    sourceEvidence: [
      {
        title: "SriLankan Airlines Direct Booking Portal",
        url: "https://srilankan.com",
        retrievedAt: "2026-09-02T04:45:00Z",
        price: "₹14,200",
        baselinePrice: "₹18,500",
        discountPercent: 23
      }
    ],
    priceHistory: [
      { date: "Aug 15", price: 19500, merchant: "SriLankan" },
      { date: "Aug 22", price: 17800, merchant: "SriLankan" },
      { date: "Sep 02", price: 14200, merchant: "SriLankan Direct" }
    ],
    comparisons: [
      {
        name: "IndiGo via Chennai (1 Stop)",
        matchScore: 42,
        pros: "₹12,400 (Slightly cheaper)",
        cons: "Violates non-stop rule: 4h 50m total transit with layover in MAA",
        price: "₹12,400"
      }
    ]
  },
  {
    id: "card-in-books",
    type: "book-release",
    geography: "india-blr",
    originType: "proactive",
    domain: "books",
    title: "A Pattern Language (Hardcover Repress)",
    subtitle: "Christopher Alexander · Oxford University Press",
    summary: "Collector's hardcover reprint of Christopher Alexander's foundational architectural treatise, sourced directly at Champaca Bookstore on Edward Road.",
    whyNow: "Only 4 copies stocked at local independent bookstore Champaca; previously out of print in India.",
    heroImage: "/images/hero_alexander_book.jpg",
    imageAlt: "Open architecture book on rustic wooden library desk in morning light",
    accentColor: "#C66E45",
    relevanceReason: [
      "Exact match: Christopher Alexander & architectural systems in Values & Craft profile",
      "Local Indie Bookstore: Sourced from Champaca Bangalore network",
      "Durable print edition matching lifelong library curation"
    ],
    contextIds: ["ctx-9"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.94,
    freshnessScore: 0.91,
    confidenceScore: 0.96,
    actionabilityScore: 0.92,
    noveltyScore: 0.93,
    createdAt: "2026-09-01T14:00:00Z",
    status: "active",
    deepDive: {
      description: "Christopher Alexander's timeless masterpiece presents 253 patterns for human-scale design, from the organization of entire towns to the exact placement of window seats and courtyards. Essential reading for systems thinkers, craftsmen, and creators.",
      keyHighlights: [
        "Clothbound archival hardcover with ribbon bookmark",
        "Complete 1,171 pages with all original hand-drawn diagrams and photographs",
        "Physical copy available for same-day pickup at Champaca Bangalore",
        "Includes exclusive foreword on modern human-centered architecture"
      ],
      specsOrDetails: [
        { label: "Author", value: "Christopher Alexander, Sara Ishikawa, Murray Silverstein" },
        { label: "Publisher", value: "Oxford University Press (Archival Cloth Repress)" },
        { label: "Pages & Weight", value: "1,171 pages · 1.4 kg hardcover" },
        { label: "Location", value: "Champaca Bookstore, Edward Road, Bangalore" },
        { label: "Stock Count", value: "4 copies available in store" }
      ],
      pricingBreakdown: "₹3,400 (Indie bookstore retail price with archival slipcase).",
      directActionUrl: "https://champaca.in",
      directActionLabel: "Reserve Copy at Champaca ↗"
    },
    sourceEvidence: [
      {
        title: "Champaca Indie Bookstore Bangalore Inventory",
        url: "https://champaca.in",
        retrievedAt: "2026-09-01T13:30:00Z",
        price: "₹3,400",
        baselinePrice: "₹3,400"
      }
    ]
  },
  {
    id: "card-in-events",
    type: "cultural-event",
    geography: "india-blr",
    originType: "proactive",
    domain: "events",
    title: "Unamplified Sarod & Classical Guitar",
    subtitle: "Ranga Shankara · Saturday 7:00 PM (Acoustic Blackbox)",
    summary: "Intimate 200-seat acoustic recital with zero electrical amplification or microphones, allowing the natural resonance of timber and strings to fill the auditorium.",
    whyNow: "Rare unamplified weekend session with only 45 tickets released to the public.",
    heroImage: "/images/hero_theatre_acoustic.jpg",
    imageAlt: "Acoustic wooden theatre stage with warm spotlight on classical guitar",
    accentColor: "#C66E45",
    relevanceReason: [
      "Exact match: Preference for unamplified acoustic performing arts in Craft Values",
      "Venue match: Ranga Shankara (JP Nagar / South Bangalore favorite)",
      "Timing: Saturday 7:00 PM fits weekend unhurried evening rhythm"
    ],
    contextIds: ["ctx-8"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.93,
    freshnessScore: 0.95,
    confidenceScore: 0.97,
    actionabilityScore: 0.91,
    noveltyScore: 0.94,
    createdAt: "2026-09-02T04:30:00Z",
    status: "active",
    deepDive: {
      description: "An evening dedicated to pure acoustic resonance. Masters perform traditional ragas without any PA systems, speakers, or microphones. The acoustic architecture of Ranga Shankara's timber auditorium provides pure, uncolored harmonic warmth.",
      keyHighlights: [
        "100% Unamplified live acoustic performance (0% synthetic EQ)",
        "Strict 200-seat intimate hall capacity",
        "90-minute recital with no interval intermission disruption"
      ],
      specsOrDetails: [
        { label: "Artists", value: "Pt. Debanjan Bhattacharjee (Sarod) & Lucas Harris (Guitar)" },
        { label: "Venue", value: "Ranga Shankara, JP Nagar 2nd Phase, Bangalore" },
        { label: "Date & Time", value: "Saturday, Sep 06 · 7:00 PM – 8:30 PM" },
        { label: "Seating", value: "Open seating · First 5 rows recommended" }
      ],
      pricingBreakdown: "₹600 per pass (Direct venue ticketing).",
      directActionUrl: "https://rangashankara.org",
      directActionLabel: "Reserve Passes ↗"
    },
    sourceEvidence: [
      {
        title: "Ranga Shankara Cultural Schedule",
        url: "https://rangashankara.org",
        retrievedAt: "2026-09-02T03:00:00Z",
        price: "₹600",
        baselinePrice: "₹600"
      }
    ]
  },
  {
    id: "card-in-shopping",
    type: "hardware-deal",
    geography: "india-blr",
    originType: "requested",
    requestedTriggerLabel: 'Triggered by your active watch: "Pixel 11 compact under ₹60,000"',
    domain: "shopping",
    title: "Pixel 11 (256GB, Obsidian)",
    subtitle: "Compact 6.2\" Ergonomic Flagship · Stock Android",
    summary: "Flash clearance dropped the Pixel 11 to ₹56,499 (18% below standard ₹68,999 MSRP), satisfying your strict under-₹60,000 watch condition.",
    whyNow: "Price met trigger 2 hours ago on authorized retailer with bank instant discount.",
    heroImage: "/images/hero_pixel11_compact.jpg",
    imageAlt: "Compact titanium smartphone on wooden architect desk",
    accentColor: "#24483F",
    relevanceReason: [
      "Target Watch Satisfied: ₹56,499 is below your ₹60,000 threshold",
      "Screen constraint satisfied: 6.2\" OLED (< 6.3\" limit)",
      "OS preference: Clean Stock Android with 7 years of OS updates"
    ],
    contextIds: ["ctx-5", "ctx-6"],
    intentIds: ["i-1"],
    watchIds: ["watch-1"],
    relevanceScore: 0.99,
    freshnessScore: 0.96,
    confidenceScore: 0.98,
    actionabilityScore: 0.97,
    noveltyScore: 0.75,
    createdAt: "2026-09-02T06:10:00Z",
    status: "active",
    deepDive: {
      description: "The Pixel 11 is the gold standard for single-handed tactile ergonomics in the modern flagship landscape. Featuring a 6.2-inch Actua display, titanium chassis with curved matte edges, Tensor G5 silicon, and Google's computational photography in an ultralight 172g frame.",
      keyHighlights: [
        "6.2-inch 120Hz LTPO OLED Display (Single-handed ergonomics)",
        "7 Years of guaranteed Android OS & security updates",
        "Dual 50MP + 48MP camera setup with true-to-life color calibration"
      ],
      specsOrDetails: [
        { label: "Display Size", value: "6.2 inches (1080 x 2424 px, 2,700 nits peak)" },
        { label: "Dimensions & Weight", value: "149.8 x 70.8 x 8.2 mm · 172 grams" },
        { label: "Software", value: "Android 16 (Zero bloatware / ad-free)" }
      ],
      pricingBreakdown: "Base Price: ₹61,999 less ₹5,500 instant discount on HDFC/ICICI cards = ₹56,499.",
      directActionUrl: "https://flipkart.com",
      directActionLabel: "View Deal ↗"
    },
    sourceEvidence: [
      {
        title: "Flipkart Authorized Google Storefront",
        url: "https://flipkart.com",
        retrievedAt: "2026-09-02T06:00:00Z",
        price: "₹56,499",
        baselinePrice: "₹68,999",
        discountPercent: 18
      }
    ]
  },
  {
    id: "card-in-food",
    type: "curated-find",
    geography: "india-blr",
    originType: "proactive",
    domain: "food-drink",
    title: "Ferment & Vine Courtyard",
    subtitle: "Natural Wine Bistro & Sourdough Hearth · Indiranagar",
    summary: "An intimate 24-seat open-air courtyard bistro serving natural low-intervention wines, wild-fermented sourdough, and botanical small plates without loud playlists or commercial crowds.",
    whyNow: "Weekend courtyard table reservations just released for Friday evening; strict acoustic noise boundary preserved.",
    heroImage: "/images/for_you_bistro.jpg",
    imageAlt: "Intimate candlelit bistro courtyard with wine glass and crusty sourdough loaf",
    accentColor: "#C66E45",
    relevanceReason: [
      "Natural Wine & Fermentation: Aligns with organic craft eating preferences",
      "Acoustic Atmosphere: Sub-65dB ambient conversational sound levels",
      "Location: 15-minute neighborhood reach in Bangalore"
    ],
    contextIds: ["ctx-food-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.95,
    freshnessScore: 0.94,
    confidenceScore: 0.96,
    actionabilityScore: 0.92,
    noveltyScore: 0.91,
    createdAt: "2026-09-02T16:00:00Z",
    status: "active",
    deepDive: {
      description: "Ferment & Vine operates on unhurried culinary principles. Every bottle is sourced from small-holding organic vintners, and each dish is built around 36-hour slow-fermented heirloom wheat. Seating is deliberately spaced to preserve conversation.",
      keyHighlights: [
        "Unamplified acoustic courtyard with lush foliage",
        "Rotating organic pet-nat and orange wine cellar list",
        "Wild-fermented sourdough and hand-churned salted butter"
      ],
      specsOrDetails: [
        { label: "Cuisine", value: "Natural Wine, Sourdough, Seasonal Tapas" },
        { label: "Atmosphere", value: "Intimate Courtyard (24 seats only)" },
        { label: "Hours", value: "Wed–Sun · 6:30 PM – 11:00 PM" }
      ],
      pricingBreakdown: "Average dinner for two: ₹2,400 including wine pairing.",
      directActionUrl: "https://fermentandvine.example.com",
      directActionLabel: "Reserve Table ↗"
    },
    sourceEvidence: [
      {
        title: "Ferment & Vine Direct Reservation Portal",
        url: "https://fermentandvine.example.com",
        retrievedAt: "2026-09-02T12:00:00Z",
        price: "₹2,400"
      }
    ]
  },
  {
    id: "card-in-clothing",
    type: "curated-find",
    geography: "india-blr",
    originType: "proactive",
    domain: "shopping",
    title: "Heavy Unlined Linen Chore Jacket",
    subtitle: "Atelier Tactile Craft · Small-Batch Irish Linen",
    summary: "Constructed from 380gsm washed unlined linen with genuine horn buttons and French felled seams. Designed to soften and mold to your posture with wear rather than degrade.",
    whyNow: "Small-batch run of 40 pieces just cut by the atelier; pre-orders ship next Tuesday.",
    heroImage: "/images/craft_linen_jacket.jpg",
    imageAlt: "Olive-green washed linen chore coat hanging on sculpted oak hanger against stone wall",
    accentColor: "#24483F",
    relevanceReason: [
      "Natural Materials: 100% Unlined breathable heavyweight linen",
      "Craft Ethos: Small family-run atelier with durable repairable construction",
      "Timeless Workwear: Zero branding or trend-driven logos"
    ],
    contextIds: ["ctx-craft-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.93,
    freshnessScore: 0.92,
    confidenceScore: 0.95,
    actionabilityScore: 0.90,
    noveltyScore: 0.89,
    createdAt: "2026-09-02T15:30:00Z",
    status: "active",
    deepDive: {
      description: "An everyday uniform piece built for decades of wear. The heavy 380gsm linen provides natural structure while allowing breathability in warm climates. Features reinforced patch pockets and horn buttons secured with backer buttons.",
      keyHighlights: [
        "Washed 380gsm unlined European flax linen",
        "Reinforced patch pockets sized for small notebooks",
        "Hand-attached natural horn buttons"
      ],
      specsOrDetails: [
        { label: "Fabric", value: "100% Irish Linen (380gsm)" },
        { label: "Fit", value: "Relaxed Boxy Chore Silhouette" },
        { label: "Care", value: "Cold gentle wash, hang dry" }
      ],
      pricingBreakdown: "Direct atelier price: ₹9,200 with complimentary repairs.",
      directActionUrl: "https://atelieroftactilecraft.example.com",
      directActionLabel: "View Piece ↗"
    },
    sourceEvidence: [
      {
        title: "Atelier Studio Official Storefront",
        url: "https://atelieroftactilecraft.example.com",
        retrievedAt: "2026-09-02T14:00:00Z",
        price: "₹9,200"
      }
    ]
  },
  {
    id: "card-in-cinema",
    type: "curated-find",
    geography: "india-blr",
    originType: "proactive",
    domain: "films",
    title: "Nightfall & Shadows (35mm Archival)",
    subtitle: "Director’s Cut Master · Weekend Stream Premiere",
    summary: "A slow-burn neo-noir mystery crafted with natural rain acoustics, unhurried cinematography, and optical film grain. Streaming this weekend on private high-fidelity master.",
    whyNow: "Restored 4K release with lossless uncompressed audio track available through Sunday.",
    heroImage: "/images/for_you_indie_cinema.jpg",
    imageAlt: "Atmospheric 35mm film still of rainy neon streets and vintage coupe",
    accentColor: "#C66E45",
    relevanceReason: [
      "Cinema Style: Slow burn, high spatial craft, contemplative pacing",
      "Director Match: Follows your interest in quiet neo-noir narratives",
      "Audio Quality: Lossless uncompressed sound design"
    ],
    contextIds: ["ctx-film-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.96,
    freshnessScore: 0.95,
    confidenceScore: 0.97,
    actionabilityScore: 0.94,
    noveltyScore: 0.93,
    createdAt: "2026-09-02T17:00:00Z",
    status: "active",
    deepDive: {
      description: "Shot on 35mm Kodak Vision3 film stock, Nightfall & Shadows avoids hyperactive editing and spectacle in favor of meticulous mood, architectural shadows, and evocative foley acoustics.",
      keyHighlights: [
        "102-minute runtime with slow, deliberate pacing",
        "Original analog stereo mix without synthetic sub-bass boost",
        "Includes director commentary monograph"
      ],
      specsOrDetails: [
        { label: "Runtime", value: "102 minutes" },
        { label: "Format", value: "4K Remaster · Lossless Audio" },
        { label: "Language", value: "Original with English subtitles" }
      ],
      pricingBreakdown: "Weekend screening access: ₹350 on independent streaming master.",
      directActionUrl: "https://mubi.example.com",
      directActionLabel: "Watch Film ↗"
    },
    sourceEvidence: [
      {
        title: "Curated Cinema Platform",
        url: "https://mubi.example.com",
        retrievedAt: "2026-09-02T16:00:00Z",
        price: "₹350"
      }
    ]
  },
  {
    id: "card-in-audio",
    type: "curated-find",
    geography: "india-blr",
    originType: "proactive",
    domain: "shopping",
    title: "Open-Back Walnut Reference Monitors",
    subtitle: "Acoustic Engineering · Neutral Physical Soundstage",
    summary: "Crafted from solid kiln-dried American walnut and machined aluminum. Open-back acoustic baffles create a natural physical soundstage that mirrors sitting in a live room.",
    whyNow: "Authorized importer received a 10-unit shipment with ₹4,000 seasonal clearance discount.",
    heroImage: "/images/for_you_audiophile.jpg",
    imageAlt: "Minimalist aluminum and walnut open-back headphones resting on warm studio table",
    accentColor: "#24483F",
    relevanceReason: [
      "Acoustic Integrity: Zero DSP artificial bass boost; honest neutral curve",
      "Repairable Craft: User-replaceable lambskin pads and oxygen-free copper cables",
      "Tactile Materials: Real hardwood and satin-finished aluminum"
    ],
    contextIds: ["ctx-audio-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.94,
    freshnessScore: 0.91,
    confidenceScore: 0.95,
    actionabilityScore: 0.93,
    noveltyScore: 0.88,
    createdAt: "2026-09-02T18:00:00Z",
    status: "active",
    deepDive: {
      description: "Designed for listeners who value harmonic truth over artificial excitement. The 50mm biocellulose drivers reproduce acoustic instruments with pristine air, separation, and micro-dynamics.",
      keyHighlights: [
        "Open-back planar acoustic architecture",
        "Solid kiln-dried American walnut earcups",
        "Detachable braided 3.5mm cable with 6.3mm studio adapter"
      ],
      specsOrDetails: [
        { label: "Driver Size", value: "50mm Biocellulose" },
        { label: "Impedance", value: "32 Ohms (Easy to drive)" },
        { label: "Weight", value: "340 grams" }
      ],
      pricingBreakdown: "Current price: ₹24,500 (Reduced from ₹28,500).",
      directActionUrl: "https://headphonezone.example.com",
      directActionLabel: "View Hardware ↗"
    },
    sourceEvidence: [
      {
        title: "Official Audio Importer Store",
        url: "https://headphonezone.example.com",
        retrievedAt: "2026-09-02T17:00:00Z",
        price: "₹24,500",
        baselinePrice: "₹28,500",
        discountPercent: 14
      }
    ]
  },
  {
    id: "card-in-coffee",
    type: "curated-find",
    geography: "india-blr",
    originType: "proactive",
    domain: "food-drink",
    title: "Anaerobic Single-Origin Micro-Lot",
    subtitle: "Subko Specialty Roasters · 250g Whole Bean",
    summary: "Wild-fermented heirloom varietal grown under silver oak shade canopies at 1,450m elevation. Delicately roasted in small batches to preserve bright notes of dried stone fruit and raw mountain honey.",
    whyNow: "Only 60 bags packaged from this seasonal harvest; roasted 48 hours ago and resting for peak extraction.",
    heroImage: "/images/specialty_coffee_roaster.jpg",
    imageAlt: "Kraft paper bag of anaerobic natural Ethiopian coffee on wooden counter with ceramic cup",
    accentColor: "#C66E45",
    relevanceReason: [
      "Artisan Roasting: Light-medium profile with zero bitter dark roast carbon",
      "Traceability: Direct farm-gate sourcing with complete lot transparency",
      "Timing: Freshly rested whole bean ready for manual pour-over"
    ],
    contextIds: ["ctx-coffee-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.95,
    freshnessScore: 0.97,
    confidenceScore: 0.96,
    actionabilityScore: 0.93,
    noveltyScore: 0.90,
    createdAt: "2026-09-02T19:00:00Z",
    status: "active",
    deepDive: {
      description: "Subko’s anaerobic natural series represents the pinnacle of contemporary specialty roasting. Fermented in sealed stainless tanks for 72 hours before slow drying on raised beds, this coffee yields extraordinary clarity without sourness.",
      keyHighlights: [
        "100% Arabica heirloom micro-lot (Gedeb, Ethiopia)",
        "Notes of wild strawberry jam, cacao nibs, and bergamot",
        "Roasted on Loring eco-roasters with zero carbon scorching"
      ],
      specsOrDetails: [
        { label: "Elevation", value: "1,950–2,100 meters" },
        { label: "Process", value: "72-Hour Anaerobic Natural" },
        { label: "Roast Date", value: "September 01, 2026" }
      ],
      pricingBreakdown: "Bag price: ₹850 (250g whole bean with airtight valve).",
      directActionUrl: "https://subko.example.com",
      directActionLabel: "Order Beans ↗"
    },
    sourceEvidence: [
      {
        title: "Subko Direct Roastery Store",
        url: "https://subko.example.com",
        retrievedAt: "2026-09-02T18:00:00Z",
        price: "₹850"
      }
    ]
  },
  {
    id: "card-in-tea",
    type: "curated-find",
    geography: "india-blr",
    originType: "proactive",
    domain: "shopping",
    title: "Hand-Thrown Stoneware Kyusu",
    subtitle: "Tokoname Clay Atelier · Single-Serving Side-Handle",
    summary: "Thrown on a manual foot-wheel using iron-rich mineral clay that mellows natural tannins. Designed with a built-in ceramic clay strainer for pristine leaf circulation without metallic mesh contact.",
    whyNow: "Wood-fired kiln run yielded 12 teapots with natural ash glaze accents; imported directly.",
    heroImage: "/images/ceramic_teapot_tea.jpg",
    imageAlt: "Matte black ceramic Kyusu teapot with rising steam on rustic cedar tray",
    accentColor: "#24483F",
    relevanceReason: [
      "Tactile Craft: Wheel-thrown unglazed ceramic by third-generation potter",
      "No Plastic / No Mesh: 100% clay construction for purest hot water contact",
      "Human Scale: 220ml volume ideal for contemplative morning tea rituals"
    ],
    contextIds: ["ctx-tea-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.92,
    freshnessScore: 0.89,
    confidenceScore: 0.94,
    actionabilityScore: 0.88,
    noveltyScore: 0.92,
    createdAt: "2026-09-02T19:30:00Z",
    status: "active",
    deepDive: {
      description: "Tokoname teapots have been celebrated for centuries for their ability to round out the astringency of high-grade green tea. The ergonomic side-handle allows wrist pouring with zero strain.",
      keyHighlights: [
        "Authentic Tokoname red-iron reduction fired clay",
        "Zero plastic seals, silicone rings, or metal wire strainers",
        "Ages gracefully with tea oils over decades of use"
      ],
      specsOrDetails: [
        { label: "Capacity", value: "220ml (1–2 cups)" },
        { label: "Material", value: "Unglazed Tokoname Red Clay" },
        { label: "Origin", value: "Aichi Prefecture, Japan" }
      ],
      pricingBreakdown: "Direct import price: ₹6,400 with protective paulownia wooden box.",
      directActionUrl: "https://tokoname.example.com",
      directActionLabel: "Explore Teapot ↗"
    },
    sourceEvidence: [
      {
        title: "Japanese Ceramic Craft Network",
        url: "https://tokoname.example.com",
        retrievedAt: "2026-09-02T18:30:00Z",
        price: "₹6,400"
      }
    ]
  },
  {
    id: "card-in-rail",
    type: "travel-window",
    geography: "india-blr",
    originType: "proactive",
    domain: "travel",
    title: "Vistadome Mountain Rail Journey",
    subtitle: "South Western Heritage Route · Panoramic Glass Observation",
    summary: "A contemplative overland rail escape traversing misty Western Ghats rainforests and historic stone viaducts. Features 360-degree rotatable reclining seats beneath curved glass skylights.",
    whyNow: "Post-monsoon waterfall viewings at peak beauty; weekend observation car reservations open today.",
    heroImage: "/images/scenic_alpine_rail.jpg",
    imageAlt: "Scenic panoramic observation train car with passengers looking out at misty alpine forest",
    accentColor: "#24483F",
    relevanceReason: [
      "Zero Airport Friction: Board leisurely from city station without baggage screenings",
      "Landscape Immersion: Curved glass skylights and observation viewing gallery",
      "Family Journey: Unhurried daylight transit with spacious reclining seats"
    ],
    contextIds: ["ctx-rail-1"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.97,
    freshnessScore: 0.96,
    confidenceScore: 0.98,
    actionabilityScore: 0.94,
    noveltyScore: 0.95,
    createdAt: "2026-09-02T20:00:00Z",
    status: "active",
    deepDive: {
      description: "Trading cramped security lines for wide-angle wilderness views, the Vistadome journey through the Sakleshpur mountain pass features 58 tunnels and over 100 bridges. Passengers can order local warm filter coffee and snacks directly to their rotating armchair.",
      keyHighlights: [
        "Curved glass ceiling and panoramic rear observation balcony",
        "180-degree rotatable luxury plush armchairs",
        "Daylight journey through lush biodiversity corridor"
      ],
      specsOrDetails: [
        { label: "Route", value: "Yeshwantpur (YPR) → Mangalore (MAQ)" },
        { label: "Duration", value: "7h 15m scenic daytime departure (07:00 AM)" },
        { label: "Class", value: "Executive Vistadome AC (EV)" }
      ],
      pricingBreakdown: "Pass fare: ₹1,525 per seat (Official IRCTC railway booking).",
      directActionUrl: "https://irctc.co.in",
      directActionLabel: "Book Journey ↗"
    },
    sourceEvidence: [
      {
        title: "IRCTC Official Heritage Vistadome Portal",
        url: "https://irctc.co.in",
        retrievedAt: "2026-09-02T19:00:00Z",
        price: "₹1,525"
      }
    ]
  },

  // --- SINGAPORE (SIN) CARDS ---
  {
    id: "card-sg-travel",
    type: "travel-window",
    geography: "singapore-sin",
    originType: "requested",
    requestedTriggerLabel: 'Triggered by active watch: "Changi Direct to Bali < S$320"',
    domain: "travel",
    title: "Changi Direct Window: SIN → DPS (Bali)",
    subtitle: "Singapore Airlines Non-Stop · Dec 20–27 Escape",
    summary: "Non-stop flights from Changi Terminal 3 to Bali dropped to S$280 return (2h 40m flight time, satisfying your strict non-stop and <3h duration constraints).",
    whyNow: "Holiday seat bucket opened this morning; optimal morning departure (09:15 AM) arrives for lunch.",
    heroImage: "/images/hero_singapore_travel.jpg",
    imageAlt: "Secluded cliffside plunge pool villa overlooking turquoise ocean in Bali",
    accentColor: "#24483F",
    relevanceReason: [
      "Strict Rule Satisfied: Non-stop direct from Changi (2h 40m gate-to-gate)",
      "Price Target Met: S$280 vs S$320 ceiling threshold",
      "Stay Style: Child-friendly clifftop villa sanctuary with private plunge pool"
    ],
    contextIds: ["ctx-sg-1", "ctx-sg-3"],
    intentIds: ["i-sg-1"],
    watchIds: ["watch-sg-1"],
    relevanceScore: 0.99,
    freshnessScore: 0.96,
    confidenceScore: 0.99,
    actionabilityScore: 0.96,
    noveltyScore: 0.82,
    createdAt: "2026-09-03T07:00:00Z",
    status: "active",
    deepDive: {
      description: "Singapore Airlines SQ938 departs Changi T3 at 09:15 AM, touching down in Denpasar at 11:55 AM. Perfect timing for smooth express transit to Uluwatu's serene southern cliffs. Eliminates transit friction for families.",
      keyHighlights: [
        "100% Non-Stop Direct Flight on Singapore Airlines",
        "Mid-morning departure (09:15 AM) ideal for family breakfast at Changi",
        "Includes 30kg checked baggage per passenger"
      ],
      specsOrDetails: [
        { label: "Outbound", value: "SQ938 · SIN 09:15 AM → DPS 11:55 AM (Non-stop 2h 40m)" },
        { label: "Return", value: "SQ947 · DPS 06:05 PM → SIN 08:50 PM (Non-stop 2h 45m)" },
        { label: "Baggage & Cabin", value: "Economy Classic · 30kg Checked" },
        { label: "Total Price", value: "S$280 return (All airport taxes included)" }
      ],
      pricingBreakdown: "Round-trip adult fare: S$280 on Singapore Airlines official site.",
      directActionUrl: "https://singaporeair.com",
      directActionLabel: "Book on Singapore Airlines ↗"
    },
    sourceEvidence: [
      {
        title: "Singapore Airlines Changi Direct Booking",
        url: "https://singaporeair.com",
        retrievedAt: "2026-09-03T06:30:00Z",
        price: "S$280",
        baselinePrice: "S$360",
        discountPercent: 22
      }
    ]
  },
  {
    id: "card-sg-books",
    type: "book-release",
    geography: "singapore-sin",
    originType: "proactive",
    domain: "books",
    title: "Tropical Architecture & Craftsmanship",
    subtitle: "Monograph Edition · Basheer Graphic Books",
    summary: "Exquisite hardcover monograph exploring climate-responsive Southeast Asian timber design and shophouse architecture, stocked at Bras Basah Complex.",
    whyNow: "First print shipment arrived this week; limited to 25 copies at Basheer Graphic Books.",
    heroImage: "/images/hero_singapore_book.jpg",
    imageAlt: "Open architectural monograph on teak desk in sunlit Singapore shophouse",
    accentColor: "#C66E45",
    relevanceReason: [
      "Exact match: Southeast Asian tropical modernism and spatial craft",
      "Local Indie Bookstore: Basheer Graphic Books (Bras Basah institution)",
      "Archival clothbound format with original hand plans"
    ],
    contextIds: ["ctx-sg-2"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.95,
    freshnessScore: 0.93,
    confidenceScore: 0.97,
    actionabilityScore: 0.94,
    noveltyScore: 0.92,
    createdAt: "2026-09-03T08:00:00Z",
    status: "active",
    deepDive: {
      description: "An archival tribute to climate-responsive tropical architecture across Singapore, Malaysia, and Bali. Features deep eaves, cross-ventilation courtyards, and reclaimed teak joinery. An essential reference for lovers of humane, place-based design.",
      keyHighlights: [
        "Clothbound hardcover with foil-stamped typography",
        "Includes 320 full-color photography plates and hand architectural drawings",
        "Available for same-day collection at Bras Basah Complex"
      ],
      specsOrDetails: [
        { label: "Publisher", value: "Talisman Publishing & Basheer Books" },
        { label: "Pages & Weight", value: "320 pages · 1.6 kg clothbound" },
        { label: "Location", value: "Basheer Graphic Books, #04-19 Bras Basah Complex, Singapore" },
        { label: "Stock Status", value: "In Stock (Limited to 25 copies)" }
      ],
      pricingBreakdown: "S$68.00 (Retail price at Basheer Graphic Books).",
      directActionUrl: "https://basheergraphic.com",
      directActionLabel: "Reserve at Basheer Books ↗"
    },
    sourceEvidence: [
      {
        title: "Basheer Graphic Books New Releases",
        url: "https://basheergraphic.com",
        retrievedAt: "2026-09-03T07:15:00Z",
        price: "S$68",
        baselinePrice: "S$68"
      }
    ]
  },
  {
    id: "card-sg-events",
    type: "cultural-event",
    geography: "singapore-sin",
    originType: "proactive",
    domain: "events",
    title: "Unamplified Cello & Classical Guitar",
    subtitle: "Victoria Concert Hall · Friday 7:30 PM",
    summary: "Intimate heritage hall chamber recital performed with zero synthetic amplification, celebrating pure acoustic resonance in Singapore's historic civic district.",
    whyNow: "Exclusive acoustic chamber session with only 50 open public seats.",
    heroImage: "/images/hero_theatre_acoustic.jpg",
    imageAlt: "Atmospheric acoustic timber stage with solitary classical guitar in spotlight",
    accentColor: "#C66E45",
    relevanceReason: [
      "Acoustic purity rule: 100% unamplified classical performance",
      "Venue: Victoria Concert Hall (Acoustically tuned heritage hall)",
      "Timing: Friday 7:30 PM unhurried weekend opener"
    ],
    contextIds: ["ctx-sg-4"],
    intentIds: [],
    watchIds: [],
    relevanceScore: 0.94,
    freshnessScore: 0.92,
    confidenceScore: 0.98,
    actionabilityScore: 0.93,
    noveltyScore: 0.91,
    createdAt: "2026-09-03T05:30:00Z",
    status: "active",
    deepDive: {
      description: "Experience the acoustic warmth of Victoria Concert Hall without electronic microphones or speakers. Masters perform Bach cello suites and Spanish guitar pieces, utilizing the natural reflection of 160-year-old timber and plaster surfaces.",
      keyHighlights: [
        "100% Acoustic chamber sound with zero microphones",
        "Historic Victoria Concert Hall seating with pristine line of sight",
        "75-minute continuous performance with post-concert artist dialogue"
      ],
      specsOrDetails: [
        { label: "Venue", value: "Victoria Concert Hall, 11 Empress Place, Singapore" },
        { label: "Schedule", value: "Friday, Sep 12 · 7:30 PM – 8:45 PM" },
        { label: "Acoustics", value: "Natural reverberation 1.8s · Unamplified" }
      ],
      pricingBreakdown: "S$45 per ticket (Direct SISTIC ticketing).",
      directActionUrl: "https://sistic.com.sg",
      directActionLabel: "Reserve Tickets on SISTIC ↗"
    },
    sourceEvidence: [
      {
        title: "Singapore Symphony / Victoria Concert Hall Schedule",
        url: "https://sistic.com.sg",
        retrievedAt: "2026-09-03T05:00:00Z",
        price: "S$45",
        baselinePrice: "S$45"
      }
    ]
  },
  {
    id: "card-sg-shopping",
    type: "hardware-deal",
    geography: "singapore-sin",
    originType: "requested",
    requestedTriggerLabel: 'Triggered by active watch: "Pixel 11 Compact under S$950"',
    domain: "shopping",
    title: "Pixel 11 (256GB, Obsidian)",
    subtitle: "Compact 6.2\" Ergonomic Display · Global 5G Bands",
    summary: "Authorized clearance on Google Store Singapore dropped the compact Pixel 11 to S$899 (satisfying your <6.3\" screen rule and <S$950 watch target).",
    whyNow: "Festival promotion unlocked S$120 instant checkout voucher.",
    heroImage: "/images/hero_pixel11_compact.jpg",
    imageAlt: "Compact titanium smartphone on wooden architect desk",
    accentColor: "#24483F",
    relevanceReason: [
      "Target Watch Satisfied: S$899 is below your S$950 target ceiling",
      "Screen constraint: 6.2\" OLED display fits single-handed rule (<6.3\")",
      "Software: Pure stock Android with 7 years of OS updates"
    ],
    contextIds: ["ctx-sg-5"],
    intentIds: ["i-sg-2"],
    watchIds: ["watch-sg-2"],
    relevanceScore: 0.98,
    freshnessScore: 0.95,
    confidenceScore: 0.97,
    actionabilityScore: 0.96,
    noveltyScore: 0.78,
    createdAt: "2026-09-03T06:00:00Z",
    status: "active",
    deepDive: {
      description: "The Pixel 11 is the premier compact ergonomic flagship for single-handed navigation. Featuring a 6.2\" Actua display, titanium rails, Tensor G5 processor, and Google's computational photography system.",
      keyHighlights: [
        "6.2-inch 120Hz LTPO OLED display (Single-handed ergonomics)",
        "Includes official Singapore 2-year warranty and global 5G band support",
        "7 Years of guaranteed security and Android OS upgrades"
      ],
      specsOrDetails: [
        { label: "Display Size", value: "6.2 inches · 149.8 x 70.8 x 8.2 mm · 172g" },
        { label: "Warranty", value: "2 Years Google Singapore Official Warranty" },
        { label: "Network", value: "5G SA/NSA Dual SIM (eSIM + Nano-SIM)" }
      ],
      pricingBreakdown: "Base Price S$1,019 less S$120 instant store voucher = S$899 final price.",
      directActionUrl: "https://store.google.com/sg",
      directActionLabel: "View on Google Store SG ↗"
    },
    sourceEvidence: [
      {
        title: "Google Store Singapore Official",
        url: "https://store.google.com/sg",
        retrievedAt: "2026-09-03T05:45:00Z",
        price: "S$899",
        baselinePrice: "S$1,019",
        discountPercent: 12
      }
    ]
  }
];

// ============================================================================
// 3. STORIES TRAY (DUAL GEOGRAPHY)
// ============================================================================

export const initialStories: StoryPulse[] = [
  // India Stories
  {
    id: "story-in-1",
    geography: "india-blr",
    title: "⚡ Price Drop Alert",
    badge: "Tracked Alert",
    tagline: "Pixel 11 hit ₹56,499 (Target was <₹60,000)",
    timeAgo: "2h ago",
    heroImage: "/images/hero_pixel11_compact.jpg",
    accentColor: "#24483F",
    takeaways: [
      "Flash 18% clearance on Flipkart authorized store",
      "Compact 6.2\" size fits your single-handed rule (<6.3\")",
      "7 years of pure Stock Android updates with zero bloatware"
    ],
    cardId: "card-in-shopping",
    actionUrl: "https://flipkart.com",
    actionLabel: "View Deal (₹56,499)"
  },
  {
    id: "story-in-2",
    geography: "india-blr",
    title: "✈️ Flight Window",
    badge: "Tracked Alert",
    tagline: "BLR → CMB direct flights dropped to ₹14,200",
    timeAgo: "4h ago",
    heroImage: "/images/hero_srilanka_villa.jpg",
    accentColor: "#24483F",
    takeaways: [
      "Direct non-stop flight (1h 25m gate-to-gate)",
      "Zero layovers eliminating transit fatigue with 7yo child",
      "Exact dates match your Dec 20–27 coastal family intent"
    ],
    cardId: "card-in-travel",
    actionUrl: "https://srilankan.com",
    actionLabel: "Book Flights (₹14,200)"
  },
  {
    id: "story-in-3",
    geography: "india-blr",
    title: "📚 Architecture Book",
    badge: "Proactive Discovery",
    tagline: "A Pattern Language clothbound reprint at Champaca",
    timeAgo: "1d ago",
    heroImage: "/images/hero_alexander_book.jpg",
    accentColor: "#C66E45",
    takeaways: [
      "Christopher Alexander's foundational 253 patterns for human scale",
      "Archival clothbound hardcover with all original diagrams",
      "Only 4 copies in stock at Champaca Bangalore"
    ],
    cardId: "card-in-books",
    actionUrl: "https://champaca.in",
    actionLabel: "Reserve at Bookstore"
  },
  {
    id: "story-in-4",
    geography: "india-blr",
    title: "🎟️ Acoustic Night",
    badge: "Proactive Discovery",
    tagline: "Unamplified Sarod & Guitar at Ranga Shankara",
    timeAgo: "1d ago",
    heroImage: "/images/hero_theatre_acoustic.jpg",
    accentColor: "#C66E45",
    takeaways: [
      "100% Acoustic unamplified sound in 200-seat timber hall",
      "Zero microphones or synthetic equalization",
      "Saturday 7:00 PM session with only 45 tickets open"
    ],
    cardId: "card-in-events",
    actionUrl: "https://rangashankara.org",
    actionLabel: "Reserve Passes (₹600)"
  },

  // Singapore Stories
  {
    id: "story-sg-1",
    geography: "singapore-sin",
    title: "✈️ Changi Direct Escape",
    badge: "Tracked Alert",
    tagline: "SIN → DPS Bali direct dropped to S$280 return",
    timeAgo: "1h ago",
    heroImage: "/images/hero_singapore_travel.jpg",
    accentColor: "#24483F",
    takeaways: [
      "Singapore Airlines non-stop direct flight (2h 40m)",
      "Zero layovers; morning 09:15 AM departure",
      "Dec 20–27 coastal villa holiday dates aligned"
    ],
    cardId: "card-sg-travel",
    actionUrl: "https://singaporeair.com",
    actionLabel: "Book Flights (S$280)"
  },
  {
    id: "story-sg-2",
    geography: "singapore-sin",
    title: "📚 Tropical Monograph",
    badge: "Proactive Discovery",
    tagline: "Tropical Architecture first edition at Basheer Books",
    timeAgo: "3h ago",
    heroImage: "/images/hero_singapore_book.jpg",
    accentColor: "#C66E45",
    takeaways: [
      "Southeast Asian humane timber architecture & biophilic craft",
      "Clothbound first print edition with hand architectural plates",
      "Only 25 copies at Bras Basah Complex"
    ],
    cardId: "card-sg-books",
    actionUrl: "https://basheergraphic.com",
    actionLabel: "Reserve at Basheer"
  },
  {
    id: "story-sg-3",
    geography: "singapore-sin",
    title: "🎟️ Victoria Hall Acoustic",
    badge: "Proactive Discovery",
    tagline: "Unamplified Cello & Guitar at Victoria Concert Hall",
    timeAgo: "5h ago",
    heroImage: "/images/hero_theatre_acoustic.jpg",
    accentColor: "#C66E45",
    takeaways: [
      "100% Unamplified acoustic performance in historic hall",
      "Natural 1.8s acoustic reverberation without PA speakers",
      "Friday 7:30 PM session with only 50 tickets released"
    ],
    cardId: "card-sg-events",
    actionUrl: "https://sistic.com.sg",
    actionLabel: "Reserve Passes (S$45)"
  },
  {
    id: "story-sg-4",
    geography: "singapore-sin",
    title: "⚡ Pixel 11 SG Drop",
    badge: "Tracked Alert",
    tagline: "Pixel 11 Compact dropped to S$899 (Target <S$950)",
    timeAgo: "6h ago",
    heroImage: "/images/hero_pixel11_compact.jpg",
    accentColor: "#24483F",
    takeaways: [
      "Google Store Singapore official clearance with S$120 voucher",
      "Single-handed 6.2\" display fits ergonomics constraint",
      "7 years of pure Stock Android security updates"
    ],
    cardId: "card-sg-shopping",
    actionUrl: "https://store.google.com/sg",
    actionLabel: "View Deal (S$899)"
  }
];

// ============================================================================
// 4. ACTIVE WATCHES & INTENTS
// ============================================================================

export const initialWatches: WatchData[] = [
  {
    id: "watch-1",
    geography: "india-blr",
    type: "price",
    entity: "Pixel 11 Compact (256GB)",
    criteria: "Price drop below ₹60,000 (Screen < 6.3\")",
    targetPrice: 60000,
    currentPrice: 56499,
    currency: "INR",
    status: "active",
    triggerMet: true,
    lastChecked: "12 mins ago",
    checkCadence: "Every 2 hours",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-02T06:00:00Z", price: 56499, availability: "In Stock", sourceUrl: "https://flipkart.com", notes: "Target satisfied (₹56,499 < ₹60,000)" }
    ]
  },
  {
    id: "watch-2",
    geography: "india-blr",
    type: "travel",
    entity: "BLR → CMB Non-Stop Flights (Dec 20–27)",
    criteria: "Direct non-stop flight under ₹16,000 return",
    targetPrice: 16000,
    currentPrice: 14200,
    currency: "INR",
    status: "active",
    triggerMet: true,
    lastChecked: "25 mins ago",
    checkCadence: "Every 4 hours",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-02T04:45:00Z", price: 14200, availability: "8 seats left", sourceUrl: "https://srilankan.com", notes: "Target met! Direct flight 1h 25m" }
    ]
  },
  {
    id: "watch-sg-1",
    geography: "singapore-sin",
    type: "travel",
    entity: "SIN → DPS Non-Stop Flights (Dec 20–27)",
    criteria: "Direct flight on Singapore Airlines under S$320 return",
    targetPrice: 320,
    currentPrice: 280,
    currency: "SGD",
    status: "active",
    triggerMet: true,
    lastChecked: "10 mins ago",
    checkCadence: "Every 2 hours",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-03T06:30:00Z", price: 280, availability: "Available", sourceUrl: "https://singaporeair.com", notes: "Target met (S$280 < S$320)" }
    ]
  },
  {
    id: "watch-sg-2",
    geography: "singapore-sin",
    type: "price",
    entity: "Pixel 11 Compact (256GB)",
    criteria: "Price drop below S$950",
    targetPrice: 950,
    currentPrice: 899,
    currency: "SGD",
    status: "active",
    triggerMet: true,
    lastChecked: "20 mins ago",
    checkCadence: "Every 4 hours",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-03T05:45:00Z", price: 899, availability: "In Stock", sourceUrl: "https://store.google.com/sg", notes: "Target satisfied (S$899 < S$950)" }
    ]
  }
];

export const initialIntents: IntentData[] = [
  {
    id: "i-1",
    geography: "india-blr",
    category: "shopping",
    title: "Upgrade to Compact Flagship Smartphone",
    description: "Find a single-handed ergonomic phone with clean Android and <6.3\" display under ₹60,000.",
    status: "active",
    createdAt: "2026-08-10T00:00:00Z",
    expiresAt: "2026-10-20T00:00:00Z",
    daysRemaining: 48,
    progressPercent: 95
  },
  {
    id: "i-2",
    geography: "india-blr",
    category: "travel",
    title: "December Family Coastal Retreat in Sri Lanka",
    description: "Book non-stop direct flights from BLR and child-safe boutique beach villa in southern Sri Lanka.",
    status: "active",
    createdAt: "2026-08-15T00:00:00Z",
    expiresAt: "2026-10-24T00:00:00Z",
    daysRemaining: 52,
    progressPercent: 80
  },
  {
    id: "i-sg-1",
    geography: "singapore-sin",
    category: "travel",
    title: "December Family Coastal Escape from Changi",
    description: "Book direct non-stop flights from SIN (<3h flight duration) and boutique plunge-pool villa in Bali.",
    status: "active",
    createdAt: "2026-08-18T00:00:00Z",
    expiresAt: "2026-10-25T00:00:00Z",
    daysRemaining: 52,
    progressPercent: 88
  },
  {
    id: "i-sg-2",
    geography: "singapore-sin",
    category: "shopping",
    title: "Upgrade to Compact Titanium Device",
    description: "Secure compact flagship phone under 6.3\" display below S$950.",
    status: "active",
    createdAt: "2026-08-20T00:00:00Z",
    expiresAt: "2026-10-28T00:00:00Z",
    daysRemaining: 55,
    progressPercent: 92
  }
];

export const initialGroupCapsules: GroupCapsuleData[] = [
  {
    id: "cap-1",
    type: "trip",
    title: "December Coastal Family Retreat",
    hostUserId: "user-kranti",
    inviteCode: "DEC26-COASTAL",
    scopedDomains: ["travel"],
    members: [
      { userId: "user-kranti", name: "Kranti", avatar: "K", isPcpUser: true, contributedRuleIds: ["ctx-1", "ctx-3"], status: "joined" },
      { userId: "user-partner", name: "Partner", avatar: "P", isPcpUser: true, contributedRuleIds: ["ctx-p1"], status: "joined" }
    ],
    overlapHighlights: [
      "100% Match: Direct non-stop flight rule satisfied for all travellers",
      "Family safety: Private boutique villa with shallow pool and quiet zoning"
    ],
    fusedOpportunities: [allCards[0]],
    createdAt: "2026-08-20T10:00:00Z",
    expiresAt: "2026-12-28T00:00:00Z"
  }
];

export const initialContextItems: ContextItemData[] = [
  {
    id: "ctx-1",
    domain: "travel",
    type: "constraint",
    key: "Strict Direct Non-Stop Flight Rule",
    value: "Direct flights only for family travel; zero tolerance for transit layovers to eliminate transit fatigue",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.99,
    status: "active",
    origin: "user_edit",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-22T14:30:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-22T14:30:00Z",
    provenance: { provider: "User Direct Rule" },
  },
  {
    id: "ctx-2",
    domain: "books",
    type: "preference",
    key: "Architectural & Urbanism Literature",
    value: "Christopher Alexander pattern theory, humane city planning, timeless craft treatises",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.95,
    status: "active",
    origin: "imported",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "ChatGPT Import" },
  },
  {
    id: "ctx-3",
    domain: "events",
    type: "preference",
    key: "Acoustic Performing Arts Purity",
    value: "100% unamplified acoustic instruments; natural timber hall resonance; intimate hall capacity",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.94,
    status: "active",
    origin: "imported",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "Claude Memory" },
  },
  {
    id: "ctx-4",
    domain: "shopping",
    type: "constraint",
    key: "Phone Screen Ergonomics Limit",
    value: "Screen diagonal strictly under 6.3 inches for single-handed comfort; clean stock Android OS",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.96,
    status: "active",
    origin: "imported",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "ChatGPT Import" },
  }
];

// Aliases for default exports
export const initialPersona = indiaPersona;
export const initialCards = allCards.filter((c) => c.geography === "india-blr");
