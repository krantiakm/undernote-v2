'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CardData,
  ContextItemData,
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
  allCards,
  indiaPersona,
  initialContextItems,
  initialGroupCapsules,
  initialIntents,
  initialStories,
  initialWatches,
  singaporePersona,
} from '@/data/initialData';

interface IngestionData {
  text?: string;
  source?: string;
  voiceNote?: string;
  quizAnswers?: Record<string, string>;
}

interface AppContextType {
  // Geography Anchor (Dual Geography: India - BLR vs Singapore - SIN)
  geography: GeographyAnchor;
  setGeography: (geo: GeographyAnchor) => void;

  // Persona & DNA
  persona: PersonaArchetype;
  updatePersona: (updates: Partial<PersonaArchetype>) => void;

  // Cards & Radar
  cards: CardData[];
  savedCards: CardData[];
  originFilter: 'all' | RecommendationOrigin;
  setOriginFilter: (filter: 'all' | RecommendationOrigin) => void;
  domainFilter: 'all' | RadarDomain;
  setDomainFilter: (filter: 'all' | RadarDomain) => void;
  saveCard: (cardId: string) => void;
  dismissCard: (cardId: string) => void;
  answerCardQuestion: (cardId: string, answer: string) => void;
  refineContextForCard: (cardId: string, refinedNote: string) => void;

