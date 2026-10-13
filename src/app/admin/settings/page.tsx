'use client';

import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { DealershipSettings } from '@/types';
import { getDealershipSettings, saveDealershipSettings } from '@/lib/firebase/settings';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<DealershipSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data = await getDealershipSettings();
      setSettings(data);
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    await saveDealershipSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!settings) return <div className="text-gray-400 text-sm">Loading settings...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center border-b border-[#222226] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Dealership Settings & Profile
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Update business details, contact phone numbers, working hours, and SEO defaults.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center space-x-2 transition shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Dealership settings saved successfully! Changes are live.</span>
        </div>
      )}

      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-bold text-white font-serif border-b border-[#222226] pb-3">
          1. Business & Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Dealership Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">WhatsApp Number (e.g. 919744198199)</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Showroom Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
          />
        </div>
      </div>

      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-bold text-white font-serif border-b border-[#222226] pb-3">
          2. Homepage & Hero Banner
        </h2>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Hero Main Headline</label>
          <input
            type="text"
            value={settings.heroHeadline}
            onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Hero Subtitle</label>
          <input
            type="text"
            value={settings.heroSubtitle}
            onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
          />
        </div>
      </div>

      <div className="bg-[#141417] p-6 rounded-2xl border border-[#232328] space-y-4">
        <h2 className="text-lg font-bold text-white font-serif border-b border-[#222226] pb-3">
          3. SEO Defaults
        </h2>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Meta Title</label>
          <input
            type="text"
            value={settings.seoTitle}
            onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl px-3 py-2.5"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">Meta Description</label>
          <textarea
            rows={3}
            value={settings.seoDescription}
            onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
            className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-xl p-3"
          />
        </div>
      </div>
    </form>
  );
}
