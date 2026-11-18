# Undernote: Production Architecture & Discovery Engine
## Slide Deck Content for Internal Alignment (12 Slides)

---

### SLIDE 1: Title & Strategic Mission
**Slide Title**: Undernote: Architecture Blueprint for a Sovereign Personal Discovery Engine  
**Subtitle**: Moving from Client Prototype to a Self-Cleaning, Universal Discovery Platform  

**Slide Content & Talking Points**:
* **The Core Premise**: Undernote is a proactive personal context platform. It takes what AI already knows about a person’s deep tastes, bedrock constraints, and current life horizons, and turns it into a quiet, curated world of discoveries.
* **The Strategic Challenge**: How do we build an autonomous engine that discovers authentic, high-taste opportunities across *any* arbitrary human interest (gardening, somatic health, architecture, acoustic music, bespoke craft, literature)—without drowning in spam, without hardcoding narrow niches, and without burning thousands of dollars on cloud crawling or database bloat?
* **The 3 Pillars of This Architecture**:
  1. **Universal Sourcing & Discovery**: Open web protocols + neural indie search (finding un-SEO’d gems).
  2. **Lean Storage & Lifecycle Decay**: "Zero-DOM" data model, canonical shared entity pool, and automated garbage collection.
  3. **The Gatekeeper Weightage Engine**: Multi-dimensional scoring that respects hard dealbreakers, boosts active horizons, and treats timeless classics with the same reverence as fresh drops.

---

### SLIDE 2: The Core Shift: Universal Primitives vs. Category Traps
**Slide Title**: The Architectural Shift: Universal Discovery Over Narrow Niches  
**Subtitle**: Why Hardcoding "Coffee Roasters" or "Flight Rules" Was a Trap  

**Slide Content & Talking Points**:
* **The Mistake We Avoided**: In early tests, we leaned on specific test examples (anaerobic coffee, direct flights, compact screens). But hardcoding columns or scrapers for specific categories turns the engine into an inflexible vertical app.
* **The Reality of Human Curiosity**:
  * A user could be obsessed with *permaculture and heirloom tomato seeds*.
  * Another could be navigating *somatic therapy, polyvagal theory, and silent meditation retreats*.
  * Another could seek *Japanese joinery hand-tools, rare vinyl pressings, or Bauhaus typography monographs*.
* **The New Paradigm: Domain-Agnostic Entity Archetypes**:
  Every human interest maps to 5 universal real-world archetypes:
  1. **Written Knowledge & Ideas**: Books, monographs, essays, research papers, journals.
  2. **Objects & Implements**: Tools, pantry goods, garments, hardware, instruments.
  3. **Live Gatherings & Events**: Salons, recitals, workshops, tastings, retreats.
  4. **Spatial Sanctuaries**: Quiet parks, botanical gardens, studios, architectural landmarks.
  5. **Makers & Collectives**: Independent artisans, research labs, small-batch studios.
* **Key Takeaway**: We do not build "coffee crawlers" or "theatre scrapers." We build pipelines that ingest universal web protocols and let the user's sovereign context do the filtering.

---

### SLIDE 3: Universal Zero-Auth Web Protocols
**Slide Title**: The Open Web’s Nervous System: Universal Zero-Auth Protocols  
**Subtitle**: How >80% of Authentic Discovery Requires Zero Custom Scrapers  

**Slide Content & Talking Points**:
* **1. `schema.org` (JSON-LD / Microdata)**:
  * Embedded directly in HTML across 50%+ of all modern websites.
  * A single universal extractor normalizes `Product`, `Event`, `Place`, `Book`, `Article`, `Course`, and `Recipe` into structured Undernote cards.
  * Captures real-time price, coordinates, availability, dates, and author/maker with zero site-specific parsing code.
* **2. The Shopify Storefront Protocol (`/products.json`)**:
  * Thousands of independent makers—from heirloom seed banks to heritage denim tailors and specialty roasters—expose their entire catalog at `/products.json` and `/collections/.../products.json`.
  * **Sub-50ms Delta Ingestion via `ETag`**: We send `If-None-Match: <ETag>`. If no drop or price change occurred, the server returns `HTTP 304 Not Modified` (0 bytes payload). Monitoring thousands of stores costs virtually $0 in compute.
