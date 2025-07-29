import { Info, Menu, User } from 'lucide-react';
import type {TabType} from '../types';

interface BottomNavBarProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
    const tabs = [
        { id: 'info' as TabType, label: 'Info', icon: Info },
        { id: 'menu' as TabType, label: 'Menu', icon: Menu },
        { id: 'profile' as TabType, label: 'Profile', icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
            <div className="flex">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 py-3 px-4 flex flex-col items-center justify-center transition-colors ${
                                isActive
                                    ? 'text-orange-600 bg-orange-50'
                                    : 'text-gray-600 hover:text-orange-500'
                            }`}
                        >
                            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'fill-current' : ''}`} />
                            <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
