import { CardData, ContextItemData, GroupCapsuleData, IntentData, PersonaArchetype, StoryPulse, WatchData } from '@/types';

export const initialPersona: PersonaArchetype = {
  title: "The Mindful Craftsperson & Quiet Explorer",
  tagline: "High Durability • Zero Transit Friction • Artisanal Coffee Rituals • Quiet Heritage",
  locationAnchor: "Bangalore, India",
  homeAirport: "BLR (Kempegowda Int'l)",
  familyComposition: "Married · 1 Child (7 years old)",
  dnaScores: {
    familySanctuary: 98,
    craftSovereignty: 96,
    minimalistHardware: 95,
    lowFrictionTravel: 94,
    specialtyCoffee: 92,
    culturalArts: 90,
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
      paragraph: "Your mornings begin with single-origin pour-over rituals, favoring anaerobic light/medium roasts with jasmine floral and stone-fruit notes. In physical hardware, you enforce strict tactile ergonomics: phone screens under 6.3 inches with clean OS, and ultralight full-frame camera gear under 500g.",
      tokenChips: [
        { token: "Anaerobic pour-over", ruleKey: "coffee_notes", impactSummary: "Matches micro-lot seasonal releases from Araku, Blue Tokai, and Subko." },
        { token: "Screens < 6.3 inches", ruleKey: "screen_size_limit", impactSummary: "Auto-flags compact flagships like Pixel 11 & Zenfone while filtering phablets." },
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

export const initialContextItems: ContextItemData[] = [
  // 1. My World & Family
  {
    id: "ctx-1",
    domain: "my-world",
    type: "fact",
    key: "Home City Anchor",
    value: "Bangalore, India (BLR departure point)",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 1.0,
    status: "active",
    origin: "imported",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "ChatGPT Import", evidence: "User confirmed primary home in Indiranagar, Bangalore" },
  },
  {
    id: "ctx-2",
    domain: "my-world",
    type: "relationship",
    key: "Family Structure",
    value: "Married with one 7-year-old daughter; prioritize calm family safety",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.98,
    status: "active",
    origin: "imported",
    explicitness: "explicit",
    sensitivity: "sensitive",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "Claude Memory", evidence: "Frequent mentions of family weekend rhythm and school schedules" },
  },

  // 2. Travel & Escapes
  {
    id: "ctx-3",
    domain: "travel",
    type: "constraint",
    key: "Strict Direct Non-Stop Flight Rule",
    value: "Direct flights only for family travel; zero tolerance for transit layovers to avoid transit fatigue",
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
    provenance: { provider: "User Direct Rule", evidence: "Added via Radar context refinement dialog" },
  },
  {
    id: "ctx-4",
    domain: "travel",
    type: "goal",
    key: "December Family Coastal Retreat",
    value: "6-day coastal villa retreat in Sri Lanka (Dec 20–27)",
    durability: "medium_lived",
    horizon: "active_short_term",
    expiryCountdown: "52 days remaining",
    confidence: 0.95,
    status: "active",
    origin: "user_answer",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-25T09:00:00Z",
    createdAt: "2026-08-15T12:00:00Z",
    updatedAt: "2026-08-25T09:00:00Z",
    provenance: { provider: "Voice Dictation", evidence: "Transcribed note: 'Look for calm beach stay in Galle for late Dec'" },
  },

  // 3. Shopping & Hardware
  {
    id: "ctx-5",
    domain: "shopping",
    type: "constraint",
    key: "Phone Screen Ergonomics Limit",
    value: "Screen diagonal strictly under 6.3 inches for single-handed comfort; stock/clean Android OS",
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
    provenance: { provider: "ChatGPT Import", evidence: "Multiple searches for compact flagships and grip ergonomics" },
  },
  {
    id: "ctx-6",
    domain: "shopping",
    type: "goal",
    key: "Pixel 11 Upgrade Intent",
    value: "Upgrade primary phone to compact flagship if price drops below ₹60,000",
    durability: "medium_lived",
    horizon: "active_short_term",
    expiryCountdown: "48 days remaining",
    confidence: 0.96,
    status: "active",
    origin: "user_edit",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-28T16:00:00Z",
    createdAt: "2026-08-10T11:00:00Z",
    updatedAt: "2026-08-28T16:00:00Z",
    provenance: { provider: "Active Tracker w-1", evidence: "Target price ₹60,000 set in Watching tab" },
  },

  // 4. Food & Specialty Coffee
  {
    id: "ctx-7",
    domain: "food-drink",
    type: "preference",
    key: "Specialty Coffee Flavor Profile",
    value: "Anaerobic fermented light & medium roasts; prominent jasmine floral and stone-fruit tasting notes",
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
    provenance: { provider: "ChatGPT Import", evidence: "Repeated order history analysis and brewing parameter inquiries" },
  },

  // 5. Interests & Craft
  {
    id: "ctx-8",
    domain: "interests",
    type: "preference",
    key: "Acoustic Theatre & Performing Arts",
    value: "Unamplified 200-seat acoustic theatre; natural resonance; intimate staging",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.90,
    status: "active",
    origin: "user_answer",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-21T18:00:00Z",
    createdAt: "2026-08-05T15:00:00Z",
    updatedAt: "2026-08-21T18:00:00Z",
    provenance: { provider: "Onboarding Quiz", evidence: "Selected preference for acoustic unamplified live performances" },
  },
  {
    id: "ctx-9",
    domain: "books",
    type: "preference",
    key: "Architectural & Urbanism Literature",
    value: "Christopher Alexander pattern theory, humane city planning, timeless craft treatises",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 0.92,
    status: "active",
    origin: "imported",
    explicitness: "explicit",
    sensitivity: "normal",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "Claude Memory", evidence: "Extensive book discussions on built environments and human scale" },
  },

  // 6. What Matters & Values
  {
    id: "ctx-10",
    domain: "what-matters",
    type: "value",
    key: "Data Privacy & Anti-Surveillance",
    value: "100% personal data sovereignty; zero ad tracking; local encryption",
    durability: "durable",
    horizon: "persistent_long_term",
    confidence: 1.0,
    status: "active",
    origin: "user_edit",
    explicitness: "explicit",
    sensitivity: "sensitive",
    lastConfirmedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    provenance: { provider: "Core Principle", evidence: "Sovereign privacy setting verified" },
  },
];

