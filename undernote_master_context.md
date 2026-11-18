# Undernote: Master Project Blueprint & Architecture Handbook
**Version**: 2.0 (Production Architecture Edition)  
**Date**: September 2026  
**Document Purpose**: Definitive project context, first principles, data sourcing, storage architecture, and algorithmic design for continuing development in any new thread or environment.

---

## 1. Executive Summary & First Principles

### 1.1 What is Undernote?
**Undernote** is a **Sovereign Personal Context Platform (PCP)** and **Proactive Discovery Engine**. Its mission statement is:  
> *"A world in tune with you. Proactive silence over noisy spam."*

Every person has deep, unspoken standards, quiet rituals, ethical boundaries, and seasonal projects—what they read, how they travel, how they eat, what materials they touch, and how they protect their peace. Today, this context is scattered across hundreds of conversations with LLMs (ChatGPT, Claude, Gemini) or trapped in their heads.

Meanwhile, the modern commercial internet has degraded into:
* **Algorithmic ad-feeds & engagement loops** designed to capture attention, not honor taste.
* **Affiliate SEO pollution** (TripAdvisor, Yelp, Forbes Vetted, Wirecutter) that buries authentic indie creators, quiet sanctuaries, and small-batch makers under generic corporate listicles.

Undernote bridges this gap. It extracts and unifies what AI already knows about a user’s life, normalizes it into **sovereign, user-editable "Life Tokens"**, and autonomously scouts the open web to match that context against real-world books, objects, events, and places—presenting them with calm, ambient elegance.

---

### 1.2 The Core Philosophical Tenets
1. **Proactive Silence Over Noisy Spam**: The engine does not send push notifications unless an extraordinary, time-scarce alignment occurs (max 1 per 48 hours). 90% of discoveries wait quietly in the user's feed for when they choose to sit down with a cup of tea.
2. **Zero Algorithmic Surveillance**: Undernote never sells user data, ad placements, or sponsored recommendations. The user owns their context profile completely.
3. **Emergent Human Curiosity Over Rigid Categories**: Humans do not live in drop-down menus. Whether a user is obsessed with *heirloom seed preservation, somatic therapy and polyvagal theory, Japanese joinery hand-tools, rare vinyl pressings, or architectural theory monographs*, the engine handles their world seamlessly without hardcoded niche silos.
4. **Respect for Hard Dealbreakers**: If a user has a non-negotiable rule (100% vegetarian, non-stop direct flights only, maximum budget), a candidate with a 99% aesthetic match that violates that rule is **instantly discarded**. Zero compromises.
5. **Timelessness Over Publication Recency**: A 1977 monograph by Christopher Alexander or a 1920s Bauhaus design text is not "stale." An evergreen masterpiece a user has never seen is 100% fresh to them.

---

## 2. The Grammar of Life Context: How User Context is Modeled

### 2.1 The Rejection of Rigid Ontologies
In early iterations, the system made the classic engineering mistake of building a rigid, topical ontology (e.g. creating specific categories for "flights", "coffee", or "screen sizes"). 

**Why rigid ontologies fail for human life**:
* Human preferences are deeply cross-cutting. For example: *"A quiet morning on the balcony with zero notification chimes"* is simultaneously a technology rule, a home architecture rule, a health boundary, and a daily ritual. Forcing it into a single folder breaks its meaning.
* Predefined taxonomies inevitably reflect the biases of the engineers who wrote them, excluding infinite valid human pursuits.

