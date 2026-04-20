import { create } from 'zustand';

interface Property {
  id: string;
  name: string;
  price: string;
  category: 'subsidi' | 'komersil';
  image_url: string;
  luas_tanah: number;
  luas_bangunan: number;
  kamar_tidur: number;
  kamar_mandi: number;
}

interface CompareStore {
  selectedProperties: Property[];
  toggleProperty: (property: Property) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setCompareModalOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
  selectedProperties: [],
  toggleProperty: (property) => set((state) => {
    const isSelected = state.selectedProperties.some(p => p.id === property.id);
    if (isSelected) {
      return { selectedProperties: state.selectedProperties.filter(p => p.id !== property.id) };
    } else {
      if (state.selectedProperties.length >= 3) {
        // Max 3 properties to compare
        return state;
      }
      return { selectedProperties: [...state.selectedProperties, property] };
    }
  }),
  clearCompare: () => set({ selectedProperties: [] }),
  isCompareModalOpen: false,
  setCompareModalOpen: (isOpen) => set({ isCompareModalOpen: isOpen }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchType: '',
  setSearchType: (type) => set({ searchType: type }),
}));
