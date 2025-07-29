import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, QrCode, UtensilsCrossed } from 'lucide-react';
import type {Establishment} from '../types';
import { ApiService } from '../services/api';
import { EstablishmentCard } from '../components/EstablishmentCard';
import { QRScannerModal } from '../components/QRScannerModal';

export function HomePage() {
    const navigate = useNavigate();
    const [establishments, setEstablishments] = useState<Establishment[]>([]);
    const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

    useEffect(() => {
        loadEstablishments();
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = establishments.filter(establishment =>
                establishment.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEstablishments(filtered);
        } else {
            setFilteredEstablishments(establishments);
        }
    }, [searchQuery, establishments]);

    const loadEstablishments = async () => {
        try {
            const data = await ApiService.getEstablishments();
            setEstablishments(data);
            setFilteredEstablishments(data);
        } catch (error) {
            console.error('Failed to load establishments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEstablishmentClick = (establishment: Establishment) => {
        navigate(`/establishment/${establishment._id.$oid}`);
    };

    const handleQRScanResult = (establishmentId: string) => {
        navigate(`/establishment/${establishmentId}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading restaurants...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <UtensilsCrossed className="w-8 h-8 text-orange-600 mr-2" />
                            <h1 className="text-2xl font-bold text-gray-900">UmamiQ</h1>
                        </div>

                        {/* QR Scanner Button */}
                        <button
                            onClick={() => setIsQRScannerOpen(true)}
                            className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
                        >
                            <QrCode className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="pb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search restaurants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {filteredEstablishments.length === 0 ? (
                    <div className="text-center py-12">
                        <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            No restaurants found
                        </h3>
                        <p className="text-gray-500">
                            {searchQuery ? 'Try a different search term' : 'Check back later for new restaurants'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEstablishments.map((establishment) => (
                            <EstablishmentCard
                                key={establishment._id.$oid}
                                establishment={establishment}
                                onClick={() => handleEstablishmentClick(establishment)}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* QR Scanner Modal */}
            <QRScannerModal
                isOpen={isQRScannerOpen}
                onClose={() => setIsQRScannerOpen(false)}
                onScanResult={handleQRScanResult}
            />
        </div>
    );
}
