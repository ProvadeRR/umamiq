// Core data types based on the provided JSON structure
export interface Establishment {
    _id: {
        $oid: string;
    };
    name: string;
    domain: string;
    placeInfo: {
        name: string;
        type: string;
        contactInfo: {
            socialNetworks: {
                instagram?: string;
                telegram?: string;
            };
            website?: string;
            email: string;
            phone: string;
            address: {
                prediction: string;
                country: string;
                city: string;
                postalCode: string;
                location: {
                    coordinates: [number, number];
                    type: string;
                };
            };
        };
        companyDescription: string;
        companyImages: {
            mobile: string;
            desktop: string;
            logo?: string;
        };
    };
    workTimeAll: WorkingHours[];
    opened: boolean;
    customize: {
        primaryColor: string;
        menuFavorites: boolean;
        menuFavoritesCounter: boolean;
    };
    sections: MenuSection[];
}

export interface WorkingHours {
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
    active: boolean;
    from: string; // "11:00:00.000"
    till: string; // "22:00:00.000"
}

export interface MenuSection {
    _id: string;
    name: string;
    description: string;
    hurl: string;
}

export interface Dish {
    _id: {
        $oid: string;
    };
    name: string;
    description: string;
    price: number;
    priceFormatted: number;
    likes: number;
    available: boolean;
    sectionId: string;
    media: MediaItem[];
    weight?: string;
    weightType?: string;
    tags: string[];
}

export interface MediaItem {
    url: string;
    thumbnail: string;
    medium: string;
    big: string;
    webp: {
        url: string;
        thumbnail: string;
        medium: string;
        big: string;
    };
}

export interface UserPreferences {
    favoriteEstablishments: string[];
    favoriteDishes: string[];
    dietaryRestrictions: string[];
    priceRange: {
        min: number;
        max: number;
    };
}

export interface QRScanResult {
    establishmentId: string;
}

export type SortOption = 'popularity' | 'price-low' | 'price-high';
export type TabType = 'info' | 'menu' | 'profile';
