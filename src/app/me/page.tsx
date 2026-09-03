'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Plane,
  BookOpen,
  Ticket,
  Smartphone,
  Check,
  Edit3,
  Trash2,
  Mic,
  Plus,
  Download,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/shell/AppShell';

interface ContextPreference {
  id: string;
  category: string;
  text: string;
  confirmed: boolean;
}

interface CurrentIntent {
  id: string;
  title: string;
  meta: string;
  status: 'active' | 'done';
}

export default function MePage() {
  const { showToast } = useApp();

  // What lasts state
  const [lastingPreferences, setLastingPreferences] = useState<ContextPreference[]>([
    {
      id: 'travel',
      category: 'Travel',
      text: 'You strongly prefer direct flights when travelling with family.',
      confirmed: true,
    },
    {
      id: 'books',
      category: 'Books & ideas',
      text: 'You repeatedly return to architecture, systems thinking and monographs.',
      confirmed: true,
    },
    {
      id: 'events',
      category: 'Live events',
      text: 'You tend to prefer smaller acoustic performances over large amplified venues.',
      confirmed: true,
    },
    {
      id: 'devices',
      category: 'Devices',
      text: 'Compact size and clean software matter more to you than maximum screen size.',
      confirmed: true,
    },
  ]);

  // Right now state
  const [currentIntents, setCurrentIntents] = useState<CurrentIntent[]>([
    {
      id: '1',
      title: 'Planning a family break',
      meta: 'Targeting direct flight destinations with calm beaches',
      status: 'active',
    },
    {
      id: '2',
      title: 'Watching the price of a compact phone',
      meta: 'Under 6.3" display · waiting for price drop below target',
      status: 'active',
    },
    {
      id: '3',
      title: 'Looking for something to do this weekend',
      meta: 'Intimate acoustic music or new dinner opening',
      status: 'active',
    },
  ]);

  // Tell Undernote modal state
  const [isTellModalOpen, setIsTellModalOpen] = useState(false);
  const [newInputText, setNewInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // Edit item state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const handleToggleConfirm = (id: string) => {
    setLastingPreferences((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, confirmed: !item.confirmed } : item
      )
    );
    showToast('Preference confirmed');
  };

  const handleRemoveLasting = (id: string) => {
    setLastingPreferences((prev) => prev.filter((item) => item.id !== id));
    showToast('Preference removed from your context');
  };

  const handleStartEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id: string) => {
    setLastingPreferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: editedText } : item))
    );
    setEditingId(null);
    showToast('Preference updated');
  };

  const handleToggleIntentDone = (id: string) => {
    setCurrentIntents((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'done' : 'active' }
          : item
      )
    );
    showToast('Intent updated');
  };

  const handleAddContext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInputText.trim()) return;

    setLastingPreferences((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        category: 'New thought',
        text: newInputText.trim(),
        confirmed: true,
      },
    ]);

    setNewInputText('');
    setIsTellModalOpen(false);
    showToast('Added to your Undernote context');
  };

  const handleExportContext = () => {
    const markdownContent = `# My Undernote Context\n\n## What Lasts\n${lastingPreferences
      .map((p) => `- **${p.category}**: ${p.text}`)
      .join('\n')}\n\n## Right Now\n${currentIntents
      .map((i) => `- ${i.title}: ${i.meta} (${i.status})`)
      .join('\n')}`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undernote_context_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Context exported as Markdown');
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory p-4 space-y-6 pb-16">
        
        {/* Header per Section 20 */}
        <div className="pt-2 space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-ink">
              Me
            </h1>
            <button
              onClick={() => setIsTellModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-deep-green text-white text-xs font-bold shadow-xs hover:bg-[#162B25] transition-all active:scale-95"
            >
              <Plus size={13} />
              <span>Tell Undernote</span>
            </button>
          </div>
          <p className="text-sm text-brand-ink/80 font-medium">
            What Undernote understands about you.
          </p>
          <p className="text-xs text-brand-ink/60">
            Correct anything, remove anything or tell Undernote something new.
          </p>
        </div>

        {/* Section 1: What lasts per Section 20 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-brand-ink">
              What lasts
            </h2>
            <span className="text-[10px] font-mono text-stone-400">
              Enduring tendencies
            </span>
          </div>

          <div className="space-y-2.5">
            {lastingPreferences.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-brand-deep-green tracking-wider">
                    {item.category}
                  </span>
                  {item.confirmed && (
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                      ✓ Active
                    </span>
                  )}
                </div>

                {editingId === item.id ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={3}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-brand-warm-stone bg-[#F7F3EC] text-xs font-sans"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 text-xs border border-stone-300 rounded-lg text-stone-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        className="px-3 py-1 text-xs bg-brand-deep-green text-white rounded-lg font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-brand-ink font-sans leading-relaxed">
                    {item.text}
                  </p>
                )}

                {editingId !== item.id && (
                  <div className="flex items-center gap-2 pt-1 border-t border-brand-warm-stone/30 text-xs">
                    <button
                      onClick={() => handleToggleConfirm(item.id)}
                      className="text-stone-600 hover:text-brand-deep-green font-medium"
                    >
                      {item.confirmed ? "That's right" : 'Confirm'}
                    </button>
                    <span className="text-stone-300">•</span>
                    <button
                      onClick={() => handleStartEdit(item.id, item.text)}
                      className="text-stone-600 hover:text-brand-ink font-medium"
                    >
                      Edit
                    </button>
                    <span className="text-stone-300">•</span>
                    <button
                      onClick={() => handleRemoveLasting(item.id)}
                      className="text-rose-600 hover:text-rose-800 font-medium"
                    >
                      Not anymore
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Right now per Section 20 */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-brand-ink">
              Right now
            </h2>
            <span className="text-[10px] font-mono text-stone-400">
              Active projects &amp; interests
            </span>
          </div>

          <div className="space-y-2.5">
            {currentIntents.map((intent) => (
              <div
                key={intent.id}
                className="p-4 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-brand-ink">
                    {intent.title}
                  </h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                      intent.status === 'done'
                        ? 'bg-stone-100 text-stone-500'
                        : 'bg-amber-100 text-amber-800 font-bold'
                    }`}
                  >
                    {intent.status === 'done' ? 'Completed' : 'Watching'}
                  </span>
                </div>

                <p className="text-xs text-brand-ink/70 font-sans">
                  {intent.meta}
                </p>

                <div className="flex items-center gap-2 pt-1 border-t border-brand-warm-stone/30 text-xs">
                  <button
                    onClick={() => handleToggleIntentDone(intent.id)}
                    className="text-stone-600 hover:text-brand-deep-green font-medium"
                  >
                    {intent.status === 'done' ? 'Reactivate' : 'Done'}
                  </button>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-600 font-medium">Keep watching</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions per Section 20 */}
        <div className="pt-4 border-t border-brand-warm-stone/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={() => setIsTellModalOpen(true)}
            className="text-brand-deep-green font-bold hover:underline"
          >
            Import more context
          </button>
          <button
            onClick={handleExportContext}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-brand-ink font-medium"
          >
            <Download size={13} />
            <span>Export my context</span>
          </button>
        </div>

      </div>

      {/* Tell Undernote Modal */}
      <AnimatePresence>
        {isTellModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    Tell Undernote something
                  </h3>
                  <p className="text-xs text-brand-ink/65">
                    Speak or write a thought, preference, or trip plan.
                  </p>
                </div>
                <button
                  onClick={() => setIsTellModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-800"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddContext} className="space-y-3">
                <textarea
                  rows={4}
                  value={newInputText}
                  onChange={(e) => setNewInputText(e.target.value)}
                  placeholder="e.g. I prefer quiet outdoor dining, or I'm looking for a non-stop family trip in December..."
                  className="w-full p-3 rounded-2xl border border-brand-warm-stone bg-[#F7F3EC] text-xs font-sans leading-relaxed focus:outline-brand-deep-green"
                />

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecording(!isRecording);
                      if (!isRecording) {
                        setNewInputText('Looking for a compact camera for travel with great low-light performance...');
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isRecording
                        ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                        : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <Mic size={13} />
                    <span>{isRecording ? 'Listening...' : 'Voice note'}</span>
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-brand-deep-green text-white text-xs font-bold shadow-xs hover:bg-[#162B25] transition-all"
                  >
                    Save to context
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
