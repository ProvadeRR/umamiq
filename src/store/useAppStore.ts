import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {AppState, UserPreferences, Restaurant, DietaryTag, AllergenTag, MenuTag} from '../types';

interface AppStore extends AppState {
    // Actions
    setCurrentRestaurant: (restaurant: Restaurant | null) => void;
    updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
    setSearchQuery: (query: string) => void;
    setSelectedCategory: (category: string | null) => void;
    toggleDietaryFilter: (dietary: DietaryTag) => void;
    toggleAllergenFilter: (allergen: AllergenTag) => void;
    toggleTagFilter: (tag: MenuTag) => void;
    toggleFavoriteItem: (itemId: string) => void;
    clearFilters: () => void;
    resetApp: () => void;
}

const defaultPreferences: UserPreferences = {
    dietaryRestrictions: [],
    allergens: [],
    favoriteItems: [],
    theme: 'auto',
    language: 'en',
    hideUnavailable: false,
    showPrices: true,
};

const initialState: AppState = {
    currentRestaurant: null,
    userPreferences: defaultPreferences,
    searchQuery: '',
    selectedCategory: null,
    activeFilters: {
        dietary: [],
        allergens: [],
        tags: [],
    },
};

export const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            ...initialState,

            setCurrentRestaurant: (restaurant) =>
                set({ currentRestaurant: restaurant }),

            updateUserPreferences: (preferences) =>
                set((state) => ({
                    userPreferences: { ...state.userPreferences, ...preferences },
                })),

            setSearchQuery: (query) => set({ searchQuery: query }),

            setSelectedCategory: (category) => set({ selectedCategory: category }),

            toggleDietaryFilter: (dietary) =>
                set((state) => ({
                    activeFilters: {
                        ...state.activeFilters,
                        dietary: state.activeFilters.dietary.includes(dietary)
                            ? state.activeFilters.dietary.filter((d) => d !== dietary)
                            : [...state.activeFilters.dietary, dietary],
                    },
                })),

            toggleAllergenFilter: (allergen) =>
                set((state) => ({
                    activeFilters: {
                        ...state.activeFilters,
                        allergens: state.activeFilters.allergens.includes(allergen)
                            ? state.activeFilters.allergens.filter((a) => a !== allergen)
                            : [...state.activeFilters.allergens, allergen],
                    },
                })),

            toggleTagFilter: (tag) =>
                set((state) => ({
                    activeFilters: {
                        ...state.activeFilters,
                        tags: state.activeFilters.tags.includes(tag)
                            ? state.activeFilters.tags.filter((t) => t !== tag)
                            : [...state.activeFilters.tags, tag],
                    },
                })),

            toggleFavoriteItem: (itemId) =>
                set((state) => ({
                    userPreferences: {
                        ...state.userPreferences,
                        favoriteItems: state.userPreferences.favoriteItems.includes(itemId)
                            ? state.userPreferences.favoriteItems.filter((id) => id !== itemId)
                            : [...state.userPreferences.favoriteItems, itemId],
                    },
                })),

            clearFilters: () =>
                set({
                    activeFilters: {
                        dietary: [],
                        allergens: [],
                        tags: [],
                    },
                    searchQuery: '',
                    selectedCategory: null,
                }),

            resetApp: () => set(initialState),
        }),
        {
            name: 'restaurant-menu-storage',
            partialize: (state) => ({
                userPreferences: state.userPreferences,
            }),
        }
    )
);
