'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CardData,
  ContextItemData,
  GroupCapsuleData,
  IntentData,
  PersonaArchetype,
  RadarDomain,
  RecommendationOrigin,
  StoryPulse,
  WatchData,
} from '@/types';
import {
  initialCards,
  initialContextItems,
  initialGroupCapsules,
  initialIntents,
  initialPersona,
  initialStories,
  initialWatches,
} from '@/data/initialData';

interface IngestionData {
  text?: string;
  source?: string;
  voiceNote?: string;
  quizAnswers?: Record<string, string>;
}

interface AppContextType {
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

  // Intents
  intents: IntentData[];
  addIntent: (intent: Omit<IntentData, 'id' | 'createdAt' | 'status'>) => void;

  // Group Capsules
  groupCapsules: GroupCapsuleData[];
  createGroupCapsule: (capsule: Omit<GroupCapsuleData, 'id' | 'createdAt' | 'inviteCode' | 'fusedOpportunities'>) => void;
  joinGroupCapsule: (inviteCode: string, userName: string) => boolean;

  // Stories Tray
  stories: StoryPulse[];
  activeStoryIndex: number | null;
  openStory: (index: number) => void;
  closeStory: () => void;
  nextStory: () => void;
  prevStory: () => void;

  // Ingestion Studio & Morphing
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

const STORAGE_KEY = 'undernote_app_state_v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<PersonaArchetype>(initialPersona);
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [contextItems, setContextItems] = useState<ContextItemData[]>(initialContextItems);
  const [watches, setWatches] = useState<WatchData[]>(initialWatches);
  const [intents, setIntents] = useState<IntentData[]>(initialIntents);
  const [groupCapsules, setGroupCapsules] = useState<GroupCapsuleData[]>(initialGroupCapsules);
  const [stories, setStories] = useState<StoryPulse[]>(initialStories);

  // Filters
  const [originFilter, setOriginFilter] = useState<'all' | RecommendationOrigin>('all');
  const [domainFilter, setDomainFilter] = useState<'all' | RadarDomain>('all');

  // Stories
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

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

  // Local Storage hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cards) setCards(parsed.cards);
        if (parsed.contextItems) setContextItems(parsed.contextItems);
        if (parsed.watches) setWatches(parsed.watches);
        if (parsed.intents) setIntents(parsed.intents);
        if (parsed.groupCapsules) setGroupCapsules(parsed.groupCapsules);
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
  }, [cards, contextItems, watches, intents, groupCapsules, persona]);

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

    // Also add to context items
    const newContextItem: ContextItemData = {
      id: `ctx-${Date.now()}`,
      domain: 'food-drink',
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
      domain: 'interests',
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
          notes: 'Tracker initialized silently',
        },
      ],
    };
    setWatches((prev) => [newWatch, ...prev]);
    confetti({
      particleCount: 35,
      spread: 50,
      colors: ['#24483F', '#C66E45'],
    });
    showToast('🎯 Proactive Tracker activated silently');
  };

  const toggleWatchStatus = (id: string) => {
    setWatches((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
          : w
      )
    );
    showToast('Tracker status updated');
  };

  const addIntent = (intent: Omit<IntentData, 'id' | 'createdAt' | 'status'>) => {
    const newIntent: IntentData = {
      ...intent,
      id: `intent-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setIntents((prev) => [newIntent, ...prev]);
    showToast('Active horizon intent registered');
  };

  const createGroupCapsule = (
    capsule: Omit<GroupCapsuleData, 'id' | 'createdAt' | 'inviteCode' | 'fusedOpportunities'>
  ) => {
    const newCapsule: GroupCapsuleData = {
      ...capsule,
      id: `cap-${Date.now()}`,
      inviteCode: `FUSE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      fusedOpportunities: [initialCards[0], initialCards[2]],
      createdAt: new Date().toISOString(),
    };
    setGroupCapsules((prev) => [newCapsule, ...prev]);
    showToast('Multi-Player Group Capsule created');
  };

  const joinGroupCapsule = (inviteCode: string, userName: string) => {
    const code = inviteCode.trim().toUpperCase();
    const found = groupCapsules.find((g) => g.inviteCode.toUpperCase() === code);
    if (found) {
      setGroupCapsules((prev) =>
        prev.map((g) => {
          if (g.inviteCode.toUpperCase() === code) {
            return {
              ...g,
              members: [
                ...g.members,
                {
                  userId: `user-${Date.now()}`,
                  name: userName,
                  avatar: userName.charAt(0).toUpperCase(),
                  isPcpUser: true,
                  contributedRuleIds: ['ctx-1'],
                  status: 'joined',
                },
              ],
            };
          }
          return g;
        })
      );
      showToast(`Joined "${found.title}" successfully!`);
      return true;
    }
    showToast('Invite code not found. Check code and try again.');
    return false;
  };

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
  };

  const nextStory = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
      } else {
        closeStory();
      }
    }
  };

  const prevStory = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
      } else {
        closeStory();
      }
    }
  };

  const runIngestionPipeline = async (data: IngestionData) => {
    setIsIngesting(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsIngesting(false);

    // Start morphing animation
    setIsMorphing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setHasPersonalized(true);
    setIsMorphing(false);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#24483F', '#C66E45', '#9DB6A9'],
    });

    showToast('✨ Personal Context Synthesized! Radar dynamically transformed.');
  };

  const resetToBaseline = () => {
    setCards(initialCards);
    setContextItems(initialContextItems);
    setWatches(initialWatches);
    setIntents(initialIntents);
    setGroupCapsules(initialGroupCapsules);
    setPersona(initialPersona);
    setHasPersonalized(true);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset to original master profile');
  };

  const savedCards = cards.filter((c) => c.status === 'saved');

  return (
    <AppContext.Provider
      value={{
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