* **3. The WooCommerce Public Store API (`/wp-json/wc/store/v1/products`)**:
  * Powers millions of WordPress-based artisan producers and small publishers.
  * Completely open and unauthenticated; returns real-time inventory, pricing, tags, and variants.
* **4. Open Syndication (RSS 2.0 / Atom 1.0 / JSON Feed / WebSub)**:
  * The open web's publishing layer for Substack newsletters, design journals, and venue calendars.
  * WebSub (W3C standard) pushes updates to Undernote instantly via webhooks upon publication.
* **5. Temporal Calendaring (iCalendar / ICS — RFC 5545)**:
  * Universal format for cultural calendars, lecture series, and workshops.
  * Handles recurrence rules (`RRULE`) natively without polling the origin server.

---

### SLIDE 4: Autonomous Neural Search & Indie Web Discovery
**Slide Title**: Finding the Un-SEO'd Web: Semantic Discovery Engines  
**Subtitle**: How to Uncover Obscure Makers That Google Buries Under Commercial Spam  

**Slide Content & Talking Points**:
* **The Problem with Mainstream Search**:
  * Google and Bing prioritize high-domain-authority SEO farms, TripAdvisor listicles, Amazon affiliate roundups, and paid ads. Authentic small retreats, community seed banks, and studio potters are buried on page 10.
* **1. Exa.ai (Neural Vector Web Search) — Primary Scout**:
  * Searches by vector meaning/statement rather than keyword matching.
  * **The Breakthrough Filter: `category: "personal site"`**: Strips corporate aggregators, directories, and corporate portals, isolating personal digital gardens, artisan journals, and maker portfolios.
  * Auto-extracts clean Markdown directly ($7.00 / 1k searches).
* **2. Brave Search API (Independent Index + Local POI)**:
  * Autonomous 30B+ page crawler (zero Google/Bing dependency).
  * Native `Accept: text/markdown` returns LLM-ready semantic chunks.
  * **Local POI API**: Index of 200M+ global physical places (hours, geocoordinates, price tiers) at $5.00/1k queries (**6x cheaper than Google Places**).
* **3. Marginalia Search & Wiby (Pure Non-Commercial Indices)**:
  * Open-source search engines that deliberately index only text-heavy, non-commercial blogs and indie sites while rejecting ad-tech and JavaScript trackers.
* **4. The "Million Short" Filtering Technique (Tranco Top 100k)**:
  * Undernote maintains an in-memory blocklist of the top 100,000 commercial domains (TripAdvisor, Yelp, Forbes Vetted, Medium). Automatically dropping these surfaces the true long-tail web.
* **5. Tavily API (`/extract`)**:
  * Purpose-built for AI agents. Converts up to 20 candidate URLs into clean, ad-free Markdown simultaneously ($5–$8/1k).

---

### SLIDE 5: Planetary Public Knowledge Graphs & Open Databases
**Slide Title**: Planetary Knowledge Graphs: Universal Structured Databases  
**Subtitle**: Free, Open Global Repositories Across Culture, Nature, Science & Books  

**Slide Content & Talking Points**:
* **1. Spatial Sanctuaries: OpenStreetMap (OSM) & Overpass API**:
  * 100% free global geospatial knowledge graph.
  * Uses Overpass QL to query semantic tags: `craft=pottery`, `leisure=garden`, `leisure=quiet_zone`, `shop=books`, `historic=archaeological_site`, `amenity=library`.
  * Instantly locates quiet green spaces, independent workshops, and public courtyards anywhere in the world.
* **2. Civilization & Lineage: Wikidata SPARQL Query Service**:
  * 115M+ structured entities.
  * Query architectural vernaculars (Brutalism, Bauhaus), historical craft lineages, ancient instruments, and author bibliographies.
* **3. Literature & Non-Fiction: OpenLibrary REST & Google Books API**:
  * Comprehensive global coverage across architecture, philosophy, science, and poetry.
  * OpenLibrary: 100% free covers API and subject browsing. Google Books: 1k–100k free req/day.
* **4. Science & Mental Health: OpenAlex API (250M+ Research Papers)**:
  * Open access index covering cognitive science, psychology, somatic therapy, and ecology.
  * Free "polite pool" access (`mailto=...`), abstract reconstruction, and direct Open Access PDF links.
