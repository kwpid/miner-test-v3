import { create } from 'zustand';

interface QuickTab {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
}

interface StoreState {
  quickTabs: QuickTab[];
  plugins: Plugin[];
  addQuickTab: (tab: Omit<QuickTab, 'id'>) => void;
  removeQuickTab: (id: string) => void;
  updateQuickTab: (id: string, tab: Partial<QuickTab>) => void;
  togglePlugin: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  quickTabs: [],
  plugins: [
    {
      id: '1',
      name: 'Gaming Mode',
      description: 'Optimize search for gaming content',
      enabled: true,
      version: '1.0.0',
    },
    {
      id: '2',
      name: 'Advanced Filters',
      description: 'Add advanced filtering options to search results',
      enabled: false,
      version: '1.2.0',
    },
    {
      id: '3',
      name: 'Quick-Tabs',
      description: 'Add quick access tabs for your favorite websites',
      enabled: true,
      version: '1.0.0',
    },
    {
      id: '4',
      name: 'Dark Reader',
      description: 'Automatically darkens websites for better night viewing',
      enabled: true,
      version: '1.0.0',
    },
    {
      id: '5',
      name: 'Ad Blocker',
      description: 'Blocks intrusive ads and trackers',
      enabled: true,
      version: '1.0.0',
    },
  ],
  addQuickTab: (tab) =>
    set((state) => ({
      quickTabs: [...state.quickTabs, { ...tab, id: Date.now().toString() }],
    })),
  removeQuickTab: (id) =>
    set((state) => ({
      quickTabs: state.quickTabs.filter((tab) => tab.id !== id),
    })),
  updateQuickTab: (id, updates) =>
    set((state) => ({
      quickTabs: state.quickTabs.map((tab) =>
        tab.id === id ? { ...tab, ...updates } : tab
      ),
    })),
  togglePlugin: (id) =>
    set((state) => ({
      plugins: state.plugins.map((plugin) =>
        plugin.id === id ? { ...plugin, enabled: !plugin.enabled } : plugin
      ),
    })),
})); 