  // Context Rules
  contextItems: ContextItemData[];
  addContextItem: (item: Omit<ContextItemData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContextItem: (id: string, updates: Partial<ContextItemData>) => void;
  deleteContextItem: (id: string) => void;

  // Watches & Trackers
  watches: WatchData[];
  addWatch: (watch: Omit<WatchData, 'id' | 'lastChecked' | 'triggerMet' | 'observations'>) => void;
  toggleWatchStatus: (id: string) => void;

  // Planning Horizons / Intents
  intents: IntentData[];
  addIntent: (intent: Omit<IntentData, 'id' | 'createdAt'>) => void;

  // Multi-Player Capsules
  groupCapsules: GroupCapsuleData[];
  createGroupCapsule: (capsule: Omit<GroupCapsuleData, 'id' | 'createdAt' | 'inviteCode'>) => string;
  joinGroupCapsule: (inviteCode: string, guestName: string) => boolean;

  // Stories
  stories: StoryPulse[];
  activeStoryIndex: number | null;
  setActiveStoryIndex: (index: number | null) => void;
  openStory: (index: number) => void;
  closeStory: () => void;
  nextStory: () => void;
  prevStory: () => void;

  // Ingestion & Morphing
  isIngesting: boolean;
  isMorphing: boolean;
  hasPersonalized: boolean;
  runIngestionPipeline: (data: IngestionData) => Promise<void>;
  resetToBaseline: () => void;

  // UI Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'undernote_app_state_v2';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [geography, setGeographyState] = useState<GeographyAnchor>('india-blr');
  const [persona, setPersona] = useState<PersonaArchetype>(indiaPersona);
  const [cards, setCards] = useState<CardData[]>(allCards.filter((c) => c.geography === 'india-blr'));
  const [contextItems, setContextItems] = useState<ContextItemData[]>(initialContextItems);
  const [watches, setWatches] = useState<WatchData[]>(initialWatches.filter((w) => w.geography === 'india-blr'));
  const [intents, setIntents] = useState<IntentData[]>(initialIntents.filter((i) => i.geography === 'india-blr'));
  const [groupCapsules, setGroupCapsules] = useState<GroupCapsuleData[]>(initialGroupCapsules);
  const [stories, setStories] = useState<StoryPulse[]>(initialStories.filter((s) => s.geography === 'india-blr'));

  // Filters
  const [originFilter, setOriginFilter] = useState<'all' | RecommendationOrigin>('all');
  const [domainFilter, setDomainFilter] = useState<'all' | RadarDomain>('all');

  // Stories
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const openStory = (index: number) => setActiveStoryIndex(index);
  const closeStory = () => setActiveStoryIndex(null);
  const nextStory = () => {
    setActiveStoryIndex((curr) => {
      if (curr === null) return null;
      if (curr >= stories.length - 1) return null;
      return curr + 1;
    });
  };
  const prevStory = () => {
    setActiveStoryIndex((curr) => {
      if (curr === null || curr <= 0) return 0;
      return curr - 1;
    });
  };

  // Ingestion / Morphing State
  const [isIngesting, setIsIngesting] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [hasPersonalized, setHasPersonalized] = useState(true);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Geography Switcher
  const setGeography = (geo: GeographyAnchor) => {
    setGeographyState(geo);
    if (geo === 'singapore-sin') {
      setPersona(singaporePersona);
      setCards(allCards.filter((c) => c.geography === 'singapore-sin'));
      setStories(initialStories.filter((s) => s.geography === 'singapore-sin'));
      setWatches(initialWatches.filter((w) => w.geography === 'singapore-sin'));
      setIntents(initialIntents.filter((i) => i.geography === 'singapore-sin'));
      showToast('Switched context to Singapore (SIN) 🇸🇬');
    } else {
      setPersona(indiaPersona);
      setCards(allCards.filter((c) => c.geography === 'india-blr'));
      setStories(initialStories.filter((s) => s.geography === 'india-blr'));
      setWatches(initialWatches.filter((w) => w.geography === 'india-blr'));
      setIntents(initialIntents.filter((i) => i.geography === 'india-blr'));
      showToast('Switched context to Bangalore, India (BLR) 🇮🇳');
    }
  };

  // Local Storage hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.geography) setGeographyState(parsed.geography);
        if (parsed.cards) setCards(parsed.cards);
        if (parsed.contextItems) setContextItems(parsed.contextItems);
        if (parsed.watches) setWatches(parsed.watches);
        if (parsed.intents) setIntents(parsed.intents);
        if (parsed.persona) setPersona(parsed.persona);
      }
    } catch {
      // fallback to initial
    }
  }, []);

  // Save changes to localStorage
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
        })
      );
    } catch {
      // storage full or disabled
    }
  }, [geography, cards, contextItems, watches, intents, groupCapsules, persona]);

  const updatePersona = (updates: Partial<PersonaArchetype>) => {
    setPersona((prev) => ({ ...prev, ...updates }));
  };

  const saveCard = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, status: c.status === 'saved' ? 'active' : 'saved' }
          : c
      )
    );
    const card = cards.find((c) => c.id === cardId);
    if (card?.status !== 'saved') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#24483F', '#C66E45', '#9DB6A9'],
      });
      showToast('Opportunity saved to your Personal Capsule');
    } else {
      showToast('Removed from saved items');
    }
  };

  const dismissCard = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, status: 'dismissed' } : c))
    );
    showToast('Opportunity dismissed from your Radar');
  };

  const answerCardQuestion = (cardId: string, answer: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            question: null,
            relevanceScore: Math.min(1.0, c.relevanceScore + 0.04),
          };
        }
        return c;
      })
    );

    const newContextItem: ContextItemData = {
      id: `ctx-${Date.now()}`,
      domain: 'travel',
      type: 'preference',
      key: 'Refined Preference',
      value: answer,
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 0.98,
      status: 'active',
      origin: 'user_answer',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      provenance: { provider: 'Radar Inline Question', evidence: `Answered: "${answer}"` },
    };
    setContextItems((prev) => [newContextItem, ...prev]);

    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#C66E45', '#24483F'],
    });
    showToast('Context updated: Radar precision calibrated');
  };

  const refineContextForCard = (cardId: string, refinedNote: string) => {
    if (!refinedNote.trim()) return;
    const newContextItem: ContextItemData = {
      id: `ctx-${Date.now()}`,
      domain: 'travel',
      type: 'decision_rule',
      key: 'User Refinement Rule',
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
      provenance: { provider: 'Deep Dive Voice/Text Refinement', evidence: refinedNote },
    };
    setContextItems((prev) => [newContextItem, ...prev]);
    showToast('✨ Personal rule synthesized into Persistent Bedrock');
  };

  const addContextItem = (item: Omit<ContextItemData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: ContextItemData = {
      ...item,
      id: `ctx-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setContextItems((prev) => [newItem, ...prev]);
    showToast('Context item added to your sovereign profile');
  };

  const updateContextItem = (id: string, updates: Partial<ContextItemData>) => {
    setContextItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
    showToast('Context rule updated');
  };

  const deleteContextItem = (id: string) => {
    setContextItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Context item deleted');
  };

  const addWatch = (watch: Omit<WatchData, 'id' | 'lastChecked' | 'triggerMet' | 'observations'>) => {
    const newWatch: WatchData = {
      ...watch,
      id: `watch-${Date.now()}`,
      lastChecked: 'Just now',
      triggerMet: false,
      observations: [
        {
          timestamp: new Date().toISOString(),
          availability: 'Active Monitoring',
          sourceUrl: 'https://undernote.ai',
          notes: 'Watch initialized from context',
        },
      ],
    };
    setWatches((prev) => [newWatch, ...prev]);
    showToast(`Active watch established for "${watch.entity}"`);
  };

  const toggleWatchStatus = (id: string) => {
    setWatches((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
          : w
      )
    );
    showToast('Watch status updated');
  };

  const addIntent = (intent: Omit<IntentData, 'id' | 'createdAt'>) => {
    const newIntent: IntentData = {
      ...intent,
      id: `intent-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setIntents((prev) => [newIntent, ...prev]);
    showToast(`Planning horizon added: "${intent.title}"`);
  };

  const createGroupCapsule = (
    capsule: Omit<GroupCapsuleData, 'id' | 'createdAt' | 'inviteCode'>
  ): string => {
    const inviteCode = `UND-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newCapsule: GroupCapsuleData = {
      ...capsule,
      id: `cap-${Date.now()}`,
      inviteCode,
      createdAt: new Date().toISOString(),
    };
    setGroupCapsules((prev) => [newCapsule, ...prev]);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
    showToast(`Group Capsule created! Share code: ${inviteCode}`);
    return inviteCode;
  };

  const joinGroupCapsule = (inviteCode: string, guestName: string): boolean => {
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
                  status: 'joined',
                },
              ],
            }
          : c
      )
    );
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
    });
    showToast(`Joined "${found.title}"! Shared constraints fused.`);
    return true;
  };

  const runIngestionPipeline = async (data: IngestionData) => {
    setIsIngesting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsMorphing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Dynamic extraction logic based on text or voice input
    const inputContent = (data.text || data.voiceNote || '').toLowerCase();
    
    // Auto-detect geography from input
    if (inputContent.includes('singapore') || inputContent.includes('changi')) {
      setGeography('singapore-sin');
    }

    // Add synthesized context item
    const extractedRule: ContextItemData = {
      id: `ctx-${Date.now()}`,
      domain: inputContent.includes('flight') || inputContent.includes('travel') ? 'travel' : 'shopping',
      type: 'decision_rule',
      key: 'Imported Rule',
      value: (data.text || data.voiceNote || 'Curated taste preferences').substring(0, 100),
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 0.98,
      status: 'active',
      origin: 'imported',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      provenance: { provider: data.source || 'AI Ingestion Studio' },
    };

    setContextItems((prev) => [extractedRule, ...prev]);
    setHasPersonalized(true);
    setIsIngesting(false);
    setIsMorphing(false);

    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#24483F', '#C66E45', '#DDD6CB'],
    });

    showToast('✨ Personal Context Dossier calibrated and synchronized!');
  };

  const resetToBaseline = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGeographyState('india-blr');
    setPersona(indiaPersona);
    setCards(allCards.filter((c) => c.geography === 'india-blr'));
    setContextItems(initialContextItems);
    setWatches(initialWatches.filter((w) => w.geography === 'india-blr'));
    setIntents(initialIntents.filter((i) => i.geography === 'india-blr'));
    setStories(initialStories.filter((s) => s.geography === 'india-blr'));
    setHasPersonalized(true);
    showToast('Reset to sovereign baseline profile');
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
