import { create } from 'zustand';
import api from '@/shared/api/api';

interface FavoritesState {
  favoriteIds: string[];
  isLoading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favoriteIds: [],
  isLoading: false,

  fetchFavorites: async () => {
    if (get().isLoading || get().favoriteIds.length > 0) return;
    
    set({ isLoading: true });
    try {
      const { data } = await api.get('/api/favorites/ids');
      set({ favoriteIds: data as string[] });
    } catch (err) {
      console.error('Fetch favorites error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (productId: string) => {
    const isFav = get().favoriteIds.includes(productId);
    
    // Optimistic update
    if (isFav) {
      set({ favoriteIds: get().favoriteIds.filter(id => id !== productId) });
    } else {
      set({ favoriteIds: [...get().favoriteIds, productId] });
    }

    try {
      const { data } = await api.post('/api/favorites/toggle', { productId });
      // Sync state with actual backend result
      const actualIsFav = data.isFavorite;
      if (actualIsFav) {
        if (!get().favoriteIds.includes(productId)) {
          set({ favoriteIds: [...get().favoriteIds, productId] });
        }
      } else {
        set({ favoriteIds: get().favoriteIds.filter(id => id !== productId) });
      }
    } catch (err) {
      // Revert if error
      if (isFav) {
        set({ favoriteIds: [...get().favoriteIds, productId] });
      } else {
        set({ favoriteIds: get().favoriteIds.filter(id => id !== productId) });
      }
      console.error('Toggle favorite error:', err);
      throw err;
    }
  },

  isFavorite: (productId: string) => {
    return get().favoriteIds.includes(productId);
  }
}));
