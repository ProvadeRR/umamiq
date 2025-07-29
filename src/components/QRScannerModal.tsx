import { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { ApiService } from '../services/api';

interface QRScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScanResult: (establishmentId: string) => void;
}

export function QRScannerModal({ isOpen, onClose, onScanResult }: QRScannerModalProps) {
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsScanning(false);
        }
    }, [isOpen]);

    const handleScan = async () => {
        setIsScanning(true);
        try {
            const result = await ApiService.simulateQRScan();
            onScanResult(result.establishmentId);
            onClose();
        } catch (error) {
            console.error('Scan failed:', error);
        } finally {
            setIsScanning(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">QR Scanner</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300">
                        {isScanning ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-pulse">
                                    <Camera className="w-16 h-16 text-orange-500 mb-2" />
                                </div>
                                <p className="text-sm text-gray-600">Scanning...</p>
                                <div className="w-32 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Camera className="w-16 h-16 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">Point camera at QR code</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleScan}
                        disabled={isScanning}
                        className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isScanning ? 'Scanning...' : 'Start Scanning'}
                    </button>

                    <p className="text-xs text-gray-500 mt-4">
                        This is a simulated scanner that will redirect to Huli Huli restaurant
                    </p>
                </div>
            </div>
        </div>
    );
}
