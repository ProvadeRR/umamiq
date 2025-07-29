import { Clock, MapPin } from 'lucide-react';
import type {Establishment} from '../types';
import { isEstablishmentOpen, getTodayWorkingHours, formatTime } from '../utils/timeUitls.ts';

interface EstablishmentCardProps {
    establishment: Establishment;
    onClick: () => void;
}

export function EstablishmentCard({ establishment, onClick }: EstablishmentCardProps) {
    const isOpen = isEstablishmentOpen(establishment.workTimeAll);
    const todayHours = getTodayWorkingHours(establishment.workTimeAll);

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={establishment.placeInfo.companyImages.mobile}
                    alt={establishment.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
          <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isOpen
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
              }`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {establishment.name}
                </h3>

                {establishment.placeInfo.companyDescription && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {establishment.placeInfo.companyDescription}
                    </p>
                )}

                <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">
            {establishment.placeInfo.contactInfo.address.city}
          </span>
                </div>

                {todayHours && (
                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
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
    );
}