export const initialCards: CardData[] = [
  {
    id: "card-1",
    type: "coffee-harvest",
    originType: "proactive",
    domain: "food-drink",
    title: "Araku Micro-Lot Selection 24",
    subtitle: "Anaerobic Fermented Light Roast · 250g Whole Bean",
    summary: "Seasonal 40kg micro-lot release from Araku Highlands with distinct jasmine floral aroma, peach stone-fruit acidity, and honeyed finish.",
    whyNow: "Annual harvest released this morning at 100ft Road flagship. Limited to 120 bags total.",
    heroImage: "/images/hero_araku_coffee.jpg",
    imageAlt: "Artisan pour-over specialty coffee brewing in natural light",
    accentColor: "#C66E45",
    relevanceReason: [
      "Exact match: Anaerobic fermentation preference in Coffee Profile",
      "Flavor notes match: Jasmine floral & stone-fruit",
      "Local proximity: Indiranagar roastery 1.8km away"
    ],
    contextIds: ["ctx-7", "ctx-1"],
    intentIds: [],
    watchIds: ["watch-4"],
    relevanceScore: 0.96,
    freshnessScore: 0.98,
    confidenceScore: 0.95,
    actionabilityScore: 0.94,
    noveltyScore: 0.88,
    createdAt: "2026-09-02T08:30:00Z",
    status: "active",
    deepDive: {
      description: "Harvested at 1,100m elevation in the Eastern Ghats of Araku Valley, this micro-lot undergoes a strict 72-hour anaerobic carbonic maceration process. The cup reveals high clarity, tea-like lightness, delicate jasmine aromatics, and a juicy white peach sweetness on cooling.",
      keyHighlights: [
        "100% Arabica micro-lot (S795 & Selection 9 varietals)",
        "Anaerobic natural processing with temperature-controlled fermentation",
        "Roasted locally in Bangalore in small 6kg batches for peak freshness",
        "Roasted on 2026-09-01 (Optimal degassing window: Day 4–18)"
      ],
      specsOrDetails: [
        { label: "Origin", value: "Araku Valley, Andhra Pradesh (1,100m MSL)" },
        { label: "Process", value: "Anaerobic Carbonic Maceration (72h)" },
        { label: "Roast Level", value: "Light-Medium (Agtron 68/82)" },
        { label: "Tasting Notes", value: "Jasmine, White Peach, Raw Honey, Lime Zest" },
        { label: "Recommended Brew", value: "V60 / Origami dripper at 92°C, 1:16 ratio" },
        { label: "Availability", value: "40kg Micro-Lot (Only 82 bags remaining)" }
      ],
      pricingBreakdown: "₹850 for 250g nitrogen-flushed valve pouch (Complimentary local courier in Bangalore).",
      directActionUrl: "https://arakucoffee.in",
      directActionLabel: "Order Micro-Lot on Araku ↗"
    },
    sourceEvidence: [
      {
        title: "Araku Coffee Official Roastery Dispatch",
        url: "https://arakucoffee.in",
        retrievedAt: "2026-09-02T07:15:00Z",
        price: "₹850",
        baselinePrice: "₹850"
      }
    ],
    comparisons: [
      {
        name: "Blue Tokai Riverdale Estate N72",
        matchScore: 88,
        pros: "Strong stone-fruit sweetness, widely available",
        cons: "Slightly heavier body than desired tea-like clarity",
        price: "₹690"
      },
      {
        name: "Subko Ratnagiri Estate Lot #12",
        matchScore: 84,
        pros: "Exceptional anaerobic funky notes",
        cons: "Ships from Mumbai with 3-day transit lag",
        price: "₹920"
      }
    ],
    question: {
      id: "q-coffee",
      text: "How do you prefer your morning coffee bean rotation?",
      targetDomain: "food-drink",
      targetKey: "coffee_rotation",
      options: ["Stick to floral/tea-like roasts", "Explore experimental fermented naturals", "Mix with medium chocolate profiles"]
    }
  },

  {
    id: "card-2",
    type: "hardware-deal",
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
      description: "The Pixel 11 is the gold standard for single-handed tactile ergonomics in the modern flagship landscape. Featuring a 6.2-inch Actua display, titanium chassis with curved matte edges, Tensor G5 silicon, and Google's industry-leading computational photography system in an ultralight 172g frame.",
      keyHighlights: [
        "6.2-inch 120Hz LTPO OLED Display (Single-handed ergonomics)",
        "7 Years of guaranteed Android OS & security updates",
        "Dual 50MP + 48MP camera setup with true-to-life color calibration",
        "IP68 water resistance & durable Corning Gorilla Glass Armor"
      ],
      specsOrDetails: [
        { label: "Display Size", value: "6.2 inches (1080 x 2424 px, 2,700 nits peak)" },
        { label: "Dimensions & Weight", value: "149.8 x 70.8 x 8.2 mm · 172 grams" },
        { label: "Processor & RAM", value: "Google Tensor G5 (3nm) · 12GB LPDDR5X" },
        { label: "Storage", value: "256GB UFS 4.0" },
        { label: "Battery & Charging", value: "4,600 mAh · 30W Fast Charge + Qi2 Wireless" },
        { label: "Software", value: "Android 16 (Zero bloatware / ad-free)" }
      ],
      pricingBreakdown: "Base Price: ₹61,999. Less ₹5,500 instant discount on HDFC/ICICI cards = ₹56,499 (Final checkout price).",
      directActionUrl: "https://flipkart.com",
      directActionLabel: "View Deal on Flipkart ↗"
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
    ],
    priceHistory: [
      { date: "Aug 10", price: 68999, merchant: "Google Store" },
      { date: "Aug 18", price: 65999, merchant: "Flipkart" },
      { date: "Aug 26", price: 63499, merchant: "Amazon" },
      { date: "Sep 02", price: 56499, merchant: "Flipkart Flash" },
    ],
    comparisons: [
      {
        name: "Asus Zenfone 11 Compact",
        matchScore: 89,
        pros: "Lighter weight (168g), 3.5mm headphone jack",
        cons: "Only 2 years of OS updates vs 7 years for Pixel",
        price: "₹54,999"
      },
      {
        name: "Samsung Galaxy S25 Base",
        matchScore: 82,
        pros: "Brighter screen (3000 nits), Snapdragon chip",
        cons: "One UI bloatware & aggressive background process management",
        price: "₹67,999"
      }
    ],
    question: {
      id: "q-pixel",
      text: "Do you plan to trade in your current device for this purchase?",
      targetDomain: "shopping",
      targetKey: "trade_in_intent",
      options: ["Yes, trade in for extra value", "No, keep as backup device"]
    }
  },

  {
    id: "card-3",
    type: "travel-window",
    originType: "requested",
    requestedTriggerLabel: 'Triggered by active watch & intent: "Sri Lanka Direct Flights < ₹16,000"',
    domain: "travel",
    title: "Direct Flight Window: BLR → CMB",
    subtitle: "SriLankan Airlines Non-Stop · Dec 20–27 Holiday",
    summary: "Direct flights for your exact 6-day family holiday window dropped to ₹14,200 return (satisfying your strict no-layovers constraint and <₹16,000 price watch).",
    whyNow: "Airline opened inventory bucket for festive week; flight duration is only 1h 25m.",
    heroImage: "/images/hero_srilanka_villa.jpg",
    imageAlt: "Serene coastal boutique villa pool in Sri Lanka",
    accentColor: "#24483F",
    relevanceReason: [
      "Strict Rule Satisfied: Non-stop flight (1h 25m direct, zero transit stops)",
      "Price Target Met: ₹14,200 vs ₹16,000 threshold",
      "Dates Align: Matches active intent for Dec 20–27 coastal family retreat"
    ],
    contextIds: ["ctx-1", "ctx-2", "ctx-3", "ctx-4"],
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
        { label: "Transit Friction", value: "Zero layovers · Child-friendly departure times" },
        { label: "Total Price (Return)", value: "₹14,200 per adult / ₹11,800 child" }
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
      { date: "Aug 29", price: 16500, merchant: "MakeMyTrip" },
      { date: "Sep 02", price: 14200, merchant: "SriLankan Direct" },
    ],
    comparisons: [
      {
        name: "IndiGo via Chennai (1 Stop)",
        matchScore: 42,
        pros: "₹12,400 (Slightly cheaper)",
        cons: "Violates non-stop rule: 4h 50m total transit with layover in MAA",
        price: "₹12,400"
      },
      {
        name: "Air India Express Direct",
        matchScore: 78,
        pros: "Direct non-stop flight",
        cons: "Red-eye schedule (02:40 AM departure) exhausting for 7yo child",
        price: "₹13,800"
      }
    ],
    question: {
      id: "q-travel-villa",
      text: "Would you like PCP to surface secluded boutique villas in Galle with private plunge pools?",
      targetDomain: "travel",
      targetKey: "villa_style",
      options: ["Yes, beachfront boutique villas", "Yes, inland tea estate bungalows", "Not needed right now"]
    }
  },

  {
    id: "card-4",
    type: "book-release",
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
      "Local Indie Bookstore: Sourced from Champaca Indiranagar/Vasanth Nagar network",
      "Durable print edition matching lifelong library curation"
    ],
    contextIds: ["ctx-9", "ctx-10"],
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
      description: "Christopher Alexander's timeless masterpiece presents 253 patterns for human-scale design, from the organization of entire towns to the exact placement of window seats and courtyards. Essential reading for systems thinkers, craftsmen, and creators seeking durable patterns in an era of transient digital noise.",
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
    ],
    comparisons: [
      {
        name: "The Timeless Way of Building (Paperback)",
        matchScore: 86,
        pros: "More concise introduction to Alexander's philosophy",
        cons: "Does not contain the practical 253 architectural pattern index",
        price: "₹1,850"
      }
    ],
    question: {
      id: "q-books",
      text: "Would you like notifications when Champaca hosts author discussions on architecture?",
      targetDomain: "books",
      targetKey: "book_events",
      options: ["Yes, for architecture & design events", "Only for rare book arrivals"]
    }
  },

  {
    id: "card-5",
    type: "cultural-event",
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
    contextIds: ["ctx-8", "ctx-1"],
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
      description: "An evening dedicated to pure acoustic resonance. Masters perform traditional Hindustani and classical Spanish ragas without any PA systems, speakers, or microphones. The acoustic architecture of Ranga Shankara's timber auditorium provides pure, uncolored harmonic warmth.",
      keyHighlights: [
        "100% Unamplified live acoustic performance (0% synthetic EQ)",
        "Strict 200-seat intimate hall capacity",
        "90-minute recital with no interval intermission disruption",
        "Followed by post-performance open discussion with the musicians"
      ],
      specsOrDetails: [
        { label: "Artists", value: "Pt. Debanjan Bhattacharjee (Sarod) & Lucas Harris (Guitar)" },
        { label: "Venue", value: "Ranga Shankara, JP Nagar 2nd Phase, Bangalore" },
        { label: "Date & Time", value: "Saturday, Sep 06 · 7:00 PM – 8:30 PM" },
        { label: "Seating", value: "Open seating · First 5 rows recommended" },
        { label: "Dress Code", value: "Smart Casual / Mindful" }
      ],
      pricingBreakdown: "₹600 per pass (Direct venue ticketing).",
      directActionUrl: "https://rangashankara.org",
      directActionLabel: "Reserve Tickets on Ranga Shankara ↗"
    },
    sourceEvidence: [
      {
        title: "Ranga Shankara Cultural Schedule",
        url: "https://rangashankara.org",
        retrievedAt: "2026-09-02T03:00:00Z",
        price: "₹600",
        baselinePrice: "₹600"
      }
    ],
    comparisons: [
      {
        name: "Chowdiah Memorial Hall Fusion Concert",
        matchScore: 56,
        pros: "Larger grand violin auditorium",
        cons: "Heavy PA amplification with high ambient reverberation",
        price: "₹1,200"
      }
    ]
  },

  {
    id: "card-6",
    type: "camera-watch",
    originType: "proactive",
    domain: "interests",
    title: "Sony A7CR Compact (Silver)",
    subtitle: "61MP Full-Frame Mirrorless Body · Only 515g",
    summary: "New authorized bundle includes the 40mm F/2.5 G compact prime lens at an effective ₹28,000 package savings for the lightest travel camera setup.",
    whyNow: "Festival promo bundle unlocked with 3-year extended warranty and zero-cost EMI.",
    heroImage: "/images/hero_sonya7cr_camera.jpg",
    imageAlt: "Compact lightweight mirrorless camera with prime lens on linen strap",
    accentColor: "#24483F",
    relevanceReason: [
      "Constraint match: Ultralight travel photography body (< 520g)",
      "High resolution 61MP sensor for architectural and street detail",
      "Compact pancake prime lens matching minimal carry philosophy"
    ],
    contextIds: ["ctx-5", "ctx-10"],
    intentIds: [],
    watchIds: ["watch-3"],
    relevanceScore: 0.91,
    freshnessScore: 0.89,
    confidenceScore: 0.94,
    actionabilityScore: 0.90,
    noveltyScore: 0.86,
    createdAt: "2026-09-01T18:00:00Z",
    status: "active",
    deepDive: {
      description: "The Sony A7CR combines a full-frame 61MP back-illuminated Exmor R sensor with dedicated AI autofocus processing in a rangefinder-style body weighing just 515 grams with battery. Paired with the compact 40mm F/2.5 G prime, it creates the ultimate street, architecture, and family travel kit without back fatigue.",
      keyHighlights: [
        "61.0 Megapixel Full-Frame BSI Sensor with 15 stops dynamic range",
        "AI-driven Real-time Recognition autofocus for people, animals, vehicles",
        "7.0-stop 5-axis in-body optical image stabilization (IBIS)",
        "Includes official aluminum bottom extension grip and 3-year warranty"
      ],
      specsOrDetails: [
        { label: "Sensor", value: "61MP Full-Frame Exmor R CMOS" },
        { label: "Weight", value: "515g (Body + Battery + SD Card)" },
        { label: "Lens Bundle", value: "Sony FE 40mm F2.5 G Compact Prime (173g)" },
        { label: "Total Carry Weight", value: "688g (Complete camera + lens)" },
        { label: "Video", value: "4K 60p 10-bit 4:2:2 with S-Cinetone" },
        { label: "Warranty", value: "2 + 1 Year Sony India Official Warranty" }
      ],
      pricingBreakdown: "₹2,49,990 bundle (Saves ₹28,000 compared to separate body and lens purchase).",
      directActionUrl: "https://sony.co.in",
      directActionLabel: "View Bundle on Sony Center ↗"
    },
    sourceEvidence: [
      {
        title: "Sony Center Official India Store",
        url: "https://sony.co.in",
        retrievedAt: "2026-09-01T17:00:00Z",
        price: "₹2,49,990",
        baselinePrice: "₹2,78,000",
        discountPercent: 10
      }
    ],
    comparisons: [
      {
        name: "Fujifilm X100VI",
        matchScore: 84,
        pros: "Built-in optical viewfinder, classic film simulations",
        cons: "Fixed 23mm lens (no interchangeability), severe waitlist shortage",
        price: "₹1,89,999"
      },
      {
        name: "Leica Q3",
        matchScore: 79,
        pros: "Summilux 28mm f/1.7 lens, prestige build",
        cons: "Over 3x higher cost (₹5,90,000) and heavier 743g body",
        price: "₹5,90,000"
      }
    ]
  }
];

