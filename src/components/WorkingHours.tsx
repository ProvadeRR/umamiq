import { Clock } from 'lucide-react';
import type {WorkingHours as WorkingHoursType} from '../types';
import { formatTime, getDayName, getCurrentDayOfWeek } from '../utils/timeUitls.ts';

interface WorkingHoursProps {
    workingHours: WorkingHoursType[];
    className?: string;
}

export function WorkingHours({ workingHours, className = '' }: WorkingHoursProps) {
    const currentDay = getCurrentDayOfWeek();

    return (
        <div className={`bg-white rounded-xl p-4 ${className}`}>
            <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
            </div>

            <div className="space-y-3">
                {workingHours.map((hours) => (
                    <div
                        key={hours.dayOfWeek}
                        className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                            hours.dayOfWeek === currentDay
                                ? 'bg-orange-50 border border-orange-200'
                                : 'bg-gray-50'
                        }`}
                    >
            <span
                className={`font-medium ${
                    hours.dayOfWeek === currentDay
                        ? 'text-orange-800'
                        : 'text-gray-700'
                }`}
            >
              {getDayName(hours.dayOfWeek)}
            </span>
                        <span
                            className={`text-sm ${
                                hours.dayOfWeek === currentDay
                                    ? 'text-orange-600 font-semibold'
                                    : 'text-gray-600'
                            }`}
                        >
              {hours.active
                  ? `${formatTime(hours.from)} - ${formatTime(hours.till)}`
                  : 'Closed'
              }
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
