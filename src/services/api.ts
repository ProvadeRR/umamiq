import type {
    Establishment,
    Dish,
    QRScanResult
} from '../types';
import { mockEstablishments, mockDishes } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
    static async getEstablishments(): Promise<Establishment[]> {
        await delay(800);
        return mockEstablishments;
    }

    static async getEstablishment(id: string): Promise<Establishment | null> {
        await delay(600);
        const establishment = mockEstablishments.find(e => e._id.$oid === id);
        return establishment || null;
    }

    static async getDishesBySectionId(sectionId: string): Promise<Dish[]> {
        await delay(500);
        return mockDishes.filter(dish => dish.sectionId === sectionId);
    }

    static async getAllDishesForEstablishment(): Promise<Dish[]> {
        await delay(600);
        return mockDishes;
    }

    static async simulateQRScan(): Promise<QRScanResult> {
        await delay(2000); // Simulate scanning time
        return { establishmentId: "687f6b87bbf96311980e15c2" };
    }

    static async likeDish(dishId: string): Promise<boolean> {
        await delay(300);
        // In a real app, this would update the server
        const dish = mockDishes.find(d => d._id.$oid === dishId);
        if (dish) {
            dish.likes += 1;
            return true;
        }
        return false;
    }
}
