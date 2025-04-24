import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchQuery: '',
  selectedCity: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCity: (city) => set({ selectedCity: city }),
}));

export default useSearchStore; 