export const initialStories: StoryPulse[] = [
  {
    id: "story-1",
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
    cardId: "card-2",
    actionUrl: "https://flipkart.com",
    actionLabel: "View Deal (₹56,499)"
  },
  {
    id: "story-2",
    title: "☕ Micro-Lot Harvest",
    badge: "Proactive Discovery",
    tagline: "Araku 40kg seasonal lot released at 100ft Rd",
    timeAgo: "4h ago",
    heroImage: "/images/hero_araku_coffee.jpg",
    accentColor: "#C66E45",
    takeaways: [
      "Anaerobic carbonic maceration with delicate jasmine florals",
      "Matches your single-origin light roast preference",
      "Only 82 bags remaining at Indiranagar roastery"
    ],
    cardId: "card-1",
    actionUrl: "https://arakucoffee.in",
    actionLabel: "Reserve Bag (₹850)"
  },
  {
    id: "story-3",
    title: "✈️ Flight Window",
    badge: "Tracked Alert",
    tagline: "BLR → CMB direct flights dropped to ₹14,200",
    timeAgo: "6h ago",
    heroImage: "/images/hero_srilanka_villa.jpg",
    accentColor: "#24483F",
    takeaways: [
      "Direct non-stop flight (1h 25m gate-to-gate)",
      "Zero layovers eliminating transit fatigue with 7yo child",
      "Exact dates match your Dec 20–27 coastal family intent"
    ],
    cardId: "card-3",
    actionUrl: "https://srilankan.com",
    actionLabel: "Book Flights (₹14,200)"
  },
  {
    id: "story-4",
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
    cardId: "card-4",
    actionUrl: "https://champaca.in",
    actionLabel: "Reserve at Bookstore"
  },
  {
    id: "story-5",
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
    cardId: "card-5",
    actionUrl: "https://rangashankara.org",
    actionLabel: "Reserve Passes (₹600)"
  }
];

