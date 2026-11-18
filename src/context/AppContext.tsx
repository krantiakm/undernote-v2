'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CardData,
  ContextItemData,
  EventCategory,
  EventTimeWindow,
  GeographyAnchor,
  GroupCapsuleData,
  IntentData,
  PersonaArchetype,
  RadarDomain,
  RecommendationOrigin,
  StoryPulse,
  WatchData,
} from '@/types';
import {
  bangaloreContextItems,
  bangaloreEventsPersona,
  curatedEventIntents,
  curatedEventsCards,
  curatedEventStories,
  curatedEventWatches,
  curatedGroupPlans,
  defaultEventCalibrationQuestions,
  getDefaultGeographyFromEnvironment,
  singaporeContextItems,
  singaporeEventsPersona,
} from '@/data/eventsData';
import { BASE_PATH } from '@/lib/assets';

interface IngestionData {
  text?: string;
  source?: string;
  voiceNote?: string;
  quizAnswers?: Record<string, string>;
}

export interface DynamicCalibrationQuestion {
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

interface AppContextType {
  // Market Anchor (Bangalore vs Singapore — silently detected, editable in Me)
  geography: GeographyAnchor;
  setGeography: (geo: GeographyAnchor) => void;

  // Persona & Taste Lookbook
  persona: PersonaArchetype;
  updatePersona: (updates: Partial<PersonaArchetype>) => void;

  // Events Feed & Filters
  cards: CardData[];
  savedCards: CardData[];
  originFilter: 'all' | RecommendationOrigin;
  setOriginFilter: (filter: 'all' | RecommendationOrigin) => void;
  domainFilter: 'all' | RadarDomain;
  setDomainFilter: (filter: 'all' | RadarDomain) => void;
  timeFilter: 'all' | EventTimeWindow;
  setTimeFilter: (filter: 'all' | EventTimeWindow) => void;
  categoryFilter: 'all' | EventCategory;
  setCategoryFilter: (filter: 'all' | EventCategory) => void;
  saveCard: (cardId: string) => void;
  dismissCard: (cardId: string) => void;
  answerCardQuestion: (cardId: string, answer: string) => void;
  refineContextForCard: (cardId: string, refinedNote: string, domain?: RadarDomain) => void;