### 2.2 The Solution: Emergent Topics + Rigid Behavioral Mechanics
Undernote solves this by separating **Topic** from **Behavioral Physics**:
* **The Topic is Free-Form & Emergent**: Handled via natural language and vector embeddings (infinite breadth).
* **The Behavior is Strictly Structured**: Handled via relational database rules (Veto vs. Compass, Bedrock vs. Horizon).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ANATOMY OF A LIFE TOKEN                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. THE STATEMENT (Free-form Natural Language + Vector Embedding)       │
│    • "Prefers unamplified acoustic performances and chamber recitals"  │
│    • "Strictly non-stop direct flights under 4 hours for family trips" │
│    • "Deeply drawn to natural plant dyes, hand-thrown ceramics, wood"  │
├────────────────────────────────────────────────────────────────────────┤
│ 2. THE VALENCE (How the Engine Enforces It)                            │
│    • HARD DEALBREAKER (Veto): Must be 100% satisfied; failure = 0      │
│    • SOFT COMPASS (Affinity): Contributes positive points to score     │
├────────────────────────────────────────────────────────────────────────┤
│ 3. THE DURABILITY / HORIZON (Temporal Lifecycle)                       │
│    • BEDROCK (Permanent): Core ethics, dietary laws, enduring taste   │
│    • ACTIVE HORIZON (Seasonal): Trip in Dec, nursery school search     │
│    • TRANSIENT: Temporary curiosity                                    │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.3 The User Experience: Transparency & Sovereign Control
On the user's **"Me" screen**, their world is represented not as an amorphous black-box prompt, but as discrete, editable **Life Tokens** organized into:
* **The Lookbook**: 6–8 visual tiles capturing their aesthetic ethos and core archetypes (e.g. *Systems Architect, Tactile Craftsperson, Quiet Naturalist*).
* **Bedrock Tokens**: Long-term non-negotiables and foundational taste boundaries.
* **Active Horizons**: What they are actively planning or researching right now. Users can toggle horizons on/off, edit budget ceilings, or archive projects with a single tap.

---

## 3. Data Sourcing Universe & Autonomous Ingestion (Part 1)

Undernote does not build specialized crawlers for single industries. It leverages the universal open web protocols that already power the internet.

### 3.1 The 5 Universal Real-World Entity Archetypes
Every human curiosity maps to five real-world entity types:
1. **Written Knowledge & Ideas**: Books, monographs, essays, academic papers, literary magazines.
2. **Objects & Implements**: Tools, garments, pantry items, audio gear, instruments.
3. **Live Gatherings & Events**: Salons, recitals, workshops, tastings, retreats.
4. **Spatial Sanctuaries**: Quiet parks, botanical gardens, studios, architectural landmarks.
5. **Makers & Collectives**: Independent artisans, research labs, small-batch studios.

---

### 3.2 Universal Zero-Auth Web Protocols
Over 80% of artisan and cultural discovery requires zero custom scrapers:

1. **`schema.org` (JSON-LD / Microdata / RDFa)**:
   * Embedded across 50%+ of all websites.
   * A single universal extractor normalizes `Product`, `Event`, `Place`, `Book`, `Article`, `Course`, and `Recipe` into structured Undernote cards with verified prices, coordinates, dates, and author/maker data.
2. **Shopify Storefronts Protocol (`/products.json`)**:
   * Thousands of independent makers—from heirloom seed banks to heritage denim tailors and specialty roasters—expose their entire catalog at `/products.json`.
   * **Sub-50ms Delta Ingestion via `ETag`**: Undernote sends `If-None-Match: <ETag>`. If no drop or price change occurred, the server returns `HTTP 304 Not Modified` (0 bytes payload). Monitoring thousands of stores costs virtually $0 in compute.
3. **WooCommerce Public Store API (`/wp-json/wc/store/v1/products`)**:
   * Powers millions of self-hosted artisan producers and small publishers.
   * Completely open and unauthenticated; returns real-time inventory, pricing, tags, and variants.
4. **Open Syndication (RSS 2.0 / Atom 1.0 / JSON Feed / WebSub)**:
   * The open web's publishing fabric for Substack newsletters, independent journals, and venue calendars. WebSub pushes updates to Undernote via webhooks the instant an author publishes.
5. **Temporal Calendaring (iCalendar / ICS — RFC 5545)**:
   * Universal format for cultural calendars and workshops. Native recurrence rules (`RRULE`) allow the engine to compute event schedules without polling the origin server.

---

### 3.3 Autonomous Neural Search & Indie Web Discovery
How Undernote discovers obscure creators, clinics, and sanctuaries when it doesn't already know their URLs:

1. **Exa.ai (Neural Vector Web Search) — Primary Scout**:
   * Searches by vector meaning/statement rather than keyword matching.
   * **The Breakthrough Filter: `category: "personal site"`**: Strips corporate aggregators, directories, and corporate portals, isolating personal digital gardens, artisan journals, and maker portfolios ($7.00/1k searches).
