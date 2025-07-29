import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {UserPreferences} from '../types';

interface AppState {
    userPreferences: UserPreferences;
    likedDishes: Set<string>;
    favoriteEstablishments: Set<string>;
}

type AppAction =
    | { type: 'TOGGLE_DISH_LIKE'; dishId: string }
    | { type: 'TOGGLE_ESTABLISHMENT_FAVORITE'; establishmentId: string }
    | { type: 'UPDATE_PREFERENCES'; preferences: Partial<UserPreferences> };

const initialState: AppState = {
    userPreferences: {
        favoriteEstablishments: [],
        favoriteDishes: [],
        dietaryRestrictions: [],
        priceRange: { min: 0, max: 1000 }
    },
    likedDishes: new Set(),
    favoriteEstablishments: new Set()
};

const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'TOGGLE_DISH_LIKE':
            const newLikedDishes = new Set(state.likedDishes);
            if (newLikedDishes.has(action.dishId)) {
                newLikedDishes.delete(action.dishId);
            } else {
                newLikedDishes.add(action.dishId);
            }
            return { ...state, likedDishes: newLikedDishes };

        case 'TOGGLE_ESTABLISHMENT_FAVORITE':
            const newFavorites = new Set(state.favoriteEstablishments);
            if (newFavorites.has(action.establishmentId)) {
                newFavorites.delete(action.establishmentId);
            } else {
                newFavorites.add(action.establishmentId);
            }
            return { ...state, favoriteEstablishments: newFavorites };

        case 'UPDATE_PREFERENCES':
            return {
                ...state,
                userPreferences: { ...state.userPreferences, ...action.preferences }
            };

        default:
            return state;
    }
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