export const initialWatches: WatchData[] = [
  {
    id: "watch-1",
    type: "price",
    entity: "Pixel 11 (256GB, Obsidian)",
    criteria: "Price drop below ₹60,000 (Compact screen < 6.3\")",
    targetPrice: 60000,
    currentPrice: 56499,
    currency: "INR",
    status: "active",
    triggerMet: true,
    lastChecked: "12 mins ago",
    checkCadence: "Every 2 hours",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-02T06:00:00Z", price: 56499, availability: "In Stock", sourceUrl: "https://flipkart.com", notes: "Target satisfied (₹56,499 < ₹60,000)" },
      { timestamp: "2026-08-30T10:00:00Z", price: 63499, availability: "In Stock", sourceUrl: "https://amazon.in", notes: "Standard price" },
      { timestamp: "2026-08-20T08:00:00Z", price: 68999, availability: "In Stock", sourceUrl: "https://store.google.com", notes: "Launch MSRP" },
    ]
  },
  {
    id: "watch-2",
    type: "travel",
    entity: "BLR → CMB Return Flights (Dec 20–27)",
    criteria: "Direct non-stop flight under ₹16,000 return per adult",
    targetPrice: 16000,
    currentPrice: 14200,
    currency: "INR",
    status: "active",
    triggerMet: true,
    lastChecked: "25 mins ago",
    checkCadence: "Every 4 hours",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-02T04:45:00Z", price: 14200, availability: "8 seats left", sourceUrl: "https://srilankan.com", notes: "Target met! Direct flight 1h 25m" },
      { timestamp: "2026-08-28T14:00:00Z", price: 17800, availability: "Available", sourceUrl: "https://srilankan.com", notes: "Above target" },
    ]
  },
  {
    id: "watch-3",
    type: "product",
    entity: "Sony A7CR Full-Frame Compact Body",
    criteria: "Bundle with 40mm or 24mm compact prime under ₹2,50,000",
    targetPrice: 250000,
    currentPrice: 249990,
    currency: "INR",
    status: "active",
    triggerMet: true,
    lastChecked: "1 hour ago",
    checkCadence: "Daily",
    notificationMode: "digest",
    observations: [
      { timestamp: "2026-09-01T17:00:00Z", price: 249990, availability: "In Stock", sourceUrl: "https://sony.co.in", notes: "Promotional bundle unlocked" }
    ]
  },
  {
    id: "watch-4",
    type: "availability",
    entity: "Araku Valley Anaerobic Micro-Lot",
    criteria: "Annual 40kg seasonal harvest release in Indiranagar roastery",
    currency: "INR",
    status: "active",
    triggerMet: true,
    lastChecked: "30 mins ago",
    checkCadence: "Daily",
    notificationMode: "important_only",
    observations: [
      { timestamp: "2026-09-02T07:15:00Z", availability: "82 bags left", sourceUrl: "https://arakucoffee.in", notes: "Harvest released this morning" }
    ]
  }
];

