'use client';

import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchQuery: '',
  selectedCity: null,
  dateRange: { from: null, to: null },
  adults: 2,
  children: 0,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  reset: () => set({ searchQuery: '', selectedCity: null, adults: 2, children: 0 }),
  setDateRange: (dateRange) => set({ dateRange }),
  setAdults: (count) => set({ adults: count }),
  setChildren: (count) => set({ children: count }),
}));

export default useSearchStore; 