2. **Brave Search API (Independent Index + Local POI)**:
   * Autonomous 30B+ page crawler (zero Google/Bing dependency).
   * Native `Accept: text/markdown` returns LLM-ready semantic chunks.
   * **Local POI API**: Index of 200M+ global physical places (hours, geocoordinates, price tiers) at $5.00/1k queries (**6x cheaper than Google Places**).
3. **Marginalia Search & Wiby**:
   * Open-source search engines that deliberately index only text-heavy, non-commercial blogs and indie sites while rejecting ad-tech and JavaScript trackers (Free / ~$1.00/1k).
4. **The "Million Short" Filtering Technique (Tranco Top 100k)**:
   * Undernote maintains an in-memory blocklist of the top 100,000 commercial domains (TripAdvisor, Yelp, Forbes Vetted, Medium). Automatically dropping these surfaces the true long-tail web.
5. **Tavily API (`/extract`)**:
   * Purpose-built for AI agents. Converts up to 20 candidate URLs into clean, ad-free Markdown simultaneously ($5–$8/1k).

---

### 3.4 Planetary Public Knowledge Graphs & Open Databases
1. **Spatial Sanctuaries: OpenStreetMap (OSM) & Overpass API**:
   * 100% free global geospatial knowledge graph.
   * Uses Overpass QL to query semantic tags: `craft=pottery`, `leisure=garden`, `leisure=quiet_zone`, `shop=books`, `historic=archaeological_site`, `amenity=library`.
2. **Civilization & Lineage: Wikidata SPARQL Query Service**:
   * 115M+ structured entities. Query architectural vernaculars (Brutalism, Bauhaus), historical craft lineages, ancient instruments, and author bibliographies.
3. **Literature & Non-Fiction: OpenLibrary REST & Google Books API**:
   * Comprehensive global coverage across architecture, philosophy, science, and poetry.
   * OpenLibrary: 100% free covers API and subject browsing. Google Books: 1k–100k free req/day.
4. **Science & Mental Health: OpenAlex API (250M+ Research Papers)**:
   * Open access index covering cognitive science, psychology, somatic therapy, and ecology.
   * Free "polite pool" access (`mailto=...`), abstract reconstruction, and direct Open Access PDF links.
5. **Sound, Cinema & Gatherings**:
   * **TMDb + JustWatch**: Streaming availability for documentaries and international films (MUBI, Criterion Channel).
   * **MusicBrainz & Discogs**: Vinyl pressings, acoustic recordings, independent labels.
   * **Lu.ma & Ticketmaster**: Lu.ma iCal feeds for intimate salons; Ticketmaster for classical and symphony halls.
6. **Ecology & Food**:
   * **iNaturalist**: Real-time biodiversity observations (flora, fungi, wildlife).
   * **Open Food Facts**: 3M+ products with ingredient transparency and certifications.

---

### 3.5 Web Crawling & Scraping APIs: The Landscape Evaluated
When crawling arbitrary websites that do not expose clean feeds, Undernote routes requests across a tiered suite:

| Tool | Category | Pricing | Strengths | Best Use in Undernote |
| :--- | :--- | :--- | :--- | :--- |
| **Crawl4AI** | Open-Source Python Async | **$0.00 (Free OSS)** | **Fit Markdown (-90% noise)**, BM25 filtering, Playwright async | **Primary Workhorse (75% of web)** for bookstores, blogs, makers |
| **Firecrawl API** | AI-First Cloud Crawler | $19–$83/mo | Clean Markdown, Zod JSON schema, Sitemap mapping | Deep discovery crawls and structured page extraction |
| **ZenRows** | Scraping Unblocker API | $0.93–$1.60 / 1k | **Turnstile & DataDome bypass**, pay-per-success | E-commerce targets and price watches |
| **Bright Data** | Web Unlocker / Browser | ~$3.00 / 1k | Gold standard for Kasada, DataDome v4+, 72M residential IPs | Flight pricing and complex travel aggregators |
| **Apify Platform** | Serverless Actor Marketplace | ~$2.00 / 1k | Pre-built actors for Instagram, Google Maps, Airbnb | Walled gardens: Instagram announcements, local venues |
| **Stagehand + Steel** | Agent Browser Automation | ~$0.12 / hr | Self-healing selectors, natural language actions | Autonomous multi-step checkout verification |