export const initialIntents: IntentData[] = [
  {
    id: "i-1",
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
    category: "travel",
    title: "December 6-Day Family Coastal Retreat in Sri Lanka",
    description: "Book non-stop direct flights from BLR and child-safe boutique beach villa in southern Sri Lanka.",
    status: "active",
    createdAt: "2026-08-15T00:00:00Z",
    expiresAt: "2026-10-24T00:00:00Z",
    daysRemaining: 52,
    progressPercent: 80
  }
];

export const initialGroupCapsules: GroupCapsuleData[] = [
  {
    id: "cap-1",
    type: "trip",
    title: "December Sri Lanka Coastal Retreat",
    hostUserId: "user-kranti",
    inviteCode: "SL-DEC26-FUSE",
    scopedDomains: ["travel", "food-drink"],
    members: [
      { userId: "user-kranti", name: "Kranti", avatar: "K", isPcpUser: true, contributedRuleIds: ["ctx-1", "ctx-2", "ctx-3"], status: "joined" },
      { userId: "user-priya", name: "Priya (Partner)", avatar: "P", isPcpUser: true, contributedRuleIds: ["ctx-p1", "ctx-p2"], status: "joined" },
      { userId: "user-rohit", name: "Rohit & Nina", avatar: "R", isPcpUser: false, contributedRuleIds: ["ctx-r1"], status: "joined" }
    ],
    overlapHighlights: [
      "100% Match: Direct non-stop flight rule from BLR satisfied for all 4 travellers",
      "Family safety: Private 3-bedroom villa with gated plunge pool and shallow steps",
      "Dietary alignment: Coastal seafood & vegetarian Sri Lankan curry selections"
    ],
    fusedOpportunities: [initialCards[2]], // Direct flight
    createdAt: "2026-08-20T10:00:00Z",
    expiresAt: "2026-12-28T00:00:00Z"
  },
  {
    id: "cap-2",
    type: "dining",
    title: "Table for 4 — Indiranagar Weekend",
    hostUserId: "user-kranti",
    inviteCode: "DINING-BLR-88",
    scopedDomains: ["food-drink"],
    members: [
      { userId: "user-kranti", name: "Kranti", avatar: "K", isPcpUser: true, contributedRuleIds: ["ctx-7"], status: "joined" },
      { userId: "user-anand", name: "Anand", avatar: "A", isPcpUser: true, contributedRuleIds: ["ctx-a1"], status: "joined" },
      { userId: "user-meera", name: "Meera", avatar: "M", isPcpUser: true, contributedRuleIds: ["ctx-m1"], status: "joined" },
      { userId: "user-dev", name: "Dev", avatar: "D", isPcpUser: false, contributedRuleIds: ["ctx-d1"], status: "pending" }
    ],
    overlapHighlights: [
      "Commute radius: Within 3km of 100ft Road Indiranagar",
      "Acoustic comfort: Background decibels < 65dB (Conversational clarity)",
      "Dietary Sweet Spot: Sourdough wood-fired pizzas, farm-to-table salads, artisanal pour-overs"
    ],
    fusedOpportunities: [
      {
        ...initialCards[0],
        id: "card-dining-fused",
        title: "Botanical Courtyard Table for 4",
        summary: "Curated farm-to-table dining space satisfying 100% of the group's noise, dietary, and distance constraints."
      }
    ],
    createdAt: "2026-08-30T14:00:00Z",
    expiresAt: "2026-09-08T00:00:00Z"
  },
  {
    id: "cap-3",
    type: "gifting",
    title: "Kranti's Birthday Wishlist Capsule",
    hostUserId: "user-kranti",
    inviteCode: "GIFT-KRANTI-2026",
    scopedDomains: ["books", "food-drink", "shopping"],
    members: [
      { userId: "user-kranti", name: "Kranti", avatar: "K", isPcpUser: true, contributedRuleIds: ["ctx-5", "ctx-7", "ctx-9"], status: "joined" },
      { userId: "user-priya", name: "Priya", avatar: "P", isPcpUser: true, contributedRuleIds: [], status: "joined" }
    ],
    overlapHighlights: [
      "Zero-Awkwardness: Sourced directly from unfulfilled wishes and active coffee/book interests",
      "Direct 1-click verified buy links with local stock availability",
      "Privacy-protected: Health and financial rules strictly excluded"
    ],
    fusedOpportunities: [initialCards[0], initialCards[3]],
    createdAt: "2026-08-25T11:00:00Z",
    expiresAt: "2026-09-30T00:00:00Z"
  }
];