  // Preferences & Boundaries
  contextItems: ContextItemData[];
  addContextItem: (item: Omit<ContextItemData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContextItem: (id: string, updates: Partial<ContextItemData>) => void;
  deleteContextItem: (id: string) => void;

  // Venue, Artist & Ticket Watches
  watches: WatchData[];
  addWatch: (watch: Omit<WatchData, 'id' | 'lastChecked' | 'triggerMet' | 'observations'>) => void;
  toggleWatchStatus: (id: string) => void;
  deleteWatch: (id: string) => void;

  // Horizons
  intents: IntentData[];
  addIntent: (intent: Omit<IntentData, 'id' | 'createdAt'>) => void;

  // Together: Shared Outing Plans
  groupCapsules: GroupCapsuleData[];
  createGroupCapsule: (capsule: Omit<GroupCapsuleData, 'id' | 'createdAt' | 'inviteCode'>) => string;
  joinGroupCapsule: (inviteCode: string, guestName: string, guestTaste?: string) => boolean;

  // Stories (compat)
  stories: StoryPulse[];
  activeStoryIndex: number | null;
  setActiveStoryIndex: (index: number | null) => void;
  openStory: (index: number) => void;
  closeStory: () => void;
  nextStory: () => void;
  prevStory: () => void;

  // AI Context Import
  isIngesting: boolean;
  isMorphing: boolean;
  hasPersonalized: boolean;
  runIngestionPipeline: (data: IngestionData) => Promise<void>;
  resetToBaseline: () => void;

  // Gentle Taste Calibration
  calibrationQuestions: DynamicCalibrationQuestion[];
  answerCalibrationQuestion: (
    questionId: string,
    option: { label: string; key: string; value: string; domain: RadarDomain }
  ) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'undernote_events_v1';

function getMarketDefaults(geo: GeographyAnchor) {
  const isSin = geo === 'singapore-sin';
  return {
    persona: isSin ? singaporeEventsPersona : bangaloreEventsPersona,
    cards: curatedEventsCards.filter((c) => c.geography === geo),
    contextItems: isSin ? singaporeContextItems : bangaloreContextItems,
    watches: curatedEventWatches.filter((w) => w.geography === geo),
    groupPlans: curatedGroupPlans.filter((g) => !g.geography || g.geography === geo),
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [geography, setGeographyState] = useState<GeographyAnchor>('india-blr');
  const [persona, setPersona] = useState<PersonaArchetype>(bangaloreEventsPersona);
  const [cards, setCards] = useState<CardData[]>(
    curatedEventsCards.filter((c) => c.geography === 'india-blr')
  );
  const [contextItems, setContextItems] = useState<ContextItemData[]>(bangaloreContextItems);
  const [watches, setWatches] = useState<WatchData[]>(
    curatedEventWatches.filter((w) => w.geography === 'india-blr')
  );
  const [intents, setIntents] = useState<IntentData[]>(curatedEventIntents);
  const [groupCapsules, setGroupCapsules] = useState<GroupCapsuleData[]>(
    curatedGroupPlans.filter((g) => g.geography === 'india-blr')
  );
  const [stories] = useState<StoryPulse[]>(curatedEventStories);

  // Filters
  const [originFilter, setOriginFilter] = useState<'all' | RecommendationOrigin>('all');
  const [domainFilter, setDomainFilter] = useState<'all' | RadarDomain>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | EventTimeWindow>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | EventCategory>('all');

  // Stories (compat)
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const openStory = (index: number) => setActiveStoryIndex(index);
  const closeStory = () => setActiveStoryIndex(null);
  const nextStory = () =>
    setActiveStoryIndex((curr) => (curr === null || curr >= stories.length - 1 ? null : curr + 1));
  const prevStory = () =>
    setActiveStoryIndex((curr) => (curr === null || curr <= 0 ? 0 : curr - 1));

  // Ingestion
  const [isIngesting, setIsIngesting] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [hasPersonalized, setHasPersonalized] = useState(false);

  // Calibration
  const [calibrationQuestions, setCalibrationQuestions] = useState<DynamicCalibrationQuestion[]>(
    defaultEventCalibrationQuestions
  );

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Switch Market (used silently on load or via quiet setting in Me)
  const setGeography = (geo: GeographyAnchor) => {
    setGeographyState(geo);
    const defaults = getMarketDefaults(geo);
    setPersona(defaults.persona);
    setCards(defaults.cards);
    setContextItems(defaults.contextItems);
    setWatches(defaults.watches);
    setGroupCapsules(defaults.groupPlans);
    setTimeFilter('all');
    setCategoryFilter('all');
    showToast(
      geo === 'singapore-sin'
        ? 'Home city set to Singapore'
        : 'Home city set to Bangalore'
    );
  };

  // Hydrate from localStorage or silent locale detection
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const currentGeo: GeographyAnchor =
          parsed.geography === 'singapore-sin' ? 'singapore-sin' : 'india-blr';
        setGeographyState(currentGeo);

        if (typeof parsed.hasPersonalized === 'boolean') {
          setHasPersonalized(parsed.hasPersonalized);
        }

        const defaults = getMarketDefaults(currentGeo);

        if (parsed.hasPersonalized && Array.isArray(parsed.cards) && parsed.cards.length > 0) {
          setCards(parsed.cards);
        } else if (Array.isArray(parsed.cards) && parsed.cards.length > 0) {
          // Preserve saved/dismissed states across curated updates
          const statusMap = new Map<string, CardData['status']>(
            parsed.cards.map((c: CardData) => [c.id, c.status])
          );
          setCards(
            defaults.cards.map((c) => ({
              ...c,
              status: statusMap.get(c.id) || c.status,
            }))
          );
        } else {
          setCards(defaults.cards);
        }

        setPersona(parsed.persona || defaults.persona);
        setContextItems(
          Array.isArray(parsed.contextItems) && parsed.contextItems.length > 0
            ? parsed.contextItems
            : defaults.contextItems
        );
        setWatches(
          Array.isArray(parsed.watches) && parsed.watches.length > 0
            ? parsed.watches
            : defaults.watches
        );
        setGroupCapsules(
          Array.isArray(parsed.groupCapsules) && parsed.groupCapsules.length > 0
            ? parsed.groupCapsules
            : defaults.groupPlans
        );
        if (Array.isArray(parsed.calibrationQuestions)) {
          setCalibrationQuestions(parsed.calibrationQuestions);
        }
      } else {
        // Silent environment detection on first visit
        const detectedGeo = getDefaultGeographyFromEnvironment();
        if (detectedGeo !== 'india-blr') {
          setGeographyState(detectedGeo);
          const defaults = getMarketDefaults(detectedGeo);
          setPersona(defaults.persona);
          setCards(defaults.cards);
          setContextItems(defaults.contextItems);
          setWatches(defaults.watches);
          setGroupCapsules(defaults.groupPlans);
        }
      }
    } catch {
      // Fallback cleanly to defaults
    }
  }, []);

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          geography,
          cards,
          contextItems,
          watches,
          intents,
          groupCapsules,
          persona,
          hasPersonalized,
          calibrationQuestions,
        })
      );
    } catch {
      // Ignore quota errors
    }
  }, [
    geography,
    cards,
    contextItems,
    watches,
    intents,
    groupCapsules,
    persona,
    hasPersonalized,
    calibrationQuestions,
  ]);

  const answerCalibrationQuestion = (
    questionId: string,
    option: { label: string; key: string; value: string; domain: RadarDomain }
  ) => {
    addContextItem({
      domain: option.domain,
      type: 'preference',
      key: option.key,
      value: option.value,
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 1.0,
      status: 'active',
      origin: 'user_answer',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: {
        provider: 'Taste Check-In',
      },
    });
    setCalibrationQuestions((prev) => prev.filter((q) => q.id !== questionId));
    showToast(`Noted — ${option.key} updated`);
  };

  const updatePersona = (updates: Partial<PersonaArchetype>) => {
    setPersona((prev) => ({ ...prev, ...updates }));
  };

  const saveCard = (cardId: string) => {
    const existing = cards.find((c) => c.id === cardId);
    const willSave = existing?.status !== 'saved';

    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, status: c.status === 'saved' ? 'active' : 'saved' } : c
      )
    );

    if (willSave) {
      showToast('Saved to your Watching calendar');
    } else {
      showToast('Removed from your saved calendar');
    }
  };

  const dismissCard = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, status: 'dismissed' } : c))
    );
    showToast('Hidden from your feed');
  };

  const answerCardQuestion = (cardId: string, answer: string) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, question: null, relevanceScore: Math.min(1.0, c.relevanceScore + 0.03) }
          : c
      )
    );
    addContextItem({
      domain: 'events',
      type: 'preference',
      key: 'Event Preference',
      value: answer,
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 0.98,
      status: 'active',
      origin: 'user_answer',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: { provider: 'Event Feedback', evidence: answer },
    });
  };

  const refineContextForCard = (cardId: string, refinedNote: string, domain?: RadarDomain) => {
    if (!refinedNote.trim()) return;
    const card = cards.find((c) => c.id === cardId);
    const newItem: ContextItemData = {
      id: `ctx-${Date.now()}`,
      domain: domain || card?.domain || 'events',
      type: 'preference',
      key: card?.eventMeta?.categoryLabel || 'Personal Note',
      value: refinedNote.trim(),
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 0.99,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      provenance: { provider: 'Your Note', evidence: refinedNote.trim() },
    };
    setContextItems((prev) => [newItem, ...prev]);
    showToast('Preference added to your profile');
  };

  const addContextItem = (item: Omit<ContextItemData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: ContextItemData = {
      ...item,
      id: `ctx-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setContextItems((prev) => [newItem, ...prev]);
    showToast('Added to your taste profile');
  };

  const updateContextItem = (id: string, updates: Partial<ContextItemData>) => {
    setContextItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
      )
    );
    showToast('Preference updated');
  };

  const deleteContextItem = (id: string) => {
    setContextItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Preference removed');
  };

  const addWatch = (
    watch: Omit<WatchData, 'id' | 'lastChecked' | 'triggerMet' | 'observations'>
  ) => {
    const newWatch: WatchData = {
      ...watch,
      id: `watch-${Date.now()}`,
      lastChecked: 'Just now',
      triggerMet: false,
      observations: [
        {
          timestamp: new Date().toISOString(),
          availability: 'Quietly watching upcoming schedules',
          sourceUrl: 'https://undernote.co',
          notes: 'We will surface new dates here as soon as seats open.',
        },
      ],
    };
    setWatches((prev) => [newWatch, ...prev]);
    showToast(`Now watching ${watch.entity}`);
  };

  const toggleWatchStatus = (id: string) => {
    setWatches((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
      )
    );
    showToast('Watch updated');
  };

  const deleteWatch = (id: string) => {
    setWatches((prev) => prev.filter((w) => w.id !== id));
    showToast('Watch removed');
  };

  const addIntent = (intent: Omit<IntentData, 'id' | 'createdAt'>) => {
    const newIntent: IntentData = {
      ...intent,
      id: `intent-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setIntents((prev) => [newIntent, ...prev]);
  };

  const createGroupCapsule = (
    capsule: Omit<GroupCapsuleData, 'id' | 'createdAt' | 'inviteCode'>
  ): string => {
    const prefix = geography === 'singapore-sin' ? 'SIN' : 'BLR';
    const inviteCode = `${prefix}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const matchedForPlan = cards.filter((c) => c.status !== 'dismissed').slice(0, 2);
    const newCapsule: GroupCapsuleData = {
      ...capsule,
      geography,
      id: `plan-${Date.now()}`,
      inviteCode,
      fusedOpportunities:
        capsule.fusedOpportunities && capsule.fusedOpportunities.length > 0
          ? capsule.fusedOpportunities
          : matchedForPlan,
      createdAt: new Date().toISOString(),
    };
    setGroupCapsules((prev) => [newCapsule, ...prev]);
    showToast(`Shared plan ready · Code ${inviteCode}`);
    return inviteCode;
  };

  const joinGroupCapsule = (
    inviteCode: string,
    guestName: string,
    guestTaste?: string
  ): boolean => {
    const found = groupCapsules.find(
      (c) => c.inviteCode.toUpperCase() === inviteCode.trim().toUpperCase()
    );
    if (!found) {
      showToast('Invite code not found');
      return false;
    }
    setGroupCapsules((prev) =>
      prev.map((c) =>
        c.id === found.id
          ? {
              ...c,
              members: [
                ...c.members,
                {
                  userId: `user-${Date.now()}`,
                  name: guestName,
                  avatar: guestName[0].toUpperCase(),
                  isPcpUser: false,
                  contributedRuleIds: [],
                  tasteSummary: guestTaste?.trim() || 'Joined for this outing',
                  status: 'joined',
                },
              ],
            }
          : c
      )
    );
    showToast(`${guestName} added to "${found.title}"`);
    return true;
  };

  const runIngestionPipeline = async (data: IngestionData) => {
    setIsIngesting(true);
    setIsMorphing(true);

    const inputContent = data.text || data.voiceNote || '';
    const inferredGeo: GeographyAnchor =
      /singapore|tiong bahru|joo chiat|esplanade|marina bay/i.test(inputContent) &&
      !/bangalore|bengaluru|indiranagar/i.test(inputContent)
        ? 'singapore-sin'
        : geography;

    try {
      const res = await fetch(`${BASE_PATH}/api/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: inputContent, geography: inferredGeo }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          if (inferredGeo !== geography) setGeographyState(inferredGeo);
          if (result.persona) setPersona(result.persona);
          if (result.contextItems?.length > 0) setContextItems(result.contextItems);
          if (result.cards?.length > 0) setCards(result.cards);
          if (Array.isArray(result.calibrationQuestions)) {
            setCalibrationQuestions(result.calibrationQuestions);
          }
          setHasPersonalized(true);
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.65 },
            colors: ['#24483F', '#C66E45', '#9DB6A9'],
          });
          showToast('Your cultural calendar is tuned to you');
          return;
        }
      }

      // Graceful client-side synthesis fallback when offline or without API key:
      // Extract user name & customize local market events immediately!
      const defaults = getMarketDefaults(inferredGeo);
      const nameMatch = inputContent.match(/(?:name is|I am|I'm)\s+([A-Z][a-z]{2,15})/);
      const detectedName = nameMatch?.[1] || persona.userName || 'Kranti';

      setGeographyState(inferredGeo);
      setPersona({
        ...defaults.persona,
        userName: detectedName,
        monogram: detectedName.charAt(0).toUpperCase(),
      });
      setCards(defaults.cards);
      setHasPersonalized(true);
      showToast('Your cultural calendar is tuned to you');
    } catch {
      // Offline / UI-layer mode: tune curated market dataset gracefully
      const defaults = getMarketDefaults(inferredGeo);
      setGeographyState(inferredGeo);
      setPersona(defaults.persona);
      setCards(defaults.cards);
      setHasPersonalized(true);
      showToast('Your cultural calendar is tuned to you');
    } finally {
      setIsIngesting(false);
      setIsMorphing(false);
    }
  };

  const resetToBaseline = () => {
    localStorage.removeItem(STORAGE_KEY);
    const detectedGeo = getDefaultGeographyFromEnvironment();
    const defaults = getMarketDefaults(detectedGeo);
    setGeographyState(detectedGeo);
    setPersona(defaults.persona);
    setCards(defaults.cards);
    setContextItems(defaults.contextItems);
    setWatches(defaults.watches);
    setGroupCapsules(defaults.groupPlans);
    setHasPersonalized(false);
    setCalibrationQuestions(defaultEventCalibrationQuestions);
    setTimeFilter('all');
    setCategoryFilter('all');
    showToast('Restored baseline cultural calendar');
  };

  const savedCards = cards.filter((c) => c.status === 'saved');

  return (
    <AppContext.Provider
      value={{
        geography,
        setGeography,
        persona,
        updatePersona,
        cards,
        savedCards,
        originFilter,
        setOriginFilter,
        domainFilter,
        setDomainFilter,
        timeFilter,
        setTimeFilter,
        categoryFilter,
        setCategoryFilter,
        saveCard,
        dismissCard,
        answerCardQuestion,
        refineContextForCard,
        contextItems,
        addContextItem,
        updateContextItem,
        deleteContextItem,
        watches,
        addWatch,
        toggleWatchStatus,
        deleteWatch,
        intents,
        addIntent,
        groupCapsules,
        createGroupCapsule,
        joinGroupCapsule,
        stories,
        activeStoryIndex,
        setActiveStoryIndex,
        openStory,
        closeStory,
        nextStory,
        prevStory,
        isIngesting,
        isMorphing,
        hasPersonalized,
        runIngestionPipeline,
        resetToBaseline,
        calibrationQuestions,
        answerCalibrationQuestion,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