---

## 4. Storage, Databases & Lifecycle Architecture (Part 2)

### 4.1 The "Zero-DOM" Rule (Preventing Storage Ballooning)
* **The Anti-Pattern**: Storing raw HTML or full DOM snapshots (1.5MB–4MB per page) causes databases to balloon from 500MB to 50GB within weeks, degrading query performance and inflating backup costs.
* **The Undernote Rule**:
  1. Crawlers parse and extract structured data in memory.
  2. The raw HTML is **discarded immediately**.
  3. Only the cleaned, typed candidate record is saved to PostgreSQL.

**Record Size Breakdown**:
* `id` + `external_id`: ~60 bytes
* `title`, `subtitle`, `action_url`, `hero_image_url`: ~400 bytes
* `summary` (max 350 chars): ~350 bytes
* `extracted_attributes` (JSONB): ~300 bytes
* `embedding` (768-dim float vector for `pgvector`): ~3,072 bytes (3 KB)
* **Total Size per Opportunity**: **~4.2 KB**

**Real-World Storage Math**:
* 10,000 active global opportunities = **~42 MB**
* 50,000 active global opportunities = **~210 MB**
* 100,000 active global opportunities = **~420 MB**
* *Result*: The entire global candidate pool across all domains fits comfortably within a $15–$25/month database tier with massive headroom.

---

### 4.2 Canonical Global Pool (Zero Redundancy Across Users)
* Multiple users often share overlapping tastes (e.g. multiple people in Bangalore or London interested in unamplified theatre, sourdough fermentation, or architecture monographs).
* We **never** crawl or store opportunities per user. We maintain a single shared record in `candidate_opportunities`.
* User matches (`matched_opportunities`) are merely 150-byte junction links pointing to the canonical entity, containing only `user_id`, `candidate_id`, `score`, and personalized AI justification.

---

### 4.3 Database Selection: PostgreSQL + `pgvector` (Supabase / Neon)
* **Why NOT Standalone Vector DBs (Pinecone, Qdrant)?**:
  * **The "Dual-Write" Problem**: Storing vectors in Pinecone and metadata in Postgres creates synchronization lag, orphaned vectors, and requires two separate database queries for every match.
  * **Relational Power**: Undernote must evaluate hard Boolean SQL constraints (budget ceiling, non-stop flight rules `stops = 0`, dietary flags) alongside vector similarity in under 5ms. In Postgres + `pgvector`, a single optimized SQL query executes Tier 1 hard filtering and Tier 2 HNSW vector similarity in one execution plan.
* **Embedding Model: Gemini `text-embedding-004` (768 Dimensions)**:
  * 768 dimensions cut HNSW index RAM usage by **50%** compared to OpenAI's 1536-dim vectors.
  * Native synergy with Gemini 2.5 Flash justification layer (single SDK, single API billing).
  * Free tier handles 1,500 RPM; $0.02 per 1M tokens in production.

---

### 4.4 Automated Data Decay & TTLs
Not all data has the same lifespan. We enforce a 4-tier decay policy:

1. **Tier 1: Ephemeral (Events, Plays, Flash Deals, Limited Micro-Lots)**:
   * Has a mandatory `expires_at` timestamp.
   * **Hard Deleted** 24 hours after the event/drop passes.
2. **Tier 2: Seasonal (Workshops, seasonal menus, travel windows)**:
   * Soft archived (embeddings dropped) after 60–90 days.
3. **Tier 3: Evergreen (Books, permanent craft studios, quiet parks, landmarks)**:
   * Retained indefinitely; refreshed via periodic HTTP ETag checks.
4. **Tier 4: Sovereign Bedrock (User Context)**:
   * Permanent; editable only by the user.

**Partial HNSW Vector Indexing**:
```sql
CREATE INDEX idx_active_candidate_embedding 
ON candidate_opportunities 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64)
WHERE is_available = true 
  AND (expires_at IS NULL OR expires_at > NOW());
```
*Result*: Expired events and out-of-stock items become **instantly invisible** to the vector search engine without requiring manual index rebuilds.

**Preserving the "Personal Capsule"**:
* When a user clicks **"Save to Capsule"**, a permanent snapshot is copied to their `user_saved_capsules` table. Even when an event passes and is purged from the global candidate pool, their personal capsule retains their saved record, notes, and ticket links forever.

