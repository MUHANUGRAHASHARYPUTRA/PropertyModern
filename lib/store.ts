import { create } from 'zustand';

interface Property {
  id: string;
  name: string;
  price: string;
  type: 'subsidi' | 'komersil';
  image: string;
  luasTanah: number;
  luasBangunan: number;
  kamarTidur: number;
  kamarMandi: number;
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