* **5. Sound, Cinema & Gatherings**:
  * **TMDb + JustWatch**: Streaming availability for documentaries and international films (MUBI, Criterion Channel).
  * **MusicBrainz & Discogs**: Vinyl pressings, acoustic recordings, independent labels.
  * **Lu.ma & Ticketmaster**: Lu.ma iCal feeds for intimate salons; Ticketmaster for classical and symphony halls.
* **6. Ecology & Food**:
  * **iNaturalist**: Real-time biodiversity observations (flora, fungi, wildlife).
  * **Open Food Facts**: 3M+ products with ingredient transparency and certifications.

---

### SLIDE 6: Web Crawling & Scraping APIs: The Landscape Evaluated
**Slide Title**: Crawling & Scraping Tooling: The Good, The Bad & The Trade-offs  
**Subtitle**: Matching the Right Extraction Tool to Target Site Friction  

**Slide Content & Talking Points**:
* **The Good, The Bad, and The Verdict**:
  * **Crawl4AI (Open Source Python Async)**:
    * *The Good*: **$0.00 license**, blazingly fast (`asyncio` + Playwright), **Fit Markdown** strips 70–92% of HTML noise/tokens, BM25 content filtering.
    * *The Bad*: Runs on datacenter IPs; fails on heavy Cloudflare Turnstile / DataDome.
    * *Verdict*: **Primary Workhorse (75% of web)** for indie bookstores, maker sites, cultural blogs.
  * **Firecrawl API (Cloud / Self-Hosted)**:
    * *The Good*: Turnkey `/scrape`, `/crawl`, `/map`, and `/extract` with Zod JSON schema validation.
    * *The Bad*: Self-hosting requires complex Redis/Chromium infrastructure; Stealth mode costs 5 credits/page.
    * *Verdict*: Best for complex single-page apps and deep structured schema extraction.
  * **ZenRows**:
    * *The Good*: Pay-per-success credit model ($0.93–$1.60/1k). Superior, fast Cloudflare Turnstile & DataDome bypass.
    * *The Bad*: Not meant for multi-step agent actions.
    * *Verdict*: Default fallback for price watches and protected e-commerce targets.
  * **Bright Data (Web Unlocker & Scraping Browser)**:
    * *The Good*: Gold standard against Kasada, DataDome v4+, and airline OTAs. 72M+ residential IPs.
    * *The Bad*: Higher cost ($3.00/1k Unlocker; $8/1k CDP browser sessions).
    * *Verdict*: Reserved strictly for flight pricing and travel aggregators.
  * **Apify Platform**:
    * *The Good*: Pre-built serverless Actors for walled gardens (Instagram drops, Google Maps places).
    * *The Bad*: Compute Unit billing can be unpredictable if scrapers loop.
    * *Verdict*: Used specifically for Instagram announcements and Google Maps venue scraping.
  * **Stagehand + Steel.dev / Browserbase**:
    * *The Good*: AI-driven browser automation with self-healing selectors and natural language actions (`page.act()`).
    * *The Bad*: Slowest and most expensive ($0.10–$0.15/session hour).
    * *Verdict*: Reserved for multi-step checkout verification and seat availability checks.

---

### SLIDE 7: Storage Architecture & The "Zero-DOM" Rule
**Slide Title**: Lean Storage Architecture: The "Zero-DOM" Rule  
**Subtitle**: How 50,000 Global Opportunities Fit in ~210 Megabytes  

**Slide Content & Talking Points**:
* **The Big Trap: Raw HTML Bloat**:
  * Storing full HTML or raw DOM snapshots (1.5MB–4MB per page) causes databases to balloon from 500MB to 50GB within weeks, degrading query performance and inflating backup costs.
* **Undernote's "Zero-DOM" Enforcement**:
  1. Crawlers parse and extract structured data in memory.
  2. The raw HTML is **discarded immediately**.
  3. Only the cleaned, typed candidate record is saved to PostgreSQL.
* **The Storage Math (1 Opportunity Record = ~4.2 KB)**:
  * `id` (UUID) + `external_id`: ~60 bytes
  * `title`, `subtitle`, `action_url`, `hero_image_url`: ~400 bytes
  * `summary` (max 350 chars): ~350 bytes
  * `extracted_attributes` (JSONB): ~300 bytes
  * `embedding` (768-dim float vector for `pgvector`): ~3,072 bytes (3 KB)
  * **Total Size**: **~4.2 KB per opportunity**.
