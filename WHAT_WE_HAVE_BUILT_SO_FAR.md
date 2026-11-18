# Undernote: What We Have Built So Far
**Project Status**: Functional Full-Stack Prototype & Production-Deployed Foundation  
**Live Production URL**: [https://undernote.co/live](https://undernote.co/live)  
**Codebase Stack**: Next.js 15.5+ (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Google GenAI SDK (`@google/genai`), Vercel Edge.

---

## 1. Executive Summary

Undernote has evolved from a conceptual specification into a **fully interactive, working web application** with 8 distinct user-facing surfaces, an end-to-end AI context synthesis pipeline powered by Gemini 2.5 Flash, an authentic media resolver, and live ingestion prototypes for e-commerce, literature, and travel.

The application allows a user to paste multi-thousand-word exports from ChatGPT/Claude/Gemini or dictate their lifestyle via voice, synthesize this into a sovereign profile of **Life Tokens** and visual **Lookbook Tiles**, and immediately see a proactive, personalized **"For You" feed** with tailored recommendations and justifications.

---

## 2. Functional Application Surfaces (The Pages & Screens)

### 2.1 The Landing Experience & Manifesto (`/`)
*File: `src/app/page.tsx` & `src/components/landing/*`*
* **Hero Section (`HeroSection.tsx`)**:
  * High-impact editorial headline: *"Turn what AI already knows about you into a world curated for you."*
  * Dynamic context simulation showing how AI memory translates into tangible, non-ad discoveries.
  * Direct CTAs: *"Start My Undernote"* (`/import`) and *"Explore Demo"* (`/radar`).
* **Interactive Modules**:
  * **Dual Horizon Showcase (`DualHorizonShowcase.tsx`)**: Visualizes the split between **Persistent Bedrock** (enduring standards) and **Active Horizons** (short-term goals like a December trip).
  * **Works While You're Away (`WorksWhileAwaySection.tsx`)**: Explains background autonomous scouting of rare micro-lots, book releases, and price drops.
  * **The Relevance Manifesto (`RelevanceManifesto.tsx`)**: Editorial statement contrasting Undernote’s quiet curation against noisy, ad-polluted algorithmic feeds.
  * **Multi-Player Capsules Teaser (`MultiPlayerSection.tsx`)**: Explains group context sharing for couples and travel groups.
  * **Sovereignty Section (`SovereigntySection.tsx`)**: Guarantees zero ad tracking, zero data sales, and full exportability.

---

### 2.2 The Context Ingestion Hub (`/import`)
*File: `src/app/import/page.tsx`*
* **Multi-Provider Ingestion Channels**:
  * **ChatGPT, Claude, & Gemini Paste Tabs**: Dedicated tabs with tailored extraction prompts that users can copy to their existing AI assistants to extract their accumulated memories.
  * **Web Speech API Live Voice Dictation**: Live microphone recording with pulsing waveform animations and automatic speech-to-text transcription.
  * **2-Minute Lifestyle Quiz**: Fallback interactive questionnaire covering home base, dietary rules, travel style, and daily rituals.
* **Technical Enhancements Built**:
  * **Zero-Truncation Clipboard Engine**: Native `onPaste` plain-text interceptor and `navigator.clipboard.readText()` button. Bypasses browser DOM-sanitizer bugs, allowing users to paste 5,000+ words of rich markdown from ChatGPT without clipping.
  * **Auto-Expanding Textarea**: Vertically resizable with real-time character/word counts.
  * **Dynamic Synthesis Progress Ticker**: Visual multi-stage morphing progress bar (*"Parsing sovereign bedrock...", "Resolving authentic cover media...", "Assembling your personalized For You feed..."*).
  * **Gemini 2.5 Flash API Integration**: Calls `/api/synthesize` to turn raw text into structured tokens, lookbook tiles, and tailored cards.

---

### 2.3 The "For You" Discovery Feed (`/radar`)
*File: `src/app/radar/page.tsx` & `src/components/radar/*`*
* **Feed Architecture**:
  * Cleaned user-facing naming: Replaced legacy "Radar" references with **"For You"** and **"Feed"**.
* **Key Components**:
  * **Daily Pulse Story Tray (`StoryTray.tsx`, `StoryModal.tsx`)**:
    * Instagram-style circular story tray with unread indicator rings.
    * Fullscreen interactive modal with progress timers, tap-to-advance, audio atmospheric cues, and direct card links.
  * **Category Filter Chips (`CategoryChips.tsx`)**:
    * Filters across canonical domains: `All`, `Travel`, `Food & Drink`, `Shopping`, `Books`, `Events`, `Films`.
  * **Origin Filter Bar (`OriginFilterBar.tsx`)**:
    * Distinguishes between `All`, `Proactive Discovery` (ambient matches), and `Requested Watch` (triggered by active monitors).
  * **Rich Discovery Cards (`DiscoveryCard.tsx`)**:
    * High-res imagery with verified fallbacks.
    * Relevance Score indicator (e.g. `98% Resonance`).
    * Matched Context Pills citing the exact user rules satisfied (e.g., `Direct Flight`, `Light Roast`, `Acoustic`).
    * "Why Now" real-time trigger badge (e.g., `40kg micro-lot harvest`, `18% price drop`).
    * Inline Context Refinement question (*"Do you prefer natural anaerobic or washed lots?"*) with instant confetti feedback.
    * One-tap actions: **Save to Capsule** or **Dismiss**.

---

### 2.4 Deep-Dive Detail View (`/radar/[id]`)
*File: `src/app/radar/[id]/page.tsx`*
* **Full-Screen Editorial Dossier**:
  * Hero image with domain badge, pricing, and origin provenance.
  * **Key Highlights Checklist**: Concrete bullet points breaking down why this item is notable.
  * **Specs & Details Grid**: Domain-specific tabular parameters (e.g., roast elevation, book page count, flight duration).
  * **Personalized Context Breakdown**: Clear editorial narrative explaining *"Why this matches your exact context"*, explicitly displaying the user's matched Bedrock and Horizon tokens.
  * **Inline Refinement Drawer**: Allows the user to calibrate their preference directly from the item.
  * **Direct Action CTA**: Deep link to book or purchase at the primary source with zero affiliate tracking.

---

### 2.5 The Sovereign Profile & Lookbook (`/me`)
*File: `src/app/me/page.tsx`*
* **User Persona Summary**:
  * Editorial Archetype Title (e.g. *Systems Architect & Quiet Naturalist*).
  * Location anchor, home airport, and synthesized personal manifesto.
* **The Personal Lookbook**:
  * 6–8 visual aesthetic tiles displaying the user's core lifestyle tendencies (e.g., *Enduring & Repairable Tools, Tactile Natural Fabrics, Restorative Quiet Sanctuaries*).
* **The Sovereign Rule Ledger**:
  * Split into **Bedrock Foundations** (permanent non-negotiables) and **Active Horizons** (short-term projects).
  * **Full User Control**: Users can inline-edit rule statements, toggle rules active/inactive, delete rules, or manually add new rules.
  * Displays rule origin, confidence score, and provenance evidence.

---

### 2.6 The Active Watch Ledger (`/watching`)
*File: `src/app/watching/page.tsx`*
* **Proactive Monitoring Hub**:
  * Tracks items with parametric conditions (target price drops, flight routes, limited availability).
  * Displays target price vs. observed current price with visual delta tags (e.g. `-18%`).
  * Status badges: `Trigger Met`, `Target in sight`, `Monitoring`.
  * Allows creating new custom watches with notification frequency settings.

---

### 2.7 Multi-Player Shared Capsules (`/capsules`)
*File: `src/app/capsules/page.tsx`*
* **Collaborative Context Spaces**:
  * Supports group trips, family retreats, and shared households.
  * Blends multiple member personas (e.g., Kranti + Sarah + Rohan) into an intersection context.
  * Generates shared discovery opportunities that satisfy *all* members' non-negotiable boundaries simultaneously (e.g. child-friendly travel + vegetarian dining + quiet acoustic ambiance).

---

### 2.8 Sovereign Data Inspection & Export (`/data`)
*File: `src/app/data/page.tsx`*
* **Complete Data Transparency**:
  * Inspect every raw context token, provenance timestamp, and provider origin (`ChatGPT`, `Voice`, `Quiz`, `Inline Calibration`).
  * One-click **JSON Data Export** of the user's entire profile.
  * Option to clear context or reload standard baseline profiles.

---

## 3. Backend & Ingestion Engine (What Code is Implemented)

### 3.1 Gemini 2.5 Flash Synthesizer (`/api/synthesize`)
*File: `src/lib/gemini/synthesizer.ts` & `src/app/api/synthesize/route.ts`*
* Implements a structured JSON synthesis pipeline using `@google/genai`.
* Parses free-form text into:
  1. `PersonaArchetype`: Archetype title, tagline, location anchor, opening narrative.
  2. `LookbookTile[]`: 6–8 emergent aesthetic pillars.
  3. `ContextItemData[]`: Discrete Life Tokens categorized by horizon (`persistent_long_term` vs `active_short_term`), durability, and rule type.
  4. `CardData[]`: Tailored discovery cards matched to the user's context.

### 3.2 Authentic Media Resolver Pipeline
*File: `src/lib/images/mediaResolver.ts` & `unsplash.ts`*
* Solves the problem of generic/broken placeholder images:
  * **Books**: Resolves authentic covers via the **OpenLibrary Covers API** (`covers.openlibrary.org/b/id/{id}-L.jpg`) and author cleanup.
  * **Wikipedia REST API**: Resolves encyclopedic thumbnails for literary, historical, and architectural works.
  * **Unsplash Semantic Fallback**: Fallback pipeline with curated image collections tied to lifestyle domains.

### 3.3 Live Ingestion Prototypes (`src/lib/ingestion/*`)
* **Shopify Storefront Ingestion (`shopify.ts`)**:
  * Unauthenticated `/products.json` parser with HTTP `ETag` conditional validation.
  * Extracts variants, availability, pricing, and regex-parsed attributes (anaerobic, roast level, tasting notes).
* **Books Metadata Ingestion (`books.ts`)**:
  * OpenLibrary API & Google Books API client for ISBN lookup and subject tagging.
* **Flight Route Watcher (`flights.ts`)**:
  * Evaluates flight candidates against hard direct non-stop constraints (`stops = 0`), max flight duration, and family-friendly departure times.
* **Client-Side Matcher (`matcher.ts`)**:
  * Multi-score ranking algorithm evaluating relevance, actionability, freshness, and confidence.

### 3.4 Global Reactive State (`AppContext.tsx`)
* Central React context provider managing:
  * Active cards, saved items, and dismissed cards.
  * Persona archetype and context rules ledger.
  * Dynamic calibration questions and inline answers.
  * Active watches and multiplayer capsules.
  * Interactive toast notifications and confetti celebrations.
  * Automatic `localStorage` persistence.

---

## 4. Summary of Codebase Inventory

| Layer | Files & Routes | Current Status |
| :--- | :--- | :--- |
| **Pages (UI)** | `/`, `/import`, `/radar`, `/radar/[id]`, `/me`, `/watching`, `/capsules`, `/data` | **100% Functional & Deployed** |
| **API Routes** | `/api/synthesize`, `/api/match`, `/api/ingest/shopify`, `/api/ingest/flights` | **Operational** |
| **AI Engine** | `src/lib/gemini/synthesizer.ts` (Gemini 2.5 Flash) | **Production Integrated** |
| **Media Engine** | `src/lib/images/mediaResolver.ts` (OpenLibrary + Wikipedia) | **Production Integrated** |
| **Ingestion** | `src/lib/ingestion/` (Shopify, Books, Flights, Matcher) | **Working Prototypes** |
| **State** | `src/context/AppContext.tsx` (LocalStorage + React Context) | **Production Integrated** |
| **Design** | Tailwind CSS + Framer Motion + AppShell + BottomNav | **Responsive (Mobile & Desktop)** |

---

## 5. What Was Accomplished in Recent Refinements
1. **Purged All Stereotypical Copy**: Removed legacy hardcoded constraints (such as `<6.3"` screen sizes and rigid flight rules) from voice subtext, landing hero, benefit pillars, and synthesizer prompts.
2. **Eliminated "Radar" Terminology**: Replaced all customer-facing navigation and copy with **"For You"** and **"Feed"**.
3. **Fixed Clipboard Truncation**: Added plain-text clipboard extraction (`onPaste` + `navigator.clipboard.readText()`) so multi-thousand-word AI export pastes never clip.
4. **Deleted Dead Components**: Purged obsolete modal files (`AiPromptModal.tsx`, `IngestionModal.tsx`).
5. **Synchronized Codebases**: Synchronized all source files, public assets, and documentation across both `undernote` and `undernote-live` project folders.

---
*This document reflects the exact operational state of the Undernote codebase as of late 2026. Live at `https://undernote.co/live`.*
