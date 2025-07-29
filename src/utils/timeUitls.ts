import type {WorkingHours} from '../types';

export function getCurrentDayOfWeek(): number {
    return new Date().getDay();
}

export function formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

export function isEstablishmentOpen(workingHours: WorkingHours[]): boolean {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 100 + now.getMinutes(); // Convert to HHMM format

    const todayHours = workingHours.find(wh => wh.dayOfWeek === currentDay);

    if (!todayHours || !todayHours.active) {
        return false;
    }

    const openTime = parseTimeToNumber(todayHours.from);
    const closeTime = parseTimeToNumber(todayHours.till);

    return currentTime >= openTime && currentTime <= closeTime;
}

function parseTimeToNumber(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 100 + minutes;
}

export function getTodayWorkingHours(workingHours: WorkingHours[]): WorkingHours | null {
    const currentDay = getCurrentDayOfWeek();
    return workingHours.find(wh => wh.dayOfWeek === currentDay) || null;
}

export function getDayName(dayOfWeek: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
}