---

## 5. Background Job Cadences: Calm Batching vs. Real-Time Spikes

Real-time continuous crawling is an anti-pattern. It burns compute, risks IP bans on small indie sites, and floods users with anxious chimes. Undernote runs on three calm, predictable cadences:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 BACKGROUND JOB TOPOLOGY                                │
├─────────────────────┬───────────────────┬──────────────────────────┬───────────────────┤
│ Cadence             │ Frequency         │ What It Does             │ Data Sources      │
├─────────────────────┼───────────────────┼──────────────────────────┼───────────────────┤
│ 1. The Pulse Scout  │ Every 6 to 12 hrs │ Fast delta checks on     │ Shopify ETag 304, │
│    (Change Detection│ (08:00, 14:00,    │ active watches, price    │ Keepa price API,  │
│     & Flash Drops)  │  20:00 local time)│ drops, and micro-lots    │ Amadeus flight API│
├─────────────────────┼───────────────────┼──────────────────────────┼───────────────────┤
│ 2. Nightly Digest   │ Once daily        │ Deep semantic discovery, │ Exa.ai, Brave POI,│
│    (The Feed        │ (02:00 AM off-peak│ candidate vector matching│ OpenLibrary,      │
│     Replenisher)    │  user local time) │ & LLM justification runs │ TMDb, Lu.ma iCal  │
├─────────────────────┼───────────────────┼──────────────────────────┼───────────────────┤
│ 3. Weekly Synthesis │ Once a week       │ Long-range horizon scans,│ OpenAlex papers,  │
│    (The Sunday Brief│ (Sunday morning   │ seasonal retreat planning│ OSM quiet spots,  │
│     & Horizon Scan) │  07:00 AM)        │ and taste drift updates  │ Wikidata graphs   │
└─────────────────────┴───────────────────┴──────────────────────────┴───────────────────┘
```

**Key Efficiencies of Batching**:
* **50% Token Discount via Gemini Batch API**: Running overnight justifications via the Batch API cuts token costs in half.
* **Bulk Vector Embeddings**: Embeds candidates in batches of 100 in a single API round-trip.
* **Serverless Cost Profile**: Handled via Inngest or Vercel Cron. Workers spin up, process the batch in 45 seconds, write clean records, and shut down—costing pennies.

---

## 6. The Weightage, Scoring & Delivery Engine

### 6.1 The 3-Step Filter Hierarchy

```
1. THE BOUNCER AT THE DOOR (Binary Gatekeepers — Pass or Fail)
   • Hard dealbreakers (vegetarian diet, non-stop flight rule, strict budget ceiling, out of stock) 
     are treated as binary switches: 1 (Pass) or 0 (Fail).
   • If an item violates even ONE dealbreaker (e.g. 99% beautiful resort with a 5-hour layover), 
     it is instantly kicked out (Score = 0).

2. THE SCORECARD (100 Points for Surviving Candidates)
   • Semantic Taste Affinity (~25 pts): Vector cosine similarity with holistic lifestyle aesthetic.
   • Explicit Rule Fit (~25 pts): Direct match with named preferences (e.g. "anaerobic fermentation", "carbon steel").
   • Active Horizon Boost (~20 pts): Dynamic +25% to +40% multiplier for items matching what the user 
     is planning right now (e.g. December family trip).
   • Actionability & Trust (~15 pts): Verified direct URL, transparent price, in-stock confirmation.
   • Context-Aware Timeliness (~10 pts):
     - Time-decaying items (events, drops): Points decay as deadline approaches.
     - Evergreen items (books, landmarks): Points decay based on when Undernote last showed it to this user 
       (a 50-year-old book they have never seen is 100% fresh!).
   • Novelty & Domain Diversity (~5 pts): Anti-fatigue dampener prevents showing 5 cards of the same domain in one week.

3. THE DELIVERY DECISION (Triage Cutoffs)
   • Score < 70 points: Silently discarded. Zero junk in the product.
   • Score 70 to 87 points (90% of discoveries): Staged quietly in the "Kept-Waiting" Reservoir 
     ("For You" Feed) with zero notification chimes.
   • Score ≥ 88 points + Urgency/Scarcity (10% of discoveries): High-Conviction Push Alert 
     (max 1 per 48 hours).
