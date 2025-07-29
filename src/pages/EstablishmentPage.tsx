import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Phone, MapPin, Instagram, MessageCircle, Star, Filter, SortAsc } from 'lucide-react';
import type {Establishment, Dish, TabType, SortOption} from '../types';
import { ApiService } from '../services/api';
import { useAppContext } from '../contexts/AppContext';
import { isEstablishmentOpen, getTodayWorkingHours, formatTime } from '../utils/timeUitls';
import { BottomNavBar } from '../components/ButtomNavBar';
import { WorkingHours } from '../components/WorkingHours';
import { MenuItemCard } from '../components/MenuItemCard';

export function EstablishmentPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state, dispatch } = useAppContext();

    const [establishment, setEstablishment] = useState<Establishment | null>(null);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [activeSection, setActiveSection] = useState<string>('');
    const [sortOption, setSortOption] = useState<SortOption>('popularity');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    const isFavorite = establishment ? state.favoriteEstablishments.has(establishment._id.$oid) : false;

    useEffect(() => {
        if (id) {
            loadEstablishmentData(id);
        }
    }, [id]);

    useEffect(() => {
        if (establishment && activeTab === 'menu') {
            loadDishes();
        }
    }, [establishment, activeTab]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [dishes, sortOption, priceRange, activeSection]);

    const loadEstablishmentData = async (establishmentId: string) => {
        try {
            const data = await ApiService.getEstablishment(establishmentId);
            if (data) {
                setEstablishment(data);
                if (data.sections.length > 0) {
                    setActiveSection(data.sections[0]._id);
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to load establishment:', error);
            navigate('/');
        } finally {
            setIsLoading(false);
        }
    };

    const loadDishes = async () => {
        if (!establishment) return;

        try {
            const dishData = await ApiService.getAllDishesForEstablishment(establishment._id.$oid);
            setDishes(dishData);
        } catch (error) {
            console.error('Failed to load dishes:', error);
        }
    };

    const applyFiltersAndSort = () => {
        let filtered = dishes;

        // Filter by section
        if (activeSection) {
            filtered = filtered.filter(dish => dish.sectionId === activeSection);
        }

        // Filter by price range
        filtered = filtered.filter(dish =>
            dish.priceFormatted >= priceRange.min &&
            dish.priceFormatted <= priceRange.max
        );

        // Sort
        switch (sortOption) {
            case 'popularity':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'price-low':
                filtered.sort((a, b) => a.priceFormatted - b.priceFormatted);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.priceFormatted - a.priceFormatted);
                break;
        }

        setFilteredDishes(filtered);
    };

    const handleFavoriteToggle = () => {
        if (establishment) {
            dispatch({
                type: 'TOGGLE_ESTABLISHMENT_FAVORITE',
                establishmentId: establishment._id.$oid
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading restaurant...</p>
                </div>
            </div>
        );
    }

    if (!establishment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Restaurant not found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-orange-600 hover:text-orange-700"
                    >
                        Return to home
                    </button>
                </div>
            </div>
        );
    }

    const isOpen = isEstablishmentOpen(establishment.workTimeAll);
    const todayHours = getTodayWorkingHours(establishment.workTimeAll);

    const renderInfoTab = () => (
        <div className="space-y-6 pb-20">
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

                <div className="space-y-4">
                    {establishment.placeInfo.contactInfo.phone && (
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 text-gray-600 mr-3" />
                            <a
                                href={`tel:${establishment.placeInfo.contactInfo.phone}`}
                                className="text-orange-600 hover:text-orange-700"
                            >
                                {establishment.placeInfo.contactInfo.phone}
                            </a>
                        </div>
                    )}

                    <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-gray-600 mr-3 mt-1" />
                        <p className="text-gray-700">
                            {establishment.placeInfo.contactInfo.address.prediction}
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        {establishment.placeInfo.contactInfo.socialNetworks.instagram && (
                            <a
                                href={establishment.placeInfo.contactInfo.socialNetworks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-pink-600 hover:text-pink-700"
                            >
                                <Instagram className="w-5 h-5 mr-2" />
                                <span>Instagram</span>
                            </a>
                        )}

                        {establishment.placeInfo.contactInfo.socialNetworks.telegram && (
                            <a
                                href={establishment.placeInfo.contactInfo.socialNetworks.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-700"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                <span>Telegram</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Working Hours */}
            <WorkingHours workingHours={establishment.workTimeAll} />

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p>Interactive map would be here</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMenuTab = () => (
        <div className="pb-20">
            {/* Menu Section Tabs */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-30 mb-6">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {establishment.sections.map((section) => (
                        <button
                            key={section._id}
                            onClick={() => setActiveSection(section._id)}
                            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                activeSection === section._id
                                    ? 'border-orange-500 text-orange-600'
                                    : 'border-transparent text-gray-600 hover:text-orange-500'
                            }`}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="relative">
                    <button
                        onClick={() => setShowSortMenu(!showSortMenu)}
                        className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        <SortAsc className="w-4 h-4 mr-2" />
                        Sort
                    </button>

                    {showSortMenu && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                            <button
                                onClick={() => {
                                    setSortOption('popularity');
                                    setShowSortMenu(false);
                                }}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                                    sortOption === 'popularity' ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                                }`}
                            >
                                Most Popular
                            </button>
                            <button
                                onClick={() => {
                                    setSortOption('price-low');
                                    setShowSortMenu(false);
                                }}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                                    sortOption === 'price-low' ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                                }`}
                            >
                                Price: Low to High
                            </button>
                            <button
                                onClick={() => {
                                    setSortOption('price-high');
                                    setShowSortMenu(false);
                                }}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                                    sortOption === 'price-high' ? 'text-orange-600 bg-orange-50' : 'text-gray-700'
                                }`}
                            >
                                Price: High to Low
                            </button>
                        </div>
                    )}
                </div>

                <button className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </button>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {filteredDishes.map((dish) => (
                    <MenuItemCard key={dish._id.$oid} dish={dish} />
                ))}
            </div>

            {filteredDishes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No items found in this section</p>
                </div>
            )}
        </div>
    );

    const renderProfileTab = () => (
        <div className="space-y-6 pb-20 px-4">
            <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Preferences</h3>
                <p className="text-gray-600">Profile management features would be implemented here:</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>• Favorite menu items</li>
                    <li>• Dietary restrictions</li>
                    <li>• Payment methods</li>
                    <li>• Order history</li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 bg-white shadow-sm z-40">
                <div className="flex items-center justify-between px-4 h-16">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    <h1 className="text-lg font-semibold text-gray-900 truncate mx-4">
                        {establishment.name}
                    </h1>

                    <button
                        onClick={handleFavoriteToggle}
                        className={`p-2 rounded-full transition-colors ${
                            isFavorite
                                ? 'text-red-500 bg-red-50'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={establishment.placeInfo.companyImages.desktop}
                    alt={establishment.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-white mb-2">
                                {establishment.name}
                            </h1>
                            {establishment.placeInfo.companyDescription && (
                                <p className="text-white/90 text-sm line-clamp-2">
                                    {establishment.placeInfo.companyDescription}
                                </p>
                            )}
                        </div>

                        {establishment.placeInfo.companyImages.logo && (
                            <div className="ml-4">
                                <img
                                    src={establishment.placeInfo.companyImages.logo}
                                    alt="Logo"
                                    className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center mt-3">
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isOpen
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                }`}
            >
              {isOpen ? 'Open' : 'Closed'}
            </span>

                        {todayHours && (
                            <div className="flex items-center text-white/90 text-sm ml-3">
                                <Star className="w-4 h-4 mr-1" />
                                <span>
                  {todayHours.active
                      ? `${formatTime(todayHours.from)} - ${formatTime(todayHours.till)}`
                      : 'Closed today'
                  }
                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
                {activeTab === 'info' && renderInfoTab()}
                {activeTab === 'menu' && renderMenuTab()}
                {activeTab === 'profile' && renderProfileTab()}
            </div>

            {/* Bottom Navigation */}
            <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}
