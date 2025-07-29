import React from 'react';
import { Heart, Star } from 'lucide-react';
import type {Dish} from '../types';
import { useAppContext } from '../contexts/AppContext';
import { ApiService } from '../services/api';

interface MenuItemCardProps {
    dish: Dish;
}

export function MenuItemCard({ dish }: MenuItemCardProps) {
    const { state, dispatch } = useAppContext();
    const isLiked = state.likedDishes.has(dish._id.$oid);

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await ApiService.likeDish(dish._id.$oid);
            dispatch({ type: 'TOGGLE_DISH_LIKE', dishId: dish._id.$oid });
        } catch (error) {
            console.error('Failed to like dish:', error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={dish.media[0]?.thumbnail || dish.media[0]?.url}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                    onClick={handleLike}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                        isLiked
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                        {dish.name}
                    </h3>
                    <span className="text-xl font-bold text-orange-600 ml-2">
            ₴{dish.priceFormatted}
          </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {dish.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                        {dish.weight && dish.weightType && (
                            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {dish.weight}{dish.weightType}
              </span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-700">
              {dish.likes}
            </span>
                    </div>
                </div>

                {!dish.available && (
                    <div className="mt-3 text-center">
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
              Currently unavailable
            </span>
                    </div>
                )}
            </div>
        </div>
    );
}