```

### 6.2 The Adaptive Feedback Learning Loop
The system sharpens its precision every time the user interacts with a card:
* **"Save to Personal Capsule"**: +15% weight boost to that maker/topic for 30 days; increments rule confidence.
* **"Dismiss Card"**: Suppresses entity; optional quick tag (*"Too expensive"*, *"Not my style"*) updates constraints.
* **Inline Calibration Answer**: Rule confidence jumps from inferred (`0.65`) to explicit (`1.0`), boosting matching weight by 1.4x.
* **Fatigue Damping**: If a domain is shown 4 times without interaction, it receives a -30% cooldown for 14 days, allowing other horizons to breathe.

---

## 7. Current Codebase State & Tech Stack

### 7.1 Implemented & Production-Deployed Tech Stack
* **Framework**: Next.js 15.5+ (App Router), React 19, TypeScript.
* **Styling & UI**: Tailwind CSS, Framer Motion, Canvas Confetti.
* **AI & Embeddings**: Google GenAI SDK (`@google/genai`), Gemini 2.5 Flash, Gemini `text-embedding-004`.
* **Hosting**: Vercel Serverless Edge Platform (`https://undernote.co/live`).

### 7.2 Directory & Prototype Map
```
src/
├── app/
│   ├── page.tsx             # Landing experience, Manifesto, Dual Horizon showcase
│   ├── import/page.tsx      # Multi-provider context import (ChatGPT, Claude, Gemini, Voice, Quiz)
│   ├── radar/page.tsx       # Primary "For You" discovery feed & Daily Pulse stories
│   ├── radar/[id]/page.tsx  # Deep-dive detail screen with contextual justifications & actions
│   ├── me/page.tsx          # Sovereign profile, Lookbook tiles, Bedrock vs Horizon rules
│   ├── watching/page.tsx    # Active price & availability watches ledger
│   ├── capsules/page.tsx    # Multi-player shared group capsules
│   └── data/page.tsx        # Sovereign context inspection & data export
├── components/              # Shell, navigation, cards, audio players, landing pillars
├── context/AppContext.tsx   # Global reactive state for cards, tokens, persona, toasts
└── lib/
    ├── gemini/synthesizer.ts# Multi-modal context synthesis engine
    ├── images/mediaResolver # High-res book cover (OpenLibrary) & OpenGraph image resolver
    └── ingestion/           # Early ingestion prototypes (Shopify, Books, Flights)
```

### 7.3 Recent Cleanup Accomplishments
* **Cleaned Product Terminology**: Completely eliminated legacy references to "Radar" across user-facing UI (renamed to "For You" / "Feed").
* **Purged Hardcoded Stereotypical Subtext**: Removed legacy prompt biases (e.g. `<6.3"` screen sizes, strict flight rules) across the hero section, voice card, landing pillars, and Gemini prompt templates.
* **Clipboard Truncation Fixed**: Added native plain-text clipboard extraction (`onPaste` + `navigator.clipboard.readText()`) and auto-expanding textareas to capture rich, multi-thousand-word AI export dumps without truncation.

---

## 8. Immediate Next Steps for the Next Thread

When continuing development in a new session, proceed with the following sequence:

1. **Phase 1: Database Setup & DDL Migration**:
   * Set up PostgreSQL + `pgvector` tables (`candidate_opportunities`, `user_context_rules`, `user_personas`, `matched_opportunities`, `user_saved_capsules`) with partial HNSW indexes.
2. **Phase 2: The Ingestion Worker Microservice**:
   * Implement the unauthenticated Shopify `/products.json` conditional fetcher (`ETag` caching) and OpenLibrary / Google Books resolver.
   * Connect Exa.ai (`category: "personal site"`) for automated indie web discovery.
3. **Phase 3: The 3-Step Matching & Scoring Engine**:
   * Implement the binary gatekeeper SQL filter, 6-dimension scoring formula, and Gemini 2.5 Flash batch justification generator.
4. **Phase 4: Inngest Background Cron Schedules**:
   * Wire up the 6-hour pulse check and 2:00 AM nightly replenisher jobs.

---
*End of Master Context Blueprint. Save this file to resume architectural or code implementation in any future thread.*