* **The Real-World Numbers**:
  * **10,000 active global opportunities** = **~42 MB**
  * **50,000 active global opportunities** = **~210 MB**
  * **100,000 active global opportunities** = **~420 MB**
* **Strategic Outcome**: The entire global candidate pool across all domains fits comfortably within a $15–$25/month database tier with zero performance degradation.

---

### SLIDE 8: Database & Vector Strategy: Why PostgreSQL + pgvector Wins
**Slide Title**: Database Architecture: Why PostgreSQL + pgvector Wins  
**Subtitle**: Eliminating the "Dual-Write" Problem of External Vector Databases  

**Slide Content & Talking Points**:
* **Why NOT Standalone Vector DBs (Pinecone, Qdrant, Milvus)?**:
  * **The "Dual-Write" Split-Brain Problem**: Storing vectors in Pinecone and metadata in Postgres creates sync lag, orphaned vectors, and requires two separate database queries for every match.
  * **Metadata Query Limitations**: External vector DBs have limited, slow JSONB filtering.
* **The PostgreSQL + `pgvector` Solution (Supabase / Neon)**:
  * **Single Optimized Query**: Evaluates Tier 1 hard constraints (Boolean SQL filters) and Tier 2 vector distance (`<=>`) in a single query execution plan.
  * **Native Relational Joins**: Allows joining candidate opportunities with user context rules and watch triggers instantly in sub-5ms.
* **Embedding Model Choice: Gemini `text-embedding-004` (768 Dimensions)**:
  * 768 dimensions cut HNSW index RAM usage by **50%** compared to OpenAI's 1536-dim vectors.
  * Native synergy with Gemini 2.5 Flash justification layer (single SDK, single API billing).
  * Free tier handles 1,500 RPM; $0.02 per 1M tokens in production.

---

### SLIDE 9: Data Lifecycle, Redundancy & Automated Decay
**Slide Title**: Shared Corpus & Data Decay: Keeping the System Evergreen  
**Subtitle**: Zero Redundancy Across Users and Automatic Purging of Stale Data  

**Slide Content & Talking Points**:
* **1. Canonical Global Pool (Zero Redundancy Across Users)**:
  * Many users share overlapping tastes (e.g. users interested in acoustic recitals or urban theory).
  * We **never** crawl or store opportunities per user. We maintain a single shared record in `candidate_opportunities`.
  * User matches (`matched_opportunities`) are merely 150-byte junction links.
* **2. The 4-Tier Decay Policy (Automated Garbage Collection)**:
  * **Tier 1: Ephemeral (Events, Drop Sales, Flash Deals)**: Hard deleted from the active pool **24 hours after event passes**.
  * **Tier 2: Seasonal (Workshops, seasonal menus)**: Soft archived (embeddings dropped) after 60–90 days.
  * **Tier 3: Evergreen (Books, permanent craft studios, parks)**: Retained indefinitely; periodic ETag checks.
  * **Tier 4: Sovereign Bedrock (User Context)**: Permanent; editable only by the user.
* **3. Partial HNSW Vector Indexing**:
  * `CREATE INDEX ... WHERE is_available = true AND (expires_at IS NULL OR expires_at > NOW())`
  * Expired events and sold-out items become **instantly invisible** to the vector search engine without requiring manual index rebuilds.
* **4. Preserving the "Personal Capsule"**:
  * If a user clicks **"Save to Capsule"** on an event that later passes, a snapshot is preserved in their `user_saved_capsules` table forever, even when purged from the global pool.

---

### SLIDE 10: Ingestion Cadences: Calm Batching vs. Real-Time Spikes
**Slide Title**: Ingestion Cadences: Real-Time vs. Calm Scheduled Batches  
**Subtitle**: Why Real-Time Is an Anti-Pattern for Mindful Discovery  

**Slide Content & Talking Points**:
* **The Philosophy of Calm Batching**:
  * Real-time polling burns compute, risks IP bans on small indie sites, and floods users with anxious chimes. Deep lifestyle discovery is reflective and deliberate.
* **The 3 Background Job Cadences**:
  1. **The 6-Hour Pulse Scout (08:00, 14:00, 20:00)**:
     * Fast, lightweight HTTP `ETag` checks on active watches, price ceilings, and scarce micro-lots.
  2. **The 2:00 AM Nightly Digest (The Replenisher)**:
     * Deep semantic discovery (Exa.ai, Brave POI, OpenLibrary), candidate vector matching, and LLM editorial justification generation.
     * **50% Discount via Gemini Batch API**: Running overnight justifications via the Batch API cuts token costs in half.
  3. **The Sunday Morning Horizon Scan (07:00 AM)**:
     * Long-range seasonal scans, OpenAlex research papers, and travel window evaluations.
* **Serverless Cost Profile**:
  * Handled via **Inngest / Vercel Cron**. Workers spin up, process the batch in 45 seconds, write clean records, and shut down—costing pennies.

---

### SLIDE 11: The Weightage System: The 3-Step Brain
**Slide Title**: The Weightage System: The Brain Behind Curation  
**Subtitle**: Step 1: The Bouncer at the Door | Step 2: The Scorecard  

**Slide Content & Talking Points**:
* **Step 1: The Bouncer at the Door (Binary Gatekeepers — Pass or Fail)**:
  * Hard dealbreakers (vegetarian diet, non-stop flight rule, strict budget ceiling, out of stock) are not "points."
  * They are binary light switches: **1 (Pass) or 0 (Fail)**.
  * If an item violates even ONE dealbreaker (e.g. 99% beautiful resort with a 5-hour layover), it is **instantly kicked out**.
* **Step 2: The Scorecard (100 Points for Surviving Candidates)**:
  * **1. Semantic Taste Affinity (~25 pts)**: Vector cosine similarity with holistic lifestyle aesthetic.
  * **2. Explicit Rule Fit (~25 pts)**: Direct match with named preferences (e.g. "anaerobic fermentation", "carbon steel").
  * **3. Active Horizon Boost (~20 pts)**: A dynamic +25% to +40% multiplier for items matching what the user is planning *right now* (e.g. December family trip).
  * **4. Actionability & Trust (~15 pts)**: Verified direct URL, transparent price, in-stock confirmation.
  * **5. Context-Aware Timeliness (~10 pts)**:
    * *Time-decaying items (events, drops)*: Points decay as deadline approaches.
    * *Evergreen items (books, landmarks)*: Points decay based on **when Undernote last showed it to this user** (a 50-year-old book they have never seen is 100% fresh!).
  * **6. Novelty & Domain Diversity (~5 pts)**: Anti-fatigue dampener prevents showing 5 cards of the same domain in one week.

---

### SLIDE 12: Delivery Triage & The Feedback Learning Loop
**Slide Title**: Delivery Triage & Adaptive Feedback  
**Subtitle**: The "Kept-Waiting" Reservoir vs. High-Conviction Push Alerts  

**Slide Content & Talking Points**:
* **The Delivery Decision (Triage Cutoffs)**:
  * **Score < 70 points**: Silently discarded. Zero junk in the product.
  * **Score 70 to 87 points (90% of discoveries)**: **The "Kept-Waiting" Reservoir**.
    * Staged quietly in the "For You" Feed. Zero notification chimes. Discovered when the user chooses to sit down and open the app.
  * **Score ≥ 88 points + Urgency/Scarcity (10% of discoveries)**: **High-Conviction Push Alert**.
    * Dispatched only for scarce events (25-seat recital, 30-bag coffee drop, target price ceiling met).
    * Enforces a strict ceiling: **Maximum 1 push alert per 48 hours**.
* **The Adaptive Feedback Loop (Learning from User Actions)**:
  * **Save to Personal Capsule**: +15% weight boost to that maker/topic for 30 days; increments rule confidence.
  * **Dismiss Card**: Suppresses entity; optional quick tag (*"Too expensive"*, *"Not my style"*) updates constraints.
  * **Inline Calibration Answer**: Rule confidence jumps from inferred (`0.65`) to explicit (`1.0`), boosting matching weight by 1.4x.
  * **Fatigue Damping**: If a domain is shown 4 times without interaction, it receives a -30% cooldown for 14 days, allowing other horizons to breathe.

---

### Summary Takeaway for Team Alignment
This architecture delivers **proactive silence, infinite domain breadth, lean zero-DOM storage, and mathematical respect for personal dealbreakers**—turning Undernote into a resilient, production-ready discovery platform.
